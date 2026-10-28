'use client';

import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useSmoothScroll } from '@/components/common/SmoothScrollProvider';
import { SIGNATURE_ENSEMBLES } from '@/data/bridal';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

// 12 curated signature items (2 sets of 6) to ensure the track seamlessly spans all screen widths
const DISPLAY_ENSEMBLES = [...SIGNATURE_ENSEMBLES, ...SIGNATURE_ENSEMBLES];

export const WovenToBeRemembered: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Pre-cached measurements — strictly measured ONCE to prevent 120 FPS layout thrashing
  const cardCentersRef = useRef<number[]>([]);
  const travelRef = useRef<number>(0);

  const { lenis } = useSmoothScroll();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  /**
   * Pre-caches geometric card centers and horizontal travel distance.
   * Executed strictly on mount and resize — NEVER called inside 60-120fps scroll loops.
   */
  const cacheMetrics = useCallback(() => {
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => Boolean(c));
    const pinWrapper = pinWrapperRef.current;
    if (cards.length === 0 || !pinWrapper) return;

    cardCentersRef.current = cards.map((card) => card.offsetLeft + card.offsetWidth / 2);
    const containerWidth = pinWrapper.clientWidth;
    const isMobile = window.innerWidth < 640;
    const rightPadding = isMobile ? 24 : 48;
    const lastCard = cards[cards.length - 1];
    const lastCardRight = lastCard.offsetLeft + lastCard.offsetWidth;
    travelRef.current = Math.max(0, lastCardRight - (containerWidth - rightPadding));
  }, []);

  /**
   * Hardware-accelerated circular arc geometry on Tablet & Desktop (>= 640px).
   * Linear, flat horizontal layout on Mobile (< 640px).
   * Uses pre-cached card centers and translate3d for locked 120 FPS compositor throughput.
   */
  const applyCurvature = useCallback((overrideTrackX?: number) => {
    if (typeof window === 'undefined') return;
    const track = trackRef.current;
    const cards = cardRefs.current.filter((c): c is HTMLDivElement => Boolean(c));
    if (!track || cards.length === 0) return;

    const width = window.innerWidth;
    const isMobile = width < 640;
    const isTablet = width >= 640 && width < 1024;

    // Mobile screens (< 640px): linear layout without circular arc drop or rotation
    if (isMobile) {
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        if (card.style.transform !== '') {
          card.style.transform = '';
          card.style.webkitTransform = '';
        }
      }
      return;
    }

    // Responsive circle radius and rotation tuning for Tablet and Desktop (>= 640px)
    const radius = isTablet
      ? Math.max(1400, width * 1.8)
      : Math.max(2200, width * 1.7);

    const tiltFactor = isTablet ? 0.75 : 0.85;
    const maxRot = isTablet ? 13.5 : 14.5;
    const viewportCenter = width / 2;

    const currentTrackX =
      typeof overrideTrackX === 'number'
        ? overrideTrackX
        : (gsap.getProperty(track, 'x') as number) || 0;

    const centers = cardCentersRef.current;

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardCenterInTrack = centers[i] ?? (i * 304 + 145);
      const cardScreenX = currentTrackX + cardCenterInTrack;
      const dist = cardScreenX - viewportCenter;

      const theta = dist / radius;
      const deltaX = radius * Math.sin(theta) - dist;
      const y = radius * (1 - Math.cos(theta));
      const rawRot = theta * (180 / Math.PI) * tiltFactor;
      const rotZ = Math.max(-maxRot, Math.min(maxRot, rawRot));

      // GPU hardware-accelerated translate3d
      const transformValue = `translate3d(${deltaX.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${rotZ.toFixed(2)}deg)`;
      card.style.transform = transformValue;
      card.style.webkitTransform = transformValue;
    }
  }, []);

  // Smooth programmatic step to card index via Lenis / ScrollTrigger
  const scrollToCard = useCallback(
    (targetIndex: number) => {
      const idx = Math.max(0, Math.min(targetIndex, SIGNATURE_ENSEMBLES.length - 1));
      const st = ScrollTrigger.getById('woven-scroll');
      const travel = travelRef.current;
      const centers = cardCentersRef.current;

      if (st && travel > 0 && centers.length > 0) {
        const width = window.innerWidth;
        const viewportCenter = width / 2;
        const targetCenter = centers[idx] ?? (idx * 304 + 145);
        const targetX = Math.max(-travel, Math.min(0, viewportCenter - targetCenter));
        const progress = travel > 0 ? Math.abs(targetX) / travel : 0;
        const targetY = st.start + progress * (st.end - st.start);

        if (lenis) {
          lenis.scrollTo(targetY, { duration: 0.8 });
        } else {
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        }
      }
      activeIndexRef.current = idx;
      setActiveIndex(idx);
    },
    [lenis]
  );

  // Debounced resize listener with RAF to recalibrate curvature on window resize
  useEffect(() => {
    let rafId = 0;
    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cacheMetrics();
        applyCurvature();
      });
    };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, [cacheMetrics, applyCurvature]);

  // Responsive GSAP matchMedia integration: perfectly aligns cards and handles pinning
  useGSAP(
    () => {
      const section = sectionRef.current;
      const pinWrapper = pinWrapperRef.current;
      const track = trackRef.current;
      const cards = cardRefs.current.filter((c): c is HTMLDivElement => Boolean(c));
      if (!section || !pinWrapper || !track || cards.length === 0) return;

      const mm = gsap.matchMedia(section);

      mm.add(
        {
          isMobile: '(max-width: 639px)',
          isTablet: '(min-width: 640px) and (max-width: 1023px)',
          isDesktop: '(min-width: 1024px)',
        },
        (context) => {
          const { isMobile, isTablet } = context.conditions!;
          const width = window.innerWidth;
          const viewportCenter = width / 2;

          // Pre-cache measurements outside the scroll loop
          cacheMetrics();
          const travel = travelRef.current;
          const startX = 0;

          // Dynamic scroll distance proportional to actual track travel
          const scrollDistance = isMobile
            ? Math.max(600, Math.round(travel * 1.05))
            : isTablet
              ? Math.max(900, Math.round(travel * 1.1))
              : Math.max(1200, Math.round(travel * 1.15));

          // Set starting position deterministically
          gsap.set(track, { x: startX });
          applyCurvature(startX);

          // ScrollTrigger pins section while page scroll drives horizontal circular walkthrough
          const scrollTween = gsap.fromTo(
            track,
            { x: startX },
            {
              x: () => -travelRef.current,
              ease: 'none',
              scrollTrigger: {
                id: 'woven-scroll',
                trigger: section,
                pin: pinWrapper,
                anticipatePin: 0, // Eliminate premature pin gap before section reaches top
                fastScrollEnd: true,
                refreshPriority: 8,
                start: 'top top',
                end: () => '+=' + scrollDistance,
                scrub: true,
                invalidateOnRefresh: true,
                pinSpacing: true,
                onEnter: () => {
                  cacheMetrics();
                  applyCurvature(0);
                },
                onEnterBack: () => {
                  cacheMetrics();
                  applyCurvature(-travelRef.current);
                },
                onLeaveBack: () => {
                  gsap.set(track, { x: 0 });
                  applyCurvature(0);
                  setActiveIndex(0);
                  activeIndexRef.current = 0;
                },
                // ZERO LAYOUT READS IN onUpdate — purely mathematical execution
                onUpdate: (self) => {
                  const currentX = -self.progress * travelRef.current;
                  applyCurvature(currentX);

                  // Update active indicator without any layout queries
                  const centers = cardCentersRef.current;
                  let closestIdx = 0;
                  let minAbsDist = Infinity;
                  for (let i = 0; i < centers.length; i++) {
                    const cardScreenX = currentX + centers[i];
                    const absDist = Math.abs(cardScreenX - viewportCenter);
                    if (absDist < minAbsDist) {
                      minAbsDist = absDist;
                      closestIdx = i;
                    }
                  }
                  const normalizedIdx = closestIdx % SIGNATURE_ENSEMBLES.length;
                  if (normalizedIdx !== activeIndexRef.current) {
                    activeIndexRef.current = normalizedIdx;
                    requestAnimationFrame(() => {
                      setActiveIndex(normalizedIdx);
                    });
                  }
                },
                onRefresh: () => {
                  cacheMetrics();
                  applyCurvature();
                },
              },
            }
          );

          return () => {
            scrollTween.kill();
            track.style.transform = '';
            cards.forEach((c) => {
              c.style.transform = '';
              c.style.webkitTransform = '';
            });
          };
        }
      );

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [cacheMetrics, applyCurvature] }
  );

  // Memoize the 12 heavy card elements so activeIndex state updates never re-render the track during scroll
  const memoizedTrack = useMemo(
    () => (
      <div
        ref={trackRef}
        className="relative flex gap-3.5 sm:gap-4 lg:gap-3.5 items-start pl-6 sm:pl-8 lg:pl-12 pr-6 sm:pr-8 w-max will-change-transform"
      >
        {DISPLAY_ENSEMBLES.map((item, index) => {
          const displayIndex = (index % SIGNATURE_ENSEMBLES.length) + 1;
          return (
            <div
              key={`${item.id}-${index}`}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="relative z-10 shrink-0 w-[260px] xs:w-[275px] sm:w-[285px] lg:w-[290px] h-[405px] xs:h-[425px] sm:h-[445px] lg:h-[455px] will-change-transform select-none hover:z-50"
              style={{
                transformOrigin: '50% 50%',
              }}
            >
              <Link
                href={item.href}
                className="panoramic-card group relative w-full h-full rounded-2xl sm:rounded-t-[110px] sm:rounded-b-2xl lg:rounded-2xl overflow-hidden bg-neutral-900 shadow-xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(154,142,186,0.3)] transition-all duration-300 ease-out hover:-translate-y-3 hover:scale-[1.025] border border-neutral-700/50 hover:border-primary-400 flex flex-col justify-end p-4 sm:p-5 cursor-pointer block ring-0 hover:ring-1 hover:ring-primary-400/60"
              >
                {/* Background Luxury Fashion Model Photo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt={item.title}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-108 pointer-events-none"
                  loading="lazy"
                  decoding="async"
                />

                {/* Arched Crown Top Ambient Glow */}
                <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-primary-400/25 via-primary-400/5 to-transparent pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-300" />

                {/* Editorial Gradient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent opacity-95 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none" />

                {/* Top Badge: Ensemble Index */}
                <div className="absolute top-3 sm:top-4 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none whitespace-nowrap">
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-primary-200 bg-black/75 group-hover:bg-primary-700/90 backdrop-blur-md px-3 py-0.5 rounded-full border border-primary-400/40 group-hover:border-primary-400 shadow-md transition-colors duration-300">
                    0{displayIndex} / 0{SIGNATURE_ENSEMBLES.length}
                  </span>
                </div>

                {/* Bottom Editorial Content */}
                <div className="relative z-10 space-y-1 sm:space-y-1.5 pointer-events-none">
                  <div className="flex items-center gap-2">
                    <span className="text-[8px] xs:text-[9px] font-nav uppercase tracking-[0.2em] bg-black/60 group-hover:bg-primary-600/30 backdrop-blur-md px-2 py-0.5 rounded-full text-primary-200 border border-primary-400/30 group-hover:border-primary-400 transition-colors duration-300">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="font-serif text-sm xs:text-base sm:text-lg lg:text-xl text-white font-medium group-hover:text-primary-200 transition-colors duration-300 line-clamp-1 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-[10px] xs:text-[11px] sm:text-xs font-sans text-neutral-300/80 group-hover:text-neutral-200 transition-colors duration-300 line-clamp-1">
                    {item.craft}
                  </p>

                  <div className="pt-1.5 flex items-center justify-between text-[11px] xs:text-xs font-nav uppercase tracking-wider text-neutral-300/90 group-hover:text-white border-t border-neutral-700/50 group-hover:border-primary-400/50 transition-colors duration-300">
                    <span className="font-serif font-bold text-primary-300 text-xs xs:text-sm sm:text-base group-hover:text-white transition-colors">
                      {item.price}
                    </span>
                    <div className="flex items-center gap-1 text-[10px] xs:text-[11px] sm:text-xs text-primary-400 group-hover:text-primary-300 transition-colors font-semibold">
                      <span>View</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    ),
    []
  );

  return (
    <section
      id="woven-to-be-remembered"
      ref={sectionRef}
      className="relative w-full bg-surface-300 text-neutral-900 overflow-hidden"
    >
      {/* Viewport Container: Pinned during scrolling animation with header clearance */}
      <div
        ref={pinWrapperRef}
        className="w-full min-h-screen flex flex-col justify-between pt-16 sm:pt-20 lg:pt-16 pb-8 sm:pb-10 relative bg-surface-300"
      >
        {/* Header Row: THE VAULT SIGNATURES / Woven to Be Remembered */}
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 shrink-0">
          <div>
            <div className="text-[10px] sm:text-[11px] font-nav uppercase tracking-[0.28em] text-neutral-600 font-semibold mb-1">
              THE VAULT SIGNATURES
            </div>
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[40px] font-normal tracking-tight text-neutral-900 leading-none">
              <span>Woven</span> <span>to</span> <span>Be</span>{' '}
              <span className="font-serif italic text-primary-600 font-light ml-1 text-[1.12em]">
                Remembered
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-500">
              Curated 01 / 2026
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary-600" />
            <Link
              href="/collections/all"
              className="inline-flex items-center gap-1.5 text-xs font-nav uppercase tracking-widest text-primary-700 hover:text-primary-800 transition-colors font-semibold group pb-0.5 border-b border-primary-700/30 hover:border-primary-700"
            >
              <span>Explore All ({SIGNATURE_ENSEMBLES.length})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Circular Panoramic Strip: overflow-visible with ample bottom clearance */}
        <div className="relative w-full select-none my-auto pt-4 pb-12 sm:pb-20 lg:pb-24 overflow-visible">
          {/* Horizontal Track Container */}
          {memoizedTrack}
        </div>

        {/* Bottom Bar: Interactive Step Indicators & Complete Archives Link */}
        <div className="shrink-0 flex flex-col items-center gap-2.5 px-4 pt-2 pb-2 relative z-20">
          {/* Active Ensemble Step Indicator */}
          <div className="flex items-center justify-between w-full max-w-[340px]">
            <button
              type="button"
              onClick={() => scrollToCard(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous signature ensemble"
              className="w-8 h-8 rounded-full border border-neutral-300 bg-surface-100 flex items-center justify-center text-neutral-800 hover:border-primary-400 hover:text-primary-700 active:scale-95 transition-all disabled:opacity-25 disabled:pointer-events-none cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4 text-neutral-800" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono tracking-widest text-neutral-700 font-semibold">
                0{activeIndex + 1}
              </span>
              <div className="flex items-center gap-1.5 px-1.5">
                {SIGNATURE_ENSEMBLES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => scrollToCard(idx)}
                    aria-label={`Go to ensemble 0${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === idx
                        ? 'w-6 bg-primary-600'
                        : 'w-1.5 bg-neutral-300 hover:bg-primary-400'
                    }`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-mono tracking-widest text-neutral-500">
                0{SIGNATURE_ENSEMBLES.length}
              </span>
            </div>

            <button
              type="button"
              onClick={() => scrollToCard(activeIndex + 1)}
              disabled={activeIndex === SIGNATURE_ENSEMBLES.length - 1}
              aria-label="Next signature ensemble"
              className="w-8 h-8 rounded-full border border-neutral-300 bg-surface-100 flex items-center justify-center text-neutral-800 hover:border-primary-400 hover:text-primary-700 active:scale-95 transition-all disabled:opacity-25 disabled:pointer-events-none cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-4 h-4 text-neutral-800" />
            </button>
          </div>

          <Link
            href="/collections/all"
            className="inline-flex items-center gap-2 text-[11px] font-nav uppercase tracking-[0.2em] font-semibold text-primary-700 hover:text-primary-800 pb-0.5 border-b border-primary-300 transition-all group"
          >
            <Sparkles className="w-3.5 h-3.5 text-primary-600" />
            <span>Discover The Complete Atelier Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WovenToBeRemembered;
