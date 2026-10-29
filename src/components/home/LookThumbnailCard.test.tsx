import React from 'react';
import { LookThumbnailCard } from './LookThumbnailCard';
import { CHANGE_LOOK_PRODUCTS } from '@/data/changeLook';

describe('LookThumbnailCard', () => {
  it('is defined and is a valid React component', () => {
    expect(LookThumbnailCard).toBeDefined();
    expect(typeof LookThumbnailCard).toBe('function');
  });

  it('validates change look products data structure', () => {
    expect(CHANGE_LOOK_PRODUCTS.length).toBeGreaterThan(0);
    const item = CHANGE_LOOK_PRODUCTS[0];
    expect(item.id).toBeTruthy();
    expect(item.name).toBeTruthy();
    expect(item.thumbnail).toBeTruthy();
  });
});
