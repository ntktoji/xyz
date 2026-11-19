'use client';
import { useEffect, useRef } from 'react';

// Soft glow that follows the mouse. Hidden on touch devices via CSS.
export default function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    let x = 0, y = 0, cx = 0, cy = 0, raf;
    const move = (e) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      cx += (x - cx) * 0.15; cy += (y - cy) * 0.15;
      if (el) el.style.transform = `translate3d(${cx - 150}px, ${cy - 150}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} aria-hidden="true" className="cursor-dot pointer-events-none fixed left-0 top-0 z-[5] h-[300px] w-[300px] rounded-full opacity-60"
      style={{ background: 'radial-gradient(circle, rgba(29,78,216,.28), transparent 65%)' }} />
  );
}
