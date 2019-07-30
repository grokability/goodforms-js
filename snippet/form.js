
import log from "./logging"
import { is_array } from "./utils"
import JSONP from "browser-jsonp"

import Tooltip from "tooltip.js"

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
                if(this_element.nodeName == "INPUT" && this_element.type =="submit") {
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
        let that = this
        this.email_field.onchange = function (event) {
            that.onchange_handler(event)
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
        if(this.submit_button) {
            log.debug("Trying to disable submit button...")
            if(is_array(this.submit_button)) {
                log.debug("Submit button IS ARRAY")
                for(let x in this.submit_button) {
                    this.submit_button[x].disabled = true
                }
            } else {
                this.submit_button.disabled = true
            }
        }
    }

    onchange_handler(event) {
        this.verify(this.email_field.value, function (results) {
            if(results == "BAD") {
                this.mytooltip = new Tooltip(this.email_field)
                this.mytooltip.show()
            }
        })
    }

    onsubmit_handler(event) {
        DO_SOMETHING_CLEVERER()
        JSONP("url")
    }

    verify(email, callback) {
        JSONP({url: HOST+"/verify",
            data: {email: email, form_key: this.form_key}, 
            success: function (data) {
                callback(data.status)
            }
        })
    }
}