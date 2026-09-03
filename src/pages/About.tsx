import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Store, Phone, Sparkles, ArrowRight } from 'lucide-react';
import { aboutStory, businessData } from '../data/business';
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon';
import { ParallaxImage } from '../components/motion/ParallaxImage';

export const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen pb-28 bg-[#05110A] relative overflow-hidden">
      {/* Top Banner Header */}
      <section className="pt-20 pb-20 bg-gradient-to-b from-[#05150C] via-[#092214] to-[#05110A] border-b border-emerald-900/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-bold text-deli-amber-400 uppercase tracking-widest"
          >
            <Store className="w-3.5 h-3.5" />
            <span>Our Utica Neighborhood Story</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-section-title font-display font-black text-white tracking-tight uppercase"
          >
            About Meko Deli &amp; Grocery
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-emerald-200 uppercase font-bold tracking-wider max-w-xl mx-auto"
          >
            Sandwiches, Groceries &amp; More • 1510 Sunset Ave, Utica, NY
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="pt-2 flex flex-wrap justify-center gap-4"
          >
            <a
              href={`tel:${businessData.phoneRaw}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-deli-amber-500 to-amber-600 hover:from-deli-amber-400 hover:to-amber-500 text-black font-extrabold text-sm shadow-xl hover:scale-105 transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Us: (315) 864-3000</span>
            </a>

            <a
              href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-black text-sm shadow-xl shadow-[#25D366]/20 hover:scale-105 transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 text-black" />
              <span>Chat on WhatsApp</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Story Narrative Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 space-y-24 relative z-10">
        
        {/* Story Block 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 rounded-[2.2rem] overflow-hidden border-2 border-emerald-500/30 shadow-2xl bg-[#0A1F13]"
          >
            <ParallaxImage
              src="/images/rice-platter.jpg"
              alt="Meko Deli Rice platter"
              containerClassName="h-[400px] sm:h-[480px] w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-5"
          >
            <span className="text-xs font-bold text-deli-amber-400 uppercase tracking-widest bg-deli-amber-400/10 px-3.5 py-1 rounded-full border border-deli-amber-400/20">
              Fresh Chicken &amp; Deli Flavors
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white leading-tight uppercase">
              Welcome to Meko Deli &amp; Grocery
            </h2>
            <p className="text-base sm:text-lg text-emerald-300 font-medium leading-relaxed">
              {aboutStory.lead}
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {aboutStory.bodyParagraphs[0]}
            </p>
          </motion.div>
        </div>

        {/* Story Block 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-5 order-2 lg:order-1"
          >
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-950 px-3.5 py-1 rounded-full border border-emerald-600/30">
              Your One-Stop Destination
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white leading-tight uppercase">
              Unmatched Commitment to Quality
            </h2>
            <p className="text-base text-gray-200 leading-relaxed">
              {aboutStory.bodyParagraphs[1]}
            </p>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {aboutStory.bodyParagraphs[2]}
            </p>
            
            <div className="pt-3">
              <Link
                to="/menu"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-950 hover:scale-105 active:scale-95 transition-all group"
              >
                <span>Explore Full Kitchen Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 rounded-[2.2rem] overflow-hidden border-2 border-emerald-500/30 shadow-2xl bg-[#0A1F13] order-1 lg:order-2"
          >
            <ParallaxImage
              src="/images/hero-sandwich.jpg"
              alt="Meko Deli hot grilled sandwich"
              containerClassName="h-[400px] sm:h-[480px] w-full"
            />
          </motion.div>
        </div>

        {/* 3 Pillars Showcase */}
        <div className="pt-10">
          <h3 className="text-2xl sm:text-4xl font-display font-black text-white text-center uppercase tracking-tight mb-10">
            What Defines Meko Deli
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {aboutStory.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[2rem] bg-[#0A1F13] border border-emerald-500/30 shadow-2xl space-y-4 group hover:border-emerald-400/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center text-deli-amber-400 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-display font-black text-white group-hover:text-deli-amber-300 transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Map & Contact Banner */}
        <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-r from-[#0C291B] to-[#123E28] border border-emerald-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
              Come Visit Us on Sunset Ave
            </h3>
            <p className="text-sm sm:text-base text-emerald-200">
              1510 Sunset Ave, Utica, NY 13502 • Open 7 Days: 7:00 AM – 10:00 PM
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={businessData.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3.5 rounded-full bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm shadow transition-colors"
            >
              Get Directions
            </a>
            <a
              href={`tel:${businessData.phoneRaw}`}
              className="px-7 py-3.5 rounded-full bg-deli-amber-500 hover:bg-deli-amber-400 text-black font-black text-sm shadow transition-colors"
            >
              Call (315) 864-3000
            </a>
          </div>
        </div>

      </section>
    </main>
  );
};
