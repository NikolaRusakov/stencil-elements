import { HTMLElement as HTMLElement$1, h, proxyCustomElement } from '@stencil/core/internal/client';

/*!
 * Splide.js
 * Version  : 3.6.12
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
const PROJECT_CODE$1 = "splide";
const DATA_ATTRIBUTE = `data-${PROJECT_CODE$1}`;

const CREATED = 1;
const MOUNTED = 2;
const IDLE = 3;
const MOVING = 4;
const DESTROYED = 5;
const STATES = {
  CREATED,
  MOUNTED,
  IDLE,
  MOVING,
  DESTROYED
};

const DEFAULT_EVENT_PRIORITY$1 = 10;
const DEFAULT_USER_EVENT_PRIORITY = 20;

function empty(array) {
  array.length = 0;
}

function isObject$1(subject) {
  return !isNull$1(subject) && typeof subject === "object";
}
function isArray$1(subject) {
  return Array.isArray(subject);
}
function isFunction$1(subject) {
  return typeof subject === "function";
}
function isString$1(subject) {
  return typeof subject === "string";
}
function isUndefined$1(subject) {
  return typeof subject === "undefined";
}
function isNull$1(subject) {
  return subject === null;
}
function isHTMLElement$1(subject) {
  return subject instanceof HTMLElement;
}

function toArray$1(value) {
  return isArray$1(value) ? value : [value];
}

function forEach$1(values, iteratee) {
  toArray$1(values).forEach(iteratee);
}

function includes(array, value) {
  return array.indexOf(value) > -1;
}

function push(array, items) {
  array.push(...toArray$1(items));
  return array;
}

const arrayProto$1 = Array.prototype;

function slice$1(arrayLike, start, end) {
  return arrayProto$1.slice.call(arrayLike, start, end);
}

function find$1(arrayLike, predicate) {
  return slice$1(arrayLike).filter(predicate)[0];
}

function toggleClass$1(elm, classes, add) {
  if (elm) {
    forEach$1(classes, (name) => {
      if (name) {
        elm.classList[add ? "add" : "remove"](name);
      }
    });
  }
}

function addClass$1(elm, classes) {
  toggleClass$1(elm, isString$1(classes) ? classes.split(" ") : classes, true);
}

function append$1(parent, children) {
  forEach$1(children, parent.appendChild.bind(parent));
}

function before(nodes, ref) {
  forEach$1(nodes, (node) => {
    const parent = ref.parentNode;
    if (parent) {
      parent.insertBefore(node, ref);
    }
  });
}

function matches$1(elm, selector) {
  return isHTMLElement$1(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
}

function children$1(parent, selector) {
  return parent ? slice$1(parent.children).filter((child) => matches$1(child, selector)) : [];
}

function child$1(parent, selector) {
  return selector ? children$1(parent, selector)[0] : parent.firstElementChild;
}

function forOwn$1(object, iteratee, right) {
  if (object) {
    let keys = Object.keys(object);
    keys = right ? keys.reverse() : keys;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== "__proto__") {
        if (iteratee(object[key], key) === false) {
          break;
        }
      }
    }
  }
  return object;
}

function assign$1(object) {
  slice$1(arguments, 1).forEach((source) => {
    forOwn$1(source, (value, key) => {
      object[key] = source[key];
    });
  });
  return object;
}

function merge$1(object, source) {
  forOwn$1(source, (value, key) => {
    if (isArray$1(value)) {
      object[key] = value.slice();
    } else if (isObject$1(value)) {
      object[key] = merge$1(isObject$1(object[key]) ? object[key] : {}, value);
    } else {
      object[key] = value;
    }
  });
  return object;
}

function removeAttribute$1(elm, attrs) {
  if (elm) {
    forEach$1(attrs, (attr) => {
      elm.removeAttribute(attr);
    });
  }
}

function setAttribute$1(elm, attrs, value) {
  if (isObject$1(attrs)) {
    forOwn$1(attrs, (value2, name) => {
      setAttribute$1(elm, name, value2);
    });
  } else {
    isNull$1(value) ? removeAttribute$1(elm, attrs) : elm.setAttribute(attrs, String(value));
  }
}

function create$1(tag, attrs, parent) {
  const elm = document.createElement(tag);
  if (attrs) {
    isString$1(attrs) ? addClass$1(elm, attrs) : setAttribute$1(elm, attrs);
  }
  parent && append$1(parent, elm);
  return elm;
}

function style$1(elm, prop, value) {
  if (isUndefined$1(value)) {
    return getComputedStyle(elm)[prop];
  }
  if (!isNull$1(value)) {
    const { style: style2 } = elm;
    value = `${value}`;
    if (style2[prop] !== value) {
      style2[prop] = value;
    }
  }
}

function display$1(elm, display2) {
  style$1(elm, "display", display2);
}

function focus(elm) {
  elm["setActive"] && elm["setActive"]() || elm.focus({ preventScroll: true });
}

function getAttribute$1(elm, attr) {
  return elm.getAttribute(attr);
}

function hasClass(elm, className) {
  return elm && elm.classList.contains(className);
}

function rect(target) {
  return target.getBoundingClientRect();
}

function remove$1(nodes) {
  forEach$1(nodes, (node) => {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}

function measure(parent, value) {
  if (isString$1(value)) {
    const div = create$1("div", { style: `width: ${value}; position: absolute;` }, parent);
    value = rect(div).width;
    remove$1(div);
  }
  return value;
}

function parseHtml(html) {
  return child$1(new DOMParser().parseFromString(html, "text/html").body);
}

function prevent(e, stopPropagation) {
  e.preventDefault();
  if (stopPropagation) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}

function query(parent, selector) {
  return parent && parent.querySelector(selector);
}

function queryAll$1(parent, selector) {
  return slice$1(parent.querySelectorAll(selector));
}

function removeClass$1(elm, classes) {
  toggleClass$1(elm, classes, false);
}

function unit(value) {
  return isString$1(value) ? value : value ? `${value}px` : "";
}

function assert(condition, message = "") {
  if (!condition) {
    throw new Error(`[${PROJECT_CODE$1}] ${message}`);
  }
}

function nextTick(callback) {
  setTimeout(callback);
}

const noop = () => {
};

function raf(func) {
  return requestAnimationFrame(func);
}

const { min: min$1, max: max$1, floor: floor$1, ceil: ceil$1, abs: abs$1 } = Math;

function approximatelyEqual(x, y, epsilon) {
  return abs$1(x - y) < epsilon;
}

function between(number, minOrMax, maxOrMin, exclusive) {
  const minimum = min$1(minOrMax, maxOrMin);
  const maximum = max$1(minOrMax, maxOrMin);
  return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
}

function clamp$1(number, x, y) {
  const minimum = min$1(x, y);
  const maximum = max$1(x, y);
  return min$1(max$1(minimum, number), maximum);
}

function sign(x) {
  return +(x > 0) - +(x < 0);
}

function format(string, replacements) {
  forEach$1(replacements, (replacement) => {
    string = string.replace("%s", `${replacement}`);
  });
  return string;
}

function pad(number) {
  return number < 10 ? `0${number}` : `${number}`;
}

const ids = {};
function uniqueId(prefix) {
  return `${prefix}${pad(ids[prefix] = (ids[prefix] || 0) + 1)}`;
}

function EventBus$1() {
  let handlers = {};
  function on(events, callback, key, priority = DEFAULT_EVENT_PRIORITY$1) {
    forEachEvent(events, (event, namespace) => {
      handlers[event] = handlers[event] || [];
      push(handlers[event], {
        _event: event,
        _callback: callback,
        _namespace: namespace,
        _priority: priority,
        _key: key
      }).sort((handler1, handler2) => handler1._priority - handler2._priority);
    });
  }
  function off(events, key) {
    forEachEvent(events, (event, namespace) => {
      const eventHandlers = handlers[event];
      handlers[event] = eventHandlers && eventHandlers.filter((handler) => {
        return handler._key ? handler._key !== key : key || handler._namespace !== namespace;
      });
    });
  }
  function offBy(key) {
    forOwn$1(handlers, (eventHandlers, event) => {
      off(event, key);
    });
  }
  function emit(event) {
    (handlers[event] || []).forEach((handler) => {
      handler._callback.apply(handler, slice$1(arguments, 1));
    });
  }
  function destroy() {
    handlers = {};
  }
  function forEachEvent(events, iteratee) {
    toArray$1(events).join(" ").split(" ").forEach((eventNS) => {
      const fragments = eventNS.split(".");
      iteratee(fragments[0], fragments[1]);
    });
  }
  return {
    on,
    off,
    offBy,
    emit,
    destroy
  };
}

const EVENT_MOUNTED$1 = "mounted";
const EVENT_READY = "ready";
const EVENT_MOVE$1 = "move";
const EVENT_MOVED$1 = "moved";
const EVENT_SHIFTED = "shifted";
const EVENT_CLICK = "click";
const EVENT_ACTIVE = "active";
const EVENT_INACTIVE = "inactive";
const EVENT_VISIBLE = "visible";
const EVENT_HIDDEN = "hidden";
const EVENT_SLIDE_KEYDOWN = "slide:keydown";
const EVENT_REFRESH = "refresh";
const EVENT_UPDATED = "updated";
const EVENT_RESIZE = "resize";
const EVENT_RESIZED = "resized";
const EVENT_REPOSITIONED = "repositioned";
const EVENT_DRAG$1 = "drag";
const EVENT_DRAGGING$1 = "dragging";
const EVENT_DRAGGED = "dragged";
const EVENT_SCROLL$1 = "scroll";
const EVENT_SCROLLED$1 = "scrolled";
const EVENT_DESTROY$1 = "destroy";
const EVENT_ARROWS_MOUNTED = "arrows:mounted";
const EVENT_ARROWS_UPDATED = "arrows:updated";
const EVENT_PAGINATION_MOUNTED = "pagination:mounted";
const EVENT_PAGINATION_UPDATED = "pagination:updated";
const EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
const EVENT_AUTOPLAY_PLAY = "autoplay:play";
const EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
const EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
const EVENT_LAZYLOAD_LOADED = "lazyload:loaded";

function EventInterface$1(Splide2) {
  const { event } = Splide2;
  const key = {};
  let listeners = [];
  function on(events, callback, priority) {
    event.on(events, callback, key, priority);
  }
  function off(events) {
    event.off(events, key);
  }
  function bind(targets, events, callback, options) {
    forEachEvent(targets, events, (target, event2) => {
      listeners.push([target, event2, callback, options]);
      target.addEventListener(event2, callback, options);
    });
  }
  function unbind(targets, events, callback) {
    forEachEvent(targets, events, (target, event2) => {
      listeners = listeners.filter((listener) => {
        if (listener[0] === target && listener[1] === event2 && (!callback || listener[2] === callback)) {
          target.removeEventListener(event2, listener[2], listener[3]);
          return false;
        }
        return true;
      });
    });
  }
  function forEachEvent(targets, events, iteratee) {
    forEach$1(targets, (target) => {
      if (target) {
        events.split(" ").forEach(iteratee.bind(null, target));
      }
    });
  }
  function destroy() {
    listeners = listeners.filter((data) => unbind(data[0], data[1]));
    event.offBy(key);
  }
  event.on(EVENT_DESTROY$1, destroy, key);
  return {
    on,
    off,
    emit: event.emit,
    bind,
    unbind,
    destroy
  };
}

function RequestInterval(interval, onInterval, onUpdate, limit) {
  const { now } = Date;
  let startTime;
  let rate = 0;
  let id;
  let paused = true;
  let count = 0;
  function update() {
    if (!paused) {
      const elapsed = now() - startTime;
      if (elapsed >= interval) {
        rate = 1;
        startTime = now();
      } else {
        rate = elapsed / interval;
      }
      if (onUpdate) {
        onUpdate(rate);
      }
      if (rate === 1) {
        onInterval();
        if (limit && ++count >= limit) {
          return pause();
        }
      }
      raf(update);
    }
  }
  function start(resume) {
    !resume && cancel();
    startTime = now() - (resume ? rate * interval : 0);
    paused = false;
    raf(update);
  }
  function pause() {
    paused = true;
  }
  function rewind() {
    startTime = now();
    rate = 0;
    if (onUpdate) {
      onUpdate(rate);
    }
  }
  function cancel() {
    cancelAnimationFrame(id);
    rate = 0;
    id = 0;
    paused = true;
  }
  function set(time) {
    interval = time;
  }
  function isPaused() {
    return paused;
  }
  return {
    start,
    rewind,
    pause,
    cancel,
    set,
    isPaused
  };
}

function State$1(initialState) {
  let state = initialState;
  function set(value) {
    state = value;
  }
  function is(states) {
    return includes(toArray$1(states), state);
  }
  return { set, is };
}

function Throttle(func, duration) {
  let interval;
  function throttled() {
    if (!interval) {
      interval = RequestInterval(duration || 0, () => {
        func.apply(this, arguments);
        interval = null;
      }, null, 1);
      interval.start();
    }
  }
  return throttled;
}

function Options(Splide2, Components2, options) {
  const throttledObserve = Throttle(observe);
  let initialOptions;
  let points;
  let currPoint;
  function setup() {
    try {
      merge$1(options, JSON.parse(getAttribute$1(Splide2.root, DATA_ATTRIBUTE)));
    } catch (e) {
      assert(false, e.message);
    }
    initialOptions = merge$1({}, options);
    const { breakpoints } = options;
    if (breakpoints) {
      const isMin = options.mediaQuery === "min";
      points = Object.keys(breakpoints).sort((n, m) => isMin ? +m - +n : +n - +m).map((point) => [
        point,
        matchMedia(`(${isMin ? "min" : "max"}-width:${point}px)`)
      ]);
      observe();
    }
  }
  function mount() {
    if (points) {
      addEventListener("resize", throttledObserve);
    }
  }
  function destroy(completely) {
    if (completely) {
      removeEventListener("resize", throttledObserve);
    }
  }
  function observe() {
    const item = find$1(points, (item2) => item2[1].matches) || [];
    if (item[0] !== currPoint) {
      onMatch(currPoint = item[0]);
    }
  }
  function onMatch(point) {
    const newOptions = options.breakpoints[point] || initialOptions;
    if (newOptions.destroy) {
      Splide2.options = initialOptions;
      Splide2.destroy(newOptions.destroy === "completely");
    } else {
      if (Splide2.state.is(DESTROYED)) {
        destroy(true);
        Splide2.mount();
      }
      Splide2.options = newOptions;
    }
  }
  return {
    setup,
    mount,
    destroy
  };
}

const RTL = "rtl";
const TTB = "ttb";

const ORIENTATION_MAP = {
  marginRight: ["marginBottom", "marginLeft"],
  autoWidth: ["autoHeight"],
  fixedWidth: ["fixedHeight"],
  paddingLeft: ["paddingTop", "paddingRight"],
  paddingRight: ["paddingBottom", "paddingLeft"],
  width: ["height"],
  left: ["top", "right"],
  right: ["bottom", "left"],
  x: ["y"],
  X: ["Y"],
  Y: ["X"],
  ArrowLeft: ["ArrowUp", "ArrowRight"],
  ArrowRight: ["ArrowDown", "ArrowLeft"]
};
function Direction(Splide2, Components2, options) {
  function resolve(prop, axisOnly) {
    const { direction } = options;
    const index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
    return ORIENTATION_MAP[prop][index] || prop;
  }
  function orient(value) {
    return value * (options.direction === RTL ? 1 : -1);
  }
  return {
    resolve,
    orient
  };
}

const CLASS_ROOT = PROJECT_CODE$1;
const CLASS_SLIDER = `${PROJECT_CODE$1}__slider`;
const CLASS_TRACK = `${PROJECT_CODE$1}__track`;
const CLASS_LIST = `${PROJECT_CODE$1}__list`;
const CLASS_SLIDE = `${PROJECT_CODE$1}__slide`;
const CLASS_CLONE = `${CLASS_SLIDE}--clone`;
const CLASS_CONTAINER = `${CLASS_SLIDE}__container`;
const CLASS_ARROWS = `${PROJECT_CODE$1}__arrows`;
const CLASS_ARROW = `${PROJECT_CODE$1}__arrow`;
const CLASS_ARROW_PREV = `${CLASS_ARROW}--prev`;
const CLASS_ARROW_NEXT = `${CLASS_ARROW}--next`;
const CLASS_PAGINATION = `${PROJECT_CODE$1}__pagination`;
const CLASS_PAGINATION_PAGE = `${CLASS_PAGINATION}__page`;
const CLASS_PROGRESS = `${PROJECT_CODE$1}__progress`;
const CLASS_PROGRESS_BAR = `${CLASS_PROGRESS}__bar`;
const CLASS_AUTOPLAY = `${PROJECT_CODE$1}__autoplay`;
const CLASS_PLAY = `${PROJECT_CODE$1}__play`;
const CLASS_PAUSE = `${PROJECT_CODE$1}__pause`;
const CLASS_SPINNER = `${PROJECT_CODE$1}__spinner`;
const CLASS_INITIALIZED = "is-initialized";
const CLASS_ACTIVE = "is-active";
const CLASS_PREV = "is-prev";
const CLASS_NEXT = "is-next";
const CLASS_VISIBLE = "is-visible";
const CLASS_LOADING = "is-loading";
const STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING];
const CLASSES = {
  slide: CLASS_SLIDE,
  clone: CLASS_CLONE,
  arrows: CLASS_ARROWS,
  arrow: CLASS_ARROW,
  prev: CLASS_ARROW_PREV,
  next: CLASS_ARROW_NEXT,
  pagination: CLASS_PAGINATION,
  page: CLASS_PAGINATION_PAGE,
  spinner: CLASS_SPINNER
};

function Elements(Splide2, Components2, options) {
  const { on } = EventInterface$1(Splide2);
  const { root } = Splide2;
  const elements = {};
  const slides = [];
  let classes;
  let slider;
  let track;
  let list;
  function setup() {
    collect();
    identify();
    addClass$1(root, classes = getClasses());
  }
  function mount() {
    on(EVENT_REFRESH, refresh, DEFAULT_EVENT_PRIORITY$1 - 2);
    on(EVENT_UPDATED, update);
  }
  function destroy() {
    [root, track, list].forEach((elm) => {
      removeAttribute$1(elm, "style");
    });
    empty(slides);
    removeClass$1(root, classes);
  }
  function refresh() {
    destroy();
    setup();
  }
  function update() {
    removeClass$1(root, classes);
    addClass$1(root, classes = getClasses());
  }
  function collect() {
    slider = child$1(root, `.${CLASS_SLIDER}`);
    track = query(root, `.${CLASS_TRACK}`);
    list = child$1(track, `.${CLASS_LIST}`);
    assert(track && list, "A track/list element is missing.");
    push(slides, children$1(list, `.${CLASS_SLIDE}:not(.${CLASS_CLONE})`));
    const autoplay = find(`.${CLASS_AUTOPLAY}`);
    const arrows = find(`.${CLASS_ARROWS}`);
    assign$1(elements, {
      root,
      slider,
      track,
      list,
      slides,
      arrows,
      autoplay,
      prev: query(arrows, `.${CLASS_ARROW_PREV}`),
      next: query(arrows, `.${CLASS_ARROW_NEXT}`),
      bar: query(find(`.${CLASS_PROGRESS}`), `.${CLASS_PROGRESS_BAR}`),
      play: query(autoplay, `.${CLASS_PLAY}`),
      pause: query(autoplay, `.${CLASS_PAUSE}`)
    });
  }
  function identify() {
    const id = root.id || uniqueId(PROJECT_CODE$1);
    root.id = id;
    track.id = track.id || `${id}-track`;
    list.id = list.id || `${id}-list`;
  }
  function find(selector) {
    return child$1(root, selector) || child$1(slider, selector);
  }
  function getClasses() {
    return [
      `${CLASS_ROOT}--${options.type}`,
      `${CLASS_ROOT}--${options.direction}`,
      options.drag && `${CLASS_ROOT}--draggable`,
      options.isNavigation && `${CLASS_ROOT}--nav`,
      CLASS_ACTIVE
    ];
  }
  return assign$1(elements, {
    setup,
    mount,
    destroy
  });
}

const ROLE = "role";
const ARIA_CONTROLS = "aria-controls";
const ARIA_CURRENT = "aria-current";
const ARIA_LABEL = "aria-label";
const ARIA_HIDDEN = "aria-hidden";
const TAB_INDEX = "tabindex";
const DISABLED = "disabled";
const ARIA_ORIENTATION = "aria-orientation";
const ALL_ATTRIBUTES = [
  ROLE,
  ARIA_CONTROLS,
  ARIA_CURRENT,
  ARIA_LABEL,
  ARIA_HIDDEN,
  ARIA_ORIENTATION,
  TAB_INDEX,
  DISABLED
];

const SLIDE = "slide";
const LOOP = "loop";
const FADE = "fade";

function Slide$1(Splide2, index, slideIndex, slide) {
  const { on, emit, bind, destroy: destroyEvents } = EventInterface$1(Splide2);
  const { Components, root, options } = Splide2;
  const { isNavigation, updateOnMove } = options;
  const { resolve } = Components.Direction;
  const styles = getAttribute$1(slide, "style");
  const isClone = slideIndex > -1;
  const container = child$1(slide, `.${CLASS_CONTAINER}`);
  const focusableNodes = options.focusableNodes && queryAll$1(slide, options.focusableNodes);
  let destroyed;
  function mount() {
    if (!isClone) {
      slide.id = `${root.id}-slide${pad(index + 1)}`;
    }
    bind(slide, "click keydown", (e) => {
      emit(e.type === "click" ? EVENT_CLICK : EVENT_SLIDE_KEYDOWN, self, e);
    });
    on([EVENT_REFRESH, EVENT_REPOSITIONED, EVENT_SHIFTED, EVENT_MOVED$1, EVENT_SCROLLED$1], update);
    on(EVENT_NAVIGATION_MOUNTED, initNavigation);
    if (updateOnMove) {
      on(EVENT_MOVE$1, onMove);
    }
  }
  function destroy() {
    destroyed = true;
    destroyEvents();
    removeClass$1(slide, STATUS_CLASSES);
    removeAttribute$1(slide, ALL_ATTRIBUTES);
    setAttribute$1(slide, "style", styles);
  }
  function initNavigation() {
    const idx = isClone ? slideIndex : index;
    const label = format(options.i18n.slideX, idx + 1);
    const controls = Splide2.splides.map((target) => target.splide.root.id).join(" ");
    setAttribute$1(slide, ARIA_LABEL, label);
    setAttribute$1(slide, ARIA_CONTROLS, controls);
    setAttribute$1(slide, ROLE, "menuitem");
    updateActivity(isActive());
  }
  function onMove() {
    if (!destroyed) {
      update();
    }
  }
  function update() {
    if (!destroyed) {
      const { index: currIndex } = Splide2;
      updateActivity(isActive());
      updateVisibility(isVisible());
      toggleClass$1(slide, CLASS_PREV, index === currIndex - 1);
      toggleClass$1(slide, CLASS_NEXT, index === currIndex + 1);
    }
  }
  function updateActivity(active) {
    if (active !== hasClass(slide, CLASS_ACTIVE)) {
      toggleClass$1(slide, CLASS_ACTIVE, active);
      if (isNavigation) {
        setAttribute$1(slide, ARIA_CURRENT, active || null);
      }
      emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
    }
  }
  function updateVisibility(visible) {
    const hidden = !visible && (!isActive() || isClone);
    setAttribute$1(slide, ARIA_HIDDEN, hidden || null);
    setAttribute$1(slide, TAB_INDEX, !hidden && options.slideFocus ? 0 : null);
    if (focusableNodes) {
      focusableNodes.forEach((node) => {
        setAttribute$1(node, TAB_INDEX, hidden ? -1 : null);
      });
    }
    if (visible !== hasClass(slide, CLASS_VISIBLE)) {
      toggleClass$1(slide, CLASS_VISIBLE, visible);
      emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
    }
  }
  function style$1$1(prop, value, useContainer) {
    style$1(useContainer && container || slide, prop, value);
  }
  function isActive() {
    const { index: curr } = Splide2;
    return curr === index || options.cloneStatus && curr === slideIndex;
  }
  function isVisible() {
    if (Splide2.is(FADE)) {
      return isActive();
    }
    const trackRect = rect(Components.Elements.track);
    const slideRect = rect(slide);
    const left = resolve("left");
    const right = resolve("right");
    return floor$1(trackRect[left]) <= ceil$1(slideRect[left]) && floor$1(slideRect[right]) <= ceil$1(trackRect[right]);
  }
  function isWithin(from, distance) {
    let diff = abs$1(from - index);
    if (!isClone && (options.rewind || Splide2.is(LOOP))) {
      diff = min$1(diff, Splide2.length - diff);
    }
    return diff <= distance;
  }
  const self = {
    index,
    slideIndex,
    slide,
    container,
    isClone,
    mount,
    destroy,
    update,
    style: style$1$1,
    isWithin
  };
  return self;
}

function Slides(Splide2, Components2, options) {
  const { on, emit, bind } = EventInterface$1(Splide2);
  const { slides, list } = Components2.Elements;
  const Slides2 = [];
  function mount() {
    init();
    on(EVENT_REFRESH, refresh);
    on([EVENT_MOUNTED$1, EVENT_REFRESH], () => {
      Slides2.sort((Slide1, Slide2) => Slide1.index - Slide2.index);
    });
  }
  function init() {
    slides.forEach((slide, index) => {
      register(slide, index, -1);
    });
  }
  function destroy() {
    forEach$1$1((Slide2) => {
      Slide2.destroy();
    });
    empty(Slides2);
  }
  function refresh() {
    destroy();
    init();
  }
  function update() {
    forEach$1$1((Slide2) => {
      Slide2.update();
    });
  }
  function register(slide, index, slideIndex) {
    const object = Slide$1(Splide2, index, slideIndex, slide);
    object.mount();
    Slides2.push(object);
  }
  function get(excludeClones) {
    return excludeClones ? filter((Slide2) => !Slide2.isClone) : Slides2;
  }
  function getIn(page) {
    const { Controller } = Components2;
    const index = Controller.toIndex(page);
    const max = Controller.hasFocus() ? 1 : options.perPage;
    return filter((Slide2) => between(Slide2.index, index, index + max - 1));
  }
  function getAt(index) {
    return filter(index)[0];
  }
  function add(items, index) {
    forEach$1(items, (slide) => {
      if (isString$1(slide)) {
        slide = parseHtml(slide);
      }
      if (isHTMLElement$1(slide)) {
        const ref = slides[index];
        ref ? before(slide, ref) : append$1(list, slide);
        addClass$1(slide, options.classes.slide);
        observeImages(slide, emit.bind(null, EVENT_RESIZE));
      }
    });
    emit(EVENT_REFRESH);
  }
  function remove$1$1(matcher) {
    remove$1(filter(matcher).map((Slide2) => Slide2.slide));
    emit(EVENT_REFRESH);
  }
  function forEach$1$1(iteratee, excludeClones) {
    get(excludeClones).forEach(iteratee);
  }
  function filter(matcher) {
    return Slides2.filter(isFunction$1(matcher) ? matcher : (Slide2) => isString$1(matcher) ? matches$1(Slide2.slide, matcher) : includes(toArray$1(matcher), Slide2.index));
  }
  function style(prop, value, useContainer) {
    forEach$1$1((Slide2) => {
      Slide2.style(prop, value, useContainer);
    });
  }
  function observeImages(elm, callback) {
    const images = queryAll$1(elm, "img");
    let { length } = images;
    if (length) {
      images.forEach((img) => {
        bind(img, "load error", () => {
          if (!--length) {
            callback();
          }
        });
      });
    } else {
      callback();
    }
  }
  function getLength(excludeClones) {
    return excludeClones ? slides.length : Slides2.length;
  }
  function isEnough() {
    return Slides2.length > options.perPage;
  }
  return {
    mount,
    destroy,
    update,
    register,
    get,
    getIn,
    getAt,
    add,
    remove: remove$1$1,
    forEach: forEach$1$1,
    filter,
    style,
    getLength,
    isEnough
  };
}

function Layout(Splide2, Components2, options) {
  const { on, bind, emit } = EventInterface$1(Splide2);
  const { Slides } = Components2;
  const { resolve } = Components2.Direction;
  const { root, track, list } = Components2.Elements;
  const { getAt } = Slides;
  let vertical;
  let rootRect;
  function mount() {
    init();
    bind(window, "resize load", Throttle(emit.bind(this, EVENT_RESIZE)));
    on([EVENT_UPDATED, EVENT_REFRESH], init);
    on(EVENT_RESIZE, resize);
  }
  function init() {
    rootRect = null;
    vertical = options.direction === TTB;
    style$1(root, "maxWidth", unit(options.width));
    style$1(track, resolve("paddingLeft"), cssPadding(false));
    style$1(track, resolve("paddingRight"), cssPadding(true));
    resize();
  }
  function resize() {
    const newRect = rect(root);
    if (!rootRect || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
      style$1(track, "height", cssTrackHeight());
      Slides.style(resolve("marginRight"), unit(options.gap));
      Slides.style("width", cssSlideWidth() || null);
      setSlidesHeight();
      rootRect = newRect;
      emit(EVENT_RESIZED);
    }
  }
  function setSlidesHeight() {
    Slides.style("height", cssSlideHeight() || null, true);
  }
  function cssPadding(right) {
    const { padding } = options;
    const prop = resolve(right ? "right" : "left");
    return padding && unit(padding[prop] || (isObject$1(padding) ? 0 : padding)) || "0px";
  }
  function cssTrackHeight() {
    let height = "";
    if (vertical) {
      height = cssHeight();
      assert(height, "height or heightRatio is missing.");
      height = `calc(${height} - ${cssPadding(false)} - ${cssPadding(true)})`;
    }
    return height;
  }
  function cssHeight() {
    return unit(options.height || rect(list).width * options.heightRatio);
  }
  function cssSlideWidth() {
    return options.autoWidth ? "" : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
  }
  function cssSlideHeight() {
    return unit(options.fixedHeight) || (vertical ? options.autoHeight ? "" : cssSlideSize() : cssHeight());
  }
  function cssSlideSize() {
    const gap = unit(options.gap);
    return `calc((100%${gap && ` + ${gap}`})/${options.perPage || 1}${gap && ` - ${gap}`})`;
  }
  function listSize() {
    return rect(list)[resolve("width")];
  }
  function slideSize(index, withoutGap) {
    const Slide = getAt(index || 0);
    return Slide ? rect(Slide.slide)[resolve("width")] + (withoutGap ? 0 : getGap()) : 0;
  }
  function totalSize(index, withoutGap) {
    const Slide = getAt(index);
    if (Slide) {
      const right = rect(Slide.slide)[resolve("right")];
      const left = rect(list)[resolve("left")];
      return abs$1(right - left) + (withoutGap ? 0 : getGap());
    }
    return 0;
  }
  function sliderSize() {
    return totalSize(Splide2.length - 1, true) - totalSize(-1, true);
  }
  function getGap() {
    const Slide = getAt(0);
    return Slide && parseFloat(style$1(Slide.slide, resolve("marginRight"))) || 0;
  }
  function getPadding(right) {
    return parseFloat(style$1(track, resolve(`padding${right ? "Right" : "Left"}`))) || 0;
  }
  return {
    mount,
    listSize,
    slideSize,
    sliderSize,
    totalSize,
    getPadding
  };
}

function Clones(Splide2, Components2, options) {
  const { on, emit } = EventInterface$1(Splide2);
  const { Elements, Slides } = Components2;
  const { resolve } = Components2.Direction;
  const clones = [];
  let cloneCount;
  function mount() {
    init();
    on(EVENT_REFRESH, refresh);
    on([EVENT_UPDATED, EVENT_RESIZE], observe);
  }
  function init() {
    if (cloneCount = computeCloneCount()) {
      generate(cloneCount);
      emit(EVENT_RESIZE);
    }
  }
  function destroy() {
    remove$1(clones);
    empty(clones);
  }
  function refresh() {
    destroy();
    init();
  }
  function observe() {
    if (cloneCount < computeCloneCount()) {
      emit(EVENT_REFRESH);
    }
  }
  function generate(count) {
    const slides = Slides.get().slice();
    const { length } = slides;
    if (length) {
      while (slides.length < count) {
        push(slides, slides);
      }
      push(slides.slice(-count), slides.slice(0, count)).forEach((Slide, index) => {
        const isHead = index < count;
        const clone = cloneDeep(Slide.slide, index);
        isHead ? before(clone, slides[0].slide) : append$1(Elements.list, clone);
        push(clones, clone);
        Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
      });
    }
  }
  function cloneDeep(elm, index) {
    const clone = elm.cloneNode(true);
    addClass$1(clone, options.classes.clone);
    clone.id = `${Splide2.root.id}-clone${pad(index + 1)}`;
    return clone;
  }
  function computeCloneCount() {
    let { clones: clones2 } = options;
    if (!Splide2.is(LOOP)) {
      clones2 = 0;
    } else if (!clones2) {
      const fixedSize = measure(Elements.list, options[resolve("fixedWidth")]);
      const fixedCount = fixedSize && ceil$1(rect(Elements.track)[resolve("width")] / fixedSize);
      const baseCount = fixedCount || options[resolve("autoWidth")] && Splide2.length || options.perPage;
      clones2 = baseCount * (options.drag ? (options.flickMaxPages || 1) + 1 : 2);
    }
    return clones2;
  }
  return {
    mount,
    destroy
  };
}

function Move(Splide2, Components2, options) {
  const { on, emit } = EventInterface$1(Splide2);
  const { slideSize, getPadding, totalSize, listSize, sliderSize } = Components2.Layout;
  const { resolve, orient } = Components2.Direction;
  const { list, track } = Components2.Elements;
  let Transition;
  function mount() {
    Transition = Components2.Transition;
    on([EVENT_MOUNTED$1, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH], reposition);
  }
  function destroy() {
    removeAttribute$1(list, "style");
  }
  function reposition() {
    if (!isBusy()) {
      Components2.Scroll.cancel();
      jump(Splide2.index);
      emit(EVENT_REPOSITIONED);
    }
  }
  function move(dest, index, prev, callback) {
    if (!isBusy()) {
      const { set } = Splide2.state;
      const position = getPosition();
      if (dest !== index) {
        Transition.cancel();
        translate(shift(position, dest > index), true);
      }
      set(MOVING);
      emit(EVENT_MOVE$1, index, prev, dest);
      Transition.start(index, () => {
        set(IDLE);
        emit(EVENT_MOVED$1, index, prev, dest);
        if (options.trimSpace === "move" && dest !== prev && position === getPosition()) {
          Components2.Controller.go(dest > prev ? ">" : "<", false, callback);
        } else {
          callback && callback();
        }
      });
    }
  }
  function jump(index) {
    translate(toPosition(index, true));
  }
  function translate(position, preventLoop) {
    if (!Splide2.is(FADE)) {
      const destination = preventLoop ? position : loop(position);
      list.style.transform = `translate${resolve("X")}(${destination}px)`;
      position !== destination && emit(EVENT_SHIFTED);
    }
  }
  function loop(position) {
    if (Splide2.is(LOOP)) {
      const diff = orient(position - getPosition());
      const exceededMin = exceededLimit(false, position) && diff < 0;
      const exceededMax = exceededLimit(true, position) && diff > 0;
      if (exceededMin || exceededMax) {
        position = shift(position, exceededMax);
      }
    }
    return position;
  }
  function shift(position, backwards) {
    const excess = position - getLimit(backwards);
    const size = sliderSize();
    position -= orient(size * (ceil$1(abs$1(excess) / size) || 1)) * (backwards ? 1 : -1);
    return position;
  }
  function cancel() {
    translate(getPosition());
    Transition.cancel();
  }
  function toIndex(position) {
    const Slides = Components2.Slides.get();
    let index = 0;
    let minDistance = Infinity;
    for (let i = 0; i < Slides.length; i++) {
      const slideIndex = Slides[i].index;
      const distance = abs$1(toPosition(slideIndex, true) - position);
      if (distance <= minDistance) {
        minDistance = distance;
        index = slideIndex;
      } else {
        break;
      }
    }
    return index;
  }
  function toPosition(index, trimming) {
    const position = orient(totalSize(index - 1) - offset(index));
    return trimming ? trim(position) : position;
  }
  function getPosition() {
    const left = resolve("left");
    return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
  }
  function trim(position) {
    if (options.trimSpace && Splide2.is(SLIDE)) {
      position = clamp$1(position, 0, orient(sliderSize() - listSize()));
    }
    return position;
  }
  function offset(index) {
    const { focus } = options;
    return focus === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus * slideSize(index) || 0;
  }
  function getLimit(max) {
    return toPosition(max ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
  }
  function isBusy() {
    return Splide2.state.is(MOVING) && options.waitForTransition;
  }
  function exceededLimit(max, position) {
    position = isUndefined$1(position) ? getPosition() : position;
    const exceededMin = max !== true && orient(position) < orient(getLimit(false));
    const exceededMax = max !== false && orient(position) > orient(getLimit(true));
    return exceededMin || exceededMax;
  }
  return {
    mount,
    destroy,
    move,
    jump,
    translate,
    shift,
    cancel,
    toIndex,
    toPosition,
    getPosition,
    getLimit,
    isBusy,
    exceededLimit
  };
}

function Controller(Splide2, Components2, options) {
  const { on } = EventInterface$1(Splide2);
  const { Move } = Components2;
  const { getPosition, getLimit } = Move;
  const { isEnough, getLength } = Components2.Slides;
  const isLoop = Splide2.is(LOOP);
  const isSlide = Splide2.is(SLIDE);
  let currIndex = options.start || 0;
  let prevIndex = currIndex;
  let slideCount;
  let perMove;
  let perPage;
  function mount() {
    init();
    on([EVENT_UPDATED, EVENT_REFRESH], init, DEFAULT_EVENT_PRIORITY$1 - 1);
  }
  function init() {
    slideCount = getLength(true);
    perMove = options.perMove;
    perPage = options.perPage;
    currIndex = clamp$1(currIndex, 0, slideCount - 1);
  }
  function go(control, allowSameIndex, callback) {
    const dest = parse(control);
    if (options.useScroll) {
      scroll(dest, true, true, options.speed, callback);
    } else {
      const index = loop(dest);
      if (index > -1 && !Move.isBusy() && (allowSameIndex || index !== currIndex)) {
        setIndex(index);
        Move.move(dest, index, prevIndex, callback);
      }
    }
  }
  function scroll(destination, useIndex, snap, duration, callback) {
    const dest = useIndex ? destination : toDest(destination);
    Components2.Scroll.scroll(useIndex || snap ? Move.toPosition(dest, true) : destination, duration, () => {
      setIndex(Move.toIndex(Move.getPosition()));
      callback && callback();
    });
  }
  function parse(control) {
    let index = currIndex;
    if (isString$1(control)) {
      const [, indicator, number] = control.match(/([+\-<>])(\d+)?/) || [];
      if (indicator === "+" || indicator === "-") {
        index = computeDestIndex(currIndex + +`${indicator}${+number || 1}`, currIndex, true);
      } else if (indicator === ">") {
        index = number ? toIndex(+number) : getNext(true);
      } else if (indicator === "<") {
        index = getPrev(true);
      }
    } else {
      index = isLoop ? control : clamp$1(control, 0, getEnd());
    }
    return index;
  }
  function getNext(destination) {
    return getAdjacent(false, destination);
  }
  function getPrev(destination) {
    return getAdjacent(true, destination);
  }
  function getAdjacent(prev, destination) {
    const number = perMove || (hasFocus() ? 1 : perPage);
    const dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex);
    if (dest === -1 && isSlide) {
      if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
        return prev ? 0 : getEnd();
      }
    }
    return destination ? dest : loop(dest);
  }
  function computeDestIndex(dest, from, incremental) {
    if (isEnough()) {
      const end = getEnd();
      if (dest < 0 || dest > end) {
        if (between(0, dest, from, true) || between(end, from, dest, true)) {
          dest = toIndex(toPage(dest));
        } else {
          if (isLoop) {
            dest = perMove || hasFocus() ? dest : dest < 0 ? -(slideCount % perPage || perPage) : slideCount;
          } else if (options.rewind) {
            dest = dest < 0 ? end : 0;
          } else {
            dest = -1;
          }
        }
      } else {
        if (!incremental && dest !== from) {
          dest = perMove ? dest : toIndex(toPage(from) + (dest < from ? -1 : 1));
        }
      }
    } else {
      dest = -1;
    }
    return dest;
  }
  function getEnd() {
    let end = slideCount - perPage;
    if (hasFocus() || isLoop && perMove) {
      end = slideCount - 1;
    }
    return max$1(end, 0);
  }
  function loop(index) {
    if (isLoop) {
      return isEnough() ? index % slideCount + (index < 0 ? slideCount : 0) : -1;
    }
    return index;
  }
  function toIndex(page) {
    return clamp$1(hasFocus() ? page : perPage * page, 0, getEnd());
  }
  function toPage(index) {
    if (!hasFocus()) {
      index = between(index, slideCount - perPage, slideCount - 1) ? slideCount - 1 : index;
      index = floor$1(index / perPage);
    }
    return index;
  }
  function toDest(destination) {
    const closest = Move.toIndex(destination);
    return isSlide ? clamp$1(closest, 0, getEnd()) : closest;
  }
  function setIndex(index) {
    if (index !== currIndex) {
      prevIndex = currIndex;
      currIndex = index;
    }
  }
  function getIndex(prev) {
    return prev ? prevIndex : currIndex;
  }
  function hasFocus() {
    return !isUndefined$1(options.focus) || options.isNavigation;
  }
  return {
    mount,
    go,
    scroll,
    getNext,
    getPrev,
    getAdjacent,
    getEnd,
    setIndex,
    getIndex,
    toIndex,
    toPage,
    toDest,
    hasFocus
  };
}

const XML_NAME_SPACE = "http://www.w3.org/2000/svg";
const PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
const SIZE = 40;

function Arrows(Splide2, Components2, options) {
  const { on, bind, emit } = EventInterface$1(Splide2);
  const { classes, i18n } = options;
  const { Elements, Controller } = Components2;
  let wrapper = Elements.arrows;
  let prev = Elements.prev;
  let next = Elements.next;
  let created;
  const arrows = {};
  function mount() {
    init();
    on(EVENT_UPDATED, init);
  }
  function init() {
    if (options.arrows) {
      if (!prev || !next) {
        createArrows();
      }
    }
    if (prev && next) {
      if (!arrows.prev) {
        const { id } = Elements.track;
        setAttribute$1(prev, ARIA_CONTROLS, id);
        setAttribute$1(next, ARIA_CONTROLS, id);
        arrows.prev = prev;
        arrows.next = next;
        listen();
        emit(EVENT_ARROWS_MOUNTED, prev, next);
      } else {
        display$1(wrapper, options.arrows === false ? "none" : "");
      }
    }
  }
  function destroy() {
    if (created) {
      remove$1(wrapper);
    } else {
      removeAttribute$1(prev, ALL_ATTRIBUTES);
      removeAttribute$1(next, ALL_ATTRIBUTES);
    }
  }
  function listen() {
    const { go } = Controller;
    on([EVENT_MOUNTED$1, EVENT_MOVED$1, EVENT_UPDATED, EVENT_REFRESH, EVENT_SCROLLED$1], update);
    bind(next, "click", () => {
      go(">", true);
    });
    bind(prev, "click", () => {
      go("<", true);
    });
  }
  function createArrows() {
    wrapper = create$1("div", classes.arrows);
    prev = createArrow(true);
    next = createArrow(false);
    created = true;
    append$1(wrapper, [prev, next]);
    before(wrapper, child$1(options.arrows === "slider" && Elements.slider || Splide2.root));
  }
  function createArrow(prev2) {
    const arrow = `<button class="${classes.arrow} ${prev2 ? classes.prev : classes.next}" type="button"><svg xmlns="${XML_NAME_SPACE}" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}"><path d="${options.arrowPath || PATH}" />`;
    return parseHtml(arrow);
  }
  function update() {
    const index = Splide2.index;
    const prevIndex = Controller.getPrev();
    const nextIndex = Controller.getNext();
    const prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
    const nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
    prev.disabled = prevIndex < 0;
    next.disabled = nextIndex < 0;
    setAttribute$1(prev, ARIA_LABEL, prevLabel);
    setAttribute$1(next, ARIA_LABEL, nextLabel);
    emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
  }
  return {
    arrows,
    mount,
    destroy
  };
}

const INTERVAL_DATA_ATTRIBUTE = `${DATA_ATTRIBUTE}-interval`;

function Autoplay(Splide2, Components2, options) {
  const { on, bind, emit } = EventInterface$1(Splide2);
  const interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, ">"), update);
  const { isPaused } = interval;
  const { Elements } = Components2;
  let hovered;
  let focused;
  let paused;
  function mount() {
    const { autoplay } = options;
    if (autoplay) {
      initButton(true);
      initButton(false);
      listen();
      if (autoplay !== "pause") {
        play();
      }
    }
  }
  function initButton(forPause) {
    const prop = forPause ? "pause" : "play";
    const button = Elements[prop];
    if (button) {
      setAttribute$1(button, ARIA_CONTROLS, Elements.track.id);
      setAttribute$1(button, ARIA_LABEL, options.i18n[prop]);
      bind(button, "click", forPause ? pause : play);
    }
  }
  function listen() {
    const { root } = Elements;
    if (options.pauseOnHover) {
      bind(root, "mouseenter mouseleave", (e) => {
        hovered = e.type === "mouseenter";
        autoToggle();
      });
    }
    if (options.pauseOnFocus) {
      bind(root, "focusin focusout", (e) => {
        focused = e.type === "focusin";
        autoToggle();
      });
    }
    on([EVENT_MOVE$1, EVENT_SCROLL$1, EVENT_REFRESH], interval.rewind);
    on(EVENT_MOVE$1, updateInterval);
  }
  function play() {
    if (isPaused() && Components2.Slides.isEnough()) {
      interval.start(!options.resetProgress);
      focused = hovered = paused = false;
      emit(EVENT_AUTOPLAY_PLAY);
    }
  }
  function pause(manual = true) {
    if (!isPaused()) {
      interval.pause();
      emit(EVENT_AUTOPLAY_PAUSE);
    }
    paused = manual;
  }
  function autoToggle() {
    if (!paused) {
      if (!hovered && !focused) {
        play();
      } else {
        pause(false);
      }
    }
  }
  function update(rate) {
    const { bar } = Elements;
    bar && style$1(bar, "width", `${rate * 100}%`);
    emit(EVENT_AUTOPLAY_PLAYING, rate);
  }
  function updateInterval() {
    const Slide = Components2.Slides.getAt(Splide2.index);
    interval.set(Slide && +getAttribute$1(Slide.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
  }
  return {
    mount,
    destroy: interval.cancel,
    play,
    pause,
    isPaused
  };
}

function Cover(Splide2, Components2, options) {
  const { on } = EventInterface$1(Splide2);
  function mount() {
    if (options.cover) {
      on(EVENT_LAZYLOAD_LOADED, (img, Slide) => {
        toggle(true, img, Slide);
      });
      on([EVENT_MOUNTED$1, EVENT_UPDATED, EVENT_REFRESH], apply.bind(null, true));
    }
  }
  function destroy() {
    apply(false);
  }
  function apply(cover) {
    Components2.Slides.forEach((Slide) => {
      const img = child$1(Slide.container || Slide.slide, "img");
      if (img && img.src) {
        toggle(cover, img, Slide);
      }
    });
  }
  function toggle(cover, img, Slide) {
    Slide.style("background", cover ? `center/cover no-repeat url("${img.src}")` : "", true);
    display$1(img, cover ? "none" : "");
  }
  return {
    mount,
    destroy
  };
}

const BOUNCE_DIFF_THRESHOLD = 10;
const BOUNCE_DURATION = 600;
const FRICTION_FACTOR = 0.6;
const BASE_VELOCITY = 1.5;
const MIN_DURATION = 800;

function Scroll(Splide2, Components2, options) {
  const { on, emit } = EventInterface$1(Splide2);
  const { Move } = Components2;
  const { getPosition, getLimit, exceededLimit } = Move;
  let interval;
  let scrollCallback;
  function mount() {
    on(EVENT_MOVE$1, clear);
    on([EVENT_UPDATED, EVENT_REFRESH], cancel);
  }
  function scroll(destination, duration, callback, suppressConstraint) {
    const start = getPosition();
    let friction = 1;
    duration = duration || computeDuration(abs$1(destination - start));
    scrollCallback = callback;
    clear();
    interval = RequestInterval(duration, onScrolled, (rate) => {
      const position = getPosition();
      const target = start + (destination - start) * easing(rate);
      const diff = (target - getPosition()) * friction;
      Move.translate(position + diff);
      if (Splide2.is(SLIDE) && !suppressConstraint && exceededLimit()) {
        friction *= FRICTION_FACTOR;
        if (abs$1(diff) < BOUNCE_DIFF_THRESHOLD) {
          bounce(exceededLimit(false));
        }
      }
    }, 1);
    emit(EVENT_SCROLL$1);
    interval.start();
  }
  function bounce(backwards) {
    scroll(getLimit(!backwards), BOUNCE_DURATION, null, true);
  }
  function onScrolled() {
    const position = getPosition();
    const index = Move.toIndex(position);
    if (!between(index, 0, Splide2.length - 1)) {
      Move.translate(Move.shift(position, index > 0), true);
    }
    scrollCallback && scrollCallback();
    emit(EVENT_SCROLLED$1);
  }
  function computeDuration(distance) {
    return max$1(distance / BASE_VELOCITY, MIN_DURATION);
  }
  function clear() {
    if (interval) {
      interval.cancel();
    }
  }
  function cancel() {
    if (interval && !interval.isPaused()) {
      clear();
      onScrolled();
    }
  }
  function easing(t) {
    const { easingFunc } = options;
    return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
  }
  return {
    mount,
    destroy: clear,
    scroll,
    cancel
  };
}

const SCROLL_LISTENER_OPTIONS = { passive: false, capture: true };

const FRICTION = 5;
const LOG_INTERVAL = 200;
const POINTER_DOWN_EVENTS = "touchstart mousedown";
const POINTER_MOVE_EVENTS = "touchmove mousemove";
const POINTER_UP_EVENTS = "touchend touchcancel mouseup";

function Drag(Splide2, Components2, options) {
  const { on, emit, bind, unbind } = EventInterface$1(Splide2);
  const { Move, Scroll, Controller } = Components2;
  const { track } = Components2.Elements;
  const { resolve, orient } = Components2.Direction;
  const { getPosition, exceededLimit } = Move;
  let basePosition;
  let baseEvent;
  let prevBaseEvent;
  let lastEvent;
  let isFree;
  let dragging;
  let hasExceeded = false;
  let clickPrevented;
  let disabled;
  let target;
  function mount() {
    bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
    bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
    bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
    bind(track, "click", onClick, { capture: true });
    bind(track, "dragstart", prevent);
    on([EVENT_MOUNTED$1, EVENT_UPDATED], init);
  }
  function init() {
    const { drag } = options;
    disable(!drag);
    isFree = drag === "free";
  }
  function onPointerDown(e) {
    if (!disabled) {
      const { noDrag } = options;
      const isTouch = isTouchEvent(e);
      const isDraggable = !noDrag || !matches$1(e.target, noDrag);
      clickPrevented = false;
      if (isDraggable && (isTouch || !e.button)) {
        if (!Move.isBusy()) {
          target = isTouch ? track : window;
          prevBaseEvent = null;
          lastEvent = null;
          bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
          bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
          Move.cancel();
          Scroll.cancel();
          save(e);
        } else {
          prevent(e, true);
        }
      }
    }
  }
  function onPointerMove(e) {
    if (!lastEvent) {
      emit(EVENT_DRAG$1);
    }
    lastEvent = e;
    if (e.cancelable) {
      const diff = coordOf(e) - coordOf(baseEvent);
      if (dragging) {
        Move.translate(basePosition + constrain(diff));
        const expired = timeOf(e) - timeOf(baseEvent) > LOG_INTERVAL;
        const exceeded = hasExceeded !== (hasExceeded = exceededLimit());
        if (expired || exceeded) {
          save(e);
        }
        emit(EVENT_DRAGGING$1);
        clickPrevented = true;
        prevent(e);
      } else {
        let { dragMinThreshold: thresholds } = options;
        thresholds = isObject$1(thresholds) ? thresholds : { mouse: 0, touch: +thresholds || 10 };
        dragging = abs$1(diff) > (isTouchEvent(e) ? thresholds.touch : thresholds.mouse);
        if (isSliderDirection()) {
          prevent(e);
        }
      }
    }
  }
  function onPointerUp(e) {
    unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
    unbind(target, POINTER_UP_EVENTS, onPointerUp);
    const { index } = Splide2;
    if (lastEvent) {
      if (dragging || e.cancelable && isSliderDirection()) {
        const velocity = computeVelocity(e);
        const destination = computeDestination(velocity);
        if (isFree) {
          Controller.scroll(destination);
        } else if (Splide2.is(FADE)) {
          Controller.go(index + orient(sign(velocity)));
        } else {
          Controller.go(Controller.toDest(destination), true);
        }
        prevent(e);
      }
      emit(EVENT_DRAGGED);
    } else {
      if (!isFree && getPosition() !== Move.toPosition(index)) {
        Controller.go(index, true);
      }
    }
    dragging = false;
  }
  function save(e) {
    prevBaseEvent = baseEvent;
    baseEvent = e;
    basePosition = getPosition();
  }
  function onClick(e) {
    if (!disabled && clickPrevented) {
      prevent(e, true);
    }
  }
  function isSliderDirection() {
    const diffX = abs$1(coordOf(lastEvent) - coordOf(baseEvent));
    const diffY = abs$1(coordOf(lastEvent, true) - coordOf(baseEvent, true));
    return diffX > diffY;
  }
  function computeVelocity(e) {
    if (Splide2.is(LOOP) || !hasExceeded) {
      const base = baseEvent === lastEvent && prevBaseEvent || baseEvent;
      const diffCoord = coordOf(lastEvent) - coordOf(base);
      const diffTime = timeOf(e) - timeOf(base);
      const isFlick = timeOf(e) - timeOf(lastEvent) < LOG_INTERVAL;
      if (diffTime && isFlick) {
        return diffCoord / diffTime;
      }
    }
    return 0;
  }
  function computeDestination(velocity) {
    return getPosition() + sign(velocity) * min$1(abs$1(velocity) * (options.flickPower || 600), isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1));
  }
  function coordOf(e, orthogonal) {
    return (isTouchEvent(e) ? e.touches[0] : e)[`page${resolve(orthogonal ? "Y" : "X")}`];
  }
  function timeOf(e) {
    return e.timeStamp;
  }
  function constrain(diff) {
    return diff / (hasExceeded && Splide2.is(SLIDE) ? FRICTION : 1);
  }
  function isTouchEvent(e) {
    return typeof TouchEvent !== "undefined" && e instanceof TouchEvent;
  }
  function isDragging() {
    return dragging;
  }
  function disable(value) {
    disabled = value;
  }
  return {
    mount,
    disable,
    isDragging
  };
}

const IE_ARROW_KEYS = ["Left", "Right", "Up", "Down"];
const KEYBOARD_EVENT = "keydown";
function Keyboard(Splide2, Components2, options) {
  const { on, bind, unbind } = EventInterface$1(Splide2);
  const { root } = Splide2;
  const { resolve } = Components2.Direction;
  let target;
  let disabled;
  function mount() {
    init();
    on(EVENT_UPDATED, onUpdated);
    on(EVENT_MOVE$1, onMove);
  }
  function init() {
    const { keyboard } = options;
    if (keyboard) {
      if (keyboard === "focused") {
        target = root;
        setAttribute$1(root, TAB_INDEX, 0);
      } else {
        target = window;
      }
      bind(target, KEYBOARD_EVENT, onKeydown);
    }
  }
  function destroy() {
    unbind(target, KEYBOARD_EVENT);
    if (isHTMLElement$1(target)) {
      removeAttribute$1(target, TAB_INDEX);
    }
  }
  function disable(value) {
    disabled = value;
  }
  function onMove() {
    const _disabled = disabled;
    disabled = true;
    nextTick(() => {
      disabled = _disabled;
    });
  }
  function onUpdated() {
    destroy();
    init();
  }
  function onKeydown(e) {
    if (!disabled) {
      const { key } = e;
      const normalizedKey = includes(IE_ARROW_KEYS, key) ? `Arrow${key}` : key;
      if (normalizedKey === resolve("ArrowLeft")) {
        Splide2.go("<");
      } else if (normalizedKey === resolve("ArrowRight")) {
        Splide2.go(">");
      }
    }
  }
  return {
    mount,
    destroy,
    disable
  };
}

const SRC_DATA_ATTRIBUTE = `${DATA_ATTRIBUTE}-lazy`;
const SRCSET_DATA_ATTRIBUTE = `${SRC_DATA_ATTRIBUTE}-srcset`;
const IMAGE_SELECTOR = `[${SRC_DATA_ATTRIBUTE}], [${SRCSET_DATA_ATTRIBUTE}]`;

function LazyLoad(Splide2, Components2, options) {
  const { on, off, bind, emit } = EventInterface$1(Splide2);
  const isSequential = options.lazyLoad === "sequential";
  let images = [];
  let index = 0;
  function mount() {
    if (options.lazyLoad) {
      init();
      on(EVENT_REFRESH, refresh);
      if (!isSequential) {
        on([EVENT_MOUNTED$1, EVENT_REFRESH, EVENT_MOVED$1, EVENT_SCROLLED$1], observe);
      }
    }
  }
  function refresh() {
    destroy();
    init();
  }
  function init() {
    Components2.Slides.forEach((_Slide) => {
      queryAll$1(_Slide.slide, IMAGE_SELECTOR).forEach((_img) => {
        const src = getAttribute$1(_img, SRC_DATA_ATTRIBUTE);
        const srcset = getAttribute$1(_img, SRCSET_DATA_ATTRIBUTE);
        if (src !== _img.src || srcset !== _img.srcset) {
          const className = options.classes.spinner;
          const parent = _img.parentElement;
          const _spinner = child$1(parent, `.${className}`) || create$1("span", className, parent);
          setAttribute$1(_spinner, ROLE, "presentation");
          images.push({ _img, _Slide, src, srcset, _spinner });
          !_img.src && display$1(_img, "none");
        }
      });
    });
    if (isSequential) {
      loadNext();
    }
  }
  function destroy() {
    index = 0;
    images = [];
  }
  function observe() {
    images = images.filter((data) => {
      const distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
      if (data._Slide.isWithin(Splide2.index, distance)) {
        return load(data);
      }
      return true;
    });
    if (!images.length) {
      off(EVENT_MOVED$1);
    }
  }
  function load(data) {
    const { _img } = data;
    addClass$1(data._Slide.slide, CLASS_LOADING);
    bind(_img, "load error", (e) => {
      onLoad(data, e.type === "error");
    });
    ["srcset", "src"].forEach((name) => {
      if (data[name]) {
        setAttribute$1(_img, name, data[name]);
        removeAttribute$1(_img, name === "src" ? SRC_DATA_ATTRIBUTE : SRCSET_DATA_ATTRIBUTE);
      }
    });
  }
  function onLoad(data, error) {
    const { _Slide } = data;
    removeClass$1(_Slide.slide, CLASS_LOADING);
    if (!error) {
      remove$1(data._spinner);
      display$1(data._img, "");
      emit(EVENT_LAZYLOAD_LOADED, data._img, _Slide);
      emit(EVENT_RESIZE);
    }
    if (isSequential) {
      loadNext();
    }
  }
  function loadNext() {
    if (index < images.length) {
      load(images[index++]);
    }
  }
  return {
    mount,
    destroy
  };
}

function Pagination(Splide2, Components2, options) {
  const { on, emit, bind, unbind } = EventInterface$1(Splide2);
  const { Slides, Elements, Controller } = Components2;
  const { hasFocus, getIndex } = Controller;
  const items = [];
  let list;
  function mount() {
    init();
    on([EVENT_UPDATED, EVENT_REFRESH], init);
    on([EVENT_MOVE$1, EVENT_SCROLLED$1], update);
  }
  function init() {
    destroy();
    if (options.pagination && Slides.isEnough()) {
      createPagination();
      emit(EVENT_PAGINATION_MOUNTED, { list, items }, getAt(Splide2.index));
      update();
    }
  }
  function destroy() {
    if (list) {
      remove$1(list);
      items.forEach((item) => {
        unbind(item.button, "click");
      });
      empty(items);
      list = null;
    }
  }
  function createPagination() {
    const { length } = Splide2;
    const { classes, i18n, perPage } = options;
    const parent = options.pagination === "slider" && Elements.slider || Elements.root;
    const max = hasFocus() ? length : ceil$1(length / perPage);
    list = create$1("ul", classes.pagination, parent);
    for (let i = 0; i < max; i++) {
      const li = create$1("li", null, list);
      const button = create$1("button", { class: classes.page, type: "button" }, li);
      const controls = Slides.getIn(i).map((Slide) => Slide.slide.id);
      const text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
      bind(button, "click", onClick.bind(null, i));
      setAttribute$1(button, ARIA_CONTROLS, controls.join(" "));
      setAttribute$1(button, ARIA_LABEL, format(text, i + 1));
      items.push({ li, button, page: i });
    }
  }
  function onClick(page) {
    Controller.go(`>${page}`, true, () => {
      const Slide = Slides.getAt(Controller.toIndex(page));
      Slide && focus(Slide.slide);
    });
  }
  function getAt(index) {
    return items[Controller.toPage(index)];
  }
  function update() {
    const prev = getAt(getIndex(true));
    const curr = getAt(getIndex());
    if (prev) {
      removeClass$1(prev.button, CLASS_ACTIVE);
      removeAttribute$1(prev.button, ARIA_CURRENT);
    }
    if (curr) {
      addClass$1(curr.button, CLASS_ACTIVE);
      setAttribute$1(curr.button, ARIA_CURRENT, true);
    }
    emit(EVENT_PAGINATION_UPDATED, { list, items }, prev, curr);
  }
  return {
    items,
    mount,
    destroy,
    getAt,
    update
  };
}

const TRIGGER_KEYS = [" ", "Enter", "Spacebar"];
function Sync(Splide2, Components2, options) {
  const { list } = Components2.Elements;
  const events = [];
  function mount() {
    Splide2.splides.forEach((target) => {
      !target.isParent && sync(target.splide);
    });
    if (options.isNavigation) {
      navigate();
    }
  }
  function destroy() {
    removeAttribute$1(list, ALL_ATTRIBUTES);
    events.forEach((event) => {
      event.destroy();
    });
    empty(events);
  }
  function remount() {
    destroy();
    mount();
  }
  function sync(splide) {
    [Splide2, splide].forEach((instance) => {
      const event = EventInterface$1(instance);
      const target = instance === Splide2 ? splide : Splide2;
      event.on(EVENT_MOVE$1, (index, prev, dest) => {
        target.go(target.is(LOOP) ? dest : index);
      });
      events.push(event);
    });
  }
  function navigate() {
    const event = EventInterface$1(Splide2);
    const { on } = event;
    on(EVENT_CLICK, onClick);
    on(EVENT_SLIDE_KEYDOWN, onKeydown);
    on([EVENT_MOUNTED$1, EVENT_UPDATED], update);
    setAttribute$1(list, ROLE, "menu");
    events.push(event);
    event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
  }
  function update() {
    setAttribute$1(list, ARIA_ORIENTATION, options.direction !== TTB ? "horizontal" : null);
  }
  function onClick(Slide) {
    Splide2.go(Slide.index);
  }
  function onKeydown(Slide, e) {
    if (includes(TRIGGER_KEYS, e.key)) {
      onClick(Slide);
      prevent(e);
    }
  }
  return {
    mount,
    destroy,
    remount
  };
}

function Wheel(Splide2, Components2, options) {
  const { bind } = EventInterface$1(Splide2);
  function mount() {
    if (options.wheel) {
      bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
    }
  }
  function onWheel(e) {
    if (e.cancelable) {
      const { deltaY } = e;
      if (deltaY) {
        const backwards = deltaY < 0;
        Splide2.go(backwards ? "<" : ">");
        shouldPrevent(backwards) && prevent(e);
      }
    }
  }
  function shouldPrevent(backwards) {
    return !options.releaseWheel || Splide2.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
  }
  return {
    mount
  };
}

var ComponentConstructors = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Options: Options,
  Direction: Direction,
  Elements: Elements,
  Slides: Slides,
  Layout: Layout,
  Clones: Clones,
  Move: Move,
  Controller: Controller,
  Arrows: Arrows,
  Autoplay: Autoplay,
  Cover: Cover,
  Scroll: Scroll,
  Drag: Drag,
  Keyboard: Keyboard,
  LazyLoad: LazyLoad,
  Pagination: Pagination,
  Sync: Sync,
  Wheel: Wheel
});

const I18N = {
  prev: "Previous slide",
  next: "Next slide",
  first: "Go to first slide",
  last: "Go to last slide",
  slideX: "Go to slide %s",
  pageX: "Go to page %s",
  play: "Start autoplay",
  pause: "Pause autoplay"
};

const DEFAULTS = {
  type: "slide",
  speed: 400,
  waitForTransition: true,
  perPage: 1,
  cloneStatus: true,
  arrows: true,
  pagination: true,
  interval: 5e3,
  pauseOnHover: true,
  pauseOnFocus: true,
  resetProgress: true,
  keyboard: true,
  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
  drag: true,
  direction: "ltr",
  slideFocus: true,
  trimSpace: true,
  focusableNodes: "a, button, textarea, input, select, iframe",
  classes: CLASSES,
  i18n: I18N
};

function Fade(Splide2, Components2, options) {
  const { on } = EventInterface$1(Splide2);
  function mount() {
    on([EVENT_MOUNTED$1, EVENT_REFRESH], () => {
      nextTick(() => {
        Components2.Slides.style("transition", `opacity ${options.speed}ms ${options.easing}`);
      });
    });
  }
  function start(index, done) {
    const { track } = Components2.Elements;
    style$1(track, "height", unit(rect(track).height));
    nextTick(() => {
      done();
      style$1(track, "height", "");
    });
  }
  return {
    mount,
    start,
    cancel: noop
  };
}

function Slide(Splide2, Components2, options) {
  const { bind } = EventInterface$1(Splide2);
  const { Move, Controller } = Components2;
  const { list } = Components2.Elements;
  let endCallback;
  function mount() {
    bind(list, "transitionend", (e) => {
      if (e.target === list && endCallback) {
        cancel();
        endCallback();
      }
    });
  }
  function start(index, done) {
    const destination = Move.toPosition(index, true);
    const position = Move.getPosition();
    const speed = getSpeed(index);
    if (abs$1(destination - position) >= 1 && speed >= 1) {
      apply(`transform ${speed}ms ${options.easing}`);
      Move.translate(destination, true);
      endCallback = done;
    } else {
      Move.jump(index);
      done();
    }
  }
  function cancel() {
    apply("");
  }
  function getSpeed(index) {
    const { rewindSpeed } = options;
    if (Splide2.is(SLIDE) && rewindSpeed) {
      const prev = Controller.getIndex(true);
      const end = Controller.getEnd();
      if (prev === 0 && index >= end || prev >= end && index === 0) {
        return rewindSpeed;
      }
    }
    return options.speed;
  }
  function apply(transition) {
    style$1(list, "transition", transition);
  }
  return {
    mount,
    start,
    cancel
  };
}

const _Splide = class {
  constructor(target, options) {
    this.event = EventBus$1();
    this.Components = {};
    this.state = State$1(CREATED);
    this.splides = [];
    this._options = {};
    this._Extensions = {};
    const root = isString$1(target) ? query(document, target) : target;
    assert(root, `${root} is invalid.`);
    this.root = root;
    merge$1(DEFAULTS, _Splide.defaults);
    merge$1(merge$1(this._options, DEFAULTS), options || {});
  }
  mount(Extensions, Transition) {
    const { state, Components: Components2 } = this;
    assert(state.is([CREATED, DESTROYED]), "Already mounted!");
    state.set(CREATED);
    this._Components = Components2;
    this._Transition = Transition || this._Transition || (this.is(FADE) ? Fade : Slide);
    this._Extensions = Extensions || this._Extensions;
    const Constructors = assign$1({}, ComponentConstructors, this._Extensions, { Transition: this._Transition });
    forOwn$1(Constructors, (Component, key) => {
      const component = Component(this, Components2, this._options);
      Components2[key] = component;
      component.setup && component.setup();
    });
    forOwn$1(Components2, (component) => {
      component.mount && component.mount();
    });
    this.emit(EVENT_MOUNTED$1);
    addClass$1(this.root, CLASS_INITIALIZED);
    state.set(IDLE);
    this.emit(EVENT_READY);
    return this;
  }
  sync(splide) {
    this.splides.push({ splide });
    splide.splides.push({ splide: this, isParent: true });
    if (this.state.is(IDLE)) {
      this._Components.Sync.remount();
      splide.Components.Sync.remount();
    }
    return this;
  }
  go(control) {
    this._Components.Controller.go(control);
    return this;
  }
  on(events, callback) {
    this.event.on(events, callback, null, DEFAULT_USER_EVENT_PRIORITY);
    return this;
  }
  off(events) {
    this.event.off(events);
    return this;
  }
  emit(event) {
    this.event.emit(event, ...slice$1(arguments, 1));
    return this;
  }
  add(slides, index) {
    this._Components.Slides.add(slides, index);
    return this;
  }
  remove(matcher) {
    this._Components.Slides.remove(matcher);
    return this;
  }
  is(type) {
    return this._options.type === type;
  }
  refresh() {
    this.emit(EVENT_REFRESH);
    return this;
  }
  destroy(completely = true) {
    const { event, state } = this;
    if (state.is(CREATED)) {
      event.on(EVENT_READY, this.destroy.bind(this, completely), this);
    } else {
      forOwn$1(this._Components, (component) => {
        component.destroy && component.destroy(completely);
      }, true);
      event.emit(EVENT_DESTROY$1);
      event.destroy();
      completely && empty(this.splides);
      state.set(DESTROYED);
    }
    return this;
  }
  get options() {
    return this._options;
  }
  set options(options) {
    const { _options } = this;
    merge$1(_options, options);
    if (!this.state.is(CREATED)) {
      this.emit(EVENT_UPDATED, _options);
    }
  }
  get length() {
    return this._Components.Slides.getLength(true);
  }
  get index() {
    return this._Components.Controller.getIndex();
  }
};
let Splide = _Splide;
Splide.defaults = {};
Splide.STATES = STATES;

/*!
 * Splide.js
 * Version  : 0.6.8
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
// node_modules/@splidejs/splide/src/js/utils/type/type.ts
function isObject(subject) {
  return !isNull(subject) && typeof subject === "object";
}
function isArray(subject) {
  return Array.isArray(subject);
}
function isFunction(subject) {
  return typeof subject === "function";
}
function isString(subject) {
  return typeof subject === "string";
}
function isUndefined(subject) {
  return typeof subject === "undefined";
}
function isNull(subject) {
  return subject === null;
}
function isHTMLElement(subject) {
  return subject instanceof HTMLElement;
}

// node_modules/@splidejs/splide/src/js/utils/array/toArray/toArray.ts
function toArray(value) {
  return isArray(value) ? value : [value];
}

// node_modules/@splidejs/splide/src/js/utils/array/forEach/forEach.ts
function forEach(values, iteratee) {
  toArray(values).forEach(iteratee);
}

// node_modules/@splidejs/splide/src/js/utils/array/index.ts
var arrayProto = Array.prototype;

// node_modules/@splidejs/splide/src/js/utils/arrayLike/slice/slice.ts
function slice(arrayLike, start, end) {
  return arrayProto.slice.call(arrayLike, start, end);
}

// node_modules/@splidejs/splide/src/js/utils/arrayLike/find/find.ts
function find(arrayLike, predicate) {
  return slice(arrayLike).filter(predicate)[0];
}

// node_modules/@splidejs/splide/src/js/utils/dom/toggleClass/toggleClass.ts
function toggleClass(elm, classes, add) {
  if (elm) {
    forEach(classes, (name) => {
      if (name) {
        elm.classList[add ? "add" : "remove"](name);
      }
    });
  }
}

// node_modules/@splidejs/splide/src/js/utils/dom/addClass/addClass.ts
function addClass(elm, classes) {
  toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
}

// node_modules/@splidejs/splide/src/js/utils/dom/append/append.ts
function append(parent, children3) {
  forEach(children3, parent.appendChild.bind(parent));
}

// node_modules/@splidejs/splide/src/js/utils/dom/matches/matches.ts
function matches(elm, selector) {
  return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
}

// node_modules/@splidejs/splide/src/js/utils/dom/children/children.ts
function children(parent, selector) {
  return parent ? slice(parent.children).filter((child3) => matches(child3, selector)) : [];
}

// node_modules/@splidejs/splide/src/js/utils/dom/child/child.ts
function child(parent, selector) {
  return selector ? children(parent, selector)[0] : parent.firstElementChild;
}

// node_modules/@splidejs/splide/src/js/utils/object/forOwn/forOwn.ts
function forOwn(object, iteratee, right) {
  if (object) {
    let keys = Object.keys(object);
    keys = right ? keys.reverse() : keys;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== "__proto__") {
        if (iteratee(object[key], key) === false) {
          break;
        }
      }
    }
  }
  return object;
}

// node_modules/@splidejs/splide/src/js/utils/object/assign/assign.ts
function assign(object) {
  slice(arguments, 1).forEach((source) => {
    forOwn(source, (value, key) => {
      object[key] = source[key];
    });
  });
  return object;
}

// node_modules/@splidejs/splide/src/js/utils/object/merge/merge.ts
function merge(object, source) {
  forOwn(source, (value, key) => {
    if (isArray(value)) {
      object[key] = value.slice();
    } else if (isObject(value)) {
      object[key] = merge(isObject(object[key]) ? object[key] : {}, value);
    } else {
      object[key] = value;
    }
  });
  return object;
}

// node_modules/@splidejs/splide/src/js/utils/dom/removeAttribute/removeAttribute.ts
function removeAttribute(elm, attrs) {
  if (elm) {
    forEach(attrs, (attr) => {
      elm.removeAttribute(attr);
    });
  }
}

// node_modules/@splidejs/splide/src/js/utils/dom/setAttribute/setAttribute.ts
function setAttribute(elm, attrs, value) {
  if (isObject(attrs)) {
    forOwn(attrs, (value2, name) => {
      setAttribute(elm, name, value2);
    });
  } else {
    isNull(value) ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
  }
}

// node_modules/@splidejs/splide/src/js/utils/dom/create/create.ts
function create(tag, attrs, parent) {
  const elm = document.createElement(tag);
  if (attrs) {
    isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
  }
  parent && append(parent, elm);
  return elm;
}

// node_modules/@splidejs/splide/src/js/utils/dom/style/style.ts
function style(elm, prop, value) {
  if (isUndefined(value)) {
    return getComputedStyle(elm)[prop];
  }
  if (!isNull(value)) {
    const { style: style3 } = elm;
    value = `${value}`;
    if (style3[prop] !== value) {
      style3[prop] = value;
    }
  }
}

// node_modules/@splidejs/splide/src/js/utils/dom/display/display.ts
function display(elm, display3) {
  style(elm, "display", display3);
}

// node_modules/@splidejs/splide/src/js/utils/dom/getAttribute/getAttribute.ts
function getAttribute(elm, attr) {
  return elm.getAttribute(attr);
}

// node_modules/@splidejs/splide/src/js/utils/dom/remove/remove.ts
function remove(nodes) {
  forEach(nodes, (node) => {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}

// node_modules/@splidejs/splide/src/js/utils/dom/queryAll/queryAll.ts
function queryAll(parent, selector) {
  return slice(parent.querySelectorAll(selector));
}

// node_modules/@splidejs/splide/src/js/utils/dom/removeClass/removeClass.ts
function removeClass(elm, classes) {
  toggleClass(elm, classes, false);
}

// node_modules/@splidejs/splide/src/js/constants/project.ts
var PROJECT_CODE = "splide";

// node_modules/@splidejs/splide/src/js/utils/error/error/error.ts
function error(message) {
  console.error(`[${PROJECT_CODE}] ${message}`);
}

// node_modules/@splidejs/splide/src/js/utils/math/math/math.ts
var { min, max, floor, ceil, abs } = Math;

// node_modules/@splidejs/splide/src/js/utils/math/clamp/clamp.ts
function clamp(number, x, y) {
  const minimum = min(x, y);
  const maximum = max(x, y);
  return min(max(minimum, number), maximum);
}
var DEFAULT_EVENT_PRIORITY = 10;
function isArray2(subject) {
  return Array.isArray(subject);
}
function toArray2(value) {
  return isArray2(value) ? value : [value];
}
function forEach2(values, iteratee) {
  toArray2(values).forEach(iteratee);
}
function includes2(array, value) {
  return array.indexOf(value) > -1;
}
function push2(array, items) {
  array.push(...toArray2(items));
  return array;
}
var arrayProto2 = Array.prototype;
function slice2(arrayLike, start, end) {
  return arrayProto2.slice.call(arrayLike, start, end);
}
function forOwn2(object, iteratee, right) {
  if (object) {
    let keys = Object.keys(object);
    keys = right ? keys.reverse() : keys;
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      if (key !== "__proto__") {
        if (iteratee(object[key], key) === false) {
          break;
        }
      }
    }
  }
  return object;
}
function EventBus() {
  let handlers = {};
  function on(events, callback, key, priority = DEFAULT_EVENT_PRIORITY) {
    forEachEvent(events, (event, namespace) => {
      handlers[event] = handlers[event] || [];
      push2(handlers[event], {
        _event: event,
        _callback: callback,
        _namespace: namespace,
        _priority: priority,
        _key: key
      }).sort((handler1, handler2) => handler1._priority - handler2._priority);
    });
  }
  function off(events, key) {
    forEachEvent(events, (event, namespace) => {
      const eventHandlers = handlers[event];
      handlers[event] = eventHandlers && eventHandlers.filter((handler) => {
        return handler._key ? handler._key !== key : key || handler._namespace !== namespace;
      });
    });
  }
  function offBy(key) {
    forOwn2(handlers, (eventHandlers, event) => {
      off(event, key);
    });
  }
  function emit(event) {
    (handlers[event] || []).forEach((handler) => {
      handler._callback.apply(handler, slice2(arguments, 1));
    });
  }
  function destroy() {
    handlers = {};
  }
  function forEachEvent(events, iteratee) {
    toArray2(events).join(" ").split(" ").forEach((eventNS) => {
      const fragments = eventNS.split(".");
      iteratee(fragments[0], fragments[1]);
    });
  }
  return {
    on,
    off,
    offBy,
    emit,
    destroy
  };
}
var EVENT_MOUNTED = "mounted";
var EVENT_MOVE = "move";
var EVENT_MOVED = "moved";
var EVENT_DRAG = "drag";
var EVENT_DRAGGING = "dragging";
var EVENT_SCROLL = "scroll";
var EVENT_SCROLLED = "scrolled";
var EVENT_DESTROY = "destroy";
function EventInterface(Splide22) {
  const { event } = Splide22;
  const key = {};
  let listeners = [];
  function on(events, callback, priority) {
    event.on(events, callback, key, priority);
  }
  function off(events) {
    event.off(events, key);
  }
  function bind(targets, events, callback, options) {
    forEachEvent(targets, events, (target, event2) => {
      listeners.push([target, event2, callback, options]);
      target.addEventListener(event2, callback, options);
    });
  }
  function unbind(targets, events, callback) {
    forEachEvent(targets, events, (target, event2) => {
      listeners = listeners.filter((listener) => {
        if (listener[0] === target && listener[1] === event2 && (!callback || listener[2] === callback)) {
          target.removeEventListener(event2, listener[2], listener[3]);
          return false;
        }
        return true;
      });
    });
  }
  function forEachEvent(targets, events, iteratee) {
    forEach2(targets, (target) => {
      if (target) {
        events.split(" ").forEach(iteratee.bind(null, target));
      }
    });
  }
  function destroy() {
    listeners = listeners.filter((data) => unbind(data[0], data[1]));
    event.offBy(key);
  }
  event.on(EVENT_DESTROY, destroy, key);
  return {
    on,
    off,
    emit: event.emit,
    bind,
    unbind,
    destroy
  };
}
function State(initialState) {
  let state = initialState;
  function set(value) {
    state = value;
  }
  function is(states) {
    return includes2(toArray2(states), state);
  }
  return { set, is };
}

// src/js/constants/classes.ts
var CLASS_VIDEO = "splide__video";
var CLASS_VIDEO_WRAPPER = `${CLASS_VIDEO}__wrapper`;
var CLASS_VIDEO_PLAY_BUTTON = `${CLASS_VIDEO}__play`;
var CLASS_PLAYING = "is-playing";
var CLASS_VIDEO_DISABLED = "is-video-disabled";

// src/js/constants/data-attributes.ts
var YOUTUBE_DATA_ATTRIBUTE = "data-splide-youtube";
var VIMEO_DATA_ATTRIBUTE = "data-splide-vimeo";
var HTML_VIDEO__DATA_ATTRIBUTE = "data-splide-html-video";

// src/js/constants/defaults.ts
var DEFAULTS2 = {
  hideControls: false,
  loop: false,
  mute: false,
  volume: 0.2
};

// src/js/constants/events.ts
var EVENT_VIDEO_PLAY = "video:play";
var EVENT_VIDEO_PAUSE = "video:pause";
var EVENT_VIDEO_ENDED = "video:ended";
var EVENT_VIDEO_CLICK = "video:click";

// src/js/constants/states.ts
var NOT_INITIALIZED = 1;
var INITIALIZING = 2;
var INITIALIZED = 3;
var PENDING_PLAY = 4;
var IDLE2 = 5;
var LOADING = 6;
var PLAY_REQUEST_ABORTED = 7;
var PLAYING = 8;
var ERROR = 9;

// src/js/classes/AbstractVideoPlayer.ts
var AbstractVideoPlayer = class {
  constructor(target, videoId, options) {
    this.state = State(NOT_INITIALIZED);
    this.event = EventBus();
    this.target = target;
    this.videoId = videoId;
    this.options = options || {};
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onEnded = this.onEnded.bind(this);
    this.onPlayerReady = this.onPlayerReady.bind(this);
    this.onError = this.onError.bind(this);
  }
  on(events, callback) {
    this.event.on(events, callback);
  }
  play() {
    const { state } = this;
    if (state.is(ERROR)) {
      error("Can not play this video.");
      return;
    }
    this.event.emit("play");
    if (state.is(INITIALIZING)) {
      return state.set(PENDING_PLAY);
    }
    if (state.is(INITIALIZED)) {
      this.player = this.createPlayer(this.videoId);
      return state.set(PENDING_PLAY);
    }
    if (state.is([PENDING_PLAY, PLAYING])) {
      return;
    }
    if (state.is(IDLE2)) {
      state.set(LOADING);
      this.playVideo();
    }
  }
  pause() {
    const { state } = this;
    if (state.is(ERROR)) {
      return;
    }
    this.event.emit("pause");
    if (state.is(PENDING_PLAY)) {
      return state.set(INITIALIZING);
    }
    if (state.is(LOADING)) {
      return state.set(PLAY_REQUEST_ABORTED);
    }
    if (state.is(PLAYING)) {
      this.pauseVideo();
      this.state.set(IDLE2);
    }
  }
  destroy() {
    this.event.destroy();
  }
  onPlayerReady() {
    const { state } = this;
    const isPending = state.is(PENDING_PLAY);
    state.set(IDLE2);
    if (isPending) {
      this.play();
    }
  }
  onPlay() {
    const { state } = this;
    const aborted = state.is(PLAY_REQUEST_ABORTED);
    state.set(PLAYING);
    if (aborted) {
      this.pause();
    } else {
      this.event.emit("played");
    }
  }
  onPause() {
    this.state.set(IDLE2);
    this.event.emit("paused");
  }
  onEnded() {
    this.state.set(IDLE2);
    this.event.emit("ended");
  }
  onError() {
    this.state.set(ERROR);
  }
};

// src/js/players/html/HTMLVideoPlayer.ts
var HTMLVideoPlayer = class extends AbstractVideoPlayer {
  constructor(target, videoId, options = {}) {
    super(target, videoId, options);
    this.state.set(INITIALIZED);
  }
  createPlayer(videoId) {
    const { options, options: { playerOptions = {} } } = this;
    const player = create("video", { src: videoId }, this.target);
    const on = player.addEventListener.bind(player);
    assign(player, {
      controls: !options.hideControls,
      loop: options.loop,
      volume: clamp(options.volume, 0, 1),
      muted: options.mute
    }, playerOptions.htmlVideo || {});
    on("play", this.onPlay);
    on("pause", this.onPause);
    on("ended", this.onEnded);
    on("loadeddata", this.onPlayerReady);
    on("error", this.onError);
    return player;
  }
  playVideo() {
    this.player.play().catch(() => {
      if (this.state.is(PLAY_REQUEST_ABORTED)) {
        this.state.set(IDLE2);
      }
    });
  }
  pauseVideo() {
    this.player.pause();
  }
  destroy() {
    super.destroy();
    const { player } = this;
    const off = player.addEventListener.bind(player);
    off("play", this.onPlay);
    off("pause", this.onPause);
    off("ended", this.onEnded);
    off("loadeddata", this.onPlayerReady);
  }
};

// node_modules/@vimeo/player/dist/player.es.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor)
      descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps)
    _defineProperties(Constructor.prototype, protoProps);
  if (staticProps)
    _defineProperties(Constructor, staticProps);
  return Constructor;
}
var isNode = typeof global !== "undefined" && {}.toString.call(global) === "[object global]";
function getMethodName(prop, type) {
  if (prop.indexOf(type.toLowerCase()) === 0) {
    return prop;
  }
  return "".concat(type.toLowerCase()).concat(prop.substr(0, 1).toUpperCase()).concat(prop.substr(1));
}
function isDomElement(element) {
  return Boolean(element && element.nodeType === 1 && "nodeName" in element && element.ownerDocument && element.ownerDocument.defaultView);
}
function isInteger(value) {
  return !isNaN(parseFloat(value)) && isFinite(value) && Math.floor(value) == value;
}
function isVimeoUrl(url) {
  return /^(https?:)?\/\/((player|www)\.)?vimeo\.com(?=$|\/)/.test(url);
}
function getVimeoUrl() {
  var oEmbedParameters2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var id = oEmbedParameters2.id;
  var url = oEmbedParameters2.url;
  var idOrUrl = id || url;
  if (!idOrUrl) {
    throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");
  }
  if (isInteger(idOrUrl)) {
    return "https://vimeo.com/".concat(idOrUrl);
  }
  if (isVimeoUrl(idOrUrl)) {
    return idOrUrl.replace("http:", "https:");
  }
  if (id) {
    throw new TypeError("\u201C".concat(id, "\u201D is not a valid video id."));
  }
  throw new TypeError("\u201C".concat(idOrUrl, "\u201D is not a vimeo.com url."));
}
var arrayIndexOfSupport = typeof Array.prototype.indexOf !== "undefined";
var postMessageSupport = typeof window !== "undefined" && typeof window.postMessage !== "undefined";
if (!isNode && (!arrayIndexOfSupport || !postMessageSupport)) {
  throw new Error("Sorry, the Vimeo Player API is not available in this browser.");
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function createCommonjsModule(fn, module) {
  return module = { exports: {} }, fn(module, module.exports), module.exports;
}
(function(self2) {
  if (self2.WeakMap) {
    return;
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var hasDefine = Object.defineProperty && function() {
    try {
      return Object.defineProperty({}, "x", {
        value: 1
      }).x === 1;
    } catch (e) {
    }
  }();
  var defineProperty = function(object, name, value) {
    if (hasDefine) {
      Object.defineProperty(object, name, {
        configurable: true,
        writable: true,
        value
      });
    } else {
      object[name] = value;
    }
  };
  self2.WeakMap = function() {
    function WeakMap2() {
      if (this === void 0) {
        throw new TypeError("Constructor WeakMap requires 'new'");
      }
      defineProperty(this, "_id", genId("_WeakMap"));
      if (arguments.length > 0) {
        throw new TypeError("WeakMap iterable is not supported");
      }
    }
    defineProperty(WeakMap2.prototype, "delete", function(key) {
      checkInstance(this, "delete");
      if (!isObject3(key)) {
        return false;
      }
      var entry = key[this._id];
      if (entry && entry[0] === key) {
        delete key[this._id];
        return true;
      }
      return false;
    });
    defineProperty(WeakMap2.prototype, "get", function(key) {
      checkInstance(this, "get");
      if (!isObject3(key)) {
        return void 0;
      }
      var entry = key[this._id];
      if (entry && entry[0] === key) {
        return entry[1];
      }
      return void 0;
    });
    defineProperty(WeakMap2.prototype, "has", function(key) {
      checkInstance(this, "has");
      if (!isObject3(key)) {
        return false;
      }
      var entry = key[this._id];
      if (entry && entry[0] === key) {
        return true;
      }
      return false;
    });
    defineProperty(WeakMap2.prototype, "set", function(key, value) {
      checkInstance(this, "set");
      if (!isObject3(key)) {
        throw new TypeError("Invalid value used as weak map key");
      }
      var entry = key[this._id];
      if (entry && entry[0] === key) {
        entry[1] = value;
        return this;
      }
      defineProperty(key, this._id, [key, value]);
      return this;
    });
    function checkInstance(x, methodName) {
      if (!isObject3(x) || !hasOwnProperty.call(x, "_id")) {
        throw new TypeError(methodName + " method called on incompatible receiver " + typeof x);
      }
    }
    function genId(prefix) {
      return prefix + "_" + rand() + "." + rand();
    }
    function rand() {
      return Math.random().toString().substring(2);
    }
    defineProperty(WeakMap2, "_polyfill", true);
    return WeakMap2;
  }();
  function isObject3(x) {
    return Object(x) === x;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : commonjsGlobal);
var npo_src = createCommonjsModule(function(module) {
  (function UMD(name, context, definition) {
    context[name] = context[name] || definition();
    if (module.exports) {
      module.exports = context[name];
    }
  })("Promise", typeof commonjsGlobal != "undefined" ? commonjsGlobal : commonjsGlobal, function DEF() {
    var builtInProp, cycle, scheduling_queue, ToString = Object.prototype.toString, timer = typeof setImmediate != "undefined" ? function timer2(fn) {
      return setImmediate(fn);
    } : setTimeout;
    try {
      Object.defineProperty({}, "x", {});
      builtInProp = function builtInProp2(obj, name, val, config) {
        return Object.defineProperty(obj, name, {
          value: val,
          writable: true,
          configurable: config !== false
        });
      };
    } catch (err) {
      builtInProp = function builtInProp2(obj, name, val) {
        obj[name] = val;
        return obj;
      };
    }
    scheduling_queue = function Queue() {
      var first, last, item;
      function Item(fn, self2) {
        this.fn = fn;
        this.self = self2;
        this.next = void 0;
      }
      return {
        add: function add(fn, self2) {
          item = new Item(fn, self2);
          if (last) {
            last.next = item;
          } else {
            first = item;
          }
          last = item;
          item = void 0;
        },
        drain: function drain() {
          var f = first;
          first = last = cycle = void 0;
          while (f) {
            f.fn.call(f.self);
            f = f.next;
          }
        }
      };
    }();
    function schedule(fn, self2) {
      scheduling_queue.add(fn, self2);
      if (!cycle) {
        cycle = timer(scheduling_queue.drain);
      }
    }
    function isThenable(o) {
      var _then, o_type = typeof o;
      if (o != null && (o_type == "object" || o_type == "function")) {
        _then = o.then;
      }
      return typeof _then == "function" ? _then : false;
    }
    function notify() {
      for (var i = 0; i < this.chain.length; i++) {
        notifyIsolated(this, this.state === 1 ? this.chain[i].success : this.chain[i].failure, this.chain[i]);
      }
      this.chain.length = 0;
    }
    function notifyIsolated(self2, cb, chain) {
      var ret, _then;
      try {
        if (cb === false) {
          chain.reject(self2.msg);
        } else {
          if (cb === true) {
            ret = self2.msg;
          } else {
            ret = cb.call(void 0, self2.msg);
          }
          if (ret === chain.promise) {
            chain.reject(TypeError("Promise-chain cycle"));
          } else if (_then = isThenable(ret)) {
            _then.call(ret, chain.resolve, chain.reject);
          } else {
            chain.resolve(ret);
          }
        }
      } catch (err) {
        chain.reject(err);
      }
    }
    function resolve(msg) {
      var _then, self2 = this;
      if (self2.triggered) {
        return;
      }
      self2.triggered = true;
      if (self2.def) {
        self2 = self2.def;
      }
      try {
        if (_then = isThenable(msg)) {
          schedule(function() {
            var def_wrapper = new MakeDefWrapper(self2);
            try {
              _then.call(msg, function $resolve$() {
                resolve.apply(def_wrapper, arguments);
              }, function $reject$() {
                reject.apply(def_wrapper, arguments);
              });
            } catch (err) {
              reject.call(def_wrapper, err);
            }
          });
        } else {
          self2.msg = msg;
          self2.state = 1;
          if (self2.chain.length > 0) {
            schedule(notify, self2);
          }
        }
      } catch (err) {
        reject.call(new MakeDefWrapper(self2), err);
      }
    }
    function reject(msg) {
      var self2 = this;
      if (self2.triggered) {
        return;
      }
      self2.triggered = true;
      if (self2.def) {
        self2 = self2.def;
      }
      self2.msg = msg;
      self2.state = 2;
      if (self2.chain.length > 0) {
        schedule(notify, self2);
      }
    }
    function iteratePromises(Constructor, arr, resolver, rejecter) {
      for (var idx = 0; idx < arr.length; idx++) {
        (function IIFE(idx2) {
          Constructor.resolve(arr[idx2]).then(function $resolver$(msg) {
            resolver(idx2, msg);
          }, rejecter);
        })(idx);
      }
    }
    function MakeDefWrapper(self2) {
      this.def = self2;
      this.triggered = false;
    }
    function MakeDef(self2) {
      this.promise = self2;
      this.state = 0;
      this.triggered = false;
      this.chain = [];
      this.msg = void 0;
    }
    function Promise2(executor) {
      if (typeof executor != "function") {
        throw TypeError("Not a function");
      }
      if (this.__NPO__ !== 0) {
        throw TypeError("Not a promise");
      }
      this.__NPO__ = 1;
      var def = new MakeDef(this);
      this["then"] = function then(success, failure) {
        var o = {
          success: typeof success == "function" ? success : true,
          failure: typeof failure == "function" ? failure : false
        };
        o.promise = new this.constructor(function extractChain(resolve2, reject2) {
          if (typeof resolve2 != "function" || typeof reject2 != "function") {
            throw TypeError("Not a function");
          }
          o.resolve = resolve2;
          o.reject = reject2;
        });
        def.chain.push(o);
        if (def.state !== 0) {
          schedule(notify, def);
        }
        return o.promise;
      };
      this["catch"] = function $catch$(failure) {
        return this.then(void 0, failure);
      };
      try {
        executor.call(void 0, function publicResolve(msg) {
          resolve.call(def, msg);
        }, function publicReject(msg) {
          reject.call(def, msg);
        });
      } catch (err) {
        reject.call(def, err);
      }
    }
    var PromisePrototype = builtInProp({}, "constructor", Promise2, false);
    Promise2.prototype = PromisePrototype;
    builtInProp(PromisePrototype, "__NPO__", 0, false);
    builtInProp(Promise2, "resolve", function Promise$resolve(msg) {
      var Constructor = this;
      if (msg && typeof msg == "object" && msg.__NPO__ === 1) {
        return msg;
      }
      return new Constructor(function executor(resolve2, reject2) {
        if (typeof resolve2 != "function" || typeof reject2 != "function") {
          throw TypeError("Not a function");
        }
        resolve2(msg);
      });
    });
    builtInProp(Promise2, "reject", function Promise$reject(msg) {
      return new this(function executor(resolve2, reject2) {
        if (typeof resolve2 != "function" || typeof reject2 != "function") {
          throw TypeError("Not a function");
        }
        reject2(msg);
      });
    });
    builtInProp(Promise2, "all", function Promise$all(arr) {
      var Constructor = this;
      if (ToString.call(arr) != "[object Array]") {
        return Constructor.reject(TypeError("Not an array"));
      }
      if (arr.length === 0) {
        return Constructor.resolve([]);
      }
      return new Constructor(function executor(resolve2, reject2) {
        if (typeof resolve2 != "function" || typeof reject2 != "function") {
          throw TypeError("Not a function");
        }
        var len = arr.length, msgs = Array(len), count = 0;
        iteratePromises(Constructor, arr, function resolver(idx, msg) {
          msgs[idx] = msg;
          if (++count === len) {
            resolve2(msgs);
          }
        }, reject2);
      });
    });
    builtInProp(Promise2, "race", function Promise$race(arr) {
      var Constructor = this;
      if (ToString.call(arr) != "[object Array]") {
        return Constructor.reject(TypeError("Not an array"));
      }
      return new Constructor(function executor(resolve2, reject2) {
        if (typeof resolve2 != "function" || typeof reject2 != "function") {
          throw TypeError("Not a function");
        }
        iteratePromises(Constructor, arr, function resolver(idx, msg) {
          resolve2(msg);
        }, reject2);
      });
    });
    return Promise2;
  });
});
var callbackMap = /* @__PURE__ */ new WeakMap();
function storeCallback(player, name, callback) {
  var playerCallbacks = callbackMap.get(player.element) || {};
  if (!(name in playerCallbacks)) {
    playerCallbacks[name] = [];
  }
  playerCallbacks[name].push(callback);
  callbackMap.set(player.element, playerCallbacks);
}
function getCallbacks(player, name) {
  var playerCallbacks = callbackMap.get(player.element) || {};
  return playerCallbacks[name] || [];
}
function removeCallback(player, name, callback) {
  var playerCallbacks = callbackMap.get(player.element) || {};
  if (!playerCallbacks[name]) {
    return true;
  }
  if (!callback) {
    playerCallbacks[name] = [];
    callbackMap.set(player.element, playerCallbacks);
    return true;
  }
  var index = playerCallbacks[name].indexOf(callback);
  if (index !== -1) {
    playerCallbacks[name].splice(index, 1);
  }
  callbackMap.set(player.element, playerCallbacks);
  return playerCallbacks[name] && playerCallbacks[name].length === 0;
}
function shiftCallbacks(player, name) {
  var playerCallbacks = getCallbacks(player, name);
  if (playerCallbacks.length < 1) {
    return false;
  }
  var callback = playerCallbacks.shift();
  removeCallback(player, name, callback);
  return callback;
}
function swapCallbacks(oldElement, newElement) {
  var playerCallbacks = callbackMap.get(oldElement);
  callbackMap.set(newElement, playerCallbacks);
  callbackMap.delete(oldElement);
}
var oEmbedParameters = ["autopause", "autoplay", "background", "byline", "color", "controls", "dnt", "height", "id", "keyboard", "loop", "maxheight", "maxwidth", "muted", "playsinline", "portrait", "responsive", "speed", "texttrack", "title", "transparent", "url", "width"];
function getOEmbedParameters(element) {
  var defaults = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  return oEmbedParameters.reduce(function(params, param) {
    var value = element.getAttribute("data-vimeo-".concat(param));
    if (value || value === "") {
      params[param] = value === "" ? 1 : value;
    }
    return params;
  }, defaults);
}
function createEmbed(_ref, element) {
  var html = _ref.html;
  if (!element) {
    throw new TypeError("An element must be provided");
  }
  if (element.getAttribute("data-vimeo-initialized") !== null) {
    return element.querySelector("iframe");
  }
  var div = document.createElement("div");
  div.innerHTML = html;
  element.appendChild(div.firstChild);
  element.setAttribute("data-vimeo-initialized", "true");
  return element.querySelector("iframe");
}
function getOEmbedData(videoUrl) {
  var params = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var element = arguments.length > 2 ? arguments[2] : void 0;
  return new Promise(function(resolve, reject) {
    if (!isVimeoUrl(videoUrl)) {
      throw new TypeError("\u201C".concat(videoUrl, "\u201D is not a vimeo.com url."));
    }
    var url = "https://vimeo.com/api/oembed.json?url=".concat(encodeURIComponent(videoUrl));
    for (var param in params) {
      if (params.hasOwnProperty(param)) {
        url += "&".concat(param, "=").concat(encodeURIComponent(params[param]));
      }
    }
    var xhr = "XDomainRequest" in window ? new XDomainRequest() : new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function() {
      if (xhr.status === 404) {
        reject(new Error("\u201C".concat(videoUrl, "\u201D was not found.")));
        return;
      }
      if (xhr.status === 403) {
        reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
        return;
      }
      try {
        var json = JSON.parse(xhr.responseText);
        if (json.domain_status_code === 403) {
          createEmbed(json, element);
          reject(new Error("\u201C".concat(videoUrl, "\u201D is not embeddable.")));
          return;
        }
        resolve(json);
      } catch (error2) {
        reject(error2);
      }
    };
    xhr.onerror = function() {
      var status = xhr.status ? " (".concat(xhr.status, ")") : "";
      reject(new Error("There was an error fetching the embed code from Vimeo".concat(status, ".")));
    };
    xhr.send();
  });
}
function initializeEmbeds() {
  var parent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
  var elements = [].slice.call(parent.querySelectorAll("[data-vimeo-id], [data-vimeo-url]"));
  var handleError = function handleError2(error2) {
    if ("console" in window && console.error) {
      console.error("There was an error creating an embed: ".concat(error2));
    }
  };
  elements.forEach(function(element) {
    try {
      if (element.getAttribute("data-vimeo-defer") !== null) {
        return;
      }
      var params = getOEmbedParameters(element);
      var url = getVimeoUrl(params);
      getOEmbedData(url, params, element).then(function(data) {
        return createEmbed(data, element);
      }).catch(handleError);
    } catch (error2) {
      handleError(error2);
    }
  });
}
function resizeEmbeds() {
  var parent = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : document;
  if (window.VimeoPlayerResizeEmbeds_) {
    return;
  }
  window.VimeoPlayerResizeEmbeds_ = true;
  var onMessage = function onMessage2(event) {
    if (!isVimeoUrl(event.origin)) {
      return;
    }
    if (!event.data || event.data.event !== "spacechange") {
      return;
    }
    var iframes = parent.querySelectorAll("iframe");
    for (var i = 0; i < iframes.length; i++) {
      if (iframes[i].contentWindow !== event.source) {
        continue;
      }
      var space = iframes[i].parentElement;
      space.style.paddingBottom = "".concat(event.data.data[0].bottom, "px");
      break;
    }
  };
  window.addEventListener("message", onMessage);
}
function parseMessageData(data) {
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch (error2) {
      console.warn(error2);
      return {};
    }
  }
  return data;
}
function postMessage(player, method, params) {
  if (!player.element.contentWindow || !player.element.contentWindow.postMessage) {
    return;
  }
  var message = {
    method
  };
  if (params !== void 0) {
    message.value = params;
  }
  var ieVersion = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"));
  if (ieVersion >= 8 && ieVersion < 10) {
    message = JSON.stringify(message);
  }
  player.element.contentWindow.postMessage(message, player.origin);
}
function processData(player, data) {
  data = parseMessageData(data);
  var callbacks = [];
  var param;
  if (data.event) {
    if (data.event === "error") {
      var promises = getCallbacks(player, data.data.method);
      promises.forEach(function(promise) {
        var error2 = new Error(data.data.message);
        error2.name = data.data.name;
        promise.reject(error2);
        removeCallback(player, data.data.method, promise);
      });
    }
    callbacks = getCallbacks(player, "event:".concat(data.event));
    param = data.data;
  } else if (data.method) {
    var callback = shiftCallbacks(player, data.method);
    if (callback) {
      callbacks.push(callback);
      param = data.value;
    }
  }
  callbacks.forEach(function(callback2) {
    try {
      if (typeof callback2 === "function") {
        callback2.call(player, param);
        return;
      }
      callback2.resolve(param);
    } catch (e) {
    }
  });
}
function initializeScreenfull() {
  var fn = function() {
    var val;
    var fnMap = [
      ["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"],
      ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"],
      ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"],
      ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"],
      ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]
    ];
    var i = 0;
    var l = fnMap.length;
    var ret = {};
    for (; i < l; i++) {
      val = fnMap[i];
      if (val && val[1] in document) {
        for (i = 0; i < val.length; i++) {
          ret[fnMap[0][i]] = val[i];
        }
        return ret;
      }
    }
    return false;
  }();
  var eventNameMap = {
    fullscreenchange: fn.fullscreenchange,
    fullscreenerror: fn.fullscreenerror
  };
  var screenfull2 = {
    request: function request(element) {
      return new Promise(function(resolve, reject) {
        var onFullScreenEntered = function onFullScreenEntered2() {
          screenfull2.off("fullscreenchange", onFullScreenEntered2);
          resolve();
        };
        screenfull2.on("fullscreenchange", onFullScreenEntered);
        element = element || document.documentElement;
        var returnPromise = element[fn.requestFullscreen]();
        if (returnPromise instanceof Promise) {
          returnPromise.then(onFullScreenEntered).catch(reject);
        }
      });
    },
    exit: function exit() {
      return new Promise(function(resolve, reject) {
        if (!screenfull2.isFullscreen) {
          resolve();
          return;
        }
        var onFullScreenExit = function onFullScreenExit2() {
          screenfull2.off("fullscreenchange", onFullScreenExit2);
          resolve();
        };
        screenfull2.on("fullscreenchange", onFullScreenExit);
        var returnPromise = document[fn.exitFullscreen]();
        if (returnPromise instanceof Promise) {
          returnPromise.then(onFullScreenExit).catch(reject);
        }
      });
    },
    on: function on(event, callback) {
      var eventName = eventNameMap[event];
      if (eventName) {
        document.addEventListener(eventName, callback);
      }
    },
    off: function off(event, callback) {
      var eventName = eventNameMap[event];
      if (eventName) {
        document.removeEventListener(eventName, callback);
      }
    }
  };
  Object.defineProperties(screenfull2, {
    isFullscreen: {
      get: function get() {
        return Boolean(document[fn.fullscreenElement]);
      }
    },
    element: {
      enumerable: true,
      get: function get() {
        return document[fn.fullscreenElement];
      }
    },
    isEnabled: {
      enumerable: true,
      get: function get() {
        return Boolean(document[fn.fullscreenEnabled]);
      }
    }
  });
  return screenfull2;
}
var playerMap = /* @__PURE__ */ new WeakMap();
var readyMap = /* @__PURE__ */ new WeakMap();
var screenfull = {};
var Player = /* @__PURE__ */ function() {
  function Player3(element) {
    var _this = this;
    var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    _classCallCheck(this, Player3);
    if (window.jQuery && element instanceof jQuery) {
      if (element.length > 1 && window.console && console.warn) {
        console.warn("A jQuery object with multiple elements was passed, using the first element.");
      }
      element = element[0];
    }
    if (typeof document !== "undefined" && typeof element === "string") {
      element = document.getElementById(element);
    }
    if (!isDomElement(element)) {
      throw new TypeError("You must pass either a valid element or a valid id.");
    }
    if (element.nodeName !== "IFRAME") {
      var iframe = element.querySelector("iframe");
      if (iframe) {
        element = iframe;
      }
    }
    if (element.nodeName === "IFRAME" && !isVimeoUrl(element.getAttribute("src") || "")) {
      throw new Error("The player element passed isn\u2019t a Vimeo embed.");
    }
    if (playerMap.has(element)) {
      return playerMap.get(element);
    }
    this._window = element.ownerDocument.defaultView;
    this.element = element;
    this.origin = "*";
    var readyPromise = new npo_src(function(resolve, reject) {
      _this._onMessage = function(event) {
        if (!isVimeoUrl(event.origin) || _this.element.contentWindow !== event.source) {
          return;
        }
        if (_this.origin === "*") {
          _this.origin = event.origin;
        }
        var data = parseMessageData(event.data);
        var isError = data && data.event === "error";
        var isReadyError = isError && data.data && data.data.method === "ready";
        if (isReadyError) {
          var error2 = new Error(data.data.message);
          error2.name = data.data.name;
          reject(error2);
          return;
        }
        var isReadyEvent = data && data.event === "ready";
        var isPingResponse = data && data.method === "ping";
        if (isReadyEvent || isPingResponse) {
          _this.element.setAttribute("data-ready", "true");
          resolve();
          return;
        }
        processData(_this, data);
      };
      _this._window.addEventListener("message", _this._onMessage);
      if (_this.element.nodeName !== "IFRAME") {
        var params = getOEmbedParameters(element, options);
        var url = getVimeoUrl(params);
        getOEmbedData(url, params, element).then(function(data) {
          var iframe2 = createEmbed(data, element);
          _this.element = iframe2;
          _this._originalElement = element;
          swapCallbacks(element, iframe2);
          playerMap.set(_this.element, _this);
          return data;
        }).catch(reject);
      }
    });
    readyMap.set(this, readyPromise);
    playerMap.set(this.element, this);
    if (this.element.nodeName === "IFRAME") {
      postMessage(this, "ping");
    }
    if (screenfull.isEnabled) {
      var exitFullscreen = function exitFullscreen2() {
        return screenfull.exit();
      };
      this.fullscreenchangeHandler = function() {
        if (screenfull.isFullscreen) {
          storeCallback(_this, "event:exitFullscreen", exitFullscreen);
        } else {
          removeCallback(_this, "event:exitFullscreen", exitFullscreen);
        }
        _this.ready().then(function() {
          postMessage(_this, "fullscreenchange", screenfull.isFullscreen);
        });
      };
      screenfull.on("fullscreenchange", this.fullscreenchangeHandler);
    }
    return this;
  }
  _createClass(Player3, [{
    key: "callMethod",
    value: function callMethod(name) {
      var _this2 = this;
      var args = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return new npo_src(function(resolve, reject) {
        return _this2.ready().then(function() {
          storeCallback(_this2, name, {
            resolve,
            reject
          });
          postMessage(_this2, name, args);
        }).catch(reject);
      });
    }
  }, {
    key: "get",
    value: function get(name) {
      var _this3 = this;
      return new npo_src(function(resolve, reject) {
        name = getMethodName(name, "get");
        return _this3.ready().then(function() {
          storeCallback(_this3, name, {
            resolve,
            reject
          });
          postMessage(_this3, name);
        }).catch(reject);
      });
    }
  }, {
    key: "set",
    value: function set(name, value) {
      var _this4 = this;
      return new npo_src(function(resolve, reject) {
        name = getMethodName(name, "set");
        if (value === void 0 || value === null) {
          throw new TypeError("There must be a value to set.");
        }
        return _this4.ready().then(function() {
          storeCallback(_this4, name, {
            resolve,
            reject
          });
          postMessage(_this4, name, value);
        }).catch(reject);
      });
    }
  }, {
    key: "on",
    value: function on(eventName, callback) {
      if (!eventName) {
        throw new TypeError("You must pass an event name.");
      }
      if (!callback) {
        throw new TypeError("You must pass a callback function.");
      }
      if (typeof callback !== "function") {
        throw new TypeError("The callback must be a function.");
      }
      var callbacks = getCallbacks(this, "event:".concat(eventName));
      if (callbacks.length === 0) {
        this.callMethod("addEventListener", eventName).catch(function() {
        });
      }
      storeCallback(this, "event:".concat(eventName), callback);
    }
  }, {
    key: "off",
    value: function off(eventName, callback) {
      if (!eventName) {
        throw new TypeError("You must pass an event name.");
      }
      if (callback && typeof callback !== "function") {
        throw new TypeError("The callback must be a function.");
      }
      var lastCallback = removeCallback(this, "event:".concat(eventName), callback);
      if (lastCallback) {
        this.callMethod("removeEventListener", eventName).catch(function(e) {
        });
      }
    }
  }, {
    key: "loadVideo",
    value: function loadVideo(options) {
      return this.callMethod("loadVideo", options);
    }
  }, {
    key: "ready",
    value: function ready() {
      var readyPromise = readyMap.get(this) || new npo_src(function(resolve, reject) {
        reject(new Error("Unknown player. Probably unloaded."));
      });
      return npo_src.resolve(readyPromise);
    }
  }, {
    key: "addCuePoint",
    value: function addCuePoint(time) {
      var data = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      return this.callMethod("addCuePoint", {
        time,
        data
      });
    }
  }, {
    key: "removeCuePoint",
    value: function removeCuePoint(id) {
      return this.callMethod("removeCuePoint", id);
    }
  }, {
    key: "enableTextTrack",
    value: function enableTextTrack(language, kind) {
      if (!language) {
        throw new TypeError("You must pass a language.");
      }
      return this.callMethod("enableTextTrack", {
        language,
        kind
      });
    }
  }, {
    key: "disableTextTrack",
    value: function disableTextTrack() {
      return this.callMethod("disableTextTrack");
    }
  }, {
    key: "pause",
    value: function pause() {
      return this.callMethod("pause");
    }
  }, {
    key: "play",
    value: function play() {
      return this.callMethod("play");
    }
  }, {
    key: "requestFullscreen",
    value: function requestFullscreen() {
      if (screenfull.isEnabled) {
        return screenfull.request(this.element);
      }
      return this.callMethod("requestFullscreen");
    }
  }, {
    key: "exitFullscreen",
    value: function exitFullscreen() {
      if (screenfull.isEnabled) {
        return screenfull.exit();
      }
      return this.callMethod("exitFullscreen");
    }
  }, {
    key: "getFullscreen",
    value: function getFullscreen() {
      if (screenfull.isEnabled) {
        return npo_src.resolve(screenfull.isFullscreen);
      }
      return this.get("fullscreen");
    }
  }, {
    key: "requestPictureInPicture",
    value: function requestPictureInPicture() {
      return this.callMethod("requestPictureInPicture");
    }
  }, {
    key: "exitPictureInPicture",
    value: function exitPictureInPicture() {
      return this.callMethod("exitPictureInPicture");
    }
  }, {
    key: "getPictureInPicture",
    value: function getPictureInPicture() {
      return this.get("pictureInPicture");
    }
  }, {
    key: "unload",
    value: function unload() {
      return this.callMethod("unload");
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this5 = this;
      return new npo_src(function(resolve) {
        readyMap.delete(_this5);
        playerMap.delete(_this5.element);
        if (_this5._originalElement) {
          playerMap.delete(_this5._originalElement);
          _this5._originalElement.removeAttribute("data-vimeo-initialized");
        }
        if (_this5.element && _this5.element.nodeName === "IFRAME" && _this5.element.parentNode) {
          if (_this5.element.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== _this5.element.parentNode) {
            _this5.element.parentNode.parentNode.removeChild(_this5.element.parentNode);
          } else {
            _this5.element.parentNode.removeChild(_this5.element);
          }
        }
        if (_this5.element && _this5.element.nodeName === "DIV" && _this5.element.parentNode) {
          _this5.element.removeAttribute("data-vimeo-initialized");
          var iframe = _this5.element.querySelector("iframe");
          if (iframe && iframe.parentNode) {
            if (iframe.parentNode.parentNode && _this5._originalElement && _this5._originalElement !== iframe.parentNode) {
              iframe.parentNode.parentNode.removeChild(iframe.parentNode);
            } else {
              iframe.parentNode.removeChild(iframe);
            }
          }
        }
        _this5._window.removeEventListener("message", _this5._onMessage);
        if (screenfull.isEnabled) {
          screenfull.off("fullscreenchange", _this5.fullscreenchangeHandler);
        }
        resolve();
      });
    }
  }, {
    key: "getAutopause",
    value: function getAutopause() {
      return this.get("autopause");
    }
  }, {
    key: "setAutopause",
    value: function setAutopause(autopause) {
      return this.set("autopause", autopause);
    }
  }, {
    key: "getBuffered",
    value: function getBuffered() {
      return this.get("buffered");
    }
  }, {
    key: "getCameraProps",
    value: function getCameraProps() {
      return this.get("cameraProps");
    }
  }, {
    key: "setCameraProps",
    value: function setCameraProps(camera) {
      return this.set("cameraProps", camera);
    }
  }, {
    key: "getChapters",
    value: function getChapters() {
      return this.get("chapters");
    }
  }, {
    key: "getCurrentChapter",
    value: function getCurrentChapter() {
      return this.get("currentChapter");
    }
  }, {
    key: "getColor",
    value: function getColor() {
      return this.get("color");
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      return this.set("color", color);
    }
  }, {
    key: "getCuePoints",
    value: function getCuePoints() {
      return this.get("cuePoints");
    }
  }, {
    key: "getCurrentTime",
    value: function getCurrentTime() {
      return this.get("currentTime");
    }
  }, {
    key: "setCurrentTime",
    value: function setCurrentTime(currentTime) {
      return this.set("currentTime", currentTime);
    }
  }, {
    key: "getDuration",
    value: function getDuration() {
      return this.get("duration");
    }
  }, {
    key: "getEnded",
    value: function getEnded() {
      return this.get("ended");
    }
  }, {
    key: "getLoop",
    value: function getLoop() {
      return this.get("loop");
    }
  }, {
    key: "setLoop",
    value: function setLoop(loop) {
      return this.set("loop", loop);
    }
  }, {
    key: "setMuted",
    value: function setMuted(muted) {
      return this.set("muted", muted);
    }
  }, {
    key: "getMuted",
    value: function getMuted() {
      return this.get("muted");
    }
  }, {
    key: "getPaused",
    value: function getPaused() {
      return this.get("paused");
    }
  }, {
    key: "getPlaybackRate",
    value: function getPlaybackRate() {
      return this.get("playbackRate");
    }
  }, {
    key: "setPlaybackRate",
    value: function setPlaybackRate(playbackRate) {
      return this.set("playbackRate", playbackRate);
    }
  }, {
    key: "getPlayed",
    value: function getPlayed() {
      return this.get("played");
    }
  }, {
    key: "getQualities",
    value: function getQualities() {
      return this.get("qualities");
    }
  }, {
    key: "getQuality",
    value: function getQuality() {
      return this.get("quality");
    }
  }, {
    key: "setQuality",
    value: function setQuality(quality) {
      return this.set("quality", quality);
    }
  }, {
    key: "getSeekable",
    value: function getSeekable() {
      return this.get("seekable");
    }
  }, {
    key: "getSeeking",
    value: function getSeeking() {
      return this.get("seeking");
    }
  }, {
    key: "getTextTracks",
    value: function getTextTracks() {
      return this.get("textTracks");
    }
  }, {
    key: "getVideoEmbedCode",
    value: function getVideoEmbedCode() {
      return this.get("videoEmbedCode");
    }
  }, {
    key: "getVideoId",
    value: function getVideoId() {
      return this.get("videoId");
    }
  }, {
    key: "getVideoTitle",
    value: function getVideoTitle() {
      return this.get("videoTitle");
    }
  }, {
    key: "getVideoWidth",
    value: function getVideoWidth() {
      return this.get("videoWidth");
    }
  }, {
    key: "getVideoHeight",
    value: function getVideoHeight() {
      return this.get("videoHeight");
    }
  }, {
    key: "getVideoUrl",
    value: function getVideoUrl() {
      return this.get("videoUrl");
    }
  }, {
    key: "getVolume",
    value: function getVolume() {
      return this.get("volume");
    }
  }, {
    key: "setVolume",
    value: function setVolume(volume) {
      return this.set("volume", volume);
    }
  }]);
  return Player3;
}();
if (!isNode) {
  screenfull = initializeScreenfull();
  initializeEmbeds();
  resizeEmbeds();
}
var player_es_default = Player;

// src/js/players/vimeo/VimeoPlayer.ts
var VimeoPlayer = class extends AbstractVideoPlayer {
  constructor(target, videoId, options = {}) {
    super(target, videoId, options);
    this.state.set(INITIALIZED);
  }
  createPlayer(videoId) {
    const { options, options: { playerOptions = {} } } = this;
    const vimeoOptions = videoId.indexOf("http") === 0 ? { url: videoId } : { id: +videoId };
    const player = new player_es_default(this.target, assign(vimeoOptions, {
      controls: !options.hideControls,
      loop: options.loop,
      muted: options.mute
    }, playerOptions.vimeo || {}));
    player.on("play", this.onPlay);
    player.on("pause", this.onPause);
    player.on("ended", this.onEnded);
    player.ready().then(this.onPlayerReady, this.onError);
    if (!player.getMuted()) {
      player.setVolume(clamp(options.volume, 0, 1));
    }
    return player;
  }
  playVideo() {
    this.player.play().catch(() => {
      if (this.state.is(PLAY_REQUEST_ABORTED)) {
        this.state.set(IDLE2);
      }
    });
  }
  pauseVideo() {
    this.player.pause();
  }
};

// src/js/players/youtube/YouTubeIframeAPILoader.ts
var YOUTUBE_API_SRC = "//www.youtube.com/player_api";
var YouTubeIframeAPILoader = class {
  load(callback) {
    if (window.YT && isFunction(window.YT.Player)) {
      return callback();
    }
    this.attachCallback(callback);
    if (this.shouldLoad()) {
      create("script", { src: `${location.protocol}${YOUTUBE_API_SRC}` }, document.head);
    }
  }
  shouldLoad() {
    return !queryAll(document, "script").some((script) => script.src.replace(/^https?:/, "") === YOUTUBE_API_SRC);
  }
  attachCallback(callback) {
    let oldCallback;
    if (!isUndefined(window.onYouTubeIframeAPIReady)) {
      oldCallback = window.onYouTubeIframeAPIReady;
    }
    window.onYouTubeIframeAPIReady = () => {
      oldCallback && oldCallback();
      callback();
    };
  }
};

// src/js/players/youtube/YouTubePlayer.ts
var YouTubePlayer = class extends AbstractVideoPlayer {
  constructor(target, videoId, options = {}) {
    super(target, videoId, options);
    this.videoId = this.parseVideoId(videoId);
    if (this.videoId) {
      this.state.set(INITIALIZING);
      new YouTubeIframeAPILoader().load(this.onAPIReady.bind(this));
    }
  }
  onAPIReady() {
    const { state } = this;
    const isPending = state.is(PENDING_PLAY);
    state.set(INITIALIZED);
    if (isPending) {
      this.play();
    }
  }
  createPlayer(videoId) {
    const { options, options: { playerOptions = {} } } = this;
    return new YT.Player(this.target, {
      videoId,
      playerVars: assign({
        controls: options.hideControls ? 0 : 1,
        iv_load_policy: 3,
        loop: options.loop ? 1 : 0,
        playlist: options.loop ? videoId : void 0,
        rel: 0,
        autoplay: 0,
        mute: options.mute ? 1 : 0
      }, playerOptions.youtube || {}),
      events: {
        onReady: this.onPlayerReady.bind(this),
        onStateChange: this.onPlayerStateChange.bind(this),
        onError: this.onError.bind(this)
      }
    });
  }
  onPlayerReady() {
    super.onPlayerReady();
    this.player.setVolume(clamp(this.options.volume, 0, 1) * 100);
  }
  onPlayerStateChange(e) {
    const { PLAYING: PLAYING2, PAUSED, ENDED } = YT.PlayerState;
    switch (true) {
      case e.data === PLAYING2:
        this.onPlay();
        break;
      case e.data === PAUSED:
        this.onPause();
        break;
      case e.data === ENDED:
        this.onEnded();
        break;
    }
  }
  playVideo() {
    this.player.playVideo();
  }
  pauseVideo() {
    this.player.pauseVideo();
  }
  parseVideoId(id) {
    return id.indexOf("http") === 0 ? this.parseUrl(id) : id;
  }
  parseUrl(url) {
    const [, search] = url.split(/[#?]/);
    const query3 = find(search.split("&"), (query4) => query4.indexOf("v=") === 0);
    return query3 && query3.replace("v=", "");
  }
};
var CLASS_SLIDE2 = `${PROJECT_CODE}__slide`;
var CLASS_CONTAINER2 = `${CLASS_SLIDE2}__container`;

// src/js/constants/i18n.ts
var I18N2 = {
  playVideo: "Play Video"
};

// src/js/classes/PlayerUI.ts
var PlayerUI = class {
  constructor(Splide4, slide) {
    this.event = EventBus();
    this.Splide = Splide4;
    this.slide = slide;
    this.init();
    this.create();
    this.show();
    this.listen();
  }
  init() {
    const container = child(this.slide, `.${CLASS_CONTAINER2}`);
    this.parent = container || this.slide;
    this.modifier = `${container ? CLASS_CONTAINER2 : CLASS_SLIDE2}--has-video`;
    addClass(this.parent, this.modifier);
  }
  create() {
    this.video = create("div", CLASS_VIDEO, this.parent);
    this.wrapper = create("div", CLASS_VIDEO_WRAPPER, this.video);
    this.placeholder = create("div", null, this.wrapper);
    this.playButton = create("button", {
      class: CLASS_VIDEO_PLAY_BUTTON,
      type: "button",
      "aria-label": this.Splide.options.i18n.playVideo || I18N2.playVideo
    }, this.video);
  }
  listen() {
    this.parent.addEventListener("click", () => {
      this.event.emit("click");
    });
  }
  toggleButton(show) {
    display(this.playButton, show ? "" : "none");
  }
  toggleWrapper(show) {
    display(this.wrapper, show ? "" : "none");
  }
  getPlaceholder() {
    return this.placeholder;
  }
  hide() {
    this.toggleButton(false);
    this.toggleWrapper(true);
  }
  show() {
    if (!this.disabled) {
      this.toggleButton(true);
    }
    this.toggleWrapper(false);
  }
  disable(disabled) {
    this.disabled = disabled;
    if (disabled) {
      this.toggleButton(false);
    }
  }
  on(events, callback) {
    this.event.on(events, callback);
  }
  destroy() {
    removeClass(this.parent, this.modifier);
    remove(this.video);
    this.event.destroy();
  }
};

// src/js/classes/Player.ts
var VIDEO_PLAYER_MAP = [
  [YOUTUBE_DATA_ATTRIBUTE, YouTubePlayer],
  [VIMEO_DATA_ATTRIBUTE, VimeoPlayer],
  [HTML_VIDEO__DATA_ATTRIBUTE, HTMLVideoPlayer]
];
var Player2 = class {
  constructor(Splide4, slide) {
    this.Splide = Splide4;
    this.slide = slide;
    this.event = EventInterface(Splide4);
    this.options = merge(merge({}, DEFAULTS2), this.Splide.options.video);
    this.createPlayer(slide);
    if (this.player) {
      this.listen();
    }
  }
  createPlayer(slide) {
    VIDEO_PLAYER_MAP.forEach(([attr, Constructor]) => {
      const id = getAttribute(slide, attr);
      if (id) {
        this.ui = new PlayerUI(this.Splide, slide);
        this.player = new Constructor(this.ui.getPlaceholder(), id, this.options);
        this.ui.disable(this.options.disableOverlayUI);
      }
    });
  }
  listen() {
    const { player, event } = this;
    this.ui.on("click", this.onClick.bind(this));
    player.on("play", this.onPlay.bind(this));
    player.on("played", this.onPlayed.bind(this));
    player.on("pause", this.onPause.bind(this));
    player.on("paused", this.onPaused.bind(this));
    player.on("ended", this.onEnded.bind(this));
    event.on([EVENT_MOVE, EVENT_SCROLL], this.pause.bind(this));
    event.on(EVENT_VIDEO_CLICK, this.onVideoClick.bind(this));
    event.on(EVENT_DRAG, () => {
      event.off(EVENT_DRAGGING);
      event.on(EVENT_DRAGGING, () => {
        this.pause();
        event.off(EVENT_DRAGGING);
      });
    });
    if (this.options.autoplay) {
      event.on([EVENT_MOUNTED, EVENT_MOVED, EVENT_SCROLLED], this.onAutoplayRequested.bind(this));
    }
  }
  onClick() {
    this.play();
    this.event.emit(EVENT_VIDEO_CLICK, this);
  }
  onVideoClick(player) {
    if (this !== player) {
      this.pause();
    }
  }
  onPlay() {
    this.ui.hide();
  }
  onPlayed() {
    this.ui.hide();
    this.togglePlaying(true);
    this.event.emit(EVENT_VIDEO_PLAY, this);
  }
  onPause() {
    this.ui.show();
  }
  onPaused() {
    this.togglePlaying(false);
    this.event.emit(EVENT_VIDEO_PAUSE, this);
  }
  onEnded() {
    this.togglePlaying(false);
    this.event.emit(EVENT_VIDEO_ENDED, this);
  }
  onAutoplayRequested() {
    const activeSlide = this.Splide.Components.Slides.getAt(this.Splide.index);
    if (activeSlide.slide === this.slide) {
      this.play();
    }
  }
  togglePlaying(add) {
    toggleClass(this.Splide.root, CLASS_PLAYING, add);
  }
  play() {
    if (this.player && !this.disabled) {
      this.player.play();
    }
  }
  pause() {
    if (this.player && !this.disabled) {
      this.player.pause();
    }
  }
  destroy() {
    if (this.player) {
      this.ui.destroy();
      this.player.destroy();
    }
    this.disable(false);
  }
  disable(disabled) {
    this.disabled = disabled;
    toggleClass(this.Splide.root, CLASS_VIDEO_DISABLED, disabled);
  }
};

// src/js/extensions/Video/Video.ts
function Video(Splide4, Components) {
  const players = {};
  function mount() {
    Components.Slides.forEach((Slide2) => {
      players[Slide2.index] = new Player2(Splide4, Slide2.slide);
    });
    Splide4.refresh();
  }
  function destroy() {
    forOwn(players, (player) => {
      player.destroy();
    });
  }
  function play(index = Splide4.index) {
    const player = players[index];
    if (player) {
      player.play();
    }
  }
  function pause() {
    forOwn(players, (player) => {
      player.pause();
    });
  }
  function disable(disabled) {
    forOwn(players, (player) => {
      player.disable(disabled);
    });
  }
  return {
    mount,
    destroy,
    play,
    pause,
    disable
  };
}

const dsVideoSliderCss = ".splide--nav>.splide__slider>.splide__track>.splide__list>.splide__slide,.splide--nav>.splide__track>.splide__list>.splide__slide{border:3px solid transparent;cursor:pointer;opacity:.7}.splide--nav>.splide__slider>.splide__track>.splide__list>.splide__slide.is-active,.splide--nav>.splide__track>.splide__list>.splide__slide.is-active{border:3px solid #00bfff;opacity:1}.splide--nav>.splide__slider>.splide__track>.splide__list>.splide__slide:focus,.splide--nav>.splide__track>.splide__list>.splide__slide:focus{outline:none}.splide__arrow{background:transparent;border:0;cursor:pointer;padding:0;position:absolute;top:50%;transform:translateY(-50%);z-index:1}.splide__arrow svg{fill:#00bfff;height:2.5em;transition:fill .2s linear;width:2.5em}.splide__arrow:hover svg{fill:#66d9ff}.splide__arrow:focus{outline:none}.splide__arrow--prev{left:1em}.splide__arrow--prev svg{transform:scaleX(-1)}.splide__arrow--next{right:1em}.splide__pagination{bottom:.5em;left:0;padding:0 1em;position:absolute;right:0;z-index:1}.splide__pagination__page{background:#ccc;border:0;border-radius:50%;display:inline-block;height:10px;margin:3px;padding:0;transition:all .2s linear;width:10px}.splide__pagination__page.is-active{background:#00bfff;transform:scale(1.4)}.splide__pagination__page:hover{background:#66d9ff;cursor:pointer;opacity:.9}.splide__pagination__page:focus{outline:none}.splide__container{box-sizing:border-box;position:relative}.splide__list{-webkit-backface-visibility:hidden;backface-visibility:hidden;display:-ms-flexbox;display:flex;height:100%;margin:0!important;padding:0!important;transform-style:preserve-3d}.splide.is-initialized:not(.is-active) .splide__list{display:block}.splide__pagination{-ms-flex-align:center;align-items:center;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-pack:center;justify-content:center;margin:0;pointer-events:none}.splide__pagination li{display:inline-block;line-height:1;list-style-type:none;margin:0;pointer-events:auto}.splide__progress__bar{width:0}.splide{outline:none;position:relative;visibility:hidden}.splide.is-initialized,.splide.is-rendered{visibility:visible}.splide__slide{-webkit-backface-visibility:hidden;backface-visibility:hidden;box-sizing:border-box;-ms-flex-negative:0;flex-shrink:0;list-style-type:none!important;margin:0;outline:none;position:relative}.splide__slide img{vertical-align:bottom}.splide__slider{position:relative}.splide__spinner{animation:splide-loading 1s linear infinite;border:2px solid #00bfff;border-left-color:transparent;border-radius:50%;bottom:0;contain:strict;display:inline-block;height:20px;left:0;margin:auto;position:absolute;right:0;top:0;width:20px}.splide__track{overflow:hidden;position:relative;z-index:0}@keyframes splide-loading{0%{transform:rotate(0)}to{transform:rotate(1turn)}}.splide--draggable>.splide__slider>.splide__track,.splide--draggable>.splide__track{-webkit-user-select:none;-ms-user-select:none;user-select:none}.splide--fade>.splide__slider>.splide__track>.splide__list,.splide--fade>.splide__track>.splide__list{display:block}.splide--fade>.splide__slider>.splide__track>.splide__list>.splide__slide,.splide--fade>.splide__track>.splide__list>.splide__slide{left:0;opacity:0;position:absolute;top:0;z-index:0}.splide--fade>.splide__slider>.splide__track>.splide__list>.splide__slide.is-active,.splide--fade>.splide__track>.splide__list>.splide__slide.is-active{opacity:1;position:relative;z-index:1}.splide--rtl{direction:rtl}.splide--ttb.is-active>.splide__slider>.splide__track>.splide__list,.splide--ttb.is-active>.splide__track>.splide__list{display:block}.splide__progress__bar{background:#ccc;height:3px}.splide--rtl>.splide__arrows .splide__arrow--prev,.splide--rtl>.splide__slider>.splide__track>.splide__arrows .splide__arrow--prev,.splide--rtl>.splide__track>.splide__arrows .splide__arrow--prev{left:auto;right:1em}.splide--rtl>.splide__arrows .splide__arrow--prev svg,.splide--rtl>.splide__slider>.splide__track>.splide__arrows .splide__arrow--prev svg,.splide--rtl>.splide__track>.splide__arrows .splide__arrow--prev svg{transform:scaleX(1)}.splide--rtl>.splide__arrows .splide__arrow--next,.splide--rtl>.splide__slider>.splide__track>.splide__arrows .splide__arrow--next,.splide--rtl>.splide__track>.splide__arrows .splide__arrow--next{left:1em;right:auto}.splide--rtl>.splide__arrows .splide__arrow--next svg,.splide--rtl>.splide__slider>.splide__track>.splide__arrows .splide__arrow--next svg,.splide--rtl>.splide__track>.splide__arrows .splide__arrow--next svg{transform:scaleX(-1)}.splide--ttb>.splide__arrows .splide__arrow,.splide--ttb>.splide__slider>.splide__track>.splide__arrows .splide__arrow,.splide--ttb>.splide__track>.splide__arrows .splide__arrow{left:50%;transform:translate(-50%)}.splide--ttb>.splide__arrows .splide__arrow--prev,.splide--ttb>.splide__slider>.splide__track>.splide__arrows .splide__arrow--prev,.splide--ttb>.splide__track>.splide__arrows .splide__arrow--prev{top:1em}.splide--ttb>.splide__arrows .splide__arrow--prev svg,.splide--ttb>.splide__slider>.splide__track>.splide__arrows .splide__arrow--prev svg,.splide--ttb>.splide__track>.splide__arrows .splide__arrow--prev svg{transform:rotate(-90deg)}.splide--ttb>.splide__arrows .splide__arrow--next,.splide--ttb>.splide__slider>.splide__track>.splide__arrows .splide__arrow--next,.splide--ttb>.splide__track>.splide__arrows .splide__arrow--next{bottom:1em;top:auto}.splide--ttb>.splide__arrows .splide__arrow--next svg,.splide--ttb>.splide__slider>.splide__track>.splide__arrows .splide__arrow--next svg,.splide--ttb>.splide__track>.splide__arrows .splide__arrow--next svg{transform:rotate(90deg)}.splide--ttb>.splide__pagination,.splide--ttb>.splide__slider>.splide__pagination{bottom:0;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;left:auto;padding:1em 0;right:.5em;top:0}.splide__slide--has-video{cursor:pointer}.splide__slide--has-video:hover .splide__video__play{opacity:1}.splide__slide__container--has-video{cursor:pointer;position:relative}.splide__slide__container--has-video:hover .splide__video__play{opacity:1}.splide__video{height:100%;left:0;position:absolute;top:0;width:100%}.splide__video__wrapper{background:#000;height:inherit;width:inherit}.splide__video__wrapper div,.splide__video__wrapper iframe,.splide__video__wrapper video{height:100%;width:100%}.splide__video__play{align-items:center;background:#ccc;border:0;border-radius:50%;cursor:pointer;display:flex;height:40px;justify-content:center;left:50%;opacity:.7;position:absolute;top:50%;transform:translate(-50%,-50%);transition:opacity .1s linear;width:40px}.splide__video__play:after{border-color:transparent transparent transparent #000;border-style:solid;border-width:9px 0 9px 17px;content:\"\";display:inline-block;margin-left:4px}.splide__video__play::after{content:\"\";display:none}.splide__video__play{background-image:url(\"build/assets/play_icon.svg\") !important;background:transparent;background-size:cover;background-repeat:no-repeat;background-position:center center;border-radius:50%;cursor:pointer;display:flex;width:25%;height:45%}.splide__track{border-radius:40px}.splide__slide{background-color:black}.splide__arrow svg{height:48px;width:48px}@media screen and (min-width: 1024px){.splide__arrow svg{height:92px;width:92px}}@media screen and (min-width: 1920px){.splide__arrow svg{height:128px;width:128px}}.img-thumbnail{border-radius:40px;width:100%;height:100%;object-fit:cover}";

let MyComponent = class extends HTMLElement$1 {
  constructor() {
    super();
    this.__registerHost();
    this.videoIds = '';
    this._videoIds = [];
  }
  componentWillLoad() {
    this.parsevideoIds();
  }
  parsevideoIds() {
    if (this.videoIds) {
      // this._videoIds = JSON.parse(this.videoIds);
      this._videoIds = this.videoIds.split(',').map(x => x.trim());
    }
  }
  stringToArray(arg) {
    const opts = typeof arg === 'string'
      ? arg.split(',').map(p => +p.trim())
      : // .filter(hasValue)
        arg;
    return opts;
  }
  componentDidRender() {
    console.log({ opt: this._videoIds });
    new Splide('.splide', {
      hasSliderWrapper: true,
      classes: {
        prev: 'splide__arrow--prev my-class-prev',
        next: 'splide__arrow--next my-class-next',
      },
    }).mount({ Video });
  }
  render() {
    return (h("div", { class: "wrapper" }, h("div", { class: "splide" }, h("div", { class: "splide__arrows" }, h("button", { class: "splide__arrow splide__arrow--prev my-class-prev" }, h("svg", { width: "95", height: "161", viewBox: "0 0 95 161", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M5.05549 4.89757C3.7306 6.21975 2.67949 7.79024 1.96231 9.51915C1.24513 11.2481 0.875977 13.1014 0.875977 14.9732C0.875977 16.845 1.24513 18.6983 1.96231 20.4272C2.67949 22.1562 3.7306 23.7267 5.05549 25.0488L60.5071 80.5005L5.05549 135.952C2.38327 138.624 0.882028 142.249 0.882028 146.028C0.882028 149.807 2.38327 153.431 5.05549 156.103C7.72771 158.776 11.352 160.277 15.1311 160.277C18.9102 160.277 22.5345 158.776 25.2067 156.103L90.8055 90.5047C92.1304 89.1825 93.1815 87.612 93.8987 85.8831C94.6158 84.1542 94.985 82.3008 94.985 80.429C94.985 78.5573 94.6158 76.7039 93.8987 74.975C93.1815 73.2461 92.1304 71.6756 90.8055 70.3534L25.2067 4.75465C19.7759 -0.676182 10.6292 -0.676179 5.05549 4.89757Z", fill: "white", "fill-opacity": "0.35" }))), h("button", { class: "splide__arrow splide__arrow--next my-class-next" }, h("svg", { width: "95", height: "161", viewBox: "0 0 95 161", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, h("path", { d: "M5.05549 4.89757C3.7306 6.21975 2.67949 7.79024 1.96231 9.51915C1.24513 11.2481 0.875977 13.1014 0.875977 14.9732C0.875977 16.845 1.24513 18.6983 1.96231 20.4272C2.67949 22.1562 3.7306 23.7267 5.05549 25.0488L60.5071 80.5005L5.05549 135.952C2.38327 138.624 0.882028 142.249 0.882028 146.028C0.882028 149.807 2.38327 153.431 5.05549 156.103C7.72771 158.776 11.352 160.277 15.1311 160.277C18.9102 160.277 22.5345 158.776 25.2067 156.103L90.8055 90.5047C92.1304 89.1825 93.1815 87.612 93.8987 85.8831C94.6158 84.1542 94.985 82.3008 94.985 80.429C94.985 78.5573 94.6158 76.7039 93.8987 74.975C93.1815 73.2461 92.1304 71.6756 90.8055 70.3534L25.2067 4.75465C19.7759 -0.676182 10.6292 -0.676179 5.05549 4.89757Z", fill: "white", "fill-opacity": "0.35" })))), h("div", { class: "splide__track" }, h("ul", { class: "splide__list" }, this._videoIds.map(id => (h("li", { class: "splide__slide", "data-splide-youtube": id }, h("img", { class: "img-thumbnail", src: `https://i3.ytimg.com/vi/${id}/maxresdefault.jpg` })))))))));
  }
  static get assetsDirs() { return ["assets"]; }
  get el() { return this; }
  static get watchers() { return {
    "videoIds": ["parsevideoIds"]
  }; }
  static get style() { return dsVideoSliderCss; }
};
MyComponent = /*@__PURE__*/ proxyCustomElement(MyComponent, [0, "ds-video-slider", {
    "videoIds": [513, "video-ids"],
    "_videoIds": [32]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["ds-video-slider"];
  components.forEach(tagName => { switch (tagName) {
    case "ds-video-slider":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, MyComponent);
      }
      break;
  } });
}

const DsVideoSlider = MyComponent;
const defineCustomElement = defineCustomElement$1;

export { DsVideoSlider, defineCustomElement };
