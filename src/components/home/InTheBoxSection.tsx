import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Package } from 'lucide-react';
import { businessData } from '../../data/business';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

export const InTheBoxSection: React.FC = () => {
  const [isLidOpen, setIsLidOpen] = useState(true);

  return (
    <section id="box" className="py-24 md:py-36 bg-[#090909] relative overflow-hidden border-t border-white/10">
      {/* Glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] ambient-glow-red rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text & Details (Frame 00:03) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-xs font-hud font-bold text-red-500 uppercase tracking-widest">
              <span>// 03. IN THE BOX</span>
              <span className="text-white/20">•</span>
              <span className="text-amber-400">SIGNATURE COMBO PACK</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase leading-[0.94]">
              PACKED: <br />
              <span className="text-red-500">SIX STARS.</span>
            </h2>

            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(6)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>

            <p className="text-base sm:text-lg text-gray-300 font-sans leading-relaxed">
              Burger or chopped cheese hero, seasoned fries, drink, and signature sauce — each nestled into its dedicated compartment.
            </p>

            <blockquote className="p-4 rounded-2xl bg-[#141414] border-l-4 border-red-500 text-xs sm:text-sm text-gray-400 font-hud">
              &ldquo;Lid down, six stars up, out the door while it&apos;s still smoking.&rdquo;
            </blockquote>

            {/* Interactive Toggle */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => setIsLidOpen(!isLidOpen)}
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-hud text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shadow-lg"
              >
                <Package className="w-4 h-4 text-red-400" />
                <span>{isLidOpen ? 'CLOSE BOX LID' : 'OPEN BOX LID'}</span>
              </button>

              <a
                href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}?text=Hi%20Meko%20Deli,%20I%20want%20to%20order%20the%20In%20The%20Box%20Combo!`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white font-hud text-xs font-black shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all flex items-center gap-2"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>ORDER COMBO</span>
              </a>
            </div>
          </div>

          {/* Right: Interactive 3D Combo Box Packaging (Frame 00:04 & 00:05) */}
          <div className="lg:col-span-7 relative flex justify-center">
            
            {/* Combo Packaging Canvas */}
            <div className="relative w-full max-w-xl p-8 rounded-[2.5rem] bg-[#111111] border-2 border-white/15 shadow-2xl shadow-black overflow-hidden group">
              
              {/* Red-white checkered paper liner in the tray */}
              <div className="absolute inset-4 bg-deli-checker rounded-3xl opacity-80 border-2 border-black/40 shadow-inner" />

              {/* Inside Box Content (Visible when Lid is Open) */}
              <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 min-h-[360px] items-center">
                
                {/* Burger Compartment */}
                <div className="col-span-2 rounded-2xl overflow-hidden border-2 border-black/60 shadow-2xl bg-black/80 group-hover:scale-102 transition-transform">
                  <img
                    src="/images/hero-sandwich.jpg"
                    alt="Meko Deli Hot Hero in Combo Box"
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-3 bg-black/90 font-hud text-xs flex justify-between items-center text-white">
                    <span className="font-bold">CHOPPED CHEESE / SMASH</span>
                    <span className="text-amber-400 font-mono font-bold">$7.49+</span>
                  </div>
                </div>

                {/* Fries Compartment */}
                <div className="rounded-2xl overflow-hidden border-2 border-black/60 shadow-2xl bg-black/80">
                  <img
                    src="/images/chicken-wings.jpg"
                    alt="Crispy Seasoned Fries"
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-2.5 bg-black/90 font-hud text-[11px] text-center text-amber-400 font-bold">
                    SEASONED FRIES
                  </div>
                </div>

                {/* Sauce & Cold Drink Compartments */}
                <div className="col-span-2 sm:col-span-3 grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-black/90 border border-red-500/40 font-hud text-xs text-center flex items-center justify-center gap-2 text-white">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <span>HOUSE SECRET SAUCE</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/90 border border-white/20 font-hud text-xs text-center flex items-center justify-center gap-2 text-gray-300">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span>COLD DRINK / SHAKE</span>
                  </div>
                </div>

              </div>

              {/* Animated Box Lid Overlay (Frame 00:05) */}
              <AnimatePresence>
                {!isLidOpen && (
                  <motion.div
                    initial={{ y: '-100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '-100%', opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                    className="absolute inset-0 z-20 bg-gradient-to-b from-[#1C1C1C] via-[#141414] to-[#0A0A0A] border-4 border-red-600/60 rounded-[2.5rem] p-8 flex flex-col justify-between items-center text-center shadow-2xl cursor-pointer"
                    onClick={() => setIsLidOpen(true)}
                  >
                    <div className="w-full flex justify-between items-center text-[10px] font-hud text-gray-400 uppercase tracking-widest">
                      <span>MEKO DELI &amp; GROCERY</span>
                      <span className="text-red-500 font-bold">LOCKED &amp; SMOKING</span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-3xl sm:text-5xl font-display font-black text-white uppercase tracking-wider border-y-2 border-white/15 py-4">
                        MEKO DELI
                      </h3>
                      <div className="flex justify-center gap-2 text-red-500">
                        {[...Array(6)].map((_, i) => (
                          <Star key={i} className="w-6 h-6 fill-red-500" />
                        ))}
                      </div>
                      <p className="text-xs font-hud text-gray-400 tracking-widest uppercase">
                        CLICK TO UNBOX HOT MEAL
                      </p>
                    </div>

                    <div className="text-[11px] font-hud text-gray-400">
                      1510 SUNSET AVE • UTICA, NY • (315) 864-3000
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
