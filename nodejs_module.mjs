
//var Goodforms = require('./prod-verify.js')
//var Goodforms = require('./index.js'); //kinda works, but throws some errors.

import GF2 from './dist/dev-verify.js';
console.log("Ehllo!");

try {
    GF2();
} catch {
    console.log("Exception caught?")
}
var gv2 = GF2({manual: true})
console.log("Hi there");

console.dir(gv2)

gv2.verify("uberbrady@gmail.com",function (results) {
    console.log("We got the callback!")
    console.dir(results)
})