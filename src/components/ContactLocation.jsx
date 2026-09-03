import React, { useMemo } from 'react';
import { MapPin, Phone, Clock, Navigation, CheckCircle } from 'lucide-react';

export default function ContactLocation() {
  // Check if store is currently open (7 AM to 11 PM)
  const isOpenNow = useMemo(() => {
    const currentHour = new Date().getHours();
    return currentHour >= 7 && currentHour < 23;
  }, []);

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">VISIT & CALL TO ORDER</span>
          <h2 className="section-title">
            FIND US IN <span style={{ color: 'var(--green-light)' }}>UTICA, NY</span>
          </h2>
          <p className="section-subtitle">
            Hot food ready in minutes. Call ahead for quick pickup or stop in for groceries and made-to-order grill specialties.
          </p>
        </div>

        <div className="contact-card-grid">
          {/* Left Info Pane */}
          <div className="contact-info-pane">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: isOpenNow ? 'var(--green-bright)' : 'var(--gold-light)',
                    background: isOpenNow ? 'rgba(34, 197, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '4px',
                    border: isOpenNow ? '1px solid var(--border-green)' : '1px solid var(--border-gold)',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: isOpenNow ? 'var(--green-bright)' : 'var(--gold-light)',
                    }}
                  />
                  {isOpenNow ? 'OPEN NOW // TAKING ORDERS' : 'OPENS AT 7:00 AM'}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', color: '#ffffff', marginBottom: '1rem' }}>
                1510 SUNSET AVE
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem' }}>
                Utica, NY 13502
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <Clock color="var(--gold-light)" size={20} style={{ marginTop: '0.2rem' }} />
                  <div>
                    <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.95rem' }}>STORE HOURS</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
                      Monday – Sunday: 7:00 AM – 11:00 PM
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <Phone color="var(--green-light)" size={20} style={{ marginTop: '0.2rem' }} />
                  <div>
                    <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.95rem' }}>CALL-IN ORDERS</strong>
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
                      <a
                        href="tel:3158643000"
                        style={{ color: 'var(--green-bright)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}
                      >
                        (315) 864-3000
                      </a>
                      <span style={{ color: 'var(--text-muted)' }}>•</span>
                      <a
                        href="tel:3158643269"
                        style={{ color: 'var(--green-bright)', fontFamily: 'var(--font-mono)', fontWeight: 600 }}
                      >
                        (315) 864-3269
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              <a
                href="tel:3158643000"
                className="btn-primary"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
              >
                <Phone size={16} />
                Call To Order Now
              </a>
              <a
                href="https://maps.google.com/?q=1510+Sunset+Ave,+Utica,+NY+13502"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}
              >
                <Navigation size={16} />
                Get Directions
              </a>
            </div>
          </div>

          {/* Right Map Pane */}
          <div className="contact-map-pane">
            <iframe
              title="Meko Deli & Grocery Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2913.4683140605543!2d-75.25332128735577!3d43.09467217101379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d9412c82300b43%3A0x511eb16189f5fd1a!2s1510%20Sunset%20Ave%2C%20Utica%2C%20NY%2013502!5e0!3m2!1sen!2sus!4v1725992985766!5m2!1sen!2sus"
              className="map-iframe"
              loading="lazy"
              allowFullScreen=""
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
