import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Clock, Store, HeartHandshake } from 'lucide-react';
import { businessData } from '../../data/business';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-6 h-6 text-deli-amber-400" />,
  Flame: <Flame className="w-6 h-6 text-orange-400" />,
  Clock: <Clock className="w-6 h-6 text-emerald-400" />,
  Store: <Store className="w-6 h-6 text-emerald-300" />,
};

export const WhyMeko: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-[#040e08] relative overflow-hidden border-t border-emerald-950/80">
      {/* Glow */}
      <div className="absolute top-1/2 right-0 w-[550px] h-[550px] ambient-glow-emerald rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-bold text-emerald-300 uppercase tracking-widest">
            <HeartHandshake className="w-3.5 h-3.5 text-deli-amber-400" />
            <span>07 • The Meko Standard</span>
          </div>
          <h2 className="text-section-title font-display font-black text-white tracking-tight uppercase">
            Good Food. Local Flavor. No Fuss.
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            Why neighbors on Sunset Ave and across Utica choose Meko Deli &amp; Grocery every day.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessData.features.map((feature, index) => {
            const numStr = `0${index + 1}`;
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-7 rounded-[2rem] bg-[#0A1E13] border border-emerald-500/25 hover:border-emerald-400/50 shadow-2xl shadow-black/60 space-y-4 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-4 right-5 font-mono font-bold text-emerald-500/20 group-hover:text-deli-amber-400/30 text-sm transition-colors">
                  {numStr}
                </div>

                <div className="w-13 h-13 rounded-2xl bg-emerald-950/90 border border-emerald-500/30 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {iconMap[feature.icon] || <Sparkles className="w-6 h-6 text-deli-amber-400" />}
                </div>

                <h3 className="text-xl font-display font-black text-white group-hover:text-deli-amber-300 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
