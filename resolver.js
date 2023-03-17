

export default class Resolver {
    constructor(doh_server) {
        this.doh_server = doh_server
    }

    blargh() {
        console.warn("Hey, resolver loaded at least. Here's my server: "+this.doh_server)
    }

    lookup(type, name, callback) {
        const req = new XMLHttpRequest();
        // req.addEventListener("load", reqListener);
        req.open("GET", this.doh_server+"?name="+encodeURIComponent(name)+"&type="+encodeURIComponent(type),true);
        req.setRequestHeader('accept', 'application/dns-json')
        req.addEventListener("loadend", function (event) {
            console.warn("Load has ended! Here's the event: ")
            console.dir(event)
            console.warn("Here is the responseText:")
            let results = JSON.parse(req.responseText)
            console.dir(results)
            callback(results)
        })
        req.send()
    }

}