import React from 'react';
import { ArchedCard } from './ArchedCard';
import { AUTUMN_WINTER_DATA } from '@/data/autumnWinter';

describe('ArchedCard', () => {
  it('is defined and is a valid React component', () => {
    expect(ArchedCard).toBeDefined();
    expect(typeof ArchedCard).toBe('function');
  });

  it('validates autumn winter campaign data structure', () => {
    expect(AUTUMN_WINTER_DATA.campaigns.length).toBeGreaterThan(0);
    const item = AUTUMN_WINTER_DATA.campaigns[0];
    expect(item.id).toBeTruthy();
    expect(item.title).toBeTruthy();
    expect(item.tag).toBeTruthy();
    expect(item.image).toBeTruthy();
    expect(item.href).toBeTruthy();
  });
});
