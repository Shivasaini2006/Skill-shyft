'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { createStackedCards } from '../animations/gsapAnimations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const stacked = [
  {
    number: '01',
    title: 'Find a mission',
    description:
      'Pick a problem worth solving — a tool that improves student workflows, a community platform, or an open-source library.',
  },
  {
    number: '02',
    title: 'Ship with standards',
    description:
      'Write production code: clean commits, code review, CI, and documentation. You learn by building like a real team.',
  },
  {
    number: '03',
    title: 'Collaborate in public',
    description:
      'Issues, PRs, discussions, release notes — we build in the open so your work becomes your portfolio.',
  },
  {
    number: '04',
    title: 'Iterate fast',
    description:
      'Tight feedback loops with peers and mentors. Improve the product weekly and track real impact.',
  },
  {
    number: '05',
    title: 'Own your craft',
    description:
      'Develop taste: performance, accessibility, and design detail — the difference between a project and a product.',
  },
];

export default function StackedCards() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const reveal = useScrollAnimation('fadeUp');

  useEffect(() => {
    return createStackedCards({
      container: sectionRef.current,
      cards: cardRefs.current,
      topOffset: 96,
    });
  }, []);

  return (
    <section ref={sectionRef} className='relative bg-black py-28 pb-[60vh]' id='mission'>
      <div className='mx-auto max-w-7xl px-6'>
        <motion.div
          variants={reveal.container}
          initial='hidden'
          whileInView='show'
          viewport={reveal.viewport}
          className='mb-14 flex flex-col gap-6'
        >
          <motion.p variants={reveal.item} className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-500'>
            Story
          </motion.p>
          <motion.h2 variants={reveal.item} className='text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl'>
            Modern storytelling, engineered.
          </motion.h2>
          <motion.p variants={reveal.item} className='max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg'>
            Scroll-driven stacked cards with pin + scrub. Each step overlaps the previous — smooth, intentional, and premium.
          </motion.p>
        </motion.div>

        <div className='flex flex-col gap-10'>
          {stacked.map((card, idx) => (
            <motion.div
              key={card.number}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24, mass: 0.6 }}
              className='group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl sm:p-12'
            >
              <div className='pointer-events-none absolute inset-0'>
                <div className='absolute -top-24 -left-24 h-52 w-52 rounded-full bg-purple-500/10 blur-[70px] transition-opacity duration-700 group-hover:opacity-100 opacity-70' />
                <div className='absolute -bottom-24 -right-24 h-52 w-52 rounded-full bg-blue-500/10 blur-[70px] transition-opacity duration-700 group-hover:opacity-100 opacity-70' />
              </div>

              <div className='relative z-10 flex flex-col gap-6 md:flex-row md:items-start md:justify-between'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-[0.22em] text-white/45'>Step {card.number}</p>
                  <h3 className='mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl'>{card.title}</h3>
                </div>
                <p className='max-w-xl text-base leading-relaxed text-gray-300/90 sm:text-lg'>{card.description}</p>
              </div>

              <div className='relative z-10 mt-10 h-px w-full bg-white/10' />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
