import { ProductDetailView } from './ProductDetailView';
import { PRODUCTS } from '@/data/products';

const sampleProduct = PRODUCTS[0];

describe('ProductDetailView Component', () => {
  it('is defined and is a valid React component function', () => {
    expect(ProductDetailView).toBeDefined();
    expect(typeof ProductDetailView).toBe('function');
  });

  it('accepts product adhering to unified Product architecture', () => {
    expect(sampleProduct).toBeDefined();
    expect(typeof sampleProduct.id).toBe('string');
    expect(typeof sampleProduct.price).toBe('number');
    expect(Array.isArray(sampleProduct.images)).toBe(true);
    expect(Array.isArray(sampleProduct.colors)).toBe(true);
    expect(Array.isArray(sampleProduct.sizes)).toBe(true);
  });
});
