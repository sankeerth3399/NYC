import React from 'react';
import { motion, useInView } from 'framer-motion';

interface ImageRevealProps {
  src: string;
  alt: string;
  containerClassName?: string;
  imageClassName?: string;
  cursorMode?: string;
  delay?: number;
  duration?: number;
  scaleFrom?: number;
  overlay?: boolean;
  children?: React.ReactNode;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  containerClassName = '',
  imageClassName = '',
  cursorMode = 'view',
  delay = 0.1,
  duration = 1.1,
  scaleFrom = 1.15,
  overlay = true,
  children,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${containerClassName}`}
      data-cursor={cursorMode}
    >
      {/* Motion Image with subtle zoom down on reveal */}
      <motion.img
        src={src}
        alt={alt}
        initial={{ scale: scaleFrom, opacity: 0, filter: 'blur(8px)' }}
        animate={
          isInView
            ? { scale: 1, opacity: 1, filter: 'blur(0px)' }
            : { scale: scaleFrom, opacity: 0, filter: 'blur(8px)' }
        }
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform ${imageClassName}`}
      />

      {/* Cinematic Vignette Overlay */}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
      )}

      {/* Optional Inner Child Content (e.g. badges, tags) */}
      {children}
    </div>
  );
};
