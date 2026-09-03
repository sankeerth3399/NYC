import React from 'react';
import { motion } from 'framer-motion';

interface CraftItem {
  num: string;
  category: string;
  title: string;
  desc: string;
  image: string;
  stat: string;
}

const craftItems: CraftItem[] = [
  {
    num: '01',
    category: 'POULTRY & CUTS COUNTER',
    title: 'FRESH BUTCHERED CUTS',
    desc: 'Poultry breasts, jumbo chicken wings, and deli meats prepared fresh on-site every single day.',
    image: '/images/chicken-wings.jpg',
    stat: '100% FRESH DAILY',
  },
  {
    num: '02',
    category: 'MELTED PERFECTION',
    title: 'STEAM-DOMED CHEESE',
    desc: 'Thick slices of sharp American and provolone melted into every crevice of hot grilled meats.',
    image: '/images/hero-sandwich.jpg',
    stat: 'DOUBLE MELTED',
  },
  {
    num: '03',
    category: 'NYC HALAL FORMULA',
    title: 'TURMERIC RICE & WHITE SAUCE',
    desc: 'Golden steaming rice infused with real saffron and turmeric, drizzled with signature garlic white sauce.',
    image: '/images/rice-platter.jpg',
    stat: 'HOUSE RECIPE',
  },
  {
    num: '04',
    category: 'BAKERY PARTNERS',
    title: 'FRESH HERO ROLLS',
    desc: 'Crisp crust on the outside, pillowy softness inside to cradle loaded meats and rich juices.',
    image: '/images/deli-sub.jpg',
    stat: 'BAKED LOCAL',
  },
];

export const TheCutSection: React.FC = () => {
  return (
    <section id="cut" className="py-24 md:py-36 bg-[#070707] relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section HUD Header (Frame 00:11 - 00:12) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-hud font-bold text-red-500 uppercase tracking-widest mb-2">
              <span>// 05. THE CUT</span>
              <span className="text-white/20">•</span>
              <span className="text-gray-400">ARTISAN CRAFT</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase">
              CRAFT IN EVERY CUT.
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-hud text-gray-400 max-w-md">
            Utica craftsmanship. Quality ingredients sourced fresh and cooked to order on Sunset Ave.
          </p>
        </div>

        {/* 4 Macro Craft Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {craftItems.map((item, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-[2rem] bg-[#0E0E0E] border border-white/10 hover:border-red-500/50 shadow-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300 relative"
            >
              <div className="relative h-56 overflow-hidden bg-black/60">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] via-transparent to-black/30" />

                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-hud font-bold text-red-400 border border-red-500/40">
                    {item.num} // {item.stat}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-hud font-bold text-amber-400 block tracking-wider uppercase">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-display font-black text-white group-hover:text-red-400 transition-colors mt-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 font-sans leading-relaxed mt-2">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] font-hud text-gray-500 flex items-center justify-between">
                  <span>MEKO STANDARD</span>
                  <span className="text-red-400 font-bold">100% FRESH</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};
