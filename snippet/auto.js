import log from "./logging"
import Form from "./form"
//import assign from "core-js-pure/es/object/assign"
import { duplicate } from "./utils.js"

export default function (form_key,options) {
    if(!form_key) {
        log.error("Form key was not set")
        return
    }
    if(options) {
        my_options=duplicate(options);
        my_options.form_key = form_key
    } else {
        my_options={form_key: form_key}
    }
    if(my_options.debug) {
        log.debug = my_options.debug
        delete my_options.debug //don't want to keep passing this down to each Verify
    }
    let activated_forms=[]
    for(form in document.forms) { //olde-skoole DOM0 FTW!
        log.debug("Checking form: "+form+" for verifiable email address fields...")
        for(element in document.forms[form].elements) {
            log.debug("Checking field #"+element+" to see if it's an email address field")
            let this_field = document.forms[form].elements[element]
            if(this_field.type == "email" || this_field.name == "email" || this_field.id == "email") {
                let options_copy = duplicate(my_options)
                log.debug("Found candidate field. Name: "+this_field.name+" Type: "+this_field.type+" ID: "+this_field.id)
                options_copy.form = document.forms[form]
                options_copy.email_field = this_field
                activated_forms.push(new Form(options_copy))
            }
        }
    }
    return activated_forms
}