import Link from 'next/link';
import { Globe2, Zap, Headphones, ShieldCheck, Clock, ArrowRight, Plus } from 'lucide-react';
import GlobeHero from '@/components/GlobeHero';
import Reveal from '@/components/Reveal';
import Counter from '@/components/Counter';
import { SERVICES } from '@/lib/site';

const WHY = [
  [Globe2, 'Worldwide Logistics', 'Routes across major air corridors with one accountable partner.'],
  [Zap, 'Fast Delivery', 'Priority uplift and tight handover to protect your deadlines.'],
  [Headphones, '24/7 Support', 'A real person to answer when your shipment needs attention.'],
  [ShieldCheck, 'Safe Cargo', 'Careful handling, secure storage and transit insurance options.'],
];
// TODO: replace with your real figures before launch.
const STATS = [[10, '+', 'Years of experience'], [500, '+', 'Cities and airports served'], [25000, '+', 'Shipments delivered'], [98, '%', 'On-time delivery']];
const STEPS = [['Request', 'Tell us what you are shipping and where.'], ['Plan', 'We confirm route, timeline and rate.'], ['Move', 'Pickup, documentation and uplift handled for you.'], ['Deliver', 'Signed-for delivery with full tracking history.']];
const FAQ = [
  ['How do I track my shipment?', 'Enter your tracking number (for example JAC102938475) on the Track Shipment page to see live status and history.'],
  ['What can I ship by air?', 'Most general cargo, documents, perishables and high-value goods. Dangerous goods need prior approval, so contact us first.'],
  ['Do you handle customs paperwork?', 'Yes. We coordinate documentation and clearance so your cargo keeps moving.'],
  ['How quickly will I get a quote?', 'Send the enquiry form with route and weight and our team will respond with a quote.'],
];

export default function Home() {
  return (
    <>
      <section className="relative isolate flex min-h-screen items-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_30%,rgba(29,78,216,.35),transparent_60%),radial-gradient(ellipse_at_20%_80%,rgba(245,158,11,.12),transparent_50%)] animate-drift" />
        <div className="absolute inset-y-0 right-0 -z-10 w-full opacity-90 md:w-[62%]"><GlobeHero /></div>
        <div className="mx-auto w-full max-w-6xl px-5 pt-24">
          <Reveal><span className="eyebrow">Jai Air Cargo Private Limited</span></Reveal>
          <Reveal delay={0.1}><h1 className="max-w-2xl text-5xl font-extrabold leading-[1.05] md:text-7xl">Delivering <span className="gradient-text animate-shine">Trust</span> Across Every Mile</h1></Reveal>
          <Reveal delay={0.2}><p className="mt-6 text-xl font-semibold text-white/80">Fast. Reliable. Secure Air Cargo Solutions.</p></Reveal>
          <Reveal delay={0.3}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/track" className="btn btn-accent">Track Shipment <ArrowRight size={18} /></Link>
              <Link href="/contact" className="btn btn-ghost">Get Quote</Link>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="glass mt-12 grid max-w-xl grid-cols-3 gap-4 rounded-2xl p-5 text-center">
              {[['24/7', 'Support'], ['Door to door', 'Service'], ['Tracked', 'End to end']].map(([a, b]) => <div key={a}><p className="font-extrabold text-accent">{a}</p><p className="text-xs text-white/60">{b}</p></div>)}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Reveal><span className="eyebrow">Why choose us</span><h2 className="h2 max-w-2xl">Built for cargo that cannot be late.</h2></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHY.map(([Icon, t, d], i) => (
            <Reveal key={t} delay={i * 0.08}>
              <div className="glass group h-full rounded-2xl p-6 transition duration-300 hover:-translate-y-2 hover:border-accent/60 hover:shadow-[0_20px_60px_-20px_rgba(245,158,11,.4)]">
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent"><Icon /></span>
                <h3 className="text-lg font-bold">{t}</h3><p className="mt-2 text-sm text-white/60">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-primary/50">
        <div className="section grid gap-8 py-16 text-center md:grid-cols-4 md:py-20">
          {STATS.map(([n, s, l]) => (
            <Reveal key={l}><p className="text-5xl font-extrabold text-accent"><Counter to={n} suffix={s} /></p><p className="mt-2 text-sm text-white/60">{l}</p></Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <Reveal><span className="eyebrow">How it works</span><h2 className="h2">From booking to doorstep.</h2></Reveal>
        <ol className="mt-12 grid gap-6 md:grid-cols-4">
          {STEPS.map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.1}>
              <li className="relative rounded-2xl border border-white/10 p-6">
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-full border-2 border-accent font-extrabold text-accent">{i + 1}</span>
                <h3 className="font-bold">{t}</h3><p className="mt-1 text-sm text-white/60">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="section pt-0">
        <Reveal><span className="eyebrow">Services</span><h2 className="h2">Everything your cargo needs.</h2></Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 0.08}>
              <Link href="/services" className="glass block h-full rounded-2xl p-6 transition duration-300 hover:-translate-y-2 hover:bg-white/15 [transform-style:preserve-3d] hover:[transform:perspective(800px)_rotateX(3deg)_translateY(-8px)]">
                <h3 className="text-lg font-bold">{s.title}</h3><p className="mt-2 text-sm text-white/60">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent">Learn more <ArrowRight size={14} /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <Reveal><span className="eyebrow">Testimonials</span><h2 className="h2">What customers say.</h2></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <Reveal key={n} delay={n * 0.08}>
              <figure className="glass h-full rounded-2xl p-6">
                <blockquote className="text-white/70">[Replace with a real customer quote]</blockquote>
                <figcaption className="mt-4 text-sm font-bold">Customer name, Company</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/40">[Partner / airline logos go here]</p>
      </section>

      <section className="section max-w-3xl pt-0">
        <Reveal><span className="eyebrow">FAQ</span><h2 className="h2">Quick answers.</h2></Reveal>
        <div className="mt-8 grid gap-3">
          {FAQ.map(([q, a]) => (
            <details key={q} className="glass group rounded-xl p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold">{q}<Plus className="shrink-0 transition group-open:rotate-45" size={18} /></summary>
              <p className="mt-3 text-sm text-white/65">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section pt-0">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-primary p-10 text-center md:p-16">
            <Clock className="mx-auto mb-4 text-accent" />
            <h2 className="h2">Ready to move your cargo?</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/75">Tell us your route and weight. We will come back with a plan and a quote.</p>
            <Link href="/contact" className="btn btn-accent mt-8">Get Quote</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
