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
    <section className="py-24 md:py-36 bg-[#05140C] relative overflow-hidden border-t border-emerald-950/80">
      {/* Glow */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] ambient-glow-amber rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Editorial Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-bold text-deli-amber-400 uppercase tracking-widest">
            <Camera className="w-3.5 h-3.5" />
            <span>06 • Visual Food Portfolio</span>
          </div>
          <h2 className="text-section-title font-display font-black text-white tracking-tight uppercase">
            Taste in Every Frame
          </h2>
          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            A visual chronicle of the subs, wings, yellow rice platters, and fresh cuts prepared daily in our Utica kitchen.
          </p>
        </div>

        {/* Asymmetric Editorial Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item, index) => {
            const isWide = item.span === 'wide';
            const isTall = item.span === 'tall';

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => openLightbox(index)}
                className={`relative rounded-[2rem] overflow-hidden cursor-pointer group bg-[#0A1D12] border border-emerald-500/25 hover:border-emerald-400/60 shadow-2xl transition-all duration-500 ${
                  isWide ? 'md:col-span-2 lg:col-span-2' : ''
                } ${isTall ? 'h-80 sm:h-96 md:h-[420px]' : 'h-72 sm:h-80 md:h-88'}`}
                data-cursor="view"
              >
                {/* Background Image with Zoom on Hover */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                />

                {/* Film Noir Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040e08]/95 via-[#040e08]/35 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold text-emerald-300 border border-emerald-500/30">
                    {item.category}
                  </span>
                </div>

                {/* Hover Center Indicator */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                  <div className="w-16 h-16 rounded-full bg-deli-amber-500 text-black flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="w-7 h-7" />
                  </div>
                </div>

                {/* Bottom Details Panel */}
                <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 z-10 flex items-end justify-between">
                  <div className="space-y-1.5 max-w-md">
                    <h3 className="text-xl sm:text-2xl font-display font-black text-white group-hover:text-deli-amber-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-2xl bg-white/10 group-hover:bg-[#25D366] group-hover:text-black flex items-center justify-center text-white shrink-0 shadow-lg transition-colors duration-300">
                    <ArrowUpRight className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                  </div>
                </div>
              </motion.article>
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
