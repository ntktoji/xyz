const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma');
const { requireAdmin, requireRole } = require('../middleware/auth');
const { shipmentCreate, shipmentUpdate, login, userCreate } = require('../lib/validate');

const router = express.Router();

function makeTrackingNumber() {
  const digits = String(Date.now()).slice(-6) + String(Math.floor(Math.random() * 1e6)).padStart(6, '0');
  return 'JAC' + digits.slice(0, 9);
}

router.post('/login', async (req, res) => {
  const parsed = login.safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ error: 'Email and password are required' });
  const user = await prisma.user.findUnique({ where: { email: parsed.data.email.toLowerCase() } });
  const ok = user && (await bcrypt.compare(parsed.data.password, user.passwordHash));
  if (!ok) return res.status(401).json({ error: 'Invalid email or password' });
  const token = jwt.sign({ sub: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '8h', algorithm: 'HS256' });
  return res.json({ token, user: { name: user.name, email: user.email, role: user.role } });
});

router.use(requireAdmin);

router.get('/stats', async (_req, res) => {
  const [total, byStatus, newInquiries, recent] = await Promise.all([
    prisma.shipment.count(),
    prisma.shipment.groupBy({ by: ['status'], _count: { _all: true } }),
    prisma.inquiry.count({ where: { status: 'NEW' } }),
    prisma.shipment.findMany({ orderBy: { createdAt: 'desc' }, take: 10 }),
  ]);
  const last30 = await prisma.shipment.count({ where: { createdAt: { gte: new Date(Date.now() - 30 * 864e5) } } });
  res.json({ total, last30, newInquiries, byStatus: byStatus.map((s) => ({ status: s.status, count: s._count._all })), recent });
});

router.get('/shipments', async (req, res) => {
  const q = String(req.query.q || '').trim();
  const status = String(req.query.status || '');
  const where = {
    ...(status ? { status } : {}),
    ...(q ? { OR: [
      { trackingNumber: { contains: q, mode: 'insensitive' } },
      { consigneeName: { contains: q, mode: 'insensitive' } },
      { shipperName: { contains: q, mode: 'insensitive' } },
    ] } : {}),
  };
  const page = Math.max(1, Number(req.query.page) || 1);
  const pageSize = 20;
  const [items, count] = await Promise.all([
    prisma.shipment.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * pageSize, take: pageSize }),
    prisma.shipment.count({ where }),
  ]);
  res.json({ items, count, page, pageSize });
});

router.post('/shipments', async (req, res) => {
  const parsed = shipmentCreate.safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ error: parsed.error.issues[0].message });
  const data = parsed.data;
  const trackingNumber = (data.trackingNumber || makeTrackingNumber()).toUpperCase();
  const status = data.status || 'BOOKED';
  const location = data.currentLocation || data.origin;
  try {
    const shipment = await prisma.shipment.create({
      data: {
        ...data,
        trackingNumber,
        status,
        currentLocation: location,
        expectedDelivery: data.expectedDelivery ? new Date(data.expectedDelivery) : null,
        events: { create: { status, location, description: 'Shipment booked' } },
      },
    });
    return res.status(201).json(shipment);
  } catch (err) {
    if (err.code === 'P2002') return res.status(409).json({ error: 'Tracking number already exists' });
    throw err;
  }
});

router.patch('/shipments/:id', async (req, res) => {
  const parsed = shipmentUpdate.safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ error: parsed.error.issues[0].message });
  const { expectedDelivery, status, currentLocation, ...rest } = parsed.data;
  const current = await prisma.shipment.findUnique({ where: { id: req.params.id } });
  if (!current) return res.status(404).json({ error: 'Shipment not found' });

  const statusChanged = status && status !== current.status;
  const locationChanged = currentLocation && currentLocation !== current.currentLocation;
  const updated = await prisma.shipment.update({
    where: { id: req.params.id },
    data: {
      ...rest,
      ...(status ? { status } : {}),
      ...(currentLocation !== undefined ? { currentLocation } : {}),
      ...(expectedDelivery !== undefined ? { expectedDelivery: expectedDelivery ? new Date(expectedDelivery) : null } : {}),
      ...((statusChanged || locationChanged)
        ? { events: { create: { status: status || current.status, location: currentLocation || current.currentLocation || current.origin, description: statusChanged ? `Status updated to ${status.replace(/_/g, ' ').toLowerCase()}` : 'Location updated' } } }
        : {}),
    },
  });
  return res.json(updated);
});

router.delete('/shipments/:id', requireRole('ADMIN'), async (req, res) => {
  await prisma.shipment.delete({ where: { id: req.params.id } }).catch(() => null);
  res.status(204).end();
});

router.get('/inquiries', async (req, res) => {
  const status = String(req.query.status || '');
  const items = await prisma.inquiry.findMany({ where: status ? { status } : {}, orderBy: { createdAt: 'desc' }, take: 200 });
  res.json({ items });
});

router.patch('/inquiries/:id', async (req, res) => {
  const status = req.body && req.body.status;
  if (!['NEW', 'CONTACTED', 'CLOSED'].includes(status)) return res.status(422).json({ error: 'Invalid status' });
  const item = await prisma.inquiry.update({ where: { id: req.params.id }, data: { status } }).catch(() => null);
  if (!item) return res.status(404).json({ error: 'Inquiry not found' });
  res.json(item);
});

router.get('/applications', async (_req, res) => {
  res.json({ items: await prisma.application.findMany({ orderBy: { createdAt: 'desc' }, take: 200 }) });
});

router.get('/users', requireRole('ADMIN'), async (_req, res) => {
  res.json({ items: await prisma.user.findMany({ orderBy: { createdAt: 'asc' }, select: { id: true, name: true, email: true, role: true, createdAt: true } }) });
});

router.post('/users', requireRole('ADMIN'), async (req, res) => {
  const parsed = userCreate.safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ error: parsed.error.issues[0].message });
  const { password, ...rest } = parsed.data;
  try {
    const u = await prisma.user.create({ data: { ...rest, email: rest.email.toLowerCase(), passwordHash: await bcrypt.hash(password, 12) }, select: { id: true, name: true, email: true, role: true } });
    return res.status(201).json(u);
  } catch (err) {
    if (err.code === 'P2002') return res.status(409).json({ error: 'A user with that email already exists' });
    throw err;
  }
});

router.delete('/users/:id', requireRole('ADMIN'), async (req, res) => {
  if (req.params.id === req.admin.sub) return res.status(400).json({ error: 'You cannot delete your own account' });
  await prisma.user.delete({ where: { id: req.params.id } }).catch(() => null);
  res.status(204).end();
});

function csvCell(v) {
  const s = v === null || v === undefined ? '' : v instanceof Date ? v.toISOString() : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

router.get('/shipments.csv', async (_req, res) => {
  const rows = await prisma.shipment.findMany({ orderBy: { createdAt: 'desc' } });
  const cols = ['trackingNumber', 'shipperName', 'consigneeName', 'origin', 'destination', 'currentLocation', 'status', 'weightKg', 'pieces', 'expectedDelivery', 'createdAt'];
  const csv = [cols.join(','), ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(','))].join('\n');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="shipments.csv"');
  res.send(csv);
});

module.exports = router;
