'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { WOMEN_CATEGORIES, MEN_CATEGORIES } from '@/data/categories';
import { ArrowUpRight } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'women' | 'men'>('women');

  const categories = activeTab === 'women' ? WOMEN_CATEGORIES : MEN_CATEGORIES;

  return (
    <section className="py-20 lg:py-28 bg-surface-300 text-neutral-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-neutral-200 gap-6">
          <div>
            <span className="text-xs font-nav uppercase tracking-[0.3em] text-primary-700 block mb-2 font-semibold">
              Curated Wardrobe
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-neutral-900 font-medium">
              SHOP BY CATEGORY
            </h2>
          </div>

          {/* Women / Men Toggle Pills */}
          <div className="flex items-center gap-2 bg-surface-200 p-1.5 rounded-full border border-neutral-300">
            <button
              onClick={() => setActiveTab('women')}
              className={`px-6 py-2 rounded-full text-xs font-nav uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'women'
                  ? 'bg-primary-600 text-white shadow-md font-semibold'
                  : 'text-neutral-700 hover:text-neutral-900'
              }`}
            >
              Women&rsquo;s Couture
            </button>
            <button
              onClick={() => setActiveTab('men')}
              className={`px-6 py-2 rounded-full text-xs font-nav uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === 'men'
                  ? 'bg-primary-600 text-white shadow-md font-semibold'
                  : 'text-neutral-700 hover:text-neutral-900'
              }`}
            >
              Men&rsquo;s Regalia
            </button>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((cat, index) => (
            <Link
              key={cat.id}
              href={`/collections/${cat.slug}`}
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 aspect-[3/4] sm:aspect-[4/5] flex flex-col justify-end p-4 sm:p-6 shadow-md hover:shadow-2xl transition-all duration-500 border border-neutral-700/50 hover:border-primary-400"
            >
              {/* Background Image with Zoom */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
              />

              {/* Gradient Scrim for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:via-black/50 transition-colors" />

              {/* Card Content */}
              <div className="relative z-10 flex items-end justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs font-nav uppercase tracking-widest text-primary-300 block mb-1 font-semibold">
                    {cat.itemCount} Ensembles
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl text-white font-medium group-hover:text-primary-200 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-neutral-300/80 hidden sm:block mt-1 font-sans line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>

                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-600/30 backdrop-blur-md border border-primary-400/40 flex items-center justify-center text-primary-200 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 transition-all shrink-0 ml-2">
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
