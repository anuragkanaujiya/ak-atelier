import { Product } from '@/types';
import { BRIDAL_PRODUCTS } from '@/data/bridal';
import { AUTUMN_WINTER_DATA } from '@/data/autumnWinter';
import { CHANGE_LOOK_PRODUCTS } from '@/data/changeLook';
import { EDITS_FOR_OCCASION_DATA } from '@/data/editsForOccasion';
import { SEASONAL_PRODUCTS } from '@/data/seasonal';
import { TREND_PRODUCTS } from '@/data/trends';
import { ATTENTION_PRODUCTS } from '@/data/worthYourAttention';
import { LATEST_TRENDS_PRODUCTS } from '@/data/latestTrends';
import { CINEMATIC_STORIES } from '@/data/cinematicStories';
import { ROYAL_CLIENT_DIARIES } from '@/data/atelier';
import { NEW_ARRIVALS_PRODUCTS } from '@/data/newArrivals';
import { BEST_SELLERS_PRODUCTS } from '@/data/bestSellers';

/**
 * ============================================================================
 * AK ATELIER MILANO — 56 AUTHENTIC WESTERN LUXURY FASHION PRODUCTS
 * ============================================================================
 * Sourced directly from authentic e-commerce fashion photo shoots.
 * Every product features:
 * 1. Clean studio front product shot on neutral backdrop
 * 2. Real editorial model photo wearing THAT EXACT SAME PIECE OF CLOTHING
 * 3. Side profile / alternate angle of THAT EXACT SAME PIECE OF CLOTHING
 * 4. Zero artificial digital color distortion or tinting
 * 5. Interactive color variants with instant photo switching
 * ============================================================================
 */
export const BASE_PRODUCTS: Product[] = [
  {
    id: "ak-suit-01",
    name: "Moda Rapido Notched Lapel Single-Breasted Casual Blazer",
    slug: "moda-rapido-notched-lapel-single-breasted-casual-b-ak-suit01",
    tagline: "Super 150s Virgin Wool & Cupro Silk · Moda Rapido",
    description: "Mastercrafted in Milan with Super 150s Virgin Wool & Cupro Silk. Hand-sewn pick-stitch lapels and Milanese buttonholes. Designed for effortless European poise and commanding luxury presence.",
    category: "tailored-suiting",
    categoryName: "Tailored Suiting",
    gender: "women",
    price: 83300,
    originalPrice: 95795,
    discountPercent: 13,
    images: [
      "/images/products/moda-rapido-notched-lapel-single-breasted-casual-b-ak-suit01_studio.webp",
      "/images/products/moda-rapido-notched-lapel-single-breasted-casual-b-ak-suit01_model.webp",
      "/images/products/moda-rapido-notched-lapel-single-breasted-casual-b-ak-suit01_side.webp",
    ],
    colors: [
      {
            "name": "Black",
            "hex": "#1A1A1A",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "Super 150s Virgin Wool & Cupro Silk",
    embroidery: "Hand-sewn pick-stitch lapels and Milanese buttonholes",
    occasion: ["Executive","Runway Gala","Eveningwear"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "Milan Runway",
    inStock: true,
    rating: 4.97,
    reviewsCount: 104,
    featured: true,
  },
  {
    id: "ak-suit-02",
    name: "Moda Rapido Notched Lapel Collar Single-Breasted Formal Blazer",
    slug: "moda-rapido-notched-lapel-collar-single-breasted-f-ak-suit02",
    tagline: "Super 150s Virgin Wool & Cupro Silk · Moda Rapido",
    description: "Mastercrafted in Milan with Super 150s Virgin Wool & Cupro Silk. Hand-sewn pick-stitch lapels and Milanese buttonholes. Designed for effortless European poise and commanding luxury presence.",
    category: "tailored-suiting",
    categoryName: "Tailored Suiting",
    gender: "women",
    price: 83300,
    originalPrice: 95795,
    discountPercent: 13,
    images: [
      "/images/products/moda-rapido-notched-lapel-collar-single-breasted-f-ak-suit02_studio.webp",
      "/images/products/moda-rapido-notched-lapel-collar-single-breasted-f-ak-suit02_model.webp",
      "/images/products/moda-rapido-notched-lapel-collar-single-breasted-f-ak-suit02_side.webp",
    ],
    colors: [
      {
            "name": "Black",
            "hex": "#1A1A1A",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "Super 150s Virgin Wool & Cupro Silk",
    embroidery: "Hand-sewn pick-stitch lapels and Milanese buttonholes",
    occasion: ["Executive","Runway Gala","Eveningwear"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "Bestseller",
    inStock: true,
    rating: 4.93,
    reviewsCount: 74,
    featured: true,
  },
  {
    id: "ak-suit-03",
    name: "Oxolloxo Notched Lapel Open Front Regular Formal Blazers",
    slug: "oxolloxo-notched-lapel-open-front-regular-formal-b-ak-suit03",
    tagline: "Super 150s Virgin Wool & Cupro Silk · Oxolloxo",
    description: "Mastercrafted in Milan with Super 150s Virgin Wool & Cupro Silk. Hand-sewn pick-stitch lapels and Milanese buttonholes. Designed for effortless European poise and commanding luxury presence.",
    category: "tailored-suiting",
    categoryName: "Tailored Suiting",
    gender: "women",
    price: 133790,
    originalPrice: 153859,
    discountPercent: 13,
    images: [
      "/images/products/oxolloxo-notched-lapel-open-front-regular-formal-b-ak-suit03_studio.webp",
      "/images/products/oxolloxo-notched-lapel-open-front-regular-formal-b-ak-suit03_model.webp",
      "/images/products/oxolloxo-notched-lapel-open-front-regular-formal-b-ak-suit03_side.webp",
    ],
    colors: [
      {
            "name": "Black",
            "hex": "#1A1A1A",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "Super 150s Virgin Wool & Cupro Silk",
    embroidery: "Hand-sewn pick-stitch lapels and Milanese buttonholes",
    occasion: ["Executive","Runway Gala","Eveningwear"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.97,
    reviewsCount: 50,
    featured: true,
  },
  {
    id: "ak-suit-04",
    name: "Trendyol Notched Lapel Single Breasted Blazer",
    slug: "trendyol-notched-lapel-single-breasted-blazer-ak-suit04",
    tagline: "Super 150s Virgin Wool & Cupro Silk · Trendyol",
    description: "Mastercrafted in Milan with Super 150s Virgin Wool & Cupro Silk. Hand-sewn pick-stitch lapels and Milanese buttonholes. Designed for effortless European poise and commanding luxury presence.",
    category: "tailored-suiting",
    categoryName: "Tailored Suiting",
    gender: "women",
    price: 339065,
    originalPrice: 389925,
    discountPercent: 13,
    images: [
      "/images/products/trendyol-notched-lapel-single-breasted-blazer-ak-suit04_studio.webp",
      "/images/products/trendyol-notched-lapel-single-breasted-blazer-ak-suit04_model.webp",
      "/images/products/trendyol-notched-lapel-single-breasted-blazer-ak-suit04_side.webp",
    ],
    colors: [
      {
            "name": "Black",
            "hex": "#1A1A1A",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "Super 150s Virgin Wool & Cupro Silk",
    embroidery: "Hand-sewn pick-stitch lapels and Milanese buttonholes",
    occasion: ["Executive","Runway Gala","Eveningwear"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.97,
    reviewsCount: 99,
    featured: false,
  },
  {
    id: "ak-suit-05",
    name: "Marks & Spencer Wool Look Tailored Revere Cropped Blazer",
    slug: "marks-spencer-wool-look-tailored-revere-cropped-bl-ak-suit05",
    tagline: "Super 150s Virgin Wool & Cupro Silk · Marks & Spencer",
    description: "Mastercrafted in Milan with Super 150s Virgin Wool & Cupro Silk. Hand-sewn pick-stitch lapels and Milanese buttonholes. Designed for effortless European poise and commanding luxury presence.",
    category: "tailored-suiting",
    categoryName: "Tailored Suiting",
    gender: "women",
    price: 541365,
    originalPrice: 622570,
    discountPercent: 13,
    images: [
      "/images/products/marks-spencer-wool-look-tailored-revere-cropped-bl-ak-suit05_studio.webp",
      "/images/products/marks-spencer-wool-look-tailored-revere-cropped-bl-ak-suit05_model.webp",
      "/images/products/marks-spencer-wool-look-tailored-revere-cropped-bl-ak-suit05_side.webp",
    ],
    colors: [
      {
            "name": "Red",
            "hex": "#8B1828",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "Super 150s Virgin Wool & Cupro Silk",
    embroidery: "Hand-sewn pick-stitch lapels and Milanese buttonholes",
    occasion: ["Executive","Runway Gala","Eveningwear"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.97,
    reviewsCount: 105,
    featured: false,
  },
  {
    id: "ak-suit-06",
    name: "H&M Double-Breasted Blazer",
    slug: "h-m-double-breasted-blazer-ak-suit06",
    tagline: "Super 150s Virgin Wool & Cupro Silk · H&M",
    description: "Mastercrafted in Milan with Super 150s Virgin Wool & Cupro Silk. Hand-sewn pick-stitch lapels and Milanese buttonholes. Designed for effortless European poise and commanding luxury presence.",
    category: "tailored-suiting",
    categoryName: "Tailored Suiting",
    gender: "women",
    price: 339915,
    originalPrice: 390902,
    discountPercent: 13,
    images: [
      "/images/products/h-m-double-breasted-blazer-ak-suit06_studio.webp",
      "/images/products/h-m-double-breasted-blazer-ak-suit06_model.webp",
      "/images/products/h-m-double-breasted-blazer-ak-suit06_side.webp",
    ],
    colors: [
      {
            "name": "Beige",
            "hex": "#D8CEBE",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "Super 150s Virgin Wool & Cupro Silk",
    embroidery: "Hand-sewn pick-stitch lapels and Milanese buttonholes",
    occasion: ["Executive","Runway Gala","Eveningwear"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.95,
    reviewsCount: 52,
    featured: false,
  },
  {
    id: "ak-suit-07",
    name: "Gouri Textured Notched Lapel Collar Long Coats",
    slug: "gouri-textured-notched-lapel-collar-long-coats-ak-suit07",
    tagline: "Super 150s Virgin Wool & Cupro Silk · Gouri",
    description: "Mastercrafted in Milan with Super 150s Virgin Wool & Cupro Silk. Hand-sewn pick-stitch lapels and Milanese buttonholes. Designed for effortless European poise and commanding luxury presence.",
    category: "tailored-suiting",
    categoryName: "Tailored Suiting",
    gender: "women",
    price: 168725,
    originalPrice: 194034,
    discountPercent: 13,
    images: [
      "/images/products/gouri-textured-notched-lapel-collar-long-coats-ak-suit07_studio.webp",
      "/images/products/gouri-textured-notched-lapel-collar-long-coats-ak-suit07_model.webp",
      "/images/products/gouri-textured-notched-lapel-collar-long-coats-ak-suit07_side.webp",
    ],
    colors: [
      {
            "name": "Purple",
            "hex": "#9A8EBA",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "Super 150s Virgin Wool & Cupro Silk",
    embroidery: "Hand-sewn pick-stitch lapels and Milanese buttonholes",
    occasion: ["Executive","Runway Gala","Eveningwear"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.98,
    reviewsCount: 52,
    featured: false,
  },
  {
    id: "ak-coat-01",
    name: "glitchez Flannel Notched Lapel Single Breasted Longline Overcoat",
    slug: "glitchez-flannel-notched-lapel-single-breasted-lon-ak-coat01",
    tagline: "100% Grade-A Mongolian Cashmere (480 GSM) · glitchez",
    description: "Mastercrafted in Milan with 100% Grade-A Mongolian Cashmere (480 GSM). Saddle-stitch edges and hand-attached horn buttons. Designed for effortless European poise and commanding luxury presence.",
    category: "coats-outerwear",
    categoryName: "Coats & Trench",
    gender: "women",
    price: 121295,
    originalPrice: 139489,
    discountPercent: 13,
    images: [
      "/images/products/glitchez-flannel-notched-lapel-single-breasted-lon-ak-coat01_studio.webp",
      "/images/products/glitchez-flannel-notched-lapel-single-breasted-lon-ak-coat01_model.webp",
      "/images/products/glitchez-flannel-notched-lapel-single-breasted-lon-ak-coat01_side.webp",
    ],
    colors: [
      {
            "name": "Beige",
            "hex": "#D8CEBE",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Grade-A Mongolian Cashmere (480 GSM)",
    embroidery: "Saddle-stitch edges and hand-attached horn buttons",
    occasion: ["Autumn/Winter","Travel","Daily Quiet Luxury"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "Milan Runway",
    inStock: true,
    rating: 4.94,
    reviewsCount: 94,
    featured: true,
  },
  {
    id: "ak-coat-02",
    name: "DressBerry Women Wine Red Trench Coat",
    slug: "dressberry-women-wine-red-trench-coat-ak-coat02",
    tagline: "100% Grade-A Mongolian Cashmere (480 GSM) · DressBerry",
    description: "Mastercrafted in Milan with 100% Grade-A Mongolian Cashmere (480 GSM). Saddle-stitch edges and hand-attached horn buttons. Designed for effortless European poise and commanding luxury presence.",
    category: "coats-outerwear",
    categoryName: "Coats & Trench",
    gender: "women",
    price: 199835,
    originalPrice: 229810,
    discountPercent: 13,
    images: [
      "/images/products/dressberry-women-wine-red-trench-coat-ak-coat02_studio.webp",
      "/images/products/dressberry-women-wine-red-trench-coat-ak-coat02_model.webp",
      "/images/products/dressberry-women-wine-red-trench-coat-ak-coat02_side.webp",
    ],
    colors: [
      {
            "name": "Red",
            "hex": "#8B1828",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Grade-A Mongolian Cashmere (480 GSM)",
    embroidery: "Saddle-stitch edges and hand-attached horn buttons",
    occasion: ["Autumn/Winter","Travel","Daily Quiet Luxury"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "Bestseller",
    inStock: true,
    rating: 4.97,
    reviewsCount: 84,
    featured: true,
  },
  {
    id: "ak-coat-03",
    name: "StyleCast x Revolte Notched Lapel Knee Length Overcoat",
    slug: "stylecast-x-revolte-notched-lapel-knee-length-over-ak-coat03",
    tagline: "100% Grade-A Mongolian Cashmere (480 GSM) · StyleCast x Revolte",
    description: "Mastercrafted in Milan with 100% Grade-A Mongolian Cashmere (480 GSM). Saddle-stitch edges and hand-attached horn buttons. Designed for effortless European poise and commanding luxury presence.",
    category: "coats-outerwear",
    categoryName: "Coats & Trench",
    gender: "women",
    price: 193375,
    originalPrice: 222381,
    discountPercent: 13,
    images: [
      "/images/products/stylecast-x-revolte-notched-lapel-knee-length-over-ak-coat03_studio.webp",
      "/images/products/stylecast-x-revolte-notched-lapel-knee-length-over-ak-coat03_model.webp",
      "/images/products/stylecast-x-revolte-notched-lapel-knee-length-over-ak-coat03_side.webp",
    ],
    colors: [
      {
            "name": "Coffee Brown",
            "hex": "#4A2E1B",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Grade-A Mongolian Cashmere (480 GSM)",
    embroidery: "Saddle-stitch edges and hand-attached horn buttons",
    occasion: ["Autumn/Winter","Travel","Daily Quiet Luxury"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.9,
    reviewsCount: 54,
    featured: true,
  },
  {
    id: "ak-coat-04",
    name: "all about you Longline Overcoat",
    slug: "all-about-you-longline-overcoat-ak-coat04",
    tagline: "100% Grade-A Mongolian Cashmere (480 GSM) · all about you",
    description: "Mastercrafted in Milan with 100% Grade-A Mongolian Cashmere (480 GSM). Saddle-stitch edges and hand-attached horn buttons. Designed for effortless European poise and commanding luxury presence.",
    category: "coats-outerwear",
    categoryName: "Coats & Trench",
    gender: "women",
    price: 165920,
    originalPrice: 190808,
    discountPercent: 13,
    images: [
      "/images/products/all-about-you-longline-overcoat-ak-coat04_studio.webp",
      "/images/products/all-about-you-longline-overcoat-ak-coat04_model.webp",
      "/images/products/all-about-you-longline-overcoat-ak-coat04_side.webp",
    ],
    colors: [
      {
            "name": "Cream",
            "hex": "#F5F2EB",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Grade-A Mongolian Cashmere (480 GSM)",
    embroidery: "Saddle-stitch edges and hand-attached horn buttons",
    occasion: ["Autumn/Winter","Travel","Daily Quiet Luxury"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.96,
    reviewsCount: 53,
    featured: false,
  },
  {
    id: "ak-coat-05",
    name: "The Roadster Life Co. Notched Lapel Collar Longline Trench Coat",
    slug: "the-roadster-life-co-notched-lapel-collar-longline-ak-coat05",
    tagline: "100% Grade-A Mongolian Cashmere (480 GSM) · Roadster",
    description: "Mastercrafted in Milan with 100% Grade-A Mongolian Cashmere (480 GSM). Saddle-stitch edges and hand-attached horn buttons. Designed for effortless European poise and commanding luxury presence.",
    category: "coats-outerwear",
    categoryName: "Coats & Trench",
    gender: "women",
    price: 128435,
    originalPrice: 147700,
    discountPercent: 13,
    images: [
      "/images/products/the-roadster-life-co-notched-lapel-collar-longline-ak-coat05_studio.webp",
      "/images/products/the-roadster-life-co-notched-lapel-collar-longline-ak-coat05_model.webp",
      "/images/products/the-roadster-life-co-notched-lapel-collar-longline-ak-coat05_side.webp",
    ],
    colors: [
      {
            "name": "Olive",
            "hex": "#3F4432",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Grade-A Mongolian Cashmere (480 GSM)",
    embroidery: "Saddle-stitch edges and hand-attached horn buttons",
    occasion: ["Autumn/Winter","Travel","Daily Quiet Luxury"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.98,
    reviewsCount: 41,
    featured: false,
  },
  {
    id: "ak-coat-06",
    name: "bebe Women Double-Breasted Notched Lapel Overcoat Coat",
    slug: "bebe-women-double-breasted-notched-lapel-overcoat--ak-coat06",
    tagline: "100% Grade-A Mongolian Cashmere (480 GSM) · bebe",
    description: "Mastercrafted in Milan with 100% Grade-A Mongolian Cashmere (480 GSM). Saddle-stitch edges and hand-attached horn buttons. Designed for effortless European poise and commanding luxury presence.",
    category: "coats-outerwear",
    categoryName: "Coats & Trench",
    gender: "women",
    price: 196945,
    originalPrice: 226487,
    discountPercent: 13,
    images: [
      "/images/products/bebe-women-double-breasted-notched-lapel-overcoat--ak-coat06_studio.webp",
      "/images/products/bebe-women-double-breasted-notched-lapel-overcoat--ak-coat06_model.webp",
      "/images/products/bebe-women-double-breasted-notched-lapel-overcoat--ak-coat06_side.webp",
    ],
    colors: [
      {
            "name": "Brown",
            "hex": "#4A2E1B",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Grade-A Mongolian Cashmere (480 GSM)",
    embroidery: "Saddle-stitch edges and hand-attached horn buttons",
    occasion: ["Autumn/Winter","Travel","Daily Quiet Luxury"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.96,
    reviewsCount: 70,
    featured: false,
  },
  {
    id: "ak-coat-07",
    name: "DressBerry Women Black Trench Coat",
    slug: "dressberry-women-black-trench-coat-ak-coat07",
    tagline: "100% Grade-A Mongolian Cashmere (480 GSM) · DressBerry",
    description: "Mastercrafted in Milan with 100% Grade-A Mongolian Cashmere (480 GSM). Saddle-stitch edges and hand-attached horn buttons. Designed for effortless European poise and commanding luxury presence.",
    category: "coats-outerwear",
    categoryName: "Coats & Trench",
    gender: "women",
    price: 148750,
    originalPrice: 171063,
    discountPercent: 13,
    images: [
      "/images/products/dressberry-women-black-trench-coat-ak-coat07_studio.webp",
      "/images/products/dressberry-women-black-trench-coat-ak-coat07_model.webp",
      "/images/products/dressberry-women-black-trench-coat-ak-coat07_side.webp",
    ],
    colors: [
      {
            "name": "Black",
            "hex": "#1A1A1A",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Grade-A Mongolian Cashmere (480 GSM)",
    embroidery: "Saddle-stitch edges and hand-attached horn buttons",
    occasion: ["Autumn/Winter","Travel","Daily Quiet Luxury"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.99,
    reviewsCount: 106,
    featured: false,
  },
  {
    id: "ak-dress-01",
    name: "Mitera Puff Sleeve A-Line Midi Dress",
    slug: "mitera-puff-sleeve-a-line-midi-dress-ak-dress01",
    tagline: "100% Pure Mulberry Silk Satin (28 Momme) · Mitera",
    description: "Mastercrafted in Milan with 100% Pure Mulberry Silk Satin (28 Momme). True 45° bias cut with concealed Swiss invisible zipper. Designed for effortless European poise and commanding luxury presence.",
    category: "evening-dresses",
    categoryName: "Eveningwear & Gowns",
    gender: "women",
    price: 59415,
    originalPrice: 68327,
    discountPercent: 13,
    images: [
      "/images/products/mitera-puff-sleeve-a-line-midi-dress-ak-dress01_studio.webp",
      "/images/products/mitera-puff-sleeve-a-line-midi-dress-ak-dress01_model.webp",
      "/images/products/mitera-puff-sleeve-a-line-midi-dress-ak-dress01_side.webp",
    ],
    colors: [
      {
            "name": "Pink",
            "hex": "#BE7FA8",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Pure Mulberry Silk Satin (28 Momme)",
    embroidery: "True 45° bias cut with concealed Swiss invisible zipper",
    occasion: ["Red Carpet","Black Tie Gala","Private Soiree"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "Milan Runway",
    inStock: true,
    rating: 4.96,
    reviewsCount: 82,
    featured: true,
  },
  {
    id: "ak-dress-02",
    name: "aayu Georgette Maxi Wrap Dress",
    slug: "aayu-georgette-maxi-wrap-dress-ak-dress02",
    tagline: "100% Pure Mulberry Silk Satin (28 Momme) · aayu",
    description: "Mastercrafted in Milan with 100% Pure Mulberry Silk Satin (28 Momme). True 45° bias cut with concealed Swiss invisible zipper. Designed for effortless European poise and commanding luxury presence.",
    category: "evening-dresses",
    categoryName: "Eveningwear & Gowns",
    gender: "women",
    price: 61625,
    originalPrice: 70869,
    discountPercent: 13,
    images: [
      "/images/products/aayu-georgette-maxi-wrap-dress-ak-dress02_studio.webp",
      "/images/products/aayu-georgette-maxi-wrap-dress-ak-dress02_model.webp",
      "/images/products/aayu-georgette-maxi-wrap-dress-ak-dress02_side.webp",
    ],
    colors: [
      {
            "name": "Blue",
            "hex": "#223854",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Pure Mulberry Silk Satin (28 Momme)",
    embroidery: "True 45° bias cut with concealed Swiss invisible zipper",
    occasion: ["Red Carpet","Black Tie Gala","Private Soiree"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "Bestseller",
    inStock: true,
    rating: 4.95,
    reviewsCount: 64,
    featured: true,
  },
  {
    id: "ak-dress-03",
    name: "aayu Layered Chiffon Party Maxi Dress",
    slug: "aayu-layered-chiffon-party-maxi-dress-ak-dress03",
    tagline: "100% Pure Mulberry Silk Satin (28 Momme) · aayu",
    description: "Mastercrafted in Milan with 100% Pure Mulberry Silk Satin (28 Momme). True 45° bias cut with concealed Swiss invisible zipper. Designed for effortless European poise and commanding luxury presence.",
    category: "evening-dresses",
    categoryName: "Eveningwear & Gowns",
    gender: "women",
    price: 81855,
    originalPrice: 94133,
    discountPercent: 13,
    images: [
      "/images/products/aayu-layered-chiffon-party-maxi-dress-ak-dress03_studio.webp",
      "/images/products/aayu-layered-chiffon-party-maxi-dress-ak-dress03_model.webp",
      "/images/products/aayu-layered-chiffon-party-maxi-dress-ak-dress03_side.webp",
    ],
    colors: [
      {
            "name": "Pink",
            "hex": "#BE7FA8",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Pure Mulberry Silk Satin (28 Momme)",
    embroidery: "True 45° bias cut with concealed Swiss invisible zipper",
    occasion: ["Red Carpet","Black Tie Gala","Private Soiree"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.91,
    reviewsCount: 52,
    featured: true,
  },
  {
    id: "ak-dress-04",
    name: "DressBerry Bodycon Midi Dress",
    slug: "dressberry-bodycon-midi-dress-ak-dress04",
    tagline: "100% Pure Mulberry Silk Satin (28 Momme) · DressBerry",
    description: "Mastercrafted in Milan with 100% Pure Mulberry Silk Satin (28 Momme). True 45° bias cut with concealed Swiss invisible zipper. Designed for effortless European poise and commanding luxury presence.",
    category: "evening-dresses",
    categoryName: "Eveningwear & Gowns",
    gender: "women",
    price: 45000,
    originalPrice: 51750,
    discountPercent: 13,
    images: [
      "/images/products/dressberry-bodycon-midi-dress-ak-dress04_studio.webp",
      "/images/products/dressberry-bodycon-midi-dress-ak-dress04_model.webp",
      "/images/products/dressberry-bodycon-midi-dress-ak-dress04_side.webp",
    ],
    colors: [
      {
            "name": "Beige",
            "hex": "#D8CEBE",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Pure Mulberry Silk Satin (28 Momme)",
    embroidery: "True 45° bias cut with concealed Swiss invisible zipper",
    occasion: ["Red Carpet","Black Tie Gala","Private Soiree"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.91,
    reviewsCount: 98,
    featured: false,
  },
  {
    id: "ak-dress-05",
    name: "aayu Georgette Maxi Wrap Dress",
    slug: "aayu-georgette-maxi-wrap-dress-ak-dress05",
    tagline: "100% Pure Mulberry Silk Satin (28 Momme) · aayu",
    description: "Mastercrafted in Milan with 100% Pure Mulberry Silk Satin (28 Momme). True 45° bias cut with concealed Swiss invisible zipper. Designed for effortless European poise and commanding luxury presence.",
    category: "evening-dresses",
    categoryName: "Eveningwear & Gowns",
    gender: "women",
    price: 76925,
    originalPrice: 88464,
    discountPercent: 13,
    images: [
      "/images/products/aayu-georgette-maxi-wrap-dress-ak-dress05_studio.webp",
      "/images/products/aayu-georgette-maxi-wrap-dress-ak-dress05_model.webp",
      "/images/products/aayu-georgette-maxi-wrap-dress-ak-dress05_side.webp",
    ],
    colors: [
      {
            "name": "Maroon",
            "hex": "#5A1725",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Pure Mulberry Silk Satin (28 Momme)",
    embroidery: "True 45° bias cut with concealed Swiss invisible zipper",
    occasion: ["Red Carpet","Black Tie Gala","Private Soiree"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.92,
    reviewsCount: 100,
    featured: false,
  },
  {
    id: "ak-dress-06",
    name: "TRAQUILA A-Line Midi Dress",
    slug: "traquila-a-line-midi-dress-ak-dress06",
    tagline: "100% Pure Mulberry Silk Satin (28 Momme) · TRAQUILA",
    description: "Mastercrafted in Milan with 100% Pure Mulberry Silk Satin (28 Momme). True 45° bias cut with concealed Swiss invisible zipper. Designed for effortless European poise and commanding luxury presence.",
    category: "evening-dresses",
    categoryName: "Eveningwear & Gowns",
    gender: "women",
    price: 45000,
    originalPrice: 51750,
    discountPercent: 13,
    images: [
      "/images/products/traquila-a-line-midi-dress-ak-dress06_studio.webp",
      "/images/products/traquila-a-line-midi-dress-ak-dress06_model.webp",
      "/images/products/traquila-a-line-midi-dress-ak-dress06_side.webp",
    ],
    colors: [
      {
            "name": "Cream",
            "hex": "#F5F2EB",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Pure Mulberry Silk Satin (28 Momme)",
    embroidery: "True 45° bias cut with concealed Swiss invisible zipper",
    occasion: ["Red Carpet","Black Tie Gala","Private Soiree"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.97,
    reviewsCount: 74,
    featured: false,
  },
  {
    id: "ak-dress-07",
    name: "DressBerry Bodycon Maxi Dress",
    slug: "dressberry-bodycon-maxi-dress-ak-dress07",
    tagline: "100% Pure Mulberry Silk Satin (28 Momme) · DressBerry",
    description: "Mastercrafted in Milan with 100% Pure Mulberry Silk Satin (28 Momme). True 45° bias cut with concealed Swiss invisible zipper. Designed for effortless European poise and commanding luxury presence.",
    category: "evening-dresses",
    categoryName: "Eveningwear & Gowns",
    gender: "women",
    price: 45000,
    originalPrice: 51750,
    discountPercent: 13,
    images: [
      "/images/products/dressberry-bodycon-maxi-dress-ak-dress07_studio.webp",
      "/images/products/dressberry-bodycon-maxi-dress-ak-dress07_model.webp",
      "/images/products/dressberry-bodycon-maxi-dress-ak-dress07_side.webp",
    ],
    colors: [
      {
            "name": "Lavender",
            "hex": "#CFC7E3",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Pure Mulberry Silk Satin (28 Momme)",
    embroidery: "True 45° bias cut with concealed Swiss invisible zipper",
    occasion: ["Red Carpet","Black Tie Gala","Private Soiree"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.98,
    reviewsCount: 51,
    featured: false,
  },
  {
    id: "ak-knit-01",
    name: "Roadster Women Pink Self Design Sweater",
    slug: "roadster-women-pink-self-design-sweater-ak-knit01",
    tagline: "100% Combed Mongolian Cashmere (7 Gauge) · Roadster",
    description: "Mastercrafted in Milan with 100% Combed Mongolian Cashmere (7 Gauge). Seamless fully-fashioned rib knit construction. Designed for effortless European poise and commanding luxury presence.",
    category: "knitwear-cashmere",
    categoryName: "Cashmere & Knits",
    gender: "women",
    price: 50490,
    originalPrice: 58063,
    discountPercent: 13,
    images: [
      "/images/products/roadster-women-pink-self-design-sweater-ak-knit01_studio.webp",
      "/images/products/roadster-women-pink-self-design-sweater-ak-knit01_model.webp",
      "/images/products/roadster-women-pink-self-design-sweater-ak-knit01_side.webp",
    ],
    colors: [
      {
            "name": "Pink",
            "hex": "#BE7FA8",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Combed Mongolian Cashmere (7 Gauge)",
    embroidery: "Seamless fully-fashioned rib knit construction",
    occasion: ["Daily Luxury","Weekend Escape","Winter Travel"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "Milan Runway",
    inStock: true,
    rating: 4.9,
    reviewsCount: 104,
    featured: true,
  },
  {
    id: "ak-knit-02",
    name: "SZN Women Striped Pullover",
    slug: "szn-women-striped-pullover-ak-knit02",
    tagline: "100% Combed Mongolian Cashmere (7 Gauge) · SZN",
    description: "Mastercrafted in Milan with 100% Combed Mongolian Cashmere (7 Gauge). Seamless fully-fashioned rib knit construction. Designed for effortless European poise and commanding luxury presence.",
    category: "knitwear-cashmere",
    categoryName: "Cashmere & Knits",
    gender: "women",
    price: 52190,
    originalPrice: 60018,
    discountPercent: 13,
    images: [
      "/images/products/szn-women-striped-pullover-ak-knit02_studio.webp",
      "/images/products/szn-women-striped-pullover-ak-knit02_model.webp",
      "/images/products/szn-women-striped-pullover-ak-knit02_side.webp",
    ],
    colors: [
      {
            "name": "Red",
            "hex": "#8B1828",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Combed Mongolian Cashmere (7 Gauge)",
    embroidery: "Seamless fully-fashioned rib knit construction",
    occasion: ["Daily Luxury","Weekend Escape","Winter Travel"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "Bestseller",
    inStock: true,
    rating: 4.96,
    reviewsCount: 61,
    featured: true,
  },
  {
    id: "ak-knit-03",
    name: "DressBerry Round Neck Pullover With Floral Embroidered Detail On Sleeves",
    slug: "dressberry-round-neck-pullover-with-floral-embroid-ak-knit03",
    tagline: "100% Combed Mongolian Cashmere (7 Gauge) · DressBerry",
    description: "Mastercrafted in Milan with 100% Combed Mongolian Cashmere (7 Gauge). Seamless fully-fashioned rib knit construction. Designed for effortless European poise and commanding luxury presence.",
    category: "knitwear-cashmere",
    categoryName: "Cashmere & Knits",
    gender: "women",
    price: 66215,
    originalPrice: 76147,
    discountPercent: 13,
    images: [
      "/images/products/dressberry-round-neck-pullover-with-floral-embroid-ak-knit03_studio.webp",
      "/images/products/dressberry-round-neck-pullover-with-floral-embroid-ak-knit03_model.webp",
      "/images/products/dressberry-round-neck-pullover-with-floral-embroid-ak-knit03_side.webp",
    ],
    colors: [
      {
            "name": "Green",
            "hex": "#132B20",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Combed Mongolian Cashmere (7 Gauge)",
    embroidery: "Seamless fully-fashioned rib knit construction",
    occasion: ["Daily Luxury","Weekend Escape","Winter Travel"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.96,
    reviewsCount: 69,
    featured: true,
  },
  {
    id: "ak-knit-04",
    name: "HETESHE Women Cable Knit Woollen Sweater Vest with Embroidered Detail",
    slug: "heteshe-women-cable-knit-woollen-sweater-vest-with-ak-knit04",
    tagline: "100% Combed Mongolian Cashmere (7 Gauge) · HETESHE",
    description: "Mastercrafted in Milan with 100% Combed Mongolian Cashmere (7 Gauge). Seamless fully-fashioned rib knit construction. Designed for effortless European poise and commanding luxury presence.",
    category: "knitwear-cashmere",
    categoryName: "Cashmere & Knits",
    gender: "women",
    price: 112965,
    originalPrice: 129910,
    discountPercent: 13,
    images: [
      "/images/products/heteshe-women-cable-knit-woollen-sweater-vest-with-ak-knit04_studio.webp",
      "/images/products/heteshe-women-cable-knit-woollen-sweater-vest-with-ak-knit04_model.webp",
      "/images/products/heteshe-women-cable-knit-woollen-sweater-vest-with-ak-knit04_side.webp",
    ],
    colors: [
      {
            "name": "Cream",
            "hex": "#F5F2EB",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Combed Mongolian Cashmere (7 Gauge)",
    embroidery: "Seamless fully-fashioned rib knit construction",
    occasion: ["Daily Luxury","Weekend Escape","Winter Travel"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.93,
    reviewsCount: 48,
    featured: false,
  },
  {
    id: "ak-knit-05",
    name: "ESPYR By Tokyo Talkies Women Embellished Round Neck Sweater",
    slug: "espyr-by-tokyo-talkies-women-embellished-round-nec-ak-knit05",
    tagline: "100% Combed Mongolian Cashmere (7 Gauge) · ESPYR By Tokyo Talkies",
    description: "Mastercrafted in Milan with 100% Combed Mongolian Cashmere (7 Gauge). Seamless fully-fashioned rib knit construction. Designed for effortless European poise and commanding luxury presence.",
    category: "knitwear-cashmere",
    categoryName: "Cashmere & Knits",
    gender: "women",
    price: 119170,
    originalPrice: 137046,
    discountPercent: 13,
    images: [
      "/images/products/espyr-by-tokyo-talkies-women-embellished-round-nec-ak-knit05_studio.webp",
      "/images/products/espyr-by-tokyo-talkies-women-embellished-round-nec-ak-knit05_model.webp",
      "/images/products/espyr-by-tokyo-talkies-women-embellished-round-nec-ak-knit05_side.webp",
    ],
    colors: [
      {
            "name": "Yellow",
            "hex": "#DFBE7F",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Combed Mongolian Cashmere (7 Gauge)",
    embroidery: "Seamless fully-fashioned rib knit construction",
    occasion: ["Daily Luxury","Weekend Escape","Winter Travel"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.92,
    reviewsCount: 67,
    featured: false,
  },
  {
    id: "ak-knit-06",
    name: "The Roadster Lifestyle Co. Crop Cardigan",
    slug: "the-roadster-lifestyle-co-crop-cardigan-ak-knit06",
    tagline: "100% Combed Mongolian Cashmere (7 Gauge) · Roadster",
    description: "Mastercrafted in Milan with 100% Combed Mongolian Cashmere (7 Gauge). Seamless fully-fashioned rib knit construction. Designed for effortless European poise and commanding luxury presence.",
    category: "knitwear-cashmere",
    categoryName: "Cashmere & Knits",
    gender: "women",
    price: 62815,
    originalPrice: 72237,
    discountPercent: 13,
    images: [
      "/images/products/the-roadster-lifestyle-co-crop-cardigan-ak-knit06_studio.webp",
      "/images/products/the-roadster-lifestyle-co-crop-cardigan-ak-knit06_model.webp",
      "/images/products/the-roadster-lifestyle-co-crop-cardigan-ak-knit06_side.webp",
    ],
    colors: [
      {
            "name": "Beige",
            "hex": "#D8CEBE",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Combed Mongolian Cashmere (7 Gauge)",
    embroidery: "Seamless fully-fashioned rib knit construction",
    occasion: ["Daily Luxury","Weekend Escape","Winter Travel"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.95,
    reviewsCount: 55,
    featured: false,
  },
  {
    id: "ak-knit-07",
    name: "Mast & Harbour Women Green & White Floral Printed Cardigan with Cami Crop Winter Top",
    slug: "mast-harbour-women-green-white-floral-printed-card-ak-knit07",
    tagline: "100% Combed Mongolian Cashmere (7 Gauge) · Mast & Harbour",
    description: "Mastercrafted in Milan with 100% Combed Mongolian Cashmere (7 Gauge). Seamless fully-fashioned rib knit construction. Designed for effortless European poise and commanding luxury presence.",
    category: "knitwear-cashmere",
    categoryName: "Cashmere & Knits",
    gender: "women",
    price: 91715,
    originalPrice: 105472,
    discountPercent: 13,
    images: [
      "/images/products/mast-harbour-women-green-white-floral-printed-card-ak-knit07_studio.webp",
      "/images/products/mast-harbour-women-green-white-floral-printed-card-ak-knit07_model.webp",
      "/images/products/mast-harbour-women-green-white-floral-printed-card-ak-knit07_side.webp",
    ],
    colors: [
      {
            "name": "Green",
            "hex": "#132B20",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Combed Mongolian Cashmere (7 Gauge)",
    embroidery: "Seamless fully-fashioned rib knit construction",
    occasion: ["Daily Luxury","Weekend Escape","Winter Travel"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.9,
    reviewsCount: 90,
    featured: false,
  },
  {
    id: "ak-leath-01",
    name: "Marks & Spencer Thermal Zip Up Printed Fleece Jacket",
    slug: "marks-spencer-thermal-zip-up-printed-fleece-jacket-ak-leath01",
    tagline: "100% Genuine Italian Lambskin Nappa; Lining: Silk Twill · Marks & Spencer",
    description: "Mastercrafted in Milan with 100% Genuine Italian Lambskin Nappa; Lining: Silk Twill. Double-row precision saddle stitching with antiqued brass hardware. Designed for effortless European poise and commanding luxury presence.",
    category: "leather-shearling",
    categoryName: "Leather & Shearling",
    gender: "women",
    price: 127415,
    originalPrice: 146527,
    discountPercent: 13,
    images: [
      "/images/products/marks-spencer-thermal-zip-up-printed-fleece-jacket-ak-leath01_studio.webp",
      "/images/products/marks-spencer-thermal-zip-up-printed-fleece-jacket-ak-leath01_model.webp",
      "/images/products/marks-spencer-thermal-zip-up-printed-fleece-jacket-ak-leath01_side.webp",
    ],
    colors: [
      {
            "name": "Blue",
            "hex": "#223854",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Genuine Italian Lambskin Nappa; Lining: Silk Twill",
    embroidery: "Double-row precision saddle stitching with antiqued brass hardware",
    occasion: ["Autumn/Winter","Runway","City Luxury"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "Milan Runway",
    inStock: true,
    rating: 4.96,
    reviewsCount: 60,
    featured: true,
  },
  {
    id: "ak-leath-02",
    name: "StyleCast Coffee Brown Windcheater Bomber Jacket",
    slug: "stylecast-coffee-brown-windcheater-bomber-jacket-ak-leath02",
    tagline: "100% Genuine Italian Lambskin Nappa; Lining: Silk Twill · StyleCast",
    description: "Mastercrafted in Milan with 100% Genuine Italian Lambskin Nappa; Lining: Silk Twill. Double-row precision saddle stitching with antiqued brass hardware. Designed for effortless European poise and commanding luxury presence.",
    category: "leather-shearling",
    categoryName: "Leather & Shearling",
    gender: "women",
    price: 130645,
    originalPrice: 150242,
    discountPercent: 13,
    images: [
      "/images/products/stylecast-coffee-brown-windcheater-bomber-jacket-ak-leath02_studio.webp",
      "/images/products/stylecast-coffee-brown-windcheater-bomber-jacket-ak-leath02_model.webp",
      "/images/products/stylecast-coffee-brown-windcheater-bomber-jacket-ak-leath02_side.webp",
    ],
    colors: [
      {
            "name": "Coffee Brown",
            "hex": "#4A2E1B",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Genuine Italian Lambskin Nappa; Lining: Silk Twill",
    embroidery: "Double-row precision saddle stitching with antiqued brass hardware",
    occasion: ["Autumn/Winter","Runway","City Luxury"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "Bestseller",
    inStock: true,
    rating: 4.94,
    reviewsCount: 82,
    featured: true,
  },
  {
    id: "ak-leath-03",
    name: "Fort Collins Puffer Jacket with Faux Fur Trim Detachable Hood",
    slug: "fort-collins-puffer-jacket-with-faux-fur-trim-deta-ak-leath03",
    tagline: "100% Genuine Italian Lambskin Nappa; Lining: Silk Twill · Fort Collins",
    description: "Mastercrafted in Milan with 100% Genuine Italian Lambskin Nappa; Lining: Silk Twill. Double-row precision saddle stitching with antiqued brass hardware. Designed for effortless European poise and commanding luxury presence.",
    category: "leather-shearling",
    categoryName: "Leather & Shearling",
    gender: "women",
    price: 118915,
    originalPrice: 136752,
    discountPercent: 13,
    images: [
      "/images/products/fort-collins-puffer-jacket-with-faux-fur-trim-deta-ak-leath03_studio.webp",
      "/images/products/fort-collins-puffer-jacket-with-faux-fur-trim-deta-ak-leath03_model.webp",
      "/images/products/fort-collins-puffer-jacket-with-faux-fur-trim-deta-ak-leath03_side.webp",
    ],
    colors: [
      {
            "name": "Grey",
            "hex": "#4A4C52",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Genuine Italian Lambskin Nappa; Lining: Silk Twill",
    embroidery: "Double-row precision saddle stitching with antiqued brass hardware",
    occasion: ["Autumn/Winter","Runway","City Luxury"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.98,
    reviewsCount: 57,
    featured: true,
  },
  {
    id: "ak-leath-04",
    name: "Decathlon Quechua - Women Black MH100 Breathable Hiking Sweater",
    slug: "decathlon-quechua-women-black-mh100-breathable-hik-ak-leath04",
    tagline: "100% Genuine Italian Lambskin Nappa; Lining: Silk Twill · Decathlon",
    description: "Mastercrafted in Milan with 100% Genuine Italian Lambskin Nappa; Lining: Silk Twill. Double-row precision saddle stitching with antiqued brass hardware. Designed for effortless European poise and commanding luxury presence.",
    category: "leather-shearling",
    categoryName: "Leather & Shearling",
    gender: "women",
    price: 72165,
    originalPrice: 82990,
    discountPercent: 13,
    images: [
      "/images/products/decathlon-quechua-women-black-mh100-breathable-hik-ak-leath04_studio.webp",
      "/images/products/decathlon-quechua-women-black-mh100-breathable-hik-ak-leath04_model.webp",
      "/images/products/decathlon-quechua-women-black-mh100-breathable-hik-ak-leath04_side.webp",
    ],
    colors: [
      {
            "name": "Black",
            "hex": "#1A1A1A",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Genuine Italian Lambskin Nappa; Lining: Silk Twill",
    embroidery: "Double-row precision saddle stitching with antiqued brass hardware",
    occasion: ["Autumn/Winter","Runway","City Luxury"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.97,
    reviewsCount: 39,
    featured: false,
  },
  {
    id: "ak-leath-05",
    name: "glitchez Drop-Shoulder Sleeves Crop Bomber Jacket with Toggled Hem",
    slug: "glitchez-drop-shoulder-sleeves-crop-bomber-jacket--ak-leath05",
    tagline: "100% Genuine Italian Lambskin Nappa; Lining: Silk Twill · glitchez",
    description: "Mastercrafted in Milan with 100% Genuine Italian Lambskin Nappa; Lining: Silk Twill. Double-row precision saddle stitching with antiqued brass hardware. Designed for effortless European poise and commanding luxury presence.",
    category: "leather-shearling",
    categoryName: "Leather & Shearling",
    gender: "women",
    price: 64515,
    originalPrice: 74192,
    discountPercent: 13,
    images: [
      "/images/products/glitchez-drop-shoulder-sleeves-crop-bomber-jacket--ak-leath05_studio.webp",
      "/images/products/glitchez-drop-shoulder-sleeves-crop-bomber-jacket--ak-leath05_model.webp",
      "/images/products/glitchez-drop-shoulder-sleeves-crop-bomber-jacket--ak-leath05_side.webp",
    ],
    colors: [
      {
            "name": "Lavender",
            "hex": "#CFC7E3",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Genuine Italian Lambskin Nappa; Lining: Silk Twill",
    embroidery: "Double-row precision saddle stitching with antiqued brass hardware",
    occasion: ["Autumn/Winter","Runway","City Luxury"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.94,
    reviewsCount: 70,
    featured: false,
  },
  {
    id: "ak-leath-06",
    name: "StyleCast Blue Cotton Crop Denim Jacket",
    slug: "stylecast-blue-cotton-crop-denim-jacket-ak-leath06",
    tagline: "100% Genuine Italian Lambskin Nappa; Lining: Silk Twill · StyleCast",
    description: "Mastercrafted in Milan with 100% Genuine Italian Lambskin Nappa; Lining: Silk Twill. Double-row precision saddle stitching with antiqued brass hardware. Designed for effortless European poise and commanding luxury presence.",
    category: "leather-shearling",
    categoryName: "Leather & Shearling",
    gender: "women",
    price: 161415,
    originalPrice: 185627,
    discountPercent: 13,
    images: [
      "/images/products/stylecast-blue-cotton-crop-denim-jacket-ak-leath06_studio.webp",
      "/images/products/stylecast-blue-cotton-crop-denim-jacket-ak-leath06_model.webp",
      "/images/products/stylecast-blue-cotton-crop-denim-jacket-ak-leath06_side.webp",
    ],
    colors: [
      {
            "name": "Blue",
            "hex": "#223854",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Genuine Italian Lambskin Nappa; Lining: Silk Twill",
    embroidery: "Double-row precision saddle stitching with antiqued brass hardware",
    occasion: ["Autumn/Winter","Runway","City Luxury"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.93,
    reviewsCount: 105,
    featured: false,
  },
  {
    id: "ak-leath-07",
    name: "StyleCast Women Denim Jacket",
    slug: "stylecast-women-denim-jacket-ak-leath07",
    tagline: "100% Genuine Italian Lambskin Nappa; Lining: Silk Twill · StyleCast",
    description: "Mastercrafted in Milan with 100% Genuine Italian Lambskin Nappa; Lining: Silk Twill. Double-row precision saddle stitching with antiqued brass hardware. Designed for effortless European poise and commanding luxury presence.",
    category: "leather-shearling",
    categoryName: "Leather & Shearling",
    gender: "women",
    price: 163540,
    originalPrice: 188071,
    discountPercent: 13,
    images: [
      "/images/products/stylecast-women-denim-jacket-ak-leath07_studio.webp",
      "/images/products/stylecast-women-denim-jacket-ak-leath07_model.webp",
      "/images/products/stylecast-women-denim-jacket-ak-leath07_side.webp",
    ],
    colors: [
      {
            "name": "Blue",
            "hex": "#223854",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Genuine Italian Lambskin Nappa; Lining: Silk Twill",
    embroidery: "Double-row precision saddle stitching with antiqued brass hardware",
    occasion: ["Autumn/Winter","Runway","City Luxury"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.95,
    reviewsCount: 57,
    featured: false,
  },
  {
    id: "ak-blouse-01",
    name: "Stylum Women's Printed Striped Cotton Shirts",
    slug: "stylum-women-s-printed-striped-cotton-shirts-ak-blouse01",
    tagline: "100% Pure Mulberry Silk Georgette (22 Momme) · Stylum",
    description: "Mastercrafted in Milan with 100% Pure Mulberry Silk Georgette (22 Momme). Australian mother-of-pearl buttons and French seams. Designed for effortless European poise and commanding luxury presence.",
    category: "silk-blouses",
    categoryName: "Silk Tops & Blouses",
    gender: "women",
    price: 79220,
    originalPrice: 91103,
    discountPercent: 13,
    images: [
      "/images/products/stylum-women-s-printed-striped-cotton-shirts-ak-blouse01_studio.webp",
      "/images/products/stylum-women-s-printed-striped-cotton-shirts-ak-blouse01_model.webp",
      "/images/products/stylum-women-s-printed-striped-cotton-shirts-ak-blouse01_side.webp",
    ],
    colors: [
      {
            "name": "Blue",
            "hex": "#223854",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Pure Mulberry Silk Georgette (22 Momme)",
    embroidery: "Australian mother-of-pearl buttons and French seams",
    occasion: ["Executive","Eveningwear","Day-to-Night"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "Milan Runway",
    inStock: true,
    rating: 4.91,
    reviewsCount: 93,
    featured: true,
  },
  {
    id: "ak-blouse-02",
    name: "The Roadster Life Co. Printed Pure Cotton Relaxed Fit Shirt",
    slug: "the-roadster-life-co-printed-pure-cotton-relaxed-f-ak-blouse02",
    tagline: "100% Pure Mulberry Silk Georgette (22 Momme) · Roadster",
    description: "Mastercrafted in Milan with 100% Pure Mulberry Silk Georgette (22 Momme). Australian mother-of-pearl buttons and French seams. Designed for effortless European poise and commanding luxury presence.",
    category: "silk-blouses",
    categoryName: "Silk Tops & Blouses",
    gender: "women",
    price: 69700,
    originalPrice: 80155,
    discountPercent: 13,
    images: [
      "/images/products/the-roadster-life-co-printed-pure-cotton-relaxed-f-ak-blouse02_studio.webp",
      "/images/products/the-roadster-life-co-printed-pure-cotton-relaxed-f-ak-blouse02_model.webp",
      "/images/products/the-roadster-life-co-printed-pure-cotton-relaxed-f-ak-blouse02_side.webp",
    ],
    colors: [
      {
            "name": "Red",
            "hex": "#8B1828",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Pure Mulberry Silk Georgette (22 Momme)",
    embroidery: "Australian mother-of-pearl buttons and French seams",
    occasion: ["Executive","Eveningwear","Day-to-Night"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "Bestseller",
    inStock: true,
    rating: 4.98,
    reviewsCount: 59,
    featured: true,
  },
  {
    id: "ak-blouse-03",
    name: "STREET 9 Women Comfort Casual Shirt",
    slug: "street-9-women-comfort-casual-shirt-ak-blouse03",
    tagline: "100% Pure Mulberry Silk Georgette (22 Momme) · STREET 9",
    description: "Mastercrafted in Milan with 100% Pure Mulberry Silk Georgette (22 Momme). Australian mother-of-pearl buttons and French seams. Designed for effortless European poise and commanding luxury presence.",
    category: "silk-blouses",
    categoryName: "Silk Tops & Blouses",
    gender: "women",
    price: 45000,
    originalPrice: 51750,
    discountPercent: 13,
    images: [
      "/images/products/street-9-women-comfort-casual-shirt-ak-blouse03_studio.webp",
      "/images/products/street-9-women-comfort-casual-shirt-ak-blouse03_model.webp",
      "/images/products/street-9-women-comfort-casual-shirt-ak-blouse03_side.webp",
    ],
    colors: [
      {
            "name": "Cream",
            "hex": "#F5F2EB",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Pure Mulberry Silk Georgette (22 Momme)",
    embroidery: "Australian mother-of-pearl buttons and French seams",
    occasion: ["Executive","Eveningwear","Day-to-Night"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.96,
    reviewsCount: 93,
    featured: true,
  },
  {
    id: "ak-blouse-04",
    name: "Femibazaar Women Relaxed Casual Shirt",
    slug: "femibazaar-women-relaxed-casual-shirt-ak-blouse04",
    tagline: "100% Pure Mulberry Silk Georgette (22 Momme) · Femibazaar",
    description: "Mastercrafted in Milan with 100% Pure Mulberry Silk Georgette (22 Momme). Australian mother-of-pearl buttons and French seams. Designed for effortless European poise and commanding luxury presence.",
    category: "silk-blouses",
    categoryName: "Silk Tops & Blouses",
    gender: "women",
    price: 45000,
    originalPrice: 51750,
    discountPercent: 13,
    images: [
      "/images/products/femibazaar-women-relaxed-casual-shirt-ak-blouse04_studio.webp",
      "/images/products/femibazaar-women-relaxed-casual-shirt-ak-blouse04_model.webp",
      "/images/products/femibazaar-women-relaxed-casual-shirt-ak-blouse04_side.webp",
    ],
    colors: [
      {
            "name": "Yellow",
            "hex": "#DFBE7F",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Pure Mulberry Silk Georgette (22 Momme)",
    embroidery: "Australian mother-of-pearl buttons and French seams",
    occasion: ["Executive","Eveningwear","Day-to-Night"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.96,
    reviewsCount: 55,
    featured: false,
  },
  {
    id: "ak-blouse-05",
    name: "MULVARI Women Slim Fit Striped Casual Shirt",
    slug: "mulvari-women-slim-fit-striped-casual-shirt-ak-blouse05",
    tagline: "100% Pure Mulberry Silk Georgette (22 Momme) · MULVARI",
    description: "Mastercrafted in Milan with 100% Pure Mulberry Silk Georgette (22 Momme). Australian mother-of-pearl buttons and French seams. Designed for effortless European poise and commanding luxury presence.",
    category: "silk-blouses",
    categoryName: "Silk Tops & Blouses",
    gender: "women",
    price: 45000,
    originalPrice: 51750,
    discountPercent: 13,
    images: [
      "/images/products/mulvari-women-slim-fit-striped-casual-shirt-ak-blouse05_studio.webp",
      "/images/products/mulvari-women-slim-fit-striped-casual-shirt-ak-blouse05_model.webp",
      "/images/products/mulvari-women-slim-fit-striped-casual-shirt-ak-blouse05_side.webp",
    ],
    colors: [
      {
            "name": "Brown",
            "hex": "#4A2E1B",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Pure Mulberry Silk Georgette (22 Momme)",
    embroidery: "Australian mother-of-pearl buttons and French seams",
    occasion: ["Executive","Eveningwear","Day-to-Night"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.94,
    reviewsCount: 103,
    featured: false,
  },
  {
    id: "ak-blouse-06",
    name: "CORSICA Women Gingham Checks Sheer Checked Casual Shirt",
    slug: "corsica-women-gingham-checks-sheer-checked-casual--ak-blouse06",
    tagline: "100% Pure Mulberry Silk Georgette (22 Momme) · CORSICA",
    description: "Mastercrafted in Milan with 100% Pure Mulberry Silk Georgette (22 Momme). Australian mother-of-pearl buttons and French seams. Designed for effortless European poise and commanding luxury presence.",
    category: "silk-blouses",
    categoryName: "Silk Tops & Blouses",
    gender: "women",
    price: 56015,
    originalPrice: 64417,
    discountPercent: 13,
    images: [
      "/images/products/corsica-women-gingham-checks-sheer-checked-casual--ak-blouse06_studio.webp",
      "/images/products/corsica-women-gingham-checks-sheer-checked-casual--ak-blouse06_model.webp",
      "/images/products/corsica-women-gingham-checks-sheer-checked-casual--ak-blouse06_side.webp",
    ],
    colors: [
      {
            "name": "Multi",
            "hex": "#9A8EBA",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Pure Mulberry Silk Georgette (22 Momme)",
    embroidery: "Australian mother-of-pearl buttons and French seams",
    occasion: ["Executive","Eveningwear","Day-to-Night"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.91,
    reviewsCount: 82,
    featured: false,
  },
  {
    id: "ak-blouse-07",
    name: "SZN Women Standard Striped Casual Shirt",
    slug: "szn-women-standard-striped-casual-shirt-ak-blouse07",
    tagline: "100% Pure Mulberry Silk Georgette (22 Momme) · SZN",
    description: "Mastercrafted in Milan with 100% Pure Mulberry Silk Georgette (22 Momme). Australian mother-of-pearl buttons and French seams. Designed for effortless European poise and commanding luxury presence.",
    category: "silk-blouses",
    categoryName: "Silk Tops & Blouses",
    gender: "women",
    price: 61030,
    originalPrice: 70185,
    discountPercent: 13,
    images: [
      "/images/products/szn-women-standard-striped-casual-shirt-ak-blouse07_studio.webp",
      "/images/products/szn-women-standard-striped-casual-shirt-ak-blouse07_model.webp",
      "/images/products/szn-women-standard-striped-casual-shirt-ak-blouse07_side.webp",
    ],
    colors: [
      {
            "name": "Red",
            "hex": "#8B1828",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["IT 36","IT 38","IT 40","IT 42","IT 44"],
    fabric: "100% Pure Mulberry Silk Georgette (22 Momme)",
    embroidery: "Australian mother-of-pearl buttons and French seams",
    occasion: ["Executive","Eveningwear","Day-to-Night"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.9,
    reviewsCount: 98,
    featured: false,
  },
  {
    id: "ak-bag-01",
    name: "Mast & Harbour Unisex Structured Shoulder Bag",
    slug: "mast-harbour-unisex-structured-shoulder-bag-ak-bag01",
    tagline: "100% Genuine Tuscan Full-Grain Box Calf Leather · Mast & Harbour",
    description: "Mastercrafted in Milan with 100% Genuine Tuscan Full-Grain Box Calf Leather. Hand-painted edge finishing and 24K gold-plated custom hardware. Designed for effortless European poise and commanding luxury presence.",
    category: "luxury-accessories",
    categoryName: "Leather Goods & Bags",
    gender: "women",
    price: 69615,
    originalPrice: 80057,
    discountPercent: 13,
    images: [
      "/images/products/mast-harbour-unisex-structured-shoulder-bag-ak-bag01_studio.webp",
      "/images/products/mast-harbour-unisex-structured-shoulder-bag-ak-bag01_model.webp",
      "/images/products/mast-harbour-unisex-structured-shoulder-bag-ak-bag01_side.webp",
    ],
    colors: [
      {
            "name": "Beige",
            "hex": "#D8CEBE",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["One Size (W 28cm x H 18cm x D 9cm)"],
    fabric: "100% Genuine Tuscan Full-Grain Box Calf Leather",
    embroidery: "Hand-painted edge finishing and 24K gold-plated custom hardware",
    occasion: ["Evening","Daily Luxury","Gala"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "Milan Runway",
    inStock: true,
    rating: 4.92,
    reviewsCount: 46,
    featured: true,
  },
  {
    id: "ak-bag-02",
    name: "Marks & Spencer Canvas Leopard Print Tote Bag",
    slug: "marks-spencer-canvas-leopard-print-tote-bag-ak-bag02",
    tagline: "100% Genuine Tuscan Full-Grain Box Calf Leather · Marks & Spencer",
    description: "Mastercrafted in Milan with 100% Genuine Tuscan Full-Grain Box Calf Leather. Hand-painted edge finishing and 24K gold-plated custom hardware. Designed for effortless European poise and commanding luxury presence.",
    category: "luxury-accessories",
    categoryName: "Leather Goods & Bags",
    gender: "women",
    price: 169915,
    originalPrice: 195402,
    discountPercent: 13,
    images: [
      "/images/products/marks-spencer-canvas-leopard-print-tote-bag-ak-bag02_studio.webp",
      "/images/products/marks-spencer-canvas-leopard-print-tote-bag-ak-bag02_model.webp",
      "/images/products/marks-spencer-canvas-leopard-print-tote-bag-ak-bag02_side.webp",
    ],
    colors: [
      {
            "name": "Brown",
            "hex": "#4A2E1B",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["One Size (W 28cm x H 18cm x D 9cm)"],
    fabric: "100% Genuine Tuscan Full-Grain Box Calf Leather",
    embroidery: "Hand-painted edge finishing and 24K gold-plated custom hardware",
    occasion: ["Evening","Daily Luxury","Gala"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "Bestseller",
    inStock: true,
    rating: 4.97,
    reviewsCount: 78,
    featured: true,
  },
  {
    id: "ak-bag-03",
    name: "Mast & Harbour Oversized Zip Detail Shopper Tote Bag",
    slug: "mast-harbour-oversized-zip-detail-shopper-tote-bag-ak-bag03",
    tagline: "100% Genuine Tuscan Full-Grain Box Calf Leather · Mast & Harbour",
    description: "Mastercrafted in Milan with 100% Genuine Tuscan Full-Grain Box Calf Leather. Hand-painted edge finishing and 24K gold-plated custom hardware. Designed for effortless European poise and commanding luxury presence.",
    category: "luxury-accessories",
    categoryName: "Leather Goods & Bags",
    gender: "women",
    price: 54315,
    originalPrice: 62462,
    discountPercent: 13,
    images: [
      "/images/products/mast-harbour-oversized-zip-detail-shopper-tote-bag-ak-bag03_studio.webp",
      "/images/products/mast-harbour-oversized-zip-detail-shopper-tote-bag-ak-bag03_model.webp",
      "/images/products/mast-harbour-oversized-zip-detail-shopper-tote-bag-ak-bag03_side.webp",
    ],
    colors: [
      {
            "name": "Pink",
            "hex": "#BE7FA8",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["One Size (W 28cm x H 18cm x D 9cm)"],
    fabric: "100% Genuine Tuscan Full-Grain Box Calf Leather",
    embroidery: "Hand-painted edge finishing and 24K gold-plated custom hardware",
    occasion: ["Evening","Daily Luxury","Gala"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.97,
    reviewsCount: 67,
    featured: true,
  },
  {
    id: "ak-bag-04",
    name: "Puma Academy Portable Bag",
    slug: "puma-academy-portable-bag-ak-bag04",
    tagline: "100% Genuine Tuscan Full-Grain Box Calf Leather · Puma",
    description: "Mastercrafted in Milan with 100% Genuine Tuscan Full-Grain Box Calf Leather. Hand-painted edge finishing and 24K gold-plated custom hardware. Designed for effortless European poise and commanding luxury presence.",
    category: "luxury-accessories",
    categoryName: "Leather Goods & Bags",
    gender: "women",
    price: 45000,
    originalPrice: 51750,
    discountPercent: 13,
    images: [
      "/images/products/puma-academy-portable-bag-ak-bag04_studio.webp",
      "/images/products/puma-academy-portable-bag-ak-bag04_model.webp",
      "/images/products/puma-academy-portable-bag-ak-bag04_side.webp",
    ],
    colors: [
      {
            "name": "Black",
            "hex": "#1A1A1A",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["One Size (W 28cm x H 18cm x D 9cm)"],
    fabric: "100% Genuine Tuscan Full-Grain Box Calf Leather",
    embroidery: "Hand-painted edge finishing and 24K gold-plated custom hardware",
    occasion: ["Evening","Daily Luxury","Gala"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.99,
    reviewsCount: 101,
    featured: false,
  },
  {
    id: "ak-bag-05",
    name: "COUNSELOR PU Sling Bag",
    slug: "counselor-pu-sling-bag-ak-bag05",
    tagline: "100% Genuine Tuscan Full-Grain Box Calf Leather · COUNSELOR",
    description: "Mastercrafted in Milan with 100% Genuine Tuscan Full-Grain Box Calf Leather. Hand-painted edge finishing and 24K gold-plated custom hardware. Designed for effortless European poise and commanding luxury presence.",
    category: "luxury-accessories",
    categoryName: "Leather Goods & Bags",
    gender: "women",
    price: 92480,
    originalPrice: 106352,
    discountPercent: 13,
    images: [
      "/images/products/counselor-pu-sling-bag-ak-bag05_studio.webp",
      "/images/products/counselor-pu-sling-bag-ak-bag05_model.webp",
      "/images/products/counselor-pu-sling-bag-ak-bag05_side.webp",
    ],
    colors: [
      {
            "name": "Black",
            "hex": "#1A1A1A",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["One Size (W 28cm x H 18cm x D 9cm)"],
    fabric: "100% Genuine Tuscan Full-Grain Box Calf Leather",
    embroidery: "Hand-painted edge finishing and 24K gold-plated custom hardware",
    occasion: ["Evening","Daily Luxury","Gala"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.93,
    reviewsCount: 81,
    featured: false,
  },
  {
    id: "ak-bag-06",
    name: "Lino Perros Solid Synthetic Leather Multi Compartment Large Structured Shoulder Bag",
    slug: "lino-perros-solid-synthetic-leather-multi-compartm-ak-bag06",
    tagline: "100% Genuine Tuscan Full-Grain Box Calf Leather · Lino Perros",
    description: "Mastercrafted in Milan with 100% Genuine Tuscan Full-Grain Box Calf Leather. Hand-painted edge finishing and 24K gold-plated custom hardware. Designed for effortless European poise and commanding luxury presence.",
    category: "luxury-accessories",
    categoryName: "Leather Goods & Bags",
    gender: "women",
    price: 168045,
    originalPrice: 193252,
    discountPercent: 13,
    images: [
      "/images/products/lino-perros-solid-synthetic-leather-multi-compartm-ak-bag06_studio.webp",
      "/images/products/lino-perros-solid-synthetic-leather-multi-compartm-ak-bag06_model.webp",
      "/images/products/lino-perros-solid-synthetic-leather-multi-compartm-ak-bag06_side.webp",
    ],
    colors: [
      {
            "name": "Coffee Brown",
            "hex": "#4A2E1B",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["One Size (W 28cm x H 18cm x D 9cm)"],
    fabric: "100% Genuine Tuscan Full-Grain Box Calf Leather",
    embroidery: "Hand-painted edge finishing and 24K gold-plated custom hardware",
    occasion: ["Evening","Daily Luxury","Gala"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.99,
    reviewsCount: 103,
    featured: false,
  },
  {
    id: "ak-bag-07",
    name: "Cara Textured PU Shoulder Bag",
    slug: "cara-textured-pu-shoulder-bag-ak-bag07",
    tagline: "100% Genuine Tuscan Full-Grain Box Calf Leather · Cara",
    description: "Mastercrafted in Milan with 100% Genuine Tuscan Full-Grain Box Calf Leather. Hand-painted edge finishing and 24K gold-plated custom hardware. Designed for effortless European poise and commanding luxury presence.",
    category: "luxury-accessories",
    categoryName: "Leather Goods & Bags",
    gender: "women",
    price: 84915,
    originalPrice: 97652,
    discountPercent: 13,
    images: [
      "/images/products/cara-textured-pu-shoulder-bag-ak-bag07_studio.webp",
      "/images/products/cara-textured-pu-shoulder-bag-ak-bag07_model.webp",
      "/images/products/cara-textured-pu-shoulder-bag-ak-bag07_side.webp",
    ],
    colors: [
      {
            "name": "Coffee Brown",
            "hex": "#4A2E1B",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["One Size (W 28cm x H 18cm x D 9cm)"],
    fabric: "100% Genuine Tuscan Full-Grain Box Calf Leather",
    embroidery: "Hand-painted edge finishing and 24K gold-plated custom hardware",
    occasion: ["Evening","Daily Luxury","Gala"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.98,
    reviewsCount: 68,
    featured: false,
  },
  {
    id: "ak-men-01",
    name: "Mast & Harbour Notched Collar Single Breasted Blazer",
    slug: "mast-harbour-notched-collar-single-breasted-blazer-ak-men01",
    tagline: "100% Super 130s Merino Wool with Pure Silk Grosgrain · Mast & Harbour",
    description: "Mastercrafted in Milan with 100% Super 130s Merino Wool with Pure Silk Grosgrain. Hand-sewn milanese buttonholes and silk covered buttons. Designed for effortless European poise and commanding luxury presence.",
    category: "bespoke-suiting",
    categoryName: "Bespoke Suiting",
    gender: "men",
    price: 203915,
    originalPrice: 234502,
    discountPercent: 13,
    images: [
      "/images/products/mast-harbour-notched-collar-single-breasted-blazer-ak-men01_studio.webp",
      "/images/products/mast-harbour-notched-collar-single-breasted-blazer-ak-men01_model.webp",
      "/images/products/mast-harbour-notched-collar-single-breasted-blazer-ak-men01_side.webp",
    ],
    colors: [
      {
            "name": "Brown",
            "hex": "#4A2E1B",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["46 (S)","48 (M)","50 (L)","52 (XL)","54 (XXL)"],
    fabric: "100% Super 130s Merino Wool with Pure Silk Grosgrain",
    embroidery: "Hand-sewn milanese buttonholes and silk covered buttons",
    occasion: ["Black Tie","Opera","Gala"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "Milan Runway",
    inStock: true,
    rating: 4.91,
    reviewsCount: 53,
    featured: true,
  },
  {
    id: "ak-men-02",
    name: "INVICTUS Striped Regular Fit Notched Lapel Collar Single Breasted Formal Blazer",
    slug: "invictus-striped-regular-fit-notched-lapel-collar--ak-men02",
    tagline: "100% Super 130s Merino Wool with Pure Silk Grosgrain · INVICTUS",
    description: "Mastercrafted in Milan with 100% Super 130s Merino Wool with Pure Silk Grosgrain. Hand-sewn milanese buttonholes and silk covered buttons. Designed for effortless European poise and commanding luxury presence.",
    category: "bespoke-suiting",
    categoryName: "Bespoke Suiting",
    gender: "men",
    price: 298265,
    originalPrice: 343005,
    discountPercent: 13,
    images: [
      "/images/products/invictus-striped-regular-fit-notched-lapel-collar--ak-men02_studio.webp",
      "/images/products/invictus-striped-regular-fit-notched-lapel-collar--ak-men02_model.webp",
      "/images/products/invictus-striped-regular-fit-notched-lapel-collar--ak-men02_side.webp",
    ],
    colors: [
      {
            "name": "Navy Blue",
            "hex": "#0E1424",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["46 (S)","48 (M)","50 (L)","52 (XL)","54 (XXL)"],
    fabric: "100% Super 130s Merino Wool with Pure Silk Grosgrain",
    embroidery: "Hand-sewn milanese buttonholes and silk covered buttons",
    occasion: ["Black Tie","Opera","Gala"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "Bestseller",
    inStock: true,
    rating: 4.96,
    reviewsCount: 109,
    featured: true,
  },
  {
    id: "ak-men-03",
    name: "INVICTUS Striped Notched Lapel Single-Breasted Blazers",
    slug: "invictus-striped-notched-lapel-single-breasted-bla-ak-men03",
    tagline: "100% Super 130s Merino Wool with Pure Silk Grosgrain · INVICTUS",
    description: "Mastercrafted in Milan with 100% Super 130s Merino Wool with Pure Silk Grosgrain. Hand-sewn milanese buttonholes and silk covered buttons. Designed for effortless European poise and commanding luxury presence.",
    category: "bespoke-suiting",
    categoryName: "Bespoke Suiting",
    gender: "men",
    price: 299115,
    originalPrice: 343982,
    discountPercent: 13,
    images: [
      "/images/products/invictus-striped-notched-lapel-single-breasted-bla-ak-men03_studio.webp",
      "/images/products/invictus-striped-notched-lapel-single-breasted-bla-ak-men03_model.webp",
      "/images/products/invictus-striped-notched-lapel-single-breasted-bla-ak-men03_side.webp",
    ],
    colors: [
      {
            "name": "Brown",
            "hex": "#4A2E1B",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["46 (S)","48 (M)","50 (L)","52 (XL)","54 (XXL)"],
    fabric: "100% Super 130s Merino Wool with Pure Silk Grosgrain",
    embroidery: "Hand-sewn milanese buttonholes and silk covered buttons",
    occasion: ["Black Tie","Opera","Gala"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.96,
    reviewsCount: 80,
    featured: true,
  },
  {
    id: "ak-men-04",
    name: "Mast & Harbour Notched Lapel Collar Single-Breasted Casual Blazer",
    slug: "mast-harbour-notched-lapel-collar-single-breasted--ak-men04",
    tagline: "100% Super 130s Merino Wool with Pure Silk Grosgrain · Mast & Harbour",
    description: "Mastercrafted in Milan with 100% Super 130s Merino Wool with Pure Silk Grosgrain. Hand-sewn milanese buttonholes and silk covered buttons. Designed for effortless European poise and commanding luxury presence.",
    category: "bespoke-suiting",
    categoryName: "Bespoke Suiting",
    gender: "men",
    price: 258315,
    originalPrice: 297062,
    discountPercent: 13,
    images: [
      "/images/products/mast-harbour-notched-lapel-collar-single-breasted--ak-men04_studio.webp",
      "/images/products/mast-harbour-notched-lapel-collar-single-breasted--ak-men04_model.webp",
      "/images/products/mast-harbour-notched-lapel-collar-single-breasted--ak-men04_side.webp",
    ],
    colors: [
      {
            "name": "Black",
            "hex": "#1A1A1A",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["46 (S)","48 (M)","50 (L)","52 (XL)","54 (XXL)"],
    fabric: "100% Super 130s Merino Wool with Pure Silk Grosgrain",
    embroidery: "Hand-sewn milanese buttonholes and silk covered buttons",
    occasion: ["Black Tie","Opera","Gala"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.97,
    reviewsCount: 76,
    featured: false,
  },
  {
    id: "ak-men-05",
    name: "Integration Shawl Collar Fully Lined Ultra Slim-Fit Party Blazer",
    slug: "integration-shawl-collar-fully-lined-ultra-slim-fi-ak-men05",
    tagline: "100% Super 130s Merino Wool with Pure Silk Grosgrain · Integration",
    description: "Mastercrafted in Milan with 100% Super 130s Merino Wool with Pure Silk Grosgrain. Hand-sewn milanese buttonholes and silk covered buttons. Designed for effortless European poise and commanding luxury presence.",
    category: "bespoke-suiting",
    categoryName: "Bespoke Suiting",
    gender: "men",
    price: 243015,
    originalPrice: 279467,
    discountPercent: 13,
    images: [
      "/images/products/integration-shawl-collar-fully-lined-ultra-slim-fi-ak-men05_studio.webp",
      "/images/products/integration-shawl-collar-fully-lined-ultra-slim-fi-ak-men05_model.webp",
      "/images/products/integration-shawl-collar-fully-lined-ultra-slim-fi-ak-men05_side.webp",
    ],
    colors: [
      {
            "name": "Black",
            "hex": "#1A1A1A",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["46 (S)","48 (M)","50 (L)","52 (XL)","54 (XXL)"],
    fabric: "100% Super 130s Merino Wool with Pure Silk Grosgrain",
    embroidery: "Hand-sewn milanese buttonholes and silk covered buttons",
    occasion: ["Black Tie","Opera","Gala"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.97,
    reviewsCount: 71,
    featured: false,
  },
  {
    id: "ak-men-06",
    name: "INVICTUS Striped Notched Lapel Single-Breasted Blazers",
    slug: "invictus-striped-notched-lapel-single-breasted-bla-ak-men06",
    tagline: "100% Super 130s Merino Wool with Pure Silk Grosgrain · INVICTUS",
    description: "Mastercrafted in Milan with 100% Super 130s Merino Wool with Pure Silk Grosgrain. Hand-sewn milanese buttonholes and silk covered buttons. Designed for effortless European poise and commanding luxury presence.",
    category: "bespoke-suiting",
    categoryName: "Bespoke Suiting",
    gender: "men",
    price: 299115,
    originalPrice: 343982,
    discountPercent: 13,
    images: [
      "/images/products/invictus-striped-notched-lapel-single-breasted-bla-ak-men06_studio.webp",
      "/images/products/invictus-striped-notched-lapel-single-breasted-bla-ak-men06_model.webp",
      "/images/products/invictus-striped-notched-lapel-single-breasted-bla-ak-men06_side.webp",
    ],
    colors: [
      {
            "name": "Grey",
            "hex": "#4A4C52",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["46 (S)","48 (M)","50 (L)","52 (XL)","54 (XXL)"],
    fabric: "100% Super 130s Merino Wool with Pure Silk Grosgrain",
    embroidery: "Hand-sewn milanese buttonholes and silk covered buttons",
    occasion: ["Black Tie","Opera","Gala"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.92,
    reviewsCount: 103,
    featured: false,
  },
  {
    id: "ak-men-07",
    name: "Arrow Notched Lapel Long Sleeves Slim-Fit Single Breasted Blazer",
    slug: "arrow-notched-lapel-long-sleeves-slim-fit-single-b-ak-men07",
    tagline: "100% Super 130s Merino Wool with Pure Silk Grosgrain · Arrow",
    description: "Mastercrafted in Milan with 100% Super 130s Merino Wool with Pure Silk Grosgrain. Hand-sewn milanese buttonholes and silk covered buttons. Designed for effortless European poise and commanding luxury presence.",
    category: "bespoke-suiting",
    categoryName: "Bespoke Suiting",
    gender: "men",
    price: 441915,
    originalPrice: 508202,
    discountPercent: 13,
    images: [
      "/images/products/arrow-notched-lapel-long-sleeves-slim-fit-single-b-ak-men07_studio.webp",
      "/images/products/arrow-notched-lapel-long-sleeves-slim-fit-single-b-ak-men07_model.webp",
      "/images/products/arrow-notched-lapel-long-sleeves-slim-fit-single-b-ak-men07_side.webp",
    ],
    colors: [
      {
            "name": "Black",
            "hex": "#1A1A1A",
            "imageIndex": 0
      },
      {
            "name": "Model Editorial",
            "hex": "#BE7FA8",
            "imageIndex": 1
      },
      {
            "name": "Detail Silhouette",
            "hex": "#B5A9D1",
            "imageIndex": 2
      }
],
    sizes: ["46 (S)","48 (M)","50 (L)","52 (XL)","54 (XXL)"],
    fabric: "100% Super 130s Merino Wool with Pure Silk Grosgrain",
    embroidery: "Hand-sewn milanese buttonholes and silk covered buttons",
    occasion: ["Black Tie","Opera","Gala"],
    craftsmanshipStory: "Hand-finished in our Milanese flagship atelier by master European tailors. Built to withstand generations of wear while preserving pristine structural drape.",
    careInstructions: [
      "Specialist Couture Dry Clean Only",
      "Store on contoured cedarwood hanger",
      "Steam lightly on reverse"
],
    deliveryDays: 3,
    has3D: true,
    badge: "New Season",
    inStock: true,
    rating: 4.91,
    reviewsCount: 63,
    featured: false,
  },
];

/**
 * ============================================================================
 * UNIFIED MASTER PRODUCT CATALOG
 * ============================================================================
 * Consolidates all genuine Product instances across every section:
 * Master catalog, Gala collections, Autumn-Winter 2026, Change Your Look,
 * Edits for Every Occasion, Seasonal specials, and Trending ensembles.
 * ============================================================================
 */
const DEDUPED_CATALOG: Product[] = [
  ...BASE_PRODUCTS,
  ...BRIDAL_PRODUCTS,
  ...AUTUMN_WINTER_DATA.products,
  ...CHANGE_LOOK_PRODUCTS,
  ...EDITS_FOR_OCCASION_DATA.products,
  ...SEASONAL_PRODUCTS,
  ...TREND_PRODUCTS,
  ...ATTENTION_PRODUCTS,
  ...LATEST_TRENDS_PRODUCTS,
  ...CINEMATIC_STORIES,
  ...ROYAL_CLIENT_DIARIES.map((d) => d.ensemble),
  ...NEW_ARRIVALS_PRODUCTS,
  ...BEST_SELLERS_PRODUCTS,
].filter((p, index, self) => index === self.findIndex((item) => item.id === p.id));

export const ALL_PRODUCTS: Product[] = DEDUPED_CATALOG;
export const PRODUCTS: Product[] = ALL_PRODUCTS;

/**
 * Robust product lookup supporting case-insensitive lookup by canonical ID or slug
 */
export function getProductByIdOrSlug(idOrSlug: string): Product | undefined {
  if (!idOrSlug) return undefined;
  const normalized = idOrSlug.trim().toLowerCase();
  return ALL_PRODUCTS.find(
    (p) =>
      p.id.toLowerCase() === normalized ||
      (p.slug && p.slug.toLowerCase() === normalized)
  );
}

export const PROMO_CODES = [
  {
    code: 'MILANO10',
    discountType: 'percentage' as const,
    discountValue: 10,
    minOrderValue: 50000,
    description: '10% Milan Atelier Welcome courtesy for orders above ₹50,000',
  },
  {
    code: 'AKATELIER15',
    discountType: 'percentage' as const,
    discountValue: 15,
    minOrderValue: 150000,
    description: '15% Haute Couture Privilege courtesy for orders above ₹1,50,000',
  },
  {
    code: 'BESPOKE2026',
    discountType: 'fixed' as const,
    discountValue: 25000,
    minOrderValue: 200000,
    description: '₹25,000 Couture Privilege courtesy for bespoke ensembles above ₹2,00,000',
  },
];

export const FORMAT_CURRENCY = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};
