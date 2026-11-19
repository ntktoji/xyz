const test = require('node:test');
const assert = require('node:assert');
const { inquiry, shipmentCreate, userCreate } = require('../src/lib/validate');

test('inquiry rejects a bad phone number', () => {
  const r = inquiry.safeParse({ name: 'Asha', phone: 'abc', from: 'Delhi', to: 'Dubai', service: 'Air Freight' });
  assert.strictEqual(r.success, false);
});

test('inquiry accepts a valid enquiry', () => {
  const r = inquiry.safeParse({ name: 'Asha', phone: '+91 98765 43210', from: 'Delhi', to: 'Dubai', service: 'Air Freight' });
  assert.strictEqual(r.success, true);
});

test('shipment requires party names and places', () => {
  const r = shipmentCreate.safeParse({ shipperName: 'A', consigneeName: 'B', origin: 'X', destination: 'Y' });
  assert.strictEqual(r.success, false);
});

test('new users need a 12+ character password', () => {
  const r = userCreate.safeParse({ name: 'Ravi', email: 'ravi@example.com', password: 'short', role: 'STAFF' });
  assert.strictEqual(r.success, false);
});
