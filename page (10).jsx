import Reveal from '@/components/Reveal';
import Counter from '@/components/Counter';
import { Target, Eye, Heart } from 'lucide-react';

export const metadata = { title: 'About Us', description: 'The story, mission and values behind Jai Air Cargo Private Limited.' };

const VALUES = [['Reliability', 'We plan around your deadline and keep promises.'], ['Transparency', 'Clear pricing and honest status at every stage.'], ['Care', 'Every consignment is handled as if it were our own.'], ['Accountability', 'One team that owns the shipment from pickup to delivery.']];
// TODO: replace with your real milestones.
const JOURNEY = [['[Year]', 'Company founded'], ['[Year]', 'First international lane opened'], ['[Year]', 'Warehousing and packaging added'], ['[Year]', 'Online shipment tracking launched']];
const HUBS = [['Delhi', 'DEL', 52, 28], ['Mumbai', 'BOM', 42, 52], ['Dubai', 'DXB', 28, 38], ['London', 'LHR', 8, 18], ['Singapore', 'SIN', 72, 66], ['New York', 'JFK', -14, 30]];

export default function About() {
  return (
    <div className="pt-24">
      <section className="section pb-10">
        <Reveal><span className="eyebrow">About us</span><h1 className="h2 max-w-3xl">A logistics partner built on trust.</h1></Reveal>
        <Reveal delay={0.1}><p className="mt-6 max-w-2xl text-lg text-white/70">Jai Air Cargo Private Limited moves businesses&apos; goods by air with care, clear communication and dependable timelines. [Add your company story: when and why you started, who you serve, and what makes your team different.]</p></Reveal>
      </section>

      <section className="section grid gap-5 py-10 md:grid-cols-2">
        {[[Target, 'Our mission', 'To deliver every shipment safely and on time, with honest communication from booking to delivery.'], [Eye, 'Our vision', 'To be the air cargo partner businesses trust first for speed, security and service.']].map(([Icon, t, d], i) => (
          <Reveal key={t} delay={i * 0.1}><div className="glass h-full rounded-2xl p-8"><Icon className="mb-4 text-accent" /><h2 className="text-2xl font-bold">{t}</h2><p className="mt-2 text-white/65">{d}</p></div></Reveal>
        ))}
      </section>

      <section className="section py-10">
        <Reveal><h2 className="h2"><Heart className="mr-3 inline text-accent" />Our values</h2></Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map(([t, d], i) => <Reveal key={t} delay={i * 0.08}><div className="rounded-2xl border border-white/10 p-6 transition hover:border-accent/60"><h3 className="font-bold text-accent">{t}</h3><p className="mt-2 text-sm text-white/65">{d}</p></div></Reveal>)}
        </div>
      </section>

      <section className="section py-10">
        <Reveal><h2 className="h2">Our journey</h2></Reveal>
        <ol className="mt-8 border-l-2 border-accent/40 pl-8">
          {JOURNEY.map(([y, t], i) => <Reveal key={t} delay={i * 0.08}><li className="relative pb-8"><span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-accent" /><p className="font-extrabold text-accent">{y}</p><p className="text-white/75">{t}</p></li></Reveal>)}
        </ol>
      </section>

      <section className="section py-10">
        <Reveal><div className="glass rounded-2xl p-8 md:p-12"><span className="eyebrow">Founder message</span><p className="text-xl text-white/80">&ldquo;[Add a short message from the founder or managing director.]&rdquo;</p><p className="mt-4 font-bold">[Name], [Title]</p></div></Reveal>
      </section>

      <section className="bg-primary/50"><div className="section grid gap-8 py-14 text-center md:grid-cols-3">
        {[[10, '+', 'Years of experience'], [25000, '+', 'Shipments delivered'], [98, '%', 'On-time delivery']].map(([n, s, l]) => <Reveal key={l}><p className="text-5xl font-extrabold text-accent"><Counter to={n} suffix={s} /></p><p className="mt-2 text-sm text-white/60">{l}</p></Reveal>)}
      </div></section>

      <section className="section">
        <Reveal><span className="eyebrow">Network</span><h2 className="h2">Where we move cargo.</h2></Reveal>
        <Reveal delay={0.1}>
          <div className="glass relative mt-10 aspect-[2/1] overflow-hidden rounded-2xl" role="img" aria-label="Map of key air cargo hubs">
            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:18px_18px]" />
            {HUBS.map(([n, c, x, y]) => (
              <div key={c} className="group absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${x < 0 ? x + 100 : x}%`, top: `${y}%` }}>
                <span className="relative block h-3 w-3 rounded-full bg-accent"><span className="absolute inset-0 animate-ping rounded-full bg-accent/60" /></span>
                <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap rounded bg-bg/80 px-2 py-0.5 text-xs font-bold opacity-0 transition group-hover:opacity-100 sm:opacity-100">{n} · {c}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
