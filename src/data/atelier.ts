import { Product } from '@/types';
import { formatINR } from '@/utils/formatters';

export interface ClientDiaryEntry {
  id: string;
  slug: string;
  clientName: string;
  weddingLocation: string;
  weddingDate: string;
  headline: string;
  quote: string;
  rating: number;
  portraitImage: string;
  craftDetailImage?: string;
  artisanHours?: string;
  zariPurity?: string;
  venueType?: string;
  ensemble: Product & { formattedPrice: string };
}

export interface CraftSanctumPillar {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  statMetric: string;
  statLabel: string;
  macroImage: string;
  badge: string;
  provenanceProof?: string;
}

export interface SalonLocation {
  slug: string;
  city: string;
  name: string;
  subheading?: string;
  address: string;
  country: string;
  phone: string;
  email: string;
  timeSlots: string[];
  badge?: string;
  salonImage: string;
  curatorName: string;
  curatorRole?: string;
  salonQuote: string;
  suitesCount?: string;
  amenities?: string[];
}

export interface AtelierExperience {
  id: string;
  title: string;
  tagline: string;
  recommendedDuration: string;
}

// =========================================================================
// 1. CRAFTSMANSHIP SANCTUM PILLARS (AUTHENTICITY & BESPOKE TAILORING)
// =========================================================================
export const CRAFT_SANCTUM_PILLARS: CraftSanctumPillar[] = [
  {
    id: 'pillar-wool-canvas',
    slug: 'super-150s-wool-canvas',
    title: 'Super 150s Floating Horsehair Canvas',
    subtitle: 'Northern Italian Tailoring Architecture',
    description:
      'Natural horsehair and camel hair canvas hand-stitched into chest pieces without synthetic fusing, allowing garments to organically adapt to the wearer\'s posture.',
    statMetric: '36 Hours',
    statLabel: 'Hand-Canvassing per Suit',
    macroImage: '/images/products/crema-double-breasted-pant-suit_side.webp',
    badge: 'Savile Row Grade',
    provenanceProof: 'Biella Wool Guild Certified',
  },
  {
    id: 'pillar-cashmere',
    slug: 'mongolian-cashmere',
    title: 'Grade-A 480 GSM Mongolian Cashmere',
    subtitle: 'Unbrushed Double-Faced Weft',
    description:
      'Fibers strictly exceeding 38mm length and 14.5-micron fineness, hand-split and blind-stitched by master artisans for seamless, weightless thermal protection.',
    statMetric: '480 GSM',
    statLabel: 'Fleece Density',
    macroImage: '/images/products/belvedere-camel-cashmere-overcoat_side.webp',
    badge: 'Grade-A Traceable',
    provenanceProof: 'Certified Sustainable Cashmere Standard',
  },
  {
    id: 'pillar-silk-satin',
    slug: 'como-silk-charmeuse',
    title: '28mm Heavy Mulberry Silk Satin',
    subtitle: 'Como Water-Jet Liquid Drape',
    description:
      'Woven in Lake Como on precision looms using 100% long-filament mulberry silk, cut on the true 45-degree bias for sensual, liquid reflections.',
    statMetric: '28 Momme',
    statLabel: 'Pure Silk Charmeuse',
    macroImage: '/images/products/notte-asymmetric-silk-column-gown_side.webp',
    badge: 'Como Silk Guild',
    provenanceProof: 'Serica di Como Authenticated',
  },
  {
    id: 'pillar-tuscan-leather',
    slug: 'florentine-box-calf',
    title: 'Vegetable-Tanned Tuscan Box Calf',
    subtitle: 'Florentine Master Leather Guild',
    description:
      'Full-grain calfskin tanned with chestnut and mimosa tannins in Santa Croce sull\'Arno, finished with hand-painted raw edge coats and 24K gold hardware.',
    statMetric: '100% Eco',
    statLabel: 'Vegetable Tanned',
    macroImage: '/images/products/the-duomo-box-calf-top-handle-bag_side.webp',
    badge: 'Consorzio Vera Pelle',
    provenanceProof: 'Tuscan Leather Guild Hallmarked',
  },
];

// =========================================================================
// 2. VIP CLIENT DIARIES (HAUTE COUTURE COMMISSIONS)
// =========================================================================
export const ROYAL_CLIENT_DIARIES: ClientDiaryEntry[] = [
  {
    id: 'diary-visconti-001',
    slug: 'countess-elena-visconti-como',
    clientName: 'Countess Elena Visconti',
    weddingLocation: 'Villa d\'Este, Lake Como',
    weddingDate: 'October 2026',
    headline: 'The Notte Asymmetric Silk Column Gown at Sunset',
    quote:
      'The bias cut of the Como silk draped with an effortless majesty that felt like liquid midnight. AK ATELIER\'s Milan master cutter adjusted the cowl by millimetres to achieve perfection.',
    rating: 5.0,
    portraitImage: '/images/products/notte-asymmetric-silk-column-gown_model.webp',
    craftDetailImage: '/images/products/notte-asymmetric-silk-column-gown_side.webp',
    artisanHours: '48 Atelier Hours',
    zariPurity: '28 Momme Como Silk Satin',
    venueType: 'Lakeside Renaissance Villa',
    ensemble: {
      id: 'ak-gala-01',
      name: 'Notte Asymmetric Silk Column Gown',
      slug: 'notte-asymmetric-silk-column-gown',
      tagline: 'Heavy 28mm Mulberry Silk Satin Evening Gown',
      description: 'Cut on the true bias to sculpt the natural contours of the body with floor-skimming column hem.',
      category: 'evening-dresses',
      categoryName: 'Eveningwear & Gowns',
      gender: 'women',
      price: 165000,
      originalPrice: 190000,
      discountPercent: 13,
      images: [
        '/images/products/notte-asymmetric-silk-column-gown_studio.webp',
        '/images/products/notte-asymmetric-silk-column-gown_model.webp',
        '/images/products/notte-asymmetric-silk-column-gown_side.webp',
      ],
      colors: [
        { name: 'Obsidian Black', hex: '#0C0C0E', imageIndex: 0 },
        { name: 'Milan Model', hex: '#40384F', imageIndex: 1 },
      ],
      sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42'],
      fabric: '100% Pure Mulberry Silk Satin (28 Momme)',
      embroidery: 'True bias drapery with concealed Swiss invisible zipper',
      occasion: ['Red Carpet', 'Gala Dinner'],
      craftsmanshipStory: 'Draped on live atelier fit models in Milan for liquid silk motion.',
      careInstructions: ['Delicate Silk Dry Clean Only'],
      deliveryDays: 3,
      has3D: true,
      inStock: true,
      rating: 5.0,
      reviewsCount: 38,
      featured: true,
      formattedPrice: formatINR(165000),
    },
  },
  {
    id: 'diary-rinaldi-002',
    slug: 'camilla-rinaldi-milano',
    clientName: 'Camilla Rinaldi',
    weddingLocation: 'Palazzo Reale, Milan',
    weddingDate: 'September 2026',
    headline: 'Double-Breasted Power Suiting in Super 150s Virgin Wool',
    quote:
      'Stepping into the Duomo baithak in the Crema double-breasted suit commanded an aura of quiet power. The floating horsehair canvas breathes naturally and never wrinkles.',
    rating: 5.0,
    portraitImage: '/images/products/crema-double-breasted-pant-suit_model.webp',
    craftDetailImage: '/images/products/crema-double-breasted-pant-suit_side.webp',
    artisanHours: '36 Atelier Hours',
    zariPurity: 'Super 150s Virgin Wool',
    venueType: 'Milanese Royal Palace',
    ensemble: {
      id: 'ak-gala-02',
      name: 'The Crema Double-Breasted Pant Suit',
      slug: 'crema-double-breasted-pant-suit',
      tagline: 'Super 150s Italian Virgin Wool with Floating Horsehair Canvas',
      description: 'Sculpted in our Milanese atelier from superfine virgin wool with relaxed double-breasted closure.',
      category: 'tailored-suiting',
      categoryName: 'Tailored Suiting',
      gender: 'women',
      price: 185000,
      originalPrice: 215000,
      discountPercent: 14,
      images: [
        '/images/products/crema-double-breasted-pant-suit_studio.webp',
        '/images/products/crema-double-breasted-pant-suit_model.webp',
        '/images/products/crema-double-breasted-pant-suit_side.webp',
      ],
      colors: [
        { name: 'Crema Ivory', hex: '#F5F2EB', imageIndex: 0 },
        { name: 'Milanese Model', hex: '#E4DFF0', imageIndex: 1 },
      ],
      sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42', 'IT 44'],
      fabric: '100% Super 150s Virgin Wool; Lining: 100% Cupro',
      embroidery: 'Hand-sewn pick-stitch lapels and Milanese buttonholes',
      occasion: ['Runway Gala', 'Executive'],
      craftsmanshipStory: 'Tailored over 36 hours of hand-canvassing with floating horsehair chest piece.',
      careInstructions: ['Specialist Couture Dry Clean Only'],
      deliveryDays: 3,
      has3D: true,
      inStock: true,
      rating: 4.98,
      reviewsCount: 42,
      featured: true,
      formattedPrice: formatINR(185000),
    },
  },
  {
    id: 'diary-laurent-003',
    slug: 'sofia-laurent-st-moritz',
    clientName: 'Sofia Laurent',
    weddingLocation: 'Badrutt\'s Palace, St. Moritz',
    weddingDate: 'December 2026',
    headline: 'Belvedere 480 GSM Cashmere in Alpine Winter',
    quote:
      'The AK ATELIER atelier concierge flew to Switzerland for the final private fitting. The weight distribution of the double-faced cashmere and its featherweight warmth was incomparable.',
    rating: 5.0,
    portraitImage: '/images/products/belvedere-camel-cashmere-overcoat_model.webp',
    craftDetailImage: '/images/products/belvedere-camel-cashmere-overcoat_side.webp',
    artisanHours: '54 Atelier Hours',
    zariPurity: 'Grade-A 480 GSM Mongolian Cashmere',
    venueType: 'Alpine Snow Palace',
    ensemble: {
      id: 'ak-gala-03',
      name: 'Belvedere Camel Cashmere Overcoat',
      slug: 'belvedere-camel-cashmere-overcoat',
      tagline: 'Pure 480 GSM Mongolian Cashmere Icon',
      description: 'Double-faced unbrushed cashmere offering weightless warmth and unstructured Italian volume.',
      category: 'coats-outerwear',
      categoryName: 'Coats & Outerwear',
      gender: 'women',
      price: 245000,
      originalPrice: 280000,
      discountPercent: 12,
      images: [
        '/images/products/belvedere-camel-cashmere-overcoat_studio.webp',
        '/images/products/belvedere-camel-cashmere-overcoat_model.webp',
        '/images/products/belvedere-camel-cashmere-overcoat_side.webp',
      ],
      colors: [
        { name: 'Camel Sand', hex: '#C49A6C', imageIndex: 0 },
        { name: 'Rose Mauve', hex: '#BE7FA8', imageIndex: 1 },
      ],
      sizes: ['IT 36', 'IT 38', 'IT 40', 'IT 42', 'IT 44'],
      fabric: '100% Grade-A Mongolian Cashmere (480 GSM)',
      embroidery: 'Saddle-stitch edges and hand-attached horn buttons',
      occasion: ['Winter Gala', 'Travel'],
      craftsmanshipStory: 'Double-faced cashmere hand-split and blind-stitched by master artisans in Biella.',
      careInstructions: ['Professional Cashmere Dry Clean Only'],
      deliveryDays: 4,
      has3D: true,
      inStock: true,
      rating: 4.99,
      reviewsCount: 56,
      featured: true,
      formattedPrice: formatINR(245000),
    },
  },
];

// =========================================================================
// 3. PRIVATE VIP SALON LOCATIONS (MILAN, PARIS, LONDON, NEW YORK)
// =========================================================================
export const SALON_LOCATIONS: SalonLocation[] = [
  {
    slug: 'milan-flagship',
    city: 'Milan',
    name: 'AK ATELIER Flagship Salon Suite',
    subheading: 'Via Montenapoleone 8, 20121 Milano, Italy',
    address: 'Via Montenapoleone 8, Quadrilatero della Moda',
    country: 'Italy',
    phone: '+39 02 8945 2200',
    email: 'milano@akatelier.luxury',
    timeSlots: ['10:00 AM', '12:30 PM', '03:00 PM', '05:30 PM'],
    badge: 'Flagship Headquarters',
    salonImage: '/images/ak-atelier-flagship.webp',
    curatorName: 'Matteo Moretti',
    curatorRole: 'Master Tailor & Head of Couture',
    salonQuote:
      'Our Milan flagship suite looks directly over the Duomo spires. Here, every commission begins with a private fabric consultation over espresso.',
    suitesCount: '4 Private Fitting Suites',
    amenities: ['Private Elevator', 'Duomo Balcony View', 'VIP Champagne Lounge', 'Bespoke Alteration Suite'],
  },
  {
    slug: 'paris-salon',
    city: 'Paris',
    name: 'AK ATELIER Place Vendôme Suite',
    subheading: 'Place Vendôme 14, 75001 Paris, France',
    address: 'Place Vendôme 14, 1er Arrondissement',
    country: 'France',
    phone: '+33 1 4268 9100',
    email: 'paris@akatelier.luxury',
    timeSlots: ['11:00 AM', '02:00 PM', '04:30 PM', '06:30 PM'],
    badge: 'Haute Couture Salon',
    salonImage: '/images/ak-milano-flagship.webp',
    curatorName: 'Camille Delacroix',
    curatorRole: 'High Fashion Salon Director',
    salonQuote:
      'Serving European aristocracy and international patrons with private couture viewings adjacent to historic French jewelers.',
    suitesCount: '3 Couture Fitting Salons',
    amenities: ['Historic Boiserie Paneling', 'Private Concierge', 'Château Champagne Cellar'],
  },
  {
    slug: 'london-mayfair',
    city: 'London',
    name: 'AK ATELIER Mayfair Salon',
    subheading: 'New Bond Street 24, London W1S 2PB, UK',
    address: 'New Bond Street 24, Mayfair',
    country: 'United Kingdom',
    phone: '+44 20 7499 8800',
    email: 'london@akatelier.luxury',
    timeSlots: ['10:30 AM', '01:00 PM', '03:30 PM', '06:00 PM'],
    badge: 'Mayfair Townhouse',
    salonImage: '/hero-poster.webp',
    curatorName: 'Arthur Kensington',
    curatorRole: 'Bespoke Sartorial Director',
    salonQuote:
      'A Georgian townhouse dedicated to the intersection of Savile Row structure and Northern Italian fluid elegance.',
    suitesCount: '3 Georgian Fitting Rooms',
    amenities: ['Georgian Library', 'Private Scotch Bar', 'Savile Row Alteration Studio'],
  },
];

export const ATELIER_EXPERIENCES: AtelierExperience[] = [
  {
    id: 'bespoke-fitting',
    title: 'Bespoke Suiting & Tailoring Fitting',
    tagline: 'Private fitting with Master Tailor taking 42 precise anatomical body measurements.',
    recommendedDuration: '90 Minutes',
  },
  {
    id: 'eveningwear-preview',
    title: 'Haute Couture Eveningwear Preview',
    tagline: 'Private salon preview of floor-length Como silk column gowns and red carpet silhouettes.',
    recommendedDuration: '75 Minutes',
  },
  {
    id: 'leather-commission',
    title: 'Tuscan Leather Goods Commission',
    tagline: 'One-on-one custom leather selection, monogramming, and 24K gold hardware curation.',
    recommendedDuration: '60 Minutes',
  },
];
