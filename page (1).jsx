'use client';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Download, LogOut, Plus, Trash2, Search } from 'lucide-react';
import { api } from '@/lib/api';
import { STATUS_LABEL } from '@/lib/site';

const STATUSES = Object.keys(STATUS_LABEL);
const empty = { shipperName: '', consigneeName: '', origin: '', destination: '', weightKg: '', pieces: '1', expectedDelivery: '' };

export default function Admin() {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [role, setRole] = useState('STAFF');
  const [apps, setApps] = useState([]);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'STAFF' });
  const [tab, setTab] = useState('shipments');
  const [stats, setStats] = useState(null);
  const [list, setList] = useState({ items: [], count: 0, page: 1, pageSize: 20 });
  const [inq, setInq] = useState([]);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const [form, setForm] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const t = sessionStorage.getItem('jac-token');
    if (!t) router.replace('/admin/login'); else { setToken(t); setRole(sessionStorage.getItem('jac-role') || 'STAFF'); }
  }, [router]);

  const call = useCallback(async (path, opts) => {
    try { return await api(path, { ...opts, token }); }
    catch (e) { if (e.status === 401) { sessionStorage.removeItem('jac-token'); router.replace('/admin/login'); } else setMsg(e.message); throw e; }
  }, [token, router]);

  const load = useCallback(async () => {
    if (!token) return;
    const qs = new URLSearchParams({ q, status, page }).toString();
    try {
      const [s, l, i, a] = await Promise.all([call('/api/admin/stats'), call(`/api/admin/shipments?${qs}`), call('/api/admin/inquiries'), call('/api/admin/applications')]);
      setStats(s); setList(l); setInq(i.items); setApps(a.items);
      if (role === 'ADMIN') setUsers((await call('/api/admin/users')).items);
    } catch {}
  }, [token, role, q, status, page, call]);

  useEffect(() => { const t = setTimeout(load, 250); return () => clearTimeout(t); }, [load]);

  async function create(e) {
    e.preventDefault(); setMsg('');
    const b = { ...form, weightKg: form.weightKg ? Number(form.weightKg) : null, pieces: Number(form.pieces) || 1, expectedDelivery: form.expectedDelivery ? new Date(form.expectedDelivery).toISOString() : null };
    try { const s = await call('/api/admin/shipments', { method: 'POST', body: b }); setMsg(`Created ${s.trackingNumber}`); setForm(null); load(); } catch {}
  }
  async function update(id, body) { try { await call(`/api/admin/shipments/${id}`, { method: 'PATCH', body }); load(); } catch {} }
  async function remove(s) { if (confirm(`Delete shipment ${s.trackingNumber}? This cannot be undone.`)) { try { await call(`/api/admin/shipments/${s.id}`, { method: 'DELETE' }); load(); } catch {} } }
  async function setInquiry(id, st) { try { await call(`/api/admin/inquiries/${id}`, { method: 'PATCH', body: { status: st } }); load(); } catch {} }
  async function addUser(e) {
    e.preventDefault(); setMsg('');
    try { await call('/api/admin/users', { method: 'POST', body: newUser }); setMsg(`User ${newUser.email} created`); setNewUser({ name: '', email: '', password: '', role: 'STAFF' }); load(); } catch {}
  }
  async function removeUser(u) { if (confirm(`Remove user ${u.email}?`)) { try { await call(`/api/admin/users/${u.id}`, { method: 'DELETE' }); load(); } catch {} } }
  async function exportCsv() {
    const res = await api('/api/admin/shipments.csv', { token, raw: true });
    if (!res.ok) return setMsg('Export failed');
    const url = URL.createObjectURL(await res.blob());
    Object.assign(document.createElement('a'), { href: url, download: 'shipments.csv' }).click();
    URL.revokeObjectURL(url);
  }

  if (!token) return null;
  const maxCount = Math.max(1, ...(stats?.byStatus.map((s) => s.count) || [1]));
  const pages = Math.max(1, Math.ceil(list.count / list.pageSize));

  return (
    <div className="mx-auto max-w-7xl px-5 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold">Jai Air Cargo · Admin</h1>
        <div className="flex gap-2">
          <button onClick={exportCsv} className="btn btn-ghost !px-4 !py-2 text-sm"><Download size={16} />Export CSV</button>
          <button onClick={() => { sessionStorage.removeItem('jac-token'); router.push('/admin/login'); }} className="btn btn-ghost !px-4 !py-2 text-sm"><LogOut size={16} />Sign out</button>
        </div>
      </div>
      {msg && <p role="status" className="mt-4 rounded-lg bg-white/10 p-3 text-sm">{msg}</p>}

      {stats && (
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[['Total shipments', stats.total], ['Last 30 days', stats.last30], ['New inquiries', stats.newInquiries]].map(([l, v]) => <div key={l} className="glass rounded-xl p-5"><p className="text-xs uppercase tracking-widest text-white/50">{l}</p><p className="text-3xl font-extrabold text-accent">{v}</p></div>)}
          <div className="glass rounded-xl p-5"><p className="mb-2 text-xs uppercase tracking-widest text-white/50">By status</p>
            {stats.byStatus.length === 0 ? <p className="text-sm text-white/50">No data yet</p> : stats.byStatus.map((s) => (
              <div key={s.status} className="mb-1 flex items-center gap-2 text-xs"><span className="w-24 shrink-0 truncate">{STATUS_LABEL[s.status]}</span><span className="h-2 rounded bg-accent" style={{ width: `${(s.count / maxCount) * 100}%` }} /><span>{s.count}</span></div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 flex gap-2 border-b border-white/10" role="tablist">
        {['shipments', 'inquiries', 'applications', ...(role === 'ADMIN' ? ['users'] : [])].map((t) => <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)} className={`px-4 py-2 font-bold capitalize ${tab === t ? 'border-b-2 border-accent text-accent' : 'text-white/60'}`}>{t}</button>)}
      </div>

      {tab === 'shipments' && (
        <section className="mt-6">
          <div className="flex flex-wrap gap-3">
            <label className="relative flex-1 min-w-[200px]"><span className="sr-only">Search</span><Search size={16} className="absolute left-3 top-3.5 text-white/40" /><input value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} placeholder="Search tracking no. or name" className="input !pl-9" /></label>
            <select aria-label="Filter by status" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className="input !w-auto"><option value="">All statuses</option>{STATUSES.map((s) => <option key={s} value={s} className="bg-primary">{STATUS_LABEL[s]}</option>)}</select>
            <button onClick={() => setForm(empty)} className="btn btn-accent !px-4 !py-2 text-sm"><Plus size={16} />New shipment</button>
          </div>

          {form && (
            <form onSubmit={create} className="glass mt-4 grid gap-3 rounded-xl p-5 md:grid-cols-3">
              {[['shipperName', 'Shipper'], ['consigneeName', 'Consignee'], ['origin', 'Origin'], ['destination', 'Destination']].map(([k, l]) => <label key={k} className="label">{l}<input required value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} className="input" /></label>)}
              <label className="label">Weight (kg)<input type="number" min="0" step="any" value={form.weightKg} onChange={(e) => setForm({ ...form, weightKg: e.target.value })} className="input" /></label>
              <label className="label">Pieces<input type="number" min="1" value={form.pieces} onChange={(e) => setForm({ ...form, pieces: e.target.value })} className="input" /></label>
              <label className="label">Expected delivery<input type="datetime-local" value={form.expectedDelivery} onChange={(e) => setForm({ ...form, expectedDelivery: e.target.value })} className="input" /></label>
              <div className="flex items-end gap-2"><button className="btn btn-accent !py-2.5">Create</button><button type="button" onClick={() => setForm(null)} className="btn btn-ghost !py-2.5">Cancel</button></div>
            </form>
          )}

          <div className="mt-4 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="bg-white/5 text-xs uppercase tracking-widest text-white/50"><tr>{['Tracking', 'Shipper → Consignee', 'Route', 'Current location', 'Status', ''].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
              <tbody>
                {list.items.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-white/50">No shipments found</td></tr>}
                {list.items.map((s) => (
                  <tr key={s.id} className="border-t border-white/10">
                    <td className="px-4 py-3 font-bold">{s.trackingNumber}</td>
                    <td className="px-4 py-3">{s.shipperName} → {s.consigneeName}</td>
                    <td className="px-4 py-3">{s.origin} → {s.destination}</td>
                    <td className="px-4 py-3"><input defaultValue={s.currentLocation || ''} aria-label="Current location" onBlur={(e) => e.target.value !== (s.currentLocation || '') && update(s.id, { currentLocation: e.target.value })} className="input !py-1.5 text-sm" /></td>
                    <td className="px-4 py-3"><select aria-label="Status" value={s.status} onChange={(e) => update(s.id, { status: e.target.value })} className="input !py-1.5 text-sm">{STATUSES.map((x) => <option key={x} value={x} className="bg-primary">{STATUS_LABEL[x]}</option>)}</select></td>
                    <td className="px-4 py-3">{role === 'ADMIN' && <button onClick={() => remove(s)} aria-label={`Delete ${s.trackingNumber}`} className="text-red-300 hover:text-red-200"><Trash2 size={18} /></button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex items-center justify-between text-sm text-white/60">
            <span>{list.count} shipments</span>
            <span className="flex items-center gap-2"><button disabled={page <= 1} onClick={() => setPage(page - 1)} className="btn btn-ghost !px-3 !py-1 text-sm disabled:opacity-40">Prev</button>{page} / {pages}<button disabled={page >= pages} onClick={() => setPage(page + 1)} className="btn btn-ghost !px-3 !py-1 text-sm disabled:opacity-40">Next</button></span>
          </div>
        </section>
      )}

      {tab === 'inquiries' && (
        <section className="mt-6 grid gap-3">
          {inq.length === 0 && <p className="text-white/50">No inquiries yet.</p>}
          {inq.map((i) => (
            <article key={i.id} className="glass rounded-xl p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-bold">{i.name} <span className="font-normal text-white/60">· {i.phone}{i.email ? ` · ${i.email}` : ''}</span></p>
                <select aria-label="Inquiry status" value={i.status} onChange={(e) => setInquiry(i.id, e.target.value)} className="input !w-auto !py-1.5 text-sm">{['NEW', 'CONTACTED', 'CLOSED'].map((x) => <option key={x} className="bg-primary">{x}</option>)}</select>
              </div>
              <p className="mt-1 text-sm text-white/70">{i.from} → {i.to} · {i.service}{i.weightKg ? ` · ${i.weightKg} kg` : ''}</p>
              {i.message && <p className="mt-2 text-sm text-white/60">{i.message}</p>}
              <p className="mt-2 text-xs text-white/40">{new Date(i.createdAt).toLocaleString('en-IN')}</p>
            </article>
          ))}
        </section>
      )}

      {tab === 'applications' && (
        <section className="mt-6 grid gap-3">
          {apps.length === 0 && <p className="text-white/50">No applications yet.</p>}
          {apps.map((a) => (
            <article key={a.id} className="glass rounded-xl p-5">
              <p className="font-bold">{a.name} <span className="font-normal text-white/60">· {a.role}</span></p>
              <p className="text-sm text-white/70">{a.email} · {a.phone}</p>
              {a.message && <p className="mt-2 whitespace-pre-line text-sm text-white/60">{a.message}</p>}
              <p className="mt-2 text-xs text-white/40">{new Date(a.createdAt).toLocaleString('en-IN')}</p>
            </article>
          ))}
        </section>
      )}

      {tab === 'users' && role === 'ADMIN' && (
        <section className="mt-6">
          <form onSubmit={addUser} className="glass grid gap-3 rounded-xl p-5 md:grid-cols-5">
            <label className="label">Name<input required value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} className="input" /></label>
            <label className="label">Email<input required type="email" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} className="input" /></label>
            <label className="label">Password (12+ characters)<input required type="password" minLength={12} value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} className="input" /></label>
            <label className="label">Role<select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })} className="input"><option className="bg-primary">STAFF</option><option className="bg-primary">ADMIN</option></select></label>
            <div className="flex items-end"><button className="btn btn-accent !py-2.5">Add user</button></div>
          </form>
          <ul className="mt-4 grid gap-2">
            {users.map((u) => <li key={u.id} className="glass flex items-center justify-between rounded-xl px-5 py-3 text-sm"><span><b>{u.name}</b> · {u.email} · <span className="text-accent">{u.role}</span></span><button onClick={() => removeUser(u)} aria-label={`Remove ${u.email}`} className="text-red-300 hover:text-red-200"><Trash2 size={18} /></button></li>)}
          </ul>
          <p className="mt-3 text-xs text-white/50">Staff can view and update shipments and inquiries. Only admins can delete shipments and manage users.</p>
        </section>
      )}
    </div>
  );
}
