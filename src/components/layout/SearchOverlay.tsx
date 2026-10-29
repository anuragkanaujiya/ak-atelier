'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, X, ArrowRight, Eye, Clock, Sparkles, Filter } from 'lucide-react';
import Link from 'next/link';
import { PRODUCTS, FORMAT_CURRENCY } from '@/data/products';
import { Product } from '@/types';
import { useQuickView } from '@/context/QuickViewContext';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  isGlossy?: boolean;
}

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Silhouettes' },
  { id: 'evening-dresses', label: 'Eveningwear & Gowns' },
  { id: 'tailored-suiting', label: 'Tailored Suiting' },
  { id: 'coats-outerwear', label: 'Cashmere Coats' },
  { id: 'bespoke-suiting', label: 'Bespoke Tuxedos' },
  { id: 'luxury-accessories', label: 'Leather Goods' },
  { id: 'silk-blouses', label: 'Silk Blouses' },
];

const PRICE_FILTERS = [
  { id: 'all', label: 'All Prices' },
  { id: 'under-150k', label: 'Under ₹1,50,000', max: 150000 },
  { id: '150k-250k', label: '₹1,50,000 – ₹2,50,000', min: 150000, max: 250000 },
  { id: 'above-250k', label: 'Above ₹2,50,000', min: 250000 },
];

const POPULAR_SEARCHES = [
  'Cashmere Coat',
  'Silk Evening Gown',
  'Wool Tuxedo',
  'Pant Suit',
  'Trench Coat',
  'Mulberry Silk',
  'Merino Knitwear',
  'Duchess Satin',
];

export const SearchOverlay: React.FC<SearchOverlayProps> = ({
  isOpen,
  onClose,
  isGlossy = false,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriceTier, setSelectedPriceTier] = useState('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openQuickView } = useQuickView();

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('ak_recent_searches');
        if (saved) {
          setRecentSearches(JSON.parse(saved));
        }
      } catch {
        // Fallback
      }
    }
  }, []);

  const saveRecentSearch = (term: string) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setRecentSearches((prev) => {
      const updated = [trimmed, ...prev.filter((t) => t.toLowerCase() !== trimmed.toLowerCase())].slice(0, 6);
      try {
        localStorage.setItem('ak_recent_searches', JSON.stringify(updated));
      } catch {
        // Fallback
      }
      return updated;
    });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
      setSelectedCategory('all');
      setSelectedPriceTier('all');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Filter products based on search query, category, and price tier
  const filteredResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    let list = PRODUCTS;

    if (trimmed) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(trimmed) ||
          p.categoryName.toLowerCase().includes(trimmed) ||
          p.category.toLowerCase().includes(trimmed) ||
          p.fabric.toLowerCase().includes(trimmed) ||
          (p.embroidery && p.embroidery.toLowerCase().includes(trimmed)) ||
          (p.occasion && p.occasion.some((o) => o.toLowerCase().includes(trimmed))) ||
          (p.tagline && p.tagline.toLowerCase().includes(trimmed))
      );
    } else {
      // If no query, show featured selections
      list = list.filter((p) => p.featured || p.badge);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Price tier filter
    if (selectedPriceTier === 'under-150k') {
      list = list.filter((p) => p.price < 150000);
    } else if (selectedPriceTier === '150k-250k') {
      list = list.filter((p) => p.price >= 150000 && p.price <= 250000);
    } else if (selectedPriceTier === 'above-250k') {
      list = list.filter((p) => p.price > 250000);
    }

    return list;
  }, [query, selectedCategory, selectedPriceTier]);

  const handleSelectSearchTerm = (term: string) => {
    setQuery(term);
    saveRecentSearch(term);
  };

  const handleClearRecent = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('ak_recent_searches');
    } catch {
      // Fallback
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col text-white animate-fadeIn transition-colors duration-500 border-none ${
        isGlossy
          ? 'bg-gradient-to-b from-black/95 via-black/90 to-black/85 backdrop-blur-2xl shadow-[0_35px_80px_rgba(0,0,0,0.9)]'
          : 'bg-neutral-900/98 backdrop-blur-2xl shadow-[0_35px_80px_rgba(0,0,0,0.95)]'
      }`}
    >
      {/* Top Header Bar */}
      <div className="border-b border-neutral-700/60 px-6 py-5 max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="font-serif text-2xl tracking-[0.2em] text-white font-medium">
            AK ATELIER
          </span>
          <span className="text-[10px] tracking-[0.28em] font-nav uppercase text-primary-300 font-semibold px-2 py-0.5 rounded-full bg-primary-950/80 border border-primary-500/40">
            Intelligent Atelier Search
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-neutral-400 hover:text-white p-2 rounded-full border border-neutral-700 hover:border-primary-400 transition-colors cursor-pointer"
          aria-label="Close search"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Search Input & Dynamic Filter Controls */}
      <div className="max-w-5xl mx-auto w-full px-6 pt-8 pb-4">
        {/* Input Bar */}
        <div className="relative border-b-2 border-primary-400/60 focus-within:border-primary-400 transition-colors pb-3">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 text-primary-300" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && query.trim()) {
                saveRecentSearch(query);
              }
            }}
            placeholder="Search cashmere coats, evening gowns, double-breasted suits, noble fabrics..."
            className="w-full bg-transparent pl-10 pr-10 text-xl sm:text-2xl font-serif text-white placeholder:text-neutral-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills Strip */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-4 pb-2">
          {CATEGORY_FILTERS.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-nav uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-primary-600 text-white font-medium border border-primary-400 shadow-md'
                  : 'bg-neutral-800/80 hover:bg-neutral-750 text-neutral-300 border border-neutral-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Price Tier Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-2 pb-2">
          <span className="text-[10px] font-nav uppercase tracking-widest text-primary-400 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Price:
          </span>
          {PRICE_FILTERS.map((pf) => (
            <button
              key={pf.id}
              type="button"
              onClick={() => setSelectedPriceTier(pf.id)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-nav transition-all whitespace-nowrap cursor-pointer ${
                selectedPriceTier === pf.id
                  ? 'bg-secondary-600 text-white font-medium border border-secondary-400'
                  : 'bg-neutral-850 hover:bg-neutral-800 text-neutral-400 border border-neutral-750'
              }`}
            >
              {pf.label}
            </button>
          ))}
        </div>

        {/* Popular & Recent Searches when query is short */}
        {!query && (
          <div className="mt-4 pt-3 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] uppercase tracking-widest text-primary-300 font-nav">
                Curated Searches:
              </span>
              {POPULAR_SEARCHES.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSelectSearchTerm(term)}
                  className="text-xs font-sans bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 hover:text-white px-3 py-1 rounded-full border border-neutral-700 hover:border-primary-400 transition-all cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>

            {recentSearches.length > 0 && (
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-neutral-400" />
                <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-nav">
                  Recent:
                </span>
                {recentSearches.slice(0, 3).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleSelectSearchTerm(r)}
                    className="text-xs text-primary-300 hover:underline cursor-pointer"
                  >
                    {r}
                  </button>
                ))}
                <button
                  onClick={handleClearRecent}
                  className="text-[10px] text-neutral-500 hover:text-neutral-300 underline ml-1 cursor-pointer"
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results Grid Viewport */}
      <div className="flex-1 overflow-y-auto px-6 pb-20 max-w-7xl mx-auto w-full">
        {/* Results Header */}
        <div className="flex items-center justify-between py-4 border-b border-neutral-800 mb-6">
          <p className="text-xs uppercase tracking-widest text-primary-300 font-nav">
            {query ? `Search Results for "${query}"` : 'Featured Runway Recommendations'} ·{' '}
            <span className="text-white font-medium">{filteredResults.length} Silhouettes</span>
          </p>
          <Link
            href="/collections/all"
            onClick={onClose}
            className="text-xs font-nav uppercase tracking-wider text-primary-300 hover:text-white transition-colors"
          >
            Explore All Collections →
          </Link>
        </div>

        {/* Empty State */}
        {filteredResults.length === 0 && (
          <div className="text-center py-20 space-y-4">
            <Sparkles className="w-8 h-8 text-primary-400 mx-auto" />
            <p className="font-serif text-2xl text-white">No silhouettes match your query</p>
            <p className="text-xs text-neutral-400 max-w-md mx-auto font-sans leading-relaxed">
              Try exploring by fabric such as &ldquo;Cashmere&rdquo;, &ldquo;Mulberry Silk&rdquo;, or &ldquo;Virgin Wool&rdquo;, or clear your price and category filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSelectedCategory('all');
                setSelectedPriceTier('all');
              }}
              className="btn-luxury px-6 py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-nav text-xs uppercase tracking-widest cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredResults.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredResults.map((product) => (
              <div
                key={product.id}
                className="group bg-neutral-800/80 rounded-2xl overflow-hidden border border-neutral-700/80 hover:border-primary-400/80 transition-all flex flex-col shadow-lg"
              >
                {/* Image Container with 3D and Quick View Action */}
                <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {product.badge && (
                    <span className="absolute top-2.5 left-2.5 text-[9px] font-mono uppercase tracking-wider bg-neutral-900/90 text-primary-200 px-2 py-0.5 rounded border border-primary-500/30">
                      {product.badge}
                    </span>
                  )}
                  {product.has3D && (
                    <span className="absolute top-2.5 right-2.5 text-[8px] font-mono tracking-widest bg-primary-950/90 text-primary-200 px-1.5 py-0.5 rounded border border-primary-400/40">
                      3D READY
                    </span>
                  )}

                  {/* Quick View Hover Button */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <button
                      type="button"
                      onClick={() => openQuickView(product)}
                      className="btn-luxury w-full py-2 px-3 rounded-xl bg-neutral-900/95 hover:bg-primary-700 text-white border border-primary-400/40 text-[10px] font-nav uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xl cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-primary-300" />
                      <span>3D Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Card Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-nav uppercase tracking-widest text-primary-300 block mb-1">
                      {product.categoryName}
                    </span>
                    <Link
                      href={`/product/${product.id}`}
                      onClick={onClose}
                      className="font-serif text-base text-white group-hover:text-primary-200 transition-colors line-clamp-1 block"
                    >
                      {product.name}
                    </Link>
                    <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                      {product.fabric}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-neutral-700/60 flex items-center justify-between">
                    <span className="font-serif text-sm font-semibold text-white">
                      {FORMAT_CURRENCY(product.price)}
                    </span>
                    <Link
                      href={`/product/${product.id}`}
                      onClick={onClose}
                      className="btn-luxury py-1 px-2.5 rounded-lg border border-neutral-700 hover:border-primary-400 text-[10px] font-nav uppercase tracking-wider text-primary-200 flex items-center gap-1 transition-colors"
                    >
                      <span>Inspect</span>
                      <ArrowRight className="w-3 h-3 text-primary-300" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchOverlay;
