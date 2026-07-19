
import auto from "./auto"
import log from "./logging"
import Form from "./form"
import { duplicate } from "./utils.js"
import "./json2"

export default function (form_key, options) {
    //it's *tempting* to try and yank all of the debug_enabled stuff up _here_
    //but we already do some juggling of the form_key and options a bit for
    // the next few lines below, so best to keep it where it is :/
    if(typeof options === 'undefined') {
        // handle either Goodforms({blah:'blah',blah:'blah'})
        // or Goodforms()
        options = form_key
        form_key = undefined
    }
    if(!options) {
        options = {}
    }
    if(options.debug) {
        log.debug_enabled = options.debug
    }
    log.verbose("MAIN INIT ROUTINE RUNNING!")
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