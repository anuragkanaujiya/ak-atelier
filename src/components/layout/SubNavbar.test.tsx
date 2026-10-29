import { SubNavbar } from './SubNavbar';
import { SUB_NAV_ITEMS } from '@/data/navigation';

describe('SubNavbar Component & Navigation Integrity', () => {
  it('exports SubNavbar component properly', () => {
    expect(SubNavbar).toBeDefined();
    expect(typeof SubNavbar).toBe('function');
  });

  describe('SUB_NAV_ITEMS Data Configuration', () => {
    it('contains valid curated sub-navigation categories', () => {
      expect(Array.isArray(SUB_NAV_ITEMS)).toBe(true);
      expect(SUB_NAV_ITEMS.length).toBeGreaterThan(0);
    });

    it('ensures each sub-nav item has unique id, non-empty label, and valid href', () => {
      const ids = new Set<string>();
      SUB_NAV_ITEMS.forEach((item) => {
        expect(item.id).toBeTruthy();
        expect(ids.has(item.id)).toBe(false);
        ids.add(item.id);

        expect(item.label).toBeTruthy();
        expect(item.label.trim().length).toBeGreaterThan(0);

        expect(item.href).toBeTruthy();
        expect(item.href.startsWith('/')).toBe(true);
      });
    });
  });
});
