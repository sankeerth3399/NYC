import React, { useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Flame, Sparkles, Utensils, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StoryBeat {
  num: string;
  badge: string;
  icon: React.ReactNode;
  headline: string;
  sub: string;
  image: string;
  dishName: string;
  tagline: string;
}

const beats: StoryBeat[] = [
  {
    num: '01',
    badge: 'Butchered Daily',
    icon: <Sparkles className="w-4 h-4 text-deli-amber-400" />,
    headline: 'FRESH CUTS & CRISPY WINGS',
    sub: 'From fresh poultry and cuts prepared daily to golden seasoned jumbo wings, quality starts before the grill even turns on.',
    image: '/images/chicken-wings.jpg',
    dishName: 'Crispy Wings with Seasoned Fries',
    tagline: 'Fresh Chicken Cuts Counter',
  },
  {
    num: '02',
    badge: 'Cooked Hot to Order',
    icon: <Flame className="w-4 h-4 text-orange-400" />,
    headline: 'LOADED CHOPPED CHEESE',
    sub: 'Ground beef seasoned and chopped on a screaming hot flat-top, smothered with double melted cheese and folded into bakery heroes.',
    image: '/images/hero-sandwich.jpg',
    dishName: 'Utica Chopped Cheese Special',
    tagline: 'The Legendary Bodega Sub',
  },
  {
    num: '03',
    badge: 'NYC Street Halal Classics',
    icon: <Utensils className="w-4 h-4 text-emerald-400" />,
    headline: 'TURMERIC YELLOW RICE PLATTERS',
    sub: 'Tender grilled chicken and seasoned lamb gyro meat served over aromatic yellow rice with our signature creamy white sauce.',
    image: '/images/rice-platter.jpg',
    dishName: 'Chicken & Lamb Combo Platter',
    tagline: 'Street Style Rice Bowls',
  },
  {
    num: '04',
    badge: 'Utica Community',
    icon: <Award className="w-4 h-4 text-deli-amber-400" />,
    headline: 'MORE THAN JUST A DELI',
    sub: 'Your 7-day neighborhood destination on Sunset Ave for hot meals, cold subs, everyday grocery staples, and warm hospitality.',
    image: '/images/deli-sub.jpg',
    dishName: 'Classic Deli Slices & Groceries',
    tagline: '1510 Sunset Ave, Utica, NY',
  },
];

export const StickyStorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transform scroll progress (0 to 1) into active beat index (0, 1, 2, 3)
  const activeIndexMotion = useTransform(scrollYProgress, [0, 0.28, 0.58, 0.88], [0, 1, 2, 3]);
  const [activeIdx, setActiveIdx] = React.useState(0);

  React.useEffect(() => {
    return activeIndexMotion.on('change', (latest) => {
      const rounded = Math.min(Math.max(Math.round(latest), 0), beats.length - 1);
      setActiveIdx(rounded);
    });
  }, [activeIndexMotion]);

  const currentBeat = beats[activeIdx];

  return (
    <section
      ref={containerRef}
      className="relative h-[240vh] bg-[#040e08] border-t border-emerald-950/80"
    >
      {/* Sticky Fullscreen Story Canvas */}
      <div className="sticky top-0 h-screen flex items-center overflow-hidden py-12 md:py-0">
        {/* Background Gradients & Glow */}
        <div className="absolute inset-0 bg-deli-grid opacity-20 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] bg-emerald-600/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-deli-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left: Dynamic Story Beat Content */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Stepper Tabs */}
              <div className="flex items-center gap-3">
                {beats.map((beat, idx) => {
                  const isActive = idx === activeIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        // Smoothly scroll to that section proportion
                        if (containerRef.current) {
                          const top = containerRef.current.offsetTop + (idx / (beats.length - 1)) * (containerRef.current.offsetHeight - window.innerHeight);
                          window.scrollTo({ top, behavior: 'smooth' });
                        }
                      }}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-deli-amber-500 text-black shadow-lg shadow-deli-amber-500/30 scale-105'
                          : 'bg-emerald-950/60 text-emerald-400 hover:text-white border border-emerald-800/40'
                      }`}
                    >
                      <span>{beat.num}</span>
                      <span className="hidden sm:inline text-[11px] font-sans font-bold">
                        {beat.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Animated Headline & Copy */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIdx}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-bold text-deli-amber-400 uppercase tracking-widest">
                    {currentBeat.icon}
                    <span>{currentBeat.badge}</span>
                  </div>

                  <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight uppercase leading-[0.98]">
                    {currentBeat.headline}
                  </h2>

                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl">
                    {currentBeat.sub}
                  </p>

                  <div className="pt-4 flex items-center gap-4">
                    <Link
                      to="/menu"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-xl shadow-emerald-950 hover:scale-105 active:scale-95 transition-all"
                    >
                      <span>Order This Item</span>
                    </Link>
                    <Link
                      to="/about"
                      className="text-xs font-bold uppercase tracking-wider text-deli-amber-400 hover:text-deli-amber-300 transition-colors"
                    >
                      Our Story &rarr;
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Scroll Indicator Prompt */}
              <div className="pt-8 flex items-center gap-2 text-xs text-emerald-400/80 font-mono">
                <div className="w-8 h-[2px] bg-emerald-500/40" />
                <span>Scroll to unveil the Meko Deli craft ({activeIdx + 1}/4)</span>
              </div>

            </div>

            {/* Right: Large Featured Food Image with Smooth Transitions */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-lg aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl shadow-black bg-[#08170F]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, scale: 1.12 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                    data-cursor="view"
                  >
                    <img
                      src={currentBeat.image}
                      alt={currentBeat.dishName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                      <div>
                        <span className="text-[11px] font-bold text-deli-amber-400 uppercase tracking-widest">
                          {currentBeat.tagline}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-display font-black text-white">
                          {currentBeat.dishName}
                        </h3>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-500/30">
                        {currentBeat.num} / 04
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
