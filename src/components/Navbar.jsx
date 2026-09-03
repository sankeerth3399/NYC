import React, { useState, useEffect } from 'react';
import { Phone, Menu as MenuIcon, X, MapPin, Clock } from 'lucide-react';

export default function Navbar({ onOpenOrderModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '01. Smashed Burger', href: '#hero-burger' },
    { label: '02. Deli Hero', href: '#sandwich-story' },
    { label: '03. Specials', href: '#specials' },
    { label: '04. Menu', href: '#menu-explorer' },
    { label: '05. About', href: '#about' },
    { label: '06. Location', href: '#contact' },
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.3s ease',
        backgroundColor: isScrolled ? 'rgba(6, 11, 8, 0.92)' : 'rgba(6, 11, 8, 0.65)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled ? '1px solid rgba(34, 197, 94, 0.2)' : '1px solid rgba(255, 255, 255, 0.08)',
        padding: isScrolled ? '0.75rem 0' : '1.1rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Brand Logo */}
        <a href="#hero-burger" style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #15803d, #22c55e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              boxShadow: '0 4px 15px rgba(34, 197, 94, 0.35)',
            }}
          >
            🍔
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.45rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: '#ffffff',
                }}
              >
                MEKO DELI & GROCERY
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--gold-light)',
                  background: 'rgba(245, 158, 11, 0.15)',
                  padding: '0.15rem 0.45rem',
                  borderRadius: '3px',
                  border: '1px solid var(--border-gold)',
                }}
              >
                UTICA, NY
              </span>
            </div>
            <p
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Sandwiches, Groceries & More
            </p>
          </div>
        </a>

        {/* Desktop Navigation Chapters */}
        <nav style={{ display: 'none' }} className="desktop-nav-menu">
          <ul style={{ display: 'flex', alignItems: 'center', gap: '1.75rem', listStyle: 'none' }}>
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    letterSpacing: '0.08em',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--green-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="tel:3158643000"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              fontWeight: 600,
              color: 'var(--green-bright)',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              padding: '0.5rem 0.95rem',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
            }}
            className="call-btn-desktop"
          >
            <Phone size={14} />
            (315) 864-3000
          </a>

          <button
            onClick={onOpenOrderModal}
            className="btn-primary"
            style={{
              padding: '0.55rem 1.15rem',
              fontSize: '0.85rem',
            }}
          >
            Order Now
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '0.5rem',
              borderRadius: '6px',
              border: '1px solid var(--border-subtle)',
            }}
            className="mobile-nav-toggle"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <MenuIcon size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: 'rgba(6, 11, 8, 0.97)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border-green)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.2rem',
                    color: '#ffffff',
                    display: 'block',
                    padding: '0.4rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
            <a
              href="tel:3158643000"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--green-bright)',
                background: 'rgba(34, 197, 94, 0.15)',
                padding: '0.75rem',
                borderRadius: '6px',
              }}
            >
              <Phone size={16} />
              Call (315) 864-3000
            </a>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
              }}
            >
              <MapPin size={15} color="var(--gold-light)" />
              1510 Sunset Ave, Utica, NY 13502
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
              }}
            >
              <Clock size={15} color="var(--green-light)" />
              Open Daily: 7:00 AM – 11:00 PM
            </div>
          </div>
        </div>
      )}

      {/* Media query styling in JSX */}
      <style>{`
        @media (min-width: 1024px) {
          .desktop-nav-menu { display: block !important; }
          .mobile-nav-toggle { display: none !important; }
        }
        @media (max-width: 640px) {
          .call-btn-desktop { display: none !important; }
        }
      `}</style>
    </header>
  );
}
