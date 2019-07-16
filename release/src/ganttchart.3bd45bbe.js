// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"MpUJ":[function(require,module,exports) {
var global = arguments[3];
/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
"use strict";var e=Object.freeze({});function t(e){return null==e}function n(e){return null!=e}function r(e){return!0===e}function i(e){return"string"==typeof e||"number"==typeof e||"symbol"==typeof e||"boolean"==typeof e}function o(e){return null!==e&&"object"==typeof e}var a=Object.prototype.toString;function s(e){return"[object Object]"===a.call(e)}function c(e){var t=parseFloat(String(e));return t>=0&&Math.floor(t)===t&&isFinite(e)}function u(e){return n(e)&&"function"==typeof e.then&&"function"==typeof e.catch}function l(e){return null==e?"":Array.isArray(e)||s(e)&&e.toString===a?JSON.stringify(e,null,2):String(e)}function f(e){var t=parseFloat(e);return isNaN(t)?e:t}function p(e,t){for(var n=Object.create(null),r=e.split(","),i=0;i<r.length;i++)n[r[i]]=!0;return t?function(e){return n[e.toLowerCase()]}:function(e){return n[e]}}var d=p("slot,component",!0),v=p("key,ref,slot,slot-scope,is");function h(e,t){if(e.length){var n=e.indexOf(t);if(n>-1)return e.splice(n,1)}}var m=Object.prototype.hasOwnProperty;function y(e,t){return m.call(e,t)}function g(e){var t=Object.create(null);return function(n){return t[n]||(t[n]=e(n))}}var _=/-(\w)/g,b=g(function(e){return e.replace(_,function(e,t){return t?t.toUpperCase():""})}),$=g(function(e){return e.charAt(0).toUpperCase()+e.slice(1)}),w=/\B([A-Z])/g,C=g(function(e){return e.replace(w,"-$1").toLowerCase()});var x=Function.prototype.bind?function(e,t){return e.bind(t)}:function(e,t){function n(n){var r=arguments.length;return r?r>1?e.apply(t,arguments):e.call(t,n):e.call(t)}return n._length=e.length,n};function k(e,t){t=t||0;for(var n=e.length-t,r=new Array(n);n--;)r[n]=e[n+t];return r}function A(e,t){for(var n in t)e[n]=t[n];return e}function O(e){for(var t={},n=0;n<e.length;n++)e[n]&&A(t,e[n]);return t}function S(e,t,n){}var T=function(e,t,n){return!1},E=function(e){return e};function N(e,t){if(e===t)return!0;var n=o(e),r=o(t);if(!n||!r)return!n&&!r&&String(e)===String(t);try{var i=Array.isArray(e),a=Array.isArray(t);if(i&&a)return e.length===t.length&&e.every(function(e,n){return N(e,t[n])});if(e instanceof Date&&t instanceof Date)return e.getTime()===t.getTime();if(i||a)return!1;var s=Object.keys(e),c=Object.keys(t);return s.length===c.length&&s.every(function(n){return N(e[n],t[n])})}catch(e){return!1}}function j(e,t){for(var n=0;n<e.length;n++)if(N(e[n],t))return n;return-1}function D(e){var t=!1;return function(){t||(t=!0,e.apply(this,arguments))}}var L="data-server-rendered",M=["component","directive","filter"],I=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured","serverPrefetch"],F={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:T,isReservedAttr:T,isUnknownElement:T,getTagNamespace:S,parsePlatformTagName:E,mustUseProp:T,async:!0,_lifecycleHooks:I},P=/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;function R(e,t,n,r){Object.defineProperty(e,t,{value:n,enumerable:!!r,writable:!0,configurable:!0})}var H=new RegExp("[^"+P.source+".$_\\d]");var B,U="__proto__"in{},z="undefined"!=typeof window,V="undefined"!=typeof WXEnvironment&&!!WXEnvironment.platform,K=V&&WXEnvironment.platform.toLowerCase(),J=z&&window.navigator.userAgent.toLowerCase(),q=J&&/msie|trident/.test(J),W=J&&J.indexOf("msie 9.0")>0,Z=J&&J.indexOf("edge/")>0,G=(J&&J.indexOf("android"),J&&/iphone|ipad|ipod|ios/.test(J)||"ios"===K),X=(J&&/chrome\/\d+/.test(J),J&&/phantomjs/.test(J),J&&J.match(/firefox\/(\d+)/)),Y={}.watch,Q=!1;if(z)try{var ee={};Object.defineProperty(ee,"passive",{get:function(){Q=!0}}),window.addEventListener("test-passive",null,ee)}catch(e){}var te=function(){return void 0===B&&(B=!z&&!V&&"undefined"!=typeof global&&(global.process&&"server"===global.process.env.VUE_ENV)),B},ne=z&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function re(e){return"function"==typeof e&&/native code/.test(e.toString())}var ie,oe="undefined"!=typeof Symbol&&re(Symbol)&&"undefined"!=typeof Reflect&&re(Reflect.ownKeys);ie="undefined"!=typeof Set&&re(Set)?Set:function(){function e(){this.set=Object.create(null)}return e.prototype.has=function(e){return!0===this.set[e]},e.prototype.add=function(e){this.set[e]=!0},e.prototype.clear=function(){this.set=Object.create(null)},e}();var ae=S,se=0,ce=function(){this.id=se++,this.subs=[]};ce.prototype.addSub=function(e){this.subs.push(e)},ce.prototype.removeSub=function(e){h(this.subs,e)},ce.prototype.depend=function(){ce.target&&ce.target.addDep(this)},ce.prototype.notify=function(){for(var e=this.subs.slice(),t=0,n=e.length;t<n;t++)e[t].update()},ce.target=null;var ue=[];function le(e){ue.push(e),ce.target=e}function fe(){ue.pop(),ce.target=ue[ue.length-1]}var pe=function(e,t,n,r,i,o,a,s){this.tag=e,this.data=t,this.children=n,this.text=r,this.elm=i,this.ns=void 0,this.context=o,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=t&&t.key,this.componentOptions=a,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=s,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1},de={child:{configurable:!0}};de.child.get=function(){return this.componentInstance},Object.defineProperties(pe.prototype,de);var ve=function(e){void 0===e&&(e="");var t=new pe;return t.text=e,t.isComment=!0,t};function he(e){return new pe(void 0,void 0,void 0,String(e))}function me(e){var t=new pe(e.tag,e.data,e.children&&e.children.slice(),e.text,e.elm,e.context,e.componentOptions,e.asyncFactory);return t.ns=e.ns,t.isStatic=e.isStatic,t.key=e.key,t.isComment=e.isComment,t.fnContext=e.fnContext,t.fnOptions=e.fnOptions,t.fnScopeId=e.fnScopeId,t.asyncMeta=e.asyncMeta,t.isCloned=!0,t}var ye=Array.prototype,ge=Object.create(ye);["push","pop","shift","unshift","splice","sort","reverse"].forEach(function(e){var t=ye[e];R(ge,e,function(){for(var n=[],r=arguments.length;r--;)n[r]=arguments[r];var i,o=t.apply(this,n),a=this.__ob__;switch(e){case"push":case"unshift":i=n;break;case"splice":i=n.slice(2)}return i&&a.observeArray(i),a.dep.notify(),o})});var _e=Object.getOwnPropertyNames(ge),be=!0;function $e(e){be=e}var we=function(e){var t;this.value=e,this.dep=new ce,this.vmCount=0,R(e,"__ob__",this),Array.isArray(e)?(U?(t=ge,e.__proto__=t):function(e,t,n){for(var r=0,i=n.length;r<i;r++){var o=n[r];R(e,o,t[o])}}(e,ge,_e),this.observeArray(e)):this.walk(e)};function Ce(e,t){var n;if(o(e)&&!(e instanceof pe))return y(e,"__ob__")&&e.__ob__ instanceof we?n=e.__ob__:be&&!te()&&(Array.isArray(e)||s(e))&&Object.isExtensible(e)&&!e._isVue&&(n=new we(e)),t&&n&&n.vmCount++,n}function xe(e,t,n,r,i){var o=new ce,a=Object.getOwnPropertyDescriptor(e,t);if(!a||!1!==a.configurable){var s=a&&a.get,c=a&&a.set;s&&!c||2!==arguments.length||(n=e[t]);var u=!i&&Ce(n);Object.defineProperty(e,t,{enumerable:!0,configurable:!0,get:function(){var t=s?s.call(e):n;return ce.target&&(o.depend(),u&&(u.dep.depend(),Array.isArray(t)&&function e(t){for(var n=void 0,r=0,i=t.length;r<i;r++)(n=t[r])&&n.__ob__&&n.__ob__.dep.depend(),Array.isArray(n)&&e(n)}(t))),t},set:function(t){var r=s?s.call(e):n;t===r||t!=t&&r!=r||s&&!c||(c?c.call(e,t):n=t,u=!i&&Ce(t),o.notify())}})}}function ke(e,t,n){if(Array.isArray(e)&&c(t))return e.length=Math.max(e.length,t),e.splice(t,1,n),n;if(t in e&&!(t in Object.prototype))return e[t]=n,n;var r=e.__ob__;return e._isVue||r&&r.vmCount?n:r?(xe(r.value,t,n),r.dep.notify(),n):(e[t]=n,n)}function Ae(e,t){if(Array.isArray(e)&&c(t))e.splice(t,1);else{var n=e.__ob__;e._isVue||n&&n.vmCount||y(e,t)&&(delete e[t],n&&n.dep.notify())}}we.prototype.walk=function(e){for(var t=Object.keys(e),n=0;n<t.length;n++)xe(e,t[n])},we.prototype.observeArray=function(e){for(var t=0,n=e.length;t<n;t++)Ce(e[t])};var Oe=F.optionMergeStrategies;function Se(e,t){if(!t)return e;for(var n,r,i,o=oe?Reflect.ownKeys(t):Object.keys(t),a=0;a<o.length;a++)"__ob__"!==(n=o[a])&&(r=e[n],i=t[n],y(e,n)?r!==i&&s(r)&&s(i)&&Se(r,i):ke(e,n,i));return e}function Te(e,t,n){return n?function(){var r="function"==typeof t?t.call(n,n):t,i="function"==typeof e?e.call(n,n):e;return r?Se(r,i):i}:t?e?function(){return Se("function"==typeof t?t.call(this,this):t,"function"==typeof e?e.call(this,this):e)}:t:e}function Ee(e,t){var n=t?e?e.concat(t):Array.isArray(t)?t:[t]:e;return n?function(e){for(var t=[],n=0;n<e.length;n++)-1===t.indexOf(e[n])&&t.push(e[n]);return t}(n):n}function Ne(e,t,n,r){var i=Object.create(e||null);return t?A(i,t):i}Oe.data=function(e,t,n){return n?Te(e,t,n):t&&"function"!=typeof t?e:Te(e,t)},I.forEach(function(e){Oe[e]=Ee}),M.forEach(function(e){Oe[e+"s"]=Ne}),Oe.watch=function(e,t,n,r){if(e===Y&&(e=void 0),t===Y&&(t=void 0),!t)return Object.create(e||null);if(!e)return t;var i={};for(var o in A(i,e),t){var a=i[o],s=t[o];a&&!Array.isArray(a)&&(a=[a]),i[o]=a?a.concat(s):Array.isArray(s)?s:[s]}return i},Oe.props=Oe.methods=Oe.inject=Oe.computed=function(e,t,n,r){if(!e)return t;var i=Object.create(null);return A(i,e),t&&A(i,t),i},Oe.provide=Te;var je=function(e,t){return void 0===t?e:t};function De(e,t,n){if("function"==typeof t&&(t=t.options),function(e,t){var n=e.props;if(n){var r,i,o={};if(Array.isArray(n))for(r=n.length;r--;)"string"==typeof(i=n[r])&&(o[b(i)]={type:null});else if(s(n))for(var a in n)i=n[a],o[b(a)]=s(i)?i:{type:i};e.props=o}}(t),function(e,t){var n=e.inject;if(n){var r=e.inject={};if(Array.isArray(n))for(var i=0;i<n.length;i++)r[n[i]]={from:n[i]};else if(s(n))for(var o in n){var a=n[o];r[o]=s(a)?A({from:o},a):{from:a}}}}(t),function(e){var t=e.directives;if(t)for(var n in t){var r=t[n];"function"==typeof r&&(t[n]={bind:r,update:r})}}(t),!t._base&&(t.extends&&(e=De(e,t.extends,n)),t.mixins))for(var r=0,i=t.mixins.length;r<i;r++)e=De(e,t.mixins[r],n);var o,a={};for(o in e)c(o);for(o in t)y(e,o)||c(o);function c(r){var i=Oe[r]||je;a[r]=i(e[r],t[r],n,r)}return a}function Le(e,t,n,r){if("string"==typeof n){var i=e[t];if(y(i,n))return i[n];var o=b(n);if(y(i,o))return i[o];var a=$(o);return y(i,a)?i[a]:i[n]||i[o]||i[a]}}function Me(e,t,n,r){var i=t[e],o=!y(n,e),a=n[e],s=Pe(Boolean,i.type);if(s>-1)if(o&&!y(i,"default"))a=!1;else if(""===a||a===C(e)){var c=Pe(String,i.type);(c<0||s<c)&&(a=!0)}if(void 0===a){a=function(e,t,n){if(!y(t,"default"))return;var r=t.default;if(e&&e.$options.propsData&&void 0===e.$options.propsData[n]&&void 0!==e._props[n])return e._props[n];return"function"==typeof r&&"Function"!==Ie(t.type)?r.call(e):r}(r,i,e);var u=be;$e(!0),Ce(a),$e(u)}return a}function Ie(e){var t=e&&e.toString().match(/^\s*function (\w+)/);return t?t[1]:""}function Fe(e,t){return Ie(e)===Ie(t)}function Pe(e,t){if(!Array.isArray(t))return Fe(t,e)?0:-1;for(var n=0,r=t.length;n<r;n++)if(Fe(t[n],e))return n;return-1}function Re(e,t,n){le();try{if(t)for(var r=t;r=r.$parent;){var i=r.$options.errorCaptured;if(i)for(var o=0;o<i.length;o++)try{if(!1===i[o].call(r,e,t,n))return}catch(e){Be(e,r,"errorCaptured hook")}}Be(e,t,n)}finally{fe()}}function He(e,t,n,r,i){var o;try{(o=n?e.apply(t,n):e.call(t))&&!o._isVue&&u(o)&&!o._handled&&(o.catch(function(e){return Re(e,r,i+" (Promise/async)")}),o._handled=!0)}catch(e){Re(e,r,i)}return o}function Be(e,t,n){if(F.errorHandler)try{return F.errorHandler.call(null,e,t,n)}catch(t){t!==e&&Ue(t,null,"config.errorHandler")}Ue(e,t,n)}function Ue(e,t,n){if(!z&&!V||"undefined"==typeof console)throw e;console.error(e)}var ze,Ve=!1,Ke=[],Je=!1;function qe(){Je=!1;var e=Ke.slice(0);Ke.length=0;for(var t=0;t<e.length;t++)e[t]()}if("undefined"!=typeof Promise&&re(Promise)){var We=Promise.resolve();ze=function(){We.then(qe),G&&setTimeout(S)},Ve=!0}else if(q||"undefined"==typeof MutationObserver||!re(MutationObserver)&&"[object MutationObserverConstructor]"!==MutationObserver.toString())ze="undefined"!=typeof setImmediate&&re(setImmediate)?function(){setImmediate(qe)}:function(){setTimeout(qe,0)};else{var Ze=1,Ge=new MutationObserver(qe),Xe=document.createTextNode(String(Ze));Ge.observe(Xe,{characterData:!0}),ze=function(){Ze=(Ze+1)%2,Xe.data=String(Ze)},Ve=!0}function Ye(e,t){var n;if(Ke.push(function(){if(e)try{e.call(t)}catch(e){Re(e,t,"nextTick")}else n&&n(t)}),Je||(Je=!0,ze()),!e&&"undefined"!=typeof Promise)return new Promise(function(e){n=e})}var Qe=new ie;function et(e){!function e(t,n){var r,i;var a=Array.isArray(t);if(!a&&!o(t)||Object.isFrozen(t)||t instanceof pe)return;if(t.__ob__){var s=t.__ob__.dep.id;if(n.has(s))return;n.add(s)}if(a)for(r=t.length;r--;)e(t[r],n);else for(i=Object.keys(t),r=i.length;r--;)e(t[i[r]],n)}(e,Qe),Qe.clear()}var tt=g(function(e){var t="&"===e.charAt(0),n="~"===(e=t?e.slice(1):e).charAt(0),r="!"===(e=n?e.slice(1):e).charAt(0);return{name:e=r?e.slice(1):e,once:n,capture:r,passive:t}});function nt(e,t){function n(){var e=arguments,r=n.fns;if(!Array.isArray(r))return He(r,null,arguments,t,"v-on handler");for(var i=r.slice(),o=0;o<i.length;o++)He(i[o],null,e,t,"v-on handler")}return n.fns=e,n}function rt(e,n,i,o,a,s){var c,u,l,f;for(c in e)u=e[c],l=n[c],f=tt(c),t(u)||(t(l)?(t(u.fns)&&(u=e[c]=nt(u,s)),r(f.once)&&(u=e[c]=a(f.name,u,f.capture)),i(f.name,u,f.capture,f.passive,f.params)):u!==l&&(l.fns=u,e[c]=l));for(c in n)t(e[c])&&o((f=tt(c)).name,n[c],f.capture)}function it(e,i,o){var a;e instanceof pe&&(e=e.data.hook||(e.data.hook={}));var s=e[i];function c(){o.apply(this,arguments),h(a.fns,c)}t(s)?a=nt([c]):n(s.fns)&&r(s.merged)?(a=s).fns.push(c):a=nt([s,c]),a.merged=!0,e[i]=a}function ot(e,t,r,i,o){if(n(t)){if(y(t,r))return e[r]=t[r],o||delete t[r],!0;if(y(t,i))return e[r]=t[i],o||delete t[i],!0}return!1}function at(e){return i(e)?[he(e)]:Array.isArray(e)?function e(o,a){var s=[];var c,u,l,f;for(c=0;c<o.length;c++)t(u=o[c])||"boolean"==typeof u||(l=s.length-1,f=s[l],Array.isArray(u)?u.length>0&&(st((u=e(u,(a||"")+"_"+c))[0])&&st(f)&&(s[l]=he(f.text+u[0].text),u.shift()),s.push.apply(s,u)):i(u)?st(f)?s[l]=he(f.text+u):""!==u&&s.push(he(u)):st(u)&&st(f)?s[l]=he(f.text+u.text):(r(o._isVList)&&n(u.tag)&&t(u.key)&&n(a)&&(u.key="__vlist"+a+"_"+c+"__"),s.push(u)));return s}(e):void 0}function st(e){return n(e)&&n(e.text)&&!1===e.isComment}function ct(e,t){if(e){for(var n=Object.create(null),r=oe?Reflect.ownKeys(e):Object.keys(e),i=0;i<r.length;i++){var o=r[i];if("__ob__"!==o){for(var a=e[o].from,s=t;s;){if(s._provided&&y(s._provided,a)){n[o]=s._provided[a];break}s=s.$parent}if(!s&&"default"in e[o]){var c=e[o].default;n[o]="function"==typeof c?c.call(t):c}}}return n}}function ut(e,t){if(!e||!e.length)return{};for(var n={},r=0,i=e.length;r<i;r++){var o=e[r],a=o.data;if(a&&a.attrs&&a.attrs.slot&&delete a.attrs.slot,o.context!==t&&o.fnContext!==t||!a||null==a.slot)(n.default||(n.default=[])).push(o);else{var s=a.slot,c=n[s]||(n[s]=[]);"template"===o.tag?c.push.apply(c,o.children||[]):c.push(o)}}for(var u in n)n[u].every(lt)&&delete n[u];return n}function lt(e){return e.isComment&&!e.asyncFactory||" "===e.text}function ft(t,n,r){var i,o=Object.keys(n).length>0,a=t?!!t.$stable:!o,s=t&&t.$key;if(t){if(t._normalized)return t._normalized;if(a&&r&&r!==e&&s===r.$key&&!o&&!r.$hasNormal)return r;for(var c in i={},t)t[c]&&"$"!==c[0]&&(i[c]=pt(n,c,t[c]))}else i={};for(var u in n)u in i||(i[u]=dt(n,u));return t&&Object.isExtensible(t)&&(t._normalized=i),R(i,"$stable",a),R(i,"$key",s),R(i,"$hasNormal",o),i}function pt(e,t,n){var r=function(){var e=arguments.length?n.apply(null,arguments):n({});return(e=e&&"object"==typeof e&&!Array.isArray(e)?[e]:at(e))&&(0===e.length||1===e.length&&e[0].isComment)?void 0:e};return n.proxy&&Object.defineProperty(e,t,{get:r,enumerable:!0,configurable:!0}),r}function dt(e,t){return function(){return e[t]}}function vt(e,t){var r,i,a,s,c;if(Array.isArray(e)||"string"==typeof e)for(r=new Array(e.length),i=0,a=e.length;i<a;i++)r[i]=t(e[i],i);else if("number"==typeof e)for(r=new Array(e),i=0;i<e;i++)r[i]=t(i+1,i);else if(o(e))if(oe&&e[Symbol.iterator]){r=[];for(var u=e[Symbol.iterator](),l=u.next();!l.done;)r.push(t(l.value,r.length)),l=u.next()}else for(s=Object.keys(e),r=new Array(s.length),i=0,a=s.length;i<a;i++)c=s[i],r[i]=t(e[c],c,i);return n(r)||(r=[]),r._isVList=!0,r}function ht(e,t,n,r){var i,o=this.$scopedSlots[e];o?(n=n||{},r&&(n=A(A({},r),n)),i=o(n)||t):i=this.$slots[e]||t;var a=n&&n.slot;return a?this.$createElement("template",{slot:a},i):i}function mt(e){return Le(this.$options,"filters",e)||E}function yt(e,t){return Array.isArray(e)?-1===e.indexOf(t):e!==t}function gt(e,t,n,r,i){var o=F.keyCodes[t]||n;return i&&r&&!F.keyCodes[t]?yt(i,r):o?yt(o,e):r?C(r)!==t:void 0}function _t(e,t,n,r,i){if(n)if(o(n)){var a;Array.isArray(n)&&(n=O(n));var s=function(o){if("class"===o||"style"===o||v(o))a=e;else{var s=e.attrs&&e.attrs.type;a=r||F.mustUseProp(t,s,o)?e.domProps||(e.domProps={}):e.attrs||(e.attrs={})}var c=b(o),u=C(o);c in a||u in a||(a[o]=n[o],i&&((e.on||(e.on={}))["update:"+o]=function(e){n[o]=e}))};for(var c in n)s(c)}else;return e}function bt(e,t){var n=this._staticTrees||(this._staticTrees=[]),r=n[e];return r&&!t?r:(wt(r=n[e]=this.$options.staticRenderFns[e].call(this._renderProxy,null,this),"__static__"+e,!1),r)}function $t(e,t,n){return wt(e,"__once__"+t+(n?"_"+n:""),!0),e}function wt(e,t,n){if(Array.isArray(e))for(var r=0;r<e.length;r++)e[r]&&"string"!=typeof e[r]&&Ct(e[r],t+"_"+r,n);else Ct(e,t,n)}function Ct(e,t,n){e.isStatic=!0,e.key=t,e.isOnce=n}function xt(e,t){if(t)if(s(t)){var n=e.on=e.on?A({},e.on):{};for(var r in t){var i=n[r],o=t[r];n[r]=i?[].concat(i,o):o}}else;return e}function kt(e,t,n,r){t=t||{$stable:!n};for(var i=0;i<e.length;i++){var o=e[i];Array.isArray(o)?kt(o,t,n):o&&(o.proxy&&(o.fn.proxy=!0),t[o.key]=o.fn)}return r&&(t.$key=r),t}function At(e,t){for(var n=0;n<t.length;n+=2){var r=t[n];"string"==typeof r&&r&&(e[t[n]]=t[n+1])}return e}function Ot(e,t){return"string"==typeof e?t+e:e}function St(e){e._o=$t,e._n=f,e._s=l,e._l=vt,e._t=ht,e._q=N,e._i=j,e._m=bt,e._f=mt,e._k=gt,e._b=_t,e._v=he,e._e=ve,e._u=kt,e._g=xt,e._d=At,e._p=Ot}function Tt(t,n,i,o,a){var s,c=this,u=a.options;y(o,"_uid")?(s=Object.create(o))._original=o:(s=o,o=o._original);var l=r(u._compiled),f=!l;this.data=t,this.props=n,this.children=i,this.parent=o,this.listeners=t.on||e,this.injections=ct(u.inject,o),this.slots=function(){return c.$slots||ft(t.scopedSlots,c.$slots=ut(i,o)),c.$slots},Object.defineProperty(this,"scopedSlots",{enumerable:!0,get:function(){return ft(t.scopedSlots,this.slots())}}),l&&(this.$options=u,this.$slots=this.slots(),this.$scopedSlots=ft(t.scopedSlots,this.$slots)),u._scopeId?this._c=function(e,t,n,r){var i=Pt(s,e,t,n,r,f);return i&&!Array.isArray(i)&&(i.fnScopeId=u._scopeId,i.fnContext=o),i}:this._c=function(e,t,n,r){return Pt(s,e,t,n,r,f)}}function Et(e,t,n,r,i){var o=me(e);return o.fnContext=n,o.fnOptions=r,t.slot&&((o.data||(o.data={})).slot=t.slot),o}function Nt(e,t){for(var n in t)e[b(n)]=t[n]}St(Tt.prototype);var jt={init:function(e,t){if(e.componentInstance&&!e.componentInstance._isDestroyed&&e.data.keepAlive){var r=e;jt.prepatch(r,r)}else{(e.componentInstance=function(e,t){var r={_isComponent:!0,_parentVnode:e,parent:t},i=e.data.inlineTemplate;n(i)&&(r.render=i.render,r.staticRenderFns=i.staticRenderFns);return new e.componentOptions.Ctor(r)}(e,Wt)).$mount(t?e.elm:void 0,t)}},prepatch:function(t,n){var r=n.componentOptions;!function(t,n,r,i,o){var a=i.data.scopedSlots,s=t.$scopedSlots,c=!!(a&&!a.$stable||s!==e&&!s.$stable||a&&t.$scopedSlots.$key!==a.$key),u=!!(o||t.$options._renderChildren||c);t.$options._parentVnode=i,t.$vnode=i,t._vnode&&(t._vnode.parent=i);if(t.$options._renderChildren=o,t.$attrs=i.data.attrs||e,t.$listeners=r||e,n&&t.$options.props){$e(!1);for(var l=t._props,f=t.$options._propKeys||[],p=0;p<f.length;p++){var d=f[p],v=t.$options.props;l[d]=Me(d,v,n,t)}$e(!0),t.$options.propsData=n}r=r||e;var h=t.$options._parentListeners;t.$options._parentListeners=r,qt(t,r,h),u&&(t.$slots=ut(o,i.context),t.$forceUpdate())}(n.componentInstance=t.componentInstance,r.propsData,r.listeners,n,r.children)},insert:function(e){var t,n=e.context,r=e.componentInstance;r._isMounted||(r._isMounted=!0,Yt(r,"mounted")),e.data.keepAlive&&(n._isMounted?((t=r)._inactive=!1,en.push(t)):Xt(r,!0))},destroy:function(e){var t=e.componentInstance;t._isDestroyed||(e.data.keepAlive?function e(t,n){if(n&&(t._directInactive=!0,Gt(t)))return;if(!t._inactive){t._inactive=!0;for(var r=0;r<t.$children.length;r++)e(t.$children[r]);Yt(t,"deactivated")}}(t,!0):t.$destroy())}},Dt=Object.keys(jt);function Lt(i,a,s,c,l){if(!t(i)){var f=s.$options._base;if(o(i)&&(i=f.extend(i)),"function"==typeof i){var p;if(t(i.cid)&&void 0===(i=function(e,i){if(r(e.error)&&n(e.errorComp))return e.errorComp;if(n(e.resolved))return e.resolved;var a=Ht;a&&n(e.owners)&&-1===e.owners.indexOf(a)&&e.owners.push(a);if(r(e.loading)&&n(e.loadingComp))return e.loadingComp;if(a&&!n(e.owners)){var s=e.owners=[a],c=!0,l=null,f=null;a.$on("hook:destroyed",function(){return h(s,a)});var p=function(e){for(var t=0,n=s.length;t<n;t++)s[t].$forceUpdate();e&&(s.length=0,null!==l&&(clearTimeout(l),l=null),null!==f&&(clearTimeout(f),f=null))},d=D(function(t){e.resolved=Bt(t,i),c?s.length=0:p(!0)}),v=D(function(t){n(e.errorComp)&&(e.error=!0,p(!0))}),m=e(d,v);return o(m)&&(u(m)?t(e.resolved)&&m.then(d,v):u(m.component)&&(m.component.then(d,v),n(m.error)&&(e.errorComp=Bt(m.error,i)),n(m.loading)&&(e.loadingComp=Bt(m.loading,i),0===m.delay?e.loading=!0:l=setTimeout(function(){l=null,t(e.resolved)&&t(e.error)&&(e.loading=!0,p(!1))},m.delay||200)),n(m.timeout)&&(f=setTimeout(function(){f=null,t(e.resolved)&&v(null)},m.timeout)))),c=!1,e.loading?e.loadingComp:e.resolved}}(p=i,f)))return function(e,t,n,r,i){var o=ve();return o.asyncFactory=e,o.asyncMeta={data:t,context:n,children:r,tag:i},o}(p,a,s,c,l);a=a||{},$n(i),n(a.model)&&function(e,t){var r=e.model&&e.model.prop||"value",i=e.model&&e.model.event||"input";(t.attrs||(t.attrs={}))[r]=t.model.value;var o=t.on||(t.on={}),a=o[i],s=t.model.callback;n(a)?(Array.isArray(a)?-1===a.indexOf(s):a!==s)&&(o[i]=[s].concat(a)):o[i]=s}(i.options,a);var d=function(e,r,i){var o=r.options.props;if(!t(o)){var a={},s=e.attrs,c=e.props;if(n(s)||n(c))for(var u in o){var l=C(u);ot(a,c,u,l,!0)||ot(a,s,u,l,!1)}return a}}(a,i);if(r(i.options.functional))return function(t,r,i,o,a){var s=t.options,c={},u=s.props;if(n(u))for(var l in u)c[l]=Me(l,u,r||e);else n(i.attrs)&&Nt(c,i.attrs),n(i.props)&&Nt(c,i.props);var f=new Tt(i,c,a,o,t),p=s.render.call(null,f._c,f);if(p instanceof pe)return Et(p,i,f.parent,s);if(Array.isArray(p)){for(var d=at(p)||[],v=new Array(d.length),h=0;h<d.length;h++)v[h]=Et(d[h],i,f.parent,s);return v}}(i,d,a,s,c);var v=a.on;if(a.on=a.nativeOn,r(i.options.abstract)){var m=a.slot;a={},m&&(a.slot=m)}!function(e){for(var t=e.hook||(e.hook={}),n=0;n<Dt.length;n++){var r=Dt[n],i=t[r],o=jt[r];i===o||i&&i._merged||(t[r]=i?Mt(o,i):o)}}(a);var y=i.options.name||l;return new pe("vue-component-"+i.cid+(y?"-"+y:""),a,void 0,void 0,void 0,s,{Ctor:i,propsData:d,listeners:v,tag:l,children:c},p)}}}function Mt(e,t){var n=function(n,r){e(n,r),t(n,r)};return n._merged=!0,n}var It=1,Ft=2;function Pt(e,a,s,c,u,l){return(Array.isArray(s)||i(s))&&(u=c,c=s,s=void 0),r(l)&&(u=Ft),function(e,i,a,s,c){if(n(a)&&n(a.__ob__))return ve();n(a)&&n(a.is)&&(i=a.is);if(!i)return ve();Array.isArray(s)&&"function"==typeof s[0]&&((a=a||{}).scopedSlots={default:s[0]},s.length=0);c===Ft?s=at(s):c===It&&(s=function(e){for(var t=0;t<e.length;t++)if(Array.isArray(e[t]))return Array.prototype.concat.apply([],e);return e}(s));var u,l;if("string"==typeof i){var f;l=e.$vnode&&e.$vnode.ns||F.getTagNamespace(i),u=F.isReservedTag(i)?new pe(F.parsePlatformTagName(i),a,s,void 0,void 0,e):a&&a.pre||!n(f=Le(e.$options,"components",i))?new pe(i,a,s,void 0,void 0,e):Lt(f,a,e,s,i)}else u=Lt(i,a,e,s);return Array.isArray(u)?u:n(u)?(n(l)&&function e(i,o,a){i.ns=o;"foreignObject"===i.tag&&(o=void 0,a=!0);if(n(i.children))for(var s=0,c=i.children.length;s<c;s++){var u=i.children[s];n(u.tag)&&(t(u.ns)||r(a)&&"svg"!==u.tag)&&e(u,o,a)}}(u,l),n(a)&&function(e){o(e.style)&&et(e.style);o(e.class)&&et(e.class)}(a),u):ve()}(e,a,s,c,u)}var Rt,Ht=null;function Bt(e,t){return(e.__esModule||oe&&"Module"===e[Symbol.toStringTag])&&(e=e.default),o(e)?t.extend(e):e}function Ut(e){return e.isComment&&e.asyncFactory}function zt(e){if(Array.isArray(e))for(var t=0;t<e.length;t++){var r=e[t];if(n(r)&&(n(r.componentOptions)||Ut(r)))return r}}function Vt(e,t){Rt.$on(e,t)}function Kt(e,t){Rt.$off(e,t)}function Jt(e,t){var n=Rt;return function r(){null!==t.apply(null,arguments)&&n.$off(e,r)}}function qt(e,t,n){Rt=e,rt(t,n||{},Vt,Kt,Jt,e),Rt=void 0}var Wt=null;function Zt(e){var t=Wt;return Wt=e,function(){Wt=t}}function Gt(e){for(;e&&(e=e.$parent);)if(e._inactive)return!0;return!1}function Xt(e,t){if(t){if(e._directInactive=!1,Gt(e))return}else if(e._directInactive)return;if(e._inactive||null===e._inactive){e._inactive=!1;for(var n=0;n<e.$children.length;n++)Xt(e.$children[n]);Yt(e,"activated")}}function Yt(e,t){le();var n=e.$options[t],r=t+" hook";if(n)for(var i=0,o=n.length;i<o;i++)He(n[i],e,null,e,r);e._hasHookEvent&&e.$emit("hook:"+t),fe()}var Qt=[],en=[],tn={},nn=!1,rn=!1,on=0;var an=0,sn=Date.now;if(z&&!q){var cn=window.performance;cn&&"function"==typeof cn.now&&sn()>document.createEvent("Event").timeStamp&&(sn=function(){return cn.now()})}function un(){var e,t;for(an=sn(),rn=!0,Qt.sort(function(e,t){return e.id-t.id}),on=0;on<Qt.length;on++)(e=Qt[on]).before&&e.before(),t=e.id,tn[t]=null,e.run();var n=en.slice(),r=Qt.slice();on=Qt.length=en.length=0,tn={},nn=rn=!1,function(e){for(var t=0;t<e.length;t++)e[t]._inactive=!0,Xt(e[t],!0)}(n),function(e){var t=e.length;for(;t--;){var n=e[t],r=n.vm;r._watcher===n&&r._isMounted&&!r._isDestroyed&&Yt(r,"updated")}}(r),ne&&F.devtools&&ne.emit("flush")}var ln=0,fn=function(e,t,n,r,i){this.vm=e,i&&(e._watcher=this),e._watchers.push(this),r?(this.deep=!!r.deep,this.user=!!r.user,this.lazy=!!r.lazy,this.sync=!!r.sync,this.before=r.before):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++ln,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new ie,this.newDepIds=new ie,this.expression="","function"==typeof t?this.getter=t:(this.getter=function(e){if(!H.test(e)){var t=e.split(".");return function(e){for(var n=0;n<t.length;n++){if(!e)return;e=e[t[n]]}return e}}}(t),this.getter||(this.getter=S)),this.value=this.lazy?void 0:this.get()};fn.prototype.get=function(){var e;le(this);var t=this.vm;try{e=this.getter.call(t,t)}catch(e){if(!this.user)throw e;Re(e,t,'getter for watcher "'+this.expression+'"')}finally{this.deep&&et(e),fe(),this.cleanupDeps()}return e},fn.prototype.addDep=function(e){var t=e.id;this.newDepIds.has(t)||(this.newDepIds.add(t),this.newDeps.push(e),this.depIds.has(t)||e.addSub(this))},fn.prototype.cleanupDeps=function(){for(var e=this.deps.length;e--;){var t=this.deps[e];this.newDepIds.has(t.id)||t.removeSub(this)}var n=this.depIds;this.depIds=this.newDepIds,this.newDepIds=n,this.newDepIds.clear(),n=this.deps,this.deps=this.newDeps,this.newDeps=n,this.newDeps.length=0},fn.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():function(e){var t=e.id;if(null==tn[t]){if(tn[t]=!0,rn){for(var n=Qt.length-1;n>on&&Qt[n].id>e.id;)n--;Qt.splice(n+1,0,e)}else Qt.push(e);nn||(nn=!0,Ye(un))}}(this)},fn.prototype.run=function(){if(this.active){var e=this.get();if(e!==this.value||o(e)||this.deep){var t=this.value;if(this.value=e,this.user)try{this.cb.call(this.vm,e,t)}catch(e){Re(e,this.vm,'callback for watcher "'+this.expression+'"')}else this.cb.call(this.vm,e,t)}}},fn.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},fn.prototype.depend=function(){for(var e=this.deps.length;e--;)this.deps[e].depend()},fn.prototype.teardown=function(){if(this.active){this.vm._isBeingDestroyed||h(this.vm._watchers,this);for(var e=this.deps.length;e--;)this.deps[e].removeSub(this);this.active=!1}};var pn={enumerable:!0,configurable:!0,get:S,set:S};function dn(e,t,n){pn.get=function(){return this[t][n]},pn.set=function(e){this[t][n]=e},Object.defineProperty(e,n,pn)}function vn(e){e._watchers=[];var t=e.$options;t.props&&function(e,t){var n=e.$options.propsData||{},r=e._props={},i=e.$options._propKeys=[];e.$parent&&$e(!1);var o=function(o){i.push(o);var a=Me(o,t,n,e);xe(r,o,a),o in e||dn(e,"_props",o)};for(var a in t)o(a);$e(!0)}(e,t.props),t.methods&&function(e,t){e.$options.props;for(var n in t)e[n]="function"!=typeof t[n]?S:x(t[n],e)}(e,t.methods),t.data?function(e){var t=e.$options.data;s(t=e._data="function"==typeof t?function(e,t){le();try{return e.call(t,t)}catch(e){return Re(e,t,"data()"),{}}finally{fe()}}(t,e):t||{})||(t={});var n=Object.keys(t),r=e.$options.props,i=(e.$options.methods,n.length);for(;i--;){var o=n[i];r&&y(r,o)||(a=void 0,36!==(a=(o+"").charCodeAt(0))&&95!==a&&dn(e,"_data",o))}var a;Ce(t,!0)}(e):Ce(e._data={},!0),t.computed&&function(e,t){var n=e._computedWatchers=Object.create(null),r=te();for(var i in t){var o=t[i],a="function"==typeof o?o:o.get;r||(n[i]=new fn(e,a||S,S,hn)),i in e||mn(e,i,o)}}(e,t.computed),t.watch&&t.watch!==Y&&function(e,t){for(var n in t){var r=t[n];if(Array.isArray(r))for(var i=0;i<r.length;i++)_n(e,n,r[i]);else _n(e,n,r)}}(e,t.watch)}var hn={lazy:!0};function mn(e,t,n){var r=!te();"function"==typeof n?(pn.get=r?yn(t):gn(n),pn.set=S):(pn.get=n.get?r&&!1!==n.cache?yn(t):gn(n.get):S,pn.set=n.set||S),Object.defineProperty(e,t,pn)}function yn(e){return function(){var t=this._computedWatchers&&this._computedWatchers[e];if(t)return t.dirty&&t.evaluate(),ce.target&&t.depend(),t.value}}function gn(e){return function(){return e.call(this,this)}}function _n(e,t,n,r){return s(n)&&(r=n,n=n.handler),"string"==typeof n&&(n=e[n]),e.$watch(t,n,r)}var bn=0;function $n(e){var t=e.options;if(e.super){var n=$n(e.super);if(n!==e.superOptions){e.superOptions=n;var r=function(e){var t,n=e.options,r=e.sealedOptions;for(var i in n)n[i]!==r[i]&&(t||(t={}),t[i]=n[i]);return t}(e);r&&A(e.extendOptions,r),(t=e.options=De(n,e.extendOptions)).name&&(t.components[t.name]=e)}}return t}function wn(e){this._init(e)}function Cn(e){e.cid=0;var t=1;e.extend=function(e){e=e||{};var n=this,r=n.cid,i=e._Ctor||(e._Ctor={});if(i[r])return i[r];var o=e.name||n.options.name,a=function(e){this._init(e)};return(a.prototype=Object.create(n.prototype)).constructor=a,a.cid=t++,a.options=De(n.options,e),a.super=n,a.options.props&&function(e){var t=e.options.props;for(var n in t)dn(e.prototype,"_props",n)}(a),a.options.computed&&function(e){var t=e.options.computed;for(var n in t)mn(e.prototype,n,t[n])}(a),a.extend=n.extend,a.mixin=n.mixin,a.use=n.use,M.forEach(function(e){a[e]=n[e]}),o&&(a.options.components[o]=a),a.superOptions=n.options,a.extendOptions=e,a.sealedOptions=A({},a.options),i[r]=a,a}}function xn(e){return e&&(e.Ctor.options.name||e.tag)}function kn(e,t){return Array.isArray(e)?e.indexOf(t)>-1:"string"==typeof e?e.split(",").indexOf(t)>-1:(n=e,"[object RegExp]"===a.call(n)&&e.test(t));var n}function An(e,t){var n=e.cache,r=e.keys,i=e._vnode;for(var o in n){var a=n[o];if(a){var s=xn(a.componentOptions);s&&!t(s)&&On(n,o,r,i)}}}function On(e,t,n,r){var i=e[t];!i||r&&i.tag===r.tag||i.componentInstance.$destroy(),e[t]=null,h(n,t)}!function(t){t.prototype._init=function(t){var n=this;n._uid=bn++,n._isVue=!0,t&&t._isComponent?function(e,t){var n=e.$options=Object.create(e.constructor.options),r=t._parentVnode;n.parent=t.parent,n._parentVnode=r;var i=r.componentOptions;n.propsData=i.propsData,n._parentListeners=i.listeners,n._renderChildren=i.children,n._componentTag=i.tag,t.render&&(n.render=t.render,n.staticRenderFns=t.staticRenderFns)}(n,t):n.$options=De($n(n.constructor),t||{},n),n._renderProxy=n,n._self=n,function(e){var t=e.$options,n=t.parent;if(n&&!t.abstract){for(;n.$options.abstract&&n.$parent;)n=n.$parent;n.$children.push(e)}e.$parent=n,e.$root=n?n.$root:e,e.$children=[],e.$refs={},e._watcher=null,e._inactive=null,e._directInactive=!1,e._isMounted=!1,e._isDestroyed=!1,e._isBeingDestroyed=!1}(n),function(e){e._events=Object.create(null),e._hasHookEvent=!1;var t=e.$options._parentListeners;t&&qt(e,t)}(n),function(t){t._vnode=null,t._staticTrees=null;var n=t.$options,r=t.$vnode=n._parentVnode,i=r&&r.context;t.$slots=ut(n._renderChildren,i),t.$scopedSlots=e,t._c=function(e,n,r,i){return Pt(t,e,n,r,i,!1)},t.$createElement=function(e,n,r,i){return Pt(t,e,n,r,i,!0)};var o=r&&r.data;xe(t,"$attrs",o&&o.attrs||e,null,!0),xe(t,"$listeners",n._parentListeners||e,null,!0)}(n),Yt(n,"beforeCreate"),function(e){var t=ct(e.$options.inject,e);t&&($e(!1),Object.keys(t).forEach(function(n){xe(e,n,t[n])}),$e(!0))}(n),vn(n),function(e){var t=e.$options.provide;t&&(e._provided="function"==typeof t?t.call(e):t)}(n),Yt(n,"created"),n.$options.el&&n.$mount(n.$options.el)}}(wn),function(e){var t={get:function(){return this._data}},n={get:function(){return this._props}};Object.defineProperty(e.prototype,"$data",t),Object.defineProperty(e.prototype,"$props",n),e.prototype.$set=ke,e.prototype.$delete=Ae,e.prototype.$watch=function(e,t,n){if(s(t))return _n(this,e,t,n);(n=n||{}).user=!0;var r=new fn(this,e,t,n);if(n.immediate)try{t.call(this,r.value)}catch(e){Re(e,this,'callback for immediate watcher "'+r.expression+'"')}return function(){r.teardown()}}}(wn),function(e){var t=/^hook:/;e.prototype.$on=function(e,n){var r=this;if(Array.isArray(e))for(var i=0,o=e.length;i<o;i++)r.$on(e[i],n);else(r._events[e]||(r._events[e]=[])).push(n),t.test(e)&&(r._hasHookEvent=!0);return r},e.prototype.$once=function(e,t){var n=this;function r(){n.$off(e,r),t.apply(n,arguments)}return r.fn=t,n.$on(e,r),n},e.prototype.$off=function(e,t){var n=this;if(!arguments.length)return n._events=Object.create(null),n;if(Array.isArray(e)){for(var r=0,i=e.length;r<i;r++)n.$off(e[r],t);return n}var o,a=n._events[e];if(!a)return n;if(!t)return n._events[e]=null,n;for(var s=a.length;s--;)if((o=a[s])===t||o.fn===t){a.splice(s,1);break}return n},e.prototype.$emit=function(e){var t=this._events[e];if(t){t=t.length>1?k(t):t;for(var n=k(arguments,1),r='event handler for "'+e+'"',i=0,o=t.length;i<o;i++)He(t[i],this,n,this,r)}return this}}(wn),function(e){e.prototype._update=function(e,t){var n=this,r=n.$el,i=n._vnode,o=Zt(n);n._vnode=e,n.$el=i?n.__patch__(i,e):n.__patch__(n.$el,e,t,!1),o(),r&&(r.__vue__=null),n.$el&&(n.$el.__vue__=n),n.$vnode&&n.$parent&&n.$vnode===n.$parent._vnode&&(n.$parent.$el=n.$el)},e.prototype.$forceUpdate=function(){this._watcher&&this._watcher.update()},e.prototype.$destroy=function(){var e=this;if(!e._isBeingDestroyed){Yt(e,"beforeDestroy"),e._isBeingDestroyed=!0;var t=e.$parent;!t||t._isBeingDestroyed||e.$options.abstract||h(t.$children,e),e._watcher&&e._watcher.teardown();for(var n=e._watchers.length;n--;)e._watchers[n].teardown();e._data.__ob__&&e._data.__ob__.vmCount--,e._isDestroyed=!0,e.__patch__(e._vnode,null),Yt(e,"destroyed"),e.$off(),e.$el&&(e.$el.__vue__=null),e.$vnode&&(e.$vnode.parent=null)}}}(wn),function(e){St(e.prototype),e.prototype.$nextTick=function(e){return Ye(e,this)},e.prototype._render=function(){var e,t=this,n=t.$options,r=n.render,i=n._parentVnode;i&&(t.$scopedSlots=ft(i.data.scopedSlots,t.$slots,t.$scopedSlots)),t.$vnode=i;try{Ht=t,e=r.call(t._renderProxy,t.$createElement)}catch(n){Re(n,t,"render"),e=t._vnode}finally{Ht=null}return Array.isArray(e)&&1===e.length&&(e=e[0]),e instanceof pe||(e=ve()),e.parent=i,e}}(wn);var Sn=[String,RegExp,Array],Tn={KeepAlive:{name:"keep-alive",abstract:!0,props:{include:Sn,exclude:Sn,max:[String,Number]},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){for(var e in this.cache)On(this.cache,e,this.keys)},mounted:function(){var e=this;this.$watch("include",function(t){An(e,function(e){return kn(t,e)})}),this.$watch("exclude",function(t){An(e,function(e){return!kn(t,e)})})},render:function(){var e=this.$slots.default,t=zt(e),n=t&&t.componentOptions;if(n){var r=xn(n),i=this.include,o=this.exclude;if(i&&(!r||!kn(i,r))||o&&r&&kn(o,r))return t;var a=this.cache,s=this.keys,c=null==t.key?n.Ctor.cid+(n.tag?"::"+n.tag:""):t.key;a[c]?(t.componentInstance=a[c].componentInstance,h(s,c),s.push(c)):(a[c]=t,s.push(c),this.max&&s.length>parseInt(this.max)&&On(a,s[0],s,this._vnode)),t.data.keepAlive=!0}return t||e&&e[0]}}};!function(e){var t={get:function(){return F}};Object.defineProperty(e,"config",t),e.util={warn:ae,extend:A,mergeOptions:De,defineReactive:xe},e.set=ke,e.delete=Ae,e.nextTick=Ye,e.observable=function(e){return Ce(e),e},e.options=Object.create(null),M.forEach(function(t){e.options[t+"s"]=Object.create(null)}),e.options._base=e,A(e.options.components,Tn),function(e){e.use=function(e){var t=this._installedPlugins||(this._installedPlugins=[]);if(t.indexOf(e)>-1)return this;var n=k(arguments,1);return n.unshift(this),"function"==typeof e.install?e.install.apply(e,n):"function"==typeof e&&e.apply(null,n),t.push(e),this}}(e),function(e){e.mixin=function(e){return this.options=De(this.options,e),this}}(e),Cn(e),function(e){M.forEach(function(t){e[t]=function(e,n){return n?("component"===t&&s(n)&&(n.name=n.name||e,n=this.options._base.extend(n)),"directive"===t&&"function"==typeof n&&(n={bind:n,update:n}),this.options[t+"s"][e]=n,n):this.options[t+"s"][e]}})}(e)}(wn),Object.defineProperty(wn.prototype,"$isServer",{get:te}),Object.defineProperty(wn.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),Object.defineProperty(wn,"FunctionalRenderContext",{value:Tt}),wn.version="2.6.10";var En=p("style,class"),Nn=p("input,textarea,option,select,progress"),jn=function(e,t,n){return"value"===n&&Nn(e)&&"button"!==t||"selected"===n&&"option"===e||"checked"===n&&"input"===e||"muted"===n&&"video"===e},Dn=p("contenteditable,draggable,spellcheck"),Ln=p("events,caret,typing,plaintext-only"),Mn=function(e,t){return Hn(t)||"false"===t?"false":"contenteditable"===e&&Ln(t)?t:"true"},In=p("allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,default,defaultchecked,defaultmuted,defaultselected,defer,disabled,enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,required,reversed,scoped,seamless,selected,sortable,translate,truespeed,typemustmatch,visible"),Fn="http://www.w3.org/1999/xlink",Pn=function(e){return":"===e.charAt(5)&&"xlink"===e.slice(0,5)},Rn=function(e){return Pn(e)?e.slice(6,e.length):""},Hn=function(e){return null==e||!1===e};function Bn(e){for(var t=e.data,r=e,i=e;n(i.componentInstance);)(i=i.componentInstance._vnode)&&i.data&&(t=Un(i.data,t));for(;n(r=r.parent);)r&&r.data&&(t=Un(t,r.data));return function(e,t){if(n(e)||n(t))return zn(e,Vn(t));return""}(t.staticClass,t.class)}function Un(e,t){return{staticClass:zn(e.staticClass,t.staticClass),class:n(e.class)?[e.class,t.class]:t.class}}function zn(e,t){return e?t?e+" "+t:e:t||""}function Vn(e){return Array.isArray(e)?function(e){for(var t,r="",i=0,o=e.length;i<o;i++)n(t=Vn(e[i]))&&""!==t&&(r&&(r+=" "),r+=t);return r}(e):o(e)?function(e){var t="";for(var n in e)e[n]&&(t&&(t+=" "),t+=n);return t}(e):"string"==typeof e?e:""}var Kn={svg:"http://www.w3.org/2000/svg",math:"http://www.w3.org/1998/Math/MathML"},Jn=p("html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,menuitem,summary,content,element,shadow,template,blockquote,iframe,tfoot"),qn=p("svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view",!0),Wn=function(e){return Jn(e)||qn(e)};function Zn(e){return qn(e)?"svg":"math"===e?"math":void 0}var Gn=Object.create(null);var Xn=p("text,number,password,search,email,tel,url");function Yn(e){if("string"==typeof e){var t=document.querySelector(e);return t||document.createElement("div")}return e}var Qn=Object.freeze({createElement:function(e,t){var n=document.createElement(e);return"select"!==e?n:(t.data&&t.data.attrs&&void 0!==t.data.attrs.multiple&&n.setAttribute("multiple","multiple"),n)},createElementNS:function(e,t){return document.createElementNS(Kn[e],t)},createTextNode:function(e){return document.createTextNode(e)},createComment:function(e){return document.createComment(e)},insertBefore:function(e,t,n){e.insertBefore(t,n)},removeChild:function(e,t){e.removeChild(t)},appendChild:function(e,t){e.appendChild(t)},parentNode:function(e){return e.parentNode},nextSibling:function(e){return e.nextSibling},tagName:function(e){return e.tagName},setTextContent:function(e,t){e.textContent=t},setStyleScope:function(e,t){e.setAttribute(t,"")}}),er={create:function(e,t){tr(t)},update:function(e,t){e.data.ref!==t.data.ref&&(tr(e,!0),tr(t))},destroy:function(e){tr(e,!0)}};function tr(e,t){var r=e.data.ref;if(n(r)){var i=e.context,o=e.componentInstance||e.elm,a=i.$refs;t?Array.isArray(a[r])?h(a[r],o):a[r]===o&&(a[r]=void 0):e.data.refInFor?Array.isArray(a[r])?a[r].indexOf(o)<0&&a[r].push(o):a[r]=[o]:a[r]=o}}var nr=new pe("",{},[]),rr=["create","activate","update","remove","destroy"];function ir(e,i){return e.key===i.key&&(e.tag===i.tag&&e.isComment===i.isComment&&n(e.data)===n(i.data)&&function(e,t){if("input"!==e.tag)return!0;var r,i=n(r=e.data)&&n(r=r.attrs)&&r.type,o=n(r=t.data)&&n(r=r.attrs)&&r.type;return i===o||Xn(i)&&Xn(o)}(e,i)||r(e.isAsyncPlaceholder)&&e.asyncFactory===i.asyncFactory&&t(i.asyncFactory.error))}function or(e,t,r){var i,o,a={};for(i=t;i<=r;++i)n(o=e[i].key)&&(a[o]=i);return a}var ar={create:sr,update:sr,destroy:function(e){sr(e,nr)}};function sr(e,t){(e.data.directives||t.data.directives)&&function(e,t){var n,r,i,o=e===nr,a=t===nr,s=ur(e.data.directives,e.context),c=ur(t.data.directives,t.context),u=[],l=[];for(n in c)r=s[n],i=c[n],r?(i.oldValue=r.value,i.oldArg=r.arg,fr(i,"update",t,e),i.def&&i.def.componentUpdated&&l.push(i)):(fr(i,"bind",t,e),i.def&&i.def.inserted&&u.push(i));if(u.length){var f=function(){for(var n=0;n<u.length;n++)fr(u[n],"inserted",t,e)};o?it(t,"insert",f):f()}l.length&&it(t,"postpatch",function(){for(var n=0;n<l.length;n++)fr(l[n],"componentUpdated",t,e)});if(!o)for(n in s)c[n]||fr(s[n],"unbind",e,e,a)}(e,t)}var cr=Object.create(null);function ur(e,t){var n,r,i=Object.create(null);if(!e)return i;for(n=0;n<e.length;n++)(r=e[n]).modifiers||(r.modifiers=cr),i[lr(r)]=r,r.def=Le(t.$options,"directives",r.name);return i}function lr(e){return e.rawName||e.name+"."+Object.keys(e.modifiers||{}).join(".")}function fr(e,t,n,r,i){var o=e.def&&e.def[t];if(o)try{o(n.elm,e,n,r,i)}catch(r){Re(r,n.context,"directive "+e.name+" "+t+" hook")}}var pr=[er,ar];function dr(e,r){var i=r.componentOptions;if(!(n(i)&&!1===i.Ctor.options.inheritAttrs||t(e.data.attrs)&&t(r.data.attrs))){var o,a,s=r.elm,c=e.data.attrs||{},u=r.data.attrs||{};for(o in n(u.__ob__)&&(u=r.data.attrs=A({},u)),u)a=u[o],c[o]!==a&&vr(s,o,a);for(o in(q||Z)&&u.value!==c.value&&vr(s,"value",u.value),c)t(u[o])&&(Pn(o)?s.removeAttributeNS(Fn,Rn(o)):Dn(o)||s.removeAttribute(o))}}function vr(e,t,n){e.tagName.indexOf("-")>-1?hr(e,t,n):In(t)?Hn(n)?e.removeAttribute(t):(n="allowfullscreen"===t&&"EMBED"===e.tagName?"true":t,e.setAttribute(t,n)):Dn(t)?e.setAttribute(t,Mn(t,n)):Pn(t)?Hn(n)?e.removeAttributeNS(Fn,Rn(t)):e.setAttributeNS(Fn,t,n):hr(e,t,n)}function hr(e,t,n){if(Hn(n))e.removeAttribute(t);else{if(q&&!W&&"TEXTAREA"===e.tagName&&"placeholder"===t&&""!==n&&!e.__ieph){var r=function(t){t.stopImmediatePropagation(),e.removeEventListener("input",r)};e.addEventListener("input",r),e.__ieph=!0}e.setAttribute(t,n)}}var mr={create:dr,update:dr};function yr(e,r){var i=r.elm,o=r.data,a=e.data;if(!(t(o.staticClass)&&t(o.class)&&(t(a)||t(a.staticClass)&&t(a.class)))){var s=Bn(r),c=i._transitionClasses;n(c)&&(s=zn(s,Vn(c))),s!==i._prevClass&&(i.setAttribute("class",s),i._prevClass=s)}}var gr,_r,br,$r,wr,Cr,xr={create:yr,update:yr},kr=/[\w).+\-_$\]]/;function Ar(e){var t,n,r,i,o,a=!1,s=!1,c=!1,u=!1,l=0,f=0,p=0,d=0;for(r=0;r<e.length;r++)if(n=t,t=e.charCodeAt(r),a)39===t&&92!==n&&(a=!1);else if(s)34===t&&92!==n&&(s=!1);else if(c)96===t&&92!==n&&(c=!1);else if(u)47===t&&92!==n&&(u=!1);else if(124!==t||124===e.charCodeAt(r+1)||124===e.charCodeAt(r-1)||l||f||p){switch(t){case 34:s=!0;break;case 39:a=!0;break;case 96:c=!0;break;case 40:p++;break;case 41:p--;break;case 91:f++;break;case 93:f--;break;case 123:l++;break;case 125:l--}if(47===t){for(var v=r-1,h=void 0;v>=0&&" "===(h=e.charAt(v));v--);h&&kr.test(h)||(u=!0)}}else void 0===i?(d=r+1,i=e.slice(0,r).trim()):m();function m(){(o||(o=[])).push(e.slice(d,r).trim()),d=r+1}if(void 0===i?i=e.slice(0,r).trim():0!==d&&m(),o)for(r=0;r<o.length;r++)i=Or(i,o[r]);return i}function Or(e,t){var n=t.indexOf("(");if(n<0)return'_f("'+t+'")('+e+")";var r=t.slice(0,n),i=t.slice(n+1);return'_f("'+r+'")('+e+(")"!==i?","+i:i)}function Sr(e,t){console.error("[Vue compiler]: "+e)}function Tr(e,t){return e?e.map(function(e){return e[t]}).filter(function(e){return e}):[]}function Er(e,t,n,r,i){(e.props||(e.props=[])).push(Rr({name:t,value:n,dynamic:i},r)),e.plain=!1}function Nr(e,t,n,r,i){(i?e.dynamicAttrs||(e.dynamicAttrs=[]):e.attrs||(e.attrs=[])).push(Rr({name:t,value:n,dynamic:i},r)),e.plain=!1}function jr(e,t,n,r){e.attrsMap[t]=n,e.attrsList.push(Rr({name:t,value:n},r))}function Dr(e,t,n,r,i,o,a,s){(e.directives||(e.directives=[])).push(Rr({name:t,rawName:n,value:r,arg:i,isDynamicArg:o,modifiers:a},s)),e.plain=!1}function Lr(e,t,n){return n?"_p("+t+',"'+e+'")':e+t}function Mr(t,n,r,i,o,a,s,c){var u;(i=i||e).right?c?n="("+n+")==='click'?'contextmenu':("+n+")":"click"===n&&(n="contextmenu",delete i.right):i.middle&&(c?n="("+n+")==='click'?'mouseup':("+n+")":"click"===n&&(n="mouseup")),i.capture&&(delete i.capture,n=Lr("!",n,c)),i.once&&(delete i.once,n=Lr("~",n,c)),i.passive&&(delete i.passive,n=Lr("&",n,c)),i.native?(delete i.native,u=t.nativeEvents||(t.nativeEvents={})):u=t.events||(t.events={});var l=Rr({value:r.trim(),dynamic:c},s);i!==e&&(l.modifiers=i);var f=u[n];Array.isArray(f)?o?f.unshift(l):f.push(l):u[n]=f?o?[l,f]:[f,l]:l,t.plain=!1}function Ir(e,t,n){var r=Fr(e,":"+t)||Fr(e,"v-bind:"+t);if(null!=r)return Ar(r);if(!1!==n){var i=Fr(e,t);if(null!=i)return JSON.stringify(i)}}function Fr(e,t,n){var r;if(null!=(r=e.attrsMap[t]))for(var i=e.attrsList,o=0,a=i.length;o<a;o++)if(i[o].name===t){i.splice(o,1);break}return n&&delete e.attrsMap[t],r}function Pr(e,t){for(var n=e.attrsList,r=0,i=n.length;r<i;r++){var o=n[r];if(t.test(o.name))return n.splice(r,1),o}}function Rr(e,t){return t&&(null!=t.start&&(e.start=t.start),null!=t.end&&(e.end=t.end)),e}function Hr(e,t,n){var r=n||{},i=r.number,o="$$v";r.trim&&(o="(typeof $$v === 'string'? $$v.trim(): $$v)"),i&&(o="_n("+o+")");var a=Br(t,o);e.model={value:"("+t+")",expression:JSON.stringify(t),callback:"function ($$v) {"+a+"}"}}function Br(e,t){var n=function(e){if(e=e.trim(),gr=e.length,e.indexOf("[")<0||e.lastIndexOf("]")<gr-1)return($r=e.lastIndexOf("."))>-1?{exp:e.slice(0,$r),key:'"'+e.slice($r+1)+'"'}:{exp:e,key:null};_r=e,$r=wr=Cr=0;for(;!zr();)Vr(br=Ur())?Jr(br):91===br&&Kr(br);return{exp:e.slice(0,wr),key:e.slice(wr+1,Cr)}}(e);return null===n.key?e+"="+t:"$set("+n.exp+", "+n.key+", "+t+")"}function Ur(){return _r.charCodeAt(++$r)}function zr(){return $r>=gr}function Vr(e){return 34===e||39===e}function Kr(e){var t=1;for(wr=$r;!zr();)if(Vr(e=Ur()))Jr(e);else if(91===e&&t++,93===e&&t--,0===t){Cr=$r;break}}function Jr(e){for(var t=e;!zr()&&(e=Ur())!==t;);}var qr,Wr="__r",Zr="__c";function Gr(e,t,n){var r=qr;return function i(){null!==t.apply(null,arguments)&&Qr(e,i,n,r)}}var Xr=Ve&&!(X&&Number(X[1])<=53);function Yr(e,t,n,r){if(Xr){var i=an,o=t;t=o._wrapper=function(e){if(e.target===e.currentTarget||e.timeStamp>=i||e.timeStamp<=0||e.target.ownerDocument!==document)return o.apply(this,arguments)}}qr.addEventListener(e,t,Q?{capture:n,passive:r}:n)}function Qr(e,t,n,r){(r||qr).removeEventListener(e,t._wrapper||t,n)}function ei(e,r){if(!t(e.data.on)||!t(r.data.on)){var i=r.data.on||{},o=e.data.on||{};qr=r.elm,function(e){if(n(e[Wr])){var t=q?"change":"input";e[t]=[].concat(e[Wr],e[t]||[]),delete e[Wr]}n(e[Zr])&&(e.change=[].concat(e[Zr],e.change||[]),delete e[Zr])}(i),rt(i,o,Yr,Qr,Gr,r.context),qr=void 0}}var ti,ni={create:ei,update:ei};function ri(e,r){if(!t(e.data.domProps)||!t(r.data.domProps)){var i,o,a=r.elm,s=e.data.domProps||{},c=r.data.domProps||{};for(i in n(c.__ob__)&&(c=r.data.domProps=A({},c)),s)i in c||(a[i]="");for(i in c){if(o=c[i],"textContent"===i||"innerHTML"===i){if(r.children&&(r.children.length=0),o===s[i])continue;1===a.childNodes.length&&a.removeChild(a.childNodes[0])}if("value"===i&&"PROGRESS"!==a.tagName){a._value=o;var u=t(o)?"":String(o);ii(a,u)&&(a.value=u)}else if("innerHTML"===i&&qn(a.tagName)&&t(a.innerHTML)){(ti=ti||document.createElement("div")).innerHTML="<svg>"+o+"</svg>";for(var l=ti.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;l.firstChild;)a.appendChild(l.firstChild)}else if(o!==s[i])try{a[i]=o}catch(e){}}}}function ii(e,t){return!e.composing&&("OPTION"===e.tagName||function(e,t){var n=!0;try{n=document.activeElement!==e}catch(e){}return n&&e.value!==t}(e,t)||function(e,t){var r=e.value,i=e._vModifiers;if(n(i)){if(i.number)return f(r)!==f(t);if(i.trim)return r.trim()!==t.trim()}return r!==t}(e,t))}var oi={create:ri,update:ri},ai=g(function(e){var t={},n=/:(.+)/;return e.split(/;(?![^(]*\))/g).forEach(function(e){if(e){var r=e.split(n);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t});function si(e){var t=ci(e.style);return e.staticStyle?A(e.staticStyle,t):t}function ci(e){return Array.isArray(e)?O(e):"string"==typeof e?ai(e):e}var ui,li=/^--/,fi=/\s*!important$/,pi=function(e,t,n){if(li.test(t))e.style.setProperty(t,n);else if(fi.test(n))e.style.setProperty(C(t),n.replace(fi,""),"important");else{var r=vi(t);if(Array.isArray(n))for(var i=0,o=n.length;i<o;i++)e.style[r]=n[i];else e.style[r]=n}},di=["Webkit","Moz","ms"],vi=g(function(e){if(ui=ui||document.createElement("div").style,"filter"!==(e=b(e))&&e in ui)return e;for(var t=e.charAt(0).toUpperCase()+e.slice(1),n=0;n<di.length;n++){var r=di[n]+t;if(r in ui)return r}});function hi(e,r){var i=r.data,o=e.data;if(!(t(i.staticStyle)&&t(i.style)&&t(o.staticStyle)&&t(o.style))){var a,s,c=r.elm,u=o.staticStyle,l=o.normalizedStyle||o.style||{},f=u||l,p=ci(r.data.style)||{};r.data.normalizedStyle=n(p.__ob__)?A({},p):p;var d=function(e,t){var n,r={};if(t)for(var i=e;i.componentInstance;)(i=i.componentInstance._vnode)&&i.data&&(n=si(i.data))&&A(r,n);(n=si(e.data))&&A(r,n);for(var o=e;o=o.parent;)o.data&&(n=si(o.data))&&A(r,n);return r}(r,!0);for(s in f)t(d[s])&&pi(c,s,"");for(s in d)(a=d[s])!==f[s]&&pi(c,s,null==a?"":a)}}var mi={create:hi,update:hi},yi=/\s+/;function gi(e,t){if(t&&(t=t.trim()))if(e.classList)t.indexOf(" ")>-1?t.split(yi).forEach(function(t){return e.classList.add(t)}):e.classList.add(t);else{var n=" "+(e.getAttribute("class")||"")+" ";n.indexOf(" "+t+" ")<0&&e.setAttribute("class",(n+t).trim())}}function _i(e,t){if(t&&(t=t.trim()))if(e.classList)t.indexOf(" ")>-1?t.split(yi).forEach(function(t){return e.classList.remove(t)}):e.classList.remove(t),e.classList.length||e.removeAttribute("class");else{for(var n=" "+(e.getAttribute("class")||"")+" ",r=" "+t+" ";n.indexOf(r)>=0;)n=n.replace(r," ");(n=n.trim())?e.setAttribute("class",n):e.removeAttribute("class")}}function bi(e){if(e){if("object"==typeof e){var t={};return!1!==e.css&&A(t,$i(e.name||"v")),A(t,e),t}return"string"==typeof e?$i(e):void 0}}var $i=g(function(e){return{enterClass:e+"-enter",enterToClass:e+"-enter-to",enterActiveClass:e+"-enter-active",leaveClass:e+"-leave",leaveToClass:e+"-leave-to",leaveActiveClass:e+"-leave-active"}}),wi=z&&!W,Ci="transition",xi="animation",ki="transition",Ai="transitionend",Oi="animation",Si="animationend";wi&&(void 0===window.ontransitionend&&void 0!==window.onwebkittransitionend&&(ki="WebkitTransition",Ai="webkitTransitionEnd"),void 0===window.onanimationend&&void 0!==window.onwebkitanimationend&&(Oi="WebkitAnimation",Si="webkitAnimationEnd"));var Ti=z?window.requestAnimationFrame?window.requestAnimationFrame.bind(window):setTimeout:function(e){return e()};function Ei(e){Ti(function(){Ti(e)})}function Ni(e,t){var n=e._transitionClasses||(e._transitionClasses=[]);n.indexOf(t)<0&&(n.push(t),gi(e,t))}function ji(e,t){e._transitionClasses&&h(e._transitionClasses,t),_i(e,t)}function Di(e,t,n){var r=Mi(e,t),i=r.type,o=r.timeout,a=r.propCount;if(!i)return n();var s=i===Ci?Ai:Si,c=0,u=function(){e.removeEventListener(s,l),n()},l=function(t){t.target===e&&++c>=a&&u()};setTimeout(function(){c<a&&u()},o+1),e.addEventListener(s,l)}var Li=/\b(transform|all)(,|$)/;function Mi(e,t){var n,r=window.getComputedStyle(e),i=(r[ki+"Delay"]||"").split(", "),o=(r[ki+"Duration"]||"").split(", "),a=Ii(i,o),s=(r[Oi+"Delay"]||"").split(", "),c=(r[Oi+"Duration"]||"").split(", "),u=Ii(s,c),l=0,f=0;return t===Ci?a>0&&(n=Ci,l=a,f=o.length):t===xi?u>0&&(n=xi,l=u,f=c.length):f=(n=(l=Math.max(a,u))>0?a>u?Ci:xi:null)?n===Ci?o.length:c.length:0,{type:n,timeout:l,propCount:f,hasTransform:n===Ci&&Li.test(r[ki+"Property"])}}function Ii(e,t){for(;e.length<t.length;)e=e.concat(e);return Math.max.apply(null,t.map(function(t,n){return Fi(t)+Fi(e[n])}))}function Fi(e){return 1e3*Number(e.slice(0,-1).replace(",","."))}function Pi(e,r){var i=e.elm;n(i._leaveCb)&&(i._leaveCb.cancelled=!0,i._leaveCb());var a=bi(e.data.transition);if(!t(a)&&!n(i._enterCb)&&1===i.nodeType){for(var s=a.css,c=a.type,u=a.enterClass,l=a.enterToClass,p=a.enterActiveClass,d=a.appearClass,v=a.appearToClass,h=a.appearActiveClass,m=a.beforeEnter,y=a.enter,g=a.afterEnter,_=a.enterCancelled,b=a.beforeAppear,$=a.appear,w=a.afterAppear,C=a.appearCancelled,x=a.duration,k=Wt,A=Wt.$vnode;A&&A.parent;)k=A.context,A=A.parent;var O=!k._isMounted||!e.isRootInsert;if(!O||$||""===$){var S=O&&d?d:u,T=O&&h?h:p,E=O&&v?v:l,N=O&&b||m,j=O&&"function"==typeof $?$:y,L=O&&w||g,M=O&&C||_,I=f(o(x)?x.enter:x),F=!1!==s&&!W,P=Bi(j),R=i._enterCb=D(function(){F&&(ji(i,E),ji(i,T)),R.cancelled?(F&&ji(i,S),M&&M(i)):L&&L(i),i._enterCb=null});e.data.show||it(e,"insert",function(){var t=i.parentNode,n=t&&t._pending&&t._pending[e.key];n&&n.tag===e.tag&&n.elm._leaveCb&&n.elm._leaveCb(),j&&j(i,R)}),N&&N(i),F&&(Ni(i,S),Ni(i,T),Ei(function(){ji(i,S),R.cancelled||(Ni(i,E),P||(Hi(I)?setTimeout(R,I):Di(i,c,R)))})),e.data.show&&(r&&r(),j&&j(i,R)),F||P||R()}}}function Ri(e,r){var i=e.elm;n(i._enterCb)&&(i._enterCb.cancelled=!0,i._enterCb());var a=bi(e.data.transition);if(t(a)||1!==i.nodeType)return r();if(!n(i._leaveCb)){var s=a.css,c=a.type,u=a.leaveClass,l=a.leaveToClass,p=a.leaveActiveClass,d=a.beforeLeave,v=a.leave,h=a.afterLeave,m=a.leaveCancelled,y=a.delayLeave,g=a.duration,_=!1!==s&&!W,b=Bi(v),$=f(o(g)?g.leave:g),w=i._leaveCb=D(function(){i.parentNode&&i.parentNode._pending&&(i.parentNode._pending[e.key]=null),_&&(ji(i,l),ji(i,p)),w.cancelled?(_&&ji(i,u),m&&m(i)):(r(),h&&h(i)),i._leaveCb=null});y?y(C):C()}function C(){w.cancelled||(!e.data.show&&i.parentNode&&((i.parentNode._pending||(i.parentNode._pending={}))[e.key]=e),d&&d(i),_&&(Ni(i,u),Ni(i,p),Ei(function(){ji(i,u),w.cancelled||(Ni(i,l),b||(Hi($)?setTimeout(w,$):Di(i,c,w)))})),v&&v(i,w),_||b||w())}}function Hi(e){return"number"==typeof e&&!isNaN(e)}function Bi(e){if(t(e))return!1;var r=e.fns;return n(r)?Bi(Array.isArray(r)?r[0]:r):(e._length||e.length)>1}function Ui(e,t){!0!==t.data.show&&Pi(t)}var zi=function(e){var o,a,s={},c=e.modules,u=e.nodeOps;for(o=0;o<rr.length;++o)for(s[rr[o]]=[],a=0;a<c.length;++a)n(c[a][rr[o]])&&s[rr[o]].push(c[a][rr[o]]);function l(e){var t=u.parentNode(e);n(t)&&u.removeChild(t,e)}function f(e,t,i,o,a,c,l){if(n(e.elm)&&n(c)&&(e=c[l]=me(e)),e.isRootInsert=!a,!function(e,t,i,o){var a=e.data;if(n(a)){var c=n(e.componentInstance)&&a.keepAlive;if(n(a=a.hook)&&n(a=a.init)&&a(e,!1),n(e.componentInstance))return d(e,t),v(i,e.elm,o),r(c)&&function(e,t,r,i){for(var o,a=e;a.componentInstance;)if(a=a.componentInstance._vnode,n(o=a.data)&&n(o=o.transition)){for(o=0;o<s.activate.length;++o)s.activate[o](nr,a);t.push(a);break}v(r,e.elm,i)}(e,t,i,o),!0}}(e,t,i,o)){var f=e.data,p=e.children,m=e.tag;n(m)?(e.elm=e.ns?u.createElementNS(e.ns,m):u.createElement(m,e),g(e),h(e,p,t),n(f)&&y(e,t),v(i,e.elm,o)):r(e.isComment)?(e.elm=u.createComment(e.text),v(i,e.elm,o)):(e.elm=u.createTextNode(e.text),v(i,e.elm,o))}}function d(e,t){n(e.data.pendingInsert)&&(t.push.apply(t,e.data.pendingInsert),e.data.pendingInsert=null),e.elm=e.componentInstance.$el,m(e)?(y(e,t),g(e)):(tr(e),t.push(e))}function v(e,t,r){n(e)&&(n(r)?u.parentNode(r)===e&&u.insertBefore(e,t,r):u.appendChild(e,t))}function h(e,t,n){if(Array.isArray(t))for(var r=0;r<t.length;++r)f(t[r],n,e.elm,null,!0,t,r);else i(e.text)&&u.appendChild(e.elm,u.createTextNode(String(e.text)))}function m(e){for(;e.componentInstance;)e=e.componentInstance._vnode;return n(e.tag)}function y(e,t){for(var r=0;r<s.create.length;++r)s.create[r](nr,e);n(o=e.data.hook)&&(n(o.create)&&o.create(nr,e),n(o.insert)&&t.push(e))}function g(e){var t;if(n(t=e.fnScopeId))u.setStyleScope(e.elm,t);else for(var r=e;r;)n(t=r.context)&&n(t=t.$options._scopeId)&&u.setStyleScope(e.elm,t),r=r.parent;n(t=Wt)&&t!==e.context&&t!==e.fnContext&&n(t=t.$options._scopeId)&&u.setStyleScope(e.elm,t)}function _(e,t,n,r,i,o){for(;r<=i;++r)f(n[r],o,e,t,!1,n,r)}function b(e){var t,r,i=e.data;if(n(i))for(n(t=i.hook)&&n(t=t.destroy)&&t(e),t=0;t<s.destroy.length;++t)s.destroy[t](e);if(n(t=e.children))for(r=0;r<e.children.length;++r)b(e.children[r])}function $(e,t,r,i){for(;r<=i;++r){var o=t[r];n(o)&&(n(o.tag)?(w(o),b(o)):l(o.elm))}}function w(e,t){if(n(t)||n(e.data)){var r,i=s.remove.length+1;for(n(t)?t.listeners+=i:t=function(e,t){function n(){0==--n.listeners&&l(e)}return n.listeners=t,n}(e.elm,i),n(r=e.componentInstance)&&n(r=r._vnode)&&n(r.data)&&w(r,t),r=0;r<s.remove.length;++r)s.remove[r](e,t);n(r=e.data.hook)&&n(r=r.remove)?r(e,t):t()}else l(e.elm)}function C(e,t,r,i){for(var o=r;o<i;o++){var a=t[o];if(n(a)&&ir(e,a))return o}}function x(e,i,o,a,c,l){if(e!==i){n(i.elm)&&n(a)&&(i=a[c]=me(i));var p=i.elm=e.elm;if(r(e.isAsyncPlaceholder))n(i.asyncFactory.resolved)?O(e.elm,i,o):i.isAsyncPlaceholder=!0;else if(r(i.isStatic)&&r(e.isStatic)&&i.key===e.key&&(r(i.isCloned)||r(i.isOnce)))i.componentInstance=e.componentInstance;else{var d,v=i.data;n(v)&&n(d=v.hook)&&n(d=d.prepatch)&&d(e,i);var h=e.children,y=i.children;if(n(v)&&m(i)){for(d=0;d<s.update.length;++d)s.update[d](e,i);n(d=v.hook)&&n(d=d.update)&&d(e,i)}t(i.text)?n(h)&&n(y)?h!==y&&function(e,r,i,o,a){for(var s,c,l,p=0,d=0,v=r.length-1,h=r[0],m=r[v],y=i.length-1,g=i[0],b=i[y],w=!a;p<=v&&d<=y;)t(h)?h=r[++p]:t(m)?m=r[--v]:ir(h,g)?(x(h,g,o,i,d),h=r[++p],g=i[++d]):ir(m,b)?(x(m,b,o,i,y),m=r[--v],b=i[--y]):ir(h,b)?(x(h,b,o,i,y),w&&u.insertBefore(e,h.elm,u.nextSibling(m.elm)),h=r[++p],b=i[--y]):ir(m,g)?(x(m,g,o,i,d),w&&u.insertBefore(e,m.elm,h.elm),m=r[--v],g=i[++d]):(t(s)&&(s=or(r,p,v)),t(c=n(g.key)?s[g.key]:C(g,r,p,v))?f(g,o,e,h.elm,!1,i,d):ir(l=r[c],g)?(x(l,g,o,i,d),r[c]=void 0,w&&u.insertBefore(e,l.elm,h.elm)):f(g,o,e,h.elm,!1,i,d),g=i[++d]);p>v?_(e,t(i[y+1])?null:i[y+1].elm,i,d,y,o):d>y&&$(0,r,p,v)}(p,h,y,o,l):n(y)?(n(e.text)&&u.setTextContent(p,""),_(p,null,y,0,y.length-1,o)):n(h)?$(0,h,0,h.length-1):n(e.text)&&u.setTextContent(p,""):e.text!==i.text&&u.setTextContent(p,i.text),n(v)&&n(d=v.hook)&&n(d=d.postpatch)&&d(e,i)}}}function k(e,t,i){if(r(i)&&n(e.parent))e.parent.data.pendingInsert=t;else for(var o=0;o<t.length;++o)t[o].data.hook.insert(t[o])}var A=p("attrs,class,staticClass,staticStyle,key");function O(e,t,i,o){var a,s=t.tag,c=t.data,u=t.children;if(o=o||c&&c.pre,t.elm=e,r(t.isComment)&&n(t.asyncFactory))return t.isAsyncPlaceholder=!0,!0;if(n(c)&&(n(a=c.hook)&&n(a=a.init)&&a(t,!0),n(a=t.componentInstance)))return d(t,i),!0;if(n(s)){if(n(u))if(e.hasChildNodes())if(n(a=c)&&n(a=a.domProps)&&n(a=a.innerHTML)){if(a!==e.innerHTML)return!1}else{for(var l=!0,f=e.firstChild,p=0;p<u.length;p++){if(!f||!O(f,u[p],i,o)){l=!1;break}f=f.nextSibling}if(!l||f)return!1}else h(t,u,i);if(n(c)){var v=!1;for(var m in c)if(!A(m)){v=!0,y(t,i);break}!v&&c.class&&et(c.class)}}else e.data!==t.text&&(e.data=t.text);return!0}return function(e,i,o,a){if(!t(i)){var c,l=!1,p=[];if(t(e))l=!0,f(i,p);else{var d=n(e.nodeType);if(!d&&ir(e,i))x(e,i,p,null,null,a);else{if(d){if(1===e.nodeType&&e.hasAttribute(L)&&(e.removeAttribute(L),o=!0),r(o)&&O(e,i,p))return k(i,p,!0),e;c=e,e=new pe(u.tagName(c).toLowerCase(),{},[],void 0,c)}var v=e.elm,h=u.parentNode(v);if(f(i,p,v._leaveCb?null:h,u.nextSibling(v)),n(i.parent))for(var y=i.parent,g=m(i);y;){for(var _=0;_<s.destroy.length;++_)s.destroy[_](y);if(y.elm=i.elm,g){for(var w=0;w<s.create.length;++w)s.create[w](nr,y);var C=y.data.hook.insert;if(C.merged)for(var A=1;A<C.fns.length;A++)C.fns[A]()}else tr(y);y=y.parent}n(h)?$(0,[e],0,0):n(e.tag)&&b(e)}}return k(i,p,l),i.elm}n(e)&&b(e)}}({nodeOps:Qn,modules:[mr,xr,ni,oi,mi,z?{create:Ui,activate:Ui,remove:function(e,t){!0!==e.data.show?Ri(e,t):t()}}:{}].concat(pr)});W&&document.addEventListener("selectionchange",function(){var e=document.activeElement;e&&e.vmodel&&Xi(e,"input")});var Vi={inserted:function(e,t,n,r){"select"===n.tag?(r.elm&&!r.elm._vOptions?it(n,"postpatch",function(){Vi.componentUpdated(e,t,n)}):Ki(e,t,n.context),e._vOptions=[].map.call(e.options,Wi)):("textarea"===n.tag||Xn(e.type))&&(e._vModifiers=t.modifiers,t.modifiers.lazy||(e.addEventListener("compositionstart",Zi),e.addEventListener("compositionend",Gi),e.addEventListener("change",Gi),W&&(e.vmodel=!0)))},componentUpdated:function(e,t,n){if("select"===n.tag){Ki(e,t,n.context);var r=e._vOptions,i=e._vOptions=[].map.call(e.options,Wi);if(i.some(function(e,t){return!N(e,r[t])}))(e.multiple?t.value.some(function(e){return qi(e,i)}):t.value!==t.oldValue&&qi(t.value,i))&&Xi(e,"change")}}};function Ki(e,t,n){Ji(e,t,n),(q||Z)&&setTimeout(function(){Ji(e,t,n)},0)}function Ji(e,t,n){var r=t.value,i=e.multiple;if(!i||Array.isArray(r)){for(var o,a,s=0,c=e.options.length;s<c;s++)if(a=e.options[s],i)o=j(r,Wi(a))>-1,a.selected!==o&&(a.selected=o);else if(N(Wi(a),r))return void(e.selectedIndex!==s&&(e.selectedIndex=s));i||(e.selectedIndex=-1)}}function qi(e,t){return t.every(function(t){return!N(t,e)})}function Wi(e){return"_value"in e?e._value:e.value}function Zi(e){e.target.composing=!0}function Gi(e){e.target.composing&&(e.target.composing=!1,Xi(e.target,"input"))}function Xi(e,t){var n=document.createEvent("HTMLEvents");n.initEvent(t,!0,!0),e.dispatchEvent(n)}function Yi(e){return!e.componentInstance||e.data&&e.data.transition?e:Yi(e.componentInstance._vnode)}var Qi={model:Vi,show:{bind:function(e,t,n){var r=t.value,i=(n=Yi(n)).data&&n.data.transition,o=e.__vOriginalDisplay="none"===e.style.display?"":e.style.display;r&&i?(n.data.show=!0,Pi(n,function(){e.style.display=o})):e.style.display=r?o:"none"},update:function(e,t,n){var r=t.value;!r!=!t.oldValue&&((n=Yi(n)).data&&n.data.transition?(n.data.show=!0,r?Pi(n,function(){e.style.display=e.__vOriginalDisplay}):Ri(n,function(){e.style.display="none"})):e.style.display=r?e.__vOriginalDisplay:"none")},unbind:function(e,t,n,r,i){i||(e.style.display=e.__vOriginalDisplay)}}},eo={name:String,appear:Boolean,css:Boolean,mode:String,type:String,enterClass:String,leaveClass:String,enterToClass:String,leaveToClass:String,enterActiveClass:String,leaveActiveClass:String,appearClass:String,appearActiveClass:String,appearToClass:String,duration:[Number,String,Object]};function to(e){var t=e&&e.componentOptions;return t&&t.Ctor.options.abstract?to(zt(t.children)):e}function no(e){var t={},n=e.$options;for(var r in n.propsData)t[r]=e[r];var i=n._parentListeners;for(var o in i)t[b(o)]=i[o];return t}function ro(e,t){if(/\d-keep-alive$/.test(t.tag))return e("keep-alive",{props:t.componentOptions.propsData})}var io=function(e){return e.tag||Ut(e)},oo=function(e){return"show"===e.name},ao={name:"transition",props:eo,abstract:!0,render:function(e){var t=this,n=this.$slots.default;if(n&&(n=n.filter(io)).length){var r=this.mode,o=n[0];if(function(e){for(;e=e.parent;)if(e.data.transition)return!0}(this.$vnode))return o;var a=to(o);if(!a)return o;if(this._leaving)return ro(e,o);var s="__transition-"+this._uid+"-";a.key=null==a.key?a.isComment?s+"comment":s+a.tag:i(a.key)?0===String(a.key).indexOf(s)?a.key:s+a.key:a.key;var c=(a.data||(a.data={})).transition=no(this),u=this._vnode,l=to(u);if(a.data.directives&&a.data.directives.some(oo)&&(a.data.show=!0),l&&l.data&&!function(e,t){return t.key===e.key&&t.tag===e.tag}(a,l)&&!Ut(l)&&(!l.componentInstance||!l.componentInstance._vnode.isComment)){var f=l.data.transition=A({},c);if("out-in"===r)return this._leaving=!0,it(f,"afterLeave",function(){t._leaving=!1,t.$forceUpdate()}),ro(e,o);if("in-out"===r){if(Ut(a))return u;var p,d=function(){p()};it(c,"afterEnter",d),it(c,"enterCancelled",d),it(f,"delayLeave",function(e){p=e})}}return o}}},so=A({tag:String,moveClass:String},eo);function co(e){e.elm._moveCb&&e.elm._moveCb(),e.elm._enterCb&&e.elm._enterCb()}function uo(e){e.data.newPos=e.elm.getBoundingClientRect()}function lo(e){var t=e.data.pos,n=e.data.newPos,r=t.left-n.left,i=t.top-n.top;if(r||i){e.data.moved=!0;var o=e.elm.style;o.transform=o.WebkitTransform="translate("+r+"px,"+i+"px)",o.transitionDuration="0s"}}delete so.mode;var fo={Transition:ao,TransitionGroup:{props:so,beforeMount:function(){var e=this,t=this._update;this._update=function(n,r){var i=Zt(e);e.__patch__(e._vnode,e.kept,!1,!0),e._vnode=e.kept,i(),t.call(e,n,r)}},render:function(e){for(var t=this.tag||this.$vnode.data.tag||"span",n=Object.create(null),r=this.prevChildren=this.children,i=this.$slots.default||[],o=this.children=[],a=no(this),s=0;s<i.length;s++){var c=i[s];c.tag&&null!=c.key&&0!==String(c.key).indexOf("__vlist")&&(o.push(c),n[c.key]=c,(c.data||(c.data={})).transition=a)}if(r){for(var u=[],l=[],f=0;f<r.length;f++){var p=r[f];p.data.transition=a,p.data.pos=p.elm.getBoundingClientRect(),n[p.key]?u.push(p):l.push(p)}this.kept=e(t,null,u),this.removed=l}return e(t,null,o)},updated:function(){var e=this.prevChildren,t=this.moveClass||(this.name||"v")+"-move";e.length&&this.hasMove(e[0].elm,t)&&(e.forEach(co),e.forEach(uo),e.forEach(lo),this._reflow=document.body.offsetHeight,e.forEach(function(e){if(e.data.moved){var n=e.elm,r=n.style;Ni(n,t),r.transform=r.WebkitTransform=r.transitionDuration="",n.addEventListener(Ai,n._moveCb=function e(r){r&&r.target!==n||r&&!/transform$/.test(r.propertyName)||(n.removeEventListener(Ai,e),n._moveCb=null,ji(n,t))})}}))},methods:{hasMove:function(e,t){if(!wi)return!1;if(this._hasMove)return this._hasMove;var n=e.cloneNode();e._transitionClasses&&e._transitionClasses.forEach(function(e){_i(n,e)}),gi(n,t),n.style.display="none",this.$el.appendChild(n);var r=Mi(n);return this.$el.removeChild(n),this._hasMove=r.hasTransform}}}};wn.config.mustUseProp=jn,wn.config.isReservedTag=Wn,wn.config.isReservedAttr=En,wn.config.getTagNamespace=Zn,wn.config.isUnknownElement=function(e){if(!z)return!0;if(Wn(e))return!1;if(e=e.toLowerCase(),null!=Gn[e])return Gn[e];var t=document.createElement(e);return e.indexOf("-")>-1?Gn[e]=t.constructor===window.HTMLUnknownElement||t.constructor===window.HTMLElement:Gn[e]=/HTMLUnknownElement/.test(t.toString())},A(wn.options.directives,Qi),A(wn.options.components,fo),wn.prototype.__patch__=z?zi:S,wn.prototype.$mount=function(e,t){return function(e,t,n){var r;return e.$el=t,e.$options.render||(e.$options.render=ve),Yt(e,"beforeMount"),r=function(){e._update(e._render(),n)},new fn(e,r,S,{before:function(){e._isMounted&&!e._isDestroyed&&Yt(e,"beforeUpdate")}},!0),n=!1,null==e.$vnode&&(e._isMounted=!0,Yt(e,"mounted")),e}(this,e=e&&z?Yn(e):void 0,t)},z&&setTimeout(function(){F.devtools&&ne&&ne.emit("init",wn)},0);var po=/\{\{((?:.|\r?\n)+?)\}\}/g,vo=/[-.*+?^${}()|[\]\/\\]/g,ho=g(function(e){var t=e[0].replace(vo,"\\$&"),n=e[1].replace(vo,"\\$&");return new RegExp(t+"((?:.|\\n)+?)"+n,"g")});var mo={staticKeys:["staticClass"],transformNode:function(e,t){t.warn;var n=Fr(e,"class");n&&(e.staticClass=JSON.stringify(n));var r=Ir(e,"class",!1);r&&(e.classBinding=r)},genData:function(e){var t="";return e.staticClass&&(t+="staticClass:"+e.staticClass+","),e.classBinding&&(t+="class:"+e.classBinding+","),t}};var yo,go={staticKeys:["staticStyle"],transformNode:function(e,t){t.warn;var n=Fr(e,"style");n&&(e.staticStyle=JSON.stringify(ai(n)));var r=Ir(e,"style",!1);r&&(e.styleBinding=r)},genData:function(e){var t="";return e.staticStyle&&(t+="staticStyle:"+e.staticStyle+","),e.styleBinding&&(t+="style:("+e.styleBinding+"),"),t}},_o=function(e){return(yo=yo||document.createElement("div")).innerHTML=e,yo.textContent},bo=p("area,base,br,col,embed,frame,hr,img,input,isindex,keygen,link,meta,param,source,track,wbr"),$o=p("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source"),wo=p("address,article,aside,base,blockquote,body,caption,col,colgroup,dd,details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,title,tr,track"),Co=/^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,xo=/^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/,ko="[a-zA-Z_][\\-\\.0-9_a-zA-Z"+P.source+"]*",Ao="((?:"+ko+"\\:)?"+ko+")",Oo=new RegExp("^<"+Ao),So=/^\s*(\/?)>/,To=new RegExp("^<\\/"+Ao+"[^>]*>"),Eo=/^<!DOCTYPE [^>]+>/i,No=/^<!\--/,jo=/^<!\[/,Do=p("script,style,textarea",!0),Lo={},Mo={"&lt;":"<","&gt;":">","&quot;":'"',"&amp;":"&","&#10;":"\n","&#9;":"\t","&#39;":"'"},Io=/&(?:lt|gt|quot|amp|#39);/g,Fo=/&(?:lt|gt|quot|amp|#39|#10|#9);/g,Po=p("pre,textarea",!0),Ro=function(e,t){return e&&Po(e)&&"\n"===t[0]};function Ho(e,t){var n=t?Fo:Io;return e.replace(n,function(e){return Mo[e]})}var Bo,Uo,zo,Vo,Ko,Jo,qo,Wo,Zo=/^@|^v-on:/,Go=/^v-|^@|^:/,Xo=/([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,Yo=/,([^,\}\]]*)(?:,([^,\}\]]*))?$/,Qo=/^\(|\)$/g,ea=/^\[.*\]$/,ta=/:(.*)$/,na=/^:|^\.|^v-bind:/,ra=/\.[^.\]]+(?=[^\]]*$)/g,ia=/^v-slot(:|$)|^#/,oa=/[\r\n]/,aa=/\s+/g,sa=g(_o),ca="_empty_";function ua(e,t,n){return{type:1,tag:e,attrsList:t,attrsMap:ma(t),rawAttrsMap:{},parent:n,children:[]}}function la(e,t){Bo=t.warn||Sr,Jo=t.isPreTag||T,qo=t.mustUseProp||T,Wo=t.getTagNamespace||T;t.isReservedTag;zo=Tr(t.modules,"transformNode"),Vo=Tr(t.modules,"preTransformNode"),Ko=Tr(t.modules,"postTransformNode"),Uo=t.delimiters;var n,r,i=[],o=!1!==t.preserveWhitespace,a=t.whitespace,s=!1,c=!1;function u(e){if(l(e),s||e.processed||(e=fa(e,t)),i.length||e===n||n.if&&(e.elseif||e.else)&&da(n,{exp:e.elseif,block:e}),r&&!e.forbidden)if(e.elseif||e.else)a=e,(u=function(e){var t=e.length;for(;t--;){if(1===e[t].type)return e[t];e.pop()}}(r.children))&&u.if&&da(u,{exp:a.elseif,block:a});else{if(e.slotScope){var o=e.slotTarget||'"default"';(r.scopedSlots||(r.scopedSlots={}))[o]=e}r.children.push(e),e.parent=r}var a,u;e.children=e.children.filter(function(e){return!e.slotScope}),l(e),e.pre&&(s=!1),Jo(e.tag)&&(c=!1);for(var f=0;f<Ko.length;f++)Ko[f](e,t)}function l(e){if(!c)for(var t;(t=e.children[e.children.length-1])&&3===t.type&&" "===t.text;)e.children.pop()}return function(e,t){for(var n,r,i=[],o=t.expectHTML,a=t.isUnaryTag||T,s=t.canBeLeftOpenTag||T,c=0;e;){if(n=e,r&&Do(r)){var u=0,l=r.toLowerCase(),f=Lo[l]||(Lo[l]=new RegExp("([\\s\\S]*?)(</"+l+"[^>]*>)","i")),p=e.replace(f,function(e,n,r){return u=r.length,Do(l)||"noscript"===l||(n=n.replace(/<!\--([\s\S]*?)-->/g,"$1").replace(/<!\[CDATA\[([\s\S]*?)]]>/g,"$1")),Ro(l,n)&&(n=n.slice(1)),t.chars&&t.chars(n),""});c+=e.length-p.length,e=p,A(l,c-u,c)}else{var d=e.indexOf("<");if(0===d){if(No.test(e)){var v=e.indexOf("--\x3e");if(v>=0){t.shouldKeepComment&&t.comment(e.substring(4,v),c,c+v+3),C(v+3);continue}}if(jo.test(e)){var h=e.indexOf("]>");if(h>=0){C(h+2);continue}}var m=e.match(Eo);if(m){C(m[0].length);continue}var y=e.match(To);if(y){var g=c;C(y[0].length),A(y[1],g,c);continue}var _=x();if(_){k(_),Ro(_.tagName,e)&&C(1);continue}}var b=void 0,$=void 0,w=void 0;if(d>=0){for($=e.slice(d);!(To.test($)||Oo.test($)||No.test($)||jo.test($)||(w=$.indexOf("<",1))<0);)d+=w,$=e.slice(d);b=e.substring(0,d)}d<0&&(b=e),b&&C(b.length),t.chars&&b&&t.chars(b,c-b.length,c)}if(e===n){t.chars&&t.chars(e);break}}function C(t){c+=t,e=e.substring(t)}function x(){var t=e.match(Oo);if(t){var n,r,i={tagName:t[1],attrs:[],start:c};for(C(t[0].length);!(n=e.match(So))&&(r=e.match(xo)||e.match(Co));)r.start=c,C(r[0].length),r.end=c,i.attrs.push(r);if(n)return i.unarySlash=n[1],C(n[0].length),i.end=c,i}}function k(e){var n=e.tagName,c=e.unarySlash;o&&("p"===r&&wo(n)&&A(r),s(n)&&r===n&&A(n));for(var u=a(n)||!!c,l=e.attrs.length,f=new Array(l),p=0;p<l;p++){var d=e.attrs[p],v=d[3]||d[4]||d[5]||"",h="a"===n&&"href"===d[1]?t.shouldDecodeNewlinesForHref:t.shouldDecodeNewlines;f[p]={name:d[1],value:Ho(v,h)}}u||(i.push({tag:n,lowerCasedTag:n.toLowerCase(),attrs:f,start:e.start,end:e.end}),r=n),t.start&&t.start(n,f,u,e.start,e.end)}function A(e,n,o){var a,s;if(null==n&&(n=c),null==o&&(o=c),e)for(s=e.toLowerCase(),a=i.length-1;a>=0&&i[a].lowerCasedTag!==s;a--);else a=0;if(a>=0){for(var u=i.length-1;u>=a;u--)t.end&&t.end(i[u].tag,n,o);i.length=a,r=a&&i[a-1].tag}else"br"===s?t.start&&t.start(e,[],!0,n,o):"p"===s&&(t.start&&t.start(e,[],!1,n,o),t.end&&t.end(e,n,o))}A()}(e,{warn:Bo,expectHTML:t.expectHTML,isUnaryTag:t.isUnaryTag,canBeLeftOpenTag:t.canBeLeftOpenTag,shouldDecodeNewlines:t.shouldDecodeNewlines,shouldDecodeNewlinesForHref:t.shouldDecodeNewlinesForHref,shouldKeepComment:t.comments,outputSourceRange:t.outputSourceRange,start:function(e,o,a,l,f){var p=r&&r.ns||Wo(e);q&&"svg"===p&&(o=function(e){for(var t=[],n=0;n<e.length;n++){var r=e[n];ya.test(r.name)||(r.name=r.name.replace(ga,""),t.push(r))}return t}(o));var d,v=ua(e,o,r);p&&(v.ns=p),"style"!==(d=v).tag&&("script"!==d.tag||d.attrsMap.type&&"text/javascript"!==d.attrsMap.type)||te()||(v.forbidden=!0);for(var h=0;h<Vo.length;h++)v=Vo[h](v,t)||v;s||(!function(e){null!=Fr(e,"v-pre")&&(e.pre=!0)}(v),v.pre&&(s=!0)),Jo(v.tag)&&(c=!0),s?function(e){var t=e.attrsList,n=t.length;if(n)for(var r=e.attrs=new Array(n),i=0;i<n;i++)r[i]={name:t[i].name,value:JSON.stringify(t[i].value)},null!=t[i].start&&(r[i].start=t[i].start,r[i].end=t[i].end);else e.pre||(e.plain=!0)}(v):v.processed||(pa(v),function(e){var t=Fr(e,"v-if");if(t)e.if=t,da(e,{exp:t,block:e});else{null!=Fr(e,"v-else")&&(e.else=!0);var n=Fr(e,"v-else-if");n&&(e.elseif=n)}}(v),function(e){null!=Fr(e,"v-once")&&(e.once=!0)}(v)),n||(n=v),a?u(v):(r=v,i.push(v))},end:function(e,t,n){var o=i[i.length-1];i.length-=1,r=i[i.length-1],u(o)},chars:function(e,t,n){if(r&&(!q||"textarea"!==r.tag||r.attrsMap.placeholder!==e)){var i,u,l,f=r.children;if(e=c||e.trim()?"script"===(i=r).tag||"style"===i.tag?e:sa(e):f.length?a?"condense"===a&&oa.test(e)?"":" ":o?" ":"":"")c||"condense"!==a||(e=e.replace(aa," ")),!s&&" "!==e&&(u=function(e,t){var n=t?ho(t):po;if(n.test(e)){for(var r,i,o,a=[],s=[],c=n.lastIndex=0;r=n.exec(e);){(i=r.index)>c&&(s.push(o=e.slice(c,i)),a.push(JSON.stringify(o)));var u=Ar(r[1].trim());a.push("_s("+u+")"),s.push({"@binding":u}),c=i+r[0].length}return c<e.length&&(s.push(o=e.slice(c)),a.push(JSON.stringify(o))),{expression:a.join("+"),tokens:s}}}(e,Uo))?l={type:2,expression:u.expression,tokens:u.tokens,text:e}:" "===e&&f.length&&" "===f[f.length-1].text||(l={type:3,text:e}),l&&f.push(l)}},comment:function(e,t,n){if(r){var i={type:3,text:e,isComment:!0};r.children.push(i)}}}),n}function fa(e,t){var n,r;(r=Ir(n=e,"key"))&&(n.key=r),e.plain=!e.key&&!e.scopedSlots&&!e.attrsList.length,function(e){var t=Ir(e,"ref");t&&(e.ref=t,e.refInFor=function(e){var t=e;for(;t;){if(void 0!==t.for)return!0;t=t.parent}return!1}(e))}(e),function(e){var t;"template"===e.tag?(t=Fr(e,"scope"),e.slotScope=t||Fr(e,"slot-scope")):(t=Fr(e,"slot-scope"))&&(e.slotScope=t);var n=Ir(e,"slot");n&&(e.slotTarget='""'===n?'"default"':n,e.slotTargetDynamic=!(!e.attrsMap[":slot"]&&!e.attrsMap["v-bind:slot"]),"template"===e.tag||e.slotScope||Nr(e,"slot",n,function(e,t){return e.rawAttrsMap[":"+t]||e.rawAttrsMap["v-bind:"+t]||e.rawAttrsMap[t]}(e,"slot")));if("template"===e.tag){var r=Pr(e,ia);if(r){var i=va(r),o=i.name,a=i.dynamic;e.slotTarget=o,e.slotTargetDynamic=a,e.slotScope=r.value||ca}}else{var s=Pr(e,ia);if(s){var c=e.scopedSlots||(e.scopedSlots={}),u=va(s),l=u.name,f=u.dynamic,p=c[l]=ua("template",[],e);p.slotTarget=l,p.slotTargetDynamic=f,p.children=e.children.filter(function(e){if(!e.slotScope)return e.parent=p,!0}),p.slotScope=s.value||ca,e.children=[],e.plain=!1}}}(e),function(e){"slot"===e.tag&&(e.slotName=Ir(e,"name"))}(e),function(e){var t;(t=Ir(e,"is"))&&(e.component=t);null!=Fr(e,"inline-template")&&(e.inlineTemplate=!0)}(e);for(var i=0;i<zo.length;i++)e=zo[i](e,t)||e;return function(e){var t,n,r,i,o,a,s,c,u=e.attrsList;for(t=0,n=u.length;t<n;t++)if(r=i=u[t].name,o=u[t].value,Go.test(r))if(e.hasBindings=!0,(a=ha(r.replace(Go,"")))&&(r=r.replace(ra,"")),na.test(r))r=r.replace(na,""),o=Ar(o),(c=ea.test(r))&&(r=r.slice(1,-1)),a&&(a.prop&&!c&&"innerHtml"===(r=b(r))&&(r="innerHTML"),a.camel&&!c&&(r=b(r)),a.sync&&(s=Br(o,"$event"),c?Mr(e,'"update:"+('+r+")",s,null,!1,0,u[t],!0):(Mr(e,"update:"+b(r),s,null,!1,0,u[t]),C(r)!==b(r)&&Mr(e,"update:"+C(r),s,null,!1,0,u[t])))),a&&a.prop||!e.component&&qo(e.tag,e.attrsMap.type,r)?Er(e,r,o,u[t],c):Nr(e,r,o,u[t],c);else if(Zo.test(r))r=r.replace(Zo,""),(c=ea.test(r))&&(r=r.slice(1,-1)),Mr(e,r,o,a,!1,0,u[t],c);else{var l=(r=r.replace(Go,"")).match(ta),f=l&&l[1];c=!1,f&&(r=r.slice(0,-(f.length+1)),ea.test(f)&&(f=f.slice(1,-1),c=!0)),Dr(e,r,i,o,f,c,a,u[t])}else Nr(e,r,JSON.stringify(o),u[t]),!e.component&&"muted"===r&&qo(e.tag,e.attrsMap.type,r)&&Er(e,r,"true",u[t])}(e),e}function pa(e){var t;if(t=Fr(e,"v-for")){var n=function(e){var t=e.match(Xo);if(!t)return;var n={};n.for=t[2].trim();var r=t[1].trim().replace(Qo,""),i=r.match(Yo);i?(n.alias=r.replace(Yo,"").trim(),n.iterator1=i[1].trim(),i[2]&&(n.iterator2=i[2].trim())):n.alias=r;return n}(t);n&&A(e,n)}}function da(e,t){e.ifConditions||(e.ifConditions=[]),e.ifConditions.push(t)}function va(e){var t=e.name.replace(ia,"");return t||"#"!==e.name[0]&&(t="default"),ea.test(t)?{name:t.slice(1,-1),dynamic:!0}:{name:'"'+t+'"',dynamic:!1}}function ha(e){var t=e.match(ra);if(t){var n={};return t.forEach(function(e){n[e.slice(1)]=!0}),n}}function ma(e){for(var t={},n=0,r=e.length;n<r;n++)t[e[n].name]=e[n].value;return t}var ya=/^xmlns:NS\d+/,ga=/^NS\d+:/;function _a(e){return ua(e.tag,e.attrsList.slice(),e.parent)}var ba=[mo,go,{preTransformNode:function(e,t){if("input"===e.tag){var n,r=e.attrsMap;if(!r["v-model"])return;if((r[":type"]||r["v-bind:type"])&&(n=Ir(e,"type")),r.type||n||!r["v-bind"]||(n="("+r["v-bind"]+").type"),n){var i=Fr(e,"v-if",!0),o=i?"&&("+i+")":"",a=null!=Fr(e,"v-else",!0),s=Fr(e,"v-else-if",!0),c=_a(e);pa(c),jr(c,"type","checkbox"),fa(c,t),c.processed=!0,c.if="("+n+")==='checkbox'"+o,da(c,{exp:c.if,block:c});var u=_a(e);Fr(u,"v-for",!0),jr(u,"type","radio"),fa(u,t),da(c,{exp:"("+n+")==='radio'"+o,block:u});var l=_a(e);return Fr(l,"v-for",!0),jr(l,":type",n),fa(l,t),da(c,{exp:i,block:l}),a?c.else=!0:s&&(c.elseif=s),c}}}}];var $a,wa,Ca={expectHTML:!0,modules:ba,directives:{model:function(e,t,n){var r=t.value,i=t.modifiers,o=e.tag,a=e.attrsMap.type;if(e.component)return Hr(e,r,i),!1;if("select"===o)!function(e,t,n){var r='var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return '+(n&&n.number?"_n(val)":"val")+"});";r=r+" "+Br(t,"$event.target.multiple ? $$selectedVal : $$selectedVal[0]"),Mr(e,"change",r,null,!0)}(e,r,i);else if("input"===o&&"checkbox"===a)!function(e,t,n){var r=n&&n.number,i=Ir(e,"value")||"null",o=Ir(e,"true-value")||"true",a=Ir(e,"false-value")||"false";Er(e,"checked","Array.isArray("+t+")?_i("+t+","+i+")>-1"+("true"===o?":("+t+")":":_q("+t+","+o+")")),Mr(e,"change","var $$a="+t+",$$el=$event.target,$$c=$$el.checked?("+o+"):("+a+");if(Array.isArray($$a)){var $$v="+(r?"_n("+i+")":i)+",$$i=_i($$a,$$v);if($$el.checked){$$i<0&&("+Br(t,"$$a.concat([$$v])")+")}else{$$i>-1&&("+Br(t,"$$a.slice(0,$$i).concat($$a.slice($$i+1))")+")}}else{"+Br(t,"$$c")+"}",null,!0)}(e,r,i);else if("input"===o&&"radio"===a)!function(e,t,n){var r=n&&n.number,i=Ir(e,"value")||"null";Er(e,"checked","_q("+t+","+(i=r?"_n("+i+")":i)+")"),Mr(e,"change",Br(t,i),null,!0)}(e,r,i);else if("input"===o||"textarea"===o)!function(e,t,n){var r=e.attrsMap.type,i=n||{},o=i.lazy,a=i.number,s=i.trim,c=!o&&"range"!==r,u=o?"change":"range"===r?Wr:"input",l="$event.target.value";s&&(l="$event.target.value.trim()"),a&&(l="_n("+l+")");var f=Br(t,l);c&&(f="if($event.target.composing)return;"+f),Er(e,"value","("+t+")"),Mr(e,u,f,null,!0),(s||a)&&Mr(e,"blur","$forceUpdate()")}(e,r,i);else if(!F.isReservedTag(o))return Hr(e,r,i),!1;return!0},text:function(e,t){t.value&&Er(e,"textContent","_s("+t.value+")",t)},html:function(e,t){t.value&&Er(e,"innerHTML","_s("+t.value+")",t)}},isPreTag:function(e){return"pre"===e},isUnaryTag:bo,mustUseProp:jn,canBeLeftOpenTag:$o,isReservedTag:Wn,getTagNamespace:Zn,staticKeys:function(e){return e.reduce(function(e,t){return e.concat(t.staticKeys||[])},[]).join(",")}(ba)},xa=g(function(e){return p("type,tag,attrsList,attrsMap,plain,parent,children,attrs,start,end,rawAttrsMap"+(e?","+e:""))});function ka(e,t){e&&($a=xa(t.staticKeys||""),wa=t.isReservedTag||T,function e(t){t.static=function(e){if(2===e.type)return!1;if(3===e.type)return!0;return!(!e.pre&&(e.hasBindings||e.if||e.for||d(e.tag)||!wa(e.tag)||function(e){for(;e.parent;){if("template"!==(e=e.parent).tag)return!1;if(e.for)return!0}return!1}(e)||!Object.keys(e).every($a)))}(t);if(1===t.type){if(!wa(t.tag)&&"slot"!==t.tag&&null==t.attrsMap["inline-template"])return;for(var n=0,r=t.children.length;n<r;n++){var i=t.children[n];e(i),i.static||(t.static=!1)}if(t.ifConditions)for(var o=1,a=t.ifConditions.length;o<a;o++){var s=t.ifConditions[o].block;e(s),s.static||(t.static=!1)}}}(e),function e(t,n){if(1===t.type){if((t.static||t.once)&&(t.staticInFor=n),t.static&&t.children.length&&(1!==t.children.length||3!==t.children[0].type))return void(t.staticRoot=!0);if(t.staticRoot=!1,t.children)for(var r=0,i=t.children.length;r<i;r++)e(t.children[r],n||!!t.for);if(t.ifConditions)for(var o=1,a=t.ifConditions.length;o<a;o++)e(t.ifConditions[o].block,n)}}(e,!1))}var Aa=/^([\w$_]+|\([^)]*?\))\s*=>|^function\s*(?:[\w$]+)?\s*\(/,Oa=/\([^)]*?\);*$/,Sa=/^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['[^']*?']|\["[^"]*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*$/,Ta={esc:27,tab:9,enter:13,space:32,up:38,left:37,right:39,down:40,delete:[8,46]},Ea={esc:["Esc","Escape"],tab:"Tab",enter:"Enter",space:[" ","Spacebar"],up:["Up","ArrowUp"],left:["Left","ArrowLeft"],right:["Right","ArrowRight"],down:["Down","ArrowDown"],delete:["Backspace","Delete","Del"]},Na=function(e){return"if("+e+")return null;"},ja={stop:"$event.stopPropagation();",prevent:"$event.preventDefault();",self:Na("$event.target !== $event.currentTarget"),ctrl:Na("!$event.ctrlKey"),shift:Na("!$event.shiftKey"),alt:Na("!$event.altKey"),meta:Na("!$event.metaKey"),left:Na("'button' in $event && $event.button !== 0"),middle:Na("'button' in $event && $event.button !== 1"),right:Na("'button' in $event && $event.button !== 2")};function Da(e,t){var n=t?"nativeOn:":"on:",r="",i="";for(var o in e){var a=La(e[o]);e[o]&&e[o].dynamic?i+=o+","+a+",":r+='"'+o+'":'+a+","}return r="{"+r.slice(0,-1)+"}",i?n+"_d("+r+",["+i.slice(0,-1)+"])":n+r}function La(e){if(!e)return"function(){}";if(Array.isArray(e))return"["+e.map(function(e){return La(e)}).join(",")+"]";var t=Sa.test(e.value),n=Aa.test(e.value),r=Sa.test(e.value.replace(Oa,""));if(e.modifiers){var i="",o="",a=[];for(var s in e.modifiers)if(ja[s])o+=ja[s],Ta[s]&&a.push(s);else if("exact"===s){var c=e.modifiers;o+=Na(["ctrl","shift","alt","meta"].filter(function(e){return!c[e]}).map(function(e){return"$event."+e+"Key"}).join("||"))}else a.push(s);return a.length&&(i+=function(e){return"if(!$event.type.indexOf('key')&&"+e.map(Ma).join("&&")+")return null;"}(a)),o&&(i+=o),"function($event){"+i+(t?"return "+e.value+"($event)":n?"return ("+e.value+")($event)":r?"return "+e.value:e.value)+"}"}return t||n?e.value:"function($event){"+(r?"return "+e.value:e.value)+"}"}function Ma(e){var t=parseInt(e,10);if(t)return"$event.keyCode!=="+t;var n=Ta[e],r=Ea[e];return"_k($event.keyCode,"+JSON.stringify(e)+","+JSON.stringify(n)+",$event.key,"+JSON.stringify(r)+")"}var Ia={on:function(e,t){e.wrapListeners=function(e){return"_g("+e+","+t.value+")"}},bind:function(e,t){e.wrapData=function(n){return"_b("+n+",'"+e.tag+"',"+t.value+","+(t.modifiers&&t.modifiers.prop?"true":"false")+(t.modifiers&&t.modifiers.sync?",true":"")+")"}},cloak:S},Fa=function(e){this.options=e,this.warn=e.warn||Sr,this.transforms=Tr(e.modules,"transformCode"),this.dataGenFns=Tr(e.modules,"genData"),this.directives=A(A({},Ia),e.directives);var t=e.isReservedTag||T;this.maybeComponent=function(e){return!!e.component||!t(e.tag)},this.onceId=0,this.staticRenderFns=[],this.pre=!1};function Pa(e,t){var n=new Fa(t);return{render:"with(this){return "+(e?Ra(e,n):'_c("div")')+"}",staticRenderFns:n.staticRenderFns}}function Ra(e,t){if(e.parent&&(e.pre=e.pre||e.parent.pre),e.staticRoot&&!e.staticProcessed)return Ha(e,t);if(e.once&&!e.onceProcessed)return Ba(e,t);if(e.for&&!e.forProcessed)return za(e,t);if(e.if&&!e.ifProcessed)return Ua(e,t);if("template"!==e.tag||e.slotTarget||t.pre){if("slot"===e.tag)return function(e,t){var n=e.slotName||'"default"',r=qa(e,t),i="_t("+n+(r?","+r:""),o=e.attrs||e.dynamicAttrs?Ga((e.attrs||[]).concat(e.dynamicAttrs||[]).map(function(e){return{name:b(e.name),value:e.value,dynamic:e.dynamic}})):null,a=e.attrsMap["v-bind"];!o&&!a||r||(i+=",null");o&&(i+=","+o);a&&(i+=(o?"":",null")+","+a);return i+")"}(e,t);var n;if(e.component)n=function(e,t,n){var r=t.inlineTemplate?null:qa(t,n,!0);return"_c("+e+","+Va(t,n)+(r?","+r:"")+")"}(e.component,e,t);else{var r;(!e.plain||e.pre&&t.maybeComponent(e))&&(r=Va(e,t));var i=e.inlineTemplate?null:qa(e,t,!0);n="_c('"+e.tag+"'"+(r?","+r:"")+(i?","+i:"")+")"}for(var o=0;o<t.transforms.length;o++)n=t.transforms[o](e,n);return n}return qa(e,t)||"void 0"}function Ha(e,t){e.staticProcessed=!0;var n=t.pre;return e.pre&&(t.pre=e.pre),t.staticRenderFns.push("with(this){return "+Ra(e,t)+"}"),t.pre=n,"_m("+(t.staticRenderFns.length-1)+(e.staticInFor?",true":"")+")"}function Ba(e,t){if(e.onceProcessed=!0,e.if&&!e.ifProcessed)return Ua(e,t);if(e.staticInFor){for(var n="",r=e.parent;r;){if(r.for){n=r.key;break}r=r.parent}return n?"_o("+Ra(e,t)+","+t.onceId+++","+n+")":Ra(e,t)}return Ha(e,t)}function Ua(e,t,n,r){return e.ifProcessed=!0,function e(t,n,r,i){if(!t.length)return i||"_e()";var o=t.shift();return o.exp?"("+o.exp+")?"+a(o.block)+":"+e(t,n,r,i):""+a(o.block);function a(e){return r?r(e,n):e.once?Ba(e,n):Ra(e,n)}}(e.ifConditions.slice(),t,n,r)}function za(e,t,n,r){var i=e.for,o=e.alias,a=e.iterator1?","+e.iterator1:"",s=e.iterator2?","+e.iterator2:"";return e.forProcessed=!0,(r||"_l")+"(("+i+"),function("+o+a+s+"){return "+(n||Ra)(e,t)+"})"}function Va(e,t){var n="{",r=function(e,t){var n=e.directives;if(!n)return;var r,i,o,a,s="directives:[",c=!1;for(r=0,i=n.length;r<i;r++){o=n[r],a=!0;var u=t.directives[o.name];u&&(a=!!u(e,o,t.warn)),a&&(c=!0,s+='{name:"'+o.name+'",rawName:"'+o.rawName+'"'+(o.value?",value:("+o.value+"),expression:"+JSON.stringify(o.value):"")+(o.arg?",arg:"+(o.isDynamicArg?o.arg:'"'+o.arg+'"'):"")+(o.modifiers?",modifiers:"+JSON.stringify(o.modifiers):"")+"},")}if(c)return s.slice(0,-1)+"]"}(e,t);r&&(n+=r+","),e.key&&(n+="key:"+e.key+","),e.ref&&(n+="ref:"+e.ref+","),e.refInFor&&(n+="refInFor:true,"),e.pre&&(n+="pre:true,"),e.component&&(n+='tag:"'+e.tag+'",');for(var i=0;i<t.dataGenFns.length;i++)n+=t.dataGenFns[i](e);if(e.attrs&&(n+="attrs:"+Ga(e.attrs)+","),e.props&&(n+="domProps:"+Ga(e.props)+","),e.events&&(n+=Da(e.events,!1)+","),e.nativeEvents&&(n+=Da(e.nativeEvents,!0)+","),e.slotTarget&&!e.slotScope&&(n+="slot:"+e.slotTarget+","),e.scopedSlots&&(n+=function(e,t,n){var r=e.for||Object.keys(t).some(function(e){var n=t[e];return n.slotTargetDynamic||n.if||n.for||Ka(n)}),i=!!e.if;if(!r)for(var o=e.parent;o;){if(o.slotScope&&o.slotScope!==ca||o.for){r=!0;break}o.if&&(i=!0),o=o.parent}var a=Object.keys(t).map(function(e){return Ja(t[e],n)}).join(",");return"scopedSlots:_u(["+a+"]"+(r?",null,true":"")+(!r&&i?",null,false,"+function(e){var t=5381,n=e.length;for(;n;)t=33*t^e.charCodeAt(--n);return t>>>0}(a):"")+")"}(e,e.scopedSlots,t)+","),e.model&&(n+="model:{value:"+e.model.value+",callback:"+e.model.callback+",expression:"+e.model.expression+"},"),e.inlineTemplate){var o=function(e,t){var n=e.children[0];if(n&&1===n.type){var r=Pa(n,t.options);return"inlineTemplate:{render:function(){"+r.render+"},staticRenderFns:["+r.staticRenderFns.map(function(e){return"function(){"+e+"}"}).join(",")+"]}"}}(e,t);o&&(n+=o+",")}return n=n.replace(/,$/,"")+"}",e.dynamicAttrs&&(n="_b("+n+',"'+e.tag+'",'+Ga(e.dynamicAttrs)+")"),e.wrapData&&(n=e.wrapData(n)),e.wrapListeners&&(n=e.wrapListeners(n)),n}function Ka(e){return 1===e.type&&("slot"===e.tag||e.children.some(Ka))}function Ja(e,t){var n=e.attrsMap["slot-scope"];if(e.if&&!e.ifProcessed&&!n)return Ua(e,t,Ja,"null");if(e.for&&!e.forProcessed)return za(e,t,Ja);var r=e.slotScope===ca?"":String(e.slotScope),i="function("+r+"){return "+("template"===e.tag?e.if&&n?"("+e.if+")?"+(qa(e,t)||"undefined")+":undefined":qa(e,t)||"undefined":Ra(e,t))+"}",o=r?"":",proxy:true";return"{key:"+(e.slotTarget||'"default"')+",fn:"+i+o+"}"}function qa(e,t,n,r,i){var o=e.children;if(o.length){var a=o[0];if(1===o.length&&a.for&&"template"!==a.tag&&"slot"!==a.tag){var s=n?t.maybeComponent(a)?",1":",0":"";return""+(r||Ra)(a,t)+s}var c=n?function(e,t){for(var n=0,r=0;r<e.length;r++){var i=e[r];if(1===i.type){if(Wa(i)||i.ifConditions&&i.ifConditions.some(function(e){return Wa(e.block)})){n=2;break}(t(i)||i.ifConditions&&i.ifConditions.some(function(e){return t(e.block)}))&&(n=1)}}return n}(o,t.maybeComponent):0,u=i||Za;return"["+o.map(function(e){return u(e,t)}).join(",")+"]"+(c?","+c:"")}}function Wa(e){return void 0!==e.for||"template"===e.tag||"slot"===e.tag}function Za(e,t){return 1===e.type?Ra(e,t):3===e.type&&e.isComment?(r=e,"_e("+JSON.stringify(r.text)+")"):"_v("+(2===(n=e).type?n.expression:Xa(JSON.stringify(n.text)))+")";var n,r}function Ga(e){for(var t="",n="",r=0;r<e.length;r++){var i=e[r],o=Xa(i.value);i.dynamic?n+=i.name+","+o+",":t+='"'+i.name+'":'+o+","}return t="{"+t.slice(0,-1)+"}",n?"_d("+t+",["+n.slice(0,-1)+"])":t}function Xa(e){return e.replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")}new RegExp("\\b"+"do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,super,throw,while,yield,delete,export,import,return,switch,default,extends,finally,continue,debugger,function,arguments".split(",").join("\\b|\\b")+"\\b");function Ya(e,t){try{return new Function(e)}catch(n){return t.push({err:n,code:e}),S}}function Qa(e){var t=Object.create(null);return function(n,r,i){(r=A({},r)).warn;delete r.warn;var o=r.delimiters?String(r.delimiters)+n:n;if(t[o])return t[o];var a=e(n,r),s={},c=[];return s.render=Ya(a.render,c),s.staticRenderFns=a.staticRenderFns.map(function(e){return Ya(e,c)}),t[o]=s}}var es,ts,ns=(es=function(e,t){var n=la(e.trim(),t);!1!==t.optimize&&ka(n,t);var r=Pa(n,t);return{ast:n,render:r.render,staticRenderFns:r.staticRenderFns}},function(e){function t(t,n){var r=Object.create(e),i=[],o=[];if(n)for(var a in n.modules&&(r.modules=(e.modules||[]).concat(n.modules)),n.directives&&(r.directives=A(Object.create(e.directives||null),n.directives)),n)"modules"!==a&&"directives"!==a&&(r[a]=n[a]);r.warn=function(e,t,n){(n?o:i).push(e)};var s=es(t.trim(),r);return s.errors=i,s.tips=o,s}return{compile:t,compileToFunctions:Qa(t)}})(Ca),rs=(ns.compile,ns.compileToFunctions);function is(e){return(ts=ts||document.createElement("div")).innerHTML=e?'<a href="\n"/>':'<div a="\n"/>',ts.innerHTML.indexOf("&#10;")>0}var os=!!z&&is(!1),as=!!z&&is(!0),ss=g(function(e){var t=Yn(e);return t&&t.innerHTML}),cs=wn.prototype.$mount;wn.prototype.$mount=function(e,t){if((e=e&&Yn(e))===document.body||e===document.documentElement)return this;var n=this.$options;if(!n.render){var r=n.template;if(r)if("string"==typeof r)"#"===r.charAt(0)&&(r=ss(r));else{if(!r.nodeType)return this;r=r.innerHTML}else e&&(r=function(e){if(e.outerHTML)return e.outerHTML;var t=document.createElement("div");return t.appendChild(e.cloneNode(!0)),t.innerHTML}(e));if(r){var i=rs(r,{outputSourceRange:!1,shouldDecodeNewlines:os,shouldDecodeNewlinesForHref:as,delimiters:n.delimiters,comments:n.comments},this),o=i.render,a=i.staticRenderFns;n.render=o,n.staticRenderFns=a}}return cs.call(this,e,t)},wn.compile=rs,module.exports=wn;
},{}],"f5S3":[function(require,module,exports) {
if ("production" === 'production') {
  module.exports = require('./vue.common.prod.js');
} else {
  module.exports = require('./vue.common.dev.js');
}
},{"./vue.common.prod.js":"MpUJ"}],"WqwM":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalProperties = ['pID', 'pName', 'pStart', 'pEnd', 'pClass', 'pLink', 'pMile', 'pRes', 'pComp', 'pGroup', 'pParent',
    'pOpen', 'pDepend', 'pCaption', 'pNotes', 'pGantt', 'pCost', 'pPlanStart', 'pPlanEnd'];
exports.internalPropertiesLang = {
    'pID': 'id',
    'pName': 'name',
    'pStart': 'startdate',
    'pEnd': 'enddate',
    'pLink': 'link',
    'pMile': 'mile',
    'pRes': 'resource',
    'pComp': 'comp',
    'pGroup': 'group',
    'pParent': 'parent',
    'pOpen': 'open',
    'pDepend': 'depend',
    'pCaption': 'caption',
    'pNotes': 'notes',
    'pCost': 'cost',
    'pPlanStart': 'planstartdate',
    'pPlanEnd': 'planenddate'
};
exports.getMinDate = function (pList, pFormat) {
    var vDate = new Date();
    if (pList.length <= 0)
        return vDate;
    vDate.setTime(pList[0].getStart().getTime());
    // Parse all Task End dates to find min
    for (var i = 0; i < pList.length; i++) {
        if (pList[i].getStart().getTime() < vDate.getTime())
            vDate.setTime(pList[i].getStart().getTime());
    }
    // Adjust min date to specific format boundaries (first of week or first of month)
    if (pFormat == 'day') {
        vDate.setDate(vDate.getDate() - 1);
        while (vDate.getDay() % 7 != 1)
            vDate.setDate(vDate.getDate() - 1);
    }
    else if (pFormat == 'week') {
        vDate.setDate(vDate.getDate() - 1);
        while (vDate.getDay() % 7 != 1)
            vDate.setDate(vDate.getDate() - 1);
    }
    else if (pFormat == 'month') {
        vDate.setDate(vDate.getDate() - 15);
        while (vDate.getDate() > 1)
            vDate.setDate(vDate.getDate() - 1);
    }
    else if (pFormat == 'quarter') {
        vDate.setDate(vDate.getDate() - 31);
        if (vDate.getMonth() == 0 || vDate.getMonth() == 1 || vDate.getMonth() == 2)
            vDate.setFullYear(vDate.getFullYear(), 0, 1);
        else if (vDate.getMonth() == 3 || vDate.getMonth() == 4 || vDate.getMonth() == 5)
            vDate.setFullYear(vDate.getFullYear(), 3, 1);
        else if (vDate.getMonth() == 6 || vDate.getMonth() == 7 || vDate.getMonth() == 8)
            vDate.setFullYear(vDate.getFullYear(), 6, 1);
        else if (vDate.getMonth() == 9 || vDate.getMonth() == 10 || vDate.getMonth() == 11)
            vDate.setFullYear(vDate.getFullYear(), 9, 1);
    }
    else if (pFormat == 'hour') {
        vDate.setHours(vDate.getHours() - 1);
        while (vDate.getHours() % 6 != 0)
            vDate.setHours(vDate.getHours() - 1);
    }
    if (pFormat == 'hour')
        vDate.setMinutes(0, 0);
    else
        vDate.setHours(0, 0, 0);
    return (vDate);
};
exports.getMaxDate = function (pList, pFormat) {
    var vDate = new Date();
    if (pList.length <= 0)
        return vDate;
    vDate.setTime(pList[0].getEnd().getTime());
    // Parse all Task End dates to find max
    for (var i = 0; i < pList.length; i++) {
        if (pList[i].getEnd().getTime() > vDate.getTime())
            vDate.setTime(pList[i].getEnd().getTime());
    }
    // Adjust max date to specific format boundaries (end of week or end of month)
    if (pFormat == 'day') {
        vDate.setDate(vDate.getDate() + 1);
        while (vDate.getDay() % 7 != 0)
            vDate.setDate(vDate.getDate() + 1);
    }
    else if (pFormat == 'week') {
        //For weeks, what is the last logical boundary?
        vDate.setDate(vDate.getDate() + 1);
        while (vDate.getDay() % 7 != 0)
            vDate.setDate(vDate.getDate() + 1);
    }
    else if (pFormat == 'month') {
        // Set to last day of current Month
        while (vDate.getDate() > 1)
            vDate.setDate(vDate.getDate() + 1);
        vDate.setDate(vDate.getDate() - 1);
    }
    else if (pFormat == 'quarter') {
        // Set to last day of current Quarter
        if (vDate.getMonth() == 0 || vDate.getMonth() == 1 || vDate.getMonth() == 2)
            vDate.setFullYear(vDate.getFullYear(), 2, 31);
        else if (vDate.getMonth() == 3 || vDate.getMonth() == 4 || vDate.getMonth() == 5)
            vDate.setFullYear(vDate.getFullYear(), 5, 30);
        else if (vDate.getMonth() == 6 || vDate.getMonth() == 7 || vDate.getMonth() == 8)
            vDate.setFullYear(vDate.getFullYear(), 8, 30);
        else if (vDate.getMonth() == 9 || vDate.getMonth() == 10 || vDate.getMonth() == 11)
            vDate.setFullYear(vDate.getFullYear(), 11, 31);
    }
    else if (pFormat == 'hour') {
        if (vDate.getHours() == 0)
            vDate.setDate(vDate.getDate() + 1);
        vDate.setHours(vDate.getHours() + 1);
        while (vDate.getHours() % 6 != 5)
            vDate.setHours(vDate.getHours() + 1);
    }
    return (vDate);
};
exports.findObj = function (theObj, theDoc) {
    if (theDoc === void 0) { theDoc = null; }
    var p, i, foundObj;
    if (!theDoc)
        theDoc = document;
    if (document.getElementById)
        foundObj = document.getElementById(theObj);
    return foundObj;
};
exports.changeFormat = function (pFormat, ganttObj) {
    if (ganttObj)
        ganttObj.setFormat(pFormat);
    else
        alert('Chart undefined');
};
exports.parseDateStr = function (pDateStr, pFormatStr) {
    var vDate = new Date();
    var vDateParts = pDateStr.split(/[^0-9]/);
    if (pDateStr.length >= 10 && vDateParts.length >= 3) {
        while (vDateParts.length < 5)
            vDateParts.push(0);
        switch (pFormatStr) {
            case 'mm/dd/yyyy':
                vDate = new Date(vDateParts[2], vDateParts[0] - 1, vDateParts[1], vDateParts[3], vDateParts[4]);
                break;
            case 'dd/mm/yyyy':
                vDate = new Date(vDateParts[2], vDateParts[1] - 1, vDateParts[0], vDateParts[3], vDateParts[4]);
                break;
            case 'yyyy-mm-dd':
                vDate = new Date(vDateParts[0], vDateParts[1] - 1, vDateParts[2], vDateParts[3], vDateParts[4]);
                break;
        }
    }
    return (vDate);
};
exports.formatDateStr = function (pDate, pDateFormatArr, pL) {
    var vDateStr = '';
    var vYear2Str = pDate.getFullYear().toString().substring(2, 4);
    var vMonthStr = (pDate.getMonth() + 1) + '';
    var vMonthArr = new Array(pL['january'], pL['february'], pL['march'], pL['april'], pL['maylong'], pL['june'], pL['july'], pL['august'], pL['september'], pL['october'], pL['november'], pL['december']);
    var vDayArr = new Array(pL['sunday'], pL['monday'], pL['tuesday'], pL['wednesday'], pL['thursday'], pL['friday'], pL['saturday']);
    var vMthArr = new Array(pL['jan'], pL['feb'], pL['mar'], pL['apr'], pL['may'], pL['jun'], pL['jul'], pL['aug'], pL['sep'], pL['oct'], pL['nov'], pL['dec']);
    var vDyArr = new Array(pL['sun'], pL['mon'], pL['tue'], pL['wed'], pL['thu'], pL['fri'], pL['sat']);
    for (var i = 0; i < pDateFormatArr.length; i++) {
        switch (pDateFormatArr[i]) {
            case 'dd':
                if (pDate.getDate() < 10)
                    vDateStr += '0'; // now fall through
            case 'd':
                vDateStr += pDate.getDate();
                break;
            case 'day':
                vDateStr += vDyArr[pDate.getDay()];
                break;
            case 'DAY':
                vDateStr += vDayArr[pDate.getDay()];
                break;
            case 'mm':
                if (parseInt(vMonthStr, 10) < 10)
                    vDateStr += '0'; // now fall through
            case 'm':
                vDateStr += vMonthStr;
                break;
            case 'mon':
                vDateStr += vMthArr[pDate.getMonth()];
                break;
            case 'month':
                vDateStr += vMonthArr[pDate.getMonth()];
                break;
            case 'yyyy':
                vDateStr += pDate.getFullYear();
                break;
            case 'yy':
                vDateStr += vYear2Str;
                break;
            case 'qq':
                vDateStr += pL['qtr']; // now fall through
            case 'q':
                vDateStr += Math.floor(pDate.getMonth() / 3) + 1;
                break;
            case 'hh':
                if ((((pDate.getHours() % 12) == 0) ? 12 : pDate.getHours() % 12) < 10)
                    vDateStr += '0'; // now fall through
            case 'h':
                vDateStr += ((pDate.getHours() % 12) == 0) ? 12 : pDate.getHours() % 12;
                break;
            case 'HH':
                if ((pDate.getHours()) < 10)
                    vDateStr += '0'; // now fall through
            case 'H':
                vDateStr += (pDate.getHours());
                break;
            case 'MI':
                if (pDate.getMinutes() < 10)
                    vDateStr += '0'; // now fall through
            case 'mi':
                vDateStr += pDate.getMinutes();
                break;
            case 'pm':
                vDateStr += ((pDate.getHours()) < 12) ? 'am' : 'pm';
                break;
            case 'PM':
                vDateStr += ((pDate.getHours()) < 12) ? 'AM' : 'PM';
                break;
            case 'ww':
                if (exports.getIsoWeek(pDate) < 10)
                    vDateStr += '0'; // now fall through
            case 'w':
                vDateStr += exports.getIsoWeek(pDate);
                break;
            case 'week':
                var vWeekNum = exports.getIsoWeek(pDate);
                var vYear = pDate.getFullYear();
                var vDayOfWeek = (pDate.getDay() == 0) ? 7 : pDate.getDay();
                if (vWeekNum >= 52 && parseInt(vMonthStr, 10) === 1)
                    vYear--;
                if (vWeekNum == 1 && parseInt(vMonthStr, 10) === 12)
                    vYear++;
                if (vWeekNum < 10)
                    vWeekNum = parseInt('0' + vWeekNum, 10);
                vDateStr += vYear + '-W' + vWeekNum + '-' + vDayOfWeek;
                break;
            default:
                if (pL[pDateFormatArr[i].toLowerCase()])
                    vDateStr += pL[pDateFormatArr[i].toLowerCase()];
                else
                    vDateStr += pDateFormatArr[i];
                break;
        }
    }
    return vDateStr;
};
exports.parseDateFormatStr = function (pFormatStr) {
    var vComponantStr = '';
    var vCurrChar = '';
    var vSeparators = new RegExp('[\/\\ -.,\'":]');
    var vDateFormatArray = new Array();
    for (var i = 0; i < pFormatStr.length; i++) {
        vCurrChar = pFormatStr.charAt(i);
        if ((vCurrChar.match(vSeparators)) || (i + 1 == pFormatStr.length)) // separator or end of string
         {
            if ((i + 1 == pFormatStr.length) && (!(vCurrChar.match(vSeparators)))) // at end of string add any non-separator chars to the current component
             {
                vComponantStr += vCurrChar;
            }
            vDateFormatArray.push(vComponantStr);
            if (vCurrChar.match(vSeparators))
                vDateFormatArray.push(vCurrChar);
            vComponantStr = '';
        }
        else {
            vComponantStr += vCurrChar;
        }
    }
    return vDateFormatArray;
};
exports.stripIds = function (pNode) {
    for (var i = 0; i < pNode.childNodes.length; i++) {
        if ('removeAttribute' in pNode.childNodes[i])
            pNode.childNodes[i].removeAttribute('id');
        if (pNode.childNodes[i].hasChildNodes())
            exports.stripIds(pNode.childNodes[i]);
    }
};
exports.stripUnwanted = function (pNode) {
    var vAllowedTags = new Array('#text', 'p', 'br', 'ul', 'ol', 'li', 'div', 'span', 'img');
    for (var i = 0; i < pNode.childNodes.length; i++) {
        /* versions of IE<9 don't support indexOf on arrays so add trailing comma to the joined array and lookup value to stop substring matches */
        if ((vAllowedTags.join().toLowerCase() + ',').indexOf(pNode.childNodes[i].nodeName.toLowerCase() + ',') == -1) {
            pNode.replaceChild(document.createTextNode(pNode.childNodes[i].outerHTML), pNode.childNodes[i]);
        }
        if (pNode.childNodes[i].hasChildNodes())
            exports.stripUnwanted(pNode.childNodes[i]);
    }
};
exports.delayedHide = function (pGanttChartObj, pTool, pTimer) {
    var vDelay = pGanttChartObj.getTooltipDelay() || 1500;
    if (pTool)
        pTool.delayTimeout = setTimeout(function () { exports.hideToolTip(pGanttChartObj, pTool, pTimer); }, vDelay);
};
exports.getZoomFactor = function () {
    var vFactor = 1;
    if (document.body.getBoundingClientRect) {
        // rect is only in physical pixel size in IE before version 8
        var vRect = document.body.getBoundingClientRect();
        var vPhysicalW = vRect.right - vRect.left;
        var vLogicalW = document.body.offsetWidth;
        // the zoom level is always an integer percent value
        vFactor = Math.round((vPhysicalW / vLogicalW) * 100) / 100;
    }
    return vFactor;
};
exports.benchMark = function (pItem) {
    var vEndTime = new Date().getTime();
    alert(pItem + ': Elapsed time: ' + ((vEndTime - this.vBenchTime) / 1000) + ' seconds.');
    this.vBenchTime = new Date().getTime();
};
exports.getIsoWeek = function (pDate) {
    // We have to compare against the monday of the first week of the year containing 04 jan *not* 01/01
    // 60*60*24*1000=86400000
    var dayMiliseconds = 86400000;
    var keyDay = new Date(pDate.getFullYear(), 0, 4, 0, 0, 0);
    var keyDayOfWeek = (keyDay.getDay() == 0) ? 6 : keyDay.getDay() - 1; // define monday as 0
    var firstMondayYearTime = keyDay.getTime() - (keyDayOfWeek * dayMiliseconds);
    var thisDate = new Date(pDate.getFullYear(), pDate.getMonth(), pDate.getDate(), 0, 0, 0); // This at 00:00:00
    var thisTime = thisDate.getTime();
    var daysFromFirstMonday = Math.round(((thisTime - firstMondayYearTime) / dayMiliseconds));
    var lastWeek = 99;
    var thisWeek = 99;
    var firstMondayYear = new Date(firstMondayYearTime);
    thisWeek = Math.ceil((daysFromFirstMonday + 1) / 7);
    if (thisWeek <= 0)
        thisWeek = exports.getIsoWeek(new Date(pDate.getFullYear() - 1, 11, 31, 0, 0, 0));
    else if (thisWeek == 53 && (new Date(pDate.getFullYear(), 0, 1, 0, 0, 0)).getDay() != 4 && (new Date(pDate.getFullYear(), 11, 31, 0, 0, 0)).getDay() != 4)
        thisWeek = 1;
    return thisWeek;
};
exports.getScrollPositions = function () {
    var vScrollLeft = window.pageXOffset;
    var vScrollTop = window.pageYOffset;
    if (!('pageXOffset' in window)) // Internet Explorer before version 9
     {
        var vZoomFactor = exports.getZoomFactor();
        vScrollLeft = Math.round(document.documentElement.scrollLeft / vZoomFactor);
        vScrollTop = Math.round(document.documentElement.scrollTop / vZoomFactor);
    }
    return { x: vScrollLeft, y: vScrollTop };
};
exports.getOffset = function (pStartDate, pEndDate, pColWidth, pFormat) {
    var DAY_CELL_MARGIN_WIDTH = 3; // Cell margin for 'day' format
    var WEEK_CELL_MARGIN_WIDTH = 3; // Cell margin for 'week' format
    var MONTH_CELL_MARGIN_WIDTH = 1; // Cell margin for 'month' format
    var QUARTER_CELL_MARGIN_WIDTH = 1; // Cell margin for 'quarter' format
    var HOUR_CELL_MARGIN_WIDTH = 3; // Cell margin for 'hour' format
    var vMonthDaysArr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    var curTaskStart = new Date(pStartDate.getTime());
    var curTaskEnd = new Date(pEndDate.getTime());
    var vTaskRightPx = 0;
    var tmpTaskStart = Date.UTC(curTaskStart.getFullYear(), curTaskStart.getMonth(), curTaskStart.getDate(), curTaskStart.getHours(), 0, 0);
    var tmpTaskEnd = Date.UTC(curTaskEnd.getFullYear(), curTaskEnd.getMonth(), curTaskEnd.getDate(), curTaskEnd.getHours(), 0, 0);
    var vTaskRight = (tmpTaskEnd - tmpTaskStart) / 3600000; // Length of task in hours
    var vPosTmpDate;
    if (pFormat == 'day') {
        vTaskRightPx = Math.ceil((vTaskRight / 24) * (pColWidth + DAY_CELL_MARGIN_WIDTH) - 1);
    }
    else if (pFormat == 'week') {
        vTaskRightPx = Math.ceil((vTaskRight / (24 * 7)) * (pColWidth + WEEK_CELL_MARGIN_WIDTH) - 1);
    }
    else if (pFormat == 'month') {
        var vMonthsDiff = (12 * (curTaskEnd.getFullYear() - curTaskStart.getFullYear())) + (curTaskEnd.getMonth() - curTaskStart.getMonth());
        vPosTmpDate = new Date(curTaskEnd.getTime());
        vPosTmpDate.setDate(curTaskStart.getDate());
        var vDaysCrctn = (curTaskEnd.getTime() - vPosTmpDate.getTime()) / (86400000);
        vTaskRightPx = Math.ceil((vMonthsDiff * (pColWidth + MONTH_CELL_MARGIN_WIDTH)) + (vDaysCrctn * (pColWidth / vMonthDaysArr[curTaskEnd.getMonth()])) - 1);
    }
    else if (pFormat == 'quarter') {
        var vMonthsDiff = (12 * (curTaskEnd.getFullYear() - curTaskStart.getFullYear())) + (curTaskEnd.getMonth() - curTaskStart.getMonth());
        vPosTmpDate = new Date(curTaskEnd.getTime());
        vPosTmpDate.setDate(curTaskStart.getDate());
        var vDaysCrctn = (curTaskEnd.getTime() - vPosTmpDate.getTime()) / (86400000);
        vTaskRightPx = Math.ceil((vMonthsDiff * ((pColWidth + QUARTER_CELL_MARGIN_WIDTH) / 3)) + (vDaysCrctn * (pColWidth / 90)) - 1);
    }
    else if (pFormat == 'hour') {
        // can't just calculate sum because of daylight savings changes
        vPosTmpDate = new Date(curTaskEnd.getTime());
        vPosTmpDate.setMinutes(curTaskStart.getMinutes(), 0);
        var vMinsCrctn = (curTaskEnd.getTime() - vPosTmpDate.getTime()) / (3600000);
        vTaskRightPx = Math.ceil((vTaskRight * (pColWidth + HOUR_CELL_MARGIN_WIDTH)) + (vMinsCrctn * (pColWidth)));
    }
    return vTaskRightPx;
};
exports.isIE = function () {
    if (typeof document.all != 'undefined') {
        if ('pageXOffset' in window)
            return false; // give IE9 and above the benefit of the doubt!
        else
            return true;
    }
    else
        return false;
};
exports.hideToolTip = function (pGanttChartObj, pTool, pTimer) {
    if (pGanttChartObj.getUseFade()) {
        clearInterval(pTool.fadeInterval);
        pTool.fadeInterval = setInterval(function () { exports.fadeToolTip(-1, pTool, 0); }, pTimer);
    }
    else {
        pTool.style.opacity = 0;
        pTool.style.filter = 'alpha(opacity=0)';
        pTool.style.visibility = 'hidden';
    }
};
exports.fadeToolTip = function (pDirection, pTool, pMaxAlpha) {
    var vIncrement = parseInt(pTool.getAttribute('fadeIncrement'));
    var vAlpha = pTool.getAttribute('currentOpacity');
    var vCurAlpha = parseInt(vAlpha);
    if ((vCurAlpha != pMaxAlpha && pDirection == 1) || (vCurAlpha != 0 && pDirection == -1)) {
        var i = vIncrement;
        if (pMaxAlpha - vCurAlpha < vIncrement && pDirection == 1) {
            i = pMaxAlpha - vCurAlpha;
        }
        else if (vAlpha < vIncrement && pDirection == -1) {
            i = vCurAlpha;
        }
        vAlpha = vCurAlpha + (i * pDirection);
        pTool.style.opacity = vAlpha * 0.01;
        pTool.style.filter = 'alpha(opacity=' + vAlpha + ')';
        pTool.setAttribute('currentOpacity', vAlpha);
    }
    else {
        clearInterval(pTool.fadeInterval);
        if (pDirection == -1) {
            pTool.style.opacity = 0;
            pTool.style.filter = 'alpha(opacity=0)';
            pTool.style.visibility = 'hidden';
        }
    }
};
exports.hashString = function (key) {
    if (!key) {
        key = 'default';
    }
    key += '';
    var hash = 5381;
    for (var i = 0; i < key.length; i++) {
        if (key.charCodeAt) {
            // tslint:disable-next-line:no-bitwise
            hash = (hash << 5) + hash + key.charCodeAt(i);
        }
        // tslint:disable-next-line:no-bitwise
        hash = hash & hash;
    }
    // tslint:disable-next-line:no-bitwise
    return hash >>> 0;
};
exports.hashKey = function (key) {
    return this.hashString(key);
};
exports.criticalPath = function (tasks) {
    var path = {};
    // calculate duration
    tasks.forEach(function (task) {
        task.duration = new Date(task.pEnd).getTime() - new Date(task.pStart).getTime();
    });
    tasks.forEach(function (task) {
        if (!path[task.pID]) {
            path[task.pID] = task;
        }
        if (!path[task.pParent]) {
            path[task.pParent] = {
                childrens: []
            };
        }
        // console.log(path);
        if (!path[task.pID].childrens) {
            path[task.pID].childrens = [];
        }
        path[task.pParent].childrens.push(task);
        var max = path[task.pParent].childrens[0].duration;
        path[task.pParent].childrens.forEach(function (t) {
            if (t.duration > max) {
                max = t.duration;
            }
        });
        path[task.pParent].duration = max;
    });
    var finalNodes = { 0: path[0] };
    var node = path[0];
    var _loop_1 = function () {
        if (node.childrens.length > 0) {
            var found_1 = node.childrens[0];
            var max_1 = found_1.duration;
            node.childrens.forEach(function (c) {
                if (c.duration > max_1) {
                    found_1 = c;
                    max_1 = c.duration;
                }
            });
            finalNodes[found_1.pID] = found_1;
            node = found_1;
        }
        else {
            node = null;
        }
    };
    while (node) {
        _loop_1();
    }
};
//# sourceMappingURL=utils.js.map
},{}],"zrDB":[function(require,module,exports) {
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
// Function to open/close and hide/show children of specified task
exports.folder = function (pID, ganttObj) {
    var vList = ganttObj.getList();
    ganttObj.clearDependencies(); // clear these first so slow rendering doesn't look odd
    for (var i = 0; i < vList.length; i++) {
        if (vList[i].getID() == pID) {
            if (vList[i].getOpen() == 1) {
                vList[i].setOpen(0);
                exports.hide(pID, ganttObj);
                if (utils_1.isIE())
                    vList[i].getGroupSpan().innerText = '+';
                else
                    vList[i].getGroupSpan().textContent = '+';
            }
            else {
                vList[i].setOpen(1);
                exports.show(pID, 1, ganttObj);
                if (utils_1.isIE())
                    vList[i].getGroupSpan().innerText = '-';
                else
                    vList[i].getGroupSpan().textContent = '-';
            }
        }
    }
    var bd;
    if (this.vDebug) {
        bd = new Date();
        console.log('after drawDependency', bd);
    }
    ganttObj.DrawDependencies(this.vDebug);
    if (this.vDebug) {
        var ad = new Date();
        console.log('after drawDependency', ad, (ad.getTime() - bd.getTime()));
    }
};
exports.hide = function (pID, ganttObj) {
    var vList = ganttObj.getList();
    var vID = 0;
    for (var i = 0; i < vList.length; i++) {
        if (vList[i].getParent() == pID) {
            vID = vList[i].getID();
            // it's unlikely but if the task list has been updated since
            // the chart was drawn some of the rows may not exist
            if (vList[i].getListChildRow())
                vList[i].getListChildRow().style.display = 'none';
            if (vList[i].getChildRow())
                vList[i].getChildRow().style.display = 'none';
            vList[i].setVisible(0);
            if (vList[i].getGroup())
                exports.hide(vID, ganttObj);
        }
    }
};
// Function to show children of specified task
exports.show = function (pID, pTop, ganttObj) {
    var vList = ganttObj.getList();
    var vID = 0;
    var vState = '';
    for (var i = 0; i < vList.length; i++) {
        if (vList[i].getParent() == pID) {
            if (vList[i].getParItem().getGroupSpan()) {
                if (utils_1.isIE())
                    vState = vList[i].getParItem().getGroupSpan().innerText;
                else
                    vState = vList[i].getParItem().getGroupSpan().textContent;
            }
            i = vList.length;
        }
    }
    for (var i = 0; i < vList.length; i++) {
        if (vList[i].getParent() == pID) {
            var vChgState = false;
            vID = vList[i].getID();
            if (pTop == 1 && vState == '+')
                vChgState = true;
            else if (vState == '-')
                vChgState = true;
            else if (vList[i].getParItem() && vList[i].getParItem().getGroup() == 2)
                vList[i].setVisible(1);
            if (vChgState) {
                if (vList[i].getListChildRow())
                    vList[i].getListChildRow().style.display = '';
                if (vList[i].getChildRow())
                    vList[i].getChildRow().style.display = '';
                vList[i].setVisible(1);
            }
            if (vList[i].getGroup())
                exports.show(vID, 0, ganttObj);
        }
    }
};
// function to open window to display task link
exports.taskLink = function (pRef, pWidth, pHeight) {
    var vWidth, vHeight;
    if (pWidth)
        vWidth = pWidth;
    else
        vWidth = 400;
    if (pHeight)
        vHeight = pHeight;
    else
        vHeight = 400;
    window.open(pRef, 'newwin', 'height=' + vHeight + ',width=' + vWidth); // let OpenWindow = 
};
exports.sortTasks = function (pList, pID, pIdx) {
    if (pList.length < 2) {
        return pIdx;
    }
    var sortIdx = pIdx;
    var sortArr = new Array();
    for (var i = 0; i < pList.length; i++) {
        if (pList[i].getParent() == pID)
            sortArr.push(pList[i]);
    }
    if (sortArr.length > 0) {
        sortArr.sort(function (a, b) {
            var i = a.getStart().getTime() - b.getStart().getTime();
            if (i == 0)
                i = a.getEnd().getTime() - b.getEnd().getTime();
            if (i == 0)
                return a.getID() - b.getID();
            else
                return i;
        });
    }
    for (var j = 0; j < sortArr.length; j++) {
        for (var i = 0; i < pList.length; i++) {
            if (pList[i].getID() == sortArr[j].getID()) {
                pList[i].setSortIdx(sortIdx++);
                sortIdx = exports.sortTasks(pList, pList[i].getID(), sortIdx);
            }
        }
    }
    return sortIdx;
};
exports.TaskItemObject = function (object) {
    var pDataObject = __assign({}, object);
    utils_1.internalProperties.forEach(function (property) {
        delete pDataObject[property];
    });
    return new exports.TaskItem(object.pID, object.pName, object.pStart, object.pEnd, object.pClass, object.pLink, object.pMile, object.pRes, object.pComp, object.pGroup, object.pParent, object.pOpen, object.pDepend, object.pCaption, object.pNotes, object.pGantt, object.pCost, object.pPlanStart, object.pPlanEnd, object.pDuration, object);
};
exports.TaskItem = function (pID, pName, pStart, pEnd, pClass, pLink, pMile, pRes, pComp, pGroup, pParent, pOpen, pDepend, pCaption, pNotes, pGantt, pCost, pPlanStart, pPlanEnd, pDuration, pDataObject) {
    if (pCost === void 0) { pCost = null; }
    if (pPlanStart === void 0) { pPlanStart = null; }
    if (pPlanEnd === void 0) { pPlanEnd = null; }
    if (pDuration === void 0) { pDuration = null; }
    if (pDataObject === void 0) { pDataObject = null; }
    var vGantt = pGantt ? pGantt : this;
    var _id = document.createTextNode(pID).data;
    var vID = utils_1.hashKey(document.createTextNode(pID).data);
    var vName = document.createTextNode(pName).data;
    var vStart = null;
    var vEnd = null;
    var vPlanStart = null;
    var vPlanEnd = null;
    var vGroupMinStart = null;
    var vGroupMinEnd = null;
    var vClass = document.createTextNode(pClass).data;
    var vLink = document.createTextNode(pLink).data;
    var vMile = parseInt(document.createTextNode(pMile).data);
    var vRes = document.createTextNode(pRes).data;
    var vComp = parseFloat(document.createTextNode(pComp).data);
    var vCost = parseInt(document.createTextNode(pCost).data);
    var vGroup = parseInt(document.createTextNode(pGroup).data);
    var vDataObject = pDataObject;
    var vCompVal;
    var parent = document.createTextNode(pParent).data;
    if (parent && parent !== '0') {
        parent = utils_1.hashKey(parent).toString();
    }
    var vParent = parent;
    var vOpen = (vGroup == 2) ? 1 : parseInt(document.createTextNode(pOpen).data);
    var vDepend = new Array();
    var vDependType = new Array();
    var vCaption = document.createTextNode(pCaption).data;
    var vDuration = pDuration || '';
    var vLevel = 0;
    var vNumKid = 0;
    var vWeight = 0;
    var vVisible = 1;
    var vSortIdx = 0;
    var vToDelete = false;
    var x1, y1, x2, y2;
    var vNotes;
    var vParItem = null;
    var vCellDiv = null;
    var vBarDiv = null;
    var vTaskDiv = null;
    var vListChildRow = null;
    var vChildRow = null;
    var vGroupSpan = null;
    vNotes = document.createElement('span');
    vNotes.className = 'gTaskNotes';
    if (pNotes != null) {
        vNotes.innerHTML = pNotes;
        utils_1.stripUnwanted(vNotes);
    }
    if (pStart != null && pStart != '') {
        vStart = (pStart instanceof Date) ? pStart : utils_1.parseDateStr(document.createTextNode(pStart).data, vGantt.getDateInputFormat());
        vGroupMinStart = vStart;
    }
    if (pEnd != null && pEnd != '') {
        vEnd = (pEnd instanceof Date) ? pEnd : utils_1.parseDateStr(document.createTextNode(pEnd).data, vGantt.getDateInputFormat());
        vGroupMinEnd = vEnd;
    }
    if (pPlanStart != null && pPlanStart != '') {
        vPlanStart = (pPlanStart instanceof Date) ? pPlanStart : utils_1.parseDateStr(document.createTextNode(pPlanStart).data, vGantt.getDateInputFormat());
        vGroupMinStart = vPlanStart;
    }
    if (pPlanEnd != null && pPlanEnd != '') {
        vPlanEnd = (pPlanEnd instanceof Date) ? pPlanEnd : utils_1.parseDateStr(document.createTextNode(pPlanEnd).data, vGantt.getDateInputFormat());
        vGroupMinEnd = vPlanEnd;
    }
    if (pDepend != null) {
        var vDependStr = pDepend + '';
        var vDepList = vDependStr.split(',');
        var n = vDepList.length;
        for (var k = 0; k < n; k++) {
            if (vDepList[k].toUpperCase().indexOf('SS') != -1) {
                vDepend[k] = vDepList[k].substring(0, vDepList[k].toUpperCase().indexOf('SS'));
                vDependType[k] = 'SS';
            }
            else if (vDepList[k].toUpperCase().indexOf('FF') != -1) {
                vDepend[k] = vDepList[k].substring(0, vDepList[k].toUpperCase().indexOf('FF'));
                vDependType[k] = 'FF';
            }
            else if (vDepList[k].toUpperCase().indexOf('SF') != -1) {
                vDepend[k] = vDepList[k].substring(0, vDepList[k].toUpperCase().indexOf('SF'));
                vDependType[k] = 'SF';
            }
            else if (vDepList[k].toUpperCase().indexOf('FS') != -1) {
                vDepend[k] = vDepList[k].substring(0, vDepList[k].toUpperCase().indexOf('FS'));
                vDependType[k] = 'FS';
            }
            else {
                vDepend[k] = vDepList[k];
                vDependType[k] = 'FS';
            }
            if (vDepend[k]) {
                vDepend[k] = utils_1.hashKey(vDepend[k]).toString();
            }
        }
    }
    this.getID = function () { return vID; };
    this.getOriginalID = function () { return _id; };
    this.getGantt = function () { return vGantt; };
    this.getName = function () { return vName; };
    this.getStart = function () {
        if (vStart)
            return vStart;
        else if (vPlanStart)
            return vPlanStart;
        else
            return new Date();
    };
    this.getEnd = function () {
        if (vEnd)
            return vEnd;
        else if (vPlanEnd)
            return vPlanEnd;
        else if (vStart && vDuration) {
            var date = new Date(vStart);
            var vUnits = vDuration.split(' ');
            var value = parseInt(vUnits[0]);
            switch (vUnits[1]) {
                case 'hour':
                    date.setMinutes(date.getMinutes() + (value * 60));
                    break;
                case 'day':
                    date.setMinutes(date.getMinutes() + (value * 60 * 24));
                    break;
                case 'week':
                    date.setMinutes(date.getMinutes() + (value * 60 * 24 * 7));
                    break;
                case 'month':
                    date.setMonth(date.getMonth() + (value));
                    break;
                case 'quarter':
                    date.setMonth(date.getMonth() + (value * 3));
                    break;
            }
            return date;
        }
        else
            return new Date();
    };
    this.getPlanStart = function () { return vPlanStart ? vPlanStart : vStart; };
    this.getPlanEnd = function () { return vPlanEnd ? vPlanEnd : vEnd; };
    this.getCost = function () { return vCost; };
    this.getGroupMinStart = function () { return vGroupMinStart; };
    this.getGroupMinEnd = function () { return vGroupMinEnd; };
    this.getClass = function () { return vClass; };
    this.getLink = function () { return vLink; };
    this.getMile = function () { return vMile; };
    this.getDepend = function () {
        if (vDepend)
            return vDepend;
        else
            return null;
    };
    this.getDataObject = function () { return vDataObject; };
    this.getDepType = function () { if (vDependType)
        return vDependType;
    else
        return null; };
    this.getCaption = function () { if (vCaption)
        return vCaption;
    else
        return ''; };
    this.getResource = function () { if (vRes)
        return vRes;
    else
        return '\u00A0'; };
    this.getCompVal = function () { if (vComp)
        return vComp;
    else if (vCompVal)
        return vCompVal;
    else
        return 0; };
    this.getCompStr = function () { if (vComp)
        return vComp + '%';
    else if (vCompVal)
        return vCompVal + '%';
    else
        return ''; };
    this.getNotes = function () { return vNotes; };
    this.getSortIdx = function () { return vSortIdx; };
    this.getToDelete = function () { return vToDelete; };
    this.getDuration = function (pFormat, pLang) {
        if (vMile) {
            vDuration = '-';
        }
        else if (!vEnd && vDuration) {
            return vDuration;
        }
        else {
            var vUnits = null;
            switch (pFormat) {
                case 'week':
                    vUnits = 'day';
                    break;
                case 'month':
                    vUnits = 'week';
                    break;
                case 'quarter':
                    vUnits = 'month';
                    break;
                default:
                    vUnits = pFormat;
                    break;
            }
            // let vTaskEnd = new Date(this.getEnd().getTime());
            // if ((vTaskEnd.getTime() - (vTaskEnd.getTimezoneOffset() * 60000)) % (86400000) == 0) {
            //   vTaskEnd = new Date(vTaskEnd.getFullYear(), vTaskEnd.getMonth(), vTaskEnd.getDate() + 1, vTaskEnd.getHours(), vTaskEnd.getMinutes(), vTaskEnd.getSeconds());
            // }
            // let tmpPer = (getOffset(this.getStart(), vTaskEnd, 999, vUnits)) / 1000;
            var hours = (this.getEnd().getTime() - this.getStart().getTime()) / 1000 / 60 / 60;
            var tmpPer = void 0;
            switch (vUnits) {
                case 'hour':
                    tmpPer = Math.round(hours);
                    vDuration = tmpPer + ' ' + ((tmpPer != 1) ? pLang['hrs'] : pLang['hr']);
                    break;
                case 'day':
                    tmpPer = Math.round(hours / 24);
                    vDuration = tmpPer + ' ' + ((tmpPer != 1) ? pLang['dys'] : pLang['dy']);
                    break;
                case 'week':
                    tmpPer = Math.round(hours / 24 / 7);
                    vDuration = tmpPer + ' ' + ((tmpPer != 1) ? pLang['wks'] : pLang['wk']);
                    break;
                case 'month':
                    tmpPer = Math.round(hours / 24 / 7 / 30);
                    vDuration = tmpPer + ' ' + ((tmpPer != 1) ? pLang['mths'] : pLang['mth']);
                    break;
                case 'quarter':
                    tmpPer = Math.round(hours / 24 / 7 / 30 / 3);
                    vDuration = tmpPer + ' ' + ((tmpPer != 1) ? pLang['qtrs'] : pLang['qtr']);
                    break;
            }
        }
        return vDuration;
    };
    this.getParent = function () { return vParent; };
    this.getGroup = function () { return vGroup; };
    this.getOpen = function () { return vOpen; };
    this.getLevel = function () { return vLevel; };
    this.getNumKids = function () { return vNumKid; };
    this.getWeight = function () { return vWeight; };
    this.getStartX = function () { return x1; };
    this.getStartY = function () { return y1; };
    this.getEndX = function () { return x2; };
    this.getEndY = function () { return y2; };
    this.getVisible = function () { return vVisible; };
    this.getParItem = function () { return vParItem; };
    this.getCellDiv = function () { return vCellDiv; };
    this.getBarDiv = function () { return vBarDiv; };
    this.getTaskDiv = function () { return vTaskDiv; };
    this.getChildRow = function () { return vChildRow; };
    this.getListChildRow = function () { return vListChildRow; };
    this.getGroupSpan = function () { return vGroupSpan; };
    this.setName = function (pName) { vName = pName; };
    this.setNotes = function (pNotes) { vNotes = pNotes; };
    this.setClass = function (pClass) { vClass = pClass; };
    this.setCost = function (pCost) { vCost = pCost; };
    this.setResource = function (pRes) { vRes = pRes; };
    this.setDuration = function (pDuration) { vDuration = pDuration; };
    this.setDataObject = function (pDataObject) { vDataObject = pDataObject; };
    this.setStart = function (pStart) {
        if (pStart instanceof Date) {
            vStart = pStart;
        }
        else {
            var temp = new Date(pStart);
            if (temp instanceof Date && !isNaN(temp.valueOf())) {
                vStart = temp;
            }
        }
    };
    this.setEnd = function (pEnd) {
        if (pEnd instanceof Date) {
            vEnd = pEnd;
        }
        else {
            var temp = new Date(pEnd);
            if (temp instanceof Date && !isNaN(temp.valueOf())) {
                vEnd = temp;
            }
        }
    };
    this.setPlanStart = function (pPlanStart) {
        if (pPlanStart instanceof Date)
            vPlanStart = pPlanStart;
        else
            vPlanStart = new Date(pPlanStart);
    };
    this.setPlanEnd = function (pPlanEnd) {
        if (pPlanEnd instanceof Date)
            vPlanEnd = pPlanEnd;
        else
            vPlanEnd = new Date(pPlanEnd);
    };
    this.setGroupMinStart = function (pStart) { if (pStart instanceof Date)
        vGroupMinStart = pStart; };
    this.setGroupMinEnd = function (pEnd) { if (pEnd instanceof Date)
        vGroupMinEnd = pEnd; };
    this.setLevel = function (pLevel) { vLevel = parseInt(document.createTextNode(pLevel).data); };
    this.setNumKid = function (pNumKid) { vNumKid = parseInt(document.createTextNode(pNumKid).data); };
    this.setWeight = function (pWeight) { vWeight = parseInt(document.createTextNode(pWeight).data); };
    this.setCompVal = function (pCompVal) { vCompVal = parseFloat(document.createTextNode(pCompVal).data); };
    this.setComp = function (pComp) {
        vComp = parseInt(document.createTextNode(pComp).data);
    };
    this.setStartX = function (pX) { x1 = parseInt(document.createTextNode(pX).data); };
    this.setStartY = function (pY) { y1 = parseInt(document.createTextNode(pY).data); };
    this.setEndX = function (pX) { x2 = parseInt(document.createTextNode(pX).data); };
    this.setEndY = function (pY) { y2 = parseInt(document.createTextNode(pY).data); };
    this.setOpen = function (pOpen) { vOpen = parseInt(document.createTextNode(pOpen).data); };
    this.setVisible = function (pVisible) { vVisible = parseInt(document.createTextNode(pVisible).data); };
    this.setSortIdx = function (pSortIdx) { vSortIdx = parseInt(document.createTextNode(pSortIdx).data); };
    this.setToDelete = function (pToDelete) { if (pToDelete)
        vToDelete = true;
    else
        vToDelete = false; };
    this.setParItem = function (pParItem) { if (pParItem)
        vParItem = pParItem; };
    this.setCellDiv = function (pCellDiv) { if (typeof HTMLDivElement !== 'function' || pCellDiv instanceof HTMLDivElement)
        vCellDiv = pCellDiv; }; //"typeof HTMLDivElement !== 'function'" to play nice with ie6 and 7
    this.setGroup = function (pGroup) {
        if (pGroup === true || pGroup === 'true') {
            vGroup = 1;
        }
        else if (pGroup === false || pGroup === 'false') {
            vGroup = 0;
        }
        else {
            vGroup = parseInt(document.createTextNode(pGroup).data);
        }
    };
    this.setBarDiv = function (pDiv) { if (typeof HTMLDivElement !== 'function' || pDiv instanceof HTMLDivElement)
        vBarDiv = pDiv; };
    this.setTaskDiv = function (pDiv) { if (typeof HTMLDivElement !== 'function' || pDiv instanceof HTMLDivElement)
        vTaskDiv = pDiv; };
    this.setChildRow = function (pRow) { if (typeof HTMLTableRowElement !== 'function' || pRow instanceof HTMLTableRowElement)
        vChildRow = pRow; };
    this.setListChildRow = function (pRow) { if (typeof HTMLTableRowElement !== 'function' || pRow instanceof HTMLTableRowElement)
        vListChildRow = pRow; };
    this.setGroupSpan = function (pSpan) { if (typeof HTMLSpanElement !== 'function' || pSpan instanceof HTMLSpanElement)
        vGroupSpan = pSpan; };
    this.getAllData = function () {
        return {
            pID: vID,
            pName: vName,
            pStart: vStart,
            pEnd: vEnd,
            pPlanStart: vPlanStart,
            pPlanEnd: vPlanEnd,
            pGroupMinStart: vGroupMinStart,
            pGroupMinEnd: vGroupMinEnd,
            pClass: vClass,
            pLink: vLink,
            pMile: vMile,
            pRes: vRes,
            pComp: vComp,
            pCost: vCost,
            pGroup: vGroup,
            pDataObjec: vDataObject
        };
    };
};
exports.createTaskInfo = function (pTask, template) {
    var _this = this;
    if (template === void 0) { template = null; }
    var vTmpDiv;
    var vTaskInfoBox = document.createDocumentFragment();
    var vTaskInfo = this.newNode(vTaskInfoBox, 'div', null, 'gTaskInfo');
    if (template) {
        var allData_1 = pTask.getAllData();
        utils_1.internalProperties.forEach(function (key) {
            var lang;
            if (utils_1.internalPropertiesLang[key]) {
                lang = _this.vLangs[_this.vLang][utils_1.internalPropertiesLang[key]];
            }
            if (!lang) {
                lang = key;
            }
            var val = allData_1[key];
            template = template.replace("{{" + key + "}}", val);
            if (lang) {
                template = template.replace("{{Lang:" + key + "}}", lang);
            }
            else {
                template = template.replace("{{Lang:" + key + "}}", key);
            }
        });
        this.newNode(vTaskInfo, 'span', null, 'gTtTemplate', template);
    }
    else {
        this.newNode(vTaskInfo, 'span', null, 'gTtTitle', pTask.getName());
        if (this.vShowTaskInfoStartDate == 1) {
            vTmpDiv = this.newNode(vTaskInfo, 'div', null, 'gTILine gTIsd');
            this.newNode(vTmpDiv, 'span', null, 'gTaskLabel', this.vLangs[this.vLang]['startdate'] + ': ');
            this.newNode(vTmpDiv, 'span', null, 'gTaskText', utils_1.formatDateStr(pTask.getStart(), this.vDateTaskDisplayFormat, this.vLangs[this.vLang]));
        }
        if (this.vShowTaskInfoEndDate == 1) {
            vTmpDiv = this.newNode(vTaskInfo, 'div', null, 'gTILine gTIed');
            this.newNode(vTmpDiv, 'span', null, 'gTaskLabel', this.vLangs[this.vLang]['enddate'] + ': ');
            this.newNode(vTmpDiv, 'span', null, 'gTaskText', utils_1.formatDateStr(pTask.getEnd(), this.vDateTaskDisplayFormat, this.vLangs[this.vLang]));
        }
        if (this.vShowTaskInfoDur == 1 && !pTask.getMile()) {
            vTmpDiv = this.newNode(vTaskInfo, 'div', null, 'gTILine gTId');
            this.newNode(vTmpDiv, 'span', null, 'gTaskLabel', this.vLangs[this.vLang]['duration'] + ': ');
            this.newNode(vTmpDiv, 'span', null, 'gTaskText', pTask.getDuration(this.vFormat, this.vLangs[this.vLang]));
        }
        if (this.vShowTaskInfoComp == 1) {
            vTmpDiv = this.newNode(vTaskInfo, 'div', null, 'gTILine gTIc');
            this.newNode(vTmpDiv, 'span', null, 'gTaskLabel', this.vLangs[this.vLang]['completion'] + ': ');
            this.newNode(vTmpDiv, 'span', null, 'gTaskText', pTask.getCompStr());
        }
        if (this.vShowTaskInfoRes == 1) {
            vTmpDiv = this.newNode(vTaskInfo, 'div', null, 'gTILine gTIr');
            this.newNode(vTmpDiv, 'span', null, 'gTaskLabel', this.vLangs[this.vLang]['resource'] + ': ');
            this.newNode(vTmpDiv, 'span', null, 'gTaskText', pTask.getResource());
        }
        if (this.vShowTaskInfoLink == 1 && pTask.getLink() != '') {
            vTmpDiv = this.newNode(vTaskInfo, 'div', null, 'gTILine gTIl');
            var vTmpNode = this.newNode(vTmpDiv, 'span', null, 'gTaskLabel');
            vTmpNode = this.newNode(vTmpNode, 'a', null, 'gTaskText', this.vLangs[this.vLang]['moreinfo']);
            vTmpNode.setAttribute('href', pTask.getLink());
        }
        if (this.vShowTaskInfoNotes == 1) {
            vTmpDiv = this.newNode(vTaskInfo, 'div', null, 'gTILine gTIn');
            this.newNode(vTmpDiv, 'span', null, 'gTaskLabel', this.vLangs[this.vLang]['notes'] + ': ');
            if (pTask.getNotes())
                vTmpDiv.appendChild(pTask.getNotes());
        }
    }
    return vTaskInfoBox;
};
exports.AddTaskItem = function (value) {
    var vExists = false;
    for (var i = 0; i < this.vTaskList.length; i++) {
        if (this.vTaskList[i].getID() == value.getID()) {
            i = this.vTaskList.length;
            vExists = true;
        }
    }
    if (!vExists) {
        this.vTaskList.push(value);
        this.vProcessNeeded = true;
    }
};
exports.AddTaskItemObject = function (object) {
    if (!object.pGantt) {
        object.pGantt = this;
    }
    return this.AddTaskItem(exports.TaskItemObject(object));
};
exports.RemoveTaskItem = function (pID) {
    // simply mark the task for removal at this point - actually remove it next time we re-draw the chart
    for (var i = 0; i < this.vTaskList.length; i++) {
        if (this.vTaskList[i].getID() == pID)
            this.vTaskList[i].setToDelete(true);
        else if (this.vTaskList[i].getParent() == pID)
            this.RemoveTaskItem(this.vTaskList[i].getID());
    }
    this.vProcessNeeded = true;
};
exports.ClearTasks = function () {
    var _this = this;
    this.vTaskList.map(function (task) { return _this.RemoveTaskItem(task.getID()); });
    this.vProcessNeeded = true;
};
// Recursively process task tree ... set min, max dates of parent tasks and identfy task level.
exports.processRows = function (pList, pID, pRow, pLevel, pOpen, pUseSort, vDebug) {
    if (vDebug === void 0) { vDebug = false; }
    var vMinDate = new Date();
    var vMaxDate = new Date();
    var vVisible = pOpen;
    var vCurItem = null;
    var vCompSum = 0;
    var vMinSet = 0;
    var vMaxSet = 0;
    var vNumKid = 0;
    var vWeight = 0;
    var vLevel = pLevel;
    var vList = pList;
    var vComb = false;
    var i = 0;
    for (i = 0; i < pList.length; i++) {
        if (pList[i].getToDelete()) {
            pList.splice(i, 1);
            i--;
        }
        if (i >= 0 && pList[i].getID() == pID)
            vCurItem = pList[i];
    }
    for (i = 0; i < pList.length; i++) {
        if (pList[i].getParent() == pID) {
            vVisible = pOpen;
            pList[i].setParItem(vCurItem);
            pList[i].setVisible(vVisible);
            if (vVisible == 1 && pList[i].getOpen() == 0)
                vVisible = 0;
            if (pList[i].getMile() && pList[i].getParItem() && pList[i].getParItem().getGroup() == 2) { //remove milestones owned by combined groups
                pList.splice(i, 1);
                i--;
                continue;
            }
            pList[i].setLevel(vLevel);
            if (pList[i].getGroup()) {
                if (pList[i].getParItem() && pList[i].getParItem().getGroup() == 2)
                    pList[i].setGroup(2);
                exports.processRows(vList, pList[i].getID(), i, vLevel + 1, vVisible, 0);
            }
            if (vMinSet == 0 || pList[i].getStart() < vMinDate) {
                vMinDate = pList[i].getStart();
                vMinSet = 1;
            }
            if (vMaxSet == 0 || pList[i].getEnd() > vMaxDate) {
                vMaxDate = pList[i].getEnd();
                vMaxSet = 1;
            }
            vNumKid++;
            vWeight += pList[i].getEnd() - pList[i].getStart() + 1;
            vCompSum += pList[i].getCompVal() * (pList[i].getEnd() - pList[i].getStart() + 1);
            pList[i].setSortIdx(i * pList.length);
        }
    }
    if (pRow >= 0) {
        if (pList[pRow].getGroupMinStart() != null && pList[pRow].getGroupMinStart() < vMinDate) {
            vMinDate = pList[pRow].getGroupMinStart();
        }
        if (pList[pRow].getGroupMinEnd() != null && pList[pRow].getGroupMinEnd() > vMaxDate) {
            vMaxDate = pList[pRow].getGroupMinEnd();
        }
        pList[pRow].setStart(vMinDate);
        pList[pRow].setEnd(vMaxDate);
        pList[pRow].setNumKid(vNumKid);
        pList[pRow].setWeight(vWeight);
        pList[pRow].setCompVal(Math.ceil(vCompSum / vWeight));
    }
    if (pID == 0 && pUseSort == 1) {
        var bd = void 0;
        if (vDebug) {
            bd = new Date();
            console.log('before afterTasks', bd);
        }
        exports.sortTasks(pList, 0, 0);
        if (vDebug) {
            var ad = new Date();
            console.log('after afterTasks', ad, (ad.getTime() - bd.getTime()));
        }
        pList.sort(function (a, b) { return a.getSortIdx() - b.getSortIdx(); });
    }
    if (pID == 0 && pUseSort != 1) // Need to sort combined tasks regardless
     {
        for (i = 0; i < pList.length; i++) {
            if (pList[i].getGroup() == 2) {
                vComb = true;
                var bd = void 0;
                if (vDebug) {
                    bd = new Date();
                    console.log('before sortTasks', bd);
                }
                exports.sortTasks(pList, pList[i].getID(), pList[i].getSortIdx() + 1);
                if (vDebug) {
                    var ad = new Date();
                    console.log('after sortTasks', ad, (ad.getTime() - bd.getTime()));
                }
            }
        }
        if (vComb == true)
            pList.sort(function (a, b) { return a.getSortIdx() - b.getSortIdx(); });
    }
};
//# sourceMappingURL=task.js.map
},{"./utils":"WqwM"}],"N4Jh":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var es = {
    'january': 'Enero',
    'february': 'Febrero',
    'march': 'Marzo',
    'april': 'Abril',
    'maylong': 'Mayo',
    'june': 'Junio',
    'july': 'Julio',
    'august': 'Agosto',
    'september': 'Septiembre',
    'october': 'Octubre',
    'november': 'Noviembre',
    'december': 'Diciembre',
    'jan': 'Ene',
    'feb': 'Feb',
    'mar': 'Mar',
    'apr': 'Abr',
    'may': 'May',
    'jun': 'Jun',
    'jul': 'Jul',
    'aug': 'Ago',
    'sep': 'Sep',
    'oct': 'Oct',
    'nov': 'Nov',
    'dec': 'Dic',
    'sunday': 'Domingo',
    'monday': 'Lunes',
    'tuesday': 'Martes',
    'wednesday': 'Miércoles',
    'thursday': 'Jueves',
    'friday': 'Viernes',
    'saturday': 'Sábado',
    'sun': '	Dom',
    'mon': '	Lun',
    'tue': '	Mar',
    'wed': '	Mie',
    'thu': '	Jue',
    'fri': '	Vie',
    'sat': '	Sab',
    'resource': 'Recurso',
    'duration': 'Duración',
    'comp': '% Completado',
    'completion': 'Terminado',
    'startdate': 'Inicio',
    'planstartdate': 'Inicio Plan',
    'cost': 'Custo',
    'enddate': 'Fin',
    'planenddate': 'Plan Fin',
    'moreinfo': '+información',
    'notes': 'Notas',
    'format': 'Formato',
    'hour': 'Hora',
    'day': 'Dia',
    'week': 'Semana',
    'month': 'Mes',
    'quarter': 'Trimestre',
    'hours': 'Horas',
    'days': 'Días',
    'weeks': 'Semanas',
    'months': 'Meses',
    'quarters': 'Trimestres',
    'hr': 'Hr',
    'dy': 'D',
    'wk': 'Sem',
    'mth': 'Mes',
    'qtr': 'Trim',
    'hrs': 'Hrs',
    'dys': 'Dias',
    'wks': 'Sems',
    'mths': 'Meses',
    'qtrs': 'Trims'
};
exports.es = es;
var en = {
    'format': 'Format',
    'hour': 'Hour',
    'day': 'Day',
    'week': 'Week',
    'month': 'Month',
    'quarter': 'Quarter',
    'hours': 'Hours',
    'days': 'Days',
    'weeks': 'Weeks',
    'months': 'Months',
    'quarters': 'Quarters',
    'hr': 'Hr',
    'dy': 'Day',
    'wk': 'Wk',
    'mth': 'Mth',
    'qtr': 'Qtr',
    'hrs': 'Hrs',
    'dys': 'Days',
    'wks': 'Wks',
    'mths': 'Mths',
    'qtrs': 'Qtrs',
    'resource': 'Resource',
    'duration': 'Duration',
    'comp': '% Comp.',
    'completion': 'Completion',
    'startdate': 'Start Date',
    'planstartdate': 'Plan Start Date',
    'enddate': 'End Date',
    'planenddate': 'Plan End Date',
    'cost': 'Cost',
    'moreinfo': 'More Information',
    'notes': 'Notes',
    'january': 'January',
    'february': 'February',
    'march': 'March',
    'april': 'April',
    'maylong': 'May',
    'june': 'June',
    'july': 'July',
    'august': 'August',
    'september': 'September',
    'october': 'October',
    'november': 'November',
    'december': 'December',
    'jan': 'Jan',
    'feb': 'Feb',
    'mar': 'Mar',
    'apr': 'Apr',
    'may': 'May',
    'jun': 'Jun',
    'jul': 'Jul',
    'aug': 'Aug',
    'sep': 'Sep',
    'oct': 'Oct',
    'nov': 'Nov',
    'dec': 'Dec',
    'sunday': 'Sunday',
    'monday': 'Monday',
    'tuesday': 'Tuesday',
    'wednesday': 'Wednesday',
    'thursday': 'Thursday',
    'friday': 'Friday',
    'saturday': 'Saturday',
    'sun': 'Sun',
    'mon': 'Mon',
    'tue': 'Tue',
    'wed': 'Wed',
    'thu': 'Thu',
    'fri': 'Fri',
    'sat': 'Sat'
};
exports.en = en;
var de = {
    'format': 'Ansicht',
    'hour': 'Stunde',
    'day': 'Tag',
    'week': 'Woche',
    'month': 'Monat',
    'quarter': 'Quartal',
    'hours': 'Stunden',
    'days': 'Tage',
    'weeks': 'Wochen',
    'months': 'Monate',
    'quarters': 'Quartale',
    'hr': 'h',
    'dy': 'T',
    'wk': 'W',
    'mth': 'M',
    'qtr': 'Q',
    'hrs': 'Std',
    'dys': 'Tage',
    'wks': 'Wochen',
    'mths': 'Monate',
    'qtrs': 'Quartal',
    'resource': 'Resource',
    'duration': 'Dauer',
    'comp': '%Fertig',
    'completion': 'Fertigstellung',
    'startdate': 'Erste Buchu',
    'planstartdate': 'Erste Buchu Plan',
    'enddate': 'Letzte Buchung',
    'planenddate': 'Plan Letzte Buchung',
    'cost': 'Cost',
    'moreinfo': 'Weitere Infos',
    'notes': 'Anmerkung',
    'january': 'Jänner',
    'february': 'Februar',
    'march': 'März',
    'april': 'April',
    'maylong': 'Mai',
    'june': 'Juni',
    'july': 'Juli',
    'august': 'August',
    'september': 'September',
    'october': 'Oktober',
    'november': 'November',
    'december': 'Dezember',
    'jan': 'Jan',
    'feb': 'Feb',
    'mar': 'Mar',
    'apr': 'Apr',
    'may': 'Mai',
    'jun': 'Jun',
    'jul': 'Jul',
    'aug': 'Aug',
    'sep': 'Sep',
    'oct': 'Okt',
    'nov': 'Nov',
    'dec': 'Dez',
    'sunday': 'Sonntag',
    'monday': 'Montag',
    'tuesday': 'Dienstag',
    'wednesday': 'Mittwoch',
    'thursday': 'Donnerstag',
    'friday': 'Freitag',
    'saturday': 'Samstag',
    'sun': 'So',
    'mon': 'Mo', 'tue': 'Di', 'wed': 'Mi', 'thu': 'Do', 'fri': 'Fr', 'sat': 'Sa'
};
exports.de = de;
var pt = {
    'hours': 'Horas',
    'days': 'Dias',
    'weeks': 'Weeks',
    'months': 'Months',
    'quarters': 'Quarters',
    'format': 'Formato',
    'hour': 'Hora',
    'day': 'Dia',
    'week': 'Semana',
    'month': 'Mês',
    'quarter': 'Trimestre',
    'hr': 'hr',
    'dy': 'dia',
    'wk': 'sem.',
    'mth': 'mês',
    'qtr': 'qtr',
    'hrs': 'hrs',
    'dys': 'dias',
    'wks': 'sem.',
    'mths': 'meses',
    'qtrs': 'qtrs',
    'completion': 'Terminado',
    'comp': '% Completado',
    'moreinfo': 'Mais informações',
    'notes': 'Notas',
    'resource': 'Responsável',
    'duration': 'Duração',
    'startdate': 'Data inicial',
    'planstartdate': 'Plan Data inicial',
    'enddate': 'Data final',
    'planenddate': 'Plan Data final',
    'cost': 'Custo',
    'jan': 'Jan',
    'feb': 'Fev',
    'mar': 'Mar',
    'apr': 'Abr',
    'may': 'Mai',
    'jun': 'Jun',
    'jul': 'Jul',
    'aug': 'Ago',
    'sep': 'Set',
    'oct': 'Out',
    'nov': 'Nov',
    'dec': 'Dez',
    'january': 'Janeiro',
    'february': 'Fevereiro',
    'march': 'Março',
    'april': 'Abril',
    'maylong': 'Maio',
    'june': 'Junho',
    'july': 'Julho',
    'august': 'Agosto',
    'september': 'Setembro',
    'october': 'Outubro',
    'november': 'Novembro',
    'december': 'Dezembro',
    'sun': 'Dom',
    'mon': 'Seg',
    'tue': 'Ter',
    'wed': 'Qua',
    'thu': 'Qui',
    'fri': 'Sex',
    'sat': 'Sab'
};
exports.pt = pt;
var ru = {
    'january': 'Январь',
    'february': 'Февраль',
    'march': 'Март',
    'april': 'Апрель',
    'maylong': 'Май',
    'june': 'Июнь',
    'july': 'Июль',
    'august': 'Август', 'september': 'Сентябрь',
    'october': 'Октябрь',
    'november': 'Ноябрь',
    'december': 'Декабрь',
    'jan': 'Янв',
    'feb': 'Фев',
    'mar': 'Мар',
    'apr': 'Апр',
    'may': 'Май',
    'jun': 'Июн',
    'jul': 'Июл',
    'aug': 'Авг',
    'sep': 'Сен',
    'oct': 'Окт',
    'nov': 'Ноя',
    'dec': 'Дек',
    'sunday': 'Воскресенье',
    'monday': 'Понедельник',
    'tuesday': 'Вторник',
    'wednesday': 'Среда',
    'thursday': 'Четверг',
    'friday': 'Пятница',
    'saturday': 'Суббота',
    'sun': '	Вс',
    'mon': '	Пн',
    'tue': '	Вт',
    'wed': '	Ср',
    'thu': '	Чт',
    'fri': '	Пт',
    'sat': '	Сб',
    'resource': 'Ресурс',
    'duration': 'Длительность',
    'comp': '% выполнения',
    'completion': 'Выполнено',
    'startdate': 'Нач. дата',
    'planstartdate': 'Plan Нач. дата',
    'enddate': 'Кон. дата',
    'planenddate': 'Plan Кон. дата',
    'cost': 'Cost',
    'moreinfo': 'Детали',
    'notes': 'Заметки',
    'format': 'Формат',
    'hour': 'Час',
    'day': 'День',
    'week': 'Неделя',
    'month': 'Месяц',
    'quarter': 'Кварт',
    'hours': 'Часов',
    'days': 'Дней',
    'weeks': 'Недель',
    'months': 'Месяцев',
    'quarters': 'Кварталов',
    'hr': 'ч.',
    'dy': 'дн.',
    'wk': 'нед.',
    'mth': 'мес.',
    'qtr': 'кв.',
    'hrs': 'ч.',
    'dys': 'дн.',
    'wks': 'нед.',
    'mths': 'мес.',
    'qtrs': 'кв.'
};
exports.ru = ru;
var fr = {
    // Mois : http://bdl.oqlf.gouv.qc.ca/bdl/gabarit_bdl.asp?id=3619
    // Jours : http://bdl.oqlf.gouv.qc.ca/bdl/gabarit_bdl.asp?id=3617
    'january': 'Janvier',
    'february': 'Février',
    'march': 'Mars',
    'april': 'Avril',
    'maylong': 'Mai',
    'june': 'Juin',
    'july': 'Juillet',
    'august': 'Août',
    'september': 'Septembre',
    'october': 'Octobre',
    'november': 'Novembre',
    'december': 'Décembre',
    'jan': 'Janv',
    'feb': 'Févr',
    'mar': 'Mars',
    'apr': 'Avr',
    'may': 'Mai',
    'jun': 'Juin',
    'jul': 'Juil',
    'aug': 'Août',
    'sep': 'Sept',
    'oct': 'Oct',
    'nov': 'Nov',
    'dec': 'Déc',
    'sunday': 'Dimanche',
    'monday': 'Lundi',
    'tuesday': 'Mardi',
    'wednesday': 'Mercredi',
    'thursday': 'Jeudi',
    'friday': 'Vendredi',
    'saturday': 'Samedi',
    'sun': 'Dim',
    'mon': 'Lun',
    'tue': 'Mar',
    'wed': 'Mer',
    'thu': 'Jeu',
    'fri': 'Ven',
    'sat': 'Sam',
    'resource': 'Ressource',
    'duration': 'Durée',
    'comp': '% Term.',
    'completion': 'Terminé',
    'startdate': 'Début',
    'planstartdate': 'Plan Début',
    'enddate': 'Fin',
    'planenddate': 'Plan Fin',
    'cost': 'Cost',
    'moreinfo': "Plus d'informations",
    'notes': 'Notes',
    'format': 'Format',
    'hour': 'Heure',
    'day': 'Jour',
    'week': 'Semaine',
    'month': 'Mois',
    'quarter': 'Trimestre',
    'hours': 'Heures',
    'days': 'Jours',
    'weeks': 'Semaines',
    'months': 'Mois',
    'quarters': 'Trimestres',
    'hr': 'h',
    'dy': 'j',
    'wk': 'sem',
    'mth': 'mois',
    'qtr': 'tri',
    'hrs': 'h',
    'dys': 'j',
    'wks': 'sem',
    'mths': 'mois',
    'qtrs': 'tri'
};
exports.fr = fr;
var cn = {
    'january': '一月',
    'february': '二月',
    'march': '三月',
    'april': '四月',
    'maylong': '五月',
    'june': '六月',
    'july': '七月',
    'august': '八月',
    'september': '九月',
    'october': '十月',
    'november': '十一月',
    'december': '十二月',
    'jan': '一月',
    'feb': '二月',
    'mar': '三月',
    'apr': '四月',
    'may': '五月',
    'jun': '六月',
    'jul': '七月',
    'aug': '八月',
    'sep': '九月',
    'oct': '十月',
    'nov': '十一月',
    'dec': '十二月',
    'sunday': '星期日',
    'monday': '星期一',
    'tuesday': '星期二',
    'wednesday': '星期三',
    'thursday': '星期四',
    'friday': '星期五',
    'saturday': '星期六',
    'sun': '星期日',
    'mon': '星期一',
    'tue': '星期二',
    'wed': '星期三',
    'thu': '星期四',
    'fri': '星期五',
    'sat': '星期六',
    'resource': '資源',
    'duration': '時程',
    'comp': '達成率',
    'completion': '達成',
    'startdate': '起始日期',
    'planstartdate': '計劃起始日期',
    'enddate': '截止日期',
    'planenddate': '計劃截止日期',
    'cost': '成本',
    'moreinfo': "更多資訊",
    'notes': '備註',
    'format': '格式',
    'hour': '時',
    'day': '日',
    'week': '星期',
    'month': '月',
    'quarter': '季',
    'hours': '小時',
    'days': '天',
    'weeks': '週',
    'months': '月',
    'quarters': '季',
    'hr': '小時',
    'dy': '天',
    'wk': '週',
    'mth': '月',
    'qtr': '季',
    'hrs': '小時',
    'dys': '天',
    'wks': '週',
    'mths': '月',
    'qtrs': '季'
};
exports.cn = cn;
var sv = {
    'format': 'Filter',
    'hour': 'Timme',
    'day': 'Dag',
    'week': 'Vecka',
    'month': 'Månad',
    'quarter': 'Kvartal',
    'hours': 'Timmar',
    'days': 'Dagar',
    'weeks': 'Veckor',
    'months': 'Månader',
    'quarters': 'Kvartal',
    'hr': 'Timme',
    'dy': 'Dag',
    'wk': 'Vecka',
    'mth': 'Månad',
    'qtr': 'Q',
    'hrs': 'Timmar',
    'dys': 'Dagar',
    'wks': 'Veckor',
    'mths': 'Månader',
    'qtrs': 'Q',
    'resource': 'Resurs',
    'duration': 'Tidsåtgång',
    'comp': '% klart',
    'completion': 'Klart',
    'startdate': 'Startdatum',
    'planstartdate': 'Planerad startdatum',
    'enddate': 'Slutdatum',
    'planenddate': 'Planerad slutdatum',
    'cost': 'Kostnad',
    'moreinfo': 'Mer Information',
    'notes': 'Notes',
    'january': 'januari',
    'february': 'februari',
    'march': 'mars',
    'april': 'april',
    'maylong': 'maj',
    'june': 'juni',
    'july': 'juli',
    'august': 'augusti',
    'september': 'september',
    'october': 'oktober',
    'november': 'november',
    'december': 'december',
    'jan': 'jan',
    'feb': 'feb',
    'mar': 'mar',
    'apr': 'apr',
    'may': 'maj',
    'jun': 'jun',
    'jul': 'jul',
    'aug': 'aug',
    'sep': 'sep',
    'oct': 'okt',
    'nov': 'nov',
    'dec': 'dec',
    'sunday': 'söndag',
    'monday': 'måndag',
    'tuesday': 'tisdag',
    'wednesday': 'onsdag',
    'thursday': 'torsdag',
    'friday': 'fredag',
    'saturday': 'lördag',
    'sun': 'sön',
    'mon': 'mån',
    'tue': 'tis',
    'wed': 'ons',
    'thu': 'tor',
    'fri': 'fre',
    'sat': 'lör'
};
exports.sv = sv;
var nl = {
    'format': 'Format',
    'hour': 'Uur',
    'day': 'Dag',
    'week': 'Week',
    'month': 'Maand',
    'quarter': 'Kwartaal',
    'hours': 'Uren',
    'days': 'Dagen',
    'weeks': 'Weken',
    'months': 'Maanden',
    'quarters': 'Kwartalen',
    'hr': 'uur',
    'dy': 'dag',
    'wk': 'wk',
    'mth': 'mnd',
    'qtr': 'kw',
    'hrs': 'uren',
    'dys': 'dagen',
    'wks': 'weken',
    'mths': 'maanden',
    'qtrs': 'kwartalen',
    'resource': 'Resource',
    'duration': 'Doorlooptijd',
    'comp': '% gereed',
    'completion': 'Gereed',
    'startdate': 'Startdatum',
    'planstartdate': 'Geplande startdatum',
    'enddate': 'Einddatum',
    'planenddate': 'Geplande einddatum',
    'cost': 'Kosten',
    'moreinfo': 'Meer informatie',
    'notes': 'Notities',
    'january': 'januari',
    'february': 'februari',
    'march': 'maart',
    'april': 'april',
    'maylong': 'mei',
    'june': 'juni',
    'july': 'juli',
    'august': 'augustus',
    'september': 'september',
    'october': 'oktober',
    'november': 'november',
    'december': 'december',
    'jan': 'jan',
    'feb': 'feb',
    'mar': 'mrt',
    'apr': 'apr',
    'may': 'mei',
    'jun': 'jun',
    'jul': 'jul',
    'aug': 'aug',
    'sep': 'sep',
    'oct': 'okt',
    'nov': 'nov',
    'dec': 'dec',
    'sunday': 'zondag',
    'monday': 'maandag',
    'tuesday': 'dinsdag',
    'wednesday': 'woensdag',
    'thursday': 'donderdag',
    'friday': 'vrijdag',
    'saturday': 'zaterdag',
    'sun': 'zo',
    'mon': 'ma',
    'tue': 'di',
    'wed': 'wo',
    'thu': 'do',
    'fri': 'vr',
    'sat': 'za'
};
exports.nl = nl;
var id = {
    'format': 'Format',
    'hour': 'Jam',
    'day': 'Hari',
    'week': 'Minggu',
    'month': 'Bulan',
    'quarter': 'Kuartal',
    'hours': 'Jam',
    'days': 'Hari',
    'weeks': 'Minggu',
    'months': 'Bulan',
    'quarters': 'Kuartal',
    'hr': 'Jam',
    'dy': 'Hari',
    'wk': 'Min',
    'mth': 'Bln',
    'qtr': 'Krtl',
    'hrs': 'Jam',
    'dys': 'Hari',
    'wks': 'Min',
    'mths': 'Bln',
    'qtrs': 'Krtl',
    'resource': 'Sumber Daya',
    'duration': 'Durasi',
    'comp': '% Penyelesaian',
    'completion': 'Penyelesaian',
    'startdate': 'Tanggal Mulai',
    'planstartdate': 'Perencanaan Tanggal Mulai',
    'enddate': 'Tanggal Akhir',
    'planenddate': 'Perencanaan Tanggal Akhir',
    'cost': 'Biaya',
    'moreinfo': 'Informasi Lebih Lanjut',
    'notes': 'Catatan',
    'january': 'Januari',
    'february': 'Februari',
    'march': 'Maret',
    'april': 'April',
    'maylong': 'Mei',
    'june': 'Juni',
    'july': 'Juli',
    'august': 'Agustus',
    'september': 'September',
    'october': 'Oktober',
    'november': 'November',
    'december': 'Desember',
    'jan': 'Jan',
    'feb': 'Feb',
    'mar': 'Mar',
    'apr': 'Apr',
    'may': 'Mei',
    'jun': 'Jun',
    'jul': 'Jul',
    'aug': 'Agu',
    'sep': 'Sep',
    'oct': 'Okt',
    'nov': 'Nov',
    'dec': 'Des',
    'sunday': 'Minggu',
    'monday': 'Senin',
    'tuesday': 'Selasa',
    'wednesday': 'Rabu',
    'thursday': 'Kamis',
    'friday': 'Jumat',
    'saturday': 'Sabtu',
    'sun': 'Min',
    'mon': 'Sen',
    'tue': 'Sel',
    'wed': 'Rab',
    'thu': 'Kam',
    'fri': 'Jum',
    'sat': 'Sab'
};
exports.id = id;
var tr = {
    'format': 'Biçim',
    'hour': 'Saat',
    'day': 'Gün',
    'week': 'Hafta',
    'month': 'Ay',
    'quarter': 'Çeyrek Yıl',
    'hours': 'Saat',
    'days': 'Gün',
    'weeks': 'Hafta',
    'months': 'Ay',
    'quarters': 'Çeyrek Yıl',
    'hr': 'Saat',
    'dy': 'Gün',
    'wk': 'Hft',
    'mth': 'Ay',
    'qtr': 'Çyrk',
    'hrs': 'Saat',
    'dys': 'Gün',
    'wks': 'Hft',
    'mths': 'Ay',
    'qtrs': 'Çyrk',
    'resource': 'Kaynak',
    'duration': 'Süre',
    'comp': '% Tamamlanma.',
    'completion': 'Tamamlanma',
    'startdate': 'Başlangıç Tarihi',
    'planstartdate': 'Plan Başlama Tarihi',
    'enddate': 'Bitiş Tarihi',
    'planenddate': 'Plan Bitiş Tarihi',
    'cost': 'Tutar',
    'moreinfo': 'Daha Fazla Bilgi',
    'notes': 'Notlar',
    'january': 'Ocak',
    'february': 'Şubat',
    'march': 'Mart',
    'april': 'Nisan',
    'maylong': 'Mayıs',
    'june': 'Haziran',
    'july': 'Temmuz',
    'august': 'Ağustos',
    'september': 'Eylül',
    'october': 'Ekim',
    'november': 'Kasım',
    'december': 'Aralık',
    'jan': 'Oca',
    'feb': 'Şub',
    'mar': 'Mar',
    'apr': 'Nis',
    'may': 'May',
    'jun': 'Haz',
    'jul': 'Tem',
    'aug': 'Ağu',
    'sep': 'Eyl',
    'oct': 'Eki',
    'nov': 'Kas',
    'dec': 'Ara',
    'sunday': 'Pazar',
    'monday': 'Pazartesi',
    'tuesday': 'Salı',
    'wednesday': 'Çarşamba',
    'thursday': 'Perşembe',
    'friday': 'Cuma',
    'saturday': 'Cumartesi',
    'sun': 'Paz',
    'mon': 'Pzt',
    'tue': 'Sal',
    'wed': 'Çrş',
    'thu': 'Prş',
    'fri': 'Cum',
    'sat': 'Cmt'
};
exports.tr = tr;
//# sourceMappingURL=lang.js.map
},{}],"rd6+":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
exports.includeGetSet = function () {
    /**
     * SETTERS
     */
    this.setOptions = function (options) {
        var keys = Object.keys(options);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var val = options[key];
            if (key === 'vResources') {
                // ev = `this.set${key.substr(1)}(val)`;
                this['set' + key.substr(1)](val);
            }
            else if (val instanceof Array) {
                // ev = `this.set${key.substr(1)}(...val)`;
                this['set' + key.substr(1)].apply(this, val);
            }
            else {
                // ev = `this.set${key.substr(1)}(val)`;
                this['set' + key.substr(1)](val);
            }
        }
    };
    this.setUseFade = function (pVal) { this.vUseFade = pVal; };
    this.setUseMove = function (pVal) { this.vUseMove = pVal; };
    this.setUseRowHlt = function (pVal) { this.vUseRowHlt = pVal; };
    this.setUseToolTip = function (pVal) { this.vUseToolTip = pVal; };
    this.setUseSort = function (pVal) { this.vUseSort = pVal; };
    this.setUseSingleCell = function (pVal) { this.vUseSingleCell = pVal * 1; };
    this.setFormatArr = function () {
        var vValidFormats = 'hour day week month quarter';
        this.vFormatArr = new Array();
        for (var i = 0, j = 0; i < arguments.length; i++) {
            if (vValidFormats.indexOf(arguments[i].toLowerCase()) != -1 && arguments[i].length > 1) {
                this.vFormatArr[j++] = arguments[i].toLowerCase();
                var vRegExp = new RegExp('(?:^|\s)' + arguments[i] + '(?!\S)', 'g');
                vValidFormats = vValidFormats.replace(vRegExp, '');
            }
        }
    };
    this.setShowRes = function (pVal) { this.vShowRes = pVal; };
    this.setShowDur = function (pVal) { this.vShowDur = pVal; };
    this.setShowComp = function (pVal) { this.vShowComp = pVal; };
    this.setShowStartDate = function (pVal) { this.vShowStartDate = pVal; };
    this.setShowEndDate = function (pVal) { this.vShowEndDate = pVal; };
    this.setShowPlanStartDate = function (pVal) { this.vShowPlanStartDate = pVal; };
    this.setShowPlanEndDate = function (pVal) { this.vShowPlanEndDate = pVal; };
    this.setShowCost = function (pVal) { this.vShowCost = pVal; };
    this.setShowAddEntries = function (pVal) { this.vShowAddEntries = pVal; };
    this.setShowTaskInfoRes = function (pVal) { this.vShowTaskInfoRes = pVal; };
    this.setShowTaskInfoDur = function (pVal) { this.vShowTaskInfoDur = pVal; };
    this.setShowTaskInfoComp = function (pVal) { this.vShowTaskInfoComp = pVal; };
    this.setShowTaskInfoStartDate = function (pVal) { this.vShowTaskInfoStartDate = pVal; };
    this.setShowTaskInfoEndDate = function (pVal) { this.vShowTaskInfoEndDate = pVal; };
    this.setShowTaskInfoNotes = function (pVal) { this.vShowTaskInfoNotes = pVal; };
    this.setShowTaskInfoLink = function (pVal) { this.vShowTaskInfoLink = pVal; };
    this.setShowEndWeekDate = function (pVal) { this.vShowEndWeekDate = pVal; };
    this.setShowSelector = function () {
        var vValidSelectors = 'top bottom';
        this.vShowSelector = new Array();
        for (var i = 0, j = 0; i < arguments.length; i++) {
            if (vValidSelectors.indexOf(arguments[i].toLowerCase()) != -1 && arguments[i].length > 1) {
                this.vShowSelector[j++] = arguments[i].toLowerCase();
                var vRegExp = new RegExp('(?:^|\s)' + arguments[i] + '(?!\S)', 'g');
                vValidSelectors = vValidSelectors.replace(vRegExp, '');
            }
        }
    };
    this.setShowDeps = function (pVal) { this.vShowDeps = pVal; };
    this.setDateInputFormat = function (pVal) { this.vDateInputFormat = pVal; };
    this.setDateTaskTableDisplayFormat = function (pVal) { this.vDateTaskTableDisplayFormat = utils_1.parseDateFormatStr(pVal); };
    this.setDateTaskDisplayFormat = function (pVal) { this.vDateTaskDisplayFormat = utils_1.parseDateFormatStr(pVal); };
    this.setHourMajorDateDisplayFormat = function (pVal) { this.vHourMajorDateDisplayFormat = utils_1.parseDateFormatStr(pVal); };
    this.setHourMinorDateDisplayFormat = function (pVal) { this.vHourMinorDateDisplayFormat = utils_1.parseDateFormatStr(pVal); };
    this.setDayMajorDateDisplayFormat = function (pVal) { this.vDayMajorDateDisplayFormat = utils_1.parseDateFormatStr(pVal); };
    this.setDayMinorDateDisplayFormat = function (pVal) { this.vDayMinorDateDisplayFormat = utils_1.parseDateFormatStr(pVal); };
    this.setWeekMajorDateDisplayFormat = function (pVal) { this.vWeekMajorDateDisplayFormat = utils_1.parseDateFormatStr(pVal); };
    this.setWeekMinorDateDisplayFormat = function (pVal) { this.vWeekMinorDateDisplayFormat = utils_1.parseDateFormatStr(pVal); };
    this.setMonthMajorDateDisplayFormat = function (pVal) { this.vMonthMajorDateDisplayFormat = utils_1.parseDateFormatStr(pVal); };
    this.setMonthMinorDateDisplayFormat = function (pVal) { this.vMonthMinorDateDisplayFormat = utils_1.parseDateFormatStr(pVal); };
    this.setQuarterMajorDateDisplayFormat = function (pVal) { this.vQuarterMajorDateDisplayFormat = utils_1.parseDateFormatStr(pVal); };
    this.setQuarterMinorDateDisplayFormat = function (pVal) { this.vQuarterMinorDateDisplayFormat = utils_1.parseDateFormatStr(pVal); };
    this.setCaptionType = function (pType) { this.vCaptionType = pType; };
    this.setFormat = function (pFormat) {
        this.vFormat = pFormat;
        this.Draw();
    };
    this.setWorkingDays = function (workingDays) { this.vWorkingDays = workingDays; };
    this.setMinGpLen = function (pMinGpLen) { this.vMinGpLen = pMinGpLen; };
    this.setScrollTo = function (pDate) { this.vScrollTo = pDate; };
    this.setHourColWidth = function (pWidth) { this.vHourColWidth = pWidth; };
    this.setDayColWidth = function (pWidth) { this.vDayColWidth = pWidth; };
    this.setWeekColWidth = function (pWidth) { this.vWeekColWidth = pWidth; };
    this.setMonthColWidth = function (pWidth) { this.vMonthColWidth = pWidth; };
    this.setQuarterColWidth = function (pWidth) { this.vQuarterColWidth = pWidth; };
    this.setRowHeight = function (pHeight) { this.vRowHeight = pHeight; };
    this.setLang = function (pLang) { if (this.vLangs[pLang])
        this.vLang = pLang; };
    this.setChartBody = function (pDiv) { if (typeof HTMLDivElement !== 'function' || pDiv instanceof HTMLDivElement)
        this.vChartBody = pDiv; };
    this.setChartHead = function (pDiv) { if (typeof HTMLDivElement !== 'function' || pDiv instanceof HTMLDivElement)
        this.vChartHead = pDiv; };
    this.setListBody = function (pDiv) { if (typeof HTMLDivElement !== 'function' || pDiv instanceof HTMLDivElement)
        this.vListBody = pDiv; };
    this.setChartTable = function (pTable) { if (typeof HTMLTableElement !== 'function' || pTable instanceof HTMLTableElement)
        this.vChartTable = pTable; };
    this.setLines = function (pDiv) { if (typeof HTMLDivElement !== 'function' || pDiv instanceof HTMLDivElement)
        this.vLines = pDiv; };
    this.setTimer = function (pVal) { this.vTimer = pVal * 1; };
    this.setTooltipDelay = function (pVal) { this.vTooltipDelay = pVal * 1; };
    this.setTooltipTemplate = function (pVal) { this.vTooltipTemplate = pVal; };
    this.addLang = function (pLang, pVals) {
        if (!this.vLangs[pLang]) {
            this.vLangs[pLang] = new Object();
            for (var vKey in this.vLangs['en'])
                this.vLangs[pLang][vKey] = (pVals[vKey]) ? document.createTextNode(pVals[vKey]).data : this.vLangs['en'][vKey];
        }
    };
    this.setEvents = function (pEvents) { this.vEvents = pEvents; };
    this.setEventsChange = function (pEventsChange) { this.vEventsChange = pEventsChange; };
    this.setEventClickRow = function (fn) { this.vEventClickRow = fn; };
    this.setResources = function (resources) { this.vResources = resources; };
    this.setAdditionalHeaders = function (headers) { this.vAdditionalHeaders = headers; };
    this.setEditable = function (editable) { this.vEditable = editable; };
    this.setDebug = function (debug) { this.vDebug = debug; };
    /**
     * GETTERS
     */
    this.getDivId = function () { return this.vDivId; };
    this.getUseFade = function () { return this.vUseFade; };
    this.getUseMove = function () { return this.vUseMove; };
    this.getUseRowHlt = function () { return this.vUseRowHlt; };
    this.getUseToolTip = function () { return this.vUseToolTip; };
    this.getUseSort = function () { return this.vUseSort; };
    this.getUseSingleCell = function () { return this.vUseSingleCell; };
    this.getFormatArr = function () { return this.vFormatArr; };
    this.getShowRes = function () { return this.vShowRes; };
    this.getShowDur = function () { return this.vShowDur; };
    this.getShowComp = function () { return this.vShowComp; };
    this.getShowStartDate = function () { return this.vShowStartDate; };
    this.getShowEndDate = function () { return this.vShowEndDate; };
    this.getShowPlanStartDate = function () { return this.vShowPlanStartDate; };
    this.getShowPlanEndDate = function () { return this.vShowPlanEndDate; };
    this.getShowCost = function () { return this.vShowCost; };
    this.getShowAddEntries = function () { return this.vShowAddEntries; };
    this.getShowTaskInfoRes = function () { return this.vShowTaskInfoRes; };
    this.getShowTaskInfoDur = function () { return this.vShowTaskInfoDur; };
    this.getShowTaskInfoComp = function () { return this.vShowTaskInfoComp; };
    this.getShowTaskInfoStartDate = function () { return this.vShowTaskInfoStartDate; };
    this.getShowTaskInfoEndDate = function () { return this.vShowTaskInfoEndDate; };
    this.getShowTaskInfoNotes = function () { return this.vShowTaskInfoNotes; };
    this.getShowTaskInfoLink = function () { return this.vShowTaskInfoLink; };
    this.getShowEndWeekDate = function () { return this.vShowEndWeekDate; };
    this.getShowSelector = function () { return this.vShowSelector; };
    this.getShowDeps = function () { return this.vShowDeps; };
    this.getDateInputFormat = function () { return this.vDateInputFormat; };
    this.getDateTaskTableDisplayFormat = function () { return this.vDateTaskTableDisplayFormat; };
    this.getDateTaskDisplayFormat = function () { return this.vDateTaskDisplayFormat; };
    this.getHourMajorDateDisplayFormat = function () { return this.vHourMajorDateDisplayFormat; };
    this.getHourMinorDateDisplayFormat = function () { return this.vHourMinorDateDisplayFormat; };
    this.getDayMajorDateDisplayFormat = function () { return this.vDayMajorDateDisplayFormat; };
    this.getDayMinorDateDisplayFormat = function () { return this.vDayMinorDateDisplayFormat; };
    this.getWeekMajorDateDisplayFormat = function () { return this.vWeekMajorDateDisplayFormat; };
    this.getWeekMinorDateDisplayFormat = function () { return this.vWeekMinorDateDisplayFormat; };
    this.getMonthMajorDateDisplayFormat = function () { return this.vMonthMajorDateDisplayFormat; };
    this.getMonthMinorDateDisplayFormat = function () { return this.vMonthMinorDateDisplayFormat; };
    this.getQuarterMajorDateDisplayFormat = function () { return this.vQuarterMajorDateDisplayFormat; };
    this.getQuarterMinorDateDisplayFormat = function () { return this.vQuarterMinorDateDisplayFormat; };
    this.getCaptionType = function () { return this.vCaptionType; };
    this.getMinGpLen = function () { return this.vMinGpLen; };
    this.getScrollTo = function () { return this.vScrollTo; };
    this.getHourColWidth = function () { return this.vHourColWidth; };
    this.getDayColWidth = function () { return this.vDayColWidth; };
    this.getWeekColWidth = function () { return this.vWeekColWidth; };
    this.getMonthColWidth = function () { return this.vMonthColWidth; };
    this.getQuarterColWidth = function () { return this.vQuarterColWidth; };
    this.getRowHeight = function () { return this.vRowHeight; };
    this.getChartBody = function () { return this.vChartBody; };
    this.getChartHead = function () { return this.vChartHead; };
    this.getListBody = function () { return this.vListBody; };
    this.getChartTable = function () { return this.vChartTable; };
    this.getLines = function () { return this.vLines; };
    this.getTimer = function () { return this.vTimer; };
    this.getTooltipDelay = function () { return this.vTooltipDelay; };
    this.getList = function () { return this.vTaskList; };
    this.getEventsClickCell = function () { return this.vEvents; };
    this.getEventsChange = function () { return this.vEventsChange; };
    this.getEventClickRow = function () { return this.vEventClickRow; };
    this.getResources = function () { return this.vResources; };
    this.getAdditionalHeaders = function () { return this.vAdditionalHeaders; };
};
//# sourceMappingURL=options.js.map
},{"./utils":"WqwM"}],"RF+8":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var task_1 = require("./task");
var utils_1 = require("./utils");
exports.parseXML = function (pFile, pGanttVar) {
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new window.XMLHttpRequest();
    }
    else { // IE 5/6
        xhttp = new window.ActiveXObject('Microsoft.XMLHTTP');
    }
    xhttp.open('GET', pFile, false);
    xhttp.send(null);
    var xmlDoc = xhttp.responseXML;
    exports.AddXMLTask(pGanttVar, xmlDoc);
};
exports.parseXMLString = function (pStr, pGanttVar) {
    var xmlDoc;
    if (typeof window.DOMParser != 'undefined') {
        xmlDoc = (new window.DOMParser()).parseFromString(pStr, 'text/xml');
    }
    else if (typeof window.ActiveXObject != 'undefined' &&
        new window.ActiveXObject('Microsoft.XMLDOM')) {
        xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
        xmlDoc.async = 'false';
        xmlDoc.loadXML(pStr);
    }
    exports.AddXMLTask(pGanttVar, xmlDoc);
};
exports.findXMLNode = function (pRoot, pNodeName) {
    var vRetValue;
    try {
        vRetValue = pRoot.getElementsByTagName(pNodeName);
    }
    catch (error) {
        ;
    } // do nothing, we'll return undefined
    return vRetValue;
};
// pType can be 1=numeric, 2=String, all other values just return raw data
exports.getXMLNodeValue = function (pRoot, pNodeName, pType, pDefault) {
    var vRetValue;
    try {
        vRetValue = pRoot.getElementsByTagName(pNodeName)[0].childNodes[0].nodeValue;
    }
    catch (error) {
        if (typeof pDefault != 'undefined')
            vRetValue = pDefault;
    }
    if (typeof vRetValue != 'undefined' && vRetValue != null) {
        if (pType == 1)
            vRetValue *= 1;
        else if (pType == 2)
            vRetValue = vRetValue.toString();
    }
    return vRetValue;
};
exports.AddXMLTask = function (pGanttVar, pXmlDoc) {
    var project = '';
    var vMSP = false;
    var Task;
    var n = 0;
    var m = 0;
    var i = 0;
    var j = 0;
    var k = 0;
    var maxPID = 0;
    var ass = new Array();
    var assRes = new Array();
    var res = new Array();
    var pars = new Array();
    var projNode = exports.findXMLNode(pXmlDoc, 'Project');
    if (typeof projNode != 'undefined' && projNode.length > 0)
        project = projNode[0].getAttribute('xmlns');
    if (project == 'http://schemas.microsoft.com/project') {
        vMSP = true;
        pGanttVar.setDateInputFormat('yyyy-mm-dd');
        Task = exports.findXMLNode(pXmlDoc, 'Task');
        if (typeof Task == 'undefined')
            n = 0;
        else
            n = Task.length;
        var resources = exports.findXMLNode(pXmlDoc, 'Resource');
        if (typeof resources == 'undefined') {
            n = 0;
            m = 0;
        }
        else
            m = resources.length;
        for (i = 0; i < m; i++) {
            var resname = exports.getXMLNodeValue(resources[i], 'Name', 2, '');
            var uid = exports.getXMLNodeValue(resources[i], 'UID', 1, -1);
            if (resname.length > 0 && uid > 0)
                res[uid] = resname;
        }
        var assignments = exports.findXMLNode(pXmlDoc, 'Assignment');
        if (typeof assignments == 'undefined')
            j = 0;
        else
            j = assignments.length;
        for (i = 0; i < j; i++) {
            var uid = void 0;
            var resUID = exports.getXMLNodeValue(assignments[i], 'ResourceUID', 1, -1);
            uid = exports.getXMLNodeValue(assignments[i], 'TaskUID', 1, -1);
            if (uid > 0) {
                if (resUID > 0)
                    assRes[uid] = res[resUID];
                ass[uid] = assignments[i];
            }
        }
        // Store information about parent UIDs in an easily searchable form
        for (i = 0; i < n; i++) {
            var uid = void 0;
            uid = exports.getXMLNodeValue(Task[i], 'UID', 1, 0);
            var vOutlineNumber = void 0;
            if (uid != 0)
                vOutlineNumber = exports.getXMLNodeValue(Task[i], 'OutlineNumber', 2, '0');
            if (uid > 0)
                pars[vOutlineNumber] = uid;
            if (uid > maxPID)
                maxPID = uid;
        }
        for (i = 0; i < n; i++) {
            // optional parameters may not have an entry
            // Task ID must NOT be zero otherwise it will be skipped
            var pID = exports.getXMLNodeValue(Task[i], 'UID', 1, 0);
            if (pID != 0) {
                var pName = exports.getXMLNodeValue(Task[i], 'Name', 2, 'No Task Name');
                var pStart = exports.getXMLNodeValue(Task[i], 'Start', 2, '');
                var pEnd = exports.getXMLNodeValue(Task[i], 'Finish', 2, '');
                var pLink = exports.getXMLNodeValue(Task[i], 'HyperlinkAddress', 2, '');
                var pMile = exports.getXMLNodeValue(Task[i], 'Milestone', 1, 0);
                var pComp = exports.getXMLNodeValue(Task[i], 'PercentWorkComplete', 1, 0);
                var pCost = exports.getXMLNodeValue(Task[i], 'Cost', 2, 0);
                var pGroup = exports.getXMLNodeValue(Task[i], 'Summary', 1, 0);
                var pParent = 0;
                var vOutlineLevel = exports.getXMLNodeValue(Task[i], 'OutlineLevel', 1, 0);
                var vOutlineNumber = void 0;
                if (vOutlineLevel > 1) {
                    vOutlineNumber = exports.getXMLNodeValue(Task[i], 'OutlineNumber', 2, '0');
                    pParent = pars[vOutlineNumber.substr(0, vOutlineNumber.lastIndexOf('.'))];
                }
                var pNotes = void 0;
                try {
                    pNotes = Task[i].getElementsByTagName('Notes')[0].childNodes[1].nodeValue; //this should be a CDATA node
                }
                catch (error) {
                    pNotes = '';
                }
                var pRes = void 0;
                if (typeof assRes[pID] != 'undefined')
                    pRes = assRes[pID];
                else
                    pRes = '';
                var predecessors = exports.findXMLNode(Task[i], 'PredecessorLink');
                if (typeof predecessors == 'undefined')
                    j = 0;
                else
                    j = predecessors.length;
                var pDepend = '';
                for (k = 0; k < j; k++) {
                    var depUID = exports.getXMLNodeValue(predecessors[k], 'PredecessorUID', 1, -1);
                    var depType = exports.getXMLNodeValue(predecessors[k], 'Type', 1, 1);
                    if (depUID > 0) {
                        if (pDepend.length > 0)
                            pDepend += ',';
                        switch (depType) {
                            case 0:
                                pDepend += depUID + 'FF';
                                break;
                            case 1:
                                pDepend += depUID + 'FS';
                                break;
                            case 2:
                                pDepend += depUID + 'SF';
                                break;
                            case 3:
                                pDepend += depUID + 'SS';
                                break;
                            default:
                                pDepend += depUID + 'FS';
                                break;
                        }
                    }
                }
                var pOpen = 1;
                var pCaption = '';
                var pClass = void 0;
                if (pGroup > 0)
                    pClass = 'ggroupblack';
                else if (pMile > 0)
                    pClass = 'gmilestone';
                else
                    pClass = 'gtaskblue';
                // check for split tasks
                var splits = exports.findXMLNode(ass[pID], 'TimephasedData');
                if (typeof splits == 'undefined')
                    j = 0;
                else
                    j = splits.length;
                var vSplitStart = pStart;
                var vSplitEnd = pEnd;
                var vSubCreated = false;
                var vDepend = pDepend.replace(/,*[0-9]+[FS]F/g, '');
                for (k = 0; k < j; k++) {
                    var vDuration = exports.getXMLNodeValue(splits[k], 'Value', 2, '0');
                    //remove all text
                    vDuration = '0' + vDuration.replace(/\D/g, '');
                    vDuration *= 1;
                    if ((vDuration == 0 && !vSubCreated) || (k + 1 == j && pGroup == 2)) {
                        // No time booked in the given period (or last entry)
                        // Make sure the parent task is set as a combined group
                        pGroup = 2;
                        // Handle last loop
                        if (k + 1 == j)
                            vDepend = pDepend.replace(/,*[0-9]+[FS]S/g, '');
                        // Now create a subtask
                        maxPID++;
                        vSplitEnd = exports.getXMLNodeValue(splits[k], (k + 1 == j) ? 'Finish' : 'Start', 2, '');
                        pGanttVar.AddTaskItem(new task_1.TaskItem(maxPID, pName, vSplitStart, vSplitEnd, 'gtaskblue', pLink, pMile, pRes, pComp, 0, pID, pOpen, vDepend, pCaption, pNotes, pGanttVar, pCost));
                        vSubCreated = true;
                        vDepend = '';
                    }
                    else if (vDuration != 0 && vSubCreated) {
                        vSplitStart = exports.getXMLNodeValue(splits[k], 'Start', 2, '');
                        vSubCreated = false;
                    }
                }
                if (vSubCreated)
                    pDepend = '';
                // Finally add the task
                pGanttVar.AddTaskItem(new task_1.TaskItem(pID, pName, pStart, pEnd, pClass, pLink, pMile, pRes, pComp, pGroup, pParent, pOpen, pDepend, pCaption, pNotes, pGanttVar, pCost));
            }
        }
    }
    else {
        Task = pXmlDoc.getElementsByTagName('task');
        n = Task.length;
        for (i = 0; i < n; i++) {
            // optional parameters may not have an entry
            // Task ID must NOT be zero otherwise it will be skipped
            var pID = exports.getXMLNodeValue(Task[i], 'pID', 1, 0);
            if (pID != 0) {
                var pName = exports.getXMLNodeValue(Task[i], 'pName', 2, 'No Task Name');
                var pStart = exports.getXMLNodeValue(Task[i], 'pStart', 2, '');
                var pEnd = exports.getXMLNodeValue(Task[i], 'pEnd', 2, '');
                var pLink = exports.getXMLNodeValue(Task[i], 'pLink', 2, '');
                var pMile = exports.getXMLNodeValue(Task[i], 'pMile', 1, 0);
                var pComp = exports.getXMLNodeValue(Task[i], 'pComp', 1, 0);
                var pCost = exports.getXMLNodeValue(Task[i], 'pCost', 2, 0);
                var pGroup = exports.getXMLNodeValue(Task[i], 'pGroup', 1, 0);
                var pParent = exports.getXMLNodeValue(Task[i], 'pParent', 1, 0);
                var pRes = exports.getXMLNodeValue(Task[i], 'pRes', 2, '');
                var pOpen = exports.getXMLNodeValue(Task[i], 'pOpen', 1, 1);
                var pDepend = exports.getXMLNodeValue(Task[i], 'pDepend', 2, '');
                var pCaption = exports.getXMLNodeValue(Task[i], 'pCaption', 2, '');
                var pNotes = exports.getXMLNodeValue(Task[i], 'pNotes', 2, '');
                var pClass = exports.getXMLNodeValue(Task[i], 'pClass', 2, '');
                if (typeof pClass == 'undefined') {
                    if (pGroup > 0)
                        pClass = 'ggroupblack';
                    else if (pMile > 0)
                        pClass = 'gmilestone';
                    else
                        pClass = 'gtaskblue';
                }
                // Finally add the task
                pGanttVar.AddTaskItem(new task_1.TaskItem(pID, pName, pStart, pEnd, pClass, pLink, pMile, pRes, pComp, pGroup, pParent, pOpen, pDepend, pCaption, pNotes, pGanttVar, pCost));
            }
        }
    }
};
exports.getXMLProject = function () {
    var vProject = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><project xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">';
    for (var i = 0; i < this.vTaskList.length; i++) {
        vProject += this.getXMLTask(i, true);
    }
    vProject += '</project>';
    return vProject;
};
exports.getXMLTask = function (pID, pIdx) {
    var i = 0;
    var vIdx = -1;
    var vTask = '';
    var vOutFrmt = utils_1.parseDateFormatStr(this.getDateInputFormat() + ' HH:MI');
    if (pIdx === true)
        vIdx = pID;
    else {
        for (i = 0; i < this.vTaskList.length; i++) {
            if (this.vTaskList[i].getID() == pID) {
                vIdx = i;
                break;
            }
        }
    }
    if (vIdx >= 0 && vIdx < this.vTaskList.length) {
        /* Simplest way to return case sensitive node names is to just build a string */
        vTask = '<task>';
        vTask += '<pID>' + this.vTaskList[vIdx].getID() + '</pID>';
        vTask += '<pName>' + this.vTaskList[vIdx].getName() + '</pName>';
        vTask += '<pStart>' + utils_1.formatDateStr(this.vTaskList[vIdx].getStart(), vOutFrmt, this.vLangs[this.vLang]) + '</pStart>';
        vTask += '<pEnd>' + utils_1.formatDateStr(this.vTaskList[vIdx].getEnd(), vOutFrmt, this.vLangs[this.vLang]) + '</pEnd>';
        vTask += '<pClass>' + this.vTaskList[vIdx].getClass() + '</pClass>';
        vTask += '<pLink>' + this.vTaskList[vIdx].getLink() + '</pLink>';
        vTask += '<pMile>' + this.vTaskList[vIdx].getMile() + '</pMile>';
        if (this.vTaskList[vIdx].getResource() != '\u00A0')
            vTask += '<pRes>' + this.vTaskList[vIdx].getResource() + '</pRes>';
        vTask += '<pComp>' + this.vTaskList[vIdx].getCompVal() + '</pComp>';
        vTask += '<pCost>' + this.vTaskList[vIdx].getCost() + '</pCost>';
        vTask += '<pGroup>' + this.vTaskList[vIdx].getGroup() + '</pGroup>';
        vTask += '<pParent>' + this.vTaskList[vIdx].getParent() + '</pParent>';
        vTask += '<pOpen>' + this.vTaskList[vIdx].getOpen() + '</pOpen>';
        vTask += '<pDepend>';
        var vDepList = this.vTaskList[vIdx].getDepend();
        for (i = 0; i < vDepList.length; i++) {
            if (i > 0)
                vTask += ',';
            if (vDepList[i] > 0)
                vTask += vDepList[i] + this.vTaskList[vIdx].getDepType()[i];
        }
        vTask += '</pDepend>';
        vTask += '<pCaption>' + this.vTaskList[vIdx].getCaption() + '</pCaption>';
        var vTmpFrag = document.createDocumentFragment();
        var vTmpDiv = this.newNode(vTmpFrag, 'div', null, null, this.vTaskList[vIdx].getNotes().innerHTML);
        vTask += '<pNotes>' + vTmpDiv.innerHTML + '</pNotes>';
        vTask += '</task>';
    }
    return vTask;
};
//# sourceMappingURL=xml.js.map
},{"./task":"zrDB","./utils":"WqwM"}],"+iYo":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lang = require("./lang");
var events_1 = require("./events");
var utils_1 = require("./utils");
var task_1 = require("./task");
var options_1 = require("./options");
var xml_1 = require("./xml");
// function that loads the main gantt chart properties and functions
// pDiv: (required) this is a div object created in HTML
// pFormat: (required) - used to indicate whether chart should be drawn in "hour", "day", "week", "month", or "quarter" format
exports.GanttChart = function (pDiv, pFormat) {
    this.vDiv = pDiv;
    this.vFormat = pFormat;
    this.vDivId = null;
    this.vUseFade = 1;
    this.vUseMove = 1;
    this.vUseRowHlt = 1;
    this.vUseToolTip = 1;
    this.vUseSort = 1;
    this.vUseSingleCell = 25000;
    this.vShowRes = 1;
    this.vShowDur = 1;
    this.vShowComp = 1;
    this.vShowStartDate = 1;
    this.vShowEndDate = 1;
    this.vShowPlanStartDate = 0;
    this.vShowPlanEndDate = 0;
    this.vShowCost = 0;
    this.vShowAddEntries = 0;
    this.vShowEndWeekDate = 1;
    this.vShowTaskInfoRes = 1;
    this.vShowTaskInfoDur = 1;
    this.vShowTaskInfoComp = 1;
    this.vShowTaskInfoStartDate = 1;
    this.vShowTaskInfoEndDate = 1;
    this.vShowTaskInfoNotes = 1;
    this.vShowTaskInfoLink = 0;
    this.vEventClickRow = 1;
    this.vShowDeps = 1;
    this.vWorkingDays = {
        0: true,
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true
    };
    this.vEvents = {
        taskname: null,
        res: null,
        dur: null,
        comp: null,
        startdate: null,
        enddate: null,
        planstartdate: null,
        planenddate: null,
        cost: null,
        beforeDraw: null,
        afterDraw: null
    };
    this.vEventsChange = {
        taskname: null,
        res: null,
        dur: null,
        comp: null,
        startdate: null,
        enddate: null,
        planstartdate: null,
        planenddate: null,
        cost: null,
    };
    this.vResources = null;
    this.vAdditionalHeaders = {};
    this.vEditable = false;
    this.vDebug = false;
    this.vShowSelector = new Array('top');
    this.vDateInputFormat = 'yyyy-mm-dd';
    this.vDateTaskTableDisplayFormat = utils_1.parseDateFormatStr('dd/mm/yyyy');
    this.vDateTaskDisplayFormat = utils_1.parseDateFormatStr('dd month yyyy');
    this.vHourMajorDateDisplayFormat = utils_1.parseDateFormatStr('day dd month yyyy');
    this.vHourMinorDateDisplayFormat = utils_1.parseDateFormatStr('HH');
    this.vDayMajorDateDisplayFormat = utils_1.parseDateFormatStr('dd/mm/yyyy');
    this.vDayMinorDateDisplayFormat = utils_1.parseDateFormatStr('dd');
    this.vWeekMajorDateDisplayFormat = utils_1.parseDateFormatStr('yyyy');
    this.vWeekMinorDateDisplayFormat = utils_1.parseDateFormatStr('dd/mm');
    this.vMonthMajorDateDisplayFormat = utils_1.parseDateFormatStr('yyyy');
    this.vMonthMinorDateDisplayFormat = utils_1.parseDateFormatStr('mon');
    this.vQuarterMajorDateDisplayFormat = utils_1.parseDateFormatStr('yyyy');
    this.vQuarterMinorDateDisplayFormat = utils_1.parseDateFormatStr('qq');
    this.vUseFullYear = utils_1.parseDateFormatStr('dd/mm/yyyy');
    this.vCaptionType;
    this.vDepId = 1;
    this.vTaskList = new Array();
    this.vFormatArr = new Array('hour', 'day', 'week', 'month', 'quarter');
    this.vMonthDaysArr = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
    this.vProcessNeeded = true;
    this.vMinGpLen = 8;
    this.vScrollTo = '';
    this.vHourColWidth = 18;
    this.vDayColWidth = 18;
    this.vWeekColWidth = 36;
    this.vMonthColWidth = 36;
    this.vQuarterColWidth = 18;
    this.vRowHeight = 20;
    this.vTodayPx = -1;
    this.vLangs = lang;
    this.vLang = navigator.language && navigator.language in lang ? navigator.language : 'en';
    this.vChartBody = null;
    this.vChartHead = null;
    this.vListBody = null;
    this.vChartTable = null;
    this.vLines = null;
    this.vTimer = 20;
    this.vTooltipDelay = 1500;
    this.vTooltipTemplate = null;
    this.includeGetSet = options_1.includeGetSet.bind(this);
    this.includeGetSet();
    this.mouseOver = events_1.mouseOver;
    this.mouseOut = events_1.mouseOut;
    this.createTaskInfo = task_1.createTaskInfo;
    this.AddTaskItem = task_1.AddTaskItem;
    this.AddTaskItemObject = task_1.AddTaskItemObject;
    this.RemoveTaskItem = task_1.RemoveTaskItem;
    this.ClearTasks = task_1.ClearTasks;
    this.getXMLProject = xml_1.getXMLProject;
    this.getXMLTask = xml_1.getXMLTask;
    this.CalcTaskXY = function () {
        var vID;
        var vList = this.getList();
        var vBarDiv;
        var vTaskDiv;
        var vParDiv;
        var vLeft, vTop, vWidth;
        var vHeight = Math.floor((this.getRowHeight() / 2));
        for (var i = 0; i < vList.length; i++) {
            vID = vList[i].getID();
            vBarDiv = vList[i].getBarDiv();
            vTaskDiv = vList[i].getTaskDiv();
            if ((vList[i].getParItem() && vList[i].getParItem().getGroup() == 2)) {
                vParDiv = vList[i].getParItem().getChildRow();
            }
            else
                vParDiv = vList[i].getChildRow();
            if (vBarDiv) {
                vList[i].setStartX(vBarDiv.offsetLeft + 1);
                vList[i].setStartY(vParDiv.offsetTop + vBarDiv.offsetTop + vHeight - 1);
                vList[i].setEndX(vBarDiv.offsetLeft + vBarDiv.offsetWidth + 1);
                vList[i].setEndY(vParDiv.offsetTop + vBarDiv.offsetTop + vHeight - 1);
            }
        }
    };
    this.clearDependencies = function () {
        var parent = this.getLines();
        while (parent.hasChildNodes())
            parent.removeChild(parent.firstChild);
        this.vDepId = 1;
    };
    // sLine: Draw a straight line (colored one-pixel wide div)
    this.sLine = function (x1, y1, x2, y2, pClass) {
        var vLeft = Math.min(x1, x2);
        var vTop = Math.min(y1, y2);
        var vWid = Math.abs(x2 - x1) + 1;
        var vHgt = Math.abs(y2 - y1) + 1;
        var vTmpDiv = document.createElement('div');
        vTmpDiv.id = this.vDivId + 'line' + this.vDepId++;
        vTmpDiv.style.position = 'absolute';
        vTmpDiv.style.overflow = 'hidden';
        vTmpDiv.style.zIndex = '0';
        vTmpDiv.style.left = vLeft + 'px';
        vTmpDiv.style.top = vTop + 'px';
        vTmpDiv.style.width = vWid + 'px';
        vTmpDiv.style.height = vHgt + 'px';
        vTmpDiv.style.visibility = 'visible';
        if (vWid == 1)
            vTmpDiv.className = 'glinev';
        else
            vTmpDiv.className = 'glineh';
        if (pClass)
            vTmpDiv.className += ' ' + pClass;
        this.getLines().appendChild(vTmpDiv);
        return vTmpDiv;
    };
    this.drawDependency = function (x1, y1, x2, y2, pType, pClass) {
        var vDir = 1;
        var vBend = false;
        var vShort = 4;
        var vRow = Math.floor(this.getRowHeight() / 2);
        if (y2 < y1)
            vRow *= -1;
        switch (pType) {
            case 'SF':
                vShort *= -1;
                if (x1 - 10 <= x2 && y1 != y2)
                    vBend = true;
                vDir = -1;
                break;
            case 'SS':
                if (x1 < x2)
                    vShort *= -1;
                else
                    vShort = x2 - x1 - (2 * vShort);
                break;
            case 'FF':
                if (x1 <= x2)
                    vShort = x2 - x1 + (2 * vShort);
                vDir = -1;
                break;
            default:
                if (x1 + 10 >= x2 && y1 != y2)
                    vBend = true;
                break;
        }
        if (vBend) {
            this.sLine(x1, y1, x1 + vShort, y1, pClass);
            this.sLine(x1 + vShort, y1, x1 + vShort, y2 - vRow, pClass);
            this.sLine(x1 + vShort, y2 - vRow, x2 - (vShort * 2), y2 - vRow, pClass);
            this.sLine(x2 - (vShort * 2), y2 - vRow, x2 - (vShort * 2), y2, pClass);
            this.sLine(x2 - (vShort * 2), y2, x2 - (1 * vDir), y2, pClass);
        }
        else if (y1 != y2) {
            this.sLine(x1, y1, x1 + vShort, y1, pClass);
            this.sLine(x1 + vShort, y1, x1 + vShort, y2, pClass);
            this.sLine(x1 + vShort, y2, x2 - (1 * vDir), y2, pClass);
        }
        else
            this.sLine(x1, y1, x2 - (1 * vDir), y2, pClass);
        var vTmpDiv = this.sLine(x2, y2, x2 - 3 - ((vDir < 0) ? 1 : 0), y2 - 3 - ((vDir < 0) ? 1 : 0), pClass + "Arw");
        vTmpDiv.style.width = '0px';
        vTmpDiv.style.height = '0px';
    };
    this.DrawDependencies = function (vDebug) {
        if (vDebug === void 0) { vDebug = false; }
        if (this.getShowDeps() == 1) {
            //First recalculate the x,y
            this.CalcTaskXY();
            this.clearDependencies();
            var vList = this.getList();
            for (var i = 0; i < vList.length; i++) {
                var vDepend = vList[i].getDepend();
                var vDependType = vList[i].getDepType();
                var n = vDepend.length;
                if (n > 0 && vList[i].getVisible() == 1) {
                    for (var k = 0; k < n; k++) {
                        var vTask = this.getArrayLocationByID(vDepend[k]);
                        if (vTask >= 0 && vList[vTask].getGroup() != 2) {
                            if (vList[vTask].getVisible() == 1) {
                                if (vDebug) {
                                    console.log("init drawDependency ", vList[vTask].getID(), new Date());
                                }
                                var cssClass = 'gDepId' + vList[vTask].getID();
                                if (vDependType[k] == 'SS')
                                    this.drawDependency(vList[vTask].getStartX() - 1, vList[vTask].getStartY(), vList[i].getStartX() - 1, vList[i].getStartY(), 'SS', cssClass + ' gDepSS');
                                else if (vDependType[k] == 'FF')
                                    this.drawDependency(vList[vTask].getEndX(), vList[vTask].getEndY(), vList[i].getEndX(), vList[i].getEndY(), 'FF', cssClass + ' gDepFF');
                                else if (vDependType[k] == 'SF')
                                    this.drawDependency(vList[vTask].getStartX() - 1, vList[vTask].getStartY(), vList[i].getEndX(), vList[i].getEndY(), 'SF', cssClass + ' gDepSF');
                                else if (vDependType[k] == 'FS')
                                    this.drawDependency(vList[vTask].getEndX(), vList[vTask].getEndY(), vList[i].getStartX() - 1, vList[i].getStartY(), 'FS', cssClass + ' gDepFS');
                            }
                        }
                    }
                }
            }
        }
        // draw the current date line
        if (this.vTodayPx >= 0)
            this.sLine(this.vTodayPx, 0, this.vTodayPx, this.getChartTable().offsetHeight - 1, 'gCurDate');
    };
    this.getArrayLocationByID = function (pId) {
        var vList = this.getList();
        for (var i = 0; i < vList.length; i++) {
            if (vList[i].getID() == pId)
                return i;
        }
        return -1;
    };
    this.newNode = function (pParent, pNodeType, pId, pClass, pText, pWidth, pLeft, pDisplay, pColspan, pAttribs) {
        var vNewNode = pParent.appendChild(document.createElement(pNodeType));
        if (pAttribs) {
            for (var i = 0; i + 1 < pAttribs.length; i += 2) {
                vNewNode.setAttribute(pAttribs[i], pAttribs[i + 1]);
            }
        }
        if (pId)
            vNewNode.id = pId; // I wish I could do this with setAttribute but older IEs don't play nice
        if (pClass)
            vNewNode.className = pClass;
        if (pWidth)
            vNewNode.style.width = (isNaN(pWidth * 1)) ? pWidth : pWidth + 'px';
        if (pLeft)
            vNewNode.style.left = (isNaN(pLeft * 1)) ? pLeft : pLeft + 'px';
        if (pText) {
            if (pText.indexOf && pText.indexOf('<') === -1) {
                vNewNode.appendChild(document.createTextNode(pText));
            }
            else {
                vNewNode.insertAdjacentHTML('beforeend', pText);
            }
        }
        if (pDisplay)
            vNewNode.style.display = pDisplay;
        if (pColspan)
            vNewNode.colSpan = pColspan;
        return vNewNode;
    };
    this.Draw = function () {
        var _this = this;
        if (this.vEvents && this.vEvents.beforeDraw) {
            this.vEvents.beforeDraw();
        }
        var vMaxDate = new Date();
        var vMinDate = new Date();
        var vTmpDate = new Date();
        var vTaskLeftPx = 0;
        var vTaskRightPx = 0;
        var vTaskWidth = 1;
        var vTaskPlanLeftPx = 0;
        var vTaskPlanRightPx = 0;
        var vNumCols = 0;
        var vNumRows = 0;
        var vSingleCell = false;
        var vID = 0;
        var vDateRow = null;
        var vColWidth = 0;
        var bd;
        if (this.vDebug) {
            bd = new Date();
            console.log('before draw', bd);
        }
        if (this.vTaskList.length > 0) {
            // Process all tasks, reset parent date and completion % if task list has altered
            if (this.vProcessNeeded)
                task_1.processRows(this.vTaskList, 0, -1, 1, 1, this.getUseSort(), this.vDebug);
            this.vProcessNeeded = false;
            // get overall min/max dates plus padding
            vMinDate = utils_1.getMinDate(this.vTaskList, this.vFormat);
            vMaxDate = utils_1.getMaxDate(this.vTaskList, this.vFormat);
            // Calculate chart width variables.
            if (this.vFormat == 'day')
                vColWidth = this.vDayColWidth;
            else if (this.vFormat == 'week')
                vColWidth = this.vWeekColWidth;
            else if (this.vFormat == 'month')
                vColWidth = this.vMonthColWidth;
            else if (this.vFormat == 'quarter')
                vColWidth = this.vQuarterColWidth;
            else if (this.vFormat == 'hour')
                vColWidth = this.vHourColWidth;
            // DRAW the Left-side of the chart (names, resources, comp%)
            var vLeftHeader = document.createDocumentFragment();
            /**
             * LIST HEAD
             *
             *
             *
             * HEADINGS
            */
            var vTmpDiv = this.newNode(vLeftHeader, 'div', this.vDivId + 'glisthead', 'glistlbl gcontainercol');
            this.setListBody(vTmpDiv);
            var vTmpTab = this.newNode(vTmpDiv, 'table', null, 'gtasktableh');
            var vTmpTBody = this.newNode(vTmpTab, 'tbody');
            var vTmpRow = this.newNode(vTmpTBody, 'tr');
            this.newNode(vTmpRow, 'td', null, 'gtasklist', '\u00A0');
            var vTmpCell = this.newNode(vTmpRow, 'td', null, 'gspanning gtaskname');
            vTmpCell.appendChild(this.drawSelector('top'));
            if (this.vShowRes == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning gresource', '\u00A0');
            if (this.vShowDur == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning gduration', '\u00A0');
            if (this.vShowComp == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning gpccomplete', '\u00A0');
            if (this.vShowStartDate == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning gstartdate', '\u00A0');
            if (this.vShowEndDate == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning genddate', '\u00A0');
            if (this.vShowPlanStartDate == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning gstartdate', '\u00A0');
            if (this.vShowPlanEndDate == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning gplanenddate', '\u00A0');
            if (this.vShowCost == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning gcost', '\u00A0');
            if (this.vAdditionalHeaders) {
                for (var key in this.vAdditionalHeaders) {
                    var header = this.vAdditionalHeaders[key];
                    var css = header.class ? header.class : "gadditional-" + key;
                    this.newNode(vTmpRow, 'td', null, "gspanning gadditional " + css, '\u00A0');
                }
            }
            if (this.vShowAddEntries == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning gaddentries', '\u00A0');
            vTmpRow = this.newNode(vTmpTBody, 'tr');
            this.newNode(vTmpRow, 'td', null, 'gtasklist', '\u00A0');
            this.newNode(vTmpRow, 'td', null, 'gtaskname', '\u00A0');
            if (this.vShowRes == 1)
                this.newNode(vTmpRow, 'td', null, 'gtaskheading gresource', this.vLangs[this.vLang]['resource']);
            if (this.vShowDur == 1)
                this.newNode(vTmpRow, 'td', null, 'gtaskheading gduration', this.vLangs[this.vLang]['duration']);
            if (this.vShowComp == 1)
                this.newNode(vTmpRow, 'td', null, 'gtaskheading gpccomplete', this.vLangs[this.vLang]['comp']);
            if (this.vShowStartDate == 1)
                this.newNode(vTmpRow, 'td', null, 'gtaskheading gstartdate', this.vLangs[this.vLang]['startdate']);
            if (this.vShowEndDate == 1)
                this.newNode(vTmpRow, 'td', null, 'gtaskheading genddate', this.vLangs[this.vLang]['enddate']);
            if (this.vShowPlanStartDate == 1)
                this.newNode(vTmpRow, 'td', null, 'gtaskheading gplanstartdate', this.vLangs[this.vLang]['planstartdate']);
            if (this.vShowPlanEndDate == 1)
                this.newNode(vTmpRow, 'td', null, 'gtaskheading gplanenddate', this.vLangs[this.vLang]['planenddate']);
            if (this.vShowCost == 1)
                this.newNode(vTmpRow, 'td', null, 'gtaskheading gcost', this.vLangs[this.vLang]['cost']);
            if (this.vAdditionalHeaders) {
                for (var key in this.vAdditionalHeaders) {
                    var header = this.vAdditionalHeaders[key];
                    var text = header.translate ? this.vLangs[this.vLang][header.translate] : header.title;
                    var css = header.class ? header.class : "gadditional-" + key;
                    this.newNode(vTmpRow, 'td', null, "gtaskheading gadditional " + css, text);
                }
            }
            if (this.vShowAddEntries == 1)
                this.newNode(vTmpRow, 'td', null, 'gtaskheading gaddentries', this.vLangs[this.vLang]['addentries']);
            /**
             * LIST BODY
             *
             *
            */
            var vTmpDiv2 = void 0;
            var _loop_1 = function (i_1) {
                var vBGColor = void 0;
                if (this_1.vTaskList[i_1].getGroup() == 1)
                    vBGColor = 'ggroupitem';
                else
                    vBGColor = 'glineitem';
                vID = this_1.vTaskList[i_1].getID();
                if ((!(this_1.vTaskList[i_1].getParItem() && this_1.vTaskList[i_1].getParItem().getGroup() == 2)) || this_1.vTaskList[i_1].getGroup() == 2) {
                    if (this_1.vTaskList[i_1].getVisible() == 0)
                        vTmpRow = this_1.newNode(vTmpTBody, 'tr', this_1.vDivId + 'child_' + vID, 'gname ' + vBGColor, null, null, null, 'none');
                    else
                        vTmpRow = this_1.newNode(vTmpTBody, 'tr', this_1.vDivId + 'child_' + vID, 'gname ' + vBGColor);
                    this_1.vTaskList[i_1].setListChildRow(vTmpRow);
                    this_1.newNode(vTmpRow, 'td', null, 'gtasklist', '\u00A0');
                    vTmpCell = this_1.newNode(vTmpRow, 'td', null, 'gtaskname');
                    var vCellContents = '';
                    for (var j_1 = 1; j_1 < this_1.vTaskList[i_1].getLevel(); j_1++) {
                        vCellContents += '\u00A0\u00A0\u00A0\u00A0';
                    }
                    var task_2 = this_1.vTaskList[i_1];
                    var vEventClickRow_1 = this_1.vEventClickRow;
                    events_1.addListener('click', function (e) {
                        if (e.target.classList.contains('gfoldercollapse') === false &&
                            vEventClickRow_1 && typeof vEventClickRow_1 === "function") {
                            vEventClickRow_1(task_2);
                        }
                    }, vTmpRow);
                    if (this_1.vTaskList[i_1].getGroup() == 1) {
                        vTmpDiv = this_1.newNode(vTmpCell, 'div', null, null, vCellContents);
                        var vTmpSpan = this_1.newNode(vTmpDiv, 'span', this_1.vDivId + 'group_' + vID, 'gfoldercollapse', (this_1.vTaskList[i_1].getOpen() == 1) ? '-' : '+');
                        this_1.vTaskList[i_1].setGroupSpan(vTmpSpan);
                        events_1.addFolderListeners(this_1, vTmpSpan, vID);
                        var divTask = document.createElement('span');
                        divTask.innerHTML = '\u00A0' + this_1.vTaskList[i_1].getName();
                        vTmpDiv.appendChild(divTask);
                        // const text = makeInput(this.vTaskList[i].getName(), this.vEditable, 'text');
                        // vTmpDiv.appendChild(document.createNode(text));
                        var callback = function (task, e) { return task.setName(e.target.value); };
                        events_1.addListenerInputCell(vTmpCell, this_1.vEventsChange, callback, this_1.vTaskList[i_1], 'taskname', this_1.Draw.bind(this_1));
                        events_1.addListenerClickCell(vTmpDiv, this_1.vEvents, this_1.vTaskList[i_1], 'taskname');
                    }
                    else {
                        vCellContents += '\u00A0\u00A0\u00A0\u00A0';
                        var text = makeInput(this_1.vTaskList[i_1].getName(), this_1.vEditable, 'text');
                        vTmpDiv = this_1.newNode(vTmpCell, 'div', null, null, vCellContents + text);
                        var callback = function (task, e) { return task.setName(e.target.value); };
                        events_1.addListenerInputCell(vTmpCell, this_1.vEventsChange, callback, this_1.vTaskList[i_1], 'taskname', this_1.Draw.bind(this_1));
                        events_1.addListenerClickCell(vTmpCell, this_1.vEvents, this_1.vTaskList[i_1], 'taskname');
                    }
                    if (this_1.vShowRes == 1) {
                        vTmpCell = this_1.newNode(vTmpRow, 'td', null, 'gresource');
                        var text = makeInput(this_1.vTaskList[i_1].getResource(), this_1.vEditable, 'resource', this_1.vTaskList[i_1].getResource(), this_1.vResources);
                        vTmpDiv = this_1.newNode(vTmpCell, 'div', null, null, text);
                        var callback = function (task, e) { return task.setResource(e.target.value); };
                        events_1.addListenerInputCell(vTmpCell, this_1.vEventsChange, callback, this_1.vTaskList[i_1], 'res', this_1.Draw.bind(this_1), 'change');
                        events_1.addListenerClickCell(vTmpCell, this_1.vEvents, this_1.vTaskList[i_1], 'res');
                    }
                    if (this_1.vShowDur == 1) {
                        vTmpCell = this_1.newNode(vTmpRow, 'td', null, 'gduration');
                        var text = makeInput(this_1.vTaskList[i_1].getDuration(this_1.vFormat, this_1.vLangs[this_1.vLang]), this_1.vEditable, 'text', this_1.vTaskList[i_1].getDuration());
                        vTmpDiv = this_1.newNode(vTmpCell, 'div', null, null, text);
                        var callback = function (task, e) { return task.setDuration(e.target.value); };
                        events_1.addListenerInputCell(vTmpCell, this_1.vEventsChange, callback, this_1.vTaskList[i_1], 'dur', this_1.Draw.bind(this_1));
                        events_1.addListenerClickCell(vTmpCell, this_1.vEvents, this_1.vTaskList[i_1], 'dur');
                    }
                    if (this_1.vShowComp == 1) {
                        vTmpCell = this_1.newNode(vTmpRow, 'td', null, 'gpccomplete');
                        var text = makeInput(this_1.vTaskList[i_1].getCompStr(), this_1.vEditable, 'percentage', this_1.vTaskList[i_1].getCompVal());
                        vTmpDiv = this_1.newNode(vTmpCell, 'div', null, null, text);
                        var callback = function (task, e) { task.setComp(e.target.value); task.setCompVal(e.target.value); };
                        events_1.addListenerInputCell(vTmpCell, this_1.vEventsChange, callback, this_1.vTaskList[i_1], 'comp', this_1.Draw.bind(this_1));
                        events_1.addListenerClickCell(vTmpCell, this_1.vEvents, this_1.vTaskList[i_1], 'comp');
                    }
                    if (this_1.vShowStartDate == 1) {
                        vTmpCell = this_1.newNode(vTmpRow, 'td', null, 'gstartdate');
                        var v = utils_1.formatDateStr(this_1.vTaskList[i_1].getStart(), this_1.vDateTaskTableDisplayFormat, this_1.vLangs[this_1.vLang]);
                        var text = makeInput(v, this_1.vEditable, 'date', this_1.vTaskList[i_1].getStart());
                        vTmpDiv = this_1.newNode(vTmpCell, 'div', null, null, text);
                        var callback = function (task, e) { return task.setStart(e.target.value); };
                        events_1.addListenerInputCell(vTmpCell, this_1.vEventsChange, callback, this_1.vTaskList[i_1], 'start', this_1.Draw.bind(this_1));
                        events_1.addListenerClickCell(vTmpCell, this_1.vEvents, this_1.vTaskList[i_1], 'start');
                    }
                    if (this_1.vShowEndDate == 1) {
                        vTmpCell = this_1.newNode(vTmpRow, 'td', null, 'genddate');
                        var v = utils_1.formatDateStr(this_1.vTaskList[i_1].getEnd(), this_1.vDateTaskTableDisplayFormat, this_1.vLangs[this_1.vLang]);
                        var text = makeInput(v, this_1.vEditable, 'date', this_1.vTaskList[i_1].getEnd());
                        vTmpDiv = this_1.newNode(vTmpCell, 'div', null, null, text);
                        var callback = function (task, e) { return task.setEnd(e.target.value); };
                        events_1.addListenerInputCell(vTmpCell, this_1.vEventsChange, callback, this_1.vTaskList[i_1], 'end', this_1.Draw.bind(this_1));
                        events_1.addListenerClickCell(vTmpCell, this_1.vEvents, this_1.vTaskList[i_1], 'end');
                    }
                    if (this_1.vShowPlanStartDate == 1) {
                        vTmpCell = this_1.newNode(vTmpRow, 'td', null, 'gplanstartdate');
                        var v = this_1.vTaskList[i_1].getPlanStart() ? utils_1.formatDateStr(this_1.vTaskList[i_1].getPlanStart(), this_1.vDateTaskTableDisplayFormat, this_1.vLangs[this_1.vLang]) : '';
                        var text = makeInput(v, this_1.vEditable, 'date', this_1.vTaskList[i_1].getPlanStart());
                        vTmpDiv = this_1.newNode(vTmpCell, 'div', null, null, text);
                        var callback = function (task, e) { return task.setPlanStart(e.target.value); };
                        events_1.addListenerInputCell(vTmpCell, this_1.vEventsChange, callback, this_1.vTaskList[i_1], 'planstart', this_1.Draw.bind(this_1));
                        events_1.addListenerClickCell(vTmpCell, this_1.vEvents, this_1.vTaskList[i_1], 'planstart');
                    }
                    if (this_1.vShowPlanEndDate == 1) {
                        vTmpCell = this_1.newNode(vTmpRow, 'td', null, 'gplanenddate');
                        var v = this_1.vTaskList[i_1].getPlanEnd() ? utils_1.formatDateStr(this_1.vTaskList[i_1].getPlanEnd(), this_1.vDateTaskTableDisplayFormat, this_1.vLangs[this_1.vLang]) : '';
                        var text = makeInput(v, this_1.vEditable, 'date', this_1.vTaskList[i_1].getPlanEnd());
                        vTmpDiv = this_1.newNode(vTmpCell, 'div', null, null, text);
                        var callback = function (task, e) { return task.setPlanEnd(e.target.value); };
                        events_1.addListenerInputCell(vTmpCell, this_1.vEventsChange, callback, this_1.vTaskList[i_1], 'planend', this_1.Draw.bind(this_1));
                        events_1.addListenerClickCell(vTmpCell, this_1.vEvents, this_1.vTaskList[i_1], 'planend');
                    }
                    if (this_1.vShowCost == 1) {
                        vTmpCell = this_1.newNode(vTmpRow, 'td', null, 'gcost');
                        var text = makeInput(this_1.vTaskList[i_1].getCost(), this_1.vEditable, 'cost');
                        vTmpDiv = this_1.newNode(vTmpCell, 'div', null, null, text);
                        var callback = function (task, e) { return task.setCost(e.target.value); };
                        events_1.addListenerInputCell(vTmpCell, this_1.vEventsChange, callback, this_1.vTaskList[i_1], 'cost', this_1.Draw.bind(this_1));
                        events_1.addListenerClickCell(vTmpCell, this_1.vEvents, this_1.vTaskList[i_1], 'cost');
                    }
                    if (this_1.vAdditionalHeaders) {
                        for (var key in this_1.vAdditionalHeaders) {
                            var header = this_1.vAdditionalHeaders[key];
                            var css = header.class ? header.class : "gadditional-" + key;
                            var data = this_1.vTaskList[i_1].getDataObject();
                            if (data) {
                                vTmpCell = this_1.newNode(vTmpRow, 'td', null, "gadditional " + css);
                            }
                            // const callback = (task, e) => task.setCost(e.target.value);
                            // addListenerInputCell(vTmpCell, this.vEventsChange, callback, this.vTaskList[i], 'costdate');
                            vTmpDiv = this_1.newNode(vTmpCell, 'div', null, null, data ? data[key] : '');
                        }
                    }
                    if (this_1.vShowAddEntries == 1) {
                        vTmpCell = this_1.newNode(vTmpRow, 'td', null, 'gaddentries');
                        var button = "<button>+</button>";
                        vTmpDiv = this_1.newNode(vTmpCell, 'div', null, null, button);
                        var callback = function (task, e) {
                            console.log('hello');
                            _this.vTaskList.push({});
                        };
                        events_1.addListenerInputCell(vTmpCell, this_1.vEventsChange, callback, this_1.vTaskList[i_1], 'addentries', this_1.Draw.bind(this_1));
                        events_1.addListenerClickCell(vTmpCell, this_1.vEvents, this_1.vTaskList[i_1], 'addentries');
                    }
                    vNumRows++;
                }
            };
            var this_1 = this;
            for (var i_1 = 0; i_1 < this.vTaskList.length; i_1++) {
                _loop_1(i_1);
            }
            // DRAW the date format selector at bottom left.
            vTmpRow = this.newNode(vTmpTBody, 'tr');
            this.newNode(vTmpRow, 'td', null, 'gtasklist', '\u00A0');
            vTmpCell = this.newNode(vTmpRow, 'td', null, 'gspanning gtaskname');
            vTmpCell.appendChild(this.drawSelector('bottom'));
            if (this.vShowRes == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning gresource', '\u00A0');
            if (this.vShowDur == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning gduration', '\u00A0');
            if (this.vShowComp == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning gpccomplete', '\u00A0');
            if (this.vShowStartDate == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning gstartdate', '\u00A0');
            if (this.vShowEndDate == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning genddate', '\u00A0');
            if (this.vShowPlanStartDate == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning gplanstartdate', '\u00A0');
            if (this.vShowPlanEndDate == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning gplanenddate', '\u00A0');
            if (this.vShowCost == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning gcost', '\u00A0');
            if (this.vAdditionalHeaders) {
                for (var key in this.vAdditionalHeaders) {
                    var header = this.vAdditionalHeaders[key];
                    var css = header.class ? header.class : "gadditional-" + key;
                    this.newNode(vTmpRow, 'td', null, "gspanning gadditional " + css, '\u00A0');
                }
            }
            if (this.vShowAddEntries == 1)
                this.newNode(vTmpRow, 'td', null, 'gspanning gaddentries', '\u00A0');
            // Add some white space so the vertical scroll distance should always be greater
            // than for the right pane (keep to a minimum as it is seen in unconstrained height designs)
            // this.newNode(vTmpDiv2, 'br');
            // this.newNode(vTmpDiv2, 'br');
            /**
             * CHART HEAD
             *
             *
             * HEADINGS
             */
            var vRightHeader = document.createDocumentFragment();
            vTmpDiv = this.newNode(vRightHeader, 'div', this.vDivId + 'gcharthead', 'gchartlbl gcontainercol');
            this.setChartHead(vTmpDiv);
            vTmpTab = this.newNode(vTmpDiv, 'table', this.vDivId + 'chartTableh', 'gcharttableh');
            vTmpTBody = this.newNode(vTmpTab, 'tbody');
            vTmpRow = this.newNode(vTmpTBody, 'tr');
            vTmpDate.setFullYear(vMinDate.getFullYear(), vMinDate.getMonth(), vMinDate.getDate());
            if (this.vFormat == 'hour')
                vTmpDate.setHours(vMinDate.getHours());
            else
                vTmpDate.setHours(0);
            vTmpDate.setMinutes(0);
            vTmpDate.setSeconds(0);
            vTmpDate.setMilliseconds(0);
            var vColSpan = 1;
            // Major Date Header
            while (vTmpDate.getTime() <= vMaxDate.getTime()) {
                var vHeaderCellClass = 'gmajorheading';
                var vCellContents = '';
                if (this.vFormat == 'day') {
                    vTmpCell = this.newNode(vTmpRow, 'td', null, vHeaderCellClass, null, null, null, null, 7);
                    vCellContents += utils_1.formatDateStr(vTmpDate, this.vDayMajorDateDisplayFormat, this.vLangs[this.vLang]);
                    vTmpDate.setDate(vTmpDate.getDate() + 6);
                    if (this.vShowEndWeekDate == 1)
                        vCellContents += ' - ' + utils_1.formatDateStr(vTmpDate, this.vDayMajorDateDisplayFormat, this.vLangs[this.vLang]);
                    this.newNode(vTmpCell, 'div', null, null, vCellContents, vColWidth * 7);
                    vTmpDate.setDate(vTmpDate.getDate() + 1);
                }
                else if (this.vFormat == 'week') {
                    vTmpCell = this.newNode(vTmpRow, 'td', null, vHeaderCellClass, null, vColWidth);
                    this.newNode(vTmpCell, 'div', null, null, utils_1.formatDateStr(vTmpDate, this.vWeekMajorDateDisplayFormat, this.vLangs[this.vLang]), vColWidth);
                    vTmpDate.setDate(vTmpDate.getDate() + 7);
                }
                else if (this.vFormat == 'month') {
                    vColSpan = (12 - vTmpDate.getMonth());
                    if (vTmpDate.getFullYear() == vMaxDate.getFullYear())
                        vColSpan -= (11 - vMaxDate.getMonth());
                    vTmpCell = this.newNode(vTmpRow, 'td', null, vHeaderCellClass, null, null, null, null, vColSpan);
                    this.newNode(vTmpCell, 'div', null, null, utils_1.formatDateStr(vTmpDate, this.vMonthMajorDateDisplayFormat, this.vLangs[this.vLang]), vColWidth * vColSpan);
                    vTmpDate.setFullYear(vTmpDate.getFullYear() + 1, 0, 1);
                }
                else if (this.vFormat == 'quarter') {
                    vColSpan = (4 - Math.floor(vTmpDate.getMonth() / 3));
                    if (vTmpDate.getFullYear() == vMaxDate.getFullYear())
                        vColSpan -= (3 - Math.floor(vMaxDate.getMonth() / 3));
                    vTmpCell = this.newNode(vTmpRow, 'td', null, vHeaderCellClass, null, null, null, null, vColSpan);
                    this.newNode(vTmpCell, 'div', null, null, utils_1.formatDateStr(vTmpDate, this.vQuarterMajorDateDisplayFormat, this.vLangs[this.vLang]), vColWidth * vColSpan);
                    vTmpDate.setFullYear(vTmpDate.getFullYear() + 1, 0, 1);
                }
                else if (this.vFormat == 'hour') {
                    vColSpan = (24 - vTmpDate.getHours());
                    if (vTmpDate.getFullYear() == vMaxDate.getFullYear() &&
                        vTmpDate.getMonth() == vMaxDate.getMonth() &&
                        vTmpDate.getDate() == vMaxDate.getDate())
                        vColSpan -= (23 - vMaxDate.getHours());
                    vTmpCell = this.newNode(vTmpRow, 'td', null, vHeaderCellClass, null, null, null, null, vColSpan);
                    this.newNode(vTmpCell, 'div', null, null, utils_1.formatDateStr(vTmpDate, this.vHourMajorDateDisplayFormat, this.vLangs[this.vLang]), vColWidth * vColSpan);
                    vTmpDate.setHours(0);
                    vTmpDate.setDate(vTmpDate.getDate() + 1);
                }
            }
            vTmpRow = this.newNode(vTmpTBody, 'tr');
            // Minor Date header and Cell Rows
            vTmpDate.setFullYear(vMinDate.getFullYear(), vMinDate.getMonth(), vMinDate.getDate()); // , vMinDate.getHours()
            if (this.vFormat == 'hour')
                vTmpDate.setHours(vMinDate.getHours());
            vNumCols = 0;
            while (vTmpDate.getTime() <= vMaxDate.getTime()) {
                var vHeaderCellClass = 'gminorheading';
                if (this.vFormat == 'day') {
                    if (vTmpDate.getDay() % 6 == 0) {
                        vHeaderCellClass += 'wkend';
                    }
                    if (vTmpDate <= vMaxDate) {
                        vTmpCell = this.newNode(vTmpRow, 'td', null, vHeaderCellClass);
                        this.newNode(vTmpCell, 'div', null, null, utils_1.formatDateStr(vTmpDate, this.vDayMinorDateDisplayFormat, this.vLangs[this.vLang]), vColWidth);
                        vNumCols++;
                    }
                    vTmpDate.setDate(vTmpDate.getDate() + 1);
                }
                else if (this.vFormat == 'week') {
                    if (vTmpDate <= vMaxDate) {
                        vTmpCell = this.newNode(vTmpRow, 'td', null, vHeaderCellClass);
                        this.newNode(vTmpCell, 'div', null, null, utils_1.formatDateStr(vTmpDate, this.vWeekMinorDateDisplayFormat, this.vLangs[this.vLang]), vColWidth);
                        vNumCols++;
                    }
                    vTmpDate.setDate(vTmpDate.getDate() + 7);
                }
                else if (this.vFormat == 'month') {
                    if (vTmpDate <= vMaxDate) {
                        vTmpCell = this.newNode(vTmpRow, 'td', null, vHeaderCellClass);
                        this.newNode(vTmpCell, 'div', null, null, utils_1.formatDateStr(vTmpDate, this.vMonthMinorDateDisplayFormat, this.vLangs[this.vLang]), vColWidth);
                        vNumCols++;
                    }
                    vTmpDate.setDate(vTmpDate.getDate() + 1);
                    while (vTmpDate.getDate() > 1) {
                        vTmpDate.setDate(vTmpDate.getDate() + 1);
                    }
                }
                else if (this.vFormat == 'quarter') {
                    if (vTmpDate <= vMaxDate) {
                        vTmpCell = this.newNode(vTmpRow, 'td', null, vHeaderCellClass);
                        this.newNode(vTmpCell, 'div', null, null, utils_1.formatDateStr(vTmpDate, this.vQuarterMinorDateDisplayFormat, this.vLangs[this.vLang]), vColWidth);
                        vNumCols++;
                    }
                    vTmpDate.setDate(vTmpDate.getDate() + 81);
                    while (vTmpDate.getDate() > 1)
                        vTmpDate.setDate(vTmpDate.getDate() + 1);
                }
                else if (this.vFormat == 'hour') {
                    for (var i_2 = vTmpDate.getHours(); i_2 < 24; i_2++) {
                        vTmpDate.setHours(i_2); //works around daylight savings but may look a little odd on days where the clock goes forward
                        if (vTmpDate <= vMaxDate) {
                            vTmpCell = this.newNode(vTmpRow, 'td', null, vHeaderCellClass);
                            this.newNode(vTmpCell, 'div', null, null, utils_1.formatDateStr(vTmpDate, this.vHourMinorDateDisplayFormat, this.vLangs[this.vLang]), vColWidth);
                            vNumCols++;
                        }
                    }
                    vTmpDate.setHours(0);
                    vTmpDate.setDate(vTmpDate.getDate() + 1);
                }
            }
            vDateRow = vTmpRow;
            // Calculate size of grids  : Plus 3 because 1 border left + 2 of paddings
            vTaskLeftPx = (vNumCols * (vColWidth + 3)) + 1;
            // Fix a small space at the end for day
            if (this.vFormat === 'day') {
                vTaskLeftPx += 2;
            }
            vTmpTab.style.width = vTaskLeftPx + 'px'; // Ensure that the headings has exactly the same width as the chart grid
            vTaskPlanLeftPx = (vNumCols * (vColWidth + 3)) + 1;
            if (this.vUseSingleCell != 0 && this.vUseSingleCell < (vNumCols * vNumRows))
                vSingleCell = true;
            this.newNode(vTmpDiv, 'div', null, 'rhscrpad', null, null, vTaskLeftPx + 1);
            vTmpDiv = this.newNode(vRightHeader, 'div', null, 'glabelfooter');
            /**
             * CHART GRID
             *
             *
             *
             */
            var vRightTable = document.createDocumentFragment();
            vTmpDiv = this.newNode(vRightTable, 'div', this.vDivId + 'gchartbody', 'gchartgrid gcontainercol');
            this.setChartBody(vTmpDiv);
            vTmpTab = this.newNode(vTmpDiv, 'table', this.vDivId + 'chartTable', 'gcharttable', null, vTaskLeftPx);
            this.setChartTable(vTmpTab);
            this.newNode(vTmpDiv, 'div', null, 'rhscrpad', null, null, vTaskLeftPx + 1);
            vTmpTBody = this.newNode(vTmpTab, 'tbody');
            // Draw each row
            var i = 0;
            var j = 0;
            var bd_1;
            if (this.vDebug) {
                bd_1 = new Date();
                console.log('before tasks loop', bd_1);
            }
            for (i = 0; i < this.vTaskList.length; i++) {
                var curTaskStart = this.vTaskList[i].getStart() ? this.vTaskList[i].getStart() : this.vTaskList[i].getPlanStart();
                var curTaskEnd = this.vTaskList[i].getEnd() ? this.vTaskList[i].getEnd() : this.vTaskList[i].getPlanEnd();
                if ((curTaskEnd.getTime() - (curTaskEnd.getTimezoneOffset() * 60000)) % (86400000) == 0)
                    curTaskEnd = new Date(curTaskEnd.getFullYear(), curTaskEnd.getMonth(), curTaskEnd.getDate() + 1, curTaskEnd.getHours(), curTaskEnd.getMinutes(), curTaskEnd.getSeconds()); // add 1 day here to simplify calculations below
                vTaskLeftPx = utils_1.getOffset(vMinDate, curTaskStart, vColWidth, this.vFormat);
                vTaskRightPx = utils_1.getOffset(curTaskStart, curTaskEnd, vColWidth, this.vFormat);
                var curTaskPlanStart = void 0, curTaskPlanEnd = void 0;
                curTaskPlanStart = this.vTaskList[i].getPlanStart();
                curTaskPlanEnd = this.vTaskList[i].getPlanEnd();
                if (curTaskPlanStart && curTaskPlanEnd) {
                    if ((curTaskPlanEnd.getTime() - (curTaskPlanEnd.getTimezoneOffset() * 60000)) % (86400000) == 0)
                        curTaskPlanEnd = new Date(curTaskPlanEnd.getFullYear(), curTaskPlanEnd.getMonth(), curTaskPlanEnd.getDate() + 1, curTaskPlanEnd.getHours(), curTaskPlanEnd.getMinutes(), curTaskPlanEnd.getSeconds()); // add 1 day here to simplify calculations below
                    vTaskPlanLeftPx = utils_1.getOffset(vMinDate, curTaskPlanStart, vColWidth, this.vFormat);
                    vTaskPlanRightPx = utils_1.getOffset(curTaskPlanStart, curTaskPlanEnd, vColWidth, this.vFormat);
                }
                else {
                    vTaskPlanLeftPx = vTaskPlanRightPx = 0;
                }
                vID = this.vTaskList[i].getID();
                var vComb = (this.vTaskList[i].getParItem() && this.vTaskList[i].getParItem().getGroup() == 2);
                var vCellFormat = '';
                var vTmpItem = this.vTaskList[i];
                var vCaptClass = null;
                if (this.vTaskList[i].getMile() && !vComb) {
                    vTmpRow = this.newNode(vTmpTBody, 'tr', this.vDivId + 'childrow_' + vID, 'gmileitem gmile' + this.vFormat, null, null, null, ((this.vTaskList[i].getVisible() == 0) ? 'none' : null));
                    this.vTaskList[i].setChildRow(vTmpRow);
                    events_1.addThisRowListeners(this, this.vTaskList[i].getListChildRow(), vTmpRow);
                    vTmpCell = this.newNode(vTmpRow, 'td', null, 'gtaskcell');
                    vTmpDiv = this.newNode(vTmpCell, 'div', null, 'gtaskcelldiv', '\u00A0\u00A0');
                    vTmpDiv = this.newNode(vTmpDiv, 'div', this.vDivId + 'bardiv_' + vID, 'gtaskbarcontainer', null, 12, vTaskLeftPx + vTaskRightPx - 6);
                    this.vTaskList[i].setBarDiv(vTmpDiv);
                    vTmpDiv2 = this.newNode(vTmpDiv, 'div', this.vDivId + 'taskbar_' + vID, this.vTaskList[i].getClass(), null, 12);
                    this.vTaskList[i].setTaskDiv(vTmpDiv2);
                    if (this.vTaskList[i].getCompVal() < 100)
                        vTmpDiv2.appendChild(document.createTextNode('\u25CA'));
                    else {
                        vTmpDiv2 = this.newNode(vTmpDiv2, 'div', null, 'gmilediamond');
                        this.newNode(vTmpDiv2, 'div', null, 'gmdtop');
                        this.newNode(vTmpDiv2, 'div', null, 'gmdbottom');
                    }
                    vCaptClass = 'gmilecaption';
                    if (!vSingleCell && !vComb) {
                        vCellFormat = '';
                        for (j = 0; j < vNumCols - 1; j++) {
                            if (this.vFormat == 'day' && ((j % 7 == 4) || (j % 7 == 5)))
                                vCellFormat = 'gtaskcellwkend';
                            else
                                vCellFormat = 'gtaskcell';
                            this.newNode(vTmpRow, 'td', null, vCellFormat, '\u00A0\u00A0');
                        }
                    }
                }
                else {
                    vTaskWidth = vTaskRightPx;
                    // Draw Group Bar which has outer div with inner group div 
                    // and several small divs to left and right to create angled-end indicators
                    if (this.vTaskList[i].getGroup()) {
                        vTaskWidth = (vTaskWidth > this.vMinGpLen && vTaskWidth < this.vMinGpLen * 2) ? this.vMinGpLen * 2 : vTaskWidth; // Expand to show two end points
                        vTaskWidth = (vTaskWidth < this.vMinGpLen) ? this.vMinGpLen : vTaskWidth; // expand to show one end point
                        vTmpRow = this.newNode(vTmpTBody, 'tr', this.vDivId + 'childrow_' + vID, ((this.vTaskList[i].getGroup() == 2) ? 'glineitem gitem' : 'ggroupitem ggroup') + this.vFormat, null, null, null, ((this.vTaskList[i].getVisible() == 0) ? 'none' : null));
                        this.vTaskList[i].setChildRow(vTmpRow);
                        events_1.addThisRowListeners(this, this.vTaskList[i].getListChildRow(), vTmpRow);
                        vTmpCell = this.newNode(vTmpRow, 'td', null, 'gtaskcell');
                        vTmpDiv = this.newNode(vTmpCell, 'div', null, 'gtaskcelldiv', '\u00A0\u00A0');
                        this.vTaskList[i].setCellDiv(vTmpDiv);
                        if (this.vTaskList[i].getGroup() == 1) {
                            vTmpDiv = this.newNode(vTmpDiv, 'div', this.vDivId + 'bardiv_' + vID, 'gtaskbarcontainer', null, vTaskWidth, vTaskLeftPx);
                            this.vTaskList[i].setBarDiv(vTmpDiv);
                            vTmpDiv2 = this.newNode(vTmpDiv, 'div', this.vDivId + 'taskbar_' + vID, this.vTaskList[i].getClass(), null, vTaskWidth);
                            this.vTaskList[i].setTaskDiv(vTmpDiv2);
                            this.newNode(vTmpDiv2, 'div', this.vDivId + 'complete_' + vID, this.vTaskList[i].getClass() + 'complete', null, this.vTaskList[i].getCompStr());
                            this.newNode(vTmpDiv, 'div', null, this.vTaskList[i].getClass() + 'endpointleft');
                            if (vTaskWidth >= this.vMinGpLen * 2)
                                this.newNode(vTmpDiv, 'div', null, this.vTaskList[i].getClass() + 'endpointright');
                            vCaptClass = 'ggroupcaption';
                        }
                        if (!vSingleCell && !vComb) {
                            vCellFormat = '';
                            for (j = 0; j < vNumCols - 1; j++) {
                                if (this.vFormat == 'day' && ((j % 7 == 4) || (j % 7 == 5)))
                                    vCellFormat = 'gtaskcellwkend';
                                else
                                    vCellFormat = 'gtaskcell';
                                this.newNode(vTmpRow, 'td', null, vCellFormat, '\u00A0\u00A0');
                            }
                        }
                    }
                    else {
                        vTaskWidth = (vTaskWidth <= 0) ? 1 : vTaskWidth;
                        /**
                         * DRAW THE BOXES FOR GANTT
                         */
                        var vTmpDivCell = void 0;
                        if (vComb) {
                            vTmpDivCell = vTmpDiv = this.vTaskList[i].getParItem().getCellDiv();
                        }
                        else {
                            // Draw Task Bar which has colored bar div
                            vTmpRow = this.newNode(vTmpTBody, 'tr', this.vDivId + 'childrow_' + vID, 'glineitem gitem' + this.vFormat, null, null, null, ((this.vTaskList[i].getVisible() == 0) ? 'none' : null));
                            this.vTaskList[i].setChildRow(vTmpRow);
                            events_1.addThisRowListeners(this, this.vTaskList[i].getListChildRow(), vTmpRow);
                            vTmpCell = this.newNode(vTmpRow, 'td', null, 'gtaskcell');
                            vTmpDivCell = vTmpDiv = this.newNode(vTmpCell, 'div', null, 'gtaskcelldiv', '\u00A0\u00A0');
                        }
                        // draw the lines for dependecies
                        vTmpDiv = this.newNode(vTmpDiv, 'div', this.vDivId + 'bardiv_' + vID, 'gtaskbarcontainer', null, vTaskWidth, vTaskLeftPx);
                        this.vTaskList[i].setBarDiv(vTmpDiv);
                        vTmpDiv2 = this.newNode(vTmpDiv, 'div', this.vDivId + 'taskbar_' + vID, this.vTaskList[i].getClass(), null, vTaskWidth);
                        this.vTaskList[i].setTaskDiv(vTmpDiv2);
                        // PLANNED
                        if (vTaskPlanLeftPx && vTaskPlanLeftPx != vTaskLeftPx) { // vTaskPlanRightPx vTaskPlanLeftPx
                            var vTmpPlanDiv = this.newNode(vTmpDivCell, 'div', this.vDivId + 'bardiv_' + vID, 'gtaskbarcontainer gplan', null, vTaskPlanRightPx, vTaskPlanLeftPx);
                            var vTmpDiv3 = this.newNode(vTmpPlanDiv, 'div', this.vDivId + 'taskbar_' + vID, this.vTaskList[i].getClass() + ' gplan', null, vTaskPlanRightPx);
                        }
                        // and opaque completion div
                        this.newNode(vTmpDiv2, 'div', this.vDivId + 'complete_' + vID, this.vTaskList[i].getClass() + 'complete', null, this.vTaskList[i].getCompStr());
                        // caption
                        if (vComb)
                            vTmpItem = this.vTaskList[i].getParItem();
                        if (!vComb || (vComb && this.vTaskList[i].getParItem().getEnd() == this.vTaskList[i].getEnd()))
                            vCaptClass = 'gcaption';
                        // Background cells
                        if (!vSingleCell && !vComb) {
                            vCellFormat = '';
                            for (j = 0; j < vNumCols - 1; j++) {
                                if (this.vFormat == 'day' && ((j % 7 == 4) || (j % 7 == 5)))
                                    vCellFormat = 'gtaskcellwkend';
                                else
                                    vCellFormat = 'gtaskcell';
                                this.newNode(vTmpRow, 'td', null, vCellFormat, '\u00A0\u00A0');
                            }
                        }
                    }
                }
                if (this.getCaptionType() && vCaptClass !== null) {
                    var vCaptionStr = void 0;
                    switch (this.getCaptionType()) {
                        case 'Caption':
                            vCaptionStr = vTmpItem.getCaption();
                            break;
                        case 'Resource':
                            vCaptionStr = vTmpItem.getResource();
                            break;
                        case 'Duration':
                            vCaptionStr = vTmpItem.getDuration(this.vFormat, this.vLangs[this.vLang]);
                            break;
                        case 'Complete':
                            vCaptionStr = vTmpItem.getCompStr();
                            break;
                    }
                    this.newNode(vTmpDiv, 'div', null, vCaptClass, vCaptionStr, 120, (vCaptClass == 'gmilecaption') ? 12 : 0);
                }
                // Add Task Info div for tooltip
                if (this.vTaskList[i].getTaskDiv() && vTmpDiv) {
                    vTmpDiv2 = this.newNode(vTmpDiv, 'div', this.vDivId + 'tt' + vID, null, null, null, null, 'none');
                    vTmpDiv2.appendChild(this.createTaskInfo(this.vTaskList[i], this.vTooltipTemplate));
                    events_1.addTooltipListeners(this, this.vTaskList[i].getTaskDiv(), vTmpDiv2);
                }
            }
            if (this.vDebug) {
                var ad = new Date();
                console.log('after tasks loop', ad, (ad.getTime() - bd_1.getTime()));
            }
            if (!vSingleCell) {
                vTmpTBody.appendChild(vDateRow.cloneNode(true));
            }
            else if (this.vFormat == 'day') {
                vTmpTBody.appendChild(vTmpRow.cloneNode(true));
            }
            // MAIN VIEW: Appending all generated components to main view
            while (this.vDiv.hasChildNodes())
                this.vDiv.removeChild(this.vDiv.firstChild);
            vTmpDiv = this.newNode(this.vDiv, 'div', null, 'gchartcontainer');
            var leftvTmpDiv = this.newNode(vTmpDiv, 'div', null, 'gmain gmainleft');
            leftvTmpDiv.appendChild(vLeftHeader);
            // leftvTmpDiv.appendChild(vLeftTable);
            var rightvTmpDiv = this.newNode(vTmpDiv, 'div', null, 'gmain gmainright');
            rightvTmpDiv.appendChild(vRightHeader);
            rightvTmpDiv.appendChild(vRightTable);
            vTmpDiv.appendChild(leftvTmpDiv);
            vTmpDiv.appendChild(rightvTmpDiv);
            this.newNode(vTmpDiv, 'div', null, 'ggridfooter');
            vTmpDiv2 = this.newNode(this.getChartBody(), 'div', this.vDivId + 'Lines', 'glinediv');
            vTmpDiv2.style.visibility = 'hidden';
            this.setLines(vTmpDiv2);
            /* Quick hack to show the generated HTML on older browsers - add a '/' to the begining of this line to activate
                  let tmpGenSrc=document.createElement('textarea');
                  tmpGenSrc.appendChild(document.createTextNode(vTmpDiv.innerHTML));
                  vDiv.appendChild(tmpGenSrc);
            //*/
            // LISTENERS: Now all the content exists, register scroll listeners
            events_1.addScrollListeners(this);
            // now check if we are actually scrolling the pane
            if (this.vScrollTo != '') {
                var vScrollDate = new Date(vMinDate.getTime());
                var vScrollPx = 0;
                if (this.vScrollTo.substr(0, 2) == 'px') {
                    vScrollPx = parseInt(this.vScrollTo.substr(2));
                }
                else {
                    vScrollDate = utils_1.parseDateStr(this.vScrollTo, this.getDateInputFormat());
                    if (this.vFormat == 'hour')
                        vScrollDate.setMinutes(0, 0, 0);
                    else
                        vScrollDate.setHours(0, 0, 0, 0);
                    vScrollPx = utils_1.getOffset(vMinDate, vScrollDate, vColWidth, this.vFormat);
                }
                this.getChartBody().scrollLeft = vScrollPx;
            }
            if (vMinDate.getTime() <= (new Date()).getTime() && vMaxDate.getTime() >= (new Date()).getTime())
                this.vTodayPx = utils_1.getOffset(vMinDate, new Date(), vColWidth, this.vFormat);
            else
                this.vTodayPx = -1;
            // Dependencies
            var bdd = void 0;
            if (this.vDebug) {
                bdd = new Date();
                console.log('before DrawDependencies', bdd);
            }
            this.DrawDependencies(this.vDebug);
            events_1.addListenerDependencies();
            if (this.vDebug) {
                var ad = new Date();
                console.log('after DrawDependencies', ad, (ad.getTime() - bdd.getTime()));
            }
        }
        if (this.vDebug) {
            var ad = new Date();
            console.log('after draw', ad, (ad.getTime() - bd.getTime()));
        }
        if (this.vEvents && this.vEvents.afterDraw) {
            this.vEvents.afterDraw();
        }
    }; //this.draw
    this.drawSelector = function (pPos) {
        var vOutput = document.createDocumentFragment();
        var vDisplay = false;
        for (var i = 0; i < this.vShowSelector.length && !vDisplay; i++) {
            if (this.vShowSelector[i].toLowerCase() == pPos.toLowerCase())
                vDisplay = true;
        }
        if (vDisplay) {
            var vTmpDiv = this.newNode(vOutput, 'div', null, 'gselector', this.vLangs[this.vLang]['format'] + ':');
            if (this.vFormatArr.join().toLowerCase().indexOf('hour') != -1)
                events_1.addFormatListeners(this, 'hour', this.newNode(vTmpDiv, 'span', this.vDivId + 'formathour' + pPos, 'gformlabel' + ((this.vFormat == 'hour') ? ' gselected' : ''), this.vLangs[this.vLang]['hour']));
            if (this.vFormatArr.join().toLowerCase().indexOf('day') != -1)
                events_1.addFormatListeners(this, 'day', this.newNode(vTmpDiv, 'span', this.vDivId + 'formatday' + pPos, 'gformlabel' + ((this.vFormat == 'day') ? ' gselected' : ''), this.vLangs[this.vLang]['day']));
            if (this.vFormatArr.join().toLowerCase().indexOf('week') != -1)
                events_1.addFormatListeners(this, 'week', this.newNode(vTmpDiv, 'span', this.vDivId + 'formatweek' + pPos, 'gformlabel' + ((this.vFormat == 'week') ? ' gselected' : ''), this.vLangs[this.vLang]['week']));
            if (this.vFormatArr.join().toLowerCase().indexOf('month') != -1)
                events_1.addFormatListeners(this, 'month', this.newNode(vTmpDiv, 'span', this.vDivId + 'formatmonth' + pPos, 'gformlabel' + ((this.vFormat == 'month') ? ' gselected' : ''), this.vLangs[this.vLang]['month']));
            if (this.vFormatArr.join().toLowerCase().indexOf('quarter') != -1)
                events_1.addFormatListeners(this, 'quarter', this.newNode(vTmpDiv, 'span', this.vDivId + 'formatquarter' + pPos, 'gformlabel' + ((this.vFormat == 'quarter') ? ' gselected' : ''), this.vLangs[this.vLang]['quarter']));
        }
        else {
            this.newNode(vOutput, 'div', null, 'gselector');
        }
        return vOutput;
    };
    if (this.vDiv && this.vDiv.nodeName.toLowerCase() == 'div')
        this.vDivId = this.vDiv.id;
}; //GanttChart
var makeInput = function (formattedValue, editable, type, value, choices) {
    if (type === void 0) { type = 'text'; }
    if (value === void 0) { value = null; }
    if (choices === void 0) { choices = null; }
    if (!value) {
        value = formattedValue;
    }
    if (editable) {
        switch (type) {
            case 'date':
                // Take timezone into account before converting to ISO String
                value = value ? new Date(value.getTime() - (value.getTimezoneOffset() * 60000)).toISOString().split('T')[0] : '';
                return "<input class=\"gantt-inputtable\" type=\"date\" value=\"" + value + "\">";
            case 'resource':
                if (choices) {
                    var found = choices.find(function (c) { return c.id == value || c.name == value; });
                    if (found) {
                        value = found.id;
                    }
                    else {
                        choices.push({ id: value, name: value });
                    }
                    return "<select>" + choices.map(function (c) { return "<option value=\"" + c.id + "\" " + (value == c.id ? 'selected' : '') + " >" + c.name + "</option>"; }).join('') + "</select>";
                }
                else {
                    return "<input class=\"gantt-inputtable\" type=\"text\" value=\"" + (value ? value : '') + "\">";
                }
            case 'cost':
                return "<input class=\"gantt-inputtable\" type=\"number\" max=\"100\" min=\"0\" value=\"" + (value ? value : '') + "\">";
            default:
                return "<input class=\"gantt-inputtable\" value=\"" + (value ? value : '') + "\">";
        }
    }
    else {
        return formattedValue;
    }
};
exports.updateFlyingObj = function (e, pGanttChartObj, pTimer) {
    var vCurTopBuf = 3;
    var vCurLeftBuf = 5;
    var vCurBotBuf = 3;
    var vCurRightBuf = 15;
    var vMouseX = (e) ? e.clientX : window.event.clientX;
    var vMouseY = (e) ? e.clientY : window.event.clientY;
    var vViewportX = document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth;
    var vViewportY = document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    var vNewX = vMouseX;
    var vNewY = vMouseY;
    if (navigator.appName.toLowerCase() == 'microsoft internet explorer') {
        // the clientX and clientY properties include the left and top borders of the client area
        vMouseX -= document.documentElement.clientLeft;
        vMouseY -= document.documentElement.clientTop;
        var vZoomFactor = utils_1.getZoomFactor();
        if (vZoomFactor != 1) { // IE 7 at non-default zoom level
            vMouseX = Math.round(vMouseX / vZoomFactor);
            vMouseY = Math.round(vMouseY / vZoomFactor);
        }
    }
    var vScrollPos = utils_1.getScrollPositions();
    /* Code for positioned right of the mouse by default*/
    /*
    if (vMouseX+vCurRightBuf+pGanttChartObj.vTool.offsetWidth>vViewportX)
    {
        if (vMouseX-vCurLeftBuf-pGanttChartObj.vTool.offsetWidth<0) vNewX=vScrollPos.x;
        else vNewX=vMouseX+vScrollPos.x-vCurLeftBuf-pGanttChartObj.vTool.offsetWidth;
    }
    else vNewX=vMouseX+vScrollPos.x+vCurRightBuf;
    */
    /* Code for positioned left of the mouse by default */
    if (vMouseX - vCurLeftBuf - pGanttChartObj.vTool.offsetWidth < 0) {
        if (vMouseX + vCurRightBuf + pGanttChartObj.vTool.offsetWidth > vViewportX)
            vNewX = vScrollPos.x;
        else
            vNewX = vMouseX + vScrollPos.x + vCurRightBuf;
    }
    else
        vNewX = vMouseX + vScrollPos.x - vCurLeftBuf - pGanttChartObj.vTool.offsetWidth;
    /* Code for positioned below the mouse by default */
    if (vMouseY + vCurBotBuf + pGanttChartObj.vTool.offsetHeight > vViewportY) {
        if (vMouseY - vCurTopBuf - pGanttChartObj.vTool.offsetHeight < 0)
            vNewY = vScrollPos.y;
        else
            vNewY = vMouseY + vScrollPos.y - vCurTopBuf - pGanttChartObj.vTool.offsetHeight;
    }
    else
        vNewY = vMouseY + vScrollPos.y + vCurBotBuf;
    /* Code for positioned above the mouse by default */
    /*
    if (vMouseY-vCurTopBuf-pGanttChartObj.vTool.offsetHeight<0)
    {
        if (vMouseY+vCurBotBuf+pGanttChartObj.vTool.offsetHeight>vViewportY) vNewY=vScrollPos.y;
        else vNewY=vMouseY+vScrollPos.y+vCurBotBuf;
    }
    else vNewY=vMouseY+vScrollPos.y-vCurTopBuf-pGanttChartObj.vTool.offsetHeight;
    */
    if (pGanttChartObj.getUseMove()) {
        clearInterval(pGanttChartObj.vTool.moveInterval);
        pGanttChartObj.vTool.moveInterval = setInterval(function () { events_1.moveToolTip(vNewX, vNewY, pGanttChartObj.vTool, pTimer); }, pTimer);
    }
    else {
        pGanttChartObj.vTool.style.left = vNewX + 'px';
        pGanttChartObj.vTool.style.top = vNewY + 'px';
    }
};
//# sourceMappingURL=draw.js.map
},{"./lang":"N4Jh","./events":"7bO/","./utils":"WqwM","./task":"zrDB","./options":"rd6+","./xml":"RF+8"}],"7bO/":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
var task_1 = require("./task");
var draw_1 = require("./draw");
exports.mouseOver = function (pObj1, pObj2) {
    if (this.getUseRowHlt()) {
        pObj1.className += ' gitemhighlight';
        pObj2.className += ' gitemhighlight';
    }
};
exports.mouseOut = function (pObj1, pObj2) {
    if (this.getUseRowHlt()) {
        pObj1.className = pObj1.className.replace(/(?:^|\s)gitemhighlight(?!\S)/g, '');
        pObj2.className = pObj2.className.replace(/(?:^|\s)gitemhighlight(?!\S)/g, '');
    }
};
exports.showToolTip = function (pGanttChartObj, e, pContents, pWidth, pTimer) {
    var vTtDivId = pGanttChartObj.getDivId() + 'JSGanttToolTip';
    var vMaxW = 500;
    var vMaxAlpha = 100;
    var vShowing = pContents.id;
    if (pGanttChartObj.getUseToolTip()) {
        if (pGanttChartObj.vTool == null) {
            pGanttChartObj.vTool = document.createElement('div');
            pGanttChartObj.vTool.id = vTtDivId;
            pGanttChartObj.vTool.className = 'JSGanttToolTip';
            pGanttChartObj.vTool.vToolCont = document.createElement('div');
            pGanttChartObj.vTool.vToolCont.id = vTtDivId + 'cont';
            pGanttChartObj.vTool.vToolCont.className = 'JSGanttToolTipcont';
            pGanttChartObj.vTool.vToolCont.setAttribute('showing', '');
            pGanttChartObj.vTool.appendChild(pGanttChartObj.vTool.vToolCont);
            document.body.appendChild(pGanttChartObj.vTool);
            pGanttChartObj.vTool.style.opacity = 0;
            pGanttChartObj.vTool.setAttribute('currentOpacity', 0);
            pGanttChartObj.vTool.setAttribute('fadeIncrement', 10);
            pGanttChartObj.vTool.setAttribute('moveSpeed', 10);
            pGanttChartObj.vTool.style.filter = 'alpha(opacity=0)';
            pGanttChartObj.vTool.style.visibility = 'hidden';
            pGanttChartObj.vTool.style.left = Math.floor(((e) ? e.clientX : window.event.clientX) / 2) + 'px';
            pGanttChartObj.vTool.style.top = Math.floor(((e) ? e.clientY : window.event.clientY) / 2) + 'px';
            this.addListener('mouseover', function () { clearTimeout(pGanttChartObj.vTool.delayTimeout); }, pGanttChartObj.vTool);
            this.addListener('mouseout', function () { utils_1.delayedHide(pGanttChartObj, pGanttChartObj.vTool, pTimer); }, pGanttChartObj.vTool);
        }
        clearTimeout(pGanttChartObj.vTool.delayTimeout);
        if (pGanttChartObj.vTool.vToolCont.getAttribute('showing') != vShowing || pGanttChartObj.vTool.style.visibility != 'visible') {
            if (pGanttChartObj.vTool.vToolCont.getAttribute('showing') != vShowing) {
                pGanttChartObj.vTool.vToolCont.setAttribute('showing', vShowing);
                pGanttChartObj.vTool.vToolCont.innerHTML = pContents.innerHTML;
                // as we are allowing arbitrary HTML we should remove any tag ids to prevent duplication
                utils_1.stripIds(pGanttChartObj.vTool.vToolCont);
            }
            pGanttChartObj.vTool.style.visibility = 'visible';
            // Rather than follow the mouse just have it stay put
            draw_1.updateFlyingObj(e, pGanttChartObj, pTimer);
            pGanttChartObj.vTool.style.width = (pWidth) ? pWidth + 'px' : 'auto';
            if (!pWidth && utils_1.isIE()) {
                pGanttChartObj.vTool.style.width = pGanttChartObj.vTool.offsetWidth;
            }
            if (pGanttChartObj.vTool.offsetWidth > vMaxW) {
                pGanttChartObj.vTool.style.width = vMaxW + 'px';
            }
        }
        if (pGanttChartObj.getUseFade()) {
            clearInterval(pGanttChartObj.vTool.fadeInterval);
            pGanttChartObj.vTool.fadeInterval = setInterval(function () { utils_1.fadeToolTip(1, pGanttChartObj.vTool, vMaxAlpha); }, pTimer);
        }
        else {
            pGanttChartObj.vTool.style.opacity = vMaxAlpha * 0.01;
            pGanttChartObj.vTool.style.filter = 'alpha(opacity=' + vMaxAlpha + ')';
        }
    }
};
exports.moveToolTip = function (pNewX, pNewY, pTool, timer) {
    var vSpeed = parseInt(pTool.getAttribute('moveSpeed'));
    var vOldX = parseInt(pTool.style.left);
    var vOldY = parseInt(pTool.style.top);
    if (pTool.style.visibility != 'visible') {
        pTool.style.left = pNewX + 'px';
        pTool.style.top = pNewY + 'px';
        clearInterval(pTool.moveInterval);
    }
    else {
        if (pNewX != vOldX && pNewY != vOldY) {
            vOldX += Math.ceil((pNewX - vOldX) / vSpeed);
            vOldY += Math.ceil((pNewY - vOldY) / vSpeed);
            pTool.style.left = vOldX + 'px';
            pTool.style.top = vOldY + 'px';
        }
        else {
            clearInterval(pTool.moveInterval);
        }
    }
};
exports.addListener = function (eventName, handler, control) {
    // Check if control is a string
    if (control === String(control))
        control = utils_1.findObj(control);
    if (control.addEventListener) //Standard W3C
     {
        return control.addEventListener(eventName, handler, false);
    }
    else if (control.attachEvent) //IExplore
     {
        return control.attachEvent('on' + eventName, handler);
    }
    else {
        return false;
    }
};
exports.addTooltipListeners = function (pGanttChart, pObj1, pObj2) {
    exports.addListener('mouseover', function (e) { exports.showToolTip(pGanttChart, e, pObj2, null, pGanttChart.getTimer()); }, pObj1);
    exports.addListener('mouseout', function (e) { utils_1.delayedHide(pGanttChart, pGanttChart.vTool, pGanttChart.getTimer()); }, pObj1);
};
exports.addThisRowListeners = function (pGanttChart, pObj1, pObj2) {
    exports.addListener('mouseover', function () { pGanttChart.mouseOver(pObj1, pObj2); }, pObj1);
    exports.addListener('mouseover', function () { pGanttChart.mouseOver(pObj1, pObj2); }, pObj2);
    exports.addListener('mouseout', function () { pGanttChart.mouseOut(pObj1, pObj2); }, pObj1);
    exports.addListener('mouseout', function () { pGanttChart.mouseOut(pObj1, pObj2); }, pObj2);
};
exports.addFolderListeners = function (pGanttChart, pObj, pID) {
    exports.addListener('click', function () { task_1.folder(pID, pGanttChart); }, pObj);
};
exports.addFormatListeners = function (pGanttChart, pFormat, pObj) {
    exports.addListener('click', function () { utils_1.changeFormat(pFormat, pGanttChart); }, pObj);
};
exports.addScrollListeners = function (pGanttChart) {
    exports.addListener('resize', function () { pGanttChart.getChartHead().scrollLeft = pGanttChart.getChartBody().scrollLeft; }, window);
    exports.addListener('resize', function () {
        pGanttChart.getListBody().scrollTop = pGanttChart.getChartBody().scrollTop;
    }, window);
};
exports.addListenerClickCell = function (vTmpCell, vEvents, task, column) {
    exports.addListener('click', function (e) {
        if (e.target.classList.contains('gfoldercollapse') === false &&
            vEvents[column] && typeof vEvents[column] === 'function') {
            vEvents[column](task, e, vTmpCell);
        }
    }, vTmpCell);
};
exports.addListenerInputCell = function (vTmpCell, vEventsChange, callback, task, column, draw, event) {
    if (draw === void 0) { draw = null; }
    if (event === void 0) { event = 'blur'; }
    if (vTmpCell.children[0] && vTmpCell.children[0].children && vTmpCell.children[0].children[0]) {
        var selectInputOrButton = ['SELECT', 'INPUT', 'BUTTON'].find(function (k) { return k === vTmpCell.children[0].children[0].tagName; });
        if (selectInputOrButton) {
            exports.addListener(event, function (e) {
                if (callback) {
                    callback(task, e);
                }
                if (vEventsChange[column] && typeof vEventsChange[column] === 'function') {
                    var q = vEventsChange[column](task, e, vTmpCell, vColumnsNames[column]);
                    if (q && q.then) {
                        q.then(function (e) { return draw(); });
                    }
                    else {
                        draw();
                    }
                }
                else {
                    draw();
                }
            }, vTmpCell.children[0].children[0]);
        }
    }
};
exports.addListenerDependencies = function () {
    var elements = document.querySelectorAll('.gtaskbarcontainer');
    for (var i = 0; i < elements.length; i++) {
        var taskDiv = elements[i];
        taskDiv.addEventListener('mouseover', function (e) {
            toggleDependencies(e);
        });
        taskDiv.addEventListener('mouseout', function (e) {
            toggleDependencies(e);
        });
    }
};
var toggleDependencies = function (e) {
    var target = e.currentTarget;
    var ids = target.getAttribute('id').split('_');
    var style = 'groove';
    if (e.type === 'mouseout') {
        style = '';
    }
    if (ids.length > 1) {
        var frameZones = Array.from(document.querySelectorAll(".gDepId" + ids[1]));
        frameZones.forEach(function (c) {
            c.style.borderStyle = style;
        });
        // document.querySelectorAll(`.gDepId${ids[1]}`).forEach((c: any) => {
        // c.style.borderStyle = style;
        // });
    }
};
// "pID": 122
var vColumnsNames = {
    taskname: 'pName',
    res: 'pRes',
    dur: '',
    comp: 'pComp',
    start: 'pStart',
    end: 'pEnd',
    planstart: 'pPlanStart',
    planend: 'pPlanEnd',
    link: 'pLink',
    cost: 'pCost',
    mile: 'pMile',
    group: 'pGroup',
    parent: 'pParent',
    open: 'pOpen',
    depend: 'pDepend',
    caption: 'pCaption',
    note: 'pNotes'
};
//# sourceMappingURL=events.js.map
},{"./utils":"WqwM","./task":"zrDB","./draw":"+iYo"}],"kTp7":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var task_1 = require("./task");
/**
 *
 * @param pFile
 * @param pGanttlet
 */
exports.parseJSON = function (pFile, pGanttVar, vDebug) {
    if (vDebug === void 0) { vDebug = false; }
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else { // IE 5/6
        xhttp = new window.ActiveXObject('Microsoft.XMLHTTP');
    }
    xhttp.open('GET', pFile, false);
    xhttp.send(null);
    var bd;
    if (vDebug) {
        bd = new Date();
        console.log('before jsonparse', bd);
    }
    var jsonObj = JSON.parse(xhttp.response);
    if (vDebug) {
        var ad = new Date();
        console.log('after jsonparse', ad, (ad.getTime() - bd.getTime()));
        bd = new Date();
    }
    exports.addJSONTask(pGanttVar, jsonObj);
    if (this.vDebug) {
        var ad = new Date();
        console.log('after addJSONTask', ad, (ad.getTime() - bd.getTime()));
    }
    return jsonObj;
};
exports.parseJSONString = function (pStr, pGanttVar) {
    exports.addJSONTask(pGanttVar, eval('(' + pStr + ')'));
};
exports.addJSONTask = function (pGanttVar, pJsonObj) {
    if ({}.toString.call(pJsonObj) === '[object Array]') {
        for (var index = 0; index < pJsonObj.length; index++) {
            var id = void 0;
            var name_1 = void 0;
            var start = void 0;
            var end = void 0;
            var planstart = void 0;
            var planend = void 0;
            var itemClass = void 0;
            var link = '';
            var milestone = 0;
            var resourceName = '';
            var completion = void 0;
            var group = 0;
            var parent_1 = void 0;
            var open_1 = void 0;
            var dependsOn = '';
            var caption = '';
            var notes = '';
            var cost = void 0;
            var duration = '';
            var additionalObject = {};
            for (var prop in pJsonObj[index]) {
                var property = prop;
                var value = pJsonObj[index][property];
                switch (property.toLowerCase()) {
                    case 'pid':
                    case 'id':
                        id = value;
                        break;
                    case 'pname':
                    case 'name':
                        name_1 = value;
                        break;
                    case 'pstart':
                    case 'start':
                        start = value;
                        break;
                    case 'pend':
                    case 'end':
                        end = value;
                        break;
                    case 'pplanstart':
                    case 'planstart':
                        planstart = value;
                        break;
                    case 'pplanend':
                    case 'planend':
                        planend = value;
                        break;
                    case 'pclass':
                    case 'class':
                        itemClass = value;
                        break;
                    case 'plink':
                    case 'link':
                        link = value;
                        break;
                    case 'pmile':
                    case 'mile':
                        milestone = value;
                        break;
                    case 'pres':
                    case 'res':
                        resourceName = value;
                        break;
                    case 'pcomp':
                    case 'comp':
                        completion = value;
                        break;
                    case 'pgroup':
                    case 'group':
                        group = value;
                        break;
                    case 'pparent':
                    case 'parent':
                        parent_1 = value;
                        break;
                    case 'popen':
                    case 'open':
                        open_1 = value;
                        break;
                    case 'pdepend':
                    case 'depend':
                        dependsOn = value;
                        break;
                    case 'pcaption':
                    case 'caption':
                        caption = value;
                        break;
                    case 'pnotes':
                    case 'notes':
                        notes = value;
                        break;
                    case 'pcost':
                    case 'cost':
                        cost = value;
                        break;
                    case 'duration':
                    case 'pduration':
                        duration = value;
                        break;
                    default:
                        additionalObject[property.toLowerCase()] = value;
                }
            }
            //if (id != undefined && !isNaN(parseInt(id)) && isFinite(id) && name && start && end && itemClass && completion != undefined && !isNaN(parseFloat(completion)) && isFinite(completion) && !isNaN(parseInt(parent)) && isFinite(parent)) {
            pGanttVar.AddTaskItem(new task_1.TaskItem(id, name_1, start, end, itemClass, link, milestone, resourceName, completion, group, parent_1, open_1, dependsOn, caption, notes, pGanttVar, cost, planstart, planend, duration, additionalObject));
            //}
        }
    }
};
//# sourceMappingURL=json.js.map
},{"./task":"zrDB"}],"oeqA":[function(require,module,exports) {
"use strict";
/*
    * Copyright (c) 2013-2018, Paul Geldart, Eduardo Rodrigues, Ricardo Cardoso and Mario Mol.
    *
    * Redistribution and use in source and binary forms, with or without
    * modification, are permitted provided that the following conditions are met:
    *     * Redistributions of source code must retain the above copyright
    *       notice, this list of conditions and the following disclaimer.
    *     * Redistributions in binary form must reproduce the above copyright
    *       notice, this list of conditions and the following disclaimer in the
    *       documentation and/or other materials provided with the distribution.
    *     * Neither the name of AUTHORS nor the names of its contributors
    *       may be used to endorse or promote products derived from this software
    *       without specific prior written permission.
    *
    * THIS SOFTWARE IS PROVIDED BY THE AUTHORS ''AS IS'' AND ANY EXPRESS OR
    * IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
    * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
    * IN NO EVENT SHALL AUTHORS BE LIABLE FOR ANY DIRECT,
    * INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
    * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
    * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
    * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
    * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
    * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

    This project is based on jsGantt 1.2, (which can be obtained from
    https://code.google.com/p/jsgantt/) and remains under the original BSD license.
    Copyright (c) 2009, Shlomy Gantz BlueBrick Inc.
*/
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("./events");
var utils_1 = require("./utils");
var xml_1 = require("./xml");
var task_1 = require("./task");
var draw_1 = require("./draw");
var json_1 = require("./json");
if (!exports.JSGantt)
    exports.JSGantt = {};
exports.JSGantt.isIE = utils_1.isIE;
exports.JSGantt.TaskItem = task_1.TaskItem;
exports.JSGantt.GanttChart = draw_1.GanttChart;
exports.JSGantt.updateFlyingObj = draw_1.updateFlyingObj;
exports.JSGantt.showToolTip = events_1.showToolTip;
exports.JSGantt.stripIds = utils_1.stripIds;
exports.JSGantt.stripUnwanted = utils_1.stripUnwanted;
exports.JSGantt.delayedHide = utils_1.delayedHide;
exports.JSGantt.hideToolTip = utils_1.hideToolTip;
exports.JSGantt.fadeToolTip = utils_1.fadeToolTip;
exports.JSGantt.moveToolTip = events_1.moveToolTip;
exports.JSGantt.getZoomFactor = utils_1.getZoomFactor;
exports.JSGantt.getOffset = utils_1.getOffset;
exports.JSGantt.getScrollPositions = utils_1.getScrollPositions;
exports.JSGantt.processRows = task_1.processRows;
exports.JSGantt.sortTasks = task_1.sortTasks;
// Used to determine the minimum date of all tasks and set lower bound based on format
exports.JSGantt.getMinDate = utils_1.getMinDate;
// Used to determine the maximum date of all tasks and set upper bound based on format
exports.JSGantt.getMaxDate = utils_1.getMaxDate;
// This function finds the document id of the specified object
exports.JSGantt.findObj = utils_1.findObj;
exports.JSGantt.changeFormat = utils_1.changeFormat;
// Tasks
exports.JSGantt.folder = task_1.folder;
exports.JSGantt.hide = task_1.hide;
exports.JSGantt.show = task_1.show;
exports.JSGantt.taskLink = task_1.taskLink;
exports.JSGantt.parseDateStr = utils_1.parseDateStr;
exports.JSGantt.formatDateStr = utils_1.formatDateStr;
exports.JSGantt.parseDateFormatStr = utils_1.parseDateFormatStr;
// XML 
exports.JSGantt.parseXML = xml_1.parseXML;
exports.JSGantt.parseXMLString = xml_1.parseXMLString;
exports.JSGantt.findXMLNode = xml_1.findXMLNode;
exports.JSGantt.getXMLNodeValue = xml_1.getXMLNodeValue;
exports.JSGantt.AddXMLTask = xml_1.AddXMLTask;
// JSON
exports.JSGantt.parseJSON = json_1.parseJSON;
exports.JSGantt.parseJSONString = json_1.parseJSONString;
exports.JSGantt.addJSONTask = json_1.addJSONTask;
exports.JSGantt.benchMark = utils_1.benchMark;
exports.JSGantt.getIsoWeek = utils_1.getIsoWeek;
exports.JSGantt.addListener = events_1.addListener;
exports.JSGantt.addTooltipListeners = events_1.addTooltipListeners;
exports.JSGantt.addThisRowListeners = events_1.addThisRowListeners;
exports.JSGantt.addFolderListeners = events_1.addFolderListeners;
exports.JSGantt.addFormatListeners = events_1.addFormatListeners;
exports.JSGantt.addScrollListeners = events_1.addScrollListeners;
exports.JSGantt.criticalPath = utils_1.criticalPath;
//# sourceMappingURL=jsgantt.js.map
},{"./events":"7bO/","./utils":"WqwM","./xml":"RF+8","./task":"zrDB","./draw":"+iYo","./json":"kTp7"}],"1hku":[function(require,module,exports) {
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsGantt = require("./src/jsgantt");
module.exports = jsGantt.JSGantt;
exports.JSGantt = jsGantt.JSGantt;
//# sourceMappingURL=index.js.map
},{"./src/jsgantt":"oeqA"}],"P6sg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var JSGantt = _interopRequireWildcard(require("jsgantt-improved"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

//
//
//
//
//
//
//
var _default = {
  data: function data() {
    return {
      dataBaru: DATA
    };
  },
  methods: {
    getChart: function getChart() {
      var g = new JSGantt.GanttChart(document.getElementById("GanttChartDIV"), "day"); // g.AddTaskItemObject(this.dataBaru);

      g.setOptions({
        vCaptionType: "Complete",
        // Set to Show Caption : None,Caption,Resource,Duration,Complete,
        vQuarterColWidth: 36,
        vDateTaskDisplayFormat: "day dd month yyyy",
        // Shown in tool tip box
        vDayMajorDateDisplayFormat: "mon yyyy - Week ww",
        // Set format to dates in the "Major" header of the "Day" view
        vWeekMinorDateDisplayFormat: "dd mon",
        // Set format to display dates in the "Minor" header of the "Week" view
        vLang: "en",
        vShowTaskInfoLink: 1,
        // Show link in tool tip (0/1)
        vShowEndWeekDate: 0,
        // Show/Hide the date for the last day of the week in header for daily
        vAdditionalHeaders: {
          // Add data columns to your table
          category: {
            title: "Category"
          },
          sector: {
            title: "Sector"
          }
        },
        vUseSingleCell: 10000,
        // Set the threshold cell per table row (Helps performance for large data.
        vFormatArr: ["Day", "Week", "Month", "Quarter"] // Even with setUseSingleCell using Hour format on such a large chart can cause issues in some browsers,

      });
      this.dataBaru.forEach(function (d) {
        d.pGantt = g;
        g.AddTaskItemObject(d);
      });
      g.Draw();
    }
  },
  mounted: function mounted() {
    this.getChart();
  }
};
exports.default = _default;
        var $cd3e28 = exports.default || module.exports;
      
      if (typeof $cd3e28 === 'function') {
        $cd3e28 = $cd3e28.options;
      }
    
        /* template */
        Object.assign($cd3e28, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('h1',[_vm._v("\n\thello Vue\n\t"),_c('div',{staticClass:"gantt",staticStyle:{"position":"relative"},attrs:{"id":"GanttChartDIV"}})])}]

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"jsgantt-improved":"1hku"}],"HVwU":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ganttchart = _interopRequireDefault(require("../components/ganttchart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
var _default = {
  components: {
    vChart: _ganttchart.default
  },
  data: function data() {
    return {
      dataBaru: DATA
    };
  }
};
exports.default = _default;
        var $d66462 = exports.default || module.exports;
      
      if (typeof $d66462 === 'function') {
        $d66462 = $d66462.options;
      }
    
        /* template */
        Object.assign($d66462, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-chart',{attrs:{"dataBaru":_vm.dataBaru}})}
var staticRenderFns = []

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../components/ganttchart":"P6sg"}],"WUj6":[function(require,module,exports) {
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _chart = _interopRequireDefault(require("./vue/pages/chart.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _vue.default(_chart.default).$mount('#app');
},{"vue":"f5S3","./vue/pages/chart.vue":"HVwU"}]},{},["WUj6"], null)