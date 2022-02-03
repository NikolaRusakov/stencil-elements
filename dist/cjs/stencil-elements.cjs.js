'use strict';

const index = require('./index-96f56451.js');

/*
 Stencil Client Patch Browser v2.13.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('stencil-elements.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["ds-interactive-map_2.cjs",[[0,"ds-interactive-map",null,[[0,"clickedContinent","clickedContinentHandler"]]],[0,"ds-video-slider",{"videoIds":[513,"video-ids"],"_videoIds":[32]}]]]], options);
});
