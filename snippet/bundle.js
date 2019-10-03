(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.Goodverification = factory());
}(this, function () { 'use strict';

    var HOST = 'http://localhost:8000'

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

    Log.prototype.debugdir = function debugdir (msg) {
        if(this.debug_enabled) {
            this.log_at_level('dir',msg);
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
    //# sourceMappingURL=popper.js.map

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
    //# sourceMappingURL=tooltip.js.map

    var MicroModal = (function () {

      var FOCUSABLE_ELEMENTS = ['a[href]', 'area[href]', 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', 'select:not([disabled]):not([aria-hidden])', 'textarea:not([disabled]):not([aria-hidden])', 'button:not([disabled]):not([aria-hidden])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];

      var Modal = function Modal(ref) {
        var ref$1;

        var targetModal = ref.targetModal;
        var triggers = ref.triggers; if ( triggers === void 0 ) triggers = [];
        var onShow = ref.onShow; if ( onShow === void 0 ) onShow = function () {};
        var onClose = ref.onClose; if ( onClose === void 0 ) onClose = function () {};
        var openTrigger = ref.openTrigger; if ( openTrigger === void 0 ) openTrigger = 'data-micromodal-trigger';
        var closeTrigger = ref.closeTrigger; if ( closeTrigger === void 0 ) closeTrigger = 'data-micromodal-close';
        var disableScroll = ref.disableScroll; if ( disableScroll === void 0 ) disableScroll = false;
        var disableFocus = ref.disableFocus; if ( disableFocus === void 0 ) disableFocus = false;
        var awaitCloseAnimation = ref.awaitCloseAnimation; if ( awaitCloseAnimation === void 0 ) awaitCloseAnimation = false;
        var awaitOpenAnimation = ref.awaitOpenAnimation; if ( awaitOpenAnimation === void 0 ) awaitOpenAnimation = false;
        var debugMode = ref.debugMode; if ( debugMode === void 0 ) debugMode = false;
        // Save a reference of the modal
        this.modal = document.getElementById(targetModal); // Save a reference to the passed config

        this.config = {
          debugMode: debugMode,
          disableScroll: disableScroll,
          openTrigger: openTrigger,
          closeTrigger: closeTrigger,
          onShow: onShow,
          onClose: onClose,
          awaitCloseAnimation: awaitCloseAnimation,
          awaitOpenAnimation: awaitOpenAnimation,
          disableFocus: disableFocus // Register click events only if pre binding eventListeners

        };
        if (triggers.length > 0) { (ref$1 = this).registerTriggers.apply(ref$1, triggers); } // pre bind functions for event listeners

        this.onClick = this.onClick.bind(this);
        this.onKeydown = this.onKeydown.bind(this);
      };
      /**
       * Loops through all openTriggers and binds click event
       * @param{array} triggers [Array of node elements]
       * @return {void}
       */


      Modal.prototype.registerTriggers = function registerTriggers () {
          var this$1 = this;
          var triggers = [], len = arguments.length;
          while ( len-- ) triggers[ len ] = arguments[ len ];

        triggers.filter(Boolean).forEach(function (trigger) {
          trigger.addEventListener('click', function (event) { return this$1.showModal(event); });
        });
      };

      Modal.prototype.showModal = function showModal () {
          var this$1 = this;

        this.activeElement = document.activeElement;
        this.modal.setAttribute('aria-hidden', 'false');
        this.modal.classList.add('is-open');
        this.scrollBehaviour('disable');
        this.addEventListeners();

        if (this.config.awaitOpenAnimation) {
          var handler = function () {
            this$1.modal.removeEventListener('animationend', handler, false);
            this$1.setFocusToFirstNode();
          };

          this.modal.addEventListener('animationend', handler, false);
        } else {
          this.setFocusToFirstNode();
        }

        this.config.onShow(this.modal, this.activeElement);
      };

      Modal.prototype.closeModal = function closeModal () {
        var modal = this.modal;
        this.modal.setAttribute('aria-hidden', 'true');
        this.removeEventListeners();
        this.scrollBehaviour('enable');

        if (this.activeElement) {
          this.activeElement.focus();
        }

        this.config.onClose(this.modal);

        if (this.config.awaitCloseAnimation) {
          this.modal.addEventListener('animationend', function handler() {
            modal.classList.remove('is-open');
            modal.removeEventListener('animationend', handler, false);
          }, false);
        } else {
          modal.classList.remove('is-open');
        }
      };

      Modal.prototype.closeModalById = function closeModalById (targetModal) {
        this.modal = document.getElementById(targetModal);
        if (this.modal) { this.closeModal(); }
      };

      Modal.prototype.scrollBehaviour = function scrollBehaviour (toggle) {
        if (!this.config.disableScroll) { return; }
        var body = document.querySelector('body');

        switch (toggle) {
          case 'enable':
            Object.assign(body.style, {
              overflow: '',
              height: ''
            });
            break;

          case 'disable':
            Object.assign(body.style, {
              overflow: 'hidden',
              height: '100vh'
            });
            break;

          default:
        }
      };

      Modal.prototype.addEventListeners = function addEventListeners () {
        this.modal.addEventListener('touchstart', this.onClick);
        this.modal.addEventListener('click', this.onClick);
        document.addEventListener('keydown', this.onKeydown);
      };

      Modal.prototype.removeEventListeners = function removeEventListeners () {
        this.modal.removeEventListener('touchstart', this.onClick);
        this.modal.removeEventListener('click', this.onClick);
        document.removeEventListener('keydown', this.onKeydown);
      };

      Modal.prototype.onClick = function onClick (event) {
        if (event.target.hasAttribute(this.config.closeTrigger)) {
          this.closeModal();
          event.preventDefault();
        }
      };

      Modal.prototype.onKeydown = function onKeydown (event) {
        if (event.keyCode === 27) { this.closeModal(event); }
        if (event.keyCode === 9) { this.maintainFocus(event); }
      };

      Modal.prototype.getFocusableNodes = function getFocusableNodes () {
        var nodes = this.modal.querySelectorAll(FOCUSABLE_ELEMENTS);
        return Array.apply(void 0, nodes);
      };

      Modal.prototype.setFocusToFirstNode = function setFocusToFirstNode () {
        if (this.config.disableFocus) { return; }
        var focusableNodes = this.getFocusableNodes();
        if (focusableNodes.length) { focusableNodes[0].focus(); }
      };

      Modal.prototype.maintainFocus = function maintainFocus (event) {
        var focusableNodes = this.getFocusableNodes(); // if disableFocus is true

        if (!this.modal.contains(document.activeElement)) {
          focusableNodes[0].focus();
        } else {
          var focusedItemIndex = focusableNodes.indexOf(document.activeElement);

          if (event.shiftKey && focusedItemIndex === 0) {
            focusableNodes[focusableNodes.length - 1].focus();
            event.preventDefault();
          }

          if (!event.shiftKey && focusedItemIndex === focusableNodes.length - 1) {
            focusableNodes[0].focus();
            event.preventDefault();
          }
        }
      };
      /**
       * Modal prototype ends.
       * Here on code is responsible for detecting and
       * auto binding event handlers on modal triggers
       */
      // Keep a reference to the opened modal


      var activeModal = null;
      /**
       * Generates an associative array of modals and it's
       * respective triggers
       * @param  {array} triggers     An array of all triggers
       * @param  {string} triggerAttr The data-attribute which triggers the module
       * @return {array}
       */

      var generateTriggerMap = function (triggers, triggerAttr) {
        var triggerMap = [];
        triggers.forEach(function (trigger) {
          var targetModal = trigger.attributes[triggerAttr].value;
          if (triggerMap[targetModal] === undefined) { triggerMap[targetModal] = []; }
          triggerMap[targetModal].push(trigger);
        });
        return triggerMap;
      };
      /**
       * Validates whether a modal of the given id exists
       * in the DOM
       * @param  {number} id  The id of the modal
       * @return {boolean}
       */


      var validateModalPresence = function (id) {
        if (!document.getElementById(id)) {
          console.warn(("MicroModal: ❗Seems like you have missed %c'" + id + "'"), 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'ID somewhere in your code. Refer example below to resolve it.');
          console.warn("%cExample:", 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', ("<div class=\"modal\" id=\"" + id + "\"></div>"));
          return false;
        }
      };
      /**
       * Validates if there are modal triggers present
       * in the DOM
       * @param  {array} triggers An array of data-triggers
       * @return {boolean}
       */


      var validateTriggerPresence = function (triggers) {
        if (triggers.length <= 0) {
          console.warn("MicroModal: ❗Please specify at least one %c'micromodal-trigger'", 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', 'data attribute.');
          console.warn("%cExample:", 'background-color: #f8f9fa;color: #50596c;font-weight: bold;', "<a href=\"#\" data-micromodal-trigger=\"my-modal\"></a>");
          return false;
        }
      };
      /**
       * Checks if triggers and their corresponding modals
       * are present in the DOM
       * @param  {array} triggers   Array of DOM nodes which have data-triggers
       * @param  {array} triggerMap Associative array of modals and their triggers
       * @return {boolean}
       */


      var validateArgs = function (triggers, triggerMap) {
        validateTriggerPresence(triggers);
        if (!triggerMap) { return true; }

        for (var id in triggerMap) { validateModalPresence(id); }

        return true;
      };
      /**
       * Binds click handlers to all modal triggers
       * @param  {object} config [description]
       * @return void
       */


      var init = function (config) {
        // Create an config object with default openTrigger
        var options = Object.assign({}, {
          openTrigger: 'data-micromodal-trigger'
        }, config); // Collects all the nodes with the trigger

        var triggers = [].concat( document.querySelectorAll(("[" + (options.openTrigger) + "]")) ); // Makes a mappings of modals with their trigger nodes

        var triggerMap = generateTriggerMap(triggers, options.openTrigger); // Checks if modals and triggers exist in dom

        if (options.debugMode === true && validateArgs(triggers, triggerMap) === false) { return; } // For every target modal creates a new instance

        for (var key in triggerMap) {
          var value = triggerMap[key];
          options.targetModal = key;
          options.triggers = [].concat( value );
          activeModal = new Modal(options); // eslint-disable-line no-new
        }
      };
      /**
       * Shows a particular modal
       * @param  {string} targetModal [The id of the modal to display]
       * @param  {object} config [The configuration object to pass]
       * @return {void}
       */


      var show = function (targetModal, config) {
        var options = config || {};
        options.targetModal = targetModal; // Checks if modals and triggers exist in dom

        if (options.debugMode === true && validateModalPresence(targetModal) === false) { return; } // stores reference to active modal

        activeModal = new Modal(options); // eslint-disable-line no-new

        activeModal.showModal();
      };
      /**
       * Closes the active modal
       * @param  {string} targetModal [The id of the modal to close]
       * @return {void}
       */


      var close = function (targetModal) {
        targetModal ? activeModal.closeModalById(targetModal) : activeModal.closeModal();
      };

      return {
        init: init,
        show: show,
        close: close
      };
    })();

    function styleInject(css, ref) {
      if ( ref === void 0 ) { ref = {}; }
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css = ".popper,\n.tooltip {\n    position: absolute;\n    background: #FFC107;\n    color: black;\n    width: 150px;\n    border-radius: 3px;\n    box-shadow: 0 0 2px rgba(0,0,0,0.5);\n    padding: 10px;\n    text-align: center;\n}\n.style5 .tooltip {\n    background: #1E252B;\n    color: #FFFFFF;\n    max-width: 200px;\n    width: auto;\n    font-size: .8rem;\n    padding: .5em 1em;\n}\n.popper .popper__arrow,\n.tooltip .tooltip-arrow {\n    width: 0;\n    height: 0;\n    border-style: solid;\n    position: absolute;\n    margin: 5px;\n}\n\n.tooltip .tooltip-arrow,\n.popper .popper__arrow {\n    border-color: #FFC107;\n}\n.style5 .tooltip .tooltip-arrow {\n    border-color: #1E252B;\n}\n.popper[x-placement^=\"top\"],\n.tooltip[x-placement^=\"top\"] {\n    margin-bottom: 5px;\n}\n.popper[x-placement^=\"top\"] .popper__arrow,\n.tooltip[x-placement^=\"top\"] .tooltip-arrow {\n    border-width: 5px 5px 0 5px;\n    border-left-color: transparent;\n    border-right-color: transparent;\n    border-bottom-color: transparent;\n    bottom: -5px;\n    left: calc(50% - 5px);\n    margin-top: 0;\n    margin-bottom: 0;\n}\n.popper[x-placement^=\"bottom\"],\n.tooltip[x-placement^=\"bottom\"] {\n    margin-top: 5px;\n}\n.tooltip[x-placement^=\"bottom\"] .tooltip-arrow,\n.popper[x-placement^=\"bottom\"] .popper__arrow {\n    border-width: 0 5px 5px 5px;\n    border-left-color: transparent;\n    border-right-color: transparent;\n    border-top-color: transparent;\n    top: -5px;\n    left: calc(50% - 5px);\n    margin-top: 0;\n    margin-bottom: 0;\n}\n.tooltip[x-placement^=\"right\"],\n.popper[x-placement^=\"right\"] {\n    margin-left: 5px;\n}\n.popper[x-placement^=\"right\"] .popper__arrow,\n.tooltip[x-placement^=\"right\"] .tooltip-arrow {\n    border-width: 5px 5px 5px 0;\n    border-left-color: transparent;\n    border-top-color: transparent;\n    border-bottom-color: transparent;\n    left: -5px;\n    top: calc(50% - 5px);\n    margin-left: 0;\n    margin-right: 0;\n}\n.popper[x-placement^=\"left\"],\n.tooltip[x-placement^=\"left\"] {\n    margin-right: 5px;\n}\n.popper[x-placement^=\"left\"] .popper__arrow,\n.tooltip[x-placement^=\"left\"] .tooltip-arrow {\n    border-width: 5px 0 5px 5px;\n    border-top-color: transparent;\n    border-right-color: transparent;\n    border-bottom-color: transparent;\n    right: -5px;\n    top: calc(50% - 5px);\n    margin-left: 0;\n    margin-right: 0;\n}";
    styleInject(css);

    var css$1 = "/**************************\\\n  Basic Modal Styles\n\\**************************/\n\n/*\n.modal {\n  display: none;\n}\n\n.modal.is-open {\n  display: block;\n} */\n\n\n.modal {\n    font-family: -apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica neue,helvetica,ubuntu,roboto,noto,segoe ui,arial,sans-serif;\n  }\n  \n  .modal__overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(0,0,0,0.6);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  \n  .modal__container {\n    background-color: #fff;\n    padding: 30px;\n    max-width: 500px;\n    max-height: 100vh;\n    border-radius: 4px;\n    overflow-y: auto;\n    box-sizing: border-box;\n  }\n  \n  .modal__header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n  \n  .modal__title {\n    margin-top: 0;\n    margin-bottom: 0;\n    font-weight: 600;\n    font-size: 1.25rem;\n    line-height: 1.25;\n    color: #00449e;\n    box-sizing: border-box;\n  }\n  \n  .modal__close {\n    background: transparent;\n    border: 0;\n  }\n  \n  .modal__header .modal__close:before { content: \"\\2715\"; }\n  \n  .modal__content {\n    margin-top: 2rem;\n    margin-bottom: 2rem;\n    line-height: 1.5;\n    color: rgba(0,0,0,.8);\n  }\n  \n  .modal__btn {\n    font-size: .875rem;\n    padding-left: 1rem;\n    padding-right: 1rem;\n    padding-top: .5rem;\n    padding-bottom: .5rem;\n    background-color: #e6e6e6;\n    color: rgba(0,0,0,.8);\n    border-radius: .25rem;\n    border-style: none;\n    border-width: 0;\n    cursor: pointer;\n    -webkit-appearance: button;\n    text-transform: none;\n    overflow: visible;\n    line-height: 1.15;\n    margin: 0;\n    will-change: transform;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    transition: -webkit-transform .25s ease-out;\n    transition: transform .25s ease-out;\n    transition: transform .25s ease-out,-webkit-transform .25s ease-out;\n  }\n  \n  .modal__btn:focus, .modal__btn:hover {\n    -webkit-transform: scale(1.05);\n    transform: scale(1.05);\n  }\n  \n  .modal__btn-primary {\n    background-color: #00449e;\n    color: #fff;\n  }\n  \n  \n  \n  /**************************\\\n    Demo Animation Style\n  \\**************************/\n  @keyframes mmfadeIn {\n      from { opacity: 0; }\n        to { opacity: 1; }\n  }\n  \n  @keyframes mmfadeOut {\n      from { opacity: 1; }\n        to { opacity: 0; }\n  }\n  \n  @keyframes mmslideIn {\n    from { transform: translateY(15%); }\n      to { transform: translateY(0); }\n  }\n  \n  @keyframes mmslideOut {\n      from { transform: translateY(0); }\n      to { transform: translateY(-10%); }\n  }\n  \n  .micromodal-slide {\n    display: none;\n  }\n  \n  .micromodal-slide.is-open {\n    display: block;\n  }\n  \n  .micromodal-slide[aria-hidden=\"false\"] .modal__overlay {\n    animation: mmfadeIn .3s cubic-bezier(0.0, 0.0, 0.2, 1);\n  }\n  \n  .micromodal-slide[aria-hidden=\"false\"] .modal__container {\n    animation: mmslideIn .3s cubic-bezier(0, 0, .2, 1);\n  }\n  \n  .micromodal-slide[aria-hidden=\"true\"] .modal__overlay {\n    animation: mmfadeOut .3s cubic-bezier(0.0, 0.0, 0.2, 1);\n  }\n  \n  .micromodal-slide[aria-hidden=\"true\"] .modal__container {\n    animation: mmslideOut .3s cubic-bezier(0, 0, .2, 1);\n  }\n  \n  .micromodal-slide .modal__container,\n  .micromodal-slide .modal__overlay {\n    will-change: transform;\n  }\n  ";
    styleInject(css$1);

    // FIXME - I also don't like Tingle very much, I think I want to swap it for Micromodal.js
    // import MicroModal from 'micromodal';  // es6 module

    var node_creator = function (name, attributes, text) {
        var elem = document.createElement(name);
        for (var key in attributes) {
            elem.setAttribute(key,attributes[key]);
        }
        if(text) {
            elem.appendChild(document.createTextNode(text));
        }
        return elem
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
                if(this_element.nodeName == "INPUT" && this_element.type =="submit") { //FIXME - should find other submitting-buttons too! e.g. <button> or <input type='button'>
                    log.debug("Found a submit button");
                    submit_buttons.push(this_element);
                }
            }
            this.submit_button = submit_buttons;
        }
        this.initialize_dom();
    };

    Form.prototype.initialize_dom = function initialize_dom () {
            var this$1 = this;

        // set up the onchange handler for the email field
        var old_onchange = this.email_field.onchange;
        this.email_field.onchange = function (event) {
            this$1.onchange_handler(event);
            if(old_onchange) {
                old_onchange(event);
            }
        };

        //set up the onsubmit handler for the form (if there is one)
        if(this.form) {
            var old_onsubmit = this.form.onsubmit;
            this.form.onsubmit = function (event) {
                var results;
                if(old_onsubmit) {
                    results = old_onsubmit(event); //FIXME - confusing, *their* old onsubmit handler fires *first*?
                }
                if(results) {
                    return this.onsubmit_handler(event)
                }
            };
        }

        //disable submit button, if there is one - 
        this.disable_submits();
    };

    Form.prototype.disable_submits = function disable_submits () {
        this.set_submit_button_disabled(true);
    };

    Form.prototype.enable_submits = function enable_submits () {
        this.set_submit_button_disabled(false);
    };

    Form.prototype.set_submit_button_disabled = function set_submit_button_disabled (state) {
        if(this.submit_button) {
            log.debug("Trying to disable submit button...");
            if(is_array(this.submit_button)) {
                log.debug("Submit button IS ARRAY");
                for(var x in this.submit_button) {
                    this.submit_button[x].disabled = state;
                }
            } else {
                this.submit_button.disabled = state;
            }
        }
    };

    Form.prototype.onchange_handler = function onchange_handler (event) {
            var this$1 = this;

        this.verify(this.email_field.value, function (results) {
            log.debug("Verification results are: ");
            log.debugdir(results);
            switch(results.status) {
                case "BAD":
                //FIRE HOOKS FIRST? FIXME
                if(!this$1.mytooltip) {
                    this$1.mytooltip = new Tooltip(this$1.email_field, {placement: 'bottom', title: 'Bad Email Address', trigger: 'manual'});
                }
                this$1.mytooltip.show();
                this$1.disable_submits();
                break

                case "GOOD": //FIXME copypasta EVERYWHERE
                //FIRE HOOKS FIRST? FIXME
                if(this$1.mytooltip) {
                    this$1.mytooltip.hide();
                }
                this$1.insert_checksum(results.checksum);
                this$1.insert_status(results.status);
                this$1.enable_submits();
                break

                case "CHALLENGE":
                //FIRE HOOKS FIRST? FIXME
                ///uh....throw up a prompt?
                this$1.display_challenge_modal(results.challenge_key);
                break
                //no idea!
            }
        });
    };

    Form.prototype.insert_checksum = function insert_checksum (value) {
        var checksum_element = document.getElementById('goodverification_checksum');
        if(checksum_element) {
            checksum_element.value = value;
            return
        }

        this.form.appendChild(node_creator('input', {'type': 'hidden','name': 'checksum','value': value,'id': 'goodverification_checksum'}));
    };

    Form.prototype.insert_status = function insert_status (status) { //FIXME this is copypasta relative to insert_checksum()
        var status_element = document.getElementById('goodverification_status');
        if(status_element) {
            status_element.value = status;
            return
        }

        this.form.appendChild(node_creator('input', {'type': 'hidden','name': 'status','value': status,'id': 'goodverification_status'})); //FIXME that name is going to collide
    };

    Form.prototype.get_modal = function get_modal (challenge_key) {
            var this$1 = this;
     //TODO - this needs breaking up, it's a little rambly
        log.debug("Getting modal - challenge key is: "+challenge_key);
        if(!this.modal) {
            /*
            need to insert this right before the close-body tag. How in the hell will we do that?!
            document.body gives us the body tag
            .appendChild() will let you insert nodes, I guess?

            <!-- Container -->
            <div id="modal-1" aria-hidden="true">
                <!-- Overlay -->
                <div tabindex="-1" data-micromodal-close>
                    <!-- Container -->
                    <div role="dialog" aria-modal="true" aria-labelledby="modal-1-title" >
                        <header>
                            <h2 id="modal-1-title">
                            Modal Title
                            </h2>

                            <!-- [4] -->
                            <button aria-label="Close modal" data-micromodal-close></button>
                        </header>

                        <div id="modal-1-content">
                            Modal Content
                        </div>
                    </div>
                </div>
            </div>
            */
            /*
            //something I'm thinking about - doesn't work yet, and it doesn't make sense because
            you can't have two div's at the same level. But maybe something like this? Clever array stuff?
            Dunno. 
            var _test = {div: [{id: "modal-1","aria-hidden": true},{ //use native JS types; automatically cast bool to text
                div: [{tabindex: -1,"data-micromodal-close: ""},{ //use integer type, cast to text
                    div: [{role: "dialog","aria-modal": true,"aria-labelledby":"modal-1-title"},{
                        header: [{},{
                            h2: [{id: "modal-1-title"},"Modal Title"], //detect text?
                            button: [{"aria-label": "Close modal","data-micromodal-close":""},{}] //omit?
                        },
                        div: [{id: "modal-1-content"},"Modal Content"]] //text!
                    }]
                }]
            }]}

            if you needed *TWO* divs or something, you could do:

            {div: [{id: "blah"},[
                {div: [{},{}]},
                {div: [{},{}]}
            ]]}
            */

            //FIXME prolly need to rename all of these classes to something unique
            //FIXME will need to update the CSS accordingly as well.
            var modal = node_creator("div", {"id": "goodverification-modal", "aria-hidden":"true", "class": "modal micromodal-slide"});

            var overlay = node_creator("div", {"tabindex": "-1", "data-micromodal-close": "", "class": "modal__overlay"});

            var container = node_creator("div", {"role": "dialog","aria-modal": "true", "aria-labelledby": "modal-1-title", "class": "modal__container"});
                
            var header = node_creator("header", {"class":"modal__header"});
                
            var h2 = node_creator("h2", {"id": "modal-1-title","class": "modal__title"},"Too Many Verifications");

            var close_button = node_creator("button", {"aria-label": "Close modal","data-micromodal-close": "", "class": "modal__close"});

            header.appendChild(h2);
            header.appendChild(close_button);

            var content = node_creator("div", {"id":"modal-1-content","class": "modal__content"},  "Too many verifications from this IP. We need to send you an email to verify that you are you! "+
            "If you agree, re-type your email here: ");
            var input = node_creator("input", {"type": "text","id": "goodverification_challenge_address"});
            content.appendChild(input);

            var footer = node_creator("footer", {"class":"modal__footer"});
            var button = node_creator("button", {"class":"modal__btn modal__btn-primary"},"Continue");
            button.onclick = function () {
                if(this$1.email_field.value != document.getElementById('goodverification_challenge_address').value) {
                    log.debug("Field value: "+this$1.email_field.value+" , challenge_address: "+document.getElementById('goodverification_challenge_address').value);
                    document.getElementById("modal-1-content").innerHTML = "Email doesn't match field on form!"; //FIXME - don't use innerHTML
                    //this.modal.setContent("Email doesn't match field on form!")
                    //can we yank the 'submit' button? FIXME!
                    return
                }
                this$1.challenge(this$1.email_field.value,challenge_key, function (results) {
                    log.debug("Challenge results are: ");
                    log.debugdir(results);
                    if(results.status == "ACCEPTED") {
                        document.getElementById("modal-1-content").innerHTML = "Input emailed PIN: <input type='text' id='goodverification_pin' />"; // FIXME - don't use innerHTML?
                        button.onclick = function () {
                            var pin = document.getElementById('goodverification_pin').value;
                            this$1.response(this$1.email_field.value,challenge_key, pin, function (response) {
                                log.debugdir(response);
                                if(response.status == "GOOD") {
                                    MicroModal.close('goodverification-modal');
                                    this$1.insert_checksum(response.checksum);
                                    this$1.insert_status(response.status);
                                    this$1.enable_submits();
                                }
                            });
                        };
                        //this.modal.setContent("Input emailed PIN: <input type='text' id='goodverification_pin' />")
                    } else {
                        window.alert("Challenge rejected!"); //FIXME - should never happen tho!
                    }
                });
            };
            footer.appendChild(button);
            footer.appendChild(node_creator("button",{"class": "modal__btn","data-micromodal-close": "","aria-label":"Close this dialog window"},"Close"));

            container.appendChild(header);
            container.appendChild(content);
            container.appendChild(footer);

            overlay.appendChild(container);
            modal.appendChild(overlay);

            document.body.appendChild(modal);
            this.modal = true;
        }
        return this.modal
    };

    Form.prototype.display_challenge_modal = function display_challenge_modal (challenge_key) {
        this.get_modal(challenge_key);
        MicroModal.show('goodverification-modal',{
            debugMode: true,
            awaitCloseAnimation: true,
            onShow: function (modal) { return console.info(((modal.id) + " is shown")); },
            onClose: function (modal) { return console.info(((modal.id) + " is hidden")); }, 
        });
        /* 
        if(!this.modal) {
            this.modal = new tingle.modal({
                footer: true,
                stickyFooter: false,
                closeMethods: ['button'], // ['overlay', 'button', 'escape'],
                closeLabel: "Close",
                //cssClass: ['custom-class-1', 'custom-class-2'],
                onOpen: function() {
                    console.log('modal open')
                },
                onClose: function() {
                    console.log('modal closed')
                },
                beforeClose: function() {
                    // here's goes some logic
                    // e.g. save content before closing the modal
                    return true // close the modal
                    //return false; // nothing happens
                }
            })
            this.modal.addFooterBtn('Cancel', 'tingle-btn', () => {
                // here goes some logic
                this.modal.close()
            })
                
            this.modal.addFooterBtn('Send Challenge Email', 'tingle-btn tingle-btn--primary', () => {
                // here goes some logic
                if(this.email_field.value != document.getElementById('goodverification_challenge_address').value) {
                    log.debug("Field value: "+this.email_field.value+" , challenge_address: "+document.getElementById('goodverification_challenge_address').value)
                    this.modal.setContent("Email doesn't match field on form!")
                    //can we yank the 'submit' button? FIXME!
                    return
                }
                this.challenge(this.email_field.value,challenge_key, (results) => {
                    log.debug("Challenge results are: "+results)
                    console.dir(results)
                    if(results.status == "ACCEPTED") {
                        this.modal.setContent("Input emailed PIN: <input type='text' id='goodverification_pin' />")
                    }
                })
                //this.modal.close()
            })
        }
        this.modal.setContent("Too many verifications from this IP. We need to send you an email to verify that you are you! "+
                                "If you agree, re-type your email here: <input type='text' id='goodverification_challenge_address' />")
        this.modal.open()
        */
    };

    Form.prototype.onsubmit_handler = function onsubmit_handler (event) {
        DO_SOMETHING_CLEVERER();
        jsonp("url");
    };

    Form.prototype.verify = function verify (email, callback) {
        jsonp({url: HOST+"/verify",
            data: {email: email, form_key: this.form_key}, 
            success: function (data) {
                if(data.error) {
                    log.error(data.error);
                }
                callback(data);
            }
        });
    };

    Form.prototype.challenge = function challenge (email, challenge_key, callback) {
        jsonp({url: HOST+"/challenge",
            data: {email: email, form_key: this.form_key, challenge_key: challenge_key},
            success: function (data) {
                callback(data);
                // switch(data.status) {
                // case "GOOD":

                // }
            }
        });
    };

    Form.prototype.response = function response (email, challenge_key, pin, callback) {
            var this$1 = this;

        jsonp({url: HOST+"/response",
            data: {email: email, challenge_key: challenge_key, pin: pin, form_key: this.form_key},
            success: function (data) {
                if(this$1.mytooltip) {
                    this$1.mytooltip.hide();
                }
                this$1.enable_submits();

                callback(data);
            
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
            return
        }
        if(!options || (!options.email_field && !options.manual)) {
            return auto(form_key, options)
        }
        return new Form(form_key, options)
    }

    return index;

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJsb2dnaW5nLmpzIiwidXRpbHMuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1qc29ucC9saWIvanNvbnAuanMiLCJub2RlX21vZHVsZXMvcG9wcGVyLmpzL2Rpc3QvZXNtL3BvcHBlci5qcyIsIm5vZGVfbW9kdWxlcy90b29sdGlwLmpzL2Rpc3QvZXNtL3Rvb2x0aXAuanMiLCJub2RlX21vZHVsZXMvbWljcm9tb2RhbC9kaXN0L21pY3JvbW9kYWwuZXMuanMiLCJub2RlX21vZHVsZXMvc3R5bGUtaW5qZWN0L2Rpc3Qvc3R5bGUtaW5qZWN0LmVzLmpzIiwiZm9ybS5qcyIsImF1dG8uanMiLCJpbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBMb2cge1xuICAgIGNvbnN0cnVjdG9yKGRlYnVnX2VuYWJsZWQgPSBmYWxzZSkge1xuICAgICAgICB0aGlzLmRlYnVnX2VuYWJsZWQgPSBkZWJ1Z19lbmFibGVkXG4gICAgfVxuXG4gICAgZXJyb3IobXNnKSB7XG4gICAgICAgIGlmKCF0aGlzLmxvZ19hdF9sZXZlbCgnZXJyb3InLG1zZykpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hbGVydChcIkVycm9yOiBcIittc2cpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWJ1Zyhtc2cpIHtcbiAgICAgICAgaWYodGhpcy5kZWJ1Z19lbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ19hdF9sZXZlbCgnZGVidWcnLG1zZylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlYnVnZGlyKG1zZykge1xuICAgICAgICBpZih0aGlzLmRlYnVnX2VuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nX2F0X2xldmVsKCdkaXInLG1zZylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvZ19hdF9sZXZlbChsZXZlbCxtc2cpIHtcbiAgICAgICAgaWYoY29uc29sZSAmJiBjb25zb2xlW2xldmVsXSkge1xuICAgICAgICAgICAgY29uc29sZVtsZXZlbF0obXNnKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG59XG5cbnZhciBsb2cgPSBuZXcgTG9nKClcblxuXG5leHBvcnQgZGVmYXVsdCBsb2dcblxuLy9kZWJ1ZyxpbmZvLHdhcm4sZXJyb3IiLCJleHBvcnQgZnVuY3Rpb24gZHVwbGljYXRlIChvYmopIHtcbiAgICAvL25haXZlLCBzaW5nbGUtbGV2ZWwsIG5vbi1kZWVwICdkdXBsaWNhdGUnIGZ1bmN0aW9uIGZvciBvYmplY3RzXG4gICAgbGV0IG5ld29iaj17fVxuICAgIGZvcihsZXQgaSBpbiBvYmopIHtcbiAgICAgICAgbmV3b2JqW2ldID0gb2JqW2ldXG4gICAgfVxuICAgIHJldHVybiBuZXdvYmpcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzX2FycmF5KG9iaikge1xuICAgIC8vIGNvbnNvbGUud2FybihcIlRoZSBwcm90b3R5cGUgdGhpbmcgaXM6IFwiK09iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopKVxuICAgIGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09IFwiW29iamVjdCBBcnJheV1cIikge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2Vcbn0iLCIoZnVuY3Rpb24oKSB7XG4gIHZhciBKU09OUCwgY29tcHV0ZWRVcmwsIGNyZWF0ZUVsZW1lbnQsIGVuY29kZSwgbm9vcCwgb2JqZWN0VG9VUkksIHJhbmRvbSwgcmFuZG9tU3RyaW5nO1xuXG4gIGNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbih0YWcpIHtcbiAgICByZXR1cm4gd2luZG93LmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgfTtcblxuICBlbmNvZGUgPSB3aW5kb3cuZW5jb2RlVVJJQ29tcG9uZW50O1xuXG4gIHJhbmRvbSA9IE1hdGgucmFuZG9tO1xuXG4gIEpTT05QID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHZhciBjYWxsYmFjaywgY2FsbGJhY2tGdW5jLCBjYWxsYmFja05hbWUsIGRvbmUsIGhlYWQsIHBhcmFtcywgc2NyaXB0O1xuICAgIGlmIChvcHRpb25zID09IG51bGwpIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgcGFyYW1zID0ge1xuICAgICAgZGF0YTogb3B0aW9ucy5kYXRhIHx8IHt9LFxuICAgICAgZXJyb3I6IG9wdGlvbnMuZXJyb3IgfHwgbm9vcCxcbiAgICAgIHN1Y2Nlc3M6IG9wdGlvbnMuc3VjY2VzcyB8fCBub29wLFxuICAgICAgYmVmb3JlU2VuZDogb3B0aW9ucy5iZWZvcmVTZW5kIHx8IG5vb3AsXG4gICAgICBjb21wbGV0ZTogb3B0aW9ucy5jb21wbGV0ZSB8fCBub29wLFxuICAgICAgdXJsOiBvcHRpb25zLnVybCB8fCAnJ1xuICAgIH07XG4gICAgcGFyYW1zLmNvbXB1dGVkVXJsID0gY29tcHV0ZWRVcmwocGFyYW1zKTtcbiAgICBpZiAocGFyYW1zLnVybC5sZW5ndGggPT09IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZ1VybCcpO1xuICAgIH1cbiAgICBkb25lID0gZmFsc2U7XG4gICAgaWYgKHBhcmFtcy5iZWZvcmVTZW5kKHt9LCBwYXJhbXMpICE9PSBmYWxzZSkge1xuICAgICAgY2FsbGJhY2tOYW1lID0gb3B0aW9ucy5jYWxsYmFja05hbWUgfHwgJ2NhbGxiYWNrJztcbiAgICAgIGNhbGxiYWNrRnVuYyA9IG9wdGlvbnMuY2FsbGJhY2tGdW5jIHx8ICdqc29ucF8nICsgcmFuZG9tU3RyaW5nKDE1KTtcbiAgICAgIGNhbGxiYWNrID0gcGFyYW1zLmRhdGFbY2FsbGJhY2tOYW1lXSA9IGNhbGxiYWNrRnVuYztcbiAgICAgIHdpbmRvd1tjYWxsYmFja10gPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHdpbmRvd1tjYWxsYmFja10gPSBudWxsO1xuICAgICAgICBwYXJhbXMuc3VjY2VzcyhkYXRhLCBwYXJhbXMpO1xuICAgICAgICByZXR1cm4gcGFyYW1zLmNvbXBsZXRlKGRhdGEsIHBhcmFtcyk7XG4gICAgICB9O1xuICAgICAgc2NyaXB0ID0gY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgICBzY3JpcHQuc3JjID0gY29tcHV0ZWRVcmwocGFyYW1zKTtcbiAgICAgIHNjcmlwdC5hc3luYyA9IHRydWU7XG4gICAgICBzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICBwYXJhbXMuZXJyb3Ioe1xuICAgICAgICAgIHVybDogc2NyaXB0LnNyYyxcbiAgICAgICAgICBldmVudDogZXZ0XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcGFyYW1zLmNvbXBsZXRlKHtcbiAgICAgICAgICB1cmw6IHNjcmlwdC5zcmMsXG4gICAgICAgICAgZXZlbnQ6IGV2dFxuICAgICAgICB9LCBwYXJhbXMpO1xuICAgICAgfTtcbiAgICAgIHNjcmlwdC5vbmxvYWQgPSBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWYsIHJlZjE7XG4gICAgICAgIGlmIChkb25lIHx8ICgocmVmID0gdGhpcy5yZWFkeVN0YXRlKSAhPT0gJ2xvYWRlZCcgJiYgcmVmICE9PSAnY29tcGxldGUnKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgaWYgKHNjcmlwdCkge1xuICAgICAgICAgIHNjcmlwdC5vbmxvYWQgPSBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICBpZiAoKHJlZjEgPSBzY3JpcHQucGFyZW50Tm9kZSkgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmVmMS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGhlYWQgPSB3aW5kb3cuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXSB8fCB3aW5kb3cuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgaGVhZC5pbnNlcnRCZWZvcmUoc2NyaXB0LCBoZWFkLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgYWJvcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3dbY2FsbGJhY2tdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIHdpbmRvd1tjYWxsYmFja10gPSBudWxsO1xuICAgICAgICB9O1xuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgaWYgKHNjcmlwdCAhPSBudWxsID8gc2NyaXB0LnBhcmVudE5vZGUgOiB2b2lkIDApIHtcbiAgICAgICAgICBzY3JpcHQub25sb2FkID0gc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgICByZXR1cm4gc2NyaXB0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgbm9vcCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB2b2lkIDA7XG4gIH07XG5cbiAgY29tcHV0ZWRVcmwgPSBmdW5jdGlvbihwYXJhbXMpIHtcbiAgICB2YXIgdXJsO1xuICAgIHVybCA9IHBhcmFtcy51cmw7XG4gICAgdXJsICs9IHBhcmFtcy51cmwuaW5kZXhPZignPycpIDwgMCA/ICc/JyA6ICcmJztcbiAgICB1cmwgKz0gb2JqZWN0VG9VUkkocGFyYW1zLmRhdGEpO1xuICAgIHJldHVybiB1cmw7XG4gIH07XG5cbiAgcmFuZG9tU3RyaW5nID0gZnVuY3Rpb24obGVuZ3RoKSB7XG4gICAgdmFyIHN0cjtcbiAgICBzdHIgPSAnJztcbiAgICB3aGlsZSAoc3RyLmxlbmd0aCA8IGxlbmd0aCkge1xuICAgICAgc3RyICs9IHJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zbGljZSgyLCAzKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0cjtcbiAgfTtcblxuICBvYmplY3RUb1VSSSA9IGZ1bmN0aW9uKG9iaikge1xuICAgIHZhciBkYXRhLCBrZXksIHZhbHVlO1xuICAgIGRhdGEgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoa2V5IGluIG9iaikge1xuICAgICAgICB2YWx1ZSA9IG9ialtrZXldO1xuICAgICAgICByZXN1bHRzLnB1c2goZW5jb2RlKGtleSkgKyAnPScgKyBlbmNvZGUodmFsdWUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gICAgcmV0dXJuIGRhdGEuam9pbignJicpO1xuICB9O1xuXG4gIGlmICh0eXBlb2YgZGVmaW5lICE9PSBcInVuZGVmaW5lZFwiICYmIGRlZmluZSAhPT0gbnVsbCA/IGRlZmluZS5hbWQgOiB2b2lkIDApIHtcbiAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gSlNPTlA7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUgIT09IG51bGwgPyBtb2R1bGUuZXhwb3J0cyA6IHZvaWQgMCkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gSlNPTlA7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5KU09OUCA9IEpTT05QO1xuICB9XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIvKiohXG4gKiBAZmlsZU92ZXJ2aWV3IEtpY2thc3MgbGlicmFyeSB0byBjcmVhdGUgYW5kIHBsYWNlIHBvcHBlcnMgbmVhciB0aGVpciByZWZlcmVuY2UgZWxlbWVudHMuXG4gKiBAdmVyc2lvbiAxLjE1LjBcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgRmVkZXJpY28gWml2b2xvIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG52YXIgaXNCcm93c2VyID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJztcblxudmFyIGxvbmdlclRpbWVvdXRCcm93c2VycyA9IFsnRWRnZScsICdUcmlkZW50JywgJ0ZpcmVmb3gnXTtcbnZhciB0aW1lb3V0RHVyYXRpb24gPSAwO1xuZm9yICh2YXIgaSA9IDA7IGkgPCBsb25nZXJUaW1lb3V0QnJvd3NlcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgaWYgKGlzQnJvd3NlciAmJiBuYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YobG9uZ2VyVGltZW91dEJyb3dzZXJzW2ldKSA+PSAwKSB7XG4gICAgdGltZW91dER1cmF0aW9uID0gMTtcbiAgICBicmVhaztcbiAgfVxufVxuXG5mdW5jdGlvbiBtaWNyb3Rhc2tEZWJvdW5jZShmbikge1xuICB2YXIgY2FsbGVkID0gZmFsc2U7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGNhbGxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjYWxsZWQgPSB0cnVlO1xuICAgIHdpbmRvdy5Qcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgIGNhbGxlZCA9IGZhbHNlO1xuICAgICAgZm4oKTtcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdGFza0RlYm91bmNlKGZuKSB7XG4gIHZhciBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNjaGVkdWxlZCkge1xuICAgICAgc2NoZWR1bGVkID0gdHJ1ZTtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzY2hlZHVsZWQgPSBmYWxzZTtcbiAgICAgICAgZm4oKTtcbiAgICAgIH0sIHRpbWVvdXREdXJhdGlvbik7XG4gICAgfVxuICB9O1xufVxuXG52YXIgc3VwcG9ydHNNaWNyb1Rhc2tzID0gaXNCcm93c2VyICYmIHdpbmRvdy5Qcm9taXNlO1xuXG4vKipcbiogQ3JlYXRlIGEgZGVib3VuY2VkIHZlcnNpb24gb2YgYSBtZXRob2QsIHRoYXQncyBhc3luY2hyb25vdXNseSBkZWZlcnJlZFxuKiBidXQgY2FsbGVkIGluIHRoZSBtaW5pbXVtIHRpbWUgcG9zc2libGUuXG4qXG4qIEBtZXRob2RcbiogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuKiBAYXJndW1lbnQge0Z1bmN0aW9ufSBmblxuKiBAcmV0dXJucyB7RnVuY3Rpb259XG4qL1xudmFyIGRlYm91bmNlID0gc3VwcG9ydHNNaWNyb1Rhc2tzID8gbWljcm90YXNrRGVib3VuY2UgOiB0YXNrRGVib3VuY2U7XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIHZhcmlhYmxlIGlzIGEgZnVuY3Rpb25cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7QW55fSBmdW5jdGlvblRvQ2hlY2sgLSB2YXJpYWJsZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IGFuc3dlciB0bzogaXMgYSBmdW5jdGlvbj9cbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbihmdW5jdGlvblRvQ2hlY2spIHtcbiAgdmFyIGdldFR5cGUgPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uVG9DaGVjayAmJiBnZXRUeXBlLnRvU3RyaW5nLmNhbGwoZnVuY3Rpb25Ub0NoZWNrKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBHZXQgQ1NTIGNvbXB1dGVkIHByb3BlcnR5IG9mIHRoZSBnaXZlbiBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VlbWVudH0gZWxlbWVudFxuICogQGFyZ3VtZW50IHtTdHJpbmd9IHByb3BlcnR5XG4gKi9cbmZ1bmN0aW9uIGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShlbGVtZW50LCBwcm9wZXJ0eSkge1xuICBpZiAoZWxlbWVudC5ub2RlVHlwZSAhPT0gMSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuICAvLyBOT1RFOiAxIERPTSBhY2Nlc3MgaGVyZVxuICB2YXIgd2luZG93ID0gZWxlbWVudC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICB2YXIgY3NzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCk7XG4gIHJldHVybiBwcm9wZXJ0eSA/IGNzc1twcm9wZXJ0eV0gOiBjc3M7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgcGFyZW50Tm9kZSBvciB0aGUgaG9zdCBvZiB0aGUgZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7RWxlbWVudH0gcGFyZW50XG4gKi9cbmZ1bmN0aW9uIGdldFBhcmVudE5vZGUoZWxlbWVudCkge1xuICBpZiAoZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cbiAgcmV0dXJuIGVsZW1lbnQucGFyZW50Tm9kZSB8fCBlbGVtZW50Lmhvc3Q7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgc2Nyb2xsaW5nIHBhcmVudCBvZiB0aGUgZ2l2ZW4gZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7RWxlbWVudH0gc2Nyb2xsIHBhcmVudFxuICovXG5mdW5jdGlvbiBnZXRTY3JvbGxQYXJlbnQoZWxlbWVudCkge1xuICAvLyBSZXR1cm4gYm9keSwgYGdldFNjcm9sbGAgd2lsbCB0YWtlIGNhcmUgdG8gZ2V0IHRoZSBjb3JyZWN0IGBzY3JvbGxUb3BgIGZyb20gaXRcbiAgaWYgKCFlbGVtZW50KSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmJvZHk7XG4gIH1cblxuICBzd2l0Y2ggKGVsZW1lbnQubm9kZU5hbWUpIHtcbiAgICBjYXNlICdIVE1MJzpcbiAgICBjYXNlICdCT0RZJzpcbiAgICAgIHJldHVybiBlbGVtZW50Lm93bmVyRG9jdW1lbnQuYm9keTtcbiAgICBjYXNlICcjZG9jdW1lbnQnOlxuICAgICAgcmV0dXJuIGVsZW1lbnQuYm9keTtcbiAgfVxuXG4gIC8vIEZpcmVmb3ggd2FudCB1cyB0byBjaGVjayBgLXhgIGFuZCBgLXlgIHZhcmlhdGlvbnMgYXMgd2VsbFxuXG4gIHZhciBfZ2V0U3R5bGVDb21wdXRlZFByb3AgPSBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHkoZWxlbWVudCksXG4gICAgICBvdmVyZmxvdyA9IF9nZXRTdHlsZUNvbXB1dGVkUHJvcC5vdmVyZmxvdyxcbiAgICAgIG92ZXJmbG93WCA9IF9nZXRTdHlsZUNvbXB1dGVkUHJvcC5vdmVyZmxvd1gsXG4gICAgICBvdmVyZmxvd1kgPSBfZ2V0U3R5bGVDb21wdXRlZFByb3Aub3ZlcmZsb3dZO1xuXG4gIGlmICgvKGF1dG98c2Nyb2xsfG92ZXJsYXkpLy50ZXN0KG92ZXJmbG93ICsgb3ZlcmZsb3dZICsgb3ZlcmZsb3dYKSkge1xuICAgIHJldHVybiBlbGVtZW50O1xuICB9XG5cbiAgcmV0dXJuIGdldFNjcm9sbFBhcmVudChnZXRQYXJlbnROb2RlKGVsZW1lbnQpKTtcbn1cblxudmFyIGlzSUUxMSA9IGlzQnJvd3NlciAmJiAhISh3aW5kb3cuTVNJbnB1dE1ldGhvZENvbnRleHQgJiYgZG9jdW1lbnQuZG9jdW1lbnRNb2RlKTtcbnZhciBpc0lFMTAgPSBpc0Jyb3dzZXIgJiYgL01TSUUgMTAvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0aGUgYnJvd3NlciBpcyBJbnRlcm5ldCBFeHBsb3JlclxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtOdW1iZXJ9IHZlcnNpb24gdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSBpc0lFXG4gKi9cbmZ1bmN0aW9uIGlzSUUodmVyc2lvbikge1xuICBpZiAodmVyc2lvbiA9PT0gMTEpIHtcbiAgICByZXR1cm4gaXNJRTExO1xuICB9XG4gIGlmICh2ZXJzaW9uID09PSAxMCkge1xuICAgIHJldHVybiBpc0lFMTA7XG4gIH1cbiAgcmV0dXJuIGlzSUUxMSB8fCBpc0lFMTA7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgb2Zmc2V0IHBhcmVudCBvZiB0aGUgZ2l2ZW4gZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7RWxlbWVudH0gb2Zmc2V0IHBhcmVudFxuICovXG5mdW5jdGlvbiBnZXRPZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuICBpZiAoIWVsZW1lbnQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB9XG5cbiAgdmFyIG5vT2Zmc2V0UGFyZW50ID0gaXNJRSgxMCkgPyBkb2N1bWVudC5ib2R5IDogbnVsbDtcblxuICAvLyBOT1RFOiAxIERPTSBhY2Nlc3MgaGVyZVxuICB2YXIgb2Zmc2V0UGFyZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQgfHwgbnVsbDtcbiAgLy8gU2tpcCBoaWRkZW4gZWxlbWVudHMgd2hpY2ggZG9uJ3QgaGF2ZSBhbiBvZmZzZXRQYXJlbnRcbiAgd2hpbGUgKG9mZnNldFBhcmVudCA9PT0gbm9PZmZzZXRQYXJlbnQgJiYgZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICBvZmZzZXRQYXJlbnQgPSAoZWxlbWVudCA9IGVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nKS5vZmZzZXRQYXJlbnQ7XG4gIH1cblxuICB2YXIgbm9kZU5hbWUgPSBvZmZzZXRQYXJlbnQgJiYgb2Zmc2V0UGFyZW50Lm5vZGVOYW1lO1xuXG4gIGlmICghbm9kZU5hbWUgfHwgbm9kZU5hbWUgPT09ICdCT0RZJyB8fCBub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQgPyBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB9XG5cbiAgLy8gLm9mZnNldFBhcmVudCB3aWxsIHJldHVybiB0aGUgY2xvc2VzdCBUSCwgVEQgb3IgVEFCTEUgaW4gY2FzZVxuICAvLyBubyBvZmZzZXRQYXJlbnQgaXMgcHJlc2VudCwgSSBoYXRlIHRoaXMgam9iLi4uXG4gIGlmIChbJ1RIJywgJ1REJywgJ1RBQkxFJ10uaW5kZXhPZihvZmZzZXRQYXJlbnQubm9kZU5hbWUpICE9PSAtMSAmJiBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHkob2Zmc2V0UGFyZW50LCAncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcbiAgICByZXR1cm4gZ2V0T2Zmc2V0UGFyZW50KG9mZnNldFBhcmVudCk7XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0UGFyZW50O1xufVxuXG5mdW5jdGlvbiBpc09mZnNldENvbnRhaW5lcihlbGVtZW50KSB7XG4gIHZhciBub2RlTmFtZSA9IGVsZW1lbnQubm9kZU5hbWU7XG5cbiAgaWYgKG5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIG5vZGVOYW1lID09PSAnSFRNTCcgfHwgZ2V0T2Zmc2V0UGFyZW50KGVsZW1lbnQuZmlyc3RFbGVtZW50Q2hpbGQpID09PSBlbGVtZW50O1xufVxuXG4vKipcbiAqIEZpbmRzIHRoZSByb290IG5vZGUgKGRvY3VtZW50LCBzaGFkb3dET00gcm9vdCkgb2YgdGhlIGdpdmVuIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gbm9kZVxuICogQHJldHVybnMge0VsZW1lbnR9IHJvb3Qgbm9kZVxuICovXG5mdW5jdGlvbiBnZXRSb290KG5vZGUpIHtcbiAgaWYgKG5vZGUucGFyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgIHJldHVybiBnZXRSb290KG5vZGUucGFyZW50Tm9kZSk7XG4gIH1cblxuICByZXR1cm4gbm9kZTtcbn1cblxuLyoqXG4gKiBGaW5kcyB0aGUgb2Zmc2V0IHBhcmVudCBjb21tb24gdG8gdGhlIHR3byBwcm92aWRlZCBub2Rlc1xuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50MVxuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50MlxuICogQHJldHVybnMge0VsZW1lbnR9IGNvbW1vbiBvZmZzZXQgcGFyZW50XG4gKi9cbmZ1bmN0aW9uIGZpbmRDb21tb25PZmZzZXRQYXJlbnQoZWxlbWVudDEsIGVsZW1lbnQyKSB7XG4gIC8vIFRoaXMgY2hlY2sgaXMgbmVlZGVkIHRvIGF2b2lkIGVycm9ycyBpbiBjYXNlIG9uZSBvZiB0aGUgZWxlbWVudHMgaXNuJ3QgZGVmaW5lZCBmb3IgYW55IHJlYXNvblxuICBpZiAoIWVsZW1lbnQxIHx8ICFlbGVtZW50MS5ub2RlVHlwZSB8fCAhZWxlbWVudDIgfHwgIWVsZW1lbnQyLm5vZGVUeXBlKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIC8vIEhlcmUgd2UgbWFrZSBzdXJlIHRvIGdpdmUgYXMgXCJzdGFydFwiIHRoZSBlbGVtZW50IHRoYXQgY29tZXMgZmlyc3QgaW4gdGhlIERPTVxuICB2YXIgb3JkZXIgPSBlbGVtZW50MS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbihlbGVtZW50MikgJiBOb2RlLkRPQ1VNRU5UX1BPU0lUSU9OX0ZPTExPV0lORztcbiAgdmFyIHN0YXJ0ID0gb3JkZXIgPyBlbGVtZW50MSA6IGVsZW1lbnQyO1xuICB2YXIgZW5kID0gb3JkZXIgPyBlbGVtZW50MiA6IGVsZW1lbnQxO1xuXG4gIC8vIEdldCBjb21tb24gYW5jZXN0b3IgY29udGFpbmVyXG4gIHZhciByYW5nZSA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gIHJhbmdlLnNldFN0YXJ0KHN0YXJ0LCAwKTtcbiAgcmFuZ2Uuc2V0RW5kKGVuZCwgMCk7XG4gIHZhciBjb21tb25BbmNlc3RvckNvbnRhaW5lciA9IHJhbmdlLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xuXG4gIC8vIEJvdGggbm9kZXMgYXJlIGluc2lkZSAjZG9jdW1lbnRcblxuICBpZiAoZWxlbWVudDEgIT09IGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyICYmIGVsZW1lbnQyICE9PSBjb21tb25BbmNlc3RvckNvbnRhaW5lciB8fCBzdGFydC5jb250YWlucyhlbmQpKSB7XG4gICAgaWYgKGlzT2Zmc2V0Q29udGFpbmVyKGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyKSkge1xuICAgICAgcmV0dXJuIGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRPZmZzZXRQYXJlbnQoY29tbW9uQW5jZXN0b3JDb250YWluZXIpO1xuICB9XG5cbiAgLy8gb25lIG9mIHRoZSBub2RlcyBpcyBpbnNpZGUgc2hhZG93RE9NLCBmaW5kIHdoaWNoIG9uZVxuICB2YXIgZWxlbWVudDFyb290ID0gZ2V0Um9vdChlbGVtZW50MSk7XG4gIGlmIChlbGVtZW50MXJvb3QuaG9zdCkge1xuICAgIHJldHVybiBmaW5kQ29tbW9uT2Zmc2V0UGFyZW50KGVsZW1lbnQxcm9vdC5ob3N0LCBlbGVtZW50Mik7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZpbmRDb21tb25PZmZzZXRQYXJlbnQoZWxlbWVudDEsIGdldFJvb3QoZWxlbWVudDIpLmhvc3QpO1xuICB9XG59XG5cbi8qKlxuICogR2V0cyB0aGUgc2Nyb2xsIHZhbHVlIG9mIHRoZSBnaXZlbiBlbGVtZW50IGluIHRoZSBnaXZlbiBzaWRlICh0b3AgYW5kIGxlZnQpXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBzaWRlIGB0b3BgIG9yIGBsZWZ0YFxuICogQHJldHVybnMge251bWJlcn0gYW1vdW50IG9mIHNjcm9sbGVkIHBpeGVsc1xuICovXG5mdW5jdGlvbiBnZXRTY3JvbGwoZWxlbWVudCkge1xuICB2YXIgc2lkZSA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJ3RvcCc7XG5cbiAgdmFyIHVwcGVyU2lkZSA9IHNpZGUgPT09ICd0b3AnID8gJ3Njcm9sbFRvcCcgOiAnc2Nyb2xsTGVmdCc7XG4gIHZhciBub2RlTmFtZSA9IGVsZW1lbnQubm9kZU5hbWU7XG5cbiAgaWYgKG5vZGVOYW1lID09PSAnQk9EWScgfHwgbm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgIHZhciBodG1sID0gZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICB2YXIgc2Nyb2xsaW5nRWxlbWVudCA9IGVsZW1lbnQub3duZXJEb2N1bWVudC5zY3JvbGxpbmdFbGVtZW50IHx8IGh0bWw7XG4gICAgcmV0dXJuIHNjcm9sbGluZ0VsZW1lbnRbdXBwZXJTaWRlXTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50W3VwcGVyU2lkZV07XG59XG5cbi8qXG4gKiBTdW0gb3Igc3VidHJhY3QgdGhlIGVsZW1lbnQgc2Nyb2xsIHZhbHVlcyAobGVmdCBhbmQgdG9wKSBmcm9tIGEgZ2l2ZW4gcmVjdCBvYmplY3RcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWN0IC0gUmVjdCBvYmplY3QgeW91IHdhbnQgdG8gY2hhbmdlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50IC0gVGhlIGVsZW1lbnQgZnJvbSB0aGUgZnVuY3Rpb24gcmVhZHMgdGhlIHNjcm9sbCB2YWx1ZXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc3VidHJhY3QgLSBzZXQgdG8gdHJ1ZSBpZiB5b3Ugd2FudCB0byBzdWJ0cmFjdCB0aGUgc2Nyb2xsIHZhbHVlc1xuICogQHJldHVybiB7T2JqZWN0fSByZWN0IC0gVGhlIG1vZGlmaWVyIHJlY3Qgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGluY2x1ZGVTY3JvbGwocmVjdCwgZWxlbWVudCkge1xuICB2YXIgc3VidHJhY3QgPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuXG4gIHZhciBzY3JvbGxUb3AgPSBnZXRTY3JvbGwoZWxlbWVudCwgJ3RvcCcpO1xuICB2YXIgc2Nyb2xsTGVmdCA9IGdldFNjcm9sbChlbGVtZW50LCAnbGVmdCcpO1xuICB2YXIgbW9kaWZpZXIgPSBzdWJ0cmFjdCA/IC0xIDogMTtcbiAgcmVjdC50b3AgKz0gc2Nyb2xsVG9wICogbW9kaWZpZXI7XG4gIHJlY3QuYm90dG9tICs9IHNjcm9sbFRvcCAqIG1vZGlmaWVyO1xuICByZWN0LmxlZnQgKz0gc2Nyb2xsTGVmdCAqIG1vZGlmaWVyO1xuICByZWN0LnJpZ2h0ICs9IHNjcm9sbExlZnQgKiBtb2RpZmllcjtcbiAgcmV0dXJuIHJlY3Q7XG59XG5cbi8qXG4gKiBIZWxwZXIgdG8gZGV0ZWN0IGJvcmRlcnMgb2YgYSBnaXZlbiBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcGFyYW0ge0NTU1N0eWxlRGVjbGFyYXRpb259IHN0eWxlc1xuICogUmVzdWx0IG9mIGBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHlgIG9uIHRoZSBnaXZlbiBlbGVtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30gYXhpcyAtIGB4YCBvciBgeWBcbiAqIEByZXR1cm4ge251bWJlcn0gYm9yZGVycyAtIFRoZSBib3JkZXJzIHNpemUgb2YgdGhlIGdpdmVuIGF4aXNcbiAqL1xuXG5mdW5jdGlvbiBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsIGF4aXMpIHtcbiAgdmFyIHNpZGVBID0gYXhpcyA9PT0gJ3gnID8gJ0xlZnQnIDogJ1RvcCc7XG4gIHZhciBzaWRlQiA9IHNpZGVBID09PSAnTGVmdCcgPyAnUmlnaHQnIDogJ0JvdHRvbSc7XG5cbiAgcmV0dXJuIHBhcnNlRmxvYXQoc3R5bGVzWydib3JkZXInICsgc2lkZUEgKyAnV2lkdGgnXSwgMTApICsgcGFyc2VGbG9hdChzdHlsZXNbJ2JvcmRlcicgKyBzaWRlQiArICdXaWR0aCddLCAxMCk7XG59XG5cbmZ1bmN0aW9uIGdldFNpemUoYXhpcywgYm9keSwgaHRtbCwgY29tcHV0ZWRTdHlsZSkge1xuICByZXR1cm4gTWF0aC5tYXgoYm9keVsnb2Zmc2V0JyArIGF4aXNdLCBib2R5WydzY3JvbGwnICsgYXhpc10sIGh0bWxbJ2NsaWVudCcgKyBheGlzXSwgaHRtbFsnb2Zmc2V0JyArIGF4aXNdLCBodG1sWydzY3JvbGwnICsgYXhpc10sIGlzSUUoMTApID8gcGFyc2VJbnQoaHRtbFsnb2Zmc2V0JyArIGF4aXNdKSArIHBhcnNlSW50KGNvbXB1dGVkU3R5bGVbJ21hcmdpbicgKyAoYXhpcyA9PT0gJ0hlaWdodCcgPyAnVG9wJyA6ICdMZWZ0JyldKSArIHBhcnNlSW50KGNvbXB1dGVkU3R5bGVbJ21hcmdpbicgKyAoYXhpcyA9PT0gJ0hlaWdodCcgPyAnQm90dG9tJyA6ICdSaWdodCcpXSkgOiAwKTtcbn1cblxuZnVuY3Rpb24gZ2V0V2luZG93U2l6ZXMoZG9jdW1lbnQpIHtcbiAgdmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICB2YXIgaHRtbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgdmFyIGNvbXB1dGVkU3R5bGUgPSBpc0lFKDEwKSAmJiBnZXRDb21wdXRlZFN0eWxlKGh0bWwpO1xuXG4gIHJldHVybiB7XG4gICAgaGVpZ2h0OiBnZXRTaXplKCdIZWlnaHQnLCBib2R5LCBodG1sLCBjb21wdXRlZFN0eWxlKSxcbiAgICB3aWR0aDogZ2V0U2l6ZSgnV2lkdGgnLCBib2R5LCBodG1sLCBjb21wdXRlZFN0eWxlKVxuICB9O1xufVxuXG52YXIgY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTtcblxudmFyIGNyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpO1xuXG5cblxuXG5cbnZhciBkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbi8qKlxuICogR2l2ZW4gZWxlbWVudCBvZmZzZXRzLCBnZW5lcmF0ZSBhbiBvdXRwdXQgc2ltaWxhciB0byBnZXRCb3VuZGluZ0NsaWVudFJlY3RcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvZmZzZXRzXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBDbGllbnRSZWN0IGxpa2Ugb3V0cHV0XG4gKi9cbmZ1bmN0aW9uIGdldENsaWVudFJlY3Qob2Zmc2V0cykge1xuICByZXR1cm4gX2V4dGVuZHMoe30sIG9mZnNldHMsIHtcbiAgICByaWdodDogb2Zmc2V0cy5sZWZ0ICsgb2Zmc2V0cy53aWR0aCxcbiAgICBib3R0b206IG9mZnNldHMudG9wICsgb2Zmc2V0cy5oZWlnaHRcbiAgfSk7XG59XG5cbi8qKlxuICogR2V0IGJvdW5kaW5nIGNsaWVudCByZWN0IG9mIGdpdmVuIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm4ge09iamVjdH0gY2xpZW50IHJlY3RcbiAqL1xuZnVuY3Rpb24gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGVsZW1lbnQpIHtcbiAgdmFyIHJlY3QgPSB7fTtcblxuICAvLyBJRTEwIDEwIEZJWDogUGxlYXNlLCBkb24ndCBhc2ssIHRoZSBlbGVtZW50IGlzbid0XG4gIC8vIGNvbnNpZGVyZWQgaW4gRE9NIGluIHNvbWUgY2lyY3Vtc3RhbmNlcy4uLlxuICAvLyBUaGlzIGlzbid0IHJlcHJvZHVjaWJsZSBpbiBJRTEwIGNvbXBhdGliaWxpdHkgbW9kZSBvZiBJRTExXG4gIHRyeSB7XG4gICAgaWYgKGlzSUUoMTApKSB7XG4gICAgICByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHZhciBzY3JvbGxUb3AgPSBnZXRTY3JvbGwoZWxlbWVudCwgJ3RvcCcpO1xuICAgICAgdmFyIHNjcm9sbExlZnQgPSBnZXRTY3JvbGwoZWxlbWVudCwgJ2xlZnQnKTtcbiAgICAgIHJlY3QudG9wICs9IHNjcm9sbFRvcDtcbiAgICAgIHJlY3QubGVmdCArPSBzY3JvbGxMZWZ0O1xuICAgICAgcmVjdC5ib3R0b20gKz0gc2Nyb2xsVG9wO1xuICAgICAgcmVjdC5yaWdodCArPSBzY3JvbGxMZWZ0O1xuICAgIH0gZWxzZSB7XG4gICAgICByZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgdmFyIHJlc3VsdCA9IHtcbiAgICBsZWZ0OiByZWN0LmxlZnQsXG4gICAgdG9wOiByZWN0LnRvcCxcbiAgICB3aWR0aDogcmVjdC5yaWdodCAtIHJlY3QubGVmdCxcbiAgICBoZWlnaHQ6IHJlY3QuYm90dG9tIC0gcmVjdC50b3BcbiAgfTtcblxuICAvLyBzdWJ0cmFjdCBzY3JvbGxiYXIgc2l6ZSBmcm9tIHNpemVzXG4gIHZhciBzaXplcyA9IGVsZW1lbnQubm9kZU5hbWUgPT09ICdIVE1MJyA/IGdldFdpbmRvd1NpemVzKGVsZW1lbnQub3duZXJEb2N1bWVudCkgOiB7fTtcbiAgdmFyIHdpZHRoID0gc2l6ZXMud2lkdGggfHwgZWxlbWVudC5jbGllbnRXaWR0aCB8fCByZXN1bHQucmlnaHQgLSByZXN1bHQubGVmdDtcbiAgdmFyIGhlaWdodCA9IHNpemVzLmhlaWdodCB8fCBlbGVtZW50LmNsaWVudEhlaWdodCB8fCByZXN1bHQuYm90dG9tIC0gcmVzdWx0LnRvcDtcblxuICB2YXIgaG9yaXpTY3JvbGxiYXIgPSBlbGVtZW50Lm9mZnNldFdpZHRoIC0gd2lkdGg7XG4gIHZhciB2ZXJ0U2Nyb2xsYmFyID0gZWxlbWVudC5vZmZzZXRIZWlnaHQgLSBoZWlnaHQ7XG5cbiAgLy8gaWYgYW4gaHlwb3RoZXRpY2FsIHNjcm9sbGJhciBpcyBkZXRlY3RlZCwgd2UgbXVzdCBiZSBzdXJlIGl0J3Mgbm90IGEgYGJvcmRlcmBcbiAgLy8gd2UgbWFrZSB0aGlzIGNoZWNrIGNvbmRpdGlvbmFsIGZvciBwZXJmb3JtYW5jZSByZWFzb25zXG4gIGlmIChob3JpelNjcm9sbGJhciB8fCB2ZXJ0U2Nyb2xsYmFyKSB7XG4gICAgdmFyIHN0eWxlcyA9IGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShlbGVtZW50KTtcbiAgICBob3JpelNjcm9sbGJhciAtPSBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsICd4Jyk7XG4gICAgdmVydFNjcm9sbGJhciAtPSBnZXRCb3JkZXJzU2l6ZShzdHlsZXMsICd5Jyk7XG5cbiAgICByZXN1bHQud2lkdGggLT0gaG9yaXpTY3JvbGxiYXI7XG4gICAgcmVzdWx0LmhlaWdodCAtPSB2ZXJ0U2Nyb2xsYmFyO1xuICB9XG5cbiAgcmV0dXJuIGdldENsaWVudFJlY3QocmVzdWx0KTtcbn1cblxuZnVuY3Rpb24gZ2V0T2Zmc2V0UmVjdFJlbGF0aXZlVG9BcmJpdHJhcnlOb2RlKGNoaWxkcmVuLCBwYXJlbnQpIHtcbiAgdmFyIGZpeGVkUG9zaXRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMiAmJiBhcmd1bWVudHNbMl0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1syXSA6IGZhbHNlO1xuXG4gIHZhciBpc0lFMTAgPSBpc0lFKDEwKTtcbiAgdmFyIGlzSFRNTCA9IHBhcmVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnO1xuICB2YXIgY2hpbGRyZW5SZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KGNoaWxkcmVuKTtcbiAgdmFyIHBhcmVudFJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QocGFyZW50KTtcbiAgdmFyIHNjcm9sbFBhcmVudCA9IGdldFNjcm9sbFBhcmVudChjaGlsZHJlbik7XG5cbiAgdmFyIHN0eWxlcyA9IGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShwYXJlbnQpO1xuICB2YXIgYm9yZGVyVG9wV2lkdGggPSBwYXJzZUZsb2F0KHN0eWxlcy5ib3JkZXJUb3BXaWR0aCwgMTApO1xuICB2YXIgYm9yZGVyTGVmdFdpZHRoID0gcGFyc2VGbG9hdChzdHlsZXMuYm9yZGVyTGVmdFdpZHRoLCAxMCk7XG5cbiAgLy8gSW4gY2FzZXMgd2hlcmUgdGhlIHBhcmVudCBpcyBmaXhlZCwgd2UgbXVzdCBpZ25vcmUgbmVnYXRpdmUgc2Nyb2xsIGluIG9mZnNldCBjYWxjXG4gIGlmIChmaXhlZFBvc2l0aW9uICYmIGlzSFRNTCkge1xuICAgIHBhcmVudFJlY3QudG9wID0gTWF0aC5tYXgocGFyZW50UmVjdC50b3AsIDApO1xuICAgIHBhcmVudFJlY3QubGVmdCA9IE1hdGgubWF4KHBhcmVudFJlY3QubGVmdCwgMCk7XG4gIH1cbiAgdmFyIG9mZnNldHMgPSBnZXRDbGllbnRSZWN0KHtcbiAgICB0b3A6IGNoaWxkcmVuUmVjdC50b3AgLSBwYXJlbnRSZWN0LnRvcCAtIGJvcmRlclRvcFdpZHRoLFxuICAgIGxlZnQ6IGNoaWxkcmVuUmVjdC5sZWZ0IC0gcGFyZW50UmVjdC5sZWZ0IC0gYm9yZGVyTGVmdFdpZHRoLFxuICAgIHdpZHRoOiBjaGlsZHJlblJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiBjaGlsZHJlblJlY3QuaGVpZ2h0XG4gIH0pO1xuICBvZmZzZXRzLm1hcmdpblRvcCA9IDA7XG4gIG9mZnNldHMubWFyZ2luTGVmdCA9IDA7XG5cbiAgLy8gU3VidHJhY3QgbWFyZ2lucyBvZiBkb2N1bWVudEVsZW1lbnQgaW4gY2FzZSBpdCdzIGJlaW5nIHVzZWQgYXMgcGFyZW50XG4gIC8vIHdlIGRvIHRoaXMgb25seSBvbiBIVE1MIGJlY2F1c2UgaXQncyB0aGUgb25seSBlbGVtZW50IHRoYXQgYmVoYXZlc1xuICAvLyBkaWZmZXJlbnRseSB3aGVuIG1hcmdpbnMgYXJlIGFwcGxpZWQgdG8gaXQuIFRoZSBtYXJnaW5zIGFyZSBpbmNsdWRlZCBpblxuICAvLyB0aGUgYm94IG9mIHRoZSBkb2N1bWVudEVsZW1lbnQsIGluIHRoZSBvdGhlciBjYXNlcyBub3QuXG4gIGlmICghaXNJRTEwICYmIGlzSFRNTCkge1xuICAgIHZhciBtYXJnaW5Ub3AgPSBwYXJzZUZsb2F0KHN0eWxlcy5tYXJnaW5Ub3AsIDEwKTtcbiAgICB2YXIgbWFyZ2luTGVmdCA9IHBhcnNlRmxvYXQoc3R5bGVzLm1hcmdpbkxlZnQsIDEwKTtcblxuICAgIG9mZnNldHMudG9wIC09IGJvcmRlclRvcFdpZHRoIC0gbWFyZ2luVG9wO1xuICAgIG9mZnNldHMuYm90dG9tIC09IGJvcmRlclRvcFdpZHRoIC0gbWFyZ2luVG9wO1xuICAgIG9mZnNldHMubGVmdCAtPSBib3JkZXJMZWZ0V2lkdGggLSBtYXJnaW5MZWZ0O1xuICAgIG9mZnNldHMucmlnaHQgLT0gYm9yZGVyTGVmdFdpZHRoIC0gbWFyZ2luTGVmdDtcblxuICAgIC8vIEF0dGFjaCBtYXJnaW5Ub3AgYW5kIG1hcmdpbkxlZnQgYmVjYXVzZSBpbiBzb21lIGNpcmN1bXN0YW5jZXMgd2UgbWF5IG5lZWQgdGhlbVxuICAgIG9mZnNldHMubWFyZ2luVG9wID0gbWFyZ2luVG9wO1xuICAgIG9mZnNldHMubWFyZ2luTGVmdCA9IG1hcmdpbkxlZnQ7XG4gIH1cblxuICBpZiAoaXNJRTEwICYmICFmaXhlZFBvc2l0aW9uID8gcGFyZW50LmNvbnRhaW5zKHNjcm9sbFBhcmVudCkgOiBwYXJlbnQgPT09IHNjcm9sbFBhcmVudCAmJiBzY3JvbGxQYXJlbnQubm9kZU5hbWUgIT09ICdCT0RZJykge1xuICAgIG9mZnNldHMgPSBpbmNsdWRlU2Nyb2xsKG9mZnNldHMsIHBhcmVudCk7XG4gIH1cblxuICByZXR1cm4gb2Zmc2V0cztcbn1cblxuZnVuY3Rpb24gZ2V0Vmlld3BvcnRPZmZzZXRSZWN0UmVsYXRpdmVUb0FydGJpdHJhcnlOb2RlKGVsZW1lbnQpIHtcbiAgdmFyIGV4Y2x1ZGVTY3JvbGwgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGZhbHNlO1xuXG4gIHZhciBodG1sID0gZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgdmFyIHJlbGF0aXZlT2Zmc2V0ID0gZ2V0T2Zmc2V0UmVjdFJlbGF0aXZlVG9BcmJpdHJhcnlOb2RlKGVsZW1lbnQsIGh0bWwpO1xuICB2YXIgd2lkdGggPSBNYXRoLm1heChodG1sLmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcbiAgdmFyIGhlaWdodCA9IE1hdGgubWF4KGh0bWwuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCk7XG5cbiAgdmFyIHNjcm9sbFRvcCA9ICFleGNsdWRlU2Nyb2xsID8gZ2V0U2Nyb2xsKGh0bWwpIDogMDtcbiAgdmFyIHNjcm9sbExlZnQgPSAhZXhjbHVkZVNjcm9sbCA/IGdldFNjcm9sbChodG1sLCAnbGVmdCcpIDogMDtcblxuICB2YXIgb2Zmc2V0ID0ge1xuICAgIHRvcDogc2Nyb2xsVG9wIC0gcmVsYXRpdmVPZmZzZXQudG9wICsgcmVsYXRpdmVPZmZzZXQubWFyZ2luVG9wLFxuICAgIGxlZnQ6IHNjcm9sbExlZnQgLSByZWxhdGl2ZU9mZnNldC5sZWZ0ICsgcmVsYXRpdmVPZmZzZXQubWFyZ2luTGVmdCxcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHRcbiAgfTtcblxuICByZXR1cm4gZ2V0Q2xpZW50UmVjdChvZmZzZXQpO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiBlbGVtZW50IGlzIGZpeGVkIG9yIGlzIGluc2lkZSBhIGZpeGVkIHBhcmVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGN1c3RvbUNvbnRhaW5lclxuICogQHJldHVybnMge0Jvb2xlYW59IGFuc3dlciB0byBcImlzRml4ZWQ/XCJcbiAqL1xuZnVuY3Rpb24gaXNGaXhlZChlbGVtZW50KSB7XG4gIHZhciBub2RlTmFtZSA9IGVsZW1lbnQubm9kZU5hbWU7XG4gIGlmIChub2RlTmFtZSA9PT0gJ0JPRFknIHx8IG5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShlbGVtZW50LCAncG9zaXRpb24nKSA9PT0gJ2ZpeGVkJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBwYXJlbnROb2RlID0gZ2V0UGFyZW50Tm9kZShlbGVtZW50KTtcbiAgaWYgKCFwYXJlbnROb2RlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiBpc0ZpeGVkKHBhcmVudE5vZGUpO1xufVxuXG4vKipcbiAqIEZpbmRzIHRoZSBmaXJzdCBwYXJlbnQgb2YgYW4gZWxlbWVudCB0aGF0IGhhcyBhIHRyYW5zZm9ybWVkIHByb3BlcnR5IGRlZmluZWRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybnMge0VsZW1lbnR9IGZpcnN0IHRyYW5zZm9ybWVkIHBhcmVudCBvciBkb2N1bWVudEVsZW1lbnRcbiAqL1xuXG5mdW5jdGlvbiBnZXRGaXhlZFBvc2l0aW9uT2Zmc2V0UGFyZW50KGVsZW1lbnQpIHtcbiAgLy8gVGhpcyBjaGVjayBpcyBuZWVkZWQgdG8gYXZvaWQgZXJyb3JzIGluIGNhc2Ugb25lIG9mIHRoZSBlbGVtZW50cyBpc24ndCBkZWZpbmVkIGZvciBhbnkgcmVhc29uXG4gIGlmICghZWxlbWVudCB8fCAhZWxlbWVudC5wYXJlbnRFbGVtZW50IHx8IGlzSUUoKSkge1xuICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIH1cbiAgdmFyIGVsID0gZWxlbWVudC5wYXJlbnRFbGVtZW50O1xuICB3aGlsZSAoZWwgJiYgZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGVsLCAndHJhbnNmb3JtJykgPT09ICdub25lJykge1xuICAgIGVsID0gZWwucGFyZW50RWxlbWVudDtcbiAgfVxuICByZXR1cm4gZWwgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xufVxuXG4vKipcbiAqIENvbXB1dGVkIHRoZSBib3VuZGFyaWVzIGxpbWl0cyBhbmQgcmV0dXJuIHRoZW1cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBvcHBlclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcmVmZXJlbmNlXG4gKiBAcGFyYW0ge251bWJlcn0gcGFkZGluZ1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYm91bmRhcmllc0VsZW1lbnQgLSBFbGVtZW50IHVzZWQgdG8gZGVmaW5lIHRoZSBib3VuZGFyaWVzXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGZpeGVkUG9zaXRpb24gLSBJcyBpbiBmaXhlZCBwb3NpdGlvbiBtb2RlXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBDb29yZGluYXRlcyBvZiB0aGUgYm91bmRhcmllc1xuICovXG5mdW5jdGlvbiBnZXRCb3VuZGFyaWVzKHBvcHBlciwgcmVmZXJlbmNlLCBwYWRkaW5nLCBib3VuZGFyaWVzRWxlbWVudCkge1xuICB2YXIgZml4ZWRQb3NpdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIGFyZ3VtZW50c1s0XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzRdIDogZmFsc2U7XG5cbiAgLy8gTk9URTogMSBET00gYWNjZXNzIGhlcmVcblxuICB2YXIgYm91bmRhcmllcyA9IHsgdG9wOiAwLCBsZWZ0OiAwIH07XG4gIHZhciBvZmZzZXRQYXJlbnQgPSBmaXhlZFBvc2l0aW9uID8gZ2V0Rml4ZWRQb3NpdGlvbk9mZnNldFBhcmVudChwb3BwZXIpIDogZmluZENvbW1vbk9mZnNldFBhcmVudChwb3BwZXIsIHJlZmVyZW5jZSk7XG5cbiAgLy8gSGFuZGxlIHZpZXdwb3J0IGNhc2VcbiAgaWYgKGJvdW5kYXJpZXNFbGVtZW50ID09PSAndmlld3BvcnQnKSB7XG4gICAgYm91bmRhcmllcyA9IGdldFZpZXdwb3J0T2Zmc2V0UmVjdFJlbGF0aXZlVG9BcnRiaXRyYXJ5Tm9kZShvZmZzZXRQYXJlbnQsIGZpeGVkUG9zaXRpb24pO1xuICB9IGVsc2Uge1xuICAgIC8vIEhhbmRsZSBvdGhlciBjYXNlcyBiYXNlZCBvbiBET00gZWxlbWVudCB1c2VkIGFzIGJvdW5kYXJpZXNcbiAgICB2YXIgYm91bmRhcmllc05vZGUgPSB2b2lkIDA7XG4gICAgaWYgKGJvdW5kYXJpZXNFbGVtZW50ID09PSAnc2Nyb2xsUGFyZW50Jykge1xuICAgICAgYm91bmRhcmllc05vZGUgPSBnZXRTY3JvbGxQYXJlbnQoZ2V0UGFyZW50Tm9kZShyZWZlcmVuY2UpKTtcbiAgICAgIGlmIChib3VuZGFyaWVzTm9kZS5ub2RlTmFtZSA9PT0gJ0JPRFknKSB7XG4gICAgICAgIGJvdW5kYXJpZXNOb2RlID0gcG9wcGVyLm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYm91bmRhcmllc0VsZW1lbnQgPT09ICd3aW5kb3cnKSB7XG4gICAgICBib3VuZGFyaWVzTm9kZSA9IHBvcHBlci5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgYm91bmRhcmllc05vZGUgPSBib3VuZGFyaWVzRWxlbWVudDtcbiAgICB9XG5cbiAgICB2YXIgb2Zmc2V0cyA9IGdldE9mZnNldFJlY3RSZWxhdGl2ZVRvQXJiaXRyYXJ5Tm9kZShib3VuZGFyaWVzTm9kZSwgb2Zmc2V0UGFyZW50LCBmaXhlZFBvc2l0aW9uKTtcblxuICAgIC8vIEluIGNhc2Ugb2YgSFRNTCwgd2UgbmVlZCBhIGRpZmZlcmVudCBjb21wdXRhdGlvblxuICAgIGlmIChib3VuZGFyaWVzTm9kZS5ub2RlTmFtZSA9PT0gJ0hUTUwnICYmICFpc0ZpeGVkKG9mZnNldFBhcmVudCkpIHtcbiAgICAgIHZhciBfZ2V0V2luZG93U2l6ZXMgPSBnZXRXaW5kb3dTaXplcyhwb3BwZXIub3duZXJEb2N1bWVudCksXG4gICAgICAgICAgaGVpZ2h0ID0gX2dldFdpbmRvd1NpemVzLmhlaWdodCxcbiAgICAgICAgICB3aWR0aCA9IF9nZXRXaW5kb3dTaXplcy53aWR0aDtcblxuICAgICAgYm91bmRhcmllcy50b3AgKz0gb2Zmc2V0cy50b3AgLSBvZmZzZXRzLm1hcmdpblRvcDtcbiAgICAgIGJvdW5kYXJpZXMuYm90dG9tID0gaGVpZ2h0ICsgb2Zmc2V0cy50b3A7XG4gICAgICBib3VuZGFyaWVzLmxlZnQgKz0gb2Zmc2V0cy5sZWZ0IC0gb2Zmc2V0cy5tYXJnaW5MZWZ0O1xuICAgICAgYm91bmRhcmllcy5yaWdodCA9IHdpZHRoICsgb2Zmc2V0cy5sZWZ0O1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBmb3IgYWxsIHRoZSBvdGhlciBET00gZWxlbWVudHMsIHRoaXMgb25lIGlzIGdvb2RcbiAgICAgIGJvdW5kYXJpZXMgPSBvZmZzZXRzO1xuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCBwYWRkaW5nc1xuICBwYWRkaW5nID0gcGFkZGluZyB8fCAwO1xuICB2YXIgaXNQYWRkaW5nTnVtYmVyID0gdHlwZW9mIHBhZGRpbmcgPT09ICdudW1iZXInO1xuICBib3VuZGFyaWVzLmxlZnQgKz0gaXNQYWRkaW5nTnVtYmVyID8gcGFkZGluZyA6IHBhZGRpbmcubGVmdCB8fCAwO1xuICBib3VuZGFyaWVzLnRvcCArPSBpc1BhZGRpbmdOdW1iZXIgPyBwYWRkaW5nIDogcGFkZGluZy50b3AgfHwgMDtcbiAgYm91bmRhcmllcy5yaWdodCAtPSBpc1BhZGRpbmdOdW1iZXIgPyBwYWRkaW5nIDogcGFkZGluZy5yaWdodCB8fCAwO1xuICBib3VuZGFyaWVzLmJvdHRvbSAtPSBpc1BhZGRpbmdOdW1iZXIgPyBwYWRkaW5nIDogcGFkZGluZy5ib3R0b20gfHwgMDtcblxuICByZXR1cm4gYm91bmRhcmllcztcbn1cblxuZnVuY3Rpb24gZ2V0QXJlYShfcmVmKSB7XG4gIHZhciB3aWR0aCA9IF9yZWYud2lkdGgsXG4gICAgICBoZWlnaHQgPSBfcmVmLmhlaWdodDtcblxuICByZXR1cm4gd2lkdGggKiBoZWlnaHQ7XG59XG5cbi8qKlxuICogVXRpbGl0eSB1c2VkIHRvIHRyYW5zZm9ybSB0aGUgYGF1dG9gIHBsYWNlbWVudCB0byB0aGUgcGxhY2VtZW50IHdpdGggbW9yZVxuICogYXZhaWxhYmxlIHNwYWNlLlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IHVwZGF0ZSBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24gY29tcHV0ZUF1dG9QbGFjZW1lbnQocGxhY2VtZW50LCByZWZSZWN0LCBwb3BwZXIsIHJlZmVyZW5jZSwgYm91bmRhcmllc0VsZW1lbnQpIHtcbiAgdmFyIHBhZGRpbmcgPSBhcmd1bWVudHMubGVuZ3RoID4gNSAmJiBhcmd1bWVudHNbNV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1s1XSA6IDA7XG5cbiAgaWYgKHBsYWNlbWVudC5pbmRleE9mKCdhdXRvJykgPT09IC0xKSB7XG4gICAgcmV0dXJuIHBsYWNlbWVudDtcbiAgfVxuXG4gIHZhciBib3VuZGFyaWVzID0gZ2V0Qm91bmRhcmllcyhwb3BwZXIsIHJlZmVyZW5jZSwgcGFkZGluZywgYm91bmRhcmllc0VsZW1lbnQpO1xuXG4gIHZhciByZWN0cyA9IHtcbiAgICB0b3A6IHtcbiAgICAgIHdpZHRoOiBib3VuZGFyaWVzLndpZHRoLFxuICAgICAgaGVpZ2h0OiByZWZSZWN0LnRvcCAtIGJvdW5kYXJpZXMudG9wXG4gICAgfSxcbiAgICByaWdodDoge1xuICAgICAgd2lkdGg6IGJvdW5kYXJpZXMucmlnaHQgLSByZWZSZWN0LnJpZ2h0LFxuICAgICAgaGVpZ2h0OiBib3VuZGFyaWVzLmhlaWdodFxuICAgIH0sXG4gICAgYm90dG9tOiB7XG4gICAgICB3aWR0aDogYm91bmRhcmllcy53aWR0aCxcbiAgICAgIGhlaWdodDogYm91bmRhcmllcy5ib3R0b20gLSByZWZSZWN0LmJvdHRvbVxuICAgIH0sXG4gICAgbGVmdDoge1xuICAgICAgd2lkdGg6IHJlZlJlY3QubGVmdCAtIGJvdW5kYXJpZXMubGVmdCxcbiAgICAgIGhlaWdodDogYm91bmRhcmllcy5oZWlnaHRcbiAgICB9XG4gIH07XG5cbiAgdmFyIHNvcnRlZEFyZWFzID0gT2JqZWN0LmtleXMocmVjdHMpLm1hcChmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIF9leHRlbmRzKHtcbiAgICAgIGtleToga2V5XG4gICAgfSwgcmVjdHNba2V5XSwge1xuICAgICAgYXJlYTogZ2V0QXJlYShyZWN0c1trZXldKVxuICAgIH0pO1xuICB9KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgcmV0dXJuIGIuYXJlYSAtIGEuYXJlYTtcbiAgfSk7XG5cbiAgdmFyIGZpbHRlcmVkQXJlYXMgPSBzb3J0ZWRBcmVhcy5maWx0ZXIoZnVuY3Rpb24gKF9yZWYyKSB7XG4gICAgdmFyIHdpZHRoID0gX3JlZjIud2lkdGgsXG4gICAgICAgIGhlaWdodCA9IF9yZWYyLmhlaWdodDtcbiAgICByZXR1cm4gd2lkdGggPj0gcG9wcGVyLmNsaWVudFdpZHRoICYmIGhlaWdodCA+PSBwb3BwZXIuY2xpZW50SGVpZ2h0O1xuICB9KTtcblxuICB2YXIgY29tcHV0ZWRQbGFjZW1lbnQgPSBmaWx0ZXJlZEFyZWFzLmxlbmd0aCA+IDAgPyBmaWx0ZXJlZEFyZWFzWzBdLmtleSA6IHNvcnRlZEFyZWFzWzBdLmtleTtcblxuICB2YXIgdmFyaWF0aW9uID0gcGxhY2VtZW50LnNwbGl0KCctJylbMV07XG5cbiAgcmV0dXJuIGNvbXB1dGVkUGxhY2VtZW50ICsgKHZhcmlhdGlvbiA/ICctJyArIHZhcmlhdGlvbiA6ICcnKTtcbn1cblxuLyoqXG4gKiBHZXQgb2Zmc2V0cyB0byB0aGUgcmVmZXJlbmNlIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZVxuICogQHBhcmFtIHtFbGVtZW50fSBwb3BwZXIgLSB0aGUgcG9wcGVyIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gcmVmZXJlbmNlIC0gdGhlIHJlZmVyZW5jZSBlbGVtZW50ICh0aGUgcG9wcGVyIHdpbGwgYmUgcmVsYXRpdmUgdG8gdGhpcylcbiAqIEBwYXJhbSB7RWxlbWVudH0gZml4ZWRQb3NpdGlvbiAtIGlzIGluIGZpeGVkIHBvc2l0aW9uIG1vZGVcbiAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBvZmZzZXRzIHdoaWNoIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgcG9wcGVyXG4gKi9cbmZ1bmN0aW9uIGdldFJlZmVyZW5jZU9mZnNldHMoc3RhdGUsIHBvcHBlciwgcmVmZXJlbmNlKSB7XG4gIHZhciBmaXhlZFBvc2l0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBudWxsO1xuXG4gIHZhciBjb21tb25PZmZzZXRQYXJlbnQgPSBmaXhlZFBvc2l0aW9uID8gZ2V0Rml4ZWRQb3NpdGlvbk9mZnNldFBhcmVudChwb3BwZXIpIDogZmluZENvbW1vbk9mZnNldFBhcmVudChwb3BwZXIsIHJlZmVyZW5jZSk7XG4gIHJldHVybiBnZXRPZmZzZXRSZWN0UmVsYXRpdmVUb0FyYml0cmFyeU5vZGUocmVmZXJlbmNlLCBjb21tb25PZmZzZXRQYXJlbnQsIGZpeGVkUG9zaXRpb24pO1xufVxuXG4vKipcbiAqIEdldCB0aGUgb3V0ZXIgc2l6ZXMgb2YgdGhlIGdpdmVuIGVsZW1lbnQgKG9mZnNldCBzaXplICsgbWFyZ2lucylcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybnMge09iamVjdH0gb2JqZWN0IGNvbnRhaW5pbmcgd2lkdGggYW5kIGhlaWdodCBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIGdldE91dGVyU2l6ZXMoZWxlbWVudCkge1xuICB2YXIgd2luZG93ID0gZWxlbWVudC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICB2YXIgc3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG4gIHZhciB4ID0gcGFyc2VGbG9hdChzdHlsZXMubWFyZ2luVG9wIHx8IDApICsgcGFyc2VGbG9hdChzdHlsZXMubWFyZ2luQm90dG9tIHx8IDApO1xuICB2YXIgeSA9IHBhcnNlRmxvYXQoc3R5bGVzLm1hcmdpbkxlZnQgfHwgMCkgKyBwYXJzZUZsb2F0KHN0eWxlcy5tYXJnaW5SaWdodCB8fCAwKTtcbiAgdmFyIHJlc3VsdCA9IHtcbiAgICB3aWR0aDogZWxlbWVudC5vZmZzZXRXaWR0aCArIHksXG4gICAgaGVpZ2h0OiBlbGVtZW50Lm9mZnNldEhlaWdodCArIHhcbiAgfTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIG9wcG9zaXRlIHBsYWNlbWVudCBvZiB0aGUgZ2l2ZW4gb25lXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge1N0cmluZ30gcGxhY2VtZW50XG4gKiBAcmV0dXJucyB7U3RyaW5nfSBmbGlwcGVkIHBsYWNlbWVudFxuICovXG5mdW5jdGlvbiBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpIHtcbiAgdmFyIGhhc2ggPSB7IGxlZnQ6ICdyaWdodCcsIHJpZ2h0OiAnbGVmdCcsIGJvdHRvbTogJ3RvcCcsIHRvcDogJ2JvdHRvbScgfTtcbiAgcmV0dXJuIHBsYWNlbWVudC5yZXBsYWNlKC9sZWZ0fHJpZ2h0fGJvdHRvbXx0b3AvZywgZnVuY3Rpb24gKG1hdGNoZWQpIHtcbiAgICByZXR1cm4gaGFzaFttYXRjaGVkXTtcbiAgfSk7XG59XG5cbi8qKlxuICogR2V0IG9mZnNldHMgdG8gdGhlIHBvcHBlclxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtPYmplY3R9IHBvc2l0aW9uIC0gQ1NTIHBvc2l0aW9uIHRoZSBQb3BwZXIgd2lsbCBnZXQgYXBwbGllZFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcG9wcGVyIC0gdGhlIHBvcHBlciBlbGVtZW50XG4gKiBAcGFyYW0ge09iamVjdH0gcmVmZXJlbmNlT2Zmc2V0cyAtIHRoZSByZWZlcmVuY2Ugb2Zmc2V0cyAodGhlIHBvcHBlciB3aWxsIGJlIHJlbGF0aXZlIHRvIHRoaXMpXG4gKiBAcGFyYW0ge1N0cmluZ30gcGxhY2VtZW50IC0gb25lIG9mIHRoZSB2YWxpZCBwbGFjZW1lbnQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gcG9wcGVyT2Zmc2V0cyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBvZmZzZXRzIHdoaWNoIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgcG9wcGVyXG4gKi9cbmZ1bmN0aW9uIGdldFBvcHBlck9mZnNldHMocG9wcGVyLCByZWZlcmVuY2VPZmZzZXRzLCBwbGFjZW1lbnQpIHtcbiAgcGxhY2VtZW50ID0gcGxhY2VtZW50LnNwbGl0KCctJylbMF07XG5cbiAgLy8gR2V0IHBvcHBlciBub2RlIHNpemVzXG4gIHZhciBwb3BwZXJSZWN0ID0gZ2V0T3V0ZXJTaXplcyhwb3BwZXIpO1xuXG4gIC8vIEFkZCBwb3NpdGlvbiwgd2lkdGggYW5kIGhlaWdodCB0byBvdXIgb2Zmc2V0cyBvYmplY3RcbiAgdmFyIHBvcHBlck9mZnNldHMgPSB7XG4gICAgd2lkdGg6IHBvcHBlclJlY3Qud2lkdGgsXG4gICAgaGVpZ2h0OiBwb3BwZXJSZWN0LmhlaWdodFxuICB9O1xuXG4gIC8vIGRlcGVuZGluZyBieSB0aGUgcG9wcGVyIHBsYWNlbWVudCB3ZSBoYXZlIHRvIGNvbXB1dGUgaXRzIG9mZnNldHMgc2xpZ2h0bHkgZGlmZmVyZW50bHlcbiAgdmFyIGlzSG9yaXogPSBbJ3JpZ2h0JywgJ2xlZnQnXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xO1xuICB2YXIgbWFpblNpZGUgPSBpc0hvcml6ID8gJ3RvcCcgOiAnbGVmdCc7XG4gIHZhciBzZWNvbmRhcnlTaWRlID0gaXNIb3JpeiA/ICdsZWZ0JyA6ICd0b3AnO1xuICB2YXIgbWVhc3VyZW1lbnQgPSBpc0hvcml6ID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuICB2YXIgc2Vjb25kYXJ5TWVhc3VyZW1lbnQgPSAhaXNIb3JpeiA/ICdoZWlnaHQnIDogJ3dpZHRoJztcblxuICBwb3BwZXJPZmZzZXRzW21haW5TaWRlXSA9IHJlZmVyZW5jZU9mZnNldHNbbWFpblNpZGVdICsgcmVmZXJlbmNlT2Zmc2V0c1ttZWFzdXJlbWVudF0gLyAyIC0gcG9wcGVyUmVjdFttZWFzdXJlbWVudF0gLyAyO1xuICBpZiAocGxhY2VtZW50ID09PSBzZWNvbmRhcnlTaWRlKSB7XG4gICAgcG9wcGVyT2Zmc2V0c1tzZWNvbmRhcnlTaWRlXSA9IHJlZmVyZW5jZU9mZnNldHNbc2Vjb25kYXJ5U2lkZV0gLSBwb3BwZXJSZWN0W3NlY29uZGFyeU1lYXN1cmVtZW50XTtcbiAgfSBlbHNlIHtcbiAgICBwb3BwZXJPZmZzZXRzW3NlY29uZGFyeVNpZGVdID0gcmVmZXJlbmNlT2Zmc2V0c1tnZXRPcHBvc2l0ZVBsYWNlbWVudChzZWNvbmRhcnlTaWRlKV07XG4gIH1cblxuICByZXR1cm4gcG9wcGVyT2Zmc2V0cztcbn1cblxuLyoqXG4gKiBNaW1pY3MgdGhlIGBmaW5kYCBtZXRob2Qgb2YgQXJyYXlcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7QXJyYXl9IGFyclxuICogQGFyZ3VtZW50IHByb3BcbiAqIEBhcmd1bWVudCB2YWx1ZVxuICogQHJldHVybnMgaW5kZXggb3IgLTFcbiAqL1xuZnVuY3Rpb24gZmluZChhcnIsIGNoZWNrKSB7XG4gIC8vIHVzZSBuYXRpdmUgZmluZCBpZiBzdXBwb3J0ZWRcbiAgaWYgKEFycmF5LnByb3RvdHlwZS5maW5kKSB7XG4gICAgcmV0dXJuIGFyci5maW5kKGNoZWNrKTtcbiAgfVxuXG4gIC8vIHVzZSBgZmlsdGVyYCB0byBvYnRhaW4gdGhlIHNhbWUgYmVoYXZpb3Igb2YgYGZpbmRgXG4gIHJldHVybiBhcnIuZmlsdGVyKGNoZWNrKVswXTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIGluZGV4IG9mIHRoZSBtYXRjaGluZyBvYmplY3RcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7QXJyYXl9IGFyclxuICogQGFyZ3VtZW50IHByb3BcbiAqIEBhcmd1bWVudCB2YWx1ZVxuICogQHJldHVybnMgaW5kZXggb3IgLTFcbiAqL1xuZnVuY3Rpb24gZmluZEluZGV4KGFyciwgcHJvcCwgdmFsdWUpIHtcbiAgLy8gdXNlIG5hdGl2ZSBmaW5kSW5kZXggaWYgc3VwcG9ydGVkXG4gIGlmIChBcnJheS5wcm90b3R5cGUuZmluZEluZGV4KSB7XG4gICAgcmV0dXJuIGFyci5maW5kSW5kZXgoZnVuY3Rpb24gKGN1cikge1xuICAgICAgcmV0dXJuIGN1cltwcm9wXSA9PT0gdmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICAvLyB1c2UgYGZpbmRgICsgYGluZGV4T2ZgIGlmIGBmaW5kSW5kZXhgIGlzbid0IHN1cHBvcnRlZFxuICB2YXIgbWF0Y2ggPSBmaW5kKGFyciwgZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBvYmpbcHJvcF0gPT09IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIGFyci5pbmRleE9mKG1hdGNoKTtcbn1cblxuLyoqXG4gKiBMb29wIHRyb3VnaCB0aGUgbGlzdCBvZiBtb2RpZmllcnMgYW5kIHJ1biB0aGVtIGluIG9yZGVyLFxuICogZWFjaCBvZiB0aGVtIHdpbGwgdGhlbiBlZGl0IHRoZSBkYXRhIG9iamVjdC5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7ZGF0YU9iamVjdH0gZGF0YVxuICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzXG4gKiBAcGFyYW0ge1N0cmluZ30gZW5kcyAtIE9wdGlvbmFsIG1vZGlmaWVyIG5hbWUgdXNlZCBhcyBzdG9wcGVyXG4gKiBAcmV0dXJucyB7ZGF0YU9iamVjdH1cbiAqL1xuZnVuY3Rpb24gcnVuTW9kaWZpZXJzKG1vZGlmaWVycywgZGF0YSwgZW5kcykge1xuICB2YXIgbW9kaWZpZXJzVG9SdW4gPSBlbmRzID09PSB1bmRlZmluZWQgPyBtb2RpZmllcnMgOiBtb2RpZmllcnMuc2xpY2UoMCwgZmluZEluZGV4KG1vZGlmaWVycywgJ25hbWUnLCBlbmRzKSk7XG5cbiAgbW9kaWZpZXJzVG9SdW4uZm9yRWFjaChmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICBpZiAobW9kaWZpZXJbJ2Z1bmN0aW9uJ10pIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgICBjb25zb2xlLndhcm4oJ2Btb2RpZmllci5mdW5jdGlvbmAgaXMgZGVwcmVjYXRlZCwgdXNlIGBtb2RpZmllci5mbmAhJyk7XG4gICAgfVxuICAgIHZhciBmbiA9IG1vZGlmaWVyWydmdW5jdGlvbiddIHx8IG1vZGlmaWVyLmZuOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGRvdC1ub3RhdGlvblxuICAgIGlmIChtb2RpZmllci5lbmFibGVkICYmIGlzRnVuY3Rpb24oZm4pKSB7XG4gICAgICAvLyBBZGQgcHJvcGVydGllcyB0byBvZmZzZXRzIHRvIG1ha2UgdGhlbSBhIGNvbXBsZXRlIGNsaWVudFJlY3Qgb2JqZWN0XG4gICAgICAvLyB3ZSBkbyB0aGlzIGJlZm9yZSBlYWNoIG1vZGlmaWVyIHRvIG1ha2Ugc3VyZSB0aGUgcHJldmlvdXMgb25lIGRvZXNuJ3RcbiAgICAgIC8vIG1lc3Mgd2l0aCB0aGVzZSB2YWx1ZXNcbiAgICAgIGRhdGEub2Zmc2V0cy5wb3BwZXIgPSBnZXRDbGllbnRSZWN0KGRhdGEub2Zmc2V0cy5wb3BwZXIpO1xuICAgICAgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSA9IGdldENsaWVudFJlY3QoZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSk7XG5cbiAgICAgIGRhdGEgPSBmbihkYXRhLCBtb2RpZmllcik7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgcG9wcGVyLCBjb21wdXRpbmcgdGhlIG5ldyBvZmZzZXRzIGFuZCBhcHBseWluZ1xuICogdGhlIG5ldyBzdHlsZS48YnIgLz5cbiAqIFByZWZlciBgc2NoZWR1bGVVcGRhdGVgIG92ZXIgYHVwZGF0ZWAgYmVjYXVzZSBvZiBwZXJmb3JtYW5jZSByZWFzb25zLlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlclxuICovXG5mdW5jdGlvbiB1cGRhdGUoKSB7XG4gIC8vIGlmIHBvcHBlciBpcyBkZXN0cm95ZWQsIGRvbid0IHBlcmZvcm0gYW55IGZ1cnRoZXIgdXBkYXRlXG4gIGlmICh0aGlzLnN0YXRlLmlzRGVzdHJveWVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGRhdGEgPSB7XG4gICAgaW5zdGFuY2U6IHRoaXMsXG4gICAgc3R5bGVzOiB7fSxcbiAgICBhcnJvd1N0eWxlczoge30sXG4gICAgYXR0cmlidXRlczoge30sXG4gICAgZmxpcHBlZDogZmFsc2UsXG4gICAgb2Zmc2V0czoge31cbiAgfTtcblxuICAvLyBjb21wdXRlIHJlZmVyZW5jZSBlbGVtZW50IG9mZnNldHNcbiAgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSA9IGdldFJlZmVyZW5jZU9mZnNldHModGhpcy5zdGF0ZSwgdGhpcy5wb3BwZXIsIHRoaXMucmVmZXJlbmNlLCB0aGlzLm9wdGlvbnMucG9zaXRpb25GaXhlZCk7XG5cbiAgLy8gY29tcHV0ZSBhdXRvIHBsYWNlbWVudCwgc3RvcmUgcGxhY2VtZW50IGluc2lkZSB0aGUgZGF0YSBvYmplY3QsXG4gIC8vIG1vZGlmaWVycyB3aWxsIGJlIGFibGUgdG8gZWRpdCBgcGxhY2VtZW50YCBpZiBuZWVkZWRcbiAgLy8gYW5kIHJlZmVyIHRvIG9yaWdpbmFsUGxhY2VtZW50IHRvIGtub3cgdGhlIG9yaWdpbmFsIHZhbHVlXG4gIGRhdGEucGxhY2VtZW50ID0gY29tcHV0ZUF1dG9QbGFjZW1lbnQodGhpcy5vcHRpb25zLnBsYWNlbWVudCwgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSwgdGhpcy5wb3BwZXIsIHRoaXMucmVmZXJlbmNlLCB0aGlzLm9wdGlvbnMubW9kaWZpZXJzLmZsaXAuYm91bmRhcmllc0VsZW1lbnQsIHRoaXMub3B0aW9ucy5tb2RpZmllcnMuZmxpcC5wYWRkaW5nKTtcblxuICAvLyBzdG9yZSB0aGUgY29tcHV0ZWQgcGxhY2VtZW50IGluc2lkZSBgb3JpZ2luYWxQbGFjZW1lbnRgXG4gIGRhdGEub3JpZ2luYWxQbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudDtcblxuICBkYXRhLnBvc2l0aW9uRml4ZWQgPSB0aGlzLm9wdGlvbnMucG9zaXRpb25GaXhlZDtcblxuICAvLyBjb21wdXRlIHRoZSBwb3BwZXIgb2Zmc2V0c1xuICBkYXRhLm9mZnNldHMucG9wcGVyID0gZ2V0UG9wcGVyT2Zmc2V0cyh0aGlzLnBvcHBlciwgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSwgZGF0YS5wbGFjZW1lbnQpO1xuXG4gIGRhdGEub2Zmc2V0cy5wb3BwZXIucG9zaXRpb24gPSB0aGlzLm9wdGlvbnMucG9zaXRpb25GaXhlZCA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnO1xuXG4gIC8vIHJ1biB0aGUgbW9kaWZpZXJzXG4gIGRhdGEgPSBydW5Nb2RpZmllcnModGhpcy5tb2RpZmllcnMsIGRhdGEpO1xuXG4gIC8vIHRoZSBmaXJzdCBgdXBkYXRlYCB3aWxsIGNhbGwgYG9uQ3JlYXRlYCBjYWxsYmFja1xuICAvLyB0aGUgb3RoZXIgb25lcyB3aWxsIGNhbGwgYG9uVXBkYXRlYCBjYWxsYmFja1xuICBpZiAoIXRoaXMuc3RhdGUuaXNDcmVhdGVkKSB7XG4gICAgdGhpcy5zdGF0ZS5pc0NyZWF0ZWQgPSB0cnVlO1xuICAgIHRoaXMub3B0aW9ucy5vbkNyZWF0ZShkYXRhKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLm9wdGlvbnMub25VcGRhdGUoZGF0YSk7XG4gIH1cbn1cblxuLyoqXG4gKiBIZWxwZXIgdXNlZCB0byBrbm93IGlmIHRoZSBnaXZlbiBtb2RpZmllciBpcyBlbmFibGVkLlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzTW9kaWZpZXJFbmFibGVkKG1vZGlmaWVycywgbW9kaWZpZXJOYW1lKSB7XG4gIHJldHVybiBtb2RpZmllcnMuc29tZShmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBuYW1lID0gX3JlZi5uYW1lLFxuICAgICAgICBlbmFibGVkID0gX3JlZi5lbmFibGVkO1xuICAgIHJldHVybiBlbmFibGVkICYmIG5hbWUgPT09IG1vZGlmaWVyTmFtZTtcbiAgfSk7XG59XG5cbi8qKlxuICogR2V0IHRoZSBwcmVmaXhlZCBzdXBwb3J0ZWQgcHJvcGVydHkgbmFtZVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtTdHJpbmd9IHByb3BlcnR5IChjYW1lbENhc2UpXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBwcmVmaXhlZCBwcm9wZXJ0eSAoY2FtZWxDYXNlIG9yIFBhc2NhbENhc2UsIGRlcGVuZGluZyBvbiB0aGUgdmVuZG9yIHByZWZpeClcbiAqL1xuZnVuY3Rpb24gZ2V0U3VwcG9ydGVkUHJvcGVydHlOYW1lKHByb3BlcnR5KSB7XG4gIHZhciBwcmVmaXhlcyA9IFtmYWxzZSwgJ21zJywgJ1dlYmtpdCcsICdNb3onLCAnTyddO1xuICB2YXIgdXBwZXJQcm9wID0gcHJvcGVydHkuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBwcm9wZXJ0eS5zbGljZSgxKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHByZWZpeGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHByZWZpeCA9IHByZWZpeGVzW2ldO1xuICAgIHZhciB0b0NoZWNrID0gcHJlZml4ID8gJycgKyBwcmVmaXggKyB1cHBlclByb3AgOiBwcm9wZXJ0eTtcbiAgICBpZiAodHlwZW9mIGRvY3VtZW50LmJvZHkuc3R5bGVbdG9DaGVja10gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdG9DaGVjaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogRGVzdHJveXMgdGhlIHBvcHBlci5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXJcbiAqL1xuZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgdGhpcy5zdGF0ZS5pc0Rlc3Ryb3llZCA9IHRydWU7XG5cbiAgLy8gdG91Y2ggRE9NIG9ubHkgaWYgYGFwcGx5U3R5bGVgIG1vZGlmaWVyIGlzIGVuYWJsZWRcbiAgaWYgKGlzTW9kaWZpZXJFbmFibGVkKHRoaXMubW9kaWZpZXJzLCAnYXBwbHlTdHlsZScpKSB7XG4gICAgdGhpcy5wb3BwZXIucmVtb3ZlQXR0cmlidXRlKCd4LXBsYWNlbWVudCcpO1xuICAgIHRoaXMucG9wcGVyLnN0eWxlLnBvc2l0aW9uID0gJyc7XG4gICAgdGhpcy5wb3BwZXIuc3R5bGUudG9wID0gJyc7XG4gICAgdGhpcy5wb3BwZXIuc3R5bGUubGVmdCA9ICcnO1xuICAgIHRoaXMucG9wcGVyLnN0eWxlLnJpZ2h0ID0gJyc7XG4gICAgdGhpcy5wb3BwZXIuc3R5bGUuYm90dG9tID0gJyc7XG4gICAgdGhpcy5wb3BwZXIuc3R5bGUud2lsbENoYW5nZSA9ICcnO1xuICAgIHRoaXMucG9wcGVyLnN0eWxlW2dldFN1cHBvcnRlZFByb3BlcnR5TmFtZSgndHJhbnNmb3JtJyldID0gJyc7XG4gIH1cblxuICB0aGlzLmRpc2FibGVFdmVudExpc3RlbmVycygpO1xuXG4gIC8vIHJlbW92ZSB0aGUgcG9wcGVyIGlmIHVzZXIgZXhwbGljaXR5IGFza2VkIGZvciB0aGUgZGVsZXRpb24gb24gZGVzdHJveVxuICAvLyBkbyBub3QgdXNlIGByZW1vdmVgIGJlY2F1c2UgSUUxMSBkb2Vzbid0IHN1cHBvcnQgaXRcbiAgaWYgKHRoaXMub3B0aW9ucy5yZW1vdmVPbkRlc3Ryb3kpIHtcbiAgICB0aGlzLnBvcHBlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMucG9wcGVyKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHdpbmRvdyBhc3NvY2lhdGVkIHdpdGggdGhlIGVsZW1lbnRcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybnMge1dpbmRvd31cbiAqL1xuZnVuY3Rpb24gZ2V0V2luZG93KGVsZW1lbnQpIHtcbiAgdmFyIG93bmVyRG9jdW1lbnQgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQ7XG4gIHJldHVybiBvd25lckRvY3VtZW50ID8gb3duZXJEb2N1bWVudC5kZWZhdWx0VmlldyA6IHdpbmRvdztcbn1cblxuZnVuY3Rpb24gYXR0YWNoVG9TY3JvbGxQYXJlbnRzKHNjcm9sbFBhcmVudCwgZXZlbnQsIGNhbGxiYWNrLCBzY3JvbGxQYXJlbnRzKSB7XG4gIHZhciBpc0JvZHkgPSBzY3JvbGxQYXJlbnQubm9kZU5hbWUgPT09ICdCT0RZJztcbiAgdmFyIHRhcmdldCA9IGlzQm9keSA/IHNjcm9sbFBhcmVudC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3IDogc2Nyb2xsUGFyZW50O1xuICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgY2FsbGJhY2ssIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICBpZiAoIWlzQm9keSkge1xuICAgIGF0dGFjaFRvU2Nyb2xsUGFyZW50cyhnZXRTY3JvbGxQYXJlbnQodGFyZ2V0LnBhcmVudE5vZGUpLCBldmVudCwgY2FsbGJhY2ssIHNjcm9sbFBhcmVudHMpO1xuICB9XG4gIHNjcm9sbFBhcmVudHMucHVzaCh0YXJnZXQpO1xufVxuXG4vKipcbiAqIFNldHVwIG5lZWRlZCBldmVudCBsaXN0ZW5lcnMgdXNlZCB0byB1cGRhdGUgdGhlIHBvcHBlciBwb3NpdGlvblxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gc2V0dXBFdmVudExpc3RlbmVycyhyZWZlcmVuY2UsIG9wdGlvbnMsIHN0YXRlLCB1cGRhdGVCb3VuZCkge1xuICAvLyBSZXNpemUgZXZlbnQgbGlzdGVuZXIgb24gd2luZG93XG4gIHN0YXRlLnVwZGF0ZUJvdW5kID0gdXBkYXRlQm91bmQ7XG4gIGdldFdpbmRvdyhyZWZlcmVuY2UpLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHN0YXRlLnVwZGF0ZUJvdW5kLCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cbiAgLy8gU2Nyb2xsIGV2ZW50IGxpc3RlbmVyIG9uIHNjcm9sbCBwYXJlbnRzXG4gIHZhciBzY3JvbGxFbGVtZW50ID0gZ2V0U2Nyb2xsUGFyZW50KHJlZmVyZW5jZSk7XG4gIGF0dGFjaFRvU2Nyb2xsUGFyZW50cyhzY3JvbGxFbGVtZW50LCAnc2Nyb2xsJywgc3RhdGUudXBkYXRlQm91bmQsIHN0YXRlLnNjcm9sbFBhcmVudHMpO1xuICBzdGF0ZS5zY3JvbGxFbGVtZW50ID0gc2Nyb2xsRWxlbWVudDtcbiAgc3RhdGUuZXZlbnRzRW5hYmxlZCA9IHRydWU7XG5cbiAgcmV0dXJuIHN0YXRlO1xufVxuXG4vKipcbiAqIEl0IHdpbGwgYWRkIHJlc2l6ZS9zY3JvbGwgZXZlbnRzIGFuZCBzdGFydCByZWNhbGN1bGF0aW5nXG4gKiBwb3NpdGlvbiBvZiB0aGUgcG9wcGVyIGVsZW1lbnQgd2hlbiB0aGV5IGFyZSB0cmlnZ2VyZWQuXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyXG4gKi9cbmZ1bmN0aW9uIGVuYWJsZUV2ZW50TGlzdGVuZXJzKCkge1xuICBpZiAoIXRoaXMuc3RhdGUuZXZlbnRzRW5hYmxlZCkge1xuICAgIHRoaXMuc3RhdGUgPSBzZXR1cEV2ZW50TGlzdGVuZXJzKHRoaXMucmVmZXJlbmNlLCB0aGlzLm9wdGlvbnMsIHRoaXMuc3RhdGUsIHRoaXMuc2NoZWR1bGVVcGRhdGUpO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlIGV2ZW50IGxpc3RlbmVycyB1c2VkIHRvIHVwZGF0ZSB0aGUgcG9wcGVyIHBvc2l0aW9uXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZW1vdmVFdmVudExpc3RlbmVycyhyZWZlcmVuY2UsIHN0YXRlKSB7XG4gIC8vIFJlbW92ZSByZXNpemUgZXZlbnQgbGlzdGVuZXIgb24gd2luZG93XG4gIGdldFdpbmRvdyhyZWZlcmVuY2UpLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHN0YXRlLnVwZGF0ZUJvdW5kKTtcblxuICAvLyBSZW1vdmUgc2Nyb2xsIGV2ZW50IGxpc3RlbmVyIG9uIHNjcm9sbCBwYXJlbnRzXG4gIHN0YXRlLnNjcm9sbFBhcmVudHMuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHN0YXRlLnVwZGF0ZUJvdW5kKTtcbiAgfSk7XG5cbiAgLy8gUmVzZXQgc3RhdGVcbiAgc3RhdGUudXBkYXRlQm91bmQgPSBudWxsO1xuICBzdGF0ZS5zY3JvbGxQYXJlbnRzID0gW107XG4gIHN0YXRlLnNjcm9sbEVsZW1lbnQgPSBudWxsO1xuICBzdGF0ZS5ldmVudHNFbmFibGVkID0gZmFsc2U7XG4gIHJldHVybiBzdGF0ZTtcbn1cblxuLyoqXG4gKiBJdCB3aWxsIHJlbW92ZSByZXNpemUvc2Nyb2xsIGV2ZW50cyBhbmQgd29uJ3QgcmVjYWxjdWxhdGUgcG9wcGVyIHBvc2l0aW9uXG4gKiB3aGVuIHRoZXkgYXJlIHRyaWdnZXJlZC4gSXQgYWxzbyB3b24ndCB0cmlnZ2VyIGBvblVwZGF0ZWAgY2FsbGJhY2sgYW55bW9yZSxcbiAqIHVubGVzcyB5b3UgY2FsbCBgdXBkYXRlYCBtZXRob2QgbWFudWFsbHkuXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyXG4gKi9cbmZ1bmN0aW9uIGRpc2FibGVFdmVudExpc3RlbmVycygpIHtcbiAgaWYgKHRoaXMuc3RhdGUuZXZlbnRzRW5hYmxlZCkge1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuc2NoZWR1bGVVcGRhdGUpO1xuICAgIHRoaXMuc3RhdGUgPSByZW1vdmVFdmVudExpc3RlbmVycyh0aGlzLnJlZmVyZW5jZSwgdGhpcy5zdGF0ZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBUZWxscyBpZiBhIGdpdmVuIGlucHV0IGlzIGEgbnVtYmVyXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcGFyYW0geyp9IGlucHV0IHRvIGNoZWNrXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBpc051bWVyaWMobikge1xuICByZXR1cm4gbiAhPT0gJycgJiYgIWlzTmFOKHBhcnNlRmxvYXQobikpICYmIGlzRmluaXRlKG4pO1xufVxuXG4vKipcbiAqIFNldCB0aGUgc3R5bGUgdG8gdGhlIGdpdmVuIHBvcHBlclxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50IC0gRWxlbWVudCB0byBhcHBseSB0aGUgc3R5bGUgdG9cbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBzdHlsZXNcbiAqIE9iamVjdCB3aXRoIGEgbGlzdCBvZiBwcm9wZXJ0aWVzIGFuZCB2YWx1ZXMgd2hpY2ggd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIHNldFN0eWxlcyhlbGVtZW50LCBzdHlsZXMpIHtcbiAgT2JqZWN0LmtleXMoc3R5bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgdmFyIHVuaXQgPSAnJztcbiAgICAvLyBhZGQgdW5pdCBpZiB0aGUgdmFsdWUgaXMgbnVtZXJpYyBhbmQgaXMgb25lIG9mIHRoZSBmb2xsb3dpbmdcbiAgICBpZiAoWyd3aWR0aCcsICdoZWlnaHQnLCAndG9wJywgJ3JpZ2h0JywgJ2JvdHRvbScsICdsZWZ0J10uaW5kZXhPZihwcm9wKSAhPT0gLTEgJiYgaXNOdW1lcmljKHN0eWxlc1twcm9wXSkpIHtcbiAgICAgIHVuaXQgPSAncHgnO1xuICAgIH1cbiAgICBlbGVtZW50LnN0eWxlW3Byb3BdID0gc3R5bGVzW3Byb3BdICsgdW5pdDtcbiAgfSk7XG59XG5cbi8qKlxuICogU2V0IHRoZSBhdHRyaWJ1dGVzIHRvIHRoZSBnaXZlbiBwb3BwZXJcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gZWxlbWVudCAtIEVsZW1lbnQgdG8gYXBwbHkgdGhlIGF0dHJpYnV0ZXMgdG9cbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBzdHlsZXNcbiAqIE9iamVjdCB3aXRoIGEgbGlzdCBvZiBwcm9wZXJ0aWVzIGFuZCB2YWx1ZXMgd2hpY2ggd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXMoZWxlbWVudCwgYXR0cmlidXRlcykge1xuICBPYmplY3Qua2V5cyhhdHRyaWJ1dGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgdmFyIHZhbHVlID0gYXR0cmlidXRlc1twcm9wXTtcbiAgICBpZiAodmFsdWUgIT09IGZhbHNlKSB7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShwcm9wLCBhdHRyaWJ1dGVzW3Byb3BdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUocHJvcCk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSBgdXBkYXRlYCBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhLnN0eWxlcyAtIExpc3Qgb2Ygc3R5bGUgcHJvcGVydGllcyAtIHZhbHVlcyB0byBhcHBseSB0byBwb3BwZXIgZWxlbWVudFxuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEuYXR0cmlidXRlcyAtIExpc3Qgb2YgYXR0cmlidXRlIHByb3BlcnRpZXMgLSB2YWx1ZXMgdG8gYXBwbHkgdG8gcG9wcGVyIGVsZW1lbnRcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBzYW1lIGRhdGEgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGFwcGx5U3R5bGUoZGF0YSkge1xuICAvLyBhbnkgcHJvcGVydHkgcHJlc2VudCBpbiBgZGF0YS5zdHlsZXNgIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgcG9wcGVyLFxuICAvLyBpbiB0aGlzIHdheSB3ZSBjYW4gbWFrZSB0aGUgM3JkIHBhcnR5IG1vZGlmaWVycyBhZGQgY3VzdG9tIHN0eWxlcyB0byBpdFxuICAvLyBCZSBhd2FyZSwgbW9kaWZpZXJzIGNvdWxkIG92ZXJyaWRlIHRoZSBwcm9wZXJ0aWVzIGRlZmluZWQgaW4gdGhlIHByZXZpb3VzXG4gIC8vIGxpbmVzIG9mIHRoaXMgbW9kaWZpZXIhXG4gIHNldFN0eWxlcyhkYXRhLmluc3RhbmNlLnBvcHBlciwgZGF0YS5zdHlsZXMpO1xuXG4gIC8vIGFueSBwcm9wZXJ0eSBwcmVzZW50IGluIGBkYXRhLmF0dHJpYnV0ZXNgIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgcG9wcGVyLFxuICAvLyB0aGV5IHdpbGwgYmUgc2V0IGFzIEhUTUwgYXR0cmlidXRlcyBvZiB0aGUgZWxlbWVudFxuICBzZXRBdHRyaWJ1dGVzKGRhdGEuaW5zdGFuY2UucG9wcGVyLCBkYXRhLmF0dHJpYnV0ZXMpO1xuXG4gIC8vIGlmIGFycm93RWxlbWVudCBpcyBkZWZpbmVkIGFuZCBhcnJvd1N0eWxlcyBoYXMgc29tZSBwcm9wZXJ0aWVzXG4gIGlmIChkYXRhLmFycm93RWxlbWVudCAmJiBPYmplY3Qua2V5cyhkYXRhLmFycm93U3R5bGVzKS5sZW5ndGgpIHtcbiAgICBzZXRTdHlsZXMoZGF0YS5hcnJvd0VsZW1lbnQsIGRhdGEuYXJyb3dTdHlsZXMpO1xuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogU2V0IHRoZSB4LXBsYWNlbWVudCBhdHRyaWJ1dGUgYmVmb3JlIGV2ZXJ5dGhpbmcgZWxzZSBiZWNhdXNlIGl0IGNvdWxkIGJlIHVzZWRcbiAqIHRvIGFkZCBtYXJnaW5zIHRvIHRoZSBwb3BwZXIgbWFyZ2lucyBuZWVkcyB0byBiZSBjYWxjdWxhdGVkIHRvIGdldCB0aGVcbiAqIGNvcnJlY3QgcG9wcGVyIG9mZnNldHMuXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLm1vZGlmaWVyc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcmVmZXJlbmNlIC0gVGhlIHJlZmVyZW5jZSBlbGVtZW50IHVzZWQgdG8gcG9zaXRpb24gdGhlIHBvcHBlclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcG9wcGVyIC0gVGhlIEhUTUwgZWxlbWVudCB1c2VkIGFzIHBvcHBlclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBQb3BwZXIuanMgb3B0aW9uc1xuICovXG5mdW5jdGlvbiBhcHBseVN0eWxlT25Mb2FkKHJlZmVyZW5jZSwgcG9wcGVyLCBvcHRpb25zLCBtb2RpZmllck9wdGlvbnMsIHN0YXRlKSB7XG4gIC8vIGNvbXB1dGUgcmVmZXJlbmNlIGVsZW1lbnQgb2Zmc2V0c1xuICB2YXIgcmVmZXJlbmNlT2Zmc2V0cyA9IGdldFJlZmVyZW5jZU9mZnNldHMoc3RhdGUsIHBvcHBlciwgcmVmZXJlbmNlLCBvcHRpb25zLnBvc2l0aW9uRml4ZWQpO1xuXG4gIC8vIGNvbXB1dGUgYXV0byBwbGFjZW1lbnQsIHN0b3JlIHBsYWNlbWVudCBpbnNpZGUgdGhlIGRhdGEgb2JqZWN0LFxuICAvLyBtb2RpZmllcnMgd2lsbCBiZSBhYmxlIHRvIGVkaXQgYHBsYWNlbWVudGAgaWYgbmVlZGVkXG4gIC8vIGFuZCByZWZlciB0byBvcmlnaW5hbFBsYWNlbWVudCB0byBrbm93IHRoZSBvcmlnaW5hbCB2YWx1ZVxuICB2YXIgcGxhY2VtZW50ID0gY29tcHV0ZUF1dG9QbGFjZW1lbnQob3B0aW9ucy5wbGFjZW1lbnQsIHJlZmVyZW5jZU9mZnNldHMsIHBvcHBlciwgcmVmZXJlbmNlLCBvcHRpb25zLm1vZGlmaWVycy5mbGlwLmJvdW5kYXJpZXNFbGVtZW50LCBvcHRpb25zLm1vZGlmaWVycy5mbGlwLnBhZGRpbmcpO1xuXG4gIHBvcHBlci5zZXRBdHRyaWJ1dGUoJ3gtcGxhY2VtZW50JywgcGxhY2VtZW50KTtcblxuICAvLyBBcHBseSBgcG9zaXRpb25gIHRvIHBvcHBlciBiZWZvcmUgYW55dGhpbmcgZWxzZSBiZWNhdXNlXG4gIC8vIHdpdGhvdXQgdGhlIHBvc2l0aW9uIGFwcGxpZWQgd2UgY2FuJ3QgZ3VhcmFudGVlIGNvcnJlY3QgY29tcHV0YXRpb25zXG4gIHNldFN0eWxlcyhwb3BwZXIsIHsgcG9zaXRpb246IG9wdGlvbnMucG9zaXRpb25GaXhlZCA/ICdmaXhlZCcgOiAnYWJzb2x1dGUnIH0pO1xuXG4gIHJldHVybiBvcHRpb25zO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtCb29sZWFufSBzaG91bGRSb3VuZCAtIElmIHRoZSBvZmZzZXRzIHNob3VsZCBiZSByb3VuZGVkIGF0IGFsbFxuICogQHJldHVybnMge09iamVjdH0gVGhlIHBvcHBlcidzIHBvc2l0aW9uIG9mZnNldHMgcm91bmRlZFxuICpcbiAqIFRoZSB0YWxlIG9mIHBpeGVsLXBlcmZlY3QgcG9zaXRpb25pbmcuIEl0J3Mgc3RpbGwgbm90IDEwMCUgcGVyZmVjdCwgYnV0IGFzXG4gKiBnb29kIGFzIGl0IGNhbiBiZSB3aXRoaW4gcmVhc29uLlxuICogRGlzY3Vzc2lvbiBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vRmV6VnJhc3RhL3BvcHBlci5qcy9wdWxsLzcxNVxuICpcbiAqIExvdyBEUEkgc2NyZWVucyBjYXVzZSBhIHBvcHBlciB0byBiZSBibHVycnkgaWYgbm90IHVzaW5nIGZ1bGwgcGl4ZWxzIChTYWZhcmlcbiAqIGFzIHdlbGwgb24gSGlnaCBEUEkgc2NyZWVucykuXG4gKlxuICogRmlyZWZveCBwcmVmZXJzIG5vIHJvdW5kaW5nIGZvciBwb3NpdGlvbmluZyBhbmQgZG9lcyBub3QgaGF2ZSBibHVycmluZXNzIG9uXG4gKiBoaWdoIERQSSBzY3JlZW5zLlxuICpcbiAqIE9ubHkgaG9yaXpvbnRhbCBwbGFjZW1lbnQgYW5kIGxlZnQvcmlnaHQgdmFsdWVzIG5lZWQgdG8gYmUgY29uc2lkZXJlZC5cbiAqL1xuZnVuY3Rpb24gZ2V0Um91bmRlZE9mZnNldHMoZGF0YSwgc2hvdWxkUm91bmQpIHtcbiAgdmFyIF9kYXRhJG9mZnNldHMgPSBkYXRhLm9mZnNldHMsXG4gICAgICBwb3BwZXIgPSBfZGF0YSRvZmZzZXRzLnBvcHBlcixcbiAgICAgIHJlZmVyZW5jZSA9IF9kYXRhJG9mZnNldHMucmVmZXJlbmNlO1xuICB2YXIgcm91bmQgPSBNYXRoLnJvdW5kLFxuICAgICAgZmxvb3IgPSBNYXRoLmZsb29yO1xuXG4gIHZhciBub1JvdW5kID0gZnVuY3Rpb24gbm9Sb3VuZCh2KSB7XG4gICAgcmV0dXJuIHY7XG4gIH07XG5cbiAgdmFyIHJlZmVyZW5jZVdpZHRoID0gcm91bmQocmVmZXJlbmNlLndpZHRoKTtcbiAgdmFyIHBvcHBlcldpZHRoID0gcm91bmQocG9wcGVyLndpZHRoKTtcblxuICB2YXIgaXNWZXJ0aWNhbCA9IFsnbGVmdCcsICdyaWdodCddLmluZGV4T2YoZGF0YS5wbGFjZW1lbnQpICE9PSAtMTtcbiAgdmFyIGlzVmFyaWF0aW9uID0gZGF0YS5wbGFjZW1lbnQuaW5kZXhPZignLScpICE9PSAtMTtcbiAgdmFyIHNhbWVXaWR0aFBhcml0eSA9IHJlZmVyZW5jZVdpZHRoICUgMiA9PT0gcG9wcGVyV2lkdGggJSAyO1xuICB2YXIgYm90aE9kZFdpZHRoID0gcmVmZXJlbmNlV2lkdGggJSAyID09PSAxICYmIHBvcHBlcldpZHRoICUgMiA9PT0gMTtcblxuICB2YXIgaG9yaXpvbnRhbFRvSW50ZWdlciA9ICFzaG91bGRSb3VuZCA/IG5vUm91bmQgOiBpc1ZlcnRpY2FsIHx8IGlzVmFyaWF0aW9uIHx8IHNhbWVXaWR0aFBhcml0eSA/IHJvdW5kIDogZmxvb3I7XG4gIHZhciB2ZXJ0aWNhbFRvSW50ZWdlciA9ICFzaG91bGRSb3VuZCA/IG5vUm91bmQgOiByb3VuZDtcblxuICByZXR1cm4ge1xuICAgIGxlZnQ6IGhvcml6b250YWxUb0ludGVnZXIoYm90aE9kZFdpZHRoICYmICFpc1ZhcmlhdGlvbiAmJiBzaG91bGRSb3VuZCA/IHBvcHBlci5sZWZ0IC0gMSA6IHBvcHBlci5sZWZ0KSxcbiAgICB0b3A6IHZlcnRpY2FsVG9JbnRlZ2VyKHBvcHBlci50b3ApLFxuICAgIGJvdHRvbTogdmVydGljYWxUb0ludGVnZXIocG9wcGVyLmJvdHRvbSksXG4gICAgcmlnaHQ6IGhvcml6b250YWxUb0ludGVnZXIocG9wcGVyLnJpZ2h0KVxuICB9O1xufVxuXG52YXIgaXNGaXJlZm94ID0gaXNCcm93c2VyICYmIC9GaXJlZm94L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSBgdXBkYXRlYCBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24gY29tcHV0ZVN0eWxlKGRhdGEsIG9wdGlvbnMpIHtcbiAgdmFyIHggPSBvcHRpb25zLngsXG4gICAgICB5ID0gb3B0aW9ucy55O1xuICB2YXIgcG9wcGVyID0gZGF0YS5vZmZzZXRzLnBvcHBlcjtcblxuICAvLyBSZW1vdmUgdGhpcyBsZWdhY3kgc3VwcG9ydCBpbiBQb3BwZXIuanMgdjJcblxuICB2YXIgbGVnYWN5R3B1QWNjZWxlcmF0aW9uT3B0aW9uID0gZmluZChkYXRhLmluc3RhbmNlLm1vZGlmaWVycywgZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgcmV0dXJuIG1vZGlmaWVyLm5hbWUgPT09ICdhcHBseVN0eWxlJztcbiAgfSkuZ3B1QWNjZWxlcmF0aW9uO1xuICBpZiAobGVnYWN5R3B1QWNjZWxlcmF0aW9uT3B0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICBjb25zb2xlLndhcm4oJ1dBUk5JTkc6IGBncHVBY2NlbGVyYXRpb25gIG9wdGlvbiBtb3ZlZCB0byBgY29tcHV0ZVN0eWxlYCBtb2RpZmllciBhbmQgd2lsbCBub3QgYmUgc3VwcG9ydGVkIGluIGZ1dHVyZSB2ZXJzaW9ucyBvZiBQb3BwZXIuanMhJyk7XG4gIH1cbiAgdmFyIGdwdUFjY2VsZXJhdGlvbiA9IGxlZ2FjeUdwdUFjY2VsZXJhdGlvbk9wdGlvbiAhPT0gdW5kZWZpbmVkID8gbGVnYWN5R3B1QWNjZWxlcmF0aW9uT3B0aW9uIDogb3B0aW9ucy5ncHVBY2NlbGVyYXRpb247XG5cbiAgdmFyIG9mZnNldFBhcmVudCA9IGdldE9mZnNldFBhcmVudChkYXRhLmluc3RhbmNlLnBvcHBlcik7XG4gIHZhciBvZmZzZXRQYXJlbnRSZWN0ID0gZ2V0Qm91bmRpbmdDbGllbnRSZWN0KG9mZnNldFBhcmVudCk7XG5cbiAgLy8gU3R5bGVzXG4gIHZhciBzdHlsZXMgPSB7XG4gICAgcG9zaXRpb246IHBvcHBlci5wb3NpdGlvblxuICB9O1xuXG4gIHZhciBvZmZzZXRzID0gZ2V0Um91bmRlZE9mZnNldHMoZGF0YSwgd2luZG93LmRldmljZVBpeGVsUmF0aW8gPCAyIHx8ICFpc0ZpcmVmb3gpO1xuXG4gIHZhciBzaWRlQSA9IHggPT09ICdib3R0b20nID8gJ3RvcCcgOiAnYm90dG9tJztcbiAgdmFyIHNpZGVCID0geSA9PT0gJ3JpZ2h0JyA/ICdsZWZ0JyA6ICdyaWdodCc7XG5cbiAgLy8gaWYgZ3B1QWNjZWxlcmF0aW9uIGlzIHNldCB0byBgdHJ1ZWAgYW5kIHRyYW5zZm9ybSBpcyBzdXBwb3J0ZWQsXG4gIC8vICB3ZSB1c2UgYHRyYW5zbGF0ZTNkYCB0byBhcHBseSB0aGUgcG9zaXRpb24gdG8gdGhlIHBvcHBlciB3ZVxuICAvLyBhdXRvbWF0aWNhbGx5IHVzZSB0aGUgc3VwcG9ydGVkIHByZWZpeGVkIHZlcnNpb24gaWYgbmVlZGVkXG4gIHZhciBwcmVmaXhlZFByb3BlcnR5ID0gZ2V0U3VwcG9ydGVkUHJvcGVydHlOYW1lKCd0cmFuc2Zvcm0nKTtcblxuICAvLyBub3csIGxldCdzIG1ha2UgYSBzdGVwIGJhY2sgYW5kIGxvb2sgYXQgdGhpcyBjb2RlIGNsb3NlbHkgKHd0Zj8pXG4gIC8vIElmIHRoZSBjb250ZW50IG9mIHRoZSBwb3BwZXIgZ3Jvd3Mgb25jZSBpdCdzIGJlZW4gcG9zaXRpb25lZCwgaXRcbiAgLy8gbWF5IGhhcHBlbiB0aGF0IHRoZSBwb3BwZXIgZ2V0cyBtaXNwbGFjZWQgYmVjYXVzZSBvZiB0aGUgbmV3IGNvbnRlbnRcbiAgLy8gb3ZlcmZsb3dpbmcgaXRzIHJlZmVyZW5jZSBlbGVtZW50XG4gIC8vIFRvIGF2b2lkIHRoaXMgcHJvYmxlbSwgd2UgcHJvdmlkZSB0d28gb3B0aW9ucyAoeCBhbmQgeSksIHdoaWNoIGFsbG93XG4gIC8vIHRoZSBjb25zdW1lciB0byBkZWZpbmUgdGhlIG9mZnNldCBvcmlnaW4uXG4gIC8vIElmIHdlIHBvc2l0aW9uIGEgcG9wcGVyIG9uIHRvcCBvZiBhIHJlZmVyZW5jZSBlbGVtZW50LCB3ZSBjYW4gc2V0XG4gIC8vIGB4YCB0byBgdG9wYCB0byBtYWtlIHRoZSBwb3BwZXIgZ3JvdyB0b3dhcmRzIGl0cyB0b3AgaW5zdGVhZCBvZlxuICAvLyBpdHMgYm90dG9tLlxuICB2YXIgbGVmdCA9IHZvaWQgMCxcbiAgICAgIHRvcCA9IHZvaWQgMDtcbiAgaWYgKHNpZGVBID09PSAnYm90dG9tJykge1xuICAgIC8vIHdoZW4gb2Zmc2V0UGFyZW50IGlzIDxodG1sPiB0aGUgcG9zaXRpb25pbmcgaXMgcmVsYXRpdmUgdG8gdGhlIGJvdHRvbSBvZiB0aGUgc2NyZWVuIChleGNsdWRpbmcgdGhlIHNjcm9sbGJhcilcbiAgICAvLyBhbmQgbm90IHRoZSBib3R0b20gb2YgdGhlIGh0bWwgZWxlbWVudFxuICAgIGlmIChvZmZzZXRQYXJlbnQubm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgICAgdG9wID0gLW9mZnNldFBhcmVudC5jbGllbnRIZWlnaHQgKyBvZmZzZXRzLmJvdHRvbTtcbiAgICB9IGVsc2Uge1xuICAgICAgdG9wID0gLW9mZnNldFBhcmVudFJlY3QuaGVpZ2h0ICsgb2Zmc2V0cy5ib3R0b207XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRvcCA9IG9mZnNldHMudG9wO1xuICB9XG4gIGlmIChzaWRlQiA9PT0gJ3JpZ2h0Jykge1xuICAgIGlmIChvZmZzZXRQYXJlbnQubm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgICAgbGVmdCA9IC1vZmZzZXRQYXJlbnQuY2xpZW50V2lkdGggKyBvZmZzZXRzLnJpZ2h0O1xuICAgIH0gZWxzZSB7XG4gICAgICBsZWZ0ID0gLW9mZnNldFBhcmVudFJlY3Qud2lkdGggKyBvZmZzZXRzLnJpZ2h0O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZWZ0ID0gb2Zmc2V0cy5sZWZ0O1xuICB9XG4gIGlmIChncHVBY2NlbGVyYXRpb24gJiYgcHJlZml4ZWRQcm9wZXJ0eSkge1xuICAgIHN0eWxlc1twcmVmaXhlZFByb3BlcnR5XSA9ICd0cmFuc2xhdGUzZCgnICsgbGVmdCArICdweCwgJyArIHRvcCArICdweCwgMCknO1xuICAgIHN0eWxlc1tzaWRlQV0gPSAwO1xuICAgIHN0eWxlc1tzaWRlQl0gPSAwO1xuICAgIHN0eWxlcy53aWxsQ2hhbmdlID0gJ3RyYW5zZm9ybSc7XG4gIH0gZWxzZSB7XG4gICAgLy8gb3Rod2VyaXNlLCB3ZSB1c2UgdGhlIHN0YW5kYXJkIGB0b3BgLCBgbGVmdGAsIGBib3R0b21gIGFuZCBgcmlnaHRgIHByb3BlcnRpZXNcbiAgICB2YXIgaW52ZXJ0VG9wID0gc2lkZUEgPT09ICdib3R0b20nID8gLTEgOiAxO1xuICAgIHZhciBpbnZlcnRMZWZ0ID0gc2lkZUIgPT09ICdyaWdodCcgPyAtMSA6IDE7XG4gICAgc3R5bGVzW3NpZGVBXSA9IHRvcCAqIGludmVydFRvcDtcbiAgICBzdHlsZXNbc2lkZUJdID0gbGVmdCAqIGludmVydExlZnQ7XG4gICAgc3R5bGVzLndpbGxDaGFuZ2UgPSBzaWRlQSArICcsICcgKyBzaWRlQjtcbiAgfVxuXG4gIC8vIEF0dHJpYnV0ZXNcbiAgdmFyIGF0dHJpYnV0ZXMgPSB7XG4gICAgJ3gtcGxhY2VtZW50JzogZGF0YS5wbGFjZW1lbnRcbiAgfTtcblxuICAvLyBVcGRhdGUgYGRhdGFgIGF0dHJpYnV0ZXMsIHN0eWxlcyBhbmQgYXJyb3dTdHlsZXNcbiAgZGF0YS5hdHRyaWJ1dGVzID0gX2V4dGVuZHMoe30sIGF0dHJpYnV0ZXMsIGRhdGEuYXR0cmlidXRlcyk7XG4gIGRhdGEuc3R5bGVzID0gX2V4dGVuZHMoe30sIHN0eWxlcywgZGF0YS5zdHlsZXMpO1xuICBkYXRhLmFycm93U3R5bGVzID0gX2V4dGVuZHMoe30sIGRhdGEub2Zmc2V0cy5hcnJvdywgZGF0YS5hcnJvd1N0eWxlcyk7XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogSGVscGVyIHVzZWQgdG8ga25vdyBpZiB0aGUgZ2l2ZW4gbW9kaWZpZXIgZGVwZW5kcyBmcm9tIGFub3RoZXIgb25lLjxiciAvPlxuICogSXQgY2hlY2tzIGlmIHRoZSBuZWVkZWQgbW9kaWZpZXIgaXMgbGlzdGVkIGFuZCBlbmFibGVkLlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtBcnJheX0gbW9kaWZpZXJzIC0gbGlzdCBvZiBtb2RpZmllcnNcbiAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0aW5nTmFtZSAtIG5hbWUgb2YgcmVxdWVzdGluZyBtb2RpZmllclxuICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RlZE5hbWUgLSBuYW1lIG9mIHJlcXVlc3RlZCBtb2RpZmllclxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzTW9kaWZpZXJSZXF1aXJlZChtb2RpZmllcnMsIHJlcXVlc3RpbmdOYW1lLCByZXF1ZXN0ZWROYW1lKSB7XG4gIHZhciByZXF1ZXN0aW5nID0gZmluZChtb2RpZmllcnMsIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmLm5hbWU7XG4gICAgcmV0dXJuIG5hbWUgPT09IHJlcXVlc3RpbmdOYW1lO1xuICB9KTtcblxuICB2YXIgaXNSZXF1aXJlZCA9ICEhcmVxdWVzdGluZyAmJiBtb2RpZmllcnMuc29tZShmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICByZXR1cm4gbW9kaWZpZXIubmFtZSA9PT0gcmVxdWVzdGVkTmFtZSAmJiBtb2RpZmllci5lbmFibGVkICYmIG1vZGlmaWVyLm9yZGVyIDwgcmVxdWVzdGluZy5vcmRlcjtcbiAgfSk7XG5cbiAgaWYgKCFpc1JlcXVpcmVkKSB7XG4gICAgdmFyIF9yZXF1ZXN0aW5nID0gJ2AnICsgcmVxdWVzdGluZ05hbWUgKyAnYCc7XG4gICAgdmFyIHJlcXVlc3RlZCA9ICdgJyArIHJlcXVlc3RlZE5hbWUgKyAnYCc7XG4gICAgY29uc29sZS53YXJuKHJlcXVlc3RlZCArICcgbW9kaWZpZXIgaXMgcmVxdWlyZWQgYnkgJyArIF9yZXF1ZXN0aW5nICsgJyBtb2RpZmllciBpbiBvcmRlciB0byB3b3JrLCBiZSBzdXJlIHRvIGluY2x1ZGUgaXQgYmVmb3JlICcgKyBfcmVxdWVzdGluZyArICchJyk7XG4gIH1cbiAgcmV0dXJuIGlzUmVxdWlyZWQ7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgdXBkYXRlIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBhcnJvdyhkYXRhLCBvcHRpb25zKSB7XG4gIHZhciBfZGF0YSRvZmZzZXRzJGFycm93O1xuXG4gIC8vIGFycm93IGRlcGVuZHMgb24ga2VlcFRvZ2V0aGVyIGluIG9yZGVyIHRvIHdvcmtcbiAgaWYgKCFpc01vZGlmaWVyUmVxdWlyZWQoZGF0YS5pbnN0YW5jZS5tb2RpZmllcnMsICdhcnJvdycsICdrZWVwVG9nZXRoZXInKSkge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgdmFyIGFycm93RWxlbWVudCA9IG9wdGlvbnMuZWxlbWVudDtcblxuICAvLyBpZiBhcnJvd0VsZW1lbnQgaXMgYSBzdHJpbmcsIHN1cHBvc2UgaXQncyBhIENTUyBzZWxlY3RvclxuICBpZiAodHlwZW9mIGFycm93RWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICBhcnJvd0VsZW1lbnQgPSBkYXRhLmluc3RhbmNlLnBvcHBlci5xdWVyeVNlbGVjdG9yKGFycm93RWxlbWVudCk7XG5cbiAgICAvLyBpZiBhcnJvd0VsZW1lbnQgaXMgbm90IGZvdW5kLCBkb24ndCBydW4gdGhlIG1vZGlmaWVyXG4gICAgaWYgKCFhcnJvd0VsZW1lbnQpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBpZiB0aGUgYXJyb3dFbGVtZW50IGlzbid0IGEgcXVlcnkgc2VsZWN0b3Igd2UgbXVzdCBjaGVjayB0aGF0IHRoZVxuICAgIC8vIHByb3ZpZGVkIERPTSBub2RlIGlzIGNoaWxkIG9mIGl0cyBwb3BwZXIgbm9kZVxuICAgIGlmICghZGF0YS5pbnN0YW5jZS5wb3BwZXIuY29udGFpbnMoYXJyb3dFbGVtZW50KSkge1xuICAgICAgY29uc29sZS53YXJuKCdXQVJOSU5HOiBgYXJyb3cuZWxlbWVudGAgbXVzdCBiZSBjaGlsZCBvZiBpdHMgcG9wcGVyIGVsZW1lbnQhJyk7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gIH1cblxuICB2YXIgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbiAgdmFyIF9kYXRhJG9mZnNldHMgPSBkYXRhLm9mZnNldHMsXG4gICAgICBwb3BwZXIgPSBfZGF0YSRvZmZzZXRzLnBvcHBlcixcbiAgICAgIHJlZmVyZW5jZSA9IF9kYXRhJG9mZnNldHMucmVmZXJlbmNlO1xuXG4gIHZhciBpc1ZlcnRpY2FsID0gWydsZWZ0JywgJ3JpZ2h0J10uaW5kZXhPZihwbGFjZW1lbnQpICE9PSAtMTtcblxuICB2YXIgbGVuID0gaXNWZXJ0aWNhbCA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgdmFyIHNpZGVDYXBpdGFsaXplZCA9IGlzVmVydGljYWwgPyAnVG9wJyA6ICdMZWZ0JztcbiAgdmFyIHNpZGUgPSBzaWRlQ2FwaXRhbGl6ZWQudG9Mb3dlckNhc2UoKTtcbiAgdmFyIGFsdFNpZGUgPSBpc1ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCc7XG4gIHZhciBvcFNpZGUgPSBpc1ZlcnRpY2FsID8gJ2JvdHRvbScgOiAncmlnaHQnO1xuICB2YXIgYXJyb3dFbGVtZW50U2l6ZSA9IGdldE91dGVyU2l6ZXMoYXJyb3dFbGVtZW50KVtsZW5dO1xuXG4gIC8vXG4gIC8vIGV4dGVuZHMga2VlcFRvZ2V0aGVyIGJlaGF2aW9yIG1ha2luZyBzdXJlIHRoZSBwb3BwZXIgYW5kIGl0c1xuICAvLyByZWZlcmVuY2UgaGF2ZSBlbm91Z2ggcGl4ZWxzIGluIGNvbmp1bmN0aW9uXG4gIC8vXG5cbiAgLy8gdG9wL2xlZnQgc2lkZVxuICBpZiAocmVmZXJlbmNlW29wU2lkZV0gLSBhcnJvd0VsZW1lbnRTaXplIDwgcG9wcGVyW3NpZGVdKSB7XG4gICAgZGF0YS5vZmZzZXRzLnBvcHBlcltzaWRlXSAtPSBwb3BwZXJbc2lkZV0gLSAocmVmZXJlbmNlW29wU2lkZV0gLSBhcnJvd0VsZW1lbnRTaXplKTtcbiAgfVxuICAvLyBib3R0b20vcmlnaHQgc2lkZVxuICBpZiAocmVmZXJlbmNlW3NpZGVdICsgYXJyb3dFbGVtZW50U2l6ZSA+IHBvcHBlcltvcFNpZGVdKSB7XG4gICAgZGF0YS5vZmZzZXRzLnBvcHBlcltzaWRlXSArPSByZWZlcmVuY2Vbc2lkZV0gKyBhcnJvd0VsZW1lbnRTaXplIC0gcG9wcGVyW29wU2lkZV07XG4gIH1cbiAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IGdldENsaWVudFJlY3QoZGF0YS5vZmZzZXRzLnBvcHBlcik7XG5cbiAgLy8gY29tcHV0ZSBjZW50ZXIgb2YgdGhlIHBvcHBlclxuICB2YXIgY2VudGVyID0gcmVmZXJlbmNlW3NpZGVdICsgcmVmZXJlbmNlW2xlbl0gLyAyIC0gYXJyb3dFbGVtZW50U2l6ZSAvIDI7XG5cbiAgLy8gQ29tcHV0ZSB0aGUgc2lkZVZhbHVlIHVzaW5nIHRoZSB1cGRhdGVkIHBvcHBlciBvZmZzZXRzXG4gIC8vIHRha2UgcG9wcGVyIG1hcmdpbiBpbiBhY2NvdW50IGJlY2F1c2Ugd2UgZG9uJ3QgaGF2ZSB0aGlzIGluZm8gYXZhaWxhYmxlXG4gIHZhciBjc3MgPSBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHkoZGF0YS5pbnN0YW5jZS5wb3BwZXIpO1xuICB2YXIgcG9wcGVyTWFyZ2luU2lkZSA9IHBhcnNlRmxvYXQoY3NzWydtYXJnaW4nICsgc2lkZUNhcGl0YWxpemVkXSwgMTApO1xuICB2YXIgcG9wcGVyQm9yZGVyU2lkZSA9IHBhcnNlRmxvYXQoY3NzWydib3JkZXInICsgc2lkZUNhcGl0YWxpemVkICsgJ1dpZHRoJ10sIDEwKTtcbiAgdmFyIHNpZGVWYWx1ZSA9IGNlbnRlciAtIGRhdGEub2Zmc2V0cy5wb3BwZXJbc2lkZV0gLSBwb3BwZXJNYXJnaW5TaWRlIC0gcG9wcGVyQm9yZGVyU2lkZTtcblxuICAvLyBwcmV2ZW50IGFycm93RWxlbWVudCBmcm9tIGJlaW5nIHBsYWNlZCBub3QgY29udGlndW91c2x5IHRvIGl0cyBwb3BwZXJcbiAgc2lkZVZhbHVlID0gTWF0aC5tYXgoTWF0aC5taW4ocG9wcGVyW2xlbl0gLSBhcnJvd0VsZW1lbnRTaXplLCBzaWRlVmFsdWUpLCAwKTtcblxuICBkYXRhLmFycm93RWxlbWVudCA9IGFycm93RWxlbWVudDtcbiAgZGF0YS5vZmZzZXRzLmFycm93ID0gKF9kYXRhJG9mZnNldHMkYXJyb3cgPSB7fSwgZGVmaW5lUHJvcGVydHkoX2RhdGEkb2Zmc2V0cyRhcnJvdywgc2lkZSwgTWF0aC5yb3VuZChzaWRlVmFsdWUpKSwgZGVmaW5lUHJvcGVydHkoX2RhdGEkb2Zmc2V0cyRhcnJvdywgYWx0U2lkZSwgJycpLCBfZGF0YSRvZmZzZXRzJGFycm93KTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIG9wcG9zaXRlIHBsYWNlbWVudCB2YXJpYXRpb24gb2YgdGhlIGdpdmVuIG9uZVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtTdHJpbmd9IHBsYWNlbWVudCB2YXJpYXRpb25cbiAqIEByZXR1cm5zIHtTdHJpbmd9IGZsaXBwZWQgcGxhY2VtZW50IHZhcmlhdGlvblxuICovXG5mdW5jdGlvbiBnZXRPcHBvc2l0ZVZhcmlhdGlvbih2YXJpYXRpb24pIHtcbiAgaWYgKHZhcmlhdGlvbiA9PT0gJ2VuZCcpIHtcbiAgICByZXR1cm4gJ3N0YXJ0JztcbiAgfSBlbHNlIGlmICh2YXJpYXRpb24gPT09ICdzdGFydCcpIHtcbiAgICByZXR1cm4gJ2VuZCc7XG4gIH1cbiAgcmV0dXJuIHZhcmlhdGlvbjtcbn1cblxuLyoqXG4gKiBMaXN0IG9mIGFjY2VwdGVkIHBsYWNlbWVudHMgdG8gdXNlIGFzIHZhbHVlcyBvZiB0aGUgYHBsYWNlbWVudGAgb3B0aW9uLjxiciAvPlxuICogVmFsaWQgcGxhY2VtZW50cyBhcmU6XG4gKiAtIGBhdXRvYFxuICogLSBgdG9wYFxuICogLSBgcmlnaHRgXG4gKiAtIGBib3R0b21gXG4gKiAtIGBsZWZ0YFxuICpcbiAqIEVhY2ggcGxhY2VtZW50IGNhbiBoYXZlIGEgdmFyaWF0aW9uIGZyb20gdGhpcyBsaXN0OlxuICogLSBgLXN0YXJ0YFxuICogLSBgLWVuZGBcbiAqXG4gKiBWYXJpYXRpb25zIGFyZSBpbnRlcnByZXRlZCBlYXNpbHkgaWYgeW91IHRoaW5rIG9mIHRoZW0gYXMgdGhlIGxlZnQgdG8gcmlnaHRcbiAqIHdyaXR0ZW4gbGFuZ3VhZ2VzLiBIb3Jpem9udGFsbHkgKGB0b3BgIGFuZCBgYm90dG9tYCksIGBzdGFydGAgaXMgbGVmdCBhbmQgYGVuZGBcbiAqIGlzIHJpZ2h0LjxiciAvPlxuICogVmVydGljYWxseSAoYGxlZnRgIGFuZCBgcmlnaHRgKSwgYHN0YXJ0YCBpcyB0b3AgYW5kIGBlbmRgIGlzIGJvdHRvbS5cbiAqXG4gKiBTb21lIHZhbGlkIGV4YW1wbGVzIGFyZTpcbiAqIC0gYHRvcC1lbmRgIChvbiB0b3Agb2YgcmVmZXJlbmNlLCByaWdodCBhbGlnbmVkKVxuICogLSBgcmlnaHQtc3RhcnRgIChvbiByaWdodCBvZiByZWZlcmVuY2UsIHRvcCBhbGlnbmVkKVxuICogLSBgYm90dG9tYCAob24gYm90dG9tLCBjZW50ZXJlZClcbiAqIC0gYGF1dG8tZW5kYCAob24gdGhlIHNpZGUgd2l0aCBtb3JlIHNwYWNlIGF2YWlsYWJsZSwgYWxpZ25tZW50IGRlcGVuZHMgYnkgcGxhY2VtZW50KVxuICpcbiAqIEBzdGF0aWNcbiAqIEB0eXBlIHtBcnJheX1cbiAqIEBlbnVtIHtTdHJpbmd9XG4gKiBAcmVhZG9ubHlcbiAqIEBtZXRob2QgcGxhY2VtZW50c1xuICogQG1lbWJlcm9mIFBvcHBlclxuICovXG52YXIgcGxhY2VtZW50cyA9IFsnYXV0by1zdGFydCcsICdhdXRvJywgJ2F1dG8tZW5kJywgJ3RvcC1zdGFydCcsICd0b3AnLCAndG9wLWVuZCcsICdyaWdodC1zdGFydCcsICdyaWdodCcsICdyaWdodC1lbmQnLCAnYm90dG9tLWVuZCcsICdib3R0b20nLCAnYm90dG9tLXN0YXJ0JywgJ2xlZnQtZW5kJywgJ2xlZnQnLCAnbGVmdC1zdGFydCddO1xuXG4vLyBHZXQgcmlkIG9mIGBhdXRvYCBgYXV0by1zdGFydGAgYW5kIGBhdXRvLWVuZGBcbnZhciB2YWxpZFBsYWNlbWVudHMgPSBwbGFjZW1lbnRzLnNsaWNlKDMpO1xuXG4vKipcbiAqIEdpdmVuIGFuIGluaXRpYWwgcGxhY2VtZW50LCByZXR1cm5zIGFsbCB0aGUgc3Vic2VxdWVudCBwbGFjZW1lbnRzXG4gKiBjbG9ja3dpc2UgKG9yIGNvdW50ZXItY2xvY2t3aXNlKS5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge1N0cmluZ30gcGxhY2VtZW50IC0gQSB2YWxpZCBwbGFjZW1lbnQgKGl0IGFjY2VwdHMgdmFyaWF0aW9ucylcbiAqIEBhcmd1bWVudCB7Qm9vbGVhbn0gY291bnRlciAtIFNldCB0byB0cnVlIHRvIHdhbGsgdGhlIHBsYWNlbWVudHMgY291bnRlcmNsb2Nrd2lzZVxuICogQHJldHVybnMge0FycmF5fSBwbGFjZW1lbnRzIGluY2x1ZGluZyB0aGVpciB2YXJpYXRpb25zXG4gKi9cbmZ1bmN0aW9uIGNsb2Nrd2lzZShwbGFjZW1lbnQpIHtcbiAgdmFyIGNvdW50ZXIgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IGZhbHNlO1xuXG4gIHZhciBpbmRleCA9IHZhbGlkUGxhY2VtZW50cy5pbmRleE9mKHBsYWNlbWVudCk7XG4gIHZhciBhcnIgPSB2YWxpZFBsYWNlbWVudHMuc2xpY2UoaW5kZXggKyAxKS5jb25jYXQodmFsaWRQbGFjZW1lbnRzLnNsaWNlKDAsIGluZGV4KSk7XG4gIHJldHVybiBjb3VudGVyID8gYXJyLnJldmVyc2UoKSA6IGFycjtcbn1cblxudmFyIEJFSEFWSU9SUyA9IHtcbiAgRkxJUDogJ2ZsaXAnLFxuICBDTE9DS1dJU0U6ICdjbG9ja3dpc2UnLFxuICBDT1VOVEVSQ0xPQ0tXSVNFOiAnY291bnRlcmNsb2Nrd2lzZSdcbn07XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgdXBkYXRlIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBmbGlwKGRhdGEsIG9wdGlvbnMpIHtcbiAgLy8gaWYgYGlubmVyYCBtb2RpZmllciBpcyBlbmFibGVkLCB3ZSBjYW4ndCB1c2UgdGhlIGBmbGlwYCBtb2RpZmllclxuICBpZiAoaXNNb2RpZmllckVuYWJsZWQoZGF0YS5pbnN0YW5jZS5tb2RpZmllcnMsICdpbm5lcicpKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBpZiAoZGF0YS5mbGlwcGVkICYmIGRhdGEucGxhY2VtZW50ID09PSBkYXRhLm9yaWdpbmFsUGxhY2VtZW50KSB7XG4gICAgLy8gc2VlbXMgbGlrZSBmbGlwIGlzIHRyeWluZyB0byBsb29wLCBwcm9iYWJseSB0aGVyZSdzIG5vdCBlbm91Z2ggc3BhY2Ugb24gYW55IG9mIHRoZSBmbGlwcGFibGUgc2lkZXNcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHZhciBib3VuZGFyaWVzID0gZ2V0Qm91bmRhcmllcyhkYXRhLmluc3RhbmNlLnBvcHBlciwgZGF0YS5pbnN0YW5jZS5yZWZlcmVuY2UsIG9wdGlvbnMucGFkZGluZywgb3B0aW9ucy5ib3VuZGFyaWVzRWxlbWVudCwgZGF0YS5wb3NpdGlvbkZpeGVkKTtcblxuICB2YXIgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbiAgdmFyIHBsYWNlbWVudE9wcG9zaXRlID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQocGxhY2VtZW50KTtcbiAgdmFyIHZhcmlhdGlvbiA9IGRhdGEucGxhY2VtZW50LnNwbGl0KCctJylbMV0gfHwgJyc7XG5cbiAgdmFyIGZsaXBPcmRlciA9IFtdO1xuXG4gIHN3aXRjaCAob3B0aW9ucy5iZWhhdmlvcikge1xuICAgIGNhc2UgQkVIQVZJT1JTLkZMSVA6XG4gICAgICBmbGlwT3JkZXIgPSBbcGxhY2VtZW50LCBwbGFjZW1lbnRPcHBvc2l0ZV07XG4gICAgICBicmVhaztcbiAgICBjYXNlIEJFSEFWSU9SUy5DTE9DS1dJU0U6XG4gICAgICBmbGlwT3JkZXIgPSBjbG9ja3dpc2UocGxhY2VtZW50KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQkVIQVZJT1JTLkNPVU5URVJDTE9DS1dJU0U6XG4gICAgICBmbGlwT3JkZXIgPSBjbG9ja3dpc2UocGxhY2VtZW50LCB0cnVlKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBmbGlwT3JkZXIgPSBvcHRpb25zLmJlaGF2aW9yO1xuICB9XG5cbiAgZmxpcE9yZGVyLmZvckVhY2goZnVuY3Rpb24gKHN0ZXAsIGluZGV4KSB7XG4gICAgaWYgKHBsYWNlbWVudCAhPT0gc3RlcCB8fCBmbGlwT3JkZXIubGVuZ3RoID09PSBpbmRleCArIDEpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50LnNwbGl0KCctJylbMF07XG4gICAgcGxhY2VtZW50T3Bwb3NpdGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuXG4gICAgdmFyIHBvcHBlck9mZnNldHMgPSBkYXRhLm9mZnNldHMucG9wcGVyO1xuICAgIHZhciByZWZPZmZzZXRzID0gZGF0YS5vZmZzZXRzLnJlZmVyZW5jZTtcblxuICAgIC8vIHVzaW5nIGZsb29yIGJlY2F1c2UgdGhlIHJlZmVyZW5jZSBvZmZzZXRzIG1heSBjb250YWluIGRlY2ltYWxzIHdlIGFyZSBub3QgZ29pbmcgdG8gY29uc2lkZXIgaGVyZVxuICAgIHZhciBmbG9vciA9IE1hdGguZmxvb3I7XG4gICAgdmFyIG92ZXJsYXBzUmVmID0gcGxhY2VtZW50ID09PSAnbGVmdCcgJiYgZmxvb3IocG9wcGVyT2Zmc2V0cy5yaWdodCkgPiBmbG9vcihyZWZPZmZzZXRzLmxlZnQpIHx8IHBsYWNlbWVudCA9PT0gJ3JpZ2h0JyAmJiBmbG9vcihwb3BwZXJPZmZzZXRzLmxlZnQpIDwgZmxvb3IocmVmT2Zmc2V0cy5yaWdodCkgfHwgcGxhY2VtZW50ID09PSAndG9wJyAmJiBmbG9vcihwb3BwZXJPZmZzZXRzLmJvdHRvbSkgPiBmbG9vcihyZWZPZmZzZXRzLnRvcCkgfHwgcGxhY2VtZW50ID09PSAnYm90dG9tJyAmJiBmbG9vcihwb3BwZXJPZmZzZXRzLnRvcCkgPCBmbG9vcihyZWZPZmZzZXRzLmJvdHRvbSk7XG5cbiAgICB2YXIgb3ZlcmZsb3dzTGVmdCA9IGZsb29yKHBvcHBlck9mZnNldHMubGVmdCkgPCBmbG9vcihib3VuZGFyaWVzLmxlZnQpO1xuICAgIHZhciBvdmVyZmxvd3NSaWdodCA9IGZsb29yKHBvcHBlck9mZnNldHMucmlnaHQpID4gZmxvb3IoYm91bmRhcmllcy5yaWdodCk7XG4gICAgdmFyIG92ZXJmbG93c1RvcCA9IGZsb29yKHBvcHBlck9mZnNldHMudG9wKSA8IGZsb29yKGJvdW5kYXJpZXMudG9wKTtcbiAgICB2YXIgb3ZlcmZsb3dzQm90dG9tID0gZmxvb3IocG9wcGVyT2Zmc2V0cy5ib3R0b20pID4gZmxvb3IoYm91bmRhcmllcy5ib3R0b20pO1xuXG4gICAgdmFyIG92ZXJmbG93c0JvdW5kYXJpZXMgPSBwbGFjZW1lbnQgPT09ICdsZWZ0JyAmJiBvdmVyZmxvd3NMZWZ0IHx8IHBsYWNlbWVudCA9PT0gJ3JpZ2h0JyAmJiBvdmVyZmxvd3NSaWdodCB8fCBwbGFjZW1lbnQgPT09ICd0b3AnICYmIG92ZXJmbG93c1RvcCB8fCBwbGFjZW1lbnQgPT09ICdib3R0b20nICYmIG92ZXJmbG93c0JvdHRvbTtcblxuICAgIC8vIGZsaXAgdGhlIHZhcmlhdGlvbiBpZiByZXF1aXJlZFxuICAgIHZhciBpc1ZlcnRpY2FsID0gWyd0b3AnLCAnYm90dG9tJ10uaW5kZXhPZihwbGFjZW1lbnQpICE9PSAtMTtcblxuICAgIC8vIGZsaXBzIHZhcmlhdGlvbiBpZiByZWZlcmVuY2UgZWxlbWVudCBvdmVyZmxvd3MgYm91bmRhcmllc1xuICAgIHZhciBmbGlwcGVkVmFyaWF0aW9uQnlSZWYgPSAhIW9wdGlvbnMuZmxpcFZhcmlhdGlvbnMgJiYgKGlzVmVydGljYWwgJiYgdmFyaWF0aW9uID09PSAnc3RhcnQnICYmIG92ZXJmbG93c0xlZnQgfHwgaXNWZXJ0aWNhbCAmJiB2YXJpYXRpb24gPT09ICdlbmQnICYmIG92ZXJmbG93c1JpZ2h0IHx8ICFpc1ZlcnRpY2FsICYmIHZhcmlhdGlvbiA9PT0gJ3N0YXJ0JyAmJiBvdmVyZmxvd3NUb3AgfHwgIWlzVmVydGljYWwgJiYgdmFyaWF0aW9uID09PSAnZW5kJyAmJiBvdmVyZmxvd3NCb3R0b20pO1xuXG4gICAgLy8gZmxpcHMgdmFyaWF0aW9uIGlmIHBvcHBlciBjb250ZW50IG92ZXJmbG93cyBib3VuZGFyaWVzXG4gICAgdmFyIGZsaXBwZWRWYXJpYXRpb25CeUNvbnRlbnQgPSAhIW9wdGlvbnMuZmxpcFZhcmlhdGlvbnNCeUNvbnRlbnQgJiYgKGlzVmVydGljYWwgJiYgdmFyaWF0aW9uID09PSAnc3RhcnQnICYmIG92ZXJmbG93c1JpZ2h0IHx8IGlzVmVydGljYWwgJiYgdmFyaWF0aW9uID09PSAnZW5kJyAmJiBvdmVyZmxvd3NMZWZ0IHx8ICFpc1ZlcnRpY2FsICYmIHZhcmlhdGlvbiA9PT0gJ3N0YXJ0JyAmJiBvdmVyZmxvd3NCb3R0b20gfHwgIWlzVmVydGljYWwgJiYgdmFyaWF0aW9uID09PSAnZW5kJyAmJiBvdmVyZmxvd3NUb3ApO1xuXG4gICAgdmFyIGZsaXBwZWRWYXJpYXRpb24gPSBmbGlwcGVkVmFyaWF0aW9uQnlSZWYgfHwgZmxpcHBlZFZhcmlhdGlvbkJ5Q29udGVudDtcblxuICAgIGlmIChvdmVybGFwc1JlZiB8fCBvdmVyZmxvd3NCb3VuZGFyaWVzIHx8IGZsaXBwZWRWYXJpYXRpb24pIHtcbiAgICAgIC8vIHRoaXMgYm9vbGVhbiB0byBkZXRlY3QgYW55IGZsaXAgbG9vcFxuICAgICAgZGF0YS5mbGlwcGVkID0gdHJ1ZTtcblxuICAgICAgaWYgKG92ZXJsYXBzUmVmIHx8IG92ZXJmbG93c0JvdW5kYXJpZXMpIHtcbiAgICAgICAgcGxhY2VtZW50ID0gZmxpcE9yZGVyW2luZGV4ICsgMV07XG4gICAgICB9XG5cbiAgICAgIGlmIChmbGlwcGVkVmFyaWF0aW9uKSB7XG4gICAgICAgIHZhcmlhdGlvbiA9IGdldE9wcG9zaXRlVmFyaWF0aW9uKHZhcmlhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGRhdGEucGxhY2VtZW50ID0gcGxhY2VtZW50ICsgKHZhcmlhdGlvbiA/ICctJyArIHZhcmlhdGlvbiA6ICcnKTtcblxuICAgICAgLy8gdGhpcyBvYmplY3QgY29udGFpbnMgYHBvc2l0aW9uYCwgd2Ugd2FudCB0byBwcmVzZXJ2ZSBpdCBhbG9uZyB3aXRoXG4gICAgICAvLyBhbnkgYWRkaXRpb25hbCBwcm9wZXJ0eSB3ZSBtYXkgYWRkIGluIHRoZSBmdXR1cmVcbiAgICAgIGRhdGEub2Zmc2V0cy5wb3BwZXIgPSBfZXh0ZW5kcyh7fSwgZGF0YS5vZmZzZXRzLnBvcHBlciwgZ2V0UG9wcGVyT2Zmc2V0cyhkYXRhLmluc3RhbmNlLnBvcHBlciwgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSwgZGF0YS5wbGFjZW1lbnQpKTtcblxuICAgICAgZGF0YSA9IHJ1bk1vZGlmaWVycyhkYXRhLmluc3RhbmNlLm1vZGlmaWVycywgZGF0YSwgJ2ZsaXAnKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSB1cGRhdGUgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGtlZXBUb2dldGhlcihkYXRhKSB7XG4gIHZhciBfZGF0YSRvZmZzZXRzID0gZGF0YS5vZmZzZXRzLFxuICAgICAgcG9wcGVyID0gX2RhdGEkb2Zmc2V0cy5wb3BwZXIsXG4gICAgICByZWZlcmVuY2UgPSBfZGF0YSRvZmZzZXRzLnJlZmVyZW5jZTtcblxuICB2YXIgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbiAgdmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbiAgdmFyIGlzVmVydGljYWwgPSBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xO1xuICB2YXIgc2lkZSA9IGlzVmVydGljYWwgPyAncmlnaHQnIDogJ2JvdHRvbSc7XG4gIHZhciBvcFNpZGUgPSBpc1ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCc7XG4gIHZhciBtZWFzdXJlbWVudCA9IGlzVmVydGljYWwgPyAnd2lkdGgnIDogJ2hlaWdodCc7XG5cbiAgaWYgKHBvcHBlcltzaWRlXSA8IGZsb29yKHJlZmVyZW5jZVtvcFNpZGVdKSkge1xuICAgIGRhdGEub2Zmc2V0cy5wb3BwZXJbb3BTaWRlXSA9IGZsb29yKHJlZmVyZW5jZVtvcFNpZGVdKSAtIHBvcHBlclttZWFzdXJlbWVudF07XG4gIH1cbiAgaWYgKHBvcHBlcltvcFNpZGVdID4gZmxvb3IocmVmZXJlbmNlW3NpZGVdKSkge1xuICAgIGRhdGEub2Zmc2V0cy5wb3BwZXJbb3BTaWRlXSA9IGZsb29yKHJlZmVyZW5jZVtzaWRlXSk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIHN0cmluZyBjb250YWluaW5nIHZhbHVlICsgdW5pdCBpbnRvIGEgcHggdmFsdWUgbnVtYmVyXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiB7bW9kaWZpZXJzfm9mZnNldH1cbiAqIEBwcml2YXRlXG4gKiBAYXJndW1lbnQge1N0cmluZ30gc3RyIC0gVmFsdWUgKyB1bml0IHN0cmluZ1xuICogQGFyZ3VtZW50IHtTdHJpbmd9IG1lYXN1cmVtZW50IC0gYGhlaWdodGAgb3IgYHdpZHRoYFxuICogQGFyZ3VtZW50IHtPYmplY3R9IHBvcHBlck9mZnNldHNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSByZWZlcmVuY2VPZmZzZXRzXG4gKiBAcmV0dXJucyB7TnVtYmVyfFN0cmluZ31cbiAqIFZhbHVlIGluIHBpeGVscywgb3Igb3JpZ2luYWwgc3RyaW5nIGlmIG5vIHZhbHVlcyB3ZXJlIGV4dHJhY3RlZFxuICovXG5mdW5jdGlvbiB0b1ZhbHVlKHN0ciwgbWVhc3VyZW1lbnQsIHBvcHBlck9mZnNldHMsIHJlZmVyZW5jZU9mZnNldHMpIHtcbiAgLy8gc2VwYXJhdGUgdmFsdWUgZnJvbSB1bml0XG4gIHZhciBzcGxpdCA9IHN0ci5tYXRjaCgvKCg/OlxcLXxcXCspP1xcZCpcXC4/XFxkKikoLiopLyk7XG4gIHZhciB2YWx1ZSA9ICtzcGxpdFsxXTtcbiAgdmFyIHVuaXQgPSBzcGxpdFsyXTtcblxuICAvLyBJZiBpdCdzIG5vdCBhIG51bWJlciBpdCdzIGFuIG9wZXJhdG9yLCBJIGd1ZXNzXG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgaWYgKHVuaXQuaW5kZXhPZignJScpID09PSAwKSB7XG4gICAgdmFyIGVsZW1lbnQgPSB2b2lkIDA7XG4gICAgc3dpdGNoICh1bml0KSB7XG4gICAgICBjYXNlICclcCc6XG4gICAgICAgIGVsZW1lbnQgPSBwb3BwZXJPZmZzZXRzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJyUnOlxuICAgICAgY2FzZSAnJXInOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgZWxlbWVudCA9IHJlZmVyZW5jZU9mZnNldHM7XG4gICAgfVxuXG4gICAgdmFyIHJlY3QgPSBnZXRDbGllbnRSZWN0KGVsZW1lbnQpO1xuICAgIHJldHVybiByZWN0W21lYXN1cmVtZW50XSAvIDEwMCAqIHZhbHVlO1xuICB9IGVsc2UgaWYgKHVuaXQgPT09ICd2aCcgfHwgdW5pdCA9PT0gJ3Z3Jykge1xuICAgIC8vIGlmIGlzIGEgdmggb3IgdncsIHdlIGNhbGN1bGF0ZSB0aGUgc2l6ZSBiYXNlZCBvbiB0aGUgdmlld3BvcnRcbiAgICB2YXIgc2l6ZSA9IHZvaWQgMDtcbiAgICBpZiAodW5pdCA9PT0gJ3ZoJykge1xuICAgICAgc2l6ZSA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2l6ZSA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG4gICAgfVxuICAgIHJldHVybiBzaXplIC8gMTAwICogdmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgLy8gaWYgaXMgYW4gZXhwbGljaXQgcGl4ZWwgdW5pdCwgd2UgZ2V0IHJpZCBvZiB0aGUgdW5pdCBhbmQga2VlcCB0aGUgdmFsdWVcbiAgICAvLyBpZiBpcyBhbiBpbXBsaWNpdCB1bml0LCBpdCdzIHB4LCBhbmQgd2UgcmV0dXJuIGp1c3QgdGhlIHZhbHVlXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogUGFyc2UgYW4gYG9mZnNldGAgc3RyaW5nIHRvIGV4dHJhcG9sYXRlIGB4YCBhbmQgYHlgIG51bWVyaWMgb2Zmc2V0cy5cbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIHttb2RpZmllcnN+b2Zmc2V0fVxuICogQHByaXZhdGVcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBvZmZzZXRcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBwb3BwZXJPZmZzZXRzXG4gKiBAYXJndW1lbnQge09iamVjdH0gcmVmZXJlbmNlT2Zmc2V0c1xuICogQGFyZ3VtZW50IHtTdHJpbmd9IGJhc2VQbGFjZW1lbnRcbiAqIEByZXR1cm5zIHtBcnJheX0gYSB0d28gY2VsbHMgYXJyYXkgd2l0aCB4IGFuZCB5IG9mZnNldHMgaW4gbnVtYmVyc1xuICovXG5mdW5jdGlvbiBwYXJzZU9mZnNldChvZmZzZXQsIHBvcHBlck9mZnNldHMsIHJlZmVyZW5jZU9mZnNldHMsIGJhc2VQbGFjZW1lbnQpIHtcbiAgdmFyIG9mZnNldHMgPSBbMCwgMF07XG5cbiAgLy8gVXNlIGhlaWdodCBpZiBwbGFjZW1lbnQgaXMgbGVmdCBvciByaWdodCBhbmQgaW5kZXggaXMgMCBvdGhlcndpc2UgdXNlIHdpZHRoXG4gIC8vIGluIHRoaXMgd2F5IHRoZSBmaXJzdCBvZmZzZXQgd2lsbCB1c2UgYW4gYXhpcyBhbmQgdGhlIHNlY29uZCBvbmVcbiAgLy8gd2lsbCB1c2UgdGhlIG90aGVyIG9uZVxuICB2YXIgdXNlSGVpZ2h0ID0gWydyaWdodCcsICdsZWZ0J10uaW5kZXhPZihiYXNlUGxhY2VtZW50KSAhPT0gLTE7XG5cbiAgLy8gU3BsaXQgdGhlIG9mZnNldCBzdHJpbmcgdG8gb2J0YWluIGEgbGlzdCBvZiB2YWx1ZXMgYW5kIG9wZXJhbmRzXG4gIC8vIFRoZSByZWdleCBhZGRyZXNzZXMgdmFsdWVzIHdpdGggdGhlIHBsdXMgb3IgbWludXMgc2lnbiBpbiBmcm9udCAoKzEwLCAtMjAsIGV0YylcbiAgdmFyIGZyYWdtZW50cyA9IG9mZnNldC5zcGxpdCgvKFxcK3xcXC0pLykubWFwKGZ1bmN0aW9uIChmcmFnKSB7XG4gICAgcmV0dXJuIGZyYWcudHJpbSgpO1xuICB9KTtcblxuICAvLyBEZXRlY3QgaWYgdGhlIG9mZnNldCBzdHJpbmcgY29udGFpbnMgYSBwYWlyIG9mIHZhbHVlcyBvciBhIHNpbmdsZSBvbmVcbiAgLy8gdGhleSBjb3VsZCBiZSBzZXBhcmF0ZWQgYnkgY29tbWEgb3Igc3BhY2VcbiAgdmFyIGRpdmlkZXIgPSBmcmFnbWVudHMuaW5kZXhPZihmaW5kKGZyYWdtZW50cywgZnVuY3Rpb24gKGZyYWcpIHtcbiAgICByZXR1cm4gZnJhZy5zZWFyY2goLyx8XFxzLykgIT09IC0xO1xuICB9KSk7XG5cbiAgaWYgKGZyYWdtZW50c1tkaXZpZGVyXSAmJiBmcmFnbWVudHNbZGl2aWRlcl0uaW5kZXhPZignLCcpID09PSAtMSkge1xuICAgIGNvbnNvbGUud2FybignT2Zmc2V0cyBzZXBhcmF0ZWQgYnkgd2hpdGUgc3BhY2UocykgYXJlIGRlcHJlY2F0ZWQsIHVzZSBhIGNvbW1hICgsKSBpbnN0ZWFkLicpO1xuICB9XG5cbiAgLy8gSWYgZGl2aWRlciBpcyBmb3VuZCwgd2UgZGl2aWRlIHRoZSBsaXN0IG9mIHZhbHVlcyBhbmQgb3BlcmFuZHMgdG8gZGl2aWRlXG4gIC8vIHRoZW0gYnkgb2ZzZXQgWCBhbmQgWS5cbiAgdmFyIHNwbGl0UmVnZXggPSAvXFxzKixcXHMqfFxccysvO1xuICB2YXIgb3BzID0gZGl2aWRlciAhPT0gLTEgPyBbZnJhZ21lbnRzLnNsaWNlKDAsIGRpdmlkZXIpLmNvbmNhdChbZnJhZ21lbnRzW2RpdmlkZXJdLnNwbGl0KHNwbGl0UmVnZXgpWzBdXSksIFtmcmFnbWVudHNbZGl2aWRlcl0uc3BsaXQoc3BsaXRSZWdleClbMV1dLmNvbmNhdChmcmFnbWVudHMuc2xpY2UoZGl2aWRlciArIDEpKV0gOiBbZnJhZ21lbnRzXTtcblxuICAvLyBDb252ZXJ0IHRoZSB2YWx1ZXMgd2l0aCB1bml0cyB0byBhYnNvbHV0ZSBwaXhlbHMgdG8gYWxsb3cgb3VyIGNvbXB1dGF0aW9uc1xuICBvcHMgPSBvcHMubWFwKGZ1bmN0aW9uIChvcCwgaW5kZXgpIHtcbiAgICAvLyBNb3N0IG9mIHRoZSB1bml0cyByZWx5IG9uIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgcG9wcGVyXG4gICAgdmFyIG1lYXN1cmVtZW50ID0gKGluZGV4ID09PSAxID8gIXVzZUhlaWdodCA6IHVzZUhlaWdodCkgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gICAgdmFyIG1lcmdlV2l0aFByZXZpb3VzID0gZmFsc2U7XG4gICAgcmV0dXJuIG9wXG4gICAgLy8gVGhpcyBhZ2dyZWdhdGVzIGFueSBgK2Agb3IgYC1gIHNpZ24gdGhhdCBhcmVuJ3QgY29uc2lkZXJlZCBvcGVyYXRvcnNcbiAgICAvLyBlLmcuOiAxMCArICs1ID0+IFsxMCwgKywgKzVdXG4gICAgLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgICAgaWYgKGFbYS5sZW5ndGggLSAxXSA9PT0gJycgJiYgWycrJywgJy0nXS5pbmRleE9mKGIpICE9PSAtMSkge1xuICAgICAgICBhW2EubGVuZ3RoIC0gMV0gPSBiO1xuICAgICAgICBtZXJnZVdpdGhQcmV2aW91cyA9IHRydWU7XG4gICAgICAgIHJldHVybiBhO1xuICAgICAgfSBlbHNlIGlmIChtZXJnZVdpdGhQcmV2aW91cykge1xuICAgICAgICBhW2EubGVuZ3RoIC0gMV0gKz0gYjtcbiAgICAgICAgbWVyZ2VXaXRoUHJldmlvdXMgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gICAgICB9XG4gICAgfSwgW10pXG4gICAgLy8gSGVyZSB3ZSBjb252ZXJ0IHRoZSBzdHJpbmcgdmFsdWVzIGludG8gbnVtYmVyIHZhbHVlcyAoaW4gcHgpXG4gICAgLm1hcChmdW5jdGlvbiAoc3RyKSB7XG4gICAgICByZXR1cm4gdG9WYWx1ZShzdHIsIG1lYXN1cmVtZW50LCBwb3BwZXJPZmZzZXRzLCByZWZlcmVuY2VPZmZzZXRzKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gTG9vcCB0cm91Z2ggdGhlIG9mZnNldHMgYXJyYXlzIGFuZCBleGVjdXRlIHRoZSBvcGVyYXRpb25zXG4gIG9wcy5mb3JFYWNoKGZ1bmN0aW9uIChvcCwgaW5kZXgpIHtcbiAgICBvcC5mb3JFYWNoKGZ1bmN0aW9uIChmcmFnLCBpbmRleDIpIHtcbiAgICAgIGlmIChpc051bWVyaWMoZnJhZykpIHtcbiAgICAgICAgb2Zmc2V0c1tpbmRleF0gKz0gZnJhZyAqIChvcFtpbmRleDIgLSAxXSA9PT0gJy0nID8gLTEgOiAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBvZmZzZXRzO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IHVwZGF0ZSBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEBhcmd1bWVudCB7TnVtYmVyfFN0cmluZ30gb3B0aW9ucy5vZmZzZXQ9MFxuICogVGhlIG9mZnNldCB2YWx1ZSBhcyBkZXNjcmliZWQgaW4gdGhlIG1vZGlmaWVyIGRlc2NyaXB0aW9uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIG9mZnNldChkYXRhLCBfcmVmKSB7XG4gIHZhciBvZmZzZXQgPSBfcmVmLm9mZnNldDtcbiAgdmFyIHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50LFxuICAgICAgX2RhdGEkb2Zmc2V0cyA9IGRhdGEub2Zmc2V0cyxcbiAgICAgIHBvcHBlciA9IF9kYXRhJG9mZnNldHMucG9wcGVyLFxuICAgICAgcmVmZXJlbmNlID0gX2RhdGEkb2Zmc2V0cy5yZWZlcmVuY2U7XG5cbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcblxuICB2YXIgb2Zmc2V0cyA9IHZvaWQgMDtcbiAgaWYgKGlzTnVtZXJpYygrb2Zmc2V0KSkge1xuICAgIG9mZnNldHMgPSBbK29mZnNldCwgMF07XG4gIH0gZWxzZSB7XG4gICAgb2Zmc2V0cyA9IHBhcnNlT2Zmc2V0KG9mZnNldCwgcG9wcGVyLCByZWZlcmVuY2UsIGJhc2VQbGFjZW1lbnQpO1xuICB9XG5cbiAgaWYgKGJhc2VQbGFjZW1lbnQgPT09ICdsZWZ0Jykge1xuICAgIHBvcHBlci50b3AgKz0gb2Zmc2V0c1swXTtcbiAgICBwb3BwZXIubGVmdCAtPSBvZmZzZXRzWzFdO1xuICB9IGVsc2UgaWYgKGJhc2VQbGFjZW1lbnQgPT09ICdyaWdodCcpIHtcbiAgICBwb3BwZXIudG9wICs9IG9mZnNldHNbMF07XG4gICAgcG9wcGVyLmxlZnQgKz0gb2Zmc2V0c1sxXTtcbiAgfSBlbHNlIGlmIChiYXNlUGxhY2VtZW50ID09PSAndG9wJykge1xuICAgIHBvcHBlci5sZWZ0ICs9IG9mZnNldHNbMF07XG4gICAgcG9wcGVyLnRvcCAtPSBvZmZzZXRzWzFdO1xuICB9IGVsc2UgaWYgKGJhc2VQbGFjZW1lbnQgPT09ICdib3R0b20nKSB7XG4gICAgcG9wcGVyLmxlZnQgKz0gb2Zmc2V0c1swXTtcbiAgICBwb3BwZXIudG9wICs9IG9mZnNldHNbMV07XG4gIH1cblxuICBkYXRhLnBvcHBlciA9IHBvcHBlcjtcbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgYHVwZGF0ZWAgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIHByZXZlbnRPdmVyZmxvdyhkYXRhLCBvcHRpb25zKSB7XG4gIHZhciBib3VuZGFyaWVzRWxlbWVudCA9IG9wdGlvbnMuYm91bmRhcmllc0VsZW1lbnQgfHwgZ2V0T2Zmc2V0UGFyZW50KGRhdGEuaW5zdGFuY2UucG9wcGVyKTtcblxuICAvLyBJZiBvZmZzZXRQYXJlbnQgaXMgdGhlIHJlZmVyZW5jZSBlbGVtZW50LCB3ZSByZWFsbHkgd2FudCB0b1xuICAvLyBnbyBvbmUgc3RlcCB1cCBhbmQgdXNlIHRoZSBuZXh0IG9mZnNldFBhcmVudCBhcyByZWZlcmVuY2UgdG9cbiAgLy8gYXZvaWQgdG8gbWFrZSB0aGlzIG1vZGlmaWVyIGNvbXBsZXRlbHkgdXNlbGVzcyBhbmQgbG9vayBsaWtlIGJyb2tlblxuICBpZiAoZGF0YS5pbnN0YW5jZS5yZWZlcmVuY2UgPT09IGJvdW5kYXJpZXNFbGVtZW50KSB7XG4gICAgYm91bmRhcmllc0VsZW1lbnQgPSBnZXRPZmZzZXRQYXJlbnQoYm91bmRhcmllc0VsZW1lbnQpO1xuICB9XG5cbiAgLy8gTk9URTogRE9NIGFjY2VzcyBoZXJlXG4gIC8vIHJlc2V0cyB0aGUgcG9wcGVyJ3MgcG9zaXRpb24gc28gdGhhdCB0aGUgZG9jdW1lbnQgc2l6ZSBjYW4gYmUgY2FsY3VsYXRlZCBleGNsdWRpbmdcbiAgLy8gdGhlIHNpemUgb2YgdGhlIHBvcHBlciBlbGVtZW50IGl0c2VsZlxuICB2YXIgdHJhbnNmb3JtUHJvcCA9IGdldFN1cHBvcnRlZFByb3BlcnR5TmFtZSgndHJhbnNmb3JtJyk7XG4gIHZhciBwb3BwZXJTdHlsZXMgPSBkYXRhLmluc3RhbmNlLnBvcHBlci5zdHlsZTsgLy8gYXNzaWdubWVudCB0byBoZWxwIG1pbmlmaWNhdGlvblxuICB2YXIgdG9wID0gcG9wcGVyU3R5bGVzLnRvcCxcbiAgICAgIGxlZnQgPSBwb3BwZXJTdHlsZXMubGVmdCxcbiAgICAgIHRyYW5zZm9ybSA9IHBvcHBlclN0eWxlc1t0cmFuc2Zvcm1Qcm9wXTtcblxuICBwb3BwZXJTdHlsZXMudG9wID0gJyc7XG4gIHBvcHBlclN0eWxlcy5sZWZ0ID0gJyc7XG4gIHBvcHBlclN0eWxlc1t0cmFuc2Zvcm1Qcm9wXSA9ICcnO1xuXG4gIHZhciBib3VuZGFyaWVzID0gZ2V0Qm91bmRhcmllcyhkYXRhLmluc3RhbmNlLnBvcHBlciwgZGF0YS5pbnN0YW5jZS5yZWZlcmVuY2UsIG9wdGlvbnMucGFkZGluZywgYm91bmRhcmllc0VsZW1lbnQsIGRhdGEucG9zaXRpb25GaXhlZCk7XG5cbiAgLy8gTk9URTogRE9NIGFjY2VzcyBoZXJlXG4gIC8vIHJlc3RvcmVzIHRoZSBvcmlnaW5hbCBzdHlsZSBwcm9wZXJ0aWVzIGFmdGVyIHRoZSBvZmZzZXRzIGhhdmUgYmVlbiBjb21wdXRlZFxuICBwb3BwZXJTdHlsZXMudG9wID0gdG9wO1xuICBwb3BwZXJTdHlsZXMubGVmdCA9IGxlZnQ7XG4gIHBvcHBlclN0eWxlc1t0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zZm9ybTtcblxuICBvcHRpb25zLmJvdW5kYXJpZXMgPSBib3VuZGFyaWVzO1xuXG4gIHZhciBvcmRlciA9IG9wdGlvbnMucHJpb3JpdHk7XG4gIHZhciBwb3BwZXIgPSBkYXRhLm9mZnNldHMucG9wcGVyO1xuXG4gIHZhciBjaGVjayA9IHtcbiAgICBwcmltYXJ5OiBmdW5jdGlvbiBwcmltYXJ5KHBsYWNlbWVudCkge1xuICAgICAgdmFyIHZhbHVlID0gcG9wcGVyW3BsYWNlbWVudF07XG4gICAgICBpZiAocG9wcGVyW3BsYWNlbWVudF0gPCBib3VuZGFyaWVzW3BsYWNlbWVudF0gJiYgIW9wdGlvbnMuZXNjYXBlV2l0aFJlZmVyZW5jZSkge1xuICAgICAgICB2YWx1ZSA9IE1hdGgubWF4KHBvcHBlcltwbGFjZW1lbnRdLCBib3VuZGFyaWVzW3BsYWNlbWVudF0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmluZVByb3BlcnR5KHt9LCBwbGFjZW1lbnQsIHZhbHVlKTtcbiAgICB9LFxuICAgIHNlY29uZGFyeTogZnVuY3Rpb24gc2Vjb25kYXJ5KHBsYWNlbWVudCkge1xuICAgICAgdmFyIG1haW5TaWRlID0gcGxhY2VtZW50ID09PSAncmlnaHQnID8gJ2xlZnQnIDogJ3RvcCc7XG4gICAgICB2YXIgdmFsdWUgPSBwb3BwZXJbbWFpblNpZGVdO1xuICAgICAgaWYgKHBvcHBlcltwbGFjZW1lbnRdID4gYm91bmRhcmllc1twbGFjZW1lbnRdICYmICFvcHRpb25zLmVzY2FwZVdpdGhSZWZlcmVuY2UpIHtcbiAgICAgICAgdmFsdWUgPSBNYXRoLm1pbihwb3BwZXJbbWFpblNpZGVdLCBib3VuZGFyaWVzW3BsYWNlbWVudF0gLSAocGxhY2VtZW50ID09PSAncmlnaHQnID8gcG9wcGVyLndpZHRoIDogcG9wcGVyLmhlaWdodCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmluZVByb3BlcnR5KHt9LCBtYWluU2lkZSwgdmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICBvcmRlci5mb3JFYWNoKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICB2YXIgc2lkZSA9IFsnbGVmdCcsICd0b3AnXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xID8gJ3ByaW1hcnknIDogJ3NlY29uZGFyeSc7XG4gICAgcG9wcGVyID0gX2V4dGVuZHMoe30sIHBvcHBlciwgY2hlY2tbc2lkZV0ocGxhY2VtZW50KSk7XG4gIH0pO1xuXG4gIGRhdGEub2Zmc2V0cy5wb3BwZXIgPSBwb3BwZXI7XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgYHVwZGF0ZWAgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIHNoaWZ0KGRhdGEpIHtcbiAgdmFyIHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50O1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IHBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuICB2YXIgc2hpZnR2YXJpYXRpb24gPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVsxXTtcblxuICAvLyBpZiBzaGlmdCBzaGlmdHZhcmlhdGlvbiBpcyBzcGVjaWZpZWQsIHJ1biB0aGUgbW9kaWZpZXJcbiAgaWYgKHNoaWZ0dmFyaWF0aW9uKSB7XG4gICAgdmFyIF9kYXRhJG9mZnNldHMgPSBkYXRhLm9mZnNldHMsXG4gICAgICAgIHJlZmVyZW5jZSA9IF9kYXRhJG9mZnNldHMucmVmZXJlbmNlLFxuICAgICAgICBwb3BwZXIgPSBfZGF0YSRvZmZzZXRzLnBvcHBlcjtcblxuICAgIHZhciBpc1ZlcnRpY2FsID0gWydib3R0b20nLCAndG9wJ10uaW5kZXhPZihiYXNlUGxhY2VtZW50KSAhPT0gLTE7XG4gICAgdmFyIHNpZGUgPSBpc1ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCc7XG4gICAgdmFyIG1lYXN1cmVtZW50ID0gaXNWZXJ0aWNhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcblxuICAgIHZhciBzaGlmdE9mZnNldHMgPSB7XG4gICAgICBzdGFydDogZGVmaW5lUHJvcGVydHkoe30sIHNpZGUsIHJlZmVyZW5jZVtzaWRlXSksXG4gICAgICBlbmQ6IGRlZmluZVByb3BlcnR5KHt9LCBzaWRlLCByZWZlcmVuY2Vbc2lkZV0gKyByZWZlcmVuY2VbbWVhc3VyZW1lbnRdIC0gcG9wcGVyW21lYXN1cmVtZW50XSlcbiAgICB9O1xuXG4gICAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IF9leHRlbmRzKHt9LCBwb3BwZXIsIHNoaWZ0T2Zmc2V0c1tzaGlmdHZhcmlhdGlvbl0pO1xuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgdXBkYXRlIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBoaWRlKGRhdGEpIHtcbiAgaWYgKCFpc01vZGlmaWVyUmVxdWlyZWQoZGF0YS5pbnN0YW5jZS5tb2RpZmllcnMsICdoaWRlJywgJ3ByZXZlbnRPdmVyZmxvdycpKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICB2YXIgcmVmUmVjdCA9IGRhdGEub2Zmc2V0cy5yZWZlcmVuY2U7XG4gIHZhciBib3VuZCA9IGZpbmQoZGF0YS5pbnN0YW5jZS5tb2RpZmllcnMsIGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIHJldHVybiBtb2RpZmllci5uYW1lID09PSAncHJldmVudE92ZXJmbG93JztcbiAgfSkuYm91bmRhcmllcztcblxuICBpZiAocmVmUmVjdC5ib3R0b20gPCBib3VuZC50b3AgfHwgcmVmUmVjdC5sZWZ0ID4gYm91bmQucmlnaHQgfHwgcmVmUmVjdC50b3AgPiBib3VuZC5ib3R0b20gfHwgcmVmUmVjdC5yaWdodCA8IGJvdW5kLmxlZnQpIHtcbiAgICAvLyBBdm9pZCB1bm5lY2Vzc2FyeSBET00gYWNjZXNzIGlmIHZpc2liaWxpdHkgaGFzbid0IGNoYW5nZWRcbiAgICBpZiAoZGF0YS5oaWRlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBkYXRhLmhpZGUgPSB0cnVlO1xuICAgIGRhdGEuYXR0cmlidXRlc1sneC1vdXQtb2YtYm91bmRhcmllcyddID0gJyc7XG4gIH0gZWxzZSB7XG4gICAgLy8gQXZvaWQgdW5uZWNlc3NhcnkgRE9NIGFjY2VzcyBpZiB2aXNpYmlsaXR5IGhhc24ndCBjaGFuZ2VkXG4gICAgaWYgKGRhdGEuaGlkZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGRhdGEuaGlkZSA9IGZhbHNlO1xuICAgIGRhdGEuYXR0cmlidXRlc1sneC1vdXQtb2YtYm91bmRhcmllcyddID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSBgdXBkYXRlYCBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24gaW5uZXIoZGF0YSkge1xuICB2YXIgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gcGxhY2VtZW50LnNwbGl0KCctJylbMF07XG4gIHZhciBfZGF0YSRvZmZzZXRzID0gZGF0YS5vZmZzZXRzLFxuICAgICAgcG9wcGVyID0gX2RhdGEkb2Zmc2V0cy5wb3BwZXIsXG4gICAgICByZWZlcmVuY2UgPSBfZGF0YSRvZmZzZXRzLnJlZmVyZW5jZTtcblxuICB2YXIgaXNIb3JpeiA9IFsnbGVmdCcsICdyaWdodCddLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgIT09IC0xO1xuXG4gIHZhciBzdWJ0cmFjdExlbmd0aCA9IFsndG9wJywgJ2xlZnQnXS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID09PSAtMTtcblxuICBwb3BwZXJbaXNIb3JpeiA/ICdsZWZ0JyA6ICd0b3AnXSA9IHJlZmVyZW5jZVtiYXNlUGxhY2VtZW50XSAtIChzdWJ0cmFjdExlbmd0aCA/IHBvcHBlcltpc0hvcml6ID8gJ3dpZHRoJyA6ICdoZWlnaHQnXSA6IDApO1xuXG4gIGRhdGEucGxhY2VtZW50ID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQocGxhY2VtZW50KTtcbiAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IGdldENsaWVudFJlY3QocG9wcGVyKTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBNb2RpZmllciBmdW5jdGlvbiwgZWFjaCBtb2RpZmllciBjYW4gaGF2ZSBhIGZ1bmN0aW9uIG9mIHRoaXMgdHlwZSBhc3NpZ25lZFxuICogdG8gaXRzIGBmbmAgcHJvcGVydHkuPGJyIC8+XG4gKiBUaGVzZSBmdW5jdGlvbnMgd2lsbCBiZSBjYWxsZWQgb24gZWFjaCB1cGRhdGUsIHRoaXMgbWVhbnMgdGhhdCB5b3UgbXVzdFxuICogbWFrZSBzdXJlIHRoZXkgYXJlIHBlcmZvcm1hbnQgZW5vdWdoIHRvIGF2b2lkIHBlcmZvcm1hbmNlIGJvdHRsZW5lY2tzLlxuICpcbiAqIEBmdW5jdGlvbiBNb2RpZmllckZuXG4gKiBAYXJndW1lbnQge2RhdGFPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge2RhdGFPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuXG4vKipcbiAqIE1vZGlmaWVycyBhcmUgcGx1Z2lucyB1c2VkIHRvIGFsdGVyIHRoZSBiZWhhdmlvciBvZiB5b3VyIHBvcHBlcnMuPGJyIC8+XG4gKiBQb3BwZXIuanMgdXNlcyBhIHNldCBvZiA5IG1vZGlmaWVycyB0byBwcm92aWRlIGFsbCB0aGUgYmFzaWMgZnVuY3Rpb25hbGl0aWVzXG4gKiBuZWVkZWQgYnkgdGhlIGxpYnJhcnkuXG4gKlxuICogVXN1YWxseSB5b3UgZG9uJ3Qgd2FudCB0byBvdmVycmlkZSB0aGUgYG9yZGVyYCwgYGZuYCBhbmQgYG9uTG9hZGAgcHJvcHMuXG4gKiBBbGwgdGhlIG90aGVyIHByb3BlcnRpZXMgYXJlIGNvbmZpZ3VyYXRpb25zIHRoYXQgY291bGQgYmUgdHdlYWtlZC5cbiAqIEBuYW1lc3BhY2UgbW9kaWZpZXJzXG4gKi9cbnZhciBtb2RpZmllcnMgPSB7XG4gIC8qKlxuICAgKiBNb2RpZmllciB1c2VkIHRvIHNoaWZ0IHRoZSBwb3BwZXIgb24gdGhlIHN0YXJ0IG9yIGVuZCBvZiBpdHMgcmVmZXJlbmNlXG4gICAqIGVsZW1lbnQuPGJyIC8+XG4gICAqIEl0IHdpbGwgcmVhZCB0aGUgdmFyaWF0aW9uIG9mIHRoZSBgcGxhY2VtZW50YCBwcm9wZXJ0eS48YnIgLz5cbiAgICogSXQgY2FuIGJlIG9uZSBlaXRoZXIgYC1lbmRgIG9yIGAtc3RhcnRgLlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgc2hpZnQ6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9MTAwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiAxMDAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPXRydWUgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBzaGlmdFxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGUgYG9mZnNldGAgbW9kaWZpZXIgY2FuIHNoaWZ0IHlvdXIgcG9wcGVyIG9uIGJvdGggaXRzIGF4aXMuXG4gICAqXG4gICAqIEl0IGFjY2VwdHMgdGhlIGZvbGxvd2luZyB1bml0czpcbiAgICogLSBgcHhgIG9yIHVuaXQtbGVzcywgaW50ZXJwcmV0ZWQgYXMgcGl4ZWxzXG4gICAqIC0gYCVgIG9yIGAlcmAsIHBlcmNlbnRhZ2UgcmVsYXRpdmUgdG8gdGhlIGxlbmd0aCBvZiB0aGUgcmVmZXJlbmNlIGVsZW1lbnRcbiAgICogLSBgJXBgLCBwZXJjZW50YWdlIHJlbGF0aXZlIHRvIHRoZSBsZW5ndGggb2YgdGhlIHBvcHBlciBlbGVtZW50XG4gICAqIC0gYHZ3YCwgQ1NTIHZpZXdwb3J0IHdpZHRoIHVuaXRcbiAgICogLSBgdmhgLCBDU1Mgdmlld3BvcnQgaGVpZ2h0IHVuaXRcbiAgICpcbiAgICogRm9yIGxlbmd0aCBpcyBpbnRlbmRlZCB0aGUgbWFpbiBheGlzIHJlbGF0aXZlIHRvIHRoZSBwbGFjZW1lbnQgb2YgdGhlIHBvcHBlci48YnIgLz5cbiAgICogVGhpcyBtZWFucyB0aGF0IGlmIHRoZSBwbGFjZW1lbnQgaXMgYHRvcGAgb3IgYGJvdHRvbWAsIHRoZSBsZW5ndGggd2lsbCBiZSB0aGVcbiAgICogYHdpZHRoYC4gSW4gY2FzZSBvZiBgbGVmdGAgb3IgYHJpZ2h0YCwgaXQgd2lsbCBiZSB0aGUgYGhlaWdodGAuXG4gICAqXG4gICAqIFlvdSBjYW4gcHJvdmlkZSBhIHNpbmdsZSB2YWx1ZSAoYXMgYE51bWJlcmAgb3IgYFN0cmluZ2ApLCBvciBhIHBhaXIgb2YgdmFsdWVzXG4gICAqIGFzIGBTdHJpbmdgIGRpdmlkZWQgYnkgYSBjb21tYSBvciBvbmUgKG9yIG1vcmUpIHdoaXRlIHNwYWNlcy48YnIgLz5cbiAgICogVGhlIGxhdHRlciBpcyBhIGRlcHJlY2F0ZWQgbWV0aG9kIGJlY2F1c2UgaXQgbGVhZHMgdG8gY29uZnVzaW9uIGFuZCB3aWxsIGJlXG4gICAqIHJlbW92ZWQgaW4gdjIuPGJyIC8+XG4gICAqIEFkZGl0aW9uYWxseSwgaXQgYWNjZXB0cyBhZGRpdGlvbnMgYW5kIHN1YnRyYWN0aW9ucyBiZXR3ZWVuIGRpZmZlcmVudCB1bml0cy5cbiAgICogTm90ZSB0aGF0IG11bHRpcGxpY2F0aW9ucyBhbmQgZGl2aXNpb25zIGFyZW4ndCBzdXBwb3J0ZWQuXG4gICAqXG4gICAqIFZhbGlkIGV4YW1wbGVzIGFyZTpcbiAgICogYGBgXG4gICAqIDEwXG4gICAqICcxMCUnXG4gICAqICcxMCwgMTAnXG4gICAqICcxMCUsIDEwJ1xuICAgKiAnMTAgKyAxMCUnXG4gICAqICcxMCAtIDV2aCArIDMlJ1xuICAgKiAnLTEwcHggKyA1dmgsIDVweCAtIDYlJ1xuICAgKiBgYGBcbiAgICogPiAqKk5CKio6IElmIHlvdSBkZXNpcmUgdG8gYXBwbHkgb2Zmc2V0cyB0byB5b3VyIHBvcHBlcnMgaW4gYSB3YXkgdGhhdCBtYXkgbWFrZSB0aGVtIG92ZXJsYXBcbiAgICogPiB3aXRoIHRoZWlyIHJlZmVyZW5jZSBlbGVtZW50LCB1bmZvcnR1bmF0ZWx5LCB5b3Ugd2lsbCBoYXZlIHRvIGRpc2FibGUgdGhlIGBmbGlwYCBtb2RpZmllci5cbiAgICogPiBZb3UgY2FuIHJlYWQgbW9yZSBvbiB0aGlzIGF0IHRoaXMgW2lzc3VlXShodHRwczovL2dpdGh1Yi5jb20vRmV6VnJhc3RhL3BvcHBlci5qcy9pc3N1ZXMvMzczKS5cbiAgICpcbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIG9mZnNldDoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj0yMDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDIwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IG9mZnNldCxcbiAgICAvKiogQHByb3Age051bWJlcnxTdHJpbmd9IG9mZnNldD0wXG4gICAgICogVGhlIG9mZnNldCB2YWx1ZSBhcyBkZXNjcmliZWQgaW4gdGhlIG1vZGlmaWVyIGRlc2NyaXB0aW9uXG4gICAgICovXG4gICAgb2Zmc2V0OiAwXG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gcHJldmVudCB0aGUgcG9wcGVyIGZyb20gYmVpbmcgcG9zaXRpb25lZCBvdXRzaWRlIHRoZSBib3VuZGFyeS5cbiAgICpcbiAgICogQSBzY2VuYXJpbyBleGlzdHMgd2hlcmUgdGhlIHJlZmVyZW5jZSBpdHNlbGYgaXMgbm90IHdpdGhpbiB0aGUgYm91bmRhcmllcy48YnIgLz5cbiAgICogV2UgY2FuIHNheSBpdCBoYXMgXCJlc2NhcGVkIHRoZSBib3VuZGFyaWVzXCIg4oCUIG9yIGp1c3QgXCJlc2NhcGVkXCIuPGJyIC8+XG4gICAqIEluIHRoaXMgY2FzZSB3ZSBuZWVkIHRvIGRlY2lkZSB3aGV0aGVyIHRoZSBwb3BwZXIgc2hvdWxkIGVpdGhlcjpcbiAgICpcbiAgICogLSBkZXRhY2ggZnJvbSB0aGUgcmVmZXJlbmNlIGFuZCByZW1haW4gXCJ0cmFwcGVkXCIgaW4gdGhlIGJvdW5kYXJpZXMsIG9yXG4gICAqIC0gaWYgaXQgc2hvdWxkIGlnbm9yZSB0aGUgYm91bmRhcnkgYW5kIFwiZXNjYXBlIHdpdGggaXRzIHJlZmVyZW5jZVwiXG4gICAqXG4gICAqIFdoZW4gYGVzY2FwZVdpdGhSZWZlcmVuY2VgIGlzIHNldCB0b2B0cnVlYCBhbmQgcmVmZXJlbmNlIGlzIGNvbXBsZXRlbHlcbiAgICogb3V0c2lkZSBpdHMgYm91bmRhcmllcywgdGhlIHBvcHBlciB3aWxsIG92ZXJmbG93IChvciBjb21wbGV0ZWx5IGxlYXZlKVxuICAgKiB0aGUgYm91bmRhcmllcyBpbiBvcmRlciB0byByZW1haW4gYXR0YWNoZWQgdG8gdGhlIGVkZ2Ugb2YgdGhlIHJlZmVyZW5jZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIHByZXZlbnRPdmVyZmxvdzoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj0zMDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDMwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IHByZXZlbnRPdmVyZmxvdyxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7QXJyYXl9IFtwcmlvcml0eT1bJ2xlZnQnLCdyaWdodCcsJ3RvcCcsJ2JvdHRvbSddXVxuICAgICAqIFBvcHBlciB3aWxsIHRyeSB0byBwcmV2ZW50IG92ZXJmbG93IGZvbGxvd2luZyB0aGVzZSBwcmlvcml0aWVzIGJ5IGRlZmF1bHQsXG4gICAgICogdGhlbiwgaXQgY291bGQgb3ZlcmZsb3cgb24gdGhlIGxlZnQgYW5kIG9uIHRvcCBvZiB0aGUgYGJvdW5kYXJpZXNFbGVtZW50YFxuICAgICAqL1xuICAgIHByaW9yaXR5OiBbJ2xlZnQnLCAncmlnaHQnLCAndG9wJywgJ2JvdHRvbSddLFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtudW1iZXJ9IHBhZGRpbmc9NVxuICAgICAqIEFtb3VudCBvZiBwaXhlbCB1c2VkIHRvIGRlZmluZSBhIG1pbmltdW0gZGlzdGFuY2UgYmV0d2VlbiB0aGUgYm91bmRhcmllc1xuICAgICAqIGFuZCB0aGUgcG9wcGVyLiBUaGlzIG1ha2VzIHN1cmUgdGhlIHBvcHBlciBhbHdheXMgaGFzIGEgbGl0dGxlIHBhZGRpbmdcbiAgICAgKiBiZXR3ZWVuIHRoZSBlZGdlcyBvZiBpdHMgY29udGFpbmVyXG4gICAgICovXG4gICAgcGFkZGluZzogNSxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7U3RyaW5nfEhUTUxFbGVtZW50fSBib3VuZGFyaWVzRWxlbWVudD0nc2Nyb2xsUGFyZW50J1xuICAgICAqIEJvdW5kYXJpZXMgdXNlZCBieSB0aGUgbW9kaWZpZXIuIENhbiBiZSBgc2Nyb2xsUGFyZW50YCwgYHdpbmRvd2AsXG4gICAgICogYHZpZXdwb3J0YCBvciBhbnkgRE9NIGVsZW1lbnQuXG4gICAgICovXG4gICAgYm91bmRhcmllc0VsZW1lbnQ6ICdzY3JvbGxQYXJlbnQnXG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gbWFrZSBzdXJlIHRoZSByZWZlcmVuY2UgYW5kIGl0cyBwb3BwZXIgc3RheSBuZWFyIGVhY2ggb3RoZXJcbiAgICogd2l0aG91dCBsZWF2aW5nIGFueSBnYXAgYmV0d2VlbiB0aGUgdHdvLiBFc3BlY2lhbGx5IHVzZWZ1bCB3aGVuIHRoZSBhcnJvdyBpc1xuICAgKiBlbmFibGVkIGFuZCB5b3Ugd2FudCB0byBlbnN1cmUgdGhhdCBpdCBwb2ludHMgdG8gaXRzIHJlZmVyZW5jZSBlbGVtZW50LlxuICAgKiBJdCBjYXJlcyBvbmx5IGFib3V0IHRoZSBmaXJzdCBheGlzLiBZb3UgY2FuIHN0aWxsIGhhdmUgcG9wcGVycyB3aXRoIG1hcmdpblxuICAgKiBiZXR3ZWVuIHRoZSBwb3BwZXIgYW5kIGl0cyByZWZlcmVuY2UgZWxlbWVudC5cbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIGtlZXBUb2dldGhlcjoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj00MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDQwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGtlZXBUb2dldGhlclxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGlzIG1vZGlmaWVyIGlzIHVzZWQgdG8gbW92ZSB0aGUgYGFycm93RWxlbWVudGAgb2YgdGhlIHBvcHBlciB0byBtYWtlXG4gICAqIHN1cmUgaXQgaXMgcG9zaXRpb25lZCBiZXR3ZWVuIHRoZSByZWZlcmVuY2UgZWxlbWVudCBhbmQgaXRzIHBvcHBlciBlbGVtZW50LlxuICAgKiBJdCB3aWxsIHJlYWQgdGhlIG91dGVyIHNpemUgb2YgdGhlIGBhcnJvd0VsZW1lbnRgIG5vZGUgdG8gZGV0ZWN0IGhvdyBtYW55XG4gICAqIHBpeGVscyBvZiBjb25qdW5jdGlvbiBhcmUgbmVlZGVkLlxuICAgKlxuICAgKiBJdCBoYXMgbm8gZWZmZWN0IGlmIG5vIGBhcnJvd0VsZW1lbnRgIGlzIHByb3ZpZGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgYXJyb3c6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9NTAwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiA1MDAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPXRydWUgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBhcnJvdyxcbiAgICAvKiogQHByb3Age1N0cmluZ3xIVE1MRWxlbWVudH0gZWxlbWVudD0nW3gtYXJyb3ddJyAtIFNlbGVjdG9yIG9yIG5vZGUgdXNlZCBhcyBhcnJvdyAqL1xuICAgIGVsZW1lbnQ6ICdbeC1hcnJvd10nXG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gZmxpcCB0aGUgcG9wcGVyJ3MgcGxhY2VtZW50IHdoZW4gaXQgc3RhcnRzIHRvIG92ZXJsYXAgaXRzXG4gICAqIHJlZmVyZW5jZSBlbGVtZW50LlxuICAgKlxuICAgKiBSZXF1aXJlcyB0aGUgYHByZXZlbnRPdmVyZmxvd2AgbW9kaWZpZXIgYmVmb3JlIGl0IGluIG9yZGVyIHRvIHdvcmsuXG4gICAqXG4gICAqICoqTk9URToqKiB0aGlzIG1vZGlmaWVyIHdpbGwgaW50ZXJydXB0IHRoZSBjdXJyZW50IHVwZGF0ZSBjeWNsZSBhbmQgd2lsbFxuICAgKiByZXN0YXJ0IGl0IGlmIGl0IGRldGVjdHMgdGhlIG5lZWQgdG8gZmxpcCB0aGUgcGxhY2VtZW50LlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgZmxpcDoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj02MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDYwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGZsaXAsXG4gICAgLyoqXG4gICAgICogQHByb3Age1N0cmluZ3xBcnJheX0gYmVoYXZpb3I9J2ZsaXAnXG4gICAgICogVGhlIGJlaGF2aW9yIHVzZWQgdG8gY2hhbmdlIHRoZSBwb3BwZXIncyBwbGFjZW1lbnQuIEl0IGNhbiBiZSBvbmUgb2ZcbiAgICAgKiBgZmxpcGAsIGBjbG9ja3dpc2VgLCBgY291bnRlcmNsb2Nrd2lzZWAgb3IgYW4gYXJyYXkgd2l0aCBhIGxpc3Qgb2YgdmFsaWRcbiAgICAgKiBwbGFjZW1lbnRzICh3aXRoIG9wdGlvbmFsIHZhcmlhdGlvbnMpXG4gICAgICovXG4gICAgYmVoYXZpb3I6ICdmbGlwJyxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7bnVtYmVyfSBwYWRkaW5nPTVcbiAgICAgKiBUaGUgcG9wcGVyIHdpbGwgZmxpcCBpZiBpdCBoaXRzIHRoZSBlZGdlcyBvZiB0aGUgYGJvdW5kYXJpZXNFbGVtZW50YFxuICAgICAqL1xuICAgIHBhZGRpbmc6IDUsXG4gICAgLyoqXG4gICAgICogQHByb3Age1N0cmluZ3xIVE1MRWxlbWVudH0gYm91bmRhcmllc0VsZW1lbnQ9J3ZpZXdwb3J0J1xuICAgICAqIFRoZSBlbGVtZW50IHdoaWNoIHdpbGwgZGVmaW5lIHRoZSBib3VuZGFyaWVzIG9mIHRoZSBwb3BwZXIgcG9zaXRpb24uXG4gICAgICogVGhlIHBvcHBlciB3aWxsIG5ldmVyIGJlIHBsYWNlZCBvdXRzaWRlIG9mIHRoZSBkZWZpbmVkIGJvdW5kYXJpZXNcbiAgICAgKiAoZXhjZXB0IGlmIGBrZWVwVG9nZXRoZXJgIGlzIGVuYWJsZWQpXG4gICAgICovXG4gICAgYm91bmRhcmllc0VsZW1lbnQ6ICd2aWV3cG9ydCcsXG4gICAgLyoqXG4gICAgICogQHByb3Age0Jvb2xlYW59IGZsaXBWYXJpYXRpb25zPWZhbHNlXG4gICAgICogVGhlIHBvcHBlciB3aWxsIHN3aXRjaCBwbGFjZW1lbnQgdmFyaWF0aW9uIGJldHdlZW4gYC1zdGFydGAgYW5kIGAtZW5kYCB3aGVuXG4gICAgICogdGhlIHJlZmVyZW5jZSBlbGVtZW50IG92ZXJsYXBzIGl0cyBib3VuZGFyaWVzLlxuICAgICAqXG4gICAgICogVGhlIG9yaWdpbmFsIHBsYWNlbWVudCBzaG91bGQgaGF2ZSBhIHNldCB2YXJpYXRpb24uXG4gICAgICovXG4gICAgZmxpcFZhcmlhdGlvbnM6IGZhbHNlLFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtCb29sZWFufSBmbGlwVmFyaWF0aW9uc0J5Q29udGVudD1mYWxzZVxuICAgICAqIFRoZSBwb3BwZXIgd2lsbCBzd2l0Y2ggcGxhY2VtZW50IHZhcmlhdGlvbiBiZXR3ZWVuIGAtc3RhcnRgIGFuZCBgLWVuZGAgd2hlblxuICAgICAqIHRoZSBwb3BwZXIgZWxlbWVudCBvdmVybGFwcyBpdHMgcmVmZXJlbmNlIGJvdW5kYXJpZXMuXG4gICAgICpcbiAgICAgKiBUaGUgb3JpZ2luYWwgcGxhY2VtZW50IHNob3VsZCBoYXZlIGEgc2V0IHZhcmlhdGlvbi5cbiAgICAgKi9cbiAgICBmbGlwVmFyaWF0aW9uc0J5Q29udGVudDogZmFsc2VcbiAgfSxcblxuICAvKipcbiAgICogTW9kaWZpZXIgdXNlZCB0byBtYWtlIHRoZSBwb3BwZXIgZmxvdyB0b3dhcmQgdGhlIGlubmVyIG9mIHRoZSByZWZlcmVuY2UgZWxlbWVudC5cbiAgICogQnkgZGVmYXVsdCwgd2hlbiB0aGlzIG1vZGlmaWVyIGlzIGRpc2FibGVkLCB0aGUgcG9wcGVyIHdpbGwgYmUgcGxhY2VkIG91dHNpZGVcbiAgICogdGhlIHJlZmVyZW5jZSBlbGVtZW50LlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgaW5uZXI6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9NzAwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiA3MDAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPWZhbHNlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGlubmVyXG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gaGlkZSB0aGUgcG9wcGVyIHdoZW4gaXRzIHJlZmVyZW5jZSBlbGVtZW50IGlzIG91dHNpZGUgb2YgdGhlXG4gICAqIHBvcHBlciBib3VuZGFyaWVzLiBJdCB3aWxsIHNldCBhIGB4LW91dC1vZi1ib3VuZGFyaWVzYCBhdHRyaWJ1dGUgd2hpY2ggY2FuXG4gICAqIGJlIHVzZWQgdG8gaGlkZSB3aXRoIGEgQ1NTIHNlbGVjdG9yIHRoZSBwb3BwZXIgd2hlbiBpdHMgcmVmZXJlbmNlIGlzXG4gICAqIG91dCBvZiBib3VuZGFyaWVzLlxuICAgKlxuICAgKiBSZXF1aXJlcyB0aGUgYHByZXZlbnRPdmVyZmxvd2AgbW9kaWZpZXIgYmVmb3JlIGl0IGluIG9yZGVyIHRvIHdvcmsuXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBoaWRlOiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTgwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogODAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogaGlkZVxuICB9LFxuXG4gIC8qKlxuICAgKiBDb21wdXRlcyB0aGUgc3R5bGUgdGhhdCB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIHBvcHBlciBlbGVtZW50IHRvIGdldHNcbiAgICogcHJvcGVybHkgcG9zaXRpb25lZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgbW9kaWZpZXIgd2lsbCBub3QgdG91Y2ggdGhlIERPTSwgaXQganVzdCBwcmVwYXJlcyB0aGUgc3R5bGVzXG4gICAqIHNvIHRoYXQgYGFwcGx5U3R5bGVgIG1vZGlmaWVyIGNhbiBhcHBseSBpdC4gVGhpcyBzZXBhcmF0aW9uIGlzIHVzZWZ1bFxuICAgKiBpbiBjYXNlIHlvdSBuZWVkIHRvIHJlcGxhY2UgYGFwcGx5U3R5bGVgIHdpdGggYSBjdXN0b20gaW1wbGVtZW50YXRpb24uXG4gICAqXG4gICAqIFRoaXMgbW9kaWZpZXIgaGFzIGA4NTBgIGFzIGBvcmRlcmAgdmFsdWUgdG8gbWFpbnRhaW4gYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgKiB3aXRoIHByZXZpb3VzIHZlcnNpb25zIG9mIFBvcHBlci5qcy4gRXhwZWN0IHRoZSBtb2RpZmllcnMgb3JkZXJpbmcgbWV0aG9kXG4gICAqIHRvIGNoYW5nZSBpbiBmdXR1cmUgbWFqb3IgdmVyc2lvbnMgb2YgdGhlIGxpYnJhcnkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBjb21wdXRlU3R5bGU6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9ODUwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiA4NTAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPXRydWUgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBjb21wdXRlU3R5bGUsXG4gICAgLyoqXG4gICAgICogQHByb3Age0Jvb2xlYW59IGdwdUFjY2VsZXJhdGlvbj10cnVlXG4gICAgICogSWYgdHJ1ZSwgaXQgdXNlcyB0aGUgQ1NTIDNEIHRyYW5zZm9ybWF0aW9uIHRvIHBvc2l0aW9uIHRoZSBwb3BwZXIuXG4gICAgICogT3RoZXJ3aXNlLCBpdCB3aWxsIHVzZSB0aGUgYHRvcGAgYW5kIGBsZWZ0YCBwcm9wZXJ0aWVzXG4gICAgICovXG4gICAgZ3B1QWNjZWxlcmF0aW9uOiB0cnVlLFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtzdHJpbmd9IFt4PSdib3R0b20nXVxuICAgICAqIFdoZXJlIHRvIGFuY2hvciB0aGUgWCBheGlzIChgYm90dG9tYCBvciBgdG9wYCkuIEFLQSBYIG9mZnNldCBvcmlnaW4uXG4gICAgICogQ2hhbmdlIHRoaXMgaWYgeW91ciBwb3BwZXIgc2hvdWxkIGdyb3cgaW4gYSBkaXJlY3Rpb24gZGlmZmVyZW50IGZyb20gYGJvdHRvbWBcbiAgICAgKi9cbiAgICB4OiAnYm90dG9tJyxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7c3RyaW5nfSBbeD0nbGVmdCddXG4gICAgICogV2hlcmUgdG8gYW5jaG9yIHRoZSBZIGF4aXMgKGBsZWZ0YCBvciBgcmlnaHRgKS4gQUtBIFkgb2Zmc2V0IG9yaWdpbi5cbiAgICAgKiBDaGFuZ2UgdGhpcyBpZiB5b3VyIHBvcHBlciBzaG91bGQgZ3JvdyBpbiBhIGRpcmVjdGlvbiBkaWZmZXJlbnQgZnJvbSBgcmlnaHRgXG4gICAgICovXG4gICAgeTogJ3JpZ2h0J1xuICB9LFxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHRoZSBjb21wdXRlZCBzdHlsZXMgdG8gdGhlIHBvcHBlciBlbGVtZW50LlxuICAgKlxuICAgKiBBbGwgdGhlIERPTSBtYW5pcHVsYXRpb25zIGFyZSBsaW1pdGVkIHRvIHRoaXMgbW9kaWZpZXIuIFRoaXMgaXMgdXNlZnVsIGluIGNhc2VcbiAgICogeW91IHdhbnQgdG8gaW50ZWdyYXRlIFBvcHBlci5qcyBpbnNpZGUgYSBmcmFtZXdvcmsgb3IgdmlldyBsaWJyYXJ5IGFuZCB5b3VcbiAgICogd2FudCB0byBkZWxlZ2F0ZSBhbGwgdGhlIERPTSBtYW5pcHVsYXRpb25zIHRvIGl0LlxuICAgKlxuICAgKiBOb3RlIHRoYXQgaWYgeW91IGRpc2FibGUgdGhpcyBtb2RpZmllciwgeW91IG11c3QgbWFrZSBzdXJlIHRoZSBwb3BwZXIgZWxlbWVudFxuICAgKiBoYXMgaXRzIHBvc2l0aW9uIHNldCB0byBgYWJzb2x1dGVgIGJlZm9yZSBQb3BwZXIuanMgY2FuIGRvIGl0cyB3b3JrIVxuICAgKlxuICAgKiBKdXN0IGRpc2FibGUgdGhpcyBtb2RpZmllciBhbmQgZGVmaW5lIHlvdXIgb3duIHRvIGFjaGlldmUgdGhlIGRlc2lyZWQgZWZmZWN0LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgYXBwbHlTdHlsZToge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj05MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDkwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGFwcGx5U3R5bGUsXG4gICAgLyoqIEBwcm9wIHtGdW5jdGlvbn0gKi9cbiAgICBvbkxvYWQ6IGFwcGx5U3R5bGVPbkxvYWQsXG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAxLjEwLjAsIHRoZSBwcm9wZXJ0eSBtb3ZlZCB0byBgY29tcHV0ZVN0eWxlYCBtb2RpZmllclxuICAgICAqIEBwcm9wIHtCb29sZWFufSBncHVBY2NlbGVyYXRpb249dHJ1ZVxuICAgICAqIElmIHRydWUsIGl0IHVzZXMgdGhlIENTUyAzRCB0cmFuc2Zvcm1hdGlvbiB0byBwb3NpdGlvbiB0aGUgcG9wcGVyLlxuICAgICAqIE90aGVyd2lzZSwgaXQgd2lsbCB1c2UgdGhlIGB0b3BgIGFuZCBgbGVmdGAgcHJvcGVydGllc1xuICAgICAqL1xuICAgIGdwdUFjY2VsZXJhdGlvbjogdW5kZWZpbmVkXG4gIH1cbn07XG5cbi8qKlxuICogVGhlIGBkYXRhT2JqZWN0YCBpcyBhbiBvYmplY3QgY29udGFpbmluZyBhbGwgdGhlIGluZm9ybWF0aW9uIHVzZWQgYnkgUG9wcGVyLmpzLlxuICogVGhpcyBvYmplY3QgaXMgcGFzc2VkIHRvIG1vZGlmaWVycyBhbmQgdG8gdGhlIGBvbkNyZWF0ZWAgYW5kIGBvblVwZGF0ZWAgY2FsbGJhY2tzLlxuICogQG5hbWUgZGF0YU9iamVjdFxuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEuaW5zdGFuY2UgVGhlIFBvcHBlci5qcyBpbnN0YW5jZVxuICogQHByb3BlcnR5IHtTdHJpbmd9IGRhdGEucGxhY2VtZW50IFBsYWNlbWVudCBhcHBsaWVkIHRvIHBvcHBlclxuICogQHByb3BlcnR5IHtTdHJpbmd9IGRhdGEub3JpZ2luYWxQbGFjZW1lbnQgUGxhY2VtZW50IG9yaWdpbmFsbHkgZGVmaW5lZCBvbiBpbml0XG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGRhdGEuZmxpcHBlZCBUcnVlIGlmIHBvcHBlciBoYXMgYmVlbiBmbGlwcGVkIGJ5IGZsaXAgbW9kaWZpZXJcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGF0YS5oaWRlIFRydWUgaWYgdGhlIHJlZmVyZW5jZSBlbGVtZW50IGlzIG91dCBvZiBib3VuZGFyaWVzLCB1c2VmdWwgdG8ga25vdyB3aGVuIHRvIGhpZGUgdGhlIHBvcHBlclxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZGF0YS5hcnJvd0VsZW1lbnQgTm9kZSB1c2VkIGFzIGFycm93IGJ5IGFycm93IG1vZGlmaWVyXG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5zdHlsZXMgQW55IENTUyBwcm9wZXJ0eSBkZWZpbmVkIGhlcmUgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIuIEl0IGV4cGVjdHMgdGhlIEphdmFTY3JpcHQgbm9tZW5jbGF0dXJlIChlZy4gYG1hcmdpbkJvdHRvbWApXG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5hcnJvd1N0eWxlcyBBbnkgQ1NTIHByb3BlcnR5IGRlZmluZWQgaGVyZSB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIHBvcHBlciBhcnJvdy4gSXQgZXhwZWN0cyB0aGUgSmF2YVNjcmlwdCBub21lbmNsYXR1cmUgKGVnLiBgbWFyZ2luQm90dG9tYClcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkYXRhLmJvdW5kYXJpZXMgT2Zmc2V0cyBvZiB0aGUgcG9wcGVyIGJvdW5kYXJpZXNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkYXRhLm9mZnNldHMgVGhlIG1lYXN1cmVtZW50cyBvZiBwb3BwZXIsIHJlZmVyZW5jZSBhbmQgYXJyb3cgZWxlbWVudHNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkYXRhLm9mZnNldHMucG9wcGVyIGB0b3BgLCBgbGVmdGAsIGB3aWR0aGAsIGBoZWlnaHRgIHZhbHVlc1xuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEub2Zmc2V0cy5yZWZlcmVuY2UgYHRvcGAsIGBsZWZ0YCwgYHdpZHRoYCwgYGhlaWdodGAgdmFsdWVzXG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5vZmZzZXRzLmFycm93XSBgdG9wYCBhbmQgYGxlZnRgIG9mZnNldHMsIG9ubHkgb25lIG9mIHRoZW0gd2lsbCBiZSBkaWZmZXJlbnQgZnJvbSAwXG4gKi9cblxuLyoqXG4gKiBEZWZhdWx0IG9wdGlvbnMgcHJvdmlkZWQgdG8gUG9wcGVyLmpzIGNvbnN0cnVjdG9yLjxiciAvPlxuICogVGhlc2UgY2FuIGJlIG92ZXJyaWRkZW4gdXNpbmcgdGhlIGBvcHRpb25zYCBhcmd1bWVudCBvZiBQb3BwZXIuanMuPGJyIC8+XG4gKiBUbyBvdmVycmlkZSBhbiBvcHRpb24sIHNpbXBseSBwYXNzIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lXG4gKiBzdHJ1Y3R1cmUgb2YgdGhlIGBvcHRpb25zYCBvYmplY3QsIGFzIHRoZSAzcmQgYXJndW1lbnQuIEZvciBleGFtcGxlOlxuICogYGBgXG4gKiBuZXcgUG9wcGVyKHJlZiwgcG9wLCB7XG4gKiAgIG1vZGlmaWVyczoge1xuICogICAgIHByZXZlbnRPdmVyZmxvdzogeyBlbmFibGVkOiBmYWxzZSB9XG4gKiAgIH1cbiAqIH0pXG4gKiBgYGBcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyb2YgUG9wcGVyXG4gKi9cbnZhciBEZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIFBvcHBlcidzIHBsYWNlbWVudC5cbiAgICogQHByb3Age1BvcHBlci5wbGFjZW1lbnRzfSBwbGFjZW1lbnQ9J2JvdHRvbSdcbiAgICovXG4gIHBsYWNlbWVudDogJ2JvdHRvbScsXG5cbiAgLyoqXG4gICAqIFNldCB0aGlzIHRvIHRydWUgaWYgeW91IHdhbnQgcG9wcGVyIHRvIHBvc2l0aW9uIGl0IHNlbGYgaW4gJ2ZpeGVkJyBtb2RlXG4gICAqIEBwcm9wIHtCb29sZWFufSBwb3NpdGlvbkZpeGVkPWZhbHNlXG4gICAqL1xuICBwb3NpdGlvbkZpeGVkOiBmYWxzZSxcblxuICAvKipcbiAgICogV2hldGhlciBldmVudHMgKHJlc2l6ZSwgc2Nyb2xsKSBhcmUgaW5pdGlhbGx5IGVuYWJsZWQuXG4gICAqIEBwcm9wIHtCb29sZWFufSBldmVudHNFbmFibGVkPXRydWVcbiAgICovXG4gIGV2ZW50c0VuYWJsZWQ6IHRydWUsXG5cbiAgLyoqXG4gICAqIFNldCB0byB0cnVlIGlmIHlvdSB3YW50IHRvIGF1dG9tYXRpY2FsbHkgcmVtb3ZlIHRoZSBwb3BwZXIgd2hlblxuICAgKiB5b3UgY2FsbCB0aGUgYGRlc3Ryb3lgIG1ldGhvZC5cbiAgICogQHByb3Age0Jvb2xlYW59IHJlbW92ZU9uRGVzdHJveT1mYWxzZVxuICAgKi9cbiAgcmVtb3ZlT25EZXN0cm95OiBmYWxzZSxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgY2FsbGVkIHdoZW4gdGhlIHBvcHBlciBpcyBjcmVhdGVkLjxiciAvPlxuICAgKiBCeSBkZWZhdWx0LCBpdCBpcyBzZXQgdG8gbm8tb3AuPGJyIC8+XG4gICAqIEFjY2VzcyBQb3BwZXIuanMgaW5zdGFuY2Ugd2l0aCBgZGF0YS5pbnN0YW5jZWAuXG4gICAqIEBwcm9wIHtvbkNyZWF0ZX1cbiAgICovXG4gIG9uQ3JlYXRlOiBmdW5jdGlvbiBvbkNyZWF0ZSgpIHt9LFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBjYWxsZWQgd2hlbiB0aGUgcG9wcGVyIGlzIHVwZGF0ZWQuIFRoaXMgY2FsbGJhY2sgaXMgbm90IGNhbGxlZFxuICAgKiBvbiB0aGUgaW5pdGlhbGl6YXRpb24vY3JlYXRpb24gb2YgdGhlIHBvcHBlciwgYnV0IG9ubHkgb24gc3Vic2VxdWVudFxuICAgKiB1cGRhdGVzLjxiciAvPlxuICAgKiBCeSBkZWZhdWx0LCBpdCBpcyBzZXQgdG8gbm8tb3AuPGJyIC8+XG4gICAqIEFjY2VzcyBQb3BwZXIuanMgaW5zdGFuY2Ugd2l0aCBgZGF0YS5pbnN0YW5jZWAuXG4gICAqIEBwcm9wIHtvblVwZGF0ZX1cbiAgICovXG4gIG9uVXBkYXRlOiBmdW5jdGlvbiBvblVwZGF0ZSgpIHt9LFxuXG4gIC8qKlxuICAgKiBMaXN0IG9mIG1vZGlmaWVycyB1c2VkIHRvIG1vZGlmeSB0aGUgb2Zmc2V0cyBiZWZvcmUgdGhleSBhcmUgYXBwbGllZCB0byB0aGUgcG9wcGVyLlxuICAgKiBUaGV5IHByb3ZpZGUgbW9zdCBvZiB0aGUgZnVuY3Rpb25hbGl0aWVzIG9mIFBvcHBlci5qcy5cbiAgICogQHByb3Age21vZGlmaWVyc31cbiAgICovXG4gIG1vZGlmaWVyczogbW9kaWZpZXJzXG59O1xuXG4vKipcbiAqIEBjYWxsYmFjayBvbkNyZWF0ZVxuICogQHBhcmFtIHtkYXRhT2JqZWN0fSBkYXRhXG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgb25VcGRhdGVcbiAqIEBwYXJhbSB7ZGF0YU9iamVjdH0gZGF0YVxuICovXG5cbi8vIFV0aWxzXG4vLyBNZXRob2RzXG52YXIgUG9wcGVyID0gZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBQb3BwZXIuanMgaW5zdGFuY2UuXG4gICAqIEBjbGFzcyBQb3BwZXJcbiAgICogQHBhcmFtIHtFbGVtZW50fHJlZmVyZW5jZU9iamVjdH0gcmVmZXJlbmNlIC0gVGhlIHJlZmVyZW5jZSBlbGVtZW50IHVzZWQgdG8gcG9zaXRpb24gdGhlIHBvcHBlclxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IHBvcHBlciAtIFRoZSBIVE1MIC8gWE1MIGVsZW1lbnQgdXNlZCBhcyB0aGUgcG9wcGVyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gWW91ciBjdXN0b20gb3B0aW9ucyB0byBvdmVycmlkZSB0aGUgb25lcyBkZWZpbmVkIGluIFtEZWZhdWx0c10oI2RlZmF1bHRzKVxuICAgKiBAcmV0dXJuIHtPYmplY3R9IGluc3RhbmNlIC0gVGhlIGdlbmVyYXRlZCBQb3BwZXIuanMgaW5zdGFuY2VcbiAgICovXG4gIGZ1bmN0aW9uIFBvcHBlcihyZWZlcmVuY2UsIHBvcHBlcikge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgUG9wcGVyKTtcblxuICAgIHRoaXMuc2NoZWR1bGVVcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKF90aGlzLnVwZGF0ZSk7XG4gICAgfTtcblxuICAgIC8vIG1ha2UgdXBkYXRlKCkgZGVib3VuY2VkLCBzbyB0aGF0IGl0IG9ubHkgcnVucyBhdCBtb3N0IG9uY2UtcGVyLXRpY2tcbiAgICB0aGlzLnVwZGF0ZSA9IGRlYm91bmNlKHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXG4gICAgLy8gd2l0aCB7fSB3ZSBjcmVhdGUgYSBuZXcgb2JqZWN0IHdpdGggdGhlIG9wdGlvbnMgaW5zaWRlIGl0XG4gICAgdGhpcy5vcHRpb25zID0gX2V4dGVuZHMoe30sIFBvcHBlci5EZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICAvLyBpbml0IHN0YXRlXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGlzRGVzdHJveWVkOiBmYWxzZSxcbiAgICAgIGlzQ3JlYXRlZDogZmFsc2UsXG4gICAgICBzY3JvbGxQYXJlbnRzOiBbXVxuICAgIH07XG5cbiAgICAvLyBnZXQgcmVmZXJlbmNlIGFuZCBwb3BwZXIgZWxlbWVudHMgKGFsbG93IGpRdWVyeSB3cmFwcGVycylcbiAgICB0aGlzLnJlZmVyZW5jZSA9IHJlZmVyZW5jZSAmJiByZWZlcmVuY2UuanF1ZXJ5ID8gcmVmZXJlbmNlWzBdIDogcmVmZXJlbmNlO1xuICAgIHRoaXMucG9wcGVyID0gcG9wcGVyICYmIHBvcHBlci5qcXVlcnkgPyBwb3BwZXJbMF0gOiBwb3BwZXI7XG5cbiAgICAvLyBEZWVwIG1lcmdlIG1vZGlmaWVycyBvcHRpb25zXG4gICAgdGhpcy5vcHRpb25zLm1vZGlmaWVycyA9IHt9O1xuICAgIE9iamVjdC5rZXlzKF9leHRlbmRzKHt9LCBQb3BwZXIuRGVmYXVsdHMubW9kaWZpZXJzLCBvcHRpb25zLm1vZGlmaWVycykpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIF90aGlzLm9wdGlvbnMubW9kaWZpZXJzW25hbWVdID0gX2V4dGVuZHMoe30sIFBvcHBlci5EZWZhdWx0cy5tb2RpZmllcnNbbmFtZV0gfHwge30sIG9wdGlvbnMubW9kaWZpZXJzID8gb3B0aW9ucy5tb2RpZmllcnNbbmFtZV0gOiB7fSk7XG4gICAgfSk7XG5cbiAgICAvLyBSZWZhY3RvcmluZyBtb2RpZmllcnMnIGxpc3QgKE9iamVjdCA9PiBBcnJheSlcbiAgICB0aGlzLm1vZGlmaWVycyA9IE9iamVjdC5rZXlzKHRoaXMub3B0aW9ucy5tb2RpZmllcnMpLm1hcChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgcmV0dXJuIF9leHRlbmRzKHtcbiAgICAgICAgbmFtZTogbmFtZVxuICAgICAgfSwgX3RoaXMub3B0aW9ucy5tb2RpZmllcnNbbmFtZV0pO1xuICAgIH0pXG4gICAgLy8gc29ydCB0aGUgbW9kaWZpZXJzIGJ5IG9yZGVyXG4gICAgLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgIHJldHVybiBhLm9yZGVyIC0gYi5vcmRlcjtcbiAgICB9KTtcblxuICAgIC8vIG1vZGlmaWVycyBoYXZlIHRoZSBhYmlsaXR5IHRvIGV4ZWN1dGUgYXJiaXRyYXJ5IGNvZGUgd2hlbiBQb3BwZXIuanMgZ2V0IGluaXRlZFxuICAgIC8vIHN1Y2ggY29kZSBpcyBleGVjdXRlZCBpbiB0aGUgc2FtZSBvcmRlciBvZiBpdHMgbW9kaWZpZXJcbiAgICAvLyB0aGV5IGNvdWxkIGFkZCBuZXcgcHJvcGVydGllcyB0byB0aGVpciBvcHRpb25zIGNvbmZpZ3VyYXRpb25cbiAgICAvLyBCRSBBV0FSRTogZG9uJ3QgYWRkIG9wdGlvbnMgdG8gYG9wdGlvbnMubW9kaWZpZXJzLm5hbWVgIGJ1dCB0byBgbW9kaWZpZXJPcHRpb25zYCFcbiAgICB0aGlzLm1vZGlmaWVycy5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllck9wdGlvbnMpIHtcbiAgICAgIGlmIChtb2RpZmllck9wdGlvbnMuZW5hYmxlZCAmJiBpc0Z1bmN0aW9uKG1vZGlmaWVyT3B0aW9ucy5vbkxvYWQpKSB7XG4gICAgICAgIG1vZGlmaWVyT3B0aW9ucy5vbkxvYWQoX3RoaXMucmVmZXJlbmNlLCBfdGhpcy5wb3BwZXIsIF90aGlzLm9wdGlvbnMsIG1vZGlmaWVyT3B0aW9ucywgX3RoaXMuc3RhdGUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gZmlyZSB0aGUgZmlyc3QgdXBkYXRlIHRvIHBvc2l0aW9uIHRoZSBwb3BwZXIgaW4gdGhlIHJpZ2h0IHBsYWNlXG4gICAgdGhpcy51cGRhdGUoKTtcblxuICAgIHZhciBldmVudHNFbmFibGVkID0gdGhpcy5vcHRpb25zLmV2ZW50c0VuYWJsZWQ7XG4gICAgaWYgKGV2ZW50c0VuYWJsZWQpIHtcbiAgICAgIC8vIHNldHVwIGV2ZW50IGxpc3RlbmVycywgdGhleSB3aWxsIHRha2UgY2FyZSBvZiB1cGRhdGUgdGhlIHBvc2l0aW9uIGluIHNwZWNpZmljIHNpdHVhdGlvbnNcbiAgICAgIHRoaXMuZW5hYmxlRXZlbnRMaXN0ZW5lcnMoKTtcbiAgICB9XG5cbiAgICB0aGlzLnN0YXRlLmV2ZW50c0VuYWJsZWQgPSBldmVudHNFbmFibGVkO1xuICB9XG5cbiAgLy8gV2UgY2FuJ3QgdXNlIGNsYXNzIHByb3BlcnRpZXMgYmVjYXVzZSB0aGV5IGRvbid0IGdldCBsaXN0ZWQgaW4gdGhlXG4gIC8vIGNsYXNzIHByb3RvdHlwZSBhbmQgYnJlYWsgc3R1ZmYgbGlrZSBTaW5vbiBzdHVic1xuXG5cbiAgY3JlYXRlQ2xhc3MoUG9wcGVyLCBbe1xuICAgIGtleTogJ3VwZGF0ZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHVwZGF0ZSQkMSgpIHtcbiAgICAgIHJldHVybiB1cGRhdGUuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdkZXN0cm95JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGVzdHJveSQkMSgpIHtcbiAgICAgIHJldHVybiBkZXN0cm95LmNhbGwodGhpcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZW5hYmxlRXZlbnRMaXN0ZW5lcnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmFibGVFdmVudExpc3RlbmVycyQkMSgpIHtcbiAgICAgIHJldHVybiBlbmFibGVFdmVudExpc3RlbmVycy5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2Rpc2FibGVFdmVudExpc3RlbmVycycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGRpc2FibGVFdmVudExpc3RlbmVycyQkMSgpIHtcbiAgICAgIHJldHVybiBkaXNhYmxlRXZlbnRMaXN0ZW5lcnMuY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTY2hlZHVsZXMgYW4gdXBkYXRlLiBJdCB3aWxsIHJ1biBvbiB0aGUgbmV4dCBVSSB1cGRhdGUgYXZhaWxhYmxlLlxuICAgICAqIEBtZXRob2Qgc2NoZWR1bGVVcGRhdGVcbiAgICAgKiBAbWVtYmVyb2YgUG9wcGVyXG4gICAgICovXG5cblxuICAgIC8qKlxuICAgICAqIENvbGxlY3Rpb24gb2YgdXRpbGl0aWVzIHVzZWZ1bCB3aGVuIHdyaXRpbmcgY3VzdG9tIG1vZGlmaWVycy5cbiAgICAgKiBTdGFydGluZyBmcm9tIHZlcnNpb24gMS43LCB0aGlzIG1ldGhvZCBpcyBhdmFpbGFibGUgb25seSBpZiB5b3VcbiAgICAgKiBpbmNsdWRlIGBwb3BwZXItdXRpbHMuanNgIGJlZm9yZSBgcG9wcGVyLmpzYC5cbiAgICAgKlxuICAgICAqICoqREVQUkVDQVRJT04qKjogVGhpcyB3YXkgdG8gYWNjZXNzIFBvcHBlclV0aWxzIGlzIGRlcHJlY2F0ZWRcbiAgICAgKiBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHYyISBVc2UgdGhlIFBvcHBlclV0aWxzIG1vZHVsZSBkaXJlY3RseSBpbnN0ZWFkLlxuICAgICAqIER1ZSB0byB0aGUgaGlnaCBpbnN0YWJpbGl0eSBvZiB0aGUgbWV0aG9kcyBjb250YWluZWQgaW4gVXRpbHMsIHdlIGNhbid0XG4gICAgICogZ3VhcmFudGVlIHRoZW0gdG8gZm9sbG93IHNlbXZlci4gVXNlIHRoZW0gYXQgeW91ciBvd24gcmlzayFcbiAgICAgKiBAc3RhdGljXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHZlcnNpb24gMS44XG4gICAgICogQG1lbWJlciBVdGlsc1xuICAgICAqIEBtZW1iZXJvZiBQb3BwZXJcbiAgICAgKi9cblxuICB9XSk7XG4gIHJldHVybiBQb3BwZXI7XG59KCk7XG5cbi8qKlxuICogVGhlIGByZWZlcmVuY2VPYmplY3RgIGlzIGFuIG9iamVjdCB0aGF0IHByb3ZpZGVzIGFuIGludGVyZmFjZSBjb21wYXRpYmxlIHdpdGggUG9wcGVyLmpzXG4gKiBhbmQgbGV0cyB5b3UgdXNlIGl0IGFzIHJlcGxhY2VtZW50IG9mIGEgcmVhbCBET00gbm9kZS48YnIgLz5cbiAqIFlvdSBjYW4gdXNlIHRoaXMgbWV0aG9kIHRvIHBvc2l0aW9uIGEgcG9wcGVyIHJlbGF0aXZlbHkgdG8gYSBzZXQgb2YgY29vcmRpbmF0ZXNcbiAqIGluIGNhc2UgeW91IGRvbid0IGhhdmUgYSBET00gbm9kZSB0byB1c2UgYXMgcmVmZXJlbmNlLlxuICpcbiAqIGBgYFxuICogbmV3IFBvcHBlcihyZWZlcmVuY2VPYmplY3QsIHBvcHBlck5vZGUpO1xuICogYGBgXG4gKlxuICogTkI6IFRoaXMgZmVhdHVyZSBpc24ndCBzdXBwb3J0ZWQgaW4gSW50ZXJuZXQgRXhwbG9yZXIgMTAuXG4gKiBAbmFtZSByZWZlcmVuY2VPYmplY3RcbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGRhdGEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0XG4gKiBBIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIHNldCBvZiBjb29yZGluYXRlcyBjb21wYXRpYmxlIHdpdGggdGhlIG5hdGl2ZSBgZ2V0Qm91bmRpbmdDbGllbnRSZWN0YCBtZXRob2QuXG4gKiBAcHJvcGVydHkge251bWJlcn0gZGF0YS5jbGllbnRXaWR0aFxuICogQW4gRVM2IGdldHRlciB0aGF0IHdpbGwgcmV0dXJuIHRoZSB3aWR0aCBvZiB0aGUgdmlydHVhbCByZWZlcmVuY2UgZWxlbWVudC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkYXRhLmNsaWVudEhlaWdodFxuICogQW4gRVM2IGdldHRlciB0aGF0IHdpbGwgcmV0dXJuIHRoZSBoZWlnaHQgb2YgdGhlIHZpcnR1YWwgcmVmZXJlbmNlIGVsZW1lbnQuXG4gKi9cblxuXG5Qb3BwZXIuVXRpbHMgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiBnbG9iYWwpLlBvcHBlclV0aWxzO1xuUG9wcGVyLnBsYWNlbWVudHMgPSBwbGFjZW1lbnRzO1xuUG9wcGVyLkRlZmF1bHRzID0gRGVmYXVsdHM7XG5cbmV4cG9ydCBkZWZhdWx0IFBvcHBlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBvcHBlci5qcy5tYXBcbiIsIi8qKiFcbiAqIEBmaWxlT3ZlcnZpZXcgS2lja2FzcyBsaWJyYXJ5IHRvIGNyZWF0ZSBhbmQgcGxhY2UgcG9wcGVycyBuZWFyIHRoZWlyIHJlZmVyZW5jZSBlbGVtZW50cy5cbiAqIEB2ZXJzaW9uIDEuMy4yXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChjKSAyMDE2IEZlZGVyaWNvIFppdm9sbyBhbmQgY29udHJpYnV0b3JzXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxuICogY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG4gKiBTT0ZUV0FSRS5cbiAqL1xuaW1wb3J0IFBvcHBlciBmcm9tICdwb3BwZXIuanMnO1xuXG4vKipcbiAqIENoZWNrIGlmIHRoZSBnaXZlbiB2YXJpYWJsZSBpcyBhIGZ1bmN0aW9uXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0FueX0gZnVuY3Rpb25Ub0NoZWNrIC0gdmFyaWFibGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtCb29sZWFufSBhbnN3ZXIgdG86IGlzIGEgZnVuY3Rpb24/XG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oZnVuY3Rpb25Ub0NoZWNrKSB7XG4gIHZhciBnZXRUeXBlID0ge307XG4gIHJldHVybiBmdW5jdGlvblRvQ2hlY2sgJiYgZ2V0VHlwZS50b1N0cmluZy5jYWxsKGZ1bmN0aW9uVG9DaGVjaykgPT09ICdbb2JqZWN0IEZ1bmN0aW9uXSc7XG59XG5cbnZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG52YXIgY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cblxuXG5cblxuXG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG52YXIgREVGQVVMVF9PUFRJT05TID0ge1xuICBjb250YWluZXI6IGZhbHNlLFxuICBkZWxheTogMCxcbiAgaHRtbDogZmFsc2UsXG4gIHBsYWNlbWVudDogJ3RvcCcsXG4gIHRpdGxlOiAnJyxcbiAgdGVtcGxhdGU6ICc8ZGl2IGNsYXNzPVwidG9vbHRpcFwiIHJvbGU9XCJ0b29sdGlwXCI+PGRpdiBjbGFzcz1cInRvb2x0aXAtYXJyb3dcIj48L2Rpdj48ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiPjwvZGl2PjwvZGl2PicsXG4gIHRyaWdnZXI6ICdob3ZlciBmb2N1cycsXG4gIG9mZnNldDogMCxcbiAgYXJyb3dTZWxlY3RvcjogJy50b29sdGlwLWFycm93LCAudG9vbHRpcF9fYXJyb3cnLFxuICBpbm5lclNlbGVjdG9yOiAnLnRvb2x0aXAtaW5uZXIsIC50b29sdGlwX19pbm5lcidcbn07XG5cbnZhciBUb29sdGlwID0gZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IFRvb2x0aXAuanMgaW5zdGFuY2VcbiAgICogQGNsYXNzIFRvb2x0aXBcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcmVmZXJlbmNlIC0gVGhlIERPTSBub2RlIHVzZWQgYXMgcmVmZXJlbmNlIG9mIHRoZSB0b29sdGlwIChpdCBjYW4gYmUgYSBqUXVlcnkgZWxlbWVudCkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnBsYWNlbWVudD0ndG9wJ1xuICAgKiAgICAgIFBsYWNlbWVudCBvZiB0aGUgcG9wcGVyIGFjY2VwdGVkIHZhbHVlczogYHRvcCgtc3RhcnQsIC1lbmQpLCByaWdodCgtc3RhcnQsIC1lbmQpLCBib3R0b20oLXN0YXJ0LCAtZW5kKSxcbiAgICogICAgICBsZWZ0KC1zdGFydCwgLWVuZClgXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmFycm93U2VsZWN0b3I9Jy50b29sdGlwLWFycm93LCAudG9vbHRpcF9fYXJyb3cnIC0gY2xhc3NOYW1lIHVzZWQgdG8gbG9jYXRlIHRoZSBET00gYXJyb3cgZWxlbWVudCBpbiB0aGUgdG9vbHRpcC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuaW5uZXJTZWxlY3Rvcj0nLnRvb2x0aXAtaW5uZXIsIC50b29sdGlwX19pbm5lcicgLSBjbGFzc05hbWUgdXNlZCB0byBsb2NhdGUgdGhlIERPTSBpbm5lciBlbGVtZW50IGluIHRoZSB0b29sdGlwLlxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fFN0cmluZ3xmYWxzZX0gb3B0aW9ucy5jb250YWluZXI9ZmFsc2UgLSBBcHBlbmQgdGhlIHRvb2x0aXAgdG8gYSBzcGVjaWZpYyBlbGVtZW50LlxuICAgKiBAcGFyYW0ge051bWJlcnxPYmplY3R9IG9wdGlvbnMuZGVsYXk9MFxuICAgKiAgICAgIERlbGF5IHNob3dpbmcgYW5kIGhpZGluZyB0aGUgdG9vbHRpcCAobXMpIC0gZG9lcyBub3QgYXBwbHkgdG8gbWFudWFsIHRyaWdnZXIgdHlwZS5cbiAgICogICAgICBJZiBhIG51bWJlciBpcyBzdXBwbGllZCwgZGVsYXkgaXMgYXBwbGllZCB0byBib3RoIGhpZGUvc2hvdy5cbiAgICogICAgICBPYmplY3Qgc3RydWN0dXJlIGlzOiBgeyBzaG93OiA1MDAsIGhpZGU6IDEwMCB9YFxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuaHRtbD1mYWxzZSAtIEluc2VydCBIVE1MIGludG8gdGhlIHRvb2x0aXAuIElmIGZhbHNlLCB0aGUgY29udGVudCB3aWxsIGluc2VydGVkIHdpdGggYHRleHRDb250ZW50YC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnRlbXBsYXRlPSc8ZGl2IGNsYXNzPVwidG9vbHRpcFwiIHJvbGU9XCJ0b29sdGlwXCI+PGRpdiBjbGFzcz1cInRvb2x0aXAtYXJyb3dcIj48L2Rpdj48ZGl2IGNsYXNzPVwidG9vbHRpcC1pbm5lclwiPjwvZGl2PjwvZGl2PiddXG4gICAqICAgICAgQmFzZSBIVE1MIHRvIHVzZWQgd2hlbiBjcmVhdGluZyB0aGUgdG9vbHRpcC5cbiAgICogICAgICBUaGUgdG9vbHRpcCdzIGB0aXRsZWAgd2lsbCBiZSBpbmplY3RlZCBpbnRvIHRoZSBgLnRvb2x0aXAtaW5uZXJgIG9yIGAudG9vbHRpcF9faW5uZXJgLlxuICAgKiAgICAgIGAudG9vbHRpcC1hcnJvd2Agb3IgYC50b29sdGlwX19hcnJvd2Agd2lsbCBiZWNvbWUgdGhlIHRvb2x0aXAncyBhcnJvdy5cbiAgICogICAgICBUaGUgb3V0ZXJtb3N0IHdyYXBwZXIgZWxlbWVudCBzaG91bGQgaGF2ZSB0aGUgYC50b29sdGlwYCBjbGFzcy5cbiAgICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR8VGl0bGVGdW5jdGlvbn0gb3B0aW9ucy50aXRsZT0nJyAtIERlZmF1bHQgdGl0bGUgdmFsdWUgaWYgYHRpdGxlYCBhdHRyaWJ1dGUgaXNuJ3QgcHJlc2VudC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnRyaWdnZXI9J2hvdmVyIGZvY3VzJ11cbiAgICogICAgICBIb3cgdG9vbHRpcCBpcyB0cmlnZ2VyZWQgLSBjbGljaywgaG92ZXIsIGZvY3VzLCBtYW51YWwuXG4gICAqICAgICAgWW91IG1heSBwYXNzIG11bHRpcGxlIHRyaWdnZXJzOyBzZXBhcmF0ZSB0aGVtIHdpdGggYSBzcGFjZS4gYG1hbnVhbGAgY2Fubm90IGJlIGNvbWJpbmVkIHdpdGggYW55IG90aGVyIHRyaWdnZXIuXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5jbG9zZU9uQ2xpY2tPdXRzaWRlPWZhbHNlIC0gQ2xvc2UgYSBwb3BwZXIgb24gY2xpY2sgb3V0c2lkZSBvZiB0aGUgcG9wcGVyIGFuZCByZWZlcmVuY2UgZWxlbWVudC4gVGhpcyBoYXMgZWZmZWN0IG9ubHkgd2hlbiBvcHRpb25zLnRyaWdnZXIgaXMgJ2NsaWNrJy5cbiAgICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR9IG9wdGlvbnMuYm91bmRhcmllc0VsZW1lbnRcbiAgICogICAgICBUaGUgZWxlbWVudCB1c2VkIGFzIGJvdW5kYXJpZXMgZm9yIHRoZSB0b29sdGlwLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiByZWZlciB0byBQb3BwZXIuanMnXG4gICAqICAgICAgW2JvdW5kYXJpZXNFbGVtZW50IGRvY3NdKGh0dHBzOi8vcG9wcGVyLmpzLm9yZy9wb3BwZXItZG9jdW1lbnRhdGlvbi5odG1sKVxuICAgKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IG9wdGlvbnMub2Zmc2V0PTAgLSBPZmZzZXQgb2YgdGhlIHRvb2x0aXAgcmVsYXRpdmUgdG8gaXRzIHJlZmVyZW5jZS4gRm9yIG1vcmUgaW5mb3JtYXRpb24gcmVmZXIgdG8gUG9wcGVyLmpzJ1xuICAgKiAgICAgIFtvZmZzZXQgZG9jc10oaHR0cHM6Ly9wb3BwZXIuanMub3JnL3BvcHBlci1kb2N1bWVudGF0aW9uLmh0bWwpXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBvcHBlck9wdGlvbnM9e30gLSBQb3BwZXIgb3B0aW9ucywgd2lsbCBiZSBwYXNzZWQgZGlyZWN0bHkgdG8gcG9wcGVyIGluc3RhbmNlLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiByZWZlciB0byBQb3BwZXIuanMnXG4gICAqICAgICAgW29wdGlvbnMgZG9jc10oaHR0cHM6Ly9wb3BwZXIuanMub3JnL3BvcHBlci1kb2N1bWVudGF0aW9uLmh0bWwpXG4gICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2UgLSBUaGUgZ2VuZXJhdGVkIHRvb2x0aXAgaW5zdGFuY2VcbiAgICovXG4gIGZ1bmN0aW9uIFRvb2x0aXAocmVmZXJlbmNlLCBvcHRpb25zKSB7XG4gICAgY2xhc3NDYWxsQ2hlY2sodGhpcywgVG9vbHRpcCk7XG5cbiAgICBfaW5pdGlhbGlzZVByb3BzLmNhbGwodGhpcyk7XG5cbiAgICAvLyBhcHBseSB1c2VyIG9wdGlvbnMgb3ZlciBkZWZhdWx0IG9uZXNcbiAgICBvcHRpb25zID0gX2V4dGVuZHMoe30sIERFRkFVTFRfT1BUSU9OUywgb3B0aW9ucyk7XG5cbiAgICByZWZlcmVuY2UuanF1ZXJ5ICYmIChyZWZlcmVuY2UgPSByZWZlcmVuY2VbMF0pO1xuXG4gICAgLy8gY2FjaGUgcmVmZXJlbmNlIGFuZCBvcHRpb25zXG4gICAgdGhpcy5yZWZlcmVuY2UgPSByZWZlcmVuY2U7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcblxuICAgIC8vIGdldCBldmVudHMgbGlzdFxuICAgIHZhciBldmVudHMgPSB0eXBlb2Ygb3B0aW9ucy50cmlnZ2VyID09PSAnc3RyaW5nJyA/IG9wdGlvbnMudHJpZ2dlci5zcGxpdCgnICcpLmZpbHRlcihmdW5jdGlvbiAodHJpZ2dlcikge1xuICAgICAgcmV0dXJuIFsnY2xpY2snLCAnaG92ZXInLCAnZm9jdXMnXS5pbmRleE9mKHRyaWdnZXIpICE9PSAtMTtcbiAgICB9KSA6IFtdO1xuXG4gICAgLy8gc2V0IGluaXRpYWwgc3RhdGVcbiAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLl9wb3BwZXJPcHRpb25zID0ge307XG5cbiAgICAvLyBzZXQgZXZlbnQgbGlzdGVuZXJzXG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMocmVmZXJlbmNlLCBldmVudHMsIG9wdGlvbnMpO1xuICB9XG5cbiAgLy9cbiAgLy8gUHVibGljIG1ldGhvZHNcbiAgLy9cblxuICAvKipcbiAgICogUmV2ZWFscyBhbiBlbGVtZW50J3MgdG9vbHRpcC4gVGhpcyBpcyBjb25zaWRlcmVkIGEgXCJtYW51YWxcIiB0cmlnZ2VyaW5nIG9mIHRoZSB0b29sdGlwLlxuICAgKiBUb29sdGlwcyB3aXRoIHplcm8tbGVuZ3RoIHRpdGxlcyBhcmUgbmV2ZXIgZGlzcGxheWVkLlxuICAgKiBAbWV0aG9kIFRvb2x0aXAjc2hvd1xuICAgKiBAbWVtYmVyb2YgVG9vbHRpcFxuICAgKi9cblxuXG4gIC8qKlxuICAgKiBIaWRlcyBhbiBlbGVtZW504oCZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZiB0aGUgdG9vbHRpcC5cbiAgICogQG1ldGhvZCBUb29sdGlwI2hpZGVcbiAgICogQG1lbWJlcm9mIFRvb2x0aXBcbiAgICovXG5cblxuICAvKipcbiAgICogSGlkZXMgYW5kIGRlc3Ryb3lzIGFuIGVsZW1lbnTigJlzIHRvb2x0aXAuXG4gICAqIEBtZXRob2QgVG9vbHRpcCNkaXNwb3NlXG4gICAqIEBtZW1iZXJvZiBUb29sdGlwXG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIFRvZ2dsZXMgYW4gZWxlbWVudOKAmXMgdG9vbHRpcC4gVGhpcyBpcyBjb25zaWRlcmVkIGEg4oCcbWFudWFs4oCdIHRyaWdnZXJpbmcgb2YgdGhlIHRvb2x0aXAuXG4gICAqIEBtZXRob2QgVG9vbHRpcCN0b2dnbGVcbiAgICogQG1lbWJlcm9mIFRvb2x0aXBcbiAgICovXG5cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgdG9vbHRpcCdzIHRpdGxlIGNvbnRlbnRcbiAgICogQG1ldGhvZCBUb29sdGlwI3VwZGF0ZVRpdGxlQ29udGVudFxuICAgKiBAbWVtYmVyb2YgVG9vbHRpcFxuICAgKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudH0gdGl0bGUgLSBUaGUgbmV3IGNvbnRlbnQgdG8gdXNlIGZvciB0aGUgdGl0bGVcbiAgICovXG5cblxuICAvL1xuICAvLyBQcml2YXRlIG1ldGhvZHNcbiAgLy9cblxuICBjcmVhdGVDbGFzcyhUb29sdGlwLCBbe1xuICAgIGtleTogJ19jcmVhdGUnLFxuXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHRvb2x0aXAgbm9kZVxuICAgICAqIEBtZW1iZXJvZiBUb29sdGlwXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByZWZlcmVuY2VcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdGVtcGxhdGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudHxUaXRsZUZ1bmN0aW9ufSB0aXRsZVxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gYWxsb3dIdG1sXG4gICAgICogQHJldHVybiB7SFRNTEVsZW1lbnR9IHRvb2x0aXBOb2RlXG4gICAgICovXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jcmVhdGUocmVmZXJlbmNlLCB0ZW1wbGF0ZSwgdGl0bGUsIGFsbG93SHRtbCkge1xuICAgICAgLy8gY3JlYXRlIHRvb2x0aXAgZWxlbWVudFxuICAgICAgdmFyIHRvb2x0aXBHZW5lcmF0b3IgPSB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0b29sdGlwR2VuZXJhdG9yLmlubmVySFRNTCA9IHRlbXBsYXRlLnRyaW0oKTtcbiAgICAgIHZhciB0b29sdGlwTm9kZSA9IHRvb2x0aXBHZW5lcmF0b3IuY2hpbGROb2Rlc1swXTtcblxuICAgICAgLy8gYWRkIHVuaXF1ZSBJRCB0byBvdXIgdG9vbHRpcCAobmVlZGVkIGZvciBhY2Nlc3NpYmlsaXR5IHJlYXNvbnMpXG4gICAgICB0b29sdGlwTm9kZS5pZCA9ICd0b29sdGlwXycgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgMTApO1xuXG4gICAgICAvLyBzZXQgaW5pdGlhbCBgYXJpYS1oaWRkZW5gIHN0YXRlIHRvIGBmYWxzZWAgKGl0J3MgdmlzaWJsZSEpXG4gICAgICB0b29sdGlwTm9kZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XG5cbiAgICAgIC8vIGFkZCB0aXRsZSB0byB0b29sdGlwXG4gICAgICB2YXIgdGl0bGVOb2RlID0gdG9vbHRpcEdlbmVyYXRvci5xdWVyeVNlbGVjdG9yKHRoaXMub3B0aW9ucy5pbm5lclNlbGVjdG9yKTtcbiAgICAgIHRoaXMuX2FkZFRpdGxlQ29udGVudChyZWZlcmVuY2UsIHRpdGxlLCBhbGxvd0h0bWwsIHRpdGxlTm9kZSk7XG5cbiAgICAgIC8vIHJldHVybiB0aGUgZ2VuZXJhdGVkIHRvb2x0aXAgbm9kZVxuICAgICAgcmV0dXJuIHRvb2x0aXBOb2RlO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19hZGRUaXRsZUNvbnRlbnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfYWRkVGl0bGVDb250ZW50KHJlZmVyZW5jZSwgdGl0bGUsIGFsbG93SHRtbCwgdGl0bGVOb2RlKSB7XG4gICAgICBpZiAodGl0bGUubm9kZVR5cGUgPT09IDEgfHwgdGl0bGUubm9kZVR5cGUgPT09IDExKSB7XG4gICAgICAgIC8vIGlmIHRpdGxlIGlzIGEgZWxlbWVudCBub2RlIG9yIGRvY3VtZW50IGZyYWdtZW50LCBhcHBlbmQgaXQgb25seSBpZiBhbGxvd0h0bWwgaXMgdHJ1ZVxuICAgICAgICBhbGxvd0h0bWwgJiYgdGl0bGVOb2RlLmFwcGVuZENoaWxkKHRpdGxlKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih0aXRsZSkpIHtcbiAgICAgICAgLy8gaWYgdGl0bGUgaXMgYSBmdW5jdGlvbiwgY2FsbCBpdCBhbmQgc2V0IHRleHRDb250ZW50IG9yIGlubmVySHRtbCBkZXBlbmRpbmcgYnkgYGFsbG93SHRtbGAgdmFsdWVcbiAgICAgICAgdmFyIHRpdGxlVGV4dCA9IHRpdGxlLmNhbGwocmVmZXJlbmNlKTtcbiAgICAgICAgYWxsb3dIdG1sID8gdGl0bGVOb2RlLmlubmVySFRNTCA9IHRpdGxlVGV4dCA6IHRpdGxlTm9kZS50ZXh0Q29udGVudCA9IHRpdGxlVGV4dDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGlmIGl0J3MganVzdCBhIHNpbXBsZSB0ZXh0LCBzZXQgdGV4dENvbnRlbnQgb3IgaW5uZXJIdG1sIGRlcGVuZGluZyBieSBgYWxsb3dIdG1sYCB2YWx1ZVxuICAgICAgICBhbGxvd0h0bWwgPyB0aXRsZU5vZGUuaW5uZXJIVE1MID0gdGl0bGUgOiB0aXRsZU5vZGUudGV4dENvbnRlbnQgPSB0aXRsZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfc2hvdycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zaG93KHJlZmVyZW5jZSwgb3B0aW9ucykge1xuICAgICAgLy8gZG9uJ3Qgc2hvdyBpZiBpdCdzIGFscmVhZHkgdmlzaWJsZVxuICAgICAgLy8gb3IgaWYgaXQncyBub3QgYmVpbmcgc2hvd2VkXG4gICAgICBpZiAodGhpcy5faXNPcGVuICYmICF0aGlzLl9pc09wZW5pbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG4gICAgICB0aGlzLl9pc09wZW4gPSB0cnVlO1xuXG4gICAgICAvLyBpZiB0aGUgdG9vbHRpcE5vZGUgYWxyZWFkeSBleGlzdHMsIGp1c3Qgc2hvdyBpdFxuICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBOb2RlKSB7XG4gICAgICAgIHRoaXMuX3Rvb2x0aXBOb2RlLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgIHRoaXMuX3Rvb2x0aXBOb2RlLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcbiAgICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZS51cGRhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICB9XG5cbiAgICAgIC8vIGdldCB0aXRsZVxuICAgICAgdmFyIHRpdGxlID0gcmVmZXJlbmNlLmdldEF0dHJpYnV0ZSgndGl0bGUnKSB8fCBvcHRpb25zLnRpdGxlO1xuXG4gICAgICAvLyBkb24ndCBzaG93IHRvb2x0aXAgaWYgbm8gdGl0bGUgaXMgZGVmaW5lZFxuICAgICAgaWYgKCF0aXRsZSkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gY3JlYXRlIHRvb2x0aXAgbm9kZVxuICAgICAgdmFyIHRvb2x0aXBOb2RlID0gdGhpcy5fY3JlYXRlKHJlZmVyZW5jZSwgb3B0aW9ucy50ZW1wbGF0ZSwgdGl0bGUsIG9wdGlvbnMuaHRtbCk7XG5cbiAgICAgIC8vIEFkZCBgYXJpYS1kZXNjcmliZWRieWAgdG8gb3VyIHJlZmVyZW5jZSBlbGVtZW50IGZvciBhY2Nlc3NpYmlsaXR5IHJlYXNvbnNcbiAgICAgIHJlZmVyZW5jZS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknLCB0b29sdGlwTm9kZS5pZCk7XG5cbiAgICAgIC8vIGFwcGVuZCB0b29sdGlwIHRvIGNvbnRhaW5lclxuICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuX2ZpbmRDb250YWluZXIob3B0aW9ucy5jb250YWluZXIsIHJlZmVyZW5jZSk7XG5cbiAgICAgIHRoaXMuX2FwcGVuZCh0b29sdGlwTm9kZSwgY29udGFpbmVyKTtcblxuICAgICAgdGhpcy5fcG9wcGVyT3B0aW9ucyA9IF9leHRlbmRzKHt9LCBvcHRpb25zLnBvcHBlck9wdGlvbnMsIHtcbiAgICAgICAgcGxhY2VtZW50OiBvcHRpb25zLnBsYWNlbWVudFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuX3BvcHBlck9wdGlvbnMubW9kaWZpZXJzID0gX2V4dGVuZHMoe30sIHRoaXMuX3BvcHBlck9wdGlvbnMubW9kaWZpZXJzLCB7XG4gICAgICAgIGFycm93OiBfZXh0ZW5kcyh7fSwgdGhpcy5fcG9wcGVyT3B0aW9ucy5tb2RpZmllcnMgJiYgdGhpcy5fcG9wcGVyT3B0aW9ucy5tb2RpZmllcnMuYXJyb3csIHtcbiAgICAgICAgICBlbGVtZW50OiBvcHRpb25zLmFycm93U2VsZWN0b3JcbiAgICAgICAgfSksXG4gICAgICAgIG9mZnNldDogX2V4dGVuZHMoe30sIHRoaXMuX3BvcHBlck9wdGlvbnMubW9kaWZpZXJzICYmIHRoaXMuX3BvcHBlck9wdGlvbnMubW9kaWZpZXJzLm9mZnNldCwge1xuICAgICAgICAgIG9mZnNldDogb3B0aW9ucy5vZmZzZXRcbiAgICAgICAgfSlcbiAgICAgIH0pO1xuXG4gICAgICBpZiAob3B0aW9ucy5ib3VuZGFyaWVzRWxlbWVudCkge1xuICAgICAgICB0aGlzLl9wb3BwZXJPcHRpb25zLm1vZGlmaWVycy5wcmV2ZW50T3ZlcmZsb3cgPSB7XG4gICAgICAgICAgYm91bmRhcmllc0VsZW1lbnQ6IG9wdGlvbnMuYm91bmRhcmllc0VsZW1lbnRcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZSA9IG5ldyBQb3BwZXIocmVmZXJlbmNlLCB0b29sdGlwTm9kZSwgdGhpcy5fcG9wcGVyT3B0aW9ucyk7XG5cbiAgICAgIHRoaXMuX3Rvb2x0aXBOb2RlID0gdG9vbHRpcE5vZGU7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19oaWRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2hpZGUoKSAvKnJlZmVyZW5jZSwgb3B0aW9ucyove1xuICAgICAgLy8gZG9uJ3QgaGlkZSBpZiBpdCdzIGFscmVhZHkgaGlkZGVuXG4gICAgICBpZiAoIXRoaXMuX2lzT3Blbikge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgdGhpcy5faXNPcGVuID0gZmFsc2U7XG5cbiAgICAgIC8vIGhpZGUgdG9vbHRpcE5vZGVcbiAgICAgIHRoaXMuX3Rvb2x0aXBOb2RlLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgIHRoaXMuX3Rvb2x0aXBOb2RlLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZGlzcG9zZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9kaXNwb3NlKCkge1xuICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgLy8gcmVtb3ZlIGV2ZW50IGxpc3RlbmVycyBmaXJzdCB0byBwcmV2ZW50IGFueSB1bmV4cGVjdGVkIGJlaGF2aW91clxuICAgICAgdGhpcy5fZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKF9yZWYpIHtcbiAgICAgICAgdmFyIGZ1bmMgPSBfcmVmLmZ1bmMsXG4gICAgICAgICAgICBldmVudCA9IF9yZWYuZXZlbnQ7XG5cbiAgICAgICAgX3RoaXMucmVmZXJlbmNlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMpO1xuICAgICAgfSk7XG4gICAgICB0aGlzLl9ldmVudHMgPSBbXTtcblxuICAgICAgaWYgKHRoaXMuX3Rvb2x0aXBOb2RlKSB7XG4gICAgICAgIHRoaXMuX2hpZGUoKTtcblxuICAgICAgICAvLyBkZXN0cm95IGluc3RhbmNlXG4gICAgICAgIHRoaXMucG9wcGVySW5zdGFuY2UuZGVzdHJveSgpO1xuXG4gICAgICAgIC8vIGRlc3Ryb3kgdG9vbHRpcE5vZGUgaWYgcmVtb3ZlT25EZXN0cm95IGlzIG5vdCBzZXQsIGFzIHBvcHBlckluc3RhbmNlLmRlc3Ryb3koKSBhbHJlYWR5IHJlbW92ZXMgdGhlIGVsZW1lbnRcbiAgICAgICAgaWYgKCF0aGlzLnBvcHBlckluc3RhbmNlLm9wdGlvbnMucmVtb3ZlT25EZXN0cm95KSB7XG4gICAgICAgICAgdGhpcy5fdG9vbHRpcE5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl90b29sdGlwTm9kZSk7XG4gICAgICAgICAgdGhpcy5fdG9vbHRpcE5vZGUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfZmluZENvbnRhaW5lcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9maW5kQ29udGFpbmVyKGNvbnRhaW5lciwgcmVmZXJlbmNlKSB7XG4gICAgICAvLyBpZiBjb250YWluZXIgaXMgYSBxdWVyeSwgZ2V0IHRoZSByZWxhdGl2ZSBlbGVtZW50XG4gICAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgY29udGFpbmVyID0gd2luZG93LmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyKTtcbiAgICAgIH0gZWxzZSBpZiAoY29udGFpbmVyID09PSBmYWxzZSkge1xuICAgICAgICAvLyBpZiBjb250YWluZXIgaXMgYGZhbHNlYCwgc2V0IGl0IHRvIHJlZmVyZW5jZSBwYXJlbnRcbiAgICAgICAgY29udGFpbmVyID0gcmVmZXJlbmNlLnBhcmVudE5vZGU7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGVuZCB0b29sdGlwIHRvIGNvbnRhaW5lclxuICAgICAqIEBtZW1iZXJvZiBUb29sdGlwXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0b29sdGlwTm9kZVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfGZhbHNlfSBjb250YWluZXJcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnX2FwcGVuZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9hcHBlbmQodG9vbHRpcE5vZGUsIGNvbnRhaW5lcikge1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHRvb2x0aXBOb2RlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfc2V0RXZlbnRMaXN0ZW5lcnMnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2V0RXZlbnRMaXN0ZW5lcnMocmVmZXJlbmNlLCBldmVudHMsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICB2YXIgZGlyZWN0RXZlbnRzID0gW107XG4gICAgICB2YXIgb3Bwb3NpdGVFdmVudHMgPSBbXTtcblxuICAgICAgZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQpIHtcbiAgICAgICAgICBjYXNlICdob3Zlcic6XG4gICAgICAgICAgICBkaXJlY3RFdmVudHMucHVzaCgnbW91c2VlbnRlcicpO1xuICAgICAgICAgICAgb3Bwb3NpdGVFdmVudHMucHVzaCgnbW91c2VsZWF2ZScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnZm9jdXMnOlxuICAgICAgICAgICAgZGlyZWN0RXZlbnRzLnB1c2goJ2ZvY3VzJyk7XG4gICAgICAgICAgICBvcHBvc2l0ZUV2ZW50cy5wdXNoKCdibHVyJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdjbGljayc6XG4gICAgICAgICAgICBkaXJlY3RFdmVudHMucHVzaCgnY2xpY2snKTtcbiAgICAgICAgICAgIG9wcG9zaXRlRXZlbnRzLnB1c2goJ2NsaWNrJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vIHNjaGVkdWxlIHNob3cgdG9vbHRpcFxuICAgICAgZGlyZWN0RXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBmdW5jID0gZnVuY3Rpb24gZnVuYyhldnQpIHtcbiAgICAgICAgICBpZiAoX3RoaXMyLl9pc09wZW5pbmcgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXZ0LnVzZWRCeVRvb2x0aXAgPSB0cnVlO1xuICAgICAgICAgIF90aGlzMi5fc2NoZWR1bGVTaG93KHJlZmVyZW5jZSwgb3B0aW9ucy5kZWxheSwgb3B0aW9ucywgZXZ0KTtcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMyLl9ldmVudHMucHVzaCh7IGV2ZW50OiBldmVudCwgZnVuYzogZnVuYyB9KTtcbiAgICAgICAgcmVmZXJlbmNlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHNjaGVkdWxlIGhpZGUgdG9vbHRpcFxuICAgICAgb3Bwb3NpdGVFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIGZ1bmMgPSBmdW5jdGlvbiBmdW5jKGV2dCkge1xuICAgICAgICAgIGlmIChldnQudXNlZEJ5VG9vbHRpcCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBfdGhpczIuX3NjaGVkdWxlSGlkZShyZWZlcmVuY2UsIG9wdGlvbnMuZGVsYXksIG9wdGlvbnMsIGV2dCk7XG4gICAgICAgIH07XG4gICAgICAgIF90aGlzMi5fZXZlbnRzLnB1c2goeyBldmVudDogZXZlbnQsIGZ1bmM6IGZ1bmMgfSk7XG4gICAgICAgIHJlZmVyZW5jZS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmdW5jKTtcbiAgICAgICAgaWYgKGV2ZW50ID09PSAnY2xpY2snICYmIG9wdGlvbnMuY2xvc2VPbkNsaWNrT3V0c2lkZSkge1xuICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoIV90aGlzMi5faXNPcGVuaW5nKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwb3BwZXIgPSBfdGhpczIucG9wcGVySW5zdGFuY2UucG9wcGVyO1xuICAgICAgICAgICAgaWYgKHJlZmVyZW5jZS5jb250YWlucyhlLnRhcmdldCkgfHwgcG9wcGVyLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jKGUpO1xuICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfc2NoZWR1bGVTaG93JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NjaGVkdWxlU2hvdyhyZWZlcmVuY2UsIGRlbGF5LCBvcHRpb25zIC8qLCBldnQgKi8pIHtcbiAgICAgIHZhciBfdGhpczMgPSB0aGlzO1xuXG4gICAgICB0aGlzLl9pc09wZW5pbmcgPSB0cnVlO1xuICAgICAgLy8gZGVmYXVsdHMgdG8gMFxuICAgICAgdmFyIGNvbXB1dGVkRGVsYXkgPSBkZWxheSAmJiBkZWxheS5zaG93IHx8IGRlbGF5IHx8IDA7XG4gICAgICB0aGlzLl9zaG93VGltZW91dCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMy5fc2hvdyhyZWZlcmVuY2UsIG9wdGlvbnMpO1xuICAgICAgfSwgY29tcHV0ZWREZWxheSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX3NjaGVkdWxlSGlkZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zY2hlZHVsZUhpZGUocmVmZXJlbmNlLCBkZWxheSwgb3B0aW9ucywgZXZ0KSB7XG4gICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgdGhpcy5faXNPcGVuaW5nID0gZmFsc2U7XG4gICAgICAvLyBkZWZhdWx0cyB0byAwXG4gICAgICB2YXIgY29tcHV0ZWREZWxheSA9IGRlbGF5ICYmIGRlbGF5LmhpZGUgfHwgZGVsYXkgfHwgMDtcbiAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGhpcy5fc2hvd1RpbWVvdXQpO1xuICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoX3RoaXM0Ll9pc09wZW4gPT09IGZhbHNlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZG9jdW1lbnQuYm9keS5jb250YWlucyhfdGhpczQuX3Rvb2x0aXBOb2RlKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHdlIGFyZSBoaWRpbmcgYmVjYXVzZSBvZiBhIG1vdXNlbGVhdmUsIHdlIG11c3QgY2hlY2sgdGhhdCB0aGUgbmV3XG4gICAgICAgIC8vIHJlZmVyZW5jZSBpc24ndCB0aGUgdG9vbHRpcCwgYmVjYXVzZSBpbiB0aGlzIGNhc2Ugd2UgZG9uJ3Qgd2FudCB0byBoaWRlIGl0XG4gICAgICAgIGlmIChldnQudHlwZSA9PT0gJ21vdXNlbGVhdmUnKSB7XG4gICAgICAgICAgdmFyIGlzU2V0ID0gX3RoaXM0Ll9zZXRUb29sdGlwTm9kZUV2ZW50KGV2dCwgcmVmZXJlbmNlLCBkZWxheSwgb3B0aW9ucyk7XG5cbiAgICAgICAgICAvLyBpZiB3ZSBzZXQgdGhlIG5ldyBldmVudCwgZG9uJ3QgaGlkZSB0aGUgdG9vbHRpcCB5ZXRcbiAgICAgICAgICAvLyB0aGUgbmV3IGV2ZW50IHdpbGwgdGFrZSBjYXJlIHRvIGhpZGUgaXQgaWYgbmVjZXNzYXJ5XG4gICAgICAgICAgaWYgKGlzU2V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXM0Ll9oaWRlKHJlZmVyZW5jZSwgb3B0aW9ucyk7XG4gICAgICB9LCBjb21wdXRlZERlbGF5KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfdXBkYXRlVGl0bGVDb250ZW50JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3VwZGF0ZVRpdGxlQ29udGVudCh0aXRsZSkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLl90b29sdGlwTm9kZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm9wdGlvbnMudGl0bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhpcy5vcHRpb25zLnRpdGxlID0gdGl0bGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHRpdGxlTm9kZSA9IHRoaXMuX3Rvb2x0aXBOb2RlLnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRpb25zLmlubmVyU2VsZWN0b3IpO1xuICAgICAgdGhpcy5fY2xlYXJUaXRsZUNvbnRlbnQodGl0bGVOb2RlLCB0aGlzLm9wdGlvbnMuaHRtbCwgdGhpcy5yZWZlcmVuY2UuZ2V0QXR0cmlidXRlKCd0aXRsZScpIHx8IHRoaXMub3B0aW9ucy50aXRsZSk7XG4gICAgICB0aGlzLl9hZGRUaXRsZUNvbnRlbnQodGhpcy5yZWZlcmVuY2UsIHRpdGxlLCB0aGlzLm9wdGlvbnMuaHRtbCwgdGl0bGVOb2RlKTtcbiAgICAgIHRoaXMub3B0aW9ucy50aXRsZSA9IHRpdGxlO1xuICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZS51cGRhdGUoKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfY2xlYXJUaXRsZUNvbnRlbnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfY2xlYXJUaXRsZUNvbnRlbnQodGl0bGVOb2RlLCBhbGxvd0h0bWwsIGxhc3RUaXRsZSkge1xuICAgICAgaWYgKGxhc3RUaXRsZS5ub2RlVHlwZSA9PT0gMSB8fCBsYXN0VGl0bGUubm9kZVR5cGUgPT09IDExKSB7XG4gICAgICAgIGFsbG93SHRtbCAmJiB0aXRsZU5vZGUucmVtb3ZlQ2hpbGQobGFzdFRpdGxlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsbG93SHRtbCA/IHRpdGxlTm9kZS5pbm5lckhUTUwgPSAnJyA6IHRpdGxlTm9kZS50ZXh0Q29udGVudCA9ICcnO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xuICByZXR1cm4gVG9vbHRpcDtcbn0oKTtcblxuLyoqXG4gKiBUaXRsZSBmdW5jdGlvbiwgaXRzIGNvbnRleHQgaXMgdGhlIFRvb2x0aXAgaW5zdGFuY2UuXG4gKiBAbWVtYmVyb2YgVG9vbHRpcFxuICogQGNhbGxiYWNrIFRpdGxlRnVuY3Rpb25cbiAqIEByZXR1cm4ge1N0cmluZ30gcGxhY2VtZW50IC0gVGhlIGRlc2lyZWQgdGl0bGUuXG4gKi9cblxuXG52YXIgX2luaXRpYWxpc2VQcm9wcyA9IGZ1bmN0aW9uIF9pbml0aWFsaXNlUHJvcHMoKSB7XG4gIHZhciBfdGhpczUgPSB0aGlzO1xuXG4gIHRoaXMuc2hvdyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3RoaXM1Ll9zaG93KF90aGlzNS5yZWZlcmVuY2UsIF90aGlzNS5vcHRpb25zKTtcbiAgfTtcblxuICB0aGlzLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIF90aGlzNS5faGlkZSgpO1xuICB9O1xuXG4gIHRoaXMuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3RoaXM1Ll9kaXNwb3NlKCk7XG4gIH07XG5cbiAgdGhpcy50b2dnbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKF90aGlzNS5faXNPcGVuKSB7XG4gICAgICByZXR1cm4gX3RoaXM1LmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIF90aGlzNS5zaG93KCk7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMudXBkYXRlVGl0bGVDb250ZW50ID0gZnVuY3Rpb24gKHRpdGxlKSB7XG4gICAgcmV0dXJuIF90aGlzNS5fdXBkYXRlVGl0bGVDb250ZW50KHRpdGxlKTtcbiAgfTtcblxuICB0aGlzLl9ldmVudHMgPSBbXTtcblxuICB0aGlzLl9zZXRUb29sdGlwTm9kZUV2ZW50ID0gZnVuY3Rpb24gKGV2dCwgcmVmZXJlbmNlLCBkZWxheSwgb3B0aW9ucykge1xuICAgIHZhciByZWxhdGVkcmVmZXJlbmNlID0gZXZ0LnJlbGF0ZWRyZWZlcmVuY2UgfHwgZXZ0LnRvRWxlbWVudCB8fCBldnQucmVsYXRlZFRhcmdldDtcblxuICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uIGNhbGxiYWNrKGV2dDIpIHtcbiAgICAgIHZhciByZWxhdGVkcmVmZXJlbmNlMiA9IGV2dDIucmVsYXRlZHJlZmVyZW5jZSB8fCBldnQyLnRvRWxlbWVudCB8fCBldnQyLnJlbGF0ZWRUYXJnZXQ7XG5cbiAgICAgIC8vIFJlbW92ZSBldmVudCBsaXN0ZW5lciBhZnRlciBjYWxsXG4gICAgICBfdGhpczUuX3Rvb2x0aXBOb2RlLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0LnR5cGUsIGNhbGxiYWNrKTtcblxuICAgICAgLy8gSWYgdGhlIG5ldyByZWZlcmVuY2UgaXMgbm90IHRoZSByZWZlcmVuY2UgZWxlbWVudFxuICAgICAgaWYgKCFyZWZlcmVuY2UuY29udGFpbnMocmVsYXRlZHJlZmVyZW5jZTIpKSB7XG4gICAgICAgIC8vIFNjaGVkdWxlIHRvIGhpZGUgdG9vbHRpcFxuICAgICAgICBfdGhpczUuX3NjaGVkdWxlSGlkZShyZWZlcmVuY2UsIG9wdGlvbnMuZGVsYXksIG9wdGlvbnMsIGV2dDIpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAoX3RoaXM1Ll90b29sdGlwTm9kZS5jb250YWlucyhyZWxhdGVkcmVmZXJlbmNlKSkge1xuICAgICAgLy8gbGlzdGVuIHRvIG1vdXNlbGVhdmUgb24gdGhlIHRvb2x0aXAgZWxlbWVudCB0byBiZSBhYmxlIHRvIGhpZGUgdGhlIHRvb2x0aXBcbiAgICAgIF90aGlzNS5fdG9vbHRpcE5vZGUuYWRkRXZlbnRMaXN0ZW5lcihldnQudHlwZSwgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9vbHRpcDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXRvb2x0aXAuanMubWFwXG4iLCJjb25zdCBNaWNyb01vZGFsID0gKCgpID0+IHtcblxuICBjb25zdCBGT0NVU0FCTEVfRUxFTUVOVFMgPSBbJ2FbaHJlZl0nLCAnYXJlYVtocmVmXScsICdpbnB1dDpub3QoW2Rpc2FibGVkXSk6bm90KFt0eXBlPVwiaGlkZGVuXCJdKTpub3QoW2FyaWEtaGlkZGVuXSknLCAnc2VsZWN0Om5vdChbZGlzYWJsZWRdKTpub3QoW2FyaWEtaGlkZGVuXSknLCAndGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pOm5vdChbYXJpYS1oaWRkZW5dKScsICdidXR0b246bm90KFtkaXNhYmxlZF0pOm5vdChbYXJpYS1oaWRkZW5dKScsICdpZnJhbWUnLCAnb2JqZWN0JywgJ2VtYmVkJywgJ1tjb250ZW50ZWRpdGFibGVdJywgJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleF49XCItXCJdKSddO1xuXG4gIGNsYXNzIE1vZGFsIHtcbiAgICBjb25zdHJ1Y3Rvcih7XG4gICAgICB0YXJnZXRNb2RhbCxcbiAgICAgIHRyaWdnZXJzID0gW10sXG4gICAgICBvblNob3cgPSAoKSA9PiB7fSxcbiAgICAgIG9uQ2xvc2UgPSAoKSA9PiB7fSxcbiAgICAgIG9wZW5UcmlnZ2VyID0gJ2RhdGEtbWljcm9tb2RhbC10cmlnZ2VyJyxcbiAgICAgIGNsb3NlVHJpZ2dlciA9ICdkYXRhLW1pY3JvbW9kYWwtY2xvc2UnLFxuICAgICAgZGlzYWJsZVNjcm9sbCA9IGZhbHNlLFxuICAgICAgZGlzYWJsZUZvY3VzID0gZmFsc2UsXG4gICAgICBhd2FpdENsb3NlQW5pbWF0aW9uID0gZmFsc2UsXG4gICAgICBhd2FpdE9wZW5BbmltYXRpb24gPSBmYWxzZSxcbiAgICAgIGRlYnVnTW9kZSA9IGZhbHNlXG4gICAgfSkge1xuICAgICAgLy8gU2F2ZSBhIHJlZmVyZW5jZSBvZiB0aGUgbW9kYWxcbiAgICAgIHRoaXMubW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRNb2RhbCk7IC8vIFNhdmUgYSByZWZlcmVuY2UgdG8gdGhlIHBhc3NlZCBjb25maWdcblxuICAgICAgdGhpcy5jb25maWcgPSB7XG4gICAgICAgIGRlYnVnTW9kZSxcbiAgICAgICAgZGlzYWJsZVNjcm9sbCxcbiAgICAgICAgb3BlblRyaWdnZXIsXG4gICAgICAgIGNsb3NlVHJpZ2dlcixcbiAgICAgICAgb25TaG93LFxuICAgICAgICBvbkNsb3NlLFxuICAgICAgICBhd2FpdENsb3NlQW5pbWF0aW9uLFxuICAgICAgICBhd2FpdE9wZW5BbmltYXRpb24sXG4gICAgICAgIGRpc2FibGVGb2N1cyAvLyBSZWdpc3RlciBjbGljayBldmVudHMgb25seSBpZiBwcmUgYmluZGluZyBldmVudExpc3RlbmVyc1xuXG4gICAgICB9O1xuICAgICAgaWYgKHRyaWdnZXJzLmxlbmd0aCA+IDApIHRoaXMucmVnaXN0ZXJUcmlnZ2VycyguLi50cmlnZ2Vycyk7IC8vIHByZSBiaW5kIGZ1bmN0aW9ucyBmb3IgZXZlbnQgbGlzdGVuZXJzXG5cbiAgICAgIHRoaXMub25DbGljayA9IHRoaXMub25DbGljay5iaW5kKHRoaXMpO1xuICAgICAgdGhpcy5vbktleWRvd24gPSB0aGlzLm9uS2V5ZG93bi5iaW5kKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMb29wcyB0aHJvdWdoIGFsbCBvcGVuVHJpZ2dlcnMgYW5kIGJpbmRzIGNsaWNrIGV2ZW50XG4gICAgICogQHBhcmFtICB7YXJyYXl9IHRyaWdnZXJzIFtBcnJheSBvZiBub2RlIGVsZW1lbnRzXVxuICAgICAqIEByZXR1cm4ge3ZvaWR9XG4gICAgICovXG5cblxuICAgIHJlZ2lzdGVyVHJpZ2dlcnMoLi4udHJpZ2dlcnMpIHtcbiAgICAgIHRyaWdnZXJzLmZpbHRlcihCb29sZWFuKS5mb3JFYWNoKHRyaWdnZXIgPT4ge1xuICAgICAgICB0cmlnZ2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnQgPT4gdGhpcy5zaG93TW9kYWwoZXZlbnQpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3dNb2RhbCgpIHtcbiAgICAgIHRoaXMuYWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLm1vZGFsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcbiAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LmFkZCgnaXMtb3BlbicpO1xuICAgICAgdGhpcy5zY3JvbGxCZWhhdmlvdXIoJ2Rpc2FibGUnKTtcbiAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcblxuICAgICAgaWYgKHRoaXMuY29uZmlnLmF3YWl0T3BlbkFuaW1hdGlvbikge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICAgIHRoaXMubW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgICAgIHRoaXMuc2V0Rm9jdXNUb0ZpcnN0Tm9kZSgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMubW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZXRGb2N1c1RvRmlyc3ROb2RlKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29uZmlnLm9uU2hvdyh0aGlzLm1vZGFsLCB0aGlzLmFjdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIGNsb3NlTW9kYWwoKSB7XG4gICAgICBjb25zdCBtb2RhbCA9IHRoaXMubW9kYWw7XG4gICAgICB0aGlzLm1vZGFsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVycygpO1xuICAgICAgdGhpcy5zY3JvbGxCZWhhdmlvdXIoJ2VuYWJsZScpO1xuXG4gICAgICBpZiAodGhpcy5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuYWN0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNvbmZpZy5vbkNsb3NlKHRoaXMubW9kYWwpO1xuXG4gICAgICBpZiAodGhpcy5jb25maWcuYXdhaXRDbG9zZUFuaW1hdGlvbikge1xuICAgICAgICB0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGZ1bmN0aW9uIGhhbmRsZXIoKSB7XG4gICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xuICAgICAgICAgIG1vZGFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2FuaW1hdGlvbmVuZCcsIGhhbmRsZXIsIGZhbHNlKTtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlTW9kYWxCeUlkKHRhcmdldE1vZGFsKSB7XG4gICAgICB0aGlzLm1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0TW9kYWwpO1xuICAgICAgaWYgKHRoaXMubW9kYWwpIHRoaXMuY2xvc2VNb2RhbCgpO1xuICAgIH1cblxuICAgIHNjcm9sbEJlaGF2aW91cih0b2dnbGUpIHtcbiAgICAgIGlmICghdGhpcy5jb25maWcuZGlzYWJsZVNjcm9sbCkgcmV0dXJuO1xuICAgICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcblxuICAgICAgc3dpdGNoICh0b2dnbGUpIHtcbiAgICAgICAgY2FzZSAnZW5hYmxlJzpcbiAgICAgICAgICBPYmplY3QuYXNzaWduKGJvZHkuc3R5bGUsIHtcbiAgICAgICAgICAgIG92ZXJmbG93OiAnJyxcbiAgICAgICAgICAgIGhlaWdodDogJydcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdkaXNhYmxlJzpcbiAgICAgICAgICBPYmplY3QuYXNzaWduKGJvZHkuc3R5bGUsIHtcbiAgICAgICAgICAgIG92ZXJmbG93OiAnaGlkZGVuJyxcbiAgICAgICAgICAgIGhlaWdodDogJzEwMHZoJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICB9XG4gICAgfVxuXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICB0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uQ2xpY2spO1xuICAgICAgdGhpcy5tb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljayk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleWRvd24pO1xuICAgIH1cblxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXJzKCkge1xuICAgICAgdGhpcy5tb2RhbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5vbkNsaWNrKTtcbiAgICAgIHRoaXMubW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLm9uQ2xpY2spO1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMub25LZXlkb3duKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0Lmhhc0F0dHJpYnV0ZSh0aGlzLmNvbmZpZy5jbG9zZVRyaWdnZXIpKSB7XG4gICAgICAgIHRoaXMuY2xvc2VNb2RhbCgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5ZG93bihldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSB0aGlzLmNsb3NlTW9kYWwoZXZlbnQpO1xuICAgICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDkpIHRoaXMubWFpbnRhaW5Gb2N1cyhldmVudCk7XG4gICAgfVxuXG4gICAgZ2V0Rm9jdXNhYmxlTm9kZXMoKSB7XG4gICAgICBjb25zdCBub2RlcyA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3RvckFsbChGT0NVU0FCTEVfRUxFTUVOVFMpO1xuICAgICAgcmV0dXJuIEFycmF5KC4uLm5vZGVzKTtcbiAgICB9XG5cbiAgICBzZXRGb2N1c1RvRmlyc3ROb2RlKCkge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLmRpc2FibGVGb2N1cykgcmV0dXJuO1xuICAgICAgY29uc3QgZm9jdXNhYmxlTm9kZXMgPSB0aGlzLmdldEZvY3VzYWJsZU5vZGVzKCk7XG4gICAgICBpZiAoZm9jdXNhYmxlTm9kZXMubGVuZ3RoKSBmb2N1c2FibGVOb2Rlc1swXS5mb2N1cygpO1xuICAgIH1cblxuICAgIG1haW50YWluRm9jdXMoZXZlbnQpIHtcbiAgICAgIGNvbnN0IGZvY3VzYWJsZU5vZGVzID0gdGhpcy5nZXRGb2N1c2FibGVOb2RlcygpOyAvLyBpZiBkaXNhYmxlRm9jdXMgaXMgdHJ1ZVxuXG4gICAgICBpZiAoIXRoaXMubW9kYWwuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICAgICAgZm9jdXNhYmxlTm9kZXNbMF0uZm9jdXMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGZvY3VzZWRJdGVtSW5kZXggPSBmb2N1c2FibGVOb2Rlcy5pbmRleE9mKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpO1xuXG4gICAgICAgIGlmIChldmVudC5zaGlmdEtleSAmJiBmb2N1c2VkSXRlbUluZGV4ID09PSAwKSB7XG4gICAgICAgICAgZm9jdXNhYmxlTm9kZXNbZm9jdXNhYmxlTm9kZXMubGVuZ3RoIC0gMV0uZm9jdXMoKTtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFldmVudC5zaGlmdEtleSAmJiBmb2N1c2VkSXRlbUluZGV4ID09PSBmb2N1c2FibGVOb2Rlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgZm9jdXNhYmxlTm9kZXNbMF0uZm9jdXMoKTtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gIH1cbiAgLyoqXG4gICAqIE1vZGFsIHByb3RvdHlwZSBlbmRzLlxuICAgKiBIZXJlIG9uIGNvZGUgaXMgcmVzcG9uc2libGUgZm9yIGRldGVjdGluZyBhbmRcbiAgICogYXV0byBiaW5kaW5nIGV2ZW50IGhhbmRsZXJzIG9uIG1vZGFsIHRyaWdnZXJzXG4gICAqL1xuICAvLyBLZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSBvcGVuZWQgbW9kYWxcblxuXG4gIGxldCBhY3RpdmVNb2RhbCA9IG51bGw7XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYW4gYXNzb2NpYXRpdmUgYXJyYXkgb2YgbW9kYWxzIGFuZCBpdCdzXG4gICAqIHJlc3BlY3RpdmUgdHJpZ2dlcnNcbiAgICogQHBhcmFtICB7YXJyYXl9IHRyaWdnZXJzICAgICBBbiBhcnJheSBvZiBhbGwgdHJpZ2dlcnNcbiAgICogQHBhcmFtICB7c3RyaW5nfSB0cmlnZ2VyQXR0ciBUaGUgZGF0YS1hdHRyaWJ1dGUgd2hpY2ggdHJpZ2dlcnMgdGhlIG1vZHVsZVxuICAgKiBAcmV0dXJuIHthcnJheX1cbiAgICovXG5cbiAgY29uc3QgZ2VuZXJhdGVUcmlnZ2VyTWFwID0gKHRyaWdnZXJzLCB0cmlnZ2VyQXR0cikgPT4ge1xuICAgIGNvbnN0IHRyaWdnZXJNYXAgPSBbXTtcbiAgICB0cmlnZ2Vycy5mb3JFYWNoKHRyaWdnZXIgPT4ge1xuICAgICAgY29uc3QgdGFyZ2V0TW9kYWwgPSB0cmlnZ2VyLmF0dHJpYnV0ZXNbdHJpZ2dlckF0dHJdLnZhbHVlO1xuICAgICAgaWYgKHRyaWdnZXJNYXBbdGFyZ2V0TW9kYWxdID09PSB1bmRlZmluZWQpIHRyaWdnZXJNYXBbdGFyZ2V0TW9kYWxdID0gW107XG4gICAgICB0cmlnZ2VyTWFwW3RhcmdldE1vZGFsXS5wdXNoKHRyaWdnZXIpO1xuICAgIH0pO1xuICAgIHJldHVybiB0cmlnZ2VyTWFwO1xuICB9O1xuICAvKipcbiAgICogVmFsaWRhdGVzIHdoZXRoZXIgYSBtb2RhbCBvZiB0aGUgZ2l2ZW4gaWQgZXhpc3RzXG4gICAqIGluIHRoZSBET01cbiAgICogQHBhcmFtICB7bnVtYmVyfSBpZCAgVGhlIGlkIG9mIHRoZSBtb2RhbFxuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cblxuXG4gIGNvbnN0IHZhbGlkYXRlTW9kYWxQcmVzZW5jZSA9IGlkID0+IHtcbiAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSkge1xuICAgICAgY29uc29sZS53YXJuKGBNaWNyb01vZGFsOiBcXHUyNzU3U2VlbXMgbGlrZSB5b3UgaGF2ZSBtaXNzZWQgJWMnJHtpZH0nYCwgJ2JhY2tncm91bmQtY29sb3I6ICNmOGY5ZmE7Y29sb3I6ICM1MDU5NmM7Zm9udC13ZWlnaHQ6IGJvbGQ7JywgJ0lEIHNvbWV3aGVyZSBpbiB5b3VyIGNvZGUuIFJlZmVyIGV4YW1wbGUgYmVsb3cgdG8gcmVzb2x2ZSBpdC4nKTtcbiAgICAgIGNvbnNvbGUud2FybihgJWNFeGFtcGxlOmAsICdiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmOWZhO2NvbG9yOiAjNTA1OTZjO2ZvbnQtd2VpZ2h0OiBib2xkOycsIGA8ZGl2IGNsYXNzPVwibW9kYWxcIiBpZD1cIiR7aWR9XCI+PC9kaXY+YCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogVmFsaWRhdGVzIGlmIHRoZXJlIGFyZSBtb2RhbCB0cmlnZ2VycyBwcmVzZW50XG4gICAqIGluIHRoZSBET01cbiAgICogQHBhcmFtICB7YXJyYXl9IHRyaWdnZXJzIEFuIGFycmF5IG9mIGRhdGEtdHJpZ2dlcnNcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBjb25zdCB2YWxpZGF0ZVRyaWdnZXJQcmVzZW5jZSA9IHRyaWdnZXJzID0+IHtcbiAgICBpZiAodHJpZ2dlcnMubGVuZ3RoIDw9IDApIHtcbiAgICAgIGNvbnNvbGUud2FybihgTWljcm9Nb2RhbDogXFx1Mjc1N1BsZWFzZSBzcGVjaWZ5IGF0IGxlYXN0IG9uZSAlYydtaWNyb21vZGFsLXRyaWdnZXInYCwgJ2JhY2tncm91bmQtY29sb3I6ICNmOGY5ZmE7Y29sb3I6ICM1MDU5NmM7Zm9udC13ZWlnaHQ6IGJvbGQ7JywgJ2RhdGEgYXR0cmlidXRlLicpO1xuICAgICAgY29uc29sZS53YXJuKGAlY0V4YW1wbGU6YCwgJ2JhY2tncm91bmQtY29sb3I6ICNmOGY5ZmE7Y29sb3I6ICM1MDU5NmM7Zm9udC13ZWlnaHQ6IGJvbGQ7JywgYDxhIGhyZWY9XCIjXCIgZGF0YS1taWNyb21vZGFsLXRyaWdnZXI9XCJteS1tb2RhbFwiPjwvYT5gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdHJpZ2dlcnMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgbW9kYWxzXG4gICAqIGFyZSBwcmVzZW50IGluIHRoZSBET01cbiAgICogQHBhcmFtICB7YXJyYXl9IHRyaWdnZXJzICAgQXJyYXkgb2YgRE9NIG5vZGVzIHdoaWNoIGhhdmUgZGF0YS10cmlnZ2Vyc1xuICAgKiBAcGFyYW0gIHthcnJheX0gdHJpZ2dlck1hcCBBc3NvY2lhdGl2ZSBhcnJheSBvZiBtb2RhbHMgYW5kIHRoZWlyIHRyaWdnZXJzXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXG5cbiAgY29uc3QgdmFsaWRhdGVBcmdzID0gKHRyaWdnZXJzLCB0cmlnZ2VyTWFwKSA9PiB7XG4gICAgdmFsaWRhdGVUcmlnZ2VyUHJlc2VuY2UodHJpZ2dlcnMpO1xuICAgIGlmICghdHJpZ2dlck1hcCkgcmV0dXJuIHRydWU7XG5cbiAgICBmb3IgKHZhciBpZCBpbiB0cmlnZ2VyTWFwKSB2YWxpZGF0ZU1vZGFsUHJlc2VuY2UoaWQpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIC8qKlxuICAgKiBCaW5kcyBjbGljayBoYW5kbGVycyB0byBhbGwgbW9kYWwgdHJpZ2dlcnNcbiAgICogQHBhcmFtICB7b2JqZWN0fSBjb25maWcgW2Rlc2NyaXB0aW9uXVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG5cblxuICBjb25zdCBpbml0ID0gY29uZmlnID0+IHtcbiAgICAvLyBDcmVhdGUgYW4gY29uZmlnIG9iamVjdCB3aXRoIGRlZmF1bHQgb3BlblRyaWdnZXJcbiAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwge1xuICAgICAgb3BlblRyaWdnZXI6ICdkYXRhLW1pY3JvbW9kYWwtdHJpZ2dlcidcbiAgICB9LCBjb25maWcpOyAvLyBDb2xsZWN0cyBhbGwgdGhlIG5vZGVzIHdpdGggdGhlIHRyaWdnZXJcblxuICAgIGNvbnN0IHRyaWdnZXJzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFske29wdGlvbnMub3BlblRyaWdnZXJ9XWApXTsgLy8gTWFrZXMgYSBtYXBwaW5ncyBvZiBtb2RhbHMgd2l0aCB0aGVpciB0cmlnZ2VyIG5vZGVzXG5cbiAgICBjb25zdCB0cmlnZ2VyTWFwID0gZ2VuZXJhdGVUcmlnZ2VyTWFwKHRyaWdnZXJzLCBvcHRpb25zLm9wZW5UcmlnZ2VyKTsgLy8gQ2hlY2tzIGlmIG1vZGFscyBhbmQgdHJpZ2dlcnMgZXhpc3QgaW4gZG9tXG5cbiAgICBpZiAob3B0aW9ucy5kZWJ1Z01vZGUgPT09IHRydWUgJiYgdmFsaWRhdGVBcmdzKHRyaWdnZXJzLCB0cmlnZ2VyTWFwKSA9PT0gZmFsc2UpIHJldHVybjsgLy8gRm9yIGV2ZXJ5IHRhcmdldCBtb2RhbCBjcmVhdGVzIGEgbmV3IGluc3RhbmNlXG5cbiAgICBmb3IgKHZhciBrZXkgaW4gdHJpZ2dlck1hcCkge1xuICAgICAgbGV0IHZhbHVlID0gdHJpZ2dlck1hcFtrZXldO1xuICAgICAgb3B0aW9ucy50YXJnZXRNb2RhbCA9IGtleTtcbiAgICAgIG9wdGlvbnMudHJpZ2dlcnMgPSBbLi4udmFsdWVdO1xuICAgICAgYWN0aXZlTW9kYWwgPSBuZXcgTW9kYWwob3B0aW9ucyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gICAgfVxuICB9O1xuICAvKipcbiAgICogU2hvd3MgYSBwYXJ0aWN1bGFyIG1vZGFsXG4gICAqIEBwYXJhbSAge3N0cmluZ30gdGFyZ2V0TW9kYWwgW1RoZSBpZCBvZiB0aGUgbW9kYWwgdG8gZGlzcGxheV1cbiAgICogQHBhcmFtICB7b2JqZWN0fSBjb25maWcgW1RoZSBjb25maWd1cmF0aW9uIG9iamVjdCB0byBwYXNzXVxuICAgKiBAcmV0dXJuIHt2b2lkfVxuICAgKi9cblxuXG4gIGNvbnN0IHNob3cgPSAodGFyZ2V0TW9kYWwsIGNvbmZpZykgPT4ge1xuICAgIGNvbnN0IG9wdGlvbnMgPSBjb25maWcgfHwge307XG4gICAgb3B0aW9ucy50YXJnZXRNb2RhbCA9IHRhcmdldE1vZGFsOyAvLyBDaGVja3MgaWYgbW9kYWxzIGFuZCB0cmlnZ2VycyBleGlzdCBpbiBkb21cblxuICAgIGlmIChvcHRpb25zLmRlYnVnTW9kZSA9PT0gdHJ1ZSAmJiB2YWxpZGF0ZU1vZGFsUHJlc2VuY2UodGFyZ2V0TW9kYWwpID09PSBmYWxzZSkgcmV0dXJuOyAvLyBzdG9yZXMgcmVmZXJlbmNlIHRvIGFjdGl2ZSBtb2RhbFxuXG4gICAgYWN0aXZlTW9kYWwgPSBuZXcgTW9kYWwob3B0aW9ucyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG5cbiAgICBhY3RpdmVNb2RhbC5zaG93TW9kYWwoKTtcbiAgfTtcbiAgLyoqXG4gICAqIENsb3NlcyB0aGUgYWN0aXZlIG1vZGFsXG4gICAqIEBwYXJhbSAge3N0cmluZ30gdGFyZ2V0TW9kYWwgW1RoZSBpZCBvZiB0aGUgbW9kYWwgdG8gY2xvc2VdXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuXG5cbiAgY29uc3QgY2xvc2UgPSB0YXJnZXRNb2RhbCA9PiB7XG4gICAgdGFyZ2V0TW9kYWwgPyBhY3RpdmVNb2RhbC5jbG9zZU1vZGFsQnlJZCh0YXJnZXRNb2RhbCkgOiBhY3RpdmVNb2RhbC5jbG9zZU1vZGFsKCk7XG4gIH07XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIHNob3csXG4gICAgY2xvc2VcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IE1pY3JvTW9kYWw7XG4iLCJmdW5jdGlvbiBzdHlsZUluamVjdChjc3MsIHJlZikge1xuICBpZiAoIHJlZiA9PT0gdm9pZCAwICkgcmVmID0ge307XG4gIHZhciBpbnNlcnRBdCA9IHJlZi5pbnNlcnRBdDtcblxuICBpZiAoIWNzcyB8fCB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybjsgfVxuXG4gIHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcblxuICBpZiAoaW5zZXJ0QXQgPT09ICd0b3AnKSB7XG4gICAgaWYgKGhlYWQuZmlyc3RDaGlsZCkge1xuICAgICAgaGVhZC5pbnNlcnRCZWZvcmUoc3R5bGUsIGhlYWQuZmlyc3RDaGlsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0eWxlSW5qZWN0O1xuIiwiXG5pbXBvcnQgbG9nIGZyb20gXCIuL2xvZ2dpbmdcIlxuaW1wb3J0IHsgaXNfYXJyYXkgfSBmcm9tIFwiLi91dGlsc1wiXG5pbXBvcnQgSlNPTlAgZnJvbSBcImJyb3dzZXItanNvbnBcIlxuXG4vL2ltcG9ydCB0aW5nbGUgZnJvbSBcInRpbmdsZS5qc1wiXG5cbmltcG9ydCBUb29sdGlwIGZyb20gXCJ0b29sdGlwLmpzXCJcblxuaW1wb3J0IE1pY3JvTW9kYWwgZnJvbSAnbWljcm9tb2RhbCc7XG5cbi8vaW1wb3J0ICd0aW5nbGUuanMvZGlzdC90aW5nbGUubWluLmNzcycgLy9GSVhNRSAtIHdlIHNob3VsZCBwZXJoYXBzIHNldCB0aGUgcm9sbHVwIGNvbmZpZyB0byBOT1QgaW5qZWN0IGJ5IGRlZmF1bHQsIGFuZCB0aGVuIHdlIGRvIGl0IG91cnNlbHZlcyBsYXRlciB3aGVuIG5lZWRlZD9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmIG90aGVyIHBlb3BsZSBhcmUgYWxzbyB1c2luZyB0aGUgVGluZ2xlIGxpYnJhcnksIHRoZW4gdGhpcyB3b3VsZCBwcmV2ZW50IHVzIGFsbCBmcm9tIGNvbmZsaWN0aW5nIHdpdGggZWFjaCBvdGhlclxuXG5pbXBvcnQgJy4vcG9wcGVyLmNzcycgLy9GSVhNRSAtIHRoaXMgYWxzbyBzaG91bGQgb25seSBiZSBsb2FkZWQgaWYgbmVlZGVkIChhbGxvdyBjdXN0b21lcnMgdG8gb3ZlcnJpZGUgQ1NTIEkgZ3Vlc3M/KVxuXG5pbXBvcnQgJy4vbWljcm9tb2RhbC5jc3MnIC8vRklYTUUgLSBvbmx5IGltcG9ydCB3aGVuIGl0J3MgbmVlZGVkIHNvIHdlIGRvbid0IHVubmVjZXNzYXJpbHkganVuayB1cCB0aGUgRE9NXG5cbi8vIEZJWE1FIC0gSSBhbHNvIGRvbid0IGxpa2UgVGluZ2xlIHZlcnkgbXVjaCwgSSB0aGluayBJIHdhbnQgdG8gc3dhcCBpdCBmb3IgTWljcm9tb2RhbC5qc1xuLy8gaW1wb3J0IE1pY3JvTW9kYWwgZnJvbSAnbWljcm9tb2RhbCc7ICAvLyBlczYgbW9kdWxlXG5cbnZhciBub2RlX2NyZWF0b3IgPSBmdW5jdGlvbiAobmFtZSwgYXR0cmlidXRlcywgdGV4dCkge1xuICAgIHZhciBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuYW1lKVxuICAgIGZvciAodmFyIGtleSBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgICAgIGVsZW0uc2V0QXR0cmlidXRlKGtleSxhdHRyaWJ1dGVzW2tleV0pXG4gICAgfVxuICAgIGlmKHRleHQpIHtcbiAgICAgICAgZWxlbS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KSlcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRm9ybSB7XG4gICAgY29uc3RydWN0b3Iob3B0aW9ucykge1xuICAgICAgICBsb2cuZGVidWcoXCJJbnZva2luZyBDbGFzcyBjb25zdHJ1Y3RvciFcIilcbiAgICAgICAgZm9yKGxldCBrZXkgaW4gb3B0aW9ucykge1xuICAgICAgICAgICAgbG9nLmRlYnVnKFwiU2V0dGluZzogXCIra2V5K1wiIHRvIFwiK29wdGlvbnNba2V5XSlcbiAgICAgICAgICAgIHRoaXNba2V5XSA9IG9wdGlvbnNba2V5XVxuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmZvcm1fa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gbG9nLmVycm9yKFwiTm8gRm9ybSBLZXkgc2V0IVwiKVxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMubWFudWFsKSB7XG4gICAgICAgICAgICAvL2JhaWwgb3V0IG9mIHRoZSByZXN0IG9mIHNldHVwIGZvciBtYW51YWwtbW9kZVxuICAgICAgICAgICAgbG9nLmRlYnVnKFwiTWFudWFsIG1vZGUgc2VsZWN0ZWQ7IGV4aXRpbmcgc2V0dXBcIilcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmVtYWlsX2ZpZWxkKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9nLmVycm9yKFwiTm8gRW1haWwgRmllbGQgc2V0IVwiKVxuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmZvcm0pIHtcbiAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIlRyeWluZyB0byBndWVzcyBGb3JtIHZhbHVlXCIpXG4gICAgICAgICAgICAvL3RyeSBhbmQgZ3Vlc3MgZm9ybSBmcm9tIGVtYWlsIGZpZWxkJ3MgJ2Zvcm0nIHByb3BlcnR5XG4gICAgICAgICAgICB0aGlzLmZvcm0gPSB0aGlzLmVtYWlsX2ZpZWxkLmZvcm1cbiAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIlBpY2tlZDogXCIrdGhpcy5mb3JtKVxuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLmZvcm0pIHtcbiAgICAgICAgICAgIHJldHVybiBsb2cuZXJyb3IoXCJDb3VsZCBub3QgZGV0ZXJtaW5lIEZvcm0hXCIpXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMuc3VibWl0X2J1dHRvbikge1xuICAgICAgICAgICAgbG9nLmRlYnVnKFwiVHJ5aW5nIHRvIGZpbmQgc3VibWl0IGJ1dHRvbnMuLi5cIilcbiAgICAgICAgICAgIGxldCBzdWJtaXRfYnV0dG9ucz1bXVxuICAgICAgICAgICAgZm9yKGxldCBlbGVtZW50IGluIHRoaXMuZm9ybS5lbGVtZW50cykgeyAvL0ZJWE1FIC0gc2hvdWxkIHVzZSBpbnRlZ2VycyBvbmx5P1xuICAgICAgICAgICAgICAgIGxldCB0aGlzX2VsZW1lbnQgPSB0aGlzLmZvcm0uZWxlbWVudHNbZWxlbWVudF1cbiAgICAgICAgICAgICAgICBsb2cuZGVidWcoXCJDaGVja2luZyBlbGVtZW50OiBcIitlbGVtZW50K1wiIC0gbm9kZU5hbWU6ICdcIit0aGlzX2VsZW1lbnQubm9kZU5hbWUrXCInIFR5cGU6ICdcIit0aGlzX2VsZW1lbnQudHlwZStcIidcIilcbiAgICAgICAgICAgICAgICBpZih0aGlzX2VsZW1lbnQubm9kZU5hbWUgPT0gXCJJTlBVVFwiICYmIHRoaXNfZWxlbWVudC50eXBlID09XCJzdWJtaXRcIikgeyAvL0ZJWE1FIC0gc2hvdWxkIGZpbmQgb3RoZXIgc3VibWl0dGluZy1idXR0b25zIHRvbyEgZS5nLiA8YnV0dG9uPiBvciA8aW5wdXQgdHlwZT0nYnV0dG9uJz5cbiAgICAgICAgICAgICAgICAgICAgbG9nLmRlYnVnKFwiRm91bmQgYSBzdWJtaXQgYnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pdF9idXR0b25zLnB1c2godGhpc19lbGVtZW50KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc3VibWl0X2J1dHRvbiA9IHN1Ym1pdF9idXR0b25zXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0aWFsaXplX2RvbSgpXG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZV9kb20oKSB7XG4gICAgICAgIC8vIHNldCB1cCB0aGUgb25jaGFuZ2UgaGFuZGxlciBmb3IgdGhlIGVtYWlsIGZpZWxkXG4gICAgICAgIGxldCBvbGRfb25jaGFuZ2UgPSB0aGlzLmVtYWlsX2ZpZWxkLm9uY2hhbmdlXG4gICAgICAgIHRoaXMuZW1haWxfZmllbGQub25jaGFuZ2UgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25jaGFuZ2VfaGFuZGxlcihldmVudClcbiAgICAgICAgICAgIGlmKG9sZF9vbmNoYW5nZSkge1xuICAgICAgICAgICAgICAgIG9sZF9vbmNoYW5nZShldmVudClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vc2V0IHVwIHRoZSBvbnN1Ym1pdCBoYW5kbGVyIGZvciB0aGUgZm9ybSAoaWYgdGhlcmUgaXMgb25lKVxuICAgICAgICBpZih0aGlzLmZvcm0pIHtcbiAgICAgICAgICAgIGxldCBvbGRfb25zdWJtaXQgPSB0aGlzLmZvcm0ub25zdWJtaXRcbiAgICAgICAgICAgIHRoaXMuZm9ybS5vbnN1Ym1pdCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHRzXG4gICAgICAgICAgICAgICAgaWYob2xkX29uc3VibWl0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBvbGRfb25zdWJtaXQoZXZlbnQpIC8vRklYTUUgLSBjb25mdXNpbmcsICp0aGVpciogb2xkIG9uc3VibWl0IGhhbmRsZXIgZmlyZXMgKmZpcnN0Kj9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vbnN1Ym1pdF9oYW5kbGVyKGV2ZW50KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vZGlzYWJsZSBzdWJtaXQgYnV0dG9uLCBpZiB0aGVyZSBpcyBvbmUgLSBcbiAgICAgICAgdGhpcy5kaXNhYmxlX3N1Ym1pdHMoKVxuICAgIH1cblxuICAgIGRpc2FibGVfc3VibWl0cygpIHtcbiAgICAgICAgdGhpcy5zZXRfc3VibWl0X2J1dHRvbl9kaXNhYmxlZCh0cnVlKVxuICAgIH1cblxuICAgIGVuYWJsZV9zdWJtaXRzKCkge1xuICAgICAgICB0aGlzLnNldF9zdWJtaXRfYnV0dG9uX2Rpc2FibGVkKGZhbHNlKVxuICAgIH1cblxuICAgIHNldF9zdWJtaXRfYnV0dG9uX2Rpc2FibGVkKHN0YXRlKSB7XG4gICAgICAgIGlmKHRoaXMuc3VibWl0X2J1dHRvbikge1xuICAgICAgICAgICAgbG9nLmRlYnVnKFwiVHJ5aW5nIHRvIGRpc2FibGUgc3VibWl0IGJ1dHRvbi4uLlwiKVxuICAgICAgICAgICAgaWYoaXNfYXJyYXkodGhpcy5zdWJtaXRfYnV0dG9uKSkge1xuICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIlN1Ym1pdCBidXR0b24gSVMgQVJSQVlcIilcbiAgICAgICAgICAgICAgICBmb3IobGV0IHggaW4gdGhpcy5zdWJtaXRfYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0X2J1dHRvblt4XS5kaXNhYmxlZCA9IHN0YXRlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdF9idXR0b24uZGlzYWJsZWQgPSBzdGF0ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25jaGFuZ2VfaGFuZGxlcihldmVudCkge1xuICAgICAgICB0aGlzLnZlcmlmeSh0aGlzLmVtYWlsX2ZpZWxkLnZhbHVlLCAocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgbG9nLmRlYnVnKFwiVmVyaWZpY2F0aW9uIHJlc3VsdHMgYXJlOiBcIilcbiAgICAgICAgICAgIGxvZy5kZWJ1Z2RpcihyZXN1bHRzKVxuICAgICAgICAgICAgc3dpdGNoKHJlc3VsdHMuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkJBRFwiOlxuICAgICAgICAgICAgICAgIC8vRklSRSBIT09LUyBGSVJTVD8gRklYTUVcbiAgICAgICAgICAgICAgICBpZighdGhpcy5teXRvb2x0aXApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5teXRvb2x0aXAgPSBuZXcgVG9vbHRpcCh0aGlzLmVtYWlsX2ZpZWxkLCB7cGxhY2VtZW50OiAnYm90dG9tJywgdGl0bGU6ICdCYWQgRW1haWwgQWRkcmVzcycsIHRyaWdnZXI6ICdtYW51YWwnfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5teXRvb2x0aXAuc2hvdygpXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlX3N1Ym1pdHMoKVxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlIFwiR09PRFwiOiAvL0ZJWE1FIGNvcHlwYXN0YSBFVkVSWVdIRVJFXG4gICAgICAgICAgICAgICAgLy9GSVJFIEhPT0tTIEZJUlNUPyBGSVhNRVxuICAgICAgICAgICAgICAgIGlmKHRoaXMubXl0b29sdGlwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXl0b29sdGlwLmhpZGUoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmluc2VydF9jaGVja3N1bShyZXN1bHRzLmNoZWNrc3VtKVxuICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0X3N0YXR1cyhyZXN1bHRzLnN0YXR1cylcbiAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZV9zdWJtaXRzKClcbiAgICAgICAgICAgICAgICBicmVha1xuXG4gICAgICAgICAgICAgICAgY2FzZSBcIkNIQUxMRU5HRVwiOlxuICAgICAgICAgICAgICAgIC8vRklSRSBIT09LUyBGSVJTVD8gRklYTUVcbiAgICAgICAgICAgICAgICAvLy91aC4uLi50aHJvdyB1cCBhIHByb21wdD9cbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlfY2hhbGxlbmdlX21vZGFsKHJlc3VsdHMuY2hhbGxlbmdlX2tleSlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIC8vbm8gaWRlYSFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBpbnNlcnRfY2hlY2tzdW0odmFsdWUpIHtcbiAgICAgICAgdmFyIGNoZWNrc3VtX2VsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29vZHZlcmlmaWNhdGlvbl9jaGVja3N1bScpXG4gICAgICAgIGlmKGNoZWNrc3VtX2VsZW1lbnQpIHtcbiAgICAgICAgICAgIGNoZWNrc3VtX2VsZW1lbnQudmFsdWUgPSB2YWx1ZVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcm0uYXBwZW5kQ2hpbGQobm9kZV9jcmVhdG9yKCdpbnB1dCcsIHsndHlwZSc6ICdoaWRkZW4nLCduYW1lJzogJ2NoZWNrc3VtJywndmFsdWUnOiB2YWx1ZSwnaWQnOiAnZ29vZHZlcmlmaWNhdGlvbl9jaGVja3N1bSd9KSlcbiAgICB9XG5cbiAgICBpbnNlcnRfc3RhdHVzKHN0YXR1cykgeyAvL0ZJWE1FIHRoaXMgaXMgY29weXBhc3RhIHJlbGF0aXZlIHRvIGluc2VydF9jaGVja3N1bSgpXG4gICAgICAgIHZhciBzdGF0dXNfZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb29kdmVyaWZpY2F0aW9uX3N0YXR1cycpXG4gICAgICAgIGlmKHN0YXR1c19lbGVtZW50KSB7XG4gICAgICAgICAgICBzdGF0dXNfZWxlbWVudC52YWx1ZSA9IHN0YXR1c1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZvcm0uYXBwZW5kQ2hpbGQobm9kZV9jcmVhdG9yKCdpbnB1dCcsIHsndHlwZSc6ICdoaWRkZW4nLCduYW1lJzogJ3N0YXR1cycsJ3ZhbHVlJzogc3RhdHVzLCdpZCc6ICdnb29kdmVyaWZpY2F0aW9uX3N0YXR1cyd9KSkgLy9GSVhNRSB0aGF0IG5hbWUgaXMgZ29pbmcgdG8gY29sbGlkZVxuICAgIH1cblxuICAgIGdldF9tb2RhbChjaGFsbGVuZ2Vfa2V5KSB7IC8vVE9ETyAtIHRoaXMgbmVlZHMgYnJlYWtpbmcgdXAsIGl0J3MgYSBsaXR0bGUgcmFtYmx5XG4gICAgICAgIGxvZy5kZWJ1ZyhcIkdldHRpbmcgbW9kYWwgLSBjaGFsbGVuZ2Uga2V5IGlzOiBcIitjaGFsbGVuZ2Vfa2V5KVxuICAgICAgICBpZighdGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIG5lZWQgdG8gaW5zZXJ0IHRoaXMgcmlnaHQgYmVmb3JlIHRoZSBjbG9zZS1ib2R5IHRhZy4gSG93IGluIHRoZSBoZWxsIHdpbGwgd2UgZG8gdGhhdD8hXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5IGdpdmVzIHVzIHRoZSBib2R5IHRhZ1xuICAgICAgICAgICAgLmFwcGVuZENoaWxkKCkgd2lsbCBsZXQgeW91IGluc2VydCBub2RlcywgSSBndWVzcz9cblxuICAgICAgICAgICAgPCEtLSBDb250YWluZXIgLS0+XG4gICAgICAgICAgICA8ZGl2IGlkPVwibW9kYWwtMVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgIDwhLS0gT3ZlcmxheSAtLT5cbiAgICAgICAgICAgICAgICA8ZGl2IHRhYmluZGV4PVwiLTFcIiBkYXRhLW1pY3JvbW9kYWwtY2xvc2U+XG4gICAgICAgICAgICAgICAgICAgIDwhLS0gQ29udGFpbmVyIC0tPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHJvbGU9XCJkaWFsb2dcIiBhcmlhLW1vZGFsPVwidHJ1ZVwiIGFyaWEtbGFiZWxsZWRieT1cIm1vZGFsLTEtdGl0bGVcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aGVhZGVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiBpZD1cIm1vZGFsLTEtdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNb2RhbCBUaXRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvaDI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8IS0tIFs0XSAtLT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGFyaWEtbGFiZWw9XCJDbG9zZSBtb2RhbFwiIGRhdGEtbWljcm9tb2RhbC1jbG9zZT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvaGVhZGVyPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGlkPVwibW9kYWwtMS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTW9kYWwgQ29udGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAqL1xuICAgICAgICAgICAgLypcbiAgICAgICAgICAgIC8vc29tZXRoaW5nIEknbSB0aGlua2luZyBhYm91dCAtIGRvZXNuJ3Qgd29yayB5ZXQsIGFuZCBpdCBkb2Vzbid0IG1ha2Ugc2Vuc2UgYmVjYXVzZVxuICAgICAgICAgICAgeW91IGNhbid0IGhhdmUgdHdvIGRpdidzIGF0IHRoZSBzYW1lIGxldmVsLiBCdXQgbWF5YmUgc29tZXRoaW5nIGxpa2UgdGhpcz8gQ2xldmVyIGFycmF5IHN0dWZmP1xuICAgICAgICAgICAgRHVubm8uIFxuICAgICAgICAgICAgdmFyIF90ZXN0ID0ge2RpdjogW3tpZDogXCJtb2RhbC0xXCIsXCJhcmlhLWhpZGRlblwiOiB0cnVlfSx7IC8vdXNlIG5hdGl2ZSBKUyB0eXBlczsgYXV0b21hdGljYWxseSBjYXN0IGJvb2wgdG8gdGV4dFxuICAgICAgICAgICAgICAgIGRpdjogW3t0YWJpbmRleDogLTEsXCJkYXRhLW1pY3JvbW9kYWwtY2xvc2U6IFwiXCJ9LHsgLy91c2UgaW50ZWdlciB0eXBlLCBjYXN0IHRvIHRleHRcbiAgICAgICAgICAgICAgICAgICAgZGl2OiBbe3JvbGU6IFwiZGlhbG9nXCIsXCJhcmlhLW1vZGFsXCI6IHRydWUsXCJhcmlhLWxhYmVsbGVkYnlcIjpcIm1vZGFsLTEtdGl0bGVcIn0se1xuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiBbe30se1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGgyOiBbe2lkOiBcIm1vZGFsLTEtdGl0bGVcIn0sXCJNb2RhbCBUaXRsZVwiXSwgLy9kZXRlY3QgdGV4dD9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0b246IFt7XCJhcmlhLWxhYmVsXCI6IFwiQ2xvc2UgbW9kYWxcIixcImRhdGEtbWljcm9tb2RhbC1jbG9zZVwiOlwiXCJ9LHt9XSAvL29taXQ/XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZGl2OiBbe2lkOiBcIm1vZGFsLTEtY29udGVudFwifSxcIk1vZGFsIENvbnRlbnRcIl1dIC8vdGV4dCFcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV19XG5cbiAgICAgICAgICAgIGlmIHlvdSBuZWVkZWQgKlRXTyogZGl2cyBvciBzb21ldGhpbmcsIHlvdSBjb3VsZCBkbzpcblxuICAgICAgICAgICAge2RpdjogW3tpZDogXCJibGFoXCJ9LFtcbiAgICAgICAgICAgICAgICB7ZGl2OiBbe30se31dfSxcbiAgICAgICAgICAgICAgICB7ZGl2OiBbe30se31dfVxuICAgICAgICAgICAgXV19XG4gICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICAvL0ZJWE1FIHByb2xseSBuZWVkIHRvIHJlbmFtZSBhbGwgb2YgdGhlc2UgY2xhc3NlcyB0byBzb21ldGhpbmcgdW5pcXVlXG4gICAgICAgICAgICAvL0ZJWE1FIHdpbGwgbmVlZCB0byB1cGRhdGUgdGhlIENTUyBhY2NvcmRpbmdseSBhcyB3ZWxsLlxuICAgICAgICAgICAgdmFyIG1vZGFsID0gbm9kZV9jcmVhdG9yKFwiZGl2XCIsIHtcImlkXCI6IFwiZ29vZHZlcmlmaWNhdGlvbi1tb2RhbFwiLCBcImFyaWEtaGlkZGVuXCI6XCJ0cnVlXCIsIFwiY2xhc3NcIjogXCJtb2RhbCBtaWNyb21vZGFsLXNsaWRlXCJ9KVxuXG4gICAgICAgICAgICB2YXIgb3ZlcmxheSA9IG5vZGVfY3JlYXRvcihcImRpdlwiLCB7XCJ0YWJpbmRleFwiOiBcIi0xXCIsIFwiZGF0YS1taWNyb21vZGFsLWNsb3NlXCI6IFwiXCIsIFwiY2xhc3NcIjogXCJtb2RhbF9fb3ZlcmxheVwifSlcblxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IG5vZGVfY3JlYXRvcihcImRpdlwiLCB7XCJyb2xlXCI6IFwiZGlhbG9nXCIsXCJhcmlhLW1vZGFsXCI6IFwidHJ1ZVwiLCBcImFyaWEtbGFiZWxsZWRieVwiOiBcIm1vZGFsLTEtdGl0bGVcIiwgXCJjbGFzc1wiOiBcIm1vZGFsX19jb250YWluZXJcIn0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBoZWFkZXIgPSBub2RlX2NyZWF0b3IoXCJoZWFkZXJcIiwge1wiY2xhc3NcIjpcIm1vZGFsX19oZWFkZXJcIn0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBoMiA9IG5vZGVfY3JlYXRvcihcImgyXCIsIHtcImlkXCI6IFwibW9kYWwtMS10aXRsZVwiLFwiY2xhc3NcIjogXCJtb2RhbF9fdGl0bGVcIn0sXCJUb28gTWFueSBWZXJpZmljYXRpb25zXCIpXG5cbiAgICAgICAgICAgIHZhciBjbG9zZV9idXR0b24gPSBub2RlX2NyZWF0b3IoXCJidXR0b25cIiwge1wiYXJpYS1sYWJlbFwiOiBcIkNsb3NlIG1vZGFsXCIsXCJkYXRhLW1pY3JvbW9kYWwtY2xvc2VcIjogXCJcIiwgXCJjbGFzc1wiOiBcIm1vZGFsX19jbG9zZVwifSlcblxuICAgICAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKGgyKVxuICAgICAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKGNsb3NlX2J1dHRvbilcblxuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBub2RlX2NyZWF0b3IoXCJkaXZcIiwge1wiaWRcIjpcIm1vZGFsLTEtY29udGVudFwiLFwiY2xhc3NcIjogXCJtb2RhbF9fY29udGVudFwifSwgIFwiVG9vIG1hbnkgdmVyaWZpY2F0aW9ucyBmcm9tIHRoaXMgSVAuIFdlIG5lZWQgdG8gc2VuZCB5b3UgYW4gZW1haWwgdG8gdmVyaWZ5IHRoYXQgeW91IGFyZSB5b3UhIFwiK1xuICAgICAgICAgICAgXCJJZiB5b3UgYWdyZWUsIHJlLXR5cGUgeW91ciBlbWFpbCBoZXJlOiBcIilcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IG5vZGVfY3JlYXRvcihcImlucHV0XCIsIHtcInR5cGVcIjogXCJ0ZXh0XCIsXCJpZFwiOiBcImdvb2R2ZXJpZmljYXRpb25fY2hhbGxlbmdlX2FkZHJlc3NcIn0pXG4gICAgICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKGlucHV0KVxuXG4gICAgICAgICAgICB2YXIgZm9vdGVyID0gbm9kZV9jcmVhdG9yKFwiZm9vdGVyXCIsIHtcImNsYXNzXCI6XCJtb2RhbF9fZm9vdGVyXCJ9KVxuICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IG5vZGVfY3JlYXRvcihcImJ1dHRvblwiLCB7XCJjbGFzc1wiOlwibW9kYWxfX2J0biBtb2RhbF9fYnRuLXByaW1hcnlcIn0sXCJDb250aW51ZVwiKVxuICAgICAgICAgICAgYnV0dG9uLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5lbWFpbF9maWVsZC52YWx1ZSAhPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29vZHZlcmlmaWNhdGlvbl9jaGFsbGVuZ2VfYWRkcmVzcycpLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIkZpZWxkIHZhbHVlOiBcIit0aGlzLmVtYWlsX2ZpZWxkLnZhbHVlK1wiICwgY2hhbGxlbmdlX2FkZHJlc3M6IFwiK2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb29kdmVyaWZpY2F0aW9uX2NoYWxsZW5nZV9hZGRyZXNzJykudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWwtMS1jb250ZW50XCIpLmlubmVySFRNTCA9IFwiRW1haWwgZG9lc24ndCBtYXRjaCBmaWVsZCBvbiBmb3JtIVwiIC8vRklYTUUgLSBkb24ndCB1c2UgaW5uZXJIVE1MXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5tb2RhbC5zZXRDb250ZW50KFwiRW1haWwgZG9lc24ndCBtYXRjaCBmaWVsZCBvbiBmb3JtIVwiKVxuICAgICAgICAgICAgICAgICAgICAvL2NhbiB3ZSB5YW5rIHRoZSAnc3VibWl0JyBidXR0b24/IEZJWE1FIVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jaGFsbGVuZ2UodGhpcy5lbWFpbF9maWVsZC52YWx1ZSxjaGFsbGVuZ2Vfa2V5LCAocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsb2cuZGVidWcoXCJDaGFsbGVuZ2UgcmVzdWx0cyBhcmU6IFwiKVxuICAgICAgICAgICAgICAgICAgICBsb2cuZGVidWdkaXIocmVzdWx0cylcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0cy5zdGF0dXMgPT0gXCJBQ0NFUFRFRFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLTEtY29udGVudFwiKS5pbm5lckhUTUwgPSBcIklucHV0IGVtYWlsZWQgUElOOiA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2dvb2R2ZXJpZmljYXRpb25fcGluJyAvPlwiIC8vIEZJWE1FIC0gZG9uJ3QgdXNlIGlubmVySFRNTD9cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1dHRvbi5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29vZHZlcmlmaWNhdGlvbl9waW4nKS52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2UodGhpcy5lbWFpbF9maWVsZC52YWx1ZSxjaGFsbGVuZ2Vfa2V5LCBwaW4sIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2cuZGVidWdkaXIocmVzcG9uc2UpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3BvbnNlLnN0YXR1cyA9PSBcIkdPT0RcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWljcm9Nb2RhbC5jbG9zZSgnZ29vZHZlcmlmaWNhdGlvbi1tb2RhbCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmluc2VydF9jaGVja3N1bShyZXNwb25zZS5jaGVja3N1bSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaW5zZXJ0X3N0YXR1cyhyZXNwb25zZS5zdGF0dXMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZV9zdWJtaXRzKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMubW9kYWwuc2V0Q29udGVudChcIklucHV0IGVtYWlsZWQgUElOOiA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2dvb2R2ZXJpZmljYXRpb25fcGluJyAvPlwiKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwiQ2hhbGxlbmdlIHJlamVjdGVkIVwiKSAvL0ZJWE1FIC0gc2hvdWxkIG5ldmVyIGhhcHBlbiB0aG8hXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9vdGVyLmFwcGVuZENoaWxkKGJ1dHRvbilcbiAgICAgICAgICAgIGZvb3Rlci5hcHBlbmRDaGlsZChub2RlX2NyZWF0b3IoXCJidXR0b25cIix7XCJjbGFzc1wiOiBcIm1vZGFsX19idG5cIixcImRhdGEtbWljcm9tb2RhbC1jbG9zZVwiOiBcIlwiLFwiYXJpYS1sYWJlbFwiOlwiQ2xvc2UgdGhpcyBkaWFsb2cgd2luZG93XCJ9LFwiQ2xvc2VcIikpXG5cbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGVudClcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb290ZXIpXG5cbiAgICAgICAgICAgIG92ZXJsYXkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgICAgICAgICAgbW9kYWwuYXBwZW5kQ2hpbGQob3ZlcmxheSlcblxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbClcbiAgICAgICAgICAgIHRoaXMubW9kYWwgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubW9kYWxcbiAgICB9XG5cbiAgICBkaXNwbGF5X2NoYWxsZW5nZV9tb2RhbChjaGFsbGVuZ2Vfa2V5KSB7XG4gICAgICAgIHRoaXMuZ2V0X21vZGFsKGNoYWxsZW5nZV9rZXkpXG4gICAgICAgIE1pY3JvTW9kYWwuc2hvdygnZ29vZHZlcmlmaWNhdGlvbi1tb2RhbCcse1xuICAgICAgICAgICAgZGVidWdNb2RlOiB0cnVlLFxuICAgICAgICAgICAgYXdhaXRDbG9zZUFuaW1hdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgIG9uU2hvdzogbW9kYWwgPT4gY29uc29sZS5pbmZvKGAke21vZGFsLmlkfSBpcyBzaG93bmApLFxuICAgICAgICAgICAgb25DbG9zZTogbW9kYWwgPT4gY29uc29sZS5pbmZvKGAke21vZGFsLmlkfSBpcyBoaWRkZW5gKSwgXG4gICAgICAgIH0pXG4gICAgICAgIC8qIFxuICAgICAgICBpZighdGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgdGhpcy5tb2RhbCA9IG5ldyB0aW5nbGUubW9kYWwoe1xuICAgICAgICAgICAgICAgIGZvb3RlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdGlja3lGb290ZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNsb3NlTWV0aG9kczogWydidXR0b24nXSwgLy8gWydvdmVybGF5JywgJ2J1dHRvbicsICdlc2NhcGUnXSxcbiAgICAgICAgICAgICAgICBjbG9zZUxhYmVsOiBcIkNsb3NlXCIsXG4gICAgICAgICAgICAgICAgLy9jc3NDbGFzczogWydjdXN0b20tY2xhc3MtMScsICdjdXN0b20tY2xhc3MtMiddLFxuICAgICAgICAgICAgICAgIG9uT3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtb2RhbCBvcGVuJylcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbW9kYWwgY2xvc2VkJylcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJlZm9yZUNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaGVyZSdzIGdvZXMgc29tZSBsb2dpY1xuICAgICAgICAgICAgICAgICAgICAvLyBlLmcuIHNhdmUgY29udGVudCBiZWZvcmUgY2xvc2luZyB0aGUgbW9kYWxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWUgLy8gY2xvc2UgdGhlIG1vZGFsXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGZhbHNlOyAvLyBub3RoaW5nIGhhcHBlbnNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5tb2RhbC5hZGRGb290ZXJCdG4oJ0NhbmNlbCcsICd0aW5nbGUtYnRuJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGhlcmUgZ29lcyBzb21lIGxvZ2ljXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbC5jbG9zZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLm1vZGFsLmFkZEZvb3RlckJ0bignU2VuZCBDaGFsbGVuZ2UgRW1haWwnLCAndGluZ2xlLWJ0biB0aW5nbGUtYnRuLS1wcmltYXJ5JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGhlcmUgZ29lcyBzb21lIGxvZ2ljXG4gICAgICAgICAgICAgICAgaWYodGhpcy5lbWFpbF9maWVsZC52YWx1ZSAhPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29vZHZlcmlmaWNhdGlvbl9jaGFsbGVuZ2VfYWRkcmVzcycpLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIkZpZWxkIHZhbHVlOiBcIit0aGlzLmVtYWlsX2ZpZWxkLnZhbHVlK1wiICwgY2hhbGxlbmdlX2FkZHJlc3M6IFwiK2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb29kdmVyaWZpY2F0aW9uX2NoYWxsZW5nZV9hZGRyZXNzJykudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWwuc2V0Q29udGVudChcIkVtYWlsIGRvZXNuJ3QgbWF0Y2ggZmllbGQgb24gZm9ybSFcIilcbiAgICAgICAgICAgICAgICAgICAgLy9jYW4gd2UgeWFuayB0aGUgJ3N1Ym1pdCcgYnV0dG9uPyBGSVhNRSFcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbGxlbmdlKHRoaXMuZW1haWxfZmllbGQudmFsdWUsY2hhbGxlbmdlX2tleSwgKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbG9nLmRlYnVnKFwiQ2hhbGxlbmdlIHJlc3VsdHMgYXJlOiBcIityZXN1bHRzKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihyZXN1bHRzKVxuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRzLnN0YXR1cyA9PSBcIkFDQ0VQVEVEXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWwuc2V0Q29udGVudChcIklucHV0IGVtYWlsZWQgUElOOiA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2dvb2R2ZXJpZmljYXRpb25fcGluJyAvPlwiKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvL3RoaXMubW9kYWwuY2xvc2UoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGFsLnNldENvbnRlbnQoXCJUb28gbWFueSB2ZXJpZmljYXRpb25zIGZyb20gdGhpcyBJUC4gV2UgbmVlZCB0byBzZW5kIHlvdSBhbiBlbWFpbCB0byB2ZXJpZnkgdGhhdCB5b3UgYXJlIHlvdSEgXCIrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiSWYgeW91IGFncmVlLCByZS10eXBlIHlvdXIgZW1haWwgaGVyZTogPGlucHV0IHR5cGU9J3RleHQnIGlkPSdnb29kdmVyaWZpY2F0aW9uX2NoYWxsZW5nZV9hZGRyZXNzJyAvPlwiKVxuICAgICAgICB0aGlzLm1vZGFsLm9wZW4oKVxuICAgICAgICAqL1xuICAgIH1cblxuICAgIG9uc3VibWl0X2hhbmRsZXIoZXZlbnQpIHtcbiAgICAgICAgRE9fU09NRVRISU5HX0NMRVZFUkVSKClcbiAgICAgICAgSlNPTlAoXCJ1cmxcIilcbiAgICB9XG5cbiAgICB2ZXJpZnkoZW1haWwsIGNhbGxiYWNrKSB7XG4gICAgICAgIEpTT05QKHt1cmw6IEhPU1QrXCIvdmVyaWZ5XCIsXG4gICAgICAgICAgICBkYXRhOiB7ZW1haWw6IGVtYWlsLCBmb3JtX2tleTogdGhpcy5mb3JtX2tleX0sIFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZihkYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZy5lcnJvcihkYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNoYWxsZW5nZShlbWFpbCwgY2hhbGxlbmdlX2tleSwgY2FsbGJhY2spIHtcbiAgICAgICAgSlNPTlAoe3VybDogSE9TVCtcIi9jaGFsbGVuZ2VcIixcbiAgICAgICAgICAgIGRhdGE6IHtlbWFpbDogZW1haWwsIGZvcm1fa2V5OiB0aGlzLmZvcm1fa2V5LCBjaGFsbGVuZ2Vfa2V5OiBjaGFsbGVuZ2Vfa2V5fSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSlcbiAgICAgICAgICAgICAgICAvLyBzd2l0Y2goZGF0YS5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgY2FzZSBcIkdPT0RcIjpcblxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXNwb25zZShlbWFpbCwgY2hhbGxlbmdlX2tleSwgcGluLCBjYWxsYmFjaykge1xuICAgICAgICBKU09OUCh7dXJsOiBIT1NUK1wiL3Jlc3BvbnNlXCIsXG4gICAgICAgICAgICBkYXRhOiB7ZW1haWw6IGVtYWlsLCBjaGFsbGVuZ2Vfa2V5OiBjaGFsbGVuZ2Vfa2V5LCBwaW46IHBpbiwgZm9ybV9rZXk6IHRoaXMuZm9ybV9rZXl9LFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLm15dG9vbHRpcCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm15dG9vbHRpcC5oaWRlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVfc3VibWl0cygpXG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKVxuICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59IiwiaW1wb3J0IGxvZyBmcm9tIFwiLi9sb2dnaW5nXCJcbmltcG9ydCBGb3JtIGZyb20gXCIuL2Zvcm1cIlxuLy9pbXBvcnQgYXNzaWduIGZyb20gXCJjb3JlLWpzLXB1cmUvZXMvb2JqZWN0L2Fzc2lnblwiXG5pbXBvcnQgeyBkdXBsaWNhdGUgfSBmcm9tIFwiLi91dGlscy5qc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmb3JtX2tleSxvcHRpb25zKSB7XG4gICAgaWYoIWZvcm1fa2V5KSB7XG4gICAgICAgIGxvZy5lcnJvcihcIkZvcm0ga2V5IHdhcyBub3Qgc2V0XCIpXG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQgbXlfb3B0aW9uc1xuICAgIGlmKG9wdGlvbnMpIHtcbiAgICAgICAgbXlfb3B0aW9ucz1kdXBsaWNhdGUob3B0aW9ucyk7XG4gICAgICAgIG15X29wdGlvbnMuZm9ybV9rZXkgPSBmb3JtX2tleVxuICAgIH0gZWxzZSB7XG4gICAgICAgIG15X29wdGlvbnM9e2Zvcm1fa2V5OiBmb3JtX2tleX1cbiAgICB9XG4gICAgaWYobXlfb3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICBsb2cuZGVidWdfZW5hYmxlZCA9IG15X29wdGlvbnMuZGVidWcgLy9GSVhNRSB0aGlzIGlzIGFscmVhZHkgaGFuZGxlZCBpbiBpbmRleC5qcywgdGhpcyBpcyBzdXBlcmZsdW91c1xuICAgICAgICBkZWxldGUgbXlfb3B0aW9ucy5kZWJ1ZyAvL2Rvbid0IHdhbnQgdG8ga2VlcCBwYXNzaW5nIHRoaXMgZG93biB0byBlYWNoIFZlcmlmeVxuICAgIH1cbiAgICBsZXQgYWN0aXZhdGVkX2Zvcm1zPVtdXG4gICAgZm9yKGxldCBmb3JtIGluIGRvY3VtZW50LmZvcm1zKSB7IC8vb2xkZS1za29vbGUgRE9NMCBGVFchXG4gICAgICAgIGxvZy5kZWJ1ZyhcIkNoZWNraW5nIGZvcm06IFwiK2Zvcm0rXCIgZm9yIHZlcmlmaWFibGUgZW1haWwgYWRkcmVzcyBmaWVsZHMuLi5cIilcbiAgICAgICAgZm9yKGxldCBlbGVtZW50IGluIGRvY3VtZW50LmZvcm1zW2Zvcm1dLmVsZW1lbnRzKSB7IC8vIEZJWE1FIEkgdGhpbmsgdGhpcyBpdGVyYXRlcyBuYW1lcyAqQU5EKiBudW1iZXJzXG4gICAgICAgICAgICBsb2cuZGVidWcoXCJDaGVja2luZyBmaWVsZCAjXCIrZWxlbWVudCtcIiB0byBzZWUgaWYgaXQncyBhbiBlbWFpbCBhZGRyZXNzIGZpZWxkXCIpXG4gICAgICAgICAgICBsZXQgdGhpc19maWVsZCA9IGRvY3VtZW50LmZvcm1zW2Zvcm1dLmVsZW1lbnRzW2VsZW1lbnRdXG4gICAgICAgICAgICBpZih0aGlzX2ZpZWxkLnR5cGUgPT0gXCJlbWFpbFwiIHx8IHRoaXNfZmllbGQubmFtZSA9PSBcImVtYWlsXCIgfHwgdGhpc19maWVsZC5pZCA9PSBcImVtYWlsXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uc19jb3B5ID0gZHVwbGljYXRlKG15X29wdGlvbnMpXG4gICAgICAgICAgICAgICAgbG9nLmRlYnVnKFwiRm91bmQgY2FuZGlkYXRlIGZpZWxkLiBOYW1lOiBcIit0aGlzX2ZpZWxkLm5hbWUrXCIgVHlwZTogXCIrdGhpc19maWVsZC50eXBlK1wiIElEOiBcIit0aGlzX2ZpZWxkLmlkKVxuICAgICAgICAgICAgICAgIG9wdGlvbnNfY29weS5mb3JtID0gZG9jdW1lbnQuZm9ybXNbZm9ybV1cbiAgICAgICAgICAgICAgICBvcHRpb25zX2NvcHkuZW1haWxfZmllbGQgPSB0aGlzX2ZpZWxkXG4gICAgICAgICAgICAgICAgYWN0aXZhdGVkX2Zvcm1zLnB1c2gobmV3IEZvcm0ob3B0aW9uc19jb3B5KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYWN0aXZhdGVkX2Zvcm1zXG59IiwiaW1wb3J0IGF1dG8gZnJvbSBcIi4vYXV0b1wiXG5pbXBvcnQgbG9nIGZyb20gXCIuL2xvZ2dpbmdcIlxuaW1wb3J0IEZvcm0gZnJvbSBcIi4vZm9ybVwiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmb3JtX2tleSwgb3B0aW9ucykge1xuICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICBsb2cuZGVidWdfZW5hYmxlZCA9IG9wdGlvbnMuZGVidWdcbiAgICB9XG4gICAgaWYoIWZvcm1fa2V5KSB7XG4gICAgICAgIGxvZy5lcnJvcihcIkZvcm0ga2V5IHdhcyBub3Qgc2V0XCIpXG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZighb3B0aW9ucyB8fCAoIW9wdGlvbnMuZW1haWxfZmllbGQgJiYgIW9wdGlvbnMubWFudWFsKSkge1xuICAgICAgICByZXR1cm4gYXV0byhmb3JtX2tleSwgb3B0aW9ucylcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBGb3JtKGZvcm1fa2V5LCBvcHRpb25zKVxufSJdLCJuYW1lcyI6WyJsZXQiLCJ0aGlzIiwiYXJndW1lbnRzIiwiaXNGdW5jdGlvbiIsImNsYXNzQ2FsbENoZWNrIiwiY3JlYXRlQ2xhc3MiLCJfZXh0ZW5kcyIsImNvbnN0IiwiSlNPTlAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBQUEsSUFBTSxHQUFHLEdBQ0wsWUFBVyxDQUFDLGFBQXFCLEVBQUU7cURBQVYsR0FBRzs7UUFDeEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxjQUFhO0lBQ3RDLEVBQUM7O0lBRUwsY0FBSSx3QkFBTSxHQUFHLEVBQUU7UUFDWCxHQUFPLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDaEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFDO1NBQzlCO0lBQ0wsRUFBQzs7SUFFTCxjQUFJLHdCQUFNLEdBQUcsRUFBRTtRQUNQLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNuQixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUM7U0FDakM7SUFDTCxFQUFDOztJQUVMLGNBQUksOEJBQVMsR0FBRyxFQUFFO1FBQ1YsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBQztTQUMvQjtJQUNMLEVBQUM7O0lBRUwsY0FBSSxzQ0FBYSxLQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFDO1lBQ25CLE9BQU8sSUFBSTtTQUNkO1FBQ0QsT0FBTyxLQUFLO0lBQ2hCLENBQUMsQ0FDSjs7SUFFRCxJQUFJLEdBQUcsR0FB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
