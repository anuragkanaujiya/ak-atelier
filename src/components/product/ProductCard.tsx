'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useQuickView } from '@/context/QuickViewContext';
import { Heart, Eye, ShoppingBag, Box, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { openQuickView } = useQuickView();

  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [isQuickAdded, setIsQuickAdded] = useState(false);

  const inWishlist = isInWishlist(product.id);

  // Resolve color image with support for imageIndex, color.image, or array index
  const resolveColorImg = (idx: number) => {
    const color = product.colors[idx];
    if (color?.imageIndex !== undefined && color.imageIndex >= 0 && color.imageIndex < product.images.length) {
      return product.images[color.imageIndex];
    }
    if (color?.image) {
      return color.image;
    }
    return product.images[idx] || product.images[0];
  };

  const primaryImg = resolveColorImg(selectedColorIdx);
  // Determine an alternate image that is genuinely different from primaryImg for instant hover
  const hoverImg = product.images.find((img) => img !== primaryImg) || (product.images.length > 1 ? product.images[1] : null);

  // Prefetch alternate hover image during idle time
  React.useEffect(() => {
    if (hoverImg && hoverImg !== primaryImg) {
      const img = new Image();
      img.src = hoverImg;
    }
  }, [hoverImg, primaryImg]);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultColor = product.colors[selectedColorIdx]?.name || product.colors[0]?.name || 'Standard';
    const defaultSize = product.sizes[0] || 'M';
    addToCart(product, defaultColor, defaultSize, 1);
    setIsQuickAdded(true);
    setTimeout(() => setIsQuickAdded(false), 1600);
  };

  const handleOpenQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <div className="group relative flex flex-col w-full select-none transition-all duration-500 p-1">
      {/* =========================================================================
          1. EDITORIAL IMAGE CANVAS (Tall 3:4 Portrait, Full Model Visibility)
      ========================================================================= */}
      <div className="relative aspect-[3/4.2] w-full rounded-2xl overflow-hidden bg-surface-200 shadow-[0_4px_20px_rgba(36,33,41,0.06)] group-hover:shadow-[0_16px_36px_rgba(129,119,159,0.18)] transition-all duration-500 border border-neutral-200 group-hover:border-primary-400">
        <Link href={`/product/${product.id}`} className="absolute inset-0 block overflow-hidden">
          {/* Primary Base Model Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={primaryImg}
            alt={product.name}
            className={`w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 ${
              hoverImg ? 'opacity-100 group-hover:opacity-0' : 'opacity-100'
            }`}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />

          {/* Secondary Editorial Alternate Angle Crossfade */}
          {hoverImg && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={hoverImg}
              alt={`${product.name} drape view`}
              className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 opacity-0 group-hover:opacity-100"
              loading="lazy"
              decoding="async"
            />
          )}

          {/* Gentle Luxury Vignette Gradient at Bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />
        </Link>

        {/* Top Badges (Discreet Imperial Tags) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.badge && (
            <span className="text-[9px] font-nav uppercase tracking-[0.22em] font-bold bg-primary-900/90 text-primary-100 px-3 py-1 rounded-full border border-primary-500/30 shadow-lg backdrop-blur-md">
              {product.badge}
            </span>
          )}
          {product.has3D && (
            <span className="text-[9px] font-nav uppercase tracking-wider bg-neutral-900/75 text-white px-2.5 py-0.5 rounded-full border border-neutral-700 shadow-md flex items-center gap-1 backdrop-blur-md">
              <Box className="w-3 h-3 text-primary-300" />
              <span>3D</span>
            </span>
          )}
        </div>

        {/* Top Right Wishlist Jewel Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md transition-all duration-300 z-10 flex items-center justify-center ${
            inWishlist
              ? 'bg-primary-700 text-white border border-primary-500 scale-105 shadow-md'
              : 'bg-neutral-900/40 hover:bg-neutral-900/75 text-white hover:text-primary-200 border border-white/20 hover:scale-110 shadow-sm'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 transition-transform ${inWishlist ? 'fill-white scale-110' : ''}`} />
        </button>

        {/* Interactive Hover Action Dock: Sleek Frosted Glass Quick View Bar */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2">
          {/* Quick View Button */}
          <button
            onClick={handleOpenQuickView}
            className="btn-luxury flex-1 py-2.5 px-3 rounded-xl bg-neutral-900/90 hover:bg-primary-700 text-white border border-neutral-700 hover:border-primary-500 text-[10px] font-nav uppercase tracking-[0.22em] font-semibold flex items-center justify-center gap-2 transition-all shadow-xl backdrop-blur-md cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-primary-200" />
            <span>Quick View</span>
          </button>

          {/* Quick Bag Button */}
          <button
            onClick={handleQuickAdd}
            className={`btn-luxury w-9 h-9 rounded-xl flex items-center justify-center transition-all shadow-xl cursor-pointer ${
              isQuickAdded
                ? 'bg-success-600 text-white border border-success-500 scale-105'
                : 'bg-primary-600 hover:bg-primary-700 text-white border border-primary-500/40 hover:scale-105'
            }`}
            title="Quick Add to Cart"
            aria-label="Quick Add to Cart"
          >
            {isQuickAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. EDITORIAL TYPOGRAPHY & DETAILS (Clean, Unboxed, High-Fashion Style)
      ========================================================================= */}
      <div className="pt-3.5 pb-1 px-1 flex flex-col space-y-1">
        {/* Category Eyebrow */}
        <p className="text-[10px] font-nav uppercase tracking-[0.25em] text-primary-600 font-semibold">
          {product.categoryName}
        </p>

        {/* Product Title */}
        <Link
          href={`/product/${product.id}`}
          className="font-serif text-lg sm:text-[19px] text-neutral-900 font-medium group-hover:text-primary-700 transition-colors line-clamp-1 tracking-tight leading-snug"
        >
          {product.name}
        </Link>

        {/* Fabric & Craft Drape Subtitle */}
        <p className="text-xs text-neutral-600 font-sans line-clamp-1">
          {product.fabric}
          {product.embroidery ? ` · ${product.embroidery}` : ''}
        </p>

        {/* Pricing & Heritage Swatches Row */}
        <div className="pt-2 flex items-center justify-between">
          {/* Price Block */}
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-base sm:text-lg font-bold text-primary-700 tracking-tight">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-neutral-400 line-through font-sans">
                {formatINR(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color Swatches (Click to Select Shade) */}
          <div className="flex items-center gap-1.5 py-1 px-1">
            {product.colors.slice(0, 3).map((color, idx) => {
              const isSelected = selectedColorIdx === idx;
              return (
                <button
                  key={color.name}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedColorIdx(idx);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all cursor-pointer ${
                    isSelected
                      ? 'ring-2 ring-primary-600 ring-offset-2 ring-offset-surface-100 scale-115 border-white shadow-sm'
                      : 'border-neutral-300 hover:scale-110 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                  aria-label={`Select ${color.name} shade`}
                />
              );
            })}
            {product.colors.length > 3 && (
              <span className="text-[10px] text-neutral-500 font-nav font-medium ml-0.5">
                +{product.colors.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
