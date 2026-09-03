import React from 'react';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';

const SPECIALS_LIST = [
  {
    id: 'special-quesadilla',
    name: 'Loaded Chicken Quesadilla',
    tag: 'DAILY SPECIAL',
    price: '$10.99',
    image: '/assets/specials/quesadilla.jpg',
    desc: 'Golden crispy flour tortilla packed with griddled marinated chicken, sautéed bell peppers, melted Monterey Jack & pepper jack cheese, house salsa & crema.',
  },
  {
    id: 'special-chopped-cheese',
    name: 'Utica Chopped Cheese Combo',
    tag: 'UTICA LEGEND',
    price: '$8.99',
    image: '/assets/menu/cheese-pull.webp',
    desc: 'Seasoned beef chopped on the grill with sweet onions, melted yellow American cheese, shredded lettuce, plum tomato, mayo, served with fries & ice cold soda.',
  },
  {
    id: 'special-philly-steak',
    name: 'Philly Cheesesteak Hero W/ Fries',
    tag: 'TOP RATED',
    price: '$7.49',
    image: '/assets/menu/prime-stack.webp',
    desc: 'Thinly shaved prime ribeye steak griddled with sweet peppers and onions, smothered in melted provolone on toasted Italian bakery hero bread.',
  },
  {
    id: 'special-bec-roll',
    name: 'The Utica B.E.C. All-Day Special',
    tag: 'BREAKFAST STAPLE',
    price: '$4.49',
    image: '/assets/menu/overhead.webp',
    desc: 'Crisp smoked bacon, two farm fresh fried eggs, melted American cheese, salt, pepper, ketchup on a hot toasted buttered Utica hard roll.',
  },
];

export default function DailySpecials({ onSelectItem }) {
  return (
    <section id="specials" className="specials-section">
      {/* Background Ambience */}
      <div className="ambient-glow glow-emerald" style={{ top: '25%', left: '5%', width: '500px', height: '500px' }} />

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
                  <span className="special-price">{item.price}</span>
                  <button
                    onClick={() => onSelectItem(item)}
                    className="btn-primary"
                    style={{ padding: '0.5rem 1.1rem', fontSize: '0.82rem' }}
                  >
                    Order Special
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
