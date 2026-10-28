import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Terms & Conditions — AK ATELIER',
  description: 'Terms and conditions governing bespoke commissions, ready-to-wear purchases, and private salon services at AK ATELIER.',
};

export default function TermsPage() {
  const termsSections = [
    {
      num: '01',
      title: 'Sartorial Craftsmanship & Mill Provenance',
      content:
        'Every garment presented by AK ATELIER is crafted in accordance with rigorous European sartorial traditions. Our textiles are woven exclusively by prestigious heritage mills in Biella, Italy, and Lake Como, utilizing Super 150s–180s virgin wool, grade-A Mongolian cashmere, and pure mulberry silk faille. Because of the artisanal, hand-canvassed nature of our tailored garments, subtle weave variations and hand pick-stitching reflect genuine master craftsmanship.',
    },
    {
      num: '02',
      title: 'Bespoke Commissions & Made-to-Measure Protocol',
      content:
        'Bespoke suits, tuxedos, and made-to-measure evening couture begin tailoring upon receipt of individual anatomical measurements, cloth selection, and deposit confirmation. Because individual patterns are drafted and cut by hand for each client, commissions cannot be cancelled once fabric cutting has commenced. AK ATELIER provides comprehensive basted fittings and complimentary alterations until sartorial perfection is achieved.',
    },
    {
      num: '03',
      title: 'Pricing, Currencies & Customs Duties',
      content:
        'All prices are quoted in Euros (EUR) or United States Dollars (USD) depending on regional selection. Orders dispatched to international destinations outside the European Union are delivered with all import duties, tariffs, and customs clearances pre-paid (Delivered Duty Paid / DDP) to ensure no secondary carrier fees upon delivery.',
    },
    {
      num: '04',
      title: 'Insured Logistics & Title Transfer',
      content:
        'All shipments are transported via insured luxury logistics providers (DHL Express Luxury Logistics or FedEx Priority Valuables) with tamper-evident seals and required recipient signatures. Responsibility and title transfer to the client upon recorded physical receipt at the nominated address.',
    },
    {
      num: '05',
      title: 'Intellectual Property & Design Ownership',
      content:
        'All sartorial patterns, garment silhouettes, editorial visual assets, typography, and trademarks displayed on this platform are the exclusive intellectual property of AK ATELIER Milano S.r.l. Unauthorized reproduction, commercial exploitation, or distribution is strictly prohibited.',
    },
    {
      num: '06',
      title: 'Governing Law & Jurisdiction',
      content:
        'These Terms and Conditions are governed by and construed in accordance with the laws of Italy and European Union trade regulations. Any dispute arising under these terms shall fall within the exclusive jurisdiction of the civil courts of Milan, Italy.',
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
            Legal &amp; Sartorial Terms
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-neutral-900 mt-2">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm font-sans text-neutral-600 mt-2 leading-relaxed">
            Official guidelines governing bespoke tailoring commissions, ready-to-wear acquisition, and private salon services at AK ATELIER.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          {termsSections.map((section) => (
            <div
              key={section.num}
              className="p-6 sm:p-8 rounded-2xl bg-surface-100 border border-neutral-200 text-neutral-900 shadow-sm space-y-3"
            >
              <div className="flex items-baseline gap-3">
                <span className="text-xs font-semibold font-nav text-secondary-600 tracking-wider">
                  {section.num}
                </span>
                <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 font-medium">
                  {section.title}
                </h2>
              </div>
              <p className="text-sm font-sans text-neutral-600 leading-relaxed pl-6">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
