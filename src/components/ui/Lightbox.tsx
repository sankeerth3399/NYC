import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem } from '../../types';

export const Lightbox: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}> = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}) => {
  const currentItem = items[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onNavigate((currentIndex - 1 + items.length) % items.length);
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
          onClick={onClose}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex - 1 + items.length) % items.length);
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate((currentIndex + 1) % items.length);
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden bg-[#0A1810] border border-emerald-500/30 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 max-h-[65vh] bg-black/50 overflow-hidden flex items-center justify-center">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            <div className="p-6 bg-[#0B2014] border-t border-emerald-900/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-deli-amber-400">
                    {currentItem.category}
                  </span>
                  <span className="text-gray-400 text-xs">•</span>
                  <span className="text-xs text-gray-400">Photo {currentIndex + 1} of {items.length}</span>
                </div>
                <h3 className="text-xl font-display font-black text-white">
                  {currentItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  {currentItem.description}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="tel:3158643000"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-700 text-white font-bold text-xs shadow-md"
                >
                  Order This: (315) 864-3000
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
