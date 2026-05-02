'use client';

import { motion } from 'framer-motion';
import { GitPullRequest, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const updates = [
  {
    icon: Sparkles,
    date: 'May 2026',
    status: 'Shipped',
    title: 'Skill Shift v1',
    description: 'Premium marketing + community routes, motion system, and production-ready UI foundations.',
  },
  {
    icon: GitPullRequest,
    date: 'June 2026',
    status: 'In progress',
    title: 'Contributor onboarding',
    description: 'Issue templates, PR conventions, and a clean workflow so new builders can ship fast.',
  },
  {
    icon: Sparkles,
    date: 'July 2026',
    status: 'Planned',
    title: 'Mentor office hours',
    description: 'Weekly review sessions focused on craft: performance, architecture, and UX polish.',
  },
  {
    icon: GitPullRequest,
    date: 'August 2026',
    status: 'Planned',
    title: 'Demo Day',
    description: 'Showcase projects, share learnings, and publish release notes — like a real product org.',
  },
];

const statusMeta = [
  {
    key: 'Shipped',
    label: 'Shipped',
    blurb: 'Live now — polished and ready for builders.',
  },
  {
    key: 'In progress',
    label: 'In progress',
    blurb: 'Currently building — reviews and iteration ongoing.',
  },
  {
    key: 'Planned',
    label: 'Planned',
    blurb: 'On deck — queued for upcoming weeks.',
  },
];

export default function UpdatesPage() {
  const reveal = useScrollAnimation('fadeUp');

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
              <p className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-500'>Updates</p>
              <h1 className='text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl'>
                Shipping, week by week.
              </h1>
            </motion.div>

            <motion.p variants={reveal.item} className='max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg'>
              A lightweight changelog for the community. Each update is designed to build momentum — not noise.
            </motion.p>
          </motion.div>

          <motion.div
            variants={reveal.container}
            initial='hidden'
            whileInView='show'
            viewport={reveal.viewport}
            className='mt-14 grid gap-6 md:grid-cols-3'
          >
            {statusMeta.map((meta) => {
              const count = updates.filter((u) => u.status === meta.key).length;

              return (
                <motion.div
                  key={meta.key}
                  variants={reveal.item}
                  whileHover={{ y: -6, scale: 1.008 }}
                  whileTap={{ scale: 0.995 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.6 }}
                  className='glass-card group relative overflow-hidden p-9'
                >
                  <div className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100'>
                    <div className='absolute -top-20 -left-20 h-56 w-56 rounded-full bg-purple-500/10 blur-[80px]' />
                    <div className='absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-blue-500/10 blur-[80px]' />
                  </div>

                  <p className='relative z-10 text-xs font-semibold uppercase tracking-[0.22em] text-gray-400'>
                    {meta.label}
                  </p>
                  <p className='relative z-10 mt-4 text-5xl font-black tracking-[-0.04em] text-white'>{count}</p>
                  <p className='relative z-10 mt-4 text-sm leading-relaxed text-gray-400'>{meta.blurb}</p>

                  <div className='relative z-10 mt-8 h-px w-full bg-white/10' />
                  <p className='relative z-10 mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500'>
                    Momentum
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <div className='mt-16 grid gap-14'>
            {statusMeta.map((meta) => {
              const items = updates.filter((u) => u.status === meta.key);
              if (!items.length) return null;

              return (
                <motion.section
                  key={meta.key}
                  variants={reveal.container}
                  initial='hidden'
                  whileInView='show'
                  viewport={reveal.viewport}
                  className='rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl md:p-10'
                >
                  <motion.div variants={reveal.item} className='grid gap-6 md:grid-cols-[1.1fr,1.9fr] md:items-end'>
                    <div className='space-y-3'>
                      <p className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-500'>Status</p>
                      <h2 className='text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl'>{meta.label}</h2>
                    </div>
                    <p className='max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base'>{meta.blurb}</p>
                  </motion.div>

                  <div className='mt-10 grid gap-6 md:grid-cols-2'>
                    {items.map((update) => (
                      <motion.div
                        key={update.title}
                        variants={reveal.item}
                        whileHover={{ y: -4, scale: 1.006 }}
                        whileTap={{ scale: 0.995 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.6 }}
                        className='glass-card group relative overflow-hidden p-8'
                      >
                        <div className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100'>
                          <div className='absolute -top-20 -left-20 h-56 w-56 rounded-full bg-purple-500/10 blur-[80px]' />
                          <div className='absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-blue-500/10 blur-[80px]' />
                        </div>

                        <div className='relative z-10 flex items-center justify-between gap-4'>
                          <div className='flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-400'>
                            <update.icon className='h-4 w-4 text-white/40' />
                            <span>{update.date}</span>
                          </div>
                          <span className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300'>
                            {update.status}
                          </span>
                        </div>

                        <h3 className='relative z-10 mt-5 text-2xl font-bold tracking-tight text-white'>{update.title}</h3>
                        <p className='relative z-10 mt-3 text-sm leading-relaxed text-gray-400'>{update.description}</p>

                        <div className='relative z-10 mt-8 h-px w-full bg-white/10' />
                        <p className='relative z-10 mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500'>
                          High signal
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
