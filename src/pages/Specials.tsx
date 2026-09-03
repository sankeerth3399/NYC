import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Phone, ArrowRight } from 'lucide-react';
import { specialsData } from '../data/specials';
import { businessData } from '../data/business';

export const Specials: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen pb-28 bg-[#08170F] relative overflow-hidden">
      {/* Header Banner */}
      <section className="pt-16 pb-16 bg-gradient-to-b from-[#0B2A1A] via-[#0E3521] to-[#08170F] border-b border-emerald-900/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-bold text-deli-amber-400 uppercase tracking-widest"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kitchen &amp; Deli Specials</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight"
          >
            Daily &amp; Weekly Specials
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-emerald-200 uppercase font-bold tracking-wider max-w-xl mx-auto"
          >
            Fresh favorites, deli classics, and something new every day.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-2 flex flex-wrap justify-center gap-4"
          >
            <a
              href={`tel:${businessData.phoneRaw}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-deli-amber-500 to-amber-600 text-black font-extrabold text-sm shadow-xl hover:scale-105 transition-all"
            >
              <Phone className="w-5 h-5" />
              <span>Call to Order Today: (315) 864-3000</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Specials Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialsData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="rounded-3xl bg-[#0D2619] border border-emerald-500/30 hover:border-emerald-400/60 shadow-2xl overflow-hidden flex flex-col justify-between group transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-60 overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold text-emerald-300 border border-emerald-500/30">
                    {item.category}
                  </span>
                  {item.badge && (
                    <span className="px-3 py-1 rounded-full bg-deli-amber-500 text-black text-xs font-black uppercase shadow">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-xl bg-emerald-950/90 backdrop-blur-md border border-emerald-400/40 text-emerald-300 font-mono font-black text-base shadow-xl">
                  {item.price}
                </div>
              </div>

              {/* Details */}
              <div className="p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs text-deli-amber-400 font-bold uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5 text-orange-400" />
                    <span>{item.availableDays || "Daily Special"}</span>
                  </div>
                  <h2 className="text-2xl font-display font-black text-white group-hover:text-deli-amber-300 transition-colors">
                    {item.name}
                  </h2>
                  <p className="text-xs font-semibold text-emerald-300">
                    {item.tagline}
                  </p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-5 border-t border-emerald-900/60 flex items-center justify-between gap-3">
                  <Link
                    to="/menu"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 hover:text-white transition-colors"
                  >
                    <span>View Menu Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={`tel:${businessData.phoneRaw}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-800/80 hover:bg-emerald-700 text-white font-bold text-xs shadow transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-deli-amber-400" />
                    <span>Call Order</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Owner Note / Easy Customization Indicator */}
        <div className="p-6 rounded-2xl bg-[#0B2014] border border-emerald-900/60 text-center text-xs text-gray-400 space-y-1">
          <p className="font-semibold text-emerald-300">
            ★ Specials are prepared fresh daily using authentic local ingredients at Meko Deli &amp; Grocery.
          </p>
          <p>
            Call <a href={`tel:${businessData.phoneRaw}`} className="text-deli-amber-400 underline font-bold">(315) 864-3000</a> to ask about our chef&apos;s daily soup or rotation platters!
          </p>
        </div>
      </section>
    </main>
  );
};
