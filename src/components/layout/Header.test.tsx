import { Header } from './Header';

describe('Header Component Integrity', () => {
  it('exports Header component properly', () => {
    expect(Header).toBeDefined();
    expect(typeof Header).toBe('function');
  });
});
