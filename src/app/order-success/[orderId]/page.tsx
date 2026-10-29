'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Sparkles,
  Printer,
  ArrowRight,
  ShieldCheck,
  Truck,
} from 'lucide-react';

export default function OrderSuccessPage() {
  const params = useParams();
  const orderId = (params?.orderId as string) || 'AK-2026-9812';

  useEffect(() => {
    // Launch celebratory confetti with official tokens (Lilac, Rose Mauve, Champagne)
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#81779f', '#c5ad83', '#9b718f', '#cfc7e3'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#81779f', '#c5ad83', '#9b718f', '#cfc7e3'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 12);
  const formattedDelivery = estimatedDelivery.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="bg-surface-300 text-neutral-900 min-h-screen pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Main Royal Receipt Card */}
        <div className="bg-surface-100 rounded-2xl border border-neutral-200 shadow-xl p-6 sm:p-12 space-y-8 relative overflow-hidden">
          {/* Top Decorative Foil Border Accent */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-700" />

          {/* Crest & Congratulations */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-primary-100 border-2 border-primary-300 flex items-center justify-center text-primary-700 mx-auto shadow-sm">
              <Sparkles className="w-8 h-8" />
            </div>

            <span className="text-xs font-nav uppercase tracking-[0.3em] text-primary-700 font-semibold block">
              Official Commission Confirmed
            </span>

            <h1 className="font-serif text-3xl sm:text-5xl text-neutral-900 font-medium">
              A BESPOKE CREATION RESERVED FOR YOU
            </h1>

            <p className="text-xs sm:text-sm text-neutral-600 font-sans max-w-lg mx-auto leading-relaxed">
              We have officially registered your haute couture commission. Our master tailors in Milan and Florence have received your bespoke dossier.
            </p>
          </div>

          {/* Reference Numbers Banner */}
          <div className="bg-surface-200 p-6 rounded-xl border border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-nav">
            <div>
              <span className="text-neutral-500 uppercase tracking-wider block text-[10px]">
                Commission Order Reference
              </span>
              <span className="font-serif text-lg font-bold text-neutral-900 block mt-0.5">
                {orderId}
              </span>
            </div>

            <div>
              <span className="text-neutral-500 uppercase tracking-wider block text-[10px]">
                Estimated Courier Delivery
              </span>
              <span className="font-serif text-base font-semibold text-neutral-900 block mt-0.5">
                {formattedDelivery}
              </span>
            </div>
          </div>

          {/* Next Steps for Bespoke Couture */}
          <div className="space-y-4 pt-2">
            <h3 className="font-serif text-lg font-medium text-neutral-900 border-b border-neutral-200 pb-2">
              What to Expect Next
            </h3>

            <div className="space-y-3 text-xs font-sans text-neutral-600">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-success-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900">Master Tailoring Verification:</strong>{' '}
                  Within 24 hours, our head atelier manager will review your bespoke notes and confirm measurement parameters.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900">Insured Climate-Cased Dispatch:</strong>{' '}
                  Your garment will be steam-pressed, hand-packed in our signature keepsake box, and dispatched under insured courier protection.
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-neutral-900">Complimentary Alteration Concierge:</strong>{' '}
                  If any fit adjustment is needed before your grand occasion, our flagship boutique network is at your disposal.
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-neutral-300 hover:border-neutral-400 text-xs font-nav uppercase tracking-wider text-neutral-800 bg-surface-100 transition-colors font-medium"
            >
              <Printer className="w-4 h-4 text-neutral-700" />
              <span>Print Official Receipt</span>
            </button>

            <Link
              href="/collections/all"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium text-xs font-nav uppercase tracking-widest transition-all shadow-md"
            >
              <span>Explore More Collections</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
