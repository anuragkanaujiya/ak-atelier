'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BridalEnsemble } from '@/data/bridal';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { Heart, Check, Sparkles } from 'lucide-react';

interface BridalCardProps {
  ensemble: BridalEnsemble;
  isActive: boolean;
  onSelect: () => void;
  priority?: boolean;
}

export const BridalCard: React.FC<BridalCardProps> = ({
  ensemble,
  isActive,
  onSelect,
  priority = false,
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const inWishlist = isInWishlist(ensemble.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const targetProduct = ensemble.product || ensemble;
    const defaultColor = targetProduct.colors?.[0]?.name || 'Bridal Edition';
    const defaultSize = targetProduct.sizes?.[0] || 'Standard';
    addToCart(targetProduct, defaultColor, defaultSize, 1);

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div
      onClick={onSelect}
      className={`group shrink-0 w-[155px] xs:w-[175px] sm:w-[220px] lg:w-[260px] flex flex-col rounded-xl overflow-hidden cursor-pointer transition-all duration-300 shadow-xl hover:shadow-2xl select-none ${
        isActive
          ? 'bg-neutral-900 ring-2 ring-primary-500 border border-primary-400 shadow-2xl scale-[1.02]'
          : 'bg-neutral-900 border border-neutral-700/60 hover:border-primary-400 hover:bg-neutral-850'
      }`}
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[3/4.2] overflow-hidden bg-black/40 block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ensemble.image}
          alt={ensemble.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 pointer-events-none"
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(ensemble.id);
          }}
          className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full backdrop-blur-md transition-all z-10 ${
            inWishlist
              ? 'bg-primary-900 text-primary-300 border border-primary-500/50 shadow'
              : 'bg-neutral-900/60 hover:bg-neutral-900 text-white shadow-sm border border-white/10'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
              inWishlist ? 'fill-primary-400 text-primary-400' : ''
            }`}
          />
        </button>

        {/* Bottom Left Category Tag */}
        <div className="absolute bottom-2 left-2 sm:bottom-2.5 sm:left-2.5 z-10 max-w-[85%]">
          <span className="inline-block truncate text-[8px] xs:text-[9px] sm:text-[10px] font-nav uppercase tracking-wider bg-neutral-900/85 text-primary-200 px-1.5 py-0.5 sm:px-2 rounded border border-primary-500/30 backdrop-blur-sm">
            {ensemble.categoryName}
          </span>
        </div>

        {/* Top Left Active Badge */}
        {isActive && (
          <div className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 inline-flex items-center gap-1 bg-neutral-900/85 backdrop-blur-md text-primary-200 text-[8px] xs:text-[9px] font-nav uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 rounded-full border border-primary-500/40">
            <Sparkles className="w-2.5 h-2.5 text-primary-300 animate-pulse" />
            <span>Featured</span>
          </div>
        )}
      </div>

      {/* Card Body Details */}
      <div className="p-2.5 xs:p-3 sm:p-4 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3 bg-inherit">
        <div>
          <h4 className="font-serif text-xs sm:text-base text-white font-medium group-hover:text-primary-200 transition-colors line-clamp-1">
            {ensemble.name}
          </h4>
          <p className="text-[9px] xs:text-[10px] sm:text-xs text-neutral-300 font-sans line-clamp-1 mt-0.5">
            {ensemble.craft || ensemble.tagline}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-neutral-700/60 gap-1.5">
          <span className="font-serif text-xs xs:text-sm sm:text-base font-bold text-primary-300 shrink-0">
            {ensemble.formattedPrice}
          </span>

          <div className="flex items-center gap-1 sm:gap-2">
            <Link
              href={ensemble.href}
              onClick={(e) => e.stopPropagation()}
              className="text-[9px] sm:text-[10px] font-nav uppercase tracking-wider text-neutral-400 hover:text-primary-300 transition-colors hidden sm:inline-block"
            >
              Details
            </Link>

            <button
              onClick={handleAddToCart}
              className={`px-2 xs:px-2.5 sm:px-3 py-1.5 xs:py-2 rounded-full text-[10px] sm:text-xs font-nav uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center gap-1 shadow-md active:scale-95 shrink-0 ${
                added
                  ? 'bg-success-700 text-white'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                  <span className="text-[9px] sm:text-[10px]">ADDED</span>
                </>
              ) : (
                <>
                  <span className="text-[9px] sm:text-[10px] hidden xs:inline">ADD TO BAG</span>
                  <span className="text-[9px] sm:text-[10px] xs:hidden">ADD</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
