import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Eye, ArrowUpRight } from 'lucide-react';
import { galleryItems } from '../../data/gallery';
import { Lightbox } from '../ui/Lightbox';

export const GallerySection: React.FC = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="py-20 md:py-28 bg-[#091D13] relative overflow-hidden border-t border-emerald-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-bold text-deli-amber-400 uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Flavor Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Fresh From Our Kitchen &amp; Deli
          </h2>
          <p className="text-base sm:text-lg text-gray-300">
            A glimpse into the authentic subs, chicken wings, rice platters, and deli favorites prepared daily in Utica, NY.
          </p>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => {
            const isWide = item.span === 'wide';
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => openLightbox(index)}
                className={`relative rounded-3xl overflow-hidden cursor-pointer group bg-[#0D2417] border border-emerald-500/25 hover:border-emerald-400/50 shadow-xl transition-all duration-300 ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : ''
                } h-72 sm:h-80 md:h-88`}
                data-cursor="view"
              >
                {/* Background Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />

                {/* Dark Overlay Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#06150D]/95 via-[#06150D]/40 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-bold text-emerald-300 border border-emerald-500/30">
                    {item.category}
                  </span>
                </div>

                {/* Hover Center Eye Icon Indicator */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="w-14 h-14 rounded-full bg-deli-amber-500 text-black flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="w-6 h-6" />
                  </div>
                </div>

                {/* Bottom Details Panel */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex items-end justify-between">
                  <div className="space-y-1 max-w-md">
                    <h3 className="text-lg sm:text-xl font-display font-black text-white group-hover:text-deli-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:bg-emerald-600 transition-colors">
                    <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        items={galleryItems}
        currentIndex={currentIndex}
        onNavigate={setCurrentIndex}
      />
    </section>
  );
};
