/*! For license information please see index.js.LICENSE.txt */
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("FrontOrm",[],t):"object"==typeof exports?exports.FrontOrm=t():e.FrontOrm=t()}(self,(()=>(()=>{var __webpack_modules__={495:(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_RESULT__;(function(){"use strict";var ERROR="input is invalid type",WINDOW="object"==typeof window,root=WINDOW?window:{};root.JS_MD5_NO_WINDOW&&(WINDOW=!1);var WEB_WORKER=!WINDOW&&"object"==typeof self,NODE_JS=!root.JS_MD5_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;NODE_JS?root=__webpack_require__.g:WEB_WORKER&&(root=self);var COMMON_JS=!root.JS_MD5_NO_COMMON_JS&&module.exports,AMD=__webpack_require__.amdO,ARRAY_BUFFER=!root.JS_MD5_NO_ARRAY_BUFFER&&"undefined"!=typeof ArrayBuffer,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[128,32768,8388608,-2147483648],SHIFT=[0,8,16,24],OUTPUT_TYPES=["hex","array","digest","buffer","arrayBuffer","base64"],BASE64_ENCODE_CHAR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),blocks=[],buffer8;if(ARRAY_BUFFER){var buffer=new ArrayBuffer(68);buffer8=new Uint8Array(buffer),blocks=new Uint32Array(buffer)}!root.JS_MD5_NO_NODE_JS&&Array.isArray||(Array.isArray=function(e){return"[object Array]"===Object.prototype.toString.call(e)}),!ARRAY_BUFFER||!root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(e){return"object"==typeof e&&e.buffer&&e.buffer.constructor===ArrayBuffer});var createOutputMethod=function(e){return function(t){return new Md5(!0).update(t)[e]()}},createMethod=function(){var e=createOutputMethod("hex");NODE_JS&&(e=nodeWrap(e)),e.create=function(){return new Md5},e.update=function(t){return e.create().update(t)};for(var t=0;t<OUTPUT_TYPES.length;++t){var r=OUTPUT_TYPES[t];e[r]=createOutputMethod(r)}return e},nodeWrap=function(method){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),nodeMethod=function(e){if("string"==typeof e)return crypto.createHash("md5").update(e,"utf8").digest("hex");if(null==e)throw ERROR;return e.constructor===ArrayBuffer&&(e=new Uint8Array(e)),Array.isArray(e)||ArrayBuffer.isView(e)||e.constructor===Buffer?crypto.createHash("md5").update(new Buffer(e)).digest("hex"):method(e)};return nodeMethod};function Md5(e){if(e)blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks,this.buffer8=buffer8;else if(ARRAY_BUFFER){var t=new ArrayBuffer(68);this.buffer8=new Uint8Array(t),this.blocks=new Uint32Array(t)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}Md5.prototype.update=function(e){if(!this.finalized){var t,r=typeof e;if("string"!==r){if("object"!==r)throw ERROR;if(null===e)throw ERROR;if(ARRAY_BUFFER&&e.constructor===ArrayBuffer)e=new Uint8Array(e);else if(!(Array.isArray(e)||ARRAY_BUFFER&&ArrayBuffer.isView(e)))throw ERROR;t=!0}for(var i,o,s=0,n=e.length,h=this.blocks,a=this.buffer8;s<n;){if(this.hashed&&(this.hashed=!1,h[0]=h[16],h[16]=h[1]=h[2]=h[3]=h[4]=h[5]=h[6]=h[7]=h[8]=h[9]=h[10]=h[11]=h[12]=h[13]=h[14]=h[15]=0),t)if(ARRAY_BUFFER)for(o=this.start;s<n&&o<64;++s)a[o++]=e[s];else for(o=this.start;s<n&&o<64;++s)h[o>>2]|=e[s]<<SHIFT[3&o++];else if(ARRAY_BUFFER)for(o=this.start;s<n&&o<64;++s)(i=e.charCodeAt(s))<128?a[o++]=i:i<2048?(a[o++]=192|i>>6,a[o++]=128|63&i):i<55296||i>=57344?(a[o++]=224|i>>12,a[o++]=128|i>>6&63,a[o++]=128|63&i):(i=65536+((1023&i)<<10|1023&e.charCodeAt(++s)),a[o++]=240|i>>18,a[o++]=128|i>>12&63,a[o++]=128|i>>6&63,a[o++]=128|63&i);else for(o=this.start;s<n&&o<64;++s)(i=e.charCodeAt(s))<128?h[o>>2]|=i<<SHIFT[3&o++]:i<2048?(h[o>>2]|=(192|i>>6)<<SHIFT[3&o++],h[o>>2]|=(128|63&i)<<SHIFT[3&o++]):i<55296||i>=57344?(h[o>>2]|=(224|i>>12)<<SHIFT[3&o++],h[o>>2]|=(128|i>>6&63)<<SHIFT[3&o++],h[o>>2]|=(128|63&i)<<SHIFT[3&o++]):(i=65536+((1023&i)<<10|1023&e.charCodeAt(++s)),h[o>>2]|=(240|i>>18)<<SHIFT[3&o++],h[o>>2]|=(128|i>>12&63)<<SHIFT[3&o++],h[o>>2]|=(128|i>>6&63)<<SHIFT[3&o++],h[o>>2]|=(128|63&i)<<SHIFT[3&o++]);this.lastByteIndex=o,this.bytes+=o-this.start,o>=64?(this.start=o-64,this.hash(),this.hashed=!0):this.start=o}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Md5.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var e=this.blocks,t=this.lastByteIndex;e[t>>2]|=EXTRA[3&t],t>=56&&(this.hashed||this.hash(),e[0]=e[16],e[16]=e[1]=e[2]=e[3]=e[4]=e[5]=e[6]=e[7]=e[8]=e[9]=e[10]=e[11]=e[12]=e[13]=e[14]=e[15]=0),e[14]=this.bytes<<3,e[15]=this.hBytes<<3|this.bytes>>>29,this.hash()}},Md5.prototype.hash=function(){var e,t,r,i,o,s,n=this.blocks;this.first?t=((t=((e=((e=n[0]-680876937)<<7|e>>>25)-271733879<<0)^(r=((r=(-271733879^(i=((i=(-1732584194^2004318071&e)+n[1]-117830708)<<12|i>>>20)+e<<0)&(-271733879^e))+n[2]-1126478375)<<17|r>>>15)+i<<0)&(i^e))+n[3]-1316259209)<<22|t>>>10)+r<<0:(e=this.h0,t=this.h1,r=this.h2,t=((t+=((e=((e+=((i=this.h3)^t&(r^i))+n[0]-680876936)<<7|e>>>25)+t<<0)^(r=((r+=(t^(i=((i+=(r^e&(t^r))+n[1]-389564586)<<12|i>>>20)+e<<0)&(e^t))+n[2]+606105819)<<17|r>>>15)+i<<0)&(i^e))+n[3]-1044525330)<<22|t>>>10)+r<<0),t=((t+=((e=((e+=(i^t&(r^i))+n[4]-176418897)<<7|e>>>25)+t<<0)^(r=((r+=(t^(i=((i+=(r^e&(t^r))+n[5]+1200080426)<<12|i>>>20)+e<<0)&(e^t))+n[6]-1473231341)<<17|r>>>15)+i<<0)&(i^e))+n[7]-45705983)<<22|t>>>10)+r<<0,t=((t+=((e=((e+=(i^t&(r^i))+n[8]+1770035416)<<7|e>>>25)+t<<0)^(r=((r+=(t^(i=((i+=(r^e&(t^r))+n[9]-1958414417)<<12|i>>>20)+e<<0)&(e^t))+n[10]-42063)<<17|r>>>15)+i<<0)&(i^e))+n[11]-1990404162)<<22|t>>>10)+r<<0,t=((t+=((e=((e+=(i^t&(r^i))+n[12]+1804603682)<<7|e>>>25)+t<<0)^(r=((r+=(t^(i=((i+=(r^e&(t^r))+n[13]-40341101)<<12|i>>>20)+e<<0)&(e^t))+n[14]-1502002290)<<17|r>>>15)+i<<0)&(i^e))+n[15]+1236535329)<<22|t>>>10)+r<<0,t=((t+=((i=((i+=(t^r&((e=((e+=(r^i&(t^r))+n[1]-165796510)<<5|e>>>27)+t<<0)^t))+n[6]-1069501632)<<9|i>>>23)+e<<0)^e&((r=((r+=(e^t&(i^e))+n[11]+643717713)<<14|r>>>18)+i<<0)^i))+n[0]-373897302)<<20|t>>>12)+r<<0,t=((t+=((i=((i+=(t^r&((e=((e+=(r^i&(t^r))+n[5]-701558691)<<5|e>>>27)+t<<0)^t))+n[10]+38016083)<<9|i>>>23)+e<<0)^e&((r=((r+=(e^t&(i^e))+n[15]-660478335)<<14|r>>>18)+i<<0)^i))+n[4]-405537848)<<20|t>>>12)+r<<0,t=((t+=((i=((i+=(t^r&((e=((e+=(r^i&(t^r))+n[9]+568446438)<<5|e>>>27)+t<<0)^t))+n[14]-1019803690)<<9|i>>>23)+e<<0)^e&((r=((r+=(e^t&(i^e))+n[3]-187363961)<<14|r>>>18)+i<<0)^i))+n[8]+1163531501)<<20|t>>>12)+r<<0,t=((t+=((i=((i+=(t^r&((e=((e+=(r^i&(t^r))+n[13]-1444681467)<<5|e>>>27)+t<<0)^t))+n[2]-51403784)<<9|i>>>23)+e<<0)^e&((r=((r+=(e^t&(i^e))+n[7]+1735328473)<<14|r>>>18)+i<<0)^i))+n[12]-1926607734)<<20|t>>>12)+r<<0,t=((t+=((s=(i=((i+=((o=t^r)^(e=((e+=(o^i)+n[5]-378558)<<4|e>>>28)+t<<0))+n[8]-2022574463)<<11|i>>>21)+e<<0)^e)^(r=((r+=(s^t)+n[11]+1839030562)<<16|r>>>16)+i<<0))+n[14]-35309556)<<23|t>>>9)+r<<0,t=((t+=((s=(i=((i+=((o=t^r)^(e=((e+=(o^i)+n[1]-1530992060)<<4|e>>>28)+t<<0))+n[4]+1272893353)<<11|i>>>21)+e<<0)^e)^(r=((r+=(s^t)+n[7]-155497632)<<16|r>>>16)+i<<0))+n[10]-1094730640)<<23|t>>>9)+r<<0,t=((t+=((s=(i=((i+=((o=t^r)^(e=((e+=(o^i)+n[13]+681279174)<<4|e>>>28)+t<<0))+n[0]-358537222)<<11|i>>>21)+e<<0)^e)^(r=((r+=(s^t)+n[3]-722521979)<<16|r>>>16)+i<<0))+n[6]+76029189)<<23|t>>>9)+r<<0,t=((t+=((s=(i=((i+=((o=t^r)^(e=((e+=(o^i)+n[9]-640364487)<<4|e>>>28)+t<<0))+n[12]-421815835)<<11|i>>>21)+e<<0)^e)^(r=((r+=(s^t)+n[15]+530742520)<<16|r>>>16)+i<<0))+n[2]-995338651)<<23|t>>>9)+r<<0,t=((t+=((i=((i+=(t^((e=((e+=(r^(t|~i))+n[0]-198630844)<<6|e>>>26)+t<<0)|~r))+n[7]+1126891415)<<10|i>>>22)+e<<0)^((r=((r+=(e^(i|~t))+n[14]-1416354905)<<15|r>>>17)+i<<0)|~e))+n[5]-57434055)<<21|t>>>11)+r<<0,t=((t+=((i=((i+=(t^((e=((e+=(r^(t|~i))+n[12]+1700485571)<<6|e>>>26)+t<<0)|~r))+n[3]-1894986606)<<10|i>>>22)+e<<0)^((r=((r+=(e^(i|~t))+n[10]-1051523)<<15|r>>>17)+i<<0)|~e))+n[1]-2054922799)<<21|t>>>11)+r<<0,t=((t+=((i=((i+=(t^((e=((e+=(r^(t|~i))+n[8]+1873313359)<<6|e>>>26)+t<<0)|~r))+n[15]-30611744)<<10|i>>>22)+e<<0)^((r=((r+=(e^(i|~t))+n[6]-1560198380)<<15|r>>>17)+i<<0)|~e))+n[13]+1309151649)<<21|t>>>11)+r<<0,t=((t+=((i=((i+=(t^((e=((e+=(r^(t|~i))+n[4]-145523070)<<6|e>>>26)+t<<0)|~r))+n[11]-1120210379)<<10|i>>>22)+e<<0)^((r=((r+=(e^(i|~t))+n[2]+718787259)<<15|r>>>17)+i<<0)|~e))+n[9]-343485551)<<21|t>>>11)+r<<0,this.first?(this.h0=e+1732584193<<0,this.h1=t-271733879<<0,this.h2=r-1732584194<<0,this.h3=i+271733878<<0,this.first=!1):(this.h0=this.h0+e<<0,this.h1=this.h1+t<<0,this.h2=this.h2+r<<0,this.h3=this.h3+i<<0)},Md5.prototype.hex=function(){this.finalize();var e=this.h0,t=this.h1,r=this.h2,i=this.h3;return HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[i>>4&15]+HEX_CHARS[15&i]+HEX_CHARS[i>>12&15]+HEX_CHARS[i>>8&15]+HEX_CHARS[i>>20&15]+HEX_CHARS[i>>16&15]+HEX_CHARS[i>>28&15]+HEX_CHARS[i>>24&15]},Md5.prototype.toString=Md5.prototype.hex,Md5.prototype.digest=function(){this.finalize();var e=this.h0,t=this.h1,r=this.h2,i=this.h3;return[255&e,e>>8&255,e>>16&255,e>>24&255,255&t,t>>8&255,t>>16&255,t>>24&255,255&r,r>>8&255,r>>16&255,r>>24&255,255&i,i>>8&255,i>>16&255,i>>24&255]},Md5.prototype.array=Md5.prototype.digest,Md5.prototype.arrayBuffer=function(){this.finalize();var e=new ArrayBuffer(16),t=new Uint32Array(e);return t[0]=this.h0,t[1]=this.h1,t[2]=this.h2,t[3]=this.h3,e},Md5.prototype.buffer=Md5.prototype.arrayBuffer,Md5.prototype.base64=function(){for(var e,t,r,i="",o=this.array(),s=0;s<15;)e=o[s++],t=o[s++],r=o[s++],i+=BASE64_ENCODE_CHAR[e>>>2]+BASE64_ENCODE_CHAR[63&(e<<4|t>>>4)]+BASE64_ENCODE_CHAR[63&(t<<2|r>>>6)]+BASE64_ENCODE_CHAR[63&r];return e=o[s],i+(BASE64_ENCODE_CHAR[e>>>2]+BASE64_ENCODE_CHAR[e<<4&63]+"==")};var exports=createMethod();COMMON_JS?module.exports=exports:(root.md5=exports,AMD&&(__WEBPACK_AMD_DEFINE_RESULT__=function(){return exports}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))})()},810:(module,exports,__webpack_require__)=>{var __WEBPACK_AMD_DEFINE_RESULT__;(function(){"use strict";var root="object"==typeof window?window:{},NODE_JS=!root.JS_SHA1_NO_NODE_JS&&"object"==typeof process&&process.versions&&process.versions.node;NODE_JS&&(root=__webpack_require__.g);var COMMON_JS=!root.JS_SHA1_NO_COMMON_JS&&module.exports,AMD=__webpack_require__.amdO,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[-2147483648,8388608,32768,128],SHIFT=[24,16,8,0],OUTPUT_TYPES=["hex","array","digest","arrayBuffer"],blocks=[],createOutputMethod=function(e){return function(t){return new Sha1(!0).update(t)[e]()}},createMethod=function(){var e=createOutputMethod("hex");NODE_JS&&(e=nodeWrap(e)),e.create=function(){return new Sha1},e.update=function(t){return e.create().update(t)};for(var t=0;t<OUTPUT_TYPES.length;++t){var r=OUTPUT_TYPES[t];e[r]=createOutputMethod(r)}return e},nodeWrap=function(method){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),nodeMethod=function(e){if("string"==typeof e)return crypto.createHash("sha1").update(e,"utf8").digest("hex");if(e.constructor===ArrayBuffer)e=new Uint8Array(e);else if(void 0===e.length)return method(e);return crypto.createHash("sha1").update(new Buffer(e)).digest("hex")};return nodeMethod};function Sha1(e){e?(blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks):this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.h0=1732584193,this.h1=4023233417,this.h2=2562383102,this.h3=271733878,this.h4=3285377520,this.block=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}Sha1.prototype.update=function(e){if(!this.finalized){var t="string"!=typeof e;t&&e.constructor===root.ArrayBuffer&&(e=new Uint8Array(e));for(var r,i,o=0,s=e.length||0,n=this.blocks;o<s;){if(this.hashed&&(this.hashed=!1,n[0]=this.block,n[16]=n[1]=n[2]=n[3]=n[4]=n[5]=n[6]=n[7]=n[8]=n[9]=n[10]=n[11]=n[12]=n[13]=n[14]=n[15]=0),t)for(i=this.start;o<s&&i<64;++o)n[i>>2]|=e[o]<<SHIFT[3&i++];else for(i=this.start;o<s&&i<64;++o)(r=e.charCodeAt(o))<128?n[i>>2]|=r<<SHIFT[3&i++]:r<2048?(n[i>>2]|=(192|r>>6)<<SHIFT[3&i++],n[i>>2]|=(128|63&r)<<SHIFT[3&i++]):r<55296||r>=57344?(n[i>>2]|=(224|r>>12)<<SHIFT[3&i++],n[i>>2]|=(128|r>>6&63)<<SHIFT[3&i++],n[i>>2]|=(128|63&r)<<SHIFT[3&i++]):(r=65536+((1023&r)<<10|1023&e.charCodeAt(++o)),n[i>>2]|=(240|r>>18)<<SHIFT[3&i++],n[i>>2]|=(128|r>>12&63)<<SHIFT[3&i++],n[i>>2]|=(128|r>>6&63)<<SHIFT[3&i++],n[i>>2]|=(128|63&r)<<SHIFT[3&i++]);this.lastByteIndex=i,this.bytes+=i-this.start,i>=64?(this.block=n[16],this.start=i-64,this.hash(),this.hashed=!0):this.start=i}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Sha1.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var e=this.blocks,t=this.lastByteIndex;e[16]=this.block,e[t>>2]|=EXTRA[3&t],this.block=e[16],t>=56&&(this.hashed||this.hash(),e[0]=this.block,e[16]=e[1]=e[2]=e[3]=e[4]=e[5]=e[6]=e[7]=e[8]=e[9]=e[10]=e[11]=e[12]=e[13]=e[14]=e[15]=0),e[14]=this.hBytes<<3|this.bytes>>>29,e[15]=this.bytes<<3,this.hash()}},Sha1.prototype.hash=function(){var e,t,r=this.h0,i=this.h1,o=this.h2,s=this.h3,n=this.h4,h=this.blocks;for(e=16;e<80;++e)t=h[e-3]^h[e-8]^h[e-14]^h[e-16],h[e]=t<<1|t>>>31;for(e=0;e<20;e+=5)r=(t=(i=(t=(o=(t=(s=(t=(n=(t=r<<5|r>>>27)+(i&o|~i&s)+n+1518500249+h[e]<<0)<<5|n>>>27)+(r&(i=i<<30|i>>>2)|~r&o)+s+1518500249+h[e+1]<<0)<<5|s>>>27)+(n&(r=r<<30|r>>>2)|~n&i)+o+1518500249+h[e+2]<<0)<<5|o>>>27)+(s&(n=n<<30|n>>>2)|~s&r)+i+1518500249+h[e+3]<<0)<<5|i>>>27)+(o&(s=s<<30|s>>>2)|~o&n)+r+1518500249+h[e+4]<<0,o=o<<30|o>>>2;for(;e<40;e+=5)r=(t=(i=(t=(o=(t=(s=(t=(n=(t=r<<5|r>>>27)+(i^o^s)+n+1859775393+h[e]<<0)<<5|n>>>27)+(r^(i=i<<30|i>>>2)^o)+s+1859775393+h[e+1]<<0)<<5|s>>>27)+(n^(r=r<<30|r>>>2)^i)+o+1859775393+h[e+2]<<0)<<5|o>>>27)+(s^(n=n<<30|n>>>2)^r)+i+1859775393+h[e+3]<<0)<<5|i>>>27)+(o^(s=s<<30|s>>>2)^n)+r+1859775393+h[e+4]<<0,o=o<<30|o>>>2;for(;e<60;e+=5)r=(t=(i=(t=(o=(t=(s=(t=(n=(t=r<<5|r>>>27)+(i&o|i&s|o&s)+n-1894007588+h[e]<<0)<<5|n>>>27)+(r&(i=i<<30|i>>>2)|r&o|i&o)+s-1894007588+h[e+1]<<0)<<5|s>>>27)+(n&(r=r<<30|r>>>2)|n&i|r&i)+o-1894007588+h[e+2]<<0)<<5|o>>>27)+(s&(n=n<<30|n>>>2)|s&r|n&r)+i-1894007588+h[e+3]<<0)<<5|i>>>27)+(o&(s=s<<30|s>>>2)|o&n|s&n)+r-1894007588+h[e+4]<<0,o=o<<30|o>>>2;for(;e<80;e+=5)r=(t=(i=(t=(o=(t=(s=(t=(n=(t=r<<5|r>>>27)+(i^o^s)+n-899497514+h[e]<<0)<<5|n>>>27)+(r^(i=i<<30|i>>>2)^o)+s-899497514+h[e+1]<<0)<<5|s>>>27)+(n^(r=r<<30|r>>>2)^i)+o-899497514+h[e+2]<<0)<<5|o>>>27)+(s^(n=n<<30|n>>>2)^r)+i-899497514+h[e+3]<<0)<<5|i>>>27)+(o^(s=s<<30|s>>>2)^n)+r-899497514+h[e+4]<<0,o=o<<30|o>>>2;this.h0=this.h0+r<<0,this.h1=this.h1+i<<0,this.h2=this.h2+o<<0,this.h3=this.h3+s<<0,this.h4=this.h4+n<<0},Sha1.prototype.hex=function(){this.finalize();var e=this.h0,t=this.h1,r=this.h2,i=this.h3,o=this.h4;return HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[i>>28&15]+HEX_CHARS[i>>24&15]+HEX_CHARS[i>>20&15]+HEX_CHARS[i>>16&15]+HEX_CHARS[i>>12&15]+HEX_CHARS[i>>8&15]+HEX_CHARS[i>>4&15]+HEX_CHARS[15&i]+HEX_CHARS[o>>28&15]+HEX_CHARS[o>>24&15]+HEX_CHARS[o>>20&15]+HEX_CHARS[o>>16&15]+HEX_CHARS[o>>12&15]+HEX_CHARS[o>>8&15]+HEX_CHARS[o>>4&15]+HEX_CHARS[15&o]},Sha1.prototype.toString=Sha1.prototype.hex,Sha1.prototype.digest=function(){this.finalize();var e=this.h0,t=this.h1,r=this.h2,i=this.h3,o=this.h4;return[e>>24&255,e>>16&255,e>>8&255,255&e,t>>24&255,t>>16&255,t>>8&255,255&t,r>>24&255,r>>16&255,r>>8&255,255&r,i>>24&255,i>>16&255,i>>8&255,255&i,o>>24&255,o>>16&255,o>>8&255,255&o]},Sha1.prototype.array=Sha1.prototype.digest,Sha1.prototype.arrayBuffer=function(){this.finalize();var e=new ArrayBuffer(20),t=new DataView(e);return t.setUint32(0,this.h0),t.setUint32(4,this.h1),t.setUint32(8,this.h2),t.setUint32(12,this.h3),t.setUint32(16,this.h4),e};var exports=createMethod();COMMON_JS?module.exports=exports:(root.sha1=exports,AMD&&(__WEBPACK_AMD_DEFINE_RESULT__=function(){return exports}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))})()},427:(e,t,r)=>{var i=r(565),o=new Uint8Array(0);e.exports=function e(t,r,s){if("string"!=typeof t)throw TypeError("Value must be string");if("number"==typeof r)return e(t,void 0,r);if(null==s)return e(t,r,5);if(3!==s&&5!==s)throw TypeError("Version of UUID can be only 3 or 5");var n=i.stringToCharBuffer(t),h="string"==typeof r?i.stringToCharBuffer(r):o,a=i.concatBuffers(h,n),c=3===s?i.md5Hash(a):i.sha1Hash(a);return i.hashToUuid(c,s)}},565:(e,t,r)=>{var i=r(495),o=r(810),s="0123456789abcdef".split(""),n=function(e){var t=e>>4,r=e-(t<<4);return s[t]+s[r]},h=function(e){for(var t=[],r=0;r<e.length;r++)t.push(n(e[r]));return t.join("")};e.exports={uint8ToHex:n,uint8ArrayToHex:h,stringToCharBuffer:function(e){for(var t=new Uint8Array(e.length),r=0;r<e.length;r++)t[r]=e[r].charCodeAt(0);return t},md5Hash:function(e){return new Uint8Array(i.arrayBuffer(e))},sha1Hash:function(e){return new Uint8Array(o.arrayBuffer(e))},concatBuffers:function(e,t){var r=new Uint8Array(e.length+t.length);return r.set(new Uint8Array(e),0),r.set(new Uint8Array(t),e.byteLength),r},hashToUuid:function(e,t){return[h(e.slice(0,4)),"-",h(e.slice(4,6)),"-",n(15&e[6]|parseInt(10*t,16)),n(e[7]),"-",n(63&e[8]|128),n(e[9]),"-",h(e.slice(10,16))].join("")}}}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;var r=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](r,r.exports,__webpack_require__),r.exports}__webpack_require__.amdO={},__webpack_require__.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(t,{a:t}),t},__webpack_require__.d=(e,t)=>{for(var r in t)__webpack_require__.o(t,r)&&!__webpack_require__.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__={};return(()=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{BaseField:()=>o,BaseModel:()=>u,BaseType:()=>f,BooleanField:()=>n,Collection:()=>p,Entity:()=>y,EntityField:()=>h,EntityManager:()=>i,NumberField:()=>s,PrimaryKey:()=>a,Repository:()=>l,StringField:()=>c});var e=__webpack_require__(427),t=__webpack_require__.n(e),r=function(e,t,r,i){return new(r||(r=Promise))((function(o,s){function n(e){try{a(i.next(e))}catch(e){s(e)}}function h(e){try{a(i.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(n,h)}a((i=i.apply(e,t||[])).next())}))};class i{constructor(){this.models={},this.repositories={},this.storage={},this.updateList={},this.createList={},this.deleteList={},this.workingModels={},this.cache={},this.pending=null,this.hooks={create:()=>{throw new Error("Set create hook")},update:()=>{throw new Error("Set update hook")},delete:()=>{throw new Error("Set delete hook")},refresh:()=>{throw new Error("Set refresh hook")},cancelRefresh:()=>{throw new Error("Set cancelRefresh hook")}},this.defaultClasses={fields:{BooleanField:n,NumberField:s,PrimaryKey:a,StringField:c,EntityField:h},types:{Collection:p,Entity:y}}}setHooks(e){this.hooks=e}setModel(e,t){this.storage[e.getName()]={},this.updateList[e.getName()]={},this.createList[e.getName()]={},this.deleteList[e.getName()]={},this.models[e.getName()]=e,this.repositories[e.getName()]=new l(this,e,t)}getModel(e){const t=this.models[e];if(void 0===t)throw new Error("The model does not exist");return t}getRepository(e){const t=this.repositories[e];if(void 0===t)throw new Error("The model does not exist");return t}getStorageModel(e){const t=this.storage[e];if(void 0===t)throw new Error("The model does not exist");return t}getCreateListModel(e){const t=this.createList[e];if(void 0===t)throw new Error("The model does not exist");return t}getUpdateListModel(e){const t=this.updateList[e];if(void 0===t)throw new Error("The model does not exist");return t}getDeleteListModel(e){const t=this.deleteList[e];if(void 0===t)throw new Error("The model does not exist");return t}flush(){return r(this,void 0,void 0,(function*(){yield Promise.all(Object.keys(this.updateList).map((e=>r(this,void 0,void 0,(function*(){const t=this.getModel(e),i=this.getStorageModel(e),o=this.getUpdateListModel(e);yield Promise.all(Object.entries(o).map((([e,s])=>r(this,void 0,void 0,(function*(){const r=i[e];if(void 0===r)throw new Error("Logic error");yield t.update(s,r),delete o[e]})))))}))))),yield Promise.all(Object.entries(this.createList).map((([e,t])=>r(this,void 0,void 0,(function*(){const i=this.getModel(e);yield Promise.all(Object.entries(t).map((([e,o])=>r(this,void 0,void 0,(function*(){yield i.create(o),delete t[e]})))))}))))),yield Promise.all(Object.entries(this.deleteList).map((([e,t])=>r(this,void 0,void 0,(function*(){const i=this.getModel(e);yield Promise.all(Object.entries(t).map((([e,o])=>r(this,void 0,void 0,(function*(){yield i.delete(e,o),delete t[e]})))))})))))}))}_createProxy(e,r,i){const o=this.getCreateListModel(e.getName()),s=this.getUpdateListModel(e.getName()),n=this.getStorageModel(e.getName()),h=t()(`${e.getName()}_${r}`);void 0===this.workingModels[h]&&(this.workingModels[h]=e.getWorkingModel(r));const a=this.workingModels[h],c=()=>{const e=n[r];if(void 0===e)throw new Error("Logic error");Object.entries(a).forEach((([t,r])=>{"storage"===r.type&&(a[t]={type:"storage",value:e[t]})}))};e.refresh(n,r,c);const u=this;return new Proxy(a,{get(t,h,d){if("cancelUpdate"===h)return()=>e.cancelUpdate(r);if("cancelCreate"===h)return()=>e.cancelCreate(r);if("cancelDelete"===h)return()=>e.cancelDelete(r);if("cancelRefresh"===h)return()=>e.cancelRefresh(n,r);const l=o[r],_=s[r],f=n[r];if(void 0!==l){const t=e.validateFields(l).convertFields(l);return Reflect.get(t,h,d)}if(void 0!==_&&void 0!==_[h]){const t=e.validateFields(_).convertFields(_);return Reflect.get(t,h,d)}if(void 0!==f){const t=e.validateFields(f).convertFields(f);return Reflect.get(t,h,d)}return i(c),console.log(a,t,h),t[h].type="pending",t[h].value=u.pending,u.pending},set(e,t,i,o){if(t in e){const o=s[r];void 0===o?s[r]={[t]:i}:o[t]=i,e[t].type="updated",e[t].value=i}else Reflect.set(e,t,i,o);return!0}})}}class o{constructor(e){this.em=e}convert(e){return e}validate(e){return!(void 0===e)}}class s extends o{validate(e){return"number"==typeof e}}class n extends o{validate(e){return"boolean"==typeof e}}class h extends o{constructor(e,t,r=(e=>e)){super(e),this.targetModelName=t,this.convertValueToPk=r}get targetModel(){return this.em.getModel(this.targetModelName)}validate(e){return null===e||this.targetModel.getPkField().validate(e)}convert(e){if(null===e)return null;const t=this.convertValueToPk(e);let r=this.em.getStorageModel(this.targetModel.getName());const i=this.targetModel,o=i.getRepository().methodsCb.findByPk;return this.em._createProxy(i,t,(e=>{return i=this,s=void 0,h=function*(){r[t]=yield o(t),e()},new((n=void 0)||(n=Promise))((function(e,t){function r(e){try{a(h.next(e))}catch(e){t(e)}}function o(e){try{a(h.throw(e))}catch(e){t(e)}}function a(t){var i;t.done?e(t.value):(i=t.value,i instanceof n?i:new n((function(e){e(i)}))).then(r,o)}a((h=h.apply(i,s||[])).next())}));var i,s,n,h}))}}class a extends o{constructor(e,t="number"){super(e),this.type=t}validate(e){return typeof e===this.type}}class c extends o{validate(e){return"string"==typeof e}}class u{constructor(e){this.pkName=null,this.em=e}getPkName(){if(null===this.pkName){const e=Object.keys(this).find((e=>this[e]instanceof a));if("string"!=typeof e)throw new Error("Add PrimaryKey");this.pkName=e}return this.pkName}getPkField(){let e;const t=this[this.getPkName()];return t instanceof a&&(e=t),e}getName(){return this.constructor.name}getRepository(){return this.em.getRepository(this.getName())}validateFields(e){if(!Object.entries(e).every((([e,t])=>{const r=this[e];return!(r instanceof o)||r.validate(t)})))throw console.log(e),new Error("invalid fields");return this}convertFields(e){return Object.keys(e).reduce(((t,r)=>{const i=this[r];return i instanceof o&&(t[r]=i.convert(e[r])),t}),{})}create(e){return this.em.hooks.create(e)}cancelCreate(e){delete this.em.getCreateListModel(this.getName())[e]}update(e,t){return this.em.hooks.update(e,t)}cancelUpdate(e){delete this.em.getUpdateListModel(this.getName())[e]}delete(e,t){return this.em.hooks.delete(e,t)}cancelDelete(e){delete this.em.getDeleteListModel(this.getName())[e]}refresh(e,t,r){return this.em.hooks.refresh(e,t,r)}cancelRefresh(e,t){return this.em.hooks.cancelRefresh(e,t)}getWorkingModel(e){const t=Object.entries(this).filter((([,e])=>e instanceof o)).reduce(((e,[t])=>(e[t]={type:"storage",value:this.em.pending},e)),{});return void 0!==typeof e&&(t[this.getPkName()]={type:"storage",value:e}),t}}var d=function(e,t,r,i){return new(r||(r=Promise))((function(o,s){function n(e){try{a(i.next(e))}catch(e){s(e)}}function h(e){try{a(i.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(n,h)}a((i=i.apply(e,t||[])).next())}))};class l{constructor(e,t,r){this.model=t,this.em=e,this.methodsCb={findByPk:e=>e},Object.entries(r).forEach((([t,r])=>{r.setEntityManager(e),this[t]=e=>this._methodsHandler(e,r,t),this.methodsCb[t]=r.findCb}))}_sortJsonStringify(e){const t=new Set;return JSON.stringify(e,(e=>t.add(e))),JSON.stringify(e,Array.from(t).sort())}create(e){return d(this,void 0,void 0,(function*(){const r=t()(Date.now().toString()),i=this.model;return this.em.getCreateListModel(i.getName())[r]=e,this.em._createProxy(i,r,(()=>d(this,void 0,void 0,(function*(){}))))}))}delete(e){return d(this,void 0,void 0,(function*(){const t=this.model,r=this.em.getDeleteListModel(t.getName()),i=this.em.getStorageModel(t.getName());let o=i[e];return void 0===o&&(o=yield t.getRepository().methodsCb.findByPk(e),i[e]=o),r[e]=o,this.em._createProxy(t,e,(r=>d(this,void 0,void 0,(function*(){i[e]=yield t.getRepository().methodsCb.findByPk(e),r()}))))}))}_methodsHandler(e,r,i){return d(this,void 0,void 0,(function*(){const o=t()(i+this._sortJsonStringify(e)),s=this.em.cache;return void 0===s[o]&&(s[o]=yield r.find(e,this.model)),s[o]}))}}var _=function(e,t,r,i){return new(r||(r=Promise))((function(o,s){function n(e){try{a(i.next(e))}catch(e){s(e)}}function h(e){try{a(i.throw(e))}catch(e){s(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(n,h)}a((i=i.apply(e,t||[])).next())}))};class f{constructor(e,t){this.em=e,this.findCb=t,this.find=(e,r)=>_(this,void 0,void 0,(function*(){const i=yield t(e);return this.convertResult(i,r)}))}setEntityManager(e){this.em=e}convertResult(e,t){return console.warn(e,t,"add convertResult method"),new Proxy({},{})}getResultProxy(e,t,r){return this.em._createProxy(e,r,(i=>_(this,void 0,void 0,(function*(){t[r]=yield e.getRepository().methodsCb.findByPk(r),i()}))))}}class p extends f{convertResult(e,t){if(!Array.isArray(e))throw new Error("Invalid result. The result must be array");if(e.some((e=>!e[t.getPkName()])))throw new Error("Invalid result. Missing primary key");const r=this.em.storage[t.getName()];if(void 0===r)throw new Error("Invalid storageModel");return e.forEach((e=>{r[e[t.getPkName()]]=e})),e.map((e=>this.getResultProxy(t,r,e[t.getPkName()])))}}class y extends f{convertResult(e,t){const r=e[t.getPkName()];if(void 0===r)throw new Error("Invalid result. Missing primary key");const i=this.em.storage[t.getName()];if(void 0===i)throw new Error("Invalid storageModel");return i[r]=e,this.getResultProxy(t,i,r)}}})(),__webpack_exports__})()));