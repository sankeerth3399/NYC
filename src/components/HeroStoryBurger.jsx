import React, { useRef, useEffect, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HudOverlay from './HudOverlay';
import { BURGER_LAYERS } from '../data/ingredientsData';
import { Sparkles, CheckCircle2, ChevronUp, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 120;
const OWNER_WHATSAPP_NUMBER = '13158643000';

export default function HeroStoryBurger({ onOpenOrderModal }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  // Dynamically update viewport on resize and orientation change
  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  const isMobile = viewport.width < 768;
  const isTablet = viewport.width >= 768 && viewport.width < 1100;
  const isDesktop = viewport.width >= 1100;

  // Preload frames for smooth scrubbing
  useEffect(() => {
    let loadedCount = 0;
    const images = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, '0');
      img.src = `/frames/burger/f_${frameNum}.webp`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount >= Math.min(20, TOTAL_FRAMES)) {
          setImagesLoaded(true);
        }
        if (loadedCount === TOTAL_FRAMES) {
          ScrollTrigger.refresh();
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Compute fluid CSS layout parameters based on exact aspect ratio
  const cssLayout = useMemo(() => {
    const cw = viewport.width;
    const ch = viewport.height;
    const iw = 1928;
    const ih = 1076;
    const aspect = cw / ch;

    let scale;
    if (aspect < 0.65) {
      // Tall narrow mobile (360px - 430px wide phones)
      // Balanced scale: prominent burger, full components visible, zero horizontal overflow
      scale = (cw * 1.02) / iw;
    } else if (aspect < 1.0) {
      // Tablets / iPads
      scale = Math.min((cw * 0.98) / iw, (ch * 0.62) / ih);
    } else {
      // Laptops & Desktops
      scale = Math.min((cw * 0.92) / iw, (ch * 0.78) / ih);
    }

    const nw = iw * scale;
    const nh = ih * scale;
    const cx = (cw - nw) / 2;
    const cy = aspect < 1.0 ? Math.max(75, (ch - nh) / 2 - (isMobile ? 32 : 12)) : (ch - nh) / 2;

    const burgerCenterX = cx + nw * 0.5;
    const burgerHalfWidth = nw * 0.20;

    return { cw, ch, nw, nh, cx, cy, burgerCenterX, burgerHalfWidth };
  }, [viewport.width, viewport.height, isMobile]);

  // Adaptive Canvas Rendering
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
    const img = imagesRef.current[frameIdx];

    if (img && img.complete && img.naturalWidth > 0) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;
      const aspect = (cw / dpr) / (ch / dpr);

      let scale;
      if (aspect < 0.65) {
        scale = ((cw / dpr) * 1.02) / iw * dpr;
      } else if (aspect < 1.0) {
        scale = Math.min(((cw / dpr) * 0.98) / iw, ((ch / dpr) * 0.62) / ih) * dpr;
      } else {
        scale = Math.min(((cw / dpr) * 0.92) / iw, ((ch / dpr) * 0.78) / ih) * dpr;
      }

      const nw = iw * scale;
      const nh = ih * scale;
      const cx = (cw - nw) / 2;
      const cy = aspect < 1.0 ? Math.max(75 * dpr, (ch - nh) / 2 - (isMobile ? 32 : 12) * dpr) : (ch - nh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, cx, cy, nw, nh);
    }
  };

  // GSAP ScrollTrigger timeline
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      renderFrame(currentFrame - 1);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const frameObject = { frame: 0 };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        id: 'hero-burger-st',
        trigger: containerRef.current,
        start: 'top top',
        end: '+=280%',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const prog = self.progress;
          setScrollProgress(prog);

          const targetFrame = Math.round(prog * (TOTAL_FRAMES - 1));
          frameObject.frame = targetFrame;
          setCurrentFrame(targetFrame + 1);
          renderFrame(targetFrame);
        },
      });
    }, containerRef);

    const initTimer = setTimeout(() => {
      renderFrame(0);
    }, 150);

    return () => {
      clearTimeout(initTimer);
      window.removeEventListener('resize', updateCanvasSize);
      ctx.revert();
    };
  }, [viewport.width, viewport.height]);

  // Telemetry status text
  let statusText = 'SCROLL TO UNPACK EVERY LAYER';
  if (scrollProgress > 0.12 && scrollProgress < 0.75) {
    statusText = '7 CRAFT COMPONENTS IDENTIFIED // EXPLODED VIEW';
  } else if (scrollProgress >= 0.75 && scrollProgress < 0.90) {
    statusText = 'REASSEMBLING IN SEQUENCE // DOCKING';
  } else if (scrollProgress >= 0.90) {
    statusText = 'PERFECTLY ASSEMBLED // READY TO SERVE';
  }

  // Active layer calculation for scroll telemetry
  const activeLayerIndex = Math.min(
    BURGER_LAYERS.length - 1,
    Math.max(0, Math.floor(((scrollProgress - 0.14) / 0.60) * BURGER_LAYERS.length))
  );
  const focusedLayer = BURGER_LAYERS[activeLayerIndex];

  const handleScrubClick = (ratio) => {
    const st = ScrollTrigger.getById('hero-burger-st') || ScrollTrigger.getAll()[0];
    if (st) {
      const scrollPos = st.start + ratio * (st.end - st.start);
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  };

  const handleWhatsAppQuickOrder = () => {
    const text = encodeURIComponent(
      `🍔 *ORDER INQUIRY — MEKO DOUBLE SMASH*\n\nHi Meko Deli! I would like to order:\n• 1x Double Smashed Cheeseburger w/ Fries ($7.99)\n\nPlease let me know the preparation time!`
    );
    window.open(`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  // Visibility toggles
  const isIntroCardVisible = isMobile
    ? scrollProgress < 0.03
    : scrollProgress < 0.12 || scrollProgress > 0.88;

  // Annotations active between 13% and 76% scroll
  const areAnnotationsActive = scrollProgress >= 0.13 && scrollProgress <= 0.76;
  const annotationsOpacity = areAnnotationsActive ? Math.min(1, Math.max(0, (scrollProgress - 0.13) / 0.05)) : 0;

  return (
    <section
      id="hero-burger"
      ref={containerRef}
      className="story-pinned-section"
      style={{ position: 'relative', width: '100%', maxWidth: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      {/* Rich Atmospheric Mobile & Desktop Glow */}
      <div className="mobile-atmospheric-glow" />
      <div className="ambient-glow glow-emerald" style={{ top: '8%', left: '12%', width: 'min(500px, 80vw)', height: 'min(500px, 80vw)' }} />
      <div className="ambient-glow glow-gold" style={{ bottom: '12%', right: '12%', width: 'min(450px, 75vw)', height: 'min(450px, 75vw)' }} />

      {/* Main Food Canvas */}
      <div className="canvas-story-container">
        <canvas ref={canvasRef} className="food-story-canvas" />
      </div>

      {/* Cinematic HUD Overlay */}
      <HudOverlay
        progress={scrollProgress}
        currentFrame={currentFrame}
        totalFrames={TOTAL_FRAMES}
        stageTitle="STAGE 01 // MEKO DELI DOUBLE SMASH"
        statusText={statusText}
        onScrubClick={handleScrubClick}
      />

      {/* Left Lateral Story Telemetry Panel */}
      <div
        className="hud-side-panel hud-left-panel"
        style={{
          opacity: isIntroCardVisible ? 1 : 0,
          pointerEvents: isIntroCardVisible ? 'auto' : 'none',
          visibility: isIntroCardVisible ? 'visible' : 'hidden',
          transition: 'opacity 0.3s ease, visibility 0.3s ease',
        }}
      >
        <p className="hud-tagline">SMASHED TO ORDER // UTICA, NY</p>
        <h1 className="hud-title">
          THE MEKO <span>DOUBLE</span> SMASH
        </h1>
        <p className="hud-desc">
          Two fresh 100% beef patties smashed thin at 500°F onto our seasoned flat-top griddle.
          Seared craggy crust, layered American & sharp cheddar melt, house deli sauce.
        </p>
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.65rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onOpenOrderModal({ name: 'Double Smashed Cheeseburger w/ Fries', price: 7.99 })}
            className="btn-gold"
            style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}
          >
            Order — $7.99
          </button>
          <button
            onClick={handleWhatsAppQuickOrder}
            className="btn-whatsapp"
            style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}
          >
            <MessageSquare size={14} />
            WhatsApp
          </button>
        </div>
      </div>

      {/* Right Lateral Specs Table (Desktop >= 1100px only) */}
      {isDesktop && (
        <div
          className="hud-side-panel hud-right-panel"
          style={{
            opacity: scrollProgress < 0.12 ? 1 : scrollProgress > 0.88 ? 1 : 0,
            pointerEvents: scrollProgress < 0.12 || scrollProgress > 0.88 ? 'auto' : 'none',
            visibility: scrollProgress < 0.12 || scrollProgress > 0.88 ? 'visible' : 'hidden',
            transition: 'opacity 0.3s ease, visibility 0.3s ease',
          }}
        >
          <p className="hud-tagline">CRAFT METRICS</p>
          <table className="hud-data-table">
            <tbody>
              <tr>
                <td>FLAT-TOP TEMP</td>
                <td>260°C / 500°F</td>
              </tr>
              <tr>
                <td>BEEF BLEND</td>
                <td>FRESH CHUCK 80/20</td>
              </tr>
              <tr>
                <td>PATTIES</td>
                <td>DOUBLE SMASH</td>
              </tr>
              <tr>
                <td>CHEESE</td>
                <td>MELTED AMERICAN & CHEDDAR</td>
              </tr>
              <tr>
                <td>BUN</td>
                <td>TOASTED BRIOCHE</td>
              </tr>
              <tr>
                <td>SERVED WITH</td>
                <td>CRINKLE CUT FRIES</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* ============================================================ */}
      {/* INTERACTIVE INGREDIENT NAMES ON THE SCROLL ANIMATION         */}
      {/* Pointer lines, focal dots, and live ingredient name badges   */}
      {/* ============================================================ */}
      {areAnnotationsActive && cssLayout.nw > 0 && (
        <div
          className="ingredient-annotations-overlay"
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 22,
            opacity: annotationsOpacity,
            transition: 'opacity 0.35s ease',
          }}
        >
          {/* SVG Connector Lines */}
          <svg
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
            }}
          >
            {BURGER_LAYERS.map((layer, idx) => {
              const isLeft = layer.side === 'left';
              const yPin = cssLayout.cy + cssLayout.nh * layer.yRatio;
              const xPin = isLeft
                ? cssLayout.burgerCenterX - cssLayout.burgerHalfWidth * 0.65
                : cssLayout.burgerCenterX + cssLayout.burgerHalfWidth * 0.65;

              // Tag connector target coordinate
              const xTag = isLeft
                ? isMobile ? 125 : Math.max(25, cssLayout.burgerCenterX - cssLayout.burgerHalfWidth - 140)
                : isMobile ? viewport.width - 125 : Math.min(viewport.width - 25, cssLayout.burgerCenterX + cssLayout.burgerHalfWidth + 140);

              const isFocus = idx === activeLayerIndex;

              return (
                <g key={`line-${layer.id}`}>
                  {/* Dotted connector leader line */}
                  <line
                    x1={xTag}
                    y1={yPin}
                    x2={xPin}
                    y2={yPin}
                    stroke={isFocus ? 'var(--gold-light)' : 'rgba(255, 255, 255, 0.30)'}
                    strokeWidth={isFocus ? 1.5 : 1}
                    strokeDasharray={isFocus ? 'none' : '3 3'}
                  />
                  {/* Glowing Pin Dot directly on the ingredient slice */}
                  <circle
                    cx={xPin}
                    cy={yPin}
                    r={isFocus ? 5 : 3.5}
                    fill={isFocus ? 'var(--gold-light)' : 'var(--green-light)'}
                    filter="drop-shadow(0 0 6px var(--gold-glow))"
                  />
                  {/* Outer pulse halo */}
                  {isFocus && (
                    <circle
                      cx={xPin}
                      cy={yPin}
                      r={9}
                      fill="none"
                      stroke="var(--gold-light)"
                      strokeWidth={1.5}
                      opacity={0.8}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* HTML Ingredient Name Badges */}
          {BURGER_LAYERS.map((layer, idx) => {
            const isLeft = layer.side === 'left';
            const yPin = cssLayout.cy + cssLayout.nh * layer.yRatio;
            const isFocus = idx === activeLayerIndex;

            const tagStyle = isLeft
              ? {
                  position: 'absolute',
                  top: `${yPin}px`,
                  left: isMobile ? '8px' : `${Math.max(20, cssLayout.burgerCenterX - cssLayout.burgerHalfWidth - 260)}px`,
                  transform: 'translateY(-50%)',
                }
              : {
                  position: 'absolute',
                  top: `${yPin}px`,
                  right: isMobile ? '8px' : `${Math.max(20, viewport.width - (cssLayout.burgerCenterX + cssLayout.burgerHalfWidth + 260))}px`,
                  transform: 'translateY(-50%)',
                };

            return (
              <div
                key={`badge-${layer.id}`}
                className={`ingredient-live-badge ${isFocus ? 'active-focus' : ''}`}
                style={{
                  ...tagStyle,
                  pointerEvents: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: isMobile ? '0.35rem' : '0.55rem',
                  background: isFocus
                    ? 'rgba(20, 42, 28, 0.95)'
                    : 'rgba(8, 16, 11, 0.90)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: isFocus
                    ? '1px solid var(--gold-light)'
                    : '1px solid rgba(255, 255, 255, 0.16)',
                  borderRadius: '6px',
                  padding: isMobile ? '0.22rem 0.48rem' : '0.45rem 0.85rem',
                  boxShadow: isFocus
                    ? '0 6px 25px rgba(245, 158, 11, 0.35)'
                    : '0 4px 15px rgba(0, 0, 0, 0.55)',
                  transition: 'all 0.25s ease',
                  cursor: 'pointer',
                  maxWidth: isMobile ? '135px' : '280px',
                }}
                onClick={() => onOpenOrderModal({ name: `Double Smash w/ ${layer.name}`, price: 7.99 })}
              >
                {/* Index Pill */}
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: isMobile ? '0.62rem' : '0.72rem',
                    fontWeight: 700,
                    color: isFocus ? 'var(--gold-bright)' : 'var(--green-light)',
                    background: isFocus ? 'rgba(245, 158, 11, 0.2)' : 'rgba(16, 185, 129, 0.15)',
                    padding: '0.1rem 0.35rem',
                    borderRadius: '3px',
                    flexShrink: 0,
                  }}
                >
                  0{idx + 1}
                </span>

                {/* Name & Metric */}
                <div style={{ overflow: 'hidden' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: isMobile ? '0.68rem' : '0.96rem',
                      fontWeight: 700,
                      color: isFocus ? '#ffffff' : 'rgba(255, 255, 255, 0.95)',
                      letterSpacing: '0.02em',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: 'block',
                      lineHeight: 1.15,
                    }}
                  >
                    {isMobile ? layer.shortName : layer.name}
                  </span>

                  {/* Desktop Metric Subtext */}
                  {!isMobile && (
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        color: isFocus ? 'var(--gold-light)' : 'var(--text-secondary)',
                        display: 'block',
                        marginTop: '0.1rem',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {layer.temp}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Initial Scroll Prompt (Mobile Swipe Gesture Hint vs Desktop Mouse) */}
      <div
        className="scroll-prompt-indicator"
        style={{ opacity: scrollProgress < 0.05 ? 1 : 0 }}
      >
        {isMobile ? (
          <div className="animate-swipe-hint" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ChevronUp size={22} color="var(--green-bright)" />
            <span>SWIPE UP TO UNPACK</span>
          </div>
        ) : (
          <>
            <div className="scroll-prompt-mouse">
              <div className="scroll-prompt-wheel" />
            </div>
            <span>SCROLL TO UNPACK</span>
          </>
        )}
      </div>

      {/* Bottom Floating Active Layer Inspector Card (Mobile & Tablet) */}
      {!isDesktop && scrollProgress > 0.15 && scrollProgress < 0.70 && focusedLayer && (
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '4.8rem' : '6rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(8, 18, 12, 0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--border-gold)',
            borderRadius: '10px',
            padding: isMobile ? '0.5rem 0.85rem' : '0.85rem 1.5rem',
            width: 'min(92vw, 390px)',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.9), 0 0 20px var(--gold-glow)',
            zIndex: 25,
            textAlign: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.15rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--gold-light)' }}>
              LAYER 0{activeLayerIndex + 1} / 07 • {focusedLayer.tag}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--green-light)' }}>
              {focusedLayer.temp}
            </span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '1.05rem' : '1.35rem', color: '#ffffff', margin: '0.1rem 0' }}>
            {focusedLayer.name}
          </h4>
          <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.3 }}>
            {focusedLayer.specs}
          </p>
        </div>
      )}

      {/* Final Reassembled Lock Badge (At scroll >= 85%) */}
      {scrollProgress >= 0.85 && (
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '4.8rem' : '6rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10, 26, 17, 0.96)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--green-bright)',
            padding: 'clamp(0.5rem, 2vw, 0.85rem) clamp(0.85rem, 3vw, 1.75rem)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.5rem, 2vw, 1rem)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8), 0 0 25px var(--green-glow)',
            zIndex: 30,
            width: 'min(92vw, 480px)',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <CheckCircle2 color="var(--green-bright)" size={20} style={{ flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--green-light)', margin: 0 }}>
                ASSEMBLY LOCKED
              </p>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(0.95rem, 2.5vw, 1.25rem)', color: '#ffffff', margin: 0 }}>
                ONE PERFECT BURGER
              </h4>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.35rem', flexShrink: 0 }}>
            <button
              onClick={handleWhatsAppQuickOrder}
              className="btn-whatsapp"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
              title="Order on WhatsApp"
            >
              <MessageSquare size={13} />
              WhatsApp
            </button>
            <button
              onClick={() => onOpenOrderModal({ name: 'Double Smashed Cheeseburger w/ Fries', price: 7.99 })}
              className="btn-gold"
              style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem' }}
            >
              Order
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
