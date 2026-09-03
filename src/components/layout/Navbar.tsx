import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu as MenuIcon, X, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';
import { businessData } from '../../data/business';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Specials', path: '/specials' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isScrolled } = useScrollPosition();
  const location = useLocation();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Top Banner for Utica Location and Direct Phone */}
      <div className="bg-[#05140C] border-b border-[#0f331f] text-xs text-gray-300 py-1.5 px-4 hidden md:block transition-all relative z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-300 font-medium">
              <MapPin className="w-3.5 h-3.5 text-deli-amber-500" />
              <span>1510 Sunset Ave, Utica, NY 13502</span>
            </span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Open 7 Days: 7:00 AM – 10:00 PM</span>
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-emerald-400 font-semibold text-[11px] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-deli-amber-400" />
              Fresh Chicken Cuts • Hot Deli Grill
            </span>
            <a 
              href={`tel:${businessData.phoneRaw}`} 
              className="flex items-center gap-1 font-bold text-deli-amber-400 hover:text-deli-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>(315) 864-3000</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#06140D]/90 backdrop-blur-xl shadow-2xl shadow-black/70 border-b border-emerald-900/60 py-3'
            : 'bg-gradient-to-b from-[#06140D]/90 via-[#06140D]/40 to-transparent py-4 md:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3.5 group focus:outline-none"
            onClick={closeMobileMenu}
          >
            <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-700 to-[#062013] flex items-center justify-center border border-emerald-400/50 shadow-lg shadow-emerald-950/60 group-hover:scale-105 group-hover:border-emerald-300 transition-all duration-300">
              <span className="font-display font-black text-2xl text-deli-amber-400 tracking-tighter">M</span>
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full bg-deli-amber-400 border-2 border-[#06140D]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl md:text-2xl text-white tracking-wider uppercase leading-none group-hover:text-deli-amber-400 transition-colors">
                MEKO
              </span>
              <span className="text-[10px] font-bold text-emerald-400 tracking-[0.25em] uppercase mt-0.5">
                Deli &amp; Grocery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#071F13]/60 border border-emerald-500/20 backdrop-blur-md">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-full text-xs lg:text-sm font-bold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-gradient-to-r from-emerald-600/90 to-emerald-700/90 rounded-full border border-emerald-400/50 -z-10 shadow-lg shadow-emerald-950"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-2.5">
            <a
              href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/40 shadow-sm transition-all duration-300 group"
              title="Chat on WhatsApp"
            >
              <WhatsAppIcon className="w-4 h-4 transition-transform group-hover:scale-110" />
            </a>

            <a
              href={`tel:${businessData.phoneRaw}`}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-deli-amber-500 to-amber-600 text-black font-black text-xs lg:text-sm shadow-xl shadow-amber-950/40 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Phone className="w-3.5 h-3.5 text-black group-hover:rotate-12 transition-transform" />
              <span>Call (315) 864-3000</span>
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="md:hidden relative z-50 p-2.5 rounded-xl text-gray-200 hover:text-white bg-emerald-950/70 border border-emerald-500/30 focus:outline-none"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <MenuIcon className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Fullscreen Mobile Navigation Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 top-0 z-40 bg-[#05130B]/98 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 pt-28 md:hidden overflow-y-auto"
            >
              <div className="space-y-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-400">
                  Navigation
                </p>
                <div className="space-y-2">
                  {navLinks.map((link, idx) => {
                    const isActive = location.pathname === link.path;
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 * idx, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <Link
                          to={link.path}
                          onClick={closeMobileMenu}
                          className={`flex items-center justify-between p-4 rounded-2xl text-2xl sm:text-3xl font-display font-black uppercase tracking-tight transition-all ${
                            isActive
                              ? 'bg-emerald-900/60 text-deli-amber-400 border border-emerald-500/40'
                              : 'text-white hover:bg-white/5'
                          }`}
                        >
                          <span>{link.name}</span>
                          <ArrowRight className="w-5 h-5 text-emerald-400" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Mobile Footer CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="pt-6 border-t border-emerald-900/60 space-y-3"
              >
                <a
                  href={`tel:${businessData.phoneRaw}`}
                  className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl bg-gradient-to-r from-deli-amber-500 to-amber-600 text-black font-black text-base shadow-xl active:scale-98 transition-transform"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call (315) 864-3000</span>
                </a>

                <a
                  href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full py-3.5 rounded-2xl bg-[#25D366] text-black font-black text-sm shadow-lg active:scale-98 transition-transform"
                >
                  <WhatsAppIcon className="w-4 h-4 text-black" />
                  <span>Chat on WhatsApp</span>
                </a>

                <div className="text-center text-xs text-gray-400 pt-1">
                  <p className="text-emerald-300 font-semibold">1510 Sunset Ave, Utica, NY 13502</p>
                  <p>Open Daily: 7:00 AM – 10:00 PM</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
