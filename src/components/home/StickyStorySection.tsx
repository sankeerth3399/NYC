import React, { useRef, useLayoutEffect, useState } from 'react';
import { Flame, Sparkles, Utensils, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { businessData } from '../../data/business';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { gsap, isReducedMotion } from '../../lib/animations/gsapInit';

export const StickyStorySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // Active Stage State for UI Badges (0 = Burger, 1 = Sandwich)
  const [activeStage, setActiveStage] = useState<'burger' | 'sandwich'>('burger');
  const [phaseText, setPhaseText] = useState<{ title: string; subtitle: string; badge: string }>({
    badge: 'Meko Signature • 01',
    title: 'PERFECT BURGER',
    subtitle: 'Made for the moment.',
  });

  // Burger Elements
  const burgerStageRef = useRef<HTMLDivElement>(null);
  const burgerAssembledRef = useRef<HTMLImageElement>(null);
  const burgerLayersContainerRef = useRef<HTMLDivElement>(null);
  const burgerTopBunRef = useRef<HTMLDivElement>(null);
  const burgerGreensRef = useRef<HTMLDivElement>(null);
  const burgerCheeseRef = useRef<HTMLDivElement>(null);
  const burgerBottomBunRef = useRef<HTMLDivElement>(null);
  const burgerTagsRef = useRef<HTMLDivElement>(null);

  // Sandwich Elements
  const sandwichStageRef = useRef<HTMLDivElement>(null);
  const sandwichAssembledRef = useRef<HTMLImageElement>(null);
  const sandwichLayersContainerRef = useRef<HTMLDivElement>(null);
  const sandwichTopBreadRef = useRef<HTMLDivElement>(null);
  const sandwichGreensRef = useRef<HTMLDivElement>(null);
  const sandwichMeatRef = useRef<HTMLDivElement>(null);
  const sandwichBottomBreadRef = useRef<HTMLDivElement>(null);
  const sandwichTagsRef = useRef<HTMLDivElement>(null);

  // Glows & Backdrop
  const glowAmberRef = useRef<HTMLDivElement>(null);
  const glowEmeraldRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();
      if (reduced) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 768px)',
          isMobile: '(max-width: 767px)',
        },
        (context) => {
          const { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean };

          // Responsive physical displacement values
          const bTopBunY = isDesktop ? -240 : -105;
          const bGreensY = isDesktop ? -115 : -50;
          const bCheeseY = isDesktop ? 10 : 5;
          const bBottomBunY = isDesktop ? 190 : 85;

          const sTopBreadY = isDesktop ? -215 : -95;
          const sGreensY = isDesktop ? -100 : -45;
          const sMeatY = isDesktop ? 20 : 10;
          const sBottomBreadY = isDesktop ? 185 : 80;

          // Main ScrollTrigger Timeline spanning the entire 380vh scroll track
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
              onUpdate: (self) => {
                const p = self.progress;

                if (p < 0.48) {
                  setActiveStage('burger');
                  if (p < 0.12) {
                    setPhaseText({
                      badge: 'Meko Signature • 01',
                      title: 'PERFECT BURGER',
                      subtitle: 'Smashed double beef, melted American & brioche.',
                    });
                  } else if (p < 0.36) {
                    setPhaseText({
                      badge: 'Exploded View • 01',
                      title: 'EVERY LAYER MATTERS',
                      subtitle: 'Buttered buns, crisp garden greens, sizzling patties.',
                    });
                  } else {
                    setPhaseText({
                      badge: 'Reassembled • 01',
                      title: 'PERFECTLY STACKED',
                      subtitle: 'Hot off the Sunset Ave flat-top grill.',
                    });
                  }
                } else {
                  setActiveStage('sandwich');
                  if (p < 0.62) {
                    setPhaseText({
                      badge: 'Utica Bodega Legend • 02',
                      title: 'HERO SUBMARINE',
                      subtitle: 'Crusty bakery bread, loaded steak & melted cheese.',
                    });
                  } else if (p < 0.88) {
                    setPhaseText({
                      badge: 'Exploded View • 02',
                      title: 'CHOPPED. SEASONED. MELTED.',
                      subtitle: 'The authentic Utica chopped cheese craft.',
                    });
                  } else {
                    setPhaseText({
                      badge: 'Reassembled • 02',
                      title: 'THE COMPLETE HERO',
                      subtitle: 'Folded, wrapped, and served with crispy fries.',
                    });
                  }
                }
              },
            },
          });

          // ==========================================
          // PART 1: BURGER TIMELINE (Progress 0.00 -> 0.48)
          // ==========================================

          // Initial state setup
          gsap.set(burgerStageRef.current, { opacity: 1, scale: 1, display: 'block' });
          gsap.set(burgerAssembledRef.current, { opacity: 1 });
          gsap.set(burgerLayersContainerRef.current, { opacity: 0 });
          gsap.set(sandwichStageRef.current, { opacity: 0, scale: 0.9, display: 'none' });
          gsap.set(burgerTagsRef.current, { opacity: 0 });
          gsap.set(sandwichTagsRef.current, { opacity: 0 });

          // Disassembly: 0.00 -> 0.22
          tl.to(
            burgerAssembledRef.current,
            { opacity: 0, duration: 0.06, ease: 'power1.out' },
            0.02
          )
            .to(
              burgerLayersContainerRef.current,
              { opacity: 1, duration: 0.06, ease: 'power1.in' },
              0.02
            )
            // Separate burger layers vertically with realistic tilt
            .to(
              burgerTopBunRef.current,
              { y: bTopBunY, rotateX: -6, rotateZ: -2.5, duration: 0.2, ease: 'power2.out' },
              0.02
            )
            .to(
              burgerGreensRef.current,
              { y: bGreensY, rotateX: 3, rotateZ: 2, duration: 0.2, ease: 'power2.out' },
              0.03
            )
            .to(
              burgerCheeseRef.current,
              { y: bCheeseY, rotateX: -2, rotateZ: -1.5, duration: 0.2, ease: 'power2.out' },
              0.03
            )
            .to(
              burgerBottomBunRef.current,
              { y: bBottomBunY, rotateX: 6, rotateZ: 2, duration: 0.2, ease: 'power2.out' },
              0.02
            )
            .to(
              burgerStageRef.current,
              { scale: isDesktop ? 0.94 : 0.92, duration: 0.2, ease: 'power1.out' },
              0.04
            )
            .to(burgerTagsRef.current, { opacity: 1, duration: 0.12 }, 0.1)

            // Hold / Floating 3D Suspended View: 0.22 -> 0.28
            .to(
              burgerTopBunRef.current,
              { y: bTopBunY - 12, rotateZ: -3.5, duration: 0.08, ease: 'sine.inOut' },
              0.22
            )
            .to(
              burgerBottomBunRef.current,
              { y: bBottomBunY + 10, rotateZ: 1.5, duration: 0.08, ease: 'sine.inOut' },
              0.22
            )

            // Reassembly: 0.28 -> 0.44
            .to(burgerTagsRef.current, { opacity: 0, duration: 0.08 }, 0.28)
            .to(
              burgerTopBunRef.current,
              { y: 0, rotateX: 0, rotateZ: 0, duration: 0.14, ease: 'power2.inOut' },
              0.3
            )
            .to(
              burgerGreensRef.current,
              { y: 0, rotateX: 0, rotateZ: 0, duration: 0.14, ease: 'power2.inOut' },
              0.3
            )
            .to(
              burgerCheeseRef.current,
              { y: 0, rotateX: 0, rotateZ: 0, duration: 0.14, ease: 'power2.inOut' },
              0.3
            )
            .to(
              burgerBottomBunRef.current,
              { y: 0, rotateX: 0, rotateZ: 0, duration: 0.14, ease: 'power2.inOut' },
              0.3
            )
            .to(
              burgerStageRef.current,
              { scale: 1, duration: 0.14, ease: 'power2.inOut' },
              0.3
            )
            // Clean seamless handoff to assembled image
            .to(
              burgerLayersContainerRef.current,
              { opacity: 0, duration: 0.06, ease: 'power1.out' },
              0.38
            )
            .to(
              burgerAssembledRef.current,
              { opacity: 1, duration: 0.06, ease: 'power1.in' },
              0.38
            )
            // Reassembled snap celebration
            .to(
              burgerStageRef.current,
              { scale: 1.04, duration: 0.04, ease: 'back.out(1.5)' },
              0.44
            );

          // ==========================================
          // PART 2: BURGER -> SANDWICH TRANSITION (0.46 -> 0.54)
          // ==========================================
          tl.to(
            burgerStageRef.current,
            {
              opacity: 0,
              scale: 0.9,
              y: -30,
              duration: 0.08,
              onComplete: () => {
                if (burgerStageRef.current) burgerStageRef.current.style.display = 'none';
                if (sandwichStageRef.current) sandwichStageRef.current.style.display = 'block';
              },
              onReverseComplete: () => {
                if (burgerStageRef.current) burgerStageRef.current.style.display = 'block';
                if (sandwichStageRef.current) sandwichStageRef.current.style.display = 'none';
              },
            },
            0.48
          )
            .to(glowAmberRef.current, { opacity: 0.3, duration: 0.08 }, 0.48)
            .to(glowEmeraldRef.current, { opacity: 0.7, duration: 0.08 }, 0.5)
            .fromTo(
              sandwichStageRef.current,
              { opacity: 0, scale: 0.9, y: 30 },
              { opacity: 1, scale: 1, y: 0, duration: 0.08, ease: 'power2.out' },
              0.52
            );

          // ==========================================
          // PART 3: SANDWICH TIMELINE (0.54 -> 1.00)
          // ==========================================

          // Initial setup for sandwich
          gsap.set(sandwichAssembledRef.current, { opacity: 1 });
          gsap.set(sandwichLayersContainerRef.current, { opacity: 0 });

          // Disassembly: 0.54 -> 0.74
          tl.to(
            sandwichAssembledRef.current,
            { opacity: 0, duration: 0.06, ease: 'power1.out' },
            0.56
          )
            .to(
              sandwichLayersContainerRef.current,
              { opacity: 1, duration: 0.06, ease: 'power1.in' },
              0.56
            )
            .to(
              sandwichTopBreadRef.current,
              { y: sTopBreadY, rotateX: -5, rotateZ: -2, duration: 0.18, ease: 'power2.out' },
              0.56
            )
            .to(
              sandwichGreensRef.current,
              { y: sGreensY, rotateX: 3, rotateZ: 1.5, duration: 0.18, ease: 'power2.out' },
              0.57
            )
            .to(
              sandwichMeatRef.current,
              { y: sMeatY, rotateX: -2, rotateZ: -1, duration: 0.18, ease: 'power2.out' },
              0.57
            )
            .to(
              sandwichBottomBreadRef.current,
              { y: sBottomBreadY, rotateX: 5, rotateZ: 2, duration: 0.18, ease: 'power2.out' },
              0.56
            )
            .to(
              sandwichStageRef.current,
              { scale: isDesktop ? 0.93 : 0.9, duration: 0.18, ease: 'power1.out' },
              0.58
            )
            .to(sandwichTagsRef.current, { opacity: 1, duration: 0.12 }, 0.64)

            // Hold / Suspended float: 0.74 -> 0.82
            .to(
              sandwichTopBreadRef.current,
              { y: sTopBreadY - 10, rotateZ: -2.8, duration: 0.08, ease: 'sine.inOut' },
              0.74
            )
            .to(
              sandwichBottomBreadRef.current,
              { y: sBottomBreadY + 10, rotateZ: 1.2, duration: 0.08, ease: 'sine.inOut' },
              0.74
            )

            // Reassembly: 0.82 -> 0.96
            .to(sandwichTagsRef.current, { opacity: 0, duration: 0.08 }, 0.82)
            .to(
              sandwichTopBreadRef.current,
              { y: 0, rotateX: 0, rotateZ: 0, duration: 0.14, ease: 'power2.inOut' },
              0.84
            )
            .to(
              sandwichGreensRef.current,
              { y: 0, rotateX: 0, rotateZ: 0, duration: 0.14, ease: 'power2.inOut' },
              0.84
            )
            .to(
              sandwichMeatRef.current,
              { y: 0, rotateX: 0, rotateZ: 0, duration: 0.14, ease: 'power2.inOut' },
              0.84
            )
            .to(
              sandwichBottomBreadRef.current,
              { y: 0, rotateX: 0, rotateZ: 0, duration: 0.14, ease: 'power2.inOut' },
              0.84
            )
            .to(
              sandwichStageRef.current,
              { scale: 1, duration: 0.14, ease: 'power2.inOut' },
              0.84
            )
            // Clean seamless handoff to assembled image
            .to(
              sandwichLayersContainerRef.current,
              { opacity: 0, duration: 0.06, ease: 'power1.out' },
              0.92
            )
            .to(
              sandwichAssembledRef.current,
              { opacity: 1, duration: 0.06, ease: 'power1.in' },
              0.92
            )
            // Final snap celebration
            .to(
              sandwichStageRef.current,
              { scale: 1.04, duration: 0.04, ease: 'back.out(1.5)' },
              0.96
            );
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative bg-[#040e08] border-t border-emerald-950/80 h-[380vh]"
    >
      {/* Pinned 100svh Viewport Container */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-8 bg-[#040e08] select-none"
      >
        {/* Background Atmospheric Glow Effects */}
        <div className="absolute inset-0 bg-deli-grid opacity-25 pointer-events-none" />
        <div
          ref={glowAmberRef}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-deli-amber-500/15 rounded-full blur-[160px] pointer-events-none transition-opacity duration-700"
        />
        <div
          ref={glowEmeraldRef}
          className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-600/15 rounded-full blur-[140px] pointer-events-none transition-opacity duration-700"
        />

        {/* Top Floating Stage Controls & Editorial Header */}
        <div className="relative z-20 max-w-4xl mx-auto w-full text-center space-y-2">
          
          {/* Top Switcher Badges */}
          <div className="inline-flex items-center gap-2 p-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 backdrop-blur-md shadow-2xl">
            <div
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-500 ${
                activeStage === 'burger'
                  ? 'bg-deli-amber-500 text-black shadow-lg shadow-deli-amber-500/30 scale-105'
                  : 'text-gray-400'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>01 • DOUBLE CHEESEBURGER</span>
            </div>
            <div
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-500 ${
                activeStage === 'sandwich'
                  ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/30 scale-105'
                  : 'text-gray-400'
              }`}
            >
              <Utensils className="w-3.5 h-3.5" />
              <span>02 • UTICA HERO SUB</span>
            </div>
          </div>

          {/* Dynamic Editorial Headline */}
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight uppercase transition-all duration-300">
              {phaseText.title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-gray-300 font-medium tracking-wide">
              {phaseText.subtitle}
            </p>
          </div>
        </div>

        {/* Center Stage: 3D Exploded Food View Area */}
        <div className="relative z-10 flex-1 flex items-center justify-center my-auto w-full max-w-5xl mx-auto">
          
          {/* ============================================================ */}
          {/* BURGER STAGE */}
          {/* ============================================================ */}
          <div
            ref={burgerStageRef}
            className="relative w-full max-w-[500px] sm:max-w-[580px] md:max-w-[620px] aspect-[16/11] flex items-center justify-center will-change-transform"
            style={{ perspective: 1200 }}
          >
            {/* Master Assembled Burger (Visible initially & on complete reassembly) */}
            <img
              ref={burgerAssembledRef}
              src="/images/layers/burger-assembled.png"
              alt="Meko Deli Smashed Double Cheeseburger fully assembled"
              className="absolute inset-0 w-full h-full object-contain z-30 drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] will-change-transform pointer-events-none"
            />

            {/* Individual Exploded Layers Container */}
            <div
              ref={burgerLayersContainerRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
            >
              {/* Top Bun Layer */}
              <div
                ref={burgerTopBunRef}
                className="absolute inset-0 w-full h-full flex items-center justify-center z-25 will-change-transform"
              >
                <img
                  src="/images/layers/burger-top-bun.png"
                  alt="Toasted Brioche Top Bun with Sesame Seeds"
                  className="w-full h-full object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* Greens & Sliced Tomato Layer */}
              <div
                ref={burgerGreensRef}
                className="absolute inset-0 w-full h-full flex items-center justify-center z-20 will-change-transform"
              >
                <img
                  src="/images/layers/burger-lettuce-tomato.png"
                  alt="Crisp Garden Greens and Sliced Ripe Tomato"
                  className="w-full h-full object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* Melted American Cheese & Crispy Smoked Bacon Layer */}
              <div
                ref={burgerCheeseRef}
                className="absolute inset-0 w-full h-full flex items-center justify-center z-15 will-change-transform"
              >
                <img
                  src="/images/layers/burger-cheese-bacon.png"
                  alt="Melted American Cheese and Smoked Bacon"
                  className="w-full h-full object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* Toasted Bottom Bun Layer */}
              <div
                ref={burgerBottomBunRef}
                className="absolute inset-0 w-full h-full flex items-center justify-center z-10 will-change-transform"
              >
                <img
                  src="/images/layers/burger-bottom-bun.png"
                  alt="Butter-Toasted Brioche Bottom Bun"
                  className="w-full h-full object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.95)]"
                />
              </div>
            </div>

            {/* Floating Ingredient Connector Tags for Burger */}
            <div
              ref={burgerTagsRef}
              className="absolute inset-0 pointer-events-none hidden sm:block z-40 transition-opacity duration-300"
            >
              {/* Tag 1: Top Bun */}
              <div className="absolute top-[8%] -right-8 md:-right-16 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/90 border border-deli-amber-500/50 backdrop-blur-md text-xs font-bold text-deli-amber-300 shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-deli-amber-400 animate-ping" />
                <span>Toasted Brioche Dome • Sesame</span>
              </div>

              {/* Tag 2: Lettuce & Tomato */}
              <div className="absolute top-[28%] -left-8 md:-left-16 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/90 border border-emerald-500/50 backdrop-blur-md text-xs font-bold text-emerald-300 shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Crisp Garden Greens &amp; Tomato</span>
              </div>

              {/* Tag 3: Cheese & Bacon */}
              <div className="absolute top-[52%] -right-8 md:-right-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/90 border border-orange-500/50 backdrop-blur-md text-xs font-bold text-orange-300 shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                <span>Double Melted American &amp; Bacon</span>
              </div>

              {/* Tag 4: Bottom Bun */}
              <div className="absolute bottom-[8%] -left-8 md:-left-16 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/90 border border-yellow-500/50 backdrop-blur-md text-xs font-bold text-yellow-300 shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span>Butter-Toasted Brioche Base</span>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* SANDWICH STAGE */}
          {/* ============================================================ */}
          <div
            ref={sandwichStageRef}
            className="relative w-full max-w-[520px] sm:max-w-[620px] md:max-w-[680px] aspect-[16/10] flex items-center justify-center will-change-transform hidden"
            style={{ perspective: 1200 }}
          >
            {/* Master Assembled Sandwich */}
            <img
              ref={sandwichAssembledRef}
              src="/images/layers/sandwich-assembled.png"
              alt="Meko Deli Loaded Hero Submarine Sandwich fully assembled"
              className="absolute inset-0 w-full h-full object-contain z-30 drop-shadow-[0_25px_35px_rgba(0,0,0,0.9)] will-change-transform pointer-events-none"
            />

            {/* Individual Exploded Layers Container */}
            <div
              ref={sandwichLayersContainerRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-20"
            >
              {/* Top Bread Layer */}
              <div
                ref={sandwichTopBreadRef}
                className="absolute inset-0 w-full h-full flex items-center justify-center z-25 will-change-transform"
              >
                <img
                  src="/images/layers/sandwich-top-bread.png"
                  alt="Artisan Bakery Hero Sub Top Bread"
                  className="w-full h-full object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* Shredded Greens & Sliced Tomatoes Layer */}
              <div
                ref={sandwichGreensRef}
                className="absolute inset-0 w-full h-full flex items-center justify-center z-20 will-change-transform"
              >
                <img
                  src="/images/layers/sandwich-greens-tomato.png"
                  alt="Shredded Crisp Iceberg and Vine Tomatoes"
                  className="w-full h-full object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* Sizzling Chopped Beef Steak Layer */}
              <div
                ref={sandwichMeatRef}
                className="absolute inset-0 w-full h-full flex items-center justify-center z-15 will-change-transform"
              >
                <img
                  src="/images/layers/sandwich-steak-cheese.png"
                  alt="Sizzling Seasoned Chopped Steak Cuts"
                  className="w-full h-full object-contain drop-shadow-[0_15px_20px_rgba(0,0,0,0.85)]"
                />
              </div>

              {/* Toasted Bottom Bread Layer */}
              <div
                ref={sandwichBottomBreadRef}
                className="absolute inset-0 w-full h-full flex items-center justify-center z-10 will-change-transform"
              >
                <img
                  src="/images/layers/sandwich-bottom-bread.png"
                  alt="Toasted Artisan Hero Sub Bottom Bread"
                  className="w-full h-full object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.95)]"
                />
              </div>
            </div>

            {/* Floating Ingredient Connector Tags for Sandwich */}
            <div
              ref={sandwichTagsRef}
              className="absolute inset-0 pointer-events-none hidden sm:block z-40 transition-opacity duration-300"
            >
              {/* Tag 1: Top Bread */}
              <div className="absolute top-[8%] -right-8 md:-right-16 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/90 border border-amber-500/50 backdrop-blur-md text-xs font-bold text-amber-300 shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span>Bakery Hero Bread • Golden Crust</span>
              </div>

              {/* Tag 2: Greens & Tomatoes */}
              <div className="absolute top-[30%] -left-8 md:-left-16 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/90 border border-emerald-500/50 backdrop-blur-md text-xs font-bold text-emerald-300 shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Shredded Crisp Iceberg &amp; Tomatoes</span>
              </div>

              {/* Tag 3: Seasoned Beef */}
              <div className="absolute top-[55%] -right-8 md:-right-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/90 border border-orange-500/50 backdrop-blur-md text-xs font-bold text-orange-300 shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                <span>Hot Chopped Beef &amp; Melted Cheese</span>
              </div>

              {/* Tag 4: Bottom Bread */}
              <div className="absolute bottom-[8%] -left-8 md:-left-16 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/90 border border-yellow-500/50 backdrop-blur-md text-xs font-bold text-yellow-300 shadow-2xl">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span>Toasted Artisan Submarine Base</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Floating Control Bar: Order CTA & Scroll Progress Hint */}
        <div className="relative z-20 max-w-4xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-emerald-950/60">
          <div className="flex items-center gap-3">
            <a
              href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}?text=${encodeURIComponent('Hi Meko Deli, I would like to order from the kitchen!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-black text-xs sm:text-sm shadow-xl shadow-[#25D366]/20 transition-all hover:scale-105 active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4 text-black" />
              <span>Order via WhatsApp</span>
            </a>

            <Link
              to="/menu"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-bold text-xs sm:text-sm border border-emerald-500/30 transition-all"
            >
              <span>Explore All 30+ Items</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-emerald-400/80">
            <Sparkles className="w-3.5 h-3.5 text-deli-amber-400 animate-pulse" />
            <span>SCROLL TO CONTROL EXPLODED LAYERS</span>
          </div>
        </div>
      </div>
    </section>
  );
};
