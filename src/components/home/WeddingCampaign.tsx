'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export const WeddingCampaign: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-neutral-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Campaign Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-nav uppercase tracking-[0.3em] text-primary-300 block font-semibold">
            The Wedding Edit 2026
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-white">
            FOR THE MOMENTS <br className="hidden sm:inline" />
            <span className="italic font-light text-primary-200">THAT LAST FOREVER</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300/80 font-sans max-w-xl mx-auto mt-2">
            Discover statement pieces crafted for black-tie galas, sacred ceremonies, and unforgettable beginnings. Bespoke coordinated evening gowns and tailored tuxedos.
          </p>
        </div>

        {/* Cinematic Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bridal Gown Card */}
          <div className="group relative rounded-2xl overflow-hidden min-h-[480px] sm:min-h-[580px] flex flex-col justify-end p-6 sm:p-10 border border-neutral-700/60 shadow-2xl">
            {/* Background Editorial Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-108"
              style={{
                backgroundImage: `url('/images/products/3d_black_silk_gown.webp')`,
              }}
            />
            {/* Dark Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

            <div className="relative z-10 space-y-3">
              <span className="text-[11px] font-nav uppercase tracking-widest text-primary-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary-400" />
                Couture Bridal &amp; Gala
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-white font-medium">
                Mulberry Silk Satin &amp; Column Gowns
              </h3>
              <p className="text-xs text-neutral-300/80 max-w-md font-sans">
                Bias-cut heavy silk satin column silhouettes tailored with couture precision in our Milanese flagship ateliers.
              </p>
              <div className="pt-2">
                <Link
                  href="/collections/evening-dresses"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white border border-primary-400/40 text-xs font-nav uppercase tracking-widest transition-all"
                >
                  <span>Shop Gowns</span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary-200" />
                </Link>
              </div>
            </div>
          </div>

          {/* Tuxedo Card */}
          <div className="group relative rounded-2xl overflow-hidden min-h-[480px] sm:min-h-[580px] flex flex-col justify-end p-6 sm:p-10 border border-neutral-700/60 shadow-2xl">
            {/* Background Editorial Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-108"
              style={{
                backgroundImage: `url('/images/products/3d_charcoal_wool_tuxedo.webp')`,
              }}
            />
            {/* Dark Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

            <div className="relative z-10 space-y-3">
              <span className="text-[11px] font-nav uppercase tracking-widest text-primary-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-primary-400" />
                The Bespoke Groom
              </span>
              <h3 className="font-serif text-2xl sm:text-4xl text-white font-medium">
                Super 150s Wool Tuxedos
              </h3>
              <p className="text-xs text-neutral-300/80 max-w-md font-sans">
                Full-canvas construction in Italian virgin wool with silk grosgrain peak lapels and hand-cast monogram buttons.
              </p>
              <div className="pt-2">
                <Link
                  href="/collections/bespoke-suiting"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white border border-primary-400/40 text-xs font-nav uppercase tracking-widest transition-all"
                >
                  <span>Shop Suiting</span>
                  <ArrowRight className="w-3.5 h-3.5 text-primary-200" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
