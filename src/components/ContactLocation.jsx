import React, { useMemo } from 'react';
import { MapPin, Phone, Clock, Navigation, CheckCircle, MessageSquare } from 'lucide-react';

const OWNER_WHATSAPP_NUMBER = '13158643000';

export default function ContactLocation() {
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
            Hot food ready in minutes. Order ahead via WhatsApp or phone, or stop by for groceries and fresh grill specials.
          </p>
        </div>

        <div className="contact-card-grid">
          {/* Left Info Pane */}
          <div className="contact-info-pane">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: isOpenNow ? 'var(--green-bright)' : 'var(--gold-light)',
                    background: isOpenNow ? 'rgba(34, 197, 94, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                    padding: '0.3rem 0.7rem',
                    borderRadius: '4px',
                    border: isOpenNow ? '1px solid var(--border-green)' : '1px solid var(--border-gold)',
                  }}
                >
                  <span
                    style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      backgroundColor: isOpenNow ? 'var(--green-bright)' : 'var(--gold-light)',
                    }}
                  />
                  {isOpenNow ? 'OPEN NOW // TAKING ORDERS' : 'OPENS AT 7:00 AM'}
                </span>
              </div>

              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: '#ffffff', marginBottom: '0.4rem' }}>
                1510 SUNSET AVE
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
                Utica, NY 13502 (Cornhill Neighborhood)
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <Clock color="var(--gold-light)" size={18} style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.9rem' }}>STORE HOURS</strong>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                      Monday – Sunday: 7:00 AM – 11:00 PM
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <MessageSquare color="var(--whatsapp-green)" size={18} style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.9rem' }}>WHATSAPP DIRECT TO OWNER</strong>
                    <a
                      href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Hi%20Meko%20Deli!%20I'd%20like%20to%20place%20an%20order.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--whatsapp-green)', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.88rem' }}
                    >
                      +1 (315) 864-3000 (Click to Chat)
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
                  <Phone color="var(--green-light)" size={18} style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                  <div>
                    <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.9rem' }}>PHONE CALL ORDERS</strong>
                    <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.2rem', flexWrap: 'wrap' }}>
                      <a
                        href="tel:3158643000"
                        style={{ color: 'var(--green-bright)', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.88rem' }}
                      >
                        (315) 864-3000
                      </a>
                      <span style={{ color: 'var(--text-muted)' }}>•</span>
                      <a
                        href="tel:3158643269"
                        style={{ color: 'var(--green-bright)', fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.88rem' }}
                      >
                        (315) 864-3269
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' }}>
              <a
                href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Hi%20Meko%20Deli!%20I'd%20like%20to%20order.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
                style={{ padding: '0.7rem 1.25rem', fontSize: '0.88rem' }}
              >
                <MessageSquare size={16} />
                WhatsApp Order
              </a>
              <a
                href="tel:3158643000"
                className="btn-primary"
                style={{ padding: '0.7rem 1.25rem', fontSize: '0.88rem' }}
              >
                <Phone size={16} />
                Call Directly
              </a>
              <a
                href="https://maps.google.com/?q=1510+Sunset+Ave,+Utica,+NY+13502"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
                style={{ padding: '0.7rem 1.25rem', fontSize: '0.88rem' }}
              >
                <Navigation size={16} />
                Directions
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
