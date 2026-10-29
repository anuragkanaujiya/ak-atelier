import { Product } from '@/types';

/**
 * ============================================================================
 * BACKEND API INTEGRATION GUIDE: AUTUMN–WINTER 2026 CAMPAIGN
 * ============================================================================
 * Endpoint: GET /api/v1/campaigns/autumn-winter-2026
 * Description: Fetches seasonal editorial campaign forecast with curated products.
 * ============================================================================
 */

export type ArchedCampaignProduct = Product & {
  title: string;
  subtitle: string;
  saree: string;
  tag: string;
  image: string;
  href: string;
};

// Backwards-compatible alias for existing imports
export type ArchedCampaignItem = ArchedCampaignProduct;

export interface AutumnWinterData {
  tag: string;
  headingLine1: string;
  headingLine2: string;
  headingYear: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  campaigns: ArchedCampaignProduct[];
  products: ArchedCampaignProduct[];
}

const AUTUMN_WINTER_PRODUCTS: ArchedCampaignProduct[] = [
  {
    id: 'prod-aw-001',
    name: 'The Crema Sculpted Pant Suit',
    slug: 'crema-double-breasted-pant-suit',
    tagline: 'Super 150s Italian Virgin Wool with Hand-Canvassed Architecture',
    description:
      'Sculpted in our Milanese atelier from superfine Italian virgin wool. Features peaked lapels with hand-stitched pick detailing, relaxed double-breasted closure, and fluid high-waisted pleated wide-leg trousers.',
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
    fabric: 'Super 150s Virgin Wool & Silk Cupro Lining',
    embroidery: 'Hand-sewn pick-stitch lapels and Milanese buttonholes',
    occasion: ['Autumn/Winter 2026', 'Runway', 'Gala'],
    craftsmanshipStory: 'Tailored over 36 hours of hand-canvassing with floating horsehair chest piece for fluid posture.',
    careInstructions: ['Specialist Couture Dry Clean Only', 'Store on contoured cedarwood hanger'],
    deliveryDays: 3,
    has3D: true,
    badge: 'Campaign Focus',
    inStock: true,
    rating: 4.98,
    reviewsCount: 38,
    featured: true,
    sectionMetadata: {
      campaignTag: 'MILANESE ARCHITECTURE',
      campaignTitle: 'Crema Sartorial',
      campaignSubtitle: 'Super 150s Virgin Wool',
      curatedSaree: 'Double-Breasted Architecture',
    },
    title: 'Crema Sartorial',
    subtitle: 'Super 150s Virgin Wool',
    saree: 'Double-Breasted Architecture',
    tag: 'MILANESE ARCHITECTURE',
    image: '/images/products/3d_crema_pant_suit.webp',
    href: '/product/crema-double-breasted-pant-suit',
  },
  {
    id: 'prod-aw-002',
    name: 'Belvedere Camel Cashmere Overcoat',
    slug: 'belvedere-camel-cashmere-overcoat',
    tagline: 'Pure 480 GSM Mongolian Cashmere with Unstructured Silhouette',
    description:
      'An enduring icon of quiet luxury. Spun from double-faced unbrushed Mongolian cashmere for unparalleled warmth and weightless drape. Finished with a self-tie belt and Florentine horn buttons.',
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
    occasion: ['Autumn/Winter 2026', 'Travel', 'Eveningwear'],
    craftsmanshipStory: 'Double-faced cashmere hand-split and blind-stitched by master artisans in Biella.',
    careInstructions: ['Professional Cashmere Dry Clean Only', 'Brush with boar-bristle brush'],
    deliveryDays: 4,
    has3D: true,
    badge: 'Campaign Focus',
    inStock: true,
    rating: 4.99,
    reviewsCount: 46,
    featured: true,
    sectionMetadata: {
      campaignTag: 'QUIET LUXURY ICON',
      campaignTitle: 'Belvedere Cashmere',
      campaignSubtitle: '480 GSM Double-Faced Weft',
      curatedSaree: 'Unstructured Overcoat',
    },
    title: 'Belvedere Cashmere',
    subtitle: '480 GSM Double-Faced Weft',
    saree: 'Unstructured Overcoat',
    tag: 'QUIET LUXURY ICON',
    image: '/images/products/3d_camel_cashmere_coat.webp',
    href: '/product/belvedere-camel-cashmere-overcoat',
  },
  {
    id: 'prod-aw-003',
    name: 'The Milano Gabardine Trench Coat',
    slug: 'milano-gabardine-trench-coat',
    tagline: 'Water-Repellent Cotton Gabardine with Signature Horn Buckles',
    description:
      'The quintessential trans-seasonal outer layer. Engineered from high-density, weather-resistant cotton gabardine woven in Biella with storm flaps and belted cuffs.',
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
    occasion: ['Autumn/Winter 2026', 'City', 'Travel'],
    craftsmanshipStory: 'Constructed using historic military trench specifications with relaxed Italian volume.',
    careInstructions: ['Dry Clean Only', 'Re-proof water repellency after cleanses'],
    deliveryDays: 3,
    has3D: true,
    badge: 'Campaign Focus',
    inStock: true,
    rating: 4.96,
    reviewsCount: 52,
    featured: true,
    sectionMetadata: {
      campaignTag: 'HERITAGE TAILORING',
      campaignTitle: 'Milano Gabardine',
      campaignSubtitle: 'Compact Weather-Resistant Weft',
      curatedSaree: 'Belted Trench Coat',
    },
    title: 'Milano Gabardine',
    subtitle: 'Compact Weather-Resistant Weft',
    saree: 'Belted Trench Coat',
    tag: 'HERITAGE TAILORING',
    image: '/images/products/3d_milano_trench_coat.webp',
    href: '/product/milano-gabardine-trench-coat',
  },
];

export const AUTUMN_WINTER_DATA: AutumnWinterData = {
  tag: 'SEASON FORECAST',
  headingLine1: 'Autumn–',
  headingLine2: 'Winter',
  headingYear: '2026',
  description:
    'A study in quiet authority and fluid tailoring. Introducing sculptural virgin wool pant suits, double-faced cashmere overcoats, and weather-defying gabardine trenches from our Milanese flagship.',
  ctaText: 'EXPLORE 2026 FORECAST',
  ctaHref: '/collections/all',
  campaigns: AUTUMN_WINTER_PRODUCTS,
  products: AUTUMN_WINTER_PRODUCTS,
};
