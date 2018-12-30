/**
 * This file is part of core-stack.
 *
 * (c) Nicolas Tallefourtane <dev@nicolab.net>
 *
 * For the full copyright and license information, please view the LICENSE file
 * distributed with this source code.
 */

'use strict';

let Evemit = require('evemit');

/**
 * @constructor
 */
function CoreStack(opt) {
  if (!opt) {
    opt = {};
  }

  Evemit.call(this);

  if (!opt.plugStackLabel) {
    opt.plugStackLabel = '_core.use';
  }

  this._coreOpt = opt;
  this._stacks = {};
}

CoreStack.prototype = Object.create(Evemit.prototype, {
  constructor: { value: CoreStack }
});

/**
 * Use a `plugin` and call it by passing `args`.
 *
 * @param {object|function} plugin Call `plugin.__plug` method (plugin)
 * or call `plugin` function (standalone).
 *
 * @param {*}               [args] Optional arguments passed to the plugin.
 * An object is preferable for the homogeneity.
 *
 * @param {function}        [done] Function called after that the plugin
 * is loaded.
 * If provided, this callback is responsible of the asynchronous flow.
 * The callback `done` receives another callback `done` (in first argument)
 * to continue to unstack the plugins stack.
 *
 * ```js
 * core.use(plugin, pluginArgs, function(done /*, doneArgs *\/) {
 *  console.log('plugin loaded!');
 *  done(/* doneArgs *\/);
 * });
 * ```
 *
 * @return {CoreStack} Returns the plugin return.
 * Must return the current instance of `CoreStack`.
 */
CoreStack.prototype.use = function use(plugin, args, done) {
  let _this = this;
  let label = this._coreOpt.plugStackLabel;
  let next = function() {
    let _done;
    let plug = plugin.__plug || plugin;
    let unstack = function() {
      _this.unstack(label, ...arguments);
    };

    if (done) {
      _done = function() {
        done(unstack, ...arguments);
      };
    } else {
      _done = unstack;
    }

    // call the plugin
    return plug(_this, args, _done);
  };

  // add in the stack
  this.stack(label, next);

  return this;
};

/**
 * Boot the core.
 * Load all plugins in the stack and call `done` (if provided).
 *
 * ```js
 *  core
 *    .use(pluginA)
 *    .use(pluginB)
 *    .boot(done)
 *  ;
 * ```
 *
 * @param {function} [done] Function called when all plugins
 * in the stack are loaded.
 *
 * @return {CoreStack} Current instance.
 */
CoreStack.prototype.boot = function boot(done) {
  this.stack(this._coreOpt.plugStackLabel, done);
  this.unstack(this._coreOpt.plugStackLabel);

  return this;
};

/**
 * Add `done` callback in the stack of `label`.
 *
 * @param  {string}   label       The stack label.
 * @param  {function} done        Callback.
 * @param  {*}        [context]   Context for function execution.
 *
 * @return {number} The new stack length.
 */
CoreStack.prototype.stack = function stack(label, done, context) {
  if (Array.isArray(this._stacks[label]) === false) {
    this._stacks[label] = [];
  }

  return this._stacks[label].push({done, context});
};

/**
 * Unstack the stack of `label`.
 *
 * @param  {string}   label       The stack label.
 * @param  {...*}     args        Arguments passed to the callback (`done`).
 *
 * @return {*}   The value returned by the callback or nothing.
 */
CoreStack.prototype.unstack = function unstack(label, ...args) {
  let entry, done, context;

  if (!this._stacks[label]) {
    return;
  }

  entry = this._stacks[label].shift();

  // avoid memory leak
  if (this._stacks[label].length === 0) {
    this._stacks[label] = null;
    delete this._stacks[label];
  }

  if (entry) {
    done = entry.done;
    context = entry.context;

    if (context) {
      return done.call(context, ...args);
    }

    return done(...args);
  }
};

/**
 * Merge `items` (recursive) in the core.
 *
 * @param  {object}   items Items to merge.
 * @param {...object} [items] Zero, one or several other objects.
 *
 * @return {object} The core.
 * @throws {TypeError} If `items` is not an `object`.
 */
CoreStack.prototype.merge = function merge(items) {
  if (typeof items === 'object') {
    return this.utils.mergeRecursive(this, ...arguments);
  }

  throw new TypeError(
    'Argument #1 passed to CoreStack.merge() must be an object'
  );
};

/**
 * Utilities
 * @type {Object}
 */
CoreStack.prototype.utils = {
  /**
   * Merge recursive.
   *
   * @param {object|array} obj       Object that receives the value of `from`
   * @param {...object|array} from   One or more objects to merge in `obj`.
   *
   * @return {Object} `obj` merged
   */
  mergeRecursive: function mergeRecursive(target/*, obj*/) {
    let ln = arguments.length;

    if (ln < 2) {
      throw new Error(
        'There should be at least 2 arguments passed to '
        + 'CoreStack.utils.mergeRecursive()'
      );
    }

    // start at `obj`
    for (let i = 1; i < ln; i++) {
      for (let p in arguments[i]) {
        if (target[p] && typeof target[p] === 'object') {
          target[p] = this.utils.mergeRecursive(target[p], arguments[i][p]);
        } else {
          target[p] = arguments[i][p];
        }
      }
    }

    return target;
  }
};

module.exports = CoreStack;
module.exports.default = CoreStack;
