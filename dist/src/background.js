!function(){"use strict";const e=(e,i,...t)=>new Promise(((r,n)=>{t.push((e=>{chrome.runtime.lastError?n(chrome.runtime.lastError):r(e)})),e[i](...t)})),i={onChanged:e=>chrome.storage.sync.onChanged(e),clear:()=>e(chrome.storage.sync,"clear"),get:i=>e(chrome.storage.sync,"get",i),getBytesInUse:i=>e(chrome.storage.sync,"getBytesInUse",i),remove:i=>e(chrome.storage.sync,"remove",i),set:i=>e(chrome.storage.sync,"set",i)},t=()=>{},r=e=>"number"==typeof e&&Number.isFinite(e),n=Array.isArray,o=e=>"object"==typeof e&&!!e&&!n(e),p=e=>"function"==typeof e,a=(e,i)=>Object.prototype.hasOwnProperty.call(e,i),c=()=>{chrome.runtime.lastError},u=e=>{var i,t;null!=e&&e.id&&((e.url||"").match(/^https:\/\/.*duolingo\.com\//)?((null===(i=chrome.pageAction)||void 0===i?void 0:i.show)||chrome.action.enable)(e.id,c):((null===(t=chrome.pageAction)||void 0===t?void 0:t.hide)||chrome.action.disable)(e.id,c),chrome.runtime.lastError&&setTimeout((()=>u(e)),50))},l=(e,i)=>chrome.tabs.get(e,(t=>{var r;return"Tabs cannot be edited right now (user may be dragging a tab)."!==(null===(r=chrome.runtime.lastError)||void 0===r?void 0:r.message)?i(t):setTimeout((()=>l(e,i)),100)})),s=e=>`__duo-toolbox__-${e}`,_=s("global_variables"),f=(e,i,t)=>{const r=i(((e,i)=>(o(window[_])||(window[_]={}),a(window[_],e)?window[_][e]:i))(e,t));return((e,i)=>{o(window[_])||(window[_]={}),window[_][e]=i})(e,r),r},d=s("original_function"),h=s("override_version"),v=(e,i,r,n=1)=>((e,i,t,r,n=1)=>{a(window,e)&&i(window[e])?t(window[e]):f("pending_global_listeners",((o={})=>{var p;if(!o[e]){o[e]={};let t=window[e];Object.defineProperty(window,e,{get:()=>t,set:r=>{i(r)?(Object.defineProperty(window,e,{value:r,configurable:!0,enumerable:!0,writable:!0}),Object.values(o[e]).forEach((e=>e.callback(r)))):t=r},configurable:!0})}return n>(Number(null===(p=o[e][r])||void 0===p?void 0:p.version)||0)&&(o[e][r]={callback:t,version:n}),o}))})(e,p,(e=>((e,i,r,n=1)=>{var p;if(o(e)&&n>(Number(null===(p=e[i])||void 0===p?void 0:p[h])||0)){var a;const o=(null===(a=e[i])||void 0===a?void 0:a[d])||e[i]||t;e[i]=r(o),e[i][d]=o,e[i][h]=n}})(null==e?void 0:e.prototype,i,r,n)),`instance_method:${i}`,n),E=s("action_request"),O=s("background_event_notification");var y="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},A={exports:{}};!function(e,i){var t="__lodash_hash_undefined__",r=9007199254740991,n="[object Arguments]",o="[object AsyncFunction]",p="[object Function]",a="[object GeneratorFunction]",c="[object Null]",u="[object Object]",l="[object Proxy]",s="[object Undefined]",_=/^\[object .+?Constructor\]$/,f=/^(?:0|[1-9]\d*)$/,d={};d["[object Float32Array]"]=d["[object Float64Array]"]=d["[object Int8Array]"]=d["[object Int16Array]"]=d["[object Int32Array]"]=d["[object Uint8Array]"]=d["[object Uint8ClampedArray]"]=d["[object Uint16Array]"]=d["[object Uint32Array]"]=!0,d[n]=d["[object Array]"]=d["[object ArrayBuffer]"]=d["[object Boolean]"]=d["[object DataView]"]=d["[object Date]"]=d["[object Error]"]=d[p]=d["[object Map]"]=d["[object Number]"]=d[u]=d["[object RegExp]"]=d["[object Set]"]=d["[object String]"]=d["[object WeakMap]"]=!1;var h="object"==typeof y&&y&&y.Object===Object&&y,v="object"==typeof self&&self&&self.Object===Object&&self,E=h||v||Function("return this")(),O=i&&!i.nodeType&&i,A=O&&e&&!e.nodeType&&e,g=A&&A.exports===O,b=g&&h.process,R=function(){try{var e=A&&A.require&&A.require("util").types;return e||b&&b.binding&&b.binding("util")}catch(e){}}(),m=R&&R.isTypedArray;var L,w,T,I=Array.prototype,N=Function.prototype,C=Object.prototype,S=E["__core-js_shared__"],P=N.toString,U=C.hasOwnProperty,D=(L=/[^.]+$/.exec(S&&S.keys&&S.keys.IE_PROTO||""))?"Symbol(src)_1."+L:"",j=C.toString,M=P.call(Object),F=RegExp("^"+P.call(U).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),H=g?E.Buffer:void 0,W=E.Symbol,K=E.Uint8Array,k=H?H.allocUnsafe:void 0,G=(w=Object.getPrototypeOf,T=Object,function(e){return w(T(e))}),V=Object.create,B=C.propertyIsEnumerable,x=I.splice,z=W?W.toStringTag:void 0,$=function(){try{var e=ye(Object,"defineProperty");return e({},"",{}),e}catch(e){}}(),q=H?H.isBuffer:void 0,Y=Math.max,Q=Date.now,X=ye(E,"Map"),Z=ye(Object,"create"),J=function(){function e(){}return function(i){if(!Se(i))return{};if(V)return V(i);e.prototype=i;var t=new e;return e.prototype=void 0,t}}();function ee(e){var i=-1,t=null==e?0:e.length;for(this.clear();++i<t;){var r=e[i];this.set(r[0],r[1])}}function ie(e){var i=-1,t=null==e?0:e.length;for(this.clear();++i<t;){var r=e[i];this.set(r[0],r[1])}}function te(e){var i=-1,t=null==e?0:e.length;for(this.clear();++i<t;){var r=e[i];this.set(r[0],r[1])}}function re(e){var i=this.__data__=new ie(e);this.size=i.size}function ne(e,i){var t=we(e),r=!t&&Le(e),n=!t&&!r&&Ie(e),o=!t&&!r&&!n&&Ue(e),p=t||r||n||o,a=p?function(e,i){for(var t=-1,r=Array(e);++t<e;)r[t]=i(t);return r}(e.length,String):[],c=a.length;for(var u in e)!i&&!U.call(e,u)||p&&("length"==u||n&&("offset"==u||"parent"==u)||o&&("buffer"==u||"byteLength"==u||"byteOffset"==u)||Ae(u,c))||a.push(u);return a}function oe(e,i,t){(void 0!==t&&!me(e[i],t)||void 0===t&&!(i in e))&&ce(e,i,t)}function pe(e,i,t){var r=e[i];U.call(e,i)&&me(r,t)&&(void 0!==t||i in e)||ce(e,i,t)}function ae(e,i){for(var t=e.length;t--;)if(me(e[t][0],i))return t;return-1}function ce(e,i,t){"__proto__"==i&&$?$(e,i,{configurable:!0,enumerable:!0,value:t,writable:!0}):e[i]=t}ee.prototype.clear=function(){this.__data__=Z?Z(null):{},this.size=0},ee.prototype.delete=function(e){var i=this.has(e)&&delete this.__data__[e];return this.size-=i?1:0,i},ee.prototype.get=function(e){var i=this.__data__;if(Z){var r=i[e];return r===t?void 0:r}return U.call(i,e)?i[e]:void 0},ee.prototype.has=function(e){var i=this.__data__;return Z?void 0!==i[e]:U.call(i,e)},ee.prototype.set=function(e,i){var r=this.__data__;return this.size+=this.has(e)?0:1,r[e]=Z&&void 0===i?t:i,this},ie.prototype.clear=function(){this.__data__=[],this.size=0},ie.prototype.delete=function(e){var i=this.__data__,t=ae(i,e);return!(t<0)&&(t==i.length-1?i.pop():x.call(i,t,1),--this.size,!0)},ie.prototype.get=function(e){var i=this.__data__,t=ae(i,e);return t<0?void 0:i[t][1]},ie.prototype.has=function(e){return ae(this.__data__,e)>-1},ie.prototype.set=function(e,i){var t=this.__data__,r=ae(t,e);return r<0?(++this.size,t.push([e,i])):t[r][1]=i,this},te.prototype.clear=function(){this.size=0,this.__data__={hash:new ee,map:new(X||ie),string:new ee}},te.prototype.delete=function(e){var i=Oe(this,e).delete(e);return this.size-=i?1:0,i},te.prototype.get=function(e){return Oe(this,e).get(e)},te.prototype.has=function(e){return Oe(this,e).has(e)},te.prototype.set=function(e,i){var t=Oe(this,e),r=t.size;return t.set(e,i),this.size+=t.size==r?0:1,this},re.prototype.clear=function(){this.__data__=new ie,this.size=0},re.prototype.delete=function(e){var i=this.__data__,t=i.delete(e);return this.size=i.size,t},re.prototype.get=function(e){return this.__data__.get(e)},re.prototype.has=function(e){return this.__data__.has(e)},re.prototype.set=function(e,i){var t=this.__data__;if(t instanceof ie){var r=t.__data__;if(!X||r.length<199)return r.push([e,i]),this.size=++t.size,this;t=this.__data__=new te(r)}return t.set(e,i),this.size=t.size,this};var ue,le=function(e,i,t){for(var r=-1,n=Object(e),o=t(e),p=o.length;p--;){var a=o[ue?p:++r];if(!1===i(n[a],a,n))break}return e};function se(e){return null==e?void 0===e?s:c:z&&z in Object(e)?function(e){var i=U.call(e,z),t=e[z];try{e[z]=void 0;var r=!0}catch(e){}var n=j.call(e);r&&(i?e[z]=t:delete e[z]);return n}(e):function(e){return j.call(e)}(e)}function _e(e){return Pe(e)&&se(e)==n}function fe(e){return!(!Se(e)||function(e){return!!D&&D in e}(e))&&(Ne(e)?F:_).test(function(e){if(null!=e){try{return P.call(e)}catch(e){}try{return e+""}catch(e){}}return""}(e))}function de(e){if(!Se(e))return function(e){var i=[];if(null!=e)for(var t in Object(e))i.push(t);return i}(e);var i=ge(e),t=[];for(var r in e)("constructor"!=r||!i&&U.call(e,r))&&t.push(r);return t}function he(e,i,t,r,n){e!==i&&le(i,(function(o,p){if(n||(n=new re),Se(o))!function(e,i,t,r,n,o,p){var a=be(e,t),c=be(i,t),l=p.get(c);if(l)return void oe(e,t,l);var s=o?o(a,c,t+"",e,i,p):void 0,_=void 0===s;if(_){var f=we(c),d=!f&&Ie(c),h=!f&&!d&&Ue(c);s=c,f||d||h?we(a)?s=a:Pe(A=a)&&Te(A)?s=function(e,i){var t=-1,r=e.length;i||(i=Array(r));for(;++t<r;)i[t]=e[t];return i}(a):d?(_=!1,s=function(e,i){if(i)return e.slice();var t=e.length,r=k?k(t):new e.constructor(t);return e.copy(r),r}(c,!0)):h?(_=!1,v=c,E=!0?(O=v.buffer,y=new O.constructor(O.byteLength),new K(y).set(new K(O)),y):v.buffer,s=new v.constructor(E,v.byteOffset,v.length)):s=[]:function(e){if(!Pe(e)||se(e)!=u)return!1;var i=G(e);if(null===i)return!0;var t=U.call(i,"constructor")&&i.constructor;return"function"==typeof t&&t instanceof t&&P.call(t)==M}(c)||Le(c)?(s=a,Le(a)?s=function(e){return function(e,i,t,r){var n=!t;t||(t={});var o=-1,p=i.length;for(;++o<p;){var a=i[o],c=r?r(t[a],e[a],a,t,e):void 0;void 0===c&&(c=e[a]),n?ce(t,a,c):pe(t,a,c)}return t}(e,De(e))}(a):Se(a)&&!Ne(a)||(s=function(e){return"function"!=typeof e.constructor||ge(e)?{}:J(G(e))}(c))):_=!1}var v,E,O,y;var A;_&&(p.set(c,s),n(s,c,r,o,p),p.delete(c));oe(e,t,s)}(e,i,p,t,he,r,n);else{var a=r?r(be(e,p),o,p+"",e,i,n):void 0;void 0===a&&(a=o),oe(e,p,a)}}),De)}function ve(e,i){return Re(function(e,i,t){return i=Y(void 0===i?e.length-1:i,0),function(){for(var r=arguments,n=-1,o=Y(r.length-i,0),p=Array(o);++n<o;)p[n]=r[i+n];n=-1;for(var a=Array(i+1);++n<i;)a[n]=r[n];return a[i]=t(p),function(e,i,t){switch(t.length){case 0:return e.call(i);case 1:return e.call(i,t[0]);case 2:return e.call(i,t[0],t[1]);case 3:return e.call(i,t[0],t[1],t[2])}return e.apply(i,t)}(e,this,a)}}(e,i,Fe),e+"")}var Ee=$?function(e,i){return $(e,"toString",{configurable:!0,enumerable:!1,value:(t=i,function(){return t}),writable:!0});var t}:Fe;function Oe(e,i){var t,r,n=e.__data__;return("string"==(r=typeof(t=i))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==t:null===t)?n["string"==typeof i?"string":"hash"]:n.map}function ye(e,i){var t=function(e,i){return null==e?void 0:e[i]}(e,i);return fe(t)?t:void 0}function Ae(e,i){var t=typeof e;return!!(i=null==i?r:i)&&("number"==t||"symbol"!=t&&f.test(e))&&e>-1&&e%1==0&&e<i}function ge(e){var i=e&&e.constructor;return e===("function"==typeof i&&i.prototype||C)}function be(e,i){if(("constructor"!==i||"function"!=typeof e[i])&&"__proto__"!=i)return e[i]}var Re=function(e){var i=0,t=0;return function(){var r=Q(),n=16-(r-t);if(t=r,n>0){if(++i>=800)return arguments[0]}else i=0;return e.apply(void 0,arguments)}}(Ee);function me(e,i){return e===i||e!=e&&i!=i}var Le=_e(function(){return arguments}())?_e:function(e){return Pe(e)&&U.call(e,"callee")&&!B.call(e,"callee")},we=Array.isArray;function Te(e){return null!=e&&Ce(e.length)&&!Ne(e)}var Ie=q||function(){return!1};function Ne(e){if(!Se(e))return!1;var i=se(e);return i==p||i==a||i==o||i==l}function Ce(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=r}function Se(e){var i=typeof e;return null!=e&&("object"==i||"function"==i)}function Pe(e){return null!=e&&"object"==typeof e}var Ue=m?function(e){return function(i){return e(i)}}(m):function(e){return Pe(e)&&Ce(e.length)&&!!d[se(e)]};function De(e){return Te(e)?ne(e,!0):de(e)}var je,Me=(je=function(e,i,t){he(e,i,t)},ve((function(e,i){var t=-1,r=i.length,n=r>1?i[r-1]:void 0,o=r>2?i[2]:void 0;for(n=je.length>3&&"function"==typeof n?(r--,n):void 0,o&&function(e,i,t){if(!Se(t))return!1;var r=typeof i;return!!("number"==r?Te(t)&&Ae(i,t.length):"string"==r&&i in t)&&me(t[i],e)}(i[0],i[1],o)&&(n=r<3?void 0:n,r=1),e=Object(e);++t<r;){var p=i[t];p&&je(e,p,t,n)}return e})));function Fe(e){return e}e.exports=Me}(A,A.exports);var g=A.exports;const b="effect",R="tts_sentence",m="tts_word",L="tts_morpheme",w="unknown",T=[b,R,m,L,w],I="normal",N="rate",C="volume",S=s("forced_setting"),P=e=>o(e)&&!!e[S],U=e=>e.value,D=(e,i)=>((e,i,t,r=1)=>{if(!o(e))return;const n=s(`${i}_override_version`);r>(Number(e[n])||0)&&Object.defineProperty(e,i,t(Object.getOwnPropertyDescriptor(e,i)))})(HTMLMediaElement,i,(i=>({...i,set:function(t){const n=F[e];r(t)?(this[n.originalValueKey]=t,a(this,n.valueKey)&&(t=this[n.isRelativeKey]?G(e,t*this[n.valueKey]):this[n.valueKey])):P(t)&&(t=U(t)),r(t)&&(this[n.listenerValueKey]=t),i.set.call(this,t)}}))),j=(e,i)=>v("Howl",i,(t=>function(){const n=this,o=arguments,p=F[e];let c=!1;const u=n._queue.length;(1===o.length||2===o.length&&void 0===o[1])&&-1===n._getSoundIds().indexOf(o[0])&&(P(o[0])?(c=!0,o[0]=U(o[0])):((e,i)=>N===e&&r(i)||C===e&&i>=0&&i<=1)(e,o[0])&&(n[p.originalValueKey]=o[0],a(n,p.valueKey)&&(c=!0,n[p.isRelativeKey]?o[0]=G(e,o[0]*n[p.valueKey]):o[0]=n[p.valueKey])),c&&(n[p.listenerValueKey]=o[0]));const l=t.apply(n,arguments);return c&&u<n._queue.length&&(n._queue[n._queue.length-1].action=function(){var e;o[0]=(e=o[0],{[S]:!0,value:e}),n[i](...o)}),l})),M=(e,i,t,r)=>({...r,functions:{audio:{applyOverride:()=>D(e,t),getter:e=>e[i],setter:(e,t)=>e[i]=t,hasQueuedUpdate:()=>!1},howler:{applyOverride:()=>j(e,t),getter:e=>e[t](),setter:(e,i)=>e[t](i),hasQueuedUpdate:e=>e._queue.find((e=>e.event===t))}},priorityKey:s(`${e}_priority`),isRelativeKey:s(`${e}_is_relative`),valueKey:s(`forced_${e}_value`),originalValueKey:s(`original_${e}_value`),listenerValueKey:s(`${e}_value`)}),F={[N]:M(N,"playbackRate","rate",{minValue:.5,maxValue:4,defaultValue:1}),[C]:M(C,"volume","volume",{minValue:0,maxValue:1,defaultValue:1})},H=e=>{const i=F[e];if(!i)throw new Error(`Unknown sound setting: "${e}".`);return i},W=e=>H(e).minValue,K=e=>H(e).maxValue,k=e=>H(e).defaultValue,G=(e,i)=>F[e]?Math.max(F[e].minValue,Math.min(i,F[e].maxValue)):i;function V(e,i,t){return i in e?Object.defineProperty(e,i,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[i]=t,e}var B=function e(){!function(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}(this,e)};V(B,"ripple",!1),V(B,"locale","en"),V(B,"autoZIndex",!0),V(B,"zIndex",{modal:1100,overlay:1e3,menu:1e3,tooltip:1100,toast:1200}),V(B,"appendTo",null);var x=Object.freeze({ALIGN_CENTER:"pi pi-align-center",ALIGN_JUSTIFY:"pi pi-align-justify",ALIGN_LEFT:"pi pi-align-left",ALIGN_RIGHT:"pi pi-align-right",AMAZON:"pi pi-amazon",ANDROID:"pi pi-android",ANGLE_DOUBLE_DOWN:"pi pi-angle-double-down",ANGLE_DOUBLE_LEFT:"pi pi-angle-double-left",ANGLE_DOUBLE_RIGHT:"pi pi-angle-double-right",ANGLE_DOUBLE_UP:"pi pi-angle-double-up",ANGLE_DOWN:"pi pi-angle-down",ANGLE_LEFT:"pi pi-angle-left",ANGLE_RIGHT:"pi pi-angle-right",ANGLE_UP:"pi pi-angle-up",APPLE:"pi pi-apple",ARROW_CIRCLE_DOWN:"pi pi-arrow-circle-down",ARROW_CIRCLE_LEFT:"pi pi-arrow-circle-left",ARROW_CIRCLE_RIGHT:"pi pi-arrow-circle-right",ARROW_CIRCLE_UP:"pi pi-arrow-circle-up",ARROW_DOWN:"pi pi-arrow-down",ARROW_LEFT:"pi pi-arrow-left",ARROW_RIGHT:"pi pi-arrow-right",ARROW_UP:"pi pi-arrow-up",BACKWARD:"pi pi-backward",BAN:"pi pi-ban",BARS:"pi pi-bars",BELL:"pi pi-bell",BOOK:"pi pi-book",BOOKMARK:"pi pi-bookmark",BRIEFCASE:"pi pi-briefcase",CALENDAR_MINUS:"pi pi-calendar-minus",CALENDAR_PLUS:"pi pi-calendar-plus",CALENDAR_TIMES:"pi pi-calendar-times",CALENDAR:"pi pi-calendar",CAMERA:"pi pi-camera",CARET_DOWN:"pi pi-caret-down",CARET_LEFT:"pi pi-caret-left",CARET_RIGHT:"pi pi-caret-right",CARET_UP:"pi pi-caret-up",CHART_BAR:"pi pi-chart-bar",CHART_LINE:"pi pi-chart-line",CHECK_CIRCLE:"pi pi-check-circle",CHECK_SQUARE:"pi pi-check-square",CHECK:"pi pi-check",CHEVRON_CIRCLE_DOWN:"pi pi-chevron-circle-down",CHEVRON_CIRCLE_LEFT:"pi pi-chevron-circle-left",CHEVRON_CIRCLE_RIGHT:"pi pi-chevron-circle-right",CHEVRON_CIRCLE_UP:"pi pi-chevron-circle-up",CHEVRON_DOWN:"pi pi-chevron-down",CHEVRON_LEFT:"pi pi-chevron-left",CHEVRON_RIGHT:"pi pi-chevron-right",CHEVRON_UP:"pi pi-chevron-up",CLOCK:"pi pi-clock",CLONE:"pi pi-clone",CLOUD_DOWNLOAD:"pi pi-cloud-download",CLOUD_UPLOAD:"pi pi-cloud-upload",CLOUD:"pi pi-cloud",COG:"pi pi-cog",COMMENT:"pi pi-comment",COMMENTS:"pi pi-comments",COMPASS:"pi pi-compass",COPY:"pi pi-copy",CREDIT_CARD:"pi pi-credit-card",DESKTOP:"pi pi-desktop",DISCORD:"pi pi-discord",DIRECTIONS_ALT:"pi pi-directions-alt",DIRECTIONS:"pi pi-directions",DOLLAR:"pi pi-dollar",DOWNLOAD:"pi pi-download",EJECT:"pi pi-eject",ELLIPSIS_H:"pi pi-ellipsis-h",ELLIPSIS_V:"pi pi-ellipsis-v",ENVELOPE:"pi pi-envelope",EXCLAMATION_CIRCLE:"pi pi-exclamation-circle",EXCLAMATION_TRIANGLE:"pi pi-exclamation-triangle ",EXTERNAL_LINK:"pi pi-external-link",EYE_SLASH:"pi pi-eye-slash",EYE:"pi pi-eye",FACEBOOK:"pi pi-facebook",FAST_BACKWARD:"pi pi-fast-backward",FAST_FORWARD:"pi pi-fast-forward",FILE_EXCEL:"pi pi-file-excel",FILE_O:"pi pi-file-o",FILE_PDF:"pi pi-file-pdf",FILE:"pi pi-file",FILTER:"pi pi-filter",FILTER_SLASH:"pi pi-filter-slash",FLAG:"pi pi-flag",FOLDER_OPEN:"pi pi-folder-open",FOLDER:"pi pi-folder",FORWARD:"pi pi-forward",GITHUB:"pi pi-github",GLOBE:"pi pi-globe",GOOGLE:"pi pi-google",HEART:"pi pi-heart",HOME:"pi pi-home",ID_CARD:"pi pi-id-card",IMAGE:"pi pi-image",IMAGES:"pi pi-images",INBOX:"pi pi-inbox",INFO_CIRCLE:"pi pi-info-circle",INFO:"pi pi-info",KEY:"pi pi-key",LINK:"pi pi-link",LIST:"pi pi-list",LOCK_OPEN:"pi pi-lock-open",LOCK:"pi pi-lock",MAP:"pi pi-map",MAP_MARKER:"pi pi-map-marker",MICROSOFT:"pi pi-microsoft",MINUS_CIRCLE:"pi pi-minus-circle",MINUS:"pi pi-minus",MOBILE:"pi pi-mobile",MONEY_BILL:"pi pi-money-bill",MOON:"pi pi-moon",PALETTE:"pi pi-palette",PAPERCLIP:"pi pi-paperclip",PAUSE:"pi pi-pause",PAYPAL:"pi pi-paypal",PENCIL:"pi pi-pencil",PERCENTAGE:"pi pi-percentage",PHONE:"pi pi-phone",PLAY:"pi pi-play",PLUS_CIRCLE:"pi pi-plus-circle",PLUS:"pi pi-plus",POWER_OFF:"pi pi-power-off",PRINT:"pi pi-print",QUESTION_CIRCLE:"pi pi-question-circle",QUESTION:"pi pi-question",RADIO_OFF:"pi pi-radio-off",RADIO_ON:"pi pi-radio-on",REFRESH:"pi pi-refresh",REPLAY:"pi pi-replay",REPLY:"pi pi-reply",SAVE:"pi pi-save",SEARCH_MINUS:"pi pi-search-minus",SEARCH_PLUS:"pi pi-search-plus",SEARCH:"pi pi-search",SEND:"pi pi-send",SHARE_ALT:"pi pi-share-alt",SHIELD:"pi pi-shield",SHOPPING_CART:"pi pi-shopping-cart",SIGN_IN:"pi pi-sign-in",SIGN_OUT:"pi pi-sign-out",SITEMAP:"pi pi-sitemap",SLACK:"pi pi-slack",SLIDERS_H:"pi pi-sliders-h",SLIDERS_V:"pi pi-sliders-v",SORT_ALPHA_ALT_DOWN:"pi pi-sort-alpha-alt-down",SORT_ALPHA_ALT_UP:"pi pi-sort-alpha-alt-up",SORT_ALPHA_DOWN:"pi pi-sort-alpha-down",SORT_ALPHA_UP:"pi pi-sort-alpha-up",SORT_ALT:"pi pi-sort-alt",SORT_AMOUNT_DOWN_ALT:"pi pi-sort-amount-down-alt",SORT_AMOUNT_DOWN:"pi pi-sort-amount-down",SORT_AMOUNT_UP_ALT:"pi pi-sort-amount-up-alt",SORT_AMOUNT_UP:"pi pi-sort-amount-up",SORT_DOWN:"pi pi-sort-down",SORT_NUMERIC_ALT_DOWN:"pi pi-sort-numeric-alt-down",SORT_NUMERIC_ALT_UP:"pi pi-sort-numeric-alt-up",SORT_NUMERIC_DOWN:"pi pi-sort-numeric-down",SORT_NUMERIC_UP:"pi pi-sort-numeric-up",SORT_UP:"pi pi-sort-up",SORT:"pi pi-sort",SPINNER:"pi pi-spinner",STAR_O:"pi pi-star-o",STAR:"pi pi-star",STEP_BACKWARD_ALT:"pi pi-step-backward-alt",STEP_BACKWARD:"pi pi-step-backward",STEP_FORWARD_ALT:"pi pi-step-forward-alt",STEP_FORWARD:"pi pi-step-forward",SUN:"pi pi-sun",TABLE:"pi pi-table",TABLET:"pi pi-tablet",TAG:"pi pi-tag",TAGS:"pi pi-tags",TH_LARGE:"pi pi-th-large",THUMBS_DOWN:"pi pi-thumbs-down",THUMBS_UP:"pi pi-thumbs-up",TICKET:"pi pi-ticket",TIMES_CIRCLE:"pi pi-times-circle",TIMES:"pi pi-times",TRASH:"pi pi-trash",TWITTER:"pi pi-twitter",UNDO:"pi pi-undo",UNLOCK:"pi pi-unlock",UPLOAD:"pi pi-upload",USER_EDIT:"pi pi-user-edit",USER_MINUS:"pi pi-user-minus",USER_PLUS:"pi pi-user-plus",USER:"pi pi-user",USERS:"pi pi-users",VIDEO:"pi pi-video",VIMEO:"pi pi-vimeo",VOLUME_DOWN:"pi pi-volume-down",VOLUME_OFF:"pi pi-volume-off",VOLUME_UP:"pi pi-volume-up",YOUTUBE:"pi pi-youtube",WALLET:"pi pi-wallet",WIFI:"pi pi-wifi",WINDOW_MAXIMIZE:"pi pi-window-maximize",WINDOW_MINIMIZE:"pi pi-window-minimize"});Object.freeze({SUCCESS:"success",INFO:"info",WARN:"warn",ERROR:"error"});const z="story",$="forum_discussion",q="characters",Y="guidebook",Q="unknown",X="listening_challenge",Z="other_challenge",J=[X,Z,Y,z,$,q,Q];x.VOLUME_UP,x.PENCIL,x.MAP,x.BOOK,x.COMMENTS,x.INFO,x.QUESTION;const ee="main",ie="default",te="options",re=[C,N],ne=W(N),oe=K(N),pe=e=>e>=ne&&e<=oe,ae={displayedContextPanels:{default:J,predicate:n},displayedSoundTypes:{default:T,predicate:n},ratePresetNormal:{default:k(N),predicate:pe},ratePresetFast:{default:Math.min(2,K(N)),predicate:pe},rateSliderMinimum:{default:W(N),predicate:pe},rateSliderMaximum:{default:Math.min(2.5,K(N)),predicate:pe}},ce=e=>C===e,ue=(e,i=null,t=null)=>({[b]:{[I]:i},[R]:{[I]:i,slow:i},[m]:{[I]:i},[L]:{[I]:i},[w]:{[I]:i},...ce(e)?{[ee]:t}:{}}),le=(e,i)=>Object.fromEntries([[ie,ue(e,{value:i,isRelative:!0},{value:i})],...J.map((i=>[i,ue(e)]))]),se=Object.fromEntries([[te,Object.fromEntries(Object.entries(ae).map((([e,i])=>[e,i.default])))],...re.map((e=>[e,le(e,k(e))]))]),_e=(e,i,t,r,n,p)=>{return a=t,c=r,o(se[C][ie][a][c])?g({},e,{[i]:{[null!=n?n:ie]:{[t]:{[r]:p}}}}):e;var a,c},fe=e=>re.includes(e.setting)&&a(e,"value")&&(!e.context||J.includes(e.context)),de=(e,i)=>{if(!fe(i))return e;const{setting:t,context:r,value:n,soundType:o=null,soundSpeed:p=null}=i;return o&&p?_e(e,t,o,p,r,n):((e,i,t,r)=>ce(i)?g({},e,{[i]:{[null!=t?t:ie]:{[ee]:r}}}):e)(e,t,r,n)},he=e=>({...se[te],...o(e[te])?e[te]:{}}),ve=(e,i)=>((e,i,t)=>{const r=ae[i];return null!=r&&r.predicate(t)?{...e,[te]:{...he(e),[i]:t}}:e})(e,i.option,i.value),Ee="profiles",Oe="readMessages",ye=async(e,t,r)=>{if(o(e)&&o(e.updateRequest)){const n=(await i.get(Ee))[Ee]||{};n[0]=r(n[0]||se,e.updateRequest),await i.set({[Ee]:n}),t(n[0]),(async(e,i)=>{try{await chrome.runtime.sendMessage({type:O,event:e,value:i})}catch(e){}await chrome.tabs.query({url:"https://*.duolingo.com/*"},(async t=>{for(const r of t)try{await chrome.tabs.sendMessage(r.id,{type:O,event:e,value:i})}catch(e){chrome.runtime.lastError}}))})("current_profile_changed",n[0])}};var Ae;Ae=async(e,t,r,o)=>{switch(e){case"get_read_messages":await(async e=>{const t=(await i.get(Oe))[Oe]||[];e(n(t)?t:[])})(o);break;case"mark_message_as_read":await(async(e,t)=>{let r=(await i.get(Oe))[Oe]||[];n(r)||(r=[]),r.includes(e)||(r.push(e),await i.set({[Oe]:r})),t(!0)})(t,o);break;case"get_current_profile":await(async e=>{e(((await i.get(Ee))[Ee]||{})[0]||se)})(o);break;case"update_current_profile_sound_settings":await ye(t,o,((e,i)=>fe(i)?de(e,i):e));break;case"update_current_profile_customization_options":await ye(t,o,((e,i)=>(e=>a(e,"option")&&a(e,"value")&&a(ae,e.option))(i)?ve(e,i):e))}},chrome.runtime.onMessage.addListener(((e,i,t)=>{if(E===e.type){let r=!1;const n=e=>{r=!0,t({type:"success",value:e})},o=e=>{r=!0,t({type:"failure",error:e})};try{Promise.resolve(Ae(e.action,e.value,i,n,o)).then((()=>{if(!r)throw new Error(`Could not handle action request: "${e.action}".`)})).catch((e=>{r||o(e)}))}catch(e){!r&&o(e)}return!0}})),chrome.tabs.onUpdated.addListener(((e,i)=>e&&(null!=i&&i.id?u(i):l(e,u)))),chrome.tabs.onActivated.addListener((({tabId:e})=>e&&l(e,u)))}();
