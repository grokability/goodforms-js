(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('tty'), require('util'), require('fs'), require('net')) :
  typeof define === 'function' && define.amd ? define(['tty', 'util', 'fs', 'net'], factory) :
  (global = global || self, global.MyBundle = factory(global.tty, global.util, global.fs, global.net));
}(this, function (tty, util, fs, net) { 'use strict';

  tty = tty && tty.hasOwnProperty('default') ? tty['default'] : tty;
  util = util && util.hasOwnProperty('default') ? util['default'] : util;
  fs = fs && fs.hasOwnProperty('default') ? fs['default'] : fs;
  net = net && net.hasOwnProperty('default') ? net['default'] : net;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

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
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var O = 'object';

  var check = function check(it) {
    return it && it.Math == Math && it;
  }; // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028


  var global_1 = // eslint-disable-next-line no-undef
  check((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) == O && globalThis) || check((typeof window === "undefined" ? "undefined" : _typeof(window)) == O && window) || check((typeof self === "undefined" ? "undefined" : _typeof(self)) == O && self) || check(_typeof(commonjsGlobal) == O && commonjsGlobal) || // eslint-disable-next-line no-new-func
  Function('return this')();

  var fails = function fails(exec) {
    try {
      return !!exec();
    } catch (error) {
      return true;
    }
  };

  var descriptors = !fails(function () {
    return Object.defineProperty({}, 'a', {
      get: function get() {
        return 7;
      }
    }).a != 7;
  });

  var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
  var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // Nashorn ~ JDK8 bug

  var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({
    1: 2
  }, 1); // `Object.prototype.propertyIsEnumerable` method implementation
  // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable

  var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
    var descriptor = getOwnPropertyDescriptor(this, V);
    return !!descriptor && descriptor.enumerable;
  } : nativePropertyIsEnumerable;
  var objectPropertyIsEnumerable = {
    f: f
  };

  var createPropertyDescriptor = function createPropertyDescriptor(bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var toString = {}.toString;

  var classofRaw = function classofRaw(it) {
    return toString.call(it).slice(8, -1);
  };

  var split = ''.split; // fallback for non-array-like ES3 and non-enumerable old V8 strings

  var indexedObject = fails(function () {
    // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
    // eslint-disable-next-line no-prototype-builtins
    return !Object('z').propertyIsEnumerable(0);
  }) ? function (it) {
    return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
  } : Object;

  // `RequireObjectCoercible` abstract operation
  // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
  var requireObjectCoercible = function requireObjectCoercible(it) {
    if (it == undefined) throw TypeError("Can't call method on " + it);
    return it;
  };

  var toIndexedObject = function toIndexedObject(it) {
    return indexedObject(requireObjectCoercible(it));
  };

  var isObject = function isObject(it) {
    return _typeof(it) === 'object' ? it !== null : typeof it === 'function';
  };

  // https://tc39.github.io/ecma262/#sec-toprimitive
  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string

  var toPrimitive = function toPrimitive(input, PREFERRED_STRING) {
    if (!isObject(input)) return input;
    var fn, val;
    if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
    if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var hasOwnProperty = {}.hasOwnProperty;

  var has = function has(it, key) {
    return hasOwnProperty.call(it, key);
  };

  var document$1 = global_1.document; // typeof document.createElement is 'object' in old IE

  var EXISTS = isObject(document$1) && isObject(document$1.createElement);

  var documentCreateElement = function documentCreateElement(it) {
    return EXISTS ? document$1.createElement(it) : {};
  };

  var ie8DomDefine = !descriptors && !fails(function () {
    return Object.defineProperty(documentCreateElement('div'), 'a', {
      get: function get() {
        return 7;
      }
    }).a != 7;
  });

  var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor; // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor

  var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
    O = toIndexedObject(O);
    P = toPrimitive(P, true);
    if (ie8DomDefine) try {
      return nativeGetOwnPropertyDescriptor(O, P);
    } catch (error) {
      /* empty */
    }
    if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
  };
  var objectGetOwnPropertyDescriptor = {
    f: f$1
  };

  var anObject = function anObject(it) {
    if (!isObject(it)) {
      throw TypeError(String(it) + ' is not an object');
    }

    return it;
  };

  var nativeDefineProperty = Object.defineProperty; // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty

  var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
    anObject(O);
    P = toPrimitive(P, true);
    anObject(Attributes);
    if (ie8DomDefine) try {
      return nativeDefineProperty(O, P, Attributes);
    } catch (error) {
      /* empty */
    }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };
  var objectDefineProperty = {
    f: f$2
  };

  var hide = descriptors ? function (object, key, value) {
    return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var setGlobal = function setGlobal(key, value) {
    try {
      hide(global_1, key, value);
    } catch (error) {
      global_1[key] = value;
    }

    return value;
  };

  var shared = createCommonjsModule(function (module) {
    var SHARED = '__core-js_shared__';
    var store = global_1[SHARED] || setGlobal(SHARED, {});
    (module.exports = function (key, value) {
      return store[key] || (store[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: '3.1.3',
      mode:  'global',
      copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
    });
  });

  var functionToString = shared('native-function-to-string', Function.toString);

  var WeakMap = global_1.WeakMap;
  var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

  var id = 0;
  var postfix = Math.random();

  var uid = function uid(key) {
    return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
  };

  var keys = shared('keys');

  var sharedKey = function sharedKey(key) {
    return keys[key] || (keys[key] = uid(key));
  };

  var hiddenKeys = {};

  var WeakMap$1 = global_1.WeakMap;
  var set, get, has$1;

  var enforce = function enforce(it) {
    return has$1(it) ? get(it) : set(it, {});
  };

  var getterFor = function getterFor(TYPE) {
    return function (it) {
      var state;

      if (!isObject(it) || (state = get(it)).type !== TYPE) {
        throw TypeError('Incompatible receiver, ' + TYPE + ' required');
      }

      return state;
    };
  };

  if (nativeWeakMap) {
    var store = new WeakMap$1();
    var wmget = store.get;
    var wmhas = store.has;
    var wmset = store.set;

    set = function set(it, metadata) {
      wmset.call(store, it, metadata);
      return metadata;
    };

    get = function get(it) {
      return wmget.call(store, it) || {};
    };

    has$1 = function has(it) {
      return wmhas.call(store, it);
    };
  } else {
    var STATE = sharedKey('state');
    hiddenKeys[STATE] = true;

    set = function set(it, metadata) {
      hide(it, STATE, metadata);
      return metadata;
    };

    get = function get(it) {
      return has(it, STATE) ? it[STATE] : {};
    };

    has$1 = function has$1(it) {
      return has(it, STATE);
    };
  }

  var internalState = {
    set: set,
    get: get,
    has: has$1,
    enforce: enforce,
    getterFor: getterFor
  };

  var redefine = createCommonjsModule(function (module) {
    var getInternalState = internalState.get;
    var enforceInternalState = internalState.enforce;
    var TEMPLATE = String(functionToString).split('toString');
    shared('inspectSource', function (it) {
      return functionToString.call(it);
    });
    (module.exports = function (O, key, value, options) {
      var unsafe = options ? !!options.unsafe : false;
      var simple = options ? !!options.enumerable : false;
      var noTargetGet = options ? !!options.noTargetGet : false;

      if (typeof value == 'function') {
        if (typeof key == 'string' && !has(value, 'name')) hide(value, 'name', key);
        enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
      }

      if (O === global_1) {
        if (simple) O[key] = value;else setGlobal(key, value);
        return;
      } else if (!unsafe) {
        delete O[key];
      } else if (!noTargetGet && O[key]) {
        simple = true;
      }

      if (simple) O[key] = value;else hide(O, key, value); // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, 'toString', function toString() {
      return typeof this == 'function' && getInternalState(this).source || functionToString.call(this);
    });
  });

  var path = global_1;

  var aFunction = function aFunction(variable) {
    return typeof variable == 'function' ? variable : undefined;
  };

  var getBuiltIn = function getBuiltIn(namespace, method) {
    return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace]) : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
  };

  var ceil = Math.ceil;
  var floor = Math.floor; // `ToInteger` abstract operation
  // https://tc39.github.io/ecma262/#sec-tointeger

  var toInteger = function toInteger(argument) {
    return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
  };

  var min = Math.min; // `ToLength` abstract operation
  // https://tc39.github.io/ecma262/#sec-tolength

  var toLength = function toLength(argument) {
    return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  };

  var max = Math.max;
  var min$1 = Math.min; // Helper for a popular repeating case of the spec:
  // Let integer be ? ToInteger(index).
  // If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).

  var toAbsoluteIndex = function toAbsoluteIndex(index, length) {
    var integer = toInteger(index);
    return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
  };

  var createMethod = function createMethod(IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = toIndexedObject($this);
      var length = toLength(O.length);
      var index = toAbsoluteIndex(fromIndex, length);
      var value; // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare

      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++]; // eslint-disable-next-line no-self-compare

        if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
      } else for (; length > index; index++) {
        if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
      }
      return !IS_INCLUDES && -1;
    };
  };

  var arrayIncludes = {
    // `Array.prototype.includes` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    includes: createMethod(true),
    // `Array.prototype.indexOf` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
    indexOf: createMethod(false)
  };

  var indexOf = arrayIncludes.indexOf;

  var objectKeysInternal = function objectKeysInternal(object, names) {
    var O = toIndexedObject(object);
    var i = 0;
    var result = [];
    var key;

    for (key in O) {
      !has(hiddenKeys, key) && has(O, key) && result.push(key);
    } // Don't enum bug & hidden keys


    while (names.length > i) {
      if (has(O, key = names[i++])) {
        ~indexOf(result, key) || result.push(key);
      }
    }

    return result;
  };

  // IE8- don't enum bug keys
  var enumBugKeys = ['constructor', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'toLocaleString', 'toString', 'valueOf'];

  var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype'); // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames

  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return objectKeysInternal(O, hiddenKeys$1);
  };

  var objectGetOwnPropertyNames = {
    f: f$3
  };

  var f$4 = Object.getOwnPropertySymbols;
  var objectGetOwnPropertySymbols = {
    f: f$4
  };

  var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
    var keys = objectGetOwnPropertyNames.f(anObject(it));
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
  };

  var copyConstructorProperties = function copyConstructorProperties(target, source) {
    var keys = ownKeys(source);
    var defineProperty = objectDefineProperty.f;
    var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  };

  var replacement = /#|\.prototype\./;

  var isForced = function isForced(feature, detection) {
    var value = data[normalize(feature)];
    return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
  };

  var normalize = isForced.normalize = function (string) {
    return String(string).replace(replacement, '.').toLowerCase();
  };

  var data = isForced.data = {};
  var NATIVE = isForced.NATIVE = 'N';
  var POLYFILL = isForced.POLYFILL = 'P';
  var isForced_1 = isForced;

  var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
  /*
    options.target      - name of the target object
    options.global      - target is the global object
    options.stat        - export as static methods of target
    options.proto       - export as prototype methods of target
    options.real        - real prototype method for the `pure` version
    options.forced      - export even if the native feature is available
    options.bind        - bind methods to the target, required for the `pure` version
    options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
    options.unsafe      - use the simple assignment of property instead of delete + defineProperty
    options.sham        - add a flag to not completely full polyfills
    options.enumerable  - export as enumerable property
    options.noTargetGet - prevent calling a getter on target
  */

  var _export = function _export(options, source) {
    var TARGET = options.target;
    var GLOBAL = options.global;
    var STATIC = options.stat;
    var FORCED, target, key, targetProperty, sourceProperty, descriptor;

    if (GLOBAL) {
      target = global_1;
    } else if (STATIC) {
      target = global_1[TARGET] || setGlobal(TARGET, {});
    } else {
      target = (global_1[TARGET] || {}).prototype;
    }

    if (target) for (key in source) {
      sourceProperty = source[key];

      if (options.noTargetGet) {
        descriptor = getOwnPropertyDescriptor$1(target, key);
        targetProperty = descriptor && descriptor.value;
      } else targetProperty = target[key];

      FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced); // contained in target

      if (!FORCED && targetProperty !== undefined) {
        if (_typeof(sourceProperty) === _typeof(targetProperty)) continue;
        copyConstructorProperties(sourceProperty, targetProperty);
      } // add a flag to not completely full polyfills


      if (options.sham || targetProperty && targetProperty.sham) {
        hide(sourceProperty, 'sham', true);
      } // extend global


      redefine(target, key, sourceProperty, options);
    }
  };

  // https://tc39.github.io/ecma262/#sec-object.keys

  var objectKeys = Object.keys || function keys(O) {
    return objectKeysInternal(O, enumBugKeys);
  };

  // https://tc39.github.io/ecma262/#sec-toobject

  var toObject = function toObject(argument) {
    return Object(requireObjectCoercible(argument));
  };

  var nativeAssign = Object.assign; // `Object.assign` method
  // https://tc39.github.io/ecma262/#sec-object.assign
  // should work with symbols and should have deterministic property order (V8 bug)

  var objectAssign = !nativeAssign || fails(function () {
    var A = {};
    var B = {}; // eslint-disable-next-line no-undef

    var symbol = Symbol();
    var alphabet = 'abcdefghijklmnopqrst';
    A[symbol] = 7;
    alphabet.split('').forEach(function (chr) {
      B[chr] = chr;
    });
    return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
  }) ? function assign(target, source) {
    // eslint-disable-line no-unused-vars
    var T = toObject(target);
    var argumentsLength = arguments.length;
    var index = 1;
    var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
    var propertyIsEnumerable = objectPropertyIsEnumerable.f;

    while (argumentsLength > index) {
      var S = indexedObject(arguments[index++]);
      var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
      var length = keys.length;
      var j = 0;
      var key;

      while (length > j) {
        key = keys[j++];
        if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
      }
    }

    return T;
  } : nativeAssign;

  // https://tc39.github.io/ecma262/#sec-object.assign

  _export({
    target: 'Object',
    stat: true,
    forced: Object.assign !== objectAssign
  }, {
    assign: objectAssign
  });

  var Log =
  /*#__PURE__*/
  function () {
    function Log() {
      var debug_enabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      _classCallCheck(this, Log);

      this.debug = debug_enabled;
    }

    _createClass(Log, [{
      key: "error",
      value: function error(msg) {
        if (!this.log_at_level('error', msg)) {
          window.alert("Error: " + msg);
        }
      }
    }, {
      key: "debug",
      value: function debug(msg) {
        if (this.debug) {
          this.log_at_level('debug', msg);
        }
      }
    }, {
      key: "log_at_level",
      value: function log_at_level(level, msg) {
        if (console && console[level]) {
          console[level](msg);
          return true;
        }

        return false;
      }
    }]);

    return Log;
  }();

  log = new Log();
   //debug,info,warn,error

  /**
   * Helpers.
   */
  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var y = d * 365.25;
  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  var ms = function ms(val, options) {
    options = options || {};

    var type = _typeof(val);

    if (type === 'string' && val.length > 0) {
      return parse(val);
    } else if (type === 'number' && isNaN(val) === false) {
      return options["long"] ? fmtLong(val) : fmtShort(val);
    }

    throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
  };
  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */


  function parse(str) {
    str = String(str);

    if (str.length > 100) {
      return;
    }

    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);

    if (!match) {
      return;
    }

    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();

    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y;

      case 'days':
      case 'day':
      case 'd':
        return n * d;

      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h;

      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m;

      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s;

      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;

      default:
        return undefined;
    }
  }
  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */


  function fmtShort(ms) {
    if (ms >= d) {
      return Math.round(ms / d) + 'd';
    }

    if (ms >= h) {
      return Math.round(ms / h) + 'h';
    }

    if (ms >= m) {
      return Math.round(ms / m) + 'm';
    }

    if (ms >= s) {
      return Math.round(ms / s) + 's';
    }

    return ms + 'ms';
  }
  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */


  function fmtLong(ms) {
    return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
  }
  /**
   * Pluralization helper.
   */


  function plural(ms, n, name) {
    if (ms < n) {
      return;
    }

    if (ms < n * 1.5) {
      return Math.floor(ms / n) + ' ' + name;
    }

    return Math.ceil(ms / n) + ' ' + name + 's';
  }

  var debug = createCommonjsModule(function (module, exports) {
    /**
     * This is the common logic for both the Node.js and web browser
     * implementations of `debug()`.
     *
     * Expose `debug()` as the module.
     */
    exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
    exports.coerce = coerce;
    exports.disable = disable;
    exports.enable = enable;
    exports.enabled = enabled;
    exports.humanize = ms;
    /**
     * The currently active debug mode names, and names to skip.
     */

    exports.names = [];
    exports.skips = [];
    /**
     * Map of special "%n" handling functions, for the debug "format" argument.
     *
     * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
     */

    exports.formatters = {};
    /**
     * Previous log timestamp.
     */

    var prevTime;
    /**
     * Select a color.
     * @param {String} namespace
     * @return {Number}
     * @api private
     */

    function selectColor(namespace) {
      var hash = 0,
          i;

      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
      }

      return exports.colors[Math.abs(hash) % exports.colors.length];
    }
    /**
     * Create a debugger with the given `namespace`.
     *
     * @param {String} namespace
     * @return {Function}
     * @api public
     */


    function createDebug(namespace) {
      function debug() {
        // disabled?
        if (!debug.enabled) return;
        var self = debug; // set `diff` timestamp

        var curr = +new Date();
        var ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr; // turn the `arguments` into a proper Array

        var args = new Array(arguments.length);

        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }

        args[0] = exports.coerce(args[0]);

        if ('string' !== typeof args[0]) {
          // anything else let's inspect with %O
          args.unshift('%O');
        } // apply any `formatters` transformations


        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
          // if we encounter an escaped % then don't increase the array index
          if (match === '%%') return match;
          index++;
          var formatter = exports.formatters[format];

          if ('function' === typeof formatter) {
            var val = args[index];
            match = formatter.call(self, val); // now we need to remove `args[index]` since it's inlined in the `format`

            args.splice(index, 1);
            index--;
          }

          return match;
        }); // apply env-specific formatting (colors, etc.)

        exports.formatArgs.call(self, args);
        var logFn = debug.log || exports.log || console.log.bind(console);
        logFn.apply(self, args);
      }

      debug.namespace = namespace;
      debug.enabled = exports.enabled(namespace);
      debug.useColors = exports.useColors();
      debug.color = selectColor(namespace); // env-specific initialization logic for debug instances

      if ('function' === typeof exports.init) {
        exports.init(debug);
      }

      return debug;
    }
    /**
     * Enables a debug mode by namespaces. This can include modes
     * separated by a colon and wildcards.
     *
     * @param {String} namespaces
     * @api public
     */


    function enable(namespaces) {
      exports.save(namespaces);
      exports.names = [];
      exports.skips = [];
      var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
      var len = split.length;

      for (var i = 0; i < len; i++) {
        if (!split[i]) continue; // ignore empty strings

        namespaces = split[i].replace(/\*/g, '.*?');

        if (namespaces[0] === '-') {
          exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
        } else {
          exports.names.push(new RegExp('^' + namespaces + '$'));
        }
      }
    }
    /**
     * Disable debug output.
     *
     * @api public
     */


    function disable() {
      exports.enable('');
    }
    /**
     * Returns true if the given mode name is enabled, false otherwise.
     *
     * @param {String} name
     * @return {Boolean}
     * @api public
     */


    function enabled(name) {
      var i, len;

      for (i = 0, len = exports.skips.length; i < len; i++) {
        if (exports.skips[i].test(name)) {
          return false;
        }
      }

      for (i = 0, len = exports.names.length; i < len; i++) {
        if (exports.names[i].test(name)) {
          return true;
        }
      }

      return false;
    }
    /**
     * Coerce `val`.
     *
     * @param {Mixed} val
     * @return {Mixed}
     * @api private
     */


    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }
  });
  var debug_1 = debug.coerce;
  var debug_2 = debug.disable;
  var debug_3 = debug.enable;
  var debug_4 = debug.enabled;
  var debug_5 = debug.humanize;
  var debug_6 = debug.names;
  var debug_7 = debug.skips;
  var debug_8 = debug.formatters;

  var browser = createCommonjsModule(function (module, exports) {
    /**
     * This is the web browser implementation of `debug()`.
     *
     * Expose `debug()` as the module.
     */
    exports = module.exports = debug;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();
    /**
     * Colors.
     */

    exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];
    /**
     * Currently only WebKit-based Web Inspectors, Firefox >= v31,
     * and the Firebug extension (any Firefox version) are known
     * to support "%c" CSS customizations.
     *
     * TODO: add a `localStorage` variable to explicitly enable/disable colors
     */

    function useColors() {
      // NB: In an Electron preload script, document will be defined but not fully
      // initialized. Since we know we're in Chrome, we'll just detect this case
      // explicitly
      if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
        return true;
      } // is webkit? http://stackoverflow.com/a/16459606/376773
      // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632


      return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    /**
     * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
     */


    exports.formatters.j = function (v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return '[UnexpectedJSONParseError]: ' + err.message;
      }
    };
    /**
     * Colorize log arguments if enabled.
     *
     * @api public
     */


    function formatArgs(args) {
      var useColors = this.useColors;
      args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);
      if (!useColors) return;
      var c = 'color: ' + this.color;
      args.splice(1, 0, c, 'color: inherit'); // the final "%c" is somewhat tricky, because there could be other
      // arguments passed either before or after the %c, so we need to
      // figure out the correct index to insert the CSS into

      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function (match) {
        if ('%%' === match) return;
        index++;

        if ('%c' === match) {
          // we only are interested in the *last* %c
          // (the user may have provided their own)
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    /**
     * Invokes `console.log()` when available.
     * No-op when `console.log` is not a "function".
     *
     * @api public
     */


    function log() {
      // this hackery is required for IE8/9, where
      // the `console.log` function doesn't have 'apply'
      return 'object' === (typeof console === "undefined" ? "undefined" : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    /**
     * Save `namespaces`.
     *
     * @param {String} namespaces
     * @api private
     */


    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports.storage.removeItem('debug');
        } else {
          exports.storage.debug = namespaces;
        }
      } catch (e) {}
    }
    /**
     * Load `namespaces`.
     *
     * @return {String} returns the previously persisted debug modes
     * @api private
     */


    function load() {
      var r;

      try {
        r = exports.storage.debug;
      } catch (e) {} // If debug isn't set in LS, and we're in Electron, try to load $DEBUG


      if (!r && typeof process !== 'undefined' && 'env' in process) {
        r = process.env.DEBUG;
      }

      return r;
    }
    /**
     * Enable namespaces listed in `localStorage.debug` initially.
     */


    exports.enable(load());
    /**
     * Localstorage attempts to return the localstorage.
     *
     * This is necessary because safari throws
     * when a user disables cookies/localstorage
     * and you attempt to access it.
     *
     * @return {LocalStorage}
     * @api private
     */

    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {}
    }
  });
  var browser_1 = browser.log;
  var browser_2 = browser.formatArgs;
  var browser_3 = browser.save;
  var browser_4 = browser.load;
  var browser_5 = browser.useColors;
  var browser_6 = browser.storage;
  var browser_7 = browser.colors;

  var node = createCommonjsModule(function (module, exports) {
    /**
     * Module dependencies.
     */

    /**
     * This is the Node.js implementation of `debug()`.
     *
     * Expose `debug()` as the module.
     */
    exports = module.exports = debug;
    exports.init = init;
    exports.log = log;
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    /**
     * Colors.
     */

    exports.colors = [6, 2, 3, 4, 5, 1];
    /**
     * Build up the default `inspectOpts` object from the environment variables.
     *
     *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
     */

    exports.inspectOpts = Object.keys(process.env).filter(function (key) {
      return /^debug_/i.test(key);
    }).reduce(function (obj, key) {
      // camel-case
      var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function (_, k) {
        return k.toUpperCase();
      }); // coerce string value into JS value

      var val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) val = true;else if (/^(no|off|false|disabled)$/i.test(val)) val = false;else if (val === 'null') val = null;else val = Number(val);
      obj[prop] = val;
      return obj;
    }, {});
    /**
     * The file descriptor to write the `debug()` calls to.
     * Set the `DEBUG_FD` env variable to override with another value. i.e.:
     *
     *   $ DEBUG_FD=3 node script.js 3>debug.log
     */

    var fd = parseInt(process.env.DEBUG_FD, 10) || 2;

    if (1 !== fd && 2 !== fd) {
      util.deprecate(function () {}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')();
    }

    var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream(fd);
    /**
     * Is stdout a TTY? Colored output is enabled when `true`.
     */

    function useColors() {
      return 'colors' in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(fd);
    }
    /**
     * Map %o to `util.inspect()`, all on a single line.
     */


    exports.formatters.o = function (v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split('\n').map(function (str) {
        return str.trim();
      }).join(' ');
    };
    /**
     * Map %o to `util.inspect()`, allowing multiple lines if needed.
     */


    exports.formatters.O = function (v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
    /**
     * Adds ANSI color escape codes if enabled.
     *
     * @api public
     */


    function formatArgs(args) {
      var name = this.namespace;
      var useColors = this.useColors;

      if (useColors) {
        var c = this.color;
        var prefix = "  \x1B[3" + c + ';1m' + name + ' ' + "\x1B[0m";
        args[0] = prefix + args[0].split('\n').join('\n' + prefix);
        args.push("\x1B[3" + c + 'm+' + exports.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = new Date().toUTCString() + ' ' + name + ' ' + args[0];
      }
    }
    /**
     * Invokes `util.format()` with the specified arguments and writes to `stream`.
     */


    function log() {
      return stream.write(util.format.apply(util, arguments) + '\n');
    }
    /**
     * Save `namespaces`.
     *
     * @param {String} namespaces
     * @api private
     */


    function save(namespaces) {
      if (null == namespaces) {
        // If you set a process.env field to null or undefined, it gets cast to the
        // string 'null' or 'undefined'. Just delete instead.
        delete process.env.DEBUG;
      } else {
        process.env.DEBUG = namespaces;
      }
    }
    /**
     * Load `namespaces`.
     *
     * @return {String} returns the previously persisted debug modes
     * @api private
     */


    function load() {
      return process.env.DEBUG;
    }
    /**
     * Copied from `node/src/node.js`.
     *
     * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
     * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
     */


    function createWritableStdioStream(fd) {
      var stream;
      var tty_wrap = process.binding('tty_wrap'); // Note stream._type is used for test-module-load-list.js

      switch (tty_wrap.guessHandleType(fd)) {
        case 'TTY':
          stream = new tty.WriteStream(fd);
          stream._type = 'tty'; // Hack to have stream not keep the event loop alive.
          // See https://github.com/joyent/node/issues/1726

          if (stream._handle && stream._handle.unref) {
            stream._handle.unref();
          }

          break;

        case 'FILE':
          var fs$1 = fs;
          stream = new fs$1.SyncWriteStream(fd, {
            autoClose: false
          });
          stream._type = 'fs';
          break;

        case 'PIPE':
        case 'TCP':
          var net$1 = net;
          stream = new net$1.Socket({
            fd: fd,
            readable: false,
            writable: true
          }); // FIXME Should probably have an option in net.Socket to create a
          // stream from an existing fd which is writable only. But for now
          // we'll just add this hack and set the `readable` member to false.
          // Test: ./node test/fixtures/echo.js < /etc/passwd

          stream.readable = false;
          stream.read = null;
          stream._type = 'pipe'; // FIXME Hack to have stream not keep the event loop alive.
          // See https://github.com/joyent/node/issues/1726

          if (stream._handle && stream._handle.unref) {
            stream._handle.unref();
          }

          break;

        default:
          // Probably an error on in uv_guess_handle()
          throw new Error('Implement me. Unknown stream file type!');
      } // For supporting legacy API we put the FD here.


      stream.fd = fd;
      stream._isStdio = true;
      return stream;
    }
    /**
     * Init logic for `debug` instances.
     *
     * Create a new `inspectOpts` object in case `useColors` is set
     * differently for a particular `debug` instance.
     */


    function init(debug) {
      debug.inspectOpts = {};
      var keys = Object.keys(exports.inspectOpts);

      for (var i = 0; i < keys.length; i++) {
        debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
      }
    }
    /**
     * Enable namespaces listed in `process.env.DEBUG` initially.
     */


    exports.enable(load());
  });
  var node_1 = node.init;
  var node_2 = node.log;
  var node_3 = node.formatArgs;
  var node_4 = node.save;
  var node_5 = node.load;
  var node_6 = node.useColors;
  var node_7 = node.colors;
  var node_8 = node.inspectOpts;

  var src = createCommonjsModule(function (module) {
    /**
     * Detect Electron renderer process, which is node, but we should
     * treat as a browser.
     */
    if (typeof process !== 'undefined' && process.type === 'renderer') {
      module.exports = browser;
    } else {
      module.exports = node;
    }
  });

  /**
   * Module dependencies
   */

  var debug$1 = src('jsonp');
  /**
   * Module exports.
   */

  var jsonp_1 = jsonp;
  /**
   * Callback index.
   */

  var count = 0;
  /**
   * Noop function.
   */

  function noop() {}
  /**
   * JSONP handler
   *
   * Options:
   *  - param {String} qs parameter (`callback`)
   *  - prefix {String} qs parameter (`__jp`)
   *  - name {String} qs parameter (`prefix` + incr)
   *  - timeout {Number} how long after a timeout error is emitted (`60000`)
   *
   * @param {String} url
   * @param {Object|Function} optional options / callback
   * @param {Function} optional callback
   */


  function jsonp(url, opts, fn) {
    if ('function' == typeof opts) {
      fn = opts;
      opts = {};
    }

    if (!opts) opts = {};
    var prefix = opts.prefix || '__jp'; // use the callback name that was passed if one was provided.
    // otherwise generate a unique name by incrementing our counter.

    var id = opts.name || prefix + count++;
    var param = opts.param || 'callback';
    var timeout = null != opts.timeout ? opts.timeout : 60000;
    var enc = encodeURIComponent;
    var target = document.getElementsByTagName('script')[0] || document.head;
    var script;
    var timer;

    if (timeout) {
      timer = setTimeout(function () {
        cleanup();
        if (fn) fn(new Error('Timeout'));
      }, timeout);
    }

    function cleanup() {
      if (script.parentNode) script.parentNode.removeChild(script);
      window[id] = noop;
      if (timer) clearTimeout(timer);
    }

    function cancel() {
      if (window[id]) {
        cleanup();
      }
    }

    window[id] = function (data) {
      debug$1('jsonp got', data);
      cleanup();
      if (fn) fn(null, data);
    }; // add qs component


    url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
    url = url.replace('?&', '?');
    debug$1('jsonp req "%s"', url); // create script

    script = document.createElement('script');
    script.src = url;
    target.parentNode.insertBefore(script, target);
    return cancel;
  }

  var Form =
  /*#__PURE__*/
  function () {
    function Form(options) {
      _classCallCheck(this, Form);

      for (var key in options) {
        this[key] = options[key];
      }

      if (!this.form_key) {
        return Log.error("No Form Key set!");
      }

      if (this.manual) {
        //bail out of the rest of setup for manual-mode
        return;
      }

      if (!this.email_field) {
        return Log.error("No Email Field set!");
      }

      if (!this.form) {
        //try and guess form from email field's 'form' property
        this.form = this.email_field.form;
      }

      if (!this.form) {
        return Log.error("Could not determine Form!");
      }

      if (!this.submit_button) {
        var submit_buttons = [];

        for (var element in this.form.elements) {
          //FIXME - should use integers only?
          var this_element = this.form.elements[element];

          if (this_element.nodeName == "input" && this_element.type == "submit") {
            submit_buttons.push(this_element);
          }
        }

        this.submit_button = submit_buttons;
      }

      this.initialize_dom();
    }

    _createClass(Form, [{
      key: "initialize_dom",
      value: function initialize_dom() {
        // set up the onchange handler for the email field
        var old_onchange = this.email_field.onchange;

        this.email_field.onchange = function (event) {
          this.onchange_handler(event);

          if (old_onchange) {
            old_onchange(event);
          }
        }; //set up the onsubmit handler for the form (if there is one)


        if (this.form) {
          var old_onsubmit = this.form.onsubmit;

          this.form.onsubmit = function (event) {
            if (old_onsubmit) {
              var _results = old_onsubmit(event); //FIXME - confusing, *their* old onsubmit handler fires *first*?

            }

            if (results) {
              return this.onsubmit_handler(event);
            }
          };
        }
      }
    }, {
      key: "onchange_handler",
      value: function onchange_handler(event) {
        DO_SOMETHNG_CLEVER();
        jsonp_1("url");
      }
    }, {
      key: "onsubmit_handler",
      value: function onsubmit_handler(event) {
        DO_SOMETHING_CLEVERER();
        jsonp_1("url");
      }
    }, {
      key: "verify",
      value: function verify(email, callback) {
        jsonp_1("https://goodverification.com/verify?email=" + email + "&form_key=" + this.form_key, {}, function (data) {
          callback(data.status);
        });
      }
    }]);

    return Form;
  }();

  function auto (form_key, options) {
    if (!form_key) {
      Log.error("Form key was not set");
      return;
    }

    if (options) {
      my_options = Object.assign({}, options);
      my_options.form_key = form_key;
    } else {
      my_options = {
        form_key: form_key
      };
    }

    if (my_options.debug) {
      Log.debug = my_options.debug;
      delete my_options.debug; //don't want to keep passing this down to each Verify
    }

    var activated_forms = [];

    for (form in document.forms) {
      //olde-skoole DOM0 FTW!
      Log.debug("Checking form: " + form + " for verifiable email address fields...");

      for (element in document.forms[form].elements) {
        Log.debug("Checking field #" + element + " to see if it's an email address field");
        var this_field = document.forms[form].elements[element];

        if (this_field.type == "email" || this_field.name == "email" || this_field.id == "email") {
          var options_copy = Object.assign({}, options);
          Log.debug("Found candidate field. Name: " + this_field.name + " Type: " + this_field.type + " ID: " + this_field.id);
          options_copy.form = document.forms[form];
          options_copy.email_field = this_field;
          activated_forms.push(new Form(my_options));
        }
      }
    }

    return activated_forms;
  }

  function index (form_key, options) {
    if (options && options.debug) {
      Log.debug = options.debug;
    }

    if (!form_key) {
      Log.error("Form key was not set");
    }

    if (!options || !options.email_field && !options.manual) {
      return auto();
    }

    return new Form(form_key, options);
  }

  return index;

}));
