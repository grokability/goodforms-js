
import log from "./logging"
import { is_array, is_function } from "./utils"
import JSONP from "browser-jsonp"

import {tooltip, modal, update_hidden_fields} from "./visuals"
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
        if(!this.submit_button) { //TODO - allow 'false' here (not null/undefined?) to permit no-buttons?
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
        //initialize tooltip and modal here?
        this.tooltip = new tooltip(this.email_field)
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
        if(element instanceof Element) {
            this[name] = element
            return true
        }
        if(is_array(element)) {
            for(let i = 0 ; i < element.length ; i++) {
                if(!(element[i] instanceof Element)) {
                    log.error("Array for "+name+" contains non-DOM element at index "+i)
                    return false
                }
            }
            this[name] = element
            return true
        }
        log.error("Unknown element type passed for "+name+": "+typeof(element))
        return false
    }

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
                var results
                if(old_onsubmit) {
                    results = old_onsubmit(event) //FIXME - confusing, *their* old onsubmit handler fires *first*?
                }
                if(results) {
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

    onchange_handler(event) { //TODO - I almost feel like this could go away, entirely? Just set the onchange_handler to be verify() ?
        this.verify(this.email_field.value, (results) => {
            log.debug("Verification results are: ")
            log.debugdir(results)
            //so weird, but the 'verify' method fires all the appropriate cllabacks, so we don't do anything here?
        })
    }

    onbad_handler() {
        this.fire_hooks('onBad',() => {
            this.submittable = false
            this.tooltip.show('Bad Email Address') //TODO - internationalize based on API response?
            this.disable_submits()    
        })
    }

    ongood_handler(status, checksum) {
        this.fire_hooks('onGood',() => {
            this.submittable = true
            this.tooltip.hide()
            update_hidden_fields(this.form, checksum, status)
            this.enable_submits()
        })
    }

    onchallenge_handler(challenge_key) {
        this.fire_hooks('onChallenge',() => {
            this.submittable = false
            ///uh....throw up a prompt?
            this.modal.show(challenge_key, () => {
                if(this.email_field.value != document.getElementById('goodverification_challenge_address').value) { //FIXME - 'reaching in' to another module's DOM? gauche
                    log.debug("Field value: "+this.email_field.value+" , challenge_address: "+document.getElementById('goodverification_challenge_address').value)
                    this.modal.bad_address()
                                                                                                                //TODO - interntaionalize!
                    return
                }
                this.challenge(this.email_field.value,challenge_key, (results) => {
                    log.debug("Challenge results are: ")
                    log.debugdir(results)
                    if(results.status == "ACCEPTED") {
                        this.modal.pin_input()
                        this.modal.button.onclick = () => { //FIXME - feels weird to manipulate members like this? Maybe it's fine.
                            let pin = document.getElementById('goodverification_pin').value //FIXME - 'reaching in' to foreign DOM still
                            this.response(this.email_field.value,challenge_key, pin, (response) => {
                                log.debugdir(response)
                                if(response.status == "GOOD") {
                                    this.modal. hide()
                                    update_hidden_fields(this.form, response.checksum, response.status)
                                    // this.insert_checksum(response.checksum)  // BROKEN!!!! FIXME
                                    // this.insert_status(response.status)  // BROKEN!!!! FIXME
                                    this.enable_submits()
                                }
                            })
                        }
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
        DO_SOMETHING_CLEVERER()
        JSONP("url")
    }

    // LOW-LEVEL JSON helpers
    // but also, helpers that *we* use - so should they be invoking our callbacks for us?
    // maybe yes only if manual is false?

    verify(email, callback) {
        JSONP({url: HOST+"/verify",
            data: {email: email, form_key: this.form_key}, 
            success: (data) => {
                if(data.error) {
                    log.error(data.error)
                }
                switch(data.status) {
                    case "BAD":
                    this.onbad_handler()
                    break
    
                    case "GOOD":
                    this.ongood_handler(data.status, data.checksum) //status is the wrong thing here.
                    break
    
                    case "CHALLENGE":
                    this.onchallenge_handler(data.challenge_key)
                    break
    
                    default:
                    log.error("UNKNOWN STATUS: "+data.status) //error here?
                    this.onerror_handler()
                }
                if(callback) { //TODO - should callback fire *first*, or *last*?
                    //I kinda feel like all the 'manual' stuff will use this, but nothing else will.
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
                if(this.mytooltip) { //FIXME - instead invoke the onchange callback thing?
                    this.mytooltip.hide()
                }
                this.enable_submits()

                callback(data)
        
            }
        })
    }
}