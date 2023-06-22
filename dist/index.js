!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("FrontOrm",[],t):"object"==typeof exports?exports.FrontOrm=t():e.FrontOrm=t()}(self,(()=>(()=>{var e={681:function(e,t,r){var n,o;o=function(e){var t=["N","E","A","D"];function r(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function n(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0,configurable:!0})}function o(e,t,r){o.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0,configurable:!0}),Object.defineProperty(this,"rhs",{value:r,enumerable:!0,configurable:!0})}function i(e,t){i.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function a(e,t){a.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function s(e,t,r){s.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:r,enumerable:!0})}function l(e,t,r){var n=e.slice((r||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,n),e}function c(e){var t=typeof e;return"object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function h(e){var t=0;if(0===e.length)return t;for(var r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t&=t;return t}function u(e){var t=0,r=c(e);if("array"===r)return e.forEach((function(e){t+=u(e)})),t+h("[type: array, hash: "+t+"]");if("object"===r){for(var n in e)if(e.hasOwnProperty(n)){var o="[ type: object, key: "+n+", value hash: "+u(e[n])+"]";t+=h(o)}return t}return t+h("[ type: "+r+" ; value: "+e+"]")}function d(e,t,r,n,l,h,f,p){r=r||[],f=f||[];var g=(l=l||[]).slice(0);if(null!=h){if(n){if("function"==typeof n&&n(g,h))return;if("object"==typeof n){if(n.prefilter&&n.prefilter(g,h))return;if(n.normalize){var v=n.normalize(g,h,e,t);v&&(e=v[0],t=v[1])}}}g.push(h)}"regexp"===c(e)&&"regexp"===c(t)&&(e=e.toString(),t=t.toString());var m,b,y,w,k=typeof e,P=typeof t,O="undefined"!==k||f&&f.length>0&&f[f.length-1].lhs&&Object.getOwnPropertyDescriptor(f[f.length-1].lhs,h),j="undefined"!==P||f&&f.length>0&&f[f.length-1].rhs&&Object.getOwnPropertyDescriptor(f[f.length-1].rhs,h);if(!O&&j)r.push(new i(g,t));else if(!j&&O)r.push(new a(g,e));else if(c(e)!==c(t))r.push(new o(g,e,t));else if("date"===c(e)&&e-t!=0)r.push(new o(g,e,t));else if("object"===k&&null!==e&&null!==t){for(m=f.length-1;m>-1;--m)if(f[m].lhs===e){w=!0;break}if(w)e!==t&&r.push(new o(g,e,t));else{if(f.push({lhs:e,rhs:t}),Array.isArray(e)){for(p&&(e.sort((function(e,t){return u(e)-u(t)})),t.sort((function(e,t){return u(e)-u(t)}))),m=t.length-1,b=e.length-1;m>b;)r.push(new s(g,m,new i(void 0,t[m--])));for(;b>m;)r.push(new s(g,b,new a(void 0,e[b--])));for(;m>=0;--m)d(e[m],t[m],r,n,g,m,f,p)}else{var x=Object.keys(e).concat(Object.getOwnPropertySymbols(e)),$=Object.keys(t).concat(Object.getOwnPropertySymbols(t));for(m=0;m<x.length;++m)y=x[m],(w=$.indexOf(y))>=0?(d(e[y],t[y],r,n,g,y,f,p),$[w]=null):d(e[y],void 0,r,n,g,y,f,p);for(m=0;m<$.length;++m)(y=$[m])&&d(void 0,t[y],r,n,g,y,f,p)}f.length=f.length-1}}else e!==t&&("number"===k&&isNaN(e)&&isNaN(t)||r.push(new o(g,e,t)))}function f(e,t,r,n,o){var i=[];if(d(e,t,i,n,null,null,null,o),r)for(var a=0;a<i.length;++a)r(i[a]);return i}function p(e,t,r,n){var o=f(e,t,n?function(e){e&&n.push(e)}:void 0,r);return n||(o.length?o:void 0)}function g(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":g(o[r.path[n]],r.index,r.item);break;case"D":delete o[r.path[n]];break;case"E":case"N":o[r.path[n]]=r.rhs}}else switch(r.kind){case"A":g(e[t],r.index,r.item);break;case"D":e=l(e,t);break;case"E":case"N":e[t]=r.rhs}return e}function v(e,r,n){if(void 0===n&&r&&~t.indexOf(r.kind)&&(n=r),e&&n&&n.kind){for(var o=e,i=-1,a=n.path?n.path.length-1:0;++i<a;)void 0===o[n.path[i]]&&(o[n.path[i]]=void 0!==n.path[i+1]&&"number"==typeof n.path[i+1]?[]:{}),o=o[n.path[i]];switch(n.kind){case"A":n.path&&void 0===o[n.path[i]]&&(o[n.path[i]]=[]),g(n.path?o[n.path[i]]:o,n.index,n.item);break;case"D":delete o[n.path[i]];break;case"E":case"N":o[n.path[i]]=n.rhs}}}function m(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":m(o[r.path[n]],r.index,r.item);break;case"D":case"E":o[r.path[n]]=r.lhs;break;case"N":delete o[r.path[n]]}}else switch(r.kind){case"A":m(e[t],r.index,r.item);break;case"D":case"E":e[t]=r.lhs;break;case"N":e=l(e,t)}return e}return r(o,n),r(i,n),r(a,n),r(s,n),Object.defineProperties(p,{diff:{value:p,enumerable:!0},orderIndependentDiff:{value:function(e,t,r,n){var o=f(e,t,n?function(e){e&&n.push(e)}:void 0,r,!0);return n||(o.length?o:void 0)},enumerable:!0},observableDiff:{value:f,enumerable:!0},orderIndependentObservableDiff:{value:function(e,t,r,n,o,i,a){return d(e,t,r,n,o,i,a,!0)},enumerable:!0},orderIndepHash:{value:u,enumerable:!0},applyDiff:{value:function(e,t,r){e&&t&&f(e,t,(function(n){r&&!r(e,t,n)||v(e,t,n)}))},enumerable:!0},applyChange:{value:v,enumerable:!0},revertChange:{value:function(e,t,r){if(e&&t&&r&&r.kind){var n,o,i=e;for(o=r.path.length-1,n=0;n<o;n++)void 0===i[r.path[n]]&&(i[r.path[n]]={}),i=i[r.path[n]];switch(r.kind){case"A":m(i[r.path[n]],r.index,r.item);break;case"D":case"E":i[r.path[n]]=r.lhs;break;case"N":delete i[r.path[n]]}}},enumerable:!0},isConflict:{value:function(){return"undefined"!=typeof $conflict},enumerable:!0}}),p.DeepDiff=p,e&&(e.DeepDiff=p),p}(this),void 0===(n=function(){return o}.call(t,r,t,e))||(e.exports=n)}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,r),i.exports}r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};return(()=>{"use strict";r.r(n),r.d(n,{BaseField:()=>h,BaseType:()=>o,BooleanField:()=>d,Collection:()=>i,CollectionField:()=>w,Empty:()=>k,Entity:()=>b,EntityField:()=>p,EntityManager:()=>c,NumberField:()=>u,PrimaryKey:()=>g,StringField:()=>v,getBaseModel:()=>m});var e=r(681),t=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{l(n.next(e))}catch(e){i(e)}}function s(e){try{l(n.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}l((n=n.apply(e,t||[])).next())}))};class o{constructor(e,r){this.em=e,this.findCb=r,this.find=(e,n)=>t(this,void 0,void 0,(function*(){const t=yield r(e);return this.convertResult(t,n)}))}convertResult(e,t){return console.warn(e,t,"add convertResult method"),new Proxy({},{})}getModelView(e,r){return this.em._createProxy(e,r,(n=>t(this,void 0,void 0,(function*(){const t=yield e.$get(r);this.em.setStorageValue(e,r,t),n()}))))}}class i extends o{convertResult(e,t){if(!Array.isArray(e))throw new Error("Invalid result. The result must be array");if(e.some((e=>!e[t.$getPkName()])))throw new Error("Invalid result. Missing primary key");return e.forEach((e=>{this.em.setStorageValue(t,e[t.$getPkName()],e)})),e.map((e=>this.getModelView(t,e[t.$getPkName()])))}}var a=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{l(n.next(e))}catch(e){i(e)}}function s(e){try{l(n.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}l((n=n.apply(e,t||[])).next())}))};const s=(e,t)=>Object.create({},{$em:{writable:!1,configurable:!1,enumerable:!1,value:e},$model:{writable:!1,configurable:!1,enumerable:!1,value:t},$refreshCollection:{writable:!1,configurable:!1,enumerable:!1,value(e){return a(this,void 0,void 0,(function*(){const t=this.$em.collectionCache.get(e);if(void 0===t)return;null===t.promise&&(t.promise=new Promise((e=>a(this,void 0,void 0,(function*(){const r=yield t.method(t.options,this.$model);e(r),t.promise=null})))));const r=yield t.promise;e.splice(0,e.length),r.forEach((t=>{e.push(t)}))}))}},_methodsHandler:{writable:!1,configurable:!1,enumerable:!1,value(e,t){return a(this,void 0,void 0,(function*(){const r=yield t.find(e,this.$model);let n=r;return t instanceof i&&(n=this.$em._setReactivity(r),this.$em.collectionCache.set(n,{options:e,method:t.find,repository:this,promise:null}),this.$em.onAddCollection(this,new WeakRef(n))),n}))}}});var l=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{l(n.next(e))}catch(e){i(e)}}function s(e){try{l(n.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}l((n=n.apply(e,t||[])).next())}))};class c{constructor(e=(e=>e)){this.models={},this.repositories={},this.storage={},this.collectionCache=new WeakMap,this._setReactivity=e,this.reverseStorageCache=new WeakMap;const t=this;this.storageCache=new Proxy(new WeakMap,{get:(e,r)=>"set"===r?(r,n)=>{const o=e.set.call(e,r,t._setReactivity(n));return t.reverseStorageCache.set(e.get.call(e,r),new WeakRef(r)),o}:"get"===r?e.get.bind(e):void 0}),this.commits=[],this.pending=null,this.removed=void 0,this.onAddModelData=()=>{},this.onAddCollection=()=>{},this.hooks={preFlush:e=>e,get:(e,t)=>l(this,void 0,void 0,(function*(){if(e&&t)throw new Error("Add get hook");return""})),create:(e,t)=>l(this,void 0,void 0,(function*(){if(e&&t)throw new Error("Add create hook");return""})),update:(e,t)=>l(this,void 0,void 0,(function*(){if(e&&t)throw new Error("Add update hook");return""})),delete:(e,t)=>l(this,void 0,void 0,(function*(){if(e&&t)throw new Error("Add delete hook");return""}))},this.defaultClasses={common:{getBaseModel:m,getBaseRepository:s},fields:{BooleanField:d,NumberField:u,PrimaryKey:g,StringField:v,EntityField:p,CollectionField:w},types:{Collection:i,Entity:b}}}setHooks(e){this.hooks=Object.assign(Object.assign({},this.hooks),e)}setModel(e,t){const r=m(this),n=e(this),o=Object.create(r,this._convertValueToPropertyDescriptorMap(Object.entries(n)));o.$setName(e.name),this.storage[o.$getName()]={},this.models[o.$getName()]=o;const i=s(this,o),a=Object.create(i,this._convertValueToPropertyDescriptorMap(Object.entries(t).map((([e,t])=>[e,e=>i._methodsHandler(e,t)]))));this.repositories[o.$getName()]=a}getModel(e){const t=this.models[e];if(void 0===t)throw new Error("The model does not exist");return t}getRepository(e){const t=this.repositories[e];if(void 0===t)throw new Error("The model does not exist");return t}getStorageModel(e){const t=this.storage[e];if(void 0===t)throw new Error("The model does not exist");return t}_createEmptyModelData(e){const t=Object.entries(e).map((([e])=>[e,new k]));return Object.create(e,this._convertValueToPropertyDescriptorMap(t))}setStorageValue(e,t,r){const n=this.getStorageModel(e.$getName());let o=n[t];void 0===o&&(n[t]={pk:t},o=n[t],this.onAddModelData(e,t));const i=Object.entries(r).reduce(((t,[r,n])=>(void 0!==e[r]&&(t[r]=e[r].link(n)),t)),{}),a=this._convertValueToPropertyDescriptorMap(Object.entries(i));let s=this.storageCache.get(o);return void 0===s&&(this.storageCache.set(o,this._createEmptyModelData(e)),s=this.storageCache.get(o)),Object.entries(a).forEach((([e,t])=>{s[e]=t.value})),this.storageCache.get(o)}_convertValueToPropertyDescriptorMap(e){return e.reduce(((e,[t,r])=>(e[t]={enumerable:!0,configurable:!0,writable:!0,value:r},e)),{})}_convertValue(e){return Object.entries(e).reduce(((e,[t,r])=>("string"==typeof r||"number"==typeof r||"boolean"==typeof r||null==r?e[t]=r:Array.isArray(r)?e[t]=r.map((e=>e._target)):void 0!==r._target&&(e[t]=r._target),e)),{})}put(t,r){let n={},o={};if(void 0!==r._target){const e=r;if(n=this.reverseStorageCache.get(e._target).deref(),void 0===n)throw new Error("Unexpected use of WeakRef");o=Object.assign({},r._target)}let i=t;Object.keys(i).length&&(i=Object.assign(Object.assign({},o),this._convertValue(t)));const a=(0,e.observableDiff)(o,i,(e=>{if("lhs"in e&&"rhs"in e){const t=[...e.path],r=t.pop(),n=(null==t?void 0:t.reduce(((e,t)=>e[t]),o))||{},a=e;void 0!==n.$getPkName&&r===n.$getPkName()&&a.lhs!=a.rhs&&(Object.defineProperty(e,"path",{value:t,enumerable:!0,configurable:!0}),Object.defineProperty(e,"lhs",{value:n,enumerable:!0,configurable:!0}),Object.defineProperty(e,"rhs",{value:(null==t?void 0:t.reduce(((e,t)=>e[t]),i))||{},enumerable:!0,configurable:!0}))}}));if(void 0===a)return r;this.commits.push({cacheKey:n,diffs:a});let s=this.storageCache.get(n);return void 0===s&&(this.storageCache.set(n,this._createEmptyModelData(r)),s=this.storageCache.get(n)),a.forEach((t=>{(0,e.applyChange)(s,!0,t)})),this.storageCache.set(n,s),this._createProxyByCacheKey(n)}post(e,t){return this.put(e,t)}remove(e){return this.put({},e)}flush(){return l(this,void 0,void 0,(function*(){const t=this.hooks.preFlush(this.commits).reduce(((e,t)=>{const r=e.get(t.cacheKey);return void 0===r?e.set(t.cacheKey,t):t.diffs.forEach((e=>{r.diffs.push(e)})),e}),new Map);for(const[r,n]of Array.from(t)){const t={};n.diffs.forEach((function(r){(0,e.applyChange)(t,!0,r)}));const o=this.storageCache.get(r);let i;i=void 0===r.pk?o.$create(t,n):0===Object.keys(o).length?o.$delete(r.pk,n):o.$update(t,n),yield i.then((e=>{0===Object.keys(o).length?(delete r.pk,delete this.getStorageModel(o.$getName())[e]):(r.pk=e,o[o.$getPkName()]=e,this.getStorageModel(o.$getName())[e]=r)}))}this.commits=[]}))}revert(t=1){this.commits.splice(-t).reverse().forEach((({cacheKey:t,diffs:r})=>{const n=this.storageCache.get(t);r.forEach((t=>{(0,e.revertChange)(n,!0,t)}))}))}revertAll(){this.revert(this.commits.length)}checkModelDataByPk(e,t){const r=this.getStorageModel(e.$getName())[t];return void 0!==r&&void 0!==this.storageCache.get(r)}_updateDataByCommits(t,r,n){const o=n;if(void 0===this.getStorageModel(t.$getName())[r])return o;const i=this.commits.filter((e=>e.cacheKey.pk===r));return 0===i.length||i.forEach((({diffs:t})=>{t.forEach((t=>{(0,e.applyChange)(o,!0,t)}))})),o}_createProxyByCacheKey(e,t=(e=>{e()}),r=(()=>{})){const n=this,o=this.storageCache.get(e);return new Proxy(o,{get(o,i,a){if("_target"===i)return o;if(Object.hasOwn(o,i)){const a=n.storageCache.get(e);if(void 0===a)throw new Error("Logic error");return a[i]instanceof k?(void 0===e.promise&&(e.promise=new Promise((n=>{t((()=>{r(),n(null),delete e.promise}))}))),n.pending):a[i]instanceof h?n.removed:Object.getPrototypeOf(o)[i].view(a[i])}return Reflect.get(o,i,a)},set(e,t,r,n){if(t in e)throw new Error("Use update method");return Reflect.set(e,t,r,n),!0}})}_createProxy(e,t,r){const n=this.getStorageModel(e.$getName());return void 0===n[t]&&this.setStorageValue(e,t,{}),this._createProxyByCacheKey(n[t],r,(()=>{}))}}class h{constructor(e){this.em=e}view(e){return e}link(e){return e}}class u extends h{}class d extends h{}var f=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{l(n.next(e))}catch(e){i(e)}}function s(e){try{l(n.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}l((n=n.apply(e,t||[])).next())}))};class p extends h{constructor(e,t,r=(e=>e)){super(e),this.targetModelName=t,this.convertValueToPk=r}get targetModel(){return this.em.getModel(this.targetModelName)}view(e){if(null===e)return e;const t=this.em.reverseStorageCache.get(e);if(void 0===t)throw new Error("Logic error");const r=t.deref();if(void 0===r)throw new Error("Unexpected use of WeakRef");const n=r.pk;let o=e=>f(this,void 0,void 0,(function*(){e()}));if(void 0!==n){const e=this.targetModel;o=t=>f(this,void 0,void 0,(function*(){const r=yield e.$get(n);this.em.setStorageValue(e,n,r),t()}))}return this.em._createProxyByCacheKey(r,o)}link(e){if(null===e)return null;const t=this.convertValueToPk(e),r=this.em.getStorageModel(this.targetModel.$getName())[t];return void 0===r?this.em.setStorageValue(this.targetModel,t,{[this.targetModel.$getPkName()]:t}):this.em.storageCache.get(r)}}class g extends h{}class v extends h{}const m=e=>Object.create({},{$em:{writable:!1,configurable:!1,enumerable:!1,value:e},_pkName:{writable:!0,configurable:!1,enumerable:!1,value:null},_name:{writable:!0,configurable:!1,enumerable:!1,value:null},$setName:{writable:!1,configurable:!1,enumerable:!1,value(e){return Object.defineProperty(this,"_name",{writable:!1,configurable:!1,enumerable:!1,value:e})}},$getName:{writable:!1,configurable:!1,enumerable:!1,value(){if(!this._name)throw new Error("Logic error");return this._name}},$getPkName:{writable:!1,configurable:!1,enumerable:!1,value(){if(null===this._pkName){let e=Object.keys(this).find((e=>this[e]instanceof g));if("string"!=typeof e){const t=Object.getPrototypeOf(this);if(e=Object.keys(t).find((e=>t[e]instanceof g)),"string"!=typeof e)throw new Error("Add PrimaryKey")}Object.defineProperty(this,"_pkName",{writable:!1,configurable:!1,enumerable:!1,value:e})}return this._pkName}},$get:{writable:!1,configurable:!1,enumerable:!1,value(e){return this.$em.hooks.get(this,e)}},$create:{writable:!1,configurable:!1,enumerable:!1,value(e,t){return this.$em.hooks.create(this,e,t)}},$update:{writable:!1,configurable:!1,enumerable:!1,value(e,t){return this.$em.hooks.update(this,e,t)}},$delete:{writable:!1,configurable:!1,enumerable:!1,value(e,t){return this.$em.hooks.delete(this,e,t)}},$refresh:{writable:!1,configurable:!1,enumerable:!1,value(e){return t=this,r=void 0,o=function*(){const t=yield this.$get(e),r=this.$em._updateDataByCommits(this,e,t);let n=this.$getName();this.$em.setStorageValue(this.$em.getModel(n),e,r)},new((n=void 0)||(n=Promise))((function(e,i){function a(e){try{l(o.next(e))}catch(e){i(e)}}function s(e){try{l(o.throw(e))}catch(e){i(e)}}function l(t){var r;t.done?e(t.value):(r=t.value,r instanceof n?r:new n((function(e){e(r)}))).then(a,s)}l((o=o.apply(t,r||[])).next())}));var t,r,n,o}}});class b extends o{convertResult(e,t){const r=e[t.$getPkName()];if(void 0===r)throw new Error("Invalid result. Missing primary key");return this.em.setStorageValue(t,r,e),this.getModelView(t,r)}}var y=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{l(n.next(e))}catch(e){i(e)}}function s(e){try{l(n.throw(e))}catch(e){i(e)}}function l(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}l((n=n.apply(e,t||[])).next())}))};class w extends h{constructor(e,t,r=(e=>e)){super(e),this.targetModelName=t,this.convertValueToPk=r}get targetModel(){return this.em.getModel(this.targetModelName)}view(e){return new Proxy(e.map((e=>{const t=this.em.reverseStorageCache.get(e);if(void 0===t)throw new Error("Logic error");const r=t.deref();if(void 0===r)throw new Error("Unexpected use of WeakRef");const n=r.pk;let o=e=>y(this,void 0,void 0,(function*(){e()}));if(void 0!==n){const e=this.targetModel;o=t=>y(this,void 0,void 0,(function*(){const r=yield e.$get(n);this.em.setStorageValue(e,n,r),t()}))}return this.em._createProxyByCacheKey(r,o)})),{get(e,t,r){if(["push","pop","shift","unshift"].includes(t))throw new Error("Use update method");return Reflect.get(e,t,r)}})}link(e){return e.map((e=>{const t=this.convertValueToPk(e),r=this.em.getStorageModel(this.targetModel.$getName())[t];return void 0===r?this.em.setStorageValue(this.targetModel,t,{[this.targetModel.$getPkName()]:t}):this.em.storageCache.get(r)}))}}class k{constructor(){}}})(),n})()));