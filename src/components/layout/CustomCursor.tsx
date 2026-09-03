import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 450, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device has fine pointer (desktop) and not coarse touch
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
    setIsTouchDevice(isTouch);

    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check if hovering interactive element
      const interactiveEl = target.closest('a, button, input, select, textarea, [role="button"], .interactive-hover');
      const viewEl = target.closest('[data-cursor="view"], .cursor-view');

      if (viewEl) {
        setIsPointer(true);
        setCursorText('VIEW');
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

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

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
          width: cursorText ? 56 : isPointer ? 38 : 12,
          height: cursorText ? 56 : isPointer ? 38 : 12,
          backgroundColor: cursorText ? 'rgba(229, 152, 25, 0.95)' : isPointer ? 'rgba(34, 197, 94, 0.35)' : 'rgba(229, 152, 25, 0.9)',
          borderColor: isPointer ? '#22c55e' : '#E59819',
          borderWidth: isPointer && !cursorText ? 2 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="rounded-full flex items-center justify-center shadow-lg backdrop-blur-xs select-none"
      >
        {cursorText && (
          <span className="text-black font-extrabold text-[11px] tracking-tight">{cursorText}</span>
        )}
      </motion.div>
    </motion.div>
  );
};
