import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';

/**
 * ============================================================================
 * BACKEND API INTEGRATION GUIDE: CINEMATIC EDITORIAL STORIES (MILAN MOMENTS)
 * ============================================================================
 * Endpoint: GET /api/v1/stories/cinematic
 * Description: Full-screen cinematic stories with background imagery and preview cards.
 * ============================================================================
 */

export type CinematicStoryProduct = Product & {
  storyTitleLine1: string;
  storyTitleLine2: string;
  storyCategoryTag: string;
  storySubtitle: string;
  storyDescription: string;
  bgImage: string;
  cardThumbnail: string;
  badgeLabel?: string;
  formattedPrice: string;
};

export const CINEMATIC_STORIES: CinematicStoryProduct[] = [
  {
    id: 'story-first-light-001',
    name: 'CREMA VIRGIN WOOL TAILORED SUIT',
    slug: 'crema-double-breasted-pant-suit',
    tagline: 'Super 150s Italian Virgin Wool Pant Suit',
    description:
      'First light breaks across the spires of the Milan Duomo, illuminating hand-canvassed peaked lapels and fluid wide-leg virgin wool trousers.',
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
    inStock: true,
    rating: 4.98,
    reviewsCount: 142,
    featured: true,
    storyTitleLine1: 'First',
    storyTitleLine2: 'Light',
    storyCategoryTag: 'MILAN MORNING',
    storySubtitle: 'THE DUOMO SUITING VAULT',
    storyDescription:
      'The morning sun spills through floor-to-ceiling salon glass onto sculpted virgin wool, celebrating precision tailoring and commanding feminine presence.',
    bgImage: '/hero-poster.webp',
    cardThumbnail: '/images/products/3d_crema_pant_suit.webp',
    badgeLabel: 'Runway Muse',
    formattedPrice: formatINR(185000),
  },
  {
    id: 'story-heritage-002',
    name: 'BELVEDERE CAMEL CASHMERE OVERCOAT',
    slug: 'belvedere-camel-cashmere-overcoat',
    tagline: 'Pure 480 GSM Mongolian Cashmere Icon',
    description:
      'Double-faced unbrushed cashmere offering weightless warmth and unstructured Italian volume with hand-carved Florentine horn buttons.',
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
    inStock: true,
    rating: 4.99,
    reviewsCount: 156,
    featured: true,
    storyTitleLine1: 'The Winter',
    storyTitleLine2: 'Sanctuary',
    storyCategoryTag: 'CASHMERE VAULT',
    storySubtitle: 'BIELLA ATELIER LEGACY',
    storyDescription:
      'Spun from raw Mongolian cashmere fleece exceeding 38mm staple length. Blind-stitched by hand for a seamless, weightless embrace against alpine winds.',
    bgImage: '/hero-poster.webp',
    cardThumbnail: '/images/products/3d_camel_cashmere_coat.webp',
    badgeLabel: 'Quiet Luxury',
    formattedPrice: formatINR(245000),
  },
  {
    id: 'story-romance-003',
    name: 'NOTTE ASYMMETRIC COLUMN GOWN',
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
    inStock: true,
    rating: 4.98,
    reviewsCount: 138,
    featured: true,
    storyTitleLine1: 'Midnight',
    storyTitleLine2: 'Silk',
    storyCategoryTag: 'RED CARPET',
    storySubtitle: 'TEATRO ALLA SCALA OPERA',
    storyDescription:
      'Draped along the 45-degree bias of heavy Como silk charmeuse. Catches candlelight with deep liquid reflections during opera premieres and black-tie galas.',
    bgImage: '/hero-poster.webp',
    cardThumbnail: '/images/products/3d_black_silk_gown.webp',
    badgeLabel: 'Red Carpet Icon',
    formattedPrice: formatINR(165000),
  },
  {
    id: 'story-couture-004',
    name: 'THE DUOMO BOX CALF TOP-HANDLE BAG',
    slug: 'the-duomo-box-calf-top-handle-bag',
    tagline: 'Tuscan Full-Grain Box Calf Leather with 24K Gold Clasp',
    description:
      'Handcrafted in Florence from vegetable-tanned box calf leather with structured geometry and bonded suede lining.',
    category: 'luxury-accessories',
    categoryName: 'Leather Goods & Bags',
    gender: 'women',
    price: 125000,
    originalPrice: 145000,
    images: [
      '/images/products/3d_atelier_leather_bag.webp',
      '/images/products/the-duomo-box-calf-top-handle-bag_model.webp',
      '/images/products/the-duomo-box-calf-top-handle-bag_side.webp',
    ],
    colors: [
      { name: 'Noir Black', hex: '#111111', imageIndex: 0 },
      { name: 'Milan Model', hex: '#E4DFF0', imageIndex: 1 },
      { name: 'Cognac Brown', hex: '#7A4122', imageIndex: 2 },
    ],
    sizes: ['One Size (W 26cm x H 18cm x D 9cm)'],
    fabric: '100% Genuine Italian Box Calf Leather',
    embroidery: 'Hand-painted edge finishing and 24K gold-plated custom hardware',
    occasion: ['Evening', 'Daily Luxury', 'Gala'],
    craftsmanshipStory: 'Sourced from heritage Tuscan tanneries adhering to strict ecological vegetable tanning protocols.',
    careInstructions: ['Store in provided cotton dust bag'],
    deliveryDays: 2,
    has3D: true,
    inStock: true,
    rating: 4.98,
    reviewsCount: 145,
    featured: true,
    storyTitleLine1: 'Florentine',
    storyTitleLine2: 'Craft',
    storyCategoryTag: 'PRIVATE ATELIER',
    storySubtitle: 'TUSCAN LEATHER GUILD',
    storyDescription:
      'Sculpted over wooden forms by fifth-generation leather artisans in Florence. Pure vegetable-tanned calfskin with 24K gold-plated hardware.',
    bgImage: '/hero-poster.webp',
    cardThumbnail: '/images/products/3d_atelier_leather_bag.webp',
    badgeLabel: 'Florentine Heirloom',
    formattedPrice: formatINR(125000),
  },
];
