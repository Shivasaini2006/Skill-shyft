'use client';

import { useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

const easeOutQuint = [0.16, 1, 0.3, 1];

export function useScrollAnimation(preset = 'fadeUp') {
  const prefersReducedMotion = useReducedMotion();

  return useMemo(() => {
    const viewport = { once: true, amount: 0.15 };

    const container = {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          when: 'beforeChildren',
          staggerChildren: 0.1,
          delayChildren: 0.06,
        },
      },
    };

    const reduce = (value) => (prefersReducedMotion ? undefined : value);

    if (preset === 'fadeUp') {
      return {
        viewport,
        container,
        item: {
          hidden: {
            opacity: 0,
            y: reduce(22) ?? 0,
            scale: reduce(0.985) ?? 1,
            filter: reduce('blur(10px)') ?? 'blur(0px)',
          },
          show: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: { duration: prefersReducedMotion ? 0.25 : 0.9, ease: easeOutQuint },
          },
        },
      };
    }

    if (preset === 'slideLeft') {
      return {
        viewport,
        container,
        item: {
          hidden: {
            opacity: 0,
            x: reduce(22) ?? 0,
            y: reduce(8) ?? 0,
            scale: reduce(0.99) ?? 1,
            filter: reduce('blur(10px)') ?? 'blur(0px)',
          },
          show: {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: { duration: prefersReducedMotion ? 0.25 : 0.9, ease: easeOutQuint },
          },
        },
      };
    }

    if (preset === 'scaleIn') {
      return {
        viewport,
        container,
        item: {
          hidden: {
            opacity: 0,
            y: reduce(14) ?? 0,
            scale: reduce(0.96) ?? 1,
            filter: reduce('blur(12px)') ?? 'blur(0px)',
          },
          show: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: { duration: prefersReducedMotion ? 0.25 : 0.85, ease: easeOutQuint },
          },
        },
      };
    }

    if (preset === 'tilt') {
      return {
        viewport,
        container,
        item: {
          hidden: {
            opacity: 0,
            y: reduce(16) ?? 0,
            rotateX: reduce(10) ?? 0,
            rotateY: reduce(-10) ?? 0,
            scale: reduce(0.99) ?? 1,
            filter: reduce('blur(10px)') ?? 'blur(0px)',
          },
          show: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: { duration: prefersReducedMotion ? 0.25 : 0.95, ease: easeOutQuint },
          },
        },
      };
    }

    if (preset === 'timeline') {
      return {
        viewport,
        container,
        item: {
          hidden: {
            opacity: 0,
            y: reduce(14) ?? 0,
            scale: reduce(0.992) ?? 1,
            filter: reduce('blur(10px)') ?? 'blur(0px)',
          },
          show: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: 'blur(0px)',
            transition: { duration: prefersReducedMotion ? 0.25 : 0.8, ease: easeOutQuint },
          },
        },
      };
    }

    return {
      viewport,
      container,
      item: {
        hidden: {
          opacity: 0,
          y: reduce(18) ?? 0,
          scale: reduce(0.99) ?? 1,
          filter: reduce('blur(10px)') ?? 'blur(0px)',
        },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: { duration: prefersReducedMotion ? 0.25 : 0.85, ease: easeOutQuint },
        },
      },
    };
  }, [prefersReducedMotion, preset]);
}
