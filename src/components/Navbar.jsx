import React, { useState, useEffect } from 'react';
import { Phone, Menu as MenuIcon, X, MapPin, Clock, MessageSquare } from 'lucide-react';

const OWNER_WHATSAPP_NUMBER = '13158643000';

export default function Navbar({ onOpenOrderModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
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
        backgroundColor: isScrolled ? 'rgba(6, 11, 8, 0.94)' : 'rgba(6, 11, 8, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled ? '1px solid rgba(34, 197, 94, 0.25)' : '1px solid rgba(255, 255, 255, 0.08)',
        padding: isScrolled ? '0.65rem 0' : '0.95rem 0',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
        {/* Brand Logo */}
        <a href="#hero-burger" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #15803d, #22c55e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              boxShadow: '0 4px 15px rgba(34, 197, 94, 0.35)',
              flexShrink: 0,
            }}
          >
            🍔
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  color: '#ffffff',
                  whiteSpace: 'nowrap',
                }}
              >
                MEKO DELI & GROCERY
              </span>
              <span
                style={{
                  fontSize: '0.6rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--gold-light)',
                  background: 'rgba(245, 158, 11, 0.15)',
                  padding: '0.1rem 0.35rem',
                  borderRadius: '3px',
                  border: '1px solid var(--border-gold)',
                  display: 'none',
                }}
                className="d-sm-inline"
              >
                UTICA, NY
              </span>
            </div>
            <p
              style={{
                fontSize: '0.68rem',
                color: 'var(--text-secondary)',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                margin: 0,
                display: 'none',
              }}
              className="d-sm-block"
            >
              Sandwiches, Groceries & More
            </p>
          </div>
        </a>

        {/* Desktop Navigation Chapters */}
        <nav style={{ display: 'none' }} className="desktop-nav-menu">
          <ul style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', listStyle: 'none' }}>
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.06em',
                    color: 'var(--text-secondary)',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
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

        {/* Action CTAs: WhatsApp + Phone + Order Now */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* WhatsApp Direct Chat Button */}
          <a
            href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Hi%20Meko%20Deli!%20I'd%20like%20to%20place%20an%20order.`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 700,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #25d366, #128c7e)',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 10px rgba(37, 211, 102, 0.3)',
              whiteSpace: 'nowrap',
            }}
            title="Chat & Order via WhatsApp"
          >
            <MessageSquare size={14} />
            <span className="d-sm-inline">WhatsApp</span>
          </a>

          {/* Call CTA */}
          <a
            href="tel:3158643000"
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '0.35rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 600,
              color: 'var(--green-bright)',
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              padding: '0.45rem 0.85rem',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            className="call-btn-desktop"
          >
            <Phone size={13} />
            (315) 864-3000
          </a>

          {/* Order Now Button */}
          <button
            onClick={onOpenOrderModal}
            className="btn-primary"
            style={{
              padding: '0.45rem 0.95rem',
              fontSize: '0.8rem',
            }}
          >
            Order
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
              padding: '0.45rem',
              borderRadius: '6px',
              border: '1px solid var(--border-subtle)',
            }}
            className="mobile-nav-toggle"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
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
            backgroundColor: 'rgba(6, 11, 8, 0.98)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border-green)',
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.85rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    color: '#ffffff',
                    display: 'block',
                    padding: '0.35rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginTop: '0.5rem' }}>
            <a
              href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Hi%20Meko%20Deli!%20I'd%20like%20to%20order.`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-display)',
                color: '#ffffff',
                background: 'linear-gradient(135deg, #25d366, #128c7e)',
                padding: '0.75rem',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 700,
              }}
            >
              <MessageSquare size={18} />
              Order on WhatsApp: (315) 864-3000
            </a>

            <a
              href="tel:3158643000"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--green-bright)',
                background: 'rgba(34, 197, 94, 0.12)',
                border: '1px solid var(--border-green)',
                padding: '0.7rem',
                borderRadius: '6px',
                fontSize: '0.9rem',
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
                fontSize: '0.82rem',
                marginTop: '0.25rem',
              }}
            >
              <MapPin size={14} color="var(--gold-light)" />
              1510 Sunset Ave, Utica, NY 13502
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'var(--text-secondary)',
                fontSize: '0.82rem',
              }}
            >
              <Clock size={14} color="var(--green-light)" />
              Open Daily: 7:00 AM – 11:00 PM
            </div>
          </div>
        </div>
      )}

      {/* Media query styling in JSX */}
      <style>{`
        @media (min-width: 1080px) {
          .desktop-nav-menu { display: block !important; }
          .call-btn-desktop { display: inline-flex !important; }
          .mobile-nav-toggle { display: none !important; }
        }
        @media (min-width: 520px) {
          .d-sm-inline { display: inline-block !important; }
          .d-sm-block { display: block !important; }
        }
      `}</style>
    </header>
  );
}
