'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { createCountUpTimeline } from '../animations/gsapAnimations';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const stats = [
  { key: 'members', label: 'Members', value: 320, suffix: '+' },
  { key: 'projects', label: 'Projects', value: 24, suffix: '+' },
  { key: 'contrib', label: 'Contributions', value: 1800, suffix: '+' },
];

export default function Stats() {
  const sectionRef = useRef(null);
  const valueRefs = useRef({});
  const reveal = useScrollAnimation('timeline');

  useEffect(() => {
    const items = stats
      .map((stat) => ({
        el: valueRefs.current[stat.key],
        to: stat.value,
        suffix: stat.suffix,
      }))
      .filter((item) => item.el);

    return createCountUpTimeline({
      trigger: sectionRef.current,
      items,
      duration: 1.45,
    });
  }, []);

  return (
    <section ref={sectionRef} className='relative bg-black py-28' id='stats'>
      <div className='mx-auto max-w-7xl px-6'>
        <motion.div
          variants={reveal.container}
          initial='hidden'
          whileInView='show'
          viewport={reveal.viewport}
          className='grid gap-10 md:grid-cols-[1.1fr,1.9fr] md:items-end'
        >
          <motion.div variants={reveal.item} className='space-y-6'>
            <p className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-500'>Stats</p>
            <h2 className='text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl'>
              Momentum you can measure.
            </h2>
          </motion.div>

          <motion.p variants={reveal.item} className='max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg'>
            Animated counters powered by GSAP. Numbers scale smoothly with scroll-triggered precision and zero jank.
          </motion.p>
        </motion.div>

        <motion.div
          variants={reveal.container}
          initial='hidden'
          whileInView='show'
          viewport={reveal.viewport}
          className='mt-16 grid gap-6 md:grid-cols-3'
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.key}
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

              <p className='relative z-10 text-sm font-medium text-gray-400'>{stat.label}</p>
              <p className='relative z-10 mt-3 text-5xl font-black tracking-[-0.04em] text-white'>
                <span
                  ref={(el) => {
                    valueRefs.current[stat.key] = el;
                  }}
                >
                  0
                </span>
              </p>
              <div className='relative z-10 mt-8 h-px w-full bg-white/10' />
              <p className='relative z-10 mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500'>
                Growing weekly
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
