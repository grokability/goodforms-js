
import log from "./logging"
import { is_array } from "./utils"
import JSONP from "browser-jsonp"

import tingle from "tingle.js"

import Tooltip from "tooltip.js"

import 'tingle.js/dist/tingle.min.css' //FIXME - we should perhaps set the rollup config to NOT inject by default, and then we do it ourselves later when needed?
                                        //if other people are also using the Tingle library, then this would prevent us all from conflicting with each other

import './popper.css' //FIXME - this also should only be loaded if needed (allow customers to override CSS I guess?)

export default class Form {
    constructor(options) {
        log.debug("Invoking Class constructor!")
        for(let key in options) {
            log.debug("Setting: "+key+" to "+options[key])
            this[key] = options[key]
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
        if(!this.form) {
            return log.error("Could not determine Form!")
        }
        if(!this.submit_button) {
            log.debug("Trying to find submit buttons...")
            let submit_buttons=[]
            for(let element in this.form.elements) { //FIXME - should use integers only?
                let this_element = this.form.elements[element]
                log.debug("Checking element: "+element+" - nodeName: '"+this_element.nodeName+"' Type: '"+this_element.type+"'")
                if(this_element.nodeName == "INPUT" && this_element.type =="submit") { //FIXME - should find other submitting-buttons too! e.g. <button> or <input type='button'>
                    log.debug("Found a submit button")
                    submit_buttons.push(this_element)
                }
            }
            this.submit_button = submit_buttons
        }
        this.initialize_dom()
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
            this.form.onsubmit = function (event) {
                if(old_onsubmit) {
                    let results = old_onsubmit(event) //FIXME - confusing, *their* old onsubmit handler fires *first*?
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

    onchange_handler(event) {
        this.verify(this.email_field.value, (results) => {
            log.debug("Verification results are: ")
            log.debugdir(results)
            switch(results.status) {
                case "BAD":
                //FIRE HOOKS FIRST? FIXME
                if(!this.mytooltip) {
                    this.mytooltip = new Tooltip(this.email_field, {placement: 'bottom', title: 'Bad Email Address', trigger: 'manual'})
                }
                this.mytooltip.show()
                this.disable_submits()
                break

                case "GOOD":
                //FIRE HOOKS FIRST? FIXME
                if(this.mytooltip) {
                    this.mytooltip.hide()
                }
                this.enable_submits()
                break

                case "CHALLENGE":
                //FIRE HOOKS FIRST? FIXME
                ///uh....throw up a prompt?
                this.display_challenge_modal(results.challenge_key)
                break
                //no idea!
            }
        })
    }

    display_challenge_modal(challenge_key) {
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
}

    onsubmit_handler(event) {
        DO_SOMETHING_CLEVERER()
        JSONP("url")
    }

    verify(email, callback) {
        JSONP({url: HOST+"/verify",
            data: {email: email, form_key: this.form_key}, 
            success: function (data) {
                if(data.error) {
                    log.error(data.error)
                }
                callback(data)
            }
        })
    }

    challenge(email, challenge_key, callback) {
        JSONP({url: HOST+"/challenge",
            data: {email: email, form_key: this.form_key, challenge_key: challenge_key},
            success: function (data) {
                callback(data)
                // switch(data.status) {
                //     case "GOOD":

                // }
            }
        })
    }
}