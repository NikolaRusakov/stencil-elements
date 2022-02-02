import { p as promiseResolve, b as bootstrapLazy } from './index-557dbf1e.js';

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
  return bootstrapLazy([["my-component",[[0,"my-component",{"videoIds":[1,"video-ids"],"options":[513],"_options":[32]}]]]], options);
});
