'use client';

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowUpRight, GitPullRequest, Layers3, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { createHeroParallax } from '../animations/gsapAnimations';

export default function Hero() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);
  const gridRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const ctasRef = useRef(null);
  const stackRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  const prefersReducedMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const pointerXPx = useMotionValue(0);
  const pointerYPx = useMotionValue(0);

  const smoothX = useSpring(pointerX, { stiffness: 260, damping: 34, mass: 0.25 });
  const smoothY = useSpring(pointerY, { stiffness: 260, damping: 34, mass: 0.25 });

  const tiltX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const tiltY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);

  const driftX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const driftY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  const sceneTransform = useMotionTemplate`perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
  const subtleDrift = useMotionTemplate`translate3d(${driftX}px, ${driftY}px, 0px)`;
  const glare = useMotionTemplate`radial-gradient(520px circle at ${pointerXPx}px ${pointerYPx}px, rgba(255,255,255,0.10), transparent 55%)`;

  const resetPointer = useCallback(() => {
    pointerX.set(0);
    pointerY.set(0);
  }, [pointerX, pointerY]);

  const onPointerMove = useCallback(
    (event) => {
      if (prefersReducedMotion) return;

      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      pointerX.set(Math.max(-0.5, Math.min(0.5, x)));
      pointerY.set(Math.max(-0.5, Math.min(0.5, y)));

      pointerXPx.set(event.clientX - rect.left);
      pointerYPx.set(event.clientY - rect.top);
    },
    [pointerX, pointerXPx, pointerY, pointerYPx, prefersReducedMotion],
  );

  const floatingCards = useMemo(
    () => [
      {
        icon: GitPullRequest,
        label: 'PR Workflow',
        value: 'Ship like a team',
        depth: 46,
        accent: 'text-white',
      },
      {
        icon: Layers3,
        label: 'Project Tracks',
        value: 'Build in public',
        depth: 74,
        accent: 'text-white',
      },
      {
        icon: Sparkles,
        label: 'Mentorship',
        value: 'Taste + feedback',
        depth: 104,
        accent: 'text-white',
      },
    ],
    [],
  );

  useEffect(() => {
    return createHeroParallax({
      section: sectionRef.current,
      bg: bgRef.current,
      grid: gridRef.current,
      heading: headingRef.current,
      subheading: subheadingRef.current,
      ctas: ctasRef.current,
      stack: stackRef.current,
      orbs: [orb1Ref.current, orb2Ref.current],
    });
  }, []);

  return (
    <section ref={sectionRef} className='relative min-h-[100svh] overflow-hidden bg-black pt-28'>
      <div ref={bgRef} className='absolute inset-0'>
        <div
          ref={orb1Ref}
          className='absolute -top-24 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-purple-500/10 blur-[140px]'
        />
        <div
          ref={orb2Ref}
          className='absolute -bottom-40 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-blue-500/10 blur-[140px]'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-white/[0.06] via-transparent to-black' />
      </div>

      <div ref={gridRef} className='absolute inset-0 opacity-[0.18]'>
        <div className='absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:44px_44px]' />
        <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_64%)]' />
      </div>

      <div className='relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 text-left lg:grid-cols-[minmax(0,1fr),minmax(0,460px)] lg:gap-8'>
        <div className='flex flex-col items-start'>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className='mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-gray-400'
        >
          OPEN-SOURCE • BUILDER-FIRST • HIGH-SIGNAL
        </motion.p>

        <motion.h1
          ref={headingRef}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className='text-balance text-6xl font-black tracking-[-0.07em] text-white sm:text-7xl md:text-8xl lg:text-9xl'
        >
          SKILL <span className='text-gradient'>SHIFT</span>
        </motion.h1>

        <motion.p
          ref={subheadingRef}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className='mt-7 max-w-2xl text-pretty text-base leading-relaxed text-gray-400 sm:text-lg'
        >
          A community at JB Knowledge Park (Faridabad) for builders who want real standards: issues → PRs → releases. Learn by shipping, not by watching.
        </motion.p>

        <motion.div
          ref={ctasRef}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className='mt-10 flex w-full flex-col items-stretch justify-start gap-3 sm:flex-row sm:items-center sm:gap-4'
        >
          <motion.a
            whileHover={{ y: -2, scale: 1.03 }}
            whileTap={{ scale: 0.99 }}
            href='/signup'
            transition={{ type: 'spring', stiffness: 320, damping: 22, mass: 0.5 }}
            className='inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold tracking-wide text-black shadow-2xl'
          >
            Join Community <ArrowUpRight className='h-4 w-4' />
          </motion.a>

          <motion.a
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            href='/projects'
            transition={{ type: 'spring', stiffness: 320, damping: 24, mass: 0.5 }}
            className='inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold tracking-wide text-white backdrop-blur-xl transition-colors hover:bg-white/10'
          >
            Explore Projects
          </motion.a>
        </motion.div>

        <div className='pointer-events-none mt-14 flex items-center gap-3 text-xs font-medium text-gray-500'>
          <span className='h-px w-10 bg-white/10' />
          <span>SCROLL</span>
          <span className='h-px w-10 bg-white/10' />
        </div>

        </div>

        <div className='relative hidden overflow-hidden lg:block'>
          <motion.div
            ref={stackRef}
            onPointerMove={onPointerMove}
            onPointerLeave={resetPointer}
            style={prefersReducedMotion ? undefined : { transform: sceneTransform }}
            className='group relative mx-auto h-[380px] w-[380px] max-w-full [perspective:1200px] [transform-style:preserve-3d] xl:h-[420px] xl:w-[420px]'
          >
            <motion.div
              aria-hidden
              style={prefersReducedMotion ? undefined : { background: glare, transform: subtleDrift }}
              className='pointer-events-none absolute inset-0 rounded-[3rem] opacity-0 transition-opacity duration-500 group-hover:opacity-70'
            />

            <div className='absolute inset-0 rounded-[3rem] border border-white/10 bg-white/5 backdrop-blur-2xl' />

            <div className='absolute inset-0 [transform-style:preserve-3d]'>
              {floatingCards.map((card, idx) => {
                const layer = floatingCards.length - 1 - idx;
                const isFront = layer === 0;

                const x = -layer * 26;
                const y = layer * 30;
                const rotate = -layer * 6;
                const scale = 1 - layer * 0.05;
                const opacity = 1 - layer * 0.12;

                return (
                  <div
                    key={card.label}
                    style={{
                      transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${card.depth}px) rotateZ(${rotate}deg) scale(${scale})`,
                      opacity,
                      zIndex: 20 + idx,
                    }}
                    className='absolute left-1/2 top-1/2 w-[300px]'
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 12, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.9, delay: 0.18 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      className={
                        `relative overflow-hidden rounded-[2rem] border border-white/10 p-7 backdrop-blur-2xl ` +
                        (isFront ? 'bg-black/75' : 'bg-black/45')
                      }
                    >
                      <div className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100'>
                        <div className='absolute -top-16 -left-16 h-44 w-44 rounded-full bg-purple-500/10 blur-[70px]' />
                        <div className='absolute -bottom-20 -right-20 h-44 w-44 rounded-full bg-blue-500/10 blur-[70px]' />
                      </div>

                      <motion.div
                        animate={prefersReducedMotion ? undefined : { y: [0, -6, 0] }}
                        transition={
                          prefersReducedMotion
                            ? undefined
                            : {
                                duration: 6.2 + idx * 0.7,
                                repeat: Infinity,
                                ease: 'easeInOut',
                                delay: 0.2 + idx * 0.2,
                              }
                        }
                        className='relative z-10 flex items-start justify-between gap-6'
                      >
                        <div className='min-w-0'>
                          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-gray-400'>
                            {card.label}
                          </p>

                          {isFront ? (
                            <>
                              <p className='mt-3 text-2xl font-bold tracking-tight text-white'>{card.value}</p>
                              <div className='mt-5 h-px w-full bg-white/10' />
                              <p className='mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500'>
                                Skill Shift System
                              </p>
                            </>
                          ) : (
                            <>
                              <div className='mt-5 space-y-2'>
                                <div className='h-3 w-5/6 rounded-full bg-white/10' />
                                <div className='h-3 w-3/5 rounded-full bg-white/10' />
                              </div>
                              <div className='mt-6 h-px w-full bg-white/10' />
                              <p className='mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-gray-500'>
                                In progress
                              </p>
                            </>
                          )}
                        </div>

                        <card.icon className={`h-10 w-10 ${card.accent} opacity-80`} />
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}

              <div style={{ transform: 'translateZ(24px)' }} className='absolute inset-0'>
                <div className='pointer-events-none absolute inset-10 rounded-[2.5rem] border border-white/5 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px] opacity-70' />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
