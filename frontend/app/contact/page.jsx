'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, Globe, Mail, MessageSquare } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const contactCards = [
  {
    icon: Mail,
    title: 'Email',
    description: 'For partnerships, mentors, and general questions.',
    cta: 'skillshift@example.com',
    href: 'mailto:skillshift@example.com',
  },
  {
    icon: MessageSquare,
    title: 'Forum',
    description: 'Start a discussion, share resources, or ask for feedback.',
    cta: 'Visit forum',
    href: '/forum',
    internal: true,
  },
  {
    icon: Globe,
    title: 'Campus',
    description: 'JB Knowledge Park, Faridabad — builder-first, open-source energy.',
    cta: 'Learn more',
    href: '/about',
    internal: true,
  },
];

export default function ContactPage() {
  const reveal = useScrollAnimation('scaleIn');

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
              <p className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-500'>Contact</p>
              <h1 className='text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl'>
                Let’s build something real.
              </h1>
            </motion.div>

            <motion.p variants={reveal.item} className='max-w-2xl text-base leading-relaxed text-gray-400 sm:text-lg'>
              Reach out for mentorship, collaborations, or community questions. If it’s high-signal, we’re in.
            </motion.p>
          </motion.div>

          <motion.div
            variants={reveal.container}
            initial='hidden'
            whileInView='show'
            viewport={reveal.viewport}
            className='mt-14 grid gap-6 md:grid-cols-3'
          >
            {contactCards.map((card) => (
              <motion.div
                key={card.title}
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

                <card.icon className='relative z-10 h-10 w-10 text-white/75 transition duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-2deg] group-hover:text-white' />
                <h2 className='relative z-10 mt-6 text-xl font-semibold tracking-tight text-white'>{card.title}</h2>
                <p className='relative z-10 mt-3 text-sm leading-relaxed text-gray-400'>{card.description}</p>

                <div className='relative z-10 mt-8 h-px w-full bg-white/10' />

                <div className='relative z-10 mt-4'>
                  {card.internal ? (
                    <Link
                      href={card.href}
                      className='inline-flex items-center gap-2 text-sm font-semibold text-gray-200 transition-colors hover:text-white'
                    >
                      {card.cta}
                      <ArrowUpRight className='h-4 w-4 text-white/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
                    </Link>
                  ) : (
                    <a
                      href={card.href}
                      className='inline-flex items-center gap-2 text-sm font-semibold text-gray-200 transition-colors hover:text-white'
                    >
                      {card.cta}
                      <ArrowUpRight className='h-4 w-4 text-white/40 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
                    </a>
                  )}
                </div>
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
              Quick start
            </motion.p>
            <motion.h2 variants={reveal.item} className='mt-4 text-3xl font-bold tracking-tight text-white'>
              Want to join?
            </motion.h2>
            <motion.p variants={reveal.item} className='mt-3 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base'>
              Create an account, introduce yourself, and pick a project track. You’ll learn fastest by shipping.
            </motion.p>

            <motion.div variants={reveal.item} className='mt-10 flex flex-col gap-3 sm:flex-row sm:items-center'>
              <Link
                href='/signup'
                className='inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm font-semibold text-black'
              >
                Join Skill Shift
              </Link>
              <Link
                href='/forum'
                className='inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm font-semibold text-white backdrop-blur-xl transition-colors hover:bg-white/10'
              >
                Visit forum
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
