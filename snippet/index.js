import auto from "./auto"
import log from "./logging"
import Form from "./form"

export default function (form_key, options) {
    if(options && options.debug) {
        log.debug = options.debug
    }
    if(!form_key) {
        log.error("Form key was not set")
    }
    if(!options || (!options.email_field && !options.manual)) {
        return auto()
    }
    return new Form(form_key, options)
}