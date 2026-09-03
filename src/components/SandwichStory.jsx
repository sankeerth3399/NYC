import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SANDWICH_LAYERS } from '../data/ingredientsData';
import { Sparkles, CheckCircle2, Flame } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function SandwichStory({ onOpenOrderModal }) {
  const sectionRef = useRef(null);
  const stackWrapperRef = useRef(null);
  const layersRef = useRef([]);
  const assembledImgRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [calloutsActive, setCalloutsActive] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=260%',
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const prog = self.progress;
            setScrollProgress(prog);
            setCalloutsActive(prog > 0.2 && prog < 0.7);
          },
        },
      });

      // Phase 1 (0 to 0.45): Explode apart
      // Phase 2 (0.45 to 0.65): Hover separated with parallax
      // Phase 3 (0.65 to 1.0): Reassemble smoothly

      // Assembled sandwich fades out as exploded layers separate
      tl.to(assembledImgRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.inOut',
      }, 0);

      // Separate each individual layer with 3D depth and offsets
      layersRef.current.forEach((el, idx) => {
        if (!el) return;
        const layerData = SANDWICH_LAYERS[idx];
        const yTarget = layerData.yOffset;
        const rot = layerData.rotate;

        // Step 1: Explode outwards
        tl.to(el, {
          y: yTarget,
          rotateX: idx < 3 ? 16 : idx > 3 ? -16 : 0,
          rotateZ: rot,
          scale: 1 + Math.abs(idx - 3) * 0.02,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        }, 0.05);

        // Step 2: Hover hold
        tl.to(el, {
          y: yTarget + (idx % 2 === 0 ? 8 : -8),
          duration: 0.2,
          ease: 'sine.inOut',
        }, 0.55);

        // Step 3: Reassemble into single sandwich
        tl.to(el, {
          y: 0,
          rotateX: 0,
          rotateZ: 0,
          scale: 1,
          opacity: idx === 0 || idx === 6 ? 0.3 : 0, // gently fade as assembled image takes over
          duration: 0.35,
          ease: 'power2.inOut',
        }, 0.75);
      });

      // Assembled sandwich fades back in to complete the reassembly
      tl.to(assembledImgRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      }, 0.75);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  let statusText = 'SCROLL TO EXPLODE DELI HERO';
  if (scrollProgress > 0.2 && scrollProgress < 0.7) {
    statusText = '7 ARTISAN LAYERS FLOATING // DEEP SPECS';
  } else if (scrollProgress >= 0.7 && scrollProgress < 0.92) {
    statusText = 'REASSEMBLING // DELI HERO LOCKING';
  } else if (scrollProgress >= 0.92) {
    statusText = 'REASSEMBLED // READY FOR THE GRILL';
  }

  return (
    <section
      id="sandwich-story"
      ref={sectionRef}
      className="story-pinned-section"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse at center, #092114 0%, #060b08 75%)',
      }}
    >
      {/* Ambient background glows */}
      <div className="ambient-glow glow-gold" style={{ top: '20%', right: '20%', width: '450px', height: '450px' }} />
      <div className="ambient-glow glow-emerald" style={{ bottom: '10%', left: '15%', width: '550px', height: '550px' }} />

      {/* Top HUD Telemetry */}
      <div
        style={{
          position: 'absolute',
          top: '5.5rem',
          left: '2rem',
          right: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'none',
          zIndex: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--gold-light)',
              background: 'rgba(245, 158, 11, 0.15)',
              padding: '0.25rem 0.65rem',
              borderRadius: '4px',
              border: '1px solid var(--border-gold)',
            }}
          >
            <Flame size={14} />
            HOT DELI HERO CRAFT
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
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
            fontSize: '0.75rem',
            color: 'var(--green-bright)',
            background: 'rgba(6, 11, 8, 0.6)',
            padding: '0.25rem 0.65rem',
            borderRadius: '4px',
            border: '1px solid var(--border-subtle)',
          }}
        >
          {statusText}
        </div>
      </div>

      {/* Left Text Intro (Initial and Reassembled State) */}
      <div
        className="hud-side-panel hud-left-panel"
        style={{
          opacity: scrollProgress < 0.15 ? 1 : scrollProgress > 0.85 ? 1 : 0.08,
          pointerEvents: scrollProgress < 0.15 || scrollProgress > 0.85 ? 'auto' : 'none',
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
        <button
          onClick={onOpenOrderModal}
          className="btn-gold"
          style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
        >
          Order This Hero — $7.49
        </button>
      </div>

      {/* Center 3D Sandwich Composition Stage */}
      <div className="sandwich-stage" style={{ pointerEvents: 'none', zIndex: 10 }}>
        <div ref={stackWrapperRef} className="sandwich-stack-wrapper">
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
                maxWidth: '90%',
                maxHeight: '85%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(245, 158, 11, 0.25)',
              }}
            />
          </div>

          {/* Exploded Individual Layers (Separates upon scroll) */}
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
                style={{
                  position: 'relative',
                  width: '85%',
                  height: '60px',
                  borderRadius: '12px',
                  background:
                    idx === 0
                      ? 'linear-gradient(180deg, #d97706, #b45309)' // Top bun crust
                      : idx === 1
                      ? 'linear-gradient(180deg, #f59e0b, #eab308)' // Mustard / Aioli
                      : idx === 2
                      ? 'linear-gradient(180deg, #fef08a, #fde047)' // Melted Swiss/Provolone
                      : idx === 3
                      ? 'linear-gradient(180deg, #7f1d1d, #450a0a)' // Pastrami & Steak
                      : idx === 4
                      ? 'linear-gradient(180deg, #65a30d, #4d7c0f)' // Pickles & Onions
                      : idx === 5
                      ? 'linear-gradient(180deg, #16a34a, #15803d)' // Shredded Lettuce
                      : 'linear-gradient(180deg, #92400e, #78350f)', // Bottom Bread
                  boxShadow: '0 12px 25px rgba(0, 0, 0, 0.8), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 1.5rem',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      background: 'rgba(0, 0, 0, 0.4)',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '3px',
                    }}
                  >
                    0{idx + 1}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      textShadow: '0 2px 4px rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    {layer.name}
                  </span>
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'rgba(255, 255, 255, 0.9)',
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                  }}
                >
                  {layer.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Callouts for Sandwich Layers (Active during exploded scroll) */}
      <div className="ingredient-callout-container">
        {SANDWICH_LAYERS.map((layer, idx) => {
          const isLeft = layer.side === 'left';
          const topPercent = 20 + idx * 10;
          const leftPercent = isLeft ? 10 : 70;

          return (
            <div
              key={layer.id}
              className={`ingredient-callout ${calloutsActive ? 'active' : ''}`}
              style={{
                top: `${topPercent}%`,
                left: `${leftPercent}%`,
                transitionDelay: `${idx * 0.05}s`,
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

      {/* Reassembled Locked Toast Badge */}
      {scrollProgress >= 0.9 && (
        <div
          style={{
            position: 'absolute',
            bottom: '4rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(10, 26, 17, 0.95)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid var(--gold-light)',
            padding: '0.85rem 1.75rem',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8), 0 0 25px var(--gold-glow)',
            zIndex: 30,
            animation: 'fadeInUp 0.4s ease forwards',
          }}
        >
          <CheckCircle2 color="var(--gold-light)" size={24} />
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--gold-light)', margin: 0 }}>
              REASSEMBLY LOCKED
            </p>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', margin: 0 }}>
              THE PERFECT UTICA CHOPPED CHEESE HERO
            </h4>
          </div>
          <button
            onClick={onOpenOrderModal}
            className="btn-primary"
            style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', marginLeft: '0.5rem' }}
          >
            Order Hero
          </button>
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
    </section>
  );
}
