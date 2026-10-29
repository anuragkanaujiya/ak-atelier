'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AUTUMN_WINTER_DATA } from '@/data/autumnWinter';
import { ArchedCard } from './ArchedCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const AutumnWinter2026: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Safe GSAP entrance animation with guaranteed visibility fallback
  useGSAP(
    () => {
      const cards = cardsContainerRef.current?.querySelectorAll('.arched-card');
      if (!cards || cards.length === 0) return;

      // Safe GSAP entrance animation with visible luxury entrance
      const ctx = gsap.fromTo(
        cards,
        { opacity: 0.35, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            refreshPriority: 1,
            toggleActions: 'play none none none',
          },
        }
      );

      return () => {
        ctx.revert();
      };
    },
    { scope: sectionRef, dependencies: [] }
  );

  return (
    <section
      id="autumn-winter-2026"
      ref={sectionRef}
      className="py-14 sm:py-20 lg:py-24 bg-surface-300 text-neutral-900 relative overflow-hidden border-t border-neutral-200"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Matching Screenshot 1 */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14">
          {/* Left: Stacked Tag & Display Title (Matching Screenshot 1 exactly) */}
          <div className="flex items-start gap-4 sm:gap-6">
            <div className="text-[10px] sm:text-[11px] font-nav uppercase tracking-[0.25em] text-neutral-500 font-semibold leading-tight pt-1.5 sm:pt-2 select-none shrink-0 border-l-2 border-primary-500 pl-2.5">
              <div>SEASON</div>
              <div>FORECAST</div>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-[56px] font-normal tracking-tight text-neutral-900 leading-[1.08]">
              <span>{AUTUMN_WINTER_DATA.headingLine1}</span>{' '}
              <span className="block sm:inline">
                <span>{AUTUMN_WINTER_DATA.headingLine2}</span>{' '}
                <span className="font-serif italic font-light text-primary-600 text-[1.06em]">
                  {AUTUMN_WINTER_DATA.headingYear}
                </span>
              </span>
            </h2>
          </div>

          {/* Middle & Right: Editorial Description + Link */}
          <div className="flex flex-col sm:flex-row sm:items-end lg:items-center justify-between lg:justify-end gap-6 max-w-2xl lg:pb-2">
            <p className="text-xs sm:text-sm text-neutral-700 font-sans leading-relaxed max-w-md">
              {AUTUMN_WINTER_DATA.description}
            </p>

            <Link
              href={AUTUMN_WINTER_DATA.ctaHref}
              className="inline-flex items-center gap-2 text-xs font-nav uppercase tracking-[0.2em] text-primary-700 hover:text-primary-800 font-semibold pb-1 border-b border-primary-700/30 hover:border-primary-700 transition-all group shrink-0"
            >
              <span>{AUTUMN_WINTER_DATA.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* 3 Arched Cards Grid: Matching Screenshot 1 Cathedral Windows */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 w-full min-h-[480px]"
        >
          {AUTUMN_WINTER_DATA.campaigns.map((item, index) => (
            <ArchedCard key={item.id} item={item} priority={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

