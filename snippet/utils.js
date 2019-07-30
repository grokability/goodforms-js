export function duplicate (obj) {
    //naive, single-level, non-deep 'duplicate' function for objects
    let newobj={}
    for(let i in obj) {
        newobj[i]=obj[i]
    }
    return newobj
}