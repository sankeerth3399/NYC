import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Flame, Phone } from 'lucide-react';
import { specialsData } from '../../data/specials';
import { businessData } from '../../data/business';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { ImageReveal } from '../motion/ImageReveal';

export const SpecialsSection: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-[#05140C] relative overflow-hidden border-t border-b border-emerald-950/70">
      {/* Background Accent Ambient Lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] ambient-glow-emerald rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] ambient-glow-amber rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-bold text-deli-amber-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 • Daily &amp; Weekly Lineup</span>
            </div>
            <h2 className="text-section-title font-display font-black text-white tracking-tight uppercase">
              What&apos;s Good Today?
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
              Bodega classics, halal rice bowls, and fresh-cut fried chicken seasoned and cooked to order on Sunset Ave.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/specials"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 hover:text-white font-bold text-sm border border-emerald-500/40 transition-all group"
            >
              <span>View All Specials</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Featured Specials: Editorial Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialsData.slice(0, 3).map((special, index) => {
            const numStr = `0${index + 1}`;
            return (
              <motion.article
                key={special.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8 }}
                className="rounded-[2rem] bg-[#0A1F14] border border-emerald-500/25 hover:border-emerald-400/50 shadow-2xl shadow-black/80 overflow-hidden flex flex-col justify-between group transition-all duration-300 relative"
              >
                {/* Big Number Editorial Accent */}
                <div className="absolute top-4 right-6 text-emerald-500/10 group-hover:text-deli-amber-500/20 font-display font-black text-6xl select-none transition-colors pointer-events-none">
                  {numStr}
                </div>

                {/* Card Image with ImageReveal */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-black/50" data-cursor="view">
                  <ImageReveal
                    src={special.image}
                    alt={special.name}
                    containerClassName="w-full h-full"
                    imageClassName="group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Category & Badge Chips */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
                      {special.category}
                    </span>
                    {special.badge && (
                      <span className="px-3 py-1 rounded-full bg-deli-amber-500 text-black text-[11px] font-black uppercase tracking-wider shadow">
                        {special.badge}
                      </span>
                    )}
                  </div>

                  {/* Price Pill */}
                  <div className="absolute bottom-4 right-4 z-10 px-3.5 py-1.5 rounded-xl bg-emerald-950/95 backdrop-blur-md border border-emerald-400/50 text-emerald-300 font-mono font-black text-sm shadow-xl">
                    {special.price}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-deli-amber-400 font-bold uppercase tracking-wider">
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      <span>{special.availableDays || "Daily Deal"}</span>
                    </div>

                    <h3 className="text-2xl font-display font-black text-white group-hover:text-deli-amber-300 transition-colors leading-tight">
                      {special.name}
                    </h3>

                    <p className="text-xs font-bold text-emerald-400/90 uppercase tracking-wide">
                      {special.tagline}
                    </p>

                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-3">
                      {special.description}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="pt-5 border-t border-emerald-900/60 flex items-center justify-between gap-3">
                    <a
                      href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}?text=${encodeURIComponent(`Hi Meko Deli, I would like to order the special: ${special.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black font-extrabold text-xs border border-[#25D366]/40 transition-all duration-200"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5" />
                      <span>WhatsApp Order</span>
                    </a>

                    <a
                      href={`tel:${businessData.phoneRaw}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-xs border border-emerald-500/30 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-deli-amber-400" />
                      <span>Call Order</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
