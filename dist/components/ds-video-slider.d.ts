import type { Components, JSX } from "../types/components";

interface DsVideoSlider extends Components.DsVideoSlider, HTMLElement {}
export const DsVideoSlider: {
  prototype: DsVideoSlider;
  new (): DsVideoSlider;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
