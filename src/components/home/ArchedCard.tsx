'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { ArchedCampaignItem } from '@/data/autumnWinter';

interface ArchedCardProps {
  item: ArchedCampaignItem;
  priority?: boolean;
}

export const ArchedCard: React.FC<ArchedCardProps> = ({ item, priority = false }) => {
  return (
    <Link
      href={item.href}
      style={{ aspectRatio: '3 / 4.4' }}
      className="arched-card group relative block w-full h-[480px] sm:h-[540px] lg:h-[600px] min-h-[460px] rounded-t-[160px] sm:rounded-t-[200px] lg:rounded-t-[240px] rounded-b-2xl overflow-hidden bg-neutral-900 border border-neutral-700/60 hover:border-primary-400 transition-all duration-500 shadow-xl hover:shadow-[0_24px_50px_rgba(129,119,159,0.25)] select-none will-change-transform opacity-100"
    >
      {/* High-Resolution Luxury Photoshoot Image: Cathedral Arched Window */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
        loading={priority ? 'eager' : 'lazy'}
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 33vw, 400px"
        decoding="async"
      />

      {/* Radiant Editorial Scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-80 pointer-events-none" />

      {/* Top Cathedral Arch Halo Ambient Glow in Primary Lilac */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary-500/20 via-primary-500/5 to-transparent pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Bottom Editorial Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7 flex flex-col justify-end space-y-2 pointer-events-none z-10">
        <div className="flex items-center justify-between">
          <span className="inline-block text-[9px] sm:text-[10px] font-nav uppercase tracking-[0.22em] bg-neutral-900/80 backdrop-blur-md px-3 py-1 rounded-full text-primary-300 border border-primary-500/30">
            {item.tag}
          </span>

          <span className="w-8 h-8 rounded-full bg-neutral-900/70 group-hover:bg-primary-600 backdrop-blur-md flex items-center justify-center text-primary-300 group-hover:text-white border border-neutral-700/60 group-hover:border-primary-500 transition-all duration-300 transform group-hover:scale-110">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>

        <h3 className="font-serif text-xl sm:text-2xl lg:text-[26px] text-white font-medium group-hover:text-primary-200 transition-colors line-clamp-1 leading-snug drop-shadow-sm">
          {item.title}
        </h3>

        <p className="text-xs font-sans text-neutral-300 line-clamp-1">
          {item.subtitle}
        </p>

        <div className="pt-2 flex items-center justify-between text-[11px] font-nav uppercase tracking-wider text-neutral-300 group-hover:text-white border-t border-neutral-700/60 transition-colors">
          <span className="truncate pr-2">{item.saree}</span>
          <span className="text-primary-300 font-medium group-hover:text-primary-200 group-hover:underline shrink-0">Explore</span>
        </div>
      </div>
    </Link>
  );
};
