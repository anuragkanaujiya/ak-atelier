'use client';

import React, { useState } from 'react';
import { Sparkles, X } from 'lucide-react';
import Link from 'next/link';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-neutral-900 text-neutral-100 border-b border-primary-500/20 text-xs py-2 px-4 transition-all z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-6 hidden md:block" />

        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <Sparkles className="w-3.5 h-3.5 text-primary-300 shrink-0 animate-pulse" />
          <p className="tracking-widest uppercase font-nav text-[10px] sm:text-[11px] text-neutral-300">
            Milan Flagship & European Haute Couture ·{' '}
            <span className="text-primary-200 font-medium">
              Autumn–Winter 2026 Runway
            </span>{' '}
            ·{' '}
            <Link
              href="/collections/all"
              className="underline underline-offset-2 text-primary-300 hover:text-white transition-colors"
            >
              Complimentary Insured Courier
            </Link>
          </p>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-neutral-400 hover:text-white p-0.5 rounded transition-colors cursor-pointer"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
