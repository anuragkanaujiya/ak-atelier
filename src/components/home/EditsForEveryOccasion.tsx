'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { EDITS_FOR_OCCASION_DATA } from '@/data/editsForOccasion';
import { EditorialOccasionCard } from './EditorialOccasionCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const EditsForEveryOccasion: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Safe GSAP entrance animation with guaranteed visibility fallback
  useGSAP(
    () => {
      const cards = cardsContainerRef.current?.querySelectorAll('.editorial-occasion-card');
      if (!cards || cards.length === 0) return;

      const ctx = gsap.fromTo(
        cards,
        { opacity: 0.35, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
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
      id="edits-for-every-occasion"
      ref={sectionRef}
      className="py-14 sm:py-20 lg:py-24 bg-surface-300 text-neutral-900 relative overflow-hidden border-t border-neutral-200"
    >
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Matching Screenshot Typography */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <h2 className="tracking-tight text-neutral-900 leading-none flex flex-wrap items-baseline gap-2.5 sm:gap-3.5">
              <span className="font-sans font-black text-3xl sm:text-4xl lg:text-[46px] uppercase tracking-[-0.01em] text-neutral-900">
                {EDITS_FOR_OCCASION_DATA.headingPrimary}
              </span>
              <span className="font-serif italic font-light text-3xl sm:text-4xl lg:text-[48px] text-primary-600 lowercase">
                {EDITS_FOR_OCCASION_DATA.headingScript}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-neutral-700 font-sans mt-2 max-w-xl">
              {EDITS_FOR_OCCASION_DATA.description}
            </p>
          </div>

          <Link
            href={EDITS_FOR_OCCASION_DATA.ctaHref}
            className="inline-flex items-center gap-2 text-xs font-nav uppercase tracking-[0.2em] text-primary-700 hover:text-primary-800 font-semibold pb-1 border-b border-primary-700/30 hover:border-primary-700 transition-all group shrink-0"
          >
            <span>{EDITS_FOR_OCCASION_DATA.ctaText}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
          </Link>
        </div>

        {/* 4 Cards Grid: Matching Screenshot */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-6 w-full min-h-[460px]"
        >
          {EDITS_FOR_OCCASION_DATA.edits.map((edit, idx) => (
            <EditorialOccasionCard key={edit.id} edit={edit} priority={idx === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};
