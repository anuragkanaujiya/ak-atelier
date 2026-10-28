'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { SUB_NAV_ITEMS, SubNavItem } from '@/data/navigation';
import { MegaMenuType } from './MegaMenu';

interface SubNavbarProps {
  isGlossy?: boolean;
  onOpenMegaMenu?: (type: MegaMenuType) => void;
  activeMenu?: MegaMenuType | null;
}

function SubNavbarContent({
  isGlossy = false,
}: SubNavbarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams?.get('category');

  return (
    <div
      className={`w-full border-t border-b transition-colors duration-300 select-none ${
        isGlossy
          ? 'border-white/[0.04] bg-black/25 backdrop-blur-sm text-white/70'
          : 'border-white/[0.06] bg-neutral-950/70 backdrop-blur-md text-surface-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-8 sm:h-8.5">
          {/* Centered Minimalist Luxury Category Strip */}
          <nav
            aria-label="Sub-navigation"
            className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar w-full gap-5 sm:gap-7 lg:gap-9 py-0.5"
          >
            {SUB_NAV_ITEMS.map((item: SubNavItem) => {
              const isActive =
                (item.categorySlug && currentCategory === item.categorySlug) ||
                (pathname === item.href && !currentCategory);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`shrink-0 text-[10px] sm:text-[10.5px] font-nav uppercase tracking-[0.22em] transition-colors duration-200 relative py-1 ${
                    isActive
                      ? 'text-white font-medium'
                      : 'text-white/55 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-primary-300/80" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

export const SubNavbar: React.FC<SubNavbarProps> = (props) => {
  return (
    <Suspense
      fallback={
        <div
          className={`w-full h-8 border-t border-b select-none ${
            props.isGlossy
              ? 'border-white/[0.04] bg-black/25 backdrop-blur-sm'
              : 'border-white/[0.06] bg-neutral-950/70 backdrop-blur-md'
          }`}
        />
      }
    >
      <SubNavbarContent {...props} />
    </Suspense>
  );
};

export default SubNavbar;
