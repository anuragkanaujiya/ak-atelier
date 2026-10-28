'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { FORMAT_CURRENCY } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingBag, Check } from 'lucide-react';

/*
 * ============================================================================
 * COMPONENT: HorizontalProductCard
 * ============================================================================
 * Matches the reference layout with:
 * - Left: Aspect image with floating rating pill
 * - Right: Title, subtitle, interactive size buttons, price & circular gold action button
 *
 * Backend integration:
 * Receives standard backend Product entity. When user clicks the circular gold
 * button, the active selected size is passed directly to the Cart service/context.
 * ============================================================================
 */

interface HorizontalProductCardProps {
  product: Product;
  priority?: boolean;
}

export const HorizontalProductCard: React.FC<HorizontalProductCardProps> = ({
  product,
  priority = false,
}) => {
  const { addToCart } = useCart();
  // Default to 'M' size as shown in user reference screenshot
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || 'M');
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Call CartContext addToCart with user-selected size
    const defaultColor = product.colors[0]?.name || 'Standard';
    addToCart(product, defaultColor, selectedSize, 1);

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group flex items-center gap-2 xs:gap-2.5 sm:gap-3.5 lg:gap-4 bg-surface-100 rounded-xl sm:rounded-2xl p-2 xs:p-2.5 sm:p-3.5 lg:p-4 border border-neutral-200/80 shadow-[0_2px_12px_rgba(36,33,41,0.04)] hover:shadow-[0_8px_24px_rgba(129,119,159,0.12)] hover:border-primary-400/50 transition-all duration-300 w-[225px] xs:w-[250px] sm:w-[320px] md:w-[350px] lg:w-[390px] shrink-0 select-none">
      {/* Left Column: Product Image with Floating Rating Pill */}
      <Link
        href={`/product/${product.id}`}
        className="relative w-[76px] xs:w-[88px] sm:w-[115px] lg:w-[130px] h-[96px] xs:h-[110px] sm:h-[132px] lg:h-[145px] rounded-lg sm:rounded-xl overflow-hidden shrink-0 bg-surface-200 block"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
          loading={priority ? 'eager' : 'lazy'}
          sizes="(max-width: 640px) 88px, 130px"
          decoding="async"
        />

        {/* Rating Pill Badge (Bottom-Left of Image) */}
        <div className="absolute bottom-1 left-1 sm:bottom-1.5 sm:left-1.5 px-1.5 py-0.5 rounded-full bg-surface-100/95 backdrop-blur-md text-[8px] xs:text-[9px] sm:text-[10px] font-bold text-neutral-900 shadow-sm flex items-center gap-0.5 border border-neutral-200">
          <Star className="w-2.5 h-2.5 fill-warning-500 text-warning-500" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </Link>

      {/* Right Column: Title, Subtitle, Size Selector, Price & Add Button */}
      <div className="flex-1 min-w-0 flex flex-col justify-between h-full py-0.5">
        <div>
          {/* Product Name */}
          <Link
            href={`/product/${product.id}`}
            className="font-serif text-[11px] xs:text-xs sm:text-sm lg:text-[15px] text-neutral-900 font-semibold group-hover:text-primary-700 transition-colors line-clamp-1 block leading-tight"
          >
            {product.name}
          </Link>

          {/* Subtitle / Category Tagline */}
          <p className="text-[9px] xs:text-[10px] sm:text-xs text-neutral-600 font-sans line-clamp-1 mt-0.5 leading-snug">
            {product.tagline || product.categoryName}
          </p>

          {/* Size Selector Box Row (S, M, L, XL - interactive with active dark state) */}
          <div className="flex items-center gap-1 sm:gap-1.5 my-1 xs:my-1.5 sm:my-2">
            {['S', 'M', 'L', 'XL'].map((size) => {
              const isSelected = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSize(size);
                  }}
                  className={`w-5 h-5 text-[9px] xs:w-5.5 xs:h-5.5 xs:text-[10px] sm:w-6.5 sm:h-6.5 sm:text-xs rounded font-semibold flex items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-primary-600 text-white shadow-sm ring-1 ring-primary-500 scale-102'
                      : 'bg-surface-200 text-neutral-700 border border-neutral-200 hover:border-primary-400 hover:text-primary-800'
                  }`}
                  aria-label={`Select size ${size}`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Row: Price + Circular Action Button */}
        <div className="flex items-center justify-between pt-1 sm:pt-1.5 border-t border-neutral-200/60">
          <span className="font-serif text-xs xs:text-sm sm:text-base lg:text-lg font-bold text-neutral-900">
            {FORMAT_CURRENCY(product.price)}
          </span>

          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 lg:w-8.5 lg:h-8.5 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md active:scale-90 cursor-pointer ${
              added
                ? 'bg-success-600 text-white'
                : 'bg-primary-600 hover:bg-primary-700 text-white shadow-md hover:shadow-primary-600/30'
            }`}
            title="Add to Shopping Bag"
            aria-label="Add to Bag"
          >
            {added ? (
              <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            ) : (
              <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
