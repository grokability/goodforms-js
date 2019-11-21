class Log {
    constructor(debug_enabled = false) {
        this.debug_enabled = debug_enabled
    }

    error(msg) {
        if(!this.log_at_level('error',msg)) {
            window.alert("Error: "+msg)
        }
    }

    debug(msg) {
        if(this.debug_enabled) {
            this.log_at_level('debug',msg)
        }
    }

    debugdir(msg) {
        if(this.debug_enabled) {
            if(typeof console !== "undefined" && console["dir"]) {
                this.log_at_level('dir',msg)
            } else {
                this.log_at_level('debug',msg)
            }
        }
    }

    log_at_level(level,msg) {
        if(typeof console !== "undefined" && console[level]) {
            console[level](msg)
            return true
        }
        window.alert(level+": "+msg)
        return false
    }
}

var log = new Log()


export default log

//debug,info,warn,error