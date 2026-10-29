'use client';

import React from 'react';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';

export interface FilterDrawerCategory {
  id: string;
  name: string;
  slug: string;
}

export interface FilterDrawerColor {
  name: string;
  hex: string;
}

export interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: FilterDrawerCategory[];
  priceMax: number;
  setPriceMax: (price: number) => void;
  formatPrice?: (price: number) => string;
  selectedSizes: string[];
  toggleSize: (size: string) => void;
  availableSizes: string[];
  selectedColors: string[];
  toggleColor: (color: string) => void;
  availableColors: FilterDrawerColor[];
  selectedOccasions: string[];
  toggleOccasion: (occasion: string) => void;
  availableOccasions: string[];
  selectedFabrics?: string[];
  toggleFabric?: (fabric: string) => void;
  availableFabrics?: string[];
  activeFiltersCount: number;
  clearAllFilters: () => void;
  resultsCount: number;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  selectedGender,
  setSelectedGender,
  selectedCategory,
  setSelectedCategory,
  categories,
  priceMax,
  setPriceMax,
  formatPrice = (p) => `$${p.toLocaleString()}`,
  selectedSizes,
  toggleSize,
  availableSizes,
  selectedColors,
  toggleColor,
  availableColors,
  selectedOccasions,
  toggleOccasion,
  availableOccasions,
  selectedFabrics = [],
  toggleFabric,
  availableFabrics = [],
  activeFiltersCount,
  clearAllFilters,
  resultsCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden animate-fadeIn">
      {/* Dimmed backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-surface-100 border-l border-neutral-200 text-neutral-900 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
            <h3 className="font-serif text-xl font-medium text-neutral-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-primary-700" />
              <span>Refine Collection</span>
            </h3>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-500 hover:text-neutral-900 rounded-full hover:bg-surface-200 transition-colors"
              aria-label="Close filters"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-6 space-y-6">
            {/* Gender / Wardrobe */}
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
                        ? 'bg-primary-600 hover:bg-primary-700 text-white font-medium shadow-sm'
                        : 'bg-surface-200 text-neutral-700 border border-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-nav uppercase tracking-wider text-primary-700 font-semibold mb-2">
                Category
              </label>
              <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
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
                {categories.map((cat) => (
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

            {/* Price Filter */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-nav uppercase tracking-wider text-primary-700 font-semibold">
                  Max Price
                </label>
                <span className="font-serif text-xs font-bold text-neutral-900">
                  {formatPrice(priceMax)}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="250"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full accent-primary-600 cursor-pointer"
              />
            </div>

            {/* Sizes */}
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
                    className={`py-1 px-3 text-xs font-nav rounded transition-colors ${
                      selectedSizes.includes(size)
                        ? 'bg-primary-600 hover:bg-primary-700 text-white font-medium shadow-sm'
                        : 'bg-surface-200 text-neutral-700 border border-neutral-300 hover:border-neutral-500'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
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

            {/* Occasions */}
            <div>
              <label className="block text-xs font-nav uppercase tracking-wider text-primary-700 font-semibold mb-2">
                Occasions
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableOccasions.map((occ) => (
                  <label
                    key={occ}
                    className="flex items-center gap-2 text-xs font-sans text-neutral-700 cursor-pointer hover:text-neutral-900"
                  >
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

            {/* Fabrics (if available) */}
            {availableFabrics.length > 0 && toggleFabric && (
              <div>
                <label className="block text-xs font-nav uppercase tracking-wider text-primary-700 font-semibold mb-2">
                  Materials &amp; Fabrics
                </label>
                <div className="space-y-1.5 max-h-36 overflow-y-auto">
                  {availableFabrics.map((fabric) => (
                    <label
                      key={fabric}
                      className="flex items-center gap-2 text-xs font-sans text-neutral-700 cursor-pointer hover:text-neutral-900"
                    >
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
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-neutral-200 flex gap-3 bg-surface-100">
          <button
            type="button"
            onClick={clearAllFilters}
            className="flex-1 py-3 rounded-full bg-surface-200 text-neutral-700 border border-neutral-300 hover:border-neutral-500 text-xs font-nav uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium text-xs font-nav uppercase tracking-wider shadow transition-colors"
          >
            Show ({resultsCount})
          </button>
        </div>
      </div>
    </div>
  );
};
