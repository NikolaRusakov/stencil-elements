'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-6ac216eb.js');

/*
 Stencil Client Patch Esm v2.13.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["ds-interactive-map_2.cjs",[[0,"ds-interactive-map"],[0,"ds-video-slider",{"videoIds":[513,"video-ids"],"_videoIds":[32]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
