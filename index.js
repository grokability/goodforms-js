
import auto from "./auto"
import log from "./logging"
import Form from "./form"
import { duplicate } from "./utils.js"
import "./json2"

export default function (form_key, options) {
    if(options && typeof options == "object" && options.debug) {
        log.debug_enabled = options.debug
    }
    log.verbose("MAIN INIT ROUTINE RUNNING!")
    if(typeof options === 'undefined') {
        // handle either Goodforms({blah:'blah',blah:'blah'})
        // or Goodforms()
        options = form_key
        form_key = undefined // TODO: I *think* it might be cleaner to do 'undefined' here?
    }
    if(!options) {
        options = {}
    }
    if(!form_key && (!options['form_key'])) {
        log.debug('Form key was not set (root-level)')
    }
    log.debug("CREATING NEW FORM WITH FORMKEY: "+form_key)
    log.verbosedir(options)
    let my_opts = duplicate(options)
    // if form_key was passed as part of the options, don't try and set it
    // but if it wasn't, and you don't even *have* a form key - you should also try not to set it.
    if (!my_opts['form_key'] && form_key) {
        my_opts['form_key'] = form_key
    }
    if(!options.email_field && !options.manual) {
        log.debug("Engaging 'auto' - ")
        log.verbosedir(my_opts)
        return auto(my_opts)
    }
    return new Form(my_opts)
}