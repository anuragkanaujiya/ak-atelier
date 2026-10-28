'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '@/types';
import { ProductCard } from '@/components/product/ProductCard';
import { FORMAT_CURRENCY } from '@/data/products';
import { ALL_CATEGORIES } from '@/data/categories';
import { SearchBar } from './SearchBar';
import { FilterDrawer } from './FilterDrawer';
import {
  SlidersHorizontal,
  LayoutGrid,
  Grid3X3,
  RotateCcw,
  Sparkles,
} from 'lucide-react';

interface CollectionBrowserProps {
  initialProducts: Product[];
  collectionTitle: string;
  collectionDescription?: string;
  activeCategorySlug?: string;
  genderFilter?: 'women' | 'men';
  initialOccasion?: string;
  initialFabric?: string;
}

export const CollectionBrowser: React.FC<CollectionBrowserProps> = ({
  initialProducts,
  collectionTitle,
  collectionDescription,
  activeCategorySlug,
  genderFilter,
  initialOccasion,
  initialFabric,
}) => {
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategorySlug || 'all');
  const [selectedGender, setSelectedGender] = useState<string>(genderFilter || 'all');
  const [priceMax, setPriceMax] = useState<number>(350000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>(
    initialOccasion ? [initialOccasion] : []
  );
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>(
    initialFabric ? [initialFabric] : []
  );
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [gridCols, setGridCols] = useState<3 | 4>(3);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync prop updates if navigation route or search parameters change
  const [prevProps, setPrevProps] = useState({
    activeCategorySlug,
    genderFilter,
    initialOccasion,
    initialFabric,
  });

  if (
    activeCategorySlug !== prevProps.activeCategorySlug ||
    genderFilter !== prevProps.genderFilter ||
    initialOccasion !== prevProps.initialOccasion ||
    initialFabric !== prevProps.initialFabric
  ) {
    setPrevProps({ activeCategorySlug, genderFilter, initialOccasion, initialFabric });
    if (activeCategorySlug !== prevProps.activeCategorySlug && activeCategorySlug) {
      setSelectedCategory(activeCategorySlug);
    }
    if (genderFilter !== prevProps.genderFilter && genderFilter) {
      setSelectedGender(genderFilter);
    }
    if (initialOccasion !== prevProps.initialOccasion && initialOccasion) {
      setSelectedOccasions([initialOccasion]);
    }
    if (initialFabric !== prevProps.initialFabric && initialFabric) {
      setSelectedFabrics([initialFabric]);
    }
  }

  // Western Luxury Filter Options
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'Custom Bespoke'];
  const availableColors = [
    { name: 'Noir Black', hex: '#242129' },
    { name: 'Ivory Cream', hex: '#FAF8FC' },
    { name: 'Midnight Navy', hex: '#2D4352' },
    { name: 'Bordeaux Plum', hex: '#451F31' },
    { name: 'Camel Tan', hex: '#C5AD83' },
    { name: 'Slate Grey', hex: '#5A5562' },
    { name: 'Forest Pine', hex: '#293E32' },
  ];
  const availableOccasions = [
    'Black Tie & Gala',
    'Evening Soirée',
    'Cocktail & Opera',
    'Bespoke Wedding',
    'Executive Haute',
    'Autumn Promenade',
  ];
  const availableFabrics = [
    'Superfine Loro Piana Merino Wool',
    'Italian Double-Faced Cashmere',
    'Mulberry Silk Satin & Crepe',
    'Duchess Silk Satin',
    'Structured French Jacquard',
    'Belgian Virgin Wool Blend',
    'Silk Chiffon & Tulle',
  ];

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const toggleOccasion = (occ: string) => {
    setSelectedOccasions((prev) => {
      const exists = prev.some((o) => o.toLowerCase() === occ.toLowerCase());
      return exists
        ? prev.filter((o) => o.toLowerCase() !== occ.toLowerCase())
        : [...prev, occ];
    });
  };

  const toggleFabric = (fabric: string) => {
    setSelectedFabrics((prev) => {
      const exists = prev.some((f) => f.toLowerCase() === fabric.toLowerCase());
      return exists
        ? prev.filter((f) => f.toLowerCase() !== fabric.toLowerCase())
        : [...prev, fabric];
    });
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedGender('all');
    setPriceMax(350000);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedOccasions([]);
    setSelectedFabrics([]);
    setSortBy('featured');
  };

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    // Search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.categoryName?.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query) ||
          p.fabric?.toLowerCase().includes(query) ||
          p.tagline?.toLowerCase().includes(query) ||
          p.description?.toLowerCase().includes(query)
      );
    }

    // Gender filter
    if (selectedGender !== 'all') {
      result = result.filter((p) => p.gender === selectedGender);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(
        (p) => p.category === selectedCategory
      );
    }

    // Price range
    result = result.filter((p) => p.price <= priceMax);

    // Sizes
    if (selectedSizes.length > 0) {
      result = result.filter((p) =>
        p.sizes.some((s) => selectedSizes.some((ss) => s.toLowerCase().includes(ss.toLowerCase())))
      );
    }

    // Colors (case-insensitive partial match)
    if (selectedColors.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) =>
          selectedColors.some((sc) =>
            c.name.toLowerCase().includes(sc.toLowerCase()) ||
            sc.toLowerCase().includes(c.name.toLowerCase())
          )
        )
      );
    }

    // Occasions (case-insensitive flexible match)
    if (selectedOccasions.length > 0) {
      result = result.filter((p) =>
        p.occasion.some((o) =>
          selectedOccasions.some((so) =>
            o.toLowerCase().includes(so.toLowerCase()) ||
            so.toLowerCase().includes(o.toLowerCase())
          )
        )
      );
    }

    // Fabrics (case-insensitive flexible match)
    if (selectedFabrics.length > 0) {
      result = result.filter((p) =>
        selectedFabrics.some((f) =>
          p.fabric.toLowerCase().includes(f.toLowerCase()) ||
          f.toLowerCase().includes(p.fabric.toLowerCase())
        )
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.badge === 'New Arrival' ? 1 : 0) - (a.badge === 'New Arrival' ? 1 : 0));
    }

    return result;
  }, [
    initialProducts,
    searchQuery,
    selectedGender,
    selectedCategory,
    priceMax,
    selectedSizes,
    selectedColors,
    selectedOccasions,
    selectedFabrics,
    sortBy,
  ]);

  const activeFiltersCount =
    (searchQuery.trim() ? 1 : 0) +
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedGender !== 'all' ? 1 : 0) +
    (priceMax < 350000 ? 1 : 0) +
    selectedSizes.length +
    selectedColors.length +
    selectedOccasions.length +
    selectedFabrics.length;

  return (
    <div className="bg-surface-300 text-neutral-900 min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <motion.nav
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="flex items-center gap-2 text-xs font-nav uppercase tracking-wider text-neutral-500 mb-6"
        >
          <Link href="/" className="hover:text-primary-700 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/collections/all" className="hover:text-primary-700 transition-colors">
            Collections
          </Link>
          {activeCategorySlug && (
            <>
              <span>/</span>
              <span className="text-primary-700 font-semibold font-nav">{collectionTitle}</span>
            </>
          )}
        </motion.nav>

        {/* Collection Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mb-10 pb-6 border-b border-neutral-200"
        >
          <span className="text-xs font-nav uppercase tracking-[0.3em] text-primary-700 block mb-2 font-semibold">
            Archival Haute Couture
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-neutral-900 font-medium">
            {collectionTitle}
          </h1>
          {collectionDescription && (
            <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-2xl mt-2 leading-relaxed">
              {collectionDescription}
            </p>
          )}
          <p className="text-xs font-nav text-primary-700 font-semibold mt-3">
            Showing {filteredProducts.length} curated {filteredProducts.length === 1 ? 'creation' : 'creations'}
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06, ease: 'easeOut' }}
          className="mb-6"
        >
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="Search tailored suits, cashmere overcoats, silk evening gowns..."
          />
        </motion.div>

        {/* Control Bar: Filter Toggle, Active Tags, Grid Switcher, Sort Dropdown */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-surface-100 p-4 rounded-xl border border-neutral-200 shadow-sm"
        >
          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <button
              type="button"
              onClick={() => setIsMobileFilterOpen(true)}
              className="btn-luxury lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium text-xs font-nav uppercase tracking-wider shadow transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Clear Filters Reset */}
            {activeFiltersCount > 0 && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="inline-flex items-center gap-1.5 text-xs text-primary-700 hover:text-primary-800 font-nav uppercase tracking-wider underline transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset ({activeFiltersCount})</span>
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            {/* Grid Switcher (Desktop) */}
            <div className="hidden md:flex items-center gap-1 bg-surface-200 p-1 rounded-lg border border-neutral-300">
              <button
                type="button"
                onClick={() => setGridCols(3)}
                className={`p-1.5 rounded transition-colors ${
                  gridCols === 3
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                title="3 Columns"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setGridCols(4)}
                className={`p-1.5 rounded transition-colors ${
                  gridCols === 4
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
                title="4 Columns"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>

            {/* Sort Select */}
            <div className="flex items-center gap-2 text-xs font-nav">
              <span className="text-neutral-600 uppercase tracking-wider hidden sm:inline font-medium">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating')}
                className="bg-surface-200 border border-neutral-300 text-neutral-900 py-2 px-3 rounded-lg focus:outline-none focus:border-primary-600 text-xs font-nav"
              >
                <option value="featured">Featured Runway Edit</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Main Layout: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 space-y-6 bg-surface-100 p-6 rounded-2xl border border-neutral-200 shadow-sm sticky top-28 text-neutral-900">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <h3 className="font-serif text-lg font-medium text-neutral-900 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-primary-700" />
                <span>Refine Selection</span>
              </h3>
              {activeFiltersCount > 0 && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-[11px] text-primary-700 hover:text-primary-800 underline font-nav transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Gender Filter */}
            <div>
              <label className="block text-xs font-nav uppercase tracking-wider text-primary-700 font-semibold mb-2">
                Wardrobe
              </label>
              <div className="flex gap-2">
                {['all', 'women', 'men'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setSelectedGender(g)}
                    className={`flex-1 py-1.5 text-xs font-nav rounded-lg capitalize transition-colors ${
                      selectedGender === g
                        ? 'bg-primary-600 hover:bg-primary-700 text-white font-medium border border-primary-600 shadow-sm'
                        : 'bg-surface-200 text-neutral-700 border border-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-nav uppercase tracking-wider text-primary-700 font-semibold mb-2">
                Category
              </label>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left text-xs py-1.5 px-2.5 rounded font-sans transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary-100 text-primary-800 font-semibold border border-primary-200'
                      : 'text-neutral-700 hover:text-primary-700 hover:bg-surface-200'
                  }`}
                >
                  All Categories
                </button>
                {ALL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.slug)}
                    className={`w-full text-left text-xs py-1.5 px-2.5 rounded font-sans transition-colors ${
                      selectedCategory === cat.slug
                        ? 'bg-primary-100 text-primary-800 font-semibold border border-primary-200'
                        : 'text-neutral-700 hover:text-primary-700 hover:bg-surface-200'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-nav uppercase tracking-wider text-primary-700 font-semibold">
                  Max Price
                </label>
                <span className="font-serif text-xs font-bold text-neutral-900">
                  {FORMAT_CURRENCY(priceMax)}
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="350000"
                step="10000"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-primary-600 cursor-pointer"
              />
            </div>

            {/* Size Filter */}
            <div>
              <label className="block text-xs font-nav uppercase tracking-wider text-primary-700 font-semibold mb-2">
                Size
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`py-1 px-2.5 text-xs font-nav rounded transition-colors ${
                      selectedSizes.includes(size)
                        ? 'bg-primary-600 hover:bg-primary-700 text-white font-medium border border-primary-600 shadow-sm'
                        : 'bg-surface-200 text-neutral-700 border border-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Swatch Filter */}
            <div>
              <label className="block text-xs font-nav uppercase tracking-wider text-primary-700 font-semibold mb-2">
                Color Palette
              </label>
              <div className="flex flex-wrap gap-2">
                {availableColors.map((color) => {
                  const isSelected = selectedColors.includes(color.name);
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => toggleColor(color.name)}
                      className={`w-6 h-6 rounded-full border transition-all ${
                        isSelected
                          ? 'ring-2 ring-primary-600 scale-110 border-white shadow-sm'
                          : 'border-neutral-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Occasion Filter */}
            <div>
              <label className="block text-xs font-nav uppercase tracking-wider text-primary-700 font-semibold mb-2">
                Occasion
              </label>
              <div className="space-y-1.5">
                {availableOccasions.map((occ) => (
                  <label key={occ} className="flex items-center gap-2 text-xs font-sans text-neutral-700 cursor-pointer hover:text-neutral-900">
                    <input
                      type="checkbox"
                      checked={selectedOccasions.includes(occ)}
                      onChange={() => toggleOccasion(occ)}
                      className="accent-primary-600 rounded"
                    />
                    <span>{occ}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fabric Filter */}
            <div>
              <label className="block text-xs font-nav uppercase tracking-wider text-primary-700 font-semibold mb-2">
                Fabrics &amp; Materials
              </label>
              <div className="space-y-1.5">
                {availableFabrics.map((fabric) => (
                  <label key={fabric} className="flex items-center gap-2 text-xs font-sans text-neutral-700 cursor-pointer hover:text-neutral-900">
                    <input
                      type="checkbox"
                      checked={selectedFabrics.includes(fabric)}
                      onChange={() => toggleFabric(fabric)}
                      className="accent-primary-600 rounded"
                    />
                    <span>{fabric}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-9">
            <AnimatePresence mode="wait">
              {filteredProducts.length === 0 ? (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="bg-surface-100 rounded-2xl p-16 text-center border border-neutral-200 shadow-sm space-y-4"
                >
                  <div className="w-16 h-16 rounded-full border border-neutral-300 flex items-center justify-center text-primary-600 mx-auto bg-surface-200">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl text-neutral-900 font-medium">
                    No Luxury Pieces Match Selected Filters
                  </h3>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto font-sans leading-relaxed">
                    Try widening your price range, clearing specific colors or search keywords, or resetting filters to explore all creations.
                  </p>
                  <button
                    type="button"
                    onClick={clearAllFilters}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium text-xs font-nav uppercase tracking-wider shadow transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset All Filters</span>
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key={`grid-${selectedCategory}-${selectedGender}-${sortBy}-${gridCols}`}
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.035,
                        delayChildren: 0.02,
                      },
                    },
                  }}
                  className={`grid grid-cols-1 sm:grid-cols-2 ${
                    gridCols === 4 ? 'xl:grid-cols-4' : 'xl:grid-cols-3'
                  } gap-6`}
                >
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={{
                        hidden: { opacity: 0, y: 12 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.35, ease: 'easeOut' },
                        },
                      }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={ALL_CATEGORIES}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
        formatPrice={FORMAT_CURRENCY}
        selectedSizes={selectedSizes}
        toggleSize={toggleSize}
        availableSizes={availableSizes}
        selectedColors={selectedColors}
        toggleColor={toggleColor}
        availableColors={availableColors}
        selectedOccasions={selectedOccasions}
        toggleOccasion={toggleOccasion}
        availableOccasions={availableOccasions}
        selectedFabrics={selectedFabrics}
        toggleFabric={toggleFabric}
        availableFabrics={availableFabrics}
        activeFiltersCount={activeFiltersCount}
        clearAllFilters={clearAllFilters}
        resultsCount={filteredProducts.length}
      />
    </div>
  );
};
