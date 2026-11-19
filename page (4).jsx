import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { SERVICES } from '@/lib/site';

export const metadata = { title: 'Services', description: 'Air cargo, domestic and international freight, express delivery, warehousing, packaging, forwarding, door pickup and delivery, and cargo insurance.' };

export default function Services() {
  return (
    <div className="section pt-32">
      <Reveal><span className="eyebrow">Services</span><h1 className="h2 max-w-3xl">Complete air cargo and logistics services.</h1></Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {SERVICES.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 2) * 0.08}>
            <article id={s.slug} className="glass group relative h-full overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-2 hover:border-accent/60">
              {/* TODO: replace this panel with a real photo using next/image */}
              <div className="relative h-40 bg-gradient-to-br from-secondary/60 to-primary">
                <div className="absolute inset-0 opacity-30 transition duration-500 [background:repeating-linear-gradient(115deg,rgba(255,255,255,.15)_0_2px,transparent_2px_28px)] group-hover:translate-x-6" />
                <span className="absolute bottom-3 left-4 text-xs font-bold uppercase tracking-widest text-white/60">{s.img}</span>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold">{s.title}</h2>
                <p className="mt-2 text-white/65">{s.desc}</p>
                <Link href={`/contact?service=${encodeURIComponent(s.title)}`} className="mt-5 inline-flex items-center gap-1 font-bold text-accent">Request this service <ArrowRight size={16} className="transition group-hover:translate-x-1" /></Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
