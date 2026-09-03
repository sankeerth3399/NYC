import React, { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Store } from 'lucide-react';
import { aboutStory } from '../../data/business';
import { gsap, isReducedMotion } from '../../lib/animations/gsapInit';

export const StorySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const pillarsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();
      if (reduced) return;

      // Parallax scroll on the story photo
      gsap.fromTo(
        imageRef.current,
        { y: '-8%', scale: 1.05 },
        {
          y: '8%',
          scale: 1.12,
          ease: 'none',
          scrollTrigger: {
            trigger: imageContainerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        }
      );

      // Oversized typography entrance
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Story pillars staggered entrance
      gsap.fromTo(
        pillarsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#040e08] relative overflow-hidden border-t border-emerald-950/80"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] ambient-glow-emerald rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Parallax Image Showcase with Film Vignette */}
          <div className="lg:col-span-6 relative">
            <div
              ref={imageContainerRef}
              className="relative rounded-[2.2rem] overflow-hidden border-2 border-emerald-500/30 shadow-2xl shadow-black bg-[#0A1D12]"
            >
              <div
                className="relative h-[420px] sm:h-[500px] lg:h-[560px] w-full overflow-hidden"
                data-cursor="view"
              >
                <img
                  ref={imageRef}
                  src="/images/deli-sub.jpg"
                  alt="Meko Deli freshly prepared submarine cold cuts and sandwiches in Utica, NY"
                  className="w-full h-full object-cover object-center will-change-transform"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-[#040e08] via-transparent to-black/20 pointer-events-none" />

              {/* Floating Address / Heritage Badge */}
              <div
                ref={badgeRef}
                className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#07190F]/95 backdrop-blur-xl border border-emerald-400/30 flex items-center justify-between shadow-2xl"
              >
                <div>
                  <p className="text-[11px] font-bold text-deli-amber-400 uppercase tracking-widest">
                    Utica Local Cornerstone
                  </p>
                  <p className="text-base font-bold text-white">
                    1510 Sunset Ave, Utica, NY
                  </p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-emerald-900/80 flex items-center justify-center border border-emerald-500/40 text-emerald-300">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Typography & Brand Story */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-xs font-bold text-deli-amber-400 uppercase tracking-widest">
                <Store className="w-3.5 h-3.5" />
                <span>05 • Heritage &amp; Craft</span>
              </div>

              {/* Oversized Brand Typography: "MORE THAN A DELI." */}
              <div className="overflow-hidden">
                <h2
                  ref={headingRef}
                  className="text-section-title font-display font-black text-white tracking-tight uppercase leading-[0.95]"
                >
                  MORE THAN<br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-deli-amber-400 to-amber-500">
                    A DELI.
                  </span>
                </h2>
              </div>

              <p className="text-lg sm:text-xl text-emerald-300/90 font-medium leading-relaxed">
                {aboutStory.lead}
              </p>

              <p
                ref={textRef}
                className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal"
              >
                {aboutStory.bodyParagraphs[0]}
              </p>
            </div>

            {/* 3 Story Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {aboutStory.pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    pillarsRef.current[idx] = el;
                  }}
                  className="p-5 rounded-2xl bg-[#091D12] border border-emerald-500/20 hover:border-emerald-400/40 space-y-2 transition-all duration-300 group hover:-translate-y-1.5"
                >
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded bg-emerald-950 text-deli-amber-400 border border-emerald-800/40">
                    {pillar.badge}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-deli-amber-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center gap-5">
              <Link
                to="/about"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-xl shadow-emerald-950 hover:scale-105 active:scale-95 transition-all group"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300 hover:text-white transition-colors"
              >
                <span>Visit 1510 Sunset Ave &rarr;</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
