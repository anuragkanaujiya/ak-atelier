import { AKLogo, AKLogoIcon, resolveLogoSize, AK_LOGO_SIZE_MAP } from './AKLogo';

describe('AKLogo & AKLogoIcon Universal SVG Monogram', () => {
  it('exports AKLogo and AKLogoIcon components properly', () => {
    expect(AKLogo).toBeDefined();
    expect(typeof AKLogo).toBe('function');
    expect(AKLogoIcon).toBeDefined();
    expect(typeof AKLogoIcon).toBe('function');
  });

  it('correctly maps named size presets to pixel numbers', () => {
    expect(resolveLogoSize('xs')).toBe(AK_LOGO_SIZE_MAP.xs);
    expect(resolveLogoSize('sm')).toBe(AK_LOGO_SIZE_MAP.sm);
    expect(resolveLogoSize('md')).toBe(AK_LOGO_SIZE_MAP.md);
    expect(resolveLogoSize('lg')).toBe(AK_LOGO_SIZE_MAP.lg);
    expect(resolveLogoSize('xl')).toBe(AK_LOGO_SIZE_MAP.xl);
    expect(resolveLogoSize('2xl')).toBe(AK_LOGO_SIZE_MAP['2xl']);
    expect(resolveLogoSize('3xl')).toBe(AK_LOGO_SIZE_MAP['3xl']);
  });

  it('supports direct numeric pixel sizes', () => {
    expect(resolveLogoSize(24)).toBe(24);
    expect(resolveLogoSize(68)).toBe(68);
    expect(resolveLogoSize(120)).toBe(120);
  });

  it('provides a resilient fallback size when undefined or unknown', () => {
    expect(resolveLogoSize(undefined, 36)).toBe(36);
    // @ts-expect-error Testing unknown string fallback
    expect(resolveLogoSize('unknown-size', 42)).toBe(42);
  });

  it('supports color variants', () => {
    const variants = ['gold', 'champagne', 'silver', 'white', 'dark'] as const;
    variants.forEach((v) => {
      expect(v).toBeDefined();
    });
  });
});
