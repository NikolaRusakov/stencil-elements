import { p as promiseResolve, b as bootstrapLazy } from './index-557dbf1e.js';

/*
 Stencil Client Patch Esm v2.13.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["my-component",[[0,"my-component",{"videoIds":[1,"video-ids"],"options":[513],"_options":[32]}]]]], options);
  });
};

export { defineCustomElements };
