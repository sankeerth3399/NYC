import React, { useState } from 'react';
import { X, Phone, MessageSquare, CheckCircle, Plus, Minus, Trash2, MapPin, Send } from 'lucide-react';

const OWNER_WHATSAPP_NUMBER = '13158643000'; // (315) 864-3000 formatted with US country code (+1)

export default function OrderModal({ isOpen, onClose, selectedItem, cartItems = [], onUpdateQuantity, onClearCart }) {
  const [orderType, setOrderType] = useState('pickup');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [submitType, setSubmitType] = useState(''); // 'whatsapp' or 'call'

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

  // Generate WhatsApp Order Message
  const constructWhatsAppMessage = () => {
    let itemsText = '';
    displayItems.forEach((item) => {
      const qty = item.quantity || 1;
      const itemTotal = (item.price * qty).toFixed(2);
      itemsText += `• ${qty}x *${item.name}* — $${itemTotal}\n`;
    });

    const msg = 
`🍔 *NEW ORDER — MEKO DELI & GROCERY*
----------------------------------
👤 *Customer:* ${customerName.trim() || 'Valued Customer'}
📱 *Phone:* ${customerPhone.trim() || 'Not specified'}
🛵 *Order Type:* ${orderType === 'pickup' ? '🏪 Store Pickup (1510 Sunset Ave)' : '🚗 Local Delivery'}
${orderType === 'delivery' && deliveryAddress ? `📍 *Delivery Address:* ${deliveryAddress.trim()}\n` : ''}${specialInstructions ? `📝 *Special Notes:* ${specialInstructions.trim()}\n` : ''}
🛒 *ITEMS ORDERED:*
${itemsText}
💵 *Subtotal:* $${subtotal.toFixed(2)}
🧾 *Est. NY Tax (8.75%):* $${tax.toFixed(2)}
💰 *Estimated Total:* *$${total.toFixed(2)}*
----------------------------------
Please confirm order receipt & estimated prep time. Thank you! 🙏`;

    return msg;
  };

  const handleSendWhatsApp = () => {
    setSubmitType('whatsapp');
    setOrderSubmitted(true);
    const text = constructWhatsAppMessage();
    const whatsappUrl = `https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 600);
  };

  const handleCallOrder = () => {
    setSubmitType('call');
    setOrderSubmitted(true);
    setTimeout(() => {
      window.location.href = 'tel:3158643000';
    }, 600);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(4, 9, 6, 0.88)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        zIndex: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(0.75rem, 3vw, 1.5rem)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#0b1911',
          border: '1px solid var(--border-green)',
          borderRadius: '16px',
          width: '100%',
          maxWidth: '520px',
          maxHeight: '92vh',
          overflowY: 'auto',
          padding: 'clamp(1.25rem, 3vw, 2rem)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px var(--green-glow)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            color: 'var(--text-muted)',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          aria-label="Close Order Modal"
        >
          <X size={18} />
        </button>

        {/* Modal Title */}
        <div style={{ marginBottom: '1.25rem', paddingRight: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--whatsapp-green)',
                background: 'rgba(37, 211, 102, 0.12)',
                padding: '0.15rem 0.5rem',
                borderRadius: '4px',
                border: '1px solid rgba(37, 211, 102, 0.3)',
                fontWeight: 600,
              }}
            >
              WHATSAPP & CALL DISPATCH
            </span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', color: '#ffffff', margin: 0 }}>
            PLACE YOUR ORDER
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: '0.2rem 0 0 0' }}>
            1510 Sunset Ave, Utica, NY • Direct to Kitchen
          </p>
        </div>

        {/* Order Type Toggle (Pickup vs Delivery) */}
        <div
          style={{
            display: 'flex',
            background: 'rgba(0, 0, 0, 0.4)',
            borderRadius: '8px',
            padding: '0.25rem',
            marginBottom: '1.25rem',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <button
            onClick={() => setOrderType('pickup')}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 600,
              backgroundColor: orderType === 'pickup' ? 'var(--green-primary)' : 'transparent',
              color: '#ffffff',
              transition: 'all 0.2s ease',
            }}
          >
            🏪 Store Pickup (10-15m)
          </button>
          <button
            onClick={() => setOrderType('delivery')}
            style={{
              flex: 1,
              padding: '0.55rem',
              borderRadius: '6px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              fontWeight: 600,
              backgroundColor: orderType === 'delivery' ? 'var(--green-primary)' : 'transparent',
              color: '#ffffff',
              transition: 'all 0.2s ease',
            }}
          >
            🚗 Local Delivery
          </button>
        </div>

        {/* Selected Items Breakdown */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
            YOUR SELECTION:
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {displayItems.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '8px',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ paddingRight: '0.5rem' }}>
                  <strong style={{ color: '#ffffff', fontSize: '0.9rem', display: 'block' }}>
                    {item.name}
                  </strong>
                  <span style={{ color: 'var(--green-light)', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                    ${item.price.toFixed(2)} each
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--gold-light)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      background: 'rgba(245, 158, 11, 0.12)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                    }}
                  >
                    Qty: {item.quantity || 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Details Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                YOUR NAME:
              </label>
              <input
                type="text"
                placeholder="e.g., Alex"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                PHONE NUMBER:
              </label>
              <input
                type="tel"
                placeholder="e.g., (315) 555-0199"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                }}
              />
            </div>
          </div>

          {orderType === 'delivery' && (
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                DELIVERY ADDRESS IN UTICA:
              </label>
              <input
                type="text"
                placeholder="Street address, Apt/Suite #, Utica, NY"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                }}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
              SPECIAL REQUESTS / DRESSING:
            </label>
            <input
              type="text"
              placeholder="e.g., Extra cheese, salt/pepper/ketchup, well-done fries..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem 0.85rem',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '6px',
                color: '#ffffff',
                fontSize: '0.85rem',
              }}
            />
          </div>
        </div>

        {/* Pricing Summary */}
        <div
          style={{
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: '0.85rem',
            marginBottom: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
            <span>Est. NY Sales Tax (8.75%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: '#ffffff',
              fontSize: '1.1rem',
              fontWeight: 700,
              paddingTop: '0.4rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <span>Estimated Total</span>
            <span style={{ color: 'var(--green-bright)' }}>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Dual Ordering Actions: WhatsApp & Phone Call */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {/* WhatsApp Primary Order Button */}
          <button
            onClick={handleSendWhatsApp}
            className="btn-whatsapp"
            style={{
              width: '100%',
              padding: '0.9rem',
              fontSize: '0.95rem',
              justifyContent: 'center',
            }}
          >
            <MessageSquare size={18} />
            Send Order via WhatsApp
          </button>

          {/* Direct Phone Call Button */}
          <button
            onClick={handleCallOrder}
            className="btn-outline"
            style={{
              width: '100%',
              padding: '0.75rem',
              fontSize: '0.85rem',
              justifyContent: 'center',
            }}
          >
            <Phone size={16} color="var(--green-light)" />
            Or Call Directly: (315) 864-3000
          </button>
        </div>

        {/* Confirmation Toast */}
        {orderSubmitted && (
          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              color: submitType === 'whatsapp' ? 'var(--whatsapp-green)' : 'var(--green-bright)',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              background: 'rgba(0, 0, 0, 0.5)',
              padding: '0.6rem',
              borderRadius: '6px',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <CheckCircle size={16} />
            {submitType === 'whatsapp'
              ? 'Opening WhatsApp chat with Meko Deli owner...'
              : 'Connecting call to (315) 864-3000...'}
          </div>
        )}
      </div>
    </div>
  );
}
