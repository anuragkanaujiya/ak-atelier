'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import { AUTUMN_WINTER_DATA } from '@/data/autumnWinter';
import { EDITS_FOR_OCCASION_DATA } from '@/data/editsForOccasion';
import { WORTH_YOUR_ATTENTION_DATA } from '@/data/worthYourAttention';
import { BRIDAL_ENSEMBLES } from '@/data/bridal';
import { LATEST_TRENDS_DATA } from '@/data/latestTrends';
import { CINEMATIC_STORIES } from '@/data/cinematicStories';
import { CHANGE_LOOK_PRODUCTS } from '@/data/changeLook';
import { CRAFT_SANCTUM_PILLARS } from '@/data/atelier';
import { NEW_ARRIVALS_PRODUCTS } from '@/data/newArrivals';
import { BEST_SELLERS_PRODUCTS } from '@/data/bestSellers';
import { PRODUCTS } from '@/data/products';

// ─── Section image batches (index = section order) ────────────────────────────

/** Section 1: Six Moods of Silk (Haute Couture expressions) */
const SECTION_0_IMAGES = [
  '/images/products/3d_crema_pant_suit.webp',
  '/images/products/3d_camel_cashmere_coat.webp',
  '/images/products/3d_black_silk_gown.webp',
  '/images/products/3d_milano_trench_coat.webp',
  '/images/products/3d_espresso_leather_trench.webp',
  '/images/products/3d_charcoal_wool_tuxedo.webp',
];

/** Section 2: Woven to Be Remembered Panoramic Signatures */
const SECTION_1_IMAGES = [
  '/images/products/notte-asymmetric-silk-column-gown_studio.webp',
  '/images/products/crema-double-breasted-pant-suit_studio.webp',
  '/images/products/belvedere-camel-cashmere-overcoat_studio.webp',
  '/images/products/emerald-bias-cut-liquid-satin-dress_studio.webp',
  '/images/products/milano-gabardine-trench-coat_studio.webp',
  '/images/products/brera-double-breasted-dinner-tuxedo_studio.webp',
];

/**
 * Curated list of high-priority section images used across homepage cards.
 * Kept for backwards compatibility with other consumers.
 */
const BASE_SECTION_IMAGES = [...SECTION_0_IMAGES, ...SECTION_1_IMAGES];

/**
 * Aggregates all card image URLs across sections to guarantee instant,
 * un-faded rendering when scroll triggers activate.
 */
export function getAllSectionImageUrls(): string[] {
  const urls: string[] = [...BASE_SECTION_IMAGES];

  // Autumn-Winter Cathedral Arch Cards
  AUTUMN_WINTER_DATA.campaigns.forEach((c) => {
    if (c.image) urls.push(c.image);
    if (c.images?.[0]) urls.push(c.images[0]);
  });

  // Edits for Every Occasion Portals
  EDITS_FOR_OCCASION_DATA.edits.forEach((e) => {
    if (e.image) urls.push(e.image);
  });

  // Worth Your Attention Accordion Spotlight Cards
  WORTH_YOUR_ATTENTION_DATA.products.forEach((p) => {
    if (p.images?.[0]) urls.push(p.images[0]);
  });

  // The Bridal Collection Ensembles
  BRIDAL_ENSEMBLES.forEach((b) => {
    if (b.image) urls.push(b.image);
  });

  // Latest Trends Deck Cards
  LATEST_TRENDS_DATA.products.forEach((t) => {
    if (t.images?.[0]) urls.push(t.images[0]);
  });

  // Cinematic Stories (Background and Card Thumbs)
  CINEMATIC_STORIES.forEach((s) => {
    if (s.bgImage) urls.push(s.bgImage);
    if (s.cardThumbnail) urls.push(s.cardThumbnail);
  });

  // Change Your Look Center Models & Looks
  CHANGE_LOOK_PRODUCTS.forEach((l) => {
    if (l.images?.[0]) urls.push(l.images[0]);
  });

  // Atelier Karigari Pillars
  CRAFT_SANCTUM_PILLARS.forEach((p) => {
    if (p.macroImage) urls.push(p.macroImage);
  });

  // New Arrivals (Section 3)
  NEW_ARRIVALS_PRODUCTS.forEach((p) => {
    if (p.images?.[0]) urls.push(p.images[0]);
  });

  // Best Sellers (Section 4)
  BEST_SELLERS_PRODUCTS.forEach((p) => {
    if (p.images?.[0]) urls.push(p.images[0]);
  });

  // Catalog Products Fallback
  PRODUCTS.slice(0, 8).forEach((p) => {
    if (p.images?.[0]) urls.push(p.images[0]);
  });

  return Array.from(new Set(urls.filter(Boolean)));
}

/**
 * In-memory image cache so decoded bitmaps stay resident in GPU memory
 */
const imageMemoryCache = new Set<string>();

/**
 * Proactively preloads and decodes an image so it renders immediately with zero white fade
 */
export function preloadAndDecodeImage(url: string): Promise<void> {
  if (typeof window === 'undefined' || !url || imageMemoryCache.has(url)) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;

    if (typeof img.decode === 'function') {
      img
        .decode()
        .then(() => {
          imageMemoryCache.add(url);
          resolve();
        })
        .catch(() => {
          // If decode fails or gets aborted, mark as cached once loaded
          img.onload = () => {
            imageMemoryCache.add(url);
            resolve();
          };
          img.onerror = () => resolve();
        });
    } else {
      (img as HTMLImageElement).onload = () => {
        imageMemoryCache.add(url);
        resolve();
      };
      (img as HTMLImageElement).onerror = () => resolve();
    }
  });
}

// ─── Lazy batches for sections 2–13 ────────────────────────────────────────

function getLazyBatches(): string[][] {
  const bridal: string[] = [];
  BRIDAL_ENSEMBLES.forEach((b) => { if (b.image) bridal.push(b.image); });

  const newArrivals: string[] = [];
  NEW_ARRIVALS_PRODUCTS.forEach((p) => { if (p.images?.[0]) newArrivals.push(p.images[0]); });

  const bestSellers: string[] = [];
  BEST_SELLERS_PRODUCTS.forEach((p) => { if (p.images?.[0]) bestSellers.push(p.images[0]); });

  const trends: string[] = [];
  AUTUMN_WINTER_DATA.campaigns.forEach((c) => {
    if (c.image) trends.push(c.image);
    if (c.images?.[0]) trends.push(c.images[0]);
  });
  EDITS_FOR_OCCASION_DATA.edits.forEach((e) => { if (e.image) trends.push(e.image); });

  const deep: string[] = [];
  WORTH_YOUR_ATTENTION_DATA.products.forEach((p) => { if (p.images?.[0]) deep.push(p.images[0]); });
  LATEST_TRENDS_DATA.products.forEach((t) => { if (t.images?.[0]) deep.push(t.images[0]); });
  CINEMATIC_STORIES.forEach((s) => {
    if (s.bgImage) deep.push(s.bgImage);
    if (s.cardThumbnail) deep.push(s.cardThumbnail);
  });
  CHANGE_LOOK_PRODUCTS.forEach((l) => { if (l.images?.[0]) deep.push(l.images[0]); });
  CRAFT_SANCTUM_PILLARS.forEach((p) => { if (p.macroImage) deep.push(p.macroImage); });

  return [
    [...newArrivals, ...bestSellers],  // batch 0 → sections 2-3
    bridal,                            // batch 1 → section 4 (BridalCollection)
    trends,                            // batch 2 → sections 5-8 (Trends, AutumnWinter, etc.)
    deep,                              // batch 3 → sections 9-13 (deep scroll)
  ];
}

// Singleton: resolved lazily so data imports stay tree-shakeable
let _lazyBatches: string[][] | null = null;
function getLazyBatchesMemo(): string[][] {
  if (!_lazyBatches) _lazyBatches = getLazyBatches();
  return _lazyBatches;
}

function scheduleIdlePreload(urls: string[], timeout = 1500): void {
  if (typeof window === 'undefined') return;
  const doPreload = () => urls.forEach((url) => preloadAndDecodeImage(url));
  if ('requestIdleCallback' in window) {
    (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
      .requestIdleCallback(doPreload, { timeout });
  } else {
    setTimeout(doPreload, timeout);
  }
}

// ─── Component ─────────────────────────────────────────────────────────────

/**
 * Central Image Preloader Component — viewport-aware progressive loading.
 *
 * Strategy:
 *  • Phase 1 (mount): immediately preload above-fold images (SixMoods + WovenToBeRemembered)
 *  • Phase 2 (IntersectionObserver): when a sentinel div enters the viewport, trigger
 *    preloading of the NEXT batch ("look-ahead" strategy)
 *  • Phase 3 (requestIdleCallback): non-critical deep-scroll sections load on idle
 *
 * Renders invisible sentinel `<div>` anchors for each section transition point.
 */
export const SectionImagePreloader: React.FC = () => {
  const batchLoaded = useRef<boolean[]>([false, false, false, false]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Phase 1: Preload Six Moods images on idle (Section 1)
    scheduleIdlePreload(SECTION_0_IMAGES, 800);

    // Phase 2: Staged section-by-section lookahead preloading
    // Only preloads assets for upcoming sections when the user scrolls near them
    const batches = getLazyBatchesMemo();
    const sectionTargets = [
      'six-moods',             // Approaching six-moods -> preload Woven signatures & new arrivals
      'woven-to-be-remembered',// Approaching woven -> preload bridal
      'autumn-winter-2026',    // Approaching autumn winter -> preload trends & occasion edits
      'worth-your-attention',  // Approaching spotlight -> preload deep stories & atelier
    ];

    const observers: IntersectionObserver[] = [];

    const timer = setTimeout(() => {
      sectionTargets.forEach((targetId, i) => {
        const el = document.getElementById(targetId);
        if (!el) return;

        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && !batchLoaded.current[i]) {
              batchLoaded.current[i] = true;
              const urls = i === 0 ? [...SECTION_1_IMAGES, ...(batches[0] ?? [])] : batches[i] ?? [];
              scheduleIdlePreload(urls, 250);
              observer.disconnect();
            }
          },
          {
            rootMargin: '400px 0px 400px 0px',
            threshold: 0.01,
          }
        );

        observer.observe(el);
        observers.push(observer);
      });
    }, 150);

    return () => {
      clearTimeout(timer);
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return null;
};
