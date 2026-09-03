import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, Layers } from 'lucide-react';

interface LayerItem {
  id: string;
  name: string;
  desc: string;
  explodedY: number;
  assembledY: number;
  tag: string;
  color: string;
}

const layers: LayerItem[] = [
  {
    id: 'top-bun',
    name: 'TOASTED BRIOCHE BUN',
    desc: 'Buttered and toasted golden brown on the flat-top.',
    explodedY: -170,
    assembledY: -36,
    tag: 'BAKERY FRESH',
    color: '#D97706',
  },
  {
    id: 'pickles',
    name: 'CRISP DILL PICKLES & GREENS',
    desc: 'Tangy crunch and fresh shredded lettuce to cut the rich beef.',
    explodedY: -110,
    assembledY: -24,
    tag: 'HOUSE CURED',
    color: '#16A34A',
  },
  {
    id: 'cheese-1',
    name: 'MELTED AMERICAN CHEESE',
    desc: 'Gooey sharp American melted directly over sizzling beef.',
    explodedY: -55,
    assembledY: -12,
    tag: 'DOUBLE MELT',
    color: '#EAB308',
  },
  {
    id: 'patty-1',
    name: '100% BEEF SMASH PATTY',
    desc: 'Lace-thin caramelized crust smashed down at 260°C.',
    explodedY: 0,
    assembledY: 0,
    tag: 'FRESH NEVER FROZEN',
    color: '#78350F',
  },
  {
    id: 'sauce',
    name: 'CARAMELIZED ONIONS & SAUCE',
    desc: 'Sweet griddled onions infused with Meko secret sauce.',
    explodedY: 55,
    assembledY: 12,
    tag: 'SECRET FORMULA',
    color: '#DC2626',
  },
  {
    id: 'patty-2',
    name: 'SECOND SMASH PATTY & CHEESE',
    desc: 'Because one smash is never enough.',
    explodedY: 110,
    assembledY: 24,
    tag: 'DOUBLE STACK',
    color: '#78350F',
  },
  {
    id: 'bottom-bun',
    name: 'TOASTED BOTTOM BRIOCHE',
    desc: 'Dense enough to hold all the juices without getting soggy.',
    explodedY: 170,
    assembledY: 36,
    tag: 'STURDY BASE',
    color: '#D97706',
  },
];

export const DeconstructedBuildSection: React.FC = () => {
  const [isExploded, setIsExploded] = useState(true);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);

  return (
    <section id="build" className="py-24 md:py-36 bg-[#070707] relative overflow-hidden border-t border-white/10">
      {/* Background Lighting & Grid HUD */}
      <div className="absolute inset-0 bg-deli-grid opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] ambient-glow-red rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section HUD Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-hud font-bold text-red-500 uppercase tracking-widest mb-2">
              <span>// 02. BUILD DECONSTRUCTION</span>
              <span className="text-white/20">•</span>
              <span className="text-gray-400">FLAT-TOP 260°C</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black text-white tracking-tight uppercase">
              EVERY SINGLE LAYER.
            </h2>
            <p className="text-sm sm:text-base text-gray-400 font-hud max-w-xl mt-2">
              Engineered for maximum Maillard reaction. Zero filler. 100% fresh cuts smashed to order.
            </p>
          </div>

          {/* Mode Switcher Toggle */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-[#111111] border border-white/10 font-hud text-xs">
            <button
              onClick={() => setIsExploded(false)}
              className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer ${
                !isExploded
                  ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              ASSEMBLED
            </button>
            <button
              onClick={() => setIsExploded(true)}
              className={`px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                isExploded
                  ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>EXPLODED 3D</span>
            </button>
          </div>
        </div>

        {/* Main Grid: Left HUD Specs + Center/Right Floating Deconstructed Layers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Technical Specs HUD (Matching reference video Frame 00:02) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Giant Temperature Readout */}
            <div className="p-6 rounded-3xl bg-[#0D0D0D] border border-red-500/30 shadow-[0_0_30px_rgba(239,68,68,0.15)] space-y-2">
              <div className="flex items-center justify-between text-xs font-hud text-red-500 font-bold">
                <span className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-red-500 animate-pulse" />
                  FLAT-TOP SEAR
                </span>
                <span className="text-[10px] text-gray-400">OPTIMAL HEAT</span>
              </div>
              <p className="text-5xl sm:text-6xl font-display font-black text-white tracking-tight">
                260°C
              </p>
              <p className="text-xs text-gray-400 font-hud">
                Two beef patties pressed onto a 500°F flat-top for 90 seconds to create the signature lacy, caramelized crust.
              </p>
            </div>

            {/* Spec Table */}
            <div className="p-6 rounded-3xl bg-[#0D0D0D] border border-white/10 space-y-3 font-hud text-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400 border-b border-white/10 pb-2">
                BUILD SPECIFICATIONS
              </p>
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">FLAT-TOP:</span>
                  <span className="text-emerald-400 font-bold">FRESH NEVER FROZEN</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">BEEF:</span>
                  <span className="text-white font-bold">DOUBLE SMASH 100%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">CHEESE:</span>
                  <span className="text-amber-400 font-bold">MELTED AMERICAN</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">BUN:</span>
                  <span className="text-white font-bold">TOASTED BRIOCHE HERO</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">FRIES:</span>
                  <span className="text-amber-400 font-bold">SEASONED CRISPY</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">SAUCE:</span>
                  <span className="text-red-400 font-bold">MEKO SECRET FORMULA</span>
                </div>
              </div>
            </div>

            {/* Active Highlighted Layer Info */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-hud">
              <span className="text-gray-400 block text-[10px] uppercase">Selected Element:</span>
              <span className="text-white font-bold text-sm block mt-0.5">
                {hoveredLayer ? layers.find(l => l.id === hoveredLayer)?.name : 'HOVER ANY LAYER TO INSPECT'}
              </span>
              <span className="text-gray-400 text-xs block mt-1">
                {hoveredLayer ? layers.find(l => l.id === hoveredLayer)?.desc : 'Interactive exploded view reveals each engineered component.'}
              </span>
            </div>

          </div>

          {/* Right: Deconstructed Burger Vertical Canvas (Frame 00:01 - 00:02) */}
          <div className="lg:col-span-8 relative flex items-center justify-center min-h-[560px] sm:min-h-[640px]">
            
            {/* Red & White Checkered Tray Liner under Burger */}
            <div className="absolute bottom-2 inset-x-4 sm:inset-x-12 h-28 bg-deli-checker rounded-2xl opacity-75 shadow-2xl shadow-black transform -rotate-1 pointer-events-none border border-black/40" />

            {/* Deconstructed Layers Stack */}
            <div className="relative w-full max-w-lg flex flex-col items-center justify-center py-10">
              {layers.map((layer) => {
                const targetY = isExploded ? layer.explodedY : layer.assembledY;
                const isHovered = hoveredLayer === layer.id;

                return (
                  <motion.div
                    key={layer.id}
                    animate={{
                      y: targetY,
                      scale: isHovered ? 1.05 : 1,
                      zIndex: isHovered ? 30 : 10,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 280,
                      damping: 24,
                    }}
                    onMouseEnter={() => setHoveredLayer(layer.id)}
                    onMouseLeave={() => setHoveredLayer(null)}
                    className="absolute w-full max-w-md sm:max-w-lg cursor-pointer flex items-center justify-between group"
                  >
                    {/* Layer Graphic Representation */}
                    <div className="relative flex-1 h-14 sm:h-16 rounded-2xl bg-gradient-to-r from-[#1A1A1A] via-[#242424] to-[#1A1A1A] border border-white/20 shadow-2xl flex items-center px-4 overflow-hidden group-hover:border-red-500 transition-colors">
                      <div
                        className="absolute left-0 top-0 bottom-0 w-2"
                        style={{ backgroundColor: layer.color }}
                      />
                      <div className="flex items-center justify-between w-full pl-2 font-hud">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-600/40">
                            {layer.tag}
                          </span>
                          <span className="text-xs sm:text-sm font-black text-white group-hover:text-red-400 transition-colors">
                            {layer.name}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-500 font-mono hidden sm:inline">
                          260°C
                        </span>
                      </div>
                    </div>

                    {/* Technical Callout Pointer Line */}
                    <motion.div
                      animate={{ opacity: isExploded ? 1 : 0 }}
                      className="hidden sm:flex items-center gap-2 pl-4 shrink-0 font-hud text-[11px] text-gray-400"
                    >
                      <div className="w-8 h-[1px] bg-red-500/60" />
                      <span className="text-red-400 font-bold">→</span>
                      <span className="text-white font-bold">{layer.name.split(' ')[0]}</span>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
