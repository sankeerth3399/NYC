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
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './styles/index.css';
import './styles/food-story.css';
import './styles/menu.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrderItem, setSelectedOrderItem] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  // Ensure ScrollTrigger updates after page finishes rendering
  useEffect(() => {
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 600);

    return () => {
      window.removeEventListener('load', handleLoad);
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
    <div className="app-root" style={{ position: 'relative', minHeight: '100vh', backgroundColor: 'var(--bg-black)' }}>
      {/* Navigation */}
      <Navbar onOpenOrderModal={() => handleOpenOrderModal(null)} />

      {/* Hero Pinned Section: Exploded & Reassembled Smashed Burger Story */}
      <HeroStoryBurger onOpenOrderModal={() => handleOpenOrderModal({ name: 'Double Smashed Cheeseburger w/ Fries', price: 7.99 })} />

      {/* Sandwich Pinned Section: Exploded & Reassembled Utica Chopped Cheese Hero Story */}
      <SandwichStory onOpenOrderModal={() => handleOpenOrderModal({ name: 'The Famous Utica Chopped Cheese', price: 7.49 })} />

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

      {/* Quick Order & Call Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={handleCloseOrderModal}
        selectedItem={selectedOrderItem}
        cartItems={cartItems}
      />
    </div>
  );
}
