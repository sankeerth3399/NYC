import React from 'react';
import { motion } from 'framer-motion';
import { Search, X, Flame, Sparkles, Filter } from 'lucide-react';
import { menuCategories } from '../../data/menu';
import type { MenuCategory } from '../../types';

interface MenuFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: MenuCategory;
  onCategoryChange: (category: MenuCategory) => void;
  onlyPopular: boolean;
  onTogglePopular: () => void;
  onlySpicy: boolean;
  onToggleSpicy: () => void;
  totalCount: number;
}

export const MenuFilter: React.FC<MenuFilterProps> = ({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  onlyPopular,
  onTogglePopular,
  onlySpicy,
  onToggleSpicy,
  totalCount,
}) => {
  return (
    <div className="space-y-6">
      {/* Search Input Bar */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-emerald-400">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search sandwiches, chopped cheese, burgers, gyros, rice specials..."
          className="w-full pl-12 pr-10 py-4 rounded-2xl bg-[#0B2216] border-2 border-emerald-500/30 focus:border-emerald-400 text-white placeholder-gray-400 text-base shadow-xl backdrop-blur-md focus:outline-none transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white"
            aria-label="Clear search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Category Navigation Horizontal Scroll Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-none justify-start lg:justify-center">
        {menuCategories.map((category) => {
          const isActive = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`relative px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-black shadow-lg scale-105'
                  : 'text-gray-300 hover:text-white bg-[#0A1F13] hover:bg-[#11311F] border border-emerald-900/60'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="menuPageCategoryPill"
                  className="absolute inset-0 bg-gradient-to-r from-deli-amber-400 to-amber-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category.name}</span>
            </button>
          );
        })}
      </div>

      {/* Quick Filter Tags & Item Counter */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-emerald-900/60 text-xs text-gray-300">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filters:
          </span>
          <button
            onClick={onTogglePopular}
            className={`px-3 py-1 rounded-full font-bold transition-colors flex items-center gap-1 ${
              onlyPopular
                ? 'bg-deli-amber-500 text-black shadow'
                : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
            }`}
          >
            <Sparkles className="w-3 h-3" /> Popular Only
          </button>
          <button
            onClick={onToggleSpicy}
            className={`px-3 py-1 rounded-full font-bold transition-colors flex items-center gap-1 ${
              onlySpicy
                ? 'bg-red-500 text-white shadow'
                : 'bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10'
            }`}
          >
            <Flame className="w-3 h-3" /> Spicy Items
          </button>
        </div>

        <div className="text-emerald-300 font-mono">
          Showing <span className="text-white font-bold">{totalCount}</span> items
        </div>
      </div>
    </div>
  );
};
