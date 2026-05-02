'use client';

import { motion } from 'framer-motion';
import HorizontalScroll from './HorizontalScroll';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const projects = [
  {
    title: 'Shift Hub',
    tag: 'Community',
    description: 'A premium open-source community platform for posts, resources, and events — built like a real SaaS product.',
    stack: ['Next.js', 'Tailwind', 'GSAP', 'Framer Motion'],
  },
  {
    title: 'Pulse API',
    tag: 'Backend',
    description: 'High-performance API foundation: auth, rate-limits, audit logs, and clean controller boundaries.',
    stack: ['Node', 'Express', 'PostgreSQL', 'JWT'],
  },
  {
    title: 'Shift UI',
    tag: 'Design System',
    description: 'Reusable UI components that feel premium — glass surfaces, bold typography, and micro-interactions.',
    stack: ['Tailwind', 'Tokens', 'Motion'],
  },
  {
    title: 'Events Engine',
    tag: 'Platform',
    description: 'Event workflows: registrations, schedules, timeline views, and post-event highlights.',
    stack: ['Next.js', 'API', 'Analytics'],
  },
];

export default function Projects() {
  const reveal = useScrollAnimation('slideLeft');

  return (
    <section className='bg-black' id='projects'>
      <div className='mx-auto max-w-7xl px-6 pt-28 pb-12'>
        <motion.div
          variants={reveal.container}
          initial='hidden'
          whileInView='show'
          viewport={reveal.viewport}
          className='grid gap-6 md:grid-cols-[1.1fr,1.9fr]'
        >
          <motion.div variants={reveal.item} className='space-y-5'>
            <p className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-500'>Projects</p>
            <h2 className='text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl'>
              Horizontal scroll — driven by vertical intent.
            </h2>
          </motion.div>

          <motion.p variants={reveal.item} className='max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg'>
            A pinned horizontal showcase powered by GSAP ScrollTrigger. Scroll down, and the projects glide sideways with snap-like easing.
          </motion.p>
        </motion.div>
      </div>

      <HorizontalScroll items={projects} />
    </section>
  );
}
