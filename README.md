# core-stack

Create an object implementing:

* An event emitter ([Evemit](https://github.com/Nicolab/evemit), only 1 kb).
* A plugin system that handles the asynchronous loading.
* A stack handler.
* And some useful methods for handling a core and config object.

core-stack was implemented with performance and lightness in mind.

## Install

```sh
npm install core-stack
```

or with _Yarn_:

```sh
yarn add core-stack
```

## Usage

> See the [source code](https://github.com/Nicolab/core-stack/blob/master/src/index.js) for the JS doc.

### Create a core

```js
import CoreStack from 'core-stack';

// or const CoreStack = require('core-stack');
const core = new CoreStack();

// adds what do you need in the `core`...
core.foo = {};
core.bar = 'bar';

export default core;
// or module.exports = core;
```

### Plugins

#### Create a plugin

```js
/**
 * My plugin
 *
 * @param  {CoreStack}   core
 * @param  {*}           [args]
 * @param  {function}    done
 */
export default function myPlugin(core, args, done) {
  // add some feature to the core
  // ...

  // `done` function indicate that the plugin is loaded
  done(args);
};
```

#### Use a plugin

On the fly:

```js
core.use(plugin, pluginArgs, function(done /*, doneArgs */) {
  console.log('plugin loaded!');
  done(/* doneArgs */);
});
```

or a reusable plugin:

```js
import myPlugin from './plug/myPlugin';

core.use(myPlugin);
// or core.use(require('./plug/myPlugin'));
```

Example, create a simple _logger_ plugin (reusable):

```js
export default function loggerPlugin(core, args, done) {
  core.log = function() {
    console.log(...arguments);
  };

  core.logWarn = function() {
    console.warn(...arguments);
  };

  core.logError = function() {
    console.error(...arguments);
  };

  done();
};
```

Load and use the _logger_ plugin:

```js
import logger from './plug/logger';

// load the logger plugin
core.use(logger);

// use the logger plugin when the core was booted
core.boot(function() {
  core.log('Hello');
  core.logWarn('Warning!');
  core.logError('Ooops! An error occurred.');
})
```

### Full example

```js
import CoreStack from 'core-stack';

// Plugins
import logger from './plug/logger/';
import config from './plug/config/';
import router from './plug/router/';
import react from './plug/react/'; // or another lib / framework to initialize

const app = new CoreStack();

app
  .use(logger)
  .use(config)
  .use(router)
  .use(react)
  .boot(function() {
    app.log('all plugins are loaded');

    // you can emit any events with the builtin event emitter
    // see evemit package
    app.emit('app.booted');

    // init the routes and a router (e.g: routux package)
    router.init();
  })
;
```

## LICENSE

[MIT](https://github.com/Nicolab/core-stack/blob/master/LICENSE) (c) 2016, Nicolas Tallefourtane.


## Author

| [![Nicolas Tallefourtane - Nicolab.net](https://www.gravatar.com/avatar/d7dd0f4769f3aa48a3ecb308f0b457fc?s=64)](https://nicolab.net) |
|---|
| [Nicolas Talle](https://nicolab.net) |
