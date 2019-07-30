(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('tty'), require('util'), require('fs'), require('net')) :
    typeof define === 'function' && define.amd ? define(['tty', 'util', 'fs', 'net'], factory) :
    (global = global || self, global.MyBundle = factory(global.tty, global.util, global.fs, global.net));
}(this, function (tty, util, fs, net) { 'use strict';

    tty = tty && tty.hasOwnProperty('default') ? tty['default'] : tty;
    util = util && util.hasOwnProperty('default') ? util['default'] : util;
    fs = fs && fs.hasOwnProperty('default') ? fs['default'] : fs;
    net = net && net.hasOwnProperty('default') ? net['default'] : net;

    var Log = function Log(debug_enabled) {
        if ( debug_enabled === void 0 ) debug_enabled = false;

        this.debug = debug_enabled;
    };

    Log.prototype.error = function error (msg) {
        if(!this.log_at_level('error',msg)) {
            window.alert("Error: "+msg);
        }
    };

    Log.prototype.debug = function debug (msg) {
        if(this.debug) {
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

    log = new Log();

    //debug,info,warn,error

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

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

    var ms = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === 'string' && val.length > 0) {
        return parse(val);
      } else if (type === 'number' && isNaN(val) === false) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        'val is not a non-empty string or a valid number. val=' +
          JSON.stringify(val)
      );
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
      var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
        str
      );
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
      return plural(ms, d, 'day') ||
        plural(ms, h, 'hour') ||
        plural(ms, m, 'minute') ||
        plural(ms, s, 'second') ||
        ms + ' ms';
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
      var hash = 0, i;

      for (i in namespace) {
        hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
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
        var arguments$1 = arguments;

        // disabled?
        if (!debug.enabled) { return; }

        var self = debug;

        // set `diff` timestamp
        var curr = +new Date();
        var ms = curr - (prevTime || curr);
        self.diff = ms;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;

        // turn the `arguments` into a proper Array
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments$1[i];
        }

        args[0] = exports.coerce(args[0]);

        if ('string' !== typeof args[0]) {
          // anything else let's inspect with %O
          args.unshift('%O');
        }

        // apply any `formatters` transformations
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          // if we encounter an escaped % then don't increase the array index
          if (match === '%%') { return match; }
          index++;
          var formatter = exports.formatters[format];
          if ('function' === typeof formatter) {
            var val = args[index];
            match = formatter.call(self, val);

            // now we need to remove `args[index]` since it's inlined in the `format`
            args.splice(index, 1);
            index--;
          }
          return match;
        });

        // apply env-specific formatting (colors, etc.)
        exports.formatArgs.call(self, args);

        var logFn = debug.log || exports.log || console.log.bind(console);
        logFn.apply(self, args);
      }

      debug.namespace = namespace;
      debug.enabled = exports.enabled(namespace);
      debug.useColors = exports.useColors();
      debug.color = selectColor(namespace);

      // env-specific initialization logic for debug instances
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
        if (!split[i]) { continue; } // ignore empty strings
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
      if (val instanceof Error) { return val.stack || val.message; }
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
    exports.storage = 'undefined' != typeof chrome
                   && 'undefined' != typeof chrome.storage
                      ? chrome.storage.local
                      : localstorage();

    /**
     * Colors.
     */

    exports.colors = [
      'lightseagreen',
      'forestgreen',
      'goldenrod',
      'dodgerblue',
      'darkorchid',
      'crimson'
    ];

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
      }

      // is webkit? http://stackoverflow.com/a/16459606/376773
      // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
      return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
        // is firebug? http://stackoverflow.com/a/398120/376773
        (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
        // is firefox >= v31?
        // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
        (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
        // double check webkit in userAgent just in case we are in a worker
        (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
    }

    /**
     * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
     */

    exports.formatters.j = function(v) {
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

      args[0] = (useColors ? '%c' : '')
        + this.namespace
        + (useColors ? ' %c' : ' ')
        + args[0]
        + (useColors ? '%c ' : ' ')
        + '+' + exports.humanize(this.diff);

      if (!useColors) { return; }

      var c = 'color: ' + this.color;
      args.splice(1, 0, c, 'color: inherit');

      // the final "%c" is somewhat tricky, because there could be other
      // arguments passed either before or after the %c, so we need to
      // figure out the correct index to insert the CSS into
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ('%%' === match) { return; }
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
      return 'object' === typeof console
        && console.log
        && Function.prototype.apply.call(console.log, console, arguments);
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
      } catch(e) {}
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
      } catch(e) {}

      // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
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
      var prop = key
        .substring(6)
        .toLowerCase()
        .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

      // coerce string value into JS value
      var val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) { val = true; }
      else if (/^(no|off|false|disabled)$/i.test(val)) { val = false; }
      else if (val === 'null') { val = null; }
      else { val = Number(val); }

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
      util.deprecate(function(){}, 'except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)')();
    }

    var stream = 1 === fd ? process.stdout :
                 2 === fd ? process.stderr :
                 createWritableStdioStream(fd);

    /**
     * Is stdout a TTY? Colored output is enabled when `true`.
     */

    function useColors() {
      return 'colors' in exports.inspectOpts
        ? Boolean(exports.inspectOpts.colors)
        : tty.isatty(fd);
    }

    /**
     * Map %o to `util.inspect()`, all on a single line.
     */

    exports.formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts)
        .split('\n').map(function(str) {
          return str.trim()
        }).join(' ');
    };

    /**
     * Map %o to `util.inspect()`, allowing multiple lines if needed.
     */

    exports.formatters.O = function(v) {
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
        var prefix = '  \u001b[3' + c + ';1m' + name + ' ' + '\u001b[0m';

        args[0] = prefix + args[0].split('\n').join('\n' + prefix);
        args.push('\u001b[3' + c + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
      } else {
        args[0] = new Date().toUTCString()
          + ' ' + name + ' ' + args[0];
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

    function createWritableStdioStream (fd) {
      var stream;
      var tty_wrap = process.binding('tty_wrap');

      // Note stream._type is used for test-module-load-list.js

      switch (tty_wrap.guessHandleType(fd)) {
        case 'TTY':
          stream = new tty.WriteStream(fd);
          stream._type = 'tty';

          // Hack to have stream not keep the event loop alive.
          // See https://github.com/joyent/node/issues/1726
          if (stream._handle && stream._handle.unref) {
            stream._handle.unref();
          }
          break;

        case 'FILE':
          var fs$1 = fs;
          stream = new fs$1.SyncWriteStream(fd, { autoClose: false });
          stream._type = 'fs';
          break;

        case 'PIPE':
        case 'TCP':
          var net$1 = net;
          stream = new net$1.Socket({
            fd: fd,
            readable: false,
            writable: true
          });

          // FIXME Should probably have an option in net.Socket to create a
          // stream from an existing fd which is writable only. But for now
          // we'll just add this hack and set the `readable` member to false.
          // Test: ./node test/fixtures/echo.js < /etc/passwd
          stream.readable = false;
          stream.read = null;
          stream._type = 'pipe';

          // FIXME Hack to have stream not keep the event loop alive.
          // See https://github.com/joyent/node/issues/1726
          if (stream._handle && stream._handle.unref) {
            stream._handle.unref();
          }
          break;

        default:
          // Probably an error on in uv_guess_handle()
          throw new Error('Implement me. Unknown stream file type!');
      }

      // For supporting legacy API we put the FD here.
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

    function init (debug) {
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

    function noop(){}

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

    function jsonp(url, opts, fn){
      if ('function' == typeof opts) {
        fn = opts;
        opts = {};
      }
      if (!opts) { opts = {}; }

      var prefix = opts.prefix || '__jp';

      // use the callback name that was passed if one was provided.
      // otherwise generate a unique name by incrementing our counter.
      var id = opts.name || (prefix + (count++));

      var param = opts.param || 'callback';
      var timeout = null != opts.timeout ? opts.timeout : 60000;
      var enc = encodeURIComponent;
      var target = document.getElementsByTagName('script')[0] || document.head;
      var script;
      var timer;


      if (timeout) {
        timer = setTimeout(function(){
          cleanup();
          if (fn) { fn(new Error('Timeout')); }
        }, timeout);
      }

      function cleanup(){
        if (script.parentNode) { script.parentNode.removeChild(script); }
        window[id] = noop;
        if (timer) { clearTimeout(timer); }
      }

      function cancel(){
        if (window[id]) {
          cleanup();
        }
      }

      window[id] = function(data){
        debug$1('jsonp got', data);
        cleanup();
        if (fn) { fn(null, data); }
      };

      // add qs component
      url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
      url = url.replace('?&', '?');

      debug$1('jsonp req "%s"', url);

      // create script
      script = document.createElement('script');
      script.src = url;
      target.parentNode.insertBefore(script, target);

      return cancel;
    }

    var Form = function Form(options) {
        for(var key in options) {
            this[key] = options[key];
        }
        if(!this.form_key) {
            return Log.error("No Form Key set!")
        }
        if(this.manual) {
            //bail out of the rest of setup for manual-mode
            return
        }
        if(!this.email_field) {
            return Log.error("No Email Field set!")
        }
        if(!this.form) {
            //try and guess form from email field's 'form' property
            this.form = this.email_field.form;
        }
        if(!this.form) {
            return Log.error("Could not determine Form!")
        }
        if(!this.submit_button) {
            var submit_buttons=[];
            for(var element in this.form.elements) { //FIXME - should use integers only?
                var this_element = this.form.elements[element];
                if(this_element.nodeName == "input" && this_element.type =="submit") {
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
        this.email_field.onchange = function (event) {
            this.onchange_handler(event);
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
    };

    Form.prototype.onchange_handler = function onchange_handler (event) {
        DO_SOMETHNG_CLEVER();
        jsonp_1("url");
    };

    Form.prototype.onsubmit_handler = function onsubmit_handler (event) {
        DO_SOMETHING_CLEVERER();
        jsonp_1("url");
    };

    Form.prototype.verify = function verify (email, callback) {
        jsonp_1("https://goodverification.com/verify?email="+ email + "&form_key="+this.form_key,{}, function (data) {
            callback(data.status);
        });
    };

    var O = 'object';
    var check = function (it) {
      return it && it.Math == Math && it;
    };

    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global_1 =
      // eslint-disable-next-line no-undef
      check(typeof globalThis == O && globalThis) ||
      check(typeof window == O && window) ||
      check(typeof self == O && self) ||
      check(typeof commonjsGlobal == O && commonjsGlobal) ||
      // eslint-disable-next-line no-new-func
      Function('return this')();

    var fails = function (exec) {
      try {
        return !!exec();
      } catch (error) {
        return true;
      }
    };

    // Thank's IE8 for his funny defineProperty
    var descriptors = !fails(function () {
      return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
    });

    var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
    var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    // Nashorn ~ JDK8 bug
    var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

    // `Object.prototype.propertyIsEnumerable` method implementation
    // https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
    var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
      var descriptor = getOwnPropertyDescriptor(this, V);
      return !!descriptor && descriptor.enumerable;
    } : nativePropertyIsEnumerable;

    var objectPropertyIsEnumerable = {
    	f: f
    };

    var createPropertyDescriptor = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };

    var toString = {}.toString;

    var classofRaw = function (it) {
      return toString.call(it).slice(8, -1);
    };

    var split = ''.split;

    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    var indexedObject = fails(function () {
      // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
      // eslint-disable-next-line no-prototype-builtins
      return !Object('z').propertyIsEnumerable(0);
    }) ? function (it) {
      return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
    } : Object;

    // `RequireObjectCoercible` abstract operation
    // https://tc39.github.io/ecma262/#sec-requireobjectcoercible
    var requireObjectCoercible = function (it) {
      if (it == undefined) { throw TypeError("Can't call method on " + it); }
      return it;
    };

    // toObject with fallback for non-array-like ES3 strings



    var toIndexedObject = function (it) {
      return indexedObject(requireObjectCoercible(it));
    };

    var isObject = function (it) {
      return typeof it === 'object' ? it !== null : typeof it === 'function';
    };

    // `ToPrimitive` abstract operation
    // https://tc39.github.io/ecma262/#sec-toprimitive
    // instead of the ES6 spec version, we didn't implement @@toPrimitive case
    // and the second argument - flag - preferred type is a string
    var toPrimitive = function (input, PREFERRED_STRING) {
      if (!isObject(input)) { return input; }
      var fn, val;
      if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) { return val; }
      if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) { return val; }
      if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) { return val; }
      throw TypeError("Can't convert object to primitive value");
    };

    var hasOwnProperty = {}.hasOwnProperty;

    var has = function (it, key) {
      return hasOwnProperty.call(it, key);
    };

    var document$1 = global_1.document;
    // typeof document.createElement is 'object' in old IE
    var EXISTS = isObject(document$1) && isObject(document$1.createElement);

    var documentCreateElement = function (it) {
      return EXISTS ? document$1.createElement(it) : {};
    };

    // Thank's IE8 for his funny defineProperty
    var ie8DomDefine = !descriptors && !fails(function () {
      return Object.defineProperty(documentCreateElement('div'), 'a', {
        get: function () { return 7; }
      }).a != 7;
    });

    var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
    var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
      O = toIndexedObject(O);
      P = toPrimitive(P, true);
      if (ie8DomDefine) { try {
        return nativeGetOwnPropertyDescriptor(O, P);
      } catch (error) { /* empty */ } }
      if (has(O, P)) { return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]); }
    };

    var objectGetOwnPropertyDescriptor = {
    	f: f$1
    };

    var replacement = /#|\.prototype\./;

    var isForced = function (feature, detection) {
      var value = data[normalize(feature)];
      return value == POLYFILL ? true
        : value == NATIVE ? false
        : typeof detection == 'function' ? fails(detection)
        : !!detection;
    };

    var normalize = isForced.normalize = function (string) {
      return String(string).replace(replacement, '.').toLowerCase();
    };

    var data = isForced.data = {};
    var NATIVE = isForced.NATIVE = 'N';
    var POLYFILL = isForced.POLYFILL = 'P';

    var isForced_1 = isForced;

    var path = {};

    var aFunction = function (it) {
      if (typeof it != 'function') {
        throw TypeError(String(it) + ' is not a function');
      } return it;
    };

    // optional / simple context binding
    var bindContext = function (fn, that, length) {
      aFunction(fn);
      if (that === undefined) { return fn; }
      switch (length) {
        case 0: return function () {
          return fn.call(that);
        };
        case 1: return function (a) {
          return fn.call(that, a);
        };
        case 2: return function (a, b) {
          return fn.call(that, a, b);
        };
        case 3: return function (a, b, c) {
          return fn.call(that, a, b, c);
        };
      }
      return function (/* ...args */) {
        return fn.apply(that, arguments);
      };
    };

    var anObject = function (it) {
      if (!isObject(it)) {
        throw TypeError(String(it) + ' is not an object');
      } return it;
    };

    var nativeDefineProperty = Object.defineProperty;

    // `Object.defineProperty` method
    // https://tc39.github.io/ecma262/#sec-object.defineproperty
    var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPrimitive(P, true);
      anObject(Attributes);
      if (ie8DomDefine) { try {
        return nativeDefineProperty(O, P, Attributes);
      } catch (error) { /* empty */ } }
      if ('get' in Attributes || 'set' in Attributes) { throw TypeError('Accessors not supported'); }
      if ('value' in Attributes) { O[P] = Attributes.value; }
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

    var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






    var wrapConstructor = function (NativeConstructor) {
      var Wrapper = function (a, b, c) {
        if (this instanceof NativeConstructor) {
          switch (arguments.length) {
            case 0: return new NativeConstructor();
            case 1: return new NativeConstructor(a);
            case 2: return new NativeConstructor(a, b);
          } return new NativeConstructor(a, b, c);
        } return NativeConstructor.apply(this, arguments);
      };
      Wrapper.prototype = NativeConstructor.prototype;
      return Wrapper;
    };

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
    var _export = function (options, source) {
      var TARGET = options.target;
      var GLOBAL = options.global;
      var STATIC = options.stat;
      var PROTO = options.proto;

      var nativeSource = GLOBAL ? global_1 : STATIC ? global_1[TARGET] : (global_1[TARGET] || {}).prototype;

      var target = GLOBAL ? path : path[TARGET] || (path[TARGET] = {});
      var targetPrototype = target.prototype;

      var FORCED, USE_NATIVE, VIRTUAL_PROTOTYPE;
      var key, sourceProperty, targetProperty, nativeProperty, resultProperty, descriptor;

      for (key in source) {
        FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
        // contains in native
        USE_NATIVE = !FORCED && nativeSource && has(nativeSource, key);

        targetProperty = target[key];

        if (USE_NATIVE) { if (options.noTargetGet) {
          descriptor = getOwnPropertyDescriptor$1(nativeSource, key);
          nativeProperty = descriptor && descriptor.value;
        } else { nativeProperty = nativeSource[key]; } }

        // export native or implementation
        sourceProperty = (USE_NATIVE && nativeProperty) ? nativeProperty : source[key];

        if (USE_NATIVE && typeof targetProperty === typeof sourceProperty) { continue; }

        // bind timers to global for call from export context
        if (options.bind && USE_NATIVE) { resultProperty = bindContext(sourceProperty, global_1); }
        // wrap global constructors for prevent changs in this version
        else if (options.wrap && USE_NATIVE) { resultProperty = wrapConstructor(sourceProperty); }
        // make static versions for prototype methods
        else if (PROTO && typeof sourceProperty == 'function') { resultProperty = bindContext(Function.call, sourceProperty); }
        // default case
        else { resultProperty = sourceProperty; }

        // add a flag to not completely full polyfills
        if (options.sham || (sourceProperty && sourceProperty.sham) || (targetProperty && targetProperty.sham)) {
          hide(resultProperty, 'sham', true);
        }

        target[key] = resultProperty;

        if (PROTO) {
          VIRTUAL_PROTOTYPE = TARGET + 'Prototype';
          if (!has(path, VIRTUAL_PROTOTYPE)) { hide(path, VIRTUAL_PROTOTYPE, {}); }
          // export virtual prototype methods
          path[VIRTUAL_PROTOTYPE][key] = sourceProperty;
          // export real prototype methods
          if (options.real && targetPrototype && !targetPrototype[key]) { hide(targetPrototype, key, sourceProperty); }
        }
      }
    };

    var isPure = true;

    var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
      // Chrome 38 Symbol has incorrect toString conversion
      // eslint-disable-next-line no-undef
      return !String(Symbol());
    });

    // `IsArray` abstract operation
    // https://tc39.github.io/ecma262/#sec-isarray
    var isArray = Array.isArray || function isArray(arg) {
      return classofRaw(arg) == 'Array';
    };

    // `ToObject` abstract operation
    // https://tc39.github.io/ecma262/#sec-toobject
    var toObject = function (argument) {
      return Object(requireObjectCoercible(argument));
    };

    var ceil = Math.ceil;
    var floor = Math.floor;

    // `ToInteger` abstract operation
    // https://tc39.github.io/ecma262/#sec-tointeger
    var toInteger = function (argument) {
      return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
    };

    var min = Math.min;

    // `ToLength` abstract operation
    // https://tc39.github.io/ecma262/#sec-tolength
    var toLength = function (argument) {
      return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
    };

    var max = Math.max;
    var min$1 = Math.min;

    // Helper for a popular repeating case of the spec:
    // Let integer be ? ToInteger(index).
    // If integer < 0, let result be max((length + integer), 0); else let result be min(length, length).
    var toAbsoluteIndex = function (index, length) {
      var integer = toInteger(index);
      return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
    };

    // `Array.prototype.{ indexOf, includes }` methods implementation
    var createMethod = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIndexedObject($this);
        var length = toLength(O.length);
        var index = toAbsoluteIndex(fromIndex, length);
        var value;
        // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare
        if (IS_INCLUDES && el != el) { while (length > index) {
          value = O[index++];
          // eslint-disable-next-line no-self-compare
          if (value != value) { return true; }
        // Array#indexOf ignores holes, Array#includes - not
        } } else { for (;length > index; index++) {
          if ((IS_INCLUDES || index in O) && O[index] === el) { return IS_INCLUDES || index || 0; }
        } } return !IS_INCLUDES && -1;
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

    var hiddenKeys = {};

    var indexOf = arrayIncludes.indexOf;


    var objectKeysInternal = function (object, names) {
      var O = toIndexedObject(object);
      var i = 0;
      var result = [];
      var key;
      for (key in O) { !has(hiddenKeys, key) && has(O, key) && result.push(key); }
      // Don't enum bug & hidden keys
      while (names.length > i) { if (has(O, key = names[i++])) {
        ~indexOf(result, key) || result.push(key);
      } }
      return result;
    };

    // IE8- don't enum bug keys
    var enumBugKeys = [
      'constructor',
      'hasOwnProperty',
      'isPrototypeOf',
      'propertyIsEnumerable',
      'toLocaleString',
      'toString',
      'valueOf'
    ];

    // `Object.keys` method
    // https://tc39.github.io/ecma262/#sec-object.keys
    var objectKeys = Object.keys || function keys(O) {
      return objectKeysInternal(O, enumBugKeys);
    };

    // `Object.defineProperties` method
    // https://tc39.github.io/ecma262/#sec-object.defineproperties
    var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
      anObject(O);
      var keys = objectKeys(Properties);
      var length = keys.length;
      var index = 0;
      var key;
      while (length > index) { objectDefineProperty.f(O, key = keys[index++], Properties[key]); }
      return O;
    };

    var aFunction$1 = function (variable) {
      return typeof variable == 'function' ? variable : undefined;
    };

    var getBuiltIn = function (namespace, method) {
      return arguments.length < 2 ? aFunction$1(path[namespace]) || aFunction$1(global_1[namespace])
        : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
    };

    var html = getBuiltIn('document', 'documentElement');

    var setGlobal = function (key, value) {
      try {
        hide(global_1, key, value);
      } catch (error) {
        global_1[key] = value;
      } return value;
    };

    var shared = createCommonjsModule(function (module) {
    var SHARED = '__core-js_shared__';
    var store = global_1[SHARED] || setGlobal(SHARED, {});

    (module.exports = function (key, value) {
      return store[key] || (store[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: '3.1.3',
      mode:  'pure' ,
      copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
    });
    });

    var id = 0;
    var postfix = Math.random();

    var uid = function (key) {
      return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
    };

    var keys = shared('keys');

    var sharedKey = function (key) {
      return keys[key] || (keys[key] = uid(key));
    };

    var IE_PROTO = sharedKey('IE_PROTO');

    var PROTOTYPE = 'prototype';
    var Empty = function () { /* empty */ };

    // Create object with fake `null` prototype: use iframe Object with cleared prototype
    var createDict = function () {
      // Thrash, waste and sodomy: IE GC bug
      var iframe = documentCreateElement('iframe');
      var length = enumBugKeys.length;
      var lt = '<';
      var script = 'script';
      var gt = '>';
      var js = 'java' + script + ':';
      var iframeDocument;
      iframe.style.display = 'none';
      html.appendChild(iframe);
      iframe.src = String(js);
      iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
      iframeDocument.close();
      createDict = iframeDocument.F;
      while (length--) { delete createDict[PROTOTYPE][enumBugKeys[length]]; }
      return createDict();
    };

    // `Object.create` method
    // https://tc39.github.io/ecma262/#sec-object.create
    var objectCreate = Object.create || function create(O, Properties) {
      var result;
      if (O !== null) {
        Empty[PROTOTYPE] = anObject(O);
        result = new Empty();
        Empty[PROTOTYPE] = null;
        // add "__proto__" for Object.getPrototypeOf polyfill
        result[IE_PROTO] = O;
      } else { result = createDict(); }
      return Properties === undefined ? result : objectDefineProperties(result, Properties);
    };

    hiddenKeys[IE_PROTO] = true;

    var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

    // `Object.getOwnPropertyNames` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
    var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return objectKeysInternal(O, hiddenKeys$1);
    };

    var objectGetOwnPropertyNames = {
    	f: f$3
    };

    var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

    var toString$1 = {}.toString;

    var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
      ? Object.getOwnPropertyNames(window) : [];

    var getWindowNames = function (it) {
      try {
        return nativeGetOwnPropertyNames(it);
      } catch (error) {
        return windowNames.slice();
      }
    };

    // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
    var f$4 = function getOwnPropertyNames(it) {
      return windowNames && toString$1.call(it) == '[object Window]'
        ? getWindowNames(it)
        : nativeGetOwnPropertyNames(toIndexedObject(it));
    };

    var objectGetOwnPropertyNamesExternal = {
    	f: f$4
    };

    var f$5 = Object.getOwnPropertySymbols;

    var objectGetOwnPropertySymbols = {
    	f: f$5
    };

    var redefine = function (target, key, value, options) {
      if (options && options.enumerable) { target[key] = value; }
      else { hide(target, key, value); }
    };

    var Symbol$1 = global_1.Symbol;
    var store = shared('wks');

    var wellKnownSymbol = function (name) {
      return store[name] || (store[name] = nativeSymbol && Symbol$1[name]
        || (nativeSymbol ? Symbol$1 : uid)('Symbol.' + name));
    };

    var f$6 = wellKnownSymbol;

    var wrappedWellKnownSymbol = {
    	f: f$6
    };

    var defineProperty = objectDefineProperty.f;

    var defineWellKnownSymbol = function (NAME) {
      var Symbol = path.Symbol || (path.Symbol = {});
      if (!has(Symbol, NAME)) { defineProperty(Symbol, NAME, {
        value: wrappedWellKnownSymbol.f(NAME)
      }); }
    };

    var TO_STRING_TAG = wellKnownSymbol('toStringTag');
    // ES3 wrong here
    var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

    // fallback for IE11 Script Access Denied error
    var tryGet = function (it, key) {
      try {
        return it[key];
      } catch (error) { /* empty */ }
    };

    // getting tag from ES6+ `Object.prototype.toString`
    var classof = function (it) {
      var O, tag, result;
      return it === undefined ? 'Undefined' : it === null ? 'Null'
        // @@toStringTag case
        : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
        // builtinTag case
        : CORRECT_ARGUMENTS ? classofRaw(O)
        // ES3 arguments fallback
        : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
    };

    var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
    var test = {};

    test[TO_STRING_TAG$1] = 'z';

    // `Object.prototype.toString` method implementation
    // https://tc39.github.io/ecma262/#sec-object.prototype.tostring
    var objectToString = String(test) !== '[object z]' ? function toString() {
      return '[object ' + classof(this) + ']';
    } : test.toString;

    var defineProperty$1 = objectDefineProperty.f;





    var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
    var METHOD_REQUIRED = objectToString !== ({}).toString;

    var setToStringTag = function (it, TAG, STATIC, SET_METHOD) {
      if (it) {
        var target = STATIC ? it : it.prototype;
        if (!has(target, TO_STRING_TAG$2)) {
          defineProperty$1(target, TO_STRING_TAG$2, { configurable: true, value: TAG });
        }
        if (SET_METHOD && METHOD_REQUIRED) { hide(target, 'toString', objectToString); }
      }
    };

    var functionToString = shared('native-function-to-string', Function.toString);

    var WeakMap = global_1.WeakMap;

    var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(functionToString.call(WeakMap));

    var WeakMap$1 = global_1.WeakMap;
    var set, get, has$1;

    var enforce = function (it) {
      return has$1(it) ? get(it) : set(it, {});
    };

    var getterFor = function (TYPE) {
      return function (it) {
        var state;
        if (!isObject(it) || (state = get(it)).type !== TYPE) {
          throw TypeError('Incompatible receiver, ' + TYPE + ' required');
        } return state;
      };
    };

    if (nativeWeakMap) {
      var store$1 = new WeakMap$1();
      var wmget = store$1.get;
      var wmhas = store$1.has;
      var wmset = store$1.set;
      set = function (it, metadata) {
        wmset.call(store$1, it, metadata);
        return metadata;
      };
      get = function (it) {
        return wmget.call(store$1, it) || {};
      };
      has$1 = function (it) {
        return wmhas.call(store$1, it);
      };
    } else {
      var STATE = sharedKey('state');
      hiddenKeys[STATE] = true;
      set = function (it, metadata) {
        hide(it, STATE, metadata);
        return metadata;
      };
      get = function (it) {
        return has(it, STATE) ? it[STATE] : {};
      };
      has$1 = function (it) {
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

    var SPECIES = wellKnownSymbol('species');

    // `ArraySpeciesCreate` abstract operation
    // https://tc39.github.io/ecma262/#sec-arrayspeciescreate
    var arraySpeciesCreate = function (originalArray, length) {
      var C;
      if (isArray(originalArray)) {
        C = originalArray.constructor;
        // cross-realm fallback
        if (typeof C == 'function' && (C === Array || isArray(C.prototype))) { C = undefined; }
        else if (isObject(C)) {
          C = C[SPECIES];
          if (C === null) { C = undefined; }
        }
      } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
    };

    var push = [].push;

    // `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
    var createMethod$1 = function (TYPE) {
      var IS_MAP = TYPE == 1;
      var IS_FILTER = TYPE == 2;
      var IS_SOME = TYPE == 3;
      var IS_EVERY = TYPE == 4;
      var IS_FIND_INDEX = TYPE == 6;
      var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
      return function ($this, callbackfn, that, specificCreate) {
        var O = toObject($this);
        var self = indexedObject(O);
        var boundFunction = bindContext(callbackfn, that, 3);
        var length = toLength(self.length);
        var index = 0;
        var create = specificCreate || arraySpeciesCreate;
        var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
        var value, result;
        for (;length > index; index++) { if (NO_HOLES || index in self) {
          value = self[index];
          result = boundFunction(value, index, O);
          if (TYPE) {
            if (IS_MAP) { target[index] = result; } // map
            else if (result) { switch (TYPE) {
              case 3: return true;              // some
              case 5: return value;             // find
              case 6: return index;             // findIndex
              case 2: push.call(target, value); // filter
            } } else if (IS_EVERY) { return false; }  // every
          }
        } }
        return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
      };
    };

    var arrayIteration = {
      // `Array.prototype.forEach` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
      forEach: createMethod$1(0),
      // `Array.prototype.map` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.map
      map: createMethod$1(1),
      // `Array.prototype.filter` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.filter
      filter: createMethod$1(2),
      // `Array.prototype.some` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.some
      some: createMethod$1(3),
      // `Array.prototype.every` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.every
      every: createMethod$1(4),
      // `Array.prototype.find` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.find
      find: createMethod$1(5),
      // `Array.prototype.findIndex` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
      findIndex: createMethod$1(6)
    };

    var $forEach = arrayIteration.forEach;

    var HIDDEN = sharedKey('hidden');
    var SYMBOL = 'Symbol';
    var PROTOTYPE$1 = 'prototype';
    var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
    var setInternalState = internalState.set;
    var getInternalState = internalState.getterFor(SYMBOL);
    var ObjectPrototype = Object[PROTOTYPE$1];
    var $Symbol = global_1.Symbol;
    var JSON$1 = global_1.JSON;
    var nativeJSONStringify = JSON$1 && JSON$1.stringify;
    var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
    var nativeDefineProperty$1 = objectDefineProperty.f;
    var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
    var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
    var AllSymbols = shared('symbols');
    var ObjectPrototypeSymbols = shared('op-symbols');
    var StringToSymbolRegistry = shared('string-to-symbol-registry');
    var SymbolToStringRegistry = shared('symbol-to-string-registry');
    var WellKnownSymbolsStore = shared('wks');
    var QObject = global_1.QObject;
    // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
    var USE_SETTER = !QObject || !QObject[PROTOTYPE$1] || !QObject[PROTOTYPE$1].findChild;

    // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
    var setSymbolDescriptor = descriptors && fails(function () {
      return objectCreate(nativeDefineProperty$1({}, 'a', {
        get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
      })).a != 7;
    }) ? function (O, P, Attributes) {
      var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype, P);
      if (ObjectPrototypeDescriptor) { delete ObjectPrototype[P]; }
      nativeDefineProperty$1(O, P, Attributes);
      if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
        nativeDefineProperty$1(ObjectPrototype, P, ObjectPrototypeDescriptor);
      }
    } : nativeDefineProperty$1;

    var wrap = function (tag, description) {
      var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$1]);
      setInternalState(symbol, {
        type: SYMBOL,
        tag: tag,
        description: description
      });
      if (!descriptors) { symbol.description = description; }
      return symbol;
    };

    var isSymbol = nativeSymbol && typeof $Symbol.iterator == 'symbol' ? function (it) {
      return typeof it == 'symbol';
    } : function (it) {
      return Object(it) instanceof $Symbol;
    };

    var $defineProperty = function defineProperty(O, P, Attributes) {
      if (O === ObjectPrototype) { $defineProperty(ObjectPrototypeSymbols, P, Attributes); }
      anObject(O);
      var key = toPrimitive(P, true);
      anObject(Attributes);
      if (has(AllSymbols, key)) {
        if (!Attributes.enumerable) {
          if (!has(O, HIDDEN)) { nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {})); }
          O[HIDDEN][key] = true;
        } else {
          if (has(O, HIDDEN) && O[HIDDEN][key]) { O[HIDDEN][key] = false; }
          Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
        } return setSymbolDescriptor(O, key, Attributes);
      } return nativeDefineProperty$1(O, key, Attributes);
    };

    var $defineProperties = function defineProperties(O, Properties) {
      anObject(O);
      var properties = toIndexedObject(Properties);
      var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
      $forEach(keys, function (key) {
        if (!descriptors || $propertyIsEnumerable.call(properties, key)) { $defineProperty(O, key, properties[key]); }
      });
      return O;
    };

    var $create = function create(O, Properties) {
      return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
    };

    var $propertyIsEnumerable = function propertyIsEnumerable(V) {
      var P = toPrimitive(V, true);
      var enumerable = nativePropertyIsEnumerable$1.call(this, P);
      if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) { return false; }
      return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
    };

    var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
      var it = toIndexedObject(O);
      var key = toPrimitive(P, true);
      if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) { return; }
      var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
      if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
        descriptor.enumerable = true;
      }
      return descriptor;
    };

    var $getOwnPropertyNames = function getOwnPropertyNames(O) {
      var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
      var result = [];
      $forEach(names, function (key) {
        if (!has(AllSymbols, key) && !has(hiddenKeys, key)) { result.push(key); }
      });
      return result;
    };

    var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
      var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
      var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
      var result = [];
      $forEach(names, function (key) {
        if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
          result.push(AllSymbols[key]);
        }
      });
      return result;
    };

    // `Symbol` constructor
    // https://tc39.github.io/ecma262/#sec-symbol-constructor
    if (!nativeSymbol) {
      $Symbol = function Symbol() {
        if (this instanceof $Symbol) { throw TypeError('Symbol is not a constructor'); }
        var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
        var tag = uid(description);
        var setter = function (value) {
          if (this === ObjectPrototype) { setter.call(ObjectPrototypeSymbols, value); }
          if (has(this, HIDDEN) && has(this[HIDDEN], tag)) { this[HIDDEN][tag] = false; }
          setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
        };
        if (descriptors && USE_SETTER) { setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter }); }
        return wrap(tag, description);
      };

      redefine($Symbol[PROTOTYPE$1], 'toString', function toString() {
        return getInternalState(this).tag;
      });

      objectPropertyIsEnumerable.f = $propertyIsEnumerable;
      objectDefineProperty.f = $defineProperty;
      objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
      objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
      objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

      if (descriptors) {
        // https://github.com/tc39/proposal-Symbol-description
        nativeDefineProperty$1($Symbol[PROTOTYPE$1], 'description', {
          configurable: true,
          get: function description() {
            return getInternalState(this).description;
          }
        });
      }

      wrappedWellKnownSymbol.f = function (name) {
        return wrap(wellKnownSymbol(name), name);
      };
    }

    _export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
      Symbol: $Symbol
    });

    $forEach(objectKeys(WellKnownSymbolsStore), function (name) {
      defineWellKnownSymbol(name);
    });

    _export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
      // `Symbol.for` method
      // https://tc39.github.io/ecma262/#sec-symbol.for
      'for': function (key) {
        var string = String(key);
        if (has(StringToSymbolRegistry, string)) { return StringToSymbolRegistry[string]; }
        var symbol = $Symbol(string);
        StringToSymbolRegistry[string] = symbol;
        SymbolToStringRegistry[symbol] = string;
        return symbol;
      },
      // `Symbol.keyFor` method
      // https://tc39.github.io/ecma262/#sec-symbol.keyfor
      keyFor: function keyFor(sym) {
        if (!isSymbol(sym)) { throw TypeError(sym + ' is not a symbol'); }
        if (has(SymbolToStringRegistry, sym)) { return SymbolToStringRegistry[sym]; }
      },
      useSetter: function () { USE_SETTER = true; },
      useSimple: function () { USE_SETTER = false; }
    });

    _export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
      // `Object.create` method
      // https://tc39.github.io/ecma262/#sec-object.create
      create: $create,
      // `Object.defineProperty` method
      // https://tc39.github.io/ecma262/#sec-object.defineproperty
      defineProperty: $defineProperty,
      // `Object.defineProperties` method
      // https://tc39.github.io/ecma262/#sec-object.defineproperties
      defineProperties: $defineProperties,
      // `Object.getOwnPropertyDescriptor` method
      // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
      getOwnPropertyDescriptor: $getOwnPropertyDescriptor
    });

    _export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
      // `Object.getOwnPropertyNames` method
      // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
      getOwnPropertyNames: $getOwnPropertyNames,
      // `Object.getOwnPropertySymbols` method
      // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
      getOwnPropertySymbols: $getOwnPropertySymbols
    });

    // Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
    // https://bugs.chromium.org/p/v8/issues/detail?id=3443
    _export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
      getOwnPropertySymbols: function getOwnPropertySymbols(it) {
        return objectGetOwnPropertySymbols.f(toObject(it));
      }
    });

    // `JSON.stringify` method behavior with symbols
    // https://tc39.github.io/ecma262/#sec-json.stringify
    JSON$1 && _export({ target: 'JSON', stat: true, forced: !nativeSymbol || fails(function () {
      var symbol = $Symbol();
      // MS Edge converts symbol values to JSON as {}
      return nativeJSONStringify([symbol]) != '[null]'
        // WebKit converts symbol values to JSON as null
        || nativeJSONStringify({ a: symbol }) != '{}'
        // V8 throws on boxed symbols
        || nativeJSONStringify(Object(symbol)) != '{}';
    }) }, {
      stringify: function stringify(it) {
        var arguments$1 = arguments;

        var args = [it];
        var index = 1;
        var replacer, $replacer;
        while (arguments.length > index) { args.push(arguments$1[index++]); }
        $replacer = replacer = args[1];
        if (!isObject(replacer) && it === undefined || isSymbol(it)) { return; } // IE8 returns string on undefined
        if (!isArray(replacer)) { replacer = function (key, value) {
          if (typeof $replacer == 'function') { value = $replacer.call(this, key, value); }
          if (!isSymbol(value)) { return value; }
        }; }
        args[1] = replacer;
        return nativeJSONStringify.apply(JSON$1, args);
      }
    });

    // `Symbol.prototype[@@toPrimitive]` method
    // https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
    if (!$Symbol[PROTOTYPE$1][TO_PRIMITIVE]) { hide($Symbol[PROTOTYPE$1], TO_PRIMITIVE, $Symbol[PROTOTYPE$1].valueOf); }
    // `Symbol.prototype[@@toStringTag]` property
    // https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
    setToStringTag($Symbol, SYMBOL);

    hiddenKeys[HIDDEN] = true;

    // `Symbol.asyncIterator` well-known symbol
    // https://tc39.github.io/ecma262/#sec-symbol.asynciterator
    defineWellKnownSymbol('asyncIterator');

    // `Symbol.hasInstance` well-known symbol
    // https://tc39.github.io/ecma262/#sec-symbol.hasinstance
    defineWellKnownSymbol('hasInstance');

    // `Symbol.isConcatSpreadable` well-known symbol
    // https://tc39.github.io/ecma262/#sec-symbol.isconcatspreadable
    defineWellKnownSymbol('isConcatSpreadable');

    // `Symbol.iterator` well-known symbol
    // https://tc39.github.io/ecma262/#sec-symbol.iterator
    defineWellKnownSymbol('iterator');

    // `Symbol.match` well-known symbol
    // https://tc39.github.io/ecma262/#sec-symbol.match
    defineWellKnownSymbol('match');

    // `Symbol.matchAll` well-known symbol
    defineWellKnownSymbol('matchAll');

    // `Symbol.replace` well-known symbol
    // https://tc39.github.io/ecma262/#sec-symbol.replace
    defineWellKnownSymbol('replace');

    // `Symbol.search` well-known symbol
    // https://tc39.github.io/ecma262/#sec-symbol.search
    defineWellKnownSymbol('search');

    // `Symbol.species` well-known symbol
    // https://tc39.github.io/ecma262/#sec-symbol.species
    defineWellKnownSymbol('species');

    // `Symbol.split` well-known symbol
    // https://tc39.github.io/ecma262/#sec-symbol.split
    defineWellKnownSymbol('split');

    // `Symbol.toPrimitive` well-known symbol
    // https://tc39.github.io/ecma262/#sec-symbol.toprimitive
    defineWellKnownSymbol('toPrimitive');

    // `Symbol.toStringTag` well-known symbol
    // https://tc39.github.io/ecma262/#sec-symbol.tostringtag
    defineWellKnownSymbol('toStringTag');

    // `Symbol.unscopables` well-known symbol
    // https://tc39.github.io/ecma262/#sec-symbol.unscopables
    defineWellKnownSymbol('unscopables');

    var nativeAssign = Object.assign;

    // `Object.assign` method
    // https://tc39.github.io/ecma262/#sec-object.assign
    // should work with symbols and should have deterministic property order (V8 bug)
    var objectAssign = !nativeAssign || fails(function () {
      var A = {};
      var B = {};
      // eslint-disable-next-line no-undef
      var symbol = Symbol();
      var alphabet = 'abcdefghijklmnopqrst';
      A[symbol] = 7;
      alphabet.split('').forEach(function (chr) { B[chr] = chr; });
      return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
    }) ? function assign(target, source) {
      var arguments$1 = arguments;
     // eslint-disable-line no-unused-vars
      var T = toObject(target);
      var argumentsLength = arguments.length;
      var index = 1;
      var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
      var propertyIsEnumerable = objectPropertyIsEnumerable.f;
      while (argumentsLength > index) {
        var S = indexedObject(arguments$1[index++]);
        var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
        var length = keys.length;
        var j = 0;
        var key;
        while (length > j) {
          key = keys[j++];
          if (!descriptors || propertyIsEnumerable.call(S, key)) { T[key] = S[key]; }
        }
      } return T;
    } : nativeAssign;

    // `Object.assign` method
    // https://tc39.github.io/ecma262/#sec-object.assign
    _export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
      assign: objectAssign
    });

    // `Object.create` method
    // https://tc39.github.io/ecma262/#sec-object.create
    _export({ target: 'Object', stat: true, sham: !descriptors }, {
      create: objectCreate
    });

    // `Object.defineProperty` method
    // https://tc39.github.io/ecma262/#sec-object.defineproperty
    _export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
      defineProperty: objectDefineProperty.f
    });

    // `Object.defineProperties` method
    // https://tc39.github.io/ecma262/#sec-object.defineproperties
    _export({ target: 'Object', stat: true, forced: !descriptors, sham: !descriptors }, {
      defineProperties: objectDefineProperties
    });

    var propertyIsEnumerable = objectPropertyIsEnumerable.f;

    // `Object.{ entries, values }` methods implementation
    var createMethod$2 = function (TO_ENTRIES) {
      return function (it) {
        var O = toIndexedObject(it);
        var keys = objectKeys(O);
        var length = keys.length;
        var i = 0;
        var result = [];
        var key;
        while (length > i) {
          key = keys[i++];
          if (!descriptors || propertyIsEnumerable.call(O, key)) {
            result.push(TO_ENTRIES ? [key, O[key]] : O[key]);
          }
        }
        return result;
      };
    };

    var objectToArray = {
      // `Object.entries` method
      // https://tc39.github.io/ecma262/#sec-object.entries
      entries: createMethod$2(true),
      // `Object.values` method
      // https://tc39.github.io/ecma262/#sec-object.values
      values: createMethod$2(false)
    };

    var $entries = objectToArray.entries;

    // `Object.entries` method
    // https://tc39.github.io/ecma262/#sec-object.entries
    _export({ target: 'Object', stat: true }, {
      entries: function entries(O) {
        return $entries(O);
      }
    });

    var freezing = !fails(function () {
      return Object.isExtensible(Object.preventExtensions({}));
    });

    var internalMetadata = createCommonjsModule(function (module) {
    var defineProperty = objectDefineProperty.f;



    var METADATA = uid('meta');
    var id = 0;

    var isExtensible = Object.isExtensible || function () {
      return true;
    };

    var setMetadata = function (it) {
      defineProperty(it, METADATA, { value: {
        objectID: 'O' + ++id, // object ID
        weakData: {}          // weak collections IDs
      } });
    };

    var fastKey = function (it, create) {
      // return a primitive with prefix
      if (!isObject(it)) { return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it; }
      if (!has(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) { return 'F'; }
        // not necessary to add metadata
        if (!create) { return 'E'; }
        // add missing metadata
        setMetadata(it);
      // return object ID
      } return it[METADATA].objectID;
    };

    var getWeakData = function (it, create) {
      if (!has(it, METADATA)) {
        // can't set metadata to uncaught frozen object
        if (!isExtensible(it)) { return true; }
        // not necessary to add metadata
        if (!create) { return false; }
        // add missing metadata
        setMetadata(it);
      // return the store of weak collections IDs
      } return it[METADATA].weakData;
    };

    // add metadata on freeze-family methods calling
    var onFreeze = function (it) {
      if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) { setMetadata(it); }
      return it;
    };

    var meta = module.exports = {
      REQUIRED: false,
      fastKey: fastKey,
      getWeakData: getWeakData,
      onFreeze: onFreeze
    };

    hiddenKeys[METADATA] = true;
    });
    var internalMetadata_1 = internalMetadata.REQUIRED;
    var internalMetadata_2 = internalMetadata.fastKey;
    var internalMetadata_3 = internalMetadata.getWeakData;
    var internalMetadata_4 = internalMetadata.onFreeze;

    var onFreeze = internalMetadata.onFreeze;

    var nativeFreeze = Object.freeze;
    var FAILS_ON_PRIMITIVES = fails(function () { nativeFreeze(1); });

    // `Object.freeze` method
    // https://tc39.github.io/ecma262/#sec-object.freeze
    _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !freezing }, {
      freeze: function freeze(it) {
        return nativeFreeze && isObject(it) ? nativeFreeze(onFreeze(it)) : it;
      }
    });

    var iterators = {};

    var ITERATOR = wellKnownSymbol('iterator');
    var ArrayPrototype = Array.prototype;

    // check on default Array iterator
    var isArrayIteratorMethod = function (it) {
      return it !== undefined && (iterators.Array === it || ArrayPrototype[ITERATOR] === it);
    };

    var ITERATOR$1 = wellKnownSymbol('iterator');

    var getIteratorMethod = function (it) {
      if (it != undefined) { return it[ITERATOR$1]
        || it['@@iterator']
        || iterators[classof(it)]; }
    };

    // call something on iterator step with safe closing on error
    var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
      try {
        return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
      // 7.4.6 IteratorClose(iterator, completion)
      } catch (error) {
        var returnMethod = iterator['return'];
        if (returnMethod !== undefined) { anObject(returnMethod.call(iterator)); }
        throw error;
      }
    };

    var iterate_1 = createCommonjsModule(function (module) {
    var Result = function (stopped, result) {
      this.stopped = stopped;
      this.result = result;
    };

    var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
      var boundFunction = bindContext(fn, that, AS_ENTRIES ? 2 : 1);
      var iterator, iterFn, index, length, result, step;

      if (IS_ITERATOR) {
        iterator = iterable;
      } else {
        iterFn = getIteratorMethod(iterable);
        if (typeof iterFn != 'function') { throw TypeError('Target is not iterable'); }
        // optimisation for array iterators
        if (isArrayIteratorMethod(iterFn)) {
          for (index = 0, length = toLength(iterable.length); length > index; index++) {
            result = AS_ENTRIES
              ? boundFunction(anObject(step = iterable[index])[0], step[1])
              : boundFunction(iterable[index]);
            if (result && result instanceof Result) { return result; }
          } return new Result(false);
        }
        iterator = iterFn.call(iterable);
      }

      while (!(step = iterator.next()).done) {
        result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
        if (result && result instanceof Result) { return result; }
      } return new Result(false);
    };

    iterate.stop = function (result) {
      return new Result(true, result);
    };
    });

    var createProperty = function (object, key, value) {
      var propertyKey = toPrimitive(key);
      if (propertyKey in object) { objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value)); }
      else { object[propertyKey] = value; }
    };

    // `Object.fromEntries` method
    // https://github.com/tc39/proposal-object-from-entries
    _export({ target: 'Object', stat: true }, {
      fromEntries: function fromEntries(iterable) {
        var obj = {};
        iterate_1(iterable, function (k, v) {
          createProperty(obj, k, v);
        }, undefined, true);
        return obj;
      }
    });

    var nativeGetOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;


    var FAILS_ON_PRIMITIVES$1 = fails(function () { nativeGetOwnPropertyDescriptor$2(1); });
    var FORCED = !descriptors || FAILS_ON_PRIMITIVES$1;

    // `Object.getOwnPropertyDescriptor` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
    _export({ target: 'Object', stat: true, forced: FORCED, sham: !descriptors }, {
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
        return nativeGetOwnPropertyDescriptor$2(toIndexedObject(it), key);
      }
    });

    // all object keys, includes non-enumerable and symbols
    var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
      var keys = objectGetOwnPropertyNames.f(anObject(it));
      var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
      return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
    };

    // `Object.getOwnPropertyDescriptors` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
    _export({ target: 'Object', stat: true, sham: !descriptors }, {
      getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
        var O = toIndexedObject(object);
        var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
        var keys = ownKeys(O);
        var result = {};
        var index = 0;
        var key, descriptor;
        while (keys.length > index) {
          descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
          if (descriptor !== undefined) { createProperty(result, key, descriptor); }
        }
        return result;
      }
    });

    var nativeGetOwnPropertyNames$2 = objectGetOwnPropertyNamesExternal.f;

    var FAILS_ON_PRIMITIVES$2 = fails(function () { return !Object.getOwnPropertyNames(1); });

    // `Object.getOwnPropertyNames` method
    // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
    _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$2 }, {
      getOwnPropertyNames: nativeGetOwnPropertyNames$2
    });

    var correctPrototypeGetter = !fails(function () {
      function F() { /* empty */ }
      F.prototype.constructor = null;
      return Object.getPrototypeOf(new F()) !== F.prototype;
    });

    var IE_PROTO$1 = sharedKey('IE_PROTO');
    var ObjectPrototype$1 = Object.prototype;

    // `Object.getPrototypeOf` method
    // https://tc39.github.io/ecma262/#sec-object.getprototypeof
    var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
      O = toObject(O);
      if (has(O, IE_PROTO$1)) { return O[IE_PROTO$1]; }
      if (typeof O.constructor == 'function' && O instanceof O.constructor) {
        return O.constructor.prototype;
      } return O instanceof Object ? ObjectPrototype$1 : null;
    };

    var FAILS_ON_PRIMITIVES$3 = fails(function () { objectGetPrototypeOf(1); });

    // `Object.getPrototypeOf` method
    // https://tc39.github.io/ecma262/#sec-object.getprototypeof
    _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$3, sham: !correctPrototypeGetter }, {
      getPrototypeOf: function getPrototypeOf(it) {
        return objectGetPrototypeOf(toObject(it));
      }
    });

    // `SameValue` abstract operation
    // https://tc39.github.io/ecma262/#sec-samevalue
    var sameValue = Object.is || function is(x, y) {
      // eslint-disable-next-line no-self-compare
      return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
    };

    // `Object.is` method
    // https://tc39.github.io/ecma262/#sec-object.is
    _export({ target: 'Object', stat: true }, {
      is: sameValue
    });

    var nativeIsExtensible = Object.isExtensible;
    var FAILS_ON_PRIMITIVES$4 = fails(function () { nativeIsExtensible(1); });

    // `Object.isExtensible` method
    // https://tc39.github.io/ecma262/#sec-object.isextensible
    _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$4 }, {
      isExtensible: function isExtensible(it) {
        return isObject(it) ? nativeIsExtensible ? nativeIsExtensible(it) : true : false;
      }
    });

    var nativeIsFrozen = Object.isFrozen;
    var FAILS_ON_PRIMITIVES$5 = fails(function () { nativeIsFrozen(1); });

    // `Object.isFrozen` method
    // https://tc39.github.io/ecma262/#sec-object.isfrozen
    _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$5 }, {
      isFrozen: function isFrozen(it) {
        return isObject(it) ? nativeIsFrozen ? nativeIsFrozen(it) : false : true;
      }
    });

    var nativeIsSealed = Object.isSealed;
    var FAILS_ON_PRIMITIVES$6 = fails(function () { nativeIsSealed(1); });

    // `Object.isSealed` method
    // https://tc39.github.io/ecma262/#sec-object.issealed
    _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$6 }, {
      isSealed: function isSealed(it) {
        return isObject(it) ? nativeIsSealed ? nativeIsSealed(it) : false : true;
      }
    });

    var FAILS_ON_PRIMITIVES$7 = fails(function () { objectKeys(1); });

    // `Object.keys` method
    // https://tc39.github.io/ecma262/#sec-object.keys
    _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$7 }, {
      keys: function keys(it) {
        return objectKeys(toObject(it));
      }
    });

    var onFreeze$1 = internalMetadata.onFreeze;



    var nativePreventExtensions = Object.preventExtensions;
    var FAILS_ON_PRIMITIVES$8 = fails(function () { nativePreventExtensions(1); });

    // `Object.preventExtensions` method
    // https://tc39.github.io/ecma262/#sec-object.preventextensions
    _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$8, sham: !freezing }, {
      preventExtensions: function preventExtensions(it) {
        return nativePreventExtensions && isObject(it) ? nativePreventExtensions(onFreeze$1(it)) : it;
      }
    });

    var onFreeze$2 = internalMetadata.onFreeze;



    var nativeSeal = Object.seal;
    var FAILS_ON_PRIMITIVES$9 = fails(function () { nativeSeal(1); });

    // `Object.seal` method
    // https://tc39.github.io/ecma262/#sec-object.seal
    _export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES$9, sham: !freezing }, {
      seal: function seal(it) {
        return nativeSeal && isObject(it) ? nativeSeal(onFreeze$2(it)) : it;
      }
    });

    var aPossiblePrototype = function (it) {
      if (!isObject(it) && it !== null) {
        throw TypeError("Can't set " + String(it) + ' as a prototype');
      } return it;
    };

    // `Object.setPrototypeOf` method
    // https://tc39.github.io/ecma262/#sec-object.setprototypeof
    // Works with __proto__ only. Old v8 can't work with null proto objects.
    /* eslint-disable no-proto */
    var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
      var CORRECT_SETTER = false;
      var test = {};
      var setter;
      try {
        setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
        setter.call(test, []);
        CORRECT_SETTER = test instanceof Array;
      } catch (error) { /* empty */ }
      return function setPrototypeOf(O, proto) {
        anObject(O);
        aPossiblePrototype(proto);
        if (CORRECT_SETTER) { setter.call(O, proto); }
        else { O.__proto__ = proto; }
        return O;
      };
    }() : undefined);

    // `Object.setPrototypeOf` method
    // https://tc39.github.io/ecma262/#sec-object.setprototypeof
    _export({ target: 'Object', stat: true }, {
      setPrototypeOf: objectSetPrototypeOf
    });

    var $values = objectToArray.values;

    // `Object.values` method
    // https://tc39.github.io/ecma262/#sec-object.values
    _export({ target: 'Object', stat: true }, {
      values: function values(O) {
        return $values(O);
      }
    });

    // Forced replacement object prototype accessors methods
    var forcedObjectPrototypeAccessorsMethods = isPure || !fails(function () {
      var key = Math.random();
      // In FF throws only define methods
      // eslint-disable-next-line no-undef, no-useless-call
      __defineSetter__.call(null, key, function () { /* empty */ });
      delete global_1[key];
    });

    // `Object.prototype.__defineGetter__` method
    // https://tc39.github.io/ecma262/#sec-object.prototype.__defineGetter__
    if (descriptors) {
      _export({ target: 'Object', proto: true, forced: forcedObjectPrototypeAccessorsMethods }, {
        __defineGetter__: function __defineGetter__(P, getter) {
          objectDefineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
        }
      });
    }

    // `Object.prototype.__defineSetter__` method
    // https://tc39.github.io/ecma262/#sec-object.prototype.__defineSetter__
    if (descriptors) {
      _export({ target: 'Object', proto: true, forced: forcedObjectPrototypeAccessorsMethods }, {
        __defineSetter__: function __defineSetter__(P, setter) {
          objectDefineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
        }
      });
    }

    var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;

    // `Object.prototype.__lookupGetter__` method
    // https://tc39.github.io/ecma262/#sec-object.prototype.__lookupGetter__
    if (descriptors) {
      _export({ target: 'Object', proto: true, forced: forcedObjectPrototypeAccessorsMethods }, {
        __lookupGetter__: function __lookupGetter__(P) {
          var O = toObject(this);
          var key = toPrimitive(P, true);
          var desc;
          do {
            if (desc = getOwnPropertyDescriptor$2(O, key)) { return desc.get; }
          } while (O = objectGetPrototypeOf(O));
        }
      });
    }

    var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;

    // `Object.prototype.__lookupSetter__` method
    // https://tc39.github.io/ecma262/#sec-object.prototype.__lookupSetter__
    if (descriptors) {
      _export({ target: 'Object', proto: true, forced: forcedObjectPrototypeAccessorsMethods }, {
        __lookupSetter__: function __lookupSetter__(P) {
          var O = toObject(this);
          var key = toPrimitive(P, true);
          var desc;
          do {
            if (desc = getOwnPropertyDescriptor$3(O, key)) { return desc.set; }
          } while (O = objectGetPrototypeOf(O));
        }
      });
    }

    var slice = [].slice;
    var factories = {};

    var construct = function (C, argsLength, args) {
      if (!(argsLength in factories)) {
        for (var list = [], i = 0; i < argsLength; i++) { list[i] = 'a[' + i + ']'; }
        // eslint-disable-next-line no-new-func
        factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
      } return factories[argsLength](C, args);
    };

    // `Function.prototype.bind` method implementation
    // https://tc39.github.io/ecma262/#sec-function.prototype.bind
    var functionBind = Function.bind || function bind(that /* , ...args */) {
      var fn = aFunction(this);
      var partArgs = slice.call(arguments, 1);
      var boundFunction = function bound(/* args... */) {
        var args = partArgs.concat(slice.call(arguments));
        return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
      };
      if (isObject(fn.prototype)) { boundFunction.prototype = fn.prototype; }
      return boundFunction;
    };

    // `Function.prototype.bind` method
    // https://tc39.github.io/ecma262/#sec-function.prototype.bind
    _export({ target: 'Function', proto: true }, {
      bind: functionBind
    });

    var HAS_INSTANCE = wellKnownSymbol('hasInstance');
    var FunctionPrototype = Function.prototype;

    // `Function.prototype[@@hasInstance]` method
    // https://tc39.github.io/ecma262/#sec-function.prototype-@@hasinstance
    if (!(HAS_INSTANCE in FunctionPrototype)) {
      objectDefineProperty.f(FunctionPrototype, HAS_INSTANCE, { value: function (O) {
        if (typeof this != 'function' || !isObject(O)) { return false; }
        if (!isObject(this.prototype)) { return O instanceof this; }
        // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
        while (O = objectGetPrototypeOf(O)) { if (this.prototype === O) { return true; } }
        return false;
      } });
    }

    // `Array.from` method implementation
    // https://tc39.github.io/ecma262/#sec-array.from
    var arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
      var O = toObject(arrayLike);
      var C = typeof this == 'function' ? this : Array;
      var argumentsLength = arguments.length;
      var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
      var mapping = mapfn !== undefined;
      var index = 0;
      var iteratorMethod = getIteratorMethod(O);
      var length, result, step, iterator;
      if (mapping) { mapfn = bindContext(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2); }
      // if the target is not iterable or it's an array with the default iterator - use a simple case
      if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
        iterator = iteratorMethod.call(O);
        result = new C();
        for (;!(step = iterator.next()).done; index++) {
          createProperty(result, index, mapping
            ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true)
            : step.value
          );
        }
      } else {
        length = toLength(O.length);
        result = new C(length);
        for (;length > index; index++) {
          createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
        }
      }
      result.length = index;
      return result;
    };

    var ITERATOR$2 = wellKnownSymbol('iterator');
    var SAFE_CLOSING = false;

    try {
      var called = 0;
      var iteratorWithReturn = {
        next: function () {
          return { done: !!called++ };
        },
        'return': function () {
          SAFE_CLOSING = true;
        }
      };
      iteratorWithReturn[ITERATOR$2] = function () {
        return this;
      };
      // eslint-disable-next-line no-throw-literal
      Array.from(iteratorWithReturn, function () { throw 2; });
    } catch (error) { /* empty */ }

    var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
      if (!SKIP_CLOSING && !SAFE_CLOSING) { return false; }
      var ITERATION_SUPPORT = false;
      try {
        var object = {};
        object[ITERATOR$2] = function () {
          return {
            next: function () {
              return { done: ITERATION_SUPPORT = true };
            }
          };
        };
        exec(object);
      } catch (error) { /* empty */ }
      return ITERATION_SUPPORT;
    };

    var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
      Array.from(iterable);
    });

    // `Array.from` method
    // https://tc39.github.io/ecma262/#sec-array.from
    _export({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
      from: arrayFrom
    });

    // `Array.isArray` method
    // https://tc39.github.io/ecma262/#sec-array.isarray
    _export({ target: 'Array', stat: true }, {
      isArray: isArray
    });

    var ISNT_GENERIC = fails(function () {
      function F() { /* empty */ }
      return !(Array.of.call(F) instanceof F);
    });

    // `Array.of` method
    // https://tc39.github.io/ecma262/#sec-array.of
    // WebKit Array.of isn't generic
    _export({ target: 'Array', stat: true, forced: ISNT_GENERIC }, {
      of: function of(/* ...args */) {
        var arguments$1 = arguments;

        var index = 0;
        var argumentsLength = arguments.length;
        var result = new (typeof this == 'function' ? this : Array)(argumentsLength);
        while (argumentsLength > index) { createProperty(result, index, arguments$1[index++]); }
        result.length = argumentsLength;
        return result;
      }
    });

    var SPECIES$1 = wellKnownSymbol('species');

    var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
      return !fails(function () {
        var array = [];
        var constructor = array.constructor = {};
        constructor[SPECIES$1] = function () {
          return { foo: 1 };
        };
        return array[METHOD_NAME](Boolean).foo !== 1;
      });
    };

    var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
    var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
    var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

    var IS_CONCAT_SPREADABLE_SUPPORT = !fails(function () {
      var array = [];
      array[IS_CONCAT_SPREADABLE] = false;
      return array.concat()[0] !== array;
    });

    var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

    var isConcatSpreadable = function (O) {
      if (!isObject(O)) { return false; }
      var spreadable = O[IS_CONCAT_SPREADABLE];
      return spreadable !== undefined ? !!spreadable : isArray(O);
    };

    var FORCED$1 = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

    // `Array.prototype.concat` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.concat
    // with adding support of @@isConcatSpreadable and @@species
    _export({ target: 'Array', proto: true, forced: FORCED$1 }, {
      concat: function concat(arg) {
        var arguments$1 = arguments;
     // eslint-disable-line no-unused-vars
        var O = toObject(this);
        var A = arraySpeciesCreate(O, 0);
        var n = 0;
        var i, k, length, len, E;
        for (i = -1, length = arguments.length; i < length; i++) {
          E = i === -1 ? O : arguments$1[i];
          if (isConcatSpreadable(E)) {
            len = toLength(E.length);
            if (n + len > MAX_SAFE_INTEGER) { throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED); }
            for (k = 0; k < len; k++, n++) { if (k in E) { createProperty(A, n, E[k]); } }
          } else {
            if (n >= MAX_SAFE_INTEGER) { throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED); }
            createProperty(A, n++, E);
          }
        }
        A.length = n;
        return A;
      }
    });

    var min$2 = Math.min;

    // `Array.prototype.copyWithin` method implementation
    // https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
    var arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
      var O = toObject(this);
      var len = toLength(O.length);
      var to = toAbsoluteIndex(target, len);
      var from = toAbsoluteIndex(start, len);
      var end = arguments.length > 2 ? arguments[2] : undefined;
      var count = min$2((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
      var inc = 1;
      if (from < to && to < from + count) {
        inc = -1;
        from += count - 1;
        to += count - 1;
      }
      while (count-- > 0) {
        if (from in O) { O[to] = O[from]; }
        else { delete O[to]; }
        to += inc;
        from += inc;
      } return O;
    };

    // `Array.prototype.copyWithin` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
    _export({ target: 'Array', proto: true }, {
      copyWithin: arrayCopyWithin
    });

    var sloppyArrayMethod = function (METHOD_NAME, argument) {
      var method = [][METHOD_NAME];
      return !method || !fails(function () {
        // eslint-disable-next-line no-useless-call,no-throw-literal
        method.call(null, argument || function () { throw 1; }, 1);
      });
    };

    var $every = arrayIteration.every;


    // `Array.prototype.every` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.every
    _export({ target: 'Array', proto: true, forced: sloppyArrayMethod('every') }, {
      every: function every(callbackfn /* , thisArg */) {
        return $every(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    // `Array.prototype.fill` method implementation
    // https://tc39.github.io/ecma262/#sec-array.prototype.fill
    var arrayFill = function fill(value /* , start = 0, end = @length */) {
      var O = toObject(this);
      var length = toLength(O.length);
      var argumentsLength = arguments.length;
      var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
      var end = argumentsLength > 2 ? arguments[2] : undefined;
      var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
      while (endPos > index) { O[index++] = value; }
      return O;
    };

    // `Array.prototype.fill` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.fill
    _export({ target: 'Array', proto: true }, {
      fill: arrayFill
    });

    var $filter = arrayIteration.filter;


    // `Array.prototype.filter` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.filter
    // with adding support of @@species
    _export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('filter') }, {
      filter: function filter(callbackfn /* , thisArg */) {
        return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var $find = arrayIteration.find;


    var FIND = 'find';
    var SKIPS_HOLES = true;

    // Shouldn't skip holes
    if (FIND in []) { Array(1)[FIND](function () { SKIPS_HOLES = false; }); }

    // `Array.prototype.find` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.find
    _export({ target: 'Array', proto: true, forced: SKIPS_HOLES }, {
      find: function find(callbackfn /* , that = undefined */) {
        return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var $findIndex = arrayIteration.findIndex;


    var FIND_INDEX = 'findIndex';
    var SKIPS_HOLES$1 = true;

    // Shouldn't skip holes
    if (FIND_INDEX in []) { Array(1)[FIND_INDEX](function () { SKIPS_HOLES$1 = false; }); }

    // `Array.prototype.findIndex` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.findindex
    _export({ target: 'Array', proto: true, forced: SKIPS_HOLES$1 }, {
      findIndex: function findIndex(callbackfn /* , that = undefined */) {
        return $findIndex(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    // `FlattenIntoArray` abstract operation
    // https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
    var flattenIntoArray = function (target, original, source, sourceLen, start, depth, mapper, thisArg) {
      var targetIndex = start;
      var sourceIndex = 0;
      var mapFn = mapper ? bindContext(mapper, thisArg, 3) : false;
      var element;

      while (sourceIndex < sourceLen) {
        if (sourceIndex in source) {
          element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

          if (depth > 0 && isArray(element)) {
            targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
          } else {
            if (targetIndex >= 0x1FFFFFFFFFFFFF) { throw TypeError('Exceed the acceptable array length'); }
            target[targetIndex] = element;
          }

          targetIndex++;
        }
        sourceIndex++;
      }
      return targetIndex;
    };

    var flattenIntoArray_1 = flattenIntoArray;

    // `Array.prototype.flat` method
    // https://github.com/tc39/proposal-flatMap
    _export({ target: 'Array', proto: true }, {
      flat: function flat(/* depthArg = 1 */) {
        var depthArg = arguments.length ? arguments[0] : undefined;
        var O = toObject(this);
        var sourceLen = toLength(O.length);
        var A = arraySpeciesCreate(O, 0);
        A.length = flattenIntoArray_1(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
        return A;
      }
    });

    // `Array.prototype.flatMap` method
    // https://github.com/tc39/proposal-flatMap
    _export({ target: 'Array', proto: true }, {
      flatMap: function flatMap(callbackfn /* , thisArg */) {
        var O = toObject(this);
        var sourceLen = toLength(O.length);
        var A;
        aFunction(callbackfn);
        A = arraySpeciesCreate(O, 0);
        A.length = flattenIntoArray_1(A, O, O, sourceLen, 0, 1, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
        return A;
      }
    });

    var $forEach$1 = arrayIteration.forEach;


    // `Array.prototype.forEach` method implementation
    // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
    var arrayForEach = sloppyArrayMethod('forEach') ? function forEach(callbackfn /* , thisArg */) {
      return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    } : [].forEach;

    // `Array.prototype.forEach` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
    _export({ target: 'Array', proto: true, forced: [].forEach != arrayForEach }, {
      forEach: arrayForEach
    });

    var $includes = arrayIncludes.includes;


    // `Array.prototype.includes` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    _export({ target: 'Array', proto: true }, {
      includes: function includes(el /* , fromIndex = 0 */) {
        return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var $indexOf = arrayIncludes.indexOf;


    var nativeIndexOf = [].indexOf;

    var NEGATIVE_ZERO = !!nativeIndexOf && 1 / [1].indexOf(1, -0) < 0;
    var SLOPPY_METHOD = sloppyArrayMethod('indexOf');

    // `Array.prototype.indexOf` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
    _export({ target: 'Array', proto: true, forced: NEGATIVE_ZERO || SLOPPY_METHOD }, {
      indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
        return NEGATIVE_ZERO
          // convert -0 to +0
          ? nativeIndexOf.apply(this, arguments) || 0
          : $indexOf(this, searchElement, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var nativeJoin = [].join;

    var ES3_STRINGS = indexedObject != Object;
    var SLOPPY_METHOD$1 = sloppyArrayMethod('join', ',');

    // `Array.prototype.join` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.join
    _export({ target: 'Array', proto: true, forced: ES3_STRINGS || SLOPPY_METHOD$1 }, {
      join: function join(separator) {
        return nativeJoin.call(toIndexedObject(this), separator === undefined ? ',' : separator);
      }
    });

    var min$3 = Math.min;
    var nativeLastIndexOf = [].lastIndexOf;
    var NEGATIVE_ZERO$1 = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
    var SLOPPY_METHOD$2 = sloppyArrayMethod('lastIndexOf');

    // `Array.prototype.lastIndexOf` method implementation
    // https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
    var arrayLastIndexOf = (NEGATIVE_ZERO$1 || SLOPPY_METHOD$2) ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
      // convert -0 to +0
      if (NEGATIVE_ZERO$1) { return nativeLastIndexOf.apply(this, arguments) || 0; }
      var O = toIndexedObject(this);
      var length = toLength(O.length);
      var index = length - 1;
      if (arguments.length > 1) { index = min$3(index, toInteger(arguments[1])); }
      if (index < 0) { index = length + index; }
      for (;index >= 0; index--) { if (index in O && O[index] === searchElement) { return index || 0; } }
      return -1;
    } : nativeLastIndexOf;

    // `Array.prototype.lastIndexOf` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
    _export({ target: 'Array', proto: true, forced: arrayLastIndexOf !== [].lastIndexOf }, {
      lastIndexOf: arrayLastIndexOf
    });

    var $map = arrayIteration.map;


    // `Array.prototype.map` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.map
    // with adding support of @@species
    _export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('map') }, {
      map: function map(callbackfn /* , thisArg */) {
        return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    // `Array.prototype.{ reduce, reduceRight }` methods implementation
    var createMethod$3 = function (IS_RIGHT) {
      return function (that, callbackfn, argumentsLength, memo) {
        aFunction(callbackfn);
        var O = toObject(that);
        var self = indexedObject(O);
        var length = toLength(O.length);
        var index = IS_RIGHT ? length - 1 : 0;
        var i = IS_RIGHT ? -1 : 1;
        if (argumentsLength < 2) { while (true) {
          if (index in self) {
            memo = self[index];
            index += i;
            break;
          }
          index += i;
          if (IS_RIGHT ? index < 0 : length <= index) {
            throw TypeError('Reduce of empty array with no initial value');
          }
        } }
        for (;IS_RIGHT ? index >= 0 : length > index; index += i) { if (index in self) {
          memo = callbackfn(memo, self[index], index, O);
        } }
        return memo;
      };
    };

    var arrayReduce = {
      // `Array.prototype.reduce` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
      left: createMethod$3(false),
      // `Array.prototype.reduceRight` method
      // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
      right: createMethod$3(true)
    };

    var $reduce = arrayReduce.left;


    // `Array.prototype.reduce` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
    _export({ target: 'Array', proto: true, forced: sloppyArrayMethod('reduce') }, {
      reduce: function reduce(callbackfn /* , initialValue */) {
        return $reduce(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var $reduceRight = arrayReduce.right;


    // `Array.prototype.reduceRight` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
    _export({ target: 'Array', proto: true, forced: sloppyArrayMethod('reduceRight') }, {
      reduceRight: function reduceRight(callbackfn /* , initialValue */) {
        return $reduceRight(this, callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var nativeReverse = [].reverse;
    var test$1 = [1, 2];

    // `Array.prototype.reverse` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.reverse
    // fix for Safari 12.0 bug
    // https://bugs.webkit.org/show_bug.cgi?id=188794
    _export({ target: 'Array', proto: true, forced: String(test$1) === String(test$1.reverse()) }, {
      reverse: function reverse() {
        if (isArray(this)) { this.length = this.length; }
        return nativeReverse.call(this);
      }
    });

    var SPECIES$2 = wellKnownSymbol('species');
    var nativeSlice = [].slice;
    var max$1 = Math.max;

    // `Array.prototype.slice` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.slice
    // fallback for not array-like ES3 strings and DOM objects
    _export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('slice') }, {
      slice: function slice(start, end) {
        var O = toIndexedObject(this);
        var length = toLength(O.length);
        var k = toAbsoluteIndex(start, length);
        var fin = toAbsoluteIndex(end === undefined ? length : end, length);
        // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
        var Constructor, result, n;
        if (isArray(O)) {
          Constructor = O.constructor;
          // cross-realm fallback
          if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
            Constructor = undefined;
          } else if (isObject(Constructor)) {
            Constructor = Constructor[SPECIES$2];
            if (Constructor === null) { Constructor = undefined; }
          }
          if (Constructor === Array || Constructor === undefined) {
            return nativeSlice.call(O, k, fin);
          }
        }
        result = new (Constructor === undefined ? Array : Constructor)(max$1(fin - k, 0));
        for (n = 0; k < fin; k++, n++) { if (k in O) { createProperty(result, n, O[k]); } }
        result.length = n;
        return result;
      }
    });

    var $some = arrayIteration.some;


    // `Array.prototype.some` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.some
    _export({ target: 'Array', proto: true, forced: sloppyArrayMethod('some') }, {
      some: function some(callbackfn /* , thisArg */) {
        return $some(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var nativeSort = [].sort;
    var test$2 = [1, 2, 3];

    // IE8-
    var FAILS_ON_UNDEFINED = fails(function () {
      test$2.sort(undefined);
    });
    // V8 bug
    var FAILS_ON_NULL = fails(function () {
      test$2.sort(null);
    });
    // Old WebKit
    var SLOPPY_METHOD$3 = sloppyArrayMethod('sort');

    var FORCED$2 = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || SLOPPY_METHOD$3;

    // `Array.prototype.sort` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.sort
    _export({ target: 'Array', proto: true, forced: FORCED$2 }, {
      sort: function sort(comparefn) {
        return comparefn === undefined
          ? nativeSort.call(toObject(this))
          : nativeSort.call(toObject(this), aFunction(comparefn));
      }
    });

    var max$2 = Math.max;
    var min$4 = Math.min;
    var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
    var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

    // `Array.prototype.splice` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.splice
    // with adding support of @@species
    _export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('splice') }, {
      splice: function splice(start, deleteCount /* , ...items */) {
        var arguments$1 = arguments;

        var O = toObject(this);
        var len = toLength(O.length);
        var actualStart = toAbsoluteIndex(start, len);
        var argumentsLength = arguments.length;
        var insertCount, actualDeleteCount, A, k, from, to;
        if (argumentsLength === 0) {
          insertCount = actualDeleteCount = 0;
        } else if (argumentsLength === 1) {
          insertCount = 0;
          actualDeleteCount = len - actualStart;
        } else {
          insertCount = argumentsLength - 2;
          actualDeleteCount = min$4(max$2(toInteger(deleteCount), 0), len - actualStart);
        }
        if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER$1) {
          throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
        }
        A = arraySpeciesCreate(O, actualDeleteCount);
        for (k = 0; k < actualDeleteCount; k++) {
          from = actualStart + k;
          if (from in O) { createProperty(A, k, O[from]); }
        }
        A.length = actualDeleteCount;
        if (insertCount < actualDeleteCount) {
          for (k = actualStart; k < len - actualDeleteCount; k++) {
            from = k + actualDeleteCount;
            to = k + insertCount;
            if (from in O) { O[to] = O[from]; }
            else { delete O[to]; }
          }
          for (k = len; k > len - actualDeleteCount + insertCount; k--) { delete O[k - 1]; }
        } else if (insertCount > actualDeleteCount) {
          for (k = len - actualDeleteCount; k > actualStart; k--) {
            from = k + actualDeleteCount - 1;
            to = k + insertCount - 1;
            if (from in O) { O[to] = O[from]; }
            else { delete O[to]; }
          }
        }
        for (k = 0; k < insertCount; k++) {
          O[k + actualStart] = arguments$1[k + 2];
        }
        O.length = len - actualDeleteCount + insertCount;
        return A;
      }
    });

    var SPECIES$3 = wellKnownSymbol('species');

    var setSpecies = function (CONSTRUCTOR_NAME) {
      var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
      var defineProperty = objectDefineProperty.f;

      if (descriptors && Constructor && !Constructor[SPECIES$3]) {
        defineProperty(Constructor, SPECIES$3, {
          configurable: true,
          get: function () { return this; }
        });
      }
    };

    // `Array[@@species]` getter
    // https://tc39.github.io/ecma262/#sec-get-array-@@species
    setSpecies('Array');

    var ITERATOR$3 = wellKnownSymbol('iterator');
    var BUGGY_SAFARI_ITERATORS = false;

    // `%IteratorPrototype%` object
    // https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
    var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

    if ([].keys) {
      arrayIterator = [].keys();
      // Safari 8 has buggy iterators w/o `next`
      if (!('next' in arrayIterator)) { BUGGY_SAFARI_ITERATORS = true; }
      else {
        PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
        if (PrototypeOfArrayIteratorPrototype !== Object.prototype) { IteratorPrototype = PrototypeOfArrayIteratorPrototype; }
      }
    }

    if (IteratorPrototype == undefined) { IteratorPrototype = {}; }

    var iteratorsCore = {
      IteratorPrototype: IteratorPrototype,
      BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
    };

    var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





    var returnThis = function () { return this; };

    var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
      var TO_STRING_TAG = NAME + ' Iterator';
      IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
      setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
      iterators[TO_STRING_TAG] = returnThis;
      return IteratorConstructor;
    };

    var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
    var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
    var ITERATOR$4 = wellKnownSymbol('iterator');
    var KEYS = 'keys';
    var VALUES = 'values';
    var ENTRIES = 'entries';

    var returnThis$1 = function () { return this; };

    var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
      createIteratorConstructor(IteratorConstructor, NAME, next);

      var getIterationMethod = function (KIND) {
        if (KIND === DEFAULT && defaultIterator) { return defaultIterator; }
        if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) { return IterablePrototype[KIND]; }
        switch (KIND) {
          case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
          case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
          case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
        } return function () { return new IteratorConstructor(this); };
      };

      var TO_STRING_TAG = NAME + ' Iterator';
      var INCORRECT_VALUES_NAME = false;
      var IterablePrototype = Iterable.prototype;
      var nativeIterator = IterablePrototype[ITERATOR$4]
        || IterablePrototype['@@iterator']
        || DEFAULT && IterablePrototype[DEFAULT];
      var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
      var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
      var CurrentIteratorPrototype, methods, KEY;

      // fix native
      if (anyNativeIterator) {
        CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
        if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
          // Set @@toStringTag to native iterators
          setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
          { iterators[TO_STRING_TAG] = returnThis$1; }
        }
      }

      // fix Array#{values, @@iterator}.name in V8 / FF
      if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
        INCORRECT_VALUES_NAME = true;
        defaultIterator = function values() { return nativeIterator.call(this); };
      }

      // define iterator
      if (( FORCED) && IterablePrototype[ITERATOR$4] !== defaultIterator) {
        hide(IterablePrototype, ITERATOR$4, defaultIterator);
      }
      iterators[NAME] = defaultIterator;

      // export additional methods
      if (DEFAULT) {
        methods = {
          values: getIterationMethod(VALUES),
          keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
          entries: getIterationMethod(ENTRIES)
        };
        if (FORCED) { for (KEY in methods) {
          if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
            redefine(IterablePrototype, KEY, methods[KEY]);
          }
        } } else { _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods); }
      }

      return methods;
    };

    var ARRAY_ITERATOR = 'Array Iterator';
    var setInternalState$1 = internalState.set;
    var getInternalState$1 = internalState.getterFor(ARRAY_ITERATOR);

    // `Array.prototype.entries` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.entries
    // `Array.prototype.keys` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.keys
    // `Array.prototype.values` method
    // https://tc39.github.io/ecma262/#sec-array.prototype.values
    // `Array.prototype[@@iterator]` method
    // https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
    // `CreateArrayIterator` internal method
    // https://tc39.github.io/ecma262/#sec-createarrayiterator
    var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
      setInternalState$1(this, {
        type: ARRAY_ITERATOR,
        target: toIndexedObject(iterated), // target
        index: 0,                          // next index
        kind: kind                         // kind
      });
    // `%ArrayIteratorPrototype%.next` method
    // https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
    }, function () {
      var state = getInternalState$1(this);
      var target = state.target;
      var kind = state.kind;
      var index = state.index++;
      if (!target || index >= target.length) {
        state.target = undefined;
        return { value: undefined, done: true };
      }
      if (kind == 'keys') { return { value: index, done: false }; }
      if (kind == 'values') { return { value: target[index], done: false }; }
      return { value: [index, target[index]], done: false };
    }, 'values');

    // argumentsList[@@iterator] is %ArrayProto_values%
    // https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
    // https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
    iterators.Arguments = iterators.Array;

    var fromCharCode = String.fromCharCode;
    var nativeFromCodePoint = String.fromCodePoint;

    // length should be 1, old FF problem
    var INCORRECT_LENGTH = !!nativeFromCodePoint && nativeFromCodePoint.length != 1;

    // `String.fromCodePoint` method
    // https://tc39.github.io/ecma262/#sec-string.fromcodepoint
    _export({ target: 'String', stat: true, forced: INCORRECT_LENGTH }, {
      fromCodePoint: function fromCodePoint(x) {
        var arguments$1 = arguments;
     // eslint-disable-line no-unused-vars
        var elements = [];
        var length = arguments.length;
        var i = 0;
        var code;
        while (length > i) {
          code = +arguments$1[i++];
          if (toAbsoluteIndex(code, 0x10FFFF) !== code) { throw RangeError(code + ' is not a valid code point'); }
          elements.push(code < 0x10000
            ? fromCharCode(code)
            : fromCharCode(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00)
          );
        } return elements.join('');
      }
    });

    // `String.raw` method
    // https://tc39.github.io/ecma262/#sec-string.raw
    _export({ target: 'String', stat: true }, {
      raw: function raw(template) {
        var arguments$1 = arguments;

        var rawTemplate = toIndexedObject(template.raw);
        var literalSegments = toLength(rawTemplate.length);
        var argumentsLength = arguments.length;
        var elements = [];
        var i = 0;
        while (literalSegments > i) {
          elements.push(String(rawTemplate[i++]));
          if (i < argumentsLength) { elements.push(String(arguments$1[i])); }
        } return elements.join('');
      }
    });

    // `String.prototype.{ codePointAt, at }` methods implementation
    var createMethod$4 = function (CONVERT_TO_STRING) {
      return function ($this, pos) {
        var S = String(requireObjectCoercible($this));
        var position = toInteger(pos);
        var size = S.length;
        var first, second;
        if (position < 0 || position >= size) { return CONVERT_TO_STRING ? '' : undefined; }
        first = S.charCodeAt(position);
        return first < 0xD800 || first > 0xDBFF || position + 1 === size
          || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
            ? CONVERT_TO_STRING ? S.charAt(position) : first
            : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
      };
    };

    var stringMultibyte = {
      // `String.prototype.codePointAt` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
      codeAt: createMethod$4(false),
      // `String.prototype.at` method
      // https://github.com/mathiasbynens/String.prototype.at
      charAt: createMethod$4(true)
    };

    var codeAt = stringMultibyte.codeAt;

    // `String.prototype.codePointAt` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
    _export({ target: 'String', proto: true }, {
      codePointAt: function codePointAt(pos) {
        return codeAt(this, pos);
      }
    });

    var MATCH = wellKnownSymbol('match');

    // `IsRegExp` abstract operation
    // https://tc39.github.io/ecma262/#sec-isregexp
    var isRegexp = function (it) {
      var isRegExp;
      return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
    };

    var notARegexp = function (it) {
      if (isRegexp(it)) {
        throw TypeError("The method doesn't accept regular expressions");
      } return it;
    };

    var MATCH$1 = wellKnownSymbol('match');

    var correctIsRegexpLogic = function (METHOD_NAME) {
      var regexp = /./;
      try {
        '/./'[METHOD_NAME](regexp);
      } catch (e) {
        try {
          regexp[MATCH$1] = false;
          return '/./'[METHOD_NAME](regexp);
        } catch (f) { /* empty */ }
      } return false;
    };

    var nativeEndsWith = ''.endsWith;
    var min$5 = Math.min;

    // `String.prototype.endsWith` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.endswith
    _export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('endsWith') }, {
      endsWith: function endsWith(searchString /* , endPosition = @length */) {
        var that = String(requireObjectCoercible(this));
        notARegexp(searchString);
        var endPosition = arguments.length > 1 ? arguments[1] : undefined;
        var len = toLength(that.length);
        var end = endPosition === undefined ? len : min$5(toLength(endPosition), len);
        var search = String(searchString);
        return nativeEndsWith
          ? nativeEndsWith.call(that, search, end)
          : that.slice(end - search.length, end) === search;
      }
    });

    // `String.prototype.includes` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.includes
    _export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
      includes: function includes(searchString /* , position = 0 */) {
        return !!~String(requireObjectCoercible(this))
          .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    // `RegExp.prototype.flags` getter implementation
    // https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
    var regexpFlags = function () {
      var that = anObject(this);
      var result = '';
      if (that.global) { result += 'g'; }
      if (that.ignoreCase) { result += 'i'; }
      if (that.multiline) { result += 'm'; }
      if (that.dotAll) { result += 's'; }
      if (that.unicode) { result += 'u'; }
      if (that.sticky) { result += 'y'; }
      return result;
    };

    var SPECIES$4 = wellKnownSymbol('species');

    // `SpeciesConstructor` abstract operation
    // https://tc39.github.io/ecma262/#sec-speciesconstructor
    var speciesConstructor = function (O, defaultConstructor) {
      var C = anObject(O).constructor;
      var S;
      return C === undefined || (S = anObject(C)[SPECIES$4]) == undefined ? defaultConstructor : aFunction(S);
    };

    var charAt = stringMultibyte.charAt;

    // `AdvanceStringIndex` abstract operation
    // https://tc39.github.io/ecma262/#sec-advancestringindex
    var advanceStringIndex = function (S, index, unicode) {
      return index + (unicode ? charAt(S, index).length : 1);
    };

    var MATCH_ALL = wellKnownSymbol('matchAll');
    var REGEXP_STRING = 'RegExp String';
    var REGEXP_STRING_ITERATOR = REGEXP_STRING + ' Iterator';
    var setInternalState$2 = internalState.set;
    var getInternalState$2 = internalState.getterFor(REGEXP_STRING_ITERATOR);
    var RegExpPrototype = RegExp.prototype;
    var regExpBuiltinExec = RegExpPrototype.exec;

    var regExpExec = function (R, S) {
      var exec = R.exec;
      var result;
      if (typeof exec == 'function') {
        result = exec.call(R, S);
        if (typeof result != 'object') { throw TypeError('Incorrect exec result'); }
        return result;
      } return regExpBuiltinExec.call(R, S);
    };

    // eslint-disable-next-line max-len
    var $RegExpStringIterator = createIteratorConstructor(function RegExpStringIterator(regexp, string, global, fullUnicode) {
      setInternalState$2(this, {
        type: REGEXP_STRING_ITERATOR,
        regexp: regexp,
        string: string,
        global: global,
        unicode: fullUnicode,
        done: false
      });
    }, REGEXP_STRING, function next() {
      var state = getInternalState$2(this);
      if (state.done) { return { value: undefined, done: true }; }
      var R = state.regexp;
      var S = state.string;
      var match = regExpExec(R, S);
      if (match === null) { return { value: undefined, done: state.done = true }; }
      if (state.global) {
        if (String(match[0]) == '') { R.lastIndex = advanceStringIndex(S, toLength(R.lastIndex), state.unicode); }
        return { value: match, done: false };
      }
      state.done = true;
      return { value: match, done: false };
    });

    var $matchAll = function (string) {
      var R = anObject(this);
      var S = String(string);
      var C, flagsValue, flags, matcher, global, fullUnicode;
      C = speciesConstructor(R, RegExp);
      flagsValue = R.flags;
      if (flagsValue === undefined && R instanceof RegExp && !('flags' in RegExpPrototype)) {
        flagsValue = regexpFlags.call(R);
      }
      flags = flagsValue === undefined ? '' : String(flagsValue);
      matcher = new C(C === RegExp ? R.source : R, flags);
      global = !!~flags.indexOf('g');
      fullUnicode = !!~flags.indexOf('u');
      matcher.lastIndex = toLength(R.lastIndex);
      return new $RegExpStringIterator(matcher, S, global, fullUnicode);
    };

    // `String.prototype.matchAll` method
    // https://github.com/tc39/proposal-string-matchall
    _export({ target: 'String', proto: true }, {
      matchAll: function matchAll(regexp) {
        var O = requireObjectCoercible(this);
        var S, matcher, rx;
        if (regexp != null) {
          matcher = regexp[MATCH_ALL];
          if (matcher === undefined && isPure && classof(regexp) == 'RegExp') { matcher = $matchAll; }
          if (matcher != null) { return aFunction(matcher).call(regexp, O); }
        }
        S = String(O);
        rx = new RegExp(regexp, 'g');
        return  $matchAll.call(rx, S) ;
      }
    });

    // `String.prototype.repeat` method implementation
    // https://tc39.github.io/ecma262/#sec-string.prototype.repeat
    var stringRepeat = ''.repeat || function repeat(count) {
      var str = String(requireObjectCoercible(this));
      var result = '';
      var n = toInteger(count);
      if (n < 0 || n == Infinity) { throw RangeError('Wrong number of repetitions'); }
      for (;n > 0; (n >>>= 1) && (str += str)) { if (n & 1) { result += str; } }
      return result;
    };

    // https://github.com/tc39/proposal-string-pad-start-end




    var ceil$1 = Math.ceil;

    // `String.prototype.{ padStart, padEnd }` methods implementation
    var createMethod$5 = function (IS_END) {
      return function ($this, maxLength, fillString) {
        var S = String(requireObjectCoercible($this));
        var stringLength = S.length;
        var fillStr = fillString === undefined ? ' ' : String(fillString);
        var intMaxLength = toLength(maxLength);
        var fillLen, stringFiller;
        if (intMaxLength <= stringLength || fillStr == '') { return S; }
        fillLen = intMaxLength - stringLength;
        stringFiller = stringRepeat.call(fillStr, ceil$1(fillLen / fillStr.length));
        if (stringFiller.length > fillLen) { stringFiller = stringFiller.slice(0, fillLen); }
        return IS_END ? S + stringFiller : stringFiller + S;
      };
    };

    var stringPad = {
      // `String.prototype.padStart` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.padstart
      start: createMethod$5(false),
      // `String.prototype.padEnd` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.padend
      end: createMethod$5(true)
    };

    var userAgent = getBuiltIn('navigator', 'userAgent') || '';

    // https://github.com/zloirock/core-js/issues/280


    // eslint-disable-next-line unicorn/no-unsafe-regex
    var webkitStringPadBug = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

    var $padEnd = stringPad.end;


    // `String.prototype.padEnd` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.padend
    _export({ target: 'String', proto: true, forced: webkitStringPadBug }, {
      padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
        return $padEnd(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    var $padStart = stringPad.start;


    // `String.prototype.padStart` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.padstart
    _export({ target: 'String', proto: true, forced: webkitStringPadBug }, {
      padStart: function padStart(maxLength /* , fillString = ' ' */) {
        return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
      }
    });

    // `String.prototype.repeat` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.repeat
    _export({ target: 'String', proto: true }, {
      repeat: stringRepeat
    });

    var nativeStartsWith = ''.startsWith;
    var min$6 = Math.min;

    // `String.prototype.startsWith` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.startswith
    _export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('startsWith') }, {
      startsWith: function startsWith(searchString /* , position = 0 */) {
        var that = String(requireObjectCoercible(this));
        notARegexp(searchString);
        var index = toLength(min$6(arguments.length > 1 ? arguments[1] : undefined, that.length));
        var search = String(searchString);
        return nativeStartsWith
          ? nativeStartsWith.call(that, search, index)
          : that.slice(index, index + search.length) === search;
      }
    });

    // a string of all valid unicode whitespaces
    // eslint-disable-next-line max-len
    var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

    var whitespace = '[' + whitespaces + ']';
    var ltrim = RegExp('^' + whitespace + whitespace + '*');
    var rtrim = RegExp(whitespace + whitespace + '*$');

    // `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
    var createMethod$6 = function (TYPE) {
      return function ($this) {
        var string = String(requireObjectCoercible($this));
        if (TYPE & 1) { string = string.replace(ltrim, ''); }
        if (TYPE & 2) { string = string.replace(rtrim, ''); }
        return string;
      };
    };

    var stringTrim = {
      // `String.prototype.{ trimLeft, trimStart }` methods
      // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
      start: createMethod$6(1),
      // `String.prototype.{ trimRight, trimEnd }` methods
      // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
      end: createMethod$6(2),
      // `String.prototype.trim` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.trim
      trim: createMethod$6(3)
    };

    var non = '\u200B\u0085\u180E';

    // check that a method works with the correct list
    // of whitespaces and has a correct name
    var forcedStringTrimMethod = function (METHOD_NAME) {
      return fails(function () {
        return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
      });
    };

    var $trim = stringTrim.trim;


    // `String.prototype.trim` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.trim
    _export({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
      trim: function trim() {
        return $trim(this);
      }
    });

    var $trimStart = stringTrim.start;


    var FORCED$3 = forcedStringTrimMethod('trimStart');

    var trimStart = FORCED$3 ? function trimStart() {
      return $trimStart(this);
    } : ''.trimStart;

    // `String.prototype.{ trimStart, trimLeft }` methods
    // https://github.com/tc39/ecmascript-string-left-right-trim
    _export({ target: 'String', proto: true, forced: FORCED$3 }, {
      trimStart: trimStart,
      trimLeft: trimStart
    });

    var $trimEnd = stringTrim.end;


    var FORCED$4 = forcedStringTrimMethod('trimEnd');

    var trimEnd = FORCED$4 ? function trimEnd() {
      return $trimEnd(this);
    } : ''.trimEnd;

    // `String.prototype.{ trimEnd, trimRight }` methods
    // https://github.com/tc39/ecmascript-string-left-right-trim
    _export({ target: 'String', proto: true, forced: FORCED$4 }, {
      trimEnd: trimEnd,
      trimRight: trimEnd
    });

    var charAt$1 = stringMultibyte.charAt;



    var STRING_ITERATOR = 'String Iterator';
    var setInternalState$3 = internalState.set;
    var getInternalState$3 = internalState.getterFor(STRING_ITERATOR);

    // `String.prototype[@@iterator]` method
    // https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
    defineIterator(String, 'String', function (iterated) {
      setInternalState$3(this, {
        type: STRING_ITERATOR,
        string: String(iterated),
        index: 0
      });
    // `%StringIteratorPrototype%.next` method
    // https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
    }, function next() {
      var state = getInternalState$3(this);
      var string = state.string;
      var index = state.index;
      var point;
      if (index >= string.length) { return { value: undefined, done: true }; }
      point = charAt$1(string, index);
      state.index += point.length;
      return { value: point, done: false };
    });

    var quot = /"/g;

    // B.2.3.2.1 CreateHTML(string, tag, attribute, value)
    // https://tc39.github.io/ecma262/#sec-createhtml
    var createHtml = function (string, tag, attribute, value) {
      var S = String(requireObjectCoercible(string));
      var p1 = '<' + tag;
      if (attribute !== '') { p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"'; }
      return p1 + '>' + S + '</' + tag + '>';
    };

    // check the existence of a method, lowercase
    // of a tag and escaping quotes in arguments
    var forcedStringHtmlMethod = function (METHOD_NAME) {
      return fails(function () {
        var test = ''[METHOD_NAME]('"');
        return test !== test.toLowerCase() || test.split('"').length > 3;
      });
    };

    // `String.prototype.anchor` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.anchor
    _export({ target: 'String', proto: true, forced: forcedStringHtmlMethod('anchor') }, {
      anchor: function anchor(name) {
        return createHtml(this, 'a', 'name', name);
      }
    });

    // `String.prototype.big` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.big
    _export({ target: 'String', proto: true, forced: forcedStringHtmlMethod('big') }, {
      big: function big() {
        return createHtml(this, 'big', '', '');
      }
    });

    // `String.prototype.blink` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.blink
    _export({ target: 'String', proto: true, forced: forcedStringHtmlMethod('blink') }, {
      blink: function blink() {
        return createHtml(this, 'blink', '', '');
      }
    });

    // `String.prototype.bold` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.bold
    _export({ target: 'String', proto: true, forced: forcedStringHtmlMethod('bold') }, {
      bold: function bold() {
        return createHtml(this, 'b', '', '');
      }
    });

    // `String.prototype.fixed` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.fixed
    _export({ target: 'String', proto: true, forced: forcedStringHtmlMethod('fixed') }, {
      fixed: function fixed() {
        return createHtml(this, 'tt', '', '');
      }
    });

    // `String.prototype.fontcolor` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.fontcolor
    _export({ target: 'String', proto: true, forced: forcedStringHtmlMethod('fontcolor') }, {
      fontcolor: function fontcolor(color) {
        return createHtml(this, 'font', 'color', color);
      }
    });

    // `String.prototype.fontsize` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.fontsize
    _export({ target: 'String', proto: true, forced: forcedStringHtmlMethod('fontsize') }, {
      fontsize: function fontsize(size) {
        return createHtml(this, 'font', 'size', size);
      }
    });

    // `String.prototype.italics` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.italics
    _export({ target: 'String', proto: true, forced: forcedStringHtmlMethod('italics') }, {
      italics: function italics() {
        return createHtml(this, 'i', '', '');
      }
    });

    // `String.prototype.link` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.link
    _export({ target: 'String', proto: true, forced: forcedStringHtmlMethod('link') }, {
      link: function link(url) {
        return createHtml(this, 'a', 'href', url);
      }
    });

    // `String.prototype.small` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.small
    _export({ target: 'String', proto: true, forced: forcedStringHtmlMethod('small') }, {
      small: function small() {
        return createHtml(this, 'small', '', '');
      }
    });

    // `String.prototype.strike` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.strike
    _export({ target: 'String', proto: true, forced: forcedStringHtmlMethod('strike') }, {
      strike: function strike() {
        return createHtml(this, 'strike', '', '');
      }
    });

    // `String.prototype.sub` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.sub
    _export({ target: 'String', proto: true, forced: forcedStringHtmlMethod('sub') }, {
      sub: function sub() {
        return createHtml(this, 'sub', '', '');
      }
    });

    // `String.prototype.sup` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.sup
    _export({ target: 'String', proto: true, forced: forcedStringHtmlMethod('sup') }, {
      sup: function sup() {
        return createHtml(this, 'sup', '', '');
      }
    });

    setSpecies('RegExp');

    var trim = stringTrim.trim;


    var nativeParseInt = global_1.parseInt;
    var hex = /^[+-]?0[Xx]/;
    var FORCED$5 = nativeParseInt(whitespaces + '08') !== 8 || nativeParseInt(whitespaces + '0x16') !== 22;

    // `parseInt` method
    // https://tc39.github.io/ecma262/#sec-parseint-string-radix
    var _parseInt = FORCED$5 ? function parseInt(string, radix) {
      var S = trim(String(string));
      return nativeParseInt(S, (radix >>> 0) || (hex.test(S) ? 16 : 10));
    } : nativeParseInt;

    // `parseInt` method
    // https://tc39.github.io/ecma262/#sec-parseint-string-radix
    _export({ global: true, forced: parseInt != _parseInt }, {
      parseInt: _parseInt
    });

    var trim$1 = stringTrim.trim;


    var nativeParseFloat = global_1.parseFloat;
    var FORCED$6 = 1 / nativeParseFloat(whitespaces + '-0') !== -Infinity;

    // `parseFloat` method
    // https://tc39.github.io/ecma262/#sec-parsefloat-string
    var _parseFloat = FORCED$6 ? function parseFloat(string) {
      var trimmedString = trim$1(String(string));
      var result = nativeParseFloat(trimmedString);
      return result === 0 && trimmedString.charAt(0) == '-' ? -0 : result;
    } : nativeParseFloat;

    // `parseFloat` method
    // https://tc39.github.io/ecma262/#sec-parsefloat-string
    _export({ global: true, forced: parseFloat != _parseFloat }, {
      parseFloat: _parseFloat
    });

    // `Number.EPSILON` constant
    // https://tc39.github.io/ecma262/#sec-number.epsilon
    _export({ target: 'Number', stat: true }, {
      EPSILON: Math.pow(2, -52)
    });

    var globalIsFinite = global_1.isFinite;

    // `Number.isFinite` method
    // https://tc39.github.io/ecma262/#sec-number.isfinite
    var numberIsFinite = Number.isFinite || function isFinite(it) {
      return typeof it == 'number' && globalIsFinite(it);
    };

    // `Number.isFinite` method
    // https://tc39.github.io/ecma262/#sec-number.isfinite
    _export({ target: 'Number', stat: true }, { isFinite: numberIsFinite });

    var floor$1 = Math.floor;

    // `Number.isInteger` method implementation
    // https://tc39.github.io/ecma262/#sec-number.isinteger
    var isInteger = function isInteger(it) {
      return !isObject(it) && isFinite(it) && floor$1(it) === it;
    };

    // `Number.isInteger` method
    // https://tc39.github.io/ecma262/#sec-number.isinteger
    _export({ target: 'Number', stat: true }, {
      isInteger: isInteger
    });

    // `Number.isNaN` method
    // https://tc39.github.io/ecma262/#sec-number.isnan
    _export({ target: 'Number', stat: true }, {
      isNaN: function isNaN(number) {
        // eslint-disable-next-line no-self-compare
        return number != number;
      }
    });

    var abs = Math.abs;

    // `Number.isSafeInteger` method
    // https://tc39.github.io/ecma262/#sec-number.issafeinteger
    _export({ target: 'Number', stat: true }, {
      isSafeInteger: function isSafeInteger(number) {
        return isInteger(number) && abs(number) <= 0x1FFFFFFFFFFFFF;
      }
    });

    // `Number.MAX_SAFE_INTEGER` constant
    // https://tc39.github.io/ecma262/#sec-number.max_safe_integer
    _export({ target: 'Number', stat: true }, {
      MAX_SAFE_INTEGER: 0x1FFFFFFFFFFFFF
    });

    // `Number.MIN_SAFE_INTEGER` constant
    // https://tc39.github.io/ecma262/#sec-number.min_safe_integer
    _export({ target: 'Number', stat: true }, {
      MIN_SAFE_INTEGER: -0x1FFFFFFFFFFFFF
    });

    // `Number.parseFloat` method
    // https://tc39.github.io/ecma262/#sec-number.parseFloat
    _export({ target: 'Number', stat: true, forced: Number.parseFloat != _parseFloat }, {
      parseFloat: _parseFloat
    });

    // `Number.parseInt` method
    // https://tc39.github.io/ecma262/#sec-number.parseint
    _export({ target: 'Number', stat: true, forced: Number.parseInt != _parseInt }, {
      parseInt: _parseInt
    });

    // `thisNumberValue` abstract operation
    // https://tc39.github.io/ecma262/#sec-thisnumbervalue
    var thisNumberValue = function (value) {
      if (typeof value != 'number' && classofRaw(value) != 'Number') {
        throw TypeError('Incorrect invocation');
      }
      return +value;
    };

    var nativeToFixed = 1.0.toFixed;
    var floor$2 = Math.floor;

    var pow = function (x, n, acc) {
      return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
    };

    var log$1 = function (x) {
      var n = 0;
      var x2 = x;
      while (x2 >= 4096) {
        n += 12;
        x2 /= 4096;
      }
      while (x2 >= 2) {
        n += 1;
        x2 /= 2;
      } return n;
    };

    var FORCED$7 = nativeToFixed && (
      0.00008.toFixed(3) !== '0.000' ||
      0.9.toFixed(0) !== '1' ||
      1.255.toFixed(2) !== '1.25' ||
      1000000000000000128.0.toFixed(0) !== '1000000000000000128'
    ) || !fails(function () {
      // V8 ~ Android 4.3-
      nativeToFixed.call({});
    });

    // `Number.prototype.toFixed` method
    // https://tc39.github.io/ecma262/#sec-number.prototype.tofixed
    _export({ target: 'Number', proto: true, forced: FORCED$7 }, {
      // eslint-disable-next-line max-statements
      toFixed: function toFixed(fractionDigits) {
        var number = thisNumberValue(this);
        var fractDigits = toInteger(fractionDigits);
        var data = [0, 0, 0, 0, 0, 0];
        var sign = '';
        var result = '0';
        var e, z, j, k;

        var multiply = function (n, c) {
          var index = -1;
          var c2 = c;
          while (++index < 6) {
            c2 += n * data[index];
            data[index] = c2 % 1e7;
            c2 = floor$2(c2 / 1e7);
          }
        };

        var divide = function (n) {
          var index = 6;
          var c = 0;
          while (--index >= 0) {
            c += data[index];
            data[index] = floor$2(c / n);
            c = (c % n) * 1e7;
          }
        };

        var dataToString = function () {
          var index = 6;
          var s = '';
          while (--index >= 0) {
            if (s !== '' || index === 0 || data[index] !== 0) {
              var t = String(data[index]);
              s = s === '' ? t : s + stringRepeat.call('0', 7 - t.length) + t;
            }
          } return s;
        };

        if (fractDigits < 0 || fractDigits > 20) { throw RangeError('Incorrect fraction digits'); }
        // eslint-disable-next-line no-self-compare
        if (number != number) { return 'NaN'; }
        if (number <= -1e21 || number >= 1e21) { return String(number); }
        if (number < 0) {
          sign = '-';
          number = -number;
        }
        if (number > 1e-21) {
          e = log$1(number * pow(2, 69, 1)) - 69;
          z = e < 0 ? number * pow(2, -e, 1) : number / pow(2, e, 1);
          z *= 0x10000000000000;
          e = 52 - e;
          if (e > 0) {
            multiply(0, z);
            j = fractDigits;
            while (j >= 7) {
              multiply(1e7, 0);
              j -= 7;
            }
            multiply(pow(10, j, 1), 0);
            j = e - 1;
            while (j >= 23) {
              divide(1 << 23);
              j -= 23;
            }
            divide(1 << j);
            multiply(1, 1);
            divide(2);
            result = dataToString();
          } else {
            multiply(0, z);
            multiply(1 << -e, 0);
            result = dataToString() + stringRepeat.call('0', fractDigits);
          }
        }
        if (fractDigits > 0) {
          k = result.length;
          result = sign + (k <= fractDigits
            ? '0.' + stringRepeat.call('0', fractDigits - k) + result
            : result.slice(0, k - fractDigits) + '.' + result.slice(k - fractDigits));
        } else {
          result = sign + result;
        } return result;
      }
    });

    var nativeToPrecision = 1.0.toPrecision;

    var FORCED$8 = fails(function () {
      // IE7-
      return nativeToPrecision.call(1, undefined) !== '1';
    }) || !fails(function () {
      // V8 ~ Android 4.3-
      nativeToPrecision.call({});
    });

    // `Number.prototype.toPrecision` method
    // https://tc39.github.io/ecma262/#sec-number.prototype.toprecision
    _export({ target: 'Number', proto: true, forced: FORCED$8 }, {
      toPrecision: function toPrecision(precision) {
        return precision === undefined
          ? nativeToPrecision.call(thisNumberValue(this))
          : nativeToPrecision.call(thisNumberValue(this), precision);
      }
    });

    var log$2 = Math.log;

    // `Math.log1p` method implementation
    // https://tc39.github.io/ecma262/#sec-math.log1p
    var mathLog1p = Math.log1p || function log1p(x) {
      return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log$2(1 + x);
    };

    var nativeAcosh = Math.acosh;
    var log$3 = Math.log;
    var sqrt = Math.sqrt;
    var LN2 = Math.LN2;

    var FORCED$9 = !nativeAcosh
      // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
      || Math.floor(nativeAcosh(Number.MAX_VALUE)) != 710
      // Tor Browser bug: Math.acosh(Infinity) -> NaN
      || nativeAcosh(Infinity) != Infinity;

    // `Math.acosh` method
    // https://tc39.github.io/ecma262/#sec-math.acosh
    _export({ target: 'Math', stat: true, forced: FORCED$9 }, {
      acosh: function acosh(x) {
        return (x = +x) < 1 ? NaN : x > 94906265.62425156
          ? log$3(x) + LN2
          : mathLog1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
      }
    });

    var nativeAsinh = Math.asinh;
    var log$4 = Math.log;
    var sqrt$1 = Math.sqrt;

    function asinh(x) {
      return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log$4(x + sqrt$1(x * x + 1));
    }

    // `Math.asinh` method
    // https://tc39.github.io/ecma262/#sec-math.asinh
    // Tor Browser bug: Math.asinh(0) -> -0
    _export({ target: 'Math', stat: true, forced: !(nativeAsinh && 1 / nativeAsinh(0) > 0) }, {
      asinh: asinh
    });

    var nativeAtanh = Math.atanh;
    var log$5 = Math.log;

    // `Math.atanh` method
    // https://tc39.github.io/ecma262/#sec-math.atanh
    // Tor Browser bug: Math.atanh(-0) -> 0
    _export({ target: 'Math', stat: true, forced: !(nativeAtanh && 1 / nativeAtanh(-0) < 0) }, {
      atanh: function atanh(x) {
        return (x = +x) == 0 ? x : log$5((1 + x) / (1 - x)) / 2;
      }
    });

    // `Math.sign` method implementation
    // https://tc39.github.io/ecma262/#sec-math.sign
    var mathSign = Math.sign || function sign(x) {
      // eslint-disable-next-line no-self-compare
      return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
    };

    var abs$1 = Math.abs;
    var pow$1 = Math.pow;

    // `Math.cbrt` method
    // https://tc39.github.io/ecma262/#sec-math.cbrt
    _export({ target: 'Math', stat: true }, {
      cbrt: function cbrt(x) {
        return mathSign(x = +x) * pow$1(abs$1(x), 1 / 3);
      }
    });

    var floor$3 = Math.floor;
    var log$6 = Math.log;
    var LOG2E = Math.LOG2E;

    // `Math.clz32` method
    // https://tc39.github.io/ecma262/#sec-math.clz32
    _export({ target: 'Math', stat: true }, {
      clz32: function clz32(x) {
        return (x >>>= 0) ? 31 - floor$3(log$6(x + 0.5) * LOG2E) : 32;
      }
    });

    var nativeExpm1 = Math.expm1;
    var exp = Math.exp;

    // `Math.expm1` method implementation
    // https://tc39.github.io/ecma262/#sec-math.expm1
    var mathExpm1 = (!nativeExpm1
      // Old FF bug
      || nativeExpm1(10) > 22025.465794806719 || nativeExpm1(10) < 22025.4657948067165168
      // Tor Browser bug
      || nativeExpm1(-2e-17) != -2e-17
    ) ? function expm1(x) {
      return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
    } : nativeExpm1;

    var nativeCosh = Math.cosh;
    var abs$2 = Math.abs;
    var E = Math.E;

    // `Math.cosh` method
    // https://tc39.github.io/ecma262/#sec-math.cosh
    _export({ target: 'Math', stat: true, forced: !nativeCosh || nativeCosh(710) === Infinity }, {
      cosh: function cosh(x) {
        var t = mathExpm1(abs$2(x) - 1) + 1;
        return (t + 1 / (t * E * E)) * (E / 2);
      }
    });

    // `Math.expm1` method
    // https://tc39.github.io/ecma262/#sec-math.expm1
    _export({ target: 'Math', stat: true, forced: mathExpm1 != Math.expm1 }, { expm1: mathExpm1 });

    var abs$3 = Math.abs;
    var pow$2 = Math.pow;
    var EPSILON = pow$2(2, -52);
    var EPSILON32 = pow$2(2, -23);
    var MAX32 = pow$2(2, 127) * (2 - EPSILON32);
    var MIN32 = pow$2(2, -126);

    var roundTiesToEven = function (n) {
      return n + 1 / EPSILON - 1 / EPSILON;
    };

    // `Math.fround` method implementation
    // https://tc39.github.io/ecma262/#sec-math.fround
    var mathFround = Math.fround || function fround(x) {
      var $abs = abs$3(x);
      var $sign = mathSign(x);
      var a, result;
      if ($abs < MIN32) { return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32; }
      a = (1 + EPSILON32 / EPSILON) * $abs;
      result = a - (a - $abs);
      // eslint-disable-next-line no-self-compare
      if (result > MAX32 || result != result) { return $sign * Infinity; }
      return $sign * result;
    };

    // `Math.fround` method
    // https://tc39.github.io/ecma262/#sec-math.fround
    _export({ target: 'Math', stat: true }, { fround: mathFround });

    var abs$4 = Math.abs;
    var sqrt$2 = Math.sqrt;

    // `Math.hypot` method
    // https://tc39.github.io/ecma262/#sec-math.hypot
    _export({ target: 'Math', stat: true }, {
      hypot: function hypot(value1, value2) {
        var arguments$1 = arguments;
     // eslint-disable-line no-unused-vars
        var sum = 0;
        var i = 0;
        var aLen = arguments.length;
        var larg = 0;
        var arg, div;
        while (i < aLen) {
          arg = abs$4(arguments$1[i++]);
          if (larg < arg) {
            div = larg / arg;
            sum = sum * div * div + 1;
            larg = arg;
          } else if (arg > 0) {
            div = arg / larg;
            sum += div * div;
          } else { sum += arg; }
        }
        return larg === Infinity ? Infinity : larg * sqrt$2(sum);
      }
    });

    var nativeImul = Math.imul;

    var FORCED$a = fails(function () {
      return nativeImul(0xFFFFFFFF, 5) != -5 || nativeImul.length != 2;
    });

    // `Math.imul` method
    // https://tc39.github.io/ecma262/#sec-math.imul
    // some WebKit versions fails with big numbers, some has wrong arity
    _export({ target: 'Math', stat: true, forced: FORCED$a }, {
      imul: function imul(x, y) {
        var UINT16 = 0xFFFF;
        var xn = +x;
        var yn = +y;
        var xl = UINT16 & xn;
        var yl = UINT16 & yn;
        return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
      }
    });

    var log$7 = Math.log;
    var LOG10E = Math.LOG10E;

    // `Math.log10` method
    // https://tc39.github.io/ecma262/#sec-math.log10
    _export({ target: 'Math', stat: true }, {
      log10: function log10(x) {
        return log$7(x) * LOG10E;
      }
    });

    // `Math.log1p` method
    // https://tc39.github.io/ecma262/#sec-math.log1p
    _export({ target: 'Math', stat: true }, { log1p: mathLog1p });

    var log$8 = Math.log;
    var LN2$1 = Math.LN2;

    // `Math.log2` method
    // https://tc39.github.io/ecma262/#sec-math.log2
    _export({ target: 'Math', stat: true }, {
      log2: function log2(x) {
        return log$8(x) / LN2$1;
      }
    });

    // `Math.sign` method
    // https://tc39.github.io/ecma262/#sec-math.sign
    _export({ target: 'Math', stat: true }, {
      sign: mathSign
    });

    var abs$5 = Math.abs;
    var exp$1 = Math.exp;
    var E$1 = Math.E;

    var FORCED$b = fails(function () {
      return Math.sinh(-2e-17) != -2e-17;
    });

    // `Math.sinh` method
    // https://tc39.github.io/ecma262/#sec-math.sinh
    // V8 near Chromium 38 has a problem with very small numbers
    _export({ target: 'Math', stat: true, forced: FORCED$b }, {
      sinh: function sinh(x) {
        return abs$5(x = +x) < 1 ? (mathExpm1(x) - mathExpm1(-x)) / 2 : (exp$1(x - 1) - exp$1(-x - 1)) * (E$1 / 2);
      }
    });

    var exp$2 = Math.exp;

    // `Math.tanh` method
    // https://tc39.github.io/ecma262/#sec-math.tanh
    _export({ target: 'Math', stat: true }, {
      tanh: function tanh(x) {
        var a = mathExpm1(x = +x);
        var b = mathExpm1(-x);
        return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp$2(x) + exp$2(-x));
      }
    });

    // Math[@@toStringTag] property
    // https://tc39.github.io/ecma262/#sec-math-@@tostringtag
    setToStringTag(Math, 'Math', true);

    var ceil$2 = Math.ceil;
    var floor$4 = Math.floor;

    // `Math.trunc` method
    // https://tc39.github.io/ecma262/#sec-math.trunc
    _export({ target: 'Math', stat: true }, {
      trunc: function trunc(it) {
        return (it > 0 ? floor$4 : ceil$2)(it);
      }
    });

    // `Date.now` method
    // https://tc39.github.io/ecma262/#sec-date.now
    _export({ target: 'Date', stat: true }, {
      now: function now() {
        return new Date().getTime();
      }
    });

    var padStart = stringPad.start;

    var abs$6 = Math.abs;
    var DatePrototype = Date.prototype;
    var getTime = DatePrototype.getTime;
    var nativeDateToISOString = DatePrototype.toISOString;

    // `Date.prototype.toISOString` method implementation
    // https://tc39.github.io/ecma262/#sec-date.prototype.toisostring
    // PhantomJS / old WebKit fails here:
    var dateToIsoString = (fails(function () {
      return nativeDateToISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
    }) || !fails(function () {
      nativeDateToISOString.call(new Date(NaN));
    })) ? function toISOString() {
      if (!isFinite(getTime.call(this))) { throw RangeError('Invalid time value'); }
      var date = this;
      var year = date.getUTCFullYear();
      var milliseconds = date.getUTCMilliseconds();
      var sign = year < 0 ? '-' : year > 9999 ? '+' : '';
      return sign + padStart(abs$6(year), sign ? 6 : 4, 0) +
        '-' + padStart(date.getUTCMonth() + 1, 2, 0) +
        '-' + padStart(date.getUTCDate(), 2, 0) +
        'T' + padStart(date.getUTCHours(), 2, 0) +
        ':' + padStart(date.getUTCMinutes(), 2, 0) +
        ':' + padStart(date.getUTCSeconds(), 2, 0) +
        '.' + padStart(milliseconds, 3, 0) +
        'Z';
    } : nativeDateToISOString;

    var FORCED$c = fails(function () {
      return new Date(NaN).toJSON() !== null
        || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
    });

    _export({ target: 'Date', proto: true, forced: FORCED$c }, {
      // eslint-disable-next-line no-unused-vars
      toJSON: function toJSON(key) {
        var O = toObject(this);
        var pv = toPrimitive(O);
        return typeof pv == 'number' && !isFinite(pv) ? null :
          (!('toISOString' in O) && classofRaw(O) == 'Date') ? dateToIsoString.call(O) : O.toISOString();
      }
    });

    // `Date.prototype.toISOString` method
    // https://tc39.github.io/ecma262/#sec-date.prototype.toisostring
    // PhantomJS / old WebKit has a broken implementations
    _export({ target: 'Date', proto: true, forced: Date.prototype.toISOString !== dateToIsoString }, {
      toISOString: dateToIsoString
    });

    // JSON[@@toStringTag] property
    // https://tc39.github.io/ecma262/#sec-json-@@tostringtag
    setToStringTag(global_1.JSON, 'JSON', true);

    var redefineAll = function (target, src, options) {
      for (var key in src) {
        if (options && options.unsafe && target[key]) { target[key] = src[key]; }
        else { redefine(target, key, src[key], options); }
      } return target;
    };

    var anInstance = function (it, Constructor, name) {
      if (!(it instanceof Constructor)) {
        throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
      } return it;
    };

    var location = global_1.location;
    var set$1 = global_1.setImmediate;
    var clear = global_1.clearImmediate;
    var process$1 = global_1.process;
    var MessageChannel = global_1.MessageChannel;
    var Dispatch = global_1.Dispatch;
    var counter = 0;
    var queue = {};
    var ONREADYSTATECHANGE = 'onreadystatechange';
    var defer, channel, port;

    var run = function (id) {
      // eslint-disable-next-line no-prototype-builtins
      if (queue.hasOwnProperty(id)) {
        var fn = queue[id];
        delete queue[id];
        fn();
      }
    };

    var runner = function (id) {
      return function () {
        run(id);
      };
    };

    var listener = function (event) {
      run(event.data);
    };

    var post = function (id) {
      // old engines have not location.origin
      global_1.postMessage(id + '', location.protocol + '//' + location.host);
    };

    // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
    if (!set$1 || !clear) {
      set$1 = function setImmediate(fn) {
        var arguments$1 = arguments;

        var args = [];
        var i = 1;
        while (arguments.length > i) { args.push(arguments$1[i++]); }
        queue[++counter] = function () {
          // eslint-disable-next-line no-new-func
          (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
        };
        defer(counter);
        return counter;
      };
      clear = function clearImmediate(id) {
        delete queue[id];
      };
      // Node.js 0.8-
      if (classofRaw(process$1) == 'process') {
        defer = function (id) {
          process$1.nextTick(runner(id));
        };
      // Sphere (JS game engine) Dispatch API
      } else if (Dispatch && Dispatch.now) {
        defer = function (id) {
          Dispatch.now(runner(id));
        };
      // Browsers with MessageChannel, includes WebWorkers
      } else if (MessageChannel) {
        channel = new MessageChannel();
        port = channel.port2;
        channel.port1.onmessage = listener;
        defer = bindContext(port.postMessage, port, 1);
      // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
      } else if (global_1.addEventListener && typeof postMessage == 'function' && !global_1.importScripts && !fails(post)) {
        defer = post;
        global_1.addEventListener('message', listener, false);
      // IE8-
      } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
        defer = function (id) {
          html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
            html.removeChild(this);
            run(id);
          };
        };
      // Rest old browsers
      } else {
        defer = function (id) {
          setTimeout(runner(id), 0);
        };
      }
    }

    var task = {
      set: set$1,
      clear: clear
    };

    var getOwnPropertyDescriptor$4 = objectGetOwnPropertyDescriptor.f;

    var macrotask = task.set;


    var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
    var process$2 = global_1.process;
    var Promise = global_1.Promise;
    var IS_NODE = classofRaw(process$2) == 'process';
    // Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
    var queueMicrotaskDescriptor = getOwnPropertyDescriptor$4(global_1, 'queueMicrotask');
    var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

    var flush, head, last, notify, toggle, node$1, promise;

    // modern engines have queueMicrotask method
    if (!queueMicrotask) {
      flush = function () {
        var parent, fn;
        if (IS_NODE && (parent = process$2.domain)) { parent.exit(); }
        while (head) {
          fn = head.fn;
          head = head.next;
          try {
            fn();
          } catch (error) {
            if (head) { notify(); }
            else { last = undefined; }
            throw error;
          }
        } last = undefined;
        if (parent) { parent.enter(); }
      };

      // Node.js
      if (IS_NODE) {
        notify = function () {
          process$2.nextTick(flush);
        };
      // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
      } else if (MutationObserver && !/(iphone|ipod|ipad).*applewebkit/i.test(userAgent)) {
        toggle = true;
        node$1 = document.createTextNode('');
        new MutationObserver(flush).observe(node$1, { characterData: true }); // eslint-disable-line no-new
        notify = function () {
          node$1.data = toggle = !toggle;
        };
      // environments with maybe non-completely correct, but existent Promise
      } else if (Promise && Promise.resolve) {
        // Promise.resolve without an argument throws an error in LG WebOS 2
        promise = Promise.resolve(undefined);
        notify = function () {
          promise.then(flush);
        };
      // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessag
      // - onreadystatechange
      // - setTimeout
      } else {
        notify = function () {
          // strange IE + webpack dev server bug - use .call(global)
          macrotask.call(global_1, flush);
        };
      }
    }

    var microtask = queueMicrotask || function (fn) {
      var task = { fn: fn, next: undefined };
      if (last) { last.next = task; }
      if (!head) {
        head = task;
        notify();
      } last = task;
    };

    var PromiseCapability = function (C) {
      var resolve, reject;
      this.promise = new C(function ($$resolve, $$reject) {
        if (resolve !== undefined || reject !== undefined) { throw TypeError('Bad Promise constructor'); }
        resolve = $$resolve;
        reject = $$reject;
      });
      this.resolve = aFunction(resolve);
      this.reject = aFunction(reject);
    };

    // 25.4.1.5 NewPromiseCapability(C)
    var f$7 = function (C) {
      return new PromiseCapability(C);
    };

    var newPromiseCapability = {
    	f: f$7
    };

    var promiseResolve = function (C, x) {
      anObject(C);
      if (isObject(x) && x.constructor === C) { return x; }
      var promiseCapability = newPromiseCapability.f(C);
      var resolve = promiseCapability.resolve;
      resolve(x);
      return promiseCapability.promise;
    };

    var hostReportErrors = function (a, b) {
      var console = global_1.console;
      if (console && console.error) {
        arguments.length === 1 ? console.error(a) : console.error(a, b);
      }
    };

    var perform = function (exec) {
      try {
        return { error: false, value: exec() };
      } catch (error) {
        return { error: true, value: error };
      }
    };

    var task$1 = task.set;










    var SPECIES$5 = wellKnownSymbol('species');
    var PROMISE = 'Promise';
    var getInternalState$4 = internalState.get;
    var setInternalState$4 = internalState.set;
    var getInternalPromiseState = internalState.getterFor(PROMISE);
    var PromiseConstructor = global_1[PROMISE];
    var TypeError$1 = global_1.TypeError;
    var document$2 = global_1.document;
    var process$3 = global_1.process;
    var $fetch = global_1.fetch;
    var versions = process$3 && process$3.versions;
    var v8 = versions && versions.v8 || '';
    var newPromiseCapability$1 = newPromiseCapability.f;
    var newGenericPromiseCapability = newPromiseCapability$1;
    var IS_NODE$1 = classofRaw(process$3) == 'process';
    var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
    var UNHANDLED_REJECTION = 'unhandledrejection';
    var REJECTION_HANDLED = 'rejectionhandled';
    var PENDING = 0;
    var FULFILLED = 1;
    var REJECTED = 2;
    var HANDLED = 1;
    var UNHANDLED = 2;
    var Internal, OwnPromiseCapability, PromiseWrapper;

    var FORCED$d = isForced_1(PROMISE, function () {
      // correct subclassing with @@species support
      var promise = PromiseConstructor.resolve(1);
      var empty = function () { /* empty */ };
      var FakePromise = (promise.constructor = {})[SPECIES$5] = function (exec) {
        exec(empty, empty);
      };
      // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
      return !((IS_NODE$1 || typeof PromiseRejectionEvent == 'function')
        && ( promise['finally'])
        && promise.then(empty) instanceof FakePromise
        // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
        // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
        // we can't detect it synchronously, so just check versions
        && v8.indexOf('6.6') !== 0
        && userAgent.indexOf('Chrome/66') === -1);
    });

    var INCORRECT_ITERATION$1 = FORCED$d || !checkCorrectnessOfIteration(function (iterable) {
      PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
    });

    // helpers
    var isThenable = function (it) {
      var then;
      return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
    };

    var notify$1 = function (promise, state, isReject) {
      if (state.notified) { return; }
      state.notified = true;
      var chain = state.reactions;
      microtask(function () {
        var value = state.value;
        var ok = state.state == FULFILLED;
        var index = 0;
        // variable length - can't use forEach
        while (chain.length > index) {
          var reaction = chain[index++];
          var handler = ok ? reaction.ok : reaction.fail;
          var resolve = reaction.resolve;
          var reject = reaction.reject;
          var domain = reaction.domain;
          var result, then, exited;
          try {
            if (handler) {
              if (!ok) {
                if (state.rejection === UNHANDLED) { onHandleUnhandled(promise, state); }
                state.rejection = HANDLED;
              }
              if (handler === true) { result = value; }
              else {
                if (domain) { domain.enter(); }
                result = handler(value); // can throw
                if (domain) {
                  domain.exit();
                  exited = true;
                }
              }
              if (result === reaction.promise) {
                reject(TypeError$1('Promise-chain cycle'));
              } else if (then = isThenable(result)) {
                then.call(result, resolve, reject);
              } else { resolve(result); }
            } else { reject(value); }
          } catch (error) {
            if (domain && !exited) { domain.exit(); }
            reject(error);
          }
        }
        state.reactions = [];
        state.notified = false;
        if (isReject && !state.rejection) { onUnhandled(promise, state); }
      });
    };

    var dispatchEvent = function (name, promise, reason) {
      var event, handler;
      if (DISPATCH_EVENT) {
        event = document$2.createEvent('Event');
        event.promise = promise;
        event.reason = reason;
        event.initEvent(name, false, true);
        global_1.dispatchEvent(event);
      } else { event = { promise: promise, reason: reason }; }
      if (handler = global_1['on' + name]) { handler(event); }
      else if (name === UNHANDLED_REJECTION) { hostReportErrors('Unhandled promise rejection', reason); }
    };

    var onUnhandled = function (promise, state) {
      task$1.call(global_1, function () {
        var value = state.value;
        var IS_UNHANDLED = isUnhandled(state);
        var result;
        if (IS_UNHANDLED) {
          result = perform(function () {
            if (IS_NODE$1) {
              process$3.emit('unhandledRejection', value, promise);
            } else { dispatchEvent(UNHANDLED_REJECTION, promise, value); }
          });
          // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
          state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
          if (result.error) { throw result.value; }
        }
      });
    };

    var isUnhandled = function (state) {
      return state.rejection !== HANDLED && !state.parent;
    };

    var onHandleUnhandled = function (promise, state) {
      task$1.call(global_1, function () {
        if (IS_NODE$1) {
          process$3.emit('rejectionHandled', promise);
        } else { dispatchEvent(REJECTION_HANDLED, promise, state.value); }
      });
    };

    var bind = function (fn, promise, state, unwrap) {
      return function (value) {
        fn(promise, state, value, unwrap);
      };
    };

    var internalReject = function (promise, state, value, unwrap) {
      if (state.done) { return; }
      state.done = true;
      if (unwrap) { state = unwrap; }
      state.value = value;
      state.state = REJECTED;
      notify$1(promise, state, true);
    };

    var internalResolve = function (promise, state, value, unwrap) {
      if (state.done) { return; }
      state.done = true;
      if (unwrap) { state = unwrap; }
      try {
        if (promise === value) { throw TypeError$1("Promise can't be resolved itself"); }
        var then = isThenable(value);
        if (then) {
          microtask(function () {
            var wrapper = { done: false };
            try {
              then.call(value,
                bind(internalResolve, promise, wrapper, state),
                bind(internalReject, promise, wrapper, state)
              );
            } catch (error) {
              internalReject(promise, wrapper, error, state);
            }
          });
        } else {
          state.value = value;
          state.state = FULFILLED;
          notify$1(promise, state, false);
        }
      } catch (error) {
        internalReject(promise, { done: false }, error, state);
      }
    };

    // constructor polyfill
    if (FORCED$d) {
      // 25.4.3.1 Promise(executor)
      PromiseConstructor = function Promise(executor) {
        anInstance(this, PromiseConstructor, PROMISE);
        aFunction(executor);
        Internal.call(this);
        var state = getInternalState$4(this);
        try {
          executor(bind(internalResolve, this, state), bind(internalReject, this, state));
        } catch (error) {
          internalReject(this, state, error);
        }
      };
      // eslint-disable-next-line no-unused-vars
      Internal = function Promise(executor) {
        setInternalState$4(this, {
          type: PROMISE,
          done: false,
          notified: false,
          parent: false,
          reactions: [],
          rejection: false,
          state: PENDING,
          value: undefined
        });
      };
      Internal.prototype = redefineAll(PromiseConstructor.prototype, {
        // `Promise.prototype.then` method
        // https://tc39.github.io/ecma262/#sec-promise.prototype.then
        then: function then(onFulfilled, onRejected) {
          var state = getInternalPromiseState(this);
          var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
          reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
          reaction.fail = typeof onRejected == 'function' && onRejected;
          reaction.domain = IS_NODE$1 ? process$3.domain : undefined;
          state.parent = true;
          state.reactions.push(reaction);
          if (state.state != PENDING) { notify$1(this, state, false); }
          return reaction.promise;
        },
        // `Promise.prototype.catch` method
        // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
        'catch': function (onRejected) {
          return this.then(undefined, onRejected);
        }
      });
      OwnPromiseCapability = function () {
        var promise = new Internal();
        var state = getInternalState$4(promise);
        this.promise = promise;
        this.resolve = bind(internalResolve, promise, state);
        this.reject = bind(internalReject, promise, state);
      };
      newPromiseCapability.f = newPromiseCapability$1 = function (C) {
        return C === PromiseConstructor || C === PromiseWrapper
          ? new OwnPromiseCapability(C)
          : newGenericPromiseCapability(C);
      };
    }

    _export({ global: true, wrap: true, forced: FORCED$d }, {
      Promise: PromiseConstructor
    });

    setToStringTag(PromiseConstructor, PROMISE, false, true);
    setSpecies(PROMISE);

    PromiseWrapper = path[PROMISE];

    // statics
    _export({ target: PROMISE, stat: true, forced: FORCED$d }, {
      // `Promise.reject` method
      // https://tc39.github.io/ecma262/#sec-promise.reject
      reject: function reject(r) {
        var capability = newPromiseCapability$1(this);
        capability.reject.call(undefined, r);
        return capability.promise;
      }
    });

    _export({ target: PROMISE, stat: true, forced: isPure  }, {
      // `Promise.resolve` method
      // https://tc39.github.io/ecma262/#sec-promise.resolve
      resolve: function resolve(x) {
        return promiseResolve( this === PromiseWrapper ? PromiseConstructor : this, x);
      }
    });

    _export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION$1 }, {
      // `Promise.all` method
      // https://tc39.github.io/ecma262/#sec-promise.all
      all: function all(iterable) {
        var C = this;
        var capability = newPromiseCapability$1(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function () {
          var $promiseResolve = aFunction(C.resolve);
          var values = [];
          var counter = 0;
          var remaining = 1;
          iterate_1(iterable, function (promise) {
            var index = counter++;
            var alreadyCalled = false;
            values.push(undefined);
            remaining++;
            $promiseResolve.call(C, promise).then(function (value) {
              if (alreadyCalled) { return; }
              alreadyCalled = true;
              values[index] = value;
              --remaining || resolve(values);
            }, reject);
          });
          --remaining || resolve(values);
        });
        if (result.error) { reject(result.value); }
        return capability.promise;
      },
      // `Promise.race` method
      // https://tc39.github.io/ecma262/#sec-promise.race
      race: function race(iterable) {
        var C = this;
        var capability = newPromiseCapability$1(C);
        var reject = capability.reject;
        var result = perform(function () {
          var $promiseResolve = aFunction(C.resolve);
          iterate_1(iterable, function (promise) {
            $promiseResolve.call(C, promise).then(capability.resolve, reject);
          });
        });
        if (result.error) { reject(result.value); }
        return capability.promise;
      }
    });

    // `Promise.prototype.finally` method
    // https://tc39.github.io/ecma262/#sec-promise.prototype.finally
    _export({ target: 'Promise', proto: true, real: true }, {
      'finally': function (onFinally) {
        var C = speciesConstructor(this, getBuiltIn('Promise'));
        var isFunction = typeof onFinally == 'function';
        return this.then(
          isFunction ? function (x) {
            return promiseResolve(C, onFinally()).then(function () { return x; });
          } : onFinally,
          isFunction ? function (e) {
            return promiseResolve(C, onFinally()).then(function () { throw e; });
          } : onFinally
        );
      }
    });

    var defineProperty$2 = objectDefineProperty.f;
    var forEach = arrayIteration.forEach;



    var setInternalState$5 = internalState.set;
    var internalStateGetterFor = internalState.getterFor;

    var collection = function (CONSTRUCTOR_NAME, wrapper, common, IS_MAP, IS_WEAK) {
      var NativeConstructor = global_1[CONSTRUCTOR_NAME];
      var NativePrototype = NativeConstructor && NativeConstructor.prototype;
      var ADDER = IS_MAP ? 'set' : 'add';
      var exported = {};
      var Constructor;

      if (!descriptors || typeof NativeConstructor != 'function'
        || !(IS_WEAK || NativePrototype.forEach && !fails(function () { new NativeConstructor().entries().next(); }))
      ) {
        // create collection constructor
        Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
        internalMetadata.REQUIRED = true;
      } else {
        Constructor = wrapper(function (target, iterable) {
          setInternalState$5(anInstance(target, Constructor, CONSTRUCTOR_NAME), {
            type: CONSTRUCTOR_NAME,
            collection: new NativeConstructor()
          });
          if (iterable != undefined) { iterate_1(iterable, target[ADDER], target, IS_MAP); }
        });

        var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

        forEach(['add', 'clear', 'delete', 'forEach', 'get', 'has', 'set', 'keys', 'values', 'entries'], function (KEY) {
          var IS_ADDER = KEY == 'add' || KEY == 'set';
          if (KEY in NativePrototype && !(IS_WEAK && KEY == 'clear')) { hide(Constructor.prototype, KEY, function (a, b) {
            var collection = getInternalState(this).collection;
            if (!IS_ADDER && IS_WEAK && !isObject(a)) { return KEY == 'get' ? undefined : false; }
            var result = collection[KEY](a === 0 ? 0 : a, b);
            return IS_ADDER ? this : result;
          }); }
        });

        IS_WEAK || defineProperty$2(Constructor.prototype, 'size', {
          get: function () {
            return getInternalState(this).collection.size;
          }
        });
      }

      setToStringTag(Constructor, CONSTRUCTOR_NAME, false, true);

      exported[CONSTRUCTOR_NAME] = Constructor;
      _export({ global: true, forced: true }, exported);

      if (!IS_WEAK) { common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP); }

      return Constructor;
    };

    var defineProperty$3 = objectDefineProperty.f;








    var fastKey = internalMetadata.fastKey;


    var setInternalState$6 = internalState.set;
    var internalStateGetterFor$1 = internalState.getterFor;

    var collectionStrong = {
      getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
        var C = wrapper(function (that, iterable) {
          anInstance(that, C, CONSTRUCTOR_NAME);
          setInternalState$6(that, {
            type: CONSTRUCTOR_NAME,
            index: objectCreate(null),
            first: undefined,
            last: undefined,
            size: 0
          });
          if (!descriptors) { that.size = 0; }
          if (iterable != undefined) { iterate_1(iterable, that[ADDER], that, IS_MAP); }
        });

        var getInternalState = internalStateGetterFor$1(CONSTRUCTOR_NAME);

        var define = function (that, key, value) {
          var state = getInternalState(that);
          var entry = getEntry(that, key);
          var previous, index;
          // change existing entry
          if (entry) {
            entry.value = value;
          // create new entry
          } else {
            state.last = entry = {
              index: index = fastKey(key, true),
              key: key,
              value: value,
              previous: previous = state.last,
              next: undefined,
              removed: false
            };
            if (!state.first) { state.first = entry; }
            if (previous) { previous.next = entry; }
            if (descriptors) { state.size++; }
            else { that.size++; }
            // add to index
            if (index !== 'F') { state.index[index] = entry; }
          } return that;
        };

        var getEntry = function (that, key) {
          var state = getInternalState(that);
          // fast case
          var index = fastKey(key);
          var entry;
          if (index !== 'F') { return state.index[index]; }
          // frozen object case
          for (entry = state.first; entry; entry = entry.next) {
            if (entry.key == key) { return entry; }
          }
        };

        redefineAll(C.prototype, {
          // 23.1.3.1 Map.prototype.clear()
          // 23.2.3.2 Set.prototype.clear()
          clear: function clear() {
            var that = this;
            var state = getInternalState(that);
            var data = state.index;
            var entry = state.first;
            while (entry) {
              entry.removed = true;
              if (entry.previous) { entry.previous = entry.previous.next = undefined; }
              delete data[entry.index];
              entry = entry.next;
            }
            state.first = state.last = undefined;
            if (descriptors) { state.size = 0; }
            else { that.size = 0; }
          },
          // 23.1.3.3 Map.prototype.delete(key)
          // 23.2.3.4 Set.prototype.delete(value)
          'delete': function (key) {
            var that = this;
            var state = getInternalState(that);
            var entry = getEntry(that, key);
            if (entry) {
              var next = entry.next;
              var prev = entry.previous;
              delete state.index[entry.index];
              entry.removed = true;
              if (prev) { prev.next = next; }
              if (next) { next.previous = prev; }
              if (state.first == entry) { state.first = next; }
              if (state.last == entry) { state.last = prev; }
              if (descriptors) { state.size--; }
              else { that.size--; }
            } return !!entry;
          },
          // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
          // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
          forEach: function forEach(callbackfn /* , that = undefined */) {
            var state = getInternalState(this);
            var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
            var entry;
            while (entry = entry ? entry.next : state.first) {
              boundFunction(entry.value, entry.key, this);
              // revert to the last existing entry
              while (entry && entry.removed) { entry = entry.previous; }
            }
          },
          // 23.1.3.7 Map.prototype.has(key)
          // 23.2.3.7 Set.prototype.has(value)
          has: function has(key) {
            return !!getEntry(this, key);
          }
        });

        redefineAll(C.prototype, IS_MAP ? {
          // 23.1.3.6 Map.prototype.get(key)
          get: function get(key) {
            var entry = getEntry(this, key);
            return entry && entry.value;
          },
          // 23.1.3.9 Map.prototype.set(key, value)
          set: function set(key, value) {
            return define(this, key === 0 ? 0 : key, value);
          }
        } : {
          // 23.2.3.1 Set.prototype.add(value)
          add: function add(value) {
            return define(this, value = value === 0 ? 0 : value, value);
          }
        });
        if (descriptors) { defineProperty$3(C.prototype, 'size', {
          get: function () {
            return getInternalState(this).size;
          }
        }); }
        return C;
      },
      setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
        var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
        var getInternalCollectionState = internalStateGetterFor$1(CONSTRUCTOR_NAME);
        var getInternalIteratorState = internalStateGetterFor$1(ITERATOR_NAME);
        // add .keys, .values, .entries, [@@iterator]
        // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
        defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
          setInternalState$6(this, {
            type: ITERATOR_NAME,
            target: iterated,
            state: getInternalCollectionState(iterated),
            kind: kind,
            last: undefined
          });
        }, function () {
          var state = getInternalIteratorState(this);
          var kind = state.kind;
          var entry = state.last;
          // revert to the last existing entry
          while (entry && entry.removed) { entry = entry.previous; }
          // get next entry
          if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
            // or finish the iteration
            state.target = undefined;
            return { value: undefined, done: true };
          }
          // return step by kind
          if (kind == 'keys') { return { value: entry.key, done: false }; }
          if (kind == 'values') { return { value: entry.value, done: false }; }
          return { value: [entry.key, entry.value], done: false };
        }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

        // add [@@species], 23.1.2.2, 23.2.2.2
        setSpecies(CONSTRUCTOR_NAME);
      }
    };

    // `Map` constructor
    // https://tc39.github.io/ecma262/#sec-map-objects
    var es_map = collection('Map', function (get) {
      return function Map() { return get(this, arguments.length ? arguments[0] : undefined); };
    }, collectionStrong, true);

    // `Set` constructor
    // https://tc39.github.io/ecma262/#sec-set-objects
    var es_set = collection('Set', function (get) {
      return function Set() { return get(this, arguments.length ? arguments[0] : undefined); };
    }, collectionStrong);

    var getWeakData = internalMetadata.getWeakData;








    var setInternalState$7 = internalState.set;
    var internalStateGetterFor$2 = internalState.getterFor;
    var find = arrayIteration.find;
    var findIndex = arrayIteration.findIndex;
    var id$1 = 0;

    // fallback for uncaught frozen keys
    var uncaughtFrozenStore = function (store) {
      return store.frozen || (store.frozen = new UncaughtFrozenStore());
    };

    var UncaughtFrozenStore = function () {
      this.entries = [];
    };

    var findUncaughtFrozen = function (store, key) {
      return find(store.entries, function (it) {
        return it[0] === key;
      });
    };

    UncaughtFrozenStore.prototype = {
      get: function (key) {
        var entry = findUncaughtFrozen(this, key);
        if (entry) { return entry[1]; }
      },
      has: function (key) {
        return !!findUncaughtFrozen(this, key);
      },
      set: function (key, value) {
        var entry = findUncaughtFrozen(this, key);
        if (entry) { entry[1] = value; }
        else { this.entries.push([key, value]); }
      },
      'delete': function (key) {
        var index = findIndex(this.entries, function (it) {
          return it[0] === key;
        });
        if (~index) { this.entries.splice(index, 1); }
        return !!~index;
      }
    };

    var collectionWeak = {
      getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
        var C = wrapper(function (that, iterable) {
          anInstance(that, C, CONSTRUCTOR_NAME);
          setInternalState$7(that, {
            type: CONSTRUCTOR_NAME,
            id: id$1++,
            frozen: undefined
          });
          if (iterable != undefined) { iterate_1(iterable, that[ADDER], that, IS_MAP); }
        });

        var getInternalState = internalStateGetterFor$2(CONSTRUCTOR_NAME);

        var define = function (that, key, value) {
          var state = getInternalState(that);
          var data = getWeakData(anObject(key), true);
          if (data === true) { uncaughtFrozenStore(state).set(key, value); }
          else { data[state.id] = value; }
          return that;
        };

        redefineAll(C.prototype, {
          // 23.3.3.2 WeakMap.prototype.delete(key)
          // 23.4.3.3 WeakSet.prototype.delete(value)
          'delete': function (key) {
            var state = getInternalState(this);
            if (!isObject(key)) { return false; }
            var data = getWeakData(key);
            if (data === true) { return uncaughtFrozenStore(state)['delete'](key); }
            return data && has(data, state.id) && delete data[state.id];
          },
          // 23.3.3.4 WeakMap.prototype.has(key)
          // 23.4.3.4 WeakSet.prototype.has(value)
          has: function has$1(key) {
            var state = getInternalState(this);
            if (!isObject(key)) { return false; }
            var data = getWeakData(key);
            if (data === true) { return uncaughtFrozenStore(state).has(key); }
            return data && has(data, state.id);
          }
        });

        redefineAll(C.prototype, IS_MAP ? {
          // 23.3.3.3 WeakMap.prototype.get(key)
          get: function get(key) {
            var state = getInternalState(this);
            if (isObject(key)) {
              var data = getWeakData(key);
              if (data === true) { return uncaughtFrozenStore(state).get(key); }
              return data ? data[state.id] : undefined;
            }
          },
          // 23.3.3.5 WeakMap.prototype.set(key, value)
          set: function set(key, value) {
            return define(this, key, value);
          }
        } : {
          // 23.4.3.1 WeakSet.prototype.add(value)
          add: function add(value) {
            return define(this, value, true);
          }
        });

        return C;
      }
    };

    var es_weakMap = createCommonjsModule(function (module) {






    var enforceIternalState = internalState.enforce;


    var IS_IE11 = !global_1.ActiveXObject && 'ActiveXObject' in global_1;
    var isExtensible = Object.isExtensible;
    var InternalWeakMap;

    var wrapper = function (get) {
      return function WeakMap() {
        return get(this, arguments.length ? arguments[0] : undefined);
      };
    };

    // `WeakMap` constructor
    // https://tc39.github.io/ecma262/#sec-weakmap-constructor
    var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak, true, true);

    // IE11 WeakMap frozen keys fix
    // We can't use feature detection because it crash some old IE builds
    // https://github.com/zloirock/core-js/issues/485
    if (nativeWeakMap && IS_IE11) {
      InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
      internalMetadata.REQUIRED = true;
      var WeakMapPrototype = $WeakMap.prototype;
      var nativeDelete = WeakMapPrototype['delete'];
      var nativeHas = WeakMapPrototype.has;
      var nativeGet = WeakMapPrototype.get;
      var nativeSet = WeakMapPrototype.set;
      redefineAll(WeakMapPrototype, {
        'delete': function (key) {
          if (isObject(key) && !isExtensible(key)) {
            var state = enforceIternalState(this);
            if (!state.frozen) { state.frozen = new InternalWeakMap(); }
            return nativeDelete.call(this, key) || state.frozen['delete'](key);
          } return nativeDelete.call(this, key);
        },
        has: function has(key) {
          if (isObject(key) && !isExtensible(key)) {
            var state = enforceIternalState(this);
            if (!state.frozen) { state.frozen = new InternalWeakMap(); }
            return nativeHas.call(this, key) || state.frozen.has(key);
          } return nativeHas.call(this, key);
        },
        get: function get(key) {
          if (isObject(key) && !isExtensible(key)) {
            var state = enforceIternalState(this);
            if (!state.frozen) { state.frozen = new InternalWeakMap(); }
            return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
          } return nativeGet.call(this, key);
        },
        set: function set(key, value) {
          if (isObject(key) && !isExtensible(key)) {
            var state = enforceIternalState(this);
            if (!state.frozen) { state.frozen = new InternalWeakMap(); }
            nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
          } else { nativeSet.call(this, key, value); }
          return this;
        }
      });
    }
    });

    // `WeakSet` constructor
    // https://tc39.github.io/ecma262/#sec-weakset-constructor
    collection('WeakSet', function (get) {
      return function WeakSet() { return get(this, arguments.length ? arguments[0] : undefined); };
    }, collectionWeak, false, true);

    var nativeApply = getBuiltIn('Reflect', 'apply');
    var functionApply = Function.apply;

    // MS Edge argumentsList argument is optional
    var OPTIONAL_ARGUMENTS_LIST = !fails(function () {
      nativeApply(function () { /* empty */ });
    });

    // `Reflect.apply` method
    // https://tc39.github.io/ecma262/#sec-reflect.apply
    _export({ target: 'Reflect', stat: true, forced: OPTIONAL_ARGUMENTS_LIST }, {
      apply: function apply(target, thisArgument, argumentsList) {
        aFunction(target);
        anObject(argumentsList);
        return nativeApply
          ? nativeApply(target, thisArgument, argumentsList)
          : functionApply.call(target, thisArgument, argumentsList);
      }
    });

    var nativeConstruct = getBuiltIn('Reflect', 'construct');

    // `Reflect.construct` method
    // https://tc39.github.io/ecma262/#sec-reflect.construct
    // MS Edge supports only 2 arguments and argumentsList argument is optional
    // FF Nightly sets third argument as `new.target`, but does not create `this` from it
    var NEW_TARGET_BUG = fails(function () {
      function F() { /* empty */ }
      return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
    });
    var ARGS_BUG = !fails(function () {
      nativeConstruct(function () { /* empty */ });
    });
    var FORCED$e = NEW_TARGET_BUG || ARGS_BUG;

    _export({ target: 'Reflect', stat: true, forced: FORCED$e, sham: FORCED$e }, {
      construct: function construct(Target, args /* , newTarget */) {
        aFunction(Target);
        anObject(args);
        var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
        if (ARGS_BUG && !NEW_TARGET_BUG) { return nativeConstruct(Target, args, newTarget); }
        if (Target == newTarget) {
          // w/o altered newTarget, optimization for 0-4 arguments
          switch (args.length) {
            case 0: return new Target();
            case 1: return new Target(args[0]);
            case 2: return new Target(args[0], args[1]);
            case 3: return new Target(args[0], args[1], args[2]);
            case 4: return new Target(args[0], args[1], args[2], args[3]);
          }
          // w/o altered newTarget, lot of arguments case
          var $args = [null];
          $args.push.apply($args, args);
          return new (functionBind.apply(Target, $args))();
        }
        // with altered newTarget, not support built-in constructors
        var proto = newTarget.prototype;
        var instance = objectCreate(isObject(proto) ? proto : Object.prototype);
        var result = Function.apply.call(Target, instance, args);
        return isObject(result) ? result : instance;
      }
    });

    // MS Edge has broken Reflect.defineProperty - throwing instead of returning false
    var ERROR_INSTEAD_OF_FALSE = fails(function () {
      // eslint-disable-next-line no-undef
      Reflect.defineProperty(objectDefineProperty.f({}, 1, { value: 1 }), 1, { value: 2 });
    });

    // `Reflect.defineProperty` method
    // https://tc39.github.io/ecma262/#sec-reflect.defineproperty
    _export({ target: 'Reflect', stat: true, forced: ERROR_INSTEAD_OF_FALSE, sham: !descriptors }, {
      defineProperty: function defineProperty(target, propertyKey, attributes) {
        anObject(target);
        var key = toPrimitive(propertyKey, true);
        anObject(attributes);
        try {
          objectDefineProperty.f(target, key, attributes);
          return true;
        } catch (error) {
          return false;
        }
      }
    });

    var getOwnPropertyDescriptor$5 = objectGetOwnPropertyDescriptor.f;

    // `Reflect.deleteProperty` method
    // https://tc39.github.io/ecma262/#sec-reflect.deleteproperty
    _export({ target: 'Reflect', stat: true }, {
      deleteProperty: function deleteProperty(target, propertyKey) {
        var descriptor = getOwnPropertyDescriptor$5(anObject(target), propertyKey);
        return descriptor && !descriptor.configurable ? false : delete target[propertyKey];
      }
    });

    // `Reflect.get` method
    // https://tc39.github.io/ecma262/#sec-reflect.get
    function get$1(target, propertyKey /* , receiver */) {
      var receiver = arguments.length < 3 ? target : arguments[2];
      var descriptor, prototype;
      if (anObject(target) === receiver) { return target[propertyKey]; }
      if (descriptor = objectGetOwnPropertyDescriptor.f(target, propertyKey)) { return has(descriptor, 'value')
        ? descriptor.value
        : descriptor.get === undefined
          ? undefined
          : descriptor.get.call(receiver); }
      if (isObject(prototype = objectGetPrototypeOf(target))) { return get$1(prototype, propertyKey, receiver); }
    }

    _export({ target: 'Reflect', stat: true }, {
      get: get$1
    });

    // `Reflect.getOwnPropertyDescriptor` method
    // https://tc39.github.io/ecma262/#sec-reflect.getownpropertydescriptor
    _export({ target: 'Reflect', stat: true, sham: !descriptors }, {
      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
        return objectGetOwnPropertyDescriptor.f(anObject(target), propertyKey);
      }
    });

    // `Reflect.getPrototypeOf` method
    // https://tc39.github.io/ecma262/#sec-reflect.getprototypeof
    _export({ target: 'Reflect', stat: true, sham: !correctPrototypeGetter }, {
      getPrototypeOf: function getPrototypeOf(target) {
        return objectGetPrototypeOf(anObject(target));
      }
    });

    // `Reflect.has` method
    // https://tc39.github.io/ecma262/#sec-reflect.has
    _export({ target: 'Reflect', stat: true }, {
      has: function has(target, propertyKey) {
        return propertyKey in target;
      }
    });

    var objectIsExtensible = Object.isExtensible;

    // `Reflect.isExtensible` method
    // https://tc39.github.io/ecma262/#sec-reflect.isextensible
    _export({ target: 'Reflect', stat: true }, {
      isExtensible: function isExtensible(target) {
        anObject(target);
        return objectIsExtensible ? objectIsExtensible(target) : true;
      }
    });

    // `Reflect.ownKeys` method
    // https://tc39.github.io/ecma262/#sec-reflect.ownkeys
    _export({ target: 'Reflect', stat: true }, {
      ownKeys: ownKeys
    });

    // `Reflect.preventExtensions` method
    // https://tc39.github.io/ecma262/#sec-reflect.preventextensions
    _export({ target: 'Reflect', stat: true, sham: !freezing }, {
      preventExtensions: function preventExtensions(target) {
        anObject(target);
        try {
          var objectPreventExtensions = getBuiltIn('Object', 'preventExtensions');
          if (objectPreventExtensions) { objectPreventExtensions(target); }
          return true;
        } catch (error) {
          return false;
        }
      }
    });

    // `Reflect.set` method
    // https://tc39.github.io/ecma262/#sec-reflect.set
    function set$2(target, propertyKey, V /* , receiver */) {
      var receiver = arguments.length < 4 ? target : arguments[3];
      var ownDescriptor = objectGetOwnPropertyDescriptor.f(anObject(target), propertyKey);
      var existingDescriptor, prototype;
      if (!ownDescriptor) {
        if (isObject(prototype = objectGetPrototypeOf(target))) {
          return set$2(prototype, propertyKey, V, receiver);
        }
        ownDescriptor = createPropertyDescriptor(0);
      }
      if (has(ownDescriptor, 'value')) {
        if (ownDescriptor.writable === false || !isObject(receiver)) { return false; }
        if (existingDescriptor = objectGetOwnPropertyDescriptor.f(receiver, propertyKey)) {
          if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) { return false; }
          existingDescriptor.value = V;
          objectDefineProperty.f(receiver, propertyKey, existingDescriptor);
        } else { objectDefineProperty.f(receiver, propertyKey, createPropertyDescriptor(0, V)); }
        return true;
      }
      return ownDescriptor.set === undefined ? false : (ownDescriptor.set.call(receiver, V), true);
    }

    _export({ target: 'Reflect', stat: true }, {
      set: set$2
    });

    // `Reflect.setPrototypeOf` method
    // https://tc39.github.io/ecma262/#sec-reflect.setprototypeof
    if (objectSetPrototypeOf) { _export({ target: 'Reflect', stat: true }, {
      setPrototypeOf: function setPrototypeOf(target, proto) {
        anObject(target);
        aPossiblePrototype(proto);
        try {
          objectSetPrototypeOf(target, proto);
          return true;
        } catch (error) {
          return false;
        }
      }
    }); }

    // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`




    var metadata = shared('metadata');
    var store$2 = metadata.store || (metadata.store = new es_weakMap());

    var getOrCreateMetadataMap = function (target, targetKey, create) {
      var targetMetadata = store$2.get(target);
      if (!targetMetadata) {
        if (!create) { return; }
        store$2.set(target, targetMetadata = new es_map());
      }
      var keyMetadata = targetMetadata.get(targetKey);
      if (!keyMetadata) {
        if (!create) { return; }
        targetMetadata.set(targetKey, keyMetadata = new es_map());
      } return keyMetadata;
    };

    var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
      var metadataMap = getOrCreateMetadataMap(O, P, false);
      return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
    };

    var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
      var metadataMap = getOrCreateMetadataMap(O, P, false);
      return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
    };

    var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
      getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
    };

    var ordinaryOwnMetadataKeys = function (target, targetKey) {
      var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
      var keys = [];
      if (metadataMap) { metadataMap.forEach(function (_, key) { keys.push(key); }); }
      return keys;
    };

    var toMetadataKey = function (it) {
      return it === undefined || typeof it == 'symbol' ? it : String(it);
    };

    var reflectMetadata = {
      store: store$2,
      getMap: getOrCreateMetadataMap,
      has: ordinaryHasOwnMetadata,
      get: ordinaryGetOwnMetadata,
      set: ordinaryDefineOwnMetadata,
      keys: ordinaryOwnMetadataKeys,
      toKey: toMetadataKey
    };

    var toMetadataKey$1 = reflectMetadata.toKey;
    var ordinaryDefineOwnMetadata$1 = reflectMetadata.set;

    // `Reflect.defineMetadata` method
    // https://github.com/rbuckton/reflect-metadata
    _export({ target: 'Reflect', stat: true }, {
      defineMetadata: function defineMetadata(metadataKey, metadataValue, target /* , targetKey */) {
        var targetKey = arguments.length < 4 ? undefined : toMetadataKey$1(arguments[3]);
        ordinaryDefineOwnMetadata$1(metadataKey, metadataValue, anObject(target), targetKey);
      }
    });

    var toMetadataKey$2 = reflectMetadata.toKey;
    var getOrCreateMetadataMap$1 = reflectMetadata.getMap;
    var store$3 = reflectMetadata.store;

    // `Reflect.deleteMetadata` method
    // https://github.com/rbuckton/reflect-metadata
    _export({ target: 'Reflect', stat: true }, {
      deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
        var targetKey = arguments.length < 3 ? undefined : toMetadataKey$2(arguments[2]);
        var metadataMap = getOrCreateMetadataMap$1(anObject(target), targetKey, false);
        if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) { return false; }
        if (metadataMap.size) { return true; }
        var targetMetadata = store$3.get(target);
        targetMetadata['delete'](targetKey);
        return !!targetMetadata.size || store$3['delete'](target);
      }
    });

    var ordinaryHasOwnMetadata$1 = reflectMetadata.has;
    var ordinaryGetOwnMetadata$1 = reflectMetadata.get;
    var toMetadataKey$3 = reflectMetadata.toKey;

    var ordinaryGetMetadata = function (MetadataKey, O, P) {
      var hasOwn = ordinaryHasOwnMetadata$1(MetadataKey, O, P);
      if (hasOwn) { return ordinaryGetOwnMetadata$1(MetadataKey, O, P); }
      var parent = objectGetPrototypeOf(O);
      return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
    };

    // `Reflect.getMetadata` method
    // https://github.com/rbuckton/reflect-metadata
    _export({ target: 'Reflect', stat: true }, {
      getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
        var targetKey = arguments.length < 3 ? undefined : toMetadataKey$3(arguments[2]);
        return ordinaryGetMetadata(metadataKey, anObject(target), targetKey);
      }
    });

    // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`






    var ordinaryOwnMetadataKeys$1 = reflectMetadata.keys;
    var toMetadataKey$4 = reflectMetadata.toKey;

    var from = function (iter) {
      var result = [];
      iterate_1(iter, result.push, result);
      return result;
    };

    var ordinaryMetadataKeys = function (O, P) {
      var oKeys = ordinaryOwnMetadataKeys$1(O, P);
      var parent = objectGetPrototypeOf(O);
      if (parent === null) { return oKeys; }
      var pKeys = ordinaryMetadataKeys(parent, P);
      return pKeys.length ? oKeys.length ? from(new es_set(oKeys.concat(pKeys))) : pKeys : oKeys;
    };

    // `Reflect.getMetadataKeys` method
    // https://github.com/rbuckton/reflect-metadata
    _export({ target: 'Reflect', stat: true }, {
      getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
        var targetKey = arguments.length < 2 ? undefined : toMetadataKey$4(arguments[1]);
        return ordinaryMetadataKeys(anObject(target), targetKey);
      }
    });

    var ordinaryGetOwnMetadata$2 = reflectMetadata.get;
    var toMetadataKey$5 = reflectMetadata.toKey;

    // `Reflect.getOwnMetadata` method
    // https://github.com/rbuckton/reflect-metadata
    _export({ target: 'Reflect', stat: true }, {
      getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
        var targetKey = arguments.length < 3 ? undefined : toMetadataKey$5(arguments[2]);
        return ordinaryGetOwnMetadata$2(metadataKey, anObject(target), targetKey);
      }
    });

    var ordinaryOwnMetadataKeys$2 = reflectMetadata.keys;
    var toMetadataKey$6 = reflectMetadata.toKey;

    // `Reflect.getOwnMetadataKeys` method
    // https://github.com/rbuckton/reflect-metadata
    _export({ target: 'Reflect', stat: true }, {
      getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
        var targetKey = arguments.length < 2 ? undefined : toMetadataKey$6(arguments[1]);
        return ordinaryOwnMetadataKeys$2(anObject(target), targetKey);
      }
    });

    var ordinaryHasOwnMetadata$2 = reflectMetadata.has;
    var toMetadataKey$7 = reflectMetadata.toKey;

    var ordinaryHasMetadata = function (MetadataKey, O, P) {
      var hasOwn = ordinaryHasOwnMetadata$2(MetadataKey, O, P);
      if (hasOwn) { return true; }
      var parent = objectGetPrototypeOf(O);
      return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
    };

    // `Reflect.hasMetadata` method
    // https://github.com/rbuckton/reflect-metadata
    _export({ target: 'Reflect', stat: true }, {
      hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
        var targetKey = arguments.length < 3 ? undefined : toMetadataKey$7(arguments[2]);
        return ordinaryHasMetadata(metadataKey, anObject(target), targetKey);
      }
    });

    var ordinaryHasOwnMetadata$3 = reflectMetadata.has;
    var toMetadataKey$8 = reflectMetadata.toKey;

    // `Reflect.hasOwnMetadata` method
    // https://github.com/rbuckton/reflect-metadata
    _export({ target: 'Reflect', stat: true }, {
      hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
        var targetKey = arguments.length < 3 ? undefined : toMetadataKey$8(arguments[2]);
        return ordinaryHasOwnMetadata$3(metadataKey, anObject(target), targetKey);
      }
    });

    var toMetadataKey$9 = reflectMetadata.toKey;
    var ordinaryDefineOwnMetadata$2 = reflectMetadata.set;

    // `Reflect.metadata` method
    // https://github.com/rbuckton/reflect-metadata
    _export({ target: 'Reflect', stat: true }, {
      metadata: function metadata(metadataKey, metadataValue) {
        return function decorator(target, key) {
          ordinaryDefineOwnMetadata$2(metadataKey, metadataValue, anObject(target), toMetadataKey$9(key));
        };
      }
    });

    // `Math.iaddh` method
    // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
    _export({ target: 'Math', stat: true }, {
      iaddh: function iaddh(x0, x1, y0, y1) {
        var $x0 = x0 >>> 0;
        var $x1 = x1 >>> 0;
        var $y0 = y0 >>> 0;
        return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
      }
    });

    // `Math.isubh` method
    // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
    _export({ target: 'Math', stat: true }, {
      isubh: function isubh(x0, x1, y0, y1) {
        var $x0 = x0 >>> 0;
        var $x1 = x1 >>> 0;
        var $y0 = y0 >>> 0;
        return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
      }
    });

    // `Math.imulh` method
    // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
    _export({ target: 'Math', stat: true }, {
      imulh: function imulh(u, v) {
        var UINT16 = 0xFFFF;
        var $u = +u;
        var $v = +v;
        var u0 = $u & UINT16;
        var v0 = $v & UINT16;
        var u1 = $u >> 16;
        var v1 = $v >> 16;
        var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
        return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
      }
    });

    // `Math.umulh` method
    // https://gist.github.com/BrendanEich/4294d5c212a6d2254703
    _export({ target: 'Math', stat: true }, {
      umulh: function umulh(u, v) {
        var UINT16 = 0xFFFF;
        var $u = +u;
        var $v = +v;
        var u0 = $u & UINT16;
        var v0 = $v & UINT16;
        var u1 = $u >>> 16;
        var v1 = $v >>> 16;
        var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
        return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
      }
    });

    var charAt$2 = stringMultibyte.charAt;

    // `String.prototype.at` method
    // https://github.com/mathiasbynens/String.prototype.at
    _export({ target: 'String', proto: true }, {
      at: function at(pos) {
        return charAt$2(this, pos);
      }
    });

    var ITERATOR$5 = wellKnownSymbol('iterator');

    var nativeUrl = !fails(function () {
      var url = new URL('b?e=1', 'http://a');
      var searchParams = url.searchParams;
      url.pathname = 'c%20d';
      return (isPure && !url.toJSON)
        || !searchParams.sort
        || url.href !== 'http://a/c%20d?e=1'
        || searchParams.get('e') !== '1'
        || String(new URLSearchParams('?a=1')) !== 'a=1'
        || !searchParams[ITERATOR$5]
        // throws in Edge
        || new URL('https://a@b').username !== 'a'
        || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
        // not punycoded in Edge
        || new URL('http://тест').host !== 'xn--e1aybc'
        // not escaped in Chrome 62-
        || new URL('http://a#б').hash !== '#%D0%B1';
    });

    // based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
    var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
    var base = 36;
    var tMin = 1;
    var tMax = 26;
    var skew = 38;
    var damp = 700;
    var initialBias = 72;
    var initialN = 128; // 0x80
    var delimiter = '-'; // '\x2D'
    var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
    var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
    var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
    var baseMinusTMin = base - tMin;
    var floor$5 = Math.floor;
    var stringFromCharCode = String.fromCharCode;

    /**
     * Creates an array containing the numeric code points of each Unicode
     * character in the string. While JavaScript uses UCS-2 internally,
     * this function will convert a pair of surrogate halves (each of which
     * UCS-2 exposes as separate characters) into a single code point,
     * matching UTF-16.
     */
    var ucs2decode = function (string) {
      var output = [];
      var counter = 0;
      var length = string.length;
      while (counter < length) {
        var value = string.charCodeAt(counter++);
        if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
          // It's a high surrogate, and there is a next character.
          var extra = string.charCodeAt(counter++);
          if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
            output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
          } else {
            // It's an unmatched surrogate; only append this code unit, in case the
            // next code unit is the high surrogate of a surrogate pair.
            output.push(value);
            counter--;
          }
        } else {
          output.push(value);
        }
      }
      return output;
    };

    /**
     * Converts a digit/integer into a basic code point.
     */
    var digitToBasic = function (digit) {
      //  0..25 map to ASCII a..z or A..Z
      // 26..35 map to ASCII 0..9
      return digit + 22 + 75 * (digit < 26);
    };

    /**
     * Bias adaptation function as per section 3.4 of RFC 3492.
     * https://tools.ietf.org/html/rfc3492#section-3.4
     */
    var adapt = function (delta, numPoints, firstTime) {
      var k = 0;
      delta = firstTime ? floor$5(delta / damp) : delta >> 1;
      delta += floor$5(delta / numPoints);
      for (; delta > baseMinusTMin * tMax >> 1; k += base) {
        delta = floor$5(delta / baseMinusTMin);
      }
      return floor$5(k + (baseMinusTMin + 1) * delta / (delta + skew));
    };

    /**
     * Converts a string of Unicode symbols (e.g. a domain name label) to a
     * Punycode string of ASCII-only symbols.
     */
    // eslint-disable-next-line  max-statements
    var encode = function (input) {
      var output = [];

      // Convert the input in UCS-2 to an array of Unicode code points.
      input = ucs2decode(input);

      // Cache the length.
      var inputLength = input.length;

      // Initialize the state.
      var n = initialN;
      var delta = 0;
      var bias = initialBias;
      var i, currentValue;

      // Handle the basic code points.
      for (i = 0; i < input.length; i++) {
        currentValue = input[i];
        if (currentValue < 0x80) {
          output.push(stringFromCharCode(currentValue));
        }
      }

      var basicLength = output.length; // number of basic code points.
      var handledCPCount = basicLength; // number of code points that have been handled;

      // Finish the basic string with a delimiter unless it's empty.
      if (basicLength) {
        output.push(delimiter);
      }

      // Main encoding loop:
      while (handledCPCount < inputLength) {
        // All non-basic code points < n have been handled already. Find the next larger one:
        var m = maxInt;
        for (i = 0; i < input.length; i++) {
          currentValue = input[i];
          if (currentValue >= n && currentValue < m) {
            m = currentValue;
          }
        }

        // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
        var handledCPCountPlusOne = handledCPCount + 1;
        if (m - n > floor$5((maxInt - delta) / handledCPCountPlusOne)) {
          throw RangeError(OVERFLOW_ERROR);
        }

        delta += (m - n) * handledCPCountPlusOne;
        n = m;

        for (i = 0; i < input.length; i++) {
          currentValue = input[i];
          if (currentValue < n && ++delta > maxInt) {
            throw RangeError(OVERFLOW_ERROR);
          }
          if (currentValue == n) {
            // Represent delta as a generalized variable-length integer.
            var q = delta;
            for (var k = base; /* no condition */; k += base) {
              var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
              if (q < t) { break; }
              var qMinusT = q - t;
              var baseMinusT = base - t;
              output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
              q = floor$5(qMinusT / baseMinusT);
            }

            output.push(stringFromCharCode(digitToBasic(q)));
            bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
            delta = 0;
            ++handledCPCount;
          }
        }

        ++delta;
        ++n;
      }
      return output.join('');
    };

    var punycodeToAscii = function (input) {
      var encoded = [];
      var labels = input.toLowerCase().replace(regexSeparators, '\u002E').split('.');
      var i, label;
      for (i = 0; i < labels.length; i++) {
        label = labels[i];
        encoded.push(regexNonASCII.test(label) ? 'xn--' + encode(label) : label);
      }
      return encoded.join('.');
    };

    var getIterator = function (it) {
      var iteratorMethod = getIteratorMethod(it);
      if (typeof iteratorMethod != 'function') {
        throw TypeError(String(it) + ' is not iterable');
      } return anObject(iteratorMethod.call(it));
    };

    // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

















    var ITERATOR$6 = wellKnownSymbol('iterator');
    var URL_SEARCH_PARAMS = 'URLSearchParams';
    var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
    var setInternalState$8 = internalState.set;
    var getInternalParamsState = internalState.getterFor(URL_SEARCH_PARAMS);
    var getInternalIteratorState = internalState.getterFor(URL_SEARCH_PARAMS_ITERATOR);

    var plus = /\+/g;
    var sequences = Array(4);

    var percentSequence = function (bytes) {
      return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
    };

    var percentDecode = function (sequence) {
      try {
        return decodeURIComponent(sequence);
      } catch (error) {
        return sequence;
      }
    };

    var deserialize = function (it) {
      var result = it.replace(plus, ' ');
      var bytes = 4;
      try {
        return decodeURIComponent(result);
      } catch (error) {
        while (bytes) {
          result = result.replace(percentSequence(bytes--), percentDecode);
        }
        return result;
      }
    };

    var find$1 = /[!'()~]|%20/g;

    var replace = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+'
    };

    var replacer = function (match) {
      return replace[match];
    };

    var serialize = function (it) {
      return encodeURIComponent(it).replace(find$1, replacer);
    };

    var parseSearchParams = function (result, query) {
      if (query) {
        var attributes = query.split('&');
        var index = 0;
        var attribute, entry;
        while (index < attributes.length) {
          attribute = attributes[index++];
          if (attribute.length) {
            entry = attribute.split('=');
            result.push({
              key: deserialize(entry.shift()),
              value: deserialize(entry.join('='))
            });
          }
        }
      }
    };

    var updateSearchParams = function (query) {
      this.entries.length = 0;
      parseSearchParams(this.entries, query);
    };

    var validateArgumentsLength = function (passed, required) {
      if (passed < required) { throw TypeError('Not enough arguments'); }
    };

    var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
      setInternalState$8(this, {
        type: URL_SEARCH_PARAMS_ITERATOR,
        iterator: getIterator(getInternalParamsState(params).entries),
        kind: kind
      });
    }, 'Iterator', function next() {
      var state = getInternalIteratorState(this);
      var kind = state.kind;
      var step = state.iterator.next();
      var entry = step.value;
      if (!step.done) {
        step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
      } return step;
    });

    // `URLSearchParams` constructor
    // https://url.spec.whatwg.org/#interface-urlsearchparams
    var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
      anInstance(this, URLSearchParamsConstructor, URL_SEARCH_PARAMS);
      var init = arguments.length > 0 ? arguments[0] : undefined;
      var that = this;
      var entries = [];
      var iteratorMethod, iterator, step, entryIterator, first, second, key;

      setInternalState$8(that, {
        type: URL_SEARCH_PARAMS,
        entries: entries,
        updateURL: function () { /* empty */ },
        updateSearchParams: updateSearchParams
      });

      if (init !== undefined) {
        if (isObject(init)) {
          iteratorMethod = getIteratorMethod(init);
          if (typeof iteratorMethod === 'function') {
            iterator = iteratorMethod.call(init);
            while (!(step = iterator.next()).done) {
              entryIterator = getIterator(anObject(step.value));
              if (
                (first = entryIterator.next()).done ||
                (second = entryIterator.next()).done ||
                !entryIterator.next().done
              ) { throw TypeError('Expected sequence with length 2'); }
              entries.push({ key: first.value + '', value: second.value + '' });
            }
          } else { for (key in init) { if (has(init, key)) { entries.push({ key: key, value: init[key] + '' }); } } }
        } else {
          parseSearchParams(entries, typeof init === 'string' ? init.charAt(0) === '?' ? init.slice(1) : init : init + '');
        }
      }
    };

    var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

    redefineAll(URLSearchParamsPrototype, {
      // `URLSearchParams.prototype.appent` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-append
      append: function append(name, value) {
        validateArgumentsLength(arguments.length, 2);
        var state = getInternalParamsState(this);
        state.entries.push({ key: name + '', value: value + '' });
        state.updateURL();
      },
      // `URLSearchParams.prototype.delete` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
      'delete': function (name) {
        validateArgumentsLength(arguments.length, 1);
        var state = getInternalParamsState(this);
        var entries = state.entries;
        var key = name + '';
        var index = 0;
        while (index < entries.length) {
          if (entries[index].key === key) { entries.splice(index, 1); }
          else { index++; }
        }
        state.updateURL();
      },
      // `URLSearchParams.prototype.get` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-get
      get: function get(name) {
        validateArgumentsLength(arguments.length, 1);
        var entries = getInternalParamsState(this).entries;
        var key = name + '';
        var index = 0;
        for (; index < entries.length; index++) {
          if (entries[index].key === key) { return entries[index].value; }
        }
        return null;
      },
      // `URLSearchParams.prototype.getAll` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
      getAll: function getAll(name) {
        validateArgumentsLength(arguments.length, 1);
        var entries = getInternalParamsState(this).entries;
        var key = name + '';
        var result = [];
        var index = 0;
        for (; index < entries.length; index++) {
          if (entries[index].key === key) { result.push(entries[index].value); }
        }
        return result;
      },
      // `URLSearchParams.prototype.has` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-has
      has: function has(name) {
        validateArgumentsLength(arguments.length, 1);
        var entries = getInternalParamsState(this).entries;
        var key = name + '';
        var index = 0;
        while (index < entries.length) {
          if (entries[index++].key === key) { return true; }
        }
        return false;
      },
      // `URLSearchParams.prototype.set` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-set
      set: function set(name, value) {
        validateArgumentsLength(arguments.length, 1);
        var state = getInternalParamsState(this);
        var entries = state.entries;
        var found = false;
        var key = name + '';
        var val = value + '';
        var index = 0;
        var entry;
        for (; index < entries.length; index++) {
          entry = entries[index];
          if (entry.key === key) {
            if (found) { entries.splice(index--, 1); }
            else {
              found = true;
              entry.value = val;
            }
          }
        }
        if (!found) { entries.push({ key: key, value: val }); }
        state.updateURL();
      },
      // `URLSearchParams.prototype.sort` method
      // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
      sort: function sort() {
        var state = getInternalParamsState(this);
        var entries = state.entries;
        // Array#sort is not stable in some engines
        var slice = entries.slice();
        var entry, entriesIndex, sliceIndex;
        entries.length = 0;
        for (sliceIndex = 0; sliceIndex < slice.length; sliceIndex++) {
          entry = slice[sliceIndex];
          for (entriesIndex = 0; entriesIndex < sliceIndex; entriesIndex++) {
            if (entries[entriesIndex].key > entry.key) {
              entries.splice(entriesIndex, 0, entry);
              break;
            }
          }
          if (entriesIndex === sliceIndex) { entries.push(entry); }
        }
        state.updateURL();
      },
      // `URLSearchParams.prototype.forEach` method
      forEach: function forEach(callback /* , thisArg */) {
        var entries = getInternalParamsState(this).entries;
        var boundFunction = bindContext(callback, arguments.length > 1 ? arguments[1] : undefined, 3);
        var index = 0;
        var entry;
        while (index < entries.length) {
          entry = entries[index++];
          boundFunction(entry.value, entry.key, this);
        }
      },
      // `URLSearchParams.prototype.keys` method
      keys: function keys() {
        return new URLSearchParamsIterator(this, 'keys');
      },
      // `URLSearchParams.prototype.values` method
      values: function values() {
        return new URLSearchParamsIterator(this, 'values');
      },
      // `URLSearchParams.prototype.entries` method
      entries: function entries() {
        return new URLSearchParamsIterator(this, 'entries');
      }
    }, { enumerable: true });

    // `URLSearchParams.prototype[@@iterator]` method
    redefine(URLSearchParamsPrototype, ITERATOR$6, URLSearchParamsPrototype.entries);

    // `URLSearchParams.prototype.toString` method
    // https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
    redefine(URLSearchParamsPrototype, 'toString', function toString() {
      var entries = getInternalParamsState(this).entries;
      var result = [];
      var index = 0;
      var entry;
      while (index < entries.length) {
        entry = entries[index++];
        result.push(serialize(entry.key) + '=' + serialize(entry.value));
      } return result.join('&');
    }, { enumerable: true });

    setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

    _export({ global: true, forced: !nativeUrl }, {
      URLSearchParams: URLSearchParamsConstructor
    });

    var web_urlSearchParams = {
      URLSearchParams: URLSearchParamsConstructor,
      getState: getInternalParamsState
    };

    // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`











    var codeAt$1 = stringMultibyte.codeAt;





    var NativeURL = global_1.URL;
    var URLSearchParams$1 = web_urlSearchParams.URLSearchParams;
    var getInternalSearchParamsState = web_urlSearchParams.getState;
    var setInternalState$9 = internalState.set;
    var getInternalURLState = internalState.getterFor('URL');
    var floor$6 = Math.floor;
    var pow$3 = Math.pow;

    var INVALID_AUTHORITY = 'Invalid authority';
    var INVALID_SCHEME = 'Invalid scheme';
    var INVALID_HOST = 'Invalid host';
    var INVALID_PORT = 'Invalid port';

    var ALPHA = /[A-Za-z]/;
    var ALPHANUMERIC = /[\d+\-.A-Za-z]/;
    var DIGIT = /\d/;
    var HEX_START = /^(0x|0X)/;
    var OCT = /^[0-7]+$/;
    var DEC = /^\d+$/;
    var HEX = /^[\dA-Fa-f]+$/;
    // eslint-disable-next-line no-control-regex
    var FORBIDDEN_HOST_CODE_POINT = /[\u0000\u0009\u000A\u000D #%/:?@[\\]]/;
    // eslint-disable-next-line no-control-regex
    var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\u0000\u0009\u000A\u000D #/:?@[\\]]/;
    // eslint-disable-next-line no-control-regex
    var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u001F ]+|[\u0000-\u001F ]+$/g;
    // eslint-disable-next-line no-control-regex
    var TAB_AND_NEW_LINE = /[\u0009\u000A\u000D]/g;
    var EOF;

    var parseHost = function (url, input) {
      var result, codePoints, index;
      if (input.charAt(0) == '[') {
        if (input.charAt(input.length - 1) != ']') { return INVALID_HOST; }
        result = parseIPv6(input.slice(1, -1));
        if (!result) { return INVALID_HOST; }
        url.host = result;
      // opaque host
      } else if (!isSpecial(url)) {
        if (FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT.test(input)) { return INVALID_HOST; }
        result = '';
        codePoints = arrayFrom(input);
        for (index = 0; index < codePoints.length; index++) {
          result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
        }
        url.host = result;
      } else {
        input = punycodeToAscii(input);
        if (FORBIDDEN_HOST_CODE_POINT.test(input)) { return INVALID_HOST; }
        result = parseIPv4(input);
        if (result === null) { return INVALID_HOST; }
        url.host = result;
      }
    };

    var parseIPv4 = function (input) {
      var parts = input.split('.');
      var partsLength, numbers, index, part, radix, number, ipv4;
      if (parts.length && parts[parts.length - 1] == '') {
        parts.pop();
      }
      partsLength = parts.length;
      if (partsLength > 4) { return input; }
      numbers = [];
      for (index = 0; index < partsLength; index++) {
        part = parts[index];
        if (part == '') { return input; }
        radix = 10;
        if (part.length > 1 && part.charAt(0) == '0') {
          radix = HEX_START.test(part) ? 16 : 8;
          part = part.slice(radix == 8 ? 1 : 2);
        }
        if (part === '') {
          number = 0;
        } else {
          if (!(radix == 10 ? DEC : radix == 8 ? OCT : HEX).test(part)) { return input; }
          number = parseInt(part, radix);
        }
        numbers.push(number);
      }
      for (index = 0; index < partsLength; index++) {
        number = numbers[index];
        if (index == partsLength - 1) {
          if (number >= pow$3(256, 5 - partsLength)) { return null; }
        } else if (number > 255) { return null; }
      }
      ipv4 = numbers.pop();
      for (index = 0; index < numbers.length; index++) {
        ipv4 += numbers[index] * pow$3(256, 3 - index);
      }
      return ipv4;
    };

    // eslint-disable-next-line max-statements
    var parseIPv6 = function (input) {
      var address = [0, 0, 0, 0, 0, 0, 0, 0];
      var pieceIndex = 0;
      var compress = null;
      var pointer = 0;
      var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

      var char = function () {
        return input.charAt(pointer);
      };

      if (char() == ':') {
        if (input.charAt(1) != ':') { return; }
        pointer += 2;
        pieceIndex++;
        compress = pieceIndex;
      }
      while (char()) {
        if (pieceIndex == 8) { return; }
        if (char() == ':') {
          if (compress !== null) { return; }
          pointer++;
          pieceIndex++;
          compress = pieceIndex;
          continue;
        }
        value = length = 0;
        while (length < 4 && HEX.test(char())) {
          value = value * 16 + parseInt(char(), 16);
          pointer++;
          length++;
        }
        if (char() == '.') {
          if (length == 0) { return; }
          pointer -= length;
          if (pieceIndex > 6) { return; }
          numbersSeen = 0;
          while (char()) {
            ipv4Piece = null;
            if (numbersSeen > 0) {
              if (char() == '.' && numbersSeen < 4) { pointer++; }
              else { return; }
            }
            if (!DIGIT.test(char())) { return; }
            while (DIGIT.test(char())) {
              number = parseInt(char(), 10);
              if (ipv4Piece === null) { ipv4Piece = number; }
              else if (ipv4Piece == 0) { return; }
              else { ipv4Piece = ipv4Piece * 10 + number; }
              if (ipv4Piece > 255) { return; }
              pointer++;
            }
            address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
            numbersSeen++;
            if (numbersSeen == 2 || numbersSeen == 4) { pieceIndex++; }
          }
          if (numbersSeen != 4) { return; }
          break;
        } else if (char() == ':') {
          pointer++;
          if (!char()) { return; }
        } else if (char()) { return; }
        address[pieceIndex++] = value;
      }
      if (compress !== null) {
        swaps = pieceIndex - compress;
        pieceIndex = 7;
        while (pieceIndex != 0 && swaps > 0) {
          swap = address[pieceIndex];
          address[pieceIndex--] = address[compress + swaps - 1];
          address[compress + --swaps] = swap;
        }
      } else if (pieceIndex != 8) { return; }
      return address;
    };

    var findLongestZeroSequence = function (ipv6) {
      var maxIndex = null;
      var maxLength = 1;
      var currStart = null;
      var currLength = 0;
      var index = 0;
      for (; index < 8; index++) {
        if (ipv6[index] !== 0) {
          if (currLength > maxLength) {
            maxIndex = currStart;
            maxLength = currLength;
          }
          currStart = null;
          currLength = 0;
        } else {
          if (currStart === null) { currStart = index; }
          ++currLength;
        }
      }
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      return maxIndex;
    };

    var serializeHost = function (host) {
      var result, index, compress, ignore0;
      // ipv4
      if (typeof host == 'number') {
        result = [];
        for (index = 0; index < 4; index++) {
          result.unshift(host % 256);
          host = floor$6(host / 256);
        } return result.join('.');
      // ipv6
      } else if (typeof host == 'object') {
        result = '';
        compress = findLongestZeroSequence(host);
        for (index = 0; index < 8; index++) {
          if (ignore0 && host[index] === 0) { continue; }
          if (ignore0) { ignore0 = false; }
          if (compress === index) {
            result += index ? ':' : '::';
            ignore0 = true;
          } else {
            result += host[index].toString(16);
            if (index < 7) { result += ':'; }
          }
        }
        return '[' + result + ']';
      } return host;
    };

    var C0ControlPercentEncodeSet = {};
    var fragmentPercentEncodeSet = objectAssign({}, C0ControlPercentEncodeSet, {
      ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
    });
    var pathPercentEncodeSet = objectAssign({}, fragmentPercentEncodeSet, {
      '#': 1, '?': 1, '{': 1, '}': 1
    });
    var userinfoPercentEncodeSet = objectAssign({}, pathPercentEncodeSet, {
      '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
    });

    var percentEncode = function (char, set) {
      var code = codeAt$1(char, 0);
      return code > 0x20 && code < 0x7F && !has(set, char) ? char : encodeURIComponent(char);
    };

    var specialSchemes = {
      ftp: 21,
      file: null,
      gopher: 70,
      http: 80,
      https: 443,
      ws: 80,
      wss: 443
    };

    var isSpecial = function (url) {
      return has(specialSchemes, url.scheme);
    };

    var includesCredentials = function (url) {
      return url.username != '' || url.password != '';
    };

    var cannotHaveUsernamePasswordPort = function (url) {
      return !url.host || url.cannotBeABaseURL || url.scheme == 'file';
    };

    var isWindowsDriveLetter = function (string, normalized) {
      var second;
      return string.length == 2 && ALPHA.test(string.charAt(0))
        && ((second = string.charAt(1)) == ':' || (!normalized && second == '|'));
    };

    var startsWithWindowsDriveLetter = function (string) {
      var third;
      return string.length > 1 && isWindowsDriveLetter(string.slice(0, 2)) && (
        string.length == 2 ||
        ((third = string.charAt(2)) === '/' || third === '\\' || third === '?' || third === '#')
      );
    };

    var shortenURLsPath = function (url) {
      var path = url.path;
      var pathSize = path.length;
      if (pathSize && (url.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
        path.pop();
      }
    };

    var isSingleDot = function (segment) {
      return segment === '.' || segment.toLowerCase() === '%2e';
    };

    var isDoubleDot = function (segment) {
      segment = segment.toLowerCase();
      return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
    };

    // States:
    var SCHEME_START = {};
    var SCHEME = {};
    var NO_SCHEME = {};
    var SPECIAL_RELATIVE_OR_AUTHORITY = {};
    var PATH_OR_AUTHORITY = {};
    var RELATIVE = {};
    var RELATIVE_SLASH = {};
    var SPECIAL_AUTHORITY_SLASHES = {};
    var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
    var AUTHORITY = {};
    var HOST = {};
    var HOSTNAME = {};
    var PORT = {};
    var FILE = {};
    var FILE_SLASH = {};
    var FILE_HOST = {};
    var PATH_START = {};
    var PATH = {};
    var CANNOT_BE_A_BASE_URL_PATH = {};
    var QUERY = {};
    var FRAGMENT = {};

    // eslint-disable-next-line max-statements
    var parseURL = function (url, input, stateOverride, base) {
      var state = stateOverride || SCHEME_START;
      var pointer = 0;
      var buffer = '';
      var seenAt = false;
      var seenBracket = false;
      var seenPasswordToken = false;
      var codePoints, char, bufferCodePoints, failure;

      if (!stateOverride) {
        url.scheme = '';
        url.username = '';
        url.password = '';
        url.host = null;
        url.port = null;
        url.path = [];
        url.query = null;
        url.fragment = null;
        url.cannotBeABaseURL = false;
        input = input.replace(LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
      }

      input = input.replace(TAB_AND_NEW_LINE, '');

      codePoints = arrayFrom(input);

      while (pointer <= codePoints.length) {
        char = codePoints[pointer];
        switch (state) {
          case SCHEME_START:
            if (char && ALPHA.test(char)) {
              buffer += char.toLowerCase();
              state = SCHEME;
            } else if (!stateOverride) {
              state = NO_SCHEME;
              continue;
            } else { return INVALID_SCHEME; }
            break;

          case SCHEME:
            if (char && (ALPHANUMERIC.test(char) || char == '+' || char == '-' || char == '.')) {
              buffer += char.toLowerCase();
            } else if (char == ':') {
              if (stateOverride && (
                (isSpecial(url) != has(specialSchemes, buffer)) ||
                (buffer == 'file' && (includesCredentials(url) || url.port !== null)) ||
                (url.scheme == 'file' && !url.host)
              )) { return; }
              url.scheme = buffer;
              if (stateOverride) {
                if (isSpecial(url) && specialSchemes[url.scheme] == url.port) { url.port = null; }
                return;
              }
              buffer = '';
              if (url.scheme == 'file') {
                state = FILE;
              } else if (isSpecial(url) && base && base.scheme == url.scheme) {
                state = SPECIAL_RELATIVE_OR_AUTHORITY;
              } else if (isSpecial(url)) {
                state = SPECIAL_AUTHORITY_SLASHES;
              } else if (codePoints[pointer + 1] == '/') {
                state = PATH_OR_AUTHORITY;
                pointer++;
              } else {
                url.cannotBeABaseURL = true;
                url.path.push('');
                state = CANNOT_BE_A_BASE_URL_PATH;
              }
            } else if (!stateOverride) {
              buffer = '';
              state = NO_SCHEME;
              pointer = 0;
              continue;
            } else { return INVALID_SCHEME; }
            break;

          case NO_SCHEME:
            if (!base || (base.cannotBeABaseURL && char != '#')) { return INVALID_SCHEME; }
            if (base.cannotBeABaseURL && char == '#') {
              url.scheme = base.scheme;
              url.path = base.path.slice();
              url.query = base.query;
              url.fragment = '';
              url.cannotBeABaseURL = true;
              state = FRAGMENT;
              break;
            }
            state = base.scheme == 'file' ? FILE : RELATIVE;
            continue;

          case SPECIAL_RELATIVE_OR_AUTHORITY:
            if (char == '/' && codePoints[pointer + 1] == '/') {
              state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
              pointer++;
            } else {
              state = RELATIVE;
              continue;
            } break;

          case PATH_OR_AUTHORITY:
            if (char == '/') {
              state = AUTHORITY;
              break;
            } else {
              state = PATH;
              continue;
            }

          case RELATIVE:
            url.scheme = base.scheme;
            if (char == EOF) {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = base.path.slice();
              url.query = base.query;
            } else if (char == '/' || (char == '\\' && isSpecial(url))) {
              state = RELATIVE_SLASH;
            } else if (char == '?') {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = base.path.slice();
              url.query = '';
              state = QUERY;
            } else if (char == '#') {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = base.path.slice();
              url.query = base.query;
              url.fragment = '';
              state = FRAGMENT;
            } else {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              url.path = base.path.slice();
              url.path.pop();
              state = PATH;
              continue;
            } break;

          case RELATIVE_SLASH:
            if (isSpecial(url) && (char == '/' || char == '\\')) {
              state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            } else if (char == '/') {
              state = AUTHORITY;
            } else {
              url.username = base.username;
              url.password = base.password;
              url.host = base.host;
              url.port = base.port;
              state = PATH;
              continue;
            } break;

          case SPECIAL_AUTHORITY_SLASHES:
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            if (char != '/' || buffer.charAt(pointer + 1) != '/') { continue; }
            pointer++;
            break;

          case SPECIAL_AUTHORITY_IGNORE_SLASHES:
            if (char != '/' && char != '\\') {
              state = AUTHORITY;
              continue;
            } break;

          case AUTHORITY:
            if (char == '@') {
              if (seenAt) { buffer = '%40' + buffer; }
              seenAt = true;
              bufferCodePoints = arrayFrom(buffer);
              for (var i = 0; i < bufferCodePoints.length; i++) {
                var codePoint = bufferCodePoints[i];
                if (codePoint == ':' && !seenPasswordToken) {
                  seenPasswordToken = true;
                  continue;
                }
                var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
                if (seenPasswordToken) { url.password += encodedCodePoints; }
                else { url.username += encodedCodePoints; }
              }
              buffer = '';
            } else if (
              char == EOF || char == '/' || char == '?' || char == '#' ||
              (char == '\\' && isSpecial(url))
            ) {
              if (seenAt && buffer == '') { return INVALID_AUTHORITY; }
              pointer -= arrayFrom(buffer).length + 1;
              buffer = '';
              state = HOST;
            } else { buffer += char; }
            break;

          case HOST:
          case HOSTNAME:
            if (stateOverride && url.scheme == 'file') {
              state = FILE_HOST;
              continue;
            } else if (char == ':' && !seenBracket) {
              if (buffer == '') { return INVALID_HOST; }
              failure = parseHost(url, buffer);
              if (failure) { return failure; }
              buffer = '';
              state = PORT;
              if (stateOverride == HOSTNAME) { return; }
            } else if (
              char == EOF || char == '/' || char == '?' || char == '#' ||
              (char == '\\' && isSpecial(url))
            ) {
              if (isSpecial(url) && buffer == '') { return INVALID_HOST; }
              if (stateOverride && buffer == '' && (includesCredentials(url) || url.port !== null)) { return; }
              failure = parseHost(url, buffer);
              if (failure) { return failure; }
              buffer = '';
              state = PATH_START;
              if (stateOverride) { return; }
              continue;
            } else {
              if (char == '[') { seenBracket = true; }
              else if (char == ']') { seenBracket = false; }
              buffer += char;
            } break;

          case PORT:
            if (DIGIT.test(char)) {
              buffer += char;
            } else if (
              char == EOF || char == '/' || char == '?' || char == '#' ||
              (char == '\\' && isSpecial(url)) ||
              stateOverride
            ) {
              if (buffer != '') {
                var port = parseInt(buffer, 10);
                if (port > 0xFFFF) { return INVALID_PORT; }
                url.port = (isSpecial(url) && port === specialSchemes[url.scheme]) ? null : port;
                buffer = '';
              }
              if (stateOverride) { return; }
              state = PATH_START;
              continue;
            } else { return INVALID_PORT; }
            break;

          case FILE:
            url.scheme = 'file';
            if (char == '/' || char == '\\') { state = FILE_SLASH; }
            else if (base && base.scheme == 'file') {
              if (char == EOF) {
                url.host = base.host;
                url.path = base.path.slice();
                url.query = base.query;
              } else if (char == '?') {
                url.host = base.host;
                url.path = base.path.slice();
                url.query = '';
                state = QUERY;
              } else if (char == '#') {
                url.host = base.host;
                url.path = base.path.slice();
                url.query = base.query;
                url.fragment = '';
                state = FRAGMENT;
              } else {
                if (!startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
                  url.host = base.host;
                  url.path = base.path.slice();
                  shortenURLsPath(url);
                }
                state = PATH;
                continue;
              }
            } else {
              state = PATH;
              continue;
            } break;

          case FILE_SLASH:
            if (char == '/' || char == '\\') {
              state = FILE_HOST;
              break;
            }
            if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(codePoints.slice(pointer).join(''))) {
              if (isWindowsDriveLetter(base.path[0], true)) { url.path.push(base.path[0]); }
              else { url.host = base.host; }
            }
            state = PATH;
            continue;

          case FILE_HOST:
            if (char == EOF || char == '/' || char == '\\' || char == '?' || char == '#') {
              if (!stateOverride && isWindowsDriveLetter(buffer)) {
                state = PATH;
              } else if (buffer == '') {
                url.host = '';
                if (stateOverride) { return; }
                state = PATH_START;
              } else {
                failure = parseHost(url, buffer);
                if (failure) { return failure; }
                if (url.host == 'localhost') { url.host = ''; }
                if (stateOverride) { return; }
                buffer = '';
                state = PATH_START;
              } continue;
            } else { buffer += char; }
            break;

          case PATH_START:
            if (isSpecial(url)) {
              state = PATH;
              if (char != '/' && char != '\\') { continue; }
            } else if (!stateOverride && char == '?') {
              url.query = '';
              state = QUERY;
            } else if (!stateOverride && char == '#') {
              url.fragment = '';
              state = FRAGMENT;
            } else if (char != EOF) {
              state = PATH;
              if (char != '/') { continue; }
            } break;

          case PATH:
            if (
              char == EOF || char == '/' ||
              (char == '\\' && isSpecial(url)) ||
              (!stateOverride && (char == '?' || char == '#'))
            ) {
              if (isDoubleDot(buffer)) {
                shortenURLsPath(url);
                if (char != '/' && !(char == '\\' && isSpecial(url))) {
                  url.path.push('');
                }
              } else if (isSingleDot(buffer)) {
                if (char != '/' && !(char == '\\' && isSpecial(url))) {
                  url.path.push('');
                }
              } else {
                if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                  if (url.host) { url.host = ''; }
                  buffer = buffer.charAt(0) + ':'; // normalize windows drive letter
                }
                url.path.push(buffer);
              }
              buffer = '';
              if (url.scheme == 'file' && (char == EOF || char == '?' || char == '#')) {
                while (url.path.length > 1 && url.path[0] === '') {
                  url.path.shift();
                }
              }
              if (char == '?') {
                url.query = '';
                state = QUERY;
              } else if (char == '#') {
                url.fragment = '';
                state = FRAGMENT;
              }
            } else {
              buffer += percentEncode(char, pathPercentEncodeSet);
            } break;

          case CANNOT_BE_A_BASE_URL_PATH:
            if (char == '?') {
              url.query = '';
              state = QUERY;
            } else if (char == '#') {
              url.fragment = '';
              state = FRAGMENT;
            } else if (char != EOF) {
              url.path[0] += percentEncode(char, C0ControlPercentEncodeSet);
            } break;

          case QUERY:
            if (!stateOverride && char == '#') {
              url.fragment = '';
              state = FRAGMENT;
            } else if (char != EOF) {
              if (char == "'" && isSpecial(url)) { url.query += '%27'; }
              else if (char == '#') { url.query += '%23'; }
              else { url.query += percentEncode(char, C0ControlPercentEncodeSet); }
            } break;

          case FRAGMENT:
            if (char != EOF) { url.fragment += percentEncode(char, fragmentPercentEncodeSet); }
            break;
        }

        pointer++;
      }
    };

    // `URL` constructor
    // https://url.spec.whatwg.org/#url-class
    var URLConstructor = function URL(url /* , base */) {
      var that = anInstance(this, URLConstructor, 'URL');
      var base = arguments.length > 1 ? arguments[1] : undefined;
      var urlString = String(url);
      var state = setInternalState$9(that, { type: 'URL' });
      var baseState, failure;
      if (base !== undefined) {
        if (base instanceof URLConstructor) { baseState = getInternalURLState(base); }
        else {
          failure = parseURL(baseState = {}, String(base));
          if (failure) { throw TypeError(failure); }
        }
      }
      failure = parseURL(state, urlString, null, baseState);
      if (failure) { throw TypeError(failure); }
      var searchParams = state.searchParams = new URLSearchParams$1();
      var searchParamsState = getInternalSearchParamsState(searchParams);
      searchParamsState.updateSearchParams(state.query);
      searchParamsState.updateURL = function () {
        state.query = String(searchParams) || null;
      };
      if (!descriptors) {
        that.href = serializeURL.call(that);
        that.origin = getOrigin.call(that);
        that.protocol = getProtocol.call(that);
        that.username = getUsername.call(that);
        that.password = getPassword.call(that);
        that.host = getHost.call(that);
        that.hostname = getHostname.call(that);
        that.port = getPort.call(that);
        that.pathname = getPathname.call(that);
        that.search = getSearch.call(that);
        that.searchParams = getSearchParams.call(that);
        that.hash = getHash.call(that);
      }
    };

    var URLPrototype = URLConstructor.prototype;

    var serializeURL = function () {
      var url = getInternalURLState(this);
      var scheme = url.scheme;
      var username = url.username;
      var password = url.password;
      var host = url.host;
      var port = url.port;
      var path = url.path;
      var query = url.query;
      var fragment = url.fragment;
      var output = scheme + ':';
      if (host !== null) {
        output += '//';
        if (includesCredentials(url)) {
          output += username + (password ? ':' + password : '') + '@';
        }
        output += serializeHost(host);
        if (port !== null) { output += ':' + port; }
      } else if (scheme == 'file') { output += '//'; }
      output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
      if (query !== null) { output += '?' + query; }
      if (fragment !== null) { output += '#' + fragment; }
      return output;
    };

    var getOrigin = function () {
      var url = getInternalURLState(this);
      var scheme = url.scheme;
      var port = url.port;
      if (scheme == 'blob') { try {
        return new URL(scheme.path[0]).origin;
      } catch (error) {
        return 'null';
      } }
      if (scheme == 'file' || !isSpecial(url)) { return 'null'; }
      return scheme + '://' + serializeHost(url.host) + (port !== null ? ':' + port : '');
    };

    var getProtocol = function () {
      return getInternalURLState(this).scheme + ':';
    };

    var getUsername = function () {
      return getInternalURLState(this).username;
    };

    var getPassword = function () {
      return getInternalURLState(this).password;
    };

    var getHost = function () {
      var url = getInternalURLState(this);
      var host = url.host;
      var port = url.port;
      return host === null ? ''
        : port === null ? serializeHost(host)
        : serializeHost(host) + ':' + port;
    };

    var getHostname = function () {
      var host = getInternalURLState(this).host;
      return host === null ? '' : serializeHost(host);
    };

    var getPort = function () {
      var port = getInternalURLState(this).port;
      return port === null ? '' : String(port);
    };

    var getPathname = function () {
      var url = getInternalURLState(this);
      var path = url.path;
      return url.cannotBeABaseURL ? path[0] : path.length ? '/' + path.join('/') : '';
    };

    var getSearch = function () {
      var query = getInternalURLState(this).query;
      return query ? '?' + query : '';
    };

    var getSearchParams = function () {
      return getInternalURLState(this).searchParams;
    };

    var getHash = function () {
      var fragment = getInternalURLState(this).fragment;
      return fragment ? '#' + fragment : '';
    };

    var accessorDescriptor = function (getter, setter) {
      return { get: getter, set: setter, configurable: true, enumerable: true };
    };

    if (descriptors) {
      objectDefineProperties(URLPrototype, {
        // `URL.prototype.href` accessors pair
        // https://url.spec.whatwg.org/#dom-url-href
        href: accessorDescriptor(serializeURL, function (href) {
          var url = getInternalURLState(this);
          var urlString = String(href);
          var failure = parseURL(url, urlString);
          if (failure) { throw TypeError(failure); }
          getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
        }),
        // `URL.prototype.origin` getter
        // https://url.spec.whatwg.org/#dom-url-origin
        origin: accessorDescriptor(getOrigin),
        // `URL.prototype.protocol` accessors pair
        // https://url.spec.whatwg.org/#dom-url-protocol
        protocol: accessorDescriptor(getProtocol, function (protocol) {
          var url = getInternalURLState(this);
          parseURL(url, String(protocol) + ':', SCHEME_START);
        }),
        // `URL.prototype.username` accessors pair
        // https://url.spec.whatwg.org/#dom-url-username
        username: accessorDescriptor(getUsername, function (username) {
          var url = getInternalURLState(this);
          var codePoints = arrayFrom(String(username));
          if (cannotHaveUsernamePasswordPort(url)) { return; }
          url.username = '';
          for (var i = 0; i < codePoints.length; i++) {
            url.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
          }
        }),
        // `URL.prototype.password` accessors pair
        // https://url.spec.whatwg.org/#dom-url-password
        password: accessorDescriptor(getPassword, function (password) {
          var url = getInternalURLState(this);
          var codePoints = arrayFrom(String(password));
          if (cannotHaveUsernamePasswordPort(url)) { return; }
          url.password = '';
          for (var i = 0; i < codePoints.length; i++) {
            url.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
          }
        }),
        // `URL.prototype.host` accessors pair
        // https://url.spec.whatwg.org/#dom-url-host
        host: accessorDescriptor(getHost, function (host) {
          var url = getInternalURLState(this);
          if (url.cannotBeABaseURL) { return; }
          parseURL(url, String(host), HOST);
        }),
        // `URL.prototype.hostname` accessors pair
        // https://url.spec.whatwg.org/#dom-url-hostname
        hostname: accessorDescriptor(getHostname, function (hostname) {
          var url = getInternalURLState(this);
          if (url.cannotBeABaseURL) { return; }
          parseURL(url, String(hostname), HOSTNAME);
        }),
        // `URL.prototype.port` accessors pair
        // https://url.spec.whatwg.org/#dom-url-port
        port: accessorDescriptor(getPort, function (port) {
          var url = getInternalURLState(this);
          if (cannotHaveUsernamePasswordPort(url)) { return; }
          port = String(port);
          if (port == '') { url.port = null; }
          else { parseURL(url, port, PORT); }
        }),
        // `URL.prototype.pathname` accessors pair
        // https://url.spec.whatwg.org/#dom-url-pathname
        pathname: accessorDescriptor(getPathname, function (pathname) {
          var url = getInternalURLState(this);
          if (url.cannotBeABaseURL) { return; }
          url.path = [];
          parseURL(url, pathname + '', PATH_START);
        }),
        // `URL.prototype.search` accessors pair
        // https://url.spec.whatwg.org/#dom-url-search
        search: accessorDescriptor(getSearch, function (search) {
          var url = getInternalURLState(this);
          search = String(search);
          if (search == '') {
            url.query = null;
          } else {
            if ('?' == search.charAt(0)) { search = search.slice(1); }
            url.query = '';
            parseURL(url, search, QUERY);
          }
          getInternalSearchParamsState(url.searchParams).updateSearchParams(url.query);
        }),
        // `URL.prototype.searchParams` getter
        // https://url.spec.whatwg.org/#dom-url-searchparams
        searchParams: accessorDescriptor(getSearchParams),
        // `URL.prototype.hash` accessors pair
        // https://url.spec.whatwg.org/#dom-url-hash
        hash: accessorDescriptor(getHash, function (hash) {
          var url = getInternalURLState(this);
          hash = String(hash);
          if (hash == '') {
            url.fragment = null;
            return;
          }
          if ('#' == hash.charAt(0)) { hash = hash.slice(1); }
          url.fragment = '';
          parseURL(url, hash, FRAGMENT);
        })
      });
    }

    // `URL.prototype.toJSON` method
    // https://url.spec.whatwg.org/#dom-url-tojson
    redefine(URLPrototype, 'toJSON', function toJSON() {
      return serializeURL.call(this);
    }, { enumerable: true });

    // `URL.prototype.toString` method
    // https://url.spec.whatwg.org/#URL-stringification-behavior
    redefine(URLPrototype, 'toString', function toString() {
      return serializeURL.call(this);
    }, { enumerable: true });

    if (NativeURL) {
      var nativeCreateObjectURL = NativeURL.createObjectURL;
      var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
      // `URL.createObjectURL` method
      // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
      // eslint-disable-next-line no-unused-vars
      if (nativeCreateObjectURL) { redefine(URLConstructor, 'createObjectURL', function createObjectURL(blob) {
        return nativeCreateObjectURL.apply(NativeURL, arguments);
      }); }
      // `URL.revokeObjectURL` method
      // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
      // eslint-disable-next-line no-unused-vars
      if (nativeRevokeObjectURL) { redefine(URLConstructor, 'revokeObjectURL', function revokeObjectURL(url) {
        return nativeRevokeObjectURL.apply(NativeURL, arguments);
      }); }
    }

    setToStringTag(URLConstructor, 'URL');

    _export({ global: true, forced: !nativeUrl, sham: !descriptors }, {
      URL: URLConstructor
    });

    // `Map.groupBy` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Map', stat: true }, {
      groupBy: function groupBy(iterable, keyDerivative) {
        var newMap = new this();
        aFunction(keyDerivative);
        var has = aFunction(newMap.has);
        var get = aFunction(newMap.get);
        var set = aFunction(newMap.set);
        iterate_1(iterable, function (element) {
          var derivedKey = keyDerivative(element);
          if (!has.call(newMap, derivedKey)) { set.call(newMap, derivedKey, [element]); }
          else { get.call(newMap, derivedKey).push(element); }
        });
        return newMap;
      }
    });

    // `Map.keyBy` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Map', stat: true }, {
      keyBy: function keyBy(iterable, keyDerivative) {
        var newMap = new this();
        aFunction(keyDerivative);
        var setter = aFunction(newMap.set);
        iterate_1(iterable, function (element) {
          setter.call(newMap, keyDerivative(element), element);
        });
        return newMap;
      }
    });

    // https://github.com/tc39/collection-methods
    var collectionDeleteAll = function (/* ...elements */) {
      var arguments$1 = arguments;

      var collection = anObject(this);
      var remover = aFunction(collection['delete']);
      var allDeleted = true;
      for (var k = 0, len = arguments.length; k < len; k++) {
        allDeleted = allDeleted && remover.call(collection, arguments$1[k]);
      }
      return !!allDeleted;
    };

    // `Map.prototype.deleteAll` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Map', proto: true, real: true, forced: isPure }, {
      deleteAll: function deleteAll(/* ...elements */) {
        return collectionDeleteAll.apply(this, arguments);
      }
    });

    var getMapIterator =  getIterator ;

    // `Map.prototype.every` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Map', proto: true, real: true, forced: isPure }, {
      every: function every(callbackfn /* , thisArg */) {
        var map = anObject(this);
        var iterator = getMapIterator(map);
        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        return !iterate_1(iterator, function (key, value) {
          if (!boundFunction(value, key, map)) { return iterate_1.stop(); }
        }, undefined, true, true).stopped;
      }
    });

    // `Map.prototype.filter` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Map', proto: true, real: true, forced: isPure }, {
      filter: function filter(callbackfn /* , thisArg */) {
        var map = anObject(this);
        var iterator = getMapIterator(map);
        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var newMap = new (speciesConstructor(map, getBuiltIn('Map')))();
        var setter = aFunction(newMap.set);
        iterate_1(iterator, function (key, value) {
          if (boundFunction(value, key, map)) { setter.call(newMap, key, value); }
        }, undefined, true, true);
        return newMap;
      }
    });

    // `Map.prototype.find` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Map', proto: true, real: true, forced: isPure }, {
      find: function find(callbackfn /* , thisArg */) {
        var map = anObject(this);
        var iterator = getMapIterator(map);
        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        return iterate_1(iterator, function (key, value) {
          if (boundFunction(value, key, map)) { return iterate_1.stop(value); }
        }, undefined, true, true).result;
      }
    });

    // `Map.prototype.findKey` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Map', proto: true, real: true, forced: isPure }, {
      findKey: function findKey(callbackfn /* , thisArg */) {
        var map = anObject(this);
        var iterator = getMapIterator(map);
        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        return iterate_1(iterator, function (key, value) {
          if (boundFunction(value, key, map)) { return iterate_1.stop(key); }
        }, undefined, true, true).result;
      }
    });

    // `SameValueZero` abstract operation
    // https://tc39.github.io/ecma262/#sec-samevaluezero
    var sameValueZero = function (x, y) {
      // eslint-disable-next-line no-self-compare
      return x === y || x != x && y != y;
    };

    // `Map.prototype.includes` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Map', proto: true, real: true, forced: isPure }, {
      includes: function includes(searchElement) {
        return iterate_1(getMapIterator(anObject(this)), function (key, value) {
          if (sameValueZero(value, searchElement)) { return iterate_1.stop(); }
        }, undefined, true, true).stopped;
      }
    });

    // `Map.prototype.includes` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Map', proto: true, real: true, forced: isPure }, {
      keyOf: function keyOf(searchElement) {
        return iterate_1(getMapIterator(anObject(this)), function (key, value) {
          if (value === searchElement) { return iterate_1.stop(key); }
        }, undefined, true, true).result;
      }
    });

    // `Map.prototype.mapKeys` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Map', proto: true, real: true, forced: isPure }, {
      mapKeys: function mapKeys(callbackfn /* , thisArg */) {
        var map = anObject(this);
        var iterator = getMapIterator(map);
        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var newMap = new (speciesConstructor(map, getBuiltIn('Map')))();
        var setter = aFunction(newMap.set);
        iterate_1(iterator, function (key, value) {
          setter.call(newMap, boundFunction(value, key, map), value);
        }, undefined, true, true);
        return newMap;
      }
    });

    // `Map.prototype.mapValues` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Map', proto: true, real: true, forced: isPure }, {
      mapValues: function mapValues(callbackfn /* , thisArg */) {
        var map = anObject(this);
        var iterator = getMapIterator(map);
        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var newMap = new (speciesConstructor(map, getBuiltIn('Map')))();
        var setter = aFunction(newMap.set);
        iterate_1(iterator, function (key, value) {
          setter.call(newMap, key, boundFunction(value, key, map));
        }, undefined, true, true);
        return newMap;
      }
    });

    // `Map.prototype.merge` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Map', proto: true, real: true, forced: isPure }, {
      // eslint-disable-next-line no-unused-vars
      merge: function merge(iterable /* ...iterbles */) {
        var arguments$1 = arguments;

        var map = anObject(this);
        var setter = aFunction(map.set);
        var i = 0;
        while (i < arguments.length) {
          iterate_1(arguments$1[i++], setter, map, true);
        }
        return map;
      }
    });

    // `Map.prototype.reduce` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Map', proto: true, real: true, forced: isPure }, {
      reduce: function reduce(callbackfn /* , initialValue */) {
        var map = anObject(this);
        var iterator = getMapIterator(map);
        var accumulator, step;
        aFunction(callbackfn);
        if (arguments.length > 1) { accumulator = arguments[1]; }
        else {
          step = iterator.next();
          if (step.done) { throw TypeError('Reduce of empty map with no initial value'); }
          accumulator = step.value[1];
        }
        iterate_1(iterator, function (key, value) {
          accumulator = callbackfn(accumulator, value, key, map);
        }, undefined, true, true);
        return accumulator;
      }
    });

    // `Set.prototype.some` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Map', proto: true, real: true, forced: isPure }, {
      some: function some(callbackfn /* , thisArg */) {
        var map = anObject(this);
        var iterator = getMapIterator(map);
        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        return iterate_1(iterator, function (key, value) {
          if (boundFunction(value, key, map)) { return iterate_1.stop(); }
        }, undefined, true, true).stopped;
      }
    });

    // `Set.prototype.update` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Map', proto: true, real: true, forced: isPure }, {
      update: function update(key, callback /* , thunk */) {
        var map = anObject(this);
        var length = arguments.length;
        aFunction(callback);
        var isPresentInMap = map.has(key);
        if (!isPresentInMap && length < 3) {
          throw TypeError('Updating absent value');
        }
        var value = isPresentInMap ? map.get(key) : aFunction(length > 2 ? arguments[2] : undefined)(key, map);
        map.set(key, callback(value, key, map));
        return map;
      }
    });

    // https://github.com/tc39/collection-methods
    var collectionAddAll = function (/* ...elements */) {
      var arguments$1 = arguments;

      var set = anObject(this);
      var adder = aFunction(set.add);
      for (var k = 0, len = arguments.length; k < len; k++) {
        adder.call(set, arguments$1[k]);
      }
      return set;
    };

    // `Set.prototype.addAll` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Set', proto: true, real: true, forced: isPure }, {
      addAll: function addAll(/* ...elements */) {
        return collectionAddAll.apply(this, arguments);
      }
    });

    // `Set.prototype.deleteAll` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Set', proto: true, real: true, forced: isPure }, {
      deleteAll: function deleteAll(/* ...elements */) {
        return collectionDeleteAll.apply(this, arguments);
      }
    });

    var getSetIterator =  getIterator ;

    // `Set.prototype.every` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Set', proto: true, real: true, forced: isPure }, {
      every: function every(callbackfn /* , thisArg */) {
        var set = anObject(this);
        var iterator = getSetIterator(set);
        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        return !iterate_1(iterator, function (value) {
          if (!boundFunction(value, value, set)) { return iterate_1.stop(); }
        }, undefined, false, true).stopped;
      }
    });

    // `Set.prototype.filter` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Set', proto: true, real: true, forced: isPure }, {
      filter: function filter(callbackfn /* , thisArg */) {
        var set = anObject(this);
        var iterator = getSetIterator(set);
        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
        var adder = aFunction(newSet.add);
        iterate_1(iterator, function (value) {
          if (boundFunction(value, value, set)) { adder.call(newSet, value); }
        }, undefined, false, true);
        return newSet;
      }
    });

    // `Set.prototype.find` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Set', proto: true, real: true, forced: isPure }, {
      find: function find(callbackfn /* , thisArg */) {
        var set = anObject(this);
        var iterator = getSetIterator(set);
        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        return iterate_1(iterator, function (value) {
          if (boundFunction(value, value, set)) { return iterate_1.stop(value); }
        }, undefined, false, true).result;
      }
    });

    // `Set.prototype.join` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Set', proto: true, real: true, forced: isPure }, {
      join: function join(separator) {
        var set = anObject(this);
        var iterator = getSetIterator(set);
        var sep = separator === undefined ? ',' : String(separator);
        var result = [];
        iterate_1(iterator, result.push, result, false, true);
        return result.join(sep);
      }
    });

    // `Set.prototype.map` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Set', proto: true, real: true, forced: isPure }, {
      map: function map(callbackfn /* , thisArg */) {
        var set = anObject(this);
        var iterator = getSetIterator(set);
        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
        var adder = aFunction(newSet.add);
        iterate_1(iterator, function (value) {
          adder.call(newSet, boundFunction(value, value, set));
        }, undefined, false, true);
        return newSet;
      }
    });

    // `Set.prototype.reduce` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Set', proto: true, real: true, forced: isPure }, {
      reduce: function reduce(callbackfn /* , initialValue */) {
        var set = anObject(this);
        var iterator = getSetIterator(set);
        var accumulator, step;
        aFunction(callbackfn);
        if (arguments.length > 1) { accumulator = arguments[1]; }
        else {
          step = iterator.next();
          if (step.done) { throw TypeError('Reduce of empty set with no initial value'); }
          accumulator = step.value;
        }
        iterate_1(iterator, function (value) {
          accumulator = callbackfn(accumulator, value, value, set);
        }, undefined, false, true);
        return accumulator;
      }
    });

    // `Set.prototype.some` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'Set', proto: true, real: true, forced: isPure }, {
      some: function some(callbackfn /* , thisArg */) {
        var set = anObject(this);
        var iterator = getSetIterator(set);
        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        return iterate_1(iterator, function (value) {
          if (boundFunction(value, value, set)) { return iterate_1.stop(); }
        }, undefined, false, true).stopped;
      }
    });

    // `WeakMap.prototype.deleteAll` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'WeakMap', proto: true, real: true, forced: isPure }, {
      deleteAll: function deleteAll(/* ...elements */) {
        return collectionDeleteAll.apply(this, arguments);
      }
    });

    // `WeakSet.prototype.addAll` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'WeakSet', proto: true, real: true, forced: isPure }, {
      addAll: function addAll(/* ...elements */) {
        return collectionAddAll.apply(this, arguments);
      }
    });

    // `WeakSet.prototype.deleteAll` method
    // https://github.com/tc39/proposal-collection-methods
    _export({ target: 'WeakSet', proto: true, real: true, forced: isPure }, {
      deleteAll: function deleteAll(/* ...elements */) {
        return collectionDeleteAll.apply(this, arguments);
      }
    });

    // https://tc39.github.io/proposal-setmap-offrom/




    var collectionFrom = function from(source /* , mapFn, thisArg */) {
      var length = arguments.length;
      var mapFn = length > 1 ? arguments[1] : undefined;
      var mapping, A, n, boundFunction;
      aFunction(this);
      mapping = mapFn !== undefined;
      if (mapping) { aFunction(mapFn); }
      if (source == undefined) { return new this(); }
      A = [];
      if (mapping) {
        n = 0;
        boundFunction = bindContext(mapFn, length > 2 ? arguments[2] : undefined, 2);
        iterate_1(source, function (nextItem) {
          A.push(boundFunction(nextItem, n++));
        });
      } else {
        iterate_1(source, A.push, A);
      }
      return new this(A);
    };

    // `Map.from` method
    // https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
    _export({ target: 'Map', stat: true }, {
      from: collectionFrom
    });

    // https://tc39.github.io/proposal-setmap-offrom/
    var collectionOf = function of() {
      var arguments$1 = arguments;

      var length = arguments.length;
      var A = new Array(length);
      while (length--) { A[length] = arguments$1[length]; }
      return new this(A);
    };

    // `Map.of` method
    // https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
    _export({ target: 'Map', stat: true }, {
      of: collectionOf
    });

    // `Set.from` method
    // https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
    _export({ target: 'Set', stat: true }, {
      from: collectionFrom
    });

    // `Set.of` method
    // https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
    _export({ target: 'Set', stat: true }, {
      of: collectionOf
    });

    // `WeakMap.from` method
    // https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
    _export({ target: 'WeakMap', stat: true }, {
      from: collectionFrom
    });

    // `WeakMap.of` method
    // https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
    _export({ target: 'WeakMap', stat: true }, {
      of: collectionOf
    });

    // `WeakSet.from` method
    // https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
    _export({ target: 'WeakSet', stat: true }, {
      from: collectionFrom
    });

    // `WeakSet.of` method
    // https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
    _export({ target: 'WeakSet', stat: true }, {
      of: collectionOf
    });

    var min$7 = Math.min;
    var max$3 = Math.max;

    // `Math.clamp` method
    // https://rwaldron.github.io/proposal-math-extensions/
    _export({ target: 'Math', stat: true }, {
      clamp: function clamp(x, lower, upper) {
        return min$7(upper, max$3(lower, x));
      }
    });

    // `Math.DEG_PER_RAD` constant
    // https://rwaldron.github.io/proposal-math-extensions/
    _export({ target: 'Math', stat: true }, {
      DEG_PER_RAD: Math.PI / 180
    });

    var RAD_PER_DEG = 180 / Math.PI;

    // `Math.degrees` method
    // https://rwaldron.github.io/proposal-math-extensions/
    _export({ target: 'Math', stat: true }, {
      degrees: function degrees(radians) {
        return radians * RAD_PER_DEG;
      }
    });

    // `Math.scale` method implementation
    // https://rwaldron.github.io/proposal-math-extensions/
    var mathScale = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
      if (
        arguments.length === 0
          /* eslint-disable no-self-compare */
          || x != x
          || inLow != inLow
          || inHigh != inHigh
          || outLow != outLow
          || outHigh != outHigh
          /* eslint-enable no-self-compare */
      ) { return NaN; }
      if (x === Infinity || x === -Infinity) { return x; }
      return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
    };

    // `Math.fscale` method
    // https://rwaldron.github.io/proposal-math-extensions/
    _export({ target: 'Math', stat: true }, {
      fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
        return mathFround(mathScale(x, inLow, inHigh, outLow, outHigh));
      }
    });

    // `Math.RAD_PER_DEG` constant
    // https://rwaldron.github.io/proposal-math-extensions/
    _export({ target: 'Math', stat: true }, {
      RAD_PER_DEG: 180 / Math.PI
    });

    var DEG_PER_RAD = Math.PI / 180;

    // `Math.radians` method
    // https://rwaldron.github.io/proposal-math-extensions/
    _export({ target: 'Math', stat: true }, {
      radians: function radians(degrees) {
        return degrees * DEG_PER_RAD;
      }
    });

    // `Math.scale` method
    // https://rwaldron.github.io/proposal-math-extensions/
    _export({ target: 'Math', stat: true }, {
      scale: mathScale
    });

    // `Math.signbit` method
    // https://github.com/tc39/proposal-Math.signbit
    _export({ target: 'Math', stat: true }, {
      signbit: function signbit(x) {
        // eslint-disable-next-line no-self-compare
        return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
      }
    });

    var INVALID_NUMBER_REPRESENTATION = 'Invalid number representation';
    var INVALID_RADIX = 'Invalid radix';
    var valid = /^[\da-z]+$/;

    // `Number.fromString` method
    // https://github.com/tc39/proposal-number-fromstring
    _export({ target: 'Number', stat: true }, {
      fromString: function fromString(string, radix) {
        var sign = 1;
        var R, mathNum;
        if (typeof string != 'string') { throw TypeError(INVALID_NUMBER_REPRESENTATION); }
        if (!string.length) { throw SyntaxError(INVALID_NUMBER_REPRESENTATION); }
        if (string.charAt(0) == '-') {
          sign = -1;
          string = string.slice(1);
          if (!string.length) { throw SyntaxError(INVALID_NUMBER_REPRESENTATION); }
        }
        R = radix === undefined ? 10 : toInteger(radix);
        if (R < 2 || R > 36) { throw RangeError(INVALID_RADIX); }
        if (!valid.test(string) || (mathNum = _parseInt(string, R)).toString(R) !== string) {
          throw SyntaxError(INVALID_NUMBER_REPRESENTATION);
        }
        return sign * mathNum;
      }
    });

    // https://github.com/tc39/proposal-observable







    var defineProperty$4 = objectDefineProperty.f;








    var OBSERVABLE = wellKnownSymbol('observable');
    var getInternalState$5 = internalState.get;
    var setInternalState$a = internalState.set;

    var getMethod = function (fn) {
      return fn == null ? undefined : aFunction(fn);
    };

    var cleanupSubscription = function (subscriptionState) {
      var cleanup = subscriptionState.cleanup;
      if (cleanup) {
        subscriptionState.cleanup = undefined;
        try {
          cleanup();
        } catch (error) {
          hostReportErrors(error);
        }
      }
    };

    var subscriptionClosed = function (subscriptionState) {
      return subscriptionState.observer === undefined;
    };

    var close = function (subscription, subscriptionState) {
      if (!descriptors) {
        subscription.closed = true;
        var subscriptionObserver = subscriptionState.subscriptionObserver;
        if (subscriptionObserver) { subscriptionObserver.closed = true; }
      } subscriptionState.observer = undefined;
    };

    var Subscription = function (observer, subscriber) {
      var subscriptionState = setInternalState$a(this, {
        cleanup: undefined,
        observer: anObject(observer),
        subscriptionObserver: undefined
      });
      var start;
      if (!descriptors) { this.closed = false; }
      try {
        if (start = getMethod(observer.start)) { start.call(observer, this); }
      } catch (error) {
        hostReportErrors(error);
      }
      if (subscriptionClosed(subscriptionState)) { return; }
      var subscriptionObserver = subscriptionState.subscriptionObserver = new SubscriptionObserver(this);
      try {
        var cleanup = subscriber(subscriptionObserver);
        var subscription = cleanup;
        if (cleanup != null) { subscriptionState.cleanup = typeof cleanup.unsubscribe === 'function'
          ? function () { subscription.unsubscribe(); }
          : aFunction(cleanup); }
      } catch (error) {
        subscriptionObserver.error(error);
        return;
      } if (subscriptionClosed(subscriptionState)) { cleanupSubscription(subscriptionState); }
    };

    Subscription.prototype = redefineAll({}, {
      unsubscribe: function unsubscribe() {
        var subscriptionState = getInternalState$5(this);
        if (!subscriptionClosed(subscriptionState)) {
          close(this, subscriptionState);
          cleanupSubscription(subscriptionState);
        }
      }
    });

    if (descriptors) { defineProperty$4(Subscription.prototype, 'closed', {
      configurable: true,
      get: function () {
        return subscriptionClosed(getInternalState$5(this));
      }
    }); }

    var SubscriptionObserver = function (subscription) {
      setInternalState$a(this, { subscription: subscription });
      if (!descriptors) { this.closed = false; }
    };

    SubscriptionObserver.prototype = redefineAll({}, {
      next: function next(value) {
        var subscriptionState = getInternalState$5(getInternalState$5(this).subscription);
        if (!subscriptionClosed(subscriptionState)) {
          var observer = subscriptionState.observer;
          try {
            var nextMethod = getMethod(observer.next);
            if (nextMethod) { nextMethod.call(observer, value); }
          } catch (error) {
            hostReportErrors(error);
          }
        }
      },
      error: function error(value) {
        var subscription = getInternalState$5(this).subscription;
        var subscriptionState = getInternalState$5(subscription);
        if (!subscriptionClosed(subscriptionState)) {
          var observer = subscriptionState.observer;
          close(subscription, subscriptionState);
          try {
            var errorMethod = getMethod(observer.error);
            if (errorMethod) { errorMethod.call(observer, value); }
            else { hostReportErrors(value); }
          } catch (err) {
            hostReportErrors(err);
          } cleanupSubscription(subscriptionState);
        }
      },
      complete: function complete() {
        var subscription = getInternalState$5(this).subscription;
        var subscriptionState = getInternalState$5(subscription);
        if (!subscriptionClosed(subscriptionState)) {
          var observer = subscriptionState.observer;
          close(subscription, subscriptionState);
          try {
            var completeMethod = getMethod(observer.complete);
            if (completeMethod) { completeMethod.call(observer); }
          } catch (error) {
            hostReportErrors(error);
          } cleanupSubscription(subscriptionState);
        }
      }
    });

    if (descriptors) { defineProperty$4(SubscriptionObserver.prototype, 'closed', {
      configurable: true,
      get: function () {
        return subscriptionClosed(getInternalState$5(getInternalState$5(this).subscription));
      }
    }); }

    var $Observable = function Observable(subscriber) {
      anInstance(this, $Observable, 'Observable');
      setInternalState$a(this, { subscriber: aFunction(subscriber) });
    };

    redefineAll($Observable.prototype, {
      subscribe: function subscribe(observer) {
        var length = arguments.length;
        return new Subscription(typeof observer === 'function' ? {
          next: observer,
          error: length > 1 ? arguments[1] : undefined,
          complete: length > 2 ? arguments[2] : undefined
        } : isObject(observer) ? observer : {}, getInternalState$5(this).subscriber);
      }
    });

    redefineAll($Observable, {
      from: function from(x) {
        var C = typeof this === 'function' ? this : $Observable;
        var observableMethod = getMethod(anObject(x)[OBSERVABLE]);
        if (observableMethod) {
          var observable = anObject(observableMethod.call(x));
          return observable.constructor === C ? observable : new C(function (observer) {
            return observable.subscribe(observer);
          });
        }
        var iterator = getIterator(x);
        return new C(function (observer) {
          iterate_1(iterator, function (it) {
            observer.next(it);
            if (observer.closed) { return iterate_1.stop(); }
          }, undefined, false, true);
          observer.complete();
        });
      },
      of: function of() {
        var arguments$1 = arguments;

        var C = typeof this === 'function' ? this : $Observable;
        var length = arguments.length;
        var items = new Array(length);
        var index = 0;
        while (index < length) { items[index] = arguments$1[index++]; }
        return new C(function (observer) {
          for (var i = 0; i < length; i++) {
            observer.next(items[i]);
            if (observer.closed) { return; }
          } observer.complete();
        });
      }
    });

    hide($Observable.prototype, OBSERVABLE, function () { return this; });

    _export({ global: true }, {
      Observable: $Observable
    });

    setSpecies('Observable');

    // `Symbol.observable` well-known symbol
    // https://github.com/tc39/proposal-observable
    defineWellKnownSymbol('observable');

    // `Symbol.patternMatch` well-known symbol
    // https://github.com/tc39/proposal-pattern-matching
    defineWellKnownSymbol('patternMatch');

    // `Promise.try` method
    // https://github.com/tc39/proposal-promise-try
    _export({ target: 'Promise', stat: true }, {
      'try': function (callbackfn) {
        var promiseCapability = newPromiseCapability.f(this);
        var result = perform(callbackfn);
        (result.error ? promiseCapability.reject : promiseCapability.resolve)(result.value);
        return promiseCapability.promise;
      }
    });

    // TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`





    var Node = function () {
      // keys
      this.object = null;
      this.symbol = null;
      // child nodes
      this.primitives = null;
      this.objectsByIndex = objectCreate(null);
    };

    Node.prototype.get = function (key, initializer) {
      return this[key] || (this[key] = initializer());
    };

    Node.prototype.next = function (i, it, IS_OBJECT) {
      var store = IS_OBJECT
        ? this.objectsByIndex[i] || (this.objectsByIndex[i] = new es_weakMap())
        : this.primitives || (this.primitives = new es_map());
      var entry = store.get(it);
      if (!entry) { store.set(it, entry = new Node()); }
      return entry;
    };

    var root = new Node();

    var compositeKey = function () {
      var arguments$1 = arguments;

      var active = root;
      var length = arguments.length;
      var i, it;
      // for prevent leaking, start from objects
      for (i = 0; i < length; i++) {
        if (isObject(it = arguments$1[i])) { active = active.next(i, it, true); }
      }
      if (this === Object && active === root) { throw TypeError('Composite keys must contain a non-primitive component'); }
      for (i = 0; i < length; i++) {
        if (!isObject(it = arguments$1[i])) { active = active.next(i, it, false); }
      } return active;
    };

    var initializer = function () {
      var freeze = getBuiltIn('Object', 'freeze');
      return freeze ? freeze(objectCreate(null)) : objectCreate(null);
    };

    // https://github.com/tc39/proposal-richer-keys/tree/master/compositeKey
    _export({ global: true }, {
      compositeKey: function compositeKey$1() {
        return compositeKey.apply(Object, arguments).get('object', initializer);
      }
    });

    // https://github.com/tc39/proposal-richer-keys/tree/master/compositeKey
    _export({ global: true }, {
      compositeSymbol: function compositeSymbol() {
        if (arguments.length === 1 && typeof arguments[0] === 'string') { return getBuiltIn('Symbol')['for'](arguments[0]); }
        return compositeKey.apply(null, arguments).get('symbol', getBuiltIn('Symbol'));
      }
    });

    var SEEDED_RANDOM = 'Seeded Random';
    var SEEDED_RANDOM_GENERATOR = SEEDED_RANDOM + ' Generator';
    var setInternalState$b = internalState.set;
    var getInternalState$6 = internalState.getterFor(SEEDED_RANDOM_GENERATOR);
    var SEED_TYPE_ERROR = 'Math.seededPRNG() argument should have a "seed" field with a finite value.';

    var $SeededRandomGenerator = createIteratorConstructor(function SeededRandomGenerator(seed) {
      setInternalState$b(this, {
        type: SEEDED_RANDOM_GENERATOR,
        seed: seed % 2147483647
      });
    }, SEEDED_RANDOM, function next() {
      var state = getInternalState$6(this);
      var seed = state.seed = (state.seed * 1103515245 + 12345) % 2147483647;
      return { value: (seed & 1073741823) / 1073741823, done: false };
    });

    // `Math.seededPRNG` method
    // https://github.com/tc39/proposal-seeded-random
    // based on https://github.com/tc39/proposal-seeded-random/blob/78b8258835b57fc2100d076151ab506bc3202ae6/demo.html
    _export({ target: 'Math', stat: true, forced: true }, {
      seededPRNG: function seededPRNG(it) {
        var seed = anObject(it).seed;
        if (!numberIsFinite(seed)) { throw TypeError(SEED_TYPE_ERROR); }
        return new $SeededRandomGenerator(seed);
      }
    });

    var codeAt$2 = stringMultibyte.codeAt;
    var charAt$3 = stringMultibyte.charAt;
    var STRING_ITERATOR$1 = 'String Iterator';
    var setInternalState$c = internalState.set;
    var getInternalState$7 = internalState.getterFor(STRING_ITERATOR$1);

    // TODO: unify with String#@@iterator
    var $StringIterator = createIteratorConstructor(function StringIterator(string) {
      setInternalState$c(this, {
        type: STRING_ITERATOR$1,
        string: string,
        index: 0
      });
    }, 'String', function next() {
      var state = getInternalState$7(this);
      var string = state.string;
      var index = state.index;
      var point;
      if (index >= string.length) { return { value: undefined, done: true }; }
      point = charAt$3(string, index);
      state.index += point.length;
      return { value: { codePoint: codeAt$2(point, 0), position: index }, done: false };
    });

    // `String.prototype.codePoints` method
    // https://github.com/tc39/proposal-string-prototype-codepoints
    _export({ target: 'String', proto: true }, {
      codePoints: function codePoints() {
        return new $StringIterator(String(requireObjectCoercible(this)));
      }
    });

    // `Symbol.patternMatch` well-known symbol
    // https://github.com/tc39/proposal-using-statement
    defineWellKnownSymbol('dispose');

    var $AggregateError = function AggregateError(errors, message) {
      var that = this;
      if (!(that instanceof $AggregateError)) { return new $AggregateError(errors, message); }
      if (objectSetPrototypeOf) {
        that = objectSetPrototypeOf(new Error(message), objectGetPrototypeOf(that));
      }
      var errorsArray = [];
      iterate_1(errors, errorsArray.push, errorsArray);
      that.errors = errorsArray;
      if (message !== undefined) { hide(that, 'message', String(message)); }
      return that;
    };

    $AggregateError.prototype = objectCreate(Error.prototype, {
      constructor: createPropertyDescriptor(5, $AggregateError),
      name: createPropertyDescriptor(5, 'AggregateError')
    });

    _export({ global: true }, {
      AggregateError: $AggregateError
    });

    var PROMISE_ANY_ERROR = 'No one promise resolved';

    // `Promise.any` method
    // https://github.com/tc39/proposal-promise-any
    _export({ target: 'Promise', stat: true }, {
      any: function any(iterable) {
        var C = this;
        var capability = newPromiseCapability.f(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function () {
          var promiseResolve = aFunction(C.resolve);
          var errors = [];
          var counter = 0;
          var remaining = 1;
          var alreadyResolved = false;
          iterate_1(iterable, function (promise) {
            var index = counter++;
            var alreadyRejected = false;
            errors.push(undefined);
            remaining++;
            promiseResolve.call(C, promise).then(function (value) {
              if (alreadyRejected || alreadyResolved) { return; }
              alreadyResolved = true;
              resolve(value);
            }, function (e) {
              if (alreadyRejected || alreadyResolved) { return; }
              alreadyRejected = true;
              errors[index] = e;
              --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
            });
          });
          --remaining || reject(new (getBuiltIn('AggregateError'))(errors, PROMISE_ANY_ERROR));
        });
        if (result.error) { reject(result.value); }
        return capability.promise;
      }
    });

    // `Set.prototype.difference` method
    // https://github.com/tc39/proposal-set-methods
    _export({ target: 'Set', proto: true, real: true, forced: isPure }, {
      difference: function difference(iterable) {
        var set = anObject(this);
        var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
        var remover = aFunction(newSet['delete']);
        iterate_1(iterable, function (value) {
          remover.call(newSet, value);
        });
        return newSet;
      }
    });

    // `Set.prototype.intersection` method
    // https://github.com/tc39/proposal-set-methods
    _export({ target: 'Set', proto: true, real: true, forced: isPure }, {
      intersection: function intersection(iterable) {
        var set = anObject(this);
        var newSet = new (speciesConstructor(set, getBuiltIn('Set')))();
        var hasCheck = aFunction(set.has);
        var adder = aFunction(newSet.add);
        iterate_1(iterable, function (value) {
          if (hasCheck.call(set, value)) { adder.call(newSet, value); }
        });
        return newSet;
      }
    });

    // `Set.prototype.isDisjointFrom` method
    // https://tc39.github.io/proposal-set-methods/#Set.prototype.isDisjointFrom
    _export({ target: 'Set', proto: true, real: true, forced: isPure }, {
      isDisjointFrom: function isDisjointFrom(iterable) {
        var set = anObject(this);
        var hasCheck = aFunction(set.has);
        return !iterate_1(iterable, function (value) {
          if (hasCheck.call(set, value) === true) { return iterate_1.stop(); }
        }).stopped;
      }
    });

    // `Set.prototype.isSubsetOf` method
    // https://tc39.github.io/proposal-set-methods/#Set.prototype.isSubsetOf
    _export({ target: 'Set', proto: true, real: true, forced: isPure }, {
      isSubsetOf: function isSubsetOf(iterable) {
        var iterator = getIterator(this);
        var otherSet = anObject(iterable);
        var hasCheck = otherSet.has;
        if (typeof hasCheck != 'function') {
          otherSet = new (getBuiltIn('Set'))(iterable);
          hasCheck = aFunction(otherSet.has);
        }
        return !iterate_1(iterator, function (value) {
          if (hasCheck.call(otherSet, value) === false) { return iterate_1.stop(); }
        }, undefined, false, true).stopped;
      }
    });

    // `Set.prototype.isSupersetOf` method
    // https://tc39.github.io/proposal-set-methods/#Set.prototype.isSupersetOf
    _export({ target: 'Set', proto: true, real: true, forced: isPure }, {
      isSupersetOf: function isSupersetOf(iterable) {
        var set = anObject(this);
        var hasCheck = aFunction(set.has);
        return !iterate_1(iterable, function (value) {
          if (hasCheck.call(set, value) === false) { return iterate_1.stop(); }
        }).stopped;
      }
    });

    // `Set.prototype.union` method
    // https://github.com/tc39/proposal-set-methods
    _export({ target: 'Set', proto: true, real: true, forced: isPure }, {
      union: function union(iterable) {
        var set = anObject(this);
        var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
        iterate_1(iterable, aFunction(newSet.add), newSet);
        return newSet;
      }
    });

    // `Set.prototype.symmetricDifference` method
    // https://github.com/tc39/proposal-set-methods
    _export({ target: 'Set', proto: true, real: true, forced: isPure }, {
      symmetricDifference: function symmetricDifference(iterable) {
        var set = anObject(this);
        var newSet = new (speciesConstructor(set, getBuiltIn('Set')))(set);
        var remover = aFunction(newSet['delete']);
        var adder = aFunction(newSet.add);
        iterate_1(iterable, function (value) {
          remover.call(newSet, value) || adder.call(newSet, value);
        });
        return newSet;
      }
    });

    var REPLACE_ALL = wellKnownSymbol('replaceAll');
    var RegExpPrototype$1 = RegExp.prototype;

    var $replaceAll = function (string, replaceValue) {
      var rx = anObject(this);
      var flags = String('flags' in RegExpPrototype$1 ? rx.flags : regexpFlags.call(rx));
      if (!~flags.indexOf('g')) {
        rx = new (speciesConstructor(rx, RegExp))(rx.source, flags + 'g');
      }
      return String(string).replace(rx, replaceValue);
    };

    // `String.prototype.replaceAll` method
    // https://github.com/tc39/proposal-string-replace-all
    _export({ target: 'String', proto: true }, {
      replaceAll: function replaceAll(searchValue, replaceValue) {
        var O = requireObjectCoercible(this);
        var replacer, string, searchString, template, result, index;
        if (searchValue != null) {
          replacer = searchValue[REPLACE_ALL];
          if (replacer !== undefined) {
            return replacer.call(searchValue, O, replaceValue);
          } else if ( isRegexp(searchValue)) {
            return $replaceAll.call(searchValue, O, replaceValue);
          }
        }
        string = String(O);
        searchString = String(searchValue);
        template = string.split(searchString);
        if (typeof replaceValue !== 'function') {
          return template.join(String(replaceValue));
        }
        result = template[0];
        for (index = 1; index < template.length; index++) {
          result += String(replaceValue(searchString, index - 1, string));
          result += template[index];
        }
        return result;
      }
    });

    // `Symbol.replaceAll` well-known symbol
    // https://tc39.github.io/proposal-string-replaceall/
    defineWellKnownSymbol('replaceAll');

    // `globalThis` object
    // https://github.com/tc39/proposal-global
    _export({ global: true }, {
      globalThis: global_1
    });

    // `Promise.allSettled` method
    // https://github.com/tc39/proposal-promise-allSettled
    _export({ target: 'Promise', stat: true }, {
      allSettled: function allSettled(iterable) {
        var C = this;
        var capability = newPromiseCapability.f(C);
        var resolve = capability.resolve;
        var reject = capability.reject;
        var result = perform(function () {
          var promiseResolve = aFunction(C.resolve);
          var values = [];
          var counter = 0;
          var remaining = 1;
          iterate_1(iterable, function (promise) {
            var index = counter++;
            var alreadyCalled = false;
            values.push(undefined);
            remaining++;
            promiseResolve.call(C, promise).then(function (value) {
              if (alreadyCalled) { return; }
              alreadyCalled = true;
              values[index] = { status: 'fulfilled', value: value };
              --remaining || resolve(values);
            }, function (e) {
              if (alreadyCalled) { return; }
              alreadyCalled = true;
              values[index] = { status: 'rejected', reason: e };
              --remaining || resolve(values);
            });
          });
          --remaining || resolve(values);
        });
        if (result.error) { reject(result.value); }
        return capability.promise;
      }
    });

    // iterable DOM collections
    // flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
    var domIterables = {
      CSSRuleList: 0,
      CSSStyleDeclaration: 0,
      CSSValueList: 0,
      ClientRectList: 0,
      DOMRectList: 0,
      DOMStringList: 0,
      DOMTokenList: 1,
      DataTransferItemList: 0,
      FileList: 0,
      HTMLAllCollection: 0,
      HTMLCollection: 0,
      HTMLFormElement: 0,
      HTMLSelectElement: 0,
      MediaList: 0,
      MimeTypeArray: 0,
      NamedNodeMap: 0,
      NodeList: 1,
      PaintRequestList: 0,
      Plugin: 0,
      PluginArray: 0,
      SVGLengthList: 0,
      SVGNumberList: 0,
      SVGPathSegList: 0,
      SVGPointList: 0,
      SVGStringList: 0,
      SVGTransformList: 0,
      SourceBufferList: 0,
      StyleSheetList: 0,
      TextTrackCueList: 0,
      TextTrackList: 0,
      TouchList: 0
    };

    var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');

    for (var COLLECTION_NAME in domIterables) {
      var Collection = global_1[COLLECTION_NAME];
      var CollectionPrototype = Collection && Collection.prototype;
      if (CollectionPrototype && !CollectionPrototype[TO_STRING_TAG$3]) {
        hide(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
      }
      iterators[COLLECTION_NAME] = iterators.Array;
    }

    var FORCED$f = !global_1.setImmediate || !global_1.clearImmediate;

    // http://w3c.github.io/setImmediate/
    _export({ global: true, bind: true, enumerable: true, forced: FORCED$f }, {
      // `setImmediate` method
      // http://w3c.github.io/setImmediate/#si-setImmediate
      setImmediate: task.set,
      // `clearImmediate` method
      // http://w3c.github.io/setImmediate/#si-clearImmediate
      clearImmediate: task.clear
    });

    var process$4 = global_1.process;
    var isNode = classofRaw(process$4) == 'process';

    // `queueMicrotask` method
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-queuemicrotask
    _export({ global: true, enumerable: true, noTargetGet: true }, {
      queueMicrotask: function queueMicrotask(fn) {
        var domain = isNode && process$4.domain;
        microtask(domain ? domain.bind(fn) : fn);
      }
    });

    var slice$1 = [].slice;
    var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check

    var wrap$1 = function (scheduler) {
      return function (handler, timeout /* , ...arguments */) {
        var boundArgs = arguments.length > 2;
        var args = boundArgs ? slice$1.call(arguments, 2) : undefined;
        return scheduler(boundArgs ? function () {
          // eslint-disable-next-line no-new-func
          (typeof handler == 'function' ? handler : Function(handler)).apply(this, args);
        } : handler, timeout);
      };
    };

    // ie9- setTimeout & setInterval additional parameters fix
    // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
    _export({ global: true, bind: true, forced: MSIE }, {
      // `setTimeout` method
      // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-settimeout
      setTimeout: wrap$1(global_1.setTimeout),
      // `setInterval` method
      // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-setinterval
      setInterval: wrap$1(global_1.setInterval)
    });

    var coreJsPure = path;

    function auto (form_key,options) {
        if(!form_key) {
            Log.error("Form key was not set");
            return
        }
        if(options) {
            my_options=coreJsPure({}, options);
            my_options.form_key = form_key;
        } else {
            my_options={form_key: form_key};
        }
        if(my_options.debug) {
            Log.debug = my_options.debug;
            delete my_options.debug; //don't want to keep passing this down to each Verify
        }
        var activated_forms=[];
        for(form in document.forms) { //olde-skoole DOM0 FTW!
            Log.debug("Checking form: "+form+" for verifiable email address fields...");
            for(element in document.forms[form].elements) {
                Log.debug("Checking field #"+element+" to see if it's an email address field");
                var this_field = document.forms[form].elements[element];
                if(this_field.type == "email" || this_field.name == "email" || this_field.id == "email") {
                    var options_copy = coreJsPure({},options);
                    Log.debug("Found candidate field. Name: "+this_field.name+" Type: "+this_field.type+" ID: "+this_field.id);
                    options_copy.form = document.forms[form];
                    options_copy.email_field = this_field;
                    activated_forms.push(new Form(my_options));
                }
            }
        }
        return activated_forms
    }

    function index (form_key, options) {
        if(options && options.debug) {
            Log.debug = options.debug;
        }
        if(!form_key) {
            Log.error("Form key was not set");
        }
        if(!options || (!options.email_field && !options.manual)) {
            return auto()
        }
        return new Form(form_key, options)
    }

    return index;

}));
