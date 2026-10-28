import { getAllSectionImageUrls, preloadAndDecodeImage, SectionImagePreloader } from './SectionImagePreloader';

describe('SectionImagePreloader', () => {
  it('exports SectionImagePreloader component properly', () => {
    expect(SectionImagePreloader).toBeDefined();
    expect(typeof SectionImagePreloader).toBe('function');
  });

  it('aggregates unique image URLs from section data', () => {
    const urls = getAllSectionImageUrls();
    expect(urls).toBeDefined();
    expect(Array.isArray(urls)).toBe(true);
    expect(urls.length).toBeGreaterThan(0);

    // Verify all URLs are valid strings
    urls.forEach((url) => {
      expect(typeof url).toBe('string');
      expect(url.length).toBeGreaterThan(0);
      expect(url.startsWith('/') || url.startsWith('http')).toBe(true);
    });

    // Verify all URLs are unique (no duplicates)
    const uniqueUrls = Array.from(new Set(urls));
    expect(urls.length).toBe(uniqueUrls.length);
  });

  it('handles preloadAndDecodeImage safely when url is empty or window is undefined', async () => {
    await expect(preloadAndDecodeImage('')).resolves.toBeUndefined();
  });
});
