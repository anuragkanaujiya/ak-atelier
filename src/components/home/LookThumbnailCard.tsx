'use client';

import React from 'react';
import { LookStyleItem } from '@/data/changeLook';

interface LookThumbnailCardProps {
  look: LookStyleItem;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

/**
 * LookThumbnailCard
 *
 * Left-side interactive look selector cards with alternating opposite rotation angles
 * (e.g. +3.5° / -3.5°), clean surface editorial photo borders, and AK Atelier
 * primary lilac & neutral active highlight, matching the brand luxury aesthetic.
 */
export const LookThumbnailCard: React.FC<LookThumbnailCardProps> = ({
  look,
  index,
  isActive,
  onSelect,
}) => {
  // Alternating opposite rotation angles between each card
  const tiltClass =
    index % 2 === 0
      ? 'rotate-[3.5deg] hover:rotate-[1deg]'
      : '-rotate-[3.5deg] hover:rotate-[-1deg]';

  return (
    <button
      onClick={onSelect}
      type="button"
      className={`group relative w-20 sm:w-22 lg:w-[92px] h-28 sm:h-32 lg:h-36 p-1 bg-surface-100 rounded-2xl transition-all duration-300 text-left shrink-0 cursor-pointer block select-none ${tiltClass} ${
        isActive
          ? 'ring-2 ring-primary-500 border-2 border-primary-600 shadow-[0_8px_22px_rgba(129,119,159,0.3)] scale-105 z-10'
          : 'border border-neutral-200 shadow-xs opacity-85 hover:opacity-100 hover:border-primary-400 hover:shadow-md hover:scale-103'
      }`}
      aria-label={`Select ${look.name} (Look 0${index + 1})`}
    >
      {/* Editorial Photo Card Matting Container */}
      <div className="w-full h-full rounded-xl overflow-hidden bg-surface-300">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={look.thumbnail}
          alt={look.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106 pointer-events-none select-none"
          loading="lazy"
          decoding="async"
        />
      </div>
    </button>
  );
};
