!function(){"use strict";const e=()=>{},t=e=>"number"==typeof e&&Number.isFinite(e),n=e=>"string"==typeof e,r=Array.isArray,o=e=>"object"==typeof e&&!!e&&!r(e),a=e=>"function"==typeof e,l=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i=e=>{for(let t in e)if(l(e,t))return!1;return!0},u=e=>{let t=null;if("/"===e.charAt(0)&&("/"===e.charAt(1)?e=`https://${e}`:t=e),null===t)try{t=new URL(e).pathname}catch(n){t=e}return t},s=e=>`__duo-toolbox__-${e}`,c=s("global_variables"),d=(e,t)=>(o(window[c])||(window[c]={}),l(window[c],e)?window[c][e]:t),f=(e,t)=>{o(window[c])||(window[c]={}),window[c][e]=t},p=(e,t,n)=>{const r=t(d(e,n));return f(e,r),r},v=(e,t,n,r,o=1)=>{l(window,e)&&t(window[e])?n(window[e]):p("pending_global_listeners",((a={})=>{var l;if(!a[e]){a[e]={};let n=window[e];Object.defineProperty(window,e,{get:()=>n,set:r=>{t(r)?(Object.defineProperty(window,e,{value:r,configurable:!0,enumerable:!0,writable:!0}),Object.values(a[e]).forEach((e=>e.callback(r)))):n=r},configurable:!0})}return o>(Number(null===(l=a[e][r])||void 0===l?void 0:l.version)||0)&&(a[e][r]={callback:n,version:o}),a}))},h=s("original_function"),g=s("override_version"),_=(t,n,r,a=1)=>{var l;if(o(t)&&a>(Number(null===(l=t[n])||void 0===l?void 0:l[g])||0)){var i;const o=(null===(i=t[n])||void 0===i?void 0:i[h])||t[n]||e;t[n]=r(o),t[n][h]=o,t[n][g]=a}},y=(e,t,n,r=1)=>v(e,a,(e=>_(null==e?void 0:e.prototype,t,n,r)),`instance_method:${t}`,r),m=s("logging_iframe"),b=s("action_request"),w=s("action_result"),j=s("background_event_notification"),O=()=>(()=>{let e=document.getElementById(m);return e&&e.isConnected||(e=document.createElement("iframe"),e.id=m,e.style.display="none",document.body.appendChild(e)),e})().contentWindow.console,T=(...e)=>O().error(...e),k="assist",x="characterIntro",S="characterMatch",A="characterPuzzle",E="characterSelect",L="characterTrace",R="listen",z="listenComprehension",M="listenIsolation",$="listenMatch",C="listenTap",K="selectPronunciation",q="selectTranscription",U=[k,x,S,A,E,L,"completeReverseTranslation","definition","dialogue","form","freeResponse","gapFill","judge",R,z,M,$,"listenSpell",C,"match","name","partialReverseTranslate","readComprehension","select",K,q,"speak","tapCloze","tapClozeTable","tapComplete","tapCompleteTable","tapDescribe","translate","typeCloze","typeClozeTable","typeCompleteTable"],V=[x,S,A,E,L,K,q],I=[...[x,K,q],...[k,M,$],...[R,z,C]],N=e=>{var t,n;return(null===(t=e.metadata)||void 0===t?void 0:t.source_language)||e.sourceLanguage||(null===(n=e.metadata)||void 0===n?void 0:n.learning_language)},P=e=>{var t;return(null===(t=e.metadata)||void 0===t?void 0:t.target_language)||e.targetLanguage||N(e)},D="none",F=Number.MAX_SAFE_INTEGER,B=Math.round(F/4),H="effect",Q="tts_sentence",X="tts_word",G="tts_morpheme",W="unknown",J="normal",Y="slow",Z="audio",ee="howler",te=[Z,ee],ne="rate",re="volume",oe=s("forced_setting"),ae=e=>o(e)&&!!e[oe],le=e=>e.value,ie=e=>({[oe]:!0,value:e}),ue=(e,n)=>ne===e&&t(n)||re===e&&n>=0&&n<=1,se=(e,n)=>((e,t,n,r=1)=>{if(!o(e))return;const a=s(`${t}_override_version`);r>(Number(e[a])||0)&&Object.defineProperty(e,t,n(Object.getOwnPropertyDescriptor(e,t)))})(HTMLMediaElement,n,(n=>({...n,set:function(r){const o=fe[e];t(r)?(this[o.originalValueKey]=r,l(this,o.valueKey)&&(r=this[o.isRelativeKey]?he(e,r*this[o.valueKey]):this[o.valueKey])):ae(r)&&(r=le(r)),t(r)&&(this[o.listenerValueKey]=r),n.set.call(this,r)}}))),ce=(e,t)=>y("Howl",t,(n=>function(){const r=this,o=arguments,a=fe[e];let i=!1;const u=r._queue.length;(1===o.length||2===o.length&&void 0===o[1])&&-1===r._getSoundIds().indexOf(o[0])&&(ae(o[0])?(i=!0,o[0]=le(o[0])):ue(e,o[0])&&(r[a.originalValueKey]=o[0],l(r,a.valueKey)&&(i=!0,r[a.isRelativeKey]?o[0]=he(e,o[0]*r[a.valueKey]):o[0]=r[a.valueKey])),i&&(r[a.listenerValueKey]=o[0]));const s=n.apply(r,arguments);return i&&u<r._queue.length&&(r._queue[r._queue.length-1].action=function(){o[0]=ie(o[0]),r[t](...o)}),s})),de=(e,t,n,r)=>({...r,functions:{[Z]:{applyOverride:()=>se(e,n),getter:e=>e[t],setter:(e,n)=>e[t]=n,hasQueuedUpdate:()=>!1},[ee]:{applyOverride:()=>ce(e,n),getter:e=>e[n](),setter:(e,t)=>e[n](t),hasQueuedUpdate:e=>e._queue.find((e=>e.event===n))}},priorityKey:s(`${e}_priority`),isRelativeKey:s(`${e}_is_relative`),valueKey:s(`forced_${e}_value`),originalValueKey:s(`original_${e}_value`),listenerValueKey:s(`${e}_value`)}),fe={[ne]:de(ne,"playbackRate","rate",{minValue:.5,maxValue:4,defaultValue:1}),[re]:de(re,"volume","volume",{minValue:0,maxValue:1,defaultValue:1})},pe=e=>{const t=fe[e];if(!t)throw new Error(`Unknown sound setting: "${e}".`);return t},ve=e=>pe(e).defaultValue,he=(e,t)=>fe[e]?Math.max(fe[e].minValue,Math.min(t,fe[e].maxValue)):t,ge=(e,t,n,r,o=!1,a=1)=>{const i=pe(e);if(a>=(Number(n[i.priorityKey])||0)){const u=he(e,t),s=((e,t)=>{if(-1===te.indexOf(t))throw new Error(`Unknown sound playback strategy: "${t}".`);return pe(e).functions[t]})(e,r);s.applyOverride(),n[i.valueKey]=u,n[i.priorityKey]=a,n[i.isRelativeKey]=o,l(n,i.originalValueKey)||(n[i.originalValueKey]=s.getter(n)),s.hasQueuedUpdate(n)||s.setter(n,ie(he(e,u*(o?n[i.originalValueKey]:1))))}},_e="event_listeners",ye=()=>{return`__listener::${e="last_event_listener_id",p(`__counter::${e}__`,(e=>e+1),0)}__`;var e},me=e=>{var t;return(null===(t=d(_e,{}))||void 0===t?void 0:t[e])||{}},be=(e,t)=>{p(_e,(n=>Object.assign(n||{},{[e]:t})))},we=e=>!i(me(e)),je=(e,t)=>{const n=me(e);return i(n)?null:t(Object.values(n))},Oe=(e,t,n=ye())=>{const r=me(e);return r[n]=t,be(e,r),()=>ke(e,n)},Te=(e,t,n,o,a=Oe,l=ye())=>{const i=`__${t}::${e}__`;var u;u=i,me(t)[u]||a(t,((...t)=>{const n=o(...t);r(n)&&xe(e,...n)}),i);const s=Oe(e,n,l);return()=>{s(),we(e)||ke(t,i)}},ke=(e,t)=>{const n=me(e);delete n[t],be(e,n)},xe=(e,...t)=>je(e,(e=>e.flatMap((e=>{try{return[e(...t)]}catch(e){return[]}})))),Se="practice_session_loaded",Ae="practice_challenges_loaded",Ee="pre_fetched_session_loaded",Le="story_loaded",Re="alphabets_loaded",ze="alphabet_hints_loaded",Me="forum_discussion_loaded",$e="guidebook_loaded",Ce="sound_playback_requested",Ke="sound_playback_confirmed",qe="sound_playback_cancelled",Ue={[Re]:/\/[\d]{4}-[\d]{2}-[\d]{2}\/alphabets\/courses\/(?<toLanguage>[^/]+)\/(?<fromLanguage>[^/?]+)\/?/g,[Me]:/\/comments\/([\d]+)/g,[$e]:/\/guidebook\/compiled\/(?<toLanguage>[^/]+)\/(?<fromLanguage>[^/]+)\/?/g,[Se]:/\/[\d]{4}-[\d]{2}-[\d]{2}\/sessions/g,[Le]:/\/api2\/stories/g,user_data_loaded:/\/[\d]{4}-[\d]{2}-[\d]{2}\/users\/[\d]+/g},Ve="http_request_url_event_map",Ie=()=>{let e=d(Ve);return e instanceof Map||(e=new Map,Object.entries(Ue).forEach((([t,n])=>{e.set(n,{eventType:t,urlRegExp:n,requestData:{}})})),f(Ve,e)),e},Ne=e=>{let t,n;const r=Ie();for(const o of r.values()){const r=Array.from(e.matchAll(o.urlRegExp))[0];if(r){t=o.eventType,n={...o.requestData,...r.groups||{}};break}}return t?{eventType:t,requestData:n}:null},Pe=(e,t,n=ye())=>(y("XMLHttpRequest","open",(e=>function(t,n,r,a,l){const i=Ne(n);return i&&je(i.eventType,(e=>{this.addEventListener("load",(()=>{try{const t=o(this.response)?this.response:JSON.parse(this.responseText);e.forEach((e=>e(t,i.requestData)))}catch(e){T(e,`Could not handle the XHR result (event: "${i.eventType}"): `)}}))})),e.call(this,t,n,r,a,l)}),3),((e,t,n=1)=>{v(e,a,(()=>_(window,e,t,n)),"global",n)})("fetch",(e=>function(t,n){const r=t instanceof Request?t.url:String(t);let o=null;const a=Ne(r);return a&&(o=je(a.eventType,(e=>t=>{try{e.forEach((e=>e(t,a.requestData)))}catch(e){T(e,`Could not handle the fetch result (event: "${a.eventType}"): `)}}))),e.call(this,t,n).then((e=>{if(!o)return e;const t=e.clone();return e.json().then((e=>(o(e),t))).catch((()=>t))}))}),2),Oe(e,t,n)),De=(e,t=ye())=>{const r=Ee,o=e=>je(r,(t=>{e.addEventListener("success",(()=>{try{t.forEach((t=>t(e.result)))}catch(e){T(e,`Could not handle the IDBRequest result (event: ${r}): `)}}))}));return y("IDBIndex","get",(e=>function(t){const r=e.call(this,t);return n(t)&&t&&"prefetchedSessions"===this.objectStore.name&&o(r),r})),y("IDBObjectStore","get",(e=>function(t){const n=e.call(this,t);return"prefetchedSessions"===this.name&&o(n),n})),Oe(r,e,t)},Fe=e=>{const t=e=>{let t;if(o(e)){var n;o(e.session)&&(e=e.session);t=[{challenges:[e.challenges,e.adaptiveChallenges,e.easierAdaptiveChallenges,e.mistakesReplacementChallenges,null===(n=e.adaptiveInterleavedChallenges)||void 0===n?void 0:n.challenges].filter(r).flat(),sessionMetaData:e.metadata||{}}]}return t},n=Te(Ae,Se,e,t,Pe),a=Te(Ae,Ee,e,t,((e,t,n)=>De(t,n)));return()=>{n(),a()}},Be=(e,t)=>({url:e,type:Q,speed:J,language:t}),He=(e,t)=>({url:e,type:X,speed:J,language:t}),Qe=(e,t)=>({url:e,type:G,speed:J,language:t}),Xe=Object.fromEntries(["/sounds/7abe057dc8446ad325229edd6d8fd250.mp3","/sounds/2aae0ea735c8e9ed884107d6f0a09e35.mp3","/sounds/421d48c53ad6d52618dba715722278e0.mp3","/sounds/37d8f0b39dcfe63872192c89653a93f6.mp3","/sounds/0a27c1ee63dd220647e8410a0029aed2.mp3","/sounds/a28ff0a501ef5f33ca78c0afc45ee53e.mp3","/sounds/2e4669d8cf839272f0731f8afa488caf.mp3","/sounds/f0b6ab4396d5891241ef4ca73b4de13a.mp3"].map((e=>{return[e,(t=e,{url:t,type:H,speed:J,language:null})];var t}))),Ge=/\/duolingo-data\/tts\/(?<language>[a-z-_]+)\/token\//i,We="sound_type_map",Je=()=>d(We,Xe),Ye=[W,Q,X,G,H],Ze=[J,Y],et=(e,t)=>((e,t,n)=>{for(const r of e){const e=Number(r(t,n));if(!isNaN(e)&&0!==e)return e}return 0})([(e,t)=>Ye.indexOf(e.type)-Ye.indexOf(t.type),(e,t)=>Ze.indexOf(e.speed)-Ze.indexOf(t.speed)],e,t),tt=e=>{const t=Je()||{};for(const n of e){const e=u(n.url);(!t[e]||et(n,t[e])>0)&&(t[e]=n)}f(We,t)},nt="sound_detection_listeners_version",rt="sound_detection_unregistration_callbacks",ot=(e,t,n)=>{var r;return{url:e.url,type:t,speed:(null===(r=e.speed)||void 0===r?void 0:r.value)||J,language:n}},at=(e,t)=>{if(r(null==e?void 0:e.alphabets)&&n(null==t?void 0:t.toLanguage)){const a=t.toLanguage;tt(e.alphabets.flatMap((e=>null==e?void 0:e.groups)).flatMap((e=>null==e?void 0:e.characters)).flat().map((e=>null==e?void 0:e.ttsUrl)).filter(n).map((e=>Qe(e,a))));const l=[];for(const t of e.alphabets){var o;n(t.explanationUrl)&&l.push(t.explanationUrl),r(null===(o=t.explanationListing)||void 0===o?void 0:o.groups)&&l.push(...t.explanationListing.groups.flatMap((e=>null==e?void 0:e.tips)).map((e=>null==e?void 0:e.url)).filter(n))}l.length>0&&((e,t,n={})=>{const r=Ie();for(const a of t)r.set(a,{eventType:e,requestData:n,urlRegExp:a instanceof RegExp?a:new RegExp((o=String(a),o.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")),"g")});var o})(ze,l,t)}},lt=(e,t)=>{if(r(null==e?void 0:e.elements)&&n(null==t?void 0:t.toLanguage)){const r=t.toLanguage;tt(e.elements.flatMap((({element:e})=>o(e)&&[e].concat(e.phrases||[]).concat(e.examples||[]))).filter(o).flatMap((e=>((e,t)=>{var r,a,l,i,u;const s=[],c=e.ttsURL;return n(c)&&s.push(Be(c,t)),s.concat([(null===(r=e.tokenTTS)||void 0===r?void 0:r.tokenTTSCollection)||[],(null===(a=e.text)||void 0===a||null===(l=a.tokenTTS)||void 0===l?void 0:l.tokenTTSCollection)||[],(null===(i=e.subtext)||void 0===i||null===(u=i.tokenTTS)||void 0===u?void 0:u.tokenTTSCollection)||[]].flat().filter(o).map((e=>null==e?void 0:e.ttsURL)).filter((e=>(e=>n(e))&&e!==c)).map((e=>He(e,t))))})(e,r))))}},it=()=>{const e=3<=(Number(d(nt))||0);var t,a,l,i,u,s;!!d(rt)&&e||(e||ut(),f(nt,3),f(rt,[(s=e=>(e=>{const t=e.learningLanguage;r(null==e?void 0:e.elements)&&tt(e.elements.map((e=>{var t;return(null==e||null===(t=e.line)||void 0===t?void 0:t.content)||(null==e?void 0:e.learningLanguageTitleContent)})).flatMap((e=>[null==e?void 0:e.audio,null==e?void 0:e.audioPrefix,null==e?void 0:e.audioSuffix])).map((e=>null==e?void 0:e.url)).filter(n).map((e=>Be(e,t))))})(e),Pe(Le,s)),(i=(e,t)=>at(e,t),Pe(Re,i,u)),(l=(e,t)=>((e,t)=>{if(r(null==e?void 0:e.elements)&&n(null==t?void 0:t.toLanguage)){const r=e.elements.map((e=>null==e?void 0:e.element)).flatMap((e=>{var t;return null==e||null===(t=e.tokenTTS)||void 0===t?void 0:t.tokenTTSCollection}));r.push(...e.elements.map((e=>null==e?void 0:e.element)).flatMap((e=>null==e?void 0:e.cells)).flat().flatMap((e=>{var t;return null==e||null===(t=e.tokenTTS)||void 0===t?void 0:t.tokenTTSCollection})));const o=t.toLanguage;tt(r.map((e=>null==e?void 0:e.ttsURL)).filter(n).map((e=>Qe(e,o))))}})(e,t),Pe(ze,l)),(a=e=>{var t;n(null==(t=e)?void 0:t.tts_url)&&tt([Be(t.tts_url,t.sentence_language)])},Pe(Me,a)),(t=(e,t)=>lt(e,t),Pe($e,t)),Fe((e=>(e=>{const t=[];for(const u of e){var a;const e=u.type,s=N(u),c=P(u);if(n(u.tts)){const n=V.indexOf(e)>=0?Qe:Be;t.push(n(u.tts,s))}if(n(u.slowTts)&&t.push({url:u.slowTts,type:Q,speed:Y,language:s}),n(u.solutionTts)&&t.push(Be(u.solutionTts,c)),r(u.choices)){const r=-1===V.indexOf(e)?He:Qe;t.push(u.choices.map((e=>null==e?void 0:e.tts)).filter(n).map((e=>r(e,c))))}if(r(u.tokens)&&t.push(u.tokens.map((e=>null==e?void 0:e.tts)).filter(n).map((e=>He(e,s)))),r(u.questionTokens)&&t.push(u.questionTokens.map((e=>null==e?void 0:e.tts)).filter(n).map((e=>He(e,c)))),r(null===(a=u.metadata)||void 0===a?void 0:a.speakers))for(const e of u.metadata.speakers){var l,i;o(null===(l=e.tts)||void 0===l?void 0:l.tokens)&&t.push(Object.values(e.tts.tokens).filter((e=>n(e.url))).map((e=>ot(e,X,c)))),r(null===(i=e.tts)||void 0===i?void 0:i.sentence)&&t.push(e.tts.sentence.filter((e=>n(e.url))).map((e=>ot(e,Q,c))))}if(r(u.pairs)){const r=-1===V.indexOf(e)?He:Qe;t.push(u.pairs.map((e=>null==e?void 0:e.tts)).filter(n).map((e=>r(e,c))))}r(u.options)&&t.push(u.options.map((e=>null==e?void 0:e.tts)).filter(n).map((e=>He(e,c))))}tt(t.flat())})(e.challenges)))]))},ut=()=>{const e=d(rt);!r(e)||we("sound_initialized")||we(Ce)||we(qe)||we(Ke)||(e.forEach((e=>e())),f(nt,null),f(rt,null))},st=(e,t,n)=>{const r=(e=>{const t=Je()[e];if(o(t))return t;const n=e.match(Ge);return n?He(e,n.language):null})(u(t));return{url:t,type:(null==r?void 0:r.type)||W,speed:(null==r?void 0:r.speed)||J,language:null==r?void 0:r.language,playbackStrategy:n,sound:e}},ct=(e,t)=>{y("Howl","play",(e=>function(t){var n;f("is_howler_used",!0);const r=String(this._src||(null===(n=this._parent)||void 0===n?void 0:n._src)||"").trim();return""!==r?((e,t,n,r)=>{const o=st(e,t,n);let a=!1;try{var l;a=null===(l=xe(Ce,o))||void 0===l?void 0:l.some((e=>!1===e)),xe(a?qe:Ke,o)}catch(e){T(e,`Could not handle playback for sound "${t}" (using "${n}"): `)}return a?null:r()})(this,r,ee,(()=>e.call(this,t))):e.call(this,t)})),it();const n=Oe(e,t);return()=>{n(),ut()}},dt="challenge",ft="challenge_review",pt="story",vt="forum_discussion",ht="characters",gt="guidebook",_t="unknown",yt=/duolingo\.com\/stories\/(?<story_key>[^/]+)/,mt=/forum\.duolingo\.com\/comment\/(?<comment_id>[\d]+)/,bt=/duolingo\.com\/characters\/?/,wt=/duolingo\.com\/alphabets\/?/,jt=/duolingo\.com\/guidebook\/(?<language>.+)\/(?<index>[\d]+)\/?/,Ot=/duolingo\.com\/(practice|lesson)\/?/,Tt="listening_challenge",kt="other_challenge",xt=[Tt,kt,gt,pt,vt,ht,_t],St=()=>{const e=(()=>{const e=document.location.href;let t=e.match(mt);if(r(t))return{type:vt,commentId:Number(t.comment_id)||null};var n;if(t=e.match(yt),r(t)||document.querySelector('[data-test="stories-element"]'))return{type:pt,storyKey:null===(n=t)||void 0===n?void 0:n.story_key};if(e.match(bt)||e.match(wt))return{type:ht};if(t=e.match(jt),r(t))return{type:gt,languageName:t.language,unitIndex:Number(t.index)};const o=document.querySelector('[data-test*="challenge"]');if(o){let e=null;for(const t of(null===(a=o.getAttribute("data-test"))||void 0===a?void 0:a.split(/\s+/))||[]){var a,l;const n=null===(l=t.match(/challenge-(?<type>[a-z]+)/i))||void 0===l?void 0:l.groups.type.trim();if(U.indexOf(n)>=0){e=n;break}}let t=D;const n=document.querySelector("._2Fc1K ._1tuLI");return n&&(t=n.classList.contains("_3e9O1")?"correct":"incorrect"),{type:dt,challengeType:e,result:t,isCompleted:D!==t}}return e.match(Ot)?{type:ft}:{type:_t}})();let t=e.type;return dt===t?t=-1===I.indexOf(e.challengeType)?kt:Tt:ft===t&&(t=Tt),t};var At="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},Et={exports:{}};!function(e,t){var n="__lodash_hash_undefined__",r=9007199254740991,o="[object Arguments]",a="[object Function]",l="[object Object]",i=/^\[object .+?Constructor\]$/,u=/^(?:0|[1-9]\d*)$/,s={};s["[object Float32Array]"]=s["[object Float64Array]"]=s["[object Int8Array]"]=s["[object Int16Array]"]=s["[object Int32Array]"]=s["[object Uint8Array]"]=s["[object Uint8ClampedArray]"]=s["[object Uint16Array]"]=s["[object Uint32Array]"]=!0,s[o]=s["[object Array]"]=s["[object ArrayBuffer]"]=s["[object Boolean]"]=s["[object DataView]"]=s["[object Date]"]=s["[object Error]"]=s[a]=s["[object Map]"]=s["[object Number]"]=s[l]=s["[object RegExp]"]=s["[object Set]"]=s["[object String]"]=s["[object WeakMap]"]=!1;var c="object"==typeof At&&At&&At.Object===Object&&At,d="object"==typeof self&&self&&self.Object===Object&&self,f=c||d||Function("return this")(),p=t&&!t.nodeType&&t,v=p&&e&&!e.nodeType&&e,h=v&&v.exports===p,g=h&&c.process,_=function(){try{var e=v&&v.require&&v.require("util").types;return e||g&&g.binding&&g.binding("util")}catch(e){}}(),y=_&&_.isTypedArray;function m(e,t,n){switch(n.length){case 0:return e.call(t);case 1:return e.call(t,n[0]);case 2:return e.call(t,n[0],n[1]);case 3:return e.call(t,n[0],n[1],n[2])}return e.apply(t,n)}var b,w,j,O=Array.prototype,T=Function.prototype,k=Object.prototype,x=f["__core-js_shared__"],S=T.toString,A=k.hasOwnProperty,E=(b=/[^.]+$/.exec(x&&x.keys&&x.keys.IE_PROTO||""))?"Symbol(src)_1."+b:"",L=k.toString,R=S.call(Object),z=RegExp("^"+S.call(A).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),M=h?f.Buffer:void 0,$=f.Symbol,C=f.Uint8Array,K=M?M.allocUnsafe:void 0,q=(w=Object.getPrototypeOf,j=Object,function(e){return w(j(e))}),U=Object.create,V=k.propertyIsEnumerable,I=O.splice,N=$?$.toStringTag:void 0,P=function(){try{var e=ve(Object,"defineProperty");return e({},"",{}),e}catch(e){}}(),D=M?M.isBuffer:void 0,F=Math.max,B=Date.now,H=ve(f,"Map"),Q=ve(Object,"create"),X=function(){function e(){}return function(t){if(!xe(t))return{};if(U)return U(t);e.prototype=t;var n=new e;return e.prototype=void 0,n}}();function G(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function W(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function J(e){var t=-1,n=null==e?0:e.length;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}function Y(e){var t=this.__data__=new W(e);this.size=t.size}function Z(e,t){var n=we(e),r=!n&&be(e),o=!n&&!r&&Oe(e),a=!n&&!r&&!o&&Ae(e),l=n||r||o||a,i=l?function(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}(e.length,String):[],u=i.length;for(var s in e)!t&&!A.call(e,s)||l&&("length"==s||o&&("offset"==s||"parent"==s)||a&&("buffer"==s||"byteLength"==s||"byteOffset"==s)||he(s,u))||i.push(s);return i}function ee(e,t,n){(void 0!==n&&!me(e[t],n)||void 0===n&&!(t in e))&&re(e,t,n)}function te(e,t,n){var r=e[t];A.call(e,t)&&me(r,n)&&(void 0!==n||t in e)||re(e,t,n)}function ne(e,t){for(var n=e.length;n--;)if(me(e[n][0],t))return n;return-1}function re(e,t,n){"__proto__"==t&&P?P(e,t,{configurable:!0,enumerable:!0,value:n,writable:!0}):e[t]=n}G.prototype.clear=function(){this.__data__=Q?Q(null):{},this.size=0},G.prototype.delete=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t},G.prototype.get=function(e){var t=this.__data__;if(Q){var r=t[e];return r===n?void 0:r}return A.call(t,e)?t[e]:void 0},G.prototype.has=function(e){var t=this.__data__;return Q?void 0!==t[e]:A.call(t,e)},G.prototype.set=function(e,t){var r=this.__data__;return this.size+=this.has(e)?0:1,r[e]=Q&&void 0===t?n:t,this},W.prototype.clear=function(){this.__data__=[],this.size=0},W.prototype.delete=function(e){var t=this.__data__,n=ne(t,e);return!(n<0)&&(n==t.length-1?t.pop():I.call(t,n,1),--this.size,!0)},W.prototype.get=function(e){var t=this.__data__,n=ne(t,e);return n<0?void 0:t[n][1]},W.prototype.has=function(e){return ne(this.__data__,e)>-1},W.prototype.set=function(e,t){var n=this.__data__,r=ne(n,e);return r<0?(++this.size,n.push([e,t])):n[r][1]=t,this},J.prototype.clear=function(){this.size=0,this.__data__={hash:new G,map:new(H||W),string:new G}},J.prototype.delete=function(e){var t=pe(this,e).delete(e);return this.size-=t?1:0,t},J.prototype.get=function(e){return pe(this,e).get(e)},J.prototype.has=function(e){return pe(this,e).has(e)},J.prototype.set=function(e,t){var n=pe(this,e),r=n.size;return n.set(e,t),this.size+=n.size==r?0:1,this},Y.prototype.clear=function(){this.__data__=new W,this.size=0},Y.prototype.delete=function(e){var t=this.__data__,n=t.delete(e);return this.size=t.size,n},Y.prototype.get=function(e){return this.__data__.get(e)},Y.prototype.has=function(e){return this.__data__.has(e)},Y.prototype.set=function(e,t){var n=this.__data__;if(n instanceof W){var r=n.__data__;if(!H||r.length<199)return r.push([e,t]),this.size=++n.size,this;n=this.__data__=new J(r)}return n.set(e,t),this.size=n.size,this};var oe,ae=function(e,t,n){for(var r=-1,o=Object(e),a=n(e),l=a.length;l--;){var i=a[oe?l:++r];if(!1===t(o[i],i,o))break}return e};function le(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":N&&N in Object(e)?function(e){var t=A.call(e,N),n=e[N];try{e[N]=void 0;var r=!0}catch(e){}var o=L.call(e);r&&(t?e[N]=n:delete e[N]);return o}(e):function(e){return L.call(e)}(e)}function ie(e){return Se(e)&&le(e)==o}function ue(e){return!(!xe(e)||function(e){return!!E&&E in e}(e))&&(Te(e)?z:i).test(function(e){if(null!=e){try{return S.call(e)}catch(e){}try{return e+""}catch(e){}}return""}(e))}function se(e){if(!xe(e))return function(e){var t=[];if(null!=e)for(var n in Object(e))t.push(n);return t}(e);var t=ge(e),n=[];for(var r in e)("constructor"!=r||!t&&A.call(e,r))&&n.push(r);return n}function ce(e,t,n,r,o){e!==t&&ae(t,(function(a,i){if(o||(o=new Y),xe(a))!function(e,t,n,r,o,a,i){var u=_e(e,n),s=_e(t,n),c=i.get(s);if(c)return void ee(e,n,c);var d=a?a(u,s,n+"",e,t,i):void 0,f=void 0===d;if(f){var p=we(s),v=!p&&Oe(s),h=!p&&!v&&Ae(s);d=s,p||v||h?we(u)?d=u:Se(b=u)&&je(b)?d=function(e,t){var n=-1,r=e.length;t||(t=Array(r));for(;++n<r;)t[n]=e[n];return t}(u):v?(f=!1,d=function(e,t){if(t)return e.slice();var n=e.length,r=K?K(n):new e.constructor(n);return e.copy(r),r}(s,!0)):h?(f=!1,g=s,_=!0?(y=g.buffer,m=new y.constructor(y.byteLength),new C(m).set(new C(y)),m):g.buffer,d=new g.constructor(_,g.byteOffset,g.length)):d=[]:function(e){if(!Se(e)||le(e)!=l)return!1;var t=q(e);if(null===t)return!0;var n=A.call(t,"constructor")&&t.constructor;return"function"==typeof n&&n instanceof n&&S.call(n)==R}(s)||be(s)?(d=u,be(u)?d=function(e){return function(e,t,n,r){var o=!n;n||(n={});var a=-1,l=t.length;for(;++a<l;){var i=t[a],u=r?r(n[i],e[i],i,n,e):void 0;void 0===u&&(u=e[i]),o?re(n,i,u):te(n,i,u)}return n}(e,Ee(e))}(u):xe(u)&&!Te(u)||(d=function(e){return"function"!=typeof e.constructor||ge(e)?{}:X(q(e))}(s))):f=!1}var g,_,y,m;var b;f&&(i.set(s,d),o(d,s,r,a,i),i.delete(s));ee(e,n,d)}(e,t,i,n,ce,r,o);else{var u=r?r(_e(e,i),a,i+"",e,t,o):void 0;void 0===u&&(u=a),ee(e,i,u)}}),Ee)}function de(e,t){return ye(function(e,t,n){return t=F(void 0===t?e.length-1:t,0),function(){for(var r=arguments,o=-1,a=F(r.length-t,0),l=Array(a);++o<a;)l[o]=r[t+o];o=-1;for(var i=Array(t+1);++o<t;)i[o]=r[o];return i[t]=n(l),m(e,this,i)}}(e,t,ze),e+"")}var fe=P?function(e,t){return P(e,"toString",{configurable:!0,enumerable:!1,value:(n=t,function(){return n}),writable:!0});var n}:ze;function pe(e,t){var n,r,o=e.__data__;return("string"==(r=typeof(n=t))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==n:null===n)?o["string"==typeof t?"string":"hash"]:o.map}function ve(e,t){var n=function(e,t){return null==e?void 0:e[t]}(e,t);return ue(n)?n:void 0}function he(e,t){var n=typeof e;return!!(t=null==t?r:t)&&("number"==n||"symbol"!=n&&u.test(e))&&e>-1&&e%1==0&&e<t}function ge(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||k)}function _e(e,t){if(("constructor"!==t||"function"!=typeof e[t])&&"__proto__"!=t)return e[t]}var ye=function(e){var t=0,n=0;return function(){var r=B(),o=16-(r-n);if(n=r,o>0){if(++t>=800)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}(fe);function me(e,t){return e===t||e!=e&&t!=t}var be=ie(function(){return arguments}())?ie:function(e){return Se(e)&&A.call(e,"callee")&&!V.call(e,"callee")},we=Array.isArray;function je(e){return null!=e&&ke(e.length)&&!Te(e)}var Oe=D||function(){return!1};function Te(e){if(!xe(e))return!1;var t=le(e);return t==a||"[object GeneratorFunction]"==t||"[object AsyncFunction]"==t||"[object Proxy]"==t}function ke(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=r}function xe(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}function Se(e){return null!=e&&"object"==typeof e}var Ae=y?function(e){return function(t){return e(t)}}(y):function(e){return Se(e)&&ke(e.length)&&!!s[le(e)]};function Ee(e){return je(e)?Z(e,!0):se(e)}var Le,Re=(Le=function(e,t,n){ce(e,t,n)},de((function(e,t){var n=-1,r=t.length,o=r>1?t[r-1]:void 0,a=r>2?t[2]:void 0;for(o=Le.length>3&&"function"==typeof o?(r--,o):void 0,a&&function(e,t,n){if(!xe(n))return!1;var r=typeof t;return!!("number"==r?je(n)&&he(t,n.length):"string"==r&&t in n)&&me(n[t],e)}(t[0],t[1],a)&&(o=r<3?void 0:o,r=1),e=Object(e);++n<r;){var l=t[n];l&&Le(e,l,n,o)}return e})));function ze(e){return e}e.exports=Re}(Et,Et.exports);const Lt="default",Rt="main",zt=[re,ne],Mt=e=>re===e,$t=(e,t=null,n=null)=>({[H]:{[J]:t},[Q]:{[J]:t,[Y]:t},[X]:{[J]:t},[G]:{[J]:t},[W]:{[J]:t},...Mt(e)?{[Rt]:n}:{}}),Ct=(e,t)=>Object.fromEntries([[Lt,$t(e,{value:t,isRelative:!0},{value:t})],...xt.map((t=>[t,$t(e)]))]),Kt=Object.fromEntries(zt.map((e=>[e,Ct(e,ve(e))]))),qt=(e,t)=>o(Kt.volume.default[e][t]),Ut=(e,t,n,r=!0)=>{var a,l;if(!Mt(t))return;const i=null==e||null===(a=e[t])||void 0===a||null===(l=a[null!=n?n:Lt])||void 0===l?void 0:l.main;return o(i)?i:null===n?{value:ve(t)}:r?Ut(e,t,null):null},Vt=(e,t,n,r,a,l=!0)=>{var i,u,s;if(!qt(n,r))return;const c=null==e||null===(i=e[t])||void 0===i||null===(u=i[null!=a?a:Lt])||void 0===u||null===(s=u[n])||void 0===s?void 0:s[r];return o(c)?c:null===a?{isRelative:!0,value:ve(t)}:l?Vt(e,t,n,r,null):null},It=(e,t,n,r,o)=>{if(!qt(n,r))return;const a=Vt(e,t,n,r,o);if(!Mt(t))return a;const l=Ut(e,t,o);return{isRelative:a.isRelative,value:l.value*a.value}};let Nt=null;const Pt=e=>Nt=e;((e,t)=>{var n;const a=r(t)?e=>t.indexOf(e)>=0:()=>!0,l=t=>{const n=o(t.data)?t.data:t;return n&&j===n.type&&a(n.event)&&e(n.event,n.value)};"undefined"!=typeof chrome&&null!==(n=chrome.runtime)&&void 0!==n&&n.onMessage?chrome.runtime.onMessage.addListener(l):window.addEventListener("message",l)})(((e,t)=>{"current_profile_changed"===e&&Pt(t)})),(async(e,t)=>new Promise(((n,r)=>{const a=t=>{t.source===window&&o(t.data)&&w===t.data.type&&e===t.data.action&&("success"===t.data.result?n(t.data.value):r(t.data.error),t.stopPropagation(),window.removeEventListener("message",a))};window.addEventListener("message",a),window.postMessage({type:b,action:e,value:t},"*")})))("get_current_profile").catch((()=>null)).then(Pt),ct(Ke,(({sound:e,type:t,speed:n,playbackStrategy:r})=>{if(o(Nt)){const o=St(),a=It(Nt,ne,t,n,o),l=It(Nt,re,t,n,o);a&&ge(ne,a.value,e,r,a.isRelative,B),l&&ge(re,l.value,e,r,l.isRelative,B)}}))}();
