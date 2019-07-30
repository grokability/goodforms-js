(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Goodverification = factory());
}(this, function () { 'use strict';

    const HOST = 'http://localhost:8000'

    var Log = function Log(debug_enabled) {
        if ( debug_enabled === void 0 ) debug_enabled = false;

        this.debug_enabled = debug_enabled;
    };

    Log.prototype.error = function error (msg) {
        if(!this.log_at_level('error',msg)) {
            window.alert("Error: "+msg);
        }
    };

    Log.prototype.debug = function debug (msg) {
        if(this.debug_enabled) {
            this.log_at_level('debug',msg);
        }
    };

    Log.prototype.log_at_level = function log_at_level (level,msg) {
        if(console && console[level]) {
            console[level](msg);
            return true
        }
        return false
    };

    var log = new Log();

    //debug,info,warn,error

    function duplicate (obj) {
        //naive, single-level, non-deep 'duplicate' function for objects
        var newobj={};
        for(var i in obj) {
            newobj[i] = obj[i];
        }
        return newobj
    }

    function is_array(obj) {
        // console.warn("The prototype thing is: "+Object.prototype.toString.call(obj))
        if(Object.prototype.toString.call(obj) == "[object Array]") {
            return true
        }
        return false
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var jsonp = createCommonjsModule(function (module) {
    (function() {
      var JSONP, computedUrl, createElement, encode, noop, objectToURI, random, randomString;

      createElement = function(tag) {
        return window.document.createElement(tag);
      };

      encode = window.encodeURIComponent;

      random = Math.random;

      JSONP = function(options) {
        var callback, callbackFunc, callbackName, done, head, params, script;
        if (options == null) {
          options = {};
        }
        params = {
          data: options.data || {},
          error: options.error || noop,
          success: options.success || noop,
          beforeSend: options.beforeSend || noop,
          complete: options.complete || noop,
          url: options.url || ''
        };
        params.computedUrl = computedUrl(params);
        if (params.url.length === 0) {
          throw new Error('MissingUrl');
        }
        done = false;
        if (params.beforeSend({}, params) !== false) {
          callbackName = options.callbackName || 'callback';
          callbackFunc = options.callbackFunc || 'jsonp_' + randomString(15);
          callback = params.data[callbackName] = callbackFunc;
          window[callback] = function(data) {
            window[callback] = null;
            params.success(data, params);
            return params.complete(data, params);
          };
          script = createElement('script');
          script.src = computedUrl(params);
          script.async = true;
          script.onerror = function(evt) {
            params.error({
              url: script.src,
              event: evt
            });
            return params.complete({
              url: script.src,
              event: evt
            }, params);
          };
          script.onload = script.onreadystatechange = function() {
            var ref, ref1;
            if (done || ((ref = this.readyState) !== 'loaded' && ref !== 'complete')) {
              return;
            }
            done = true;
            if (script) {
              script.onload = script.onreadystatechange = null;
              if ((ref1 = script.parentNode) != null) {
                ref1.removeChild(script);
              }
              return script = null;
            }
          };
          head = window.document.getElementsByTagName('head')[0] || window.document.documentElement;
          head.insertBefore(script, head.firstChild);
        }
        return {
          abort: function() {
            window[callback] = function() {
              return window[callback] = null;
            };
            done = true;
            if (script != null ? script.parentNode : void 0) {
              script.onload = script.onreadystatechange = null;
              script.parentNode.removeChild(script);
              return script = null;
            }
          }
        };
      };

      noop = function() {
        return void 0;
      };

      computedUrl = function(params) {
        var url;
        url = params.url;
        url += params.url.indexOf('?') < 0 ? '?' : '&';
        url += objectToURI(params.data);
        return url;
      };

      randomString = function(length) {
        var str;
        str = '';
        while (str.length < length) {
          str += random().toString(36).slice(2, 3);
        }
        return str;
      };

      objectToURI = function(obj) {
        var data, key, value;
        data = (function() {
          var results;
          results = [];
          for (key in obj) {
            value = obj[key];
            results.push(encode(key) + '=' + encode(value));
          }
          return results;
        })();
        return data.join('&');
      };

      if ( module !== null ? module.exports : void 0) {
        module.exports = JSONP;
      } else {
        this.JSONP = JSONP;
      }

    }).call(commonjsGlobal);
    });

    /**!
     * @fileOverview Kickass library to create and place poppers near their reference elements.
     * @version 1.15.0
     * @license
     * Copyright (c) 2016 Federico Zivolo and contributors
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */
    var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

    var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
    var timeoutDuration = 0;
    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
      if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
        timeoutDuration = 1;
        break;
      }
    }

    function microtaskDebounce(fn) {
      var called = false;
      return function () {
        if (called) {
          return;
        }
        called = true;
        window.Promise.resolve().then(function () {
          called = false;
          fn();
        });
      };
    }

    function taskDebounce(fn) {
      var scheduled = false;
      return function () {
        if (!scheduled) {
          scheduled = true;
          setTimeout(function () {
            scheduled = false;
            fn();
          }, timeoutDuration);
        }
      };
    }

    var supportsMicroTasks = isBrowser && window.Promise;

    /**
    * Create a debounced version of a method, that's asynchronously deferred
    * but called in the minimum time possible.
    *
    * @method
    * @memberof Popper.Utils
    * @argument {Function} fn
    * @returns {Function}
    */
    var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

    /**
     * Check if the given variable is a function
     * @method
     * @memberof Popper.Utils
     * @argument {Any} functionToCheck - variable to check
     * @returns {Boolean} answer to: is a function?
     */
    function isFunction(functionToCheck) {
      var getType = {};
      return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    /**
     * Get CSS computed property of the given element
     * @method
     * @memberof Popper.Utils
     * @argument {Eement} element
     * @argument {String} property
     */
    function getStyleComputedProperty(element, property) {
      if (element.nodeType !== 1) {
        return [];
      }
      // NOTE: 1 DOM access here
      var window = element.ownerDocument.defaultView;
      var css = window.getComputedStyle(element, null);
      return property ? css[property] : css;
    }

    /**
     * Returns the parentNode or the host of the element
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Element} parent
     */
    function getParentNode(element) {
      if (element.nodeName === 'HTML') {
        return element;
      }
      return element.parentNode || element.host;
    }

    /**
     * Returns the scrolling parent of the given element
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Element} scroll parent
     */
    function getScrollParent(element) {
      // Return body, `getScroll` will take care to get the correct `scrollTop` from it
      if (!element) {
        return document.body;
      }

      switch (element.nodeName) {
        case 'HTML':
        case 'BODY':
          return element.ownerDocument.body;
        case '#document':
          return element.body;
      }

      // Firefox want us to check `-x` and `-y` variations as well

      var _getStyleComputedProp = getStyleComputedProperty(element),
          overflow = _getStyleComputedProp.overflow,
          overflowX = _getStyleComputedProp.overflowX,
          overflowY = _getStyleComputedProp.overflowY;

      if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
        return element;
      }

      return getScrollParent(getParentNode(element));
    }

    var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
    var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

    /**
     * Determines if the browser is Internet Explorer
     * @method
     * @memberof Popper.Utils
     * @param {Number} version to check
     * @returns {Boolean} isIE
     */
    function isIE(version) {
      if (version === 11) {
        return isIE11;
      }
      if (version === 10) {
        return isIE10;
      }
      return isIE11 || isIE10;
    }

    /**
     * Returns the offset parent of the given element
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Element} offset parent
     */
    function getOffsetParent(element) {
      if (!element) {
        return document.documentElement;
      }

      var noOffsetParent = isIE(10) ? document.body : null;

      // NOTE: 1 DOM access here
      var offsetParent = element.offsetParent || null;
      // Skip hidden elements which don't have an offsetParent
      while (offsetParent === noOffsetParent && element.nextElementSibling) {
        offsetParent = (element = element.nextElementSibling).offsetParent;
      }

      var nodeName = offsetParent && offsetParent.nodeName;

      if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
        return element ? element.ownerDocument.documentElement : document.documentElement;
      }

      // .offsetParent will return the closest TH, TD or TABLE in case
      // no offsetParent is present, I hate this job...
      if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
        return getOffsetParent(offsetParent);
      }

      return offsetParent;
    }

    function isOffsetContainer(element) {
      var nodeName = element.nodeName;

      if (nodeName === 'BODY') {
        return false;
      }
      return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
    }

    /**
     * Finds the root node (document, shadowDOM root) of the given element
     * @method
     * @memberof Popper.Utils
     * @argument {Element} node
     * @returns {Element} root node
     */
    function getRoot(node) {
      if (node.parentNode !== null) {
        return getRoot(node.parentNode);
      }

      return node;
    }

    /**
     * Finds the offset parent common to the two provided nodes
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element1
     * @argument {Element} element2
     * @returns {Element} common offset parent
     */
    function findCommonOffsetParent(element1, element2) {
      // This check is needed to avoid errors in case one of the elements isn't defined for any reason
      if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
        return document.documentElement;
      }

      // Here we make sure to give as "start" the element that comes first in the DOM
      var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
      var start = order ? element1 : element2;
      var end = order ? element2 : element1;

      // Get common ancestor container
      var range = document.createRange();
      range.setStart(start, 0);
      range.setEnd(end, 0);
      var commonAncestorContainer = range.commonAncestorContainer;

      // Both nodes are inside #document

      if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
        if (isOffsetContainer(commonAncestorContainer)) {
          return commonAncestorContainer;
        }

        return getOffsetParent(commonAncestorContainer);
      }

      // one of the nodes is inside shadowDOM, find which one
      var element1root = getRoot(element1);
      if (element1root.host) {
        return findCommonOffsetParent(element1root.host, element2);
      } else {
        return findCommonOffsetParent(element1, getRoot(element2).host);
      }
    }

    /**
     * Gets the scroll value of the given element in the given side (top and left)
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @argument {String} side `top` or `left`
     * @returns {number} amount of scrolled pixels
     */
    function getScroll(element) {
      var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

      var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
      var nodeName = element.nodeName;

      if (nodeName === 'BODY' || nodeName === 'HTML') {
        var html = element.ownerDocument.documentElement;
        var scrollingElement = element.ownerDocument.scrollingElement || html;
        return scrollingElement[upperSide];
      }

      return element[upperSide];
    }

    /*
     * Sum or subtract the element scroll values (left and top) from a given rect object
     * @method
     * @memberof Popper.Utils
     * @param {Object} rect - Rect object you want to change
     * @param {HTMLElement} element - The element from the function reads the scroll values
     * @param {Boolean} subtract - set to true if you want to subtract the scroll values
     * @return {Object} rect - The modifier rect object
     */
    function includeScroll(rect, element) {
      var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var scrollTop = getScroll(element, 'top');
      var scrollLeft = getScroll(element, 'left');
      var modifier = subtract ? -1 : 1;
      rect.top += scrollTop * modifier;
      rect.bottom += scrollTop * modifier;
      rect.left += scrollLeft * modifier;
      rect.right += scrollLeft * modifier;
      return rect;
    }

    /*
     * Helper to detect borders of a given element
     * @method
     * @memberof Popper.Utils
     * @param {CSSStyleDeclaration} styles
     * Result of `getStyleComputedProperty` on the given element
     * @param {String} axis - `x` or `y`
     * @return {number} borders - The borders size of the given axis
     */

    function getBordersSize(styles, axis) {
      var sideA = axis === 'x' ? 'Left' : 'Top';
      var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

      return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
    }

    function getSize(axis, body, html, computedStyle) {
      return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
    }

    function getWindowSizes(document) {
      var body = document.body;
      var html = document.documentElement;
      var computedStyle = isIE(10) && getComputedStyle(html);

      return {
        height: getSize('Height', body, html, computedStyle),
        width: getSize('Width', body, html, computedStyle)
      };
    }

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) { descriptor.writable = true; }
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) { defineProperties(Constructor.prototype, protoProps); }
        if (staticProps) { defineProperties(Constructor, staticProps); }
        return Constructor;
      };
    }();





    var defineProperty = function (obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    };

    var _extends = Object.assign || function (target) {
      var arguments$1 = arguments;

      for (var i = 1; i < arguments.length; i++) {
        var source = arguments$1[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    /**
     * Given element offsets, generate an output similar to getBoundingClientRect
     * @method
     * @memberof Popper.Utils
     * @argument {Object} offsets
     * @returns {Object} ClientRect like output
     */
    function getClientRect(offsets) {
      return _extends({}, offsets, {
        right: offsets.left + offsets.width,
        bottom: offsets.top + offsets.height
      });
    }

    /**
     * Get bounding client rect of given element
     * @method
     * @memberof Popper.Utils
     * @param {HTMLElement} element
     * @return {Object} client rect
     */
    function getBoundingClientRect(element) {
      var rect = {};

      // IE10 10 FIX: Please, don't ask, the element isn't
      // considered in DOM in some circumstances...
      // This isn't reproducible in IE10 compatibility mode of IE11
      try {
        if (isIE(10)) {
          rect = element.getBoundingClientRect();
          var scrollTop = getScroll(element, 'top');
          var scrollLeft = getScroll(element, 'left');
          rect.top += scrollTop;
          rect.left += scrollLeft;
          rect.bottom += scrollTop;
          rect.right += scrollLeft;
        } else {
          rect = element.getBoundingClientRect();
        }
      } catch (e) {}

      var result = {
        left: rect.left,
        top: rect.top,
        width: rect.right - rect.left,
        height: rect.bottom - rect.top
      };

      // subtract scrollbar size from sizes
      var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
      var width = sizes.width || element.clientWidth || result.right - result.left;
      var height = sizes.height || element.clientHeight || result.bottom - result.top;

      var horizScrollbar = element.offsetWidth - width;
      var vertScrollbar = element.offsetHeight - height;

      // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
      // we make this check conditional for performance reasons
      if (horizScrollbar || vertScrollbar) {
        var styles = getStyleComputedProperty(element);
        horizScrollbar -= getBordersSize(styles, 'x');
        vertScrollbar -= getBordersSize(styles, 'y');

        result.width -= horizScrollbar;
        result.height -= vertScrollbar;
      }

      return getClientRect(result);
    }

    function getOffsetRectRelativeToArbitraryNode(children, parent) {
      var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      var isIE10 = isIE(10);
      var isHTML = parent.nodeName === 'HTML';
      var childrenRect = getBoundingClientRect(children);
      var parentRect = getBoundingClientRect(parent);
      var scrollParent = getScrollParent(children);

      var styles = getStyleComputedProperty(parent);
      var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
      var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

      // In cases where the parent is fixed, we must ignore negative scroll in offset calc
      if (fixedPosition && isHTML) {
        parentRect.top = Math.max(parentRect.top, 0);
        parentRect.left = Math.max(parentRect.left, 0);
      }
      var offsets = getClientRect({
        top: childrenRect.top - parentRect.top - borderTopWidth,
        left: childrenRect.left - parentRect.left - borderLeftWidth,
        width: childrenRect.width,
        height: childrenRect.height
      });
      offsets.marginTop = 0;
      offsets.marginLeft = 0;

      // Subtract margins of documentElement in case it's being used as parent
      // we do this only on HTML because it's the only element that behaves
      // differently when margins are applied to it. The margins are included in
      // the box of the documentElement, in the other cases not.
      if (!isIE10 && isHTML) {
        var marginTop = parseFloat(styles.marginTop, 10);
        var marginLeft = parseFloat(styles.marginLeft, 10);

        offsets.top -= borderTopWidth - marginTop;
        offsets.bottom -= borderTopWidth - marginTop;
        offsets.left -= borderLeftWidth - marginLeft;
        offsets.right -= borderLeftWidth - marginLeft;

        // Attach marginTop and marginLeft because in some circumstances we may need them
        offsets.marginTop = marginTop;
        offsets.marginLeft = marginLeft;
      }

      if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
        offsets = includeScroll(offsets, parent);
      }

      return offsets;
    }

    function getViewportOffsetRectRelativeToArtbitraryNode(element) {
      var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var html = element.ownerDocument.documentElement;
      var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
      var width = Math.max(html.clientWidth, window.innerWidth || 0);
      var height = Math.max(html.clientHeight, window.innerHeight || 0);

      var scrollTop = !excludeScroll ? getScroll(html) : 0;
      var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

      var offset = {
        top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
        left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
        width: width,
        height: height
      };

      return getClientRect(offset);
    }

    /**
     * Check if the given element is fixed or is inside a fixed parent
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @argument {Element} customContainer
     * @returns {Boolean} answer to "isFixed?"
     */
    function isFixed(element) {
      var nodeName = element.nodeName;
      if (nodeName === 'BODY' || nodeName === 'HTML') {
        return false;
      }
      if (getStyleComputedProperty(element, 'position') === 'fixed') {
        return true;
      }
      var parentNode = getParentNode(element);
      if (!parentNode) {
        return false;
      }
      return isFixed(parentNode);
    }

    /**
     * Finds the first parent of an element that has a transformed property defined
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Element} first transformed parent or documentElement
     */

    function getFixedPositionOffsetParent(element) {
      // This check is needed to avoid errors in case one of the elements isn't defined for any reason
      if (!element || !element.parentElement || isIE()) {
        return document.documentElement;
      }
      var el = element.parentElement;
      while (el && getStyleComputedProperty(el, 'transform') === 'none') {
        el = el.parentElement;
      }
      return el || document.documentElement;
    }

    /**
     * Computed the boundaries limits and return them
     * @method
     * @memberof Popper.Utils
     * @param {HTMLElement} popper
     * @param {HTMLElement} reference
     * @param {number} padding
     * @param {HTMLElement} boundariesElement - Element used to define the boundaries
     * @param {Boolean} fixedPosition - Is in fixed position mode
     * @returns {Object} Coordinates of the boundaries
     */
    function getBoundaries(popper, reference, padding, boundariesElement) {
      var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      // NOTE: 1 DOM access here

      var boundaries = { top: 0, left: 0 };
      var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

      // Handle viewport case
      if (boundariesElement === 'viewport') {
        boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
      } else {
        // Handle other cases based on DOM element used as boundaries
        var boundariesNode = void 0;
        if (boundariesElement === 'scrollParent') {
          boundariesNode = getScrollParent(getParentNode(reference));
          if (boundariesNode.nodeName === 'BODY') {
            boundariesNode = popper.ownerDocument.documentElement;
          }
        } else if (boundariesElement === 'window') {
          boundariesNode = popper.ownerDocument.documentElement;
        } else {
          boundariesNode = boundariesElement;
        }

        var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

        // In case of HTML, we need a different computation
        if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
          var _getWindowSizes = getWindowSizes(popper.ownerDocument),
              height = _getWindowSizes.height,
              width = _getWindowSizes.width;

          boundaries.top += offsets.top - offsets.marginTop;
          boundaries.bottom = height + offsets.top;
          boundaries.left += offsets.left - offsets.marginLeft;
          boundaries.right = width + offsets.left;
        } else {
          // for all the other DOM elements, this one is good
          boundaries = offsets;
        }
      }

      // Add paddings
      padding = padding || 0;
      var isPaddingNumber = typeof padding === 'number';
      boundaries.left += isPaddingNumber ? padding : padding.left || 0;
      boundaries.top += isPaddingNumber ? padding : padding.top || 0;
      boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
      boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

      return boundaries;
    }

    function getArea(_ref) {
      var width = _ref.width,
          height = _ref.height;

      return width * height;
    }

    /**
     * Utility used to transform the `auto` placement to the placement with more
     * available space.
     * @method
     * @memberof Popper.Utils
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
      var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

      if (placement.indexOf('auto') === -1) {
        return placement;
      }

      var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

      var rects = {
        top: {
          width: boundaries.width,
          height: refRect.top - boundaries.top
        },
        right: {
          width: boundaries.right - refRect.right,
          height: boundaries.height
        },
        bottom: {
          width: boundaries.width,
          height: boundaries.bottom - refRect.bottom
        },
        left: {
          width: refRect.left - boundaries.left,
          height: boundaries.height
        }
      };

      var sortedAreas = Object.keys(rects).map(function (key) {
        return _extends({
          key: key
        }, rects[key], {
          area: getArea(rects[key])
        });
      }).sort(function (a, b) {
        return b.area - a.area;
      });

      var filteredAreas = sortedAreas.filter(function (_ref2) {
        var width = _ref2.width,
            height = _ref2.height;
        return width >= popper.clientWidth && height >= popper.clientHeight;
      });

      var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

      var variation = placement.split('-')[1];

      return computedPlacement + (variation ? '-' + variation : '');
    }

    /**
     * Get offsets to the reference element
     * @method
     * @memberof Popper.Utils
     * @param {Object} state
     * @param {Element} popper - the popper element
     * @param {Element} reference - the reference element (the popper will be relative to this)
     * @param {Element} fixedPosition - is in fixed position mode
     * @returns {Object} An object containing the offsets which will be applied to the popper
     */
    function getReferenceOffsets(state, popper, reference) {
      var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

      var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
      return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
    }

    /**
     * Get the outer sizes of the given element (offset size + margins)
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Object} object containing width and height properties
     */
    function getOuterSizes(element) {
      var window = element.ownerDocument.defaultView;
      var styles = window.getComputedStyle(element);
      var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
      var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
      var result = {
        width: element.offsetWidth + y,
        height: element.offsetHeight + x
      };
      return result;
    }

    /**
     * Get the opposite placement of the given one
     * @method
     * @memberof Popper.Utils
     * @argument {String} placement
     * @returns {String} flipped placement
     */
    function getOppositePlacement(placement) {
      var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
      return placement.replace(/left|right|bottom|top/g, function (matched) {
        return hash[matched];
      });
    }

    /**
     * Get offsets to the popper
     * @method
     * @memberof Popper.Utils
     * @param {Object} position - CSS position the Popper will get applied
     * @param {HTMLElement} popper - the popper element
     * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
     * @param {String} placement - one of the valid placement options
     * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
     */
    function getPopperOffsets(popper, referenceOffsets, placement) {
      placement = placement.split('-')[0];

      // Get popper node sizes
      var popperRect = getOuterSizes(popper);

      // Add position, width and height to our offsets object
      var popperOffsets = {
        width: popperRect.width,
        height: popperRect.height
      };

      // depending by the popper placement we have to compute its offsets slightly differently
      var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
      var mainSide = isHoriz ? 'top' : 'left';
      var secondarySide = isHoriz ? 'left' : 'top';
      var measurement = isHoriz ? 'height' : 'width';
      var secondaryMeasurement = !isHoriz ? 'height' : 'width';

      popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
      if (placement === secondarySide) {
        popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
      } else {
        popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
      }

      return popperOffsets;
    }

    /**
     * Mimics the `find` method of Array
     * @method
     * @memberof Popper.Utils
     * @argument {Array} arr
     * @argument prop
     * @argument value
     * @returns index or -1
     */
    function find(arr, check) {
      // use native find if supported
      if (Array.prototype.find) {
        return arr.find(check);
      }

      // use `filter` to obtain the same behavior of `find`
      return arr.filter(check)[0];
    }

    /**
     * Return the index of the matching object
     * @method
     * @memberof Popper.Utils
     * @argument {Array} arr
     * @argument prop
     * @argument value
     * @returns index or -1
     */
    function findIndex(arr, prop, value) {
      // use native findIndex if supported
      if (Array.prototype.findIndex) {
        return arr.findIndex(function (cur) {
          return cur[prop] === value;
        });
      }

      // use `find` + `indexOf` if `findIndex` isn't supported
      var match = find(arr, function (obj) {
        return obj[prop] === value;
      });
      return arr.indexOf(match);
    }

    /**
     * Loop trough the list of modifiers and run them in order,
     * each of them will then edit the data object.
     * @method
     * @memberof Popper.Utils
     * @param {dataObject} data
     * @param {Array} modifiers
     * @param {String} ends - Optional modifier name used as stopper
     * @returns {dataObject}
     */
    function runModifiers(modifiers, data, ends) {
      var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

      modifiersToRun.forEach(function (modifier) {
        if (modifier['function']) {
          // eslint-disable-line dot-notation
          console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
        }
        var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
        if (modifier.enabled && isFunction(fn)) {
          // Add properties to offsets to make them a complete clientRect object
          // we do this before each modifier to make sure the previous one doesn't
          // mess with these values
          data.offsets.popper = getClientRect(data.offsets.popper);
          data.offsets.reference = getClientRect(data.offsets.reference);

          data = fn(data, modifier);
        }
      });

      return data;
    }

    /**
     * Updates the position of the popper, computing the new offsets and applying
     * the new style.<br />
     * Prefer `scheduleUpdate` over `update` because of performance reasons.
     * @method
     * @memberof Popper
     */
    function update() {
      // if popper is destroyed, don't perform any further update
      if (this.state.isDestroyed) {
        return;
      }

      var data = {
        instance: this,
        styles: {},
        arrowStyles: {},
        attributes: {},
        flipped: false,
        offsets: {}
      };

      // compute reference element offsets
      data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

      // compute auto placement, store placement inside the data object,
      // modifiers will be able to edit `placement` if needed
      // and refer to originalPlacement to know the original value
      data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

      // store the computed placement inside `originalPlacement`
      data.originalPlacement = data.placement;

      data.positionFixed = this.options.positionFixed;

      // compute the popper offsets
      data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

      data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

      // run the modifiers
      data = runModifiers(this.modifiers, data);

      // the first `update` will call `onCreate` callback
      // the other ones will call `onUpdate` callback
      if (!this.state.isCreated) {
        this.state.isCreated = true;
        this.options.onCreate(data);
      } else {
        this.options.onUpdate(data);
      }
    }

    /**
     * Helper used to know if the given modifier is enabled.
     * @method
     * @memberof Popper.Utils
     * @returns {Boolean}
     */
    function isModifierEnabled(modifiers, modifierName) {
      return modifiers.some(function (_ref) {
        var name = _ref.name,
            enabled = _ref.enabled;
        return enabled && name === modifierName;
      });
    }

    /**
     * Get the prefixed supported property name
     * @method
     * @memberof Popper.Utils
     * @argument {String} property (camelCase)
     * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
     */
    function getSupportedPropertyName(property) {
      var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
      var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

      for (var i = 0; i < prefixes.length; i++) {
        var prefix = prefixes[i];
        var toCheck = prefix ? '' + prefix + upperProp : property;
        if (typeof document.body.style[toCheck] !== 'undefined') {
          return toCheck;
        }
      }
      return null;
    }

    /**
     * Destroys the popper.
     * @method
     * @memberof Popper
     */
    function destroy() {
      this.state.isDestroyed = true;

      // touch DOM only if `applyStyle` modifier is enabled
      if (isModifierEnabled(this.modifiers, 'applyStyle')) {
        this.popper.removeAttribute('x-placement');
        this.popper.style.position = '';
        this.popper.style.top = '';
        this.popper.style.left = '';
        this.popper.style.right = '';
        this.popper.style.bottom = '';
        this.popper.style.willChange = '';
        this.popper.style[getSupportedPropertyName('transform')] = '';
      }

      this.disableEventListeners();

      // remove the popper if user explicity asked for the deletion on destroy
      // do not use `remove` because IE11 doesn't support it
      if (this.options.removeOnDestroy) {
        this.popper.parentNode.removeChild(this.popper);
      }
      return this;
    }

    /**
     * Get the window associated with the element
     * @argument {Element} element
     * @returns {Window}
     */
    function getWindow(element) {
      var ownerDocument = element.ownerDocument;
      return ownerDocument ? ownerDocument.defaultView : window;
    }

    function attachToScrollParents(scrollParent, event, callback, scrollParents) {
      var isBody = scrollParent.nodeName === 'BODY';
      var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
      target.addEventListener(event, callback, { passive: true });

      if (!isBody) {
        attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
      }
      scrollParents.push(target);
    }

    /**
     * Setup needed event listeners used to update the popper position
     * @method
     * @memberof Popper.Utils
     * @private
     */
    function setupEventListeners(reference, options, state, updateBound) {
      // Resize event listener on window
      state.updateBound = updateBound;
      getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

      // Scroll event listener on scroll parents
      var scrollElement = getScrollParent(reference);
      attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
      state.scrollElement = scrollElement;
      state.eventsEnabled = true;

      return state;
    }

    /**
     * It will add resize/scroll events and start recalculating
     * position of the popper element when they are triggered.
     * @method
     * @memberof Popper
     */
    function enableEventListeners() {
      if (!this.state.eventsEnabled) {
        this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
      }
    }

    /**
     * Remove event listeners used to update the popper position
     * @method
     * @memberof Popper.Utils
     * @private
     */
    function removeEventListeners(reference, state) {
      // Remove resize event listener on window
      getWindow(reference).removeEventListener('resize', state.updateBound);

      // Remove scroll event listener on scroll parents
      state.scrollParents.forEach(function (target) {
        target.removeEventListener('scroll', state.updateBound);
      });

      // Reset state
      state.updateBound = null;
      state.scrollParents = [];
      state.scrollElement = null;
      state.eventsEnabled = false;
      return state;
    }

    /**
     * It will remove resize/scroll events and won't recalculate popper position
     * when they are triggered. It also won't trigger `onUpdate` callback anymore,
     * unless you call `update` method manually.
     * @method
     * @memberof Popper
     */
    function disableEventListeners() {
      if (this.state.eventsEnabled) {
        cancelAnimationFrame(this.scheduleUpdate);
        this.state = removeEventListeners(this.reference, this.state);
      }
    }

    /**
     * Tells if a given input is a number
     * @method
     * @memberof Popper.Utils
     * @param {*} input to check
     * @return {Boolean}
     */
    function isNumeric(n) {
      return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
    }

    /**
     * Set the style to the given popper
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element - Element to apply the style to
     * @argument {Object} styles
     * Object with a list of properties and values which will be applied to the element
     */
    function setStyles(element, styles) {
      Object.keys(styles).forEach(function (prop) {
        var unit = '';
        // add unit if the value is numeric and is one of the following
        if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
          unit = 'px';
        }
        element.style[prop] = styles[prop] + unit;
      });
    }

    /**
     * Set the attributes to the given popper
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element - Element to apply the attributes to
     * @argument {Object} styles
     * Object with a list of properties and values which will be applied to the element
     */
    function setAttributes(element, attributes) {
      Object.keys(attributes).forEach(function (prop) {
        var value = attributes[prop];
        if (value !== false) {
          element.setAttribute(prop, attributes[prop]);
        } else {
          element.removeAttribute(prop);
        }
      });
    }

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} data.styles - List of style properties - values to apply to popper element
     * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The same data object
     */
    function applyStyle(data) {
      // any property present in `data.styles` will be applied to the popper,
      // in this way we can make the 3rd party modifiers add custom styles to it
      // Be aware, modifiers could override the properties defined in the previous
      // lines of this modifier!
      setStyles(data.instance.popper, data.styles);

      // any property present in `data.attributes` will be applied to the popper,
      // they will be set as HTML attributes of the element
      setAttributes(data.instance.popper, data.attributes);

      // if arrowElement is defined and arrowStyles has some properties
      if (data.arrowElement && Object.keys(data.arrowStyles).length) {
        setStyles(data.arrowElement, data.arrowStyles);
      }

      return data;
    }

    /**
     * Set the x-placement attribute before everything else because it could be used
     * to add margins to the popper margins needs to be calculated to get the
     * correct popper offsets.
     * @method
     * @memberof Popper.modifiers
     * @param {HTMLElement} reference - The reference element used to position the popper
     * @param {HTMLElement} popper - The HTML element used as popper
     * @param {Object} options - Popper.js options
     */
    function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
      // compute reference element offsets
      var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

      // compute auto placement, store placement inside the data object,
      // modifiers will be able to edit `placement` if needed
      // and refer to originalPlacement to know the original value
      var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

      popper.setAttribute('x-placement', placement);

      // Apply `position` to popper before anything else because
      // without the position applied we can't guarantee correct computations
      setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

      return options;
    }

    /**
     * @function
     * @memberof Popper.Utils
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Boolean} shouldRound - If the offsets should be rounded at all
     * @returns {Object} The popper's position offsets rounded
     *
     * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
     * good as it can be within reason.
     * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
     *
     * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
     * as well on High DPI screens).
     *
     * Firefox prefers no rounding for positioning and does not have blurriness on
     * high DPI screens.
     *
     * Only horizontal placement and left/right values need to be considered.
     */
    function getRoundedOffsets(data, shouldRound) {
      var _data$offsets = data.offsets,
          popper = _data$offsets.popper,
          reference = _data$offsets.reference;
      var round = Math.round,
          floor = Math.floor;

      var noRound = function noRound(v) {
        return v;
      };

      var referenceWidth = round(reference.width);
      var popperWidth = round(popper.width);

      var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
      var isVariation = data.placement.indexOf('-') !== -1;
      var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
      var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

      var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
      var verticalToInteger = !shouldRound ? noRound : round;

      return {
        left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
        top: verticalToInteger(popper.top),
        bottom: verticalToInteger(popper.bottom),
        right: horizontalToInteger(popper.right)
      };
    }

    var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function computeStyle(data, options) {
      var x = options.x,
          y = options.y;
      var popper = data.offsets.popper;

      // Remove this legacy support in Popper.js v2

      var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
        return modifier.name === 'applyStyle';
      }).gpuAcceleration;
      if (legacyGpuAccelerationOption !== undefined) {
        console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
      }
      var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

      var offsetParent = getOffsetParent(data.instance.popper);
      var offsetParentRect = getBoundingClientRect(offsetParent);

      // Styles
      var styles = {
        position: popper.position
      };

      var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

      var sideA = x === 'bottom' ? 'top' : 'bottom';
      var sideB = y === 'right' ? 'left' : 'right';

      // if gpuAcceleration is set to `true` and transform is supported,
      //  we use `translate3d` to apply the position to the popper we
      // automatically use the supported prefixed version if needed
      var prefixedProperty = getSupportedPropertyName('transform');

      // now, let's make a step back and look at this code closely (wtf?)
      // If the content of the popper grows once it's been positioned, it
      // may happen that the popper gets misplaced because of the new content
      // overflowing its reference element
      // To avoid this problem, we provide two options (x and y), which allow
      // the consumer to define the offset origin.
      // If we position a popper on top of a reference element, we can set
      // `x` to `top` to make the popper grow towards its top instead of
      // its bottom.
      var left = void 0,
          top = void 0;
      if (sideA === 'bottom') {
        // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
        // and not the bottom of the html element
        if (offsetParent.nodeName === 'HTML') {
          top = -offsetParent.clientHeight + offsets.bottom;
        } else {
          top = -offsetParentRect.height + offsets.bottom;
        }
      } else {
        top = offsets.top;
      }
      if (sideB === 'right') {
        if (offsetParent.nodeName === 'HTML') {
          left = -offsetParent.clientWidth + offsets.right;
        } else {
          left = -offsetParentRect.width + offsets.right;
        }
      } else {
        left = offsets.left;
      }
      if (gpuAcceleration && prefixedProperty) {
        styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
        styles[sideA] = 0;
        styles[sideB] = 0;
        styles.willChange = 'transform';
      } else {
        // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
        var invertTop = sideA === 'bottom' ? -1 : 1;
        var invertLeft = sideB === 'right' ? -1 : 1;
        styles[sideA] = top * invertTop;
        styles[sideB] = left * invertLeft;
        styles.willChange = sideA + ', ' + sideB;
      }

      // Attributes
      var attributes = {
        'x-placement': data.placement
      };

      // Update `data` attributes, styles and arrowStyles
      data.attributes = _extends({}, attributes, data.attributes);
      data.styles = _extends({}, styles, data.styles);
      data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

      return data;
    }

    /**
     * Helper used to know if the given modifier depends from another one.<br />
     * It checks if the needed modifier is listed and enabled.
     * @method
     * @memberof Popper.Utils
     * @param {Array} modifiers - list of modifiers
     * @param {String} requestingName - name of requesting modifier
     * @param {String} requestedName - name of requested modifier
     * @returns {Boolean}
     */
    function isModifierRequired(modifiers, requestingName, requestedName) {
      var requesting = find(modifiers, function (_ref) {
        var name = _ref.name;
        return name === requestingName;
      });

      var isRequired = !!requesting && modifiers.some(function (modifier) {
        return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
      });

      if (!isRequired) {
        var _requesting = '`' + requestingName + '`';
        var requested = '`' + requestedName + '`';
        console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
      }
      return isRequired;
    }

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function arrow(data, options) {
      var _data$offsets$arrow;

      // arrow depends on keepTogether in order to work
      if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
        return data;
      }

      var arrowElement = options.element;

      // if arrowElement is a string, suppose it's a CSS selector
      if (typeof arrowElement === 'string') {
        arrowElement = data.instance.popper.querySelector(arrowElement);

        // if arrowElement is not found, don't run the modifier
        if (!arrowElement) {
          return data;
        }
      } else {
        // if the arrowElement isn't a query selector we must check that the
        // provided DOM node is child of its popper node
        if (!data.instance.popper.contains(arrowElement)) {
          console.warn('WARNING: `arrow.element` must be child of its popper element!');
          return data;
        }
      }

      var placement = data.placement.split('-')[0];
      var _data$offsets = data.offsets,
          popper = _data$offsets.popper,
          reference = _data$offsets.reference;

      var isVertical = ['left', 'right'].indexOf(placement) !== -1;

      var len = isVertical ? 'height' : 'width';
      var sideCapitalized = isVertical ? 'Top' : 'Left';
      var side = sideCapitalized.toLowerCase();
      var altSide = isVertical ? 'left' : 'top';
      var opSide = isVertical ? 'bottom' : 'right';
      var arrowElementSize = getOuterSizes(arrowElement)[len];

      //
      // extends keepTogether behavior making sure the popper and its
      // reference have enough pixels in conjunction
      //

      // top/left side
      if (reference[opSide] - arrowElementSize < popper[side]) {
        data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
      }
      // bottom/right side
      if (reference[side] + arrowElementSize > popper[opSide]) {
        data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
      }
      data.offsets.popper = getClientRect(data.offsets.popper);

      // compute center of the popper
      var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

      // Compute the sideValue using the updated popper offsets
      // take popper margin in account because we don't have this info available
      var css = getStyleComputedProperty(data.instance.popper);
      var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
      var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
      var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

      // prevent arrowElement from being placed not contiguously to its popper
      sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

      data.arrowElement = arrowElement;
      data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

      return data;
    }

    /**
     * Get the opposite placement variation of the given one
     * @method
     * @memberof Popper.Utils
     * @argument {String} placement variation
     * @returns {String} flipped placement variation
     */
    function getOppositeVariation(variation) {
      if (variation === 'end') {
        return 'start';
      } else if (variation === 'start') {
        return 'end';
      }
      return variation;
    }

    /**
     * List of accepted placements to use as values of the `placement` option.<br />
     * Valid placements are:
     * - `auto`
     * - `top`
     * - `right`
     * - `bottom`
     * - `left`
     *
     * Each placement can have a variation from this list:
     * - `-start`
     * - `-end`
     *
     * Variations are interpreted easily if you think of them as the left to right
     * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
     * is right.<br />
     * Vertically (`left` and `right`), `start` is top and `end` is bottom.
     *
     * Some valid examples are:
     * - `top-end` (on top of reference, right aligned)
     * - `right-start` (on right of reference, top aligned)
     * - `bottom` (on bottom, centered)
     * - `auto-end` (on the side with more space available, alignment depends by placement)
     *
     * @static
     * @type {Array}
     * @enum {String}
     * @readonly
     * @method placements
     * @memberof Popper
     */
    var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

    // Get rid of `auto` `auto-start` and `auto-end`
    var validPlacements = placements.slice(3);

    /**
     * Given an initial placement, returns all the subsequent placements
     * clockwise (or counter-clockwise).
     *
     * @method
     * @memberof Popper.Utils
     * @argument {String} placement - A valid placement (it accepts variations)
     * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
     * @returns {Array} placements including their variations
     */
    function clockwise(placement) {
      var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      var index = validPlacements.indexOf(placement);
      var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
      return counter ? arr.reverse() : arr;
    }

    var BEHAVIORS = {
      FLIP: 'flip',
      CLOCKWISE: 'clockwise',
      COUNTERCLOCKWISE: 'counterclockwise'
    };

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function flip(data, options) {
      // if `inner` modifier is enabled, we can't use the `flip` modifier
      if (isModifierEnabled(data.instance.modifiers, 'inner')) {
        return data;
      }

      if (data.flipped && data.placement === data.originalPlacement) {
        // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
        return data;
      }

      var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

      var placement = data.placement.split('-')[0];
      var placementOpposite = getOppositePlacement(placement);
      var variation = data.placement.split('-')[1] || '';

      var flipOrder = [];

      switch (options.behavior) {
        case BEHAVIORS.FLIP:
          flipOrder = [placement, placementOpposite];
          break;
        case BEHAVIORS.CLOCKWISE:
          flipOrder = clockwise(placement);
          break;
        case BEHAVIORS.COUNTERCLOCKWISE:
          flipOrder = clockwise(placement, true);
          break;
        default:
          flipOrder = options.behavior;
      }

      flipOrder.forEach(function (step, index) {
        if (placement !== step || flipOrder.length === index + 1) {
          return data;
        }

        placement = data.placement.split('-')[0];
        placementOpposite = getOppositePlacement(placement);

        var popperOffsets = data.offsets.popper;
        var refOffsets = data.offsets.reference;

        // using floor because the reference offsets may contain decimals we are not going to consider here
        var floor = Math.floor;
        var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

        var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
        var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
        var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
        var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

        var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

        // flip the variation if required
        var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;

        // flips variation if reference element overflows boundaries
        var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

        // flips variation if popper content overflows boundaries
        var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === 'start' && overflowsRight || isVertical && variation === 'end' && overflowsLeft || !isVertical && variation === 'start' && overflowsBottom || !isVertical && variation === 'end' && overflowsTop);

        var flippedVariation = flippedVariationByRef || flippedVariationByContent;

        if (overlapsRef || overflowsBoundaries || flippedVariation) {
          // this boolean to detect any flip loop
          data.flipped = true;

          if (overlapsRef || overflowsBoundaries) {
            placement = flipOrder[index + 1];
          }

          if (flippedVariation) {
            variation = getOppositeVariation(variation);
          }

          data.placement = placement + (variation ? '-' + variation : '');

          // this object contains `position`, we want to preserve it along with
          // any additional property we may add in the future
          data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

          data = runModifiers(data.instance.modifiers, data, 'flip');
        }
      });
      return data;
    }

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function keepTogether(data) {
      var _data$offsets = data.offsets,
          popper = _data$offsets.popper,
          reference = _data$offsets.reference;

      var placement = data.placement.split('-')[0];
      var floor = Math.floor;
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
      var side = isVertical ? 'right' : 'bottom';
      var opSide = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      if (popper[side] < floor(reference[opSide])) {
        data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
      }
      if (popper[opSide] > floor(reference[side])) {
        data.offsets.popper[opSide] = floor(reference[side]);
      }

      return data;
    }

    /**
     * Converts a string containing value + unit into a px value number
     * @function
     * @memberof {modifiers~offset}
     * @private
     * @argument {String} str - Value + unit string
     * @argument {String} measurement - `height` or `width`
     * @argument {Object} popperOffsets
     * @argument {Object} referenceOffsets
     * @returns {Number|String}
     * Value in pixels, or original string if no values were extracted
     */
    function toValue(str, measurement, popperOffsets, referenceOffsets) {
      // separate value from unit
      var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
      var value = +split[1];
      var unit = split[2];

      // If it's not a number it's an operator, I guess
      if (!value) {
        return str;
      }

      if (unit.indexOf('%') === 0) {
        var element = void 0;
        switch (unit) {
          case '%p':
            element = popperOffsets;
            break;
          case '%':
          case '%r':
          default:
            element = referenceOffsets;
        }

        var rect = getClientRect(element);
        return rect[measurement] / 100 * value;
      } else if (unit === 'vh' || unit === 'vw') {
        // if is a vh or vw, we calculate the size based on the viewport
        var size = void 0;
        if (unit === 'vh') {
          size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        } else {
          size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        }
        return size / 100 * value;
      } else {
        // if is an explicit pixel unit, we get rid of the unit and keep the value
        // if is an implicit unit, it's px, and we return just the value
        return value;
      }
    }

    /**
     * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
     * @function
     * @memberof {modifiers~offset}
     * @private
     * @argument {String} offset
     * @argument {Object} popperOffsets
     * @argument {Object} referenceOffsets
     * @argument {String} basePlacement
     * @returns {Array} a two cells array with x and y offsets in numbers
     */
    function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
      var offsets = [0, 0];

      // Use height if placement is left or right and index is 0 otherwise use width
      // in this way the first offset will use an axis and the second one
      // will use the other one
      var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

      // Split the offset string to obtain a list of values and operands
      // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
      var fragments = offset.split(/(\+|\-)/).map(function (frag) {
        return frag.trim();
      });

      // Detect if the offset string contains a pair of values or a single one
      // they could be separated by comma or space
      var divider = fragments.indexOf(find(fragments, function (frag) {
        return frag.search(/,|\s/) !== -1;
      }));

      if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
        console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
      }

      // If divider is found, we divide the list of values and operands to divide
      // them by ofset X and Y.
      var splitRegex = /\s*,\s*|\s+/;
      var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

      // Convert the values with units to absolute pixels to allow our computations
      ops = ops.map(function (op, index) {
        // Most of the units rely on the orientation of the popper
        var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
        var mergeWithPrevious = false;
        return op
        // This aggregates any `+` or `-` sign that aren't considered operators
        // e.g.: 10 + +5 => [10, +, +5]
        .reduce(function (a, b) {
          if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
            a[a.length - 1] = b;
            mergeWithPrevious = true;
            return a;
          } else if (mergeWithPrevious) {
            a[a.length - 1] += b;
            mergeWithPrevious = false;
            return a;
          } else {
            return a.concat(b);
          }
        }, [])
        // Here we convert the string values into number values (in px)
        .map(function (str) {
          return toValue(str, measurement, popperOffsets, referenceOffsets);
        });
      });

      // Loop trough the offsets arrays and execute the operations
      ops.forEach(function (op, index) {
        op.forEach(function (frag, index2) {
          if (isNumeric(frag)) {
            offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
          }
        });
      });
      return offsets;
    }

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @argument {Number|String} options.offset=0
     * The offset value as described in the modifier description
     * @returns {Object} The data object, properly modified
     */
    function offset(data, _ref) {
      var offset = _ref.offset;
      var placement = data.placement,
          _data$offsets = data.offsets,
          popper = _data$offsets.popper,
          reference = _data$offsets.reference;

      var basePlacement = placement.split('-')[0];

      var offsets = void 0;
      if (isNumeric(+offset)) {
        offsets = [+offset, 0];
      } else {
        offsets = parseOffset(offset, popper, reference, basePlacement);
      }

      if (basePlacement === 'left') {
        popper.top += offsets[0];
        popper.left -= offsets[1];
      } else if (basePlacement === 'right') {
        popper.top += offsets[0];
        popper.left += offsets[1];
      } else if (basePlacement === 'top') {
        popper.left += offsets[0];
        popper.top -= offsets[1];
      } else if (basePlacement === 'bottom') {
        popper.left += offsets[0];
        popper.top += offsets[1];
      }

      data.popper = popper;
      return data;
    }

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function preventOverflow(data, options) {
      var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

      // If offsetParent is the reference element, we really want to
      // go one step up and use the next offsetParent as reference to
      // avoid to make this modifier completely useless and look like broken
      if (data.instance.reference === boundariesElement) {
        boundariesElement = getOffsetParent(boundariesElement);
      }

      // NOTE: DOM access here
      // resets the popper's position so that the document size can be calculated excluding
      // the size of the popper element itself
      var transformProp = getSupportedPropertyName('transform');
      var popperStyles = data.instance.popper.style; // assignment to help minification
      var top = popperStyles.top,
          left = popperStyles.left,
          transform = popperStyles[transformProp];

      popperStyles.top = '';
      popperStyles.left = '';
      popperStyles[transformProp] = '';

      var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

      // NOTE: DOM access here
      // restores the original style properties after the offsets have been computed
      popperStyles.top = top;
      popperStyles.left = left;
      popperStyles[transformProp] = transform;

      options.boundaries = boundaries;

      var order = options.priority;
      var popper = data.offsets.popper;

      var check = {
        primary: function primary(placement) {
          var value = popper[placement];
          if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
            value = Math.max(popper[placement], boundaries[placement]);
          }
          return defineProperty({}, placement, value);
        },
        secondary: function secondary(placement) {
          var mainSide = placement === 'right' ? 'left' : 'top';
          var value = popper[mainSide];
          if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
            value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
          }
          return defineProperty({}, mainSide, value);
        }
      };

      order.forEach(function (placement) {
        var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
        popper = _extends({}, popper, check[side](placement));
      });

      data.offsets.popper = popper;

      return data;
    }

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function shift(data) {
      var placement = data.placement;
      var basePlacement = placement.split('-')[0];
      var shiftvariation = placement.split('-')[1];

      // if shift shiftvariation is specified, run the modifier
      if (shiftvariation) {
        var _data$offsets = data.offsets,
            reference = _data$offsets.reference,
            popper = _data$offsets.popper;

        var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
        var side = isVertical ? 'left' : 'top';
        var measurement = isVertical ? 'width' : 'height';

        var shiftOffsets = {
          start: defineProperty({}, side, reference[side]),
          end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
        };

        data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
      }

      return data;
    }

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function hide(data) {
      if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
        return data;
      }

      var refRect = data.offsets.reference;
      var bound = find(data.instance.modifiers, function (modifier) {
        return modifier.name === 'preventOverflow';
      }).boundaries;

      if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
        // Avoid unnecessary DOM access if visibility hasn't changed
        if (data.hide === true) {
          return data;
        }

        data.hide = true;
        data.attributes['x-out-of-boundaries'] = '';
      } else {
        // Avoid unnecessary DOM access if visibility hasn't changed
        if (data.hide === false) {
          return data;
        }

        data.hide = false;
        data.attributes['x-out-of-boundaries'] = false;
      }

      return data;
    }

    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function inner(data) {
      var placement = data.placement;
      var basePlacement = placement.split('-')[0];
      var _data$offsets = data.offsets,
          popper = _data$offsets.popper,
          reference = _data$offsets.reference;

      var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

      var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

      popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

      data.placement = getOppositePlacement(placement);
      data.offsets.popper = getClientRect(popper);

      return data;
    }

    /**
     * Modifier function, each modifier can have a function of this type assigned
     * to its `fn` property.<br />
     * These functions will be called on each update, this means that you must
     * make sure they are performant enough to avoid performance bottlenecks.
     *
     * @function ModifierFn
     * @argument {dataObject} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {dataObject} The data object, properly modified
     */

    /**
     * Modifiers are plugins used to alter the behavior of your poppers.<br />
     * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
     * needed by the library.
     *
     * Usually you don't want to override the `order`, `fn` and `onLoad` props.
     * All the other properties are configurations that could be tweaked.
     * @namespace modifiers
     */
    var modifiers = {
      /**
       * Modifier used to shift the popper on the start or end of its reference
       * element.<br />
       * It will read the variation of the `placement` property.<br />
       * It can be one either `-end` or `-start`.
       * @memberof modifiers
       * @inner
       */
      shift: {
        /** @prop {number} order=100 - Index used to define the order of execution */
        order: 100,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: shift
      },

      /**
       * The `offset` modifier can shift your popper on both its axis.
       *
       * It accepts the following units:
       * - `px` or unit-less, interpreted as pixels
       * - `%` or `%r`, percentage relative to the length of the reference element
       * - `%p`, percentage relative to the length of the popper element
       * - `vw`, CSS viewport width unit
       * - `vh`, CSS viewport height unit
       *
       * For length is intended the main axis relative to the placement of the popper.<br />
       * This means that if the placement is `top` or `bottom`, the length will be the
       * `width`. In case of `left` or `right`, it will be the `height`.
       *
       * You can provide a single value (as `Number` or `String`), or a pair of values
       * as `String` divided by a comma or one (or more) white spaces.<br />
       * The latter is a deprecated method because it leads to confusion and will be
       * removed in v2.<br />
       * Additionally, it accepts additions and subtractions between different units.
       * Note that multiplications and divisions aren't supported.
       *
       * Valid examples are:
       * ```
       * 10
       * '10%'
       * '10, 10'
       * '10%, 10'
       * '10 + 10%'
       * '10 - 5vh + 3%'
       * '-10px + 5vh, 5px - 6%'
       * ```
       * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
       * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
       * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
       *
       * @memberof modifiers
       * @inner
       */
      offset: {
        /** @prop {number} order=200 - Index used to define the order of execution */
        order: 200,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: offset,
        /** @prop {Number|String} offset=0
         * The offset value as described in the modifier description
         */
        offset: 0
      },

      /**
       * Modifier used to prevent the popper from being positioned outside the boundary.
       *
       * A scenario exists where the reference itself is not within the boundaries.<br />
       * We can say it has "escaped the boundaries" — or just "escaped".<br />
       * In this case we need to decide whether the popper should either:
       *
       * - detach from the reference and remain "trapped" in the boundaries, or
       * - if it should ignore the boundary and "escape with its reference"
       *
       * When `escapeWithReference` is set to`true` and reference is completely
       * outside its boundaries, the popper will overflow (or completely leave)
       * the boundaries in order to remain attached to the edge of the reference.
       *
       * @memberof modifiers
       * @inner
       */
      preventOverflow: {
        /** @prop {number} order=300 - Index used to define the order of execution */
        order: 300,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: preventOverflow,
        /**
         * @prop {Array} [priority=['left','right','top','bottom']]
         * Popper will try to prevent overflow following these priorities by default,
         * then, it could overflow on the left and on top of the `boundariesElement`
         */
        priority: ['left', 'right', 'top', 'bottom'],
        /**
         * @prop {number} padding=5
         * Amount of pixel used to define a minimum distance between the boundaries
         * and the popper. This makes sure the popper always has a little padding
         * between the edges of its container
         */
        padding: 5,
        /**
         * @prop {String|HTMLElement} boundariesElement='scrollParent'
         * Boundaries used by the modifier. Can be `scrollParent`, `window`,
         * `viewport` or any DOM element.
         */
        boundariesElement: 'scrollParent'
      },

      /**
       * Modifier used to make sure the reference and its popper stay near each other
       * without leaving any gap between the two. Especially useful when the arrow is
       * enabled and you want to ensure that it points to its reference element.
       * It cares only about the first axis. You can still have poppers with margin
       * between the popper and its reference element.
       * @memberof modifiers
       * @inner
       */
      keepTogether: {
        /** @prop {number} order=400 - Index used to define the order of execution */
        order: 400,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: keepTogether
      },

      /**
       * This modifier is used to move the `arrowElement` of the popper to make
       * sure it is positioned between the reference element and its popper element.
       * It will read the outer size of the `arrowElement` node to detect how many
       * pixels of conjunction are needed.
       *
       * It has no effect if no `arrowElement` is provided.
       * @memberof modifiers
       * @inner
       */
      arrow: {
        /** @prop {number} order=500 - Index used to define the order of execution */
        order: 500,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: arrow,
        /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
        element: '[x-arrow]'
      },

      /**
       * Modifier used to flip the popper's placement when it starts to overlap its
       * reference element.
       *
       * Requires the `preventOverflow` modifier before it in order to work.
       *
       * **NOTE:** this modifier will interrupt the current update cycle and will
       * restart it if it detects the need to flip the placement.
       * @memberof modifiers
       * @inner
       */
      flip: {
        /** @prop {number} order=600 - Index used to define the order of execution */
        order: 600,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: flip,
        /**
         * @prop {String|Array} behavior='flip'
         * The behavior used to change the popper's placement. It can be one of
         * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
         * placements (with optional variations)
         */
        behavior: 'flip',
        /**
         * @prop {number} padding=5
         * The popper will flip if it hits the edges of the `boundariesElement`
         */
        padding: 5,
        /**
         * @prop {String|HTMLElement} boundariesElement='viewport'
         * The element which will define the boundaries of the popper position.
         * The popper will never be placed outside of the defined boundaries
         * (except if `keepTogether` is enabled)
         */
        boundariesElement: 'viewport',
        /**
         * @prop {Boolean} flipVariations=false
         * The popper will switch placement variation between `-start` and `-end` when
         * the reference element overlaps its boundaries.
         *
         * The original placement should have a set variation.
         */
        flipVariations: false,
        /**
         * @prop {Boolean} flipVariationsByContent=false
         * The popper will switch placement variation between `-start` and `-end` when
         * the popper element overlaps its reference boundaries.
         *
         * The original placement should have a set variation.
         */
        flipVariationsByContent: false
      },

      /**
       * Modifier used to make the popper flow toward the inner of the reference element.
       * By default, when this modifier is disabled, the popper will be placed outside
       * the reference element.
       * @memberof modifiers
       * @inner
       */
      inner: {
        /** @prop {number} order=700 - Index used to define the order of execution */
        order: 700,
        /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
        enabled: false,
        /** @prop {ModifierFn} */
        fn: inner
      },

      /**
       * Modifier used to hide the popper when its reference element is outside of the
       * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
       * be used to hide with a CSS selector the popper when its reference is
       * out of boundaries.
       *
       * Requires the `preventOverflow` modifier before it in order to work.
       * @memberof modifiers
       * @inner
       */
      hide: {
        /** @prop {number} order=800 - Index used to define the order of execution */
        order: 800,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: hide
      },

      /**
       * Computes the style that will be applied to the popper element to gets
       * properly positioned.
       *
       * Note that this modifier will not touch the DOM, it just prepares the styles
       * so that `applyStyle` modifier can apply it. This separation is useful
       * in case you need to replace `applyStyle` with a custom implementation.
       *
       * This modifier has `850` as `order` value to maintain backward compatibility
       * with previous versions of Popper.js. Expect the modifiers ordering method
       * to change in future major versions of the library.
       *
       * @memberof modifiers
       * @inner
       */
      computeStyle: {
        /** @prop {number} order=850 - Index used to define the order of execution */
        order: 850,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: computeStyle,
        /**
         * @prop {Boolean} gpuAcceleration=true
         * If true, it uses the CSS 3D transformation to position the popper.
         * Otherwise, it will use the `top` and `left` properties
         */
        gpuAcceleration: true,
        /**
         * @prop {string} [x='bottom']
         * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
         * Change this if your popper should grow in a direction different from `bottom`
         */
        x: 'bottom',
        /**
         * @prop {string} [x='left']
         * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
         * Change this if your popper should grow in a direction different from `right`
         */
        y: 'right'
      },

      /**
       * Applies the computed styles to the popper element.
       *
       * All the DOM manipulations are limited to this modifier. This is useful in case
       * you want to integrate Popper.js inside a framework or view library and you
       * want to delegate all the DOM manipulations to it.
       *
       * Note that if you disable this modifier, you must make sure the popper element
       * has its position set to `absolute` before Popper.js can do its work!
       *
       * Just disable this modifier and define your own to achieve the desired effect.
       *
       * @memberof modifiers
       * @inner
       */
      applyStyle: {
        /** @prop {number} order=900 - Index used to define the order of execution */
        order: 900,
        /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
        enabled: true,
        /** @prop {ModifierFn} */
        fn: applyStyle,
        /** @prop {Function} */
        onLoad: applyStyleOnLoad,
        /**
         * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
         * @prop {Boolean} gpuAcceleration=true
         * If true, it uses the CSS 3D transformation to position the popper.
         * Otherwise, it will use the `top` and `left` properties
         */
        gpuAcceleration: undefined
      }
    };

    /**
     * The `dataObject` is an object containing all the information used by Popper.js.
     * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
     * @name dataObject
     * @property {Object} data.instance The Popper.js instance
     * @property {String} data.placement Placement applied to popper
     * @property {String} data.originalPlacement Placement originally defined on init
     * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
     * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
     * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
     * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
     * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
     * @property {Object} data.boundaries Offsets of the popper boundaries
     * @property {Object} data.offsets The measurements of popper, reference and arrow elements
     * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
     * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
     * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
     */

    /**
     * Default options provided to Popper.js constructor.<br />
     * These can be overridden using the `options` argument of Popper.js.<br />
     * To override an option, simply pass an object with the same
     * structure of the `options` object, as the 3rd argument. For example:
     * ```
     * new Popper(ref, pop, {
     *   modifiers: {
     *     preventOverflow: { enabled: false }
     *   }
     * })
     * ```
     * @type {Object}
     * @static
     * @memberof Popper
     */
    var Defaults = {
      /**
       * Popper's placement.
       * @prop {Popper.placements} placement='bottom'
       */
      placement: 'bottom',

      /**
       * Set this to true if you want popper to position it self in 'fixed' mode
       * @prop {Boolean} positionFixed=false
       */
      positionFixed: false,

      /**
       * Whether events (resize, scroll) are initially enabled.
       * @prop {Boolean} eventsEnabled=true
       */
      eventsEnabled: true,

      /**
       * Set to true if you want to automatically remove the popper when
       * you call the `destroy` method.
       * @prop {Boolean} removeOnDestroy=false
       */
      removeOnDestroy: false,

      /**
       * Callback called when the popper is created.<br />
       * By default, it is set to no-op.<br />
       * Access Popper.js instance with `data.instance`.
       * @prop {onCreate}
       */
      onCreate: function onCreate() {},

      /**
       * Callback called when the popper is updated. This callback is not called
       * on the initialization/creation of the popper, but only on subsequent
       * updates.<br />
       * By default, it is set to no-op.<br />
       * Access Popper.js instance with `data.instance`.
       * @prop {onUpdate}
       */
      onUpdate: function onUpdate() {},

      /**
       * List of modifiers used to modify the offsets before they are applied to the popper.
       * They provide most of the functionalities of Popper.js.
       * @prop {modifiers}
       */
      modifiers: modifiers
    };

    /**
     * @callback onCreate
     * @param {dataObject} data
     */

    /**
     * @callback onUpdate
     * @param {dataObject} data
     */

    // Utils
    // Methods
    var Popper = function () {
      /**
       * Creates a new Popper.js instance.
       * @class Popper
       * @param {Element|referenceObject} reference - The reference element used to position the popper
       * @param {Element} popper - The HTML / XML element used as the popper
       * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
       * @return {Object} instance - The generated Popper.js instance
       */
      function Popper(reference, popper) {
        var _this = this;

        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        classCallCheck(this, Popper);

        this.scheduleUpdate = function () {
          return requestAnimationFrame(_this.update);
        };

        // make update() debounced, so that it only runs at most once-per-tick
        this.update = debounce(this.update.bind(this));

        // with {} we create a new object with the options inside it
        this.options = _extends({}, Popper.Defaults, options);

        // init state
        this.state = {
          isDestroyed: false,
          isCreated: false,
          scrollParents: []
        };

        // get reference and popper elements (allow jQuery wrappers)
        this.reference = reference && reference.jquery ? reference[0] : reference;
        this.popper = popper && popper.jquery ? popper[0] : popper;

        // Deep merge modifiers options
        this.options.modifiers = {};
        Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
          _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
        });

        // Refactoring modifiers' list (Object => Array)
        this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
          return _extends({
            name: name
          }, _this.options.modifiers[name]);
        })
        // sort the modifiers by order
        .sort(function (a, b) {
          return a.order - b.order;
        });

        // modifiers have the ability to execute arbitrary code when Popper.js get inited
        // such code is executed in the same order of its modifier
        // they could add new properties to their options configuration
        // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
        this.modifiers.forEach(function (modifierOptions) {
          if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
            modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
          }
        });

        // fire the first update to position the popper in the right place
        this.update();

        var eventsEnabled = this.options.eventsEnabled;
        if (eventsEnabled) {
          // setup event listeners, they will take care of update the position in specific situations
          this.enableEventListeners();
        }

        this.state.eventsEnabled = eventsEnabled;
      }

      // We can't use class properties because they don't get listed in the
      // class prototype and break stuff like Sinon stubs


      createClass(Popper, [{
        key: 'update',
        value: function update$$1() {
          return update.call(this);
        }
      }, {
        key: 'destroy',
        value: function destroy$$1() {
          return destroy.call(this);
        }
      }, {
        key: 'enableEventListeners',
        value: function enableEventListeners$$1() {
          return enableEventListeners.call(this);
        }
      }, {
        key: 'disableEventListeners',
        value: function disableEventListeners$$1() {
          return disableEventListeners.call(this);
        }

        /**
         * Schedules an update. It will run on the next UI update available.
         * @method scheduleUpdate
         * @memberof Popper
         */


        /**
         * Collection of utilities useful when writing custom modifiers.
         * Starting from version 1.7, this method is available only if you
         * include `popper-utils.js` before `popper.js`.
         *
         * **DEPRECATION**: This way to access PopperUtils is deprecated
         * and will be removed in v2! Use the PopperUtils module directly instead.
         * Due to the high instability of the methods contained in Utils, we can't
         * guarantee them to follow semver. Use them at your own risk!
         * @static
         * @private
         * @type {Object}
         * @deprecated since version 1.8
         * @member Utils
         * @memberof Popper
         */

      }]);
      return Popper;
    }();

    /**
     * The `referenceObject` is an object that provides an interface compatible with Popper.js
     * and lets you use it as replacement of a real DOM node.<br />
     * You can use this method to position a popper relatively to a set of coordinates
     * in case you don't have a DOM node to use as reference.
     *
     * ```
     * new Popper(referenceObject, popperNode);
     * ```
     *
     * NB: This feature isn't supported in Internet Explorer 10.
     * @name referenceObject
     * @property {Function} data.getBoundingClientRect
     * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
     * @property {number} data.clientWidth
     * An ES6 getter that will return the width of the virtual reference element.
     * @property {number} data.clientHeight
     * An ES6 getter that will return the height of the virtual reference element.
     */


    Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
    Popper.placements = placements;
    Popper.Defaults = Defaults;

    /**!
     * @fileOverview Kickass library to create and place poppers near their reference elements.
     * @version 1.3.2
     * @license
     * Copyright (c) 2016 Federico Zivolo and contributors
     *
     * Permission is hereby granted, free of charge, to any person obtaining a copy
     * of this software and associated documentation files (the "Software"), to deal
     * in the Software without restriction, including without limitation the rights
     * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the Software is
     * furnished to do so, subject to the following conditions:
     *
     * The above copyright notice and this permission notice shall be included in all
     * copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
     * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
     * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
     * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
     * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
     * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
     * SOFTWARE.
     */

    /**
     * Check if the given variable is a function
     * @method
     * @memberof Popper.Utils
     * @argument {Any} functionToCheck - variable to check
     * @returns {Boolean} answer to: is a function?
     */
    function isFunction$1(functionToCheck) {
      var getType = {};
      return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }

    var classCallCheck$1 = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass$1 = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) { descriptor.writable = true; }
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) { defineProperties(Constructor.prototype, protoProps); }
        if (staticProps) { defineProperties(Constructor, staticProps); }
        return Constructor;
      };
    }();







    var _extends$1 = Object.assign || function (target) {
      var arguments$1 = arguments;

      for (var i = 1; i < arguments.length; i++) {
        var source = arguments$1[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    var DEFAULT_OPTIONS = {
      container: false,
      delay: 0,
      html: false,
      placement: 'top',
      title: '',
      template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      offset: 0,
      arrowSelector: '.tooltip-arrow, .tooltip__arrow',
      innerSelector: '.tooltip-inner, .tooltip__inner'
    };

    var Tooltip = function () {
      /**
       * Create a new Tooltip.js instance
       * @class Tooltip
       * @param {HTMLElement} reference - The DOM node used as reference of the tooltip (it can be a jQuery element).
       * @param {Object} options
       * @param {String} options.placement='top'
       *      Placement of the popper accepted values: `top(-start, -end), right(-start, -end), bottom(-start, -end),
       *      left(-start, -end)`
       * @param {String} options.arrowSelector='.tooltip-arrow, .tooltip__arrow' - className used to locate the DOM arrow element in the tooltip.
       * @param {String} options.innerSelector='.tooltip-inner, .tooltip__inner' - className used to locate the DOM inner element in the tooltip.
       * @param {HTMLElement|String|false} options.container=false - Append the tooltip to a specific element.
       * @param {Number|Object} options.delay=0
       *      Delay showing and hiding the tooltip (ms) - does not apply to manual trigger type.
       *      If a number is supplied, delay is applied to both hide/show.
       *      Object structure is: `{ show: 500, hide: 100 }`
       * @param {Boolean} options.html=false - Insert HTML into the tooltip. If false, the content will inserted with `textContent`.
       * @param {String} [options.template='<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>']
       *      Base HTML to used when creating the tooltip.
       *      The tooltip's `title` will be injected into the `.tooltip-inner` or `.tooltip__inner`.
       *      `.tooltip-arrow` or `.tooltip__arrow` will become the tooltip's arrow.
       *      The outermost wrapper element should have the `.tooltip` class.
       * @param {String|HTMLElement|TitleFunction} options.title='' - Default title value if `title` attribute isn't present.
       * @param {String} [options.trigger='hover focus']
       *      How tooltip is triggered - click, hover, focus, manual.
       *      You may pass multiple triggers; separate them with a space. `manual` cannot be combined with any other trigger.
       * @param {Boolean} options.closeOnClickOutside=false - Close a popper on click outside of the popper and reference element. This has effect only when options.trigger is 'click'.
       * @param {String|HTMLElement} options.boundariesElement
       *      The element used as boundaries for the tooltip. For more information refer to Popper.js'
       *      [boundariesElement docs](https://popper.js.org/popper-documentation.html)
       * @param {Number|String} options.offset=0 - Offset of the tooltip relative to its reference. For more information refer to Popper.js'
       *      [offset docs](https://popper.js.org/popper-documentation.html)
       * @param {Object} options.popperOptions={} - Popper options, will be passed directly to popper instance. For more information refer to Popper.js'
       *      [options docs](https://popper.js.org/popper-documentation.html)
       * @return {Object} instance - The generated tooltip instance
       */
      function Tooltip(reference, options) {
        classCallCheck$1(this, Tooltip);

        _initialiseProps.call(this);

        // apply user options over default ones
        options = _extends$1({}, DEFAULT_OPTIONS, options);

        reference.jquery && (reference = reference[0]);

        // cache reference and options
        this.reference = reference;
        this.options = options;

        // get events list
        var events = typeof options.trigger === 'string' ? options.trigger.split(' ').filter(function (trigger) {
          return ['click', 'hover', 'focus'].indexOf(trigger) !== -1;
        }) : [];

        // set initial state
        this._isOpen = false;
        this._popperOptions = {};

        // set event listeners
        this._setEventListeners(reference, events, options);
      }

      //
      // Public methods
      //

      /**
       * Reveals an element's tooltip. This is considered a "manual" triggering of the tooltip.
       * Tooltips with zero-length titles are never displayed.
       * @method Tooltip#show
       * @memberof Tooltip
       */


      /**
       * Hides an element’s tooltip. This is considered a “manual” triggering of the tooltip.
       * @method Tooltip#hide
       * @memberof Tooltip
       */


      /**
       * Hides and destroys an element’s tooltip.
       * @method Tooltip#dispose
       * @memberof Tooltip
       */


      /**
       * Toggles an element’s tooltip. This is considered a “manual” triggering of the tooltip.
       * @method Tooltip#toggle
       * @memberof Tooltip
       */


      /**
       * Updates the tooltip's title content
       * @method Tooltip#updateTitleContent
       * @memberof Tooltip
       * @param {String|HTMLElement} title - The new content to use for the title
       */


      //
      // Private methods
      //

      createClass$1(Tooltip, [{
        key: '_create',


        /**
         * Creates a new tooltip node
         * @memberof Tooltip
         * @private
         * @param {HTMLElement} reference
         * @param {String} template
         * @param {String|HTMLElement|TitleFunction} title
         * @param {Boolean} allowHtml
         * @return {HTMLElement} tooltipNode
         */
        value: function _create(reference, template, title, allowHtml) {
          // create tooltip element
          var tooltipGenerator = window.document.createElement('div');
          tooltipGenerator.innerHTML = template.trim();
          var tooltipNode = tooltipGenerator.childNodes[0];

          // add unique ID to our tooltip (needed for accessibility reasons)
          tooltipNode.id = 'tooltip_' + Math.random().toString(36).substr(2, 10);

          // set initial `aria-hidden` state to `false` (it's visible!)
          tooltipNode.setAttribute('aria-hidden', 'false');

          // add title to tooltip
          var titleNode = tooltipGenerator.querySelector(this.options.innerSelector);
          this._addTitleContent(reference, title, allowHtml, titleNode);

          // return the generated tooltip node
          return tooltipNode;
        }
      }, {
        key: '_addTitleContent',
        value: function _addTitleContent(reference, title, allowHtml, titleNode) {
          if (title.nodeType === 1 || title.nodeType === 11) {
            // if title is a element node or document fragment, append it only if allowHtml is true
            allowHtml && titleNode.appendChild(title);
          } else if (isFunction$1(title)) {
            // if title is a function, call it and set textContent or innerHtml depending by `allowHtml` value
            var titleText = title.call(reference);
            allowHtml ? titleNode.innerHTML = titleText : titleNode.textContent = titleText;
          } else {
            // if it's just a simple text, set textContent or innerHtml depending by `allowHtml` value
            allowHtml ? titleNode.innerHTML = title : titleNode.textContent = title;
          }
        }
      }, {
        key: '_show',
        value: function _show(reference, options) {
          // don't show if it's already visible
          // or if it's not being showed
          if (this._isOpen && !this._isOpening) {
            return this;
          }
          this._isOpen = true;

          // if the tooltipNode already exists, just show it
          if (this._tooltipNode) {
            this._tooltipNode.style.visibility = 'visible';
            this._tooltipNode.setAttribute('aria-hidden', 'false');
            this.popperInstance.update();
            return this;
          }

          // get title
          var title = reference.getAttribute('title') || options.title;

          // don't show tooltip if no title is defined
          if (!title) {
            return this;
          }

          // create tooltip node
          var tooltipNode = this._create(reference, options.template, title, options.html);

          // Add `aria-describedby` to our reference element for accessibility reasons
          reference.setAttribute('aria-describedby', tooltipNode.id);

          // append tooltip to container
          var container = this._findContainer(options.container, reference);

          this._append(tooltipNode, container);

          this._popperOptions = _extends$1({}, options.popperOptions, {
            placement: options.placement
          });

          this._popperOptions.modifiers = _extends$1({}, this._popperOptions.modifiers, {
            arrow: _extends$1({}, this._popperOptions.modifiers && this._popperOptions.modifiers.arrow, {
              element: options.arrowSelector
            }),
            offset: _extends$1({}, this._popperOptions.modifiers && this._popperOptions.modifiers.offset, {
              offset: options.offset
            })
          });

          if (options.boundariesElement) {
            this._popperOptions.modifiers.preventOverflow = {
              boundariesElement: options.boundariesElement
            };
          }

          this.popperInstance = new Popper(reference, tooltipNode, this._popperOptions);

          this._tooltipNode = tooltipNode;

          return this;
        }
      }, {
        key: '_hide',
        value: function _hide() /*reference, options*/{
          // don't hide if it's already hidden
          if (!this._isOpen) {
            return this;
          }

          this._isOpen = false;

          // hide tooltipNode
          this._tooltipNode.style.visibility = 'hidden';
          this._tooltipNode.setAttribute('aria-hidden', 'true');

          return this;
        }
      }, {
        key: '_dispose',
        value: function _dispose() {
          var _this = this;

          // remove event listeners first to prevent any unexpected behaviour
          this._events.forEach(function (_ref) {
            var func = _ref.func,
                event = _ref.event;

            _this.reference.removeEventListener(event, func);
          });
          this._events = [];

          if (this._tooltipNode) {
            this._hide();

            // destroy instance
            this.popperInstance.destroy();

            // destroy tooltipNode if removeOnDestroy is not set, as popperInstance.destroy() already removes the element
            if (!this.popperInstance.options.removeOnDestroy) {
              this._tooltipNode.parentNode.removeChild(this._tooltipNode);
              this._tooltipNode = null;
            }
          }
          return this;
        }
      }, {
        key: '_findContainer',
        value: function _findContainer(container, reference) {
          // if container is a query, get the relative element
          if (typeof container === 'string') {
            container = window.document.querySelector(container);
          } else if (container === false) {
            // if container is `false`, set it to reference parent
            container = reference.parentNode;
          }
          return container;
        }

        /**
         * Append tooltip to container
         * @memberof Tooltip
         * @private
         * @param {HTMLElement} tooltipNode
         * @param {HTMLElement|String|false} container
         */

      }, {
        key: '_append',
        value: function _append(tooltipNode, container) {
          container.appendChild(tooltipNode);
        }
      }, {
        key: '_setEventListeners',
        value: function _setEventListeners(reference, events, options) {
          var _this2 = this;

          var directEvents = [];
          var oppositeEvents = [];

          events.forEach(function (event) {
            switch (event) {
              case 'hover':
                directEvents.push('mouseenter');
                oppositeEvents.push('mouseleave');
                break;
              case 'focus':
                directEvents.push('focus');
                oppositeEvents.push('blur');
                break;
              case 'click':
                directEvents.push('click');
                oppositeEvents.push('click');
                break;
            }
          });

          // schedule show tooltip
          directEvents.forEach(function (event) {
            var func = function func(evt) {
              if (_this2._isOpening === true) {
                return;
              }
              evt.usedByTooltip = true;
              _this2._scheduleShow(reference, options.delay, options, evt);
            };
            _this2._events.push({ event: event, func: func });
            reference.addEventListener(event, func);
          });

          // schedule hide tooltip
          oppositeEvents.forEach(function (event) {
            var func = function func(evt) {
              if (evt.usedByTooltip === true) {
                return;
              }
              _this2._scheduleHide(reference, options.delay, options, evt);
            };
            _this2._events.push({ event: event, func: func });
            reference.addEventListener(event, func);
            if (event === 'click' && options.closeOnClickOutside) {
              document.addEventListener('mousedown', function (e) {
                if (!_this2._isOpening) {
                  return;
                }
                var popper = _this2.popperInstance.popper;
                if (reference.contains(e.target) || popper.contains(e.target)) {
                  return;
                }
                func(e);
              }, true);
            }
          });
        }
      }, {
        key: '_scheduleShow',
        value: function _scheduleShow(reference, delay, options /*, evt */) {
          var _this3 = this;

          this._isOpening = true;
          // defaults to 0
          var computedDelay = delay && delay.show || delay || 0;
          this._showTimeout = window.setTimeout(function () {
            return _this3._show(reference, options);
          }, computedDelay);
        }
      }, {
        key: '_scheduleHide',
        value: function _scheduleHide(reference, delay, options, evt) {
          var _this4 = this;

          this._isOpening = false;
          // defaults to 0
          var computedDelay = delay && delay.hide || delay || 0;
          window.clearTimeout(this._showTimeout);
          window.setTimeout(function () {
            if (_this4._isOpen === false) {
              return;
            }
            if (!document.body.contains(_this4._tooltipNode)) {
              return;
            }

            // if we are hiding because of a mouseleave, we must check that the new
            // reference isn't the tooltip, because in this case we don't want to hide it
            if (evt.type === 'mouseleave') {
              var isSet = _this4._setTooltipNodeEvent(evt, reference, delay, options);

              // if we set the new event, don't hide the tooltip yet
              // the new event will take care to hide it if necessary
              if (isSet) {
                return;
              }
            }

            _this4._hide(reference, options);
          }, computedDelay);
        }
      }, {
        key: '_updateTitleContent',
        value: function _updateTitleContent(title) {
          if (typeof this._tooltipNode === 'undefined') {
            if (typeof this.options.title !== 'undefined') {
              this.options.title = title;
            }
            return;
          }
          var titleNode = this._tooltipNode.querySelector(this.options.innerSelector);
          this._clearTitleContent(titleNode, this.options.html, this.reference.getAttribute('title') || this.options.title);
          this._addTitleContent(this.reference, title, this.options.html, titleNode);
          this.options.title = title;
          this.popperInstance.update();
        }
      }, {
        key: '_clearTitleContent',
        value: function _clearTitleContent(titleNode, allowHtml, lastTitle) {
          if (lastTitle.nodeType === 1 || lastTitle.nodeType === 11) {
            allowHtml && titleNode.removeChild(lastTitle);
          } else {
            allowHtml ? titleNode.innerHTML = '' : titleNode.textContent = '';
          }
        }
      }]);
      return Tooltip;
    }();

    /**
     * Title function, its context is the Tooltip instance.
     * @memberof Tooltip
     * @callback TitleFunction
     * @return {String} placement - The desired title.
     */


    var _initialiseProps = function _initialiseProps() {
      var _this5 = this;

      this.show = function () {
        return _this5._show(_this5.reference, _this5.options);
      };

      this.hide = function () {
        return _this5._hide();
      };

      this.dispose = function () {
        return _this5._dispose();
      };

      this.toggle = function () {
        if (_this5._isOpen) {
          return _this5.hide();
        } else {
          return _this5.show();
        }
      };

      this.updateTitleContent = function (title) {
        return _this5._updateTitleContent(title);
      };

      this._events = [];

      this._setTooltipNodeEvent = function (evt, reference, delay, options) {
        var relatedreference = evt.relatedreference || evt.toElement || evt.relatedTarget;

        var callback = function callback(evt2) {
          var relatedreference2 = evt2.relatedreference || evt2.toElement || evt2.relatedTarget;

          // Remove event listener after call
          _this5._tooltipNode.removeEventListener(evt.type, callback);

          // If the new reference is not the reference element
          if (!reference.contains(relatedreference2)) {
            // Schedule to hide tooltip
            _this5._scheduleHide(reference, options.delay, options, evt2);
          }
        };

        if (_this5._tooltipNode.contains(relatedreference)) {
          // listen to mouseleave on the tooltip element to be able to hide the tooltip
          _this5._tooltipNode.addEventListener(evt.type, callback);
          return true;
        }

        return false;
      };
    };

    var Form = function Form(options) {
        log.debug("Invoking Class constructor!");
        for(var key in options) {
            log.debug("Setting: "+key+" to "+options[key]);
            this[key] = options[key];
        }
        if(!this.form_key) {
            return log.error("No Form Key set!")
        }
        if(this.manual) {
            //bail out of the rest of setup for manual-mode
            log.debug("Manual mode selected; exiting setup");
            return
        }
        if(!this.email_field) {
            return log.error("No Email Field set!")
        }
        if(!this.form) {
            log.debug("Trying to guess Form value");
            //try and guess form from email field's 'form' property
            this.form = this.email_field.form;
            log.debug("Picked: "+this.form);
        }
        if(!this.form) {
            return log.error("Could not determine Form!")
        }
        if(!this.submit_button) {
            log.debug("Trying to find submit buttons...");
            var submit_buttons=[];
            for(var element in this.form.elements) { //FIXME - should use integers only?
                var this_element = this.form.elements[element];
                log.debug("Checking element: "+element+" - nodeName: '"+this_element.nodeName+"' Type: '"+this_element.type+"'");
                if(this_element.nodeName == "INPUT" && this_element.type =="submit") {
                    log.debug("Found a submit button");
                    submit_buttons.push(this_element);
                }
            }
            this.submit_button = submit_buttons;
        }
        this.initialize_dom();
    };
    Form.prototype.initialize_dom = function initialize_dom () {
        // set up the onchange handler for the email field
        var old_onchange = this.email_field.onchange;
        var that = this;
        this.email_field.onchange = function (event) {
            that.onchange_handler(event);
            if(old_onchange) {
                old_onchange(event);
            }
        };

        //set up the onsubmit handler for the form (if there is one)
        if(this.form) {
            var old_onsubmit = this.form.onsubmit;
            this.form.onsubmit = function (event) {
                if(old_onsubmit) {
                    var results$1 = old_onsubmit(event); //FIXME - confusing, *their* old onsubmit handler fires *first*?
                }
                if(results) {
                    return this.onsubmit_handler(event)
                }
            };
        }

        //disable submit button, if there is one - 
        if(this.submit_button) {
            log.debug("Trying to disable submit button...");
            if(is_array(this.submit_button)) {
                log.debug("Submit button IS ARRAY");
                for(var x in this.submit_button) {
                    this.submit_button[x].disabled = true;
                }
            } else {
                this.submit_button.disabled = true;
            }
        }
    };

    Form.prototype.onchange_handler = function onchange_handler (event) {
        this.verify(this.email_field.value, function (results) {
            if(results == "BAD") {
                this.mytooltip = new Tooltip(this.email_field);
                this.mytooltip.show();
            }
        });
    };

    Form.prototype.onsubmit_handler = function onsubmit_handler (event) {
        DO_SOMETHING_CLEVERER();
        jsonp("url");
    };

    Form.prototype.verify = function verify (email, callback) {
        jsonp({url: HOST+"/verify",
            data: {email: email, form_key: this.form_key}, 
            success: function (data) {
                callback(data.status);
            }
        });
    };

    function auto (form_key,options) {
        if(!form_key) {
            log.error("Form key was not set");
            return
        }
        var my_options;
        if(options) {
            my_options=duplicate(options);
            my_options.form_key = form_key;
        } else {
            my_options={form_key: form_key};
        }
        if(my_options.debug) {
            log.debug_enabled = my_options.debug; //FIXME this is already handled in index.js, this is superfluous
            delete my_options.debug; //don't want to keep passing this down to each Verify
        }
        var activated_forms=[];
        for(var form in document.forms) { //olde-skoole DOM0 FTW!
            log.debug("Checking form: "+form+" for verifiable email address fields...");
            for(var element in document.forms[form].elements) { // FIXME I think this iterates names *AND* numbers
                log.debug("Checking field #"+element+" to see if it's an email address field");
                var this_field = document.forms[form].elements[element];
                if(this_field.type == "email" || this_field.name == "email" || this_field.id == "email") {
                    var options_copy = duplicate(my_options);
                    log.debug("Found candidate field. Name: "+this_field.name+" Type: "+this_field.type+" ID: "+this_field.id);
                    options_copy.form = document.forms[form];
                    options_copy.email_field = this_field;
                    activated_forms.push(new Form(options_copy));
                }
            }
        }
        return activated_forms
    }

    function index (form_key, options) {
        if(options && options.debug) {
            log.debug_enabled = options.debug;
        }
        if(!form_key) {
            log.error("Form key was not set");
        }
        if(!options || (!options.email_field && !options.manual)) {
            return auto(form_key, options)
        }
        return new Form(form_key, options)
    }

    return index;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJsb2dnaW5nLmpzIiwidXRpbHMuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1qc29ucC9saWIvanNvbnAuanMiLCJub2RlX21vZHVsZXMvcG9wcGVyLmpzL2Rpc3QvZXNtL3BvcHBlci5qcyIsIm5vZGVfbW9kdWxlcy90b29sdGlwLmpzL2Rpc3QvZXNtL3Rvb2x0aXAuanMiLCJmb3JtLmpzIiwiYXV0by5qcyIsImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIExvZyB7XG4gICAgY29uc3RydWN0b3IoZGVidWdfZW5hYmxlZCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuZGVidWdfZW5hYmxlZCA9IGRlYnVnX2VuYWJsZWRcbiAgICB9XG5cbiAgICBlcnJvcihtc2cpIHtcbiAgICAgICAgaWYoIXRoaXMubG9nX2F0X2xldmVsKCdlcnJvcicsbXNnKSkge1xuICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwiRXJyb3I6IFwiK21zZylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlYnVnKG1zZykge1xuICAgICAgICBpZih0aGlzLmRlYnVnX2VuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nX2F0X2xldmVsKCdkZWJ1ZycsbXNnKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9nX2F0X2xldmVsKGxldmVsLG1zZykge1xuICAgICAgICBpZihjb25zb2xlICYmIGNvbnNvbGVbbGV2ZWxdKSB7XG4gICAgICAgICAgICBjb25zb2xlW2xldmVsXShtc2cpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbn1cblxudmFyIGxvZyA9IG5ldyBMb2coKVxuXG5cbmV4cG9ydCBkZWZhdWx0IGxvZ1xuXG4vL2RlYnVnLGluZm8sd2FybixlcnJvciIsImV4cG9ydCBmdW5jdGlvbiBkdXBsaWNhdGUgKG9iaikge1xuICAgIC8vbmFpdmUsIHNpbmdsZS1sZXZlbCwgbm9uLWRlZXAgJ2R1cGxpY2F0ZScgZnVuY3Rpb24gZm9yIG9iamVjdHNcbiAgICBsZXQgbmV3b2JqPXt9XG4gICAgZm9yKGxldCBpIGluIG9iaikge1xuICAgICAgICBuZXdvYmpbaV0gPSBvYmpbaV1cbiAgICB9XG4gICAgcmV0dXJuIG5ld29ialxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNfYXJyYXkob2JqKSB7XG4gICAgLy8gY29uc29sZS53YXJuKFwiVGhlIHByb3RvdHlwZSB0aGluZyBpczogXCIrT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpXG4gICAgaWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT0gXCJbb2JqZWN0IEFycmF5XVwiKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxufSIsIihmdW5jdGlvbigpIHtcbiAgdmFyIEpTT05QLCBjb21wdXRlZFVybCwgY3JlYXRlRWxlbWVudCwgZW5jb2RlLCBub29wLCBvYmplY3RUb1VSSSwgcmFuZG9tLCByYW5kb21TdHJpbmc7XG5cbiAgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uKHRhZykge1xuICAgIHJldHVybiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICB9O1xuXG4gIGVuY29kZSA9IHdpbmRvdy5lbmNvZGVVUklDb21wb25lbnQ7XG5cbiAgcmFuZG9tID0gTWF0aC5yYW5kb207XG5cbiAgSlNPTlAgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIGNhbGxiYWNrLCBjYWxsYmFja0Z1bmMsIGNhbGxiYWNrTmFtZSwgZG9uZSwgaGVhZCwgcGFyYW1zLCBzY3JpcHQ7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBwYXJhbXMgPSB7XG4gICAgICBkYXRhOiBvcHRpb25zLmRhdGEgfHwge30sXG4gICAgICBlcnJvcjogb3B0aW9ucy5lcnJvciB8fCBub29wLFxuICAgICAgc3VjY2Vzczogb3B0aW9ucy5zdWNjZXNzIHx8IG5vb3AsXG4gICAgICBiZWZvcmVTZW5kOiBvcHRpb25zLmJlZm9yZVNlbmQgfHwgbm9vcCxcbiAgICAgIGNvbXBsZXRlOiBvcHRpb25zLmNvbXBsZXRlIHx8IG5vb3AsXG4gICAgICB1cmw6IG9wdGlvbnMudXJsIHx8ICcnXG4gICAgfTtcbiAgICBwYXJhbXMuY29tcHV0ZWRVcmwgPSBjb21wdXRlZFVybChwYXJhbXMpO1xuICAgIGlmIChwYXJhbXMudXJsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nVXJsJyk7XG4gICAgfVxuICAgIGRvbmUgPSBmYWxzZTtcbiAgICBpZiAocGFyYW1zLmJlZm9yZVNlbmQoe30sIHBhcmFtcykgIT09IGZhbHNlKSB7XG4gICAgICBjYWxsYmFja05hbWUgPSBvcHRpb25zLmNhbGxiYWNrTmFtZSB8fCAnY2FsbGJhY2snO1xuICAgICAgY2FsbGJhY2tGdW5jID0gb3B0aW9ucy5jYWxsYmFja0Z1bmMgfHwgJ2pzb25wXycgKyByYW5kb21TdHJpbmcoMTUpO1xuICAgICAgY2FsbGJhY2sgPSBwYXJhbXMuZGF0YVtjYWxsYmFja05hbWVdID0gY2FsbGJhY2tGdW5jO1xuICAgICAgd2luZG93W2NhbGxiYWNrXSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgd2luZG93W2NhbGxiYWNrXSA9IG51bGw7XG4gICAgICAgIHBhcmFtcy5zdWNjZXNzKGRhdGEsIHBhcmFtcyk7XG4gICAgICAgIHJldHVybiBwYXJhbXMuY29tcGxldGUoZGF0YSwgcGFyYW1zKTtcbiAgICAgIH07XG4gICAgICBzY3JpcHQgPSBjcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHNjcmlwdC5zcmMgPSBjb21wdXRlZFVybChwYXJhbXMpO1xuICAgICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICAgIHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIHBhcmFtcy5lcnJvcih7XG4gICAgICAgICAgdXJsOiBzY3JpcHQuc3JjLFxuICAgICAgICAgIGV2ZW50OiBldnRcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwYXJhbXMuY29tcGxldGUoe1xuICAgICAgICAgIHVybDogc2NyaXB0LnNyYyxcbiAgICAgICAgICBldmVudDogZXZ0XG4gICAgICAgIH0sIHBhcmFtcyk7XG4gICAgICB9O1xuICAgICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlZiwgcmVmMTtcbiAgICAgICAgaWYgKGRvbmUgfHwgKChyZWYgPSB0aGlzLnJlYWR5U3RhdGUpICE9PSAnbG9hZGVkJyAmJiByZWYgIT09ICdjb21wbGV0ZScpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICBpZiAoc2NyaXB0KSB7XG4gICAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgIGlmICgocmVmMSA9IHNjcmlwdC5wYXJlbnROb2RlKSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZWYxLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzY3JpcHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaGVhZCA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdIHx8IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICBoZWFkLmluc2VydEJlZm9yZShzY3JpcHQsIGhlYWQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBhYm9ydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvd1tjYWxsYmFja10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gd2luZG93W2NhbGxiYWNrXSA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICBpZiAoc2NyaXB0ICE9IG51bGwgPyBzY3JpcHQucGFyZW50Tm9kZSA6IHZvaWQgMCkge1xuICAgICAgICAgIHNjcmlwdC5vbmxvYWQgPSBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgIHJldHVybiBzY3JpcHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICBub29wID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfTtcblxuICBjb21wdXRlZFVybCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIHZhciB1cmw7XG4gICAgdXJsID0gcGFyYW1zLnVybDtcbiAgICB1cmwgKz0gcGFyYW1zLnVybC5pbmRleE9mKCc/JykgPCAwID8gJz8nIDogJyYnO1xuICAgIHVybCArPSBvYmplY3RUb1VSSShwYXJhbXMuZGF0YSk7XG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuICByYW5kb21TdHJpbmcgPSBmdW5jdGlvbihsZW5ndGgpIHtcbiAgICB2YXIgc3RyO1xuICAgIHN0ciA9ICcnO1xuICAgIHdoaWxlIChzdHIubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICBzdHIgKz0gcmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDMpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuICB9O1xuXG4gIG9iamVjdFRvVVJJID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGRhdGEsIGtleSwgdmFsdWU7XG4gICAgZGF0YSA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2tleV07XG4gICAgICAgIHJlc3VsdHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2YWx1ZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgICByZXR1cm4gZGF0YS5qb2luKCcmJyk7XG4gIH07XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgIT09IFwidW5kZWZpbmVkXCIgJiYgZGVmaW5lICE9PSBudWxsID8gZGVmaW5lLmFtZCA6IHZvaWQgMCkge1xuICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBKU09OUDtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZSAhPT0gbnVsbCA/IG1vZHVsZS5leHBvcnRzIDogdm9pZCAwKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBKU09OUDtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLkpTT05QID0gSlNPTlA7XG4gIH1cblxufSkuY2FsbCh0aGlzKTtcbiIsIi8qKiFcbiAqIEBmaWxlT3ZlcnZpZXcgS2lja2FzcyBsaWJyYXJ5IHRvIGNyZWF0ZSBhbmQgcGxhY2UgcG9wcGVycyBuZWFyIHRoZWlyIHJlZmVyZW5jZSBlbGVtZW50cy5cbiAqIEB2ZXJzaW9uIDEuMTUuMFxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNiBGZWRlcmljbyBaaXZvbG8gYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cbnZhciBpc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xuXG52YXIgbG9uZ2VyVGltZW91dEJyb3dzZXJzID0gWydFZGdlJywgJ1RyaWRlbnQnLCAnRmlyZWZveCddO1xudmFyIHRpbWVvdXREdXJhdGlvbiA9IDA7XG5mb3IgKHZhciBpID0gMDsgaSA8IGxvbmdlclRpbWVvdXRCcm93c2Vycy5sZW5ndGg7IGkgKz0gMSkge1xuICBpZiAoaXNCcm93c2VyICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihsb25nZXJUaW1lb3V0QnJvd3NlcnNbaV0pID49IDApIHtcbiAgICB0aW1lb3V0RHVyYXRpb24gPSAxO1xuICAgIGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1pY3JvdGFza0RlYm91bmNlKGZuKSB7XG4gIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY2FsbGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNhbGxlZCA9IHRydWU7XG4gICAgd2luZG93LlByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgY2FsbGVkID0gZmFsc2U7XG4gICAgICBmbigpO1xuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0YXNrRGVib3VuY2UoZm4pIHtcbiAgdmFyIHNjaGVkdWxlZCA9IGZhbHNlO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICBzY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICBmbigpO1xuICAgICAgfSwgdGltZW91dER1cmF0aW9uKTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBzdXBwb3J0c01pY3JvVGFza3MgPSBpc0Jyb3dzZXIgJiYgd2luZG93LlByb21pc2U7XG5cbi8qKlxuKiBDcmVhdGUgYSBkZWJvdW5jZWQgdmVyc2lvbiBvZiBhIG1ldGhvZCwgdGhhdCdzIGFzeW5jaHJvbm91c2x5IGRlZmVycmVkXG4qIGJ1dCBjYWxsZWQgaW4gdGhlIG1pbmltdW0gdGltZSBwb3NzaWJsZS5cbipcbiogQG1ldGhvZFxuKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4qIEBhcmd1bWVudCB7RnVuY3Rpb259IGZuXG4qIEByZXR1cm5zIHtGdW5jdGlvbn1cbiovXG52YXIgZGVib3VuY2UgPSBzdXBwb3J0c01pY3JvVGFza3MgPyBtaWNyb3Rhc2tEZWJvdW5jZSA6IHRhc2tEZWJvdW5jZTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gdmFyaWFibGUgaXMgYSBmdW5jdGlvblxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtBbnl9IGZ1bmN0aW9uVG9DaGVjayAtIHZhcmlhYmxlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYW5zd2VyIHRvOiBpcyBhIGZ1bmN0aW9uP1xuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmN0aW9uVG9DaGVjaykge1xuICB2YXIgZ2V0VHlwZSA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb25Ub0NoZWNrICYmIGdldFR5cGUudG9TdHJpbmcuY2FsbChmdW5jdGlvblRvQ2hlY2spID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIEdldCBDU1MgY29tcHV0ZWQgcHJvcGVydHkgb2YgdGhlIGdpdmVuIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWVtZW50fSBlbGVtZW50XG4gKiBAYXJndW1lbnQge1N0cmluZ30gcHJvcGVydHlcbiAqL1xuZnVuY3Rpb24gZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGVsZW1lbnQsIHByb3BlcnR5KSB7XG4gIGlmIChlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIC8vIE5PVEU6IDEgRE9NIGFjY2VzcyBoZXJlXG4gIHZhciB3aW5kb3cgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gIHZhciBjc3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKTtcbiAgcmV0dXJuIHByb3BlcnR5ID8gY3NzW3Byb3BlcnR5XSA6IGNzcztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwYXJlbnROb2RlIG9yIHRoZSBob3N0IG9mIHRoZSBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtFbGVtZW50fSBwYXJlbnRcbiAqL1xuZnVuY3Rpb24gZ2V0UGFyZW50Tm9kZShlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuICByZXR1cm4gZWxlbWVudC5wYXJlbnROb2RlIHx8IGVsZW1lbnQuaG9zdDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzY3JvbGxpbmcgcGFyZW50IG9mIHRoZSBnaXZlbiBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtFbGVtZW50fSBzY3JvbGwgcGFyZW50XG4gKi9cbmZ1bmN0aW9uIGdldFNjcm9sbFBhcmVudChlbGVtZW50KSB7XG4gIC8vIFJldHVybiBib2R5LCBgZ2V0U2Nyb2xsYCB3aWxsIHRha2UgY2FyZSB0byBnZXQgdGhlIGNvcnJlY3QgYHNjcm9sbFRvcGAgZnJvbSBpdFxuICBpZiAoIWVsZW1lbnQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuYm9keTtcbiAgfVxuXG4gIHN3aXRjaCAoZWxlbWVudC5ub2RlTmFtZSkge1xuICAgIGNhc2UgJ0hUTUwnOlxuICAgIGNhc2UgJ0JPRFknOlxuICAgICAgcmV0dXJuIGVsZW1lbnQub3duZXJEb2N1bWVudC5ib2R5O1xuICAgIGNhc2UgJyNkb2N1bWVudCc6XG4gICAgICByZXR1cm4gZWxlbWVudC5ib2R5O1xuICB9XG5cbiAgLy8gRmlyZWZveCB3YW50IHVzIHRvIGNoZWNrIGAteGAgYW5kIGAteWAgdmFyaWF0aW9ucyBhcyB3ZWxsXG5cbiAgdmFyIF9nZXRTdHlsZUNvbXB1dGVkUHJvcCA9IGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShlbGVtZW50KSxcbiAgICAgIG92ZXJmbG93ID0gX2dldFN0eWxlQ29tcHV0ZWRQcm9wLm92ZXJmbG93LFxuICAgICAgb3ZlcmZsb3dYID0gX2dldFN0eWxlQ29tcHV0ZWRQcm9wLm92ZXJmbG93WCxcbiAgICAgIG92ZXJmbG93WSA9IF9nZXRTdHlsZUNvbXB1dGVkUHJvcC5vdmVyZmxvd1k7XG5cbiAgaWYgKC8oYXV0b3xzY3JvbGx8b3ZlcmxheSkvLnRlc3Qob3ZlcmZsb3cgKyBvdmVyZmxvd1kgKyBvdmVyZmxvd1gpKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICByZXR1cm4gZ2V0U2Nyb2xsUGFyZW50KGdldFBhcmVudE5vZGUoZWxlbWVudCkpO1xufVxuXG52YXIgaXNJRTExID0gaXNCcm93c2VyICYmICEhKHdpbmRvdy5NU0lucHV0TWV0aG9kQ29udGV4dCAmJiBkb2N1bWVudC5kb2N1bWVudE1vZGUpO1xudmFyIGlzSUUxMCA9IGlzQnJvd3NlciAmJiAvTVNJRSAxMC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBicm93c2VyIGlzIEludGVybmV0IEV4cGxvcmVyXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcGFyYW0ge051bWJlcn0gdmVyc2lvbiB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IGlzSUVcbiAqL1xuZnVuY3Rpb24gaXNJRSh2ZXJzaW9uKSB7XG4gIGlmICh2ZXJzaW9uID09PSAxMSkge1xuICAgIHJldHVybiBpc0lFMTE7XG4gIH1cbiAgaWYgKHZlcnNpb24gPT09IDEwKSB7XG4gICAgcmV0dXJuIGlzSUUxMDtcbiAgfVxuICByZXR1cm4gaXNJRTExIHx8IGlzSUUxMDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBvZmZzZXQgcGFyZW50IG9mIHRoZSBnaXZlbiBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtFbGVtZW50fSBvZmZzZXQgcGFyZW50XG4gKi9cbmZ1bmN0aW9uIGdldE9mZnNldFBhcmVudChlbGVtZW50KSB7XG4gIGlmICghZWxlbWVudCkge1xuICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIH1cblxuICB2YXIgbm9PZmZzZXRQYXJlbnQgPSBpc0lFKDEwKSA/IGRvY3VtZW50LmJvZHkgOiBudWxsO1xuXG4gIC8vIE5PVEU6IDEgRE9NIGFjY2VzcyBoZXJlXG4gIHZhciBvZmZzZXRQYXJlbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudCB8fCBudWxsO1xuICAvLyBTa2lwIGhpZGRlbiBlbGVtZW50cyB3aGljaCBkb24ndCBoYXZlIGFuIG9mZnNldFBhcmVudFxuICB3aGlsZSAob2Zmc2V0UGFyZW50ID09PSBub09mZnNldFBhcmVudCAmJiBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZykge1xuICAgIG9mZnNldFBhcmVudCA9IChlbGVtZW50ID0gZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcpLm9mZnNldFBhcmVudDtcbiAgfVxuXG4gIHZhciBub2RlTmFtZSA9IG9mZnNldFBhcmVudCAmJiBvZmZzZXRQYXJlbnQubm9kZU5hbWU7XG5cbiAgaWYgKCFub2RlTmFtZSB8fCBub2RlTmFtZSA9PT0gJ0JPRFknIHx8IG5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICByZXR1cm4gZWxlbWVudCA/IGVsZW1lbnQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIH1cblxuICAvLyAub2Zmc2V0UGFyZW50IHdpbGwgcmV0dXJuIHRoZSBjbG9zZXN0IFRILCBURCBvciBUQUJMRSBpbiBjYXNlXG4gIC8vIG5vIG9mZnNldFBhcmVudCBpcyBwcmVzZW50LCBJIGhhdGUgdGhpcyBqb2IuLi5cbiAgaWYgKFsnVEgnLCAnVEQnLCAnVEFCTEUnXS5pbmRleE9mKG9mZnNldFBhcmVudC5ub2RlTmFtZSkgIT09IC0xICYmIGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShvZmZzZXRQYXJlbnQsICdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgIHJldHVybiBnZXRPZmZzZXRQYXJlbnQob2Zmc2V0UGFyZW50KTtcbiAgfVxuXG4gIHJldHVybiBvZmZzZXRQYXJlbnQ7XG59XG5cbmZ1bmN0aW9uIGlzT2Zmc2V0Q29udGFpbmVyKGVsZW1lbnQpIHtcbiAgdmFyIG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZTtcblxuICBpZiAobm9kZU5hbWUgPT09ICdCT0RZJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gbm9kZU5hbWUgPT09ICdIVE1MJyB8fCBnZXRPZmZzZXRQYXJlbnQoZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCkgPT09IGVsZW1lbnQ7XG59XG5cbi8qKlxuICogRmluZHMgdGhlIHJvb3Qgbm9kZSAoZG9jdW1lbnQsIHNoYWRvd0RPTSByb290KSBvZiB0aGUgZ2l2ZW4gZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBub2RlXG4gKiBAcmV0dXJucyB7RWxlbWVudH0gcm9vdCBub2RlXG4gKi9cbmZ1bmN0aW9uIGdldFJvb3Qobm9kZSkge1xuICBpZiAobm9kZS5wYXJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIGdldFJvb3Qobm9kZS5wYXJlbnROb2RlKTtcbiAgfVxuXG4gIHJldHVybiBub2RlO1xufVxuXG4vKipcbiAqIEZpbmRzIHRoZSBvZmZzZXQgcGFyZW50IGNvbW1vbiB0byB0aGUgdHdvIHByb3ZpZGVkIG5vZGVzXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnQxXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnQyXG4gKiBAcmV0dXJucyB7RWxlbWVudH0gY29tbW9uIG9mZnNldCBwYXJlbnRcbiAqL1xuZnVuY3Rpb24gZmluZENvbW1vbk9mZnNldFBhcmVudChlbGVtZW50MSwgZWxlbWVudDIpIHtcbiAgLy8gVGhpcyBjaGVjayBpcyBuZWVkZWQgdG8gYXZvaWQgZXJyb3JzIGluIGNhc2Ugb25lIG9mIHRoZSBlbGVtZW50cyBpc24ndCBkZWZpbmVkIGZvciBhbnkgcmVhc29uXG4gIGlmICghZWxlbWVudDEgfHwgIWVsZW1lbnQxLm5vZGVUeXBlIHx8ICFlbGVtZW50MiB8fCAhZWxlbWVudDIubm9kZVR5cGUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB9XG5cbiAgLy8gSGVyZSB3ZSBtYWtlIHN1cmUgdG8gZ2l2ZSBhcyBcInN0YXJ0XCIgdGhlIGVsZW1lbnQgdGhhdCBjb21lcyBmaXJzdCBpbiB0aGUgRE9NXG4gIHZhciBvcmRlciA9IGVsZW1lbnQxLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGVsZW1lbnQyKSAmIE5vZGUuRE9DVU1FTlRfUE9TSVRJT05fRk9MTE9XSU5HO1xuICB2YXIgc3RhcnQgPSBvcmRlciA/IGVsZW1lbnQxIDogZWxlbWVudDI7XG4gIHZhciBlbmQgPSBvcmRlciA/IGVsZW1lbnQyIDogZWxlbWVudDE7XG5cbiAgLy8gR2V0IGNvbW1vbiBhbmNlc3RvciBjb250YWluZXJcbiAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgcmFuZ2Uuc2V0U3RhcnQoc3RhcnQsIDApO1xuICByYW5nZS5zZXRFbmQoZW5kLCAwKTtcbiAgdmFyIGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyID0gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XG5cbiAgLy8gQm90aCBub2RlcyBhcmUgaW5zaWRlICNkb2N1bWVudFxuXG4gIGlmIChlbGVtZW50MSAhPT0gY29tbW9uQW5jZXN0b3JDb250YWluZXIgJiYgZWxlbWVudDIgIT09IGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyIHx8IHN0YXJ0LmNvbnRhaW5zKGVuZCkpIHtcbiAgICBpZiAoaXNPZmZzZXRDb250YWluZXIoY29tbW9uQW5jZXN0b3JDb250YWluZXIpKSB7XG4gICAgICByZXR1cm4gY29tbW9uQW5jZXN0b3JDb250YWluZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldE9mZnNldFBhcmVudChjb21tb25BbmNlc3RvckNvbnRhaW5lcik7XG4gIH1cblxuICAvLyBvbmUgb2YgdGhlIG5vZGVzIGlzIGluc2lkZSBzaGFkb3dET00sIGZpbmQgd2hpY2ggb25lXG4gIHZhciBlbGVtZW50MXJvb3QgPSBnZXRSb290KGVsZW1lbnQxKTtcbiAgaWYgKGVsZW1lbnQxcm9vdC5ob3N0KSB7XG4gICAgcmV0dXJuIGZpbmRDb21tb25PZmZzZXRQYXJlbnQoZWxlbWVudDFyb290Lmhvc3QsIGVsZW1lbnQyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmluZENvbW1vbk9mZnNldFBhcmVudChlbGVtZW50MSwgZ2V0Um9vdChlbGVtZW50MikuaG9zdCk7XG4gIH1cbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBzY3JvbGwgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQgaW4gdGhlIGdpdmVuIHNpZGUgKHRvcCBhbmQgbGVmdClcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gZWxlbWVudFxuICogQGFyZ3VtZW50IHtTdHJpbmd9IHNpZGUgYHRvcGAgb3IgYGxlZnRgXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBhbW91bnQgb2Ygc2Nyb2xsZWQgcGl4ZWxzXG4gKi9cbmZ1bmN0aW9uIGdldFNjcm9sbChlbGVtZW50KSB7XG4gIHZhciBzaWRlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAndG9wJztcblxuICB2YXIgdXBwZXJTaWRlID0gc2lkZSA9PT0gJ3RvcCcgPyAnc2Nyb2xsVG9wJyA6ICdzY3JvbGxMZWZ0JztcbiAgdmFyIG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZTtcblxuICBpZiAobm9kZU5hbWUgPT09ICdCT0RZJyB8fCBub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgdmFyIGh0bWwgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIHZhciBzY3JvbGxpbmdFbGVtZW50ID0gZWxlbWVudC5vd25lckRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQgfHwgaHRtbDtcbiAgICByZXR1cm4gc2Nyb2xsaW5nRWxlbWVudFt1cHBlclNpZGVdO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnRbdXBwZXJTaWRlXTtcbn1cblxuLypcbiAqIFN1bSBvciBzdWJ0cmFjdCB0aGUgZWxlbWVudCBzY3JvbGwgdmFsdWVzIChsZWZ0IGFuZCB0b3ApIGZyb20gYSBnaXZlbiByZWN0IG9iamVjdFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtPYmplY3R9IHJlY3QgLSBSZWN0IG9iamVjdCB5b3Ugd2FudCB0byBjaGFuZ2VcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBUaGUgZWxlbWVudCBmcm9tIHRoZSBmdW5jdGlvbiByZWFkcyB0aGUgc2Nyb2xsIHZhbHVlc1xuICogQHBhcmFtIHtCb29sZWFufSBzdWJ0cmFjdCAtIHNldCB0byB0cnVlIGlmIHlvdSB3YW50IHRvIHN1YnRyYWN0IHRoZSBzY3JvbGwgdmFsdWVzXG4gKiBAcmV0dXJuIHtPYmplY3R9IHJlY3QgLSBUaGUgbW9kaWZpZXIgcmVjdCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gaW5jbHVkZVNjcm9sbChyZWN0LCBlbGVtZW50KSB7XG4gIHZhciBzdWJ0cmFjdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG5cbiAgdmFyIHNjcm9sbFRvcCA9IGdldFNjcm9sbChlbGVtZW50LCAndG9wJyk7XG4gIHZhciBzY3JvbGxMZWZ0ID0gZ2V0U2Nyb2xsKGVsZW1lbnQsICdsZWZ0Jyk7XG4gIHZhciBtb2RpZmllciA9IHN1YnRyYWN0ID8gLTEgOiAxO1xuICByZWN0LnRvcCArPSBzY3JvbGxUb3AgKiBtb2RpZmllcjtcbiAgcmVjdC5ib3R0b20gKz0gc2Nyb2xsVG9wICogbW9kaWZpZXI7XG4gIHJlY3QubGVmdCArPSBzY3JvbGxMZWZ0ICogbW9kaWZpZXI7XG4gIHJlY3QucmlnaHQgKz0gc2Nyb2xsTGVmdCAqIG1vZGlmaWVyO1xuICByZXR1cm4gcmVjdDtcbn1cblxuLypcbiAqIEhlbHBlciB0byBkZXRlY3QgYm9yZGVycyBvZiBhIGdpdmVuIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gc3R5bGVzXG4gKiBSZXN1bHQgb2YgYGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eWAgb24gdGhlIGdpdmVuIGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBheGlzIC0gYHhgIG9yIGB5YFxuICogQHJldHVybiB7bnVtYmVyfSBib3JkZXJzIC0gVGhlIGJvcmRlcnMgc2l6ZSBvZiB0aGUgZ2l2ZW4gYXhpc1xuICovXG5cbmZ1bmN0aW9uIGdldEJvcmRlcnNTaXplKHN0eWxlcywgYXhpcykge1xuICB2YXIgc2lkZUEgPSBheGlzID09PSAneCcgPyAnTGVmdCcgOiAnVG9wJztcbiAgdmFyIHNpZGVCID0gc2lkZUEgPT09ICdMZWZ0JyA/ICdSaWdodCcgOiAnQm90dG9tJztcblxuICByZXR1cm4gcGFyc2VGbG9hdChzdHlsZXNbJ2JvcmRlcicgKyBzaWRlQSArICdXaWR0aCddLCAxMCkgKyBwYXJzZUZsb2F0KHN0eWxlc1snYm9yZGVyJyArIHNpZGVCICsgJ1dpZHRoJ10sIDEwKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2l6ZShheGlzLCBib2R5LCBodG1sLCBjb21wdXRlZFN0eWxlKSB7XG4gIHJldHVybiBNYXRoLm1heChib2R5WydvZmZzZXQnICsgYXhpc10sIGJvZHlbJ3Njcm9sbCcgKyBheGlzXSwgaHRtbFsnY2xpZW50JyArIGF4aXNdLCBodG1sWydvZmZzZXQnICsgYXhpc10sIGh0bWxbJ3Njcm9sbCcgKyBheGlzXSwgaXNJRSgxMCkgPyBwYXJzZUludChodG1sWydvZmZzZXQnICsgYXhpc10pICsgcGFyc2VJbnQoY29tcHV0ZWRTdHlsZVsnbWFyZ2luJyArIChheGlzID09PSAnSGVpZ2h0JyA/ICdUb3AnIDogJ0xlZnQnKV0pICsgcGFyc2VJbnQoY29tcHV0ZWRTdHlsZVsnbWFyZ2luJyArIChheGlzID09PSAnSGVpZ2h0JyA/ICdCb3R0b20nIDogJ1JpZ2h0JyldKSA6IDApO1xufVxuXG5mdW5jdGlvbiBnZXRXaW5kb3dTaXplcyhkb2N1bWVudCkge1xuICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gIHZhciBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB2YXIgY29tcHV0ZWRTdHlsZSA9IGlzSUUoMTApICYmIGdldENvbXB1dGVkU3R5bGUoaHRtbCk7XG5cbiAgcmV0dXJuIHtcbiAgICBoZWlnaHQ6IGdldFNpemUoJ0hlaWdodCcsIGJvZHksIGh0bWwsIGNvbXB1dGVkU3R5bGUpLFxuICAgIHdpZHRoOiBnZXRTaXplKCdXaWR0aCcsIGJvZHksIGh0bWwsIGNvbXB1dGVkU3R5bGUpXG4gIH07XG59XG5cbnZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG52YXIgY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cblxuXG5cblxudmFyIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuLyoqXG4gKiBHaXZlbiBlbGVtZW50IG9mZnNldHMsIGdlbmVyYXRlIGFuIG91dHB1dCBzaW1pbGFyIHRvIGdldEJvdW5kaW5nQ2xpZW50UmVjdFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IG9mZnNldHNcbiAqIEByZXR1cm5zIHtPYmplY3R9IENsaWVudFJlY3QgbGlrZSBvdXRwdXRcbiAqL1xuZnVuY3Rpb24gZ2V0Q2xpZW50UmVjdChvZmZzZXRzKSB7XG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgb2Zmc2V0cywge1xuICAgIHJpZ2h0OiBvZmZzZXRzLmxlZnQgKyBvZmZzZXRzLndpZHRoLFxuICAgIGJvdHRvbTogb2Zmc2V0cy50b3AgKyBvZmZzZXRzLmhlaWdodFxuICB9KTtcbn1cblxuLyoqXG4gKiBHZXQgYm91bmRpbmcgY2xpZW50IHJlY3Qgb2YgZ2l2ZW4gZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7T2JqZWN0fSBjbGllbnQgcmVjdFxuICovXG5mdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCkge1xuICB2YXIgcmVjdCA9IHt9O1xuXG4gIC8vIElFMTAgMTAgRklYOiBQbGVhc2UsIGRvbid0IGFzaywgdGhlIGVsZW1lbnQgaXNuJ3RcbiAgLy8gY29uc2lkZXJlZCBpbiBET00gaW4gc29tZSBjaXJjdW1zdGFuY2VzLi4uXG4gIC8vIFRoaXMgaXNuJ3QgcmVwcm9kdWNpYmxlIGluIElFMTAgY29tcGF0aWJpbGl0eSBtb2RlIG9mIElFMTFcbiAgdHJ5IHtcbiAgICBpZiAoaXNJRSgxMCkpIHtcbiAgICAgIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IGdldFNjcm9sbChlbGVtZW50LCAndG9wJyk7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IGdldFNjcm9sbChlbGVtZW50LCAnbGVmdCcpO1xuICAgICAgcmVjdC50b3AgKz0gc2Nyb2xsVG9wO1xuICAgICAgcmVjdC5sZWZ0ICs9IHNjcm9sbExlZnQ7XG4gICAgICByZWN0LmJvdHRvbSArPSBzY3JvbGxUb3A7XG4gICAgICByZWN0LnJpZ2h0ICs9IHNjcm9sbExlZnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0ge1xuICAgIGxlZnQ6IHJlY3QubGVmdCxcbiAgICB0b3A6IHJlY3QudG9wLFxuICAgIHdpZHRoOiByZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0LFxuICAgIGhlaWdodDogcmVjdC5ib3R0b20gLSByZWN0LnRvcFxuICB9O1xuXG4gIC8vIHN1YnRyYWN0IHNjcm9sbGJhciBzaXplIGZyb20gc2l6ZXNcbiAgdmFyIHNpemVzID0gZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnID8gZ2V0V2luZG93U2l6ZXMoZWxlbWVudC5vd25lckRvY3VtZW50KSA6IHt9O1xuICB2YXIgd2lkdGggPSBzaXplcy53aWR0aCB8fCBlbGVtZW50LmNsaWVudFdpZHRoIHx8IHJlc3VsdC5yaWdodCAtIHJlc3VsdC5sZWZ0O1xuICB2YXIgaGVpZ2h0ID0gc2l6ZXMuaGVpZ2h0IHx8IGVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IHJlc3VsdC5ib3R0b20gLSByZXN1bHQudG9wO1xuXG4gIHZhciBob3JpelNjcm9sbGJhciA9IGVsZW1lbnQub2Zmc2V0V2lkdGggLSB3aWR0aDtcbiAgdmFyIHZlcnRTY3JvbGxiYXIgPSBlbGVtZW50Lm9mZnNldEhlaWdodCAtIGhlaWdodDtcblxuICAvLyBpZiBhbiBoeXBvdGhldGljYWwgc2Nyb2xsYmFyIGlzIGRldGVjdGVkLCB3ZSBtdXN0IGJlIHN1cmUgaXQncyBub3QgYSBgYm9yZGVyYFxuICAvLyB3ZSBtYWtlIHRoaXMgY2hlY2sgY29uZGl0aW9uYWwgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnNcbiAgaWYgKGhvcml6U2Nyb2xsYmFyIHx8IHZlcnRTY3JvbGxiYXIpIHtcbiAgICB2YXIgc3R5bGVzID0gZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGVsZW1lbnQpO1xuICAgIGhvcml6U2Nyb2xsYmFyIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ3gnKTtcbiAgICB2ZXJ0U2Nyb2xsYmFyIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ3knKTtcblxuICAgIHJlc3VsdC53aWR0aCAtPSBob3JpelNjcm9sbGJhcjtcbiAgICByZXN1bHQuaGVpZ2h0IC09IHZlcnRTY3JvbGxiYXI7XG4gIH1cblxuICByZXR1cm4gZ2V0Q2xpZW50UmVjdChyZXN1bHQpO1xufVxuXG5mdW5jdGlvbiBnZXRPZmZzZXRSZWN0UmVsYXRpdmVUb0FyYml0cmFyeU5vZGUoY2hpbGRyZW4sIHBhcmVudCkge1xuICB2YXIgZml4ZWRQb3NpdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG5cbiAgdmFyIGlzSUUxMCA9IGlzSUUoMTApO1xuICB2YXIgaXNIVE1MID0gcGFyZW50Lm5vZGVOYW1lID09PSAnSFRNTCc7XG4gIHZhciBjaGlsZHJlblJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoY2hpbGRyZW4pO1xuICB2YXIgcGFyZW50UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChwYXJlbnQpO1xuICB2YXIgc2Nyb2xsUGFyZW50ID0gZ2V0U2Nyb2xsUGFyZW50KGNoaWxkcmVuKTtcblxuICB2YXIgc3R5bGVzID0gZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KHBhcmVudCk7XG4gIHZhciBib3JkZXJUb3BXaWR0aCA9IHBhcnNlRmxvYXQoc3R5bGVzLmJvcmRlclRvcFdpZHRoLCAxMCk7XG4gIHZhciBib3JkZXJMZWZ0V2lkdGggPSBwYXJzZUZsb2F0KHN0eWxlcy5ib3JkZXJMZWZ0V2lkdGgsIDEwKTtcblxuICAvLyBJbiBjYXNlcyB3aGVyZSB0aGUgcGFyZW50IGlzIGZpeGVkLCB3ZSBtdXN0IGlnbm9yZSBuZWdhdGl2ZSBzY3JvbGwgaW4gb2Zmc2V0IGNhbGNcbiAgaWYgKGZpeGVkUG9zaXRpb24gJiYgaXNIVE1MKSB7XG4gICAgcGFyZW50UmVjdC50b3AgPSBNYXRoLm1heChwYXJlbnRSZWN0LnRvcCwgMCk7XG4gICAgcGFyZW50UmVjdC5sZWZ0ID0gTWF0aC5tYXgocGFyZW50UmVjdC5sZWZ0LCAwKTtcbiAgfVxuICB2YXIgb2Zmc2V0cyA9IGdldENsaWVudFJlY3Qoe1xuICAgIHRvcDogY2hpbGRyZW5SZWN0LnRvcCAtIHBhcmVudFJlY3QudG9wIC0gYm9yZGVyVG9wV2lkdGgsXG4gICAgbGVmdDogY2hpbGRyZW5SZWN0LmxlZnQgLSBwYXJlbnRSZWN0LmxlZnQgLSBib3JkZXJMZWZ0V2lkdGgsXG4gICAgd2lkdGg6IGNoaWxkcmVuUmVjdC53aWR0aCxcbiAgICBoZWlnaHQ6IGNoaWxkcmVuUmVjdC5oZWlnaHRcbiAgfSk7XG4gIG9mZnNldHMubWFyZ2luVG9wID0gMDtcbiAgb2Zmc2V0cy5tYXJnaW5MZWZ0ID0gMDtcblxuICAvLyBTdWJ0cmFjdCBtYXJnaW5zIG9mIGRvY3VtZW50RWxlbWVudCBpbiBjYXNlIGl0J3MgYmVpbmcgdXNlZCBhcyBwYXJlbnRcbiAgLy8gd2UgZG8gdGhpcyBvbmx5IG9uIEhUTUwgYmVjYXVzZSBpdCdzIHRoZSBvbmx5IGVsZW1lbnQgdGhhdCBiZWhhdmVzXG4gIC8vIGRpZmZlcmVudGx5IHdoZW4gbWFyZ2lucyBhcmUgYXBwbGllZCB0byBpdC4gVGhlIG1hcmdpbnMgYXJlIGluY2x1ZGVkIGluXG4gIC8vIHRoZSBib3ggb2YgdGhlIGRvY3VtZW50RWxlbWVudCwgaW4gdGhlIG90aGVyIGNhc2VzIG5vdC5cbiAgaWYgKCFpc0lFMTAgJiYgaXNIVE1MKSB7XG4gICAgdmFyIG1hcmdpblRvcCA9IHBhcnNlRmxvYXQoc3R5bGVzLm1hcmdpblRvcCwgMTApO1xuICAgIHZhciBtYXJnaW5MZWZ0ID0gcGFyc2VGbG9hdChzdHlsZXMubWFyZ2luTGVmdCwgMTApO1xuXG4gICAgb2Zmc2V0cy50b3AgLT0gYm9yZGVyVG9wV2lkdGggLSBtYXJnaW5Ub3A7XG4gICAgb2Zmc2V0cy5ib3R0b20gLT0gYm9yZGVyVG9wV2lkdGggLSBtYXJnaW5Ub3A7XG4gICAgb2Zmc2V0cy5sZWZ0IC09IGJvcmRlckxlZnRXaWR0aCAtIG1hcmdpbkxlZnQ7XG4gICAgb2Zmc2V0cy5yaWdodCAtPSBib3JkZXJMZWZ0V2lkdGggLSBtYXJnaW5MZWZ0O1xuXG4gICAgLy8gQXR0YWNoIG1hcmdpblRvcCBhbmQgbWFyZ2luTGVmdCBiZWNhdXNlIGluIHNvbWUgY2lyY3Vtc3RhbmNlcyB3ZSBtYXkgbmVlZCB0aGVtXG4gICAgb2Zmc2V0cy5tYXJnaW5Ub3AgPSBtYXJnaW5Ub3A7XG4gICAgb2Zmc2V0cy5tYXJnaW5MZWZ0ID0gbWFyZ2luTGVmdDtcbiAgfVxuXG4gIGlmIChpc0lFMTAgJiYgIWZpeGVkUG9zaXRpb24gPyBwYXJlbnQuY29udGFpbnMoc2Nyb2xsUGFyZW50KSA6IHBhcmVudCA9PT0gc2Nyb2xsUGFyZW50ICYmIHNjcm9sbFBhcmVudC5ub2RlTmFtZSAhPT0gJ0JPRFknKSB7XG4gICAgb2Zmc2V0cyA9IGluY2x1ZGVTY3JvbGwob2Zmc2V0cywgcGFyZW50KTtcbiAgfVxuXG4gIHJldHVybiBvZmZzZXRzO1xufVxuXG5mdW5jdGlvbiBnZXRWaWV3cG9ydE9mZnNldFJlY3RSZWxhdGl2ZVRvQXJ0Yml0cmFyeU5vZGUoZWxlbWVudCkge1xuICB2YXIgZXhjbHVkZVNjcm9sbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgdmFyIGh0bWwgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB2YXIgcmVsYXRpdmVPZmZzZXQgPSBnZXRPZmZzZXRSZWN0UmVsYXRpdmVUb0FyYml0cmFyeU5vZGUoZWxlbWVudCwgaHRtbCk7XG4gIHZhciB3aWR0aCA9IE1hdGgubWF4KGh0bWwuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xuICB2YXIgaGVpZ2h0ID0gTWF0aC5tYXgoaHRtbC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcblxuICB2YXIgc2Nyb2xsVG9wID0gIWV4Y2x1ZGVTY3JvbGwgPyBnZXRTY3JvbGwoaHRtbCkgOiAwO1xuICB2YXIgc2Nyb2xsTGVmdCA9ICFleGNsdWRlU2Nyb2xsID8gZ2V0U2Nyb2xsKGh0bWwsICdsZWZ0JykgOiAwO1xuXG4gIHZhciBvZmZzZXQgPSB7XG4gICAgdG9wOiBzY3JvbGxUb3AgLSByZWxhdGl2ZU9mZnNldC50b3AgKyByZWxhdGl2ZU9mZnNldC5tYXJnaW5Ub3AsXG4gICAgbGVmdDogc2Nyb2xsTGVmdCAtIHJlbGF0aXZlT2Zmc2V0LmxlZnQgKyByZWxhdGl2ZU9mZnNldC5tYXJnaW5MZWZ0LFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodFxuICB9O1xuXG4gIHJldHVybiBnZXRDbGllbnRSZWN0KG9mZnNldCk7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIGVsZW1lbnQgaXMgZml4ZWQgb3IgaXMgaW5zaWRlIGEgZml4ZWQgcGFyZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gY3VzdG9tQ29udGFpbmVyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYW5zd2VyIHRvIFwiaXNGaXhlZD9cIlxuICovXG5mdW5jdGlvbiBpc0ZpeGVkKGVsZW1lbnQpIHtcbiAgdmFyIG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZTtcbiAgaWYgKG5vZGVOYW1lID09PSAnQk9EWScgfHwgbm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGVsZW1lbnQsICdwb3NpdGlvbicpID09PSAnZml4ZWQnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIHBhcmVudE5vZGUgPSBnZXRQYXJlbnROb2RlKGVsZW1lbnQpO1xuICBpZiAoIXBhcmVudE5vZGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGlzRml4ZWQocGFyZW50Tm9kZSk7XG59XG5cbi8qKlxuICogRmluZHMgdGhlIGZpcnN0IHBhcmVudCBvZiBhbiBlbGVtZW50IHRoYXQgaGFzIGEgdHJhbnNmb3JtZWQgcHJvcGVydHkgZGVmaW5lZFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7RWxlbWVudH0gZmlyc3QgdHJhbnNmb3JtZWQgcGFyZW50IG9yIGRvY3VtZW50RWxlbWVudFxuICovXG5cbmZ1bmN0aW9uIGdldEZpeGVkUG9zaXRpb25PZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuICAvLyBUaGlzIGNoZWNrIGlzIG5lZWRlZCB0byBhdm9pZCBlcnJvcnMgaW4gY2FzZSBvbmUgb2YgdGhlIGVsZW1lbnRzIGlzbid0IGRlZmluZWQgZm9yIGFueSByZWFzb25cbiAgaWYgKCFlbGVtZW50IHx8ICFlbGVtZW50LnBhcmVudEVsZW1lbnQgfHwgaXNJRSgpKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuICB2YXIgZWwgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gIHdoaWxlIChlbCAmJiBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHkoZWwsICd0cmFuc2Zvcm0nKSA9PT0gJ25vbmUnKSB7XG4gICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50O1xuICB9XG4gIHJldHVybiBlbCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG59XG5cbi8qKlxuICogQ29tcHV0ZWQgdGhlIGJvdW5kYXJpZXMgbGltaXRzIGFuZCByZXR1cm4gdGhlbVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcG9wcGVyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByZWZlcmVuY2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBwYWRkaW5nXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBib3VuZGFyaWVzRWxlbWVudCAtIEVsZW1lbnQgdXNlZCB0byBkZWZpbmUgdGhlIGJvdW5kYXJpZXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZml4ZWRQb3NpdGlvbiAtIElzIGluIGZpeGVkIHBvc2l0aW9uIG1vZGVcbiAqIEByZXR1cm5zIHtPYmplY3R9IENvb3JkaW5hdGVzIG9mIHRoZSBib3VuZGFyaWVzXG4gKi9cbmZ1bmN0aW9uIGdldEJvdW5kYXJpZXMocG9wcGVyLCByZWZlcmVuY2UsIHBhZGRpbmcsIGJvdW5kYXJpZXNFbGVtZW50KSB7XG4gIHZhciBmaXhlZFBvc2l0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDQgJiYgYXJndW1lbnRzWzRdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNF0gOiBmYWxzZTtcblxuICAvLyBOT1RFOiAxIERPTSBhY2Nlc3MgaGVyZVxuXG4gIHZhciBib3VuZGFyaWVzID0geyB0b3A6IDAsIGxlZnQ6IDAgfTtcbiAgdmFyIG9mZnNldFBhcmVudCA9IGZpeGVkUG9zaXRpb24gPyBnZXRGaXhlZFBvc2l0aW9uT2Zmc2V0UGFyZW50KHBvcHBlcikgOiBmaW5kQ29tbW9uT2Zmc2V0UGFyZW50KHBvcHBlciwgcmVmZXJlbmNlKTtcblxuICAvLyBIYW5kbGUgdmlld3BvcnQgY2FzZVxuICBpZiAoYm91bmRhcmllc0VsZW1lbnQgPT09ICd2aWV3cG9ydCcpIHtcbiAgICBib3VuZGFyaWVzID0gZ2V0Vmlld3BvcnRPZmZzZXRSZWN0UmVsYXRpdmVUb0FydGJpdHJhcnlOb2RlKG9mZnNldFBhcmVudCwgZml4ZWRQb3NpdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgLy8gSGFuZGxlIG90aGVyIGNhc2VzIGJhc2VkIG9uIERPTSBlbGVtZW50IHVzZWQgYXMgYm91bmRhcmllc1xuICAgIHZhciBib3VuZGFyaWVzTm9kZSA9IHZvaWQgMDtcbiAgICBpZiAoYm91bmRhcmllc0VsZW1lbnQgPT09ICdzY3JvbGxQYXJlbnQnKSB7XG4gICAgICBib3VuZGFyaWVzTm9kZSA9IGdldFNjcm9sbFBhcmVudChnZXRQYXJlbnROb2RlKHJlZmVyZW5jZSkpO1xuICAgICAgaWYgKGJvdW5kYXJpZXNOb2RlLm5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICAgICAgYm91bmRhcmllc05vZGUgPSBwb3BwZXIub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChib3VuZGFyaWVzRWxlbWVudCA9PT0gJ3dpbmRvdycpIHtcbiAgICAgIGJvdW5kYXJpZXNOb2RlID0gcG9wcGVyLm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBib3VuZGFyaWVzTm9kZSA9IGJvdW5kYXJpZXNFbGVtZW50O1xuICAgIH1cblxuICAgIHZhciBvZmZzZXRzID0gZ2V0T2Zmc2V0UmVjdFJlbGF0aXZlVG9BcmJpdHJhcnlOb2RlKGJvdW5kYXJpZXNOb2RlLCBvZmZzZXRQYXJlbnQsIGZpeGVkUG9zaXRpb24pO1xuXG4gICAgLy8gSW4gY2FzZSBvZiBIVE1MLCB3ZSBuZWVkIGEgZGlmZmVyZW50IGNvbXB1dGF0aW9uXG4gICAgaWYgKGJvdW5kYXJpZXNOb2RlLm5vZGVOYW1lID09PSAnSFRNTCcgJiYgIWlzRml4ZWQob2Zmc2V0UGFyZW50KSkge1xuICAgICAgdmFyIF9nZXRXaW5kb3dTaXplcyA9IGdldFdpbmRvd1NpemVzKHBvcHBlci5vd25lckRvY3VtZW50KSxcbiAgICAgICAgICBoZWlnaHQgPSBfZ2V0V2luZG93U2l6ZXMuaGVpZ2h0LFxuICAgICAgICAgIHdpZHRoID0gX2dldFdpbmRvd1NpemVzLndpZHRoO1xuXG4gICAgICBib3VuZGFyaWVzLnRvcCArPSBvZmZzZXRzLnRvcCAtIG9mZnNldHMubWFyZ2luVG9wO1xuICAgICAgYm91bmRhcmllcy5ib3R0b20gPSBoZWlnaHQgKyBvZmZzZXRzLnRvcDtcbiAgICAgIGJvdW5kYXJpZXMubGVmdCArPSBvZmZzZXRzLmxlZnQgLSBvZmZzZXRzLm1hcmdpbkxlZnQ7XG4gICAgICBib3VuZGFyaWVzLnJpZ2h0ID0gd2lkdGggKyBvZmZzZXRzLmxlZnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZvciBhbGwgdGhlIG90aGVyIERPTSBlbGVtZW50cywgdGhpcyBvbmUgaXMgZ29vZFxuICAgICAgYm91bmRhcmllcyA9IG9mZnNldHM7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHBhZGRpbmdzXG4gIHBhZGRpbmcgPSBwYWRkaW5nIHx8IDA7XG4gIHZhciBpc1BhZGRpbmdOdW1iZXIgPSB0eXBlb2YgcGFkZGluZyA9PT0gJ251bWJlcic7XG4gIGJvdW5kYXJpZXMubGVmdCArPSBpc1BhZGRpbmdOdW1iZXIgPyBwYWRkaW5nIDogcGFkZGluZy5sZWZ0IHx8IDA7XG4gIGJvdW5kYXJpZXMudG9wICs9IGlzUGFkZGluZ051bWJlciA/IHBhZGRpbmcgOiBwYWRkaW5nLnRvcCB8fCAwO1xuICBib3VuZGFyaWVzLnJpZ2h0IC09IGlzUGFkZGluZ051bWJlciA/IHBhZGRpbmcgOiBwYWRkaW5nLnJpZ2h0IHx8IDA7XG4gIGJvdW5kYXJpZXMuYm90dG9tIC09IGlzUGFkZGluZ051bWJlciA/IHBhZGRpbmcgOiBwYWRkaW5nLmJvdHRvbSB8fCAwO1xuXG4gIHJldHVybiBib3VuZGFyaWVzO1xufVxuXG5mdW5jdGlvbiBnZXRBcmVhKF9yZWYpIHtcbiAgdmFyIHdpZHRoID0gX3JlZi53aWR0aCxcbiAgICAgIGhlaWdodCA9IF9yZWYuaGVpZ2h0O1xuXG4gIHJldHVybiB3aWR0aCAqIGhlaWdodDtcbn1cblxuLyoqXG4gKiBVdGlsaXR5IHVzZWQgdG8gdHJhbnNmb3JtIHRoZSBgYXV0b2AgcGxhY2VtZW50IHRvIHRoZSBwbGFjZW1lbnQgd2l0aCBtb3JlXG4gKiBhdmFpbGFibGUgc3BhY2UuXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgdXBkYXRlIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBjb21wdXRlQXV0b1BsYWNlbWVudChwbGFjZW1lbnQsIHJlZlJlY3QsIHBvcHBlciwgcmVmZXJlbmNlLCBib3VuZGFyaWVzRWxlbWVudCkge1xuICB2YXIgcGFkZGluZyA9IGFyZ3VtZW50cy5sZW5ndGggPiA1ICYmIGFyZ3VtZW50c1s1XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzVdIDogMDtcblxuICBpZiAocGxhY2VtZW50LmluZGV4T2YoJ2F1dG8nKSA9PT0gLTEpIHtcbiAgICByZXR1cm4gcGxhY2VtZW50O1xuICB9XG5cbiAgdmFyIGJvdW5kYXJpZXMgPSBnZXRCb3VuZGFyaWVzKHBvcHBlciwgcmVmZXJlbmNlLCBwYWRkaW5nLCBib3VuZGFyaWVzRWxlbWVudCk7XG5cbiAgdmFyIHJlY3RzID0ge1xuICAgIHRvcDoge1xuICAgICAgd2lkdGg6IGJvdW5kYXJpZXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHJlZlJlY3QudG9wIC0gYm91bmRhcmllcy50b3BcbiAgICB9LFxuICAgIHJpZ2h0OiB7XG4gICAgICB3aWR0aDogYm91bmRhcmllcy5yaWdodCAtIHJlZlJlY3QucmlnaHQsXG4gICAgICBoZWlnaHQ6IGJvdW5kYXJpZXMuaGVpZ2h0XG4gICAgfSxcbiAgICBib3R0b206IHtcbiAgICAgIHdpZHRoOiBib3VuZGFyaWVzLndpZHRoLFxuICAgICAgaGVpZ2h0OiBib3VuZGFyaWVzLmJvdHRvbSAtIHJlZlJlY3QuYm90dG9tXG4gICAgfSxcbiAgICBsZWZ0OiB7XG4gICAgICB3aWR0aDogcmVmUmVjdC5sZWZ0IC0gYm91bmRhcmllcy5sZWZ0LFxuICAgICAgaGVpZ2h0OiBib3VuZGFyaWVzLmhlaWdodFxuICAgIH1cbiAgfTtcblxuICB2YXIgc29ydGVkQXJlYXMgPSBPYmplY3Qua2V5cyhyZWN0cykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gX2V4dGVuZHMoe1xuICAgICAga2V5OiBrZXlcbiAgICB9LCByZWN0c1trZXldLCB7XG4gICAgICBhcmVhOiBnZXRBcmVhKHJlY3RzW2tleV0pXG4gICAgfSk7XG4gIH0pLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYi5hcmVhIC0gYS5hcmVhO1xuICB9KTtcblxuICB2YXIgZmlsdGVyZWRBcmVhcyA9IHNvcnRlZEFyZWFzLmZpbHRlcihmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICB2YXIgd2lkdGggPSBfcmVmMi53aWR0aCxcbiAgICAgICAgaGVpZ2h0ID0gX3JlZjIuaGVpZ2h0O1xuICAgIHJldHVybiB3aWR0aCA+PSBwb3BwZXIuY2xpZW50V2lkdGggJiYgaGVpZ2h0ID49IHBvcHBlci5jbGllbnRIZWlnaHQ7XG4gIH0pO1xuXG4gIHZhciBjb21wdXRlZFBsYWNlbWVudCA9IGZpbHRlcmVkQXJlYXMubGVuZ3RoID4gMCA/IGZpbHRlcmVkQXJlYXNbMF0ua2V5IDogc29ydGVkQXJlYXNbMF0ua2V5O1xuXG4gIHZhciB2YXJpYXRpb24gPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVsxXTtcblxuICByZXR1cm4gY29tcHV0ZWRQbGFjZW1lbnQgKyAodmFyaWF0aW9uID8gJy0nICsgdmFyaWF0aW9uIDogJycpO1xufVxuXG4vKipcbiAqIEdldCBvZmZzZXRzIHRvIHRoZSByZWZlcmVuY2UgZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHBvcHBlciAtIHRoZSBwb3BwZXIgZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSByZWZlcmVuY2UgLSB0aGUgcmVmZXJlbmNlIGVsZW1lbnQgKHRoZSBwb3BwZXIgd2lsbCBiZSByZWxhdGl2ZSB0byB0aGlzKVxuICogQHBhcmFtIHtFbGVtZW50fSBmaXhlZFBvc2l0aW9uIC0gaXMgaW4gZml4ZWQgcG9zaXRpb24gbW9kZVxuICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9mZnNldHMgd2hpY2ggd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXJcbiAqL1xuZnVuY3Rpb24gZ2V0UmVmZXJlbmNlT2Zmc2V0cyhzdGF0ZSwgcG9wcGVyLCByZWZlcmVuY2UpIHtcbiAgdmFyIGZpeGVkUG9zaXRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IG51bGw7XG5cbiAgdmFyIGNvbW1vbk9mZnNldFBhcmVudCA9IGZpeGVkUG9zaXRpb24gPyBnZXRGaXhlZFBvc2l0aW9uT2Zmc2V0UGFyZW50KHBvcHBlcikgOiBmaW5kQ29tbW9uT2Zmc2V0UGFyZW50KHBvcHBlciwgcmVmZXJlbmNlKTtcbiAgcmV0dXJuIGdldE9mZnNldFJlY3RSZWxhdGl2ZVRvQXJiaXRyYXJ5Tm9kZShyZWZlcmVuY2UsIGNvbW1vbk9mZnNldFBhcmVudCwgZml4ZWRQb3NpdGlvbik7XG59XG5cbi8qKlxuICogR2V0IHRoZSBvdXRlciBzaXplcyBvZiB0aGUgZ2l2ZW4gZWxlbWVudCAob2Zmc2V0IHNpemUgKyBtYXJnaW5zKVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBvYmplY3QgY29udGFpbmluZyB3aWR0aCBhbmQgaGVpZ2h0IHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gZ2V0T3V0ZXJTaXplcyhlbGVtZW50KSB7XG4gIHZhciB3aW5kb3cgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gIHZhciBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgdmFyIHggPSBwYXJzZUZsb2F0KHN0eWxlcy5tYXJnaW5Ub3AgfHwgMCkgKyBwYXJzZUZsb2F0KHN0eWxlcy5tYXJnaW5Cb3R0b20gfHwgMCk7XG4gIHZhciB5ID0gcGFyc2VGbG9hdChzdHlsZXMubWFyZ2luTGVmdCB8fCAwKSArIHBhcnNlRmxvYXQoc3R5bGVzLm1hcmdpblJpZ2h0IHx8IDApO1xuICB2YXIgcmVzdWx0ID0ge1xuICAgIHdpZHRoOiBlbGVtZW50Lm9mZnNldFdpZHRoICsgeSxcbiAgICBoZWlnaHQ6IGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgeFxuICB9O1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldCB0aGUgb3Bwb3NpdGUgcGxhY2VtZW50IG9mIHRoZSBnaXZlbiBvbmVcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBwbGFjZW1lbnRcbiAqIEByZXR1cm5zIHtTdHJpbmd9IGZsaXBwZWQgcGxhY2VtZW50XG4gKi9cbmZ1bmN0aW9uIGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICB2YXIgaGFzaCA9IHsgbGVmdDogJ3JpZ2h0JywgcmlnaHQ6ICdsZWZ0JywgYm90dG9tOiAndG9wJywgdG9wOiAnYm90dG9tJyB9O1xuICByZXR1cm4gcGxhY2VtZW50LnJlcGxhY2UoL2xlZnR8cmlnaHR8Ym90dG9tfHRvcC9nLCBmdW5jdGlvbiAobWF0Y2hlZCkge1xuICAgIHJldHVybiBoYXNoW21hdGNoZWRdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBHZXQgb2Zmc2V0cyB0byB0aGUgcG9wcGVyXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9zaXRpb24gLSBDU1MgcG9zaXRpb24gdGhlIFBvcHBlciB3aWxsIGdldCBhcHBsaWVkXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwb3BwZXIgLSB0aGUgcG9wcGVyIGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWZlcmVuY2VPZmZzZXRzIC0gdGhlIHJlZmVyZW5jZSBvZmZzZXRzICh0aGUgcG9wcGVyIHdpbGwgYmUgcmVsYXRpdmUgdG8gdGhpcylcbiAqIEBwYXJhbSB7U3RyaW5nfSBwbGFjZW1lbnQgLSBvbmUgb2YgdGhlIHZhbGlkIHBsYWNlbWVudCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBwb3BwZXJPZmZzZXRzIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9mZnNldHMgd2hpY2ggd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXJcbiAqL1xuZnVuY3Rpb24gZ2V0UG9wcGVyT2Zmc2V0cyhwb3BwZXIsIHJlZmVyZW5jZU9mZnNldHMsIHBsYWNlbWVudCkge1xuICBwbGFjZW1lbnQgPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcblxuICAvLyBHZXQgcG9wcGVyIG5vZGUgc2l6ZXNcbiAgdmFyIHBvcHBlclJlY3QgPSBnZXRPdXRlclNpemVzKHBvcHBlcik7XG5cbiAgLy8gQWRkIHBvc2l0aW9uLCB3aWR0aCBhbmQgaGVpZ2h0IHRvIG91ciBvZmZzZXRzIG9iamVjdFxuICB2YXIgcG9wcGVyT2Zmc2V0cyA9IHtcbiAgICB3aWR0aDogcG9wcGVyUmVjdC53aWR0aCxcbiAgICBoZWlnaHQ6IHBvcHBlclJlY3QuaGVpZ2h0XG4gIH07XG5cbiAgLy8gZGVwZW5kaW5nIGJ5IHRoZSBwb3BwZXIgcGxhY2VtZW50IHdlIGhhdmUgdG8gY29tcHV0ZSBpdHMgb2Zmc2V0cyBzbGlnaHRseSBkaWZmZXJlbnRseVxuICB2YXIgaXNIb3JpeiA9IFsncmlnaHQnLCAnbGVmdCddLmluZGV4T2YocGxhY2VtZW50KSAhPT0gLTE7XG4gIHZhciBtYWluU2lkZSA9IGlzSG9yaXogPyAndG9wJyA6ICdsZWZ0JztcbiAgdmFyIHNlY29uZGFyeVNpZGUgPSBpc0hvcml6ID8gJ2xlZnQnIDogJ3RvcCc7XG4gIHZhciBtZWFzdXJlbWVudCA9IGlzSG9yaXogPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gIHZhciBzZWNvbmRhcnlNZWFzdXJlbWVudCA9ICFpc0hvcml6ID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gIHBvcHBlck9mZnNldHNbbWFpblNpZGVdID0gcmVmZXJlbmNlT2Zmc2V0c1ttYWluU2lkZV0gKyByZWZlcmVuY2VPZmZzZXRzW21lYXN1cmVtZW50XSAvIDIgLSBwb3BwZXJSZWN0W21lYXN1cmVtZW50XSAvIDI7XG4gIGlmIChwbGFjZW1lbnQgPT09IHNlY29uZGFyeVNpZGUpIHtcbiAgICBwb3BwZXJPZmZzZXRzW3NlY29uZGFyeVNpZGVdID0gcmVmZXJlbmNlT2Zmc2V0c1tzZWNvbmRhcnlTaWRlXSAtIHBvcHBlclJlY3Rbc2Vjb25kYXJ5TWVhc3VyZW1lbnRdO1xuICB9IGVsc2Uge1xuICAgIHBvcHBlck9mZnNldHNbc2Vjb25kYXJ5U2lkZV0gPSByZWZlcmVuY2VPZmZzZXRzW2dldE9wcG9zaXRlUGxhY2VtZW50KHNlY29uZGFyeVNpZGUpXTtcbiAgfVxuXG4gIHJldHVybiBwb3BwZXJPZmZzZXRzO1xufVxuXG4vKipcbiAqIE1pbWljcyB0aGUgYGZpbmRgIG1ldGhvZCBvZiBBcnJheVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtBcnJheX0gYXJyXG4gKiBAYXJndW1lbnQgcHJvcFxuICogQGFyZ3VtZW50IHZhbHVlXG4gKiBAcmV0dXJucyBpbmRleCBvciAtMVxuICovXG5mdW5jdGlvbiBmaW5kKGFyciwgY2hlY2spIHtcbiAgLy8gdXNlIG5hdGl2ZSBmaW5kIGlmIHN1cHBvcnRlZFxuICBpZiAoQXJyYXkucHJvdG90eXBlLmZpbmQpIHtcbiAgICByZXR1cm4gYXJyLmZpbmQoY2hlY2spO1xuICB9XG5cbiAgLy8gdXNlIGBmaWx0ZXJgIHRvIG9idGFpbiB0aGUgc2FtZSBiZWhhdmlvciBvZiBgZmluZGBcbiAgcmV0dXJuIGFyci5maWx0ZXIoY2hlY2spWzBdO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgaW5kZXggb2YgdGhlIG1hdGNoaW5nIG9iamVjdFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtBcnJheX0gYXJyXG4gKiBAYXJndW1lbnQgcHJvcFxuICogQGFyZ3VtZW50IHZhbHVlXG4gKiBAcmV0dXJucyBpbmRleCBvciAtMVxuICovXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyLCBwcm9wLCB2YWx1ZSkge1xuICAvLyB1c2UgbmF0aXZlIGZpbmRJbmRleCBpZiBzdXBwb3J0ZWRcbiAgaWYgKEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXgpIHtcbiAgICByZXR1cm4gYXJyLmZpbmRJbmRleChmdW5jdGlvbiAoY3VyKSB7XG4gICAgICByZXR1cm4gY3VyW3Byb3BdID09PSB2YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHVzZSBgZmluZGAgKyBgaW5kZXhPZmAgaWYgYGZpbmRJbmRleGAgaXNuJ3Qgc3VwcG9ydGVkXG4gIHZhciBtYXRjaCA9IGZpbmQoYXJyLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9ialtwcm9wXSA9PT0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gYXJyLmluZGV4T2YobWF0Y2gpO1xufVxuXG4vKipcbiAqIExvb3AgdHJvdWdoIHRoZSBsaXN0IG9mIG1vZGlmaWVycyBhbmQgcnVuIHRoZW0gaW4gb3JkZXIsXG4gKiBlYWNoIG9mIHRoZW0gd2lsbCB0aGVuIGVkaXQgdGhlIGRhdGEgb2JqZWN0LlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtkYXRhT2JqZWN0fSBkYXRhXG4gKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBlbmRzIC0gT3B0aW9uYWwgbW9kaWZpZXIgbmFtZSB1c2VkIGFzIHN0b3BwZXJcbiAqIEByZXR1cm5zIHtkYXRhT2JqZWN0fVxuICovXG5mdW5jdGlvbiBydW5Nb2RpZmllcnMobW9kaWZpZXJzLCBkYXRhLCBlbmRzKSB7XG4gIHZhciBtb2RpZmllcnNUb1J1biA9IGVuZHMgPT09IHVuZGVmaW5lZCA/IG1vZGlmaWVycyA6IG1vZGlmaWVycy5zbGljZSgwLCBmaW5kSW5kZXgobW9kaWZpZXJzLCAnbmFtZScsIGVuZHMpKTtcblxuICBtb2RpZmllcnNUb1J1bi5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIGlmIChtb2RpZmllclsnZnVuY3Rpb24nXSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBkb3Qtbm90YXRpb25cbiAgICAgIGNvbnNvbGUud2FybignYG1vZGlmaWVyLmZ1bmN0aW9uYCBpcyBkZXByZWNhdGVkLCB1c2UgYG1vZGlmaWVyLmZuYCEnKTtcbiAgICB9XG4gICAgdmFyIGZuID0gbW9kaWZpZXJbJ2Z1bmN0aW9uJ10gfHwgbW9kaWZpZXIuZm47IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgaWYgKG1vZGlmaWVyLmVuYWJsZWQgJiYgaXNGdW5jdGlvbihmbikpIHtcbiAgICAgIC8vIEFkZCBwcm9wZXJ0aWVzIHRvIG9mZnNldHMgdG8gbWFrZSB0aGVtIGEgY29tcGxldGUgY2xpZW50UmVjdCBvYmplY3RcbiAgICAgIC8vIHdlIGRvIHRoaXMgYmVmb3JlIGVhY2ggbW9kaWZpZXIgdG8gbWFrZSBzdXJlIHRoZSBwcmV2aW91cyBvbmUgZG9lc24ndFxuICAgICAgLy8gbWVzcyB3aXRoIHRoZXNlIHZhbHVlc1xuICAgICAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IGdldENsaWVudFJlY3QoZGF0YS5vZmZzZXRzLnBvcHBlcik7XG4gICAgICBkYXRhLm9mZnNldHMucmVmZXJlbmNlID0gZ2V0Q2xpZW50UmVjdChkYXRhLm9mZnNldHMucmVmZXJlbmNlKTtcblxuICAgICAgZGF0YSA9IGZuKGRhdGEsIG1vZGlmaWVyKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBwb3BwZXIsIGNvbXB1dGluZyB0aGUgbmV3IG9mZnNldHMgYW5kIGFwcGx5aW5nXG4gKiB0aGUgbmV3IHN0eWxlLjxiciAvPlxuICogUHJlZmVyIGBzY2hlZHVsZVVwZGF0ZWAgb3ZlciBgdXBkYXRlYCBiZWNhdXNlIG9mIHBlcmZvcm1hbmNlIHJlYXNvbnMuXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgLy8gaWYgcG9wcGVyIGlzIGRlc3Ryb3llZCwgZG9uJ3QgcGVyZm9ybSBhbnkgZnVydGhlciB1cGRhdGVcbiAgaWYgKHRoaXMuc3RhdGUuaXNEZXN0cm95ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZGF0YSA9IHtcbiAgICBpbnN0YW5jZTogdGhpcyxcbiAgICBzdHlsZXM6IHt9LFxuICAgIGFycm93U3R5bGVzOiB7fSxcbiAgICBhdHRyaWJ1dGVzOiB7fSxcbiAgICBmbGlwcGVkOiBmYWxzZSxcbiAgICBvZmZzZXRzOiB7fVxuICB9O1xuXG4gIC8vIGNvbXB1dGUgcmVmZXJlbmNlIGVsZW1lbnQgb2Zmc2V0c1xuICBkYXRhLm9mZnNldHMucmVmZXJlbmNlID0gZ2V0UmVmZXJlbmNlT2Zmc2V0cyh0aGlzLnN0YXRlLCB0aGlzLnBvcHBlciwgdGhpcy5yZWZlcmVuY2UsIHRoaXMub3B0aW9ucy5wb3NpdGlvbkZpeGVkKTtcblxuICAvLyBjb21wdXRlIGF1dG8gcGxhY2VtZW50LCBzdG9yZSBwbGFjZW1lbnQgaW5zaWRlIHRoZSBkYXRhIG9iamVjdCxcbiAgLy8gbW9kaWZpZXJzIHdpbGwgYmUgYWJsZSB0byBlZGl0IGBwbGFjZW1lbnRgIGlmIG5lZWRlZFxuICAvLyBhbmQgcmVmZXIgdG8gb3JpZ2luYWxQbGFjZW1lbnQgdG8ga25vdyB0aGUgb3JpZ2luYWwgdmFsdWVcbiAgZGF0YS5wbGFjZW1lbnQgPSBjb21wdXRlQXV0b1BsYWNlbWVudCh0aGlzLm9wdGlvbnMucGxhY2VtZW50LCBkYXRhLm9mZnNldHMucmVmZXJlbmNlLCB0aGlzLnBvcHBlciwgdGhpcy5yZWZlcmVuY2UsIHRoaXMub3B0aW9ucy5tb2RpZmllcnMuZmxpcC5ib3VuZGFyaWVzRWxlbWVudCwgdGhpcy5vcHRpb25zLm1vZGlmaWVycy5mbGlwLnBhZGRpbmcpO1xuXG4gIC8vIHN0b3JlIHRoZSBjb21wdXRlZCBwbGFjZW1lbnQgaW5zaWRlIGBvcmlnaW5hbFBsYWNlbWVudGBcbiAgZGF0YS5vcmlnaW5hbFBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50O1xuXG4gIGRhdGEucG9zaXRpb25GaXhlZCA9IHRoaXMub3B0aW9ucy5wb3NpdGlvbkZpeGVkO1xuXG4gIC8vIGNvbXB1dGUgdGhlIHBvcHBlciBvZmZzZXRzXG4gIGRhdGEub2Zmc2V0cy5wb3BwZXIgPSBnZXRQb3BwZXJPZmZzZXRzKHRoaXMucG9wcGVyLCBkYXRhLm9mZnNldHMucmVmZXJlbmNlLCBkYXRhLnBsYWNlbWVudCk7XG5cbiAgZGF0YS5vZmZzZXRzLnBvcHBlci5wb3NpdGlvbiA9IHRoaXMub3B0aW9ucy5wb3NpdGlvbkZpeGVkID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7XG5cbiAgLy8gcnVuIHRoZSBtb2RpZmllcnNcbiAgZGF0YSA9IHJ1bk1vZGlmaWVycyh0aGlzLm1vZGlmaWVycywgZGF0YSk7XG5cbiAgLy8gdGhlIGZpcnN0IGB1cGRhdGVgIHdpbGwgY2FsbCBgb25DcmVhdGVgIGNhbGxiYWNrXG4gIC8vIHRoZSBvdGhlciBvbmVzIHdpbGwgY2FsbCBgb25VcGRhdGVgIGNhbGxiYWNrXG4gIGlmICghdGhpcy5zdGF0ZS5pc0NyZWF0ZWQpIHtcbiAgICB0aGlzLnN0YXRlLmlzQ3JlYXRlZCA9IHRydWU7XG4gICAgdGhpcy5vcHRpb25zLm9uQ3JlYXRlKGRhdGEpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMub3B0aW9ucy5vblVwZGF0ZShkYXRhKTtcbiAgfVxufVxuXG4vKipcbiAqIEhlbHBlciB1c2VkIHRvIGtub3cgaWYgdGhlIGdpdmVuIG1vZGlmaWVyIGlzIGVuYWJsZWQuXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNNb2RpZmllckVuYWJsZWQobW9kaWZpZXJzLCBtb2RpZmllck5hbWUpIHtcbiAgcmV0dXJuIG1vZGlmaWVycy5zb21lKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgICAgIGVuYWJsZWQgPSBfcmVmLmVuYWJsZWQ7XG4gICAgcmV0dXJuIGVuYWJsZWQgJiYgbmFtZSA9PT0gbW9kaWZpZXJOYW1lO1xuICB9KTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHByZWZpeGVkIHN1cHBvcnRlZCBwcm9wZXJ0eSBuYW1lXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge1N0cmluZ30gcHJvcGVydHkgKGNhbWVsQ2FzZSlcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHByZWZpeGVkIHByb3BlcnR5IChjYW1lbENhc2Ugb3IgUGFzY2FsQ2FzZSwgZGVwZW5kaW5nIG9uIHRoZSB2ZW5kb3IgcHJlZml4KVxuICovXG5mdW5jdGlvbiBnZXRTdXBwb3J0ZWRQcm9wZXJ0eU5hbWUocHJvcGVydHkpIHtcbiAgdmFyIHByZWZpeGVzID0gW2ZhbHNlLCAnbXMnLCAnV2Via2l0JywgJ01veicsICdPJ107XG4gIHZhciB1cHBlclByb3AgPSBwcm9wZXJ0eS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3BlcnR5LnNsaWNlKDEpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcHJlZml4ID0gcHJlZml4ZXNbaV07XG4gICAgdmFyIHRvQ2hlY2sgPSBwcmVmaXggPyAnJyArIHByZWZpeCArIHVwcGVyUHJvcCA6IHByb3BlcnR5O1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQuYm9keS5zdHlsZVt0b0NoZWNrXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0b0NoZWNrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBEZXN0cm95cyB0aGUgcG9wcGVyLlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlclxuICovXG5mdW5jdGlvbiBkZXN0cm95KCkge1xuICB0aGlzLnN0YXRlLmlzRGVzdHJveWVkID0gdHJ1ZTtcblxuICAvLyB0b3VjaCBET00gb25seSBpZiBgYXBwbHlTdHlsZWAgbW9kaWZpZXIgaXMgZW5hYmxlZFxuICBpZiAoaXNNb2RpZmllckVuYWJsZWQodGhpcy5tb2RpZmllcnMsICdhcHBseVN0eWxlJykpIHtcbiAgICB0aGlzLnBvcHBlci5yZW1vdmVBdHRyaWJ1dGUoJ3gtcGxhY2VtZW50Jyk7XG4gICAgdGhpcy5wb3BwZXIuc3R5bGUucG9zaXRpb24gPSAnJztcbiAgICB0aGlzLnBvcHBlci5zdHlsZS50b3AgPSAnJztcbiAgICB0aGlzLnBvcHBlci5zdHlsZS5sZWZ0ID0gJyc7XG4gICAgdGhpcy5wb3BwZXIuc3R5bGUucmlnaHQgPSAnJztcbiAgICB0aGlzLnBvcHBlci5zdHlsZS5ib3R0b20gPSAnJztcbiAgICB0aGlzLnBvcHBlci5zdHlsZS53aWxsQ2hhbmdlID0gJyc7XG4gICAgdGhpcy5wb3BwZXIuc3R5bGVbZ2V0U3VwcG9ydGVkUHJvcGVydHlOYW1lKCd0cmFuc2Zvcm0nKV0gPSAnJztcbiAgfVxuXG4gIHRoaXMuZGlzYWJsZUV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgLy8gcmVtb3ZlIHRoZSBwb3BwZXIgaWYgdXNlciBleHBsaWNpdHkgYXNrZWQgZm9yIHRoZSBkZWxldGlvbiBvbiBkZXN0cm95XG4gIC8vIGRvIG5vdCB1c2UgYHJlbW92ZWAgYmVjYXVzZSBJRTExIGRvZXNuJ3Qgc3VwcG9ydCBpdFxuICBpZiAodGhpcy5vcHRpb25zLnJlbW92ZU9uRGVzdHJveSkge1xuICAgIHRoaXMucG9wcGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5wb3BwZXIpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vKipcbiAqIEdldCB0aGUgd2luZG93IGFzc29jaWF0ZWQgd2l0aCB0aGUgZWxlbWVudFxuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7V2luZG93fVxuICovXG5mdW5jdGlvbiBnZXRXaW5kb3coZWxlbWVudCkge1xuICB2YXIgb3duZXJEb2N1bWVudCA9IGVsZW1lbnQub3duZXJEb2N1bWVudDtcbiAgcmV0dXJuIG93bmVyRG9jdW1lbnQgPyBvd25lckRvY3VtZW50LmRlZmF1bHRWaWV3IDogd2luZG93O1xufVxuXG5mdW5jdGlvbiBhdHRhY2hUb1Njcm9sbFBhcmVudHMoc2Nyb2xsUGFyZW50LCBldmVudCwgY2FsbGJhY2ssIHNjcm9sbFBhcmVudHMpIHtcbiAgdmFyIGlzQm9keSA9IHNjcm9sbFBhcmVudC5ub2RlTmFtZSA9PT0gJ0JPRFknO1xuICB2YXIgdGFyZ2V0ID0gaXNCb2R5ID8gc2Nyb2xsUGFyZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgOiBzY3JvbGxQYXJlbnQ7XG4gIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjaywgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gIGlmICghaXNCb2R5KSB7XG4gICAgYXR0YWNoVG9TY3JvbGxQYXJlbnRzKGdldFNjcm9sbFBhcmVudCh0YXJnZXQucGFyZW50Tm9kZSksIGV2ZW50LCBjYWxsYmFjaywgc2Nyb2xsUGFyZW50cyk7XG4gIH1cbiAgc2Nyb2xsUGFyZW50cy5wdXNoKHRhcmdldCk7XG59XG5cbi8qKlxuICogU2V0dXAgbmVlZGVkIGV2ZW50IGxpc3RlbmVycyB1c2VkIHRvIHVwZGF0ZSB0aGUgcG9wcGVyIHBvc2l0aW9uXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzZXR1cEV2ZW50TGlzdGVuZXJzKHJlZmVyZW5jZSwgb3B0aW9ucywgc3RhdGUsIHVwZGF0ZUJvdW5kKSB7XG4gIC8vIFJlc2l6ZSBldmVudCBsaXN0ZW5lciBvbiB3aW5kb3dcbiAgc3RhdGUudXBkYXRlQm91bmQgPSB1cGRhdGVCb3VuZDtcbiAgZ2V0V2luZG93KHJlZmVyZW5jZSkuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc3RhdGUudXBkYXRlQm91bmQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICAvLyBTY3JvbGwgZXZlbnQgbGlzdGVuZXIgb24gc2Nyb2xsIHBhcmVudHNcbiAgdmFyIHNjcm9sbEVsZW1lbnQgPSBnZXRTY3JvbGxQYXJlbnQocmVmZXJlbmNlKTtcbiAgYXR0YWNoVG9TY3JvbGxQYXJlbnRzKHNjcm9sbEVsZW1lbnQsICdzY3JvbGwnLCBzdGF0ZS51cGRhdGVCb3VuZCwgc3RhdGUuc2Nyb2xsUGFyZW50cyk7XG4gIHN0YXRlLnNjcm9sbEVsZW1lbnQgPSBzY3JvbGxFbGVtZW50O1xuICBzdGF0ZS5ldmVudHNFbmFibGVkID0gdHJ1ZTtcblxuICByZXR1cm4gc3RhdGU7XG59XG5cbi8qKlxuICogSXQgd2lsbCBhZGQgcmVzaXplL3Njcm9sbCBldmVudHMgYW5kIHN0YXJ0IHJlY2FsY3VsYXRpbmdcbiAqIHBvc2l0aW9uIG9mIHRoZSBwb3BwZXIgZWxlbWVudCB3aGVuIHRoZXkgYXJlIHRyaWdnZXJlZC5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXJcbiAqL1xuZnVuY3Rpb24gZW5hYmxlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gIGlmICghdGhpcy5zdGF0ZS5ldmVudHNFbmFibGVkKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHNldHVwRXZlbnRMaXN0ZW5lcnModGhpcy5yZWZlcmVuY2UsIHRoaXMub3B0aW9ucywgdGhpcy5zdGF0ZSwgdGhpcy5zY2hlZHVsZVVwZGF0ZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzIHVzZWQgdG8gdXBkYXRlIHRoZSBwb3BwZXIgcG9zaXRpb25cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHJlZmVyZW5jZSwgc3RhdGUpIHtcbiAgLy8gUmVtb3ZlIHJlc2l6ZSBldmVudCBsaXN0ZW5lciBvbiB3aW5kb3dcbiAgZ2V0V2luZG93KHJlZmVyZW5jZSkucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc3RhdGUudXBkYXRlQm91bmQpO1xuXG4gIC8vIFJlbW92ZSBzY3JvbGwgZXZlbnQgbGlzdGVuZXIgb24gc2Nyb2xsIHBhcmVudHNcbiAgc3RhdGUuc2Nyb2xsUGFyZW50cy5mb3JFYWNoKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc3RhdGUudXBkYXRlQm91bmQpO1xuICB9KTtcblxuICAvLyBSZXNldCBzdGF0ZVxuICBzdGF0ZS51cGRhdGVCb3VuZCA9IG51bGw7XG4gIHN0YXRlLnNjcm9sbFBhcmVudHMgPSBbXTtcbiAgc3RhdGUuc2Nyb2xsRWxlbWVudCA9IG51bGw7XG4gIHN0YXRlLmV2ZW50c0VuYWJsZWQgPSBmYWxzZTtcbiAgcmV0dXJuIHN0YXRlO1xufVxuXG4vKipcbiAqIEl0IHdpbGwgcmVtb3ZlIHJlc2l6ZS9zY3JvbGwgZXZlbnRzIGFuZCB3b24ndCByZWNhbGN1bGF0ZSBwb3BwZXIgcG9zaXRpb25cbiAqIHdoZW4gdGhleSBhcmUgdHJpZ2dlcmVkLiBJdCBhbHNvIHdvbid0IHRyaWdnZXIgYG9uVXBkYXRlYCBjYWxsYmFjayBhbnltb3JlLFxuICogdW5sZXNzIHlvdSBjYWxsIGB1cGRhdGVgIG1ldGhvZCBtYW51YWxseS5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXJcbiAqL1xuZnVuY3Rpb24gZGlzYWJsZUV2ZW50TGlzdGVuZXJzKCkge1xuICBpZiAodGhpcy5zdGF0ZS5ldmVudHNFbmFibGVkKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5zY2hlZHVsZVVwZGF0ZSk7XG4gICAgdGhpcy5zdGF0ZSA9IHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMucmVmZXJlbmNlLCB0aGlzLnN0YXRlKTtcbiAgfVxufVxuXG4vKipcbiAqIFRlbGxzIGlmIGEgZ2l2ZW4gaW5wdXQgaXMgYSBudW1iZXJcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7Kn0gaW5wdXQgdG8gY2hlY2tcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzTnVtZXJpYyhuKSB7XG4gIHJldHVybiBuICE9PSAnJyAmJiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgaXNGaW5pdGUobik7XG59XG5cbi8qKlxuICogU2V0IHRoZSBzdHlsZSB0byB0aGUgZ2l2ZW4gcG9wcGVyXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnQgLSBFbGVtZW50IHRvIGFwcGx5IHRoZSBzdHlsZSB0b1xuICogQGFyZ3VtZW50IHtPYmplY3R9IHN0eWxlc1xuICogT2JqZWN0IHdpdGggYSBsaXN0IG9mIHByb3BlcnRpZXMgYW5kIHZhbHVlcyB3aGljaCB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gc2V0U3R5bGVzKGVsZW1lbnQsIHN0eWxlcykge1xuICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICB2YXIgdW5pdCA9ICcnO1xuICAgIC8vIGFkZCB1bml0IGlmIHRoZSB2YWx1ZSBpcyBudW1lcmljIGFuZCBpcyBvbmUgb2YgdGhlIGZvbGxvd2luZ1xuICAgIGlmIChbJ3dpZHRoJywgJ2hlaWdodCcsICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXS5pbmRleE9mKHByb3ApICE9PSAtMSAmJiBpc051bWVyaWMoc3R5bGVzW3Byb3BdKSkge1xuICAgICAgdW5pdCA9ICdweCc7XG4gICAgfVxuICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSBzdHlsZXNbcHJvcF0gKyB1bml0O1xuICB9KTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGF0dHJpYnV0ZXMgdG8gdGhlIGdpdmVuIHBvcHBlclxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50IC0gRWxlbWVudCB0byBhcHBseSB0aGUgYXR0cmlidXRlcyB0b1xuICogQGFyZ3VtZW50IHtPYmplY3R9IHN0eWxlc1xuICogT2JqZWN0IHdpdGggYSBsaXN0IG9mIHByb3BlcnRpZXMgYW5kIHZhbHVlcyB3aGljaCB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlcyhlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICB2YXIgdmFsdWUgPSBhdHRyaWJ1dGVzW3Byb3BdO1xuICAgIGlmICh2YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKHByb3AsIGF0dHJpYnV0ZXNbcHJvcF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShwcm9wKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEuc3R5bGVzIC0gTGlzdCBvZiBzdHlsZSBwcm9wZXJ0aWVzIC0gdmFsdWVzIHRvIGFwcGx5IHRvIHBvcHBlciBlbGVtZW50XG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YS5hdHRyaWJ1dGVzIC0gTGlzdCBvZiBhdHRyaWJ1dGUgcHJvcGVydGllcyAtIHZhbHVlcyB0byBhcHBseSB0byBwb3BwZXIgZWxlbWVudFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIHNhbWUgZGF0YSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gYXBwbHlTdHlsZShkYXRhKSB7XG4gIC8vIGFueSBwcm9wZXJ0eSBwcmVzZW50IGluIGBkYXRhLnN0eWxlc2Agd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIsXG4gIC8vIGluIHRoaXMgd2F5IHdlIGNhbiBtYWtlIHRoZSAzcmQgcGFydHkgbW9kaWZpZXJzIGFkZCBjdXN0b20gc3R5bGVzIHRvIGl0XG4gIC8vIEJlIGF3YXJlLCBtb2RpZmllcnMgY291bGQgb3ZlcnJpZGUgdGhlIHByb3BlcnRpZXMgZGVmaW5lZCBpbiB0aGUgcHJldmlvdXNcbiAgLy8gbGluZXMgb2YgdGhpcyBtb2RpZmllciFcbiAgc2V0U3R5bGVzKGRhdGEuaW5zdGFuY2UucG9wcGVyLCBkYXRhLnN0eWxlcyk7XG5cbiAgLy8gYW55IHByb3BlcnR5IHByZXNlbnQgaW4gYGRhdGEuYXR0cmlidXRlc2Agd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIsXG4gIC8vIHRoZXkgd2lsbCBiZSBzZXQgYXMgSFRNTCBhdHRyaWJ1dGVzIG9mIHRoZSBlbGVtZW50XG4gIHNldEF0dHJpYnV0ZXMoZGF0YS5pbnN0YW5jZS5wb3BwZXIsIGRhdGEuYXR0cmlidXRlcyk7XG5cbiAgLy8gaWYgYXJyb3dFbGVtZW50IGlzIGRlZmluZWQgYW5kIGFycm93U3R5bGVzIGhhcyBzb21lIHByb3BlcnRpZXNcbiAgaWYgKGRhdGEuYXJyb3dFbGVtZW50ICYmIE9iamVjdC5rZXlzKGRhdGEuYXJyb3dTdHlsZXMpLmxlbmd0aCkge1xuICAgIHNldFN0eWxlcyhkYXRhLmFycm93RWxlbWVudCwgZGF0YS5hcnJvd1N0eWxlcyk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIHgtcGxhY2VtZW50IGF0dHJpYnV0ZSBiZWZvcmUgZXZlcnl0aGluZyBlbHNlIGJlY2F1c2UgaXQgY291bGQgYmUgdXNlZFxuICogdG8gYWRkIG1hcmdpbnMgdG8gdGhlIHBvcHBlciBtYXJnaW5zIG5lZWRzIHRvIGJlIGNhbGN1bGF0ZWQgdG8gZ2V0IHRoZVxuICogY29ycmVjdCBwb3BwZXIgb2Zmc2V0cy5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIubW9kaWZpZXJzXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByZWZlcmVuY2UgLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgdXNlZCB0byBwb3NpdGlvbiB0aGUgcG9wcGVyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwb3BwZXIgLSBUaGUgSFRNTCBlbGVtZW50IHVzZWQgYXMgcG9wcGVyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFBvcHBlci5qcyBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGFwcGx5U3R5bGVPbkxvYWQocmVmZXJlbmNlLCBwb3BwZXIsIG9wdGlvbnMsIG1vZGlmaWVyT3B0aW9ucywgc3RhdGUpIHtcbiAgLy8gY29tcHV0ZSByZWZlcmVuY2UgZWxlbWVudCBvZmZzZXRzXG4gIHZhciByZWZlcmVuY2VPZmZzZXRzID0gZ2V0UmVmZXJlbmNlT2Zmc2V0cyhzdGF0ZSwgcG9wcGVyLCByZWZlcmVuY2UsIG9wdGlvbnMucG9zaXRpb25GaXhlZCk7XG5cbiAgLy8gY29tcHV0ZSBhdXRvIHBsYWNlbWVudCwgc3RvcmUgcGxhY2VtZW50IGluc2lkZSB0aGUgZGF0YSBvYmplY3QsXG4gIC8vIG1vZGlmaWVycyB3aWxsIGJlIGFibGUgdG8gZWRpdCBgcGxhY2VtZW50YCBpZiBuZWVkZWRcbiAgLy8gYW5kIHJlZmVyIHRvIG9yaWdpbmFsUGxhY2VtZW50IHRvIGtub3cgdGhlIG9yaWdpbmFsIHZhbHVlXG4gIHZhciBwbGFjZW1lbnQgPSBjb21wdXRlQXV0b1BsYWNlbWVudChvcHRpb25zLnBsYWNlbWVudCwgcmVmZXJlbmNlT2Zmc2V0cywgcG9wcGVyLCByZWZlcmVuY2UsIG9wdGlvbnMubW9kaWZpZXJzLmZsaXAuYm91bmRhcmllc0VsZW1lbnQsIG9wdGlvbnMubW9kaWZpZXJzLmZsaXAucGFkZGluZyk7XG5cbiAgcG9wcGVyLnNldEF0dHJpYnV0ZSgneC1wbGFjZW1lbnQnLCBwbGFjZW1lbnQpO1xuXG4gIC8vIEFwcGx5IGBwb3NpdGlvbmAgdG8gcG9wcGVyIGJlZm9yZSBhbnl0aGluZyBlbHNlIGJlY2F1c2VcbiAgLy8gd2l0aG91dCB0aGUgcG9zaXRpb24gYXBwbGllZCB3ZSBjYW4ndCBndWFyYW50ZWUgY29ycmVjdCBjb21wdXRhdGlvbnNcbiAgc2V0U3R5bGVzKHBvcHBlciwgeyBwb3NpdGlvbjogb3B0aW9ucy5wb3NpdGlvbkZpeGVkID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZScgfSk7XG5cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgYHVwZGF0ZWAgbWV0aG9kXG4gKiBAYXJndW1lbnQge0Jvb2xlYW59IHNob3VsZFJvdW5kIC0gSWYgdGhlIG9mZnNldHMgc2hvdWxkIGJlIHJvdW5kZWQgYXQgYWxsXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcG9wcGVyJ3MgcG9zaXRpb24gb2Zmc2V0cyByb3VuZGVkXG4gKlxuICogVGhlIHRhbGUgb2YgcGl4ZWwtcGVyZmVjdCBwb3NpdGlvbmluZy4gSXQncyBzdGlsbCBub3QgMTAwJSBwZXJmZWN0LCBidXQgYXNcbiAqIGdvb2QgYXMgaXQgY2FuIGJlIHdpdGhpbiByZWFzb24uXG4gKiBEaXNjdXNzaW9uIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9GZXpWcmFzdGEvcG9wcGVyLmpzL3B1bGwvNzE1XG4gKlxuICogTG93IERQSSBzY3JlZW5zIGNhdXNlIGEgcG9wcGVyIHRvIGJlIGJsdXJyeSBpZiBub3QgdXNpbmcgZnVsbCBwaXhlbHMgKFNhZmFyaVxuICogYXMgd2VsbCBvbiBIaWdoIERQSSBzY3JlZW5zKS5cbiAqXG4gKiBGaXJlZm94IHByZWZlcnMgbm8gcm91bmRpbmcgZm9yIHBvc2l0aW9uaW5nIGFuZCBkb2VzIG5vdCBoYXZlIGJsdXJyaW5lc3Mgb25cbiAqIGhpZ2ggRFBJIHNjcmVlbnMuXG4gKlxuICogT25seSBob3Jpem9udGFsIHBsYWNlbWVudCBhbmQgbGVmdC9yaWdodCB2YWx1ZXMgbmVlZCB0byBiZSBjb25zaWRlcmVkLlxuICovXG5mdW5jdGlvbiBnZXRSb3VuZGVkT2Zmc2V0cyhkYXRhLCBzaG91bGRSb3VuZCkge1xuICB2YXIgX2RhdGEkb2Zmc2V0cyA9IGRhdGEub2Zmc2V0cyxcbiAgICAgIHBvcHBlciA9IF9kYXRhJG9mZnNldHMucG9wcGVyLFxuICAgICAgcmVmZXJlbmNlID0gX2RhdGEkb2Zmc2V0cy5yZWZlcmVuY2U7XG4gIHZhciByb3VuZCA9IE1hdGgucm91bmQsXG4gICAgICBmbG9vciA9IE1hdGguZmxvb3I7XG5cbiAgdmFyIG5vUm91bmQgPSBmdW5jdGlvbiBub1JvdW5kKHYpIHtcbiAgICByZXR1cm4gdjtcbiAgfTtcblxuICB2YXIgcmVmZXJlbmNlV2lkdGggPSByb3VuZChyZWZlcmVuY2Uud2lkdGgpO1xuICB2YXIgcG9wcGVyV2lkdGggPSByb3VuZChwb3BwZXIud2lkdGgpO1xuXG4gIHZhciBpc1ZlcnRpY2FsID0gWydsZWZ0JywgJ3JpZ2h0J10uaW5kZXhPZihkYXRhLnBsYWNlbWVudCkgIT09IC0xO1xuICB2YXIgaXNWYXJpYXRpb24gPSBkYXRhLnBsYWNlbWVudC5pbmRleE9mKCctJykgIT09IC0xO1xuICB2YXIgc2FtZVdpZHRoUGFyaXR5ID0gcmVmZXJlbmNlV2lkdGggJSAyID09PSBwb3BwZXJXaWR0aCAlIDI7XG4gIHZhciBib3RoT2RkV2lkdGggPSByZWZlcmVuY2VXaWR0aCAlIDIgPT09IDEgJiYgcG9wcGVyV2lkdGggJSAyID09PSAxO1xuXG4gIHZhciBob3Jpem9udGFsVG9JbnRlZ2VyID0gIXNob3VsZFJvdW5kID8gbm9Sb3VuZCA6IGlzVmVydGljYWwgfHwgaXNWYXJpYXRpb24gfHwgc2FtZVdpZHRoUGFyaXR5ID8gcm91bmQgOiBmbG9vcjtcbiAgdmFyIHZlcnRpY2FsVG9JbnRlZ2VyID0gIXNob3VsZFJvdW5kID8gbm9Sb3VuZCA6IHJvdW5kO1xuXG4gIHJldHVybiB7XG4gICAgbGVmdDogaG9yaXpvbnRhbFRvSW50ZWdlcihib3RoT2RkV2lkdGggJiYgIWlzVmFyaWF0aW9uICYmIHNob3VsZFJvdW5kID8gcG9wcGVyLmxlZnQgLSAxIDogcG9wcGVyLmxlZnQpLFxuICAgIHRvcDogdmVydGljYWxUb0ludGVnZXIocG9wcGVyLnRvcCksXG4gICAgYm90dG9tOiB2ZXJ0aWNhbFRvSW50ZWdlcihwb3BwZXIuYm90dG9tKSxcbiAgICByaWdodDogaG9yaXpvbnRhbFRvSW50ZWdlcihwb3BwZXIucmlnaHQpXG4gIH07XG59XG5cbnZhciBpc0ZpcmVmb3ggPSBpc0Jyb3dzZXIgJiYgL0ZpcmVmb3gvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBjb21wdXRlU3R5bGUoZGF0YSwgb3B0aW9ucykge1xuICB2YXIgeCA9IG9wdGlvbnMueCxcbiAgICAgIHkgPSBvcHRpb25zLnk7XG4gIHZhciBwb3BwZXIgPSBkYXRhLm9mZnNldHMucG9wcGVyO1xuXG4gIC8vIFJlbW92ZSB0aGlzIGxlZ2FjeSBzdXBwb3J0IGluIFBvcHBlci5qcyB2MlxuXG4gIHZhciBsZWdhY3lHcHVBY2NlbGVyYXRpb25PcHRpb24gPSBmaW5kKGRhdGEuaW5zdGFuY2UubW9kaWZpZXJzLCBmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICByZXR1cm4gbW9kaWZpZXIubmFtZSA9PT0gJ2FwcGx5U3R5bGUnO1xuICB9KS5ncHVBY2NlbGVyYXRpb247XG4gIGlmIChsZWdhY3lHcHVBY2NlbGVyYXRpb25PcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnNvbGUud2FybignV0FSTklORzogYGdwdUFjY2VsZXJhdGlvbmAgb3B0aW9uIG1vdmVkIHRvIGBjb21wdXRlU3R5bGVgIG1vZGlmaWVyIGFuZCB3aWxsIG5vdCBiZSBzdXBwb3J0ZWQgaW4gZnV0dXJlIHZlcnNpb25zIG9mIFBvcHBlci5qcyEnKTtcbiAgfVxuICB2YXIgZ3B1QWNjZWxlcmF0aW9uID0gbGVnYWN5R3B1QWNjZWxlcmF0aW9uT3B0aW9uICE9PSB1bmRlZmluZWQgPyBsZWdhY3lHcHVBY2NlbGVyYXRpb25PcHRpb24gOiBvcHRpb25zLmdwdUFjY2VsZXJhdGlvbjtcblxuICB2YXIgb2Zmc2V0UGFyZW50ID0gZ2V0T2Zmc2V0UGFyZW50KGRhdGEuaW5zdGFuY2UucG9wcGVyKTtcbiAgdmFyIG9mZnNldFBhcmVudFJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qob2Zmc2V0UGFyZW50KTtcblxuICAvLyBTdHlsZXNcbiAgdmFyIHN0eWxlcyA9IHtcbiAgICBwb3NpdGlvbjogcG9wcGVyLnBvc2l0aW9uXG4gIH07XG5cbiAgdmFyIG9mZnNldHMgPSBnZXRSb3VuZGVkT2Zmc2V0cyhkYXRhLCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA8IDIgfHwgIWlzRmlyZWZveCk7XG5cbiAgdmFyIHNpZGVBID0geCA9PT0gJ2JvdHRvbScgPyAndG9wJyA6ICdib3R0b20nO1xuICB2YXIgc2lkZUIgPSB5ID09PSAncmlnaHQnID8gJ2xlZnQnIDogJ3JpZ2h0JztcblxuICAvLyBpZiBncHVBY2NlbGVyYXRpb24gaXMgc2V0IHRvIGB0cnVlYCBhbmQgdHJhbnNmb3JtIGlzIHN1cHBvcnRlZCxcbiAgLy8gIHdlIHVzZSBgdHJhbnNsYXRlM2RgIHRvIGFwcGx5IHRoZSBwb3NpdGlvbiB0byB0aGUgcG9wcGVyIHdlXG4gIC8vIGF1dG9tYXRpY2FsbHkgdXNlIHRoZSBzdXBwb3J0ZWQgcHJlZml4ZWQgdmVyc2lvbiBpZiBuZWVkZWRcbiAgdmFyIHByZWZpeGVkUHJvcGVydHkgPSBnZXRTdXBwb3J0ZWRQcm9wZXJ0eU5hbWUoJ3RyYW5zZm9ybScpO1xuXG4gIC8vIG5vdywgbGV0J3MgbWFrZSBhIHN0ZXAgYmFjayBhbmQgbG9vayBhdCB0aGlzIGNvZGUgY2xvc2VseSAod3RmPylcbiAgLy8gSWYgdGhlIGNvbnRlbnQgb2YgdGhlIHBvcHBlciBncm93cyBvbmNlIGl0J3MgYmVlbiBwb3NpdGlvbmVkLCBpdFxuICAvLyBtYXkgaGFwcGVuIHRoYXQgdGhlIHBvcHBlciBnZXRzIG1pc3BsYWNlZCBiZWNhdXNlIG9mIHRoZSBuZXcgY29udGVudFxuICAvLyBvdmVyZmxvd2luZyBpdHMgcmVmZXJlbmNlIGVsZW1lbnRcbiAgLy8gVG8gYXZvaWQgdGhpcyBwcm9ibGVtLCB3ZSBwcm92aWRlIHR3byBvcHRpb25zICh4IGFuZCB5KSwgd2hpY2ggYWxsb3dcbiAgLy8gdGhlIGNvbnN1bWVyIHRvIGRlZmluZSB0aGUgb2Zmc2V0IG9yaWdpbi5cbiAgLy8gSWYgd2UgcG9zaXRpb24gYSBwb3BwZXIgb24gdG9wIG9mIGEgcmVmZXJlbmNlIGVsZW1lbnQsIHdlIGNhbiBzZXRcbiAgLy8gYHhgIHRvIGB0b3BgIHRvIG1ha2UgdGhlIHBvcHBlciBncm93IHRvd2FyZHMgaXRzIHRvcCBpbnN0ZWFkIG9mXG4gIC8vIGl0cyBib3R0b20uXG4gIHZhciBsZWZ0ID0gdm9pZCAwLFxuICAgICAgdG9wID0gdm9pZCAwO1xuICBpZiAoc2lkZUEgPT09ICdib3R0b20nKSB7XG4gICAgLy8gd2hlbiBvZmZzZXRQYXJlbnQgaXMgPGh0bWw+IHRoZSBwb3NpdGlvbmluZyBpcyByZWxhdGl2ZSB0byB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4gKGV4Y2x1ZGluZyB0aGUgc2Nyb2xsYmFyKVxuICAgIC8vIGFuZCBub3QgdGhlIGJvdHRvbSBvZiB0aGUgaHRtbCBlbGVtZW50XG4gICAgaWYgKG9mZnNldFBhcmVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICB0b3AgPSAtb2Zmc2V0UGFyZW50LmNsaWVudEhlaWdodCArIG9mZnNldHMuYm90dG9tO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b3AgPSAtb2Zmc2V0UGFyZW50UmVjdC5oZWlnaHQgKyBvZmZzZXRzLmJvdHRvbTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdG9wID0gb2Zmc2V0cy50b3A7XG4gIH1cbiAgaWYgKHNpZGVCID09PSAncmlnaHQnKSB7XG4gICAgaWYgKG9mZnNldFBhcmVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICBsZWZ0ID0gLW9mZnNldFBhcmVudC5jbGllbnRXaWR0aCArIG9mZnNldHMucmlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlZnQgPSAtb2Zmc2V0UGFyZW50UmVjdC53aWR0aCArIG9mZnNldHMucmlnaHQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxlZnQgPSBvZmZzZXRzLmxlZnQ7XG4gIH1cbiAgaWYgKGdwdUFjY2VsZXJhdGlvbiAmJiBwcmVmaXhlZFByb3BlcnR5KSB7XG4gICAgc3R5bGVzW3ByZWZpeGVkUHJvcGVydHldID0gJ3RyYW5zbGF0ZTNkKCcgKyBsZWZ0ICsgJ3B4LCAnICsgdG9wICsgJ3B4LCAwKSc7XG4gICAgc3R5bGVzW3NpZGVBXSA9IDA7XG4gICAgc3R5bGVzW3NpZGVCXSA9IDA7XG4gICAgc3R5bGVzLndpbGxDaGFuZ2UgPSAndHJhbnNmb3JtJztcbiAgfSBlbHNlIHtcbiAgICAvLyBvdGh3ZXJpc2UsIHdlIHVzZSB0aGUgc3RhbmRhcmQgYHRvcGAsIGBsZWZ0YCwgYGJvdHRvbWAgYW5kIGByaWdodGAgcHJvcGVydGllc1xuICAgIHZhciBpbnZlcnRUb3AgPSBzaWRlQSA9PT0gJ2JvdHRvbScgPyAtMSA6IDE7XG4gICAgdmFyIGludmVydExlZnQgPSBzaWRlQiA9PT0gJ3JpZ2h0JyA/IC0xIDogMTtcbiAgICBzdHlsZXNbc2lkZUFdID0gdG9wICogaW52ZXJ0VG9wO1xuICAgIHN0eWxlc1tzaWRlQl0gPSBsZWZ0ICogaW52ZXJ0TGVmdDtcbiAgICBzdHlsZXMud2lsbENoYW5nZSA9IHNpZGVBICsgJywgJyArIHNpZGVCO1xuICB9XG5cbiAgLy8gQXR0cmlidXRlc1xuICB2YXIgYXR0cmlidXRlcyA9IHtcbiAgICAneC1wbGFjZW1lbnQnOiBkYXRhLnBsYWNlbWVudFxuICB9O1xuXG4gIC8vIFVwZGF0ZSBgZGF0YWAgYXR0cmlidXRlcywgc3R5bGVzIGFuZCBhcnJvd1N0eWxlc1xuICBkYXRhLmF0dHJpYnV0ZXMgPSBfZXh0ZW5kcyh7fSwgYXR0cmlidXRlcywgZGF0YS5hdHRyaWJ1dGVzKTtcbiAgZGF0YS5zdHlsZXMgPSBfZXh0ZW5kcyh7fSwgc3R5bGVzLCBkYXRhLnN0eWxlcyk7XG4gIGRhdGEuYXJyb3dTdHlsZXMgPSBfZXh0ZW5kcyh7fSwgZGF0YS5vZmZzZXRzLmFycm93LCBkYXRhLmFycm93U3R5bGVzKTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgdXNlZCB0byBrbm93IGlmIHRoZSBnaXZlbiBtb2RpZmllciBkZXBlbmRzIGZyb20gYW5vdGhlciBvbmUuPGJyIC8+XG4gKiBJdCBjaGVja3MgaWYgdGhlIG5lZWRlZCBtb2RpZmllciBpcyBsaXN0ZWQgYW5kIGVuYWJsZWQuXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnMgLSBsaXN0IG9mIG1vZGlmaWVyc1xuICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RpbmdOYW1lIC0gbmFtZSBvZiByZXF1ZXN0aW5nIG1vZGlmaWVyXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdGVkTmFtZSAtIG5hbWUgb2YgcmVxdWVzdGVkIG1vZGlmaWVyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNNb2RpZmllclJlcXVpcmVkKG1vZGlmaWVycywgcmVxdWVzdGluZ05hbWUsIHJlcXVlc3RlZE5hbWUpIHtcbiAgdmFyIHJlcXVlc3RpbmcgPSBmaW5kKG1vZGlmaWVycywgZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYubmFtZTtcbiAgICByZXR1cm4gbmFtZSA9PT0gcmVxdWVzdGluZ05hbWU7XG4gIH0pO1xuXG4gIHZhciBpc1JlcXVpcmVkID0gISFyZXF1ZXN0aW5nICYmIG1vZGlmaWVycy5zb21lKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIHJldHVybiBtb2RpZmllci5uYW1lID09PSByZXF1ZXN0ZWROYW1lICYmIG1vZGlmaWVyLmVuYWJsZWQgJiYgbW9kaWZpZXIub3JkZXIgPCByZXF1ZXN0aW5nLm9yZGVyO1xuICB9KTtcblxuICBpZiAoIWlzUmVxdWlyZWQpIHtcbiAgICB2YXIgX3JlcXVlc3RpbmcgPSAnYCcgKyByZXF1ZXN0aW5nTmFtZSArICdgJztcbiAgICB2YXIgcmVxdWVzdGVkID0gJ2AnICsgcmVxdWVzdGVkTmFtZSArICdgJztcbiAgICBjb25zb2xlLndhcm4ocmVxdWVzdGVkICsgJyBtb2RpZmllciBpcyByZXF1aXJlZCBieSAnICsgX3JlcXVlc3RpbmcgKyAnIG1vZGlmaWVyIGluIG9yZGVyIHRvIHdvcmssIGJlIHN1cmUgdG8gaW5jbHVkZSBpdCBiZWZvcmUgJyArIF9yZXF1ZXN0aW5nICsgJyEnKTtcbiAgfVxuICByZXR1cm4gaXNSZXF1aXJlZDtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSB1cGRhdGUgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGFycm93KGRhdGEsIG9wdGlvbnMpIHtcbiAgdmFyIF9kYXRhJG9mZnNldHMkYXJyb3c7XG5cbiAgLy8gYXJyb3cgZGVwZW5kcyBvbiBrZWVwVG9nZXRoZXIgaW4gb3JkZXIgdG8gd29ya1xuICBpZiAoIWlzTW9kaWZpZXJSZXF1aXJlZChkYXRhLmluc3RhbmNlLm1vZGlmaWVycywgJ2Fycm93JywgJ2tlZXBUb2dldGhlcicpKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICB2YXIgYXJyb3dFbGVtZW50ID0gb3B0aW9ucy5lbGVtZW50O1xuXG4gIC8vIGlmIGFycm93RWxlbWVudCBpcyBhIHN0cmluZywgc3VwcG9zZSBpdCdzIGEgQ1NTIHNlbGVjdG9yXG4gIGlmICh0eXBlb2YgYXJyb3dFbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgIGFycm93RWxlbWVudCA9IGRhdGEuaW5zdGFuY2UucG9wcGVyLnF1ZXJ5U2VsZWN0b3IoYXJyb3dFbGVtZW50KTtcblxuICAgIC8vIGlmIGFycm93RWxlbWVudCBpcyBub3QgZm91bmQsIGRvbid0IHJ1biB0aGUgbW9kaWZpZXJcbiAgICBpZiAoIWFycm93RWxlbWVudCkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGlmIHRoZSBhcnJvd0VsZW1lbnQgaXNuJ3QgYSBxdWVyeSBzZWxlY3RvciB3ZSBtdXN0IGNoZWNrIHRoYXQgdGhlXG4gICAgLy8gcHJvdmlkZWQgRE9NIG5vZGUgaXMgY2hpbGQgb2YgaXRzIHBvcHBlciBub2RlXG4gICAgaWYgKCFkYXRhLmluc3RhbmNlLnBvcHBlci5jb250YWlucyhhcnJvd0VsZW1lbnQpKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1dBUk5JTkc6IGBhcnJvdy5lbGVtZW50YCBtdXN0IGJlIGNoaWxkIG9mIGl0cyBwb3BwZXIgZWxlbWVudCEnKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuICB2YXIgX2RhdGEkb2Zmc2V0cyA9IGRhdGEub2Zmc2V0cyxcbiAgICAgIHBvcHBlciA9IF9kYXRhJG9mZnNldHMucG9wcGVyLFxuICAgICAgcmVmZXJlbmNlID0gX2RhdGEkb2Zmc2V0cy5yZWZlcmVuY2U7XG5cbiAgdmFyIGlzVmVydGljYWwgPSBbJ2xlZnQnLCAncmlnaHQnXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xO1xuXG4gIHZhciBsZW4gPSBpc1ZlcnRpY2FsID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuICB2YXIgc2lkZUNhcGl0YWxpemVkID0gaXNWZXJ0aWNhbCA/ICdUb3AnIDogJ0xlZnQnO1xuICB2YXIgc2lkZSA9IHNpZGVDYXBpdGFsaXplZC50b0xvd2VyQ2FzZSgpO1xuICB2YXIgYWx0U2lkZSA9IGlzVmVydGljYWwgPyAnbGVmdCcgOiAndG9wJztcbiAgdmFyIG9wU2lkZSA9IGlzVmVydGljYWwgPyAnYm90dG9tJyA6ICdyaWdodCc7XG4gIHZhciBhcnJvd0VsZW1lbnRTaXplID0gZ2V0T3V0ZXJTaXplcyhhcnJvd0VsZW1lbnQpW2xlbl07XG5cbiAgLy9cbiAgLy8gZXh0ZW5kcyBrZWVwVG9nZXRoZXIgYmVoYXZpb3IgbWFraW5nIHN1cmUgdGhlIHBvcHBlciBhbmQgaXRzXG4gIC8vIHJlZmVyZW5jZSBoYXZlIGVub3VnaCBwaXhlbHMgaW4gY29uanVuY3Rpb25cbiAgLy9cblxuICAvLyB0b3AvbGVmdCBzaWRlXG4gIGlmIChyZWZlcmVuY2Vbb3BTaWRlXSAtIGFycm93RWxlbWVudFNpemUgPCBwb3BwZXJbc2lkZV0pIHtcbiAgICBkYXRhLm9mZnNldHMucG9wcGVyW3NpZGVdIC09IHBvcHBlcltzaWRlXSAtIChyZWZlcmVuY2Vbb3BTaWRlXSAtIGFycm93RWxlbWVudFNpemUpO1xuICB9XG4gIC8vIGJvdHRvbS9yaWdodCBzaWRlXG4gIGlmIChyZWZlcmVuY2Vbc2lkZV0gKyBhcnJvd0VsZW1lbnRTaXplID4gcG9wcGVyW29wU2lkZV0pIHtcbiAgICBkYXRhLm9mZnNldHMucG9wcGVyW3NpZGVdICs9IHJlZmVyZW5jZVtzaWRlXSArIGFycm93RWxlbWVudFNpemUgLSBwb3BwZXJbb3BTaWRlXTtcbiAgfVxuICBkYXRhLm9mZnNldHMucG9wcGVyID0gZ2V0Q2xpZW50UmVjdChkYXRhLm9mZnNldHMucG9wcGVyKTtcblxuICAvLyBjb21wdXRlIGNlbnRlciBvZiB0aGUgcG9wcGVyXG4gIHZhciBjZW50ZXIgPSByZWZlcmVuY2Vbc2lkZV0gKyByZWZlcmVuY2VbbGVuXSAvIDIgLSBhcnJvd0VsZW1lbnRTaXplIC8gMjtcblxuICAvLyBDb21wdXRlIHRoZSBzaWRlVmFsdWUgdXNpbmcgdGhlIHVwZGF0ZWQgcG9wcGVyIG9mZnNldHNcbiAgLy8gdGFrZSBwb3BwZXIgbWFyZ2luIGluIGFjY291bnQgYmVjYXVzZSB3ZSBkb24ndCBoYXZlIHRoaXMgaW5mbyBhdmFpbGFibGVcbiAgdmFyIGNzcyA9IGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShkYXRhLmluc3RhbmNlLnBvcHBlcik7XG4gIHZhciBwb3BwZXJNYXJnaW5TaWRlID0gcGFyc2VGbG9hdChjc3NbJ21hcmdpbicgKyBzaWRlQ2FwaXRhbGl6ZWRdLCAxMCk7XG4gIHZhciBwb3BwZXJCb3JkZXJTaWRlID0gcGFyc2VGbG9hdChjc3NbJ2JvcmRlcicgKyBzaWRlQ2FwaXRhbGl6ZWQgKyAnV2lkdGgnXSwgMTApO1xuICB2YXIgc2lkZVZhbHVlID0gY2VudGVyIC0gZGF0YS5vZmZzZXRzLnBvcHBlcltzaWRlXSAtIHBvcHBlck1hcmdpblNpZGUgLSBwb3BwZXJCb3JkZXJTaWRlO1xuXG4gIC8vIHByZXZlbnQgYXJyb3dFbGVtZW50IGZyb20gYmVpbmcgcGxhY2VkIG5vdCBjb250aWd1b3VzbHkgdG8gaXRzIHBvcHBlclxuICBzaWRlVmFsdWUgPSBNYXRoLm1heChNYXRoLm1pbihwb3BwZXJbbGVuXSAtIGFycm93RWxlbWVudFNpemUsIHNpZGVWYWx1ZSksIDApO1xuXG4gIGRhdGEuYXJyb3dFbGVtZW50ID0gYXJyb3dFbGVtZW50O1xuICBkYXRhLm9mZnNldHMuYXJyb3cgPSAoX2RhdGEkb2Zmc2V0cyRhcnJvdyA9IHt9LCBkZWZpbmVQcm9wZXJ0eShfZGF0YSRvZmZzZXRzJGFycm93LCBzaWRlLCBNYXRoLnJvdW5kKHNpZGVWYWx1ZSkpLCBkZWZpbmVQcm9wZXJ0eShfZGF0YSRvZmZzZXRzJGFycm93LCBhbHRTaWRlLCAnJyksIF9kYXRhJG9mZnNldHMkYXJyb3cpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIEdldCB0aGUgb3Bwb3NpdGUgcGxhY2VtZW50IHZhcmlhdGlvbiBvZiB0aGUgZ2l2ZW4gb25lXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge1N0cmluZ30gcGxhY2VtZW50IHZhcmlhdGlvblxuICogQHJldHVybnMge1N0cmluZ30gZmxpcHBlZCBwbGFjZW1lbnQgdmFyaWF0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldE9wcG9zaXRlVmFyaWF0aW9uKHZhcmlhdGlvbikge1xuICBpZiAodmFyaWF0aW9uID09PSAnZW5kJykge1xuICAgIHJldHVybiAnc3RhcnQnO1xuICB9IGVsc2UgaWYgKHZhcmlhdGlvbiA9PT0gJ3N0YXJ0Jykge1xuICAgIHJldHVybiAnZW5kJztcbiAgfVxuICByZXR1cm4gdmFyaWF0aW9uO1xufVxuXG4vKipcbiAqIExpc3Qgb2YgYWNjZXB0ZWQgcGxhY2VtZW50cyB0byB1c2UgYXMgdmFsdWVzIG9mIHRoZSBgcGxhY2VtZW50YCBvcHRpb24uPGJyIC8+XG4gKiBWYWxpZCBwbGFjZW1lbnRzIGFyZTpcbiAqIC0gYGF1dG9gXG4gKiAtIGB0b3BgXG4gKiAtIGByaWdodGBcbiAqIC0gYGJvdHRvbWBcbiAqIC0gYGxlZnRgXG4gKlxuICogRWFjaCBwbGFjZW1lbnQgY2FuIGhhdmUgYSB2YXJpYXRpb24gZnJvbSB0aGlzIGxpc3Q6XG4gKiAtIGAtc3RhcnRgXG4gKiAtIGAtZW5kYFxuICpcbiAqIFZhcmlhdGlvbnMgYXJlIGludGVycHJldGVkIGVhc2lseSBpZiB5b3UgdGhpbmsgb2YgdGhlbSBhcyB0aGUgbGVmdCB0byByaWdodFxuICogd3JpdHRlbiBsYW5ndWFnZXMuIEhvcml6b250YWxseSAoYHRvcGAgYW5kIGBib3R0b21gKSwgYHN0YXJ0YCBpcyBsZWZ0IGFuZCBgZW5kYFxuICogaXMgcmlnaHQuPGJyIC8+XG4gKiBWZXJ0aWNhbGx5IChgbGVmdGAgYW5kIGByaWdodGApLCBgc3RhcnRgIGlzIHRvcCBhbmQgYGVuZGAgaXMgYm90dG9tLlxuICpcbiAqIFNvbWUgdmFsaWQgZXhhbXBsZXMgYXJlOlxuICogLSBgdG9wLWVuZGAgKG9uIHRvcCBvZiByZWZlcmVuY2UsIHJpZ2h0IGFsaWduZWQpXG4gKiAtIGByaWdodC1zdGFydGAgKG9uIHJpZ2h0IG9mIHJlZmVyZW5jZSwgdG9wIGFsaWduZWQpXG4gKiAtIGBib3R0b21gIChvbiBib3R0b20sIGNlbnRlcmVkKVxuICogLSBgYXV0by1lbmRgIChvbiB0aGUgc2lkZSB3aXRoIG1vcmUgc3BhY2UgYXZhaWxhYmxlLCBhbGlnbm1lbnQgZGVwZW5kcyBieSBwbGFjZW1lbnQpXG4gKlxuICogQHN0YXRpY1xuICogQHR5cGUge0FycmF5fVxuICogQGVudW0ge1N0cmluZ31cbiAqIEByZWFkb25seVxuICogQG1ldGhvZCBwbGFjZW1lbnRzXG4gKiBAbWVtYmVyb2YgUG9wcGVyXG4gKi9cbnZhciBwbGFjZW1lbnRzID0gWydhdXRvLXN0YXJ0JywgJ2F1dG8nLCAnYXV0by1lbmQnLCAndG9wLXN0YXJ0JywgJ3RvcCcsICd0b3AtZW5kJywgJ3JpZ2h0LXN0YXJ0JywgJ3JpZ2h0JywgJ3JpZ2h0LWVuZCcsICdib3R0b20tZW5kJywgJ2JvdHRvbScsICdib3R0b20tc3RhcnQnLCAnbGVmdC1lbmQnLCAnbGVmdCcsICdsZWZ0LXN0YXJ0J107XG5cbi8vIEdldCByaWQgb2YgYGF1dG9gIGBhdXRvLXN0YXJ0YCBhbmQgYGF1dG8tZW5kYFxudmFyIHZhbGlkUGxhY2VtZW50cyA9IHBsYWNlbWVudHMuc2xpY2UoMyk7XG5cbi8qKlxuICogR2l2ZW4gYW4gaW5pdGlhbCBwbGFjZW1lbnQsIHJldHVybnMgYWxsIHRoZSBzdWJzZXF1ZW50IHBsYWNlbWVudHNcbiAqIGNsb2Nrd2lzZSAob3IgY291bnRlci1jbG9ja3dpc2UpLlxuICpcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBwbGFjZW1lbnQgLSBBIHZhbGlkIHBsYWNlbWVudCAoaXQgYWNjZXB0cyB2YXJpYXRpb25zKVxuICogQGFyZ3VtZW50IHtCb29sZWFufSBjb3VudGVyIC0gU2V0IHRvIHRydWUgdG8gd2FsayB0aGUgcGxhY2VtZW50cyBjb3VudGVyY2xvY2t3aXNlXG4gKiBAcmV0dXJucyB7QXJyYXl9IHBsYWNlbWVudHMgaW5jbHVkaW5nIHRoZWlyIHZhcmlhdGlvbnNcbiAqL1xuZnVuY3Rpb24gY2xvY2t3aXNlKHBsYWNlbWVudCkge1xuICB2YXIgY291bnRlciA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgdmFyIGluZGV4ID0gdmFsaWRQbGFjZW1lbnRzLmluZGV4T2YocGxhY2VtZW50KTtcbiAgdmFyIGFyciA9IHZhbGlkUGxhY2VtZW50cy5zbGljZShpbmRleCArIDEpLmNvbmNhdCh2YWxpZFBsYWNlbWVudHMuc2xpY2UoMCwgaW5kZXgpKTtcbiAgcmV0dXJuIGNvdW50ZXIgPyBhcnIucmV2ZXJzZSgpIDogYXJyO1xufVxuXG52YXIgQkVIQVZJT1JTID0ge1xuICBGTElQOiAnZmxpcCcsXG4gIENMT0NLV0lTRTogJ2Nsb2Nrd2lzZScsXG4gIENPVU5URVJDTE9DS1dJU0U6ICdjb3VudGVyY2xvY2t3aXNlJ1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSB1cGRhdGUgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGZsaXAoZGF0YSwgb3B0aW9ucykge1xuICAvLyBpZiBgaW5uZXJgIG1vZGlmaWVyIGlzIGVuYWJsZWQsIHdlIGNhbid0IHVzZSB0aGUgYGZsaXBgIG1vZGlmaWVyXG4gIGlmIChpc01vZGlmaWVyRW5hYmxlZChkYXRhLmluc3RhbmNlLm1vZGlmaWVycywgJ2lubmVyJykpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGlmIChkYXRhLmZsaXBwZWQgJiYgZGF0YS5wbGFjZW1lbnQgPT09IGRhdGEub3JpZ2luYWxQbGFjZW1lbnQpIHtcbiAgICAvLyBzZWVtcyBsaWtlIGZsaXAgaXMgdHJ5aW5nIHRvIGxvb3AsIHByb2JhYmx5IHRoZXJlJ3Mgbm90IGVub3VnaCBzcGFjZSBvbiBhbnkgb2YgdGhlIGZsaXBwYWJsZSBzaWRlc1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgdmFyIGJvdW5kYXJpZXMgPSBnZXRCb3VuZGFyaWVzKGRhdGEuaW5zdGFuY2UucG9wcGVyLCBkYXRhLmluc3RhbmNlLnJlZmVyZW5jZSwgb3B0aW9ucy5wYWRkaW5nLCBvcHRpb25zLmJvdW5kYXJpZXNFbGVtZW50LCBkYXRhLnBvc2l0aW9uRml4ZWQpO1xuXG4gIHZhciBwbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuICB2YXIgcGxhY2VtZW50T3Bwb3NpdGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuICB2YXIgdmFyaWF0aW9uID0gZGF0YS5wbGFjZW1lbnQuc3BsaXQoJy0nKVsxXSB8fCAnJztcblxuICB2YXIgZmxpcE9yZGVyID0gW107XG5cbiAgc3dpdGNoIChvcHRpb25zLmJlaGF2aW9yKSB7XG4gICAgY2FzZSBCRUhBVklPUlMuRkxJUDpcbiAgICAgIGZsaXBPcmRlciA9IFtwbGFjZW1lbnQsIHBsYWNlbWVudE9wcG9zaXRlXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQkVIQVZJT1JTLkNMT0NLV0lTRTpcbiAgICAgIGZsaXBPcmRlciA9IGNsb2Nrd2lzZShwbGFjZW1lbnQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBCRUhBVklPUlMuQ09VTlRFUkNMT0NLV0lTRTpcbiAgICAgIGZsaXBPcmRlciA9IGNsb2Nrd2lzZShwbGFjZW1lbnQsIHRydWUpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGZsaXBPcmRlciA9IG9wdGlvbnMuYmVoYXZpb3I7XG4gIH1cblxuICBmbGlwT3JkZXIuZm9yRWFjaChmdW5jdGlvbiAoc3RlcCwgaW5kZXgpIHtcbiAgICBpZiAocGxhY2VtZW50ICE9PSBzdGVwIHx8IGZsaXBPcmRlci5sZW5ndGggPT09IGluZGV4ICsgMSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbiAgICBwbGFjZW1lbnRPcHBvc2l0ZSA9IGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCk7XG5cbiAgICB2YXIgcG9wcGVyT2Zmc2V0cyA9IGRhdGEub2Zmc2V0cy5wb3BwZXI7XG4gICAgdmFyIHJlZk9mZnNldHMgPSBkYXRhLm9mZnNldHMucmVmZXJlbmNlO1xuXG4gICAgLy8gdXNpbmcgZmxvb3IgYmVjYXVzZSB0aGUgcmVmZXJlbmNlIG9mZnNldHMgbWF5IGNvbnRhaW4gZGVjaW1hbHMgd2UgYXJlIG5vdCBnb2luZyB0byBjb25zaWRlciBoZXJlXG4gICAgdmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbiAgICB2YXIgb3ZlcmxhcHNSZWYgPSBwbGFjZW1lbnQgPT09ICdsZWZ0JyAmJiBmbG9vcihwb3BwZXJPZmZzZXRzLnJpZ2h0KSA+IGZsb29yKHJlZk9mZnNldHMubGVmdCkgfHwgcGxhY2VtZW50ID09PSAncmlnaHQnICYmIGZsb29yKHBvcHBlck9mZnNldHMubGVmdCkgPCBmbG9vcihyZWZPZmZzZXRzLnJpZ2h0KSB8fCBwbGFjZW1lbnQgPT09ICd0b3AnICYmIGZsb29yKHBvcHBlck9mZnNldHMuYm90dG9tKSA+IGZsb29yKHJlZk9mZnNldHMudG9wKSB8fCBwbGFjZW1lbnQgPT09ICdib3R0b20nICYmIGZsb29yKHBvcHBlck9mZnNldHMudG9wKSA8IGZsb29yKHJlZk9mZnNldHMuYm90dG9tKTtcblxuICAgIHZhciBvdmVyZmxvd3NMZWZ0ID0gZmxvb3IocG9wcGVyT2Zmc2V0cy5sZWZ0KSA8IGZsb29yKGJvdW5kYXJpZXMubGVmdCk7XG4gICAgdmFyIG92ZXJmbG93c1JpZ2h0ID0gZmxvb3IocG9wcGVyT2Zmc2V0cy5yaWdodCkgPiBmbG9vcihib3VuZGFyaWVzLnJpZ2h0KTtcbiAgICB2YXIgb3ZlcmZsb3dzVG9wID0gZmxvb3IocG9wcGVyT2Zmc2V0cy50b3ApIDwgZmxvb3IoYm91bmRhcmllcy50b3ApO1xuICAgIHZhciBvdmVyZmxvd3NCb3R0b20gPSBmbG9vcihwb3BwZXJPZmZzZXRzLmJvdHRvbSkgPiBmbG9vcihib3VuZGFyaWVzLmJvdHRvbSk7XG5cbiAgICB2YXIgb3ZlcmZsb3dzQm91bmRhcmllcyA9IHBsYWNlbWVudCA9PT0gJ2xlZnQnICYmIG92ZXJmbG93c0xlZnQgfHwgcGxhY2VtZW50ID09PSAncmlnaHQnICYmIG92ZXJmbG93c1JpZ2h0IHx8IHBsYWNlbWVudCA9PT0gJ3RvcCcgJiYgb3ZlcmZsb3dzVG9wIHx8IHBsYWNlbWVudCA9PT0gJ2JvdHRvbScgJiYgb3ZlcmZsb3dzQm90dG9tO1xuXG4gICAgLy8gZmxpcCB0aGUgdmFyaWF0aW9uIGlmIHJlcXVpcmVkXG4gICAgdmFyIGlzVmVydGljYWwgPSBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xO1xuXG4gICAgLy8gZmxpcHMgdmFyaWF0aW9uIGlmIHJlZmVyZW5jZSBlbGVtZW50IG92ZXJmbG93cyBib3VuZGFyaWVzXG4gICAgdmFyIGZsaXBwZWRWYXJpYXRpb25CeVJlZiA9ICEhb3B0aW9ucy5mbGlwVmFyaWF0aW9ucyAmJiAoaXNWZXJ0aWNhbCAmJiB2YXJpYXRpb24gPT09ICdzdGFydCcgJiYgb3ZlcmZsb3dzTGVmdCB8fCBpc1ZlcnRpY2FsICYmIHZhcmlhdGlvbiA9PT0gJ2VuZCcgJiYgb3ZlcmZsb3dzUmlnaHQgfHwgIWlzVmVydGljYWwgJiYgdmFyaWF0aW9uID09PSAnc3RhcnQnICYmIG92ZXJmbG93c1RvcCB8fCAhaXNWZXJ0aWNhbCAmJiB2YXJpYXRpb24gPT09ICdlbmQnICYmIG92ZXJmbG93c0JvdHRvbSk7XG5cbiAgICAvLyBmbGlwcyB2YXJpYXRpb24gaWYgcG9wcGVyIGNvbnRlbnQgb3ZlcmZsb3dzIGJvdW5kYXJpZXNcbiAgICB2YXIgZmxpcHBlZFZhcmlhdGlvbkJ5Q29udGVudCA9ICEhb3B0aW9ucy5mbGlwVmFyaWF0aW9uc0J5Q29udGVudCAmJiAoaXNWZXJ0aWNhbCAmJiB2YXJpYXRpb24gPT09ICdzdGFydCcgJiYgb3ZlcmZsb3dzUmlnaHQgfHwgaXNWZXJ0aWNhbCAmJiB2YXJpYXRpb24gPT09ICdlbmQnICYmIG92ZXJmbG93c0xlZnQgfHwgIWlzVmVydGljYWwgJiYgdmFyaWF0aW9uID09PSAnc3RhcnQnICYmIG92ZXJmbG93c0JvdHRvbSB8fCAhaXNWZXJ0aWNhbCAmJiB2YXJpYXRpb24gPT09ICdlbmQnICYmIG92ZXJmbG93c1RvcCk7XG5cbiAgICB2YXIgZmxpcHBlZFZhcmlhdGlvbiA9IGZsaXBwZWRWYXJpYXRpb25CeVJlZiB8fCBmbGlwcGVkVmFyaWF0aW9uQnlDb250ZW50O1xuXG4gICAgaWYgKG92ZXJsYXBzUmVmIHx8IG92ZXJmbG93c0JvdW5kYXJpZXMgfHwgZmxpcHBlZFZhcmlhdGlvbikge1xuICAgICAgLy8gdGhpcyBib29sZWFuIHRvIGRldGVjdCBhbnkgZmxpcCBsb29wXG4gICAgICBkYXRhLmZsaXBwZWQgPSB0cnVlO1xuXG4gICAgICBpZiAob3ZlcmxhcHNSZWYgfHwgb3ZlcmZsb3dzQm91bmRhcmllcykge1xuICAgICAgICBwbGFjZW1lbnQgPSBmbGlwT3JkZXJbaW5kZXggKyAxXTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZsaXBwZWRWYXJpYXRpb24pIHtcbiAgICAgICAgdmFyaWF0aW9uID0gZ2V0T3Bwb3NpdGVWYXJpYXRpb24odmFyaWF0aW9uKTtcbiAgICAgIH1cblxuICAgICAgZGF0YS5wbGFjZW1lbnQgPSBwbGFjZW1lbnQgKyAodmFyaWF0aW9uID8gJy0nICsgdmFyaWF0aW9uIDogJycpO1xuXG4gICAgICAvLyB0aGlzIG9iamVjdCBjb250YWlucyBgcG9zaXRpb25gLCB3ZSB3YW50IHRvIHByZXNlcnZlIGl0IGFsb25nIHdpdGhcbiAgICAgIC8vIGFueSBhZGRpdGlvbmFsIHByb3BlcnR5IHdlIG1heSBhZGQgaW4gdGhlIGZ1dHVyZVxuICAgICAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IF9leHRlbmRzKHt9LCBkYXRhLm9mZnNldHMucG9wcGVyLCBnZXRQb3BwZXJPZmZzZXRzKGRhdGEuaW5zdGFuY2UucG9wcGVyLCBkYXRhLm9mZnNldHMucmVmZXJlbmNlLCBkYXRhLnBsYWNlbWVudCkpO1xuXG4gICAgICBkYXRhID0gcnVuTW9kaWZpZXJzKGRhdGEuaW5zdGFuY2UubW9kaWZpZXJzLCBkYXRhLCAnZmxpcCcpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IHVwZGF0ZSBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24ga2VlcFRvZ2V0aGVyKGRhdGEpIHtcbiAgdmFyIF9kYXRhJG9mZnNldHMgPSBkYXRhLm9mZnNldHMsXG4gICAgICBwb3BwZXIgPSBfZGF0YSRvZmZzZXRzLnBvcHBlcixcbiAgICAgIHJlZmVyZW5jZSA9IF9kYXRhJG9mZnNldHMucmVmZXJlbmNlO1xuXG4gIHZhciBwbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuICB2YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuICB2YXIgaXNWZXJ0aWNhbCA9IFsndG9wJywgJ2JvdHRvbSddLmluZGV4T2YocGxhY2VtZW50KSAhPT0gLTE7XG4gIHZhciBzaWRlID0gaXNWZXJ0aWNhbCA/ICdyaWdodCcgOiAnYm90dG9tJztcbiAgdmFyIG9wU2lkZSA9IGlzVmVydGljYWwgPyAnbGVmdCcgOiAndG9wJztcbiAgdmFyIG1lYXN1cmVtZW50ID0gaXNWZXJ0aWNhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcblxuICBpZiAocG9wcGVyW3NpZGVdIDwgZmxvb3IocmVmZXJlbmNlW29wU2lkZV0pKSB7XG4gICAgZGF0YS5vZmZzZXRzLnBvcHBlcltvcFNpZGVdID0gZmxvb3IocmVmZXJlbmNlW29wU2lkZV0pIC0gcG9wcGVyW21lYXN1cmVtZW50XTtcbiAgfVxuICBpZiAocG9wcGVyW29wU2lkZV0gPiBmbG9vcihyZWZlcmVuY2Vbc2lkZV0pKSB7XG4gICAgZGF0YS5vZmZzZXRzLnBvcHBlcltvcFNpZGVdID0gZmxvb3IocmVmZXJlbmNlW3NpZGVdKTtcbiAgfVxuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgc3RyaW5nIGNvbnRhaW5pbmcgdmFsdWUgKyB1bml0IGludG8gYSBweCB2YWx1ZSBudW1iZXJcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIHttb2RpZmllcnN+b2Zmc2V0fVxuICogQHByaXZhdGVcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBzdHIgLSBWYWx1ZSArIHVuaXQgc3RyaW5nXG4gKiBAYXJndW1lbnQge1N0cmluZ30gbWVhc3VyZW1lbnQgLSBgaGVpZ2h0YCBvciBgd2lkdGhgXG4gKiBAYXJndW1lbnQge09iamVjdH0gcG9wcGVyT2Zmc2V0c1xuICogQGFyZ3VtZW50IHtPYmplY3R9IHJlZmVyZW5jZU9mZnNldHNcbiAqIEByZXR1cm5zIHtOdW1iZXJ8U3RyaW5nfVxuICogVmFsdWUgaW4gcGl4ZWxzLCBvciBvcmlnaW5hbCBzdHJpbmcgaWYgbm8gdmFsdWVzIHdlcmUgZXh0cmFjdGVkXG4gKi9cbmZ1bmN0aW9uIHRvVmFsdWUoc3RyLCBtZWFzdXJlbWVudCwgcG9wcGVyT2Zmc2V0cywgcmVmZXJlbmNlT2Zmc2V0cykge1xuICAvLyBzZXBhcmF0ZSB2YWx1ZSBmcm9tIHVuaXRcbiAgdmFyIHNwbGl0ID0gc3RyLm1hdGNoKC8oKD86XFwtfFxcKyk/XFxkKlxcLj9cXGQqKSguKikvKTtcbiAgdmFyIHZhbHVlID0gK3NwbGl0WzFdO1xuICB2YXIgdW5pdCA9IHNwbGl0WzJdO1xuXG4gIC8vIElmIGl0J3Mgbm90IGEgbnVtYmVyIGl0J3MgYW4gb3BlcmF0b3IsIEkgZ3Vlc3NcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICBpZiAodW5pdC5pbmRleE9mKCclJykgPT09IDApIHtcbiAgICB2YXIgZWxlbWVudCA9IHZvaWQgMDtcbiAgICBzd2l0Y2ggKHVuaXQpIHtcbiAgICAgIGNhc2UgJyVwJzpcbiAgICAgICAgZWxlbWVudCA9IHBvcHBlck9mZnNldHM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnJSc6XG4gICAgICBjYXNlICclcic6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBlbGVtZW50ID0gcmVmZXJlbmNlT2Zmc2V0cztcbiAgICB9XG5cbiAgICB2YXIgcmVjdCA9IGdldENsaWVudFJlY3QoZWxlbWVudCk7XG4gICAgcmV0dXJuIHJlY3RbbWVhc3VyZW1lbnRdIC8gMTAwICogdmFsdWU7XG4gIH0gZWxzZSBpZiAodW5pdCA9PT0gJ3ZoJyB8fCB1bml0ID09PSAndncnKSB7XG4gICAgLy8gaWYgaXMgYSB2aCBvciB2dywgd2UgY2FsY3VsYXRlIHRoZSBzaXplIGJhc2VkIG9uIHRoZSB2aWV3cG9ydFxuICAgIHZhciBzaXplID0gdm9pZCAwO1xuICAgIGlmICh1bml0ID09PSAndmgnKSB7XG4gICAgICBzaXplID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0IHx8IDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaXplID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcbiAgICB9XG4gICAgcmV0dXJuIHNpemUgLyAxMDAgKiB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICAvLyBpZiBpcyBhbiBleHBsaWNpdCBwaXhlbCB1bml0LCB3ZSBnZXQgcmlkIG9mIHRoZSB1bml0IGFuZCBrZWVwIHRoZSB2YWx1ZVxuICAgIC8vIGlmIGlzIGFuIGltcGxpY2l0IHVuaXQsIGl0J3MgcHgsIGFuZCB3ZSByZXR1cm4ganVzdCB0aGUgdmFsdWVcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cblxuLyoqXG4gKiBQYXJzZSBhbiBgb2Zmc2V0YCBzdHJpbmcgdG8gZXh0cmFwb2xhdGUgYHhgIGFuZCBgeWAgbnVtZXJpYyBvZmZzZXRzLlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2Yge21vZGlmaWVyc35vZmZzZXR9XG4gKiBAcHJpdmF0ZVxuICogQGFyZ3VtZW50IHtTdHJpbmd9IG9mZnNldFxuICogQGFyZ3VtZW50IHtPYmplY3R9IHBvcHBlck9mZnNldHNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSByZWZlcmVuY2VPZmZzZXRzXG4gKiBAYXJndW1lbnQge1N0cmluZ30gYmFzZVBsYWNlbWVudFxuICogQHJldHVybnMge0FycmF5fSBhIHR3byBjZWxscyBhcnJheSB3aXRoIHggYW5kIHkgb2Zmc2V0cyBpbiBudW1iZXJzXG4gKi9cbmZ1bmN0aW9uIHBhcnNlT2Zmc2V0KG9mZnNldCwgcG9wcGVyT2Zmc2V0cywgcmVmZXJlbmNlT2Zmc2V0cywgYmFzZVBsYWNlbWVudCkge1xuICB2YXIgb2Zmc2V0cyA9IFswLCAwXTtcblxuICAvLyBVc2UgaGVpZ2h0IGlmIHBsYWNlbWVudCBpcyBsZWZ0IG9yIHJpZ2h0IGFuZCBpbmRleCBpcyAwIG90aGVyd2lzZSB1c2Ugd2lkdGhcbiAgLy8gaW4gdGhpcyB3YXkgdGhlIGZpcnN0IG9mZnNldCB3aWxsIHVzZSBhbiBheGlzIGFuZCB0aGUgc2Vjb25kIG9uZVxuICAvLyB3aWxsIHVzZSB0aGUgb3RoZXIgb25lXG4gIHZhciB1c2VIZWlnaHQgPSBbJ3JpZ2h0JywgJ2xlZnQnXS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpICE9PSAtMTtcblxuICAvLyBTcGxpdCB0aGUgb2Zmc2V0IHN0cmluZyB0byBvYnRhaW4gYSBsaXN0IG9mIHZhbHVlcyBhbmQgb3BlcmFuZHNcbiAgLy8gVGhlIHJlZ2V4IGFkZHJlc3NlcyB2YWx1ZXMgd2l0aCB0aGUgcGx1cyBvciBtaW51cyBzaWduIGluIGZyb250ICgrMTAsIC0yMCwgZXRjKVxuICB2YXIgZnJhZ21lbnRzID0gb2Zmc2V0LnNwbGl0KC8oXFwrfFxcLSkvKS5tYXAoZnVuY3Rpb24gKGZyYWcpIHtcbiAgICByZXR1cm4gZnJhZy50cmltKCk7XG4gIH0pO1xuXG4gIC8vIERldGVjdCBpZiB0aGUgb2Zmc2V0IHN0cmluZyBjb250YWlucyBhIHBhaXIgb2YgdmFsdWVzIG9yIGEgc2luZ2xlIG9uZVxuICAvLyB0aGV5IGNvdWxkIGJlIHNlcGFyYXRlZCBieSBjb21tYSBvciBzcGFjZVxuICB2YXIgZGl2aWRlciA9IGZyYWdtZW50cy5pbmRleE9mKGZpbmQoZnJhZ21lbnRzLCBmdW5jdGlvbiAoZnJhZykge1xuICAgIHJldHVybiBmcmFnLnNlYXJjaCgvLHxcXHMvKSAhPT0gLTE7XG4gIH0pKTtcblxuICBpZiAoZnJhZ21lbnRzW2RpdmlkZXJdICYmIGZyYWdtZW50c1tkaXZpZGVyXS5pbmRleE9mKCcsJykgPT09IC0xKSB7XG4gICAgY29uc29sZS53YXJuKCdPZmZzZXRzIHNlcGFyYXRlZCBieSB3aGl0ZSBzcGFjZShzKSBhcmUgZGVwcmVjYXRlZCwgdXNlIGEgY29tbWEgKCwpIGluc3RlYWQuJyk7XG4gIH1cblxuICAvLyBJZiBkaXZpZGVyIGlzIGZvdW5kLCB3ZSBkaXZpZGUgdGhlIGxpc3Qgb2YgdmFsdWVzIGFuZCBvcGVyYW5kcyB0byBkaXZpZGVcbiAgLy8gdGhlbSBieSBvZnNldCBYIGFuZCBZLlxuICB2YXIgc3BsaXRSZWdleCA9IC9cXHMqLFxccyp8XFxzKy87XG4gIHZhciBvcHMgPSBkaXZpZGVyICE9PSAtMSA/IFtmcmFnbWVudHMuc2xpY2UoMCwgZGl2aWRlcikuY29uY2F0KFtmcmFnbWVudHNbZGl2aWRlcl0uc3BsaXQoc3BsaXRSZWdleClbMF1dKSwgW2ZyYWdtZW50c1tkaXZpZGVyXS5zcGxpdChzcGxpdFJlZ2V4KVsxXV0uY29uY2F0KGZyYWdtZW50cy5zbGljZShkaXZpZGVyICsgMSkpXSA6IFtmcmFnbWVudHNdO1xuXG4gIC8vIENvbnZlcnQgdGhlIHZhbHVlcyB3aXRoIHVuaXRzIHRvIGFic29sdXRlIHBpeGVscyB0byBhbGxvdyBvdXIgY29tcHV0YXRpb25zXG4gIG9wcyA9IG9wcy5tYXAoZnVuY3Rpb24gKG9wLCBpbmRleCkge1xuICAgIC8vIE1vc3Qgb2YgdGhlIHVuaXRzIHJlbHkgb24gdGhlIG9yaWVudGF0aW9uIG9mIHRoZSBwb3BwZXJcbiAgICB2YXIgbWVhc3VyZW1lbnQgPSAoaW5kZXggPT09IDEgPyAhdXNlSGVpZ2h0IDogdXNlSGVpZ2h0KSA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgICB2YXIgbWVyZ2VXaXRoUHJldmlvdXMgPSBmYWxzZTtcbiAgICByZXR1cm4gb3BcbiAgICAvLyBUaGlzIGFnZ3JlZ2F0ZXMgYW55IGArYCBvciBgLWAgc2lnbiB0aGF0IGFyZW4ndCBjb25zaWRlcmVkIG9wZXJhdG9yc1xuICAgIC8vIGUuZy46IDEwICsgKzUgPT4gWzEwLCArLCArNV1cbiAgICAucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICBpZiAoYVthLmxlbmd0aCAtIDFdID09PSAnJyAmJiBbJysnLCAnLSddLmluZGV4T2YoYikgIT09IC0xKSB7XG4gICAgICAgIGFbYS5sZW5ndGggLSAxXSA9IGI7XG4gICAgICAgIG1lcmdlV2l0aFByZXZpb3VzID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgICB9IGVsc2UgaWYgKG1lcmdlV2l0aFByZXZpb3VzKSB7XG4gICAgICAgIGFbYS5sZW5ndGggLSAxXSArPSBiO1xuICAgICAgICBtZXJnZVdpdGhQcmV2aW91cyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gYTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAgICAgIH1cbiAgICB9LCBbXSlcbiAgICAvLyBIZXJlIHdlIGNvbnZlcnQgdGhlIHN0cmluZyB2YWx1ZXMgaW50byBudW1iZXIgdmFsdWVzIChpbiBweClcbiAgICAubWFwKGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgIHJldHVybiB0b1ZhbHVlKHN0ciwgbWVhc3VyZW1lbnQsIHBvcHBlck9mZnNldHMsIHJlZmVyZW5jZU9mZnNldHMpO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBMb29wIHRyb3VnaCB0aGUgb2Zmc2V0cyBhcnJheXMgYW5kIGV4ZWN1dGUgdGhlIG9wZXJhdGlvbnNcbiAgb3BzLmZvckVhY2goZnVuY3Rpb24gKG9wLCBpbmRleCkge1xuICAgIG9wLmZvckVhY2goZnVuY3Rpb24gKGZyYWcsIGluZGV4Mikge1xuICAgICAgaWYgKGlzTnVtZXJpYyhmcmFnKSkge1xuICAgICAgICBvZmZzZXRzW2luZGV4XSArPSBmcmFnICogKG9wW2luZGV4MiAtIDFdID09PSAnLScgPyAtMSA6IDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9mZnNldHM7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgdXBkYXRlIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQGFyZ3VtZW50IHtOdW1iZXJ8U3RyaW5nfSBvcHRpb25zLm9mZnNldD0wXG4gKiBUaGUgb2Zmc2V0IHZhbHVlIGFzIGRlc2NyaWJlZCBpbiB0aGUgbW9kaWZpZXIgZGVzY3JpcHRpb25cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24gb2Zmc2V0KGRhdGEsIF9yZWYpIHtcbiAgdmFyIG9mZnNldCA9IF9yZWYub2Zmc2V0O1xuICB2YXIgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQsXG4gICAgICBfZGF0YSRvZmZzZXRzID0gZGF0YS5vZmZzZXRzLFxuICAgICAgcG9wcGVyID0gX2RhdGEkb2Zmc2V0cy5wb3BwZXIsXG4gICAgICByZWZlcmVuY2UgPSBfZGF0YSRvZmZzZXRzLnJlZmVyZW5jZTtcblxuICB2YXIgYmFzZVBsYWNlbWVudCA9IHBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuXG4gIHZhciBvZmZzZXRzID0gdm9pZCAwO1xuICBpZiAoaXNOdW1lcmljKCtvZmZzZXQpKSB7XG4gICAgb2Zmc2V0cyA9IFsrb2Zmc2V0LCAwXTtcbiAgfSBlbHNlIHtcbiAgICBvZmZzZXRzID0gcGFyc2VPZmZzZXQob2Zmc2V0LCBwb3BwZXIsIHJlZmVyZW5jZSwgYmFzZVBsYWNlbWVudCk7XG4gIH1cblxuICBpZiAoYmFzZVBsYWNlbWVudCA9PT0gJ2xlZnQnKSB7XG4gICAgcG9wcGVyLnRvcCArPSBvZmZzZXRzWzBdO1xuICAgIHBvcHBlci5sZWZ0IC09IG9mZnNldHNbMV07XG4gIH0gZWxzZSBpZiAoYmFzZVBsYWNlbWVudCA9PT0gJ3JpZ2h0Jykge1xuICAgIHBvcHBlci50b3AgKz0gb2Zmc2V0c1swXTtcbiAgICBwb3BwZXIubGVmdCArPSBvZmZzZXRzWzFdO1xuICB9IGVsc2UgaWYgKGJhc2VQbGFjZW1lbnQgPT09ICd0b3AnKSB7XG4gICAgcG9wcGVyLmxlZnQgKz0gb2Zmc2V0c1swXTtcbiAgICBwb3BwZXIudG9wIC09IG9mZnNldHNbMV07XG4gIH0gZWxzZSBpZiAoYmFzZVBsYWNlbWVudCA9PT0gJ2JvdHRvbScpIHtcbiAgICBwb3BwZXIubGVmdCArPSBvZmZzZXRzWzBdO1xuICAgIHBvcHBlci50b3AgKz0gb2Zmc2V0c1sxXTtcbiAgfVxuXG4gIGRhdGEucG9wcGVyID0gcG9wcGVyO1xuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSBgdXBkYXRlYCBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24gcHJldmVudE92ZXJmbG93KGRhdGEsIG9wdGlvbnMpIHtcbiAgdmFyIGJvdW5kYXJpZXNFbGVtZW50ID0gb3B0aW9ucy5ib3VuZGFyaWVzRWxlbWVudCB8fCBnZXRPZmZzZXRQYXJlbnQoZGF0YS5pbnN0YW5jZS5wb3BwZXIpO1xuXG4gIC8vIElmIG9mZnNldFBhcmVudCBpcyB0aGUgcmVmZXJlbmNlIGVsZW1lbnQsIHdlIHJlYWxseSB3YW50IHRvXG4gIC8vIGdvIG9uZSBzdGVwIHVwIGFuZCB1c2UgdGhlIG5leHQgb2Zmc2V0UGFyZW50IGFzIHJlZmVyZW5jZSB0b1xuICAvLyBhdm9pZCB0byBtYWtlIHRoaXMgbW9kaWZpZXIgY29tcGxldGVseSB1c2VsZXNzIGFuZCBsb29rIGxpa2UgYnJva2VuXG4gIGlmIChkYXRhLmluc3RhbmNlLnJlZmVyZW5jZSA9PT0gYm91bmRhcmllc0VsZW1lbnQpIHtcbiAgICBib3VuZGFyaWVzRWxlbWVudCA9IGdldE9mZnNldFBhcmVudChib3VuZGFyaWVzRWxlbWVudCk7XG4gIH1cblxuICAvLyBOT1RFOiBET00gYWNjZXNzIGhlcmVcbiAgLy8gcmVzZXRzIHRoZSBwb3BwZXIncyBwb3NpdGlvbiBzbyB0aGF0IHRoZSBkb2N1bWVudCBzaXplIGNhbiBiZSBjYWxjdWxhdGVkIGV4Y2x1ZGluZ1xuICAvLyB0aGUgc2l6ZSBvZiB0aGUgcG9wcGVyIGVsZW1lbnQgaXRzZWxmXG4gIHZhciB0cmFuc2Zvcm1Qcm9wID0gZ2V0U3VwcG9ydGVkUHJvcGVydHlOYW1lKCd0cmFuc2Zvcm0nKTtcbiAgdmFyIHBvcHBlclN0eWxlcyA9IGRhdGEuaW5zdGFuY2UucG9wcGVyLnN0eWxlOyAvLyBhc3NpZ25tZW50IHRvIGhlbHAgbWluaWZpY2F0aW9uXG4gIHZhciB0b3AgPSBwb3BwZXJTdHlsZXMudG9wLFxuICAgICAgbGVmdCA9IHBvcHBlclN0eWxlcy5sZWZ0LFxuICAgICAgdHJhbnNmb3JtID0gcG9wcGVyU3R5bGVzW3RyYW5zZm9ybVByb3BdO1xuXG4gIHBvcHBlclN0eWxlcy50b3AgPSAnJztcbiAgcG9wcGVyU3R5bGVzLmxlZnQgPSAnJztcbiAgcG9wcGVyU3R5bGVzW3RyYW5zZm9ybVByb3BdID0gJyc7XG5cbiAgdmFyIGJvdW5kYXJpZXMgPSBnZXRCb3VuZGFyaWVzKGRhdGEuaW5zdGFuY2UucG9wcGVyLCBkYXRhLmluc3RhbmNlLnJlZmVyZW5jZSwgb3B0aW9ucy5wYWRkaW5nLCBib3VuZGFyaWVzRWxlbWVudCwgZGF0YS5wb3NpdGlvbkZpeGVkKTtcblxuICAvLyBOT1RFOiBET00gYWNjZXNzIGhlcmVcbiAgLy8gcmVzdG9yZXMgdGhlIG9yaWdpbmFsIHN0eWxlIHByb3BlcnRpZXMgYWZ0ZXIgdGhlIG9mZnNldHMgaGF2ZSBiZWVuIGNvbXB1dGVkXG4gIHBvcHBlclN0eWxlcy50b3AgPSB0b3A7XG4gIHBvcHBlclN0eWxlcy5sZWZ0ID0gbGVmdDtcbiAgcG9wcGVyU3R5bGVzW3RyYW5zZm9ybVByb3BdID0gdHJhbnNmb3JtO1xuXG4gIG9wdGlvbnMuYm91bmRhcmllcyA9IGJvdW5kYXJpZXM7XG5cbiAgdmFyIG9yZGVyID0gb3B0aW9ucy5wcmlvcml0eTtcbiAgdmFyIHBvcHBlciA9IGRhdGEub2Zmc2V0cy5wb3BwZXI7XG5cbiAgdmFyIGNoZWNrID0ge1xuICAgIHByaW1hcnk6IGZ1bmN0aW9uIHByaW1hcnkocGxhY2VtZW50KSB7XG4gICAgICB2YXIgdmFsdWUgPSBwb3BwZXJbcGxhY2VtZW50XTtcbiAgICAgIGlmIChwb3BwZXJbcGxhY2VtZW50XSA8IGJvdW5kYXJpZXNbcGxhY2VtZW50XSAmJiAhb3B0aW9ucy5lc2NhcGVXaXRoUmVmZXJlbmNlKSB7XG4gICAgICAgIHZhbHVlID0gTWF0aC5tYXgocG9wcGVyW3BsYWNlbWVudF0sIGJvdW5kYXJpZXNbcGxhY2VtZW50XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmaW5lUHJvcGVydHkoe30sIHBsYWNlbWVudCwgdmFsdWUpO1xuICAgIH0sXG4gICAgc2Vjb25kYXJ5OiBmdW5jdGlvbiBzZWNvbmRhcnkocGxhY2VtZW50KSB7XG4gICAgICB2YXIgbWFpblNpZGUgPSBwbGFjZW1lbnQgPT09ICdyaWdodCcgPyAnbGVmdCcgOiAndG9wJztcbiAgICAgIHZhciB2YWx1ZSA9IHBvcHBlclttYWluU2lkZV07XG4gICAgICBpZiAocG9wcGVyW3BsYWNlbWVudF0gPiBib3VuZGFyaWVzW3BsYWNlbWVudF0gJiYgIW9wdGlvbnMuZXNjYXBlV2l0aFJlZmVyZW5jZSkge1xuICAgICAgICB2YWx1ZSA9IE1hdGgubWluKHBvcHBlclttYWluU2lkZV0sIGJvdW5kYXJpZXNbcGxhY2VtZW50XSAtIChwbGFjZW1lbnQgPT09ICdyaWdodCcgPyBwb3BwZXIud2lkdGggOiBwb3BwZXIuaGVpZ2h0KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmaW5lUHJvcGVydHkoe30sIG1haW5TaWRlLCB2YWx1ZSk7XG4gICAgfVxuICB9O1xuXG4gIG9yZGVyLmZvckVhY2goZnVuY3Rpb24gKHBsYWNlbWVudCkge1xuICAgIHZhciBzaWRlID0gWydsZWZ0JywgJ3RvcCddLmluZGV4T2YocGxhY2VtZW50KSAhPT0gLTEgPyAncHJpbWFyeScgOiAnc2Vjb25kYXJ5JztcbiAgICBwb3BwZXIgPSBfZXh0ZW5kcyh7fSwgcG9wcGVyLCBjaGVja1tzaWRlXShwbGFjZW1lbnQpKTtcbiAgfSk7XG5cbiAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IHBvcHBlcjtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSBgdXBkYXRlYCBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24gc2hpZnQoZGF0YSkge1xuICB2YXIgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gcGxhY2VtZW50LnNwbGl0KCctJylbMF07XG4gIHZhciBzaGlmdHZhcmlhdGlvbiA9IHBsYWNlbWVudC5zcGxpdCgnLScpWzFdO1xuXG4gIC8vIGlmIHNoaWZ0IHNoaWZ0dmFyaWF0aW9uIGlzIHNwZWNpZmllZCwgcnVuIHRoZSBtb2RpZmllclxuICBpZiAoc2hpZnR2YXJpYXRpb24pIHtcbiAgICB2YXIgX2RhdGEkb2Zmc2V0cyA9IGRhdGEub2Zmc2V0cyxcbiAgICAgICAgcmVmZXJlbmNlID0gX2RhdGEkb2Zmc2V0cy5yZWZlcmVuY2UsXG4gICAgICAgIHBvcHBlciA9IF9kYXRhJG9mZnNldHMucG9wcGVyO1xuXG4gICAgdmFyIGlzVmVydGljYWwgPSBbJ2JvdHRvbScsICd0b3AnXS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpICE9PSAtMTtcbiAgICB2YXIgc2lkZSA9IGlzVmVydGljYWwgPyAnbGVmdCcgOiAndG9wJztcbiAgICB2YXIgbWVhc3VyZW1lbnQgPSBpc1ZlcnRpY2FsID8gJ3dpZHRoJyA6ICdoZWlnaHQnO1xuXG4gICAgdmFyIHNoaWZ0T2Zmc2V0cyA9IHtcbiAgICAgIHN0YXJ0OiBkZWZpbmVQcm9wZXJ0eSh7fSwgc2lkZSwgcmVmZXJlbmNlW3NpZGVdKSxcbiAgICAgIGVuZDogZGVmaW5lUHJvcGVydHkoe30sIHNpZGUsIHJlZmVyZW5jZVtzaWRlXSArIHJlZmVyZW5jZVttZWFzdXJlbWVudF0gLSBwb3BwZXJbbWVhc3VyZW1lbnRdKVxuICAgIH07XG5cbiAgICBkYXRhLm9mZnNldHMucG9wcGVyID0gX2V4dGVuZHMoe30sIHBvcHBlciwgc2hpZnRPZmZzZXRzW3NoaWZ0dmFyaWF0aW9uXSk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSB1cGRhdGUgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGhpZGUoZGF0YSkge1xuICBpZiAoIWlzTW9kaWZpZXJSZXF1aXJlZChkYXRhLmluc3RhbmNlLm1vZGlmaWVycywgJ2hpZGUnLCAncHJldmVudE92ZXJmbG93JykpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHZhciByZWZSZWN0ID0gZGF0YS5vZmZzZXRzLnJlZmVyZW5jZTtcbiAgdmFyIGJvdW5kID0gZmluZChkYXRhLmluc3RhbmNlLm1vZGlmaWVycywgZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgcmV0dXJuIG1vZGlmaWVyLm5hbWUgPT09ICdwcmV2ZW50T3ZlcmZsb3cnO1xuICB9KS5ib3VuZGFyaWVzO1xuXG4gIGlmIChyZWZSZWN0LmJvdHRvbSA8IGJvdW5kLnRvcCB8fCByZWZSZWN0LmxlZnQgPiBib3VuZC5yaWdodCB8fCByZWZSZWN0LnRvcCA+IGJvdW5kLmJvdHRvbSB8fCByZWZSZWN0LnJpZ2h0IDwgYm91bmQubGVmdCkge1xuICAgIC8vIEF2b2lkIHVubmVjZXNzYXJ5IERPTSBhY2Nlc3MgaWYgdmlzaWJpbGl0eSBoYXNuJ3QgY2hhbmdlZFxuICAgIGlmIChkYXRhLmhpZGUgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGRhdGEuaGlkZSA9IHRydWU7XG4gICAgZGF0YS5hdHRyaWJ1dGVzWyd4LW91dC1vZi1ib3VuZGFyaWVzJ10gPSAnJztcbiAgfSBlbHNlIHtcbiAgICAvLyBBdm9pZCB1bm5lY2Vzc2FyeSBET00gYWNjZXNzIGlmIHZpc2liaWxpdHkgaGFzbid0IGNoYW5nZWRcbiAgICBpZiAoZGF0YS5oaWRlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgZGF0YS5oaWRlID0gZmFsc2U7XG4gICAgZGF0YS5hdHRyaWJ1dGVzWyd4LW91dC1vZi1ib3VuZGFyaWVzJ10gPSBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBpbm5lcihkYXRhKSB7XG4gIHZhciBwbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudDtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbiAgdmFyIF9kYXRhJG9mZnNldHMgPSBkYXRhLm9mZnNldHMsXG4gICAgICBwb3BwZXIgPSBfZGF0YSRvZmZzZXRzLnBvcHBlcixcbiAgICAgIHJlZmVyZW5jZSA9IF9kYXRhJG9mZnNldHMucmVmZXJlbmNlO1xuXG4gIHZhciBpc0hvcml6ID0gWydsZWZ0JywgJ3JpZ2h0J10uaW5kZXhPZihiYXNlUGxhY2VtZW50KSAhPT0gLTE7XG5cbiAgdmFyIHN1YnRyYWN0TGVuZ3RoID0gWyd0b3AnLCAnbGVmdCddLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPT09IC0xO1xuXG4gIHBvcHBlcltpc0hvcml6ID8gJ2xlZnQnIDogJ3RvcCddID0gcmVmZXJlbmNlW2Jhc2VQbGFjZW1lbnRdIC0gKHN1YnRyYWN0TGVuZ3RoID8gcG9wcGVyW2lzSG9yaXogPyAnd2lkdGgnIDogJ2hlaWdodCddIDogMCk7XG5cbiAgZGF0YS5wbGFjZW1lbnQgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuICBkYXRhLm9mZnNldHMucG9wcGVyID0gZ2V0Q2xpZW50UmVjdChwb3BwZXIpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIE1vZGlmaWVyIGZ1bmN0aW9uLCBlYWNoIG1vZGlmaWVyIGNhbiBoYXZlIGEgZnVuY3Rpb24gb2YgdGhpcyB0eXBlIGFzc2lnbmVkXG4gKiB0byBpdHMgYGZuYCBwcm9wZXJ0eS48YnIgLz5cbiAqIFRoZXNlIGZ1bmN0aW9ucyB3aWxsIGJlIGNhbGxlZCBvbiBlYWNoIHVwZGF0ZSwgdGhpcyBtZWFucyB0aGF0IHlvdSBtdXN0XG4gKiBtYWtlIHN1cmUgdGhleSBhcmUgcGVyZm9ybWFudCBlbm91Z2ggdG8gYXZvaWQgcGVyZm9ybWFuY2UgYm90dGxlbmVja3MuXG4gKlxuICogQGZ1bmN0aW9uIE1vZGlmaWVyRm5cbiAqIEBhcmd1bWVudCB7ZGF0YU9iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgYHVwZGF0ZWAgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7ZGF0YU9iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5cbi8qKlxuICogTW9kaWZpZXJzIGFyZSBwbHVnaW5zIHVzZWQgdG8gYWx0ZXIgdGhlIGJlaGF2aW9yIG9mIHlvdXIgcG9wcGVycy48YnIgLz5cbiAqIFBvcHBlci5qcyB1c2VzIGEgc2V0IG9mIDkgbW9kaWZpZXJzIHRvIHByb3ZpZGUgYWxsIHRoZSBiYXNpYyBmdW5jdGlvbmFsaXRpZXNcbiAqIG5lZWRlZCBieSB0aGUgbGlicmFyeS5cbiAqXG4gKiBVc3VhbGx5IHlvdSBkb24ndCB3YW50IHRvIG92ZXJyaWRlIHRoZSBgb3JkZXJgLCBgZm5gIGFuZCBgb25Mb2FkYCBwcm9wcy5cbiAqIEFsbCB0aGUgb3RoZXIgcHJvcGVydGllcyBhcmUgY29uZmlndXJhdGlvbnMgdGhhdCBjb3VsZCBiZSB0d2Vha2VkLlxuICogQG5hbWVzcGFjZSBtb2RpZmllcnNcbiAqL1xudmFyIG1vZGlmaWVycyA9IHtcbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gc2hpZnQgdGhlIHBvcHBlciBvbiB0aGUgc3RhcnQgb3IgZW5kIG9mIGl0cyByZWZlcmVuY2VcbiAgICogZWxlbWVudC48YnIgLz5cbiAgICogSXQgd2lsbCByZWFkIHRoZSB2YXJpYXRpb24gb2YgdGhlIGBwbGFjZW1lbnRgIHByb3BlcnR5LjxiciAvPlxuICAgKiBJdCBjYW4gYmUgb25lIGVpdGhlciBgLWVuZGAgb3IgYC1zdGFydGAuXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBzaGlmdDoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj0xMDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDEwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IHNoaWZ0XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRoZSBgb2Zmc2V0YCBtb2RpZmllciBjYW4gc2hpZnQgeW91ciBwb3BwZXIgb24gYm90aCBpdHMgYXhpcy5cbiAgICpcbiAgICogSXQgYWNjZXB0cyB0aGUgZm9sbG93aW5nIHVuaXRzOlxuICAgKiAtIGBweGAgb3IgdW5pdC1sZXNzLCBpbnRlcnByZXRlZCBhcyBwaXhlbHNcbiAgICogLSBgJWAgb3IgYCVyYCwgcGVyY2VudGFnZSByZWxhdGl2ZSB0byB0aGUgbGVuZ3RoIG9mIHRoZSByZWZlcmVuY2UgZWxlbWVudFxuICAgKiAtIGAlcGAsIHBlcmNlbnRhZ2UgcmVsYXRpdmUgdG8gdGhlIGxlbmd0aCBvZiB0aGUgcG9wcGVyIGVsZW1lbnRcbiAgICogLSBgdndgLCBDU1Mgdmlld3BvcnQgd2lkdGggdW5pdFxuICAgKiAtIGB2aGAsIENTUyB2aWV3cG9ydCBoZWlnaHQgdW5pdFxuICAgKlxuICAgKiBGb3IgbGVuZ3RoIGlzIGludGVuZGVkIHRoZSBtYWluIGF4aXMgcmVsYXRpdmUgdG8gdGhlIHBsYWNlbWVudCBvZiB0aGUgcG9wcGVyLjxiciAvPlxuICAgKiBUaGlzIG1lYW5zIHRoYXQgaWYgdGhlIHBsYWNlbWVudCBpcyBgdG9wYCBvciBgYm90dG9tYCwgdGhlIGxlbmd0aCB3aWxsIGJlIHRoZVxuICAgKiBgd2lkdGhgLiBJbiBjYXNlIG9mIGBsZWZ0YCBvciBgcmlnaHRgLCBpdCB3aWxsIGJlIHRoZSBgaGVpZ2h0YC5cbiAgICpcbiAgICogWW91IGNhbiBwcm92aWRlIGEgc2luZ2xlIHZhbHVlIChhcyBgTnVtYmVyYCBvciBgU3RyaW5nYCksIG9yIGEgcGFpciBvZiB2YWx1ZXNcbiAgICogYXMgYFN0cmluZ2AgZGl2aWRlZCBieSBhIGNvbW1hIG9yIG9uZSAob3IgbW9yZSkgd2hpdGUgc3BhY2VzLjxiciAvPlxuICAgKiBUaGUgbGF0dGVyIGlzIGEgZGVwcmVjYXRlZCBtZXRob2QgYmVjYXVzZSBpdCBsZWFkcyB0byBjb25mdXNpb24gYW5kIHdpbGwgYmVcbiAgICogcmVtb3ZlZCBpbiB2Mi48YnIgLz5cbiAgICogQWRkaXRpb25hbGx5LCBpdCBhY2NlcHRzIGFkZGl0aW9ucyBhbmQgc3VidHJhY3Rpb25zIGJldHdlZW4gZGlmZmVyZW50IHVuaXRzLlxuICAgKiBOb3RlIHRoYXQgbXVsdGlwbGljYXRpb25zIGFuZCBkaXZpc2lvbnMgYXJlbid0IHN1cHBvcnRlZC5cbiAgICpcbiAgICogVmFsaWQgZXhhbXBsZXMgYXJlOlxuICAgKiBgYGBcbiAgICogMTBcbiAgICogJzEwJSdcbiAgICogJzEwLCAxMCdcbiAgICogJzEwJSwgMTAnXG4gICAqICcxMCArIDEwJSdcbiAgICogJzEwIC0gNXZoICsgMyUnXG4gICAqICctMTBweCArIDV2aCwgNXB4IC0gNiUnXG4gICAqIGBgYFxuICAgKiA+ICoqTkIqKjogSWYgeW91IGRlc2lyZSB0byBhcHBseSBvZmZzZXRzIHRvIHlvdXIgcG9wcGVycyBpbiBhIHdheSB0aGF0IG1heSBtYWtlIHRoZW0gb3ZlcmxhcFxuICAgKiA+IHdpdGggdGhlaXIgcmVmZXJlbmNlIGVsZW1lbnQsIHVuZm9ydHVuYXRlbHksIHlvdSB3aWxsIGhhdmUgdG8gZGlzYWJsZSB0aGUgYGZsaXBgIG1vZGlmaWVyLlxuICAgKiA+IFlvdSBjYW4gcmVhZCBtb3JlIG9uIHRoaXMgYXQgdGhpcyBbaXNzdWVdKGh0dHBzOi8vZ2l0aHViLmNvbS9GZXpWcmFzdGEvcG9wcGVyLmpzL2lzc3Vlcy8zNzMpLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgb2Zmc2V0OiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTIwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogMjAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogb2Zmc2V0LFxuICAgIC8qKiBAcHJvcCB7TnVtYmVyfFN0cmluZ30gb2Zmc2V0PTBcbiAgICAgKiBUaGUgb2Zmc2V0IHZhbHVlIGFzIGRlc2NyaWJlZCBpbiB0aGUgbW9kaWZpZXIgZGVzY3JpcHRpb25cbiAgICAgKi9cbiAgICBvZmZzZXQ6IDBcbiAgfSxcblxuICAvKipcbiAgICogTW9kaWZpZXIgdXNlZCB0byBwcmV2ZW50IHRoZSBwb3BwZXIgZnJvbSBiZWluZyBwb3NpdGlvbmVkIG91dHNpZGUgdGhlIGJvdW5kYXJ5LlxuICAgKlxuICAgKiBBIHNjZW5hcmlvIGV4aXN0cyB3aGVyZSB0aGUgcmVmZXJlbmNlIGl0c2VsZiBpcyBub3Qgd2l0aGluIHRoZSBib3VuZGFyaWVzLjxiciAvPlxuICAgKiBXZSBjYW4gc2F5IGl0IGhhcyBcImVzY2FwZWQgdGhlIGJvdW5kYXJpZXNcIiDigJQgb3IganVzdCBcImVzY2FwZWRcIi48YnIgLz5cbiAgICogSW4gdGhpcyBjYXNlIHdlIG5lZWQgdG8gZGVjaWRlIHdoZXRoZXIgdGhlIHBvcHBlciBzaG91bGQgZWl0aGVyOlxuICAgKlxuICAgKiAtIGRldGFjaCBmcm9tIHRoZSByZWZlcmVuY2UgYW5kIHJlbWFpbiBcInRyYXBwZWRcIiBpbiB0aGUgYm91bmRhcmllcywgb3JcbiAgICogLSBpZiBpdCBzaG91bGQgaWdub3JlIHRoZSBib3VuZGFyeSBhbmQgXCJlc2NhcGUgd2l0aCBpdHMgcmVmZXJlbmNlXCJcbiAgICpcbiAgICogV2hlbiBgZXNjYXBlV2l0aFJlZmVyZW5jZWAgaXMgc2V0IHRvYHRydWVgIGFuZCByZWZlcmVuY2UgaXMgY29tcGxldGVseVxuICAgKiBvdXRzaWRlIGl0cyBib3VuZGFyaWVzLCB0aGUgcG9wcGVyIHdpbGwgb3ZlcmZsb3cgKG9yIGNvbXBsZXRlbHkgbGVhdmUpXG4gICAqIHRoZSBib3VuZGFyaWVzIGluIG9yZGVyIHRvIHJlbWFpbiBhdHRhY2hlZCB0byB0aGUgZWRnZSBvZiB0aGUgcmVmZXJlbmNlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgcHJldmVudE92ZXJmbG93OiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTMwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogMzAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogcHJldmVudE92ZXJmbG93LFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtBcnJheX0gW3ByaW9yaXR5PVsnbGVmdCcsJ3JpZ2h0JywndG9wJywnYm90dG9tJ11dXG4gICAgICogUG9wcGVyIHdpbGwgdHJ5IHRvIHByZXZlbnQgb3ZlcmZsb3cgZm9sbG93aW5nIHRoZXNlIHByaW9yaXRpZXMgYnkgZGVmYXVsdCxcbiAgICAgKiB0aGVuLCBpdCBjb3VsZCBvdmVyZmxvdyBvbiB0aGUgbGVmdCBhbmQgb24gdG9wIG9mIHRoZSBgYm91bmRhcmllc0VsZW1lbnRgXG4gICAgICovXG4gICAgcHJpb3JpdHk6IFsnbGVmdCcsICdyaWdodCcsICd0b3AnLCAnYm90dG9tJ10sXG4gICAgLyoqXG4gICAgICogQHByb3Age251bWJlcn0gcGFkZGluZz01XG4gICAgICogQW1vdW50IG9mIHBpeGVsIHVzZWQgdG8gZGVmaW5lIGEgbWluaW11bSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBib3VuZGFyaWVzXG4gICAgICogYW5kIHRoZSBwb3BwZXIuIFRoaXMgbWFrZXMgc3VyZSB0aGUgcG9wcGVyIGFsd2F5cyBoYXMgYSBsaXR0bGUgcGFkZGluZ1xuICAgICAqIGJldHdlZW4gdGhlIGVkZ2VzIG9mIGl0cyBjb250YWluZXJcbiAgICAgKi9cbiAgICBwYWRkaW5nOiA1LFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtTdHJpbmd8SFRNTEVsZW1lbnR9IGJvdW5kYXJpZXNFbGVtZW50PSdzY3JvbGxQYXJlbnQnXG4gICAgICogQm91bmRhcmllcyB1c2VkIGJ5IHRoZSBtb2RpZmllci4gQ2FuIGJlIGBzY3JvbGxQYXJlbnRgLCBgd2luZG93YCxcbiAgICAgKiBgdmlld3BvcnRgIG9yIGFueSBET00gZWxlbWVudC5cbiAgICAgKi9cbiAgICBib3VuZGFyaWVzRWxlbWVudDogJ3Njcm9sbFBhcmVudCdcbiAgfSxcblxuICAvKipcbiAgICogTW9kaWZpZXIgdXNlZCB0byBtYWtlIHN1cmUgdGhlIHJlZmVyZW5jZSBhbmQgaXRzIHBvcHBlciBzdGF5IG5lYXIgZWFjaCBvdGhlclxuICAgKiB3aXRob3V0IGxlYXZpbmcgYW55IGdhcCBiZXR3ZWVuIHRoZSB0d28uIEVzcGVjaWFsbHkgdXNlZnVsIHdoZW4gdGhlIGFycm93IGlzXG4gICAqIGVuYWJsZWQgYW5kIHlvdSB3YW50IHRvIGVuc3VyZSB0aGF0IGl0IHBvaW50cyB0byBpdHMgcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAqIEl0IGNhcmVzIG9ubHkgYWJvdXQgdGhlIGZpcnN0IGF4aXMuIFlvdSBjYW4gc3RpbGwgaGF2ZSBwb3BwZXJzIHdpdGggbWFyZ2luXG4gICAqIGJldHdlZW4gdGhlIHBvcHBlciBhbmQgaXRzIHJlZmVyZW5jZSBlbGVtZW50LlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAga2VlcFRvZ2V0aGVyOiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTQwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogNDAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjoga2VlcFRvZ2V0aGVyXG4gIH0sXG5cbiAgLyoqXG4gICAqIFRoaXMgbW9kaWZpZXIgaXMgdXNlZCB0byBtb3ZlIHRoZSBgYXJyb3dFbGVtZW50YCBvZiB0aGUgcG9wcGVyIHRvIG1ha2VcbiAgICogc3VyZSBpdCBpcyBwb3NpdGlvbmVkIGJldHdlZW4gdGhlIHJlZmVyZW5jZSBlbGVtZW50IGFuZCBpdHMgcG9wcGVyIGVsZW1lbnQuXG4gICAqIEl0IHdpbGwgcmVhZCB0aGUgb3V0ZXIgc2l6ZSBvZiB0aGUgYGFycm93RWxlbWVudGAgbm9kZSB0byBkZXRlY3QgaG93IG1hbnlcbiAgICogcGl4ZWxzIG9mIGNvbmp1bmN0aW9uIGFyZSBuZWVkZWQuXG4gICAqXG4gICAqIEl0IGhhcyBubyBlZmZlY3QgaWYgbm8gYGFycm93RWxlbWVudGAgaXMgcHJvdmlkZWQuXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBhcnJvdzoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj01MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDUwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGFycm93LFxuICAgIC8qKiBAcHJvcCB7U3RyaW5nfEhUTUxFbGVtZW50fSBlbGVtZW50PSdbeC1hcnJvd10nIC0gU2VsZWN0b3Igb3Igbm9kZSB1c2VkIGFzIGFycm93ICovXG4gICAgZWxlbWVudDogJ1t4LWFycm93XSdcbiAgfSxcblxuICAvKipcbiAgICogTW9kaWZpZXIgdXNlZCB0byBmbGlwIHRoZSBwb3BwZXIncyBwbGFjZW1lbnQgd2hlbiBpdCBzdGFydHMgdG8gb3ZlcmxhcCBpdHNcbiAgICogcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAqXG4gICAqIFJlcXVpcmVzIHRoZSBgcHJldmVudE92ZXJmbG93YCBtb2RpZmllciBiZWZvcmUgaXQgaW4gb3JkZXIgdG8gd29yay5cbiAgICpcbiAgICogKipOT1RFOioqIHRoaXMgbW9kaWZpZXIgd2lsbCBpbnRlcnJ1cHQgdGhlIGN1cnJlbnQgdXBkYXRlIGN5Y2xlIGFuZCB3aWxsXG4gICAqIHJlc3RhcnQgaXQgaWYgaXQgZGV0ZWN0cyB0aGUgbmVlZCB0byBmbGlwIHRoZSBwbGFjZW1lbnQuXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBmbGlwOiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTYwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogNjAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogZmxpcCxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7U3RyaW5nfEFycmF5fSBiZWhhdmlvcj0nZmxpcCdcbiAgICAgKiBUaGUgYmVoYXZpb3IgdXNlZCB0byBjaGFuZ2UgdGhlIHBvcHBlcidzIHBsYWNlbWVudC4gSXQgY2FuIGJlIG9uZSBvZlxuICAgICAqIGBmbGlwYCwgYGNsb2Nrd2lzZWAsIGBjb3VudGVyY2xvY2t3aXNlYCBvciBhbiBhcnJheSB3aXRoIGEgbGlzdCBvZiB2YWxpZFxuICAgICAqIHBsYWNlbWVudHMgKHdpdGggb3B0aW9uYWwgdmFyaWF0aW9ucylcbiAgICAgKi9cbiAgICBiZWhhdmlvcjogJ2ZsaXAnLFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtudW1iZXJ9IHBhZGRpbmc9NVxuICAgICAqIFRoZSBwb3BwZXIgd2lsbCBmbGlwIGlmIGl0IGhpdHMgdGhlIGVkZ2VzIG9mIHRoZSBgYm91bmRhcmllc0VsZW1lbnRgXG4gICAgICovXG4gICAgcGFkZGluZzogNSxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7U3RyaW5nfEhUTUxFbGVtZW50fSBib3VuZGFyaWVzRWxlbWVudD0ndmlld3BvcnQnXG4gICAgICogVGhlIGVsZW1lbnQgd2hpY2ggd2lsbCBkZWZpbmUgdGhlIGJvdW5kYXJpZXMgb2YgdGhlIHBvcHBlciBwb3NpdGlvbi5cbiAgICAgKiBUaGUgcG9wcGVyIHdpbGwgbmV2ZXIgYmUgcGxhY2VkIG91dHNpZGUgb2YgdGhlIGRlZmluZWQgYm91bmRhcmllc1xuICAgICAqIChleGNlcHQgaWYgYGtlZXBUb2dldGhlcmAgaXMgZW5hYmxlZClcbiAgICAgKi9cbiAgICBib3VuZGFyaWVzRWxlbWVudDogJ3ZpZXdwb3J0JyxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7Qm9vbGVhbn0gZmxpcFZhcmlhdGlvbnM9ZmFsc2VcbiAgICAgKiBUaGUgcG9wcGVyIHdpbGwgc3dpdGNoIHBsYWNlbWVudCB2YXJpYXRpb24gYmV0d2VlbiBgLXN0YXJ0YCBhbmQgYC1lbmRgIHdoZW5cbiAgICAgKiB0aGUgcmVmZXJlbmNlIGVsZW1lbnQgb3ZlcmxhcHMgaXRzIGJvdW5kYXJpZXMuXG4gICAgICpcbiAgICAgKiBUaGUgb3JpZ2luYWwgcGxhY2VtZW50IHNob3VsZCBoYXZlIGEgc2V0IHZhcmlhdGlvbi5cbiAgICAgKi9cbiAgICBmbGlwVmFyaWF0aW9uczogZmFsc2UsXG4gICAgLyoqXG4gICAgICogQHByb3Age0Jvb2xlYW59IGZsaXBWYXJpYXRpb25zQnlDb250ZW50PWZhbHNlXG4gICAgICogVGhlIHBvcHBlciB3aWxsIHN3aXRjaCBwbGFjZW1lbnQgdmFyaWF0aW9uIGJldHdlZW4gYC1zdGFydGAgYW5kIGAtZW5kYCB3aGVuXG4gICAgICogdGhlIHBvcHBlciBlbGVtZW50IG92ZXJsYXBzIGl0cyByZWZlcmVuY2UgYm91bmRhcmllcy5cbiAgICAgKlxuICAgICAqIFRoZSBvcmlnaW5hbCBwbGFjZW1lbnQgc2hvdWxkIGhhdmUgYSBzZXQgdmFyaWF0aW9uLlxuICAgICAqL1xuICAgIGZsaXBWYXJpYXRpb25zQnlDb250ZW50OiBmYWxzZVxuICB9LFxuXG4gIC8qKlxuICAgKiBNb2RpZmllciB1c2VkIHRvIG1ha2UgdGhlIHBvcHBlciBmbG93IHRvd2FyZCB0aGUgaW5uZXIgb2YgdGhlIHJlZmVyZW5jZSBlbGVtZW50LlxuICAgKiBCeSBkZWZhdWx0LCB3aGVuIHRoaXMgbW9kaWZpZXIgaXMgZGlzYWJsZWQsIHRoZSBwb3BwZXIgd2lsbCBiZSBwbGFjZWQgb3V0c2lkZVxuICAgKiB0aGUgcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBpbm5lcjoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj03MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDcwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9ZmFsc2UgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogaW5uZXJcbiAgfSxcblxuICAvKipcbiAgICogTW9kaWZpZXIgdXNlZCB0byBoaWRlIHRoZSBwb3BwZXIgd2hlbiBpdHMgcmVmZXJlbmNlIGVsZW1lbnQgaXMgb3V0c2lkZSBvZiB0aGVcbiAgICogcG9wcGVyIGJvdW5kYXJpZXMuIEl0IHdpbGwgc2V0IGEgYHgtb3V0LW9mLWJvdW5kYXJpZXNgIGF0dHJpYnV0ZSB3aGljaCBjYW5cbiAgICogYmUgdXNlZCB0byBoaWRlIHdpdGggYSBDU1Mgc2VsZWN0b3IgdGhlIHBvcHBlciB3aGVuIGl0cyByZWZlcmVuY2UgaXNcbiAgICogb3V0IG9mIGJvdW5kYXJpZXMuXG4gICAqXG4gICAqIFJlcXVpcmVzIHRoZSBgcHJldmVudE92ZXJmbG93YCBtb2RpZmllciBiZWZvcmUgaXQgaW4gb3JkZXIgdG8gd29yay5cbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIGhpZGU6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9ODAwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiA4MDAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPXRydWUgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBoaWRlXG4gIH0sXG5cbiAgLyoqXG4gICAqIENvbXB1dGVzIHRoZSBzdHlsZSB0aGF0IHdpbGwgYmUgYXBwbGllZCB0byB0aGUgcG9wcGVyIGVsZW1lbnQgdG8gZ2V0c1xuICAgKiBwcm9wZXJseSBwb3NpdGlvbmVkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyBtb2RpZmllciB3aWxsIG5vdCB0b3VjaCB0aGUgRE9NLCBpdCBqdXN0IHByZXBhcmVzIHRoZSBzdHlsZXNcbiAgICogc28gdGhhdCBgYXBwbHlTdHlsZWAgbW9kaWZpZXIgY2FuIGFwcGx5IGl0LiBUaGlzIHNlcGFyYXRpb24gaXMgdXNlZnVsXG4gICAqIGluIGNhc2UgeW91IG5lZWQgdG8gcmVwbGFjZSBgYXBwbHlTdHlsZWAgd2l0aCBhIGN1c3RvbSBpbXBsZW1lbnRhdGlvbi5cbiAgICpcbiAgICogVGhpcyBtb2RpZmllciBoYXMgYDg1MGAgYXMgYG9yZGVyYCB2YWx1ZSB0byBtYWludGFpbiBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAqIHdpdGggcHJldmlvdXMgdmVyc2lvbnMgb2YgUG9wcGVyLmpzLiBFeHBlY3QgdGhlIG1vZGlmaWVycyBvcmRlcmluZyBtZXRob2RcbiAgICogdG8gY2hhbmdlIGluIGZ1dHVyZSBtYWpvciB2ZXJzaW9ucyBvZiB0aGUgbGlicmFyeS5cbiAgICpcbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIGNvbXB1dGVTdHlsZToge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj04NTAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDg1MCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGNvbXB1dGVTdHlsZSxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7Qm9vbGVhbn0gZ3B1QWNjZWxlcmF0aW9uPXRydWVcbiAgICAgKiBJZiB0cnVlLCBpdCB1c2VzIHRoZSBDU1MgM0QgdHJhbnNmb3JtYXRpb24gdG8gcG9zaXRpb24gdGhlIHBvcHBlci5cbiAgICAgKiBPdGhlcndpc2UsIGl0IHdpbGwgdXNlIHRoZSBgdG9wYCBhbmQgYGxlZnRgIHByb3BlcnRpZXNcbiAgICAgKi9cbiAgICBncHVBY2NlbGVyYXRpb246IHRydWUsXG4gICAgLyoqXG4gICAgICogQHByb3Age3N0cmluZ30gW3g9J2JvdHRvbSddXG4gICAgICogV2hlcmUgdG8gYW5jaG9yIHRoZSBYIGF4aXMgKGBib3R0b21gIG9yIGB0b3BgKS4gQUtBIFggb2Zmc2V0IG9yaWdpbi5cbiAgICAgKiBDaGFuZ2UgdGhpcyBpZiB5b3VyIHBvcHBlciBzaG91bGQgZ3JvdyBpbiBhIGRpcmVjdGlvbiBkaWZmZXJlbnQgZnJvbSBgYm90dG9tYFxuICAgICAqL1xuICAgIHg6ICdib3R0b20nLFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtzdHJpbmd9IFt4PSdsZWZ0J11cbiAgICAgKiBXaGVyZSB0byBhbmNob3IgdGhlIFkgYXhpcyAoYGxlZnRgIG9yIGByaWdodGApLiBBS0EgWSBvZmZzZXQgb3JpZ2luLlxuICAgICAqIENoYW5nZSB0aGlzIGlmIHlvdXIgcG9wcGVyIHNob3VsZCBncm93IGluIGEgZGlyZWN0aW9uIGRpZmZlcmVudCBmcm9tIGByaWdodGBcbiAgICAgKi9cbiAgICB5OiAncmlnaHQnXG4gIH0sXG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdGhlIGNvbXB1dGVkIHN0eWxlcyB0byB0aGUgcG9wcGVyIGVsZW1lbnQuXG4gICAqXG4gICAqIEFsbCB0aGUgRE9NIG1hbmlwdWxhdGlvbnMgYXJlIGxpbWl0ZWQgdG8gdGhpcyBtb2RpZmllci4gVGhpcyBpcyB1c2VmdWwgaW4gY2FzZVxuICAgKiB5b3Ugd2FudCB0byBpbnRlZ3JhdGUgUG9wcGVyLmpzIGluc2lkZSBhIGZyYW1ld29yayBvciB2aWV3IGxpYnJhcnkgYW5kIHlvdVxuICAgKiB3YW50IHRvIGRlbGVnYXRlIGFsbCB0aGUgRE9NIG1hbmlwdWxhdGlvbnMgdG8gaXQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBpZiB5b3UgZGlzYWJsZSB0aGlzIG1vZGlmaWVyLCB5b3UgbXVzdCBtYWtlIHN1cmUgdGhlIHBvcHBlciBlbGVtZW50XG4gICAqIGhhcyBpdHMgcG9zaXRpb24gc2V0IHRvIGBhYnNvbHV0ZWAgYmVmb3JlIFBvcHBlci5qcyBjYW4gZG8gaXRzIHdvcmshXG4gICAqXG4gICAqIEp1c3QgZGlzYWJsZSB0aGlzIG1vZGlmaWVyIGFuZCBkZWZpbmUgeW91ciBvd24gdG8gYWNoaWV2ZSB0aGUgZGVzaXJlZCBlZmZlY3QuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBhcHBseVN0eWxlOiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTkwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogOTAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogYXBwbHlTdHlsZSxcbiAgICAvKiogQHByb3Age0Z1bmN0aW9ufSAqL1xuICAgIG9uTG9hZDogYXBwbHlTdHlsZU9uTG9hZCxcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDEuMTAuMCwgdGhlIHByb3BlcnR5IG1vdmVkIHRvIGBjb21wdXRlU3R5bGVgIG1vZGlmaWVyXG4gICAgICogQHByb3Age0Jvb2xlYW59IGdwdUFjY2VsZXJhdGlvbj10cnVlXG4gICAgICogSWYgdHJ1ZSwgaXQgdXNlcyB0aGUgQ1NTIDNEIHRyYW5zZm9ybWF0aW9uIHRvIHBvc2l0aW9uIHRoZSBwb3BwZXIuXG4gICAgICogT3RoZXJ3aXNlLCBpdCB3aWxsIHVzZSB0aGUgYHRvcGAgYW5kIGBsZWZ0YCBwcm9wZXJ0aWVzXG4gICAgICovXG4gICAgZ3B1QWNjZWxlcmF0aW9uOiB1bmRlZmluZWRcbiAgfVxufTtcblxuLyoqXG4gKiBUaGUgYGRhdGFPYmplY3RgIGlzIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgaW5mb3JtYXRpb24gdXNlZCBieSBQb3BwZXIuanMuXG4gKiBUaGlzIG9iamVjdCBpcyBwYXNzZWQgdG8gbW9kaWZpZXJzIGFuZCB0byB0aGUgYG9uQ3JlYXRlYCBhbmQgYG9uVXBkYXRlYCBjYWxsYmFja3MuXG4gKiBAbmFtZSBkYXRhT2JqZWN0XG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5pbnN0YW5jZSBUaGUgUG9wcGVyLmpzIGluc3RhbmNlXG4gKiBAcHJvcGVydHkge1N0cmluZ30gZGF0YS5wbGFjZW1lbnQgUGxhY2VtZW50IGFwcGxpZWQgdG8gcG9wcGVyXG4gKiBAcHJvcGVydHkge1N0cmluZ30gZGF0YS5vcmlnaW5hbFBsYWNlbWVudCBQbGFjZW1lbnQgb3JpZ2luYWxseSBkZWZpbmVkIG9uIGluaXRcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGF0YS5mbGlwcGVkIFRydWUgaWYgcG9wcGVyIGhhcyBiZWVuIGZsaXBwZWQgYnkgZmxpcCBtb2RpZmllclxuICogQHByb3BlcnR5IHtCb29sZWFufSBkYXRhLmhpZGUgVHJ1ZSBpZiB0aGUgcmVmZXJlbmNlIGVsZW1lbnQgaXMgb3V0IG9mIGJvdW5kYXJpZXMsIHVzZWZ1bCB0byBrbm93IHdoZW4gdG8gaGlkZSB0aGUgcG9wcGVyXG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBkYXRhLmFycm93RWxlbWVudCBOb2RlIHVzZWQgYXMgYXJyb3cgYnkgYXJyb3cgbW9kaWZpZXJcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkYXRhLnN0eWxlcyBBbnkgQ1NTIHByb3BlcnR5IGRlZmluZWQgaGVyZSB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIHBvcHBlci4gSXQgZXhwZWN0cyB0aGUgSmF2YVNjcmlwdCBub21lbmNsYXR1cmUgKGVnLiBgbWFyZ2luQm90dG9tYClcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkYXRhLmFycm93U3R5bGVzIEFueSBDU1MgcHJvcGVydHkgZGVmaW5lZCBoZXJlIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgcG9wcGVyIGFycm93LiBJdCBleHBlY3RzIHRoZSBKYXZhU2NyaXB0IG5vbWVuY2xhdHVyZSAoZWcuIGBtYXJnaW5Cb3R0b21gKVxuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEuYm91bmRhcmllcyBPZmZzZXRzIG9mIHRoZSBwb3BwZXIgYm91bmRhcmllc1xuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEub2Zmc2V0cyBUaGUgbWVhc3VyZW1lbnRzIG9mIHBvcHBlciwgcmVmZXJlbmNlIGFuZCBhcnJvdyBlbGVtZW50c1xuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEub2Zmc2V0cy5wb3BwZXIgYHRvcGAsIGBsZWZ0YCwgYHdpZHRoYCwgYGhlaWdodGAgdmFsdWVzXG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSBgdG9wYCwgYGxlZnRgLCBgd2lkdGhgLCBgaGVpZ2h0YCB2YWx1ZXNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkYXRhLm9mZnNldHMuYXJyb3ddIGB0b3BgIGFuZCBgbGVmdGAgb2Zmc2V0cywgb25seSBvbmUgb2YgdGhlbSB3aWxsIGJlIGRpZmZlcmVudCBmcm9tIDBcbiAqL1xuXG4vKipcbiAqIERlZmF1bHQgb3B0aW9ucyBwcm92aWRlZCB0byBQb3BwZXIuanMgY29uc3RydWN0b3IuPGJyIC8+XG4gKiBUaGVzZSBjYW4gYmUgb3ZlcnJpZGRlbiB1c2luZyB0aGUgYG9wdGlvbnNgIGFyZ3VtZW50IG9mIFBvcHBlci5qcy48YnIgLz5cbiAqIFRvIG92ZXJyaWRlIGFuIG9wdGlvbiwgc2ltcGx5IHBhc3MgYW4gb2JqZWN0IHdpdGggdGhlIHNhbWVcbiAqIHN0cnVjdHVyZSBvZiB0aGUgYG9wdGlvbnNgIG9iamVjdCwgYXMgdGhlIDNyZCBhcmd1bWVudC4gRm9yIGV4YW1wbGU6XG4gKiBgYGBcbiAqIG5ldyBQb3BwZXIocmVmLCBwb3AsIHtcbiAqICAgbW9kaWZpZXJzOiB7XG4gKiAgICAgcHJldmVudE92ZXJmbG93OiB7IGVuYWJsZWQ6IGZhbHNlIH1cbiAqICAgfVxuICogfSlcbiAqIGBgYFxuICogQHR5cGUge09iamVjdH1cbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJvZiBQb3BwZXJcbiAqL1xudmFyIERlZmF1bHRzID0ge1xuICAvKipcbiAgICogUG9wcGVyJ3MgcGxhY2VtZW50LlxuICAgKiBAcHJvcCB7UG9wcGVyLnBsYWNlbWVudHN9IHBsYWNlbWVudD0nYm90dG9tJ1xuICAgKi9cbiAgcGxhY2VtZW50OiAnYm90dG9tJyxcblxuICAvKipcbiAgICogU2V0IHRoaXMgdG8gdHJ1ZSBpZiB5b3Ugd2FudCBwb3BwZXIgdG8gcG9zaXRpb24gaXQgc2VsZiBpbiAnZml4ZWQnIG1vZGVcbiAgICogQHByb3Age0Jvb2xlYW59IHBvc2l0aW9uRml4ZWQ9ZmFsc2VcbiAgICovXG4gIHBvc2l0aW9uRml4ZWQ6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIGV2ZW50cyAocmVzaXplLCBzY3JvbGwpIGFyZSBpbml0aWFsbHkgZW5hYmxlZC5cbiAgICogQHByb3Age0Jvb2xlYW59IGV2ZW50c0VuYWJsZWQ9dHJ1ZVxuICAgKi9cbiAgZXZlbnRzRW5hYmxlZDogdHJ1ZSxcblxuICAvKipcbiAgICogU2V0IHRvIHRydWUgaWYgeW91IHdhbnQgdG8gYXV0b21hdGljYWxseSByZW1vdmUgdGhlIHBvcHBlciB3aGVuXG4gICAqIHlvdSBjYWxsIHRoZSBgZGVzdHJveWAgbWV0aG9kLlxuICAgKiBAcHJvcCB7Qm9vbGVhbn0gcmVtb3ZlT25EZXN0cm95PWZhbHNlXG4gICAqL1xuICByZW1vdmVPbkRlc3Ryb3k6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBjYWxsZWQgd2hlbiB0aGUgcG9wcGVyIGlzIGNyZWF0ZWQuPGJyIC8+XG4gICAqIEJ5IGRlZmF1bHQsIGl0IGlzIHNldCB0byBuby1vcC48YnIgLz5cbiAgICogQWNjZXNzIFBvcHBlci5qcyBpbnN0YW5jZSB3aXRoIGBkYXRhLmluc3RhbmNlYC5cbiAgICogQHByb3Age29uQ3JlYXRlfVxuICAgKi9cbiAgb25DcmVhdGU6IGZ1bmN0aW9uIG9uQ3JlYXRlKCkge30sXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGNhbGxlZCB3aGVuIHRoZSBwb3BwZXIgaXMgdXBkYXRlZC4gVGhpcyBjYWxsYmFjayBpcyBub3QgY2FsbGVkXG4gICAqIG9uIHRoZSBpbml0aWFsaXphdGlvbi9jcmVhdGlvbiBvZiB0aGUgcG9wcGVyLCBidXQgb25seSBvbiBzdWJzZXF1ZW50XG4gICAqIHVwZGF0ZXMuPGJyIC8+XG4gICAqIEJ5IGRlZmF1bHQsIGl0IGlzIHNldCB0byBuby1vcC48YnIgLz5cbiAgICogQWNjZXNzIFBvcHBlci5qcyBpbnN0YW5jZSB3aXRoIGBkYXRhLmluc3RhbmNlYC5cbiAgICogQHByb3Age29uVXBkYXRlfVxuICAgKi9cbiAgb25VcGRhdGU6IGZ1bmN0aW9uIG9uVXBkYXRlKCkge30sXG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgbW9kaWZpZXJzIHVzZWQgdG8gbW9kaWZ5IHRoZSBvZmZzZXRzIGJlZm9yZSB0aGV5IGFyZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIuXG4gICAqIFRoZXkgcHJvdmlkZSBtb3N0IG9mIHRoZSBmdW5jdGlvbmFsaXRpZXMgb2YgUG9wcGVyLmpzLlxuICAgKiBAcHJvcCB7bW9kaWZpZXJzfVxuICAgKi9cbiAgbW9kaWZpZXJzOiBtb2RpZmllcnNcbn07XG5cbi8qKlxuICogQGNhbGxiYWNrIG9uQ3JlYXRlXG4gKiBAcGFyYW0ge2RhdGFPYmplY3R9IGRhdGFcbiAqL1xuXG4vKipcbiAqIEBjYWxsYmFjayBvblVwZGF0ZVxuICogQHBhcmFtIHtkYXRhT2JqZWN0fSBkYXRhXG4gKi9cblxuLy8gVXRpbHNcbi8vIE1ldGhvZHNcbnZhciBQb3BwZXIgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFBvcHBlci5qcyBpbnN0YW5jZS5cbiAgICogQGNsYXNzIFBvcHBlclxuICAgKiBAcGFyYW0ge0VsZW1lbnR8cmVmZXJlbmNlT2JqZWN0fSByZWZlcmVuY2UgLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgdXNlZCB0byBwb3NpdGlvbiB0aGUgcG9wcGVyXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gcG9wcGVyIC0gVGhlIEhUTUwgLyBYTUwgZWxlbWVudCB1c2VkIGFzIHRoZSBwb3BwZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBZb3VyIGN1c3RvbSBvcHRpb25zIHRvIG92ZXJyaWRlIHRoZSBvbmVzIGRlZmluZWQgaW4gW0RlZmF1bHRzXSgjZGVmYXVsdHMpXG4gICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2UgLSBUaGUgZ2VuZXJhdGVkIFBvcHBlci5qcyBpbnN0YW5jZVxuICAgKi9cbiAgZnVuY3Rpb24gUG9wcGVyKHJlZmVyZW5jZSwgcG9wcGVyKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBQb3BwZXIpO1xuXG4gICAgdGhpcy5zY2hlZHVsZVVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX3RoaXMudXBkYXRlKTtcbiAgICB9O1xuXG4gICAgLy8gbWFrZSB1cGRhdGUoKSBkZWJvdW5jZWQsIHNvIHRoYXQgaXQgb25seSBydW5zIGF0IG1vc3Qgb25jZS1wZXItdGlja1xuICAgIHRoaXMudXBkYXRlID0gZGVib3VuY2UodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cbiAgICAvLyB3aXRoIHt9IHdlIGNyZWF0ZSBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgb3B0aW9ucyBpbnNpZGUgaXRcbiAgICB0aGlzLm9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgUG9wcGVyLkRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgIC8vIGluaXQgc3RhdGVcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNEZXN0cm95ZWQ6IGZhbHNlLFxuICAgICAgaXNDcmVhdGVkOiBmYWxzZSxcbiAgICAgIHNjcm9sbFBhcmVudHM6IFtdXG4gICAgfTtcblxuICAgIC8vIGdldCByZWZlcmVuY2UgYW5kIHBvcHBlciBlbGVtZW50cyAoYWxsb3cgalF1ZXJ5IHdyYXBwZXJzKVxuICAgIHRoaXMucmVmZXJlbmNlID0gcmVmZXJlbmNlICYmIHJlZmVyZW5jZS5qcXVlcnkgPyByZWZlcmVuY2VbMF0gOiByZWZlcmVuY2U7XG4gICAgdGhpcy5wb3BwZXIgPSBwb3BwZXIgJiYgcG9wcGVyLmpxdWVyeSA/IHBvcHBlclswXSA6IHBvcHBlcjtcblxuICAgIC8vIERlZXAgbWVyZ2UgbW9kaWZpZXJzIG9wdGlvbnNcbiAgICB0aGlzLm9wdGlvbnMubW9kaWZpZXJzID0ge307XG4gICAgT2JqZWN0LmtleXMoX2V4dGVuZHMoe30sIFBvcHBlci5EZWZhdWx0cy5tb2RpZmllcnMsIG9wdGlvbnMubW9kaWZpZXJzKSkuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgX3RoaXMub3B0aW9ucy5tb2RpZmllcnNbbmFtZV0gPSBfZXh0ZW5kcyh7fSwgUG9wcGVyLkRlZmF1bHRzLm1vZGlmaWVyc1tuYW1lXSB8fCB7fSwgb3B0aW9ucy5tb2RpZmllcnMgPyBvcHRpb25zLm1vZGlmaWVyc1tuYW1lXSA6IHt9KTtcbiAgICB9KTtcblxuICAgIC8vIFJlZmFjdG9yaW5nIG1vZGlmaWVycycgbGlzdCAoT2JqZWN0ID0+IEFycmF5KVxuICAgIHRoaXMubW9kaWZpZXJzID0gT2JqZWN0LmtleXModGhpcy5vcHRpb25zLm1vZGlmaWVycykubWFwKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICByZXR1cm4gX2V4dGVuZHMoe1xuICAgICAgICBuYW1lOiBuYW1lXG4gICAgICB9LCBfdGhpcy5vcHRpb25zLm1vZGlmaWVyc1tuYW1lXSk7XG4gICAgfSlcbiAgICAvLyBzb3J0IHRoZSBtb2RpZmllcnMgYnkgb3JkZXJcbiAgICAuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGEub3JkZXIgLSBiLm9yZGVyO1xuICAgIH0pO1xuXG4gICAgLy8gbW9kaWZpZXJzIGhhdmUgdGhlIGFiaWxpdHkgdG8gZXhlY3V0ZSBhcmJpdHJhcnkgY29kZSB3aGVuIFBvcHBlci5qcyBnZXQgaW5pdGVkXG4gICAgLy8gc3VjaCBjb2RlIGlzIGV4ZWN1dGVkIGluIHRoZSBzYW1lIG9yZGVyIG9mIGl0cyBtb2RpZmllclxuICAgIC8vIHRoZXkgY291bGQgYWRkIG5ldyBwcm9wZXJ0aWVzIHRvIHRoZWlyIG9wdGlvbnMgY29uZmlndXJhdGlvblxuICAgIC8vIEJFIEFXQVJFOiBkb24ndCBhZGQgb3B0aW9ucyB0byBgb3B0aW9ucy5tb2RpZmllcnMubmFtZWAgYnV0IHRvIGBtb2RpZmllck9wdGlvbnNgIVxuICAgIHRoaXMubW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyT3B0aW9ucykge1xuICAgICAgaWYgKG1vZGlmaWVyT3B0aW9ucy5lbmFibGVkICYmIGlzRnVuY3Rpb24obW9kaWZpZXJPcHRpb25zLm9uTG9hZCkpIHtcbiAgICAgICAgbW9kaWZpZXJPcHRpb25zLm9uTG9hZChfdGhpcy5yZWZlcmVuY2UsIF90aGlzLnBvcHBlciwgX3RoaXMub3B0aW9ucywgbW9kaWZpZXJPcHRpb25zLCBfdGhpcy5zdGF0ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBmaXJlIHRoZSBmaXJzdCB1cGRhdGUgdG8gcG9zaXRpb24gdGhlIHBvcHBlciBpbiB0aGUgcmlnaHQgcGxhY2VcbiAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgdmFyIGV2ZW50c0VuYWJsZWQgPSB0aGlzLm9wdGlvbnMuZXZlbnRzRW5hYmxlZDtcbiAgICBpZiAoZXZlbnRzRW5hYmxlZCkge1xuICAgICAgLy8gc2V0dXAgZXZlbnQgbGlzdGVuZXJzLCB0aGV5IHdpbGwgdGFrZSBjYXJlIG9mIHVwZGF0ZSB0aGUgcG9zaXRpb24gaW4gc3BlY2lmaWMgc2l0dWF0aW9uc1xuICAgICAgdGhpcy5lbmFibGVFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGUuZXZlbnRzRW5hYmxlZCA9IGV2ZW50c0VuYWJsZWQ7XG4gIH1cblxuICAvLyBXZSBjYW4ndCB1c2UgY2xhc3MgcHJvcGVydGllcyBiZWNhdXNlIHRoZXkgZG9uJ3QgZ2V0IGxpc3RlZCBpbiB0aGVcbiAgLy8gY2xhc3MgcHJvdG90eXBlIGFuZCBicmVhayBzdHVmZiBsaWtlIFNpbm9uIHN0dWJzXG5cblxuICBjcmVhdGVDbGFzcyhQb3BwZXIsIFt7XG4gICAga2V5OiAndXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlJCQxKCkge1xuICAgICAgcmV0dXJuIHVwZGF0ZS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95JCQxKCkge1xuICAgICAgcmV0dXJuIGRlc3Ryb3kuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdlbmFibGVFdmVudExpc3RlbmVycycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuYWJsZUV2ZW50TGlzdGVuZXJzJCQxKCkge1xuICAgICAgcmV0dXJuIGVuYWJsZUV2ZW50TGlzdGVuZXJzLmNhbGwodGhpcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGlzYWJsZUV2ZW50TGlzdGVuZXJzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzYWJsZUV2ZW50TGlzdGVuZXJzJCQxKCkge1xuICAgICAgcmV0dXJuIGRpc2FibGVFdmVudExpc3RlbmVycy5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNjaGVkdWxlcyBhbiB1cGRhdGUuIEl0IHdpbGwgcnVuIG9uIHRoZSBuZXh0IFVJIHVwZGF0ZSBhdmFpbGFibGUuXG4gICAgICogQG1ldGhvZCBzY2hlZHVsZVVwZGF0ZVxuICAgICAqIEBtZW1iZXJvZiBQb3BwZXJcbiAgICAgKi9cblxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdGlvbiBvZiB1dGlsaXRpZXMgdXNlZnVsIHdoZW4gd3JpdGluZyBjdXN0b20gbW9kaWZpZXJzLlxuICAgICAqIFN0YXJ0aW5nIGZyb20gdmVyc2lvbiAxLjcsIHRoaXMgbWV0aG9kIGlzIGF2YWlsYWJsZSBvbmx5IGlmIHlvdVxuICAgICAqIGluY2x1ZGUgYHBvcHBlci11dGlscy5qc2AgYmVmb3JlIGBwb3BwZXIuanNgLlxuICAgICAqXG4gICAgICogKipERVBSRUNBVElPTioqOiBUaGlzIHdheSB0byBhY2Nlc3MgUG9wcGVyVXRpbHMgaXMgZGVwcmVjYXRlZFxuICAgICAqIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdjIhIFVzZSB0aGUgUG9wcGVyVXRpbHMgbW9kdWxlIGRpcmVjdGx5IGluc3RlYWQuXG4gICAgICogRHVlIHRvIHRoZSBoaWdoIGluc3RhYmlsaXR5IG9mIHRoZSBtZXRob2RzIGNvbnRhaW5lZCBpbiBVdGlscywgd2UgY2FuJ3RcbiAgICAgKiBndWFyYW50ZWUgdGhlbSB0byBmb2xsb3cgc2VtdmVyLiBVc2UgdGhlbSBhdCB5b3VyIG93biByaXNrIVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAxLjhcbiAgICAgKiBAbWVtYmVyIFV0aWxzXG4gICAgICogQG1lbWJlcm9mIFBvcHBlclxuICAgICAqL1xuXG4gIH1dKTtcbiAgcmV0dXJuIFBvcHBlcjtcbn0oKTtcblxuLyoqXG4gKiBUaGUgYHJlZmVyZW5jZU9iamVjdGAgaXMgYW4gb2JqZWN0IHRoYXQgcHJvdmlkZXMgYW4gaW50ZXJmYWNlIGNvbXBhdGlibGUgd2l0aCBQb3BwZXIuanNcbiAqIGFuZCBsZXRzIHlvdSB1c2UgaXQgYXMgcmVwbGFjZW1lbnQgb2YgYSByZWFsIERPTSBub2RlLjxiciAvPlxuICogWW91IGNhbiB1c2UgdGhpcyBtZXRob2QgdG8gcG9zaXRpb24gYSBwb3BwZXIgcmVsYXRpdmVseSB0byBhIHNldCBvZiBjb29yZGluYXRlc1xuICogaW4gY2FzZSB5b3UgZG9uJ3QgaGF2ZSBhIERPTSBub2RlIHRvIHVzZSBhcyByZWZlcmVuY2UuXG4gKlxuICogYGBgXG4gKiBuZXcgUG9wcGVyKHJlZmVyZW5jZU9iamVjdCwgcG9wcGVyTm9kZSk7XG4gKiBgYGBcbiAqXG4gKiBOQjogVGhpcyBmZWF0dXJlIGlzbid0IHN1cHBvcnRlZCBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMC5cbiAqIEBuYW1lIHJlZmVyZW5jZU9iamVjdFxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gZGF0YS5nZXRCb3VuZGluZ0NsaWVudFJlY3RcbiAqIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgc2V0IG9mIGNvb3JkaW5hdGVzIGNvbXBhdGlibGUgd2l0aCB0aGUgbmF0aXZlIGBnZXRCb3VuZGluZ0NsaWVudFJlY3RgIG1ldGhvZC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkYXRhLmNsaWVudFdpZHRoXG4gKiBBbiBFUzYgZ2V0dGVyIHRoYXQgd2lsbCByZXR1cm4gdGhlIHdpZHRoIG9mIHRoZSB2aXJ0dWFsIHJlZmVyZW5jZSBlbGVtZW50LlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGRhdGEuY2xpZW50SGVpZ2h0XG4gKiBBbiBFUzYgZ2V0dGVyIHRoYXQgd2lsbCByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgdmlydHVhbCByZWZlcmVuY2UgZWxlbWVudC5cbiAqL1xuXG5cblBvcHBlci5VdGlscyA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbCkuUG9wcGVyVXRpbHM7XG5Qb3BwZXIucGxhY2VtZW50cyA9IHBsYWNlbWVudHM7XG5Qb3BwZXIuRGVmYXVsdHMgPSBEZWZhdWx0cztcblxuZXhwb3J0IGRlZmF1bHQgUG9wcGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cG9wcGVyLmpzLm1hcFxuIiwiLyoqIVxuICogQGZpbGVPdmVydmlldyBLaWNrYXNzIGxpYnJhcnkgdG8gY3JlYXRlIGFuZCBwbGFjZSBwb3BwZXJzIG5lYXIgdGhlaXIgcmVmZXJlbmNlIGVsZW1lbnRzLlxuICogQHZlcnNpb24gMS4zLjJcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgRmVkZXJpY28gWml2b2xvIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5pbXBvcnQgUG9wcGVyIGZyb20gJ3BvcHBlci5qcyc7XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIHZhcmlhYmxlIGlzIGEgZnVuY3Rpb25cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7QW55fSBmdW5jdGlvblRvQ2hlY2sgLSB2YXJpYWJsZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IGFuc3dlciB0bzogaXMgYSBmdW5jdGlvbj9cbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbihmdW5jdGlvblRvQ2hlY2spIHtcbiAgdmFyIGdldFR5cGUgPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uVG9DaGVjayAmJiBnZXRUeXBlLnRvU3RyaW5nLmNhbGwoZnVuY3Rpb25Ub0NoZWNrKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxudmFyIGNsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbnZhciBjcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxuXG5cblxuXG5cblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbnZhciBERUZBVUxUX09QVElPTlMgPSB7XG4gIGNvbnRhaW5lcjogZmFsc2UsXG4gIGRlbGF5OiAwLFxuICBodG1sOiBmYWxzZSxcbiAgcGxhY2VtZW50OiAndG9wJyxcbiAgdGl0bGU6ICcnLFxuICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJ0b29sdGlwXCIgcm9sZT1cInRvb2x0aXBcIj48ZGl2IGNsYXNzPVwidG9vbHRpcC1hcnJvd1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCI+PC9kaXY+PC9kaXY+JyxcbiAgdHJpZ2dlcjogJ2hvdmVyIGZvY3VzJyxcbiAgb2Zmc2V0OiAwLFxuICBhcnJvd1NlbGVjdG9yOiAnLnRvb2x0aXAtYXJyb3csIC50b29sdGlwX19hcnJvdycsXG4gIGlubmVyU2VsZWN0b3I6ICcudG9vbHRpcC1pbm5lciwgLnRvb2x0aXBfX2lubmVyJ1xufTtcblxudmFyIFRvb2x0aXAgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVG9vbHRpcC5qcyBpbnN0YW5jZVxuICAgKiBAY2xhc3MgVG9vbHRpcFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByZWZlcmVuY2UgLSBUaGUgRE9NIG5vZGUgdXNlZCBhcyByZWZlcmVuY2Ugb2YgdGhlIHRvb2x0aXAgKGl0IGNhbiBiZSBhIGpRdWVyeSBlbGVtZW50KS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMucGxhY2VtZW50PSd0b3AnXG4gICAqICAgICAgUGxhY2VtZW50IG9mIHRoZSBwb3BwZXIgYWNjZXB0ZWQgdmFsdWVzOiBgdG9wKC1zdGFydCwgLWVuZCksIHJpZ2h0KC1zdGFydCwgLWVuZCksIGJvdHRvbSgtc3RhcnQsIC1lbmQpLFxuICAgKiAgICAgIGxlZnQoLXN0YXJ0LCAtZW5kKWBcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuYXJyb3dTZWxlY3Rvcj0nLnRvb2x0aXAtYXJyb3csIC50b29sdGlwX19hcnJvdycgLSBjbGFzc05hbWUgdXNlZCB0byBsb2NhdGUgdGhlIERPTSBhcnJvdyBlbGVtZW50IGluIHRoZSB0b29sdGlwLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5pbm5lclNlbGVjdG9yPScudG9vbHRpcC1pbm5lciwgLnRvb2x0aXBfX2lubmVyJyAtIGNsYXNzTmFtZSB1c2VkIHRvIGxvY2F0ZSB0aGUgRE9NIGlubmVyIGVsZW1lbnQgaW4gdGhlIHRvb2x0aXAuXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfGZhbHNlfSBvcHRpb25zLmNvbnRhaW5lcj1mYWxzZSAtIEFwcGVuZCB0aGUgdG9vbHRpcCB0byBhIHNwZWNpZmljIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gb3B0aW9ucy5kZWxheT0wXG4gICAqICAgICAgRGVsYXkgc2hvd2luZyBhbmQgaGlkaW5nIHRoZSB0b29sdGlwIChtcykgLSBkb2VzIG5vdCBhcHBseSB0byBtYW51YWwgdHJpZ2dlciB0eXBlLlxuICAgKiAgICAgIElmIGEgbnVtYmVyIGlzIHN1cHBsaWVkLCBkZWxheSBpcyBhcHBsaWVkIHRvIGJvdGggaGlkZS9zaG93LlxuICAgKiAgICAgIE9iamVjdCBzdHJ1Y3R1cmUgaXM6IGB7IHNob3c6IDUwMCwgaGlkZTogMTAwIH1gXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5odG1sPWZhbHNlIC0gSW5zZXJ0IEhUTUwgaW50byB0aGUgdG9vbHRpcC4gSWYgZmFsc2UsIHRoZSBjb250ZW50IHdpbGwgaW5zZXJ0ZWQgd2l0aCBgdGV4dENvbnRlbnRgLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMudGVtcGxhdGU9JzxkaXYgY2xhc3M9XCJ0b29sdGlwXCIgcm9sZT1cInRvb2x0aXBcIj48ZGl2IGNsYXNzPVwidG9vbHRpcC1hcnJvd1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCI+PC9kaXY+PC9kaXY+J11cbiAgICogICAgICBCYXNlIEhUTUwgdG8gdXNlZCB3aGVuIGNyZWF0aW5nIHRoZSB0b29sdGlwLlxuICAgKiAgICAgIFRoZSB0b29sdGlwJ3MgYHRpdGxlYCB3aWxsIGJlIGluamVjdGVkIGludG8gdGhlIGAudG9vbHRpcC1pbm5lcmAgb3IgYC50b29sdGlwX19pbm5lcmAuXG4gICAqICAgICAgYC50b29sdGlwLWFycm93YCBvciBgLnRvb2x0aXBfX2Fycm93YCB3aWxsIGJlY29tZSB0aGUgdG9vbHRpcCdzIGFycm93LlxuICAgKiAgICAgIFRoZSBvdXRlcm1vc3Qgd3JhcHBlciBlbGVtZW50IHNob3VsZCBoYXZlIHRoZSBgLnRvb2x0aXBgIGNsYXNzLlxuICAgKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudHxUaXRsZUZ1bmN0aW9ufSBvcHRpb25zLnRpdGxlPScnIC0gRGVmYXVsdCB0aXRsZSB2YWx1ZSBpZiBgdGl0bGVgIGF0dHJpYnV0ZSBpc24ndCBwcmVzZW50LlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMudHJpZ2dlcj0naG92ZXIgZm9jdXMnXVxuICAgKiAgICAgIEhvdyB0b29sdGlwIGlzIHRyaWdnZXJlZCAtIGNsaWNrLCBob3ZlciwgZm9jdXMsIG1hbnVhbC5cbiAgICogICAgICBZb3UgbWF5IHBhc3MgbXVsdGlwbGUgdHJpZ2dlcnM7IHNlcGFyYXRlIHRoZW0gd2l0aCBhIHNwYWNlLiBgbWFudWFsYCBjYW5ub3QgYmUgY29tYmluZWQgd2l0aCBhbnkgb3RoZXIgdHJpZ2dlci5cbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmNsb3NlT25DbGlja091dHNpZGU9ZmFsc2UgLSBDbG9zZSBhIHBvcHBlciBvbiBjbGljayBvdXRzaWRlIG9mIHRoZSBwb3BwZXIgYW5kIHJlZmVyZW5jZSBlbGVtZW50LiBUaGlzIGhhcyBlZmZlY3Qgb25seSB3aGVuIG9wdGlvbnMudHJpZ2dlciBpcyAnY2xpY2snLlxuICAgKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudH0gb3B0aW9ucy5ib3VuZGFyaWVzRWxlbWVudFxuICAgKiAgICAgIFRoZSBlbGVtZW50IHVzZWQgYXMgYm91bmRhcmllcyBmb3IgdGhlIHRvb2x0aXAuIEZvciBtb3JlIGluZm9ybWF0aW9uIHJlZmVyIHRvIFBvcHBlci5qcydcbiAgICogICAgICBbYm91bmRhcmllc0VsZW1lbnQgZG9jc10oaHR0cHM6Ly9wb3BwZXIuanMub3JnL3BvcHBlci1kb2N1bWVudGF0aW9uLmh0bWwpXG4gICAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gb3B0aW9ucy5vZmZzZXQ9MCAtIE9mZnNldCBvZiB0aGUgdG9vbHRpcCByZWxhdGl2ZSB0byBpdHMgcmVmZXJlbmNlLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiByZWZlciB0byBQb3BwZXIuanMnXG4gICAqICAgICAgW29mZnNldCBkb2NzXShodHRwczovL3BvcHBlci5qcy5vcmcvcG9wcGVyLWRvY3VtZW50YXRpb24uaHRtbClcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucG9wcGVyT3B0aW9ucz17fSAtIFBvcHBlciBvcHRpb25zLCB3aWxsIGJlIHBhc3NlZCBkaXJlY3RseSB0byBwb3BwZXIgaW5zdGFuY2UuIEZvciBtb3JlIGluZm9ybWF0aW9uIHJlZmVyIHRvIFBvcHBlci5qcydcbiAgICogICAgICBbb3B0aW9ucyBkb2NzXShodHRwczovL3BvcHBlci5qcy5vcmcvcG9wcGVyLWRvY3VtZW50YXRpb24uaHRtbClcbiAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZSAtIFRoZSBnZW5lcmF0ZWQgdG9vbHRpcCBpbnN0YW5jZVxuICAgKi9cbiAgZnVuY3Rpb24gVG9vbHRpcChyZWZlcmVuY2UsIG9wdGlvbnMpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBUb29sdGlwKTtcblxuICAgIF9pbml0aWFsaXNlUHJvcHMuY2FsbCh0aGlzKTtcblxuICAgIC8vIGFwcGx5IHVzZXIgb3B0aW9ucyBvdmVyIGRlZmF1bHQgb25lc1xuICAgIG9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgREVGQVVMVF9PUFRJT05TLCBvcHRpb25zKTtcblxuICAgIHJlZmVyZW5jZS5qcXVlcnkgJiYgKHJlZmVyZW5jZSA9IHJlZmVyZW5jZVswXSk7XG5cbiAgICAvLyBjYWNoZSByZWZlcmVuY2UgYW5kIG9wdGlvbnNcbiAgICB0aGlzLnJlZmVyZW5jZSA9IHJlZmVyZW5jZTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgLy8gZ2V0IGV2ZW50cyBsaXN0XG4gICAgdmFyIGV2ZW50cyA9IHR5cGVvZiBvcHRpb25zLnRyaWdnZXIgPT09ICdzdHJpbmcnID8gb3B0aW9ucy50cmlnZ2VyLnNwbGl0KCcgJykuZmlsdGVyKGZ1bmN0aW9uICh0cmlnZ2VyKSB7XG4gICAgICByZXR1cm4gWydjbGljaycsICdob3ZlcicsICdmb2N1cyddLmluZGV4T2YodHJpZ2dlcikgIT09IC0xO1xuICAgIH0pIDogW107XG5cbiAgICAvLyBzZXQgaW5pdGlhbCBzdGF0ZVxuICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuX3BvcHBlck9wdGlvbnMgPSB7fTtcblxuICAgIC8vIHNldCBldmVudCBsaXN0ZW5lcnNcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycyhyZWZlcmVuY2UsIGV2ZW50cywgb3B0aW9ucyk7XG4gIH1cblxuICAvL1xuICAvLyBQdWJsaWMgbWV0aG9kc1xuICAvL1xuXG4gIC8qKlxuICAgKiBSZXZlYWxzIGFuIGVsZW1lbnQncyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSBcIm1hbnVhbFwiIHRyaWdnZXJpbmcgb2YgdGhlIHRvb2x0aXAuXG4gICAqIFRvb2x0aXBzIHdpdGggemVyby1sZW5ndGggdGl0bGVzIGFyZSBuZXZlciBkaXNwbGF5ZWQuXG4gICAqIEBtZXRob2QgVG9vbHRpcCNzaG93XG4gICAqIEBtZW1iZXJvZiBUb29sdGlwXG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIEhpZGVzIGFuIGVsZW1lbnTigJlzIHRvb2x0aXAuIFRoaXMgaXMgY29uc2lkZXJlZCBhIOKAnG1hbnVhbOKAnSB0cmlnZ2VyaW5nIG9mIHRoZSB0b29sdGlwLlxuICAgKiBAbWV0aG9kIFRvb2x0aXAjaGlkZVxuICAgKiBAbWVtYmVyb2YgVG9vbHRpcFxuICAgKi9cblxuXG4gIC8qKlxuICAgKiBIaWRlcyBhbmQgZGVzdHJveXMgYW4gZWxlbWVudOKAmXMgdG9vbHRpcC5cbiAgICogQG1ldGhvZCBUb29sdGlwI2Rpc3Bvc2VcbiAgICogQG1lbWJlcm9mIFRvb2x0aXBcbiAgICovXG5cblxuICAvKipcbiAgICogVG9nZ2xlcyBhbiBlbGVtZW504oCZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZiB0aGUgdG9vbHRpcC5cbiAgICogQG1ldGhvZCBUb29sdGlwI3RvZ2dsZVxuICAgKiBAbWVtYmVyb2YgVG9vbHRpcFxuICAgKi9cblxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB0b29sdGlwJ3MgdGl0bGUgY29udGVudFxuICAgKiBAbWV0aG9kIFRvb2x0aXAjdXBkYXRlVGl0bGVDb250ZW50XG4gICAqIEBtZW1iZXJvZiBUb29sdGlwXG4gICAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fSB0aXRsZSAtIFRoZSBuZXcgY29udGVudCB0byB1c2UgZm9yIHRoZSB0aXRsZVxuICAgKi9cblxuXG4gIC8vXG4gIC8vIFByaXZhdGUgbWV0aG9kc1xuICAvL1xuXG4gIGNyZWF0ZUNsYXNzKFRvb2x0aXAsIFt7XG4gICAga2V5OiAnX2NyZWF0ZScsXG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgdG9vbHRpcCBub2RlXG4gICAgICogQG1lbWJlcm9mIFRvb2x0aXBcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHJlZmVyZW5jZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0ZW1wbGF0ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fFRpdGxlRnVuY3Rpb259IHRpdGxlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBhbGxvd0h0bWxcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gdG9vbHRpcE5vZGVcbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NyZWF0ZShyZWZlcmVuY2UsIHRlbXBsYXRlLCB0aXRsZSwgYWxsb3dIdG1sKSB7XG4gICAgICAvLyBjcmVhdGUgdG9vbHRpcCBlbGVtZW50XG4gICAgICB2YXIgdG9vbHRpcEdlbmVyYXRvciA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRvb2x0aXBHZW5lcmF0b3IuaW5uZXJIVE1MID0gdGVtcGxhdGUudHJpbSgpO1xuICAgICAgdmFyIHRvb2x0aXBOb2RlID0gdG9vbHRpcEdlbmVyYXRvci5jaGlsZE5vZGVzWzBdO1xuXG4gICAgICAvLyBhZGQgdW5pcXVlIElEIHRvIG91ciB0b29sdGlwIChuZWVkZWQgZm9yIGFjY2Vzc2liaWxpdHkgcmVhc29ucylcbiAgICAgIHRvb2x0aXBOb2RlLmlkID0gJ3Rvb2x0aXBfJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCAxMCk7XG5cbiAgICAgIC8vIHNldCBpbml0aWFsIGBhcmlhLWhpZGRlbmAgc3RhdGUgdG8gYGZhbHNlYCAoaXQncyB2aXNpYmxlISlcbiAgICAgIHRvb2x0aXBOb2RlLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgLy8gYWRkIHRpdGxlIHRvIHRvb2x0aXBcbiAgICAgIHZhciB0aXRsZU5vZGUgPSB0b29sdGlwR2VuZXJhdG9yLnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRpb25zLmlubmVyU2VsZWN0b3IpO1xuICAgICAgdGhpcy5fYWRkVGl0bGVDb250ZW50KHJlZmVyZW5jZSwgdGl0bGUsIGFsbG93SHRtbCwgdGl0bGVOb2RlKTtcblxuICAgICAgLy8gcmV0dXJuIHRoZSBnZW5lcmF0ZWQgdG9vbHRpcCBub2RlXG4gICAgICByZXR1cm4gdG9vbHRpcE5vZGU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2FkZFRpdGxlQ29udGVudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9hZGRUaXRsZUNvbnRlbnQocmVmZXJlbmNlLCB0aXRsZSwgYWxsb3dIdG1sLCB0aXRsZU5vZGUpIHtcbiAgICAgIGlmICh0aXRsZS5ub2RlVHlwZSA9PT0gMSB8fCB0aXRsZS5ub2RlVHlwZSA9PT0gMTEpIHtcbiAgICAgICAgLy8gaWYgdGl0bGUgaXMgYSBlbGVtZW50IG5vZGUgb3IgZG9jdW1lbnQgZnJhZ21lbnQsIGFwcGVuZCBpdCBvbmx5IGlmIGFsbG93SHRtbCBpcyB0cnVlXG4gICAgICAgIGFsbG93SHRtbCAmJiB0aXRsZU5vZGUuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHRpdGxlKSkge1xuICAgICAgICAvLyBpZiB0aXRsZSBpcyBhIGZ1bmN0aW9uLCBjYWxsIGl0IGFuZCBzZXQgdGV4dENvbnRlbnQgb3IgaW5uZXJIdG1sIGRlcGVuZGluZyBieSBgYWxsb3dIdG1sYCB2YWx1ZVxuICAgICAgICB2YXIgdGl0bGVUZXh0ID0gdGl0bGUuY2FsbChyZWZlcmVuY2UpO1xuICAgICAgICBhbGxvd0h0bWwgPyB0aXRsZU5vZGUuaW5uZXJIVE1MID0gdGl0bGVUZXh0IDogdGl0bGVOb2RlLnRleHRDb250ZW50ID0gdGl0bGVUZXh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaWYgaXQncyBqdXN0IGEgc2ltcGxlIHRleHQsIHNldCB0ZXh0Q29udGVudCBvciBpbm5lckh0bWwgZGVwZW5kaW5nIGJ5IGBhbGxvd0h0bWxgIHZhbHVlXG4gICAgICAgIGFsbG93SHRtbCA/IHRpdGxlTm9kZS5pbm5lckhUTUwgPSB0aXRsZSA6IHRpdGxlTm9kZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19zaG93JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3Nob3cocmVmZXJlbmNlLCBvcHRpb25zKSB7XG4gICAgICAvLyBkb24ndCBzaG93IGlmIGl0J3MgYWxyZWFkeSB2aXNpYmxlXG4gICAgICAvLyBvciBpZiBpdCdzIG5vdCBiZWluZyBzaG93ZWRcbiAgICAgIGlmICh0aGlzLl9pc09wZW4gJiYgIXRoaXMuX2lzT3BlbmluZykge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHRoaXMuX2lzT3BlbiA9IHRydWU7XG5cbiAgICAgIC8vIGlmIHRoZSB0b29sdGlwTm9kZSBhbHJlYWR5IGV4aXN0cywganVzdCBzaG93IGl0XG4gICAgICBpZiAodGhpcy5fdG9vbHRpcE5vZGUpIHtcbiAgICAgICAgdGhpcy5fdG9vbHRpcE5vZGUuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgdGhpcy5fdG9vbHRpcE5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuICAgICAgICB0aGlzLnBvcHBlckluc3RhbmNlLnVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZ2V0IHRpdGxlXG4gICAgICB2YXIgdGl0bGUgPSByZWZlcmVuY2UuZ2V0QXR0cmlidXRlKCd0aXRsZScpIHx8IG9wdGlvbnMudGl0bGU7XG5cbiAgICAgIC8vIGRvbid0IHNob3cgdG9vbHRpcCBpZiBubyB0aXRsZSBpcyBkZWZpbmVkXG4gICAgICBpZiAoIXRpdGxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBjcmVhdGUgdG9vbHRpcCBub2RlXG4gICAgICB2YXIgdG9vbHRpcE5vZGUgPSB0aGlzLl9jcmVhdGUocmVmZXJlbmNlLCBvcHRpb25zLnRlbXBsYXRlLCB0aXRsZSwgb3B0aW9ucy5odG1sKTtcblxuICAgICAgLy8gQWRkIGBhcmlhLWRlc2NyaWJlZGJ5YCB0byBvdXIgcmVmZXJlbmNlIGVsZW1lbnQgZm9yIGFjY2Vzc2liaWxpdHkgcmVhc29uc1xuICAgICAgcmVmZXJlbmNlLnNldEF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScsIHRvb2x0aXBOb2RlLmlkKTtcblxuICAgICAgLy8gYXBwZW5kIHRvb2x0aXAgdG8gY29udGFpbmVyXG4gICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5fZmluZENvbnRhaW5lcihvcHRpb25zLmNvbnRhaW5lciwgcmVmZXJlbmNlKTtcblxuICAgICAgdGhpcy5fYXBwZW5kKHRvb2x0aXBOb2RlLCBjb250YWluZXIpO1xuXG4gICAgICB0aGlzLl9wb3BwZXJPcHRpb25zID0gX2V4dGVuZHMoe30sIG9wdGlvbnMucG9wcGVyT3B0aW9ucywge1xuICAgICAgICBwbGFjZW1lbnQ6IG9wdGlvbnMucGxhY2VtZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fcG9wcGVyT3B0aW9ucy5tb2RpZmllcnMgPSBfZXh0ZW5kcyh7fSwgdGhpcy5fcG9wcGVyT3B0aW9ucy5tb2RpZmllcnMsIHtcbiAgICAgICAgYXJyb3c6IF9leHRlbmRzKHt9LCB0aGlzLl9wb3BwZXJPcHRpb25zLm1vZGlmaWVycyAmJiB0aGlzLl9wb3BwZXJPcHRpb25zLm1vZGlmaWVycy5hcnJvdywge1xuICAgICAgICAgIGVsZW1lbnQ6IG9wdGlvbnMuYXJyb3dTZWxlY3RvclxuICAgICAgICB9KSxcbiAgICAgICAgb2Zmc2V0OiBfZXh0ZW5kcyh7fSwgdGhpcy5fcG9wcGVyT3B0aW9ucy5tb2RpZmllcnMgJiYgdGhpcy5fcG9wcGVyT3B0aW9ucy5tb2RpZmllcnMub2Zmc2V0LCB7XG4gICAgICAgICAgb2Zmc2V0OiBvcHRpb25zLm9mZnNldFxuICAgICAgICB9KVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChvcHRpb25zLmJvdW5kYXJpZXNFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX3BvcHBlck9wdGlvbnMubW9kaWZpZXJzLnByZXZlbnRPdmVyZmxvdyA9IHtcbiAgICAgICAgICBib3VuZGFyaWVzRWxlbWVudDogb3B0aW9ucy5ib3VuZGFyaWVzRWxlbWVudFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBvcHBlckluc3RhbmNlID0gbmV3IFBvcHBlcihyZWZlcmVuY2UsIHRvb2x0aXBOb2RlLCB0aGlzLl9wb3BwZXJPcHRpb25zKTtcblxuICAgICAgdGhpcy5fdG9vbHRpcE5vZGUgPSB0b29sdGlwTm9kZTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2hpZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfaGlkZSgpIC8qcmVmZXJlbmNlLCBvcHRpb25zKi97XG4gICAgICAvLyBkb24ndCBoaWRlIGlmIGl0J3MgYWxyZWFkeSBoaWRkZW5cbiAgICAgIGlmICghdGhpcy5faXNPcGVuKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcblxuICAgICAgLy8gaGlkZSB0b29sdGlwTm9kZVxuICAgICAgdGhpcy5fdG9vbHRpcE5vZGUuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgdGhpcy5fdG9vbHRpcE5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19kaXNwb3NlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2Rpc3Bvc2UoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAvLyByZW1vdmUgZXZlbnQgbGlzdGVuZXJzIGZpcnN0IHRvIHByZXZlbnQgYW55IHVuZXhwZWN0ZWQgYmVoYXZpb3VyXG4gICAgICB0aGlzLl9ldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZikge1xuICAgICAgICB2YXIgZnVuYyA9IF9yZWYuZnVuYyxcbiAgICAgICAgICAgIGV2ZW50ID0gX3JlZi5ldmVudDtcblxuICAgICAgICBfdGhpcy5yZWZlcmVuY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2V2ZW50cyA9IFtdO1xuXG4gICAgICBpZiAodGhpcy5fdG9vbHRpcE5vZGUpIHtcbiAgICAgICAgdGhpcy5faGlkZSgpO1xuXG4gICAgICAgIC8vIGRlc3Ryb3kgaW5zdGFuY2VcbiAgICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZS5kZXN0cm95KCk7XG5cbiAgICAgICAgLy8gZGVzdHJveSB0b29sdGlwTm9kZSBpZiByZW1vdmVPbkRlc3Ryb3kgaXMgbm90IHNldCwgYXMgcG9wcGVySW5zdGFuY2UuZGVzdHJveSgpIGFscmVhZHkgcmVtb3ZlcyB0aGUgZWxlbWVudFxuICAgICAgICBpZiAoIXRoaXMucG9wcGVySW5zdGFuY2Uub3B0aW9ucy5yZW1vdmVPbkRlc3Ryb3kpIHtcbiAgICAgICAgICB0aGlzLl90b29sdGlwTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX3Rvb2x0aXBOb2RlKTtcbiAgICAgICAgICB0aGlzLl90b29sdGlwTm9kZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19maW5kQ29udGFpbmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2ZpbmRDb250YWluZXIoY29udGFpbmVyLCByZWZlcmVuY2UpIHtcbiAgICAgIC8vIGlmIGNvbnRhaW5lciBpcyBhIHF1ZXJ5LCBnZXQgdGhlIHJlbGF0aXZlIGVsZW1lbnRcbiAgICAgIGlmICh0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb250YWluZXIgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpO1xuICAgICAgfSBlbHNlIGlmIChjb250YWluZXIgPT09IGZhbHNlKSB7XG4gICAgICAgIC8vIGlmIGNvbnRhaW5lciBpcyBgZmFsc2VgLCBzZXQgaXQgdG8gcmVmZXJlbmNlIHBhcmVudFxuICAgICAgICBjb250YWluZXIgPSByZWZlcmVuY2UucGFyZW50Tm9kZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwZW5kIHRvb2x0aXAgdG8gY29udGFpbmVyXG4gICAgICogQG1lbWJlcm9mIFRvb2x0aXBcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRvb2x0aXBOb2RlXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd8ZmFsc2V9IGNvbnRhaW5lclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfYXBwZW5kJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2FwcGVuZCh0b29sdGlwTm9kZSwgY29udGFpbmVyKSB7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodG9vbHRpcE5vZGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19zZXRFdmVudExpc3RlbmVycycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRFdmVudExpc3RlbmVycyhyZWZlcmVuY2UsIGV2ZW50cywgb3B0aW9ucykge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBkaXJlY3RFdmVudHMgPSBbXTtcbiAgICAgIHZhciBvcHBvc2l0ZUV2ZW50cyA9IFtdO1xuXG4gICAgICBldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudCkge1xuICAgICAgICAgIGNhc2UgJ2hvdmVyJzpcbiAgICAgICAgICAgIGRpcmVjdEV2ZW50cy5wdXNoKCdtb3VzZWVudGVyJyk7XG4gICAgICAgICAgICBvcHBvc2l0ZUV2ZW50cy5wdXNoKCdtb3VzZWxlYXZlJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdmb2N1cyc6XG4gICAgICAgICAgICBkaXJlY3RFdmVudHMucHVzaCgnZm9jdXMnKTtcbiAgICAgICAgICAgIG9wcG9zaXRlRXZlbnRzLnB1c2goJ2JsdXInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgIGRpcmVjdEV2ZW50cy5wdXNoKCdjbGljaycpO1xuICAgICAgICAgICAgb3Bwb3NpdGVFdmVudHMucHVzaCgnY2xpY2snKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gc2NoZWR1bGUgc2hvdyB0b29sdGlwXG4gICAgICBkaXJlY3RFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIGZ1bmMgPSBmdW5jdGlvbiBmdW5jKGV2dCkge1xuICAgICAgICAgIGlmIChfdGhpczIuX2lzT3BlbmluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBldnQudXNlZEJ5VG9vbHRpcCA9IHRydWU7XG4gICAgICAgICAgX3RoaXMyLl9zY2hlZHVsZVNob3cocmVmZXJlbmNlLCBvcHRpb25zLmRlbGF5LCBvcHRpb25zLCBldnQpO1xuICAgICAgICB9O1xuICAgICAgICBfdGhpczIuX2V2ZW50cy5wdXNoKHsgZXZlbnQ6IGV2ZW50LCBmdW5jOiBmdW5jIH0pO1xuICAgICAgICByZWZlcmVuY2UuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XG4gICAgICB9KTtcblxuICAgICAgLy8gc2NoZWR1bGUgaGlkZSB0b29sdGlwXG4gICAgICBvcHBvc2l0ZUV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgZnVuYyA9IGZ1bmN0aW9uIGZ1bmMoZXZ0KSB7XG4gICAgICAgICAgaWYgKGV2dC51c2VkQnlUb29sdGlwID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIF90aGlzMi5fc2NoZWR1bGVIaWRlKHJlZmVyZW5jZSwgb3B0aW9ucy5kZWxheSwgb3B0aW9ucywgZXZ0KTtcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMyLl9ldmVudHMucHVzaCh7IGV2ZW50OiBldmVudCwgZnVuYzogZnVuYyB9KTtcbiAgICAgICAgcmVmZXJlbmNlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMpO1xuICAgICAgICBpZiAoZXZlbnQgPT09ICdjbGljaycgJiYgb3B0aW9ucy5jbG9zZU9uQ2xpY2tPdXRzaWRlKSB7XG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICghX3RoaXMyLl9pc09wZW5pbmcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHBvcHBlciA9IF90aGlzMi5wb3BwZXJJbnN0YW5jZS5wb3BwZXI7XG4gICAgICAgICAgICBpZiAocmVmZXJlbmNlLmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBwb3BwZXIuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmMoZSk7XG4gICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19zY2hlZHVsZVNob3cnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2NoZWR1bGVTaG93KHJlZmVyZW5jZSwgZGVsYXksIG9wdGlvbnMgLyosIGV2dCAqLykge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHRoaXMuX2lzT3BlbmluZyA9IHRydWU7XG4gICAgICAvLyBkZWZhdWx0cyB0byAwXG4gICAgICB2YXIgY29tcHV0ZWREZWxheSA9IGRlbGF5ICYmIGRlbGF5LnNob3cgfHwgZGVsYXkgfHwgMDtcbiAgICAgIHRoaXMuX3Nob3dUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMzLl9zaG93KHJlZmVyZW5jZSwgb3B0aW9ucyk7XG4gICAgICB9LCBjb21wdXRlZERlbGF5KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfc2NoZWR1bGVIaWRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NjaGVkdWxlSGlkZShyZWZlcmVuY2UsIGRlbGF5LCBvcHRpb25zLCBldnQpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICB0aGlzLl9pc09wZW5pbmcgPSBmYWxzZTtcbiAgICAgIC8vIGRlZmF1bHRzIHRvIDBcbiAgICAgIHZhciBjb21wdXRlZERlbGF5ID0gZGVsYXkgJiYgZGVsYXkuaGlkZSB8fCBkZWxheSB8fCAwO1xuICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl9zaG93VGltZW91dCk7XG4gICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChfdGhpczQuX2lzT3BlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkb2N1bWVudC5ib2R5LmNvbnRhaW5zKF90aGlzNC5fdG9vbHRpcE5vZGUpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgd2UgYXJlIGhpZGluZyBiZWNhdXNlIG9mIGEgbW91c2VsZWF2ZSwgd2UgbXVzdCBjaGVjayB0aGF0IHRoZSBuZXdcbiAgICAgICAgLy8gcmVmZXJlbmNlIGlzbid0IHRoZSB0b29sdGlwLCBiZWNhdXNlIGluIHRoaXMgY2FzZSB3ZSBkb24ndCB3YW50IHRvIGhpZGUgaXRcbiAgICAgICAgaWYgKGV2dC50eXBlID09PSAnbW91c2VsZWF2ZScpIHtcbiAgICAgICAgICB2YXIgaXNTZXQgPSBfdGhpczQuX3NldFRvb2x0aXBOb2RlRXZlbnQoZXZ0LCByZWZlcmVuY2UsIGRlbGF5LCBvcHRpb25zKTtcblxuICAgICAgICAgIC8vIGlmIHdlIHNldCB0aGUgbmV3IGV2ZW50LCBkb24ndCBoaWRlIHRoZSB0b29sdGlwIHlldFxuICAgICAgICAgIC8vIHRoZSBuZXcgZXZlbnQgd2lsbCB0YWtlIGNhcmUgdG8gaGlkZSBpdCBpZiBuZWNlc3NhcnlcbiAgICAgICAgICBpZiAoaXNTZXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczQuX2hpZGUocmVmZXJlbmNlLCBvcHRpb25zKTtcbiAgICAgIH0sIGNvbXB1dGVkRGVsYXkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ191cGRhdGVUaXRsZUNvbnRlbnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlVGl0bGVDb250ZW50KHRpdGxlKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuX3Rvb2x0aXBOb2RlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy50aXRsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgdGl0bGVOb2RlID0gdGhpcy5fdG9vbHRpcE5vZGUucXVlcnlTZWxlY3Rvcih0aGlzLm9wdGlvbnMuaW5uZXJTZWxlY3Rvcik7XG4gICAgICB0aGlzLl9jbGVhclRpdGxlQ29udGVudCh0aXRsZU5vZGUsIHRoaXMub3B0aW9ucy5odG1sLCB0aGlzLnJlZmVyZW5jZS5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykgfHwgdGhpcy5vcHRpb25zLnRpdGxlKTtcbiAgICAgIHRoaXMuX2FkZFRpdGxlQ29udGVudCh0aGlzLnJlZmVyZW5jZSwgdGl0bGUsIHRoaXMub3B0aW9ucy5odG1sLCB0aXRsZU5vZGUpO1xuICAgICAgdGhpcy5vcHRpb25zLnRpdGxlID0gdGl0bGU7XG4gICAgICB0aGlzLnBvcHBlckluc3RhbmNlLnVwZGF0ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19jbGVhclRpdGxlQ29udGVudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jbGVhclRpdGxlQ29udGVudCh0aXRsZU5vZGUsIGFsbG93SHRtbCwgbGFzdFRpdGxlKSB7XG4gICAgICBpZiAobGFzdFRpdGxlLm5vZGVUeXBlID09PSAxIHx8IGxhc3RUaXRsZS5ub2RlVHlwZSA9PT0gMTEpIHtcbiAgICAgICAgYWxsb3dIdG1sICYmIHRpdGxlTm9kZS5yZW1vdmVDaGlsZChsYXN0VGl0bGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxsb3dIdG1sID8gdGl0bGVOb2RlLmlubmVySFRNTCA9ICcnIDogdGl0bGVOb2RlLnRleHRDb250ZW50ID0gJyc7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBUb29sdGlwO1xufSgpO1xuXG4vKipcbiAqIFRpdGxlIGZ1bmN0aW9uLCBpdHMgY29udGV4dCBpcyB0aGUgVG9vbHRpcCBpbnN0YW5jZS5cbiAqIEBtZW1iZXJvZiBUb29sdGlwXG4gKiBAY2FsbGJhY2sgVGl0bGVGdW5jdGlvblxuICogQHJldHVybiB7U3RyaW5nfSBwbGFjZW1lbnQgLSBUaGUgZGVzaXJlZCB0aXRsZS5cbiAqL1xuXG5cbnZhciBfaW5pdGlhbGlzZVByb3BzID0gZnVuY3Rpb24gX2luaXRpYWxpc2VQcm9wcygpIHtcbiAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgdGhpcy5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfdGhpczUuX3Nob3coX3RoaXM1LnJlZmVyZW5jZSwgX3RoaXM1Lm9wdGlvbnMpO1xuICB9O1xuXG4gIHRoaXMuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3RoaXM1Ll9oaWRlKCk7XG4gIH07XG5cbiAgdGhpcy5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfdGhpczUuX2Rpc3Bvc2UoKTtcbiAgfTtcblxuICB0aGlzLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoX3RoaXM1Ll9pc09wZW4pIHtcbiAgICAgIHJldHVybiBfdGhpczUuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gX3RoaXM1LnNob3coKTtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy51cGRhdGVUaXRsZUNvbnRlbnQgPSBmdW5jdGlvbiAodGl0bGUpIHtcbiAgICByZXR1cm4gX3RoaXM1Ll91cGRhdGVUaXRsZUNvbnRlbnQodGl0bGUpO1xuICB9O1xuXG4gIHRoaXMuX2V2ZW50cyA9IFtdO1xuXG4gIHRoaXMuX3NldFRvb2x0aXBOb2RlRXZlbnQgPSBmdW5jdGlvbiAoZXZ0LCByZWZlcmVuY2UsIGRlbGF5LCBvcHRpb25zKSB7XG4gICAgdmFyIHJlbGF0ZWRyZWZlcmVuY2UgPSBldnQucmVsYXRlZHJlZmVyZW5jZSB8fCBldnQudG9FbGVtZW50IHx8IGV2dC5yZWxhdGVkVGFyZ2V0O1xuXG4gICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gY2FsbGJhY2soZXZ0Mikge1xuICAgICAgdmFyIHJlbGF0ZWRyZWZlcmVuY2UyID0gZXZ0Mi5yZWxhdGVkcmVmZXJlbmNlIHx8IGV2dDIudG9FbGVtZW50IHx8IGV2dDIucmVsYXRlZFRhcmdldDtcblxuICAgICAgLy8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVyIGFmdGVyIGNhbGxcbiAgICAgIF90aGlzNS5fdG9vbHRpcE5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQudHlwZSwgY2FsbGJhY2spO1xuXG4gICAgICAvLyBJZiB0aGUgbmV3IHJlZmVyZW5jZSBpcyBub3QgdGhlIHJlZmVyZW5jZSBlbGVtZW50XG4gICAgICBpZiAoIXJlZmVyZW5jZS5jb250YWlucyhyZWxhdGVkcmVmZXJlbmNlMikpIHtcbiAgICAgICAgLy8gU2NoZWR1bGUgdG8gaGlkZSB0b29sdGlwXG4gICAgICAgIF90aGlzNS5fc2NoZWR1bGVIaWRlKHJlZmVyZW5jZSwgb3B0aW9ucy5kZWxheSwgb3B0aW9ucywgZXZ0Mik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChfdGhpczUuX3Rvb2x0aXBOb2RlLmNvbnRhaW5zKHJlbGF0ZWRyZWZlcmVuY2UpKSB7XG4gICAgICAvLyBsaXN0ZW4gdG8gbW91c2VsZWF2ZSBvbiB0aGUgdG9vbHRpcCBlbGVtZW50IHRvIGJlIGFibGUgdG8gaGlkZSB0aGUgdG9vbHRpcFxuICAgICAgX3RoaXM1Ll90b29sdGlwTm9kZS5hZGRFdmVudExpc3RlbmVyKGV2dC50eXBlLCBjYWxsYmFjayk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb29sdGlwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9vbHRpcC5qcy5tYXBcbiIsIlxuaW1wb3J0IGxvZyBmcm9tIFwiLi9sb2dnaW5nXCJcbmltcG9ydCB7IGlzX2FycmF5IH0gZnJvbSBcIi4vdXRpbHNcIlxuaW1wb3J0IEpTT05QIGZyb20gXCJicm93c2VyLWpzb25wXCJcblxuaW1wb3J0IFRvb2x0aXAgZnJvbSBcInRvb2x0aXAuanNcIlxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgICAgIGxvZy5kZWJ1ZyhcIkludm9raW5nIENsYXNzIGNvbnN0cnVjdG9yIVwiKVxuICAgICAgICBmb3IobGV0IGtleSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICBsb2cuZGVidWcoXCJTZXR0aW5nOiBcIitrZXkrXCIgdG8gXCIrb3B0aW9uc1trZXldKVxuICAgICAgICAgICAgdGhpc1trZXldID0gb3B0aW9uc1trZXldXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuZm9ybV9rZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2cuZXJyb3IoXCJObyBGb3JtIEtleSBzZXQhXCIpXG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5tYW51YWwpIHtcbiAgICAgICAgICAgIC8vYmFpbCBvdXQgb2YgdGhlIHJlc3Qgb2Ygc2V0dXAgZm9yIG1hbnVhbC1tb2RlXG4gICAgICAgICAgICBsb2cuZGVidWcoXCJNYW51YWwgbW9kZSBzZWxlY3RlZDsgZXhpdGluZyBzZXR1cFwiKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuZW1haWxfZmllbGQpIHtcbiAgICAgICAgICAgIHJldHVybiBsb2cuZXJyb3IoXCJObyBFbWFpbCBGaWVsZCBzZXQhXCIpXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuZm9ybSkge1xuICAgICAgICAgICAgbG9nLmRlYnVnKFwiVHJ5aW5nIHRvIGd1ZXNzIEZvcm0gdmFsdWVcIilcbiAgICAgICAgICAgIC8vdHJ5IGFuZCBndWVzcyBmb3JtIGZyb20gZW1haWwgZmllbGQncyAnZm9ybScgcHJvcGVydHlcbiAgICAgICAgICAgIHRoaXMuZm9ybSA9IHRoaXMuZW1haWxfZmllbGQuZm9ybVxuICAgICAgICAgICAgbG9nLmRlYnVnKFwiUGlja2VkOiBcIit0aGlzLmZvcm0pXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuZm9ybSkge1xuICAgICAgICAgICAgcmV0dXJuIGxvZy5lcnJvcihcIkNvdWxkIG5vdCBkZXRlcm1pbmUgRm9ybSFcIilcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5zdWJtaXRfYnV0dG9uKSB7XG4gICAgICAgICAgICBsb2cuZGVidWcoXCJUcnlpbmcgdG8gZmluZCBzdWJtaXQgYnV0dG9ucy4uLlwiKVxuICAgICAgICAgICAgbGV0IHN1Ym1pdF9idXR0b25zPVtdXG4gICAgICAgICAgICBmb3IobGV0IGVsZW1lbnQgaW4gdGhpcy5mb3JtLmVsZW1lbnRzKSB7IC8vRklYTUUgLSBzaG91bGQgdXNlIGludGVnZXJzIG9ubHk/XG4gICAgICAgICAgICAgICAgbGV0IHRoaXNfZWxlbWVudCA9IHRoaXMuZm9ybS5lbGVtZW50c1tlbGVtZW50XVxuICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIkNoZWNraW5nIGVsZW1lbnQ6IFwiK2VsZW1lbnQrXCIgLSBub2RlTmFtZTogJ1wiK3RoaXNfZWxlbWVudC5ub2RlTmFtZStcIicgVHlwZTogJ1wiK3RoaXNfZWxlbWVudC50eXBlK1wiJ1wiKVxuICAgICAgICAgICAgICAgIGlmKHRoaXNfZWxlbWVudC5ub2RlTmFtZSA9PSBcIklOUFVUXCIgJiYgdGhpc19lbGVtZW50LnR5cGUgPT1cInN1Ym1pdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIkZvdW5kIGEgc3VibWl0IGJ1dHRvblwiKVxuICAgICAgICAgICAgICAgICAgICBzdWJtaXRfYnV0dG9ucy5wdXNoKHRoaXNfZWxlbWVudClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdF9idXR0b24gPSBzdWJtaXRfYnV0dG9uc1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZV9kb20oKVxuICAgIH1cbiAgICBpbml0aWFsaXplX2RvbSgpIHtcbiAgICAgICAgLy8gc2V0IHVwIHRoZSBvbmNoYW5nZSBoYW5kbGVyIGZvciB0aGUgZW1haWwgZmllbGRcbiAgICAgICAgbGV0IG9sZF9vbmNoYW5nZSA9IHRoaXMuZW1haWxfZmllbGQub25jaGFuZ2VcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzXG4gICAgICAgIHRoaXMuZW1haWxfZmllbGQub25jaGFuZ2UgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIHRoYXQub25jaGFuZ2VfaGFuZGxlcihldmVudClcbiAgICAgICAgICAgIGlmKG9sZF9vbmNoYW5nZSkge1xuICAgICAgICAgICAgICAgIG9sZF9vbmNoYW5nZShldmVudClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vc2V0IHVwIHRoZSBvbnN1Ym1pdCBoYW5kbGVyIGZvciB0aGUgZm9ybSAoaWYgdGhlcmUgaXMgb25lKVxuICAgICAgICBpZih0aGlzLmZvcm0pIHtcbiAgICAgICAgICAgIGxldCBvbGRfb25zdWJtaXQgPSB0aGlzLmZvcm0ub25zdWJtaXRcbiAgICAgICAgICAgIHRoaXMuZm9ybS5vbnN1Ym1pdCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGlmKG9sZF9vbnN1Ym1pdCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0cyA9IG9sZF9vbnN1Ym1pdChldmVudCkgLy9GSVhNRSAtIGNvbmZ1c2luZywgKnRoZWlyKiBvbGQgb25zdWJtaXQgaGFuZGxlciBmaXJlcyAqZmlyc3QqP1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihyZXN1bHRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9uc3VibWl0X2hhbmRsZXIoZXZlbnQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy9kaXNhYmxlIHN1Ym1pdCBidXR0b24sIGlmIHRoZXJlIGlzIG9uZSAtIFxuICAgICAgICBpZih0aGlzLnN1Ym1pdF9idXR0b24pIHtcbiAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIlRyeWluZyB0byBkaXNhYmxlIHN1Ym1pdCBidXR0b24uLi5cIilcbiAgICAgICAgICAgIGlmKGlzX2FycmF5KHRoaXMuc3VibWl0X2J1dHRvbikpIHtcbiAgICAgICAgICAgICAgICBsb2cuZGVidWcoXCJTdWJtaXQgYnV0dG9uIElTIEFSUkFZXCIpXG4gICAgICAgICAgICAgICAgZm9yKGxldCB4IGluIHRoaXMuc3VibWl0X2J1dHRvbikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdF9idXR0b25beF0uZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdF9idXR0b24uZGlzYWJsZWQgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbmNoYW5nZV9oYW5kbGVyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudmVyaWZ5KHRoaXMuZW1haWxfZmllbGQudmFsdWUsIGZ1bmN0aW9uIChyZXN1bHRzKSB7XG4gICAgICAgICAgICBpZihyZXN1bHRzID09IFwiQkFEXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm15dG9vbHRpcCA9IG5ldyBUb29sdGlwKHRoaXMuZW1haWxfZmllbGQpXG4gICAgICAgICAgICAgICAgdGhpcy5teXRvb2x0aXAuc2hvdygpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25zdWJtaXRfaGFuZGxlcihldmVudCkge1xuICAgICAgICBET19TT01FVEhJTkdfQ0xFVkVSRVIoKVxuICAgICAgICBKU09OUChcInVybFwiKVxuICAgIH1cblxuICAgIHZlcmlmeShlbWFpbCwgY2FsbGJhY2spIHtcbiAgICAgICAgSlNPTlAoe3VybDogSE9TVCtcIi92ZXJpZnlcIixcbiAgICAgICAgICAgIGRhdGE6IHtlbWFpbDogZW1haWwsIGZvcm1fa2V5OiB0aGlzLmZvcm1fa2V5fSwgXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEuc3RhdHVzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn0iLCJpbXBvcnQgbG9nIGZyb20gXCIuL2xvZ2dpbmdcIlxuaW1wb3J0IEZvcm0gZnJvbSBcIi4vZm9ybVwiXG4vL2ltcG9ydCBhc3NpZ24gZnJvbSBcImNvcmUtanMtcHVyZS9lcy9vYmplY3QvYXNzaWduXCJcbmltcG9ydCB7IGR1cGxpY2F0ZSB9IGZyb20gXCIuL3V0aWxzLmpzXCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGZvcm1fa2V5LG9wdGlvbnMpIHtcbiAgICBpZighZm9ybV9rZXkpIHtcbiAgICAgICAgbG9nLmVycm9yKFwiRm9ybSBrZXkgd2FzIG5vdCBzZXRcIilcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxldCBteV9vcHRpb25zXG4gICAgaWYob3B0aW9ucykge1xuICAgICAgICBteV9vcHRpb25zPWR1cGxpY2F0ZShvcHRpb25zKTtcbiAgICAgICAgbXlfb3B0aW9ucy5mb3JtX2tleSA9IGZvcm1fa2V5XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbXlfb3B0aW9ucz17Zm9ybV9rZXk6IGZvcm1fa2V5fVxuICAgIH1cbiAgICBpZihteV9vcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIGxvZy5kZWJ1Z19lbmFibGVkID0gbXlfb3B0aW9ucy5kZWJ1ZyAvL0ZJWE1FIHRoaXMgaXMgYWxyZWFkeSBoYW5kbGVkIGluIGluZGV4LmpzLCB0aGlzIGlzIHN1cGVyZmx1b3VzXG4gICAgICAgIGRlbGV0ZSBteV9vcHRpb25zLmRlYnVnIC8vZG9uJ3Qgd2FudCB0byBrZWVwIHBhc3NpbmcgdGhpcyBkb3duIHRvIGVhY2ggVmVyaWZ5XG4gICAgfVxuICAgIGxldCBhY3RpdmF0ZWRfZm9ybXM9W11cbiAgICBmb3IobGV0IGZvcm0gaW4gZG9jdW1lbnQuZm9ybXMpIHsgLy9vbGRlLXNrb29sZSBET00wIEZUVyFcbiAgICAgICAgbG9nLmRlYnVnKFwiQ2hlY2tpbmcgZm9ybTogXCIrZm9ybStcIiBmb3IgdmVyaWZpYWJsZSBlbWFpbCBhZGRyZXNzIGZpZWxkcy4uLlwiKVxuICAgICAgICBmb3IobGV0IGVsZW1lbnQgaW4gZG9jdW1lbnQuZm9ybXNbZm9ybV0uZWxlbWVudHMpIHsgLy8gRklYTUUgSSB0aGluayB0aGlzIGl0ZXJhdGVzIG5hbWVzICpBTkQqIG51bWJlcnNcbiAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIkNoZWNraW5nIGZpZWxkICNcIitlbGVtZW50K1wiIHRvIHNlZSBpZiBpdCdzIGFuIGVtYWlsIGFkZHJlc3MgZmllbGRcIilcbiAgICAgICAgICAgIGxldCB0aGlzX2ZpZWxkID0gZG9jdW1lbnQuZm9ybXNbZm9ybV0uZWxlbWVudHNbZWxlbWVudF1cbiAgICAgICAgICAgIGlmKHRoaXNfZmllbGQudHlwZSA9PSBcImVtYWlsXCIgfHwgdGhpc19maWVsZC5uYW1lID09IFwiZW1haWxcIiB8fCB0aGlzX2ZpZWxkLmlkID09IFwiZW1haWxcIikge1xuICAgICAgICAgICAgICAgIGxldCBvcHRpb25zX2NvcHkgPSBkdXBsaWNhdGUobXlfb3B0aW9ucylcbiAgICAgICAgICAgICAgICBsb2cuZGVidWcoXCJGb3VuZCBjYW5kaWRhdGUgZmllbGQuIE5hbWU6IFwiK3RoaXNfZmllbGQubmFtZStcIiBUeXBlOiBcIit0aGlzX2ZpZWxkLnR5cGUrXCIgSUQ6IFwiK3RoaXNfZmllbGQuaWQpXG4gICAgICAgICAgICAgICAgb3B0aW9uc19jb3B5LmZvcm0gPSBkb2N1bWVudC5mb3Jtc1tmb3JtXVxuICAgICAgICAgICAgICAgIG9wdGlvbnNfY29weS5lbWFpbF9maWVsZCA9IHRoaXNfZmllbGRcbiAgICAgICAgICAgICAgICBhY3RpdmF0ZWRfZm9ybXMucHVzaChuZXcgRm9ybShvcHRpb25zX2NvcHkpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhY3RpdmF0ZWRfZm9ybXNcbn0iLCJpbXBvcnQgYXV0byBmcm9tIFwiLi9hdXRvXCJcbmltcG9ydCBsb2cgZnJvbSBcIi4vbG9nZ2luZ1wiXG5pbXBvcnQgRm9ybSBmcm9tIFwiLi9mb3JtXCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGZvcm1fa2V5LCBvcHRpb25zKSB7XG4gICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIGxvZy5kZWJ1Z19lbmFibGVkID0gb3B0aW9ucy5kZWJ1Z1xuICAgIH1cbiAgICBpZighZm9ybV9rZXkpIHtcbiAgICAgICAgbG9nLmVycm9yKFwiRm9ybSBrZXkgd2FzIG5vdCBzZXRcIilcbiAgICB9XG4gICAgaWYoIW9wdGlvbnMgfHwgKCFvcHRpb25zLmVtYWlsX2ZpZWxkICYmICFvcHRpb25zLm1hbnVhbCkpIHtcbiAgICAgICAgcmV0dXJuIGF1dG8oZm9ybV9rZXksIG9wdGlvbnMpXG4gICAgfVxuICAgIHJldHVybiBuZXcgRm9ybShmb3JtX2tleSwgb3B0aW9ucylcbn0iXSwibmFtZXMiOlsibGV0IiwidGhpcyIsImFyZ3VtZW50cyIsImlzRnVuY3Rpb24iLCJjbGFzc0NhbGxDaGVjayIsImNyZWF0ZUNsYXNzIiwiX2V4dGVuZHMiLCJyZXN1bHRzIiwiSlNPTlAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBQUEsSUFBTSxHQUFHLEdBQ0wsWUFBVyxDQUFDLGFBQXFCLEVBQUU7cURBQVYsR0FBRzs7UUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxjQUFhO0lBQ3RDLEVBQUM7O0lBRUwsY0FBSSx3QkFBTSxHQUFHLEVBQUU7UUFDWCxHQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDaEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFDO1NBQzlCO0lBQ0wsRUFBQzs7SUFFTCxjQUFJLHdCQUFNLEdBQUcsRUFBRTtRQUNQLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNuQixJQUFJLENBQUMs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QVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxTQUFTLEtBQUssT0FBTyxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxTQUFTLEtBQUssS0FBSyxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxTQUFTLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFFN1UsSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLElBQUksY0FBYyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxRSxJQUFJLFlBQVksR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDcEUsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztRQUU3RSxJQUFJLG1CQUFtQixHQUFHLFNBQVMsS0FBSyxNQUFNLElBQUksYUFBYSxJQUFJLFNBQVMsS0FBSyxPQUFPLElBQUksY0FBYyxJQUFJLFNBQVMsS0FBSyxLQUFLLElBQUksWUFBWSxJQUFJLFNBQVMsS0FBSyxRQUFRLElBQUksZUFBZSxDQUFDOzs7UUFHL0wsSUFBSSxVQUFVLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7UUFHN0QsSUFBSSxxQkFBcUIsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsS0FBSyxVQUFVLElBQUksU0FBUyxLQUFLLE9BQU8sSUFBSSxhQUFhLElBQUksVUFBVSxJQUFJLFNBQVMsS0FBSyxLQUFLLElBQUksY0FBYyxJQUFJLENBQUMsVUFBVSxJQUFJLFNBQVMsS0FBSyxPQUFPLElBQUksWUFBWSxJQUFJLENBQUMsVUFBVSxJQUFJLFNBQVMsS0FBSyxLQUFLLElBQUksZUFBZSxDQUFDLENBQUM7OztRQUd2UixJQUFJLHlCQUF5QixHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEtBQUssVUFBVSxJQUFJLFNBQVMsS0FBSyxPQUFPLElBQUksY0FBYyxJQUFJLFVBQVUsSUFBSSxTQUFTLEtBQUssS0FBSyxJQUFJLGFBQWEsSUFBSSxDQUFDLFVBQVUsSUFBSSxTQUFTLEtBQUssT0FBTyxJQUFJLGVBQWUsSUFBSSxDQUFDLFVBQVUsSUFBSSxTQUFTLEtBQUssS0FBSyxJQUFJLFlBQVksQ0FBQyxDQUFDOztRQUVwUyxJQUFJLGdCQUFnQixHQUFHLHFCQUFxQixJQUFJLHlCQUF5QixDQUFDOztRQUUxRSxJQUFJLFdBQVcsSUFBSSxtQkFBbUIsSUFBSSxnQkFBZ0IsRUFBRTs7VUFFMUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7O1VBRXBCLElBQUksV0FBVyxJQUFJLG1CQUFtQixFQUFFO1lBQ3RDLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1dBQ2xDOztVQUVELElBQUksZ0JBQWdCLEVBQUU7WUFDcEIsU0FBUyxHQUFHLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1dBQzdDOztVQUVELElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxJQUFJLFNBQVMsR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDOzs7O1VBSWhFLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7O1VBRXhJLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzVEO09BQ0YsQ0FBQyxDQUFDO01BQ0gsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7Ozs7O0lBU0QsU0FBUyxZQUFZLENBQUMsSUFBSSxFQUFFO01BQzFCLElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPO1VBQzVCLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTTtVQUM3QixTQUFTLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQzs7TUFFeEMsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDN0MsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztNQUN2QixJQUFJLFVBQVUsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7TUFDN0QsSUFBSSxJQUFJLEdBQUcsVUFBVSxHQUFHLE9BQU8sR0FBRyxRQUFRLENBQUM7TUFDM0MsSUFBSSxNQUFNLEdBQUcsVUFBVSxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUM7TUFDekMsSUFBSSxXQUFXLEdBQUcsVUFBVSxHQUFHLE9BQU8sR0FBRyxRQUFRLENBQUM7O01BRWxELElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRTtRQUMzQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO09BQzlFO01BQ0QsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1FBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztPQUN0RDs7TUFFRCxPQUFPLElBQUksQ0FBQztLQUNiOzs7Ozs7Ozs7Ozs7OztJQWNELFNBQVMsT0FBTyxDQUFDLEdBQUcsRUFBRSxXQUFXLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFFOztNQUVsRSxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7TUFDbkQsSUFBSSxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDdEIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7TUFHcEIsSUFBSSxDQUFDLEtBQUssRUFBRTtRQUNWLE9BQU8sR0FBRyxDQUFDO09BQ1o7O01BRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMzQixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsQ0FBQztRQUNyQixRQUFRLElBQUk7VUFDVixLQUFLLElBQUk7WUFDUCxPQUFPLEdBQUcsYUFBYSxDQUFDO1lBQ3hCLE1BQU07VUFDUixLQUFLLEdBQUcsQ0FBQztVQUNULEtBQUssSUFBSSxDQUFDO1VBQ1Y7WUFDRSxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7U0FDOUI7O1FBRUQsSUFBSSxJQUFJLEdBQUcsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7T0FDeEMsTUFBTSxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTs7UUFFekMsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDbEIsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO1VBQ2pCLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUFFLE1BQU0sQ0FBQyxXQUFXLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDakYsTUFBTTtVQUNMLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDL0U7UUFDRCxPQUFPLElBQUksR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO09BQzNCLE1BQU07OztRQUdMLE9BQU8sS0FBSyxDQUFDO09BQ2Q7S0FDRjs7Ozs7Ozs7Ozs7OztJQWFELFNBQVMsV0FBVyxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFO01BQzNFLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7OztNQUtyQixJQUFJLFNBQVMsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Ozs7TUFJaEUsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxJQUFJLEVBQUU7UUFDMUQsT0FBTyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7T0FDcEIsQ0FBQyxDQUFDOzs7O01BSUgsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFVBQVUsSUFBSSxFQUFFO1FBQzlELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztPQUNuQyxDQUFDLENBQUMsQ0FBQzs7TUFFSixJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ2hFLE9BQU8sQ0FBQyxJQUFJLENBQUMsOEVBQThFLENBQUMsQ0FBQztPQUM5Rjs7OztNQUlELElBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQztNQUMvQixJQUFJLEdBQUcsR0FBRyxPQUFPLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7OztNQUd6TSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsRUFBRSxLQUFLLEVBQUU7O1FBRWpDLElBQUksV0FBVyxHQUFHLENBQUMsS0FBSyxLQUFLLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUM5RSxJQUFJLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUM5QixPQUFPLEVBQUU7OztTQUdSLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUU7VUFDdEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzFELENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNwQixpQkFBaUIsR0FBRyxJQUFJLENBQUM7WUFDekIsT0FBTyxDQUFDLENBQUM7V0FDVixNQUFNLElBQUksaUJBQWlCLEVBQUU7WUFDNUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JCLGlCQUFpQixHQUFHLEtBQUssQ0FBQztZQUMxQixPQUFPLENBQUMsQ0FBQztXQUNWLE1BQU07WUFDTCxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7V0FDcEI7U0FDRixFQUFFLEVBQUUsQ0FBQzs7U0FFTCxHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUU7VUFDbEIsT0FBTyxPQUFPLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztTQUNuRSxDQUFDLENBQUM7T0FDSixDQUFDLENBQUM7OztNQUdILEdBQUcsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFO1FBQy9CLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLEVBQUUsTUFBTSxFQUFFO1VBQ2pDLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ25CLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7V0FDNUQ7U0FDRixDQUFDLENBQUM7T0FDSixDQUFDLENBQUM7TUFDSCxPQUFPLE9BQU8sQ0FBQztLQUNoQjs7Ozs7Ozs7Ozs7SUFXRCxTQUFTLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO01BQzFCLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7TUFDekIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVM7VUFDMUIsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPO1VBQzVCLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTTtVQUM3QixTQUFTLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQzs7TUFFeEMsSUFBSSxhQUFhLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7TUFFNUMsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDLENBQUM7TUFDckIsSUFBSSxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN0QixPQUFPLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztPQUN4QixNQUFNO1FBQ0wsT0FBTyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxhQUFhLENBQUMsQ0FBQztPQUNqRTs7TUFFRCxJQUFJLGFBQWEsS0FBSyxNQUFNLEVBQUU7UUFDNUIsTUFBTSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsTUFBTSxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDM0IsTUFBTSxJQUFJLGFBQWEsS0FBSyxPQUFPLEVBQUU7UUFDcEMsTUFBTSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekIsTUFBTSxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDM0IsTUFBTSxJQUFJLGFBQWEsS0FBSyxLQUFLLEVBQUU7UUFDbEMsTUFBTSxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsTUFBTSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDMUIsTUFBTSxJQUFJLGFBQWEsS0FBSyxRQUFRLEVBQUU7UUFDckMsTUFBTSxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsTUFBTSxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDMUI7O01BRUQsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7TUFDckIsT0FBTyxJQUFJLENBQUM7S0FDYjs7Ozs7Ozs7O0lBU0QsU0FBUyxlQUFlLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRTtNQUN0QyxJQUFJLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxpQkFBaUIsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7TUFLM0YsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsS0FBSyxpQkFBaUIsRUFBRTtRQUNqRCxpQkFBaUIsR0FBRyxlQUFlLENBQUMsaUJBQWlCLENBQUMsQ0FBQztPQUN4RDs7Ozs7TUFLRCxJQUFJLGFBQWEsR0FBRyx3QkFBd0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztNQUMxRCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7TUFDOUMsSUFBSSxHQUFHLEdBQUcsWUFBWSxDQUFDLEdBQUc7VUFDdEIsSUFBSSxHQUFHLFlBQVksQ0FBQyxJQUFJO1VBQ3hCLFNBQVMsR0FBRyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUM7O01BRTVDLFlBQVksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO01BQ3RCLFlBQVksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO01BQ3ZCLFlBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLENBQUM7O01BRWpDLElBQUksVUFBVSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzs7OztNQUl0SSxZQUFZLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztNQUN2QixZQUFZLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztNQUN6QixZQUFZLENBQUMsYUFBYSxDQUFDLEdBQUcsU0FBUyxDQUFDOztNQUV4QyxPQUFPLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQzs7TUFFaEMsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQztNQUM3QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQzs7TUFFakMsSUFBSSxLQUFLLEdBQUc7UUFDVixPQUFPLEVBQUUsU0FBUyxPQUFPLENBQUMsU0FBUyxFQUFFO1VBQ25DLElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztVQUM5QixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUU7WUFDN0UsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1dBQzVEO1VBQ0QsT0FBTyxjQUFjLENBQUMsRUFBRSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUM3QztRQUNELFNBQVMsRUFBRSxTQUFTLFNBQVMsQ0FBQyxTQUFTLEVBQUU7VUFDdkMsSUFBSSxRQUFRLEdBQUcsU0FBUyxLQUFLLE9BQU8sR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDO1VBQ3RELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztVQUM3QixJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUU7WUFDN0UsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxTQUFTLEtBQUssT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7V0FDcEg7VUFDRCxPQUFPLGNBQWMsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzVDO09BQ0YsQ0FBQzs7TUFFRixLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsU0FBUyxFQUFFO1FBQ2pDLElBQUksSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxTQUFTLEdBQUcsV0FBVyxDQUFDO1FBQy9FLE1BQU0sR0FBRyxRQUFRLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztPQUN2RCxDQUFDLENBQUM7O01BRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztNQUU3QixPQUFPLElBQUksQ0FBQztLQUNiOzs7Ozs7Ozs7SUFTRCxTQUFTLEtBQUssQ0FBQyxJQUFJLEVBQUU7TUFDbkIsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztNQUMvQixJQUFJLGFBQWEsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQzVDLElBQUksY0FBYyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7OztNQUc3QyxJQUFJLGNBQWMsRUFBRTtRQUNsQixJQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTztZQUM1QixTQUFTLEdBQUcsYUFBYSxDQUFDLFNBQVM7WUFDbkMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7O1FBRWxDLElBQUksVUFBVSxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNqRSxJQUFJLElBQUksR0FBRyxVQUFVLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUN2QyxJQUFJLFdBQVcsR0FBRyxVQUFVLEdBQUcsT0FBTyxHQUFHLFFBQVEsQ0FBQzs7UUFFbEQsSUFBSSxZQUFZLEdBQUc7VUFDakIsS0FBSyxFQUFFLGNBQWMsQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQztVQUNoRCxHQUFHLEVBQUUsY0FBYyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7U0FDOUYsQ0FBQzs7UUFFRixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztPQUMxRTs7TUFFRCxPQUFPLElBQUksQ0FBQztLQUNiOzs7Ozs7Ozs7SUFTRCxTQUFTLElBQUksQ0FBQyxJQUFJLEVBQUU7TUFDbEIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxpQkFBaUIsQ0FBQyxFQUFFO1FBQzNFLE9BQU8sSUFBSSxDQUFDO09BQ2I7O01BRUQsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUM7TUFDckMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFLFVBQVUsUUFBUSxFQUFFO1FBQzVELE9BQU8sUUFBUSxDQUFDLElBQUksS0FBSyxpQkFBaUIsQ0FBQztPQUM1QyxDQUFDLENBQUMsVUFBVSxDQUFDOztNQUVkLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLEtBQUssSUFBSSxPQUFPLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFOztRQUV4SCxJQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxFQUFFO1VBQ3RCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7O1FBRUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQztPQUM3QyxNQUFNOztRQUVMLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7VUFDdkIsT0FBTyxJQUFJLENBQUM7U0FDYjs7UUFFRCxJQUFJLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsS0FBSyxDQUFDO09BQ2hEOztNQUVELE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7Ozs7OztJQVNELFNBQVMsS0FBSyxDQUFDLElBQUksRUFBRTtNQUNuQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO01BQy9CLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDNUMsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU87VUFDNUIsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNO1VBQzdCLFNBQVMsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDOztNQUV4QyxJQUFJLE9BQU8sR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O01BRTlELElBQUksY0FBYyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7TUFFbkUsTUFBTSxDQUFDLE9BQU8sR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLGNBQWMsR0FBRyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7TUFFMUgsSUFBSSxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztNQUNqRCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7O01BRTVDLE9BQU8sSUFBSSxDQUFDO0tBQ2I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBdUJELElBQUksU0FBUyxHQUFHOzs7Ozs7Ozs7TUFTZCxLQUFLLEVBQUU7O1FBRUwsS0FBSyxFQUFFLEdBQUc7O1FBRVYsT0FBTyxFQUFFLElBQUk7O1FBRWIsRUFBRSxFQUFFLEtBQUs7T0FDVjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQXdDRCxNQUFNLEVBQUU7O1FBRU4sS0FBSyxFQUFFLEdBQUc7O1FBRVYsT0FBTyxFQUFFLElBQUk7O1FBRWIsRUFBRSxFQUFFLE1BQU07Ozs7UUFJVixNQUFNLEVBQUUsQ0FBQztPQUNWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BbUJELGVBQWUsRUFBRTs7UUFFZixLQUFLLEVBQUUsR0FBRzs7UUFFVixPQUFPLEVBQUUsSUFBSTs7UUFFYixFQUFFLEVBQUUsZUFBZTs7Ozs7O1FBTW5CLFFBQVEsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBQzs7Ozs7OztRQU81QyxPQUFPLEVBQUUsQ0FBQzs7Ozs7O1FBTVYsaUJBQWlCLEVBQUUsY0FBYztPQUNsQzs7Ozs7Ozs7Ozs7TUFXRCxZQUFZLEVBQUU7O1FBRVosS0FBSyxFQUFFLEdBQUc7O1FBRVYsT0FBTyxFQUFFLElBQUk7O1FBRWIsRUFBRSxFQUFFLFlBQVk7T0FDakI7Ozs7Ozs7Ozs7OztNQVlELEtBQUssRUFBRTs7UUFFTCxLQUFLLEVBQUUsR0FBRzs7UUFFVixPQUFPLEVBQUUsSUFBSTs7UUFFYixFQUFFLEVBQUUsS0FBSzs7UUFFVCxPQUFPLEVBQUUsV0FBVztPQUNyQjs7Ozs7Ozs7Ozs7OztNQWFELElBQUksRUFBRTs7UUFFSixLQUFLLEVBQUUsR0FBRzs7UUFFVixPQUFPLEVBQUUsSUFBSTs7UUFFYixFQUFFLEVBQUUsSUFBSTs7Ozs7OztRQU9SLFFBQVEsRUFBRSxNQUFNOzs7OztRQUtoQixPQUFPLEVBQUUsQ0FBQzs7Ozs7OztRQU9WLGlCQUFpQixFQUFFLFVBQVU7Ozs7Ozs7O1FBUTdCLGNBQWMsRUFBRSxLQUFLOzs7Ozs7OztRQVFyQix1QkFBdUIsRUFBRSxLQUFLO09BQy9COzs7Ozs7Ozs7TUFTRCxLQUFLLEVBQUU7O1FBRUwsS0FBSyxFQUFFLEdBQUc7O1FBRVYsT0FBTyxFQUFFLEtBQUs7O1FBRWQsRUFBRSxFQUFFLEtBQUs7T0FDVjs7Ozs7Ozs7Ozs7O01BWUQsSUFBSSxFQUFFOztRQUVKLEtBQUssRUFBRSxHQUFHOztRQUVWLE9BQU8sRUFBRSxJQUFJOztRQUViLEVBQUUsRUFBRSxJQUFJO09BQ1Q7Ozs7Ozs7Ozs7Ozs7Ozs7O01BaUJELFlBQVksRUFBRTs7UUFFWixLQUFLLEVBQUUsR0FBRzs7UUFFVixPQUFPLEVBQUUsSUFBSTs7UUFFYixFQUFFLEVBQUUsWUFBWTs7Ozs7O1FBTWhCLGVBQWUsRUFBRSxJQUFJOzs7Ozs7UUFNckIsQ0FBQyxFQUFFLFFBQVE7Ozs7OztRQU1YLENBQUMsRUFBRSxPQUFPO09BQ1g7Ozs7Ozs7Ozs7Ozs7Ozs7O01BaUJELFVBQVUsRUFBRTs7UUFFVixLQUFLLEVBQUUsR0FBRzs7UUFFVixPQUFPLEVBQUUsSUFBSTs7UUFFYixFQUFFLEVBQUUsVUFBVTs7UUFFZCxNQUFNLEVBQUUsZ0JBQWdCOzs7Ozs7O1FBT3hCLGVBQWUsRUFBRSxTQUFTO09BQzNCO0tBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXFDRixJQUFJLFFBQVEsR0FBRzs7Ozs7TUFLYixTQUFTLEVBQUUsUUFBUTs7Ozs7O01BTW5CLGFBQWEsRUFBRSxLQUFLOzs7Ozs7TUFNcEIsYUFBYSxFQUFFLElBQUk7Ozs7Ozs7TUFPbkIsZUFBZSxFQUFFLEtBQUs7Ozs7Ozs7O01BUXRCLFFBQVEsRUFBRSxTQUFTLFFBQVEsR0FBRyxFQUFFOzs7Ozs7Ozs7O01BVWhDLFFBQVEsRUFBRSxTQUFTLFFBQVEsR0FBRyxFQUFFOzs7Ozs7O01BT2hDLFNBQVMsRUFBRSxTQUFTO0tBQ3JCLENBQUM7Ozs7Ozs7Ozs7Ozs7O0lBY0YsSUFBSSxNQUFNLEdBQUcsWUFBWTs7Ozs7Ozs7O01BU3ZCLFNBQVMsTUFBTSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUU7UUFDakMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDOztRQUVqQixJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDckYsY0FBYyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQzs7UUFFN0IsSUFBSSxDQUFDLGNBQWMsR0FBRyxZQUFZO1VBQ2hDLE9BQU8scUJBQXFCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzVDLENBQUM7OztRQUdGLElBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OztRQUcvQyxJQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQzs7O1FBR3RELElBQUksQ0FBQyxLQUFLLEdBQUc7VUFDWCxXQUFXLEVBQUUsS0FBSztVQUNsQixTQUFTLEVBQUUsS0FBSztVQUNoQixhQUFhLEVBQUUsRUFBRTtTQUNsQixDQUFDOzs7UUFHRixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUM7UUFDMUUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDOzs7UUFHM0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxJQUFJLEVBQUU7VUFDOUYsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZJLENBQUMsQ0FBQzs7O1FBR0gsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVUsSUFBSSxFQUFFO1VBQ3ZFLE9BQU8sUUFBUSxDQUFDO1lBQ2QsSUFBSSxFQUFFLElBQUk7V0FDWCxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbkMsQ0FBQzs7U0FFRCxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1VBQ3BCLE9BQU8sQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDO1NBQzFCLENBQUMsQ0FBQzs7Ozs7O1FBTUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxl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
