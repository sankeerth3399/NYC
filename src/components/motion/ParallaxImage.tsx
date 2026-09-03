import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

interface ParallaxImageProps {
  src: string;
  alt: string;
  containerClassName?: string;
  imageClassName?: string;
  offset?: number;
  cursorMode?: string;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  containerClassName = '',
  imageClassName = '',
  offset = 40,
  cursorMode = 'view',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? [0, 0] : [-offset, offset]
  );

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${containerClassName}`}
      data-cursor={cursorMode}
    >
      <motion.div
        style={{ y }}
        className="w-full h-[120%] -top-[10%] relative will-change-transform"
      >
        <img
          src={src}
          alt={alt}
          className={`w-full h-full object-cover ${imageClassName}`}
        />
      </motion.div>
    </div>
  );
};
