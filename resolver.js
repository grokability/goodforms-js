

export default class Resolver {
    constructor(doh_server) {
        this.doh_server = doh_server
    }

    lookup(type, name, callback) {
        const req = new XMLHttpRequest();
        req.open("GET", this.doh_server+"?name="+encodeURIComponent(name)+"&type="+encodeURIComponent(type),true);
        req.setRequestHeader('accept', 'application/dns-json')
        req.addEventListener('load', function (event) {
            try {
                var results = JSON.parse(req.responseText)
            } catch (error) {
                callback(null, error) // TODO: this might work better as 'Promises'
                return
            }
            callback(results, null)
        })
        req.addEventListener('error',function (event) {
            callback(null, new Error('DNS Error'))
        })
        req.send()
    }

}