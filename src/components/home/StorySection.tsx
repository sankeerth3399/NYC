import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowRight, MapPin, Store } from 'lucide-react';
import { aboutStory } from '../../data/business';

export const StorySection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['-8%', '8%']
  );

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-36 bg-[#040e08] relative overflow-hidden border-t border-emerald-950/80"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] ambient-glow-emerald rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Parallax Image Showcase with Film Vignette */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-[2.2rem] overflow-hidden border-2 border-emerald-500/30 shadow-2xl shadow-black bg-[#0A1D12]">
              <motion.div
                style={{ y: imageY }}
                className="relative h-[420px] sm:h-[500px] lg:h-[560px] w-full will-change-transform"
                data-cursor="view"
              >
                <img
                  src="/images/deli-sub.jpg"
                  alt="Meko Deli freshly prepared submarine cold cuts and sandwiches in Utica, NY"
                  className="w-full h-full object-cover object-center scale-105 hover:scale-110 transition-transform duration-1000 ease-out"
                />
              </motion.div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#040e08] via-transparent to-black/20 pointer-events-none" />

              {/* Floating Address / Heritage Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#07190F]/95 backdrop-blur-xl border border-emerald-400/30 flex items-center justify-between shadow-2xl">
                <div>
                  <p className="text-[11px] font-bold text-deli-amber-400 uppercase tracking-widest">
                    Utica Local Cornerstone
                  </p>
                  <p className="text-base font-bold text-white">
                    1510 Sunset Ave, Utica, NY
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-emerald-900/80 flex items-center justify-center border border-emerald-500/40 text-emerald-300">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Typography & Brand Story */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-bold text-deli-amber-400 uppercase tracking-widest">
                <Store className="w-3.5 h-3.5" />
                <span>05 • Heritage &amp; Craft</span>
              </div>

              {/* Oversized Brand Typography: "MORE THAN A DELI." */}
              <div className="overflow-hidden">
                <motion.h2
                  initial={{ y: '100%', opacity: 0 }}
                  whileInView={{ y: '0%', opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-section-title font-display font-black text-white tracking-tight uppercase leading-[0.95]"
                >
                  MORE THAN<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-deli-amber-400 to-amber-500">
                    A DELI.
                  </span>
                </motion.h2>
              </div>

              <p className="text-lg sm:text-xl text-emerald-300/90 font-medium leading-relaxed">
                {aboutStory.lead}
              </p>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
                {aboutStory.bodyParagraphs[0]}
              </p>
            </div>

            {/* 3 Story Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {aboutStory.pillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.12 }}
                  className="p-5 rounded-2xl bg-[#091D12] border border-emerald-500/20 hover:border-emerald-400/40 space-y-2 transition-all duration-300 group"
                >
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded bg-emerald-950 text-deli-amber-400 border border-emerald-800/40">
                    {pillar.badge}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-deli-amber-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center gap-5">
              <Link
                to="/about"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-950 hover:scale-105 active:scale-95 transition-all group"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300 hover:text-white transition-colors"
              >
                <span>Visit 1510 Sunset Ave &rarr;</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
