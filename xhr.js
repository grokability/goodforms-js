import log from "./logging"

export default function xhr(url,data,complete,timeout,method = "POST",accept = "application/json") {
    let req = null
    if(typeof XMLHttpRequest !== "undefined") {
        req = new XMLHttpRequest()
    } else if(window.ActiveXObject) {
        log.verbose("trying old-school way");
        try {
            req = new ActiveXObject("Msxml2.XMLHTTP")
        } catch (e) {
            log.verbose("trying the other weird old way?")
            try {
                req = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {
                //silently 'eat' error
                log.error("no XMLHttpRequest available...");
            }
        }
        log.verbose("Setting timeouts");
        if(typeof req.setTimeouts !== "undefined") {
            log.verbose("Setting timeotus for really reals!")
            req.setTimeouts(timeout,timeout,timeout,timeout)
        } else {
            log.verbose("No timeouts we can set :(")
        }
        log.verbose("Timeouts set!");
        // log.verbose("URL we're going to try to set is: "+window.location.href)
        // req.setRequestHeader("origin",window.location.href)

        req.onreadystatechange = () => {
            if(req.readyState == 4) {
                log.verbose("Ready state is up!")
                log.verbose("Actual state of the thing is: "+req.status)
                log.verbose("Status text? "+req.statusText)
                let raw_results = req.responseText
                log.verbose("Response text?"+raw_results)
                try {
                    var results = JSON.parse(raw_results)
                    log.verbose("Parsed Result: "+results)
                } catch (error) {
                    log.verbose("Actual text: "+req.responseText)
                    complete({status: "ERROR", message: "Invalid JSON response"})
                    return
                }
                complete(results)
            }
        }
    }
    req.open(method, url,true)
    req.setRequestHeader('accept', accept)
    req.setRequestHeader('content-type','application/json')
    if(typeof req.timeout !== "undefined") {
        req.timeout = timeout
    }

    if(typeof req.addEventListener !== "undefined") {
        req.addEventListener('error',function (event) {
            complete({status: "ERROR", message: "Server Error"})
        })
        req.addEventListener('timeout', function () {
            complete({status: "ERROR", message: "Timeout"})
        })
        req.addEventListener('abort',function () {
            complete({status: "ERROR", message: "Aborted"})
        })

        req.addEventListener('load', function (event) {
            try {
                var results = JSON.parse(req.responseText)
            } catch (error) {
                complete({status: "ERROR", message: "Invalid JSON response"})
                return
            }
            complete(results)
        })
    }
    log.verbose("Stringified data is: "+JSON.stringify(data))
    req.send(JSON.stringify(data))
}