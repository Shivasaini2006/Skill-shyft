'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GitPullRequest, Layers3, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const pillars = [
  {
    icon: Layers3,
    title: 'Core builders',
    description: 'Own product direction, engineering standards, and a weekly shipping cadence.',
    meta: 'Product • Engineering • Ops',
  },
  {
    icon: Sparkles,
    title: 'Mentors',
    description: 'High-signal feedback: reviews, architecture guidance, and craft refinement.',
    meta: 'Reviews • Taste • Growth',
  },
  {
    icon: GitPullRequest,
    title: 'Contributors',
    description: 'Collaborate in public through issues, PRs, discussions, and releases.',
    meta: 'Issues • PRs • Releases',
  },
];

const principles = ['Ship weekly', 'Write it down', 'Review everything', 'Build in public'];

export default function TeamPage() {
  const reveal = useScrollAnimation('tilt');

  return (
    <main className='bg-black text-white'>
      <section className='relative overflow-hidden bg-black pt-28 pb-24'>
        <div className='pointer-events-none absolute inset-0'>
          <div className='absolute -top-28 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[150px]' />
          <div className='absolute -bottom-40 right-[-12%] h-[34rem] w-[34rem] rounded-full bg-blue-500/10 blur-[150px]' />
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
              <p className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-500'>Team</p>
              <h1 className='text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl'>
                People who ship — together.
              </h1>
            </motion.div>

            <motion.p variants={reveal.item} className='max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg'>
              Skill Shift runs like a modern product org. Clear ownership, fast feedback loops, and open-source workflows
              that keep quality high.
            </motion.p>
          </motion.div>

          <motion.div
            variants={reveal.container}
            initial='hidden'
            whileInView='show'
            viewport={reveal.viewport}
            className='mt-14 grid gap-6 md:grid-cols-3'
          >
            {pillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                variants={reveal.item}
                whileHover={{ y: -8, scale: 1.008 }}
                whileTap={{ scale: 0.995 }}
                transition={{ type: 'spring', stiffness: 330, damping: 26, mass: 0.6 }}
                className='glass-card group relative overflow-hidden p-8'
              >
                <div className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100'>
                  <div className='absolute -top-20 -left-20 h-56 w-56 rounded-full bg-purple-500/10 blur-[80px]' />
                  <div className='absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-blue-500/10 blur-[80px]' />
                </div>

                <pillar.icon className='relative z-10 h-10 w-10 text-white/75 transition duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-2deg] group-hover:text-white' />
                <h2 className='relative z-10 mt-6 text-xl font-semibold tracking-tight text-white'>{pillar.title}</h2>
                <p className='relative z-10 mt-3 text-sm leading-relaxed text-gray-400'>{pillar.description}</p>

                <div className='relative z-10 mt-8 h-px w-full bg-white/10' />
                <p className='relative z-10 mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500'>
                  {pillar.meta}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={reveal.container}
            initial='hidden'
            whileInView='show'
            viewport={reveal.viewport}
            className='mt-14 rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl md:p-10'
          >
            <motion.p variants={reveal.item} className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-500'>
              How we work
            </motion.p>
            <motion.h3 variants={reveal.item} className='mt-4 text-3xl font-bold tracking-tight text-white'>
              High-signal standards, friendly energy.
            </motion.h3>

            <motion.div variants={reveal.item} className='mt-8 flex flex-wrap gap-2'>
              {principles.map((p) => (
                <span
                  key={p}
                  className='rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold text-gray-300 backdrop-blur'
                >
                  {p}
                </span>
              ))}
            </motion.div>

            <motion.div variants={reveal.item} className='mt-10 flex flex-col gap-3 sm:flex-row sm:items-center'>
              <Link
                href='/hiring'
                className='inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black'
              >
                View openings
              </Link>
              <Link
                href='/contact'
                className='inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:bg-white/10'
              >
                Contact
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
