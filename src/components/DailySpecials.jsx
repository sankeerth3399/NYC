import React from 'react';
import { Sparkles, ArrowRight, Flame, MessageSquare } from 'lucide-react';

const OWNER_WHATSAPP_NUMBER = '13158643000';

const SPECIALS_LIST = [
  {
    id: 'special-quesadilla',
    name: 'Loaded Chicken Quesadilla',
    tag: 'DAILY SPECIAL',
    price: 10.99,
    image: '/assets/specials/quesadilla.jpg',
    desc: 'Golden crispy flour tortilla packed with griddled marinated chicken, sautéed bell peppers, melted Monterey Jack & pepper jack cheese, house salsa & crema.',
  },
  {
    id: 'special-chopped-cheese',
    name: 'Utica Chopped Cheese Combo',
    tag: 'UTICA LEGEND',
    price: 8.99,
    image: '/assets/menu/cheese-pull.webp',
    desc: 'Seasoned beef chopped on the grill with sweet onions, melted yellow American cheese, shredded lettuce, plum tomato, mayo, served with fries & ice cold soda.',
  },
  {
    id: 'special-philly-steak',
    name: 'Philly Cheesesteak Hero W/ Fries',
    tag: 'TOP RATED',
    price: 7.49,
    image: '/assets/menu/prime-stack.webp',
    desc: 'Thinly shaved prime ribeye steak griddled with sweet peppers and onions, smothered in melted provolone on toasted Italian bakery hero bread.',
  },
  {
    id: 'special-bec-roll',
    name: 'The Utica B.E.C. All-Day Special',
    tag: 'BREAKFAST STAPLE',
    price: 4.49,
    image: '/assets/menu/overhead.webp',
    desc: 'Crisp smoked bacon, two farm fresh fried eggs, melted American cheese, salt, pepper, ketchup on a hot toasted buttered Utica hard roll.',
  },
];

export default function DailySpecials({ onSelectItem }) {
  const handleWhatsAppOrderSpecial = (item) => {
    const text = encodeURIComponent(
      `🔥 *SPECIAL ORDER — MEKO DELI*\n\nHi Meko Deli! I would like to order the special:\n• 1x *${item.name}* ($${item.price.toFixed(2)})\n\nPlease let me know the preparation time!`
    );
    window.open(`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <section id="specials" className="specials-section">
      {/* Background Ambience */}
      <div className="ambient-glow glow-emerald" style={{ top: '25%', left: '5%', width: 'min(500px, 80vw)', height: 'min(500px, 80vw)' }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">
            <Flame size={14} style={{ display: 'inline', marginRight: '0.4rem' }} />
            HOT FROM THE FLAT-TOP
          </span>
          <h2 className="section-title">
            DAILY & WEEKLY <span style={{ color: 'var(--gold-light)' }}>SPECIALS</span>
          </h2>
          <p className="section-subtitle">
            Every day we fire up the 500°F flat-top griddle with fresh local ingredients, artisanal breads, and genuine Utica deli tradition.
          </p>
        </div>

        {/* Specials Cards Grid */}
        <div className="specials-grid">
          {SPECIALS_LIST.map((item) => (
            <div key={item.id} className="special-card">
              <div className="special-img-wrapper">
                <img src={item.image} alt={item.name} className="special-img" loading="lazy" />
                <span className="special-badge">{item.tag}</span>
              </div>
              <div className="special-content">
                <div>
                  <h3 className="special-name">{item.name}</h3>
                  <p className="special-desc">{item.desc}</p>
                </div>
                <div className="special-footer">
                  <span className="special-price">${item.price.toFixed(2)}</span>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => handleWhatsAppOrderSpecial(item)}
                      className="btn-whatsapp"
                      style={{ padding: '0.45rem 0.75rem', fontSize: '0.78rem' }}
                      title="Order on WhatsApp"
                    >
                      <MessageSquare size={13} />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => onSelectItem(item)}
                      className="btn-primary"
                      style={{ padding: '0.45rem 0.85rem', fontSize: '0.78rem' }}
                    >
                      Order
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
