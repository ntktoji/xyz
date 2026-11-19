const express = require('express');
const crypto = require('crypto');
const prisma = require('../lib/prisma');
const { inquiry, application } = require('../lib/validate');

const router = express.Router();

// Public tracking lookup. Returns only what customers need, no internal notes.
router.get('/track/:trackingNumber', async (req, res) => {
  const trackingNumber = String(req.params.trackingNumber || '').trim().toUpperCase();
  if (!/^[A-Z0-9-]{6,30}$/.test(trackingNumber)) {
    return res.status(400).json({ error: 'Enter a valid tracking number, e.g. JAC102938475' });
  }
  const shipment = await prisma.shipment.findUnique({
    where: { trackingNumber },
    select: {
      trackingNumber: true, origin: true, destination: true, currentLocation: true,
      status: true, expectedDelivery: true, updatedAt: true,
      events: { orderBy: { occurredAt: 'asc' }, select: { status: true, location: true, description: true, occurredAt: true } },
    },
  });
  if (!shipment) return res.status(404).json({ error: 'No shipment found for that tracking number' });
  return res.json(shipment);
});

// Quote / enquiry form. Saves to database.
router.post('/inquiries', async (req, res) => {
  const parsed = inquiry.safeParse(req.body);
  if (!parsed.success) {
    return res.status(422).json({ error: parsed.error.issues[0].message, fields: parsed.error.flatten().fieldErrors });
  }
  if (parsed.data.website) return res.status(201).json({ ok: true }); // silently drop bots
  const { website, ...data } = parsed.data;
  const saved = await prisma.inquiry.create({ data: { ...data, email: data.email || null } });
  return res.status(201).json({ ok: true, reference: saved.id.slice(-8).toUpperCase() });
});

// Careers: open application form.
router.post('/applications', async (req, res) => {
  const parsed = application.safeParse(req.body);
  if (!parsed.success) return res.status(422).json({ error: parsed.error.issues[0].message });
  if (parsed.data.website) return res.status(201).json({ ok: true });
  const { website, ...data } = parsed.data;
  await prisma.application.create({ data });
  return res.status(201).json({ ok: true });
});

module.exports = router;
