'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => { try { if (!localStorage.getItem('jac-cookies')) setShow(true); } catch { /* storage blocked */ } }, []);
  if (!show) return null;
  const close = () => { try { localStorage.setItem('jac-cookies', '1'); } catch {} setShow(false); };
  return (
    <div role="dialog" aria-label="Cookie notice" className="glass fixed inset-x-4 bottom-4 z-50 mx-auto flex max-w-xl flex-wrap items-center justify-between gap-3 rounded-2xl p-4 text-sm">
      <p className="text-white/80">We use essential cookies to run this site. See our <Link href="/privacy" className="text-accent underline">Privacy Policy</Link>.</p>
      <button onClick={close} className="btn btn-accent !px-4 !py-2 text-sm">Got it</button>
    </div>
  );
}
