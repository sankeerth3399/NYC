import { gsap, ScrollTrigger, isReducedMotion } from './gsapInit';

export interface ParallaxLayer {
  target: Element | string;
  speed: number; // e.g. -50 to 50
}

export const createParallaxLayers = (
  trigger: Element | string,
  layers: ParallaxLayer[]
): ScrollTrigger | null => {
  if (isReducedMotion()) return null;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
    },
  });

  layers.forEach(({ target, speed }) => {
    tl.to(target, { y: speed, ease: 'none' }, 0);
  });

  return tl.scrollTrigger || null;
};
