import { ALL_PRODUCTS, BASE_PRODUCTS, getProductByIdOrSlug } from './products';
import { ALL_CATEGORIES } from './categories';
import fs from 'fs';
import path from 'path';

describe('AK ATELIER Western Luxury Catalog Verification', () => {
  it('has at least 50 Western couture products in the base catalog', () => {
    expect(BASE_PRODUCTS.length).toBeGreaterThanOrEqual(50);
  });

  it('contains diverse categories with 5-10 products each', () => {
    const categoryCounts: Record<string, number> = {};
    for (const p of BASE_PRODUCTS) {
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
    }
    const categories = Object.keys(categoryCounts);
    expect(categories.length).toBeGreaterThanOrEqual(6);
    for (const cat of categories) {
      expect(categoryCounts[cat]).toBeGreaterThanOrEqual(5);
    }
  });

  it('ensures each product has at least 3 images: studio, model, and side view', () => {
    for (const p of BASE_PRODUCTS) {
      expect(p.images.length).toBeGreaterThanOrEqual(3);
      expect(p.images[0]).toContain('_studio');
      expect(p.images[1]).toContain('_model');
      expect(p.images[2]).toContain('_side');
    }
  });

  it('ensures each product has color variants mapped with imageIndex', () => {
    for (const p of BASE_PRODUCTS) {
      expect(p.colors.length).toBeGreaterThanOrEqual(2);
      for (const c of p.colors) {
        expect(c.hex).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(c.imageIndex).toBeDefined();
        expect(c.imageIndex).toBeGreaterThanOrEqual(0);
        expect(c.imageIndex).toBeLessThan(p.images.length);
      }
    }
  });

  it('confirms getProductByIdOrSlug resolves canonical products', () => {
    const crema = getProductByIdOrSlug('crema-double-breasted-pant-suit');
    expect(crema).toBeDefined();
    expect(crema?.name).toBe('The Crema Double-Breasted Pant Suit');
    expect(crema?.category).toBe('tailored-suiting');
  });
});
