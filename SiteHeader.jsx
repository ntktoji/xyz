'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Plane } from 'lucide-react';
import { SITE } from '@/lib/site';

const LINKS = [['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/industries', 'Industries'], ['/track', 'Track'], ['/careers', 'Careers'], ['/contact', 'Contact']];

export default function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  if (path.startsWith('/admin')) return null;
  return (
    <header className="fixed inset-x-0 top-0 z-40 glass !border-x-0 !border-t-0">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2 font-extrabold" aria-label={`${SITE.name} home`}>
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-bg"><Plane size={20} /></span>
          <span className="leading-none">Jai Air Cargo<small className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">Private Limited</small></span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {LINKS.map(([href, label]) => (
            <Link key={href} href={href} aria-current={path === href ? 'page' : undefined}
              className={`text-sm font-semibold transition hover:text-accent ${path === href ? 'text-accent' : 'text-white/80'}`}>{label}</Link>
          ))}
          <Link href="/contact" className="btn btn-accent !px-4 !py-2 text-sm">Get Quote</Link>
        </nav>
        <button className="md:hidden" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && (
        <nav aria-label="Mobile" className="grid gap-1 border-t border-white/10 bg-bg/95 px-5 py-4 md:hidden">
          {LINKS.map(([href, label]) => <Link key={href} href={href} onClick={() => setOpen(false)} className="py-2 font-semibold text-white/90">{label}</Link>)}
        </nav>
      )}
    </header>
  );
}
