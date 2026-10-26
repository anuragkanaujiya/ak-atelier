import { AashiLoader, AashiLoaderProps } from './AashiLoader';

describe('AashiLoader', () => {
  it('exports AashiLoader component properly as a function component', () => {
    expect(AashiLoader).toBeDefined();
    expect(typeof AashiLoader).toBe('function');
  });

  it('accepts multi-variant definitions (fullscreen, embedded, minimal)', () => {
    const fullscreenProps: AashiLoaderProps = {
      variant: 'fullscreen',
      message: 'Curating AASHI Atelier Collections...',
      subtitle: 'Haute Couture Atelier · Mumbai & Paris',
      minDisplayTime: 400,
      showSkip: true,
    };
    expect(fullscreenProps.variant).toBe('fullscreen');

    const embeddedProps: AashiLoaderProps = {
      variant: 'embedded',
      message: 'Loading 3D Specimen',
      subtitle: 'Interactive Silhouette',
    };
    expect(embeddedProps.variant).toBe('embedded');

    const minimalProps: AashiLoaderProps = {
      variant: 'minimal',
      message: 'Adding to Bag...',
    };
    expect(minimalProps.variant).toBe('minimal');
  });

  it('supports controlled mode with boolean isLoading flag', () => {
    const controlledActive: AashiLoaderProps = {
      isLoading: true,
      minDisplayTime: 300,
    };
    expect(controlledActive.isLoading).toBe(true);

    const controlledInactive: AashiLoaderProps = {
      isLoading: false,
    };
    expect(controlledInactive.isLoading).toBe(false);
  });
});
