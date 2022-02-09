import type { Components, JSX } from "../types/components";

interface DsCarouselSlider extends Components.DsCarouselSlider, HTMLElement {}
export const DsCarouselSlider: {
  prototype: DsCarouselSlider;
  new (): DsCarouselSlider;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
