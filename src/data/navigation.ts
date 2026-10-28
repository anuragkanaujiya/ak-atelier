/**
 * Navigation Data Configuration for AK ATELIER
 * Powers Sub-Navbar strip and comprehensive Multi-Category MegaMenu Modal.
 * Complies with AGENTS.md decoupled data standards (Rule 4).
 */

export interface SubNavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
  categorySlug?: string;
}

export interface MegaMenuCategoryLink {
  label: string;
  href: string;
  tag?: string;
}

export interface MegaMenuTabConfig {
  id: 'women' | 'men' | 'wedding' | 'craft';
  tabLabel: string;
  heading: string;
  tagline: string;
  silhouettes: MegaMenuCategoryLink[];
  fabrics: MegaMenuCategoryLink[];
  occasions: MegaMenuCategoryLink[];
  featuredProduct: {
    name: string;
    subtitle: string;
    price: number;
    image: string;
    href: string;
    badge: string;
  };
  conciergeServices: {
    title: string;
    description: string;
    href: string;
  }[];
}

export const SUB_NAV_ITEMS: SubNavItem[] = [
  {
    id: 'ready-to-wear',
    label: 'Ready-to-Wear',
    href: '/collections/all?category=tailored-suiting',
    badge: 'Autumn 26',
    categorySlug: 'tailored-suiting',
  },
  {
    id: 'evening-gala',
    label: 'Evening & Gala',
    href: '/collections/all?category=evening-dresses',
    badge: '3D Gowns',
    categorySlug: 'evening-dresses',
  },
  {
    id: 'bespoke-suiting',
    label: 'Bespoke Suiting',
    href: '/collections/all?category=bespoke-suiting',
    badge: 'Canvassed',
    categorySlug: 'bespoke-suiting',
  },
  {
    id: 'cashmere-outerwear',
    label: 'Cashmere Outerwear',
    href: '/collections/all?category=coats-outerwear',
    badge: '480 GSM',
    categorySlug: 'coats-outerwear',
  },
  {
    id: 'fine-leather',
    label: 'Noble Leather Goods',
    href: '/collections/all?category=luxury-accessories',
    badge: 'Florence',
    categorySlug: 'luxury-accessories',
  },
  {
    id: 'wedding-suite',
    label: 'The Wedding Suite',
    href: '/collections/wedding-edit',
    badge: 'Couture',
  },
  {
    id: 'our-craft',
    label: 'Living Craft Archives',
    href: '/our-craft',
  },
  {
    id: 'private-atelier',
    label: 'Private Salon Concierge',
    href: '/account',
    badge: 'VIP Salon',
  },
];

export const MEGA_MENU_CONFIG: Record<'women' | 'men' | 'wedding' | 'craft', MegaMenuTabConfig> = {
  women: {
    id: 'women',
    tabLabel: "Women's Haute Couture",
    heading: "Women's Haute Couture & Tailoring",
    tagline: 'Bias-Cut Silk Crepe Gowns, Hand-Canvassed Virgin Wool Suiting & Double-Faced Cashmere Overcoats',
    silhouettes: [
      { label: 'Bias-Cut Column Gowns', href: '/collections/all?category=evening-dresses', tag: 'Runway' },
      { label: 'Double-Breasted Pant Suits', href: '/collections/all?category=tailored-suiting', tag: 'Tailored' },
      { label: 'Belted Cashmere Overcoats', href: '/collections/all?category=coats-outerwear', tag: 'Iconic' },
      { label: 'Sculptural Trench Coats', href: '/collections/all?category=coats-outerwear' },
      { label: 'Silk Lavallière Blouses', href: '/collections/all?category=silk-blouses' },
      { label: 'Cashmere Ribbed Knitwear', href: '/collections/all?category=knitwear-cashmere' },
      { label: 'Box-Calf Structured Totes', href: '/collections/all?category=luxury-accessories' },
    ],
    fabrics: [
      { label: '28-Momme Lake Como Mulberry Silk', href: '/collections/all?fabric=Mulberry+Silk' },
      { label: 'Biella Super 160s Virgin Wool', href: '/collections/all?fabric=Merino+Wool' },
      { label: '480 GSM Pure Mongolian Cashmere', href: '/collections/all?fabric=Cashmere' },
      { label: 'Tuscan Box-Calf Lambskin', href: '/collections/all?fabric=Leather' },
      { label: 'Lyon Duchess Silk Faille', href: '/collections/all?fabric=Duchess+Silk' },
      { label: 'Featherweight Silk Chiffon', href: '/collections/all?fabric=Silk' },
    ],
    occasions: [
      { label: 'Black Tie & Gala Soirée', href: '/collections/all?occasion=Black+Tie', tag: 'Grand' },
      { label: 'Autumn Promenade & Travel', href: '/collections/all?occasion=Promenade' },
      { label: 'Executive Haute & Boardroom', href: '/collections/all?occasion=Executive' },
      { label: 'Bespoke Cathedral Wedding', href: '/collections/wedding-edit' },
      { label: 'Private Salon Cocktail Fitting', href: '/our-craft' },
    ],
    featuredProduct: {
      name: 'Notte Asymmetric Silk Column Gown',
      subtitle: 'Mulberry Silk Satin · Hand-Draped in Milan',
      price: 165000,
      image: '/images/products/3d_black_silk_gown.webp',
      href: '/product/notte-asymmetric-silk-column-gown',
      badge: '3D Runway Masterpiece',
    },
    conciergeServices: [
      {
        title: 'Milan Flagship Fitting',
        description: 'Reserve a private VIP salon fitting with our head couturier.',
        href: '/account',
      },
      {
        title: 'Tactile Silk Swatch Portfolio',
        description: 'Receive custom fabric swatches presented in a presentation box.',
        href: '/account',
      },
    ],
  },
  men: {
    id: 'men',
    tabLabel: "Men's Sartorial Atelier",
    heading: "Men's Sartorial Atelier & Bespoke Suiting",
    tagline: 'Super 160s Barathea Dinner Tuxedos, Double-Breasted Flannel Suits & Florentine Leather Outerwear',
    silhouettes: [
      { label: 'The Brera Dinner Tuxedo', href: '/collections/all?category=bespoke-suiting', tag: 'Sartorial' },
      { label: 'Double-Breasted Wool Suits', href: '/collections/all?category=bespoke-suiting', tag: 'Canvassed' },
      { label: 'The Belvedere Cashmere Coat', href: '/collections/all?category=overcoats-outerwear', tag: 'Iconic' },
      { label: 'Gabardine Storm Trenches', href: '/collections/all?category=overcoats-outerwear' },
      { label: '200s Giza Cotton Dress Shirts', href: '/collections/all?category=tailored-shirts' },
      { label: 'Seamless Cashmere Rollnecks', href: '/collections/all?category=knitwear-sweaters' },
      { label: 'Double-Pleated Wide Slacks', href: '/collections/all?category=tailored-trousers' },
    ],
    fabrics: [
      { label: 'Loro Piana Super 130s Merino Wool', href: '/collections/all?fabric=Merino+Wool' },
      { label: 'Unbrushed 480 GSM Mongolian Cashmere', href: '/collections/all?fabric=Cashmere' },
      { label: 'Florence Vegetable-Tanned Calfskin', href: '/collections/all?fabric=Leather' },
      { label: '200s Two-Ply Egyptian Giza Cotton', href: '/collections/all?fabric=Cotton' },
      { label: 'Silk Grosgrain & Barathea Weaves', href: '/collections/all?fabric=Silk' },
      { label: 'Structured Biella Flannel', href: '/collections/all?fabric=Merino+Wool' },
    ],
    occasions: [
      { label: 'Black Tie & Gala Dinner', href: '/collections/all?occasion=Black+Tie', tag: 'Black Tie' },
      { label: 'White Tie & Sovereign State Events', href: '/collections/all?occasion=Gala' },
      { label: 'Sovereign Boardroom Executive', href: '/collections/all?occasion=Executive' },
      { label: 'Bespoke Groom & Wedding Edit', href: '/collections/wedding-edit' },
      { label: 'Autumn Alpine Journey', href: '/collections/all?occasion=Promenade' },
    ],
    featuredProduct: {
      name: 'The Brera Virgin Wool Dinner Tuxedo',
      subtitle: 'Super 130s Merino Wool · Floating Canvas',
      price: 220000,
      image: '/images/products/3d_charcoal_wool_tuxedo.webp',
      href: '/product/brera-double-breasted-dinner-tuxedo',
      badge: '3D Bespoke Sartorial',
    },
    conciergeServices: [
      {
        title: 'Master Tailor Measurement',
        description: 'Private 38-point anatomical measurement in Milan or Paris.',
        href: '/account',
      },
      {
        title: 'Bespoke Suiting Cloth Book',
        description: 'Select certified fabrics from Biella and Yorkshire mills.',
        href: '/account',
      },
    ],
  },
  wedding: {
    id: 'wedding',
    tabLabel: 'The Wedding Suite',
    heading: 'The Royal Wedding & Black Tie Suite',
    tagline: 'Architectural Duchess Satin Bridal Gowns, Chantilly Veils & Master Canvassed Groom Tuxedos',
    silhouettes: [
      { label: 'Cathedral Silk Faille Bridal Gown', href: '/collections/wedding-edit', tag: 'Couture' },
      { label: 'The Crema Modern Bridal Pant Suit', href: '/collections/wedding-edit', tag: 'Modern' },
      { label: 'Silk Velvet Evening Tuxedo', href: '/collections/wedding-edit', tag: 'Black Tie' },
      { label: 'Floating Canvas Barathea Tuxedo', href: '/collections/wedding-edit' },
      { label: 'Chantilly Lace Appliqué Veil', href: '/collections/wedding-edit' },
      { label: 'Mother-of-the-Bride Silk Columns', href: '/collections/wedding-edit' },
    ],
    fabrics: [
      { label: 'Lyon Duchess Silk Satin', href: '/collections/all?fabric=Duchess+Silk' },
      { label: 'French Chantilly & Guipure Lace', href: '/collections/all?fabric=Silk' },
      { label: 'Biella Wool-Silk Barathea', href: '/collections/all?fabric=Merino+Wool' },
      { label: 'Heavy Silk Faille & Organza', href: '/collections/all?fabric=Mulberry+Silk' },
      { label: 'Silk Satin Duchesse', href: '/collections/all?fabric=Silk' },
    ],
    occasions: [
      { label: 'Cathedral Wedding Ceremony', href: '/collections/wedding-edit', tag: 'Grand' },
      { label: 'Black Tie Evening Reception', href: '/collections/wedding-edit' },
      { label: 'Pre-Wedding Gala & Soirée', href: '/collections/wedding-edit' },
      { label: 'Rehearsal Dinner & Cocktail', href: '/collections/wedding-edit' },
    ],
    featuredProduct: {
      name: 'The Crema Double-Breasted Pant Suit',
      subtitle: 'Modern Bridal Haute Couture · Virgin Wool',
      price: 185000,
      image: '/images/products/3d_crema_pant_suit.webp',
      href: '/product/crema-double-breasted-pant-suit',
      badge: '3D Runway Masterpiece',
    },
    conciergeServices: [
      {
        title: 'Bespoke Trousseau Consultation',
        description: 'Complete bride and groom ensemble curation with private suite fittings.',
        href: '/account',
      },
      {
        title: 'Global Destination Wedding Delivery',
        description: 'Direct delivery by atelier concierge worldwide with steaming on-site.',
        href: '/account',
      },
    ],
  },
  craft: {
    id: 'craft',
    tabLabel: 'Atelier Archives & Noble Mills',
    heading: 'Living Craft Archives & European Mills',
    tagline: 'Centuries of Sartorial Mastery Preserved Across Lake Como, Biella, Milan, and Florence',
    silhouettes: [
      { label: 'Lake Como Silk Water-Jet Looms', href: '/our-craft', tag: 'Como, Italy' },
      { label: 'Biella Cashmere & Merino Spinning', href: '/our-craft', tag: 'Piedmont' },
      { label: 'Savile Row & Milanese Full Canvas', href: '/our-craft', tag: 'Milan' },
      { label: 'Florentine Leather Edge-Painting', href: '/our-craft', tag: 'Tuscany' },
      { label: 'Horn & Mother-of-Pearl Castings', href: '/our-craft' },
    ],
    fabrics: [
      { label: 'Certified Loro Piana Tasmanian Wool', href: '/our-craft' },
      { label: '480 GSM Grade-A Mongolian Cashmere', href: '/our-craft' },
      { label: 'Grade 6A Mulberry Silk Filaments', href: '/our-craft' },
      { label: 'Vegetable-Tanned Tuscan Nappa', href: '/our-craft' },
    ],
    occasions: [
      { label: 'Private Atelier Heritage Tour', href: '/our-craft' },
      { label: 'Artisan Bespoke Fitting Salon', href: '/account' },
      { label: 'Tactile Archive Box Request', href: '/account' },
    ],
    featuredProduct: {
      name: 'Belvedere Camel Cashmere Overcoat',
      subtitle: 'Pure Mongolian Cashmere · Florentine Horn Buttons',
      price: 245000,
      image: '/images/products/3d_camel_cashmere_coat.webp',
      href: '/product/belvedere-camel-cashmere-overcoat',
      badge: '3D 100% Cashmere',
    },
    conciergeServices: [
      {
        title: 'Private Milan Atelier Tour',
        description: 'Visit our historical ateliers and witness our master tailors at work.',
        href: '/account',
      },
      {
        title: 'Bespoke Archive Certificate',
        description: 'Each commissioned garment receives a numbered artisan authenticity seal.',
        href: '/our-craft',
      },
    ],
  },
};
