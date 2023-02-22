# How to Use

In your HTML, add:

```html
<script src='https://cdn.goodforms.com/verify.js'></script>
```

Then run, near the bottom of your page:

```js
Goodforms('form_key')
```

Or, instead of running that at the bottom of the page, you can instead run it in a DOM-ready block. For example, in JQuery, it would look like: 
```js
$(function() {Goodforms('form_key');}))
```

And it should try to attach to any field in your page with a _name_ of `email`, or of type `email`, or an `id` of `email`.

It will show a pop-up, or not, based on whatever it is you do or whatever

~~Verifications should fire when a user tabs-off of an email field, or tries to submit it. By default, those verification messages will be
set to the element's status using HTML5 Constraint Validation - e.g. using setCustomValidity(). Additionally, the verification message will
be set on the data-goodforms-status attribute in the email input field.~~

Form submission will be prevented until the email field is marked as Valid.

## How to use from Require.JS (AMD)

```js
require(['https://cdn.goodforms.com/verify.js'], function(Goodforms) {
    Goodforms('form_key', {debug: true}) //use as normal
});
```

## How to use as a Common.JS module

Download the Verification Javascript from https://cdn.goodforms.com/verify.js , rename it to Goodforms, and then:

```js
var Goodforms = require('./Goodforms')
```

## Debugging

```js
Goodforms('form_key', {debug: true})
```

# Being more specific

You still need, somewhere in your page:

```html
<script src='https://cdn.goodforms.com/verify.js'></script>
```

At some point after your form is loaded, you can specifically attach to it by using:

```js
Goodforms('form_key', {
    email_field: document.getElementById('my_email_field'), //you can also send a jQuery-like object - $('#my_email_field') - or just an ID of an element - 'my_email_field'
    form: document.getElementById('my_form'), //usually can be guessed from the email_field, above - but if it can't...
    submit_button: document.getElementById('my_submit_button') 
    //can also be an array of buttons, or array of strings, or a jQuery-like selector of multiple objects, or 'false' if you don't want to disable submit buttons
});
```

The clause may be used repeatedly to attach to multiple different forms.

# Controlling Verification Behavior

You can set particular callbacks to modify verification behavior or override it.

```js
Goodforms('form_key', {
    onGood: function (callback) {},
    onBad: function (callback) {},
    onChallenge: function (callback) {},
    onError: function (callback) {}
})
```

If your functions returns `false`, the default behavior of the form will be overridden, and will not fire. If your function returns `true`, then the default behavior of the form *will* fire. If you return no parameter at all (or `null`, or `undefined`), then you must invoke the given `callback` function with `true` or `false` once you have determined whether you want to allow the default behavior or not. If the `callback` doesn't fire within the predefined timeout, an error will fire. If you have defined your handler function with no `(callback)` parameter, then returning anything other than `true` or `false` is an error.

## Using Promises (optional)

If you wish to use promises in your code, do this - 

```js
Goodforms('form_key', {
    onWhatever: function (something,callback) {
        your.stream.of.promises.then(function () {
            //your code here
        }).then(function (resolved_value) {
            callback(resolved_value);
        }).else(function (err) {
            callback(false);
        })
    }
})
```

# Using Goodforms programmatically

```js
var my_verifier = Goodforms('form_key', {manual: true});
my_verifier.verify("some_email@some_domain",function (results) {
    console.log("Results are: "+results)
})

my_verifier.challenge("some_email@some_domain", challenge, function (results) {
    console.log("Results are: "+results)
})

my_verifier.response("some_email@some_domain", pin, function (results) {
    console.log("Results are: "+results)
})
```

# REFERENCE

## Auto-Mode (easier)
```js
Goodforms('form_key');
```
Will automatically find all forms on your page that have an email element, and attempt to verify them. Email elements are:

- an `<input>` with a `type="email"` (Warning: IE does not support this!)
- an `<input>` with a `name="email"`
- an `<input>` with an `id="email"`

The associated form, will have any and all submit buttons disabled until the email field is marked as valid. Submit buttons are:

- an `<input>` with a `type="submit"`
- a `<button>` with a `type` that is *not* `"button"` nor `"reset"`

The result of the above function will be an array of Goodforms objects (as explained in the section below)

If you do not want all forms on your page to be treated this way, or the script cannot find your form or submit button or email field, 
you need to use the more explicit instantiation, in the section below.

Once the email is considered 'valid', the form will be submitted normally with two additional fields - 

`goodforms_checksum` will be set to a string with the verification checksum.
`goodforms_status` will be set to the extended 'status' of the email - `valid`, `unknown`, or `catchall`. It is not possible to
submit an `invalid` email address (that's kinda the point).

You can inspect the checksum to determine whether or not the email was legitimately verified by using the certify API - details in PROTOCOL.md

## Explicit Mode

```js
var my_verifier = Goodforms('form_key', {
    email_field: document.getElementById('your_email_dom_element'), 
    form: document.getElementById('your form element'),
    submit_button: document.getElementById('your_submit_button'), // you may also pass an ARRAY of submit buttons instead
    debug: true, //defaults to false, adds additional debugging output to javascript console
    onGood: function () {},
    onBad: function () {},
    onChallenge: function () {},
    onError: function () {},
    manual: true, //if set, NONE of the standard behavior will ever be invoked. Verification can only be invoked manually. See below.
    css: false, // FIXME - not yet implemented (and not sure if we should!)
})
```
Please note that in order to attach to multiple forms, the function must be invoked once per email address field.

If you do not wish for your submit buttons to be affected, you may set `submit_button` to `false`

The callback functions will fire *before* the default behaviors of the script are invoked.

If the script doesn't *EXPLICITLY* `return` at all, or just uses a bare `return` with no return value, you will get the default **visuals** and the default **behavior**

If the script returns *EXACTLY* `true`, those behaviors will still fire normally, but you have to do your visuals yourself. It must not return `1` or anything else that may evaluate to true in Javascript; it needs to explicitly be `true`.

If the script returns `false`, those behaviors will be cancelled, and there will be no default visuals (of course). It must not return `0` or `""` or `null` or anything else; it needs to be explicitly `false`.

If the script instead returns a function, that function will be invoked with a callback as its first parameter. When that function fires the callback, the normal behaviors
will be triggered at that time, based on return values?!?!?!. ~~To prevent those behaviors, simply do not execute the callback.~~ An example might be:

```js
{
    onGood: function () {
        return function (callback) {
            //do something that takes a while, but eventually.....
            return callback(); // default behavior, default visuals
            // or
            return callback(true); //user-handled visuals, default behavior
            // or 
            return callback(false); //user-handled visuals, canceled behavior
        }
    }
}

Any other returned types from the functions will be considered an error.


### Summary of on{Good,Bad,Challenge} handlers:

 - | Default Behavior | Cancel Defaults |
---|--------------|-----------|
Default visuals |  `return` | NOT SUPPORTED (use manual mode) |
User-handled visuals |  `return true` | `return false`

## Custom styles

FIXME - document CSS overrides you can put in!

## Manual Mode
```js
var my_verifier = Goodforms('form_key', {
    manual: true,
    debug: true, //defaults to false, adds additional debugging output to javascript console
})
```

### Verification
```js
my_verifier.verify(address, callback (results) {

})
```

## Event Flow

if you set an onSubmit handler in the form, that will fire *first*, before any GoodForms handlers fire. If your handler returns `false`, the GoodForms
handlers will not be invoked.

If you set an onGood, onBad, etc. handler, those will be fired *before* the GoodForms handlers fire. If your handler returns `false`, the GoodForms
handlers will not be invoked. If you need to do something asynchronously, return a `function()` instead, and that function will be passed a callback to the normal
GoodForms handling code. If your asynchronous callback is succesful, invoke the callback we passed you. If it is not, simply don't call the callback at all.

If you invoke a raw `.verify(address, callback)` call, that callback will fire *after* the onGood, onBad, etc. handlers have fired. If you want to interrupt those handlers'
actions, you should instead attach callbacks to onGood, onBad, etc.