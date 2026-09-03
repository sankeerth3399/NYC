import React, { useState, useMemo } from 'react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/menuData';
import { Search, Plus, FileText, Check, ShoppingBag } from 'lucide-react';

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
          <div style={{ marginTop: '1.25rem' }}>
            <a
              href="https://mekobites.com/images/meko-menu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
              style={{ padding: '0.55rem 1.25rem', fontSize: '0.85rem' }}
            >
              <FileText size={15} />
              View / Download Official PDF Menu
            </a>
          </div>
        </div>

        {/* Menu Controls: Search & Category Filter */}
        <div className="menu-controls">
          <div className="menu-search-wrapper">
            <Search className="menu-search-icon" size={18} />
            <input
              type="text"
              placeholder="Search burgers, chopped cheese, cold cuts, wings..."
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
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '0.45rem' }}>
                        (Lg: ${item.priceLarge.toFixed(2)})
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      if (onAddToCart) onAddToCart(item);
                      if (onSelectItem) onSelectItem(item);
                    }}
                    className="menu-add-btn"
                  >
                    {isAdded ? (
                      <>
                        <Check size={14} color="var(--green-bright)" />
                        Added
                      </>
                    ) : (
                      <>
                        <Plus size={14} />
                        Add to Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredItems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: '#ffffff' }}>
              No menu items match "{searchQuery}"
            </p>
            <p>Try searching for "burger", "chopped cheese", "pastrami", "wings", or clear your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}
