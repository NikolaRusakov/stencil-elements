import { p as promiseResolve, b as bootstrapLazy } from './index-ce84a32b.js';

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
  return bootstrapLazy([["ds-interactive-map_2",[[0,"ds-interactive-map"],[0,"ds-video-slider",{"videoIds":[513,"video-ids"],"_videoIds":[32]}]]]], options);
});
