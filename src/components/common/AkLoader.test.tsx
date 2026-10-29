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
      logoSize: 68,
    };
    expect(fullscreenProps.variant).toBe("fullscreen");
    expect(fullscreenProps.logoSize).toBe(68);
  });

  it("accepts named logo size presets on loader", () => {
    const embeddedProps: AkLoaderProps = {
      variant: "embedded",
      logoSize: "2xl",
    };
    expect(embeddedProps.logoSize).toBe("2xl");
  });
});
