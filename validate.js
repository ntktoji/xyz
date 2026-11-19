const { z } = require('zod');

const shipmentFields = {
  shipperName: z.string().trim().min(2).max(120),
  consigneeName: z.string().trim().min(2).max(120),
  origin: z.string().trim().min(2).max(120),
  destination: z.string().trim().min(2).max(120),
  currentLocation: z.string().trim().max(160).optional().nullable(),
  status: z.enum(['BOOKED','PICKED_UP','IN_TRANSIT','AT_CUSTOMS','OUT_FOR_DELIVERY','DELIVERED','ON_HOLD','CANCELLED']).optional(),
  weightKg: z.number().positive().max(100000).optional().nullable(),
  pieces: z.number().int().positive().max(100000).optional(),
  expectedDelivery: z.string().datetime().optional().nullable(),
};

const shipmentCreate = z.object({
  trackingNumber: z.string().trim().regex(/^[A-Z0-9-]{6,30}$/i).optional(),
  ...shipmentFields,
  shipperName: shipmentFields.shipperName,
  consigneeName: shipmentFields.consigneeName,
  origin: shipmentFields.origin,
  destination: shipmentFields.destination,
});

const shipmentUpdate = z.object(shipmentFields).partial();

const inquiry = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150).optional().or(z.literal('')),
  phone: z.string().trim().regex(/^[+0-9 ()-]{7,20}$/, 'Enter a valid phone number'),
  from: z.string().trim().min(2).max(120),
  to: z.string().trim().min(2).max(120),
  service: z.string().trim().min(2).max(80),
  weightKg: z.string().trim().max(20).optional(),
  message: z.string().trim().max(2000).optional(),
  website: z.string().max(0).optional(), // honeypot, must stay empty
});

const login = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1).max(200),
});

const application = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  phone: z.string().trim().regex(/^[+0-9 ()-]{7,20}$/, 'Enter a valid phone number'),
  role: z.string().trim().min(2).max(100),
  message: z.string().trim().max(3000).optional(),
  website: z.string().max(0).optional(),
});

const userCreate = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(150),
  password: z.string().min(12, 'Password must be at least 12 characters').max(200),
  role: z.enum(['ADMIN', 'STAFF']),
});

module.exports = { shipmentCreate, shipmentUpdate, inquiry, login, application, userCreate };
