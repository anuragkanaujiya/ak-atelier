'use client';

import React from 'react';
import Link from 'next/link';

// Top Guarantee Marquee Items
const MARQUEE_ITEMS = [
  'Super 150s Wool, Hand-Canvassed in Milan',
  'Pure 480 GSM Mongolian Cashmere',
  'Master Atelier Tailoring by Florentine Artisans',
  '28 Momme Heavy Mulberry Silk Satin',
  'Worldwide Express Courier Delivery',
  'Private Salon VIP Fitting Service',
  'Bespoke Custom Measurements Concierge',
];

// Six Expressions of Western Haute Couture
const SIX_MOODS = [
  {
    title: 'SUPER 150s SUITING',
    subtitle: 'Milanese Tailored Architecture',
    slug: 'tailored-suiting',
    image: '/images/products/3d_crema_pant_suit.webp',
  },
  {
    title: 'MONGOLIAN CASHMERE',
    subtitle: '480 GSM Unstructured Drape',
    slug: 'coats-outerwear',
    image: '/images/products/3d_camel_cashmere_coat.webp',
  },
  {
    title: 'MULBERRY SILK SATIN',
    subtitle: 'Bias-Cut Column Gowns',
    slug: 'evening-dresses',
    image: '/images/products/3d_black_silk_gown.webp',
  },
  {
    title: 'COTTON GABARDINE',
    subtitle: 'Weather-Resistant Trenches',
    slug: 'coats-outerwear',
    image: '/images/products/3d_milano_trench_coat.webp',
  },
  {
    title: 'TUSCAN LAMBSKIN',
    subtitle: 'Hand-Finished Nappa Outerwear',
    slug: 'leather-shearling',
    image: '/images/products/3d_espresso_leather_trench.webp',
  },
  {
    title: 'BLACK TIE BESPOKE',
    subtitle: 'Silk Grosgrain Dinner Tuxedos',
    slug: 'bespoke-suiting',
    image: '/images/products/3d_charcoal_wool_tuxedo.webp',
  },
];

export const SixMoodsSection: React.FC = () => {
  return (
    <section id="six-moods" className="relative w-full bg-surface-300 text-neutral-900 overflow-hidden">
      {/* 1. Top Luxury Marquee Ticker Ribbon */}
      <div className="w-full bg-neutral-900 text-primary-200 py-2 overflow-hidden border-y border-primary-500/30 shrink-0">
        <div className="flex animate-marquee whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, repeatIdx) => (
            <div key={repeatIdx} className="flex items-center gap-8 mx-4">
              {MARQUEE_ITEMS.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-6 text-[10px] sm:text-[11px] font-nav uppercase tracking-[0.25em]"
                >
                  <span>{item}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-400 shrink-0" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 2. Main Content: SIX MOODS Header & 6 Arch-Topped Cards */}
      <div className="w-full pt-12 sm:pt-16 pb-12 sm:pb-16 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <h2 className="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.06em] text-neutral-900">
                  HAUTE COUTURE.
                </h2>
                <span className="font-serif italic text-primary-700 text-lg sm:text-xl font-light">
                  Six Expressions
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1.5 max-w-xl font-sans leading-relaxed">
                Six master expressions of Western luxury tailoring, crafted in Milan from superfine virgin wool, cashmere, and liquid silk satin.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-nav uppercase tracking-widest text-primary-700 font-medium">
              <span className="lg:hidden flex items-center gap-1.5 text-[10px] sm:text-xs">
                <span>Swipe to explore</span>
                <span className="text-xs">→</span>
              </span>
              <span className="hidden lg:inline">Milan Flagship Atelier</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
            </div>
          </div>

          {/* 6 Large Architectural Arch Cards */}
          <div className="relative w-full -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0">
            {/* Subtle Gradient Edge Fades (Mobile & Tablet) */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-6 sm:w-10 bg-gradient-to-r from-surface-300 to-transparent z-10 lg:hidden" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-6 sm:w-10 bg-gradient-to-l from-surface-300 to-transparent z-10 lg:hidden" />

            <div
              className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar gap-3.5 sm:gap-4 lg:grid lg:grid-cols-6 lg:gap-5 lg:overflow-visible pb-4 pt-1 lg:pb-0 lg:pt-0"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {SIX_MOODS.map((mood) => (
                <Link
                  key={mood.title}
                  href={`/collections/${mood.slug}`}
                  className="group flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1.5 w-[155px] xs:w-[175px] sm:w-[210px] shrink-0 snap-start lg:w-auto lg:shrink"
                >
                  {/* Arch-topped Card */}
                  <div className="w-full aspect-[3/4.6] rounded-t-full rounded-b-xl overflow-hidden bg-neutral-900 border border-neutral-300 group-hover:border-primary-500 shadow-md group-hover:shadow-xl transition-all duration-500 relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mood.image}
                      alt={mood.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
                  </div>

                  {/* Card Title & Subtitle */}
                  <h3 className="font-sans text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-900 mt-3 group-hover:text-primary-700 transition-colors line-clamp-1">
                    {mood.title}
                  </h3>
                  <span className="text-[10px] text-primary-700 font-serif italic mt-0.5">
                    {mood.subtitle}
                  </span>
                  <span className="w-0 group-hover:w-6 h-0.5 bg-primary-600 transition-all duration-300 mt-1 rounded-full" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
