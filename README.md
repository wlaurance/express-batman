express-batman
==============

na na na na nanan nananan nananan na batman for expressjs

[![Build Status](https://travis-ci.org/wlaurance/express-batman.png?branch=master)](https://travis-ci.org/wlaurance/express-batman)

How to signal express-batman?
-----------------------------

```
npm install express-batman
```


What crime does it fight?
-------------------------

Ugly express route trickery


How so?
-------

```js
var expressBatman = require('express-batman');
...
app.use(expressBatman());
```

Sane defaults, no jokers allowed
--------------------------------

Expects a typical [batman directory structure](http://batmanjs.org/docs/structure.html)

Defaults to `process.cwd() + /batcave` for base of the batman app.

If app is written in [coffee-script](http://coffeescript.org/), coffee is compiled.

Responds to NODE_ENV=production, if yes, source is minified.

If `expressBatman({browserify:true})` the app is browserified. This means you can write modular things.
None of that two-faced requirejs crap.

![bat signal](http://upload.wikimedia.org/wikipedia/en/c/c6/Bat-signal_1989_film.jpg)

License
-------

MIT
