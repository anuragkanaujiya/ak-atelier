import { Category } from '@/types';

export const WOMEN_CATEGORIES: Category[] = [
  {
    id: 'tailored-suiting',
    name: 'Tailored Suiting',
    slug: 'tailored-suiting',
    gender: 'women',
    image: '/images/products/3d_crema_pant_suit.webp',
    itemCount: 18,
    tagline: 'Hand-canvassed pant suits and sculptural double-breasted blazers in virgin wool',
    description: 'Precision Italian tailoring designed for commanding presence, featuring Savile Row construction, fluid high-rise trousers, and silk cupro linings.',
  },
  {
    id: 'coats-outerwear',
    name: 'Coats & Trench',
    slug: 'coats-outerwear',
    gender: 'women',
    image: '/images/products/3d_camel_cashmere_coat.webp',
    itemCount: 24,
    tagline: 'Pure Mongolian cashmere overcoats and weather-resistant gabardine trenches',
    description: 'Enduring icons of quiet luxury, crafted with unbrushed 480 GSM cashmere, buffalo horn buttons, and calf-length storm flaps.',
  },
  {
    id: 'evening-dresses',
    name: 'Eveningwear & Gowns',
    slug: 'evening-dresses',
    gender: 'women',
    image: '/images/products/3d_black_silk_gown.webp',
    itemCount: 22,
    tagline: 'Bias-cut column gowns and sculptural slip dresses in 28mm Mulberry silk satin',
    description: 'Liquid silk eveningwear that sculpts the natural silhouette, cut on the true bias with architectural asymmetric necklines.',
  },
  {
    id: 'knitwear-cashmere',
    name: 'Cashmere & Knits',
    slug: 'knitwear-cashmere',
    gender: 'women',
    image: '/images/products/3d_cashmere_knit_sweater.webp',
    itemCount: 16,
    tagline: 'Fine-gauge Italian merino wool, seamless ribbed turtlenecks, and cardigans',
    description: 'Weightless warmth knitted from Grade-A fibers in Biella, Italy, pairing seamlessly under structured blazers.',
  },
  {
    id: 'leather-shearling',
    name: 'Leather & Shearling',
    slug: 'leather-shearling',
    gender: 'women',
    image: '/images/products/3d_espresso_leather_trench.webp',
    itemCount: 12,
    tagline: 'Supple Italian lambskin nappa trench coats and aviator shearling jackets',
    description: 'Modern statement outerwear handcrafted in Florence with matte black hardware and buttery-soft hand feel.',
  },
  {
    id: 'silk-blouses',
    name: 'Silk Tops & Blouses',
    slug: 'silk-blouses',
    gender: 'women',
    image: '/images/products/3d_white_silk_blouse.webp',
    itemCount: 14,
    tagline: 'Silk georgette button-downs, lavallière tie shirts, and satin camisoles',
    description: 'Tailored shirts and draped tops woven from 22mm silk crepe with French cuffs and mother-of-pearl buttons.',
  },
  {
    id: 'luxury-accessories',
    name: 'Leather Goods & Bags',
    slug: 'luxury-accessories',
    gender: 'women',
    image: '/images/products/3d_atelier_leather_bag.webp',
    itemCount: 15,
    tagline: 'Full-grain box calfskin structured totes, crossbody bags, and footwear',
    description: 'Timeless architectural leather goods with 24K gold-plated hardware, hand-painted edge coats, and bonded suede lining.',
  },
];

export const MEN_CATEGORIES: Category[] = [
  {
    id: 'bespoke-suiting',
    name: 'Bespoke Suiting',
    slug: 'bespoke-suiting',
    gender: 'men',
    image: '/images/products/3d_charcoal_wool_tuxedo.webp',
    itemCount: 20,
    tagline: 'Double-breasted tuxedos and two-piece suits in Super 130s Merino wool',
    description: 'Impeccable Northern Italian tailoring with floating horsehair canvas, silk grosgrain lapels, and tailored side-adjuster trousers.',
  },
  {
    id: 'overcoats-outerwear',
    name: 'Overcoats & Outerwear',
    slug: 'overcoats-outerwear',
    gender: 'men',
    image: '/images/products/3d_camel_cashmere_coat.webp',
    itemCount: 16,
    tagline: 'Tailored wool-cashmere topcoats, car coats, and structured trenches',
    description: 'Commanding outerwear engineered for warmth and refined posture, finished with Florentine horn buttons.',
  },
  {
    id: 'tailored-shirts',
    name: 'Tailored Shirts',
    slug: 'tailored-shirts',
    gender: 'men',
    image: '/images/products/3d_white_silk_blouse.webp',
    itemCount: 26,
    tagline: '200s two-ply Egyptian Giza cotton poplin and silk-blend dress shirts',
    description: 'Crisp spread collars, mother-of-pearl buttons, and single-needle tailoring for effortless sophistication.',
  },
  {
    id: 'knitwear-sweaters',
    name: 'Cashmere Sweaters',
    slug: 'knitwear-sweaters',
    gender: 'men',
    image: '/images/products/3d_cashmere_knit_sweater.webp',
    itemCount: 14,
    tagline: 'Seamless crewnecks, ribbed rollnecks, and zip cardigans in pure cashmere',
    description: 'Spun from long-staple fibers for pill-resistant longevity and ultra-soft comfort.',
  },
  {
    id: 'leather-outerwear',
    name: 'Leather Jackets',
    slug: 'leather-outerwear',
    gender: 'men',
    image: '/images/products/3d_espresso_leather_trench.webp',
    itemCount: 10,
    tagline: 'Minimalist cafe racer and bomber jackets in vegetable-tanned calfskin',
    description: 'Clean architectural leather jackets with two-way Swiss zippers and tailored shoulder lines.',
  },
  {
    id: 'tailored-trousers',
    name: 'Tailored Trousers',
    slug: 'tailored-trousers',
    gender: 'men',
    image: '/images/products/3d_crema_pant_suit.webp',
    itemCount: 18,
    tagline: 'Double-pleated wide-leg slacks and straight-leg trousers in tropical wool',
    description: 'Fluid drape with high rise, extended waistband tab, and curtained interior lining.',
  },
];

export const ALL_CATEGORIES: Category[] = [...WOMEN_CATEGORIES, ...MEN_CATEGORIES];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return ALL_CATEGORIES.find((cat) => cat.slug === slug);
};

export const getCategoriesByGender = (gender: 'women' | 'men' | 'all'): Category[] => {
  if (gender === 'women') return WOMEN_CATEGORIES;
  if (gender === 'men') return MEN_CATEGORIES;
  return ALL_CATEGORIES;
};
