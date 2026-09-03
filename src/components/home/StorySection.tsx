import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Store } from 'lucide-react';
import { aboutStory } from '../../data/business';

export const StorySection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#07160D] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Large Image Composition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl bg-[#0d2619]" data-cursor="view">
              <img
                src="/images/deli-sub.jpg"
                alt="Meko Deli freshly prepared submarine cold cuts and sandwiches in Utica, NY"
                className="w-full h-[400px] sm:h-[480px] object-cover object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06140D] via-transparent to-transparent opacity-80" />

              {/* Embedded Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#091D12]/90 backdrop-blur-md border border-emerald-400/30 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-deli-amber-400 uppercase tracking-wider">
                    Neighborhood Corner Store
                  </p>
                  <p className="text-sm font-bold text-white">
                    1510 Sunset Ave, Utica, NY
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-900/80 flex items-center justify-center border border-emerald-500/40">
                  <MapPin className="w-5 h-5 text-emerald-300" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Story & 3 Feature Cards */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-bold text-deli-amber-400 uppercase tracking-widest">
                <Store className="w-3.5 h-3.5" />
                <span>Our Utica Heritage</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight leading-tight">
                Your Neighborhood Deli &amp; Grocery
              </h2>
              <p className="text-base sm:text-lg text-emerald-300/90 font-medium leading-relaxed">
                {aboutStory.lead}
              </p>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                {aboutStory.bodyParagraphs[0]}
              </p>
            </motion.div>

            {/* 3 Story Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {aboutStory.pillars.map((pillar, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="p-4 rounded-2xl bg-[#0D2417] border border-emerald-500/20 hover:border-emerald-400/40 space-y-2 transition-colors"
                >
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-950 text-deli-amber-400 border border-emerald-800/40">
                    {pillar.badge}
                  </span>
                  <h3 className="text-sm font-bold text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-[11px] text-gray-300 leading-normal">
                    {pillar.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-700/80 hover:bg-emerald-600 text-white font-bold text-sm shadow-md transition-all group"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors"
              >
                <span>Find Location</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
