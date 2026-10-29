import React from 'react';
import Link from 'next/link';
import { CRAFTSMANSHIP_PILLARS } from '@/data/craftsmanship';
import { Craftsmanship3DViewer } from '@/components/three/Craftsmanship3DViewer';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Our Craft & Heritage — AK ATELIER Haute Couture',
  description:
    'Discover the Milanese tailoring traditions, Biella cashmere weaving, Lake Como silk mills, and Florentine leather finishing behind AK ATELIER haute couture.',
};

export default function OurCraftPage() {
  return (
    <div className="bg-surface-300 text-neutral-900 min-h-screen pt-28 pb-24">
      {/* Editorial Hero Banner */}
      <section className="bg-surface-100 py-20 lg:py-28 relative overflow-hidden border-b border-neutral-200">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-[750px] h-[950px] border border-primary-300 rounded-t-full" />
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-6">
          <span className="text-xs font-nav uppercase tracking-[0.35em] text-primary-700 block font-semibold">
            The Living Archives
          </span>

          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-neutral-900 leading-tight">
            CENTURIES OF SARTORIAL MASTERY, <br />
            <span className="italic font-light text-primary-700">TAILORED FOR ETERNITY</span>
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 font-sans max-w-2xl mx-auto leading-relaxed">
            At AK ATELIER, we do not simply design garments; we preserve an unbroken lineage of European haute couture artisans. From the rhythmic water-jet looms of Lake Como to the quiet precision of hand-canvassed suiting in Milan and Florence.
          </p>
        </div>
      </section>

      {/* Interactive 3D Textile Showcase */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-nav uppercase tracking-[0.25em] text-primary-700 font-semibold">
            Interactive Atelier Specimen
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-medium">
            ANATOMY OF A HAUTE COUTURE WEAVE
          </h2>
          <p className="text-xs text-neutral-600 font-sans">
            Rotate the 3D medallion and click on interactive markers to inspect certified Italian silk warps, double-faced cashmere weave, and hand-embroidered metallic accents.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Craftsmanship3DViewer />
        </div>
      </section>

      {/* The 4 Ancestral Pillars */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {CRAFTSMANSHIP_PILLARS.map((pillar, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={pillar.title}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${
                isEven ? '' : 'lg:flex-row-reverse'
              }`}
            >
              <div className={`lg:col-span-6 ${isEven ? 'order-1' : 'order-1 lg:order-2'}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border border-neutral-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-surface-100/95 backdrop-blur-md text-neutral-900 text-xs font-nav uppercase tracking-wider px-3.5 py-1 rounded-full border border-neutral-200 shadow-sm font-medium">
                    {pillar.artisanRegion}
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-6 space-y-4 ${isEven ? 'order-2' : 'order-2 lg:order-1'}`}>
                <span className="text-xs font-nav uppercase tracking-[0.25em] text-primary-700 font-semibold">
                  {pillar.subtitle}
                </span>

                <h3 className="font-serif text-3xl sm:text-4xl text-neutral-900 font-medium">
                  {pillar.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
                  {pillar.description}
                </p>

                <div className="p-4 bg-surface-100 rounded-xl border border-neutral-200 flex items-center gap-3 shadow-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary-700 shrink-0" />
                  <div>
                    <h5 className="font-nav text-xs uppercase tracking-wider text-neutral-900 font-semibold">
                      Master Technique
                    </h5>
                    <p className="text-xs text-neutral-600 font-sans mt-0.5">
                      {pillar.technique}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* CTA Box */}
      <section className="max-w-4xl mx-auto px-6 mt-16 text-center bg-surface-100 p-12 rounded-3xl border border-neutral-200 shadow-xl space-y-6">
        <Sparkles className="w-8 h-8 text-primary-700 mx-auto" />
        <h3 className="font-serif text-3xl sm:text-4xl font-medium text-neutral-900">
          COMMISSION YOUR BESPOKE HEIRLOOM
        </h3>
        <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto font-sans leading-relaxed">
          Book a private styling consultation at our flagship ateliers in Milan and Paris, or schedule a virtual trunk fitting with our master tailors.
        </p>
        <div>
          <Link
            href="/account"
            className="btn-luxury inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium text-xs font-nav uppercase tracking-widest shadow-md transition-all cursor-pointer"
          >
            <span>Book Private Atelier Appointment</span>
            <ArrowRight className="w-4 h-4 text-white" />
          </Link>
        </div>
      </section>
    </div>
  );
}
