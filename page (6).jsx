import { Suspense } from 'react';
import ContactForm from './ContactForm';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/site';

export const metadata = { title: 'Contact', description: 'Request a quote or talk to the Jai Air Cargo team.' };

export default function Contact() {
  const items = [
    [Phone, 'Phone', SITE.phone, `tel:${SITE.phone.replace(/\s/g, '')}`],
    [Mail, 'Email', SITE.email, `mailto:${SITE.email}`],
    [MessageCircle, 'WhatsApp', 'Chat with us', `https://wa.me/${SITE.whatsapp}`],
    [MapPin, 'Office', SITE.address],
    [Clock, 'Office hours', SITE.hours],
  ];
  return (
    <div className="section pt-32">
      <span className="eyebrow">Contact</span>
      <h1 className="h2 max-w-2xl">Let&apos;s move your cargo.</h1>
      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <div className="grid content-start gap-4 lg:col-span-2">
          {items.map(([Icon, t, v, href]) => {
            const body = (<><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent"><Icon size={20} /></span><span><span className="block text-xs uppercase tracking-widest text-white/50">{t}</span><span className="font-semibold">{v}</span></span></>);
            return href ? <a key={t} href={href} className="glass flex items-center gap-4 rounded-xl p-4 transition hover:border-accent/60" {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{body}</a> : <div key={t} className="glass flex items-center gap-4 rounded-xl p-4">{body}</div>;
          })}
          <div className="flex gap-3 text-sm text-white/60">
            {Object.entries(SITE.social).map(([k, u]) => <a key={k} href={u} className="capitalize underline hover:text-white" rel="noopener noreferrer">{k}</a>)}
          </div>
        </div>
        <div className="lg:col-span-3"><Suspense fallback={null}><ContactForm /></Suspense></div>
      </div>
      <iframe title="Office location map" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="mt-12 h-80 w-full rounded-2xl border border-white/10 grayscale invert-[.9] contrast-[.9]"
        src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapQuery)}&output=embed`} />
    </div>
  );
}
