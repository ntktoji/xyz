// Company details. Replace the values marked TODO before going live.
export const SITE = {
  name: 'Jai Air Cargo Private Limited',
  shortName: 'Jai Air Cargo',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  description: 'Fast, reliable and secure air cargo solutions: international and domestic air freight, express delivery, customs support and door-to-door logistics.',
  phone: '+91 00000 00000', // TODO
  email: 'info@yourdomain.com', // TODO
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '910000000000', // TODO
  address: '[Registered office address, city, PIN]', // TODO
  hours: 'Mon to Sat, 9:00 AM to 7:00 PM IST; 24/7 shipment support', // TODO confirm
  mapQuery: 'New Delhi, India', // TODO set to office address
  social: { linkedin: '#', x: '#', instagram: '#' }, // TODO
};

export const SERVICES = [
  { slug: 'air-cargo', title: 'Air Cargo', desc: 'Scheduled and charter air freight on major carriers, planned around your deadlines.', img: 'Cargo aircraft' },
  { slug: 'domestic-cargo', title: 'Domestic Cargo', desc: 'Airport-to-airport movement across India, with same-day options on key routes.', img: 'Airport' },
  { slug: 'international-cargo', title: 'International Cargo', desc: 'Import and export by air with routing matched to your budget and transit time.', img: 'Global shipping' },
  { slug: 'express-delivery', title: 'Express Delivery', desc: 'Priority handling for urgent consignments that cannot wait for the next slot.', img: 'Air freight' },
  { slug: 'warehousing', title: 'Warehousing', desc: 'Secure bonded and general storage with inventory visibility for your team.', img: 'Warehouse' },
  { slug: 'packaging', title: 'Packaging', desc: 'Professional crating and packing for fragile, high-value and oversized goods.', img: 'Containers' },
  { slug: 'freight-forwarding', title: 'Freight Forwarding', desc: 'One accountable partner for booking, documents and multi-leg routing.', img: 'Global shipping' },
  { slug: 'door-pickup', title: 'Door Pickup', desc: 'Collection from your premises at a time that suits your dispatch schedule.', img: 'Trucks' },
  { slug: 'door-delivery', title: 'Door Delivery', desc: 'Final-mile delivery to the consignee with proof of delivery.', img: 'Trucks' },
  { slug: 'cargo-insurance', title: 'Cargo Insurance', desc: 'Transit cover for your goods from pickup until they are signed for.', img: 'Modern office' },
];

export const STATUS_STEPS = ['BOOKED', 'PICKED_UP', 'IN_TRANSIT', 'AT_CUSTOMS', 'OUT_FOR_DELIVERY', 'DELIVERED'];
export const STATUS_LABEL = {
  BOOKED: 'Booked', PICKED_UP: 'Picked up', IN_TRANSIT: 'In transit', AT_CUSTOMS: 'At customs',
  OUT_FOR_DELIVERY: 'Out for delivery', DELIVERED: 'Delivered', ON_HOLD: 'On hold', CANCELLED: 'Cancelled',
};

export const INDUSTRIES = [
  { slug: 'healthcare', title: 'Healthcare', tagline: 'Time-critical and handled with care.', desc: 'Medical devices, diagnostics and pharmaceutical consignments move with priority uplift, careful documentation and clear handover points.', points: ['Priority booking on urgent lanes', 'Documentation support for regulated goods', 'Status updates at every handover'] },
  { slug: 'automotive', title: 'Automotive', tagline: 'Keep the line running.', desc: 'Spare parts and tooling that stop a production line when they are late. We plan routes and back-up options around your dispatch cutoffs.', points: ['AOG and line-down urgency handling', 'Crating for heavy and awkward parts', 'Door pickup and delivery to plants'] },
  { slug: 'electronics', title: 'Electronics', tagline: 'High value, zero guesswork.', desc: 'Components and finished devices need secure handling and low-touch routing. We keep the chain of custody short and visible.', points: ['Secure storage before uplift', 'Anti-static and shock-aware packing guidance', 'Cargo insurance options'] },
  { slug: 'fashion', title: 'Fashion', tagline: 'Ready before the season is.', desc: 'Collections and samples depend on launch dates. We build schedules backwards from your showroom or store-opening deadline.', points: ['Hanging and flat-pack options', 'Fast sample and return flows', 'Delivery windows for store drops'] },
  { slug: 'retail', title: 'Retail', tagline: 'Stock where your customers are.', desc: 'Replenishment and promotional stock moved on predictable schedules, with consolidated options that keep unit costs sensible.', points: ['Consolidated and scheduled shipments', 'Warehousing for peak periods', 'Door delivery to stores and hubs'] },
  { slug: 'manufacturing', title: 'Manufacturing', tagline: 'Inputs in, finished goods out.', desc: 'Raw materials, machinery parts and finished goods across domestic and international lanes, coordinated by one accountable team.', points: ['Freight forwarding across multiple legs', 'Customs and documentation coordination', 'Warehousing and packaging on site needs'] },
];

export const ROLES = ['Operations Executive', 'Customer Support Associate', 'Documentation and Customs Executive', 'Business Development Executive'];
