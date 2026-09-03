import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/layout/CustomCursor';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { QuickCallBar } from './components/layout/QuickCallBar';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { About } from './pages/About';
import { Specials } from './pages/Specials';
import { Contact } from './pages/Contact';

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#08150E] text-[#F3F4F6] relative selection:bg-deli-amber-500 selection:text-black">
        {/* Desktop interactive custom cursor */}
        <CustomCursor />
        
        {/* Instant scroll position restoration on route change */}
        <ScrollToTop />

        {/* Global sticky/floating navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/specials" element={<Specials />} />
            <Route path="/contact" element={<Contact />} />
            {/* Catch-all redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>

        {/* Global brand footer */}
        <Footer />

        {/* Mobile sticky one-tap quick call bar */}
        <QuickCallBar />
      </div>
    </Router>
  );
};

export default App;
