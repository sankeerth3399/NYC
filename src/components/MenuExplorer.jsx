import React, { useState, useMemo } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { Search, Plus, FileText, Check, MessageSquare } from 'lucide-react';

const OWNER_WHATSAPP_NUMBER = '13158643000';

export default function MenuExplorer({ onSelectItem, cartItems = [], onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleWhatsAppSingleItem = (item) => {
    const text = encodeURIComponent(
      `🛒 *ORDER INQUIRY — MEKO DELI*\n\nHi! I would like to order:\n• 1x *${item.name}* ($${item.price.toFixed(2)})\n\nPlease confirm availability and pickup time!`
    );
    window.open(`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  return (
    <section id="menu-explorer" className="menu-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">PREPARED FRESH TO ORDER</span>
          <h2 className="section-title">
            THE COMPLETE <span style={{ color: 'var(--green-light)' }}>MEKO MENU</span>
          </h2>
          <p className="section-subtitle">
            From breakfast egg rolls at dawn to late-night chopped cheese, smashed double burgers, and Boar’s Head cold cut platters.
          </p>
          <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://mekobites.com/images/meko-menu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.82rem' }}
            >
              <FileText size={15} />
              Official PDF Menu
            </a>
            <a
              href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Hi%20Meko%20Deli!%20Can%20I%20place%20an%20order%20from%20the%20menu?`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.82rem' }}
            >
              <MessageSquare size={15} />
              Order on WhatsApp
            </a>
          </div>
        </div>

        {/* Menu Controls: Search & Category Filter */}
        <div className="menu-controls">
          <div className="menu-search-wrapper">
            <Search className="menu-search-icon" size={17} />
            <input
              type="text"
              placeholder="Search burgers, chopped cheese, pastrami, wings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="menu-search-input"
            />
          </div>

          <div className="category-tabs">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`category-tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="menu-grid">
          {filteredItems.map((item) => {
            const isAdded = cartItems.some((c) => c.id === item.id);

            return (
              <div key={item.id} className="menu-item-card">
                <div>
                  <div className="menu-item-header">
                    <h3 className="menu-item-title">{item.name}</h3>
                    {item.tag && <span className="menu-item-badge">{item.tag}</span>}
                  </div>
                  <p className="menu-item-desc">{item.description}</p>
                </div>

                <div className="menu-item-bottom">
                  <div>
                    <span className="menu-item-price">${item.price.toFixed(2)}</span>
                    {item.priceLarge && (
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: '0.35rem' }}>
                        (Lg: ${item.priceLarge.toFixed(2)})
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '0.35rem' }}>
                    <button
                      onClick={() => handleWhatsAppSingleItem(item)}
                      style={{
                        padding: '0.35rem 0.6rem',
                        borderRadius: '4px',
                        background: 'rgba(37, 211, 102, 0.12)',
                        color: 'var(--whatsapp-green)',
                        border: '1px solid rgba(37, 211, 102, 0.3)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.25rem',
                        fontSize: '0.7rem',
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 600,
                        transition: 'all 0.2s ease',
                      }}
                      title="Order this item via WhatsApp"
                    >
                      <MessageSquare size={12} />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => {
                        if (onAddToCart) onAddToCart(item);
                        if (onSelectItem) onSelectItem(item);
                      }}
                      className="menu-add-btn"
                    >
                      {isAdded ? (
                        <>
                          <Check size={13} color="var(--green-bright)" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus size={13} />
                          Order
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3.5rem 0', color: 'var(--text-secondary)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: '#ffffff' }}>
              No menu items match "{searchQuery}"
            </p>
            <p style={{ fontSize: '0.9rem' }}>Try searching for "burger", "chopped cheese", "pastrami", "wings", or clear your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}
