import { SITE } from '@/lib/site';
export const metadata = { title: 'Terms of Service' };
export default function Terms() {
  return (
    <article className="section max-w-3xl pt-32 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_p]:mt-3 [&_p]:text-white/70">
      <h1 className="h2">Terms of Service</h1>
      <p>Last updated: [date]. This is a starting template. Have it reviewed by a qualified lawyer before launch, and attach your standard carriage conditions.</p>
      <h2>Use of this website</h2><p>The information on this site is general. Rates, transit times and availability are confirmed only in a written quotation from {SITE.name}.</p>
      <h2>Shipments</h2><p>Each shipment is governed by the booking confirmation and our carriage conditions. Prohibited and dangerous goods may not be shipped without prior written approval.</p>
      <h2>Tracking</h2><p>Tracking information is provided for convenience and may be delayed or change as cargo moves.</p>
      <h2>Liability</h2><p>Liability is limited as stated in the applicable carriage conditions and law. Cargo insurance is available on request.</p>
      <h2>Governing law</h2><p>These terms are governed by the laws of India. [Add jurisdiction.]</p>
      <h2>Contact</h2><p>{SITE.email}</p>
    </article>
  );
}
