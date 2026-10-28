import React from 'react';
import Link from 'next/link';
import { RotateCcw, Scissors, Sparkles, PhoneCall } from 'lucide-react';

export const metadata = {
  title: 'Returns & Exchanges — AK ATELIER',
  description: 'Exchange policies, bespoke alteration guarantee, and concierge return assistance for AK ATELIER.',
};

export default function ReturnsPage() {
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
            Atelier Guarantee &amp; Exchanges
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-neutral-900 mt-2">
            Returns &amp; Exchanges
          </h1>
          <p className="text-sm font-sans text-neutral-600 mt-2 leading-relaxed">
            Seamless exchange assistance and bespoke alteration services coordinated by your dedicated client concierge.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-neutral-200">
          <div className="flex flex-col items-center text-center p-5 rounded-xl bg-surface-100 border border-neutral-200 shadow-sm">
            <RotateCcw className="w-6 h-6 text-secondary-600 mb-2" />
            <h3 className="font-serif font-medium text-sm text-neutral-900">14-Day Window</h3>
            <p className="text-xs text-neutral-600 mt-1">Complimentary exchanges for all ready-to-wear</p>
          </div>
          <div className="flex flex-col items-center text-center p-5 rounded-xl bg-surface-100 border border-neutral-200 shadow-sm">
            <Scissors className="w-6 h-6 text-secondary-600 mb-2" />
            <h3 className="font-serif font-medium text-sm text-neutral-900">Bespoke Fit Promise</h3>
            <p className="text-xs text-neutral-600 mt-1">Complimentary tailoring refinements on custom commissions</p>
          </div>
          <div className="flex flex-col items-center text-center p-5 rounded-xl bg-surface-100 border border-neutral-200 shadow-sm">
            <Sparkles className="w-6 h-6 text-secondary-600 mb-2" />
            <h3 className="font-serif font-medium text-sm text-neutral-900">White-Glove Pickup</h3>
            <p className="text-xs text-neutral-600 mt-1">Doorstep courier collection arranged at your convenience</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-surface-100 border border-neutral-200 shadow-sm space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 font-medium">
              14-Day Ready-to-Wear Exchange Policy
            </h2>
            <p className="text-sm font-sans text-neutral-600 leading-relaxed">
              Pr&ecirc;t-&agrave;-porter garments, including tailored jackets, trousers, cashmere knits, and silk blouses, may be returned or exchanged within 14 calendar days of delivery. All returned items must remain unworn, unwashed, unaltered, and accompanied by the original security tags, archival garment cover, and presentation packaging.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-surface-100 border border-neutral-200 shadow-sm space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 font-medium">
              Bespoke Suiting &amp; Made-to-Measure Guarantee
            </h2>
            <p className="text-sm font-sans text-neutral-600 leading-relaxed">
              Because bespoke suits, tuxedos, and made-to-order silk evening gowns are crafted specifically to your anatomical dimensions and selected cloth patterns, they are non-refundable once cutting commences. However, our Master Cutter Guarantee ensures complimentary atelier alterations until the silhouette drape and sleeve pitch meet absolute sartorial perfection.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-surface-100 border border-neutral-200 shadow-sm space-y-3">
            <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 font-medium">
              How to Initiate an Exchange or Alteration
            </h2>
            <p className="text-sm font-sans text-neutral-600 leading-relaxed">
              Connect with your dedicated client advisor via telephone at <span className="font-semibold text-neutral-900">+39 02 8901 2345</span> or by email at <span className="font-semibold text-neutral-900">concierge@ak-atelier.com</span>. We will arrange a prepaid courier pickup from your residence or schedule an alteration session at our Milan or Paris salons.
            </p>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-surface-100 border border-neutral-200 text-neutral-900 shadow-sm text-center space-y-3 mt-10">
          <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 font-medium">
            Need Assistance with an Order?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
            Our atelier concierge will coordinate your complimentary collection or book a master tailor fitting appointment.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium text-xs tracking-wider uppercase shadow-md transition-all cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Contact Concierge</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
