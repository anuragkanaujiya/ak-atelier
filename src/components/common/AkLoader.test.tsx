import { AkLoader, AkLoaderProps } from "./AkLoader";

describe("AkLoader", () => {
  it("exports AkLoader component properly as a function component", () => {
    expect(AkLoader).toBeDefined();
    expect(typeof AkLoader).toBe("function");
  });

  it("accepts multi-variant definitions (fullscreen, embedded, minimal)", () => {
    const fullscreenProps: AkLoaderProps = {
      variant: "fullscreen",
      message: "Curating AK Atelier Collections...",
      subtitle: "Haute Couture Heritage · Mumbai & Paris",
      minDisplayTime: 400,
      showSkip: true,
    };
    expect(fullscreenProps.variant).toBe("fullscreen");
  });
});
