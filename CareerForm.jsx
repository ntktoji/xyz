'use client';
import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';
import { api } from '@/lib/api';
import { useToast } from '@/components/Toast';
import { ROLES } from '@/lib/site';

export default function CareerForm() {
  const toast = useToast();
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState({});

  async function submit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = Object.fromEntries(new FormData(form));
    const errs = {};
    if (f.name.trim().length < 2) errs.name = 'Enter your name';
    if (!/^\S+@\S+\.\S+$/.test(f.email)) errs.email = 'Enter a valid email';
    if (!/^[+0-9 ()-]{7,20}$/.test(f.phone.trim())) errs.phone = 'Enter a valid phone number';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    try { await api('/api/applications', { method: 'POST', body: f }); toast('Application received. Our team will be in touch if there is a fit.'); form.reset(); }
    catch (err) { toast(err.message, 'error'); }
    finally { setBusy(false); }
  }

  const Err = ({ k }) => (errors[k] ? <span role="alert" className="text-xs font-medium text-red-300">{errors[k]}</span> : null);
  return (
    <form onSubmit={submit} noValidate className="glass grid gap-4 rounded-2xl p-6 md:p-8">
      <h2 className="text-xl font-bold">Send your application</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="label">Name<input name="name" className="input" autoComplete="name" /><Err k="name" /></label>
        <label className="label">Phone<input name="phone" className="input" autoComplete="tel" inputMode="tel" /><Err k="phone" /></label>
      </div>
      <label className="label">Email<input name="email" type="email" className="input" autoComplete="email" /><Err k="email" /></label>
      <label className="label">Area of interest<select name="role" className="input">{ROLES.map((r) => <option key={r} className="bg-primary">{r}</option>)}<option className="bg-primary">Other</option></select></label>
      <label className="label">About you<textarea name="message" rows={5} className="input" placeholder="Your experience, and a link to your CV or LinkedIn profile" /></label>
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
      <button className="btn btn-accent" disabled={busy}>{busy ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}Submit application</button>
    </form>
  );
}
