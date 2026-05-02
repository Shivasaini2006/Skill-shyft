'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Layers3, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createStackedCards } from '../../animations/gsapAnimations';
import HorizontalScroll from '../../components/HorizontalScroll';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const projects = [
  {
    title: 'Skill Shift Platform',
    tag: 'Community',
    description: 'Posts, resources, and events — built like a modern SaaS with premium UX and real workflows.',
    stack: ['Next.js', 'Tailwind', 'GSAP', 'Framer Motion'],
  },
  {
    title: 'Contributor Playbook',
    tag: 'Open Source',
    description: 'Issue templates, PR rules, and release notes — a system that makes shipping predictable.',
    stack: ['GitHub', 'Reviews', 'Docs', 'Releases'],
  },
  {
    title: 'Events Engine',
    tag: 'Platform',
    description: 'Hacknights, sprints, demo days — designed to create momentum and keep standards high.',
    stack: ['Scheduling', 'Content', 'Ops', 'Community'],
  },
  {
    title: 'Shift UI',
    tag: 'Design System',
    description: 'Reusable UI primitives that feel premium — glass surfaces, bold type, and micro-interactions.',
    stack: ['Tokens', 'Components', 'Motion', 'Accessibility'],
  },
];

const tracks = [
  {
    icon: Layers3,
    title: 'Build',
    description: 'Own a feature end-to-end: spec, UI, API, polish, and ship.',
  },
  {
    icon: Sparkles,
    title: 'Improve',
    description: 'Performance, accessibility, and design details — the craft that compounds.',
  },
  {
    icon: ArrowUpRight,
    title: 'Release',
    description: 'Write release notes, cut versions, and learn what “done” really means.',
  },
];

const pipeline = [
  {
    number: '01',
    title: 'Pick a problem worth solving',
    description:
      'Choose a mission with real users — not a demo. A small scope with a real feedback loop beats a huge idea with no runway.',
  },
  {
    number: '02',
    title: 'Design the surface',
    description:
      'Define the UX like a product team: states, edge cases, and what “done” means. Then build components that can scale.',
  },
  {
    number: '03',
    title: 'Ship through PRs',
    description:
      'Everything moves through issues → branches → PRs → reviews. You learn quality by writing code that’s easy to review.',
  },
  {
    number: '04',
    title: 'Release & iterate',
    description:
      'Write release notes, measure impact, and improve weekly. Shipping is a habit — polish is the multiplier.',
  },
];

export default function ProjectsPage() {
  const pipelineRef = useRef(null);
  const pipelineCardRefs = useRef([]);
  const reveal = useScrollAnimation('slideLeft');
  const fade = useScrollAnimation('fadeUp');

  useEffect(() => {
    return createStackedCards({
      container: pipelineRef.current,
      cards: pipelineCardRefs.current,
      topOffset: 96,
    });
  }, []);

  return (
    <main className='bg-black text-white'>
      <section className='relative overflow-hidden bg-black pt-28 pb-16'>
        <div className='pointer-events-none absolute inset-0'>
          <div className='absolute -top-28 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[150px]' />
          <div className='absolute -bottom-40 right-[-12%] h-[36rem] w-[36rem] rounded-full bg-blue-500/10 blur-[150px]' />
          <div className='absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black' />
        </div>

        <div className='relative z-10 mx-auto max-w-7xl px-6'>
          <motion.div
            variants={reveal.container}
            initial='hidden'
            whileInView='show'
            viewport={reveal.viewport}
            className='grid gap-10 md:grid-cols-[1.1fr,1.9fr] md:items-end'
          >
            <motion.div variants={reveal.item} className='space-y-6'>
              <p className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-500'>Projects</p>
              <h1 className='text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl'>
                A showcase that scrolls sideways.
              </h1>
            </motion.div>

            <motion.div variants={reveal.item} className='space-y-6'>
              <p className='max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg'>
                Scroll down to browse. Each project is a real artifact: a product surface, a system, or a workflow that
                teams can own.
              </p>
              <div className='flex flex-col gap-3 sm:flex-row sm:items-center'>
                <Link
                  href='/signup'
                  className='inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black'
                >
                  Join & contribute
                </Link>
                <Link
                  href='/forum'
                  className='inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:bg-white/10'
                >
                  See discussions <ArrowUpRight className='h-4 w-4 text-white/50' />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <HorizontalScroll items={projects} />

      <section className='bg-black py-28'>
        <div className='mx-auto max-w-7xl px-6'>
          <motion.div
            variants={reveal.container}
            initial='hidden'
            whileInView='show'
            viewport={reveal.viewport}
            className='grid gap-10 md:grid-cols-[1.1fr,1.9fr] md:items-end'
          >
            <motion.div variants={reveal.item} className='space-y-6'>
              <p className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-500'>Tracks</p>
              <h2 className='text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl'>
                Pick a lane, then ship.
              </h2>
            </motion.div>

            <motion.p variants={reveal.item} className='max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg'>
              Whether you’re building features, improving quality, or learning releases — the goal is the same: ship work
              you’re proud of.
            </motion.p>
          </motion.div>

          <motion.div
            variants={reveal.container}
            initial='hidden'
            whileInView='show'
            viewport={reveal.viewport}
            className='mt-14 grid gap-6 md:grid-cols-3'
          >
            {tracks.map((track) => (
              <motion.div
                key={track.title}
                variants={reveal.item}
                whileHover={{ y: -8, scale: 1.008 }}
                whileTap={{ scale: 0.995 }}
                transition={{ type: 'spring', stiffness: 330, damping: 26, mass: 0.6 }}
                className='glass-card group relative overflow-hidden p-9'
              >
                <div className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100'>
                  <div className='absolute -top-20 -left-20 h-56 w-56 rounded-full bg-purple-500/10 blur-[80px]' />
                  <div className='absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-blue-500/10 blur-[80px]' />
                </div>

                <div className='relative z-10 flex items-center justify-between'>
                  <span className='text-xs font-semibold uppercase tracking-[0.22em] text-white/35'>Track</span>
                  <track.icon className='h-10 w-10 text-white/70 transition duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-2deg] group-hover:text-white' />
                </div>

                <h3 className='relative z-10 mt-6 text-2xl font-bold tracking-tight text-white'>{track.title}</h3>
                <p className='relative z-10 mt-3 text-sm leading-relaxed text-gray-400'>{track.description}</p>

                <div className='relative z-10 mt-9 h-px w-full bg-white/10' />
                <p className='relative z-10 mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500'>
                  High ownership
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section ref={pipelineRef} className='relative bg-black py-28 pb-[60vh]'>
        <div className='mx-auto max-w-7xl px-6'>
          <motion.div
            variants={fade.container}
            initial='hidden'
            whileInView='show'
            viewport={fade.viewport}
            className='mb-14 flex flex-col gap-6'
          >
            <motion.p variants={fade.item} className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-500'>
              Pipeline
            </motion.p>
            <motion.h2 variants={fade.item} className='text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl'>
              A process that makes shipping inevitable.
            </motion.h2>
            <motion.p variants={fade.item} className='max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg'>
              Stacked, scroll-pinned cards — a linear story of how projects move from idea to release.
            </motion.p>
          </motion.div>

          <div className='flex flex-col gap-10'>
            {pipeline.map((step, idx) => (
              <motion.div
                key={step.number}
                ref={(el) => {
                  pipelineCardRefs.current[idx] = el;
                }}
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.6 }}
                className='group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl sm:p-12'
              >
                <div className='pointer-events-none absolute inset-0'>
                  <div className='absolute -top-24 -left-24 h-52 w-52 rounded-full bg-purple-500/10 blur-[70px] opacity-70 transition-opacity duration-700 group-hover:opacity-100' />
                  <div className='absolute -bottom-24 -right-24 h-52 w-52 rounded-full bg-blue-500/10 blur-[70px] opacity-70 transition-opacity duration-700 group-hover:opacity-100' />
                </div>

                <div className='relative z-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between'>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.22em] text-white/45'>Step {step.number}</p>
                    <h3 className='mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl'>{step.title}</h3>
                  </div>
                  <p className='max-w-xl text-base leading-relaxed text-gray-300/90 sm:text-lg'>{step.description}</p>
                </div>

                <div className='relative z-10 mt-10 h-px w-full bg-white/10' />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
