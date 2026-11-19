import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { INDUSTRIES } from '@/lib/site';

export const metadata = { title: 'Industries', description: 'Air cargo solutions for healthcare, automotive, electronics, fashion, retail and manufacturing.' };

export default function Industries() {
  return (
    <div className="pt-32">
      <section className="section py-10">
        <Reveal><span className="eyebrow">Industries</span><h1 className="h2 max-w-3xl">Every industry ships differently. We plan for yours.</h1></Reveal>
        <Reveal delay={0.1}><p className="mt-6 max-w-2xl text-lg text-white/70">The right route, packing and handover points depend on what is inside the box and who is waiting for it. Here is how we approach six sectors.</p></Reveal>
      </section>
      <section className="section grid gap-6 py-10 md:grid-cols-2">
        {INDUSTRIES.map((x, i) => (
          <Reveal key={x.slug} delay={(i % 2) * 0.08}>
            <article id={x.slug} className="glass group h-full rounded-2xl p-8 transition duration-300 hover:-translate-y-2 hover:border-accent/60">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-accent">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="mt-3 text-2xl font-extrabold">{x.title}</h2>
              <p className="mt-1 font-semibold text-white/80">{x.tagline}</p>
              <p className="mt-4 text-white/65">{x.desc}</p>
              <ul className="mt-5 grid gap-2">{x.points.map((p) => <li key={p} className="flex gap-2 text-sm text-white/75"><Check size={16} className="mt-0.5 shrink-0 text-accent" />{p}</li>)}</ul>
              <Link href={`/contact?service=${encodeURIComponent('Air Cargo')}`} className="mt-6 inline-flex items-center gap-1 font-bold text-accent">Talk to us about {x.title.toLowerCase()} <ArrowRight size={16} className="transition group-hover:translate-x-1" /></Link>
            </article>
          </Reveal>
        ))}
      </section>
    </div>
  );
}
