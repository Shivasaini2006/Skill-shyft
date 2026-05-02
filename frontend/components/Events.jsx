'use client';

import { motion } from 'framer-motion';
import { CalendarDays, ChevronRight, Sparkles } from 'lucide-react';

const events = [
  {
    title: 'Skill Shift Kickoff',
    date: 'May 2026',
    status: 'Upcoming',
    description: 'Orientation, project tracks, contributor onboarding, and team formation.',
  },
  {
    title: 'Open Source Sprint',
    date: 'June 2026',
    status: 'Upcoming',
    description: 'A focused sprint for shipping PRs, improving docs, and publishing releases.',
  },
  {
    title: 'Hacknight: Ship in 6 Hours',
    date: 'July 2026',
    status: 'Upcoming',
    description: 'Build fast prototypes with real constraints — demo, review, iterate.',
  },
  {
    title: 'Community Demo Day',
    date: 'August 2026',
    status: 'Planned',
    description: 'Showcase the best projects. Design polish, performance, and real UX wins.',
  },
];

export default function Events() {
  return (
    <section className='relative bg-black py-28' id='events'>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='grid gap-8 md:grid-cols-[1.1fr,1.9fr] md:items-end'>
          <div className='space-y-6'>
            <p className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-500'>Events</p>
            <h2 className='text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl'>
              A timeline designed for momentum.
            </h2>
          </div>
          <p className='max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg'>
            Scroll-revealed milestones with alternating motion — each entry lands with a different direction and energy.
          </p>
        </div>

        <div className='relative mt-16'>
          <div className='absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2' />

          <div className='space-y-10'>
            {events.map((evt, index) => {
              const fromX = index % 2 === 0 ? -26 : 26;

              return (
                <motion.div
                  key={evt.title}
                  initial={{ opacity: 0, y: 18, x: fromX }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className='relative grid gap-6 md:grid-cols-2'
                >
                  <div
                    className={
                      index % 2 === 0
                        ? 'md:col-start-1 md:justify-self-end md:pr-10'
                        : 'md:col-start-2 md:pl-10'
                    }
                  >
                    <motion.div
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
                          <CalendarDays className='h-4 w-4 text-white/40' />
                          <span>{evt.date}</span>
                        </div>
                        <span className='rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-gray-300'>
                          {evt.status}
                        </span>
                      </div>

                      <h3 className='relative z-10 mt-5 text-2xl font-bold tracking-tight text-white'>{evt.title}</h3>
                      <p className='relative z-10 mt-3 text-sm leading-relaxed text-gray-400'>{evt.description}</p>

                      <div className='relative z-10 mt-8 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.22em] text-gray-500'>
                        <span className='inline-flex items-center gap-2'>
                          <Sparkles className='h-4 w-4 text-white/40' />
                          Milestone
                        </span>
                        <span className='inline-flex items-center gap-1 text-gray-400 transition group-hover:text-gray-200'>
                          View <ChevronRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5' />
                        </span>
                      </div>
                    </motion.div>
                  </div>

                  <div className='hidden md:block' />

                  <div className='absolute left-4 top-10 h-3 w-3 -translate-x-1/2 rounded-full bg-white/70 ring-4 ring-white/10 md:left-1/2' />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
