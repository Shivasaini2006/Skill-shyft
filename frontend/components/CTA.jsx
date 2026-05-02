'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className='relative overflow-hidden bg-black py-32' id='join'>
      <div className='pointer-events-none absolute inset-0'>
        <div className='absolute left-1/2 top-[-18rem] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[150px] animate-blob' />
        <div className='absolute bottom-[-18rem] right-[-10rem] h-[36rem] w-[36rem] rounded-full bg-blue-500/10 blur-[150px] animate-blob [animation-delay:2.2s]' />
        <div className='absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black' />
      </div>

      <div className='relative z-10 mx-auto max-w-5xl px-6 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className='rounded-[2rem] border border-white/10 bg-white/5 p-10 backdrop-blur-2xl sm:p-14'
        >
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-400'>Join Skill Shift</p>
          <h2 className='mt-6 text-5xl font-black tracking-[-0.06em] text-white sm:text-6xl'>
            Build. Contribute. Level up.
          </h2>
          <p className='mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg'>
            A community that feels like a product org — with real shipping standards and mentorship. If you want to build in public, you belong here.
          </p>

          <div className='mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4'>
            <motion.a
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 320, damping: 22, mass: 0.55 }}
              href='/signup'
              className='group inline-flex items-center justify-center gap-2 rounded-full bg-white px-9 py-4 text-sm font-semibold tracking-wide text-black'
            >
              Join Now <ArrowUpRight className='h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
            </motion.a>
            <motion.a
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24, mass: 0.55 }}
              href='/forum'
              className='inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-9 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-xl transition-colors hover:bg-white/10'
            >
              Visit Forum
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
