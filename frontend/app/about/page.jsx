'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, GitPullRequest, GraduationCap, Layers3, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const values = [
  {
    icon: GitPullRequest,
    title: 'Open-source first',
    description: 'Real workflows: issues, PRs, reviews, and releases — your portfolio becomes proof of work.',
  },
  {
    icon: GraduationCap,
    title: 'Student-built, industry-minded',
    description: 'Built at JB Knowledge Park (Faridabad) with a product-first mindset and serious engineering bar.',
  },
  {
    icon: Layers3,
    title: 'Production standards',
    description: 'Clean components, performance, accessibility, and docs — the difference between projects and products.',
  },
  {
    icon: Sparkles,
    title: 'Mentorship loops',
    description: 'Tight feedback cycles: weekly checkpoints, peer reviews, and mentors who help you level up fast.',
  },
];

export default function AboutPage() {
  const reveal = useScrollAnimation('fadeUp');

  return (
    <main className='bg-black text-white'>
      <section className='relative overflow-hidden bg-black pt-28 pb-24'>
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
              <p className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-500'>About</p>
              <h1 className='text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl'>
                A community built to ship.
              </h1>
            </motion.div>

            <motion.p variants={reveal.item} className='max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg'>
              Skill Shift is a builder-first community where students collaborate on real open-source work and learn modern
              product engineering by doing.
            </motion.p>
          </motion.div>

          <motion.div
            variants={reveal.container}
            initial='hidden'
            whileInView='show'
            viewport={reveal.viewport}
            className='mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4'
          >
            {values.map((value) => (
              <motion.div
                key={value.title}
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

                <value.icon className='relative z-10 h-10 w-10 text-white/75 transition duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-2deg] group-hover:text-white' />
                <h2 className='relative z-10 mt-6 text-lg font-semibold tracking-tight text-white'>{value.title}</h2>
                <p className='relative z-10 mt-3 text-sm leading-relaxed text-gray-400'>{value.description}</p>
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
              Next step
            </motion.p>
            <motion.h2 variants={reveal.item} className='mt-4 text-3xl font-bold tracking-tight text-white'>
              Join the builders.
            </motion.h2>
            <motion.p variants={reveal.item} className='mt-3 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base'>
              If you want real workflows, real feedback, and real projects — start here.
            </motion.p>

            <motion.div variants={reveal.item} className='mt-10 flex flex-col gap-3 sm:flex-row sm:items-center'>
              <Link
                href='/signup'
                className='inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black'
              >
                Join Skill Shift
              </Link>
              <Link
                href='/projects'
                className='inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:bg-white/10'
              >
                Explore projects <ArrowUpRight className='h-4 w-4 text-white/50' />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
