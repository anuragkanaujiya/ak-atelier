import React from 'react';
import { BridalCard } from './BridalCard';
import { BRIDAL_ENSEMBLES } from '@/data/bridal';

describe('BridalCard', () => {
  it('is defined and is a valid React component', () => {
    expect(BridalCard).toBeDefined();
    expect(typeof BridalCard).toBe('function');
  });

  it('validates bridal ensemble data structure', () => {
    expect(BRIDAL_ENSEMBLES.length).toBeGreaterThan(0);
    const item = BRIDAL_ENSEMBLES[0];
    expect(item.id).toBeTruthy();
    expect(item.name).toBeTruthy();
    expect(typeof item.price).toBe('number');
    expect(item.formattedPrice).toBeTruthy();
    expect(item.image).toBeTruthy();
    expect(item.href).toBeTruthy();
  });
});
