
import log from "./logging"
import { is_array, is_function } from "./utils"
import JSONP from "browser-jsonp"

import { modal, update_hidden_fields} from "./visuals" //commented-out: tooltip
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
    form: "DOMNode",
    submit_button: "DOMNodeOrArrayOfDOMNodes",
    debug: "boolean",
    onGood: "function",
    onBad: "function",
    onChallenge: "function",
    onError: "function",
    manual: "boolean"
} // css" (not yet?)

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
        if(!this.form_key) {
            return log.error("No Form Key set!")
        }
        if(this.manual) {
            //bail out of the rest of setup for manual-mode
            log.debug("Manual mode selected; exiting setup")
            return
        }
        if(!this.email_field) {
            return log.error("No Email Field set!")
        }
        if(!this.form) {
            log.debug("Trying to guess Form value")
            //try and guess form from email field's 'form' property
            this.form = this.email_field.form
            log.debug("Picked: "+this.form)
        }
        if(!this.form) { //TODO - allow 'false' here (not null/undefined?) to permit no-form?
            return log.error("Could not determine Form!")
        }
        if(!this.submit_button && this.submit_button !== false) { //'false' means "don't disable submit buttons"
            log.debug("Trying to find submit buttons...")
            let submit_buttons=[]
            for(let i=0; i< this.form.elements.length; i++) {
                let element = this.form.elements[i]
                log.debug("Checking element: "+element+" - nodeName: '"+element.nodeName+"' Type: '"+element.type+"'")
                if((element.nodeName == "INPUT" && element.type =="submit") || (element.nodeName == "BUTTON" && element.type != "reset" && element.type != "button")) {
                    log.debug("Found a submit button")
                    submit_buttons.push(element)
                }
            }
            this.submit_button = submit_buttons
        }
        this.initialize_dom()
        this.modal = new modal(this.email_field)
        this.submittable = false
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
        log.error("Unknown element type passed for "+name+": "+typeof(element)+", and its prototype is: "+element.prototype+", and its source: "+element.prototype.toSource())
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
                    results = old_onsubmit(event) //FIXME - confusing, *their* old onsubmit handler fires *first*?
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

    // Event-management/hook-management helper method

    fire_hooks(name, callback) {
        log.debug("Firing hooks for: "+name)
        if(this.manual) {
            return
        }

        if(!this[name]) {
            //no hooks; go ahead and do the default stuff from 'callback'
            return callback()
        }
        let result = this[name]()
        if(result === false) { //NEGATIVE RESULT from pre-callback - do *NOT* invoke callback!
            return
        }
        if(result === true) { //TRUE RESULT - continue normal behavior
            return callback()
        }
        if(is_function(result)) {
            return result(callback) //deferred...
        }
        log.error("Unknown type returned from handler '"+name+"' - "+(typeof result))
    }

    setError(msg) {
        if(this.email_field["setCustomValidity"]) {
            this.email_field.setCustomValidity(msg);
            return
        }
        //fallback for ancient browsers that do *NOT* have constraintValidation (IE, possibly others?!)
        this.email_field.setAttribute("data-goodverification-message",msg)
        // if(msg != "") {
        //     window.alert(msg)
        // } else {
        //     //the msg has been set to blank; a/k/a "it's okay now" - what do we do/say? Anything?
        //     //it *could* make sense to say "okay, your email is OK now!" - but do we want to? I don't know!
        // }
    }

    // Event Handler methods

    onchange_handler(event) {
        log.debug("ONCHANGE HANDLER TRIGGERED!") // FIXME - this is too noisy
        this.submittable = false //field has changed; not submittable until this returns!
        this.verifying = this.email_field.value
        //FIXME - should we set an 'in-flight' variable, so we know not to double-verify?
        this.verify(this.email_field.value, (results) => {
            log.debug("Verification results are: ")
            log.debugdir(results)
            //so weird, but the 'verify' method fires all the appropriate callbacks, so we don't do anything here?
        })
    }

    onbad_handler(message) {
        this.fire_hooks('onBad',() => {
            this.submittable = false
            this.setError(message)
            this.disable_submits()    
        })
    }

    ongood_handler(status, checksum, message) {
        this.fire_hooks('onGood',() => {
            this.submittable = true
            this.setError("") //we need this because it secretly is causing setCustomValidity(), but if we have a 'success message', how do we handle it? FIXME
            update_hidden_fields(this.form, checksum, status)
            this.enable_submits()
        })
    }

    onchallenge_handler(challenge_key, message) {
        this.fire_hooks('onChallenge',() => {
            this.submittable = false
            ///uh....throw up a prompt?
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
                                    update_hidden_fields(this.form, response.checksum, response.status)
                                    this.submittable = true
                                    this.enable_submits()
                                }
                            })
                        })
                    } else {
                        window.alert("Challenge rejected!") //FIXME - should never happen tho!
                    }
                })
            }
)
        })
    }

    onerror_handler() {
        this.fire_hooks('onError',() => {
            log.debug("Error detected?")
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
                if(this.submittable) { //don't directly inspect 'results', assume the onBlah handlers will update 'submittable'
                    this.form.submit()
                }
            })
        }
        return false //the 'verify' callback above will actually do the work of submitting the form
    }

    // LOW-LEVEL JSON helpers
    // but also, helpers that *we* use - so should they be invoking our callbacks for us?
    // maybe yes only if manual is false?

    verify(email, callback) {
        log.debug("VERIFY low-level method invoked!")
        JSONP({url: HOST+"/verify",
            data: {email: email, form_key: this.form_key}, 
            success: (data) => {
                if(data.error) {
                    log.error(data.error)
                }
                switch(data.status) {
                    case "BAD":
                    this.onbad_handler(data.message)
                    break
    
                    case "GOOD":
                    this.ongood_handler(data.status, data.checksum, data.message) //status is the wrong thing here.
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
        })
    }

    challenge(email, challenge_key, callback) {
        JSONP({url: HOST+"/challenge",
            data: {email: email, form_key: this.form_key, challenge_key: challenge_key},
            success: (data) => {
                callback(data)
                // switch(data.status) {
                //     case "GOOD":

                // }
            }
        })
    }

    response(email, challenge_key, pin, callback) {
        JSONP({url: HOST+"/response",
            data: {email: email, challenge_key: challenge_key, pin: pin, form_key: this.form_key},
            success: (data) => {
                /* NB - the FIXME below may still hold water! Think about it!!!!
                if(this.mytooltip) { //FIXME - instead invoke the onchange callback thing?
                    this.mytooltip.hide()
                }
                */
                this.setError("") //clears error condition
                this.enable_submits()

                callback(data)
        
            }
        })
    }
}