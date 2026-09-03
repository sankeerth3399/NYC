import React, { useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, ArrowRight, MapPin, Star, Flame, Utensils, ShieldCheck, Sparkles } from 'lucide-react';
import { businessData } from '../../data/business';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { MagneticButton } from '../motion/MagneticButton';
import { gsap, isReducedMotion } from '../../lib/animations/gsapInit';

export const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const sublabelRef = useRef<HTMLParagraphElement>(null);
  const headlineLinesRef = useRef<(HTMLHeadingElement | null)[]>([]);
  const copyRef = useRef<HTMLParagraphElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const foodContainerRef = useRef<HTMLDivElement>(null);
  const foodImageRef = useRef<HTMLImageElement>(null);
  const floatCardRef = useRef<HTMLDivElement>(null);
  const floatBadgeRef = useRef<HTMLDivElement>(null);

  const headlineLines = [
    { text: 'SANDWICHES', highlight: false },
    { text: 'THAT HIT', highlight: false },
    { text: 'DIFFERENT.', highlight: true },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = isReducedMotion();

      if (reduced) {
        gsap.set(
          [
            bgRef.current,
            badgeRef.current,
            sublabelRef.current,
            headlineLinesRef.current,
            copyRef.current,
            pillsRef.current,
            ctaRef.current,
            numbersRef.current,
            foodContainerRef.current,
            foodImageRef.current,
            floatCardRef.current,
            floatBadgeRef.current,
          ],
          { opacity: 1, y: 0, scale: 1 }
        );
        return;
      }

      // 1. Cinematic Page-Load Sequence (GSAP Timeline)
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(bgRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
        .fromTo(
          foodContainerRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1.1 },
          '-=0.7'
        )
        .fromTo(
          foodImageRef.current,
          { scale: 1.15 },
          { scale: 1, duration: 1.4, ease: 'power2.out' },
          '-=1.1'
        )
        .fromTo(
          badgeRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=1.0'
        )
        .fromTo(
          sublabelRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.8'
        )
        .fromTo(
          headlineLinesRef.current,
          { y: '110%', opacity: 0 },
          { y: '0%', opacity: 1, duration: 0.9, stagger: 0.14, ease: 'power3.out' },
          '-=0.7'
        )
        .fromTo(
          copyRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.6'
        )
        .fromTo(
          pillsRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.5'
        )
        .fromTo(
          numbersRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.4'
        )
        .fromTo(
          floatCardRef.current,
          { opacity: 0, y: 35, x: -20 },
          { opacity: 1, y: 0, x: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          floatBadgeRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)' },
          '-=0.5'
        );

      // 2. Hero Scroll Transformation (ScrollTrigger scrub)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      scrollTl
        .to(bgRef.current, { y: '20%', ease: 'none' }, 0)
        .to(
          headlineLinesRef.current,
          { y: '-40px', opacity: 0.2, ease: 'none', stagger: 0.05 },
          0
        )
        .to(copyRef.current, { y: '-30px', opacity: 0.1, ease: 'none' }, 0)
        .to(foodContainerRef.current, { y: '-15%', ease: 'none' }, 0)
        .to(foodImageRef.current, { scale: 1.08, ease: 'none' }, 0)
        .to(floatCardRef.current, { y: '-35%', ease: 'none' }, 0)
        .to(floatBadgeRef.current, { y: '-25%', ease: 'none' }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-8 pb-20 md:py-28 bg-[#05110A]"
    >
      {/* Background Lighting & Glow Effects */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <div className="absolute inset-0 bg-deli-grid opacity-30" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-600/12 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] bg-deli-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#08150E] to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Aggressive Editorial Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Pill Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 shadow-xl backdrop-blur-md"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-bold text-emerald-300 uppercase tracking-widest">
                Utica, NY • 1510 Sunset Ave
              </span>
              <span className="text-gray-500 text-xs hidden sm:inline">•</span>
              <span className="text-xs font-bold text-deli-amber-400 hidden sm:inline">Fresh Deli &amp; Grill</span>
            </div>

            {/* Sub-label */}
            <p
              ref={sublabelRef}
              className="text-xs sm:text-sm font-black uppercase tracking-[0.3em] text-emerald-400 font-display"
            >
              Meko Deli &amp; Grocery Inc.
            </p>

            {/* Giant Editorial Headline: "SANDWICHES THAT HIT DIFFERENT." */}
            <div className="space-y-1">
              {headlineLines.map((line, lIdx) => (
                <div key={lIdx} className="overflow-hidden">
                  <h1
                    ref={(el) => {
                      headlineLinesRef.current[lIdx] = el;
                    }}
                    className={`text-hero-giant font-display font-black tracking-tight uppercase leading-[0.92] ${
                      line.highlight
                        ? 'text-transparent bg-clip-text bg-gradient-to-r from-deli-amber-300 via-deli-amber-400 to-amber-500'
                        : 'text-white'
                    }`}
                  >
                    {line.text}
                  </h1>
                </div>
              ))}
            </div>

            {/* Supporting Copy */}
            <p
              ref={copyRef}
              className="text-sm sm:text-base md:text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Hot chopped cheese heroes, seasoned gyro rice platters, smashed double cheeseburgers, crispy wings, and fresh butchered chicken cuts prepared to order right on Sunset Ave.
            </p>

            {/* Interactive Feature Pills */}
            <div
              ref={pillsRef}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1 text-xs font-semibold"
            >
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/25 text-emerald-300">
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                <span>Cooked Hot to Order</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/25 text-emerald-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Daily Fresh Cuts</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/25 text-deli-amber-400">
                <Sparkles className="w-3.5 h-3.5 text-deli-amber-400" />
                <span>Open 7 Days • 7am - 10pm</span>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3"
            >
              <MagneticButton>
                <Link
                  to="/menu"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-black text-sm sm:text-base shadow-2xl shadow-emerald-950/90 hover:scale-105 active:scale-95 transition-all duration-300 group"
                  data-cursor="explore"
                >
                  <Utensils className="w-5 h-5 text-deli-amber-300" />
                  <span>Explore Menu</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                </Link>
              </MagneticButton>

              <MagneticButton>
                <a
                  href={businessData.whatsappUrl || `https://wa.me/${businessData.whatsappRaw || '13158643000'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-black text-sm sm:text-base shadow-xl shadow-[#25D366]/20 hover:scale-105 active:scale-95 transition-all duration-300"
                >
                  <WhatsAppIcon className="w-5 h-5 text-black" />
                  <span>WhatsApp Order</span>
                </a>
              </MagneticButton>

              <a
                href={`tel:${businessData.phoneRaw}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/5 hover:bg-white/10 text-gray-200 font-bold text-sm border border-emerald-500/30 hover:border-emerald-400/50 transition-colors"
              >
                <Phone className="w-4 h-4 text-deli-amber-400" />
                <span>(315) 864-3000</span>
              </a>
            </div>

            {/* Numbers Strip */}
            <div
              ref={numbersRef}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-emerald-900/40 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-black text-white font-display">100%</p>
                <p className="text-[10px] sm:text-[11px] text-emerald-300 uppercase tracking-widest">Fresh Cuts</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-black text-deli-amber-400 font-display">30+</p>
                <p className="text-[10px] sm:text-[11px] text-emerald-300 uppercase tracking-widest">Kitchen Items</p>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-2xl sm:text-3xl font-black text-white font-display">7 Days</p>
                <p className="text-[10px] sm:text-[11px] text-emerald-300 uppercase tracking-widest">7AM - 10PM</p>
              </div>
            </div>

          </div>

          {/* Right Column: Cinematic Zooming & Parallax Food Composition */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Parallax Container */}
            <div
              ref={foodContainerRef}
              className="relative w-full max-w-lg lg:max-w-none group will-change-transform"
            >
              {/* Outer Atmospheric Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/25 via-deli-amber-500/20 to-emerald-400/25 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              {/* Main Food Showcase Canvas */}
              <div
                className="relative rounded-[2.2rem] overflow-hidden border-2 border-emerald-400/40 shadow-2xl shadow-black bg-[#06150D]"
                data-cursor="view"
              >
                <img
                  ref={foodImageRef}
                  src="/images/hero-sandwich.jpg"
                  alt="Meko Deli loaded chopped cheese hero sandwich with crispy fries"
                  className="w-full h-[380px] sm:h-[480px] lg:h-[520px] object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out will-change-transform"
                />

                {/* Film Noir / Luxury Food Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#040e08]/95 via-[#040e08]/30 to-transparent pointer-events-none" />

                {/* Top Badge */}
                <div className="absolute top-5 left-5 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-xs font-bold text-white shadow-2xl">
                  <Flame className="w-3.5 h-3.5 text-orange-400 animate-pulse" />
                  <span>Signature Hero Sandwich</span>
                </div>

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-[#040e08] via-[#040e08]/90 to-transparent">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-xs font-bold text-deli-amber-400 uppercase tracking-widest">
                        Utica Specialty
                      </span>
                      <h2 className="text-2xl font-display font-black text-white">
                        Chopped Cheese &amp; Subs
                      </h2>
                      <p className="text-xs text-gray-300">Served with seasoned crispy fries</p>
                    </div>
                    <span className="text-lg font-mono font-black text-emerald-300 bg-emerald-950/90 px-3 py-1.5 rounded-xl border border-emerald-500/40 shadow-lg">
                      $7.49+
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Food Card: "Today's Favorite" with Independent Parallax */}
              <div
                ref={floatCardRef}
                className="absolute -bottom-8 -left-3 sm:-left-8 z-20 w-72 sm:w-80 p-3.5 rounded-2xl bg-[#091D12]/95 border border-emerald-400/40 shadow-2xl shadow-black backdrop-blur-xl group/card cursor-pointer hover:-translate-y-1.5 hover:scale-[1.02] transition-transform duration-300"
                data-cursor="explore"
              >
                <Link to="/menu?category=rice-specials" className="flex items-center gap-3.5">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-emerald-500/40">
                    <img
                      src="/images/rice-platter.jpg"
                      alt="Chicken and Lamb Rice Special Platter"
                      className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-0 right-0 bg-deli-amber-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded-bl">
                      TOP
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-deli-amber-400 uppercase tracking-wider">
                      <Star className="w-3 h-3 fill-deli-amber-400 text-deli-amber-400" />
                      <span>Today&apos;s Favorite</span>
                    </div>
                    <p className="text-xs font-bold text-white truncate group-hover/card:text-deli-amber-300 transition-colors">
                      Chicken &amp; Lamb Rice Platter
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs font-black text-emerald-300 font-mono">
                        $9.99
                      </span>
                      <span className="inline-flex items-center text-[11px] font-bold text-gray-300 group-hover/card:text-white transition-colors">
                        Order <ArrowRight className="w-3 h-3 ml-1 group-hover/card:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Floating Top-Right Badge */}
              <div
                ref={floatBadgeRef}
                className="absolute -top-5 -right-2 sm:-right-4 z-20 px-4 py-2 rounded-2xl bg-[#091D12]/95 border border-emerald-400/40 shadow-2xl backdrop-blur-xl flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Neighborhood</p>
                  <p className="text-xs font-bold text-white">Sunset Ave, Utica</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
