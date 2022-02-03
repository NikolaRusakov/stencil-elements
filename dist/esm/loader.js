import { p as promiseResolve, b as bootstrapLazy } from './index-1ebfbfb3.js';

/*
 Stencil Client Patch Esm v2.13.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["ds-interactive-map_2",[[0,"ds-interactive-map",null,[[0,"clickedContinent","clickedContinentHandler"]]],[0,"ds-video-slider",{"videoIds":[513,"video-ids"],"_videoIds":[32]}]]]], options);
  });
};

export { defineCustomElements };
