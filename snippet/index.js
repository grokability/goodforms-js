import auto from "./auto"
// import "core-js/modules/es.object.assign.js" // I am supposed to be able to say `import "core-js"` and it should just work
// but, of course, it does not.
// (either I get a giant shitshow of ridiculous amounts of pointless code, or no Object.assign() method)
// This is all super weird and unbelievably annoying.
// I keep trying to fix it and then I manage to fuck it up again. I don't want to keep doing that.

//export default something = true

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