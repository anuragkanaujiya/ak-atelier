import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';

/**
 * ============================================================================
 * BACKEND API INTEGRATION GUIDE: EDITS FOR EVERY OCCASION
 * ============================================================================
 * Endpoint: GET /api/v1/collections/occasions
 * Description: Fetches curated editorial occasion portals (The Gala Edit,
 *              Milan Runway 2026, The Executive Edit, Private Atelier).
 * ============================================================================
 */

export type OccasionEditProduct = Product & {
  occasionTitle: string;
  occasionTag: string;
  actionText: string;
  actionHref: string;
  image: string;
  formattedPrice: string;
};

export interface EditsForOccasionData {
  headingPrimary: string;
  headingScript: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  edits: OccasionEditProduct[];
  products: OccasionEditProduct[];
}

const OCCASION_EDITS: OccasionEditProduct[] = [
  {
    id: 'prod-edit-gala',
    name: 'The Gala & Black Tie Edit',
    slug: 'the-gala-black-tie-edit',
    tagline: 'Sculptural Column Gowns & Bespoke Eveningwear for Red Carpet Premieres',
    description:
      'A majestic evening portfolio crafted from 28mm Como silk satin, liquid charmeuse, and French plissé chiffon, tailored in Milan for international galas.',
    category: 'evening-dresses',
    categoryName: 'Eveningwear & Gowns',
    gender: 'women',
    price: 165000,
    originalPrice: 190000,
    images: [
      '/images/products/notte-asymmetric-silk-column-gown_studio.webp',
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
    embroidery: 'True bias drapery with concealed Swiss invisible zipper',
    occasion: ['Red Carpet', 'Gala Soiree', 'Opera Premiere'],
    craftsmanshipStory: 'Draped on live atelier fit models in Milan to achieve effortless liquid silk motion.',
    careInstructions: ['Delicate Silk Dry Clean Only'],
    deliveryDays: 3,
    has3D: true,
    inStock: true,
    rating: 4.99,
    reviewsCount: 38,
    featured: true,
    badge: 'Curated Edit',
    sectionMetadata: {
      occasionTag: 'CEREMONIAL & GALA',
      occasionTitle: 'The Gala Edit',
    },
    occasionTitle: 'The Gala Edit',
    occasionTag: 'CEREMONIAL & GALA',
    actionText: 'EXPLORE GALA GOWNS',
    actionHref: '/collections/evening-dresses',
    image: '/images/products/notte-asymmetric-silk-column-gown_studio.webp',
    formattedPrice: formatINR(165000),
  },
  {
    id: 'prod-edit-runway',
    name: 'Milan Runway 2026',
    slug: 'milan-runway-2026',
    tagline: 'Autumn-Winter Catwalk Statements in Cashmere & Virgin Wool',
    description:
      'Direct from the Milan fashion calendar. Pure 480 GSM Mongolian cashmere overcoats and architectural double-breasted outerwear in neutral cream and camel hues.',
    category: 'coats-outerwear',
    categoryName: 'Coats & Trench',
    gender: 'women',
    price: 245000,
    originalPrice: 280000,
    images: [
      '/images/products/belvedere-camel-cashmere-overcoat_studio.webp',
      '/images/products/belvedere-camel-cashmere-overcoat_model.webp',
      '/images/products/belvedere-camel-cashmere-overcoat_side.webp',
    ],
    colors: [
      { name: 'Camel Sand', hex: '#C49A6C', imageIndex: 0 },
      { name: 'Milan Model', hex: '#E4DFF0', imageIndex: 1 },
      { name: 'Charcoal Grey', hex: '#333333', imageIndex: 2 },
    ],
    sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42', 'IT 44'],
    fabric: '100% Grade-A Mongolian Cashmere (480 GSM)',
    embroidery: 'Double-faced blind hand-seaming',
    occasion: ['Fashion Week', 'Runway', 'Travel'],
    craftsmanshipStory: 'Double-faced cashmere hand-split and blind-stitched by master artisans in Biella.',
    careInstructions: ['Professional Cashmere Dry Clean Only'],
    deliveryDays: 4,
    has3D: true,
    inStock: true,
    rating: 4.98,
    reviewsCount: 56,
    featured: true,
    badge: 'Runway Exclusive',
    sectionMetadata: {
      occasionTag: 'AUTUMN-WINTER 2026',
      occasionTitle: 'Milan Runway',
    },
    occasionTitle: 'Milan Runway',
    occasionTag: 'AUTUMN-WINTER 2026',
    actionText: 'VIEW RUNWAY COATS',
    actionHref: '/collections/coats-outerwear',
    image: '/images/products/belvedere-camel-cashmere-overcoat_studio.webp',
    formattedPrice: formatINR(245000),
  },
  {
    id: 'prod-edit-executive',
    name: 'The Executive Suiting Edit',
    slug: 'the-executive-suiting-edit',
    tagline: 'Commanding Power Tailoring in Super 150s Italian Virgin Wool',
    description:
      'Engineered with Savile Row floating canvas architecture, sculpted shoulders, and fluid wide-leg pleated trousers designed for global leadership.',
    category: 'tailored-suiting',
    categoryName: 'Tailored Suiting',
    gender: 'women',
    price: 185000,
    originalPrice: 215000,
    images: [
      '/images/products/crema-double-breasted-pant-suit_studio.webp',
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
    occasion: ['Executive', 'Summit', 'Gala'],
    craftsmanshipStory: 'Tailored over 36 hours of hand-canvassing with floating horsehair chest piece.',
    careInstructions: ['Specialist Couture Dry Clean Only'],
    deliveryDays: 3,
    has3D: true,
    inStock: true,
    rating: 4.97,
    reviewsCount: 42,
    featured: true,
    badge: 'Power Sartorial',
    sectionMetadata: {
      occasionTag: 'EXECUTIVE & LEADERSHIP',
      occasionTitle: 'Executive Suiting',
    },
    occasionTitle: 'Executive Suiting',
    occasionTag: 'EXECUTIVE & LEADERSHIP',
    actionText: 'DISCOVER SUITING',
    actionHref: '/collections/tailored-suiting',
    image: '/images/products/crema-double-breasted-pant-suit_studio.webp',
    formattedPrice: formatINR(185000),
  },
  {
    id: 'prod-edit-atelier',
    name: 'The Private Atelier & Leather Edit',
    slug: 'the-private-atelier-leather-edit',
    tagline: 'Hand-Finished Tuscan Calfskin Bags & Bespoke Commissions',
    description:
      'One-on-one couture commissions crafted in our Milanese salon suite and Tuscan leather workshops, customized to individual anatomical measurements.',
    category: 'luxury-accessories',
    categoryName: 'Leather Goods & Bags',
    gender: 'women',
    price: 125000,
    originalPrice: 145000,
    images: [
      '/images/products/the-duomo-box-calf-top-handle-bag_studio.webp',
      '/images/products/the-duomo-box-calf-top-handle-bag_model.webp',
      '/images/products/the-duomo-box-calf-top-handle-bag_side.webp',
    ],
    colors: [
      { name: 'Noir Black', hex: '#111111', imageIndex: 0 },
      { name: 'Milan Model', hex: '#E4DFF0', imageIndex: 1 },
      { name: 'Cognac Brown', hex: '#7A4122', imageIndex: 2 },
    ],
    sizes: ['One Size (Custom Monogramming Available)'],
    fabric: '100% Full-Grain Tuscan Box Calf Leather with 24K Gold Hardware',
    embroidery: 'Hand-painted edge coats and hand-stitched saddle seams',
    occasion: ['VIP Salon', 'Private Commission', 'Collectors'],
    craftsmanshipStory: 'Crafted in Florence adhering to strict ecological vegetable tanning protocols.',
    careInstructions: ['Store in provided cotton dust bag'],
    deliveryDays: 2,
    has3D: true,
    inStock: true,
    rating: 5.0,
    reviewsCount: 45,
    featured: true,
    badge: 'Private Concierge',
    sectionMetadata: {
      occasionTag: 'VIP SALON COMMISSIONS',
      occasionTitle: 'Private Atelier',
    },
    occasionTitle: 'Private Atelier',
    occasionTag: 'VIP SALON COMMISSIONS',
    actionText: 'EXPLORE ACCESSORIES',
    actionHref: '/collections/luxury-accessories',
    image: '/images/products/the-duomo-box-calf-top-handle-bag_studio.webp',
    formattedPrice: formatINR(125000),
  },
];

export const EDITS_FOR_OCCASION_DATA: EditsForOccasionData = {
  headingPrimary: 'EDITS FOR',
  headingScript: 'every occasion',
  description:
    'From red carpet gala debuts to commanding executive presence, discover four curated portals of Western luxury tailoring crafted in our Milanese flagship.',
  ctaText: 'EXPLORE ALL EDITS',
  ctaHref: '/collections/all',
  edits: OCCASION_EDITS,
  products: OCCASION_EDITS,
};
