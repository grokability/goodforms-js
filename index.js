import auto from "./auto"
import log from "./logging"
import Form from "./form"
import { duplicate } from "./utils.js"


export default function (form_key, options) {
    log.debug("MAIN INIT ROUTINE RUNNING!")
    if(typeof form_key === 'object' && typeof options === 'undefined') {
        options = form_key
        form_key = '' // TODO: I *think* it might be cleaner to do 'undefined' here?
    }
    if(options && options.debug) {
        log.debug_enabled = options.debug
    }
    if(!form_key && !options['form_key']) {
        log.debug('Form key was not set (root-level)') // THIS is where change something?
    }
    if(!options || (!options.email_field && !options.manual)) {
        log.debug("Engaging 'auto' - ")
        log.debugdir(options)
        log.debug("Email field is: "+options.email_field+" and options.manual is: "+options.manual)
        return auto(form_key, options)
    }
    log.debug("CREATING NEW FORM WITH FORMKEY: "+form_key)
    log.debugdir(options)
    let my_opts = duplicate(options)
    my_opts['form_key'] = form_key
    return new Form(my_opts)
}