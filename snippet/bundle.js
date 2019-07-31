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

    var tingle_min = createCommonjsModule(function (module, exports) {
    !function(t,o){module.exports=o();}(commonjsGlobal,function(){function t(t){var o={onClose:null,onOpen:null,beforeOpen:null,beforeClose:null,stickyFooter:!1,footer:!1,cssClass:[],closeLabel:"Close",closeMethods:["overlay","button","escape"]};this.opts=r({},o,t),this.init();}function o(){return '<svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg"><path d="M.3 9.7c.2.2.4.3.7.3.3 0 .5-.1.7-.3L5 6.4l3.3 3.3c.2.2.5.3.7.3.2 0 .5-.1.7-.3.4-.4.4-1 0-1.4L6.4 5l3.3-3.3c.4-.4.4-1 0-1.4-.4-.4-1-.4-1.4 0L5 3.6 1.7.3C1.3-.1.7-.1.3.3c-.4.4-.4 1 0 1.4L3.6 5 .3 8.3c-.4.4-.4 1 0 1.4z" fill="#000" fill-rule="nonzero"/></svg>'}function e(){this.modalBoxFooter&&(this.modalBoxFooter.style.width=this.modalBox.clientWidth+"px",this.modalBoxFooter.style.left=this.modalBox.offsetLeft+"px");}function s(){this.modal=document.createElement("div"),this.modal.classList.add("tingle-modal"),0!==this.opts.closeMethods.length&&-1!==this.opts.closeMethods.indexOf("overlay")||this.modal.classList.add("tingle-modal--noOverlayClose"),this.modal.style.display="none",this.opts.cssClass.forEach(function(t){"string"==typeof t&&this.modal.classList.add(t);},this),-1!==this.opts.closeMethods.indexOf("button")&&(this.modalCloseBtn=document.createElement("button"),this.modalCloseBtn.type="button",this.modalCloseBtn.classList.add("tingle-modal__close"),this.modalCloseBtnIcon=document.createElement("span"),this.modalCloseBtnIcon.classList.add("tingle-modal__closeIcon"),this.modalCloseBtnIcon.innerHTML=o(),this.modalCloseBtnLabel=document.createElement("span"),this.modalCloseBtnLabel.classList.add("tingle-modal__closeLabel"),this.modalCloseBtnLabel.innerHTML=this.opts.closeLabel,this.modalCloseBtn.appendChild(this.modalCloseBtnIcon),this.modalCloseBtn.appendChild(this.modalCloseBtnLabel)),this.modalBox=document.createElement("div"),this.modalBox.classList.add("tingle-modal-box"),this.modalBoxContent=document.createElement("div"),this.modalBoxContent.classList.add("tingle-modal-box__content"),this.modalBox.appendChild(this.modalBoxContent),-1!==this.opts.closeMethods.indexOf("button")&&this.modal.appendChild(this.modalCloseBtn),this.modal.appendChild(this.modalBox);}function i(){this.modalBoxFooter=document.createElement("div"),this.modalBoxFooter.classList.add("tingle-modal-box__footer"),this.modalBox.appendChild(this.modalBoxFooter);}function n(){this._events={clickCloseBtn:this.close.bind(this),clickOverlay:d.bind(this),resize:this.checkOverflow.bind(this),keyboardNav:l.bind(this)},-1!==this.opts.closeMethods.indexOf("button")&&this.modalCloseBtn.addEventListener("click",this._events.clickCloseBtn),this.modal.addEventListener("mousedown",this._events.clickOverlay),window.addEventListener("resize",this._events.resize),document.addEventListener("keydown",this._events.keyboardNav);}function l(t){-1!==this.opts.closeMethods.indexOf("escape")&&27===t.which&&this.isOpen()&&this.close();}function d(t){-1!==this.opts.closeMethods.indexOf("overlay")&&!a(t.target,"tingle-modal")&&t.clientX<this.modal.clientWidth&&this.close();}function a(t,o){for(;(t=t.parentElement)&&!t.classList.contains(o);){ }return t}function h(){-1!==this.opts.closeMethods.indexOf("button")&&this.modalCloseBtn.removeEventListener("click",this._events.clickCloseBtn),this.modal.removeEventListener("mousedown",this._events.clickOverlay),window.removeEventListener("resize",this._events.resize),document.removeEventListener("keydown",this._events.keyboardNav);}function r(){
    var arguments$1 = arguments;
    for(var t=1;t<arguments.length;t++){ for(var o in arguments[t]){ arguments$1[t].hasOwnProperty(o)&&(arguments$1[0][o]=arguments$1[t][o]); } }return arguments[0]}var c=!1;return t.prototype.init=function(){if(!this.modal){ return s.call(this),n.call(this),document.body.insertBefore(this.modal,document.body.firstChild),this.opts.footer&&this.addFooter(),this }},t.prototype._busy=function(t){c=t;},t.prototype._isBusy=function(){return c},t.prototype.destroy=function(){null!==this.modal&&(this.isOpen()&&this.close(!0),h.call(this),this.modal.parentNode.removeChild(this.modal),this.modal=null);},t.prototype.isOpen=function(){return !!this.modal.classList.contains("tingle-modal--visible")},t.prototype.open=function(){if(!this._isBusy()){this._busy(!0);var t=this;return "function"==typeof t.opts.beforeOpen&&t.opts.beforeOpen(),this.modal.style.removeProperty?this.modal.style.removeProperty("display"):this.modal.style.removeAttribute("display"),this._scrollPosition=window.pageYOffset,document.body.classList.add("tingle-enabled"),document.body.style.top=-this._scrollPosition+"px",this.setStickyFooter(this.opts.stickyFooter),this.modal.classList.add("tingle-modal--visible"),"function"==typeof t.opts.onOpen&&t.opts.onOpen.call(t),t._busy(!1),this.checkOverflow(),this}},t.prototype.close=function(t){if(!this._isBusy()){if(this._busy(!0),"function"==typeof this.opts.beforeClose){if(!this.opts.beforeClose.call(this)){ return void this._busy(!1) }}document.body.classList.remove("tingle-enabled"),window.scrollTo(0,this._scrollPosition),document.body.style.top=null,this.modal.classList.remove("tingle-modal--visible");var o=this;o.modal.style.display="none","function"==typeof o.opts.onClose&&o.opts.onClose.call(this),o._busy(!1);}},t.prototype.setContent=function(t){return "string"==typeof t?this.modalBoxContent.innerHTML=t:(this.modalBoxContent.innerHTML="",this.modalBoxContent.appendChild(t)),this.isOpen()&&this.checkOverflow(),this},t.prototype.getContent=function(){return this.modalBoxContent},t.prototype.addFooter=function(){return i.call(this),this},t.prototype.setFooterContent=function(t){return this.modalBoxFooter.innerHTML=t,this},t.prototype.getFooterContent=function(){return this.modalBoxFooter},t.prototype.setStickyFooter=function(t){return this.isOverflow()||(t=!1),t?this.modalBox.contains(this.modalBoxFooter)&&(this.modalBox.removeChild(this.modalBoxFooter),this.modal.appendChild(this.modalBoxFooter),this.modalBoxFooter.classList.add("tingle-modal-box__footer--sticky"),e.call(this),this.modalBoxContent.style["padding-bottom"]=this.modalBoxFooter.clientHeight+20+"px"):this.modalBoxFooter&&(this.modalBox.contains(this.modalBoxFooter)||(this.modal.removeChild(this.modalBoxFooter),this.modalBox.appendChild(this.modalBoxFooter),this.modalBoxFooter.style.width="auto",this.modalBoxFooter.style.left="",this.modalBoxContent.style["padding-bottom"]="",this.modalBoxFooter.classList.remove("tingle-modal-box__footer--sticky"))),this},t.prototype.addFooterBtn=function(t,o,e){var s=document.createElement("button");return s.innerHTML=t,s.addEventListener("click",e),"string"==typeof o&&o.length&&o.split(" ").forEach(function(t){s.classList.add(t);}),this.modalBoxFooter.appendChild(s),s},t.prototype.resize=function(){console.warn("Resize is deprecated and will be removed in version 1.0");},t.prototype.isOverflow=function(){var t=window.innerHeight;return this.modalBox.clientHeight>=t},t.prototype.checkOverflow=function(){this.modal.classList.contains("tingle-modal--visible")&&(this.isOverflow()?this.modal.classList.add("tingle-modal--overflow"):this.modal.classList.remove("tingle-modal--overflow"),!this.isOverflow()&&this.opts.stickyFooter?this.setStickyFooter(!1):this.isOverflow()&&this.opts.stickyFooter&&(e.call(this),this.setStickyFooter(!0)));},{modal:t}});
    });

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

    var css = ".tingle-modal *{box-sizing:border-box}.tingle-modal{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1000;display:-ms-flexbox;display:flex;visibility:hidden;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;overflow:hidden;-webkit-overflow-scrolling:touch;background:rgba(0,0,0,.85);opacity:0;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:pointer}.tingle-modal--noClose .tingle-modal__close,.tingle-modal__closeLabel{display:none}.tingle-modal--confirm .tingle-modal-box{text-align:center}.tingle-modal--noOverlayClose{cursor:default}.tingle-modal__close{position:fixed;top:2rem;right:2rem;z-index:1000;padding:0;width:2rem;height:2rem;border:none;background-color:transparent;color:#fff;cursor:pointer}.tingle-modal__close svg *{fill:currentColor}.tingle-modal__close:hover{color:#fff}.tingle-modal-box{position:relative;-ms-flex-negative:0;flex-shrink:0;margin-top:auto;margin-bottom:auto;width:60%;border-radius:4px;background:#fff;opacity:1;cursor:auto;will-change:transform,opacity}.tingle-modal-box__content{padding:3rem}.tingle-modal-box__footer{padding:1.5rem 2rem;width:auto;border-bottom-right-radius:4px;border-bottom-left-radius:4px;background-color:#f5f5f5;cursor:auto}.tingle-modal-box__footer::after{display:table;clear:both;content:\"\"}.tingle-modal-box__footer--sticky{position:fixed;bottom:-200px;z-index:10001;opacity:1;transition:bottom .3s ease-in-out .3s}.tingle-enabled{position:fixed;right:0;left:0;overflow:hidden}.tingle-modal--visible .tingle-modal-box__footer{bottom:0}.tingle-enabled .tingle-content-wrapper{filter:blur(8px)}.tingle-modal--visible{visibility:visible;opacity:1}.tingle-modal--visible .tingle-modal-box{animation:scale .2s cubic-bezier(.68,-.55,.265,1.55) forwards}.tingle-modal--overflow{overflow-y:scroll;padding-top:8vh}.tingle-btn{display:inline-block;margin:0 .5rem;padding:1rem 2rem;border:none;background-color:grey;box-shadow:none;color:#fff;vertical-align:middle;text-decoration:none;font-size:inherit;font-family:inherit;line-height:normal;cursor:pointer;transition:background-color .4s ease}.tingle-btn--primary{background-color:#3498db}.tingle-btn--danger{background-color:#e74c3c}.tingle-btn--default{background-color:#34495e}.tingle-btn--pull-left{float:left}.tingle-btn--pull-right{float:right}@media (max-width :540px){.tingle-modal{top:0;display:block;padding-top:60px;width:100%}.tingle-modal-box{width:auto;border-radius:0}.tingle-modal-box__content{overflow-y:scroll}.tingle-modal--noClose{top:0}.tingle-modal--noOverlayClose{padding-top:0}.tingle-modal-box__footer .tingle-btn{display:block;float:none;margin-bottom:1rem;width:100%}.tingle-modal__close{top:0;right:0;left:0;display:block;width:100%;height:60px;border:none;background-color:#2c3e50;box-shadow:none;color:#fff}.tingle-modal__closeLabel{display:inline-block;vertical-align:middle;font-size:1.6rem;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen,Ubuntu,Cantarell,\"Fira Sans\",\"Droid Sans\",\"Helvetica Neue\",sans-serif}.tingle-modal__closeIcon{display:inline-block;margin-right:.8rem;width:1.6rem;vertical-align:middle;font-size:0}}@supports ((-webkit-backdrop-filter:blur(12px)) or (backdrop-filter:blur(12px))){.tingle-modal{-webkit-backdrop-filter:blur(20px);backdrop-filter:blur(20px)}@media (max-width :540px){.tingle-modal{-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px)}}.tingle-enabled .tingle-content-wrapper{filter:none}}@keyframes scale{0%{opacity:0;transform:scale(.9)}100%{opacity:1;transform:scale(1)}}";
    styleInject(css);

    //if other people are also using the Tingle library, then this would prevent us all from conflicting with each other

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
                if(old_onsubmit) {
                    var results$1 = old_onsubmit(event); //FIXME - confusing, *their* old onsubmit handler fires *first*?
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
            log.debug("Verification results are: "+results);
            switch(results.status) {
                case "BAD":
                //FIRE HOOKS FIRST? FIXME
                this$1.mytooltip = new Tooltip(this$1.email_field);
                this$1.mytooltip.show();
                this$1.disable_submits();
                break

                case "GOOD":
                //FIRE HOOKS FIRST? FIXME
                if(this$1.mytooltip) {
                    this$1.mytooltip.hide();
                }
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

    Form.prototype.display_challenge_modal = function display_challenge_modal (challenge_key) {
            var this$1 = this;

        if(!this.modal) {
            this.modal = new tingle_min.modal({
                footer: true,
                stickyFooter: false,
                closeMethods: ['button'], // ['overlay', 'button', 'escape'],
                closeLabel: "Close",
                //cssClass: ['custom-class-1', 'custom-class-2'],
                onOpen: function() {
                    console.log('modal open');
                },
                onClose: function() {
                    console.log('modal closed');
                },
                beforeClose: function() {
                    // here's goes some logic
                    // e.g. save content before closing the modal
                    return true // close the modal
                    //return false; // nothing happens
                }
            });
            this.modal.addFooterBtn('Cancel', 'tingle-btn', function () {
                // here goes some logic
                this$1.modal.close();
            });
                
            this.modal.addFooterBtn('Send Challenge Email', 'tingle-btn tingle-btn--primary', function () {
                // here goes some logic
                if(this$1.email_field.value != document.getElementById('goodverification_challenge_address').value) {
                    log.debug("Field value: "+this$1.email_field.value+" , challenge_address: "+document.getElementById('goodverification_challenge_address').value);
                    this$1.modal.setContent("Email doesn't match field on form!");
                    //can we yank the 'submit' button? FIXME!
                    return
                }
                this$1.challenge(this$1.email_field.value,challenge_key, function (results) {
                    log.debug("Challenge results are: "+results);
                    console.dir(results);
                    if(results.status == "ACCEPTED") {
                        this$1.modal.setContent("Input emailed PIN: <input type='text' id='goodverification_pin' />");
                    }
                });
                //this.modal.close()
            });
        }
        this.modal.setContent("Too many verifications from this IP. We need to send you an email to verify that you are you! "+
                                "If you agree, re-type your email here: <input type='text' id='goodverification_challenge_address' />");
        this.modal.open();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJsb2dnaW5nLmpzIiwidXRpbHMuanMiLCJub2RlX21vZHVsZXMvYnJvd3Nlci1qc29ucC9saWIvanNvbnAuanMiLCJub2RlX21vZHVsZXMvdGluZ2xlLmpzL2Rpc3QvdGluZ2xlLm1pbi5qcyIsIm5vZGVfbW9kdWxlcy9zdHlsZS1pbmplY3QvZGlzdC9zdHlsZS1pbmplY3QuZXMuanMiLCJmb3JtLmpzIiwiYXV0by5qcyIsImluZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIExvZyB7XG4gICAgY29uc3RydWN0b3IoZGVidWdfZW5hYmxlZCA9IGZhbHNlKSB7XG4gICAgICAgIHRoaXMuZGVidWdfZW5hYmxlZCA9IGRlYnVnX2VuYWJsZWRcbiAgICB9XG5cbiAgICBlcnJvcihtc2cpIHtcbiAgICAgICAgaWYoIXRoaXMubG9nX2F0X2xldmVsKCdlcnJvcicsbXNnKSkge1xuICAgICAgICAgICAgd2luZG93LmFsZXJ0KFwiRXJyb3I6IFwiK21zZylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlYnVnKG1zZykge1xuICAgICAgICBpZih0aGlzLmRlYnVnX2VuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nX2F0X2xldmVsKCdkZWJ1ZycsbXNnKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbG9nX2F0X2xldmVsKGxldmVsLG1zZykge1xuICAgICAgICBpZihjb25zb2xlICYmIGNvbnNvbGVbbGV2ZWxdKSB7XG4gICAgICAgICAgICBjb25zb2xlW2xldmVsXShtc2cpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbn1cblxudmFyIGxvZyA9IG5ldyBMb2coKVxuXG5cbmV4cG9ydCBkZWZhdWx0IGxvZ1xuXG4vL2RlYnVnLGluZm8sd2FybixlcnJvciIsImV4cG9ydCBmdW5jdGlvbiBkdXBsaWNhdGUgKG9iaikge1xuICAgIC8vbmFpdmUsIHNpbmdsZS1sZXZlbCwgbm9uLWRlZXAgJ2R1cGxpY2F0ZScgZnVuY3Rpb24gZm9yIG9iamVjdHNcbiAgICBsZXQgbmV3b2JqPXt9XG4gICAgZm9yKGxldCBpIGluIG9iaikge1xuICAgICAgICBuZXdvYmpbaV0gPSBvYmpbaV1cbiAgICB9XG4gICAgcmV0dXJuIG5ld29ialxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNfYXJyYXkob2JqKSB7XG4gICAgLy8gY29uc29sZS53YXJuKFwiVGhlIHByb3RvdHlwZSB0aGluZyBpczogXCIrT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpXG4gICAgaWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT0gXCJbb2JqZWN0IEFycmF5XVwiKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxufSIsIihmdW5jdGlvbigpIHtcbiAgdmFyIEpTT05QLCBjb21wdXRlZFVybCwgY3JlYXRlRWxlbWVudCwgZW5jb2RlLCBub29wLCBvYmplY3RUb1VSSSwgcmFuZG9tLCByYW5kb21TdHJpbmc7XG5cbiAgY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uKHRhZykge1xuICAgIHJldHVybiB3aW5kb3cuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICB9O1xuXG4gIGVuY29kZSA9IHdpbmRvdy5lbmNvZGVVUklDb21wb25lbnQ7XG5cbiAgcmFuZG9tID0gTWF0aC5yYW5kb207XG5cbiAgSlNPTlAgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIGNhbGxiYWNrLCBjYWxsYmFja0Z1bmMsIGNhbGxiYWNrTmFtZSwgZG9uZSwgaGVhZCwgcGFyYW1zLCBzY3JpcHQ7XG4gICAgaWYgKG9wdGlvbnMgPT0gbnVsbCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBwYXJhbXMgPSB7XG4gICAgICBkYXRhOiBvcHRpb25zLmRhdGEgfHwge30sXG4gICAgICBlcnJvcjogb3B0aW9ucy5lcnJvciB8fCBub29wLFxuICAgICAgc3VjY2Vzczogb3B0aW9ucy5zdWNjZXNzIHx8IG5vb3AsXG4gICAgICBiZWZvcmVTZW5kOiBvcHRpb25zLmJlZm9yZVNlbmQgfHwgbm9vcCxcbiAgICAgIGNvbXBsZXRlOiBvcHRpb25zLmNvbXBsZXRlIHx8IG5vb3AsXG4gICAgICB1cmw6IG9wdGlvbnMudXJsIHx8ICcnXG4gICAgfTtcbiAgICBwYXJhbXMuY29tcHV0ZWRVcmwgPSBjb21wdXRlZFVybChwYXJhbXMpO1xuICAgIGlmIChwYXJhbXMudXJsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nVXJsJyk7XG4gICAgfVxuICAgIGRvbmUgPSBmYWxzZTtcbiAgICBpZiAocGFyYW1zLmJlZm9yZVNlbmQoe30sIHBhcmFtcykgIT09IGZhbHNlKSB7XG4gICAgICBjYWxsYmFja05hbWUgPSBvcHRpb25zLmNhbGxiYWNrTmFtZSB8fCAnY2FsbGJhY2snO1xuICAgICAgY2FsbGJhY2tGdW5jID0gb3B0aW9ucy5jYWxsYmFja0Z1bmMgfHwgJ2pzb25wXycgKyByYW5kb21TdHJpbmcoMTUpO1xuICAgICAgY2FsbGJhY2sgPSBwYXJhbXMuZGF0YVtjYWxsYmFja05hbWVdID0gY2FsbGJhY2tGdW5jO1xuICAgICAgd2luZG93W2NhbGxiYWNrXSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgd2luZG93W2NhbGxiYWNrXSA9IG51bGw7XG4gICAgICAgIHBhcmFtcy5zdWNjZXNzKGRhdGEsIHBhcmFtcyk7XG4gICAgICAgIHJldHVybiBwYXJhbXMuY29tcGxldGUoZGF0YSwgcGFyYW1zKTtcbiAgICAgIH07XG4gICAgICBzY3JpcHQgPSBjcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHNjcmlwdC5zcmMgPSBjb21wdXRlZFVybChwYXJhbXMpO1xuICAgICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICAgIHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIHBhcmFtcy5lcnJvcih7XG4gICAgICAgICAgdXJsOiBzY3JpcHQuc3JjLFxuICAgICAgICAgIGV2ZW50OiBldnRcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBwYXJhbXMuY29tcGxldGUoe1xuICAgICAgICAgIHVybDogc2NyaXB0LnNyYyxcbiAgICAgICAgICBldmVudDogZXZ0XG4gICAgICAgIH0sIHBhcmFtcyk7XG4gICAgICB9O1xuICAgICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlZiwgcmVmMTtcbiAgICAgICAgaWYgKGRvbmUgfHwgKChyZWYgPSB0aGlzLnJlYWR5U3RhdGUpICE9PSAnbG9hZGVkJyAmJiByZWYgIT09ICdjb21wbGV0ZScpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICBpZiAoc2NyaXB0KSB7XG4gICAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xuICAgICAgICAgIGlmICgocmVmMSA9IHNjcmlwdC5wYXJlbnROb2RlKSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZWYxLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBzY3JpcHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgaGVhZCA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdIHx8IHdpbmRvdy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICBoZWFkLmluc2VydEJlZm9yZShzY3JpcHQsIGhlYWQuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBhYm9ydDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHdpbmRvd1tjYWxsYmFja10gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gd2luZG93W2NhbGxiYWNrXSA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgICBpZiAoc2NyaXB0ICE9IG51bGwgPyBzY3JpcHQucGFyZW50Tm9kZSA6IHZvaWQgMCkge1xuICAgICAgICAgIHNjcmlwdC5vbmxvYWQgPSBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcbiAgICAgICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgIHJldHVybiBzY3JpcHQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfTtcblxuICBub29wID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHZvaWQgMDtcbiAgfTtcblxuICBjb21wdXRlZFVybCA9IGZ1bmN0aW9uKHBhcmFtcykge1xuICAgIHZhciB1cmw7XG4gICAgdXJsID0gcGFyYW1zLnVybDtcbiAgICB1cmwgKz0gcGFyYW1zLnVybC5pbmRleE9mKCc/JykgPCAwID8gJz8nIDogJyYnO1xuICAgIHVybCArPSBvYmplY3RUb1VSSShwYXJhbXMuZGF0YSk7XG4gICAgcmV0dXJuIHVybDtcbiAgfTtcblxuICByYW5kb21TdHJpbmcgPSBmdW5jdGlvbihsZW5ndGgpIHtcbiAgICB2YXIgc3RyO1xuICAgIHN0ciA9ICcnO1xuICAgIHdoaWxlIChzdHIubGVuZ3RoIDwgbGVuZ3RoKSB7XG4gICAgICBzdHIgKz0gcmFuZG9tKCkudG9TdHJpbmcoMzYpLnNsaWNlKDIsIDMpO1xuICAgIH1cbiAgICByZXR1cm4gc3RyO1xuICB9O1xuXG4gIG9iamVjdFRvVVJJID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIGRhdGEsIGtleSwgdmFsdWU7XG4gICAgZGF0YSA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgICAgIHZhbHVlID0gb2JqW2tleV07XG4gICAgICAgIHJlc3VsdHMucHVzaChlbmNvZGUoa2V5KSArICc9JyArIGVuY29kZSh2YWx1ZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgICByZXR1cm4gZGF0YS5qb2luKCcmJyk7XG4gIH07XG5cbiAgaWYgKHR5cGVvZiBkZWZpbmUgIT09IFwidW5kZWZpbmVkXCIgJiYgZGVmaW5lICE9PSBudWxsID8gZGVmaW5lLmFtZCA6IHZvaWQgMCkge1xuICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBKU09OUDtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiICYmIG1vZHVsZSAhPT0gbnVsbCA/IG1vZHVsZS5leHBvcnRzIDogdm9pZCAwKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBKU09OUDtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLkpTT05QID0gSlNPTlA7XG4gIH1cblxufSkuY2FsbCh0aGlzKTtcbiIsIiFmdW5jdGlvbih0LG8pe1wiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUobyk6XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9bygpOnQudGluZ2xlPW8oKX0odGhpcyxmdW5jdGlvbigpe2Z1bmN0aW9uIHQodCl7dmFyIG89e29uQ2xvc2U6bnVsbCxvbk9wZW46bnVsbCxiZWZvcmVPcGVuOm51bGwsYmVmb3JlQ2xvc2U6bnVsbCxzdGlja3lGb290ZXI6ITEsZm9vdGVyOiExLGNzc0NsYXNzOltdLGNsb3NlTGFiZWw6XCJDbG9zZVwiLGNsb3NlTWV0aG9kczpbXCJvdmVybGF5XCIsXCJidXR0b25cIixcImVzY2FwZVwiXX07dGhpcy5vcHRzPXIoe30sbyx0KSx0aGlzLmluaXQoKX1mdW5jdGlvbiBvKCl7cmV0dXJuJzxzdmcgdmlld0JveD1cIjAgMCAxMCAxMFwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj48cGF0aCBkPVwiTS4zIDkuN2MuMi4yLjQuMy43LjMuMyAwIC41LS4xLjctLjNMNSA2LjRsMy4zIDMuM2MuMi4yLjUuMy43LjMuMiAwIC41LS4xLjctLjMuNC0uNC40LTEgMC0xLjRMNi40IDVsMy4zLTMuM2MuNC0uNC40LTEgMC0xLjQtLjQtLjQtMS0uNC0xLjQgMEw1IDMuNiAxLjcuM0MxLjMtLjEuNy0uMS4zLjNjLS40LjQtLjQgMSAwIDEuNEwzLjYgNSAuMyA4LjNjLS40LjQtLjQgMSAwIDEuNHpcIiBmaWxsPVwiIzAwMFwiIGZpbGwtcnVsZT1cIm5vbnplcm9cIi8+PC9zdmc+J31mdW5jdGlvbiBlKCl7dGhpcy5tb2RhbEJveEZvb3RlciYmKHRoaXMubW9kYWxCb3hGb290ZXIuc3R5bGUud2lkdGg9dGhpcy5tb2RhbEJveC5jbGllbnRXaWR0aCtcInB4XCIsdGhpcy5tb2RhbEJveEZvb3Rlci5zdHlsZS5sZWZ0PXRoaXMubW9kYWxCb3gub2Zmc2V0TGVmdCtcInB4XCIpfWZ1bmN0aW9uIHMoKXt0aGlzLm1vZGFsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksdGhpcy5tb2RhbC5jbGFzc0xpc3QuYWRkKFwidGluZ2xlLW1vZGFsXCIpLDAhPT10aGlzLm9wdHMuY2xvc2VNZXRob2RzLmxlbmd0aCYmLTEhPT10aGlzLm9wdHMuY2xvc2VNZXRob2RzLmluZGV4T2YoXCJvdmVybGF5XCIpfHx0aGlzLm1vZGFsLmNsYXNzTGlzdC5hZGQoXCJ0aW5nbGUtbW9kYWwtLW5vT3ZlcmxheUNsb3NlXCIpLHRoaXMubW9kYWwuc3R5bGUuZGlzcGxheT1cIm5vbmVcIix0aGlzLm9wdHMuY3NzQ2xhc3MuZm9yRWFjaChmdW5jdGlvbih0KXtcInN0cmluZ1wiPT10eXBlb2YgdCYmdGhpcy5tb2RhbC5jbGFzc0xpc3QuYWRkKHQpfSx0aGlzKSwtMSE9PXRoaXMub3B0cy5jbG9zZU1ldGhvZHMuaW5kZXhPZihcImJ1dHRvblwiKSYmKHRoaXMubW9kYWxDbG9zZUJ0bj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpLHRoaXMubW9kYWxDbG9zZUJ0bi50eXBlPVwiYnV0dG9uXCIsdGhpcy5tb2RhbENsb3NlQnRuLmNsYXNzTGlzdC5hZGQoXCJ0aW5nbGUtbW9kYWxfX2Nsb3NlXCIpLHRoaXMubW9kYWxDbG9zZUJ0bkljb249ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIiksdGhpcy5tb2RhbENsb3NlQnRuSWNvbi5jbGFzc0xpc3QuYWRkKFwidGluZ2xlLW1vZGFsX19jbG9zZUljb25cIiksdGhpcy5tb2RhbENsb3NlQnRuSWNvbi5pbm5lckhUTUw9bygpLHRoaXMubW9kYWxDbG9zZUJ0bkxhYmVsPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpLHRoaXMubW9kYWxDbG9zZUJ0bkxhYmVsLmNsYXNzTGlzdC5hZGQoXCJ0aW5nbGUtbW9kYWxfX2Nsb3NlTGFiZWxcIiksdGhpcy5tb2RhbENsb3NlQnRuTGFiZWwuaW5uZXJIVE1MPXRoaXMub3B0cy5jbG9zZUxhYmVsLHRoaXMubW9kYWxDbG9zZUJ0bi5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsQ2xvc2VCdG5JY29uKSx0aGlzLm1vZGFsQ2xvc2VCdG4uYXBwZW5kQ2hpbGQodGhpcy5tb2RhbENsb3NlQnRuTGFiZWwpKSx0aGlzLm1vZGFsQm94PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksdGhpcy5tb2RhbEJveC5jbGFzc0xpc3QuYWRkKFwidGluZ2xlLW1vZGFsLWJveFwiKSx0aGlzLm1vZGFsQm94Q29udGVudD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLHRoaXMubW9kYWxCb3hDb250ZW50LmNsYXNzTGlzdC5hZGQoXCJ0aW5nbGUtbW9kYWwtYm94X19jb250ZW50XCIpLHRoaXMubW9kYWxCb3guYXBwZW5kQ2hpbGQodGhpcy5tb2RhbEJveENvbnRlbnQpLC0xIT09dGhpcy5vcHRzLmNsb3NlTWV0aG9kcy5pbmRleE9mKFwiYnV0dG9uXCIpJiZ0aGlzLm1vZGFsLmFwcGVuZENoaWxkKHRoaXMubW9kYWxDbG9zZUJ0biksdGhpcy5tb2RhbC5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsQm94KX1mdW5jdGlvbiBpKCl7dGhpcy5tb2RhbEJveEZvb3Rlcj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpLHRoaXMubW9kYWxCb3hGb290ZXIuY2xhc3NMaXN0LmFkZChcInRpbmdsZS1tb2RhbC1ib3hfX2Zvb3RlclwiKSx0aGlzLm1vZGFsQm94LmFwcGVuZENoaWxkKHRoaXMubW9kYWxCb3hGb290ZXIpfWZ1bmN0aW9uIG4oKXt0aGlzLl9ldmVudHM9e2NsaWNrQ2xvc2VCdG46dGhpcy5jbG9zZS5iaW5kKHRoaXMpLGNsaWNrT3ZlcmxheTpkLmJpbmQodGhpcykscmVzaXplOnRoaXMuY2hlY2tPdmVyZmxvdy5iaW5kKHRoaXMpLGtleWJvYXJkTmF2OmwuYmluZCh0aGlzKX0sLTEhPT10aGlzLm9wdHMuY2xvc2VNZXRob2RzLmluZGV4T2YoXCJidXR0b25cIikmJnRoaXMubW9kYWxDbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIix0aGlzLl9ldmVudHMuY2xpY2tDbG9zZUJ0biksdGhpcy5tb2RhbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsdGhpcy5fZXZlbnRzLmNsaWNrT3ZlcmxheSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIix0aGlzLl9ldmVudHMucmVzaXplKSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLHRoaXMuX2V2ZW50cy5rZXlib2FyZE5hdil9ZnVuY3Rpb24gbCh0KXstMSE9PXRoaXMub3B0cy5jbG9zZU1ldGhvZHMuaW5kZXhPZihcImVzY2FwZVwiKSYmMjc9PT10LndoaWNoJiZ0aGlzLmlzT3BlbigpJiZ0aGlzLmNsb3NlKCl9ZnVuY3Rpb24gZCh0KXstMSE9PXRoaXMub3B0cy5jbG9zZU1ldGhvZHMuaW5kZXhPZihcIm92ZXJsYXlcIikmJiFhKHQudGFyZ2V0LFwidGluZ2xlLW1vZGFsXCIpJiZ0LmNsaWVudFg8dGhpcy5tb2RhbC5jbGllbnRXaWR0aCYmdGhpcy5jbG9zZSgpfWZ1bmN0aW9uIGEodCxvKXtmb3IoOyh0PXQucGFyZW50RWxlbWVudCkmJiF0LmNsYXNzTGlzdC5jb250YWlucyhvKTspO3JldHVybiB0fWZ1bmN0aW9uIGgoKXstMSE9PXRoaXMub3B0cy5jbG9zZU1ldGhvZHMuaW5kZXhPZihcImJ1dHRvblwiKSYmdGhpcy5tb2RhbENsb3NlQnRuLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLHRoaXMuX2V2ZW50cy5jbGlja0Nsb3NlQnRuKSx0aGlzLm1vZGFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIix0aGlzLl9ldmVudHMuY2xpY2tPdmVybGF5KSx3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMuX2V2ZW50cy5yZXNpemUpLGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsdGhpcy5fZXZlbnRzLmtleWJvYXJkTmF2KX1mdW5jdGlvbiByKCl7Zm9yKHZhciB0PTE7dDxhcmd1bWVudHMubGVuZ3RoO3QrKylmb3IodmFyIG8gaW4gYXJndW1lbnRzW3RdKWFyZ3VtZW50c1t0XS5oYXNPd25Qcm9wZXJ0eShvKSYmKGFyZ3VtZW50c1swXVtvXT1hcmd1bWVudHNbdF1bb10pO3JldHVybiBhcmd1bWVudHNbMF19dmFyIGM9ITE7cmV0dXJuIHQucHJvdG90eXBlLmluaXQ9ZnVuY3Rpb24oKXtpZighdGhpcy5tb2RhbClyZXR1cm4gcy5jYWxsKHRoaXMpLG4uY2FsbCh0aGlzKSxkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZSh0aGlzLm1vZGFsLGRvY3VtZW50LmJvZHkuZmlyc3RDaGlsZCksdGhpcy5vcHRzLmZvb3RlciYmdGhpcy5hZGRGb290ZXIoKSx0aGlzfSx0LnByb3RvdHlwZS5fYnVzeT1mdW5jdGlvbih0KXtjPXR9LHQucHJvdG90eXBlLl9pc0J1c3k9ZnVuY3Rpb24oKXtyZXR1cm4gY30sdC5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe251bGwhPT10aGlzLm1vZGFsJiYodGhpcy5pc09wZW4oKSYmdGhpcy5jbG9zZSghMCksaC5jYWxsKHRoaXMpLHRoaXMubW9kYWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLm1vZGFsKSx0aGlzLm1vZGFsPW51bGwpfSx0LnByb3RvdHlwZS5pc09wZW49ZnVuY3Rpb24oKXtyZXR1cm4hIXRoaXMubW9kYWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwidGluZ2xlLW1vZGFsLS12aXNpYmxlXCIpfSx0LnByb3RvdHlwZS5vcGVuPWZ1bmN0aW9uKCl7aWYoIXRoaXMuX2lzQnVzeSgpKXt0aGlzLl9idXN5KCEwKTt2YXIgdD10aGlzO3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIHQub3B0cy5iZWZvcmVPcGVuJiZ0Lm9wdHMuYmVmb3JlT3BlbigpLHRoaXMubW9kYWwuc3R5bGUucmVtb3ZlUHJvcGVydHk/dGhpcy5tb2RhbC5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImRpc3BsYXlcIik6dGhpcy5tb2RhbC5zdHlsZS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNwbGF5XCIpLHRoaXMuX3Njcm9sbFBvc2l0aW9uPXdpbmRvdy5wYWdlWU9mZnNldCxkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJ0aW5nbGUtZW5hYmxlZFwiKSxkb2N1bWVudC5ib2R5LnN0eWxlLnRvcD0tdGhpcy5fc2Nyb2xsUG9zaXRpb24rXCJweFwiLHRoaXMuc2V0U3RpY2t5Rm9vdGVyKHRoaXMub3B0cy5zdGlja3lGb290ZXIpLHRoaXMubW9kYWwuY2xhc3NMaXN0LmFkZChcInRpbmdsZS1tb2RhbC0tdmlzaWJsZVwiKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0Lm9wdHMub25PcGVuJiZ0Lm9wdHMub25PcGVuLmNhbGwodCksdC5fYnVzeSghMSksdGhpcy5jaGVja092ZXJmbG93KCksdGhpc319LHQucHJvdG90eXBlLmNsb3NlPWZ1bmN0aW9uKHQpe2lmKCF0aGlzLl9pc0J1c3koKSl7aWYodGhpcy5fYnVzeSghMCksdD10fHwhMSxcImZ1bmN0aW9uXCI9PXR5cGVvZiB0aGlzLm9wdHMuYmVmb3JlQ2xvc2Upe2lmKCF0aGlzLm9wdHMuYmVmb3JlQ2xvc2UuY2FsbCh0aGlzKSlyZXR1cm4gdm9pZCB0aGlzLl9idXN5KCExKX1kb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJ0aW5nbGUtZW5hYmxlZFwiKSx3aW5kb3cuc2Nyb2xsVG8oMCx0aGlzLl9zY3JvbGxQb3NpdGlvbiksZG9jdW1lbnQuYm9keS5zdHlsZS50b3A9bnVsbCx0aGlzLm1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJ0aW5nbGUtbW9kYWwtLXZpc2libGVcIik7dmFyIG89dGhpcztvLm1vZGFsLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsXCJmdW5jdGlvblwiPT10eXBlb2Ygby5vcHRzLm9uQ2xvc2UmJm8ub3B0cy5vbkNsb3NlLmNhbGwodGhpcyksby5fYnVzeSghMSl9fSx0LnByb3RvdHlwZS5zZXRDb250ZW50PWZ1bmN0aW9uKHQpe3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiB0P3RoaXMubW9kYWxCb3hDb250ZW50LmlubmVySFRNTD10Oih0aGlzLm1vZGFsQm94Q29udGVudC5pbm5lckhUTUw9XCJcIix0aGlzLm1vZGFsQm94Q29udGVudC5hcHBlbmRDaGlsZCh0KSksdGhpcy5pc09wZW4oKSYmdGhpcy5jaGVja092ZXJmbG93KCksdGhpc30sdC5wcm90b3R5cGUuZ2V0Q29udGVudD1mdW5jdGlvbigpe3JldHVybiB0aGlzLm1vZGFsQm94Q29udGVudH0sdC5wcm90b3R5cGUuYWRkRm9vdGVyPWZ1bmN0aW9uKCl7cmV0dXJuIGkuY2FsbCh0aGlzKSx0aGlzfSx0LnByb3RvdHlwZS5zZXRGb290ZXJDb250ZW50PWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLm1vZGFsQm94Rm9vdGVyLmlubmVySFRNTD10LHRoaXN9LHQucHJvdG90eXBlLmdldEZvb3RlckNvbnRlbnQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tb2RhbEJveEZvb3Rlcn0sdC5wcm90b3R5cGUuc2V0U3RpY2t5Rm9vdGVyPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLmlzT3ZlcmZsb3coKXx8KHQ9ITEpLHQ/dGhpcy5tb2RhbEJveC5jb250YWlucyh0aGlzLm1vZGFsQm94Rm9vdGVyKSYmKHRoaXMubW9kYWxCb3gucmVtb3ZlQ2hpbGQodGhpcy5tb2RhbEJveEZvb3RlciksdGhpcy5tb2RhbC5hcHBlbmRDaGlsZCh0aGlzLm1vZGFsQm94Rm9vdGVyKSx0aGlzLm1vZGFsQm94Rm9vdGVyLmNsYXNzTGlzdC5hZGQoXCJ0aW5nbGUtbW9kYWwtYm94X19mb290ZXItLXN0aWNreVwiKSxlLmNhbGwodGhpcyksdGhpcy5tb2RhbEJveENvbnRlbnQuc3R5bGVbXCJwYWRkaW5nLWJvdHRvbVwiXT10aGlzLm1vZGFsQm94Rm9vdGVyLmNsaWVudEhlaWdodCsyMCtcInB4XCIpOnRoaXMubW9kYWxCb3hGb290ZXImJih0aGlzLm1vZGFsQm94LmNvbnRhaW5zKHRoaXMubW9kYWxCb3hGb290ZXIpfHwodGhpcy5tb2RhbC5yZW1vdmVDaGlsZCh0aGlzLm1vZGFsQm94Rm9vdGVyKSx0aGlzLm1vZGFsQm94LmFwcGVuZENoaWxkKHRoaXMubW9kYWxCb3hGb290ZXIpLHRoaXMubW9kYWxCb3hGb290ZXIuc3R5bGUud2lkdGg9XCJhdXRvXCIsdGhpcy5tb2RhbEJveEZvb3Rlci5zdHlsZS5sZWZ0PVwiXCIsdGhpcy5tb2RhbEJveENvbnRlbnQuc3R5bGVbXCJwYWRkaW5nLWJvdHRvbVwiXT1cIlwiLHRoaXMubW9kYWxCb3hGb290ZXIuY2xhc3NMaXN0LnJlbW92ZShcInRpbmdsZS1tb2RhbC1ib3hfX2Zvb3Rlci0tc3RpY2t5XCIpKSksdGhpc30sdC5wcm90b3R5cGUuYWRkRm9vdGVyQnRuPWZ1bmN0aW9uKHQsbyxlKXt2YXIgcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO3JldHVybiBzLmlubmVySFRNTD10LHMuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsZSksXCJzdHJpbmdcIj09dHlwZW9mIG8mJm8ubGVuZ3RoJiZvLnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3MuY2xhc3NMaXN0LmFkZCh0KX0pLHRoaXMubW9kYWxCb3hGb290ZXIuYXBwZW5kQ2hpbGQocyksc30sdC5wcm90b3R5cGUucmVzaXplPWZ1bmN0aW9uKCl7Y29uc29sZS53YXJuKFwiUmVzaXplIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB2ZXJzaW9uIDEuMFwiKX0sdC5wcm90b3R5cGUuaXNPdmVyZmxvdz1mdW5jdGlvbigpe3ZhciB0PXdpbmRvdy5pbm5lckhlaWdodDtyZXR1cm4gdGhpcy5tb2RhbEJveC5jbGllbnRIZWlnaHQ+PXR9LHQucHJvdG90eXBlLmNoZWNrT3ZlcmZsb3c9ZnVuY3Rpb24oKXt0aGlzLm1vZGFsLmNsYXNzTGlzdC5jb250YWlucyhcInRpbmdsZS1tb2RhbC0tdmlzaWJsZVwiKSYmKHRoaXMuaXNPdmVyZmxvdygpP3RoaXMubW9kYWwuY2xhc3NMaXN0LmFkZChcInRpbmdsZS1tb2RhbC0tb3ZlcmZsb3dcIik6dGhpcy5tb2RhbC5jbGFzc0xpc3QucmVtb3ZlKFwidGluZ2xlLW1vZGFsLS1vdmVyZmxvd1wiKSwhdGhpcy5pc092ZXJmbG93KCkmJnRoaXMub3B0cy5zdGlja3lGb290ZXI/dGhpcy5zZXRTdGlja3lGb290ZXIoITEpOnRoaXMuaXNPdmVyZmxvdygpJiZ0aGlzLm9wdHMuc3RpY2t5Rm9vdGVyJiYoZS5jYWxsKHRoaXMpLHRoaXMuc2V0U3RpY2t5Rm9vdGVyKCEwKSkpfSx7bW9kYWw6dH19KTsiLCJmdW5jdGlvbiBzdHlsZUluamVjdChjc3MsIHJlZikge1xuICBpZiAoIHJlZiA9PT0gdm9pZCAwICkgcmVmID0ge307XG4gIHZhciBpbnNlcnRBdCA9IHJlZi5pbnNlcnRBdDtcblxuICBpZiAoIWNzcyB8fCB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybjsgfVxuXG4gIHZhciBoZWFkID0gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdO1xuICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcblxuICBpZiAoaW5zZXJ0QXQgPT09ICd0b3AnKSB7XG4gICAgaWYgKGhlYWQuZmlyc3RDaGlsZCkge1xuICAgICAgaGVhZC5pbnNlcnRCZWZvcmUoc3R5bGUsIGhlYWQuZmlyc3RDaGlsZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBoZWFkLmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgfVxuXG4gIGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHN0eWxlSW5qZWN0O1xuIiwiXG5pbXBvcnQgbG9nIGZyb20gXCIuL2xvZ2dpbmdcIlxuaW1wb3J0IHsgaXNfYXJyYXkgfSBmcm9tIFwiLi91dGlsc1wiXG5pbXBvcnQgSlNPTlAgZnJvbSBcImJyb3dzZXItanNvbnBcIlxuXG5pbXBvcnQgdGluZ2xlIGZyb20gXCJ0aW5nbGUuanNcIlxuXG5pbXBvcnQgJ3RpbmdsZS5qcy9kaXN0L3RpbmdsZS5taW4uY3NzJyAvL0ZJWE1FIC0gd2Ugc2hvdWxkIHBlcmhhcHMgc2V0IHRoZSByb2xsdXAgY29uZmlnIHRvIE5PVCBpbmplY3QgYnkgZGVmYXVsdCwgYW5kIHRoZW4gd2UgZG8gaXQgb3Vyc2VsdmVzIGxhdGVyIHdoZW4gbmVlZGVkP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYgb3RoZXIgcGVvcGxlIGFyZSBhbHNvIHVzaW5nIHRoZSBUaW5nbGUgbGlicmFyeSwgdGhlbiB0aGlzIHdvdWxkIHByZXZlbnQgdXMgYWxsIGZyb20gY29uZmxpY3Rpbmcgd2l0aCBlYWNoIG90aGVyXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZvcm0ge1xuICAgIGNvbnN0cnVjdG9yKG9wdGlvbnMpIHtcbiAgICAgICAgbG9nLmRlYnVnKFwiSW52b2tpbmcgQ2xhc3MgY29uc3RydWN0b3IhXCIpXG4gICAgICAgIGZvcihsZXQga2V5IGluIG9wdGlvbnMpIHtcbiAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIlNldHRpbmc6IFwiK2tleStcIiB0byBcIitvcHRpb25zW2tleV0pXG4gICAgICAgICAgICB0aGlzW2tleV0gPSBvcHRpb25zW2tleV1cbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5mb3JtX2tleSkge1xuICAgICAgICAgICAgcmV0dXJuIGxvZy5lcnJvcihcIk5vIEZvcm0gS2V5IHNldCFcIilcbiAgICAgICAgfVxuICAgICAgICBpZih0aGlzLm1hbnVhbCkge1xuICAgICAgICAgICAgLy9iYWlsIG91dCBvZiB0aGUgcmVzdCBvZiBzZXR1cCBmb3IgbWFudWFsLW1vZGVcbiAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIk1hbnVhbCBtb2RlIHNlbGVjdGVkOyBleGl0aW5nIHNldHVwXCIpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5lbWFpbF9maWVsZCkge1xuICAgICAgICAgICAgcmV0dXJuIGxvZy5lcnJvcihcIk5vIEVtYWlsIEZpZWxkIHNldCFcIilcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5mb3JtKSB7XG4gICAgICAgICAgICBsb2cuZGVidWcoXCJUcnlpbmcgdG8gZ3Vlc3MgRm9ybSB2YWx1ZVwiKVxuICAgICAgICAgICAgLy90cnkgYW5kIGd1ZXNzIGZvcm0gZnJvbSBlbWFpbCBmaWVsZCdzICdmb3JtJyBwcm9wZXJ0eVxuICAgICAgICAgICAgdGhpcy5mb3JtID0gdGhpcy5lbWFpbF9maWVsZC5mb3JtXG4gICAgICAgICAgICBsb2cuZGVidWcoXCJQaWNrZWQ6IFwiK3RoaXMuZm9ybSlcbiAgICAgICAgfVxuICAgICAgICBpZighdGhpcy5mb3JtKSB7XG4gICAgICAgICAgICByZXR1cm4gbG9nLmVycm9yKFwiQ291bGQgbm90IGRldGVybWluZSBGb3JtIVwiKVxuICAgICAgICB9XG4gICAgICAgIGlmKCF0aGlzLnN1Ym1pdF9idXR0b24pIHtcbiAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIlRyeWluZyB0byBmaW5kIHN1Ym1pdCBidXR0b25zLi4uXCIpXG4gICAgICAgICAgICBsZXQgc3VibWl0X2J1dHRvbnM9W11cbiAgICAgICAgICAgIGZvcihsZXQgZWxlbWVudCBpbiB0aGlzLmZvcm0uZWxlbWVudHMpIHsgLy9GSVhNRSAtIHNob3VsZCB1c2UgaW50ZWdlcnMgb25seT9cbiAgICAgICAgICAgICAgICBsZXQgdGhpc19lbGVtZW50ID0gdGhpcy5mb3JtLmVsZW1lbnRzW2VsZW1lbnRdXG4gICAgICAgICAgICAgICAgbG9nLmRlYnVnKFwiQ2hlY2tpbmcgZWxlbWVudDogXCIrZWxlbWVudCtcIiAtIG5vZGVOYW1lOiAnXCIrdGhpc19lbGVtZW50Lm5vZGVOYW1lK1wiJyBUeXBlOiAnXCIrdGhpc19lbGVtZW50LnR5cGUrXCInXCIpXG4gICAgICAgICAgICAgICAgaWYodGhpc19lbGVtZW50Lm5vZGVOYW1lID09IFwiSU5QVVRcIiAmJiB0aGlzX2VsZW1lbnQudHlwZSA9PVwic3VibWl0XCIpIHsgLy9GSVhNRSAtIHNob3VsZCBmaW5kIG90aGVyIHN1Ym1pdHRpbmctYnV0dG9ucyB0b28hIGUuZy4gPGJ1dHRvbj4gb3IgPGlucHV0IHR5cGU9J2J1dHRvbic+XG4gICAgICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIkZvdW5kIGEgc3VibWl0IGJ1dHRvblwiKVxuICAgICAgICAgICAgICAgICAgICBzdWJtaXRfYnV0dG9ucy5wdXNoKHRoaXNfZWxlbWVudClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1Ym1pdF9idXR0b24gPSBzdWJtaXRfYnV0dG9uc1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdGlhbGl6ZV9kb20oKVxuICAgIH1cblxuICAgIGluaXRpYWxpemVfZG9tKCkge1xuICAgICAgICAvLyBzZXQgdXAgdGhlIG9uY2hhbmdlIGhhbmRsZXIgZm9yIHRoZSBlbWFpbCBmaWVsZFxuICAgICAgICBsZXQgb2xkX29uY2hhbmdlID0gdGhpcy5lbWFpbF9maWVsZC5vbmNoYW5nZVxuICAgICAgICB0aGlzLmVtYWlsX2ZpZWxkLm9uY2hhbmdlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgICAgICB0aGlzLm9uY2hhbmdlX2hhbmRsZXIoZXZlbnQpXG4gICAgICAgICAgICBpZihvbGRfb25jaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICBvbGRfb25jaGFuZ2UoZXZlbnQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL3NldCB1cCB0aGUgb25zdWJtaXQgaGFuZGxlciBmb3IgdGhlIGZvcm0gKGlmIHRoZXJlIGlzIG9uZSlcbiAgICAgICAgaWYodGhpcy5mb3JtKSB7XG4gICAgICAgICAgICBsZXQgb2xkX29uc3VibWl0ID0gdGhpcy5mb3JtLm9uc3VibWl0XG4gICAgICAgICAgICB0aGlzLmZvcm0ub25zdWJtaXQgPSBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBpZihvbGRfb25zdWJtaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdHMgPSBvbGRfb25zdWJtaXQoZXZlbnQpIC8vRklYTUUgLSBjb25mdXNpbmcsICp0aGVpciogb2xkIG9uc3VibWl0IGhhbmRsZXIgZmlyZXMgKmZpcnN0Kj9cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYocmVzdWx0cykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vbnN1Ym1pdF9oYW5kbGVyKGV2ZW50KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vZGlzYWJsZSBzdWJtaXQgYnV0dG9uLCBpZiB0aGVyZSBpcyBvbmUgLSBcbiAgICAgICAgdGhpcy5kaXNhYmxlX3N1Ym1pdHMoKVxuICAgIH1cblxuICAgIGRpc2FibGVfc3VibWl0cygpIHtcbiAgICAgICAgdGhpcy5zZXRfc3VibWl0X2J1dHRvbl9kaXNhYmxlZCh0cnVlKVxuICAgIH1cblxuICAgIGVuYWJsZV9zdWJtaXRzKCkge1xuICAgICAgICB0aGlzLnNldF9zdWJtaXRfYnV0dG9uX2Rpc2FibGVkKGZhbHNlKVxuICAgIH1cblxuICAgIHNldF9zdWJtaXRfYnV0dG9uX2Rpc2FibGVkKHN0YXRlKSB7XG4gICAgICAgIGlmKHRoaXMuc3VibWl0X2J1dHRvbikge1xuICAgICAgICAgICAgbG9nLmRlYnVnKFwiVHJ5aW5nIHRvIGRpc2FibGUgc3VibWl0IGJ1dHRvbi4uLlwiKVxuICAgICAgICAgICAgaWYoaXNfYXJyYXkodGhpcy5zdWJtaXRfYnV0dG9uKSkge1xuICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIlN1Ym1pdCBidXR0b24gSVMgQVJSQVlcIilcbiAgICAgICAgICAgICAgICBmb3IobGV0IHggaW4gdGhpcy5zdWJtaXRfYnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VibWl0X2J1dHRvblt4XS5kaXNhYmxlZCA9IHN0YXRlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1Ym1pdF9idXR0b24uZGlzYWJsZWQgPSBzdGF0ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25jaGFuZ2VfaGFuZGxlcihldmVudCkge1xuICAgICAgICB0aGlzLnZlcmlmeSh0aGlzLmVtYWlsX2ZpZWxkLnZhbHVlLCAocmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgbG9nLmRlYnVnKFwiVmVyaWZpY2F0aW9uIHJlc3VsdHMgYXJlOiBcIityZXN1bHRzKVxuICAgICAgICAgICAgc3dpdGNoKHJlc3VsdHMuc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIkJBRFwiOlxuICAgICAgICAgICAgICAgIC8vRklSRSBIT09LUyBGSVJTVD8gRklYTUVcbiAgICAgICAgICAgICAgICB0aGlzLm15dG9vbHRpcCA9IG5ldyBUb29sdGlwKHRoaXMuZW1haWxfZmllbGQpXG4gICAgICAgICAgICAgICAgdGhpcy5teXRvb2x0aXAuc2hvdygpXG4gICAgICAgICAgICAgICAgdGhpcy5kaXNhYmxlX3N1Ym1pdHMoKVxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICBjYXNlIFwiR09PRFwiOlxuICAgICAgICAgICAgICAgIC8vRklSRSBIT09LUyBGSVJTVD8gRklYTUVcbiAgICAgICAgICAgICAgICBpZih0aGlzLm15dG9vbHRpcCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm15dG9vbHRpcC5oaWRlKClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lbmFibGVfc3VibWl0cygpXG4gICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgICAgIGNhc2UgXCJDSEFMTEVOR0VcIjpcbiAgICAgICAgICAgICAgICAvL0ZJUkUgSE9PS1MgRklSU1Q/IEZJWE1FXG4gICAgICAgICAgICAgICAgLy8vdWguLi4udGhyb3cgdXAgYSBwcm9tcHQ/XG4gICAgICAgICAgICAgICAgdGhpcy5kaXNwbGF5X2NoYWxsZW5nZV9tb2RhbChyZXN1bHRzLmNoYWxsZW5nZV9rZXkpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAvL25vIGlkZWEhXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZGlzcGxheV9jaGFsbGVuZ2VfbW9kYWwoY2hhbGxlbmdlX2tleSkge1xuICAgICAgICBpZighdGhpcy5tb2RhbCkge1xuICAgICAgICAgICAgdGhpcy5tb2RhbCA9IG5ldyB0aW5nbGUubW9kYWwoe1xuICAgICAgICAgICAgICAgIGZvb3RlcjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzdGlja3lGb290ZXI6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNsb3NlTWV0aG9kczogWydidXR0b24nXSwgLy8gWydvdmVybGF5JywgJ2J1dHRvbicsICdlc2NhcGUnXSxcbiAgICAgICAgICAgICAgICBjbG9zZUxhYmVsOiBcIkNsb3NlXCIsXG4gICAgICAgICAgICAgICAgLy9jc3NDbGFzczogWydjdXN0b20tY2xhc3MtMScsICdjdXN0b20tY2xhc3MtMiddLFxuICAgICAgICAgICAgICAgIG9uT3BlbjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdtb2RhbCBvcGVuJylcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9uQ2xvc2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnbW9kYWwgY2xvc2VkJylcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGJlZm9yZUNsb3NlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gaGVyZSdzIGdvZXMgc29tZSBsb2dpY1xuICAgICAgICAgICAgICAgICAgICAvLyBlLmcuIHNhdmUgY29udGVudCBiZWZvcmUgY2xvc2luZyB0aGUgbW9kYWxcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWUgLy8gY2xvc2UgdGhlIG1vZGFsXG4gICAgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGZhbHNlOyAvLyBub3RoaW5nIGhhcHBlbnNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdGhpcy5tb2RhbC5hZGRGb290ZXJCdG4oJ0NhbmNlbCcsICd0aW5nbGUtYnRuJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGhlcmUgZ29lcyBzb21lIGxvZ2ljXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RhbC5jbG9zZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLm1vZGFsLmFkZEZvb3RlckJ0bignU2VuZCBDaGFsbGVuZ2UgRW1haWwnLCAndGluZ2xlLWJ0biB0aW5nbGUtYnRuLS1wcmltYXJ5JywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vIGhlcmUgZ29lcyBzb21lIGxvZ2ljXG4gICAgICAgICAgICAgICAgaWYodGhpcy5lbWFpbF9maWVsZC52YWx1ZSAhPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ29vZHZlcmlmaWNhdGlvbl9jaGFsbGVuZ2VfYWRkcmVzcycpLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIkZpZWxkIHZhbHVlOiBcIit0aGlzLmVtYWlsX2ZpZWxkLnZhbHVlK1wiICwgY2hhbGxlbmdlX2FkZHJlc3M6IFwiK2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnb29kdmVyaWZpY2F0aW9uX2NoYWxsZW5nZV9hZGRyZXNzJykudmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWwuc2V0Q29udGVudChcIkVtYWlsIGRvZXNuJ3QgbWF0Y2ggZmllbGQgb24gZm9ybSFcIilcbiAgICAgICAgICAgICAgICAgICAgLy9jYW4gd2UgeWFuayB0aGUgJ3N1Ym1pdCcgYnV0dG9uPyBGSVhNRSFcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY2hhbGxlbmdlKHRoaXMuZW1haWxfZmllbGQudmFsdWUsY2hhbGxlbmdlX2tleSwgKHJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbG9nLmRlYnVnKFwiQ2hhbGxlbmdlIHJlc3VsdHMgYXJlOiBcIityZXN1bHRzKVxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihyZXN1bHRzKVxuICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHRzLnN0YXR1cyA9PSBcIkFDQ0VQVEVEXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kYWwuc2V0Q29udGVudChcIklucHV0IGVtYWlsZWQgUElOOiA8aW5wdXQgdHlwZT0ndGV4dCcgaWQ9J2dvb2R2ZXJpZmljYXRpb25fcGluJyAvPlwiKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAvL3RoaXMubW9kYWwuY2xvc2UoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGFsLnNldENvbnRlbnQoXCJUb28gbWFueSB2ZXJpZmljYXRpb25zIGZyb20gdGhpcyBJUC4gV2UgbmVlZCB0byBzZW5kIHlvdSBhbiBlbWFpbCB0byB2ZXJpZnkgdGhhdCB5b3UgYXJlIHlvdSEgXCIrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiSWYgeW91IGFncmVlLCByZS10eXBlIHlvdXIgZW1haWwgaGVyZTogPGlucHV0IHR5cGU9J3RleHQnIGlkPSdnb29kdmVyaWZpY2F0aW9uX2NoYWxsZW5nZV9hZGRyZXNzJyAvPlwiKVxuICAgICAgICB0aGlzLm1vZGFsLm9wZW4oKVxufVxuXG4gICAgb25zdWJtaXRfaGFuZGxlcihldmVudCkge1xuICAgICAgICBET19TT01FVEhJTkdfQ0xFVkVSRVIoKVxuICAgICAgICBKU09OUChcInVybFwiKVxuICAgIH1cblxuICAgIHZlcmlmeShlbWFpbCwgY2FsbGJhY2spIHtcbiAgICAgICAgSlNPTlAoe3VybDogSE9TVCtcIi92ZXJpZnlcIixcbiAgICAgICAgICAgIGRhdGE6IHtlbWFpbDogZW1haWwsIGZvcm1fa2V5OiB0aGlzLmZvcm1fa2V5fSwgXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmKGRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nLmVycm9yKGRhdGEuZXJyb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGRhdGEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgY2hhbGxlbmdlKGVtYWlsLCBjaGFsbGVuZ2Vfa2V5LCBjYWxsYmFjaykge1xuICAgICAgICBKU09OUCh7dXJsOiBIT1NUK1wiL2NoYWxsZW5nZVwiLFxuICAgICAgICAgICAgZGF0YToge2VtYWlsOiBlbWFpbCwgZm9ybV9rZXk6IHRoaXMuZm9ybV9rZXksIGNoYWxsZW5nZV9rZXk6IGNoYWxsZW5nZV9rZXl9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhkYXRhKVxuICAgICAgICAgICAgICAgIC8vIHN3aXRjaChkYXRhLnN0YXR1cykge1xuICAgICAgICAgICAgICAgIC8vICAgICBjYXNlIFwiR09PRFwiOlxuXG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cbn0iLCJpbXBvcnQgbG9nIGZyb20gXCIuL2xvZ2dpbmdcIlxuaW1wb3J0IEZvcm0gZnJvbSBcIi4vZm9ybVwiXG4vL2ltcG9ydCBhc3NpZ24gZnJvbSBcImNvcmUtanMtcHVyZS9lcy9vYmplY3QvYXNzaWduXCJcbmltcG9ydCB7IGR1cGxpY2F0ZSB9IGZyb20gXCIuL3V0aWxzLmpzXCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGZvcm1fa2V5LG9wdGlvbnMpIHtcbiAgICBpZighZm9ybV9rZXkpIHtcbiAgICAgICAgbG9nLmVycm9yKFwiRm9ybSBrZXkgd2FzIG5vdCBzZXRcIilcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGxldCBteV9vcHRpb25zXG4gICAgaWYob3B0aW9ucykge1xuICAgICAgICBteV9vcHRpb25zPWR1cGxpY2F0ZShvcHRpb25zKTtcbiAgICAgICAgbXlfb3B0aW9ucy5mb3JtX2tleSA9IGZvcm1fa2V5XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbXlfb3B0aW9ucz17Zm9ybV9rZXk6IGZvcm1fa2V5fVxuICAgIH1cbiAgICBpZihteV9vcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIGxvZy5kZWJ1Z19lbmFibGVkID0gbXlfb3B0aW9ucy5kZWJ1ZyAvL0ZJWE1FIHRoaXMgaXMgYWxyZWFkeSBoYW5kbGVkIGluIGluZGV4LmpzLCB0aGlzIGlzIHN1cGVyZmx1b3VzXG4gICAgICAgIGRlbGV0ZSBteV9vcHRpb25zLmRlYnVnIC8vZG9uJ3Qgd2FudCB0byBrZWVwIHBhc3NpbmcgdGhpcyBkb3duIHRvIGVhY2ggVmVyaWZ5XG4gICAgfVxuICAgIGxldCBhY3RpdmF0ZWRfZm9ybXM9W11cbiAgICBmb3IobGV0IGZvcm0gaW4gZG9jdW1lbnQuZm9ybXMpIHsgLy9vbGRlLXNrb29sZSBET00wIEZUVyFcbiAgICAgICAgbG9nLmRlYnVnKFwiQ2hlY2tpbmcgZm9ybTogXCIrZm9ybStcIiBmb3IgdmVyaWZpYWJsZSBlbWFpbCBhZGRyZXNzIGZpZWxkcy4uLlwiKVxuICAgICAgICBmb3IobGV0IGVsZW1lbnQgaW4gZG9jdW1lbnQuZm9ybXNbZm9ybV0uZWxlbWVudHMpIHsgLy8gRklYTUUgSSB0aGluayB0aGlzIGl0ZXJhdGVzIG5hbWVzICpBTkQqIG51bWJlcnNcbiAgICAgICAgICAgIGxvZy5kZWJ1ZyhcIkNoZWNraW5nIGZpZWxkICNcIitlbGVtZW50K1wiIHRvIHNlZSBpZiBpdCdzIGFuIGVtYWlsIGFkZHJlc3MgZmllbGRcIilcbiAgICAgICAgICAgIGxldCB0aGlzX2ZpZWxkID0gZG9jdW1lbnQuZm9ybXNbZm9ybV0uZWxlbWVudHNbZWxlbWVudF1cbiAgICAgICAgICAgIGlmKHRoaXNfZmllbGQudHlwZSA9PSBcImVtYWlsXCIgfHwgdGhpc19maWVsZC5uYW1lID09IFwiZW1haWxcIiB8fCB0aGlzX2ZpZWxkLmlkID09IFwiZW1haWxcIikge1xuICAgICAgICAgICAgICAgIGxldCBvcHRpb25zX2NvcHkgPSBkdXBsaWNhdGUobXlfb3B0aW9ucylcbiAgICAgICAgICAgICAgICBsb2cuZGVidWcoXCJGb3VuZCBjYW5kaWRhdGUgZmllbGQuIE5hbWU6IFwiK3RoaXNfZmllbGQubmFtZStcIiBUeXBlOiBcIit0aGlzX2ZpZWxkLnR5cGUrXCIgSUQ6IFwiK3RoaXNfZmllbGQuaWQpXG4gICAgICAgICAgICAgICAgb3B0aW9uc19jb3B5LmZvcm0gPSBkb2N1bWVudC5mb3Jtc1tmb3JtXVxuICAgICAgICAgICAgICAgIG9wdGlvbnNfY29weS5lbWFpbF9maWVsZCA9IHRoaXNfZmllbGRcbiAgICAgICAgICAgICAgICBhY3RpdmF0ZWRfZm9ybXMucHVzaChuZXcgRm9ybShvcHRpb25zX2NvcHkpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhY3RpdmF0ZWRfZm9ybXNcbn0iLCJpbXBvcnQgYXV0byBmcm9tIFwiLi9hdXRvXCJcbmltcG9ydCBsb2cgZnJvbSBcIi4vbG9nZ2luZ1wiXG5pbXBvcnQgRm9ybSBmcm9tIFwiLi9mb3JtXCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKGZvcm1fa2V5LCBvcHRpb25zKSB7XG4gICAgaWYob3B0aW9ucyAmJiBvcHRpb25zLmRlYnVnKSB7XG4gICAgICAgIGxvZy5kZWJ1Z19lbmFibGVkID0gb3B0aW9ucy5kZWJ1Z1xuICAgIH1cbiAgICBpZighZm9ybV9rZXkpIHtcbiAgICAgICAgbG9nLmVycm9yKFwiRm9ybSBrZXkgd2FzIG5vdCBzZXRcIilcbiAgICB9XG4gICAgaWYoIW9wdGlvbnMgfHwgKCFvcHRpb25zLmVtYWlsX2ZpZWxkICYmICFvcHRpb25zLm1hbnVhbCkpIHtcbiAgICAgICAgcmV0dXJuIGF1dG8oZm9ybV9rZXksIG9wdGlvbnMpXG4gICAgfVxuICAgIHJldHVybiBuZXcgRm9ybShmb3JtX2tleSwgb3B0aW9ucylcbn0iXSwibmFtZXMiOlsibGV0IiwidGhpcyIsImFyZ3VtZW50cyIsInJlc3VsdHMiLCJ0aW5nbGUiLCJKU09OUCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7SUFBQSxJQUFNLEdBQUcsR0FDTCxZQUFXLENBQUMsYUFBcUIsRUFBRTtxREFBVixHQUFHOztRQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLGNBQWE7SUFDdEMsRUFBQzs7SUFFTCxjQUFJLHdCQUFNLEdBQUcsRUFBRTtRQUNYLEdBQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNoQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUM7U0FDOUI7SUFDTCxFQUFDOztJQUVMLGNBQUksd0JBQU0sR0FBRyxFQUFFO1FBQ1AsR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBQztTQUNqQztJQUNMLEVBQUM7O0lBRUwsY0FBSSxzQ0FBYSxLQUFLLENBQUMsR0FBRyxFQUFFO1FBQ3BCLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMxQixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFDO1lBQ25CLE9BQU8sSUFBSTtTQUNkO1FBQ0QsT0FBTyxLQUFLO0lBQ2hCLENBQUMsQ0FDSjs7SUFFRCxJQUFJLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRTs7OztJQzFCWixTQUFTLFNBQVMsRUFBRSxHQUFHLEVBQUU7O1FBRTVCQSxJQUFJLE1BQU0sQ0FBQyxHQUFFO1FBQ2IsSUFBSUEsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFO1lBQ2QsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEVBQUM7U0FDckI7UUFDRCxPQUFPLE1BQU07S0FDaEI7O0FBRUQsSUFBTyxTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUU7O1FBRTFCLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLGdCQUFnQixFQUFFO1lBQ3hELE9BQU8sSUFBSTtTQUNkO1FBQ0QsT0FBTyxLQUFLOzs7Ozs7Ozs7O0lDZGhCLENBQUMsV0FBVztNQUNWLElBQUksS0FBSyxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsTUFBTSxFQUFFLFlBQVksQ0FBQzs7TUFFdkYsYUFBYSxHQUFHLFNBQVMsR0FBRyxFQUFFO1FBQzVCLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDM0MsQ0FBQzs7TUFFRixNQUFNLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixDQUFDOztNQUVuQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7TUFFckIsS0FBSyxHQUFHLFNBQVMsT0FBTyxFQUFFO1FBQ3hCLElBQUksUUFBUSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUFDO1FBQ3JFLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtVQUNuQixPQUFPLEdBQUcsRUFBRSxDQUFDO1NBQ2Q7UUFDRCxNQUFNLEdBQUc7VUFDUCxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFO1VBQ3hCLEtBQUssRUFBRSxPQUFPLENBQUMsS0FBSyxJQUFJLElBQUk7VUFDNUIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSTtVQUNoQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVUsSUFBSSxJQUFJO1VBQ3RDLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUk7VUFDbEMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLElBQUksRUFBRTtTQUN2QixDQUFDO1FBQ0YsTUFBTSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7VUFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMvQjtRQUNELElBQUksR0FBRyxLQUFLLENBQUM7UUFDYixJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEtBQUssRUFBRTtVQUMzQyxZQUFZLEdBQUcsT0FBTyxDQUFDLFlBQVksSUFBSSxVQUFVLENBQUM7VUFDbEQsWUFBWSxHQUFHLE9BQU8sQ0FBQyxZQUFZLElBQUksUUFBUSxHQUFHLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztVQUNuRSxRQUFRLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxZQUFZLENBQUM7VUFDcEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLFNBQVMsSUFBSSxFQUFFO1lBQ2hDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDeEIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDN0IsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztXQUN0QyxDQUFDO1VBQ0YsTUFBTSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztVQUNqQyxNQUFNLENBQUMsR0FBRyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztVQUNqQyxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztVQUNwQixNQUFNLENBQUMsT0FBTyxHQUFHLFNBQVMsR0FBRyxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxLQUFLLENBQUM7Y0FDWCxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7Y0FDZixLQUFLLEVBQUUsR0FBRzthQUNYLENBQUMsQ0FBQztZQUNILE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQztjQUNyQixHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUc7Y0FDZixLQUFLLEVBQUUsR0FBRzthQUNYLEVBQUUsTUFBTSxDQUFDLENBQUM7V0FDWixDQUFDO1VBQ0YsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsa0JBQWtCLEdBQUcsV0FBVztZQUNyRCxJQUFJLEdBQUcsRUFBRSxJQUFJLENBQUM7WUFDZCxJQUFJLElBQUksS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsVUFBVSxNQUFNLFFBQVEsSUFBSSxHQUFHLEtBQUssVUFBVSxDQUFDLEVBQUU7Y0FDeEUsT0FBTzthQUNSO1lBQ0QsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNaLElBQUksTUFBTSxFQUFFO2NBQ1YsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO2NBQ2pELElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7Z0JBQ3RDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7ZUFDMUI7Y0FDRCxPQUFPLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDdEI7V0FDRixDQUFDO1VBQ0YsSUFBSSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUM7VUFDMUYsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1NBQzVDO1FBQ0QsT0FBTztVQUNMLEtBQUssRUFBRSxXQUFXO1lBQ2hCLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXO2NBQzVCLE9BQU8sTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQzthQUNoQyxDQUFDO1lBQ0YsSUFBSSxHQUFHLElBQUksQ0FBQztZQUNaLElBQUksTUFBTSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxFQUFFO2NBQy9DLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztjQUNqRCxNQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztjQUN0QyxPQUFPLE1BQU0sR0FBRyxJQUFJLENBQUM7YUFDdEI7V0FDRjtTQUNGLENBQUM7T0FDSCxDQUFDOztNQUVGLElBQUksR0FBRyxXQUFXO1FBQ2hCLE9BQU8sS0FBSyxDQUFDLENBQUM7T0FDZixDQUFDOztNQUVGLFdBQVcsR0FBRyxTQUFTLE1BQU0sRUFBRTtRQUM3QixJQUFJLEdBQUcsQ0FBQztRQUNSLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDO1FBQ2pCLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUMvQyxHQUFHLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoQyxPQUFPLEdBQUcsQ0FBQztPQUNaLENBQUM7O01BRUYsWUFBWSxHQUFHLFNBQVMsTUFBTSxFQUFFO1FBQzlCLElBQUksR0FBRyxDQUFDO1FBQ1IsR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNULE9BQU8sR0FBRyxDQUFDLE1BQU0sR0FBRyxNQUFNLEVBQUU7VUFDMUIsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzFDO1FBQ0QsT0FBTyxHQUFHLENBQUM7T0FDWixDQUFDOztNQUVGLFdBQVcsR0FBRyxTQUFTLEdBQUcsRUFBRTtRQUMxQixJQUFJLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDO1FBQ3JCLElBQUksR0FBRyxDQUFDLFdBQVc7VUFDakIsSUFBSSxPQUFPLENBQUM7VUFDWixPQUFPLEdBQUcsRUFBRSxDQUFDO1VBQ2IsS0FBSyxHQUFHLElBQUksR0FBRyxFQUFFO1lBQ2YsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7V0FDakQ7VUFDRCxPQUFPLE9BQU8sQ0FBQztTQUNoQixHQUFHLENBQUM7UUFDTCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7T0FDdkIsQ0FBQzs7TUFFRixBQUlPLElBQUksQ0FBaUMsTUFBTSxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxFQUFFO1FBQ3JGLGNBQWMsR0FBRyxLQUFLLENBQUM7T0FDeEIsTUFBTTtRQUNMLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO09BQ3BCOztLQUVGLEVBQUUsSUFBSSxDQUFDQyxjQUFJLENBQUMsQ0FBQzs7OztJQ2hJZCxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQXlFLGNBQWMsQ0FBQyxDQUFDLEVBQUUsQ0FBYSxDQUFDLENBQUNBLGNBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE9BQU0sdVVBQXVVLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLElBQUksRUFBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFHLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBQyxDQUFDLFNBQVMsQ0FBQyxFQUFFOztJQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxHQUFDLElBQUksSUFBSSxDQUFDLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFDQyxXQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHQSxXQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNBLFdBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFDLE9BQU8sU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsTUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTSxVQUFVLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFRLFVBQVUsRUFBRSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBQyxPQUFPLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyx5REFBeUQsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHVCQUF1QixDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxD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
