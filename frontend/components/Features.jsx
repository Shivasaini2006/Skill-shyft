'use client';

import { motion } from 'framer-motion';
import {
  Activity,
  BookOpen,
  CalendarDays,
  Code2,
  MessagesSquare,
  ShieldCheck,
} from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const features = [
  {
    icon: Code2,
    title: 'Open Source Contributions',
    description: 'Structured issues, clean PRs, reviews, release notes — the real workflow.',
  },
  {
    icon: MessagesSquare,
    title: 'Developer Community',
    description: 'A high-signal builder network: accountability, feedback, and collaboration.',
  },
  {
    icon: CalendarDays,
    title: 'Hackathons & Events',
    description: 'Build fast, demo sharp, ship harder. Events designed to create momentum.',
  },
  {
    icon: BookOpen,
    title: 'Learning Resources',
    description: 'Curated tracks: systems, frontend, backend, DevOps — updated continuously.',
  },
  {
    icon: ShieldCheck,
    title: 'Mentorship',
    description: 'Guidance, code review, and career growth from experienced peers.',
  },
  {
    icon: Activity,
    title: 'Real Projects',
    description: 'Build projects with real users and measurable impact — not just tutorials.',
  },
];

export default function Features() {
  const reveal = useScrollAnimation('scaleIn');

  return (
    <section className='relative bg-black py-28' id='features'>
      <div className='mx-auto max-w-7xl px-6'>
        <motion.div
          variants={reveal.container}
          initial='hidden'
          whileInView='show'
          viewport={reveal.viewport}
          className='flex flex-col items-start gap-6'
        >
          <motion.p variants={reveal.item} className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-500'>
            Features
          </motion.p>
          <motion.h2 variants={reveal.item} className='text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl'>
            Premium infrastructure for builders.
          </motion.h2>
          <motion.p variants={reveal.item} className='max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg'>
            Everything is designed to feel like a modern product org: clean design, serious engineering, and a community that executes.
          </motion.p>
        </motion.div>

        <motion.div
          variants={reveal.container}
          initial='hidden'
          whileInView='show'
          viewport={reveal.viewport}
          className='mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3'
        >
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              variants={reveal.item}
              whileHover={{ y: -8, scale: 1.008 }}
              whileTap={{ scale: 0.995 }}
              transition={{ type: 'spring', stiffness: 330, damping: 26, mass: 0.6 }}
              className='group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl'
            >
              <div className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
                <div className='absolute -top-24 -left-20 h-56 w-56 rounded-full bg-purple-500/10 blur-[70px]' />
                <div className='absolute -bottom-24 -right-20 h-56 w-56 rounded-full bg-blue-500/10 blur-[70px]' />
              </div>

              <div className='flex items-center justify-between'>
                <feature.icon className='h-10 w-10 text-white/75 transition duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-2deg] group-hover:text-white' />
                <span className='text-xs font-semibold uppercase tracking-[0.22em] text-white/30'>0{idx + 1}</span>
              </div>

              <h3 className='mt-6 text-xl font-semibold tracking-tight text-white'>{feature.title}</h3>
              <p className='mt-3 text-sm leading-relaxed text-gray-400'>{feature.description}</p>

              <div className='mt-8 h-px w-full bg-white/10' />
              <p className='mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500'>Designed to scale</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
