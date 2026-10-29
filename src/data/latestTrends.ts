import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';

/**
 * ============================================================================
 * BACKEND API & DATABASE INTEGRATION GUIDE: LATEST TRENDS (CARD DECK STUDIO)
 * ============================================================================
 * Endpoint: GET /api/v1/trends/deck
 * Description: Flagship editorial "Latest Trends" card deck showcase
 *              with interactive card stacking ("taas ke paate") and range navigation.
 * ============================================================================
 */

export type TrendDeckProduct = Product & {
  formattedPrice: string;
  rangeCategory: string;
  rangeCategorySlug: string;
  storyBehindDrape: string;
  actionHref: string;
};

export interface RangeCategoryItem {
  id: string;
  name: string;
  slug: string;
  count: number;
  href: string;
}

export interface LatestTrendsData {
  eyebrow: string;
  headingPrimary: string;
  headingSecondary: string;
  ctaText: string;
  ctaHref: string;
  storyHeading: string;
  storyDescription: string;
  rangeHeading: string;
  rangeCategories: RangeCategoryItem[];
  products: TrendDeckProduct[];
}

export const LATEST_TRENDS_PRODUCTS: TrendDeckProduct[] = [
  {
    id: 'prod-trend-001',
    name: 'The Crema Double-Breasted Pant Suit',
    slug: 'crema-double-breasted-pant-suit',
    tagline: 'Super 150s Italian Virgin Wool with Floating Horsehair Canvas',
    description:
      'Sculpted in our Milanese atelier from superfine Italian virgin wool. Peaked lapels with hand-stitched pick detailing, relaxed double-breasted closure, and fluid high-waisted pleated wide-leg trousers.',
    category: 'tailored-suiting',
    categoryName: 'Tailored Suiting',
    gender: 'women',
    price: 185000,
    originalPrice: 215000,
    images: [
      '/images/products/3d_crema_pant_suit.webp',
      '/images/products/crema-double-breasted-pant-suit_model.webp',
      '/images/products/crema-double-breasted-pant-suit_side.webp',
    ],
    colors: [
      { name: 'Crema Ivory', hex: '#F5F2EB', imageIndex: 0 },
      { name: 'Milanese Model', hex: '#E4DFF0', imageIndex: 1 },
      { name: 'Obsidian Black', hex: '#1A1A1A', imageIndex: 2 },
    ],
    sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42', 'IT 44'],
    fabric: '100% Super 150s Virgin Wool; Lining: 100% Cupro',
    embroidery: 'Hand-sewn pick-stitch lapels and Milanese buttonholes',
    occasion: ['Runway Gala', 'Executive', 'Cocktail'],
    craftsmanshipStory: 'Tailored over 36 hours of hand-canvassing with floating horsehair chest piece.',
    careInstructions: ['Specialist Couture Dry Clean Only'],
    deliveryDays: 3,
    has3D: true,
    badge: 'Milan Runway',
    inStock: true,
    rating: 4.98,
    reviewsCount: 142,
    featured: true,
    sectionMetadata: {
      trendVelocity: '184 pieces commissioned this season',
      badge: 'Milan Runway',
      storyBehindDrape:
        'Sculpted in our Milanese atelier to honor Northern Italian suiting heritage. The floating horsehair canvas molds dynamically to the wearer\'s posture.',
      rangeCategory: 'Tailored Suiting',
      rangeCategorySlug: 'tailored-suiting',
      href: '/product/crema-double-breasted-pant-suit',
    },
    formattedPrice: formatINR(185000),
    rangeCategory: 'Tailored Suiting',
    rangeCategorySlug: 'tailored-suiting',
    storyBehindDrape:
      'Sculpted in our Milanese atelier to honor Northern Italian suiting heritage. The floating horsehair canvas molds dynamically to the wearer\'s posture.',
    actionHref: '/product/crema-double-breasted-pant-suit',
  },
  {
    id: 'prod-trend-002',
    name: 'Belvedere Camel Cashmere Overcoat',
    slug: 'belvedere-camel-cashmere-overcoat',
    tagline: 'Pure 480 GSM Mongolian Cashmere Icon',
    description:
      'Double-faced unbrushed cashmere offering weightless warmth and unstructured Italian volume, finished with hand-carved Florentine horn buttons.',
    category: 'coats-outerwear',
    categoryName: 'Coats & Outerwear',
    gender: 'women',
    price: 245000,
    originalPrice: 280000,
    images: [
      '/images/products/3d_camel_cashmere_coat.webp',
      '/images/products/belvedere-camel-cashmere-overcoat_model.webp',
      '/images/products/belvedere-camel-cashmere-overcoat_side.webp',
    ],
    colors: [
      { name: 'Camel Sand', hex: '#C49A6C', imageIndex: 0 },
      { name: 'Rose Mauve', hex: '#BE7FA8', imageIndex: 1 },
      { name: 'Charcoal Grey', hex: '#333333', imageIndex: 2 },
    ],
    sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42', 'IT 44'],
    fabric: '100% Grade-A Mongolian Cashmere (480 GSM)',
    embroidery: 'Saddle-stitch edges and hand-attached horn buttons',
    occasion: ['Winter Gala', 'Travel', 'Daily Quiet Luxury'],
    craftsmanshipStory: 'Double-faced cashmere hand-split and blind-stitched by master artisans in Biella.',
    careInstructions: ['Professional Cashmere Dry Clean Only'],
    deliveryDays: 4,
    has3D: true,
    badge: 'Atelier Signature',
    inStock: true,
    rating: 4.99,
    reviewsCount: 156,
    featured: true,
    sectionMetadata: {
      trendVelocity: 'Over 210 VIP reservations',
      badge: 'Atelier Signature',
      storyBehindDrape:
        'Crafted from rare long-staple Mongolian cashmere. Master artisans invisibly roll and blind-stitch all borders by hand for a seam-free silhouette.',
      rangeCategory: 'Coats & Trench',
      rangeCategorySlug: 'coats-outerwear',
      href: '/product/belvedere-camel-cashmere-overcoat',
    },
    formattedPrice: formatINR(245000),
    rangeCategory: 'Coats & Trench',
    rangeCategorySlug: 'coats-outerwear',
    storyBehindDrape:
      'Crafted from rare long-staple Mongolian cashmere. Master artisans invisibly roll and blind-stitch all borders by hand for a seam-free silhouette.',
    actionHref: '/product/belvedere-camel-cashmere-overcoat',
  },
  {
    id: 'prod-trend-003',
    name: 'Notte Asymmetric Silk Column Gown',
    slug: 'notte-asymmetric-silk-column-gown',
    tagline: 'Heavy 28mm Mulberry Silk Satin Evening Gown',
    description:
      'Liquid silk eveningwear cut on the true bias to drape effortlessly with the natural movements of the body.',
    category: 'evening-dresses',
    categoryName: 'Eveningwear & Gowns',
    gender: 'women',
    price: 165000,
    originalPrice: 190000,
    images: [
      '/images/products/3d_black_silk_gown.webp',
      '/images/products/notte-asymmetric-silk-column-gown_model.webp',
      '/images/products/notte-asymmetric-silk-column-gown_side.webp',
    ],
    colors: [
      { name: 'Obsidian Black', hex: '#0C0C0E', imageIndex: 0 },
      { name: 'Milan Model', hex: '#40384F', imageIndex: 1 },
      { name: 'Emerald Satin', hex: '#132B20', imageIndex: 2 },
    ],
    sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42'],
    fabric: '100% Pure Mulberry Silk Satin (28 Momme)',
    embroidery: 'Hand-rolled baby hem and concealed Swiss invisible zipper',
    occasion: ['Red Carpet', 'Black Tie Gala', 'Private Soiree'],
    craftsmanshipStory: 'Draped on live atelier fit models in Milan for liquid silk motion.',
    careInstructions: ['Delicate Silk Dry Clean Only'],
    deliveryDays: 3,
    has3D: true,
    badge: 'Red Carpet Edit',
    inStock: true,
    rating: 4.98,
    reviewsCount: 138,
    featured: true,
    sectionMetadata: {
      trendVelocity: 'Red Carpet Debut in Venice',
      badge: 'Red Carpet Edit',
      storyBehindDrape:
        'Cut along the exact 45-degree grain of Como silk charmeuse. The asymmetric neckline floats effortlessly, capturing evening light with liquid reflections.',
      rangeCategory: 'Eveningwear',
      rangeCategorySlug: 'evening-dresses',
      href: '/product/notte-asymmetric-silk-column-gown',
    },
    formattedPrice: formatINR(165000),
    rangeCategory: 'Eveningwear',
    rangeCategorySlug: 'evening-dresses',
    storyBehindDrape:
      'Cut along the exact 45-degree grain of Como silk charmeuse. The asymmetric neckline floats effortlessly, capturing evening light with liquid reflections.',
    actionHref: '/product/notte-asymmetric-silk-column-gown',
  },
  {
    id: 'prod-trend-004',
    name: 'The Milano Gabardine Trench Coat',
    slug: 'milano-gabardine-trench-coat',
    tagline: 'Water-Repellent Cotton Gabardine with Signature Horn Buckles',
    description:
      'High-density, weather-resistant cotton gabardine woven in Biella with storm flaps and belted cuffs.',
    category: 'coats-outerwear',
    categoryName: 'Coats & Trench',
    gender: 'women',
    price: 195000,
    originalPrice: 225000,
    images: [
      '/images/products/3d_milano_trench_coat.webp',
      '/images/products/milano-gabardine-trench-coat_model.webp',
      '/images/products/milano-gabardine-trench-coat_side.webp',
    ],
    colors: [
      { name: 'Stone Beige', hex: '#D8CEBE', imageIndex: 0 },
      { name: 'Runway Look', hex: '#81779F', imageIndex: 1 },
      { name: 'Midnight Black', hex: '#121212', imageIndex: 2 },
    ],
    sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42', 'IT 44'],
    fabric: '100% Water-Repellent Compact Cotton Gabardine',
    embroidery: 'D-ring belt hardware with calfskin-covered buckles',
    occasion: ['City', 'Travel', 'Daily Luxury'],
    craftsmanshipStory: 'Constructed using historic military trench specifications with relaxed Italian volume.',
    careInstructions: ['Dry Clean Only'],
    deliveryDays: 3,
    has3D: true,
    badge: 'Bestseller',
    inStock: true,
    rating: 4.96,
    reviewsCount: 164,
    featured: true,
    sectionMetadata: {
      trendVelocity: '142 units in active transit',
      badge: 'Bestseller',
      storyBehindDrape:
        'Engineered from ultra-compact Italian gabardine yarn with rainproof weave that protects against the elements without synthetic plastic membranes.',
      rangeCategory: 'Coats & Trench',
      rangeCategorySlug: 'coats-outerwear',
      href: '/product/milano-gabardine-trench-coat',
    },
    formattedPrice: formatINR(195000),
    rangeCategory: 'Coats & Trench',
    rangeCategorySlug: 'coats-outerwear',
    storyBehindDrape:
      'Engineered from ultra-compact Italian gabardine yarn with rainproof weave that protects against the elements without synthetic plastic membranes.',
    actionHref: '/product/milano-gabardine-trench-coat',
  },
  {
    id: 'prod-trend-005',
    name: 'Palazzo Nappa Leather Trench',
    slug: 'palazzo-nappa-leather-trench',
    tagline: 'Supple Italian Lambskin Nappa with Matte Black Hardware',
    description:
      'An unapologetic statement in modern luxury. Tailored from featherweight, buttery-soft Italian lambskin leather with a fluid calf-length fall.',
    category: 'leather-shearling',
    categoryName: 'Leather & Shearling',
    gender: 'women',
    price: 295000,
    originalPrice: 340000,
    images: [
      '/images/products/3d_espresso_leather_trench.webp',
      '/images/products/palazzo-nappa-leather-trench_model.webp',
      '/images/products/palazzo-nappa-leather-trench_side.webp',
    ],
    colors: [
      { name: 'Espresso', hex: '#241916', imageIndex: 0 },
      { name: 'Milan Model', hex: '#E4DFF0', imageIndex: 1 },
      { name: 'Onyx Black', hex: '#0F0F10', imageIndex: 2 },
    ],
    sizes: ['IT 38', 'IT 40', 'IT 42', 'IT 44'],
    fabric: '100% Genuine Italian Lambskin Nappa; Lining: Silk Twill',
    embroidery: 'Double-row precision saddle stitching',
    occasion: ['Autumn/Winter', 'Runway', 'Travel'],
    craftsmanshipStory: 'Hand-selected hides graded for velvety touch and zero surface imperfections.',
    careInstructions: ['Specialist Leather Care Only'],
    deliveryDays: 5,
    has3D: true,
    badge: 'Limited Edition',
    inStock: true,
    rating: 4.98,
    reviewsCount: 128,
    featured: true,
    sectionMetadata: {
      trendVelocity: 'Only 30 pieces produced',
      badge: 'Limited Edition',
      storyBehindDrape:
        'Tanned in Santa Croce sull\'Arno with mineral waxes. Each trench is individually cut from single matched hides for uniform tone and supple drape.',
      rangeCategory: 'Leather & Shearling',
      rangeCategorySlug: 'leather-shearling',
      href: '/product/palazzo-nappa-leather-trench',
    },
    formattedPrice: formatINR(295000),
    rangeCategory: 'Leather & Shearling',
    rangeCategorySlug: 'leather-shearling',
    storyBehindDrape:
      'Tanned in Santa Croce sull\'Arno with mineral waxes. Each trench is individually cut from single matched hides for uniform tone and supple drape.',
    actionHref: '/product/palazzo-nappa-leather-trench',
  },
];

export const LATEST_TRENDS_RANGE_CATEGORIES: RangeCategoryItem[] = [
  { id: 'tailored-suiting', name: 'Tailored Suiting', slug: 'tailored-suiting', count: 18, href: '/collections/tailored-suiting' },
  { id: 'coats-outerwear', name: 'Coats & Trench', slug: 'coats-outerwear', count: 24, href: '/collections/coats-outerwear' },
  { id: 'evening-dresses', name: 'Eveningwear & Gowns', slug: 'evening-dresses', count: 22, href: '/collections/evening-dresses' },
  { id: 'cashmere-knits', name: 'Cashmere & Knits', slug: 'knitwear-cashmere', count: 16, href: '/collections/knitwear-cashmere' },
  { id: 'leather-shearling', name: 'Leather & Shearling', slug: 'leather-shearling', count: 12, href: '/collections/leather-shearling' },
  { id: 'luxury-accessories', name: 'Leather Goods & Bags', slug: 'luxury-accessories', count: 15, href: '/collections/luxury-accessories' },
];

export const LATEST_TRENDS_DATA: LatestTrendsData = {
  eyebrow: 'Explore Collection',
  headingPrimary: 'LATEST',
  headingSecondary: 'TRENDS',
  ctaText: 'Discover Now',
  ctaHref: '/collections/all',
  storyHeading: 'Stories Behind The Drape',
  storyDescription:
    'Every garment in our Milanese showroom carries centuries of tailoring philosophy. Swipe through our card deck studio to experience the cutting-edge construction, rare cashmere weaves, and liquid silk eveningwear of 2026.',
  rangeHeading: 'Explore The Range',
  rangeCategories: LATEST_TRENDS_RANGE_CATEGORIES,
  products: LATEST_TRENDS_PRODUCTS,
};
