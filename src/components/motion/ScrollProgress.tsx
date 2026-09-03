import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-emerald-500 via-deli-amber-400 to-emerald-400 origin-left z-[999] pointer-events-none shadow-[0_0_10px_rgba(229,152,25,0.8)]"
      style={{ scaleX }}
    />
  );
};
