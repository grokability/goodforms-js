
import resolver from "./resolver"

export default class Validator {

    constructor(doh_server) {
        this.doh_server = new resolver(doh_server)
    }

    verify(data, completion_func) {
        let resolver = this.doh_server
        // TODO: do RFC-compliance check FIRST to spare the DNS server...
        let last_at = data.email.lastIndexOf('@')
        let domain = data.email.substring(last_at+1) //need to remove the '@' itself, of course
        let username = data.email.substring(0,last_at)
        resolver.lookup('MX', domain, function (results, error) {
            if ( !results && error ) {
                completion_func({status: 'ERROR', message: String(error)}) // I don't like this repeating.
                return
            } // TODO: I think this actually *might* fit in a Promise implementation? We can certainly 'include' one
            if ( results.Answer && results.Answer.length > 0) {
                // It's at least *got* an MX record, that's a good start.
                // TODO we can eventually start to do RFC1918 checks on the resulting hostname or IP
                // but this is at least a _start_
                completion_func({status: 'GOOD'})
            } else {
                // By RFC, if there is no MX record, we drop to A-record fallback
                resolver.lookup('A', domain, function (a_results, a_error) {
                    if ( !a_results && a_error) { // SyntaxError, actually :/ (as above?)
                        completion_func({status: 'ERROR', message: String(a_error)}) // this is copypasta from above. Don't like.
                        return
                    }
                    if ( a_results.Answer && a_results.Answer.length > 0) {
                        completion_func({status: 'GOOD'})
                    } else {
                        completion_func({status: 'BAD', message: "Invalid Domain"}) //TODO - how to translate this?
                    }
                })
            }
        })
    }
}