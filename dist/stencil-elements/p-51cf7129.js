let e=!1,t=!1;const n="undefined"!=typeof window?window:{},l=n.document||{head:{}},s={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l),ce:(e,t)=>new CustomEvent(e,t)},o=e=>Promise.resolve(e),c=(()=>{try{return new CSSStyleSheet,"function"==typeof(new CSSStyleSheet).replace}catch(e){}return!1})(),i=(e,t,n)=>{n&&n.map((([n,l,o])=>{const c=e,i=r(t,o),u=a(n);s.ael(c,l,i,u),(t.o=t.o||[]).push((()=>s.rel(c,l,i,u)))}))},r=(e,t)=>n=>{try{256&e.t?e.i[t](n):(e.u=e.u||[]).push([t,n])}catch(e){G(e)}},a=e=>0!=(2&e),u=new WeakMap,f=e=>"sc-"+e.h,h={},$=e=>"object"==(e=typeof e)||"function"===e,d=(e,t,...n)=>{let l=null,s=!1,o=!1,c=[];const i=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?i(l):null!=l&&"boolean"!=typeof l&&((s="function"!=typeof e&&!$(l))&&(l+=""),s&&o?c[c.length-1].$+=l:c.push(s?y(null,l):l),o=s)};if(i(n),t){const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter((t=>e[t])).join(" "))}const r=y(e,null);return r.p=t,c.length>0&&(r.m=c),r},y=(e,t)=>({t:0,g:e,$:t,v:null,m:null,p:null}),p={},m=(e,t,l,o,c,i)=>{if(l!==o){let r=B(e,t),a=t.toLowerCase();if("class"===t){const t=e.classList,n=b(l),s=b(o);t.remove(...n.filter((e=>e&&!s.includes(e)))),t.add(...s.filter((e=>e&&!n.includes(e))))}else if(r||"o"!==t[0]||"n"!==t[1]){const n=$(o);if((r||n&&null!==o)&&!c)try{if(e.tagName.includes("-"))e[t]=o;else{let n=null==o?"":o;"list"===t?r=!1:null!=l&&e[t]==n||(e[t]=n)}}catch(e){}null==o||!1===o?!1===o&&""!==e.getAttribute(t)||e.removeAttribute(t):(!r||4&i||c)&&!n&&e.setAttribute(t,o=!0===o?"":o)}else t="-"===t[2]?t.slice(3):B(n,a)?a.slice(2):a[2]+t.slice(3),l&&s.rel(e,t,l,!1),o&&s.ael(e,t,o,!1)}},w=/\s/,b=e=>e?e.split(w):[],g=(e,t,n,l)=>{const s=11===t.v.nodeType&&t.v.host?t.v.host:t.v,o=e&&e.p||h,c=t.p||h;for(l in o)l in c||m(s,l,o[l],void 0,n,t.t);for(l in c)m(s,l,o[l],c[l],n,t.t)},v=(t,n,s)=>{let o,c,i=n.m[s],r=0;if(null!==i.$)o=i.v=l.createTextNode(i.$);else{if(e||(e="svg"===i.g),o=i.v=l.createElementNS(e?"http://www.w3.org/2000/svg":"http://www.w3.org/1999/xhtml",i.g),e&&"foreignObject"===i.g&&(e=!1),g(null,i,e),i.m)for(r=0;r<i.m.length;++r)c=v(t,i,r),c&&o.appendChild(c);"svg"===i.g?e=!1:"foreignObject"===o.tagName&&(e=!0)}return o},S=(e,t,n,l,s,o)=>{let c,i=e;for(;s<=o;++s)l[s]&&(c=v(null,n,s),c&&(l[s].v=c,i.insertBefore(c,t)))},j=(e,t,n,l)=>{for(;t<=n;++t)(l=e[t])&&l.v.remove()},O=(e,t)=>e.g===t.g,M=(t,n)=>{const l=n.v=t.v,s=t.m,o=n.m,c=n.g,i=n.$;null===i?(e="svg"===c||"foreignObject"!==c&&e,g(t,n,e),null!==s&&null!==o?((e,t,n,l)=>{let s,o=0,c=0,i=t.length-1,r=t[0],a=t[i],u=l.length-1,f=l[0],h=l[u];for(;o<=i&&c<=u;)null==r?r=t[++o]:null==a?a=t[--i]:null==f?f=l[++c]:null==h?h=l[--u]:O(r,f)?(M(r,f),r=t[++o],f=l[++c]):O(a,h)?(M(a,h),a=t[--i],h=l[--u]):O(r,h)?(M(r,h),e.insertBefore(r.v,a.v.nextSibling),r=t[++o],h=l[--u]):O(a,f)?(M(a,f),e.insertBefore(a.v,r.v),a=t[--i],f=l[++c]):(s=v(t&&t[c],n,c),f=l[++c],s&&r.v.parentNode.insertBefore(s,r.v));o>i?S(e,null==l[u+1]?null:l[u+1].v,n,l,c,u):c>u&&j(t,o,i)})(l,s,n,o):null!==o?(null!==t.$&&(l.textContent=""),S(l,null,n,o,0,o.length-1)):null!==s&&j(s,0,s.length-1),e&&"svg"===c&&(e=!1)):t.$!==i&&(l.data=i)},k=e=>V(e).S,C=(e,t,n)=>{const l=k(e);return{emit:e=>x(l,t,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:e})}},x=(e,t,n)=>{const l=s.ce(t,n);return e.dispatchEvent(l),l},P=(e,t)=>{t&&!e.j&&t["s-p"]&&t["s-p"].push(new Promise((t=>e.j=t)))},E=(e,t)=>{if(e.t|=16,!(4&e.t))return P(e,e.O),ne((()=>L(e,t)));e.t|=512},L=(e,t)=>{const n=e.i;let l;return t&&(e.t|=256,e.u&&(e.u.map((([e,t])=>U(n,e,t))),e.u=null),l=U(n,"componentWillLoad")),q(l,(()=>R(e,n,t)))},R=async(e,t,n)=>{const s=e.S,o=s["s-rc"];n&&(e=>{const t=e.M;((e,t)=>{let n=f(t),s=K.get(n);if(e=11===e.nodeType?e:l,s)if("string"==typeof s){let t,o=u.get(e=e.head||e);o||u.set(e,o=new Set),o.has(n)||(t=l.createElement("style"),t.innerHTML=s,e.insertBefore(t,e.querySelector("link")),o&&o.add(n))}else e.adoptedStyleSheets.includes(s)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,s])})(e.S.getRootNode(),t)})(e);T(e,t),o&&(o.map((e=>e())),s["s-rc"]=void 0);{const t=s["s-p"],n=()=>W(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},T=(e,t)=>{try{t=t.render(),e.t&=-17,e.t|=2,((e,t)=>{const n=e.S,l=e.M,s=e.k||y(null,null),o=(e=>e&&e.g===p)(t)?t:d(null,null,t);l.C&&(o.p=o.p||{},l.C.map((([e,t])=>o.p[t]=n[e]))),o.g=null,o.t|=4,e.k=o,o.v=s.v=n,M(s,o)})(e,t)}catch(t){G(t,e.S)}return null},W=e=>{const t=e.S,n=e.O;U(e.i,"componentDidRender"),64&e.t||(e.t|=64,D(t),e.P(t),n||A()),e.j&&(e.j(),e.j=void 0),512&e.t&&te((()=>E(e,!1))),e.t&=-517},A=()=>{D(l.documentElement),te((()=>x(n,"appload",{detail:{namespace:"stencil-elements"}})))},U=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(e){G(e)}},q=(e,t)=>e&&e.then?e.then(t):t(),D=e=>e.classList.add("hydrated"),F=(e,t,n)=>{if(t.L){e.watchers&&(t.R=e.watchers);const l=Object.entries(t.L),o=e.prototype;if(l.map((([e,[l]])=>{(31&l||2&n&&32&l)&&Object.defineProperty(o,e,{get(){return((e,t)=>V(this).T.get(t))(0,e)},set(n){((e,t,n,l)=>{const s=V(e),o=s.S,c=s.T.get(t),i=s.t,r=s.i;if(n=((e,t)=>null==e||$(e)?e:1&t?e+"":e)(n,l.L[t][0]),!(8&i&&void 0!==c||n===c)&&(s.T.set(t,n),r)){if(l.R&&128&i){const e=l.R[t];e&&e.map((e=>{try{r[e](n,c,t)}catch(e){G(e,o)}}))}2==(18&i)&&E(s,!1)}})(this,e,n,t)},configurable:!0,enumerable:!0})})),1&n){const n=new Map;o.attributeChangedCallback=function(e,t,l){s.jmp((()=>{const t=n.get(e);if(this.hasOwnProperty(t))l=this[t],delete this[t];else if(o.hasOwnProperty(t)&&"number"==typeof this[t]&&this[t]==l)return;this[t]=(null!==l||"boolean"!=typeof this[t])&&l}))},e.observedAttributes=l.filter((([e,t])=>15&t[0])).map((([e,l])=>{const s=l[1]||e;return n.set(s,e),512&l[0]&&t.C.push([e,s]),s}))}}return e},H=(e,t={})=>{const o=[],r=t.exclude||[],a=n.customElements,u=l.head,h=u.querySelector("meta[charset]"),$=l.createElement("style"),d=[];let y,p=!0;Object.assign(s,t),s.l=new URL(t.resourcesUrl||"./",l.baseURI).href,e.map((e=>{e[1].map((t=>{const n={t:t[0],h:t[1],L:t[2],W:t[3]};n.L=t[2],n.W=t[3],n.C=[],n.R={};const l=n.h,u=class extends HTMLElement{constructor(e){super(e),z(e=this,n)}connectedCallback(){y&&(clearTimeout(y),y=null),p?d.push(this):s.jmp((()=>(e=>{if(0==(1&s.t)){const t=V(e),n=t.M,l=()=>{};if(1&t.t)i(e,t,n.W);else{t.t|=1;{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){P(t,t.O=n);break}}n.L&&Object.entries(n.L).map((([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}})),(async(e,t,n,l,s)=>{if(0==(32&t.t)){{if(t.t|=32,(s=J(n)).then){const e=()=>{};s=await s,e()}s.isProxied||(n.R=s.watchers,F(s,n,2),s.isProxied=!0);const e=()=>{};t.t|=8;try{new s(t)}catch(e){G(e)}t.t&=-9,t.t|=128,e()}if(s.style){let e=s.style;const t=f(n);if(!K.has(t)){const l=()=>{};((e,t,n)=>{let l=K.get(e);c&&n?(l=l||new CSSStyleSheet,l.replace(t)):l=t,K.set(e,l)})(t,e,!!(1&n.t)),l()}}}const o=t.O,i=()=>E(t,!0);o&&o["s-rc"]?o["s-rc"].push(i):i()})(0,t,n)}l()}})(this)))}disconnectedCallback(){s.jmp((()=>(()=>{if(0==(1&s.t)){const e=V(this);e.o&&(e.o.map((e=>e())),e.o=void 0)}})()))}componentOnReady(){return V(this).A}};n.U=e[0],r.includes(l)||a.get(l)||(o.push(l),a.define(l,F(u,n,1)))}))})),$.innerHTML=o+"{visibility:hidden}.hydrated{visibility:inherit}",$.setAttribute("data-styles",""),u.insertBefore($,h?h.nextSibling:u.firstChild),p=!1,d.length?d.map((e=>e.connectedCallback())):s.jmp((()=>y=setTimeout(A,30)))},N=new WeakMap,V=e=>N.get(e),_=(e,t)=>N.set(t.i=e,t),z=(e,t)=>{const n={t:0,S:e,M:t,T:new Map};return n.A=new Promise((e=>n.P=e)),e["s-p"]=[],e["s-rc"]=[],i(e,n,t.W),N.set(e,n)},B=(e,t)=>t in e,G=(e,t)=>(0,console.error)(e,t),I=new Map,J=e=>{const t=e.h.replace(/-/g,"_"),n=e.U,l=I.get(n);return l?l[t]:import(`./${n}.entry.js`).then((e=>(I.set(n,e),e[t])),G)},K=new Map,Q=[],X=[],Y=(e,n)=>l=>{e.push(l),t||(t=!0,n&&4&s.t?te(ee):s.raf(ee))},Z=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(e){G(e)}e.length=0},ee=()=>{Z(Q),Z(X),(t=Q.length>0)&&s.raf(ee)},te=e=>o().then(e),ne=Y(X,!0);export{H as b,C as c,k as g,d as h,o as p,_ as r}