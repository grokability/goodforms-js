export function duplicate (obj) {
    //naive, single-level, non-deep 'duplicate' function for objects
    let newobj={}
    for(let i in obj) {
        newobj[i] = obj[i]
    }
    return newobj
}

export function is_array(obj) {
    // console.warn("The prototype thing is: "+Object.prototype.toString.call(obj))
    if(Object.prototype.toString.call(obj) == "[object Array]") {
        return true
    }
    return false
}

export function is_function(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'
}