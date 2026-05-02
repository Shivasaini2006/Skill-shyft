'use client';

import { motion } from 'framer-motion';
import { GitPullRequest, GraduationCap, Layers3, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const cards = [
  {
    icon: GitPullRequest,
    title: 'Open Source Collaboration',
    description: 'Work in public, ship in teams, and learn real-world workflows: issues, PRs, reviews, and releases.',
  },
  {
    icon: GraduationCap,
    title: 'College-Based, Industry-Minded',
    description: 'Built at JB Knowledge Park (Faridabad) with a product-first mindset and a serious engineering bar.',
  },
  {
    icon: Layers3,
    title: 'Real Projects, Real Users',
    description: 'We build tools that solve problems — not just demos. Your portfolio becomes proof of work.',
  },
  {
    icon: Sparkles,
    title: 'Mentorship & Feedback Loops',
    description: 'Tight feedback cycles: weekly checkpoints, peer reviews, and mentorship that compounds.',
  },
];

export default function About() {
  const reveal = useScrollAnimation('tilt');

  return (
    <section className='relative bg-black py-28' id='about'>
      <div className='mx-auto max-w-7xl px-6'>
        <motion.div
          variants={reveal.container}
          initial='hidden'
          whileInView='show'
          viewport={reveal.viewport}
          className='grid gap-10 md:grid-cols-[1.1fr,1.9fr] md:gap-12'
        >
          <div className='space-y-6'>
            <motion.p variants={reveal.item} className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-500'>
              About
            </motion.p>
            <motion.h2 variants={reveal.item} className='text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl'>
              A community built to ship.
            </motion.h2>
            <motion.p variants={reveal.item} className='max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg'>
              Skill Shift is a developer-first community where students collaborate on open-source work, learn modern product engineering, and build systems that scale.
            </motion.p>
          </div>

          <motion.div variants={reveal.container} className='grid gap-6 sm:grid-cols-2'>
            {cards.map((card) => (
              <motion.div
                key={card.title}
                variants={reveal.item}
                whileHover={{ y: -6, scale: 1.012 }}
                whileTap={{ scale: 0.995 }}
                transition={{ type: 'spring', stiffness: 320, damping: 24, mass: 0.6 }}
                className='glass-card group relative overflow-hidden p-7'
              >
                <div className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100'>
                  <div className='absolute -top-16 -left-16 h-44 w-44 rounded-full bg-purple-500/10 blur-[60px]' />
                  <div className='absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-blue-500/10 blur-[60px]' />
                </div>

                <card.icon className='h-10 w-10 text-white/70 transition duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-2deg] group-hover:text-white' />
                <h3 className='mt-5 text-lg font-semibold tracking-tight text-white'>{card.title}</h3>
                <p className='mt-2 text-sm leading-relaxed text-gray-400'>{card.description}</p>

                <div className='mt-6 h-px w-full bg-white/10' />
                <p className='mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500'>Learn • Build • Share</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
