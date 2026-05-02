'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code2, GitPullRequest, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const roles = [
  {
    icon: Code2,
    title: 'Frontend builder',
    tag: 'Engineering',
    description: 'Ship premium UI with real performance: Next.js, Tailwind, motion, and clean component boundaries.',
    stack: ['Next.js', 'Tailwind', 'Motion', 'DX'],
  },
  {
    icon: GitPullRequest,
    title: 'Backend builder',
    tag: 'Engineering',
    description: 'Design reliable APIs, auth, and data models. Write code that’s easy to review, test, and deploy.',
    stack: ['Node', 'Express', 'Postgres', 'JWT'],
  },
  {
    icon: Sparkles,
    title: 'Mentor',
    tag: 'Community',
    description: 'Guide builders through reviews and architecture decisions. Help teams raise the quality bar.',
    stack: ['Reviews', 'Architecture', 'Taste', 'Growth'],
  },
  {
    icon: Sparkles,
    title: 'Community ops',
    tag: 'Community',
    description: 'Own onboarding, events, and systems that keep the community high-signal and consistent.',
    stack: ['Onboarding', 'Events', 'Ops', 'Docs'],
  },
];

export default function HiringPage() {
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
              <p className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-500'>Hiring</p>
              <h1 className='text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl'>
                Open roles for builders.
              </h1>
            </motion.div>

            <motion.p variants={reveal.item} className='max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg'>
              Not corporate hiring — community roles. If you want responsibility, real workflow, and high standards, you’ll fit.
            </motion.p>
          </motion.div>

          <motion.div
            variants={reveal.container}
            initial='hidden'
            whileInView='show'
            viewport={reveal.viewport}
            className='mt-14 grid gap-6 md:grid-cols-2'
          >
            {roles.map((role) => (
              <motion.div
                key={role.title}
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

                <div className='relative z-10 flex items-start justify-between gap-6'>
                  <div>
                    <p className='text-xs font-semibold uppercase tracking-[0.22em] text-white/35'>{role.tag}</p>
                    <h2 className='mt-3 text-2xl font-bold tracking-tight text-white'>{role.title}</h2>
                  </div>
                  <role.icon className='h-10 w-10 text-white/70 transition duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-2deg] group-hover:text-white' />
                </div>

                <p className='relative z-10 mt-4 text-sm leading-relaxed text-gray-400'>{role.description}</p>

                <div className='relative z-10 mt-8 flex flex-wrap gap-2'>
                  {role.stack.map((t) => (
                    <span
                      key={t}
                      className='rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold text-gray-300 backdrop-blur'
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className='relative z-10 mt-9 h-px w-full bg-white/10' />
                <p className='relative z-10 mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500'>
                  High ownership
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
              Apply
            </motion.p>
            <motion.h2 variants={reveal.item} className='mt-4 text-3xl font-bold tracking-tight text-white'>
              Start with a conversation.
            </motion.h2>
            <motion.p variants={reveal.item} className='mt-3 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base'>
              Tell us what you want to build, what you’ve shipped, and what role you want to own.
            </motion.p>

            <motion.div variants={reveal.item} className='mt-10 flex flex-col gap-3 sm:flex-row sm:items-center'>
              <a
                href='mailto:skillshift@example.com'
                className='inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black'
              >
                Email us
              </a>
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
