# Normal Event Flow

Typically `onChange` will fire when the browser detects that a field changed.

If any `onChange` handlers were set _before_ the GoodForms initializers run, they will be held on to, and invoked later.

The onchange_handler will fire first.

The primary method invoked will be this.verify().

That method, when invoked, will fire the appropriate callbacks based on the results - 

status GOOD, status BAD, status CHALLENGE

Any of those will "fire hooks".

The first thing that happens, is that if `manual: true` was set during initialization, the function returns and aborts the rest of the event processing stream. `FIXME` - should we do this? (Especially hurts for Challenge)

Then any onChallenge, onGood, onBad callbacks that may have been defined with the initial `GoodForms()` call are invoked.

If the results are exactly `true` (compared using `===`, so `1` will not be treated the same), then the default behavior will still fire. If they are `false` they will not.

If, however, your callback returns a function, then that function will be invoked, with a callback. If your function eventually wants the 'positive' result to fire, it should invoke the callback. otherwise, it ought not to (I guess?). `// FIXME` - should the callback with true/false?

`//FIXME` - if you're doing _manual_ verification, should we short-circuit the default behavior? Should we instead do `form: false` or something? I want the `onChallenge` to still fire, for example, on the thing I'm working on for jqueryvalidation.