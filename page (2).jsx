'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Lock } from 'lucide-react';
import { api } from '@/lib/api';

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget));
    setBusy(true); setError('');
    try {
      const r = await api('/api/admin/login', { method: 'POST', body: f });
      sessionStorage.setItem('jac-token', r.token);
      sessionStorage.setItem('jac-role', r.user.role);
      router.push('/admin');
    } catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }

  return (
    <div className="grid min-h-screen place-items-center px-5">
      <form onSubmit={submit} className="glass grid w-full max-w-sm gap-4 rounded-2xl p-8">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-accent text-bg"><Lock /></span>
        <h1 className="text-2xl font-extrabold">Admin sign in</h1>
        <label className="label">Email<input name="email" type="email" required autoComplete="username" className="input" /></label>
        <label className="label">Password<input name="password" type="password" required autoComplete="current-password" className="input" /></label>
        {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
        <button className="btn btn-accent" disabled={busy}>{busy && <Loader2 className="animate-spin" size={18} />}Sign in</button>
      </form>
    </div>
  );
}
