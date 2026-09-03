import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, ArrowUpRight, Sparkles, Navigation } from 'lucide-react';
import { businessData } from '../../data/business';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#05110B] border-t border-[#133321] text-gray-300 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-deli-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-emerald-950/80">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-3 group inline-flex">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-950 flex items-center justify-center border border-emerald-400/40 shadow-inner group-hover:scale-105 transition-transform duration-200">
                <span className="font-extrabold text-2xl text-deli-amber-400">M</span>
              </div>
              <div>
                <h3 className="font-display font-black text-2xl text-white tracking-wider uppercase leading-none">
                  MEKO
                </h3>
                <span className="text-xs font-bold text-emerald-400 tracking-widest uppercase">
                  Deli &amp; Grocery
                </span>
              </div>
            </Link>
            
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Utica&apos;s neighborhood destination for hot cooked-to-order deli sandwiches, authentic gyro &amp; rice platters, fresh chicken cuts, juicy wings, and daily grocery essentials.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-800/40 text-xs text-emerald-300 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-deli-amber-400" />
              <span>Proudly Serving Sunset Ave, Utica, NY</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-900/60 pb-2">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-deli-amber-400 transition-colors flex items-center gap-1.5">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/menu" className="hover:text-deli-amber-400 transition-colors flex items-center gap-1.5">
                  <span>Full Deli Menu</span>
                </Link>
              </li>
              <li>
                <Link to="/specials" className="hover:text-deli-amber-400 transition-colors flex items-center gap-1.5">
                  <span>Daily &amp; Weekly Specials</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-deli-amber-400 transition-colors flex items-center gap-1.5">
                  <span>About Our Story</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-deli-amber-400 transition-colors flex items-center gap-1.5">
                  <span>Contact &amp; Directions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Menu Categories */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-900/60 pb-2">
              Popular Kitchen Items
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link to="/menu?category=hot-sandwiches" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Chopped Cheese Hero</span>
                  <span className="text-xs text-deli-amber-400 font-mono">$7.49</span>
                </Link>
              </li>
              <li>
                <Link to="/menu?category=rice-specials" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Chicken &amp; Lamb Rice Platter</span>
                  <span className="text-xs text-deli-amber-400 font-mono">$9.99</span>
                </Link>
              </li>
              <li>
                <Link to="/menu?category=fried-food" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>5 Crispy Wings w/ Fries</span>
                  <span className="text-xs text-deli-amber-400 font-mono">$6.99</span>
                </Link>
              </li>
              <li>
                <Link to="/menu?category=breakfast" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Bacon, Egg &amp; Cheese</span>
                  <span className="text-xs text-deli-amber-400 font-mono">$4.49</span>
                </Link>
              </li>
              <li>
                <Link to="/menu?category=gyro" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Greek Style Gyro Pita</span>
                  <span className="text-xs text-deli-amber-400 font-mono">$7.49</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Visit & Call */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider border-b border-emerald-900/60 pb-2">
              Visit Us in Utica
            </h4>
            <div className="space-y-3 text-sm">
              <a 
                href={businessData.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 text-gray-300 hover:text-emerald-300 transition-colors group"
              >
                <MapPin className="w-5 h-5 text-deli-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">1510 Sunset Ave</p>
                  <p className="text-gray-400 text-xs">Utica, NY 13502</p>
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium mt-1 group-hover:underline">
                    Get Directions <Navigation className="w-3 h-3" />
                  </span>
                </div>
              </a>

              <div className="flex items-start gap-2.5">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Open Daily</p>
                  <p className="text-gray-400 text-xs">Mon – Sun: 7:00 AM – 10:00 PM</p>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-black font-extrabold text-sm shadow hover:shadow-[#25D366]/30 transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 text-black" />
                  <span>WhatsApp Chat</span>
                  <ArrowUpRight className="w-4 h-4 text-black/70" />
                </a>

                <a
                  href={`tel:${businessData.phoneRaw}`}
                  className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 rounded-xl bg-emerald-900/80 hover:bg-emerald-800 text-white font-bold text-sm border border-emerald-600/50 shadow hover:shadow-emerald-900/50 transition-all"
                >
                  <Phone className="w-4 h-4 text-deli-amber-400" />
                  <span>Call (315) 864-3000</span>
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p className="text-center sm:text-left">
            &copy; {new Date().getFullYear()} <span className="text-white font-semibold">{businessData.legalName}</span>. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-center">
            <span>Sandwiches, Groceries &amp; More</span>
            <span className="text-emerald-500">•</span>
            <span>Utica, NY 13502</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
