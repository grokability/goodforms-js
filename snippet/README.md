# How to Use

In your HTML, add:

```html
<script src='https://cdn.goodverification.com/goodblah.js'></script>
```

Then run, near the bottom of your page:

```js
Goodverification('form_key')
```

Or, instead of running that at the bottom of the page, you can instead run it in a DOM-ready block. For example, in JQuery, it would look like: 
```js
$(function() {Goodverification('form_key');}))
```

And it should try to attach to any field in your page with a _name_ of `email`, or of type `email`, or an `id` of `email`.

## How to use in AMD or CJS (Require.JS or Common.js)

```js
var Goodverification = require("I don't know I need to test this") // FIXME

Goodverification('form_key')
```

## Debugging

```js
Goodverification('form_key', {debug: true})
```

# Being more specific

You still need, somewhere in your page:

```html
<script src='https://cdn.goodverification.com/goodblah.js'></script>
```

At some point after your form is loaded, you can specifically attach to it by using:

```js
Goodverification('form_key', {
    email_field: document.getElementById('my_email_field'),
    form: document.getElementById('my_form'), //usually can be guessed from the email_field, above - but if it can't...
    submit_button: document.getElementById('my_submit_button')
});
```

The clause may be used repeatedly to attach to multiple different forms.

# Controlling Verification Behavior

You can set particular callbacks to modify verification behavior or override it.

```js
Goodverification('form_key', {
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
Goodverification({
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

# Using Goodverification programmatically

```js
var my_verifier = Goodverification('form_key', {manual: true});
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