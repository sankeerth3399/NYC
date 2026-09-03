import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Flame, Sparkles, Eye } from 'lucide-react';
import type { MenuItem } from '../../types';
import { businessData } from '../../data/business';

interface MenuCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onSelect }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -6 }}
      onClick={() => onSelect(item)}
      className="rounded-3xl bg-[#0D2619] border border-emerald-500/25 hover:border-emerald-400/50 shadow-xl shadow-black/40 p-6 flex flex-col justify-between group cursor-pointer transition-all duration-300"
    >
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-deli-amber-400 bg-deli-amber-400/10 px-2 py-0.5 rounded border border-deli-amber-400/20">
                {item.category.replace('-', ' ')}
              </span>
              {item.popular && (
                <span className="text-[10px] font-black uppercase text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-600/40 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-deli-amber-400" /> Popular
                </span>
              )}
              {item.spicy && (
                <span className="text-[10px] font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded flex items-center gap-0.5">
                  <Flame className="w-2.5 h-2.5" /> Spicy
                </span>
              )}
            </div>

            <h3 className="text-xl font-display font-bold text-white group-hover:text-deli-amber-300 transition-colors pt-1">
              {item.name}
            </h3>
          </div>

          <span className="font-mono font-black text-sm sm:text-base text-emerald-300 bg-emerald-950/90 px-3 py-1.5 rounded-xl border border-emerald-500/40 shrink-0 shadow-sm">
            {item.priceDisplay}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mt-2 line-clamp-3">
          {item.description}
        </p>

        {/* Size Tiers Breakdown */}
        {item.tiers && item.tiers.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 mt-4 pt-3 border-t border-emerald-900/60">
            {item.tiers.map((tier, idx) => (
              <div 
                key={idx} 
                className="px-2 py-1 rounded-lg bg-emerald-950/70 border border-emerald-700/30 text-center"
              >
                <span className="text-[10px] text-gray-300 block">{tier.label}</span>
                <span className="text-xs font-bold text-deli-amber-400 font-mono">{tier.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-emerald-900/60">
        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-300 group-hover:text-white transition-colors">
          <Eye className="w-3.5 h-3.5" />
          <span>View Details</span>
        </span>

        <a
          href={`tel:${businessData.phoneRaw}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
        >
          <Phone className="w-3 h-3 text-deli-amber-300" />
          <span>Call: (315) 864-3000</span>
        </a>
      </div>
    </motion.div>
  );
};
