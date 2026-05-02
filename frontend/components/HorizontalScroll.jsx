'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { createHorizontalScroll } from '../animations/gsapAnimations';

export default function HorizontalScroll({ items }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    return createHorizontalScroll({
      section: sectionRef.current,
      track: trackRef.current,
      snapPoints: items?.length ?? 0,
    });
  }, [items?.length]);

  return (
    <section ref={sectionRef} className='relative h-[100svh] overflow-hidden bg-black'>
      <div className='absolute inset-0 flex items-center'>
        <div ref={trackRef} className='flex gap-6 px-6 will-change-transform'>
          {(items ?? []).map((project) => (
            <motion.article
              key={project.title}
              whileHover={{ y: -10, scale: 1.008 }}
              whileTap={{ scale: 0.995 }}
              transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.6 }}
              className='group relative w-[86vw] flex-shrink-0 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent p-10 backdrop-blur-2xl sm:w-[72vw] sm:p-12 lg:w-[58vw]'
            >
              <div className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100'>
                <div className='absolute -top-24 -left-24 h-64 w-64 rounded-full bg-purple-500/10 blur-[90px]' />
                <div className='absolute -bottom-28 -right-28 h-64 w-64 rounded-full bg-blue-500/10 blur-[90px]' />
              </div>

              <div className='relative z-10 flex h-full flex-col justify-between gap-10'>
                <div>
                  <div className='flex items-center justify-between'>
                    <span className='rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gray-300'>
                      {project.tag}
                    </span>
                    <ArrowUpRight className='h-5 w-5 text-white/40 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white' />
                  </div>

                  <h3 className='mt-8 text-4xl font-black tracking-[-0.05em] text-white sm:text-5xl'>
                    {project.title}
                  </h3>
                  <p className='mt-4 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg'>
                    {project.description}
                  </p>
                </div>

                <div className='flex flex-wrap gap-2'>
                  {(project.stack ?? []).map((tech) => (
                    <span
                      key={tech}
                      className='rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-semibold text-gray-300 backdrop-blur'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
