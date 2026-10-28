export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  name: string;
  href: string;
  icon: 'instagram' | 'pinterest' | 'facebook' | 'twitter' | 'youtube';
}

export interface FooterData {
  brand: {
    name: string;
    tagline: string;
    scriptTag: string;
    monogram: string;
    description?: string;
  };
  columns: {
    shop: FooterColumn;
    explore: FooterColumn;
    support: FooterColumn;
  };
  newsletter: {
    eyebrow?: string;
    title: string;
    description: string;
    placeholder: string;
    buttonText: string;
    successMessage: string;
  };
  heroImage: {
    src: string;
    alt: string;
  };
  legalLinks: FooterLink[];
  socialLinks: FooterSocialLink[];
  copyright: string;
}

export const FOOTER_DATA: FooterData = {
  brand: {
    name: 'AK ATELIER',
    tagline: 'Haute Couture & Western Tailoring · Milan & Paris',
    scriptTag: 'Sculpted for commanding presence.',
    monogram: 'AK',
    description: 'Preserving master bespoke tailoring, Super 150s virgin wool, and double-faced cashmere across Milan and Florence.',
  },
  columns: {
    shop: {
      id: 'shop',
      title: 'Shop',
      links: [
        { label: 'New arrivals', href: '/collections/all' },
        { label: 'Tailored suiting', href: '/collections/tailored-suiting' },
        { label: 'Coats & trench', href: '/collections/coats-outerwear' },
        { label: 'Eveningwear & gowns', href: '/collections/evening-dresses' },
      ],
    },
    explore: {
      id: 'explore',
      title: 'Explore',
      links: [
        { label: 'Our story', href: '/our-story' },
        { label: 'Craftsmanship', href: '/our-craft' },
        { label: 'Lookbook', href: '/collections/all' },
        { label: 'Milan Flagship', href: '/stores' },
      ],
    },
    support: {
      id: 'support',
      title: 'Support',
      links: [
        { label: 'Contact us', href: '/contact' },
        { label: 'Shipping & delivery', href: '/shipping' },
        { label: 'Returns & exchanges', href: '/returns' },
        { label: 'FAQs', href: '/faqs' },
      ],
    },
  },
  newsletter: {
    eyebrow: 'Private Salon Registry',
    title: 'Stay updated',
    description: 'Subscribe for private runway previews, bespoke salon appointments, and limited couture drops.',
    placeholder: 'Your email address',
    buttonText: 'Subscribe',
    successMessage: 'Thank you for subscribing to AK ATELIER Milano. Welcome to our private couture registry.',
  },
  heroImage: {
    src: '/hero-poster.webp',
    alt: 'AK ATELIER Milan flagship showroom with tailored suits and cashmere overcoats',
  },
  legalLinks: [
    { label: 'Terms & Conditions', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
  ],
  socialLinks: [
    { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
    { name: 'Pinterest', href: 'https://pinterest.com', icon: 'pinterest' },
    { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
    { name: 'X', href: 'https://x.com', icon: 'twitter' },
    { name: 'YouTube', href: 'https://youtube.com', icon: 'youtube' },
  ],
  copyright: '© 2026 AK ATELIER. All rights reserved.',
};
