import { Suspense } from 'react';
import Reveal from '@/components/Reveal';
import CareerForm from './CareerForm';
import { Users, TrendingUp, Clock } from 'lucide-react';

export const metadata = { title: 'Careers', description: 'Join the team that keeps cargo moving. Send an application to Jai Air Cargo.' };

export default function Careers() {
  return (
    <div className="section pt-32">
      <Reveal><span className="eyebrow">Careers</span><h1 className="h2 max-w-3xl">Help the world&apos;s cargo arrive on time.</h1></Reveal>
      <Reveal delay={0.1}><p className="mt-6 max-w-2xl text-lg text-white/70">Logistics runs on people who stay calm when a flight changes and care when a customer is waiting. If that sounds like you, send us an application.</p></Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {[[Users, 'Work that matters', 'Every shipment is a customer promise. You will see the result of your work the same day.'], [Clock, 'Real responsibility', 'Small teams mean you own your lane early, with support from people who know the business.'], [TrendingUp, 'Room to grow', 'Operations, customer service, documentation and sales all grow as the network does.']].map(([Icon, t, d], i) => (
          <Reveal key={t} delay={i * 0.08}><div className="glass h-full rounded-2xl p-6"><Icon className="mb-3 text-accent" /><h2 className="font-bold">{t}</h2><p className="mt-2 text-sm text-white/65">{d}</p></div></Reveal>
        ))}
      </div>
      <div className="mx-auto mt-14 max-w-2xl"><Suspense fallback={null}><CareerForm /></Suspense></div>
    </div>
  );
}
