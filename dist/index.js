!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("FrontOrm",[],t):"object"==typeof exports?exports.FrontOrm=t():e.FrontOrm=t()}(self,(()=>(()=>{var e={681:function(e,t,r){var n,o;o=function(e){var t=["N","E","A","D"];function r(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function n(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0,configurable:!0})}function o(e,t,r){o.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0,configurable:!0}),Object.defineProperty(this,"rhs",{value:r,enumerable:!0,configurable:!0})}function i(e,t){i.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function a(e,t){a.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function s(e,t,r){s.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:r,enumerable:!0})}function c(e,t,r){var n=e.slice((r||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,n),e}function l(e){var t=typeof e;return"object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function h(e){var t=0;if(0===e.length)return t;for(var r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t&=t;return t}function u(e){var t=0,r=l(e);if("array"===r)return e.forEach((function(e){t+=u(e)})),t+h("[type: array, hash: "+t+"]");if("object"===r){for(var n in e)if(e.hasOwnProperty(n)){var o="[ type: object, key: "+n+", value hash: "+u(e[n])+"]";t+=h(o)}return t}return t+h("[ type: "+r+" ; value: "+e+"]")}function f(e,t,r,n,c,h,d,g){r=r||[],d=d||[];var p=(c=c||[]).slice(0);if(null!=h){if(n){if("function"==typeof n&&n(p,h))return;if("object"==typeof n){if(n.prefilter&&n.prefilter(p,h))return;if(n.normalize){var v=n.normalize(p,h,e,t);v&&(e=v[0],t=v[1])}}}p.push(h)}"regexp"===l(e)&&"regexp"===l(t)&&(e=e.toString(),t=t.toString());var m,y,b,w,k=typeof e,O=typeof t,P="undefined"!==k||d&&d.length>0&&d[d.length-1].lhs&&Object.getOwnPropertyDescriptor(d[d.length-1].lhs,h),x="undefined"!==O||d&&d.length>0&&d[d.length-1].rhs&&Object.getOwnPropertyDescriptor(d[d.length-1].rhs,h);if(!P&&x)r.push(new i(p,t));else if(!x&&P)r.push(new a(p,e));else if(l(e)!==l(t))r.push(new o(p,e,t));else if("date"===l(e)&&e-t!=0)r.push(new o(p,e,t));else if("object"===k&&null!==e&&null!==t){for(m=d.length-1;m>-1;--m)if(d[m].lhs===e){w=!0;break}if(w)e!==t&&r.push(new o(p,e,t));else{if(d.push({lhs:e,rhs:t}),Array.isArray(e)){for(g&&(e.sort((function(e,t){return u(e)-u(t)})),t.sort((function(e,t){return u(e)-u(t)}))),m=t.length-1,y=e.length-1;m>y;)r.push(new s(p,m,new i(void 0,t[m--])));for(;y>m;)r.push(new s(p,y,new a(void 0,e[y--])));for(;m>=0;--m)f(e[m],t[m],r,n,p,m,d,g)}else{var j=Object.keys(e).concat(Object.getOwnPropertySymbols(e)),M=Object.keys(t).concat(Object.getOwnPropertySymbols(t));for(m=0;m<j.length;++m)b=j[m],(w=M.indexOf(b))>=0?(f(e[b],t[b],r,n,p,b,d,g),M[w]=null):f(e[b],void 0,r,n,p,b,d,g);for(m=0;m<M.length;++m)(b=M[m])&&f(void 0,t[b],r,n,p,b,d,g)}d.length=d.length-1}}else e!==t&&("number"===k&&isNaN(e)&&isNaN(t)||r.push(new o(p,e,t)))}function d(e,t,r,n,o){var i=[];if(f(e,t,i,n,null,null,null,o),r)for(var a=0;a<i.length;++a)r(i[a]);return i}function g(e,t,r,n){var o=d(e,t,n?function(e){e&&n.push(e)}:void 0,r);return n||(o.length?o:void 0)}function p(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":p(o[r.path[n]],r.index,r.item);break;case"D":delete o[r.path[n]];break;case"E":case"N":o[r.path[n]]=r.rhs}}else switch(r.kind){case"A":p(e[t],r.index,r.item);break;case"D":e=c(e,t);break;case"E":case"N":e[t]=r.rhs}return e}function v(e,r,n){if(void 0===n&&r&&~t.indexOf(r.kind)&&(n=r),e&&n&&n.kind){for(var o=e,i=-1,a=n.path?n.path.length-1:0;++i<a;)void 0===o[n.path[i]]&&(o[n.path[i]]=void 0!==n.path[i+1]&&"number"==typeof n.path[i+1]?[]:{}),o=o[n.path[i]];switch(n.kind){case"A":n.path&&void 0===o[n.path[i]]&&(o[n.path[i]]=[]),p(n.path?o[n.path[i]]:o,n.index,n.item);break;case"D":delete o[n.path[i]];break;case"E":case"N":o[n.path[i]]=n.rhs}}}function m(e,t,r){if(r.path&&r.path.length){var n,o=e[t],i=r.path.length-1;for(n=0;n<i;n++)o=o[r.path[n]];switch(r.kind){case"A":m(o[r.path[n]],r.index,r.item);break;case"D":case"E":o[r.path[n]]=r.lhs;break;case"N":delete o[r.path[n]]}}else switch(r.kind){case"A":m(e[t],r.index,r.item);break;case"D":case"E":e[t]=r.lhs;break;case"N":e=c(e,t)}return e}return r(o,n),r(i,n),r(a,n),r(s,n),Object.defineProperties(g,{diff:{value:g,enumerable:!0},orderIndependentDiff:{value:function(e,t,r,n){var o=d(e,t,n?function(e){e&&n.push(e)}:void 0,r,!0);return n||(o.length?o:void 0)},enumerable:!0},observableDiff:{value:d,enumerable:!0},orderIndependentObservableDiff:{value:function(e,t,r,n,o,i,a){return f(e,t,r,n,o,i,a,!0)},enumerable:!0},orderIndepHash:{value:u,enumerable:!0},applyDiff:{value:function(e,t,r){e&&t&&d(e,t,(function(n){r&&!r(e,t,n)||v(e,t,n)}))},enumerable:!0},applyChange:{value:v,enumerable:!0},revertChange:{value:function(e,t,r){if(e&&t&&r&&r.kind){var n,o,i=e;for(o=r.path.length-1,n=0;n<o;n++)void 0===i[r.path[n]]&&(i[r.path[n]]={}),i=i[r.path[n]];switch(r.kind){case"A":m(i[r.path[n]],r.index,r.item);break;case"D":case"E":i[r.path[n]]=r.lhs;break;case"N":delete i[r.path[n]]}}},enumerable:!0},isConflict:{value:function(){return"undefined"!=typeof $conflict},enumerable:!0}}),g.DeepDiff=g,e&&(e.DeepDiff=g),g}(this),void 0===(n=function(){return o}.call(t,r,t,e))||(e.exports=n)}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var i=t[n]={exports:{}};return e[n].call(i.exports,i,i.exports,r),i.exports}r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};return(()=>{"use strict";r.r(n),r.d(n,{BaseField:()=>i,BaseType:()=>v,BooleanField:()=>s,Collection:()=>m,CollectionField:()=>w,Entity:()=>y,EntityField:()=>l,EntityManager:()=>o,NumberField:()=>a,PrimaryKey:()=>h,Repository:()=>g,StringField:()=>u,getBaseModel:()=>f});var e=r(681),t=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{c(n.next(e))}catch(e){i(e)}}function s(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}c((n=n.apply(e,t||[])).next())}))};class o{constructor(e=(e=>e)){this.models={},this.repositories={},this.storage={},this.collectionCache=new WeakMap,this._setReactivity=e,this.reverseStorageCache=new WeakMap;const r=this;this.storageCache=new Proxy(new WeakMap,{get:(e,t,n)=>"set"===t?(t,n)=>{const o=e.set.call(e,t,r._setReactivity(n));return r.reverseStorageCache.set(e.get.call(e,t),new WeakRef(t)),o}:"get"===t?e.get.bind(e):Reflect.get(e,t,n)}),this.commits=[],this.pending=null,this.onAddModelData=()=>{},this.onAddCollection=()=>{},this.hooks={preFlush:e=>e,get:(e,r)=>t(this,void 0,void 0,(function*(){if(e&&r)throw new Error("Add get hook");return""})),create:(e,r,n)=>t(this,void 0,void 0,(function*(){if(e&&r&&n)throw new Error("Add create hook");return""})),update:(e,r,n)=>t(this,void 0,void 0,(function*(){if(e&&r&&n)throw new Error("Add update hook");return""})),delete:(e,r,n)=>t(this,void 0,void 0,(function*(){if(e&&r&&n)throw new Error("Add delete hook");return""}))},this.defaultClasses={common:{getBaseModel:f,Repository:g},fields:{BooleanField:s,NumberField:a,PrimaryKey:h,StringField:u,EntityField:l,CollectionField:w},types:{Collection:m,Entity:y}}}setHooks(e){this.hooks=Object.assign(Object.assign({},this.hooks),e)}setModel(e,t){const r=f(this),n=e(this),o=Object.create(r,this._convertValueToPropertyDescriptorMap(Object.entries(n)));o.$setName(e.name),this.storage[o.$getName()]={},this.models[o.$getName()]=o,this.repositories[o.$getName()]=new g(this,o,t)}getModel(e){const t=this.models[e];if(void 0===t)throw new Error("The model does not exist");return t}getRepository(e){const t=this.repositories[e];if(void 0===t)throw new Error("The model does not exist");return t}getStorageModel(e){const t=this.storage[e];if(void 0===t)throw new Error("The model does not exist");return t}setStorageValue(e,t,r){const n=this.getStorageModel(e.$getName());let o=n[t];void 0===o&&(n[t]={pk:t},o=n[t],this.onAddModelData(e,t));const i=Object.entries(r).reduce(((t,[r,n])=>(void 0!==e[r]&&(t[r]=e[r].link(n)),t)),{}),a=this._convertValueToPropertyDescriptorMap(Object.entries(i)),s=this.storageCache.get(o);return void 0===s?this.storageCache.set(o,Object.create(e,a)):Object.entries(a).forEach((([e,t])=>{s[e]=t.value})),this.storageCache.get(o)}_convertValueToPropertyDescriptorMap(e){return e.reduce(((e,[t,r])=>(e[t]={enumerable:!0,configurable:!0,writable:!0,value:r},e)),{})}_convertValue(e){return Object.entries(e).reduce(((e,[t,r])=>"string"==typeof r||"number"==typeof r||"boolean"==typeof r||null===r?(e[t]=r,e):Array.isArray(r)?(e[t]=r.map((e=>e._target)),e):void 0!==r._target?(e[t]=r._target,e):e),{})}put(t,r){let n={},o={};if(void 0!==r._target){const e=r;if(n=this.reverseStorageCache.get(e._target).deref(),void 0===n)throw new Error("Unexpected use of WeakRef");o=Object.assign({},r._target)}let i=t;Object.keys(i).length&&(i=Object.assign(Object.assign({},o),this._convertValue(t)));const a=(0,e.observableDiff)(o,i,(e=>{if("lhs"in e&&"rhs"in e){const t=[...e.path],r=t.pop(),n=(null==t?void 0:t.reduce(((e,t)=>e[t]),o))||{},a=e;void 0!==n.$getPkName&&r===n.$getPkName()&&a.lhs!=a.rhs&&(Object.defineProperty(e,"path",{value:t,enumerable:!0,configurable:!0}),Object.defineProperty(e,"lhs",{value:n,enumerable:!0,configurable:!0}),Object.defineProperty(e,"rhs",{value:(null==t?void 0:t.reduce(((e,t)=>e[t]),i))||{},enumerable:!0,configurable:!0}))}}));if(void 0===a)return r;this.commits.push({cacheKey:n,diffs:a});let s=this.storageCache.get(n);return void 0===s&&(this.storageCache.set(n,Object.create(r)),s=this.storageCache.get(n)),a.forEach((t=>{(0,e.applyChange)(s,!0,t)})),this.storageCache.set(n,s),this._createProxyByCacheKey(n)}post(e,t){return this.put(e,t)}remove(e){return this.put({},e)}flush(){return t(this,void 0,void 0,(function*(){const t=this.hooks.preFlush(this.commits).reduce(((e,t)=>{const r=e.get(t.cacheKey);return void 0===r?e.set(t.cacheKey,t):t.diffs.forEach((e=>{r.diffs.push(e)})),e}),new Map);for(const[r,n]of Array.from(t)){const t={};n.diffs.forEach((function(r){(0,e.applyChange)(t,!0,r)}));const o=this.storageCache.get(r);let i;i=void 0===r.pk?o.$create(t,n):0===Object.keys(o).length?o.$delete(r.pk,n):o.$update(t,n),yield i.then((e=>{0===Object.keys(o).length?(delete r.pk,delete this.getStorageModel(o.$getName())[e]):(r.pk=e,o[o.$getPkName()]=e,this.getStorageModel(o.$getName())[e]=r)}))}this.commits=[]}))}revert(t=1){this.commits.splice(-t).reverse().forEach((({cacheKey:t,diffs:r})=>{const n=this.storageCache.get(t);r.forEach((t=>{(0,e.revertChange)(n,!0,t)}))}))}revertAll(){this.revert(this.commits.length)}_updateDataByCommits(t,r,n){const o=n;if(void 0===this.getStorageModel(t.$getName())[r])return o;const i=this.commits.filter((e=>e.cacheKey.pk===r));return 0===i.length||i.forEach((({diffs:t})=>{t.forEach((t=>{(0,e.applyChange)(o,!0,t)}))})),o}_createProxyByCacheKey(e,t=(e=>{e()}),r=(()=>{})){const n=this,o=this.storageCache.get(e);return new Proxy(o,{get(o,a,s){if("_target"===a)return o;if(a in o){const s=n.storageCache.get(e);if(void 0===s)throw new Error("Logic error");return s[a]instanceof i?(t(r),n.pending):Object.getPrototypeOf(o)[a].view(s[a])}return Reflect.get(o,a,s)},set(e,t,r,n){if(t in e)throw new Error("Use update method");return Reflect.set(e,t,r,n),!0}})}_createProxy(e,t,r){const n=this.getStorageModel(e.$getName());return void 0===n[t]&&this.setStorageValue(e,t,{}),this._createProxyByCacheKey(n[t],r,(()=>{}))}}class i{constructor(e){this.em=e}view(e){return e}link(e){return e}}class a extends i{}class s extends i{}var c=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{c(n.next(e))}catch(e){i(e)}}function s(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}c((n=n.apply(e,t||[])).next())}))};class l extends i{constructor(e,t,r=(e=>e)){super(e),this.targetModelName=t,this.convertValueToPk=r}get targetModel(){return this.em.getModel(this.targetModelName)}view(e){if(null===e)return e;const t=this.em.reverseStorageCache.get(e);if(void 0===t)throw new Error("Logic error");const r=t.deref();if(void 0===r)throw new Error("Unexpected use of WeakRef");const n=r.pk;let o=e=>c(this,void 0,void 0,(function*(){e()}));if(void 0!==n){const e=this.targetModel;o=t=>c(this,void 0,void 0,(function*(){const r=yield e.$get(n);this.em.setStorageValue(e,n,r),t()}))}return this.em._createProxyByCacheKey(r,o)}link(e){if(null===e)return null;const t=this.convertValueToPk(e),r=this.em.getStorageModel(this.targetModel.$getName())[t];return void 0===r?this.em.setStorageValue(this.targetModel,t,{[this.targetModel.$getPkName()]:t}):this.em.storageCache.get(r)}}class h extends i{}class u extends i{}const f=e=>Object.create({},{$em:{writable:!1,configurable:!1,enumerable:!1,value:e},_pkName:{writable:!0,configurable:!1,enumerable:!1,value:null},_name:{writable:!0,configurable:!1,enumerable:!1,value:null},$setName:{writable:!1,configurable:!1,enumerable:!1,value(e){return Object.defineProperty(this,"_name",{writable:!1,configurable:!1,enumerable:!1,value:e})}},$getName:{writable:!1,configurable:!1,enumerable:!1,value(){if(!this._name)throw new Error("Logic error");return this._name}},$getPkName:{writable:!1,configurable:!1,enumerable:!1,value(){if(null===this._pkName){let e=Object.keys(this).find((e=>this[e]instanceof h));if("string"!=typeof e&&(e=Object.keys(Object.getPrototypeOf(this)).find((e=>this[e]instanceof h)),"string"!=typeof e))throw new Error("Add PrimaryKey");Object.defineProperty(this,"_pkName",{writable:!1,configurable:!1,enumerable:!1,value:e})}return this._pkName}},$get:{writable:!1,configurable:!1,enumerable:!1,value(e){return this.$em.hooks.get(this,e)}},$create:{writable:!1,configurable:!1,enumerable:!1,value(e,t){return this.$em.hooks.create(this,e,t)}},$update:{writable:!1,configurable:!1,enumerable:!1,value(e,t){return this.$em.hooks.update(this,e,t)}},$delete:{writable:!1,configurable:!1,enumerable:!1,value(e,t){return this.$em.hooks.delete(this,e,t)}},$refresh:{writable:!1,configurable:!1,enumerable:!1,value(e){return t=this,r=void 0,o=function*(){const t=yield this.$get(e),r=this.$em._updateDataByCommits(this,e,t);let n=this.$getName;this.$em.setStorageValue(this.$em.getModel(n),e,r)},new((n=void 0)||(n=Promise))((function(e,i){function a(e){try{c(o.next(e))}catch(e){i(e)}}function s(e){try{c(o.throw(e))}catch(e){i(e)}}function c(t){var r;t.done?e(t.value):(r=t.value,r instanceof n?r:new n((function(e){e(r)}))).then(a,s)}c((o=o.apply(t,r||[])).next())}));var t,r,n,o}}});var d=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{c(n.next(e))}catch(e){i(e)}}function s(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}c((n=n.apply(e,t||[])).next())}))};class g{constructor(e,t,r){this.model=t,this.em=e,Object.entries(r).forEach((([t,r])=>{r.setEntityManager(e),this[t]=e=>this._methodsHandler(e,r)}))}refreshCollection(e){return d(this,void 0,void 0,(function*(){const t=this.em.collectionCache.get(e);if(void 0===t)return;const r=yield t.method(t.options,this.model);e.splice(0,e.length),r.forEach((t=>{e.push(t)}))}))}_methodsHandler(e,t){return d(this,void 0,void 0,(function*(){const r=yield t.find(e,this.model),n=this.em._setReactivity(r);return this.em.collectionCache.set(n,{options:e,method:t.find,repository:this}),this.em.onAddCollection(this,new WeakRef(n)),n}))}}var p=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{c(n.next(e))}catch(e){i(e)}}function s(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}c((n=n.apply(e,t||[])).next())}))};class v{constructor(e,t){this.em=e,this.findCb=t,this.find=(e,r)=>p(this,void 0,void 0,(function*(){const n=yield t(e);return this.convertResult(n,r)}))}setEntityManager(e){this.em=e}convertResult(e,t){return console.warn(e,t,"add convertResult method"),new Proxy({},{})}getModelView(e,t){return this.em._createProxy(e,t,(r=>p(this,void 0,void 0,(function*(){const n=yield e.$get(t);this.em.setStorageValue(e,t,n),r()}))))}}class m extends v{convertResult(e,t){if(!Array.isArray(e))throw new Error("Invalid result. The result must be array");if(e.some((e=>!e[t.$getPkName()])))throw new Error("Invalid result. Missing primary key");return e.forEach((e=>{this.em.setStorageValue(t,e[t.$getPkName()],e)})),e.map((e=>this.getModelView(t,e[t.$getPkName()])))}}class y extends v{convertResult(e,t){const r=e[t.$getPkName()];if(void 0===r)throw new Error("Invalid result. Missing primary key");return this.em.setStorageValue(t,r,e),this.getModelView(t,r)}}var b=function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function a(e){try{c(n.next(e))}catch(e){i(e)}}function s(e){try{c(n.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}c((n=n.apply(e,t||[])).next())}))};class w extends i{constructor(e,t,r=(e=>e)){super(e),this.targetModelName=t,this.convertValueToPk=r}get targetModel(){return this.em.getModel(this.targetModelName)}view(e){return new Proxy(e.map((e=>{const t=this.em.reverseStorageCache.get(e);if(void 0===t)throw new Error("Logic error");const r=t.deref();if(void 0===r)throw new Error("Unexpected use of WeakRef");const n=r.pk;let o=e=>b(this,void 0,void 0,(function*(){e()}));if(void 0!==n){const e=this.targetModel;o=t=>b(this,void 0,void 0,(function*(){const r=yield e.$get(n);this.em.setStorageValue(e,n,r),t()}))}return this.em._createProxyByCacheKey(r,o)})),{get(e,t,r){if(["push","pop","shift","unshift"].includes(t))throw new Error("Use update method");return Reflect.get(e,t,r)}})}link(e){return e.map((e=>{const t=this.convertValueToPk(e),r=this.em.getStorageModel(this.targetModel.$getName())[t];return void 0===r?this.em.setStorageValue(this.targetModel,t,{[this.targetModel.$getPkName()]:t}):this.em.storageCache.get(r)}))}}})(),n})()));