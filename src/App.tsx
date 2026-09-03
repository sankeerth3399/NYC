import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/layout/CustomCursor';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { QuickCallBar } from './components/layout/QuickCallBar';
import { ScrollProgress } from './components/motion/ScrollProgress';
import { PageTransition } from './components/motion/PageTransition';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { About } from './pages/About';
import { Specials } from './pages/Specials';
import { Contact } from './pages/Contact';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home />
            </PageTransition>
          }
        />
        <Route
          path="/menu"
          element={
            <PageTransition>
              <Menu />
            </PageTransition>
          }
        />
        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />
        <Route
          path="/specials"
          element={
            <PageTransition>
              <Specials />
            </PageTransition>
          }
        />
        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#08150E] text-[#F3F4F6] relative selection:bg-deli-amber-500 selection:text-black">
        {/* Subtle top scroll progress indicator */}
        <ScrollProgress />

        {/* Desktop interactive custom cursor */}
        <CustomCursor />
        
        {/* Instant scroll position restoration on route change */}
        <ScrollToTop />

        {/* Global sticky/floating navbar */}
        <Navbar />

        {/* Page Content with transitions */}
        <div className="flex-grow">
          <AnimatedRoutes />
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
