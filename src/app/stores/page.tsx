import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, Calendar, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Atelier Salons & Flagships — AK ATELIER',
  description: 'Experience private bespoke tailoring appointments and couture fittings across Milan, Paris, and London.',
};

export default function StoresPage() {
  const salons = [
    {
      city: 'Milan, Italy',
      title: 'Via Montenapoleone Flagship',
      subtitle: 'Headquarters & Master Sartoria',
      address: 'Via Montenapoleone 8, 20121 Milano, Italy',
      phone: '+39 02 8901 2345',
      hours: 'Mon – Sat: 10:00 AM – 7:30 PM',
      services: 'Bespoke Suiting • Cashmere Outerwear • Private Salon Suites',
    },
    {
      city: 'Paris, France',
      title: 'Rue du Faubourg Saint-Honoré',
      subtitle: 'Haute Couture & Salons Privés',
      address: '24 Rue du Faubourg Saint-Honoré, 75008 Paris, France',
      phone: '+33 1 42 68 55 00',
      hours: 'Tue – Sat: 10:30 AM – 7:00 PM',
      services: 'Silk Evening Gowns • Made-to-Measure • Champagne Consultations',
    },
    {
      city: 'London, UK',
      title: 'Mayfair Private Suite',
      subtitle: 'Townhouse Salon & VIP Wardrobe',
      address: '14 Berkeley Square, Mayfair, London W1J 6BQ, United Kingdom',
      phone: '+44 20 7946 0920',
      hours: 'By Private Appointment Exclusively',
      services: 'Wardrobe Advisory • Travelling Master Cutter • Tailoring Refinements',
    },
  ];

  return (
    <div className="min-h-screen bg-surface-300 text-neutral-900 pt-32 pb-24 px-6 sm:px-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <Link
            href="/"
            className="text-xs uppercase tracking-widest text-primary-700 font-semibold font-nav hover:text-primary-800 transition-colors inline-flex items-center gap-1"
          >
            &larr; Return to Atelier
          </Link>
          <span className="block text-xs font-semibold font-nav uppercase tracking-widest text-primary-700 mt-4">
            International Salons &amp; Flagships
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-neutral-900 mt-2">
            Atelier Salons &amp; Boutiques
          </h1>
          <p className="text-sm font-sans text-neutral-600 mt-2 leading-relaxed">
            Step into our private sanctuaries of bespoke tailoring, cashmere consultations, and silk couture fittings across Milan, Paris, and London.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {salons.map((salon, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-surface-100 border border-neutral-200 text-neutral-900 shadow-sm flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] font-semibold font-nav uppercase tracking-widest text-primary-700">
                    {salon.city}
                  </span>
                  <h3 className="font-serif text-xl font-medium text-neutral-900 mt-1">
                    {salon.title}
                  </h3>
                  <p className="text-xs text-secondary-600 font-sans mt-0.5">
                    {salon.subtitle}
                  </p>
                </div>

                <div className="space-y-2.5 text-xs text-neutral-600 font-sans leading-relaxed pt-2 border-t border-neutral-200">
                  <p className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-secondary-600 shrink-0 mt-0.5" />
                    <span>{salon.address}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-secondary-600 shrink-0" />
                    <span>{salon.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-secondary-600 shrink-0" />
                    <span>{salon.hours}</span>
                  </p>
                </div>

                <div className="pt-2">
                  <p className="text-[11px] font-sans text-neutral-500 bg-surface-200 p-2.5 rounded-lg border border-neutral-200">
                    {salon.services}
                  </p>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium text-xs tracking-wider uppercase shadow-md transition-all cursor-pointer w-full text-center"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Reserve Private Fitting</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-2xl bg-surface-100 border border-neutral-200 text-neutral-900 shadow-sm text-center space-y-3 mt-10">
          <div className="flex items-center justify-center gap-2 text-primary-700 mb-1">
            <Sparkles className="w-5 h-5 text-secondary-600" />
            <span className="text-xs font-semibold font-nav uppercase tracking-widest">
              Private Travelling Concierge
            </span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl text-neutral-900 font-medium">
            Worldwide Private Residence &amp; Suite Fittings
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
            For international patrons unable to visit our flagship salons, our Master Tailor Concierge arranges private wardrobe trunk fittings in Geneva, Zurich, New York, Tokyo, and Dubai.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-surface-200 hover:bg-surface-300 border border-neutral-300 text-neutral-900 font-medium text-xs tracking-wider uppercase transition-all cursor-pointer"
            >
              Request Travelling Tailor Visit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
