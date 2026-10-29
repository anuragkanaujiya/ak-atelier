import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Frequently Asked Questions — AK ATELIER',
  description: 'Answers regarding fabric provenance, bespoke tailoring, cashmere care, and private salon appointments.',
};

export default function FaqsPage() {
  const faqs = [
    {
      category: 'Provenance',
      q: 'How can I verify the authenticity and provenance of our fabrics?',
      a: 'Every bespoke garment and ready-to-wear ensemble from AK ATELIER is accompanied by an authenticated mill certificate. Our superfine wools and cashmeres originate from historic mills in Biella, Italy, while our silk faille, organza, and satins are woven by heritage ateliers along Lake Como.',
    },
    {
      category: 'Sartorial',
      q: 'What is the process for bespoke suiting and made-to-measure tailoring?',
      a: 'Our bespoke tailoring involves a three-stage sartorial journey: initial silhouette and cloth selection with a master cutter, intermediate basted fitting with full canvas structure adjustment, and final hand-finishing with hand-set horn buttons and silk pick-stitching.',
    },
    {
      category: 'Garment Care',
      q: 'How do I care for my double-faced cashmere outerwear and silk couture?',
      a: 'We recommend specialized eco-luxury dry cleaning for all tailored outerwear and silk evening gowns. Between wears, store garments in the provided breathable cotton-canvas archival suit bags and hung on custom sculpted beechwood hangers to preserve natural shoulder roll and drape.',
    },
    {
      category: 'Consultations',
      q: 'Can I schedule a private styling salon appointment prior to placing a commission?',
      a: 'Certainly. Our private salons on Via Montenapoleone in Milan and Rue du Faubourg Saint-Honoré in Paris offer intimate one-on-one appointments with our senior styling directors. Complimentary champagne and personalized swatch books are prepared for your arrival.',
    },
    {
      category: 'Logistics',
      q: 'Do you offer international insured delivery and customs handling?',
      a: 'Yes. We partner with DHL Luxury Logistics and FedEx Priority Valuables to provide fully insured, climate-controlled transit across 45+ countries. All duties, EU VAT, and customs tariffs are calculated transparently with zero unexpected delivery fees.',
    },
  ];

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
            Atelier Advisory &amp; Services
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-neutral-900 mt-2">
            Frequently Asked Questions
          </h1>
          <p className="text-sm font-sans text-neutral-600 mt-2 leading-relaxed">
            Essential guidance regarding sartorial craftsmanship, Biella cloth provenance, bespoke fittings, and garment care.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="p-6 sm:p-7 rounded-2xl bg-surface-100 border border-neutral-200 text-neutral-900 shadow-sm space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-serif text-lg sm:text-xl text-neutral-900 font-medium">
                  {faq.q}
                </h3>
                <span className="text-xs font-semibold font-nav text-secondary-600 shrink-0 uppercase tracking-wider">
                  {faq.category}
                </span>
              </div>
              <p className="text-sm font-sans text-neutral-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-2xl bg-surface-100 border border-neutral-200 text-neutral-900 shadow-sm text-center space-y-3 mt-10">
          <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 font-medium">
            Require Personalized Advisory?
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
            Our Milan and Paris client concierges are available for private consultations, fabric samples, and bespoke fitting reservations.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium text-xs tracking-wider uppercase shadow-md transition-all cursor-pointer"
            >
              Connect with Concierge
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
