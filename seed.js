require('dotenv').config();
const bcrypt = require('bcryptjs');
const prisma = require('../src/lib/prisma');

async function main() {
  const email = (process.env.ADMIN_EMAIL || 'admin@jaiaircargo.com').toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!password || password.length < 12) throw new Error('Set ADMIN_PASSWORD (12+ characters) in your environment before seeding');
  await prisma.user.upsert({
    where: { email },
    update: { passwordHash: await bcrypt.hash(password, 12) },
    create: { email, name: 'Administrator', role: 'ADMIN', passwordHash: await bcrypt.hash(password, 12) },
  });
  console.log(`Admin ready: ${email}`);
  const demo = 'JAC102938475';
  if (!(await prisma.shipment.findUnique({ where: { trackingNumber: demo } }))) {
    await prisma.shipment.create({
      data: {
        trackingNumber: demo, shipperName: 'Sample Exporter Ltd', consigneeName: 'Sample Importer LLC',
        origin: 'Delhi (DEL)', destination: 'Dubai (DXB)', currentLocation: 'Dubai (DXB) cargo terminal',
        status: 'AT_CUSTOMS', weightKg: 420, pieces: 6,
        expectedDelivery: new Date(Date.now() + 2 * 864e5),
        events: { create: [
          { status: 'BOOKED', location: 'Delhi (DEL)', description: 'Shipment booked', occurredAt: new Date(Date.now() - 3 * 864e5) },
          { status: 'IN_TRANSIT', location: 'Delhi (DEL)', description: 'Departed origin on flight', occurredAt: new Date(Date.now() - 2 * 864e5) },
          { status: 'AT_CUSTOMS', location: 'Dubai (DXB) cargo terminal', description: 'Awaiting customs clearance', occurredAt: new Date(Date.now() - 864e5) },
        ] },
      },
    });
    console.log(`Demo shipment ${demo} created (delete it before going live)`);
  }
}

main().catch((e) => { console.error(e.message); process.exit(1); }).finally(() => prisma.$disconnect());
