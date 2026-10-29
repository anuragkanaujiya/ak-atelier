'use client';

import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedCollection: React.FC = () => {
  // Select the premier 6-8 royal edit products
  const featuredProducts = PRODUCTS.slice(0, 8);

  return (
    <section className="py-20 lg:py-28 bg-surface-300 text-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-100 border border-primary-200 text-xs font-nav uppercase tracking-widest text-primary-800 font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-primary-600" />
            <span>Handcrafted Masterpieces</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-neutral-900">
            THE ATELIER EDIT
          </h2>

          <p className="font-serif italic text-lg sm:text-xl text-neutral-700 font-light">
            &ldquo;Exceptional pieces for moments that become memories.&rdquo;
          </p>

          <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-xl mx-auto">
            Each garment represents months of devotion by master artisans across Milan, Paris, and Florence, tailored with fine Italian fabrics and bespoke craftsmanship.
          </p>
        </div>

        {/* 8-Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white border border-primary-400/40 font-nav text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-md hover:shadow-xl hover:gap-4 group cursor-pointer"
          >
            <span>DISCOVER COMPLETE COUTURE VAULT</span>
            <ArrowRight className="w-4 h-4 text-primary-200 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};
