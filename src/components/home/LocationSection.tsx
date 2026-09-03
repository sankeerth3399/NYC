import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Navigation, ArrowUpRight, Compass } from 'lucide-react';
import { businessData } from '../../data/business';

export const LocationSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#07160D] relative overflow-hidden border-t border-emerald-950/80">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-bold text-deli-amber-400 uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            <span>Visit Us in Utica</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Stop By or Call Ahead
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            Conveniently located on Sunset Ave in Utica, NY. Fast parking and friendly neighborhood service.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 rounded-3xl bg-[#0D2619] border border-emerald-500/30 shadow-2xl p-6 sm:p-8 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              {/* Address Spotlight */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-950 border border-emerald-400/40 flex items-center justify-center shrink-0 shadow-md">
                  <MapPin className="w-6 h-6 text-deli-amber-400 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">
                    Our Location
                  </h3>
                  <p className="text-2xl font-display font-black text-white mt-1">
                    1510 Sunset Ave
                  </p>
                  <p className="text-lg text-gray-300">
                    Utica, NY 13502
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Corner of Sunset Ave &amp; Square Street
                  </p>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4 pt-4 border-t border-emerald-900/60">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">
                    Store &amp; Kitchen Hours
                  </h3>
                  <p className="text-base font-bold text-white mt-1">
                    Monday – Sunday: 7:00 AM – 10:00 PM
                  </p>
                  <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                    Open 7 Days a Week
                  </p>
                </div>
              </div>

              {/* Phone Spotlight */}
              <div className="flex items-start gap-4 pt-4 border-t border-emerald-900/60">
                <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-deli-amber-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider">
                    Call Orders Ahead
                  </h3>
                  <p className="text-2xl font-display font-black text-deli-amber-400 mt-1">
                    (315) 864-3000
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Call ahead for fast pickup hot off the grill
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-6 border-t border-emerald-900/60">
              <a
                href={businessData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-extrabold text-base shadow-lg shadow-emerald-950/50 hover:scale-[1.02] active:scale-[0.98] transition-all group"
              >
                <Navigation className="w-5 h-5 text-deli-amber-300" />
                <span>Get Directions to Meko</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={`tel:${businessData.phoneRaw}`}
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-2xl bg-[#091A11] hover:bg-[#122C1D] text-white font-bold text-sm border border-emerald-500/40 shadow hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Phone className="w-4 h-4 text-deli-amber-400" />
                <span>Call Now: (315) 864-3000</span>
              </a>
            </div>

          </motion.div>

          {/* Right Google Maps Embed Container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-3xl overflow-hidden border-2 border-emerald-500/30 shadow-2xl bg-[#0b2014] relative min-h-[380px] lg:min-h-full"
          >
            <iframe
              src={businessData.googleMapsEmbedUrl}
              title="Meko Deli & Grocery Google Map Location at 1510 Sunset Ave, Utica, NY"
              className="w-full h-full min-h-[420px] lg:min-h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Overlay Map Badge */}
            <div className="absolute top-4 left-4 p-3 rounded-2xl bg-[#081910]/90 backdrop-blur-md border border-emerald-500/40 shadow-xl flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <div className="text-xs">
                <span className="font-bold text-white block">Meko Deli &amp; Grocery</span>
                <span className="text-emerald-300">1510 Sunset Ave, Utica</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
