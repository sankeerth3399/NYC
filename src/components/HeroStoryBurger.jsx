import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HudOverlay from './HudOverlay';
import { BURGER_LAYERS } from '../data/ingredientsData';
import { Sparkles, CheckCircle2, ChevronDown, MessageSquare } from 'lucide-react';

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
  const [activeCallouts, setActiveCallouts] = useState([]);
  const [viewportWidth, setViewportWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Responsive viewport listener
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

  // Adaptive Canvas Rendering for Perfect Fit on ANY Screen
  const renderFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const frameIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(index)));
    const img = imagesRef.current[frameIdx];

    if (img && img.complete && img.naturalWidth > 0) {
      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const isPortrait = ch > cw;
      let scale;

      if (isPortrait) {
        // Mobile & iPad Portrait: Scale so food is fully visible without clipping top/bottom buns
        scale = Math.min((cw * 1.55) / iw, (ch * 0.80) / ih);
      } else {
        // Laptops & Desktops: Scale so it fits comfortably between header & footer HUD
        scale = Math.min((cw * 1.12) / iw, (ch * 0.84) / ih);
      }

      const nw = iw * scale;
      const nh = ih * scale;
      const cx = (cw - nw) / 2;
      // Slight upward offset on portrait to avoid bottom scrub bar
      const cy = isPortrait ? (ch - nh) / 2 - 20 : (ch - nh) / 2;

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

          if (prog > 0.18 && prog < 0.65) {
            setActiveCallouts(BURGER_LAYERS);
          } else {
            setActiveCallouts([]);
          }
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
  }, []);

  // Determine stage status text
  let statusText = 'SCROLL TO UNPACK EVERY LAYER';
  if (scrollProgress > 0.18 && scrollProgress < 0.65) {
    statusText = 'PHYSICAL SEPARATION // 7 LAYERS ISOLATED';
  } else if (scrollProgress >= 0.65 && scrollProgress < 0.92) {
    statusText = 'REASSEMBLING IN SEQUENCE // DOCKING';
  } else if (scrollProgress >= 0.92) {
    statusText = 'PERFECTLY ASSEMBLED // READY TO SERVE';
  }

  // Active layer calculation for mobile & tablet focused view
  const activeLayerIndex = Math.min(
    BURGER_LAYERS.length - 1,
    Math.max(0, Math.floor(((scrollProgress - 0.18) / 0.47) * BURGER_LAYERS.length))
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

  return (
    <section
      id="hero-burger"
      ref={containerRef}
      className="story-pinned-section"
      style={{ position: 'relative', width: '100%', maxWidth: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      {/* Ambient background glows */}
      <div className="ambient-glow glow-emerald" style={{ top: '10%', left: '15%', width: 'min(500px, 80vw)', height: 'min(500px, 80vw)' }} />
      <div className="ambient-glow glow-gold" style={{ bottom: '15%', right: '15%', width: 'min(450px, 75vw)', height: 'min(450px, 75vw)' }} />

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

      {/* Left Lateral Story Telemetry Panel (Desktop & Laptop) */}
      <div
        className="hud-side-panel hud-left-panel"
        style={{
          opacity: scrollProgress < 0.12 ? 1 : scrollProgress > 0.88 ? 1 : 0,
          pointerEvents: scrollProgress < 0.14 || scrollProgress > 0.86 ? 'auto' : 'none',
          visibility: scrollProgress >= 0.14 && scrollProgress <= 0.86 ? 'hidden' : 'visible',
          transition: 'opacity 0.4s ease, visibility 0.4s ease',
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
        <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => onOpenOrderModal({ name: 'Double Smashed Cheeseburger w/ Fries', price: 7.99 })}
            className="btn-gold"
            style={{ padding: '0.6rem 1.15rem', fontSize: '0.85rem' }}
          >
            Order — $7.99
          </button>
          <button
            onClick={handleWhatsAppQuickOrder}
            className="btn-whatsapp"
            style={{ padding: '0.6rem 1.15rem', fontSize: '0.85rem' }}
          >
            <MessageSquare size={15} />
            WhatsApp
          </button>
        </div>
      </div>

      {/* Right Lateral Specs Table (Desktop >= 1200px only) */}
      {isDesktop && (
        <div
          className="hud-side-panel hud-right-panel"
          style={{
            opacity: scrollProgress < 0.14 ? 1 : scrollProgress > 0.86 ? 1 : 0,
            pointerEvents: scrollProgress < 0.14 || scrollProgress > 0.86 ? 'auto' : 'none',
            visibility: scrollProgress >= 0.14 && scrollProgress <= 0.86 ? 'hidden' : 'visible',
            transition: 'opacity 0.4s ease, visibility 0.4s ease',
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

      {/* Ingredient Callouts */}
      {/* 1. Large Desktops (>= 1100px): Lateral floating callouts */}
      {isDesktop && (
        <div className="ingredient-callout-container">
          {BURGER_LAYERS.map((layer, idx) => {
            const isLeft = layer.side === 'left';
            const topPercent = 18 + idx * 10;
            const leftPercent = isLeft ? 8 : 72;

            return (
              <div
                key={layer.id}
                className={`ingredient-callout ${activeCallouts.length > 0 ? 'active' : ''}`}
                style={{
                  top: `${topPercent}%`,
                  left: `${leftPercent}%`,
                  transitionDelay: `${idx * 0.03}s`,
                }}
              >
                <span className="callout-tag">{layer.tag}</span>
                <h3 className="callout-name">{layer.name}</h3>
                <p className="callout-specs">{layer.specs}</p>
                <span className="callout-temp">{layer.temp}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* 2. Tablets & Mobile (< 1100px): Clean centered active layer badge */}
      {!isDesktop && scrollProgress > 0.18 && scrollProgress < 0.65 && focusedLayer && (
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '5.5rem' : '6.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(8, 18, 12, 0.94)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--border-green)',
            borderRadius: '10px',
            padding: isMobile ? '0.65rem 1rem' : '0.85rem 1.5rem',
            width: 'min(92vw, 420px)',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.85)',
            zIndex: 25,
            textAlign: 'center',
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold-light)' }}>
              LAYER 0{activeLayerIndex + 1} / 07 • {focusedLayer.tag}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--green-light)' }}>
              {focusedLayer.temp}
            </span>
          </div>
          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: isMobile ? '1.15rem' : '1.35rem', color: '#ffffff', margin: '0.1rem 0' }}>
            {focusedLayer.name}
          </h4>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.35 }}>
            {focusedLayer.specs}
          </p>
        </div>
      )}

      {/* Initial Scroll Prompt */}
      <div
        className="scroll-prompt-indicator"
        style={{ opacity: scrollProgress < 0.08 ? 1 : 0 }}
      >
        <div className="scroll-prompt-mouse">
          <div className="scroll-prompt-wheel" />
        </div>
        <span>SCROLL TO UNPACK</span>
      </div>

      {/* Final Reassembled Lock Badge */}
      {scrollProgress >= 0.9 && (
        <div
          style={{
            position: 'absolute',
            bottom: isMobile ? '5.5rem' : '6.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10, 26, 17, 0.96)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--green-bright)',
            padding: 'clamp(0.6rem, 2vw, 0.85rem) clamp(1rem, 3vw, 1.75rem)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(0.6rem, 2vw, 1rem)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8), 0 0 25px var(--green-glow)',
            zIndex: 30,
            width: 'min(92vw, 500px)',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <CheckCircle2 color="var(--green-bright)" size={22} style={{ flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--green-light)', margin: 0 }}>
                ASSEMBLY LOCKED
              </p>
              <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1rem, 2.5vw, 1.25rem)', color: '#ffffff', margin: 0 }}>
                ONE PERFECT BURGER
              </h4>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
            <button
              onClick={handleWhatsAppQuickOrder}
              className="btn-whatsapp"
              style={{ padding: '0.45rem 0.8rem', fontSize: '0.78rem' }}
              title="Order on WhatsApp"
            >
              <MessageSquare size={14} />
              WhatsApp
            </button>
            <button
              onClick={() => onOpenOrderModal({ name: 'Double Smashed Cheeseburger w/ Fries', price: 7.99 })}
              className="btn-gold"
              style={{ padding: '0.45rem 0.8rem', fontSize: '0.78rem' }}
            >
              Order
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
