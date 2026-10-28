import React from 'react';
import ContactPage from './page';

describe('ContactPage Component', () => {
  it('is defined and is a valid functional component', () => {
    expect(ContactPage).toBeDefined();
    expect(typeof ContactPage).toBe('function');
  });
});
