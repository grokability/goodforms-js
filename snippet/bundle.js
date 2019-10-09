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

    function is_function(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
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

    var css = "/**************************\\\n  Basic Modal Styles\n\\**************************/\n\n/*\n.modal {\n  display: none;\n}\n\n.modal.is-open {\n  display: block;\n} */\n\n\n.modal {\n    font-family: -apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica neue,helvetica,ubuntu,roboto,noto,segoe ui,arial,sans-serif;\n  }\n  \n  .modal__overlay {\n    position: fixed;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: rgba(0,0,0,0.6);\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  \n  .modal__container {\n    background-color: #fff;\n    padding: 30px;\n    max-width: 500px;\n    max-height: 100vh;\n    border-radius: 4px;\n    overflow-y: auto;\n    box-sizing: border-box;\n  }\n  \n  .modal__header {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n  }\n  \n  .modal__title {\n    margin-top: 0;\n    margin-bottom: 0;\n    font-weight: 600;\n    font-size: 1.25rem;\n    line-height: 1.25;\n    color: #00449e;\n    box-sizing: border-box;\n  }\n  \n  .modal__close {\n    background: transparent;\n    border: 0;\n  }\n  \n  .modal__header .modal__close:before { content: \"\\2715\"; }\n  \n  .modal__content {\n    margin-top: 2rem;\n    margin-bottom: 2rem;\n    line-height: 1.5;\n    color: rgba(0,0,0,.8);\n  }\n  \n  .modal__btn {\n    font-size: .875rem;\n    padding-left: 1rem;\n    padding-right: 1rem;\n    padding-top: .5rem;\n    padding-bottom: .5rem;\n    background-color: #e6e6e6;\n    color: rgba(0,0,0,.8);\n    border-radius: .25rem;\n    border-style: none;\n    border-width: 0;\n    cursor: pointer;\n    -webkit-appearance: button;\n    text-transform: none;\n    overflow: visible;\n    line-height: 1.15;\n    margin: 0;\n    will-change: transform;\n    -moz-osx-font-smoothing: grayscale;\n    -webkit-backface-visibility: hidden;\n    backface-visibility: hidden;\n    -webkit-transform: translateZ(0);\n    transform: translateZ(0);\n    transition: -webkit-transform .25s ease-out;\n    transition: transform .25s ease-out;\n    transition: transform .25s ease-out,-webkit-transform .25s ease-out;\n  }\n  \n  .modal__btn:focus, .modal__btn:hover {\n    -webkit-transform: scale(1.05);\n    transform: scale(1.05);\n  }\n  \n  .modal__btn-primary {\n    background-color: #00449e;\n    color: #fff;\n  }\n  \n  \n  \n  /**************************\\\n    Demo Animation Style\n  \\**************************/\n  @keyframes mmfadeIn {\n      from { opacity: 0; }\n        to { opacity: 1; }\n  }\n  \n  @keyframes mmfadeOut {\n      from { opacity: 1; }\n        to { opacity: 0; }\n  }\n  \n  @keyframes mmslideIn {\n    from { transform: translateY(15%); }\n      to { transform: translateY(0); }\n  }\n  \n  @keyframes mmslideOut {\n      from { transform: translateY(0); }\n      to { transform: translateY(-10%); }\n  }\n  \n  .micromodal-slide {\n    display: none;\n  }\n  \n  .micromodal-slide.is-open {\n    display: block;\n  }\n  \n  .micromodal-slide[aria-hidden=\"false\"] .modal__overlay {\n    animation: mmfadeIn .3s cubic-bezier(0.0, 0.0, 0.2, 1);\n  }\n  \n  .micromodal-slide[aria-hidden=\"false\"] .modal__container {\n    animation: mmslideIn .3s cubic-bezier(0, 0, .2, 1);\n  }\n  \n  .micromodal-slide[aria-hidden=\"true\"] .modal__overlay {\n    animation: mmfadeOut .3s cubic-bezier(0.0, 0.0, 0.2, 1);\n  }\n  \n  .micromodal-slide[aria-hidden=\"true\"] .modal__container {\n    animation: mmslideOut .3s cubic-bezier(0, 0, .2, 1);\n  }\n  \n  .micromodal-slide .modal__container,\n  .micromodal-slide .modal__overlay {\n    will-change: transform;\n  }\n  ";

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

    var css$1 = ".popper,\n.tooltip {\n    position: absolute;\n    background: #FFC107;\n    color: black;\n    width: 150px;\n    border-radius: 3px;\n    box-shadow: 0 0 2px rgba(0,0,0,0.5);\n    padding: 10px;\n    text-align: center;\n}\n.style5 .tooltip {\n    background: #1E252B;\n    color: #FFFFFF;\n    max-width: 200px;\n    width: auto;\n    font-size: .8rem;\n    padding: .5em 1em;\n}\n.popper .popper__arrow,\n.tooltip .tooltip-arrow {\n    width: 0;\n    height: 0;\n    border-style: solid;\n    position: absolute;\n    margin: 5px;\n}\n\n.tooltip .tooltip-arrow,\n.popper .popper__arrow {\n    border-color: #FFC107;\n}\n.style5 .tooltip .tooltip-arrow {\n    border-color: #1E252B;\n}\n.popper[x-placement^=\"top\"],\n.tooltip[x-placement^=\"top\"] {\n    margin-bottom: 5px;\n}\n.popper[x-placement^=\"top\"] .popper__arrow,\n.tooltip[x-placement^=\"top\"] .tooltip-arrow {\n    border-width: 5px 5px 0 5px;\n    border-left-color: transparent;\n    border-right-color: transparent;\n    border-bottom-color: transparent;\n    bottom: -5px;\n    left: calc(50% - 5px);\n    margin-top: 0;\n    margin-bottom: 0;\n}\n.popper[x-placement^=\"bottom\"],\n.tooltip[x-placement^=\"bottom\"] {\n    margin-top: 5px;\n}\n.tooltip[x-placement^=\"bottom\"] .tooltip-arrow,\n.popper[x-placement^=\"bottom\"] .popper__arrow {\n    border-width: 0 5px 5px 5px;\n    border-left-color: transparent;\n    border-right-color: transparent;\n    border-top-color: transparent;\n    top: -5px;\n    left: calc(50% - 5px);\n    margin-top: 0;\n    margin-bottom: 0;\n}\n.tooltip[x-placement^=\"right\"],\n.popper[x-placement^=\"right\"] {\n    margin-left: 5px;\n}\n.popper[x-placement^=\"right\"] .popper__arrow,\n.tooltip[x-placement^=\"right\"] .tooltip-arrow {\n    border-width: 5px 5px 5px 0;\n    border-left-color: transparent;\n    border-top-color: transparent;\n    border-bottom-color: transparent;\n    left: -5px;\n    top: calc(50% - 5px);\n    margin-left: 0;\n    margin-right: 0;\n}\n.popper[x-placement^=\"left\"],\n.tooltip[x-placement^=\"left\"] {\n    margin-right: 5px;\n}\n.popper[x-placement^=\"left\"] .popper__arrow,\n.tooltip[x-placement^=\"left\"] .tooltip-arrow {\n    border-width: 5px 0 5px 5px;\n    border-top-color: transparent;\n    border-right-color: transparent;\n    border-bottom-color: transparent;\n    right: -5px;\n    top: calc(50% - 5px);\n    margin-left: 0;\n    margin-right: 0;\n}";

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

    function update_hidden_fields(form, checksum, status) {
        insert_or_update_hidden('goodverification_checksum','goodverification_checksum',checksum, form);
        insert_or_update_hidden('goodverification_status','goodverification_status',status, form);
    }

    var insert_or_update_hidden = function (name,id,value, form) {
        var element = document.getElementById(id);
        if(element) {
            element.value = value;
            return
        }
        form.appendChild(node_creator('input', {'type': 'hidden','name': name,'value': value,'id': id}));
    };

    // IDEA

    /* **************************************************
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
    **************************************************/

    // NOTES 

    /***************

    This is the HTML that we need to insert right before the close-body tag. How in the hell will we do that?!
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
    ********************************/

    var modal = function modal(email_field) {
        this.modal = null;
        this.css = false;
        this.email_field = email_field;
    };

    modal.prototype.show = function show (challenge_key, button_callback) {
        if(!this.css) {
            styleInject(css, {insertAt: 'top'}); //insert at top so customer-generated styles will override
            this.css = true; //TODO - on a page with many forms, the CSS will be re-inserted multiple times
        }
        this.get_modal(challenge_key);
        this.set_modal_action(button_callback);
        this.display_challenge_modal(challenge_key);
    };

    modal.prototype.hide = function hide () {
        if(this.modal) {
            MicroModal.close('goodverification-modal');
            //should we dispose of it as well? It could be junking up their DOM I guess?
            document.body.removeChild(this.modal);
            this.modal = null;
        }
    };

    modal.prototype.set_modal_action = function set_modal_action (callback) {
        this.button.onclick = callback;
    };

    modal.prototype.get_challenge_address = function get_challenge_address () {
        return document.getElementById('goodverification_challenge_address').value
    };

    modal.prototype.get_pin_code = function get_pin_code () {
        return document.getElementById('goodverification_pin').value 
    };

    modal.prototype.get_modal = function get_modal (challenge_key) { //TODO - this needs breaking up, it's a little rambly
        log.debug("Getting modal - challenge key is: "+challenge_key);
        if(!this.modal) {

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
            "If you agree, re-type your email here: "); //TODO - internationalize!
            var input = node_creator("input", {"type": "text","id": "goodverification_challenge_address"});
            content.appendChild(input);

            var footer = node_creator("footer", {"class":"modal__footer"});
            var button = node_creator("button", {"class":"modal__btn modal__btn-primary"},"Continue");
            this.button = button; //to make it easier to attach an onclick handler
            footer.appendChild(button);
            footer.appendChild(node_creator("button",{"class": "modal__btn","data-micromodal-close": "","aria-label":"Close this dialog window"},"Close")); //FIXME - internationalize!

            container.appendChild(header);
            container.appendChild(content);
            container.appendChild(footer);

            overlay.appendChild(container);
            modal.appendChild(overlay);

            document.body.appendChild(modal);
            this.modal = modal;
        }
        return this.modal
    };

    modal.prototype.display_challenge_modal = function display_challenge_modal (challenge_key) {
        this.get_modal(challenge_key);
        MicroModal.show('goodverification-modal',{
            debugMode: true,
            awaitCloseAnimation: true,
            onShow: function (modal) { return console.info(((modal.id) + " is shown")); },
            onClose: function (modal) { return console.info(((modal.id) + " is hidden")); }, 
        });
    };

    modal.prototype.bad_address = function bad_address () {
        document.getElementById("modal-1-content").innerHTML = "Email doesn't match field on form!"; //FIXME - don't use innerHTML
    };

    modal.prototype.pin_input = function pin_input () {
        document.getElementById("modal-1-content").innerHTML = "Input emailed PIN: <input type='text' id='goodverification_pin' />"; // FIXME - don't use innerHTML?
    };

    //FIXME - not used anymore.
    modal.prototype.display_deprecated_tingle_modal = function display_deprecated_tingle_modal (challenge_key) {
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

    var tooltip = function tooltip(email_field) {
        this.tooltip = null;
        this.email_field = email_field;
        this.css = false; //TODO - could get inserted multiple times. We can write our own style injector if needed and put it in with an 'id' maybe?
    };

    tooltip.prototype.show = function show (msg) {
        if(!this.css) {
            styleInject(css$1, {insertAt: 'top'}); //deliberately insert at top so customer styles may override
            this.css = true;
        }
        if(!this.tooltip) {
            this.tooltip = new Tooltip(this.email_field, {placement: 'bottom', title: msg, trigger: 'manual'});
        } else {
            this.tooltip.updateTitleContent(msg);
        }
        this.tooltip.show();
    };

    tooltip.prototype.hide = function hide () {
        if(this.tooltip) {
            this.tooltip.hide();
            //should we 'destroy' it? if so that's this.tooltip.dispose()
        }
    };

    // import { domainToUnicode } from "url"
    // import { stringify } from "querystring"

    /************
     * The intention here is that we won't put any GUI stuff in here at all.
     * We *will* modify things in the DOM, and append event handlers, and
     * whatever else needs to happen, but anything that affects display will be
     * in visuals.js
     */

    var options_hash = {
        form_key:  "string",
        manual: "boolean",
        email_field: "DOMNode",
        form: "DOMNode",
        submit_button: "DOMNodeOrArrayOfDOMNodes",
        debug: "boolean",
        onGood: "function",
        onBad: "function",
        onChallenge: "function",
        onError: "function",
        manual: "boolean"
    }; // css" (not yet?)

    var Form = function Form(options) {
        log.debug("Invoking Class constructor!");
            
        for(var key in options) {
            log.debug("Setting: "+key+" to "+options[key]);
            //this[key] = options[key] //this will initialize all the callbacks, btw. Even if 'manual' is turned on! Do we...want that? TODO
            if(!this.unwrap_assign(key, options[key])) {
                //bail out if any options weren't assignable
                return false
            }
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
        if(!this.form) { //TODO - allow 'false' here (not null/undefined?) to permit no-form?
            return log.error("Could not determine Form!")
        }
        if(!this.submit_button) { //TODO - allow 'false' here (not null/undefined?) to permit no-buttons?
            log.debug("Trying to find submit buttons...");
            var submit_buttons=[];
            for(var i=0; i< this.form.elements.length; i++) {
                var element = this.form.elements[i];
                log.debug("Checking element: "+element+" - nodeName: '"+element.nodeName+"' Type: '"+element.type+"'");
                if((element.nodeName == "INPUT" && element.type =="submit") || (element.nodeName == "BUTTON" && element.type != "reset" && element.type != "button")) {
                    log.debug("Found a submit button");
                    submit_buttons.push(element);
                }
            }
            this.submit_button = submit_buttons;
        }
        this.initialize_dom();
        //initialize tooltip and modal here?
        this.tooltip = new tooltip(this.email_field);
        this.modal = new modal(this.email_field);
        this.submittable = false;
    };

    Form.prototype.unwrap_assign = function unwrap_assign (name, element) {
        if(!options_hash[name]) {
            log.error("Unknown option: "+name+" - aborting");
            return false
        }
        switch(options_hash[name]) {
            case "DOMNode":
                return this.unwrap_domnode(name,element,false)
                break

            case "DOMNodeOrMultipleDOMNodes":
                return this.unwrap_domnode(name,element,true)
                break
                
            default:
                if(typeof element == options_hash[name]) {
                    this[name] = element;
                    return true
                } else {
                    log.error("Unknown type for parameter: "+name+" (wanted: "+options_hash[name]+")");
                    return false
                }
        }
    };

    Form.prototype.unwrap_domnode = function unwrap_domnode (name, element, multiple)  {
        // if it's a jquery element, return the real DOM element underneath.
        // if it's still bad, error.
        if(typeof(element) === 'object' && element['jquery'] && element['get']) {
            log.debug("jQuery-like object found for "+name);
            if(element.length == 0 ) {
                log.error("No elements found in jQuery selector for "+name);
                return false
            }
            if(element.length > 1) {
                if(!multiple) {
                    log.error("Too many elements found in jQuery selector for "+name+" (count: "+element.length+")");
                    return false
                }
                //multiples allowed
                var unwrapped = [];
                for(var i=0 ; i < element.length; i++) {
                    unwrapped.push(element[i]);
                }
                this[name] = unwrapped;
                return true
            }
            this[name] = element.get(0);
            return true
        }
        if(typeof(element) === "string") {
            var node = document.getElementById(element);
            if(!node) {
                log.error("No element with id "+element+" found for "+name);
                return false
            }
            this[name] = node;
            return true
        }
        if(element instanceof Element) {
            this[name] = element;
            return true
        }
        if(is_array(element)) {
            for(var i$1 = 0 ; i$1 < element.length ; i$1++) {
                if(!(element[i$1] instanceof Element)) {
                    log.error("Array for "+name+" contains non-DOM element at index "+i$1);
                    return false
                }
            }
            this[name] = element;
            return true
        }
        log.error("Unknown element type passed for "+name+": "+typeof(element));
        return false
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
                log.debug("On Submit handler firing!");
                var results;
                if(old_onsubmit) {
                    results = old_onsubmit(event); //FIXME - confusing, *their* old onsubmit handler fires *first*?
                }                               // Well, it could make sense - if you wanted to do something to interrupt the verification, you could?
                if(!old_onsubmit || results) {
                    return this$1.onsubmit_handler(event)
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

    Form.prototype.fire_hooks = function fire_hooks (name, callback) {
        log.debug("Firing hooks for: "+name);
        if(this.manual) {
            return
        }

        if(!this[name]) {
            //no hooks; go ahead and do the default stuff from 'callback'
            return callback()
        }
        var result = this[name]();
        if(result === false) { //NEGATIVE RESULT from pre-callback - do *NOT* invoke callback!
            return
        }
        if(result === true) { //TRUE RESULT - continue normal behavior
            return callback()
        }
        if(is_function(result)) {
            return result(callback) //deferred...
        }
        log.error("Unknown type returned from handler '"+name+"' - "+(typeof result));
    };

    Form.prototype.onchange_handler = function onchange_handler (event) {
        this.submittable = false; //field has changed; not submittable until this returns!
        this.verifying = this.email_field.value;
        //FIXME - should we set an 'in-flight' variable, so we know not to double-verify?
        this.verify(this.email_field.value, function (results) {
            log.debug("Verification results are: ");
            log.debugdir(results);
            //so weird, but the 'verify' method fires all the appropriate callbacks, so we don't do anything here?
        });
    };

    Form.prototype.onbad_handler = function onbad_handler () {
            var this$1 = this;

        this.fire_hooks('onBad',function () {
            this$1.submittable = false;
            this$1.tooltip.show('Bad Email Address'); //TODO - internationalize based on API response?
            this$1.disable_submits();    
        });
    };

    Form.prototype.ongood_handler = function ongood_handler (status, checksum) {
            var this$1 = this;

        this.fire_hooks('onGood',function () {
            this$1.submittable = true;
            this$1.tooltip.hide();
            update_hidden_fields(this$1.form, checksum, status);
            this$1.enable_submits();
        });
    };

    Form.prototype.onchallenge_handler = function onchallenge_handler (challenge_key) {
            var this$1 = this;

        this.fire_hooks('onChallenge',function () {
            this$1.submittable = false;
            ///uh....throw up a prompt?
            this$1.modal.show(challenge_key, function () {
                if(this$1.email_field.value != this$1.modal.get_challenge_address()) { 
                    log.debug("Field value: "+this$1.email_field.value+" , challenge_address: "+this$1.modal.get_challenge_address());
                    this$1.modal.bad_address();
                                                                                                                //TODO - interntaionalize!
                    return
                }
                this$1.challenge(this$1.email_field.value,challenge_key, function (results) {
                    log.debug("Challenge results are: ");
                    log.debugdir(results);
                    if(results.status == "ACCEPTED") {
                        this$1.modal.pin_input();
                        this$1.modal.set_modal_action( function () {
                            var pin =this$1.modal.get_pin_code();
                            this$1.response(this$1.email_field.value,challenge_key, pin, function (response) {
                                log.debugdir(response);
                                if(response.status == "GOOD") {
                                    this$1.modal. hide();
                                    update_hidden_fields(this$1.form, response.checksum, response.status);
                                    this$1.enable_submits();
                                }
                            });
                        });
                    } else {
                        window.alert("Challenge rejected!"); //FIXME - should never happen tho!
                    }
                });
            }
    );
        });
    };

    Form.prototype.onerror_handler = function onerror_handler () {
        this.fire_hooks('onError',function () {
            log.debug("Error detected?");
        });
    };

    Form.prototype.onsubmit_handler = function onsubmit_handler (event) {
            var this$1 = this;

        //customer's hooks have already fired, let's go!
        //the additional check against the contents of the field are just in case some
        //browsers aren't quite so religious about running onChange handlers before onSubmit
        if(this.submittable && this.email_field.value === this.verifying) {
            return true
        }
        if(this.email_field.value !== this.verifying) {
            this.verify(this.email_field.value, function (results) {  //FIXME - this could double-verify!
                if(this$1.submittable) { //don't directly inspect 'results', assume the onBlah handlers will update 'submittable'
                    this$1.form.submit();
                }
            });
        }
        return false //the 'verify' callback above will actually do the work of submitting the form
    };

    // LOW-LEVEL JSON helpers
    // but also, helpers that *we* use - so should they be invoking our callbacks for us?
    // maybe yes only if manual is false?

    Form.prototype.verify = function verify (email, callback) {
            var this$1 = this;

        jsonp({url: HOST+"/verify",
            data: {email: email, form_key: this.form_key}, 
            success: function (data) {
                if(data.error) {
                    log.error(data.error);
                }
                switch(data.status) {
                    case "BAD":
                    this$1.onbad_handler();
                    break
        
                    case "GOOD":
                    this$1.ongood_handler(data.status, data.checksum); //status is the wrong thing here.
                    break
        
                    case "CHALLENGE":
                    this$1.onchallenge_handler(data.challenge_key);
                    break
        
                    default:
                    log.error("UNKNOWN STATUS: "+data.status); //error here?
                    this$1.onerror_handler();
                }
                if(callback) { //TODO - should callback fire *first*, or *last*?
                    //I kinda feel like all the 'manual' stuff will use this, but nothing else will.
                    //oh, I take that back - if you try and submit the form and it hasn't been validated; then _that_
                    // verification will use this!
                    callback(data);
                }
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
                if(this$1.mytooltip) { //FIXME - instead invoke the onchange callback thing?
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
        for(var form = 0 ; form < document.forms.length ; form++ ) { //olde-skoole DOM0 FTW!
            log.debug("Checking form: "+form+" for verifiable email address fields...");
            for(var i = 0; i < document.forms[form].elements.length ; i ++ ) {
                log.debug("Checking field #"+i+" to see if it's an email address field");
                var this_field = document.forms[form].elements[i];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJsb2dnaW5nLmpzIiwidXRpbHMuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1qc29ucC9saWIvanNvbnAuanMiLCJub2RlX21vZHVsZXMvbWljcm9tb2RhbC9kaXN0L21pY3JvbW9kYWwuZXMuanMiLCJub2RlX21vZHVsZXMvcG9wcGVyLmpzL2Rpc3QvZXNtL3BvcHBlci5qcyIsIm5vZGVfbW9kdWxlcy90b29sdGlwLmpzL2Rpc3QvZXNtL3Rvb2x0aXAuanMiLCJub2RlX21vZHVsZXMvc3R5bGUtaW5qZWN0L2Rpc3Qvc3R5bGUtaW5qZWN0LmVzLmpzIiwidmlzdWFscy5qcyIsImZvcm0uanMiLCJhdXRvLmpzIiwiaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgTG9nIHtcbiAgICBjb25zdHJ1Y3RvcihkZWJ1Z19lbmFibGVkID0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5kZWJ1Z19lbmFibGVkID0gZGVidWdfZW5hYmxlZFxuICAgIH1cblxuICAgIGVycm9yKG1zZykge1xuICAgICAgICBpZighdGhpcy5sb2dfYXRfbGV2ZWwoJ2Vycm9yJyxtc2cpKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWxlcnQoXCJFcnJvcjogXCIrbXNnKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVidWcobXNnKSB7XG4gICAgICAgIGlmKHRoaXMuZGVidWdfZW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5sb2dfYXRfbGV2ZWwoJ2RlYnVnJyxtc2cpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWJ1Z2Rpcihtc2cpIHtcbiAgICAgICAgaWYodGhpcy5kZWJ1Z19lbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ19hdF9sZXZlbCgnZGlyJyxtc2cpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBsb2dfYXRfbGV2ZWwobGV2ZWwsbXNnKSB7XG4gICAgICAgIGlmKGNvbnNvbGUgJiYgY29uc29sZVtsZXZlbF0pIHtcbiAgICAgICAgICAgIGNvbnNvbGVbbGV2ZWxdKG1zZylcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxufVxuXG52YXIgbG9nID0gbmV3IExvZygpXG5cblxuZXhwb3J0IGRlZmF1bHQgbG9nXG5cbi8vZGVidWcsaW5mbyx3YXJuLGVycm9yIiwiZXhwb3J0IGZ1bmN0aW9uIGR1cGxpY2F0ZSAob2JqKSB7XG4gICAgLy9uYWl2ZSwgc2luZ2xlLWxldmVsLCBub24tZGVlcCAnZHVwbGljYXRlJyBmdW5jdGlvbiBmb3Igb2JqZWN0c1xuICAgIGxldCBuZXdvYmo9e31cbiAgICBmb3IobGV0IGkgaW4gb2JqKSB7XG4gICAgICAgIG5ld29ialtpXSA9IG9ialtpXVxuICAgIH1cbiAgICByZXR1cm4gbmV3b2JqXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc19hcnJheShvYmopIHtcbiAgICAvLyBjb25zb2xlLndhcm4oXCJUaGUgcHJvdG90eXBlIHRoaW5nIGlzOiBcIitPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSlcbiAgICBpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PSBcIltvYmplY3QgQXJyYXldXCIpIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc19mdW5jdGlvbihmdW5jdGlvblRvQ2hlY2spIHtcbiAgICByZXR1cm4gZnVuY3Rpb25Ub0NoZWNrICYmIHt9LnRvU3RyaW5nLmNhbGwoZnVuY3Rpb25Ub0NoZWNrKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJ1xufSIsIihmdW5jdGlvbigpIHtcbiAgdmFyIEpTT05QLCBjb21wdXRlZFVybCwgY3JlYXRlRWxlbWVudCwgZW5jb2RlLCBub29wLCBvYmplY3RUb1VSSSwgcmFuZG9tLCByYW5kb21TdHJpbmc7XG5cbiAgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uKHRhZykge1xuICAgIHJldHVybiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICB9O1xuXG4gIGVuY29kZSA9IHdpbmRvdy5lbmNvZGVVUklDb21wb25lbnQ7XG5cbiAgcmFuZG9tID0gTWF0aC5yYW5kb207XG5cbiAgSlNPTlAgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIGNhbGxiYWNrLCBjYWxsYmFja0Z1bmMsIGNhbGxiYWNrTmFtZSwgZG9uZSwgaGVhZCwgcGFyYW1zLCBzY3JpcHQ7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBwYXJhbXMgPSB7XG4gICAgICBkYXRhOiBvcHRpb25zLmRhdGEgfHwge30sXG4gICAgICBlcnJvcjogb3B0aW9ucy5lcnJvciB8fCBub29wLFxuICAgICAgc3VjY2Vzczogb3B0aW9ucy5zdWNjZXNzIHx8IG5vb3AsXG4gICAgICBiZWZvcmVTZW5kOiBvcHRpb25zLmJlZm9yZVNlbmQgfHwgbm9vcCxcbiAgICAgIGNvbXBsZXRlOiBvcHRpb25zLmNvbXBsZXRlIHx8IG5vb3AsXG4gICAgICB1cmw6IG9wdGlvbnMudXJsIHx8ICcnXG4gICAgfTtcbiAgICBwYXJhbXMuY29tcHV0ZWRVcmwgPSBjb21wdXRlZFVybChwYXJhbXMpO1xuICAgIGlmIChwYXJhbXMudXJsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nVXJsJyk7XG4gICAgfVxuICAgIGRvbmUgPSBmYWxzZTtcbiAgICBpZiAocGFyYW1zLmJlZm9yZVNlbmQoe30sIHBhcmFtcykgIT09IGZhbHNlKSB7XG4gICAgICBjYWxsYmFja05hbWUgPSBvcHRpb25zLmNhbGxiYWNrTmFtZSB8fCAnY2FsbGJhY2snO1xuICAgICAgY2FsbGJhY2tGdW5jID0gb3B0aW9ucy5jYWxsYmFja0Z1bmMgfHwgJ2pzb25wXycgKyByYW5kb21TdHJpbmcoMTUpO1xuICAgICAgY2FsbGJhY2sgPSBwYXJhbXMuZGF0YVtjYWxsYmFja05hbWVdID0gY2FsbGJhY2tGdW5jO1xuICAgICAgd2luZG93W2NhbGxiYWNrXSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgd2luZG93W2NhbGxiYWNrXSA9IG51bGw7XG4gICAgICAgIHBhcmFtcy5zdWNjZXNzKGRhdGEsIHBhcmFtcyk7XG4gICAgICAgIHJldHVybiBwYXJhbXMuY29tcGxldGUoZGF0YSwgcGFyYW1zKTtcbiAgICAgIH07XG4gICAgICBzY3JpcHQgPSBjcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHNjcmlwdC5zcmMgPSBjb21wdXRlZFVybChwYXJhbXMpO1xuICAgICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICAgIHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIHBhcmFtcy5lcnJvcih7XG4gICAgICAgICAgdXJsOiBzY3JpcHQuc3JjLFxuICAgICAgICAgIGV2ZW50OiBldnRcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwYXJhbXMuY29tcGxldGUoe1xuICAgICAgICAgIHVybDogc2NyaXB0LnNyYyxcbiAgICAgICAgICBldmVudDogZXZ0XG4gICAgICAgIH0sIHBhcmFtcyk7XG4gICAgICB9O1xuICAgICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlZiwgcmVmMTtcbiAgICAgICAgaWYgKGRvbmUgfHwgKChyZWYgPSB0aGlzLnJlYWR5U3RhdGUpICE9PSAnbG9hZGVkJyAmJiByZWYgIT09ICdjb21wbGV0ZScpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICBpZiAoc2NyaXB0KSB7XG4gICAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgIGlmICgocmVmMSA9IHNjcmlwdC5wYXJlbnROb2RlKSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZWYxLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzY3JpcHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaGVhZCA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdIHx8IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICBoZWFkLmluc2VydEJlZm9yZShzY3JpcHQsIGhlYWQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBhYm9ydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvd1tjYWxsYmFja10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gd2luZG93W2NhbGxiYWNrXSA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICBpZiAoc2NyaXB0ICE9IG51bGwgPyBzY3JpcHQucGFyZW50Tm9kZSA6IHZvaWQgMCkge1xuICAgICAgICAgIHNjcmlwdC5vbmxvYWQgPSBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgIHJldHVybiBzY3JpcHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICBub29wID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfTtcblxuICBjb21wdXRlZFVybCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIHZhciB1cmw7XG4gICAgdXJsID0gcGFyYW1zLnVybDtcbiAgICB1cmwgKz0gcGFyYW1zLnVybC5pbmRleE9mKCc/JykgPCAwID8gJz8nIDogJyYnO1xuICAgIHVybCArPSBvYmplY3RUb1VSSShwYXJhbXMuZGF0YSk7XG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuICByYW5kb21TdHJpbmcgPSBmdW5jdGlvbihsZW5ndGgpIHtcbiAgICB2YXIgc3RyO1xuICAgIHN0ciA9ICcnO1xuICAgIHdoaWxlIChzdHIubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICBzdHIgKz0gcmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDMpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuICB9O1xuXG4gIG9iamVjdFRvVVJJID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGRhdGEsIGtleSwgdmFsdWU7XG4gICAgZGF0YSA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2tleV07XG4gICAgICAgIHJlc3VsdHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2YWx1ZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgICByZXR1cm4gZGF0YS5qb2luKCcmJyk7XG4gIH07XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgIT09IFwidW5kZWZpbmVkXCIgJiYgZGVmaW5lICE9PSBudWxsID8gZGVmaW5lLmFtZCA6IHZvaWQgMCkge1xuICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBKU09OUDtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZSAhPT0gbnVsbCA/IG1vZHVsZS5leHBvcnRzIDogdm9pZCAwKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBKU09OUDtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLkpTT05QID0gSlNPTlA7XG4gIH1cblxufSkuY2FsbCh0aGlzKTtcbiIsImNvbnN0IE1pY3JvTW9kYWwgPSAoKCkgPT4ge1xuXG4gIGNvbnN0IEZPQ1VTQUJMRV9FTEVNRU5UUyA9IFsnYVtocmVmXScsICdhcmVhW2hyZWZdJywgJ2lucHV0Om5vdChbZGlzYWJsZWRdKTpub3QoW3R5cGU9XCJoaWRkZW5cIl0pOm5vdChbYXJpYS1oaWRkZW5dKScsICdzZWxlY3Q6bm90KFtkaXNhYmxlZF0pOm5vdChbYXJpYS1oaWRkZW5dKScsICd0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSk6bm90KFthcmlhLWhpZGRlbl0pJywgJ2J1dHRvbjpub3QoW2Rpc2FibGVkXSk6bm90KFthcmlhLWhpZGRlbl0pJywgJ2lmcmFtZScsICdvYmplY3QnLCAnZW1iZWQnLCAnW2NvbnRlbnRlZGl0YWJsZV0nLCAnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJ107XG5cbiAgY2xhc3MgTW9kYWwge1xuICAgIGNvbnN0cnVjdG9yKHtcbiAgICAgIHRhcmdldE1vZGFsLFxuICAgICAgdHJpZ2dlcnMgPSBbXSxcbiAgICAgIG9uU2hvdyA9ICgpID0+IHt9LFxuICAgICAgb25DbG9zZSA9ICgpID0+IHt9LFxuICAgICAgb3BlblRyaWdnZXIgPSAnZGF0YS1taWNyb21vZGFsLXRyaWdnZXInLFxuICAgICAgY2xvc2VUcmlnZ2VyID0gJ2RhdGEtbWljcm9tb2RhbC1jbG9zZScsXG4gICAgICBkaXNhYmxlU2Nyb2xsID0gZmFsc2UsXG4gICAgICBkaXNhYmxlRm9jdXMgPSBmYWxzZSxcbiAgICAgIGF3YWl0Q2xvc2VBbmltYXRpb24gPSBmYWxzZSxcbiAgICAgIGF3YWl0T3BlbkFuaW1hdGlvbiA9IGZhbHNlLFxuICAgICAgZGVidWdNb2RlID0gZmFsc2VcbiAgICB9KSB7XG4gICAgICAvLyBTYXZlIGEgcmVmZXJlbmNlIG9mIHRoZSBtb2RhbFxuICAgICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhcmdldE1vZGFsKTsgLy8gU2F2ZSBhIHJlZmVyZW5jZSB0byB0aGUgcGFzc2VkIGNvbmZpZ1xuXG4gICAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgICAgZGVidWdNb2RlLFxuICAgICAgICBkaXNhYmxlU2Nyb2xsLFxuICAgICAgICBvcGVuVHJpZ2dlcixcbiAgICAgICAgY2xvc2VUcmlnZ2VyLFxuICAgICAgICBvblNob3csXG4gICAgICAgIG9uQ2xvc2UsXG4gICAgICAgIGF3YWl0Q2xvc2VBbmltYXRpb24sXG4gICAgICAgIGF3YWl0T3BlbkFuaW1hdGlvbixcbiAgICAgICAgZGlzYWJsZUZvY3VzIC8vIFJlZ2lzdGVyIGNsaWNrIGV2ZW50cyBvbmx5IGlmIHByZSBiaW5kaW5nIGV2ZW50TGlzdGVuZXJzXG5cbiAgICAgIH07XG4gICAgICBpZiAodHJpZ2dlcnMubGVuZ3RoID4gMCkgdGhpcy5yZWdpc3RlclRyaWdnZXJzKC4uLnRyaWdnZXJzKTsgLy8gcHJlIGJpbmQgZnVuY3Rpb25zIGZvciBldmVudCBsaXN0ZW5lcnNcblxuICAgICAgdGhpcy5vbkNsaWNrID0gdGhpcy5vbkNsaWNrLmJpbmQodGhpcyk7XG4gICAgICB0aGlzLm9uS2V5ZG93biA9IHRoaXMub25LZXlkb3duLmJpbmQodGhpcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExvb3BzIHRocm91Z2ggYWxsIG9wZW5UcmlnZ2VycyBhbmQgYmluZHMgY2xpY2sgZXZlbnRcbiAgICAgKiBAcGFyYW0gIHthcnJheX0gdHJpZ2dlcnMgW0FycmF5IG9mIG5vZGUgZWxlbWVudHNdXG4gICAgICogQHJldHVybiB7dm9pZH1cbiAgICAgKi9cblxuXG4gICAgcmVnaXN0ZXJUcmlnZ2VycyguLi50cmlnZ2Vycykge1xuICAgICAgdHJpZ2dlcnMuZmlsdGVyKEJvb2xlYW4pLmZvckVhY2godHJpZ2dlciA9PiB7XG4gICAgICAgIHRyaWdnZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudCA9PiB0aGlzLnNob3dNb2RhbChldmVudCkpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2hvd01vZGFsKCkge1xuICAgICAgdGhpcy5hY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMubW9kYWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuICAgICAgdGhpcy5tb2RhbC5jbGFzc0xpc3QuYWRkKCdpcy1vcGVuJyk7XG4gICAgICB0aGlzLnNjcm9sbEJlaGF2aW91cignZGlzYWJsZScpO1xuICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuXG4gICAgICBpZiAodGhpcy5jb25maWcuYXdhaXRPcGVuQW5pbWF0aW9uKSB7XG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5tb2RhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICAgICAgdGhpcy5zZXRGb2N1c1RvRmlyc3ROb2RlKCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5tb2RhbC5hZGRFdmVudExpc3RlbmVyKCdhbmltYXRpb25lbmQnLCBoYW5kbGVyLCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNldEZvY3VzVG9GaXJzdE5vZGUoKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5jb25maWcub25TaG93KHRoaXMubW9kYWwsIHRoaXMuYWN0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgY2xvc2VNb2RhbCgpIHtcbiAgICAgIGNvbnN0IG1vZGFsID0gdGhpcy5tb2RhbDtcbiAgICAgIHRoaXMubW9kYWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXJzKCk7XG4gICAgICB0aGlzLnNjcm9sbEJlaGF2aW91cignZW5hYmxlJyk7XG5cbiAgICAgIGlmICh0aGlzLmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5hY3RpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuY29uZmlnLm9uQ2xvc2UodGhpcy5tb2RhbCk7XG5cbiAgICAgIGlmICh0aGlzLmNvbmZpZy5hd2FpdENsb3NlQW5pbWF0aW9uKSB7XG4gICAgICAgIHRoaXMubW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XG4gICAgICAgICAgbW9kYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYW5pbWF0aW9uZW5kJywgaGFuZGxlciwgZmFsc2UpO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VNb2RhbEJ5SWQodGFyZ2V0TW9kYWwpIHtcbiAgICAgIHRoaXMubW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0YXJnZXRNb2RhbCk7XG4gICAgICBpZiAodGhpcy5tb2RhbCkgdGhpcy5jbG9zZU1vZGFsKCk7XG4gICAgfVxuXG4gICAgc2Nyb2xsQmVoYXZpb3VyKHRvZ2dsZSkge1xuICAgICAgaWYgKCF0aGlzLmNvbmZpZy5kaXNhYmxlU2Nyb2xsKSByZXR1cm47XG4gICAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gICAgICBzd2l0Y2ggKHRvZ2dsZSkge1xuICAgICAgICBjYXNlICdlbmFibGUnOlxuICAgICAgICAgIE9iamVjdC5hc3NpZ24oYm9keS5zdHlsZSwge1xuICAgICAgICAgICAgb3ZlcmZsb3c6ICcnLFxuICAgICAgICAgICAgaGVpZ2h0OiAnJ1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2Rpc2FibGUnOlxuICAgICAgICAgIE9iamVjdC5hc3NpZ24oYm9keS5zdHlsZSwge1xuICAgICAgICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwdmgnXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICAgIHRoaXMubW9kYWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHRoaXMub25DbGljayk7XG4gICAgICB0aGlzLm1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLm9uS2V5ZG93bik7XG4gICAgfVxuXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICB0aGlzLm1vZGFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCB0aGlzLm9uQ2xpY2spO1xuICAgICAgdGhpcy5tb2RhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGljayk7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5vbktleWRvd24pO1xuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC50YXJnZXQuaGFzQXR0cmlidXRlKHRoaXMuY29uZmlnLmNsb3NlVHJpZ2dlcikpIHtcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgb25LZXlkb3duKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHRoaXMuY2xvc2VNb2RhbChldmVudCk7XG4gICAgICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gOSkgdGhpcy5tYWludGFpbkZvY3VzKGV2ZW50KTtcbiAgICB9XG5cbiAgICBnZXRGb2N1c2FibGVOb2RlcygpIHtcbiAgICAgIGNvbnN0IG5vZGVzID0gdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yQWxsKEZPQ1VTQUJMRV9FTEVNRU5UUyk7XG4gICAgICByZXR1cm4gQXJyYXkoLi4ubm9kZXMpO1xuICAgIH1cblxuICAgIHNldEZvY3VzVG9GaXJzdE5vZGUoKSB7XG4gICAgICBpZiAodGhpcy5jb25maWcuZGlzYWJsZUZvY3VzKSByZXR1cm47XG4gICAgICBjb25zdCBmb2N1c2FibGVOb2RlcyA9IHRoaXMuZ2V0Rm9jdXNhYmxlTm9kZXMoKTtcbiAgICAgIGlmIChmb2N1c2FibGVOb2Rlcy5sZW5ndGgpIGZvY3VzYWJsZU5vZGVzWzBdLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgbWFpbnRhaW5Gb2N1cyhldmVudCkge1xuICAgICAgY29uc3QgZm9jdXNhYmxlTm9kZXMgPSB0aGlzLmdldEZvY3VzYWJsZU5vZGVzKCk7IC8vIGlmIGRpc2FibGVGb2N1cyBpcyB0cnVlXG5cbiAgICAgIGlmICghdGhpcy5tb2RhbC5jb250YWlucyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgICAgICBmb2N1c2FibGVOb2Rlc1swXS5mb2N1cygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZm9jdXNlZEl0ZW1JbmRleCA9IGZvY3VzYWJsZU5vZGVzLmluZGV4T2YoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCk7XG5cbiAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIGZvY3VzZWRJdGVtSW5kZXggPT09IDApIHtcbiAgICAgICAgICBmb2N1c2FibGVOb2Rlc1tmb2N1c2FibGVOb2Rlcy5sZW5ndGggLSAxXS5mb2N1cygpO1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWV2ZW50LnNoaWZ0S2V5ICYmIGZvY3VzZWRJdGVtSW5kZXggPT09IGZvY3VzYWJsZU5vZGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICBmb2N1c2FibGVOb2Rlc1swXS5mb2N1cygpO1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgfVxuICAvKipcbiAgICogTW9kYWwgcHJvdG90eXBlIGVuZHMuXG4gICAqIEhlcmUgb24gY29kZSBpcyByZXNwb25zaWJsZSBmb3IgZGV0ZWN0aW5nIGFuZFxuICAgKiBhdXRvIGJpbmRpbmcgZXZlbnQgaGFuZGxlcnMgb24gbW9kYWwgdHJpZ2dlcnNcbiAgICovXG4gIC8vIEtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIG9wZW5lZCBtb2RhbFxuXG5cbiAgbGV0IGFjdGl2ZU1vZGFsID0gbnVsbDtcbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhbiBhc3NvY2lhdGl2ZSBhcnJheSBvZiBtb2RhbHMgYW5kIGl0J3NcbiAgICogcmVzcGVjdGl2ZSB0cmlnZ2Vyc1xuICAgKiBAcGFyYW0gIHthcnJheX0gdHJpZ2dlcnMgICAgIEFuIGFycmF5IG9mIGFsbCB0cmlnZ2Vyc1xuICAgKiBAcGFyYW0gIHtzdHJpbmd9IHRyaWdnZXJBdHRyIFRoZSBkYXRhLWF0dHJpYnV0ZSB3aGljaCB0cmlnZ2VycyB0aGUgbW9kdWxlXG4gICAqIEByZXR1cm4ge2FycmF5fVxuICAgKi9cblxuICBjb25zdCBnZW5lcmF0ZVRyaWdnZXJNYXAgPSAodHJpZ2dlcnMsIHRyaWdnZXJBdHRyKSA9PiB7XG4gICAgY29uc3QgdHJpZ2dlck1hcCA9IFtdO1xuICAgIHRyaWdnZXJzLmZvckVhY2godHJpZ2dlciA9PiB7XG4gICAgICBjb25zdCB0YXJnZXRNb2RhbCA9IHRyaWdnZXIuYXR0cmlidXRlc1t0cmlnZ2VyQXR0cl0udmFsdWU7XG4gICAgICBpZiAodHJpZ2dlck1hcFt0YXJnZXRNb2RhbF0gPT09IHVuZGVmaW5lZCkgdHJpZ2dlck1hcFt0YXJnZXRNb2RhbF0gPSBbXTtcbiAgICAgIHRyaWdnZXJNYXBbdGFyZ2V0TW9kYWxdLnB1c2godHJpZ2dlcik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRyaWdnZXJNYXA7XG4gIH07XG4gIC8qKlxuICAgKiBWYWxpZGF0ZXMgd2hldGhlciBhIG1vZGFsIG9mIHRoZSBnaXZlbiBpZCBleGlzdHNcbiAgICogaW4gdGhlIERPTVxuICAgKiBAcGFyYW0gIHtudW1iZXJ9IGlkICBUaGUgaWQgb2YgdGhlIG1vZGFsXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59XG4gICAqL1xuXG5cbiAgY29uc3QgdmFsaWRhdGVNb2RhbFByZXNlbmNlID0gaWQgPT4ge1xuICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpKSB7XG4gICAgICBjb25zb2xlLndhcm4oYE1pY3JvTW9kYWw6IFxcdTI3NTdTZWVtcyBsaWtlIHlvdSBoYXZlIG1pc3NlZCAlYycke2lkfSdgLCAnYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtjb2xvcjogIzUwNTk2Yztmb250LXdlaWdodDogYm9sZDsnLCAnSUQgc29tZXdoZXJlIGluIHlvdXIgY29kZS4gUmVmZXIgZXhhbXBsZSBiZWxvdyB0byByZXNvbHZlIGl0LicpO1xuICAgICAgY29uc29sZS53YXJuKGAlY0V4YW1wbGU6YCwgJ2JhY2tncm91bmQtY29sb3I6ICNmOGY5ZmE7Y29sb3I6ICM1MDU5NmM7Zm9udC13ZWlnaHQ6IGJvbGQ7JywgYDxkaXYgY2xhc3M9XCJtb2RhbFwiIGlkPVwiJHtpZH1cIj48L2Rpdj5gKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBWYWxpZGF0ZXMgaWYgdGhlcmUgYXJlIG1vZGFsIHRyaWdnZXJzIHByZXNlbnRcbiAgICogaW4gdGhlIERPTVxuICAgKiBAcGFyYW0gIHthcnJheX0gdHJpZ2dlcnMgQW4gYXJyYXkgb2YgZGF0YS10cmlnZ2Vyc1xuICAgKiBAcmV0dXJuIHtib29sZWFufVxuICAgKi9cblxuXG4gIGNvbnN0IHZhbGlkYXRlVHJpZ2dlclByZXNlbmNlID0gdHJpZ2dlcnMgPT4ge1xuICAgIGlmICh0cmlnZ2Vycy5sZW5ndGggPD0gMCkge1xuICAgICAgY29uc29sZS53YXJuKGBNaWNyb01vZGFsOiBcXHUyNzU3UGxlYXNlIHNwZWNpZnkgYXQgbGVhc3Qgb25lICVjJ21pY3JvbW9kYWwtdHJpZ2dlcidgLCAnYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtjb2xvcjogIzUwNTk2Yztmb250LXdlaWdodDogYm9sZDsnLCAnZGF0YSBhdHRyaWJ1dGUuJyk7XG4gICAgICBjb25zb2xlLndhcm4oYCVjRXhhbXBsZTpgLCAnYmFja2dyb3VuZC1jb2xvcjogI2Y4ZjlmYTtjb2xvcjogIzUwNTk2Yztmb250LXdlaWdodDogYm9sZDsnLCBgPGEgaHJlZj1cIiNcIiBkYXRhLW1pY3JvbW9kYWwtdHJpZ2dlcj1cIm15LW1vZGFsXCI+PC9hPmApO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0cmlnZ2VycyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyBtb2RhbHNcbiAgICogYXJlIHByZXNlbnQgaW4gdGhlIERPTVxuICAgKiBAcGFyYW0gIHthcnJheX0gdHJpZ2dlcnMgICBBcnJheSBvZiBET00gbm9kZXMgd2hpY2ggaGF2ZSBkYXRhLXRyaWdnZXJzXG4gICAqIEBwYXJhbSAge2FycmF5fSB0cmlnZ2VyTWFwIEFzc29jaWF0aXZlIGFycmF5IG9mIG1vZGFscyBhbmQgdGhlaXIgdHJpZ2dlcnNcbiAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICovXG5cblxuICBjb25zdCB2YWxpZGF0ZUFyZ3MgPSAodHJpZ2dlcnMsIHRyaWdnZXJNYXApID0+IHtcbiAgICB2YWxpZGF0ZVRyaWdnZXJQcmVzZW5jZSh0cmlnZ2Vycyk7XG4gICAgaWYgKCF0cmlnZ2VyTWFwKSByZXR1cm4gdHJ1ZTtcblxuICAgIGZvciAodmFyIGlkIGluIHRyaWdnZXJNYXApIHZhbGlkYXRlTW9kYWxQcmVzZW5jZShpZCk7XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcbiAgLyoqXG4gICAqIEJpbmRzIGNsaWNrIGhhbmRsZXJzIHRvIGFsbCBtb2RhbCB0cmlnZ2Vyc1xuICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbmZpZyBbZGVzY3JpcHRpb25dXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cblxuXG4gIGNvbnN0IGluaXQgPSBjb25maWcgPT4ge1xuICAgIC8vIENyZWF0ZSBhbiBjb25maWcgb2JqZWN0IHdpdGggZGVmYXVsdCBvcGVuVHJpZ2dlclxuICAgIGNvbnN0IG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCB7XG4gICAgICBvcGVuVHJpZ2dlcjogJ2RhdGEtbWljcm9tb2RhbC10cmlnZ2VyJ1xuICAgIH0sIGNvbmZpZyk7IC8vIENvbGxlY3RzIGFsbCB0aGUgbm9kZXMgd2l0aCB0aGUgdHJpZ2dlclxuXG4gICAgY29uc3QgdHJpZ2dlcnMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgWyR7b3B0aW9ucy5vcGVuVHJpZ2dlcn1dYCldOyAvLyBNYWtlcyBhIG1hcHBpbmdzIG9mIG1vZGFscyB3aXRoIHRoZWlyIHRyaWdnZXIgbm9kZXNcblxuICAgIGNvbnN0IHRyaWdnZXJNYXAgPSBnZW5lcmF0ZVRyaWdnZXJNYXAodHJpZ2dlcnMsIG9wdGlvbnMub3BlblRyaWdnZXIpOyAvLyBDaGVja3MgaWYgbW9kYWxzIGFuZCB0cmlnZ2VycyBleGlzdCBpbiBkb21cblxuICAgIGlmIChvcHRpb25zLmRlYnVnTW9kZSA9PT0gdHJ1ZSAmJiB2YWxpZGF0ZUFyZ3ModHJpZ2dlcnMsIHRyaWdnZXJNYXApID09PSBmYWxzZSkgcmV0dXJuOyAvLyBGb3IgZXZlcnkgdGFyZ2V0IG1vZGFsIGNyZWF0ZXMgYSBuZXcgaW5zdGFuY2VcblxuICAgIGZvciAodmFyIGtleSBpbiB0cmlnZ2VyTWFwKSB7XG4gICAgICBsZXQgdmFsdWUgPSB0cmlnZ2VyTWFwW2tleV07XG4gICAgICBvcHRpb25zLnRhcmdldE1vZGFsID0ga2V5O1xuICAgICAgb3B0aW9ucy50cmlnZ2VycyA9IFsuLi52YWx1ZV07XG4gICAgICBhY3RpdmVNb2RhbCA9IG5ldyBNb2RhbChvcHRpb25zKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgICB9XG4gIH07XG4gIC8qKlxuICAgKiBTaG93cyBhIHBhcnRpY3VsYXIgbW9kYWxcbiAgICogQHBhcmFtICB7c3RyaW5nfSB0YXJnZXRNb2RhbCBbVGhlIGlkIG9mIHRoZSBtb2RhbCB0byBkaXNwbGF5XVxuICAgKiBAcGFyYW0gIHtvYmplY3R9IGNvbmZpZyBbVGhlIGNvbmZpZ3VyYXRpb24gb2JqZWN0IHRvIHBhc3NdXG4gICAqIEByZXR1cm4ge3ZvaWR9XG4gICAqL1xuXG5cbiAgY29uc3Qgc2hvdyA9ICh0YXJnZXRNb2RhbCwgY29uZmlnKSA9PiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGNvbmZpZyB8fCB7fTtcbiAgICBvcHRpb25zLnRhcmdldE1vZGFsID0gdGFyZ2V0TW9kYWw7IC8vIENoZWNrcyBpZiBtb2RhbHMgYW5kIHRyaWdnZXJzIGV4aXN0IGluIGRvbVxuXG4gICAgaWYgKG9wdGlvbnMuZGVidWdNb2RlID09PSB0cnVlICYmIHZhbGlkYXRlTW9kYWxQcmVzZW5jZSh0YXJnZXRNb2RhbCkgPT09IGZhbHNlKSByZXR1cm47IC8vIHN0b3JlcyByZWZlcmVuY2UgdG8gYWN0aXZlIG1vZGFsXG5cbiAgICBhY3RpdmVNb2RhbCA9IG5ldyBNb2RhbChvcHRpb25zKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcblxuICAgIGFjdGl2ZU1vZGFsLnNob3dNb2RhbCgpO1xuICB9O1xuICAvKipcbiAgICogQ2xvc2VzIHRoZSBhY3RpdmUgbW9kYWxcbiAgICogQHBhcmFtICB7c3RyaW5nfSB0YXJnZXRNb2RhbCBbVGhlIGlkIG9mIHRoZSBtb2RhbCB0byBjbG9zZV1cbiAgICogQHJldHVybiB7dm9pZH1cbiAgICovXG5cblxuICBjb25zdCBjbG9zZSA9IHRhcmdldE1vZGFsID0+IHtcbiAgICB0YXJnZXRNb2RhbCA/IGFjdGl2ZU1vZGFsLmNsb3NlTW9kYWxCeUlkKHRhcmdldE1vZGFsKSA6IGFjdGl2ZU1vZGFsLmNsb3NlTW9kYWwoKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgc2hvdyxcbiAgICBjbG9zZVxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgTWljcm9Nb2RhbDtcbiIsIi8qKiFcbiAqIEBmaWxlT3ZlcnZpZXcgS2lja2FzcyBsaWJyYXJ5IHRvIGNyZWF0ZSBhbmQgcGxhY2UgcG9wcGVycyBuZWFyIHRoZWlyIHJlZmVyZW5jZSBlbGVtZW50cy5cbiAqIEB2ZXJzaW9uIDEuMTUuMFxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNiBGZWRlcmljbyBaaXZvbG8gYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cbnZhciBpc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xuXG52YXIgbG9uZ2VyVGltZW91dEJyb3dzZXJzID0gWydFZGdlJywgJ1RyaWRlbnQnLCAnRmlyZWZveCddO1xudmFyIHRpbWVvdXREdXJhdGlvbiA9IDA7XG5mb3IgKHZhciBpID0gMDsgaSA8IGxvbmdlclRpbWVvdXRCcm93c2Vycy5sZW5ndGg7IGkgKz0gMSkge1xuICBpZiAoaXNCcm93c2VyICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihsb25nZXJUaW1lb3V0QnJvd3NlcnNbaV0pID49IDApIHtcbiAgICB0aW1lb3V0RHVyYXRpb24gPSAxO1xuICAgIGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1pY3JvdGFza0RlYm91bmNlKGZuKSB7XG4gIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY2FsbGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNhbGxlZCA9IHRydWU7XG4gICAgd2luZG93LlByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgY2FsbGVkID0gZmFsc2U7XG4gICAgICBmbigpO1xuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0YXNrRGVib3VuY2UoZm4pIHtcbiAgdmFyIHNjaGVkdWxlZCA9IGZhbHNlO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICBzY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICBmbigpO1xuICAgICAgfSwgdGltZW91dER1cmF0aW9uKTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBzdXBwb3J0c01pY3JvVGFza3MgPSBpc0Jyb3dzZXIgJiYgd2luZG93LlByb21pc2U7XG5cbi8qKlxuKiBDcmVhdGUgYSBkZWJvdW5jZWQgdmVyc2lvbiBvZiBhIG1ldGhvZCwgdGhhdCdzIGFzeW5jaHJvbm91c2x5IGRlZmVycmVkXG4qIGJ1dCBjYWxsZWQgaW4gdGhlIG1pbmltdW0gdGltZSBwb3NzaWJsZS5cbipcbiogQG1ldGhvZFxuKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4qIEBhcmd1bWVudCB7RnVuY3Rpb259IGZuXG4qIEByZXR1cm5zIHtGdW5jdGlvbn1cbiovXG52YXIgZGVib3VuY2UgPSBzdXBwb3J0c01pY3JvVGFza3MgPyBtaWNyb3Rhc2tEZWJvdW5jZSA6IHRhc2tEZWJvdW5jZTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gdmFyaWFibGUgaXMgYSBmdW5jdGlvblxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtBbnl9IGZ1bmN0aW9uVG9DaGVjayAtIHZhcmlhYmxlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYW5zd2VyIHRvOiBpcyBhIGZ1bmN0aW9uP1xuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmN0aW9uVG9DaGVjaykge1xuICB2YXIgZ2V0VHlwZSA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb25Ub0NoZWNrICYmIGdldFR5cGUudG9TdHJpbmcuY2FsbChmdW5jdGlvblRvQ2hlY2spID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIEdldCBDU1MgY29tcHV0ZWQgcHJvcGVydHkgb2YgdGhlIGdpdmVuIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWVtZW50fSBlbGVtZW50XG4gKiBAYXJndW1lbnQge1N0cmluZ30gcHJvcGVydHlcbiAqL1xuZnVuY3Rpb24gZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGVsZW1lbnQsIHByb3BlcnR5KSB7XG4gIGlmIChlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIC8vIE5PVEU6IDEgRE9NIGFjY2VzcyBoZXJlXG4gIHZhciB3aW5kb3cgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gIHZhciBjc3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKTtcbiAgcmV0dXJuIHByb3BlcnR5ID8gY3NzW3Byb3BlcnR5XSA6IGNzcztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwYXJlbnROb2RlIG9yIHRoZSBob3N0IG9mIHRoZSBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtFbGVtZW50fSBwYXJlbnRcbiAqL1xuZnVuY3Rpb24gZ2V0UGFyZW50Tm9kZShlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuICByZXR1cm4gZWxlbWVudC5wYXJlbnROb2RlIHx8IGVsZW1lbnQuaG9zdDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzY3JvbGxpbmcgcGFyZW50IG9mIHRoZSBnaXZlbiBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtFbGVtZW50fSBzY3JvbGwgcGFyZW50XG4gKi9cbmZ1bmN0aW9uIGdldFNjcm9sbFBhcmVudChlbGVtZW50KSB7XG4gIC8vIFJldHVybiBib2R5LCBgZ2V0U2Nyb2xsYCB3aWxsIHRha2UgY2FyZSB0byBnZXQgdGhlIGNvcnJlY3QgYHNjcm9sbFRvcGAgZnJvbSBpdFxuICBpZiAoIWVsZW1lbnQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuYm9keTtcbiAgfVxuXG4gIHN3aXRjaCAoZWxlbWVudC5ub2RlTmFtZSkge1xuICAgIGNhc2UgJ0hUTUwnOlxuICAgIGNhc2UgJ0JPRFknOlxuICAgICAgcmV0dXJuIGVsZW1lbnQub3duZXJEb2N1bWVudC5ib2R5O1xuICAgIGNhc2UgJyNkb2N1bWVudCc6XG4gICAgICByZXR1cm4gZWxlbWVudC5ib2R5O1xuICB9XG5cbiAgLy8gRmlyZWZveCB3YW50IHVzIHRvIGNoZWNrIGAteGAgYW5kIGAteWAgdmFyaWF0aW9ucyBhcyB3ZWxsXG5cbiAgdmFyIF9nZXRTdHlsZUNvbXB1dGVkUHJvcCA9IGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShlbGVtZW50KSxcbiAgICAgIG92ZXJmbG93ID0gX2dldFN0eWxlQ29tcHV0ZWRQcm9wLm92ZXJmbG93LFxuICAgICAgb3ZlcmZsb3dYID0gX2dldFN0eWxlQ29tcHV0ZWRQcm9wLm92ZXJmbG93WCxcbiAgICAgIG92ZXJmbG93WSA9IF9nZXRTdHlsZUNvbXB1dGVkUHJvcC5vdmVyZmxvd1k7XG5cbiAgaWYgKC8oYXV0b3xzY3JvbGx8b3ZlcmxheSkvLnRlc3Qob3ZlcmZsb3cgKyBvdmVyZmxvd1kgKyBvdmVyZmxvd1gpKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICByZXR1cm4gZ2V0U2Nyb2xsUGFyZW50KGdldFBhcmVudE5vZGUoZWxlbWVudCkpO1xufVxuXG52YXIgaXNJRTExID0gaXNCcm93c2VyICYmICEhKHdpbmRvdy5NU0lucHV0TWV0aG9kQ29udGV4dCAmJiBkb2N1bWVudC5kb2N1bWVudE1vZGUpO1xudmFyIGlzSUUxMCA9IGlzQnJvd3NlciAmJiAvTVNJRSAxMC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBicm93c2VyIGlzIEludGVybmV0IEV4cGxvcmVyXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcGFyYW0ge051bWJlcn0gdmVyc2lvbiB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IGlzSUVcbiAqL1xuZnVuY3Rpb24gaXNJRSh2ZXJzaW9uKSB7XG4gIGlmICh2ZXJzaW9uID09PSAxMSkge1xuICAgIHJldHVybiBpc0lFMTE7XG4gIH1cbiAgaWYgKHZlcnNpb24gPT09IDEwKSB7XG4gICAgcmV0dXJuIGlzSUUxMDtcbiAgfVxuICByZXR1cm4gaXNJRTExIHx8IGlzSUUxMDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBvZmZzZXQgcGFyZW50IG9mIHRoZSBnaXZlbiBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtFbGVtZW50fSBvZmZzZXQgcGFyZW50XG4gKi9cbmZ1bmN0aW9uIGdldE9mZnNldFBhcmVudChlbGVtZW50KSB7XG4gIGlmICghZWxlbWVudCkge1xuICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIH1cblxuICB2YXIgbm9PZmZzZXRQYXJlbnQgPSBpc0lFKDEwKSA/IGRvY3VtZW50LmJvZHkgOiBudWxsO1xuXG4gIC8vIE5PVEU6IDEgRE9NIGFjY2VzcyBoZXJlXG4gIHZhciBvZmZzZXRQYXJlbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudCB8fCBudWxsO1xuICAvLyBTa2lwIGhpZGRlbiBlbGVtZW50cyB3aGljaCBkb24ndCBoYXZlIGFuIG9mZnNldFBhcmVudFxuICB3aGlsZSAob2Zmc2V0UGFyZW50ID09PSBub09mZnNldFBhcmVudCAmJiBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZykge1xuICAgIG9mZnNldFBhcmVudCA9IChlbGVtZW50ID0gZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcpLm9mZnNldFBhcmVudDtcbiAgfVxuXG4gIHZhciBub2RlTmFtZSA9IG9mZnNldFBhcmVudCAmJiBvZmZzZXRQYXJlbnQubm9kZU5hbWU7XG5cbiAgaWYgKCFub2RlTmFtZSB8fCBub2RlTmFtZSA9PT0gJ0JPRFknIHx8IG5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICByZXR1cm4gZWxlbWVudCA/IGVsZW1lbnQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIH1cblxuICAvLyAub2Zmc2V0UGFyZW50IHdpbGwgcmV0dXJuIHRoZSBjbG9zZXN0IFRILCBURCBvciBUQUJMRSBpbiBjYXNlXG4gIC8vIG5vIG9mZnNldFBhcmVudCBpcyBwcmVzZW50LCBJIGhhdGUgdGhpcyBqb2IuLi5cbiAgaWYgKFsnVEgnLCAnVEQnLCAnVEFCTEUnXS5pbmRleE9mKG9mZnNldFBhcmVudC5ub2RlTmFtZSkgIT09IC0xICYmIGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShvZmZzZXRQYXJlbnQsICdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgIHJldHVybiBnZXRPZmZzZXRQYXJlbnQob2Zmc2V0UGFyZW50KTtcbiAgfVxuXG4gIHJldHVybiBvZmZzZXRQYXJlbnQ7XG59XG5cbmZ1bmN0aW9uIGlzT2Zmc2V0Q29udGFpbmVyKGVsZW1lbnQpIHtcbiAgdmFyIG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZTtcblxuICBpZiAobm9kZU5hbWUgPT09ICdCT0RZJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gbm9kZU5hbWUgPT09ICdIVE1MJyB8fCBnZXRPZmZzZXRQYXJlbnQoZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCkgPT09IGVsZW1lbnQ7XG59XG5cbi8qKlxuICogRmluZHMgdGhlIHJvb3Qgbm9kZSAoZG9jdW1lbnQsIHNoYWRvd0RPTSByb290KSBvZiB0aGUgZ2l2ZW4gZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBub2RlXG4gKiBAcmV0dXJucyB7RWxlbWVudH0gcm9vdCBub2RlXG4gKi9cbmZ1bmN0aW9uIGdldFJvb3Qobm9kZSkge1xuICBpZiAobm9kZS5wYXJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIGdldFJvb3Qobm9kZS5wYXJlbnROb2RlKTtcbiAgfVxuXG4gIHJldHVybiBub2RlO1xufVxuXG4vKipcbiAqIEZpbmRzIHRoZSBvZmZzZXQgcGFyZW50IGNvbW1vbiB0byB0aGUgdHdvIHByb3ZpZGVkIG5vZGVzXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnQxXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnQyXG4gKiBAcmV0dXJucyB7RWxlbWVudH0gY29tbW9uIG9mZnNldCBwYXJlbnRcbiAqL1xuZnVuY3Rpb24gZmluZENvbW1vbk9mZnNldFBhcmVudChlbGVtZW50MSwgZWxlbWVudDIpIHtcbiAgLy8gVGhpcyBjaGVjayBpcyBuZWVkZWQgdG8gYXZvaWQgZXJyb3JzIGluIGNhc2Ugb25lIG9mIHRoZSBlbGVtZW50cyBpc24ndCBkZWZpbmVkIGZvciBhbnkgcmVhc29uXG4gIGlmICghZWxlbWVudDEgfHwgIWVsZW1lbnQxLm5vZGVUeXBlIHx8ICFlbGVtZW50MiB8fCAhZWxlbWVudDIubm9kZVR5cGUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB9XG5cbiAgLy8gSGVyZSB3ZSBtYWtlIHN1cmUgdG8gZ2l2ZSBhcyBcInN0YXJ0XCIgdGhlIGVsZW1lbnQgdGhhdCBjb21lcyBmaXJzdCBpbiB0aGUgRE9NXG4gIHZhciBvcmRlciA9IGVsZW1lbnQxLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGVsZW1lbnQyKSAmIE5vZGUuRE9DVU1FTlRfUE9TSVRJT05fRk9MTE9XSU5HO1xuICB2YXIgc3RhcnQgPSBvcmRlciA/IGVsZW1lbnQxIDogZWxlbWVudDI7XG4gIHZhciBlbmQgPSBvcmRlciA/IGVsZW1lbnQyIDogZWxlbWVudDE7XG5cbiAgLy8gR2V0IGNvbW1vbiBhbmNlc3RvciBjb250YWluZXJcbiAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgcmFuZ2Uuc2V0U3RhcnQoc3RhcnQsIDApO1xuICByYW5nZS5zZXRFbmQoZW5kLCAwKTtcbiAgdmFyIGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyID0gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XG5cbiAgLy8gQm90aCBub2RlcyBhcmUgaW5zaWRlICNkb2N1bWVudFxuXG4gIGlmIChlbGVtZW50MSAhPT0gY29tbW9uQW5jZXN0b3JDb250YWluZXIgJiYgZWxlbWVudDIgIT09IGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyIHx8IHN0YXJ0LmNvbnRhaW5zKGVuZCkpIHtcbiAgICBpZiAoaXNPZmZzZXRDb250YWluZXIoY29tbW9uQW5jZXN0b3JDb250YWluZXIpKSB7XG4gICAgICByZXR1cm4gY29tbW9uQW5jZXN0b3JDb250YWluZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldE9mZnNldFBhcmVudChjb21tb25BbmNlc3RvckNvbnRhaW5lcik7XG4gIH1cblxuICAvLyBvbmUgb2YgdGhlIG5vZGVzIGlzIGluc2lkZSBzaGFkb3dET00sIGZpbmQgd2hpY2ggb25lXG4gIHZhciBlbGVtZW50MXJvb3QgPSBnZXRSb290KGVsZW1lbnQxKTtcbiAgaWYgKGVsZW1lbnQxcm9vdC5ob3N0KSB7XG4gICAgcmV0dXJuIGZpbmRDb21tb25PZmZzZXRQYXJlbnQoZWxlbWVudDFyb290Lmhvc3QsIGVsZW1lbnQyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmluZENvbW1vbk9mZnNldFBhcmVudChlbGVtZW50MSwgZ2V0Um9vdChlbGVtZW50MikuaG9zdCk7XG4gIH1cbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBzY3JvbGwgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQgaW4gdGhlIGdpdmVuIHNpZGUgKHRvcCBhbmQgbGVmdClcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gZWxlbWVudFxuICogQGFyZ3VtZW50IHtTdHJpbmd9IHNpZGUgYHRvcGAgb3IgYGxlZnRgXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBhbW91bnQgb2Ygc2Nyb2xsZWQgcGl4ZWxzXG4gKi9cbmZ1bmN0aW9uIGdldFNjcm9sbChlbGVtZW50KSB7XG4gIHZhciBzaWRlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAndG9wJztcblxuICB2YXIgdXBwZXJTaWRlID0gc2lkZSA9PT0gJ3RvcCcgPyAnc2Nyb2xsVG9wJyA6ICdzY3JvbGxMZWZ0JztcbiAgdmFyIG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZTtcblxuICBpZiAobm9kZU5hbWUgPT09ICdCT0RZJyB8fCBub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgdmFyIGh0bWwgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIHZhciBzY3JvbGxpbmdFbGVtZW50ID0gZWxlbWVudC5vd25lckRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQgfHwgaHRtbDtcbiAgICByZXR1cm4gc2Nyb2xsaW5nRWxlbWVudFt1cHBlclNpZGVdO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnRbdXBwZXJTaWRlXTtcbn1cblxuLypcbiAqIFN1bSBvciBzdWJ0cmFjdCB0aGUgZWxlbWVudCBzY3JvbGwgdmFsdWVzIChsZWZ0IGFuZCB0b3ApIGZyb20gYSBnaXZlbiByZWN0IG9iamVjdFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtPYmplY3R9IHJlY3QgLSBSZWN0IG9iamVjdCB5b3Ugd2FudCB0byBjaGFuZ2VcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBUaGUgZWxlbWVudCBmcm9tIHRoZSBmdW5jdGlvbiByZWFkcyB0aGUgc2Nyb2xsIHZhbHVlc1xuICogQHBhcmFtIHtCb29sZWFufSBzdWJ0cmFjdCAtIHNldCB0byB0cnVlIGlmIHlvdSB3YW50IHRvIHN1YnRyYWN0IHRoZSBzY3JvbGwgdmFsdWVzXG4gKiBAcmV0dXJuIHtPYmplY3R9IHJlY3QgLSBUaGUgbW9kaWZpZXIgcmVjdCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gaW5jbHVkZVNjcm9sbChyZWN0LCBlbGVtZW50KSB7XG4gIHZhciBzdWJ0cmFjdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG5cbiAgdmFyIHNjcm9sbFRvcCA9IGdldFNjcm9sbChlbGVtZW50LCAndG9wJyk7XG4gIHZhciBzY3JvbGxMZWZ0ID0gZ2V0U2Nyb2xsKGVsZW1lbnQsICdsZWZ0Jyk7XG4gIHZhciBtb2RpZmllciA9IHN1YnRyYWN0ID8gLTEgOiAxO1xuICByZWN0LnRvcCArPSBzY3JvbGxUb3AgKiBtb2RpZmllcjtcbiAgcmVjdC5ib3R0b20gKz0gc2Nyb2xsVG9wICogbW9kaWZpZXI7XG4gIHJlY3QubGVmdCArPSBzY3JvbGxMZWZ0ICogbW9kaWZpZXI7XG4gIHJlY3QucmlnaHQgKz0gc2Nyb2xsTGVmdCAqIG1vZGlmaWVyO1xuICByZXR1cm4gcmVjdDtcbn1cblxuLypcbiAqIEhlbHBlciB0byBkZXRlY3QgYm9yZGVycyBvZiBhIGdpdmVuIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gc3R5bGVzXG4gKiBSZXN1bHQgb2YgYGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eWAgb24gdGhlIGdpdmVuIGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBheGlzIC0gYHhgIG9yIGB5YFxuICogQHJldHVybiB7bnVtYmVyfSBib3JkZXJzIC0gVGhlIGJvcmRlcnMgc2l6ZSBvZiB0aGUgZ2l2ZW4gYXhpc1xuICovXG5cbmZ1bmN0aW9uIGdldEJvcmRlcnNTaXplKHN0eWxlcywgYXhpcykge1xuICB2YXIgc2lkZUEgPSBheGlzID09PSAneCcgPyAnTGVmdCcgOiAnVG9wJztcbiAgdmFyIHNpZGVCID0gc2lkZUEgPT09ICdMZWZ0JyA/ICdSaWdodCcgOiAnQm90dG9tJztcblxuICByZXR1cm4gcGFyc2VGbG9hdChzdHlsZXNbJ2JvcmRlcicgKyBzaWRlQSArICdXaWR0aCddLCAxMCkgKyBwYXJzZUZsb2F0KHN0eWxlc1snYm9yZGVyJyArIHNpZGVCICsgJ1dpZHRoJ10sIDEwKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2l6ZShheGlzLCBib2R5LCBodG1sLCBjb21wdXRlZFN0eWxlKSB7XG4gIHJldHVybiBNYXRoLm1heChib2R5WydvZmZzZXQnICsgYXhpc10sIGJvZHlbJ3Njcm9sbCcgKyBheGlzXSwgaHRtbFsnY2xpZW50JyArIGF4aXNdLCBodG1sWydvZmZzZXQnICsgYXhpc10sIGh0bWxbJ3Njcm9sbCcgKyBheGlzXSwgaXNJRSgxMCkgPyBwYXJzZUludChodG1sWydvZmZzZXQnICsgYXhpc10pICsgcGFyc2VJbnQoY29tcHV0ZWRTdHlsZVsnbWFyZ2luJyArIChheGlzID09PSAnSGVpZ2h0JyA/ICdUb3AnIDogJ0xlZnQnKV0pICsgcGFyc2VJbnQoY29tcHV0ZWRTdHlsZVsnbWFyZ2luJyArIChheGlzID09PSAnSGVpZ2h0JyA/ICdCb3R0b20nIDogJ1JpZ2h0JyldKSA6IDApO1xufVxuXG5mdW5jdGlvbiBnZXRXaW5kb3dTaXplcyhkb2N1bWVudCkge1xuICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gIHZhciBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB2YXIgY29tcHV0ZWRTdHlsZSA9IGlzSUUoMTApICYmIGdldENvbXB1dGVkU3R5bGUoaHRtbCk7XG5cbiAgcmV0dXJuIHtcbiAgICBoZWlnaHQ6IGdldFNpemUoJ0hlaWdodCcsIGJvZHksIGh0bWwsIGNvbXB1dGVkU3R5bGUpLFxuICAgIHdpZHRoOiBnZXRTaXplKCdXaWR0aCcsIGJvZHksIGh0bWwsIGNvbXB1dGVkU3R5bGUpXG4gIH07XG59XG5cbnZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG52YXIgY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cblxuXG5cblxudmFyIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuLyoqXG4gKiBHaXZlbiBlbGVtZW50IG9mZnNldHMsIGdlbmVyYXRlIGFuIG91dHB1dCBzaW1pbGFyIHRvIGdldEJvdW5kaW5nQ2xpZW50UmVjdFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IG9mZnNldHNcbiAqIEByZXR1cm5zIHtPYmplY3R9IENsaWVudFJlY3QgbGlrZSBvdXRwdXRcbiAqL1xuZnVuY3Rpb24gZ2V0Q2xpZW50UmVjdChvZmZzZXRzKSB7XG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgb2Zmc2V0cywge1xuICAgIHJpZ2h0OiBvZmZzZXRzLmxlZnQgKyBvZmZzZXRzLndpZHRoLFxuICAgIGJvdHRvbTogb2Zmc2V0cy50b3AgKyBvZmZzZXRzLmhlaWdodFxuICB9KTtcbn1cblxuLyoqXG4gKiBHZXQgYm91bmRpbmcgY2xpZW50IHJlY3Qgb2YgZ2l2ZW4gZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7T2JqZWN0fSBjbGllbnQgcmVjdFxuICovXG5mdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCkge1xuICB2YXIgcmVjdCA9IHt9O1xuXG4gIC8vIElFMTAgMTAgRklYOiBQbGVhc2UsIGRvbid0IGFzaywgdGhlIGVsZW1lbnQgaXNuJ3RcbiAgLy8gY29uc2lkZXJlZCBpbiBET00gaW4gc29tZSBjaXJjdW1zdGFuY2VzLi4uXG4gIC8vIFRoaXMgaXNuJ3QgcmVwcm9kdWNpYmxlIGluIElFMTAgY29tcGF0aWJpbGl0eSBtb2RlIG9mIElFMTFcbiAgdHJ5IHtcbiAgICBpZiAoaXNJRSgxMCkpIHtcbiAgICAgIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IGdldFNjcm9sbChlbGVtZW50LCAndG9wJyk7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IGdldFNjcm9sbChlbGVtZW50LCAnbGVmdCcpO1xuICAgICAgcmVjdC50b3AgKz0gc2Nyb2xsVG9wO1xuICAgICAgcmVjdC5sZWZ0ICs9IHNjcm9sbExlZnQ7XG4gICAgICByZWN0LmJvdHRvbSArPSBzY3JvbGxUb3A7XG4gICAgICByZWN0LnJpZ2h0ICs9IHNjcm9sbExlZnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0ge1xuICAgIGxlZnQ6IHJlY3QubGVmdCxcbiAgICB0b3A6IHJlY3QudG9wLFxuICAgIHdpZHRoOiByZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0LFxuICAgIGhlaWdodDogcmVjdC5ib3R0b20gLSByZWN0LnRvcFxuICB9O1xuXG4gIC8vIHN1YnRyYWN0IHNjcm9sbGJhciBzaXplIGZyb20gc2l6ZXNcbiAgdmFyIHNpemVzID0gZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnID8gZ2V0V2luZG93U2l6ZXMoZWxlbWVudC5vd25lckRvY3VtZW50KSA6IHt9O1xuICB2YXIgd2lkdGggPSBzaXplcy53aWR0aCB8fCBlbGVtZW50LmNsaWVudFdpZHRoIHx8IHJlc3VsdC5yaWdodCAtIHJlc3VsdC5sZWZ0O1xuICB2YXIgaGVpZ2h0ID0gc2l6ZXMuaGVpZ2h0IHx8IGVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IHJlc3VsdC5ib3R0b20gLSByZXN1bHQudG9wO1xuXG4gIHZhciBob3JpelNjcm9sbGJhciA9IGVsZW1lbnQub2Zmc2V0V2lkdGggLSB3aWR0aDtcbiAgdmFyIHZlcnRTY3JvbGxiYXIgPSBlbGVtZW50Lm9mZnNldEhlaWdodCAtIGhlaWdodDtcblxuICAvLyBpZiBhbiBoeXBvdGhldGljYWwgc2Nyb2xsYmFyIGlzIGRldGVjdGVkLCB3ZSBtdXN0IGJlIHN1cmUgaXQncyBub3QgYSBgYm9yZGVyYFxuICAvLyB3ZSBtYWtlIHRoaXMgY2hlY2sgY29uZGl0aW9uYWwgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnNcbiAgaWYgKGhvcml6U2Nyb2xsYmFyIHx8IHZlcnRTY3JvbGxiYXIpIHtcbiAgICB2YXIgc3R5bGVzID0gZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGVsZW1lbnQpO1xuICAgIGhvcml6U2Nyb2xsYmFyIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ3gnKTtcbiAgICB2ZXJ0U2Nyb2xsYmFyIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ3knKTtcblxuICAgIHJlc3VsdC53aWR0aCAtPSBob3JpelNjcm9sbGJhcjtcbiAgICByZXN1bHQuaGVpZ2h0IC09IHZlcnRTY3JvbGxiYXI7XG4gIH1cblxuICByZXR1cm4gZ2V0Q2xpZW50UmVjdChyZXN1bHQpO1xufVxuXG5mdW5jdGlvbiBnZXRPZmZzZXRSZWN0UmVsYXRpdmVUb0FyYml0cmFyeU5vZGUoY2hpbGRyZW4sIHBhcmVudCkge1xuICB2YXIgZml4ZWRQb3NpdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG5cbiAgdmFyIGlzSUUxMCA9IGlzSUUoMTApO1xuICB2YXIgaXNIVE1MID0gcGFyZW50Lm5vZGVOYW1lID09PSAnSFRNTCc7XG4gIHZhciBjaGlsZHJlblJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoY2hpbGRyZW4pO1xuICB2YXIgcGFyZW50UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChwYXJlbnQpO1xuICB2YXIgc2Nyb2xsUGFyZW50ID0gZ2V0U2Nyb2xsUGFyZW50KGNoaWxkcmVuKTtcblxuICB2YXIgc3R5bGVzID0gZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KHBhcmVudCk7XG4gIHZhciBib3JkZXJUb3BXaWR0aCA9IHBhcnNlRmxvYXQoc3R5bGVzLmJvcmRlclRvcFdpZHRoLCAxMCk7XG4gIHZhciBib3JkZXJMZWZ0V2lkdGggPSBwYXJzZUZsb2F0KHN0eWxlcy5ib3JkZXJMZWZ0V2lkdGgsIDEwKTtcblxuICAvLyBJbiBjYXNlcyB3aGVyZSB0aGUgcGFyZW50IGlzIGZpeGVkLCB3ZSBtdXN0IGlnbm9yZSBuZWdhdGl2ZSBzY3JvbGwgaW4gb2Zmc2V0IGNhbGNcbiAgaWYgKGZpeGVkUG9zaXRpb24gJiYgaXNIVE1MKSB7XG4gICAgcGFyZW50UmVjdC50b3AgPSBNYXRoLm1heChwYXJlbnRSZWN0LnRvcCwgMCk7XG4gICAgcGFyZW50UmVjdC5sZWZ0ID0gTWF0aC5tYXgocGFyZW50UmVjdC5sZWZ0LCAwKTtcbiAgfVxuICB2YXIgb2Zmc2V0cyA9IGdldENsaWVudFJlY3Qoe1xuICAgIHRvcDogY2hpbGRyZW5SZWN0LnRvcCAtIHBhcmVudFJlY3QudG9wIC0gYm9yZGVyVG9wV2lkdGgsXG4gICAgbGVmdDogY2hpbGRyZW5SZWN0LmxlZnQgLSBwYXJlbnRSZWN0LmxlZnQgLSBib3JkZXJMZWZ0V2lkdGgsXG4gICAgd2lkdGg6IGNoaWxkcmVuUmVjdC53aWR0aCxcbiAgICBoZWlnaHQ6IGNoaWxkcmVuUmVjdC5oZWlnaHRcbiAgfSk7XG4gIG9mZnNldHMubWFyZ2luVG9wID0gMDtcbiAgb2Zmc2V0cy5tYXJnaW5MZWZ0ID0gMDtcblxuICAvLyBTdWJ0cmFjdCBtYXJnaW5zIG9mIGRvY3VtZW50RWxlbWVudCBpbiBjYXNlIGl0J3MgYmVpbmcgdXNlZCBhcyBwYXJlbnRcbiAgLy8gd2UgZG8gdGhpcyBvbmx5IG9uIEhUTUwgYmVjYXVzZSBpdCdzIHRoZSBvbmx5IGVsZW1lbnQgdGhhdCBiZWhhdmVzXG4gIC8vIGRpZmZlcmVudGx5IHdoZW4gbWFyZ2lucyBhcmUgYXBwbGllZCB0byBpdC4gVGhlIG1hcmdpbnMgYXJlIGluY2x1ZGVkIGluXG4gIC8vIHRoZSBib3ggb2YgdGhlIGRvY3VtZW50RWxlbWVudCwgaW4gdGhlIG90aGVyIGNhc2VzIG5vdC5cbiAgaWYgKCFpc0lFMTAgJiYgaXNIVE1MKSB7XG4gICAgdmFyIG1hcmdpblRvcCA9IHBhcnNlRmxvYXQoc3R5bGVzLm1hcmdpblRvcCwgMTApO1xuICAgIHZhciBtYXJnaW5MZWZ0ID0gcGFyc2VGbG9hdChzdHlsZXMubWFyZ2luTGVmdCwgMTApO1xuXG4gICAgb2Zmc2V0cy50b3AgLT0gYm9yZGVyVG9wV2lkdGggLSBtYXJnaW5Ub3A7XG4gICAgb2Zmc2V0cy5ib3R0b20gLT0gYm9yZGVyVG9wV2lkdGggLSBtYXJnaW5Ub3A7XG4gICAgb2Zmc2V0cy5sZWZ0IC09IGJvcmRlckxlZnRXaWR0aCAtIG1hcmdpbkxlZnQ7XG4gICAgb2Zmc2V0cy5yaWdodCAtPSBib3JkZXJMZWZ0V2lkdGggLSBtYXJnaW5MZWZ0O1xuXG4gICAgLy8gQXR0YWNoIG1hcmdpblRvcCBhbmQgbWFyZ2luTGVmdCBiZWNhdXNlIGluIHNvbWUgY2lyY3Vtc3RhbmNlcyB3ZSBtYXkgbmVlZCB0aGVtXG4gICAgb2Zmc2V0cy5tYXJnaW5Ub3AgPSBtYXJnaW5Ub3A7XG4gICAgb2Zmc2V0cy5tYXJnaW5MZWZ0ID0gbWFyZ2luTGVmdDtcbiAgfVxuXG4gIGlmIChpc0lFMTAgJiYgIWZpeGVkUG9zaXRpb24gPyBwYXJlbnQuY29udGFpbnMoc2Nyb2xsUGFyZW50KSA6IHBhcmVudCA9PT0gc2Nyb2xsUGFyZW50ICYmIHNjcm9sbFBhcmVudC5ub2RlTmFtZSAhPT0gJ0JPRFknKSB7XG4gICAgb2Zmc2V0cyA9IGluY2x1ZGVTY3JvbGwob2Zmc2V0cywgcGFyZW50KTtcbiAgfVxuXG4gIHJldHVybiBvZmZzZXRzO1xufVxuXG5mdW5jdGlvbiBnZXRWaWV3cG9ydE9mZnNldFJlY3RSZWxhdGl2ZVRvQXJ0Yml0cmFyeU5vZGUoZWxlbWVudCkge1xuICB2YXIgZXhjbHVkZVNjcm9sbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgdmFyIGh0bWwgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB2YXIgcmVsYXRpdmVPZmZzZXQgPSBnZXRPZmZzZXRSZWN0UmVsYXRpdmVUb0FyYml0cmFyeU5vZGUoZWxlbWVudCwgaHRtbCk7XG4gIHZhciB3aWR0aCA9IE1hdGgubWF4KGh0bWwuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xuICB2YXIgaGVpZ2h0ID0gTWF0aC5tYXgoaHRtbC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcblxuICB2YXIgc2Nyb2xsVG9wID0gIWV4Y2x1ZGVTY3JvbGwgPyBnZXRTY3JvbGwoaHRtbCkgOiAwO1xuICB2YXIgc2Nyb2xsTGVmdCA9ICFleGNsdWRlU2Nyb2xsID8gZ2V0U2Nyb2xsKGh0bWwsICdsZWZ0JykgOiAwO1xuXG4gIHZhciBvZmZzZXQgPSB7XG4gICAgdG9wOiBzY3JvbGxUb3AgLSByZWxhdGl2ZU9mZnNldC50b3AgKyByZWxhdGl2ZU9mZnNldC5tYXJnaW5Ub3AsXG4gICAgbGVmdDogc2Nyb2xsTGVmdCAtIHJlbGF0aXZlT2Zmc2V0LmxlZnQgKyByZWxhdGl2ZU9mZnNldC5tYXJnaW5MZWZ0LFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodFxuICB9O1xuXG4gIHJldHVybiBnZXRDbGllbnRSZWN0KG9mZnNldCk7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIGVsZW1lbnQgaXMgZml4ZWQgb3IgaXMgaW5zaWRlIGEgZml4ZWQgcGFyZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gY3VzdG9tQ29udGFpbmVyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYW5zd2VyIHRvIFwiaXNGaXhlZD9cIlxuICovXG5mdW5jdGlvbiBpc0ZpeGVkKGVsZW1lbnQpIHtcbiAgdmFyIG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZTtcbiAgaWYgKG5vZGVOYW1lID09PSAnQk9EWScgfHwgbm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGVsZW1lbnQsICdwb3NpdGlvbicpID09PSAnZml4ZWQnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIHBhcmVudE5vZGUgPSBnZXRQYXJlbnROb2RlKGVsZW1lbnQpO1xuICBpZiAoIXBhcmVudE5vZGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGlzRml4ZWQocGFyZW50Tm9kZSk7XG59XG5cbi8qKlxuICogRmluZHMgdGhlIGZpcnN0IHBhcmVudCBvZiBhbiBlbGVtZW50IHRoYXQgaGFzIGEgdHJhbnNmb3JtZWQgcHJvcGVydHkgZGVmaW5lZFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7RWxlbWVudH0gZmlyc3QgdHJhbnNmb3JtZWQgcGFyZW50IG9yIGRvY3VtZW50RWxlbWVudFxuICovXG5cbmZ1bmN0aW9uIGdldEZpeGVkUG9zaXRpb25PZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuICAvLyBUaGlzIGNoZWNrIGlzIG5lZWRlZCB0byBhdm9pZCBlcnJvcnMgaW4gY2FzZSBvbmUgb2YgdGhlIGVsZW1lbnRzIGlzbid0IGRlZmluZWQgZm9yIGFueSByZWFzb25cbiAgaWYgKCFlbGVtZW50IHx8ICFlbGVtZW50LnBhcmVudEVsZW1lbnQgfHwgaXNJRSgpKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuICB2YXIgZWwgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gIHdoaWxlIChlbCAmJiBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHkoZWwsICd0cmFuc2Zvcm0nKSA9PT0gJ25vbmUnKSB7XG4gICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50O1xuICB9XG4gIHJldHVybiBlbCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG59XG5cbi8qKlxuICogQ29tcHV0ZWQgdGhlIGJvdW5kYXJpZXMgbGltaXRzIGFuZCByZXR1cm4gdGhlbVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcG9wcGVyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByZWZlcmVuY2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBwYWRkaW5nXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBib3VuZGFyaWVzRWxlbWVudCAtIEVsZW1lbnQgdXNlZCB0byBkZWZpbmUgdGhlIGJvdW5kYXJpZXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZml4ZWRQb3NpdGlvbiAtIElzIGluIGZpeGVkIHBvc2l0aW9uIG1vZGVcbiAqIEByZXR1cm5zIHtPYmplY3R9IENvb3JkaW5hdGVzIG9mIHRoZSBib3VuZGFyaWVzXG4gKi9cbmZ1bmN0aW9uIGdldEJvdW5kYXJpZXMocG9wcGVyLCByZWZlcmVuY2UsIHBhZGRpbmcsIGJvdW5kYXJpZXNFbGVtZW50KSB7XG4gIHZhciBmaXhlZFBvc2l0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDQgJiYgYXJndW1lbnRzWzRdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNF0gOiBmYWxzZTtcblxuICAvLyBOT1RFOiAxIERPTSBhY2Nlc3MgaGVyZVxuXG4gIHZhciBib3VuZGFyaWVzID0geyB0b3A6IDAsIGxlZnQ6IDAgfTtcbiAgdmFyIG9mZnNldFBhcmVudCA9IGZpeGVkUG9zaXRpb24gPyBnZXRGaXhlZFBvc2l0aW9uT2Zmc2V0UGFyZW50KHBvcHBlcikgOiBmaW5kQ29tbW9uT2Zmc2V0UGFyZW50KHBvcHBlciwgcmVmZXJlbmNlKTtcblxuICAvLyBIYW5kbGUgdmlld3BvcnQgY2FzZVxuICBpZiAoYm91bmRhcmllc0VsZW1lbnQgPT09ICd2aWV3cG9ydCcpIHtcbiAgICBib3VuZGFyaWVzID0gZ2V0Vmlld3BvcnRPZmZzZXRSZWN0UmVsYXRpdmVUb0FydGJpdHJhcnlOb2RlKG9mZnNldFBhcmVudCwgZml4ZWRQb3NpdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgLy8gSGFuZGxlIG90aGVyIGNhc2VzIGJhc2VkIG9uIERPTSBlbGVtZW50IHVzZWQgYXMgYm91bmRhcmllc1xuICAgIHZhciBib3VuZGFyaWVzTm9kZSA9IHZvaWQgMDtcbiAgICBpZiAoYm91bmRhcmllc0VsZW1lbnQgPT09ICdzY3JvbGxQYXJlbnQnKSB7XG4gICAgICBib3VuZGFyaWVzTm9kZSA9IGdldFNjcm9sbFBhcmVudChnZXRQYXJlbnROb2RlKHJlZmVyZW5jZSkpO1xuICAgICAgaWYgKGJvdW5kYXJpZXNOb2RlLm5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICAgICAgYm91bmRhcmllc05vZGUgPSBwb3BwZXIub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChib3VuZGFyaWVzRWxlbWVudCA9PT0gJ3dpbmRvdycpIHtcbiAgICAgIGJvdW5kYXJpZXNOb2RlID0gcG9wcGVyLm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBib3VuZGFyaWVzTm9kZSA9IGJvdW5kYXJpZXNFbGVtZW50O1xuICAgIH1cblxuICAgIHZhciBvZmZzZXRzID0gZ2V0T2Zmc2V0UmVjdFJlbGF0aXZlVG9BcmJpdHJhcnlOb2RlKGJvdW5kYXJpZXNOb2RlLCBvZmZzZXRQYXJlbnQsIGZpeGVkUG9zaXRpb24pO1xuXG4gICAgLy8gSW4gY2FzZSBvZiBIVE1MLCB3ZSBuZWVkIGEgZGlmZmVyZW50IGNvbXB1dGF0aW9uXG4gICAgaWYgKGJvdW5kYXJpZXNOb2RlLm5vZGVOYW1lID09PSAnSFRNTCcgJiYgIWlzRml4ZWQob2Zmc2V0UGFyZW50KSkge1xuICAgICAgdmFyIF9nZXRXaW5kb3dTaXplcyA9IGdldFdpbmRvd1NpemVzKHBvcHBlci5vd25lckRvY3VtZW50KSxcbiAgICAgICAgICBoZWlnaHQgPSBfZ2V0V2luZG93U2l6ZXMuaGVpZ2h0LFxuICAgICAgICAgIHdpZHRoID0gX2dldFdpbmRvd1NpemVzLndpZHRoO1xuXG4gICAgICBib3VuZGFyaWVzLnRvcCArPSBvZmZzZXRzLnRvcCAtIG9mZnNldHMubWFyZ2luVG9wO1xuICAgICAgYm91bmRhcmllcy5ib3R0b20gPSBoZWlnaHQgKyBvZmZzZXRzLnRvcDtcbiAgICAgIGJvdW5kYXJpZXMubGVmdCArPSBvZmZzZXRzLmxlZnQgLSBvZmZzZXRzLm1hcmdpbkxlZnQ7XG4gICAgICBib3VuZGFyaWVzLnJpZ2h0ID0gd2lkdGggKyBvZmZzZXRzLmxlZnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZvciBhbGwgdGhlIG90aGVyIERPTSBlbGVtZW50cywgdGhpcyBvbmUgaXMgZ29vZFxuICAgICAgYm91bmRhcmllcyA9IG9mZnNldHM7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHBhZGRpbmdzXG4gIHBhZGRpbmcgPSBwYWRkaW5nIHx8IDA7XG4gIHZhciBpc1BhZGRpbmdOdW1iZXIgPSB0eXBlb2YgcGFkZGluZyA9PT0gJ251bWJlcic7XG4gIGJvdW5kYXJpZXMubGVmdCArPSBpc1BhZGRpbmdOdW1iZXIgPyBwYWRkaW5nIDogcGFkZGluZy5sZWZ0IHx8IDA7XG4gIGJvdW5kYXJpZXMudG9wICs9IGlzUGFkZGluZ051bWJlciA/IHBhZGRpbmcgOiBwYWRkaW5nLnRvcCB8fCAwO1xuICBib3VuZGFyaWVzLnJpZ2h0IC09IGlzUGFkZGluZ051bWJlciA/IHBhZGRpbmcgOiBwYWRkaW5nLnJpZ2h0IHx8IDA7XG4gIGJvdW5kYXJpZXMuYm90dG9tIC09IGlzUGFkZGluZ051bWJlciA/IHBhZGRpbmcgOiBwYWRkaW5nLmJvdHRvbSB8fCAwO1xuXG4gIHJldHVybiBib3VuZGFyaWVzO1xufVxuXG5mdW5jdGlvbiBnZXRBcmVhKF9yZWYpIHtcbiAgdmFyIHdpZHRoID0gX3JlZi53aWR0aCxcbiAgICAgIGhlaWdodCA9IF9yZWYuaGVpZ2h0O1xuXG4gIHJldHVybiB3aWR0aCAqIGhlaWdodDtcbn1cblxuLyoqXG4gKiBVdGlsaXR5IHVzZWQgdG8gdHJhbnNmb3JtIHRoZSBgYXV0b2AgcGxhY2VtZW50IHRvIHRoZSBwbGFjZW1lbnQgd2l0aCBtb3JlXG4gKiBhdmFpbGFibGUgc3BhY2UuXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgdXBkYXRlIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBjb21wdXRlQXV0b1BsYWNlbWVudChwbGFjZW1lbnQsIHJlZlJlY3QsIHBvcHBlciwgcmVmZXJlbmNlLCBib3VuZGFyaWVzRWxlbWVudCkge1xuICB2YXIgcGFkZGluZyA9IGFyZ3VtZW50cy5sZW5ndGggPiA1ICYmIGFyZ3VtZW50c1s1XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzVdIDogMDtcblxuICBpZiAocGxhY2VtZW50LmluZGV4T2YoJ2F1dG8nKSA9PT0gLTEpIHtcbiAgICByZXR1cm4gcGxhY2VtZW50O1xuICB9XG5cbiAgdmFyIGJvdW5kYXJpZXMgPSBnZXRCb3VuZGFyaWVzKHBvcHBlciwgcmVmZXJlbmNlLCBwYWRkaW5nLCBib3VuZGFyaWVzRWxlbWVudCk7XG5cbiAgdmFyIHJlY3RzID0ge1xuICAgIHRvcDoge1xuICAgICAgd2lkdGg6IGJvdW5kYXJpZXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHJlZlJlY3QudG9wIC0gYm91bmRhcmllcy50b3BcbiAgICB9LFxuICAgIHJpZ2h0OiB7XG4gICAgICB3aWR0aDogYm91bmRhcmllcy5yaWdodCAtIHJlZlJlY3QucmlnaHQsXG4gICAgICBoZWlnaHQ6IGJvdW5kYXJpZXMuaGVpZ2h0XG4gICAgfSxcbiAgICBib3R0b206IHtcbiAgICAgIHdpZHRoOiBib3VuZGFyaWVzLndpZHRoLFxuICAgICAgaGVpZ2h0OiBib3VuZGFyaWVzLmJvdHRvbSAtIHJlZlJlY3QuYm90dG9tXG4gICAgfSxcbiAgICBsZWZ0OiB7XG4gICAgICB3aWR0aDogcmVmUmVjdC5sZWZ0IC0gYm91bmRhcmllcy5sZWZ0LFxuICAgICAgaGVpZ2h0OiBib3VuZGFyaWVzLmhlaWdodFxuICAgIH1cbiAgfTtcblxuICB2YXIgc29ydGVkQXJlYXMgPSBPYmplY3Qua2V5cyhyZWN0cykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gX2V4dGVuZHMoe1xuICAgICAga2V5OiBrZXlcbiAgICB9LCByZWN0c1trZXldLCB7XG4gICAgICBhcmVhOiBnZXRBcmVhKHJlY3RzW2tleV0pXG4gICAgfSk7XG4gIH0pLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYi5hcmVhIC0gYS5hcmVhO1xuICB9KTtcblxuICB2YXIgZmlsdGVyZWRBcmVhcyA9IHNvcnRlZEFyZWFzLmZpbHRlcihmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICB2YXIgd2lkdGggPSBfcmVmMi53aWR0aCxcbiAgICAgICAgaGVpZ2h0ID0gX3JlZjIuaGVpZ2h0O1xuICAgIHJldHVybiB3aWR0aCA+PSBwb3BwZXIuY2xpZW50V2lkdGggJiYgaGVpZ2h0ID49IHBvcHBlci5jbGllbnRIZWlnaHQ7XG4gIH0pO1xuXG4gIHZhciBjb21wdXRlZFBsYWNlbWVudCA9IGZpbHRlcmVkQXJlYXMubGVuZ3RoID4gMCA/IGZpbHRlcmVkQXJlYXNbMF0ua2V5IDogc29ydGVkQXJlYXNbMF0ua2V5O1xuXG4gIHZhciB2YXJpYXRpb24gPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVsxXTtcblxuICByZXR1cm4gY29tcHV0ZWRQbGFjZW1lbnQgKyAodmFyaWF0aW9uID8gJy0nICsgdmFyaWF0aW9uIDogJycpO1xufVxuXG4vKipcbiAqIEdldCBvZmZzZXRzIHRvIHRoZSByZWZlcmVuY2UgZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHBvcHBlciAtIHRoZSBwb3BwZXIgZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSByZWZlcmVuY2UgLSB0aGUgcmVmZXJlbmNlIGVsZW1lbnQgKHRoZSBwb3BwZXIgd2lsbCBiZSByZWxhdGl2ZSB0byB0aGlzKVxuICogQHBhcmFtIHtFbGVtZW50fSBmaXhlZFBvc2l0aW9uIC0gaXMgaW4gZml4ZWQgcG9zaXRpb24gbW9kZVxuICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9mZnNldHMgd2hpY2ggd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXJcbiAqL1xuZnVuY3Rpb24gZ2V0UmVmZXJlbmNlT2Zmc2V0cyhzdGF0ZSwgcG9wcGVyLCByZWZlcmVuY2UpIHtcbiAgdmFyIGZpeGVkUG9zaXRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IG51bGw7XG5cbiAgdmFyIGNvbW1vbk9mZnNldFBhcmVudCA9IGZpeGVkUG9zaXRpb24gPyBnZXRGaXhlZFBvc2l0aW9uT2Zmc2V0UGFyZW50KHBvcHBlcikgOiBmaW5kQ29tbW9uT2Zmc2V0UGFyZW50KHBvcHBlciwgcmVmZXJlbmNlKTtcbiAgcmV0dXJuIGdldE9mZnNldFJlY3RSZWxhdGl2ZVRvQXJiaXRyYXJ5Tm9kZShyZWZlcmVuY2UsIGNvbW1vbk9mZnNldFBhcmVudCwgZml4ZWRQb3NpdGlvbik7XG59XG5cbi8qKlxuICogR2V0IHRoZSBvdXRlciBzaXplcyBvZiB0aGUgZ2l2ZW4gZWxlbWVudCAob2Zmc2V0IHNpemUgKyBtYXJnaW5zKVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBvYmplY3QgY29udGFpbmluZyB3aWR0aCBhbmQgaGVpZ2h0IHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gZ2V0T3V0ZXJTaXplcyhlbGVtZW50KSB7XG4gIHZhciB3aW5kb3cgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gIHZhciBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgdmFyIHggPSBwYXJzZUZsb2F0KHN0eWxlcy5tYXJnaW5Ub3AgfHwgMCkgKyBwYXJzZUZsb2F0KHN0eWxlcy5tYXJnaW5Cb3R0b20gfHwgMCk7XG4gIHZhciB5ID0gcGFyc2VGbG9hdChzdHlsZXMubWFyZ2luTGVmdCB8fCAwKSArIHBhcnNlRmxvYXQoc3R5bGVzLm1hcmdpblJpZ2h0IHx8IDApO1xuICB2YXIgcmVzdWx0ID0ge1xuICAgIHdpZHRoOiBlbGVtZW50Lm9mZnNldFdpZHRoICsgeSxcbiAgICBoZWlnaHQ6IGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgeFxuICB9O1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldCB0aGUgb3Bwb3NpdGUgcGxhY2VtZW50IG9mIHRoZSBnaXZlbiBvbmVcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBwbGFjZW1lbnRcbiAqIEByZXR1cm5zIHtTdHJpbmd9IGZsaXBwZWQgcGxhY2VtZW50XG4gKi9cbmZ1bmN0aW9uIGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICB2YXIgaGFzaCA9IHsgbGVmdDogJ3JpZ2h0JywgcmlnaHQ6ICdsZWZ0JywgYm90dG9tOiAndG9wJywgdG9wOiAnYm90dG9tJyB9O1xuICByZXR1cm4gcGxhY2VtZW50LnJlcGxhY2UoL2xlZnR8cmlnaHR8Ym90dG9tfHRvcC9nLCBmdW5jdGlvbiAobWF0Y2hlZCkge1xuICAgIHJldHVybiBoYXNoW21hdGNoZWRdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBHZXQgb2Zmc2V0cyB0byB0aGUgcG9wcGVyXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9zaXRpb24gLSBDU1MgcG9zaXRpb24gdGhlIFBvcHBlciB3aWxsIGdldCBhcHBsaWVkXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwb3BwZXIgLSB0aGUgcG9wcGVyIGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWZlcmVuY2VPZmZzZXRzIC0gdGhlIHJlZmVyZW5jZSBvZmZzZXRzICh0aGUgcG9wcGVyIHdpbGwgYmUgcmVsYXRpdmUgdG8gdGhpcylcbiAqIEBwYXJhbSB7U3RyaW5nfSBwbGFjZW1lbnQgLSBvbmUgb2YgdGhlIHZhbGlkIHBsYWNlbWVudCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBwb3BwZXJPZmZzZXRzIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9mZnNldHMgd2hpY2ggd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXJcbiAqL1xuZnVuY3Rpb24gZ2V0UG9wcGVyT2Zmc2V0cyhwb3BwZXIsIHJlZmVyZW5jZU9mZnNldHMsIHBsYWNlbWVudCkge1xuICBwbGFjZW1lbnQgPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcblxuICAvLyBHZXQgcG9wcGVyIG5vZGUgc2l6ZXNcbiAgdmFyIHBvcHBlclJlY3QgPSBnZXRPdXRlclNpemVzKHBvcHBlcik7XG5cbiAgLy8gQWRkIHBvc2l0aW9uLCB3aWR0aCBhbmQgaGVpZ2h0IHRvIG91ciBvZmZzZXRzIG9iamVjdFxuICB2YXIgcG9wcGVyT2Zmc2V0cyA9IHtcbiAgICB3aWR0aDogcG9wcGVyUmVjdC53aWR0aCxcbiAgICBoZWlnaHQ6IHBvcHBlclJlY3QuaGVpZ2h0XG4gIH07XG5cbiAgLy8gZGVwZW5kaW5nIGJ5IHRoZSBwb3BwZXIgcGxhY2VtZW50IHdlIGhhdmUgdG8gY29tcHV0ZSBpdHMgb2Zmc2V0cyBzbGlnaHRseSBkaWZmZXJlbnRseVxuICB2YXIgaXNIb3JpeiA9IFsncmlnaHQnLCAnbGVmdCddLmluZGV4T2YocGxhY2VtZW50KSAhPT0gLTE7XG4gIHZhciBtYWluU2lkZSA9IGlzSG9yaXogPyAndG9wJyA6ICdsZWZ0JztcbiAgdmFyIHNlY29uZGFyeVNpZGUgPSBpc0hvcml6ID8gJ2xlZnQnIDogJ3RvcCc7XG4gIHZhciBtZWFzdXJlbWVudCA9IGlzSG9yaXogPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gIHZhciBzZWNvbmRhcnlNZWFzdXJlbWVudCA9ICFpc0hvcml6ID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gIHBvcHBlck9mZnNldHNbbWFpblNpZGVdID0gcmVmZXJlbmNlT2Zmc2V0c1ttYWluU2lkZV0gKyByZWZlcmVuY2VPZmZzZXRzW21lYXN1cmVtZW50XSAvIDIgLSBwb3BwZXJSZWN0W21lYXN1cmVtZW50XSAvIDI7XG4gIGlmIChwbGFjZW1lbnQgPT09IHNlY29uZGFyeVNpZGUpIHtcbiAgICBwb3BwZXJPZmZzZXRzW3NlY29uZGFyeVNpZGVdID0gcmVmZXJlbmNlT2Zmc2V0c1tzZWNvbmRhcnlTaWRlXSAtIHBvcHBlclJlY3Rbc2Vjb25kYXJ5TWVhc3VyZW1lbnRdO1xuICB9IGVsc2Uge1xuICAgIHBvcHBlck9mZnNldHNbc2Vjb25kYXJ5U2lkZV0gPSByZWZlcmVuY2VPZmZzZXRzW2dldE9wcG9zaXRlUGxhY2VtZW50KHNlY29uZGFyeVNpZGUpXTtcbiAgfVxuXG4gIHJldHVybiBwb3BwZXJPZmZzZXRzO1xufVxuXG4vKipcbiAqIE1pbWljcyB0aGUgYGZpbmRgIG1ldGhvZCBvZiBBcnJheVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtBcnJheX0gYXJyXG4gKiBAYXJndW1lbnQgcHJvcFxuICogQGFyZ3VtZW50IHZhbHVlXG4gKiBAcmV0dXJucyBpbmRleCBvciAtMVxuICovXG5mdW5jdGlvbiBmaW5kKGFyciwgY2hlY2spIHtcbiAgLy8gdXNlIG5hdGl2ZSBmaW5kIGlmIHN1cHBvcnRlZFxuICBpZiAoQXJyYXkucHJvdG90eXBlLmZpbmQpIHtcbiAgICByZXR1cm4gYXJyLmZpbmQoY2hlY2spO1xuICB9XG5cbiAgLy8gdXNlIGBmaWx0ZXJgIHRvIG9idGFpbiB0aGUgc2FtZSBiZWhhdmlvciBvZiBgZmluZGBcbiAgcmV0dXJuIGFyci5maWx0ZXIoY2hlY2spWzBdO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgaW5kZXggb2YgdGhlIG1hdGNoaW5nIG9iamVjdFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtBcnJheX0gYXJyXG4gKiBAYXJndW1lbnQgcHJvcFxuICogQGFyZ3VtZW50IHZhbHVlXG4gKiBAcmV0dXJucyBpbmRleCBvciAtMVxuICovXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyLCBwcm9wLCB2YWx1ZSkge1xuICAvLyB1c2UgbmF0aXZlIGZpbmRJbmRleCBpZiBzdXBwb3J0ZWRcbiAgaWYgKEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXgpIHtcbiAgICByZXR1cm4gYXJyLmZpbmRJbmRleChmdW5jdGlvbiAoY3VyKSB7XG4gICAgICByZXR1cm4gY3VyW3Byb3BdID09PSB2YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHVzZSBgZmluZGAgKyBgaW5kZXhPZmAgaWYgYGZpbmRJbmRleGAgaXNuJ3Qgc3VwcG9ydGVkXG4gIHZhciBtYXRjaCA9IGZpbmQoYXJyLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9ialtwcm9wXSA9PT0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gYXJyLmluZGV4T2YobWF0Y2gpO1xufVxuXG4vKipcbiAqIExvb3AgdHJvdWdoIHRoZSBsaXN0IG9mIG1vZGlmaWVycyBhbmQgcnVuIHRoZW0gaW4gb3JkZXIsXG4gKiBlYWNoIG9mIHRoZW0gd2lsbCB0aGVuIGVkaXQgdGhlIGRhdGEgb2JqZWN0LlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtkYXRhT2JqZWN0fSBkYXRhXG4gKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBlbmRzIC0gT3B0aW9uYWwgbW9kaWZpZXIgbmFtZSB1c2VkIGFzIHN0b3BwZXJcbiAqIEByZXR1cm5zIHtkYXRhT2JqZWN0fVxuICovXG5mdW5jdGlvbiBydW5Nb2RpZmllcnMobW9kaWZpZXJzLCBkYXRhLCBlbmRzKSB7XG4gIHZhciBtb2RpZmllcnNUb1J1biA9IGVuZHMgPT09IHVuZGVmaW5lZCA/IG1vZGlmaWVycyA6IG1vZGlmaWVycy5zbGljZSgwLCBmaW5kSW5kZXgobW9kaWZpZXJzLCAnbmFtZScsIGVuZHMpKTtcblxuICBtb2RpZmllcnNUb1J1bi5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIGlmIChtb2RpZmllclsnZnVuY3Rpb24nXSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBkb3Qtbm90YXRpb25cbiAgICAgIGNvbnNvbGUud2FybignYG1vZGlmaWVyLmZ1bmN0aW9uYCBpcyBkZXByZWNhdGVkLCB1c2UgYG1vZGlmaWVyLmZuYCEnKTtcbiAgICB9XG4gICAgdmFyIGZuID0gbW9kaWZpZXJbJ2Z1bmN0aW9uJ10gfHwgbW9kaWZpZXIuZm47IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgaWYgKG1vZGlmaWVyLmVuYWJsZWQgJiYgaXNGdW5jdGlvbihmbikpIHtcbiAgICAgIC8vIEFkZCBwcm9wZXJ0aWVzIHRvIG9mZnNldHMgdG8gbWFrZSB0aGVtIGEgY29tcGxldGUgY2xpZW50UmVjdCBvYmplY3RcbiAgICAgIC8vIHdlIGRvIHRoaXMgYmVmb3JlIGVhY2ggbW9kaWZpZXIgdG8gbWFrZSBzdXJlIHRoZSBwcmV2aW91cyBvbmUgZG9lc24ndFxuICAgICAgLy8gbWVzcyB3aXRoIHRoZXNlIHZhbHVlc1xuICAgICAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IGdldENsaWVudFJlY3QoZGF0YS5vZmZzZXRzLnBvcHBlcik7XG4gICAgICBkYXRhLm9mZnNldHMucmVmZXJlbmNlID0gZ2V0Q2xpZW50UmVjdChkYXRhLm9mZnNldHMucmVmZXJlbmNlKTtcblxuICAgICAgZGF0YSA9IGZuKGRhdGEsIG1vZGlmaWVyKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBwb3BwZXIsIGNvbXB1dGluZyB0aGUgbmV3IG9mZnNldHMgYW5kIGFwcGx5aW5nXG4gKiB0aGUgbmV3IHN0eWxlLjxiciAvPlxuICogUHJlZmVyIGBzY2hlZHVsZVVwZGF0ZWAgb3ZlciBgdXBkYXRlYCBiZWNhdXNlIG9mIHBlcmZvcm1hbmNlIHJlYXNvbnMuXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgLy8gaWYgcG9wcGVyIGlzIGRlc3Ryb3llZCwgZG9uJ3QgcGVyZm9ybSBhbnkgZnVydGhlciB1cGRhdGVcbiAgaWYgKHRoaXMuc3RhdGUuaXNEZXN0cm95ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZGF0YSA9IHtcbiAgICBpbnN0YW5jZTogdGhpcyxcbiAgICBzdHlsZXM6IHt9LFxuICAgIGFycm93U3R5bGVzOiB7fSxcbiAgICBhdHRyaWJ1dGVzOiB7fSxcbiAgICBmbGlwcGVkOiBmYWxzZSxcbiAgICBvZmZzZXRzOiB7fVxuICB9O1xuXG4gIC8vIGNvbXB1dGUgcmVmZXJlbmNlIGVsZW1lbnQgb2Zmc2V0c1xuICBkYXRhLm9mZnNldHMucmVmZXJlbmNlID0gZ2V0UmVmZXJlbmNlT2Zmc2V0cyh0aGlzLnN0YXRlLCB0aGlzLnBvcHBlciwgdGhpcy5yZWZlcmVuY2UsIHRoaXMub3B0aW9ucy5wb3NpdGlvbkZpeGVkKTtcblxuICAvLyBjb21wdXRlIGF1dG8gcGxhY2VtZW50LCBzdG9yZSBwbGFjZW1lbnQgaW5zaWRlIHRoZSBkYXRhIG9iamVjdCxcbiAgLy8gbW9kaWZpZXJzIHdpbGwgYmUgYWJsZSB0byBlZGl0IGBwbGFjZW1lbnRgIGlmIG5lZWRlZFxuICAvLyBhbmQgcmVmZXIgdG8gb3JpZ2luYWxQbGFjZW1lbnQgdG8ga25vdyB0aGUgb3JpZ2luYWwgdmFsdWVcbiAgZGF0YS5wbGFjZW1lbnQgPSBjb21wdXRlQXV0b1BsYWNlbWVudCh0aGlzLm9wdGlvbnMucGxhY2VtZW50LCBkYXRhLm9mZnNldHMucmVmZXJlbmNlLCB0aGlzLnBvcHBlciwgdGhpcy5yZWZlcmVuY2UsIHRoaXMub3B0aW9ucy5tb2RpZmllcnMuZmxpcC5ib3VuZGFyaWVzRWxlbWVudCwgdGhpcy5vcHRpb25zLm1vZGlmaWVycy5mbGlwLnBhZGRpbmcpO1xuXG4gIC8vIHN0b3JlIHRoZSBjb21wdXRlZCBwbGFjZW1lbnQgaW5zaWRlIGBvcmlnaW5hbFBsYWNlbWVudGBcbiAgZGF0YS5vcmlnaW5hbFBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50O1xuXG4gIGRhdGEucG9zaXRpb25GaXhlZCA9IHRoaXMub3B0aW9ucy5wb3NpdGlvbkZpeGVkO1xuXG4gIC8vIGNvbXB1dGUgdGhlIHBvcHBlciBvZmZzZXRzXG4gIGRhdGEub2Zmc2V0cy5wb3BwZXIgPSBnZXRQb3BwZXJPZmZzZXRzKHRoaXMucG9wcGVyLCBkYXRhLm9mZnNldHMucmVmZXJlbmNlLCBkYXRhLnBsYWNlbWVudCk7XG5cbiAgZGF0YS5vZmZzZXRzLnBvcHBlci5wb3NpdGlvbiA9IHRoaXMub3B0aW9ucy5wb3NpdGlvbkZpeGVkID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7XG5cbiAgLy8gcnVuIHRoZSBtb2RpZmllcnNcbiAgZGF0YSA9IHJ1bk1vZGlmaWVycyh0aGlzLm1vZGlmaWVycywgZGF0YSk7XG5cbiAgLy8gdGhlIGZpcnN0IGB1cGRhdGVgIHdpbGwgY2FsbCBgb25DcmVhdGVgIGNhbGxiYWNrXG4gIC8vIHRoZSBvdGhlciBvbmVzIHdpbGwgY2FsbCBgb25VcGRhdGVgIGNhbGxiYWNrXG4gIGlmICghdGhpcy5zdGF0ZS5pc0NyZWF0ZWQpIHtcbiAgICB0aGlzLnN0YXRlLmlzQ3JlYXRlZCA9IHRydWU7XG4gICAgdGhpcy5vcHRpb25zLm9uQ3JlYXRlKGRhdGEpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMub3B0aW9ucy5vblVwZGF0ZShkYXRhKTtcbiAgfVxufVxuXG4vKipcbiAqIEhlbHBlciB1c2VkIHRvIGtub3cgaWYgdGhlIGdpdmVuIG1vZGlmaWVyIGlzIGVuYWJsZWQuXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNNb2RpZmllckVuYWJsZWQobW9kaWZpZXJzLCBtb2RpZmllck5hbWUpIHtcbiAgcmV0dXJuIG1vZGlmaWVycy5zb21lKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgICAgIGVuYWJsZWQgPSBfcmVmLmVuYWJsZWQ7XG4gICAgcmV0dXJuIGVuYWJsZWQgJiYgbmFtZSA9PT0gbW9kaWZpZXJOYW1lO1xuICB9KTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHByZWZpeGVkIHN1cHBvcnRlZCBwcm9wZXJ0eSBuYW1lXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge1N0cmluZ30gcHJvcGVydHkgKGNhbWVsQ2FzZSlcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHByZWZpeGVkIHByb3BlcnR5IChjYW1lbENhc2Ugb3IgUGFzY2FsQ2FzZSwgZGVwZW5kaW5nIG9uIHRoZSB2ZW5kb3IgcHJlZml4KVxuICovXG5mdW5jdGlvbiBnZXRTdXBwb3J0ZWRQcm9wZXJ0eU5hbWUocHJvcGVydHkpIHtcbiAgdmFyIHByZWZpeGVzID0gW2ZhbHNlLCAnbXMnLCAnV2Via2l0JywgJ01veicsICdPJ107XG4gIHZhciB1cHBlclByb3AgPSBwcm9wZXJ0eS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3BlcnR5LnNsaWNlKDEpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcHJlZml4ID0gcHJlZml4ZXNbaV07XG4gICAgdmFyIHRvQ2hlY2sgPSBwcmVmaXggPyAnJyArIHByZWZpeCArIHVwcGVyUHJvcCA6IHByb3BlcnR5O1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQuYm9keS5zdHlsZVt0b0NoZWNrXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0b0NoZWNrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBEZXN0cm95cyB0aGUgcG9wcGVyLlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlclxuICovXG5mdW5jdGlvbiBkZXN0cm95KCkge1xuICB0aGlzLnN0YXRlLmlzRGVzdHJveWVkID0gdHJ1ZTtcblxuICAvLyB0b3VjaCBET00gb25seSBpZiBgYXBwbHlTdHlsZWAgbW9kaWZpZXIgaXMgZW5hYmxlZFxuICBpZiAoaXNNb2RpZmllckVuYWJsZWQodGhpcy5tb2RpZmllcnMsICdhcHBseVN0eWxlJykpIHtcbiAgICB0aGlzLnBvcHBlci5yZW1vdmVBdHRyaWJ1dGUoJ3gtcGxhY2VtZW50Jyk7XG4gICAgdGhpcy5wb3BwZXIuc3R5bGUucG9zaXRpb24gPSAnJztcbiAgICB0aGlzLnBvcHBlci5zdHlsZS50b3AgPSAnJztcbiAgICB0aGlzLnBvcHBlci5zdHlsZS5sZWZ0ID0gJyc7XG4gICAgdGhpcy5wb3BwZXIuc3R5bGUucmlnaHQgPSAnJztcbiAgICB0aGlzLnBvcHBlci5zdHlsZS5ib3R0b20gPSAnJztcbiAgICB0aGlzLnBvcHBlci5zdHlsZS53aWxsQ2hhbmdlID0gJyc7XG4gICAgdGhpcy5wb3BwZXIuc3R5bGVbZ2V0U3VwcG9ydGVkUHJvcGVydHlOYW1lKCd0cmFuc2Zvcm0nKV0gPSAnJztcbiAgfVxuXG4gIHRoaXMuZGlzYWJsZUV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgLy8gcmVtb3ZlIHRoZSBwb3BwZXIgaWYgdXNlciBleHBsaWNpdHkgYXNrZWQgZm9yIHRoZSBkZWxldGlvbiBvbiBkZXN0cm95XG4gIC8vIGRvIG5vdCB1c2UgYHJlbW92ZWAgYmVjYXVzZSBJRTExIGRvZXNuJ3Qgc3VwcG9ydCBpdFxuICBpZiAodGhpcy5vcHRpb25zLnJlbW92ZU9uRGVzdHJveSkge1xuICAgIHRoaXMucG9wcGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5wb3BwZXIpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vKipcbiAqIEdldCB0aGUgd2luZG93IGFzc29jaWF0ZWQgd2l0aCB0aGUgZWxlbWVudFxuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7V2luZG93fVxuICovXG5mdW5jdGlvbiBnZXRXaW5kb3coZWxlbWVudCkge1xuICB2YXIgb3duZXJEb2N1bWVudCA9IGVsZW1lbnQub3duZXJEb2N1bWVudDtcbiAgcmV0dXJuIG93bmVyRG9jdW1lbnQgPyBvd25lckRvY3VtZW50LmRlZmF1bHRWaWV3IDogd2luZG93O1xufVxuXG5mdW5jdGlvbiBhdHRhY2hUb1Njcm9sbFBhcmVudHMoc2Nyb2xsUGFyZW50LCBldmVudCwgY2FsbGJhY2ssIHNjcm9sbFBhcmVudHMpIHtcbiAgdmFyIGlzQm9keSA9IHNjcm9sbFBhcmVudC5ub2RlTmFtZSA9PT0gJ0JPRFknO1xuICB2YXIgdGFyZ2V0ID0gaXNCb2R5ID8gc2Nyb2xsUGFyZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgOiBzY3JvbGxQYXJlbnQ7XG4gIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjaywgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gIGlmICghaXNCb2R5KSB7XG4gICAgYXR0YWNoVG9TY3JvbGxQYXJlbnRzKGdldFNjcm9sbFBhcmVudCh0YXJnZXQucGFyZW50Tm9kZSksIGV2ZW50LCBjYWxsYmFjaywgc2Nyb2xsUGFyZW50cyk7XG4gIH1cbiAgc2Nyb2xsUGFyZW50cy5wdXNoKHRhcmdldCk7XG59XG5cbi8qKlxuICogU2V0dXAgbmVlZGVkIGV2ZW50IGxpc3RlbmVycyB1c2VkIHRvIHVwZGF0ZSB0aGUgcG9wcGVyIHBvc2l0aW9uXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzZXR1cEV2ZW50TGlzdGVuZXJzKHJlZmVyZW5jZSwgb3B0aW9ucywgc3RhdGUsIHVwZGF0ZUJvdW5kKSB7XG4gIC8vIFJlc2l6ZSBldmVudCBsaXN0ZW5lciBvbiB3aW5kb3dcbiAgc3RhdGUudXBkYXRlQm91bmQgPSB1cGRhdGVCb3VuZDtcbiAgZ2V0V2luZG93KHJlZmVyZW5jZSkuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc3RhdGUudXBkYXRlQm91bmQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICAvLyBTY3JvbGwgZXZlbnQgbGlzdGVuZXIgb24gc2Nyb2xsIHBhcmVudHNcbiAgdmFyIHNjcm9sbEVsZW1lbnQgPSBnZXRTY3JvbGxQYXJlbnQocmVmZXJlbmNlKTtcbiAgYXR0YWNoVG9TY3JvbGxQYXJlbnRzKHNjcm9sbEVsZW1lbnQsICdzY3JvbGwnLCBzdGF0ZS51cGRhdGVCb3VuZCwgc3RhdGUuc2Nyb2xsUGFyZW50cyk7XG4gIHN0YXRlLnNjcm9sbEVsZW1lbnQgPSBzY3JvbGxFbGVtZW50O1xuICBzdGF0ZS5ldmVudHNFbmFibGVkID0gdHJ1ZTtcblxuICByZXR1cm4gc3RhdGU7XG59XG5cbi8qKlxuICogSXQgd2lsbCBhZGQgcmVzaXplL3Njcm9sbCBldmVudHMgYW5kIHN0YXJ0IHJlY2FsY3VsYXRpbmdcbiAqIHBvc2l0aW9uIG9mIHRoZSBwb3BwZXIgZWxlbWVudCB3aGVuIHRoZXkgYXJlIHRyaWdnZXJlZC5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXJcbiAqL1xuZnVuY3Rpb24gZW5hYmxlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gIGlmICghdGhpcy5zdGF0ZS5ldmVudHNFbmFibGVkKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHNldHVwRXZlbnRMaXN0ZW5lcnModGhpcy5yZWZlcmVuY2UsIHRoaXMub3B0aW9ucywgdGhpcy5zdGF0ZSwgdGhpcy5zY2hlZHVsZVVwZGF0ZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzIHVzZWQgdG8gdXBkYXRlIHRoZSBwb3BwZXIgcG9zaXRpb25cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHJlZmVyZW5jZSwgc3RhdGUpIHtcbiAgLy8gUmVtb3ZlIHJlc2l6ZSBldmVudCBsaXN0ZW5lciBvbiB3aW5kb3dcbiAgZ2V0V2luZG93KHJlZmVyZW5jZSkucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc3RhdGUudXBkYXRlQm91bmQpO1xuXG4gIC8vIFJlbW92ZSBzY3JvbGwgZXZlbnQgbGlzdGVuZXIgb24gc2Nyb2xsIHBhcmVudHNcbiAgc3RhdGUuc2Nyb2xsUGFyZW50cy5mb3JFYWNoKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc3RhdGUudXBkYXRlQm91bmQpO1xuICB9KTtcblxuICAvLyBSZXNldCBzdGF0ZVxuICBzdGF0ZS51cGRhdGVCb3VuZCA9IG51bGw7XG4gIHN0YXRlLnNjcm9sbFBhcmVudHMgPSBbXTtcbiAgc3RhdGUuc2Nyb2xsRWxlbWVudCA9IG51bGw7XG4gIHN0YXRlLmV2ZW50c0VuYWJsZWQgPSBmYWxzZTtcbiAgcmV0dXJuIHN0YXRlO1xufVxuXG4vKipcbiAqIEl0IHdpbGwgcmVtb3ZlIHJlc2l6ZS9zY3JvbGwgZXZlbnRzIGFuZCB3b24ndCByZWNhbGN1bGF0ZSBwb3BwZXIgcG9zaXRpb25cbiAqIHdoZW4gdGhleSBhcmUgdHJpZ2dlcmVkLiBJdCBhbHNvIHdvbid0IHRyaWdnZXIgYG9uVXBkYXRlYCBjYWxsYmFjayBhbnltb3JlLFxuICogdW5sZXNzIHlvdSBjYWxsIGB1cGRhdGVgIG1ldGhvZCBtYW51YWxseS5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXJcbiAqL1xuZnVuY3Rpb24gZGlzYWJsZUV2ZW50TGlzdGVuZXJzKCkge1xuICBpZiAodGhpcy5zdGF0ZS5ldmVudHNFbmFibGVkKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5zY2hlZHVsZVVwZGF0ZSk7XG4gICAgdGhpcy5zdGF0ZSA9IHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMucmVmZXJlbmNlLCB0aGlzLnN0YXRlKTtcbiAgfVxufVxuXG4vKipcbiAqIFRlbGxzIGlmIGEgZ2l2ZW4gaW5wdXQgaXMgYSBudW1iZXJcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7Kn0gaW5wdXQgdG8gY2hlY2tcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzTnVtZXJpYyhuKSB7XG4gIHJldHVybiBuICE9PSAnJyAmJiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgaXNGaW5pdGUobik7XG59XG5cbi8qKlxuICogU2V0IHRoZSBzdHlsZSB0byB0aGUgZ2l2ZW4gcG9wcGVyXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnQgLSBFbGVtZW50IHRvIGFwcGx5IHRoZSBzdHlsZSB0b1xuICogQGFyZ3VtZW50IHtPYmplY3R9IHN0eWxlc1xuICogT2JqZWN0IHdpdGggYSBsaXN0IG9mIHByb3BlcnRpZXMgYW5kIHZhbHVlcyB3aGljaCB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gc2V0U3R5bGVzKGVsZW1lbnQsIHN0eWxlcykge1xuICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICB2YXIgdW5pdCA9ICcnO1xuICAgIC8vIGFkZCB1bml0IGlmIHRoZSB2YWx1ZSBpcyBudW1lcmljIGFuZCBpcyBvbmUgb2YgdGhlIGZvbGxvd2luZ1xuICAgIGlmIChbJ3dpZHRoJywgJ2hlaWdodCcsICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXS5pbmRleE9mKHByb3ApICE9PSAtMSAmJiBpc051bWVyaWMoc3R5bGVzW3Byb3BdKSkge1xuICAgICAgdW5pdCA9ICdweCc7XG4gICAgfVxuICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSBzdHlsZXNbcHJvcF0gKyB1bml0O1xuICB9KTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGF0dHJpYnV0ZXMgdG8gdGhlIGdpdmVuIHBvcHBlclxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50IC0gRWxlbWVudCB0byBhcHBseSB0aGUgYXR0cmlidXRlcyB0b1xuICogQGFyZ3VtZW50IHtPYmplY3R9IHN0eWxlc1xuICogT2JqZWN0IHdpdGggYSBsaXN0IG9mIHByb3BlcnRpZXMgYW5kIHZhbHVlcyB3aGljaCB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlcyhlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICB2YXIgdmFsdWUgPSBhdHRyaWJ1dGVzW3Byb3BdO1xuICAgIGlmICh2YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKHByb3AsIGF0dHJpYnV0ZXNbcHJvcF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShwcm9wKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEuc3R5bGVzIC0gTGlzdCBvZiBzdHlsZSBwcm9wZXJ0aWVzIC0gdmFsdWVzIHRvIGFwcGx5IHRvIHBvcHBlciBlbGVtZW50XG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YS5hdHRyaWJ1dGVzIC0gTGlzdCBvZiBhdHRyaWJ1dGUgcHJvcGVydGllcyAtIHZhbHVlcyB0byBhcHBseSB0byBwb3BwZXIgZWxlbWVudFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIHNhbWUgZGF0YSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gYXBwbHlTdHlsZShkYXRhKSB7XG4gIC8vIGFueSBwcm9wZXJ0eSBwcmVzZW50IGluIGBkYXRhLnN0eWxlc2Agd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIsXG4gIC8vIGluIHRoaXMgd2F5IHdlIGNhbiBtYWtlIHRoZSAzcmQgcGFydHkgbW9kaWZpZXJzIGFkZCBjdXN0b20gc3R5bGVzIHRvIGl0XG4gIC8vIEJlIGF3YXJlLCBtb2RpZmllcnMgY291bGQgb3ZlcnJpZGUgdGhlIHByb3BlcnRpZXMgZGVmaW5lZCBpbiB0aGUgcHJldmlvdXNcbiAgLy8gbGluZXMgb2YgdGhpcyBtb2RpZmllciFcbiAgc2V0U3R5bGVzKGRhdGEuaW5zdGFuY2UucG9wcGVyLCBkYXRhLnN0eWxlcyk7XG5cbiAgLy8gYW55IHByb3BlcnR5IHByZXNlbnQgaW4gYGRhdGEuYXR0cmlidXRlc2Agd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIsXG4gIC8vIHRoZXkgd2lsbCBiZSBzZXQgYXMgSFRNTCBhdHRyaWJ1dGVzIG9mIHRoZSBlbGVtZW50XG4gIHNldEF0dHJpYnV0ZXMoZGF0YS5pbnN0YW5jZS5wb3BwZXIsIGRhdGEuYXR0cmlidXRlcyk7XG5cbiAgLy8gaWYgYXJyb3dFbGVtZW50IGlzIGRlZmluZWQgYW5kIGFycm93U3R5bGVzIGhhcyBzb21lIHByb3BlcnRpZXNcbiAgaWYgKGRhdGEuYXJyb3dFbGVtZW50ICYmIE9iamVjdC5rZXlzKGRhdGEuYXJyb3dTdHlsZXMpLmxlbmd0aCkge1xuICAgIHNldFN0eWxlcyhkYXRhLmFycm93RWxlbWVudCwgZGF0YS5hcnJvd1N0eWxlcyk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIHgtcGxhY2VtZW50IGF0dHJpYnV0ZSBiZWZvcmUgZXZlcnl0aGluZyBlbHNlIGJlY2F1c2UgaXQgY291bGQgYmUgdXNlZFxuICogdG8gYWRkIG1hcmdpbnMgdG8gdGhlIHBvcHBlciBtYXJnaW5zIG5lZWRzIHRvIGJlIGNhbGN1bGF0ZWQgdG8gZ2V0IHRoZVxuICogY29ycmVjdCBwb3BwZXIgb2Zmc2V0cy5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIubW9kaWZpZXJzXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByZWZlcmVuY2UgLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgdXNlZCB0byBwb3NpdGlvbiB0aGUgcG9wcGVyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwb3BwZXIgLSBUaGUgSFRNTCBlbGVtZW50IHVzZWQgYXMgcG9wcGVyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFBvcHBlci5qcyBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGFwcGx5U3R5bGVPbkxvYWQocmVmZXJlbmNlLCBwb3BwZXIsIG9wdGlvbnMsIG1vZGlmaWVyT3B0aW9ucywgc3RhdGUpIHtcbiAgLy8gY29tcHV0ZSByZWZlcmVuY2UgZWxlbWVudCBvZmZzZXRzXG4gIHZhciByZWZlcmVuY2VPZmZzZXRzID0gZ2V0UmVmZXJlbmNlT2Zmc2V0cyhzdGF0ZSwgcG9wcGVyLCByZWZlcmVuY2UsIG9wdGlvbnMucG9zaXRpb25GaXhlZCk7XG5cbiAgLy8gY29tcHV0ZSBhdXRvIHBsYWNlbWVudCwgc3RvcmUgcGxhY2VtZW50IGluc2lkZSB0aGUgZGF0YSBvYmplY3QsXG4gIC8vIG1vZGlmaWVycyB3aWxsIGJlIGFibGUgdG8gZWRpdCBgcGxhY2VtZW50YCBpZiBuZWVkZWRcbiAgLy8gYW5kIHJlZmVyIHRvIG9yaWdpbmFsUGxhY2VtZW50IHRvIGtub3cgdGhlIG9yaWdpbmFsIHZhbHVlXG4gIHZhciBwbGFjZW1lbnQgPSBjb21wdXRlQXV0b1BsYWNlbWVudChvcHRpb25zLnBsYWNlbWVudCwgcmVmZXJlbmNlT2Zmc2V0cywgcG9wcGVyLCByZWZlcmVuY2UsIG9wdGlvbnMubW9kaWZpZXJzLmZsaXAuYm91bmRhcmllc0VsZW1lbnQsIG9wdGlvbnMubW9kaWZpZXJzLmZsaXAucGFkZGluZyk7XG5cbiAgcG9wcGVyLnNldEF0dHJpYnV0ZSgneC1wbGFjZW1lbnQnLCBwbGFjZW1lbnQpO1xuXG4gIC8vIEFwcGx5IGBwb3NpdGlvbmAgdG8gcG9wcGVyIGJlZm9yZSBhbnl0aGluZyBlbHNlIGJlY2F1c2VcbiAgLy8gd2l0aG91dCB0aGUgcG9zaXRpb24gYXBwbGllZCB3ZSBjYW4ndCBndWFyYW50ZWUgY29ycmVjdCBjb21wdXRhdGlvbnNcbiAgc2V0U3R5bGVzKHBvcHBlciwgeyBwb3NpdGlvbjogb3B0aW9ucy5wb3NpdGlvbkZpeGVkID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZScgfSk7XG5cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgYHVwZGF0ZWAgbWV0aG9kXG4gKiBAYXJndW1lbnQge0Jvb2xlYW59IHNob3VsZFJvdW5kIC0gSWYgdGhlIG9mZnNldHMgc2hvdWxkIGJlIHJvdW5kZWQgYXQgYWxsXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcG9wcGVyJ3MgcG9zaXRpb24gb2Zmc2V0cyByb3VuZGVkXG4gKlxuICogVGhlIHRhbGUgb2YgcGl4ZWwtcGVyZmVjdCBwb3NpdGlvbmluZy4gSXQncyBzdGlsbCBub3QgMTAwJSBwZXJmZWN0LCBidXQgYXNcbiAqIGdvb2QgYXMgaXQgY2FuIGJlIHdpdGhpbiByZWFzb24uXG4gKiBEaXNjdXNzaW9uIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9GZXpWcmFzdGEvcG9wcGVyLmpzL3B1bGwvNzE1XG4gKlxuICogTG93IERQSSBzY3JlZW5zIGNhdXNlIGEgcG9wcGVyIHRvIGJlIGJsdXJyeSBpZiBub3QgdXNpbmcgZnVsbCBwaXhlbHMgKFNhZmFyaVxuICogYXMgd2VsbCBvbiBIaWdoIERQSSBzY3JlZW5zKS5cbiAqXG4gKiBGaXJlZm94IHByZWZlcnMgbm8gcm91bmRpbmcgZm9yIHBvc2l0aW9uaW5nIGFuZCBkb2VzIG5vdCBoYXZlIGJsdXJyaW5lc3Mgb25cbiAqIGhpZ2ggRFBJIHNjcmVlbnMuXG4gKlxuICogT25seSBob3Jpem9udGFsIHBsYWNlbWVudCBhbmQgbGVmdC9yaWdodCB2YWx1ZXMgbmVlZCB0byBiZSBjb25zaWRlcmVkLlxuICovXG5mdW5jdGlvbiBnZXRSb3VuZGVkT2Zmc2V0cyhkYXRhLCBzaG91bGRSb3VuZCkge1xuICB2YXIgX2RhdGEkb2Zmc2V0cyA9IGRhdGEub2Zmc2V0cyxcbiAgICAgIHBvcHBlciA9IF9kYXRhJG9mZnNldHMucG9wcGVyLFxuICAgICAgcmVmZXJlbmNlID0gX2RhdGEkb2Zmc2V0cy5yZWZlcmVuY2U7XG4gIHZhciByb3VuZCA9IE1hdGgucm91bmQsXG4gICAgICBmbG9vciA9IE1hdGguZmxvb3I7XG5cbiAgdmFyIG5vUm91bmQgPSBmdW5jdGlvbiBub1JvdW5kKHYpIHtcbiAgICByZXR1cm4gdjtcbiAgfTtcblxuICB2YXIgcmVmZXJlbmNlV2lkdGggPSByb3VuZChyZWZlcmVuY2Uud2lkdGgpO1xuICB2YXIgcG9wcGVyV2lkdGggPSByb3VuZChwb3BwZXIud2lkdGgpO1xuXG4gIHZhciBpc1ZlcnRpY2FsID0gWydsZWZ0JywgJ3JpZ2h0J10uaW5kZXhPZihkYXRhLnBsYWNlbWVudCkgIT09IC0xO1xuICB2YXIgaXNWYXJpYXRpb24gPSBkYXRhLnBsYWNlbWVudC5pbmRleE9mKCctJykgIT09IC0xO1xuICB2YXIgc2FtZVdpZHRoUGFyaXR5ID0gcmVmZXJlbmNlV2lkdGggJSAyID09PSBwb3BwZXJXaWR0aCAlIDI7XG4gIHZhciBib3RoT2RkV2lkdGggPSByZWZlcmVuY2VXaWR0aCAlIDIgPT09IDEgJiYgcG9wcGVyV2lkdGggJSAyID09PSAxO1xuXG4gIHZhciBob3Jpem9udGFsVG9JbnRlZ2VyID0gIXNob3VsZFJvdW5kID8gbm9Sb3VuZCA6IGlzVmVydGljYWwgfHwgaXNWYXJpYXRpb24gfHwgc2FtZVdpZHRoUGFyaXR5ID8gcm91bmQgOiBmbG9vcjtcbiAgdmFyIHZlcnRpY2FsVG9JbnRlZ2VyID0gIXNob3VsZFJvdW5kID8gbm9Sb3VuZCA6IHJvdW5kO1xuXG4gIHJldHVybiB7XG4gICAgbGVmdDogaG9yaXpvbnRhbFRvSW50ZWdlcihib3RoT2RkV2lkdGggJiYgIWlzVmFyaWF0aW9uICYmIHNob3VsZFJvdW5kID8gcG9wcGVyLmxlZnQgLSAxIDogcG9wcGVyLmxlZnQpLFxuICAgIHRvcDogdmVydGljYWxUb0ludGVnZXIocG9wcGVyLnRvcCksXG4gICAgYm90dG9tOiB2ZXJ0aWNhbFRvSW50ZWdlcihwb3BwZXIuYm90dG9tKSxcbiAgICByaWdodDogaG9yaXpvbnRhbFRvSW50ZWdlcihwb3BwZXIucmlnaHQpXG4gIH07XG59XG5cbnZhciBpc0ZpcmVmb3ggPSBpc0Jyb3dzZXIgJiYgL0ZpcmVmb3gvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBjb21wdXRlU3R5bGUoZGF0YSwgb3B0aW9ucykge1xuICB2YXIgeCA9IG9wdGlvbnMueCxcbiAgICAgIHkgPSBvcHRpb25zLnk7XG4gIHZhciBwb3BwZXIgPSBkYXRhLm9mZnNldHMucG9wcGVyO1xuXG4gIC8vIFJlbW92ZSB0aGlzIGxlZ2FjeSBzdXBwb3J0IGluIFBvcHBlci5qcyB2MlxuXG4gIHZhciBsZWdhY3lHcHVBY2NlbGVyYXRpb25PcHRpb24gPSBmaW5kKGRhdGEuaW5zdGFuY2UubW9kaWZpZXJzLCBmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICByZXR1cm4gbW9kaWZpZXIubmFtZSA9PT0gJ2FwcGx5U3R5bGUnO1xuICB9KS5ncHVBY2NlbGVyYXRpb247XG4gIGlmIChsZWdhY3lHcHVBY2NlbGVyYXRpb25PcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnNvbGUud2FybignV0FSTklORzogYGdwdUFjY2VsZXJhdGlvbmAgb3B0aW9uIG1vdmVkIHRvIGBjb21wdXRlU3R5bGVgIG1vZGlmaWVyIGFuZCB3aWxsIG5vdCBiZSBzdXBwb3J0ZWQgaW4gZnV0dXJlIHZlcnNpb25zIG9mIFBvcHBlci5qcyEnKTtcbiAgfVxuICB2YXIgZ3B1QWNjZWxlcmF0aW9uID0gbGVnYWN5R3B1QWNjZWxlcmF0aW9uT3B0aW9uICE9PSB1bmRlZmluZWQgPyBsZWdhY3lHcHVBY2NlbGVyYXRpb25PcHRpb24gOiBvcHRpb25zLmdwdUFjY2VsZXJhdGlvbjtcblxuICB2YXIgb2Zmc2V0UGFyZW50ID0gZ2V0T2Zmc2V0UGFyZW50KGRhdGEuaW5zdGFuY2UucG9wcGVyKTtcbiAgdmFyIG9mZnNldFBhcmVudFJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qob2Zmc2V0UGFyZW50KTtcblxuICAvLyBTdHlsZXNcbiAgdmFyIHN0eWxlcyA9IHtcbiAgICBwb3NpdGlvbjogcG9wcGVyLnBvc2l0aW9uXG4gIH07XG5cbiAgdmFyIG9mZnNldHMgPSBnZXRSb3VuZGVkT2Zmc2V0cyhkYXRhLCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA8IDIgfHwgIWlzRmlyZWZveCk7XG5cbiAgdmFyIHNpZGVBID0geCA9PT0gJ2JvdHRvbScgPyAndG9wJyA6ICdib3R0b20nO1xuICB2YXIgc2lkZUIgPSB5ID09PSAncmlnaHQnID8gJ2xlZnQnIDogJ3JpZ2h0JztcblxuICAvLyBpZiBncHVBY2NlbGVyYXRpb24gaXMgc2V0IHRvIGB0cnVlYCBhbmQgdHJhbnNmb3JtIGlzIHN1cHBvcnRlZCxcbiAgLy8gIHdlIHVzZSBgdHJhbnNsYXRlM2RgIHRvIGFwcGx5IHRoZSBwb3NpdGlvbiB0byB0aGUgcG9wcGVyIHdlXG4gIC8vIGF1dG9tYXRpY2FsbHkgdXNlIHRoZSBzdXBwb3J0ZWQgcHJlZml4ZWQgdmVyc2lvbiBpZiBuZWVkZWRcbiAgdmFyIHByZWZpeGVkUHJvcGVydHkgPSBnZXRTdXBwb3J0ZWRQcm9wZXJ0eU5hbWUoJ3RyYW5zZm9ybScpO1xuXG4gIC8vIG5vdywgbGV0J3MgbWFrZSBhIHN0ZXAgYmFjayBhbmQgbG9vayBhdCB0aGlzIGNvZGUgY2xvc2VseSAod3RmPylcbiAgLy8gSWYgdGhlIGNvbnRlbnQgb2YgdGhlIHBvcHBlciBncm93cyBvbmNlIGl0J3MgYmVlbiBwb3NpdGlvbmVkLCBpdFxuICAvLyBtYXkgaGFwcGVuIHRoYXQgdGhlIHBvcHBlciBnZXRzIG1pc3BsYWNlZCBiZWNhdXNlIG9mIHRoZSBuZXcgY29udGVudFxuICAvLyBvdmVyZmxvd2luZyBpdHMgcmVmZXJlbmNlIGVsZW1lbnRcbiAgLy8gVG8gYXZvaWQgdGhpcyBwcm9ibGVtLCB3ZSBwcm92aWRlIHR3byBvcHRpb25zICh4IGFuZCB5KSwgd2hpY2ggYWxsb3dcbiAgLy8gdGhlIGNvbnN1bWVyIHRvIGRlZmluZSB0aGUgb2Zmc2V0IG9yaWdpbi5cbiAgLy8gSWYgd2UgcG9zaXRpb24gYSBwb3BwZXIgb24gdG9wIG9mIGEgcmVmZXJlbmNlIGVsZW1lbnQsIHdlIGNhbiBzZXRcbiAgLy8gYHhgIHRvIGB0b3BgIHRvIG1ha2UgdGhlIHBvcHBlciBncm93IHRvd2FyZHMgaXRzIHRvcCBpbnN0ZWFkIG9mXG4gIC8vIGl0cyBib3R0b20uXG4gIHZhciBsZWZ0ID0gdm9pZCAwLFxuICAgICAgdG9wID0gdm9pZCAwO1xuICBpZiAoc2lkZUEgPT09ICdib3R0b20nKSB7XG4gICAgLy8gd2hlbiBvZmZzZXRQYXJlbnQgaXMgPGh0bWw+IHRoZSBwb3NpdGlvbmluZyBpcyByZWxhdGl2ZSB0byB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4gKGV4Y2x1ZGluZyB0aGUgc2Nyb2xsYmFyKVxuICAgIC8vIGFuZCBub3QgdGhlIGJvdHRvbSBvZiB0aGUgaHRtbCBlbGVtZW50XG4gICAgaWYgKG9mZnNldFBhcmVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICB0b3AgPSAtb2Zmc2V0UGFyZW50LmNsaWVudEhlaWdodCArIG9mZnNldHMuYm90dG9tO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b3AgPSAtb2Zmc2V0UGFyZW50UmVjdC5oZWlnaHQgKyBvZmZzZXRzLmJvdHRvbTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdG9wID0gb2Zmc2V0cy50b3A7XG4gIH1cbiAgaWYgKHNpZGVCID09PSAncmlnaHQnKSB7XG4gICAgaWYgKG9mZnNldFBhcmVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICBsZWZ0ID0gLW9mZnNldFBhcmVudC5jbGllbnRXaWR0aCArIG9mZnNldHMucmlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlZnQgPSAtb2Zmc2V0UGFyZW50UmVjdC53aWR0aCArIG9mZnNldHMucmlnaHQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxlZnQgPSBvZmZzZXRzLmxlZnQ7XG4gIH1cbiAgaWYgKGdwdUFjY2VsZXJhdGlvbiAmJiBwcmVmaXhlZFByb3BlcnR5KSB7XG4gICAgc3R5bGVzW3ByZWZpeGVkUHJvcGVydHldID0gJ3RyYW5zbGF0ZTNkKCcgKyBsZWZ0ICsgJ3B4LCAnICsgdG9wICsgJ3B4LCAwKSc7XG4gICAgc3R5bGVzW3NpZGVBXSA9IDA7XG4gICAgc3R5bGVzW3NpZGVCXSA9IDA7XG4gICAgc3R5bGVzLndpbGxDaGFuZ2UgPSAndHJhbnNmb3JtJztcbiAgfSBlbHNlIHtcbiAgICAvLyBvdGh3ZXJpc2UsIHdlIHVzZSB0aGUgc3RhbmRhcmQgYHRvcGAsIGBsZWZ0YCwgYGJvdHRvbWAgYW5kIGByaWdodGAgcHJvcGVydGllc1xuICAgIHZhciBpbnZlcnRUb3AgPSBzaWRlQSA9PT0gJ2JvdHRvbScgPyAtMSA6IDE7XG4gICAgdmFyIGludmVydExlZnQgPSBzaWRlQiA9PT0gJ3JpZ2h0JyA/IC0xIDogMTtcbiAgICBzdHlsZXNbc2lkZUFdID0gdG9wICogaW52ZXJ0VG9wO1xuICAgIHN0eWxlc1tzaWRlQl0gPSBsZWZ0ICogaW52ZXJ0TGVmdDtcbiAgICBzdHlsZXMud2lsbENoYW5nZSA9IHNpZGVBICsgJywgJyArIHNpZGVCO1xuICB9XG5cbiAgLy8gQXR0cmlidXRlc1xuICB2YXIgYXR0cmlidXRlcyA9IHtcbiAgICAneC1wbGFjZW1lbnQnOiBkYXRhLnBsYWNlbWVudFxuICB9O1xuXG4gIC8vIFVwZGF0ZSBgZGF0YWAgYXR0cmlidXRlcywgc3R5bGVzIGFuZCBhcnJvd1N0eWxlc1xuICBkYXRhLmF0dHJpYnV0ZXMgPSBfZXh0ZW5kcyh7fSwgYXR0cmlidXRlcywgZGF0YS5hdHRyaWJ1dGVzKTtcbiAgZGF0YS5zdHlsZXMgPSBfZXh0ZW5kcyh7fSwgc3R5bGVzLCBkYXRhLnN0eWxlcyk7XG4gIGRhdGEuYXJyb3dTdHlsZXMgPSBfZXh0ZW5kcyh7fSwgZGF0YS5vZmZzZXRzLmFycm93LCBkYXRhLmFycm93U3R5bGVzKTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgdXNlZCB0byBrbm93IGlmIHRoZSBnaXZlbiBtb2RpZmllciBkZXBlbmRzIGZyb20gYW5vdGhlciBvbmUuPGJyIC8+XG4gKiBJdCBjaGVja3MgaWYgdGhlIG5lZWRlZCBtb2RpZmllciBpcyBsaXN0ZWQgYW5kIGVuYWJsZWQuXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnMgLSBsaXN0IG9mIG1vZGlmaWVyc1xuICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RpbmdOYW1lIC0gbmFtZSBvZiByZXF1ZXN0aW5nIG1vZGlmaWVyXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdGVkTmFtZSAtIG5hbWUgb2YgcmVxdWVzdGVkIG1vZGlmaWVyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNNb2RpZmllclJlcXVpcmVkKG1vZGlmaWVycywgcmVxdWVzdGluZ05hbWUsIHJlcXVlc3RlZE5hbWUpIHtcbiAgdmFyIHJlcXVlc3RpbmcgPSBmaW5kKG1vZGlmaWVycywgZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYubmFtZTtcbiAgICByZXR1cm4gbmFtZSA9PT0gcmVxdWVzdGluZ05hbWU7XG4gIH0pO1xuXG4gIHZhciBpc1JlcXVpcmVkID0gISFyZXF1ZXN0aW5nICYmIG1vZGlmaWVycy5zb21lKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIHJldHVybiBtb2RpZmllci5uYW1lID09PSByZXF1ZXN0ZWROYW1lICYmIG1vZGlmaWVyLmVuYWJsZWQgJiYgbW9kaWZpZXIub3JkZXIgPCByZXF1ZXN0aW5nLm9yZGVyO1xuICB9KTtcblxuICBpZiAoIWlzUmVxdWlyZWQpIHtcbiAgICB2YXIgX3JlcXVlc3RpbmcgPSAnYCcgKyByZXF1ZXN0aW5nTmFtZSArICdgJztcbiAgICB2YXIgcmVxdWVzdGVkID0gJ2AnICsgcmVxdWVzdGVkTmFtZSArICdgJztcbiAgICBjb25zb2xlLndhcm4ocmVxdWVzdGVkICsgJyBtb2RpZmllciBpcyByZXF1aXJlZCBieSAnICsgX3JlcXVlc3RpbmcgKyAnIG1vZGlmaWVyIGluIG9yZGVyIHRvIHdvcmssIGJlIHN1cmUgdG8gaW5jbHVkZSBpdCBiZWZvcmUgJyArIF9yZXF1ZXN0aW5nICsgJyEnKTtcbiAgfVxuICByZXR1cm4gaXNSZXF1aXJlZDtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSB1cGRhdGUgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGFycm93KGRhdGEsIG9wdGlvbnMpIHtcbiAgdmFyIF9kYXRhJG9mZnNldHMkYXJyb3c7XG5cbiAgLy8gYXJyb3cgZGVwZW5kcyBvbiBrZWVwVG9nZXRoZXIgaW4gb3JkZXIgdG8gd29ya1xuICBpZiAoIWlzTW9kaWZpZXJSZXF1aXJlZChkYXRhLmluc3RhbmNlLm1vZGlmaWVycywgJ2Fycm93JywgJ2tlZXBUb2dldGhlcicpKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICB2YXIgYXJyb3dFbGVtZW50ID0gb3B0aW9ucy5lbGVtZW50O1xuXG4gIC8vIGlmIGFycm93RWxlbWVudCBpcyBhIHN0cmluZywgc3VwcG9zZSBpdCdzIGEgQ1NTIHNlbGVjdG9yXG4gIGlmICh0eXBlb2YgYXJyb3dFbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgIGFycm93RWxlbWVudCA9IGRhdGEuaW5zdGFuY2UucG9wcGVyLnF1ZXJ5U2VsZWN0b3IoYXJyb3dFbGVtZW50KTtcblxuICAgIC8vIGlmIGFycm93RWxlbWVudCBpcyBub3QgZm91bmQsIGRvbid0IHJ1biB0aGUgbW9kaWZpZXJcbiAgICBpZiAoIWFycm93RWxlbWVudCkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGlmIHRoZSBhcnJvd0VsZW1lbnQgaXNuJ3QgYSBxdWVyeSBzZWxlY3RvciB3ZSBtdXN0IGNoZWNrIHRoYXQgdGhlXG4gICAgLy8gcHJvdmlkZWQgRE9NIG5vZGUgaXMgY2hpbGQgb2YgaXRzIHBvcHBlciBub2RlXG4gICAgaWYgKCFkYXRhLmluc3RhbmNlLnBvcHBlci5jb250YWlucyhhcnJvd0VsZW1lbnQpKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1dBUk5JTkc6IGBhcnJvdy5lbGVtZW50YCBtdXN0IGJlIGNoaWxkIG9mIGl0cyBwb3BwZXIgZWxlbWVudCEnKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuICB2YXIgX2RhdGEkb2Zmc2V0cyA9IGRhdGEub2Zmc2V0cyxcbiAgICAgIHBvcHBlciA9IF9kYXRhJG9mZnNldHMucG9wcGVyLFxuICAgICAgcmVmZXJlbmNlID0gX2RhdGEkb2Zmc2V0cy5yZWZlcmVuY2U7XG5cbiAgdmFyIGlzVmVydGljYWwgPSBbJ2xlZnQnLCAncmlnaHQnXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xO1xuXG4gIHZhciBsZW4gPSBpc1ZlcnRpY2FsID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuICB2YXIgc2lkZUNhcGl0YWxpemVkID0gaXNWZXJ0aWNhbCA/ICdUb3AnIDogJ0xlZnQnO1xuICB2YXIgc2lkZSA9IHNpZGVDYXBpdGFsaXplZC50b0xvd2VyQ2FzZSgpO1xuICB2YXIgYWx0U2lkZSA9IGlzVmVydGljYWwgPyAnbGVmdCcgOiAndG9wJztcbiAgdmFyIG9wU2lkZSA9IGlzVmVydGljYWwgPyAnYm90dG9tJyA6ICdyaWdodCc7XG4gIHZhciBhcnJvd0VsZW1lbnRTaXplID0gZ2V0T3V0ZXJTaXplcyhhcnJvd0VsZW1lbnQpW2xlbl07XG5cbiAgLy9cbiAgLy8gZXh0ZW5kcyBrZWVwVG9nZXRoZXIgYmVoYXZpb3IgbWFraW5nIHN1cmUgdGhlIHBvcHBlciBhbmQgaXRzXG4gIC8vIHJlZmVyZW5jZSBoYXZlIGVub3VnaCBwaXhlbHMgaW4gY29uanVuY3Rpb25cbiAgLy9cblxuICAvLyB0b3AvbGVmdCBzaWRlXG4gIGlmIChyZWZlcmVuY2Vbb3BTaWRlXSAtIGFycm93RWxlbWVudFNpemUgPCBwb3BwZXJbc2lkZV0pIHtcbiAgICBkYXRhLm9mZnNldHMucG9wcGVyW3NpZGVdIC09IHBvcHBlcltzaWRlXSAtIChyZWZlcmVuY2Vbb3BTaWRlXSAtIGFycm93RWxlbWVudFNpemUpO1xuICB9XG4gIC8vIGJvdHRvbS9yaWdodCBzaWRlXG4gIGlmIChyZWZlcmVuY2Vbc2lkZV0gKyBhcnJvd0VsZW1lbnRTaXplID4gcG9wcGVyW29wU2lkZV0pIHtcbiAgICBkYXRhLm9mZnNldHMucG9wcGVyW3NpZGVdICs9IHJlZmVyZW5jZVtzaWRlXSArIGFycm93RWxlbWVudFNpemUgLSBwb3BwZXJbb3BTaWRlXTtcbiAgfVxuICBkYXRhLm9mZnNldHMucG9wcGVyID0gZ2V0Q2xpZW50UmVjdChkYXRhLm9mZnNldHMucG9wcGVyKTtcblxuICAvLyBjb21wdXRlIGNlbnRlciBvZiB0aGUgcG9wcGVyXG4gIHZhciBjZW50ZXIgPSByZWZlcmVuY2Vbc2lkZV0gKyByZWZlcmVuY2VbbGVuXSAvIDIgLSBhcnJvd0VsZW1lbnRTaXplIC8gMjtcblxuICAvLyBDb21wdXRlIHRoZSBzaWRlVmFsdWUgdXNpbmcgdGhlIHVwZGF0ZWQgcG9wcGVyIG9mZnNldHNcbiAgLy8gdGFrZSBwb3BwZXIgbWFyZ2luIGluIGFjY291bnQgYmVjYXVzZSB3ZSBkb24ndCBoYXZlIHRoaXMgaW5mbyBhdmFpbGFibGVcbiAgdmFyIGNzcyA9IGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShkYXRhLmluc3RhbmNlLnBvcHBlcik7XG4gIHZhciBwb3BwZXJNYXJnaW5TaWRlID0gcGFyc2VGbG9hdChjc3NbJ21hcmdpbicgKyBzaWRlQ2FwaXRhbGl6ZWRdLCAxMCk7XG4gIHZhciBwb3BwZXJCb3JkZXJTaWRlID0gcGFyc2VGbG9hdChjc3NbJ2JvcmRlcicgKyBzaWRlQ2FwaXRhbGl6ZWQgKyAnV2lkdGgnXSwgMTApO1xuICB2YXIgc2lkZVZhbHVlID0gY2VudGVyIC0gZGF0YS5vZmZzZXRzLnBvcHBlcltzaWRlXSAtIHBvcHBlck1hcmdpblNpZGUgLSBwb3BwZXJCb3JkZXJTaWRlO1xuXG4gIC8vIHByZXZlbnQgYXJyb3dFbGVtZW50IGZyb20gYmVpbmcgcGxhY2VkIG5vdCBjb250aWd1b3VzbHkgdG8gaXRzIHBvcHBlclxuICBzaWRlVmFsdWUgPSBNYXRoLm1heChNYXRoLm1pbihwb3BwZXJbbGVuXSAtIGFycm93RWxlbWVudFNpemUsIHNpZGVWYWx1ZSksIDApO1xuXG4gIGRhdGEuYXJyb3dFbGVtZW50ID0gYXJyb3dFbGVtZW50O1xuICBkYXRhLm9mZnNldHMuYXJyb3cgPSAoX2RhdGEkb2Zmc2V0cyRhcnJvdyA9IHt9LCBkZWZpbmVQcm9wZXJ0eShfZGF0YSRvZmZzZXRzJGFycm93LCBzaWRlLCBNYXRoLnJvdW5kKHNpZGVWYWx1ZSkpLCBkZWZpbmVQcm9wZXJ0eShfZGF0YSRvZmZzZXRzJGFycm93LCBhbHRTaWRlLCAnJyksIF9kYXRhJG9mZnNldHMkYXJyb3cpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIEdldCB0aGUgb3Bwb3NpdGUgcGxhY2VtZW50IHZhcmlhdGlvbiBvZiB0aGUgZ2l2ZW4gb25lXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge1N0cmluZ30gcGxhY2VtZW50IHZhcmlhdGlvblxuICogQHJldHVybnMge1N0cmluZ30gZmxpcHBlZCBwbGFjZW1lbnQgdmFyaWF0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldE9wcG9zaXRlVmFyaWF0aW9uKHZhcmlhdGlvbikge1xuICBpZiAodmFyaWF0aW9uID09PSAnZW5kJykge1xuICAgIHJldHVybiAnc3RhcnQnO1xuICB9IGVsc2UgaWYgKHZhcmlhdGlvbiA9PT0gJ3N0YXJ0Jykge1xuICAgIHJldHVybiAnZW5kJztcbiAgfVxuICByZXR1cm4gdmFyaWF0aW9uO1xufVxuXG4vKipcbiAqIExpc3Qgb2YgYWNjZXB0ZWQgcGxhY2VtZW50cyB0byB1c2UgYXMgdmFsdWVzIG9mIHRoZSBgcGxhY2VtZW50YCBvcHRpb24uPGJyIC8+XG4gKiBWYWxpZCBwbGFjZW1lbnRzIGFyZTpcbiAqIC0gYGF1dG9gXG4gKiAtIGB0b3BgXG4gKiAtIGByaWdodGBcbiAqIC0gYGJvdHRvbWBcbiAqIC0gYGxlZnRgXG4gKlxuICogRWFjaCBwbGFjZW1lbnQgY2FuIGhhdmUgYSB2YXJpYXRpb24gZnJvbSB0aGlzIGxpc3Q6XG4gKiAtIGAtc3RhcnRgXG4gKiAtIGAtZW5kYFxuICpcbiAqIFZhcmlhdGlvbnMgYXJlIGludGVycHJldGVkIGVhc2lseSBpZiB5b3UgdGhpbmsgb2YgdGhlbSBhcyB0aGUgbGVmdCB0byByaWdodFxuICogd3JpdHRlbiBsYW5ndWFnZXMuIEhvcml6b250YWxseSAoYHRvcGAgYW5kIGBib3R0b21gKSwgYHN0YXJ0YCBpcyBsZWZ0IGFuZCBgZW5kYFxuICogaXMgcmlnaHQuPGJyIC8+XG4gKiBWZXJ0aWNhbGx5IChgbGVmdGAgYW5kIGByaWdodGApLCBgc3RhcnRgIGlzIHRvcCBhbmQgYGVuZGAgaXMgYm90dG9tLlxuICpcbiAqIFNvbWUgdmFsaWQgZXhhbXBsZXMgYXJlOlxuICogLSBgdG9wLWVuZGAgKG9uIHRvcCBvZiByZWZlcmVuY2UsIHJpZ2h0IGFsaWduZWQpXG4gKiAtIGByaWdodC1zdGFydGAgKG9uIHJpZ2h0IG9mIHJlZmVyZW5jZSwgdG9wIGFsaWduZWQpXG4gKiAtIGBib3R0b21gIChvbiBib3R0b20sIGNlbnRlcmVkKVxuICogLSBgYXV0by1lbmRgIChvbiB0aGUgc2lkZSB3aXRoIG1vcmUgc3BhY2UgYXZhaWxhYmxlLCBhbGlnbm1lbnQgZGVwZW5kcyBieSBwbGFjZW1lbnQpXG4gKlxuICogQHN0YXRpY1xuICogQHR5cGUge0FycmF5fVxuICogQGVudW0ge1N0cmluZ31cbiAqIEByZWFkb25seVxuICogQG1ldGhvZCBwbGFjZW1lbnRzXG4gKiBAbWVtYmVyb2YgUG9wcGVyXG4gKi9cbnZhciBwbGFjZW1lbnRzID0gWydhdXRvLXN0YXJ0JywgJ2F1dG8nLCAnYXV0by1lbmQnLCAndG9wLXN0YXJ0JywgJ3RvcCcsICd0b3AtZW5kJywgJ3JpZ2h0LXN0YXJ0JywgJ3JpZ2h0JywgJ3JpZ2h0LWVuZCcsICdib3R0b20tZW5kJywgJ2JvdHRvbScsICdib3R0b20tc3RhcnQnLCAnbGVmdC1lbmQnLCAnbGVmdCcsICdsZWZ0LXN0YXJ0J107XG5cbi8vIEdldCByaWQgb2YgYGF1dG9gIGBhdXRvLXN0YXJ0YCBhbmQgYGF1dG8tZW5kYFxudmFyIHZhbGlkUGxhY2VtZW50cyA9IHBsYWNlbWVudHMuc2xpY2UoMyk7XG5cbi8qKlxuICogR2l2ZW4gYW4gaW5pdGlhbCBwbGFjZW1lbnQsIHJldHVybnMgYWxsIHRoZSBzdWJzZXF1ZW50IHBsYWNlbWVudHNcbiAqIGNsb2Nrd2lzZSAob3IgY291bnRlci1jbG9ja3dpc2UpLlxuICpcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBwbGFjZW1lbnQgLSBBIHZhbGlkIHBsYWNlbWVudCAoaXQgYWNjZXB0cyB2YXJpYXRpb25zKVxuICogQGFyZ3VtZW50IHtCb29sZWFufSBjb3VudGVyIC0gU2V0IHRvIHRydWUgdG8gd2FsayB0aGUgcGxhY2VtZW50cyBjb3VudGVyY2xvY2t3aXNlXG4gKiBAcmV0dXJucyB7QXJyYXl9IHBsYWNlbWVudHMgaW5jbHVkaW5nIHRoZWlyIHZhcmlhdGlvbnNcbiAqL1xuZnVuY3Rpb24gY2xvY2t3aXNlKHBsYWNlbWVudCkge1xuICB2YXIgY291bnRlciA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgdmFyIGluZGV4ID0gdmFsaWRQbGFjZW1lbnRzLmluZGV4T2YocGxhY2VtZW50KTtcbiAgdmFyIGFyciA9IHZhbGlkUGxhY2VtZW50cy5zbGljZShpbmRleCArIDEpLmNvbmNhdCh2YWxpZFBsYWNlbWVudHMuc2xpY2UoMCwgaW5kZXgpKTtcbiAgcmV0dXJuIGNvdW50ZXIgPyBhcnIucmV2ZXJzZSgpIDogYXJyO1xufVxuXG52YXIgQkVIQVZJT1JTID0ge1xuICBGTElQOiAnZmxpcCcsXG4gIENMT0NLV0lTRTogJ2Nsb2Nrd2lzZScsXG4gIENPVU5URVJDTE9DS1dJU0U6ICdjb3VudGVyY2xvY2t3aXNlJ1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSB1cGRhdGUgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGZsaXAoZGF0YSwgb3B0aW9ucykge1xuICAvLyBpZiBgaW5uZXJgIG1vZGlmaWVyIGlzIGVuYWJsZWQsIHdlIGNhbid0IHVzZSB0aGUgYGZsaXBgIG1vZGlmaWVyXG4gIGlmIChpc01vZGlmaWVyRW5hYmxlZChkYXRhLmluc3RhbmNlLm1vZGlmaWVycywgJ2lubmVyJykpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGlmIChkYXRhLmZsaXBwZWQgJiYgZGF0YS5wbGFjZW1lbnQgPT09IGRhdGEub3JpZ2luYWxQbGFjZW1lbnQpIHtcbiAgICAvLyBzZWVtcyBsaWtlIGZsaXAgaXMgdHJ5aW5nIHRvIGxvb3AsIHByb2JhYmx5IHRoZXJlJ3Mgbm90IGVub3VnaCBzcGFjZSBvbiBhbnkgb2YgdGhlIGZsaXBwYWJsZSBzaWRlc1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgdmFyIGJvdW5kYXJpZXMgPSBnZXRCb3VuZGFyaWVzKGRhdGEuaW5zdGFuY2UucG9wcGVyLCBkYXRhLmluc3RhbmNlLnJlZmVyZW5jZSwgb3B0aW9ucy5wYWRkaW5nLCBvcHRpb25zLmJvdW5kYXJpZXNFbGVtZW50LCBkYXRhLnBvc2l0aW9uRml4ZWQpO1xuXG4gIHZhciBwbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuICB2YXIgcGxhY2VtZW50T3Bwb3NpdGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuICB2YXIgdmFyaWF0aW9uID0gZGF0YS5wbGFjZW1lbnQuc3BsaXQoJy0nKVsxXSB8fCAnJztcblxuICB2YXIgZmxpcE9yZGVyID0gW107XG5cbiAgc3dpdGNoIChvcHRpb25zLmJlaGF2aW9yKSB7XG4gICAgY2FzZSBCRUhBVklPUlMuRkxJUDpcbiAgICAgIGZsaXBPcmRlciA9IFtwbGFjZW1lbnQsIHBsYWNlbWVudE9wcG9zaXRlXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQkVIQVZJT1JTLkNMT0NLV0lTRTpcbiAgICAgIGZsaXBPcmRlciA9IGNsb2Nrd2lzZShwbGFjZW1lbnQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBCRUhBVklPUlMuQ09VTlRFUkNMT0NLV0lTRTpcbiAgICAgIGZsaXBPcmRlciA9IGNsb2Nrd2lzZShwbGFjZW1lbnQsIHRydWUpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGZsaXBPcmRlciA9IG9wdGlvbnMuYmVoYXZpb3I7XG4gIH1cblxuICBmbGlwT3JkZXIuZm9yRWFjaChmdW5jdGlvbiAoc3RlcCwgaW5kZXgpIHtcbiAgICBpZiAocGxhY2VtZW50ICE9PSBzdGVwIHx8IGZsaXBPcmRlci5sZW5ndGggPT09IGluZGV4ICsgMSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbiAgICBwbGFjZW1lbnRPcHBvc2l0ZSA9IGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCk7XG5cbiAgICB2YXIgcG9wcGVyT2Zmc2V0cyA9IGRhdGEub2Zmc2V0cy5wb3BwZXI7XG4gICAgdmFyIHJlZk9mZnNldHMgPSBkYXRhLm9mZnNldHMucmVmZXJlbmNlO1xuXG4gICAgLy8gdXNpbmcgZmxvb3IgYmVjYXVzZSB0aGUgcmVmZXJlbmNlIG9mZnNldHMgbWF5IGNvbnRhaW4gZGVjaW1hbHMgd2UgYXJlIG5vdCBnb2luZyB0byBjb25zaWRlciBoZXJlXG4gICAgdmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbiAgICB2YXIgb3ZlcmxhcHNSZWYgPSBwbGFjZW1lbnQgPT09ICdsZWZ0JyAmJiBmbG9vcihwb3BwZXJPZmZzZXRzLnJpZ2h0KSA+IGZsb29yKHJlZk9mZnNldHMubGVmdCkgfHwgcGxhY2VtZW50ID09PSAncmlnaHQnICYmIGZsb29yKHBvcHBlck9mZnNldHMubGVmdCkgPCBmbG9vcihyZWZPZmZzZXRzLnJpZ2h0KSB8fCBwbGFjZW1lbnQgPT09ICd0b3AnICYmIGZsb29yKHBvcHBlck9mZnNldHMuYm90dG9tKSA+IGZsb29yKHJlZk9mZnNldHMudG9wKSB8fCBwbGFjZW1lbnQgPT09ICdib3R0b20nICYmIGZsb29yKHBvcHBlck9mZnNldHMudG9wKSA8IGZsb29yKHJlZk9mZnNldHMuYm90dG9tKTtcblxuICAgIHZhciBvdmVyZmxvd3NMZWZ0ID0gZmxvb3IocG9wcGVyT2Zmc2V0cy5sZWZ0KSA8IGZsb29yKGJvdW5kYXJpZXMubGVmdCk7XG4gICAgdmFyIG92ZXJmbG93c1JpZ2h0ID0gZmxvb3IocG9wcGVyT2Zmc2V0cy5yaWdodCkgPiBmbG9vcihib3VuZGFyaWVzLnJpZ2h0KTtcbiAgICB2YXIgb3ZlcmZsb3dzVG9wID0gZmxvb3IocG9wcGVyT2Zmc2V0cy50b3ApIDwgZmxvb3IoYm91bmRhcmllcy50b3ApO1xuICAgIHZhciBvdmVyZmxvd3NCb3R0b20gPSBmbG9vcihwb3BwZXJPZmZzZXRzLmJvdHRvbSkgPiBmbG9vcihib3VuZGFyaWVzLmJvdHRvbSk7XG5cbiAgICB2YXIgb3ZlcmZsb3dzQm91bmRhcmllcyA9IHBsYWNlbWVudCA9PT0gJ2xlZnQnICYmIG92ZXJmbG93c0xlZnQgfHwgcGxhY2VtZW50ID09PSAncmlnaHQnICYmIG92ZXJmbG93c1JpZ2h0IHx8IHBsYWNlbWVudCA9PT0gJ3RvcCcgJiYgb3ZlcmZsb3dzVG9wIHx8IHBsYWNlbWVudCA9PT0gJ2JvdHRvbScgJiYgb3ZlcmZsb3dzQm90dG9tO1xuXG4gICAgLy8gZmxpcCB0aGUgdmFyaWF0aW9uIGlmIHJlcXVpcmVkXG4gICAgdmFyIGlzVmVydGljYWwgPSBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xO1xuXG4gICAgLy8gZmxpcHMgdmFyaWF0aW9uIGlmIHJlZmVyZW5jZSBlbGVtZW50IG92ZXJmbG93cyBib3VuZGFyaWVzXG4gICAgdmFyIGZsaXBwZWRWYXJpYXRpb25CeVJlZiA9ICEhb3B0aW9ucy5mbGlwVmFyaWF0aW9ucyAmJiAoaXNWZXJ0aWNhbCAmJiB2YXJpYXRpb24gPT09ICdzdGFydCcgJiYgb3ZlcmZsb3dzTGVmdCB8fCBpc1ZlcnRpY2FsICYmIHZhcmlhdGlvbiA9PT0gJ2VuZCcgJiYgb3ZlcmZsb3dzUmlnaHQgfHwgIWlzVmVydGljYWwgJiYgdmFyaWF0aW9uID09PSAnc3RhcnQnICYmIG92ZXJmbG93c1RvcCB8fCAhaXNWZXJ0aWNhbCAmJiB2YXJpYXRpb24gPT09ICdlbmQnICYmIG92ZXJmbG93c0JvdHRvbSk7XG5cbiAgICAvLyBmbGlwcyB2YXJpYXRpb24gaWYgcG9wcGVyIGNvbnRlbnQgb3ZlcmZsb3dzIGJvdW5kYXJpZXNcbiAgICB2YXIgZmxpcHBlZFZhcmlhdGlvbkJ5Q29udGVudCA9ICEhb3B0aW9ucy5mbGlwVmFyaWF0aW9uc0J5Q29udGVudCAmJiAoaXNWZXJ0aWNhbCAmJiB2YXJpYXRpb24gPT09ICdzdGFydCcgJiYgb3ZlcmZsb3dzUmlnaHQgfHwgaXNWZXJ0aWNhbCAmJiB2YXJpYXRpb24gPT09ICdlbmQnICYmIG92ZXJmbG93c0xlZnQgfHwgIWlzVmVydGljYWwgJiYgdmFyaWF0aW9uID09PSAnc3RhcnQnICYmIG92ZXJmbG93c0JvdHRvbSB8fCAhaXNWZXJ0aWNhbCAmJiB2YXJpYXRpb24gPT09ICdlbmQnICYmIG92ZXJmbG93c1RvcCk7XG5cbiAgICB2YXIgZmxpcHBlZFZhcmlhdGlvbiA9IGZsaXBwZWRWYXJpYXRpb25CeVJlZiB8fCBmbGlwcGVkVmFyaWF0aW9uQnlDb250ZW50O1xuXG4gICAgaWYgKG92ZXJsYXBzUmVmIHx8IG92ZXJmbG93c0JvdW5kYXJpZXMgfHwgZmxpcHBlZFZhcmlhdGlvbikge1xuICAgICAgLy8gdGhpcyBib29sZWFuIHRvIGRldGVjdCBhbnkgZmxpcCBsb29wXG4gICAgICBkYXRhLmZsaXBwZWQgPSB0cnVlO1xuXG4gICAgICBpZiAob3ZlcmxhcHNSZWYgfHwgb3ZlcmZsb3dzQm91bmRhcmllcykge1xuICAgICAgICBwbGFjZW1lbnQgPSBmbGlwT3JkZXJbaW5kZXggKyAxXTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZsaXBwZWRWYXJpYXRpb24pIHtcbiAgICAgICAgdmFyaWF0aW9uID0gZ2V0T3Bwb3NpdGVWYXJpYXRpb24odmFyaWF0aW9uKTtcbiAgICAgIH1cblxuICAgICAgZGF0YS5wbGFjZW1lbnQgPSBwbGFjZW1lbnQgKyAodmFyaWF0aW9uID8gJy0nICsgdmFyaWF0aW9uIDogJycpO1xuXG4gICAgICAvLyB0aGlzIG9iamVjdCBjb250YWlucyBgcG9zaXRpb25gLCB3ZSB3YW50IHRvIHByZXNlcnZlIGl0IGFsb25nIHdpdGhcbiAgICAgIC8vIGFueSBhZGRpdGlvbmFsIHByb3BlcnR5IHdlIG1heSBhZGQgaW4gdGhlIGZ1dHVyZVxuICAgICAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IF9leHRlbmRzKHt9LCBkYXRhLm9mZnNldHMucG9wcGVyLCBnZXRQb3BwZXJPZmZzZXRzKGRhdGEuaW5zdGFuY2UucG9wcGVyLCBkYXRhLm9mZnNldHMucmVmZXJlbmNlLCBkYXRhLnBsYWNlbWVudCkpO1xuXG4gICAgICBkYXRhID0gcnVuTW9kaWZpZXJzKGRhdGEuaW5zdGFuY2UubW9kaWZpZXJzLCBkYXRhLCAnZmxpcCcpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IHVwZGF0ZSBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24ga2VlcFRvZ2V0aGVyKGRhdGEpIHtcbiAgdmFyIF9kYXRhJG9mZnNldHMgPSBkYXRhLm9mZnNldHMsXG4gICAgICBwb3BwZXIgPSBfZGF0YSRvZmZzZXRzLnBvcHBlcixcbiAgICAgIHJlZmVyZW5jZSA9IF9kYXRhJG9mZnNldHMucmVmZXJlbmNlO1xuXG4gIHZhciBwbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuICB2YXIgZmxvb3IgPSBNYXRoLmZsb29yO1xuICB2YXIgaXNWZXJ0aWNhbCA9IFsndG9wJywgJ2JvdHRvbSddLmluZGV4T2YocGxhY2VtZW50KSAhPT0gLTE7XG4gIHZhciBzaWRlID0gaXNWZXJ0aWNhbCA/ICdyaWdodCcgOiAnYm90dG9tJztcbiAgdmFyIG9wU2lkZSA9IGlzVmVydGljYWwgPyAnbGVmdCcgOiAndG9wJztcbiAgdmFyIG1lYXN1cmVtZW50ID0gaXNWZXJ0aWNhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcblxuICBpZiAocG9wcGVyW3NpZGVdIDwgZmxvb3IocmVmZXJlbmNlW29wU2lkZV0pKSB7XG4gICAgZGF0YS5vZmZzZXRzLnBvcHBlcltvcFNpZGVdID0gZmxvb3IocmVmZXJlbmNlW29wU2lkZV0pIC0gcG9wcGVyW21lYXN1cmVtZW50XTtcbiAgfVxuICBpZiAocG9wcGVyW29wU2lkZV0gPiBmbG9vcihyZWZlcmVuY2Vbc2lkZV0pKSB7XG4gICAgZGF0YS5vZmZzZXRzLnBvcHBlcltvcFNpZGVdID0gZmxvb3IocmVmZXJlbmNlW3NpZGVdKTtcbiAgfVxuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGEgc3RyaW5nIGNvbnRhaW5pbmcgdmFsdWUgKyB1bml0IGludG8gYSBweCB2YWx1ZSBudW1iZXJcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIHttb2RpZmllcnN+b2Zmc2V0fVxuICogQHByaXZhdGVcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBzdHIgLSBWYWx1ZSArIHVuaXQgc3RyaW5nXG4gKiBAYXJndW1lbnQge1N0cmluZ30gbWVhc3VyZW1lbnQgLSBgaGVpZ2h0YCBvciBgd2lkdGhgXG4gKiBAYXJndW1lbnQge09iamVjdH0gcG9wcGVyT2Zmc2V0c1xuICogQGFyZ3VtZW50IHtPYmplY3R9IHJlZmVyZW5jZU9mZnNldHNcbiAqIEByZXR1cm5zIHtOdW1iZXJ8U3RyaW5nfVxuICogVmFsdWUgaW4gcGl4ZWxzLCBvciBvcmlnaW5hbCBzdHJpbmcgaWYgbm8gdmFsdWVzIHdlcmUgZXh0cmFjdGVkXG4gKi9cbmZ1bmN0aW9uIHRvVmFsdWUoc3RyLCBtZWFzdXJlbWVudCwgcG9wcGVyT2Zmc2V0cywgcmVmZXJlbmNlT2Zmc2V0cykge1xuICAvLyBzZXBhcmF0ZSB2YWx1ZSBmcm9tIHVuaXRcbiAgdmFyIHNwbGl0ID0gc3RyLm1hdGNoKC8oKD86XFwtfFxcKyk/XFxkKlxcLj9cXGQqKSguKikvKTtcbiAgdmFyIHZhbHVlID0gK3NwbGl0WzFdO1xuICB2YXIgdW5pdCA9IHNwbGl0WzJdO1xuXG4gIC8vIElmIGl0J3Mgbm90IGEgbnVtYmVyIGl0J3MgYW4gb3BlcmF0b3IsIEkgZ3Vlc3NcbiAgaWYgKCF2YWx1ZSkge1xuICAgIHJldHVybiBzdHI7XG4gIH1cblxuICBpZiAodW5pdC5pbmRleE9mKCclJykgPT09IDApIHtcbiAgICB2YXIgZWxlbWVudCA9IHZvaWQgMDtcbiAgICBzd2l0Y2ggKHVuaXQpIHtcbiAgICAgIGNhc2UgJyVwJzpcbiAgICAgICAgZWxlbWVudCA9IHBvcHBlck9mZnNldHM7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnJSc6XG4gICAgICBjYXNlICclcic6XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBlbGVtZW50ID0gcmVmZXJlbmNlT2Zmc2V0cztcbiAgICB9XG5cbiAgICB2YXIgcmVjdCA9IGdldENsaWVudFJlY3QoZWxlbWVudCk7XG4gICAgcmV0dXJuIHJlY3RbbWVhc3VyZW1lbnRdIC8gMTAwICogdmFsdWU7XG4gIH0gZWxzZSBpZiAodW5pdCA9PT0gJ3ZoJyB8fCB1bml0ID09PSAndncnKSB7XG4gICAgLy8gaWYgaXMgYSB2aCBvciB2dywgd2UgY2FsY3VsYXRlIHRoZSBzaXplIGJhc2VkIG9uIHRoZSB2aWV3cG9ydFxuICAgIHZhciBzaXplID0gdm9pZCAwO1xuICAgIGlmICh1bml0ID09PSAndmgnKSB7XG4gICAgICBzaXplID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0IHx8IDApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaXplID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcbiAgICB9XG4gICAgcmV0dXJuIHNpemUgLyAxMDAgKiB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICAvLyBpZiBpcyBhbiBleHBsaWNpdCBwaXhlbCB1bml0LCB3ZSBnZXQgcmlkIG9mIHRoZSB1bml0IGFuZCBrZWVwIHRoZSB2YWx1ZVxuICAgIC8vIGlmIGlzIGFuIGltcGxpY2l0IHVuaXQsIGl0J3MgcHgsIGFuZCB3ZSByZXR1cm4ganVzdCB0aGUgdmFsdWVcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbn1cblxuLyoqXG4gKiBQYXJzZSBhbiBgb2Zmc2V0YCBzdHJpbmcgdG8gZXh0cmFwb2xhdGUgYHhgIGFuZCBgeWAgbnVtZXJpYyBvZmZzZXRzLlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2Yge21vZGlmaWVyc35vZmZzZXR9XG4gKiBAcHJpdmF0ZVxuICogQGFyZ3VtZW50IHtTdHJpbmd9IG9mZnNldFxuICogQGFyZ3VtZW50IHtPYmplY3R9IHBvcHBlck9mZnNldHNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSByZWZlcmVuY2VPZmZzZXRzXG4gKiBAYXJndW1lbnQge1N0cmluZ30gYmFzZVBsYWNlbWVudFxuICogQHJldHVybnMge0FycmF5fSBhIHR3byBjZWxscyBhcnJheSB3aXRoIHggYW5kIHkgb2Zmc2V0cyBpbiBudW1iZXJzXG4gKi9cbmZ1bmN0aW9uIHBhcnNlT2Zmc2V0KG9mZnNldCwgcG9wcGVyT2Zmc2V0cywgcmVmZXJlbmNlT2Zmc2V0cywgYmFzZVBsYWNlbWVudCkge1xuICB2YXIgb2Zmc2V0cyA9IFswLCAwXTtcblxuICAvLyBVc2UgaGVpZ2h0IGlmIHBsYWNlbWVudCBpcyBsZWZ0IG9yIHJpZ2h0IGFuZCBpbmRleCBpcyAwIG90aGVyd2lzZSB1c2Ugd2lkdGhcbiAgLy8gaW4gdGhpcyB3YXkgdGhlIGZpcnN0IG9mZnNldCB3aWxsIHVzZSBhbiBheGlzIGFuZCB0aGUgc2Vjb25kIG9uZVxuICAvLyB3aWxsIHVzZSB0aGUgb3RoZXIgb25lXG4gIHZhciB1c2VIZWlnaHQgPSBbJ3JpZ2h0JywgJ2xlZnQnXS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpICE9PSAtMTtcblxuICAvLyBTcGxpdCB0aGUgb2Zmc2V0IHN0cmluZyB0byBvYnRhaW4gYSBsaXN0IG9mIHZhbHVlcyBhbmQgb3BlcmFuZHNcbiAgLy8gVGhlIHJlZ2V4IGFkZHJlc3NlcyB2YWx1ZXMgd2l0aCB0aGUgcGx1cyBvciBtaW51cyBzaWduIGluIGZyb250ICgrMTAsIC0yMCwgZXRjKVxuICB2YXIgZnJhZ21lbnRzID0gb2Zmc2V0LnNwbGl0KC8oXFwrfFxcLSkvKS5tYXAoZnVuY3Rpb24gKGZyYWcpIHtcbiAgICByZXR1cm4gZnJhZy50cmltKCk7XG4gIH0pO1xuXG4gIC8vIERldGVjdCBpZiB0aGUgb2Zmc2V0IHN0cmluZyBjb250YWlucyBhIHBhaXIgb2YgdmFsdWVzIG9yIGEgc2luZ2xlIG9uZVxuICAvLyB0aGV5IGNvdWxkIGJlIHNlcGFyYXRlZCBieSBjb21tYSBvciBzcGFjZVxuICB2YXIgZGl2aWRlciA9IGZyYWdtZW50cy5pbmRleE9mKGZpbmQoZnJhZ21lbnRzLCBmdW5jdGlvbiAoZnJhZykge1xuICAgIHJldHVybiBmcmFnLnNlYXJjaCgvLHxcXHMvKSAhPT0gLTE7XG4gIH0pKTtcblxuICBpZiAoZnJhZ21lbnRzW2RpdmlkZXJdICYmIGZyYWdtZW50c1tkaXZpZGVyXS5pbmRleE9mKCcsJykgPT09IC0xKSB7XG4gICAgY29uc29sZS53YXJuKCdPZmZzZXRzIHNlcGFyYXRlZCBieSB3aGl0ZSBzcGFjZShzKSBhcmUgZGVwcmVjYXRlZCwgdXNlIGEgY29tbWEgKCwpIGluc3RlYWQuJyk7XG4gIH1cblxuICAvLyBJZiBkaXZpZGVyIGlzIGZvdW5kLCB3ZSBkaXZpZGUgdGhlIGxpc3Qgb2YgdmFsdWVzIGFuZCBvcGVyYW5kcyB0byBkaXZpZGVcbiAgLy8gdGhlbSBieSBvZnNldCBYIGFuZCBZLlxuICB2YXIgc3BsaXRSZWdleCA9IC9cXHMqLFxccyp8XFxzKy87XG4gIHZhciBvcHMgPSBkaXZpZGVyICE9PSAtMSA/IFtmcmFnbWVudHMuc2xpY2UoMCwgZGl2aWRlcikuY29uY2F0KFtmcmFnbWVudHNbZGl2aWRlcl0uc3BsaXQoc3BsaXRSZWdleClbMF1dKSwgW2ZyYWdtZW50c1tkaXZpZGVyXS5zcGxpdChzcGxpdFJlZ2V4KVsxXV0uY29uY2F0KGZyYWdtZW50cy5zbGljZShkaXZpZGVyICsgMSkpXSA6IFtmcmFnbWVudHNdO1xuXG4gIC8vIENvbnZlcnQgdGhlIHZhbHVlcyB3aXRoIHVuaXRzIHRvIGFic29sdXRlIHBpeGVscyB0byBhbGxvdyBvdXIgY29tcHV0YXRpb25zXG4gIG9wcyA9IG9wcy5tYXAoZnVuY3Rpb24gKG9wLCBpbmRleCkge1xuICAgIC8vIE1vc3Qgb2YgdGhlIHVuaXRzIHJlbHkgb24gdGhlIG9yaWVudGF0aW9uIG9mIHRoZSBwb3BwZXJcbiAgICB2YXIgbWVhc3VyZW1lbnQgPSAoaW5kZXggPT09IDEgPyAhdXNlSGVpZ2h0IDogdXNlSGVpZ2h0KSA/ICdoZWlnaHQnIDogJ3dpZHRoJztcbiAgICB2YXIgbWVyZ2VXaXRoUHJldmlvdXMgPSBmYWxzZTtcbiAgICByZXR1cm4gb3BcbiAgICAvLyBUaGlzIGFnZ3JlZ2F0ZXMgYW55IGArYCBvciBgLWAgc2lnbiB0aGF0IGFyZW4ndCBjb25zaWRlcmVkIG9wZXJhdG9yc1xuICAgIC8vIGUuZy46IDEwICsgKzUgPT4gWzEwLCArLCArNV1cbiAgICAucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICBpZiAoYVthLmxlbmd0aCAtIDFdID09PSAnJyAmJiBbJysnLCAnLSddLmluZGV4T2YoYikgIT09IC0xKSB7XG4gICAgICAgIGFbYS5sZW5ndGggLSAxXSA9IGI7XG4gICAgICAgIG1lcmdlV2l0aFByZXZpb3VzID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgICB9IGVsc2UgaWYgKG1lcmdlV2l0aFByZXZpb3VzKSB7XG4gICAgICAgIGFbYS5sZW5ndGggLSAxXSArPSBiO1xuICAgICAgICBtZXJnZVdpdGhQcmV2aW91cyA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gYTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhLmNvbmNhdChiKTtcbiAgICAgIH1cbiAgICB9LCBbXSlcbiAgICAvLyBIZXJlIHdlIGNvbnZlcnQgdGhlIHN0cmluZyB2YWx1ZXMgaW50byBudW1iZXIgdmFsdWVzIChpbiBweClcbiAgICAubWFwKGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgIHJldHVybiB0b1ZhbHVlKHN0ciwgbWVhc3VyZW1lbnQsIHBvcHBlck9mZnNldHMsIHJlZmVyZW5jZU9mZnNldHMpO1xuICAgIH0pO1xuICB9KTtcblxuICAvLyBMb29wIHRyb3VnaCB0aGUgb2Zmc2V0cyBhcnJheXMgYW5kIGV4ZWN1dGUgdGhlIG9wZXJhdGlvbnNcbiAgb3BzLmZvckVhY2goZnVuY3Rpb24gKG9wLCBpbmRleCkge1xuICAgIG9wLmZvckVhY2goZnVuY3Rpb24gKGZyYWcsIGluZGV4Mikge1xuICAgICAgaWYgKGlzTnVtZXJpYyhmcmFnKSkge1xuICAgICAgICBvZmZzZXRzW2luZGV4XSArPSBmcmFnICogKG9wW2luZGV4MiAtIDFdID09PSAnLScgPyAtMSA6IDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG9mZnNldHM7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgdXBkYXRlIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQGFyZ3VtZW50IHtOdW1iZXJ8U3RyaW5nfSBvcHRpb25zLm9mZnNldD0wXG4gKiBUaGUgb2Zmc2V0IHZhbHVlIGFzIGRlc2NyaWJlZCBpbiB0aGUgbW9kaWZpZXIgZGVzY3JpcHRpb25cbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24gb2Zmc2V0KGRhdGEsIF9yZWYpIHtcbiAgdmFyIG9mZnNldCA9IF9yZWYub2Zmc2V0O1xuICB2YXIgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQsXG4gICAgICBfZGF0YSRvZmZzZXRzID0gZGF0YS5vZmZzZXRzLFxuICAgICAgcG9wcGVyID0gX2RhdGEkb2Zmc2V0cy5wb3BwZXIsXG4gICAgICByZWZlcmVuY2UgPSBfZGF0YSRvZmZzZXRzLnJlZmVyZW5jZTtcblxuICB2YXIgYmFzZVBsYWNlbWVudCA9IHBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuXG4gIHZhciBvZmZzZXRzID0gdm9pZCAwO1xuICBpZiAoaXNOdW1lcmljKCtvZmZzZXQpKSB7XG4gICAgb2Zmc2V0cyA9IFsrb2Zmc2V0LCAwXTtcbiAgfSBlbHNlIHtcbiAgICBvZmZzZXRzID0gcGFyc2VPZmZzZXQob2Zmc2V0LCBwb3BwZXIsIHJlZmVyZW5jZSwgYmFzZVBsYWNlbWVudCk7XG4gIH1cblxuICBpZiAoYmFzZVBsYWNlbWVudCA9PT0gJ2xlZnQnKSB7XG4gICAgcG9wcGVyLnRvcCArPSBvZmZzZXRzWzBdO1xuICAgIHBvcHBlci5sZWZ0IC09IG9mZnNldHNbMV07XG4gIH0gZWxzZSBpZiAoYmFzZVBsYWNlbWVudCA9PT0gJ3JpZ2h0Jykge1xuICAgIHBvcHBlci50b3AgKz0gb2Zmc2V0c1swXTtcbiAgICBwb3BwZXIubGVmdCArPSBvZmZzZXRzWzFdO1xuICB9IGVsc2UgaWYgKGJhc2VQbGFjZW1lbnQgPT09ICd0b3AnKSB7XG4gICAgcG9wcGVyLmxlZnQgKz0gb2Zmc2V0c1swXTtcbiAgICBwb3BwZXIudG9wIC09IG9mZnNldHNbMV07XG4gIH0gZWxzZSBpZiAoYmFzZVBsYWNlbWVudCA9PT0gJ2JvdHRvbScpIHtcbiAgICBwb3BwZXIubGVmdCArPSBvZmZzZXRzWzBdO1xuICAgIHBvcHBlci50b3AgKz0gb2Zmc2V0c1sxXTtcbiAgfVxuXG4gIGRhdGEucG9wcGVyID0gcG9wcGVyO1xuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSBgdXBkYXRlYCBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24gcHJldmVudE92ZXJmbG93KGRhdGEsIG9wdGlvbnMpIHtcbiAgdmFyIGJvdW5kYXJpZXNFbGVtZW50ID0gb3B0aW9ucy5ib3VuZGFyaWVzRWxlbWVudCB8fCBnZXRPZmZzZXRQYXJlbnQoZGF0YS5pbnN0YW5jZS5wb3BwZXIpO1xuXG4gIC8vIElmIG9mZnNldFBhcmVudCBpcyB0aGUgcmVmZXJlbmNlIGVsZW1lbnQsIHdlIHJlYWxseSB3YW50IHRvXG4gIC8vIGdvIG9uZSBzdGVwIHVwIGFuZCB1c2UgdGhlIG5leHQgb2Zmc2V0UGFyZW50IGFzIHJlZmVyZW5jZSB0b1xuICAvLyBhdm9pZCB0byBtYWtlIHRoaXMgbW9kaWZpZXIgY29tcGxldGVseSB1c2VsZXNzIGFuZCBsb29rIGxpa2UgYnJva2VuXG4gIGlmIChkYXRhLmluc3RhbmNlLnJlZmVyZW5jZSA9PT0gYm91bmRhcmllc0VsZW1lbnQpIHtcbiAgICBib3VuZGFyaWVzRWxlbWVudCA9IGdldE9mZnNldFBhcmVudChib3VuZGFyaWVzRWxlbWVudCk7XG4gIH1cblxuICAvLyBOT1RFOiBET00gYWNjZXNzIGhlcmVcbiAgLy8gcmVzZXRzIHRoZSBwb3BwZXIncyBwb3NpdGlvbiBzbyB0aGF0IHRoZSBkb2N1bWVudCBzaXplIGNhbiBiZSBjYWxjdWxhdGVkIGV4Y2x1ZGluZ1xuICAvLyB0aGUgc2l6ZSBvZiB0aGUgcG9wcGVyIGVsZW1lbnQgaXRzZWxmXG4gIHZhciB0cmFuc2Zvcm1Qcm9wID0gZ2V0U3VwcG9ydGVkUHJvcGVydHlOYW1lKCd0cmFuc2Zvcm0nKTtcbiAgdmFyIHBvcHBlclN0eWxlcyA9IGRhdGEuaW5zdGFuY2UucG9wcGVyLnN0eWxlOyAvLyBhc3NpZ25tZW50IHRvIGhlbHAgbWluaWZpY2F0aW9uXG4gIHZhciB0b3AgPSBwb3BwZXJTdHlsZXMudG9wLFxuICAgICAgbGVmdCA9IHBvcHBlclN0eWxlcy5sZWZ0LFxuICAgICAgdHJhbnNmb3JtID0gcG9wcGVyU3R5bGVzW3RyYW5zZm9ybVByb3BdO1xuXG4gIHBvcHBlclN0eWxlcy50b3AgPSAnJztcbiAgcG9wcGVyU3R5bGVzLmxlZnQgPSAnJztcbiAgcG9wcGVyU3R5bGVzW3RyYW5zZm9ybVByb3BdID0gJyc7XG5cbiAgdmFyIGJvdW5kYXJpZXMgPSBnZXRCb3VuZGFyaWVzKGRhdGEuaW5zdGFuY2UucG9wcGVyLCBkYXRhLmluc3RhbmNlLnJlZmVyZW5jZSwgb3B0aW9ucy5wYWRkaW5nLCBib3VuZGFyaWVzRWxlbWVudCwgZGF0YS5wb3NpdGlvbkZpeGVkKTtcblxuICAvLyBOT1RFOiBET00gYWNjZXNzIGhlcmVcbiAgLy8gcmVzdG9yZXMgdGhlIG9yaWdpbmFsIHN0eWxlIHByb3BlcnRpZXMgYWZ0ZXIgdGhlIG9mZnNldHMgaGF2ZSBiZWVuIGNvbXB1dGVkXG4gIHBvcHBlclN0eWxlcy50b3AgPSB0b3A7XG4gIHBvcHBlclN0eWxlcy5sZWZ0ID0gbGVmdDtcbiAgcG9wcGVyU3R5bGVzW3RyYW5zZm9ybVByb3BdID0gdHJhbnNmb3JtO1xuXG4gIG9wdGlvbnMuYm91bmRhcmllcyA9IGJvdW5kYXJpZXM7XG5cbiAgdmFyIG9yZGVyID0gb3B0aW9ucy5wcmlvcml0eTtcbiAgdmFyIHBvcHBlciA9IGRhdGEub2Zmc2V0cy5wb3BwZXI7XG5cbiAgdmFyIGNoZWNrID0ge1xuICAgIHByaW1hcnk6IGZ1bmN0aW9uIHByaW1hcnkocGxhY2VtZW50KSB7XG4gICAgICB2YXIgdmFsdWUgPSBwb3BwZXJbcGxhY2VtZW50XTtcbiAgICAgIGlmIChwb3BwZXJbcGxhY2VtZW50XSA8IGJvdW5kYXJpZXNbcGxhY2VtZW50XSAmJiAhb3B0aW9ucy5lc2NhcGVXaXRoUmVmZXJlbmNlKSB7XG4gICAgICAgIHZhbHVlID0gTWF0aC5tYXgocG9wcGVyW3BsYWNlbWVudF0sIGJvdW5kYXJpZXNbcGxhY2VtZW50XSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmaW5lUHJvcGVydHkoe30sIHBsYWNlbWVudCwgdmFsdWUpO1xuICAgIH0sXG4gICAgc2Vjb25kYXJ5OiBmdW5jdGlvbiBzZWNvbmRhcnkocGxhY2VtZW50KSB7XG4gICAgICB2YXIgbWFpblNpZGUgPSBwbGFjZW1lbnQgPT09ICdyaWdodCcgPyAnbGVmdCcgOiAndG9wJztcbiAgICAgIHZhciB2YWx1ZSA9IHBvcHBlclttYWluU2lkZV07XG4gICAgICBpZiAocG9wcGVyW3BsYWNlbWVudF0gPiBib3VuZGFyaWVzW3BsYWNlbWVudF0gJiYgIW9wdGlvbnMuZXNjYXBlV2l0aFJlZmVyZW5jZSkge1xuICAgICAgICB2YWx1ZSA9IE1hdGgubWluKHBvcHBlclttYWluU2lkZV0sIGJvdW5kYXJpZXNbcGxhY2VtZW50XSAtIChwbGFjZW1lbnQgPT09ICdyaWdodCcgPyBwb3BwZXIud2lkdGggOiBwb3BwZXIuaGVpZ2h0KSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZGVmaW5lUHJvcGVydHkoe30sIG1haW5TaWRlLCB2YWx1ZSk7XG4gICAgfVxuICB9O1xuXG4gIG9yZGVyLmZvckVhY2goZnVuY3Rpb24gKHBsYWNlbWVudCkge1xuICAgIHZhciBzaWRlID0gWydsZWZ0JywgJ3RvcCddLmluZGV4T2YocGxhY2VtZW50KSAhPT0gLTEgPyAncHJpbWFyeScgOiAnc2Vjb25kYXJ5JztcbiAgICBwb3BwZXIgPSBfZXh0ZW5kcyh7fSwgcG9wcGVyLCBjaGVja1tzaWRlXShwbGFjZW1lbnQpKTtcbiAgfSk7XG5cbiAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IHBvcHBlcjtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSBgdXBkYXRlYCBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24gc2hpZnQoZGF0YSkge1xuICB2YXIgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gcGxhY2VtZW50LnNwbGl0KCctJylbMF07XG4gIHZhciBzaGlmdHZhcmlhdGlvbiA9IHBsYWNlbWVudC5zcGxpdCgnLScpWzFdO1xuXG4gIC8vIGlmIHNoaWZ0IHNoaWZ0dmFyaWF0aW9uIGlzIHNwZWNpZmllZCwgcnVuIHRoZSBtb2RpZmllclxuICBpZiAoc2hpZnR2YXJpYXRpb24pIHtcbiAgICB2YXIgX2RhdGEkb2Zmc2V0cyA9IGRhdGEub2Zmc2V0cyxcbiAgICAgICAgcmVmZXJlbmNlID0gX2RhdGEkb2Zmc2V0cy5yZWZlcmVuY2UsXG4gICAgICAgIHBvcHBlciA9IF9kYXRhJG9mZnNldHMucG9wcGVyO1xuXG4gICAgdmFyIGlzVmVydGljYWwgPSBbJ2JvdHRvbScsICd0b3AnXS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpICE9PSAtMTtcbiAgICB2YXIgc2lkZSA9IGlzVmVydGljYWwgPyAnbGVmdCcgOiAndG9wJztcbiAgICB2YXIgbWVhc3VyZW1lbnQgPSBpc1ZlcnRpY2FsID8gJ3dpZHRoJyA6ICdoZWlnaHQnO1xuXG4gICAgdmFyIHNoaWZ0T2Zmc2V0cyA9IHtcbiAgICAgIHN0YXJ0OiBkZWZpbmVQcm9wZXJ0eSh7fSwgc2lkZSwgcmVmZXJlbmNlW3NpZGVdKSxcbiAgICAgIGVuZDogZGVmaW5lUHJvcGVydHkoe30sIHNpZGUsIHJlZmVyZW5jZVtzaWRlXSArIHJlZmVyZW5jZVttZWFzdXJlbWVudF0gLSBwb3BwZXJbbWVhc3VyZW1lbnRdKVxuICAgIH07XG5cbiAgICBkYXRhLm9mZnNldHMucG9wcGVyID0gX2V4dGVuZHMoe30sIHBvcHBlciwgc2hpZnRPZmZzZXRzW3NoaWZ0dmFyaWF0aW9uXSk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSB1cGRhdGUgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGhpZGUoZGF0YSkge1xuICBpZiAoIWlzTW9kaWZpZXJSZXF1aXJlZChkYXRhLmluc3RhbmNlLm1vZGlmaWVycywgJ2hpZGUnLCAncHJldmVudE92ZXJmbG93JykpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIHZhciByZWZSZWN0ID0gZGF0YS5vZmZzZXRzLnJlZmVyZW5jZTtcbiAgdmFyIGJvdW5kID0gZmluZChkYXRhLmluc3RhbmNlLm1vZGlmaWVycywgZnVuY3Rpb24gKG1vZGlmaWVyKSB7XG4gICAgcmV0dXJuIG1vZGlmaWVyLm5hbWUgPT09ICdwcmV2ZW50T3ZlcmZsb3cnO1xuICB9KS5ib3VuZGFyaWVzO1xuXG4gIGlmIChyZWZSZWN0LmJvdHRvbSA8IGJvdW5kLnRvcCB8fCByZWZSZWN0LmxlZnQgPiBib3VuZC5yaWdodCB8fCByZWZSZWN0LnRvcCA+IGJvdW5kLmJvdHRvbSB8fCByZWZSZWN0LnJpZ2h0IDwgYm91bmQubGVmdCkge1xuICAgIC8vIEF2b2lkIHVubmVjZXNzYXJ5IERPTSBhY2Nlc3MgaWYgdmlzaWJpbGl0eSBoYXNuJ3QgY2hhbmdlZFxuICAgIGlmIChkYXRhLmhpZGUgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGRhdGEuaGlkZSA9IHRydWU7XG4gICAgZGF0YS5hdHRyaWJ1dGVzWyd4LW91dC1vZi1ib3VuZGFyaWVzJ10gPSAnJztcbiAgfSBlbHNlIHtcbiAgICAvLyBBdm9pZCB1bm5lY2Vzc2FyeSBET00gYWNjZXNzIGlmIHZpc2liaWxpdHkgaGFzbid0IGNoYW5nZWRcbiAgICBpZiAoZGF0YS5oaWRlID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgZGF0YS5oaWRlID0gZmFsc2U7XG4gICAgZGF0YS5hdHRyaWJ1dGVzWyd4LW91dC1vZi1ib3VuZGFyaWVzJ10gPSBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBpbm5lcihkYXRhKSB7XG4gIHZhciBwbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudDtcbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbiAgdmFyIF9kYXRhJG9mZnNldHMgPSBkYXRhLm9mZnNldHMsXG4gICAgICBwb3BwZXIgPSBfZGF0YSRvZmZzZXRzLnBvcHBlcixcbiAgICAgIHJlZmVyZW5jZSA9IF9kYXRhJG9mZnNldHMucmVmZXJlbmNlO1xuXG4gIHZhciBpc0hvcml6ID0gWydsZWZ0JywgJ3JpZ2h0J10uaW5kZXhPZihiYXNlUGxhY2VtZW50KSAhPT0gLTE7XG5cbiAgdmFyIHN1YnRyYWN0TGVuZ3RoID0gWyd0b3AnLCAnbGVmdCddLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgPT09IC0xO1xuXG4gIHBvcHBlcltpc0hvcml6ID8gJ2xlZnQnIDogJ3RvcCddID0gcmVmZXJlbmNlW2Jhc2VQbGFjZW1lbnRdIC0gKHN1YnRyYWN0TGVuZ3RoID8gcG9wcGVyW2lzSG9yaXogPyAnd2lkdGgnIDogJ2hlaWdodCddIDogMCk7XG5cbiAgZGF0YS5wbGFjZW1lbnQgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuICBkYXRhLm9mZnNldHMucG9wcGVyID0gZ2V0Q2xpZW50UmVjdChwb3BwZXIpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIE1vZGlmaWVyIGZ1bmN0aW9uLCBlYWNoIG1vZGlmaWVyIGNhbiBoYXZlIGEgZnVuY3Rpb24gb2YgdGhpcyB0eXBlIGFzc2lnbmVkXG4gKiB0byBpdHMgYGZuYCBwcm9wZXJ0eS48YnIgLz5cbiAqIFRoZXNlIGZ1bmN0aW9ucyB3aWxsIGJlIGNhbGxlZCBvbiBlYWNoIHVwZGF0ZSwgdGhpcyBtZWFucyB0aGF0IHlvdSBtdXN0XG4gKiBtYWtlIHN1cmUgdGhleSBhcmUgcGVyZm9ybWFudCBlbm91Z2ggdG8gYXZvaWQgcGVyZm9ybWFuY2UgYm90dGxlbmVja3MuXG4gKlxuICogQGZ1bmN0aW9uIE1vZGlmaWVyRm5cbiAqIEBhcmd1bWVudCB7ZGF0YU9iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgYHVwZGF0ZWAgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7ZGF0YU9iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5cbi8qKlxuICogTW9kaWZpZXJzIGFyZSBwbHVnaW5zIHVzZWQgdG8gYWx0ZXIgdGhlIGJlaGF2aW9yIG9mIHlvdXIgcG9wcGVycy48YnIgLz5cbiAqIFBvcHBlci5qcyB1c2VzIGEgc2V0IG9mIDkgbW9kaWZpZXJzIHRvIHByb3ZpZGUgYWxsIHRoZSBiYXNpYyBmdW5jdGlvbmFsaXRpZXNcbiAqIG5lZWRlZCBieSB0aGUgbGlicmFyeS5cbiAqXG4gKiBVc3VhbGx5IHlvdSBkb24ndCB3YW50IHRvIG92ZXJyaWRlIHRoZSBgb3JkZXJgLCBgZm5gIGFuZCBgb25Mb2FkYCBwcm9wcy5cbiAqIEFsbCB0aGUgb3RoZXIgcHJvcGVydGllcyBhcmUgY29uZmlndXJhdGlvbnMgdGhhdCBjb3VsZCBiZSB0d2Vha2VkLlxuICogQG5hbWVzcGFjZSBtb2RpZmllcnNcbiAqL1xudmFyIG1vZGlmaWVycyA9IHtcbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gc2hpZnQgdGhlIHBvcHBlciBvbiB0aGUgc3RhcnQgb3IgZW5kIG9mIGl0cyByZWZlcmVuY2VcbiAgICogZWxlbWVudC48YnIgLz5cbiAgICogSXQgd2lsbCByZWFkIHRoZSB2YXJpYXRpb24gb2YgdGhlIGBwbGFjZW1lbnRgIHByb3BlcnR5LjxiciAvPlxuICAgKiBJdCBjYW4gYmUgb25lIGVpdGhlciBgLWVuZGAgb3IgYC1zdGFydGAuXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBzaGlmdDoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj0xMDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDEwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IHNoaWZ0XG4gIH0sXG5cbiAgLyoqXG4gICAqIFRoZSBgb2Zmc2V0YCBtb2RpZmllciBjYW4gc2hpZnQgeW91ciBwb3BwZXIgb24gYm90aCBpdHMgYXhpcy5cbiAgICpcbiAgICogSXQgYWNjZXB0cyB0aGUgZm9sbG93aW5nIHVuaXRzOlxuICAgKiAtIGBweGAgb3IgdW5pdC1sZXNzLCBpbnRlcnByZXRlZCBhcyBwaXhlbHNcbiAgICogLSBgJWAgb3IgYCVyYCwgcGVyY2VudGFnZSByZWxhdGl2ZSB0byB0aGUgbGVuZ3RoIG9mIHRoZSByZWZlcmVuY2UgZWxlbWVudFxuICAgKiAtIGAlcGAsIHBlcmNlbnRhZ2UgcmVsYXRpdmUgdG8gdGhlIGxlbmd0aCBvZiB0aGUgcG9wcGVyIGVsZW1lbnRcbiAgICogLSBgdndgLCBDU1Mgdmlld3BvcnQgd2lkdGggdW5pdFxuICAgKiAtIGB2aGAsIENTUyB2aWV3cG9ydCBoZWlnaHQgdW5pdFxuICAgKlxuICAgKiBGb3IgbGVuZ3RoIGlzIGludGVuZGVkIHRoZSBtYWluIGF4aXMgcmVsYXRpdmUgdG8gdGhlIHBsYWNlbWVudCBvZiB0aGUgcG9wcGVyLjxiciAvPlxuICAgKiBUaGlzIG1lYW5zIHRoYXQgaWYgdGhlIHBsYWNlbWVudCBpcyBgdG9wYCBvciBgYm90dG9tYCwgdGhlIGxlbmd0aCB3aWxsIGJlIHRoZVxuICAgKiBgd2lkdGhgLiBJbiBjYXNlIG9mIGBsZWZ0YCBvciBgcmlnaHRgLCBpdCB3aWxsIGJlIHRoZSBgaGVpZ2h0YC5cbiAgICpcbiAgICogWW91IGNhbiBwcm92aWRlIGEgc2luZ2xlIHZhbHVlIChhcyBgTnVtYmVyYCBvciBgU3RyaW5nYCksIG9yIGEgcGFpciBvZiB2YWx1ZXNcbiAgICogYXMgYFN0cmluZ2AgZGl2aWRlZCBieSBhIGNvbW1hIG9yIG9uZSAob3IgbW9yZSkgd2hpdGUgc3BhY2VzLjxiciAvPlxuICAgKiBUaGUgbGF0dGVyIGlzIGEgZGVwcmVjYXRlZCBtZXRob2QgYmVjYXVzZSBpdCBsZWFkcyB0byBjb25mdXNpb24gYW5kIHdpbGwgYmVcbiAgICogcmVtb3ZlZCBpbiB2Mi48YnIgLz5cbiAgICogQWRkaXRpb25hbGx5LCBpdCBhY2NlcHRzIGFkZGl0aW9ucyBhbmQgc3VidHJhY3Rpb25zIGJldHdlZW4gZGlmZmVyZW50IHVuaXRzLlxuICAgKiBOb3RlIHRoYXQgbXVsdGlwbGljYXRpb25zIGFuZCBkaXZpc2lvbnMgYXJlbid0IHN1cHBvcnRlZC5cbiAgICpcbiAgICogVmFsaWQgZXhhbXBsZXMgYXJlOlxuICAgKiBgYGBcbiAgICogMTBcbiAgICogJzEwJSdcbiAgICogJzEwLCAxMCdcbiAgICogJzEwJSwgMTAnXG4gICAqICcxMCArIDEwJSdcbiAgICogJzEwIC0gNXZoICsgMyUnXG4gICAqICctMTBweCArIDV2aCwgNXB4IC0gNiUnXG4gICAqIGBgYFxuICAgKiA+ICoqTkIqKjogSWYgeW91IGRlc2lyZSB0byBhcHBseSBvZmZzZXRzIHRvIHlvdXIgcG9wcGVycyBpbiBhIHdheSB0aGF0IG1heSBtYWtlIHRoZW0gb3ZlcmxhcFxuICAgKiA+IHdpdGggdGhlaXIgcmVmZXJlbmNlIGVsZW1lbnQsIHVuZm9ydHVuYXRlbHksIHlvdSB3aWxsIGhhdmUgdG8gZGlzYWJsZSB0aGUgYGZsaXBgIG1vZGlmaWVyLlxuICAgKiA+IFlvdSBjYW4gcmVhZCBtb3JlIG9uIHRoaXMgYXQgdGhpcyBbaXNzdWVdKGh0dHBzOi8vZ2l0aHViLmNvbS9GZXpWcmFzdGEvcG9wcGVyLmpzL2lzc3Vlcy8zNzMpLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgb2Zmc2V0OiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTIwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogMjAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogb2Zmc2V0LFxuICAgIC8qKiBAcHJvcCB7TnVtYmVyfFN0cmluZ30gb2Zmc2V0PTBcbiAgICAgKiBUaGUgb2Zmc2V0IHZhbHVlIGFzIGRlc2NyaWJlZCBpbiB0aGUgbW9kaWZpZXIgZGVzY3JpcHRpb25cbiAgICAgKi9cbiAgICBvZmZzZXQ6IDBcbiAgfSxcblxuICAvKipcbiAgICogTW9kaWZpZXIgdXNlZCB0byBwcmV2ZW50IHRoZSBwb3BwZXIgZnJvbSBiZWluZyBwb3NpdGlvbmVkIG91dHNpZGUgdGhlIGJvdW5kYXJ5LlxuICAgKlxuICAgKiBBIHNjZW5hcmlvIGV4aXN0cyB3aGVyZSB0aGUgcmVmZXJlbmNlIGl0c2VsZiBpcyBub3Qgd2l0aGluIHRoZSBib3VuZGFyaWVzLjxiciAvPlxuICAgKiBXZSBjYW4gc2F5IGl0IGhhcyBcImVzY2FwZWQgdGhlIGJvdW5kYXJpZXNcIiDigJQgb3IganVzdCBcImVzY2FwZWRcIi48YnIgLz5cbiAgICogSW4gdGhpcyBjYXNlIHdlIG5lZWQgdG8gZGVjaWRlIHdoZXRoZXIgdGhlIHBvcHBlciBzaG91bGQgZWl0aGVyOlxuICAgKlxuICAgKiAtIGRldGFjaCBmcm9tIHRoZSByZWZlcmVuY2UgYW5kIHJlbWFpbiBcInRyYXBwZWRcIiBpbiB0aGUgYm91bmRhcmllcywgb3JcbiAgICogLSBpZiBpdCBzaG91bGQgaWdub3JlIHRoZSBib3VuZGFyeSBhbmQgXCJlc2NhcGUgd2l0aCBpdHMgcmVmZXJlbmNlXCJcbiAgICpcbiAgICogV2hlbiBgZXNjYXBlV2l0aFJlZmVyZW5jZWAgaXMgc2V0IHRvYHRydWVgIGFuZCByZWZlcmVuY2UgaXMgY29tcGxldGVseVxuICAgKiBvdXRzaWRlIGl0cyBib3VuZGFyaWVzLCB0aGUgcG9wcGVyIHdpbGwgb3ZlcmZsb3cgKG9yIGNvbXBsZXRlbHkgbGVhdmUpXG4gICAqIHRoZSBib3VuZGFyaWVzIGluIG9yZGVyIHRvIHJlbWFpbiBhdHRhY2hlZCB0byB0aGUgZWRnZSBvZiB0aGUgcmVmZXJlbmNlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgcHJldmVudE92ZXJmbG93OiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTMwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogMzAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogcHJldmVudE92ZXJmbG93LFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtBcnJheX0gW3ByaW9yaXR5PVsnbGVmdCcsJ3JpZ2h0JywndG9wJywnYm90dG9tJ11dXG4gICAgICogUG9wcGVyIHdpbGwgdHJ5IHRvIHByZXZlbnQgb3ZlcmZsb3cgZm9sbG93aW5nIHRoZXNlIHByaW9yaXRpZXMgYnkgZGVmYXVsdCxcbiAgICAgKiB0aGVuLCBpdCBjb3VsZCBvdmVyZmxvdyBvbiB0aGUgbGVmdCBhbmQgb24gdG9wIG9mIHRoZSBgYm91bmRhcmllc0VsZW1lbnRgXG4gICAgICovXG4gICAgcHJpb3JpdHk6IFsnbGVmdCcsICdyaWdodCcsICd0b3AnLCAnYm90dG9tJ10sXG4gICAgLyoqXG4gICAgICogQHByb3Age251bWJlcn0gcGFkZGluZz01XG4gICAgICogQW1vdW50IG9mIHBpeGVsIHVzZWQgdG8gZGVmaW5lIGEgbWluaW11bSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSBib3VuZGFyaWVzXG4gICAgICogYW5kIHRoZSBwb3BwZXIuIFRoaXMgbWFrZXMgc3VyZSB0aGUgcG9wcGVyIGFsd2F5cyBoYXMgYSBsaXR0bGUgcGFkZGluZ1xuICAgICAqIGJldHdlZW4gdGhlIGVkZ2VzIG9mIGl0cyBjb250YWluZXJcbiAgICAgKi9cbiAgICBwYWRkaW5nOiA1LFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtTdHJpbmd8SFRNTEVsZW1lbnR9IGJvdW5kYXJpZXNFbGVtZW50PSdzY3JvbGxQYXJlbnQnXG4gICAgICogQm91bmRhcmllcyB1c2VkIGJ5IHRoZSBtb2RpZmllci4gQ2FuIGJlIGBzY3JvbGxQYXJlbnRgLCBgd2luZG93YCxcbiAgICAgKiBgdmlld3BvcnRgIG9yIGFueSBET00gZWxlbWVudC5cbiAgICAgKi9cbiAgICBib3VuZGFyaWVzRWxlbWVudDogJ3Njcm9sbFBhcmVudCdcbiAgfSxcblxuICAvKipcbiAgICogTW9kaWZpZXIgdXNlZCB0byBtYWtlIHN1cmUgdGhlIHJlZmVyZW5jZSBhbmQgaXRzIHBvcHBlciBzdGF5IG5lYXIgZWFjaCBvdGhlclxuICAgKiB3aXRob3V0IGxlYXZpbmcgYW55IGdhcCBiZXR3ZWVuIHRoZSB0d28uIEVzcGVjaWFsbHkgdXNlZnVsIHdoZW4gdGhlIGFycm93IGlzXG4gICAqIGVuYWJsZWQgYW5kIHlvdSB3YW50IHRvIGVuc3VyZSB0aGF0IGl0IHBvaW50cyB0byBpdHMgcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAqIEl0IGNhcmVzIG9ubHkgYWJvdXQgdGhlIGZpcnN0IGF4aXMuIFlvdSBjYW4gc3RpbGwgaGF2ZSBwb3BwZXJzIHdpdGggbWFyZ2luXG4gICAqIGJldHdlZW4gdGhlIHBvcHBlciBhbmQgaXRzIHJlZmVyZW5jZSBlbGVtZW50LlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAga2VlcFRvZ2V0aGVyOiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTQwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogNDAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjoga2VlcFRvZ2V0aGVyXG4gIH0sXG5cbiAgLyoqXG4gICAqIFRoaXMgbW9kaWZpZXIgaXMgdXNlZCB0byBtb3ZlIHRoZSBgYXJyb3dFbGVtZW50YCBvZiB0aGUgcG9wcGVyIHRvIG1ha2VcbiAgICogc3VyZSBpdCBpcyBwb3NpdGlvbmVkIGJldHdlZW4gdGhlIHJlZmVyZW5jZSBlbGVtZW50IGFuZCBpdHMgcG9wcGVyIGVsZW1lbnQuXG4gICAqIEl0IHdpbGwgcmVhZCB0aGUgb3V0ZXIgc2l6ZSBvZiB0aGUgYGFycm93RWxlbWVudGAgbm9kZSB0byBkZXRlY3QgaG93IG1hbnlcbiAgICogcGl4ZWxzIG9mIGNvbmp1bmN0aW9uIGFyZSBuZWVkZWQuXG4gICAqXG4gICAqIEl0IGhhcyBubyBlZmZlY3QgaWYgbm8gYGFycm93RWxlbWVudGAgaXMgcHJvdmlkZWQuXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBhcnJvdzoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj01MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDUwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGFycm93LFxuICAgIC8qKiBAcHJvcCB7U3RyaW5nfEhUTUxFbGVtZW50fSBlbGVtZW50PSdbeC1hcnJvd10nIC0gU2VsZWN0b3Igb3Igbm9kZSB1c2VkIGFzIGFycm93ICovXG4gICAgZWxlbWVudDogJ1t4LWFycm93XSdcbiAgfSxcblxuICAvKipcbiAgICogTW9kaWZpZXIgdXNlZCB0byBmbGlwIHRoZSBwb3BwZXIncyBwbGFjZW1lbnQgd2hlbiBpdCBzdGFydHMgdG8gb3ZlcmxhcCBpdHNcbiAgICogcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAqXG4gICAqIFJlcXVpcmVzIHRoZSBgcHJldmVudE92ZXJmbG93YCBtb2RpZmllciBiZWZvcmUgaXQgaW4gb3JkZXIgdG8gd29yay5cbiAgICpcbiAgICogKipOT1RFOioqIHRoaXMgbW9kaWZpZXIgd2lsbCBpbnRlcnJ1cHQgdGhlIGN1cnJlbnQgdXBkYXRlIGN5Y2xlIGFuZCB3aWxsXG4gICAqIHJlc3RhcnQgaXQgaWYgaXQgZGV0ZWN0cyB0aGUgbmVlZCB0byBmbGlwIHRoZSBwbGFjZW1lbnQuXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBmbGlwOiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTYwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogNjAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogZmxpcCxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7U3RyaW5nfEFycmF5fSBiZWhhdmlvcj0nZmxpcCdcbiAgICAgKiBUaGUgYmVoYXZpb3IgdXNlZCB0byBjaGFuZ2UgdGhlIHBvcHBlcidzIHBsYWNlbWVudC4gSXQgY2FuIGJlIG9uZSBvZlxuICAgICAqIGBmbGlwYCwgYGNsb2Nrd2lzZWAsIGBjb3VudGVyY2xvY2t3aXNlYCBvciBhbiBhcnJheSB3aXRoIGEgbGlzdCBvZiB2YWxpZFxuICAgICAqIHBsYWNlbWVudHMgKHdpdGggb3B0aW9uYWwgdmFyaWF0aW9ucylcbiAgICAgKi9cbiAgICBiZWhhdmlvcjogJ2ZsaXAnLFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtudW1iZXJ9IHBhZGRpbmc9NVxuICAgICAqIFRoZSBwb3BwZXIgd2lsbCBmbGlwIGlmIGl0IGhpdHMgdGhlIGVkZ2VzIG9mIHRoZSBgYm91bmRhcmllc0VsZW1lbnRgXG4gICAgICovXG4gICAgcGFkZGluZzogNSxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7U3RyaW5nfEhUTUxFbGVtZW50fSBib3VuZGFyaWVzRWxlbWVudD0ndmlld3BvcnQnXG4gICAgICogVGhlIGVsZW1lbnQgd2hpY2ggd2lsbCBkZWZpbmUgdGhlIGJvdW5kYXJpZXMgb2YgdGhlIHBvcHBlciBwb3NpdGlvbi5cbiAgICAgKiBUaGUgcG9wcGVyIHdpbGwgbmV2ZXIgYmUgcGxhY2VkIG91dHNpZGUgb2YgdGhlIGRlZmluZWQgYm91bmRhcmllc1xuICAgICAqIChleGNlcHQgaWYgYGtlZXBUb2dldGhlcmAgaXMgZW5hYmxlZClcbiAgICAgKi9cbiAgICBib3VuZGFyaWVzRWxlbWVudDogJ3ZpZXdwb3J0JyxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7Qm9vbGVhbn0gZmxpcFZhcmlhdGlvbnM9ZmFsc2VcbiAgICAgKiBUaGUgcG9wcGVyIHdpbGwgc3dpdGNoIHBsYWNlbWVudCB2YXJpYXRpb24gYmV0d2VlbiBgLXN0YXJ0YCBhbmQgYC1lbmRgIHdoZW5cbiAgICAgKiB0aGUgcmVmZXJlbmNlIGVsZW1lbnQgb3ZlcmxhcHMgaXRzIGJvdW5kYXJpZXMuXG4gICAgICpcbiAgICAgKiBUaGUgb3JpZ2luYWwgcGxhY2VtZW50IHNob3VsZCBoYXZlIGEgc2V0IHZhcmlhdGlvbi5cbiAgICAgKi9cbiAgICBmbGlwVmFyaWF0aW9uczogZmFsc2UsXG4gICAgLyoqXG4gICAgICogQHByb3Age0Jvb2xlYW59IGZsaXBWYXJpYXRpb25zQnlDb250ZW50PWZhbHNlXG4gICAgICogVGhlIHBvcHBlciB3aWxsIHN3aXRjaCBwbGFjZW1lbnQgdmFyaWF0aW9uIGJldHdlZW4gYC1zdGFydGAgYW5kIGAtZW5kYCB3aGVuXG4gICAgICogdGhlIHBvcHBlciBlbGVtZW50IG92ZXJsYXBzIGl0cyByZWZlcmVuY2UgYm91bmRhcmllcy5cbiAgICAgKlxuICAgICAqIFRoZSBvcmlnaW5hbCBwbGFjZW1lbnQgc2hvdWxkIGhhdmUgYSBzZXQgdmFyaWF0aW9uLlxuICAgICAqL1xuICAgIGZsaXBWYXJpYXRpb25zQnlDb250ZW50OiBmYWxzZVxuICB9LFxuXG4gIC8qKlxuICAgKiBNb2RpZmllciB1c2VkIHRvIG1ha2UgdGhlIHBvcHBlciBmbG93IHRvd2FyZCB0aGUgaW5uZXIgb2YgdGhlIHJlZmVyZW5jZSBlbGVtZW50LlxuICAgKiBCeSBkZWZhdWx0LCB3aGVuIHRoaXMgbW9kaWZpZXIgaXMgZGlzYWJsZWQsIHRoZSBwb3BwZXIgd2lsbCBiZSBwbGFjZWQgb3V0c2lkZVxuICAgKiB0aGUgcmVmZXJlbmNlIGVsZW1lbnQuXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBpbm5lcjoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj03MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDcwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9ZmFsc2UgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogaW5uZXJcbiAgfSxcblxuICAvKipcbiAgICogTW9kaWZpZXIgdXNlZCB0byBoaWRlIHRoZSBwb3BwZXIgd2hlbiBpdHMgcmVmZXJlbmNlIGVsZW1lbnQgaXMgb3V0c2lkZSBvZiB0aGVcbiAgICogcG9wcGVyIGJvdW5kYXJpZXMuIEl0IHdpbGwgc2V0IGEgYHgtb3V0LW9mLWJvdW5kYXJpZXNgIGF0dHJpYnV0ZSB3aGljaCBjYW5cbiAgICogYmUgdXNlZCB0byBoaWRlIHdpdGggYSBDU1Mgc2VsZWN0b3IgdGhlIHBvcHBlciB3aGVuIGl0cyByZWZlcmVuY2UgaXNcbiAgICogb3V0IG9mIGJvdW5kYXJpZXMuXG4gICAqXG4gICAqIFJlcXVpcmVzIHRoZSBgcHJldmVudE92ZXJmbG93YCBtb2RpZmllciBiZWZvcmUgaXQgaW4gb3JkZXIgdG8gd29yay5cbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIGhpZGU6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9ODAwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiA4MDAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPXRydWUgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBoaWRlXG4gIH0sXG5cbiAgLyoqXG4gICAqIENvbXB1dGVzIHRoZSBzdHlsZSB0aGF0IHdpbGwgYmUgYXBwbGllZCB0byB0aGUgcG9wcGVyIGVsZW1lbnQgdG8gZ2V0c1xuICAgKiBwcm9wZXJseSBwb3NpdGlvbmVkLlxuICAgKlxuICAgKiBOb3RlIHRoYXQgdGhpcyBtb2RpZmllciB3aWxsIG5vdCB0b3VjaCB0aGUgRE9NLCBpdCBqdXN0IHByZXBhcmVzIHRoZSBzdHlsZXNcbiAgICogc28gdGhhdCBgYXBwbHlTdHlsZWAgbW9kaWZpZXIgY2FuIGFwcGx5IGl0LiBUaGlzIHNlcGFyYXRpb24gaXMgdXNlZnVsXG4gICAqIGluIGNhc2UgeW91IG5lZWQgdG8gcmVwbGFjZSBgYXBwbHlTdHlsZWAgd2l0aCBhIGN1c3RvbSBpbXBsZW1lbnRhdGlvbi5cbiAgICpcbiAgICogVGhpcyBtb2RpZmllciBoYXMgYDg1MGAgYXMgYG9yZGVyYCB2YWx1ZSB0byBtYWludGFpbiBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG4gICAqIHdpdGggcHJldmlvdXMgdmVyc2lvbnMgb2YgUG9wcGVyLmpzLiBFeHBlY3QgdGhlIG1vZGlmaWVycyBvcmRlcmluZyBtZXRob2RcbiAgICogdG8gY2hhbmdlIGluIGZ1dHVyZSBtYWpvciB2ZXJzaW9ucyBvZiB0aGUgbGlicmFyeS5cbiAgICpcbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIGNvbXB1dGVTdHlsZToge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj04NTAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDg1MCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGNvbXB1dGVTdHlsZSxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7Qm9vbGVhbn0gZ3B1QWNjZWxlcmF0aW9uPXRydWVcbiAgICAgKiBJZiB0cnVlLCBpdCB1c2VzIHRoZSBDU1MgM0QgdHJhbnNmb3JtYXRpb24gdG8gcG9zaXRpb24gdGhlIHBvcHBlci5cbiAgICAgKiBPdGhlcndpc2UsIGl0IHdpbGwgdXNlIHRoZSBgdG9wYCBhbmQgYGxlZnRgIHByb3BlcnRpZXNcbiAgICAgKi9cbiAgICBncHVBY2NlbGVyYXRpb246IHRydWUsXG4gICAgLyoqXG4gICAgICogQHByb3Age3N0cmluZ30gW3g9J2JvdHRvbSddXG4gICAgICogV2hlcmUgdG8gYW5jaG9yIHRoZSBYIGF4aXMgKGBib3R0b21gIG9yIGB0b3BgKS4gQUtBIFggb2Zmc2V0IG9yaWdpbi5cbiAgICAgKiBDaGFuZ2UgdGhpcyBpZiB5b3VyIHBvcHBlciBzaG91bGQgZ3JvdyBpbiBhIGRpcmVjdGlvbiBkaWZmZXJlbnQgZnJvbSBgYm90dG9tYFxuICAgICAqL1xuICAgIHg6ICdib3R0b20nLFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtzdHJpbmd9IFt4PSdsZWZ0J11cbiAgICAgKiBXaGVyZSB0byBhbmNob3IgdGhlIFkgYXhpcyAoYGxlZnRgIG9yIGByaWdodGApLiBBS0EgWSBvZmZzZXQgb3JpZ2luLlxuICAgICAqIENoYW5nZSB0aGlzIGlmIHlvdXIgcG9wcGVyIHNob3VsZCBncm93IGluIGEgZGlyZWN0aW9uIGRpZmZlcmVudCBmcm9tIGByaWdodGBcbiAgICAgKi9cbiAgICB5OiAncmlnaHQnXG4gIH0sXG5cbiAgLyoqXG4gICAqIEFwcGxpZXMgdGhlIGNvbXB1dGVkIHN0eWxlcyB0byB0aGUgcG9wcGVyIGVsZW1lbnQuXG4gICAqXG4gICAqIEFsbCB0aGUgRE9NIG1hbmlwdWxhdGlvbnMgYXJlIGxpbWl0ZWQgdG8gdGhpcyBtb2RpZmllci4gVGhpcyBpcyB1c2VmdWwgaW4gY2FzZVxuICAgKiB5b3Ugd2FudCB0byBpbnRlZ3JhdGUgUG9wcGVyLmpzIGluc2lkZSBhIGZyYW1ld29yayBvciB2aWV3IGxpYnJhcnkgYW5kIHlvdVxuICAgKiB3YW50IHRvIGRlbGVnYXRlIGFsbCB0aGUgRE9NIG1hbmlwdWxhdGlvbnMgdG8gaXQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCBpZiB5b3UgZGlzYWJsZSB0aGlzIG1vZGlmaWVyLCB5b3UgbXVzdCBtYWtlIHN1cmUgdGhlIHBvcHBlciBlbGVtZW50XG4gICAqIGhhcyBpdHMgcG9zaXRpb24gc2V0IHRvIGBhYnNvbHV0ZWAgYmVmb3JlIFBvcHBlci5qcyBjYW4gZG8gaXRzIHdvcmshXG4gICAqXG4gICAqIEp1c3QgZGlzYWJsZSB0aGlzIG1vZGlmaWVyIGFuZCBkZWZpbmUgeW91ciBvd24gdG8gYWNoaWV2ZSB0aGUgZGVzaXJlZCBlZmZlY3QuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBhcHBseVN0eWxlOiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTkwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogOTAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogYXBwbHlTdHlsZSxcbiAgICAvKiogQHByb3Age0Z1bmN0aW9ufSAqL1xuICAgIG9uTG9hZDogYXBwbHlTdHlsZU9uTG9hZCxcbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDEuMTAuMCwgdGhlIHByb3BlcnR5IG1vdmVkIHRvIGBjb21wdXRlU3R5bGVgIG1vZGlmaWVyXG4gICAgICogQHByb3Age0Jvb2xlYW59IGdwdUFjY2VsZXJhdGlvbj10cnVlXG4gICAgICogSWYgdHJ1ZSwgaXQgdXNlcyB0aGUgQ1NTIDNEIHRyYW5zZm9ybWF0aW9uIHRvIHBvc2l0aW9uIHRoZSBwb3BwZXIuXG4gICAgICogT3RoZXJ3aXNlLCBpdCB3aWxsIHVzZSB0aGUgYHRvcGAgYW5kIGBsZWZ0YCBwcm9wZXJ0aWVzXG4gICAgICovXG4gICAgZ3B1QWNjZWxlcmF0aW9uOiB1bmRlZmluZWRcbiAgfVxufTtcblxuLyoqXG4gKiBUaGUgYGRhdGFPYmplY3RgIGlzIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgaW5mb3JtYXRpb24gdXNlZCBieSBQb3BwZXIuanMuXG4gKiBUaGlzIG9iamVjdCBpcyBwYXNzZWQgdG8gbW9kaWZpZXJzIGFuZCB0byB0aGUgYG9uQ3JlYXRlYCBhbmQgYG9uVXBkYXRlYCBjYWxsYmFja3MuXG4gKiBAbmFtZSBkYXRhT2JqZWN0XG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5pbnN0YW5jZSBUaGUgUG9wcGVyLmpzIGluc3RhbmNlXG4gKiBAcHJvcGVydHkge1N0cmluZ30gZGF0YS5wbGFjZW1lbnQgUGxhY2VtZW50IGFwcGxpZWQgdG8gcG9wcGVyXG4gKiBAcHJvcGVydHkge1N0cmluZ30gZGF0YS5vcmlnaW5hbFBsYWNlbWVudCBQbGFjZW1lbnQgb3JpZ2luYWxseSBkZWZpbmVkIG9uIGluaXRcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGF0YS5mbGlwcGVkIFRydWUgaWYgcG9wcGVyIGhhcyBiZWVuIGZsaXBwZWQgYnkgZmxpcCBtb2RpZmllclxuICogQHByb3BlcnR5IHtCb29sZWFufSBkYXRhLmhpZGUgVHJ1ZSBpZiB0aGUgcmVmZXJlbmNlIGVsZW1lbnQgaXMgb3V0IG9mIGJvdW5kYXJpZXMsIHVzZWZ1bCB0byBrbm93IHdoZW4gdG8gaGlkZSB0aGUgcG9wcGVyXG4gKiBAcHJvcGVydHkge0hUTUxFbGVtZW50fSBkYXRhLmFycm93RWxlbWVudCBOb2RlIHVzZWQgYXMgYXJyb3cgYnkgYXJyb3cgbW9kaWZpZXJcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkYXRhLnN0eWxlcyBBbnkgQ1NTIHByb3BlcnR5IGRlZmluZWQgaGVyZSB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIHBvcHBlci4gSXQgZXhwZWN0cyB0aGUgSmF2YVNjcmlwdCBub21lbmNsYXR1cmUgKGVnLiBgbWFyZ2luQm90dG9tYClcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkYXRhLmFycm93U3R5bGVzIEFueSBDU1MgcHJvcGVydHkgZGVmaW5lZCBoZXJlIHdpbGwgYmUgYXBwbGllZCB0byB0aGUgcG9wcGVyIGFycm93LiBJdCBleHBlY3RzIHRoZSBKYXZhU2NyaXB0IG5vbWVuY2xhdHVyZSAoZWcuIGBtYXJnaW5Cb3R0b21gKVxuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEuYm91bmRhcmllcyBPZmZzZXRzIG9mIHRoZSBwb3BwZXIgYm91bmRhcmllc1xuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEub2Zmc2V0cyBUaGUgbWVhc3VyZW1lbnRzIG9mIHBvcHBlciwgcmVmZXJlbmNlIGFuZCBhcnJvdyBlbGVtZW50c1xuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEub2Zmc2V0cy5wb3BwZXIgYHRvcGAsIGBsZWZ0YCwgYHdpZHRoYCwgYGhlaWdodGAgdmFsdWVzXG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSBgdG9wYCwgYGxlZnRgLCBgd2lkdGhgLCBgaGVpZ2h0YCB2YWx1ZXNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkYXRhLm9mZnNldHMuYXJyb3ddIGB0b3BgIGFuZCBgbGVmdGAgb2Zmc2V0cywgb25seSBvbmUgb2YgdGhlbSB3aWxsIGJlIGRpZmZlcmVudCBmcm9tIDBcbiAqL1xuXG4vKipcbiAqIERlZmF1bHQgb3B0aW9ucyBwcm92aWRlZCB0byBQb3BwZXIuanMgY29uc3RydWN0b3IuPGJyIC8+XG4gKiBUaGVzZSBjYW4gYmUgb3ZlcnJpZGRlbiB1c2luZyB0aGUgYG9wdGlvbnNgIGFyZ3VtZW50IG9mIFBvcHBlci5qcy48YnIgLz5cbiAqIFRvIG92ZXJyaWRlIGFuIG9wdGlvbiwgc2ltcGx5IHBhc3MgYW4gb2JqZWN0IHdpdGggdGhlIHNhbWVcbiAqIHN0cnVjdHVyZSBvZiB0aGUgYG9wdGlvbnNgIG9iamVjdCwgYXMgdGhlIDNyZCBhcmd1bWVudC4gRm9yIGV4YW1wbGU6XG4gKiBgYGBcbiAqIG5ldyBQb3BwZXIocmVmLCBwb3AsIHtcbiAqICAgbW9kaWZpZXJzOiB7XG4gKiAgICAgcHJldmVudE92ZXJmbG93OiB7IGVuYWJsZWQ6IGZhbHNlIH1cbiAqICAgfVxuICogfSlcbiAqIGBgYFxuICogQHR5cGUge09iamVjdH1cbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJvZiBQb3BwZXJcbiAqL1xudmFyIERlZmF1bHRzID0ge1xuICAvKipcbiAgICogUG9wcGVyJ3MgcGxhY2VtZW50LlxuICAgKiBAcHJvcCB7UG9wcGVyLnBsYWNlbWVudHN9IHBsYWNlbWVudD0nYm90dG9tJ1xuICAgKi9cbiAgcGxhY2VtZW50OiAnYm90dG9tJyxcblxuICAvKipcbiAgICogU2V0IHRoaXMgdG8gdHJ1ZSBpZiB5b3Ugd2FudCBwb3BwZXIgdG8gcG9zaXRpb24gaXQgc2VsZiBpbiAnZml4ZWQnIG1vZGVcbiAgICogQHByb3Age0Jvb2xlYW59IHBvc2l0aW9uRml4ZWQ9ZmFsc2VcbiAgICovXG4gIHBvc2l0aW9uRml4ZWQ6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIGV2ZW50cyAocmVzaXplLCBzY3JvbGwpIGFyZSBpbml0aWFsbHkgZW5hYmxlZC5cbiAgICogQHByb3Age0Jvb2xlYW59IGV2ZW50c0VuYWJsZWQ9dHJ1ZVxuICAgKi9cbiAgZXZlbnRzRW5hYmxlZDogdHJ1ZSxcblxuICAvKipcbiAgICogU2V0IHRvIHRydWUgaWYgeW91IHdhbnQgdG8gYXV0b21hdGljYWxseSByZW1vdmUgdGhlIHBvcHBlciB3aGVuXG4gICAqIHlvdSBjYWxsIHRoZSBgZGVzdHJveWAgbWV0aG9kLlxuICAgKiBAcHJvcCB7Qm9vbGVhbn0gcmVtb3ZlT25EZXN0cm95PWZhbHNlXG4gICAqL1xuICByZW1vdmVPbkRlc3Ryb3k6IGZhbHNlLFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBjYWxsZWQgd2hlbiB0aGUgcG9wcGVyIGlzIGNyZWF0ZWQuPGJyIC8+XG4gICAqIEJ5IGRlZmF1bHQsIGl0IGlzIHNldCB0byBuby1vcC48YnIgLz5cbiAgICogQWNjZXNzIFBvcHBlci5qcyBpbnN0YW5jZSB3aXRoIGBkYXRhLmluc3RhbmNlYC5cbiAgICogQHByb3Age29uQ3JlYXRlfVxuICAgKi9cbiAgb25DcmVhdGU6IGZ1bmN0aW9uIG9uQ3JlYXRlKCkge30sXG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGNhbGxlZCB3aGVuIHRoZSBwb3BwZXIgaXMgdXBkYXRlZC4gVGhpcyBjYWxsYmFjayBpcyBub3QgY2FsbGVkXG4gICAqIG9uIHRoZSBpbml0aWFsaXphdGlvbi9jcmVhdGlvbiBvZiB0aGUgcG9wcGVyLCBidXQgb25seSBvbiBzdWJzZXF1ZW50XG4gICAqIHVwZGF0ZXMuPGJyIC8+XG4gICAqIEJ5IGRlZmF1bHQsIGl0IGlzIHNldCB0byBuby1vcC48YnIgLz5cbiAgICogQWNjZXNzIFBvcHBlci5qcyBpbnN0YW5jZSB3aXRoIGBkYXRhLmluc3RhbmNlYC5cbiAgICogQHByb3Age29uVXBkYXRlfVxuICAgKi9cbiAgb25VcGRhdGU6IGZ1bmN0aW9uIG9uVXBkYXRlKCkge30sXG5cbiAgLyoqXG4gICAqIExpc3Qgb2YgbW9kaWZpZXJzIHVzZWQgdG8gbW9kaWZ5IHRoZSBvZmZzZXRzIGJlZm9yZSB0aGV5IGFyZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIuXG4gICAqIFRoZXkgcHJvdmlkZSBtb3N0IG9mIHRoZSBmdW5jdGlvbmFsaXRpZXMgb2YgUG9wcGVyLmpzLlxuICAgKiBAcHJvcCB7bW9kaWZpZXJzfVxuICAgKi9cbiAgbW9kaWZpZXJzOiBtb2RpZmllcnNcbn07XG5cbi8qKlxuICogQGNhbGxiYWNrIG9uQ3JlYXRlXG4gKiBAcGFyYW0ge2RhdGFPYmplY3R9IGRhdGFcbiAqL1xuXG4vKipcbiAqIEBjYWxsYmFjayBvblVwZGF0ZVxuICogQHBhcmFtIHtkYXRhT2JqZWN0fSBkYXRhXG4gKi9cblxuLy8gVXRpbHNcbi8vIE1ldGhvZHNcbnZhciBQb3BwZXIgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IFBvcHBlci5qcyBpbnN0YW5jZS5cbiAgICogQGNsYXNzIFBvcHBlclxuICAgKiBAcGFyYW0ge0VsZW1lbnR8cmVmZXJlbmNlT2JqZWN0fSByZWZlcmVuY2UgLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgdXNlZCB0byBwb3NpdGlvbiB0aGUgcG9wcGVyXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gcG9wcGVyIC0gVGhlIEhUTUwgLyBYTUwgZWxlbWVudCB1c2VkIGFzIHRoZSBwb3BwZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBZb3VyIGN1c3RvbSBvcHRpb25zIHRvIG92ZXJyaWRlIHRoZSBvbmVzIGRlZmluZWQgaW4gW0RlZmF1bHRzXSgjZGVmYXVsdHMpXG4gICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2UgLSBUaGUgZ2VuZXJhdGVkIFBvcHBlci5qcyBpbnN0YW5jZVxuICAgKi9cbiAgZnVuY3Rpb24gUG9wcGVyKHJlZmVyZW5jZSwgcG9wcGVyKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBQb3BwZXIpO1xuXG4gICAgdGhpcy5zY2hlZHVsZVVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX3RoaXMudXBkYXRlKTtcbiAgICB9O1xuXG4gICAgLy8gbWFrZSB1cGRhdGUoKSBkZWJvdW5jZWQsIHNvIHRoYXQgaXQgb25seSBydW5zIGF0IG1vc3Qgb25jZS1wZXItdGlja1xuICAgIHRoaXMudXBkYXRlID0gZGVib3VuY2UodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cbiAgICAvLyB3aXRoIHt9IHdlIGNyZWF0ZSBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgb3B0aW9ucyBpbnNpZGUgaXRcbiAgICB0aGlzLm9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgUG9wcGVyLkRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgIC8vIGluaXQgc3RhdGVcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNEZXN0cm95ZWQ6IGZhbHNlLFxuICAgICAgaXNDcmVhdGVkOiBmYWxzZSxcbiAgICAgIHNjcm9sbFBhcmVudHM6IFtdXG4gICAgfTtcblxuICAgIC8vIGdldCByZWZlcmVuY2UgYW5kIHBvcHBlciBlbGVtZW50cyAoYWxsb3cgalF1ZXJ5IHdyYXBwZXJzKVxuICAgIHRoaXMucmVmZXJlbmNlID0gcmVmZXJlbmNlICYmIHJlZmVyZW5jZS5qcXVlcnkgPyByZWZlcmVuY2VbMF0gOiByZWZlcmVuY2U7XG4gICAgdGhpcy5wb3BwZXIgPSBwb3BwZXIgJiYgcG9wcGVyLmpxdWVyeSA/IHBvcHBlclswXSA6IHBvcHBlcjtcblxuICAgIC8vIERlZXAgbWVyZ2UgbW9kaWZpZXJzIG9wdGlvbnNcbiAgICB0aGlzLm9wdGlvbnMubW9kaWZpZXJzID0ge307XG4gICAgT2JqZWN0LmtleXMoX2V4dGVuZHMoe30sIFBvcHBlci5EZWZhdWx0cy5tb2RpZmllcnMsIG9wdGlvbnMubW9kaWZpZXJzKSkuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgX3RoaXMub3B0aW9ucy5tb2RpZmllcnNbbmFtZV0gPSBfZXh0ZW5kcyh7fSwgUG9wcGVyLkRlZmF1bHRzLm1vZGlmaWVyc1tuYW1lXSB8fCB7fSwgb3B0aW9ucy5tb2RpZmllcnMgPyBvcHRpb25zLm1vZGlmaWVyc1tuYW1lXSA6IHt9KTtcbiAgICB9KTtcblxuICAgIC8vIFJlZmFjdG9yaW5nIG1vZGlmaWVycycgbGlzdCAoT2JqZWN0ID0+IEFycmF5KVxuICAgIHRoaXMubW9kaWZpZXJzID0gT2JqZWN0LmtleXModGhpcy5vcHRpb25zLm1vZGlmaWVycykubWFwKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICByZXR1cm4gX2V4dGVuZHMoe1xuICAgICAgICBuYW1lOiBuYW1lXG4gICAgICB9LCBfdGhpcy5vcHRpb25zLm1vZGlmaWVyc1tuYW1lXSk7XG4gICAgfSlcbiAgICAvLyBzb3J0IHRoZSBtb2RpZmllcnMgYnkgb3JkZXJcbiAgICAuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGEub3JkZXIgLSBiLm9yZGVyO1xuICAgIH0pO1xuXG4gICAgLy8gbW9kaWZpZXJzIGhhdmUgdGhlIGFiaWxpdHkgdG8gZXhlY3V0ZSBhcmJpdHJhcnkgY29kZSB3aGVuIFBvcHBlci5qcyBnZXQgaW5pdGVkXG4gICAgLy8gc3VjaCBjb2RlIGlzIGV4ZWN1dGVkIGluIHRoZSBzYW1lIG9yZGVyIG9mIGl0cyBtb2RpZmllclxuICAgIC8vIHRoZXkgY291bGQgYWRkIG5ldyBwcm9wZXJ0aWVzIHRvIHRoZWlyIG9wdGlvbnMgY29uZmlndXJhdGlvblxuICAgIC8vIEJFIEFXQVJFOiBkb24ndCBhZGQgb3B0aW9ucyB0byBgb3B0aW9ucy5tb2RpZmllcnMubmFtZWAgYnV0IHRvIGBtb2RpZmllck9wdGlvbnNgIVxuICAgIHRoaXMubW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyT3B0aW9ucykge1xuICAgICAgaWYgKG1vZGlmaWVyT3B0aW9ucy5lbmFibGVkICYmIGlzRnVuY3Rpb24obW9kaWZpZXJPcHRpb25zLm9uTG9hZCkpIHtcbiAgICAgICAgbW9kaWZpZXJPcHRpb25zLm9uTG9hZChfdGhpcy5yZWZlcmVuY2UsIF90aGlzLnBvcHBlciwgX3RoaXMub3B0aW9ucywgbW9kaWZpZXJPcHRpb25zLCBfdGhpcy5zdGF0ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBmaXJlIHRoZSBmaXJzdCB1cGRhdGUgdG8gcG9zaXRpb24gdGhlIHBvcHBlciBpbiB0aGUgcmlnaHQgcGxhY2VcbiAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgdmFyIGV2ZW50c0VuYWJsZWQgPSB0aGlzLm9wdGlvbnMuZXZlbnRzRW5hYmxlZDtcbiAgICBpZiAoZXZlbnRzRW5hYmxlZCkge1xuICAgICAgLy8gc2V0dXAgZXZlbnQgbGlzdGVuZXJzLCB0aGV5IHdpbGwgdGFrZSBjYXJlIG9mIHVwZGF0ZSB0aGUgcG9zaXRpb24gaW4gc3BlY2lmaWMgc2l0dWF0aW9uc1xuICAgICAgdGhpcy5lbmFibGVFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGUuZXZlbnRzRW5hYmxlZCA9IGV2ZW50c0VuYWJsZWQ7XG4gIH1cblxuICAvLyBXZSBjYW4ndCB1c2UgY2xhc3MgcHJvcGVydGllcyBiZWNhdXNlIHRoZXkgZG9uJ3QgZ2V0IGxpc3RlZCBpbiB0aGVcbiAgLy8gY2xhc3MgcHJvdG90eXBlIGFuZCBicmVhayBzdHVmZiBsaWtlIFNpbm9uIHN0dWJzXG5cblxuICBjcmVhdGVDbGFzcyhQb3BwZXIsIFt7XG4gICAga2V5OiAndXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlJCQxKCkge1xuICAgICAgcmV0dXJuIHVwZGF0ZS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95JCQxKCkge1xuICAgICAgcmV0dXJuIGRlc3Ryb3kuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdlbmFibGVFdmVudExpc3RlbmVycycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuYWJsZUV2ZW50TGlzdGVuZXJzJCQxKCkge1xuICAgICAgcmV0dXJuIGVuYWJsZUV2ZW50TGlzdGVuZXJzLmNhbGwodGhpcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGlzYWJsZUV2ZW50TGlzdGVuZXJzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzYWJsZUV2ZW50TGlzdGVuZXJzJCQxKCkge1xuICAgICAgcmV0dXJuIGRpc2FibGVFdmVudExpc3RlbmVycy5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNjaGVkdWxlcyBhbiB1cGRhdGUuIEl0IHdpbGwgcnVuIG9uIHRoZSBuZXh0IFVJIHVwZGF0ZSBhdmFpbGFibGUuXG4gICAgICogQG1ldGhvZCBzY2hlZHVsZVVwZGF0ZVxuICAgICAqIEBtZW1iZXJvZiBQb3BwZXJcbiAgICAgKi9cblxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdGlvbiBvZiB1dGlsaXRpZXMgdXNlZnVsIHdoZW4gd3JpdGluZyBjdXN0b20gbW9kaWZpZXJzLlxuICAgICAqIFN0YXJ0aW5nIGZyb20gdmVyc2lvbiAxLjcsIHRoaXMgbWV0aG9kIGlzIGF2YWlsYWJsZSBvbmx5IGlmIHlvdVxuICAgICAqIGluY2x1ZGUgYHBvcHBlci11dGlscy5qc2AgYmVmb3JlIGBwb3BwZXIuanNgLlxuICAgICAqXG4gICAgICogKipERVBSRUNBVElPTioqOiBUaGlzIHdheSB0byBhY2Nlc3MgUG9wcGVyVXRpbHMgaXMgZGVwcmVjYXRlZFxuICAgICAqIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdjIhIFVzZSB0aGUgUG9wcGVyVXRpbHMgbW9kdWxlIGRpcmVjdGx5IGluc3RlYWQuXG4gICAgICogRHVlIHRvIHRoZSBoaWdoIGluc3RhYmlsaXR5IG9mIHRoZSBtZXRob2RzIGNvbnRhaW5lZCBpbiBVdGlscywgd2UgY2FuJ3RcbiAgICAgKiBndWFyYW50ZWUgdGhlbSB0byBmb2xsb3cgc2VtdmVyLiBVc2UgdGhlbSBhdCB5b3VyIG93biByaXNrIVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAxLjhcbiAgICAgKiBAbWVtYmVyIFV0aWxzXG4gICAgICogQG1lbWJlcm9mIFBvcHBlclxuICAgICAqL1xuXG4gIH1dKTtcbiAgcmV0dXJuIFBvcHBlcjtcbn0oKTtcblxuLyoqXG4gKiBUaGUgYHJlZmVyZW5jZU9iamVjdGAgaXMgYW4gb2JqZWN0IHRoYXQgcHJvdmlkZXMgYW4gaW50ZXJmYWNlIGNvbXBhdGlibGUgd2l0aCBQb3BwZXIuanNcbiAqIGFuZCBsZXRzIHlvdSB1c2UgaXQgYXMgcmVwbGFjZW1lbnQgb2YgYSByZWFsIERPTSBub2RlLjxiciAvPlxuICogWW91IGNhbiB1c2UgdGhpcyBtZXRob2QgdG8gcG9zaXRpb24gYSBwb3BwZXIgcmVsYXRpdmVseSB0byBhIHNldCBvZiBjb29yZGluYXRlc1xuICogaW4gY2FzZSB5b3UgZG9uJ3QgaGF2ZSBhIERPTSBub2RlIHRvIHVzZSBhcyByZWZlcmVuY2UuXG4gKlxuICogYGBgXG4gKiBuZXcgUG9wcGVyKHJlZmVyZW5jZU9iamVjdCwgcG9wcGVyTm9kZSk7XG4gKiBgYGBcbiAqXG4gKiBOQjogVGhpcyBmZWF0dXJlIGlzbid0IHN1cHBvcnRlZCBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMC5cbiAqIEBuYW1lIHJlZmVyZW5jZU9iamVjdFxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gZGF0YS5nZXRCb3VuZGluZ0NsaWVudFJlY3RcbiAqIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgc2V0IG9mIGNvb3JkaW5hdGVzIGNvbXBhdGlibGUgd2l0aCB0aGUgbmF0aXZlIGBnZXRCb3VuZGluZ0NsaWVudFJlY3RgIG1ldGhvZC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkYXRhLmNsaWVudFdpZHRoXG4gKiBBbiBFUzYgZ2V0dGVyIHRoYXQgd2lsbCByZXR1cm4gdGhlIHdpZHRoIG9mIHRoZSB2aXJ0dWFsIHJlZmVyZW5jZSBlbGVtZW50LlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGRhdGEuY2xpZW50SGVpZ2h0XG4gKiBBbiBFUzYgZ2V0dGVyIHRoYXQgd2lsbCByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgdmlydHVhbCByZWZlcmVuY2UgZWxlbWVudC5cbiAqL1xuXG5cblBvcHBlci5VdGlscyA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbCkuUG9wcGVyVXRpbHM7XG5Qb3BwZXIucGxhY2VtZW50cyA9IHBsYWNlbWVudHM7XG5Qb3BwZXIuRGVmYXVsdHMgPSBEZWZhdWx0cztcblxuZXhwb3J0IGRlZmF1bHQgUG9wcGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cG9wcGVyLmpzLm1hcFxuIiwiLyoqIVxuICogQGZpbGVPdmVydmlldyBLaWNrYXNzIGxpYnJhcnkgdG8gY3JlYXRlIGFuZCBwbGFjZSBwb3BwZXJzIG5lYXIgdGhlaXIgcmVmZXJlbmNlIGVsZW1lbnRzLlxuICogQHZlcnNpb24gMS4zLjJcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTYgRmVkZXJpY28gWml2b2xvIGFuZCBjb250cmlidXRvcnNcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG4gKiBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEVcbiAqIFNPRlRXQVJFLlxuICovXG5pbXBvcnQgUG9wcGVyIGZyb20gJ3BvcHBlci5qcyc7XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIHZhcmlhYmxlIGlzIGEgZnVuY3Rpb25cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7QW55fSBmdW5jdGlvblRvQ2hlY2sgLSB2YXJpYWJsZSB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IGFuc3dlciB0bzogaXMgYSBmdW5jdGlvbj9cbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbihmdW5jdGlvblRvQ2hlY2spIHtcbiAgdmFyIGdldFR5cGUgPSB7fTtcbiAgcmV0dXJuIGZ1bmN0aW9uVG9DaGVjayAmJiBnZXRUeXBlLnRvU3RyaW5nLmNhbGwoZnVuY3Rpb25Ub0NoZWNrKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxudmFyIGNsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07XG5cbnZhciBjcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTtcblxuXG5cblxuXG5cblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07XG5cbnZhciBERUZBVUxUX09QVElPTlMgPSB7XG4gIGNvbnRhaW5lcjogZmFsc2UsXG4gIGRlbGF5OiAwLFxuICBodG1sOiBmYWxzZSxcbiAgcGxhY2VtZW50OiAndG9wJyxcbiAgdGl0bGU6ICcnLFxuICB0ZW1wbGF0ZTogJzxkaXYgY2xhc3M9XCJ0b29sdGlwXCIgcm9sZT1cInRvb2x0aXBcIj48ZGl2IGNsYXNzPVwidG9vbHRpcC1hcnJvd1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCI+PC9kaXY+PC9kaXY+JyxcbiAgdHJpZ2dlcjogJ2hvdmVyIGZvY3VzJyxcbiAgb2Zmc2V0OiAwLFxuICBhcnJvd1NlbGVjdG9yOiAnLnRvb2x0aXAtYXJyb3csIC50b29sdGlwX19hcnJvdycsXG4gIGlubmVyU2VsZWN0b3I6ICcudG9vbHRpcC1pbm5lciwgLnRvb2x0aXBfX2lubmVyJ1xufTtcblxudmFyIFRvb2x0aXAgPSBmdW5jdGlvbiAoKSB7XG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgVG9vbHRpcC5qcyBpbnN0YW5jZVxuICAgKiBAY2xhc3MgVG9vbHRpcFxuICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByZWZlcmVuY2UgLSBUaGUgRE9NIG5vZGUgdXNlZCBhcyByZWZlcmVuY2Ugb2YgdGhlIHRvb2x0aXAgKGl0IGNhbiBiZSBhIGpRdWVyeSBlbGVtZW50KS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMucGxhY2VtZW50PSd0b3AnXG4gICAqICAgICAgUGxhY2VtZW50IG9mIHRoZSBwb3BwZXIgYWNjZXB0ZWQgdmFsdWVzOiBgdG9wKC1zdGFydCwgLWVuZCksIHJpZ2h0KC1zdGFydCwgLWVuZCksIGJvdHRvbSgtc3RhcnQsIC1lbmQpLFxuICAgKiAgICAgIGxlZnQoLXN0YXJ0LCAtZW5kKWBcbiAgICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuYXJyb3dTZWxlY3Rvcj0nLnRvb2x0aXAtYXJyb3csIC50b29sdGlwX19hcnJvdycgLSBjbGFzc05hbWUgdXNlZCB0byBsb2NhdGUgdGhlIERPTSBhcnJvdyBlbGVtZW50IGluIHRoZSB0b29sdGlwLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5pbm5lclNlbGVjdG9yPScudG9vbHRpcC1pbm5lciwgLnRvb2x0aXBfX2lubmVyJyAtIGNsYXNzTmFtZSB1c2VkIHRvIGxvY2F0ZSB0aGUgRE9NIGlubmVyIGVsZW1lbnQgaW4gdGhlIHRvb2x0aXAuXG4gICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR8U3RyaW5nfGZhbHNlfSBvcHRpb25zLmNvbnRhaW5lcj1mYWxzZSAtIEFwcGVuZCB0aGUgdG9vbHRpcCB0byBhIHNwZWNpZmljIGVsZW1lbnQuXG4gICAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gb3B0aW9ucy5kZWxheT0wXG4gICAqICAgICAgRGVsYXkgc2hvd2luZyBhbmQgaGlkaW5nIHRoZSB0b29sdGlwIChtcykgLSBkb2VzIG5vdCBhcHBseSB0byBtYW51YWwgdHJpZ2dlciB0eXBlLlxuICAgKiAgICAgIElmIGEgbnVtYmVyIGlzIHN1cHBsaWVkLCBkZWxheSBpcyBhcHBsaWVkIHRvIGJvdGggaGlkZS9zaG93LlxuICAgKiAgICAgIE9iamVjdCBzdHJ1Y3R1cmUgaXM6IGB7IHNob3c6IDUwMCwgaGlkZTogMTAwIH1gXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5odG1sPWZhbHNlIC0gSW5zZXJ0IEhUTUwgaW50byB0aGUgdG9vbHRpcC4gSWYgZmFsc2UsIHRoZSBjb250ZW50IHdpbGwgaW5zZXJ0ZWQgd2l0aCBgdGV4dENvbnRlbnRgLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMudGVtcGxhdGU9JzxkaXYgY2xhc3M9XCJ0b29sdGlwXCIgcm9sZT1cInRvb2x0aXBcIj48ZGl2IGNsYXNzPVwidG9vbHRpcC1hcnJvd1wiPjwvZGl2PjxkaXYgY2xhc3M9XCJ0b29sdGlwLWlubmVyXCI+PC9kaXY+PC9kaXY+J11cbiAgICogICAgICBCYXNlIEhUTUwgdG8gdXNlZCB3aGVuIGNyZWF0aW5nIHRoZSB0b29sdGlwLlxuICAgKiAgICAgIFRoZSB0b29sdGlwJ3MgYHRpdGxlYCB3aWxsIGJlIGluamVjdGVkIGludG8gdGhlIGAudG9vbHRpcC1pbm5lcmAgb3IgYC50b29sdGlwX19pbm5lcmAuXG4gICAqICAgICAgYC50b29sdGlwLWFycm93YCBvciBgLnRvb2x0aXBfX2Fycm93YCB3aWxsIGJlY29tZSB0aGUgdG9vbHRpcCdzIGFycm93LlxuICAgKiAgICAgIFRoZSBvdXRlcm1vc3Qgd3JhcHBlciBlbGVtZW50IHNob3VsZCBoYXZlIHRoZSBgLnRvb2x0aXBgIGNsYXNzLlxuICAgKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudHxUaXRsZUZ1bmN0aW9ufSBvcHRpb25zLnRpdGxlPScnIC0gRGVmYXVsdCB0aXRsZSB2YWx1ZSBpZiBgdGl0bGVgIGF0dHJpYnV0ZSBpc24ndCBwcmVzZW50LlxuICAgKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMudHJpZ2dlcj0naG92ZXIgZm9jdXMnXVxuICAgKiAgICAgIEhvdyB0b29sdGlwIGlzIHRyaWdnZXJlZCAtIGNsaWNrLCBob3ZlciwgZm9jdXMsIG1hbnVhbC5cbiAgICogICAgICBZb3UgbWF5IHBhc3MgbXVsdGlwbGUgdHJpZ2dlcnM7IHNlcGFyYXRlIHRoZW0gd2l0aCBhIHNwYWNlLiBgbWFudWFsYCBjYW5ub3QgYmUgY29tYmluZWQgd2l0aCBhbnkgb3RoZXIgdHJpZ2dlci5cbiAgICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmNsb3NlT25DbGlja091dHNpZGU9ZmFsc2UgLSBDbG9zZSBhIHBvcHBlciBvbiBjbGljayBvdXRzaWRlIG9mIHRoZSBwb3BwZXIgYW5kIHJlZmVyZW5jZSBlbGVtZW50LiBUaGlzIGhhcyBlZmZlY3Qgb25seSB3aGVuIG9wdGlvbnMudHJpZ2dlciBpcyAnY2xpY2snLlxuICAgKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudH0gb3B0aW9ucy5ib3VuZGFyaWVzRWxlbWVudFxuICAgKiAgICAgIFRoZSBlbGVtZW50IHVzZWQgYXMgYm91bmRhcmllcyBmb3IgdGhlIHRvb2x0aXAuIEZvciBtb3JlIGluZm9ybWF0aW9uIHJlZmVyIHRvIFBvcHBlci5qcydcbiAgICogICAgICBbYm91bmRhcmllc0VsZW1lbnQgZG9jc10oaHR0cHM6Ly9wb3BwZXIuanMub3JnL3BvcHBlci1kb2N1bWVudGF0aW9uLmh0bWwpXG4gICAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gb3B0aW9ucy5vZmZzZXQ9MCAtIE9mZnNldCBvZiB0aGUgdG9vbHRpcCByZWxhdGl2ZSB0byBpdHMgcmVmZXJlbmNlLiBGb3IgbW9yZSBpbmZvcm1hdGlvbiByZWZlciB0byBQb3BwZXIuanMnXG4gICAqICAgICAgW29mZnNldCBkb2NzXShodHRwczovL3BvcHBlci5qcy5vcmcvcG9wcGVyLWRvY3VtZW50YXRpb24uaHRtbClcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucG9wcGVyT3B0aW9ucz17fSAtIFBvcHBlciBvcHRpb25zLCB3aWxsIGJlIHBhc3NlZCBkaXJlY3RseSB0byBwb3BwZXIgaW5zdGFuY2UuIEZvciBtb3JlIGluZm9ybWF0aW9uIHJlZmVyIHRvIFBvcHBlci5qcydcbiAgICogICAgICBbb3B0aW9ucyBkb2NzXShodHRwczovL3BvcHBlci5qcy5vcmcvcG9wcGVyLWRvY3VtZW50YXRpb24uaHRtbClcbiAgICogQHJldHVybiB7T2JqZWN0fSBpbnN0YW5jZSAtIFRoZSBnZW5lcmF0ZWQgdG9vbHRpcCBpbnN0YW5jZVxuICAgKi9cbiAgZnVuY3Rpb24gVG9vbHRpcChyZWZlcmVuY2UsIG9wdGlvbnMpIHtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBUb29sdGlwKTtcblxuICAgIF9pbml0aWFsaXNlUHJvcHMuY2FsbCh0aGlzKTtcblxuICAgIC8vIGFwcGx5IHVzZXIgb3B0aW9ucyBvdmVyIGRlZmF1bHQgb25lc1xuICAgIG9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgREVGQVVMVF9PUFRJT05TLCBvcHRpb25zKTtcblxuICAgIHJlZmVyZW5jZS5qcXVlcnkgJiYgKHJlZmVyZW5jZSA9IHJlZmVyZW5jZVswXSk7XG5cbiAgICAvLyBjYWNoZSByZWZlcmVuY2UgYW5kIG9wdGlvbnNcbiAgICB0aGlzLnJlZmVyZW5jZSA9IHJlZmVyZW5jZTtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuXG4gICAgLy8gZ2V0IGV2ZW50cyBsaXN0XG4gICAgdmFyIGV2ZW50cyA9IHR5cGVvZiBvcHRpb25zLnRyaWdnZXIgPT09ICdzdHJpbmcnID8gb3B0aW9ucy50cmlnZ2VyLnNwbGl0KCcgJykuZmlsdGVyKGZ1bmN0aW9uICh0cmlnZ2VyKSB7XG4gICAgICByZXR1cm4gWydjbGljaycsICdob3ZlcicsICdmb2N1cyddLmluZGV4T2YodHJpZ2dlcikgIT09IC0xO1xuICAgIH0pIDogW107XG5cbiAgICAvLyBzZXQgaW5pdGlhbCBzdGF0ZVxuICAgIHRoaXMuX2lzT3BlbiA9IGZhbHNlO1xuICAgIHRoaXMuX3BvcHBlck9wdGlvbnMgPSB7fTtcblxuICAgIC8vIHNldCBldmVudCBsaXN0ZW5lcnNcbiAgICB0aGlzLl9zZXRFdmVudExpc3RlbmVycyhyZWZlcmVuY2UsIGV2ZW50cywgb3B0aW9ucyk7XG4gIH1cblxuICAvL1xuICAvLyBQdWJsaWMgbWV0aG9kc1xuICAvL1xuXG4gIC8qKlxuICAgKiBSZXZlYWxzIGFuIGVsZW1lbnQncyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSBcIm1hbnVhbFwiIHRyaWdnZXJpbmcgb2YgdGhlIHRvb2x0aXAuXG4gICAqIFRvb2x0aXBzIHdpdGggemVyby1sZW5ndGggdGl0bGVzIGFyZSBuZXZlciBkaXNwbGF5ZWQuXG4gICAqIEBtZXRob2QgVG9vbHRpcCNzaG93XG4gICAqIEBtZW1iZXJvZiBUb29sdGlwXG4gICAqL1xuXG5cbiAgLyoqXG4gICAqIEhpZGVzIGFuIGVsZW1lbnTigJlzIHRvb2x0aXAuIFRoaXMgaXMgY29uc2lkZXJlZCBhIOKAnG1hbnVhbOKAnSB0cmlnZ2VyaW5nIG9mIHRoZSB0b29sdGlwLlxuICAgKiBAbWV0aG9kIFRvb2x0aXAjaGlkZVxuICAgKiBAbWVtYmVyb2YgVG9vbHRpcFxuICAgKi9cblxuXG4gIC8qKlxuICAgKiBIaWRlcyBhbmQgZGVzdHJveXMgYW4gZWxlbWVudOKAmXMgdG9vbHRpcC5cbiAgICogQG1ldGhvZCBUb29sdGlwI2Rpc3Bvc2VcbiAgICogQG1lbWJlcm9mIFRvb2x0aXBcbiAgICovXG5cblxuICAvKipcbiAgICogVG9nZ2xlcyBhbiBlbGVtZW504oCZcyB0b29sdGlwLiBUaGlzIGlzIGNvbnNpZGVyZWQgYSDigJxtYW51YWzigJ0gdHJpZ2dlcmluZyBvZiB0aGUgdG9vbHRpcC5cbiAgICogQG1ldGhvZCBUb29sdGlwI3RvZ2dsZVxuICAgKiBAbWVtYmVyb2YgVG9vbHRpcFxuICAgKi9cblxuXG4gIC8qKlxuICAgKiBVcGRhdGVzIHRoZSB0b29sdGlwJ3MgdGl0bGUgY29udGVudFxuICAgKiBAbWV0aG9kIFRvb2x0aXAjdXBkYXRlVGl0bGVDb250ZW50XG4gICAqIEBtZW1iZXJvZiBUb29sdGlwXG4gICAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fSB0aXRsZSAtIFRoZSBuZXcgY29udGVudCB0byB1c2UgZm9yIHRoZSB0aXRsZVxuICAgKi9cblxuXG4gIC8vXG4gIC8vIFByaXZhdGUgbWV0aG9kc1xuICAvL1xuXG4gIGNyZWF0ZUNsYXNzKFRvb2x0aXAsIFt7XG4gICAga2V5OiAnX2NyZWF0ZScsXG5cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgdG9vbHRpcCBub2RlXG4gICAgICogQG1lbWJlcm9mIFRvb2x0aXBcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHJlZmVyZW5jZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSB0ZW1wbGF0ZVxuICAgICAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fFRpdGxlRnVuY3Rpb259IHRpdGxlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBhbGxvd0h0bWxcbiAgICAgKiBAcmV0dXJuIHtIVE1MRWxlbWVudH0gdG9vbHRpcE5vZGVcbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NyZWF0ZShyZWZlcmVuY2UsIHRlbXBsYXRlLCB0aXRsZSwgYWxsb3dIdG1sKSB7XG4gICAgICAvLyBjcmVhdGUgdG9vbHRpcCBlbGVtZW50XG4gICAgICB2YXIgdG9vbHRpcEdlbmVyYXRvciA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRvb2x0aXBHZW5lcmF0b3IuaW5uZXJIVE1MID0gdGVtcGxhdGUudHJpbSgpO1xuICAgICAgdmFyIHRvb2x0aXBOb2RlID0gdG9vbHRpcEdlbmVyYXRvci5jaGlsZE5vZGVzWzBdO1xuXG4gICAgICAvLyBhZGQgdW5pcXVlIElEIHRvIG91ciB0b29sdGlwIChuZWVkZWQgZm9yIGFjY2Vzc2liaWxpdHkgcmVhc29ucylcbiAgICAgIHRvb2x0aXBOb2RlLmlkID0gJ3Rvb2x0aXBfJyArIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCAxMCk7XG5cbiAgICAgIC8vIHNldCBpbml0aWFsIGBhcmlhLWhpZGRlbmAgc3RhdGUgdG8gYGZhbHNlYCAoaXQncyB2aXNpYmxlISlcbiAgICAgIHRvb2x0aXBOb2RlLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcblxuICAgICAgLy8gYWRkIHRpdGxlIHRvIHRvb2x0aXBcbiAgICAgIHZhciB0aXRsZU5vZGUgPSB0b29sdGlwR2VuZXJhdG9yLnF1ZXJ5U2VsZWN0b3IodGhpcy5vcHRpb25zLmlubmVyU2VsZWN0b3IpO1xuICAgICAgdGhpcy5fYWRkVGl0bGVDb250ZW50KHJlZmVyZW5jZSwgdGl0bGUsIGFsbG93SHRtbCwgdGl0bGVOb2RlKTtcblxuICAgICAgLy8gcmV0dXJuIHRoZSBnZW5lcmF0ZWQgdG9vbHRpcCBub2RlXG4gICAgICByZXR1cm4gdG9vbHRpcE5vZGU7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2FkZFRpdGxlQ29udGVudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9hZGRUaXRsZUNvbnRlbnQocmVmZXJlbmNlLCB0aXRsZSwgYWxsb3dIdG1sLCB0aXRsZU5vZGUpIHtcbiAgICAgIGlmICh0aXRsZS5ub2RlVHlwZSA9PT0gMSB8fCB0aXRsZS5ub2RlVHlwZSA9PT0gMTEpIHtcbiAgICAgICAgLy8gaWYgdGl0bGUgaXMgYSBlbGVtZW50IG5vZGUgb3IgZG9jdW1lbnQgZnJhZ21lbnQsIGFwcGVuZCBpdCBvbmx5IGlmIGFsbG93SHRtbCBpcyB0cnVlXG4gICAgICAgIGFsbG93SHRtbCAmJiB0aXRsZU5vZGUuYXBwZW5kQ2hpbGQodGl0bGUpO1xuICAgICAgfSBlbHNlIGlmIChpc0Z1bmN0aW9uKHRpdGxlKSkge1xuICAgICAgICAvLyBpZiB0aXRsZSBpcyBhIGZ1bmN0aW9uLCBjYWxsIGl0IGFuZCBzZXQgdGV4dENvbnRlbnQgb3IgaW5uZXJIdG1sIGRlcGVuZGluZyBieSBgYWxsb3dIdG1sYCB2YWx1ZVxuICAgICAgICB2YXIgdGl0bGVUZXh0ID0gdGl0bGUuY2FsbChyZWZlcmVuY2UpO1xuICAgICAgICBhbGxvd0h0bWwgPyB0aXRsZU5vZGUuaW5uZXJIVE1MID0gdGl0bGVUZXh0IDogdGl0bGVOb2RlLnRleHRDb250ZW50ID0gdGl0bGVUZXh0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaWYgaXQncyBqdXN0IGEgc2ltcGxlIHRleHQsIHNldCB0ZXh0Q29udGVudCBvciBpbm5lckh0bWwgZGVwZW5kaW5nIGJ5IGBhbGxvd0h0bWxgIHZhbHVlXG4gICAgICAgIGFsbG93SHRtbCA/IHRpdGxlTm9kZS5pbm5lckhUTUwgPSB0aXRsZSA6IHRpdGxlTm9kZS50ZXh0Q29udGVudCA9IHRpdGxlO1xuICAgICAgfVxuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19zaG93JyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3Nob3cocmVmZXJlbmNlLCBvcHRpb25zKSB7XG4gICAgICAvLyBkb24ndCBzaG93IGlmIGl0J3MgYWxyZWFkeSB2aXNpYmxlXG4gICAgICAvLyBvciBpZiBpdCdzIG5vdCBiZWluZyBzaG93ZWRcbiAgICAgIGlmICh0aGlzLl9pc09wZW4gJiYgIXRoaXMuX2lzT3BlbmluZykge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICAgIHRoaXMuX2lzT3BlbiA9IHRydWU7XG5cbiAgICAgIC8vIGlmIHRoZSB0b29sdGlwTm9kZSBhbHJlYWR5IGV4aXN0cywganVzdCBzaG93IGl0XG4gICAgICBpZiAodGhpcy5fdG9vbHRpcE5vZGUpIHtcbiAgICAgICAgdGhpcy5fdG9vbHRpcE5vZGUuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgdGhpcy5fdG9vbHRpcE5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuICAgICAgICB0aGlzLnBvcHBlckluc3RhbmNlLnVwZGF0ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cblxuICAgICAgLy8gZ2V0IHRpdGxlXG4gICAgICB2YXIgdGl0bGUgPSByZWZlcmVuY2UuZ2V0QXR0cmlidXRlKCd0aXRsZScpIHx8IG9wdGlvbnMudGl0bGU7XG5cbiAgICAgIC8vIGRvbid0IHNob3cgdG9vbHRpcCBpZiBubyB0aXRsZSBpcyBkZWZpbmVkXG4gICAgICBpZiAoIXRpdGxlKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICAvLyBjcmVhdGUgdG9vbHRpcCBub2RlXG4gICAgICB2YXIgdG9vbHRpcE5vZGUgPSB0aGlzLl9jcmVhdGUocmVmZXJlbmNlLCBvcHRpb25zLnRlbXBsYXRlLCB0aXRsZSwgb3B0aW9ucy5odG1sKTtcblxuICAgICAgLy8gQWRkIGBhcmlhLWRlc2NyaWJlZGJ5YCB0byBvdXIgcmVmZXJlbmNlIGVsZW1lbnQgZm9yIGFjY2Vzc2liaWxpdHkgcmVhc29uc1xuICAgICAgcmVmZXJlbmNlLnNldEF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScsIHRvb2x0aXBOb2RlLmlkKTtcblxuICAgICAgLy8gYXBwZW5kIHRvb2x0aXAgdG8gY29udGFpbmVyXG4gICAgICB2YXIgY29udGFpbmVyID0gdGhpcy5fZmluZENvbnRhaW5lcihvcHRpb25zLmNvbnRhaW5lciwgcmVmZXJlbmNlKTtcblxuICAgICAgdGhpcy5fYXBwZW5kKHRvb2x0aXBOb2RlLCBjb250YWluZXIpO1xuXG4gICAgICB0aGlzLl9wb3BwZXJPcHRpb25zID0gX2V4dGVuZHMoe30sIG9wdGlvbnMucG9wcGVyT3B0aW9ucywge1xuICAgICAgICBwbGFjZW1lbnQ6IG9wdGlvbnMucGxhY2VtZW50XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5fcG9wcGVyT3B0aW9ucy5tb2RpZmllcnMgPSBfZXh0ZW5kcyh7fSwgdGhpcy5fcG9wcGVyT3B0aW9ucy5tb2RpZmllcnMsIHtcbiAgICAgICAgYXJyb3c6IF9leHRlbmRzKHt9LCB0aGlzLl9wb3BwZXJPcHRpb25zLm1vZGlmaWVycyAmJiB0aGlzLl9wb3BwZXJPcHRpb25zLm1vZGlmaWVycy5hcnJvdywge1xuICAgICAgICAgIGVsZW1lbnQ6IG9wdGlvbnMuYXJyb3dTZWxlY3RvclxuICAgICAgICB9KSxcbiAgICAgICAgb2Zmc2V0OiBfZXh0ZW5kcyh7fSwgdGhpcy5fcG9wcGVyT3B0aW9ucy5tb2RpZmllcnMgJiYgdGhpcy5fcG9wcGVyT3B0aW9ucy5tb2RpZmllcnMub2Zmc2V0LCB7XG4gICAgICAgICAgb2Zmc2V0OiBvcHRpb25zLm9mZnNldFxuICAgICAgICB9KVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChvcHRpb25zLmJvdW5kYXJpZXNFbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX3BvcHBlck9wdGlvbnMubW9kaWZpZXJzLnByZXZlbnRPdmVyZmxvdyA9IHtcbiAgICAgICAgICBib3VuZGFyaWVzRWxlbWVudDogb3B0aW9ucy5ib3VuZGFyaWVzRWxlbWVudFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICB0aGlzLnBvcHBlckluc3RhbmNlID0gbmV3IFBvcHBlcihyZWZlcmVuY2UsIHRvb2x0aXBOb2RlLCB0aGlzLl9wb3BwZXJPcHRpb25zKTtcblxuICAgICAgdGhpcy5fdG9vbHRpcE5vZGUgPSB0b29sdGlwTm9kZTtcblxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2hpZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfaGlkZSgpIC8qcmVmZXJlbmNlLCBvcHRpb25zKi97XG4gICAgICAvLyBkb24ndCBoaWRlIGlmIGl0J3MgYWxyZWFkeSBoaWRkZW5cbiAgICAgIGlmICghdGhpcy5faXNPcGVuKSB7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9pc09wZW4gPSBmYWxzZTtcblxuICAgICAgLy8gaGlkZSB0b29sdGlwTm9kZVxuICAgICAgdGhpcy5fdG9vbHRpcE5vZGUuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgdGhpcy5fdG9vbHRpcE5vZGUuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19kaXNwb3NlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2Rpc3Bvc2UoKSB7XG4gICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAvLyByZW1vdmUgZXZlbnQgbGlzdGVuZXJzIGZpcnN0IHRvIHByZXZlbnQgYW55IHVuZXhwZWN0ZWQgYmVoYXZpb3VyXG4gICAgICB0aGlzLl9ldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZikge1xuICAgICAgICB2YXIgZnVuYyA9IF9yZWYuZnVuYyxcbiAgICAgICAgICAgIGV2ZW50ID0gX3JlZi5ldmVudDtcblxuICAgICAgICBfdGhpcy5yZWZlcmVuY2UucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XG4gICAgICB9KTtcbiAgICAgIHRoaXMuX2V2ZW50cyA9IFtdO1xuXG4gICAgICBpZiAodGhpcy5fdG9vbHRpcE5vZGUpIHtcbiAgICAgICAgdGhpcy5faGlkZSgpO1xuXG4gICAgICAgIC8vIGRlc3Ryb3kgaW5zdGFuY2VcbiAgICAgICAgdGhpcy5wb3BwZXJJbnN0YW5jZS5kZXN0cm95KCk7XG5cbiAgICAgICAgLy8gZGVzdHJveSB0b29sdGlwTm9kZSBpZiByZW1vdmVPbkRlc3Ryb3kgaXMgbm90IHNldCwgYXMgcG9wcGVySW5zdGFuY2UuZGVzdHJveSgpIGFscmVhZHkgcmVtb3ZlcyB0aGUgZWxlbWVudFxuICAgICAgICBpZiAoIXRoaXMucG9wcGVySW5zdGFuY2Uub3B0aW9ucy5yZW1vdmVPbkRlc3Ryb3kpIHtcbiAgICAgICAgICB0aGlzLl90b29sdGlwTm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX3Rvb2x0aXBOb2RlKTtcbiAgICAgICAgICB0aGlzLl90b29sdGlwTm9kZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19maW5kQ29udGFpbmVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2ZpbmRDb250YWluZXIoY29udGFpbmVyLCByZWZlcmVuY2UpIHtcbiAgICAgIC8vIGlmIGNvbnRhaW5lciBpcyBhIHF1ZXJ5LCBnZXQgdGhlIHJlbGF0aXZlIGVsZW1lbnRcbiAgICAgIGlmICh0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgICAgICBjb250YWluZXIgPSB3aW5kb3cuZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpO1xuICAgICAgfSBlbHNlIGlmIChjb250YWluZXIgPT09IGZhbHNlKSB7XG4gICAgICAgIC8vIGlmIGNvbnRhaW5lciBpcyBgZmFsc2VgLCBzZXQgaXQgdG8gcmVmZXJlbmNlIHBhcmVudFxuICAgICAgICBjb250YWluZXIgPSByZWZlcmVuY2UucGFyZW50Tm9kZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXBwZW5kIHRvb2x0aXAgdG8gY29udGFpbmVyXG4gICAgICogQG1lbWJlcm9mIFRvb2x0aXBcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRvb2x0aXBOb2RlXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxTdHJpbmd8ZmFsc2V9IGNvbnRhaW5lclxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdfYXBwZW5kJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2FwcGVuZCh0b29sdGlwTm9kZSwgY29udGFpbmVyKSB7XG4gICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQodG9vbHRpcE5vZGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19zZXRFdmVudExpc3RlbmVycycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9zZXRFdmVudExpc3RlbmVycyhyZWZlcmVuY2UsIGV2ZW50cywgb3B0aW9ucykge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIHZhciBkaXJlY3RFdmVudHMgPSBbXTtcbiAgICAgIHZhciBvcHBvc2l0ZUV2ZW50cyA9IFtdO1xuXG4gICAgICBldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudCkge1xuICAgICAgICAgIGNhc2UgJ2hvdmVyJzpcbiAgICAgICAgICAgIGRpcmVjdEV2ZW50cy5wdXNoKCdtb3VzZWVudGVyJyk7XG4gICAgICAgICAgICBvcHBvc2l0ZUV2ZW50cy5wdXNoKCdtb3VzZWxlYXZlJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdmb2N1cyc6XG4gICAgICAgICAgICBkaXJlY3RFdmVudHMucHVzaCgnZm9jdXMnKTtcbiAgICAgICAgICAgIG9wcG9zaXRlRXZlbnRzLnB1c2goJ2JsdXInKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2NsaWNrJzpcbiAgICAgICAgICAgIGRpcmVjdEV2ZW50cy5wdXNoKCdjbGljaycpO1xuICAgICAgICAgICAgb3Bwb3NpdGVFdmVudHMucHVzaCgnY2xpY2snKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gc2NoZWR1bGUgc2hvdyB0b29sdGlwXG4gICAgICBkaXJlY3RFdmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgdmFyIGZ1bmMgPSBmdW5jdGlvbiBmdW5jKGV2dCkge1xuICAgICAgICAgIGlmIChfdGhpczIuX2lzT3BlbmluZyA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBldnQudXNlZEJ5VG9vbHRpcCA9IHRydWU7XG4gICAgICAgICAgX3RoaXMyLl9zY2hlZHVsZVNob3cocmVmZXJlbmNlLCBvcHRpb25zLmRlbGF5LCBvcHRpb25zLCBldnQpO1xuICAgICAgICB9O1xuICAgICAgICBfdGhpczIuX2V2ZW50cy5wdXNoKHsgZXZlbnQ6IGV2ZW50LCBmdW5jOiBmdW5jIH0pO1xuICAgICAgICByZWZlcmVuY2UuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZnVuYyk7XG4gICAgICB9KTtcblxuICAgICAgLy8gc2NoZWR1bGUgaGlkZSB0b29sdGlwXG4gICAgICBvcHBvc2l0ZUV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgZnVuYyA9IGZ1bmN0aW9uIGZ1bmMoZXZ0KSB7XG4gICAgICAgICAgaWYgKGV2dC51c2VkQnlUb29sdGlwID09PSB0cnVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIF90aGlzMi5fc2NoZWR1bGVIaWRlKHJlZmVyZW5jZSwgb3B0aW9ucy5kZWxheSwgb3B0aW9ucywgZXZ0KTtcbiAgICAgICAgfTtcbiAgICAgICAgX3RoaXMyLl9ldmVudHMucHVzaCh7IGV2ZW50OiBldmVudCwgZnVuYzogZnVuYyB9KTtcbiAgICAgICAgcmVmZXJlbmNlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGZ1bmMpO1xuICAgICAgICBpZiAoZXZlbnQgPT09ICdjbGljaycgJiYgb3B0aW9ucy5jbG9zZU9uQ2xpY2tPdXRzaWRlKSB7XG4gICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICghX3RoaXMyLl9pc09wZW5pbmcpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHBvcHBlciA9IF90aGlzMi5wb3BwZXJJbnN0YW5jZS5wb3BwZXI7XG4gICAgICAgICAgICBpZiAocmVmZXJlbmNlLmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBwb3BwZXIuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZ1bmMoZSk7XG4gICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19zY2hlZHVsZVNob3cnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfc2NoZWR1bGVTaG93KHJlZmVyZW5jZSwgZGVsYXksIG9wdGlvbnMgLyosIGV2dCAqLykge1xuICAgICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICAgIHRoaXMuX2lzT3BlbmluZyA9IHRydWU7XG4gICAgICAvLyBkZWZhdWx0cyB0byAwXG4gICAgICB2YXIgY29tcHV0ZWREZWxheSA9IGRlbGF5ICYmIGRlbGF5LnNob3cgfHwgZGVsYXkgfHwgMDtcbiAgICAgIHRoaXMuX3Nob3dUaW1lb3V0ID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMzLl9zaG93KHJlZmVyZW5jZSwgb3B0aW9ucyk7XG4gICAgICB9LCBjb21wdXRlZERlbGF5KTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfc2NoZWR1bGVIaWRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gX3NjaGVkdWxlSGlkZShyZWZlcmVuY2UsIGRlbGF5LCBvcHRpb25zLCBldnQpIHtcbiAgICAgIHZhciBfdGhpczQgPSB0aGlzO1xuXG4gICAgICB0aGlzLl9pc09wZW5pbmcgPSBmYWxzZTtcbiAgICAgIC8vIGRlZmF1bHRzIHRvIDBcbiAgICAgIHZhciBjb21wdXRlZERlbGF5ID0gZGVsYXkgJiYgZGVsYXkuaGlkZSB8fCBkZWxheSB8fCAwO1xuICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aGlzLl9zaG93VGltZW91dCk7XG4gICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChfdGhpczQuX2lzT3BlbiA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFkb2N1bWVudC5ib2R5LmNvbnRhaW5zKF90aGlzNC5fdG9vbHRpcE5vZGUpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgd2UgYXJlIGhpZGluZyBiZWNhdXNlIG9mIGEgbW91c2VsZWF2ZSwgd2UgbXVzdCBjaGVjayB0aGF0IHRoZSBuZXdcbiAgICAgICAgLy8gcmVmZXJlbmNlIGlzbid0IHRoZSB0b29sdGlwLCBiZWNhdXNlIGluIHRoaXMgY2FzZSB3ZSBkb24ndCB3YW50IHRvIGhpZGUgaXRcbiAgICAgICAgaWYgKGV2dC50eXBlID09PSAnbW91c2VsZWF2ZScpIHtcbiAgICAgICAgICB2YXIgaXNTZXQgPSBfdGhpczQuX3NldFRvb2x0aXBOb2RlRXZlbnQoZXZ0LCByZWZlcmVuY2UsIGRlbGF5LCBvcHRpb25zKTtcblxuICAgICAgICAgIC8vIGlmIHdlIHNldCB0aGUgbmV3IGV2ZW50LCBkb24ndCBoaWRlIHRoZSB0b29sdGlwIHlldFxuICAgICAgICAgIC8vIHRoZSBuZXcgZXZlbnQgd2lsbCB0YWtlIGNhcmUgdG8gaGlkZSBpdCBpZiBuZWNlc3NhcnlcbiAgICAgICAgICBpZiAoaXNTZXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfdGhpczQuX2hpZGUocmVmZXJlbmNlLCBvcHRpb25zKTtcbiAgICAgIH0sIGNvbXB1dGVkRGVsYXkpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ191cGRhdGVUaXRsZUNvbnRlbnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBfdXBkYXRlVGl0bGVDb250ZW50KHRpdGxlKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuX3Rvb2x0aXBOb2RlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMub3B0aW9ucy50aXRsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzLm9wdGlvbnMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgdGl0bGVOb2RlID0gdGhpcy5fdG9vbHRpcE5vZGUucXVlcnlTZWxlY3Rvcih0aGlzLm9wdGlvbnMuaW5uZXJTZWxlY3Rvcik7XG4gICAgICB0aGlzLl9jbGVhclRpdGxlQ29udGVudCh0aXRsZU5vZGUsIHRoaXMub3B0aW9ucy5odG1sLCB0aGlzLnJlZmVyZW5jZS5nZXRBdHRyaWJ1dGUoJ3RpdGxlJykgfHwgdGhpcy5vcHRpb25zLnRpdGxlKTtcbiAgICAgIHRoaXMuX2FkZFRpdGxlQ29udGVudCh0aGlzLnJlZmVyZW5jZSwgdGl0bGUsIHRoaXMub3B0aW9ucy5odG1sLCB0aXRsZU5vZGUpO1xuICAgICAgdGhpcy5vcHRpb25zLnRpdGxlID0gdGl0bGU7XG4gICAgICB0aGlzLnBvcHBlckluc3RhbmNlLnVwZGF0ZSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ19jbGVhclRpdGxlQ29udGVudCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIF9jbGVhclRpdGxlQ29udGVudCh0aXRsZU5vZGUsIGFsbG93SHRtbCwgbGFzdFRpdGxlKSB7XG4gICAgICBpZiAobGFzdFRpdGxlLm5vZGVUeXBlID09PSAxIHx8IGxhc3RUaXRsZS5ub2RlVHlwZSA9PT0gMTEpIHtcbiAgICAgICAgYWxsb3dIdG1sICYmIHRpdGxlTm9kZS5yZW1vdmVDaGlsZChsYXN0VGl0bGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxsb3dIdG1sID8gdGl0bGVOb2RlLmlubmVySFRNTCA9ICcnIDogdGl0bGVOb2RlLnRleHRDb250ZW50ID0gJyc7XG4gICAgICB9XG4gICAgfVxuICB9XSk7XG4gIHJldHVybiBUb29sdGlwO1xufSgpO1xuXG4vKipcbiAqIFRpdGxlIGZ1bmN0aW9uLCBpdHMgY29udGV4dCBpcyB0aGUgVG9vbHRpcCBpbnN0YW5jZS5cbiAqIEBtZW1iZXJvZiBUb29sdGlwXG4gKiBAY2FsbGJhY2sgVGl0bGVGdW5jdGlvblxuICogQHJldHVybiB7U3RyaW5nfSBwbGFjZW1lbnQgLSBUaGUgZGVzaXJlZCB0aXRsZS5cbiAqL1xuXG5cbnZhciBfaW5pdGlhbGlzZVByb3BzID0gZnVuY3Rpb24gX2luaXRpYWxpc2VQcm9wcygpIHtcbiAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgdGhpcy5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfdGhpczUuX3Nob3coX3RoaXM1LnJlZmVyZW5jZSwgX3RoaXM1Lm9wdGlvbnMpO1xuICB9O1xuXG4gIHRoaXMuaGlkZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gX3RoaXM1Ll9oaWRlKCk7XG4gIH07XG5cbiAgdGhpcy5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBfdGhpczUuX2Rpc3Bvc2UoKTtcbiAgfTtcblxuICB0aGlzLnRvZ2dsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoX3RoaXM1Ll9pc09wZW4pIHtcbiAgICAgIHJldHVybiBfdGhpczUuaGlkZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gX3RoaXM1LnNob3coKTtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy51cGRhdGVUaXRsZUNvbnRlbnQgPSBmdW5jdGlvbiAodGl0bGUpIHtcbiAgICByZXR1cm4gX3RoaXM1Ll91cGRhdGVUaXRsZUNvbnRlbnQodGl0bGUpO1xuICB9O1xuXG4gIHRoaXMuX2V2ZW50cyA9IFtdO1xuXG4gIHRoaXMuX3NldFRvb2x0aXBOb2RlRXZlbnQgPSBmdW5jdGlvbiAoZXZ0LCByZWZlcmVuY2UsIGRlbGF5LCBvcHRpb25zKSB7XG4gICAgdmFyIHJlbGF0ZWRyZWZlcmVuY2UgPSBldnQucmVsYXRlZHJlZmVyZW5jZSB8fCBldnQudG9FbGVtZW50IHx8IGV2dC5yZWxhdGVkVGFyZ2V0O1xuXG4gICAgdmFyIGNhbGxiYWNrID0gZnVuY3Rpb24gY2FsbGJhY2soZXZ0Mikge1xuICAgICAgdmFyIHJlbGF0ZWRyZWZlcmVuY2UyID0gZXZ0Mi5yZWxhdGVkcmVmZXJlbmNlIHx8IGV2dDIudG9FbGVtZW50IHx8IGV2dDIucmVsYXRlZFRhcmdldDtcblxuICAgICAgLy8gUmVtb3ZlIGV2ZW50IGxpc3RlbmVyIGFmdGVyIGNhbGxcbiAgICAgIF90aGlzNS5fdG9vbHRpcE5vZGUucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnQudHlwZSwgY2FsbGJhY2spO1xuXG4gICAgICAvLyBJZiB0aGUgbmV3IHJlZmVyZW5jZSBpcyBub3QgdGhlIHJlZmVyZW5jZSBlbGVtZW50XG4gICAgICBpZiAoIXJlZmVyZW5jZS5jb250YWlucyhyZWxhdGVkcmVmZXJlbmNlMikpIHtcbiAgICAgICAgLy8gU2NoZWR1bGUgdG8gaGlkZSB0b29sdGlwXG4gICAgICAgIF90aGlzNS5fc2NoZWR1bGVIaWRlKHJlZmVyZW5jZSwgb3B0aW9ucy5kZWxheSwgb3B0aW9ucywgZXZ0Mik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGlmIChfdGhpczUuX3Rvb2x0aXBOb2RlLmNvbnRhaW5zKHJlbGF0ZWRyZWZlcmVuY2UpKSB7XG4gICAgICAvLyBsaXN0ZW4gdG8gbW91c2VsZWF2ZSBvbiB0aGUgdG9vbHRpcCBlbGVtZW50IHRvIGJlIGFibGUgdG8gaGlkZSB0aGUgdG9vbHRpcFxuICAgICAgX3RoaXM1Ll90b29sdGlwTm9kZS5hZGRFdmVudExpc3RlbmVyKGV2dC50eXBlLCBjYWxsYmFjayk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBUb29sdGlwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dG9vbHRpcC5qcy5tYXBcbiIsImZ1bmN0aW9uIHN0eWxlSW5qZWN0KGNzcywgcmVmKSB7XG4gIGlmICggcmVmID09PSB2b2lkIDAgKSByZWYgPSB7fTtcbiAgdmFyIGluc2VydEF0ID0gcmVmLmluc2VydEF0O1xuXG4gIGlmICghY3NzIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XG5cbiAgdmFyIGhlYWQgPSBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF07XG4gIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG4gIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuXG4gIGlmIChpbnNlcnRBdCA9PT0gJ3RvcCcpIHtcbiAgICBpZiAoaGVhZC5maXJzdENoaWxkKSB7XG4gICAgICBoZWFkLmluc2VydEJlZm9yZShzdHlsZSwgaGVhZC5maXJzdENoaWxkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVhZC5hcHBlbmRDaGlsZChzdHlsZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICB9XG5cbiAgaWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgc3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgc3R5bGVJbmplY3Q7XG4iLCJcbmltcG9ydCBNaWNyb01vZGFsIGZyb20gJ21pY3JvbW9kYWwnXG5pbXBvcnQgbWljcm9tb2RhbF9jc3MgZnJvbSAnLi9taWNyb21vZGFsLmNzcydcblxuLy9pbXBvcnQgJ3RpbmdsZS5qcy9kaXN0L3RpbmdsZS5taW4uY3NzJ1xuLy9pbXBvcnQgdGluZ2xlIGZyb20gXCJ0aW5nbGUuanNcIlxuXG5pbXBvcnQgVG9vbHRpcCBmcm9tIFwidG9vbHRpcC5qc1wiIC8vVE9ETyAtIEkgdGhpbmsgdGhpcyBpcyB3aGF0J3MgYmxvYXRpbmcgZXZlcnl0aGluZyBvdXQgOi8gSXQncyBodWdlIDovXG5pbXBvcnQgdG9vbHRpcF9jc3MgZnJvbSAnLi90b29sdGlwLmNzcydcblxuaW1wb3J0IHN0eWxlSW5qZWN0IGZyb20gJ3N0eWxlLWluamVjdCdcblxuaW1wb3J0IGxvZyBmcm9tIFwiLi9sb2dnaW5nXCJcblxubGV0IG5vZGVfY3JlYXRvciA9IGZ1bmN0aW9uIChuYW1lLCBhdHRyaWJ1dGVzLCB0ZXh0KSB7XG4gICAgdmFyIGVsZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpXG4gICAgZm9yICh2YXIga2V5IGluIGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgZWxlbS5zZXRBdHRyaWJ1dGUoa2V5LGF0dHJpYnV0ZXNba2V5XSlcbiAgICB9XG4gICAgaWYodGV4dCkge1xuICAgICAgICBlbGVtLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHRleHQpKVxuICAgIH1cbiAgICByZXR1cm4gZWxlbVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlX2hpZGRlbl9maWVsZHMoZm9ybSwgY2hlY2tzdW0sIHN0YXR1cykge1xuICAgIGluc2VydF9vcl91cGRhdGVfaGlkZGVuKCdnb29kdmVyaWZpY2F0aW9uX2NoZWNrc3VtJywnZ29vZHZlcmlmaWNhdGlvbl9jaGVja3N1bScsY2hlY2tzdW0sIGZvcm0pXG4gICAgaW5zZXJ0X29yX3VwZGF0ZV9oaWRkZW4oJ2dvb2R2ZXJpZmljYXRpb25fc3RhdHVzJywnZ29vZHZlcmlmaWNhdGlvbl9zdGF0dXMnLHN0YXR1cywgZm9ybSlcbn1cblxubGV0IGluc2VydF9vcl91cGRhdGVfaGlkZGVuID0gZnVuY3Rpb24gKG5hbWUsaWQsdmFsdWUsIGZvcm0pIHtcbiAgICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKVxuICAgIGlmKGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC52YWx1ZSA9IHZhbHVlXG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICBmb3JtLmFwcGVuZENoaWxkKG5vZGVfY3JlYXRvcignaW5wdXQnLCB7J3R5cGUnOiAnaGlkZGVuJywnbmFtZSc6IG5hbWUsJ3ZhbHVlJzogdmFsdWUsJ2lkJzogaWR9KSlcbn1cblxuLy8gSURFQVxuXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy9zb21ldGhpbmcgSSdtIHRoaW5raW5nIGFib3V0IC0gZG9lc24ndCB3b3JrIHlldCwgYW5kIGl0IGRvZXNuJ3QgbWFrZSBzZW5zZSBiZWNhdXNlXG55b3UgY2FuJ3QgaGF2ZSB0d28gZGl2J3MgYXQgdGhlIHNhbWUgbGV2ZWwuIEJ1dCBtYXliZSBzb21ldGhpbmcgbGlrZSB0aGlzPyBDbGV2ZXIgYXJyYXkgc3R1ZmY/XG5EdW5uby4gXG52YXIgX3Rlc3QgPSB7ZGl2OiBbe2lkOiBcIm1vZGFsLTFcIixcImFyaWEtaGlkZGVuXCI6IHRydWV9LHsgLy91c2UgbmF0aXZlIEpTIHR5cGVzOyBhdXRvbWF0aWNhbGx5IGNhc3QgYm9vbCB0byB0ZXh0XG4gICAgZGl2OiBbe3RhYmluZGV4OiAtMSxcImRhdGEtbWljcm9tb2RhbC1jbG9zZTogXCJcIn0seyAvL3VzZSBpbnRlZ2VyIHR5cGUsIGNhc3QgdG8gdGV4dFxuICAgICAgICBkaXY6IFt7cm9sZTogXCJkaWFsb2dcIixcImFyaWEtbW9kYWxcIjogdHJ1ZSxcImFyaWEtbGFiZWxsZWRieVwiOlwibW9kYWwtMS10aXRsZVwifSx7XG4gICAgICAgICAgICBoZWFkZXI6IFt7fSx7XG4gICAgICAgICAgICAgICAgaDI6IFt7aWQ6IFwibW9kYWwtMS10aXRsZVwifSxcIk1vZGFsIFRpdGxlXCJdLCAvL2RldGVjdCB0ZXh0P1xuICAgICAgICAgICAgICAgIGJ1dHRvbjogW3tcImFyaWEtbGFiZWxcIjogXCJDbG9zZSBtb2RhbFwiLFwiZGF0YS1taWNyb21vZGFsLWNsb3NlXCI6XCJcIn0se31dIC8vb21pdD9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXY6IFt7aWQ6IFwibW9kYWwtMS1jb250ZW50XCJ9LFwiTW9kYWwgQ29udGVudFwiXV0gLy90ZXh0IVxuICAgICAgICB9XVxuICAgIH1dXG59XX1cblxuaWYgeW91IG5lZWRlZCAqVFdPKiBkaXZzIG9yIHNvbWV0aGluZywgeW91IGNvdWxkIGRvOlxuXG57ZGl2OiBbe2lkOiBcImJsYWhcIn0sW1xuICAgIHtkaXY6IFt7fSx7fV19LFxuICAgIHtkaXY6IFt7fSx7fV19XG5dXX1cbioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vLyBOT1RFUyBcblxuLyoqKioqKioqKioqKioqKlxuXG5UaGlzIGlzIHRoZSBIVE1MIHRoYXQgd2UgbmVlZCB0byBpbnNlcnQgcmlnaHQgYmVmb3JlIHRoZSBjbG9zZS1ib2R5IHRhZy4gSG93IGluIHRoZSBoZWxsIHdpbGwgd2UgZG8gdGhhdD8hXG5kb2N1bWVudC5ib2R5IGdpdmVzIHVzIHRoZSBib2R5IHRhZ1xuLmFwcGVuZENoaWxkKCkgd2lsbCBsZXQgeW91IGluc2VydCBub2RlcywgSSBndWVzcz9cblxuPCEtLSBDb250YWluZXIgLS0+XG48ZGl2IGlkPVwibW9kYWwtMVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgIDwhLS0gT3ZlcmxheSAtLT5cbiAgICA8ZGl2IHRhYmluZGV4PVwiLTFcIiBkYXRhLW1pY3JvbW9kYWwtY2xvc2U+XG4gICAgICAgIDwhLS0gQ29udGFpbmVyIC0tPlxuICAgICAgICA8ZGl2IHJvbGU9XCJkaWFsb2dcIiBhcmlhLW1vZGFsPVwidHJ1ZVwiIGFyaWEtbGFiZWxsZWRieT1cIm1vZGFsLTEtdGl0bGVcIiA+XG4gICAgICAgICAgICA8aGVhZGVyPlxuICAgICAgICAgICAgICAgIDxoMiBpZD1cIm1vZGFsLTEtdGl0bGVcIj5cbiAgICAgICAgICAgICAgICBNb2RhbCBUaXRsZVxuICAgICAgICAgICAgICAgIDwvaDI+XG5cbiAgICAgICAgICAgICAgICA8IS0tIFs0XSAtLT5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGFyaWEtbGFiZWw9XCJDbG9zZSBtb2RhbFwiIGRhdGEtbWljcm9tb2RhbC1jbG9zZT48L2J1dHRvbj5cbiAgICAgICAgICAgIDwvaGVhZGVyPlxuXG4gICAgICAgICAgICA8ZGl2IGlkPVwibW9kYWwtMS1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgTW9kYWwgQ29udGVudFxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuPC9kaXY+XG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuZXhwb3J0IGNsYXNzIG1vZGFsIHtcbiAgICBjb25zdHJ1Y3RvcihlbWFpbF9maWVsZCkge1xuICAgICAgICB0aGlzLm1vZGFsID0gbnVsbFxuICAgICAgICB0aGlzLmNzcyA9IGZhbHNlXG4gICAgICAgIHRoaXMuZW1haWxfZmllbGQgPSBlbWFpbF9maWVsZFxuICAgIH1cblxuICAgIHNob3coY2hhbGxlbmdlX2tleSwgYnV0dG9uX2NhbGxiYWNrKSB7XG4gICAgICAgIGlmKCF0aGlzLmNzcykge1xuICAgICAgICAgICAgc3R5bGVJbmplY3QobWljcm9tb2RhbF9jc3MsIHtpbnNlcnRBdDogJ3RvcCd9KSAvL2luc2VydCBhdCB0b3Agc28gY3VzdG9tZXItZ2VuZXJhdGVkIHN0eWxlcyB3aWxsIG92ZXJyaWRlXG4gICAgICAgICAgICB0aGlzLmNzcyA9IHRydWUgLy9UT0RPIC0gb24gYSBwYWdlIHdpdGggbWFueSBmb3JtcywgdGhlIENTUyB3aWxsIGJlIHJlLWluc2VydGVkIG11bHRpcGxlIHRpbWVzXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5nZXRfbW9kYWwoY2hhbGxlbmdlX2tleSlcbiAgICAgICAgdGhpcy5zZXRfbW9kYWxfYWN0aW9uKGJ1dHRvbl9jYWxsYmFjaylcbiAgICAgICAgdGhpcy5kaXNwbGF5X2NoYWxsZW5nZV9tb2RhbChjaGFsbGVuZ2Vfa2V5KVxuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIGlmKHRoaXMubW9kYWwpIHtcbiAgICAgICAgICAgIE1pY3JvTW9kYWwuY2xvc2UoJ2dvb2R2ZXJpZmljYXRpb24tbW9kYWwnKVxuICAgICAgICAgICAgLy9zaG91bGQgd2UgZGlzcG9zZSBvZiBpdCBhcyB3ZWxsPyBJdCBjb3VsZCBiZSBqdW5raW5nIHVwIHRoZWlyIERPTSBJIGd1ZXNzP1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLm1vZGFsKVxuICAgICAgICAgICAgdGhpcy5tb2RhbCA9IG51bGxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldF9tb2RhbF9hY3Rpb24oY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5idXR0b24ub25jbGljayA9IGNhbGxiYWNrXG4gICAgfVxuXG4gICAgZ2V0X2NoYWxsZW5nZV9hZGRyZXNzKCkge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dvb2R2ZXJpZmljYXRpb25fY2hhbGxlbmdlX2FkZHJlc3MnKS52YWx1ZVxuICAgIH1cblxuICAgIGdldF9waW5fY29kZSgpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb29kdmVyaWZpY2F0aW9uX3BpbicpLnZhbHVlIFxuICAgIH1cblxuICAgIGdldF9tb2RhbChjaGFsbGVuZ2Vfa2V5KSB7IC8vVE9ETyAtIHRoaXMgbmVlZHMgYnJlYWtpbmcgdXAsIGl0J3MgYSBsaXR0bGUgcmFtYmx5XG4gICAgICAgIGxvZy5kZWJ1ZyhcIkdldHRpbmcgbW9kYWwgLSBjaGFsbGVuZ2Uga2V5IGlzOiBcIitjaGFsbGVuZ2Vfa2V5KVxuICAgICAgICBpZighdGhpcy5tb2RhbCkge1xuXG4gICAgICAgICAgICAvL0ZJWE1FIHByb2xseSBuZWVkIHRvIHJlbmFtZSBhbGwgb2YgdGhlc2UgY2xhc3NlcyB0byBzb21ldGhpbmcgdW5pcXVlXG4gICAgICAgICAgICAvL0ZJWE1FIHdpbGwgbmVlZCB0byB1cGRhdGUgdGhlIENTUyBhY2NvcmRpbmdseSBhcyB3ZWxsLlxuICAgICAgICAgICAgdmFyIG1vZGFsID0gbm9kZV9jcmVhdG9yKFwiZGl2XCIsIHtcImlkXCI6IFwiZ29vZHZlcmlmaWNhdGlvbi1tb2RhbFwiLCBcImFyaWEtaGlkZGVuXCI6XCJ0cnVlXCIsIFwiY2xhc3NcIjogXCJtb2RhbCBtaWNyb21vZGFsLXNsaWRlXCJ9KVxuXG4gICAgICAgICAgICB2YXIgb3ZlcmxheSA9IG5vZGVfY3JlYXRvcihcImRpdlwiLCB7XCJ0YWJpbmRleFwiOiBcIi0xXCIsIFwiZGF0YS1taWNyb21vZGFsLWNsb3NlXCI6IFwiXCIsIFwiY2xhc3NcIjogXCJtb2RhbF9fb3ZlcmxheVwifSlcblxuICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IG5vZGVfY3JlYXRvcihcImRpdlwiLCB7XCJyb2xlXCI6IFwiZGlhbG9nXCIsXCJhcmlhLW1vZGFsXCI6IFwidHJ1ZVwiLCBcImFyaWEtbGFiZWxsZWRieVwiOiBcIm1vZGFsLTEtdGl0bGVcIiwgXCJjbGFzc1wiOiBcIm1vZGFsX19jb250YWluZXJcIn0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBoZWFkZXIgPSBub2RlX2NyZWF0b3IoXCJoZWFkZXJcIiwge1wiY2xhc3NcIjpcIm1vZGFsX19oZWFkZXJcIn0pXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBoMiA9IG5vZGVfY3JlYXRvcihcImgyXCIsIHtcImlkXCI6IFwibW9kYWwtMS10aXRsZVwiLFwiY2xhc3NcIjogXCJtb2RhbF9fdGl0bGVcIn0sXCJUb28gTWFueSBWZXJpZmljYXRpb25zXCIpXG5cbiAgICAgICAgICAgIHZhciBjbG9zZV9idXR0b24gPSBub2RlX2NyZWF0b3IoXCJidXR0b25cIiwge1wiYXJpYS1sYWJlbFwiOiBcIkNsb3NlIG1vZGFsXCIsXCJkYXRhLW1pY3JvbW9kYWwtY2xvc2VcIjogXCJcIiwgXCJjbGFzc1wiOiBcIm1vZGFsX19jbG9zZVwifSlcblxuICAgICAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKGgyKVxuICAgICAgICAgICAgaGVhZGVyLmFwcGVuZENoaWxkKGNsb3NlX2J1dHRvbilcblxuICAgICAgICAgICAgdmFyIGNvbnRlbnQgPSBub2RlX2NyZWF0b3IoXCJkaXZcIiwge1wiaWRcIjpcIm1vZGFsLTEtY29udGVudFwiLFwiY2xhc3NcIjogXCJtb2RhbF9fY29udGVudFwifSwgIFwiVG9vIG1hbnkgdmVyaWZpY2F0aW9ucyBmcm9tIHRoaXMgSVAuIFdlIG5lZWQgdG8gc2VuZCB5b3UgYW4gZW1haWwgdG8gdmVyaWZ5IHRoYXQgeW91IGFyZSB5b3UhIFwiK1xuICAgICAgICAgICAgXCJJZiB5b3UgYWdyZWUsIHJlLXR5cGUgeW91ciBlbWFpbCBoZXJlOiBcIikgLy9UT0RPIC0gaW50ZXJuYXRpb25hbGl6ZSFcbiAgICAgICAgICAgIHZhciBpbnB1dCA9IG5vZGVfY3JlYXRvcihcImlucHV0XCIsIHtcInR5cGVcIjogXCJ0ZXh0XCIsXCJpZFwiOiBcImdvb2R2ZXJpZmljYXRpb25fY2hhbGxlbmdlX2FkZHJlc3NcIn0pXG4gICAgICAgICAgICBjb250ZW50LmFwcGVuZENoaWxkKGlucHV0KVxuXG4gICAgICAgICAgICB2YXIgZm9vdGVyID0gbm9kZV9jcmVhdG9yKFwiZm9vdGVyXCIsIHtcImNsYXNzXCI6XCJtb2RhbF9fZm9vdGVyXCJ9KVxuICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IG5vZGVfY3JlYXRvcihcImJ1dHRvblwiLCB7XCJjbGFzc1wiOlwibW9kYWxfX2J0biBtb2RhbF9fYnRuLXByaW1hcnlcIn0sXCJDb250aW51ZVwiKVxuICAgICAgICAgICAgdGhpcy5idXR0b24gPSBidXR0b24gLy90byBtYWtlIGl0IGVhc2llciB0byBhdHRhY2ggYW4gb25jbGljayBoYW5kbGVyXG4gICAgICAgICAgICBmb290ZXIuYXBwZW5kQ2hpbGQoYnV0dG9uKVxuICAgICAgICAgICAgZm9vdGVyLmFwcGVuZENoaWxkKG5vZGVfY3JlYXRvcihcImJ1dHRvblwiLHtcImNsYXNzXCI6IFwibW9kYWxfX2J0blwiLFwiZGF0YS1taWNyb21vZGFsLWNsb3NlXCI6IFwiXCIsXCJhcmlhLWxhYmVsXCI6XCJDbG9zZSB0aGlzIGRpYWxvZyB3aW5kb3dcIn0sXCJDbG9zZVwiKSkgLy9GSVhNRSAtIGludGVybmF0aW9uYWxpemUhXG5cbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChoZWFkZXIpXG4gICAgICAgICAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoY29udGVudClcbiAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChmb290ZXIpXG5cbiAgICAgICAgICAgIG92ZXJsYXkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuICAgICAgICAgICAgbW9kYWwuYXBwZW5kQ2hpbGQob3ZlcmxheSlcblxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbClcbiAgICAgICAgICAgIHRoaXMubW9kYWwgPSBtb2RhbFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGFsXG4gICAgfVxuXG4gICAgZGlzcGxheV9jaGFsbGVuZ2VfbW9kYWwoY2hhbGxlbmdlX2tleSkge1xuICAgICAgICB0aGlzLmdldF9tb2RhbChjaGFsbGVuZ2Vfa2V5KVxuICAgICAgICBNaWNyb01vZGFsLnNob3coJ2dvb2R2ZXJpZmljYXRpb24tbW9kYWwnLHtcbiAgICAgICAgICAgIGRlYnVnTW9kZTogdHJ1ZSxcbiAgICAgICAgICAgIGF3YWl0Q2xvc2VBbmltYXRpb246IHRydWUsXG4gICAgICAgICAgICBvblNob3c6IG1vZGFsID0+IGNvbnNvbGUuaW5mbyhgJHttb2RhbC5pZH0gaXMgc2hvd25gKSxcbiAgICAgICAgICAgIG9uQ2xvc2U6IG1vZGFsID0+IGNvbnNvbGUuaW5mbyhgJHttb2RhbC5pZH0gaXMgaGlkZGVuYCksIFxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGJhZF9hZGRyZXNzKCkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vZGFsLTEtY29udGVudFwiKS5pbm5lckhUTUwgPSBcIkVtYWlsIGRvZXNuJ3QgbWF0Y2ggZmllbGQgb24gZm9ybSFcIiAvL0ZJWE1FIC0gZG9uJ3QgdXNlIGlubmVySFRNTFxuICAgIH1cblxuICAgIHBpbl9pbnB1dCgpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbC0xLWNvbnRlbnRcIikuaW5uZXJIVE1MID0gXCJJbnB1dCBlbWFpbGVkIFBJTjogPGlucHV0IHR5cGU9J3RleHQnIGlkPSdnb29kdmVyaWZpY2F0aW9uX3BpbicgLz5cIiAvLyBGSVhNRSAtIGRvbid0IHVzZSBpbm5lckhUTUw/XG4gICAgfVxuXG4gICAgLy9GSVhNRSAtIG5vdCB1c2VkIGFueW1vcmUuXG4gICAgZGlzcGxheV9kZXByZWNhdGVkX3RpbmdsZV9tb2RhbChjaGFsbGVuZ2Vfa2V5KSB7XG4gICAgICAgIC8qIFxuICAgICAgICBpZighdGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgdGhpcy5tb2RhbCA9IG5ldyB0aW5nbGUubW9kYWwoe1xuICAgICAgICAgICAgICAgIGZvb3RlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdGlja3lGb290ZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNsb3NlTWV0aG9kczogWydidXR0b24nXSwgLy8gWydvdmVybGF5JywgJ2J1dHRvbicsICdlc2NhcGUnXSxcbiAgICAgICAgICAgICAgICBjbG9zZUxhYmVsOiBcIkNsb3NlXCIsXG4gICAgICAgICAgICAgICAgLy9jc3NDbGFzczogWydjdXN0b20tY2xhc3MtMScsICdjdXN0b20tY2xhc3MtMiddLFxuICAgICAgICAgICAgICAgIG9uT3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtb2RhbCBvcGVuJylcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbW9kYWwgY2xvc2VkJylcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJlZm9yZUNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaGVyZSdzIGdvZXMgc29tZSBsb2dpY1xuICAgICAgICAgICAgICAgICAgICAvLyBlLmcuIHNhdmUgY29udGVudCBiZWZvcmUgY2xvc2luZyB0aGUgbW9kYWxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWUgLy8gY2xvc2UgdGhlIG1vZGFsXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGZhbHNlOyAvLyBub3RoaW5nIGhhcHBlbnNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5tb2RhbC5hZGRGb290ZXJCdG4oJ0NhbmNlbCcsICd0aW5nbGUtYnRuJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGhlcmUgZ29lcyBzb21lIGxvZ2ljXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbC5jbG9zZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLm1vZGFsLmFkZEZvb3RlckJ0bignU2VuZCBDaGFsbGVuZ2UgRW1haWwnLCAndGluZ2xlLWJ0biB0aW5nbGUtYnRuLS1wcmltYXJ5JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGhlcmUgZ29lcyBzb21lIGxvZ2ljXG4gICAgICAgICAgICAgICAgaWYodGhpcy5lbWFpbF9maWVsZC52YWx1ZSAhPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29vZHZlcmlmaWNhdGlvbl9jaGFsbGVuZ2VfYWRkcmVzcycpLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIkZpZWxkIHZhbHVlOiBcIit0aGlzLmVtYWlsX2ZpZWxkLnZhbHVlK1wiICwgY2hhbGxlbmdlX2FkZHJlc3M6IFwiK2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb29kdmVyaWZpY2F0aW9uX2NoYWxsZW5nZV9hZGRyZXNzJykudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWwuc2V0Q29udGVudChcIkVtYWlsIGRvZXNuJ3QgbWF0Y2ggZmllbGQgb24gZm9ybSFcIilcbiAgICAgICAgICAgICAgICAgICAgLy9jYW4gd2UgeWFuayB0aGUgJ3N1Ym1pdCcgYnV0dG9uPyBGSVhNRSFcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbGxlbmdlKHRoaXMuZW1haWxfZmllbGQudmFsdWUsY2hhbGxlbmdlX2tleSwgKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbG9nLmRlYnVnKFwiQ2hhbGxlbmdlIHJlc3VsdHMgYXJlOiBcIityZXN1bHRzKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihyZXN1bHRzKVxuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRzLnN0YXR1cyA9PSBcIkFDQ0VQVEVEXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWwuc2V0Q29udGVudChcIklucHV0IGVtYWlsZWQgUElOOiA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2dvb2R2ZXJpZmljYXRpb25fcGluJyAvPlwiKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvL3RoaXMubW9kYWwuY2xvc2UoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGFsLnNldENvbnRlbnQoXCJUb28gbWFueSB2ZXJpZmljYXRpb25zIGZyb20gdGhpcyBJUC4gV2UgbmVlZCB0byBzZW5kIHlvdSBhbiBlbWFpbCB0byB2ZXJpZnkgdGhhdCB5b3UgYXJlIHlvdSEgXCIrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiSWYgeW91IGFncmVlLCByZS10eXBlIHlvdXIgZW1haWwgaGVyZTogPGlucHV0IHR5cGU9J3RleHQnIGlkPSdnb29kdmVyaWZpY2F0aW9uX2NoYWxsZW5nZV9hZGRyZXNzJyAvPlwiKVxuICAgICAgICB0aGlzLm1vZGFsLm9wZW4oKVxuICAgICAgICAqL1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIHRvb2x0aXAge1xuICAgIGNvbnN0cnVjdG9yKGVtYWlsX2ZpZWxkKSB7XG4gICAgICAgIHRoaXMudG9vbHRpcCA9IG51bGxcbiAgICAgICAgdGhpcy5lbWFpbF9maWVsZCA9IGVtYWlsX2ZpZWxkXG4gICAgICAgIHRoaXMuY3NzID0gZmFsc2UgLy9UT0RPIC0gY291bGQgZ2V0IGluc2VydGVkIG11bHRpcGxlIHRpbWVzLiBXZSBjYW4gd3JpdGUgb3VyIG93biBzdHlsZSBpbmplY3RvciBpZiBuZWVkZWQgYW5kIHB1dCBpdCBpbiB3aXRoIGFuICdpZCcgbWF5YmU/XG4gICAgfVxuXG4gICAgc2hvdyhtc2cpIHtcbiAgICAgICAgaWYoIXRoaXMuY3NzKSB7XG4gICAgICAgICAgICBzdHlsZUluamVjdCh0b29sdGlwX2Nzcywge2luc2VydEF0OiAndG9wJ30pIC8vZGVsaWJlcmF0ZWx5IGluc2VydCBhdCB0b3Agc28gY3VzdG9tZXIgc3R5bGVzIG1heSBvdmVycmlkZVxuICAgICAgICAgICAgdGhpcy5jc3MgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYoIXRoaXMudG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy50b29sdGlwID0gbmV3IFRvb2x0aXAodGhpcy5lbWFpbF9maWVsZCwge3BsYWNlbWVudDogJ2JvdHRvbScsIHRpdGxlOiBtc2csIHRyaWdnZXI6ICdtYW51YWwnfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcC51cGRhdGVUaXRsZUNvbnRlbnQobXNnKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudG9vbHRpcC5zaG93KClcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICBpZih0aGlzLnRvb2x0aXApIHtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcC5oaWRlKClcbiAgICAgICAgICAgIC8vc2hvdWxkIHdlICdkZXN0cm95JyBpdD8gaWYgc28gdGhhdCdzIHRoaXMudG9vbHRpcC5kaXNwb3NlKClcbiAgICAgICAgfVxuICAgIH1cbn0iLCJcbmltcG9ydCBsb2cgZnJvbSBcIi4vbG9nZ2luZ1wiXG5pbXBvcnQgeyBpc19hcnJheSwgaXNfZnVuY3Rpb24gfSBmcm9tIFwiLi91dGlsc1wiXG5pbXBvcnQgSlNPTlAgZnJvbSBcImJyb3dzZXItanNvbnBcIlxuXG5pbXBvcnQge3Rvb2x0aXAsIG1vZGFsLCB1cGRhdGVfaGlkZGVuX2ZpZWxkc30gZnJvbSBcIi4vdmlzdWFsc1wiXG4vLyBpbXBvcnQgeyBkb21haW5Ub1VuaWNvZGUgfSBmcm9tIFwidXJsXCJcbi8vIGltcG9ydCB7IHN0cmluZ2lmeSB9IGZyb20gXCJxdWVyeXN0cmluZ1wiXG5cbi8qKioqKioqKioqKipcbiAqIFRoZSBpbnRlbnRpb24gaGVyZSBpcyB0aGF0IHdlIHdvbid0IHB1dCBhbnkgR1VJIHN0dWZmIGluIGhlcmUgYXQgYWxsLlxuICogV2UgKndpbGwqIG1vZGlmeSB0aGluZ3MgaW4gdGhlIERPTSwgYW5kIGFwcGVuZCBldmVudCBoYW5kbGVycywgYW5kXG4gKiB3aGF0ZXZlciBlbHNlIG5lZWRzIHRvIGhhcHBlbiwgYnV0IGFueXRoaW5nIHRoYXQgYWZmZWN0cyBkaXNwbGF5IHdpbGwgYmVcbiAqIGluIHZpc3VhbHMuanNcbiAqL1xuXG5jb25zdCBvcHRpb25zX2hhc2ggPSB7XG4gICAgZm9ybV9rZXk6ICBcInN0cmluZ1wiLFxuICAgIG1hbnVhbDogXCJib29sZWFuXCIsXG4gICAgZW1haWxfZmllbGQ6IFwiRE9NTm9kZVwiLFxuICAgIGZvcm06IFwiRE9NTm9kZVwiLFxuICAgIHN1Ym1pdF9idXR0b246IFwiRE9NTm9kZU9yQXJyYXlPZkRPTU5vZGVzXCIsXG4gICAgZGVidWc6IFwiYm9vbGVhblwiLFxuICAgIG9uR29vZDogXCJmdW5jdGlvblwiLFxuICAgIG9uQmFkOiBcImZ1bmN0aW9uXCIsXG4gICAgb25DaGFsbGVuZ2U6IFwiZnVuY3Rpb25cIixcbiAgICBvbkVycm9yOiBcImZ1bmN0aW9uXCIsXG4gICAgbWFudWFsOiBcImJvb2xlYW5cIlxufSAvLyBjc3NcIiAobm90IHlldD8pXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm0ge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgbG9nLmRlYnVnKFwiSW52b2tpbmcgQ2xhc3MgY29uc3RydWN0b3IhXCIpXG4gICAgICAgIFxuICAgICAgICBmb3IobGV0IGtleSBpbiBvcHRpb25zKSB7XG4gICAgICAgICAgICBsb2cuZGVidWcoXCJTZXR0aW5nOiBcIitrZXkrXCIgdG8gXCIrb3B0aW9uc1trZXldKVxuICAgICAgICAgICAgLy90aGlzW2tleV0gPSBvcHRpb25zW2tleV0gLy90aGlzIHdpbGwgaW5pdGlhbGl6ZSBhbGwgdGhlIGNhbGxiYWNrcywgYnR3LiBFdmVuIGlmICdtYW51YWwnIGlzIHR1cm5lZCBvbiEgRG8gd2UuLi53YW50IHRoYXQ/IFRPRE9cbiAgICAgICAgICAgIGlmKCF0aGlzLnVud3JhcF9hc3NpZ24oa2V5LCBvcHRpb25zW2tleV0pKSB7XG4gICAgICAgICAgICAgICAgLy9iYWlsIG91dCBpZiBhbnkgb3B0aW9ucyB3ZXJlbid0IGFzc2lnbmFibGVcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5mb3JtX2tleSkge1xuICAgICAgICAgICAgcmV0dXJuIGxvZy5lcnJvcihcIk5vIEZvcm0gS2V5IHNldCFcIilcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLm1hbnVhbCkge1xuICAgICAgICAgICAgLy9iYWlsIG91dCBvZiB0aGUgcmVzdCBvZiBzZXR1cCBmb3IgbWFudWFsLW1vZGVcbiAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIk1hbnVhbCBtb2RlIHNlbGVjdGVkOyBleGl0aW5nIHNldHVwXCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5lbWFpbF9maWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvZy5lcnJvcihcIk5vIEVtYWlsIEZpZWxkIHNldCFcIilcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5mb3JtKSB7XG4gICAgICAgICAgICBsb2cuZGVidWcoXCJUcnlpbmcgdG8gZ3Vlc3MgRm9ybSB2YWx1ZVwiKVxuICAgICAgICAgICAgLy90cnkgYW5kIGd1ZXNzIGZvcm0gZnJvbSBlbWFpbCBmaWVsZCdzICdmb3JtJyBwcm9wZXJ0eVxuICAgICAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5lbWFpbF9maWVsZC5mb3JtXG4gICAgICAgICAgICBsb2cuZGVidWcoXCJQaWNrZWQ6IFwiK3RoaXMuZm9ybSlcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5mb3JtKSB7IC8vVE9ETyAtIGFsbG93ICdmYWxzZScgaGVyZSAobm90IG51bGwvdW5kZWZpbmVkPykgdG8gcGVybWl0IG5vLWZvcm0/XG4gICAgICAgICAgICByZXR1cm4gbG9nLmVycm9yKFwiQ291bGQgbm90IGRldGVybWluZSBGb3JtIVwiKVxuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLnN1Ym1pdF9idXR0b24pIHsgLy9UT0RPIC0gYWxsb3cgJ2ZhbHNlJyBoZXJlIChub3QgbnVsbC91bmRlZmluZWQ/KSB0byBwZXJtaXQgbm8tYnV0dG9ucz9cbiAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIlRyeWluZyB0byBmaW5kIHN1Ym1pdCBidXR0b25zLi4uXCIpXG4gICAgICAgICAgICBsZXQgc3VibWl0X2J1dHRvbnM9W11cbiAgICAgICAgICAgIGZvcihsZXQgaT0wOyBpPCB0aGlzLmZvcm0uZWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgZWxlbWVudCA9IHRoaXMuZm9ybS5lbGVtZW50c1tpXVxuICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIkNoZWNraW5nIGVsZW1lbnQ6IFwiK2VsZW1lbnQrXCIgLSBub2RlTmFtZTogJ1wiK2VsZW1lbnQubm9kZU5hbWUrXCInIFR5cGU6ICdcIitlbGVtZW50LnR5cGUrXCInXCIpXG4gICAgICAgICAgICAgICAgaWYoKGVsZW1lbnQubm9kZU5hbWUgPT0gXCJJTlBVVFwiICYmIGVsZW1lbnQudHlwZSA9PVwic3VibWl0XCIpIHx8IChlbGVtZW50Lm5vZGVOYW1lID09IFwiQlVUVE9OXCIgJiYgZWxlbWVudC50eXBlICE9IFwicmVzZXRcIiAmJiBlbGVtZW50LnR5cGUgIT0gXCJidXR0b25cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nLmRlYnVnKFwiRm91bmQgYSBzdWJtaXQgYnV0dG9uXCIpXG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pdF9idXR0b25zLnB1c2goZWxlbWVudClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdF9idXR0b24gPSBzdWJtaXRfYnV0dG9uc1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZV9kb20oKVxuICAgICAgICAvL2luaXRpYWxpemUgdG9vbHRpcCBhbmQgbW9kYWwgaGVyZT9cbiAgICAgICAgdGhpcy50b29sdGlwID0gbmV3IHRvb2x0aXAodGhpcy5lbWFpbF9maWVsZClcbiAgICAgICAgdGhpcy5tb2RhbCA9IG5ldyBtb2RhbCh0aGlzLmVtYWlsX2ZpZWxkKVxuICAgICAgICB0aGlzLnN1Ym1pdHRhYmxlID0gZmFsc2VcbiAgICB9XG5cbiAgICB1bndyYXBfYXNzaWduKG5hbWUsIGVsZW1lbnQpIHtcbiAgICAgICAgaWYoIW9wdGlvbnNfaGFzaFtuYW1lXSkge1xuICAgICAgICAgICAgbG9nLmVycm9yKFwiVW5rbm93biBvcHRpb246IFwiK25hbWUrXCIgLSBhYm9ydGluZ1wiKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoKG9wdGlvbnNfaGFzaFtuYW1lXSkge1xuICAgICAgICAgICAgY2FzZSBcIkRPTU5vZGVcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51bndyYXBfZG9tbm9kZShuYW1lLGVsZW1lbnQsZmFsc2UpXG4gICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgY2FzZSBcIkRPTU5vZGVPck11bHRpcGxlRE9NTm9kZXNcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy51bndyYXBfZG9tbm9kZShuYW1lLGVsZW1lbnQsdHJ1ZSlcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBlbGVtZW50ID09IG9wdGlvbnNfaGFzaFtuYW1lXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW25hbWVdID0gZWxlbWVudFxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZy5lcnJvcihcIlVua25vd24gdHlwZSBmb3IgcGFyYW1ldGVyOiBcIituYW1lK1wiICh3YW50ZWQ6IFwiK29wdGlvbnNfaGFzaFtuYW1lXStcIilcIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW53cmFwX2RvbW5vZGUobmFtZSwgZWxlbWVudCwgbXVsdGlwbGUpICB7XG4gICAgICAgIC8vIGlmIGl0J3MgYSBqcXVlcnkgZWxlbWVudCwgcmV0dXJuIHRoZSByZWFsIERPTSBlbGVtZW50IHVuZGVybmVhdGguXG4gICAgICAgIC8vIGlmIGl0J3Mgc3RpbGwgYmFkLCBlcnJvci5cbiAgICAgICAgaWYodHlwZW9mKGVsZW1lbnQpID09PSAnb2JqZWN0JyAmJiBlbGVtZW50WydqcXVlcnknXSAmJiBlbGVtZW50WydnZXQnXSkge1xuICAgICAgICAgICAgbG9nLmRlYnVnKFwialF1ZXJ5LWxpa2Ugb2JqZWN0IGZvdW5kIGZvciBcIituYW1lKVxuICAgICAgICAgICAgaWYoZWxlbWVudC5sZW5ndGggPT0gMCApIHtcbiAgICAgICAgICAgICAgICBsb2cuZXJyb3IoXCJObyBlbGVtZW50cyBmb3VuZCBpbiBqUXVlcnkgc2VsZWN0b3IgZm9yIFwiK25hbWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihlbGVtZW50Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBpZighbXVsdGlwbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nLmVycm9yKFwiVG9vIG1hbnkgZWxlbWVudHMgZm91bmQgaW4galF1ZXJ5IHNlbGVjdG9yIGZvciBcIituYW1lK1wiIChjb3VudDogXCIrZWxlbWVudC5sZW5ndGgrXCIpXCIpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL211bHRpcGxlcyBhbGxvd2VkXG4gICAgICAgICAgICAgICAgbGV0IHVud3JhcHBlZCA9IFtdXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpPTAgOyBpIDwgZWxlbWVudC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB1bndyYXBwZWQucHVzaChlbGVtZW50W2ldKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzW25hbWVdID0gdW53cmFwcGVkXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSBlbGVtZW50LmdldCgwKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICBpZih0eXBlb2YoZWxlbWVudCkgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudClcbiAgICAgICAgICAgIGlmKCFub2RlKSB7XG4gICAgICAgICAgICAgICAgbG9nLmVycm9yKFwiTm8gZWxlbWVudCB3aXRoIGlkIFwiK2VsZW1lbnQrXCIgZm91bmQgZm9yIFwiK25hbWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gbm9kZVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICBpZihlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IGVsZW1lbnRcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgaWYoaXNfYXJyYXkoZWxlbWVudCkpIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDAgOyBpIDwgZWxlbWVudC5sZW5ndGggOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZighKGVsZW1lbnRbaV0gaW5zdGFuY2VvZiBFbGVtZW50KSkge1xuICAgICAgICAgICAgICAgICAgICBsb2cuZXJyb3IoXCJBcnJheSBmb3IgXCIrbmFtZStcIiBjb250YWlucyBub24tRE9NIGVsZW1lbnQgYXQgaW5kZXggXCIraSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IGVsZW1lbnRcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgbG9nLmVycm9yKFwiVW5rbm93biBlbGVtZW50IHR5cGUgcGFzc2VkIGZvciBcIituYW1lK1wiOiBcIit0eXBlb2YoZWxlbWVudCkpXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cblxuICAgIGluaXRpYWxpemVfZG9tKCkge1xuICAgICAgICAvLyBzZXQgdXAgdGhlIG9uY2hhbmdlIGhhbmRsZXIgZm9yIHRoZSBlbWFpbCBmaWVsZFxuICAgICAgICBsZXQgb2xkX29uY2hhbmdlID0gdGhpcy5lbWFpbF9maWVsZC5vbmNoYW5nZVxuICAgICAgICB0aGlzLmVtYWlsX2ZpZWxkLm9uY2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uY2hhbmdlX2hhbmRsZXIoZXZlbnQpXG4gICAgICAgICAgICBpZihvbGRfb25jaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICBvbGRfb25jaGFuZ2UoZXZlbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldCB1cCB0aGUgb25zdWJtaXQgaGFuZGxlciBmb3IgdGhlIGZvcm0gKGlmIHRoZXJlIGlzIG9uZSlcbiAgICAgICAgaWYodGhpcy5mb3JtKSB7XG4gICAgICAgICAgICBsZXQgb2xkX29uc3VibWl0ID0gdGhpcy5mb3JtLm9uc3VibWl0XG4gICAgICAgICAgICB0aGlzLmZvcm0ub25zdWJtaXQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBsb2cuZGVidWcoXCJPbiBTdWJtaXQgaGFuZGxlciBmaXJpbmchXCIpXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdHNcbiAgICAgICAgICAgICAgICBpZihvbGRfb25zdWJtaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9IG9sZF9vbnN1Ym1pdChldmVudCkgLy9GSVhNRSAtIGNvbmZ1c2luZywgKnRoZWlyKiBvbGQgb25zdWJtaXQgaGFuZGxlciBmaXJlcyAqZmlyc3QqP1xuICAgICAgICAgICAgICAgIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlbGwsIGl0IGNvdWxkIG1ha2Ugc2Vuc2UgLSBpZiB5b3Ugd2FudGVkIHRvIGRvIHNvbWV0aGluZyB0byBpbnRlcnJ1cHQgdGhlIHZlcmlmaWNhdGlvbiwgeW91IGNvdWxkP1xuICAgICAgICAgICAgICAgIGlmKCFvbGRfb25zdWJtaXQgfHwgcmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vbnN1Ym1pdF9oYW5kbGVyKGV2ZW50KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vZGlzYWJsZSBzdWJtaXQgYnV0dG9uLCBpZiB0aGVyZSBpcyBvbmUgLSBcbiAgICAgICAgdGhpcy5kaXNhYmxlX3N1Ym1pdHMoKVxuICAgIH1cblxuICAgIGRpc2FibGVfc3VibWl0cygpIHtcbiAgICAgICAgdGhpcy5zZXRfc3VibWl0X2J1dHRvbl9kaXNhYmxlZCh0cnVlKVxuICAgIH1cblxuICAgIGVuYWJsZV9zdWJtaXRzKCkge1xuICAgICAgICB0aGlzLnNldF9zdWJtaXRfYnV0dG9uX2Rpc2FibGVkKGZhbHNlKVxuICAgIH1cblxuICAgIHNldF9zdWJtaXRfYnV0dG9uX2Rpc2FibGVkKHN0YXRlKSB7XG4gICAgICAgIGlmKHRoaXMuc3VibWl0X2J1dHRvbikge1xuICAgICAgICAgICAgbG9nLmRlYnVnKFwiVHJ5aW5nIHRvIGRpc2FibGUgc3VibWl0IGJ1dHRvbi4uLlwiKVxuICAgICAgICAgICAgaWYoaXNfYXJyYXkodGhpcy5zdWJtaXRfYnV0dG9uKSkge1xuICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIlN1Ym1pdCBidXR0b24gSVMgQVJSQVlcIilcbiAgICAgICAgICAgICAgICBmb3IobGV0IHggaW4gdGhpcy5zdWJtaXRfYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0X2J1dHRvblt4XS5kaXNhYmxlZCA9IHN0YXRlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdF9idXR0b24uZGlzYWJsZWQgPSBzdGF0ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmlyZV9ob29rcyhuYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBsb2cuZGVidWcoXCJGaXJpbmcgaG9va3MgZm9yOiBcIituYW1lKVxuICAgICAgICBpZih0aGlzLm1hbnVhbCkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBpZighdGhpc1tuYW1lXSkge1xuICAgICAgICAgICAgLy9ubyBob29rczsgZ28gYWhlYWQgYW5kIGRvIHRoZSBkZWZhdWx0IHN0dWZmIGZyb20gJ2NhbGxiYWNrJ1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKClcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpc1tuYW1lXSgpXG4gICAgICAgIGlmKHJlc3VsdCA9PT0gZmFsc2UpIHsgLy9ORUdBVElWRSBSRVNVTFQgZnJvbSBwcmUtY2FsbGJhY2sgLSBkbyAqTk9UKiBpbnZva2UgY2FsbGJhY2shXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZihyZXN1bHQgPT09IHRydWUpIHsgLy9UUlVFIFJFU1VMVCAtIGNvbnRpbnVlIG5vcm1hbCBiZWhhdmlvclxuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKClcbiAgICAgICAgfVxuICAgICAgICBpZihpc19mdW5jdGlvbihyZXN1bHQpKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0KGNhbGxiYWNrKSAvL2RlZmVycmVkLi4uXG4gICAgICAgIH1cbiAgICAgICAgbG9nLmVycm9yKFwiVW5rbm93biB0eXBlIHJldHVybmVkIGZyb20gaGFuZGxlciAnXCIrbmFtZStcIicgLSBcIisodHlwZW9mIHJlc3VsdCkpXG4gICAgfVxuXG4gICAgb25jaGFuZ2VfaGFuZGxlcihldmVudCkge1xuICAgICAgICB0aGlzLnN1Ym1pdHRhYmxlID0gZmFsc2UgLy9maWVsZCBoYXMgY2hhbmdlZDsgbm90IHN1Ym1pdHRhYmxlIHVudGlsIHRoaXMgcmV0dXJucyFcbiAgICAgICAgdGhpcy52ZXJpZnlpbmcgPSB0aGlzLmVtYWlsX2ZpZWxkLnZhbHVlXG4gICAgICAgIC8vRklYTUUgLSBzaG91bGQgd2Ugc2V0IGFuICdpbi1mbGlnaHQnIHZhcmlhYmxlLCBzbyB3ZSBrbm93IG5vdCB0byBkb3VibGUtdmVyaWZ5P1xuICAgICAgICB0aGlzLnZlcmlmeSh0aGlzLmVtYWlsX2ZpZWxkLnZhbHVlLCAocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgbG9nLmRlYnVnKFwiVmVyaWZpY2F0aW9uIHJlc3VsdHMgYXJlOiBcIilcbiAgICAgICAgICAgIGxvZy5kZWJ1Z2RpcihyZXN1bHRzKVxuICAgICAgICAgICAgLy9zbyB3ZWlyZCwgYnV0IHRoZSAndmVyaWZ5JyBtZXRob2QgZmlyZXMgYWxsIHRoZSBhcHByb3ByaWF0ZSBjYWxsYmFja3MsIHNvIHdlIGRvbid0IGRvIGFueXRoaW5nIGhlcmU/XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25iYWRfaGFuZGxlcigpIHtcbiAgICAgICAgdGhpcy5maXJlX2hvb2tzKCdvbkJhZCcsKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdWJtaXR0YWJsZSA9IGZhbHNlXG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAuc2hvdygnQmFkIEVtYWlsIEFkZHJlc3MnKSAvL1RPRE8gLSBpbnRlcm5hdGlvbmFsaXplIGJhc2VkIG9uIEFQSSByZXNwb25zZT9cbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZV9zdWJtaXRzKCkgICAgXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25nb29kX2hhbmRsZXIoc3RhdHVzLCBjaGVja3N1bSkge1xuICAgICAgICB0aGlzLmZpcmVfaG9va3MoJ29uR29vZCcsKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zdWJtaXR0YWJsZSA9IHRydWVcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcC5oaWRlKClcbiAgICAgICAgICAgIHVwZGF0ZV9oaWRkZW5fZmllbGRzKHRoaXMuZm9ybSwgY2hlY2tzdW0sIHN0YXR1cylcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlX3N1Ym1pdHMoKVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIG9uY2hhbGxlbmdlX2hhbmRsZXIoY2hhbGxlbmdlX2tleSkge1xuICAgICAgICB0aGlzLmZpcmVfaG9va3MoJ29uQ2hhbGxlbmdlJywoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdHRhYmxlID0gZmFsc2VcbiAgICAgICAgICAgIC8vL3VoLi4uLnRocm93IHVwIGEgcHJvbXB0P1xuICAgICAgICAgICAgdGhpcy5tb2RhbC5zaG93KGNoYWxsZW5nZV9rZXksICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLmVtYWlsX2ZpZWxkLnZhbHVlICE9IHRoaXMubW9kYWwuZ2V0X2NoYWxsZW5nZV9hZGRyZXNzKCkpIHsgXG4gICAgICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIkZpZWxkIHZhbHVlOiBcIit0aGlzLmVtYWlsX2ZpZWxkLnZhbHVlK1wiICwgY2hhbGxlbmdlX2FkZHJlc3M6IFwiK3RoaXMubW9kYWwuZ2V0X2NoYWxsZW5nZV9hZGRyZXNzKCkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWwuYmFkX2FkZHJlc3MoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vVE9ETyAtIGludGVybnRhaW9uYWxpemUhXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNoYWxsZW5nZSh0aGlzLmVtYWlsX2ZpZWxkLnZhbHVlLGNoYWxsZW5nZV9rZXksIChyZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIkNoYWxsZW5nZSByZXN1bHRzIGFyZTogXCIpXG4gICAgICAgICAgICAgICAgICAgIGxvZy5kZWJ1Z2RpcihyZXN1bHRzKVxuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRzLnN0YXR1cyA9PSBcIkFDQ0VQVEVEXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWwucGluX2lucHV0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWwuc2V0X21vZGFsX2FjdGlvbiggKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwaW4gPXRoaXMubW9kYWwuZ2V0X3Bpbl9jb2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc3BvbnNlKHRoaXMuZW1haWxfZmllbGQudmFsdWUsY2hhbGxlbmdlX2tleSwgcGluLCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nLmRlYnVnZGlyKHJlc3BvbnNlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXNwb25zZS5zdGF0dXMgPT0gXCJHT09EXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWwuIGhpZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlX2hpZGRlbl9maWVsZHModGhpcy5mb3JtLCByZXNwb25zZS5jaGVja3N1bSwgcmVzcG9uc2Uuc3RhdHVzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmFibGVfc3VibWl0cygpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChcIkNoYWxsZW5nZSByZWplY3RlZCFcIikgLy9GSVhNRSAtIHNob3VsZCBuZXZlciBoYXBwZW4gdGhvIVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbilcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBvbmVycm9yX2hhbmRsZXIoKSB7XG4gICAgICAgIHRoaXMuZmlyZV9ob29rcygnb25FcnJvcicsKCkgPT4ge1xuICAgICAgICAgICAgbG9nLmRlYnVnKFwiRXJyb3IgZGV0ZWN0ZWQ/XCIpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgb25zdWJtaXRfaGFuZGxlcihldmVudCkge1xuICAgICAgICAvL2N1c3RvbWVyJ3MgaG9va3MgaGF2ZSBhbHJlYWR5IGZpcmVkLCBsZXQncyBnbyFcbiAgICAgICAgLy90aGUgYWRkaXRpb25hbCBjaGVjayBhZ2FpbnN0IHRoZSBjb250ZW50cyBvZiB0aGUgZmllbGQgYXJlIGp1c3QgaW4gY2FzZSBzb21lXG4gICAgICAgIC8vYnJvd3NlcnMgYXJlbid0IHF1aXRlIHNvIHJlbGlnaW91cyBhYm91dCBydW5uaW5nIG9uQ2hhbmdlIGhhbmRsZXJzIGJlZm9yZSBvblN1Ym1pdFxuICAgICAgICBpZih0aGlzLnN1Ym1pdHRhYmxlICYmIHRoaXMuZW1haWxfZmllbGQudmFsdWUgPT09IHRoaXMudmVyaWZ5aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuZW1haWxfZmllbGQudmFsdWUgIT09IHRoaXMudmVyaWZ5aW5nKSB7XG4gICAgICAgICAgICB0aGlzLnZlcmlmeSh0aGlzLmVtYWlsX2ZpZWxkLnZhbHVlLCAocmVzdWx0cykgPT4geyAgLy9GSVhNRSAtIHRoaXMgY291bGQgZG91YmxlLXZlcmlmeSFcbiAgICAgICAgICAgICAgICBpZih0aGlzLnN1Ym1pdHRhYmxlKSB7IC8vZG9uJ3QgZGlyZWN0bHkgaW5zcGVjdCAncmVzdWx0cycsIGFzc3VtZSB0aGUgb25CbGFoIGhhbmRsZXJzIHdpbGwgdXBkYXRlICdzdWJtaXR0YWJsZSdcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtLnN1Ym1pdCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2UgLy90aGUgJ3ZlcmlmeScgY2FsbGJhY2sgYWJvdmUgd2lsbCBhY3R1YWxseSBkbyB0aGUgd29yayBvZiBzdWJtaXR0aW5nIHRoZSBmb3JtXG4gICAgfVxuXG4gICAgLy8gTE9XLUxFVkVMIEpTT04gaGVscGVyc1xuICAgIC8vIGJ1dCBhbHNvLCBoZWxwZXJzIHRoYXQgKndlKiB1c2UgLSBzbyBzaG91bGQgdGhleSBiZSBpbnZva2luZyBvdXIgY2FsbGJhY2tzIGZvciB1cz9cbiAgICAvLyBtYXliZSB5ZXMgb25seSBpZiBtYW51YWwgaXMgZmFsc2U/XG5cbiAgICB2ZXJpZnkoZW1haWwsIGNhbGxiYWNrKSB7XG4gICAgICAgIEpTT05QKHt1cmw6IEhPU1QrXCIvdmVyaWZ5XCIsXG4gICAgICAgICAgICBkYXRhOiB7ZW1haWw6IGVtYWlsLCBmb3JtX2tleTogdGhpcy5mb3JtX2tleX0sIFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZihkYXRhLmVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZy5lcnJvcihkYXRhLmVycm9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzd2l0Y2goZGF0YS5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkJBRFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uYmFkX2hhbmRsZXIoKVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgIFxuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiR09PRFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uZ29vZF9oYW5kbGVyKGRhdGEuc3RhdHVzLCBkYXRhLmNoZWNrc3VtKSAvL3N0YXR1cyBpcyB0aGUgd3JvbmcgdGhpbmcgaGVyZS5cbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcIkNIQUxMRU5HRVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uY2hhbGxlbmdlX2hhbmRsZXIoZGF0YS5jaGFsbGVuZ2Vfa2V5KVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgIFxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBsb2cuZXJyb3IoXCJVTktOT1dOIFNUQVRVUzogXCIrZGF0YS5zdGF0dXMpIC8vZXJyb3IgaGVyZT9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbmVycm9yX2hhbmRsZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihjYWxsYmFjaykgeyAvL1RPRE8gLSBzaG91bGQgY2FsbGJhY2sgZmlyZSAqZmlyc3QqLCBvciAqbGFzdCo/XG4gICAgICAgICAgICAgICAgICAgIC8vSSBraW5kYSBmZWVsIGxpa2UgYWxsIHRoZSAnbWFudWFsJyBzdHVmZiB3aWxsIHVzZSB0aGlzLCBidXQgbm90aGluZyBlbHNlIHdpbGwuXG4gICAgICAgICAgICAgICAgICAgIC8vb2gsIEkgdGFrZSB0aGF0IGJhY2sgLSBpZiB5b3UgdHJ5IGFuZCBzdWJtaXQgdGhlIGZvcm0gYW5kIGl0IGhhc24ndCBiZWVuIHZhbGlkYXRlZDsgdGhlbiBfdGhhdF9cbiAgICAgICAgICAgICAgICAgICAgLy8gdmVyaWZpY2F0aW9uIHdpbGwgdXNlIHRoaXMhXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGNoYWxsZW5nZShlbWFpbCwgY2hhbGxlbmdlX2tleSwgY2FsbGJhY2spIHtcbiAgICAgICAgSlNPTlAoe3VybDogSE9TVCtcIi9jaGFsbGVuZ2VcIixcbiAgICAgICAgICAgIGRhdGE6IHtlbWFpbDogZW1haWwsIGZvcm1fa2V5OiB0aGlzLmZvcm1fa2V5LCBjaGFsbGVuZ2Vfa2V5OiBjaGFsbGVuZ2Vfa2V5fSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YSlcbiAgICAgICAgICAgICAgICAvLyBzd2l0Y2goZGF0YS5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgY2FzZSBcIkdPT0RcIjpcblxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICByZXNwb25zZShlbWFpbCwgY2hhbGxlbmdlX2tleSwgcGluLCBjYWxsYmFjaykge1xuICAgICAgICBKU09OUCh7dXJsOiBIT1NUK1wiL3Jlc3BvbnNlXCIsXG4gICAgICAgICAgICBkYXRhOiB7ZW1haWw6IGVtYWlsLCBjaGFsbGVuZ2Vfa2V5OiBjaGFsbGVuZ2Vfa2V5LCBwaW46IHBpbiwgZm9ybV9rZXk6IHRoaXMuZm9ybV9rZXl9LFxuICAgICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLm15dG9vbHRpcCkgeyAvL0ZJWE1FIC0gaW5zdGVhZCBpbnZva2UgdGhlIG9uY2hhbmdlIGNhbGxiYWNrIHRoaW5nP1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm15dG9vbHRpcC5oaWRlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVfc3VibWl0cygpXG5cbiAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKVxuICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG59IiwiaW1wb3J0IGxvZyBmcm9tIFwiLi9sb2dnaW5nXCJcbmltcG9ydCBGb3JtIGZyb20gXCIuL2Zvcm1cIlxuLy9pbXBvcnQgYXNzaWduIGZyb20gXCJjb3JlLWpzLXB1cmUvZXMvb2JqZWN0L2Fzc2lnblwiXG5pbXBvcnQgeyBkdXBsaWNhdGUgfSBmcm9tIFwiLi91dGlscy5qc1wiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmb3JtX2tleSxvcHRpb25zKSB7XG4gICAgaWYoIWZvcm1fa2V5KSB7XG4gICAgICAgIGxvZy5lcnJvcihcIkZvcm0ga2V5IHdhcyBub3Qgc2V0XCIpXG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICBsZXQgbXlfb3B0aW9uc1xuICAgIGlmKG9wdGlvbnMpIHtcbiAgICAgICAgbXlfb3B0aW9ucz1kdXBsaWNhdGUob3B0aW9ucyk7XG4gICAgICAgIG15X29wdGlvbnMuZm9ybV9rZXkgPSBmb3JtX2tleVxuICAgIH0gZWxzZSB7XG4gICAgICAgIG15X29wdGlvbnM9e2Zvcm1fa2V5OiBmb3JtX2tleX1cbiAgICB9XG4gICAgaWYobXlfb3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICBsb2cuZGVidWdfZW5hYmxlZCA9IG15X29wdGlvbnMuZGVidWcgLy9GSVhNRSB0aGlzIGlzIGFscmVhZHkgaGFuZGxlZCBpbiBpbmRleC5qcywgdGhpcyBpcyBzdXBlcmZsdW91c1xuICAgICAgICBkZWxldGUgbXlfb3B0aW9ucy5kZWJ1ZyAvL2Rvbid0IHdhbnQgdG8ga2VlcCBwYXNzaW5nIHRoaXMgZG93biB0byBlYWNoIFZlcmlmeVxuICAgIH1cbiAgICBsZXQgYWN0aXZhdGVkX2Zvcm1zPVtdXG4gICAgZm9yKGxldCBmb3JtID0gMCA7IGZvcm0gPCBkb2N1bWVudC5mb3Jtcy5sZW5ndGggOyBmb3JtKysgKSB7IC8vb2xkZS1za29vbGUgRE9NMCBGVFchXG4gICAgICAgIGxvZy5kZWJ1ZyhcIkNoZWNraW5nIGZvcm06IFwiK2Zvcm0rXCIgZm9yIHZlcmlmaWFibGUgZW1haWwgYWRkcmVzcyBmaWVsZHMuLi5cIilcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGRvY3VtZW50LmZvcm1zW2Zvcm1dLmVsZW1lbnRzLmxlbmd0aCA7IGkgKysgKSB7XG4gICAgICAgICAgICBsb2cuZGVidWcoXCJDaGVja2luZyBmaWVsZCAjXCIraStcIiB0byBzZWUgaWYgaXQncyBhbiBlbWFpbCBhZGRyZXNzIGZpZWxkXCIpXG4gICAgICAgICAgICBsZXQgdGhpc19maWVsZCA9IGRvY3VtZW50LmZvcm1zW2Zvcm1dLmVsZW1lbnRzW2ldXG4gICAgICAgICAgICBpZih0aGlzX2ZpZWxkLnR5cGUgPT0gXCJlbWFpbFwiIHx8IHRoaXNfZmllbGQubmFtZSA9PSBcImVtYWlsXCIgfHwgdGhpc19maWVsZC5pZCA9PSBcImVtYWlsXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgb3B0aW9uc19jb3B5ID0gZHVwbGljYXRlKG15X29wdGlvbnMpXG4gICAgICAgICAgICAgICAgbG9nLmRlYnVnKFwiRm91bmQgY2FuZGlkYXRlIGZpZWxkLiBOYW1lOiBcIit0aGlzX2ZpZWxkLm5hbWUrXCIgVHlwZTogXCIrdGhpc19maWVsZC50eXBlK1wiIElEOiBcIit0aGlzX2ZpZWxkLmlkKVxuICAgICAgICAgICAgICAgIG9wdGlvbnNfY29weS5mb3JtID0gZG9jdW1lbnQuZm9ybXNbZm9ybV1cbiAgICAgICAgICAgICAgICBvcHRpb25zX2NvcHkuZW1haWxfZmllbGQgPSB0aGlzX2ZpZWxkXG4gICAgICAgICAgICAgICAgYWN0aXZhdGVkX2Zvcm1zLnB1c2gobmV3IEZvcm0ob3B0aW9uc19jb3B5KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYWN0aXZhdGVkX2Zvcm1zXG59IiwiaW1wb3J0IGF1dG8gZnJvbSBcIi4vYXV0b1wiXG5pbXBvcnQgbG9nIGZyb20gXCIuL2xvZ2dpbmdcIlxuaW1wb3J0IEZvcm0gZnJvbSBcIi4vZm9ybVwiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChmb3JtX2tleSwgb3B0aW9ucykge1xuICAgIGlmKG9wdGlvbnMgJiYgb3B0aW9ucy5kZWJ1Zykge1xuICAgICAgICBsb2cuZGVidWdfZW5hYmxlZCA9IG9wdGlvbnMuZGVidWdcbiAgICB9XG4gICAgaWYoIWZvcm1fa2V5KSB7XG4gICAgICAgIGxvZy5lcnJvcihcIkZvcm0ga2V5IHdhcyBub3Qgc2V0XCIpXG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZighb3B0aW9ucyB8fCAoIW9wdGlvbnMuZW1haWxfZmllbGQgJiYgIW9wdGlvbnMubWFudWFsKSkge1xuICAgICAgICByZXR1cm4gYXV0byhmb3JtX2tleSwgb3B0aW9ucylcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBGb3JtKGZvcm1fa2V5LCBvcHRpb25zKVxufSJdLCJuYW1lcyI6WyJsZXQiLCJ0aGlzIiwiY29uc3QiLCJhcmd1bWVudHMiLCJpc0Z1bmN0aW9uIiwiY2xhc3NDYWxsQ2hlY2siLCJjcmVhdGVDbGFzcyIsIl9leHRlbmRzIiwibWljcm9tb2RhbF9jc3MiLCJ0b29sdGlwX2NzcyIsImkiLCJKU09OUCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7SUFBQSxJQUFNLEdBQUcsR0FDTCxZQUFXLENBQUMsYUFBcUIsRUFBRTtxREFBVixHQUFHOztRQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLGNBQWE7SUFDdEMsRUFBQzs7SUFFTCxjQUFJLHdCQUFNLEdBQUcs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QUFLLE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksU0FBUyxLQUFLLE9BQU8sSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLElBQUksU0FBUyxLQUFLLEtBQUssSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksU0FBUyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7O1FBRTdVLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RSxJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUUsSUFBSSxZQUFZLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BFLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7UUFFN0UsSUFBSSxtQkFBbUIsR0FBRyxTQUFTLEtBQUssTUFBTSxJQUFJLGFBQWEsSUFBSSxTQUFTLEtBQUssT0FBTyxJQUFJLGNBQWMsSUFBSSxTQUFTLEtBQUssS0FBSyxJQUFJLFlBQVksSUFBSSxTQUFTLEtBQUssUUFBUSxJQUFJLGVBQWUsQ0FBQzs7O1FBRy9MLElBQUksVUFBVSxHQUFHLENBQUMsS0FBSyxFQUFF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
