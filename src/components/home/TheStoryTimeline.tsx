import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Flame, HeartHandshake } from 'lucide-react';
import { aboutStory } from '../../data/business';

interface TimelineStep {
  year: string;
  location: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const timelineSteps: TimelineStep[] = [
  {
    year: 'COMMUNITY ROOTS',
    location: 'UTICA, NY',
    title: 'THE NEIGHBORHOOD DELI TRADITION',
    desc: 'Founded on the principle that honest food cooked hot and fresh with care brings people together.',
    icon: <HeartHandshake className="w-4 h-4 text-red-400" />,
  },
  {
    year: 'THE CORNERSTONE',
    location: '1510 SUNSET AVE',
    title: 'THE SUNSET AVE DESTINATION',
    desc: 'Serving Utica families with grocery essentials, butchered fresh chicken cuts, and hot kitchen favorites.',
    icon: <MapPin className="w-4 h-4 text-amber-400" />,
  },
  {
    year: 'TODAY: HOT ON THE GRILL',
    location: '7 DAYS • 7AM - 10PM',
    title: 'CHOPPED CHEESE & NYC STREET CLASSICS',
    desc: 'From sizzling flat-top smash burgers to turmeric yellow rice gyro platters, cooked fresh to order.',
    icon: <Flame className="w-4 h-4 text-red-500 animate-pulse" />,
  },
];

export const TheStoryTimeline: React.FC = () => {
  return (
    <section id="story" className="py-24 md:py-36 bg-[#050505] relative overflow-hidden border-t border-white/10">
      {/* Glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] ambient-glow-red rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header HUD (Frame 00:13) */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-hud font-bold text-red-500 uppercase tracking-widest">
            <span>// 06. THE STORY</span>
            <span className="text-white/20">•</span>
            <span className="text-gray-400">HERITAGE</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight uppercase">
            FROM SUNSET AVE TO THE FLAME.
          </h2>

          <p className="text-sm sm:text-base font-hud text-gray-400">
            More than just a deli. Your daily destination for hot food and local hospitality in Utica.
          </p>
        </div>

        {/* Timeline Horizontal / Vertical Stack (Frame 00:13) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {timelineSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-8 rounded-[2rem] bg-[#0E0E0E] border border-white/10 hover:border-red-500/50 shadow-2xl space-y-4 group transition-all"
            >
              <div className="flex items-center justify-between font-hud text-xs text-gray-400 border-b border-white/10 pb-3">
                <span className="text-red-400 font-bold flex items-center gap-1.5">
                  {step.icon}
                  {step.year}
                </span>
                <span className="text-white/60">{step.location}</span>
              </div>

              <h3 className="text-xl font-display font-black text-white group-hover:text-red-400 transition-colors">
                {step.title}
              </h3>

              <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Brand Quote Card */}
        <div className="mt-14 p-8 rounded-[2.5rem] bg-[#0F0F0F] border border-red-500/30 text-center max-w-4xl mx-auto space-y-3 shadow-2xl">
          <p className="text-base sm:text-xl font-sans text-gray-200 italic leading-relaxed">
            &ldquo;{aboutStory.lead}&rdquo;
          </p>
          <div className="text-xs font-hud text-red-500 font-bold uppercase tracking-widest pt-2">
            — Meko Deli &amp; Grocery • 1510 Sunset Ave, Utica, NY
          </div>
        </div>

      </div>
    </section>
  );
};
