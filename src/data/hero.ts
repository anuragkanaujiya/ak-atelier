/**
 * AK ATELIER Flagship Hero Walkthrough Configuration and Editorial Chapters
 * Complies with AGENTS.md decoupled data standards (Rule 4) & scrollytelling-canvas-sequence standards.
 */

export interface HotspotTrajectoryKeyframe {
  frame: number; // exact video frame index 1 to 240
  progress: number; // 0.0 to 1.0
  x: number; // percentage from left (0 to 100)
  y: number; // percentage from top (0 to 100)
  scale?: number; // scale relative to camera perspective
}

export interface ShoppableHotspot {
  id: string;
  productId: string;
  name: string;
  category: string;
  price: number;
  image: string; // Strictly 3D product render
  href: string;
  badge?: string;
  startFrame: number; // frame where garment becomes visible
  endFrame: number; // frame where camera passes garment
  visibleRangeStart: number; // progress 0.0 to 1.0
  visibleRangeEnd: number;
  x: number; // default percentage from left
  y: number; // default percentage from top
  frameDescription?: string;
  trajectory?: HotspotTrajectoryKeyframe[];
}

export interface HeroChapter {
  id: string;
  chapterNumber: number;
  label: string;
  rangeStart: number;
  rangeEnd: number;
  eyebrow: string;
  title: string;
  titleHighlight?: string;
  description: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  hotspots?: ShoppableHotspot[];
}

export interface HeroConfig {
  totalFrames: number;
  scrollDistanceVh: number;
  framePathPrefix: string;
  initialPosterPath: string;
  pillBadgeText: string;
  chapters: HeroChapter[];
  hotspots: ShoppableHotspot[];
}

export const HERO_CONFIG: HeroConfig = {
  totalFrames: 240,
  scrollDistanceVh: 350, // Cinematic, buttery-smooth scroll pace for 240 frames
  framePathPrefix: '/hero-frames/frame_',
  initialPosterPath: '/hero-frames/frame_001.webp',
  pillBadgeText: 'AK ATELIER · Milan Flagship & Haute Couture',
  hotspots: [
    {
      id: 'pin-01',
      productId: 'belvedere-camel-cashmere-overcoat',
      name: 'Belvedere Camel Cashmere Overcoat',
      category: 'Outerwear',
      price: 245000,
      image: '/images/products/3d_camel_cashmere_coat.webp',
      href: '/product/belvedere-camel-cashmere-overcoat',
      badge: '3D 100% Cashmere',
      startFrame: 1,
      endFrame: 48,
      visibleRangeStart: 0.0,
      visibleRangeEnd: 0.20,
      x: 28.5,
      y: 48.0,
      frameDescription: 'Entrance Window Display · Camel Cashmere',
      trajectory: [
        { frame: 1, progress: 0.0, x: 28.5, y: 48.0, scale: 0.9 },
        { frame: 15, progress: 0.06, x: 25.5, y: 48.0, scale: 1.0 },
        { frame: 30, progress: 0.12, x: 20.0, y: 48.0, scale: 1.15 },
        { frame: 45, progress: 0.18, x: 10.0, y: 48.0, scale: 1.3 },
        { frame: 48, progress: 0.20, x: 3.0, y: 48.0, scale: 1.4 },
      ],
    },
    {
      id: 'pin-02',
      productId: 'brera-double-breasted-dinner-tuxedo',
      name: 'The Brera Virgin Wool Dinner Tuxedo',
      category: 'Bespoke Suiting',
      price: 220000,
      image: '/images/products/3d_charcoal_wool_tuxedo.webp',
      href: '/product/brera-double-breasted-dinner-tuxedo',
      badge: '3D Super 130s Wool',
      startFrame: 1,
      endFrame: 48,
      visibleRangeStart: 0.0,
      visibleRangeEnd: 0.20,
      x: 71.8,
      y: 48.0,
      frameDescription: 'Entrance Window Display · Virgin Wool',
      trajectory: [
        { frame: 1, progress: 0.0, x: 71.8, y: 48.0, scale: 0.9 },
        { frame: 15, progress: 0.06, x: 75.0, y: 48.0, scale: 1.0 },
        { frame: 30, progress: 0.12, x: 82.0, y: 48.0, scale: 1.15 },
        { frame: 45, progress: 0.18, x: 92.0, y: 48.0, scale: 1.3 },
        { frame: 48, progress: 0.20, x: 97.0, y: 48.0, scale: 1.4 },
      ],
    },
    {
      id: 'pin-03',
      productId: 'the-duomo-box-calf-top-handle-bag',
      name: 'The Duomo Box Calf Top-Handle Bag',
      category: 'Leather Goods',
      price: 125000,
      image: '/images/products/3d_atelier_leather_bag.webp',
      href: '/product/the-duomo-box-calf-top-handle-bag',
      badge: '3D Tuscan Box Calf',
      startFrame: 45,
      endFrame: 112,
      visibleRangeStart: 0.18,
      visibleRangeEnd: 0.46,
      x: 34.5,
      y: 50.0,
      frameDescription: 'Left Plinth Counter · Handcrafted Leather',
      trajectory: [
        { frame: 45, progress: 0.18, x: 34.5, y: 50.0, scale: 0.8 },
        { frame: 60, progress: 0.25, x: 29.5, y: 50.5, scale: 0.9 },
        { frame: 75, progress: 0.31, x: 24.5, y: 51.0, scale: 1.05 },
        { frame: 90, progress: 0.37, x: 17.5, y: 51.5, scale: 1.2 },
        { frame: 110, progress: 0.45, x: 7.0, y: 52.5, scale: 1.4 },
      ],
    },
    {
      id: 'pin-04',
      productId: 'crema-double-breasted-pant-suit',
      name: 'The Crema Double-Breasted Pant Suit',
      category: 'Tailored Suiting',
      price: 185000,
      image: '/images/products/3d_crema_pant_suit.webp',
      href: '/product/crema-double-breasted-pant-suit',
      badge: '3D Runway Masterpiece',
      startFrame: 30,
      endFrame: 192,
      visibleRangeStart: 0.12,
      visibleRangeEnd: 0.80,
      x: 44.5,
      y: 47.5,
      frameDescription: 'Center Aisle Marble Plinth Mannequin',
      trajectory: [
        { frame: 30, progress: 0.12, x: 44.5, y: 47.5, scale: 0.65 },
        { frame: 60, progress: 0.25, x: 43.5, y: 46.5, scale: 0.75 },
        { frame: 90, progress: 0.37, x: 42.0, y: 45.0, scale: 0.9 },
        { frame: 120, progress: 0.50, x: 39.5, y: 44.0, scale: 1.1 },
        { frame: 150, progress: 0.62, x: 35.5, y: 42.5, scale: 1.4 },
        { frame: 175, progress: 0.72, x: 28.0, y: 41.0, scale: 1.8 },
        { frame: 190, progress: 0.79, x: 18.0, y: 39.5, scale: 2.1 },
      ],
    },
    {
      id: 'pin-05',
      productId: 'notte-asymmetric-silk-column-gown',
      name: 'Notte Asymmetric Silk Column Gown',
      category: 'Eveningwear',
      price: 165000,
      image: '/images/products/3d_black_silk_gown.webp',
      href: '/product/notte-asymmetric-silk-column-gown',
      badge: '3D Mulberry Silk',
      startFrame: 90,
      endFrame: 178,
      visibleRangeStart: 0.37,
      visibleRangeEnd: 0.74,
      x: 63.5,
      y: 51.5,
      frameDescription: 'Right Hanging Rack · Draped Silk Column',
      trajectory: [
        { frame: 90, progress: 0.37, x: 63.5, y: 51.5, scale: 0.75 },
        { frame: 110, progress: 0.45, x: 67.5, y: 51.8, scale: 0.9 },
        { frame: 130, progress: 0.54, x: 72.0, y: 52.0, scale: 1.1 },
        { frame: 150, progress: 0.62, x: 78.0, y: 52.2, scale: 1.35 },
        { frame: 175, progress: 0.72, x: 88.0, y: 52.5, scale: 1.65 },
      ],
    },
    {
      id: 'pin-06',
      productId: 'milano-gabardine-trench-coat',
      name: 'The Milano Gabardine Trench Coat',
      category: 'Trench & Rainwear',
      price: 195000,
      image: '/images/products/3d_milano_trench_coat.webp',
      href: '/product/milano-gabardine-trench-coat',
      badge: '3D Biella Gabardine',
      startFrame: 145,
      endFrame: 240,
      visibleRangeStart: 0.60,
      visibleRangeEnd: 1.0,
      x: 62.5,
      y: 50.5,
      frameDescription: 'Mid-Salon White Tailoring Rack',
      trajectory: [
        { frame: 145, progress: 0.60, x: 62.5, y: 50.5, scale: 0.8 },
        { frame: 175, progress: 0.72, x: 64.0, y: 50.0, scale: 0.95 },
        { frame: 200, progress: 0.83, x: 65.5, y: 49.5, scale: 1.1 },
        { frame: 225, progress: 0.93, x: 67.0, y: 49.0, scale: 1.25 },
        { frame: 240, progress: 1.0, x: 68.0, y: 48.5, scale: 1.35 },
      ],
    },
    {
      id: 'pin-07',
      productId: 'palazzo-nappa-leather-trench',
      name: 'Palazzo Nappa Leather Trench',
      category: 'Leather & Shearling',
      price: 295000,
      image: '/images/products/3d_espresso_leather_trench.webp',
      href: '/product/palazzo-nappa-leather-trench',
      badge: '3D Italian Nappa',
      startFrame: 135,
      endFrame: 240,
      visibleRangeStart: 0.56,
      visibleRangeEnd: 1.0,
      x: 47.0,
      y: 48.5,
      frameDescription: 'Deep Salon Center Mannequin · Black Couture',
      trajectory: [
        { frame: 135, progress: 0.56, x: 47.0, y: 48.5, scale: 0.75 },
        { frame: 165, progress: 0.68, x: 46.2, y: 48.5, scale: 0.85 },
        { frame: 195, progress: 0.81, x: 45.4, y: 48.5, scale: 1.0 },
        { frame: 220, progress: 0.91, x: 44.8, y: 48.8, scale: 1.15 },
        { frame: 240, progress: 1.0, x: 44.2, y: 49.0, scale: 1.3 },
      ],
    },
  ],
  chapters: [
    {
      id: 'prologue',
      chapterNumber: 0,
      label: 'PROLOGUE',
      rangeStart: 0,
      rangeEnd: 0.24,
      eyebrow: 'Autumn–Winter 2026',
      title: 'AK ATELIER',
      titleHighlight: 'MILAN FLAGSHIP',
      description:
        'Step inside the European flagship. Where architectural tailoring, pure Mongolian cashmere, and fluid mulberry silk gowns define contemporary haute couture.',
      primaryCta: {
        label: 'EXPLORE RUNWAY COLLECTION',
        href: '/collections/all',
      },
      secondaryCta: {
        label: 'DISCOVER OUR ATELIER',
        href: '/our-craft',
      },
    },
    {
      id: 'chapter-1',
      chapterNumber: 1,
      label: 'CHAPTER I',
      rangeStart: 0.24,
      rangeEnd: 0.52,
      eyebrow: 'Chapter I · Architectural Suiting',
      title: 'Precision In Every Seam',
      description:
        'Hand-canvassed double-breasted suits in cream virgin wool paired with fluid wide-leg silhouettes. Savile Row construction tailored for the modern posture.',
    },
    {
      id: 'chapter-2',
      chapterNumber: 2,
      label: 'CHAPTER II',
      rangeStart: 0.52,
      rangeEnd: 0.76,
      eyebrow: 'Chapter II · Sculptural Outerwear',
      title: 'The Cashmere Belvedere',
      description:
        'Pure 480 GSM unbrushed cashmere overcoats and gabardine trench coats in warm camel and obsidian tones, finished with horn buttons cast in Florence.',
    },
    {
      id: 'chapter-3',
      chapterNumber: 3,
      label: 'CHAPTER III',
      rangeStart: 0.76,
      rangeEnd: 1.0,
      eyebrow: 'Chapter III · Evening Haute Couture',
      title: 'Fluid Silk & Evening Silhouettes',
      description:
        'Bias-cut column gowns and sculptural slip dresses crafted from 28-momme Mulberry silk satin, designed for black-tie galas and private soirees.',
      primaryCta: {
        label: 'SHOP EVENINGWEAR',
        href: '/collections/all?category=eveningwear',
      },
      secondaryCta: {
        label: 'VIEW TAILORING',
        href: '/collections/all?category=suiting',
      },
    },
  ],
};

/**
 * Generates the full array of frame URLs for the 240-frame boutique sequence
 */
export const HERO_FRAME_PATHS: string[] = Array.from(
  { length: HERO_CONFIG.totalFrames },
  (_, i) => {
    const padded = String(i + 1).padStart(3, '0');
    return `${HERO_CONFIG.framePathPrefix}${padded}.webp`;
  }
);
