import React from 'react';
import { Award, Flame, Utensils, Heart } from 'lucide-react';

export default function AboutSection() {
  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-grid">
          {/* Left Column: Story */}
          <div>
            <span className="section-tag">THE UTICA DELI TRADITION</span>
            <h2 className="section-title">
              CRAFTED WITH PRIDE ON <span style={{ color: 'var(--gold-light)' }}>SUNSET AVE</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '1.25rem' }}>
              At Meko Deli & Grocery, we believe that real food doesn't come from a microwave or a heat lamp. It comes from
              a screaming-hot 500°F flat-top griddle, fresh butcher-cut beef, Boar’s Head premium deli provisions, and Utica bakery rolls baked every morning.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              Whether you're grabbing a morning Bacon, Egg & Cheese on a buttered roll, dropping by for Utica’s signature
              Chopped Cheese hero, or biting into our hand-smashed double cheeseburgers, you get genuine neighborhood hospitality and uncompromised flavor.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="hud-pill" style={{ color: 'var(--green-light)' }}>
                <Flame size={14} />
                500°F Griddle Sear
              </div>
              <div className="hud-pill" style={{ color: 'var(--gold-light)' }}>
                <Award size={14} />
                Boar’s Head Quality
              </div>
              <div className="hud-pill" style={{ color: '#ffffff' }}>
                <Utensils size={14} />
                Made-to-Order Always
              </div>
            </div>
          </div>

          {/* Right Column: Key Metrics & Stat Boxes */}
          <div>
            <div className="about-stats-grid">
              <div className="stat-box">
                <div className="stat-num">500°F</div>
                <div className="stat-label">FLAT-TOP HEAT</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">100%</div>
                <div className="stat-label">FRESH BEEF & BOAR’S HEAD</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">38+</div>
                <div className="stat-label">HANDCRAFTED RECIPES</div>
              </div>
              <div className="stat-box">
                <div className="stat-num">7 DAYS</div>
                <div className="stat-label">7:00 AM – 11:00 PM DAILY</div>
              </div>
            </div>

            <div
              style={{
                marginTop: '2rem',
                background: 'rgba(21, 128, 61, 0.15)',
                border: '1px solid var(--border-green)',
                borderRadius: '12px',
                padding: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--green-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Heart color="#ffffff" size={22} />
              </div>
              <div>
                <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.2rem' }}>
                  Utica Proud & Community Driven
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                  Serving Sunset Ave and the greater Utica, NY community with quick hot meals, fresh groceries, cold drinks, and friendly service every single day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
