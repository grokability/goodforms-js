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

    log_at_level(level,msg) {
        if(console && console[level]) {
            console[level](msg)
            return true
        }
        return false
    }
}

var log = new Log()


export default log

//debug,info,warn,error