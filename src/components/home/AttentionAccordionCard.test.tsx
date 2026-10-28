import React from 'react';
import { AttentionAccordionCard } from './AttentionAccordionCard';
import { WORTH_YOUR_ATTENTION_DATA } from '@/data/worthYourAttention';

describe('AttentionAccordionCard', () => {
  it('is defined and is a valid React component', () => {
    expect(AttentionAccordionCard).toBeDefined();
    expect(typeof AttentionAccordionCard).toBe('function');
  });

  it('validates attention product structure', () => {
    expect(WORTH_YOUR_ATTENTION_DATA.products.length).toBeGreaterThan(0);
    const product = WORTH_YOUR_ATTENTION_DATA.products[0];
    expect(product.id).toBeTruthy();
    expect(product.name).toBeTruthy();
    expect(product.attentionHeadline).toBeTruthy();
    expect(product.verticalText).toBeTruthy();
    expect(product.spotlightTag).toBeTruthy();
    expect(product.actionHref).toBeTruthy();
  });
});
