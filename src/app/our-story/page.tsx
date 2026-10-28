import React from 'react';
import Link from 'next/link';
import { Compass, Feather, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Our Story — AK ATELIER',
  description: 'The story of AK ATELIER: Architectural silhouettes, noble Biella textiles, and European sartorial craftsmanship.',
};

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-surface-300 text-neutral-900 pt-32 pb-24 px-6 sm:px-12">
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-primary-700 font-semibold font-nav hover:text-primary-800 transition-colors inline-flex items-center gap-1"
          >
            &larr; Return to Atelier
          </Link>
          <span className="block text-xs font-semibold font-nav uppercase tracking-widest text-primary-700 mt-4">
            The Maison &amp; Heritage
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-neutral-900 mt-2">
            The Architecture of Elegance
          </h1>
          <p className="font-serif italic text-lg sm:text-xl text-secondary-600 mt-3 leading-relaxed">
            &ldquo;Sculpted silhouettes, noble textiles, and timeless European craftsmanship.&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-neutral-200">
          <div className="p-5 rounded-xl bg-surface-100 border border-neutral-200 shadow-sm space-y-2 text-center">
            <Compass className="w-5 h-5 text-secondary-600 mx-auto" />
            <h3 className="font-serif font-medium text-sm text-neutral-900">Milanese Precision</h3>
            <p className="text-xs text-neutral-600">Hand-canvassed tailoring drafted on Via Montenapoleone</p>
          </div>
          <div className="p-5 rounded-xl bg-surface-100 border border-neutral-200 shadow-sm space-y-2 text-center">
            <Feather className="w-5 h-5 text-secondary-600 mx-auto" />
            <h3 className="font-serif font-medium text-sm text-neutral-900">Noble Textiles</h3>
            <p className="text-xs text-neutral-600">Super 160s Biella worsted wools &amp; pure Como silks</p>
          </div>
          <div className="p-5 rounded-xl bg-surface-100 border border-neutral-200 shadow-sm space-y-2 text-center">
            <Sparkles className="w-5 h-5 text-secondary-600 mx-auto" />
            <h3 className="font-serif font-medium text-sm text-neutral-900">Parisian Poetics</h3>
            <p className="text-xs text-neutral-600">Fluid evening couture with sculptural drape</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-surface-100 border border-neutral-200 shadow-sm space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 font-medium">
              Sartorial Roots in Northern Italy
            </h2>
            <p className="text-sm font-sans text-neutral-600 leading-relaxed">
              AK ATELIER was founded upon a singular principle: that true luxury lives in the harmony between architectural cut and the tactile integrity of noble fibers. Born within the historic sartorial corridor of Milan, the maison unites the structural discipline of bespoke Italian suiting with the effortless fluidity of Parisian evening couture.
            </p>
            <p className="text-sm font-sans text-neutral-600 leading-relaxed">
              Our wools and cashmeres originate from century-old family mills in Biella, Italy, where mountain runoff water washes fibers into unmatched softness. Along the quiet shores of Lake Como, master weavers craft our structured silk faille, duchess satin, and ethereal mousseline. Every piece is constructed with internal floating horsehair canvas, allowing each garment to breathe and mold gracefully to the client&rsquo;s posture.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-surface-100 border border-neutral-200 shadow-sm space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 font-medium">
              The Modern Wardrobe: Beyond Seasons
            </h2>
            <p className="text-sm font-sans text-neutral-600 leading-relaxed">
              We reject transient micro-trends. Instead, AK ATELIER curates enduring capsule collections&mdash;sharp double-breasted blazers, hand-stitched double-faced cashmere overcoats, crisp poplin shirting, and bias-cut silk evening gowns. Every pocket is hand-besomed, buttons are carved from natural buffalo horn, and every hem is finished by our generational seamstresses.
            </p>
            <p className="text-sm font-sans text-neutral-600 leading-relaxed">
              When you put on an AK ATELIER garment, you step into an enduring legacy of sartorial mastery designed to be worn with poise across a lifetime.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-surface-100 border border-neutral-200 shadow-sm text-center space-y-3">
            <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 font-medium">
              Experience the Ateliers
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
              Discover our private salon suites in Milan and Paris, or schedule a personal consultation with our master cutters.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/stores"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium text-xs tracking-wider uppercase shadow-md transition-all cursor-pointer"
              >
                Discover Our Salons &amp; Boutiques
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-surface-200 hover:bg-surface-300 border border-neutral-300 text-neutral-900 font-medium text-xs tracking-wider uppercase transition-all cursor-pointer"
              >
                Book a Private Fitting
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
