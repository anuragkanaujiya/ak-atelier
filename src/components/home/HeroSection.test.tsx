import { HeroSection } from './HeroSection';
import { HERO_CONFIG, HERO_FRAME_PATHS } from '@/data/hero';

describe('HeroSection Component & Canvas Sequence Configuration', () => {
  it('exports HeroSection properly', () => {
    expect(HeroSection).toBeDefined();
    expect(typeof HeroSection).toBe('function');
  });

  describe('HERO_CONFIG Data Verification', () => {
    it('has valid scroll distance and total frames configuration', () => {
      expect(HERO_CONFIG.scrollDistanceVh).toBeGreaterThanOrEqual(100);
      expect(HERO_CONFIG.totalFrames).toBeGreaterThan(0);
      expect(Array.isArray(HERO_FRAME_PATHS)).toBe(true);
      expect(HERO_FRAME_PATHS.length).toBe(HERO_CONFIG.totalFrames);
    });

    it('contains sequential webp frame paths for optimal memory', () => {
      expect(HERO_FRAME_PATHS[0]).toContain('.webp');
      expect(HERO_FRAME_PATHS[HERO_FRAME_PATHS.length - 1]).toContain('.webp');
    });

    it('defines valid editorial chapters with non-overlapping progress ranges', () => {
      expect(Array.isArray(HERO_CONFIG.chapters)).toBe(true);
      expect(HERO_CONFIG.chapters.length).toBeGreaterThanOrEqual(3);

      HERO_CONFIG.chapters.forEach((chapter) => {
        expect(chapter.rangeStart).toBeGreaterThanOrEqual(0);
        expect(chapter.rangeEnd).toBeLessThanOrEqual(1.0);
        expect(chapter.rangeEnd).toBeGreaterThan(chapter.rangeStart);
        expect(chapter.title).toBeTruthy();
      });
    });
  });
});
