/*! For license information please see index.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("FrontOrm",[],t):"object"==typeof exports?exports.FrontOrm=t():e.FrontOrm=t()}(self,(()=>(()=>{var __webpack_modules__={681:function(e,t,r){var i,o;o=function(e){var t=["N","E","A","D"];function r(e,t){e.super_=t,e.prototype=Object.create(t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}})}function i(e,t){Object.defineProperty(this,"kind",{value:e,enumerable:!0}),t&&t.length&&Object.defineProperty(this,"path",{value:t,enumerable:!0})}function o(e,t,r){o.super_.call(this,"E",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0}),Object.defineProperty(this,"rhs",{value:r,enumerable:!0})}function s(e,t){s.super_.call(this,"N",e),Object.defineProperty(this,"rhs",{value:t,enumerable:!0})}function n(e,t){n.super_.call(this,"D",e),Object.defineProperty(this,"lhs",{value:t,enumerable:!0})}function a(e,t,r){a.super_.call(this,"A",e),Object.defineProperty(this,"index",{value:t,enumerable:!0}),Object.defineProperty(this,"item",{value:r,enumerable:!0})}function h(e,t,r){var i=e.slice((r||t)+1||e.length);return e.length=t<0?e.length+t:t,e.push.apply(e,i),e}function c(e){var t=typeof e;return"object"!==t?t:e===Math?"math":null===e?"null":Array.isArray(e)?"array":"[object Date]"===Object.prototype.toString.call(e)?"date":"function"==typeof e.toString&&/^\/.*\//.test(e.toString())?"regexp":"object"}function u(e){var t=0;if(0===e.length)return t;for(var r=0;r<e.length;r++)t=(t<<5)-t+e.charCodeAt(r),t&=t;return t}function l(e){var t=0,r=c(e);if("array"===r)return e.forEach((function(e){t+=l(e)})),t+u("[type: array, hash: "+t+"]");if("object"===r){for(var i in e)if(e.hasOwnProperty(i)){var o="[ type: object, key: "+i+", value hash: "+l(e[i])+"]";t+=u(o)}return t}return t+u("[ type: "+r+" ; value: "+e+"]")}function f(e,t,r,i,h,u,d,_){r=r||[],d=d||[];var p=(h=h||[]).slice(0);if(null!=u){if(i){if("function"==typeof i&&i(p,u))return;if("object"==typeof i){if(i.prefilter&&i.prefilter(p,u))return;if(i.normalize){var b=i.normalize(p,u,e,t);b&&(e=b[0],t=b[1])}}}p.push(u)}"regexp"===c(e)&&"regexp"===c(t)&&(e=e.toString(),t=t.toString());var y,g,v,E,A=typeof e,m=typeof t,S="undefined"!==A||d&&d.length>0&&d[d.length-1].lhs&&Object.getOwnPropertyDescriptor(d[d.length-1].lhs,u),H="undefined"!==m||d&&d.length>0&&d[d.length-1].rhs&&Object.getOwnPropertyDescriptor(d[d.length-1].rhs,u);if(!S&&H)r.push(new s(p,t));else if(!H&&S)r.push(new n(p,e));else if(c(e)!==c(t))r.push(new o(p,e,t));else if("date"===c(e)&&e-t!=0)r.push(new o(p,e,t));else if("object"===A&&null!==e&&null!==t){for(y=d.length-1;y>-1;--y)if(d[y].lhs===e){E=!0;break}if(E)e!==t&&r.push(new o(p,e,t));else{if(d.push({lhs:e,rhs:t}),Array.isArray(e)){for(_&&(e.sort((function(e,t){return l(e)-l(t)})),t.sort((function(e,t){return l(e)-l(t)}))),y=t.length-1,g=e.length-1;y>g;)r.push(new a(p,y,new s(void 0,t[y--])));for(;g>y;)r.push(new a(p,g,new n(void 0,e[g--])));for(;y>=0;--y)f(e[y],t[y],r,i,p,y,d,_)}else{var w=Object.keys(e),k=Object.keys(t);for(y=0;y<w.length;++y)v=w[y],(E=k.indexOf(v))>=0?(f(e[v],t[v],r,i,p,v,d,_),k[E]=null):f(e[v],void 0,r,i,p,v,d,_);for(y=0;y<k.length;++y)(v=k[y])&&f(void 0,t[v],r,i,p,v,d,_)}d.length=d.length-1}}else e!==t&&("number"===A&&isNaN(e)&&isNaN(t)||r.push(new o(p,e,t)))}function d(e,t,r,i,o){var s=[];if(f(e,t,s,i,null,null,null,o),r)for(var n=0;n<s.length;++n)r(s[n]);return s}function _(e,t,r,i){var o=d(e,t,i?function(e){e&&i.push(e)}:void 0,r);return i||(o.length?o:void 0)}function p(e,t,r){if(r.path&&r.path.length){var i,o=e[t],s=r.path.length-1;for(i=0;i<s;i++)o=o[r.path[i]];switch(r.kind){case"A":p(o[r.path[i]],r.index,r.item);break;case"D":delete o[r.path[i]];break;case"E":case"N":o[r.path[i]]=r.rhs}}else switch(r.kind){case"A":p(e[t],r.index,r.item);break;case"D":e=h(e,t);break;case"E":case"N":e[t]=r.rhs}return e}function b(e,r,i){if(void 0===i&&r&&~t.indexOf(r.kind)&&(i=r),e&&i&&i.kind){for(var o=e,s=-1,n=i.path?i.path.length-1:0;++s<n;)void 0===o[i.path[s]]&&(o[i.path[s]]=void 0!==i.path[s+1]&&"number"==typeof i.path[s+1]?[]:{}),o=o[i.path[s]];switch(i.kind){case"A":i.path&&void 0===o[i.path[s]]&&(o[i.path[s]]=[]),p(i.path?o[i.path[s]]:o,i.index,i.item);break;case"D":delete o[i.path[s]];break;case"E":case"N":o[i.path[s]]=i.rhs}}}function y(e,t,r){if(r.path&&r.path.length){var i,o=e[t],s=r.path.length-1;for(i=0;i<s;i++)o=o[r.path[i]];switch(r.kind){case"A":y(o[r.path[i]],r.index,r.item);break;case"D":case"E":o[r.path[i]]=r.lhs;break;case"N":delete o[r.path[i]]}}else switch(r.kind){case"A":y(e[t],r.index,r.item);break;case"D":case"E":e[t]=r.lhs;break;case"N":e=h(e,t)}return e}return r(o,i),r(s,i),r(n,i),r(a,i),Object.defineProperties(_,{diff:{value:_,enumerable:!0},orderIndependentDiff:{value:function(e,t,r,i){var o=d(e,t,i?function(e){e&&i.push(e)}:void 0,r,!0);return i||(o.length?o:void 0)},enumerable:!0},observableDiff:{value:d,enumerable:!0},orderIndependentObservableDiff:{value:function(e,t,r,i,o,s,n){return f(e,t,r,i,o,s,n,!0)},enumerable:!0},orderIndepHash:{value:l,enumerable:!0},applyDiff:{value:function(e,t,r){e&&t&&d(e,t,(function(i){r&&!r(e,t,i)||b(e,t,i)}))},enumerable:!0},applyChange:{value:b,enumerable:!0},revertChange:{value:function(e,t,r){if(e&&t&&r&&r.kind){var i,o,s=e;for(o=r.path.length-1,i=0;i<o;i++)void 0===s[r.path[i]]&&(s[r.path[i]]={}),s=s[r.path[i]];switch(r.kind){case"A":y(s[r.path[i]],r.index,r.item);break;case"D":case"E":s[r.path[i]]=r.lhs;break;case"N":delete s[r.path[i]]}}},enumerable:!0},isConflict:{value:function(){return"undefined"!=typeof $conflict},enumerable:!0}}),_.DeepDiff=_,e&&(e.DeepDiff=_),_}(this),void 0===(i=function(){return o}.call(t,r,t,e))||(e.exports=i)},495:(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_RESULT__;(function(){"use strict";var ERROR="input is invalid type",WINDOW="object"==typeof window,root=WINDOW?window:{};root.JS_MD5_NO_WINDOW&&(WINDOW=!1);var WEB_WORKER=!WINDOW&&"object"==typeof self,NODE_JS=!root.JS_MD5_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;NODE_JS?root=__webpack_require__.g:WEB_WORKER&&(root=self);var COMMON_JS=!root.JS_MD5_NO_COMMON_JS&&module.exports,AMD=__webpack_require__.amdO,ARRAY_BUFFER=!root.JS_MD5_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[128,32768,8388608,-2147483648],SHIFT=[0,8,16,24],OUTPUT_TYPES=["hex","array","digest","buffer","arrayBuffer","base64"],BASE64_ENCODE_CHAR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),blocks=[],buffer8;if(ARRAY_BUFFER){var buffer=new ArrayBuffer(68);buffer8=new Uint8Array(buffer),blocks=new Uint32Array(buffer)}!root.JS_MD5_NO_NODE_JS&&Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),!ARRAY_BUFFER||!root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(e){return"object"==typeof e&&e.buffer&&e.buffer.constructor===ArrayBuffer});var createOutputMethod=function(e){return function(t){return new Md5(!0).update(t)[e]()}},createMethod=function(){var e=createOutputMethod("hex");NODE_JS&&(e=nodeWrap(e)),e.create=function(){return new Md5},e.update=function(t){return e.create().update(t)};for(var t=0;t<OUTPUT_TYPES.length;++t){var r=OUTPUT_TYPES[t];e[r]=createOutputMethod(r)}return e},nodeWrap=function(method){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),nodeMethod=function(e){if("string"==typeof e)return crypto.createHash("md5").update(e,"utf8").digest("hex");if(null==e)throw ERROR;return e.constructor===ArrayBuffer&&(e=new Uint8Array(e)),Array.isArray(e)||ArrayBuffer.isView(e)||e.constructor===Buffer?crypto.createHash("md5").update(new Buffer(e)).digest("hex"):method(e)};return nodeMethod};function Md5(e){if(e)blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks,this.buffer8=buffer8;else if(ARRAY_BUFFER){var t=new ArrayBuffer(68);this.buffer8=new Uint8Array(t),this.blocks=new Uint32Array(t)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}Md5.prototype.update=function(e){if(!this.finalized){var t,r=typeof e;if("string"!==r){if("object"!==r)throw ERROR;if(null===e)throw ERROR;if(ARRAY_BUFFER&&e.constructor===ArrayBuffer)e=new Uint8Array(e);else if(!(Array.isArray(e)||ARRAY_BUFFER&&ArrayBuffer.isView(e)))throw ERROR;t=!0}for(var i,o,s=0,n=e.length,a=this.blocks,h=this.buffer8;s<n;){if(this.hashed&&(this.hashed=!1,a[0]=a[16],a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),t)if(ARRAY_BUFFER)for(o=this.start;s<n&&o<64;++s)h[o++]=e[s];else for(o=this.start;s<n&&o<64;++s)a[o>>2]|=e[s]<<SHIFT[3&o++];else if(ARRAY_BUFFER)for(o=this.start;s<n&&o<64;++s)(i=e.charCodeAt(s))<128?h[o++]=i:i<2048?(h[o++]=192|i>>6,h[o++]=128|63&i):i<55296||i>=57344?(h[o++]=224|i>>12,h[o++]=128|i>>6&63,h[o++]=128|63&i):(i=65536+((1023&i)<<10|1023&e.charCodeAt(++s)),h[o++]=240|i>>18,h[o++]=128|i>>12&63,h[o++]=128|i>>6&63,h[o++]=128|63&i);else for(o=this.start;s<n&&o<64;++s)(i=e.charCodeAt(s))<128?a[o>>2]|=i<<SHIFT[3&o++]:i<2048?(a[o>>2]|=(192|i>>6)<<SHIFT[3&o++],a[o>>2]|=(128|63&i)<<SHIFT[3&o++]):i<55296||i>=57344?(a[o>>2]|=(224|i>>12)<<SHIFT[3&o++],a[o>>2]|=(128|i>>6&63)<<SHIFT[3&o++],a[o>>2]|=(128|63&i)<<SHIFT[3&o++]):(i=65536+((1023&i)<<10|1023&e.charCodeAt(++s)),a[o>>2]|=(240|i>>18)<<SHIFT[3&o++],a[o>>2]|=(128|i>>12&63)<<SHIFT[3&o++],a[o>>2]|=(128|i>>6&63)<<SHIFT[3&o++],a[o>>2]|=(128|63&i)<<SHIFT[3&o++]);this.lastByteIndex=o,this.bytes+=o-this.start,o>=64?(this.start=o-64,this.hash(),this.hashed=!0):this.start=o}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Md5.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var e=this.blocks,t=this.lastByteIndex;e[t>>2]|=EXTRA[3&t],t>=56&&(this.hashed||this.hash(),e[0]=e[16],e[16]=e[1]=e[2]=e[3]=e[4]=e[5]=e[6]=e[7]=e[8]=e[9]=e[10]=e[11]=e[12]=e[13]=e[14]=e[15]=0),e[14]=this.bytes<<3,e[15]=this.hBytes<<3|this.bytes>>>29,this.hash()}},Md5.prototype.hash=function(){var e,t,r,i,o,s,n=this.blocks;this.first?t=((t=((e=((e=n[0]-680876937)<<7|e>>>25)-271733879<<0)^(r=((r=(-271733879^(i=((i=(-1732584194^2004318071&e)+n[1]-117830708)<<12|i>>>20)+e<<0)&(-271733879^e))+n[2]-1126478375)<<17|r>>>15)+i<<0)&(i^e))+n[3]-1316259209)<<22|t>>>10)+r<<0:(e=this.h0,t=this.h1,r=this.h2,t=((t+=((e=((e+=((i=this.h3)^t&(r^i))+n[0]-680876936)<<7|e>>>25)+t<<0)^(r=((r+=(t^(i=((i+=(r^e&(t^r))+n[1]-389564586)<<12|i>>>20)+e<<0)&(e^t))+n[2]+606105819)<<17|r>>>15)+i<<0)&(i^e))+n[3]-1044525330)<<22|t>>>10)+r<<0),t=((t+=((e=((e+=(i^t&(r^i))+n[4]-176418897)<<7|e>>>25)+t<<0)^(r=((r+=(t^(i=((i+=(r^e&(t^r))+n[5]+1200080426)<<12|i>>>20)+e<<0)&(e^t))+n[6]-1473231341)<<17|r>>>15)+i<<0)&(i^e))+n[7]-45705983)<<22|t>>>10)+r<<0,t=((t+=((e=((e+=(i^t&(r^i))+n[8]+1770035416)<<7|e>>>25)+t<<0)^(r=((r+=(t^(i=((i+=(r^e&(t^r))+n[9]-1958414417)<<12|i>>>20)+e<<0)&(e^t))+n[10]-42063)<<17|r>>>15)+i<<0)&(i^e))+n[11]-1990404162)<<22|t>>>10)+r<<0,t=((t+=((e=((e+=(i^t&(r^i))+n[12]+1804603682)<<7|e>>>25)+t<<0)^(r=((r+=(t^(i=((i+=(r^e&(t^r))+n[13]-40341101)<<12|i>>>20)+e<<0)&(e^t))+n[14]-1502002290)<<17|r>>>15)+i<<0)&(i^e))+n[15]+1236535329)<<22|t>>>10)+r<<0,t=((t+=((i=((i+=(t^r&((e=((e+=(r^i&(t^r))+n[1]-165796510)<<5|e>>>27)+t<<0)^t))+n[6]-1069501632)<<9|i>>>23)+e<<0)^e&((r=((r+=(e^t&(i^e))+n[11]+643717713)<<14|r>>>18)+i<<0)^i))+n[0]-373897302)<<20|t>>>12)+r<<0,t=((t+=((i=((i+=(t^r&((e=((e+=(r^i&(t^r))+n[5]-701558691)<<5|e>>>27)+t<<0)^t))+n[10]+38016083)<<9|i>>>23)+e<<0)^e&((r=((r+=(e^t&(i^e))+n[15]-660478335)<<14|r>>>18)+i<<0)^i))+n[4]-405537848)<<20|t>>>12)+r<<0,t=((t+=((i=((i+=(t^r&((e=((e+=(r^i&(t^r))+n[9]+568446438)<<5|e>>>27)+t<<0)^t))+n[14]-1019803690)<<9|i>>>23)+e<<0)^e&((r=((r+=(e^t&(i^e))+n[3]-187363961)<<14|r>>>18)+i<<0)^i))+n[8]+1163531501)<<20|t>>>12)+r<<0,t=((t+=((i=((i+=(t^r&((e=((e+=(r^i&(t^r))+n[13]-1444681467)<<5|e>>>27)+t<<0)^t))+n[2]-51403784)<<9|i>>>23)+e<<0)^e&((r=((r+=(e^t&(i^e))+n[7]+1735328473)<<14|r>>>18)+i<<0)^i))+n[12]-1926607734)<<20|t>>>12)+r<<0,t=((t+=((s=(i=((i+=((o=t^r)^(e=((e+=(o^i)+n[5]-378558)<<4|e>>>28)+t<<0))+n[8]-2022574463)<<11|i>>>21)+e<<0)^e)^(r=((r+=(s^t)+n[11]+1839030562)<<16|r>>>16)+i<<0))+n[14]-35309556)<<23|t>>>9)+r<<0,t=((t+=((s=(i=((i+=((o=t^r)^(e=((e+=(o^i)+n[1]-1530992060)<<4|e>>>28)+t<<0))+n[4]+1272893353)<<11|i>>>21)+e<<0)^e)^(r=((r+=(s^t)+n[7]-155497632)<<16|r>>>16)+i<<0))+n[10]-1094730640)<<23|t>>>9)+r<<0,t=((t+=((s=(i=((i+=((o=t^r)^(e=((e+=(o^i)+n[13]+681279174)<<4|e>>>28)+t<<0))+n[0]-358537222)<<11|i>>>21)+e<<0)^e)^(r=((r+=(s^t)+n[3]-722521979)<<16|r>>>16)+i<<0))+n[6]+76029189)<<23|t>>>9)+r<<0,t=((t+=((s=(i=((i+=((o=t^r)^(e=((e+=(o^i)+n[9]-640364487)<<4|e>>>28)+t<<0))+n[12]-421815835)<<11|i>>>21)+e<<0)^e)^(r=((r+=(s^t)+n[15]+530742520)<<16|r>>>16)+i<<0))+n[2]-995338651)<<23|t>>>9)+r<<0,t=((t+=((i=((i+=(t^((e=((e+=(r^(t|~i))+n[0]-198630844)<<6|e>>>26)+t<<0)|~r))+n[7]+1126891415)<<10|i>>>22)+e<<0)^((r=((r+=(e^(i|~t))+n[14]-1416354905)<<15|r>>>17)+i<<0)|~e))+n[5]-57434055)<<21|t>>>11)+r<<0,t=((t+=((i=((i+=(t^((e=((e+=(r^(t|~i))+n[12]+1700485571)<<6|e>>>26)+t<<0)|~r))+n[3]-1894986606)<<10|i>>>22)+e<<0)^((r=((r+=(e^(i|~t))+n[10]-1051523)<<15|r>>>17)+i<<0)|~e))+n[1]-2054922799)<<21|t>>>11)+r<<0,t=((t+=((i=((i+=(t^((e=((e+=(r^(t|~i))+n[8]+1873313359)<<6|e>>>26)+t<<0)|~r))+n[15]-30611744)<<10|i>>>22)+e<<0)^((r=((r+=(e^(i|~t))+n[6]-1560198380)<<15|r>>>17)+i<<0)|~e))+n[13]+1309151649)<<21|t>>>11)+r<<0,t=((t+=((i=((i+=(t^((e=((e+=(r^(t|~i))+n[4]-145523070)<<6|e>>>26)+t<<0)|~r))+n[11]-1120210379)<<10|i>>>22)+e<<0)^((r=((r+=(e^(i|~t))+n[2]+718787259)<<15|r>>>17)+i<<0)|~e))+n[9]-343485551)<<21|t>>>11)+r<<0,this.first?(this.h0=e+1732584193<<0,this.h1=t-271733879<<0,this.h2=r-1732584194<<0,this.h3=i+271733878<<0,this.first=!1):(this.h0=this.h0+e<<0,this.h1=this.h1+t<<0,this.h2=this.h2+r<<0,this.h3=this.h3+i<<0)},Md5.prototype.hex=function(){this.finalize();var e=this.h0,t=this.h1,r=this.h2,i=this.h3;return HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[i>>4&15]+HEX_CHARS[15&i]+HEX_CHARS[i>>12&15]+HEX_CHARS[i>>8&15]+HEX_CHARS[i>>20&15]+HEX_CHARS[i>>16&15]+HEX_CHARS[i>>28&15]+HEX_CHARS[i>>24&15]},Md5.prototype.toString=Md5.prototype.hex,Md5.prototype.digest=function(){this.finalize();var e=this.h0,t=this.h1,r=this.h2,i=this.h3;return[255&e,e>>8&255,e>>16&255,e>>24&255,255&t,t>>8&255,t>>16&255,t>>24&255,255&r,r>>8&255,r>>16&255,r>>24&255,255&i,i>>8&255,i>>16&255,i>>24&255]},Md5.prototype.array=Md5.prototype.digest,Md5.prototype.arrayBuffer=function(){this.finalize();var e=new ArrayBuffer(16),t=new Uint32Array(e);return t[0]=this.h0,t[1]=this.h1,t[2]=this.h2,t[3]=this.h3,e},Md5.prototype.buffer=Md5.prototype.arrayBuffer,Md5.prototype.base64=function(){for(var e,t,r,i="",o=this.array(),s=0;s<15;)e=o[s++],t=o[s++],r=o[s++],i+=BASE64_ENCODE_CHAR[e>>>2]+BASE64_ENCODE_CHAR[63&(e<<4|t>>>4)]+BASE64_ENCODE_CHAR[63&(t<<2|r>>>6)]+BASE64_ENCODE_CHAR[63&r];return e=o[s],i+(BASE64_ENCODE_CHAR[e>>>2]+BASE64_ENCODE_CHAR[e<<4&63]+"==")};var exports=createMethod();COMMON_JS?module.exports=exports:(root.md5=exports,AMD&&(__WEBPACK_AMD_DEFINE_RESULT__=function(){return exports}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))})()},810:(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_RESULT__;(function(){"use strict";var root="object"==typeof window?window:{},NODE_JS=!root.JS_SHA1_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;NODE_JS&&(root=__webpack_require__.g);var COMMON_JS=!root.JS_SHA1_NO_COMMON_JS&&module.exports,AMD=__webpack_require__.amdO,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[-2147483648,8388608,32768,128],SHIFT=[24,16,8,0],OUTPUT_TYPES=["hex","array","digest","arrayBuffer"],blocks=[],createOutputMethod=function(e){return function(t){return new Sha1(!0).update(t)[e]()}},createMethod=function(){var e=createOutputMethod("hex");NODE_JS&&(e=nodeWrap(e)),e.create=function(){return new Sha1},e.update=function(t){return e.create().update(t)};for(var t=0;t<OUTPUT_TYPES.length;++t){var r=OUTPUT_TYPES[t];e[r]=createOutputMethod(r)}return e},nodeWrap=function(method){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),nodeMethod=function(e){if("string"==typeof e)return crypto.createHash("sha1").update(e,"utf8").digest("hex");if(e.constructor===ArrayBuffer)e=new Uint8Array(e);else if(void 0===e.length)return method(e);return crypto.createHash("sha1").update(new Buffer(e)).digest("hex")};return nodeMethod};function Sha1(e){e?(blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.h0=1732584193,this.h1=4023233417,this.h2=2562383102,this.h3=271733878,this.h4=3285377520,this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}Sha1.prototype.update=function(e){if(!this.finalized){var t="string"!=typeof e;t&&e.constructor===root.ArrayBuffer&&(e=new Uint8Array(e));for(var r,i,o=0,s=e.length||0,n=this.blocks;o<s;){if(this.hashed&&(this.hashed=!1,n[0]=this.block,n[16]=n[1]=n[2]=n[3]=n[4]=n[5]=n[6]=n[7]=n[8]=n[9]=n[10]=n[11]=n[12]=n[13]=n[14]=n[15]=0),t)for(i=this.start;o<s&&i<64;++o)n[i>>2]|=e[o]<<SHIFT[3&i++];else for(i=this.start;o<s&&i<64;++o)(r=e.charCodeAt(o))<128?n[i>>2]|=r<<SHIFT[3&i++]:r<2048?(n[i>>2]|=(192|r>>6)<<SHIFT[3&i++],n[i>>2]|=(128|63&r)<<SHIFT[3&i++]):r<55296||r>=57344?(n[i>>2]|=(224|r>>12)<<SHIFT[3&i++],n[i>>2]|=(128|r>>6&63)<<SHIFT[3&i++],n[i>>2]|=(128|63&r)<<SHIFT[3&i++]):(r=65536+((1023&r)<<10|1023&e.charCodeAt(++o)),n[i>>2]|=(240|r>>18)<<SHIFT[3&i++],n[i>>2]|=(128|r>>12&63)<<SHIFT[3&i++],n[i>>2]|=(128|r>>6&63)<<SHIFT[3&i++],n[i>>2]|=(128|63&r)<<SHIFT[3&i++]);this.lastByteIndex=i,this.bytes+=i-this.start,i>=64?(this.block=n[16],this.start=i-64,this.hash(),this.hashed=!0):this.start=i}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Sha1.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var e=this.blocks,t=this.lastByteIndex;e[16]=this.block,e[t>>2]|=EXTRA[3&t],this.block=e[16],t>=56&&(this.hashed||this.hash(),e[0]=this.block,e[16]=e[1]=e[2]=e[3]=e[4]=e[5]=e[6]=e[7]=e[8]=e[9]=e[10]=e[11]=e[12]=e[13]=e[14]=e[15]=0),e[14]=this.hBytes<<3|this.bytes>>>29,e[15]=this.bytes<<3,this.hash()}},Sha1.prototype.hash=function(){var e,t,r=this.h0,i=this.h1,o=this.h2,s=this.h3,n=this.h4,a=this.blocks;for(e=16;e<80;++e)t=a[e-3]^a[e-8]^a[e-14]^a[e-16],a[e]=t<<1|t>>>31;for(e=0;e<20;e+=5)r=(t=(i=(t=(o=(t=(s=(t=(n=(t=r<<5|r>>>27)+(i&o|~i&s)+n+1518500249+a[e]<<0)<<5|n>>>27)+(r&(i=i<<30|i>>>2)|~r&o)+s+1518500249+a[e+1]<<0)<<5|s>>>27)+(n&(r=r<<30|r>>>2)|~n&i)+o+1518500249+a[e+2]<<0)<<5|o>>>27)+(s&(n=n<<30|n>>>2)|~s&r)+i+1518500249+a[e+3]<<0)<<5|i>>>27)+(o&(s=s<<30|s>>>2)|~o&n)+r+1518500249+a[e+4]<<0,o=o<<30|o>>>2;for(;e<40;e+=5)r=(t=(i=(t=(o=(t=(s=(t=(n=(t=r<<5|r>>>27)+(i^o^s)+n+1859775393+a[e]<<0)<<5|n>>>27)+(r^(i=i<<30|i>>>2)^o)+s+1859775393+a[e+1]<<0)<<5|s>>>27)+(n^(r=r<<30|r>>>2)^i)+o+1859775393+a[e+2]<<0)<<5|o>>>27)+(s^(n=n<<30|n>>>2)^r)+i+1859775393+a[e+3]<<0)<<5|i>>>27)+(o^(s=s<<30|s>>>2)^n)+r+1859775393+a[e+4]<<0,o=o<<30|o>>>2;for(;e<60;e+=5)r=(t=(i=(t=(o=(t=(s=(t=(n=(t=r<<5|r>>>27)+(i&o|i&s|o&s)+n-1894007588+a[e]<<0)<<5|n>>>27)+(r&(i=i<<30|i>>>2)|r&o|i&o)+s-1894007588+a[e+1]<<0)<<5|s>>>27)+(n&(r=r<<30|r>>>2)|n&i|r&i)+o-1894007588+a[e+2]<<0)<<5|o>>>27)+(s&(n=n<<30|n>>>2)|s&r|n&r)+i-1894007588+a[e+3]<<0)<<5|i>>>27)+(o&(s=s<<30|s>>>2)|o&n|s&n)+r-1894007588+a[e+4]<<0,o=o<<30|o>>>2;for(;e<80;e+=5)r=(t=(i=(t=(o=(t=(s=(t=(n=(t=r<<5|r>>>27)+(i^o^s)+n-899497514+a[e]<<0)<<5|n>>>27)+(r^(i=i<<30|i>>>2)^o)+s-899497514+a[e+1]<<0)<<5|s>>>27)+(n^(r=r<<30|r>>>2)^i)+o-899497514+a[e+2]<<0)<<5|o>>>27)+(s^(n=n<<30|n>>>2)^r)+i-899497514+a[e+3]<<0)<<5|i>>>27)+(o^(s=s<<30|s>>>2)^n)+r-899497514+a[e+4]<<0,o=o<<30|o>>>2;this.h0=this.h0+r<<0,this.h1=this.h1+i<<0,this.h2=this.h2+o<<0,this.h3=this.h3+s<<0,this.h4=this.h4+n<<0},Sha1.prototype.hex=function(){this.finalize();var e=this.h0,t=this.h1,r=this.h2,i=this.h3,o=this.h4;return HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[i>>28&15]+HEX_CHARS[i>>24&15]+HEX_CHARS[i>>20&15]+HEX_CHARS[i>>16&15]+HEX_CHARS[i>>12&15]+HEX_CHARS[i>>8&15]+HEX_CHARS[i>>4&15]+HEX_CHARS[15&i]+HEX_CHARS[o>>28&15]+HEX_CHARS[o>>24&15]+HEX_CHARS[o>>20&15]+HEX_CHARS[o>>16&15]+HEX_CHARS[o>>12&15]+HEX_CHARS[o>>8&15]+HEX_CHARS[o>>4&15]+HEX_CHARS[15&o]},Sha1.prototype.toString=Sha1.prototype.hex,Sha1.prototype.digest=function(){this.finalize();var e=this.h0,t=this.h1,r=this.h2,i=this.h3,o=this.h4;return[e>>24&255,e>>16&255,e>>8&255,255&e,t>>24&255,t>>16&255,t>>8&255,255&t,r>>24&255,r>>16&255,r>>8&255,255&r,i>>24&255,i>>16&255,i>>8&255,255&i,o>>24&255,o>>16&255,o>>8&255,255&o]},Sha1.prototype.array=Sha1.prototype.digest,Sha1.prototype.arrayBuffer=function(){this.finalize();var e=new ArrayBuffer(20),t=new DataView(e);return t.setUint32(0,this.h0),t.setUint32(4,this.h1),t.setUint32(8,this.h2),t.setUint32(12,this.h3),t.setUint32(16,this.h4),e};var exports=createMethod();COMMON_JS?module.exports=exports:(root.sha1=exports,AMD&&(__WEBPACK_AMD_DEFINE_RESULT__=function(){return exports}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))})()},427:(e,t,r)=>{var i=r(565),o=new Uint8Array(0);e.exports=function e(t,r,s){if("string"!=typeof t)throw TypeError("Value must be string");if("number"==typeof r)return e(t,void 0,r);if(null==s)return e(t,r,5);if(3!==s&&5!==s)throw TypeError("Version of UUID can be only 3 or 5");var n=i.stringToCharBuffer(t),a="string"==typeof r?i.stringToCharBuffer(r):o,h=i.concatBuffers(a,n),c=3===s?i.md5Hash(h):i.sha1Hash(h);return i.hashToUuid(c,s)}},565:(e,t,r)=>{var i=r(495),o=r(810),s="0123456789abcdef".split(""),n=function(e){var t=e>>4,r=e-(t<<4);return s[t]+s[r]},a=function(e){for(var t=[],r=0;r<e.length;r++)t.push(n(e[r]));return t.join("")};e.exports={uint8ToHex:n,uint8ArrayToHex:a,stringToCharBuffer:function(e){for(var t=new Uint8Array(e.length),r=0;r<e.length;r++)t[r]=e[r].charCodeAt(0);return t},md5Hash:function(e){return new Uint8Array(i.arrayBuffer(e))},sha1Hash:function(e){return new Uint8Array(o.arrayBuffer(e))},concatBuffers:function(e,t){var r=new Uint8Array(e.length+t.length);return r.set(new Uint8Array(e),0),r.set(new Uint8Array(t),e.byteLength),r},hashToUuid:function(e,t){return[a(e.slice(0,4)),"-",a(e.slice(4,6)),"-",n(15&e[6]|parseInt(10*t,16)),n(e[7]),"-",n(63&e[8]|128),n(e[9]),"-",a(e.slice(10,16))].join("")}}}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var r=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e].call(r.exports,r,r.exports,__webpack_require__),r.exports}__webpack_require__.amdO={},__webpack_require__.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(t,{a:t}),t},__webpack_require__.d=(e,t)=>{for(var r in t)__webpack_require__.o(t,r)&&!__webpack_require__.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__={};return(()=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BaseField:()=>i,BaseType:()=>p,BooleanField:()=>s,Collection:()=>b,CollectionField:()=>v,Entity:()=>y,EntityField:()=>a,EntityManager:()=>r,NumberField:()=>o,PrimaryKey:()=>h,Repository:()=>d,StringField:()=>c,getBaseModel:()=>u});var e=__webpack_require__(681),t=function(e,t,r,i){return new(r||(r=Promise))((function(o,s){function n(e){try{h(i.next(e))}catch(e){s(e)}}function a(e){try{h(i.throw(e))}catch(e){s(e)}}function h(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(n,a)}h((i=i.apply(e,t||[])).next())}))};class r{constructor(e=new WeakMap){this.models={},this.repositories={},this.storage={},this.reverseStorageCache=new WeakMap;const r=this.reverseStorageCache;this.storageCache=new Proxy(e,{get:(e,t,i)=>"set"===t?(t,i)=>(r.set(i,new WeakRef(t)),e.set.call(e,t,i)):"get"===t?e.get.bind(e):Reflect.get(e,t,i)}),this.cache={},this.commits=[],this.pending=null,this.hooks={preFlush:e=>e,create:(e,r,i)=>t(this,void 0,void 0,(function*(){if(e&&r&&i)throw new Error("Add create hook");return""})),update:(e,r,i)=>t(this,void 0,void 0,(function*(){if(e&&r&&i)throw new Error("Add update hook");return""})),delete:(e,r,i)=>t(this,void 0,void 0,(function*(){if(e&&r&&i)throw new Error("Add delete hook");return""}))},this.defaultClasses={common:{getBaseModel:u,Repository:d},fields:{BooleanField:s,NumberField:o,PrimaryKey:h,StringField:c,EntityField:a,CollectionField:v},types:{Collection:b,Entity:y}}}setHooks(e){this.hooks=Object.assign(Object.assign({},this.hooks),e)}setModel(e,t){const r=u(this),i=e(this),o=Object.create(r,this._convertValueToPropertyDescriptorMap(Object.entries(i)));o.$setName(e.name),this.storage[o.$getName()]={},this.models[o.$getName()]=o,this.repositories[o.$getName()]=new d(this,o,t)}getModel(e){const t=this.models[e];if(void 0===t)throw new Error("The model does not exist");return t}getRepository(e){const t=this.repositories[e];if(void 0===t)throw new Error("The model does not exist");return t}getStorageModel(e){const t=this.storage[e];if(void 0===t)throw new Error("The model does not exist");return t}setStorageValue(e,t,r){const i=this.getStorageModel(e.$getName());let o=i[t];void 0===o&&(i[t]={pk:t},o=i[t]);const s=Object.entries(r).reduce(((t,[r,i])=>(void 0!==e[r]&&(t[r]=e[r].link(i)),t)),{}),n=this._convertValueToPropertyDescriptorMap(Object.entries(s));return this.storageCache.set(o,Object.create(e,n)),this.storageCache.get(o)}_convertValueToPropertyDescriptorMap(e){return e.reduce(((e,[t,r])=>(e[t]={enumerable:!0,configurable:!0,writable:!0,value:r},e)),{})}put(t,r){let i={},o={};if(void 0!==r._target){const e=r;if(i=this.reverseStorageCache.get(e._target).deref(),void 0===i)throw new Error("Unexpected use of WeakRef");o=Object.assign({},r._target)}let s=t;Object.keys(s).length&&(s=Object.assign(Object.assign({},o),(e=>Object.entries(e).reduce(((e,[t,r])=>"string"==typeof r||"number"==typeof r||"boolean"==typeof r||null===r?(e[t]=r,e):Array.isArray(r)?(e[t]=r.map((e=>e._target)),e):void 0!==r._target?(e[t]=r._target,e):e),{}))(t)));const n=(0,e.diff)(o,s);if(void 0===n)return r;this.commits.push({cacheKey:i,diffs:n});let a=this.storageCache.get(i);return void 0===a&&(this.storageCache.set(i,Object.create(r)),a=this.storageCache.get(i)),n.forEach((function(t){(0,e.applyChange)(a,!0,t)})),this.storageCache.set(i,a),this._createProxyByCacheKey(i)}post(e,t){return this.put(e,t)}remove(e){return this.put({},e)}flush(){return t(this,void 0,void 0,(function*(){const t=this.hooks.preFlush(this.commits).reduce(((e,t)=>{const r=e.get(t.cacheKey);return void 0===r?e.set(t.cacheKey,t):t.diffs.forEach((e=>{r.diffs.push(e)})),e}),new Map);for(const[r,i]of Array.from(t)){const t={};i.diffs.forEach((function(r){(0,e.applyChange)(t,!0,r)}));const o=this.storageCache.get(r);let s;s=void 0===r.pk?o.$create(t,i):0===Object.keys(o).length?o.$delete(r.pk,i):o.$update(t,i),yield s.then((e=>{0===Object.keys(o).length?(delete r.pk,delete this.getStorageModel(o.$getName())[e]):(r.pk=e,o[o.$getPkName()]=e,this.getStorageModel(o.$getName())[e]=r)}))}this.commits=[]}))}revert(t=1){this.commits.splice(-1,t).forEach((({cacheKey:t,diffs:r})=>{const i=this.storageCache.get(t);r.forEach((t=>{(0,e.revertChange)(i,!0,t)}))}))}revertAll(){this.revert(this.commits.length)}_createProxyByCacheKey(e,t=(e=>{e()}),r=(()=>{})){const o=this,s=this.storageCache.get(e);return new Proxy(s,{get(s,n,a){if("_target"===n)return s;if(n in s){const a=o.storageCache.get(e);if(void 0===a)throw new Error("Logic error");return a[n]instanceof i?(t(r),o.pending):Object.getPrototypeOf(s)[n].view(a[n])}return Reflect.get(s,n,a)},set(e,t,r,i){if(t in e)throw new Error("Use update method");return Reflect.set(e,t,r,i),!0}})}_createProxy(e,t,r){const i=this.getStorageModel(e.$getName());return void 0===i[t]&&this.setStorageValue(e,t,{}),this._createProxyByCacheKey(i[t],r,(()=>{}))}}class i{constructor(e){this.em=e}view(e){return e}link(e){return e}}class o extends i{}class s extends i{}var n=function(e,t,r,i){return new(r||(r=Promise))((function(o,s){function n(e){try{h(i.next(e))}catch(e){s(e)}}function a(e){try{h(i.throw(e))}catch(e){s(e)}}function h(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(n,a)}h((i=i.apply(e,t||[])).next())}))};class a extends i{constructor(e,t,r=(e=>e)){super(e),this.targetModelName=t,this.convertValueToPk=r}get targetModel(){return this.em.getModel(this.targetModelName)}view(e){if(null===e)return e;const t=this.em.reverseStorageCache.get(e);if(void 0===t)throw new Error("Logic error");const r=t.deref();if(void 0===r)throw new Error("Unexpected use of WeakRef");const i=r.pk;let o=e=>n(this,void 0,void 0,(function*(){e()}));if(void 0!==i){const e=this.targetModel,t=e.$getRepository().methodsCb.findByPk;o=r=>n(this,void 0,void 0,(function*(){const o=yield t(i);this.em.setStorageValue(e,i,o),r()}))}return this.em._createProxyByCacheKey(r,o)}link(e){if(null===e)return null;const t=this.convertValueToPk(e),r=this.em.getStorageModel(this.targetModel.$getName())[t];return void 0===r?this.em.setStorageValue(this.targetModel,t,{[this.targetModel.$getPkName()]:t}):this.em.storageCache.get(r)}}class h extends i{}class c extends i{}const u=e=>Object.create({},{$em:{writable:!1,configurable:!1,enumerable:!1,value:e},_pkName:{writable:!0,configurable:!1,enumerable:!1,value:null},_name:{writable:!0,configurable:!1,enumerable:!1,value:null},$setName:{writable:!1,configurable:!1,enumerable:!1,value(e){return Object.defineProperty(this,"_name",{writable:!1,configurable:!1,enumerable:!1,value:e})}},$getName:{writable:!1,configurable:!1,enumerable:!1,value(){if(!this._name)throw new Error("Logic error");return this._name}},$getPkName:{writable:!1,configurable:!1,enumerable:!1,value(){if(null===this._pkName){let e=Object.keys(this).find((e=>this[e]instanceof h));if("string"!=typeof e&&(e=Object.keys(Object.getPrototypeOf(this)).find((e=>this[e]instanceof h)),"string"!=typeof e))throw new Error("Add PrimaryKey");Object.defineProperty(this,"_pkName",{writable:!1,configurable:!1,enumerable:!1,value:e})}return this._pkName}},$getPkField:{writable:!1,configurable:!1,enumerable:!1,value(){return this[this.getPkName()]}},$getRepository:{writable:!1,configurable:!1,enumerable:!1,value(){return this.$em.getRepository(this.$getName())}},$create:{writable:!1,configurable:!1,enumerable:!1,value(e,t){return this.$em.hooks.create(this,e,t)}},$update:{writable:!1,configurable:!1,enumerable:!1,value(e,t){return this.$em.hooks.update(this,e,t)}},$delete:{writable:!1,configurable:!1,enumerable:!1,value(e,t){return this.$em.hooks.delete(this,e,t)}}});var l=__webpack_require__(427),f=__webpack_require__.n(l);class d{constructor(e,t,r){this.model=t,this.em=e,this.methodsCb={findByPk:e=>e},Object.entries(r).forEach((([t,r])=>{r.setEntityManager(e),this[t]=e=>this._methodsHandler(e,r,t),this.methodsCb[t]=r.findCb}))}_sortJsonStringify(e){const t=new Set;return JSON.stringify(e,(e=>t.add(e))),JSON.stringify(e,Array.from(t).sort())}_methodsHandler(e,t,r){return i=this,o=void 0,n=function*(){const i=f()(r+this._sortJsonStringify(e)),o=this.em.cache;return void 0===o[i]&&(o[i]=yield t.find(e,this.model)),o[i]},new((s=void 0)||(s=Promise))((function(e,t){function r(e){try{h(n.next(e))}catch(e){t(e)}}function a(e){try{h(n.throw(e))}catch(e){t(e)}}function h(t){var i;t.done?e(t.value):(i=t.value,i instanceof s?i:new s((function(e){e(i)}))).then(r,a)}h((n=n.apply(i,o||[])).next())}));var i,o,s,n}}var _=function(e,t,r,i){return new(r||(r=Promise))((function(o,s){function n(e){try{h(i.next(e))}catch(e){s(e)}}function a(e){try{h(i.throw(e))}catch(e){s(e)}}function h(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(n,a)}h((i=i.apply(e,t||[])).next())}))};class p{constructor(e,t){this.em=e,this.findCb=t,this.find=(e,r)=>_(this,void 0,void 0,(function*(){const i=yield t(e);return this.convertResult(i,r)}))}setEntityManager(e){this.em=e}convertResult(e,t){return console.warn(e,t,"add convertResult method"),new Proxy({},{})}getModelView(e,t){return this.em._createProxy(e,t,(r=>_(this,void 0,void 0,(function*(){const i=yield e.$getRepository().methodsCb.findByPk(t);this.em.setStorageValue(e,t,i),r()}))))}}class b extends p{convertResult(e,t){if(!Array.isArray(e))throw new Error("Invalid result. The result must be array");if(e.some((e=>!e[t.$getPkName()])))throw new Error("Invalid result. Missing primary key");return e.forEach((e=>{this.em.setStorageValue(t,e[t.$getPkName()],e)})),e.map((e=>this.getModelView(t,e[t.$getPkName()])))}}class y extends p{convertResult(e,t){const r=e[t.$getPkName()];if(void 0===r)throw new Error("Invalid result. Missing primary key");return this.em.setStorageValue(t,r,e),this.getModelView(t,r)}}var g=function(e,t,r,i){return new(r||(r=Promise))((function(o,s){function n(e){try{h(i.next(e))}catch(e){s(e)}}function a(e){try{h(i.throw(e))}catch(e){s(e)}}function h(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(n,a)}h((i=i.apply(e,t||[])).next())}))};class v extends i{constructor(e,t,r=(e=>e)){super(e),this.targetModelName=t,this.convertValueToPk=r}get targetModel(){return this.em.getModel(this.targetModelName)}view(e){return new Proxy(e.map((e=>{const t=this.em.reverseStorageCache.get(e);if(void 0===t)throw new Error("Logic error");const r=t.deref();if(void 0===r)throw new Error("Unexpected use of WeakRef");const i=r.pk;let o=e=>g(this,void 0,void 0,(function*(){e()}));if(void 0!==i){const e=this.targetModel,t=e.$getRepository().methodsCb.findByPk;o=r=>g(this,void 0,void 0,(function*(){const o=yield t(i);this.em.setStorageValue(e,i,o),r()}))}return this.em._createProxyByCacheKey(r,o)})),{get(e,t,r){if(["push","pop","shift","unshift"].includes(t))throw new Error("Use update method");return Reflect.get(e,t,r)}})}link(e){return e.map((e=>{const t=this.convertValueToPk(e),r=this.em.getStorageModel(this.targetModel.$getName())[t];return void 0===r?this.em.setStorageValue(this.targetModel,t,{[this.targetModel.$getPkName()]:t}):this.em.storageCache.get(r)}))}}})(),__webpack_exports__})()));