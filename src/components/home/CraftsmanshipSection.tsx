'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { AkLoader } from '@/components/common/AkLoader';

const Craftsmanship3DViewer = dynamic(
  () => import('@/components/three/Craftsmanship3DViewer').then((mod) => mod.Craftsmanship3DViewer),
  {
    ssr: false,
    loading: () => (
      <AkLoader
        variant="embedded"
        message="Loading Craftsmanship Specimen"
        subtitle="Three.js Master Weave"
        className="min-h-[520px]"
      />
    ),
  }
);

export const CraftsmanshipSection: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-neutral-900 text-surface-100 relative overflow-hidden">
      {/* Decorative Arch Backdrop Line */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] border border-primary-400/15 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 3D Interactive Canvas */}
          <div className="lg:col-span-7">
            <Craftsmanship3DViewer />
          </div>

          {/* Right Column: Editorial Narrative */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary-900/60 border border-primary-500/30 text-xs font-nav uppercase tracking-widest text-primary-200">
              <Sparkles className="w-3.5 h-3.5 text-primary-400" />
              <span>Haute Atelier Artistry</span>
            </div>

            <div className="space-y-2">
              <span className="block font-nav text-xs uppercase tracking-[0.3em] text-primary-300 font-semibold">
                The Anatomy of Haute Couture
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-white font-medium leading-tight">
                BEAUTY IN <br />
                <span className="italic font-light text-primary-200">EVERY FIBER</span>
              </h2>
            </div>

            <p className="text-sm text-neutral-300 font-sans leading-relaxed">
              Every AK ATELIER silhouette is an archival dialogue between master tailoring and pure natural fibers. We commission historical European mills where double-face cashmere, liquid silk satins, and sculpted wool twills undergo hundreds of hours of patient artisan craftsmanship.
            </p>

            {/* Pillar Bullets */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-nav uppercase tracking-wider text-white font-semibold">
                    Certified Virgin Cashmere &amp; Double-Faced Wool
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                    14-micron noble fibers yielding architectural warmth and whisper-weight luxury.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-nav uppercase tracking-wider text-white font-semibold">
                    Three-Dimensional Architectural Darting
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                    Engineered canvas interlinings sculpted over bespoke wooden torso forms.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-nav uppercase tracking-wider text-white font-semibold">
                    Florentine &amp; Lyonnaise Heritage Looms
                  </h4>
                  <p className="text-[11px] text-neutral-400 font-sans mt-0.5">
                    Centuries of uninterrupted guild lineage creating fluid silk crêpe de chine.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/our-craft"
                className="inline-flex items-center gap-2 text-xs font-nav uppercase tracking-[0.2em] text-primary-300 hover:text-primary-200 transition-colors group font-semibold"
              >
                <span>Discover Master Tailoring Lineage</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
