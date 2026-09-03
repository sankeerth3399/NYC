import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Flame, Sparkles, Eye } from 'lucide-react';
import type { MenuItem } from '../../types';
import { businessData } from '../../data/business';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

interface MenuCardProps {
  item: MenuItem;
  onSelect: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onSelect }) => {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.01 }}
      onClick={() => onSelect(item)}
      className="rounded-[2rem] bg-[#0A1F13] border border-emerald-500/25 hover:border-emerald-400/55 shadow-xl shadow-black/60 p-6 sm:p-7 flex flex-col justify-between group cursor-pointer transition-all duration-300 relative"
      data-cursor="explore"
    >
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-deli-amber-400 bg-deli-amber-400/10 px-2.5 py-0.5 rounded-full border border-deli-amber-400/20">
                {item.category.replace('-', ' ')}
              </span>
              {item.popular && (
                <span className="text-[10px] font-black uppercase text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-600/40 flex items-center gap-0.5">
                  <Sparkles className="w-2.5 h-2.5 text-deli-amber-400" /> Popular
                </span>
              )}
              {item.spicy && (
                <span className="text-[10px] font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full flex items-center gap-0.5 border border-red-400/20">
                  <Flame className="w-2.5 h-2.5" /> Spicy
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-black text-white group-hover:text-deli-amber-300 transition-colors pt-1 leading-tight">
              {item.name}
            </h3>
          </div>

          <span className="font-mono font-black text-sm sm:text-base text-emerald-300 bg-emerald-950/95 px-3 py-1.5 rounded-xl border border-emerald-500/40 shrink-0 shadow-md">
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
                className="px-2.5 py-1 rounded-lg bg-emerald-950/80 border border-emerald-700/30 text-center"
              >
                <span className="text-[10px] text-gray-400 block">{tier.label}</span>
                <span className="text-xs font-bold text-deli-amber-400 font-mono">{tier.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-emerald-900/60">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 group-hover:text-white transition-colors">
          <Eye className="w-3.5 h-3.5" />
          <span>Details</span>
        </span>

        <div className="flex items-center gap-2">
          <a
            href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}?text=${encodeURIComponent(`Hi Meko Deli, I would like to order: ${item.name}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-2 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/40 transition-colors"
            title="Order on WhatsApp"
          >
            <WhatsAppIcon className="w-3.5 h-3.5" />
          </a>

          <a
            href={`tel:${businessData.phoneRaw}`}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Phone className="w-3 h-3 text-deli-amber-300" />
            <span>Call (315) 864-3000</span>
          </a>
        </div>
      </div>
    </motion.article>
  );
};
