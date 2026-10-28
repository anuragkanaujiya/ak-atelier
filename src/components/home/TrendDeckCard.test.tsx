import React from 'react';
import { TrendDeckCard } from './TrendDeckCard';
import { LATEST_TRENDS_DATA } from '@/data/latestTrends';

describe('TrendDeckCard', () => {
  it('is defined and is a valid React component', () => {
    expect(TrendDeckCard).toBeDefined();
    expect(typeof TrendDeckCard).toBe('function');
  });

  it('validates trend deck product data structure', () => {
    expect(LATEST_TRENDS_DATA.products.length).toBeGreaterThan(0);
    const item = LATEST_TRENDS_DATA.products[0];
    expect(item.id).toBeTruthy();
    expect(item.name).toBeTruthy();
    expect(typeof item.price).toBe('number');
    expect(item.formattedPrice).toBeTruthy();
    expect(item.rangeCategory).toBeTruthy();
    expect(item.badge).toBeTruthy();
    expect(item.actionHref).toBeTruthy();
    expect(item.images.length).toBeGreaterThan(0);
  });
});
