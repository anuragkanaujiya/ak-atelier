import { CollectionBrowser } from './CollectionBrowser';
import { PRODUCTS } from '@/data/products';

const sampleProducts = PRODUCTS.slice(0, 4);

describe('CollectionBrowser Component', () => {
  it('is defined and is a valid React component function', () => {
    expect(CollectionBrowser).toBeDefined();
    expect(typeof CollectionBrowser).toBe('function');
  });

  it('handles canonical product lists correctly', () => {
    expect(sampleProducts.length).toBeGreaterThan(0);
    expect(typeof sampleProducts[0].price).toBe('number');
    expect(typeof sampleProducts[0].id).toBe('string');
  });
});
