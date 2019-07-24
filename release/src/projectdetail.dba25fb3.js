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
},{"./vue.common.prod.js":"MpUJ"}],"Yp7S":[function(require,module,exports) {
var define;
var global = arguments[3];
/*! Buefy v0.7.10 | MIT License | github.com/buefy/buefy */
(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory(require("vue"));else if (typeof define === 'function' && define.amd) define(["vue"], factory);else if (typeof exports === 'object') exports["Buefy"] = factory(require("vue"));else root["Buefy"] = factory(root["Vue"]);
})(typeof self !== 'undefined' ? self : this, function (__WEBPACK_EXTERNAL_MODULE_18__) {
  return (
    /******/
    function (modules) {
      // webpackBootstrap

      /******/
      // The module cache

      /******/
      var installedModules = {};
      /******/

      /******/
      // The require function

      /******/

      function __webpack_require__(moduleId) {
        /******/

        /******/
        // Check if module is in cache

        /******/
        if (installedModules[moduleId]) {
          /******/
          return installedModules[moduleId].exports;
          /******/
        }
        /******/
        // Create a new module (and put it into the cache)

        /******/


        var module = installedModules[moduleId] = {
          /******/
          i: moduleId,

          /******/
          l: false,

          /******/
          exports: {}
          /******/

        };
        /******/

        /******/
        // Execute the module function

        /******/

        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/

        /******/
        // Flag the module as loaded

        /******/

        module.l = true;
        /******/

        /******/
        // Return the exports of the module

        /******/

        return module.exports;
        /******/
      }
      /******/

      /******/

      /******/
      // expose the modules object (__webpack_modules__)

      /******/


      __webpack_require__.m = modules;
      /******/

      /******/
      // expose the module cache

      /******/

      __webpack_require__.c = installedModules;
      /******/

      /******/
      // define getter function for harmony exports

      /******/

      __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
          /******/
          Object.defineProperty(exports, name, {
            /******/
            configurable: false,

            /******/
            enumerable: true,

            /******/
            get: getter
            /******/

          });
          /******/
        }
        /******/

      };
      /******/

      /******/
      // getDefaultExport function for compatibility with non-harmony modules

      /******/


      __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
        /******/
        function getDefault() {
          return module['default'];
        } :
        /******/
        function getModuleExports() {
          return module;
        };
        /******/

        __webpack_require__.d(getter, 'a', getter);
        /******/


        return getter;
        /******/
      };
      /******/

      /******/
      // Object.prototype.hasOwnProperty.call

      /******/


      __webpack_require__.o = function (object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
      };
      /******/

      /******/
      // __webpack_public_path__

      /******/


      __webpack_require__.p = "/";
      /******/

      /******/
      // Load entry module and return exports

      /******/

      return __webpack_require__(__webpack_require__.s = 70);
      /******/
    }(
    /************************************************************************/

    /******/
    [
    /* 0 */

    /***/
    function (module, exports) {
      /* globals __VUE_SSR_CONTEXT__ */
      // this module is a runtime utility for cleaner component module output and will
      // be included in the final webpack user bundle
      module.exports = function normalizeComponent(rawScriptExports, compiledTemplate, injectStyles, scopeId, moduleIdentifier
      /* server only */
      ) {
        var esModule;
        var scriptExports = rawScriptExports = rawScriptExports || {}; // ES6 modules interop

        var type = typeof rawScriptExports.default;

        if (type === 'object' || type === 'function') {
          esModule = rawScriptExports;
          scriptExports = rawScriptExports.default;
        } // Vue.extend constructor export interop


        var options = typeof scriptExports === 'function' ? scriptExports.options : scriptExports; // render functions

        if (compiledTemplate) {
          options.render = compiledTemplate.render;
          options.staticRenderFns = compiledTemplate.staticRenderFns;
        } // scopedId


        if (scopeId) {
          options._scopeId = scopeId;
        }

        var hook;

        if (moduleIdentifier) {
          // server build
          hook = function (context) {
            // 2.3 injection
            context = context || // cached call
            this.$vnode && this.$vnode.ssrContext || // stateful
            this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
            // 2.2 with runInNewContext: true

            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
              context = __VUE_SSR_CONTEXT__;
            } // inject component styles


            if (injectStyles) {
              injectStyles.call(this, context);
            } // register component module identifier for async chunk inferrence


            if (context && context._registeredComponents) {
              context._registeredComponents.add(moduleIdentifier);
            }
          }; // used by ssr in case component is cached and beforeCreate
          // never gets called


          options._ssrRegister = hook;
        } else if (injectStyles) {
          hook = injectStyles;
        }

        if (hook) {
          var functional = options.functional;
          var existing = functional ? options.render : options.beforeCreate;

          if (!functional) {
            // inject component registration as beforeCreate hook
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          } else {
            // register for functioal component in vue file
            options.render = function renderWithStyleInjection(h, context) {
              hook.call(context);
              return existing(h, context);
            };
          }
        }

        return {
          esModule: esModule,
          exports: scriptExports,
          options: options
        };
      };
      /***/

    },
    /* 1 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      exports.__esModule = true;

      var _defineProperty = __webpack_require__(102);

      var _defineProperty2 = _interopRequireDefault(_defineProperty);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }

      exports.default = function (obj, key, value) {
        if (key in obj) {
          (0, _defineProperty2.default)(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
          });
        } else {
          obj[key] = value;
        }

        return obj;
      };
      /***/

    },
    /* 2 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "b", function () {
        return setOptions;
      });

      var config = {
        defaultContainerElement: null,
        defaultIconPack: 'mdi',
        defaultIconComponent: null,
        defaultDialogConfirmText: null,
        defaultDialogCancelText: null,
        defaultSnackbarDuration: 3500,
        defaultSnackbarPosition: null,
        defaultToastDuration: 2000,
        defaultToastPosition: null,
        defaultNotificationDuration: 2000,
        defaultNotificationPosition: null,
        defaultTooltipType: 'is-primary',
        defaultTooltipAnimated: false,
        defaultInputAutocomplete: 'on',
        defaultDateFormatter: null,
        defaultDateParser: null,
        defaultDateCreator: null,
        defaultDayNames: null,
        defaultMonthNames: null,
        defaultFirstDayOfWeek: null,
        defaultUnselectableDaysOfWeek: null,
        defaultTimeFormatter: null,
        defaultTimeParser: null,
        defaultModalCanCancel: ['escape', 'x', 'outside', 'button'],
        defaultModalScroll: null,
        defaultDatepickerMobileNative: true,
        defaultTimepickerMobileNative: true,
        defaultNoticeQueue: true,
        defaultInputHasCounter: true,
        defaultUseHtml5Validation: true,
        defaultDropdownMobileModal: true,
        defaultFieldLabelPosition: null,
        defaultDatepickerYearsRange: [-100, 3],
        defaultDatepickerNearbyMonthDays: true,
        defaultDatepickerNearbySelectableMonthDays: false
      };
      /* harmony default export */

      __webpack_exports__["a"] = config;

      var setOptions = function setOptions(options) {
        config = options;
      };
      /***/

    },
    /* 3 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(106),
      /* template */
      __webpack_require__(107),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 4 */

    /***/
    function (module, exports, __webpack_require__) {
      var store = __webpack_require__(37)('wks');

      var uid = __webpack_require__(26);

      var Symbol = __webpack_require__(8).Symbol;

      var USE_SYMBOL = typeof Symbol == 'function';

      var $exports = module.exports = function (name) {
        return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
      };

      $exports.store = store;
      /***/
    },
    /* 5 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(89),
        __esModule: true
      };
      /***/
    },
    /* 6 */

    /***/
    function (module, exports) {
      var core = module.exports = {
        version: '2.5.7'
      };
      if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

      /***/
    },
    /* 7 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony export (immutable) */

      __webpack_exports__["a"] = getValueByPath;
      /* harmony export (immutable) */

      __webpack_exports__["b"] = indexOf;
      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "c", function () {
        return isMobile;
      });
      /* harmony export (immutable) */


      __webpack_exports__["d"] = removeElement;
      /* unused harmony export escapeRegExpChars */

      /**
       * Get value of an object property/path even if it's nested
       */

      function getValueByPath(obj, path) {
        var value = path.split('.').reduce(function (o, i) {
          return o[i];
        }, obj);
        return value;
      }
      /**
       * Extension of indexOf method by equality function if specified
       */


      function indexOf(array, obj, fn) {
        if (!array) return -1;
        if (!fn || typeof fn !== 'function') return array.indexOf(obj);

        for (var i = 0; i < array.length; i++) {
          if (fn(array[i], obj)) {
            return i;
          }
        }

        return -1;
      }
      /**
       * Mobile detection
       * https://www.abeautifulsite.net/detecting-mobile-devices-with-javascript
       */


      var isMobile = {
        Android: function Android() {
          return typeof window !== 'undefined' && window.navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function BlackBerry() {
          return typeof window !== 'undefined' && window.navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function iOS() {
          return typeof window !== 'undefined' && window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function Opera() {
          return typeof window !== 'undefined' && window.navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function Windows() {
          return typeof window !== 'undefined' && window.navigator.userAgent.match(/IEMobile/i);
        },
        any: function any() {
          return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
        }
      };

      function removeElement(el) {
        if (typeof el.remove !== 'undefined') {
          el.remove();
        } else if (typeof el.parentNode !== 'undefined') {
          el.parentNode.removeChild(el);
        }
      }
      /**
       * Escape regex characters
       * http://stackoverflow.com/a/6969486
       */


      function escapeRegExpChars(value) {
        if (!value) return value; // eslint-disable-next-line

        return value.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      }
      /***/

    },
    /* 8 */

    /***/
    function (module, exports) {
      // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
      var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func
      : Function('return this')();
      if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

      /***/
    },
    /* 9 */

    /***/
    function (module, exports, __webpack_require__) {
      var anObject = __webpack_require__(15);

      var IE8_DOM_DEFINE = __webpack_require__(47);

      var toPrimitive = __webpack_require__(32);

      var dP = Object.defineProperty;
      exports.f = __webpack_require__(12) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
        anObject(O);
        P = toPrimitive(P, true);
        anObject(Attributes);
        if (IE8_DOM_DEFINE) try {
          return dP(O, P, Attributes);
        } catch (e) {
          /* empty */
        }
        if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
        if ('value' in Attributes) O[P] = Attributes.value;
        return O;
      };
      /***/
    },
    /* 10 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(2);
      /* harmony default export */


      __webpack_exports__["a"] = {
        props: {
          size: String,
          expanded: Boolean,
          loading: Boolean,
          rounded: Boolean,
          icon: String,
          iconPack: String,
          // Native options to use in HTML5 validation
          autocomplete: String,
          maxlength: [Number, String],
          useHtml5Validation: {
            type: Boolean,
            default: function _default() {
              return __WEBPACK_IMPORTED_MODULE_0__utils_config__["a"
              /* default */
              ].defaultUseHtml5Validation;
            }
          },
          validationMessage: String
        },
        data: function data() {
          return {
            isValid: true,
            isFocused: false,
            newIconPack: this.iconPack || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a"
            /* default */
            ].defaultIconPack
          };
        },
        computed: {
          /**
           * Find parent Field, max 3 levels deep.
           */
          parentField: function parentField() {
            var parent = this.$parent;

            for (var i = 0; i < 3; i++) {
              if (parent && !parent.$data._isField) {
                parent = parent.$parent;
              }
            }

            return parent;
          },

          /**
           * Get the type prop from parent if it's a Field.
           */
          statusType: function statusType() {
            if (!this.parentField) return;
            if (!this.parentField.newType) return;

            if (typeof this.parentField.newType === 'string') {
              return this.parentField.newType;
            } else {
              for (var key in this.parentField.newType) {
                if (this.parentField.newType[key]) {
                  return key;
                }
              }
            }
          },

          /**
           * Get the message prop from parent if it's a Field.
           */
          statusMessage: function statusMessage() {
            if (!this.parentField) return;
            return this.parentField.newMessage;
          },

          /**
           * Fix icon size for inputs, large was too big
           */
          iconSize: function iconSize() {
            switch (this.size) {
              case 'is-small':
                return this.size;

              case 'is-medium':
                return;

              case 'is-large':
                return this.newIconPack === 'mdi' ? 'is-medium' : '';
            }
          }
        },
        methods: {
          /**
           * Focus method that work dynamically depending on the component.
           */
          focus: function focus() {
            var _this = this;

            if (this.$data._elementRef === undefined) return;
            this.$nextTick(function () {
              var el = _this.$el.querySelector(_this.$data._elementRef);

              if (el) el.focus();
            });
          },
          onBlur: function onBlur($event) {
            this.isFocused = false;
            this.$emit('blur', $event);
            this.checkHtml5Validity();
          },
          onFocus: function onFocus($event) {
            this.isFocused = true;
            this.$emit('focus', $event);
          },

          /**
           * Check HTML5 validation, set isValid property.
           * If validation fail, send 'is-danger' type,
           * and error message to parent if it's a Field.
           */
          checkHtml5Validity: function checkHtml5Validity() {
            var _this2 = this;

            if (!this.useHtml5Validation) return;
            if (this.$refs[this.$data._elementRef] === undefined) return;
            var el = this.$el.querySelector(this.$data._elementRef);
            var type = null;
            var message = null;
            var isValid = true;

            if (!el.checkValidity()) {
              type = 'is-danger';
              message = this.validationMessage || el.validationMessage;
              isValid = false;
            }

            this.isValid = isValid;
            this.$nextTick(function () {
              if (_this2.parentField) {
                // Set type only if not defined
                if (!_this2.parentField.type) {
                  _this2.parentField.newType = type;
                } // Set message only if not defined


                if (!_this2.parentField.message) {
                  _this2.parentField.newMessage = message;
                }
              }
            });
            return this.isValid;
          }
        }
      };
      /***/
    },
    /* 11 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(71),
        __esModule: true
      };
      /***/
    },
    /* 12 */

    /***/
    function (module, exports, __webpack_require__) {
      // Thank's IE8 for his funny defineProperty
      module.exports = !__webpack_require__(21)(function () {
        return Object.defineProperty({}, 'a', {
          get: function () {
            return 7;
          }
        }).a != 7;
      });
      /***/
    },
    /* 13 */

    /***/
    function (module, exports) {
      var hasOwnProperty = {}.hasOwnProperty;

      module.exports = function (it, key) {
        return hasOwnProperty.call(it, key);
      };
      /***/

    },
    /* 14 */

    /***/
    function (module, exports, __webpack_require__) {
      var dP = __webpack_require__(9);

      var createDesc = __webpack_require__(22);

      module.exports = __webpack_require__(12) ? function (object, key, value) {
        return dP.f(object, key, createDesc(1, value));
      } : function (object, key, value) {
        object[key] = value;
        return object;
      };
      /***/
    },
    /* 15 */

    /***/
    function (module, exports, __webpack_require__) {
      var isObject = __webpack_require__(20);

      module.exports = function (it) {
        if (!isObject(it)) throw TypeError(it + ' is not an object!');
        return it;
      };
      /***/

    },
    /* 16 */

    /***/
    function (module, exports, __webpack_require__) {
      // to indexed object, toObject with fallback for non-array-like ES3 strings
      var IObject = __webpack_require__(50);

      var defined = __webpack_require__(34);

      module.exports = function (it) {
        return IObject(defined(it));
      };
      /***/

    },
    /* 17 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(105),
      /* template */
      __webpack_require__(108),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 18 */

    /***/
    function (module, exports) {
      module.exports = __WEBPACK_EXTERNAL_MODULE_18__;
      /***/
    },
    /* 19 */

    /***/
    function (module, exports, __webpack_require__) {
      var global = __webpack_require__(8);

      var core = __webpack_require__(6);

      var ctx = __webpack_require__(46);

      var hide = __webpack_require__(14);

      var has = __webpack_require__(13);

      var PROTOTYPE = 'prototype';

      var $export = function (type, name, source) {
        var IS_FORCED = type & $export.F;
        var IS_GLOBAL = type & $export.G;
        var IS_STATIC = type & $export.S;
        var IS_PROTO = type & $export.P;
        var IS_BIND = type & $export.B;
        var IS_WRAP = type & $export.W;
        var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
        var expProto = exports[PROTOTYPE];
        var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
        var key, own, out;
        if (IS_GLOBAL) source = name;

        for (key in source) {
          // contains in native
          own = !IS_FORCED && target && target[key] !== undefined;
          if (own && has(exports, key)) continue; // export native or passed

          out = own ? target[key] : source[key]; // prevent global pollution for namespaces

          exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key] // bind timers to global for call from export context
          : IS_BIND && own ? ctx(out, global) // wrap global constructors for prevent change them in library
          : IS_WRAP && target[key] == out ? function (C) {
            var F = function (a, b, c) {
              if (this instanceof C) {
                switch (arguments.length) {
                  case 0:
                    return new C();

                  case 1:
                    return new C(a);

                  case 2:
                    return new C(a, b);
                }

                return new C(a, b, c);
              }

              return C.apply(this, arguments);
            };

            F[PROTOTYPE] = C[PROTOTYPE];
            return F; // make static versions for prototype methods
          }(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out; // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%

          if (IS_PROTO) {
            (exports.virtual || (exports.virtual = {}))[key] = out; // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%

            if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
          }
        }
      }; // type bitmap


      $export.F = 1; // forced

      $export.G = 2; // global

      $export.S = 4; // static

      $export.P = 8; // proto

      $export.B = 16; // bind

      $export.W = 32; // wrap

      $export.U = 64; // safe

      $export.R = 128; // real proto method for `library`

      module.exports = $export;
      /***/
    },
    /* 20 */

    /***/
    function (module, exports) {
      module.exports = function (it) {
        return typeof it === 'object' ? it !== null : typeof it === 'function';
      };
      /***/

    },
    /* 21 */

    /***/
    function (module, exports) {
      module.exports = function (exec) {
        try {
          return !!exec();
        } catch (e) {
          return true;
        }
      };
      /***/

    },
    /* 22 */

    /***/
    function (module, exports) {
      module.exports = function (bitmap, value) {
        return {
          enumerable: !(bitmap & 1),
          configurable: !(bitmap & 2),
          writable: !(bitmap & 4),
          value: value
        };
      };
      /***/

    },
    /* 23 */

    /***/
    function (module, exports) {
      module.exports = {};
      /***/
    },
    /* 24 */

    /***/
    function (module, exports, __webpack_require__) {
      // 19.1.2.14 / 15.2.3.14 Object.keys(O)
      var $keys = __webpack_require__(49);

      var enumBugKeys = __webpack_require__(38);

      module.exports = Object.keys || function keys(O) {
        return $keys(O, enumBugKeys);
      };
      /***/

    },
    /* 25 */

    /***/
    function (module, exports) {
      module.exports = true;
      /***/
    },
    /* 26 */

    /***/
    function (module, exports) {
      var id = 0;
      var px = Math.random();

      module.exports = function (key) {
        return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
      };
      /***/

    },
    /* 27 */

    /***/
    function (module, exports) {
      exports.f = {}.propertyIsEnumerable;
      /***/
    },
    /* 28 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(123),
      /* template */
      __webpack_require__(124),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 29 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(125),
      /* template */
      __webpack_require__(126),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 30 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(127),
      /* template */
      __webpack_require__(130),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 31 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(137),
      /* template */
      __webpack_require__(138),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 32 */

    /***/
    function (module, exports, __webpack_require__) {
      // 7.1.1 ToPrimitive(input [, PreferredType])
      var isObject = __webpack_require__(20); // instead of the ES6 spec version, we didn't implement @@toPrimitive case
      // and the second argument - flag - preferred type is a string


      module.exports = function (it, S) {
        if (!isObject(it)) return it;
        var fn, val;
        if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
        if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
        if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
        throw TypeError("Can't convert object to primitive value");
      };
      /***/

    },
    /* 33 */

    /***/
    function (module, exports) {
      var toString = {}.toString;

      module.exports = function (it) {
        return toString.call(it).slice(8, -1);
      };
      /***/

    },
    /* 34 */

    /***/
    function (module, exports) {
      // 7.2.1 RequireObjectCoercible(argument)
      module.exports = function (it) {
        if (it == undefined) throw TypeError("Can't call method on  " + it);
        return it;
      };
      /***/

    },
    /* 35 */

    /***/
    function (module, exports) {
      // 7.1.4 ToInteger
      var ceil = Math.ceil;
      var floor = Math.floor;

      module.exports = function (it) {
        return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
      };
      /***/

    },
    /* 36 */

    /***/
    function (module, exports, __webpack_require__) {
      var shared = __webpack_require__(37)('keys');

      var uid = __webpack_require__(26);

      module.exports = function (key) {
        return shared[key] || (shared[key] = uid(key));
      };
      /***/

    },
    /* 37 */

    /***/
    function (module, exports, __webpack_require__) {
      var core = __webpack_require__(6);

      var global = __webpack_require__(8);

      var SHARED = '__core-js_shared__';
      var store = global[SHARED] || (global[SHARED] = {});
      (module.exports = function (key, value) {
        return store[key] || (store[key] = value !== undefined ? value : {});
      })('versions', []).push({
        version: core.version,
        mode: __webpack_require__(25) ? 'pure' : 'global',
        copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
      });
      /***/
    },
    /* 38 */

    /***/
    function (module, exports) {
      // IE 8- don't enum bug keys
      module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');
      /***/
    },
    /* 39 */

    /***/
    function (module, exports) {
      exports.f = Object.getOwnPropertySymbols;
      /***/
    },
    /* 40 */

    /***/
    function (module, exports, __webpack_require__) {
      // 7.1.13 ToObject(argument)
      var defined = __webpack_require__(34);

      module.exports = function (it) {
        return Object(defined(it));
      };
      /***/

    },
    /* 41 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      var $at = __webpack_require__(81)(true); // 21.1.3.27 String.prototype[@@iterator]()


      __webpack_require__(54)(String, 'String', function (iterated) {
        this._t = String(iterated); // target

        this._i = 0; // next index
        // 21.1.5.2.1 %StringIteratorPrototype%.next()
      }, function () {
        var O = this._t;
        var index = this._i;
        var point;
        if (index >= O.length) return {
          value: undefined,
          done: true
        };
        point = $at(O, index);
        this._i += point.length;
        return {
          value: point,
          done: false
        };
      });
      /***/

    },
    /* 42 */

    /***/
    function (module, exports, __webpack_require__) {
      var def = __webpack_require__(9).f;

      var has = __webpack_require__(13);

      var TAG = __webpack_require__(4)('toStringTag');

      module.exports = function (it, tag, stat) {
        if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
          configurable: true,
          value: tag
        });
      };
      /***/

    },
    /* 43 */

    /***/
    function (module, exports, __webpack_require__) {
      exports.f = __webpack_require__(4);
      /***/
    },
    /* 44 */

    /***/
    function (module, exports, __webpack_require__) {
      var global = __webpack_require__(8);

      var core = __webpack_require__(6);

      var LIBRARY = __webpack_require__(25);

      var wksExt = __webpack_require__(43);

      var defineProperty = __webpack_require__(9).f;

      module.exports = function (name) {
        var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
        if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, {
          value: wksExt.f(name)
        });
      };
      /***/

    },
    /* 45 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__config__ = __webpack_require__(2);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__(7);
      /* harmony default export */


      __webpack_exports__["a"] = {
        props: {
          type: {
            type: String,
            default: 'is-dark'
          },
          message: String,
          duration: Number,
          queue: {
            type: Boolean,
            default: undefined
          },
          position: {
            type: String,
            default: 'is-top',
            validator: function validator(value) {
              return ['is-top-right', 'is-top', 'is-top-left', 'is-bottom-right', 'is-bottom', 'is-bottom-left'].indexOf(value) > -1;
            }
          },
          container: String
        },
        data: function data() {
          return {
            isActive: false,
            parentTop: null,
            parentBottom: null,
            newContainer: this.container || __WEBPACK_IMPORTED_MODULE_0__config__["a"
            /* default */
            ].defaultContainerElement
          };
        },
        computed: {
          correctParent: function correctParent() {
            switch (this.position) {
              case 'is-top-right':
              case 'is-top':
              case 'is-top-left':
                return this.parentTop;

              case 'is-bottom-right':
              case 'is-bottom':
              case 'is-bottom-left':
                return this.parentBottom;
            }
          },
          transition: function transition() {
            switch (this.position) {
              case 'is-top-right':
              case 'is-top':
              case 'is-top-left':
                return {
                  enter: 'fadeInDown',
                  leave: 'fadeOut'
                };

              case 'is-bottom-right':
              case 'is-bottom':
              case 'is-bottom-left':
                return {
                  enter: 'fadeInUp',
                  leave: 'fadeOut'
                };
            }
          }
        },
        methods: {
          shouldQueue: function shouldQueue() {
            var queue = this.queue !== undefined ? this.queue : __WEBPACK_IMPORTED_MODULE_0__config__["a"
            /* default */
            ].defaultNoticeQueue;
            if (!queue) return false;
            return this.parentTop.childElementCount > 0 || this.parentBottom.childElementCount > 0;
          },
          close: function close() {
            var _this = this;

            clearTimeout(this.timer);
            this.isActive = false; // Timeout for the animation complete before destroying

            setTimeout(function () {
              _this.$destroy();

              Object(__WEBPACK_IMPORTED_MODULE_1__helpers__["d"
              /* removeElement */
              ])(_this.$el);
            }, 150);
          },
          showNotice: function showNotice() {
            var _this2 = this;

            if (this.shouldQueue()) {
              // Call recursively if should queue
              setTimeout(function () {
                return _this2.showNotice();
              }, 250);
              return;
            }

            this.correctParent.insertAdjacentElement('afterbegin', this.$el);
            this.isActive = true;

            if (!this.indefinite) {
              this.timer = setTimeout(function () {
                return _this2.close();
              }, this.newDuration);
            }
          },
          setupContainer: function setupContainer() {
            this.parentTop = document.querySelector('.notices.is-top');
            this.parentBottom = document.querySelector('.notices.is-bottom');
            if (this.parentTop && this.parentBottom) return;

            if (!this.parentTop) {
              this.parentTop = document.createElement('div');
              this.parentTop.className = 'notices is-top';
            }

            if (!this.parentBottom) {
              this.parentBottom = document.createElement('div');
              this.parentBottom.className = 'notices is-bottom';
            }

            var container = document.querySelector(this.newContainer) || document.body;
            container.appendChild(this.parentTop);
            container.appendChild(this.parentBottom);

            if (this.newContainer) {
              this.parentTop.classList.add('has-custom-container');
              this.parentBottom.classList.add('has-custom-container');
            }
          }
        },
        beforeMount: function beforeMount() {
          this.setupContainer();
        },
        mounted: function mounted() {
          this.showNotice();
        }
      };
      /***/
    },
    /* 46 */

    /***/
    function (module, exports, __webpack_require__) {
      // optional / simple context binding
      var aFunction = __webpack_require__(73);

      module.exports = function (fn, that, length) {
        aFunction(fn);
        if (that === undefined) return fn;

        switch (length) {
          case 1:
            return function (a) {
              return fn.call(that, a);
            };

          case 2:
            return function (a, b) {
              return fn.call(that, a, b);
            };

          case 3:
            return function (a, b, c) {
              return fn.call(that, a, b, c);
            };
        }

        return function ()
        /* ...args */
        {
          return fn.apply(that, arguments);
        };
      };
      /***/

    },
    /* 47 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = !__webpack_require__(12) && !__webpack_require__(21)(function () {
        return Object.defineProperty(__webpack_require__(48)('div'), 'a', {
          get: function () {
            return 7;
          }
        }).a != 7;
      });
      /***/
    },
    /* 48 */

    /***/
    function (module, exports, __webpack_require__) {
      var isObject = __webpack_require__(20);

      var document = __webpack_require__(8).document; // typeof document.createElement is 'object' in old IE


      var is = isObject(document) && isObject(document.createElement);

      module.exports = function (it) {
        return is ? document.createElement(it) : {};
      };
      /***/

    },
    /* 49 */

    /***/
    function (module, exports, __webpack_require__) {
      var has = __webpack_require__(13);

      var toIObject = __webpack_require__(16);

      var arrayIndexOf = __webpack_require__(75)(false);

      var IE_PROTO = __webpack_require__(36)('IE_PROTO');

      module.exports = function (object, names) {
        var O = toIObject(object);
        var i = 0;
        var result = [];
        var key;

        for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key); // Don't enum bug & hidden keys


        while (names.length > i) if (has(O, key = names[i++])) {
          ~arrayIndexOf(result, key) || result.push(key);
        }

        return result;
      };
      /***/

    },
    /* 50 */

    /***/
    function (module, exports, __webpack_require__) {
      // fallback for non-array-like ES3 and non-enumerable old V8 strings
      var cof = __webpack_require__(33); // eslint-disable-next-line no-prototype-builtins


      module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
        return cof(it) == 'String' ? it.split('') : Object(it);
      };
      /***/
    },
    /* 51 */

    /***/
    function (module, exports, __webpack_require__) {
      // 7.1.15 ToLength
      var toInteger = __webpack_require__(35);

      var min = Math.min;

      module.exports = function (it) {
        return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
      };
      /***/

    },
    /* 52 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(78),
      /* template */
      __webpack_require__(109),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 53 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      exports.__esModule = true;

      var _iterator = __webpack_require__(79);

      var _iterator2 = _interopRequireDefault(_iterator);

      var _symbol = __webpack_require__(5);

      var _symbol2 = _interopRequireDefault(_symbol);

      var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) {
        return typeof obj;
      } : function (obj) {
        return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj;
      };

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }

      exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
        return typeof obj === "undefined" ? "undefined" : _typeof(obj);
      } : function (obj) {
        return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
      };
      /***/
    },
    /* 54 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      var LIBRARY = __webpack_require__(25);

      var $export = __webpack_require__(19);

      var redefine = __webpack_require__(55);

      var hide = __webpack_require__(14);

      var Iterators = __webpack_require__(23);

      var $iterCreate = __webpack_require__(82);

      var setToStringTag = __webpack_require__(42);

      var getPrototypeOf = __webpack_require__(85);

      var ITERATOR = __webpack_require__(4)('iterator');

      var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`

      var FF_ITERATOR = '@@iterator';
      var KEYS = 'keys';
      var VALUES = 'values';

      var returnThis = function () {
        return this;
      };

      module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
        $iterCreate(Constructor, NAME, next);

        var getMethod = function (kind) {
          if (!BUGGY && kind in proto) return proto[kind];

          switch (kind) {
            case KEYS:
              return function keys() {
                return new Constructor(this, kind);
              };

            case VALUES:
              return function values() {
                return new Constructor(this, kind);
              };
          }

          return function entries() {
            return new Constructor(this, kind);
          };
        };

        var TAG = NAME + ' Iterator';
        var DEF_VALUES = DEFAULT == VALUES;
        var VALUES_BUG = false;
        var proto = Base.prototype;
        var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
        var $default = $native || getMethod(DEFAULT);
        var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
        var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
        var methods, key, IteratorPrototype; // Fix native

        if ($anyNative) {
          IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));

          if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
            // Set @@toStringTag to native iterators
            setToStringTag(IteratorPrototype, TAG, true); // fix for some old engines

            if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
          }
        } // fix Array#{values, @@iterator}.name in V8 / FF


        if (DEF_VALUES && $native && $native.name !== VALUES) {
          VALUES_BUG = true;

          $default = function values() {
            return $native.call(this);
          };
        } // Define iterator


        if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
          hide(proto, ITERATOR, $default);
        } // Plug for library


        Iterators[NAME] = $default;
        Iterators[TAG] = returnThis;

        if (DEFAULT) {
          methods = {
            values: DEF_VALUES ? $default : getMethod(VALUES),
            keys: IS_SET ? $default : getMethod(KEYS),
            entries: $entries
          };
          if (FORCED) for (key in methods) {
            if (!(key in proto)) redefine(proto, key, methods[key]);
          } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
        }

        return methods;
      };
      /***/

    },
    /* 55 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = __webpack_require__(14);
      /***/
    },
    /* 56 */

    /***/
    function (module, exports, __webpack_require__) {
      // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
      var anObject = __webpack_require__(15);

      var dPs = __webpack_require__(83);

      var enumBugKeys = __webpack_require__(38);

      var IE_PROTO = __webpack_require__(36)('IE_PROTO');

      var Empty = function () {
        /* empty */
      };

      var PROTOTYPE = 'prototype'; // Create object with fake `null` prototype: use iframe Object with cleared prototype

      var createDict = function () {
        // Thrash, waste and sodomy: IE GC bug
        var iframe = __webpack_require__(48)('iframe');

        var i = enumBugKeys.length;
        var lt = '<';
        var gt = '>';
        var iframeDocument;
        iframe.style.display = 'none';

        __webpack_require__(84).appendChild(iframe);

        iframe.src = 'javascript:'; // eslint-disable-line no-script-url
        // createDict = iframe.contentWindow.Object;
        // html.removeChild(iframe);

        iframeDocument = iframe.contentWindow.document;
        iframeDocument.open();
        iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
        iframeDocument.close();
        createDict = iframeDocument.F;

        while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];

        return createDict();
      };

      module.exports = Object.create || function create(O, Properties) {
        var result;

        if (O !== null) {
          Empty[PROTOTYPE] = anObject(O);
          result = new Empty();
          Empty[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

          result[IE_PROTO] = O;
        } else result = createDict();

        return Properties === undefined ? result : dPs(result, Properties);
      };
      /***/

    },
    /* 57 */

    /***/
    function (module, exports, __webpack_require__) {
      __webpack_require__(86);

      var global = __webpack_require__(8);

      var hide = __webpack_require__(14);

      var Iterators = __webpack_require__(23);

      var TO_STRING_TAG = __webpack_require__(4)('toStringTag');

      var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' + 'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' + 'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' + 'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' + 'TextTrackList,TouchList').split(',');

      for (var i = 0; i < DOMIterables.length; i++) {
        var NAME = DOMIterables[i];
        var Collection = global[NAME];
        var proto = Collection && Collection.prototype;
        if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
        Iterators[NAME] = Iterators.Array;
      }
      /***/

    },
    /* 58 */

    /***/
    function (module, exports, __webpack_require__) {
      // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
      var $keys = __webpack_require__(49);

      var hiddenKeys = __webpack_require__(38).concat('length', 'prototype');

      exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
        return $keys(O, hiddenKeys);
      };
      /***/

    },
    /* 59 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(99),
        __esModule: true
      };
      /***/
    },
    /* 60 */

    /***/
    function (module, exports, __webpack_require__) {
      var classof = __webpack_require__(101);

      var ITERATOR = __webpack_require__(4)('iterator');

      var Iterators = __webpack_require__(23);

      module.exports = __webpack_require__(6).getIteratorMethod = function (it) {
        if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
      };
      /***/

    },
    /* 61 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(113),
      /* template */
      __webpack_require__(114),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 62 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__FormElementMixin__ = __webpack_require__(10);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__helpers__ = __webpack_require__(7);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(2);

      var AM = 'AM';
      var PM = 'PM';
      var HOUR_FORMAT_24 = '24';
      var HOUR_FORMAT_12 = '12';

      var defaultTimeFormatter = function defaultTimeFormatter(date, vm) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var period = '';

        if (vm.hourFormat === HOUR_FORMAT_12) {
          period = ' ' + (hours < 12 ? AM : PM);

          if (hours > 12) {
            hours -= 12;
          } else if (hours === 0) {
            hours = 12;
          }
        }

        return vm.pad(hours) + ':' + vm.pad(minutes) + (vm.enableSeconds ? ':' + vm.pad(seconds) : '') + period;
      };

      var defaultTimeParser = function defaultTimeParser(timeString, vm) {
        if (timeString) {
          var am = false;

          if (vm.hourFormat === HOUR_FORMAT_12) {
            var dateString12 = timeString.split(' ');
            timeString = dateString12[0];
            am = dateString12[1] === AM;
          }

          var time = timeString.split(':');
          var hours = parseInt(time[0], 10);
          var minutes = parseInt(time[1], 10);
          var seconds = vm.enableSeconds ? parseInt(time[2], 10) : 0;

          if (isNaN(hours) || hours < 0 || hours > 23 || vm.hourFormat === HOUR_FORMAT_12 && (hours < 1 || hours > 12) || isNaN(minutes) || minutes < 0 || minutes > 59) {
            return null;
          }

          var d = null;

          if (vm.computedValue && !isNaN(vm.computedValue)) {
            d = new Date(vm.computedValue);
          } else {
            d = new Date();
            d.setMilliseconds(0);
          }

          d.setSeconds(seconds);
          d.setMinutes(minutes);

          if (vm.hourFormat === HOUR_FORMAT_12) {
            if (am && hours === 12) {
              hours = 0;
            } else if (!am && hours !== 12) {
              hours += 12;
            }
          }

          d.setHours(hours);
          return new Date(d.getTime());
        }

        return null;
      };
      /* harmony default export */


      __webpack_exports__["a"] = {
        mixins: [__WEBPACK_IMPORTED_MODULE_0__FormElementMixin__["a"
        /* default */
        ]],
        inheritAttrs: false,
        props: {
          value: Date,
          inline: Boolean,
          minTime: Date,
          maxTime: Date,
          placeholder: String,
          editable: Boolean,
          disabled: Boolean,
          hourFormat: {
            type: String,
            default: HOUR_FORMAT_24,
            validator: function validator(value) {
              return value === HOUR_FORMAT_24 || value === HOUR_FORMAT_12;
            }
          },
          incrementMinutes: {
            type: Number,
            default: 1
          },
          incrementSeconds: {
            type: Number,
            default: 1
          },
          timeFormatter: {
            type: Function,
            default: function _default(date, vm) {
              if (typeof __WEBPACK_IMPORTED_MODULE_2__config__["a"
              /* default */
              ].defaultTimeFormatter === 'function') {
                return __WEBPACK_IMPORTED_MODULE_2__config__["a"
                /* default */
                ].defaultTimeFormatter(date);
              } else {
                return defaultTimeFormatter(date, vm);
              }
            }
          },
          timeParser: {
            type: Function,
            default: function _default(date, vm) {
              if (typeof __WEBPACK_IMPORTED_MODULE_2__config__["a"
              /* default */
              ].defaultTimeParser === 'function') {
                return __WEBPACK_IMPORTED_MODULE_2__config__["a"
                /* default */
                ].defaultTimeParser(date);
              } else {
                return defaultTimeParser(date, vm);
              }
            }
          },
          mobileNative: {
            type: Boolean,
            default: function _default() {
              return __WEBPACK_IMPORTED_MODULE_2__config__["a"
              /* default */
              ].defaultTimepickerMobileNative;
            }
          },
          position: String,
          unselectableTimes: Array,
          openOnFocus: Boolean,
          enableSeconds: Boolean
        },
        data: function data() {
          return {
            dateSelected: this.value,
            hoursSelected: null,
            minutesSelected: null,
            secondsSelected: null,
            meridienSelected: null,
            _elementRef: 'input',
            AM: AM,
            PM: PM,
            HOUR_FORMAT_24: HOUR_FORMAT_24,
            HOUR_FORMAT_12: HOUR_FORMAT_12
          };
        },
        computed: {
          computedValue: {
            get: function get() {
              return this.dateSelected;
            },
            set: function set(value) {
              this.dateSelected = value;
              this.$emit('input', value);
            }
          },
          hours: function hours() {
            var hours = [];
            var numberOfHours = this.isHourFormat24 ? 24 : 12;

            for (var i = 0; i < numberOfHours; i++) {
              var value = i;
              var label = value;

              if (!this.isHourFormat24) {
                value = i + 1;
                label = value;

                if (this.meridienSelected === this.AM) {
                  if (value === 12) {
                    value = 0;
                  }
                } else if (this.meridienSelected === this.PM) {
                  if (value !== 12) {
                    value += 12;
                  }
                }
              }

              hours.push({
                label: this.formatNumber(label),
                value: value
              });
            }

            return hours;
          },
          minutes: function minutes() {
            var minutes = [];

            for (var i = 0; i < 60; i += this.incrementMinutes) {
              minutes.push({
                label: this.formatNumber(i),
                value: i
              });
            }

            return minutes;
          },
          seconds: function seconds() {
            var seconds = [];

            for (var i = 0; i < 60; i += this.incrementSeconds) {
              seconds.push({
                label: this.formatNumber(i),
                value: i
              });
            }

            return seconds;
          },
          meridiens: function meridiens() {
            return [AM, PM];
          },
          isMobile: function isMobile() {
            return this.mobileNative && __WEBPACK_IMPORTED_MODULE_1__helpers__["c"
            /* isMobile */
            ].any();
          },
          isHourFormat24: function isHourFormat24() {
            return this.hourFormat === HOUR_FORMAT_24;
          }
        },
        watch: {
          hourFormat: function hourFormat() {
            if (this.hoursSelected !== null) {
              this.meridienSelected = this.hoursSelected >= 12 ? PM : AM;
            }
          },

          /**
           * When v-model is changed:
           *   1. Update internal value.
           *   2. If it's invalid, validate again.
           */
          value: {
            handler: function handler(value) {
              this.updateInternalState(value);
              !this.isValid && this.$refs.input.checkHtml5Validity();
            },
            immediate: true
          }
        },
        methods: {
          onMeridienChange: function onMeridienChange(value) {
            if (this.hoursSelected !== null) {
              if (value === PM) {
                this.hoursSelected += 12;
              } else if (value === AM) {
                this.hoursSelected -= 12;
              }
            }

            this.updateDateSelected(this.hoursSelected, this.minutesSelected, this.enableSeconds ? this.secondsSelected : 0, value);
          },
          onHoursChange: function onHoursChange(value) {
            this.updateDateSelected(parseInt(value, 10), this.minutesSelected, this.enableSeconds ? this.secondsSelected : 0, this.meridienSelected);
          },
          onMinutesChange: function onMinutesChange(value) {
            this.updateDateSelected(this.hoursSelected, parseInt(value, 10), this.enableSeconds ? this.secondsSelected : 0, this.meridienSelected);
          },
          onSecondsChange: function onSecondsChange(value) {
            this.updateDateSelected(this.hoursSelected, this.minutesSelected, parseInt(value, 10), this.meridienSelected);
          },
          updateDateSelected: function updateDateSelected(hours, minutes, seconds, meridiens) {
            if (hours != null && minutes != null && (!this.isHourFormat24 && meridiens !== null || this.isHourFormat24)) {
              var time = null;

              if (this.computedValue && !isNaN(this.computedValue)) {
                time = new Date(this.computedValue);
              } else {
                time = new Date();
                time.setMilliseconds(0);
              }

              time.setHours(hours);
              time.setMinutes(minutes);
              time.setSeconds(seconds);
              this.computedValue = new Date(time.getTime());
            }
          },
          updateInternalState: function updateInternalState(value) {
            if (value) {
              this.hoursSelected = value.getHours();
              this.minutesSelected = value.getMinutes();
              this.secondsSelected = value.getSeconds();
              this.meridienSelected = value.getHours() >= 12 ? PM : AM;
            } else {
              this.hoursSelected = null;
              this.minutesSelected = null;
              this.secondsSelected = null;
              this.meridienSelected = AM;
            }

            this.dateSelected = value;
          },
          isHourDisabled: function isHourDisabled(hour) {
            var _this = this;

            var disabled = false;

            if (this.minTime) {
              var minHours = this.minTime.getHours();
              disabled = hour < minHours;
            }

            if (this.maxTime) {
              if (!disabled) {
                var maxHours = this.maxTime.getHours();
                disabled = hour > maxHours;
              }
            }

            if (this.unselectableTimes) {
              if (!disabled) {
                var unselectable = this.unselectableTimes.filter(function (time) {
                  if (_this.enableSeconds && _this.secondsSelected !== null) {
                    return time.getHours() === hour && time.getMinutes() === _this.minutesSelected && time.getSeconds() === _this.secondsSelected;
                  } else if (_this.minutesSelected !== null) {
                    return time.getHours() === hour && time.getMinutes() === _this.minutesSelected;
                  } else {
                    return time.getHours() === hour;
                  }
                });
                disabled = unselectable.length > 0;
              }
            }

            return disabled;
          },
          isMinuteDisabled: function isMinuteDisabled(minute) {
            var _this2 = this;

            var disabled = false;

            if (this.hoursSelected !== null) {
              if (this.isHourDisabled(this.hoursSelected)) {
                disabled = true;
              } else {
                if (this.minTime) {
                  var minHours = this.minTime.getHours();
                  var minMinutes = this.minTime.getMinutes();
                  disabled = this.hoursSelected === minHours && minute < minMinutes;
                }

                if (this.maxTime) {
                  if (!disabled) {
                    var maxHours = this.maxTime.getHours();
                    var maxMinutes = this.maxTime.getMinutes();
                    disabled = this.hoursSelected === maxHours && minute > maxMinutes;
                  }
                }
              }

              if (this.unselectableTimes) {
                if (!disabled) {
                  var unselectable = this.unselectableTimes.filter(function (time) {
                    if (_this2.enableSeconds && _this2.secondsSelected !== null) {
                      return time.getHours() === _this2.hoursSelected && time.getMinutes() === minute && time.getSeconds() === _this2.secondsSelected;
                    } else {
                      return time.getHours() === _this2.hoursSelected && time.getMinutes() === minute;
                    }
                  });
                  disabled = unselectable.length > 0;
                }
              }
            }

            return disabled;
          },
          isSecondDisabled: function isSecondDisabled(second) {
            var _this3 = this;

            var disabled = false;

            if (this.minutesSelected !== null) {
              if (this.isMinuteDisabled(this.minutesSelected)) {
                disabled = true;
              } else {
                if (this.minTime) {
                  var minHours = this.minTime.getHours();
                  var minMinutes = this.minTime.getMinutes();
                  var minSeconds = this.minTime.getSeconds();
                  disabled = this.hoursSelected === minHours && this.minutesSelected === minMinutes && second < minSeconds;
                }

                if (this.maxTime) {
                  if (!disabled) {
                    var maxHours = this.maxTime.getHours();
                    var maxMinutes = this.maxTime.getMinutes();
                    var maxSeconds = this.maxTime.getSeconds();
                    disabled = this.hoursSelected === maxHours && this.minutesSelected === maxMinutes && second > maxSeconds;
                  }
                }
              }

              if (this.unselectableTimes) {
                if (!disabled) {
                  var unselectable = this.unselectableTimes.filter(function (time) {
                    return time.getHours() === _this3.hoursSelected && time.getMinutes() === _this3.minutesSelected && time.getSeconds() === second;
                  });
                  disabled = unselectable.length > 0;
                }
              }
            }

            return disabled;
          },

          /*
          * Parse string into date
          */
          onChange: function onChange(value) {
            var date = this.timeParser(value, this);
            this.updateInternalState(date);

            if (date && !isNaN(date)) {
              this.computedValue = date;
            } else {
              // Force refresh input value when not valid date
              this.computedValue = null;
              this.$refs.input.newValue = this.computedValue;
            }
          },

          /*
          * Toggle timepicker
          */
          toggle: function toggle(active) {
            if (this.$refs.dropdown) {
              this.$refs.dropdown.isActive = typeof active === 'boolean' ? active : !this.$refs.dropdown.isActive;
            }
          },

          /*
          * Close timepicker
          */
          close: function close() {
            this.toggle(false);
          },

          /*
          * Call default onFocus method and show timepicker
          */
          handleOnFocus: function handleOnFocus() {
            this.onFocus();

            if (this.openOnFocus) {
              this.toggle(true);
            }
          },

          /*
          * Format date into string 'HH-MM-SS'
          */
          formatHHMMSS: function formatHHMMSS(value) {
            var date = new Date(value);

            if (value && !isNaN(date)) {
              var hours = date.getHours();
              var minutes = date.getMinutes();
              var seconds = date.getSeconds();
              return this.formatNumber(hours) + ':' + this.formatNumber(minutes, true) + ':' + this.formatNumber(seconds, true);
            }

            return '';
          },

          /*
          * Parse time from string
          */
          onChangeNativePicker: function onChangeNativePicker(event) {
            var date = event.target.value;

            if (date) {
              var time = null;

              if (this.computedValue && !isNaN(this.computedValue)) {
                time = new Date(this.computedValue);
              } else {
                time = new Date();
                time.setMilliseconds(0);
              }

              var t = date.split(':');
              time.setHours(parseInt(t[0], 10));
              time.setMinutes(parseInt(t[1], 10));
              time.setSeconds(t[2] ? parseInt(t[2], 10) : 0);
              this.computedValue = new Date(time.getTime());
            } else {
              this.computedValue = null;
            }
          },
          formatNumber: function formatNumber(value, isMinute) {
            return this.isHourFormat24 || isMinute ? this.pad(value) : value;
          },
          pad: function pad(value) {
            return (value < 10 ? '0' : '') + value;
          },

          /*
          * Format date into string
          */
          formatValue: function formatValue(date) {
            if (date && !isNaN(date)) {
              return this.timeFormatter(date, this);
            } else {
              return null;
            }
          },

          /**
           * Keypress event that is bound to the document.
           */
          keyPress: function keyPress(event) {
            // Esc key
            if (this.$refs.dropdown && this.$refs.dropdown.isActive && event.keyCode === 27) {
              this.toggle(false);
            }
          }
        },
        created: function created() {
          if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress);
          }
        },
        beforeDestroy: function beforeDestroy() {
          if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress);
          }
        }
      };
      /***/
    },
    /* 63 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(151),
      /* template */
      __webpack_require__(152),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 64 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* unused harmony export isSSR */

      /* harmony export (binding) */

      __webpack_require__.d(__webpack_exports__, "b", function () {
        return HTMLElement;
      });
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "a", function () {
        return File;
      }); // Polyfills for SSR


      var isSSR = typeof window === 'undefined';
      var HTMLElement = isSSR ? Object : window.HTMLElement;
      var File = isSSR ? Object : window.File;
      /***/
    },
    /* 65 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__components_icon_Icon__ = __webpack_require__(3);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__components_icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_icon_Icon__);
      /* harmony default export */


      __webpack_exports__["a"] = {
        components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__components_icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__components_icon_Icon___default.a),
        props: {
          active: {
            type: Boolean,
            default: true
          },
          title: String,
          closable: {
            type: Boolean,
            default: true
          },
          message: String,
          type: String,
          hasIcon: Boolean,
          size: String,
          iconPack: String,
          iconSize: String,
          autoClose: {
            type: Boolean,
            default: false
          },
          duration: {
            type: Number,
            default: 2000
          }
        },
        data: function data() {
          return {
            isActive: this.active
          };
        },
        watch: {
          active: function active(value) {
            this.isActive = value;
          },
          isActive: function isActive(value) {
            if (value) {
              this.setAutoClose();
            } else {
              if (this.timer) {
                clearTimeout(this.timer);
              }
            }
          }
        },
        computed: {
          /**
           * Icon name (MDI) based on type.
           */
          icon: function icon() {
            switch (this.type) {
              case 'is-info':
                return 'information';

              case 'is-success':
                return 'check-circle';

              case 'is-warning':
                return 'alert';

              case 'is-danger':
                return 'alert-circle';

              default:
                return null;
            }
          }
        },
        methods: {
          /**
           * Close the Message and emit events.
           */
          close: function close() {
            this.isActive = false;
            this.$emit('close');
            this.$emit('update:active', false);
          },

          /**
           * Set timer to auto close message
           */
          setAutoClose: function setAutoClose() {
            var _this = this;

            if (this.autoClose) {
              this.timer = setTimeout(function () {
                if (_this.isActive) {
                  _this.close();
                }
              }, this.duration);
            }
          }
        },
        mounted: function mounted() {
          this.setAutoClose();
        }
      };
      /***/
    },
    /* 66 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(177),
      /* template */
      __webpack_require__(178),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 67 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      /* harmony default export */

      __webpack_exports__["a"] = {
        name: 'BSlotComponent',
        props: {
          component: {
            type: Object,
            required: true
          },
          name: {
            type: String,
            default: 'default'
          },
          tag: {
            type: String,
            default: 'div'
          },
          event: {
            type: String,
            default: 'hook:updated'
          }
        },
        methods: {
          refresh: function refresh() {
            this.$forceUpdate();
          },
          isVueComponent: function isVueComponent() {
            return this.component && this.component._isVue;
          }
        },
        created: function created() {
          if (this.isVueComponent()) {
            this.component.$on(this.event, this.refresh);
          }
        },
        beforeDestroy: function beforeDestroy() {
          if (this.isVueComponent()) {
            this.component.$off(this.event, this.refresh);
          }
        },
        render: function render(createElement) {
          if (this.isVueComponent()) {
            var slots = this.component.$slots[this.name];
            return createElement(this.tag, {}, slots);
          }
        }
      };
      /***/
    },
    /* 68 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(209),
      /* template */
      __webpack_require__(210),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 69 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(217),
      /* template */
      __webpack_require__(218),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 70 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      var components_namespaceObject = {};

      __webpack_require__.d(components_namespaceObject, "Autocomplete", function () {
        return autocomplete;
      });

      __webpack_require__.d(components_namespaceObject, "Button", function () {
        return components_button;
      });

      __webpack_require__.d(components_namespaceObject, "Checkbox", function () {
        return components_checkbox;
      });

      __webpack_require__.d(components_namespaceObject, "Clockpicker", function () {
        return clockpicker;
      });

      __webpack_require__.d(components_namespaceObject, "Collapse", function () {
        return collapse;
      });

      __webpack_require__.d(components_namespaceObject, "Datepicker", function () {
        return datepicker;
      });

      __webpack_require__.d(components_namespaceObject, "Dialog", function () {
        return dialog;
      });

      __webpack_require__.d(components_namespaceObject, "Dropdown", function () {
        return dropdown;
      });

      __webpack_require__.d(components_namespaceObject, "Field", function () {
        return field;
      });

      __webpack_require__.d(components_namespaceObject, "Icon", function () {
        return icon;
      });

      __webpack_require__.d(components_namespaceObject, "Input", function () {
        return input;
      });

      __webpack_require__.d(components_namespaceObject, "Loading", function () {
        return loading;
      });

      __webpack_require__.d(components_namespaceObject, "Menu", function () {
        return menu;
      });

      __webpack_require__.d(components_namespaceObject, "Message", function () {
        return components_message;
      });

      __webpack_require__.d(components_namespaceObject, "Modal", function () {
        return modal;
      });

      __webpack_require__.d(components_namespaceObject, "Notification", function () {
        return notification;
      });

      __webpack_require__.d(components_namespaceObject, "Numberinput", function () {
        return numberinput;
      });

      __webpack_require__.d(components_namespaceObject, "Pagination", function () {
        return pagination;
      });

      __webpack_require__.d(components_namespaceObject, "Radio", function () {
        return components_radio;
      });

      __webpack_require__.d(components_namespaceObject, "Select", function () {
        return components_select;
      });

      __webpack_require__.d(components_namespaceObject, "Snackbar", function () {
        return snackbar;
      });

      __webpack_require__.d(components_namespaceObject, "Steps", function () {
        return steps;
      });

      __webpack_require__.d(components_namespaceObject, "Switch", function () {
        return components_switch;
      });

      __webpack_require__.d(components_namespaceObject, "Table", function () {
        return table;
      });

      __webpack_require__.d(components_namespaceObject, "Tabs", function () {
        return tabs;
      });

      __webpack_require__.d(components_namespaceObject, "Tag", function () {
        return tag;
      });

      __webpack_require__.d(components_namespaceObject, "Taginput", function () {
        return taginput;
      });

      __webpack_require__.d(components_namespaceObject, "Timepicker", function () {
        return timepicker;
      });

      __webpack_require__.d(components_namespaceObject, "Toast", function () {
        return toast;
      });

      __webpack_require__.d(components_namespaceObject, "Tooltip", function () {
        return tooltip;
      });

      __webpack_require__.d(components_namespaceObject, "Upload", function () {
        return upload;
      }); // EXTERNAL MODULE: ./node_modules/babel-runtime/core-js/object/assign.js


      var object_assign = __webpack_require__(11);

      var assign_default =
      /*#__PURE__*/
      __webpack_require__.n(object_assign); // EXTERNAL MODULE: ./src/scss/buefy-build.scss


      var buefy_build = __webpack_require__(77);

      var buefy_build_default =
      /*#__PURE__*/
      __webpack_require__.n(buefy_build); // EXTERNAL MODULE: ./src/components/autocomplete/Autocomplete.vue


      var Autocomplete = __webpack_require__(52);

      var Autocomplete_default =
      /*#__PURE__*/
      __webpack_require__.n(Autocomplete); // CONCATENATED MODULE: ./src/utils/plugins.js


      var use = function use(plugin) {
        if (typeof window !== 'undefined' && window.Vue) {
          window.Vue.use(plugin);
        }
      };

      var registerComponent = function registerComponent(Vue, component) {
        Vue.component(component.name, component);
      };

      var registerComponentProgrammatic = function registerComponentProgrammatic(Vue, property, component) {
        Vue.prototype[property] = component;
      }; // CONCATENATED MODULE: ./src/components/autocomplete/index.js


      var Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Autocomplete_default.a);
        }
      };
      use(Plugin);
      /* harmony default export */

      var autocomplete = Plugin; // EXTERNAL MODULE: ./src/components/button/Button.vue

      var Button = __webpack_require__(110);

      var Button_default =
      /*#__PURE__*/
      __webpack_require__.n(Button); // CONCATENATED MODULE: ./src/components/button/index.js


      var button_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Button_default.a);
        }
      };
      use(button_Plugin);
      /* harmony default export */

      var components_button = button_Plugin; // EXTERNAL MODULE: ./src/components/checkbox/Checkbox.vue

      var Checkbox = __webpack_require__(61);

      var Checkbox_default =
      /*#__PURE__*/
      __webpack_require__.n(Checkbox); // EXTERNAL MODULE: ./src/components/checkbox/CheckboxButton.vue


      var CheckboxButton = __webpack_require__(115);

      var CheckboxButton_default =
      /*#__PURE__*/
      __webpack_require__.n(CheckboxButton); // CONCATENATED MODULE: ./src/components/checkbox/index.js


      var checkbox_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Checkbox_default.a);
          registerComponent(Vue, CheckboxButton_default.a);
        }
      };
      use(checkbox_Plugin);
      /* harmony default export */

      var components_checkbox = checkbox_Plugin; // EXTERNAL MODULE: ./src/components/collapse/Collapse.vue

      var Collapse = __webpack_require__(118);

      var Collapse_default =
      /*#__PURE__*/
      __webpack_require__.n(Collapse); // CONCATENATED MODULE: ./src/components/collapse/index.js


      var collapse_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Collapse_default.a);
        }
      };
      use(collapse_Plugin);
      /* harmony default export */

      var collapse = collapse_Plugin; // EXTERNAL MODULE: ./src/components/clockpicker/Clockpicker.vue

      var Clockpicker = __webpack_require__(121);

      var Clockpicker_default =
      /*#__PURE__*/
      __webpack_require__.n(Clockpicker); // CONCATENATED MODULE: ./src/components/clockpicker/index.js


      var clockpicker_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Clockpicker_default.a);
        }
      };
      use(clockpicker_Plugin);
      /* harmony default export */

      var clockpicker = clockpicker_Plugin; // EXTERNAL MODULE: ./src/components/datepicker/Datepicker.vue

      var Datepicker = __webpack_require__(135);

      var Datepicker_default =
      /*#__PURE__*/
      __webpack_require__.n(Datepicker); // CONCATENATED MODULE: ./src/components/datepicker/index.js


      var datepicker_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Datepicker_default.a);
        }
      };
      use(datepicker_Plugin);
      /* harmony default export */

      var datepicker = datepicker_Plugin; // EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","amd":"vue","root":"Vue"}

      var external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue__ = __webpack_require__(18);

      var external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default =
      /*#__PURE__*/
      __webpack_require__.n(external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue__); // EXTERNAL MODULE: ./src/components/dialog/Dialog.vue


      var Dialog = __webpack_require__(149);

      var Dialog_default =
      /*#__PURE__*/
      __webpack_require__.n(Dialog); // CONCATENATED MODULE: ./src/components/dialog/index.js


      function dialog_open(propsData) {
        var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default.a;
        var DialogComponent = vm.extend(Dialog_default.a);
        return new DialogComponent({
          el: document.createElement('div'),
          propsData: propsData
        });
      }

      var DialogProgrammatic = {
        alert: function alert(params) {
          var message = void 0;
          if (typeof params === 'string') message = params;
          var defaultParam = {
            canCancel: false,
            message: message
          };
          var propsData = assign_default()(defaultParam, params);
          return dialog_open(propsData);
        },
        confirm: function confirm(params) {
          var defaultParam = {};
          var propsData = assign_default()(defaultParam, params);
          return dialog_open(propsData);
        },
        prompt: function prompt(params) {
          var defaultParam = {
            hasInput: true,
            confirmText: 'Done'
          };
          var propsData = assign_default()(defaultParam, params);
          return dialog_open(propsData);
        }
      };
      var dialog_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Dialog_default.a);
          registerComponentProgrammatic(Vue, '$dialog', DialogProgrammatic);
        }
      };
      use(dialog_Plugin);
      /* harmony default export */

      var dialog = dialog_Plugin; // EXTERNAL MODULE: ./src/components/dropdown/Dropdown.vue

      var Dropdown = __webpack_require__(28);

      var Dropdown_default =
      /*#__PURE__*/
      __webpack_require__.n(Dropdown); // EXTERNAL MODULE: ./src/components/dropdown/DropdownItem.vue


      var DropdownItem = __webpack_require__(29);

      var DropdownItem_default =
      /*#__PURE__*/
      __webpack_require__.n(DropdownItem); // CONCATENATED MODULE: ./src/components/dropdown/index.js


      var dropdown_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Dropdown_default.a);
          registerComponent(Vue, DropdownItem_default.a);
        }
      };
      use(dropdown_Plugin);
      /* harmony default export */

      var dropdown = dropdown_Plugin; // EXTERNAL MODULE: ./src/components/field/Field.vue

      var Field = __webpack_require__(30);

      var Field_default =
      /*#__PURE__*/
      __webpack_require__.n(Field); // CONCATENATED MODULE: ./src/components/field/index.js


      var field_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Field_default.a);
        }
      };
      use(field_Plugin);
      /* harmony default export */

      var field = field_Plugin; // EXTERNAL MODULE: ./src/components/icon/Icon.vue

      var Icon = __webpack_require__(3);

      var Icon_default =
      /*#__PURE__*/
      __webpack_require__.n(Icon); // CONCATENATED MODULE: ./src/components/icon/index.js


      var icon_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Icon_default.a);
        }
      };
      use(icon_Plugin);
      /* harmony default export */

      var icon = icon_Plugin; // EXTERNAL MODULE: ./src/components/input/Input.vue

      var Input = __webpack_require__(17);

      var Input_default =
      /*#__PURE__*/
      __webpack_require__.n(Input); // CONCATENATED MODULE: ./src/components/input/index.js


      var input_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Input_default.a);
        }
      };
      use(input_Plugin);
      /* harmony default export */

      var input = input_Plugin; // EXTERNAL MODULE: ./src/components/loading/Loading.vue

      var Loading = __webpack_require__(154);

      var Loading_default =
      /*#__PURE__*/
      __webpack_require__.n(Loading); // CONCATENATED MODULE: ./src/components/loading/index.js


      var LoadingProgrammatic = {
        open: function open(params) {
          var defaultParam = {
            programmatic: true
          };
          var propsData = assign_default()(defaultParam, params);
          var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default.a;
          var LoadingComponent = vm.extend(Loading_default.a);
          return new LoadingComponent({
            el: document.createElement('div'),
            propsData: propsData
          });
        }
      };
      var loading_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Loading_default.a);
          registerComponentProgrammatic(Vue, '$loading', LoadingProgrammatic);
        }
      };
      use(loading_Plugin);
      /* harmony default export */

      var loading = loading_Plugin; // EXTERNAL MODULE: ./src/components/menu/Menu.vue

      var Menu = __webpack_require__(157);

      var Menu_default =
      /*#__PURE__*/
      __webpack_require__.n(Menu); // EXTERNAL MODULE: ./src/components/menu/MenuList.vue


      var MenuList = __webpack_require__(160);

      var MenuList_default =
      /*#__PURE__*/
      __webpack_require__.n(MenuList); // EXTERNAL MODULE: ./src/components/menu/MenuItem.vue


      var MenuItem = __webpack_require__(162);

      var MenuItem_default =
      /*#__PURE__*/
      __webpack_require__.n(MenuItem); // CONCATENATED MODULE: ./src/components/menu/index.js


      var menu_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Menu_default.a);
          registerComponent(Vue, MenuList_default.a);
          registerComponent(Vue, MenuItem_default.a);
        }
      };
      use(menu_Plugin);
      /* harmony default export */

      var menu = menu_Plugin; // EXTERNAL MODULE: ./src/components/message/Message.vue

      var Message = __webpack_require__(165);

      var Message_default =
      /*#__PURE__*/
      __webpack_require__.n(Message); // CONCATENATED MODULE: ./src/components/message/index.js


      var message_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Message_default.a);
        }
      };
      use(message_Plugin);
      /* harmony default export */

      var components_message = message_Plugin; // EXTERNAL MODULE: ./src/components/modal/Modal.vue

      var Modal = __webpack_require__(63);

      var Modal_default =
      /*#__PURE__*/
      __webpack_require__.n(Modal); // CONCATENATED MODULE: ./src/components/modal/index.js


      var ModalProgrammatic = {
        open: function open(params) {
          var content = void 0;
          var parent = void 0;
          if (typeof params === 'string') content = params;
          var defaultParam = {
            programmatic: true,
            content: content
          };

          if (params.parent) {
            parent = params.parent;
            delete params.parent;
          }

          var propsData = assign_default()(defaultParam, params);
          var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default.a;
          var ModalComponent = vm.extend(Modal_default.a);
          return new ModalComponent({
            parent: parent,
            el: document.createElement('div'),
            propsData: propsData
          });
        }
      };
      var modal_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Modal_default.a);
          registerComponentProgrammatic(Vue, '$modal', ModalProgrammatic);
        }
      };
      use(modal_Plugin);
      /* harmony default export */

      var modal = modal_Plugin; // EXTERNAL MODULE: ./src/components/notification/Notification.vue

      var Notification = __webpack_require__(168);

      var Notification_default =
      /*#__PURE__*/
      __webpack_require__.n(Notification); // EXTERNAL MODULE: ./src/components/notification/NotificationNotice.vue


      var NotificationNotice = __webpack_require__(171);

      var NotificationNotice_default =
      /*#__PURE__*/
      __webpack_require__.n(NotificationNotice); // EXTERNAL MODULE: ./src/utils/config.js


      var config = __webpack_require__(2); // CONCATENATED MODULE: ./src/components/notification/index.js


      var NotificationProgrammatic = {
        open: function open(params) {
          var message = void 0;
          var parent = void 0;
          if (typeof params === 'string') message = params;
          var defaultParam = {
            message: message,
            position: config["a"
            /* default */
            ].defaultNotificationPosition || 'is-top-right'
          };

          if (params.parent) {
            parent = params.parent;
            delete params.parent;
          }

          var propsData = assign_default()(defaultParam, typeof params === 'string' ? {} : params);
          var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default.a;
          var NotificationNoticeComponent = vm.extend(NotificationNotice_default.a);
          return new NotificationNoticeComponent({
            parent: parent,
            el: document.createElement('div'),
            propsData: propsData
          });
        }
      };
      var notification_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Notification_default.a);
          registerComponentProgrammatic(Vue, '$notification', NotificationProgrammatic);
        }
      };
      use(notification_Plugin);
      /* harmony default export */

      var notification = notification_Plugin; // EXTERNAL MODULE: ./src/components/numberinput/Numberinput.vue

      var Numberinput = __webpack_require__(174);

      var Numberinput_default =
      /*#__PURE__*/
      __webpack_require__.n(Numberinput); // CONCATENATED MODULE: ./src/components/numberinput/index.js


      var numberinput_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Numberinput_default.a);
        }
      };
      use(numberinput_Plugin);
      /* harmony default export */

      var numberinput = numberinput_Plugin; // EXTERNAL MODULE: ./src/components/pagination/Pagination.vue

      var Pagination = __webpack_require__(66);

      var Pagination_default =
      /*#__PURE__*/
      __webpack_require__.n(Pagination); // CONCATENATED MODULE: ./src/components/pagination/index.js


      var pagination_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Pagination_default.a);
        }
      };
      use(pagination_Plugin);
      /* harmony default export */

      var pagination = pagination_Plugin; // EXTERNAL MODULE: ./src/components/radio/Radio.vue

      var Radio = __webpack_require__(179);

      var Radio_default =
      /*#__PURE__*/
      __webpack_require__.n(Radio); // EXTERNAL MODULE: ./src/components/radio/RadioButton.vue


      var RadioButton = __webpack_require__(182);

      var RadioButton_default =
      /*#__PURE__*/
      __webpack_require__.n(RadioButton); // CONCATENATED MODULE: ./src/components/radio/index.js


      var radio_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Radio_default.a);
          registerComponent(Vue, RadioButton_default.a);
        }
      };
      use(radio_Plugin);
      /* harmony default export */

      var components_radio = radio_Plugin; // EXTERNAL MODULE: ./src/components/select/Select.vue

      var Select = __webpack_require__(31);

      var Select_default =
      /*#__PURE__*/
      __webpack_require__.n(Select); // CONCATENATED MODULE: ./src/components/select/index.js


      var select_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Select_default.a);
        }
      };
      use(select_Plugin);
      /* harmony default export */

      var components_select = select_Plugin; // EXTERNAL MODULE: ./src/components/snackbar/Snackbar.vue

      var Snackbar = __webpack_require__(185);

      var Snackbar_default =
      /*#__PURE__*/
      __webpack_require__.n(Snackbar); // CONCATENATED MODULE: ./src/components/snackbar/index.js


      var SnackbarProgrammatic = {
        open: function open(params) {
          var message = void 0;
          var parent = void 0;
          if (typeof params === 'string') message = params;
          var defaultParam = {
            type: 'is-success',
            position: config["a"
            /* default */
            ].defaultSnackbarPosition || 'is-bottom-right',
            message: message
          };

          if (params.parent) {
            parent = params.parent;
            delete params.parent;
          }

          var propsData = assign_default()(defaultParam, params);
          var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default.a;
          var SnackbarComponent = vm.extend(Snackbar_default.a);
          return new SnackbarComponent({
            parent: parent,
            el: document.createElement('div'),
            propsData: propsData
          });
        }
      };
      var snackbar_Plugin = {
        install: function install(Vue) {
          registerComponentProgrammatic(Vue, '$snackbar', SnackbarProgrammatic);
        }
      };
      use(snackbar_Plugin);
      /* harmony default export */

      var snackbar = snackbar_Plugin; // EXTERNAL MODULE: ./src/components/steps/Steps.vue

      var Steps = __webpack_require__(188);

      var Steps_default =
      /*#__PURE__*/
      __webpack_require__.n(Steps); // EXTERNAL MODULE: ./src/components/steps/StepItem.vue


      var StepItem = __webpack_require__(191);

      var StepItem_default =
      /*#__PURE__*/
      __webpack_require__.n(StepItem); // CONCATENATED MODULE: ./src/components/steps/index.js


      var steps_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Steps_default.a);
          registerComponent(Vue, StepItem_default.a);
        }
      };
      use(steps_Plugin);
      /* harmony default export */

      var steps = steps_Plugin; // EXTERNAL MODULE: ./src/components/switch/Switch.vue

      var Switch = __webpack_require__(193);

      var Switch_default =
      /*#__PURE__*/
      __webpack_require__.n(Switch); // CONCATENATED MODULE: ./src/components/switch/index.js


      var switch_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Switch_default.a);
        }
      };
      use(switch_Plugin);
      /* harmony default export */

      var components_switch = switch_Plugin; // EXTERNAL MODULE: ./src/components/table/Table.vue

      var Table = __webpack_require__(196);

      var Table_default =
      /*#__PURE__*/
      __webpack_require__.n(Table); // EXTERNAL MODULE: ./src/components/table/TableColumn.vue


      var TableColumn = __webpack_require__(68);

      var TableColumn_default =
      /*#__PURE__*/
      __webpack_require__.n(TableColumn); // CONCATENATED MODULE: ./src/components/table/index.js


      var table_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Table_default.a);
          registerComponent(Vue, TableColumn_default.a);
        }
      };
      use(table_Plugin);
      /* harmony default export */

      var table = table_Plugin; // EXTERNAL MODULE: ./src/components/tabs/Tabs.vue

      var Tabs = __webpack_require__(212);

      var Tabs_default =
      /*#__PURE__*/
      __webpack_require__.n(Tabs); // EXTERNAL MODULE: ./src/components/tabs/TabItem.vue


      var TabItem = __webpack_require__(215);

      var TabItem_default =
      /*#__PURE__*/
      __webpack_require__.n(TabItem); // CONCATENATED MODULE: ./src/components/tabs/index.js


      var tabs_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Tabs_default.a);
          registerComponent(Vue, TabItem_default.a);
        }
      };
      use(tabs_Plugin);
      /* harmony default export */

      var tabs = tabs_Plugin; // EXTERNAL MODULE: ./src/components/tag/Tag.vue

      var Tag = __webpack_require__(69);

      var Tag_default =
      /*#__PURE__*/
      __webpack_require__.n(Tag); // EXTERNAL MODULE: ./src/components/tag/Taglist.vue


      var Taglist = __webpack_require__(219);

      var Taglist_default =
      /*#__PURE__*/
      __webpack_require__.n(Taglist); // CONCATENATED MODULE: ./src/components/tag/index.js


      var tag_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Tag_default.a);
          registerComponent(Vue, Taglist_default.a);
        }
      };
      use(tag_Plugin);
      /* harmony default export */

      var tag = tag_Plugin; // EXTERNAL MODULE: ./src/components/taginput/Taginput.vue

      var Taginput = __webpack_require__(222);

      var Taginput_default =
      /*#__PURE__*/
      __webpack_require__.n(Taginput); // CONCATENATED MODULE: ./src/components/taginput/index.js


      var taginput_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Taginput_default.a);
        }
      };
      use(taginput_Plugin);
      /* harmony default export */

      var taginput = taginput_Plugin; // EXTERNAL MODULE: ./src/components/timepicker/Timepicker.vue

      var Timepicker = __webpack_require__(225);

      var Timepicker_default =
      /*#__PURE__*/
      __webpack_require__.n(Timepicker); // CONCATENATED MODULE: ./src/components/timepicker/index.js


      var timepicker_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Timepicker_default.a);
        }
      };
      use(timepicker_Plugin);
      /* harmony default export */

      var timepicker = timepicker_Plugin; // EXTERNAL MODULE: ./src/components/toast/Toast.vue

      var Toast = __webpack_require__(228);

      var Toast_default =
      /*#__PURE__*/
      __webpack_require__.n(Toast); // CONCATENATED MODULE: ./src/components/toast/index.js


      var ToastProgrammatic = {
        open: function open(params) {
          var message = void 0;
          var parent = void 0;
          if (typeof params === 'string') message = params;
          var defaultParam = {
            message: message,
            position: config["a"
            /* default */
            ].defaultToastPosition || 'is-top'
          };

          if (params.parent) {
            parent = params.parent;
            delete params.parent;
          }

          var propsData = assign_default()(defaultParam, params);
          var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : external___commonjs___vue___commonjs2___vue___amd___vue___root___Vue___default.a;
          var ToastComponent = vm.extend(Toast_default.a);
          return new ToastComponent({
            parent: parent,
            el: document.createElement('div'),
            propsData: propsData
          });
        }
      };
      var toast_Plugin = {
        install: function install(Vue) {
          registerComponentProgrammatic(Vue, '$toast', ToastProgrammatic);
        }
      };
      use(toast_Plugin);
      /* harmony default export */

      var toast = toast_Plugin; // EXTERNAL MODULE: ./src/components/tooltip/Tooltip.vue

      var Tooltip = __webpack_require__(231);

      var Tooltip_default =
      /*#__PURE__*/
      __webpack_require__.n(Tooltip); // CONCATENATED MODULE: ./src/components/tooltip/index.js


      var tooltip_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Tooltip_default.a);
        }
      };
      use(tooltip_Plugin);
      /* harmony default export */

      var tooltip = tooltip_Plugin; // EXTERNAL MODULE: ./src/components/upload/Upload.vue

      var Upload = __webpack_require__(234);

      var Upload_default =
      /*#__PURE__*/
      __webpack_require__.n(Upload); // CONCATENATED MODULE: ./src/components/upload/index.js


      var upload_Plugin = {
        install: function install(Vue) {
          registerComponent(Vue, Upload_default.a);
        }
      };
      use(upload_Plugin);
      /* harmony default export */

      var upload = upload_Plugin; // CONCATENATED MODULE: ./src/components/index.js
      // CONCATENATED MODULE: ./src/index.js

      var Buefy = {
        install: function install(Vue) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}; // Options

          Object(config["b"
          /* setOptions */
          ])(assign_default()(config["a"
          /* default */
          ], options)); // Components

          for (var componentKey in components_namespaceObject) {
            Vue.use(components_namespaceObject[componentKey]);
          } // Config component


          var BuefyProgrammatic = {
            setOptions: function setOptions(options) {
              Object(config["b"
              /* setOptions */
              ])(assign_default()(config["a"
              /* default */
              ], options));
            }
          };
          registerComponentProgrammatic(Vue, '$buefy', BuefyProgrammatic);
        }
      };
      use(Buefy);
      /* harmony default export */

      var src = __webpack_exports__["default"] = Buefy;
      /***/
    },
    /* 71 */

    /***/
    function (module, exports, __webpack_require__) {
      __webpack_require__(72);

      module.exports = __webpack_require__(6).Object.assign;
      /***/
    },
    /* 72 */

    /***/
    function (module, exports, __webpack_require__) {
      // 19.1.3.1 Object.assign(target, source)
      var $export = __webpack_require__(19);

      $export($export.S + $export.F, 'Object', {
        assign: __webpack_require__(74)
      });
      /***/
    },
    /* 73 */

    /***/
    function (module, exports) {
      module.exports = function (it) {
        if (typeof it != 'function') throw TypeError(it + ' is not a function!');
        return it;
      };
      /***/

    },
    /* 74 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict"; // 19.1.2.1 Object.assign(target, source, ...)

      var getKeys = __webpack_require__(24);

      var gOPS = __webpack_require__(39);

      var pIE = __webpack_require__(27);

      var toObject = __webpack_require__(40);

      var IObject = __webpack_require__(50);

      var $assign = Object.assign; // should work with symbols and should have deterministic property order (V8 bug)

      module.exports = !$assign || __webpack_require__(21)(function () {
        var A = {};
        var B = {}; // eslint-disable-next-line no-undef

        var S = Symbol();
        var K = 'abcdefghijklmnopqrst';
        A[S] = 7;
        K.split('').forEach(function (k) {
          B[k] = k;
        });
        return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
      }) ? function assign(target, source) {
        // eslint-disable-line no-unused-vars
        var T = toObject(target);
        var aLen = arguments.length;
        var index = 1;
        var getSymbols = gOPS.f;
        var isEnum = pIE.f;

        while (aLen > index) {
          var S = IObject(arguments[index++]);
          var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
          var length = keys.length;
          var j = 0;
          var key;

          while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
        }

        return T;
      } : $assign;
      /***/
    },
    /* 75 */

    /***/
    function (module, exports, __webpack_require__) {
      // false -> Array#indexOf
      // true  -> Array#includes
      var toIObject = __webpack_require__(16);

      var toLength = __webpack_require__(51);

      var toAbsoluteIndex = __webpack_require__(76);

      module.exports = function (IS_INCLUDES) {
        return function ($this, el, fromIndex) {
          var O = toIObject($this);
          var length = toLength(O.length);
          var index = toAbsoluteIndex(fromIndex, length);
          var value; // Array#includes uses SameValueZero equality algorithm
          // eslint-disable-next-line no-self-compare

          if (IS_INCLUDES && el != el) while (length > index) {
            value = O[index++]; // eslint-disable-next-line no-self-compare

            if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
          } else for (; length > index; index++) if (IS_INCLUDES || index in O) {
            if (O[index] === el) return IS_INCLUDES || index || 0;
          }
          return !IS_INCLUDES && -1;
        };
      };
      /***/

    },
    /* 76 */

    /***/
    function (module, exports, __webpack_require__) {
      var toInteger = __webpack_require__(35);

      var max = Math.max;
      var min = Math.min;

      module.exports = function (index, length) {
        index = toInteger(index);
        return index < 0 ? max(index + length, 0) : min(index, length);
      };
      /***/

    },
    /* 77 */

    /***/
    function (module, exports) {// removed by extract-text-webpack-plugin

      /***/
    },
    /* 78 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(53);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__ = __webpack_require__(59);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__utils_helpers__ = __webpack_require__(7);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__utils_FormElementMixin__ = __webpack_require__(10);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_5__input_Input__ = __webpack_require__(17);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_5__input_Input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__input_Input__); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BAutocomplete',
        components: __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_5__input_Input___default.a.name, __WEBPACK_IMPORTED_MODULE_5__input_Input___default.a),
        mixins: [__WEBPACK_IMPORTED_MODULE_4__utils_FormElementMixin__["a"
        /* default */
        ]],
        inheritAttrs: false,
        props: {
          value: [Number, String],
          data: {
            type: Array,
            default: function _default() {
              return [];
            }
          },
          field: {
            type: String,
            default: 'value'
          },
          keepFirst: Boolean,
          clearOnSelect: Boolean,
          openOnFocus: Boolean,
          customFormatter: Function
        },
        data: function data() {
          return {
            selected: null,
            hovered: null,
            isActive: false,
            newValue: this.value,
            newAutocomplete: this.autocomplete || 'off',
            isListInViewportVertically: true,
            hasFocus: false,
            _isAutocomplete: true,
            _elementRef: 'input'
          };
        },
        computed: {
          /**
           * White-listed items to not close when clicked.
           * Add input, dropdown and all children.
           */
          whiteList: function whiteList() {
            var whiteList = [];
            whiteList.push(this.$refs.input.$el.querySelector('input'));
            whiteList.push(this.$refs.dropdown); // Add all chidren from dropdown

            if (this.$refs.dropdown !== undefined) {
              var children = this.$refs.dropdown.querySelectorAll('*');
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default()(children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var child = _step.value;
                  whiteList.push(child);
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            }

            return whiteList;
          },

          /**
           * Check if exists default slot
           */
          hasDefaultSlot: function hasDefaultSlot() {
            return !!this.$scopedSlots.default;
          },

          /**
           * Check if exists "empty" slot
           */
          hasEmptySlot: function hasEmptySlot() {
            return !!this.$slots.empty;
          },

          /**
           * Check if exists "header" slot
           */
          hasHeaderSlot: function hasHeaderSlot() {
            return !!this.$slots.header;
          },

          /**
           * Check if exists "footer" slot
           */
          hasFooterSlot: function hasFooterSlot() {
            return !!this.$slots.footer;
          }
        },
        watch: {
          /**
           * When dropdown is toggled, check the visibility to know when
           * to open upwards.
           */
          isActive: function isActive(active) {
            var _this = this;

            if (active) {
              this.calcDropdownInViewportVertical();
            } else {
              this.$nextTick(function () {
                return _this.setHovered(null);
              }); // Timeout to wait for the animation to finish before recalculating

              setTimeout(function () {
                _this.calcDropdownInViewportVertical();
              }, 100);
            }
          },

          /**
           * When updating input's value
           *   1. Emit changes
           *   2. If value isn't the same as selected, set null
           *   3. Close dropdown if value is clear or else open it
           */
          newValue: function newValue(value) {
            this.$emit('input', value); // Check if selected is invalid

            var currentValue = this.getValue(this.selected);

            if (currentValue && currentValue !== value) {
              this.setSelected(null, false);
            } // Close dropdown if input is clear or else open it


            if (this.hasFocus && (!this.openOnFocus || value)) {
              this.isActive = !!value;
            }
          },

          /**
           * When v-model is changed:
           *   1. Update internal value.
           *   2. If it's invalid, validate again.
           */
          value: function value(_value) {
            this.newValue = _value;
            !this.isValid && this.$refs.input.checkHtml5Validity();
          },

          /**
           * Select first option if "keep-first
           */
          data: function data(value) {
            // Keep first option always pre-selected
            if (this.keepFirst) {
              this.selectFirstOption(value);
            }
          }
        },
        methods: {
          /**
           * Set which option is currently hovered.
           */
          setHovered: function setHovered(option) {
            if (option === undefined) return;
            this.hovered = option;
          },

          /**
           * Set which option is currently selected, update v-model,
           * update input value and close dropdown.
           */
          setSelected: function setSelected(option) {
            var _this2 = this;

            var closeDropdown = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
            if (option === undefined) return;
            this.selected = option;
            this.$emit('select', this.selected);

            if (this.selected !== null) {
              this.newValue = this.clearOnSelect ? '' : this.getValue(this.selected);
            }

            closeDropdown && this.$nextTick(function () {
              _this2.isActive = false;
            });
          },

          /**
           * Select first option
           */
          selectFirstOption: function selectFirstOption(options) {
            var _this3 = this;

            this.$nextTick(function () {
              if (options.length) {
                // If has visible data or open on focus, keep updating the hovered
                if (_this3.openOnFocus || _this3.newValue !== '' && _this3.hovered !== options[0]) {
                  _this3.setHovered(options[0]);
                }
              } else {
                _this3.setHovered(null);
              }
            });
          },

          /**
           * Enter key listener.
           * Select the hovered option.
           */
          enterPressed: function enterPressed() {
            if (this.hovered === null) return;
            this.setSelected(this.hovered);
          },

          /**
           * Tab key listener.
           * Select hovered option if it exists, close dropdown, then allow
           * native handling to move to next tabbable element.
           */
          tabPressed: function tabPressed() {
            if (this.hovered === null) {
              this.isActive = false;
              return;
            }

            this.setSelected(this.hovered);
          },

          /**
           * Close dropdown if clicked outside.
           */
          clickedOutside: function clickedOutside(event) {
            if (this.whiteList.indexOf(event.target) < 0) this.isActive = false;
          },

          /**
           * Return display text for the input.
           * If object, get value from path, or else just the value.
           */
          getValue: function getValue(option) {
            if (!option) return;

            if (typeof this.customFormatter !== 'undefined') {
              return this.customFormatter(option);
            }

            return (typeof option === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(option)) === 'object' ? Object(__WEBPACK_IMPORTED_MODULE_3__utils_helpers__["a"
            /* getValueByPath */
            ])(option, this.field) : option;
          },

          /**
           * Calculate if the dropdown is vertically visible when activated,
           * otherwise it is openened upwards.
           */
          calcDropdownInViewportVertical: function calcDropdownInViewportVertical() {
            var _this4 = this;

            this.$nextTick(function () {
              /**
              * this.$refs.dropdown may be undefined
              * when Autocomplete is conditional rendered
              */
              if (_this4.$refs.dropdown === undefined) return;

              var rect = _this4.$refs.dropdown.getBoundingClientRect();

              _this4.isListInViewportVertically = rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
            });
          },

          /**
           * Arrows keys listener.
           * If dropdown is active, set hovered option, or else just open.
           */
          keyArrows: function keyArrows(direction) {
            var sum = direction === 'down' ? 1 : -1;

            if (this.isActive) {
              var index = this.data.indexOf(this.hovered) + sum;
              index = index > this.data.length - 1 ? this.data.length : index;
              index = index < 0 ? 0 : index;
              this.setHovered(this.data[index]);
              var list = this.$refs.dropdown.querySelector('.dropdown-content');
              var element = list.querySelectorAll('a.dropdown-item:not(.is-disabled)')[index];
              if (!element) return;
              var visMin = list.scrollTop;
              var visMax = list.scrollTop + list.clientHeight - element.clientHeight;

              if (element.offsetTop < visMin) {
                list.scrollTop = element.offsetTop;
              } else if (element.offsetTop >= visMax) {
                list.scrollTop = element.offsetTop - list.clientHeight + element.clientHeight;
              }
            } else {
              this.isActive = true;
            }
          },

          /**
           * Focus listener.
           * If value is the same as selected, select all text.
           */
          focused: function focused(event) {
            if (this.getValue(this.selected) === this.newValue) {
              this.$el.querySelector('input').select();
            }

            if (this.openOnFocus) {
              this.isActive = true;

              if (this.keepFirst) {
                this.selectFirstOption(this.data);
              }
            }

            this.hasFocus = true;
            this.$emit('focus', event);
          },

          /**
          * Blur listener.
          */
          onBlur: function onBlur(event) {
            this.hasFocus = false;
            this.$emit('blur', event);
          },
          onInput: function onInput(event) {
            var currentValue = this.getValue(this.selected);
            if (currentValue && currentValue === this.newValue) return;
            this.$emit('typing', this.newValue);
          }
        },
        created: function created() {
          if (typeof window !== 'undefined') {
            document.addEventListener('click', this.clickedOutside);
            window.addEventListener('resize', this.calcDropdownInViewportVertical);
          }
        },
        beforeDestroy: function beforeDestroy() {
          if (typeof window !== 'undefined') {
            document.removeEventListener('click', this.clickedOutside);
            window.removeEventListener('resize', this.calcDropdownInViewportVertical);
          }
        }
      };
      /***/
    },
    /* 79 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(80),
        __esModule: true
      };
      /***/
    },
    /* 80 */

    /***/
    function (module, exports, __webpack_require__) {
      __webpack_require__(41);

      __webpack_require__(57);

      module.exports = __webpack_require__(43).f('iterator');
      /***/
    },
    /* 81 */

    /***/
    function (module, exports, __webpack_require__) {
      var toInteger = __webpack_require__(35);

      var defined = __webpack_require__(34); // true  -> String#at
      // false -> String#codePointAt


      module.exports = function (TO_STRING) {
        return function (that, pos) {
          var s = String(defined(that));
          var i = toInteger(pos);
          var l = s.length;
          var a, b;
          if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
          a = s.charCodeAt(i);
          return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
        };
      };
      /***/

    },
    /* 82 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      var create = __webpack_require__(56);

      var descriptor = __webpack_require__(22);

      var setToStringTag = __webpack_require__(42);

      var IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

      __webpack_require__(14)(IteratorPrototype, __webpack_require__(4)('iterator'), function () {
        return this;
      });

      module.exports = function (Constructor, NAME, next) {
        Constructor.prototype = create(IteratorPrototype, {
          next: descriptor(1, next)
        });
        setToStringTag(Constructor, NAME + ' Iterator');
      };
      /***/

    },
    /* 83 */

    /***/
    function (module, exports, __webpack_require__) {
      var dP = __webpack_require__(9);

      var anObject = __webpack_require__(15);

      var getKeys = __webpack_require__(24);

      module.exports = __webpack_require__(12) ? Object.defineProperties : function defineProperties(O, Properties) {
        anObject(O);
        var keys = getKeys(Properties);
        var length = keys.length;
        var i = 0;
        var P;

        while (length > i) dP.f(O, P = keys[i++], Properties[P]);

        return O;
      };
      /***/
    },
    /* 84 */

    /***/
    function (module, exports, __webpack_require__) {
      var document = __webpack_require__(8).document;

      module.exports = document && document.documentElement;
      /***/
    },
    /* 85 */

    /***/
    function (module, exports, __webpack_require__) {
      // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
      var has = __webpack_require__(13);

      var toObject = __webpack_require__(40);

      var IE_PROTO = __webpack_require__(36)('IE_PROTO');

      var ObjectProto = Object.prototype;

      module.exports = Object.getPrototypeOf || function (O) {
        O = toObject(O);
        if (has(O, IE_PROTO)) return O[IE_PROTO];

        if (typeof O.constructor == 'function' && O instanceof O.constructor) {
          return O.constructor.prototype;
        }

        return O instanceof Object ? ObjectProto : null;
      };
      /***/

    },
    /* 86 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      var addToUnscopables = __webpack_require__(87);

      var step = __webpack_require__(88);

      var Iterators = __webpack_require__(23);

      var toIObject = __webpack_require__(16); // 22.1.3.4 Array.prototype.entries()
      // 22.1.3.13 Array.prototype.keys()
      // 22.1.3.29 Array.prototype.values()
      // 22.1.3.30 Array.prototype[@@iterator]()


      module.exports = __webpack_require__(54)(Array, 'Array', function (iterated, kind) {
        this._t = toIObject(iterated); // target

        this._i = 0; // next index

        this._k = kind; // kind
        // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
      }, function () {
        var O = this._t;
        var kind = this._k;
        var index = this._i++;

        if (!O || index >= O.length) {
          this._t = undefined;
          return step(1);
        }

        if (kind == 'keys') return step(0, index);
        if (kind == 'values') return step(0, O[index]);
        return step(0, [index, O[index]]);
      }, 'values'); // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)

      Iterators.Arguments = Iterators.Array;
      addToUnscopables('keys');
      addToUnscopables('values');
      addToUnscopables('entries');
      /***/
    },
    /* 87 */

    /***/
    function (module, exports) {
      module.exports = function () {
        /* empty */
      };
      /***/

    },
    /* 88 */

    /***/
    function (module, exports) {
      module.exports = function (done, value) {
        return {
          value: value,
          done: !!done
        };
      };
      /***/

    },
    /* 89 */

    /***/
    function (module, exports, __webpack_require__) {
      __webpack_require__(90);

      __webpack_require__(96);

      __webpack_require__(97);

      __webpack_require__(98);

      module.exports = __webpack_require__(6).Symbol;
      /***/
    },
    /* 90 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict"; // ECMAScript 6 symbols shim

      var global = __webpack_require__(8);

      var has = __webpack_require__(13);

      var DESCRIPTORS = __webpack_require__(12);

      var $export = __webpack_require__(19);

      var redefine = __webpack_require__(55);

      var META = __webpack_require__(91).KEY;

      var $fails = __webpack_require__(21);

      var shared = __webpack_require__(37);

      var setToStringTag = __webpack_require__(42);

      var uid = __webpack_require__(26);

      var wks = __webpack_require__(4);

      var wksExt = __webpack_require__(43);

      var wksDefine = __webpack_require__(44);

      var enumKeys = __webpack_require__(92);

      var isArray = __webpack_require__(93);

      var anObject = __webpack_require__(15);

      var isObject = __webpack_require__(20);

      var toIObject = __webpack_require__(16);

      var toPrimitive = __webpack_require__(32);

      var createDesc = __webpack_require__(22);

      var _create = __webpack_require__(56);

      var gOPNExt = __webpack_require__(94);

      var $GOPD = __webpack_require__(95);

      var $DP = __webpack_require__(9);

      var $keys = __webpack_require__(24);

      var gOPD = $GOPD.f;
      var dP = $DP.f;
      var gOPN = gOPNExt.f;
      var $Symbol = global.Symbol;
      var $JSON = global.JSON;

      var _stringify = $JSON && $JSON.stringify;

      var PROTOTYPE = 'prototype';
      var HIDDEN = wks('_hidden');
      var TO_PRIMITIVE = wks('toPrimitive');
      var isEnum = {}.propertyIsEnumerable;
      var SymbolRegistry = shared('symbol-registry');
      var AllSymbols = shared('symbols');
      var OPSymbols = shared('op-symbols');
      var ObjectProto = Object[PROTOTYPE];
      var USE_NATIVE = typeof $Symbol == 'function';
      var QObject = global.QObject; // Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173

      var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild; // fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687

      var setSymbolDesc = DESCRIPTORS && $fails(function () {
        return _create(dP({}, 'a', {
          get: function () {
            return dP(this, 'a', {
              value: 7
            }).a;
          }
        })).a != 7;
      }) ? function (it, key, D) {
        var protoDesc = gOPD(ObjectProto, key);
        if (protoDesc) delete ObjectProto[key];
        dP(it, key, D);
        if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
      } : dP;

      var wrap = function (tag) {
        var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);

        sym._k = tag;
        return sym;
      };

      var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
        return typeof it == 'symbol';
      } : function (it) {
        return it instanceof $Symbol;
      };

      var $defineProperty = function defineProperty(it, key, D) {
        if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
        anObject(it);
        key = toPrimitive(key, true);
        anObject(D);

        if (has(AllSymbols, key)) {
          if (!D.enumerable) {
            if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
            it[HIDDEN][key] = true;
          } else {
            if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
            D = _create(D, {
              enumerable: createDesc(0, false)
            });
          }

          return setSymbolDesc(it, key, D);
        }

        return dP(it, key, D);
      };

      var $defineProperties = function defineProperties(it, P) {
        anObject(it);
        var keys = enumKeys(P = toIObject(P));
        var i = 0;
        var l = keys.length;
        var key;

        while (l > i) $defineProperty(it, key = keys[i++], P[key]);

        return it;
      };

      var $create = function create(it, P) {
        return P === undefined ? _create(it) : $defineProperties(_create(it), P);
      };

      var $propertyIsEnumerable = function propertyIsEnumerable(key) {
        var E = isEnum.call(this, key = toPrimitive(key, true));
        if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
        return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
      };

      var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
        it = toIObject(it);
        key = toPrimitive(key, true);
        if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
        var D = gOPD(it, key);
        if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
        return D;
      };

      var $getOwnPropertyNames = function getOwnPropertyNames(it) {
        var names = gOPN(toIObject(it));
        var result = [];
        var i = 0;
        var key;

        while (names.length > i) {
          if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
        }

        return result;
      };

      var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
        var IS_OP = it === ObjectProto;
        var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
        var result = [];
        var i = 0;
        var key;

        while (names.length > i) {
          if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
        }

        return result;
      }; // 19.4.1.1 Symbol([description])


      if (!USE_NATIVE) {
        $Symbol = function Symbol() {
          if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
          var tag = uid(arguments.length > 0 ? arguments[0] : undefined);

          var $set = function (value) {
            if (this === ObjectProto) $set.call(OPSymbols, value);
            if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
            setSymbolDesc(this, tag, createDesc(1, value));
          };

          if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, {
            configurable: true,
            set: $set
          });
          return wrap(tag);
        };

        redefine($Symbol[PROTOTYPE], 'toString', function toString() {
          return this._k;
        });
        $GOPD.f = $getOwnPropertyDescriptor;
        $DP.f = $defineProperty;
        __webpack_require__(58).f = gOPNExt.f = $getOwnPropertyNames;
        __webpack_require__(27).f = $propertyIsEnumerable;
        __webpack_require__(39).f = $getOwnPropertySymbols;

        if (DESCRIPTORS && !__webpack_require__(25)) {
          redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
        }

        wksExt.f = function (name) {
          return wrap(wks(name));
        };
      }

      $export($export.G + $export.W + $export.F * !USE_NATIVE, {
        Symbol: $Symbol
      });

      for (var es6Symbols = // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
      'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) wks(es6Symbols[j++]);

      for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

      $export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
        // 19.4.2.1 Symbol.for(key)
        'for': function (key) {
          return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
        },
        // 19.4.2.5 Symbol.keyFor(sym)
        keyFor: function keyFor(sym) {
          if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');

          for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
        },
        useSetter: function () {
          setter = true;
        },
        useSimple: function () {
          setter = false;
        }
      });
      $export($export.S + $export.F * !USE_NATIVE, 'Object', {
        // 19.1.2.2 Object.create(O [, Properties])
        create: $create,
        // 19.1.2.4 Object.defineProperty(O, P, Attributes)
        defineProperty: $defineProperty,
        // 19.1.2.3 Object.defineProperties(O, Properties)
        defineProperties: $defineProperties,
        // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
        getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
        // 19.1.2.7 Object.getOwnPropertyNames(O)
        getOwnPropertyNames: $getOwnPropertyNames,
        // 19.1.2.8 Object.getOwnPropertySymbols(O)
        getOwnPropertySymbols: $getOwnPropertySymbols
      }); // 24.3.2 JSON.stringify(value [, replacer [, space]])

      $JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
        var S = $Symbol(); // MS Edge converts symbol values to JSON as {}
        // WebKit converts symbol values to JSON as null
        // V8 throws on boxed symbols

        return _stringify([S]) != '[null]' || _stringify({
          a: S
        }) != '{}' || _stringify(Object(S)) != '{}';
      })), 'JSON', {
        stringify: function stringify(it) {
          var args = [it];
          var i = 1;
          var replacer, $replacer;

          while (arguments.length > i) args.push(arguments[i++]);

          $replacer = replacer = args[1];
          if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined

          if (!isArray(replacer)) replacer = function (key, value) {
            if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
            if (!isSymbol(value)) return value;
          };
          args[1] = replacer;
          return _stringify.apply($JSON, args);
        }
      }); // 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)

      $Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(14)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf); // 19.4.3.5 Symbol.prototype[@@toStringTag]

      setToStringTag($Symbol, 'Symbol'); // 20.2.1.9 Math[@@toStringTag]

      setToStringTag(Math, 'Math', true); // 24.3.3 JSON[@@toStringTag]

      setToStringTag(global.JSON, 'JSON', true);
      /***/
    },
    /* 91 */

    /***/
    function (module, exports, __webpack_require__) {
      var META = __webpack_require__(26)('meta');

      var isObject = __webpack_require__(20);

      var has = __webpack_require__(13);

      var setDesc = __webpack_require__(9).f;

      var id = 0;

      var isExtensible = Object.isExtensible || function () {
        return true;
      };

      var FREEZE = !__webpack_require__(21)(function () {
        return isExtensible(Object.preventExtensions({}));
      });

      var setMeta = function (it) {
        setDesc(it, META, {
          value: {
            i: 'O' + ++id,
            // object ID
            w: {} // weak collections IDs

          }
        });
      };

      var fastKey = function (it, create) {
        // return primitive with prefix
        if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;

        if (!has(it, META)) {
          // can't set metadata to uncaught frozen object
          if (!isExtensible(it)) return 'F'; // not necessary to add metadata

          if (!create) return 'E'; // add missing metadata

          setMeta(it); // return object ID
        }

        return it[META].i;
      };

      var getWeak = function (it, create) {
        if (!has(it, META)) {
          // can't set metadata to uncaught frozen object
          if (!isExtensible(it)) return true; // not necessary to add metadata

          if (!create) return false; // add missing metadata

          setMeta(it); // return hash weak collections IDs
        }

        return it[META].w;
      }; // add metadata on freeze-family methods calling


      var onFreeze = function (it) {
        if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
        return it;
      };

      var meta = module.exports = {
        KEY: META,
        NEED: false,
        fastKey: fastKey,
        getWeak: getWeak,
        onFreeze: onFreeze
      };
      /***/
    },
    /* 92 */

    /***/
    function (module, exports, __webpack_require__) {
      // all enumerable object keys, includes symbols
      var getKeys = __webpack_require__(24);

      var gOPS = __webpack_require__(39);

      var pIE = __webpack_require__(27);

      module.exports = function (it) {
        var result = getKeys(it);
        var getSymbols = gOPS.f;

        if (getSymbols) {
          var symbols = getSymbols(it);
          var isEnum = pIE.f;
          var i = 0;
          var key;

          while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
        }

        return result;
      };
      /***/

    },
    /* 93 */

    /***/
    function (module, exports, __webpack_require__) {
      // 7.2.2 IsArray(argument)
      var cof = __webpack_require__(33);

      module.exports = Array.isArray || function isArray(arg) {
        return cof(arg) == 'Array';
      };
      /***/

    },
    /* 94 */

    /***/
    function (module, exports, __webpack_require__) {
      // fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
      var toIObject = __webpack_require__(16);

      var gOPN = __webpack_require__(58).f;

      var toString = {}.toString;
      var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

      var getWindowNames = function (it) {
        try {
          return gOPN(it);
        } catch (e) {
          return windowNames.slice();
        }
      };

      module.exports.f = function getOwnPropertyNames(it) {
        return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
      };
      /***/

    },
    /* 95 */

    /***/
    function (module, exports, __webpack_require__) {
      var pIE = __webpack_require__(27);

      var createDesc = __webpack_require__(22);

      var toIObject = __webpack_require__(16);

      var toPrimitive = __webpack_require__(32);

      var has = __webpack_require__(13);

      var IE8_DOM_DEFINE = __webpack_require__(47);

      var gOPD = Object.getOwnPropertyDescriptor;
      exports.f = __webpack_require__(12) ? gOPD : function getOwnPropertyDescriptor(O, P) {
        O = toIObject(O);
        P = toPrimitive(P, true);
        if (IE8_DOM_DEFINE) try {
          return gOPD(O, P);
        } catch (e) {
          /* empty */
        }
        if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
      };
      /***/
    },
    /* 96 */

    /***/
    function (module, exports) {
      /***/
    },
    /* 97 */

    /***/
    function (module, exports, __webpack_require__) {
      __webpack_require__(44)('asyncIterator');
      /***/

    },
    /* 98 */

    /***/
    function (module, exports, __webpack_require__) {
      __webpack_require__(44)('observable');
      /***/

    },
    /* 99 */

    /***/
    function (module, exports, __webpack_require__) {
      __webpack_require__(57);

      __webpack_require__(41);

      module.exports = __webpack_require__(100);
      /***/
    },
    /* 100 */

    /***/
    function (module, exports, __webpack_require__) {
      var anObject = __webpack_require__(15);

      var get = __webpack_require__(60);

      module.exports = __webpack_require__(6).getIterator = function (it) {
        var iterFn = get(it);
        if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
        return anObject(iterFn.call(it));
      };
      /***/

    },
    /* 101 */

    /***/
    function (module, exports, __webpack_require__) {
      // getting tag from 19.1.3.6 Object.prototype.toString()
      var cof = __webpack_require__(33);

      var TAG = __webpack_require__(4)('toStringTag'); // ES3 wrong here


      var ARG = cof(function () {
        return arguments;
      }()) == 'Arguments'; // fallback for IE11 Script Access Denied error

      var tryGet = function (it, key) {
        try {
          return it[key];
        } catch (e) {
          /* empty */
        }
      };

      module.exports = function (it) {
        var O, T, B;
        return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
        : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T // builtinTag case
        : ARG ? cof(O) // ES3 arguments fallback
        : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
      };
      /***/

    },
    /* 102 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(103),
        __esModule: true
      };
      /***/
    },
    /* 103 */

    /***/
    function (module, exports, __webpack_require__) {
      __webpack_require__(104);

      var $Object = __webpack_require__(6).Object;

      module.exports = function defineProperty(it, key, desc) {
        return $Object.defineProperty(it, key, desc);
      };
      /***/

    },
    /* 104 */

    /***/
    function (module, exports, __webpack_require__) {
      var $export = __webpack_require__(19); // 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)


      $export($export.S + $export.F * !__webpack_require__(12), 'Object', {
        defineProperty: __webpack_require__(9).f
      });
      /***/
    },
    /* 105 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__utils_config__ = __webpack_require__(2);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__utils_FormElementMixin__ = __webpack_require__(10); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BInput',
        components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a),
        mixins: [__WEBPACK_IMPORTED_MODULE_3__utils_FormElementMixin__["a"
        /* default */
        ]],
        inheritAttrs: false,
        props: {
          value: [Number, String],
          type: {
            type: String,
            default: 'text'
          },
          passwordReveal: Boolean,
          hasCounter: {
            type: Boolean,
            default: function _default() {
              return __WEBPACK_IMPORTED_MODULE_2__utils_config__["a"
              /* default */
              ].defaultInputHasCounter;
            }
          },
          customClass: {
            type: String,
            default: ''
          }
        },
        data: function data() {
          return {
            newValue: this.value,
            newType: this.type,
            newAutocomplete: this.autocomplete || __WEBPACK_IMPORTED_MODULE_2__utils_config__["a"
            /* default */
            ].defaultInputAutocomplete,
            isPasswordVisible: false,
            _elementRef: this.type === 'textarea' ? 'textarea' : 'input'
          };
        },
        computed: {
          computedValue: {
            get: function get() {
              return this.newValue;
            },
            set: function set(value) {
              this.newValue = value;
              this.$emit('input', value);
              !this.isValid && this.checkHtml5Validity();
            }
          },
          rootClasses: function rootClasses() {
            return [this.iconPosition, this.size, {
              'is-expanded': this.expanded,
              'is-loading': this.loading,
              'is-clearfix': !this.hasMessage
            }];
          },
          inputClasses: function inputClasses() {
            return [this.statusType, this.size, {
              'is-rounded': this.rounded
            }];
          },
          hasIconRight: function hasIconRight() {
            return this.passwordReveal || this.loading || this.statusType;
          },

          /**
          * Position of the icon or if it's both sides.
          */
          iconPosition: function iconPosition() {
            if (this.icon && this.hasIconRight) {
              return 'has-icons-left has-icons-right';
            } else if (!this.icon && this.hasIconRight) {
              return 'has-icons-right';
            } else if (this.icon) {
              return 'has-icons-left';
            }
          },

          /**
          * Icon name (MDI) based on the type.
          */
          statusTypeIcon: function statusTypeIcon() {
            switch (this.statusType) {
              case 'is-success':
                return 'check';

              case 'is-danger':
                return 'alert-circle';

              case 'is-info':
                return 'information';

              case 'is-warning':
                return 'alert';
            }
          },

          /**
          * Check if have any message prop from parent if it's a Field.
          */
          hasMessage: function hasMessage() {
            return !!this.statusMessage;
          },

          /**
          * Current password-reveal icon name.
          */
          passwordVisibleIcon: function passwordVisibleIcon() {
            return !this.isPasswordVisible ? 'eye' : 'eye-off';
          },

          /**
          * Get value length
          */
          valueLength: function valueLength() {
            if (typeof this.computedValue === 'string') {
              return this.computedValue.length;
            } else if (typeof this.computedValue === 'number') {
              return this.computedValue.toString().length;
            }

            return 0;
          }
        },
        watch: {
          /**
          * When v-model is changed:
          *   1. Set internal value.
          */
          value: function value(_value) {
            this.newValue = _value;
          }
        },
        methods: {
          /**
          * Toggle the visibility of a password-reveal input
          * by changing the type and focus the input right away.
          */
          togglePasswordVisibility: function togglePasswordVisibility() {
            var _this = this;

            this.isPasswordVisible = !this.isPasswordVisible;
            this.newType = this.isPasswordVisible ? 'text' : 'password';
            this.$nextTick(function () {
              _this.$refs.input.focus();
            });
          },

          /**
          * Input's 'input' event listener, 'nextTick' is used to prevent event firing
          * before ui update, helps when using masks (Cleavejs and potentially others).
          */
          onInput: function onInput(event) {
            var _this2 = this;

            this.$nextTick(function () {
              if (event.target) {
                _this2.computedValue = event.target.value;
              }
            });
          }
        }
      };
      /***/
    },
    /* 106 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(2); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BIcon',
        props: {
          type: [String, Object],
          pack: String,
          icon: String,
          size: String,
          customSize: String,
          customClass: String,
          both: Boolean // This is used internally to show both MDI and FA icon

        },
        computed: {
          /**
          * Internal icon name based on the pack.
          * If pack is 'fa', gets the equivalent FA icon name of the MDI,
          * internal icons are always MDI.
          */
          newIcon: function newIcon() {
            return this.newPack === 'mdi' ? this.newPack + '-' + this.icon : this.addFAPrefix(this.getEquivalentIconOf(this.icon));
          },
          newPack: function newPack() {
            return this.pack || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a"
            /* default */
            ].defaultIconPack;
          },
          newType: function newType() {
            if (!this.type) return;
            var splitType = [];

            if (typeof this.type === 'string') {
              splitType = this.type.split('-');
            } else {
              for (var key in this.type) {
                if (this.type[key]) {
                  splitType = key.split('-');
                  break;
                }
              }
            }

            if (splitType.length <= 1) return;
            return 'has-text-' + splitType[1];
          },
          newCustomSize: function newCustomSize() {
            return this.customSize || this.customSizeByPack;
          },
          customSizeByPack: function customSizeByPack() {
            var defaultSize = this.newPack === 'mdi' ? 'mdi-24px' : this.addFAPrefix('lg');
            var mediumSize = this.newPack === 'mdi' ? 'mdi-36px' : this.addFAPrefix('2x');
            var largeSize = this.newPack === 'mdi' ? 'mdi-48px' : this.addFAPrefix('3x');

            switch (this.size) {
              case 'is-small':
                return;

              case 'is-medium':
                return mediumSize;

              case 'is-large':
                return largeSize;

              default:
                return defaultSize;
            }
          },
          useIconComponent: function useIconComponent() {
            return __WEBPACK_IMPORTED_MODULE_0__utils_config__["a"
            /* default */
            ].defaultIconComponent;
          }
        },
        methods: {
          addFAPrefix: function addFAPrefix(value) {
            if (this.useIconComponent) {
              return value;
            }

            return 'fa-' + value;
          },

          /**
          * Equivalent FA icon name of the MDI.
          */
          getEquivalentIconOf: function getEquivalentIconOf(value) {
            // Only transform the class if the both prop is set to true
            if (!this.both) {
              return value;
            }

            switch (value) {
              case 'check':
                return 'check';

              case 'information':
                return 'info-circle';

              case 'check-circle':
                return 'check-circle';

              case 'alert':
                return 'exclamation-triangle';

              case 'alert-circle':
                return 'exclamation-circle';

              case 'arrow-up':
                return 'arrow-up';

              case 'chevron-right':
                return 'angle-right';

              case 'chevron-left':
                return 'angle-left';

              case 'chevron-down':
                return 'angle-down';

              case 'eye':
                return 'eye';

              case 'eye-off':
                return 'eye-slash';

              case 'menu-down':
                return 'caret-down';

              case 'menu-up':
                return 'caret-up';

              default:
                return value;
            }
          }
        }
      };
      /***/
    },
    /* 107 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('span', {
            staticClass: "icon",
            class: [_vm.newType, _vm.size]
          }, [!_vm.useIconComponent ? _c('i', {
            class: [_vm.newPack, _vm.newIcon, _vm.newCustomSize, _vm.customClass]
          }) : _c(_vm.useIconComponent, {
            tag: "component",
            class: [_vm.customClass],
            attrs: {
              "icon": [_vm.newPack, _vm.newIcon],
              "size": _vm.newCustomSize
            }
          })], 1);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 108 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "control",
            class: _vm.rootClasses
          }, [_vm.type !== 'textarea' ? _c('input', _vm._b({
            ref: "input",
            staticClass: "input",
            class: [_vm.inputClasses, _vm.customClass],
            attrs: {
              "type": _vm.newType,
              "autocomplete": _vm.newAutocomplete,
              "maxlength": _vm.maxlength
            },
            domProps: {
              "value": _vm.computedValue
            },
            on: {
              "input": _vm.onInput,
              "blur": _vm.onBlur,
              "focus": _vm.onFocus
            }
          }, 'input', _vm.$attrs, false)) : _c('textarea', _vm._b({
            ref: "textarea",
            staticClass: "textarea",
            class: [_vm.inputClasses, _vm.customClass],
            attrs: {
              "maxlength": _vm.maxlength
            },
            domProps: {
              "value": _vm.computedValue
            },
            on: {
              "input": _vm.onInput,
              "blur": _vm.onBlur,
              "focus": _vm.onFocus
            }
          }, 'textarea', _vm.$attrs, false)), _vm._v(" "), _vm.icon ? _c('b-icon', {
            staticClass: "is-left",
            attrs: {
              "icon": _vm.icon,
              "pack": _vm.iconPack,
              "size": _vm.iconSize
            }
          }) : _vm._e(), _vm._v(" "), !_vm.loading && (_vm.passwordReveal || _vm.statusType) ? _c('b-icon', {
            staticClass: "is-right",
            class: {
              'is-clickable': _vm.passwordReveal
            },
            attrs: {
              "icon": _vm.passwordReveal ? _vm.passwordVisibleIcon : _vm.statusTypeIcon,
              "pack": _vm.iconPack,
              "size": _vm.iconSize,
              "type": !_vm.passwordReveal ? _vm.statusType : 'is-primary',
              "both": ""
            },
            nativeOn: {
              "click": function ($event) {
                _vm.togglePasswordVisibility($event);
              }
            }
          }) : _vm._e(), _vm._v(" "), _vm.maxlength && _vm.hasCounter && _vm.type !== 'number' ? _c('small', {
            staticClass: "help counter",
            class: {
              'is-invisible': !_vm.isFocused
            }
          }, [_vm._v("\n        " + _vm._s(_vm.valueLength) + " / " + _vm._s(_vm.maxlength) + "\n    ")]) : _vm._e()], 1);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 109 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "autocomplete control",
            class: {
              'is-expanded': _vm.expanded
            }
          }, [_c('b-input', _vm._b({
            ref: "input",
            attrs: {
              "type": "text",
              "size": _vm.size,
              "loading": _vm.loading,
              "rounded": _vm.rounded,
              "icon": _vm.icon,
              "icon-pack": _vm.iconPack,
              "maxlength": _vm.maxlength,
              "autocomplete": _vm.newAutocomplete,
              "use-html5-validation": _vm.useHtml5Validation
            },
            on: {
              "input": _vm.onInput,
              "focus": _vm.focused,
              "blur": _vm.onBlur
            },
            nativeOn: {
              "keyup": function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "esc", 27, $event.key)) {
                  return null;
                }

                $event.preventDefault();
                _vm.isActive = false;
              },
              "keydown": [function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "tab", 9, $event.key)) {
                  return null;
                }

                _vm.tabPressed($event);
              }, function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
                  return null;
                }

                $event.preventDefault();

                _vm.enterPressed($event);
              }, function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key)) {
                  return null;
                }

                $event.preventDefault();

                _vm.keyArrows('up');
              }, function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key)) {
                  return null;
                }

                $event.preventDefault();

                _vm.keyArrows('down');
              }]
            },
            model: {
              value: _vm.newValue,
              callback: function ($$v) {
                _vm.newValue = $$v;
              },
              expression: "newValue"
            }
          }, 'b-input', _vm.$attrs, false)), _vm._v(" "), _c('transition', {
            attrs: {
              "name": "fade"
            }
          }, [_c('div', {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: _vm.isActive && (_vm.data.length > 0 || _vm.hasEmptySlot || _vm.hasHeaderSlot),
              expression: "isActive && (data.length > 0 || hasEmptySlot || hasHeaderSlot)"
            }],
            ref: "dropdown",
            staticClass: "dropdown-menu",
            class: {
              'is-opened-top': !_vm.isListInViewportVertically
            }
          }, [_c('div', {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: _vm.isActive,
              expression: "isActive"
            }],
            staticClass: "dropdown-content"
          }, [_vm.hasHeaderSlot ? _c('div', {
            staticClass: "dropdown-item"
          }, [_vm._t("header")], 2) : _vm._e(), _vm._v(" "), _vm._l(_vm.data, function (option, index) {
            return _c('a', {
              key: index,
              staticClass: "dropdown-item",
              class: {
                'is-hovered': option === _vm.hovered
              },
              on: {
                "click": function ($event) {
                  _vm.setSelected(option);
                }
              }
            }, [_vm.hasDefaultSlot ? _vm._t("default", null, {
              option: option,
              index: index
            }) : _c('span', [_vm._v("\n                        " + _vm._s(_vm.getValue(option, true)) + "\n                    ")])], 2);
          }), _vm._v(" "), _vm.data.length === 0 && _vm.hasEmptySlot ? _c('div', {
            staticClass: "dropdown-item is-disabled"
          }, [_vm._t("empty")], 2) : _vm._e(), _vm._v(" "), _vm.hasFooterSlot ? _c('div', {
            staticClass: "dropdown-item"
          }, [_vm._t("footer")], 2) : _vm._e()], 2)])])], 1);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 110 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(111),
      /* template */
      __webpack_require__(112),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 111 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BButton',
        components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a),
        inheritAttrs: false,
        props: {
          type: [String, Object],
          size: String,
          label: String,
          iconPack: String,
          iconLeft: String,
          iconRight: String,
          rounded: Boolean,
          loading: Boolean,
          outlined: Boolean,
          inverted: Boolean,
          focused: Boolean,
          active: Boolean,
          hovered: Boolean,
          selected: Boolean,
          nativeType: {
            type: String,
            default: 'button',
            validator: function validator(value) {
              return ['button', 'submit', 'reset'].indexOf(value) >= 0;
            }
          },
          tag: {
            type: String,
            default: 'button',
            validator: function validator(value) {
              return ['button', 'a', 'input', 'router-link', 'nuxt-link', 'n-link', 'NuxtLink', 'NLink'].indexOf(value) >= 0;
            }
          }
        },
        computed: {
          iconSize: function iconSize() {
            if (!this.size || this.size === 'is-medium') {
              return 'is-small';
            } else if (this.size === 'is-large') {
              return 'is-medium';
            }

            return this.size;
          }
        }
      };
      /***/
    },
    /* 112 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c(_vm.tag, _vm._b({
            tag: "component",
            staticClass: "button",
            class: [_vm.size, _vm.type, {
              'is-rounded': _vm.rounded,
              'is-loading': _vm.loading,
              'is-outlined': _vm.outlined,
              'is-inverted': _vm.inverted,
              'is-focused': _vm.focused,
              'is-active': _vm.active,
              'is-hovered': _vm.hovered,
              'is-selected': _vm.selected
            }],
            attrs: {
              "type": _vm.nativeType
            },
            on: {
              "click": function ($event) {
                _vm.$emit('click', $event);
              }
            }
          }, 'component', _vm.$attrs, false), [_vm.iconLeft ? _c('b-icon', {
            attrs: {
              "pack": _vm.iconPack,
              "icon": _vm.iconLeft,
              "size": _vm.iconSize
            }
          }) : _vm._e(), _vm._v(" "), _vm.label ? _c('span', [_vm._v(_vm._s(_vm.label))]) : _vm.$slots.default ? _c('span', [_vm._t("default")], 2) : _vm._e(), _vm._v(" "), _vm.iconRight ? _c('b-icon', {
            attrs: {
              "pack": _vm.iconPack,
              "icon": _vm.iconRight,
              "size": _vm.iconSize
            }
          }) : _vm._e()], 1);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 113 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BCheckbox',
        props: {
          value: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
          nativeValue: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
          indeterminate: Boolean,
          type: String,
          disabled: Boolean,
          required: Boolean,
          name: String,
          size: String,
          trueValue: {
            type: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
            default: true
          },
          falseValue: {
            type: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
            default: false
          }
        },
        data: function data() {
          return {
            newValue: this.value
          };
        },
        computed: {
          computedValue: {
            get: function get() {
              return this.newValue;
            },
            set: function set(value) {
              this.newValue = value;
              this.$emit('input', value);
            }
          }
        },
        watch: {
          /**
           * When v-model change, set internal value.
           */
          value: function value(_value) {
            this.newValue = _value;
          }
        }
      };
      /***/
    },
    /* 114 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('label', {
            ref: "label",
            staticClass: "b-checkbox checkbox",
            class: [_vm.size, {
              'is-disabled': _vm.disabled
            }],
            attrs: {
              "disabled": _vm.disabled
            },
            on: {
              "keydown": function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
                  return null;
                }

                $event.preventDefault();

                _vm.$refs.label.click();
              }
            }
          }, [_c('input', {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: _vm.computedValue,
              expression: "computedValue"
            }],
            attrs: {
              "type": "checkbox",
              "disabled": _vm.disabled,
              "required": _vm.required,
              "name": _vm.name,
              "true-value": _vm.trueValue,
              "false-value": _vm.falseValue
            },
            domProps: {
              "indeterminate": _vm.indeterminate,
              "value": _vm.nativeValue,
              "checked": Array.isArray(_vm.computedValue) ? _vm._i(_vm.computedValue, _vm.nativeValue) > -1 : _vm._q(_vm.computedValue, _vm.trueValue)
            },
            on: {
              "click": function ($event) {
                $event.stopPropagation();
              },
              "change": function ($event) {
                var $$a = _vm.computedValue,
                    $$el = $event.target,
                    $$c = $$el.checked ? _vm.trueValue : _vm.falseValue;

                if (Array.isArray($$a)) {
                  var $$v = _vm.nativeValue,
                      $$i = _vm._i($$a, $$v);

                  if ($$el.checked) {
                    $$i < 0 && (_vm.computedValue = $$a.concat([$$v]));
                  } else {
                    $$i > -1 && (_vm.computedValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                  }
                } else {
                  _vm.computedValue = $$c;
                }
              }
            }
          }), _vm._v(" "), _c('span', {
            staticClass: "check",
            class: _vm.type
          }), _vm._v(" "), _c('span', {
            staticClass: "control-label"
          }, [_vm._t("default")], 2)]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 115 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(116),
      /* template */
      __webpack_require__(117),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 116 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BCheckboxButton',
        props: {
          value: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
          nativeValue: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
          disabled: Boolean,
          required: Boolean,
          name: String,
          size: String,
          type: {
            type: String,
            default: 'is-primary'
          }
        },
        data: function data() {
          return {
            newValue: this.value,
            isFocused: false
          };
        },
        computed: {
          computedValue: {
            get: function get() {
              return this.newValue;
            },
            set: function set(value) {
              this.newValue = value;
              this.$emit('input', value);
            }
          },
          checked: function checked() {
            if (Array.isArray(this.newValue)) {
              return this.newValue.indexOf(this.nativeValue) >= 0;
            }

            return this.newValue === this.nativeValue;
          }
        },
        watch: {
          /**
           * When v-model change, set internal value.
           */
          value: function value(_value) {
            this.newValue = _value;
          }
        }
      };
      /***/
    },
    /* 117 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "control"
          }, [_c('label', {
            ref: "label",
            staticClass: "b-checkbox checkbox button",
            class: [_vm.checked ? _vm.type : null, _vm.size, {
              'is-disabled': _vm.disabled,
              'is-focused': _vm.isFocused
            }],
            attrs: {
              "disabled": _vm.disabled
            },
            on: {
              "keydown": function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
                  return null;
                }

                $event.preventDefault();

                _vm.$refs.label.click();
              }
            }
          }, [_vm._t("default"), _vm._v(" "), _c('input', {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: _vm.computedValue,
              expression: "computedValue"
            }],
            attrs: {
              "type": "checkbox",
              "disabled": _vm.disabled,
              "required": _vm.required,
              "name": _vm.name
            },
            domProps: {
              "value": _vm.nativeValue,
              "checked": Array.isArray(_vm.computedValue) ? _vm._i(_vm.computedValue, _vm.nativeValue) > -1 : _vm.computedValue
            },
            on: {
              "click": function ($event) {
                $event.stopPropagation();
              },
              "focus": function ($event) {
                _vm.isFocused = true;
              },
              "blur": function ($event) {
                _vm.isFocused = false;
              },
              "change": function ($event) {
                var $$a = _vm.computedValue,
                    $$el = $event.target,
                    $$c = $$el.checked ? true : false;

                if (Array.isArray($$a)) {
                  var $$v = _vm.nativeValue,
                      $$i = _vm._i($$a, $$v);

                  if ($$el.checked) {
                    $$i < 0 && (_vm.computedValue = $$a.concat([$$v]));
                  } else {
                    $$i > -1 && (_vm.computedValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                  }
                } else {
                  _vm.computedValue = $$c;
                }
              }
            }
          })], 2)]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 118 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(119),
      /* template */
      __webpack_require__(120),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 119 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      }); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */

      __webpack_exports__["default"] = {
        name: 'BCollapse',
        props: {
          open: {
            type: Boolean,
            default: true
          },
          animation: {
            type: String,
            default: 'fade'
          },
          ariaId: {
            type: String,
            default: ''
          }
        },
        data: function data() {
          return {
            isOpen: this.open
          };
        },
        watch: {
          open: function open(value) {
            this.isOpen = value;
          }
        },
        methods: {
          /**
          * Toggle and emit events
          */
          toggle: function toggle() {
            this.isOpen = !this.isOpen;
            this.$emit('update:open', this.isOpen);
            this.$emit(this.isOpen ? 'open' : 'close');
          }
        }
      };
      /***/
    },
    /* 120 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "collapse"
          }, [_c('div', {
            staticClass: "collapse-trigger",
            on: {
              "click": _vm.toggle
            }
          }, [_vm._t("trigger", null, {
            open: _vm.isOpen
          })], 2), _vm._v(" "), _c('transition', {
            attrs: {
              "name": _vm.animation
            }
          }, [_c('div', {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: _vm.isOpen,
              expression: "isOpen"
            }],
            staticClass: "collapse-content",
            attrs: {
              "id": _vm.ariaId,
              "aria-expanded": _vm.isOpen
            }
          }, [_vm._t("default")], 2)])], 1);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 121 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(122),
      /* template */
      __webpack_require__(134),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 122 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__utils_TimepickerMixin__ = __webpack_require__(62);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown__ = __webpack_require__(28);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem__ = __webpack_require__(29);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__input_Input__ = __webpack_require__(17);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__input_Input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__input_Input__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_5__field_Field__ = __webpack_require__(30);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_5__field_Field___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__field_Field__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_6__icon_Icon__ = __webpack_require__(3);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_6__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__icon_Icon__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_7__ClockpickerFace__ = __webpack_require__(131);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_7__ClockpickerFace___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__ClockpickerFace__);

      var _components; //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //


      var outerPadding = 12;
      /* harmony default export */

      __webpack_exports__["default"] = {
        name: 'BClockpicker',
        components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_7__ClockpickerFace___default.a.name, __WEBPACK_IMPORTED_MODULE_7__ClockpickerFace___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4__input_Input___default.a.name, __WEBPACK_IMPORTED_MODULE_4__input_Input___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_5__field_Field___default.a.name, __WEBPACK_IMPORTED_MODULE_5__field_Field___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_6__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_6__icon_Icon___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown___default.a.name, __WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem___default.a.name, __WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem___default.a), _components),
        mixins: [__WEBPACK_IMPORTED_MODULE_1__utils_TimepickerMixin__["a"
        /* default */
        ]],
        props: {
          pickerSize: {
            type: Number,
            default: 290
          },
          hourFormat: {
            type: String,
            default: '12',
            validator: function validator(value) {
              return value === '24' || value === '12';
            }
          },
          incrementMinutes: {
            type: Number,
            default: 5
          },
          autoSwitch: {
            type: Boolean,
            default: true
          },
          type: {
            type: String,
            default: 'is-primary'
          }
        },
        data: function data() {
          return {
            isSelectingHour: true,
            isDragging: false,
            _isClockpicker: true
          };
        },
        computed: {
          hoursDisplay: function hoursDisplay() {
            if (this.hoursSelected == null) return '--';
            if (this.isHourFormat24) return this.pad(this.hoursSelected);
            var display = this.hoursSelected;
            if (this.meridienSelected === this.PM) display -= 12;
            if (display === 0) display = 12;
            return display;
          },
          minutesDisplay: function minutesDisplay() {
            return this.minutesSelected == null ? '--' : this.pad(this.minutesSelected);
          },
          minFaceValue: function minFaceValue() {
            return this.isSelectingHour && !this.isHourFormat24 && this.meridienSelected === this.PM ? 12 : 0;
          },
          maxFaceValue: function maxFaceValue() {
            return this.isSelectingHour ? !this.isHourFormat24 && this.meridienSelected === this.AM ? 11 : 23 : 59;
          },
          faceFormatter: function faceFormatter() {
            return this.isSelectingHour && !this.isHourFormat24 ? function (val) {
              return val;
            } : this.formatNumber;
          },
          faceSize: function faceSize() {
            return this.pickerSize - outerPadding * 2;
          },
          faceDisabledValues: function faceDisabledValues() {
            return this.isSelectingHour ? this.isHourDisabled : this.isMinuteDisabled;
          }
        },
        methods: {
          onClockInput: function onClockInput(value) {
            if (this.isSelectingHour) {
              this.hoursSelected = value;
              this.onHoursChange(value);
            } else {
              this.minutesSelected = value;
              this.onMinutesChange(value);
            }
          },
          onClockChange: function onClockChange(value) {
            if (this.autoSwitch && this.isSelectingHour) {
              this.isSelectingHour = !this.isSelectingHour;
            }
          },
          onMeridienClick: function onMeridienClick(value) {
            if (this.meridienSelected !== value) {
              this.meridienSelected = value;
              this.onMeridienChange(value);
            }
          }
        }
      };
      /***/
    },
    /* 123 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__ = __webpack_require__(59);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol__ = __webpack_require__(5);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__utils_config__ = __webpack_require__(2); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BDropdown',
        props: {
          value: {
            type: [String, Number, Boolean, Object, Array, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_symbol___default.a, Function],
            default: null
          },
          disabled: Boolean,
          hoverable: Boolean,
          inline: Boolean,
          position: {
            type: String,
            validator: function validator(value) {
              return ['is-top-right', 'is-top-left', 'is-bottom-left'].indexOf(value) > -1;
            }
          },
          mobileModal: {
            type: Boolean,
            default: function _default() {
              return __WEBPACK_IMPORTED_MODULE_2__utils_config__["a"
              /* default */
              ].defaultDropdownMobileModal;
            }
          },
          ariaRole: {
            type: String,
            default: ''
          },
          animation: {
            type: String,
            default: 'fade'
          },
          multiple: Boolean,
          closeOnClick: {
            type: Boolean,
            default: true
          }
        },
        data: function data() {
          return {
            selected: this.value,
            isActive: false,
            isHoverable: this.hoverable,
            _isDropdown: true // Used internally by DropdownItem

          };
        },
        computed: {
          rootClasses: function rootClasses() {
            return [this.position, {
              'is-disabled': this.disabled,
              'is-hoverable': this.hoverable,
              'is-inline': this.inline,
              'is-active': this.isActive || this.inline,
              'is-mobile-modal': this.isMobileModal
            }];
          },
          isMobileModal: function isMobileModal() {
            return this.mobileModal && !this.inline && !this.hoverable;
          },
          ariaRoleMenu: function ariaRoleMenu() {
            return this.ariaRole === 'menu' || this.ariaRole === 'list' ? this.ariaRole : null;
          }
        },
        watch: {
          /**
          * When v-model is changed set the new selected item.
          */
          value: function value(_value) {
            this.selected = _value;
          },

          /**
          * Emit event when isActive value is changed.
          */
          isActive: function isActive(value) {
            this.$emit('active-change', value);
          }
        },
        methods: {
          /**
          * Click listener from DropdownItem.
          *   1. Set new selected item.
          *   2. Emit input event to update the user v-model.
          *   3. Close the dropdown.
          */
          selectItem: function selectItem(value) {
            if (this.multiple) {
              if (this.selected) {
                var index = this.selected.indexOf(value);

                if (index === -1) {
                  this.selected.push(value);
                } else {
                  this.selected.splice(index, 1);
                }
              } else {
                this.selected = [value];
              }

              this.$emit('change', this.selected);
            } else {
              if (this.selected !== value) {
                this.selected = value;
                this.$emit('change', this.selected);
              }
            }

            this.$emit('input', this.selected);

            if (!this.multiple) {
              this.isActive = !this.closeOnClick;
              /*
              * breaking change
              if (this.hoverable && this.closeOnClick) {
                  this.isHoverable = false
                  // Timeout for the animation complete before destroying
                  setTimeout(() => {
                      this.isHoverable = true
                  }, 250)
              }
              */
            }
          },

          /**
          * White-listed items to not close when clicked.
          */
          isInWhiteList: function isInWhiteList(el) {
            if (el === this.$refs.dropdownMenu) return true;
            if (el === this.$refs.trigger) return true; // All chidren from dropdown

            if (this.$refs.dropdownMenu !== undefined) {
              var children = this.$refs.dropdownMenu.querySelectorAll('*');
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(children), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var child = _step.value;

                  if (el === child) {
                    return true;
                  }
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            } // All children from trigger


            if (this.$refs.trigger !== undefined) {
              var _children = this.$refs.trigger.querySelectorAll('*');

              var _iteratorNormalCompletion2 = true;
              var _didIteratorError2 = false;
              var _iteratorError2 = undefined;

              try {
                for (var _iterator2 = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_get_iterator___default()(_children), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                  var _child = _step2.value;

                  if (el === _child) {
                    return true;
                  }
                }
              } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion2 && _iterator2.return) {
                    _iterator2.return();
                  }
                } finally {
                  if (_didIteratorError2) {
                    throw _iteratorError2;
                  }
                }
              }
            }

            return false;
          },

          /**
          * Close dropdown if clicked outside.
          */
          clickedOutside: function clickedOutside(event) {
            if (this.inline) return;
            if (!this.isInWhiteList(event.target)) this.isActive = false;
          },

          /**
          * Toggle dropdown if it's not disabled.
          */
          toggle: function toggle() {
            var _this = this;

            if (this.disabled) return;

            if (!this.isActive) {
              // if not active, toggle after clickOutside event
              // this fixes toggling programmatic
              this.$nextTick(function () {
                var value = !_this.isActive;
                _this.isActive = value; // Vue 2.6.x ???

                setTimeout(function () {
                  return _this.isActive = value;
                });
              });
            } else {
              this.isActive = !this.isActive;
            }
          }
        },
        created: function created() {
          if (typeof window !== 'undefined') {
            document.addEventListener('click', this.clickedOutside);
          }
        },
        beforeDestroy: function beforeDestroy() {
          if (typeof window !== 'undefined') {
            document.removeEventListener('click', this.clickedOutside);
          }
        }
      };
      /***/
    },
    /* 124 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "dropdown",
            class: _vm.rootClasses
          }, [!_vm.inline ? _c('div', {
            ref: "trigger",
            staticClass: "dropdown-trigger",
            attrs: {
              "role": "button",
              "aria-haspopup": "true"
            },
            on: {
              "click": _vm.toggle
            }
          }, [_vm._t("trigger")], 2) : _vm._e(), _vm._v(" "), _c('transition', {
            attrs: {
              "name": _vm.animation
            }
          }, [_vm.isMobileModal ? _c('div', {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: _vm.isActive,
              expression: "isActive"
            }],
            staticClass: "background",
            attrs: {
              "aria-hidden": !_vm.isActive
            }
          }) : _vm._e()]), _vm._v(" "), _c('transition', {
            attrs: {
              "name": _vm.animation
            }
          }, [_c('div', {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: !_vm.disabled && (_vm.isActive || _vm.isHoverable) || _vm.inline,
              expression: "(!disabled && (isActive || isHoverable)) || inline"
            }],
            ref: "dropdownMenu",
            staticClass: "dropdown-menu",
            attrs: {
              "aria-hidden": !_vm.isActive
            }
          }, [_c('div', {
            staticClass: "dropdown-content",
            attrs: {
              "role": _vm.ariaRoleMenu
            }
          }, [_vm._t("default")], 2)])])], 1);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 125 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BDropdownItem',
        props: {
          value: {
            type: [String, Number, Boolean, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a, Function],
            default: null
          },
          separator: Boolean,
          disabled: Boolean,
          custom: Boolean,
          paddingless: Boolean,
          hasLink: Boolean,
          ariaRole: {
            type: String,
            default: ''
          }
        },
        computed: {
          anchorClasses: function anchorClasses() {
            return {
              'is-disabled': this.$parent.disabled || this.disabled,
              'is-paddingless': this.paddingless,
              'is-active': this.isActive
            };
          },
          itemClasses: function itemClasses() {
            return {
              'dropdown-item': !this.hasLink,
              'is-disabled': this.disabled,
              'is-paddingless': this.paddingless,
              'is-active': this.isActive,
              'has-link': this.hasLink
            };
          },
          ariaRoleItem: function ariaRoleItem() {
            return this.ariaRole === 'menuitem' || this.ariaRole === 'listitem' ? this.ariaRole : null;
          },

          /**
          * Check if item can be clickable.
          */
          isClickable: function isClickable() {
            return !this.$parent.disabled && !this.separator && !this.disabled && !this.custom;
          },
          isActive: function isActive() {
            if (this.$parent.selected === null) return false;
            if (this.$parent.multiple) return this.$parent.selected.indexOf(this.value) >= 0;
            return this.value === this.$parent.selected;
          }
        },
        methods: {
          /**
          * Click listener, select the item.
          */
          selectItem: function selectItem() {
            if (!this.isClickable) return;
            this.$parent.selectItem(this.value);
            this.$emit('click');
          }
        },
        created: function created() {
          if (!this.$parent.$data._isDropdown) {
            this.$destroy();
            throw new Error('You should wrap bDropdownItem on a bDropdown');
          }
        }
      };
      /***/
    },
    /* 126 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _vm.separator ? _c('hr', {
            staticClass: "dropdown-divider"
          }) : !_vm.custom && !_vm.hasLink ? _c('a', {
            staticClass: "dropdown-item",
            class: _vm.anchorClasses,
            attrs: {
              "role": _vm.ariaRoleItem,
              "tabindex": "0"
            },
            on: {
              "click": _vm.selectItem
            }
          }, [_vm._t("default")], 2) : _c('div', {
            class: _vm.itemClasses,
            attrs: {
              "role": _vm.ariaRoleItem,
              "tabindex": "0"
            },
            on: {
              "click": _vm.selectItem
            }
          }, [_vm._t("default")], 2);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 127 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__utils_config__ = __webpack_require__(2);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__FieldBody__ = __webpack_require__(128);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__FieldBody___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__FieldBody__); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BField',
        components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_2__FieldBody___default.a.name, __WEBPACK_IMPORTED_MODULE_2__FieldBody___default.a),
        props: {
          type: [String, Object],
          label: String,
          labelFor: String,
          message: [String, Array, Object],
          grouped: Boolean,
          groupMultiline: Boolean,
          position: String,
          expanded: Boolean,
          horizontal: Boolean,
          addons: {
            type: Boolean,
            default: true
          },
          customClass: String,
          labelPosition: {
            type: String,
            default: function _default() {
              return __WEBPACK_IMPORTED_MODULE_1__utils_config__["a"
              /* default */
              ].defaultFieldLabelPosition;
            }
          }
        },
        data: function data() {
          return {
            newType: this.type,
            newMessage: this.message,
            fieldLabelSize: null,
            _isField: true // Used internally by Input and Select

          };
        },
        computed: {
          rootClasses: function rootClasses() {
            return [this.newPosition, {
              'is-expanded': this.expanded,
              'is-grouped-multiline': this.groupMultiline,
              'is-horizontal': this.horizontal,
              'is-floating-in-label': this.hasLabel && !this.horizontal && this.labelPosition === 'inside',
              'is-floating-label': this.hasLabel && !this.horizontal && this.labelPosition === 'on-border'
            }];
          },

          /**
          * Correct Bulma class for the side of the addon or group.
          *
          * This is not kept like the others (is-small, etc.),
          * because since 'has-addons' is set automatically it
          * doesn't make sense to teach users what addons are exactly.
          */
          newPosition: function newPosition() {
            if (this.position === undefined) return;
            var position = this.position.split('-');
            if (position.length < 1) return;
            var prefix = this.grouped ? 'is-grouped-' : 'has-addons-';
            if (this.position) return prefix + position[1];
          },

          /**
          * Formatted message in case it's an array
          * (each element is separated by <br> tag)
          */
          formattedMessage: function formattedMessage() {
            if (typeof this.newMessage === 'string') {
              return this.newMessage;
            } else {
              var messages = [];

              if (Array.isArray(this.newMessage)) {
                this.newMessage.forEach(function (message) {
                  if (typeof message === 'string') {
                    messages.push(message);
                  } else {
                    for (var key in message) {
                      if (message[key]) {
                        messages.push(key);
                      }
                    }
                  }
                });
              } else {
                for (var key in this.newMessage) {
                  if (this.newMessage[key]) {
                    messages.push(key);
                  }
                }
              }

              return messages.filter(function (m) {
                if (m) return m;
              }).join(' <br> ');
            }
          },
          hasLabel: function hasLabel() {
            return this.label || this.$slots.label;
          }
        },
        watch: {
          /**
          * Set internal type when prop change.
          */
          type: function type(value) {
            this.newType = value;
          },

          /**
          * Set internal message when prop change.
          */
          message: function message(value) {
            this.newMessage = value;
          }
        },
        methods: {
          /**
          * Field has addons if there are more than one slot
          * (element / component) in the Field.
          * Or is grouped when prop is set.
          * Is a method to be called when component re-render.
          */
          fieldType: function fieldType() {
            if (this.grouped) return 'is-grouped';
            var renderedNode = 0;

            if (this.$slots.default) {
              renderedNode = this.$slots.default.reduce(function (i, node) {
                return node.tag ? i + 1 : i;
              }, 0);
            }

            if (renderedNode > 1 && this.addons && !this.horizontal) {
              return 'has-addons';
            }
          }
        },
        mounted: function mounted() {
          if (this.horizontal) {
            // Bulma docs: .is-normal for any .input or .button
            var elements = this.$el.querySelectorAll('.input, .select, .button, .textarea');

            if (elements.length > 0) {
              this.fieldLabelSize = 'is-normal';
            }
          }
        }
      };
      /***/
    },
    /* 128 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(129),
      /* template */
      null,
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 129 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony default export */

      __webpack_exports__["default"] = {
        name: 'BFieldBody',
        props: {
          message: {
            type: String
          },
          type: {
            type: [String, Object]
          }
        },
        render: function render(createElement) {
          var _this = this;

          return createElement('div', {
            attrs: {
              'class': 'field-body'
            }
          }, this.$slots.default.map(function (element) {
            // skip returns and comments
            if (!element.tag) {
              return element;
            }

            if (_this.message) {
              return createElement('b-field', {
                attrs: {
                  message: _this.message,
                  'type': _this.type
                }
              }, [element]);
            }

            return createElement('b-field', {
              attrs: {
                'type': _this.type
              }
            }, [element]);
          }));
        }
      };
      /***/
    },
    /* 130 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "field",
            class: [_vm.rootClasses, _vm.fieldType()]
          }, [_vm.horizontal ? _c('div', {
            staticClass: "field-label",
            class: [_vm.customClass, _vm.fieldLabelSize]
          }, [_vm.hasLabel ? _c('label', {
            staticClass: "label",
            class: _vm.customClass,
            attrs: {
              "for": _vm.labelFor
            }
          }, [_vm.$slots.label ? _vm._t("label") : [_vm._v(_vm._s(_vm.label))]], 2) : _vm._e()]) : [_vm.hasLabel ? _c('label', {
            staticClass: "label",
            class: _vm.customClass,
            attrs: {
              "for": _vm.labelFor
            }
          }, [_vm.$slots.label ? _vm._t("label") : [_vm._v(_vm._s(_vm.label))]], 2) : _vm._e()], _vm._v(" "), _vm.horizontal ? _c('b-field-body', {
            attrs: {
              "message": _vm.newMessage ? _vm.formattedMessage : '',
              "type": _vm.newType
            }
          }, [_vm._t("default")], 2) : [_vm._t("default")], _vm._v(" "), _vm.newMessage && !_vm.horizontal ? _c('p', {
            staticClass: "help",
            class: _vm.newType,
            domProps: {
              "innerHTML": _vm._s(_vm.formattedMessage)
            }
          }) : _vm._e()], 2);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 131 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(132),
      /* template */
      __webpack_require__(133),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 132 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      }); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      // These should match the variables in clockpicker.scss

      var indicatorSize = 40;
      var paddingInner = 5;
      /* harmony default export */

      __webpack_exports__["default"] = {
        name: 'BClockpickerFace',
        props: {
          pickerSize: Number,
          min: Number,
          max: Number,
          double: Boolean,
          value: Number,
          faceNumbers: Array,
          disabledValues: Function
        },
        data: function data() {
          return {
            isDragging: false,
            inputValue: this.value,
            prevAngle: 720
          };
        },
        computed: {
          /**
          * How many number indicators are shown on the face
          */
          count: function count() {
            return this.max - this.min + 1;
          },

          /**
          * How many number indicators are shown per ring on the face
          */
          countPerRing: function countPerRing() {
            return this.double ? this.count / 2 : this.count;
          },

          /**
          * Radius of the clock face
          */
          radius: function radius() {
            return this.pickerSize / 2;
          },

          /**
          * Radius of the outer ring of number indicators
          */
          outerRadius: function outerRadius() {
            return this.radius - paddingInner - indicatorSize / 2;
          },

          /**
          * Radius of the inner ring of number indicators
          */
          innerRadius: function innerRadius() {
            return Math.max(this.outerRadius * 0.6, this.outerRadius - paddingInner - indicatorSize); // 48px gives enough room for the outer ring of numbers
          },

          /**
          * The angle for each selectable value
          * For hours this ends up being 30 degrees, for minutes 6 degrees
          */
          degreesPerUnit: function degreesPerUnit() {
            return 360 / this.countPerRing;
          },

          /**
          * Used for calculating x/y grid location based on degrees
          */
          degrees: function degrees() {
            return this.degreesPerUnit * Math.PI / 180;
          },

          /**
          * Calculates the angle the clock hand should be rotated for the
          * selected value
          */
          handRotateAngle: function handRotateAngle() {
            var currentAngle = this.prevAngle;

            while (currentAngle < 0) {
              currentAngle += 360;
            }

            var targetAngle = this.calcHandAngle(this.displayedValue);
            var degreesDiff = this.shortestDistanceDegrees(currentAngle, targetAngle);
            var angle = this.prevAngle + degreesDiff;
            return angle;
          },

          /**
          * Determines how long the selector hand is based on if the
          * selected value is located along the outer or inner ring
          */
          handScale: function handScale() {
            return this.calcHandScale(this.displayedValue);
          },
          handStyle: function handStyle() {
            return {
              transform: 'rotate(' + this.handRotateAngle + 'deg) scaleY(' + this.handScale + ')',
              transition: '.3s cubic-bezier(.25,.8,.50,1)'
            };
          },

          /**
          * The value the hand should be pointing at
          */
          displayedValue: function displayedValue() {
            return this.inputValue == null ? this.min : this.inputValue;
          }
        },
        watch: {
          value: function value(_value) {
            if (_value !== this.inputValue) {
              this.prevAngle = this.handRotateAngle;
            }

            this.inputValue = _value;
          }
        },
        methods: {
          isDisabled: function isDisabled(value) {
            return this.disabledValues && this.disabledValues(value);
          },

          /**
          * Calculates the distance between two points
          */
          euclidean: function euclidean(p0, p1) {
            var dx = p1.x - p0.x;
            var dy = p1.y - p0.y;
            return Math.sqrt(dx * dx + dy * dy);
          },
          shortestDistanceDegrees: function shortestDistanceDegrees(start, stop) {
            var modDiff = (stop - start) % 360;
            var shortestDistance = 180 - Math.abs(Math.abs(modDiff) - 180);
            return (modDiff + 360) % 360 < 180 ? shortestDistance * 1 : shortestDistance * -1;
          },

          /**
          * Calculates the angle of the line from the center point
          * to the given point.
          */
          coordToAngle: function coordToAngle(center, p1) {
            var value = 2 * Math.atan2(p1.y - center.y - this.euclidean(center, p1), p1.x - center.x);
            return Math.abs(value * 180 / Math.PI);
          },

          /**
          * Generates the inline style translate() property for a
          * number indicator, which determines it's location on the
          * clock face
          */
          getNumberTranslate: function getNumberTranslate(value) {
            var _getNumberCoords = this.getNumberCoords(value),
                x = _getNumberCoords.x,
                y = _getNumberCoords.y;

            return 'translate(' + x + 'px, ' + y + 'px)';
          },

          /***
          * Calculates the coordinates on the clock face for a number
          * indicator value
          */
          getNumberCoords: function getNumberCoords(value) {
            var radius = this.isInnerRing(value) ? this.innerRadius : this.outerRadius;
            return {
              x: Math.round(radius * Math.sin((value - this.min) * this.degrees)),
              y: Math.round(-radius * Math.cos((value - this.min) * this.degrees))
            };
          },
          getFaceNumberClasses: function getFaceNumberClasses(num) {
            return {
              'active': num.value === this.displayedValue,
              'disabled': this.isDisabled(num.value)
            };
          },

          /**
          * Determines if a value resides on the inner ring
          */
          isInnerRing: function isInnerRing(value) {
            return this.double && value - this.min >= this.countPerRing;
          },
          calcHandAngle: function calcHandAngle(value) {
            var angle = this.degreesPerUnit * (value - this.min);
            if (this.isInnerRing(value)) angle -= 360;
            return angle;
          },
          calcHandScale: function calcHandScale(value) {
            return this.isInnerRing(value) ? this.innerRadius / this.outerRadius : 1;
          },
          onMouseDown: function onMouseDown(e) {
            e.preventDefault();
            this.isDragging = true;
            this.onDragMove(e);
          },
          onMouseUp: function onMouseUp() {
            this.isDragging = false;

            if (!this.isDisabled(this.inputValue)) {
              this.$emit('change', this.inputValue);
            }
          },
          onDragMove: function onDragMove(e) {
            e.preventDefault();
            if (!this.isDragging && e.type !== 'click') return;

            var _$refs$clock$getBound = this.$refs.clock.getBoundingClientRect(),
                width = _$refs$clock$getBound.width,
                top = _$refs$clock$getBound.top,
                left = _$refs$clock$getBound.left;

            var _ref = 'touches' in e ? e.touches[0] : e,
                clientX = _ref.clientX,
                clientY = _ref.clientY;

            var center = {
              x: width / 2,
              y: -width / 2
            };
            var coords = {
              x: clientX - left,
              y: top - clientY
            };
            var handAngle = Math.round(this.coordToAngle(center, coords) + 360) % 360;
            var insideClick = this.double && this.euclidean(center, coords) < (this.outerRadius + this.innerRadius) / 2 - 16;
            var value = Math.round(handAngle / this.degreesPerUnit) + this.min + (insideClick ? this.countPerRing : 0); // Necessary to fix edge case when selecting left part of max value

            if (handAngle >= 360 - this.degreesPerUnit / 2) {
              value = insideClick ? this.max : this.min;
            }

            this.update(value);
          },
          update: function update(value) {
            if (this.inputValue !== value && !this.isDisabled(value)) {
              this.prevAngle = this.handRotateAngle;
              this.inputValue = value;
              this.$emit('input', value);
            }
          }
        }
      };
      /***/
    },
    /* 133 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "b-clockpicker-face",
            on: {
              "mousedown": _vm.onMouseDown,
              "mouseup": _vm.onMouseUp,
              "mousemove": _vm.onDragMove,
              "touchstart": _vm.onMouseDown,
              "touchend": _vm.onMouseUp,
              "touchmove": _vm.onDragMove
            }
          }, [_c('div', {
            ref: "clock",
            staticClass: "b-clockpicker-face-outer-ring"
          }, [_c('div', {
            staticClass: "b-clockpicker-face-hand",
            style: _vm.handStyle
          }), _vm._v(" "), _vm._l(_vm.faceNumbers, function (num, index) {
            return _c('span', {
              key: index,
              staticClass: "b-clockpicker-face-number",
              class: _vm.getFaceNumberClasses(num),
              style: {
                transform: _vm.getNumberTranslate(num.value)
              }
            }, [_c('span', [_vm._v(_vm._s(num.label))])]);
          })], 2)]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 134 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "b-clockpicker control",
            class: [_vm.size, _vm.type, {
              'is-expanded': _vm.expanded
            }]
          }, [!_vm.isMobile || _vm.inline ? _c('b-dropdown', {
            ref: "dropdown",
            attrs: {
              "position": _vm.position,
              "disabled": _vm.disabled,
              "inline": _vm.inline
            }
          }, [!_vm.inline ? _c('b-input', _vm._b({
            ref: "input",
            attrs: {
              "slot": "trigger",
              "autocomplete": "off",
              "value": _vm.formatValue(_vm.computedValue),
              "placeholder": _vm.placeholder,
              "size": _vm.size,
              "icon": _vm.icon,
              "icon-pack": _vm.iconPack,
              "loading": _vm.loading,
              "disabled": _vm.disabled,
              "readonly": !_vm.editable,
              "rounded": _vm.rounded,
              "use-html5-validation": _vm.useHtml5Validation
            },
            on: {
              "focus": _vm.handleOnFocus,
              "blur": function ($event) {
                _vm.onBlur() && _vm.checkHtml5Validity();
              }
            },
            nativeOn: {
              "click": function ($event) {
                $event.stopPropagation();

                _vm.toggle(true);
              },
              "keyup": function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
                  return null;
                }

                _vm.toggle(true);
              },
              "change": function ($event) {
                _vm.onChangeNativePicker($event);
              }
            },
            slot: "trigger"
          }, 'b-input', _vm.$attrs, false)) : _vm._e(), _vm._v(" "), _c('div', {
            staticClass: "card",
            attrs: {
              "disabled": _vm.disabled,
              "custom": ""
            }
          }, [_vm.inline ? _c('header', {
            staticClass: "card-header"
          }, [_c('div', {
            staticClass: "b-clockpicker-header card-header-title"
          }, [_c('div', {
            staticClass: "b-clockpicker-time"
          }, [_c('span', {
            staticClass: "b-clockpicker-btn",
            class: {
              active: _vm.isSelectingHour
            },
            on: {
              "click": function ($event) {
                _vm.isSelectingHour = true;
              }
            }
          }, [_vm._v(_vm._s(_vm.hoursDisplay))]), _vm._v(" "), _c('span', [_vm._v(":")]), _vm._v(" "), _c('span', {
            staticClass: "b-clockpicker-btn",
            class: {
              active: !_vm.isSelectingHour
            },
            on: {
              "click": function ($event) {
                _vm.isSelectingHour = false;
              }
            }
          }, [_vm._v(_vm._s(_vm.minutesDisplay))])]), _vm._v(" "), !_vm.isHourFormat24 ? _c('div', {
            staticClass: "b-clockpicker-period"
          }, [_c('div', {
            staticClass: "b-clockpicker-btn",
            class: {
              active: _vm.meridienSelected == _vm.AM
            },
            on: {
              "click": function ($event) {
                _vm.onMeridienClick(_vm.AM);
              }
            }
          }, [_vm._v("am")]), _vm._v(" "), _c('div', {
            staticClass: "b-clockpicker-btn",
            class: {
              active: _vm.meridienSelected == _vm.PM
            },
            on: {
              "click": function ($event) {
                _vm.onMeridienClick(_vm.PM);
              }
            }
          }, [_vm._v("pm")])]) : _vm._e()])]) : _vm._e(), _vm._v(" "), _c('div', {
            staticClass: "card-content"
          }, [_c('div', {
            staticClass: "b-clockpicker-body",
            style: {
              width: _vm.faceSize + 'px',
              height: _vm.faceSize + 'px'
            }
          }, [!_vm.inline ? _c('div', {
            staticClass: "b-clockpicker-time"
          }, [_c('div', {
            staticClass: "b-clockpicker-btn",
            class: {
              active: _vm.isSelectingHour
            },
            on: {
              "click": function ($event) {
                _vm.isSelectingHour = true;
              }
            }
          }, [_vm._v("Hours")]), _vm._v(" "), _c('span', {
            staticClass: "b-clockpicker-btn",
            class: {
              active: !_vm.isSelectingHour
            },
            on: {
              "click": function ($event) {
                _vm.isSelectingHour = false;
              }
            }
          }, [_vm._v("Min")])]) : _vm._e(), _vm._v(" "), !_vm.isHourFormat24 && !_vm.inline ? _c('div', {
            staticClass: "b-clockpicker-period"
          }, [_c('div', {
            staticClass: "b-clockpicker-btn",
            class: {
              active: _vm.meridienSelected == _vm.AM
            },
            on: {
              "click": function ($event) {
                _vm.onMeridienClick(_vm.AM);
              }
            }
          }, [_vm._v(_vm._s(_vm.AM))]), _vm._v(" "), _c('div', {
            staticClass: "b-clockpicker-btn",
            class: {
              active: _vm.meridienSelected == _vm.PM
            },
            on: {
              "click": function ($event) {
                _vm.onMeridienClick(_vm.PM);
              }
            }
          }, [_vm._v(_vm._s(_vm.PM))])]) : _vm._e(), _vm._v(" "), _c('b-clockpicker-face', {
            attrs: {
              "picker-size": _vm.faceSize,
              "min": _vm.minFaceValue,
              "max": _vm.maxFaceValue,
              "face-numbers": _vm.isSelectingHour ? _vm.hours : _vm.minutes,
              "disabled-values": _vm.faceDisabledValues,
              "double": _vm.isSelectingHour && _vm.isHourFormat24,
              "value": _vm.isSelectingHour ? _vm.hoursSelected : _vm.minutesSelected
            },
            on: {
              "input": _vm.onClockInput,
              "change": _vm.onClockChange
            }
          })], 1)]), _vm._v(" "), _vm.$slots.default !== undefined && _vm.$slots.default.length ? _c('footer', {
            staticClass: "b-clockpicker-footer card-footer"
          }, [_vm._t("default")], 2) : _vm._e()])], 1) : _c('b-input', _vm._b({
            ref: "input",
            attrs: {
              "type": "time",
              "autocomplete": "off",
              "value": _vm.formatHHMMSS(_vm.computedValue),
              "placeholder": _vm.placeholder,
              "size": _vm.size,
              "icon": _vm.icon,
              "icon-pack": _vm.iconPack,
              "loading": _vm.loading,
              "max": _vm.formatHHMMSS(_vm.maxTime),
              "min": _vm.formatHHMMSS(_vm.minTime),
              "disabled": _vm.disabled,
              "readonly": false,
              "use-html5-validation": _vm.useHtml5Validation
            },
            on: {
              "focus": _vm.handleOnFocus,
              "blur": function ($event) {
                _vm.onBlur() && _vm.checkHtml5Validity();
              }
            },
            nativeOn: {
              "click": function ($event) {
                $event.stopPropagation();

                _vm.toggle(true);
              },
              "keyup": function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
                  return null;
                }

                _vm.toggle(true);
              },
              "change": function ($event) {
                _vm.onChangeNativePicker($event);
              }
            }
          }, 'b-input', _vm.$attrs, false))], 1);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 135 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(136),
      /* template */
      __webpack_require__(148),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 136 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__utils_FormElementMixin__ = __webpack_require__(10);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__utils_helpers__ = __webpack_require__(7);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__utils_config__ = __webpack_require__(2);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown__ = __webpack_require__(28);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem__ = __webpack_require__(29);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_6__input_Input__ = __webpack_require__(17);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_6__input_Input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__input_Input__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_7__field_Field__ = __webpack_require__(30);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_7__field_Field___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__field_Field__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_8__select_Select__ = __webpack_require__(31);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_8__select_Select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8__select_Select__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_9__icon_Icon__ = __webpack_require__(3);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_9__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__icon_Icon__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_10__DatepickerTable__ = __webpack_require__(139);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_10__DatepickerTable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__DatepickerTable__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_11__DatepickerMonth__ = __webpack_require__(145);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_11__DatepickerMonth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__DatepickerMonth__);

      var _components; //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //


      var defaultDateFormatter = function defaultDateFormatter(date, vm) {
        var yyyyMMdd = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate();
        var d = new Date(yyyyMMdd);
        return !vm.isTypeMonth ? d.toLocaleDateString() : d.toLocaleDateString(undefined, {
          year: 'numeric',
          month: '2-digit'
        });
      };

      var defaultDateParser = function defaultDateParser(date, vm) {
        if (!vm.isTypeMonth) return new Date(Date.parse(date));

        if (date) {
          var s = date.split('/');
          var year = s[0].length === 4 ? s[0] : s[1];
          var month = s[0].length === 2 ? s[0] : s[1];

          if (year && month) {
            return new Date(parseInt(year, 10), parseInt(month - 1, 10), 1, 0, 0, 0, 0);
          }
        }

        return null;
      };
      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BDatepicker',
        components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_10__DatepickerTable___default.a.name, __WEBPACK_IMPORTED_MODULE_10__DatepickerTable___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_11__DatepickerMonth___default.a.name, __WEBPACK_IMPORTED_MODULE_11__DatepickerMonth___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_6__input_Input___default.a.name, __WEBPACK_IMPORTED_MODULE_6__input_Input___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_7__field_Field___default.a.name, __WEBPACK_IMPORTED_MODULE_7__field_Field___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_8__select_Select___default.a.name, __WEBPACK_IMPORTED_MODULE_8__select_Select___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_9__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_9__icon_Icon___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown___default.a.name, __WEBPACK_IMPORTED_MODULE_4__dropdown_Dropdown___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem___default.a.name, __WEBPACK_IMPORTED_MODULE_5__dropdown_DropdownItem___default.a), _components),
        mixins: [__WEBPACK_IMPORTED_MODULE_1__utils_FormElementMixin__["a"
        /* default */
        ]],
        inheritAttrs: false,
        props: {
          value: Date,
          dayNames: {
            type: Array,
            default: function _default() {
              if (Array.isArray(__WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
              /* default */
              ].defaultDayNames)) {
                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
                /* default */
                ].defaultDayNames;
              } else {
                return ['Su', 'M', 'Tu', 'W', 'Th', 'F', 'S'];
              }
            }
          },
          monthNames: {
            type: Array,
            default: function _default() {
              if (Array.isArray(__WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
              /* default */
              ].defaultMonthNames)) {
                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
                /* default */
                ].defaultMonthNames;
              } else {
                return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
              }
            }
          },
          firstDayOfWeek: {
            type: Number,
            default: function _default() {
              if (typeof __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
              /* default */
              ].defaultFirstDayOfWeek === 'number') {
                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
                /* default */
                ].defaultFirstDayOfWeek;
              } else {
                return 0;
              }
            }
          },
          inline: Boolean,
          minDate: Date,
          maxDate: Date,
          focusedDate: Date,
          placeholder: String,
          editable: Boolean,
          disabled: Boolean,
          unselectableDates: Array,
          unselectableDaysOfWeek: {
            type: Array,
            default: function _default() {
              return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
              /* default */
              ].defaultUnselectableDaysOfWeek;
            }
          },
          selectableDates: Array,
          dateFormatter: {
            type: Function,
            default: function _default(date, vm) {
              if (typeof __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
              /* default */
              ].defaultDateFormatter === 'function') {
                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
                /* default */
                ].defaultDateFormatter(date);
              } else {
                return defaultDateFormatter(date, vm);
              }
            }
          },
          dateParser: {
            type: Function,
            default: function _default(date, vm) {
              if (typeof __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
              /* default */
              ].defaultDateParser === 'function') {
                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
                /* default */
                ].defaultDateParser(date);
              } else {
                return defaultDateParser(date, vm);
              }
            }
          },
          dateCreator: {
            type: Function,
            default: function _default() {
              if (typeof __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
              /* default */
              ].defaultDateCreator === 'function') {
                return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
                /* default */
                ].defaultDateCreator();
              } else {
                return new Date();
              }
            }
          },
          mobileNative: {
            type: Boolean,
            default: function _default() {
              return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
              /* default */
              ].defaultDatepickerMobileNative;
            }
          },
          position: String,
          events: Array,
          indicators: {
            type: String,
            default: 'dots'
          },
          openOnFocus: Boolean,
          yearsRange: {
            type: Array,
            default: function _default() {
              return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
              /* default */
              ].defaultDatepickerYearsRange;
            }
          },
          type: {
            type: String,
            validator: function validator(value) {
              return ['month'].indexOf(value) >= 0;
            }
          },
          nearbyMonthDays: {
            type: Boolean,
            default: function _default() {
              return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
              /* default */
              ].defaultDatepickerNearbyMonthDays;
            }
          },
          nearbySelectableMonthDays: {
            type: Boolean,
            default: function _default() {
              return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
              /* default */
              ].defaultDatepickerNearbySelectableMonthDays;
            }
          }
        },
        data: function data() {
          var focusedDate = this.value || this.focusedDate || this.dateCreator();
          return {
            dateSelected: this.value,
            focusedDateData: {
              month: focusedDate.getMonth(),
              year: focusedDate.getFullYear()
            },
            _elementRef: 'input',
            _isDatepicker: true
          };
        },
        computed: {
          computedValue: {
            get: function get() {
              return this.dateSelected;
            },
            set: function set(value) {
              this.updateInternalState(value);
              this.togglePicker(false);
              this.$emit('input', value);
            }
          },

          /*
          * Returns an array of years for the year dropdown. If earliest/latest
          * dates are set by props, range of years will fall within those dates.
          */
          listOfYears: function listOfYears() {
            var latestYear = this.focusedDateData.year + this.yearsRange[1];

            if (this.maxDate && this.maxDate.getFullYear() < latestYear) {
              latestYear = this.maxDate.getFullYear();
            }

            var earliestYear = this.focusedDateData.year + this.yearsRange[0];

            if (this.minDate && this.minDate.getFullYear() > earliestYear) {
              earliestYear = this.minDate.getFullYear();
            }

            var arrayOfYears = [];

            for (var i = earliestYear; i <= latestYear; i++) {
              arrayOfYears.push(i);
            }

            return arrayOfYears.reverse();
          },
          showPrev: function showPrev() {
            if (!this.minDate) return false;

            if (this.isTypeMonth) {
              return this.focusedDateData.year <= this.minDate.getFullYear();
            }

            var dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
            var date = new Date(this.minDate.getFullYear(), this.minDate.getMonth());
            return dateToCheck <= date;
          },
          showNext: function showNext() {
            if (!this.maxDate) return false;

            if (this.isTypeMonth) {
              return this.focusedDateData.year >= this.maxDate.getFullYear();
            }

            var dateToCheck = new Date(this.focusedDateData.year, this.focusedDateData.month);
            var date = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth());
            return dateToCheck >= date;
          },
          isMobile: function isMobile() {
            return this.mobileNative && __WEBPACK_IMPORTED_MODULE_2__utils_helpers__["c"
            /* isMobile */
            ].any();
          },
          isTypeMonth: function isTypeMonth() {
            return this.type === 'month';
          }
        },
        watch: {
          /**
          * When v-model is changed:
          *   1. Update internal value.
          *   2. If it's invalid, validate again.
          */
          value: function value(_value) {
            this.updateInternalState(_value);
            this.togglePicker(false);
            !this.isValid && this.$refs.input.checkHtml5Validity();
          },
          focusedDate: function focusedDate(value) {
            if (value) {
              this.focusedDateData = {
                month: value.getMonth(),
                year: value.getFullYear()
              };
            }
          },

          /*
          * Emit input event on month and/or year change
          */
          'focusedDateData.month': function focusedDateDataMonth(value) {
            this.$emit('change-month', value);
          },
          'focusedDateData.year': function focusedDateDataYear(value) {
            this.$emit('change-year', value);
          }
        },
        methods: {
          /*
          * Parse string into date
          */
          onChange: function onChange(value) {
            var date = this.dateParser(value, this);

            if (date && !isNaN(date)) {
              this.computedValue = date;
            } else {
              // Force refresh input value when not valid date
              this.computedValue = null;
              this.$refs.input.newValue = this.computedValue;
            }
          },

          /*
          * Format date into string
          */
          formatValue: function formatValue(value) {
            if (value && !isNaN(value)) {
              return this.dateFormatter(value, this);
            } else {
              return null;
            }
          },

          /*
          * Either decrement month by 1 if not January or decrement year by 1
          * and set month to 11 (December) or decrement year when 'month'
          */
          prev: function prev() {
            if (this.disabled) return;

            if (this.isTypeMonth) {
              this.focusedDateData.year -= 1;
            } else {
              if (this.focusedDateData.month > 0) {
                this.focusedDateData.month -= 1;
              } else {
                this.focusedDateData.month = 11;
                this.focusedDateData.year -= 1;
              }
            }
          },

          /*
          * Either increment month by 1 if not December or increment year by 1
          * and set month to 0 (January) or increment year when 'month'
          */
          next: function next() {
            if (this.disabled) return;

            if (this.isTypeMonth) {
              this.focusedDateData.year += 1;
            } else {
              if (this.focusedDateData.month < 11) {
                this.focusedDateData.month += 1;
              } else {
                this.focusedDateData.month = 0;
                this.focusedDateData.year += 1;
              }
            }
          },
          formatNative: function formatNative(value) {
            return this.isTypeMonth ? this.formatYYYYMM(value) : this.formatYYYYMMDD(value);
          },

          /*
          * Format date into string 'YYYY-MM-DD'
          */
          formatYYYYMMDD: function formatYYYYMMDD(value) {
            var date = new Date(value);

            if (value && !isNaN(date)) {
              var year = date.getFullYear();
              var month = date.getMonth() + 1;
              var day = date.getDate();
              return year + '-' + ((month < 10 ? '0' : '') + month) + '-' + ((day < 10 ? '0' : '') + day);
            }

            return '';
          },

          /*
          * Format date into string 'YYYY-MM'
          */
          formatYYYYMM: function formatYYYYMM(value) {
            var date = new Date(value);

            if (value && !isNaN(date)) {
              var year = date.getFullYear();
              var month = date.getMonth() + 1;
              return year + '-' + ((month < 10 ? '0' : '') + month);
            }

            return '';
          },

          /*
          * Parse date from string
          */
          onChangeNativePicker: function onChangeNativePicker(event) {
            var date = event.target.value;
            this.computedValue = date ? new Date(date) : null;
          },
          updateInternalState: function updateInternalState(value) {
            var currentDate = !value ? this.dateCreator() : value;
            this.focusedDateData = {
              month: currentDate.getMonth(),
              year: currentDate.getFullYear()
            };
            this.dateSelected = value;
          },

          /*
          * Toggle datepicker
          */
          togglePicker: function togglePicker(active) {
            if (this.$refs.dropdown) {
              this.$refs.dropdown.isActive = typeof active === 'boolean' ? active : !this.$refs.dropdown.isActive;
            }
          },

          /*
          * Call default onFocus method and show datepicker
          */
          handleOnFocus: function handleOnFocus(event) {
            this.onFocus(event);

            if (this.openOnFocus) {
              this.togglePicker(true);
            }
          },

          /*
          * Toggle dropdown
          */
          toggle: function toggle() {
            if (this.mobileNative && this.isMobile) {
              this.$refs.input.$el.click();
              return;
            }

            this.$refs.dropdown.toggle();
          },

          /*
          * Avoid dropdown toggle when is already visible
          */
          onInputClick: function onInputClick(event) {
            if (this.$refs.dropdown.isActive) {
              event.stopPropagation();
            }
          },

          /**
          * Keypress event that is bound to the document.
          */
          keyPress: function keyPress(event) {
            // Esc key
            if (this.$refs.dropdown && this.$refs.dropdown.isActive && event.keyCode === 27) {
              this.togglePicker(false);
            }
          }
        },
        created: function created() {
          if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress);
          }
        },
        beforeDestroy: function beforeDestroy() {
          if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress);
          }
        }
      };
      /***/
    },
    /* 137 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__icon_Icon__ = __webpack_require__(3);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__icon_Icon__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__utils_FormElementMixin__ = __webpack_require__(10); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BSelect',
        components: __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default.a),
        mixins: [__WEBPACK_IMPORTED_MODULE_3__utils_FormElementMixin__["a"
        /* default */
        ]],
        inheritAttrs: false,
        props: {
          value: {
            type: [String, Number, Boolean, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a, Function],
            default: null
          },
          placeholder: String,
          multiple: Boolean,
          nativeSize: [String, Number]
        },
        data: function data() {
          return {
            selected: this.value,
            _elementRef: 'select'
          };
        },
        computed: {
          computedValue: {
            get: function get() {
              return this.selected;
            },
            set: function set(value) {
              this.selected = value;
              this.$emit('input', value);
              !this.isValid && this.checkHtml5Validity();
            }
          },
          spanClasses: function spanClasses() {
            return [this.size, this.statusType, {
              'is-fullwidth': this.expanded,
              'is-loading': this.loading,
              'is-multiple': this.multiple,
              'is-rounded': this.rounded,
              'is-empty': this.selected === null
            }];
          }
        },
        watch: {
          /**
          * When v-model is changed:
          *   1. Set the selected option.
          *   2. If it's invalid, validate again.
          */
          value: function value(_value) {
            this.selected = _value;
            !this.isValid && this.checkHtml5Validity();
          }
        }
      };
      /***/
    },
    /* 138 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "control",
            class: {
              'is-expanded': _vm.expanded,
              'has-icons-left': _vm.icon
            }
          }, [_c('span', {
            staticClass: "select",
            class: _vm.spanClasses
          }, [_c('select', _vm._b({
            directives: [{
              name: "model",
              rawName: "v-model",
              value: _vm.computedValue,
              expression: "computedValue"
            }],
            ref: "select",
            attrs: {
              "multiple": _vm.multiple,
              "size": _vm.nativeSize
            },
            on: {
              "blur": function ($event) {
                _vm.$emit('blur', $event) && _vm.checkHtml5Validity();
              },
              "focus": function ($event) {
                _vm.$emit('focus', $event);
              },
              "change": function ($event) {
                var $$selectedVal = Array.prototype.filter.call($event.target.options, function (o) {
                  return o.selected;
                }).map(function (o) {
                  var val = "_value" in o ? o._value : o.value;
                  return val;
                });
                _vm.computedValue = $event.target.multiple ? $$selectedVal : $$selectedVal[0];
              }
            }
          }, 'select', _vm.$attrs, false), [_vm.placeholder ? [_vm.computedValue == null ? _c('option', {
            attrs: {
              "disabled": "",
              "hidden": ""
            },
            domProps: {
              "value": null
            }
          }, [_vm._v("\n                    " + _vm._s(_vm.placeholder) + "\n                ")]) : _vm._e()] : _vm._e(), _vm._v(" "), _vm._t("default")], 2)]), _vm._v(" "), _vm.icon ? _c('b-icon', {
            staticClass: "is-left",
            attrs: {
              "icon": _vm.icon,
              "pack": _vm.iconPack,
              "size": _vm.iconSize
            }
          }) : _vm._e()], 1);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 139 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(140),
      /* template */
      __webpack_require__(144),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 140 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__DatepickerTableRow__ = __webpack_require__(141);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__DatepickerTableRow___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__DatepickerTableRow__); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BDatepickerTable',
        components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__DatepickerTableRow___default.a.name, __WEBPACK_IMPORTED_MODULE_1__DatepickerTableRow___default.a),
        props: {
          value: Date,
          dayNames: Array,
          monthNames: Array,
          firstDayOfWeek: Number,
          events: Array,
          indicators: String,
          minDate: Date,
          maxDate: Date,
          focused: Object,
          disabled: Boolean,
          dateCreator: Function,
          unselectableDates: Array,
          unselectableDaysOfWeek: Array,
          selectableDates: Array,
          nearbyMonthDays: Boolean,
          nearbySelectableMonthDays: Boolean
        },
        computed: {
          visibleDayNames: function visibleDayNames() {
            var visibleDayNames = [];
            var index = this.firstDayOfWeek;

            while (visibleDayNames.length < this.dayNames.length) {
              var currentDayName = this.dayNames[index % this.dayNames.length];
              visibleDayNames.push(currentDayName);
              index++;
            }

            return visibleDayNames;
          },
          hasEvents: function hasEvents() {
            return this.events && this.events.length;
          },

          /*
          * Return array of all events in the specified month
          */
          eventsInThisMonth: function eventsInThisMonth() {
            if (!this.events) return [];
            var monthEvents = [];

            for (var i = 0; i < this.events.length; i++) {
              var event = this.events[i];

              if (!event.hasOwnProperty('date')) {
                event = {
                  date: event
                };
              }

              if (!event.hasOwnProperty('type')) {
                event.type = 'is-primary';
              }

              if (event.date.getMonth() === this.focused.month && event.date.getFullYear() === this.focused.year) {
                monthEvents.push(event);
              }
            }

            return monthEvents;
          },

          /*
          * Return array of all weeks in the specified month
          */
          weeksInThisMonth: function weeksInThisMonth() {
            var month = this.focused.month;
            var year = this.focused.year;
            var weeksInThisMonth = [];
            var daysInThisMonth = new Date(year, month + 1, 0).getDate();
            var startingDay = 1;

            while (startingDay <= daysInThisMonth + 6) {
              var newWeek = this.weekBuilder(startingDay, month, year);
              var weekValid = false;
              newWeek.forEach(function (day) {
                if (day.getMonth() === month) {
                  weekValid = true;
                }
              });

              if (weekValid) {
                weeksInThisMonth.push(newWeek);
              }

              startingDay += 7;
            }

            return weeksInThisMonth;
          }
        },
        methods: {
          /*
          * Emit input event with selected date as payload for v-model in parent
          */
          updateSelectedDate: function updateSelectedDate(date) {
            this.$emit('input', date);
          },

          /*
          * Return array of all days in the week that the startingDate is within
          */
          weekBuilder: function weekBuilder(startingDate, month, year) {
            var thisMonth = new Date(year, month);
            var thisWeek = [];
            var dayOfWeek = new Date(year, month, startingDate).getDay();
            var end = dayOfWeek >= this.firstDayOfWeek ? dayOfWeek - this.firstDayOfWeek : 7 - this.firstDayOfWeek + dayOfWeek;
            var daysAgo = 1;

            for (var i = 0; i < end; i++) {
              thisWeek.unshift(new Date(thisMonth.getFullYear(), thisMonth.getMonth(), startingDate - daysAgo));
              daysAgo++;
            }

            thisWeek.push(new Date(year, month, startingDate));
            var daysForward = 1;

            while (thisWeek.length < 7) {
              thisWeek.push(new Date(year, month, startingDate + daysForward));
              daysForward++;
            }

            return thisWeek;
          },
          eventsInThisWeek: function eventsInThisWeek(week) {
            return this.eventsInThisMonth.filter(function (event) {
              var stripped = new Date(Date.parse(event.date));
              stripped.setHours(0);
              stripped.setMinutes(0);
              stripped.setSeconds(0);
              stripped.setMilliseconds(0);
              var timed = stripped.getTime();
              return week.some(function (weekDate) {
                return weekDate.getTime() === timed;
              });
            });
          }
        }
      };
      /***/
    },
    /* 141 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(142),
      /* template */
      __webpack_require__(143),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 142 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      }); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */

      __webpack_exports__["default"] = {
        name: 'BDatepickerTableRow',
        props: {
          selectedDate: Date,
          week: {
            type: Array,
            required: true
          },
          month: {
            type: Number,
            required: true
          },
          minDate: Date,
          maxDate: Date,
          disabled: Boolean,
          unselectableDates: Array,
          unselectableDaysOfWeek: Array,
          selectableDates: Array,
          events: Array,
          indicators: String,
          dateCreator: Function,
          nearbyMonthDays: Boolean,
          nearbySelectableMonthDays: Boolean
        },
        methods: {
          /*
          * Check that selected day is within earliest/latest params and
          * is within this month
          */
          selectableDate: function selectableDate(day) {
            var validity = [];

            if (this.minDate) {
              validity.push(day >= this.minDate);
            }

            if (this.maxDate) {
              validity.push(day <= this.maxDate);
            }

            if (this.nearbyMonthDays && !this.nearbySelectableMonthDays) {
              validity.push(day.getMonth() === this.month);
            }

            if (this.selectableDates) {
              for (var i = 0; i < this.selectableDates.length; i++) {
                var enabledDate = this.selectableDates[i];

                if (day.getDate() === enabledDate.getDate() && day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
                  return true;
                } else {
                  validity.push(false);
                }
              }
            }

            if (this.unselectableDates) {
              for (var _i = 0; _i < this.unselectableDates.length; _i++) {
                var disabledDate = this.unselectableDates[_i];
                validity.push(day.getDate() !== disabledDate.getDate() || day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth());
              }
            }

            if (this.unselectableDaysOfWeek) {
              for (var _i2 = 0; _i2 < this.unselectableDaysOfWeek.length; _i2++) {
                var dayOfWeek = this.unselectableDaysOfWeek[_i2];
                validity.push(day.getDay() !== dayOfWeek);
              }
            }

            return validity.indexOf(false) < 0;
          },

          /*
          * Emit select event with chosen date as payload
          */
          emitChosenDate: function emitChosenDate(day) {
            if (this.disabled) return;

            if (this.selectableDate(day)) {
              this.$emit('select', day);
            }
          },
          eventsDateMatch: function eventsDateMatch(day) {
            if (!this.events || !this.events.length) return false;
            var dayEvents = [];

            for (var i = 0; i < this.events.length; i++) {
              if (this.events[i].date.getDay() === day.getDay()) {
                dayEvents.push(this.events[i]);
              }
            }

            if (!dayEvents.length) {
              return false;
            }

            return dayEvents;
          },

          /*
          * Build classObject for cell using validations
          */
          classObject: function classObject(day) {
            function dateMatch(dateOne, dateTwo) {
              // if either date is null or undefined, return false
              if (!dateOne || !dateTwo) {
                return false;
              }

              return dateOne.getDate() === dateTwo.getDate() && dateOne.getFullYear() === dateTwo.getFullYear() && dateOne.getMonth() === dateTwo.getMonth();
            }

            return {
              'is-selected': dateMatch(day, this.selectedDate),
              'is-today': dateMatch(day, this.dateCreator()),
              'is-selectable': this.selectableDate(day) && !this.disabled,
              'is-unselectable': !this.selectableDate(day) || this.disabled,
              'is-invisible': !this.nearbyMonthDays && day.getMonth() !== this.month,
              'is-nearby': this.nearbySelectableMonthDays && day.getMonth() !== this.month
            };
          }
        }
      };
      /***/
    },
    /* 143 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "datepicker-row"
          }, [_vm._l(_vm.week, function (day, index) {
            return [_vm.selectableDate(day) && !_vm.disabled ? _c('a', {
              key: index,
              staticClass: "datepicker-cell",
              class: [_vm.classObject(day), {
                'has-event': _vm.eventsDateMatch(day)
              }, _vm.indicators],
              attrs: {
                "role": "button",
                "href": "#",
                "disabled": _vm.disabled
              },
              on: {
                "click": function ($event) {
                  $event.preventDefault();

                  _vm.emitChosenDate(day);
                },
                "keydown": [function ($event) {
                  if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
                    return null;
                  }

                  $event.preventDefault();

                  _vm.emitChosenDate(day);
                }, function ($event) {
                  if (!('button' in $event) && _vm._k($event.keyCode, "space", 32, $event.key)) {
                    return null;
                  }

                  $event.preventDefault();

                  _vm.emitChosenDate(day);
                }]
              }
            }, [_vm._v("\n            " + _vm._s(day.getDate()) + "\n            "), _vm.eventsDateMatch(day) ? _c('div', {
              staticClass: "events"
            }, _vm._l(_vm.eventsDateMatch(day), function (event, index) {
              return _c('div', {
                key: index,
                staticClass: "event",
                class: event.type
              });
            })) : _vm._e()]) : _c('div', {
              key: index,
              staticClass: "datepicker-cell",
              class: _vm.classObject(day)
            }, [_vm._v("\n            " + _vm._s(day.getDate()) + "\n        ")])];
          })], 2);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 144 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('section', {
            staticClass: "datepicker-table"
          }, [_c('header', {
            staticClass: "datepicker-header"
          }, _vm._l(_vm.visibleDayNames, function (day, index) {
            return _c('div', {
              key: index,
              staticClass: "datepicker-cell"
            }, [_vm._v("\n            " + _vm._s(day) + "\n        ")]);
          })), _vm._v(" "), _c('div', {
            staticClass: "datepicker-body",
            class: {
              'has-events': _vm.hasEvents
            }
          }, _vm._l(_vm.weeksInThisMonth, function (week, index) {
            return _c('b-datepicker-table-row', {
              key: index,
              attrs: {
                "selected-date": _vm.value,
                "week": week,
                "month": _vm.focused.month,
                "min-date": _vm.minDate,
                "max-date": _vm.maxDate,
                "disabled": _vm.disabled,
                "unselectable-dates": _vm.unselectableDates,
                "unselectable-days-of-week": _vm.unselectableDaysOfWeek,
                "selectable-dates": _vm.selectableDates,
                "events": _vm.eventsInThisWeek(week),
                "indicators": _vm.indicators,
                "date-creator": _vm.dateCreator,
                "nearby-month-days": _vm.nearbyMonthDays,
                "nearby-selectable-month-days": _vm.nearbySelectableMonthDays
              },
              on: {
                "select": _vm.updateSelectedDate
              }
            });
          }))]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 145 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(146),
      /* template */
      __webpack_require__(147),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 146 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      }); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */

      __webpack_exports__["default"] = {
        name: 'BDatepickerMonth',
        props: {
          value: Date,
          monthNames: Array,
          events: Array,
          indicators: String,
          minDate: Date,
          maxDate: Date,
          focused: Object,
          disabled: Boolean,
          dateCreator: Function,
          unselectableDates: Array,
          unselectableDaysOfWeek: Array,
          selectableDates: Array
        },
        computed: {
          hasEvents: function hasEvents() {
            return this.events && this.events.length;
          },

          /*
          * Return array of all events in the specified month
          */
          eventsInThisYear: function eventsInThisYear() {
            if (!this.events) return [];
            var yearEvents = [];

            for (var i = 0; i < this.events.length; i++) {
              var event = this.events[i];

              if (!event.hasOwnProperty('date')) {
                event = {
                  date: event
                };
              }

              if (!event.hasOwnProperty('type')) {
                event.type = 'is-primary';
              }

              if (event.date.getFullYear() === this.focused.year) {
                yearEvents.push(event);
              }
            }

            return yearEvents;
          },
          monthDates: function monthDates() {
            var year = this.focused.year;
            var months = [];

            for (var i = 0; i < 12; i++) {
              var d = new Date(year, i, 1);
              d.setHours(0, 0, 0, 0);
              months.push(d);
            }

            return months;
          }
        },
        methods: {
          selectableDate: function selectableDate(day) {
            var validity = [];

            if (this.minDate) {
              validity.push(day >= this.minDate);
            }

            if (this.maxDate) {
              validity.push(day <= this.maxDate);
            }

            validity.push(day.getFullYear() === this.focused.year);

            if (this.selectableDates) {
              for (var i = 0; i < this.selectableDates.length; i++) {
                var enabledDate = this.selectableDates[i];

                if (day.getFullYear() === enabledDate.getFullYear() && day.getMonth() === enabledDate.getMonth()) {
                  return true;
                } else {
                  validity.push(false);
                }
              }
            }

            if (this.unselectableDates) {
              for (var _i = 0; _i < this.unselectableDates.length; _i++) {
                var disabledDate = this.unselectableDates[_i];
                validity.push(day.getFullYear() !== disabledDate.getFullYear() || day.getMonth() !== disabledDate.getMonth());
              }
            }

            if (this.unselectableDaysOfWeek) {
              for (var _i2 = 0; _i2 < this.unselectableDaysOfWeek.length; _i2++) {
                var dayOfWeek = this.unselectableDaysOfWeek[_i2];
                validity.push(day.getDay() !== dayOfWeek);
              }
            }

            return validity.indexOf(false) < 0;
          },
          eventsDateMatch: function eventsDateMatch(day) {
            if (!this.eventsInThisYear.length) return false;
            var monthEvents = [];

            for (var i = 0; i < this.eventsInThisYear.length; i++) {
              if (this.eventsInThisYear[i].date.getMonth() === day.getMonth()) {
                monthEvents.push(this.events[i]);
              }
            }

            if (!monthEvents.length) {
              return false;
            }

            return monthEvents;
          },

          /*
          * Build classObject for cell using validations
          */
          classObject: function classObject(day) {
            function dateMatch(dateOne, dateTwo) {
              // if either date is null or undefined, return false
              if (!dateOne || !dateTwo) {
                return false;
              }

              return dateOne.getFullYear() === dateTwo.getFullYear() && dateOne.getMonth() === dateTwo.getMonth();
            }

            return {
              'is-selected': dateMatch(day, this.value),
              'is-today': dateMatch(day, this.dateCreator()),
              'is-selectable': this.selectableDate(day) && !this.disabled,
              'is-unselectable': !this.selectableDate(day) || this.disabled
            };
          },

          /*
          * Emit select event with chosen date as payload
          */
          emitChosenDate: function emitChosenDate(day) {
            if (this.disabled) return;

            if (this.selectableDate(day)) {
              this.$emit('input', day);
            }
          }
        }
      };
      /***/
    },
    /* 147 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('section', {
            staticClass: "datepicker-table"
          }, [_c('div', {
            staticClass: "datepicker-body",
            class: {
              'has-events': _vm.hasEvents
            }
          }, [_c('div', {
            staticClass: "datepicker-months"
          }, [_vm._l(_vm.monthDates, function (date, index) {
            return [_vm.selectableDate(date) && !_vm.disabled ? _c('a', {
              key: index,
              staticClass: "datepicker-cell",
              class: [_vm.classObject(date), {
                'has-event': _vm.eventsDateMatch(date)
              }, _vm.indicators],
              attrs: {
                "role": "button",
                "href": "#",
                "disabled": _vm.disabled
              },
              on: {
                "click": function ($event) {
                  $event.preventDefault();

                  _vm.emitChosenDate(date);
                },
                "keydown": [function ($event) {
                  if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
                    return null;
                  }

                  $event.preventDefault();

                  _vm.emitChosenDate(date);
                }, function ($event) {
                  if (!('button' in $event) && _vm._k($event.keyCode, "space", 32, $event.key)) {
                    return null;
                  }

                  $event.preventDefault();

                  _vm.emitChosenDate(date);
                }]
              }
            }, [_vm._v("\n                    " + _vm._s(_vm.monthNames[date.getMonth()]) + "\n                    "), _vm.eventsDateMatch(date) ? _c('div', {
              staticClass: "events"
            }, _vm._l(_vm.eventsDateMatch(date), function (event, index) {
              return _c('div', {
                key: index,
                staticClass: "event",
                class: event.type
              });
            })) : _vm._e()]) : _c('div', {
              key: index,
              staticClass: "datepicker-cell",
              class: _vm.classObject(date)
            }, [_vm._v("\n                    " + _vm._s(_vm.monthNames[date.getMonth()]) + "\n                ")])];
          })], 2)])]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 148 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "datepicker control",
            class: [_vm.size, {
              'is-expanded': _vm.expanded
            }]
          }, [!_vm.isMobile || _vm.inline ? _c('b-dropdown', {
            ref: "dropdown",
            attrs: {
              "position": _vm.position,
              "disabled": _vm.disabled,
              "inline": _vm.inline
            }
          }, [!_vm.inline ? _c('b-input', _vm._b({
            ref: "input",
            attrs: {
              "slot": "trigger",
              "autocomplete": "off",
              "value": _vm.formatValue(_vm.computedValue),
              "placeholder": _vm.placeholder,
              "size": _vm.size,
              "icon": _vm.icon,
              "icon-pack": _vm.iconPack,
              "rounded": _vm.rounded,
              "loading": _vm.loading,
              "disabled": _vm.disabled,
              "readonly": !_vm.editable,
              "use-html5-validation": _vm.useHtml5Validation
            },
            on: {
              "focus": _vm.handleOnFocus,
              "blur": _vm.onBlur
            },
            nativeOn: {
              "click": function ($event) {
                _vm.onInputClick($event);
              },
              "keyup": function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
                  return null;
                }

                _vm.togglePicker(true);
              },
              "change": function ($event) {
                _vm.onChange($event.target.value);
              }
            },
            slot: "trigger"
          }, 'b-input', _vm.$attrs, false)) : _vm._e(), _vm._v(" "), _c('b-dropdown-item', {
            attrs: {
              "disabled": _vm.disabled,
              "custom": ""
            }
          }, [_c('header', {
            staticClass: "datepicker-header"
          }, [_vm.$slots.header !== undefined && _vm.$slots.header.length ? [_vm._t("header")] : _c('div', {
            staticClass: "pagination field is-centered",
            class: _vm.size
          }, [_c('a', {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: !_vm.showPrev && !_vm.disabled,
              expression: "!showPrev && !disabled"
            }],
            staticClass: "pagination-previous",
            attrs: {
              "role": "button",
              "href": "#",
              "disabled": _vm.disabled
            },
            on: {
              "click": function ($event) {
                $event.preventDefault();

                _vm.prev($event);
              },
              "keydown": [function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
                  return null;
                }

                $event.preventDefault();

                _vm.prev($event);
              }, function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "space", 32, $event.key)) {
                  return null;
                }

                $event.preventDefault();

                _vm.prev($event);
              }]
            }
          }, [_c('b-icon', {
            attrs: {
              "icon": "chevron-left",
              "pack": _vm.iconPack,
              "both": "",
              "type": "is-primary is-clickable"
            }
          })], 1), _vm._v(" "), _c('a', {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: !_vm.showNext && !_vm.disabled,
              expression: "!showNext && !disabled"
            }],
            staticClass: "pagination-next",
            attrs: {
              "role": "button",
              "href": "#",
              "disabled": _vm.disabled
            },
            on: {
              "click": function ($event) {
                $event.preventDefault();

                _vm.next($event);
              },
              "keydown": [function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
                  return null;
                }

                $event.preventDefault();

                _vm.next($event);
              }, function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "space", 32, $event.key)) {
                  return null;
                }

                $event.preventDefault();

                _vm.next($event);
              }]
            }
          }, [_c('b-icon', {
            attrs: {
              "icon": "chevron-right",
              "pack": _vm.iconPack,
              "both": "",
              "type": "is-primary is-clickable"
            }
          })], 1), _vm._v(" "), _c('div', {
            staticClass: "pagination-list"
          }, [_c('b-field', [!_vm.isTypeMonth ? _c('b-select', {
            attrs: {
              "disabled": _vm.disabled,
              "size": _vm.size
            },
            model: {
              value: _vm.focusedDateData.month,
              callback: function ($$v) {
                _vm.$set(_vm.focusedDateData, "month", $$v);
              },
              expression: "focusedDateData.month"
            }
          }, _vm._l(_vm.monthNames, function (month, index) {
            return _c('option', {
              key: month,
              domProps: {
                "value": index
              }
            }, [_vm._v("\n                                    " + _vm._s(month) + "\n                                ")]);
          })) : _vm._e(), _vm._v(" "), _c('b-select', {
            attrs: {
              "disabled": _vm.disabled,
              "size": _vm.size
            },
            model: {
              value: _vm.focusedDateData.year,
              callback: function ($$v) {
                _vm.$set(_vm.focusedDateData, "year", $$v);
              },
              expression: "focusedDateData.year"
            }
          }, _vm._l(_vm.listOfYears, function (year) {
            return _c('option', {
              key: year,
              domProps: {
                "value": year
              }
            }, [_vm._v("\n                                    " + _vm._s(year) + "\n                                ")]);
          }))], 1)], 1)])], 2), _vm._v(" "), !_vm.isTypeMonth ? _c('div', {
            staticClass: "datepicker-content"
          }, [_c('b-datepicker-table', {
            attrs: {
              "day-names": _vm.dayNames,
              "month-names": _vm.monthNames,
              "first-day-of-week": _vm.firstDayOfWeek,
              "min-date": _vm.minDate,
              "max-date": _vm.maxDate,
              "focused": _vm.focusedDateData,
              "disabled": _vm.disabled,
              "unselectable-dates": _vm.unselectableDates,
              "unselectable-days-of-week": _vm.unselectableDaysOfWeek,
              "selectable-dates": _vm.selectableDates,
              "events": _vm.events,
              "indicators": _vm.indicators,
              "date-creator": _vm.dateCreator,
              "type-month": _vm.isTypeMonth,
              "nearby-month-days": _vm.nearbyMonthDays,
              "nearby-selectable-month-days": _vm.nearbySelectableMonthDays
            },
            on: {
              "close": function ($event) {
                _vm.togglePicker(false);
              }
            },
            model: {
              value: _vm.computedValue,
              callback: function ($$v) {
                _vm.computedValue = $$v;
              },
              expression: "computedValue"
            }
          })], 1) : _c('div', [_c('b-datepicker-month', {
            attrs: {
              "month-names": _vm.monthNames,
              "min-date": _vm.minDate,
              "max-date": _vm.maxDate,
              "focused": _vm.focusedDateData,
              "disabled": _vm.disabled,
              "unselectable-dates": _vm.unselectableDates,
              "unselectable-days-of-week": _vm.unselectableDaysOfWeek,
              "selectable-dates": _vm.selectableDates,
              "events": _vm.events,
              "indicators": _vm.indicators,
              "date-creator": _vm.dateCreator
            },
            on: {
              "close": function ($event) {
                _vm.togglePicker(false);
              }
            },
            model: {
              value: _vm.computedValue,
              callback: function ($$v) {
                _vm.computedValue = $$v;
              },
              expression: "computedValue"
            }
          })], 1), _vm._v(" "), _vm.$slots.default !== undefined && _vm.$slots.default.length ? _c('footer', {
            staticClass: "datepicker-footer"
          }, [_vm._t("default")], 2) : _vm._e()])], 1) : _c('b-input', _vm._b({
            ref: "input",
            attrs: {
              "type": !_vm.isTypeMonth ? 'date' : 'month',
              "autocomplete": "off",
              "value": _vm.formatNative(_vm.computedValue),
              "placeholder": _vm.placeholder,
              "size": _vm.size,
              "icon": _vm.icon,
              "icon-pack": _vm.iconPack,
              "loading": _vm.loading,
              "max": _vm.formatNative(_vm.maxDate),
              "min": _vm.formatNative(_vm.minDate),
              "disabled": _vm.disabled,
              "readonly": false,
              "use-html5-validation": _vm.useHtml5Validation
            },
            on: {
              "focus": _vm.handleOnFocus,
              "blur": _vm.onBlur
            },
            nativeOn: {
              "change": function ($event) {
                _vm.onChangeNativePicker($event);
              }
            }
          }, 'b-input', _vm.$attrs, false))], 1);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 149 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(150),
      /* template */
      __webpack_require__(153),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 150 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__modal_Modal__ = __webpack_require__(63);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__modal_Modal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__modal_Modal__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__utils_config__ = __webpack_require__(2);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__utils_helpers__ = __webpack_require__(7); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BDialog',
        components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a),
        extends: __WEBPACK_IMPORTED_MODULE_2__modal_Modal___default.a,
        props: {
          title: String,
          message: String,
          icon: String,
          iconPack: String,
          hasIcon: Boolean,
          type: {
            type: String,
            default: 'is-primary'
          },
          size: String,
          confirmText: {
            type: String,
            default: function _default() {
              return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
              /* default */
              ].defaultDialogConfirmText ? __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
              /* default */
              ].defaultDialogConfirmText : 'OK';
            }
          },
          cancelText: {
            type: String,
            default: function _default() {
              return __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
              /* default */
              ].defaultDialogCancelText ? __WEBPACK_IMPORTED_MODULE_3__utils_config__["a"
              /* default */
              ].defaultDialogCancelText : 'Cancel';
            }
          },
          hasInput: Boolean,
          // Used internally to know if it's prompt
          inputAttrs: {
            type: Object,
            default: function _default() {
              return {};
            }
          },
          onConfirm: {
            type: Function,
            default: function _default() {}
          },
          focusOn: {
            type: String,
            default: 'confirm'
          }
        },
        data: function data() {
          var prompt = this.hasInput ? this.inputAttrs.value || '' : '';
          return {
            prompt: prompt,
            isActive: false,
            validationMessage: ''
          };
        },
        computed: {
          /**
          * Icon name (MDI) based on the type.
          */
          iconByType: function iconByType() {
            switch (this.type) {
              case 'is-info':
                return 'information';

              case 'is-success':
                return 'check-circle';

              case 'is-warning':
                return 'alert';

              case 'is-danger':
                return 'alert-circle';

              default:
                return null;
            }
          },
          showCancel: function showCancel() {
            return this.cancelOptions.indexOf('button') >= 0;
          }
        },
        methods: {
          /**
          * If it's a prompt Dialog, validate the input.
          * Call the onConfirm prop (function) and close the Dialog.
          */
          confirm: function confirm() {
            var _this = this;

            if (this.$refs.input !== undefined) {
              if (!this.$refs.input.checkValidity()) {
                this.validationMessage = this.$refs.input.validationMessage;
                this.$nextTick(function () {
                  return _this.$refs.input.select();
                });
                return;
              }
            }

            this.onConfirm(this.prompt);
            this.close();
          },

          /**
          * Close the Dialog.
          */
          close: function close() {
            var _this2 = this;

            this.isActive = false; // Timeout for the animation complete before destroying

            setTimeout(function () {
              _this2.$destroy();

              Object(__WEBPACK_IMPORTED_MODULE_4__utils_helpers__["d"
              /* removeElement */
              ])(_this2.$el);
            }, 150);
          }
        },
        beforeMount: function beforeMount() {
          var _this3 = this; // Insert the Dialog component in body tag


          this.$nextTick(function () {
            document.body.appendChild(_this3.$el);
          });
        },
        mounted: function mounted() {
          var _this4 = this;

          this.isActive = true;

          if (typeof this.inputAttrs.required === 'undefined') {
            this.$set(this.inputAttrs, 'required', true);
          }

          this.$nextTick(function () {
            // Handle which element receives focus
            if (_this4.hasInput) {
              _this4.$refs.input.focus();
            } else if (_this4.focusOn === 'cancel' && _this4.showCancel) {
              _this4.$refs.cancelButton.focus();
            } else {
              _this4.$refs.confirmButton.focus();
            }
          });
        }
      };
      /***/
    },
    /* 151 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__utils_helpers__ = __webpack_require__(7);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__utils_config__ = __webpack_require__(2); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BModal',
        props: {
          active: Boolean,
          component: [Object, Function],
          content: String,
          programmatic: Boolean,
          props: Object,
          events: Object,
          width: {
            type: [String, Number],
            default: 960
          },
          hasModalCard: Boolean,
          animation: {
            type: String,
            default: 'zoom-out'
          },
          canCancel: {
            type: [Array, Boolean],
            default: function _default() {
              return __WEBPACK_IMPORTED_MODULE_1__utils_config__["a"
              /* default */
              ].defaultModalCanCancel;
            }
          },
          onCancel: {
            type: Function,
            default: function _default() {}
          },
          scroll: {
            type: String,
            default: function _default() {
              return __WEBPACK_IMPORTED_MODULE_1__utils_config__["a"
              /* default */
              ].defaultModalScroll ? __WEBPACK_IMPORTED_MODULE_1__utils_config__["a"
              /* default */
              ].defaultModalScroll : 'clip';
            },
            validator: function validator(value) {
              return ['clip', 'keep'].indexOf(value) >= 0;
            }
          },
          fullScreen: Boolean,
          customClass: String
        },
        data: function data() {
          return {
            isActive: this.active || false,
            savedScrollTop: null,
            newWidth: typeof this.width === 'number' ? this.width + 'px' : this.width
          };
        },
        computed: {
          cancelOptions: function cancelOptions() {
            return typeof this.canCancel === 'boolean' ? this.canCancel ? __WEBPACK_IMPORTED_MODULE_1__utils_config__["a"
            /* default */
            ].defaultModalCanCancel : [] : this.canCancel;
          },
          showX: function showX() {
            return this.cancelOptions.indexOf('x') >= 0;
          },
          customStyle: function customStyle() {
            if (!this.fullScreen) {
              return {
                maxWidth: this.newWidth
              };
            }

            return null;
          }
        },
        watch: {
          active: function active(value) {
            this.isActive = value;
          },
          isActive: function isActive() {
            this.handleScroll();
          }
        },
        methods: {
          handleScroll: function handleScroll() {
            if (typeof window === 'undefined') return;

            if (this.scroll === 'clip') {
              if (this.isActive) {
                document.documentElement.classList.add('is-clipped');
              } else {
                document.documentElement.classList.remove('is-clipped');
              }

              return;
            }

            this.savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;

            if (this.isActive) {
              document.body.classList.add('is-noscroll');
            } else {
              document.body.classList.remove('is-noscroll');
            }

            if (this.isActive) {
              document.body.style.top = '-' + this.savedScrollTop + 'px';
              return;
            }

            document.documentElement.scrollTop = this.savedScrollTop;
            document.body.style.top = null;
            this.savedScrollTop = null;
          },

          /**
          * Close the Modal if canCancel and call the onCancel prop (function).
          */
          cancel: function cancel(method) {
            if (this.cancelOptions.indexOf(method) < 0) return;
            this.onCancel.apply(null, arguments);
            this.close();
          },

          /**
          * Call the onCancel prop (function).
          * Emit events, and destroy modal if it's programmatic.
          */
          close: function close() {
            var _this = this;

            this.$emit('close');
            this.$emit('update:active', false); // Timeout for the animation complete before destroying

            if (this.programmatic) {
              this.isActive = false;
              setTimeout(function () {
                _this.$destroy();

                Object(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["d"
                /* removeElement */
                ])(_this.$el);
              }, 150);
            }
          },

          /**
          * Keypress event that is bound to the document.
          */
          keyPress: function keyPress(event) {
            // Esc key
            if (this.isActive && event.keyCode === 27) this.cancel('escape');
          }
        },
        created: function created() {
          if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress);
          }
        },
        beforeMount: function beforeMount() {
          // Insert the Modal component in body tag
          // only if it's programmatic
          this.programmatic && document.body.appendChild(this.$el);
        },
        mounted: function mounted() {
          if (this.programmatic) this.isActive = true;else if (this.isActive) this.handleScroll();
        },
        beforeDestroy: function beforeDestroy() {
          if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress); // reset scroll

            document.documentElement.classList.remove('is-clipped');
            var savedScrollTop = !this.savedScrollTop ? document.documentElement.scrollTop : this.savedScrollTop;
            document.body.classList.remove('is-noscroll');
            document.documentElement.scrollTop = savedScrollTop;
            document.body.style.top = null;
          }
        }
      };
      /***/
    },
    /* 152 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('transition', {
            attrs: {
              "name": _vm.animation
            }
          }, [_vm.isActive ? _c('div', {
            staticClass: "modal is-active",
            class: [{
              'is-full-screen': _vm.fullScreen
            }, _vm.customClass]
          }, [_c('div', {
            staticClass: "modal-background",
            on: {
              "click": function ($event) {
                _vm.cancel('outside');
              }
            }
          }), _vm._v(" "), _c('div', {
            staticClass: "animation-content",
            class: {
              'modal-content': !_vm.hasModalCard
            },
            style: _vm.customStyle
          }, [_vm.component ? _c(_vm.component, _vm._g(_vm._b({
            tag: "component",
            on: {
              "close": _vm.close
            }
          }, 'component', _vm.props, false), _vm.events)) : _vm.content ? _c('div', {
            domProps: {
              "innerHTML": _vm._s(_vm.content)
            }
          }) : _vm._t("default")], 2), _vm._v(" "), _vm.showX ? _c('button', {
            staticClass: "modal-close is-large",
            attrs: {
              "type": "button"
            },
            on: {
              "click": function ($event) {
                _vm.cancel('x');
              }
            }
          }) : _vm._e()]) : _vm._e()]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 153 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('transition', {
            attrs: {
              "name": _vm.animation
            }
          }, [_vm.isActive ? _c('div', {
            staticClass: "dialog modal is-active",
            class: _vm.size
          }, [_c('div', {
            staticClass: "modal-background",
            on: {
              "click": function ($event) {
                _vm.cancel('outside');
              }
            }
          }), _vm._v(" "), _c('div', {
            staticClass: "modal-card animation-content"
          }, [_vm.title ? _c('header', {
            staticClass: "modal-card-head"
          }, [_c('p', {
            staticClass: "modal-card-title"
          }, [_vm._v(_vm._s(_vm.title))])]) : _vm._e(), _vm._v(" "), _c('section', {
            staticClass: "modal-card-body",
            class: {
              'is-titleless': !_vm.title,
              'is-flex': _vm.hasIcon
            }
          }, [_c('div', {
            staticClass: "media"
          }, [_vm.hasIcon ? _c('div', {
            staticClass: "media-left"
          }, [_c('b-icon', {
            attrs: {
              "icon": _vm.icon ? _vm.icon : _vm.iconByType,
              "pack": _vm.iconPack,
              "type": _vm.type,
              "both": !_vm.icon,
              "size": "is-large"
            }
          })], 1) : _vm._e(), _vm._v(" "), _c('div', {
            staticClass: "media-content"
          }, [_c('p', {
            domProps: {
              "innerHTML": _vm._s(_vm.message)
            }
          }), _vm._v(" "), _vm.hasInput ? _c('div', {
            staticClass: "field"
          }, [_c('div', {
            staticClass: "control"
          }, [_c('input', _vm._b({
            directives: [{
              name: "model",
              rawName: "v-model",
              value: _vm.prompt,
              expression: "prompt"
            }],
            ref: "input",
            staticClass: "input",
            class: {
              'is-danger': _vm.validationMessage
            },
            domProps: {
              "value": _vm.prompt
            },
            on: {
              "keyup": function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
                  return null;
                }

                _vm.confirm($event);
              },
              "input": function ($event) {
                if ($event.target.composing) {
                  return;
                }

                _vm.prompt = $event.target.value;
              }
            }
          }, 'input', _vm.inputAttrs, false))]), _vm._v(" "), _c('p', {
            staticClass: "help is-danger"
          }, [_vm._v(_vm._s(_vm.validationMessage))])]) : _vm._e()])])]), _vm._v(" "), _c('footer', {
            staticClass: "modal-card-foot"
          }, [_vm.showCancel ? _c('button', {
            ref: "cancelButton",
            staticClass: "button",
            on: {
              "click": function ($event) {
                _vm.cancel('button');
              }
            }
          }, [_vm._v("\n                    " + _vm._s(_vm.cancelText) + "\n                ")]) : _vm._e(), _vm._v(" "), _c('button', {
            ref: "confirmButton",
            staticClass: "button",
            class: _vm.type,
            on: {
              "click": _vm.confirm
            }
          }, [_vm._v("\n                    " + _vm._s(_vm.confirmText) + "\n                ")])])])]) : _vm._e()]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 154 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(155),
      /* template */
      __webpack_require__(156),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 155 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__utils_helpers__ = __webpack_require__(7);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__utils_ssr__ = __webpack_require__(64); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BLoading',
        props: {
          active: Boolean,
          programmatic: Boolean,
          container: [Object, Function, __WEBPACK_IMPORTED_MODULE_1__utils_ssr__["b"
          /* HTMLElement */
          ]],
          isFullPage: {
            type: Boolean,
            default: true
          },
          animation: {
            type: String,
            default: 'fade'
          },
          canCancel: {
            type: Boolean,
            default: false
          },
          onCancel: {
            type: Function,
            default: function _default() {}
          }
        },
        data: function data() {
          return {
            isActive: this.active || false
          };
        },
        watch: {
          active: function active(value) {
            this.isActive = value;
          }
        },
        methods: {
          /**
          * Close the Modal if canCancel.
          */
          cancel: function cancel() {
            if (!this.canCancel || !this.isActive) return;
            this.close();
          },

          /**
          * Emit events, and destroy modal if it's programmatic.
          */
          close: function close() {
            var _this = this;

            this.onCancel.apply(null, arguments);
            this.$emit('close');
            this.$emit('update:active', false); // Timeout for the animation complete before destroying

            if (this.programmatic) {
              this.isActive = false;
              setTimeout(function () {
                _this.$destroy();

                Object(__WEBPACK_IMPORTED_MODULE_0__utils_helpers__["d"
                /* removeElement */
                ])(_this.$el);
              }, 150);
            }
          },

          /**
          * Keypress event that is bound to the document.
          */
          keyPress: function keyPress(event) {
            // Esc key
            if (event.keyCode === 27) this.cancel();
          }
        },
        created: function created() {
          if (typeof window !== 'undefined') {
            document.addEventListener('keyup', this.keyPress);
          }
        },
        beforeMount: function beforeMount() {
          // Insert the Loading component in body tag
          // only if it's programmatic
          if (this.programmatic) {
            if (!this.container) {
              document.body.appendChild(this.$el);
            } else {
              this.isFullPage = false;
              this.container.appendChild(this.$el);
            }
          }
        },
        mounted: function mounted() {
          if (this.programmatic) this.isActive = true;
        },
        beforeDestroy: function beforeDestroy() {
          if (typeof window !== 'undefined') {
            document.removeEventListener('keyup', this.keyPress);
          }
        }
      };
      /***/
    },
    /* 156 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('transition', {
            attrs: {
              "name": _vm.animation
            }
          }, [_vm.isActive ? _c('div', {
            staticClass: "loading-overlay is-active",
            class: {
              'is-full-page': _vm.isFullPage
            }
          }, [_c('div', {
            staticClass: "loading-background",
            on: {
              "click": _vm.cancel
            }
          }), _vm._v(" "), _vm._t("default", [_c('div', {
            staticClass: "loading-icon"
          })])], 2) : _vm._e()]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 157 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(158),
      /* template */
      __webpack_require__(159),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 158 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      }); //
      //
      //
      //
      //
      //

      /* harmony default export */

      __webpack_exports__["default"] = {
        name: 'BMenu'
      };
      /***/
    },
    /* 159 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "menu"
          }, [_vm._t("default")], 2);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 160 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(161),
      /* template */
      null,
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 161 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony default export */

      __webpack_exports__["default"] = {
        name: 'BMenuList',
        functional: true,
        props: {
          label: String,
          icon: String,
          iconPack: String
        },
        render: function render(createElement, context) {
          var vlabel = null;
          var slots = context.slots();

          if (context.props.label || slots.label) {
            vlabel = createElement('p', {
              attrs: {
                'class': 'menu-label'
              }
            }, context.props.label ? context.props.icon ? [createElement('b-icon', {
              props: {
                'icon': context.props.icon,
                'pack': context.props.iconPack,
                'size': 'is-small'
              }
            }), createElement('span', {}, context.props.label)] : context.props.label : slots.label);
          }

          var vnode = createElement('ul', {
            attrs: {
              'class': 'menu-list'
            }
          }, slots.default);
          return vlabel ? [vlabel, vnode] : vnode;
        }
      };
      /***/
    },
    /* 162 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(163),
      /* template */
      __webpack_require__(164),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 163 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BMenuItem',
        components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a),
        inheritAttrs: false,
        props: {
          label: String,
          active: Boolean,
          expanded: Boolean,
          disabled: Boolean,
          iconPack: String,
          icon: String,
          animation: {
            type: String,
            default: 'fade'
          },
          tag: {
            type: String,
            default: 'a',
            validator: function validator(value) {
              return ['a', 'router-link', 'nuxt-link', 'n-link', 'NuxtLink', 'NLink'].indexOf(value) >= 0;
            }
          }
        },
        data: function data() {
          return {
            newActive: this.active,
            newExpanded: this.expanded
          };
        },
        watch: {
          active: function active(value) {
            this.newActive = value;
          },
          expanded: function expanded(value) {
            this.newExpanded = value;
          }
        },
        methods: {
          onClick: function onClick(event) {
            if (this.disabled) return;
            this.reset(this.$parent);
            this.newExpanded = true;
            this.$emit('update:expanded', this.newActive);
            this.newActive = true;
            this.$emit('update:active', this.newActive);
            this.$emit('click', event);
          },
          reset: function reset(parent) {
            var _this = this;

            var items = parent.$children.filter(function (c) {
              return c.name === _this.name;
            });
            items.forEach(function (item) {
              if (item !== _this) {
                _this.reset(item);

                item.newExpanded = false;
                item.$emit('update:expanded', item.newActive);
                item.newActive = false;
                item.$emit('update:active', item.newActive);
              }
            });
          }
        }
      };
      /***/
    },
    /* 164 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('li', [_c(_vm.tag, _vm._b({
            tag: "component",
            class: {
              'is-active': _vm.newActive,
              'is-disabled': _vm.disabled
            },
            on: {
              "click": function ($event) {
                _vm.onClick($event);
              }
            }
          }, 'component', _vm.$attrs, false), [_vm.icon ? _c('b-icon', {
            attrs: {
              "icon": _vm.icon,
              "pack": _vm.iconPack,
              "size": "is-small"
            }
          }) : _vm._e(), _vm._v(" "), _vm.label ? _c('span', [_vm._v(_vm._s(_vm.label))]) : _vm._t("label", null, {
            expanded: _vm.newExpanded,
            active: _vm.newActive
          })], 2), _vm._v(" "), _vm.$slots.default ? [_c('transition', {
            attrs: {
              "name": _vm.animation
            }
          }, [_c('ul', {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: _vm.newExpanded,
              expression: "newExpanded"
            }]
          }, [_vm._t("default")], 2)])] : _vm._e()], 2);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 165 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(166),
      /* template */
      __webpack_require__(167),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 166 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__utils_MessageMixin_js__ = __webpack_require__(65); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BMessage',
        mixins: [__WEBPACK_IMPORTED_MODULE_0__utils_MessageMixin_js__["a"
        /* default */
        ]],
        props: {
          ariaCloseLabel: String
        },
        data: function data() {
          return {
            newIconSize: this.iconSize || this.size || 'is-large'
          };
        }
      };
      /***/
    },
    /* 167 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('transition', {
            attrs: {
              "name": "fade"
            }
          }, [_vm.isActive ? _c('article', {
            staticClass: "message",
            class: [_vm.type, _vm.size]
          }, [_vm.title ? _c('header', {
            staticClass: "message-header"
          }, [_c('p', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _vm.closable ? _c('button', {
            staticClass: "delete",
            attrs: {
              "type": "button",
              "aria-label": _vm.ariaCloseLabel
            },
            on: {
              "click": _vm.close
            }
          }) : _vm._e()]) : _vm._e(), _vm._v(" "), _c('section', {
            staticClass: "message-body"
          }, [_c('div', {
            staticClass: "media"
          }, [_vm.icon && _vm.hasIcon ? _c('div', {
            staticClass: "media-left"
          }, [_c('b-icon', {
            class: _vm.type,
            attrs: {
              "icon": _vm.icon,
              "pack": _vm.iconPack,
              "both": "",
              "size": _vm.newIconSize
            }
          })], 1) : _vm._e(), _vm._v(" "), _c('div', {
            staticClass: "media-content"
          }, [_vm._t("default")], 2)])])]) : _vm._e()]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 168 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(169),
      /* template */
      __webpack_require__(170),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 169 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__utils_MessageMixin_js__ = __webpack_require__(65); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BNotification',
        mixins: [__WEBPACK_IMPORTED_MODULE_0__utils_MessageMixin_js__["a"
        /* default */
        ]],
        props: {
          position: String,
          ariaCloseLabel: String
        }
      };
      /***/
    },
    /* 170 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('transition', {
            attrs: {
              "name": "fade"
            }
          }, [_c('article', {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: _vm.isActive,
              expression: "isActive"
            }],
            staticClass: "notification",
            class: [_vm.type, _vm.position]
          }, [_vm.closable ? _c('button', {
            staticClass: "delete",
            attrs: {
              "type": "button",
              "aria-label": _vm.ariaCloseLabel
            },
            on: {
              "click": _vm.close
            }
          }) : _vm._e(), _vm._v(" "), _c('div', {
            staticClass: "media"
          }, [_vm.icon && _vm.hasIcon ? _c('div', {
            staticClass: "media-left"
          }, [_c('b-icon', {
            attrs: {
              "icon": _vm.icon,
              "pack": _vm.iconPack,
              "both": "",
              "size": "is-large",
              "aria-hidden": ""
            }
          })], 1) : _vm._e(), _vm._v(" "), _c('div', {
            staticClass: "media-content"
          }, [_vm.message ? _c('p', {
            staticClass: "text",
            domProps: {
              "innerHTML": _vm._s(_vm.message)
            }
          }) : _vm._t("default")], 2)])])]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 171 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(172),
      /* template */
      __webpack_require__(173),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 172 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(2);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__utils_NoticeMixin_js__ = __webpack_require__(45); //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BNotificationNotice',
        mixins: [__WEBPACK_IMPORTED_MODULE_1__utils_NoticeMixin_js__["a"
        /* default */
        ]],
        props: {
          indefinite: {
            type: Boolean,
            default: false
          }
        },
        data: function data() {
          return {
            newDuration: this.duration || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a"
            /* default */
            ].defaultNotificationDuration
          };
        }
      };
      /***/
    },
    /* 173 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('b-notification', _vm._b({
            on: {
              "close": _vm.close
            }
          }, 'b-notification', _vm.$options.propsData, false));
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 174 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(175),
      /* template */
      __webpack_require__(176),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 175 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__input_Input__ = __webpack_require__(17);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__input_Input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__input_Input__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__utils_FormElementMixin__ = __webpack_require__(10);

      var _components; //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BNumberinput',
        components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2__input_Input___default.a.name, __WEBPACK_IMPORTED_MODULE_2__input_Input___default.a), _components),
        mixins: [__WEBPACK_IMPORTED_MODULE_3__utils_FormElementMixin__["a"
        /* default */
        ]],
        inheritAttrs: false,
        props: {
          value: Number,
          min: [Number, String],
          max: [Number, String],
          step: [Number, String],
          disabled: Boolean,
          type: {
            type: String,
            default: 'is-primary'
          },
          editable: {
            type: Boolean,
            default: true
          },
          controlsRounded: {
            type: Boolean,
            default: false
          },
          controlsPosition: String
        },
        data: function data() {
          return {
            newValue: !isNaN(this.value) ? this.value : parseFloat(this.min) || 0,
            newStep: this.step || 1,
            _elementRef: 'input'
          };
        },
        computed: {
          computedValue: {
            get: function get() {
              return this.newValue;
            },
            set: function set(value) {
              var newValue = value;

              if (value === '') {
                newValue = parseFloat(this.min) || 0;
              }

              this.newValue = newValue;
              this.$emit('input', newValue);
              !this.isValid && this.$refs.input.checkHtml5Validity();
            }
          },
          fieldClasses: function fieldClasses() {
            return [{
              'has-addons': this.controlsPosition === 'compact'
            }, {
              'is-grouped': this.controlsPosition !== 'compact'
            }];
          },
          buttonClasses: function buttonClasses() {
            return [this.type, this.size, {
              'is-rounded': this.controlsRounded
            }];
          },
          minNumber: function minNumber() {
            return typeof this.min === 'string' ? parseFloat(this.min) : this.min;
          },
          maxNumber: function maxNumber() {
            return typeof this.max === 'string' ? parseFloat(this.max) : this.max;
          },
          stepNumber: function stepNumber() {
            return typeof this.newStep === 'string' ? parseFloat(this.newStep) : this.newStep;
          },
          disabledMin: function disabledMin() {
            return this.computedValue - this.stepNumber < this.minNumber;
          },
          disabledMax: function disabledMax() {
            return this.computedValue + this.stepNumber > this.maxNumber;
          },
          stepDecimals: function stepDecimals() {
            var step = this.stepNumber.toString();
            var index = step.indexOf('.');

            if (index >= 0) {
              return step.substring(index + 1).length;
            }

            return 0;
          }
        },
        watch: {
          /**
          * When v-model is changed:
          *   1. Set internal value.
          */
          value: function value(_value) {
            this.newValue = _value;
          }
        },
        methods: {
          decrement: function decrement() {
            if (typeof this.minNumber === 'undefined' || this.computedValue - this.stepNumber >= this.minNumber) {
              var value = this.computedValue - this.stepNumber;
              this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
            }
          },
          increment: function increment() {
            if (typeof this.maxNumber === 'undefined' || this.computedValue + this.stepNumber <= this.maxNumber) {
              var value = this.computedValue + this.stepNumber;
              this.computedValue = parseFloat(value.toFixed(this.stepDecimals));
            }
          },
          onControlClick: function onControlClick(event, inc) {
            // IE 11 -> filter click event
            if (event.detail !== 0 || event.type === 'click') return;
            if (inc) this.increment();else this.decrement();
          },
          onStartLongPress: function onStartLongPress(event, inc) {
            var _this = this;

            if (event.button !== 0 && event.type !== 'touchstart') return;
            this._$intervalTime = new Date();
            clearInterval(this._$intervalRef);
            this._$intervalRef = setInterval(function () {
              if (inc) _this.increment();else _this.decrement();
            }, 250);
          },
          onStopLongPress: function onStopLongPress(inc) {
            if (!this._$intervalRef) return;
            var d = new Date();

            if (d - this._$intervalTime < 250) {
              if (inc) this.increment();else this.decrement();
            }

            clearInterval(this._$intervalRef);
            this._$intervalRef = null;
          }
        }
      };
      /***/
    },
    /* 176 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "b-numberinput field",
            class: _vm.fieldClasses
          }, [_c('p', {
            staticClass: "control",
            on: {
              "mouseup": function ($event) {
                _vm.onStopLongPress(false);
              },
              "mouseleave": function ($event) {
                _vm.onStopLongPress(false);
              },
              "touchend": function ($event) {
                _vm.onStopLongPress(false);
              },
              "touchcancel": function ($event) {
                _vm.onStopLongPress(false);
              }
            }
          }, [_c('button', {
            staticClass: "button",
            class: _vm.buttonClasses,
            attrs: {
              "type": "button",
              "disabled": _vm.disabled || _vm.disabledMin
            },
            on: {
              "mousedown": function ($event) {
                _vm.onStartLongPress($event, false);
              },
              "touchstart": function ($event) {
                $event.preventDefault();

                _vm.onStartLongPress($event, false);
              },
              "click": function ($event) {
                _vm.onControlClick($event, false);
              }
            }
          }, [_c('b-icon', {
            attrs: {
              "icon": "minus",
              "pack": _vm.iconPack,
              "size": _vm.iconSize
            }
          })], 1)]), _vm._v(" "), _c('b-input', _vm._b({
            ref: "input",
            attrs: {
              "type": "number",
              "step": _vm.newStep,
              "max": _vm.max,
              "min": _vm.min,
              "size": _vm.size,
              "disabled": _vm.disabled,
              "readonly": !_vm.editable,
              "loading": _vm.loading,
              "rounded": _vm.rounded,
              "icon": _vm.icon,
              "icon-pack": _vm.iconPack,
              "autocomplete": _vm.autocomplete,
              "expanded": _vm.expanded,
              "use-html5-validation": _vm.useHtml5Validation
            },
            on: {
              "focus": function ($event) {
                _vm.$emit('focus', $event);
              },
              "blur": function ($event) {
                _vm.$emit('blur', $event);
              }
            },
            model: {
              value: _vm.computedValue,
              callback: function ($$v) {
                _vm.computedValue = _vm._n($$v);
              },
              expression: "computedValue"
            }
          }, 'b-input', _vm.$attrs, false)), _vm._v(" "), _c('p', {
            staticClass: "control",
            on: {
              "mouseup": function ($event) {
                _vm.onStopLongPress(true);
              },
              "mouseleave": function ($event) {
                _vm.onStopLongPress(true);
              },
              "touchend": function ($event) {
                _vm.onStopLongPress(true);
              },
              "touchcancel": function ($event) {
                _vm.onStopLongPress(true);
              }
            }
          }, [_c('button', {
            staticClass: "button",
            class: _vm.buttonClasses,
            attrs: {
              "type": "button",
              "disabled": _vm.disabled || _vm.disabledMax
            },
            on: {
              "mousedown": function ($event) {
                _vm.onStartLongPress($event, true);
              },
              "touchstart": function ($event) {
                $event.preventDefault();

                _vm.onStartLongPress($event, true);
              },
              "click": function ($event) {
                _vm.onControlClick($event, true);
              }
            }
          }, [_c('b-icon', {
            attrs: {
              "icon": "plus",
              "pack": _vm.iconPack,
              "size": _vm.iconSize
            }
          })], 1)])], 1);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 177 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BPagination',
        components: __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()({}, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a),
        props: {
          total: [Number, String],
          perPage: {
            type: [Number, String],
            default: 20
          },
          current: {
            type: [Number, String],
            default: 1
          },
          size: String,
          simple: Boolean,
          rounded: Boolean,
          order: String,
          iconPack: String,
          ariaNextLabel: String,
          ariaPreviousLabel: String,
          ariaPageLabel: String,
          ariaCurrentLabel: String
        },
        computed: {
          rootClasses: function rootClasses() {
            return [this.order, this.size, {
              'is-simple': this.simple,
              'is-rounded': this.rounded
            }];
          },

          /**
          * Total page size (count).
          */
          pageCount: function pageCount() {
            return Math.ceil(this.total / this.perPage);
          },

          /**
          * First item of the page (count).
          */
          firstItem: function firstItem() {
            var firstItem = this.current * this.perPage - this.perPage + 1;
            return firstItem >= 0 ? firstItem : 0;
          },

          /**
          * Check if previous button is available.
          */
          hasPrev: function hasPrev() {
            return this.current > 1;
          },

          /**
          * Check if first page button should be visible.
          */
          hasFirst: function hasFirst() {
            return this.current >= 3;
          },

          /**
          * Check if first ellipsis should be visible.
          */
          hasFirstEllipsis: function hasFirstEllipsis() {
            return this.current >= 4;
          },

          /**
          * Check if last page button should be visible.
          */
          hasLast: function hasLast() {
            return this.current <= this.pageCount - 2;
          },

          /**
          * Check if last ellipsis should be visible.
          */
          hasLastEllipsis: function hasLastEllipsis() {
            return this.current < this.pageCount - 2 && this.current <= this.pageCount - 3;
          },

          /**
          * Check if next button is available.
          */
          hasNext: function hasNext() {
            return this.current < this.pageCount;
          },

          /**
          * Get near pages, 1 before and 1 after the current.
          * Also add the click event to the array.
          */
          pagesInRange: function pagesInRange() {
            var _this = this;

            if (this.simple) return;
            var left = Math.max(1, this.current - 1);
            var right = Math.min(this.current + 1, this.pageCount);
            var pages = [];

            var _loop = function _loop(i) {
              pages.push({
                number: i,
                isCurrent: _this.current === i,
                click: function click(event) {
                  if (_this.current === i) return;

                  _this.$emit('change', i);

                  _this.$emit('update:current', i); // Set focus on element to keep tab order


                  _this.$nextTick(function () {
                    return event.target.focus();
                  });
                }
              });
            };

            for (var i = left; i <= right; i++) {
              _loop(i);
            }

            return pages;
          }
        },
        watch: {
          /**
          * If current page is trying to be greater than page count, set to last.
          */
          pageCount: function pageCount(value) {
            if (this.current > value) this.last();
          }
        },
        methods: {
          /**
          * Previous button click listener.
          */
          prev: function prev() {
            if (!this.hasPrev) return;
            this.$emit('change', this.current - 1);
            this.$emit('update:current', this.current - 1);
          },

          /**
          * First button click listener.
          */
          first: function first() {
            this.$emit('change', 1);
            this.$emit('update:current', 1);
          },

          /**
          * Last button click listener.
          */
          last: function last() {
            this.$emit('change', this.pageCount);
            this.$emit('update:current', this.pageCount);
          },

          /**
          * Next button click listener.
          */
          next: function next() {
            if (!this.hasNext) return;
            this.$emit('change', this.current + 1);
            this.$emit('update:current', this.current + 1);
          },

          /**
          * Get text for aria-label according to page number.
          */
          getAriaPageLabel: function getAriaPageLabel(pageNumber, isCurrent) {
            if (this.ariaPageLabel && (!isCurrent || !this.ariaCurrentLabel)) {
              return this.ariaPageLabel + ' ' + pageNumber + '.';
            } else if (this.ariaPageLabel && isCurrent && this.ariaCurrentLabel) {
              return this.ariaCurrentLabel + ', ' + this.ariaPageLabel + ' ' + pageNumber + '.';
            }

            return null;
          }
        }
      };
      /***/
    },
    /* 178 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('nav', {
            staticClass: "pagination",
            class: _vm.rootClasses
          }, [_c('a', {
            staticClass: "pagination-previous",
            attrs: {
              "role": "button",
              "href": "#",
              "disabled": !_vm.hasPrev,
              "aria-label": _vm.ariaPreviousLabel
            },
            on: {
              "click": function ($event) {
                $event.preventDefault();

                _vm.prev($event);
              }
            }
          }, [_c('b-icon', {
            attrs: {
              "icon": "chevron-left",
              "pack": _vm.iconPack,
              "both": "",
              "aria-hidden": "true"
            }
          })], 1), _vm._v(" "), _c('a', {
            staticClass: "pagination-next",
            attrs: {
              "role": "button",
              "href": "#",
              "disabled": !_vm.hasNext,
              "aria-label": _vm.ariaNextLabel
            },
            on: {
              "click": function ($event) {
                $event.preventDefault();

                _vm.next($event);
              }
            }
          }, [_c('b-icon', {
            attrs: {
              "icon": "chevron-right",
              "pack": _vm.iconPack,
              "both": "",
              "aria-hidden": "true"
            }
          })], 1), _vm._v(" "), !_vm.simple ? _c('ul', {
            staticClass: "pagination-list"
          }, [_vm.hasFirst ? _c('li', [_c('a', {
            staticClass: "pagination-link",
            attrs: {
              "role": "button",
              "href": "#",
              "aria-label": _vm.getAriaPageLabel(1, false)
            },
            on: {
              "click": function ($event) {
                $event.preventDefault();

                _vm.first($event);
              }
            }
          }, [_vm._v("\n                1\n            ")])]) : _vm._e(), _vm._v(" "), _vm.hasFirstEllipsis ? _c('li', [_c('span', {
            staticClass: "pagination-ellipsis"
          }, [_vm._v("…")])]) : _vm._e(), _vm._v(" "), _vm._l(_vm.pagesInRange, function (page) {
            return _c('li', {
              key: page.number
            }, [_c('a', {
              staticClass: "pagination-link",
              class: {
                'is-current': page.isCurrent
              },
              attrs: {
                "role": "button",
                "href": "#",
                "aria-label": _vm.getAriaPageLabel(page.number, page.isCurrent),
                "aria-current": page.isCurrent
              },
              on: {
                "click": function ($event) {
                  $event.preventDefault();
                  page.click($event);
                }
              }
            }, [_vm._v("\n                " + _vm._s(page.number) + "\n            ")])]);
          }), _vm._v(" "), _vm.hasLastEllipsis ? _c('li', [_c('span', {
            staticClass: "pagination-ellipsis"
          }, [_vm._v("…")])]) : _vm._e(), _vm._v(" "), _vm.hasLast ? _c('li', [_c('a', {
            staticClass: "pagination-link",
            attrs: {
              "role": "button",
              "href": "#",
              "aria-label": _vm.getAriaPageLabel(_vm.pageCount, false)
            },
            on: {
              "click": function ($event) {
                $event.preventDefault();

                _vm.last($event);
              }
            }
          }, [_vm._v("\n                " + _vm._s(_vm.pageCount) + "\n            ")])]) : _vm._e()], 2) : _vm._e(), _vm._v(" "), _vm.simple ? _c('small', {
            staticClass: "info"
          }, [_vm.perPage == 1 ? [_vm._v("\n            " + _vm._s(_vm.firstItem) + " / " + _vm._s(_vm.total) + "\n        ")] : [_vm._v("\n            " + _vm._s(_vm.firstItem) + "-" + _vm._s(Math.min(_vm.current * _vm.perPage, _vm.total)) + " / " + _vm._s(_vm.total) + "\n        ")]], 2) : _vm._e()]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 179 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(180),
      /* template */
      __webpack_require__(181),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 180 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BRadio',
        props: {
          value: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
          nativeValue: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
          type: String,
          disabled: Boolean,
          required: Boolean,
          name: String,
          size: String
        },
        data: function data() {
          return {
            newValue: this.value
          };
        },
        computed: {
          computedValue: {
            get: function get() {
              return this.newValue;
            },
            set: function set(value) {
              this.newValue = value;
              this.$emit('input', value);
            }
          }
        },
        watch: {
          /**
          * When v-model change, set internal value.
          */
          value: function value(_value) {
            this.newValue = _value;
          }
        }
      };
      /***/
    },
    /* 181 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('label', {
            ref: "label",
            staticClass: "b-radio radio",
            class: [_vm.size, {
              'is-disabled': _vm.disabled
            }],
            attrs: {
              "disabled": _vm.disabled,
              "tabindex": _vm.disabled ? false : 0
            },
            on: {
              "keydown": function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key) && _vm._k($event.keyCode, "space", 32, $event.key)) {
                  return null;
                }

                $event.preventDefault();

                _vm.$refs.label.click();
              }
            }
          }, [_c('input', {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: _vm.computedValue,
              expression: "computedValue"
            }],
            attrs: {
              "tabindex": "-1",
              "type": "radio",
              "disabled": _vm.disabled,
              "required": _vm.required,
              "name": _vm.name
            },
            domProps: {
              "value": _vm.nativeValue,
              "checked": _vm._q(_vm.computedValue, _vm.nativeValue)
            },
            on: {
              "click": function ($event) {
                $event.stopPropagation();
              },
              "change": function ($event) {
                _vm.computedValue = _vm.nativeValue;
              }
            }
          }), _vm._v(" "), _c('span', {
            staticClass: "check",
            class: _vm.type
          }), _vm._v(" "), _c('span', {
            staticClass: "control-label"
          }, [_vm._t("default")], 2)]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 182 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(183),
      /* template */
      __webpack_require__(184),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 183 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BRadioButton',
        props: {
          value: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
          nativeValue: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
          type: {
            type: String,
            default: 'is-primary'
          },
          disabled: Boolean,
          required: Boolean,
          name: String,
          size: String
        },
        data: function data() {
          return {
            newValue: this.value
          };
        },
        computed: {
          computedValue: {
            get: function get() {
              return this.newValue;
            },
            set: function set(value) {
              this.newValue = value;
              this.$emit('input', value);
            }
          }
        },
        watch: {
          /**
          * When v-model change, set internal value.
          */
          value: function value(_value) {
            this.newValue = _value;
          }
        }
      };
      /***/
    },
    /* 184 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "control"
          }, [_c('label', {
            ref: "label",
            staticClass: "b-radio radio button",
            class: [_vm.newValue === _vm.nativeValue ? _vm.type : null, _vm.size],
            attrs: {
              "disabled": _vm.disabled,
              "tabindex": _vm.disabled ? false : 0
            },
            on: {
              "keydown": function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key) && _vm._k($event.keyCode, "space", 32, $event.key)) {
                  return null;
                }

                $event.preventDefault();

                _vm.$refs.label.click();
              }
            }
          }, [_vm._t("default"), _vm._v(" "), _c('input', {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: _vm.computedValue,
              expression: "computedValue"
            }],
            attrs: {
              "tabindex": "-1",
              "type": "radio",
              "disabled": _vm.disabled,
              "required": _vm.required,
              "name": _vm.name
            },
            domProps: {
              "value": _vm.nativeValue,
              "checked": _vm._q(_vm.computedValue, _vm.nativeValue)
            },
            on: {
              "click": function ($event) {
                $event.stopPropagation();
              },
              "change": function ($event) {
                _vm.computedValue = _vm.nativeValue;
              }
            }
          })], 2)]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 185 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(186),
      /* template */
      __webpack_require__(187),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 186 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(2);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__utils_NoticeMixin_js__ = __webpack_require__(45); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BSnackbar',
        mixins: [__WEBPACK_IMPORTED_MODULE_1__utils_NoticeMixin_js__["a"
        /* default */
        ]],
        props: {
          actionText: {
            type: String,
            default: 'OK'
          },
          onAction: {
            type: Function,
            default: function _default() {}
          },
          indefinite: {
            type: Boolean,
            default: false
          }
        },
        data: function data() {
          return {
            newDuration: this.duration || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a"
            /* default */
            ].defaultSnackbarDuration
          };
        },
        methods: {
          /**
          * Click listener.
          * Call action prop before closing (from Mixin).
          */
          action: function action() {
            this.onAction();
            this.close();
          }
        }
      };
      /***/
    },
    /* 187 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('transition', {
            attrs: {
              "enter-active-class": _vm.transition.enter,
              "leave-active-class": _vm.transition.leave
            }
          }, [_c('div', {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: _vm.isActive,
              expression: "isActive"
            }],
            staticClass: "snackbar",
            class: [_vm.type, _vm.position]
          }, [_c('div', {
            staticClass: "text",
            domProps: {
              "innerHTML": _vm._s(_vm.message)
            }
          }), _vm._v(" "), _vm.actionText ? _c('div', {
            staticClass: "action",
            class: _vm.type,
            on: {
              "click": _vm.action
            }
          }, [_c('button', {
            staticClass: "button"
          }, [_vm._v(_vm._s(_vm.actionText))])]) : _vm._e()])]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 188 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(189),
      /* template */
      __webpack_require__(190),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 189 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__utils_SlotComponent__ = __webpack_require__(67);

      var _components; //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BSteps',
        components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2__utils_SlotComponent__["a"
        /* default */
        ].name, __WEBPACK_IMPORTED_MODULE_2__utils_SlotComponent__["a"
        /* default */
        ]), _components),
        props: {
          value: Number,
          type: [String, Object],
          size: String,
          animated: {
            type: Boolean,
            default: true
          },
          destroyOnHide: {
            type: Boolean,
            default: false
          },
          iconPack: String,
          hasNavigation: {
            type: Boolean,
            default: true
          },
          ariaNextLabel: String,
          ariaPreviousLabel: String
        },
        data: function data() {
          return {
            activeStep: this.value || 0,
            stepItems: [],
            contentHeight: 0,
            isTransitioning: false,
            _isSteps: true // Used internally by StepItem

          };
        },
        computed: {
          mainClasses: function mainClasses() {
            return [this.type, this.size];
          },
          reversedStepItems: function reversedStepItems() {
            return this.stepItems.slice().reverse();
          },

          /**
              * Check the first visible step index.
              */
          firstVisibleStepIndex: function firstVisibleStepIndex() {
            return this.stepItems.findIndex(function (step, idx) {
              return step.visible;
            });
          },

          /**
              * Check if previous button is available.
              */
          hasPrev: function hasPrev() {
            return this.firstVisibleStepIndex >= 0 && this.activeStep > this.firstVisibleStepIndex;
          },

          /**
              * Check the last visible step index.
              */
          lastVisibleStepIndex: function lastVisibleStepIndex() {
            var idx = this.reversedStepItems.findIndex(function (step, idx) {
              return step.visible;
            });

            if (idx >= 0) {
              return this.stepItems.length - 1 - idx;
            }

            return idx;
          },

          /**
              * Check if next button is available.
              */
          hasNext: function hasNext() {
            return this.lastVisibleStepIndex >= 0 && this.activeStep < this.lastVisibleStepIndex;
          }
        },
        watch: {
          /**
          * When v-model is changed set the new active step.
          */
          value: function value(_value) {
            this.changeStep(_value);
          },

          /**
          * When step-items are updated, set active one.
          */
          stepItems: function stepItems() {
            if (this.activeStep < this.stepItems.length) {
              this.stepItems[this.activeStep].isActive = true;
            }
          }
        },
        methods: {
          /**
          * Change the active step and emit change event.
          */
          changeStep: function changeStep(newIndex) {
            if (this.activeStep === newIndex) return;

            if (this.activeStep < this.stepItems.length) {
              this.stepItems[this.activeStep].deactivate(this.activeStep, newIndex);
            }

            this.stepItems[newIndex].activate(this.activeStep, newIndex);
            this.activeStep = newIndex;
            this.$emit('change', newIndex);
          },

          /**
              * Return if the step should be clickable or not.
              */
          isItemClickable: function isItemClickable(stepItem) {
            if (stepItem.clickable === undefined) {
              return stepItem.completed;
            }

            return stepItem.clickable;
          },

          /**
          * Step click listener, emit input event and change active step.
          */
          stepClick: function stepClick(value) {
            this.$emit('input', value);
            this.changeStep(value);
          },

          /**
              * Previous button click listener.
              */
          prev: function prev() {
            var _this = this;

            if (!this.hasPrev) return;
            var prevItemIdx = this.reversedStepItems.findIndex(function (step, idx) {
              return _this.stepItems.length - 1 - idx < _this.activeStep && step.visible;
            });

            if (prevItemIdx >= 0) {
              prevItemIdx = this.stepItems.length - 1 - prevItemIdx;
            }

            this.changeStep(prevItemIdx);
          },

          /**
              * Previous button click listener.
              */
          next: function next() {
            var _this2 = this;

            if (!this.hasNext) return;
            var nextItemIdx = this.stepItems.findIndex(function (step, idx) {
              return idx > _this2.activeStep && step.visible;
            });
            this.changeStep(nextItemIdx);
          }
        },
        mounted: function mounted() {
          if (this.activeStep < this.stepItems.length) {
            this.stepItems[this.activeStep].isActive = true;
          }
        }
      };
      /***/
    },
    /* 190 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "b-steps"
          }, [_c('nav', {
            staticClass: "steps",
            class: _vm.mainClasses
          }, [_c('ul', {
            staticClass: "step-items"
          }, _vm._l(_vm.stepItems, function (stepItem, index) {
            return _c('li', {
              directives: [{
                name: "show",
                rawName: "v-show",
                value: stepItem.visible,
                expression: "stepItem.visible"
              }],
              key: index,
              staticClass: "step-item",
              class: [stepItem.type || _vm.type, {
                'is-active': _vm.activeStep === index,
                'is-completed': stepItem.completed || _vm.activeStep > index
              }]
            }, [_c('a', {
              staticClass: "step-link",
              class: {
                'is-clickable': _vm.isItemClickable(stepItem)
              },
              on: {
                "click": function ($event) {
                  _vm.isItemClickable(stepItem) && _vm.stepClick(index);
                }
              }
            }, [_c('div', {
              staticClass: "step-marker"
            }, [stepItem.icon ? _c('b-icon', {
              attrs: {
                "icon": stepItem.icon,
                "pack": stepItem.iconPack,
                "size": _vm.size
              }
            }) : _vm._e()], 1), _vm._v(" "), _c('div', {
              staticClass: "step-details"
            }, [_c('span', {
              staticClass: "step-title"
            }, [_vm._v(_vm._s(stepItem.label))])])])]);
          }))]), _vm._v(" "), _c('section', {
            staticClass: "step-content",
            class: {
              'is-transitioning': _vm.isTransitioning
            }
          }, [_vm._t("default")], 2), _vm._v(" "), _vm.hasNavigation ? _c('nav', {
            staticClass: "step-navigation"
          }, [_c('a', {
            staticClass: "pagination-previous",
            attrs: {
              "role": "button",
              "href": "#",
              "disabled": !_vm.hasPrev,
              "aria-label": _vm.ariaPreviousLabel
            },
            on: {
              "click": function ($event) {
                $event.preventDefault();

                _vm.prev($event);
              }
            }
          }, [_c('b-icon', {
            attrs: {
              "icon": "chevron-left",
              "pack": _vm.iconPack,
              "both": "",
              "aria-hidden": "true"
            }
          })], 1), _vm._v(" "), _c('a', {
            staticClass: "pagination-next",
            attrs: {
              "role": "button",
              "href": "#",
              "disabled": !_vm.hasNext,
              "aria-label": _vm.ariaNextLabel
            },
            on: {
              "click": function ($event) {
                $event.preventDefault();

                _vm.next($event);
              }
            }
          }, [_c('b-icon', {
            attrs: {
              "icon": "chevron-right",
              "pack": _vm.iconPack,
              "both": "",
              "aria-hidden": "true"
            }
          })], 1)]) : _vm._e()]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 191 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(192),
      /* template */
      null,
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 192 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony default export */

      __webpack_exports__["default"] = {
        name: 'BStepItem',
        props: {
          label: String,
          type: String | Object,
          icon: String,
          iconPack: String,
          clickable: Boolean,
          completed: {
            type: Boolean,
            default: false
          },
          visible: {
            type: Boolean,
            default: true
          }
        },
        data: function data() {
          return {
            isActive: false,
            transitionName: null
          };
        },
        methods: {
          /**
          * Activate step, alter animation name based on the index.
          */
          activate: function activate(oldIndex, index) {
            this.transitionName = index < oldIndex ? 'slide-next' : 'slide-prev';
            this.isActive = true;
          },

          /**
          * Deactivate step, alter animation name based on the index.
          */
          deactivate: function deactivate(oldIndex, index) {
            this.transitionName = index < oldIndex ? 'slide-next' : 'slide-prev';
            this.isActive = false;
          }
        },
        created: function created() {
          if (!this.$parent.$data._isSteps) {
            this.$destroy();
            throw new Error('You should wrap bStepItem on a bSteps');
          }

          this.$parent.stepItems.push(this);
        },
        beforeDestroy: function beforeDestroy() {
          var index = this.$parent.stepItems.indexOf(this);

          if (index >= 0) {
            this.$parent.stepItems.splice(index, 1);
          }
        },
        render: function render(createElement) {
          var _this = this; // if destroy apply v-if


          if (this.$parent.destroyOnHide) {
            if (!this.isActive || !this.visible) {
              return;
            }
          }

          var vnode = createElement('div', {
            directives: [{
              name: 'show',
              value: this.isActive && this.visible
            }],
            attrs: {
              'class': 'step-item'
            }
          }, this.$slots.default); // check animated prop

          if (this.$parent.animated) {
            return createElement('transition', {
              props: {
                'name': this.transitionName
              },
              on: {
                'before-enter': function beforeEnter() {
                  _this.$parent.isTransitioning = true;
                },
                'after-enter': function afterEnter() {
                  _this.$parent.isTransitioning = false;
                }
              }
            }, [vnode]);
          }

          return vnode;
        }
      };
      /***/
    },
    /* 193 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(194),
      /* template */
      __webpack_require__(195),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 194 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BSwitch',
        props: {
          value: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
          nativeValue: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
          disabled: Boolean,
          type: String,
          name: String,
          required: Boolean,
          size: String,
          trueValue: {
            type: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
            default: true
          },
          falseValue: {
            type: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
            default: false
          }
        },
        data: function data() {
          return {
            newValue: this.value,
            isMouseDown: false
          };
        },
        computed: {
          computedValue: {
            get: function get() {
              return this.newValue;
            },
            set: function set(value) {
              this.newValue = value;
              this.$emit('input', value);
            }
          }
        },
        watch: {
          /**
          * When v-model change, set internal value.
          */
          value: function value(_value) {
            this.newValue = _value;
          }
        }
      };
      /***/
    },
    /* 195 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('label', {
            ref: "label",
            staticClass: "switch",
            class: [_vm.size, {
              'is-disabled': _vm.disabled
            }],
            attrs: {
              "disabled": _vm.disabled
            },
            on: {
              "keydown": function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
                  return null;
                }

                $event.preventDefault();

                _vm.$refs.label.click();
              },
              "mousedown": function ($event) {
                _vm.isMouseDown = true;
              },
              "mouseup": function ($event) {
                _vm.isMouseDown = false;
              },
              "mouseout": function ($event) {
                _vm.isMouseDown = false;
              },
              "blur": function ($event) {
                _vm.isMouseDown = false;
              }
            }
          }, [_c('input', {
            directives: [{
              name: "model",
              rawName: "v-model",
              value: _vm.computedValue,
              expression: "computedValue"
            }],
            attrs: {
              "type": "checkbox",
              "disabled": _vm.disabled,
              "name": _vm.name,
              "required": _vm.required,
              "true-value": _vm.trueValue,
              "false-value": _vm.falseValue
            },
            domProps: {
              "value": _vm.nativeValue,
              "checked": Array.isArray(_vm.computedValue) ? _vm._i(_vm.computedValue, _vm.nativeValue) > -1 : _vm._q(_vm.computedValue, _vm.trueValue)
            },
            on: {
              "click": function ($event) {
                $event.stopPropagation();
              },
              "change": function ($event) {
                var $$a = _vm.computedValue,
                    $$el = $event.target,
                    $$c = $$el.checked ? _vm.trueValue : _vm.falseValue;

                if (Array.isArray($$a)) {
                  var $$v = _vm.nativeValue,
                      $$i = _vm._i($$a, $$v);

                  if ($$el.checked) {
                    $$i < 0 && (_vm.computedValue = $$a.concat([$$v]));
                  } else {
                    $$i > -1 && (_vm.computedValue = $$a.slice(0, $$i).concat($$a.slice($$i + 1)));
                  }
                } else {
                  _vm.computedValue = $$c;
                }
              }
            }
          }), _vm._v(" "), _c('span', {
            staticClass: "check",
            class: [{
              'is-elastic': _vm.isMouseDown && !_vm.disabled
            }, _vm.type]
          }), _vm._v(" "), _c('span', {
            staticClass: "control-label"
          }, [_vm._t("default")], 2)]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 196 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(197),
      /* template */
      __webpack_require__(211),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 197 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(198);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__utils_helpers__ = __webpack_require__(7);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__checkbox_Checkbox__ = __webpack_require__(61);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__checkbox_Checkbox___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__checkbox_Checkbox__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__icon_Icon__ = __webpack_require__(3);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__icon_Icon__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_5__pagination_Pagination__ = __webpack_require__(66);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_5__pagination_Pagination___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__pagination_Pagination__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_6__TableMobileSort__ = __webpack_require__(206);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_6__TableMobileSort___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__TableMobileSort__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_7__TableColumn__ = __webpack_require__(68);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_7__TableColumn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__TableColumn__);

      var _components; //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BTable',
        components: (_components = {}, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3__checkbox_Checkbox___default.a.name, __WEBPACK_IMPORTED_MODULE_3__checkbox_Checkbox___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_4__icon_Icon___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_5__pagination_Pagination___default.a.name, __WEBPACK_IMPORTED_MODULE_5__pagination_Pagination___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_6__TableMobileSort___default.a.name, __WEBPACK_IMPORTED_MODULE_6__TableMobileSort___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_7__TableColumn___default.a.name, __WEBPACK_IMPORTED_MODULE_7__TableColumn___default.a), _components),
        props: {
          data: {
            type: Array,
            default: function _default() {
              return [];
            }
          },
          columns: {
            type: Array,
            default: function _default() {
              return [];
            }
          },
          bordered: Boolean,
          striped: Boolean,
          narrowed: Boolean,
          hoverable: Boolean,
          loading: Boolean,
          detailed: Boolean,
          checkable: Boolean,
          headerCheckable: {
            type: Boolean,
            default: true
          },
          checkboxPosition: {
            type: String,
            default: 'left',
            validator: function validator(value) {
              return ['left', 'right'].indexOf(value) >= 0;
            }
          },
          selected: Object,
          focusable: Boolean,
          customIsChecked: Function,
          isRowCheckable: {
            type: Function,
            default: function _default() {
              return true;
            }
          },
          checkedRows: {
            type: Array,
            default: function _default() {
              return [];
            }
          },
          mobileCards: {
            type: Boolean,
            default: true
          },
          defaultSort: [String, Array],
          defaultSortDirection: {
            type: String,
            default: 'asc'
          },
          paginated: Boolean,
          currentPage: {
            type: Number,
            default: 1
          },
          perPage: {
            type: [Number, String],
            default: 20
          },
          showDetailIcon: {
            type: Boolean,
            default: true
          },
          paginationSimple: Boolean,
          paginationSize: String,
          paginationPosition: {
            type: String,
            default: 'bottom',
            validator: function validator(value) {
              return ['bottom', 'top', 'both'].indexOf(value) >= 0;
            }
          },
          backendSorting: Boolean,
          rowClass: {
            type: Function,
            default: function _default() {
              return '';
            }
          },
          openedDetailed: {
            type: Array,
            default: function _default() {
              return [];
            }
          },
          hasDetailedVisible: {
            type: Function,
            default: function _default() {
              return true;
            }
          },
          detailKey: {
            type: String,
            default: ''
          },
          customDetailRow: {
            type: Boolean,
            default: false
          },
          backendPagination: Boolean,
          total: {
            type: [Number, String],
            default: 0
          },
          iconPack: String,
          mobileSortPlaceholder: String,
          customRowKey: String,
          draggable: {
            type: Boolean,
            defualt: false
          },
          ariaNextLabel: String,
          ariaPreviousLabel: String,
          ariaPageLabel: String,
          ariaCurrentLabel: String
        },
        data: function data() {
          return {
            getValueByPath: __WEBPACK_IMPORTED_MODULE_2__utils_helpers__["a"
            /* getValueByPath */
            ],
            newColumns: [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(this.columns)),
            visibleDetailRows: this.openedDetailed,
            newData: this.data,
            newDataTotal: this.backendPagination ? this.total : this.data.length,
            newCheckedRows: [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(this.checkedRows)),
            newCurrentPage: this.currentPage,
            currentSortColumn: {},
            isAsc: true,
            firstTimeSort: true,
            // Used by first time initSort
            _isTable: true // Used by TableColumn

          };
        },
        computed: {
          /**
          * return if detailed row tabled
          * will be with chevron column & icon or not
          */
          showDetailRowIcon: function showDetailRowIcon() {
            return this.detailed && this.showDetailIcon;
          },
          tableClasses: function tableClasses() {
            return {
              'is-bordered': this.bordered,
              'is-striped': this.striped,
              'is-narrow': this.narrowed,
              'has-mobile-cards': this.mobileCards,
              'is-hoverable': (this.hoverable || this.focusable) && this.visibleData.length
            };
          },

          /**
          * Splitted data based on the pagination.
          */
          visibleData: function visibleData() {
            if (!this.paginated) return this.newData;
            var currentPage = this.newCurrentPage;
            var perPage = this.perPage;

            if (this.newData.length <= perPage) {
              return this.newData;
            } else {
              var start = (currentPage - 1) * perPage;
              var end = parseInt(start, 10) + parseInt(perPage, 10);
              return this.newData.slice(start, end);
            }
          },
          visibleColumns: function visibleColumns() {
            if (!this.newColumns) return this.newColumns;
            return this.newColumns.filter(function (column) {
              return column.visible || column.visible === undefined;
            });
          },

          /**
          * Check if all rows in the page are checked.
          */
          isAllChecked: function isAllChecked() {
            var _this = this;

            var validVisibleData = this.visibleData.filter(function (row) {
              return _this.isRowCheckable(row);
            });
            if (validVisibleData.length === 0) return false;
            var isAllChecked = validVisibleData.some(function (currentVisibleRow) {
              return Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["b"
              /* indexOf */
              ])(_this.newCheckedRows, currentVisibleRow, _this.customIsChecked) < 0;
            });
            return !isAllChecked;
          },

          /**
          * Check if all rows in the page are checkable.
          */
          isAllUncheckable: function isAllUncheckable() {
            var _this2 = this;

            var validVisibleData = this.visibleData.filter(function (row) {
              return _this2.isRowCheckable(row);
            });
            return validVisibleData.length === 0;
          },

          /**
          * Check if has any sortable column.
          */
          hasSortablenewColumns: function hasSortablenewColumns() {
            return this.newColumns.some(function (column) {
              return column.sortable;
            });
          },

          /**
          * Return total column count based if it's checkable or expanded
          */
          columnCount: function columnCount() {
            var count = this.newColumns.length;
            count += this.checkable ? 1 : 0;
            count += this.detailed ? 1 : 0;
            return count;
          }
        },
        watch: {
          /**
          * When data prop change:
          *   1. Update internal value.
          *   2. Reset newColumns (thead), in case it's on a v-for loop.
          *   3. Sort again if it's not backend-sort.
          *   4. Set new total if it's not backend-paginated.
          */
          data: function data(value) {
            var _this3 = this; // Save newColumns before resetting


            var newColumns = this.newColumns;
            this.newColumns = [];
            this.newData = value; // Prevent table from being headless, data could change and created hook
            // on column might not trigger

            this.$nextTick(function () {
              if (!_this3.newColumns.length) _this3.newColumns = newColumns;
            });

            if (!this.backendSorting) {
              this.sort(this.currentSortColumn, true);
            }

            if (!this.backendPagination) {
              this.newDataTotal = value.length;
            }
          },

          /**
          * When Pagination total change, update internal total
          * only if it's backend-paginated.
          */
          total: function total(newTotal) {
            if (!this.backendPagination) return;
            this.newDataTotal = newTotal;
          },

          /**
          * When checkedRows prop change, update internal value without
          * mutating original data.
          */
          checkedRows: function checkedRows(rows) {
            this.newCheckedRows = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(rows));
          },
          columns: function columns(value) {
            this.newColumns = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(value));
          },
          newColumns: function newColumns(value) {
            this.checkSort();
          },

          /**
              * When the user wants to control the detailed rows via props.
              * Or wants to open the details of certain row with the router for example.
              */
          openedDetailed: function openedDetailed(expandedRows) {
            this.visibleDetailRows = expandedRows;
          },
          currentPage: function currentPage(newVal) {
            this.newCurrentPage = newVal;
          }
        },
        methods: {
          /**
          * Sort an array by key without mutating original data.
          * Call the user sort function if it was passed.
          */
          sortBy: function sortBy(array, key, fn, isAsc) {
            var sorted = []; // Sorting without mutating original data

            if (fn && typeof fn === 'function') {
              sorted = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(array)).sort(function (a, b) {
                return fn(a, b, isAsc);
              });
            } else {
              sorted = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(array)).sort(function (a, b) {
                // Get nested values from objects
                var newA = Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["a"
                /* getValueByPath */
                ])(a, key);
                var newB = Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["a"
                /* getValueByPath */
                ])(b, key); // sort boolean type

                if (typeof newA === 'boolean' && typeof newB === 'boolean') {
                  return isAsc ? newA - newB : newB - newA;
                }

                if (!newA && newA !== 0) return 1;
                if (!newB && newB !== 0) return -1;
                if (newA === newB) return 0;
                newA = typeof newA === 'string' ? newA.toUpperCase() : newA;
                newB = typeof newB === 'string' ? newB.toUpperCase() : newB;
                return isAsc ? newA > newB ? 1 : -1 : newA > newB ? -1 : 1;
              });
            }

            return sorted;
          },

          /**
          * Sort the column.
          * Toggle current direction on column if it's sortable
          * and not just updating the prop.
          */
          sort: function sort(column) {
            var updatingData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            if (!column || !column.sortable) return;

            if (!updatingData) {
              this.isAsc = column === this.currentSortColumn ? !this.isAsc : this.defaultSortDirection.toLowerCase() !== 'desc';
            }

            if (!this.firstTimeSort) {
              this.$emit('sort', column.field, this.isAsc ? 'asc' : 'desc');
            }

            if (!this.backendSorting) {
              this.newData = this.sortBy(this.newData, column.field, column.customSort, this.isAsc);
            }

            this.currentSortColumn = column;
          },

          /**
          * Check if the row is checked (is added to the array).
          */
          isRowChecked: function isRowChecked(row) {
            return Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["b"
            /* indexOf */
            ])(this.newCheckedRows, row, this.customIsChecked) >= 0;
          },

          /**
          * Remove a checked row from the array.
          */
          removeCheckedRow: function removeCheckedRow(row) {
            var index = Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["b"
            /* indexOf */
            ])(this.newCheckedRows, row, this.customIsChecked);

            if (index >= 0) {
              this.newCheckedRows.splice(index, 1);
            }
          },

          /**
          * Header checkbox click listener.
          * Add or remove all rows in current page.
          */
          checkAll: function checkAll() {
            var _this4 = this;

            var isAllChecked = this.isAllChecked;
            this.visibleData.forEach(function (currentRow) {
              _this4.removeCheckedRow(currentRow);

              if (!isAllChecked) {
                if (_this4.isRowCheckable(currentRow)) {
                  _this4.newCheckedRows.push(currentRow);
                }
              }
            });
            this.$emit('check', this.newCheckedRows);
            this.$emit('check-all', this.newCheckedRows); // Emit checked rows to update user variable

            this.$emit('update:checkedRows', this.newCheckedRows);
          },

          /**
          * Row checkbox click listener.
          * Add or remove a single row.
          */
          checkRow: function checkRow(row) {
            if (!this.isRowChecked(row)) {
              this.newCheckedRows.push(row);
            } else {
              this.removeCheckedRow(row);
            }

            this.$emit('check', this.newCheckedRows, row); // Emit checked rows to update user variable

            this.$emit('update:checkedRows', this.newCheckedRows);
          },

          /**
          * Row click listener.
          * Emit all necessary events.
          */
          selectRow: function selectRow(row, index) {
            this.$emit('click', row);
            if (this.selected === row) return; // Emit new and old row

            this.$emit('select', row, this.selected); // Emit new row to update user variable

            this.$emit('update:selected', row);
          },

          /**
          * Paginator change listener.
          */
          pageChanged: function pageChanged(page) {
            this.newCurrentPage = page > 0 ? page : 1;
            this.$emit('page-change', this.newCurrentPage);
            this.$emit('update:currentPage', this.newCurrentPage);
          },

          /**
          * Toggle to show/hide details slot
          */
          toggleDetails: function toggleDetails(obj) {
            var found = this.isVisibleDetailRow(obj);

            if (found) {
              this.closeDetailRow(obj);
              this.$emit('details-close', obj);
            } else {
              this.openDetailRow(obj);
              this.$emit('details-open', obj);
            } // Syncs the detailed rows with the parent component


            this.$emit('update:openedDetailed', this.visibleDetailRows);
          },
          openDetailRow: function openDetailRow(obj) {
            var index = this.handleDetailKey(obj);
            this.visibleDetailRows.push(index);
          },
          closeDetailRow: function closeDetailRow(obj) {
            var index = this.handleDetailKey(obj);
            var i = this.visibleDetailRows.indexOf(index);
            this.visibleDetailRows.splice(i, 1);
          },
          isVisibleDetailRow: function isVisibleDetailRow(obj) {
            var index = this.handleDetailKey(obj);
            var result = this.visibleDetailRows.indexOf(index) >= 0;
            return result;
          },
          isActiveDetailRow: function isActiveDetailRow(row) {
            return this.detailed && !this.customDetailRow && this.isVisibleDetailRow(row);
          },
          isActiveCustomDetailRow: function isActiveCustomDetailRow(row) {
            return this.detailed && this.customDetailRow && this.isVisibleDetailRow(row);
          },

          /**
              * When the detailKey is defined we use the object[detailKey] as index.
              * If not, use the object reference by default.
              */
          handleDetailKey: function handleDetailKey(index) {
            var key = this.detailKey;
            return !key.length ? index : index[key];
          },
          checkPredefinedDetailedRows: function checkPredefinedDetailedRows() {
            var defaultExpandedRowsDefined = this.openedDetailed.length > 0;

            if (defaultExpandedRowsDefined && !this.detailKey.length) {
              throw new Error('If you set a predefined opened-detailed, you must provide a unique key using the prop "detail-key"');
            }
          },

          /**
          * Call initSort only first time (For example async data).
          */
          checkSort: function checkSort() {
            if (this.newColumns.length && this.firstTimeSort) {
              this.initSort();
              this.firstTimeSort = false;
            } else if (this.newColumns.length) {
              if (this.currentSortColumn.field) {
                for (var i = 0; i < this.newColumns.length; i++) {
                  if (this.newColumns[i].field === this.currentSortColumn.field) {
                    this.currentSortColumn = this.newColumns[i];
                    break;
                  }
                }
              }
            }
          },

          /**
          * Check if footer slot has custom content.
          */
          hasCustomFooterSlot: function hasCustomFooterSlot() {
            if (this.$slots.footer.length > 1) return true;
            var tag = this.$slots.footer[0].tag;
            if (tag !== 'th' && tag !== 'td') return false;
            return true;
          },

          /**
          * Check if bottom-left slot exists.
          */
          hasBottomLeftSlot: function hasBottomLeftSlot() {
            return typeof this.$slots['bottom-left'] !== 'undefined';
          },

          /**
          * Table arrow keys listener, change selection.
          */
          pressedArrow: function pressedArrow(pos) {
            if (!this.visibleData.length) return;
            var index = this.visibleData.indexOf(this.selected) + pos; // Prevent from going up from first and down from last

            index = index < 0 ? 0 : index > this.visibleData.length - 1 ? this.visibleData.length - 1 : index;
            this.selectRow(this.visibleData[index]);
          },

          /**
          * Focus table element if has selected prop.
          */
          focus: function focus() {
            if (!this.focusable) return;
            this.$el.querySelector('table').focus();
          },

          /**
          * Initial sorted column based on the default-sort prop.
          */
          initSort: function initSort() {
            var _this5 = this;

            if (!this.defaultSort) return;
            var sortField = '';
            var sortDirection = this.defaultSortDirection;

            if (Array.isArray(this.defaultSort)) {
              sortField = this.defaultSort[0];

              if (this.defaultSort[1]) {
                sortDirection = this.defaultSort[1];
              }
            } else {
              sortField = this.defaultSort;
            }

            this.newColumns.forEach(function (column) {
              if (column.field === sortField) {
                _this5.isAsc = sortDirection.toLowerCase() !== 'desc';

                _this5.sort(column, true);
              }
            });
          },

          /**
          * Emits drag start event
          */
          handleDragStart: function handleDragStart(event, row, index) {
            this.$emit('dragstart', {
              event: event,
              row: row,
              index: index
            });
          },

          /**
          * Emits drop event
          */
          handleDrop: function handleDrop(event, row, index) {
            this.$emit('drop', {
              event: event,
              row: row,
              index: index
            });
          },

          /**
          * Emits drag over event
          */
          handleDragOver: function handleDragOver(event, row, index) {
            this.$emit('dragover', {
              event: event,
              row: row,
              index: index
            });
          },

          /**
          * Emits drag leave event
          */
          handleDragLeave: function handleDragLeave(event, row, index) {
            this.$emit('dragleave', {
              event: event,
              row: row,
              index: index
            });
          }
        },
        mounted: function mounted() {
          this.checkPredefinedDetailedRows();
          this.checkSort();
        }
      };
      /***/
    },
    /* 198 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      exports.__esModule = true;

      var _from = __webpack_require__(199);

      var _from2 = _interopRequireDefault(_from);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }

      exports.default = function (arr) {
        if (Array.isArray(arr)) {
          for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
          }

          return arr2;
        } else {
          return (0, _from2.default)(arr);
        }
      };
      /***/

    },
    /* 199 */

    /***/
    function (module, exports, __webpack_require__) {
      module.exports = {
        "default": __webpack_require__(200),
        __esModule: true
      };
      /***/
    },
    /* 200 */

    /***/
    function (module, exports, __webpack_require__) {
      __webpack_require__(41);

      __webpack_require__(201);

      module.exports = __webpack_require__(6).Array.from;
      /***/
    },
    /* 201 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      var ctx = __webpack_require__(46);

      var $export = __webpack_require__(19);

      var toObject = __webpack_require__(40);

      var call = __webpack_require__(202);

      var isArrayIter = __webpack_require__(203);

      var toLength = __webpack_require__(51);

      var createProperty = __webpack_require__(204);

      var getIterFn = __webpack_require__(60);

      $export($export.S + $export.F * !__webpack_require__(205)(function (iter) {
        Array.from(iter);
      }), 'Array', {
        // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
        from: function from(arrayLike
        /* , mapfn = undefined, thisArg = undefined */
        ) {
          var O = toObject(arrayLike);
          var C = typeof this == 'function' ? this : Array;
          var aLen = arguments.length;
          var mapfn = aLen > 1 ? arguments[1] : undefined;
          var mapping = mapfn !== undefined;
          var index = 0;
          var iterFn = getIterFn(O);
          var length, result, step, iterator;
          if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2); // if object isn't iterable or it's array with default iterator - use simple case

          if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
            for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
              createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
            }
          } else {
            length = toLength(O.length);

            for (result = new C(length); length > index; index++) {
              createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
            }
          }

          result.length = index;
          return result;
        }
      });
      /***/
    },
    /* 202 */

    /***/
    function (module, exports, __webpack_require__) {
      // call something on iterator step with safe closing on error
      var anObject = __webpack_require__(15);

      module.exports = function (iterator, fn, value, entries) {
        try {
          return entries ? fn(anObject(value)[0], value[1]) : fn(value); // 7.4.6 IteratorClose(iterator, completion)
        } catch (e) {
          var ret = iterator['return'];
          if (ret !== undefined) anObject(ret.call(iterator));
          throw e;
        }
      };
      /***/

    },
    /* 203 */

    /***/
    function (module, exports, __webpack_require__) {
      // check on default Array iterator
      var Iterators = __webpack_require__(23);

      var ITERATOR = __webpack_require__(4)('iterator');

      var ArrayProto = Array.prototype;

      module.exports = function (it) {
        return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
      };
      /***/

    },
    /* 204 */

    /***/
    function (module, exports, __webpack_require__) {
      "use strict";

      var $defineProperty = __webpack_require__(9);

      var createDesc = __webpack_require__(22);

      module.exports = function (object, index, value) {
        if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
      };
      /***/

    },
    /* 205 */

    /***/
    function (module, exports, __webpack_require__) {
      var ITERATOR = __webpack_require__(4)('iterator');

      var SAFE_CLOSING = false;

      try {
        var riter = [7][ITERATOR]();

        riter['return'] = function () {
          SAFE_CLOSING = true;
        }; // eslint-disable-next-line no-throw-literal


        Array.from(riter, function () {
          throw 2;
        });
      } catch (e) {
        /* empty */
      }

      module.exports = function (exec, skipClosing) {
        if (!skipClosing && !SAFE_CLOSING) return false;
        var safe = false;

        try {
          var arr = [7];
          var iter = arr[ITERATOR]();

          iter.next = function () {
            return {
              done: safe = true
            };
          };

          arr[ITERATOR] = function () {
            return iter;
          };

          exec(arr);
        } catch (e) {
          /* empty */
        }

        return safe;
      };
      /***/

    },
    /* 206 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(207),
      /* template */
      __webpack_require__(208),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 207 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__select_Select__ = __webpack_require__(31);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__select_Select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__select_Select__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__icon_Icon__ = __webpack_require__(3);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__icon_Icon__);

      var _components; //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BTableMobileSort',
        components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_1__select_Select___default.a.name, __WEBPACK_IMPORTED_MODULE_1__select_Select___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_2__icon_Icon___default.a), _components),
        props: {
          currentSortColumn: Object,
          isAsc: Boolean,
          columns: Array,
          placeholder: String
        },
        data: function data() {
          return {
            mobileSort: this.currentSortColumn
          };
        },
        computed: {
          showPlaceholder: function showPlaceholder() {
            var _this = this;

            return !this.columns || !this.columns.some(function (column) {
              return column === _this.mobileSort;
            });
          }
        },
        watch: {
          mobileSort: function mobileSort(column) {
            if (this.currentSortColumn === column) return;
            this.$emit('sort', column);
          },
          currentSortColumn: function currentSortColumn(column) {
            this.mobileSort = column;
          }
        },
        methods: {
          sort: function sort() {
            this.$emit('sort', this.mobileSort);
          }
        }
      };
      /***/
    },
    /* 208 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "field table-mobile-sort"
          }, [_c('div', {
            staticClass: "field has-addons"
          }, [_c('b-select', {
            attrs: {
              "expanded": ""
            },
            model: {
              value: _vm.mobileSort,
              callback: function ($$v) {
                _vm.mobileSort = $$v;
              },
              expression: "mobileSort"
            }
          }, [_vm.placeholder ? [_c('option', {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: _vm.showPlaceholder,
              expression: "showPlaceholder"
            }],
            attrs: {
              "selected": "",
              "disabled": "",
              "hidden": ""
            },
            domProps: {
              "value": {}
            }
          }, [_vm._v("\n                    " + _vm._s(_vm.placeholder) + "\n                ")])] : _vm._e(), _vm._v(" "), _vm._l(_vm.columns, function (column, index) {
            return column.sortable ? _c('option', {
              key: index,
              domProps: {
                "value": column
              }
            }, [_vm._v("\n                " + _vm._s(column.label) + "\n            ")]) : _vm._e();
          })], 2), _vm._v(" "), _c('div', {
            staticClass: "control"
          }, [_c('button', {
            staticClass: "button is-primary",
            on: {
              "click": _vm.sort
            }
          }, [_c('b-icon', {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: _vm.currentSortColumn === _vm.mobileSort,
              expression: "currentSortColumn === mobileSort"
            }],
            class: {
              'is-desc': !_vm.isAsc
            },
            attrs: {
              "icon": "arrow-up",
              "size": "is-small",
              "both": ""
            }
          })], 1)])], 1)]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 209 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__ = __webpack_require__(5);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol__); //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BTableColumn',
        props: {
          label: String,
          customKey: [String, Number],
          field: String,
          meta: [String, Number, Boolean, Function, Object, Array, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_symbol___default.a],
          width: [Number, String],
          numeric: Boolean,
          centered: Boolean,
          sortable: Boolean,
          visible: {
            type: Boolean,
            default: true
          },
          customSort: Function,
          internal: Boolean // Used internally by Table

        },
        data: function data() {
          return {
            newKey: this.customKey || this.label
          };
        },
        computed: {
          rootClasses: function rootClasses() {
            return {
              'has-text-right': this.numeric && !this.centered,
              'has-text-centered': this.centered
            };
          }
        },
        methods: {
          addRefToTable: function addRefToTable() {
            var _this = this;

            if (!this.$parent.$data._isTable) {
              this.$destroy();
              throw new Error('You should wrap bTableColumn on a bTable');
            }

            if (this.internal) return; // Since we're using scoped prop the columns gonna be multiplied,
            // this finds when to stop based on the newKey property.

            var repeated = this.$parent.newColumns.some(function (column) {
              return column.newKey === _this.newKey;
            });
            !repeated && this.$parent.newColumns.push(this);
          }
        },
        beforeMount: function beforeMount() {
          this.addRefToTable();
        },
        beforeUpdate: function beforeUpdate() {
          this.addRefToTable();
        },
        beforeDestroy: function beforeDestroy() {
          var index = this.$parent.newColumns.map(function (column) {
            return column.newKey;
          }).indexOf(this.newKey);

          if (index >= 0) {
            this.$parent.newColumns.splice(index, 1);
          }
        }
      };
      /***/
    },
    /* 210 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _vm.visible ? _c('td', {
            class: _vm.rootClasses,
            attrs: {
              "data-label": _vm.label
            }
          }, [_c('span', [_vm._t("default")], 2)]) : _vm._e();
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 211 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "b-table",
            class: {
              'is-loading': _vm.loading
            }
          }, [_vm.mobileCards && _vm.hasSortablenewColumns ? _c('b-table-mobile-sort', {
            attrs: {
              "current-sort-column": _vm.currentSortColumn,
              "is-asc": _vm.isAsc,
              "columns": _vm.newColumns,
              "placeholder": _vm.mobileSortPlaceholder
            },
            on: {
              "sort": function (column) {
                return _vm.sort(column);
              }
            }
          }) : _vm._e(), _vm._v(" "), _vm.paginated && (_vm.paginationPosition === 'top' || _vm.paginationPosition === 'both') ? _c('div', {
            staticClass: "top level"
          }, [_c('div', {
            staticClass: "level-left"
          }, [_vm._t("top-left")], 2), _vm._v(" "), _c('div', {
            staticClass: "level-right"
          }, [_vm.paginated ? _c('div', {
            staticClass: "level-item"
          }, [_c('b-pagination', {
            attrs: {
              "icon-pack": _vm.iconPack,
              "total": _vm.newDataTotal,
              "per-page": _vm.perPage,
              "simple": _vm.paginationSimple,
              "size": _vm.paginationSize,
              "current": _vm.newCurrentPage,
              "aria-next-label": _vm.ariaNextLabel,
              "aria-previous-label": _vm.ariaPreviousLabel,
              "aria-page-label": _vm.ariaPageLabel,
              "aria-current-label": _vm.ariaCurrentLabel
            },
            on: {
              "change": _vm.pageChanged
            }
          })], 1) : _vm._e()])]) : _vm._e(), _vm._v(" "), _c('div', {
            staticClass: "table-wrapper"
          }, [_c('table', {
            staticClass: "table",
            class: _vm.tableClasses,
            attrs: {
              "tabindex": !_vm.focusable ? false : 0
            },
            on: {
              "keydown": [function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "up", 38, $event.key)) {
                  return null;
                }

                if ($event.target !== $event.currentTarget) {
                  return null;
                }

                $event.preventDefault();

                _vm.pressedArrow(-1);
              }, function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "down", 40, $event.key)) {
                  return null;
                }

                if ($event.target !== $event.currentTarget) {
                  return null;
                }

                $event.preventDefault();

                _vm.pressedArrow(1);
              }]
            }
          }, [_vm.newColumns.length ? _c('thead', [_c('tr', [_vm.showDetailRowIcon ? _c('th', {
            attrs: {
              "width": "40px"
            }
          }) : _vm._e(), _vm._v(" "), _vm.checkable && _vm.checkboxPosition === 'left' ? _c('th', {
            staticClass: "checkbox-cell"
          }, [_vm.headerCheckable ? [_c('b-checkbox', {
            attrs: {
              "value": _vm.isAllChecked,
              "disabled": _vm.isAllUncheckable
            },
            nativeOn: {
              "change": function ($event) {
                _vm.checkAll($event);
              }
            }
          })] : _vm._e()], 2) : _vm._e(), _vm._v(" "), _vm._l(_vm.visibleColumns, function (column, index) {
            return _c('th', {
              key: index,
              class: {
                'is-current-sort': _vm.currentSortColumn === column,
                'is-sortable': column.sortable
              },
              style: {
                width: column.width === undefined ? null : column.width + 'px'
              },
              on: {
                "click": function ($event) {
                  $event.stopPropagation();

                  _vm.sort(column);
                }
              }
            }, [_c('div', {
              staticClass: "th-wrap",
              class: {
                'is-numeric': column.numeric,
                'is-centered': column.centered
              }
            }, [_vm.$scopedSlots.header ? _vm._t("header", null, {
              column: column,
              index: index
            }) : [_vm._v(_vm._s(column.label))], _vm._v(" "), _c('b-icon', {
              directives: [{
                name: "show",
                rawName: "v-show",
                value: _vm.currentSortColumn === column,
                expression: "currentSortColumn === column"
              }],
              class: {
                'is-desc': !_vm.isAsc
              },
              attrs: {
                "icon": "arrow-up",
                "pack": _vm.iconPack,
                "both": "",
                "size": "is-small"
              }
            })], 2)]);
          }), _vm._v(" "), _vm.checkable && _vm.checkboxPosition === 'right' ? _c('th', {
            staticClass: "checkbox-cell"
          }, [_vm.headerCheckable ? [_c('b-checkbox', {
            attrs: {
              "value": _vm.isAllChecked,
              "disabled": _vm.isAllUncheckable
            },
            nativeOn: {
              "change": function ($event) {
                _vm.checkAll($event);
              }
            }
          })] : _vm._e()], 2) : _vm._e()], 2)]) : _vm._e(), _vm._v(" "), _vm.visibleData.length ? _c('tbody', [_vm._l(_vm.visibleData, function (row, index) {
            return [_c('tr', {
              key: _vm.customRowKey ? row[_vm.customRowKey] : index,
              class: [_vm.rowClass(row, index), {
                'is-selected': row === _vm.selected,
                'is-checked': _vm.isRowChecked(row)
              }],
              attrs: {
                "draggable": _vm.draggable
              },
              on: {
                "click": function ($event) {
                  _vm.selectRow(row);
                },
                "dblclick": function ($event) {
                  _vm.$emit('dblclick', row);
                },
                "contextmenu": function ($event) {
                  _vm.$emit('contextmenu', row, $event);
                },
                "dragstart": function ($event) {
                  _vm.handleDragStart($event, row, index);
                },
                "drop": function ($event) {
                  _vm.handleDrop($event, row, index);
                },
                "dragover": function ($event) {
                  _vm.handleDragOver($event, row, index);
                },
                "dragleave": function ($event) {
                  _vm.handleDragLeave($event, row, index);
                }
              }
            }, [_vm.showDetailRowIcon ? _c('td', {
              staticClass: "chevron-cell"
            }, [_vm.hasDetailedVisible(row) ? _c('a', {
              attrs: {
                "role": "button"
              },
              on: {
                "click": function ($event) {
                  $event.stopPropagation();

                  _vm.toggleDetails(row);
                }
              }
            }, [_c('b-icon', {
              class: {
                'is-expanded': _vm.isVisibleDetailRow(row)
              },
              attrs: {
                "icon": "chevron-right",
                "pack": _vm.iconPack,
                "both": ""
              }
            })], 1) : _vm._e()]) : _vm._e(), _vm._v(" "), _vm.checkable && _vm.checkboxPosition === 'left' ? _c('td', {
              staticClass: "checkbox-cell"
            }, [_c('b-checkbox', {
              attrs: {
                "disabled": !_vm.isRowCheckable(row),
                "value": _vm.isRowChecked(row)
              },
              nativeOn: {
                "change": function ($event) {
                  _vm.checkRow(row);
                },
                "click": function ($event) {
                  $event.stopPropagation();
                }
              }
            })], 1) : _vm._e(), _vm._v(" "), _vm.$scopedSlots.default ? _vm._t("default", null, {
              row: row,
              index: index
            }) : _vm._l(_vm.newColumns, function (column) {
              return _c('BTableColumn', _vm._b({
                key: column.field,
                attrs: {
                  "internal": ""
                }
              }, 'BTableColumn', column, false), [column.renderHtml ? _c('span', {
                domProps: {
                  "innerHTML": _vm._s(_vm.getValueByPath(row, column.field))
                }
              }) : [_vm._v("\n                                    " + _vm._s(_vm.getValueByPath(row, column.field)) + "\n                                ")]], 2);
            }), _vm._v(" "), _vm.checkable && _vm.checkboxPosition === 'right' ? _c('td', {
              staticClass: "checkbox-cell"
            }, [_c('b-checkbox', {
              attrs: {
                "disabled": !_vm.isRowCheckable(row),
                "value": _vm.isRowChecked(row)
              },
              nativeOn: {
                "change": function ($event) {
                  _vm.checkRow(row);
                },
                "click": function ($event) {
                  $event.stopPropagation();
                }
              }
            })], 1) : _vm._e()], 2), _vm._v(" "), _vm.isActiveDetailRow(row) ? _c('tr', {
              staticClass: "detail"
            }, [_c('td', {
              attrs: {
                "colspan": _vm.columnCount
              }
            }, [_c('div', {
              staticClass: "detail-container"
            }, [_vm._t("detail", null, {
              row: row,
              index: index
            })], 2)])]) : _vm._e(), _vm._v(" "), _vm.isActiveCustomDetailRow(row) ? _vm._t("detail", null, {
              row: row,
              index: index
            }) : _vm._e()];
          })], 2) : _c('tbody', [_c('tr', {
            staticClass: "is-empty"
          }, [_c('td', {
            attrs: {
              "colspan": _vm.columnCount
            }
          }, [_vm._t("empty")], 2)])]), _vm._v(" "), _vm.$slots.footer !== undefined ? _c('tfoot', [_c('tr', {
            staticClass: "table-footer"
          }, [_vm.hasCustomFooterSlot() ? _vm._t("footer") : _c('th', {
            attrs: {
              "colspan": _vm.columnCount
            }
          }, [_vm._t("footer")], 2)], 2)]) : _vm._e()])]), _vm._v(" "), _vm.checkable && _vm.hasBottomLeftSlot() || _vm.paginated && (_vm.paginationPosition === 'bottom' || _vm.paginationPosition === 'both') ? _c('div', {
            staticClass: "level"
          }, [_c('div', {
            staticClass: "level-left"
          }, [_vm._t("bottom-left")], 2), _vm._v(" "), _c('div', {
            staticClass: "level-right"
          }, [_vm.paginated ? _c('div', {
            staticClass: "level-item"
          }, [_c('b-pagination', {
            attrs: {
              "icon-pack": _vm.iconPack,
              "total": _vm.newDataTotal,
              "per-page": _vm.perPage,
              "simple": _vm.paginationSimple,
              "size": _vm.paginationSize,
              "current": _vm.newCurrentPage,
              "aria-next-label": _vm.ariaNextLabel,
              "aria-previous-label": _vm.ariaPreviousLabel,
              "aria-page-label": _vm.ariaPageLabel,
              "aria-current-label": _vm.ariaCurrentLabel
            },
            on: {
              "change": _vm.pageChanged
            }
          })], 1) : _vm._e()])]) : _vm._e()], 1);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 212 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(213),
      /* template */
      __webpack_require__(214),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 213 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__icon_Icon__ = __webpack_require__(3);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__icon_Icon__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__utils_SlotComponent__ = __webpack_require__(67);

      var _components; //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BTabs',
        components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_1__icon_Icon___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2__utils_SlotComponent__["a"
        /* default */
        ].name, __WEBPACK_IMPORTED_MODULE_2__utils_SlotComponent__["a"
        /* default */
        ]), _components),
        props: {
          value: Number,
          expanded: Boolean,
          type: String,
          size: String,
          position: String,
          animated: {
            type: Boolean,
            default: true
          },
          destroyOnHide: {
            type: Boolean,
            default: false
          }
        },
        data: function data() {
          return {
            activeTab: this.value || 0,
            tabItems: [],
            contentHeight: 0,
            isTransitioning: false,
            _isTabs: true // Used internally by TabItem

          };
        },
        computed: {
          navClasses: function navClasses() {
            return [this.type, this.size, this.position, {
              'is-fullwidth': this.expanded,
              'is-toggle-rounded is-toggle': this.type === 'is-toggle-rounded'
            }];
          }
        },
        watch: {
          /**
          * When v-model is changed set the new active tab.
          */
          value: function value(_value) {
            this.changeTab(_value);
          },

          /**
          * When tab-items are updated, set active one.
          */
          tabItems: function tabItems() {
            if (this.activeTab < this.tabItems.length) {
              this.tabItems[this.activeTab].isActive = true;
            }
          }
        },
        methods: {
          /**
          * Change the active tab and emit change event.
          */
          changeTab: function changeTab(newIndex) {
            if (this.activeTab === newIndex) return;

            if (this.activeTab < this.tabItems.length) {
              this.tabItems[this.activeTab].deactivate(this.activeTab, newIndex);
            }

            this.tabItems[newIndex].activate(this.activeTab, newIndex);
            this.activeTab = newIndex;
            this.$emit('change', newIndex);
          },

          /**
          * Tab click listener, emit input event and change active tab.
          */
          tabClick: function tabClick(value) {
            this.$emit('input', value);
            this.changeTab(value);
          }
        },
        mounted: function mounted() {
          if (this.activeTab < this.tabItems.length) {
            this.tabItems[this.activeTab].isActive = true;
          }
        }
      };
      /***/
    },
    /* 214 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "b-tabs",
            class: {
              'is-fullwidth': _vm.expanded
            }
          }, [_c('nav', {
            staticClass: "tabs",
            class: _vm.navClasses
          }, [_c('ul', _vm._l(_vm.tabItems, function (tabItem, index) {
            return _c('li', {
              directives: [{
                name: "show",
                rawName: "v-show",
                value: tabItem.visible,
                expression: "tabItem.visible"
              }],
              key: index,
              class: {
                'is-active': _vm.activeTab === index,
                'is-disabled': tabItem.disabled
              }
            }, [_c('a', {
              on: {
                "click": function ($event) {
                  _vm.tabClick(index);
                }
              }
            }, [tabItem.$slots.header ? [_c('b-slot-component', {
              attrs: {
                "component": tabItem,
                "name": "header",
                "tag": "span"
              }
            })] : [tabItem.icon ? _c('b-icon', {
              attrs: {
                "icon": tabItem.icon,
                "pack": tabItem.iconPack,
                "size": _vm.size
              }
            }) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(tabItem.label))])]], 2)]);
          }))]), _vm._v(" "), _c('section', {
            staticClass: "tab-content",
            class: {
              'is-transitioning': _vm.isTransitioning
            }
          }, [_vm._t("default")], 2)]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 215 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(216),
      /* template */
      null,
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 216 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony default export */

      __webpack_exports__["default"] = {
        name: 'BTabItem',
        props: {
          label: String,
          icon: String,
          iconPack: String,
          disabled: Boolean,
          visible: {
            type: Boolean,
            default: true
          }
        },
        data: function data() {
          return {
            isActive: false,
            transitionName: null
          };
        },
        methods: {
          /**
          * Activate tab, alter animation name based on the index.
          */
          activate: function activate(oldIndex, index) {
            this.transitionName = index < oldIndex ? 'slide-next' : 'slide-prev';
            this.isActive = true;
          },

          /**
          * Deactivate tab, alter animation name based on the index.
          */
          deactivate: function deactivate(oldIndex, index) {
            this.transitionName = index < oldIndex ? 'slide-next' : 'slide-prev';
            this.isActive = false;
          }
        },
        created: function created() {
          if (!this.$parent.$data._isTabs) {
            this.$destroy();
            throw new Error('You should wrap bTabItem on a bTabs');
          }

          this.$parent.tabItems.push(this);
        },
        beforeDestroy: function beforeDestroy() {
          var index = this.$parent.tabItems.indexOf(this);

          if (index >= 0) {
            this.$parent.tabItems.splice(index, 1);
          }
        },
        render: function render(createElement) {
          var _this = this; // if destroy apply v-if


          if (this.$parent.destroyOnHide) {
            if (!this.isActive || !this.visible) {
              return;
            }
          }

          var vnode = createElement('div', {
            directives: [{
              name: 'show',
              value: this.isActive && this.visible
            }],
            attrs: {
              'class': 'tab-item'
            }
          }, this.$slots.default); // check animated prop

          if (this.$parent.animated) {
            return createElement('transition', {
              props: {
                'name': this.transitionName
              },
              on: {
                'before-enter': function beforeEnter() {
                  _this.$parent.isTransitioning = true;
                },
                'after-enter': function afterEnter() {
                  _this.$parent.isTransitioning = false;
                }
              }
            }, [vnode]);
          }

          return vnode;
        }
      };
      /***/
    },
    /* 217 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      }); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */

      __webpack_exports__["default"] = {
        name: 'BTag',
        props: {
          attached: Boolean,
          closable: Boolean,
          type: String,
          size: String,
          rounded: Boolean,
          disabled: Boolean,
          ellipsis: Boolean,
          tabstop: {
            type: Boolean,
            default: true
          }
        },
        methods: {
          /**
          * Emit close event when delete button is clicked
          * or delete key is pressed.
          */
          close: function close() {
            if (this.disabled) return;
            this.$emit('close');
          }
        }
      };
      /***/
    },
    /* 218 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _vm.attached && _vm.closable ? _c('div', {
            staticClass: "tags has-addons"
          }, [_c('span', {
            staticClass: "tag",
            class: [_vm.type, _vm.size, {
              'is-rounded': _vm.rounded
            }]
          }, [_c('span', {
            class: {
              'has-ellipsis': _vm.ellipsis
            }
          }, [_vm._t("default")], 2)]), _vm._v(" "), _c('a', {
            staticClass: "tag is-delete",
            class: [_vm.size, {
              'is-rounded': _vm.rounded
            }],
            attrs: {
              "role": "button",
              "tabindex": _vm.tabstop ? 0 : false,
              "disabled": _vm.disabled
            },
            on: {
              "click": function ($event) {
                _vm.close();
              },
              "keyup": function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "delete", [8, 46], $event.key)) {
                  return null;
                }

                $event.preventDefault();

                _vm.close();
              }
            }
          })]) : _c('span', {
            staticClass: "tag",
            class: [_vm.type, _vm.size, {
              'is-rounded': _vm.rounded
            }]
          }, [_c('span', {
            class: {
              'has-ellipsis': _vm.ellipsis
            }
          }, [_vm._t("default")], 2), _vm._v(" "), _vm.closable ? _c('a', {
            staticClass: "delete is-small",
            attrs: {
              "role": "button",
              "disabled": _vm.disabled,
              "tabindex": _vm.tabstop ? 0 : false
            },
            on: {
              "click": function ($event) {
                _vm.close();
              },
              "keyup": function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "delete", [8, 46], $event.key)) {
                  return null;
                }

                $event.preventDefault();

                _vm.close();
              }
            }
          }) : _vm._e()]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 219 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(220),
      /* template */
      __webpack_require__(221),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 220 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      }); //
      //
      //
      //
      //
      //

      /* harmony default export */

      __webpack_exports__["default"] = {
        name: 'BTaglist',
        props: {
          attached: Boolean
        }
      };
      /***/
    },
    /* 221 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "tags",
            class: {
              'has-addons': _vm.attached
            }
          }, [_vm._t("default")], 2);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 222 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(223),
      /* template */
      __webpack_require__(224),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 223 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__ = __webpack_require__(53);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__utils_helpers__ = __webpack_require__(7);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__tag_Tag__ = __webpack_require__(69);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__tag_Tag___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__tag_Tag__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__autocomplete_Autocomplete__ = __webpack_require__(52);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__autocomplete_Autocomplete___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__autocomplete_Autocomplete__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_5__utils_FormElementMixin__ = __webpack_require__(10);

      var _components; //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BTaginput',
        components: (_components = {}, __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4__autocomplete_Autocomplete___default.a.name, __WEBPACK_IMPORTED_MODULE_4__autocomplete_Autocomplete___default.a), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3__tag_Tag___default.a.name, __WEBPACK_IMPORTED_MODULE_3__tag_Tag___default.a), _components),
        mixins: [__WEBPACK_IMPORTED_MODULE_5__utils_FormElementMixin__["a"
        /* default */
        ]],
        inheritAttrs: false,
        props: {
          value: {
            type: Array,
            default: function _default() {
              return [];
            }
          },
          data: {
            type: Array,
            default: function _default() {
              return [];
            }
          },
          type: String,
          rounded: {
            type: Boolean,
            default: false
          },
          attached: {
            type: Boolean,
            default: false
          },
          maxtags: {
            type: [Number, String],
            required: false
          },
          field: {
            type: String,
            default: 'value'
          },
          autocomplete: Boolean,
          nativeAutocomplete: String,
          disabled: Boolean,
          ellipsis: Boolean,
          closable: {
            type: Boolean,
            default: true
          },
          confirmKeyCodes: {
            type: Array,
            default: function _default() {
              return [13, 188];
            }
          },
          removeOnKeys: {
            type: Array,
            default: function _default() {
              return [8];
            }
          },
          allowNew: Boolean,
          onPasteSeparators: {
            type: Array,
            default: function _default() {
              return [','];
            }
          },
          beforeAdding: {
            type: Function,
            default: function _default() {
              return true;
            }
          },
          allowDuplicates: {
            type: Boolean,
            default: false
          }
        },
        data: function data() {
          return {
            tags: this.value || [],
            newTag: '',
            _elementRef: 'input',
            _isTaginput: true
          };
        },
        computed: {
          rootClasses: function rootClasses() {
            return {
              'is-expanded': this.expanded
            };
          },
          containerClasses: function containerClasses() {
            return {
              'is-focused': this.isFocused,
              'is-focusable': this.hasInput
            };
          },
          valueLength: function valueLength() {
            return this.newTag.trim().length;
          },
          defaultSlotName: function defaultSlotName() {
            return this.hasDefaultSlot ? 'default' : 'dontrender';
          },
          emptySlotName: function emptySlotName() {
            return this.hasEmptySlot ? 'empty' : 'dontrender';
          },
          headerSlotName: function headerSlotName() {
            return this.hasHeaderSlot ? 'header' : 'dontrender';
          },
          footerSlotName: function footerSlotName() {
            return this.hasHeaderSlot ? 'footer' : 'dontrender';
          },
          hasDefaultSlot: function hasDefaultSlot() {
            return !!this.$scopedSlots.default;
          },
          hasEmptySlot: function hasEmptySlot() {
            return !!this.$slots.empty;
          },
          hasHeaderSlot: function hasHeaderSlot() {
            return !!this.$slots.header;
          },
          hasFooterSlot: function hasFooterSlot() {
            return !!this.$slots.footer;
          },

          /**
           * Show the input field if a maxtags hasn't been set or reached.
           */
          hasInput: function hasInput() {
            return this.maxtags == null || this.tagsLength < this.maxtags;
          },
          tagsLength: function tagsLength() {
            return this.tags.length;
          },

          /**
           * If Taginput has onPasteSeparators prop,
           * returning new RegExp used to split pasted string.
           */
          separatorsAsRegExp: function separatorsAsRegExp() {
            var sep = this.onPasteSeparators;
            return sep.length ? new RegExp(sep.map(function (s) {
              return s ? s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : null;
            }).join('|'), 'g') : null;
          }
        },
        watch: {
          /**
           * When v-model is changed set internal value.
           */
          value: function value(_value) {
            this.tags = _value;
          },
          hasInput: function hasInput() {
            if (!this.hasInput) this.onBlur();
          }
        },
        methods: {
          addTag: function addTag(tag) {
            var tagToAdd = tag || this.newTag.trim();

            if (tagToAdd) {
              if (!this.autocomplete) {
                var reg = this.separatorsAsRegExp;

                if (reg && tagToAdd.match(reg)) {
                  tagToAdd.split(reg).map(function (t) {
                    return t.trim();
                  }).filter(function (t) {
                    return t.length !== 0;
                  }).map(this.addTag);
                  return;
                }
              } // Add the tag input if it is not blank
              // or previously added (if not allowDuplicates).


              var add = !this.allowDuplicates ? this.tags.indexOf(tagToAdd) === -1 : true;

              if (add && this.beforeAdding(tagToAdd)) {
                this.tags.push(tagToAdd);
                this.$emit('input', this.tags);
                this.$emit('add', tagToAdd);
              }
            }

            this.newTag = '';
          },
          getNormalizedTagText: function getNormalizedTagText(tag) {
            if ((typeof tag === 'undefined' ? 'undefined' : __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_typeof___default()(tag)) === 'object') {
              return Object(__WEBPACK_IMPORTED_MODULE_2__utils_helpers__["a"
              /* getValueByPath */
              ])(tag, this.field);
            }

            return tag;
          },
          customOnBlur: function customOnBlur($event) {
            // Add tag on-blur if not select only
            if (!this.autocomplete) this.addTag();
            this.onBlur($event);
          },
          onSelect: function onSelect(option) {
            var _this = this;

            if (!option) return;
            this.addTag(option);
            this.$nextTick(function () {
              _this.newTag = '';
            });
          },
          removeTag: function removeTag(index) {
            var tag = this.tags.splice(index, 1)[0];
            this.$emit('input', this.tags);
            this.$emit('remove', tag);
            return tag;
          },
          removeLastTag: function removeLastTag() {
            if (this.tagsLength > 0) {
              this.removeTag(this.tagsLength - 1);
            }
          },
          keydown: function keydown(event) {
            if (this.removeOnKeys.indexOf(event.keyCode) !== -1 && !this.newTag.length) {
              this.removeLastTag();
            } // Stop if is to accept select only


            if (this.autocomplete && !this.allowNew) return;

            if (this.confirmKeyCodes.indexOf(event.keyCode) >= 0) {
              event.preventDefault();
              this.addTag();
            }
          },
          onTyping: function onTyping($event) {
            this.$emit('typing', $event.trim());
          }
        }
      };
      /***/
    },
    /* 224 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "taginput control",
            class: _vm.rootClasses
          }, [_c('div', {
            staticClass: "taginput-container",
            class: [_vm.statusType, _vm.size, _vm.containerClasses],
            attrs: {
              "disabled": _vm.disabled
            },
            on: {
              "click": function ($event) {
                _vm.hasInput && _vm.focus($event);
              }
            }
          }, [_vm._l(_vm.tags, function (tag, index) {
            return _c('b-tag', {
              key: index,
              attrs: {
                "type": _vm.type,
                "size": _vm.size,
                "rounded": _vm.rounded,
                "attached": _vm.attached,
                "tabstop": false,
                "disabled": _vm.disabled,
                "ellipsis": _vm.ellipsis,
                "closable": _vm.closable,
                "title": _vm.ellipsis && _vm.getNormalizedTagText(tag)
              },
              on: {
                "close": function ($event) {
                  _vm.removeTag(index);
                }
              }
            }, [_vm._v("\n            " + _vm._s(_vm.getNormalizedTagText(tag)) + "\n        ")]);
          }), _vm._v(" "), _vm.hasInput ? _c('b-autocomplete', _vm._b({
            ref: "autocomplete",
            attrs: {
              "data": _vm.data,
              "field": _vm.field,
              "icon": _vm.icon,
              "icon-pack": _vm.iconPack,
              "maxlength": _vm.maxlength,
              "has-counter": false,
              "size": _vm.size,
              "disabled": _vm.disabled,
              "loading": _vm.loading,
              "autocomplete": _vm.nativeAutocomplete,
              "keep-first": !_vm.allowNew,
              "use-html5-validation": _vm.useHtml5Validation
            },
            on: {
              "typing": _vm.onTyping,
              "focus": _vm.onFocus,
              "blur": _vm.customOnBlur,
              "select": _vm.onSelect
            },
            nativeOn: {
              "keydown": function ($event) {
                _vm.keydown($event);
              }
            },
            scopedSlots: _vm._u([{
              key: _vm.defaultSlotName,
              fn: function (props) {
                return [_vm._t("default", null, {
                  option: props.option,
                  index: props.index
                })];
              }
            }]),
            model: {
              value: _vm.newTag,
              callback: function ($$v) {
                _vm.newTag = $$v;
              },
              expression: "newTag"
            }
          }, 'b-autocomplete', _vm.$attrs, false), [_c('template', {
            slot: _vm.headerSlotName
          }, [_vm._t("header")], 2), _vm._v(" "), _c('template', {
            slot: _vm.emptySlotName
          }, [_vm._t("empty")], 2), _vm._v(" "), _c('template', {
            slot: _vm.footerSlotName
          }, [_vm._t("footer")], 2)], 2) : _vm._e()], 2), _vm._v(" "), _vm.maxtags || _vm.maxlength ? _c('p', {
            staticClass: "help counter"
          }, [_vm.maxlength && _vm.valueLength > 0 ? [_vm._v("\n            " + _vm._s(_vm.valueLength) + " / " + _vm._s(_vm.maxlength) + "\n        ")] : _vm.maxtags ? [_vm._v("\n            " + _vm._s(_vm.tagsLength) + " / " + _vm._s(_vm.maxtags) + "\n        ")] : _vm._e()], 2) : _vm._e()]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 225 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(226),
      /* template */
      __webpack_require__(227),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 226 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__ = __webpack_require__(1);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__utils_TimepickerMixin__ = __webpack_require__(62);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown__ = __webpack_require__(28);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem__ = __webpack_require__(29);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__input_Input__ = __webpack_require__(17);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_4__input_Input___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__input_Input__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_5__field_Field__ = __webpack_require__(30);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_5__field_Field___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__field_Field__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_6__select_Select__ = __webpack_require__(31);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_6__select_Select___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__select_Select__);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_7__icon_Icon__ = __webpack_require__(3);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_7__icon_Icon___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__icon_Icon__);

      var _components; //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BTimepicker',
        components: (_components = {}, __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_4__input_Input___default.a.name, __WEBPACK_IMPORTED_MODULE_4__input_Input___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_5__field_Field___default.a.name, __WEBPACK_IMPORTED_MODULE_5__field_Field___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_6__select_Select___default.a.name, __WEBPACK_IMPORTED_MODULE_6__select_Select___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_7__icon_Icon___default.a.name, __WEBPACK_IMPORTED_MODULE_7__icon_Icon___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown___default.a.name, __WEBPACK_IMPORTED_MODULE_2__dropdown_Dropdown___default.a), __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_defineProperty___default()(_components, __WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem___default.a.name, __WEBPACK_IMPORTED_MODULE_3__dropdown_DropdownItem___default.a), _components),
        mixins: [__WEBPACK_IMPORTED_MODULE_1__utils_TimepickerMixin__["a"
        /* default */
        ]],
        inheritAttrs: false,
        data: function data() {
          return {
            _isTimepicker: true
          };
        },
        computed: {
          nativeStep: function nativeStep() {
            if (this.enableSeconds) return '1';
          }
        }
      };
      /***/
    },
    /* 227 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('div', {
            staticClass: "timepicker control",
            class: [_vm.size, {
              'is-expanded': _vm.expanded
            }]
          }, [!_vm.isMobile || _vm.inline ? _c('b-dropdown', {
            ref: "dropdown",
            attrs: {
              "position": _vm.position,
              "disabled": _vm.disabled,
              "inline": _vm.inline
            }
          }, [!_vm.inline ? _c('b-input', _vm._b({
            ref: "input",
            attrs: {
              "slot": "trigger",
              "autocomplete": "off",
              "value": _vm.formatValue(_vm.computedValue),
              "placeholder": _vm.placeholder,
              "size": _vm.size,
              "icon": _vm.icon,
              "icon-pack": _vm.iconPack,
              "loading": _vm.loading,
              "disabled": _vm.disabled,
              "readonly": !_vm.editable,
              "rounded": _vm.rounded,
              "use-html5-validation": _vm.useHtml5Validation
            },
            on: {
              "focus": _vm.handleOnFocus,
              "blur": function ($event) {
                _vm.onBlur() && _vm.checkHtml5Validity();
              }
            },
            nativeOn: {
              "keyup": function ($event) {
                if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13, $event.key)) {
                  return null;
                }

                _vm.toggle(true);
              },
              "change": function ($event) {
                _vm.onChange($event.target.value);
              }
            },
            slot: "trigger"
          }, 'b-input', _vm.$attrs, false)) : _vm._e(), _vm._v(" "), _c('b-dropdown-item', {
            attrs: {
              "disabled": _vm.disabled,
              "custom": ""
            }
          }, [_c('b-field', {
            attrs: {
              "grouped": "",
              "position": "is-centered"
            }
          }, [_c('b-select', {
            attrs: {
              "disabled": _vm.disabled,
              "placeholder": "00"
            },
            nativeOn: {
              "change": function ($event) {
                _vm.onHoursChange($event.target.value);
              }
            },
            model: {
              value: _vm.hoursSelected,
              callback: function ($$v) {
                _vm.hoursSelected = $$v;
              },
              expression: "hoursSelected"
            }
          }, _vm._l(_vm.hours, function (hour) {
            return _c('option', {
              key: hour.value,
              attrs: {
                "disabled": _vm.isHourDisabled(hour.value)
              },
              domProps: {
                "value": hour.value
              }
            }, [_vm._v("\n                        " + _vm._s(hour.label) + "\n                    ")]);
          })), _vm._v(" "), _c('span', {
            staticClass: "control is-colon"
          }, [_vm._v(":")]), _vm._v(" "), _c('b-select', {
            attrs: {
              "disabled": _vm.disabled,
              "placeholder": "00"
            },
            nativeOn: {
              "change": function ($event) {
                _vm.onMinutesChange($event.target.value);
              }
            },
            model: {
              value: _vm.minutesSelected,
              callback: function ($$v) {
                _vm.minutesSelected = $$v;
              },
              expression: "minutesSelected"
            }
          }, _vm._l(_vm.minutes, function (minute) {
            return _c('option', {
              key: minute.value,
              attrs: {
                "disabled": _vm.isMinuteDisabled(minute.value)
              },
              domProps: {
                "value": minute.value
              }
            }, [_vm._v("\n                        " + _vm._s(minute.label) + "\n                    ")]);
          })), _vm._v(" "), _vm.enableSeconds ? [_c('span', {
            staticClass: "control is-colon"
          }, [_vm._v(":")]), _vm._v(" "), _c('b-select', {
            attrs: {
              "disabled": _vm.disabled,
              "placeholder": "00"
            },
            nativeOn: {
              "change": function ($event) {
                _vm.onSecondsChange($event.target.value);
              }
            },
            model: {
              value: _vm.secondsSelected,
              callback: function ($$v) {
                _vm.secondsSelected = $$v;
              },
              expression: "secondsSelected"
            }
          }, _vm._l(_vm.seconds, function (second) {
            return _c('option', {
              key: second.value,
              attrs: {
                "disabled": _vm.isSecondDisabled(second.value)
              },
              domProps: {
                "value": second.value
              }
            }, [_vm._v("\n                            " + _vm._s(second.label) + "\n                        ")]);
          }))] : _vm._e(), _vm._v(" "), !_vm.isHourFormat24 ? _c('b-select', {
            attrs: {
              "disabled": _vm.disabled
            },
            nativeOn: {
              "change": function ($event) {
                _vm.onMeridienChange($event.target.value);
              }
            },
            model: {
              value: _vm.meridienSelected,
              callback: function ($$v) {
                _vm.meridienSelected = $$v;
              },
              expression: "meridienSelected"
            }
          }, _vm._l(_vm.meridiens, function (meridien) {
            return _c('option', {
              key: meridien,
              domProps: {
                "value": meridien
              }
            }, [_vm._v("\n                        " + _vm._s(meridien) + "\n                    ")]);
          })) : _vm._e()], 2), _vm._v(" "), _vm.$slots.default !== undefined && _vm.$slots.default.length ? _c('footer', {
            staticClass: "timepicker-footer"
          }, [_vm._t("default")], 2) : _vm._e()], 1)], 1) : _c('b-input', _vm._b({
            ref: "input",
            attrs: {
              "type": "time",
              "step": _vm.nativeStep,
              "autocomplete": "off",
              "value": _vm.formatHHMMSS(_vm.computedValue),
              "placeholder": _vm.placeholder,
              "size": _vm.size,
              "icon": _vm.icon,
              "icon-pack": _vm.iconPack,
              "loading": _vm.loading,
              "max": _vm.formatHHMMSS(_vm.maxTime),
              "min": _vm.formatHHMMSS(_vm.minTime),
              "disabled": _vm.disabled,
              "readonly": false,
              "use-html5-validation": _vm.useHtml5Validation
            },
            on: {
              "focus": _vm.handleOnFocus,
              "blur": function ($event) {
                _vm.onBlur() && _vm.checkHtml5Validity();
              }
            },
            nativeOn: {
              "change": function ($event) {
                _vm.onChange($event.target.value);
              }
            }
          }, 'b-input', _vm.$attrs, false))], 1);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 228 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(229),
      /* template */
      __webpack_require__(230),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 229 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(2);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__utils_NoticeMixin_js__ = __webpack_require__(45); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BToast',
        mixins: [__WEBPACK_IMPORTED_MODULE_1__utils_NoticeMixin_js__["a"
        /* default */
        ]],
        data: function data() {
          return {
            newDuration: this.duration || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a"
            /* default */
            ].defaultToastDuration
          };
        }
      };
      /***/
    },
    /* 230 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('transition', {
            attrs: {
              "enter-active-class": _vm.transition.enter,
              "leave-active-class": _vm.transition.leave
            }
          }, [_c('div', {
            directives: [{
              name: "show",
              rawName: "v-show",
              value: _vm.isActive,
              expression: "isActive"
            }],
            staticClass: "toast",
            class: [_vm.type, _vm.position],
            attrs: {
              "aria-hidden": !_vm.isActive,
              "role": "alert"
            }
          }, [_c('div', {
            domProps: {
              "innerHTML": _vm._s(_vm.message)
            }
          })])]);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 231 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(232),
      /* template */
      __webpack_require__(233),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 232 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__utils_config__ = __webpack_require__(2); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BTooltip',
        props: {
          active: {
            type: Boolean,
            default: true
          },
          type: String,
          label: String,
          position: {
            type: String,
            default: 'is-top',
            validator: function validator(value) {
              return ['is-top', 'is-bottom', 'is-left', 'is-right'].indexOf(value) > -1;
            }
          },
          always: Boolean,
          animated: Boolean,
          square: Boolean,
          dashed: Boolean,
          multilined: Boolean,
          size: {
            type: String,
            default: 'is-medium'
          },
          delay: {
            type: Number,
            default: 0
          }
        },
        computed: {
          newType: function newType() {
            return this.type || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a"
            /* default */
            ].defaultTooltipType;
          },
          newAnimated: function newAnimated() {
            return this.animated || __WEBPACK_IMPORTED_MODULE_0__utils_config__["a"
            /* default */
            ].defaultTooltipAnimated;
          }
        }
      };
      /***/
    },
    /* 233 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('span', {
            class: [_vm.newType, _vm.position, _vm.size, {
              'b-tooltip': _vm.active,
              'is-square': _vm.square,
              'is-animated': _vm.newAnimated,
              'is-always': _vm.always,
              'is-multiline': _vm.multilined,
              'is-dashed': _vm.dashed
            }],
            style: {
              'transition-delay': _vm.delay + "ms"
            },
            attrs: {
              "data-label": _vm.label
            }
          }, [_vm._t("default")], 2);
        },
        staticRenderFns: []
        /***/

      };
    },
    /* 234 */

    /***/
    function (module, exports, __webpack_require__) {
      var Component = __webpack_require__(0)(
      /* script */
      __webpack_require__(235),
      /* template */
      __webpack_require__(236),
      /* styles */
      null,
      /* scopeId */
      null,
      /* moduleIdentifier (server only) */
      null);

      module.exports = Component.exports;
      /***/
    },
    /* 235 */

    /***/
    function (module, __webpack_exports__, __webpack_require__) {
      "use strict";

      Object.defineProperty(__webpack_exports__, "__esModule", {
        value: true
      });
      /* harmony import */

      var __WEBPACK_IMPORTED_MODULE_0__utils_FormElementMixin__ = __webpack_require__(10);
      /* harmony import */


      var __WEBPACK_IMPORTED_MODULE_1__utils_ssr__ = __webpack_require__(64); //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //
      //

      /* harmony default export */


      __webpack_exports__["default"] = {
        name: 'BUpload',
        mixins: [__WEBPACK_IMPORTED_MODULE_0__utils_FormElementMixin__["a"
        /* default */
        ]],
        inheritAttrs: false,
        props: {
          value: {
            type: [Object, Function, __WEBPACK_IMPORTED_MODULE_1__utils_ssr__["a"
            /* File */
            ], Array]
          },
          multiple: Boolean,
          disabled: Boolean,
          accept: String,
          dragDrop: Boolean,
          type: {
            type: String,
            default: 'is-primary'
          },
          native: {
            type: Boolean,
            default: false
          }
        },
        data: function data() {
          return {
            newValue: this.value,
            dragDropFocus: false,
            _elementRef: 'input'
          };
        },
        watch: {
          /**
          * When v-model is changed:
          *   1. Set internal value.
          *   2. Reset input value if array is empty
          *   3. If it's invalid, validate again.
          */
          value: function value(_value) {
            this.newValue = _value;

            if (!this.newValue || Array.isArray(this.newValue) && this.newValue.length === 0) {
              this.$refs.input.value = null;
            }

            !this.isValid && !this.dragDrop && this.checkHtml5Validity();
          }
        },
        methods: {
          /**
          * Listen change event on input type 'file',
          * emit 'input' event and validate
          */
          onFileChange: function onFileChange(event) {
            if (this.disabled || this.loading) return;

            if (this.dragDrop) {
              this.updateDragDropFocus(false);
            }

            var value = event.target.files || event.dataTransfer.files;

            if (value.length === 0) {
              if (!this.newValue) {
                return;
              }

              this.newValue = null;
            } else if (!this.multiple) {
              // only one element in case drag drop mode and isn't multiple
              if (this.dragDrop && value.length !== 1) return;else {
                var file = value[0];

                if (this.checkType(file)) {
                  this.newValue = file;
                } else if (this.newValue) {
                  this.newValue = null;
                } else {
                  return;
                }
              }
            } else {
              // always new values if native or undefined local
              var newValues = false;

              if (this.native || !this.newValue) {
                this.newValue = [];
                newValues = true;
              }

              for (var i = 0; i < value.length; i++) {
                var _file = value[i];

                if (this.checkType(_file)) {
                  this.newValue.push(_file);
                  newValues = true;
                }
              }

              if (!newValues) {
                return;
              }
            }

            this.$emit('input', this.newValue);
            !this.dragDrop && this.checkHtml5Validity();
          },

          /**
          * Listen drag-drop to update internal variable
          */
          updateDragDropFocus: function updateDragDropFocus(focus) {
            if (!this.disabled && !this.loading) {
              this.dragDropFocus = focus;
            }
          },

          /**
          * Check mime type of file
          */
          checkType: function checkType(file) {
            if (!this.accept) return true;
            var types = this.accept.split(',');
            if (types.length === 0) return true;
            var valid = false;

            for (var i = 0; i < types.length && !valid; i++) {
              var type = types[i].trim();

              if (type) {
                if (type.substring(0, 1) === '.') {
                  // check extension
                  var extIndex = file.name.lastIndexOf('.');
                  var extension = extIndex >= 0 ? file.name.substring(extIndex) : '';

                  if (extension.toLowerCase() === type.toLowerCase()) {
                    valid = true;
                  }
                } else {
                  // check mime type
                  if (file.type.match(type)) {
                    valid = true;
                  }
                }
              }
            }

            return valid;
          }
        }
      };
      /***/
    },
    /* 236 */

    /***/
    function (module, exports) {
      module.exports = {
        render: function () {
          var _vm = this;

          var _h = _vm.$createElement;

          var _c = _vm._self._c || _h;

          return _c('label', {
            staticClass: "upload control"
          }, [!_vm.dragDrop ? [_vm._t("default")] : _c('div', {
            staticClass: "upload-draggable",
            class: [_vm.type, {
              'is-loading': _vm.loading,
              'is-disabled': _vm.disabled,
              'is-hovered': _vm.dragDropFocus
            }],
            on: {
              "dragover": function ($event) {
                $event.preventDefault();

                _vm.updateDragDropFocus(true);
              },
              "dragleave": function ($event) {
                $event.preventDefault();

                _vm.updateDragDropFocus(false);
              },
              "dragenter": function ($event) {
                $event.preventDefault();

                _vm.updateDragDropFocus(true);
              },
              "drop": function ($event) {
                $event.preventDefault();

                _vm.onFileChange($event);
              }
            }
          }, [_vm._t("default")], 2), _vm._v(" "), _c('input', _vm._b({
            ref: "input",
            class: {
              'file-draggable': _vm.dragDrop
            },
            attrs: {
              "type": "file",
              "multiple": _vm.multiple,
              "accept": _vm.accept,
              "disabled": _vm.disabled
            },
            on: {
              "change": _vm.onFileChange
            }
          }, 'input', _vm.$attrs, false))], 2);
        },
        staticRenderFns: []
        /***/

      };
    }])
  );
});
},{"vue":"f5S3"}],"V40F":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    leftMenu: {
      type: Array,
      required: false
    },
    rightMenu: {
      type: Array,
      required: false
    },
    homeLink: {
      type: String,
      required: false
    }
  },
  data: function data() {
    return {
      menu: {
        left: [{
          label: "setting",
          link: "#setting",
          icon: "mdi-cogs"
        }],
        right: [{
          label: "🔒 logout",
          link: "#logout",
          icon: ""
        }]
      },
      activeNavbar: false
    };
  },
  computed: {
    showLeftMenu: function showLeftMenu() {
      if (this.leftMenu === undefined) return this.menu.left;
      return this.leftMenu.length > 0 ? this.leftMenu : this.menu.left;
    },
    showRightMenu: function showRightMenu() {
      if (this.rightMenu === undefined) return this.menu.right;
      return this.rightMenu.length > 0 ? this.rightMenu : this.menu.right;
    },
    homeLinkCheck: function homeLinkCheck() {
      if (this.homeLink === undefined) return "#";
      return this.homeLink;
    }
  },
  methods: {
    navbarStatus: function navbarStatus(paddingClass) {
      return paddingClass + (this.activeNavbar ? " is-active" : "");
    }
  }
};
exports.default = _default;
        var $e58795 = exports.default || module.exports;
      
      if (typeof $e58795 === 'function') {
        $e58795 = $e58795.options;
      }
    
        /* template */
        Object.assign($e58795, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{staticClass:"navbar is-primary",attrs:{"role":"navigation","aria-label":"main navigation"}},[_c('div',{staticClass:"navbar-brand"},[_c('a',{staticClass:"navbar-item",attrs:{"href":_vm.homeLinkCheck}},[_c('span',{staticClass:"mdi mdi-view-grid in-left"}),_vm._v("\n\t\t\tPROUDS\n\t\t")]),_vm._v(" "),_c('a',{class:_vm.navbarStatus('navbar-burger burger'),attrs:{"role":"button","aria-label":"menu","aria-expanded":"false","data-target":"navbarBasicExample"},on:{"click":function($event){_vm.activeNavbar = !_vm.activeNavbar}}},[_c('span',{attrs:{"aria-hidden":"true"}}),_vm._v(" "),_c('span',{attrs:{"aria-hidden":"true"}}),_vm._v(" "),_c('span',{attrs:{"aria-hidden":"true"}})])]),_vm._v(" "),_c('div',{class:_vm.navbarStatus('navbar-menu animated fadeIn'),attrs:{"id":"navbarBasicExample"}},[_c('div',{staticClass:"navbar-start"},_vm._l((_vm.showLeftMenu),function(menu,index){return _c('a',{key:index,class:'navbar-item ' + (menu.active ? 'is-active' : ''),attrs:{"href":menu.link}},[(menu.icon != '')?_c('span',{class:'mdi ' + menu.icon + ' in-left'}):_vm._e(),_vm._v("\n\t\t\t\t"+_vm._s(menu.label)+"\n\t\t\t")])}),0),_vm._v(" "),_c('div',{staticClass:"navbar-end"},_vm._l((_vm.showRightMenu),function(menu,index){return _c('a',{key:index,staticClass:"navbar-item",attrs:{"href":menu.link}},[(menu.icon != '')?_c('span',{class:'mdi ' + menu.icon + ' in-left'}):_vm._e(),_vm._v("\n\t\t\t\t"+_vm._s(menu.label)+"\n\t\t\t")])}),0)])])}
var staticRenderFns = []

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{}],"PsWb":[function(require,module,exports) {
var define;
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("VueClazyLoad", [], factory);
	else if(typeof exports === 'object')
		exports["VueClazyLoad"] = factory();
	else
		root["VueClazyLoad"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VueClazyLoad", function() { return VueClazyLoad; });
/*!
 * Vue Clazy Load
 * Component-based lazy (CLazy) load images in Vue.js 2
 * @author Matheus Grieger
 * @version 0.4.2
 */
var ClazyLoadComponent = {
  name: 'ClazyLoad',
  props: {
    /**
     * HTML/Component tag name to be used in place of the component
     * @type {String}
     * @default div
     */
    tag: {
      type: String,
      default: 'div'
    },
    /**
     * Image source URL
     * @type {String}
     * @required
     */
    src: {
      type: String,
      required: true
    },
    /**
     * IntersectionObserver root element
     * @type {String}
     */
    element: String,
    /**
     * IntersectionObserver threshold
     * @type {Array, Number}
     */
    threshold: {
      type: [Array, Number],
      default: function _default() {
        return [0, 0.5, 1];
      }
    },
    /**
     * InserectionObserver visibility ratio
     * @type {Number}
     */
    ratio: {
      type: Number,
      default: 0.4,
      validator: function validator(value) {
        // can't be less or equal to 0 and greater than 1
        return value > 0 && value <= 1;
      }
    },
    /**
     * IntersectionObserver root margin
     * @type {String}
     */
    margin: {
      type: String,
      default: '0px'
    },
    /**
     * Optional CORS mode ("anonymous" | "use-credentials")
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-crossorigin
     * @type {String}
     */
    crossorigin: {
      type: String,
      default: null,
      validator: function validator(value) {
        return value === 'anonymous' || value === 'use-credentials';
      }
    },
    /**
     * Class added to element when it finishes loading
     * @type {String}
     * @default loaded
     */
    loadedClass: {
      type: String,
      default: 'loaded'
    },
    /**
     * Class added to element while it is loading
     * @type {String}
     */
    loadingClass: {
      type: String,
      default: 'loading'
    },
    /**
     * Class added to element if loading failed
     * @type {String}
     */
    errorClass: {
      type: String,
      default: null
    }
  },
  data: function data() {
    return {
      loaded: false,
      observer: null,
      errored: false
    };
  },

  methods: {
    /**
     * Start loading image
     */
    load: function load() {
      var _this = this;

      // emits 'loading' event upwards
      this.$emit('loading');

      // disconnect observer
      // so it doesn't load more than once
      this.observer.disconnect();

      if (!this.loaded) {
        // fake image
        var img = new Image();

        img.addEventListener('load', function () {
          _this.loaded = true;
          // emits 'load' event upwards
          _this.$emit('load');

          _clear();
        });

        img.addEventListener('error', function (event) {
          _this.errored = true;
          // emits 'error' event upwards
          // adds the original event as argument
          _this.$emit('error', event);

          _clear();
        });

        // function used to clear variables from memory
        var _clear = function _clear() {
          // discard fake image
          img = null;
          // remove observer from memory
          _this.observer = null;
        };

        // CORS mode configuration
        if (this.crossorigin !== null) {
          img.crossOrigin = this.crossorigin;
        }

        img.src = this.src;
      }
    },


    /**
     * Creates IntersectionObserver instance and observe current element
     */
    observe: function observe() {
      var _this2 = this;

      var options = {
        threshold: this.threshold,
        root: this.element ? document.querySelector(this.element) : null,
        rootMargin: this.margin

        // creates IO instance
      };this.observer = new IntersectionObserver(function (entries) {
        // as we instantiated one for each component
        // we can directly access the first index
        if (entries[0].intersectionRatio >= _this2.ratio) {
          _this2.load();
        }
      }, options);

      // start observing main component
      this.observer.observe(this.$el);
    }
  },
  render: function render(h) {
    // class to be added to element indicating load state
    var elementClass = this.loaded ? this.loadedClass : this.loadingClass;

    return h(this.tag, {
      // if loading failed adds error class if exists,
      // otherwhise adds elementClass defined above
      class: this.errored && this.errorClass ? this.errorClass : elementClass
    }, [this.loaded ? this.$slots.default || this.$slots.image // allows for "default" slot
    : this.$slots.placeholder]);
  },
  mounted: function mounted() {
    // start observing the element visibility
    this.$nextTick(this.observe);
  }
};

// Export install function for CDN embeds
var install = function install(Vue) {
  Vue.component('clazy-load', ClazyLoadComponent);
};

// Component object
var VueClazyLoad = ClazyLoadComponent;

// Exports default object for ES6 modules
/* harmony default export */ __webpack_exports__["default"] = ({
  install: install
});

/***/ })
/******/ ]);
});
},{}],"B9u9":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vueClazyLoad = require("vue-clazy-load");

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  components: {
    VueClazyLoad: _vueClazyLoad.VueClazyLoad
  },
  props: ["thumbnail", "title", "subtitle", "type"]
};
exports.default = _default;
        var $7993e8 = exports.default || module.exports;
      
      if (typeof $7993e8 === 'function') {
        $7993e8 = $7993e8.options;
      }
    
        /* template */
        Object.assign($7993e8, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',{staticClass:"media"},[(_vm.thumbnail !== undefined)?_c('vue-clazy-load',{staticClass:"media-left image is-64x64",attrs:{"src":_vm.thumbnail,"tag":"figure"}},[_c('img',{attrs:{"src":_vm.thumbnail}}),_vm._v(" "),_c('template',{slot:"placeholder"},[_c('b-loading',{attrs:{"active":"","is-full-page":false}})],1)],2):_vm._e(),_vm._v(" "),_c('div',{staticClass:"media-content"},[_c('div',{staticClass:"content"},[(_vm.type === undefined)?_c('p',[_c('strong',[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('small',[_vm._v(_vm._s(_vm.subtitle))]),_vm._v(" "),_c('br'),_vm._v(" "),_vm._t("body")],2):_c('b-message',{attrs:{"type":_vm.type,"size":"is-small"}},[_c('h4',{staticClass:"is-size-6",staticStyle:{"margin-bottom":"5px"}},[_c('strong',[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_c('small',[_vm._v(_vm._s(_vm.subtitle))])]),_vm._v(" "),_vm._t("body")],2)],1)]),_vm._v(" "),_c('div',{staticClass:"media-right"},[_vm._t("action")],2)],1)}
var staticRenderFns = []

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"vue-clazy-load":"PsWb"}],"Dm41":[function(require,module,exports) {
var define;
/*
 Highcharts JS v7.1.2 (2019-06-03)

 (c) 2009-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(O,J){"object"===typeof module&&module.exports?(J["default"]=J,module.exports=O.document?J(O):J):"function"===typeof define&&define.amd?define("highcharts/highcharts",function(){return J(O)}):(O.Highcharts&&O.Highcharts.error(16,!0),O.Highcharts=J(O))})("undefined"!==typeof window?window:this,function(O){function J(a,E,H,B){a.hasOwnProperty(E)||(a[E]=B.apply(null,H))}var G={};J(G,"parts/Globals.js",[],function(){var a="undefined"===typeof O?"undefined"!==typeof window?window:{}:O,E=a.document,
H=a.navigator&&a.navigator.userAgent||"",B=E&&E.createElementNS&&!!E.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect,h=/(edge|msie|trident)/i.test(H)&&!a.opera,e=-1!==H.indexOf("Firefox"),q=-1!==H.indexOf("Chrome"),t=e&&4>parseInt(H.split("Firefox/")[1],10);return{product:"Highcharts",version:"7.1.2",deg2rad:2*Math.PI/360,doc:E,hasBidiBug:t,hasTouch:E&&"undefined"!==typeof E.documentElement.ontouchstart,isMS:h,isWebKit:-1!==H.indexOf("AppleWebKit"),isFirefox:e,isChrome:q,isSafari:!q&&
-1!==H.indexOf("Safari"),isTouchDevice:/(Mobile|Android|Windows Phone)/.test(H),SVG_NS:"http://www.w3.org/2000/svg",chartCount:0,seriesTypes:{},symbolSizes:{},svg:B,win:a,marginNames:["plotTop","marginRight","marginBottom","plotLeft"],noop:function(){},charts:[],dateFormats:{}}});J(G,"parts/Utilities.js",[G["parts/Globals.js"]],function(a){a.timers=[];var E=a.charts,H=a.doc,B=a.win;a.error=function(h,e,q){var t=a.isNumber(h)?"Highcharts error #"+h+": www.highcharts.com/errors/"+h:h,u=function(){if(e)throw Error(t);
B.console&&console.log(t)};q?a.fireEvent(q,"displayError",{code:h,message:t},u):u()};a.Fx=function(a,e,q){this.options=e;this.elem=a;this.prop=q};a.Fx.prototype={dSetter:function(){var a=this.paths[0],e=this.paths[1],q=[],t=this.now,u=a.length,v;if(1===t)q=this.toD;else if(u===e.length&&1>t)for(;u--;)v=parseFloat(a[u]),q[u]=isNaN(v)?e[u]:t*parseFloat(e[u]-v)+v;else q=e;this.elem.attr("d",q,null,!0)},update:function(){var a=this.elem,e=this.prop,q=this.now,t=this.options.step;if(this[e+"Setter"])this[e+
"Setter"]();else a.attr?a.element&&a.attr(e,q,null,!0):a.style[e]=q+this.unit;t&&t.call(a,q,this)},run:function(h,e,q){var t=this,u=t.options,v=function(a){return v.stopped?!1:t.step(a)},n=B.requestAnimationFrame||function(a){setTimeout(a,13)},g=function(){for(var d=0;d<a.timers.length;d++)a.timers[d]()||a.timers.splice(d--,1);a.timers.length&&n(g)};h!==e||this.elem["forceAnimate:"+this.prop]?(this.startTime=+new Date,this.start=h,this.end=e,this.unit=q,this.now=this.start,this.pos=0,v.elem=this.elem,
v.prop=this.prop,v()&&1===a.timers.push(v)&&n(g)):(delete u.curAnim[this.prop],u.complete&&0===Object.keys(u.curAnim).length&&u.complete.call(this.elem))},step:function(h){var e=+new Date,q,t=this.options,u=this.elem,v=t.complete,n=t.duration,g=t.curAnim;u.attr&&!u.element?h=!1:h||e>=n+this.startTime?(this.now=this.end,this.pos=1,this.update(),q=g[this.prop]=!0,a.objectEach(g,function(a){!0!==a&&(q=!1)}),q&&v&&v.call(u),h=!1):(this.pos=t.easing((e-this.startTime)/n),this.now=this.start+(this.end-
this.start)*this.pos,this.update(),h=!0);return h},initPath:function(h,e,q){function t(a){var b,l;for(c=a.length;c--;)b="M"===a[c]||"L"===a[c],l=/[a-zA-Z]/.test(a[c+3]),b&&l&&a.splice(c+1,0,a[c+1],a[c+2],a[c+1],a[c+2])}function u(a,d){for(;a.length<k;){a[0]=d[k-a.length];var l=a.slice(0,b);[].splice.apply(a,[0,0].concat(l));x&&(l=a.slice(a.length-b),[].splice.apply(a,[a.length,0].concat(l)),c--)}a[0]="M"}function v(a,c){for(var l=(k-a.length)/b;0<l&&l--;)p=a.slice().splice(a.length/K-b,b*K),p[0]=
c[k-b-l*b],m&&(p[b-6]=p[b-2],p[b-5]=p[b-1]),[].splice.apply(a,[a.length/K,0].concat(p)),x&&l--}e=e||"";var n,g=h.startX,d=h.endX,m=-1<e.indexOf("C"),b=m?7:3,k,p,c;e=e.split(" ");q=q.slice();var x=h.isArea,K=x?2:1,w;m&&(t(e),t(q));if(g&&d){for(c=0;c<g.length;c++)if(g[c]===d[0]){n=c;break}else if(g[0]===d[d.length-g.length+c]){n=c;w=!0;break}else if(g[g.length-1]===d[d.length-g.length+c]){n=g.length-c;break}"undefined"===typeof n&&(e=[])}e.length&&a.isNumber(n)&&(k=q.length+n*K*b,w?(u(e,q),v(q,e)):
(u(q,e),v(e,q)));return[e,q]},fillSetter:function(){a.Fx.prototype.strokeSetter.apply(this,arguments)},strokeSetter:function(){this.elem.attr(this.prop,a.color(this.start).tweenTo(a.color(this.end),this.pos),null,!0)}};a.merge=function(){var h,e=arguments,q,t={},u=function(e,n){"object"!==typeof e&&(e={});a.objectEach(n,function(g,d){!a.isObject(g,!0)||a.isClass(g)||a.isDOMElement(g)?e[d]=n[d]:e[d]=u(e[d]||{},g)});return e};!0===e[0]&&(t=e[1],e=Array.prototype.slice.call(e,2));q=e.length;for(h=0;h<
q;h++)t=u(t,e[h]);return t};a.pInt=function(a,e){return parseInt(a,e||10)};a.isString=function(a){return"string"===typeof a};a.isArray=function(a){a=Object.prototype.toString.call(a);return"[object Array]"===a||"[object Array Iterator]"===a};a.isObject=function(h,e){return!!h&&"object"===typeof h&&(!e||!a.isArray(h))};a.isDOMElement=function(h){return a.isObject(h)&&"number"===typeof h.nodeType};a.isClass=function(h){var e=h&&h.constructor;return!(!a.isObject(h,!0)||a.isDOMElement(h)||!e||!e.name||
"Object"===e.name)};a.isNumber=function(a){return"number"===typeof a&&!isNaN(a)&&Infinity>a&&-Infinity<a};a.erase=function(a,e){for(var h=a.length;h--;)if(a[h]===e){a.splice(h,1);break}};a.defined=function(a){return"undefined"!==typeof a&&null!==a};a.attr=function(h,e,q){var t;a.isString(e)?a.defined(q)?h.setAttribute(e,q):h&&h.getAttribute&&((t=h.getAttribute(e))||"class"!==e||(t=h.getAttribute(e+"Name"))):a.defined(e)&&a.isObject(e)&&a.objectEach(e,function(a,e){h.setAttribute(e,a)});return t};
a.splat=function(h){return a.isArray(h)?h:[h]};a.syncTimeout=function(a,e,q){if(e)return setTimeout(a,e,q);a.call(0,q)};a.clearTimeout=function(h){a.defined(h)&&clearTimeout(h)};a.extend=function(a,e){var h;a||(a={});for(h in e)a[h]=e[h];return a};a.pick=function(){var a=arguments,e,q,t=a.length;for(e=0;e<t;e++)if(q=a[e],"undefined"!==typeof q&&null!==q)return q};a.css=function(h,e){a.isMS&&!a.svg&&e&&"undefined"!==typeof e.opacity&&(e.filter="alpha(opacity\x3d"+100*e.opacity+")");a.extend(h.style,
e)};a.createElement=function(h,e,q,t,u){h=H.createElement(h);var v=a.css;e&&a.extend(h,e);u&&v(h,{padding:"0",border:"none",margin:"0"});q&&v(h,q);t&&t.appendChild(h);return h};a.extendClass=function(h,e){var q=function(){};q.prototype=new h;a.extend(q.prototype,e);return q};a.pad=function(a,e,q){return Array((e||2)+1-String(a).replace("-","").length).join(q||"0")+a};a.relativeLength=function(a,e,q){return/%$/.test(a)?e*parseFloat(a)/100+(q||0):parseFloat(a)};a.wrap=function(a,e,q){var h=a[e];a[e]=
function(){var a=Array.prototype.slice.call(arguments),e=arguments,n=this;n.proceed=function(){h.apply(n,arguments.length?arguments:e)};a.unshift(h);a=q.apply(this,a);n.proceed=null;return a}};a.datePropsToTimestamps=function(h){a.objectEach(h,function(e,q){a.isObject(e)&&"function"===typeof e.getTime?h[q]=e.getTime():(a.isObject(e)||a.isArray(e))&&a.datePropsToTimestamps(e)})};a.formatSingle=function(h,e,q){var t=/\.([0-9])/,u=a.defaultOptions.lang;/f$/.test(h)?(q=(q=h.match(t))?q[1]:-1,null!==e&&
(e=a.numberFormat(e,q,u.decimalPoint,-1<h.indexOf(",")?u.thousandsSep:""))):e=(q||a.time).dateFormat(h,e);return e};a.format=function(h,e,q){for(var t="{",u=!1,v,n,g,d,m=[],b;h;){t=h.indexOf(t);if(-1===t)break;v=h.slice(0,t);if(u){v=v.split(":");n=v.shift().split(".");d=n.length;b=e;for(g=0;g<d;g++)b&&(b=b[n[g]]);v.length&&(b=a.formatSingle(v.join(":"),b,q));m.push(b)}else m.push(v);h=h.slice(t+1);t=(u=!u)?"}":"{"}m.push(h);return m.join("")};a.getMagnitude=function(a){return Math.pow(10,Math.floor(Math.log(a)/
Math.LN10))};a.normalizeTickInterval=function(h,e,q,t,u){var v,n=h;q=a.pick(q,1);v=h/q;e||(e=u?[1,1.2,1.5,2,2.5,3,4,5,6,8,10]:[1,2,2.5,5,10],!1===t&&(1===q?e=e.filter(function(a){return 0===a%1}):.1>=q&&(e=[1/q])));for(t=0;t<e.length&&!(n=e[t],u&&n*q>=h||!u&&v<=(e[t]+(e[t+1]||e[t]))/2);t++);return n=a.correctFloat(n*q,-Math.round(Math.log(.001)/Math.LN10))};a.stableSort=function(a,e){var h=a.length,t,u;for(u=0;u<h;u++)a[u].safeI=u;a.sort(function(a,n){t=e(a,n);return 0===t?a.safeI-n.safeI:t});for(u=
0;u<h;u++)delete a[u].safeI};a.arrayMin=function(a){for(var e=a.length,h=a[0];e--;)a[e]<h&&(h=a[e]);return h};a.arrayMax=function(a){for(var e=a.length,h=a[0];e--;)a[e]>h&&(h=a[e]);return h};a.destroyObjectProperties=function(h,e){a.objectEach(h,function(a,t){a&&a!==e&&a.destroy&&a.destroy();delete h[t]})};a.discardElement=function(h){var e=a.garbageBin;e||(e=a.createElement("div"));h&&e.appendChild(h);e.innerHTML=""};a.correctFloat=function(a,e){return parseFloat(a.toPrecision(e||14))};a.setAnimation=
function(h,e){e.renderer.globalAnimation=a.pick(h,e.options.chart.animation,!0)};a.animObject=function(h){return a.isObject(h)?a.merge(h):{duration:h?500:0}};a.timeUnits={millisecond:1,second:1E3,minute:6E4,hour:36E5,day:864E5,week:6048E5,month:24192E5,year:314496E5};a.numberFormat=function(h,e,q,t){h=+h||0;e=+e;var u=a.defaultOptions.lang,v=(h.toString().split(".")[1]||"").split("e")[0].length,n,g,d=h.toString().split("e");-1===e?e=Math.min(v,20):a.isNumber(e)?e&&d[1]&&0>d[1]&&(n=e+ +d[1],0<=n?(d[0]=
(+d[0]).toExponential(n).split("e")[0],e=n):(d[0]=d[0].split(".")[0]||0,h=20>e?(d[0]*Math.pow(10,d[1])).toFixed(e):0,d[1]=0)):e=2;g=(Math.abs(d[1]?d[0]:h)+Math.pow(10,-Math.max(e,v)-1)).toFixed(e);v=String(a.pInt(g));n=3<v.length?v.length%3:0;q=a.pick(q,u.decimalPoint);t=a.pick(t,u.thousandsSep);h=(0>h?"-":"")+(n?v.substr(0,n)+t:"");h+=v.substr(n).replace(/(\d{3})(?=\d)/g,"$1"+t);e&&(h+=q+g.slice(-e));d[1]&&0!==+h&&(h+="e"+d[1]);return h};Math.easeInOutSine=function(a){return-.5*(Math.cos(Math.PI*
a)-1)};a.getStyle=function(h,e,q){if("width"===e)return Math.max(0,Math.min(h.offsetWidth,h.scrollWidth,h.getBoundingClientRect&&"none"===a.getStyle(h,"transform",!1)?Math.floor(h.getBoundingClientRect().width):Infinity)-a.getStyle(h,"padding-left")-a.getStyle(h,"padding-right"));if("height"===e)return Math.max(0,Math.min(h.offsetHeight,h.scrollHeight)-a.getStyle(h,"padding-top")-a.getStyle(h,"padding-bottom"));B.getComputedStyle||a.error(27,!0);if(h=B.getComputedStyle(h,void 0))h=h.getPropertyValue(e),
a.pick(q,"opacity"!==e)&&(h=a.pInt(h));return h};a.inArray=function(a,e,q){return e.indexOf(a,q)};a.find=Array.prototype.find?function(a,e){return a.find(e)}:function(a,e){var h,t=a.length;for(h=0;h<t;h++)if(e(a[h],h))return a[h]};a.keys=Object.keys;a.offset=function(a){var e=H.documentElement;a=a.parentElement||a.parentNode?a.getBoundingClientRect():{top:0,left:0};return{top:a.top+(B.pageYOffset||e.scrollTop)-(e.clientTop||0),left:a.left+(B.pageXOffset||e.scrollLeft)-(e.clientLeft||0)}};a.stop=function(h,
e){for(var q=a.timers.length;q--;)a.timers[q].elem!==h||e&&e!==a.timers[q].prop||(a.timers[q].stopped=!0)};a.objectEach=function(a,e,q){for(var h in a)a.hasOwnProperty(h)&&e.call(q||a[h],a[h],h,a)};a.objectEach({map:"map",each:"forEach",grep:"filter",reduce:"reduce",some:"some"},function(h,e){a[e]=function(a){return Array.prototype[h].apply(a,[].slice.call(arguments,1))}});a.addEvent=function(h,e,q,t){void 0===t&&(t={});var u,v=h.addEventListener||a.addEventListenerPolyfill;u="function"===typeof h&&
h.prototype?h.prototype.protoEvents=h.prototype.protoEvents||{}:h.hcEvents=h.hcEvents||{};a.Point&&h instanceof a.Point&&h.series&&h.series.chart&&(h.series.chart.runTrackerClick=!0);v&&v.call(h,e,q,!1);u[e]||(u[e]=[]);u[e].push({fn:q,order:"number"===typeof t.order?t.order:Infinity});u[e].sort(function(a,g){return a.order-g.order});return function(){a.removeEvent(h,e,q)}};a.removeEvent=function(h,e,q){function t(n,g){var d=h.removeEventListener||a.removeEventListenerPolyfill;d&&d.call(h,n,g,!1)}
function u(n){var g,d;h.nodeName&&(e?(g={},g[e]=!0):g=n,a.objectEach(g,function(a,b){if(n[b])for(d=n[b].length;d--;)t(b,n[b][d].fn)}))}var v;["protoEvents","hcEvents"].forEach(function(a){var g=h[a];g&&(e?(v=g[e]||[],q?(g[e]=v.filter(function(a){return q!==a.fn}),t(e,q)):(u(g),g[e]=[])):(u(g),h[a]={}))})};a.fireEvent=function(h,e,q,t){var u,v;q=q||{};H.createEvent&&(h.dispatchEvent||h.fireEvent)?(u=H.createEvent("Events"),u.initEvent(e,!0,!0),a.extend(u,q),h.dispatchEvent?h.dispatchEvent(u):h.fireEvent(e,
u)):(q.target||a.extend(q,{preventDefault:function(){q.defaultPrevented=!0},target:h,type:e}),function(a,g){void 0===a&&(a=[]);void 0===g&&(g=[]);var d=0,m=0,b=a.length+g.length;for(v=0;v<b;v++)!1===(a[d]?g[m]?a[d].order<=g[m].order?a[d++]:g[m++]:a[d++]:g[m++]).fn.call(h,q)&&q.preventDefault()}(h.protoEvents&&h.protoEvents[e],h.hcEvents&&h.hcEvents[e]));t&&!q.defaultPrevented&&t.call(h,q)};a.animate=function(h,e,q){var t,u="",v,n,g;a.isObject(q)||(g=arguments,q={duration:g[2],easing:g[3],complete:g[4]});
a.isNumber(q.duration)||(q.duration=400);q.easing="function"===typeof q.easing?q.easing:Math[q.easing]||Math.easeInOutSine;q.curAnim=a.merge(e);a.objectEach(e,function(d,g){a.stop(h,g);n=new a.Fx(h,q,g);v=null;"d"===g?(n.paths=n.initPath(h,h.d,e.d),n.toD=e.d,t=0,v=1):h.attr?t=h.attr(g):(t=parseFloat(a.getStyle(h,g))||0,"opacity"!==g&&(u="px"));v||(v=d);v&&v.match&&v.match("px")&&(v=v.replace(/px/g,""));n.run(t,v,u)})};a.seriesType=function(h,e,q,t,u){var v=a.getOptions(),n=a.seriesTypes;v.plotOptions[h]=
a.merge(v.plotOptions[e],q);n[h]=a.extendClass(n[e]||function(){},t);n[h].prototype.type=h;u&&(n[h].prototype.pointClass=a.extendClass(a.Point,u));return n[h]};a.uniqueKey=function(){var a=Math.random().toString(36).substring(2,9),e=0;return function(){return"highcharts-"+a+"-"+e++}}();a.isFunction=function(a){return"function"===typeof a};B.jQuery&&(B.jQuery.fn.highcharts=function(){var h=[].slice.call(arguments);if(this[0])return h[0]?(new (a[a.isString(h[0])?h.shift():"Chart"])(this[0],h[0],h[1]),
this):E[a.attr(this[0],"data-highcharts-chart")]})});J(G,"parts/Color.js",[G["parts/Globals.js"]],function(a){var E=a.isNumber,H=a.merge,B=a.pInt;a.Color=function(h){if(!(this instanceof a.Color))return new a.Color(h);this.init(h)};a.Color.prototype={parsers:[{regex:/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/,parse:function(a){return[B(a[1]),B(a[2]),B(a[3]),parseFloat(a[4],10)]}},{regex:/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/,
parse:function(a){return[B(a[1]),B(a[2]),B(a[3]),1]}}],names:{white:"#ffffff",black:"#000000"},init:function(h){var e,q,t,u;if((this.input=h=this.names[h&&h.toLowerCase?h.toLowerCase():""]||h)&&h.stops)this.stops=h.stops.map(function(e){return new a.Color(e[1])});else if(h&&h.charAt&&"#"===h.charAt()&&(e=h.length,h=parseInt(h.substr(1),16),7===e?q=[(h&16711680)>>16,(h&65280)>>8,h&255,1]:4===e&&(q=[(h&3840)>>4|(h&3840)>>8,(h&240)>>4|h&240,(h&15)<<4|h&15,1])),!q)for(t=this.parsers.length;t--&&!q;)u=
this.parsers[t],(e=u.regex.exec(h))&&(q=u.parse(e));this.rgba=q||[]},get:function(a){var e=this.input,h=this.rgba,t;this.stops?(t=H(e),t.stops=[].concat(t.stops),this.stops.forEach(function(e,h){t.stops[h]=[t.stops[h][0],e.get(a)]})):t=h&&E(h[0])?"rgb"===a||!a&&1===h[3]?"rgb("+h[0]+","+h[1]+","+h[2]+")":"a"===a?h[3]:"rgba("+h.join(",")+")":e;return t},brighten:function(a){var e,h=this.rgba;if(this.stops)this.stops.forEach(function(e){e.brighten(a)});else if(E(a)&&0!==a)for(e=0;3>e;e++)h[e]+=B(255*
a),0>h[e]&&(h[e]=0),255<h[e]&&(h[e]=255);return this},setOpacity:function(a){this.rgba[3]=a;return this},tweenTo:function(a,e){var h=this.rgba,t=a.rgba;t.length&&h&&h.length?(a=1!==t[3]||1!==h[3],e=(a?"rgba(":"rgb(")+Math.round(t[0]+(h[0]-t[0])*(1-e))+","+Math.round(t[1]+(h[1]-t[1])*(1-e))+","+Math.round(t[2]+(h[2]-t[2])*(1-e))+(a?","+(t[3]+(h[3]-t[3])*(1-e)):"")+")"):e=a.input||"none";return e}};a.color=function(h){return new a.Color(h)}});J(G,"parts/SvgRenderer.js",[G["parts/Globals.js"]],function(a){var E,
H,B=a.addEvent,h=a.animate,e=a.attr,q=a.charts,t=a.color,u=a.css,v=a.createElement,n=a.defined,g=a.deg2rad,d=a.destroyObjectProperties,m=a.doc,b=a.extend,k=a.erase,p=a.hasTouch,c=a.isArray,x=a.isFirefox,K=a.isMS,w=a.isObject,F=a.isString,C=a.isWebKit,l=a.merge,D=a.noop,A=a.objectEach,z=a.pick,I=a.pInt,f=a.removeEvent,r=a.splat,Q=a.stop,N=a.svg,L=a.SVG_NS,M=a.symbolSizes,R=a.win;E=a.SVGElement=function(){return this};b(E.prototype,{opacity:1,SVG_NS:L,textProps:"direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "),
init:function(y,f){this.element="span"===f?v(f):m.createElementNS(this.SVG_NS,f);this.renderer=y;a.fireEvent(this,"afterInit")},animate:function(y,f,b){var c=a.animObject(z(f,this.renderer.globalAnimation,!0));z(m.hidden,m.msHidden,m.webkitHidden,!1)&&(c.duration=0);0!==c.duration?(b&&(c.complete=b),h(this,y,c)):(this.attr(y,void 0,b),a.objectEach(y,function(a,y){c.step&&c.step.call(this,a,{prop:y,pos:1})},this));return this},complexColor:function(y,f,b){var r=this.renderer,d,p,k,g,S,L,m,x,e,D,w,
z=[],N;a.fireEvent(this.renderer,"complexColor",{args:arguments},function(){y.radialGradient?p="radialGradient":y.linearGradient&&(p="linearGradient");p&&(k=y[p],S=r.gradients,m=y.stops,D=b.radialReference,c(k)&&(y[p]=k={x1:k[0],y1:k[1],x2:k[2],y2:k[3],gradientUnits:"userSpaceOnUse"}),"radialGradient"===p&&D&&!n(k.gradientUnits)&&(g=k,k=l(k,r.getRadialAttr(D,g),{gradientUnits:"userSpaceOnUse"})),A(k,function(a,y){"id"!==y&&z.push(y,a)}),A(m,function(a){z.push(a)}),z=z.join(","),S[z]?w=S[z].attr("id"):
(k.id=w=a.uniqueKey(),S[z]=L=r.createElement(p).attr(k).add(r.defs),L.radAttr=g,L.stops=[],m.forEach(function(y){0===y[1].indexOf("rgba")?(d=a.color(y[1]),x=d.get("rgb"),e=d.get("a")):(x=y[1],e=1);y=r.createElement("stop").attr({offset:y[0],"stop-color":x,"stop-opacity":e}).add(L);L.stops.push(y)})),N="url("+r.url+"#"+w+")",b.setAttribute(f,N),b.gradient=z,y.toString=function(){return N})})},applyTextOutline:function(y){var f=this.element,b,c,r;-1!==y.indexOf("contrast")&&(y=y.replace(/contrast/g,
this.renderer.getContrast(f.style.fill)));y=y.split(" ");b=y[y.length-1];(c=y[0])&&"none"!==c&&a.svg&&(this.fakeTS=!0,y=[].slice.call(f.getElementsByTagName("tspan")),this.ySetter=this.xSetter,c=c.replace(/(^[\d\.]+)(.*?)$/g,function(a,y,f){return 2*y+f}),this.removeTextOutline(y),r=f.firstChild,y.forEach(function(a,y){0===y&&(a.setAttribute("x",f.getAttribute("x")),y=f.getAttribute("y"),a.setAttribute("y",y||0),null===y&&f.setAttribute("y",0));a=a.cloneNode(1);e(a,{"class":"highcharts-text-outline",
fill:b,stroke:b,"stroke-width":c,"stroke-linejoin":"round"});f.insertBefore(a,r)}))},removeTextOutline:function(a){for(var y=a.length,f;y--;)f=a[y],"highcharts-text-outline"===f.getAttribute("class")&&k(a,this.element.removeChild(f))},symbolCustomAttribs:"x y width height r start end innerR anchorX anchorY rounded".split(" "),attr:function(y,f,b,c){var r,k=this.element,l,p=this,d,g,L=this.symbolCustomAttribs;"string"===typeof y&&void 0!==f&&(r=y,y={},y[r]=f);"string"===typeof y?p=(this[y+"Getter"]||
this._defaultGetter).call(this,y,k):(A(y,function(f,b){d=!1;c||Q(this,b);this.symbolName&&-1!==a.inArray(b,L)&&(l||(this.symbolAttr(y),l=!0),d=!0);!this.rotation||"x"!==b&&"y"!==b||(this.doTransform=!0);d||(g=this[b+"Setter"]||this._defaultSetter,g.call(this,f,b,k),!this.styledMode&&this.shadows&&/^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(b)&&this.updateShadows(b,f,g))},this),this.afterSetters());b&&b.call(this);return p},afterSetters:function(){this.doTransform&&(this.updateTransform(),
this.doTransform=!1)},updateShadows:function(a,f,b){for(var y=this.shadows,c=y.length;c--;)b.call(y[c],"height"===a?Math.max(f-(y[c].cutHeight||0),0):"d"===a?this.d:f,a,y[c])},addClass:function(a,f){var y=this.attr("class")||"";f||(a=(a||"").split(/ /g).reduce(function(a,f){-1===y.indexOf(f)&&a.push(f);return a},y?[y]:[]).join(" "));a!==y&&this.attr("class",a);return this},hasClass:function(a){return-1!==(this.attr("class")||"").split(" ").indexOf(a)},removeClass:function(a){return this.attr("class",
(this.attr("class")||"").replace(a,""))},symbolAttr:function(a){var y=this;"x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function(f){y[f]=z(a[f],y[f])});y.attr({d:y.renderer.symbols[y.symbolName](y.x,y.y,y.width,y.height,y)})},clip:function(a){return this.attr("clip-path",a?"url("+this.renderer.url+"#"+a.id+")":"none")},crisp:function(a,f){var y;f=f||a.strokeWidth||0;y=Math.round(f)%2/2;a.x=Math.floor(a.x||this.x||0)+y;a.y=Math.floor(a.y||this.y||0)+y;a.width=
Math.floor((a.width||this.width||0)-2*y);a.height=Math.floor((a.height||this.height||0)-2*y);n(a.strokeWidth)&&(a.strokeWidth=f);return a},css:function(a){var y=this.styles,f={},c=this.element,r,k="",l,p=!y,d=["textOutline","textOverflow","width"];a&&a.color&&(a.fill=a.color);y&&A(a,function(a,b){a!==y[b]&&(f[b]=a,p=!0)});p&&(y&&(a=b(y,f)),a&&(null===a.width||"auto"===a.width?delete this.textWidth:"text"===c.nodeName.toLowerCase()&&a.width&&(r=this.textWidth=I(a.width))),this.styles=a,r&&!N&&this.renderer.forExport&&
delete a.width,c.namespaceURI===this.SVG_NS?(l=function(a,y){return"-"+y.toLowerCase()},A(a,function(a,y){-1===d.indexOf(y)&&(k+=y.replace(/([A-Z])/g,l)+":"+a+";")}),k&&e(c,"style",k)):u(c,a),this.added&&("text"===this.element.nodeName&&this.renderer.buildText(this),a&&a.textOutline&&this.applyTextOutline(a.textOutline)));return this},getStyle:function(a){return R.getComputedStyle(this.element||this,"").getPropertyValue(a)},strokeWidth:function(){if(!this.renderer.styledMode)return this["stroke-width"]||
0;var a=this.getStyle("stroke-width"),f;a.indexOf("px")===a.length-2?a=I(a):(f=m.createElementNS(L,"rect"),e(f,{width:a,"stroke-width":0}),this.element.parentNode.appendChild(f),a=f.getBBox().width,f.parentNode.removeChild(f));return a},on:function(a,f){var y=this,b=y.element;p&&"click"===a?(b.ontouchstart=function(a){y.touchEventFired=Date.now();a.preventDefault();f.call(b,a)},b.onclick=function(a){(-1===R.navigator.userAgent.indexOf("Android")||1100<Date.now()-(y.touchEventFired||0))&&f.call(b,
a)}):b["on"+a]=f;return this},setRadialReference:function(a){var y=this.renderer.gradients[this.element.gradient];this.element.radialReference=a;y&&y.radAttr&&y.animate(this.renderer.getRadialAttr(a,y.radAttr));return this},translate:function(a,f){return this.attr({translateX:a,translateY:f})},invert:function(a){this.inverted=a;this.updateTransform();return this},updateTransform:function(){var a=this.translateX||0,f=this.translateY||0,b=this.scaleX,c=this.scaleY,r=this.inverted,k=this.rotation,l=
this.matrix,p=this.element;r&&(a+=this.width,f+=this.height);a=["translate("+a+","+f+")"];n(l)&&a.push("matrix("+l.join(",")+")");r?a.push("rotate(90) scale(-1,1)"):k&&a.push("rotate("+k+" "+z(this.rotationOriginX,p.getAttribute("x"),0)+" "+z(this.rotationOriginY,p.getAttribute("y")||0)+")");(n(b)||n(c))&&a.push("scale("+z(b,1)+" "+z(c,1)+")");a.length&&p.setAttribute("transform",a.join(" "))},toFront:function(){var a=this.element;a.parentNode.appendChild(a);return this},align:function(a,f,b){var y,
c,r,p,l={};c=this.renderer;r=c.alignedObjects;var d,g;if(a){if(this.alignOptions=a,this.alignByTranslate=f,!b||F(b))this.alignTo=y=b||"renderer",k(r,this),r.push(this),b=null}else a=this.alignOptions,f=this.alignByTranslate,y=this.alignTo;b=z(b,c[y],c);y=a.align;c=a.verticalAlign;r=(b.x||0)+(a.x||0);p=(b.y||0)+(a.y||0);"right"===y?d=1:"center"===y&&(d=2);d&&(r+=(b.width-(a.width||0))/d);l[f?"translateX":"x"]=Math.round(r);"bottom"===c?g=1:"middle"===c&&(g=2);g&&(p+=(b.height-(a.height||0))/g);l[f?
"translateY":"y"]=Math.round(p);this[this.placed?"animate":"attr"](l);this.placed=!0;this.alignAttr=l;return this},getBBox:function(a,f){var y,c=this.renderer,r,k=this.element,l=this.styles,p,d=this.textStr,A,L=c.cache,m=c.cacheKeys,x=k.namespaceURI===this.SVG_NS,e;f=z(f,this.rotation);r=f*g;p=c.styledMode?k&&E.prototype.getStyle.call(k,"font-size"):l&&l.fontSize;n(d)&&(e=d.toString(),-1===e.indexOf("\x3c")&&(e=e.replace(/[0-9]/g,"0")),e+=["",f||0,p,this.textWidth,l&&l.textOverflow].join());e&&!a&&
(y=L[e]);if(!y){if(x||c.forExport){try{(A=this.fakeTS&&function(a){[].forEach.call(k.querySelectorAll(".highcharts-text-outline"),function(f){f.style.display=a})})&&A("none"),y=k.getBBox?b({},k.getBBox()):{width:k.offsetWidth,height:k.offsetHeight},A&&A("")}catch(Y){""}if(!y||0>y.width)y={width:0,height:0}}else y=this.htmlGetBBox();c.isSVG&&(a=y.width,c=y.height,x&&(y.height=c={"11px,17":14,"13px,20":16}[l&&l.fontSize+","+Math.round(c)]||c),f&&(y.width=Math.abs(c*Math.sin(r))+Math.abs(a*Math.cos(r)),
y.height=Math.abs(c*Math.cos(r))+Math.abs(a*Math.sin(r))));if(e&&0<y.height){for(;250<m.length;)delete L[m.shift()];L[e]||m.push(e);L[e]=y}}return y},show:function(a){return this.attr({visibility:a?"inherit":"visible"})},hide:function(){return this.attr({visibility:"hidden"})},fadeOut:function(a){var f=this;f.animate({opacity:0},{duration:a||150,complete:function(){f.attr({y:-9999})}})},add:function(a){var f=this.renderer,y=this.element,b;a&&(this.parentGroup=a);this.parentInverted=a&&a.inverted;
void 0!==this.textStr&&f.buildText(this);this.added=!0;if(!a||a.handleZ||this.zIndex)b=this.zIndexSetter();b||(a?a.element:f.box).appendChild(y);if(this.onAdd)this.onAdd();return this},safeRemoveChild:function(a){var f=a.parentNode;f&&f.removeChild(a)},destroy:function(){var a=this,f=a.element||{},b=a.renderer,c=b.isSVG&&"SPAN"===f.nodeName&&a.parentGroup,r=f.ownerSVGElement,l=a.clipPath;f.onclick=f.onmouseout=f.onmouseover=f.onmousemove=f.point=null;Q(a);l&&r&&([].forEach.call(r.querySelectorAll("[clip-path],[CLIP-PATH]"),
function(a){-1<a.getAttribute("clip-path").indexOf(l.element.id)&&a.removeAttribute("clip-path")}),a.clipPath=l.destroy());if(a.stops){for(r=0;r<a.stops.length;r++)a.stops[r]=a.stops[r].destroy();a.stops=null}a.safeRemoveChild(f);for(b.styledMode||a.destroyShadows();c&&c.div&&0===c.div.childNodes.length;)f=c.parentGroup,a.safeRemoveChild(c.div),delete c.div,c=f;a.alignTo&&k(b.alignedObjects,a);A(a,function(f,y){delete a[y]})},shadow:function(a,f,b){var y=[],c,r,l=this.element,k,p,d,g;if(!a)this.destroyShadows();
else if(!this.shadows){p=z(a.width,3);d=(a.opacity||.15)/p;g=this.parentInverted?"(-1,-1)":"("+z(a.offsetX,1)+", "+z(a.offsetY,1)+")";for(c=1;c<=p;c++)r=l.cloneNode(0),k=2*p+1-2*c,e(r,{stroke:a.color||"#000000","stroke-opacity":d*c,"stroke-width":k,transform:"translate"+g,fill:"none"}),r.setAttribute("class",(r.getAttribute("class")||"")+" highcharts-shadow"),b&&(e(r,"height",Math.max(e(r,"height")-k,0)),r.cutHeight=k),f?f.element.appendChild(r):l.parentNode&&l.parentNode.insertBefore(r,l),y.push(r);
this.shadows=y}return this},destroyShadows:function(){(this.shadows||[]).forEach(function(a){this.safeRemoveChild(a)},this);this.shadows=void 0},xGetter:function(a){"circle"===this.element.nodeName&&("x"===a?a="cx":"y"===a&&(a="cy"));return this._defaultGetter(a)},_defaultGetter:function(a){a=z(this[a+"Value"],this[a],this.element?this.element.getAttribute(a):null,0);/^[\-0-9\.]+$/.test(a)&&(a=parseFloat(a));return a},dSetter:function(a,f,b){a&&a.join&&(a=a.join(" "));/(NaN| {2}|^$)/.test(a)&&(a=
"M 0 0");this[f]!==a&&(b.setAttribute(f,a),this[f]=a)},dashstyleSetter:function(a){var f,y=this["stroke-width"];"inherit"===y&&(y=1);if(a=a&&a.toLowerCase()){a=a.replace("shortdashdotdot","3,1,1,1,1,1,").replace("shortdashdot","3,1,1,1").replace("shortdot","1,1,").replace("shortdash","3,1,").replace("longdash","8,3,").replace(/dot/g,"1,3,").replace("dash","4,3,").replace(/,$/,"").split(",");for(f=a.length;f--;)a[f]=I(a[f])*y;a=a.join(",").replace(/NaN/g,"none");this.element.setAttribute("stroke-dasharray",
a)}},alignSetter:function(a){var f={left:"start",center:"middle",right:"end"};f[a]&&(this.alignValue=a,this.element.setAttribute("text-anchor",f[a]))},opacitySetter:function(a,f,b){this[f]=a;b.setAttribute(f,a)},titleSetter:function(a){var f=this.element.getElementsByTagName("title")[0];f||(f=m.createElementNS(this.SVG_NS,"title"),this.element.appendChild(f));f.firstChild&&f.removeChild(f.firstChild);f.appendChild(m.createTextNode(String(z(a,"")).replace(/<[^>]*>/g,"").replace(/&lt;/g,"\x3c").replace(/&gt;/g,
"\x3e")))},textSetter:function(a){a!==this.textStr&&(delete this.bBox,delete this.textPxLength,this.textStr=a,this.added&&this.renderer.buildText(this))},setTextPath:function(f,b){var y=this.element,c={textAnchor:"text-anchor"},r,k=!1,p,d=this.textPathWrapper,g=!d;b=l(!0,{enabled:!0,attributes:{dy:-5,startOffset:"50%",textAnchor:"middle"}},b);r=b.attributes;if(f&&b&&b.enabled){this.options&&this.options.padding&&(r.dx=-this.options.padding);d||(this.textPathWrapper=d=this.renderer.createElement("textPath"),
k=!0);p=d.element;(b=f.element.getAttribute("id"))||f.element.setAttribute("id",b=a.uniqueKey());if(g)for(f=y.getElementsByTagName("tspan");f.length;)f[0].setAttribute("y",0),p.appendChild(f[0]);k&&d.add({element:this.text?this.text.element:y});p.setAttributeNS("http://www.w3.org/1999/xlink","href",this.renderer.url+"#"+b);n(r.dy)&&(p.parentNode.setAttribute("dy",r.dy),delete r.dy);n(r.dx)&&(p.parentNode.setAttribute("dx",r.dx),delete r.dx);a.objectEach(r,function(a,f){p.setAttribute(c[f]||f,a)});
y.removeAttribute("transform");this.removeTextOutline.call(d,[].slice.call(y.getElementsByTagName("tspan")));this.text&&!this.renderer.styledMode&&this.attr({fill:"none","stroke-width":0});this.applyTextOutline=this.updateTransform=D}else d&&(delete this.updateTransform,delete this.applyTextOutline,this.destroyTextPath(y,f));return this},destroyTextPath:function(a,f){var b;f.element.setAttribute("id","");for(b=this.textPathWrapper.element.childNodes;b.length;)a.firstChild.appendChild(b[0]);a.firstChild.removeChild(this.textPathWrapper.element);
delete f.textPathWrapper},fillSetter:function(a,f,b){"string"===typeof a?b.setAttribute(f,a):a&&this.complexColor(a,f,b)},visibilitySetter:function(a,f,b){"inherit"===a?b.removeAttribute(f):this[f]!==a&&b.setAttribute(f,a);this[f]=a},zIndexSetter:function(a,f){var b=this.renderer,y=this.parentGroup,c=(y||b).element||b.box,r,k=this.element,l=!1,p,b=c===b.box;r=this.added;var d;n(a)?(k.setAttribute("data-z-index",a),a=+a,this[f]===a&&(r=!1)):n(this[f])&&k.removeAttribute("data-z-index");this[f]=a;if(r){(a=
this.zIndex)&&y&&(y.handleZ=!0);f=c.childNodes;for(d=f.length-1;0<=d&&!l;d--)if(y=f[d],r=y.getAttribute("data-z-index"),p=!n(r),y!==k)if(0>a&&p&&!b&&!d)c.insertBefore(k,f[d]),l=!0;else if(I(r)<=a||p&&(!n(a)||0<=a))c.insertBefore(k,f[d+1]||null),l=!0;l||(c.insertBefore(k,f[b?3:0]||null),l=!0)}return l},_defaultSetter:function(a,f,b){b.setAttribute(f,a)}});E.prototype.yGetter=E.prototype.xGetter;E.prototype.translateXSetter=E.prototype.translateYSetter=E.prototype.rotationSetter=E.prototype.verticalAlignSetter=
E.prototype.rotationOriginXSetter=E.prototype.rotationOriginYSetter=E.prototype.scaleXSetter=E.prototype.scaleYSetter=E.prototype.matrixSetter=function(a,f){this[f]=a;this.doTransform=!0};E.prototype["stroke-widthSetter"]=E.prototype.strokeSetter=function(a,f,b){this[f]=a;this.stroke&&this["stroke-width"]?(E.prototype.fillSetter.call(this,this.stroke,"stroke",b),b.setAttribute("stroke-width",this["stroke-width"]),this.hasStroke=!0):"stroke-width"===f&&0===a&&this.hasStroke&&(b.removeAttribute("stroke"),
this.hasStroke=!1)};H=a.SVGRenderer=function(){this.init.apply(this,arguments)};b(H.prototype,{Element:E,SVG_NS:L,init:function(a,f,b,c,r,k,l){var y;y=this.createElement("svg").attr({version:"1.1","class":"highcharts-root"});l||y.css(this.getStyle(c));c=y.element;a.appendChild(c);e(a,"dir","ltr");-1===a.innerHTML.indexOf("xmlns")&&e(c,"xmlns",this.SVG_NS);this.isSVG=!0;this.box=c;this.boxWrapper=y;this.alignedObjects=[];this.url=(x||C)&&m.getElementsByTagName("base").length?R.location.href.split("#")[0].replace(/<[^>]*>/g,
"").replace(/([\('\)])/g,"\\$1").replace(/ /g,"%20"):"";this.createElement("desc").add().element.appendChild(m.createTextNode("Created with Highcharts 7.1.2"));this.defs=this.createElement("defs").add();this.allowHTML=k;this.forExport=r;this.styledMode=l;this.gradients={};this.cache={};this.cacheKeys=[];this.imgCount=0;this.setSize(f,b,!1);var p;x&&a.getBoundingClientRect&&(f=function(){u(a,{left:0,top:0});p=a.getBoundingClientRect();u(a,{left:Math.ceil(p.left)-p.left+"px",top:Math.ceil(p.top)-p.top+
"px"})},f(),this.unSubPixelFix=B(R,"resize",f))},definition:function(a){function f(a,c){var y;r(a).forEach(function(a){var r=b.createElement(a.tagName),k={};A(a,function(a,f){"tagName"!==f&&"children"!==f&&"textContent"!==f&&(k[f]=a)});r.attr(k);r.add(c||b.defs);a.textContent&&r.element.appendChild(m.createTextNode(a.textContent));f(a.children||[],r);y=r});return y}var b=this;return f(a)},getStyle:function(a){return this.style=b({fontFamily:'"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif',
fontSize:"12px"},a)},setStyle:function(a){this.boxWrapper.css(this.getStyle(a))},isHidden:function(){return!this.boxWrapper.getBBox().width},destroy:function(){var a=this.defs;this.box=null;this.boxWrapper=this.boxWrapper.destroy();d(this.gradients||{});this.gradients=null;a&&(this.defs=a.destroy());this.unSubPixelFix&&this.unSubPixelFix();return this.alignedObjects=null},createElement:function(a){var f=new this.Element;f.init(this,a);return f},draw:D,getRadialAttr:function(a,f){return{cx:a[0]-a[2]/
2+f.cx*a[2],cy:a[1]-a[2]/2+f.cy*a[2],r:f.r*a[2]}},truncate:function(a,f,b,c,r,k,l){var y=this,p=a.rotation,d,g=c?1:0,A=(b||c).length,L=A,x=[],e=function(a){f.firstChild&&f.removeChild(f.firstChild);a&&f.appendChild(m.createTextNode(a))},n=function(k,p){p=p||k;if(void 0===x[p])if(f.getSubStringLength)try{x[p]=r+f.getSubStringLength(0,c?p+1:p)}catch(Z){""}else y.getSpanWidth&&(e(l(b||c,k)),x[p]=r+y.getSpanWidth(a,f));return x[p]},D,w;a.rotation=0;D=n(f.textContent.length);if(w=r+D>k){for(;g<=A;)L=Math.ceil((g+
A)/2),c&&(d=l(c,L)),D=n(L,d&&d.length-1),g===A?g=A+1:D>k?A=L-1:g=L;0===A?e(""):b&&A===b.length-1||e(d||l(b||c,L))}c&&c.splice(0,L);a.actualWidth=D;a.rotation=p;return w},escapes:{"\x26":"\x26amp;","\x3c":"\x26lt;","\x3e":"\x26gt;","'":"\x26#39;",'"':"\x26quot;"},buildText:function(a){var f=a.element,b=this,c=b.forExport,r=z(a.textStr,"").toString(),y=-1!==r.indexOf("\x3c"),k=f.childNodes,p,l=e(f,"x"),d=a.styles,g=a.textWidth,x=d&&d.lineHeight,n=d&&d.textOutline,D=d&&"ellipsis"===d.textOverflow,w=
d&&"nowrap"===d.whiteSpace,Q=d&&d.fontSize,M,C,h=k.length,d=g&&!a.added&&this.box,F=function(a){var c;b.styledMode||(c=/(px|em)$/.test(a&&a.style.fontSize)?a.style.fontSize:Q||b.style.fontSize||12);return x?I(x):b.fontMetrics(c,a.getAttribute("style")?a:f).h},R=function(a,f){A(b.escapes,function(b,c){f&&-1!==f.indexOf(b)||(a=a.toString().replace(new RegExp(b,"g"),c))});return a},v=function(a,f){var b;b=a.indexOf("\x3c");a=a.substring(b,a.indexOf("\x3e")-b);b=a.indexOf(f+"\x3d");if(-1!==b&&(b=b+f.length+
1,f=a.charAt(b),'"'===f||"'"===f))return a=a.substring(b+1),a.substring(0,a.indexOf(f))};M=[r,D,w,x,n,Q,g].join();if(M!==a.textCache){for(a.textCache=M;h--;)f.removeChild(k[h]);y||n||D||g||-1!==r.indexOf(" ")?(d&&d.appendChild(f),y?(r=b.styledMode?r.replace(/<(b|strong)>/g,'\x3cspan class\x3d"highcharts-strong"\x3e').replace(/<(i|em)>/g,'\x3cspan class\x3d"highcharts-emphasized"\x3e'):r.replace(/<(b|strong)>/g,'\x3cspan style\x3d"font-weight:bold"\x3e').replace(/<(i|em)>/g,'\x3cspan style\x3d"font-style:italic"\x3e'),
r=r.replace(/<a/g,"\x3cspan").replace(/<\/(b|strong|i|em|a)>/g,"\x3c/span\x3e").split(/<br.*?>/g)):r=[r],r=r.filter(function(a){return""!==a}),r.forEach(function(r,y){var k,d=0,A=0;r=r.replace(/^\s+|\s+$/g,"").replace(/<span/g,"|||\x3cspan").replace(/<\/span>/g,"\x3c/span\x3e|||");k=r.split("|||");k.forEach(function(r){if(""!==r||1===k.length){var x={},n=m.createElementNS(b.SVG_NS,"tspan"),z,M;(z=v(r,"class"))&&e(n,"class",z);if(z=v(r,"style"))z=z.replace(/(;| |^)color([ :])/,"$1fill$2"),e(n,"style",
z);(M=v(r,"href"))&&!c&&(e(n,"onclick",'location.href\x3d"'+M+'"'),e(n,"class","highcharts-anchor"),b.styledMode||u(n,{cursor:"pointer"}));r=R(r.replace(/<[a-zA-Z\/](.|\n)*?>/g,"")||" ");if(" "!==r){n.appendChild(m.createTextNode(r));d?x.dx=0:y&&null!==l&&(x.x=l);e(n,x);f.appendChild(n);!d&&C&&(!N&&c&&u(n,{display:"block"}),e(n,"dy",F(n)));if(g){var h=r.replace(/([^\^])-/g,"$1- ").split(" "),x=!w&&(1<k.length||y||1<h.length);M=0;var I=F(n);if(D)p=b.truncate(a,n,r,void 0,0,Math.max(0,g-parseInt(Q||
12,10)),function(a,f){return a.substring(0,f)+"\u2026"});else if(x)for(;h.length;)h.length&&!w&&0<M&&(n=m.createElementNS(L,"tspan"),e(n,{dy:I,x:l}),z&&e(n,"style",z),n.appendChild(m.createTextNode(h.join(" ").replace(/- /g,"-"))),f.appendChild(n)),b.truncate(a,n,null,h,0===M?A:0,g,function(a,f){return h.slice(0,f).join(" ").replace(/- /g,"-")}),A=a.actualWidth,M++}d++}}});C=C||f.childNodes.length}),D&&p&&a.attr("title",R(a.textStr,["\x26lt;","\x26gt;"])),d&&d.removeChild(f),n&&a.applyTextOutline&&
a.applyTextOutline(n)):f.appendChild(m.createTextNode(R(r)))}},getContrast:function(a){a=t(a).rgba;a[0]*=1;a[1]*=1.2;a[2]*=.5;return 459<a[0]+a[1]+a[2]?"#000000":"#FFFFFF"},button:function(a,f,c,r,k,d,p,g,A,L){var y=this.label(a,f,c,A,null,null,L,null,"button"),n=0,x=this.styledMode;y.attr(l({padding:8,r:2},k));if(!x){var m,e,D,w;k=l({fill:"#f7f7f7",stroke:"#cccccc","stroke-width":1,style:{color:"#333333",cursor:"pointer",fontWeight:"normal"}},k);m=k.style;delete k.style;d=l(k,{fill:"#e6e6e6"},d);
e=d.style;delete d.style;p=l(k,{fill:"#e6ebf5",style:{color:"#000000",fontWeight:"bold"}},p);D=p.style;delete p.style;g=l(k,{style:{color:"#cccccc"}},g);w=g.style;delete g.style}B(y.element,K?"mouseover":"mouseenter",function(){3!==n&&y.setState(1)});B(y.element,K?"mouseout":"mouseleave",function(){3!==n&&y.setState(n)});y.setState=function(a){1!==a&&(y.state=n=a);y.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-"+["normal","hover","pressed","disabled"][a||
0]);x||y.attr([k,d,p,g][a||0]).css([m,e,D,w][a||0])};x||y.attr(k).css(b({cursor:"default"},m));return y.on("click",function(a){3!==n&&r.call(y,a)})},crispLine:function(a,f){a[1]===a[4]&&(a[1]=a[4]=Math.round(a[1])-f%2/2);a[2]===a[5]&&(a[2]=a[5]=Math.round(a[2])+f%2/2);return a},path:function(a){var f=this.styledMode?{}:{fill:"none"};c(a)?f.d=a:w(a)&&b(f,a);return this.createElement("path").attr(f)},circle:function(a,f,b){a=w(a)?a:void 0===a?{}:{x:a,y:f,r:b};f=this.createElement("circle");f.xSetter=
f.ySetter=function(a,f,b){b.setAttribute("c"+f,a)};return f.attr(a)},arc:function(a,f,b,c,r,k){w(a)?(c=a,f=c.y,b=c.r,a=c.x):c={innerR:c,start:r,end:k};a=this.symbol("arc",a,f,b,b,c);a.r=b;return a},rect:function(a,f,b,c,r,k){r=w(a)?a.r:r;var d=this.createElement("rect");a=w(a)?a:void 0===a?{}:{x:a,y:f,width:Math.max(b,0),height:Math.max(c,0)};this.styledMode||(void 0!==k&&(a.strokeWidth=k,a=d.crisp(a)),a.fill="none");r&&(a.r=r);d.rSetter=function(a,f,b){d.r=a;e(b,{rx:a,ry:a})};d.rGetter=function(){return d.r};
return d.attr(a)},setSize:function(a,f,b){var c=this.alignedObjects,r=c.length;this.width=a;this.height=f;for(this.boxWrapper.animate({width:a,height:f},{step:function(){this.attr({viewBox:"0 0 "+this.attr("width")+" "+this.attr("height")})},duration:z(b,!0)?void 0:0});r--;)c[r].align()},g:function(a){var f=this.createElement("g");return a?f.attr({"class":"highcharts-"+a}):f},image:function(a,f,c,r,k,d){var p={preserveAspectRatio:"none"},l,y=function(a,f){a.setAttributeNS?a.setAttributeNS("http://www.w3.org/1999/xlink",
"href",f):a.setAttribute("hc-svg-href",f)},g=function(f){y(l.element,a);d.call(l,f)};1<arguments.length&&b(p,{x:f,y:c,width:r,height:k});l=this.createElement("image").attr(p);d?(y(l.element,"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d"),p=new R.Image,B(p,"load",g),p.src=a,p.complete&&g({})):y(l.element,a);return l},symbol:function(a,f,c,r,k,d){var p=this,l,y=/^url\((.*?)\)$/,g=y.test(a),A=!g&&(this.symbols[a]?a:"circle"),L=A&&this.symbols[A],x=n(f)&&L&&L.call(this.symbols,
Math.round(f),Math.round(c),r,k,d),e,D;L?(l=this.path(x),p.styledMode||l.attr("fill","none"),b(l,{symbolName:A,x:f,y:c,width:r,height:k}),d&&b(l,d)):g&&(e=a.match(y)[1],l=this.image(e),l.imgwidth=z(M[e]&&M[e].width,d&&d.width),l.imgheight=z(M[e]&&M[e].height,d&&d.height),D=function(){l.attr({width:l.width,height:l.height})},["width","height"].forEach(function(a){l[a+"Setter"]=function(a,f){var b={},c=this["img"+f],r="width"===f?"translateX":"translateY";this[f]=a;n(c)&&(d&&"within"===d.backgroundSize&&
this.width&&this.height&&(c=Math.round(c*Math.min(this.width/this.imgwidth,this.height/this.imgheight))),this.element&&this.element.setAttribute(f,c),this.alignByTranslate||(b[r]=((this[f]||0)-c)/2,this.attr(b)))}}),n(f)&&l.attr({x:f,y:c}),l.isImg=!0,n(l.imgwidth)&&n(l.imgheight)?D():(l.attr({width:0,height:0}),v("img",{onload:function(){var a=q[p.chartIndex];0===this.width&&(u(this,{position:"absolute",top:"-999em"}),m.body.appendChild(this));M[e]={width:this.width,height:this.height};l.imgwidth=
this.width;l.imgheight=this.height;l.element&&D();this.parentNode&&this.parentNode.removeChild(this);p.imgCount--;if(!p.imgCount&&a&&a.onload)a.onload()},src:e}),this.imgCount++));return l},symbols:{circle:function(a,f,b,c){return this.arc(a+b/2,f+c/2,b/2,c/2,{start:.5*Math.PI,end:2.5*Math.PI,open:!1})},square:function(a,f,b,c){return["M",a,f,"L",a+b,f,a+b,f+c,a,f+c,"Z"]},triangle:function(a,f,b,c){return["M",a+b/2,f,"L",a+b,f+c,a,f+c,"Z"]},"triangle-down":function(a,f,b,c){return["M",a,f,"L",a+b,
f,a+b/2,f+c,"Z"]},diamond:function(a,f,b,c){return["M",a+b/2,f,"L",a+b,f+c/2,a+b/2,f+c,a,f+c/2,"Z"]},arc:function(a,f,b,c,r){var d=r.start,k=r.r||b,l=r.r||c||b,p=r.end-.001;b=r.innerR;c=z(r.open,.001>Math.abs(r.end-r.start-2*Math.PI));var y=Math.cos(d),g=Math.sin(d),A=Math.cos(p),p=Math.sin(p),d=.001>r.end-d-Math.PI?0:1;r=["M",a+k*y,f+l*g,"A",k,l,0,d,z(r.clockwise,1),a+k*A,f+l*p];n(b)&&r.push(c?"M":"L",a+b*A,f+b*p,"A",b,b,0,d,0,a+b*y,f+b*g);r.push(c?"":"Z");return r},callout:function(a,f,b,c,r){var d=
Math.min(r&&r.r||0,b,c),k=d+6,l=r&&r.anchorX;r=r&&r.anchorY;var p;p=["M",a+d,f,"L",a+b-d,f,"C",a+b,f,a+b,f,a+b,f+d,"L",a+b,f+c-d,"C",a+b,f+c,a+b,f+c,a+b-d,f+c,"L",a+d,f+c,"C",a,f+c,a,f+c,a,f+c-d,"L",a,f+d,"C",a,f,a,f,a+d,f];l&&l>b?r>f+k&&r<f+c-k?p.splice(13,3,"L",a+b,r-6,a+b+6,r,a+b,r+6,a+b,f+c-d):p.splice(13,3,"L",a+b,c/2,l,r,a+b,c/2,a+b,f+c-d):l&&0>l?r>f+k&&r<f+c-k?p.splice(33,3,"L",a,r+6,a-6,r,a,r-6,a,f+d):p.splice(33,3,"L",a,c/2,l,r,a,c/2,a,f+d):r&&r>c&&l>a+k&&l<a+b-k?p.splice(23,3,"L",l+6,f+
c,l,f+c+6,l-6,f+c,a+d,f+c):r&&0>r&&l>a+k&&l<a+b-k&&p.splice(3,3,"L",l-6,f,l,f-6,l+6,f,b-d,f);return p}},clipRect:function(f,b,c,r){var d=a.uniqueKey()+"-",l=this.createElement("clipPath").attr({id:d}).add(this.defs);f=this.rect(f,b,c,r,0).add(l);f.id=d;f.clipPath=l;f.count=0;return f},text:function(a,f,b,c){var r={};if(c&&(this.allowHTML||!this.forExport))return this.html(a,f,b);r.x=Math.round(f||0);b&&(r.y=Math.round(b));n(a)&&(r.text=a);a=this.createElement("text").attr(r);c||(a.xSetter=function(a,
f,b){var c=b.getElementsByTagName("tspan"),r,d=b.getAttribute(f),l;for(l=0;l<c.length;l++)r=c[l],r.getAttribute(f)===d&&r.setAttribute(f,a);b.setAttribute(f,a)});return a},fontMetrics:function(a,f){a=!this.styledMode&&/px/.test(a)||!R.getComputedStyle?a||f&&f.style&&f.style.fontSize||this.style&&this.style.fontSize:f&&E.prototype.getStyle.call(f,"font-size");a=/px/.test(a)?I(a):12;f=24>a?a+3:Math.round(1.2*a);return{h:f,b:Math.round(.8*f),f:a}},rotCorr:function(a,f,b){var c=a;f&&b&&(c=Math.max(c*
Math.cos(f*g),4));return{x:-a/3*Math.sin(f*g),y:c}},label:function(c,r,d,k,p,g,A,L,x){var y=this,e=y.styledMode,m=y.g("button"!==x&&"label"),D=m.text=y.text("",0,0,A).attr({zIndex:1}),w,z,N=0,M=3,Q=0,C,h,I,F,R,v={},K,t,q=/^url\((.*?)\)$/.test(k),u=e||q,S=function(){return e?w.strokeWidth()%2/2:(K?parseInt(K,10):0)%2/2},U,P,T;x&&m.addClass("highcharts-"+x);U=function(){var a=D.element.style,f={};z=(void 0===C||void 0===h||R)&&n(D.textStr)&&D.getBBox();m.width=(C||z.width||0)+2*M+Q;m.height=(h||z.height||
0)+2*M;t=M+Math.min(y.fontMetrics(a&&a.fontSize,D).b,z?z.height:Infinity);u&&(w||(m.box=w=y.symbols[k]||q?y.symbol(k):y.rect(),w.addClass(("button"===x?"":"highcharts-label-box")+(x?" highcharts-"+x+"-box":"")),w.add(m),a=S(),f.x=a,f.y=(L?-t:0)+a),f.width=Math.round(m.width),f.height=Math.round(m.height),w.attr(b(f,v)),v={})};P=function(){var a=Q+M,f;f=L?0:t;n(C)&&z&&("center"===R||"right"===R)&&(a+={center:.5,right:1}[R]*(C-z.width));if(a!==D.x||f!==D.y)D.attr("x",a),D.hasBoxWidthChanged&&(z=D.getBBox(!0),
U()),void 0!==f&&D.attr("y",f);D.x=a;D.y=f};T=function(a,f){w?w.attr(a,f):v[a]=f};m.onAdd=function(){D.add(m);m.attr({text:c||0===c?c:"",x:r,y:d});w&&n(p)&&m.attr({anchorX:p,anchorY:g})};m.widthSetter=function(f){C=a.isNumber(f)?f:null};m.heightSetter=function(a){h=a};m["text-alignSetter"]=function(a){R=a};m.paddingSetter=function(a){n(a)&&a!==M&&(M=m.padding=a,P())};m.paddingLeftSetter=function(a){n(a)&&a!==Q&&(Q=a,P())};m.alignSetter=function(a){a={left:0,center:.5,right:1}[a];a!==N&&(N=a,z&&m.attr({x:I}))};
m.textSetter=function(a){void 0!==a&&D.attr({text:a});U();P()};m["stroke-widthSetter"]=function(a,f){a&&(u=!0);K=this["stroke-width"]=a;T(f,a)};e?m.rSetter=function(a,f){T(f,a)}:m.strokeSetter=m.fillSetter=m.rSetter=function(a,f){"r"!==f&&("fill"===f&&a&&(u=!0),m[f]=a);T(f,a)};m.anchorXSetter=function(a,f){p=m.anchorX=a;T(f,Math.round(a)-S()-I)};m.anchorYSetter=function(a,f){g=m.anchorY=a;T(f,a-F)};m.xSetter=function(a){m.x=a;N&&(a-=N*((C||z.width)+2*M),m["forceAnimate:x"]=!0);I=Math.round(a);m.attr("translateX",
I)};m.ySetter=function(a){F=m.y=Math.round(a);m.attr("translateY",F)};var B=m.css;A={css:function(a){if(a){var f={};a=l(a);m.textProps.forEach(function(b){void 0!==a[b]&&(f[b]=a[b],delete a[b])});D.css(f);"width"in f&&U();"fontSize"in f&&(U(),P())}return B.call(m,a)},getBBox:function(){return{width:z.width+2*M,height:z.height+2*M,x:z.x-M,y:z.y-M}},destroy:function(){f(m.element,"mouseenter");f(m.element,"mouseleave");D&&(D=D.destroy());w&&(w=w.destroy());E.prototype.destroy.call(m);m=y=U=P=T=null}};
e||(A.shadow=function(a){a&&(U(),w&&w.shadow(a));return m});return b(m,A)}});a.Renderer=H});J(G,"parts/Html.js",[G["parts/Globals.js"]],function(a){var E=a.attr,H=a.createElement,B=a.css,h=a.defined,e=a.extend,q=a.isFirefox,t=a.isMS,u=a.isWebKit,v=a.pick,n=a.pInt,g=a.SVGElement,d=a.SVGRenderer,m=a.win;e(g.prototype,{htmlCss:function(a){var b="SPAN"===this.element.tagName&&a&&"width"in a,d=v(b&&a.width,void 0),c;b&&(delete a.width,this.textWidth=d,c=!0);a&&"ellipsis"===a.textOverflow&&(a.whiteSpace=
"nowrap",a.overflow="hidden");this.styles=e(this.styles,a);B(this.element,a);c&&this.htmlUpdateTransform();return this},htmlGetBBox:function(){var a=this.element;return{x:a.offsetLeft,y:a.offsetTop,width:a.offsetWidth,height:a.offsetHeight}},htmlUpdateTransform:function(){if(this.added){var a=this.renderer,d=this.element,p=this.translateX||0,c=this.translateY||0,g=this.x||0,m=this.y||0,e=this.textAlign||"left",F={left:0,center:.5,right:1}[e],C=this.styles,l=C&&C.whiteSpace;B(d,{marginLeft:p,marginTop:c});
!a.styledMode&&this.shadows&&this.shadows.forEach(function(a){B(a,{marginLeft:p+1,marginTop:c+1})});this.inverted&&[].forEach.call(d.childNodes,function(b){a.invertChild(b,d)});if("SPAN"===d.tagName){var C=this.rotation,D=this.textWidth&&n(this.textWidth),A=[C,e,d.innerHTML,this.textWidth,this.textAlign].join(),z;(z=D!==this.oldTextWidth)&&!(z=D>this.oldTextWidth)&&((z=this.textPxLength)||(B(d,{width:"",whiteSpace:l||"nowrap"}),z=d.offsetWidth),z=z>D);z&&(/[ \-]/.test(d.textContent||d.innerText)||
"ellipsis"===d.style.textOverflow)?(B(d,{width:D+"px",display:"block",whiteSpace:l||"normal"}),this.oldTextWidth=D,this.hasBoxWidthChanged=!0):this.hasBoxWidthChanged=!1;A!==this.cTT&&(l=a.fontMetrics(d.style.fontSize,d).b,!h(C)||C===(this.oldRotation||0)&&e===this.oldAlign||this.setSpanRotation(C,F,l),this.getSpanCorrection(!h(C)&&this.textPxLength||d.offsetWidth,l,F,C,e));B(d,{left:g+(this.xCorr||0)+"px",top:m+(this.yCorr||0)+"px"});this.cTT=A;this.oldRotation=C;this.oldAlign=e}}else this.alignOnAdd=
!0},setSpanRotation:function(a,d,p){var b={},k=this.renderer.getTransformKey();b[k]=b.transform="rotate("+a+"deg)";b[k+(q?"Origin":"-origin")]=b.transformOrigin=100*d+"% "+p+"px";B(this.element,b)},getSpanCorrection:function(a,d,p){this.xCorr=-a*p;this.yCorr=-d}});e(d.prototype,{getTransformKey:function(){return t&&!/Edge/.test(m.navigator.userAgent)?"-ms-transform":u?"-webkit-transform":q?"MozTransform":m.opera?"-o-transform":""},html:function(b,d,p){var c=this.createElement("span"),k=c.element,
m=c.renderer,n=m.isSVG,h=function(a,b){["opacity","visibility"].forEach(function(c){a[c+"Setter"]=function(d,l,f){var r=a.div?a.div.style:b;g.prototype[c+"Setter"].call(this,d,l,f);r&&(r[l]=d)}});a.addedSetters=!0},C=a.charts[m.chartIndex],C=C&&C.styledMode;c.textSetter=function(a){a!==k.innerHTML&&(delete this.bBox,delete this.oldTextWidth);this.textStr=a;k.innerHTML=v(a,"");c.doTransform=!0};n&&h(c,c.element.style);c.xSetter=c.ySetter=c.alignSetter=c.rotationSetter=function(a,b){"align"===b&&(b=
"textAlign");c[b]=a;c.doTransform=!0};c.afterSetters=function(){this.doTransform&&(this.htmlUpdateTransform(),this.doTransform=!1)};c.attr({text:b,x:Math.round(d),y:Math.round(p)}).css({position:"absolute"});C||c.css({fontFamily:this.style.fontFamily,fontSize:this.style.fontSize});k.style.whiteSpace="nowrap";c.css=c.htmlCss;n&&(c.add=function(a){var b,d=m.box.parentNode,l=[];if(this.parentGroup=a){if(b=a.div,!b){for(;a;)l.push(a),a=a.parentGroup;l.reverse().forEach(function(a){function f(f,b){a[b]=
f;"translateX"===b?r.left=f+"px":r.top=f+"px";a.doTransform=!0}var r,p=E(a.element,"class");p&&(p={className:p});b=a.div=a.div||H("div",p,{position:"absolute",left:(a.translateX||0)+"px",top:(a.translateY||0)+"px",display:a.display,opacity:a.opacity,pointerEvents:a.styles&&a.styles.pointerEvents},b||d);r=b.style;e(a,{classSetter:function(a){return function(f){this.element.setAttribute("class",f);a.className=f}}(b),on:function(){l[0].div&&c.on.apply({element:l[0].div},arguments);return a},translateXSetter:f,
translateYSetter:f});a.addedSetters||h(a)})}}else b=d;b.appendChild(k);c.added=!0;c.alignOnAdd&&c.htmlUpdateTransform();return c});return c}})});J(G,"parts/Time.js",[G["parts/Globals.js"]],function(a){var E=a.defined,H=a.extend,B=a.merge,h=a.pick,e=a.timeUnits,q=a.win;a.Time=function(a){this.update(a,!1)};a.Time.prototype={defaultOptions:{},update:function(a){var e=h(a&&a.useUTC,!0),v=this;this.options=a=B(!0,this.options||{},a);this.Date=a.Date||q.Date||Date;this.timezoneOffset=(this.useUTC=e)&&
a.timezoneOffset;this.getTimezoneOffset=this.timezoneOffsetFunction();(this.variableTimezone=!(e&&!a.getTimezoneOffset&&!a.timezone))||this.timezoneOffset?(this.get=function(a,g){var d=g.getTime(),m=d-v.getTimezoneOffset(g);g.setTime(m);a=g["getUTC"+a]();g.setTime(d);return a},this.set=function(a,g,d){var m;if("Milliseconds"===a||"Seconds"===a||"Minutes"===a&&0===g.getTimezoneOffset()%60)g["set"+a](d);else m=v.getTimezoneOffset(g),m=g.getTime()-m,g.setTime(m),g["setUTC"+a](d),a=v.getTimezoneOffset(g),
m=g.getTime()+a,g.setTime(m)}):e?(this.get=function(a,g){return g["getUTC"+a]()},this.set=function(a,g,d){return g["setUTC"+a](d)}):(this.get=function(a,g){return g["get"+a]()},this.set=function(a,g,d){return g["set"+a](d)})},makeTime:function(e,q,v,n,g,d){var m,b,k;this.useUTC?(m=this.Date.UTC.apply(0,arguments),b=this.getTimezoneOffset(m),m+=b,k=this.getTimezoneOffset(m),b!==k?m+=k-b:b-36E5!==this.getTimezoneOffset(m-36E5)||a.isSafari||(m-=36E5)):m=(new this.Date(e,q,h(v,1),h(n,0),h(g,0),h(d,0))).getTime();
return m},timezoneOffsetFunction:function(){var e=this,h=this.options,v=q.moment;if(!this.useUTC)return function(a){return 6E4*(new Date(a)).getTimezoneOffset()};if(h.timezone){if(v)return function(a){return 6E4*-v.tz(a,h.timezone).utcOffset()};a.error(25)}return this.useUTC&&h.getTimezoneOffset?function(a){return 6E4*h.getTimezoneOffset(a)}:function(){return 6E4*(e.timezoneOffset||0)}},dateFormat:function(e,h,v){if(!a.defined(h)||isNaN(h))return a.defaultOptions.lang.invalidDate||"";e=a.pick(e,"%Y-%m-%d %H:%M:%S");
var n=this,g=new this.Date(h),d=this.get("Hours",g),m=this.get("Day",g),b=this.get("Date",g),k=this.get("Month",g),p=this.get("FullYear",g),c=a.defaultOptions.lang,x=c.weekdays,q=c.shortWeekdays,w=a.pad,g=a.extend({a:q?q[m]:x[m].substr(0,3),A:x[m],d:w(b),e:w(b,2," "),w:m,b:c.shortMonths[k],B:c.months[k],m:w(k+1),o:k+1,y:p.toString().substr(2,2),Y:p,H:w(d),k:d,I:w(d%12||12),l:d%12||12,M:w(n.get("Minutes",g)),p:12>d?"AM":"PM",P:12>d?"am":"pm",S:w(g.getSeconds()),L:w(Math.floor(h%1E3),3)},a.dateFormats);
a.objectEach(g,function(a,b){for(;-1!==e.indexOf("%"+b);)e=e.replace("%"+b,"function"===typeof a?a.call(n,h):a)});return v?e.substr(0,1).toUpperCase()+e.substr(1):e},resolveDTLFormat:function(e){return a.isObject(e,!0)?e:(e=a.splat(e),{main:e[0],from:e[1],to:e[2]})},getTimeTicks:function(a,q,v,n){var g=this,d=[],m,b={},k;m=new g.Date(q);var p=a.unitRange,c=a.count||1,x;n=h(n,1);if(E(q)){g.set("Milliseconds",m,p>=e.second?0:c*Math.floor(g.get("Milliseconds",m)/c));p>=e.second&&g.set("Seconds",m,p>=
e.minute?0:c*Math.floor(g.get("Seconds",m)/c));p>=e.minute&&g.set("Minutes",m,p>=e.hour?0:c*Math.floor(g.get("Minutes",m)/c));p>=e.hour&&g.set("Hours",m,p>=e.day?0:c*Math.floor(g.get("Hours",m)/c));p>=e.day&&g.set("Date",m,p>=e.month?1:Math.max(1,c*Math.floor(g.get("Date",m)/c)));p>=e.month&&(g.set("Month",m,p>=e.year?0:c*Math.floor(g.get("Month",m)/c)),k=g.get("FullYear",m));p>=e.year&&g.set("FullYear",m,k-k%c);p===e.week&&(k=g.get("Day",m),g.set("Date",m,g.get("Date",m)-k+n+(k<n?-7:0)));k=g.get("FullYear",
m);n=g.get("Month",m);var K=g.get("Date",m),w=g.get("Hours",m);q=m.getTime();g.variableTimezone&&(x=v-q>4*e.month||g.getTimezoneOffset(q)!==g.getTimezoneOffset(v));q=m.getTime();for(m=1;q<v;)d.push(q),q=p===e.year?g.makeTime(k+m*c,0):p===e.month?g.makeTime(k,n+m*c):!x||p!==e.day&&p!==e.week?x&&p===e.hour&&1<c?g.makeTime(k,n,K,w+m*c):q+p*c:g.makeTime(k,n,K+m*c*(p===e.day?1:7)),m++;d.push(q);p<=e.hour&&1E4>d.length&&d.forEach(function(a){0===a%18E5&&"000000000"===g.dateFormat("%H%M%S%L",a)&&(b[a]="day")})}d.info=
H(a,{higherRanks:b,totalRange:p*c});return d}}});J(G,"parts/Options.js",[G["parts/Globals.js"]],function(a){var E=a.color,H=a.merge;a.defaultOptions={colors:"#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "),symbols:["circle","diamond","square","triangle","triangle-down"],lang:{loading:"Loading...",months:"January February March April May June July August September October November December".split(" "),shortMonths:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
weekdays:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),decimalPoint:".",numericSymbols:"kMGTPE".split(""),resetZoom:"Reset zoom",resetZoomTitle:"Reset zoom level 1:1",thousandsSep:" "},global:{},time:a.Time.prototype.defaultOptions,chart:{styledMode:!1,borderRadius:0,colorCount:10,defaultSeriesType:"line",ignoreHiddenSeries:!0,spacing:[10,10,15,10],resetZoomButton:{theme:{zIndex:6},position:{align:"right",x:-10,y:10}},width:null,height:null,borderColor:"#335cad",backgroundColor:"#ffffff",
plotBorderColor:"#cccccc"},title:{text:"Chart title",align:"center",margin:15,widthAdjust:-44},subtitle:{text:"",align:"center",widthAdjust:-44},plotOptions:{},labels:{style:{position:"absolute",color:"#333333"}},legend:{enabled:!0,align:"center",alignColumns:!0,layout:"horizontal",labelFormatter:function(){return this.name},borderColor:"#999999",borderRadius:0,navigation:{activeColor:"#003399",inactiveColor:"#cccccc"},itemStyle:{color:"#333333",cursor:"pointer",fontSize:"12px",fontWeight:"bold",
textOverflow:"ellipsis"},itemHoverStyle:{color:"#000000"},itemHiddenStyle:{color:"#cccccc"},shadow:!1,itemCheckboxStyle:{position:"absolute",width:"13px",height:"13px"},squareSymbol:!0,symbolPadding:5,verticalAlign:"bottom",x:0,y:0,title:{style:{fontWeight:"bold"}}},loading:{labelStyle:{fontWeight:"bold",position:"relative",top:"45%"},style:{position:"absolute",backgroundColor:"#ffffff",opacity:.5,textAlign:"center"}},tooltip:{enabled:!0,animation:a.svg,borderRadius:3,dateTimeLabelFormats:{millisecond:"%A, %b %e, %H:%M:%S.%L",
second:"%A, %b %e, %H:%M:%S",minute:"%A, %b %e, %H:%M",hour:"%A, %b %e, %H:%M",day:"%A, %b %e, %Y",week:"Week from %A, %b %e, %Y",month:"%B %Y",year:"%Y"},footerFormat:"",padding:8,snap:a.isTouchDevice?25:10,headerFormat:'\x3cspan style\x3d"font-size: 10px"\x3e{point.key}\x3c/span\x3e\x3cbr/\x3e',pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e',backgroundColor:E("#f7f7f7").setOpacity(.85).get(),borderWidth:1,shadow:!0,
style:{color:"#333333",cursor:"default",fontSize:"12px",pointerEvents:"none",whiteSpace:"nowrap"}},credits:{enabled:!0,href:"https://www.highcharts.com?credits",position:{align:"right",x:-10,verticalAlign:"bottom",y:-5},style:{cursor:"pointer",color:"#999999",fontSize:"9px"},text:"Highcharts.com"}};a.setOptions=function(B){a.defaultOptions=H(!0,a.defaultOptions,B);a.time.update(H(a.defaultOptions.global,a.defaultOptions.time),!1);return a.defaultOptions};a.getOptions=function(){return a.defaultOptions};
a.defaultPlotOptions=a.defaultOptions.plotOptions;a.time=new a.Time(H(a.defaultOptions.global,a.defaultOptions.time));a.dateFormat=function(B,h,e){return a.time.dateFormat(B,h,e)};""});J(G,"parts/Tick.js",[G["parts/Globals.js"]],function(a){var E=a.correctFloat,H=a.defined,B=a.destroyObjectProperties,h=a.fireEvent,e=a.isNumber,q=a.merge,t=a.pick,u=a.deg2rad;a.Tick=function(a,e,g,d,m){this.axis=a;this.pos=e;this.type=g||"";this.isNewLabel=this.isNew=!0;this.parameters=m||{};this.tickmarkOffset=this.parameters.tickmarkOffset;
this.options=this.parameters.options;g||d||this.addLabel()};a.Tick.prototype={addLabel:function(){var e=this,n=e.axis,g=n.options,d=n.chart,m=n.categories,b=n.names,k=e.pos,p=t(e.options&&e.options.labels,g.labels),c=n.tickPositions,x=k===c[0],h=k===c[c.length-1],m=this.parameters.category||(m?t(m[k],b[k],k):k),w=e.label,c=c.info,F,C,l,D;n.isDatetimeAxis&&c&&(C=d.time.resolveDTLFormat(g.dateTimeLabelFormats[!g.grid&&c.higherRanks[k]||c.unitName]),F=C.main);e.isFirst=x;e.isLast=h;e.formatCtx={axis:n,
chart:d,isFirst:x,isLast:h,dateTimeLabelFormat:F,tickPositionInfo:c,value:n.isLog?E(n.lin2log(m)):m,pos:k};g=n.labelFormatter.call(e.formatCtx,this.formatCtx);if(D=C&&C.list)e.shortenLabel=function(){for(l=0;l<D.length;l++)if(w.attr({text:n.labelFormatter.call(a.extend(e.formatCtx,{dateTimeLabelFormat:D[l]}))}),w.getBBox().width<n.getSlotWidth(e)-2*t(p.padding,5))return;w.attr({text:""})};if(H(w))w&&w.textStr!==g&&(!w.textWidth||p.style&&p.style.width||w.styles.width||w.css({width:null}),w.attr({text:g}),
w.textPxLength=w.getBBox().width);else{if(e.label=w=H(g)&&p.enabled?d.renderer.text(g,0,0,p.useHTML).add(n.labelGroup):null)d.styledMode||w.css(q(p.style)),w.textPxLength=w.getBBox().width;e.rotation=0}},getLabelSize:function(){return this.label?this.label.getBBox()[this.axis.horiz?"height":"width"]:0},handleOverflow:function(a){var e=this.axis,g=e.options.labels,d=a.x,m=e.chart.chartWidth,b=e.chart.spacing,k=t(e.labelLeft,Math.min(e.pos,b[3])),b=t(e.labelRight,Math.max(e.isRadial?0:e.pos+e.len,m-
b[1])),p=this.label,c=this.rotation,x={left:0,center:.5,right:1}[e.labelAlign||p.attr("align")],h=p.getBBox().width,w=e.getSlotWidth(this),F=w,C=1,l,D={};if(c||"justify"!==t(g.overflow,"justify"))0>c&&d-x*h<k?l=Math.round(d/Math.cos(c*u)-k):0<c&&d+x*h>b&&(l=Math.round((m-d)/Math.cos(c*u)));else if(m=d+(1-x)*h,d-x*h<k?F=a.x+F*(1-x)-k:m>b&&(F=b-a.x+F*x,C=-1),F=Math.min(w,F),F<w&&"center"===e.labelAlign&&(a.x+=C*(w-F-x*(w-Math.min(h,F)))),h>F||e.autoRotation&&(p.styles||{}).width)l=F;l&&(this.shortenLabel?
this.shortenLabel():(D.width=Math.floor(l),(g.style||{}).textOverflow||(D.textOverflow="ellipsis"),p.css(D)))},getPosition:function(e,n,g,d){var m=this.axis,b=m.chart,k=d&&b.oldChartHeight||b.chartHeight;e={x:e?a.correctFloat(m.translate(n+g,null,null,d)+m.transB):m.left+m.offset+(m.opposite?(d&&b.oldChartWidth||b.chartWidth)-m.right-m.left:0),y:e?k-m.bottom+m.offset-(m.opposite?m.height:0):a.correctFloat(k-m.translate(n+g,null,null,d)-m.transB)};e.y=Math.max(Math.min(e.y,1E5),-1E5);h(this,"afterGetPosition",
{pos:e});return e},getLabelPosition:function(a,e,g,d,m,b,k,p){var c=this.axis,x=c.transA,n=c.reversed,w=c.staggerLines,F=c.tickRotCorr||{x:0,y:0},C=m.y,l=d||c.reserveSpaceDefault?0:-c.labelOffset*("center"===c.labelAlign?.5:1),D={};H(C)||(C=0===c.side?g.rotation?-8:-g.getBBox().height:2===c.side?F.y+8:Math.cos(g.rotation*u)*(F.y-g.getBBox(!1,0).height/2));a=a+m.x+l+F.x-(b&&d?b*x*(n?-1:1):0);e=e+C-(b&&!d?b*x*(n?1:-1):0);w&&(g=k/(p||1)%w,c.opposite&&(g=w-g-1),e+=c.labelOffset/w*g);D.x=a;D.y=Math.round(e);
h(this,"afterGetLabelPosition",{pos:D,tickmarkOffset:b,index:k});return D},getMarkPath:function(a,e,g,d,m,b){return b.crispLine(["M",a,e,"L",a+(m?0:-g),e+(m?g:0)],d)},renderGridLine:function(a,e,g){var d=this.axis,m=d.options,b=this.gridLine,k={},p=this.pos,c=this.type,x=t(this.tickmarkOffset,d.tickmarkOffset),n=d.chart.renderer,w=c?c+"Grid":"grid",h=m[w+"LineWidth"],C=m[w+"LineColor"],m=m[w+"LineDashStyle"];b||(d.chart.styledMode||(k.stroke=C,k["stroke-width"]=h,m&&(k.dashstyle=m)),c||(k.zIndex=
1),a&&(e=0),this.gridLine=b=n.path().attr(k).addClass("highcharts-"+(c?c+"-":"")+"grid-line").add(d.gridGroup));if(b&&(g=d.getPlotLinePath({value:p+x,lineWidth:b.strokeWidth()*g,force:"pass",old:a})))b[a||this.isNew?"attr":"animate"]({d:g,opacity:e})},renderMark:function(a,e,g){var d=this.axis,m=d.options,b=d.chart.renderer,k=this.type,p=k?k+"Tick":"tick",c=d.tickSize(p),x=this.mark,n=!x,w=a.x;a=a.y;var h=t(m[p+"Width"],!k&&d.isXAxis?1:0),m=m[p+"Color"];c&&(d.opposite&&(c[0]=-c[0]),n&&(this.mark=
x=b.path().addClass("highcharts-"+(k?k+"-":"")+"tick").add(d.axisGroup),d.chart.styledMode||x.attr({stroke:m,"stroke-width":h})),x[n?"attr":"animate"]({d:this.getMarkPath(w,a,c[0],x.strokeWidth()*g,d.horiz,b),opacity:e}))},renderLabel:function(a,n,g,d){var m=this.axis,b=m.horiz,k=m.options,p=this.label,c=k.labels,x=c.step,m=t(this.tickmarkOffset,m.tickmarkOffset),h=!0,w=a.x;a=a.y;p&&e(w)&&(p.xy=a=this.getLabelPosition(w,a,p,b,c,m,d,x),this.isFirst&&!this.isLast&&!t(k.showFirstLabel,1)||this.isLast&&
!this.isFirst&&!t(k.showLastLabel,1)?h=!1:!b||c.step||c.rotation||n||0===g||this.handleOverflow(a),x&&d%x&&(h=!1),h&&e(a.y)?(a.opacity=g,p[this.isNewLabel?"attr":"animate"](a),this.isNewLabel=!1):(p.attr("y",-9999),this.isNewLabel=!0))},render:function(e,n,g){var d=this.axis,m=d.horiz,b=this.pos,k=t(this.tickmarkOffset,d.tickmarkOffset),b=this.getPosition(m,b,k,n),k=b.x,p=b.y,d=m&&k===d.pos+d.len||!m&&p===d.pos?-1:1;g=t(g,1);this.isActive=!0;this.renderGridLine(n,g,d);this.renderMark(b,g,d);this.renderLabel(b,
n,g,e);this.isNew=!1;a.fireEvent(this,"afterRender")},destroy:function(){B(this,this.axis)}}});J(G,"parts/Axis.js",[G["parts/Globals.js"]],function(a){var E=a.addEvent,H=a.animObject,B=a.arrayMax,h=a.arrayMin,e=a.color,q=a.correctFloat,t=a.defaultOptions,u=a.defined,v=a.deg2rad,n=a.destroyObjectProperties,g=a.extend,d=a.fireEvent,m=a.format,b=a.getMagnitude,k=a.isArray,p=a.isNumber,c=a.isString,x=a.merge,K=a.normalizeTickInterval,w=a.objectEach,F=a.pick,C=a.removeEvent,l=a.seriesTypes,D=a.splat,A=
a.syncTimeout,z=a.Tick,I=function(){this.init.apply(this,arguments)};a.extend(I.prototype,{defaultOptions:{dateTimeLabelFormats:{millisecond:{main:"%H:%M:%S.%L",range:!1},second:{main:"%H:%M:%S",range:!1},minute:{main:"%H:%M",range:!1},hour:{main:"%H:%M",range:!1},day:{main:"%e. %b"},week:{main:"%e. %b"},month:{main:"%b '%y"},year:{main:"%Y"}},endOnTick:!1,labels:{enabled:!0,indentation:10,x:0,style:{color:"#666666",cursor:"default",fontSize:"11px"}},maxPadding:.01,minorTickLength:2,minorTickPosition:"outside",
minPadding:.01,showEmpty:!0,startOfWeek:1,startOnTick:!1,tickLength:10,tickPixelInterval:100,tickmarkPlacement:"between",tickPosition:"outside",title:{align:"middle",style:{color:"#666666"}},type:"linear",minorGridLineColor:"#f2f2f2",minorGridLineWidth:1,minorTickColor:"#999999",lineColor:"#ccd6eb",lineWidth:1,gridLineColor:"#e6e6e6",tickColor:"#ccd6eb"},defaultYAxisOptions:{endOnTick:!0,maxPadding:.05,minPadding:.05,tickPixelInterval:72,showLastLabel:!0,labels:{x:-8},startOnTick:!0,title:{rotation:270,
text:"Values"},stackLabels:{allowOverlap:!1,enabled:!1,formatter:function(){return a.numberFormat(this.total,-1)},style:{color:"#000000",fontSize:"11px",fontWeight:"bold",textOutline:"1px contrast"}},gridLineWidth:1,lineWidth:0},defaultLeftAxisOptions:{labels:{x:-15},title:{rotation:270}},defaultRightAxisOptions:{labels:{x:15},title:{rotation:90}},defaultBottomAxisOptions:{labels:{autoRotation:[-45],x:0},margin:15,title:{rotation:0}},defaultTopAxisOptions:{labels:{autoRotation:[-45],x:0},margin:15,
title:{rotation:0}},init:function(f,b){var c=b.isX,r=this;r.chart=f;r.horiz=f.inverted&&!r.isZAxis?!c:c;r.isXAxis=c;r.coll=r.coll||(c?"xAxis":"yAxis");d(this,"init",{userOptions:b});r.opposite=b.opposite;r.side=b.side||(r.horiz?r.opposite?0:2:r.opposite?1:3);r.setOptions(b);var l=this.options,p=l.type;r.labelFormatter=l.labels.formatter||r.defaultLabelFormatter;r.userOptions=b;r.minPixelPadding=0;r.reversed=l.reversed;r.visible=!1!==l.visible;r.zoomEnabled=!1!==l.zoomEnabled;r.hasNames="category"===
p||!0===l.categories;r.categories=l.categories||r.hasNames;r.names||(r.names=[],r.names.keys={});r.plotLinesAndBandsGroups={};r.isLog="logarithmic"===p;r.isDatetimeAxis="datetime"===p;r.positiveValuesOnly=r.isLog&&!r.allowNegativeLog;r.isLinked=u(l.linkedTo);r.ticks={};r.labelEdge=[];r.minorTicks={};r.plotLinesAndBands=[];r.alternateBands={};r.len=0;r.minRange=r.userMinRange=l.minRange||l.maxZoom;r.range=l.range;r.offset=l.offset||0;r.stacks={};r.oldStacks={};r.stacksTouched=0;r.max=null;r.min=null;
r.crosshair=F(l.crosshair,D(f.options.tooltip.crosshairs)[c?0:1],!1);b=r.options.events;-1===f.axes.indexOf(r)&&(c?f.axes.splice(f.xAxis.length,0,r):f.axes.push(r),f[r.coll].push(r));r.series=r.series||[];f.inverted&&!r.isZAxis&&c&&void 0===r.reversed&&(r.reversed=!0);w(b,function(f,b){a.isFunction(f)&&E(r,b,f)});r.lin2log=l.linearToLogConverter||r.lin2log;r.isLog&&(r.val2lin=r.log2lin,r.lin2val=r.lin2log);d(this,"afterInit")},setOptions:function(a){this.options=x(this.defaultOptions,"yAxis"===this.coll&&
this.defaultYAxisOptions,[this.defaultTopAxisOptions,this.defaultRightAxisOptions,this.defaultBottomAxisOptions,this.defaultLeftAxisOptions][this.side],x(t[this.coll],a));d(this,"afterSetOptions",{userOptions:a})},defaultLabelFormatter:function(){var f=this.axis,b=this.value,c=f.chart.time,d=f.categories,l=this.dateTimeLabelFormat,p=t.lang,k=p.numericSymbols,p=p.numericSymbolMagnitude||1E3,e=k&&k.length,g,A=f.options.labels.format,f=f.isLog?Math.abs(b):f.tickInterval;if(A)g=m(A,this,c);else if(d)g=
b;else if(l)g=c.dateFormat(l,b);else if(e&&1E3<=f)for(;e--&&void 0===g;)c=Math.pow(p,e+1),f>=c&&0===10*b%c&&null!==k[e]&&0!==b&&(g=a.numberFormat(b/c,-1)+k[e]);void 0===g&&(g=1E4<=Math.abs(b)?a.numberFormat(b,-1):a.numberFormat(b,-1,void 0,""));return g},getSeriesExtremes:function(){var a=this,b=a.chart,c;d(this,"getSeriesExtremes",null,function(){a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.threshold=null;a.softThreshold=!a.isXAxis;a.buildStacks&&a.buildStacks();a.series.forEach(function(f){if(f.visible||
!b.options.chart.ignoreHiddenSeries){var r=f.options,d=r.threshold,l,k;a.hasVisibleSeries=!0;a.positiveValuesOnly&&0>=d&&(d=null);if(a.isXAxis)r=f.xData,r.length&&(c=f.getXExtremes(r),l=c.min,k=c.max,p(l)||l instanceof Date||(r=r.filter(p),c=f.getXExtremes(r),l=c.min,k=c.max),r.length&&(a.dataMin=Math.min(F(a.dataMin,l),l),a.dataMax=Math.max(F(a.dataMax,k),k)));else if(f.getExtremes(),k=f.dataMax,l=f.dataMin,u(l)&&u(k)&&(a.dataMin=Math.min(F(a.dataMin,l),l),a.dataMax=Math.max(F(a.dataMax,k),k)),u(d)&&
(a.threshold=d),!r.softThreshold||a.positiveValuesOnly)a.softThreshold=!1}})});d(this,"afterGetSeriesExtremes")},translate:function(a,b,c,d,l,k){var f=this.linkedParent||this,r=1,e=0,g=d?f.oldTransA:f.transA;d=d?f.oldMin:f.min;var m=f.minPixelPadding;l=(f.isOrdinal||f.isBroken||f.isLog&&l)&&f.lin2val;g||(g=f.transA);c&&(r*=-1,e=f.len);f.reversed&&(r*=-1,e-=r*(f.sector||f.len));b?(a=(a*r+e-m)/g+d,l&&(a=f.lin2val(a))):(l&&(a=f.val2lin(a)),a=p(d)?r*(a-d)*g+e+r*m+(p(k)?g*k:0):void 0);return a},toPixels:function(a,
b){return this.translate(a,!1,!this.horiz,null,!0)+(b?0:this.pos)},toValue:function(a,b){return this.translate(a-(b?0:this.pos),!0,!this.horiz,null,!0)},getPlotLinePath:function(a){var f=this,b=f.chart,c=f.left,l=f.top,k=a.old,e=a.value,g=a.translatedValue,m=a.lineWidth,A=a.force,x,D,n,w,z=k&&b.oldChartHeight||b.chartHeight,h=k&&b.oldChartWidth||b.chartWidth,C,I=f.transB,q=function(a,f,b){if("pass"!==A&&a<f||a>b)A?a=Math.min(Math.max(f,a),b):C=!0;return a};a={value:e,lineWidth:m,old:k,force:A,acrossPanes:a.acrossPanes,
translatedValue:g};d(this,"getPlotLinePath",a,function(a){g=F(g,f.translate(e,null,null,k));g=Math.min(Math.max(-1E5,g),1E5);x=n=Math.round(g+I);D=w=Math.round(z-g-I);p(g)?f.horiz?(D=l,w=z-f.bottom,x=n=q(x,c,c+f.width)):(x=c,n=h-f.right,D=w=q(D,l,l+f.height)):(C=!0,A=!1);a.path=C&&!A?null:b.renderer.crispLine(["M",x,D,"L",n,w],m||1)});return a.path},getLinearTickPositions:function(a,b,c){var f,r=q(Math.floor(b/a)*a);c=q(Math.ceil(c/a)*a);var d=[],l;q(r+a)===r&&(l=20);if(this.single)return[b];for(b=
r;b<=c;){d.push(b);b=q(b+a,l);if(b===f)break;f=b}return d},getMinorTickInterval:function(){var a=this.options;return!0===a.minorTicks?F(a.minorTickInterval,"auto"):!1===a.minorTicks?null:a.minorTickInterval},getMinorTickPositions:function(){var a=this,b=a.options,c=a.tickPositions,d=a.minorTickInterval,l=[],p=a.pointRangePadding||0,k=a.min-p,p=a.max+p,g=p-k;if(g&&g/d<a.len/3)if(a.isLog)this.paddedTicks.forEach(function(f,b,c){b&&l.push.apply(l,a.getLogTickPositions(d,c[b-1],c[b],!0))});else if(a.isDatetimeAxis&&
"auto"===this.getMinorTickInterval())l=l.concat(a.getTimeTicks(a.normalizeTimeTickInterval(d),k,p,b.startOfWeek));else for(b=k+(c[0]-k)%d;b<=p&&b!==l[0];b+=d)l.push(b);0!==l.length&&a.trimTicks(l);return l},adjustForMinRange:function(){var a=this.options,b=this.min,c=this.max,d,l,p,k,g,e,m,A;this.isXAxis&&void 0===this.minRange&&!this.isLog&&(u(a.min)||u(a.max)?this.minRange=null:(this.series.forEach(function(a){e=a.xData;for(k=m=a.xIncrement?1:e.length-1;0<k;k--)if(g=e[k]-e[k-1],void 0===p||g<p)p=
g}),this.minRange=Math.min(5*p,this.dataMax-this.dataMin)));c-b<this.minRange&&(l=this.dataMax-this.dataMin>=this.minRange,A=this.minRange,d=(A-c+b)/2,d=[b-d,F(a.min,b-d)],l&&(d[2]=this.isLog?this.log2lin(this.dataMin):this.dataMin),b=B(d),c=[b+A,F(a.max,b+A)],l&&(c[2]=this.isLog?this.log2lin(this.dataMax):this.dataMax),c=h(c),c-b<A&&(d[0]=c-A,d[1]=F(a.min,c-A),b=B(d)));this.min=b;this.max=c},getClosest:function(){var a;this.categories?a=1:this.series.forEach(function(f){var b=f.closestPointRange,
c=f.visible||!f.chart.options.chart.ignoreHiddenSeries;!f.noSharedTooltip&&u(b)&&c&&(a=u(a)?Math.min(a,b):b)});return a},nameToX:function(a){var f=k(this.categories),b=f?this.categories:this.names,c=a.options.x,d;a.series.requireSorting=!1;u(c)||(c=!1===this.options.uniqueNames?a.series.autoIncrement():f?b.indexOf(a.name):F(b.keys[a.name],-1));-1===c?f||(d=b.length):d=c;void 0!==d&&(this.names[d]=a.name,this.names.keys[a.name]=d);return d},updateNames:function(){var a=this,b=this.names;0<b.length&&
(Object.keys(b.keys).forEach(function(a){delete b.keys[a]}),b.length=0,this.minRange=this.userMinRange,(this.series||[]).forEach(function(f){f.xIncrement=null;if(!f.points||f.isDirtyData)a.max=Math.max(a.max,f.xData.length-1),f.processData(),f.generatePoints();f.data.forEach(function(b,c){var r;b&&b.options&&void 0!==b.name&&(r=a.nameToX(b),void 0!==r&&r!==b.x&&(b.x=r,f.xData[c]=r))})}))},setAxisTranslation:function(a){var f=this,b=f.max-f.min,p=f.axisPointRange||0,k,g=0,e=0,A=f.linkedParent,m=!!f.categories,
x=f.transA,D=f.isXAxis;if(D||m||p)k=f.getClosest(),A?(g=A.minPointOffset,e=A.pointRangePadding):f.series.forEach(function(a){var b=m?1:D?F(a.options.pointRange,k,0):f.axisPointRange||0,r=a.options.pointPlacement;p=Math.max(p,b);if(!f.single||m)a=l.xrange&&a instanceof l.xrange?!D:D,g=Math.max(g,a&&c(r)?0:b/2),e=Math.max(e,a&&"on"===r?0:b)}),A=f.ordinalSlope&&k?f.ordinalSlope/k:1,f.minPointOffset=g*=A,f.pointRangePadding=e*=A,f.pointRange=Math.min(p,b),D&&(f.closestPointRange=k);a&&(f.oldTransA=x);
f.translationSlope=f.transA=x=f.staticScale||f.len/(b+e||1);f.transB=f.horiz?f.left:f.bottom;f.minPixelPadding=x*g;d(this,"afterSetAxisTranslation")},minFromRange:function(){return this.max-this.range},setTickInterval:function(f){var c=this,l=c.chart,k=c.options,g=c.isLog,e=c.isDatetimeAxis,A=c.isXAxis,m=c.isLinked,x=k.maxPadding,D=k.minPadding,n,w=k.tickInterval,z=k.tickPixelInterval,h=c.categories,C=p(c.threshold)?c.threshold:null,I=c.softThreshold,t,v,B;e||h||m||this.getTickAmount();v=F(c.userMin,
k.min);B=F(c.userMax,k.max);m?(c.linkedParent=l[c.coll][k.linkedTo],n=c.linkedParent.getExtremes(),c.min=F(n.min,n.dataMin),c.max=F(n.max,n.dataMax),k.type!==c.linkedParent.options.type&&a.error(11,1,l)):(!I&&u(C)&&(c.dataMin>=C?(n=C,D=0):c.dataMax<=C&&(t=C,x=0)),c.min=F(v,n,c.dataMin),c.max=F(B,t,c.dataMax));g&&(c.positiveValuesOnly&&!f&&0>=Math.min(c.min,F(c.dataMin,c.min))&&a.error(10,1,l),c.min=q(c.log2lin(c.min),15),c.max=q(c.log2lin(c.max),15));c.range&&u(c.max)&&(c.userMin=c.min=v=Math.max(c.dataMin,
c.minFromRange()),c.userMax=B=c.max,c.range=null);d(c,"foundExtremes");c.beforePadding&&c.beforePadding();c.adjustForMinRange();!(h||c.axisPointRange||c.usePercentage||m)&&u(c.min)&&u(c.max)&&(l=c.max-c.min)&&(!u(v)&&D&&(c.min-=l*D),!u(B)&&x&&(c.max+=l*x));p(k.softMin)&&!p(c.userMin)&&k.softMin<c.min&&(c.min=v=k.softMin);p(k.softMax)&&!p(c.userMax)&&k.softMax>c.max&&(c.max=B=k.softMax);p(k.floor)&&(c.min=Math.min(Math.max(c.min,k.floor),Number.MAX_VALUE));p(k.ceiling)&&(c.max=Math.max(Math.min(c.max,
k.ceiling),F(c.userMax,-Number.MAX_VALUE)));I&&u(c.dataMin)&&(C=C||0,!u(v)&&c.min<C&&c.dataMin>=C?c.min=c.options.minRange?Math.min(C,c.max-c.minRange):C:!u(B)&&c.max>C&&c.dataMax<=C&&(c.max=c.options.minRange?Math.max(C,c.min+c.minRange):C));c.tickInterval=c.min===c.max||void 0===c.min||void 0===c.max?1:m&&!w&&z===c.linkedParent.options.tickPixelInterval?w=c.linkedParent.tickInterval:F(w,this.tickAmount?(c.max-c.min)/Math.max(this.tickAmount-1,1):void 0,h?1:(c.max-c.min)*z/Math.max(c.len,z));A&&
!f&&c.series.forEach(function(a){a.processData(c.min!==c.oldMin||c.max!==c.oldMax)});c.setAxisTranslation(!0);c.beforeSetTickPositions&&c.beforeSetTickPositions();c.postProcessTickInterval&&(c.tickInterval=c.postProcessTickInterval(c.tickInterval));c.pointRange&&!w&&(c.tickInterval=Math.max(c.pointRange,c.tickInterval));f=F(k.minTickInterval,c.isDatetimeAxis&&c.closestPointRange);!w&&c.tickInterval<f&&(c.tickInterval=f);e||g||w||(c.tickInterval=K(c.tickInterval,null,b(c.tickInterval),F(k.allowDecimals,
!(.5<c.tickInterval&&5>c.tickInterval&&1E3<c.max&&9999>c.max)),!!this.tickAmount));this.tickAmount||(c.tickInterval=c.unsquish());this.setTickPositions()},setTickPositions:function(){var f=this.options,c,b=f.tickPositions;c=this.getMinorTickInterval();var l=f.tickPositioner,k=f.startOnTick,p=f.endOnTick;this.tickmarkOffset=this.categories&&"between"===f.tickmarkPlacement&&1===this.tickInterval?.5:0;this.minorTickInterval="auto"===c&&this.tickInterval?this.tickInterval/5:c;this.single=this.min===this.max&&
u(this.min)&&!this.tickAmount&&(parseInt(this.min,10)===this.min||!1!==f.allowDecimals);this.tickPositions=c=b&&b.slice();!c&&(!this.ordinalPositions&&(this.max-this.min)/this.tickInterval>Math.max(2*this.len,200)?(c=[this.min,this.max],a.error(19,!1,this.chart)):c=this.isDatetimeAxis?this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval,f.units),this.min,this.max,f.startOfWeek,this.ordinalPositions,this.closestPointRange,!0):this.isLog?this.getLogTickPositions(this.tickInterval,this.min,
this.max):this.getLinearTickPositions(this.tickInterval,this.min,this.max),c.length>this.len&&(c=[c[0],c.pop()],c[0]===c[1]&&(c.length=1)),this.tickPositions=c,l&&(l=l.apply(this,[this.min,this.max])))&&(this.tickPositions=c=l);this.paddedTicks=c.slice(0);this.trimTicks(c,k,p);this.isLinked||(this.single&&2>c.length&&!this.categories&&(this.min-=.5,this.max+=.5),b||l||this.adjustTickAmount());d(this,"afterSetTickPositions")},trimTicks:function(a,c,b){var f=a[0],l=a[a.length-1],k=this.minPointOffset||
0;d(this,"trimTicks");if(!this.isLinked){if(c&&-Infinity!==f)this.min=f;else for(;this.min-k>a[0];)a.shift();if(b)this.max=l;else for(;this.max+k<a[a.length-1];)a.pop();0===a.length&&u(f)&&!this.options.tickPositions&&a.push((l+f)/2)}},alignToOthers:function(){var a={},c,b=this.options;!1===this.chart.options.chart.alignTicks||!1===b.alignTicks||!1===b.startOnTick||!1===b.endOnTick||this.isLog||this.chart[this.coll].forEach(function(f){var b=f.options,b=[f.horiz?b.left:b.top,b.width,b.height,b.pane].join();
f.series.length&&(a[b]?c=!0:a[b]=1)});return c},getTickAmount:function(){var a=this.options,c=a.tickAmount,b=a.tickPixelInterval;!u(a.tickInterval)&&this.len<b&&!this.isRadial&&!this.isLog&&a.startOnTick&&a.endOnTick&&(c=2);!c&&this.alignToOthers()&&(c=Math.ceil(this.len/b)+1);4>c&&(this.finalTickAmt=c,c=5);this.tickAmount=c},adjustTickAmount:function(){var a=this.options,c=this.tickInterval,b=this.tickPositions,d=this.tickAmount,l=this.finalTickAmt,k=b&&b.length,p=F(this.threshold,this.softThreshold?
0:null),g;if(this.hasData()){if(k<d){for(g=this.min;b.length<d;)b.length%2||g===p?b.push(q(b[b.length-1]+c)):b.unshift(q(b[0]-c));this.transA*=(k-1)/(d-1);this.min=a.startOnTick?b[0]:Math.min(this.min,b[0]);this.max=a.endOnTick?b[b.length-1]:Math.max(this.max,b[b.length-1])}else k>d&&(this.tickInterval*=2,this.setTickPositions());if(u(l)){for(c=a=b.length;c--;)(3===l&&1===c%2||2>=l&&0<c&&c<a-1)&&b.splice(c,1);this.finalTickAmt=void 0}}},setScale:function(){var a=this.series.some(function(a){return a.isDirtyData||
a.isDirty||a.xAxis.isDirty}),c;this.oldMin=this.min;this.oldMax=this.max;this.oldAxisLength=this.len;this.setAxisSize();(c=this.len!==this.oldAxisLength)||a||this.isLinked||this.forceRedraw||this.userMin!==this.oldUserMin||this.userMax!==this.oldUserMax||this.alignToOthers()?(this.resetStacks&&this.resetStacks(),this.forceRedraw=!1,this.getSeriesExtremes(),this.setTickInterval(),this.oldUserMin=this.userMin,this.oldUserMax=this.userMax,this.isDirty||(this.isDirty=c||this.min!==this.oldMin||this.max!==
this.oldMax)):this.cleanStacks&&this.cleanStacks();d(this,"afterSetScale")},setExtremes:function(a,c,b,l,k){var f=this,p=f.chart;b=F(b,!0);f.series.forEach(function(a){delete a.kdTree});k=g(k,{min:a,max:c});d(f,"setExtremes",k,function(){f.userMin=a;f.userMax=c;f.eventArgs=k;b&&p.redraw(l)})},zoom:function(a,c){var f=this.dataMin,b=this.dataMax,l=this.options,k=Math.min(f,F(l.min,f)),p=Math.max(b,F(l.max,b));a={newMin:a,newMax:c};d(this,"zoom",a,function(a){var c=a.newMin,d=a.newMax;if(c!==this.min||
d!==this.max)this.allowZoomOutside||(u(f)&&(c<k&&(c=k),c>p&&(c=p)),u(b)&&(d<k&&(d=k),d>p&&(d=p))),this.displayBtn=void 0!==c||void 0!==d,this.setExtremes(c,d,!1,void 0,{trigger:"zoom"});a.zoomed=!0});return a.zoomed},setAxisSize:function(){var f=this.chart,c=this.options,b=c.offsets||[0,0,0,0],d=this.horiz,l=this.width=Math.round(a.relativeLength(F(c.width,f.plotWidth-b[3]+b[1]),f.plotWidth)),k=this.height=Math.round(a.relativeLength(F(c.height,f.plotHeight-b[0]+b[2]),f.plotHeight)),p=this.top=Math.round(a.relativeLength(F(c.top,
f.plotTop+b[0]),f.plotHeight,f.plotTop)),c=this.left=Math.round(a.relativeLength(F(c.left,f.plotLeft+b[3]),f.plotWidth,f.plotLeft));this.bottom=f.chartHeight-k-p;this.right=f.chartWidth-l-c;this.len=Math.max(d?l:k,0);this.pos=d?c:p},getExtremes:function(){var a=this.isLog;return{min:a?q(this.lin2log(this.min)):this.min,max:a?q(this.lin2log(this.max)):this.max,dataMin:this.dataMin,dataMax:this.dataMax,userMin:this.userMin,userMax:this.userMax}},getThreshold:function(a){var f=this.isLog,c=f?this.lin2log(this.min):
this.min,f=f?this.lin2log(this.max):this.max;null===a||-Infinity===a?a=c:Infinity===a?a=f:c>a?a=c:f<a&&(a=f);return this.translate(a,0,1,0,1)},autoLabelAlign:function(a){var f=(F(a,0)-90*this.side+720)%360;a={align:"center"};d(this,"autoLabelAlign",a,function(a){15<f&&165>f?a.align="right":195<f&&345>f&&(a.align="left")});return a.align},tickSize:function(a){var f=this.options,c=f[a+"Length"],b=F(f[a+"Width"],"tick"===a&&this.isXAxis&&!this.categories?1:0),l;b&&c&&("inside"===f[a+"Position"]&&(c=
-c),l=[c,b]);a={tickSize:l};d(this,"afterTickSize",a);return a.tickSize},labelMetrics:function(){var a=this.tickPositions&&this.tickPositions[0]||0;return this.chart.renderer.fontMetrics(this.options.labels.style&&this.options.labels.style.fontSize,this.ticks[a]&&this.ticks[a].label)},unsquish:function(){var a=this.options.labels,c=this.horiz,b=this.tickInterval,d=b,l=this.len/(((this.categories?1:0)+this.max-this.min)/b),k,p=a.rotation,g=this.labelMetrics(),e,A=Number.MAX_VALUE,m,x=this.max-this.min,
D=function(a){var f=a/(l||1),f=1<f?Math.ceil(f):1;f*b>x&&Infinity!==a&&Infinity!==l&&(f=Math.ceil(x/b));return q(f*b)};c?(m=!a.staggerLines&&!a.step&&(u(p)?[p]:l<F(a.autoRotationLimit,80)&&a.autoRotation))&&m.forEach(function(a){var f;if(a===p||a&&-90<=a&&90>=a)e=D(Math.abs(g.h/Math.sin(v*a))),f=e+Math.abs(a/360),f<A&&(A=f,k=a,d=e)}):a.step||(d=D(g.h));this.autoRotation=m;this.labelRotation=F(k,p);return d},getSlotWidth:function(a){var f=this.chart,c=this.horiz,b=this.options.labels,d=Math.max(this.tickPositions.length-
(this.categories?0:1),1),l=f.margin[3];return a&&a.slotWidth||c&&2>(b.step||0)&&!b.rotation&&(this.staggerLines||1)*this.len/d||!c&&(b.style&&parseInt(b.style.width,10)||l&&l-f.spacing[3]||.33*f.chartWidth)},renderUnsquish:function(){var a=this.chart,b=a.renderer,d=this.tickPositions,l=this.ticks,k=this.options.labels,p=k&&k.style||{},g=this.horiz,e=this.getSlotWidth(),A=Math.max(1,Math.round(e-2*(k.padding||5))),m={},x=this.labelMetrics(),D=k.style&&k.style.textOverflow,n,w,z=0,C;c(k.rotation)||
(m.rotation=k.rotation||0);d.forEach(function(a){(a=l[a])&&a.label&&a.label.textPxLength>z&&(z=a.label.textPxLength)});this.maxLabelLength=z;if(this.autoRotation)z>A&&z>x.h?m.rotation=this.labelRotation:this.labelRotation=0;else if(e&&(n=A,!D))for(w="clip",A=d.length;!g&&A--;)if(C=d[A],C=l[C].label)C.styles&&"ellipsis"===C.styles.textOverflow?C.css({textOverflow:"clip"}):C.textPxLength>e&&C.css({width:e+"px"}),C.getBBox().height>this.len/d.length-(x.h-x.f)&&(C.specificTextOverflow="ellipsis");m.rotation&&
(n=z>.5*a.chartHeight?.33*a.chartHeight:z,D||(w="ellipsis"));if(this.labelAlign=k.align||this.autoLabelAlign(this.labelRotation))m.align=this.labelAlign;d.forEach(function(a){var f=(a=l[a])&&a.label,c=p.width,b={};f&&(f.attr(m),a.shortenLabel?a.shortenLabel():n&&!c&&"nowrap"!==p.whiteSpace&&(n<f.textPxLength||"SPAN"===f.element.tagName)?(b.width=n,D||(b.textOverflow=f.specificTextOverflow||w),f.css(b)):f.styles&&f.styles.width&&!b.width&&!c&&f.css({width:null}),delete f.specificTextOverflow,a.rotation=
m.rotation)},this);this.tickRotCorr=b.rotCorr(x.b,this.labelRotation||0,0!==this.side)},hasData:function(){return this.series.some(function(a){return a.hasData()})||this.options.showEmpty&&u(this.min)&&u(this.max)},addTitle:function(a){var f=this.chart.renderer,c=this.horiz,b=this.opposite,d=this.options.title,l,k=this.chart.styledMode;this.axisTitle||((l=d.textAlign)||(l=(c?{low:"left",middle:"center",high:"right"}:{low:b?"right":"left",middle:"center",high:b?"left":"right"})[d.align]),this.axisTitle=
f.text(d.text,0,0,d.useHTML).attr({zIndex:7,rotation:d.rotation||0,align:l}).addClass("highcharts-axis-title"),k||this.axisTitle.css(x(d.style)),this.axisTitle.add(this.axisGroup),this.axisTitle.isNew=!0);k||d.style.width||this.isRadial||this.axisTitle.css({width:this.len});this.axisTitle[a?"show":"hide"](!0)},generateTick:function(a){var f=this.ticks;f[a]?f[a].addLabel():f[a]=new z(this,a)},getOffset:function(){var a=this,c=a.chart,b=c.renderer,l=a.options,k=a.tickPositions,p=a.ticks,g=a.horiz,e=
a.side,A=c.inverted&&!a.isZAxis?[1,0,3,2][e]:e,m,x,D=0,n,z=0,C=l.title,h=l.labels,I=0,q=c.axisOffset,c=c.clipOffset,K=[-1,1,1,-1][e],t=l.className,v=a.axisParent;m=a.hasData();a.showAxis=x=m||F(l.showEmpty,!0);a.staggerLines=a.horiz&&h.staggerLines;a.axisGroup||(a.gridGroup=b.g("grid").attr({zIndex:l.gridZIndex||1}).addClass("highcharts-"+this.coll.toLowerCase()+"-grid "+(t||"")).add(v),a.axisGroup=b.g("axis").attr({zIndex:l.zIndex||2}).addClass("highcharts-"+this.coll.toLowerCase()+" "+(t||"")).add(v),
a.labelGroup=b.g("axis-labels").attr({zIndex:h.zIndex||7}).addClass("highcharts-"+a.coll.toLowerCase()+"-labels "+(t||"")).add(v));m||a.isLinked?(k.forEach(function(c,b){a.generateTick(c,b)}),a.renderUnsquish(),a.reserveSpaceDefault=0===e||2===e||{1:"left",3:"right"}[e]===a.labelAlign,F(h.reserveSpace,"center"===a.labelAlign?!0:null,a.reserveSpaceDefault)&&k.forEach(function(a){I=Math.max(p[a].getLabelSize(),I)}),a.staggerLines&&(I*=a.staggerLines),a.labelOffset=I*(a.opposite?-1:1)):w(p,function(a,
c){a.destroy();delete p[c]});C&&C.text&&!1!==C.enabled&&(a.addTitle(x),x&&!1!==C.reserveSpace&&(a.titleOffset=D=a.axisTitle.getBBox()[g?"height":"width"],n=C.offset,z=u(n)?0:F(C.margin,g?5:10)));a.renderLine();a.offset=K*F(l.offset,q[e]?q[e]+(l.margin||0):0);a.tickRotCorr=a.tickRotCorr||{x:0,y:0};b=0===e?-a.labelMetrics().h:2===e?a.tickRotCorr.y:0;z=Math.abs(I)+z;I&&(z=z-b+K*(g?F(h.y,a.tickRotCorr.y+8*K):h.x));a.axisTitleMargin=F(n,z);a.getMaxLabelDimensions&&(a.maxLabelDimensions=a.getMaxLabelDimensions(p,
k));g=this.tickSize("tick");q[e]=Math.max(q[e],a.axisTitleMargin+D+K*a.offset,z,k&&k.length&&g?g[0]+K*a.offset:0);l=l.offset?0:2*Math.floor(a.axisLine.strokeWidth()/2);c[A]=Math.max(c[A],l);d(this,"afterGetOffset")},getLinePath:function(a){var c=this.chart,b=this.opposite,f=this.offset,d=this.horiz,l=this.left+(b?this.width:0)+f,f=c.chartHeight-this.bottom-(b?this.height:0)+f;b&&(a*=-1);return c.renderer.crispLine(["M",d?this.left:l,d?f:this.top,"L",d?c.chartWidth-this.right:l,d?f:c.chartHeight-this.bottom],
a)},renderLine:function(){this.axisLine||(this.axisLine=this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),this.chart.styledMode||this.axisLine.attr({stroke:this.options.lineColor,"stroke-width":this.options.lineWidth,zIndex:7}))},getTitlePosition:function(){var a=this.horiz,c=this.left,b=this.top,l=this.len,k=this.options.title,p=a?c:b,e=this.opposite,g=this.offset,A=k.x||0,m=k.y||0,x=this.axisTitle,D=this.chart.renderer.fontMetrics(k.style&&k.style.fontSize,x),x=Math.max(x.getBBox(null,
0).height-D.h-1,0),l={low:p+(a?0:l),middle:p+l/2,high:p+(a?l:0)}[k.align],c=(a?b+this.height:c)+(a?1:-1)*(e?-1:1)*this.axisTitleMargin+[-x,x,D.f,-x][this.side],a={x:a?l+A:c+(e?this.width:0)+g+A,y:a?c+m-(e?this.height:0)+g:l+m};d(this,"afterGetTitlePosition",{titlePosition:a});return a},renderMinorTick:function(a){var c=this.chart.hasRendered&&p(this.oldMin),b=this.minorTicks;b[a]||(b[a]=new z(this,a,"minor"));c&&b[a].isNew&&b[a].render(null,!0);b[a].render(null,!1,1)},renderTick:function(a,c){var b=
this.isLinked,f=this.ticks,d=this.chart.hasRendered&&p(this.oldMin);if(!b||a>=this.min&&a<=this.max)f[a]||(f[a]=new z(this,a)),d&&f[a].isNew&&f[a].render(c,!0,-1),f[a].render(c)},render:function(){var c=this,b=c.chart,l=c.options,k=c.isLog,e=c.isLinked,g=c.tickPositions,m=c.axisTitle,x=c.ticks,D=c.minorTicks,n=c.alternateBands,C=l.stackLabels,h=l.alternateGridColor,I=c.tickmarkOffset,q=c.axisLine,F=c.showAxis,K=H(b.renderer.globalAnimation),t,v;c.labelEdge.length=0;c.overlap=!1;[x,D,n].forEach(function(a){w(a,
function(a){a.isActive=!1})});if(c.hasData()||e)c.minorTickInterval&&!c.categories&&c.getMinorTickPositions().forEach(function(a){c.renderMinorTick(a)}),g.length&&(g.forEach(function(a,b){c.renderTick(a,b)}),I&&(0===c.min||c.single)&&(x[-1]||(x[-1]=new z(c,-1,null,!0)),x[-1].render(-1))),h&&g.forEach(function(f,l){v=void 0!==g[l+1]?g[l+1]+I:c.max-I;0===l%2&&f<c.max&&v<=c.max+(b.polar?-I:I)&&(n[f]||(n[f]=new a.PlotLineOrBand(c)),t=f+I,n[f].options={from:k?c.lin2log(t):t,to:k?c.lin2log(v):v,color:h},
n[f].render(),n[f].isActive=!0)}),c._addedPlotLB||((l.plotLines||[]).concat(l.plotBands||[]).forEach(function(a){c.addPlotBandOrLine(a)}),c._addedPlotLB=!0);[x,D,n].forEach(function(a){var c,f=[],l=K.duration;w(a,function(a,c){a.isActive||(a.render(c,!1,0),a.isActive=!1,f.push(c))});A(function(){for(c=f.length;c--;)a[f[c]]&&!a[f[c]].isActive&&(a[f[c]].destroy(),delete a[f[c]])},a!==n&&b.hasRendered&&l?l:0)});q&&(q[q.isPlaced?"animate":"attr"]({d:this.getLinePath(q.strokeWidth())}),q.isPlaced=!0,q[F?
"show":"hide"](!0));m&&F&&(l=c.getTitlePosition(),p(l.y)?(m[m.isNew?"attr":"animate"](l),m.isNew=!1):(m.attr("y",-9999),m.isNew=!0));C&&C.enabled&&c.renderStackTotals();c.isDirty=!1;d(this,"afterRender")},redraw:function(){this.visible&&(this.render(),this.plotLinesAndBands.forEach(function(a){a.render()}));this.series.forEach(function(a){a.isDirty=!0})},keepProps:"extKey hcEvents names series userMax userMin".split(" "),destroy:function(a){var c=this,b=c.stacks,f=c.plotLinesAndBands,l;d(this,"destroy",
{keepEvents:a});a||C(c);w(b,function(a,c){n(a);b[c]=null});[c.ticks,c.minorTicks,c.alternateBands].forEach(function(a){n(a)});if(f)for(a=f.length;a--;)f[a].destroy();"stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function(a){c[a]&&(c[a]=c[a].destroy())});for(l in c.plotLinesAndBandsGroups)c.plotLinesAndBandsGroups[l]=c.plotLinesAndBandsGroups[l].destroy();w(c,function(a,b){-1===c.keepProps.indexOf(b)&&delete c[b]})},drawCrosshair:function(a,
c){var b,f=this.crosshair,l=F(f.snap,!0),k,p=this.cross;d(this,"drawCrosshair",{e:a,point:c});a||(a=this.cross&&this.cross.e);if(this.crosshair&&!1!==(u(c)||!l)){l?u(c)&&(k=F(c.crosshairPos,this.isXAxis?c.plotX:this.len-c.plotY)):k=a&&(this.horiz?a.chartX-this.pos:this.len-a.chartY+this.pos);u(k)&&(b=this.getPlotLinePath({value:c&&(this.isXAxis?c.x:F(c.stackY,c.y)),translatedValue:k})||null);if(!u(b)){this.hideCrosshair();return}l=this.categories&&!this.isRadial;p||(this.cross=p=this.chart.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-"+
(l?"category ":"thin ")+f.className).attr({zIndex:F(f.zIndex,2)}).add(),this.chart.styledMode||(p.attr({stroke:f.color||(l?e("#ccd6eb").setOpacity(.25).get():"#cccccc"),"stroke-width":F(f.width,1)}).css({"pointer-events":"none"}),f.dashStyle&&p.attr({dashstyle:f.dashStyle})));p.show().attr({d:b});l&&!f.width&&p.attr({"stroke-width":this.transA});this.cross.e=a}else this.hideCrosshair();d(this,"afterDrawCrosshair",{e:a,point:c})},hideCrosshair:function(){this.cross&&this.cross.hide();d(this,"afterHideCrosshair")}});
return a.Axis=I});J(G,"parts/DateTimeAxis.js",[G["parts/Globals.js"]],function(a){var E=a.Axis,H=a.getMagnitude,B=a.normalizeTickInterval,h=a.timeUnits;E.prototype.getTimeTicks=function(){return this.chart.time.getTimeTicks.apply(this.chart.time,arguments)};E.prototype.normalizeTimeTickInterval=function(a,q){var e=q||[["millisecond",[1,2,5,10,20,25,50,100,200,500]],["second",[1,2,5,10,15,30]],["minute",[1,2,5,10,15,30]],["hour",[1,2,3,4,6,8,12]],["day",[1,2]],["week",[1,2]],["month",[1,2,3,4,6]],
["year",null]];q=e[e.length-1];var u=h[q[0]],v=q[1],n;for(n=0;n<e.length&&!(q=e[n],u=h[q[0]],v=q[1],e[n+1]&&a<=(u*v[v.length-1]+h[e[n+1][0]])/2);n++);u===h.year&&a<5*u&&(v=[1,2,5]);a=B(a/u,v,"year"===q[0]?Math.max(H(a/u),1):1);return{unitRange:u,count:a,unitName:q[0]}}});J(G,"parts/LogarithmicAxis.js",[G["parts/Globals.js"]],function(a){var E=a.Axis,H=a.getMagnitude,B=a.normalizeTickInterval,h=a.pick;E.prototype.getLogTickPositions=function(a,q,t,u){var e=this.options,n=this.len,g=[];u||(this._minorAutoInterval=
null);if(.5<=a)a=Math.round(a),g=this.getLinearTickPositions(a,q,t);else if(.08<=a)for(var n=Math.floor(q),d,m,b,k,p,e=.3<a?[1,2,4]:.15<a?[1,2,4,6,8]:[1,2,3,4,5,6,7,8,9];n<t+1&&!p;n++)for(m=e.length,d=0;d<m&&!p;d++)b=this.log2lin(this.lin2log(n)*e[d]),b>q&&(!u||k<=t)&&void 0!==k&&g.push(k),k>t&&(p=!0),k=b;else q=this.lin2log(q),t=this.lin2log(t),a=u?this.getMinorTickInterval():e.tickInterval,a=h("auto"===a?null:a,this._minorAutoInterval,e.tickPixelInterval/(u?5:1)*(t-q)/((u?n/this.tickPositions.length:
n)||1)),a=B(a,null,H(a)),g=this.getLinearTickPositions(a,q,t).map(this.log2lin),u||(this._minorAutoInterval=a/5);u||(this.tickInterval=a);return g};E.prototype.log2lin=function(a){return Math.log(a)/Math.LN10};E.prototype.lin2log=function(a){return Math.pow(10,a)}});J(G,"parts/PlotLineOrBand.js",[G["parts/Globals.js"],G["parts/Axis.js"]],function(a,E){var H=a.arrayMax,B=a.arrayMin,h=a.defined,e=a.destroyObjectProperties,q=a.erase,t=a.merge,u=a.pick;a.PlotLineOrBand=function(a,e){this.axis=a;e&&(this.options=
e,this.id=e.id)};a.PlotLineOrBand.prototype={render:function(){a.fireEvent(this,"render");var e=this,n=e.axis,g=n.horiz,d=e.options,m=d.label,b=e.label,k=d.to,p=d.from,c=d.value,x=h(p)&&h(k),q=h(c),w=e.svgElem,F=!w,C=[],l=d.color,D=u(d.zIndex,0),A=d.events,C={"class":"highcharts-plot-"+(x?"band ":"line ")+(d.className||"")},z={},I=n.chart.renderer,f=x?"bands":"lines";n.isLog&&(p=n.log2lin(p),k=n.log2lin(k),c=n.log2lin(c));n.chart.styledMode||(q?(C.stroke=l,C["stroke-width"]=d.width,d.dashStyle&&(C.dashstyle=
d.dashStyle)):x&&(l&&(C.fill=l),d.borderWidth&&(C.stroke=d.borderColor,C["stroke-width"]=d.borderWidth)));z.zIndex=D;f+="-"+D;(l=n.plotLinesAndBandsGroups[f])||(n.plotLinesAndBandsGroups[f]=l=I.g("plot-"+f).attr(z).add());F&&(e.svgElem=w=I.path().attr(C).add(l));if(q)C=n.getPlotLinePath({value:c,lineWidth:w.strokeWidth(),acrossPanes:d.acrossPanes});else if(x)C=n.getPlotBandPath(p,k,d);else return;(F||!w.d)&&C&&C.length?(w.attr({d:C}),A&&a.objectEach(A,function(a,c){w.on(c,function(a){A[c].apply(e,
[a])})})):w&&(C?(w.show(!0),w.animate({d:C})):w.d&&(w.hide(),b&&(e.label=b=b.destroy())));m&&h(m.text)&&C&&C.length&&0<n.width&&0<n.height&&!C.isFlat?(m=t({align:g&&x&&"center",x:g?!x&&4:10,verticalAlign:!g&&x&&"middle",y:g?x?16:10:x?6:-4,rotation:g&&!x&&90},m),this.renderLabel(m,C,x,D)):b&&b.hide();return e},renderLabel:function(a,e,g,d){var m=this.label,b=this.axis.chart.renderer;m||(m={align:a.textAlign||a.align,rotation:a.rotation,"class":"highcharts-plot-"+(g?"band":"line")+"-label "+(a.className||
"")},m.zIndex=d,this.label=m=b.text(a.text,0,0,a.useHTML).attr(m).add(),this.axis.chart.styledMode||m.css(a.style));d=e.xBounds||[e[1],e[4],g?e[6]:e[1]];e=e.yBounds||[e[2],e[5],g?e[7]:e[2]];g=B(d);b=B(e);m.align(a,!1,{x:g,y:b,width:H(d)-g,height:H(e)-b});m.show(!0)},destroy:function(){q(this.axis.plotLinesAndBands,this);delete this.axis;e(this)}};a.extend(E.prototype,{getPlotBandPath:function(a,e){var g=this.getPlotLinePath({value:e,force:!0,acrossPanes:this.options.acrossPanes}),d=this.getPlotLinePath({value:a,
force:!0,acrossPanes:this.options.acrossPanes}),m=[],b=this.horiz,k=1,p;a=a<this.min&&e<this.min||a>this.max&&e>this.max;if(d&&g)for(a&&(p=d.toString()===g.toString(),k=0),a=0;a<d.length;a+=6)b&&g[a+1]===d[a+1]?(g[a+1]+=k,g[a+4]+=k):b||g[a+2]!==d[a+2]||(g[a+2]+=k,g[a+5]+=k),m.push("M",d[a+1],d[a+2],"L",d[a+4],d[a+5],g[a+4],g[a+5],g[a+1],g[a+2],"z"),m.isFlat=p;return m},addPlotBand:function(a){return this.addPlotBandOrLine(a,"plotBands")},addPlotLine:function(a){return this.addPlotBandOrLine(a,"plotLines")},
addPlotBandOrLine:function(e,n){var g=(new a.PlotLineOrBand(this,e)).render(),d=this.userOptions;g&&(n&&(d[n]=d[n]||[],d[n].push(e)),this.plotLinesAndBands.push(g));return g},removePlotBandOrLine:function(a){for(var e=this.plotLinesAndBands,g=this.options,d=this.userOptions,m=e.length;m--;)e[m].id===a&&e[m].destroy();[g.plotLines||[],d.plotLines||[],g.plotBands||[],d.plotBands||[]].forEach(function(b){for(m=b.length;m--;)b[m].id===a&&q(b,b[m])})},removePlotBand:function(a){this.removePlotBandOrLine(a)},
removePlotLine:function(a){this.removePlotBandOrLine(a)}})});J(G,"parts/Tooltip.js",[G["parts/Globals.js"]],function(a){var E=a.doc,H=a.extend,B=a.format,h=a.isNumber,e=a.merge,q=a.pick,t=a.splat,u=a.syncTimeout,v=a.timeUnits;a.Tooltip=function(){this.init.apply(this,arguments)};a.Tooltip.prototype={init:function(a,e){this.chart=a;this.options=e;this.crosshairs=[];this.now={x:0,y:0};this.isHidden=!0;this.split=e.split&&!a.inverted;this.shared=e.shared||this.split;this.outside=q(e.outside,!(!a.scrollablePixelsX&&
!a.scrollablePixelsY))&&!this.split},cleanSplit:function(a){this.chart.series.forEach(function(e){var d=e&&e.tt;d&&(!d.isActive||a?e.tt=d.destroy():d.isActive=!1)})},applyFilter:function(){var a=this.chart;a.renderer.definition({tagName:"filter",id:"drop-shadow-"+a.index,opacity:.5,children:[{tagName:"feGaussianBlur","in":"SourceAlpha",stdDeviation:1},{tagName:"feOffset",dx:1,dy:1},{tagName:"feComponentTransfer",children:[{tagName:"feFuncA",type:"linear",slope:.3}]},{tagName:"feMerge",children:[{tagName:"feMergeNode"},
{tagName:"feMergeNode","in":"SourceGraphic"}]}]});a.renderer.definition({tagName:"style",textContent:".highcharts-tooltip-"+a.index+"{filter:url(#drop-shadow-"+a.index+")}"})},getLabel:function(){var e=this,g=this.chart.renderer,d=this.chart.styledMode,m=this.options,b,k;this.label||(this.outside&&(this.container=b=a.doc.createElement("div"),b.className="highcharts-tooltip-container",a.css(b,{position:"absolute",top:"1px",pointerEvents:m.style&&m.style.pointerEvents,zIndex:3}),a.doc.body.appendChild(b),
this.renderer=g=new a.Renderer(b,0,0)),this.split?this.label=g.g("tooltip"):(this.label=g.label("",0,0,m.shape||"callout",null,null,m.useHTML,null,"tooltip").attr({padding:m.padding,r:m.borderRadius}),d||this.label.attr({fill:m.backgroundColor,"stroke-width":m.borderWidth}).css(m.style).shadow(m.shadow)),d&&(this.applyFilter(),this.label.addClass("highcharts-tooltip-"+this.chart.index)),this.outside&&(k={x:this.label.xSetter,y:this.label.ySetter},this.label.xSetter=function(a,c){k[c].call(this.label,
e.distance);b.style.left=a+"px"},this.label.ySetter=function(a,c){k[c].call(this.label,e.distance);b.style.top=a+"px"}),this.label.attr({zIndex:8}).add());return this.label},update:function(a){this.destroy();e(!0,this.chart.options.tooltip.userOptions,a);this.init(this.chart,e(!0,this.options,a))},destroy:function(){this.label&&(this.label=this.label.destroy());this.split&&this.tt&&(this.cleanSplit(this.chart,!0),this.tt=this.tt.destroy());this.renderer&&(this.renderer=this.renderer.destroy(),a.discardElement(this.container));
a.clearTimeout(this.hideTimer);a.clearTimeout(this.tooltipTimeout)},move:function(e,g,d,m){var b=this,k=b.now,p=!1!==b.options.animation&&!b.isHidden&&(1<Math.abs(e-k.x)||1<Math.abs(g-k.y)),c=b.followPointer||1<b.len;H(k,{x:p?(2*k.x+e)/3:e,y:p?(k.y+g)/2:g,anchorX:c?void 0:p?(2*k.anchorX+d)/3:d,anchorY:c?void 0:p?(k.anchorY+m)/2:m});b.getLabel().attr(k);p&&(a.clearTimeout(this.tooltipTimeout),this.tooltipTimeout=setTimeout(function(){b&&b.move(e,g,d,m)},32))},hide:function(e){var g=this;a.clearTimeout(this.hideTimer);
e=q(e,this.options.hideDelay,500);this.isHidden||(this.hideTimer=u(function(){g.getLabel()[e?"fadeOut":"hide"]();g.isHidden=!0},e))},getAnchor:function(a,e){var d=this.chart,g=d.pointer,b=d.inverted,k=d.plotTop,p=d.plotLeft,c=0,x=0,h,w;a=t(a);this.followPointer&&e?(void 0===e.chartX&&(e=g.normalize(e)),a=[e.chartX-d.plotLeft,e.chartY-k]):a[0].tooltipPos?a=a[0].tooltipPos:(a.forEach(function(a){h=a.series.yAxis;w=a.series.xAxis;c+=a.plotX+(!b&&w?w.left-p:0);x+=(a.plotLow?(a.plotLow+a.plotHigh)/2:a.plotY)+
(!b&&h?h.top-k:0)}),c/=a.length,x/=a.length,a=[b?d.plotWidth-x:c,this.shared&&!b&&1<a.length&&e?e.chartY-k:b?d.plotHeight-c:x]);return a.map(Math.round)},getPosition:function(a,e,d){var g=this.chart,b=this.distance,k={},p=g.inverted&&d.h||0,c,x=this.outside,h=x?E.documentElement.clientWidth-2*b:g.chartWidth,w=x?Math.max(E.body.scrollHeight,E.documentElement.scrollHeight,E.body.offsetHeight,E.documentElement.offsetHeight,E.documentElement.clientHeight):g.chartHeight,n=g.pointer.chartPosition,C=["y",
w,e,(x?n.top-b:0)+d.plotY+g.plotTop,x?0:g.plotTop,x?w:g.plotTop+g.plotHeight],l=["x",h,a,(x?n.left-b:0)+d.plotX+g.plotLeft,x?0:g.plotLeft,x?h:g.plotLeft+g.plotWidth],D=!this.followPointer&&q(d.ttBelow,!g.inverted===!!d.negative),A=function(a,c,f,l,d,e){var g=f<l-b,A=l+b+f<c,m=l-b-f;l+=b;if(D&&A)k[a]=l;else if(!D&&g)k[a]=m;else if(g)k[a]=Math.min(e-f,0>m-p?m:m-p);else if(A)k[a]=Math.max(d,l+p+f>c?l:l+p);else return!1},z=function(a,c,f,l){var d;l<b||l>c-b?d=!1:k[a]=l<f/2?1:l>c-f/2?c-f-2:l-f/2;return d},
I=function(a){var b=C;C=l;l=b;c=a},f=function(){!1!==A.apply(0,C)?!1!==z.apply(0,l)||c||(I(!0),f()):c?k.x=k.y=0:(I(!0),f())};(g.inverted||1<this.len)&&I();f();return k},defaultFormatter:function(a){var e=this.points||t(this),d;d=[a.tooltipFooterHeaderFormatter(e[0])];d=d.concat(a.bodyFormatter(e));d.push(a.tooltipFooterHeaderFormatter(e[0],!0));return d},refresh:function(e,g){var d=this.chart,m=this.options,b,k=e,p,c={},x,h=[];x=m.formatter||this.defaultFormatter;var c=this.shared,w=d.styledMode,
n=[];m.enabled&&(a.clearTimeout(this.hideTimer),this.followPointer=t(k)[0].series.tooltipOptions.followPointer,p=this.getAnchor(k,g),g=p[0],b=p[1],!c||k.series&&k.series.noSharedTooltip?c=k.getLabelConfig():(n=d.pointer.getActiveSeries(k),d.series.forEach(function(a){(a.options.inactiveOtherPoints||-1===n.indexOf(a))&&a.setState("inactive",!0)}),k.forEach(function(a){a.setState("hover");h.push(a.getLabelConfig())}),c={x:k[0].category,y:k[0].y},c.points=h,k=k[0]),this.len=h.length,x=x.call(c,this),
c=k.series,this.distance=q(c.tooltipOptions.distance,16),!1===x?this.hide():(d=this.getLabel(),this.isHidden&&d.attr({opacity:1}).show(),this.split?this.renderSplit(x,t(e)):(m.style.width&&!w||d.css({width:this.chart.spacingBox.width}),d.attr({text:x&&x.join?x.join(""):x}),d.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-"+q(k.colorIndex,c.colorIndex)),w||d.attr({stroke:m.borderColor||k.color||c.color||"#666666"}),this.updatePosition({plotX:g,plotY:b,negative:k.negative,ttBelow:k.ttBelow,
h:p[2]||0})),this.isHidden=!1),a.fireEvent(this,"refresh"))},renderSplit:function(e,g){var d=this,m=[],b=this.chart,k=b.renderer,p=!0,c=this.options,x=0,h,w=this.getLabel(),n=b.plotTop;a.isString(e)&&(e=[!1,e]);e.slice(0,g.length+1).forEach(function(a,l){if(!1!==a&&""!==a){l=g[l-1]||{isHeader:!0,plotX:g[0].plotX,plotY:b.plotHeight};var e=l.series||d,A=e.tt,z=l.series||{},C="highcharts-color-"+q(l.colorIndex,z.colorIndex,"none");A||(A={padding:c.padding,r:c.borderRadius},b.styledMode||(A.fill=c.backgroundColor,
A["stroke-width"]=c.borderWidth),e.tt=A=k.label(null,null,null,(l.isHeader?c.headerShape:c.shape)||"callout",null,null,c.useHTML).addClass("highcharts-tooltip-box "+C).attr(A).add(w));A.isActive=!0;A.attr({text:a});b.styledMode||A.css(c.style).shadow(c.shadow).attr({stroke:c.borderColor||l.color||z.color||"#333333"});a=A.getBBox();z=a.width+A.strokeWidth();l.isHeader?(x=a.height,b.xAxis[0].opposite&&(h=!0,n-=x),z=Math.max(0,Math.min(l.plotX+b.plotLeft-z/2,b.chartWidth+(b.scrollablePixelsX?b.scrollablePixelsX-
b.marginRight:0)-z))):z=l.plotX+b.plotLeft-q(c.distance,16)-z;0>z&&(p=!1);a=(l.series&&l.series.yAxis&&l.series.yAxis.pos)+(l.plotY||0);a-=n;l.isHeader&&(a=h?-x:b.plotHeight+x);m.push({target:a,rank:l.isHeader?1:0,size:e.tt.getBBox().height+1,point:l,x:z,tt:A})}});this.cleanSplit();c.positioner&&m.forEach(function(a){var b=c.positioner.call(d,a.tt.getBBox().width,a.size,a.point);a.x=b.x;a.align=0;a.target=b.y;a.rank=q(b.rank,a.rank)});a.distribute(m,b.plotHeight+x);m.forEach(function(a){var l=a.point,
k=l.series;a.tt.attr({visibility:void 0===a.pos?"hidden":"inherit",x:p||l.isHeader||c.positioner?a.x:l.plotX+b.plotLeft+d.distance,y:a.pos+n,anchorX:l.isHeader?l.plotX+b.plotLeft:l.plotX+k.xAxis.pos,anchorY:l.isHeader?b.plotTop+b.plotHeight/2:l.plotY+k.yAxis.pos})})},updatePosition:function(a){var e=this.chart,d=this.getLabel(),m=(this.options.positioner||this.getPosition).call(this,d.width,d.height,a),b=a.plotX+e.plotLeft;a=a.plotY+e.plotTop;var k;this.outside&&(k=(this.options.borderWidth||0)+2*
this.distance,this.renderer.setSize(d.width+k,d.height+k,!1),b+=e.pointer.chartPosition.left-m.x,a+=e.pointer.chartPosition.top-m.y);this.move(Math.round(m.x),Math.round(m.y||0),b,a)},getDateFormat:function(a,e,d,m){var b=this.chart.time,k=b.dateFormat("%m-%d %H:%M:%S.%L",e),p,c,g={millisecond:15,second:12,minute:9,hour:6,day:3},h="millisecond";for(c in v){if(a===v.week&&+b.dateFormat("%w",e)===d&&"00:00:00.000"===k.substr(6)){c="week";break}if(v[c]>a){c=h;break}if(g[c]&&k.substr(g[c])!=="01-01 00:00:00.000".substr(g[c]))break;
"week"!==c&&(h=c)}c&&(p=b.resolveDTLFormat(m[c]).main);return p},getXDateFormat:function(a,e,d){e=e.dateTimeLabelFormats;var g=d&&d.closestPointRange;return(g?this.getDateFormat(g,a.x,d.options.startOfWeek,e):e.day)||e.year},tooltipFooterHeaderFormatter:function(e,g){var d=g?"footer":"header",m=e.series,b=m.tooltipOptions,k=b.xDateFormat,p=m.xAxis,c=p&&"datetime"===p.options.type&&h(e.key),x=b[d+"Format"];g={isFooter:g,labelConfig:e};a.fireEvent(this,"headerFormatter",g,function(a){c&&!k&&(k=this.getXDateFormat(e,
b,p));c&&k&&(e.point&&e.point.tooltipDateKeys||["key"]).forEach(function(a){x=x.replace("{point."+a+"}","{point."+a+":"+k+"}")});m.chart.styledMode&&(x=this.styledModeFormat(x));a.text=B(x,{point:e,series:m},this.chart.time)});return g.text},bodyFormatter:function(a){return a.map(function(a){var d=a.series.tooltipOptions;return(d[(a.point.formatPrefix||"point")+"Formatter"]||a.point.tooltipFormatter).call(a.point,d[(a.point.formatPrefix||"point")+"Format"]||"")})},styledModeFormat:function(a){return a.replace('style\x3d"font-size: 10px"',
'class\x3d"highcharts-header"').replace(/style="color:{(point|series)\.color}"/g,'class\x3d"highcharts-color-{$1.colorIndex}"')}}});J(G,"parts/Pointer.js",[G["parts/Globals.js"]],function(a){var E=a.addEvent,H=a.attr,B=a.charts,h=a.color,e=a.css,q=a.defined,t=a.extend,u=a.find,v=a.fireEvent,n=a.isNumber,g=a.isObject,d=a.offset,m=a.pick,b=a.splat,k=a.Tooltip;a.Pointer=function(a,c){this.init(a,c)};a.Pointer.prototype={init:function(a,c){this.options=c;this.chart=a;this.runChartClick=c.chart.events&&
!!c.chart.events.click;this.pinchDown=[];this.lastValidTouch={};k&&(a.tooltip=new k(a,c.tooltip),this.followTouchMove=m(c.tooltip.followTouchMove,!0));this.setDOMEvents()},zoomOption:function(a){var c=this.chart,b=c.options.chart,d=b.zoomType||"",c=c.inverted;/touch/.test(a.type)&&(d=m(b.pinchType,d));this.zoomX=a=/x/.test(d);this.zoomY=d=/y/.test(d);this.zoomHor=a&&!c||d&&c;this.zoomVert=d&&!c||a&&c;this.hasZoom=a||d},normalize:function(a,c){var b;b=a.touches?a.touches.length?a.touches.item(0):a.changedTouches[0]:
a;c||(this.chartPosition=c=d(this.chart.container));return t(a,{chartX:Math.round(b.pageX-c.left),chartY:Math.round(b.pageY-c.top)})},getCoordinates:function(a){var c={xAxis:[],yAxis:[]};this.chart.axes.forEach(function(b){c[b.isXAxis?"xAxis":"yAxis"].push({axis:b,value:b.toValue(a[b.horiz?"chartX":"chartY"])})});return c},findNearestKDPoint:function(a,c,b){var d;a.forEach(function(a){var k=!(a.noSharedTooltip&&c)&&0>a.options.findNearestPointBy.indexOf("y");a=a.searchPoint(b,k);if((k=g(a,!0))&&!(k=
!g(d,!0)))var k=d.distX-a.distX,e=d.dist-a.dist,l=(a.series.group&&a.series.group.zIndex)-(d.series.group&&d.series.group.zIndex),k=0<(0!==k&&c?k:0!==e?e:0!==l?l:d.series.index>a.series.index?-1:1);k&&(d=a)});return d},getPointFromEvent:function(a){a=a.target;for(var c;a&&!c;)c=a.point,a=a.parentNode;return c},getChartCoordinatesFromPoint:function(a,c){var b=a.series,d=b.xAxis,b=b.yAxis,k=m(a.clientX,a.plotX),e=a.shapeArgs;if(d&&b)return c?{chartX:d.len+d.pos-k,chartY:b.len+b.pos-a.plotY}:{chartX:k+
d.pos,chartY:a.plotY+b.pos};if(e&&e.x&&e.y)return{chartX:e.x,chartY:e.y}},getHoverData:function(a,c,b,d,k,e){var p,l=[];d=!(!d||!a);var x=c&&!c.stickyTracking?[c]:b.filter(function(a){return a.visible&&!(!k&&a.directTouch)&&m(a.options.enableMouseTracking,!0)&&a.stickyTracking});c=(p=d?a:this.findNearestKDPoint(x,k,e))&&p.series;p&&(k&&!c.noSharedTooltip?(x=b.filter(function(a){return a.visible&&!(!k&&a.directTouch)&&m(a.options.enableMouseTracking,!0)&&!a.noSharedTooltip}),x.forEach(function(a){var c=
u(a.points,function(a){return a.x===p.x&&!a.isNull});g(c)&&(a.chart.isBoosting&&(c=a.getPoint(c)),l.push(c))})):l.push(p));return{hoverPoint:p,hoverSeries:c,hoverPoints:l}},runPointActions:function(b,c){var d=this.chart,k=d.tooltip&&d.tooltip.options.enabled?d.tooltip:void 0,e=k?k.shared:!1,p=c||d.hoverPoint,g=p&&p.series||d.hoverSeries,g=this.getHoverData(p,g,d.series,"touchmove"!==b.type&&(!!c||g&&g.directTouch&&this.isDirectTouch),e,b),l=[],D,p=g.hoverPoint;D=g.hoverPoints;c=(g=g.hoverSeries)&&
g.tooltipOptions.followPointer;e=e&&g&&!g.noSharedTooltip;if(p&&(p!==d.hoverPoint||k&&k.isHidden)){(d.hoverPoints||[]).forEach(function(a){-1===D.indexOf(a)&&a.setState()});if(d.hoverSeries!==g)g.onMouseOver();l=this.getActiveSeries(D);d.series.forEach(function(a){(a.options.inactiveOtherPoints||-1===l.indexOf(a))&&a.setState("inactive",!0)});(D||[]).forEach(function(a){a.setState("hover")});d.hoverPoint&&d.hoverPoint.firePointEvent("mouseOut");if(!p.series)return;p.firePointEvent("mouseOver");d.hoverPoints=
D;d.hoverPoint=p;k&&k.refresh(e?D:p,b)}else c&&k&&!k.isHidden&&(p=k.getAnchor([{}],b),k.updatePosition({plotX:p[0],plotY:p[1]}));this.unDocMouseMove||(this.unDocMouseMove=E(d.container.ownerDocument,"mousemove",function(c){var b=B[a.hoverChartIndex];if(b)b.pointer.onDocumentMouseMove(c)}));d.axes.forEach(function(c){var d=m(c.crosshair.snap,!0),l=d?a.find(D,function(a){return a.series[c.coll]===c}):void 0;l||!d?c.drawCrosshair(b,l):c.hideCrosshair()})},getActiveSeries:function(a){var c=[],b;(a||[]).forEach(function(a){b=
a.series;c.push(b);b.linkedParent&&c.push(b.linkedParent);b.linkedSeries&&(c=c.concat(b.linkedSeries));b.navigatorSeries&&c.push(b.navigatorSeries)});return c},reset:function(a,c){var d=this.chart,k=d.hoverSeries,e=d.hoverPoint,p=d.hoverPoints,g=d.tooltip,l=g&&g.shared?p:e;a&&l&&b(l).forEach(function(c){c.series.isCartesian&&void 0===c.plotX&&(a=!1)});if(a)g&&l&&b(l).length&&(g.refresh(l),g.shared&&p?p.forEach(function(a){a.setState(a.state,!0);a.series.isCartesian&&(a.series.xAxis.crosshair&&a.series.xAxis.drawCrosshair(null,
a),a.series.yAxis.crosshair&&a.series.yAxis.drawCrosshair(null,a))}):e&&(e.setState(e.state,!0),d.axes.forEach(function(a){a.crosshair&&a.drawCrosshair(null,e)})));else{if(e)e.onMouseOut();p&&p.forEach(function(a){a.setState()});if(k)k.onMouseOut();g&&g.hide(c);this.unDocMouseMove&&(this.unDocMouseMove=this.unDocMouseMove());d.axes.forEach(function(a){a.hideCrosshair()});this.hoverX=d.hoverPoints=d.hoverPoint=null}},scaleGroups:function(a,c){var b=this.chart,d;b.series.forEach(function(k){d=a||k.getPlotBox();
k.xAxis&&k.xAxis.zoomEnabled&&k.group&&(k.group.attr(d),k.markerGroup&&(k.markerGroup.attr(d),k.markerGroup.clip(c?b.clipRect:null)),k.dataLabelsGroup&&k.dataLabelsGroup.attr(d))});b.clipRect.attr(c||b.clipBox)},dragStart:function(a){var c=this.chart;c.mouseIsDown=a.type;c.cancelClick=!1;c.mouseDownX=this.mouseDownX=a.chartX;c.mouseDownY=this.mouseDownY=a.chartY},drag:function(a){var c=this.chart,b=c.options.chart,d=a.chartX,k=a.chartY,e=this.zoomHor,p=this.zoomVert,l=c.plotLeft,g=c.plotTop,m=c.plotWidth,
z=c.plotHeight,n,f=this.selectionMarker,r=this.mouseDownX,q=this.mouseDownY,t=b.panKey&&a[b.panKey+"Key"];f&&f.touch||(d<l?d=l:d>l+m&&(d=l+m),k<g?k=g:k>g+z&&(k=g+z),this.hasDragged=Math.sqrt(Math.pow(r-d,2)+Math.pow(q-k,2)),10<this.hasDragged&&(n=c.isInsidePlot(r-l,q-g),c.hasCartesianSeries&&(this.zoomX||this.zoomY)&&n&&!t&&!f&&(this.selectionMarker=f=c.renderer.rect(l,g,e?1:m,p?1:z,0).attr({"class":"highcharts-selection-marker",zIndex:7}).add(),c.styledMode||f.attr({fill:b.selectionMarkerFill||h("#335cad").setOpacity(.25).get()})),
f&&e&&(d-=r,f.attr({width:Math.abs(d),x:(0<d?0:d)+r})),f&&p&&(d=k-q,f.attr({height:Math.abs(d),y:(0<d?0:d)+q})),n&&!f&&b.panning&&c.pan(a,b.panning)))},drop:function(a){var c=this,b=this.chart,d=this.hasPinched;if(this.selectionMarker){var k={originalEvent:a,xAxis:[],yAxis:[]},p=this.selectionMarker,g=p.attr?p.attr("x"):p.x,l=p.attr?p.attr("y"):p.y,m=p.attr?p.attr("width"):p.width,A=p.attr?p.attr("height"):p.height,z;if(this.hasDragged||d)b.axes.forEach(function(b){if(b.zoomEnabled&&q(b.min)&&(d||
c[{xAxis:"zoomX",yAxis:"zoomY"}[b.coll]])){var f=b.horiz,e="touchend"===a.type?b.minPixelPadding:0,p=b.toValue((f?g:l)+e),f=b.toValue((f?g+m:l+A)-e);k[b.coll].push({axis:b,min:Math.min(p,f),max:Math.max(p,f)});z=!0}}),z&&v(b,"selection",k,function(a){b.zoom(t(a,d?{animation:!1}:null))});n(b.index)&&(this.selectionMarker=this.selectionMarker.destroy());d&&this.scaleGroups()}b&&n(b.index)&&(e(b.container,{cursor:b._cursor}),b.cancelClick=10<this.hasDragged,b.mouseIsDown=this.hasDragged=this.hasPinched=
!1,this.pinchDown=[])},onContainerMouseDown:function(a){a=this.normalize(a);2!==a.button&&(this.zoomOption(a),a.preventDefault&&a.preventDefault(),this.dragStart(a))},onDocumentMouseUp:function(b){B[a.hoverChartIndex]&&B[a.hoverChartIndex].pointer.drop(b)},onDocumentMouseMove:function(a){var c=this.chart,b=this.chartPosition;a=this.normalize(a,b);!b||this.inClass(a.target,"highcharts-tracker")||c.isInsidePlot(a.chartX-c.plotLeft,a.chartY-c.plotTop)||this.reset()},onContainerMouseLeave:function(b){var c=
B[a.hoverChartIndex];c&&(b.relatedTarget||b.toElement)&&(c.pointer.reset(),c.pointer.chartPosition=null)},onContainerMouseMove:function(b){var c=this.chart;q(a.hoverChartIndex)&&B[a.hoverChartIndex]&&B[a.hoverChartIndex].mouseIsDown||(a.hoverChartIndex=c.index);b=this.normalize(b);b.preventDefault||(b.returnValue=!1);"mousedown"===c.mouseIsDown&&this.drag(b);!this.inClass(b.target,"highcharts-tracker")&&!c.isInsidePlot(b.chartX-c.plotLeft,b.chartY-c.plotTop)||c.openMenu||this.runPointActions(b)},
inClass:function(a,c){for(var b;a;){if(b=H(a,"class")){if(-1!==b.indexOf(c))return!0;if(-1!==b.indexOf("highcharts-container"))return!1}a=a.parentNode}},onTrackerMouseOut:function(a){var c=this.chart.hoverSeries;a=a.relatedTarget||a.toElement;this.isDirectTouch=!1;if(!(!c||!a||c.stickyTracking||this.inClass(a,"highcharts-tooltip")||this.inClass(a,"highcharts-series-"+c.index)&&this.inClass(a,"highcharts-tracker")))c.onMouseOut()},onContainerClick:function(a){var c=this.chart,b=c.hoverPoint,d=c.plotLeft,
k=c.plotTop;a=this.normalize(a);c.cancelClick||(b&&this.inClass(a.target,"highcharts-tracker")?(v(b.series,"click",t(a,{point:b})),c.hoverPoint&&b.firePointEvent("click",a)):(t(a,this.getCoordinates(a)),c.isInsidePlot(a.chartX-d,a.chartY-k)&&v(c,"click",a)))},setDOMEvents:function(){var b=this,c=b.chart.container,d=c.ownerDocument;c.onmousedown=function(a){b.onContainerMouseDown(a)};c.onmousemove=function(a){b.onContainerMouseMove(a)};c.onclick=function(a){b.onContainerClick(a)};this.unbindContainerMouseLeave=
E(c,"mouseleave",b.onContainerMouseLeave);a.unbindDocumentMouseUp||(a.unbindDocumentMouseUp=E(d,"mouseup",b.onDocumentMouseUp));a.hasTouch&&(c.ontouchstart=function(a){b.onContainerTouchStart(a)},c.ontouchmove=function(a){b.onContainerTouchMove(a)},a.unbindDocumentTouchEnd||(a.unbindDocumentTouchEnd=E(d,"touchend",b.onDocumentTouchEnd)))},destroy:function(){var b=this;b.unDocMouseMove&&b.unDocMouseMove();this.unbindContainerMouseLeave();a.chartCount||(a.unbindDocumentMouseUp&&(a.unbindDocumentMouseUp=
a.unbindDocumentMouseUp()),a.unbindDocumentTouchEnd&&(a.unbindDocumentTouchEnd=a.unbindDocumentTouchEnd()));clearInterval(b.tooltipTimeout);a.objectEach(b,function(a,d){b[d]=null})}}});J(G,"parts/TouchPointer.js",[G["parts/Globals.js"]],function(a){var E=a.charts,H=a.extend,B=a.noop,h=a.pick;H(a.Pointer.prototype,{pinchTranslate:function(a,h,t,u,v,n){this.zoomHor&&this.pinchTranslateDirection(!0,a,h,t,u,v,n);this.zoomVert&&this.pinchTranslateDirection(!1,a,h,t,u,v,n)},pinchTranslateDirection:function(a,
h,t,u,v,n,g,d){var e=this.chart,b=a?"x":"y",k=a?"X":"Y",p="chart"+k,c=a?"width":"height",x=e["plot"+(a?"Left":"Top")],q,w,F=d||1,C=e.inverted,l=e.bounds[a?"h":"v"],D=1===h.length,A=h[0][p],z=t[0][p],I=!D&&h[1][p],f=!D&&t[1][p],r;t=function(){!D&&20<Math.abs(A-I)&&(F=d||Math.abs(z-f)/Math.abs(A-I));w=(x-z)/F+A;q=e["plot"+(a?"Width":"Height")]/F};t();h=w;h<l.min?(h=l.min,r=!0):h+q>l.max&&(h=l.max-q,r=!0);r?(z-=.8*(z-g[b][0]),D||(f-=.8*(f-g[b][1])),t()):g[b]=[z,f];C||(n[b]=w-x,n[c]=q);n=C?1/F:F;v[c]=
q;v[b]=h;u[C?a?"scaleY":"scaleX":"scale"+k]=F;u["translate"+k]=n*x+(z-n*A)},pinch:function(a){var e=this,t=e.chart,u=e.pinchDown,v=a.touches,n=v.length,g=e.lastValidTouch,d=e.hasZoom,m=e.selectionMarker,b={},k=1===n&&(e.inClass(a.target,"highcharts-tracker")&&t.runTrackerClick||e.runChartClick),p={};1<n&&(e.initiated=!0);d&&e.initiated&&!k&&a.preventDefault();[].map.call(v,function(a){return e.normalize(a)});"touchstart"===a.type?([].forEach.call(v,function(a,b){u[b]={chartX:a.chartX,chartY:a.chartY}}),
g.x=[u[0].chartX,u[1]&&u[1].chartX],g.y=[u[0].chartY,u[1]&&u[1].chartY],t.axes.forEach(function(a){if(a.zoomEnabled){var b=t.bounds[a.horiz?"h":"v"],c=a.minPixelPadding,d=a.toPixels(Math.min(h(a.options.min,a.dataMin),a.dataMin)),k=a.toPixels(Math.max(h(a.options.max,a.dataMax),a.dataMax)),e=Math.max(d,k);b.min=Math.min(a.pos,Math.min(d,k)-c);b.max=Math.max(a.pos+a.len,e+c)}}),e.res=!0):e.followTouchMove&&1===n?this.runPointActions(e.normalize(a)):u.length&&(m||(e.selectionMarker=m=H({destroy:B,touch:!0},
t.plotBox)),e.pinchTranslate(u,v,b,m,p,g),e.hasPinched=d,e.scaleGroups(b,p),e.res&&(e.res=!1,this.reset(!1,0)))},touch:function(e,q){var t=this.chart,u,v;if(t.index!==a.hoverChartIndex)this.onContainerMouseLeave({relatedTarget:!0});a.hoverChartIndex=t.index;1===e.touches.length?(e=this.normalize(e),(v=t.isInsidePlot(e.chartX-t.plotLeft,e.chartY-t.plotTop))&&!t.openMenu?(q&&this.runPointActions(e),"touchmove"===e.type&&(q=this.pinchDown,u=q[0]?4<=Math.sqrt(Math.pow(q[0].chartX-e.chartX,2)+Math.pow(q[0].chartY-
e.chartY,2)):!1),h(u,!0)&&this.pinch(e)):q&&this.reset()):2===e.touches.length&&this.pinch(e)},onContainerTouchStart:function(a){this.zoomOption(a);this.touch(a,!0)},onContainerTouchMove:function(a){this.touch(a)},onDocumentTouchEnd:function(e){E[a.hoverChartIndex]&&E[a.hoverChartIndex].pointer.drop(e)}})});J(G,"parts/MSPointer.js",[G["parts/Globals.js"]],function(a){var E=a.addEvent,H=a.charts,B=a.css,h=a.doc,e=a.extend,q=a.noop,t=a.Pointer,u=a.removeEvent,v=a.win,n=a.wrap;if(!a.hasTouch&&(v.PointerEvent||
v.MSPointerEvent)){var g={},d=!!v.PointerEvent,m=function(){var b=[];b.item=function(a){return this[a]};a.objectEach(g,function(a){b.push({pageX:a.pageX,pageY:a.pageY,target:a.target})});return b},b=function(b,d,c,e){"touch"!==b.pointerType&&b.pointerType!==b.MSPOINTER_TYPE_TOUCH||!H[a.hoverChartIndex]||(e(b),e=H[a.hoverChartIndex].pointer,e[d]({type:c,target:b.currentTarget,preventDefault:q,touches:m()}))};e(t.prototype,{onContainerPointerDown:function(a){b(a,"onContainerTouchStart","touchstart",
function(a){g[a.pointerId]={pageX:a.pageX,pageY:a.pageY,target:a.currentTarget}})},onContainerPointerMove:function(a){b(a,"onContainerTouchMove","touchmove",function(a){g[a.pointerId]={pageX:a.pageX,pageY:a.pageY};g[a.pointerId].target||(g[a.pointerId].target=a.currentTarget)})},onDocumentPointerUp:function(a){b(a,"onDocumentTouchEnd","touchend",function(a){delete g[a.pointerId]})},batchMSEvents:function(a){a(this.chart.container,d?"pointerdown":"MSPointerDown",this.onContainerPointerDown);a(this.chart.container,
d?"pointermove":"MSPointerMove",this.onContainerPointerMove);a(h,d?"pointerup":"MSPointerUp",this.onDocumentPointerUp)}});n(t.prototype,"init",function(a,b,c){a.call(this,b,c);this.hasZoom&&B(b.container,{"-ms-touch-action":"none","touch-action":"none"})});n(t.prototype,"setDOMEvents",function(a){a.apply(this);(this.hasZoom||this.followTouchMove)&&this.batchMSEvents(E)});n(t.prototype,"destroy",function(a){this.batchMSEvents(u);a.call(this)})}});J(G,"parts/Legend.js",[G["parts/Globals.js"]],function(a){var E=
a.addEvent,H=a.css,B=a.discardElement,h=a.defined,e=a.fireEvent,q=a.isFirefox,t=a.marginNames,u=a.merge,v=a.pick,n=a.setAnimation,g=a.stableSort,d=a.win,m=a.wrap;a.Legend=function(a,d){this.init(a,d)};a.Legend.prototype={init:function(a,d){this.chart=a;this.setOptions(d);d.enabled&&(this.render(),E(this.chart,"endResize",function(){this.legend.positionCheckboxes()}),this.proximate?this.unchartrender=E(this.chart,"render",function(){this.legend.proximatePositions();this.legend.positionItems()}):this.unchartrender&&
this.unchartrender())},setOptions:function(a){var b=v(a.padding,8);this.options=a;this.chart.styledMode||(this.itemStyle=a.itemStyle,this.itemHiddenStyle=u(this.itemStyle,a.itemHiddenStyle));this.itemMarginTop=a.itemMarginTop||0;this.padding=b;this.initialItemY=b-5;this.symbolWidth=v(a.symbolWidth,16);this.pages=[];this.proximate="proximate"===a.layout&&!this.chart.inverted},update:function(a,d){var b=this.chart;this.setOptions(u(!0,this.options,a));this.destroy();b.isDirtyLegend=b.isDirtyBox=!0;
v(d,!0)&&b.redraw();e(this,"afterUpdate")},colorizeItem:function(a,d){a.legendGroup[d?"removeClass":"addClass"]("highcharts-legend-item-hidden");if(!this.chart.styledMode){var b=this.options,c=a.legendItem,k=a.legendLine,g=a.legendSymbol,m=this.itemHiddenStyle.color,b=d?b.itemStyle.color:m,h=d?a.color||m:m,n=a.options&&a.options.marker,l={fill:h};c&&c.css({fill:b,color:b});k&&k.attr({stroke:h});g&&(n&&g.isMarker&&(l=a.pointAttribs(),d||(l.stroke=l.fill=m)),g.attr(l))}e(this,"afterColorizeItem",{item:a,
visible:d})},positionItems:function(){this.allItems.forEach(this.positionItem,this);this.chart.isResizing||this.positionCheckboxes()},positionItem:function(a){var b=this.options,d=b.symbolPadding,b=!b.rtl,c=a._legendItemPos,e=c[0],c=c[1],g=a.checkbox;if((a=a.legendGroup)&&a.element)a[h(a.translateY)?"animate":"attr"]({translateX:b?e:this.legendWidth-e-2*d-4,translateY:c});g&&(g.x=e,g.y=c)},destroyItem:function(a){var b=a.checkbox;["legendItem","legendLine","legendSymbol","legendGroup"].forEach(function(b){a[b]&&
(a[b]=a[b].destroy())});b&&B(a.checkbox)},destroy:function(){function a(a){this[a]&&(this[a]=this[a].destroy())}this.getAllItems().forEach(function(b){["legendItem","legendGroup"].forEach(a,b)});"clipRect up down pager nav box title group".split(" ").forEach(a,this);this.display=null},positionCheckboxes:function(){var a=this.group&&this.group.alignAttr,d,e=this.clipHeight||this.legendHeight,c=this.titleHeight;a&&(d=a.translateY,this.allItems.forEach(function(b){var k=b.checkbox,g;k&&(g=d+c+k.y+(this.scrollOffset||
0)+3,H(k,{left:a.translateX+b.checkboxOffset+k.x-20+"px",top:g+"px",display:this.proximate||g>d-6&&g<d+e-6?"":"none"}))},this))},renderTitle:function(){var a=this.options,d=this.padding,e=a.title,c=0;e.text&&(this.title||(this.title=this.chart.renderer.label(e.text,d-3,d-4,null,null,null,a.useHTML,null,"legend-title").attr({zIndex:1}),this.chart.styledMode||this.title.css(e.style),this.title.add(this.group)),e.width||this.title.css({width:this.maxLegendWidth+"px"}),a=this.title.getBBox(),c=a.height,
this.offsetWidth=a.width,this.contentGroup.attr({translateY:c}));this.titleHeight=c},setText:function(b){var d=this.options;b.legendItem.attr({text:d.labelFormat?a.format(d.labelFormat,b,this.chart.time):d.labelFormatter.call(b)})},renderItem:function(a){var b=this.chart,d=b.renderer,c=this.options,e=this.symbolWidth,g=c.symbolPadding,m=this.itemStyle,h=this.itemHiddenStyle,n="horizontal"===c.layout?v(c.itemDistance,20):0,l=!c.rtl,D=a.legendItem,A=!a.series,z=!A&&a.series.drawLegendSymbol?a.series:
a,I=z.options,I=this.createCheckboxForItem&&I&&I.showCheckbox,n=e+g+n+(I?20:0),f=c.useHTML,r=a.options.className;D||(a.legendGroup=d.g("legend-item").addClass("highcharts-"+z.type+"-series highcharts-color-"+a.colorIndex+(r?" "+r:"")+(A?" highcharts-series-"+a.index:"")).attr({zIndex:1}).add(this.scrollGroup),a.legendItem=D=d.text("",l?e+g:-g,this.baseline||0,f),b.styledMode||D.css(u(a.visible?m:h)),D.attr({align:l?"left":"right",zIndex:2}).add(a.legendGroup),this.baseline||(this.fontMetrics=d.fontMetrics(b.styledMode?
12:m.fontSize,D),this.baseline=this.fontMetrics.f+3+this.itemMarginTop,D.attr("y",this.baseline)),this.symbolHeight=c.symbolHeight||this.fontMetrics.f,z.drawLegendSymbol(this,a),this.setItemEvents&&this.setItemEvents(a,D,f));I&&!a.checkbox&&this.createCheckboxForItem(a);this.colorizeItem(a,a.visible);!b.styledMode&&m.width||D.css({width:(c.itemWidth||this.widthOption||b.spacingBox.width)-n});this.setText(a);b=D.getBBox();a.itemWidth=a.checkboxOffset=c.itemWidth||a.legendItemWidth||b.width+n;this.maxItemWidth=
Math.max(this.maxItemWidth,a.itemWidth);this.totalItemWidth+=a.itemWidth;this.itemHeight=a.itemHeight=Math.round(a.legendItemHeight||b.height||this.symbolHeight)},layoutItem:function(a){var b=this.options,d=this.padding,c="horizontal"===b.layout,e=a.itemHeight,g=b.itemMarginBottom||0,m=this.itemMarginTop,h=c?v(b.itemDistance,20):0,n=this.maxLegendWidth,b=b.alignColumns&&this.totalItemWidth>n?this.maxItemWidth:a.itemWidth;c&&this.itemX-d+b>n&&(this.itemX=d,this.lastLineHeight&&(this.itemY+=m+this.lastLineHeight+
g),this.lastLineHeight=0);this.lastItemY=m+this.itemY+g;this.lastLineHeight=Math.max(e,this.lastLineHeight);a._legendItemPos=[this.itemX,this.itemY];c?this.itemX+=b:(this.itemY+=m+e+g,this.lastLineHeight=e);this.offsetWidth=this.widthOption||Math.max((c?this.itemX-d-(a.checkbox?0:h):b)+d,this.offsetWidth)},getAllItems:function(){var a=[];this.chart.series.forEach(function(b){var d=b&&b.options;b&&v(d.showInLegend,h(d.linkedTo)?!1:void 0,!0)&&(a=a.concat(b.legendItems||("point"===d.legendType?b.data:
b)))});e(this,"afterGetAllItems",{allItems:a});return a},getAlignment:function(){var a=this.options;return this.proximate?a.align.charAt(0)+"tv":a.floating?"":a.align.charAt(0)+a.verticalAlign.charAt(0)+a.layout.charAt(0)},adjustMargins:function(a,d){var b=this.chart,c=this.options,e=this.getAlignment(),k=void 0!==b.options.title.margin?b.titleOffset+b.options.title.margin:0;e&&[/(lth|ct|rth)/,/(rtv|rm|rbv)/,/(rbh|cb|lbh)/,/(lbv|lm|ltv)/].forEach(function(g,m){g.test(e)&&!h(a[m])&&(b[t[m]]=Math.max(b[t[m]],
b.legend[(m+1)%2?"legendHeight":"legendWidth"]+[1,-1,-1,1][m]*c[m%2?"x":"y"]+v(c.margin,12)+d[m]+(0===m&&(0===b.titleOffset?0:k))))})},proximatePositions:function(){var b=this.chart,d=[],e="left"===this.options.align;this.allItems.forEach(function(c){var k,g;g=e;var m;c.yAxis&&c.points&&(c.xAxis.options.reversed&&(g=!g),k=a.find(g?c.points:c.points.slice(0).reverse(),function(b){return a.isNumber(b.plotY)}),g=c.legendGroup.getBBox().height,m=c.yAxis.top-b.plotTop,c.visible?(k=k?k.plotY:c.yAxis.height,
k+=m-.3*g):k=m+c.yAxis.height,d.push({target:k,size:g,item:c}))},this);a.distribute(d,b.plotHeight);d.forEach(function(a){a.item._legendItemPos[1]=b.plotTop-b.spacing[0]+a.pos})},render:function(){var b=this.chart,d=b.renderer,m=this.group,c,h,n,w=this.box,q=this.options,C=this.padding;this.itemX=C;this.itemY=this.initialItemY;this.lastItemY=this.offsetWidth=0;this.widthOption=a.relativeLength(q.width,b.spacingBox.width-C);c=b.spacingBox.width-2*C-q.x;-1<["rm","lm"].indexOf(this.getAlignment().substring(0,
2))&&(c/=2);this.maxLegendWidth=this.widthOption||c;m||(this.group=m=d.g("legend").attr({zIndex:7}).add(),this.contentGroup=d.g().attr({zIndex:1}).add(m),this.scrollGroup=d.g().add(this.contentGroup));this.renderTitle();c=this.getAllItems();g(c,function(a,b){return(a.options&&a.options.legendIndex||0)-(b.options&&b.options.legendIndex||0)});q.reversed&&c.reverse();this.allItems=c;this.display=h=!!c.length;this.itemHeight=this.totalItemWidth=this.maxItemWidth=this.lastLineHeight=0;c.forEach(this.renderItem,
this);c.forEach(this.layoutItem,this);c=(this.widthOption||this.offsetWidth)+C;n=this.lastItemY+this.lastLineHeight+this.titleHeight;n=this.handleOverflow(n);n+=C;w||(this.box=w=d.rect().addClass("highcharts-legend-box").attr({r:q.borderRadius}).add(m),w.isNew=!0);b.styledMode||w.attr({stroke:q.borderColor,"stroke-width":q.borderWidth||0,fill:q.backgroundColor||"none"}).shadow(q.shadow);0<c&&0<n&&(w[w.isNew?"attr":"animate"](w.crisp.call({},{x:0,y:0,width:c,height:n},w.strokeWidth())),w.isNew=!1);
w[h?"show":"hide"]();b.styledMode&&"none"===m.getStyle("display")&&(c=n=0);this.legendWidth=c;this.legendHeight=n;h&&(d=b.spacingBox,/(lth|ct|rth)/.test(this.getAlignment())&&(w=d.y+b.titleOffset,d=u(d,{y:0<b.titleOffset?w+=b.options.title.margin:w})),m.align(u(q,{width:c,height:n,verticalAlign:this.proximate?"top":q.verticalAlign}),!0,d));this.proximate||this.positionItems();e(this,"afterRender")},handleOverflow:function(a){var b=this,d=this.chart,c=d.renderer,e=this.options,g=e.y,m=this.padding,
g=d.spacingBox.height+("top"===e.verticalAlign?-g:g)-m,h=e.maxHeight,n,l=this.clipRect,D=e.navigation,A=v(D.animation,!0),z=D.arrowSize||12,I=this.nav,f=this.pages,r,q=this.allItems,t=function(a){"number"===typeof a?l.attr({height:a}):l&&(b.clipRect=l.destroy(),b.contentGroup.clip());b.contentGroup.div&&(b.contentGroup.div.style.clip=a?"rect("+m+"px,9999px,"+(m+a)+"px,0)":"auto")},L=function(a){b[a]=c.circle(0,0,1.3*z).translate(z/2,z/2).add(I);d.styledMode||b[a].attr("fill","rgba(0,0,0,0.0001)");
return b[a]};"horizontal"!==e.layout||"middle"===e.verticalAlign||e.floating||(g/=2);h&&(g=Math.min(g,h));f.length=0;a>g&&!1!==D.enabled?(this.clipHeight=n=Math.max(g-20-this.titleHeight-m,0),this.currentPage=v(this.currentPage,1),this.fullHeight=a,q.forEach(function(a,b){var c=a._legendItemPos[1],d=Math.round(a.legendItem.getBBox().height),l=f.length;if(!l||c-f[l-1]>n&&(r||c)!==f[l-1])f.push(r||c),l++;a.pageIx=l-1;r&&(q[b-1].pageIx=l-1);b===q.length-1&&c+d-f[l-1]>n&&c!==r&&(f.push(c),a.pageIx=l);
c!==r&&(r=c)}),l||(l=b.clipRect=c.clipRect(0,m,9999,0),b.contentGroup.clip(l)),t(n),I||(this.nav=I=c.g().attr({zIndex:1}).add(this.group),this.up=c.symbol("triangle",0,0,z,z).add(I),L("upTracker").on("click",function(){b.scroll(-1,A)}),this.pager=c.text("",15,10).addClass("highcharts-legend-navigation"),d.styledMode||this.pager.css(D.style),this.pager.add(I),this.down=c.symbol("triangle-down",0,0,z,z).add(I),L("downTracker").on("click",function(){b.scroll(1,A)})),b.scroll(0),a=g):I&&(t(),this.nav=
I.destroy(),this.scrollGroup.attr({translateY:1}),this.clipHeight=0);return a},scroll:function(a,d){var b=this.pages,c=b.length,e=this.currentPage+a;a=this.clipHeight;var k=this.options.navigation,g=this.pager,m=this.padding;e>c&&(e=c);0<e&&(void 0!==d&&n(d,this.chart),this.nav.attr({translateX:m,translateY:a+this.padding+7+this.titleHeight,visibility:"visible"}),[this.up,this.upTracker].forEach(function(a){a.attr({"class":1===e?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"})}),
g.attr({text:e+"/"+c}),[this.down,this.downTracker].forEach(function(a){a.attr({x:18+this.pager.getBBox().width,"class":e===c?"highcharts-legend-nav-inactive":"highcharts-legend-nav-active"})},this),this.chart.styledMode||(this.up.attr({fill:1===e?k.inactiveColor:k.activeColor}),this.upTracker.css({cursor:1===e?"default":"pointer"}),this.down.attr({fill:e===c?k.inactiveColor:k.activeColor}),this.downTracker.css({cursor:e===c?"default":"pointer"})),this.scrollOffset=-b[e-1]+this.initialItemY,this.scrollGroup.animate({translateY:this.scrollOffset}),
this.currentPage=e,this.positionCheckboxes())}};a.LegendSymbolMixin={drawRectangle:function(a,d){var b=a.symbolHeight,c=a.options.squareSymbol;d.legendSymbol=this.chart.renderer.rect(c?(a.symbolWidth-b)/2:0,a.baseline-b+1,c?b:a.symbolWidth,b,v(a.options.symbolRadius,b/2)).addClass("highcharts-point").attr({zIndex:3}).add(d.legendGroup)},drawLineMarker:function(a){var b=this.options,d=b.marker,c=a.symbolWidth,e=a.symbolHeight,g=e/2,m=this.chart.renderer,h=this.legendGroup;a=a.baseline-Math.round(.3*
a.fontMetrics.b);var n={};this.chart.styledMode||(n={"stroke-width":b.lineWidth||0},b.dashStyle&&(n.dashstyle=b.dashStyle));this.legendLine=m.path(["M",0,a,"L",c,a]).addClass("highcharts-graph").attr(n).add(h);d&&!1!==d.enabled&&c&&(b=Math.min(v(d.radius,g),g),0===this.symbol.indexOf("url")&&(d=u(d,{width:e,height:e}),b=0),this.legendSymbol=d=m.symbol(this.symbol,c/2-b,a-b,2*b,2*b,d).addClass("highcharts-point").add(h),d.isMarker=!0)}};(/Trident\/7\.0/.test(d.navigator&&d.navigator.userAgent)||q)&&
m(a.Legend.prototype,"positionItem",function(a,d){var b=this,c=function(){d._legendItemPos&&a.call(b,d)};c();b.bubbleLegend||setTimeout(c)})});J(G,"parts/Chart.js",[G["parts/Globals.js"]],function(a){var E=a.addEvent,H=a.animate,B=a.animObject,h=a.attr,e=a.doc,q=a.Axis,t=a.createElement,u=a.defaultOptions,v=a.discardElement,n=a.charts,g=a.css,d=a.defined,m=a.extend,b=a.find,k=a.fireEvent,p=a.isNumber,c=a.isObject,x=a.isString,K=a.Legend,w=a.marginNames,F=a.merge,C=a.objectEach,l=a.Pointer,D=a.pick,
A=a.pInt,z=a.removeEvent,I=a.seriesTypes,f=a.splat,r=a.syncTimeout,Q=a.win,N=a.Chart=function(){this.getArgs.apply(this,arguments)};a.chart=function(a,b,c){return new N(a,b,c)};m(N.prototype,{callbacks:[],getArgs:function(){var a=[].slice.call(arguments);if(x(a[0])||a[0].nodeName)this.renderTo=a.shift();this.init(a[0],a[1])},init:function(b,f){var d,l=b.series,e=b.plotOptions||{};k(this,"init",{args:arguments},function(){b.series=null;d=F(u,b);C(d.plotOptions,function(a,b){c(a)&&(a.tooltip=e[b]&&
F(e[b].tooltip)||void 0)});d.tooltip.userOptions=b.chart&&b.chart.forExport&&b.tooltip.userOptions||b.tooltip;d.series=b.series=l;this.userOptions=b;var g=d.chart,m=g.events;this.margin=[];this.spacing=[];this.bounds={h:{},v:{}};this.labelCollectors=[];this.callback=f;this.isResizing=0;this.options=d;this.axes=[];this.series=[];this.time=b.time&&Object.keys(b.time).length?new a.Time(b.time):a.time;this.styledMode=g.styledMode;this.hasCartesianSeries=g.showAxes;var A=this;A.index=n.length;n.push(A);
a.chartCount++;m&&C(m,function(b,c){a.isFunction(b)&&E(A,c,b)});A.xAxis=[];A.yAxis=[];A.pointCount=A.colorCounter=A.symbolCounter=0;k(A,"afterInit");A.firstRender()})},initSeries:function(b){var c=this.options.chart;(c=I[b.type||c.type||c.defaultSeriesType])||a.error(17,!0,this);c=new c;c.init(this,b);return c},orderSeries:function(a){var b=this.series;for(a=a||0;a<b.length;a++)b[a]&&(b[a].index=a,b[a].name=b[a].getName())},isInsidePlot:function(a,b,c){var f=c?b:a;a=c?a:b;return 0<=f&&f<=this.plotWidth&&
0<=a&&a<=this.plotHeight},redraw:function(b){k(this,"beforeRedraw");var c=this.axes,f=this.series,d=this.pointer,l=this.legend,e=this.userOptions.legend,g=this.isDirtyLegend,A,p,r=this.hasCartesianSeries,h=this.isDirtyBox,D,z=this.renderer,n=z.isHidden(),x=[];this.setResponsive&&this.setResponsive(!1);a.setAnimation(b,this);n&&this.temporaryDisplay();this.layOutTitles();for(b=f.length;b--;)if(D=f[b],D.options.stacking&&(A=!0,D.isDirty)){p=!0;break}if(p)for(b=f.length;b--;)D=f[b],D.options.stacking&&
(D.isDirty=!0);f.forEach(function(a){a.isDirty&&("point"===a.options.legendType?(a.updateTotals&&a.updateTotals(),g=!0):e&&(e.labelFormatter||e.labelFormat)&&(g=!0));a.isDirtyData&&k(a,"updatedData")});g&&l&&l.options.enabled&&(l.render(),this.isDirtyLegend=!1);A&&this.getStacks();r&&c.forEach(function(a){a.updateNames();a.setScale()});this.getMargins();r&&(c.forEach(function(a){a.isDirty&&(h=!0)}),c.forEach(function(a){var b=a.min+","+a.max;a.extKey!==b&&(a.extKey=b,x.push(function(){k(a,"afterSetExtremes",
m(a.eventArgs,a.getExtremes()));delete a.eventArgs}));(h||A)&&a.redraw()}));h&&this.drawChartBox();k(this,"predraw");f.forEach(function(a){(h||a.isDirty)&&a.visible&&a.redraw();a.isDirtyData=!1});d&&d.reset(!0);z.draw();k(this,"redraw");k(this,"render");n&&this.temporaryDisplay(!0);x.forEach(function(a){a.call()})},get:function(a){function c(b){return b.id===a||b.options&&b.options.id===a}var f,d=this.series,l;f=b(this.axes,c)||b(this.series,c);for(l=0;!f&&l<d.length;l++)f=b(d[l].points||[],c);return f},
getAxes:function(){var a=this,b=this.options,c=b.xAxis=f(b.xAxis||{}),b=b.yAxis=f(b.yAxis||{});k(this,"getAxes");c.forEach(function(a,b){a.index=b;a.isX=!0});b.forEach(function(a,b){a.index=b});c.concat(b).forEach(function(b){new q(a,b)});k(this,"afterGetAxes")},getSelectedPoints:function(){var a=[];this.series.forEach(function(b){a=a.concat((b[b.hasGroupedData?"points":"data"]||[]).filter(function(a){return a.selected}))});return a},getSelectedSeries:function(){return this.series.filter(function(a){return a.selected})},
setTitle:function(a,b,c){var f=this,d=f.options,l=f.styledMode,e;e=d.title=F(!l&&{style:{color:"#333333",fontSize:d.isStock?"16px":"18px"}},d.title,a);d=d.subtitle=F(!l&&{style:{color:"#666666"}},d.subtitle,b);[["title",a,e],["subtitle",b,d]].forEach(function(a,b){var c=a[0],d=f[c],e=a[1];a=a[2];d&&e&&(f[c]=d=d.destroy());a&&!d&&(f[c]=f.renderer.text(a.text,0,0,a.useHTML).attr({align:a.align,"class":"highcharts-"+c,zIndex:a.zIndex||4}).add(),f[c].update=function(a){f.setTitle(!b&&a,b&&a)},l||f[c].css(a.style))});
f.layOutTitles(c)},layOutTitles:function(a){var b=0,c,f=this.renderer,d=this.spacingBox;["title","subtitle"].forEach(function(a){var c=this[a],l=this.options[a];a="title"===a?-3:l.verticalAlign?0:b+2;var e;c&&(this.styledMode||(e=l.style.fontSize),e=f.fontMetrics(e,c).b,c.css({width:(l.width||d.width+l.widthAdjust)+"px"}).align(m({y:a+e},l),!1,"spacingBox"),l.floating||l.verticalAlign||(b=Math.ceil(b+c.getBBox(l.useHTML).height)))},this);c=this.titleOffset!==b;this.titleOffset=b;!this.isDirtyBox&&
c&&(this.isDirtyBox=this.isDirtyLegend=c,this.hasRendered&&D(a,!0)&&this.isDirtyBox&&this.redraw())},getChartSize:function(){var b=this.options.chart,c=b.width,b=b.height,f=this.renderTo;d(c)||(this.containerWidth=a.getStyle(f,"width"));d(b)||(this.containerHeight=a.getStyle(f,"height"));this.chartWidth=Math.max(0,c||this.containerWidth||600);this.chartHeight=Math.max(0,a.relativeLength(b,this.chartWidth)||(1<this.containerHeight?this.containerHeight:400))},temporaryDisplay:function(b){var c=this.renderTo;
if(b)for(;c&&c.style;)c.hcOrigStyle&&(a.css(c,c.hcOrigStyle),delete c.hcOrigStyle),c.hcOrigDetached&&(e.body.removeChild(c),c.hcOrigDetached=!1),c=c.parentNode;else for(;c&&c.style;){e.body.contains(c)||c.parentNode||(c.hcOrigDetached=!0,e.body.appendChild(c));if("none"===a.getStyle(c,"display",!1)||c.hcOricDetached)c.hcOrigStyle={display:c.style.display,height:c.style.height,overflow:c.style.overflow},b={display:"block",overflow:"hidden"},c!==this.renderTo&&(b.height=0),a.css(c,b),c.offsetWidth||
c.style.setProperty("display","block","important");c=c.parentNode;if(c===e.body)break}},setClassName:function(a){this.container.className="highcharts-container "+(a||"")},getContainer:function(){var b,c=this.options,f=c.chart,d,l;b=this.renderTo;var r=a.uniqueKey(),D,z;b||(this.renderTo=b=f.renderTo);x(b)&&(this.renderTo=b=e.getElementById(b));b||a.error(13,!0,this);d=A(h(b,"data-highcharts-chart"));p(d)&&n[d]&&n[d].hasRendered&&n[d].destroy();h(b,"data-highcharts-chart",this.index);b.innerHTML="";
f.skipClone||b.offsetWidth||this.temporaryDisplay();this.getChartSize();d=this.chartWidth;l=this.chartHeight;g(b,{overflow:"hidden"});this.styledMode||(D=m({position:"relative",overflow:"hidden",width:d+"px",height:l+"px",textAlign:"left",lineHeight:"normal",zIndex:0,"-webkit-tap-highlight-color":"rgba(0,0,0,0)"},f.style));this.container=b=t("div",{id:r},D,b);this._cursor=b.style.cursor;this.renderer=new (a[f.renderer]||a.Renderer)(b,d,l,null,f.forExport,c.exporting&&c.exporting.allowHTML,this.styledMode);
this.setClassName(f.className);if(this.styledMode)for(z in c.defs)this.renderer.definition(c.defs[z]);else this.renderer.setStyle(f.style);this.renderer.chartIndex=this.index;k(this,"afterGetContainer")},getMargins:function(a){var b=this.spacing,c=this.margin,f=this.titleOffset;this.resetMargins();f&&!d(c[0])&&(this.plotTop=Math.max(this.plotTop,f+this.options.title.margin+b[0]));this.legend&&this.legend.display&&this.legend.adjustMargins(c,b);k(this,"getMargins");a||this.getAxisMargins()},getAxisMargins:function(){var a=
this,b=a.axisOffset=[0,0,0,0],c=a.margin;a.hasCartesianSeries&&a.axes.forEach(function(a){a.visible&&a.getOffset()});w.forEach(function(f,l){d(c[l])||(a[f]+=b[l])});a.setChartSize()},reflow:function(b){var c=this,f=c.options.chart,l=c.renderTo,g=d(f.width)&&d(f.height),k=f.width||a.getStyle(l,"width"),f=f.height||a.getStyle(l,"height"),l=b?b.target:Q;if(!g&&!c.isPrinting&&k&&f&&(l===Q||l===e)){if(k!==c.containerWidth||f!==c.containerHeight)a.clearTimeout(c.reflowTimeout),c.reflowTimeout=r(function(){c.container&&
c.setSize(void 0,void 0,!1)},b?100:0);c.containerWidth=k;c.containerHeight=f}},setReflow:function(a){var b=this;!1===a||this.unbindReflow?!1===a&&this.unbindReflow&&(this.unbindReflow=this.unbindReflow()):(this.unbindReflow=E(Q,"resize",function(a){b.reflow(a)}),E(this,"destroy",this.unbindReflow))},setSize:function(b,c,f){var d=this,l=d.renderer,e;d.isResizing+=1;a.setAnimation(f,d);d.oldChartHeight=d.chartHeight;d.oldChartWidth=d.chartWidth;void 0!==b&&(d.options.chart.width=b);void 0!==c&&(d.options.chart.height=
c);d.getChartSize();d.styledMode||(e=l.globalAnimation,(e?H:g)(d.container,{width:d.chartWidth+"px",height:d.chartHeight+"px"},e));d.setChartSize(!0);l.setSize(d.chartWidth,d.chartHeight,f);d.axes.forEach(function(a){a.isDirty=!0;a.setScale()});d.isDirtyLegend=!0;d.isDirtyBox=!0;d.layOutTitles();d.getMargins();d.redraw(f);d.oldChartHeight=null;k(d,"resize");r(function(){d&&k(d,"endResize",null,function(){--d.isResizing})},B(e).duration)},setChartSize:function(a){var b=this.inverted,c=this.renderer,
f=this.chartWidth,d=this.chartHeight,l=this.options.chart,e=this.spacing,g=this.clipOffset,m,A,p,r;this.plotLeft=m=Math.round(this.plotLeft);this.plotTop=A=Math.round(this.plotTop);this.plotWidth=p=Math.max(0,Math.round(f-m-this.marginRight));this.plotHeight=r=Math.max(0,Math.round(d-A-this.marginBottom));this.plotSizeX=b?r:p;this.plotSizeY=b?p:r;this.plotBorderWidth=l.plotBorderWidth||0;this.spacingBox=c.spacingBox={x:e[3],y:e[0],width:f-e[3]-e[1],height:d-e[0]-e[2]};this.plotBox=c.plotBox={x:m,
y:A,width:p,height:r};f=2*Math.floor(this.plotBorderWidth/2);b=Math.ceil(Math.max(f,g[3])/2);c=Math.ceil(Math.max(f,g[0])/2);this.clipBox={x:b,y:c,width:Math.floor(this.plotSizeX-Math.max(f,g[1])/2-b),height:Math.max(0,Math.floor(this.plotSizeY-Math.max(f,g[2])/2-c))};a||this.axes.forEach(function(a){a.setAxisSize();a.setAxisTranslation()});k(this,"afterSetChartSize",{skipAxes:a})},resetMargins:function(){k(this,"resetMargins");var a=this,b=a.options.chart;["margin","spacing"].forEach(function(f){var d=
b[f],l=c(d)?d:[d,d,d,d];["Top","Right","Bottom","Left"].forEach(function(c,d){a[f][d]=D(b[f+c],l[d])})});w.forEach(function(b,c){a[b]=D(a.margin[c],a.spacing[c])});a.axisOffset=[0,0,0,0];a.clipOffset=[0,0,0,0]},drawChartBox:function(){var a=this.options.chart,b=this.renderer,c=this.chartWidth,f=this.chartHeight,d=this.chartBackground,l=this.plotBackground,e=this.plotBorder,g,m=this.styledMode,A=this.plotBGImage,p=a.backgroundColor,r=a.plotBackgroundColor,h=a.plotBackgroundImage,D,z=this.plotLeft,
n=this.plotTop,x=this.plotWidth,w=this.plotHeight,C=this.plotBox,I=this.clipRect,q=this.clipBox,t="animate";d||(this.chartBackground=d=b.rect().addClass("highcharts-background").add(),t="attr");if(m)g=D=d.strokeWidth();else{g=a.borderWidth||0;D=g+(a.shadow?8:0);p={fill:p||"none"};if(g||d["stroke-width"])p.stroke=a.borderColor,p["stroke-width"]=g;d.attr(p).shadow(a.shadow)}d[t]({x:D/2,y:D/2,width:c-D-g%2,height:f-D-g%2,r:a.borderRadius});t="animate";l||(t="attr",this.plotBackground=l=b.rect().addClass("highcharts-plot-background").add());
l[t](C);m||(l.attr({fill:r||"none"}).shadow(a.plotShadow),h&&(A?A.animate(C):this.plotBGImage=b.image(h,z,n,x,w).add()));I?I.animate({width:q.width,height:q.height}):this.clipRect=b.clipRect(q);t="animate";e||(t="attr",this.plotBorder=e=b.rect().addClass("highcharts-plot-border").attr({zIndex:1}).add());m||e.attr({stroke:a.plotBorderColor,"stroke-width":a.plotBorderWidth||0,fill:"none"});e[t](e.crisp({x:z,y:n,width:x,height:w},-e.strokeWidth()));this.isDirtyBox=!1;k(this,"afterDrawChartBox")},propFromSeries:function(){var a=
this,b=a.options.chart,c,f=a.options.series,d,l;["inverted","angular","polar"].forEach(function(e){c=I[b.type||b.defaultSeriesType];l=b[e]||c&&c.prototype[e];for(d=f&&f.length;!l&&d--;)(c=I[f[d].type])&&c.prototype[e]&&(l=!0);a[e]=l})},linkSeries:function(){var a=this,b=a.series;b.forEach(function(a){a.linkedSeries.length=0});b.forEach(function(b){var c=b.options.linkedTo;x(c)&&(c=":previous"===c?a.series[b.index-1]:a.get(c))&&c.linkedParent!==b&&(c.linkedSeries.push(b),b.linkedParent=c,b.visible=
D(b.options.visible,c.options.visible,b.visible))});k(this,"afterLinkSeries")},renderSeries:function(){this.series.forEach(function(a){a.translate();a.render()})},renderLabels:function(){var a=this,b=a.options.labels;b.items&&b.items.forEach(function(c){var f=m(b.style,c.style),d=A(f.left)+a.plotLeft,l=A(f.top)+a.plotTop+12;delete f.left;delete f.top;a.renderer.text(c.html,d,l).attr({zIndex:2}).css(f).add()})},render:function(){var a=this.axes,b=this.renderer,c=this.options,f=0,d,l,e;this.setTitle();
this.legend=new K(this,c.legend);this.getStacks&&this.getStacks();this.getMargins(!0);this.setChartSize();c=this.plotWidth;a.some(function(a){if(a.horiz&&a.visible&&a.options.labels.enabled&&a.series.length)return f=21,!0});d=this.plotHeight=Math.max(this.plotHeight-f,0);a.forEach(function(a){a.setScale()});this.getAxisMargins();l=1.1<c/this.plotWidth;e=1.05<d/this.plotHeight;if(l||e)a.forEach(function(a){(a.horiz&&l||!a.horiz&&e)&&a.setTickInterval(!0)}),this.getMargins();this.drawChartBox();this.hasCartesianSeries&&
a.forEach(function(a){a.visible&&a.render()});this.seriesGroup||(this.seriesGroup=b.g("series-group").attr({zIndex:3}).add());this.renderSeries();this.renderLabels();this.addCredits();this.setResponsive&&this.setResponsive();this.hasRendered=!0},addCredits:function(a){var b=this;a=F(!0,this.options.credits,a);a.enabled&&!this.credits&&(this.credits=this.renderer.text(a.text+(this.mapCredits||""),0,0).addClass("highcharts-credits").on("click",function(){a.href&&(Q.location.href=a.href)}).attr({align:a.position.align,
zIndex:8}),b.styledMode||this.credits.css(a.style),this.credits.add().align(a.position),this.credits.update=function(a){b.credits=b.credits.destroy();b.addCredits(a)})},destroy:function(){var b=this,c=b.axes,f=b.series,d=b.container,l,e=d&&d.parentNode;k(b,"destroy");b.renderer.forExport?a.erase(n,b):n[b.index]=void 0;a.chartCount--;b.renderTo.removeAttribute("data-highcharts-chart");z(b);for(l=c.length;l--;)c[l]=c[l].destroy();this.scroller&&this.scroller.destroy&&this.scroller.destroy();for(l=f.length;l--;)f[l]=
f[l].destroy();"title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function(a){var c=b[a];c&&c.destroy&&(b[a]=c.destroy())});d&&(d.innerHTML="",z(d),e&&v(d));C(b,function(a,c){delete b[c]})},firstRender:function(){var b=this,c=b.options;if(!b.isReadyToRender||b.isReadyToRender()){b.getContainer();b.resetMargins();b.setChartSize();b.propFromSeries();b.getAxes();(a.isArray(c.series)?
c.series:[]).forEach(function(a){b.initSeries(a)});b.linkSeries();k(b,"beforeRender");l&&(b.pointer=new l(b,c));b.render();if(!b.renderer.imgCount&&b.onload)b.onload();b.temporaryDisplay(!0)}},onload:function(){this.callbacks.concat([this.callback]).forEach(function(a){a&&void 0!==this.index&&a.apply(this,[this])},this);k(this,"load");k(this,"render");d(this.index)&&this.setReflow(this.options.chart.reflow);this.onload=null}})});J(G,"parts/ScrollablePlotArea.js",[G["parts/Globals.js"]],function(a){var E=
a.addEvent,H=a.Chart;E(H,"afterSetChartSize",function(B){var h=this.options.chart.scrollablePlotArea,e=h&&h.minWidth,h=h&&h.minHeight,q;if(!this.renderer.forExport){if(e){if(this.scrollablePixelsX=e=Math.max(0,e-this.chartWidth))this.plotWidth+=e,this.inverted?this.clipBox.height+=e:this.clipBox.width+=e,q={1:{name:"right",value:e}}}else h&&(this.scrollablePixelsY=e=Math.max(0,h-this.chartHeight))&&(this.plotHeight+=e,this.inverted?this.clipBox.width+=e:this.clipBox.height+=e,q={2:{name:"bottom",
value:e}});q&&!B.skipAxes&&this.axes.forEach(function(e){q[e.side]?e.getPlotLinePath=function(){var h=q[e.side].name,t=this[h],n;this[h]=t-q[e.side].value;n=a.Axis.prototype.getPlotLinePath.apply(this,arguments);this[h]=t;return n}:(e.setAxisSize(),e.setAxisTranslation())})}});E(H,"render",function(){this.scrollablePixelsX||this.scrollablePixelsY?(this.setUpScrolling&&this.setUpScrolling(),this.applyFixed()):this.fixedDiv&&this.applyFixed()});H.prototype.setUpScrolling=function(){var B={WebkitOverflowScrolling:"touch",
overflowX:"hidden",overflowY:"hidden"};this.scrollablePixelsX&&(B.overflowX="auto");this.scrollablePixelsY&&(B.overflowY="auto");this.scrollingContainer=a.createElement("div",{className:"highcharts-scrolling"},B,this.renderTo);this.innerContainer=a.createElement("div",{className:"highcharts-inner-container"},null,this.scrollingContainer);this.innerContainer.appendChild(this.container);this.setUpScrolling=null};H.prototype.moveFixedElements=function(){var a=this.container,h=this.fixedRenderer,e=".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-reset-zoom .highcharts-subtitle .highcharts-title .highcharts-legend-checkbox".split(" "),
q;this.scrollablePixelsX&&!this.inverted?q=".highcharts-yaxis":this.scrollablePixelsX&&this.inverted?q=".highcharts-xaxis":this.scrollablePixelsY&&!this.inverted?q=".highcharts-xaxis":this.scrollablePixelsY&&this.inverted&&(q=".highcharts-yaxis");e.push(q,q+"-labels");e.forEach(function(e){[].forEach.call(a.querySelectorAll(e),function(a){(a.namespaceURI===h.SVG_NS?h.box:h.box.parentNode).appendChild(a);a.style.pointerEvents="auto"})})};H.prototype.applyFixed=function(){var B,h,e=!this.fixedDiv,q=
this.options.chart.scrollablePlotArea;e?(this.fixedDiv=a.createElement("div",{className:"highcharts-fixed"},{position:"absolute",overflow:"hidden",pointerEvents:"none",zIndex:2},null,!0),this.renderTo.insertBefore(this.fixedDiv,this.renderTo.firstChild),this.renderTo.style.overflow="visible",this.fixedRenderer=B=new a.Renderer(this.fixedDiv,this.chartWidth,this.chartHeight),this.scrollableMask=B.path().attr({fill:a.color(this.options.chart.backgroundColor||"#fff").setOpacity(a.pick(q.opacity,.85)).get(),
zIndex:-1}).addClass("highcharts-scrollable-mask").add(),this.moveFixedElements(),E(this,"afterShowResetZoom",this.moveFixedElements)):this.fixedRenderer.setSize(this.chartWidth,this.chartHeight);B=this.chartWidth+(this.scrollablePixelsX||0);h=this.chartHeight+(this.scrollablePixelsY||0);a.stop(this.container);this.container.style.width=B+"px";this.container.style.height=h+"px";this.renderer.boxWrapper.attr({width:B,height:h,viewBox:[0,0,B,h].join(" ")});this.chartBackground.attr({width:B,height:h});
this.scrollablePixelsY&&(this.scrollingContainer.style.height=this.chartHeight+"px");e&&(q.scrollPositionX&&(this.scrollingContainer.scrollLeft=this.scrollablePixelsX*q.scrollPositionX),q.scrollPositionY&&(this.scrollingContainer.scrollTop=this.scrollablePixelsY*q.scrollPositionY));h=this.axisOffset;e=this.plotTop-h[0]-1;q=this.plotLeft-h[3]-1;B=this.plotTop+this.plotHeight+h[2]+1;h=this.plotLeft+this.plotWidth+h[1]+1;var t=this.plotLeft+this.plotWidth-(this.scrollablePixelsX||0),u=this.plotTop+this.plotHeight-
(this.scrollablePixelsY||0),e=this.scrollablePixelsX?["M",0,e,"L",this.plotLeft-1,e,"L",this.plotLeft-1,B,"L",0,B,"Z","M",t,e,"L",this.chartWidth,e,"L",this.chartWidth,B,"L",t,B,"Z"]:this.scrollablePixelsY?["M",q,0,"L",q,this.plotTop-1,"L",h,this.plotTop-1,"L",h,0,"Z","M",q,u,"L",q,this.chartHeight,"L",h,this.chartHeight,"L",h,u,"Z"]:["M",0,0];"adjustHeight"!==this.redrawTrigger&&this.scrollableMask.attr({d:e})}});J(G,"parts/Point.js",[G["parts/Globals.js"]],function(a){var E,H=a.extend,B=a.erase,
h=a.fireEvent,e=a.format,q=a.isArray,t=a.isNumber,u=a.pick,v=a.uniqueKey,n=a.defined,g=a.removeEvent;a.Point=E=function(){};a.Point.prototype={init:function(a,e,b){this.series=a;this.applyOptions(e,b);this.id=n(this.id)?this.id:v();this.resolveColor();a.chart.pointCount++;h(this,"afterInit");return this},resolveColor:function(){var a=this.series,e;e=a.chart.options.chart.colorCount;var b=a.chart.styledMode;b||this.options.color||(this.color=a.color);a.options.colorByPoint?(b||(e=a.options.colors||
a.chart.options.colors,this.color=this.color||e[a.colorCounter],e=e.length),b=a.colorCounter,a.colorCounter++,a.colorCounter===e&&(a.colorCounter=0)):b=a.colorIndex;this.colorIndex=u(this.colorIndex,b)},applyOptions:function(a,e){var b=this.series,d=b.options.pointValKey||b.pointValKey;a=E.prototype.optionsToObject.call(this,a);H(this,a);this.options=this.options?H(this.options,a):a;a.group&&delete this.group;a.dataLabels&&delete this.dataLabels;d&&(this.y=this[d]);if(this.isNull=u(this.isValid&&
!this.isValid(),null===this.x||!t(this.y,!0)))this.formatPrefix="null";this.selected&&(this.state="select");"name"in this&&void 0===e&&b.xAxis&&b.xAxis.hasNames&&(this.x=b.xAxis.nameToX(this));void 0===this.x&&b&&(this.x=void 0===e?b.autoIncrement(this):e);return this},setNestedProperty:function(d,e,b){b.split(".").reduce(function(b,d,c,g){b[d]=g.length-1===c?e:a.isObject(b[d],!0)?b[d]:{};return b[d]},d);return d},optionsToObject:function(d){var e={},b=this.series,g=b.options.keys,p=g||b.pointArrayMap||
["y"],c=p.length,h=0,n=0;if(t(d)||null===d)e[p[0]]=d;else if(q(d))for(!g&&d.length>c&&(b=typeof d[0],"string"===b?e.name=d[0]:"number"===b&&(e.x=d[0]),h++);n<c;)g&&void 0===d[h]||(0<p[n].indexOf(".")?a.Point.prototype.setNestedProperty(e,d[h],p[n]):e[p[n]]=d[h]),h++,n++;else"object"===typeof d&&(e=d,d.dataLabels&&(b._hasPointLabels=!0),d.marker&&(b._hasPointMarkers=!0));return e},getClassName:function(){return"highcharts-point"+(this.selected?" highcharts-point-select":"")+(this.negative?" highcharts-negative":
"")+(this.isNull?" highcharts-null-point":"")+(void 0!==this.colorIndex?" highcharts-color-"+this.colorIndex:"")+(this.options.className?" "+this.options.className:"")+(this.zone&&this.zone.className?" "+this.zone.className.replace("highcharts-negative",""):"")},getZone:function(){var a=this.series,e=a.zones,a=a.zoneAxis||"y",b=0,g;for(g=e[b];this[a]>=g.value;)g=e[++b];this.nonZonedColor||(this.nonZonedColor=this.color);this.color=g&&g.color&&!this.options.color?g.color:this.nonZonedColor;return g},
destroy:function(){var a=this.series.chart,e=a.hoverPoints,b;a.pointCount--;e&&(this.setState(),B(e,this),e.length||(a.hoverPoints=null));if(this===a.hoverPoint)this.onMouseOut();if(this.graphic||this.dataLabel||this.dataLabels)g(this),this.destroyElements();this.legendItem&&a.legend.destroyItem(this);for(b in this)this[b]=null},destroyElements:function(a){var d=this,b=[],e,g;a=a||{graphic:1,dataLabel:1};a.graphic&&b.push("graphic","shadowGroup");a.dataLabel&&b.push("dataLabel","dataLabelUpper","connector");
for(g=b.length;g--;)e=b[g],d[e]&&(d[e]=d[e].destroy());["dataLabel","connector"].forEach(function(b){var c=b+"s";a[b]&&d[c]&&(d[c].forEach(function(a){a.element&&a.destroy()}),delete d[c])})},getLabelConfig:function(){return{x:this.category,y:this.y,color:this.color,colorIndex:this.colorIndex,key:this.name||this.category,series:this.series,point:this,percentage:this.percentage,total:this.total||this.stackTotal}},tooltipFormatter:function(a){var d=this.series,b=d.tooltipOptions,g=u(b.valueDecimals,
""),p=b.valuePrefix||"",c=b.valueSuffix||"";d.chart.styledMode&&(a=d.chart.tooltip.styledModeFormat(a));(d.pointArrayMap||["y"]).forEach(function(b){b="{point."+b;if(p||c)a=a.replace(RegExp(b+"}","g"),p+b+"}"+c);a=a.replace(RegExp(b+"}","g"),b+":,."+g+"f}")});return e(a,{point:this,series:this.series},d.chart.time)},firePointEvent:function(a,e,b){var d=this,g=this.series.options;(g.point.events[a]||d.options&&d.options.events&&d.options.events[a])&&this.importEvents();"click"===a&&g.allowPointSelect&&
(b=function(a){d.select&&d.select(null,a.ctrlKey||a.metaKey||a.shiftKey)});h(this,a,e,b)},visible:!0}});J(G,"parts/Series.js",[G["parts/Globals.js"]],function(a){var E=a.addEvent,H=a.animObject,B=a.arrayMax,h=a.arrayMin,e=a.correctFloat,q=a.defaultOptions,t=a.defaultPlotOptions,u=a.defined,v=a.erase,n=a.extend,g=a.fireEvent,d=a.isArray,m=a.isNumber,b=a.isString,k=a.merge,p=a.objectEach,c=a.pick,x=a.removeEvent,K=a.splat,w=a.SVGElement,F=a.syncTimeout,C=a.win;a.Series=a.seriesType("line",null,{lineWidth:2,
allowPointSelect:!1,showCheckbox:!1,animation:{duration:1E3},events:{},marker:{lineWidth:0,lineColor:"#ffffff",enabledThreshold:2,radius:4,states:{normal:{animation:!0},hover:{animation:{duration:50},enabled:!0,radiusPlus:2,lineWidthPlus:1},select:{fillColor:"#cccccc",lineColor:"#000000",lineWidth:2}}},point:{events:{}},dataLabels:{align:"center",formatter:function(){return null===this.y?"":a.numberFormat(this.y,-1)},padding:5,style:{fontSize:"11px",fontWeight:"bold",color:"contrast",textOutline:"1px contrast"},
verticalAlign:"bottom",x:0,y:0},cropThreshold:300,opacity:1,pointRange:0,softThreshold:!0,states:{normal:{animation:!0},hover:{animation:{duration:50},lineWidthPlus:1,marker:{},halo:{size:10,opacity:.25}},select:{animation:{duration:0}},inactive:{animation:{duration:50},opacity:.2}},stickyTracking:!0,turboThreshold:1E3,findNearestPointBy:"x"},{isCartesian:!0,pointClass:a.Point,sorted:!0,requireSorting:!0,directTouch:!1,axisTypes:["xAxis","yAxis"],colorCounter:0,parallelArrays:["x","y"],coll:"series",
cropShoulder:1,init:function(b,d){g(this,"init",{options:d});var e=this,l,k=b.series,f;e.chart=b;e.options=d=e.setOptions(d);e.linkedSeries=[];e.bindAxes();n(e,{name:d.name,state:"",visible:!1!==d.visible,selected:!0===d.selected});l=d.events;p(l,function(b,c){!a.isFunction(b)||e.hcEvents&&e.hcEvents[c]&&e.hcEvents[c].some(function(a){return a.fn===b})||E(e,c,b)});if(l&&l.click||d.point&&d.point.events&&d.point.events.click||d.allowPointSelect)b.runTrackerClick=!0;e.getColor();e.getSymbol();e.parallelArrays.forEach(function(a){e[a+
"Data"]||(e[a+"Data"]=[])});e.points||e.setData(d.data,!1);e.isCartesian&&(b.hasCartesianSeries=!0);k.length&&(f=k[k.length-1]);e._i=c(f&&f._i,-1)+1;b.orderSeries(this.insert(k));g(this,"afterInit")},insert:function(a){var b=this.options.index,d;if(m(b)){for(d=a.length;d--;)if(b>=c(a[d].options.index,a[d]._i)){a.splice(d+1,0,this);break}-1===d&&a.unshift(this);d+=1}else a.push(this);return c(d,a.length-1)},bindAxes:function(){var b=this,c=b.options,d=b.chart,e;g(this,"bindAxes",null,function(){(b.axisTypes||
[]).forEach(function(l){d[l].forEach(function(a){e=a.options;if(c[l]===e.index||void 0!==c[l]&&c[l]===e.id||void 0===c[l]&&0===e.index)b.insert(a.series),b[l]=a,a.isDirty=!0});b[l]||b.optionalAxis===l||a.error(18,!0,d)})})},updateParallelArrays:function(a,b){var c=a.series,d=arguments,e=m(b)?function(f){var d="y"===f&&c.toYData?c.toYData(a):a[f];c[f+"Data"][b]=d}:function(a){Array.prototype[b].apply(c[a+"Data"],Array.prototype.slice.call(d,2))};c.parallelArrays.forEach(e)},hasData:function(){return this.visible&&
void 0!==this.dataMax&&void 0!==this.dataMin||this.visible&&this.yData&&0<this.yData.length},autoIncrement:function(){var a=this.options,b=this.xIncrement,d,e=a.pointIntervalUnit,g=this.chart.time,b=c(b,a.pointStart,0);this.pointInterval=d=c(this.pointInterval,a.pointInterval,1);e&&(a=new g.Date(b),"day"===e?g.set("Date",a,g.get("Date",a)+d):"month"===e?g.set("Month",a,g.get("Month",a)+d):"year"===e&&g.set("FullYear",a,g.get("FullYear",a)+d),d=a.getTime()-b);this.xIncrement=b+d;return b},setOptions:function(a){var b=
this.chart,d=b.options,e=d.plotOptions,l=b.userOptions||{};a=k(a);var b=b.styledMode,f={plotOptions:e,userOptions:a};g(this,"setOptions",f);var m=l.plotOptions||{},p=f.plotOptions[this.type];this.userOptions=f.userOptions;l=k(p,e.series,l.plotOptions&&l.plotOptions[this.type],a);this.tooltipOptions=k(q.tooltip,q.plotOptions.series&&q.plotOptions.series.tooltip,q.plotOptions[this.type].tooltip,d.tooltip.userOptions,e.series&&e.series.tooltip,e[this.type].tooltip,a.tooltip);this.stickyTracking=c(a.stickyTracking,
m[this.type]&&m[this.type].stickyTracking,m.series&&m.series.stickyTracking,this.tooltipOptions.shared&&!this.noSharedTooltip?!0:l.stickyTracking);null===p.marker&&delete l.marker;this.zoneAxis=l.zoneAxis;d=this.zones=(l.zones||[]).slice();!l.negativeColor&&!l.negativeFillColor||l.zones||(e={value:l[this.zoneAxis+"Threshold"]||l.threshold||0,className:"highcharts-negative"},b||(e.color=l.negativeColor,e.fillColor=l.negativeFillColor),d.push(e));d.length&&u(d[d.length-1].value)&&d.push(b?{}:{color:this.color,
fillColor:this.fillColor});g(this,"afterSetOptions",{options:l});return l},getName:function(){return c(this.options.name,"Series "+(this.index+1))},getCyclic:function(a,b,d){var e,l=this.chart,f=this.userOptions,g=a+"Index",k=a+"Counter",m=d?d.length:c(l.options.chart[a+"Count"],l[a+"Count"]);b||(e=c(f[g],f["_"+g]),u(e)||(l.series.length||(l[k]=0),f["_"+g]=e=l[k]%m,l[k]+=1),d&&(b=d[e]));void 0!==e&&(this[g]=e);this[a]=b},getColor:function(){this.chart.styledMode?this.getCyclic("color"):this.options.colorByPoint?
this.options.color=null:this.getCyclic("color",this.options.color||t[this.type].color,this.chart.options.colors)},getSymbol:function(){this.getCyclic("symbol",this.options.marker.symbol,this.chart.options.symbols)},findPointIndex:function(a,b){var c=a.id;a=a.x;var d=this.points,e,f;c&&(f=(c=this.chart.get(c))&&c.index,void 0!==f&&(e=!0));void 0===f&&m(a)&&(f=this.xData.indexOf(a,b));-1!==f&&void 0!==f&&this.cropped&&(f=f>=this.cropStart?f-this.cropStart:f);!e&&d[f]&&d[f].touched&&(f=void 0);return f},
drawLegendSymbol:a.LegendSymbolMixin.drawLineMarker,updateData:function(b){var c=this.options,d=this.points,e=[],l,f,g,k=this.requireSorting,p=b.length===d.length,h=!0;this.xIncrement=null;b.forEach(function(b,f){var h,A=a.defined(b)&&this.pointClass.prototype.optionsToObject.call({series:this},b)||{};h=A.x;if(A.id||m(h))if(h=this.findPointIndex(A,g),-1===h||void 0===h?e.push(b):d[h]&&b!==c.data[h]?(d[h].update(b,!1,null,!1),d[h].touched=!0,k&&(g=h+1)):d[h]&&(d[h].touched=!0),!p||f!==h||this.hasDerivedData)l=
!0},this);if(l)for(b=d.length;b--;)(f=d[b])&&!f.touched&&f.remove(!1);else p?b.forEach(function(a,b){d[b].update&&a!==d[b].y&&d[b].update(a,!1,null,!1)}):h=!1;d.forEach(function(a){a&&(a.touched=!1)});if(!h)return!1;e.forEach(function(a){this.addPoint(a,!1,null,null,!1)},this);return!0},setData:function(e,g,k,p){var l=this,f=l.points,h=f&&f.length||0,A,n=l.options,D=l.chart,z=null,x=l.xAxis,w=n.turboThreshold,C=this.xData,q=this.yData,t=(A=l.pointArrayMap)&&A.length,u=n.keys,F=0,v=1,K;e=e||[];A=e.length;
g=c(g,!0);!1!==p&&A&&h&&!l.cropped&&!l.hasGroupedData&&l.visible&&!l.isSeriesBoosting&&(K=this.updateData(e));if(!K){l.xIncrement=null;l.colorCounter=0;this.parallelArrays.forEach(function(a){l[a+"Data"].length=0});if(w&&A>w){for(k=0;null===z&&k<A;)z=e[k],k++;if(m(z))for(k=0;k<A;k++)C[k]=this.autoIncrement(),q[k]=e[k];else if(d(z))if(t)for(k=0;k<A;k++)z=e[k],C[k]=z[0],q[k]=z.slice(1,t+1);else for(u&&(F=u.indexOf("x"),v=u.indexOf("y"),F=0<=F?F:0,v=0<=v?v:1),k=0;k<A;k++)z=e[k],C[k]=z[F],q[k]=z[v];else a.error(12,
!1,D)}else for(k=0;k<A;k++)void 0!==e[k]&&(z={series:l},l.pointClass.prototype.applyOptions.apply(z,[e[k]]),l.updateParallelArrays(z,k));q&&b(q[0])&&a.error(14,!0,D);l.data=[];l.options.data=l.userOptions.data=e;for(k=h;k--;)f[k]&&f[k].destroy&&f[k].destroy();x&&(x.minRange=x.userMinRange);l.isDirty=D.isDirtyBox=!0;l.isDirtyData=!!f;k=!1}"point"===n.legendType&&(this.processData(),this.generatePoints());g&&D.redraw(k)},processData:function(b){var c=this.xData,d=this.yData,e=c.length,l;l=0;var f,g,
k=this.xAxis,m,p=this.options;m=p.cropThreshold;var h=this.getExtremesFromAll||p.getExtremesFromAll,n=this.isCartesian,p=k&&k.val2lin,x=k&&k.isLog,w=this.requireSorting,C,q;if(n&&!this.isDirty&&!k.isDirty&&!this.yAxis.isDirty&&!b)return!1;k&&(b=k.getExtremes(),C=b.min,q=b.max);n&&this.sorted&&!h&&(!m||e>m||this.forceCrop)&&(c[e-1]<C||c[0]>q?(c=[],d=[]):this.yData&&(c[0]<C||c[e-1]>q)&&(l=this.cropData(this.xData,this.yData,C,q),c=l.xData,d=l.yData,l=l.start,f=!0));for(m=c.length||1;--m;)e=x?p(c[m])-
p(c[m-1]):c[m]-c[m-1],0<e&&(void 0===g||e<g)?g=e:0>e&&w&&(a.error(15,!1,this.chart),w=!1);this.cropped=f;this.cropStart=l;this.processedXData=c;this.processedYData=d;this.closestPointRange=g},cropData:function(a,b,d,e,g){var f=a.length,l=0,k=f,m;g=c(g,this.cropShoulder);for(m=0;m<f;m++)if(a[m]>=d){l=Math.max(0,m-g);break}for(d=m;d<f;d++)if(a[d]>e){k=d+g;break}return{xData:a.slice(l,k),yData:b.slice(l,k),start:l,end:k}},generatePoints:function(){var a=this.options,b=a.data,c=this.data,d,e=this.processedXData,
f=this.processedYData,k=this.pointClass,m=e.length,p=this.cropStart||0,h,x=this.hasGroupedData,a=a.keys,w,C=[],q;c||x||(c=[],c.length=b.length,c=this.data=c);a&&x&&(this.options.keys=!1);for(q=0;q<m;q++)h=p+q,x?(w=(new k).init(this,[e[q]].concat(K(f[q]))),w.dataGroup=this.groupMap[q],w.dataGroup.options&&(w.options=w.dataGroup.options,n(w,w.dataGroup.options),delete w.dataLabels)):(w=c[h])||void 0===b[h]||(c[h]=w=(new k).init(this,b[h],e[q])),w&&(w.index=h,C[q]=w);this.options.keys=a;if(c&&(m!==(d=
c.length)||x))for(q=0;q<d;q++)q!==p||x||(q+=m),c[q]&&(c[q].destroyElements(),c[q].plotX=void 0);this.data=c;this.points=C;g(this,"afterGeneratePoints")},getXExtremes:function(a){return{min:h(a),max:B(a)}},getExtremes:function(a){var b=this.yAxis,c=this.processedXData,e,l=[],f=0;e=this.xAxis.getExtremes();var k=e.min,p=e.max,n,w,x=this.requireSorting?this.cropShoulder:0,q,C;a=a||this.stackedYData||this.processedYData||[];e=a.length;for(C=0;C<e;C++)if(w=c[C],q=a[C],n=(m(q,!0)||d(q))&&(!b.positiveValuesOnly||
q.length||0<q),w=this.getExtremesFromAll||this.options.getExtremesFromAll||this.cropped||(c[C+x]||w)>=k&&(c[C-x]||w)<=p,n&&w)if(n=q.length)for(;n--;)"number"===typeof q[n]&&(l[f++]=q[n]);else l[f++]=q;this.dataMin=h(l);this.dataMax=B(l);g(this,"afterGetExtremes")},translate:function(){this.processedXData||this.processData();this.generatePoints();var a=this.options,b=a.stacking,k=this.xAxis,p=k.categories,h=this.yAxis,f=this.points,r=f.length,n=!!this.modifyValue,w,q=this.pointPlacementToXValue(),
C=m(q),x=a.threshold,t=a.startFromThreshold?x:0,F,v,K,B,E=this.zoneAxis||"y",H=Number.MAX_VALUE;for(w=0;w<r;w++){var G=f[w],J=G.x;v=G.y;var V=G.low,O=b&&h.stacks[(this.negStacks&&v<(t?0:x)?"-":"")+this.stackKey],W,X;h.positiveValuesOnly&&null!==v&&0>=v&&(G.isNull=!0);G.plotX=F=e(Math.min(Math.max(-1E5,k.translate(J,0,0,0,1,q,"flags"===this.type)),1E5));b&&this.visible&&!G.isNull&&O&&O[J]&&(B=this.getStackIndicator(B,J,this.index),W=O[J],X=W.points[B.key]);d(X)&&(V=X[0],v=X[1],V===t&&B.key===O[J].base&&
(V=c(m(x)&&x,h.min)),h.positiveValuesOnly&&0>=V&&(V=null),G.total=G.stackTotal=W.total,G.percentage=W.total&&G.y/W.total*100,G.stackY=v,W.setOffset(this.pointXOffset||0,this.barW||0));G.yBottom=u(V)?Math.min(Math.max(-1E5,h.translate(V,0,1,0,1)),1E5):null;n&&(v=this.modifyValue(v,G));G.plotY=v="number"===typeof v&&Infinity!==v?Math.min(Math.max(-1E5,h.translate(v,0,1,0,1)),1E5):void 0;G.isInside=void 0!==v&&0<=v&&v<=h.len&&0<=F&&F<=k.len;G.clientX=C?e(k.translate(J,0,0,0,1,q)):F;G.negative=G[E]<(a[E+
"Threshold"]||x||0);G.category=p&&void 0!==p[G.x]?p[G.x]:G.x;G.isNull||(void 0!==K&&(H=Math.min(H,Math.abs(F-K))),K=F);G.zone=this.zones.length&&G.getZone()}this.closestPointRangePx=H;g(this,"afterTranslate")},getValidPoints:function(a,b,c){var d=this.chart;return(a||this.points||[]).filter(function(a){return b&&!d.isInsidePlot(a.plotX,a.plotY,d.inverted)?!1:c||!a.isNull})},getClipBox:function(a,b){var c=this.options,d=this.chart,e=d.inverted,f=this.xAxis,l=f&&this.yAxis;a&&!1===c.clip&&l?a=e?{y:-d.chartWidth+
l.len+l.pos,height:d.chartWidth,width:d.chartHeight,x:-d.chartHeight+f.len+f.pos}:{y:-l.pos,height:d.chartHeight,width:d.chartWidth,x:-f.pos}:(a=this.clipBox||d.clipBox,b&&(a.width=d.plotSizeX,a.x=0));return b?{width:a.width,x:a.x}:a},setClip:function(a){var b=this.chart,c=this.options,d=b.renderer,e=b.inverted,f=this.clipBox,l=this.getClipBox(a),g=this.sharedClipKey||["_sharedClip",a&&a.duration,a&&a.easing,l.height,c.xAxis,c.yAxis].join(),k=b[g],m=b[g+"m"];k||(a&&(l.width=0,e&&(l.x=b.plotSizeX+
(!1!==c.clip?0:b.plotTop)),b[g+"m"]=m=d.clipRect(e?b.plotSizeX+99:-99,e?-b.plotLeft:-b.plotTop,99,e?b.chartWidth:b.chartHeight)),b[g]=k=d.clipRect(l),k.count={length:0});a&&!k.count[this.index]&&(k.count[this.index]=!0,k.count.length+=1);if(!1!==c.clip||a)this.group.clip(a||f?k:b.clipRect),this.markerGroup.clip(m),this.sharedClipKey=g;a||(k.count[this.index]&&(delete k.count[this.index],--k.count.length),0===k.count.length&&g&&b[g]&&(f||(b[g]=b[g].destroy()),b[g+"m"]&&(b[g+"m"]=b[g+"m"].destroy())))},
animate:function(a){var b=this.chart,c=H(this.options.animation),d,e;a?this.setClip(c):(d=this.sharedClipKey,a=b[d],e=this.getClipBox(c,!0),a&&a.animate(e,c),b[d+"m"]&&b[d+"m"].animate({width:e.width+99,x:e.x-(b.inverted?0:99)},c),this.animate=null)},afterAnimate:function(){this.setClip();g(this,"afterAnimate");this.finishedAnimating=!0},drawPoints:function(){var a=this.points,b=this.chart,d,e,g,f,k,m=this.options.marker,p,h,n,w=this[this.specialGroup]||this.markerGroup;d=this.xAxis;var q,x=c(m.enabled,
!d||d.isRadial?!0:null,this.closestPointRangePx>=m.enabledThreshold*m.radius);if(!1!==m.enabled||this._hasPointMarkers)for(d=0;d<a.length;d++)if(e=a[d],k=(f=e.graphic)?"animate":"attr",p=e.marker||{},h=!!e.marker,g=x&&void 0===p.enabled||p.enabled,n=!1!==e.isInside,g&&!e.isNull){g=c(p.symbol,this.symbol);q=this.markerAttribs(e,e.selected&&"select");f?f[n?"show":"hide"](!0).animate(q):n&&(0<q.width||e.hasImage)&&(e.graphic=f=b.renderer.symbol(g,q.x,q.y,q.width,q.height,h?p:m).add(w));if(f&&!b.styledMode)f[k](this.pointAttribs(e,
e.selected&&"select"));f&&f.addClass(e.getClassName(),!0)}else f&&(e.graphic=f.destroy())},markerAttribs:function(a,b){var d=this.options.marker,e=a.marker||{},l=e.symbol||d.symbol,f=c(e.radius,d.radius);b&&(d=d.states[b],b=e.states&&e.states[b],f=c(b&&b.radius,d&&d.radius,f+(d&&d.radiusPlus||0)));a.hasImage=l&&0===l.indexOf("url");a.hasImage&&(f=0);a={x:Math.floor(a.plotX)-f,y:a.plotY-f};f&&(a.width=a.height=2*f);return a},pointAttribs:function(a,b){var d=this.options.marker,e=a&&a.options,l=e&&
e.marker||{},f=this.color,g=e&&e.color,k=a&&a.color,e=c(l.lineWidth,d.lineWidth),m=a&&a.zone&&a.zone.color;a=1;f=g||m||k||f;g=l.fillColor||d.fillColor||f;f=l.lineColor||d.lineColor||f;b=b||"normal";d=d.states[b];b=l.states&&l.states[b]||{};e=c(b.lineWidth,d.lineWidth,e+c(b.lineWidthPlus,d.lineWidthPlus,0));g=b.fillColor||d.fillColor||g;f=b.lineColor||d.lineColor||f;a=c(b.opacity,d.opacity,a);return{stroke:f,"stroke-width":e,fill:g,opacity:a}},destroy:function(b){var c=this,d=c.chart,e=/AppleWebKit\/533/.test(C.navigator.userAgent),
l,f,k=c.data||[],m,h;g(c,"destroy");b||x(c);(c.axisTypes||[]).forEach(function(a){(h=c[a])&&h.series&&(v(h.series,c),h.isDirty=h.forceRedraw=!0)});c.legendItem&&c.chart.legend.destroyItem(c);for(f=k.length;f--;)(m=k[f])&&m.destroy&&m.destroy();c.points=null;a.clearTimeout(c.animationTimeout);p(c,function(a,b){a instanceof w&&!a.survive&&(l=e&&"group"===b?"hide":"destroy",a[l]())});d.hoverSeries===c&&(d.hoverSeries=null);v(d.series,c);d.orderSeries();p(c,function(a,d){b&&"hcEvents"===d||delete c[d]})},
getGraphPath:function(a,b,c){var d=this,e=d.options,f=e.step,l,g=[],k=[],m;a=a||d.points;(l=a.reversed)&&a.reverse();(f={right:1,center:2}[f]||f&&3)&&l&&(f=4-f);!e.connectNulls||b||c||(a=this.getValidPoints(a));a.forEach(function(l,p){var h=l.plotX,n=l.plotY,r=a[p-1];(l.leftCliff||r&&r.rightCliff)&&!c&&(m=!0);l.isNull&&!u(b)&&0<p?m=!e.connectNulls:l.isNull&&!b?m=!0:(0===p||m?p=["M",l.plotX,l.plotY]:d.getPointSpline?p=d.getPointSpline(a,l,p):f?(p=1===f?["L",r.plotX,n]:2===f?["L",(r.plotX+h)/2,r.plotY,
"L",(r.plotX+h)/2,n]:["L",h,r.plotY],p.push("L",h,n)):p=["L",h,n],k.push(l.x),f&&(k.push(l.x),2===f&&k.push(l.x)),g.push.apply(g,p),m=!1)});g.xMap=k;return d.graphPath=g},drawGraph:function(){var a=this,b=this.options,c=(this.gappedPath||this.getGraphPath).call(this),d=this.chart.styledMode,e=[["graph","highcharts-graph"]];d||e[0].push(b.lineColor||this.color||"#cccccc",b.dashStyle);e=a.getZonesGraphs(e);e.forEach(function(f,e){var l=f[0],g=a[l],k=g?"animate":"attr";g?(g.endX=a.preventGraphAnimation?
null:c.xMap,g.animate({d:c})):c.length&&(a[l]=g=a.chart.renderer.path(c).addClass(f[1]).attr({zIndex:1}).add(a.group));g&&!d&&(l={stroke:f[2],"stroke-width":b.lineWidth,fill:a.fillGraph&&a.color||"none"},f[3]?l.dashstyle=f[3]:"square"!==b.linecap&&(l["stroke-linecap"]=l["stroke-linejoin"]="round"),g[k](l).shadow(2>e&&b.shadow));g&&(g.startX=c.xMap,g.isArea=c.isArea)})},getZonesGraphs:function(a){this.zones.forEach(function(b,c){c=["zone-graph-"+c,"highcharts-graph highcharts-zone-graph-"+c+" "+(b.className||
"")];this.chart.styledMode||c.push(b.color||this.color,b.dashStyle||this.options.dashStyle);a.push(c)},this);return a},applyZones:function(){var a=this,b=this.chart,d=b.renderer,e=this.zones,g,f,k=this.clips||[],m,p=this.graph,h=this.area,n=Math.max(b.chartWidth,b.chartHeight),w=this[(this.zoneAxis||"y")+"Axis"],q,x,C=b.inverted,t,u,v,F,K=!1;e.length&&(p||h)&&w&&void 0!==w.min?(x=w.reversed,t=w.horiz,p&&!this.showLine&&p.hide(),h&&h.hide(),q=w.getExtremes(),e.forEach(function(e,l){g=x?t?b.plotWidth:
0:t?0:w.toPixels(q.min)||0;g=Math.min(Math.max(c(f,g),0),n);f=Math.min(Math.max(Math.round(w.toPixels(c(e.value,q.max),!0)||0),0),n);K&&(g=f=w.toPixels(q.max));u=Math.abs(g-f);v=Math.min(g,f);F=Math.max(g,f);w.isXAxis?(m={x:C?F:v,y:0,width:u,height:n},t||(m.x=b.plotHeight-m.x)):(m={x:0,y:C?F:v,width:n,height:u},t&&(m.y=b.plotWidth-m.y));C&&d.isVML&&(m=w.isXAxis?{x:0,y:x?v:F,height:m.width,width:b.chartWidth}:{x:m.y-b.plotLeft-b.spacingBox.x,y:0,width:m.height,height:b.chartHeight});k[l]?k[l].animate(m):
k[l]=d.clipRect(m);p&&a["zone-graph-"+l].clip(k[l]);h&&a["zone-area-"+l].clip(k[l]);K=e.value>q.max;a.resetZones&&0===f&&(f=void 0)}),this.clips=k):a.visible&&(p&&p.show(!0),h&&h.show(!0))},invertGroups:function(a){function b(){["group","markerGroup"].forEach(function(b){c[b]&&(d.renderer.isVML&&c[b].attr({width:c.yAxis.len,height:c.xAxis.len}),c[b].width=c.yAxis.len,c[b].height=c.xAxis.len,c[b].invert(a))})}var c=this,d=c.chart,e;c.xAxis&&(e=E(d,"resize",b),E(c,"destroy",e),b(a),c.invertGroups=b)},
plotGroup:function(a,b,c,d,e){var f=this[a],l=!f;l&&(this[a]=f=this.chart.renderer.g().attr({zIndex:d||.1}).add(e));f.addClass("highcharts-"+b+" highcharts-series-"+this.index+" highcharts-"+this.type+"-series "+(u(this.colorIndex)?"highcharts-color-"+this.colorIndex+" ":"")+(this.options.className||"")+(f.hasClass("highcharts-tracker")?" highcharts-tracker":""),!0);f.attr({visibility:c})[l?"attr":"animate"](this.getPlotBox());return f},getPlotBox:function(){var a=this.chart,b=this.xAxis,c=this.yAxis;
a.inverted&&(b=c,c=this.xAxis);return{translateX:b?b.left:a.plotLeft,translateY:c?c.top:a.plotTop,scaleX:1,scaleY:1}},render:function(){var a=this,b=a.chart,c,d=a.options,e=!!a.animate&&b.renderer.isSVG&&H(d.animation).duration,f=a.visible?"inherit":"hidden",k=d.zIndex,m=a.hasRendered,p=b.seriesGroup,h=b.inverted;g(this,"render");c=a.plotGroup("group","series",f,k,p);a.markerGroup=a.plotGroup("markerGroup","markers",f,k,p);e&&a.animate(!0);c.inverted=a.isCartesian||a.invertable?h:!1;a.drawGraph&&
(a.drawGraph(),a.applyZones());a.visible&&a.drawPoints();a.drawDataLabels&&a.drawDataLabels();a.redrawPoints&&a.redrawPoints();a.drawTracker&&!1!==a.options.enableMouseTracking&&a.drawTracker();a.invertGroups(h);!1===d.clip||a.sharedClipKey||m||c.clip(b.clipRect);e&&a.animate();m||(a.animationTimeout=F(function(){a.afterAnimate()},e));a.isDirty=!1;a.hasRendered=!0;g(a,"afterRender")},redraw:function(){var a=this.chart,b=this.isDirty||this.isDirtyData,d=this.group,e=this.xAxis,g=this.yAxis;d&&(a.inverted&&
d.attr({width:a.plotWidth,height:a.plotHeight}),d.animate({translateX:c(e&&e.left,a.plotLeft),translateY:c(g&&g.top,a.plotTop)}));this.translate();this.render();b&&delete this.kdTree},kdAxisArray:["clientX","plotY"],searchPoint:function(a,b){var c=this.xAxis,d=this.yAxis,e=this.chart.inverted;return this.searchKDTree({clientX:e?c.len-a.chartY+c.pos:a.chartX-c.pos,plotY:e?d.len-a.chartX+d.pos:a.chartY-d.pos},b,a)},buildKDTree:function(a){function b(a,d,e){var f,g;if(g=a&&a.length)return f=c.kdAxisArray[d%
e],a.sort(function(a,b){return a[f]-b[f]}),g=Math.floor(g/2),{point:a[g],left:b(a.slice(0,g),d+1,e),right:b(a.slice(g+1),d+1,e)}}this.buildingKdTree=!0;var c=this,d=-1<c.options.findNearestPointBy.indexOf("y")?2:1;delete c.kdTree;F(function(){c.kdTree=b(c.getValidPoints(null,!c.directTouch),d,d);c.buildingKdTree=!1},c.options.kdNow||a&&"touchstart"===a.type?0:1)},searchKDTree:function(a,b,c){function d(a,b,c,k){var m=b.point,p=e.kdAxisArray[c%k],h,n,r=m;n=u(a[f])&&u(m[f])?Math.pow(a[f]-m[f],2):null;
h=u(a[g])&&u(m[g])?Math.pow(a[g]-m[g],2):null;h=(n||0)+(h||0);m.dist=u(h)?Math.sqrt(h):Number.MAX_VALUE;m.distX=u(n)?Math.sqrt(n):Number.MAX_VALUE;p=a[p]-m[p];h=0>p?"left":"right";n=0>p?"right":"left";b[h]&&(h=d(a,b[h],c+1,k),r=h[l]<r[l]?h:m);b[n]&&Math.sqrt(p*p)<r[l]&&(a=d(a,b[n],c+1,k),r=a[l]<r[l]?a:r);return r}var e=this,f=this.kdAxisArray[0],g=this.kdAxisArray[1],l=b?"distX":"dist";b=-1<e.options.findNearestPointBy.indexOf("y")?2:1;this.kdTree||this.buildingKdTree||this.buildKDTree(c);if(this.kdTree)return d(a,
this.kdTree,b,b)},pointPlacementToXValue:function(){var a=this.options.pointPlacement;"between"===a&&(a=.5);m(a)&&(a*=c(this.options.pointRange||this.xAxis.pointRange));return a}})});J(G,"parts/Stacking.js",[G["parts/Globals.js"]],function(a){var E=a.Axis,H=a.Chart,B=a.correctFloat,h=a.defined,e=a.destroyObjectProperties,q=a.format,t=a.objectEach,u=a.pick,v=a.Series;a.StackItem=function(a,e,d,m,b){var g=a.chart.inverted;this.axis=a;this.isNegative=d;this.options=e;this.x=m;this.total=null;this.points=
{};this.stack=b;this.rightCliff=this.leftCliff=0;this.alignOptions={align:e.align||(g?d?"left":"right":"center"),verticalAlign:e.verticalAlign||(g?"middle":d?"bottom":"top"),y:u(e.y,g?4:d?14:-6),x:u(e.x,g?d?-6:6:0)};this.textAlign=e.textAlign||(g?d?"right":"left":"center")};a.StackItem.prototype={destroy:function(){e(this,this.axis)},render:function(a){var e=this.axis.chart,d=this.options,m=d.format,m=m?q(m,this,e.time):d.formatter.call(this);this.label?this.label.attr({text:m,visibility:"hidden"}):
this.label=e.renderer.text(m,null,null,d.useHTML).css(d.style).attr({align:this.textAlign,rotation:d.rotation,visibility:"hidden"}).add(a);this.label.labelrank=e.plotHeight},setOffset:function(a,e,d,m){var b=this.axis,g=b.chart;m=b.translate(b.usePercentage?100:m?m:this.total,0,0,0,1);d=b.translate(d?d:0);d=h(m)&&Math.abs(m-d);a=g.xAxis[0].translate(this.x)+a;b=h(m)&&this.getStackBox(g,this,a,m,e,d,b);(e=this.label)&&b&&(e.align(this.alignOptions,null,b),b=e.alignAttr,e[!1===this.options.crop||g.isInsidePlot(b.x,
b.y)?"show":"hide"](!0))},getStackBox:function(a,e,d,m,b,k,p){var c=e.axis.reversed,g=a.inverted;a=p.height+p.pos-(g?a.plotLeft:a.plotTop);e=e.isNegative&&!c||!e.isNegative&&c;return{x:g?e?m:m-k:d,y:g?a-d-b:e?a-m-k:a-m,width:g?k:b,height:g?b:k}}};H.prototype.getStacks=function(){var a=this;a.yAxis.forEach(function(a){a.stacks&&a.hasVisibleSeries&&(a.oldStacks=a.stacks)});a.series.forEach(function(e){!e.options.stacking||!0!==e.visible&&!1!==a.options.chart.ignoreHiddenSeries||(e.stackKey=e.type+u(e.options.stack,
""))})};E.prototype.buildStacks=function(){var a=this.series,e=u(this.options.reversedStacks,!0),d=a.length,m;if(!this.isXAxis){this.usePercentage=!1;for(m=d;m--;)a[e?m:d-m-1].setStackedPoints();for(m=0;m<d;m++)a[m].modifyStacks()}};E.prototype.renderStackTotals=function(){var a=this.chart,e=a.renderer,d=this.stacks,m=this.stackTotalGroup;m||(this.stackTotalGroup=m=e.g("stack-labels").attr({visibility:"visible",zIndex:6}).add());m.translate(a.plotLeft,a.plotTop);t(d,function(a){t(a,function(a){a.render(m)})})};
E.prototype.resetStacks=function(){var a=this,e=a.stacks;a.isXAxis||t(e,function(d){t(d,function(e,b){e.touched<a.stacksTouched?(e.destroy(),delete d[b]):(e.total=null,e.cumulative=null)})})};E.prototype.cleanStacks=function(){var a;this.isXAxis||(this.oldStacks&&(a=this.stacks=this.oldStacks),t(a,function(a){t(a,function(a){a.cumulative=a.total})}))};v.prototype.setStackedPoints=function(){if(this.options.stacking&&(!0===this.visible||!1===this.chart.options.chart.ignoreHiddenSeries)){var e=this.processedXData,
g=this.processedYData,d=[],m=g.length,b=this.options,k=b.threshold,p=u(b.startFromThreshold&&k,0),c=b.stack,b=b.stacking,q=this.stackKey,t="-"+q,w=this.negStacks,v=this.yAxis,C=v.stacks,l=v.oldStacks,D,A,z,I,f,r,E;v.stacksTouched+=1;for(f=0;f<m;f++)r=e[f],E=g[f],D=this.getStackIndicator(D,r,this.index),I=D.key,z=(A=w&&E<(p?0:k))?t:q,C[z]||(C[z]={}),C[z][r]||(l[z]&&l[z][r]?(C[z][r]=l[z][r],C[z][r].total=null):C[z][r]=new a.StackItem(v,v.options.stackLabels,A,r,c)),z=C[z][r],null!==E?(z.points[I]=z.points[this.index]=
[u(z.cumulative,p)],h(z.cumulative)||(z.base=I),z.touched=v.stacksTouched,0<D.index&&!1===this.singleStacks&&(z.points[I][0]=z.points[this.index+","+r+",0"][0])):z.points[I]=z.points[this.index]=null,"percent"===b?(A=A?q:t,w&&C[A]&&C[A][r]?(A=C[A][r],z.total=A.total=Math.max(A.total,z.total)+Math.abs(E)||0):z.total=B(z.total+(Math.abs(E)||0))):z.total=B(z.total+(E||0)),z.cumulative=u(z.cumulative,p)+(E||0),null!==E&&(z.points[I].push(z.cumulative),d[f]=z.cumulative);"percent"===b&&(v.usePercentage=
!0);this.stackedYData=d;v.oldStacks={}}};v.prototype.modifyStacks=function(){var a=this,e=a.stackKey,d=a.yAxis.stacks,m=a.processedXData,b,k=a.options.stacking;a[k+"Stacker"]&&[e,"-"+e].forEach(function(e){for(var c=m.length,g,p;c--;)if(g=m[c],b=a.getStackIndicator(b,g,a.index,e),p=(g=d[e]&&d[e][g])&&g.points[b.key])a[k+"Stacker"](p,g,c)})};v.prototype.percentStacker=function(a,e,d){e=e.total?100/e.total:0;a[0]=B(a[0]*e);a[1]=B(a[1]*e);this.stackedYData[d]=a[1]};v.prototype.getStackIndicator=function(a,
e,d,m){!h(a)||a.x!==e||m&&a.key!==m?a={x:e,index:0,key:m}:a.index++;a.key=[d,e,a.index].join();return a}});J(G,"parts/Dynamics.js",[G["parts/Globals.js"]],function(a){var E=a.addEvent,H=a.animate,B=a.Axis,h=a.Chart,e=a.createElement,q=a.css,t=a.defined,u=a.erase,v=a.extend,n=a.fireEvent,g=a.isNumber,d=a.isObject,m=a.isArray,b=a.merge,k=a.objectEach,p=a.pick,c=a.Point,x=a.Series,K=a.seriesTypes,w=a.setAnimation,F=a.splat;a.cleanRecursively=function(b,c){var e={};k(b,function(g,l){if(d(b[l],!0)&&!b.nodeType&&
c[l])g=a.cleanRecursively(b[l],c[l]),Object.keys(g).length&&(e[l]=g);else if(d(b[l])||b[l]!==c[l])e[l]=b[l]});return e};v(h.prototype,{addSeries:function(a,b,c){var d,e=this;a&&(b=p(b,!0),n(e,"addSeries",{options:a},function(){d=e.initSeries(a);e.isDirtyLegend=!0;e.linkSeries();n(e,"afterAddSeries",{series:d});b&&e.redraw(c)}));return d},addAxis:function(a,c,d,e){var g=c?"xAxis":"yAxis",l=this.options;a=b(a,{index:this[g].length,isX:c});c=new B(this,a);l[g]=F(l[g]||{});l[g].push(a);p(d,!0)&&this.redraw(e);
return c},showLoading:function(a){var b=this,c=b.options,d=b.loadingDiv,g=c.loading,k=function(){d&&q(d,{left:b.plotLeft+"px",top:b.plotTop+"px",width:b.plotWidth+"px",height:b.plotHeight+"px"})};d||(b.loadingDiv=d=e("div",{className:"highcharts-loading highcharts-loading-hidden"},null,b.container),b.loadingSpan=e("span",{className:"highcharts-loading-inner"},null,d),E(b,"redraw",k));d.className="highcharts-loading";b.loadingSpan.innerHTML=a||c.lang.loading;b.styledMode||(q(d,v(g.style,{zIndex:10})),
q(b.loadingSpan,g.labelStyle),b.loadingShown||(q(d,{opacity:0,display:""}),H(d,{opacity:g.style.opacity||.5},{duration:g.showDuration||0})));b.loadingShown=!0;k()},hideLoading:function(){var a=this.options,b=this.loadingDiv;b&&(b.className="highcharts-loading highcharts-loading-hidden",this.styledMode||H(b,{opacity:0},{duration:a.loading.hideDuration||100,complete:function(){q(b,{display:"none"})}}));this.loadingShown=!1},propsRequireDirtyBox:"backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "),
propsRequireReflow:"margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "),propsRequireUpdateSeries:"chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "),collectionsWithUpdate:"xAxis yAxis zAxis series colorAxis pane".split(" "),update:function(c,d,e,m){var l=this,h={credits:"addCredits",title:"setTitle",subtitle:"setSubtitle"},f,r,w,q,x=[];n(l,"update",{options:c});c.isResponsiveOptions||
l.setResponsive(!1,!0);c=a.cleanRecursively(c,l.options);b(!0,l.userOptions,c);if(f=c.chart){b(!0,l.options.chart,f);"className"in f&&l.setClassName(f.className);"reflow"in f&&l.setReflow(f.reflow);if("inverted"in f||"polar"in f||"type"in f)l.propFromSeries(),r=!0;"alignTicks"in f&&(r=!0);k(f,function(a,b){-1!==l.propsRequireUpdateSeries.indexOf("chart."+b)&&(w=!0);-1!==l.propsRequireDirtyBox.indexOf(b)&&(l.isDirtyBox=!0);-1!==l.propsRequireReflow.indexOf(b)&&(q=!0)});!l.styledMode&&"style"in f&&
l.renderer.setStyle(f.style)}!l.styledMode&&c.colors&&(this.options.colors=c.colors);c.plotOptions&&b(!0,this.options.plotOptions,c.plotOptions);c.time&&this.time===a.time&&(this.time=new a.Time(c.time));k(c,function(a,b){if(l[b]&&"function"===typeof l[b].update)l[b].update(a,!1);else if("function"===typeof l[h[b]])l[h[b]](a);"chart"!==b&&-1!==l.propsRequireUpdateSeries.indexOf(b)&&(w=!0)});this.collectionsWithUpdate.forEach(function(a){var b;c[a]&&("series"===a&&(b=[],l[a].forEach(function(a,c){a.options.isInternal||
b.push(p(a.options.index,c))})),F(c[a]).forEach(function(c,d){(d=t(c.id)&&l.get(c.id)||l[a][b?b[d]:d])&&d.coll===a&&(d.update(c,!1),e&&(d.touched=!0));!d&&e&&l.collectionsWithInit[a]&&(l.collectionsWithInit[a][0].apply(l,[c].concat(l.collectionsWithInit[a][1]||[]).concat([!1])).touched=!0)}),e&&l[a].forEach(function(a){a.touched||a.options.isInternal?delete a.touched:x.push(a)}))});x.forEach(function(a){a.remove&&a.remove(!1)});r&&l.axes.forEach(function(a){a.update({},!1)});w&&l.series.forEach(function(a){a.update({},
!1)});c.loading&&b(!0,l.options.loading,c.loading);r=f&&f.width;f=f&&f.height;a.isString(f)&&(f=a.relativeLength(f,r||l.chartWidth));q||g(r)&&r!==l.chartWidth||g(f)&&f!==l.chartHeight?l.setSize(r,f,m):p(d,!0)&&l.redraw(m);n(l,"afterUpdate",{options:c,redraw:d,animation:m})},setSubtitle:function(a){this.setTitle(void 0,a)}});h.prototype.collectionsWithInit={xAxis:[h.prototype.addAxis,[!0]],yAxis:[h.prototype.addAxis,[!1]],series:[h.prototype.addSeries]};v(c.prototype,{update:function(a,b,c,e){function g(){l.applyOptions(a);
null===l.y&&k&&(l.graphic=k.destroy());d(a,!0)&&(k&&k.element&&a&&a.marker&&void 0!==a.marker.symbol&&(l.graphic=k.destroy()),a&&a.dataLabels&&l.dataLabel&&(l.dataLabel=l.dataLabel.destroy()),l.connector&&(l.connector=l.connector.destroy()));m=l.index;f.updateParallelArrays(l,m);n.data[m]=d(n.data[m],!0)||d(a,!0)?l.options:p(a,n.data[m]);f.isDirty=f.isDirtyData=!0;!f.fixedBox&&f.hasCartesianSeries&&(h.isDirtyBox=!0);"point"===n.legendType&&(h.isDirtyLegend=!0);b&&h.redraw(c)}var l=this,f=l.series,
k=l.graphic,m,h=f.chart,n=f.options;b=p(b,!0);!1===e?g():l.firePointEvent("update",{options:a},g)},remove:function(a,b){this.series.removePoint(this.series.data.indexOf(this),a,b)}});v(x.prototype,{addPoint:function(a,b,c,d,e){var g=this.options,f=this.data,l=this.chart,k=this.xAxis,k=k&&k.hasNames&&k.names,m=g.data,h,w=this.xData,q,x,C;b=p(b,!0);h={series:this};this.pointClass.prototype.applyOptions.apply(h,[a]);C=h.x;x=w.length;if(this.requireSorting&&C<w[x-1])for(q=!0;x&&w[x-1]>C;)x--;this.updateParallelArrays(h,
"splice",x,0,0);this.updateParallelArrays(h,x);k&&h.name&&(k[C]=h.name);m.splice(x,0,a);q&&(this.data.splice(x,0,null),this.processData());"point"===g.legendType&&this.generatePoints();c&&(f[0]&&f[0].remove?f[0].remove(!1):(f.shift(),this.updateParallelArrays(h,"shift"),m.shift()));!1!==e&&n(this,"addPoint",{point:h});this.isDirtyData=this.isDirty=!0;b&&l.redraw(d)},removePoint:function(a,b,c){var d=this,e=d.data,g=e[a],f=d.points,l=d.chart,k=function(){f&&f.length===e.length&&f.splice(a,1);e.splice(a,
1);d.options.data.splice(a,1);d.updateParallelArrays(g||{series:d},"splice",a,1);g&&g.destroy();d.isDirty=!0;d.isDirtyData=!0;b&&l.redraw()};w(c,l);b=p(b,!0);g?g.firePointEvent("remove",null,k):k()},remove:function(a,b,c,d){function e(){g.destroy(d);g.remove=null;f.isDirtyLegend=f.isDirtyBox=!0;f.linkSeries();p(a,!0)&&f.redraw(b)}var g=this,f=g.chart;!1!==c?n(g,"remove",null,e):e()},update:function(c,d){c=a.cleanRecursively(c,this.userOptions);n(this,"update",{options:c});var e=this,g=e.chart,l=e.userOptions,
k,f=e.initialType||e.type,m=c.type||l.type||g.options.chart.type,h=!(this.hasDerivedData||c.dataGrouping||m&&m!==this.type||void 0!==c.pointStart||c.pointInterval||c.pointIntervalUnit||c.keys),w=K[f].prototype,q,x=["group","markerGroup","dataLabelsGroup","transformGroup"],t=["navigatorSeries","baseSeries"],C=e.finishedAnimating&&{animation:!1},u={};h&&(t.push("data","isDirtyData","points","processedXData","processedYData","xIncrement","_hasPointMarkers","_hasPointLabels","mapMap","mapData","minY",
"maxY","minX","maxX"),!1!==c.visible&&t.push("area","graph"),e.parallelArrays.forEach(function(a){t.push(a+"Data")}),c.data&&this.setData(c.data,!1));c=b(l,C,{index:void 0===l.index?e.index:l.index,pointStart:p(l.pointStart,e.xData[0])},!h&&{data:e.options.data},c);t=x.concat(t);t.forEach(function(a){t[a]=e[a];delete e[a]});e.remove(!1,null,!1,!0);for(q in w)e[q]=void 0;K[m||f]?v(e,K[m||f].prototype):a.error(17,!0,g);t.forEach(function(a){e[a]=t[a]});e.init(g,c);h&&this.points&&(k=e.options,!1===
k.visible?(u.graphic=1,u.dataLabel=1):(k.marker&&!1===k.marker.enabled&&!e._hasPointMarkers&&(u.graphic=1),k.dataLabels&&!1===k.dataLabels.enabled&&!e._hasPointLabels&&(u.dataLabel=1)),this.points.forEach(function(a){a&&a.series&&(a.resolveColor(),Object.keys(u).length&&a.destroyElements(u),!1===k.showInLegend&&a.legendItem&&g.legend.destroyItem(a))},this));c.zIndex!==l.zIndex&&x.forEach(function(a){e[a]&&e[a].attr({zIndex:c.zIndex})});e.initialType=f;g.linkSeries();n(this,"afterUpdate");p(d,!0)&&
g.redraw(h?void 0:!1)},setName:function(a){this.name=this.options.name=this.userOptions.name=a;this.chart.isDirtyLegend=!0}});v(B.prototype,{update:function(a,c){var d=this.chart,e=a&&a.events||{};a=b(this.userOptions,a);d.options[this.coll].indexOf&&(d.options[this.coll][d.options[this.coll].indexOf(this.userOptions)]=a);k(d.options[this.coll].events,function(a,b){"undefined"===typeof e[b]&&(e[b]=void 0)});this.destroy(!0);this.init(d,v(a,{events:e}));d.isDirtyBox=!0;p(c,!0)&&d.redraw()},remove:function(a){for(var b=
this.chart,c=this.coll,d=this.series,e=d.length;e--;)d[e]&&d[e].remove(!1);u(b.axes,this);u(b[c],this);m(b.options[c])?b.options[c].splice(this.options.index,1):delete b.options[c];b[c].forEach(function(a,b){a.options.index=a.userOptions.index=b});this.destroy();b.isDirtyBox=!0;p(a,!0)&&b.redraw()},setTitle:function(a,b){this.update({title:a},b)},setCategories:function(a,b){this.update({categories:a},b)}})});J(G,"parts/AreaSeries.js",[G["parts/Globals.js"]],function(a){var E=a.color,H=a.pick,B=a.Series,
h=a.seriesType;h("area","line",{softThreshold:!1,threshold:0},{singleStacks:!1,getStackPoints:function(e){var h=[],t=[],u=this.xAxis,v=this.yAxis,n=v.stacks[this.stackKey],g={},d=this.index,m=v.series,b=m.length,k,p=H(v.options.reversedStacks,!0)?1:-1,c;e=e||this.points;if(this.options.stacking){for(c=0;c<e.length;c++)e[c].leftNull=e[c].rightNull=null,g[e[c].x]=e[c];a.objectEach(n,function(a,b){null!==a.total&&t.push(b)});t.sort(function(a,b){return a-b});k=m.map(function(a){return a.visible});t.forEach(function(a,
e){var m=0,q,x;if(g[a]&&!g[a].isNull)h.push(g[a]),[-1,1].forEach(function(l){var m=1===l?"rightNull":"leftNull",h=0,w=n[t[e+l]];if(w)for(c=d;0<=c&&c<b;)q=w.points[c],q||(c===d?g[a][m]=!0:k[c]&&(x=n[a].points[c])&&(h-=x[1]-x[0])),c+=p;g[a][1===l?"rightCliff":"leftCliff"]=h});else{for(c=d;0<=c&&c<b;){if(q=n[a].points[c]){m=q[1];break}c+=p}m=v.translate(m,0,1,0,1);h.push({isNull:!0,plotX:u.translate(a,0,0,0,1),x:a,plotY:m,yBottom:m})}})}return h},getGraphPath:function(e){var h=B.prototype.getGraphPath,
t=this.options,u=t.stacking,v=this.yAxis,n,g,d=[],m=[],b=this.index,k,p=v.stacks[this.stackKey],c=t.threshold,x=v.getThreshold(t.threshold),K,t=a.pick(t.connectNulls,"percent"===u),w=function(a,g,l){var h=e[a];a=u&&p[h.x].points[b];var n=h[l+"Null"]||0;l=h[l+"Cliff"]||0;var w,q,h=!0;l||n?(w=(n?a[0]:a[1])+l,q=a[0]+l,h=!!n):!u&&e[g]&&e[g].isNull&&(w=q=c);void 0!==w&&(m.push({plotX:k,plotY:null===w?x:v.getThreshold(w),isNull:h,isCliff:!0}),d.push({plotX:k,plotY:null===q?x:v.getThreshold(q),doCurve:!1}))};
e=e||this.points;u&&(e=this.getStackPoints(e));for(n=0;n<e.length;n++)if(g=e[n].isNull,k=H(e[n].rectPlotX,e[n].plotX),K=H(e[n].yBottom,x),!g||t)t||w(n,n-1,"left"),g&&!u&&t||(m.push(e[n]),d.push({x:n,plotX:k,plotY:K})),t||w(n,n+1,"right");n=h.call(this,m,!0,!0);d.reversed=!0;g=h.call(this,d,!0,!0);g.length&&(g[0]="L");g=n.concat(g);h=h.call(this,m,!1,t);g.xMap=n.xMap;this.areaPath=g;return h},drawGraph:function(){this.areaPath=[];B.prototype.drawGraph.apply(this);var a=this,h=this.areaPath,t=this.options,
u=[["area","highcharts-area",this.color,t.fillColor]];this.zones.forEach(function(e,h){u.push(["zone-area-"+h,"highcharts-area highcharts-zone-area-"+h+" "+e.className,e.color||a.color,e.fillColor||t.fillColor])});u.forEach(function(e){var n=e[0],g=a[n],d=g?"animate":"attr",m={};g?(g.endX=a.preventGraphAnimation?null:h.xMap,g.animate({d:h})):(m.zIndex=0,g=a[n]=a.chart.renderer.path(h).addClass(e[1]).add(a.group),g.isArea=!0);a.chart.styledMode||(m.fill=H(e[3],E(e[2]).setOpacity(H(t.fillOpacity,.75)).get()));
g[d](m);g.startX=h.xMap;g.shiftUnit=t.step?2:1})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})});J(G,"parts/SplineSeries.js",[G["parts/Globals.js"]],function(a){var E=a.pick;a=a.seriesType;a("spline","line",{},{getPointSpline:function(a,B,h){var e=B.plotX,q=B.plotY,t=a[h-1];h=a[h+1];var u,v,n,g;if(t&&!t.isNull&&!1!==t.doCurve&&!B.isCliff&&h&&!h.isNull&&!1!==h.doCurve&&!B.isCliff){a=t.plotY;n=h.plotX;h=h.plotY;var d=0;u=(1.5*e+t.plotX)/2.5;v=(1.5*q+a)/2.5;n=(1.5*e+n)/2.5;g=(1.5*q+h)/2.5;n!==
u&&(d=(g-v)*(n-e)/(n-u)+q-g);v+=d;g+=d;v>a&&v>q?(v=Math.max(a,q),g=2*q-v):v<a&&v<q&&(v=Math.min(a,q),g=2*q-v);g>h&&g>q?(g=Math.max(h,q),v=2*q-g):g<h&&g<q&&(g=Math.min(h,q),v=2*q-g);B.rightContX=n;B.rightContY=g}B=["C",E(t.rightContX,t.plotX),E(t.rightContY,t.plotY),E(u,e),E(v,q),e,q];t.rightContX=t.rightContY=null;return B}})});J(G,"parts/AreaSplineSeries.js",[G["parts/Globals.js"]],function(a){var E=a.seriesTypes.area.prototype,H=a.seriesType;H("areaspline","spline",a.defaultPlotOptions.area,{getStackPoints:E.getStackPoints,
getGraphPath:E.getGraphPath,drawGraph:E.drawGraph,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle})});J(G,"parts/ColumnSeries.js",[G["parts/Globals.js"]],function(a){var E=a.animObject,H=a.color,B=a.extend,h=a.defined,e=a.isNumber,q=a.merge,t=a.pick,u=a.Series,v=a.seriesType,n=a.svg;v("column","line",{borderRadius:0,crisp:!0,groupPadding:.2,marker:null,pointPadding:.1,minPointLength:0,cropThreshold:50,pointRange:null,states:{hover:{halo:!1,brightness:.1},select:{color:"#cccccc",borderColor:"#000000"}},
dataLabels:{align:null,verticalAlign:null,y:null},softThreshold:!1,startFromThreshold:!0,stickyTracking:!1,tooltip:{distance:6},threshold:0,borderColor:"#ffffff"},{cropShoulder:0,directTouch:!0,trackerGroups:["group","dataLabelsGroup"],negStacks:!0,init:function(){u.prototype.init.apply(this,arguments);var a=this,d=a.chart;d.hasRendered&&d.series.forEach(function(d){d.type===a.type&&(d.isDirty=!0)})},getColumnMetrics:function(){var a=this,d=a.options,e=a.xAxis,b=a.yAxis,k=e.options.reversedStacks,
k=e.reversed&&!k||!e.reversed&&k,h,c={},n=0;!1===d.grouping?n=1:a.chart.series.forEach(function(d){var e=d.options,g=d.yAxis,k;d.type!==a.type||!d.visible&&a.chart.options.chart.ignoreHiddenSeries||b.len!==g.len||b.pos!==g.pos||(e.stacking?(h=d.stackKey,void 0===c[h]&&(c[h]=n++),k=c[h]):!1!==e.grouping&&(k=n++),d.columnIndex=k)});var q=Math.min(Math.abs(e.transA)*(e.ordinalSlope||d.pointRange||e.closestPointRange||e.tickInterval||1),e.len),w=q*d.groupPadding,u=(q-2*w)/(n||1),d=Math.min(d.maxPointWidth||
e.len,t(d.pointWidth,u*(1-2*d.pointPadding)));a.columnMetrics={width:d,offset:(u-d)/2+(w+((a.columnIndex||0)+(k?1:0))*u-q/2)*(k?-1:1)};return a.columnMetrics},crispCol:function(a,d,e,b){var g=this.chart,m=this.borderWidth,c=-(m%2?.5:0),m=m%2?.5:1;g.inverted&&g.renderer.isVML&&(m+=1);this.options.crisp&&(e=Math.round(a+e)+c,a=Math.round(a)+c,e-=a);b=Math.round(d+b)+m;c=.5>=Math.abs(d)&&.5<b;d=Math.round(d)+m;b-=d;c&&b&&(--d,b+=1);return{x:a,y:d,width:e,height:b}},translate:function(){var a=this,d=
a.chart,e=a.options,b=a.dense=2>a.closestPointRange*a.xAxis.transA,b=a.borderWidth=t(e.borderWidth,b?0:1),k=a.yAxis,p=e.threshold,c=a.translatedThreshold=k.getThreshold(p),n=t(e.minPointLength,5),q=a.getColumnMetrics(),w=q.width,v=a.barW=Math.max(w,1+2*b),C=a.pointXOffset=q.offset,l=a.dataMin,D=a.dataMax;d.inverted&&(c-=.5);e.pointPadding&&(v=Math.ceil(v));u.prototype.translate.apply(a);a.points.forEach(function(b){var e=t(b.yBottom,c),g=999+Math.abs(e),f=w,g=Math.min(Math.max(-g,b.plotY),k.len+g),
m=b.plotX+C,q=v,x=Math.min(g,e),u,A=Math.max(g,e)-x;n&&Math.abs(A)<n&&(A=n,u=!k.reversed&&!b.negative||k.reversed&&b.negative,b.y===p&&a.dataMax<=p&&k.min<p&&l!==D&&(u=!u),x=Math.abs(x-c)>n?e-n:c-(u?n:0));h(b.options.pointWidth)&&(f=q=Math.ceil(b.options.pointWidth),m-=Math.round((f-w)/2));b.barX=m;b.pointWidth=f;b.tooltipPos=d.inverted?[k.len+k.pos-d.plotLeft-g,a.xAxis.len-m-q/2,A]:[m+q/2,g+k.pos-d.plotTop,A];b.shapeType=a.pointClass.prototype.shapeType||"rect";b.shapeArgs=a.crispCol.apply(a,b.isNull?
[m,c,q,0]:[m,x,q,A])})},getSymbol:a.noop,drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawGraph:function(){this.group[this.dense?"addClass":"removeClass"]("highcharts-dense-data")},pointAttribs:function(a,d){var e=this.options,b,k=this.pointAttrToOptions||{};b=k.stroke||"borderColor";var g=k["stroke-width"]||"borderWidth",c=a&&a.color||this.color,h=a&&a[b]||e[b]||this.color||c,n=a&&a[g]||e[g]||this[g]||0,k=a&&a.dashStyle||e.dashStyle,w=t(e.opacity,1),u;a&&this.zones.length&&(u=a.getZone(),c=
a.options.color||u&&u.color||this.color,u&&(h=u.borderColor||h,k=u.dashStyle||k,n=u.borderWidth||n));d&&(a=q(e.states[d],a.options.states&&a.options.states[d]||{}),d=a.brightness,c=a.color||void 0!==d&&H(c).brighten(a.brightness).get()||c,h=a[b]||h,n=a[g]||n,k=a.dashStyle||k,w=t(a.opacity,w));b={fill:c,stroke:h,"stroke-width":n,opacity:w};k&&(b.dashstyle=k);return b},drawPoints:function(){var a=this,d=this.chart,m=a.options,b=d.renderer,k=m.animationLimit||250,h;a.points.forEach(function(c){var g=
c.graphic,p=g&&d.pointCount<k?"animate":"attr";if(e(c.plotY)&&null!==c.y){h=c.shapeArgs;g&&g.element.nodeName!==c.shapeType&&(g=g.destroy());if(g)g[p](q(h));else c.graphic=g=b[c.shapeType](h).add(c.group||a.group);if(m.borderRadius)g[p]({r:m.borderRadius});d.styledMode||g[p](a.pointAttribs(c,c.selected&&"select")).shadow(!1!==c.allowShadow&&m.shadow,null,m.stacking&&!m.borderRadius);g.addClass(c.getClassName(),!0)}else g&&(c.graphic=g.destroy())})},animate:function(a){var d=this,e=this.yAxis,b=d.options,
g=this.chart.inverted,h={},c=g?"translateX":"translateY",q;n&&(a?(h.scaleY=.001,a=Math.min(e.pos+e.len,Math.max(e.pos,e.toPixels(b.threshold))),g?h.translateX=a-e.len:h.translateY=a,d.clipBox&&d.setClip(),d.group.attr(h)):(q=d.group.attr(c),d.group.animate({scaleY:1},B(E(d.options.animation),{step:function(a,b){h[c]=q+b.pos*(e.pos-q);d.group.attr(h)}})),d.animate=null))},remove:function(){var a=this,d=a.chart;d.hasRendered&&d.series.forEach(function(d){d.type===a.type&&(d.isDirty=!0)});u.prototype.remove.apply(a,
arguments)}})});J(G,"parts/BarSeries.js",[G["parts/Globals.js"]],function(a){a=a.seriesType;a("bar","column",null,{inverted:!0})});J(G,"parts/ScatterSeries.js",[G["parts/Globals.js"]],function(a){var E=a.Series,H=a.seriesType;H("scatter","line",{lineWidth:0,findNearestPointBy:"xy",jitter:{x:0,y:0},marker:{enabled:!0},tooltip:{headerFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cspan style\x3d"font-size: 10px"\x3e {series.name}\x3c/span\x3e\x3cbr/\x3e',pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3e"}},
{sorted:!1,requireSorting:!1,noSharedTooltip:!0,trackerGroups:["group","markerGroup","dataLabelsGroup"],takeOrdinalPosition:!1,drawGraph:function(){this.options.lineWidth&&E.prototype.drawGraph.call(this)},applyJitter:function(){var a=this,h=this.options.jitter,e=this.points.length;h&&this.points.forEach(function(q,t){["x","y"].forEach(function(u,v){var n,g="plot"+u.toUpperCase(),d,m;h[u]&&!q.isNull&&(n=a[u+"Axis"],m=h[u]*n.transA,n&&!n.isLog&&(d=Math.max(0,q[g]-m),n=Math.min(n.len,q[g]+m),v=1E4*
Math.sin(t+v*e),q[g]=d+(n-d)*(v-Math.floor(v)),"x"===u&&(q.clientX=q.plotX)))})})}});a.addEvent(E,"afterTranslate",function(){this.applyJitter&&this.applyJitter()})});J(G,"mixins/centered-series.js",[G["parts/Globals.js"]],function(a){var E=a.deg2rad,H=a.isNumber,B=a.pick,h=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,q=this.chart,t=2*(a.slicedOffset||0),u=q.plotWidth-2*t,q=q.plotHeight-2*t,v=a.center,v=[B(v[0],"50%"),B(v[1],"50%"),a.size||"100%",a.innerSize||0],
n=Math.min(u,q),g,d;for(g=0;4>g;++g)d=v[g],a=2>g||2===g&&/%$/.test(d),v[g]=h(d,[u,q,n,v[2]][g])+(a?t:0);v[3]>v[2]&&(v[3]=v[2]);return v},getStartAndEndRadians:function(a,h){a=H(a)?a:0;h=H(h)&&h>a&&360>h-a?h:a+360;return{start:E*(a+-90),end:E*(h+-90)}}}});J(G,"parts/PieSeries.js",[G["parts/Globals.js"]],function(a){var E=a.addEvent,H=a.CenteredSeriesMixin,B=a.defined,h=H.getStartAndEndRadians,e=a.merge,q=a.noop,t=a.pick,u=a.Point,v=a.Series,n=a.seriesType,g=a.setAnimation;n("pie","line",{center:[null,
null],clip:!1,colorByPoint:!0,dataLabels:{allowOverlap:!0,connectorPadding:5,distance:30,enabled:!0,formatter:function(){return this.point.isNull?void 0:this.point.name},softConnector:!0,x:0,connectorShape:"fixedOffset",crookDistance:"70%"},ignoreHiddenPoint:!0,inactiveOtherPoints:!0,legendType:"point",marker:null,size:null,showInLegend:!1,slicedOffset:10,stickyTracking:!1,tooltip:{followPointer:!0},borderColor:"#ffffff",borderWidth:1,states:{hover:{brightness:.1}}},{isCartesian:!1,requireSorting:!1,
directTouch:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],axisTypes:[],pointAttribs:a.seriesTypes.column.prototype.pointAttribs,animate:function(a){var d=this,b=d.points,e=d.startAngleRad;a||(b.forEach(function(a){var b=a.graphic,g=a.shapeArgs;b&&(b.attr({r:a.startR||d.center[3]/2,start:e,end:e}),b.animate({r:g.r,start:g.start,end:g.end},d.options.animation))}),d.animate=null)},hasData:function(){return!!this.processedXData.length},updateTotals:function(){var a,e=0,b=this.points,
g=b.length,h,c=this.options.ignoreHiddenPoint;for(a=0;a<g;a++)h=b[a],e+=c&&!h.visible?0:h.isNull?0:h.y;this.total=e;for(a=0;a<g;a++)h=b[a],h.percentage=0<e&&(h.visible||!c)?h.y/e*100:0,h.total=e},generatePoints:function(){v.prototype.generatePoints.call(this);this.updateTotals()},getX:function(a,e,b){var d=this.center,g=this.radii?this.radii[b.index]:d[2]/2;return d[0]+(e?-1:1)*Math.cos(Math.asin(Math.max(Math.min((a-d[1])/(g+b.labelDistance),1),-1)))*(g+b.labelDistance)+(0<b.labelDistance?(e?-1:
1)*this.options.dataLabels.padding:0)},translate:function(d){this.generatePoints();var e=0,b=this.options,g=b.slicedOffset,p=g+(b.borderWidth||0),c,n,q=h(b.startAngle,b.endAngle),w=this.startAngleRad=q.start,q=(this.endAngleRad=q.end)-w,u=this.points,C,l,v=b.dataLabels.distance,b=b.ignoreHiddenPoint,A,z=u.length,B;d||(this.center=d=this.getCenter());for(A=0;A<z;A++){B=u[A];c=w+e*q;if(!b||B.visible)e+=B.percentage/100;n=w+e*q;B.shapeType="arc";B.shapeArgs={x:d[0],y:d[1],r:d[2]/2,innerR:d[3]/2,start:Math.round(1E3*
c)/1E3,end:Math.round(1E3*n)/1E3};B.labelDistance=t(B.options.dataLabels&&B.options.dataLabels.distance,v);B.labelDistance=a.relativeLength(B.labelDistance,B.shapeArgs.r);this.maxLabelDistance=Math.max(this.maxLabelDistance||0,B.labelDistance);n=(n+c)/2;n>1.5*Math.PI?n-=2*Math.PI:n<-Math.PI/2&&(n+=2*Math.PI);B.slicedTranslation={translateX:Math.round(Math.cos(n)*g),translateY:Math.round(Math.sin(n)*g)};C=Math.cos(n)*d[2]/2;l=Math.sin(n)*d[2]/2;B.tooltipPos=[d[0]+.7*C,d[1]+.7*l];B.half=n<-Math.PI/
2||n>Math.PI/2?1:0;B.angle=n;c=Math.min(p,B.labelDistance/5);B.labelPosition={natural:{x:d[0]+C+Math.cos(n)*B.labelDistance,y:d[1]+l+Math.sin(n)*B.labelDistance},"final":{},alignment:0>B.labelDistance?"center":B.half?"right":"left",connectorPosition:{breakAt:{x:d[0]+C+Math.cos(n)*c,y:d[1]+l+Math.sin(n)*c},touchingSliceAt:{x:d[0]+C,y:d[1]+l}}}}},drawGraph:null,redrawPoints:function(){var a=this,g=a.chart,b=g.renderer,k,h,c,n,q=a.options.shadow;!q||a.shadowGroup||g.styledMode||(a.shadowGroup=b.g("shadow").attr({zIndex:-1}).add(a.group));
a.points.forEach(function(d){var m={};h=d.graphic;if(!d.isNull&&h){n=d.shapeArgs;k=d.getTranslate();if(!g.styledMode){var p=d.shadowGroup;q&&!p&&(p=d.shadowGroup=b.g("shadow").add(a.shadowGroup));p&&p.attr(k);c=a.pointAttribs(d,d.selected&&"select")}d.delayedRendering?(h.setRadialReference(a.center).attr(n).attr(k),g.styledMode||h.attr(c).attr({"stroke-linejoin":"round"}).shadow(q,p),d.delayedRendering=!1):(h.setRadialReference(a.center),g.styledMode||e(!0,m,c),e(!0,m,n,k),h.animate(m));h.attr({visibility:d.visible?
"inherit":"hidden"});h.addClass(d.getClassName())}else h&&(d.graphic=h.destroy())})},drawPoints:function(){var a=this.chart.renderer;this.points.forEach(function(d){d.graphic||(d.graphic=a[d.shapeType](d.shapeArgs).add(d.series.group),d.delayedRendering=!0)})},searchPoint:q,sortByAngle:function(a,e){a.sort(function(a,d){return void 0!==a.angle&&(d.angle-a.angle)*e})},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,getCenter:H.getCenter,getSymbol:q},{init:function(){u.prototype.init.apply(this,
arguments);var a=this,e;a.name=t(a.name,"Slice");e=function(b){a.slice("select"===b.type)};E(a,"select",e);E(a,"unselect",e);return a},isValid:function(){return a.isNumber(this.y,!0)&&0<=this.y},setVisible:function(a,e){var b=this,d=b.series,g=d.chart,c=d.options.ignoreHiddenPoint;e=t(e,c);a!==b.visible&&(b.visible=b.options.visible=a=void 0===a?!b.visible:a,d.options.data[d.data.indexOf(b)]=b.options,["graphic","dataLabel","connector","shadowGroup"].forEach(function(c){if(b[c])b[c][a?"show":"hide"](!0)}),
b.legendItem&&g.legend.colorizeItem(b,a),a||"hover"!==b.state||b.setState(""),c&&(d.isDirty=!0),e&&g.redraw())},slice:function(a,e,b){var d=this.series;g(b,d.chart);t(e,!0);this.sliced=this.options.sliced=B(a)?a:!this.sliced;d.options.data[d.data.indexOf(this)]=this.options;this.graphic.animate(this.getTranslate());this.shadowGroup&&this.shadowGroup.animate(this.getTranslate())},getTranslate:function(){return this.sliced?this.slicedTranslation:{translateX:0,translateY:0}},haloPath:function(a){var d=
this.shapeArgs;return this.sliced||!this.visible?[]:this.series.chart.renderer.symbols.arc(d.x,d.y,d.r+a,d.r+a,{innerR:this.shapeArgs.r-1,start:d.start,end:d.end})},connectorShapes:{fixedOffset:function(a,e,b){var d=e.breakAt;e=e.touchingSliceAt;return["M",a.x,a.y].concat(b.softConnector?["C",a.x+("left"===a.alignment?-5:5),a.y,2*d.x-e.x,2*d.y-e.y,d.x,d.y]:["L",d.x,d.y]).concat(["L",e.x,e.y])},straight:function(a,e){e=e.touchingSliceAt;return["M",a.x,a.y,"L",e.x,e.y]},crookedLine:function(d,e,b){e=
e.touchingSliceAt;var g=this.series,h=g.center[0],c=g.chart.plotWidth,m=g.chart.plotLeft,g=d.alignment,n=this.shapeArgs.r;b=a.relativeLength(b.crookDistance,1);b="left"===g?h+n+(c+m-h-n)*(1-b):m+(h-n)*b;h=["L",b,d.y];if("left"===g?b>d.x||b<e.x:b<d.x||b>e.x)h=[];return["M",d.x,d.y].concat(h).concat(["L",e.x,e.y])}},getConnectorPath:function(){var a=this.labelPosition,e=this.series.options.dataLabels,b=e.connectorShape,g=this.connectorShapes;g[b]&&(b=g[b]);return b.call(this,{x:a.final.x,y:a.final.y,
alignment:a.alignment},a.connectorPosition,e)}})});J(G,"parts/DataLabels.js",[G["parts/Globals.js"]],function(a){var E=a.arrayMax,H=a.defined,B=a.extend,h=a.format,e=a.merge,q=a.noop,t=a.pick,u=a.relativeLength,v=a.Series,n=a.seriesTypes,g=a.stableSort,d=a.isArray,m=a.splat;a.distribute=function(b,d,e){function c(a,b){return a.target-b.target}var k,h=!0,m=b,p=[],n;n=0;var l=m.reducedLen||d;for(k=b.length;k--;)n+=b[k].size;if(n>l){g(b,function(a,b){return(b.rank||0)-(a.rank||0)});for(n=k=0;n<=l;)n+=
b[k].size,k++;p=b.splice(k-1,b.length)}g(b,c);for(b=b.map(function(a){return{size:a.size,targets:[a.target],align:t(a.align,.5)}});h;){for(k=b.length;k--;)h=b[k],n=(Math.min.apply(0,h.targets)+Math.max.apply(0,h.targets))/2,h.pos=Math.min(Math.max(0,n-h.size*h.align),d-h.size);k=b.length;for(h=!1;k--;)0<k&&b[k-1].pos+b[k-1].size>b[k].pos&&(b[k-1].size+=b[k].size,b[k-1].targets=b[k-1].targets.concat(b[k].targets),b[k-1].align=.5,b[k-1].pos+b[k-1].size>d&&(b[k-1].pos=d-b[k-1].size),b.splice(k,1),h=
!0)}m.push.apply(m,p);k=0;b.some(function(b){var c=0;if(b.targets.some(function(){m[k].pos=b.pos+c;if(Math.abs(m[k].pos-m[k].target)>e)return m.slice(0,k+1).forEach(function(a){delete a.pos}),m.reducedLen=(m.reducedLen||d)-.1*d,m.reducedLen>.1*d&&a.distribute(m,d,e),!0;c+=m[k].size;k++}))return!0});g(m,c)};v.prototype.drawDataLabels=function(){function b(a,b){var c=b.filter;return c?(b=c.operator,a=a[c.property],c=c.value,"\x3e"===b&&a>c||"\x3c"===b&&a<c||"\x3e\x3d"===b&&a>=c||"\x3c\x3d"===b&&a<=
c||"\x3d\x3d"===b&&a==c||"\x3d\x3d\x3d"===b&&a===c?!0:!1):!0}function g(a,b){var c=[],f;if(d(a)&&!d(b))c=a.map(function(a){return e(a,b)});else if(d(b)&&!d(a))c=b.map(function(b){return e(a,b)});else if(d(a)||d(b))for(f=Math.max(a.length,b.length);f--;)c[f]=e(a[f],b[f]);else c=e(a,b);return c}var p=this,c=p.chart,n=p.options,q=n.dataLabels,w=p.points,u,C=p.hasRendered||0,l,v=a.animObject(n.animation).duration,A=Math.min(v,200),z=!c.renderer.forExport&&t(q.defer,0<A),B=c.renderer,q=g(g(c.options.plotOptions&&
c.options.plotOptions.series&&c.options.plotOptions.series.dataLabels,c.options.plotOptions&&c.options.plotOptions[p.type]&&c.options.plotOptions[p.type].dataLabels),q);a.fireEvent(this,"drawDataLabels");if(d(q)||q.enabled||p._hasPointLabels)l=p.plotGroup("dataLabelsGroup","data-labels",z&&!C?"hidden":"inherit",q.zIndex||6),z&&(l.attr({opacity:+C}),C||setTimeout(function(){var a=p.dataLabelsGroup;a&&(p.visible&&l.show(!0),a[n.animation?"animate":"attr"]({opacity:1},{duration:A}))},v-A)),w.forEach(function(d){u=
m(g(q,d.dlOptions||d.options&&d.options.dataLabels));u.forEach(function(e,f){var g=e.enabled&&(!d.isNull||d.dataLabelOnNull)&&b(d,e),k,m,q,w,r=d.dataLabels?d.dataLabels[f]:d.dataLabel,u=d.connectors?d.connectors[f]:d.connector,x=!r;g&&(k=d.getLabelConfig(),m=t(e[d.formatPrefix+"Format"],e.format),k=H(m)?h(m,k,c.time):(e[d.formatPrefix+"Formatter"]||e.formatter).call(k,e),m=e.style,q=e.rotation,c.styledMode||(m.color=t(e.color,m.color,p.color,"#000000"),"contrast"===m.color&&(d.contrastColor=B.getContrast(d.color||
p.color),m.color=e.inside||0>t(e.distance,d.labelDistance)||n.stacking?d.contrastColor:"#000000"),n.cursor&&(m.cursor=n.cursor)),w={r:e.borderRadius||0,rotation:q,padding:e.padding,zIndex:1},c.styledMode||(w.fill=e.backgroundColor,w.stroke=e.borderColor,w["stroke-width"]=e.borderWidth),a.objectEach(w,function(a,b){void 0===a&&delete w[b]}));!r||g&&H(k)?g&&H(k)&&(r?w.text=k:(d.dataLabels=d.dataLabels||[],r=d.dataLabels[f]=q?B.text(k,0,-9999).addClass("highcharts-data-label"):B.label(k,0,-9999,e.shape,
null,null,e.useHTML,null,"data-label"),f||(d.dataLabel=r),r.addClass(" highcharts-data-label-color-"+d.colorIndex+" "+(e.className||"")+(e.useHTML?" highcharts-tracker":""))),r.options=e,r.attr(w),c.styledMode||r.css(m).shadow(e.shadow),r.added||r.add(l),e.textPath&&!e.useHTML&&r.setTextPath(d.getDataLabelPath&&d.getDataLabelPath(r)||d.graphic,e.textPath),p.alignDataLabel(d,r,e,null,x)):(d.dataLabel=d.dataLabel&&d.dataLabel.destroy(),d.dataLabels&&(1===d.dataLabels.length?delete d.dataLabels:delete d.dataLabels[f]),
f||delete d.dataLabel,u&&(d.connector=d.connector.destroy(),d.connectors&&(1===d.connectors.length?delete d.connectors:delete d.connectors[f])))})});a.fireEvent(this,"afterDrawDataLabels")};v.prototype.alignDataLabel=function(a,d,e,c,g){var b=this.chart,k=this.isCartesian&&b.inverted,h=t(a.dlBox&&a.dlBox.centerX,a.plotX,-9999),m=t(a.plotY,-9999),l=d.getBBox(),p,n=e.rotation,q=e.align,u=this.visible&&(a.series.forceDL||b.isInsidePlot(h,Math.round(m),k)||c&&b.isInsidePlot(h,k?c.x+1:c.y+c.height-1,k)),
f="justify"===t(e.overflow,"justify");if(u&&(p=b.renderer.fontMetrics(b.styledMode?void 0:e.style.fontSize,d).b,c=B({x:k?this.yAxis.len-m:h,y:Math.round(k?this.xAxis.len-h:m),width:0,height:0},c),B(e,{width:l.width,height:l.height}),n?(f=!1,h=b.renderer.rotCorr(p,n),h={x:c.x+e.x+c.width/2+h.x,y:c.y+e.y+{top:0,middle:.5,bottom:1}[e.verticalAlign]*c.height},d[g?"attr":"animate"](h).attr({align:q}),m=(n+720)%360,m=180<m&&360>m,"left"===q?h.y-=m?l.height:0:"center"===q?(h.x-=l.width/2,h.y-=l.height/2):
"right"===q&&(h.x-=l.width,h.y-=m?0:l.height),d.placed=!0,d.alignAttr=h):(d.align(e,null,c),h=d.alignAttr),f&&0<=c.height?a.isLabelJustified=this.justifyDataLabel(d,e,h,l,c,g):t(e.crop,!0)&&(u=b.isInsidePlot(h.x,h.y)&&b.isInsidePlot(h.x+l.width,h.y+l.height)),e.shape&&!n))d[g?"attr":"animate"]({anchorX:k?b.plotWidth-a.plotY:a.plotX,anchorY:k?b.plotHeight-a.plotX:a.plotY});u||(d.attr({y:-9999}),d.placed=!1)};v.prototype.justifyDataLabel=function(a,d,e,c,g,h){var b=this.chart,k=d.align,m=d.verticalAlign,
l,p,n=a.box?0:a.padding||0;l=e.x+n;0>l&&("right"===k?d.align="left":d.x=-l,p=!0);l=e.x+c.width-n;l>b.plotWidth&&("left"===k?d.align="right":d.x=b.plotWidth-l,p=!0);l=e.y+n;0>l&&("bottom"===m?d.verticalAlign="top":d.y=-l,p=!0);l=e.y+c.height-n;l>b.plotHeight&&("top"===m?d.verticalAlign="bottom":d.y=b.plotHeight-l,p=!0);p&&(a.placed=!h,a.align(d,null,g));return p};n.pie&&(n.pie.prototype.dataLabelPositioners={radialDistributionY:function(a){return a.top+a.distributeBox.pos},radialDistributionX:function(a,
d,e,c){return a.getX(e<d.top+2||e>d.bottom-2?c:e,d.half,d)},justify:function(a,d,e){return e[0]+(a.half?-1:1)*(d+a.labelDistance)},alignToPlotEdges:function(a,d,e,c){a=a.getBBox().width;return d?a+c:e-a-c},alignToConnectors:function(a,d,e,c){var b=0,g;a.forEach(function(a){g=a.dataLabel.getBBox().width;g>b&&(b=g)});return d?b+c:e-b-c}},n.pie.prototype.drawDataLabels=function(){var b=this,d=b.data,g,c=b.chart,h=b.options.dataLabels,m=h.connectorPadding,n,q=c.plotWidth,u=c.plotHeight,l=c.plotLeft,D=
Math.round(c.chartWidth/3),A,z=b.center,B=z[2]/2,f=z[1],r,G,N,L,M=[[],[]],J,y,S,U,P=[0,0,0,0],T=b.dataLabelPositioners,O;b.visible&&(h.enabled||b._hasPointLabels)&&(d.forEach(function(a){a.dataLabel&&a.visible&&a.dataLabel.shortened&&(a.dataLabel.attr({width:"auto"}).css({width:"auto",textOverflow:"clip"}),a.dataLabel.shortened=!1)}),v.prototype.drawDataLabels.apply(b),d.forEach(function(a){a.dataLabel&&(a.visible?(M[a.half].push(a),a.dataLabel._pos=null,!H(h.style.width)&&!H(a.options.dataLabels&&
a.options.dataLabels.style&&a.options.dataLabels.style.width)&&a.dataLabel.getBBox().width>D&&(a.dataLabel.css({width:.7*D}),a.dataLabel.shortened=!0)):(a.dataLabel=a.dataLabel.destroy(),a.dataLabels&&1===a.dataLabels.length&&delete a.dataLabels))}),M.forEach(function(d,e){var k,p,n=d.length,w=[],v;if(n)for(b.sortByAngle(d,e-.5),0<b.maxLabelDistance&&(k=Math.max(0,f-B-b.maxLabelDistance),p=Math.min(f+B+b.maxLabelDistance,c.plotHeight),d.forEach(function(a){0<a.labelDistance&&a.dataLabel&&(a.top=Math.max(0,
f-B-a.labelDistance),a.bottom=Math.min(f+B+a.labelDistance,c.plotHeight),v=a.dataLabel.getBBox().height||21,a.distributeBox={target:a.labelPosition.natural.y-a.top+v/2,size:v,rank:a.y},w.push(a.distributeBox))}),k=p+v-k,a.distribute(w,k,k/5)),U=0;U<n;U++){g=d[U];N=g.labelPosition;r=g.dataLabel;S=!1===g.visible?"hidden":"inherit";y=k=N.natural.y;w&&H(g.distributeBox)&&(void 0===g.distributeBox.pos?S="hidden":(L=g.distributeBox.size,y=T.radialDistributionY(g)));delete g.positionIndex;if(h.justify)J=
T.justify(g,B,z);else switch(h.alignTo){case "connectors":J=T.alignToConnectors(d,e,q,l);break;case "plotEdges":J=T.alignToPlotEdges(r,e,q,l);break;default:J=T.radialDistributionX(b,g,y,k)}r._attr={visibility:S,align:N.alignment};r._pos={x:J+h.x+({left:m,right:-m}[N.alignment]||0),y:y+h.y-10};N.final.x=J;N.final.y=y;t(h.crop,!0)&&(G=r.getBBox().width,k=null,J-G<m&&1===e?(k=Math.round(G-J+m),P[3]=Math.max(k,P[3])):J+G>q-m&&0===e&&(k=Math.round(J+G-q+m),P[1]=Math.max(k,P[1])),0>y-L/2?P[0]=Math.max(Math.round(-y+
L/2),P[0]):y+L/2>u&&(P[2]=Math.max(Math.round(y+L/2-u),P[2])),r.sideOverflow=k)}}),0===E(P)||this.verifyDataLabelOverflow(P))&&(this.placeDataLabels(),this.points.forEach(function(a){O=e(h,a.options.dataLabels);if(n=t(O.connectorWidth,1)){var d;A=a.connector;if((r=a.dataLabel)&&r._pos&&a.visible&&0<a.labelDistance){S=r._attr.visibility;if(d=!A)a.connector=A=c.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-"+a.colorIndex+(a.className?" "+a.className:"")).add(b.dataLabelsGroup),
c.styledMode||A.attr({"stroke-width":n,stroke:O.connectorColor||a.color||"#666666"});A[d?"attr":"animate"]({d:a.getConnectorPath()});A.attr("visibility",S)}else A&&(a.connector=A.destroy())}}))},n.pie.prototype.placeDataLabels=function(){this.points.forEach(function(a){var b=a.dataLabel,d;b&&a.visible&&((d=b._pos)?(b.sideOverflow&&(b._attr.width=Math.max(b.getBBox().width-b.sideOverflow,0),b.css({width:b._attr.width+"px",textOverflow:(this.options.dataLabels.style||{}).textOverflow||"ellipsis"}),
b.shortened=!0),b.attr(b._attr),b[b.moved?"animate":"attr"](d),b.moved=!0):b&&b.attr({y:-9999}));delete a.distributeBox},this)},n.pie.prototype.alignDataLabel=q,n.pie.prototype.verifyDataLabelOverflow=function(a){var b=this.center,d=this.options,c=d.center,e=d.minSize||80,g,h=null!==d.size;h||(null!==c[0]?g=Math.max(b[2]-Math.max(a[1],a[3]),e):(g=Math.max(b[2]-a[1]-a[3],e),b[0]+=(a[3]-a[1])/2),null!==c[1]?g=Math.max(Math.min(g,b[2]-Math.max(a[0],a[2])),e):(g=Math.max(Math.min(g,b[2]-a[0]-a[2]),e),
b[1]+=(a[0]-a[2])/2),g<b[2]?(b[2]=g,b[3]=Math.min(u(d.innerSize||0,g),g),this.translate(b),this.drawDataLabels&&this.drawDataLabels()):h=!0);return h});n.column&&(n.column.prototype.alignDataLabel=function(a,d,g,c,h){var b=this.chart.inverted,k=a.series,m=a.dlBox||a.shapeArgs,n=t(a.below,a.plotY>t(this.translatedThreshold,k.yAxis.len)),l=t(g.inside,!!this.options.stacking);m&&(c=e(m),0>c.y&&(c.height+=c.y,c.y=0),m=c.y+c.height-k.yAxis.len,0<m&&(c.height-=m),b&&(c={x:k.yAxis.len-c.y-c.height,y:k.xAxis.len-
c.x-c.width,width:c.height,height:c.width}),l||(b?(c.x+=n?0:c.width,c.width=0):(c.y+=n?c.height:0,c.height=0)));g.align=t(g.align,!b||l?"center":n?"right":"left");g.verticalAlign=t(g.verticalAlign,b||l?"middle":n?"top":"bottom");v.prototype.alignDataLabel.call(this,a,d,g,c,h);a.isLabelJustified&&a.contrastColor&&d.css({color:a.contrastColor})})});J(G,"modules/overlapping-datalabels.src.js",[G["parts/Globals.js"]],function(a){var E=a.Chart,G=a.isArray,B=a.objectEach,h=a.pick,e=a.addEvent,q=a.fireEvent;
e(E,"render",function(){var a=[];(this.labelCollectors||[]).forEach(function(e){a=a.concat(e())});(this.yAxis||[]).forEach(function(e){e.options.stackLabels&&!e.options.stackLabels.allowOverlap&&B(e.stacks,function(e){B(e,function(e){a.push(e.label)})})});(this.series||[]).forEach(function(e){var q=e.options.dataLabels;e.visible&&(!1!==q.enabled||e._hasPointLabels)&&e.points.forEach(function(e){e.visible&&(G(e.dataLabels)?e.dataLabels:e.dataLabel?[e.dataLabel]:[]).forEach(function(g){var d=g.options;
g.labelrank=h(d.labelrank,e.labelrank,e.shapeArgs&&e.shapeArgs.height);d.allowOverlap||a.push(g)})})});this.hideOverlappingLabels(a)});E.prototype.hideOverlappingLabels=function(a){var e=this,h=a.length,n=e.renderer,g,d,m,b,k,p,c=function(a,b,c,d,e,g,k,h){return!(e>a+c||e+k<a||g>b+d||g+h<b)};m=function(a){var b,c,d,e=a.box?0:a.padding||0;d=0;if(a&&(!a.alignAttr||a.placed))return b=a.alignAttr||{x:a.attr("x"),y:a.attr("y")},c=a.parentGroup,a.width||(d=a.getBBox(),a.width=d.width,a.height=d.height,
d=n.fontMetrics(null,a.element).h),{x:b.x+(c.translateX||0)+e,y:b.y+(c.translateY||0)+e-d,width:a.width-2*e,height:a.height-2*e}};for(d=0;d<h;d++)if(g=a[d])g.oldOpacity=g.opacity,g.newOpacity=1,g.absoluteBox=m(g);a.sort(function(a,b){return(b.labelrank||0)-(a.labelrank||0)});for(d=0;d<h;d++)for(p=(m=a[d])&&m.absoluteBox,g=d+1;g<h;++g)if(k=(b=a[g])&&b.absoluteBox,p&&k&&m!==b&&0!==m.newOpacity&&0!==b.newOpacity&&(k=c(p.x,p.y,p.width,p.height,k.x,k.y,k.width,k.height)))(m.labelrank<b.labelrank?m:b).newOpacity=
0;a.forEach(function(a){var b,c;a&&(c=a.newOpacity,a.oldOpacity!==c&&(a.alignAttr&&a.placed?(c?a.show(!0):b=function(){a.hide()},a.alignAttr.opacity=c,a[a.isOld?"animate":"attr"](a.alignAttr,null,b),q(e,"afterHideOverlappingLabels")):a.attr({opacity:c})),a.isOld=!0)})}});J(G,"parts/Interaction.js",[G["parts/Globals.js"]],function(a){var E=a.addEvent,G=a.Chart,B=a.createElement,h=a.css,e=a.defaultOptions,q=a.defaultPlotOptions,t=a.extend,u=a.fireEvent,v=a.hasTouch,n=a.isObject,g=a.isArray,d=a.Legend,
m=a.merge,b=a.pick,k=a.Point,p=a.Series,c=a.seriesTypes,x=a.svg,J;J=a.TrackerMixin={drawTrackerPoint:function(){var a=this,b=a.chart,c=b.pointer,d=function(a){var b=c.getPointFromEvent(a);void 0!==b&&(c.isDirectTouch=!0,b.onMouseOver(a))},e;a.points.forEach(function(a){e=g(a.dataLabels)?a.dataLabels:a.dataLabel?[a.dataLabel]:[];a.graphic&&(a.graphic.element.point=a);e.forEach(function(b){b.div?b.div.point=a:b.element.point=a})});a._hasTracking||(a.trackerGroups.forEach(function(e){if(a[e]){a[e].addClass("highcharts-tracker").on("mouseover",
d).on("mouseout",function(a){c.onTrackerMouseOut(a)});if(v)a[e].on("touchstart",d);!b.styledMode&&a.options.cursor&&a[e].css(h).css({cursor:a.options.cursor})}}),a._hasTracking=!0);u(this,"afterDrawTracker")},drawTrackerGraph:function(){var a=this,b=a.options,c=b.trackByArea,d=[].concat(c?a.areaPath:a.graphPath),e=d.length,g=a.chart,k=g.pointer,h=g.renderer,f=g.options.tooltip.snap,m=a.tracker,n,p=function(){if(g.hoverSeries!==a)a.onMouseOver()},q="rgba(192,192,192,"+(x?.0001:.002)+")";if(e&&!c)for(n=
e+1;n--;)"M"===d[n]&&d.splice(n+1,0,d[n+1]-f,d[n+2],"L"),(n&&"M"===d[n]||n===e)&&d.splice(n,0,"L",d[n-2]+f,d[n-1]);m?m.attr({d:d}):a.graph&&(a.tracker=h.path(d).attr({visibility:a.visible?"visible":"hidden",zIndex:2}).addClass(c?"highcharts-tracker-area":"highcharts-tracker-line").add(a.group),g.styledMode||a.tracker.attr({"stroke-linejoin":"round",stroke:q,fill:c?q:"none","stroke-width":a.graph.strokeWidth()+(c?0:2*f)}),[a.tracker,a.markerGroup].forEach(function(a){a.addClass("highcharts-tracker").on("mouseover",
p).on("mouseout",function(a){k.onTrackerMouseOut(a)});b.cursor&&!g.styledMode&&a.css({cursor:b.cursor});if(v)a.on("touchstart",p)}));u(this,"afterDrawTracker")}};c.column&&(c.column.prototype.drawTracker=J.drawTrackerPoint);c.pie&&(c.pie.prototype.drawTracker=J.drawTrackerPoint);c.scatter&&(c.scatter.prototype.drawTracker=J.drawTrackerPoint);t(d.prototype,{setItemEvents:function(a,b,c){var d=this,e=d.chart.renderer.boxWrapper,g=a instanceof k,h="highcharts-legend-"+(g?"point":"series")+"-active",
n=d.chart.styledMode;(c?b:a.legendGroup).on("mouseover",function(){d.allItems.forEach(function(b){a!==b&&b.setState("inactive",!g)});a.setState("hover");a.visible&&e.addClass(h);n||b.css(d.options.itemHoverStyle)}).on("mouseout",function(){d.styledMode||b.css(m(a.visible?d.itemStyle:d.itemHiddenStyle));d.allItems.forEach(function(b){a!==b&&b.setState("",!g)});e.removeClass(h);a.setState()}).on("click",function(b){var c=function(){a.setVisible&&a.setVisible()};e.removeClass(h);b={browserEvent:b};a.firePointEvent?
a.firePointEvent("legendItemClick",b,c):u(a,"legendItemClick",b,c)})},createCheckboxForItem:function(a){a.checkbox=B("input",{type:"checkbox",className:"highcharts-legend-checkbox",checked:a.selected,defaultChecked:a.selected},this.options.itemCheckboxStyle,this.chart.container);E(a.checkbox,"click",function(b){u(a.series||a,"checkboxClick",{checked:b.target.checked,item:a},function(){a.select()})})}});t(G.prototype,{showResetZoom:function(){function a(){b.zoomOut()}var b=this,c=e.lang,d=b.options.chart.resetZoomButton,
g=d.theme,k=g.states,h="chart"===d.relativeTo||"spaceBox"===d.relativeTo?null:"plotBox";u(this,"beforeShowResetZoom",null,function(){b.resetZoomButton=b.renderer.button(c.resetZoom,null,null,a,g,k&&k.hover).attr({align:d.position.align,title:c.resetZoomTitle}).addClass("highcharts-reset-zoom").add().align(d.position,!1,h)});u(this,"afterShowResetZoom")},zoomOut:function(){u(this,"selection",{resetSelection:!0},this.zoom)},zoom:function(c){var d=this,e,g=d.pointer,k=!1,h=d.inverted?g.mouseDownX:g.mouseDownY,
m;!c||c.resetSelection?(d.axes.forEach(function(a){e=a.zoom()}),g.initiated=!1):c.xAxis.concat(c.yAxis).forEach(function(b){var c=b.axis,l=d.inverted?c.left:c.top,m=d.inverted?l+c.width:l+c.height,n=c.isXAxis,p=!1;if(!n&&h>=l&&h<=m||n||!a.defined(h))p=!0;g[n?"zoomX":"zoomY"]&&p&&(e=c.zoom(b.min,b.max),c.displayBtn&&(k=!0))});m=d.resetZoomButton;k&&!m?d.showResetZoom():!k&&n(m)&&(d.resetZoomButton=m.destroy());e&&d.redraw(b(d.options.chart.animation,c&&c.animation,100>d.pointCount))},pan:function(a,
b){var c=this,d=c.hoverPoints,e;u(this,"pan",{originalEvent:a},function(){d&&d.forEach(function(a){a.setState()});("xy"===b?[1,0]:[1]).forEach(function(b){b=c[b?"xAxis":"yAxis"][0];var d=b.horiz,g=a[d?"chartX":"chartY"],d=d?"mouseDownX":"mouseDownY",f=c[d],l=(b.pointRange||0)/2,k=b.reversed&&!c.inverted||!b.reversed&&c.inverted?-1:1,h=b.getExtremes(),m=b.toValue(f-g,!0)+l*k,k=b.toValue(f+b.len-g,!0)-l*k,n=k<m,f=n?k:m,m=n?m:k,k=Math.min(h.dataMin,l?h.min:b.toValue(b.toPixels(h.min)-b.minPixelPadding)),
l=Math.max(h.dataMax,l?h.max:b.toValue(b.toPixels(h.max)+b.minPixelPadding)),n=k-f;0<n&&(m+=n,f=k);n=m-l;0<n&&(m=l,f-=n);b.series.length&&f!==h.min&&m!==h.max&&(b.setExtremes(f,m,!1,!1,{trigger:"pan"}),e=!0);c[d]=g});e&&c.redraw(!1);h(c.container,{cursor:"move"})})}});t(k.prototype,{select:function(a,c){var d=this,e=d.series,g=e.chart;a=b(a,!d.selected);d.firePointEvent(a?"select":"unselect",{accumulate:c},function(){d.selected=d.options.selected=a;e.options.data[e.data.indexOf(d)]=d.options;d.setState(a&&
"select");c||g.getSelectedPoints().forEach(function(a){var b=a.series;a.selected&&a!==d&&(a.selected=a.options.selected=!1,b.options.data[b.data.indexOf(a)]=a.options,a.setState(g.hoverPoints&&b.options.inactiveOtherPoints?"inactive":""),a.firePointEvent("unselect"))})})},onMouseOver:function(a){var b=this.series.chart,c=b.pointer;a=a?c.normalize(a):c.getChartCoordinatesFromPoint(this,b.inverted);c.runPointActions(a,this)},onMouseOut:function(){var a=this.series.chart;this.firePointEvent("mouseOut");
this.series.options.inactiveOtherPoints||(a.hoverPoints||[]).forEach(function(a){a.setState()});a.hoverPoints=a.hoverPoint=null},importEvents:function(){if(!this.hasImportedEvents){var b=this,c=m(b.series.options.point,b.options).events;b.events=c;a.objectEach(c,function(c,d){a.isFunction(c)&&E(b,d,c)});this.hasImportedEvents=!0}},setState:function(a,c){var d=Math.floor(this.plotX),e=this.plotY,g=this.series,k=this.state,h=g.options.states[a||"normal"]||{},m=q[g.type].marker&&g.options.marker,f=m&&
!1===m.enabled,n=m&&m.states&&m.states[a||"normal"]||{},p=!1===n.enabled,w=g.stateMarkerGraphic,v=this.marker||{},x=g.chart,B=g.halo,y,E,F,G=m&&g.markerAttribs;a=a||"";if(!(a===this.state&&!c||this.selected&&"select"!==a||!1===h.enabled||a&&(p||f&&!1===n.enabled)||a&&v.states&&v.states[a]&&!1===v.states[a].enabled)){this.state=a;G&&(y=g.markerAttribs(this,a));if(this.graphic)k&&this.graphic.removeClass("highcharts-point-"+k),a&&this.graphic.addClass("highcharts-point-"+a),x.styledMode||(E=g.pointAttribs(this,
a),F=b(x.options.chart.animation,h.animation),g.options.inactiveOtherPoints&&((this.dataLabels||[]).forEach(function(a){a&&a.animate({opacity:E.opacity},F)}),this.connector&&this.connector.animate({opacity:E.opacity},F)),this.graphic.animate(E,F)),y&&this.graphic.animate(y,b(x.options.chart.animation,n.animation,m.animation)),w&&w.hide();else{if(a&&n){k=v.symbol||g.symbol;w&&w.currentSymbol!==k&&(w=w.destroy());if(w)w[c?"animate":"attr"]({x:y.x,y:y.y});else k&&(g.stateMarkerGraphic=w=x.renderer.symbol(k,
y.x,y.y,y.width,y.height).add(g.markerGroup),w.currentSymbol=k);!x.styledMode&&w&&w.attr(g.pointAttribs(this,a))}w&&(w[a&&x.isInsidePlot(d,e,x.inverted)?"show":"hide"](),w.element.point=this)}(a=h.halo)&&a.size?(B||(g.halo=B=x.renderer.path().add((this.graphic||w).parentGroup)),B.show()[c?"animate":"attr"]({d:this.haloPath(a.size)}),B.attr({"class":"highcharts-halo highcharts-color-"+b(this.colorIndex,g.colorIndex)+(this.className?" "+this.className:""),zIndex:-1}),B.point=this,x.styledMode||B.attr(t({fill:this.color||
g.color,"fill-opacity":a.opacity},a.attributes))):B&&B.point&&B.point.haloPath&&B.animate({d:B.point.haloPath(0)},null,B.hide);u(this,"afterSetState")}},haloPath:function(a){return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX)-a,this.plotY-a,2*a,2*a)}});t(p.prototype,{onMouseOver:function(){var a=this.chart,b=a.hoverSeries;if(b&&b!==this)b.onMouseOut();this.options.events.mouseOver&&u(this,"mouseOver");this.setState("hover");a.hoverSeries=this},onMouseOut:function(){var a=this.options,
b=this.chart,c=b.tooltip,d=b.hoverPoint;b.hoverSeries=null;if(d)d.onMouseOut();this&&a.events.mouseOut&&u(this,"mouseOut");!c||this.stickyTracking||c.shared&&!this.noSharedTooltip||c.hide();b.series.forEach(function(a){a.setState("",!0)})},setState:function(a,c){var d=this,e=d.options,g=d.graph,k=e.inactiveOtherPoints,h=e.states,m=e.lineWidth,f=e.opacity,n=b(h[a||"normal"]&&h[a||"normal"].animation,d.chart.options.chart.animation),e=0;a=a||"";if(d.state!==a&&([d.group,d.markerGroup,d.dataLabelsGroup].forEach(function(b){b&&
(d.state&&b.removeClass("highcharts-series-"+d.state),a&&b.addClass("highcharts-series-"+a))}),d.state=a,!d.chart.styledMode)){if(h[a]&&!1===h[a].enabled)return;a&&(m=h[a].lineWidth||m+(h[a].lineWidthPlus||0),f=b(h[a].opacity,f));if(g&&!g.dashstyle)for(h={"stroke-width":m},g.animate(h,n);d["zone-graph-"+e];)d["zone-graph-"+e].attr(h),e+=1;k||[d.group,d.markerGroup,d.dataLabelsGroup,d.labelBySeries].forEach(function(a){a&&a.animate({opacity:f},n)})}c&&k&&d.points&&d.points.forEach(function(b){b.setState&&
b.setState(a)})},setVisible:function(a,b){var c=this,d=c.chart,e=c.legendItem,g,k=d.options.chart.ignoreHiddenSeries,h=c.visible;g=(c.visible=a=c.options.visible=c.userOptions.visible=void 0===a?!h:a)?"show":"hide";["group","dataLabelsGroup","markerGroup","tracker","tt"].forEach(function(a){if(c[a])c[a][g]()});if(d.hoverSeries===c||(d.hoverPoint&&d.hoverPoint.series)===c)c.onMouseOut();e&&d.legend.colorizeItem(c,a);c.isDirty=!0;c.options.stacking&&d.series.forEach(function(a){a.options.stacking&&
a.visible&&(a.isDirty=!0)});c.linkedSeries.forEach(function(b){b.setVisible(a,!1)});k&&(d.isDirtyBox=!0);u(c,g);!1!==b&&d.redraw()},show:function(){this.setVisible(!0)},hide:function(){this.setVisible(!1)},select:function(a){this.selected=a=this.options.selected=void 0===a?!this.selected:a;this.checkbox&&(this.checkbox.checked=a);u(this,a?"select":"unselect")},drawTracker:J.drawTrackerGraph})});J(G,"parts/Responsive.js",[G["parts/Globals.js"]],function(a){var E=a.Chart,G=a.isArray,B=a.isObject,h=
a.pick,e=a.splat;E.prototype.setResponsive=function(e,h){var q=this.options.responsive,t=[],n=this.currentResponsive;!h&&q&&q.rules&&q.rules.forEach(function(g){void 0===g._id&&(g._id=a.uniqueKey());this.matchResponsiveRule(g,t,e)},this);h=a.merge.apply(0,t.map(function(e){return a.find(q.rules,function(a){return a._id===e}).chartOptions}));h.isResponsiveOptions=!0;t=t.toString()||void 0;t!==(n&&n.ruleIds)&&(n&&this.update(n.undoOptions,e,!0),t?(n=this.currentOptions(h),n.isResponsiveOptions=!0,this.currentResponsive=
{ruleIds:t,mergedOptions:h,undoOptions:n},this.update(h,e,!0)):this.currentResponsive=void 0)};E.prototype.matchResponsiveRule=function(a,e){var q=a.condition;(q.callback||function(){return this.chartWidth<=h(q.maxWidth,Number.MAX_VALUE)&&this.chartHeight<=h(q.maxHeight,Number.MAX_VALUE)&&this.chartWidth>=h(q.minWidth,0)&&this.chartHeight>=h(q.minHeight,0)}).call(this)&&e.push(a._id)};E.prototype.currentOptions=function(q){function t(n,g,d,m){var b;a.objectEach(n,function(a,n){if(!m&&-1<u.collectionsWithUpdate.indexOf(n))for(a=
e(a),d[n]=[],b=0;b<a.length;b++)g[n][b]&&(d[n][b]={},t(a[b],g[n][b],d[n][b],m+1));else B(a)?(d[n]=G(a)?[]:{},t(a,g[n]||{},d[n],m+1)):d[n]=h(g[n],null)})}var u=this,v={};t(q,this.options,v,0);return v}});J(G,"masters/highcharts.src.js",[G["parts/Globals.js"]],function(a){return a});G["masters/highcharts.src.js"]._modules=G;return G["masters/highcharts.src.js"]});
//# sourceMappingURL=highcharts.js.map
},{}],"VsMw":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    id: String,
    width: String,
    height: String,
    title: String,
    color: Array,
    data: {
      type: Array,
      required: true
    }
  },
  data: function data() {
    return {};
  },
  computed: {
    checkWidth: function checkWidth() {
      return this.width === undefined ? "100%" : this.width;
    },
    checkHeight: function checkHeight() {
      return this.height === undefined ? "290px" : this.height;
    }
  },
  methods: {
    getChart: function getChart() {
      _highcharts.default.chart(this.id, {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie"
        },
        title: {
          text: this.title
        },
        colors: this.color,
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        },
        plotOptions: {
          pie: {
            innerSize: 130,
            depth: 150,
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: [{
          name: "Brands",
          colorByPoint: true,
          data: this.data
        }]
      });
    }
  },
  mounted: function mounted() {
    this.getChart();
  }
};
exports.default = _default;
        var $f1a687 = exports.default || module.exports;
      
      if (typeof $f1a687 === 'function') {
        $f1a687 = $f1a687.options;
      }
    
        /* template */
        Object.assign($f1a687, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{style:('width: ' +
			_vm.checkWidth +
			'; height: ' +
			_vm.checkHeight +
			'; max-width: 400px; margin: 0 auto'),attrs:{"id":_vm.id}})}
var staticRenderFns = []

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"highcharts":"Dm41"}],"rH1J":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"X5NK":[function(require,module,exports) {
var global = arguments[3];
var process = require("process");
(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

},{"process":"rH1J"}],"YgSw":[function(require,module,exports) {
var global = arguments[3];
var scope = typeof global !== "undefined" && global || typeof self !== "undefined" && self || window;
var apply = Function.prototype.apply; // DOM APIs, for completeness

exports.setTimeout = function () {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};

exports.setInterval = function () {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};

exports.clearTimeout = exports.clearInterval = function (timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}

Timeout.prototype.unref = Timeout.prototype.ref = function () {};

Timeout.prototype.close = function () {
  this._clearFn.call(scope, this._id);
}; // Does not start the time, just sets up the members needed.


exports.enroll = function (item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function (item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function (item) {
  clearTimeout(item._idleTimeoutId);
  var msecs = item._idleTimeout;

  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout) item._onTimeout();
    }, msecs);
  }
}; // setimmediate attaches itself to the global object


require("setimmediate"); // On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.


exports.setImmediate = typeof self !== "undefined" && self.setImmediate || typeof global !== "undefined" && global.setImmediate || this && this.setImmediate;
exports.clearImmediate = typeof self !== "undefined" && self.clearImmediate || typeof global !== "undefined" && global.clearImmediate || this && this.clearImmediate;
},{"setimmediate":"X5NK"}],"CSrg":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mediaLog = _interopRequireDefault(require("../components/mediaLog"));

var _highchart = _interopRequireDefault(require("../components/highchart"));

var _timers = require("timers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  props: {
    showNewprojectNotif: Boolean,
    showTimesheetNotif: Boolean,
    imageProfile: String,
    project_name: String,
    username: String,
    nik: String,
    bu: String,
    iwo: String,
    start: String,
    deadline: String,
    spi: String,
    cpi: String,
    resource: String,
    max_resource: String,
    progress_project: "",
    progress_bast: "",
    j_bast: "",
    color: String
  },
  components: {
    log: _mediaLog.default,
    vChart: _highchart.default
  },
  data: function data() {
    return {
      isLoading: false,
      isFullPage: false,
      showInfo: false,
      showAction: false,
      entry: ENTRY,
      utilization: UTILIZATION,
      activity: ACTIVITY,
      currentPage: 1,
      maxPerPage: 10,
      totalResults: 100,
      showloader: false,
      bast: ""
    };
  },
  computed: {
    pageCount: function pageCount() {
      return Math.ceil(this.activity.length / this.maxPerPage);
    },
    pageOffset: function pageOffset() {
      var a = this.maxPerPage * this.currentPage;
      var b;

      if (this.activity.length > a) {
        b = this.activity.length - a;
        return this.activity.length - b;
      } else {
        b = a - this.activity.length;
        return a - b;
      }
    }
  },
  methods: {
    scrollTrigger: function scrollTrigger() {
      var _this = this;

      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio > 0 && _this.currentPage < _this.pageCount) {
            _this.showloader = true;
            _this.isLoading = true;
            (0, _timers.setTimeout)(function () {
              _this.currentPage += 1;
              _this.isLoading = false;
              _this.showloader = false;
            }, 2000);
          }
        });
      });
      observer.observe(this.$refs.infinitescrolltrigger);
    }
  },
  mounted: function mounted() {
    this.bast = this.progress_bast / this.j_bast * 100;
    this.scrollTrigger();
  }
};
exports.default = _default;
        var $78d955 = exports.default || module.exports;
      
      if (typeof $78d955 === 'function') {
        $78d955 = $78d955.options;
      }
    
        /* template */
        Object.assign($78d955, (function () {
          var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dashboard"},[_c('div',{staticClass:"columns",staticStyle:{"margin-bottom":"0px"}},[_c('div',{staticClass:"column is-section is-3-desktop is-4-tablet is-hidden-touch has-background-light"},[_c('section',{staticClass:"info user-info"},[_c('h5',{staticClass:"is-size-4 has-text-primary"},[_vm._v(_vm._s(_vm.project_name))]),_vm._v(" "),_c('p',{staticClass:"is-size-5"},[_c('b-tag',{attrs:{"type":"is-success","closable":false},on:{"close":function($event){_vm.isTag1Active = false}}},[_vm._v("\n\t\t\t\t\t\tIn Progress\n\t\t\t\t\t")])],1)]),_vm._v(" "),_c('section',{staticClass:"info user-bu"},[_c('div',{staticClass:"level"},[_c('div',{staticClass:"level-left"},[_c('div',[_c('label',{staticClass:"is-size-6 has-text-primary"},[_vm._v("Business Delivery")]),_vm._v(" "),_c('h5',{staticClass:"is-size-6"},[_vm._v(_vm._s(_vm.bu))])])])]),_vm._v(" "),_c('div',{staticClass:"level"},[_c('div',{staticClass:"level-left"},[_c('div',[_c('label',{staticClass:"is-size-6 has-text-primary"},[_vm._v("IWO")]),_vm._v(" "),_c('h5',{staticClass:"is-size-6"},[_vm._v(_vm._s(_vm.iwo))])])])]),_vm._v(" "),_c('div',{staticClass:"level"},[_c('div',{staticClass:"level-left"},[_c('div',[_c('label',{staticClass:"is-size-6 has-text-primary"},[_vm._v("Start")]),_vm._v(" "),_c('h5',{staticClass:"is-size-6"},[_vm._v(_vm._s(_vm.start))])])]),_vm._v(" "),_c('div',{staticClass:"level-item"},[_c('div',[_c('label',{staticClass:"is-size-6 has-text-primary"},[_vm._v("Deadline")]),_vm._v(" "),_c('h5',{staticClass:"is-size-6"},[_vm._v(_vm._s(_vm.deadline))])])])]),_vm._v(" "),_c('div',{staticClass:"level"},[_c('div',{staticClass:"level-left"},[_c('div',[_c('label',{staticClass:"is-size-6 has-text-primary"},[_vm._v("spi")]),_vm._v(" "),_c('h5',{staticClass:"is-size-6"},[_vm._v(_vm._s(_vm.spi))])])]),_vm._v(" "),_c('div',{staticClass:"level-item"},[_c('div',[_c('label',{staticClass:"is-size-6 has-text-primary"},[_vm._v("spi")]),_vm._v(" "),_c('h5',{staticClass:"is-size-6"},[_vm._v(_vm._s(_vm.cpi))])])])]),_vm._v(" "),_c('div',{staticClass:"level"},[_c('div',{staticClass:"level-left"},[_c('div',[_c('label',{staticClass:"is-size-6 has-text-primary"},[_vm._v("Allocated Resource")]),_vm._v(" "),_c('h5',{staticClass:"is-size-6"},[_vm._v(_vm._s(_vm.resource)+" of "+_vm._s(_vm.max_resource))])])])])]),_vm._v(" "),_c('section',{staticClass:"info user-bu"},[_c('label',{staticClass:"is-size-6 has-text-primary"},[_vm._v("Project Manager")]),_vm._v(" "),_c('log',{staticClass:"animated fadeIn",attrs:{"title":_vm.username,"thumbnail":"https://i.pinimg.com/originals/3a/48/27/3a4827b970f20b646f91c81ec65ec316.jpg"}},[_c('p',{attrs:{"slot":"body"},slot:"body"},[_c('label',{staticClass:"is-size-6"},[_c('div',[_vm._v("\n\t\t\t\t\t\t\t\t"+_vm._s(_vm.nik)+"\n\t\t\t\t\t\t\t")]),_vm._v(" "),_c('div',[_vm._v("\n\t\t\t\t\t\t\t\t"+_vm._s(_vm.bu)+"\n\t\t\t\t\t\t\t")])])])]),_vm._v(" "),_c('div',{staticStyle:{"margin-top":"10px"}},[_c('label',{staticClass:"is-size-7 has-text-primary"},[_vm._v("Progress (70%)")]),_vm._v(" "),_c('progress',{staticClass:"progress is-small is-success",attrs:{"max":"100"},domProps:{"value":_vm.progress_project}},[_vm._v(_vm._s(_vm.progress_project)+"%")]),_vm._v(" "),_c('label',{staticClass:"is-size-7 has-text-primary"},[_vm._v("BAST ("+_vm._s(_vm.progress_bast)+" of "+_vm._s(_vm.j_bast)+")")]),_vm._v(" "),_c('progress',{staticClass:"progress is-small is-success",attrs:{"max":"100"},domProps:{"value":_vm.bast}},[_vm._v(_vm._s(_vm.bast)+"%")])])],1)]),_vm._v(" "),_c('div',{staticClass:"column is-section"},[_c('section',{staticClass:"activity"},[_c('div',{staticClass:"tabs is-toggle is-fullwidth is-hidden-desktop"},[_c('ul',[_c('li',[_c('a',{on:{"click":function($event){_vm.showInfo = !_vm.showInfo}}},[_vm._m(0),_vm._v(" "),_c('span',[_vm._v("My Info")])])]),_vm._v(" "),_c('li',[_c('a',{on:{"click":function($event){_vm.showAction = !_vm.showAction}}},[_vm._m(1),_vm._v(" "),_c('span',[_vm._v("My Task")])])])])]),_vm._v(" "),_vm._m(2),_vm._v(" "),_c('hr',{staticStyle:{"margin-top":"5px"}}),_vm._v(" "),_vm._l((_vm.pageOffset),function(n,index){return _c('log',{key:index,staticClass:"animated fadeIn",attrs:{"title":_vm.activity[index].title,"subtitle":_vm.activity[index].subtitle,"thumbnail":_vm.activity[index].thumbnail}},[_c('p',{attrs:{"slot":"body"},slot:"body"},[_vm._v("\n\t\t\t\t\t\t"+_vm._s(_vm.activity[index].body)+"\n\t\t\t\t\t")])])}),_vm._v(" "),_c('div',{ref:"infinitescrolltrigger",attrs:{"id":"scroll-trigger"}}),_vm._v(" "),_c('hr',{staticStyle:{"margin-top":"5px"}}),_vm._v(" "),(_vm.showloader)?_c('section',[_c('b-notification',{staticStyle:{"background-color":"#fff","height":"50px"},attrs:{"closable":false}},[_c('b-loading',{attrs:{"is-full-page":_vm.isFullPage,"active":_vm.isLoading,"can-cancel":true},on:{"update:active":function($event){_vm.isLoading=$event}}})],1)],1):_vm._e()],2)]),_vm._v(" "),_c('div',{staticClass:"column is-section is-2-widescreen is-3-desktop is-hidden-touch has-background-light"},[_c('section',{staticClass:"info"},[_c('h5',{staticClass:"is-size-5"},[_vm._v("Member ("+_vm._s(_vm.resource)+"/"+_vm._s(_vm.max_resource)+")")]),_vm._v(" "),_c('hr',{staticStyle:{"margin-top":"5px","margin-bottom":"10px"}}),_vm._v(" "),_vm._m(3),_vm._v(" "),_vm._t("assign-member")],2),_vm._v(" "),_c('section',{staticClass:"info"},[_c('h5',{staticClass:"is-size-5"},[_vm._v("Documents")]),_vm._v(" "),_c('hr',{staticClass:"has-background-grey-lighter",staticStyle:{"margin-top":"5px","margin-bottom":"10px"}}),_vm._v(" "),_vm._t("documents")],2)])]),_vm._v(" "),_c('b-modal',{attrs:{"active":_vm.showInfo,"width":640,"scroll":"keep"},on:{"update:active":function($event){_vm.showInfo=$event}}},[_c('div',{staticClass:"card"},[_c('div',{staticClass:"card-image"},[_c('figure',{staticClass:"image is-square"},[_c('img',{attrs:{"src":_vm.imageProfile,"alt":"Image"}})])]),_vm._v(" "),_c('div',{staticClass:"card-content"},[_c('div',{staticClass:"media"},[_c('div',{staticClass:"media-content"},[_c('p',{staticClass:"title is-4"},[_vm._v(_vm._s(_vm.username))]),_vm._v(" "),_c('p',{staticClass:"subtitle is-6"},[_c('span',{staticClass:"mdi mdi-account-box-outline in-left"}),_vm._v("\n\t\t\t\t\t\t\t"+_vm._s(_vm.nik)+"\n\t\t\t\t\t\t")])])]),_vm._v(" "),_c('div',{staticClass:"content"},[_c('p',{staticClass:"title is-6"},[_vm._v("My Performance")]),_vm._v(" "),_c('p',[_vm._v("\n\t\t\t\t\t\tLorem ipsum dolor sit amet consectetur adipisicing\n\t\t\t\t\t\telit. Soluta illo, optio aliquid cum provident sit\n\t\t\t\t\t\tminus consequuntur alias, dicta commodi sed\n\t\t\t\t\t\tquibusdam tempora velit recusandae voluptatem. Nulla\n\t\t\t\t\t\tiste consequuntur hic.\n\t\t\t\t\t")])])])])]),_vm._v(" "),_c('b-modal',{attrs:{"active":_vm.showAction,"full-screen":"","scroll":"keep","can-cancel":false},on:{"update:active":function($event){_vm.showAction=$event}}},[_c('div',{staticClass:"modal-card",staticStyle:{"width":"auto"}},[_c('header',{staticClass:"modal-card-head"},[_c('p',{staticClass:"modal-card-title"},[_vm._v("My Task")]),_vm._v(" "),_c('a',{staticClass:"card-header-icon",attrs:{"aria-label":"close task"},on:{"click":function($event){_vm.showAction = !_vm.showAction}}},[_c('b-icon',{attrs:{"icon":"close-circle-outline","type":"is-dark"}})],1)]),_vm._v(" "),_c('section',{staticClass:"modal-card-body"},[_c('section',{staticClass:"info"},[_c('h5',{staticClass:"is-size-5"},[_vm._v("Recent Projects")]),_vm._v(" "),_c('hr',{staticClass:"has-background-grey-lighter",staticStyle:{"margin-top":"5px","margin-bottom":"10px"}}),_vm._v(" "),_vm._t("recent-project")],2),_vm._v(" "),_c('section',{staticClass:"info"},[_c('h5',{staticClass:"is-size-5"},[_vm._v("My Task: 11 Juli 2019")]),_vm._v(" "),_c('hr',{staticClass:"has-background-grey-lighter",staticStyle:{"margin-top":"5px","margin-bottom":"10px"}}),_vm._v(" "),_vm._t("today-task")],2)])])])],1)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"icon is-small"},[_c('span',{staticClass:"mdi mdi-information"})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"icon is-small"},[_c('span',{staticClass:"mdi mdi-format-list-checkbox"})])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('article',{staticClass:"message",staticStyle:{"margin-bottom":"0px","margin-top":"25px"}},[_c('div',{staticClass:"message-header"},[_c('p',[_vm._v("⚡ Activity")])])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"columns is-gapless is-multiline"},[_c('div',{staticClass:"column"},[_c('p',{staticClass:"image is-24x24"},[_c('img',{attrs:{"src":"https://i.pinimg.com/originals/3a/48/27/3a4827b970f20b646f91c81ec65ec316.jpg"}})])]),_vm._v(" "),_c('div',{staticClass:"column"},[_c('p',{staticClass:"image is-24x24"},[_c('img',{attrs:{"src":"https://i.pinimg.com/originals/3a/48/27/3a4827b970f20b646f91c81ec65ec316.jpg"}})])]),_vm._v(" "),_c('div',{staticClass:"column"},[_c('p',{staticClass:"image is-24x24"},[_c('img',{attrs:{"src":"https://i.pinimg.com/originals/3a/48/27/3a4827b970f20b646f91c81ec65ec316.jpg"}})])])])}]

          return {
            render: render,
            staticRenderFns: staticRenderFns,
            _compiled: true,
            _scopeId: null,
            functional: undefined
          };
        })());
      
},{"../components/mediaLog":"B9u9","../components/highchart":"VsMw","timers":"YgSw"}],"vl7d":[function(require,module,exports) {
"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _buefy = _interopRequireDefault(require("buefy"));

var _topNavBar = _interopRequireDefault(require("./vue/components/topNavBar.vue"));

var _projectdetailController = _interopRequireDefault(require("./vue/pages/projectdetailController.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue.default.use(_buefy.default);

new _vue.default({
  components: {
    NavBar: _topNavBar.default,
    Dashboard: _projectdetailController.default
  },
  el: '#vapp',
  data: function data() {
    return {
      hello: 'Hello World'
    };
  },
  computed: {
    sayHi: function sayHi() {
      return this.hello;
    }
  }
});
},{"vue":"f5S3","buefy":"Yp7S","./vue/components/topNavBar.vue":"V40F","./vue/pages/projectdetailController.vue":"CSrg"}]},{},["vl7d"], null)