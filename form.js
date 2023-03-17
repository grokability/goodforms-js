
import log from "./logging"
import { is_array, is_function, duplicate } from "./utils"
import JSONP from "browser-jsonp"

import { modal, update_hidden_fields} from "./visuals" //commented-out: tooltip
import { tooltip } from "./tooltip"
import resolver from "./resolver";

// import { domainToUnicode } from "url"
// import { stringify } from "querystring"

/************
 * The intention here is that we won't put any GUI stuff in here at all.
 * We *will* modify things in the DOM, and append event handlers, and
 * whatever else needs to happen, but anything that affects display will be
 * in visuals.js
 */

const options_hash = {
    form_key:  "string",
    manual: "boolean",
    email_field: "DOMNode",
    form: "DOMNodeOrBoolean",
    submit_button: "DOMNodeOrArrayOfDOMNodes",
    debug: "boolean",
    onGood: "function",
    onBad: "function",
    onChallenge: "function",
    onError: "function",
    visuals: "booleanOrVisualsObj", // this may be deprecated?
    timeout: "number"
} // css" (not yet?)

const visuals_all_on = {good:true, bad:true, challenge:true}
const visuals_all_off = {good:false, bad:false, challenge:false}

export default class Form {
    constructor(options) {
        log.debug("Invoking Class constructor!")
        log.debugdir(options)
        
        for(let key in options) {
            log.debug("Setting: "+key+" to "+options[key])
            //this[key] = options[key] //this will initialize all the callbacks, btw. Even if 'manual' is turned on! Do we...want that? TODO
            if(!this.unwrap_assign(key, options[key])) {
                //bail out if any options weren't assignable
                return false
            }
        }
        // if(!this.form_key) {
        //     return log.debug("No Form Key set!")
        // }
        if(this.doh_json_server) {
            this.doh_server = new resolver(this.doh_json_server)
        } else {
            this.doh_server = new resolver('https://cloudflare-dns.com/dns-query')
        }
        if(!this.timeout) {
            this.timeout = 10000
        } else {
            this.timeout = 1000 * this.timeout //timeout was in seconds, but window.setTimeout() is in milliseconds
        }
        if(this.manual) {
            //bail out of the rest of setup for manual-mode
            log.debug("Manual mode selected; exiting setup")
            return
        }
        if(!this.email_field) {
            return log.error("No Email Field set!")
        }
        if(typeof this.form == "undefined" || this.form === true ) { // 'true' is just an explicit way of saying 'automatically figure out what form this lives in'
            log.debug("Trying to guess Form value")
            //try and guess form from email field's 'form' property
            this.form = this.email_field.form
            log.debug("Picked: "+this.form)
        }
        if(!this.form && this.form !== false) { // 'false' means "don't mess with the form, or maybe there isn't one"
            return log.error("Could not determine Form!")
        }
        if(this.form && !this.submit_button && this.submit_button !== false) { //'false' means "don't disable submit buttons"
            log.debug("Trying to find submit buttons...")
            let submit_buttons=[]
            for(let i=0; i < this.form.elements.length; i++) {
                let element = this.form.elements[i]
                log.debug("Checking element: "+element+" - nodeName: '"+element.nodeName+"' Type: '"+element.type+"'")
                if((element.nodeName == "INPUT" && element.type == "submit") || (element.nodeName == "BUTTON" && element.type != "reset" && element.type != "button")) {
                    log.debug("Found a submit button")
                    submit_buttons.push(element)
                }
            }
            this.submit_button = submit_buttons
        }
        if(!this.visuals) {
            // if no 'visuals' override, default visuals setting is all-on
            this.visuals = duplicate(visuals_all_on)
        }
        this.initialize_dom() // this calls this.disable_submits(), which sets this.submittable = false
        this.modal = new modal(this.email_field)
        this.tooltip = new tooltip(this.email_field) //this is lightweight and doesn't do anything until you actually *show* it
    }

    unwrap_assign(name, element) {
        if(!options_hash[name]) {
            log.error("Unknown option: "+name+" - aborting")
            return false
        }
        switch(options_hash[name]) {
            case "DOMNode":
                return this.unwrap_domnode(name,element,false)
                break

            case "DOMNodeOrMultipleDOMNodes":
                return this.unwrap_domnode(name,element,true)
                break

            case "booleanOrVisualsObj":
                if(typeof element === "boolean") {
                    if(element) {
                        this.visuals = duplicate(visuals_all_on)
                    } else {
                        this.visuals = duplicate(visuals_all_off)
                    }
                    return true
                }
                if(typeof element === "object") {
                    this.visuals = duplicate(visuals_all_on) //any missing keys should default to 'on' (true)
                    for(var key in element) {
                        if(!visuals_all_on[key]) { //if the 'visuals_all_on' constant doesn't have 'true' for this, this thing has unneeded keys
                            return false
                        }
                        this.visuals[key] = element[key]
                    }
                    //made it through all of the visual_keys, none were there that we didn't expect.
                    //now make sure to set default 'true' for anything missed.
                    return true
                }
                return false
                break

            case "DOMNodeOrBoolean":
                if(typeof element === "boolean") {
                    this[name] = element
                    return true
                } else {
                    return this.unwrap_domnode(name,element,false)
                }
                break
            
            default:
                if(typeof element == options_hash[name]) {
                    this[name] = element
                    return true
                } else {
                    log.error("Unknown type for parameter: "+name+" (wanted: "+options_hash[name]+")")
                    return false
                }
        }
    }

    unwrap_domnode(name, element, multiple)  {
        // if it's a jquery element, return the real DOM element underneath.
        // if it's still bad, error.
        if(typeof(element) === 'object' && element['jquery'] && element['get']) {
            log.debug("jQuery-like object found for "+name)
            if(element.length == 0 ) {
                log.error("No elements found in jQuery selector for "+name)
                return false
            }
            if(element.length > 1) {
                if(!multiple) {
                    log.error("Too many elements found in jQuery selector for "+name+" (count: "+element.length+")")
                    return false
                }
                //multiples allowed
                let unwrapped = []
                for(let i=0 ; i < element.length; i++) {
                    unwrapped.push(element[i])
                }
                this[name] = unwrapped
                return true
            }
            this[name] = element.get(0)
            return true
        }
        if(typeof(element) === "string") {
            let node = document.getElementById(element)
            if(!node) {
                log.error("No element with id "+element+" found for "+name)
                return false
            }
            this[name] = node
            return true
        }
        if((typeof(Element) !== "undefined" && element instanceof Element) || (element['nodeName'] && element['nodeType'] === 1)) {
            this[name] = element
            return true
        }
        if(is_array(element)) {
            for(let i = 0 ; i < element.length ; i++) {
                if(!(element[i] instanceof element_type)) {
                    log.error("Array for "+name+" contains non-DOM element at index "+i)
                    return false
                }
            }
            this[name] = element
            return true
        }
        log.debug("Unknown element type passed for "+name+": "+typeof(element)+", and its prototype is: "+(element['prototype'] ? element.prototype : '<unknown>')+", and its source: "+(element && element['prototype'] && element['prototype']['toSource'] ? element.prototype.toSource() : '<unavailable>'))
        return false
    }

    //DOM-mangling stuff

    initialize_dom() {
        // set up the onchange handler for the email field
        let old_onchange = this.email_field.onchange
        this.email_field.onchange = (event) => {
            this.onchange_handler(event)
            if(old_onchange) {
                old_onchange(event)
            }
        }

        //set up the onsubmit handler for the form (if there is one)
        if(this.form) {
            let old_onsubmit = this.form.onsubmit
            this.form.onsubmit = (event) => {
                log.debug("On Submit handler firing!")
                var results
                if(old_onsubmit) {
                    results = old_onsubmit(event) //TODO - confusing, *their* old onsubmit handler fires *first*?
                }                                   // Well, it could make sense - if you wanted to do something to interrupt the verification, you could?
                if(!old_onsubmit || results) {
                    return this.onsubmit_handler(event)
                }
            }
        }

        //disable submit button, if there is one - 
        this.disable_submits()
    }

    disable_submits() {
        this.set_submit_button_disabled(true)
    }

    enable_submits() {
        this.set_submit_button_disabled(false)
    }

    set_submit_button_disabled(state) {
        this.submittable = !state // if disabled == true, submittable = false; if disabled == false, submittable = true
        if(this.submit_button) {
            log.debug("Trying to disable submit button...")
            if(is_array(this.submit_button)) {
                log.debug("Submit button IS ARRAY")
                for(let x in this.submit_button) {
                    this.submit_button[x].disabled = state
                }
            } else {
                this.submit_button.disabled = state
            }
        }
    }

    // Event-management/hook-management helper methods

    parse_event_handler_results(result, behavior, visuals, allow_func, params) {
        if(typeof(result) === "undefined") { // undefined (or nothing returned), do default *everything*
            //do default VISUALS, *AND* default BEHAVIOR!
            behavior(...params)
            visuals(...params)
            return 
        } else if(result === false) { //NEGATIVE RESULT from pre-callback - do *NOT* invoke callback!
            // NO VISUALS. NO BEHAVIOR!
            return true
        } else if(result === true) { //TRUE RESULT  - continue normal behavior, but skip visuals
            return behavior(...params)
        } else if(is_function(result)) {
            if(allow_func) { //function allowed, invoke callback with appropriate parameters
                return result((nested_function_result) => {
                    return this.parse_event_handler_results(nested_function_result, behavior, visuals, false, params)
                }) 
            } else {
                log.error("Function type returned when function is not allowed.") //can't say *which* one tho TODO
                // raise? throw? TODO
            }
        } else {
            log.error("Unknown type returned from handler '"+(typeof result)+"'") //TODO would be nice to have *which* handler we've got an unknown type from
            // should we 'throw()' or something here? Great question.
        }
    }

    fire_hooks(name, behavior, visuals, ...params) {
        log.debug("Firing hooks for: "+name)
        if(this.manual) {
            return
        }

        if(!this[name]) { // side-note, if we want to get super-froggy here we can set a 'default callback' of () => {} then everything runs like normal?
            //no hooks; go ahead and do the default stuff from 'callback'
            behavior(...params)
            visuals(...params)
            return
        }
        let tmp = this[name](...params)
        return this.parse_event_handler_results(tmp, behavior, visuals, true, params)
    }

    onchange_handler() {
        this.disable_submits() //field has changed; not submittable until this returns!
        this.verifying = this.email_field.value
        //FIXME - should we set an 'in-flight' variable, so we know not to double-verify?
        if(this.verifying == "" ) {
            return
        }
        this.verify(this.email_field.value, (results) => {
            log.debug("Verification results are: ")
            log.debugdir(results)
            //so weird, but the 'verify' method fires all the appropriate callbacks, so we don't do anything here?
        })
    }

    onbad_handler(detailed_status, message) {
        this.fire_hooks('onBad', () => {
            this.disable_submits()    
        }, 
        () => {
            if(this.visuals.bad) {
                this.tooltip.show(message)
            }
        },
        detailed_status,
        message)
    }

    ongood_handler(detailed_status, checksum, message) {
        this.fire_hooks('onGood', () => {
            if(this.form) {
                update_hidden_fields(this.form, checksum, status)
            }
            this.enable_submits()
        },
        () => {
            if(this.visuals.good) {
                this.tooltip.hide()
            }    
        },
        detailed_status,
        message)
    }

    onchallenge_handler(challenge_key, message) {
        this.fire_hooks('onChallenge', () => {
            this.disable_submits();
        },
        () => {
            ///uh....throw up a prompt?
            if( !this.visuals.challenge ) {
                return
            }
            this.modal.show(challenge_key, message, () => {
                if(this.email_field.value != this.modal.get_challenge_address()) { 
                    log.debug("Field value: "+this.email_field.value+" , challenge_address: "+this.modal.get_challenge_address())
                    this.modal.bad_address()
                                                                                                                //TODO - interntaionalize!
                    return
                }
                this.challenge(this.email_field.value, challenge_key, (results) => {
                    log.debug("Challenge results are: ")
                    log.debugdir(results)
                    if(results.status == "ACCEPTED") {
                        this.modal.pin_input()
                        this.modal.set_modal_action( () => {
                            let pin = this.modal.get_pin_code()
                            this.response(this.email_field.value,challenge_key, pin, (response) => {
                                log.debugdir(response)
                                if(response.status == "GOOD") {
                                    this.modal.hide()
                                    /*
                                     * We need the following because the integrator may have their own way of displaying
                                     * a valid message, or hiding an *invalid* message - and we need to make sure
                                     * their hooks fire correctly. But also, we *do* want to update the checksums and all the
                                     * other default behavior of a 'good' verification
                                     */
                                    this.ongood_handler(response.status, response.checksum)
                                } else {
                                    this.modal.bad_pin()
                                }
                            })
                        })
                    } else {
                        window.alert("Challenge rejected!") //FIXME - should never happen tho! (well, unless maybe you sent too many emails?)
                    }
                })
            })
        })
    } 

     onerror_handler() {
        this.fire_hooks('onError',() => {
            log.debug("Error detected?")
            this.tooltip.remove()
            this.enable_submits()
        },() => {
            log.debug("No default visuals for error?")
        })
    }

    onsubmit_handler(event) {
        //customer's hooks have already fired, let's go!
        //the additional check against the contents of the field are just in case some
        //browsers aren't quite so religious about running onChange handlers before onSubmit
        if(this.submittable && this.email_field.value === this.verifying) {
            return true
        }
        log.debug("Cannot submit form - submittable? "+this.submittable+" our field value? "+this.email_field.value+" what we're verifying? "+this.verifying)
        if(this.email_field.value !== this.verifying) {
            log.debug("sending new verification!")
            this.verify(this.email_field.value, (results) => {  //FIXME - this could double-verify!
                if(this.submittable && this.form) { //don't directly inspect 'results', assume the onBlah handlers will update 'submittable'
                    this.form.submit()
                }
            })
        }
        return false //the 'verify' callback above will actually do the work of submitting the form
    }

    // LOW-LEVEL JSON helpers
    // but also, helpers that *we* use - so should they be invoking our callbacks for us?
    // maybe yes only if manual is false?

    jsp(url, doh_server, data, success) {
        data.form_key = this.form_key //this mutates the source; but we don't care for our purposes
        let timed_out = false
        let to = window.setTimeout(() => {
            timed_out = true
            this.onerror_handler(new Error("Timeout"))
        }, this.timeout)

        let success_func = (data) => {
            if(timed_out) { //prevent success handler from firing *after* a timeout had already fired
                return
            }
            window.clearTimeout(to)
            return success(data)
        }

        let error_func = (err) => {
            window.clearTimeout(to)
            this.onerror_handler(err)
        }

        console.warn("This.form_key is: "+this.form_key)
        if (!this.form_key) {
            //do JS-based validation only; but invoke the same callbacks and whatnot the same as before.
            doh_server[url](data, success_func, error_func)
        } else {
            //do server-side validation via GoodForms
            JSONP({
                url: HOST+'/'+url,
                data: data,
                success: success_func,
                error: error_func
            })
        }

    }

    verify(email, callback) {
        log.debug("VERIFY low-level method invoked!")
        this.jsp("verify", this.doh_server, {email: email},
            (data) => {
                if(data.error) {
                    log.error(data.error)
                }
                let detailed_status = null
                if(data && data.checksum) {
                    detailed_status = data.checksum.split(";")[2] //what happens if there's a semicolon in the email? Well, it's gonna mess up.
                }
                switch(data.status) {
                    case "BAD":
                    this.onbad_handler(detailed_status, data.message)
                    break
    
                    case "GOOD":
                    this.ongood_handler(detailed_status, data.checksum, data.message)
                    break
    
                    case "CHALLENGE":
                    this.onchallenge_handler(data.challenge_key, data.message)
                    break
    
                    default:
                    log.error("UNKNOWN STATUS: "+data.status) //error here?
                    this.onerror_handler(data.message)
                }
                if(callback) { //TODO - should callback fire *first*, or *last*?
                    //I kinda feel like all the 'manual' stuff will use this, but nothing else will.
                    //oh, I take that back - if you try and submit the form and it hasn't been validated; then _that_
                    // verification will use this!
                    callback(data)
                }
            }
        )
    }

    challenge(email, challenge_key, callback) {
        this.jsp("challenge",
            {email: email, challenge_key: challenge_key},
            (data) => {
                callback(data)
                // switch(data.status) {
                //     case "GOOD":

                // }
            }
        )
    }

    response(email, challenge_key, pin, callback) {
        this.jsp("response",
            {email: email, challenge_key: challenge_key, pin: pin},
            (data) => { //ugh, this 'success' doesn't mean success.
                // if(data.error) {
                //     //uhm, yeah? Do, what, exactly?
                // }
                // if(this.tooltip) {
                //     this.tooltip.hide()
                // }
                // this.enable_submits()

                // not sure yet - (mental bit-rot) - but I think the above stuff is fully subsumed in firing the ongood_handler()
                callback(data)
        
            }
        )
    }
}