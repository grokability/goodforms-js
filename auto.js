import log from "./logging"
import Form from "./form"
//import assign from "core-js-pure/es/object/assign"
import { duplicate } from "./utils.js"

export default function (options) {
    let activated_forms=[]
    for(let form = 0 ; form < document.forms.length ; form++ ) { //olde-skoole DOM0 FTW!
        log.debug("Checking form: "+form+" for verifiable email address fields...")
        for(let i = 0; i < document.forms[form].elements.length ; i ++ ) {
            log.debug("Checking field #"+i+" to see if it's an email address field")
            let this_field = document.forms[form].elements[i]
            log.debug("It's type is: "+this_field.type+" its name is: "+this_field.name+" and its id is: "+this_field.id)
            //log.debugdir(this_field)
            if(this_field.type == "email" || this_field.name == "email" || this_field.id == "email") {
                let options_copy = duplicate(options)
                log.debug("Found candidate field. Name: "+this_field.name+" Type: "+this_field.type+" ID: "+this_field.id)
                options_copy.form = document.forms[form]
                options_copy.email_field = this_field
                activated_forms.push(new Form(options_copy))
            }
        }
    }
    return activated_forms
}