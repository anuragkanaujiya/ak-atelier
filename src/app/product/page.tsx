import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';

export const metadata = {
  title: 'Couture Silhouettes & Archives — AK ATELIER',
  description:
    'Explore the complete repertory of AK ATELIER Haute Couture: bias-cut silk evening gowns, hand-canvassed suiting, pure Mongolian cashmere outerwear, and Tuscan leather goods.',
};

export default function ProductIndexPage() {
  const featuredRunway = PRODUCTS.slice(0, 12);

  return (
    <div className="bg-surface-300 text-neutral-900 min-h-screen pt-28 pb-24">
      {/* Editorial Header Banner */}
      <section className="bg-surface-100 py-16 sm:py-24 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-100 border border-primary-200 text-xs font-nav uppercase tracking-[0.25em] text-primary-800">
            <Sparkles className="w-3.5 h-3.5 text-primary-700" />
            <span>The Permanent Archives</span>
          </div>

          <h1 className="font-sans font-black tracking-[-0.03em] text-4xl sm:text-6xl lg:text-7xl uppercase text-neutral-900 leading-tight">
            THE SARTORIAL <span className="font-serif italic font-light text-primary-700">REPERTORY</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 font-sans max-w-2xl mx-auto leading-relaxed">
            Every hand-canvassed suit, bias-cut silk column gown, and pure double-faced cashmere overcoat engineered with European architectural tailoring.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-2">
            <Link
              href="/collections/all"
              className="btn-luxury px-6 py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-nav text-xs uppercase tracking-widest transition-all shadow-md"
            >
              Filter Full Collection (240+ Silhouettes)
            </Link>
            <Link
              href="/our-craft"
              className="btn-luxury px-6 py-2.5 rounded-full bg-surface-200 hover:bg-surface-100 text-neutral-800 border border-neutral-300 font-nav text-xs uppercase tracking-widest transition-all"
            >
              Explore Living Craft Archives
            </Link>
          </div>
        </div>
      </section>

      {/* Main Catalog Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-200">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-neutral-900">
              Runway Ensembles &amp; Master Silhouettes
            </h2>
            <p className="text-xs text-neutral-500 font-sans mt-0.5">
              Certified authentic craftsmanship · Milan &amp; Paris
            </p>
          </div>
          <Link
            href="/collections/all"
            className="text-xs font-nav uppercase tracking-wider text-primary-700 hover:text-primary-800 flex items-center gap-1.5 transition-colors font-medium"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {featuredRunway.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Bespoke VIP Concierge Footer */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="bg-surface-100 rounded-3xl p-8 sm:p-12 border border-neutral-200 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-nav uppercase tracking-[0.25em] text-primary-700 font-semibold block">
              Private Commission
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-neutral-900 font-medium">
              Require A Custom Bespoke Silhouette?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-lg">
              Book a private appointment at our Milan or Paris salons, or commission custom alterations with our master tailors.
            </p>
          </div>

          <Link
            href="/account"
            className="btn-luxury px-8 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white font-nav text-xs uppercase tracking-widest font-semibold shrink-0 shadow-lg"
          >
            Book Atelier Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
