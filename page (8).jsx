'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, CalendarClock, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { api } from '@/lib/api';
import { STATUS_STEPS, STATUS_LABEL } from '@/lib/site';

const fmt = (d) => new Date(d).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' });

export default function Track() {
  const [num, setNum] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    const n = num.trim().toUpperCase();
    setError(''); setData(null);
    if (!/^[A-Z0-9-]{6,30}$/.test(n)) return setError('Enter a valid tracking number, e.g. JAC102938475');
    setLoading(true);
    try { setData(await api(`/api/track/${encodeURIComponent(n)}`)); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }

  const idx = data ? STATUS_STEPS.indexOf(data.status) : -1;
  const pct = idx < 0 ? 0 : Math.round((idx / (STATUS_STEPS.length - 1)) * 100);
  const exception = data && idx < 0;

  return (
    <div className="section max-w-3xl pt-32">
      <span className="eyebrow">Track shipment</span>
      <h1 className="h2">Where is my cargo?</h1>
      <form onSubmit={submit} className="glass mt-8 flex gap-2 rounded-2xl p-2" role="search">
        <label htmlFor="trk" className="sr-only">Tracking number</label>
        <input id="trk" value={num} onChange={(e) => setNum(e.target.value)} placeholder="e.g. JAC102938475" autoComplete="off" className="min-w-0 flex-1 bg-transparent px-4 py-3 uppercase outline-none placeholder:normal-case placeholder:text-white/40" />
        <button className="btn btn-accent !px-5" disabled={loading}>{loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}<span className="hidden sm:inline">Track</span></button>
      </form>

      {error && <p role="alert" className="mt-6 flex items-start gap-2 rounded-xl border border-red-400/40 bg-red-500/10 p-4 text-red-200"><AlertTriangle size={18} className="mt-0.5 shrink-0" />{error}</p>}

      {data && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass mt-8 rounded-2xl p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div><p className="text-xs uppercase tracking-widest text-white/50">Tracking number</p><p className="text-2xl font-extrabold">{data.trackingNumber}</p></div>
            <span className={`rounded-full px-4 py-1.5 text-sm font-bold ${exception ? 'bg-red-500/20 text-red-200' : 'bg-accent text-bg'}`}>{STATUS_LABEL[data.status]}</span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <p><span className="block text-xs uppercase tracking-widest text-white/50">Origin</span><b>{data.origin}</b></p>
            <p><span className="block text-xs uppercase tracking-widest text-white/50">Destination</span><b>{data.destination}</b></p>
            <p className="flex gap-2"><MapPin size={16} className="mt-1 shrink-0 text-accent" /><span><span className="block text-xs uppercase tracking-widest text-white/50">Current location</span><b>{data.currentLocation || 'Not available'}</b></span></p>
            <p className="flex gap-2"><CalendarClock size={16} className="mt-1 shrink-0 text-accent" /><span><span className="block text-xs uppercase tracking-widest text-white/50">Expected delivery</span><b>{data.expectedDelivery ? fmt(data.expectedDelivery) : 'To be confirmed'}</b></span></p>
          </div>
          {!exception && (
            <div className="mt-8">
              <div className="h-2 overflow-hidden rounded-full bg-white/10" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
                <motion.div className="h-full rounded-full bg-gradient-to-r from-secondary to-accent" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 1.1, ease: 'easeOut' }} />
              </div>
              <div className="mt-2 hidden justify-between text-xs text-white/50 sm:flex">{STATUS_STEPS.map((s, i) => <span key={s} className={i <= idx ? 'font-bold text-accent' : ''}>{STATUS_LABEL[s]}</span>)}</div>
            </div>
          )}
          <h2 className="mb-4 mt-10 text-lg font-bold">Shipment history</h2>
          <ol className="border-l-2 border-white/15 pl-6">
            {[...data.events].reverse().map((ev, i) => (
              <li key={i} className="relative pb-6 last:pb-0">
                <CheckCircle2 size={18} className={`absolute -left-[34px] top-0 rounded-full bg-bg ${i === 0 ? 'text-accent' : 'text-white/40'}`} />
                <p className="font-bold">{ev.description}</p><p className="text-sm text-white/60">{ev.location} · {fmt(ev.occurredAt)}</p>
              </li>
            ))}
          </ol>
        </motion.div>
      )}
    </div>
  );
}
