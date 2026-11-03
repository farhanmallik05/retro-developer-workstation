import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins safely in browser runtime
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Checks if user prefers reduced motion for accessibility compliance
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Initializes a phosphor word-by-word scroll scrubbing effect.
 * Each word transitions from dim phosphor (opacity: 0.25) to vibrant glowing emerald.
 */
export const initWordScrubbing = (
  container: HTMLElement,
  words: HTMLElement[]
): (() => void) => {
  if (prefersReducedMotion() || !words.length) {
    // If reduced motion is requested, render fully visible immediately
    words.forEach((w) => {
      w.style.opacity = '1';
      w.style.color = '#34d399';
    });
    return () => {};
  }

  const ctx = gsap.context(() => {
    gsap.fromTo(
      words,
      {
        opacity: 0.2,
        color: '#475569',
        filter: 'blur(0.5px)',
      },
      {
        opacity: 1,
        color: '#34d399',
        filter: 'blur(0px)',
        stagger: 0.04,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 45%',
          scrub: 0.8,
        },
      }
    );
  }, container);

  return () => ctx.revert();
};

/**
 * Staggers cards with retro CRT phosphor pop-in
 */
export const initStaggerEntrance = (
  container: HTMLElement,
  targets: string | HTMLElement[]
): (() => void) => {
  if (prefersReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    gsap.from(targets, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.12,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: container,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    });
  }, container);

  return () => ctx.revert();
};
