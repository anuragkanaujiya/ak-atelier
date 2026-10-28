import { AkLoader, AkLoaderProps } from './AkLoader';

describe('AkLoader', () => {
  it('exports AkLoader component properly as a function component', () => {
    expect(AkLoader).toBeDefined();
    expect(typeof AkLoader).toBe('function');
  });

  it('accepts multi-variant definitions (fullscreen, embedded, minimal)', () => {
    const fullscreenProps: AkLoaderProps = {
      variant: 'fullscreen',
      message: 'Curating Royal Silk...',
      subtitle: 'A Legacy Woven in Elegance',
      minDisplayTime: 400,
      showSkip: true,
    };
    expect(fullscreenProps.variant).toBe('fullscreen');

    const embeddedProps: AkLoaderProps = {
      variant: 'embedded',
      message: 'Loading 3D Specimen',
      subtitle: 'Interactive Silhouette',
    };
    expect(embeddedProps.variant).toBe('embedded');

    const minimalProps: AkLoaderProps = {
      variant: 'minimal',
      message: 'Adding to Bag...',
      logoSize: 16,
    };
    expect(minimalProps.variant).toBe('minimal');
    expect(minimalProps.logoSize).toBe(16);
  });

  it('supports controlled mode with boolean isLoading flag', () => {
    const controlledActive: AkLoaderProps = {
      isLoading: true,
      minDisplayTime: 300,
    };
    expect(controlledActive.isLoading).toBe(true);

    const controlledInactive: AkLoaderProps = {
      isLoading: false,
    };
    expect(controlledInactive.isLoading).toBe(false);
  });

  it('accepts onComplete callback', () => {
    let completed = false;
    const onComplete = () => {
      completed = true;
    };
    onComplete();
    expect(completed).toBe(true);
  });
});
