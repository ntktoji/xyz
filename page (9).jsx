import { SITE } from '@/lib/site';
export const metadata = { title: 'Privacy Policy' };
export default function Privacy() {
  return (
    <article className="section max-w-3xl pt-32 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-bold [&_p]:mt-3 [&_p]:text-white/70 [&_li]:text-white/70">
      <h1 className="h2">Privacy Policy</h1>
      <p>Last updated: [date]. This is a starting template. Have it reviewed by a qualified lawyer, including for India&apos;s Digital Personal Data Protection Act, before launch.</p>
      <h2>Who we are</h2><p>{SITE.name}, {SITE.address}. Contact: {SITE.email}.</p>
      <h2>What we collect</h2><ul className="mt-3 list-disc pl-6"><li>Details you submit in enquiry forms: name, phone, email, route, weight and message.</li><li>Shipment details we hold to deliver your cargo and show tracking.</li><li>Basic technical data such as IP address, used for security and rate limiting.</li></ul>
      <h2>How we use it</h2><p>To respond to enquiries, move and track shipments, meet legal obligations and keep the site secure.</p>
      <h2>Sharing</h2><p>We share data only with carriers, customs and delivery partners needed to complete your shipment, and where the law requires it.</p>
      <h2>Retention and your rights</h2><p>We keep data only as long as needed. You may ask to access, correct or delete your data by emailing {SITE.email}.</p>
      <h2>Cookies</h2><p>We use only essential cookies and local storage needed to run the site.</p>
    </article>
  );
}
