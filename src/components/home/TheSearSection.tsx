import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Thermometer } from 'lucide-react';

export const TheSearSection: React.FC = () => {
  const [heatLevel, setHeatLevel] = useState(260);

  return (
    <section id="sear" className="py-28 md:py-40 bg-[#050505] relative overflow-hidden border-t border-white/10">
      {/* Sizzling Grill Lighting & Embers Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-[#1F0808] to-[#070707] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-red-600/20 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Repetitive Typographic Stack (Exact matching Frame 00:08 - 00:10) */}
        <div className="space-y-0 select-none mb-12">
          <p className="text-sm font-hud font-bold text-red-500 uppercase tracking-widest">
            PROCESS // THE FLAT-TOP SMASH
          </p>
          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-display font-black text-red-600/20 tracking-tight uppercase leading-[0.88]">
            // 04. THE SEAR
          </h2>
          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-display font-black text-red-500/60 tracking-tight uppercase leading-[0.88]">
            // 04. THE SEAR
          </h2>
          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-display font-black text-white tracking-tight uppercase leading-[0.88] shadow-sm">
            // 04. THE SEAR
          </h2>
        </div>

        {/* Live Flat-top Grill Experience */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Sizzling Flat-top Display Canvas */}
          <div className="lg:col-span-8 relative rounded-[2.5rem] overflow-hidden border-2 border-red-500/40 shadow-2xl shadow-red-950/60 bg-black min-h-[380px] sm:min-h-[460px] flex items-center justify-center p-8 group">
            
            {/* Grill Texture & Flames Animation */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-orange-600/40 via-red-900/30 to-black pointer-events-none" />
            
            {/* Flat-top metal grill stripes */}
            <div className="absolute inset-0 opacity-25 bg-[repeating-linear-gradient(0deg,#222,#222_4px,transparent_4px,transparent_16px)] pointer-events-none" />

            {/* Sizzling Patties Visual */}
            <div className="relative z-10 text-center space-y-6">
              <div className="flex justify-center gap-6">
                {[1, 2].map((patty) => (
                  <motion.div
                    key={patty}
                    animate={{ scale: [1, 1.02, 0.98, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                    className="w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-[#261007] via-[#140803] to-[#0A0401] border-4 border-amber-600/60 shadow-[0_0_35px_rgba(239,68,68,0.6)] flex items-center justify-center relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,100,0,0.3)_0%,_transparent_70%)] animate-pulse" />
                    <div className="text-center font-hud">
                      <Flame className="w-8 h-8 text-orange-500 mx-auto animate-bounce" />
                      <span className="text-[10px] text-amber-300 font-bold block mt-1">100% BEEF</span>
                      <span className="text-xs text-white font-mono font-black">{heatLevel}°C</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Heat Gauge Badge (Frame 00:09) */}
              <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black/90 border border-red-500/50 backdrop-blur-xl shadow-2xl">
                <Thermometer className="w-5 h-5 text-red-500 animate-pulse" />
                <span className="text-sm font-hud font-bold text-white">
                  GRILL TEMPERATURE: <strong className="text-red-400 font-mono text-base">{heatLevel}°C / {Math.round(heatLevel * 1.8 + 32)}°F</strong>
                </span>
              </div>
            </div>

            {/* Heat slider prompt */}
            <div className="absolute bottom-4 inset-x-6 flex items-center justify-between text-[11px] font-hud text-gray-400 bg-black/80 px-4 py-2 rounded-xl border border-white/10">
              <span>DRAG TO ADJUST FLAT-TOP HEAT:</span>
              <input
                type="range"
                min="140"
                max="320"
                value={heatLevel}
                onChange={(e) => setHeatLevel(Number(e.target.value))}
                className="w-36 sm:w-56 accent-red-500 cursor-pointer"
              />
            </div>

          </div>

          {/* Right: Technical Specs Statement (Frame 00:09 & 00:10) */}
          <div className="lg:col-span-4 space-y-6 font-hud">
            <div className="space-y-2">
              <p className="text-xs text-red-500 font-bold uppercase tracking-widest">
                THE SECRET OF THE CRUST
              </p>
              <h3 className="text-3xl sm:text-4xl font-display font-black text-white uppercase leading-tight">
                EVERY LAYER: UNCOMPROMISED.
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sans">
              Ground beef seasoned and smashed paper-thin onto screaming hot steel. The intense heat instantly caramelizes natural sugars and amino acids, forming the signature jagged, crispy lace edge that holds every drop of savory flavor.
            </p>

            <div className="p-5 rounded-2xl bg-[#0F0F0F] border border-white/10 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-gray-500">SMASH PRESSURE:</span>
                <span className="text-white font-bold">120 LBS STEEL PRESS</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="text-gray-500">MAILLARD CONTACT:</span>
                <span className="text-amber-400 font-bold">90 SECONDS</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">CHEESE MELT TIME:</span>
                <span className="text-red-400 font-bold">30 SEC DOMED STEAM</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
