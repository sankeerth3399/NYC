import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HudOverlay from './HudOverlay';
import { BURGER_LAYERS } from '../data/ingredientsData';
import { Sparkles, CheckCircle2, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 120;

export default function HeroStoryBurger({ onOpenOrderModal }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeCallouts, setActiveCallouts] = useState([]);

  // Preload frames for smooth 60fps scrubbing
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

  // Draw frame on canvas with aspect cover
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

      const scale = Math.max(cw / iw, ch / ih);
      const nw = iw * scale;
      const nh = ih * scale;
      const cx = (cw - nw) / 2;
      const cy = (ch - nh) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, cx, cy, nw, nh);
    }
  };

  // GSAP ScrollTrigger timeline
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      renderFrame(currentFrame - 1);
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    const frameObject = { frame: 0 };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=280%',
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const prog = self.progress;
          setScrollProgress(prog);

          // Calculate frame index (0 to 119)
          const targetFrame = Math.round(prog * (TOTAL_FRAMES - 1));
          frameObject.frame = targetFrame;
          setCurrentFrame(targetFrame + 1);
          renderFrame(targetFrame);

          // Layer callouts active between 18% and 65% scroll (Exploded Phase)
          if (prog > 0.18 && prog < 0.65) {
            setActiveCallouts(BURGER_LAYERS);
          } else {
            setActiveCallouts([]);
          }
        },
      });
    }, containerRef);

    // Initial draw
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

  const handleScrubClick = (ratio) => {
    const st = ScrollTrigger.getById('hero-burger-st') || ScrollTrigger.getAll()[0];
    if (st) {
      const scrollPos = st.start + ratio * (st.end - st.start);
      window.scrollTo({ top: scrollPos, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero-burger"
      ref={containerRef}
      className="story-pinned-section"
      style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      {/* Background Ambient Glows */}
      <div className="ambient-glow glow-emerald" style={{ top: '10%', left: '15%', width: '500px', height: '500px' }} />
      <div className="ambient-glow glow-gold" style={{ bottom: '15%', right: '15%', width: '450px', height: '450px' }} />

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

      {/* Left Lateral Story Telemetry Panel (Fades out when exploded to avoid clutter) */}
      <div
        className="hud-side-panel hud-left-panel"
        style={{
          opacity: scrollProgress < 0.12 ? 1 : scrollProgress > 0.88 ? 1 : 0.08,
          pointerEvents: scrollProgress < 0.15 || scrollProgress > 0.85 ? 'auto' : 'none',
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
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
          <button onClick={onOpenOrderModal} className="btn-gold" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}>
            Order This Burger — $7.99
          </button>
        </div>
      </div>

      {/* Right Lateral Specs Table (Initial state) */}
      <div
        className="hud-side-panel hud-right-panel"
        style={{
          opacity: scrollProgress < 0.15 ? 1 : scrollProgress > 0.85 ? 1 : 0.08,
          pointerEvents: scrollProgress < 0.15 || scrollProgress > 0.85 ? 'auto' : 'none',
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

      {/* Floating Ingredient Callouts (During Physical Exploded Separation) */}
      <div className="ingredient-callout-container">
        {BURGER_LAYERS.map((layer, idx) => {
          const isLeft = layer.side === 'left';
          // Calculate positions spaced vertically around the center
          const topPercent = 22 + idx * 9;
          const leftPercent = isLeft ? 12 : 68;

          return (
            <div
              key={layer.id}
              className={`ingredient-callout ${activeCallouts.length > 0 ? 'active' : ''}`}
              style={{
                top: `${topPercent}%`,
                left: `${leftPercent}%`,
                transitionDelay: `${idx * 0.04}s`,
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

      {/* Final Reassembled Lock Badge (At scroll > 90%) */}
      {scrollProgress >= 0.9 && (
        <div
          style={{
            position: 'absolute',
            bottom: '6.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10, 26, 17, 0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--green-bright)',
            padding: '0.85rem 1.75rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8), 0 0 20px var(--green-glow)',
            zIndex: 30,
            animation: 'fadeInUp 0.4s ease forwards',
          }}
        >
          <CheckCircle2 color="var(--green-bright)" size={24} />
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--green-light)', margin: 0 }}>
              ASSEMBLY COMPLETE
            </p>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', margin: 0 }}>
              ONE PERFECT SMASHED BURGER
            </h4>
          </div>
          <button
            onClick={onOpenOrderModal}
            className="btn-gold"
            style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', marginLeft: '0.5rem' }}
          >
            Order Now
          </button>
        </div>
      )}
    </section>
  );
}
