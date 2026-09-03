import { gsap, isReducedMotion } from './gsapInit';

export interface TextRevealOptions {
  trigger?: Element | string;
  start?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  yOffset?: number;
}

export const animateTextReveal = (
  targets: Element | Element[] | string,
  options: TextRevealOptions = {}
): gsap.core.Tween | gsap.core.Timeline | null => {
  if (isReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0 });
    return null;
  }

  const {
    trigger = targets,
    start = 'top 85%',
    delay = 0,
    duration = 0.85,
    stagger = 0.12,
    yOffset = 60,
  } = options;

  gsap.set(targets, { opacity: 0, y: yOffset });

  return gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    stagger,
    ease: 'power3.out',
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none none',
      once: true,
    },
  });
};
