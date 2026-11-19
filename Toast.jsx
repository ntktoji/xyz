'use client';
import { createContext, useCallback, useContext, useState } from 'react';

const Ctx = createContext(() => {});
export const useToast = () => useContext(Ctx);

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);
  const push = useCallback((message, type = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setItems((s) => [...s, { id, message, type }]);
    setTimeout(() => setItems((s) => s.filter((t) => t.id !== id)), 5000);
  }, []);
  return (
    <Ctx.Provider value={push}>
      {children}
      <div aria-live="polite" className="fixed right-4 top-20 z-[60] grid gap-2">
        {items.map((t) => (
          <div key={t.id} role="status" className={`glass rounded-xl px-4 py-3 text-sm font-semibold ${t.type === 'error' ? 'border-red-400/60 text-red-200' : 'border-emerald-400/60 text-emerald-200'}`}>{t.message}</div>
        ))}
      </div>
    </Ctx.Provider>
  );
}
