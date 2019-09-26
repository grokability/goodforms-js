import auto from "./auto"
import log from "./logging"
import Form from "./form"

export default function (form_key, options) {
    if(options && options.debug) {
        log.debug_enabled = options.debug
    }
    if(!form_key) {
        log.error("Form key was not set")
        return
    }
    if(!options || (!options.email_field && !options.manual)) {
        return auto(form_key, options)
    }
    return new Form(form_key, options)
}