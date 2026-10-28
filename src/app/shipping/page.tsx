import React from 'react';
import Link from 'next/link';
import { Truck, ShieldCheck, Clock, PackageCheck } from 'lucide-react';

export const metadata = {
  title: 'Shipping & Delivery — AK ATELIER',
  description: 'Global insured courier delivery details for bespoke tailoring, cashmere outerwear, and silk couture.',
};

export default function ShippingPage() {
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
            Global Logistics &amp; Courier Service
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-neutral-900 mt-2">
            Shipping &amp; Delivery
          </h1>
          <p className="text-sm font-sans text-neutral-600 mt-2 leading-relaxed">
            Insured white-glove courier delivery and bespoke packaging across 45+ international destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-neutral-200">
          <div className="flex flex-col items-center text-center p-5 rounded-xl bg-surface-100 border border-neutral-200 shadow-sm">
            <Truck className="w-6 h-6 text-secondary-600 mb-2" />
            <h3 className="font-serif font-medium text-sm text-neutral-900">Complimentary Transit</h3>
            <p className="text-xs text-neutral-600 mt-1">On orders above &euro;500 / $550 worldwide</p>
          </div>
          <div className="flex flex-col items-center text-center p-5 rounded-xl bg-surface-100 border border-neutral-200 shadow-sm">
            <Clock className="w-6 h-6 text-secondary-600 mb-2" />
            <h3 className="font-serif font-medium text-sm text-neutral-900">Priority Dispatch</h3>
            <p className="text-xs text-neutral-600 mt-1">Pr&ecirc;t-&agrave;-porter ships within 24&ndash;48 hours</p>
          </div>
          <div className="flex flex-col items-center text-center p-5 rounded-xl bg-surface-100 border border-neutral-200 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-secondary-600 mb-2" />
            <h3 className="font-serif font-medium text-sm text-neutral-900">Insured Delivery</h3>
            <p className="text-xs text-neutral-600 mt-1">100% value coverage with tamper-evident seal</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-surface-100 border border-neutral-200 shadow-sm space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 font-medium">
              European Union &amp; United Kingdom
            </h2>
            <p className="text-sm font-sans text-neutral-600 leading-relaxed">
              Consignments are transported via DHL Express Luxury Logistics or private courier service with direct real-time GPS tracking and mandatory recipient signature. Typical transit time is 1&ndash;2 business days within Italy and France, and 2&ndash;3 business days across the United Kingdom, Switzerland, and the European Union.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-surface-100 border border-neutral-200 shadow-sm space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 font-medium">
              North America &amp; Global Destinations
            </h2>
            <p className="text-sm font-sans text-neutral-600 leading-relaxed">
              Global consignments are dispatched via FedEx Priority Valuables or DHL Express International to the United States, Canada, Japan, Singapore, UAE, and Australia within 2&ndash;4 business days. All duties, import tariffs, and local taxes are calculated transparently with Delivered Duty Paid (DDP) service.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-surface-100 border border-neutral-200 shadow-sm space-y-4">
            <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 font-medium">
              Bespoke Commissions &amp; Archival Packaging
            </h2>
            <p className="text-sm font-sans text-neutral-600 leading-relaxed">
              Every handcrafted suit, double-faced cashmere overcoat, and silk evening gown undergoes final inspection by our master cutter. Garments are delivered encased in breathable archival canvas garment covers, mounted on sculpted Italian beechwood hangers, and housed in rigid protective presentation boxes.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-surface-100 border border-neutral-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <PackageCheck className="w-5 h-5 text-secondary-600" />
              <h2 className="font-serif text-xl sm:text-2xl text-neutral-900 font-medium">
                Flagship Boutique Collection
              </h2>
            </div>
            <p className="text-sm font-sans text-neutral-600 leading-relaxed">
              Clients may select complimentary in-store collection at our Milan flagship salon (Via Montenapoleone 8) or our Paris private suite (24 Rue du Faubourg Saint-Honor&eacute;). Your client advisor will arrange a private fitting room and refreshments upon your arrival.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
