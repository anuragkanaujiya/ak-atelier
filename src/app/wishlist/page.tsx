'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { ProductCard } from '@/components/product/ProductCard';
import { Heart, ArrowRight, Trash2 } from 'lucide-react';

export default function WishlistPage() {
  const { wishlistProducts, clearWishlist, wishlistCount } = useWishlist();

  if (wishlistCount === 0) {
    return (
      <div className="bg-surface-300 min-h-screen pt-32 pb-24 text-neutral-900 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto px-6 text-center space-y-6">
          <div className="w-20 h-20 rounded-full border border-primary-300 bg-surface-100 flex items-center justify-center text-primary-600 mx-auto shadow-sm">
            <Heart className="w-10 h-10 text-primary-600" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-medium">
            Your Wishlist is Empty
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            Curate your personal couture wardrobe by saving tailored wool coats, silk crepe evening gowns, and bespoke cashmere separates as you browse.
          </p>
          <div>
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white text-xs font-nav uppercase tracking-widest font-semibold transition-all shadow-md hover:scale-102"
            >
              <span>Explore The Collections</span>
              <ArrowRight className="w-4 h-4 text-primary-200" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface-300 text-neutral-900 min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-200 mb-10 gap-4">
          <div>
            <span className="text-xs font-nav uppercase tracking-[0.3em] text-primary-700 block mb-1 font-semibold">
              Curated Favorites
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl text-neutral-900 font-medium">
              SAVED ATELIER PORTFOLIO
            </h1>
            <p className="text-xs font-nav text-neutral-600 mt-1">
              {wishlistCount} {wishlistCount === 1 ? 'silhouette' : 'silhouettes'} reserved in your personal archive
            </p>
          </div>

          <button
            onClick={clearWishlist}
            className="inline-flex items-center gap-2 text-xs font-nav uppercase tracking-wider text-neutral-600 hover:text-error-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All Saved</span>
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
