import type { Components, JSX } from "../types/components";

interface DsInteractiveMap extends Components.DsInteractiveMap, HTMLElement {}
export const DsInteractiveMap: {
  prototype: DsInteractiveMap;
  new (): DsInteractiveMap;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
