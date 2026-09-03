import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Flame, Phone } from 'lucide-react';
import { specialsData } from '../../data/specials';
import { businessData } from '../../data/business';

export const SpecialsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#091C12] relative overflow-hidden border-t border-b border-emerald-950/70">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-deli-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-bold text-deli-amber-400 uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Daily &amp; Weekly Specials</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
              What&apos;s Good Today?
            </h2>
            <p className="text-base sm:text-lg text-gray-300 mt-2 max-w-xl">
              Fresh favorites, deli classics, and something new every day cooked hot to order on Sunset Ave.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/specials"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-emerald-300 font-bold text-sm border border-emerald-500/30 hover:border-emerald-400 transition-all group"
            >
              <span>View All Specials</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Horizontal Scrolling Card Container (Swipeable on Mobile) */}
        <div className="flex gap-6 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          {specialsData.map((special, index) => (
            <motion.div
              key={special.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="min-w-[300px] sm:min-w-[340px] md:min-w-[360px] max-w-[380px] shrink-0 snap-center rounded-3xl bg-[#0D2619] border border-emerald-500/30 shadow-xl shadow-black/50 overflow-hidden flex flex-col justify-between group transition-all duration-300"
            >
              {/* Card Image */}
              <div className="relative h-52 sm:h-56 overflow-hidden bg-black/40" data-cursor="view">
                <img
                  src={special.image}
                  alt={special.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />
                
                {/* Category & Badge Chips */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
                    {special.category}
                  </span>
                  {special.badge && (
                    <span className="px-2.5 py-1 rounded-full bg-deli-amber-500 text-black text-[11px] font-black uppercase tracking-wider shadow">
                      {special.badge}
                    </span>
                  )}
                </div>

                {/* Price Pill */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-emerald-950/90 backdrop-blur-md border border-emerald-400/40 text-emerald-300 font-mono font-black text-sm shadow-lg">
                  {special.price}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-deli-amber-400 font-bold uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span>{special.availableDays || "Daily Special"}</span>
                  </div>
                  <h3 className="text-xl font-display font-extrabold text-white group-hover:text-deli-amber-300 transition-colors">
                    {special.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 line-clamp-3 leading-relaxed">
                    {special.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-emerald-900/60 flex items-center justify-between gap-3">
                  <Link
                    to="/menu"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-white transition-colors group/link"
                  >
                    <span>View on Menu</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>

                  <a
                    href={`tel:${businessData.phoneRaw}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-800/60 hover:bg-emerald-700 text-white font-bold text-xs border border-emerald-500/30 transition-colors"
                  >
                    <Phone className="w-3 h-3 text-deli-amber-400" />
                    <span>Call to Order</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="mt-4 text-center sm:hidden text-xs text-gray-400">
          <span>&larr; Swipe to explore daily specials &rarr;</span>
        </div>

      </div>
    </section>
  );
};
