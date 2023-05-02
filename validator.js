import log from "./logging";

import resolver from "./resolver"

// this should probably have some kind of 'constructor' function that takes a doh_server, yeah?
// and maybe instead of just a hash of functions, it should just be real methods on a 'class'.

export default class Validator {

    constructor(doh_server) {
        this.doh_server = new resolver(doh_server)
    }

    verify(data, success_func) { // this _looks_ like it's not used, but it definitely *is*
        console.warn("Hey, we validated something! Isn't that nice :)")
        // do something.

        let resolver = this.doh_server
        setTimeout(function () { // TODO - i don't thinkn we need this
            //do RFC-compliance check FIRST to spare the DNS server...
            console.dir("email we want to lok at is: "+data.email)
            var last_at = data.email.lastIndexOf('@')
            var domain = data.email.substring(last_at+1) //need to remove the '@' itself, of course
            var username = data.email.substring(0,last_at)
            // console.log("domain is: "+domain)
            console.log("username is: "+username)
            resolver.lookup('MX', domain, function (results) {
                if ( results.Answer && results.Answer.length > 0) {
                    // It's at least *got* an MX record, that's a good start.
                    // NB, we can eventually start to do RFC1918 checks on the resulting hostname or IP
                    // but this is at least a _start_
                    success_func({status: 'GOOD'})
                } else {
                    // By RFC, if there is no MX record, we drop to A-record fallback
                    resolver.lookup('A', domain, function (a_results) {
                        if ( a_results.Answer && a_results.Answer.length > 0) {
                            success_func({status: 'GOOD'})
                        } else {
                            success_func({status: 'BAD', message: "Invalid Domain"}) //TODO - how to translate this?
                        }
                    })
                }
            })
        })
    }
}