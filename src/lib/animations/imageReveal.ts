import { gsap, isReducedMotion } from './gsapInit';

export interface ImageRevealOptions {
  trigger?: Element | string;
  start?: string;
  duration?: number;
  scaleStart?: number;
}

export const animateImageReveal = (
  imageTarget: Element | string,
  options: ImageRevealOptions = {}
): gsap.core.Timeline | null => {
  if (isReducedMotion()) {
    gsap.set(imageTarget, { opacity: 1, scale: 1 });
    return null;
  }

  const {
    trigger = imageTarget,
    start = 'top 85%',
    duration = 1.1,
    scaleStart = 1.15,
  } = options;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none none',
      once: true,
    },
  });

  tl.fromTo(
    imageTarget,
    { opacity: 0, scale: scaleStart },
    {
      opacity: 1,
      scale: 1,
      duration,
      ease: 'power2.out',
    }
  );

  return tl;
};
