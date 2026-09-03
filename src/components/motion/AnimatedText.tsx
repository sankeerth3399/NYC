import React from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  delay?: number;
  stagger?: number;
  duration?: number;
  once?: boolean;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = '',
  wordClassName = '',
  as: Component = 'div',
  delay = 0,
  stagger = 0.08,
  duration = 0.85,
  once = true,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-60px' });

  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: '110%',
      opacity: 0,
      rotateZ: 2,
    },
    visible: {
      y: '0%',
      opacity: 1,
      rotateZ: 0,
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const MotionComponent = motion[Component as keyof typeof motion] as typeof motion.div;

  return (
    <MotionComponent
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, idx) => (
        <span
          key={idx}
          className="inline-block overflow-hidden mr-[0.25em] pb-[0.08em] last:mr-0"
        >
          <motion.span
            variants={wordVariants}
            className={`inline-block will-change-transform ${wordClassName}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionComponent>
  );
};
