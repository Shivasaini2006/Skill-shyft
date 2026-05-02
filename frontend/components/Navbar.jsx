'use client';

import Link from 'next/link';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useMemo, useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Team', href: '/team' },
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Updates', href: '/updates' },
  { label: 'Contact', href: '/contact' },
  { label: 'Hiring', href: '/hiring' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const height = useTransform(scrollY, [0, 120], [88, 72]);
  const bgAlpha = useTransform(scrollY, [0, 120], [0, 0.62]);
  const borderAlpha = useTransform(scrollY, [0, 120], [0, 0.12]);

  const backgroundColor = useMotionTemplate`rgba(0, 0, 0, ${bgAlpha})`;
  const borderBottomColor = useMotionTemplate`rgba(255, 255, 255, ${borderAlpha})`;

  const mobilePanelVariants = useMemo(
    () => ({
      closed: { opacity: 0, y: -10, pointerEvents: 'none' },
      open: { opacity: 1, y: 0, pointerEvents: 'auto' },
    }),
    [],
  );

  return (
    <motion.nav
      style={{ height, backgroundColor, borderBottomColor }}
      className='fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl'
    >
      <div className='mx-auto flex h-full max-w-7xl items-center justify-between px-6'>
        <div className='flex items-center gap-10'>
          <Link href='/' className='text-lg font-black tracking-[-0.06em] text-white sm:text-xl'>
            SKILL <span className='text-white/40'>SHIFT</span>
          </Link>

          <div className='hidden items-center gap-7 text-sm font-semibold text-gray-400 md:flex'>
            {navLinks.map((link) => (
              <motion.div key={link.href} whileHover={{ y: -1 }} transition={{ type: 'spring', stiffness: 420, damping: 30 }}>
                <Link href={link.href} className='transition-colors hover:text-white'>
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <div className='hidden items-center gap-4 md:flex'>
          <div className='flex items-center gap-3'>
            <Link
              href='/login'
              className='rounded-full border border-white/15 bg-transparent px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/90 transition-colors hover:bg-white/5'
            >
              Login
            </Link>
            <motion.div whileHover={{ y: -1, scale: 1.02 }} whileTap={{ scale: 0.99 }} transition={{ type: 'spring', stiffness: 420, damping: 28 }}>
              <Link
                href='/signup'
                className='rounded-full bg-white px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-black'
              >
                Join
              </Link>
            </motion.div>
          </div>
        </div>

        <button
          type='button'
          className='md:hidden rounded-full border border-white/10 bg-white/5 p-2 text-white'
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setIsMobileOpen((prev) => !prev)}
        >
          {isMobileOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
        </button>
      </div>

      <motion.div
        variants={mobilePanelVariants}
        initial='closed'
        animate={isMobileOpen ? 'open' : 'closed'}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className='md:hidden'
      >
        <div className='mx-auto max-w-7xl px-6 pb-6'>
          <div className='mt-4 grid gap-3 rounded-3xl border border-white/10 bg-black/40 p-4 backdrop-blur-2xl'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className='rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-semibold text-gray-200 transition-colors hover:bg-white/10'
                onClick={() => setIsMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <div className='mt-2 grid grid-cols-2 gap-3'>
              <Link
                href='/login'
                className='rounded-2xl border border-white/10 bg-transparent px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white/90'
                onClick={() => setIsMobileOpen(false)}
              >
                Login
              </Link>
              <Link
                href='/signup'
                className='rounded-2xl bg-white px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-black'
                onClick={() => setIsMobileOpen(false)}
              >
                Join
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}
