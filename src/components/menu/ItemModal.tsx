import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Flame, MapPin } from 'lucide-react';
import type { MenuItem } from '../../types';
import { businessData } from '../../data/business';

interface ItemModalProps {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="relative max-w-lg w-full rounded-3xl bg-[#0C2216] border-2 border-emerald-500/40 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Item Header */}
          <div className="space-y-2 pr-8">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-deli-amber-400 bg-deli-amber-400/10 px-2.5 py-0.5 rounded-full border border-deli-amber-400/20">
                {item.category.replace('-', ' ')}
              </span>
              {item.popular && (
                <span className="text-xs font-black uppercase text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-600/40">
                  Popular
                </span>
              )}
              {item.spicy && (
                <span className="text-xs font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded flex items-center gap-1">
                  <Flame className="w-3 h-3" /> Spicy
                </span>
              )}
            </div>

            <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
              {item.name}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            {item.description}
          </p>

          {/* Price Matrix / Size Options */}
          {item.tiers && item.tiers.length > 0 ? (
            <div className="space-y-2 p-4 rounded-2xl bg-[#07160E] border border-emerald-900/60">
              <p className="text-xs font-bold uppercase text-emerald-400 tracking-wider">
                Available Sizes &amp; Pricing
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                {item.tiers.map((tier, idx) => (
                  <div 
                    key={idx} 
                    className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-600/30 text-center"
                  >
                    <span className="text-xs text-gray-300 block">{tier.label}</span>
                    <span className="text-base font-black text-deli-amber-400 font-mono">{tier.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-[#07160E] border border-emerald-900/60 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-300">Price</span>
              <span className="text-2xl font-mono font-black text-deli-amber-400">{item.priceDisplay}</span>
            </div>
          )}

          {/* Direct Order Call CTA */}
          <div className="space-y-3 pt-2">
            <a
              href={`tel:${businessData.phoneRaw}`}
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-deli-amber-500 to-amber-600 hover:from-deli-amber-400 hover:to-amber-500 text-black font-black text-base shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Phone className="w-5 h-5" />
              <span>Call to Order: (315) 864-3000</span>
            </a>

            <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pick up fresh at 1510 Sunset Ave, Utica, NY</span>
            </p>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
