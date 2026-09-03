import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, ArrowRight, Flame, Phone } from 'lucide-react';
import { menuCategories, menuItems } from '../../data/menu';
import type { MenuCategory, MenuItem } from '../../types';
import { businessData } from '../../data/business';

export const MenuPreview: React.FC = () => {
  // Show key categories in preview tabs
  const previewCategories = menuCategories.filter(c => 
    ['all', 'hot-sandwiches', 'rice-specials', 'gyro', 'burgers', 'breakfast', 'fried-food', 'cold-cuts'].includes(c.id)
  );

  const [activeCategory, setActiveCategory] = useState<MenuCategory>('hot-sandwiches');

  const filteredItems = activeCategory === 'all'
    ? menuItems.slice(0, 8)
    : menuItems.filter(item => item.category === activeCategory).slice(0, 6);

  return (
    <section className="py-20 md:py-28 bg-[#07170E] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-bold text-deli-amber-400 uppercase tracking-widest">
            <Utensils className="w-3.5 h-3.5" />
            <span>Kitchen &amp; Deli Highlights</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Made Fresh. Served Fast.
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            Explore authentic New York deli subs, seasoned yellow rice platters, juicy smashed burgers, and crispy wings.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {previewCategories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-black shadow-md'
                    : 'text-gray-300 hover:text-white bg-[#0D2417] hover:bg-[#133321] border border-emerald-900/60'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="previewCategoryPill"
                    className="absolute inset-0 bg-gradient-to-r from-deli-amber-400 to-amber-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item: MenuItem) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl bg-[#0C2216] border border-emerald-500/20 hover:border-emerald-400/40 shadow-lg shadow-black/40 p-5 flex flex-col justify-between group transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-deli-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-mono font-black text-sm text-emerald-300 bg-emerald-950/90 px-2.5 py-1 rounded-lg border border-emerald-600/40 shrink-0">
                      {item.priceDisplay}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  {/* Size Tiers if present */}
                  {item.tiers && item.tiers.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-emerald-900/40">
                      {item.tiers.map((tier, idx) => (
                        <span 
                          key={idx}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-950/60 text-emerald-300 border border-emerald-800/40"
                        >
                          {tier.label}: <strong className="text-white">{tier.price}</strong>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-emerald-900/50">
                  <div className="flex items-center gap-1.5">
                    {item.popular && (
                      <span className="text-[10px] font-black uppercase tracking-wider text-deli-amber-400 bg-deli-amber-400/10 px-2 py-0.5 rounded">
                        Popular
                      </span>
                    )}
                    {item.spicy && (
                      <span className="text-[10px] font-black uppercase tracking-wider text-red-400 bg-red-400/10 px-2 py-0.5 rounded flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5" /> Spicy
                      </span>
                    )}
                  </div>

                  <a
                    href={`tel:${businessData.phoneRaw}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-gray-300 hover:text-white transition-colors"
                  >
                    <Phone className="w-3 h-3 text-deli-amber-400" />
                    <span>Order: (315) 864-3000</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Full Menu CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-deli-amber-500 to-amber-600 hover:from-deli-amber-400 hover:to-amber-500 text-black font-black text-base shadow-xl shadow-amber-950/40 hover:scale-105 active:scale-95 transition-all group"
          >
            <span>View Full Interactive Menu (30+ Items)</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
          <p className="text-xs text-gray-400 mt-2">
            Includes Breakfast, Gyros, Rice Platters, Burgers, Cold Cuts, Cheeses &amp; Sides
          </p>
        </div>

      </div>
    </section>
  );
};
