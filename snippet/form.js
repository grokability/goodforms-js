
import log from "./logging"
import jsonp from "jsonp"

export default class Form {
    constructor(options) {
        for(let key in options) {
            this[key] = options[key]
        }
        if(!this.form_key) {
            return log.error("No Form Key set!")
        }
        if(this.manual) {
            //bail out of the rest of setup for manual-mode
            return
        }
        if(!this.email_field) {
            return log.error("No Email Field set!")
        }
        if(!this.form) {
            //try and guess form from email field's 'form' property
            this.form = this.email_field.form
        }
        if(!this.form) {
            return log.error("Could not determine Form!")
        }
        if(!this.submit_button) {
            let submit_buttons=[]
            for(let element in this.form.elements) { //FIXME - should use integers only?
                let this_element = this.form.elements[element]
                if(this_element.nodeName == "input" && this_element.type =="submit") {
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
        this.email_field.onchange = function (event) {
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
    }

    onchange_handler(event) {
        DO_SOMETHNG_CLEVER()
        jsonp("url")
    }

    onsubmit_handler(event) {
        DO_SOMETHING_CLEVERER()
        jsonp("url")
    }

    verify(email, callback) {
        jsonp("https://goodverification.com/verify?email="+ email + "&form_key="+this.form_key,{}, function (data) {
            callback(data.status)
        })
    }
}