import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Utensils, Phone, Search } from 'lucide-react';
import { menuItems } from '../data/menu';
import type { MenuCategory, MenuItem } from '../types';
import { MenuFilter } from '../components/menu/MenuFilter';
import { MenuCard } from '../components/menu/MenuCard';
import { ItemModal } from '../components/menu/ItemModal';
import { businessData } from '../data/business';

export const Menu: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = (searchParams.get('category') as MenuCategory) || 'all';

  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyPopular, setOnlyPopular] = useState(false);
  const [onlySpicy, setOnlySpicy] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Update query param when category changes
  const handleCategoryChange = (cat: MenuCategory) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // Category check
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      // Popular filter
      if (onlyPopular && !item.popular) {
        return false;
      }
      // Spicy filter
      if (onlySpicy && !item.spicy) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchCat = item.category.toLowerCase().includes(q);
        const matchTags = item.tags?.some(t => t.toLowerCase().includes(q)) ?? false;
        if (!matchName && !matchDesc && !matchCat && !matchTags) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, searchQuery, onlyPopular, onlySpicy]);

  return (
    <main className="min-h-screen pb-28 bg-[#08170F] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-20 right-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Menu Header Banner */}
      <section className="pt-16 pb-16 bg-gradient-to-b from-[#0B2A1A] via-[#0E3521] to-[#08170F] border-b border-emerald-900/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-xs font-bold text-deli-amber-400 uppercase tracking-widest"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Complete Deli &amp; Grill Menu</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl font-display font-black text-white tracking-tight"
          >
            Our Full Menu
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-emerald-200 uppercase font-bold tracking-wider max-w-xl mx-auto"
          >
            Sandwiches, Groceries &amp; More • 1510 Sunset Ave, Utica, NY
          </motion.p>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <a
              href={`tel:${businessData.phoneRaw}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-deli-amber-500 to-amber-600 hover:from-deli-amber-400 hover:to-amber-500 text-black font-extrabold text-sm sm:text-base shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              <Phone className="w-5 h-5" />
              <span>Call to Order: (315) 864-3000</span>
            </a>

            <a
              href="#menu-list"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#122E1F] hover:bg-[#1A3F2B] text-white font-bold text-sm sm:text-base border border-emerald-500/40 transition-all"
            >
              <Search className="w-4 h-4 text-emerald-400" />
              <span>Browse 30+ Items</span>
            </a>
          </motion.div>

        </div>
      </section>

      {/* Main Interactive Menu Explorer */}
      <section id="menu-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-10 relative z-10">
        
        {/* Search & Filter Component */}
        <MenuFilter
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          onlyPopular={onlyPopular}
          onTogglePopular={() => setOnlyPopular(!onlyPopular)}
          onlySpicy={onlySpicy}
          onToggleSpicy={() => setOnlySpicy(!onlySpicy)}
          totalCount={filteredItems.length}
        />

        {/* Menu Cards Grid */}
        {filteredItems.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onSelect={(selected) => setSelectedItem(selected)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-20 bg-[#0C2216] rounded-3xl border border-emerald-900/60 p-8 space-y-4">
            <Utensils className="w-12 h-12 text-deli-amber-400 mx-auto opacity-60" />
            <h3 className="text-2xl font-display font-bold text-white">
              No matching menu items found
            </h3>
            <p className="text-sm text-gray-300 max-w-md mx-auto">
              We couldn&apos;t find anything matching &quot;{searchQuery}&quot;. Try checking the spelling or resetting your filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setOnlyPopular(false);
                setOnlySpicy(false);
              }}
              className="px-6 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-sm shadow transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </section>

      {/* Item Detail Modal */}
      <ItemModal
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </main>
  );
};
