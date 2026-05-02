'use client';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

let isRegistered = false;
let refreshRaf = 0;

export function registerGsapPlugins() {
  if (isRegistered) return;
  gsap.registerPlugin(ScrollTrigger);
  isRegistered = true;
}

export { gsap, ScrollTrigger };

export function scheduleScrollTriggerRefresh() {
  if (refreshRaf) return;
  refreshRaf = requestAnimationFrame(() => {
    refreshRaf = 0;
    ScrollTrigger.refresh();
  });
}

export function createHeroParallax({
  section,
  bg,
  grid,
  heading,
  subheading,
  ctas,
  stack,
  orbs = [],
}) {
  registerGsapPlugins();

  if (!section) return () => {};

  const ctx = gsap.context(() => {
    const trigger = {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.8,
      invalidateOnRefresh: true,
    };

    if (bg) {
      gsap.to(bg, {
        yPercent: 16,
        ease: 'none',
        scrollTrigger: trigger,
      });
    }

    if (grid) {
      gsap.to(grid, {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: trigger,
      });
    }

    if (heading) {
      gsap.to(heading, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: trigger,
      });
    }

    if (subheading) {
      gsap.to(subheading, {
        yPercent: -18,
        ease: 'none',
        scrollTrigger: trigger,
      });
    }

    if (ctas) {
      gsap.to(ctas, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: trigger,
      });
    }

    if (stack) {
      gsap.to(stack, {
        yPercent: -6,
        ease: 'none',
        scrollTrigger: trigger,
      });
    }

    orbs.filter(Boolean).forEach((orb, idx) => {
      gsap.to(orb, {
        yPercent: 22 + idx * 8,
        ease: 'none',
        scrollTrigger: trigger,
      });
    });

    scheduleScrollTriggerRefresh();
  }, section);

  return () => ctx.revert();
}

export function createStackedCards({ container, cards, topOffset = 96 }) {
  registerGsapPlugins();

  if (!container || !cards?.length) return () => {};

  const ctx = gsap.context(() => {
    const start = () => `top top+=${topOffset}`;

    gsap.set(cards, {
      transformOrigin: 'center top',
      willChange: 'transform',
    });

    cards.forEach((card, index) => {
      if (!card) return;

      const isLast = index === cards.length - 1;
      const nextCard = cards[index + 1];

      ScrollTrigger.create({
        trigger: card,
        start,
        endTrigger: isLast ? container : nextCard,
        end: isLast ? 'bottom bottom' : start,
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      if (!isLast) {
        gsap.to(card, {
          scale: 0.965 - index * 0.012,
          y: -14 - index * 5,
          opacity: 0.72,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start,
            endTrigger: nextCard,
            end: start,
            scrub: 0.75,
            invalidateOnRefresh: true,
          },
        });
      }

      gsap.fromTo(
        card,
        { y: 40, opacity: 0.85 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: start,
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    scheduleScrollTriggerRefresh();
  }, container);

  return () => ctx.revert();
}

export function createHorizontalScroll({ section, track, snapPoints = 0 }) {
  registerGsapPlugins();

  if (!section || !track) return () => {};

  const ctx = gsap.context(() => {
    const getDistance = () => Math.max(0, track.scrollWidth - section.clientWidth);

    gsap.to(track, {
      x: () => -getDistance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        pin: true,
        scrub: 0.85,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        ...(snapPoints > 1
          ? {
              snap: {
                snapTo: 1 / (snapPoints - 1),
                duration: { min: 0.1, max: 0.25 },
                ease: 'power2.out',
              },
            }
          : {}),
      },
    });

    scheduleScrollTriggerRefresh();
  }, section);

  return () => ctx.revert();
}

export function createCountUpTimeline({ trigger, items, duration = 1.3 }) {
  registerGsapPlugins();

  if (!trigger || !items?.length) return () => {};

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: 'top 75%',
        once: true,
      },
    });

    items.forEach((item) => {
      if (!item?.el) return;

      const state = { value: item.from ?? 0 };
      const suffix = item.suffix ?? '';

      tl.to(
        state,
        {
          value: item.to,
          duration,
          ease: 'power2.out',
          onUpdate: () => {
            item.el.textContent = `${Math.round(state.value)}${suffix}`;
          },
        },
        0,
      );
    });
  }, trigger);

  return () => ctx.revert();
}
