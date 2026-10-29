'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { MEGA_MENU_CONFIG, MegaMenuTabConfig } from '@/data/navigation';

export type MegaMenuType = 'women' | 'men' | 'wedding' | 'craft';

interface MegaMenuProps {
  activeMenu: MegaMenuType | null;
  onClose: () => void;
  isGlossy?: boolean;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({
  activeMenu,
  onClose,
  isGlossy = false,
}) => {
  if (!activeMenu) return null;

  const currentConfig: MegaMenuTabConfig =
    MEGA_MENU_CONFIG[activeMenu] || MEGA_MENU_CONFIG.women;

  return (
    <div
      onMouseEnter={() => {}}
      onMouseLeave={onClose}
      className={`absolute top-full left-0 right-0 z-40 transition-all duration-300 border-b border-white/10 ${
        isGlossy
          ? 'bg-neutral-950/90 backdrop-blur-xl shadow-2xl'
          : 'bg-neutral-950/92 backdrop-blur-xl shadow-2xl'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-7">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Column 1: Silhouettes & Categories */}
          <div>
            <div className="text-[10px] font-nav uppercase tracking-[0.25em] text-primary-300 font-semibold pb-2 border-b border-white/10 mb-3">
              Categories
            </div>
            <ul className="space-y-2">
              {currentConfig.silhouettes.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="text-xs text-white/70 hover:text-white transition-colors duration-150 block py-0.5 tracking-wide"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Noble Materials */}
          <div>
            <div className="text-[10px] font-nav uppercase tracking-[0.25em] text-primary-300 font-semibold pb-2 border-b border-white/10 mb-3">
              Noble Materials
            </div>
            <ul className="space-y-2">
              {currentConfig.fabrics.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="text-xs text-white/70 hover:text-white transition-colors duration-150 block py-0.5 tracking-wide"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Occasions & Curated Edits */}
          <div>
            <div className="text-[10px] font-nav uppercase tracking-[0.25em] text-primary-300 font-semibold pb-2 border-b border-white/10 mb-3">
              Occasions &amp; Services
            </div>
            <ul className="space-y-2">
              {currentConfig.occasions.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="text-xs text-white/70 hover:text-white transition-colors duration-150 block py-0.5 tracking-wide"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="pt-4 mt-4 border-t border-white/5">
              <Link
                href="/collections/all"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-[11px] font-nav uppercase tracking-[0.2em] text-primary-300 hover:text-white transition-colors duration-150"
              >
                <span>Explore Full Collection</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
