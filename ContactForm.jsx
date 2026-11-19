'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, Send } from 'lucide-react';
import { api } from '@/lib/api';
import { useToast } from '@/components/Toast';
import { SERVICES } from '@/lib/site';

export default function ContactForm() {
  const params = useSearchParams();
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({});

  async function submit(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const errs = {};
    if (f.name.trim().length < 2) errs.name = 'Enter your name';
    if (!/^[+0-9 ()-]{7,20}$/.test(f.phone.trim())) errs.phone = 'Enter a valid phone number';
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) errs.email = 'Enter a valid email';
    if (f.from.trim().length < 2) errs.from = 'Required';
    if (f.to.trim().length < 2) errs.to = 'Required';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    try {
      const r = await api('/api/inquiries', { method: 'POST', body: f });
      toast(`Thank you. Your enquiry is received${r.reference ? ` (ref ${r.reference})` : ''}. We will contact you soon.`);
      e.currentTarget.reset();
    } catch (err) { toast(err.message, 'error'); }
    finally { setBusy(false); }
  }

  const Err = ({ k }) => (errors[k] ? <span role="alert" className="text-xs font-medium text-red-300">{errors[k]}</span> : null);
  return (
    <form onSubmit={submit} noValidate className="glass grid gap-4 rounded-2xl p-6 md:p-8">
      <h2 className="text-xl font-bold">Request a quote</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="label">Name<input name="name" className="input" autoComplete="name" /><Err k="name" /></label>
        <label className="label">Phone<input name="phone" className="input" autoComplete="tel" inputMode="tel" /><Err k="phone" /></label>
      </div>
      <label className="label">Email (optional)<input name="email" type="email" className="input" autoComplete="email" /><Err k="email" /></label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="label">From<input name="from" className="input" placeholder="Origin city / airport" /><Err k="from" /></label>
        <label className="label">To<input name="to" className="input" placeholder="Destination city / airport" /><Err k="to" /></label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="label">Service
          <select name="service" className="input" defaultValue={params.get('service') || SERVICES[0].title}>{SERVICES.map((s) => <option key={s.slug} className="bg-primary">{s.title}</option>)}</select>
        </label>
        <label className="label">Approx. weight (kg)<input name="weightKg" className="input" inputMode="decimal" /></label>
      </div>
      <label className="label">Details<textarea name="message" rows={4} className="input" placeholder="Type of goods, dimensions, deadline" /></label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <button className="btn btn-accent" disabled={busy}>{busy ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}Send enquiry</button>
    </form>
  );
}
