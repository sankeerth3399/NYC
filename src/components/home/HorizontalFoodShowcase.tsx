import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sparkles } from 'lucide-react';
import { businessData } from '../../data/business';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

interface ShowcaseItem {
  id: string;
  num: string;
  category: string;
  name: string;
  tagline: string;
  price: string;
  image: string;
  tags: string[];
}

const showcaseItems: ShowcaseItem[] = [
  {
    id: 'sc-1',
    num: '01',
    category: 'Hot Sandwiches',
    name: 'Chopped Cheese Hero',
    tagline: 'NYC Bodega Royalty in Utica',
    price: '$7.49+',
    image: '/images/hero-sandwich.jpg',
    tags: ['Ground Beef', 'Melted Cheese', 'Toasted Hero'],
  },
  {
    id: 'sc-2',
    num: '02',
    category: 'Rice Specials',
    name: 'Chicken & Lamb Combo Platter',
    tagline: 'Yellow Turmeric Rice & Garlic White Sauce',
    price: '$9.99',
    image: '/images/rice-platter.jpg',
    tags: ['Halal Grilled Chicken', 'Gyro Lamb', 'Side Salad'],
  },
  {
    id: 'sc-3',
    num: '03',
    category: 'Fried Favorites',
    name: 'Crispy Wings & Fries',
    tagline: 'Fresh Butchered Poultry Counter',
    price: '$6.99',
    image: '/images/chicken-wings.jpg',
    tags: ['5 Jumbo Wings', 'Seasoned Fries', 'House Dip'],
  },
  {
    id: 'sc-4',
    num: '04',
    category: 'Burgers',
    name: 'Bacon Double Cheeseburger',
    tagline: 'Smashed Beef Patties on Brioche',
    price: '$8.99',
    image: '/images/cheeseburger.jpg',
    tags: ['Double Beef', 'Smoked Bacon', 'American Cheese'],
  },
  {
    id: 'sc-5',
    num: '05',
    category: 'Cold Cuts',
    name: 'Classic Deli Submarine',
    tagline: 'Sliced Fresh to Order Daily',
    price: '$6.49+',
    image: '/images/deli-sub.jpg',
    tags: ['Turkey & Ham', 'Provolone', 'Bakery Bread'],
  },
];

export const HorizontalFoodShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Desktop subtle horizontal drift during scroll
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['4%', '-16%']
  );

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-36 bg-[#040e08] relative overflow-hidden border-t border-emerald-950/80"
    >
      {/* Glow Effects */}
      <div className="absolute top-1/2 left-1/3 w-[650px] h-[400px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-bold text-deli-amber-400 uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>03 • The Signature Gallery</span>
            </div>
            <h2 className="text-section-title font-display font-black text-white tracking-tight uppercase">
              Icons of the Grill
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-xl mt-2">
              The standout dishes that define Meko Deli &amp; Grocery. Every recipe seasoned and crafted hot to order.
            </p>
          </div>

          <Link
            to="/menu"
            className="inline-flex items-center gap-2 text-sm font-bold text-deli-amber-400 hover:text-deli-amber-300 transition-colors group"
          >
            <span>Explore All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Horizontal Food Slider */}
      <div className="w-full overflow-x-auto pb-8 pt-2 scrollbar-none snap-x snap-mandatory px-4 sm:px-8">
        <motion.div
          style={{ x }}
          className="flex gap-7 w-max will-change-transform"
        >
          {showcaseItems.map((item) => (
            <article
              key={item.id}
              className="w-[320px] sm:w-[420px] shrink-0 snap-center rounded-[2.2rem] bg-[#0A1E13] border border-emerald-500/30 hover:border-emerald-400/60 shadow-2xl shadow-black overflow-hidden flex flex-col justify-between group transition-all duration-300"
              data-cursor="explore"
            >
              {/* Product Photo */}
              <div className="relative h-64 sm:h-80 overflow-hidden bg-black/60">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1E13] via-transparent to-black/30" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-mono font-bold text-emerald-300 border border-emerald-500/30">
                    {item.num}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold text-white border border-white/20">
                    {item.category}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-xl bg-emerald-950/95 backdrop-blur-md border border-emerald-400/50 text-emerald-300 font-mono font-black text-base shadow-xl">
                  {item.price}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-7 space-y-4">
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-deli-amber-400 uppercase tracking-wider mb-1">
                    <Star className="w-3 h-3 fill-deli-amber-400" />
                    <span>Meko Favorite</span>
                  </div>
                  <h3 className="text-2xl font-display font-black text-white group-hover:text-deli-amber-300 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs font-bold text-emerald-400/90 mt-1 uppercase tracking-wide">
                    {item.tagline}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-[11px] font-medium text-gray-300 border border-emerald-900/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Bottom Order CTA */}
                <div className="pt-4 border-t border-emerald-900/60 flex items-center justify-between">
                  <a
                    href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}?text=${encodeURIComponent(`Hi Meko Deli, I would like to order: ${item.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-extrabold text-[#25D366] hover:underline"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5" />
                    <span>Order via WhatsApp</span>
                  </a>

                  <Link
                    to="/menu"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-300 hover:text-white group-hover:text-deli-amber-400 transition-colors"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
