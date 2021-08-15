/*! core-stack | MIT (c) 2016 Nicolas Tallefourtane - nicolab.net */ !function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports["core-stack"]=e():t["core-stack"]=e()}(this,(function(){return function(t){var e={};function r(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)r.d(o,n,function(e){return t[e]}.bind(null,n));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=0)}([function(t,e,r){"use strict";function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}var n=r(1);function s(t){t||(t={}),n.call(this),t.plugStackLabel||(t.plugStackLabel="_core.use"),this._coreOpt=t,this._stacks={}}s.prototype=Object.create(n.prototype,{constructor:{value:s}}),s.prototype.use=function(t,e,r){var o=this,n=this._coreOpt.plugStackLabel;return this.stack(n,(function(){var s=t.__plug||t,c=function(){o.unstack.apply(o,[n].concat(Array.prototype.slice.call(arguments)))};return s(o,e,r?function(){r.apply(void 0,[c].concat(Array.prototype.slice.call(arguments)))}:c)})),this},s.prototype.boot=function(t){return this.stack(this._coreOpt.plugStackLabel,t),this.unstack(this._coreOpt.plugStackLabel),this},s.prototype.stack=function(t,e,r){return!1===Array.isArray(this._stacks[t])&&(this._stacks[t]=[]),this._stacks[t].push({done:e,context:r})},s.prototype.unstack=function(t){var e,r,o;if(this._stacks[t]&&(e=this._stacks[t].shift(),0===this._stacks[t].length&&(this._stacks[t]=null,delete this._stacks[t]),e)){r=e.done,o=e.context;for(var n=arguments.length,s=new Array(n>1?n-1:0),c=1;c<n;c++)s[c-1]=arguments[c];var i;return o?(i=r).call.apply(i,[o].concat(s)):r.apply(void 0,s)}},s.prototype.merge=function(t){var e;if("object"===o(t))return(e=this.utils).mergeRecursive.apply(e,[this].concat(Array.prototype.slice.call(arguments)));throw new TypeError("Argument #1 passed to CoreStack.merge() must be an object")},s.prototype.utils={mergeRecursive:function(t){var e=arguments.length;if(e<2)throw new Error("There should be at least 2 arguments passed to CoreStack.utils.mergeRecursive()");for(var r=1;r<e;r++)for(var n in arguments[r])t[n]&&"object"===o(t[n])?t[n]=this.utils.mergeRecursive(t[n],arguments[r][n]):t[n]=arguments[r][n];return t}},t.exports=s,t.exports.default=s},function(t,e,r){!function(){"use strict";function e(){this.events={}}e.prototype.on=function(t,e,r){return this.events[t]||(this.events[t]=[]),r&&(e._E_ctx=r),this.events[t].push(e),this},e.prototype.once=function(t,e,r){return e._E_once=!0,this.on(t,e,r)},e.prototype.emit=function(t,e,r,o,n){var s,c,i,u;if(!this.events[t])return!1;u=(i=Array.prototype.slice.call(arguments,1)).length;for(var a=0,l=(c=this.events[t]).length;a<l;a++)switch((s=c[a])._E_once&&this.off(t,s),u){case 0:s.call(s._E_ctx);break;case 1:s.call(s._E_ctx,e);break;case 2:s.call(s._E_ctx,e,r);break;case 3:s.call(s._E_ctx,e,r,o);break;case 4:s.call(s._E_ctx,e,r,o,n);break;default:s.apply(s._E_ctx,i)}return!0},e.prototype.off=function(t,e){if(!this.events[t])return this;for(var r=0,o=this.events[t].length;r<o;r++)this.events[t][r]===e&&(this.events[t][r]=null,delete this.events[t][r]);return this.events[t]=this.events[t].filter((function(t){return void 0!==t})),this},e.prototype.listeners=function(t){var e,r;if(t)return this.events[t]||[];for(var o in r=[],e=this.events)r=r.concat(e[o].valueOf());return r},t.exports?t.exports=e:window.Evemit=e}()}])}));
