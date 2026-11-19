'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin } from 'lucide-react';
import { SITE } from '@/lib/site';

export default function SiteFooter() {
  const path = usePathname();
  if (path.startsWith('/admin')) return null;
  return (
    <footer className="border-t border-white/10 bg-primary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-xl font-extrabold">{SITE.name}</p>
          <p className="mt-3 max-w-sm text-sm text-white/60">Fast, reliable and secure air cargo solutions for businesses that cannot afford delays.</p>
        </div>
        <div>
          <p className="mb-3 text-sm font-bold uppercase tracking-widest text-accent">Company</p>
          <ul className="grid gap-2 text-sm text-white/70">
            {[['/about', 'About'], ['/services', 'Services'], ['/industries', 'Industries'], ['/careers', 'Careers'], ['/track', 'Track Shipment'], ['/contact', 'Contact'], ['/privacy', 'Privacy Policy'], ['/terms', 'Terms']].map(([h, l]) => <li key={h}><Link className="hover:text-white" href={h}>{l}</Link></li>)}
          </ul>
        </div>
        <div className="grid content-start gap-3 text-sm text-white/70">
          <p className="mb-0 text-sm font-bold uppercase tracking-widest text-accent">Reach us</p>
          <a className="flex gap-2 hover:text-white" href={`tel:${SITE.phone.replace(/\s/g, '')}`}><Phone size={16} className="mt-0.5 shrink-0" />{SITE.phone}</a>
          <a className="flex gap-2 hover:text-white" href={`mailto:${SITE.email}`}><Mail size={16} className="mt-0.5 shrink-0" />{SITE.email}</a>
          <p className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0" />{SITE.address}</p>
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs text-white/40">© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
    </footer>
  );
}
