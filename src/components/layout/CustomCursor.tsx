import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === 'undefined') return false;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 1024;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return isFinePointer && !isReduced;
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (!enabled) return;

    const handleResize = () => {
      const isFinePointer = window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 1024;
      const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setEnabled(isFinePointer && !isReduced);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewEl = target.closest('[data-cursor="view"], .cursor-view');
      const exploreEl = target.closest('[data-cursor="explore"], .cursor-explore');
      const interactiveEl = target.closest('a, button, input, select, textarea, [role="button"], .interactive-hover');

      if (viewEl) {
        setIsPointer(true);
        setCursorText('VIEW');
      } else if (exploreEl) {
        setIsPointer(true);
        setCursorText('EXPLORE');
      } else if (interactiveEl) {
        setIsPointer(true);
        setCursorText('');
      } else {
        setIsPointer(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [enabled, mouseX, mouseY]);

  if (!enabled || !isVisible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center font-bold tracking-wider text-[10px] text-white"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      <motion.div
        animate={{
          width: cursorText ? 64 : isPointer ? 40 : 12,
          height: cursorText ? 64 : isPointer ? 40 : 12,
          backgroundColor: cursorText
            ? 'rgba(229, 152, 25, 0.95)'
            : isPointer
            ? 'rgba(34, 197, 94, 0.25)'
            : 'rgba(229, 152, 25, 0.9)',
          borderColor: cursorText ? '#E59819' : isPointer ? '#4ade80' : '#E59819',
          borderWidth: isPointer && !cursorText ? 2 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="rounded-full flex items-center justify-center shadow-2xl backdrop-blur-xs select-none"
      >
        {cursorText && (
          <motion.span
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-black font-black text-[10px] tracking-widest uppercase text-center"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};
