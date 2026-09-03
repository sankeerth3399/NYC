import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, ArrowRight, Flame, Phone } from 'lucide-react';
import { menuCategories, menuItems } from '../../data/menu';
import type { MenuCategory, MenuItem } from '../../types';
import { businessData } from '../../data/business';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

export const MenuPreview: React.FC = () => {
  const previewCategories = menuCategories.filter(c => 
    ['all', 'hot-sandwiches', 'rice-specials', 'gyro', 'burgers', 'breakfast', 'fried-food', 'cold-cuts'].includes(c.id)
  );

  const [activeCategory, setActiveCategory] = useState<MenuCategory>('hot-sandwiches');

  const filteredItems = activeCategory === 'all'
    ? menuItems.slice(0, 6)
    : menuItems.filter(item => item.category === activeCategory).slice(0, 6);

  return (
    <section className="py-24 md:py-36 bg-[#05140C] relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] ambient-glow-emerald rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Big Editorial Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-bold text-deli-amber-400 uppercase tracking-widest">
            <Utensils className="w-3.5 h-3.5" />
            <span>04 • The Kitchen Lineup</span>
          </div>
          <h2 className="text-section-title font-display font-black text-white tracking-tight uppercase">
            Made Fresh. Served Fast.
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            From hot heroes and loaded rice specials to breakfast bagels and sliced-to-order cold cuts.
          </p>
        </div>

        {/* Category Pill Tabs with Spring Indicator */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-14 scrollbar-none">
          {previewCategories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-black shadow-xl shadow-deli-amber-500/20'
                    : 'text-gray-300 hover:text-white bg-[#0A1F13] hover:bg-[#102C1B] border border-emerald-900/60'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="previewCategoryPill"
                    className="absolute inset-0 bg-gradient-to-r from-deli-amber-400 to-amber-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Category Grid with AnimatePresence */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item: MenuItem, idx: number) => (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="rounded-3xl bg-[#091D12] border border-emerald-500/20 hover:border-emerald-400/50 shadow-xl shadow-black/50 p-6 flex flex-col justify-between group transition-all duration-300"
                data-cursor="explore"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-display font-extrabold text-white group-hover:text-deli-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-mono font-black text-sm text-emerald-300 bg-emerald-950/90 px-3 py-1.5 rounded-xl border border-emerald-500/40 shrink-0 shadow">
                      {item.priceDisplay}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3">
                    {item.description}
                  </p>

                  {/* Size Tiers if present */}
                  {item.tiers && item.tiers.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-emerald-900/40">
                      {item.tiers.map((tier, tIdx) => (
                        <span 
                          key={tIdx}
                          className="text-[11px] px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-800/40 font-mono"
                        >
                          {tier.label}: <strong className="text-white">{tier.price}</strong>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between mt-5 pt-4 border-t border-emerald-900/50">
                  <div className="flex items-center gap-2">
                    {item.popular && (
                      <span className="text-[10px] font-black uppercase tracking-wider text-deli-amber-400 bg-deli-amber-400/10 px-2 py-0.5 rounded border border-deli-amber-400/20">
                        Popular
                      </span>
                    )}
                    {item.spicy && (
                      <span className="text-[10px] font-black uppercase tracking-wider text-red-400 bg-red-400/10 px-2 py-0.5 rounded flex items-center gap-0.5 border border-red-400/20">
                        <Flame className="w-2.5 h-2.5" /> Spicy
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <a
                      href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}?text=${encodeURIComponent(`Hi Meko Deli, I would like to order: ${item.name}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:text-[#20bd5a] transition-colors"
                      title="Order on WhatsApp"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                    </a>

                    <a
                      href={`tel:${businessData.phoneRaw}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-300 hover:text-white transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-deli-amber-400" />
                      <span>Order</span>
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Full Menu Action CTA */}
        <div className="mt-16 text-center space-y-3">
          <Link
            to="/menu"
            className="inline-flex items-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-deli-amber-500 to-amber-600 hover:from-deli-amber-400 hover:to-amber-500 text-black font-black text-base shadow-2xl shadow-amber-950/60 hover:scale-105 active:scale-95 transition-all group"
          >
            <span>Browse Full Interactive Menu (30+ Dishes)</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
          <p className="text-xs text-gray-400">
            Fresh Chicken Cuts • Gyros • Hot Subs • Burgers • Halal Rice Bowls • Cold Cuts
          </p>
        </div>

      </div>
    </section>
  );
};
