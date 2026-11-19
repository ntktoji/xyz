'use client';
import dynamic from 'next/dynamic';

// Three.js is loaded only in the browser and only after the page renders.
const Globe = dynamic(() => import('./Globe'), { ssr: false, loading: () => null });
export default function GlobeHero() { return <Globe />; }
