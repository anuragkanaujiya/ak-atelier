import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';

/**
 * ============================================================================
 * BACKEND API INTEGRATION GUIDE: INTERACTIVE STUDIO (CHANGE YOUR LOOK)
 * ============================================================================
 * Endpoint: GET /api/v1/studio/looks
 * Description: Fetches interactive center model looks with color swatches & metadata.
 * ============================================================================
 */

export interface LookColor {
  id: string;
  name: string;
  hex: string;
  image: string;
}

export type LookStyleProduct = Product & {
  rawPrice: number;
  subtitle: string;
  modelImage: string;
  thumbnail: string;
  colorName: string;
  audioTrack: {
    title: string;
    artist: string;
    src?: string;
  };
  features: string[];
  reviewCount: number;
  categoryTag: string;
  formattedPrice: string;
  colors: LookColor[];
};

export type LookStyleItem = LookStyleProduct;

export const CHANGE_LOOK_PRODUCTS: LookStyleProduct[] = [
  {
    id: 'prod-look-001',
    name: 'CREMA DOUBLE-BREASTED SUIT',
    slug: 'crema-double-breasted-pant-suit',
    tagline: 'Super 150s Italian Virgin Wool Pant Suit',
    description:
      'Sculpted in our Milanese atelier with floating horsehair canvas, sharp peaked lapels, and relaxed pleated wide-leg trousers.',
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
      { id: 'crema', name: 'Crema Ivory', hex: '#F5F2EB', image: '/images/products/3d_crema_pant_suit.webp' },
      { id: 'lilac', name: 'Milanese Lilac', hex: '#B5A9D1', image: '/images/products/crema-double-breasted-pant-suit_model.webp' },
      { id: 'black', name: 'Obsidian Black', hex: '#1A1A1A', image: '/images/products/crema-double-breasted-pant-suit_side.webp' },
    ],
    sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42', 'IT 44'],
    fabric: '100% Super 150s Virgin Wool; Lining: 100% Cupro Silk',
    embroidery: 'Hand-sewn pick-stitch lapels and Milanese buttonholes',
    occasion: ['Runway Gala', 'Executive', 'Cocktail'],
    craftsmanshipStory: 'Tailored over 36 hours of hand-canvassing with floating horsehair chest piece.',
    careInstructions: ['Specialist Couture Dry Clean Only', 'Store on contoured cedarwood hanger'],
    deliveryDays: 3,
    has3D: true,
    inStock: true,
    rating: 4.98,
    reviewsCount: 142,
    featured: true,
    badge: 'Milan Runway 2026',
    sectionMetadata: {
      lookbookName: 'Milan Atelier Tailoring',
      audioTrack: { title: 'Via Montenapoleone Suite', artist: 'AK Atelier Milano' },
      features: ['Savile Row Floating Canvas', 'Hand-Rolled Peaked Lapels', 'Cupro Bemberg Lining', 'Side-Adjuster Waistband'],
    },
    rawPrice: 185000,
    subtitle: 'Super 150s Virgin Wool Pant Suit',
    modelImage: '/images/products/crema-double-breasted-pant-suit_model.webp',
    thumbnail: '/images/products/3d_crema_pant_suit.webp',
    colorName: 'Crema Ivory',
    audioTrack: { title: 'Via Montenapoleone Suite', artist: 'AK Atelier Milano' },
    features: ['Savile Row Floating Canvas', 'Hand-Rolled Peaked Lapels', 'Cupro Bemberg Lining', 'Side-Adjuster Waistband'],
    reviewCount: 142,
    categoryTag: 'TAILORED SUITING',
    formattedPrice: formatINR(185000),
  },
  {
    id: 'prod-look-002',
    name: 'BELVEDERE CASHMERE OVERCOAT',
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
      { id: 'camel', name: 'Camel Sand', hex: '#C49A6C', image: '/images/products/3d_camel_cashmere_coat.webp' },
      { id: 'mauve', name: 'Rose Mauve', hex: '#BE7FA8', image: '/images/products/belvedere-camel-cashmere-overcoat_model.webp' },
      { id: 'charcoal', name: 'Charcoal Grey', hex: '#333333', image: '/images/products/belvedere-camel-cashmere-overcoat_side.webp' },
    ],
    sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42', 'IT 44'],
    fabric: '100% Grade-A Mongolian Cashmere (480 GSM)',
    embroidery: 'Saddle-stitch edges and hand-attached horn buttons',
    occasion: ['Winter Gala', 'Travel', 'Daily Quiet Luxury'],
    craftsmanshipStory: 'Double-faced cashmere hand-split and blind-stitched by master artisans in Biella.',
    careInstructions: ['Professional Cashmere Dry Clean Only', 'Brush with boar-bristle brush'],
    deliveryDays: 4,
    has3D: true,
    inStock: true,
    rating: 4.99,
    reviewsCount: 156,
    featured: true,
    badge: 'Atelier Signature',
    sectionMetadata: {
      lookbookName: 'Quiet Luxury Outerwear',
      audioTrack: { title: 'Duomo Starlight', artist: 'AK Atelier Milano' },
      features: ['Double-Faced Cashmere', 'Hand-Carved Horn Buttons', 'Self-Tie Belt Closure', 'Deep Welt Pockets'],
    },
    rawPrice: 245000,
    subtitle: 'Pure 480 GSM Mongolian Cashmere',
    modelImage: '/images/products/belvedere-camel-cashmere-overcoat_model.webp',
    thumbnail: '/images/products/3d_camel_cashmere_coat.webp',
    colorName: 'Camel Sand',
    audioTrack: { title: 'Duomo Starlight', artist: 'AK Atelier Milano' },
    features: ['Double-Faced Cashmere', 'Hand-Carved Horn Buttons', 'Self-Tie Belt Closure', 'Deep Welt Pockets'],
    reviewCount: 156,
    categoryTag: 'COATS & TRENCH',
    formattedPrice: formatINR(245000),
  },
  {
    id: 'prod-look-003',
    name: 'NOTTE ASYMMETRIC COLUMN GOWN',
    slug: 'notte-asymmetric-silk-column-gown',
    tagline: 'Heavy 28mm Mulberry Silk Satin Evening Gown',
    description:
      'Liquid silk eveningwear cut on the true 45-degree bias to drape effortlessly with the natural movements of the body.',
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
      { id: 'black', name: 'Obsidian Black', hex: '#0C0C0E', image: '/images/products/3d_black_silk_gown.webp' },
      { id: 'emerald', name: 'Emerald Satin', hex: '#132B20', image: '/images/products/3d_emerald_silk_gown.webp' },
      { id: 'lilac', name: 'Milanese Lilac', hex: '#81779F', image: '/images/products/notte-asymmetric-silk-column-gown_side.webp' },
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
    badge: 'Red Carpet Edit',
    sectionMetadata: {
      lookbookName: 'Milan Nightfall Couture',
      audioTrack: { title: 'Notte a Milano', artist: 'AK Atelier Milano' },
      features: ['True 45° Bias Cut', '28 Momme Heavy Charmeuse', 'Architectural Cowl Neck', 'Floor-Skimming Hem'],
    },
    rawPrice: 165000,
    subtitle: '28mm Mulberry Silk Satin',
    modelImage: '/images/products/notte-asymmetric-silk-column-gown_model.webp',
    thumbnail: '/images/products/3d_black_silk_gown.webp',
    colorName: 'Obsidian Black',
    audioTrack: { title: 'Notte a Milano', artist: 'AK Atelier Milano' },
    features: ['True 45° Bias Cut', '28 Momme Heavy Charmeuse', 'Architectural Cowl Neck', 'Floor-Skimming Hem'],
    reviewCount: 138,
    categoryTag: 'EVENINGWEAR',
    formattedPrice: formatINR(165000),
  },
];

export const CHANGE_LOOK_STYLES = CHANGE_LOOK_PRODUCTS;
