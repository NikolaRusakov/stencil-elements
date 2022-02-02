'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-09804dd0.js');

/*
 Stencil Client Patch Esm v2.13.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["my-component.cjs",[[0,"my-component",{"videoIds":[1,"video-ids"],"options":[513],"_options":[32]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
