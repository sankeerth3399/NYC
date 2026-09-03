import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { businessData } from '../../data/business';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

interface LineUpItem {
  id: string;
  badge: string;
  name: string;
  subtitle: string;
  price: string;
  image: string;
  details: string[];
}

const lineUpItems: LineUpItem[] = [
  {
    id: 'smoke',
    badge: '01 // SIGNATURE',
    name: 'THE CHOPPED CHEESE HERO',
    subtitle: 'Utica flat-top legend. Smashed ground beef, grilled onions, double melted cheese on bakery hero.',
    price: '$7.49+',
    image: '/images/hero-sandwich.jpg',
    details: ['Double melted American', 'Griddled onions & peppers', 'Seasoned fries included'],
  },
  {
    id: 'onion-smash',
    badge: '02 // PREMIUM',
    name: 'THE ONION DOUBLE SMASH',
    subtitle: 'Thin-shaved sweet onions smashed directly into 100% beef on 260°C flat-top.',
    price: '$8.99',
    image: '/images/cheeseburger.jpg',
    details: ['Double beef patties', 'Crispy lace crust', 'Toasted brioche bun'],
  },
  {
    id: 'rice-combo',
    badge: '03 // HERO',
    name: 'CHICKEN & LAMB RICE PLATTER',
    subtitle: 'Halal seasoned chicken and gyro lamb over hot turmeric yellow rice with signature white sauce.',
    price: '$9.99',
    image: '/images/rice-platter.jpg',
    details: ['Turmeric yellow rice', 'Signature white garlic sauce', 'Fresh side pita & salad'],
  },
];

export const TheLineUpSection: React.FC = () => {
  return (
    <section id="lineup" className="py-24 md:py-36 bg-[#070707] relative overflow-hidden border-t border-white/10">
      {/* Background Accent */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] ambient-glow-red rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section HUD Header (Frame 00:06) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-hud font-bold text-red-500 uppercase tracking-widest mb-2">
              <span>// 01. THE LINE-UP</span>
              <span className="text-white/20">•</span>
              <span className="text-gray-400">SMASHED TO ORDER</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase">
              THE LINE-UP.
            </h2>
          </div>

          {/* Add-on HUD Pills (Matching reference video top-right in Frame 00:06) */}
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-hud">
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
              HOUSE PICKLES: <strong className="text-emerald-400">FREE</strong>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
              FRIED EGG: <strong className="text-amber-400">+$1.50</strong>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-gray-300">
              EXTRA CHEESE: <strong className="text-amber-400">+$1.00</strong>
            </span>
          </div>
        </div>

        {/* 3 Luxury Food Cards Grid (Frame 00:06) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {lineUpItems.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              whileHover={{ y: -8 }}
              className="rounded-[2rem] bg-[#0E0E0E] border border-white/15 hover:border-red-500/60 shadow-2xl shadow-black overflow-hidden flex flex-col justify-between group transition-all duration-300 relative"
            >
              {/* Product Photo Canvas */}
              <div className="relative h-64 sm:h-72 overflow-hidden bg-black/60">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-black/30" />

                {/* Badge Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-[11px] font-hud font-bold text-red-400 border border-red-500/40">
                    {item.badge}
                  </span>
                </div>

                {/* Price in Neon Red */}
                <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-xl bg-black/90 backdrop-blur-md border border-red-500/40 font-mono font-black text-base text-red-400 shadow-xl">
                  {item.price}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <h3 className="text-xl sm:text-2xl font-display font-black text-white group-hover:text-red-400 transition-colors leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>

                {/* Ingredient details */}
                <div className="space-y-1.5 pt-3 border-t border-white/10 font-hud text-xs text-gray-400">
                  {item.details.map((d, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>

                {/* Card Footer Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}?text=${encodeURIComponent(`Hi Meko Deli, I want to order: ${item.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-hud text-xs font-bold transition-all shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>ORDER PICKUP</span>
                  </a>

                  <span className="text-xs font-hud text-gray-400 flex items-center gap-1 group-hover:text-white transition-colors">
                    <span>HOT &amp; FRESH</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
