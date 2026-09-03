import React from 'react';
import { Phone, MapPin, Clock, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div style={{ maxWidth: '360px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  background: 'linear-gradient(135deg, #15803d, #22c55e)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2rem',
                }}
              >
                🍔
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#ffffff' }}>
                MEKO DELI & GROCERY
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Utica’s home for flat-top smashed double burgers, legendary chopped cheese heros, authentic Boar's Head cold cuts,
              and daily groceries. Handcrafted with pride.
            </p>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <span className="hud-pill" style={{ color: 'var(--green-light)' }}>
                Fresh Daily
              </span>
              <span className="hud-pill" style={{ color: 'var(--gold-light)' }}>
                Utica, NY
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#ffffff', marginBottom: '1.25rem' }}>
              EXPLORE
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li><a href="#hero-burger" style={{ transition: 'color 0.2s' }}>01. Smashed Double Burger</a></li>
              <li><a href="#sandwich-story" style={{ transition: 'color 0.2s' }}>02. The Chopped Cheese Hero</a></li>
              <li><a href="#specials" style={{ transition: 'color 0.2s' }}>03. Daily & Weekly Specials</a></li>
              <li><a href="#menu-explorer" style={{ transition: 'color 0.2s' }}>04. Full Deli Menu</a></li>
              <li><a href="#about" style={{ transition: 'color 0.2s' }}>05. The Sunset Ave Story</a></li>
              <li><a href="#contact" style={{ transition: 'color 0.2s' }}>06. Location & Hours</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', color: '#ffffff', marginBottom: '1.25rem' }}>
              CONTACT & VISIT
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <MapPin size={16} color="var(--gold-light)" />
                <span>1510 Sunset Ave, Utica, NY 13502</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="var(--green-light)" />
                <a href="tel:3158643000" style={{ color: 'var(--green-bright)' }}>(315) 864-3000</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Phone size={16} color="var(--green-light)" />
                <a href="tel:3158643269" style={{ color: 'var(--green-bright)' }}>(315) 864-3269</a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Clock size={16} color="var(--text-muted)" />
                <span>Open 7 Days: 7:00 AM – 11:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p style={{ margin: 0 }}>
            All content &copy; {new Date().getFullYear()} Meko Deli & Grocery Inc. All Rights Reserved.
          </p>
          <button
            onClick={scrollToTop}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              color: 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            BACK TO TOP
            <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
}
