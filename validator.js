import log from "./logging";

import resolver from "./resolver"

// this should probably have some kind of 'constructor' function that takes a doh_server, yeah?
// and maybe instead of just a hash of functions, it should just be real methods on a 'class'.

export default class Validator {

    constructor(doh_server) {
        this.doh_server = new resolver(doh_server)
    }

    verify(data, success_func, error_func) { // this _looks_ like it's not used, but it definitely *is*
        console.warn("Hey, we validated something! Isn't that nice :)")
        // do something.
        this.doh_server.blargh()
        setTimeout(function () {
            //do RFC-compliance check FIRST to spare the DNS server...
            console.dir("email we want to lok at is: "+data.email)
            var last_at = data.email.lastIndexOf('@')
            var domain = data.email.substring(last_at+1) //need to remove the '@' itself, of course
            var username = data.email.substring(0,last_at)
            // console.log("domain is: "+domain)
            console.log("username is: "+username)
            this.doh_server.lookup('MX', domain, function (results) {
                if ( results.Answer && results.Answer.length > 0) {
                    // It's at least *got* an MX record, that's a good start.
                    success_func({data_status: 'GOOD'})
                } else {
                    // By RFC, if there is no MX record, we drop to A-record fallback
                    this.doh_server.lookup('A', domain, function (a_results) {
                        if ( a_results.Answer && a_results.Answer.length > 0) {
                            success_func({data_status: 'GOOD'})
                        } else {
                            success_func({data_status: 'BAD'})
                        }
                    })
                }
            })
        })
    }
}