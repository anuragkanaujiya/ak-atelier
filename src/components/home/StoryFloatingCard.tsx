'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CinematicStoryProduct } from '@/data/cinematicStories';
import { Plus, Check } from 'lucide-react';

export interface StoryFloatingCardProps {
  story: CinematicStoryProduct;
  index: number;
  isActive: boolean;
  onSelect: () => void;
}

/**
 * StoryFloatingCard
 *
 * Floating preview card with two distinct phases:
 * - Phase 1 (Default / Docked): Compact thumbnail preview with title & expand badge.
 * - Phase 2 (Chosen / Active): Smoothly expanded card with radiant border, elevated presence,
 *   whose background imagery takes over the full-screen cinematic section.
 */
export const StoryFloatingCard: React.FC<StoryFloatingCardProps> = ({
  story,
  index,
  isActive,
  onSelect,
}) => {
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      layout
      transition={{ type: 'spring', stiffness: 360, damping: 28 }}
      className={`group relative rounded-xl overflow-hidden shrink-0 cursor-pointer text-left select-none will-change-transform ${
        isActive
          ? 'w-36 sm:w-44 md:w-48 h-48 sm:h-56 border border-primary-300 ring-2 ring-primary-500/50 shadow-2xl z-20 bg-neutral-900'
          : 'w-24 sm:w-28 md:w-32 h-36 sm:h-44 border border-neutral-700/60 bg-neutral-900/60 opacity-75 hover:opacity-100 hover:border-primary-400/50 z-10'
      }`}
      aria-label={`Select story ${story.storyTitleLine1} ${story.storyTitleLine2} (Story 0${index + 1})`}
    >
      {/* Thumbnail Background Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={story.cardThumbnail}
        alt={story.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />

      {/* Atmospheric Vignette Scrim */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
          isActive
            ? 'bg-gradient-to-t from-black/80 via-transparent to-transparent'
            : 'bg-gradient-to-t from-black/85 via-black/25 to-transparent'
        }`}
      />

      {/* Top Story Index Chip */}
      <div className="absolute top-2 left-2 z-10">
        <span
          className={`inline-block font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded backdrop-blur-xs transition-colors ${
            isActive
              ? 'bg-primary-600 text-white font-semibold'
              : 'bg-neutral-900/70 text-neutral-300 border border-neutral-700/40'
          }`}
        >
          0{index + 1}
        </span>
      </div>

      {/* Bottom Content & Phase Badge */}
      <div className="absolute bottom-2 left-2 right-2 z-10 flex items-end justify-between gap-1.5">
        <div className="min-w-0 flex-1">
          <p
            className={`font-serif tracking-tight leading-tight truncate text-white drop-shadow-md ${
              isActive ? 'text-xs sm:text-sm font-semibold' : 'text-[11px] font-medium'
            }`}
          >
            {story.storyTitleLine1} {story.storyTitleLine2}
          </p>
          {isActive && (
            <p className="font-mono text-[8px] uppercase tracking-wider text-primary-300 truncate drop-shadow-sm pt-0.5">
              {story.storySubtitle}
            </p>
          )}
        </div>

        {/* Phase Action Icon Badge */}
        <div
          className={`w-5 h-5 rounded flex items-center justify-center shrink-0 shadow-sm backdrop-blur-xs transition-all duration-300 ${
            isActive
              ? 'bg-primary-600 text-white scale-105 shadow-sm'
              : 'bg-neutral-900/70 text-neutral-300 border border-neutral-700/60 group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-500'
          }`}
        >
          {isActive ? (
            <Check className="w-3 h-3 stroke-[2.5]" />
          ) : (
            <Plus className="w-3 h-3 stroke-[2.5] transition-transform group-hover:rotate-90" />
          )}
        </div>
      </div>
    </motion.button>
  );
};
