import React, { useState } from 'react';
import { X, Phone, ShoppingBag, CheckCircle, Plus, Minus, Trash2 } from 'lucide-react';

export default function OrderModal({ isOpen, onClose, selectedItem, cartItems = [], onUpdateQuantity, onClearCart }) {
  const [orderType, setOrderType] = useState('pickup');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  if (!isOpen) return null;

  // Compute items list
  const displayItems = selectedItem
    ? [{ ...selectedItem, quantity: 1 }]
    : cartItems.length > 0
    ? cartItems
    : [
        {
          id: 'burger-double-cheese',
          name: 'Double Smashed Cheeseburger w/ Fries',
          price: 7.99,
          quantity: 1,
        },
      ];

  const subtotal = displayItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const tax = subtotal * 0.0875;
  const total = subtotal + tax;

  const handleCallOrder = () => {
    setOrderSubmitted(true);
    setTimeout(() => {
      window.location.href = 'tel:3158643000';
    }, 800);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(4, 9, 6, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#0c1a12',
          border: '1px solid var(--border-green)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '520px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.8), 0 0 30px var(--green-glow)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            color: 'var(--text-muted)',
            background: 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Title */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="section-tag" style={{ fontSize: '0.75rem' }}>MEKO QUICK DISPATCH</span>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: '#ffffff', margin: 0 }}>
            CALL & PICKUP ORDER
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: '0.25rem 0 0 0' }}>
            Ready in 10-15 minutes at 1510 Sunset Ave, Utica, NY
          </p>
        </div>

        {/* Order Type Toggle */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '8px',
            padding: '0.25rem',
            marginBottom: '1.5rem',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <button
            onClick={() => setOrderType('pickup')}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 600,
              backgroundColor: orderType === 'pickup' ? 'var(--green-primary)' : 'transparent',
              color: '#ffffff',
              transition: 'all 0.2s ease',
            }}
          >
            Store Pickup (Fastest)
          </button>
          <button
            onClick={() => setOrderType('delivery')}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 600,
              backgroundColor: orderType === 'delivery' ? 'var(--green-primary)' : 'transparent',
              color: '#ffffff',
              transition: 'all 0.2s ease',
            }}
          >
            Call for Delivery
          </button>
        </div>

        {/* Items List */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
            YOUR SELECTION:
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {displayItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div>
                  <strong style={{ color: '#ffffff', fontSize: '0.95rem', display: 'block' }}>
                    {item.name}
                  </strong>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gold-light)', fontSize: '0.9rem', fontWeight: 600 }}>
                    Qty: {item.quantity || 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Special Instructions Input */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
            SPECIAL REQUESTS / DRESSING:
          </label>
          <input
            type="text"
            placeholder="e.g., Salt, pepper, ketchup, extra crispy bacon, toasted roll..."
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '6px',
              color: '#ffffff',
              fontSize: '0.85rem',
            }}
          />
        </div>

        {/* Price Breakdown */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '1rem',
            marginBottom: '1.75rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span>Est. NY Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: '#ffffff',
              fontSize: '1.15rem',
              fontWeight: 700,
              paddingTop: '0.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <span>Estimated Total</span>
            <span style={{ color: 'var(--green-bright)' }}>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleCallOrder}
          className="btn-gold"
          style={{
            width: '100%',
            padding: '1rem',
            fontSize: '1rem',
            justifyContent: 'center',
          }}
        >
          <Phone size={18} />
          Call To Place Order: (315) 864-3000
        </button>

        {orderSubmitted && (
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              color: 'var(--green-bright)',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <CheckCircle size={16} />
            Dialing Meko Deli kitchen now...
          </div>
        )}
      </div>
    </div>
  );
}
