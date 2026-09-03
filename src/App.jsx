import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroStoryBurger from './components/HeroStoryBurger';
import SandwichStory from './components/SandwichStory';
import DailySpecials from './components/DailySpecials';
import MenuExplorer from './components/MenuExplorer';
import AboutSection from './components/AboutSection';
import ContactLocation from './components/ContactLocation';
import Footer from './components/Footer';
import OrderModal from './components/OrderModal';
import { MessageSquare } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './styles/index.css';
import './styles/food-story.css';
import './styles/menu.css';

gsap.registerPlugin(ScrollTrigger);

const OWNER_WHATSAPP_NUMBER = '13158643000';

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Ensure ScrollTrigger updates after page finishes rendering & on resize
  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);
    window.addEventListener('resize', handleLoad);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('resize', handleLoad);
      clearTimeout(timer);
    };
  }, []);

  const handleOpenOrderModal = (item = null) => {
    setSelectedOrderItem(item);
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
    setSelectedOrderItem(null);
  };

  const handleAddToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  return (
    <div
      className="app-root"
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100vw',
        overflowX: 'hidden',
        backgroundColor: 'var(--bg-black)',
      }}
    >
      {/* Navigation */}
      <Navbar onOpenOrderModal={() => handleOpenOrderModal(null)} />

      {/* Hero Pinned Section: Exploded & Reassembled Smashed Burger Story */}
      <HeroStoryBurger onOpenOrderModal={(item) => handleOpenOrderModal(item || { name: 'Double Smashed Cheeseburger w/ Fries', price: 7.99 })} />

      {/* Sandwich Pinned Section: Exploded & Reassembled Utica Chopped Cheese Hero Story */}
      <SandwichStory onOpenOrderModal={(item) => handleOpenOrderModal(item || { name: 'The Famous Utica Chopped Cheese', price: 7.49 })} />

      {/* Daily & Weekly Specials */}
      <DailySpecials onSelectItem={(item) => handleOpenOrderModal(item)} />

      {/* Comprehensive Menu Explorer with Real Meko Deli Items */}
      <MenuExplorer
        onSelectItem={(item) => handleOpenOrderModal(item)}
        cartItems={cartItems}
        onAddToCart={handleAddToCart}
      />

      {/* About Section: The Sunset Ave Utica Tradition */}
      <AboutSection />

      {/* Contact & Location Map */}
      <ContactLocation />

      {/* Site Footer */}
      <Footer />

      {/* Quick Order & Call / WhatsApp Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrderModal}
        selectedItem={selectedOrderItem}
        cartItems={cartItems}
      />

      {/* Persistent Floating WhatsApp Quick Action Button */}
      <a
        href={`https://wa.me/${OWNER_WHATSAPP_NUMBER}?text=Hi%20Meko%20Deli!%20I%20would%20like%20to%20place%20an%20order.`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp-btn animate-whatsapp-pulse"
        title="Chat & Order directly with Meko Deli owner on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageSquare size={20} />
        <span>Order on WhatsApp</span>
      </a>
    </div>
  );
}
