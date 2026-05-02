'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight, GitPullRequest, Globe, Mail, MessageSquare } from 'lucide-react';

const footerLinks = [
  {
    title: 'Community',
    links: [
      { label: 'Forum', href: '/forum' },
      { label: 'Resources', href: '/resources' },
      { label: 'Events', href: '/events' },
    ],
  },
  {
    title: 'Build',
    links: [
      { label: 'Projects', href: '/#projects' },
      { label: 'Mission', href: '/#mission' },
      { label: 'Join', href: '/#join' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className='border-t border-white/10 bg-black'>
      <div className='mx-auto max-w-7xl px-6 py-16'>
        <div className='grid gap-12 md:grid-cols-3'>
          <div className='space-y-6'>
            <Link href='/' className='text-xl font-black tracking-[-0.06em] text-white'>
              SKILL <span className='text-white/40'>SHIFT</span>
            </Link>
            <p className='max-w-sm text-sm leading-relaxed text-gray-400'>
              An open-source tech community at JB Knowledge Park, Faridabad — focused on real-world projects and high-signal mentorship.
            </p>

            <div className='flex flex-wrap items-center gap-3'>
              <motion.a
                href='#'
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 360, damping: 26, mass: 0.55 }}
                className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-300 transition-colors hover:bg-white/10 hover:text-white'
              >
                <GitPullRequest className='h-4 w-4' />
                Open Source
                <ArrowUpRight className='h-4 w-4 text-white/40' />
              </motion.a>
              <motion.a
                href='#'
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: 'spring', stiffness: 360, damping: 26, mass: 0.55 }}
                className='inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-300 transition-colors hover:bg-white/10 hover:text-white'
              >
                <MessageSquare className='h-4 w-4' />
                Contact
                <ArrowUpRight className='h-4 w-4 text-white/40' />
              </motion.a>
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title} className='space-y-4'>
              <p className='text-xs font-semibold uppercase tracking-[0.28em] text-gray-500'>{col.title}</p>
              <div className='grid gap-3'>
                {col.links.map((l) => (
                  <Link key={l.href} href={l.href} className='text-sm text-gray-300 transition-colors hover:text-white'>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className='mt-14 flex flex-col gap-4 border-t border-white/5 pt-8 text-xs text-gray-500 md:flex-row md:items-center md:justify-between'>
          <p>© {new Date().getFullYear()} Skill Shift. All rights reserved.</p>

          <div className='flex flex-wrap items-center gap-4'>
            <a href='mailto:skillshift@example.com' className='inline-flex items-center gap-2 hover:text-gray-300'>
              <Mail className='h-4 w-4' />
              Email
            </a>
            <a href='#' className='inline-flex items-center gap-2 hover:text-gray-300'>
              <Globe className='h-4 w-4' />
              Website
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
