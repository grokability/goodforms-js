
// import resolver from "./resolver"

import xhr from './xhr';

export default class DnsValidator {

    constructor(doh_server,timeout) {
        this.doh_server = doh_server
        this.timeout = timeout
    }

    verify(data, completion_func) {
        // TODO: do RFC-compliance check FIRST to spare the DNS server...
        let last_at = data.email.lastIndexOf('@')
        let domain = data.email.substring(last_at+1) //need to remove the '@' itself, of course
        let dns_lookup = this.doh_server+"?name="+encodeURIComponent(domain)
        let timeout = this.timeout //needed because the timeout gets consumed in other, temporary functions without 'this'
        // let username = data.email.substring(0,last_at) // - unused
        xhr(dns_lookup+"&type=MX",{},function (results) {
            if ( !results && error ) { //FIXME - 'error'?
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
                xhr(dns_lookup+"&type=A",{}, function (a_results, a_error) {
                    if ( !a_results && a_error) { // SyntaxError, actually :/ (as above?)
                        completion_func({status: 'ERROR', message: String(a_error)}) // this is copypasta from above. Don't like.
                        return
                    }
                    if ( a_results.Answer && a_results.Answer.length > 0) {
                        completion_func({status: 'GOOD'})
                    } else {
                        completion_func({status: 'BAD', message: "Invalid Domain"}) //TODO - how to translate this?
                    }
                },timeout, 'GET', 'application/dns-json')
            }
        },timeout,'GET','application/dns-json')
    }
}