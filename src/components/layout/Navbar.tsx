import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu as MenuIcon, X, MapPin, Clock, ArrowRight } from 'lucide-react';
import { businessData } from '../../data/business';
import { useScrollPosition } from '../../hooks/useScrollPosition';

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
      <div className="bg-[#071D12] border-b border-[#143d26] text-xs text-gray-300 py-1.5 px-4 hidden md:block transition-all">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-300">
              <MapPin className="w-3.5 h-3.5 text-deli-amber-500" />
              <span>1510 Sunset Ave, Utica, NY 13502</span>
            </span>
            <span className="flex items-center gap-1.5 text-gray-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>Open 7 Days a Week: 7:00 AM – 10:00 PM</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 font-medium">Fresh Chicken Cuts • Hot Deli • Halal Platters</span>
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
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#091f13]/90 backdrop-blur-md shadow-lg shadow-black/40 border-b border-emerald-900/60 py-3'
            : 'bg-gradient-to-b from-[#091f13]/95 via-[#091f13]/70 to-transparent py-4 md:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group focus:outline-none"
            onClick={closeMobileMenu}
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-950 flex items-center justify-center border border-emerald-400/40 shadow-inner group-hover:scale-105 transition-transform duration-200">
              <span className="font-extrabold text-xl text-deli-amber-400 tracking-tighter">M</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl md:text-2xl text-white tracking-wider uppercase leading-none group-hover:text-deli-amber-400 transition-colors">
                MEKO
              </span>
              <span className="text-[11px] font-semibold text-emerald-300 tracking-widest uppercase">
                Deli &amp; Grocery
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3.5 py-2 rounded-full text-sm font-bold tracking-wide transition-colors ${
                    isActive
                      ? 'text-white'
                      : 'text-gray-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-emerald-700/60 rounded-full border border-emerald-400/40 -z-10 shadow-sm shadow-emerald-900/50"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button: Call Now */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={`tel:${businessData.phoneRaw}`}
              className="group relative inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-deli-amber-500 to-amber-600 text-black font-extrabold text-sm shadow-md hover:shadow-deli-amber-500/30 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Phone className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
              <span>Call Now</span>
              <span className="text-black/80 font-semibold text-xs border-l border-black/30 pl-2">
                (315) 864-3000
              </span>
            </a>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="md:hidden p-2 rounded-lg text-gray-200 hover:text-white hover:bg-emerald-900/50 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <MenuIcon className="w-6 h-6 text-white" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-[#071A10] border-b border-emerald-900/80 shadow-2xl"
            >
              <div className="px-5 pt-3 pb-6 space-y-2">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={closeMobileMenu}
                      className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-bold transition-all ${
                        isActive
                          ? 'bg-emerald-800/80 text-deli-amber-400 border border-emerald-500/30'
                          : 'text-gray-200 hover:bg-emerald-900/40 hover:text-white'
                      }`}
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-70" />
                    </Link>
                  );
                })}

                <div className="pt-4 mt-4 border-t border-emerald-900/60 space-y-3">
                  <a
                    href={`tel:${businessData.phoneRaw}`}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-deli-amber-500 to-amber-600 text-black font-extrabold text-base shadow-lg active:scale-98 transition-transform"
                  >
                    <Phone className="w-5 h-5" />
                    <span>Call Now: (315) 864-3000</span>
                  </a>

                  <div className="text-center text-xs text-gray-400 space-y-1">
                    <p className="flex items-center justify-center gap-1.5 text-emerald-300">
                      <MapPin className="w-3.5 h-3.5 text-deli-amber-400" />
                      1510 Sunset Ave, Utica, NY 13502
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};
