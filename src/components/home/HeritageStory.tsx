'use client';

import React from 'react';
import Link from 'next/link';
import { CRAFTSMANSHIP_PILLARS } from '@/data/craftsmanship';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeritageStory: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-surface-300 text-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-neutral-200 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-nav uppercase tracking-[0.3em] text-primary-700 block mb-2 font-semibold">
              Ancestral Lineage
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-neutral-900 font-medium">
              OUR CRAFTSMANSHIP
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 font-sans mt-3">
              We collaborate with master artisan families across Milan, Paris, and Florence to create handcrafted sartorial luxury, bespoke tailoring, and heritage silhouettes.
            </p>
          </div>

          <Link
            href="/our-craft"
            className="text-xs font-nav uppercase tracking-widest text-primary-700 hover:text-primary-800 flex items-center gap-1.5 font-semibold transition-colors"
          >
            <span>Explore The Craft Story</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CRAFTSMANSHIP_PILLARS.map((pillar, index) => (
            <div
              key={pillar.title}
              className="group flex flex-col justify-between bg-surface-100 rounded-xl overflow-hidden border border-neutral-200 hover:border-primary-400 transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  loading="lazy"
                />
                <span className="absolute bottom-2.5 left-2.5 text-[10px] font-nav uppercase tracking-wider bg-neutral-900/90 text-primary-200 px-2.5 py-1 rounded">
                  {pillar.artisanRegion}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-nav uppercase tracking-widest text-primary-600 font-semibold">
                    {pillar.subtitle}
                  </span>
                  <h3 className="font-serif text-xl text-neutral-900 font-medium mt-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-neutral-600 font-sans mt-2 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-200 text-[11px] font-nav text-primary-700 font-medium">
                  {pillar.technique}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
