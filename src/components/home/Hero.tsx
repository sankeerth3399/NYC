import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, MapPin, Star, Flame, Utensils, ShieldCheck } from 'lucide-react';
import { businessData } from '../../data/business';

export const Hero: React.FC = () => {
  const headlineWords = ["Sandwiches,", "Groceries", "&", "More"];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-6 pb-20 md:py-24 bg-gradient-to-b from-[#08170F] via-[#0D2E1D] to-[#08150E]">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 bg-deli-grid opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-deli-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Neighborhood Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 shadow-sm backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Utica, NY Neighborhood Favorite
              </span>
              <span className="text-gray-400 text-xs hidden sm:inline">•</span>
              <span className="text-xs font-semibold text-deli-amber-400 hidden sm:inline">1510 Sunset Ave</span>
            </motion.div>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-sm md:text-base font-bold text-emerald-400 uppercase tracking-widest font-display mb-2">
                Welcome to Meko Deli &amp; Grocery
              </h2>
            </motion.div>

            {/* Main Animated Headline: "Sandwiches, Groceries & More" */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-black text-white tracking-tight leading-[1.05]">
              {headlineWords.map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.1,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className={`inline-block mr-3 ${
                    word === "&" 
                      ? "text-deli-amber-400" 
                      : word === "More" 
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-deli-amber-300 to-amber-500" 
                      : ""
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Your trusted neighborhood destination in Utica, NY for freshly prepared deli meals, loaded hero subs, fresh chicken cuts, juicy wings, authentic gyros, turmeric rice platters, and everyday grocery essentials.
            </motion.p>

            {/* Address & Quick Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-gray-300 pt-1"
            >
              <a
                href={businessData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-emerald-300 border border-emerald-500/20 transition-colors"
              >
                <MapPin className="w-4 h-4 text-deli-amber-400" />
                <span>1510 Sunset Ave, Utica, NY 13502</span>
              </a>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-gray-300 border border-white/5">
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Hot Grill Fresh Daily</span>
              </span>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3"
            >
              <Link
                to="/menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-extrabold text-base shadow-lg shadow-emerald-950/60 hover:shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all duration-200 group"
              >
                <Utensils className="w-5 h-5 text-deli-amber-300" />
                <span>Explore Menu</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href={`tel:${businessData.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#122b1c] hover:bg-[#1a3d28] text-white font-bold text-base border border-emerald-500/30 shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
              >
                <Phone className="w-5 h-5 text-deli-amber-400" />
                <span>Call Meko: (315) 864-3000</span>
              </a>
            </motion.div>

            {/* Quick Feature Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="grid grid-cols-3 gap-3 pt-6 border-t border-emerald-900/50 max-w-lg mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-black text-white font-display">100%</p>
                <p className="text-[11px] text-emerald-300 uppercase tracking-wider">Fresh Meat Cuts</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-black text-deli-amber-400 font-display">30+</p>
                <p className="text-[11px] text-emerald-300 uppercase tracking-wider">Menu Classics</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-xl sm:text-2xl font-black text-white font-display">7 Days</p>
                <p className="text-[11px] text-emerald-300 uppercase tracking-wider">Open 7am - 10pm</p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Hero Visual & Floating Interactive Card */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Main Layered Food Composition */}
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md lg:max-w-none group"
            >
              {/* Outer Decorative Ring */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-600/40 via-deli-amber-500/20 to-emerald-400/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Main Image Card */}
              <div 
                className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl shadow-black/80 bg-[#0c1f15]"
                data-cursor="view"
              >
                <img
                  src="/images/hero-sandwich.jpg"
                  alt="Meko Deli loaded pastrami and chopped cheese hero sandwich with fries"
                  className="w-full h-[360px] sm:h-[440px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06140D] via-transparent to-black/20" />

                {/* Badge on Image */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-lg">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span>Fresh Off The Grill</span>
                </div>

                {/* Bottom Card Banner */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#06150D] via-[#06150D]/90 to-transparent">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-xs font-bold text-deli-amber-400 uppercase tracking-widest">
                        Signature Special
                      </span>
                      <h3 className="text-xl font-display font-extrabold text-white">
                        Hot Chopped Cheese &amp; Subs
                      </h3>
                      <p className="text-xs text-gray-300">Served with seasoned crispy fries</p>
                    </div>
                    <span className="text-lg font-black text-emerald-300 font-mono bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-600/40">
                      $7.49+
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Food Card: "Today's Favorite" */}
              <motion.div
                initial={{ opacity: 0, y: 30, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.7, delay: 0.9, ease: 'easeOut' }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="absolute -bottom-8 -left-4 sm:-left-8 sm:-bottom-6 z-20 w-64 sm:w-72 p-3.5 rounded-2xl bg-[#0e2417]/95 border border-emerald-400/40 shadow-2xl shadow-black/90 backdrop-blur-md group/floating cursor-pointer"
              >
                <Link to="/menu?category=rice-specials" className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-emerald-500/40">
                    <img
                      src="/images/rice-platter.jpg"
                      alt="Chicken and Lamb Rice Special Platter"
                      className="w-full h-full object-cover group-hover/floating:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-0 right-0 bg-deli-amber-500 text-black text-[9px] font-black px-1 rounded-bl">
                      TOP
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-deli-amber-400 uppercase tracking-wider">
                      <Star className="w-3 h-3 fill-deli-amber-400 text-deli-amber-400" />
                      <span>Today&apos;s Favorite</span>
                    </div>
                    <p className="text-xs font-bold text-white truncate group-hover/floating:text-deli-amber-300 transition-colors">
                      Chicken &amp; Lamb Rice Platter
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-black text-emerald-300 font-mono">
                        $9.99
                      </span>
                      <span className="inline-flex items-center text-[11px] font-semibold text-gray-300 group-hover/floating:text-white transition-colors">
                        Order <ArrowRight className="w-3 h-3 ml-0.5 group-hover/floating:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>

              {/* Floating Badge on Top-Right */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="absolute -top-4 -right-2 sm:-right-4 z-20 px-3.5 py-2 rounded-2xl bg-[#091B11]/95 border border-emerald-500/40 shadow-xl backdrop-blur-md flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold">Quality First</p>
                  <p className="text-xs font-bold text-white">Fresh Chicken Cuts</p>
                </div>
              </motion.div>

            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
