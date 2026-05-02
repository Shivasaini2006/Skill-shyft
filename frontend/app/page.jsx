'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import { ScrollTrigger, registerGsapPlugins } from '../animations/gsapAnimations';

import About from '../components/About';
import CTA from '../components/CTA';
import Events from '../components/Events';
import Features from '../components/Features';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import StackedCards from '../components/StackedCards';
import Stats from '../components/Stats';

export default function HomePage() {
  useEffect(() => {
    registerGsapPlugins();

    const lenis = new Lenis({
      duration: 1.15,
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Keep triggers correct after hydration / section effects.
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className='relative overflow-x-clip bg-black text-white'>
      <Hero />
      <About />
      <Features />
      <StackedCards />
      <Projects />
      <Stats />
      <Events />
      <CTA />
    </main>
  );
}
