import { MegaMenu } from './MegaMenu';
import { MEGA_MENU_CONFIG } from '@/data/navigation';

describe('MegaMenu Component & Simplified Modal Integrity', () => {
  it('exports MegaMenu properly', () => {
    expect(MegaMenu).toBeDefined();
    expect(typeof MegaMenu).toBe('function');
  });

  describe('MEGA_MENU_CONFIG tab configurations', () => {
    it('contains clean configs for all luxury categories', () => {
      const keys: Array<'women' | 'men' | 'wedding' | 'craft'> = [
        'women',
        'men',
        'wedding',
        'craft',
      ];
      keys.forEach((key) => {
        const config = MEGA_MENU_CONFIG[key];
        expect(config).toBeDefined();
        expect(Array.isArray(config.silhouettes)).toBe(true);
        expect(Array.isArray(config.fabrics)).toBe(true);
        expect(Array.isArray(config.occasions)).toBe(true);
      });
    });
  });
});
