import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SANDWICH_LAYERS } from '../data/ingredientsData';
import { Sparkles, CheckCircle2, Flame, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const OWNER_WHATSAPP_NUMBER = '13158643000';

export default function SandwichStory({ onOpenOrderModal }) {
  const sectionRef = useRef(null);
  const stackWrapperRef = useRef(null);
  const layersRef = useRef([]);
  const assembledImgRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [calloutsActive, setCalloutsActive] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1100;
  const isDesktop = viewportWidth >= 1100;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heightFactor = Math.min(1, Math.max(0.40, window.innerHeight / 920));
      const scaleMultiplier = heightFactor * (isMobile ? 0.38 : 0.85);

      const tl = gsap.timeline({
        scrollTrigger: {
          id: 'sandwich-st',
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=260%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const prog = self.progress;
            setScrollProgress(prog);
            setCalloutsActive(prog > 0.15 && prog < 0.70);
          },
        },
      });

      // Assembled sandwich fades out as exploded layers separate
      tl.to(
        assembledImgRef.current,
        {
          opacity: 0,
          scale: 0.95,
          duration: 0.3,
          ease: 'power2.inOut',
        },
        0
      );

      // Separate each individual layer with 3D depth and viewport-scaled offsets
      layersRef.current.forEach((el, idx) => {
        if (!el) return;
        const layerData = SANDWICH_LAYERS[idx];
        const yTarget = layerData.yOffset * scaleMultiplier;
        const rot = layerData.rotate;

        // Step 1: Explode outwards
        tl.to(
          el,
          {
            y: yTarget,
            rotateX: idx < 3 ? 12 : idx > 3 ? -12 : 0,
            rotateZ: rot,
            scale: 1 + Math.abs(idx - 3) * 0.012,
            opacity: 1,
            duration: 0.5,
            ease: 'power2.out',
          },
          0.05
        );

        // Step 2: Hover hold with micro-drift
        tl.to(
          el,
          {
            y: yTarget + (idx % 2 === 0 ? 4 : -4),
            duration: 0.2,
            ease: 'sine.inOut',
          },
          0.55
        );

        // Step 3: Reassemble into single sandwich
        tl.to(
          el,
          {
            y: 0,
            rotateX: 0,
            rotateZ: 0,
            scale: 1,
            opacity: idx === 0 || idx === 6 ? 0.3 : 0,
            duration: 0.35,
            ease: 'power2.inOut',
          },
          0.75
        );
      });

      // Assembled sandwich fades back in to complete the reassembly
      tl.to(
        assembledImgRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: 'power2.out',
        },
        0.75
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [viewportWidth]);

  let statusText = 'SCROLL TO EXPLODE DELI HERO';
  if (scrollProgress > 0.15 && scrollProgress < 0.70) {
    statusText = '7 ARTISAN LAYERS FLOATING // DEEP SPECS';
  } else if (scrollProgress >= 0.70 && scrollProgress < 0.92) {
    statusText = 'REASSEMBLING // DELI HERO LOCKING';
  } else if (scrollProgress >= 0.92) {
    statusText = 'REASSEMBLED // READY FOR THE GRILL';
  }

  // Active layer calculation for mobile & tablet focused view
  const activeLayerIndex = Math.min(
    SANDWICH_LAYERS.length - 1,
    Math.max(0, Math.floor(((scrollProgress - 0.15) / 0.55) * SANDWICH_LAYERS.length))
  );
  const focusedSandwichLayer = SANDWICH_LAYERS[activeLayerIndex];

  const handleWhatsAppHeroOrder = () => {
    const text = encodeURIComponent(
      `🥪 *ORDER INQUIRY — UTICA CHOPPED CHEESE HERO*\n\nHi Meko Deli! I would like to order:\n• 1x The Famous Utica Chopped Cheese ($7.49)\n\nPlease let me know when it will be ready!`
    );
    window.open(`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  // On mobile: top card fades out IMMEDIATELY on scroll (by 3%) so sandwich is completely clear!
  const isIntroCardVisible = isMobile
    ? scrollProgress < 0.03
    : scrollProgress < 0.15 || scrollProgress > 0.85;

  return (
    <section
      id="sandwich-story"
      ref={sectionRef}
      className="story-pinned-section"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, #092114 0%, #060b08 75%)',
      }}
    >
      {/* Ambient background glows */}
      <div className="ambient-glow glow-gold" style={{ top: '20%', right: '20%', width: 'min(450px, 75vw)', height: 'min(450px, 75vw)' }} />
      <div className="ambient-glow glow-emerald" style={{ bottom: '10%', left: '15%', width: 'min(550px, 80vw)', height: 'min(550px, 80vw)' }} />

      {/* Top HUD Telemetry */}
      <div
        style={{
          position: 'absolute',
          top: isMobile ? '4.2rem' : '5.25rem',
          left: 'clamp(0.75rem, 3vw, 2rem)',
          right: 'clamp(0.75rem, 3vw, 2rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 20,
          gap: '0.5rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.65rem, 1.2vw, 0.75rem)',
              color: 'var(--gold-light)',
              background: 'rgba(245, 158, 11, 0.15)',
              padding: '0.2rem 0.55rem',
              borderRadius: '4px',
              border: '1px solid var(--border-gold)',
              whiteSpace: 'nowrap',
            }}
          >
            <Flame size={12} />
            HOT DELI HERO CRAFT
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
              display: 'none',
            }}
            className="d-md-inline"
          >
            STAGE 02 // CHOPPED CHEESE & PASTRAMI
          </span>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.62rem, 1.2vw, 0.75rem)',
            color: 'var(--green-bright)',
            background: 'rgba(6, 11, 8, 0.7)',
            padding: '0.2rem 0.55rem',
            borderRadius: '4px',
            border: '1px solid var(--border-subtle)',
            whiteSpace: 'nowrap',
          }}
        >
          {statusText}
        </div>
      </div>

      {/* Left Text Intro Panel */}
      <div
        className="hud-side-panel hud-left-panel"
        style={{
          opacity: isIntroCardVisible ? 1 : 0,
          pointerEvents: isIntroCardVisible ? 'auto' : 'none',
          visibility: isIntroCardVisible ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease, visibility 0.3s ease',
          zIndex: 25,
        }}
      >
        <p className="hud-tagline">UTICA’S ICONIC CREATION</p>
        <h2 className="hud-title">
          THE <span>CHOPPED</span> CHEESE & PASTRAMI
        </h2>
        <p className="hud-desc">
          Slow-griddled Boar’s Head spiced pastrami chopped with seasoned ribeye beef, caramelized sweet onions,
          melted Swiss & provolone on a toasted Utica sesame hero roll.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.65rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onOpenOrderModal({ name: 'The Famous Utica Chopped Cheese', price: 7.49 })}
            className="btn-gold"
            style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}
          >
            Order Hero — $7.49
          </button>
          <button
            onClick={handleWhatsAppHeroOrder}
            className="btn-whatsapp"
            style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}
          >
            <MessageSquare size={14} />
            WhatsApp
          </button>
        </div>
      </div>

      {/* Center 3D Sandwich Composition Stage */}
      <div className="sandwich-stage" style={{ pointerEvents: 'none', zIndex: 10 }}>
        <div
          ref={stackWrapperRef}
          className="sandwich-stack-wrapper"
          style={{
            width: isMobile ? 'min(88vw, 360px)' : 'min(88vw, 620px)',
            height: isMobile ? 'min(50vh, 320px)' : 'min(60vh, 420px)',
            transform: isMobile ? 'translateY(-20px)' : 'none',
          }}
        >
          {/* Fully Assembled Sandwich Image */}
          <div
            ref={assembledImgRef}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 15,
              transition: 'transform 0.3s ease',
            }}
          >
            <img
              src="/assets/sandwich/sandwich_assembled.jpg"
              alt="Meko Deli Assembled Chopped Cheese Hero"
              style={{
                maxWidth: isMobile ? '82%' : '92%',
                maxHeight: isMobile ? '65%' : '80%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(245, 158, 11, 0.25)',
              }}
            />
          </div>

          {/* Exploded Individual Layers */}
          {SANDWICH_LAYERS.map((layer, idx) => (
            <div
              key={layer.id}
              ref={(el) => (layersRef.current[idx] = el)}
              className="sandwich-layer-item"
              style={{
                zIndex: 10 - Math.abs(idx - 3),
                opacity: 0,
              }}
            >
              <div
                className="sandwich-layer-content"
                style={{
                  background:
                    idx === 0
                      ? 'linear-gradient(180deg, #d97706, #b45309)'
                      : idx === 1
                      ? 'linear-gradient(180deg, #f59e0b, #eab308)'
                      : idx === 2
                      ? 'linear-gradient(180deg, #fef08a, #fde047)'
                      : idx === 3
                      ? 'linear-gradient(180deg, #7f1d1d, #450a0a)'
                      : idx === 4
                      ? 'linear-gradient(180deg, #65a30d, #4d7c0f)'
                      : idx === 5
                      ? 'linear-gradient(180deg, #16a34a, #15803d)'
                      : 'linear-gradient(180deg, #92400e, #78350f)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      background: 'rgba(0, 0, 0, 0.4)',
                      padding: '0.12rem 0.4rem',
                      borderRadius: '3px',
                      flexShrink: 0,
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(0.82rem, 1.6vw, 1.2rem)',
                      fontWeight: 700,
                      color: '#ffffff',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {layer.name}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    background: 'rgba(0, 0, 0, 0.35)',
                    padding: '0.12rem 0.45rem',
                    borderRadius: '4px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  {layer.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 1. Large Desktops (>= 1100px): Lateral floating callouts */}
      {isDesktop && (
        <div className="ingredient-callout-container">
          {SANDWICH_LAYERS.map((layer, idx) => {
            const isLeft = layer.side === 'left';
            const topPercent = 18 + idx * 10;
            const leftPercent = isLeft ? 8 : 72;

            return (
              <div
                key={layer.id}
                className={`ingredient-callout ${calloutsActive ? 'active' : ''}`}
                style={{
                  top: `${topPercent}%`,
                  left: `${leftPercent}%`,
                  transitionDelay: `${idx * 0.03}s`,
                  border: '1px solid var(--border-gold)',
                }}
              >
                <span className="callout-tag" style={{ color: 'var(--green-light)' }}>
                  {layer.tag}
                </span>
                <h3 className="callout-name">{layer.name}</h3>
                <p className="callout-specs">{layer.specs}</p>
                <span className="callout-temp" style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--gold-light)' }}>
                  {layer.temp}
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Tablets & Mobile (< 1100px): Focused centered layer badge */}
      {!isDesktop && scrollProgress > 0.15 && scrollProgress < 0.70 && focusedSandwichLayer && (
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '5.25rem' : '6.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(8, 18, 12, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--border-gold)',
            borderRadius: '10px',
            padding: isMobile ? '0.55rem 0.85rem' : '0.85rem 1.5rem',
            width: 'min(92vw, 390px)',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.85)',
            zIndex: 25,
            textAlign: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.15rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--green-light)' }}>
              LAYER 0{activeLayerIndex + 1} / 07 • {focusedSandwichLayer.tag}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold-light)' }}>
              {focusedSandwichLayer.temp}
            </span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '1.05rem' : '1.35rem', color: '#ffffff', margin: '0.1rem 0' }}>
            {focusedSandwichLayer.name}
          </h4>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.3 }}>
            {focusedSandwichLayer.specs}
          </p>
        </div>
      )}

      {/* Reassembled Locked Toast Badge */}
      {scrollProgress >= 0.85 && (
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '3.8rem' : '5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10, 26, 17, 0.96)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--gold-light)',
            padding: 'clamp(0.5rem, 2vw, 0.85rem) clamp(0.85rem, 3vw, 1.75rem)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.5rem, 2vw, 1rem)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8), 0 0 25px var(--gold-glow)',
            zIndex: 30,
            width: 'min(92vw, 480px)',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <CheckCircle2 color="var(--gold-light)" size={20} style={{ flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--gold-light)', margin: 0 }}>
                REASSEMBLY LOCKED
              </p>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)', color: '#ffffff', margin: 0 }}>
                THE UTICA CHOPPED CHEESE
              </h4>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.35rem', flexShrink: 0 }}>
            <button
              onClick={handleWhatsAppHeroOrder}
              className="btn-whatsapp"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
              title="Order on WhatsApp"
            >
              <MessageSquare size={13} />
              WhatsApp
            </button>
            <button
              onClick={() => onOpenOrderModal({ name: 'The Famous Utica Chopped Cheese', price: 7.49 })}
              className="btn-gold"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
            >
              Order
            </button>
          </div>
        </div>
      )}

      {/* Bottom Progress Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${scrollProgress * 100}%`,
            background: 'linear-gradient(90deg, var(--green-bright), var(--gold-light))',
            boxShadow: '0 0 10px var(--gold-glow)',
          }}
        />
      </div>

      <style>{`
        @media (min-width: 768px) {
          .d-md-inline { display: inline-block !important; }
        }
      `}</style>
    </section>
  );
}
