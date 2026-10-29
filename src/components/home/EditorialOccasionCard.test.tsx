import React from 'react';
import { EditorialOccasionCard } from './EditorialOccasionCard';
import { EDITS_FOR_OCCASION_DATA } from '@/data/editsForOccasion';

describe('EditorialOccasionCard', () => {
  it('is defined and is a valid React component', () => {
    expect(EditorialOccasionCard).toBeDefined();
    expect(typeof EditorialOccasionCard).toBe('function');
  });

  it('validates occasion edit product data structure', () => {
    expect(EDITS_FOR_OCCASION_DATA.products.length).toBeGreaterThan(0);
    const item = EDITS_FOR_OCCASION_DATA.products[0];
    expect(item.id).toBeTruthy();
    expect(item.name).toBeTruthy();
    expect(item.occasionTag).toBeTruthy();
    expect(item.occasionTitle).toBeTruthy();
    expect(item.actionText).toBeTruthy();
    expect(item.actionHref).toBeTruthy();
    expect(item.image).toBeTruthy();
  });
});
