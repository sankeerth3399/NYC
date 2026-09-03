import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Phone, ArrowRight, Flame, Layers } from 'lucide-react';
import { businessData } from '../../data/business';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { MagneticButton } from '../motion/MagneticButton';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '20%']);
  const foodY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '-12%']);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-6 pb-20 md:py-24 bg-[#070707]"
    >
      {/* Background Lighting & Tech HUD Scanlines (Reference Video Frame 00:00) */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <div className="absolute inset-0 bg-deli-grid opacity-20" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[600px] bg-red-600/15 rounded-full blur-[180px]" />
        <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#070707] to-transparent" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Aggressive Editorial Typography (Frame 00:00) */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Top HUD Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] border border-red-500/40 text-xs font-hud text-red-400 uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>SMASHED TO ORDER // No. 01</span>
            </motion.div>

            {/* Giant Editorial Headline: "MEKO DELI // DOUBLE SMASH" */}
            <div className="space-y-1 select-none">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-hero-giant font-display font-black text-white tracking-tight uppercase leading-[0.90]"
              >
                MEKO DELI
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-hero-giant font-display font-black text-red-500 tracking-tight uppercase leading-[0.90]"
              >
                // DOUBLE SMASH
              </motion.h2>
            </div>

            {/* Sub-label HUD Strip */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-xs sm:text-sm font-hud font-bold text-gray-300 uppercase tracking-[0.25em]"
            >
              SMASHED • STACKED • BOXED
            </motion.p>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans"
            >
              Fresh 100% beef smashed on a 260°C screaming flat-top, sharp melted American cheese, caramelized onions, and house secret sauce on bakery rolls. Utica, NY.
            </motion.p>

            {/* Flat-top Specs Mini Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-[11px] font-hud text-gray-400"
            >
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                FLAT-TOP: <strong className="text-red-400">260°C</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                BEEF: <strong className="text-emerald-400">100% FRESH</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                LOCATION: <strong className="text-amber-400">1510 SUNSET AVE</strong>
              </span>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3"
            >
              <MagneticButton>
                <a
                  href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}?text=Hi%20Meko%20Deli,%20I%20want%20to%20order%20the%20Double%20Smash%20Hero!`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-red-600 hover:bg-red-500 text-white font-black text-sm sm:text-base font-hud shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <WhatsAppIcon className="w-5 h-5 text-white" />
                  <span>ORDER ON WHATSAPP</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </MagneticButton>

              <MagneticButton>
                <a
                  href="#build"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-hud text-xs sm:text-sm font-bold border border-white/20 transition-all hover:scale-105 active:scale-95"
                >
                  <Layers className="w-4 h-4 text-red-400" />
                  <span>EXPLODE LAYERS</span>
                </a>
              </MagneticButton>

              <a
                href={`tel:${businessData.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-transparent hover:bg-white/5 text-gray-300 hover:text-white font-hud text-xs font-bold border border-white/10 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>(315) 864-3000</span>
              </a>
            </motion.div>

          </div>

          {/* Right Column: Hero Food Item on Red/White Checkered Liner (Frame 00:00) */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            
            <motion.div
              style={{ y: foodY }}
              className="relative w-full max-w-lg group will-change-transform"
            >
              {/* Checkered Deli Liner Paper Tray (Exact match from reference video!) */}
              <div className="absolute -bottom-6 inset-x-4 sm:inset-x-8 h-40 bg-deli-checker rounded-3xl shadow-2xl shadow-black transform rotate-1 border-2 border-black/60 pointer-events-none" />

              {/* Main Food Canvas */}
              <motion.div
                initial={{ scale: 1.12, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[2.5rem] overflow-hidden border-2 border-red-500/40 shadow-2xl shadow-black bg-[#0A0A0A]"
                data-cursor="view"
              >
                <img
                  src="/images/hero-sandwich.jpg"
                  alt="Meko Deli Smashed Chopped Cheese Hero"
                  className="w-full h-[400px] sm:h-[480px] object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Dark Luxury Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />

                {/* Top Left HUD Label (Matching Frame 00:00) */}
                <div className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-hud font-bold text-white flex items-center gap-2">
                  <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                  <span>SMASHED FLAT-TOP HERO</span>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
                  <div className="flex justify-between items-end font-hud">
                    <div>
                      <span className="text-xs text-red-500 font-bold uppercase tracking-wider block">
                        Utica Specialty
                      </span>
                      <h3 className="text-2xl font-display font-black text-white">
                        THE DOUBLE SMASH
                      </h3>
                      <p className="text-xs text-gray-400">Includes crispy seasoned fries</p>
                    </div>
                    <span className="text-lg font-mono font-black text-white bg-red-600/90 px-3.5 py-1.5 rounded-xl border border-red-400/50 shadow-lg">
                      $7.49+
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Floating Mini HUD Card */}
              <div className="absolute -top-4 -right-2 sm:-right-4 px-4 py-2 rounded-2xl bg-black/90 border border-red-500/40 shadow-2xl backdrop-blur-xl font-hud text-xs flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-white font-bold">260°C SEAR</span>
              </div>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
