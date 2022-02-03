import { p as promiseResolve, b as bootstrapLazy } from './index-1ebfbfb3.js';

/*
 Stencil Client Patch Browser v2.13.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["ds-interactive-map_2",[[0,"ds-interactive-map",null,[[0,"clickedContinent","clickedContinentHandler"]]],[0,"ds-video-slider",{"videoIds":[513,"video-ids"],"_videoIds":[32]}]]]], options);
});
