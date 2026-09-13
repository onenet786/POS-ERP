var Lr=Object.defineProperty;var Tr=(n,t,e)=>t in n?Lr(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var L=(n,t,e)=>Tr(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=e(s);fetch(s.href,o)}})();/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function Ue(n){return n+.5|0}const Ot=(n,t,e)=>Math.max(Math.min(n,e),t);function ke(n){return Ot(Ue(n*2.55),0,255)}function jt(n){return Ot(Ue(n*255),0,255)}function It(n){return Ot(Ue(n/2.55)/100,0,1)}function ys(n){return Ot(Ue(n*100),0,100)}const lt={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},Ii=[..."0123456789ABCDEF"],Br=n=>Ii[n&15],Rr=n=>Ii[(n&240)>>4]+Ii[n&15],Ke=n=>(n&240)>>4===(n&15),Dr=n=>Ke(n.r)&&Ke(n.g)&&Ke(n.b)&&Ke(n.a);function Or(n){var t=n.length,e;return n[0]==="#"&&(t===4||t===5?e={r:255&lt[n[1]]*17,g:255&lt[n[2]]*17,b:255&lt[n[3]]*17,a:t===5?lt[n[4]]*17:255}:(t===7||t===9)&&(e={r:lt[n[1]]<<4|lt[n[2]],g:lt[n[3]]<<4|lt[n[4]],b:lt[n[5]]<<4|lt[n[6]],a:t===9?lt[n[7]]<<4|lt[n[8]]:255})),e}const $r=(n,t)=>n<255?t(n):"";function zr(n){var t=Dr(n)?Br:Rr;return n?"#"+t(n.r)+t(n.g)+t(n.b)+$r(n.a,t):void 0}const Nr=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function va(n,t,e){const i=t*Math.min(e,1-e),s=(o,a=(o+n/30)%12)=>e-i*Math.max(Math.min(a-3,9-a,1),-1);return[s(0),s(8),s(4)]}function Fr(n,t,e){const i=(s,o=(s+n/60)%6)=>e-e*t*Math.max(Math.min(o,4-o,1),0);return[i(5),i(3),i(1)]}function jr(n,t,e){const i=va(n,1,.5);let s;for(t+e>1&&(s=1/(t+e),t*=s,e*=s),s=0;s<3;s++)i[s]*=1-t-e,i[s]+=t;return i}function Hr(n,t,e,i,s){return n===s?(t-e)/i+(t<e?6:0):t===s?(e-n)/i+2:(n-t)/i+4}function Xi(n){const e=n.r/255,i=n.g/255,s=n.b/255,o=Math.max(e,i,s),a=Math.min(e,i,s),r=(o+a)/2;let l,c,d;return o!==a&&(d=o-a,c=r>.5?d/(2-o-a):d/(o+a),l=Hr(e,i,s,d,o),l=l*60+.5),[l|0,c||0,r]}function Ji(n,t,e,i){return(Array.isArray(t)?n(t[0],t[1],t[2]):n(t,e,i)).map(jt)}function Qi(n,t,e){return Ji(va,n,t,e)}function Vr(n,t,e){return Ji(jr,n,t,e)}function qr(n,t,e){return Ji(Fr,n,t,e)}function xa(n){return(n%360+360)%360}function Wr(n){const t=Nr.exec(n);let e=255,i;if(!t)return;t[5]!==i&&(e=t[6]?ke(+t[5]):jt(+t[5]));const s=xa(+t[2]),o=+t[3]/100,a=+t[4]/100;return t[1]==="hwb"?i=Vr(s,o,a):t[1]==="hsv"?i=qr(s,o,a):i=Qi(s,o,a),{r:i[0],g:i[1],b:i[2],a:e}}function Ur(n,t){var e=Xi(n);e[0]=xa(e[0]+t),e=Qi(e),n.r=e[0],n.g=e[1],n.b=e[2]}function Gr(n){if(!n)return;const t=Xi(n),e=t[0],i=ys(t[1]),s=ys(t[2]);return n.a<255?`hsla(${e}, ${i}%, ${s}%, ${It(n.a)})`:`hsl(${e}, ${i}%, ${s}%)`}const vs={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},xs={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function Yr(){const n={},t=Object.keys(xs),e=Object.keys(vs);let i,s,o,a,r;for(i=0;i<t.length;i++){for(a=r=t[i],s=0;s<e.length;s++)o=e[s],r=r.replace(o,vs[o]);o=parseInt(xs[a],16),n[r]=[o>>16&255,o>>8&255,o&255]}return n}let Xe;function Kr(n){Xe||(Xe=Yr(),Xe.transparent=[0,0,0,0]);const t=Xe[n.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const Xr=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function Jr(n){const t=Xr.exec(n);let e=255,i,s,o;if(t){if(t[7]!==i){const a=+t[7];e=t[8]?ke(a):Ot(a*255,0,255)}return i=+t[1],s=+t[3],o=+t[5],i=255&(t[2]?ke(i):Ot(i,0,255)),s=255&(t[4]?ke(s):Ot(s,0,255)),o=255&(t[6]?ke(o):Ot(o,0,255)),{r:i,g:s,b:o,a:e}}}function Qr(n){return n&&(n.a<255?`rgba(${n.r}, ${n.g}, ${n.b}, ${It(n.a)})`:`rgb(${n.r}, ${n.g}, ${n.b})`)}const qn=n=>n<=.0031308?n*12.92:Math.pow(n,1/2.4)*1.055-.055,le=n=>n<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4);function Zr(n,t,e){const i=le(It(n.r)),s=le(It(n.g)),o=le(It(n.b));return{r:jt(qn(i+e*(le(It(t.r))-i))),g:jt(qn(s+e*(le(It(t.g))-s))),b:jt(qn(o+e*(le(It(t.b))-o))),a:n.a+e*(t.a-n.a)}}function Je(n,t,e){if(n){let i=Xi(n);i[t]=Math.max(0,Math.min(i[t]+i[t]*e,t===0?360:1)),i=Qi(i),n.r=i[0],n.g=i[1],n.b=i[2]}}function _a(n,t){return n&&Object.assign(t||{},n)}function _s(n){var t={r:0,g:0,b:0,a:255};return Array.isArray(n)?n.length>=3&&(t={r:n[0],g:n[1],b:n[2],a:255},n.length>3&&(t.a=jt(n[3]))):(t=_a(n,{r:0,g:0,b:0,a:1}),t.a=jt(t.a)),t}function tl(n){return n.charAt(0)==="r"?Jr(n):Wr(n)}class Oe{constructor(t){if(t instanceof Oe)return t;const e=typeof t;let i;e==="object"?i=_s(t):e==="string"&&(i=Or(t)||Kr(t)||tl(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=_a(this._rgb);return t&&(t.a=It(t.a)),t}set rgb(t){this._rgb=_s(t)}rgbString(){return this._valid?Qr(this._rgb):void 0}hexString(){return this._valid?zr(this._rgb):void 0}hslString(){return this._valid?Gr(this._rgb):void 0}mix(t,e){if(t){const i=this.rgb,s=t.rgb;let o;const a=e===o?.5:e,r=2*a-1,l=i.a-s.a,c=((r*l===-1?r:(r+l)/(1+r*l))+1)/2;o=1-c,i.r=255&c*i.r+o*s.r+.5,i.g=255&c*i.g+o*s.g+.5,i.b=255&c*i.b+o*s.b+.5,i.a=a*i.a+(1-a)*s.a,this.rgb=i}return this}interpolate(t,e){return t&&(this._rgb=Zr(this._rgb,t._rgb,e)),this}clone(){return new Oe(this.rgb)}alpha(t){return this._rgb.a=jt(t),this}clearer(t){const e=this._rgb;return e.a*=1-t,this}greyscale(){const t=this._rgb,e=Ue(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=e,this}opaquer(t){const e=this._rgb;return e.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return Je(this._rgb,2,t),this}darken(t){return Je(this._rgb,2,-t),this}saturate(t){return Je(this._rgb,1,t),this}desaturate(t){return Je(this._rgb,1,-t),this}rotate(t){return Ur(this._rgb,t),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function Ct(){}const el=(()=>{let n=0;return()=>n++})();function z(n){return n==null}function W(n){if(Array.isArray&&Array.isArray(n))return!0;const t=Object.prototype.toString.call(n);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function N(n){return n!==null&&Object.prototype.toString.call(n)==="[object Object]"}function Y(n){return(typeof n=="number"||n instanceof Number)&&isFinite(+n)}function at(n,t){return Y(n)?n:t}function O(n,t){return typeof n>"u"?t:n}const nl=(n,t)=>typeof n=="string"&&n.endsWith("%")?parseFloat(n)/100:+n/t,wa=(n,t)=>typeof n=="string"&&n.endsWith("%")?parseFloat(n)/100*t:+n;function V(n,t,e){if(n&&typeof n.call=="function")return n.apply(e,t)}function H(n,t,e,i){let s,o,a;if(W(n))for(o=n.length,s=0;s<o;s++)t.call(e,n[s],s);else if(N(n))for(a=Object.keys(n),o=a.length,s=0;s<o;s++)t.call(e,n[a[s]],a[s])}function _n(n,t){let e,i,s,o;if(!n||!t||n.length!==t.length)return!1;for(e=0,i=n.length;e<i;++e)if(s=n[e],o=t[e],s.datasetIndex!==o.datasetIndex||s.index!==o.index)return!1;return!0}function wn(n){if(W(n))return n.map(wn);if(N(n)){const t=Object.create(null),e=Object.keys(n),i=e.length;let s=0;for(;s<i;++s)t[e[s]]=wn(n[e[s]]);return t}return n}function ka(n){return["__proto__","prototype","constructor"].indexOf(n)===-1}function il(n,t,e,i){if(!ka(n))return;const s=t[n],o=e[n];N(s)&&N(o)?$e(s,o,i):t[n]=wn(o)}function $e(n,t,e){const i=W(t)?t:[t],s=i.length;if(!N(n))return n;e=e||{};const o=e.merger||il;let a;for(let r=0;r<s;++r){if(a=i[r],!N(a))continue;const l=Object.keys(a);for(let c=0,d=l.length;c<d;++c)o(l[c],n,a,e)}return n}function Pe(n,t){return $e(n,t,{merger:sl})}function sl(n,t,e){if(!ka(n))return;const i=t[n],s=e[n];N(i)&&N(s)?Pe(i,s):Object.prototype.hasOwnProperty.call(t,n)||(t[n]=wn(s))}const ws={"":n=>n,x:n=>n.x,y:n=>n.y};function ol(n){const t=n.split("."),e=[];let i="";for(const s of t)i+=s,i.endsWith("\\")?i=i.slice(0,-1)+".":(e.push(i),i="");return e}function al(n){const t=ol(n);return e=>{for(const i of t){if(i==="")break;e=e&&e[i]}return e}}function Ht(n,t){return(ws[t]||(ws[t]=al(t)))(n)}function Zi(n){return n.charAt(0).toUpperCase()+n.slice(1)}const ze=n=>typeof n<"u",Vt=n=>typeof n=="function",ks=(n,t)=>{if(n.size!==t.size)return!1;for(const e of n)if(!t.has(e))return!1;return!0};function rl(n){return n.type==="mouseup"||n.type==="click"||n.type==="contextmenu"}const F=Math.PI,q=2*F,ll=q+F,kn=Number.POSITIVE_INFINITY,cl=F/180,K=F/2,Ut=F/4,Es=F*2/3,$t=Math.log10,yt=Math.sign;function Le(n,t,e){return Math.abs(n-t)<e}function Ss(n){const t=Math.round(n);n=Le(n,t,n/1e3)?t:n;const e=Math.pow(10,Math.floor($t(n))),i=n/e;return(i<=1?1:i<=2?2:i<=5?5:10)*e}function dl(n){const t=[],e=Math.sqrt(n);let i;for(i=1;i<e;i++)n%i===0&&(t.push(i),t.push(n/i));return e===(e|0)&&t.push(e),t.sort((s,o)=>s-o).pop(),t}function ul(n){return typeof n=="symbol"||typeof n=="object"&&n!==null&&!(Symbol.toPrimitive in n||"toString"in n||"valueOf"in n)}function he(n){return!ul(n)&&!isNaN(parseFloat(n))&&isFinite(n)}function hl(n,t){const e=Math.round(n);return e-t<=n&&e+t>=n}function Ea(n,t,e){let i,s,o;for(i=0,s=n.length;i<s;i++)o=n[i][e],isNaN(o)||(t.min=Math.min(t.min,o),t.max=Math.max(t.max,o))}function dt(n){return n*(F/180)}function ts(n){return n*(180/F)}function Cs(n){if(!Y(n))return;let t=1,e=0;for(;Math.round(n*t)/t!==n;)t*=10,e++;return e}function Sa(n,t){const e=t.x-n.x,i=t.y-n.y,s=Math.sqrt(e*e+i*i);let o=Math.atan2(i,e);return o<-.5*F&&(o+=q),{angle:o,distance:s}}function Pi(n,t){return Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2))}function fl(n,t){return(n-t+ll)%q-F}function tt(n){return(n%q+q)%q}function Ne(n,t,e,i){const s=tt(n),o=tt(t),a=tt(e),r=tt(o-s),l=tt(a-s),c=tt(s-o),d=tt(s-a);return s===o||s===a||i&&o===a||r>l&&c<d}function Q(n,t,e){return Math.max(t,Math.min(e,n))}function ml(n){return Q(n,-32768,32767)}function Lt(n,t,e,i=1e-6){return n>=Math.min(t,e)-i&&n<=Math.max(t,e)+i}function es(n,t,e){e=e||(a=>n[a]<t);let i=n.length-1,s=0,o;for(;i-s>1;)o=s+i>>1,e(o)?s=o:i=o;return{lo:s,hi:i}}const Tt=(n,t,e,i)=>es(n,e,i?s=>{const o=n[s][t];return o<e||o===e&&n[s+1][t]===e}:s=>n[s][t]<e),pl=(n,t,e)=>es(n,e,i=>n[i][t]>=e);function gl(n,t,e){let i=0,s=n.length;for(;i<s&&n[i]<t;)i++;for(;s>i&&n[s-1]>e;)s--;return i>0||s<n.length?n.slice(i,s):n}const Ca=["push","pop","shift","splice","unshift"];function bl(n,t){if(n._chartjs){n._chartjs.listeners.push(t);return}Object.defineProperty(n,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),Ca.forEach(e=>{const i="_onData"+Zi(e),s=n[e];Object.defineProperty(n,e,{configurable:!0,enumerable:!1,value(...o){const a=s.apply(this,o);return n._chartjs.listeners.forEach(r=>{typeof r[i]=="function"&&r[i](...o)}),a}})})}function Ms(n,t){const e=n._chartjs;if(!e)return;const i=e.listeners,s=i.indexOf(t);s!==-1&&i.splice(s,1),!(i.length>0)&&(Ca.forEach(o=>{delete n[o]}),delete n._chartjs)}function Ma(n){const t=new Set(n);return t.size===n.length?n:Array.from(t)}const Aa=(function(){return typeof window>"u"?function(n){return n()}:window.requestAnimationFrame})();function Ia(n,t){let e=[],i=!1;return function(...s){e=s,i||(i=!0,Aa.call(window,()=>{i=!1,n.apply(t,e)}))}}function yl(n,t){let e;return function(...i){return t?(clearTimeout(e),e=setTimeout(n,t,i)):n.apply(this,i),t}}const ns=n=>n==="start"?"left":n==="end"?"right":"center",Z=(n,t,e)=>n==="start"?t:n==="end"?e:(t+e)/2,vl=(n,t,e,i)=>n===(i?"left":"right")?e:n==="center"?(t+e)/2:t;function Pa(n,t,e){const i=t.length;let s=0,o=i;if(n._sorted){const{iScale:a,vScale:r,_parsed:l}=n,c=n.dataset&&n.dataset.options?n.dataset.options.spanGaps:null,d=a.axis,{min:u,max:h,minDefined:f,maxDefined:m}=a.getUserBounds();if(f){if(s=Math.min(Tt(l,d,u).lo,e?i:Tt(t,d,a.getPixelForValue(u)).lo),c){const p=l.slice(0,s+1).reverse().findIndex(g=>!z(g[r.axis]));s-=Math.max(0,p)}s=Q(s,0,i-1)}if(m){let p=Math.max(Tt(l,a.axis,h,!0).hi+1,e?0:Tt(t,d,a.getPixelForValue(h),!0).hi+1);if(c){const g=l.slice(p-1).findIndex(b=>!z(b[r.axis]));p+=Math.max(0,g)}o=Q(p,s,i)-s}else o=i-s}return{start:s,count:o}}function La(n){const{xScale:t,yScale:e,_scaleRanges:i}=n,s={xmin:t.min,xmax:t.max,ymin:e.min,ymax:e.max};if(!i)return n._scaleRanges=s,!0;const o=i.xmin!==t.min||i.xmax!==t.max||i.ymin!==e.min||i.ymax!==e.max;return Object.assign(i,s),o}const Qe=n=>n===0||n===1,As=(n,t,e)=>-(Math.pow(2,10*(n-=1))*Math.sin((n-t)*q/e)),Is=(n,t,e)=>Math.pow(2,-10*n)*Math.sin((n-t)*q/e)+1,Te={linear:n=>n,easeInQuad:n=>n*n,easeOutQuad:n=>-n*(n-2),easeInOutQuad:n=>(n/=.5)<1?.5*n*n:-.5*(--n*(n-2)-1),easeInCubic:n=>n*n*n,easeOutCubic:n=>(n-=1)*n*n+1,easeInOutCubic:n=>(n/=.5)<1?.5*n*n*n:.5*((n-=2)*n*n+2),easeInQuart:n=>n*n*n*n,easeOutQuart:n=>-((n-=1)*n*n*n-1),easeInOutQuart:n=>(n/=.5)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2),easeInQuint:n=>n*n*n*n*n,easeOutQuint:n=>(n-=1)*n*n*n*n+1,easeInOutQuint:n=>(n/=.5)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2),easeInSine:n=>-Math.cos(n*K)+1,easeOutSine:n=>Math.sin(n*K),easeInOutSine:n=>-.5*(Math.cos(F*n)-1),easeInExpo:n=>n===0?0:Math.pow(2,10*(n-1)),easeOutExpo:n=>n===1?1:-Math.pow(2,-10*n)+1,easeInOutExpo:n=>Qe(n)?n:n<.5?.5*Math.pow(2,10*(n*2-1)):.5*(-Math.pow(2,-10*(n*2-1))+2),easeInCirc:n=>n>=1?n:-(Math.sqrt(1-n*n)-1),easeOutCirc:n=>Math.sqrt(1-(n-=1)*n),easeInOutCirc:n=>(n/=.5)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1),easeInElastic:n=>Qe(n)?n:As(n,.075,.3),easeOutElastic:n=>Qe(n)?n:Is(n,.075,.3),easeInOutElastic(n){return Qe(n)?n:n<.5?.5*As(n*2,.1125,.45):.5+.5*Is(n*2-1,.1125,.45)},easeInBack(n){return n*n*((1.70158+1)*n-1.70158)},easeOutBack(n){return(n-=1)*n*((1.70158+1)*n+1.70158)+1},easeInOutBack(n){let t=1.70158;return(n/=.5)<1?.5*(n*n*(((t*=1.525)+1)*n-t)):.5*((n-=2)*n*(((t*=1.525)+1)*n+t)+2)},easeInBounce:n=>1-Te.easeOutBounce(1-n),easeOutBounce(n){return n<1/2.75?7.5625*n*n:n<2/2.75?7.5625*(n-=1.5/2.75)*n+.75:n<2.5/2.75?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375},easeInOutBounce:n=>n<.5?Te.easeInBounce(n*2)*.5:Te.easeOutBounce(n*2-1)*.5+.5};function is(n){if(n&&typeof n=="object"){const t=n.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function Ps(n){return is(n)?n:new Oe(n)}function Wn(n){return is(n)?n:new Oe(n).saturate(.5).darken(.1).hexString()}const xl=["x","y","borderWidth","radius","tension"],_l=["color","borderColor","backgroundColor"];function wl(n){n.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),n.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),n.set("animations",{colors:{type:"color",properties:_l},numbers:{type:"number",properties:xl}}),n.describe("animations",{_fallback:"animation"}),n.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function kl(n){n.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const Ls=new Map;function El(n,t){t=t||{};const e=n+JSON.stringify(t);let i=Ls.get(e);return i||(i=new Intl.NumberFormat(n,t),Ls.set(e,i)),i}function Ge(n,t,e){return El(t,e).format(n)}const Ta={values(n){return W(n)?n:""+n},numeric(n,t,e){if(n===0)return"0";const i=this.chart.options.locale;let s,o=n;if(e.length>1){const c=Math.max(Math.abs(e[0].value),Math.abs(e[e.length-1].value));(c<1e-4||c>1e15)&&(s="scientific"),o=Sl(n,e)}const a=$t(Math.abs(o)),r=isNaN(a)?1:Math.max(Math.min(-1*Math.floor(a),20),0),l={notation:s,minimumFractionDigits:r,maximumFractionDigits:r};return Object.assign(l,this.options.ticks.format),Ge(n,i,l)},logarithmic(n,t,e){if(n===0)return"0";const i=e[t].significand||n/Math.pow(10,Math.floor($t(n)));return[1,2,3,5,10,15].includes(i)||t>.8*e.length?Ta.numeric.call(this,n,t,e):""}};function Sl(n,t){let e=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(e)>=1&&n!==Math.floor(n)&&(e=n-Math.floor(n)),e}var Tn={formatters:Ta};function Cl(n){n.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,e)=>e.lineWidth,tickColor:(t,e)=>e.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Tn.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),n.route("scale.ticks","color","","color"),n.route("scale.grid","color","","borderColor"),n.route("scale.border","color","","borderColor"),n.route("scale.title","color","","color"),n.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),n.describe("scales",{_fallback:"scale"}),n.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const ee=Object.create(null),Li=Object.create(null);function Be(n,t){if(!t)return n;const e=t.split(".");for(let i=0,s=e.length;i<s;++i){const o=e[i];n=n[o]||(n[o]=Object.create(null))}return n}function Un(n,t,e){return typeof t=="string"?$e(Be(n,t),e):$e(Be(n,""),t)}class Ml{constructor(t,e){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,s)=>Wn(s.backgroundColor),this.hoverBorderColor=(i,s)=>Wn(s.borderColor),this.hoverColor=(i,s)=>Wn(s.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(e)}set(t,e){return Un(this,t,e)}get(t){return Be(this,t)}describe(t,e){return Un(Li,t,e)}override(t,e){return Un(ee,t,e)}route(t,e,i,s){const o=Be(this,t),a=Be(this,i),r="_"+e;Object.defineProperties(o,{[r]:{value:o[e],writable:!0},[e]:{enumerable:!0,get(){const l=this[r],c=a[s];return N(l)?Object.assign({},c,l):O(l,c)},set(l){this[r]=l}}})}apply(t){t.forEach(e=>e(this))}}var U=new Ml({_scriptable:n=>!n.startsWith("on"),_indexable:n=>n!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[wl,kl,Cl]);function Al(n){return!n||z(n.size)||z(n.family)?null:(n.style?n.style+" ":"")+(n.weight?n.weight+" ":"")+n.size+"px "+n.family}function En(n,t,e,i,s){let o=t[s];return o||(o=t[s]=n.measureText(s).width,e.push(s)),o>i&&(i=o),i}function Il(n,t,e,i){i=i||{};let s=i.data=i.data||{},o=i.garbageCollect=i.garbageCollect||[];i.font!==t&&(s=i.data={},o=i.garbageCollect=[],i.font=t),n.save(),n.font=t;let a=0;const r=e.length;let l,c,d,u,h;for(l=0;l<r;l++)if(u=e[l],u!=null&&!W(u))a=En(n,s,o,a,u);else if(W(u))for(c=0,d=u.length;c<d;c++)h=u[c],h!=null&&!W(h)&&(a=En(n,s,o,a,h));n.restore();const f=o.length/2;if(f>e.length){for(l=0;l<f;l++)delete s[o[l]];o.splice(0,f)}return a}function Gt(n,t,e){const i=n.currentDevicePixelRatio,s=e!==0?Math.max(e/2,.5):0;return Math.round((t-s)*i)/i+s}function Ts(n,t){!t&&!n||(t=t||n.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,n.width,n.height),t.restore())}function Ti(n,t,e,i){Ba(n,t,e,i,null)}function Ba(n,t,e,i,s){let o,a,r,l,c,d,u,h;const f=t.pointStyle,m=t.rotation,p=t.radius;let g=(m||0)*cl;if(f&&typeof f=="object"&&(o=f.toString(),o==="[object HTMLImageElement]"||o==="[object HTMLCanvasElement]")){n.save(),n.translate(e,i),n.rotate(g),n.drawImage(f,-f.width/2,-f.height/2,f.width,f.height),n.restore();return}if(!(isNaN(p)||p<=0)){switch(n.beginPath(),f){default:s?n.ellipse(e,i,s/2,p,0,0,q):n.arc(e,i,p,0,q),n.closePath();break;case"triangle":d=s?s/2:p,n.moveTo(e+Math.sin(g)*d,i-Math.cos(g)*p),g+=Es,n.lineTo(e+Math.sin(g)*d,i-Math.cos(g)*p),g+=Es,n.lineTo(e+Math.sin(g)*d,i-Math.cos(g)*p),n.closePath();break;case"rectRounded":c=p*.516,l=p-c,a=Math.cos(g+Ut)*l,u=Math.cos(g+Ut)*(s?s/2-c:l),r=Math.sin(g+Ut)*l,h=Math.sin(g+Ut)*(s?s/2-c:l),n.arc(e-u,i-r,c,g-F,g-K),n.arc(e+h,i-a,c,g-K,g),n.arc(e+u,i+r,c,g,g+K),n.arc(e-h,i+a,c,g+K,g+F),n.closePath();break;case"rect":if(!m){l=Math.SQRT1_2*p,d=s?s/2:l,n.rect(e-d,i-l,2*d,2*l);break}g+=Ut;case"rectRot":u=Math.cos(g)*(s?s/2:p),a=Math.cos(g)*p,r=Math.sin(g)*p,h=Math.sin(g)*(s?s/2:p),n.moveTo(e-u,i-r),n.lineTo(e+h,i-a),n.lineTo(e+u,i+r),n.lineTo(e-h,i+a),n.closePath();break;case"crossRot":g+=Ut;case"cross":u=Math.cos(g)*(s?s/2:p),a=Math.cos(g)*p,r=Math.sin(g)*p,h=Math.sin(g)*(s?s/2:p),n.moveTo(e-u,i-r),n.lineTo(e+u,i+r),n.moveTo(e+h,i-a),n.lineTo(e-h,i+a);break;case"star":u=Math.cos(g)*(s?s/2:p),a=Math.cos(g)*p,r=Math.sin(g)*p,h=Math.sin(g)*(s?s/2:p),n.moveTo(e-u,i-r),n.lineTo(e+u,i+r),n.moveTo(e+h,i-a),n.lineTo(e-h,i+a),g+=Ut,u=Math.cos(g)*(s?s/2:p),a=Math.cos(g)*p,r=Math.sin(g)*p,h=Math.sin(g)*(s?s/2:p),n.moveTo(e-u,i-r),n.lineTo(e+u,i+r),n.moveTo(e+h,i-a),n.lineTo(e-h,i+a);break;case"line":a=s?s/2:Math.cos(g)*p,r=Math.sin(g)*p,n.moveTo(e-a,i-r),n.lineTo(e+a,i+r);break;case"dash":n.moveTo(e,i),n.lineTo(e+Math.cos(g)*(s?s/2:p),i+Math.sin(g)*p);break;case!1:n.closePath();break}n.fill(),t.borderWidth>0&&n.stroke()}}function Bt(n,t,e){return e=e||.5,!t||n&&n.x>t.left-e&&n.x<t.right+e&&n.y>t.top-e&&n.y<t.bottom+e}function Bn(n,t){n.save(),n.beginPath(),n.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),n.clip()}function Rn(n){n.restore()}function Pl(n,t,e,i,s){if(!t)return n.lineTo(e.x,e.y);if(s==="middle"){const o=(t.x+e.x)/2;n.lineTo(o,t.y),n.lineTo(o,e.y)}else s==="after"!=!!i?n.lineTo(t.x,e.y):n.lineTo(e.x,t.y);n.lineTo(e.x,e.y)}function Ll(n,t,e,i){if(!t)return n.lineTo(e.x,e.y);n.bezierCurveTo(i?t.cp1x:t.cp2x,i?t.cp1y:t.cp2y,i?e.cp2x:e.cp1x,i?e.cp2y:e.cp1y,e.x,e.y)}function Tl(n,t){t.translation&&n.translate(t.translation[0],t.translation[1]),z(t.rotation)||n.rotate(t.rotation),t.color&&(n.fillStyle=t.color),t.textAlign&&(n.textAlign=t.textAlign),t.textBaseline&&(n.textBaseline=t.textBaseline)}function Bl(n,t,e,i,s){if(s.strikethrough||s.underline){const o=n.measureText(i),a=t-o.actualBoundingBoxLeft,r=t+o.actualBoundingBoxRight,l=e-o.actualBoundingBoxAscent,c=e+o.actualBoundingBoxDescent,d=s.strikethrough?(l+c)/2:c;n.strokeStyle=n.fillStyle,n.beginPath(),n.lineWidth=s.decorationWidth||2,n.moveTo(a,d),n.lineTo(r,d),n.stroke()}}function Rl(n,t){const e=n.fillStyle;n.fillStyle=t.color,n.fillRect(t.left,t.top,t.width,t.height),n.fillStyle=e}function ne(n,t,e,i,s,o={}){const a=W(t)?t:[t],r=o.strokeWidth>0&&o.strokeColor!=="";let l,c;for(n.save(),n.font=s.string,Tl(n,o),l=0;l<a.length;++l)c=a[l],o.backdrop&&Rl(n,o.backdrop),r&&(o.strokeColor&&(n.strokeStyle=o.strokeColor),z(o.strokeWidth)||(n.lineWidth=o.strokeWidth),n.strokeText(c,e,i,o.maxWidth)),n.fillText(c,e,i,o.maxWidth),Bl(n,e,i,c,o),i+=Number(s.lineHeight);n.restore()}function Fe(n,t){const{x:e,y:i,w:s,h:o,radius:a}=t;n.arc(e+a.topLeft,i+a.topLeft,a.topLeft,1.5*F,F,!0),n.lineTo(e,i+o-a.bottomLeft),n.arc(e+a.bottomLeft,i+o-a.bottomLeft,a.bottomLeft,F,K,!0),n.lineTo(e+s-a.bottomRight,i+o),n.arc(e+s-a.bottomRight,i+o-a.bottomRight,a.bottomRight,K,0,!0),n.lineTo(e+s,i+a.topRight),n.arc(e+s-a.topRight,i+a.topRight,a.topRight,0,-K,!0),n.lineTo(e+a.topLeft,i)}const Dl=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,Ol=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function $l(n,t){const e=(""+n).match(Dl);if(!e||e[1]==="normal")return t*1.2;switch(n=+e[2],e[3]){case"px":return n;case"%":n/=100;break}return t*n}const zl=n=>+n||0;function ss(n,t){const e={},i=N(t),s=i?Object.keys(t):t,o=N(n)?i?a=>O(n[a],n[t[a]]):a=>n[a]:()=>n;for(const a of s)e[a]=zl(o(a));return e}function Ra(n){return ss(n,{top:"y",right:"x",bottom:"y",left:"x"})}function Zt(n){return ss(n,["topLeft","topRight","bottomLeft","bottomRight"])}function nt(n){const t=Ra(n);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function X(n,t){n=n||{},t=t||U.font;let e=O(n.size,t.size);typeof e=="string"&&(e=parseInt(e,10));let i=O(n.style,t.style);i&&!(""+i).match(Ol)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);const s={family:O(n.family,t.family),lineHeight:$l(O(n.lineHeight,t.lineHeight),e),size:e,style:i,weight:O(n.weight,t.weight),string:""};return s.string=Al(s),s}function Ee(n,t,e,i){let s,o,a;for(s=0,o=n.length;s<o;++s)if(a=n[s],a!==void 0&&a!==void 0)return a}function Nl(n,t,e){const{min:i,max:s}=n,o=wa(t,(s-i)/2),a=(r,l)=>e&&r===0?0:r+l;return{min:a(i,-Math.abs(o)),max:a(s,o)}}function Wt(n,t){return Object.assign(Object.create(n),t)}function os(n,t=[""],e,i,s=()=>n[0]){const o=e||n;typeof i>"u"&&(i=za("_fallback",n));const a={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:n,_rootScopes:o,_fallback:i,_getTarget:s,override:r=>os([r,...n],t,o,i)};return new Proxy(a,{deleteProperty(r,l){return delete r[l],delete r._keys,delete n[0][l],!0},get(r,l){return Oa(r,l,()=>Gl(l,t,n,r))},getOwnPropertyDescriptor(r,l){return Reflect.getOwnPropertyDescriptor(r._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(n[0])},has(r,l){return Rs(r).includes(l)},ownKeys(r){return Rs(r)},set(r,l,c){const d=r._storage||(r._storage=s());return r[l]=d[l]=c,delete r._keys,!0}})}function fe(n,t,e,i){const s={_cacheable:!1,_proxy:n,_context:t,_subProxy:e,_stack:new Set,_descriptors:Da(n,i),setContext:o=>fe(n,o,e,i),override:o=>fe(n.override(o),t,e,i)};return new Proxy(s,{deleteProperty(o,a){return delete o[a],delete n[a],!0},get(o,a,r){return Oa(o,a,()=>jl(o,a,r))},getOwnPropertyDescriptor(o,a){return o._descriptors.allKeys?Reflect.has(n,a)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(n,a)},getPrototypeOf(){return Reflect.getPrototypeOf(n)},has(o,a){return Reflect.has(n,a)},ownKeys(){return Reflect.ownKeys(n)},set(o,a,r){return n[a]=r,delete o[a],!0}})}function Da(n,t={scriptable:!0,indexable:!0}){const{_scriptable:e=t.scriptable,_indexable:i=t.indexable,_allKeys:s=t.allKeys}=n;return{allKeys:s,scriptable:e,indexable:i,isScriptable:Vt(e)?e:()=>e,isIndexable:Vt(i)?i:()=>i}}const Fl=(n,t)=>n?n+Zi(t):t,as=(n,t)=>N(t)&&n!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Oa(n,t,e){if(Object.prototype.hasOwnProperty.call(n,t)||t==="constructor")return n[t];const i=e();return n[t]=i,i}function jl(n,t,e){const{_proxy:i,_context:s,_subProxy:o,_descriptors:a}=n;let r=i[t];return Vt(r)&&a.isScriptable(t)&&(r=Hl(t,r,n,e)),W(r)&&r.length&&(r=Vl(t,r,n,a.isIndexable)),as(t,r)&&(r=fe(r,s,o&&o[t],a)),r}function Hl(n,t,e,i){const{_proxy:s,_context:o,_subProxy:a,_stack:r}=e;if(r.has(n))throw new Error("Recursion detected: "+Array.from(r).join("->")+"->"+n);r.add(n);let l=t(o,a||i);return r.delete(n),as(n,l)&&(l=rs(s._scopes,s,n,l)),l}function Vl(n,t,e,i){const{_proxy:s,_context:o,_subProxy:a,_descriptors:r}=e;if(typeof o.index<"u"&&i(n))return t[o.index%t.length];if(N(t[0])){const l=t,c=s._scopes.filter(d=>d!==l);t=[];for(const d of l){const u=rs(c,s,n,d);t.push(fe(u,o,a&&a[n],r))}}return t}function $a(n,t,e){return Vt(n)?n(t,e):n}const ql=(n,t)=>n===!0?t:typeof n=="string"?Ht(t,n):void 0;function Wl(n,t,e,i,s){for(const o of t){const a=ql(e,o);if(a){n.add(a);const r=$a(a._fallback,e,s);if(typeof r<"u"&&r!==e&&r!==i)return r}else if(a===!1&&typeof i<"u"&&e!==i)return null}return!1}function rs(n,t,e,i){const s=t._rootScopes,o=$a(t._fallback,e,i),a=[...n,...s],r=new Set;r.add(i);let l=Bs(r,a,e,o||e,i);return l===null||typeof o<"u"&&o!==e&&(l=Bs(r,a,o,l,i),l===null)?!1:os(Array.from(r),[""],s,o,()=>Ul(t,e,i))}function Bs(n,t,e,i,s){for(;e;)e=Wl(n,t,e,i,s);return e}function Ul(n,t,e){const i=n._getTarget();t in i||(i[t]={});const s=i[t];return W(s)&&N(e)?e:s||{}}function Gl(n,t,e,i){let s;for(const o of t)if(s=za(Fl(o,n),e),typeof s<"u")return as(n,s)?rs(e,i,n,s):s}function za(n,t){for(const e of t){if(!e)continue;const i=e[n];if(typeof i<"u")return i}}function Rs(n){let t=n._keys;return t||(t=n._keys=Yl(n._scopes)),t}function Yl(n){const t=new Set;for(const e of n)for(const i of Object.keys(e).filter(s=>!s.startsWith("_")))t.add(i);return Array.from(t)}function Na(n,t,e,i){const{iScale:s}=n,{key:o="r"}=this._parsing,a=new Array(i);let r,l,c,d;for(r=0,l=i;r<l;++r)c=r+e,d=t[c],a[r]={r:s.parse(Ht(d,o),c)};return a}const Kl=Number.EPSILON||1e-14,me=(n,t)=>t<n.length&&!n[t].skip&&n[t],Fa=n=>n==="x"?"y":"x";function Xl(n,t,e,i){const s=n.skip?t:n,o=t,a=e.skip?t:e,r=Pi(o,s),l=Pi(a,o);let c=r/(r+l),d=l/(r+l);c=isNaN(c)?0:c,d=isNaN(d)?0:d;const u=i*c,h=i*d;return{previous:{x:o.x-u*(a.x-s.x),y:o.y-u*(a.y-s.y)},next:{x:o.x+h*(a.x-s.x),y:o.y+h*(a.y-s.y)}}}function Jl(n,t,e){const i=n.length;let s,o,a,r,l,c=me(n,0);for(let d=0;d<i-1;++d)if(l=c,c=me(n,d+1),!(!l||!c)){if(Le(t[d],0,Kl)){e[d]=e[d+1]=0;continue}s=e[d]/t[d],o=e[d+1]/t[d],r=Math.pow(s,2)+Math.pow(o,2),!(r<=9)&&(a=3/Math.sqrt(r),e[d]=s*a*t[d],e[d+1]=o*a*t[d])}}function Ql(n,t,e="x"){const i=Fa(e),s=n.length;let o,a,r,l=me(n,0);for(let c=0;c<s;++c){if(a=r,r=l,l=me(n,c+1),!r)continue;const d=r[e],u=r[i];a&&(o=(d-a[e])/3,r[`cp1${e}`]=d-o,r[`cp1${i}`]=u-o*t[c]),l&&(o=(l[e]-d)/3,r[`cp2${e}`]=d+o,r[`cp2${i}`]=u+o*t[c])}}function Zl(n,t="x"){const e=Fa(t),i=n.length,s=Array(i).fill(0),o=Array(i);let a,r,l,c=me(n,0);for(a=0;a<i;++a)if(r=l,l=c,c=me(n,a+1),!!l){if(c){const d=c[t]-l[t];s[a]=d!==0?(c[e]-l[e])/d:0}o[a]=r?c?yt(s[a-1])!==yt(s[a])?0:(s[a-1]+s[a])/2:s[a-1]:s[a]}Jl(n,s,o),Ql(n,o,t)}function Ze(n,t,e){return Math.max(Math.min(n,e),t)}function tc(n,t){let e,i,s,o,a,r=Bt(n[0],t);for(e=0,i=n.length;e<i;++e)a=o,o=r,r=e<i-1&&Bt(n[e+1],t),o&&(s=n[e],a&&(s.cp1x=Ze(s.cp1x,t.left,t.right),s.cp1y=Ze(s.cp1y,t.top,t.bottom)),r&&(s.cp2x=Ze(s.cp2x,t.left,t.right),s.cp2y=Ze(s.cp2y,t.top,t.bottom)))}function ec(n,t,e,i,s){let o,a,r,l;if(t.spanGaps&&(n=n.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")Zl(n,s);else{let c=i?n[n.length-1]:n[0];for(o=0,a=n.length;o<a;++o)r=n[o],l=Xl(c,r,n[Math.min(o+1,a-(i?0:1))%a],t.tension),r.cp1x=l.previous.x,r.cp1y=l.previous.y,r.cp2x=l.next.x,r.cp2y=l.next.y,c=r}t.capBezierPoints&&tc(n,e)}function ls(){return typeof window<"u"&&typeof document<"u"}function cs(n){let t=n.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function Sn(n,t,e){let i;return typeof n=="string"?(i=parseInt(n,10),n.indexOf("%")!==-1&&(i=i/100*t.parentNode[e])):i=n,i}const Dn=n=>n.ownerDocument.defaultView.getComputedStyle(n,null);function nc(n,t){return Dn(n).getPropertyValue(t)}const ic=["top","right","bottom","left"];function te(n,t,e){const i={};e=e?"-"+e:"";for(let s=0;s<4;s++){const o=ic[s];i[o]=parseFloat(n[t+"-"+o+e])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}const sc=(n,t,e)=>(n>0||t>0)&&(!e||!e.shadowRoot);function oc(n,t){const e=n.touches,i=e&&e.length?e[0]:n,{offsetX:s,offsetY:o}=i;let a=!1,r,l;if(sc(s,o,n.target))r=s,l=o;else{const c=t.getBoundingClientRect();r=i.clientX-c.left,l=i.clientY-c.top,a=!0}return{x:r,y:l,box:a}}function Xt(n,t){if("native"in n)return n;const{canvas:e,currentDevicePixelRatio:i}=t,s=Dn(e),o=s.boxSizing==="border-box",a=te(s,"padding"),r=te(s,"border","width"),{x:l,y:c,box:d}=oc(n,e),u=a.left+(d&&r.left),h=a.top+(d&&r.top);let{width:f,height:m}=t;return o&&(f-=a.width+r.width,m-=a.height+r.height),{x:Math.round((l-u)/f*e.width/i),y:Math.round((c-h)/m*e.height/i)}}function ac(n,t,e){let i,s;if(t===void 0||e===void 0){const o=n&&cs(n);if(!o)t=n.clientWidth,e=n.clientHeight;else{const a=o.getBoundingClientRect(),r=Dn(o),l=te(r,"border","width"),c=te(r,"padding");t=a.width-c.width-l.width,e=a.height-c.height-l.height,i=Sn(r.maxWidth,o,"clientWidth"),s=Sn(r.maxHeight,o,"clientHeight")}}return{width:t,height:e,maxWidth:i||kn,maxHeight:s||kn}}const zt=n=>Math.round(n*10)/10;function rc(n,t,e,i){const s=Dn(n),o=te(s,"margin"),a=Sn(s.maxWidth,n,"clientWidth")||kn,r=Sn(s.maxHeight,n,"clientHeight")||kn,l=ac(n,t,e);let{width:c,height:d}=l;if(s.boxSizing==="content-box"){const h=te(s,"border","width"),f=te(s,"padding");c-=f.width+h.width,d-=f.height+h.height}return c=Math.max(0,c-o.width),d=Math.max(0,i?c/i:d-o.height),c=zt(Math.min(c,a,l.maxWidth)),d=zt(Math.min(d,r,l.maxHeight)),c&&!d&&(d=zt(c/2)),(t!==void 0||e!==void 0)&&i&&l.height&&d>l.height&&(d=l.height,c=zt(Math.floor(d*i))),{width:c,height:d}}function Ds(n,t,e){const i=t||1,s=zt(n.height*i),o=zt(n.width*i);n.height=zt(n.height),n.width=zt(n.width);const a=n.canvas;return a.style&&(e||!a.style.height&&!a.style.width)&&(a.style.height=`${n.height}px`,a.style.width=`${n.width}px`),n.currentDevicePixelRatio!==i||a.height!==s||a.width!==o?(n.currentDevicePixelRatio=i,a.height=s,a.width=o,n.ctx.setTransform(i,0,0,i,0,0),!0):!1}const lc=(function(){let n=!1;try{const t={get passive(){return n=!0,!1}};ls()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return n})();function Os(n,t){const e=nc(n,t),i=e&&e.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}function Jt(n,t,e,i){return{x:n.x+e*(t.x-n.x),y:n.y+e*(t.y-n.y)}}function cc(n,t,e,i){return{x:n.x+e*(t.x-n.x),y:i==="middle"?e<.5?n.y:t.y:i==="after"?e<1?n.y:t.y:e>0?t.y:n.y}}function dc(n,t,e,i){const s={x:n.cp2x,y:n.cp2y},o={x:t.cp1x,y:t.cp1y},a=Jt(n,s,e),r=Jt(s,o,e),l=Jt(o,t,e),c=Jt(a,r,e),d=Jt(r,l,e);return Jt(c,d,e)}const uc=function(n,t){return{x(e){return n+n+t-e},setWidth(e){t=e},textAlign(e){return e==="center"?e:e==="right"?"left":"right"},xPlus(e,i){return e-i},leftForLtr(e,i){return e-i}}},hc=function(){return{x(n){return n},setWidth(n){},textAlign(n){return n},xPlus(n,t){return n+t},leftForLtr(n,t){return n}}};function ue(n,t,e){return n?uc(t,e):hc()}function ja(n,t){let e,i;(t==="ltr"||t==="rtl")&&(e=n.canvas.style,i=[e.getPropertyValue("direction"),e.getPropertyPriority("direction")],e.setProperty("direction",t,"important"),n.prevTextDirection=i)}function Ha(n,t){t!==void 0&&(delete n.prevTextDirection,n.canvas.style.setProperty("direction",t[0],t[1]))}function Va(n){return n==="angle"?{between:Ne,compare:fl,normalize:tt}:{between:Lt,compare:(t,e)=>t-e,normalize:t=>t}}function $s({start:n,end:t,count:e,loop:i,style:s}){return{start:n%e,end:t%e,loop:i&&(t-n+1)%e===0,style:s}}function fc(n,t,e){const{property:i,start:s,end:o}=e,{between:a,normalize:r}=Va(i),l=t.length;let{start:c,end:d,loop:u}=n,h,f;if(u){for(c+=l,d+=l,h=0,f=l;h<f&&a(r(t[c%l][i]),s,o);++h)c--,d--;c%=l,d%=l}return d<c&&(d+=l),{start:c,end:d,loop:u,style:n.style}}function qa(n,t,e){if(!e)return[n];const{property:i,start:s,end:o}=e,a=t.length,{compare:r,between:l,normalize:c}=Va(i),{start:d,end:u,loop:h,style:f}=fc(n,t,e),m=[];let p=!1,g=null,b,y,v;const x=()=>l(s,v,b)&&r(s,v)!==0,k=()=>r(o,b)===0||l(o,v,b),w=()=>p||x(),E=()=>!p||k();for(let S=d,C=d;S<=u;++S)y=t[S%a],!y.skip&&(b=c(y[i]),b!==v&&(p=l(b,s,o),g===null&&w()&&(g=r(b,s)===0?S:C),g!==null&&E()&&(m.push($s({start:g,end:S,loop:h,count:a,style:f})),g=null),C=S,v=b));return g!==null&&m.push($s({start:g,end:u,loop:h,count:a,style:f})),m}function Wa(n,t){const e=[],i=n.segments;for(let s=0;s<i.length;s++){const o=qa(i[s],n.points,t);o.length&&e.push(...o)}return e}function mc(n,t,e,i){let s=0,o=t-1;if(e&&!i)for(;s<t&&!n[s].skip;)s++;for(;s<t&&n[s].skip;)s++;for(s%=t,e&&(o+=s);o>s&&n[o%t].skip;)o--;return o%=t,{start:s,end:o}}function pc(n,t,e,i){const s=n.length,o=[];let a=t,r=n[t],l;for(l=t+1;l<=e;++l){const c=n[l%s];c.skip||c.stop?r.skip||(i=!1,o.push({start:t%s,end:(l-1)%s,loop:i}),t=a=c.stop?l:null):(a=l,r.skip&&(t=l)),r=c}return a!==null&&o.push({start:t%s,end:a%s,loop:i}),o}function gc(n,t){const e=n.points,i=n.options.spanGaps,s=e.length;if(!s)return[];const o=!!n._loop,{start:a,end:r}=mc(e,s,o,i);if(i===!0)return zs(n,[{start:a,end:r,loop:o}],e,t);const l=r<a?r+s:r,c=!!n._fullLoop&&a===0&&r===s-1;return zs(n,pc(e,a,l,c),e,t)}function zs(n,t,e,i){return!i||!i.setContext||!e?t:bc(n,t,e,i)}function bc(n,t,e,i){const s=n._chart.getContext(),o=Ns(n.options),{_datasetIndex:a,options:{spanGaps:r}}=n,l=e.length,c=[];let d=o,u=t[0].start,h=u;function f(m,p,g,b){const y=r?-1:1;if(m!==p){for(m+=l;e[m%l].skip;)m-=y;for(;e[p%l].skip;)p+=y;m%l!==p%l&&(c.push({start:m%l,end:p%l,loop:g,style:b}),d=b,u=p%l)}}for(const m of t){u=r?u:m.start;let p=e[u%l],g;for(h=u+1;h<=m.end;h++){const b=e[h%l];g=Ns(i.setContext(Wt(s,{type:"segment",p0:p,p1:b,p0DataIndex:(h-1)%l,p1DataIndex:h%l,datasetIndex:a}))),yc(g,d)&&f(u,h-1,m.loop,d),p=b,d=g}u<h-1&&f(u,h-1,m.loop,d)}return c}function Ns(n){return{backgroundColor:n.backgroundColor,borderCapStyle:n.borderCapStyle,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderJoinStyle:n.borderJoinStyle,borderWidth:n.borderWidth,borderColor:n.borderColor}}function yc(n,t){if(!t)return!1;const e=[],i=function(s,o){return is(o)?(e.includes(o)||e.push(o),e.indexOf(o)):o};return JSON.stringify(n,i)!==JSON.stringify(t,i)}function tn(n,t,e){return n.options.clip?n[e]:t[e]}function vc(n,t){const{xScale:e,yScale:i}=n;return e&&i?{left:tn(e,t,"left"),right:tn(e,t,"right"),top:tn(i,t,"top"),bottom:tn(i,t,"bottom")}:t}function Ua(n,t){const e=t._clip;if(e.disabled)return!1;const i=vc(t,n.chartArea);return{left:e.left===!1?0:i.left-(e.left===!0?0:e.left),right:e.right===!1?n.width:i.right+(e.right===!0?0:e.right),top:e.top===!1?0:i.top-(e.top===!0?0:e.top),bottom:e.bottom===!1?n.height:i.bottom+(e.bottom===!0?0:e.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class xc{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,e,i,s){const o=e.listeners[s],a=e.duration;o.forEach(r=>r({chart:t,initial:e.initial,numSteps:a,currentStep:Math.min(i-e.start,a)}))}_refresh(){this._request||(this._running=!0,this._request=Aa.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let e=0;this._charts.forEach((i,s)=>{if(!i.running||!i.items.length)return;const o=i.items;let a=o.length-1,r=!1,l;for(;a>=0;--a)l=o[a],l._active?(l._total>i.duration&&(i.duration=l._total),l.tick(t),r=!0):(o[a]=o[o.length-1],o.pop());r&&(s.draw(),this._notify(s,i,t,"progress")),o.length||(i.running=!1,this._notify(s,i,t,"complete"),i.initial=!1),e+=o.length}),this._lastDate=t,e===0&&(this._running=!1)}_getAnims(t){const e=this._charts;let i=e.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},e.set(t,i)),i}listen(t,e,i){this._getAnims(t).listeners[e].push(i)}add(t,e){!e||!e.length||this._getAnims(t).items.push(...e)}has(t){return this._getAnims(t).items.length>0}start(t){const e=this._charts.get(t);e&&(e.running=!0,e.start=Date.now(),e.duration=e.items.reduce((i,s)=>Math.max(i,s._duration),0),this._refresh())}running(t){if(!this._running)return!1;const e=this._charts.get(t);return!(!e||!e.running||!e.items.length)}stop(t){const e=this._charts.get(t);if(!e||!e.items.length)return;const i=e.items;let s=i.length-1;for(;s>=0;--s)i[s].cancel();e.items=[],this._notify(t,e,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var Mt=new xc;const Fs="transparent",_c={boolean(n,t,e){return e>.5?t:n},color(n,t,e){const i=Ps(n||Fs),s=i.valid&&Ps(t||Fs);return s&&s.valid?s.mix(i,e).hexString():t},number(n,t,e){return n+(t-n)*e}};class wc{constructor(t,e,i,s){const o=e[i];s=Ee([t.to,s,o,t.from]);const a=Ee([t.from,o,s]);this._active=!0,this._fn=t.fn||_c[t.type||typeof a],this._easing=Te[t.easing]||Te.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=e,this._prop=i,this._from=a,this._to=s,this._promises=void 0}active(){return this._active}update(t,e,i){if(this._active){this._notify(!1);const s=this._target[this._prop],o=i-this._start,a=this._duration-o;this._start=i,this._duration=Math.floor(Math.max(a,t.duration)),this._total+=o,this._loop=!!t.loop,this._to=Ee([t.to,e,s,t.from]),this._from=Ee([t.from,s,e])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const e=t-this._start,i=this._duration,s=this._prop,o=this._from,a=this._loop,r=this._to;let l;if(this._active=o!==r&&(a||e<i),!this._active){this._target[s]=r,this._notify(!0);return}if(e<0){this._target[s]=o;return}l=e/i%2,l=a&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[s]=this._fn(o,r,l)}wait(){const t=this._promises||(this._promises=[]);return new Promise((e,i)=>{t.push({res:e,rej:i})})}_notify(t){const e=t?"res":"rej",i=this._promises||[];for(let s=0;s<i.length;s++)i[s][e]()}}class Ga{constructor(t,e){this._chart=t,this._properties=new Map,this.configure(e)}configure(t){if(!N(t))return;const e=Object.keys(U.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach(s=>{const o=t[s];if(!N(o))return;const a={};for(const r of e)a[r]=o[r];(W(o.properties)&&o.properties||[s]).forEach(r=>{(r===s||!i.has(r))&&i.set(r,a)})})}_animateOptions(t,e){const i=e.options,s=Ec(t,i);if(!s)return[];const o=this._createAnimations(s,i);return i.$shared&&kc(t.options.$animations,i).then(()=>{t.options=i},()=>{}),o}_createAnimations(t,e){const i=this._properties,s=[],o=t.$animations||(t.$animations={}),a=Object.keys(e),r=Date.now();let l;for(l=a.length-1;l>=0;--l){const c=a[l];if(c.charAt(0)==="$")continue;if(c==="options"){s.push(...this._animateOptions(t,e));continue}const d=e[c];let u=o[c];const h=i.get(c);if(u)if(h&&u.active()){u.update(h,d,r);continue}else u.cancel();if(!h||!h.duration){t[c]=d;continue}o[c]=u=new wc(h,t,c,d),s.push(u)}return s}update(t,e){if(this._properties.size===0){Object.assign(t,e);return}const i=this._createAnimations(t,e);if(i.length)return Mt.add(this._chart,i),!0}}function kc(n,t){const e=[],i=Object.keys(t);for(let s=0;s<i.length;s++){const o=n[i[s]];o&&o.active()&&e.push(o.wait())}return Promise.all(e)}function Ec(n,t){if(!t)return;let e=n.options;if(!e){n.options=t;return}return e.$shared&&(n.options=e=Object.assign({},e,{$shared:!1,$animations:{}})),e}function js(n,t){const e=n&&n.options||{},i=e.reverse,s=e.min===void 0?t:0,o=e.max===void 0?t:0;return{start:i?o:s,end:i?s:o}}function Sc(n,t,e){if(e===!1)return!1;const i=js(n,e),s=js(t,e);return{top:s.end,right:i.end,bottom:s.start,left:i.start}}function Cc(n){let t,e,i,s;return N(n)?(t=n.top,e=n.right,i=n.bottom,s=n.left):t=e=i=s=n,{top:t,right:e,bottom:i,left:s,disabled:n===!1}}function Ya(n,t){const e=[],i=n._getSortedDatasetMetas(t);let s,o;for(s=0,o=i.length;s<o;++s)e.push(i[s].index);return e}function Hs(n,t,e,i={}){const s=n.keys,o=i.mode==="single";let a,r,l,c;if(t===null)return;let d=!1;for(a=0,r=s.length;a<r;++a){if(l=+s[a],l===e){if(d=!0,i.all)continue;break}c=n.values[l],Y(c)&&(o||t===0||yt(t)===yt(c))&&(t+=c)}return!d&&!i.all?0:t}function Mc(n,t){const{iScale:e,vScale:i}=t,s=e.axis==="x"?"x":"y",o=i.axis==="x"?"x":"y",a=Object.keys(n),r=new Array(a.length);let l,c,d;for(l=0,c=a.length;l<c;++l)d=a[l],r[l]={[s]:d,[o]:n[d]};return r}function Gn(n,t){const e=n&&n.options.stacked;return e||e===void 0&&t.stack!==void 0}function Ac(n,t,e){return`${n.id}.${t.id}.${e.stack||e.type}`}function Ic(n){const{min:t,max:e,minDefined:i,maxDefined:s}=n.getUserBounds();return{min:i?t:Number.NEGATIVE_INFINITY,max:s?e:Number.POSITIVE_INFINITY}}function Pc(n,t,e){const i=n[t]||(n[t]={});return i[e]||(i[e]={})}function Vs(n,t,e,i){for(const s of t.getMatchingVisibleMetas(i).reverse()){const o=n[s.index];if(e&&o>0||!e&&o<0)return s.index}return null}function qs(n,t){const{chart:e,_cachedMeta:i}=n,s=e._stacks||(e._stacks={}),{iScale:o,vScale:a,index:r}=i,l=o.axis,c=a.axis,d=Ac(o,a,i),u=t.length;let h;for(let f=0;f<u;++f){const m=t[f],{[l]:p,[c]:g}=m,b=m._stacks||(m._stacks={});h=b[c]=Pc(s,d,p),h[r]=g,h._top=Vs(h,a,!0,i.type),h._bottom=Vs(h,a,!1,i.type);const y=h._visualValues||(h._visualValues={});y[r]=g}}function Yn(n,t){const e=n.scales;return Object.keys(e).filter(i=>e[i].axis===t).shift()}function Lc(n,t){return Wt(n,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function Tc(n,t,e){return Wt(n,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:e,index:t,mode:"default",type:"data"})}function ge(n,t){const e=n.controller.index,i=n.vScale&&n.vScale.axis;if(i){t=t||n._parsed;for(const s of t){const o=s._stacks;if(!o||o[i]===void 0||o[i][e]===void 0)return;delete o[i][e],o[i]._visualValues!==void 0&&o[i]._visualValues[e]!==void 0&&delete o[i]._visualValues[e]}}}const Kn=n=>n==="reset"||n==="none",Ws=(n,t)=>t?n:Object.assign({},n),Bc=(n,t,e)=>n&&!t.hidden&&t._stacked&&{keys:Ya(e,!0),values:null};class ut{constructor(t,e){this.chart=t,this._ctx=t.ctx,this.index=e,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=Gn(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&ge(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,e=this._cachedMeta,i=this.getDataset(),s=(u,h,f,m)=>u==="x"?h:u==="r"?m:f,o=e.xAxisID=O(i.xAxisID,Yn(t,"x")),a=e.yAxisID=O(i.yAxisID,Yn(t,"y")),r=e.rAxisID=O(i.rAxisID,Yn(t,"r")),l=e.indexAxis,c=e.iAxisID=s(l,o,a,r),d=e.vAxisID=s(l,a,o,r);e.xScale=this.getScaleForId(o),e.yScale=this.getScaleForId(a),e.rScale=this.getScaleForId(r),e.iScale=this.getScaleForId(c),e.vScale=this.getScaleForId(d)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const e=this._cachedMeta;return t===e.iScale?e.vScale:e.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&Ms(this._data,this),t._stacked&&ge(t)}_dataCheck(){const t=this.getDataset(),e=t.data||(t.data=[]),i=this._data;if(N(e)){const s=this._cachedMeta;this._data=Mc(e,s)}else if(i!==e){if(i){Ms(i,this);const s=this._cachedMeta;ge(s),s._parsed=[]}e&&Object.isExtensible(e)&&bl(e,this),this._syncList=[],this._data=e}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const e=this._cachedMeta,i=this.getDataset();let s=!1;this._dataCheck();const o=e._stacked;e._stacked=Gn(e.vScale,e),e.stack!==i.stack&&(s=!0,ge(e),e.stack=i.stack),this._resyncElements(t),(s||o!==e._stacked)&&(qs(this,e._parsed),e._stacked=Gn(e.vScale,e))}configure(){const t=this.chart.config,e=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),e,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,e){const{_cachedMeta:i,_data:s}=this,{iScale:o,_stacked:a}=i,r=o.axis;let l=t===0&&e===s.length?!0:i._sorted,c=t>0&&i._parsed[t-1],d,u,h;if(this._parsing===!1)i._parsed=s,i._sorted=!0,h=s;else{W(s[t])?h=this.parseArrayData(i,s,t,e):N(s[t])?h=this.parseObjectData(i,s,t,e):h=this.parsePrimitiveData(i,s,t,e);const f=()=>u[r]===null||c&&u[r]<c[r];for(d=0;d<e;++d)i._parsed[d+t]=u=h[d],l&&(f()&&(l=!1),c=u);i._sorted=l}a&&qs(this,h)}parsePrimitiveData(t,e,i,s){const{iScale:o,vScale:a}=t,r=o.axis,l=a.axis,c=o.getLabels(),d=o===a,u=new Array(s);let h,f,m;for(h=0,f=s;h<f;++h)m=h+i,u[h]={[r]:d||o.parse(c[m],m),[l]:a.parse(e[m],m)};return u}parseArrayData(t,e,i,s){const{xScale:o,yScale:a}=t,r=new Array(s);let l,c,d,u;for(l=0,c=s;l<c;++l)d=l+i,u=e[d],r[l]={x:o.parse(u[0],d),y:a.parse(u[1],d)};return r}parseObjectData(t,e,i,s){const{xScale:o,yScale:a}=t,{xAxisKey:r="x",yAxisKey:l="y"}=this._parsing,c=new Array(s);let d,u,h,f;for(d=0,u=s;d<u;++d)h=d+i,f=e[h],c[d]={x:o.parse(Ht(f,r),h),y:a.parse(Ht(f,l),h)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,e,i){const s=this.chart,o=this._cachedMeta,a=e[t.axis],r={keys:Ya(s,!0),values:e._stacks[t.axis]._visualValues};return Hs(r,a,o.index,{mode:i})}updateRangeFromParsed(t,e,i,s){const o=i[e.axis];let a=o===null?NaN:o;const r=s&&i._stacks[e.axis];s&&r&&(s.values=r,a=Hs(s,o,this._cachedMeta.index)),t.min=Math.min(t.min,a),t.max=Math.max(t.max,a)}getMinMax(t,e){const i=this._cachedMeta,s=i._parsed,o=i._sorted&&t===i.iScale,a=s.length,r=this._getOtherScale(t),l=Bc(e,i,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:d,max:u}=Ic(r);let h,f;function m(){f=s[h];const p=f[r.axis];return!Y(f[t.axis])||d>p||u<p}for(h=0;h<a&&!(!m()&&(this.updateRangeFromParsed(c,t,f,l),o));++h);if(o){for(h=a-1;h>=0;--h)if(!m()){this.updateRangeFromParsed(c,t,f,l);break}}return c}getAllParsedValues(t){const e=this._cachedMeta._parsed,i=[];let s,o,a;for(s=0,o=e.length;s<o;++s)a=e[s][t.axis],Y(a)&&i.push(a);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const e=this._cachedMeta,i=e.iScale,s=e.vScale,o=this.getParsed(t);return{label:i?""+i.getLabelForValue(o[i.axis]):"",value:s?""+s.getLabelForValue(o[s.axis]):""}}_update(t){const e=this._cachedMeta;this.update(t||"default"),e._clip=Cc(O(this.options.clip,Sc(e.xScale,e.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,e=this.chart,i=this._cachedMeta,s=i.data||[],o=e.chartArea,a=[],r=this._drawStart||0,l=this._drawCount||s.length-r,c=this.options.drawActiveElementsOnTop;let d;for(i.dataset&&i.dataset.draw(t,o,r,l),d=r;d<r+l;++d){const u=s[d];u.hidden||(u.active&&c?a.push(u):u.draw(t,o))}for(d=0;d<a.length;++d)a[d].draw(t,o)}getStyle(t,e){const i=e?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,e,i){const s=this.getDataset();let o;if(t>=0&&t<this._cachedMeta.data.length){const a=this._cachedMeta.data[t];o=a.$context||(a.$context=Tc(this.getContext(),t,a)),o.parsed=this.getParsed(t),o.raw=s.data[t],o.index=o.dataIndex=t}else o=this.$context||(this.$context=Lc(this.chart.getContext(),this.index)),o.dataset=s,o.index=o.datasetIndex=this.index;return o.active=!!e,o.mode=i,o}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,e){return this._resolveElementOptions(this.dataElementType.id,e,t)}_resolveElementOptions(t,e="default",i){const s=e==="active",o=this._cachedDataOpts,a=t+"-"+e,r=o[a],l=this.enableOptionSharing&&ze(i);if(r)return Ws(r,l);const c=this.chart.config,d=c.datasetElementScopeKeys(this._type,t),u=s?[`${t}Hover`,"hover",t,""]:[t,""],h=c.getOptionScopes(this.getDataset(),d),f=Object.keys(U.elements[t]),m=()=>this.getContext(i,s,e),p=c.resolveNamedOptions(h,f,m,u);return p.$shared&&(p.$shared=l,o[a]=Object.freeze(Ws(p,l))),p}_resolveAnimations(t,e,i){const s=this.chart,o=this._cachedDataOpts,a=`animation-${e}`,r=o[a];if(r)return r;let l;if(s.options.animation!==!1){const d=this.chart.config,u=d.datasetAnimationScopeKeys(this._type,e),h=d.getOptionScopes(this.getDataset(),u);l=d.createResolver(h,this.getContext(t,i,e))}const c=new Ga(s,l&&l.animations);return l&&l._cacheable&&(o[a]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,e){return!e||Kn(t)||this.chart._animationsDisabled}_getSharedOptions(t,e){const i=this.resolveDataElementOptions(t,e),s=this._sharedOptions,o=this.getSharedOptions(i),a=this.includeOptions(e,o)||o!==s;return this.updateSharedOptions(o,e,i),{sharedOptions:o,includeOptions:a}}updateElement(t,e,i,s){Kn(s)?Object.assign(t,i):this._resolveAnimations(e,s).update(t,i)}updateSharedOptions(t,e,i){t&&!Kn(e)&&this._resolveAnimations(void 0,e).update(t,i)}_setStyle(t,e,i,s){t.active=s;const o=this.getStyle(e,s);this._resolveAnimations(e,i,s).update(t,{options:!s&&this.getSharedOptions(o)||o})}removeHoverStyle(t,e,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,e,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const e=this._data,i=this._cachedMeta.data;for(const[r,l,c]of this._syncList)this[r](l,c);this._syncList=[];const s=i.length,o=e.length,a=Math.min(o,s);a&&this.parse(0,a),o>s?this._insertElements(s,o-s,t):o<s&&this._removeElements(o,s-o)}_insertElements(t,e,i=!0){const s=this._cachedMeta,o=s.data,a=t+e;let r;const l=c=>{for(c.length+=e,r=c.length-1;r>=a;r--)c[r]=c[r-e]};for(l(o),r=t;r<a;++r)o[r]=new this.dataElementType;this._parsing&&l(s._parsed),this.parse(t,e),i&&this.updateElements(o,t,e,"reset")}updateElements(t,e,i,s){}_removeElements(t,e){const i=this._cachedMeta;if(this._parsing){const s=i._parsed.splice(t,e);i._stacked&&ge(i,s)}i.data.splice(t,e)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[e,i,s]=t;this[e](i,s)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,e){e&&this._sync(["_removeElements",t,e]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}L(ut,"defaults",{}),L(ut,"datasetElementType",null),L(ut,"dataElementType",null);function Rc(n,t){if(!n._cache.$bar){const e=n.getMatchingVisibleMetas(t);let i=[];for(let s=0,o=e.length;s<o;s++)i=i.concat(e[s].controller.getAllParsedValues(n));n._cache.$bar=Ma(i.sort((s,o)=>s-o))}return n._cache.$bar}function Dc(n){const t=n.iScale,e=Rc(t,n.type);let i=t._length,s,o,a,r;const l=()=>{a===32767||a===-32768||(ze(r)&&(i=Math.min(i,Math.abs(a-r)||i)),r=a)};for(s=0,o=e.length;s<o;++s)a=t.getPixelForValue(e[s]),l();for(r=void 0,s=0,o=t.ticks.length;s<o;++s)a=t.getPixelForTick(s),l();return i}function Oc(n,t,e,i){const s=e.barThickness;let o,a;return z(s)?(o=t.min*e.categoryPercentage,a=e.barPercentage):(o=s*i,a=1),{chunk:o/i,ratio:a,start:t.pixels[n]-o/2}}function $c(n,t,e,i){const s=t.pixels,o=s[n];let a=n>0?s[n-1]:null,r=n<s.length-1?s[n+1]:null;const l=e.categoryPercentage;a===null&&(a=o-(r===null?t.end-t.start:r-o)),r===null&&(r=o+o-a);const c=o-(o-Math.min(a,r))/2*l;return{chunk:Math.abs(r-a)/2*l/i,ratio:e.barPercentage,start:c}}function zc(n,t,e,i){const s=e.parse(n[0],i),o=e.parse(n[1],i),a=Math.min(s,o),r=Math.max(s,o);let l=a,c=r;Math.abs(a)>Math.abs(r)&&(l=r,c=a),t[e.axis]=c,t._custom={barStart:l,barEnd:c,start:s,end:o,min:a,max:r}}function Ka(n,t,e,i){return W(n)?zc(n,t,e,i):t[e.axis]=e.parse(n,i),t}function Us(n,t,e,i){const s=n.iScale,o=n.vScale,a=s.getLabels(),r=s===o,l=[];let c,d,u,h;for(c=e,d=e+i;c<d;++c)h=t[c],u={},u[s.axis]=r||s.parse(a[c],c),l.push(Ka(h,u,o,c));return l}function Xn(n){return n&&n.barStart!==void 0&&n.barEnd!==void 0}function Nc(n,t,e){return n!==0?yt(n):(t.isHorizontal()?1:-1)*(t.min>=e?1:-1)}function Fc(n){let t,e,i,s,o;return n.horizontal?(t=n.base>n.x,e="left",i="right"):(t=n.base<n.y,e="bottom",i="top"),t?(s="end",o="start"):(s="start",o="end"),{start:e,end:i,reverse:t,top:s,bottom:o}}function jc(n,t,e,i){let s=t.borderSkipped;const o={};if(!s){n.borderSkipped=o;return}if(s===!0){n.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:a,end:r,reverse:l,top:c,bottom:d}=Fc(n);s==="middle"&&e&&(n.enableBorderRadius=!0,(e._top||0)===i?s=c:(e._bottom||0)===i?s=d:(o[Gs(d,a,r,l)]=!0,s=c)),o[Gs(s,a,r,l)]=!0,n.borderSkipped=o}function Gs(n,t,e,i){return i?(n=Hc(n,t,e),n=Ys(n,e,t)):n=Ys(n,t,e),n}function Hc(n,t,e){return n===t?e:n===e?t:n}function Ys(n,t,e){return n==="start"?t:n==="end"?e:n}function Vc(n,{inflateAmount:t},e){n.inflateAmount=t==="auto"?e===1?.33:0:t}class dn extends ut{parsePrimitiveData(t,e,i,s){return Us(t,e,i,s)}parseArrayData(t,e,i,s){return Us(t,e,i,s)}parseObjectData(t,e,i,s){const{iScale:o,vScale:a}=t,{xAxisKey:r="x",yAxisKey:l="y"}=this._parsing,c=o.axis==="x"?r:l,d=a.axis==="x"?r:l,u=[];let h,f,m,p;for(h=i,f=i+s;h<f;++h)p=e[h],m={},m[o.axis]=o.parse(Ht(p,c),h),u.push(Ka(Ht(p,d),m,a,h));return u}updateRangeFromParsed(t,e,i,s){super.updateRangeFromParsed(t,e,i,s);const o=i._custom;o&&e===this._cachedMeta.vScale&&(t.min=Math.min(t.min,o.min),t.max=Math.max(t.max,o.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const e=this._cachedMeta,{iScale:i,vScale:s}=e,o=this.getParsed(t),a=o._custom,r=Xn(a)?"["+a.start+", "+a.end+"]":""+s.getLabelForValue(o[s.axis]);return{label:""+i.getLabelForValue(o[i.axis]),value:r}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const e=this._cachedMeta;this.updateElements(e.data,0,e.data.length,t)}updateElements(t,e,i,s){const o=s==="reset",{index:a,_cachedMeta:{vScale:r}}=this,l=r.getBasePixel(),c=r.isHorizontal(),d=this._getRuler(),{sharedOptions:u,includeOptions:h}=this._getSharedOptions(e,s);for(let f=e;f<e+i;f++){const m=this.getParsed(f),p=o||z(m[r.axis])?{base:l,head:l}:this._calculateBarValuePixels(f),g=this._calculateBarIndexPixels(f,d),b=(m._stacks||{})[r.axis],y={horizontal:c,base:p.base,enableBorderRadius:!b||Xn(m._custom)||a===b._top||a===b._bottom,x:c?p.head:g.center,y:c?g.center:p.head,height:c?g.size:Math.abs(p.size),width:c?Math.abs(p.size):g.size};h&&(y.options=u||this.resolveDataElementOptions(f,t[f].active?"active":s));const v=y.options||t[f].options;jc(y,v,b,a),Vc(y,v,d.ratio),this.updateElement(t[f],f,y,s)}}_getStacks(t,e){const{iScale:i}=this._cachedMeta,s=i.getMatchingVisibleMetas(this._type).filter(d=>d.controller.options.grouped),o=i.options.stacked,a=[],r=this._cachedMeta.controller.getParsed(e),l=r&&r[i.axis],c=d=>{const u=d._parsed.find(f=>f[i.axis]===l),h=u&&u[d.vScale.axis];if(z(h)||isNaN(h))return!0};for(const d of s)if(!(e!==void 0&&c(d))&&((o===!1||a.indexOf(d.stack)===-1||o===void 0&&d.stack===void 0)&&a.push(d.stack),d.index===t))break;return a.length||a.push(void 0),a}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,e=this.chart.options.indexAxis;return Object.keys(t).filter(i=>t[i].axis===e).shift()}_getAxis(){const t={},e=this.getFirstScaleIdForIndexAxis();for(const i of this.chart.data.datasets)t[O(this.chart.options.indexAxis==="x"?i.xAxisID:i.yAxisID,e)]=!0;return Object.keys(t)}_getStackIndex(t,e,i){const s=this._getStacks(t,i),o=e!==void 0?s.indexOf(e):-1;return o===-1?s.length-1:o}_getRuler(){const t=this.options,e=this._cachedMeta,i=e.iScale,s=[];let o,a;for(o=0,a=e.data.length;o<a;++o)s.push(i.getPixelForValue(this.getParsed(o)[i.axis],o));const r=t.barThickness;return{min:r||Dc(e),pixels:s,start:i._startPixel,end:i._endPixel,stackCount:this._getStackCount(),scale:i,grouped:t.grouped,ratio:r?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:e,_stacked:i,index:s},options:{base:o,minBarLength:a}}=this,r=o||0,l=this.getParsed(t),c=l._custom,d=Xn(c);let u=l[e.axis],h=0,f=i?this.applyStack(e,l,i):u,m,p;f!==u&&(h=f-u,f=u),d&&(u=c.barStart,f=c.barEnd-c.barStart,u!==0&&yt(u)!==yt(c.barEnd)&&(h=0),h+=u);const g=!z(o)&&!d?o:h;let b=e.getPixelForValue(g);if(this.chart.getDataVisibility(t)?m=e.getPixelForValue(h+f):m=b,p=m-b,Math.abs(p)<a){p=Nc(p,e,r)*a,u===r&&(b-=p/2);const y=e.getPixelForDecimal(0),v=e.getPixelForDecimal(1),x=Math.min(y,v),k=Math.max(y,v);b=Math.max(Math.min(b,k),x),m=b+p,i&&!d&&(l._stacks[e.axis]._visualValues[s]=e.getValueForPixel(m)-e.getValueForPixel(b))}if(b===e.getPixelForValue(r)){const y=yt(p)*e.getLineWidthForValue(r)/2;b+=y,p-=y}return{size:p,base:b,head:m,center:m+p/2}}_calculateBarIndexPixels(t,e){const i=e.scale,s=this.options,o=s.skipNull,a=O(s.maxBarThickness,1/0);let r,l;const c=this._getAxisCount();if(e.grouped){const d=o?this._getStackCount(t):e.stackCount,u=s.barThickness==="flex"?$c(t,e,s,d*c):Oc(t,e,s,d*c),h=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,f=this._getAxis().indexOf(O(h,this.getFirstScaleIdForIndexAxis())),m=this._getStackIndex(this.index,this._cachedMeta.stack,o?t:void 0)+f;r=u.start+u.chunk*m+u.chunk/2,l=Math.min(a,u.chunk*u.ratio)}else r=i.getPixelForValue(this.getParsed(t)[i.axis],t),l=Math.min(a,e.min*e.ratio);return{base:r-l/2,head:r+l/2,center:r,size:l}}draw(){const t=this._cachedMeta,e=t.vScale,i=t.data,s=i.length;let o=0;for(;o<s;++o)this.getParsed(o)[e.axis]!==null&&!i[o].hidden&&i[o].draw(this._ctx)}}L(dn,"id","bar"),L(dn,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),L(dn,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});class un extends ut{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,e,i,s){const o=super.parsePrimitiveData(t,e,i,s);for(let a=0;a<o.length;a++)o[a]._custom=this.resolveDataElementOptions(a+i).radius;return o}parseArrayData(t,e,i,s){const o=super.parseArrayData(t,e,i,s);for(let a=0;a<o.length;a++){const r=e[i+a];o[a]._custom=O(r[2],this.resolveDataElementOptions(a+i).radius)}return o}parseObjectData(t,e,i,s){const o=super.parseObjectData(t,e,i,s);for(let a=0;a<o.length;a++){const r=e[i+a];o[a]._custom=O(r&&r.r&&+r.r,this.resolveDataElementOptions(a+i).radius)}return o}getMaxOverflow(){const t=this._cachedMeta.data;let e=0;for(let i=t.length-1;i>=0;--i)e=Math.max(e,t[i].size(this.resolveDataElementOptions(i))/2);return e>0&&e}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:o}=e,a=this.getParsed(t),r=s.getLabelForValue(a.x),l=o.getLabelForValue(a.y),c=a._custom;return{label:i[t]||"",value:"("+r+", "+l+(c?", "+c:"")+")"}}update(t){const e=this._cachedMeta.data;this.updateElements(e,0,e.length,t)}updateElements(t,e,i,s){const o=s==="reset",{iScale:a,vScale:r}=this._cachedMeta,{sharedOptions:l,includeOptions:c}=this._getSharedOptions(e,s),d=a.axis,u=r.axis;for(let h=e;h<e+i;h++){const f=t[h],m=!o&&this.getParsed(h),p={},g=p[d]=o?a.getPixelForDecimal(.5):a.getPixelForValue(m[d]),b=p[u]=o?r.getBasePixel():r.getPixelForValue(m[u]);p.skip=isNaN(g)||isNaN(b),c&&(p.options=l||this.resolveDataElementOptions(h,f.active?"active":s),o&&(p.options.radius=0)),this.updateElement(f,h,p,s)}}resolveDataElementOptions(t,e){const i=this.getParsed(t);let s=super.resolveDataElementOptions(t,e);s.$shared&&(s=Object.assign({},s,{$shared:!1}));const o=s.radius;return e!=="active"&&(s.radius=0),s.radius+=O(i&&i._custom,o),s}}L(un,"id","bubble"),L(un,"defaults",{datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}}),L(un,"overrides",{scales:{x:{type:"linear"},y:{type:"linear"}}});function qc(n,t,e){let i=1,s=1,o=0,a=0;if(t<q){const r=n,l=r+t,c=Math.cos(r),d=Math.sin(r),u=Math.cos(l),h=Math.sin(l),f=(v,x,k)=>Ne(v,r,l,!0)?1:Math.max(x,x*e,k,k*e),m=(v,x,k)=>Ne(v,r,l,!0)?-1:Math.min(x,x*e,k,k*e),p=f(0,c,u),g=f(K,d,h),b=m(F,c,u),y=m(F+K,d,h);i=(p-b)/2,s=(g-y)/2,o=-(p+b)/2,a=-(g+y)/2}return{ratioX:i,ratioY:s,offsetX:o,offsetY:a}}class Qt extends ut{constructor(t,e){super(t,e),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,e){const i=this.getDataset().data,s=this._cachedMeta;if(this._parsing===!1)s._parsed=i;else{let o=l=>+i[l];if(N(i[t])){const{key:l="value"}=this._parsing;o=c=>+Ht(i[c],l)}let a,r;for(a=t,r=t+e;a<r;++a)s._parsed[a]=o(a)}}_getRotation(){return dt(this.options.rotation-90)}_getCircumference(){return dt(this.options.circumference)}_getRotationExtents(){let t=q,e=-q;for(let i=0;i<this.chart.data.datasets.length;++i)if(this.chart.isDatasetVisible(i)&&this.chart.getDatasetMeta(i).type===this._type){const s=this.chart.getDatasetMeta(i).controller,o=s._getRotation(),a=s._getCircumference();t=Math.min(t,o),e=Math.max(e,o+a)}return{rotation:t,circumference:e-t}}update(t){const e=this.chart,{chartArea:i}=e,s=this._cachedMeta,o=s.data,a=this.getMaxBorderWidth()+this.getMaxOffset(o)+this.options.spacing,r=Math.max((Math.min(i.width,i.height)-a)/2,0),l=Math.min(nl(this.options.cutout,r),1),c=this._getRingWeight(this.index),{circumference:d,rotation:u}=this._getRotationExtents(),{ratioX:h,ratioY:f,offsetX:m,offsetY:p}=qc(u,d,l),g=(i.width-a)/h,b=(i.height-a)/f,y=Math.max(Math.min(g,b)/2,0),v=wa(this.options.radius,y),x=Math.max(v*l,0),k=(v-x)/this._getVisibleDatasetWeightTotal();this.offsetX=m*v,this.offsetY=p*v,s.total=this.calculateTotal(),this.outerRadius=v-k*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-k*c,0),this.updateElements(o,0,o.length,t)}_circumference(t,e){const i=this.options,s=this._cachedMeta,o=this._getCircumference();return e&&i.animation.animateRotate||!this.chart.getDataVisibility(t)||s._parsed[t]===null||s.data[t].hidden?0:this.calculateCircumference(s._parsed[t]*o/q)}updateElements(t,e,i,s){const o=s==="reset",a=this.chart,r=a.chartArea,c=a.options.animation,d=(r.left+r.right)/2,u=(r.top+r.bottom)/2,h=o&&c.animateScale,f=h?0:this.innerRadius,m=h?0:this.outerRadius,{sharedOptions:p,includeOptions:g}=this._getSharedOptions(e,s);let b=this._getRotation(),y;for(y=0;y<e;++y)b+=this._circumference(y,o);for(y=e;y<e+i;++y){const v=this._circumference(y,o),x=t[y],k={x:d+this.offsetX,y:u+this.offsetY,startAngle:b,endAngle:b+v,circumference:v,outerRadius:m,innerRadius:f};g&&(k.options=p||this.resolveDataElementOptions(y,x.active?"active":s)),b+=v,this.updateElement(x,y,k,s)}}calculateTotal(){const t=this._cachedMeta,e=t.data;let i=0,s;for(s=0;s<e.length;s++){const o=t._parsed[s];o!==null&&!isNaN(o)&&this.chart.getDataVisibility(s)&&!e[s].hidden&&(i+=Math.abs(o))}return i}calculateCircumference(t){const e=this._cachedMeta.total;return e>0&&!isNaN(t)?q*(Math.abs(t)/e):0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,s=i.data.labels||[],o=Ge(e._parsed[t],i.options.locale);return{label:s[t]||"",value:o}}getMaxBorderWidth(t){let e=0;const i=this.chart;let s,o,a,r,l;if(!t){for(s=0,o=i.data.datasets.length;s<o;++s)if(i.isDatasetVisible(s)){a=i.getDatasetMeta(s),t=a.data,r=a.controller;break}}if(!t)return 0;for(s=0,o=t.length;s<o;++s)l=r.resolveDataElementOptions(s),l.borderAlign!=="inner"&&(e=Math.max(e,l.borderWidth||0,l.hoverBorderWidth||0));return e}getMaxOffset(t){let e=0;for(let i=0,s=t.length;i<s;++i){const o=this.resolveDataElementOptions(i);e=Math.max(e,o.offset||0,o.hoverOffset||0)}return e}_getRingWeightOffset(t){let e=0;for(let i=0;i<t;++i)this.chart.isDatasetVisible(i)&&(e+=this._getRingWeight(i));return e}_getRingWeight(t){return Math.max(O(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}L(Qt,"id","doughnut"),L(Qt,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),L(Qt,"descriptors",{_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")}),L(Qt,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data,{labels:{pointStyle:i,textAlign:s,color:o,useBorderRadius:a,borderRadius:r}}=t.legend.options;return e.labels.length&&e.datasets.length?e.labels.map((l,c)=>{const u=t.getDatasetMeta(0).controller.getStyle(c);return{text:l,fillStyle:u.backgroundColor,fontColor:o,hidden:!t.getDataVisibility(c),lineDash:u.borderDash,lineDashOffset:u.borderDashOffset,lineJoin:u.borderJoinStyle,lineWidth:u.borderWidth,strokeStyle:u.borderColor,textAlign:s,pointStyle:i,borderRadius:a&&(r||u.borderRadius),index:c}}):[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}}});class hn extends ut{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const e=this._cachedMeta,{dataset:i,data:s=[],_dataset:o}=e,a=this.chart._animationsDisabled;let{start:r,count:l}=Pa(e,s,a);this._drawStart=r,this._drawCount=l,La(e)&&(r=0,l=s.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!o._decimated,i.points=s;const c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(i,void 0,{animated:!a,options:c},t),this.updateElements(s,r,l,t)}updateElements(t,e,i,s){const o=s==="reset",{iScale:a,vScale:r,_stacked:l,_dataset:c}=this._cachedMeta,{sharedOptions:d,includeOptions:u}=this._getSharedOptions(e,s),h=a.axis,f=r.axis,{spanGaps:m,segment:p}=this.options,g=he(m)?m:Number.POSITIVE_INFINITY,b=this.chart._animationsDisabled||o||s==="none",y=e+i,v=t.length;let x=e>0&&this.getParsed(e-1);for(let k=0;k<v;++k){const w=t[k],E=b?w:{};if(k<e||k>=y){E.skip=!0;continue}const S=this.getParsed(k),C=z(S[f]),I=E[h]=a.getPixelForValue(S[h],k),A=E[f]=o||C?r.getBasePixel():r.getPixelForValue(l?this.applyStack(r,S,l):S[f],k);E.skip=isNaN(I)||isNaN(A)||C,E.stop=k>0&&Math.abs(S[h]-x[h])>g,p&&(E.parsed=S,E.raw=c.data[k]),u&&(E.options=d||this.resolveDataElementOptions(k,w.active?"active":s)),b||this.updateElement(w,k,E,s),x=S}}getMaxOverflow(){const t=this._cachedMeta,e=t.dataset,i=e.options&&e.options.borderWidth||0,s=t.data||[];if(!s.length)return i;const o=s[0].size(this.resolveDataElementOptions(0)),a=s[s.length-1].size(this.resolveDataElementOptions(s.length-1));return Math.max(i,o,a)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}L(hn,"id","line"),L(hn,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),L(hn,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});class Re extends ut{constructor(t,e){super(t,e),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,s=i.data.labels||[],o=Ge(e._parsed[t].r,i.options.locale);return{label:s[t]||"",value:o}}parseObjectData(t,e,i,s){return Na.bind(this)(t,e,i,s)}update(t){const e=this._cachedMeta.data;this._updateRadius(),this.updateElements(e,0,e.length,t)}getMinMax(){const t=this._cachedMeta,e={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((i,s)=>{const o=this.getParsed(s).r;!isNaN(o)&&this.chart.getDataVisibility(s)&&(o<e.min&&(e.min=o),o>e.max&&(e.max=o))}),e}_updateRadius(){const t=this.chart,e=t.chartArea,i=t.options,s=Math.min(e.right-e.left,e.bottom-e.top),o=Math.max(s/2,0),a=Math.max(i.cutoutPercentage?o/100*i.cutoutPercentage:1,0),r=(o-a)/t.getVisibleDatasetCount();this.outerRadius=o-r*this.index,this.innerRadius=this.outerRadius-r}updateElements(t,e,i,s){const o=s==="reset",a=this.chart,l=a.options.animation,c=this._cachedMeta.rScale,d=c.xCenter,u=c.yCenter,h=c.getIndexAngle(0)-.5*F;let f=h,m;const p=360/this.countVisibleElements();for(m=0;m<e;++m)f+=this._computeAngle(m,s,p);for(m=e;m<e+i;m++){const g=t[m];let b=f,y=f+this._computeAngle(m,s,p),v=a.getDataVisibility(m)?c.getDistanceFromCenterForValue(this.getParsed(m).r):0;f=y,o&&(l.animateScale&&(v=0),l.animateRotate&&(b=y=h));const x={x:d,y:u,innerRadius:0,outerRadius:v,startAngle:b,endAngle:y,options:this.resolveDataElementOptions(m,g.active?"active":s)};this.updateElement(g,m,x,s)}}countVisibleElements(){const t=this._cachedMeta;let e=0;return t.data.forEach((i,s)=>{!isNaN(this.getParsed(s).r)&&this.chart.getDataVisibility(s)&&e++}),e}_computeAngle(t,e,i){return this.chart.getDataVisibility(t)?dt(this.resolveDataElementOptions(t,e).angle||i):0}}L(Re,"id","polarArea"),L(Re,"defaults",{dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0}),L(Re,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:i,color:s}}=t.legend.options;return e.labels.map((o,a)=>{const l=t.getDatasetMeta(0).controller.getStyle(a);return{text:o,fillStyle:l.backgroundColor,strokeStyle:l.borderColor,fontColor:s,lineWidth:l.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(a),index:a}})}return[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}});class Bi extends Qt{}L(Bi,"id","pie"),L(Bi,"defaults",{cutout:0,rotation:0,circumference:360,radius:"100%"});class fn extends ut{getLabelAndValue(t){const e=this._cachedMeta.vScale,i=this.getParsed(t);return{label:e.getLabels()[t],value:""+e.getLabelForValue(i[e.axis])}}parseObjectData(t,e,i,s){return Na.bind(this)(t,e,i,s)}update(t){const e=this._cachedMeta,i=e.dataset,s=e.data||[],o=e.iScale.getLabels();if(i.points=s,t!=="resize"){const a=this.resolveDatasetElementOptions(t);this.options.showLine||(a.borderWidth=0);const r={_loop:!0,_fullLoop:o.length===s.length,options:a};this.updateElement(i,void 0,r,t)}this.updateElements(s,0,s.length,t)}updateElements(t,e,i,s){const o=this._cachedMeta.rScale,a=s==="reset";for(let r=e;r<e+i;r++){const l=t[r],c=this.resolveDataElementOptions(r,l.active?"active":s),d=o.getPointPositionForValue(r,this.getParsed(r).r),u=a?o.xCenter:d.x,h=a?o.yCenter:d.y,f={x:u,y:h,angle:d.angle,skip:isNaN(u)||isNaN(h),options:c};this.updateElement(l,r,f,s)}}}L(fn,"id","radar"),L(fn,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),L(fn,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});class mn extends ut{getLabelAndValue(t){const e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:s,yScale:o}=e,a=this.getParsed(t),r=s.getLabelForValue(a.x),l=o.getLabelForValue(a.y);return{label:i[t]||"",value:"("+r+", "+l+")"}}update(t){const e=this._cachedMeta,{data:i=[]}=e,s=this.chart._animationsDisabled;let{start:o,count:a}=Pa(e,i,s);if(this._drawStart=o,this._drawCount=a,La(e)&&(o=0,a=i.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:r,_dataset:l}=e;r._chart=this.chart,r._datasetIndex=this.index,r._decimated=!!l._decimated,r.points=i;const c=this.resolveDatasetElementOptions(t);c.segment=this.options.segment,this.updateElement(r,void 0,{animated:!s,options:c},t)}else this.datasetElementType&&(delete e.dataset,this.datasetElementType=!1);this.updateElements(i,o,a,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,e,i,s){const o=s==="reset",{iScale:a,vScale:r,_stacked:l,_dataset:c}=this._cachedMeta,d=this.resolveDataElementOptions(e,s),u=this.getSharedOptions(d),h=this.includeOptions(s,u),f=a.axis,m=r.axis,{spanGaps:p,segment:g}=this.options,b=he(p)?p:Number.POSITIVE_INFINITY,y=this.chart._animationsDisabled||o||s==="none";let v=e>0&&this.getParsed(e-1);for(let x=e;x<e+i;++x){const k=t[x],w=this.getParsed(x),E=y?k:{},S=z(w[m]),C=E[f]=a.getPixelForValue(w[f],x),I=E[m]=o||S?r.getBasePixel():r.getPixelForValue(l?this.applyStack(r,w,l):w[m],x);E.skip=isNaN(C)||isNaN(I)||S,E.stop=x>0&&Math.abs(w[f]-v[f])>b,g&&(E.parsed=w,E.raw=c.data[x]),h&&(E.options=u||this.resolveDataElementOptions(x,k.active?"active":s)),y||this.updateElement(k,x,E,s),v=w}this.updateSharedOptions(u,s,d)}getMaxOverflow(){const t=this._cachedMeta,e=t.data||[];if(!this.options.showLine){let r=0;for(let l=e.length-1;l>=0;--l)r=Math.max(r,e[l].size(this.resolveDataElementOptions(l))/2);return r>0&&r}const i=t.dataset,s=i.options&&i.options.borderWidth||0;if(!e.length)return s;const o=e[0].size(this.resolveDataElementOptions(0)),a=e[e.length-1].size(this.resolveDataElementOptions(e.length-1));return Math.max(s,o,a)/2}}L(mn,"id","scatter"),L(mn,"defaults",{datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1}),L(mn,"overrides",{interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}});var Wc=Object.freeze({__proto__:null,BarController:dn,BubbleController:un,DoughnutController:Qt,LineController:hn,PieController:Bi,PolarAreaController:Re,RadarController:fn,ScatterController:mn});function Yt(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class ds{constructor(t){L(this,"options");this.options=t||{}}static override(t){Object.assign(ds.prototype,t)}init(){}formats(){return Yt()}parse(){return Yt()}format(){return Yt()}add(){return Yt()}diff(){return Yt()}startOf(){return Yt()}endOf(){return Yt()}}var Uc={_date:ds};function Gc(n,t,e,i){const{controller:s,data:o,_sorted:a}=n,r=s._cachedMeta.iScale,l=n.dataset&&n.dataset.options?n.dataset.options.spanGaps:null;if(r&&t===r.axis&&t!=="r"&&a&&o.length){const c=r._reversePixels?pl:Tt;if(i){if(s._sharedOptions){const d=o[0],u=typeof d.getRange=="function"&&d.getRange(t);if(u){const h=c(o,t,e-u),f=c(o,t,e+u);return{lo:h.lo,hi:f.hi}}}}else{const d=c(o,t,e);if(l){const{vScale:u}=s._cachedMeta,{_parsed:h}=n,f=h.slice(0,d.lo+1).reverse().findIndex(p=>!z(p[u.axis]));d.lo-=Math.max(0,f);const m=h.slice(d.hi).findIndex(p=>!z(p[u.axis]));d.hi+=Math.max(0,m)}return d}}return{lo:0,hi:o.length-1}}function On(n,t,e,i,s){const o=n.getSortedVisibleDatasetMetas(),a=e[t];for(let r=0,l=o.length;r<l;++r){const{index:c,data:d}=o[r],{lo:u,hi:h}=Gc(o[r],t,a,s);for(let f=u;f<=h;++f){const m=d[f];m.skip||i(m,c,f)}}}function Yc(n){const t=n.indexOf("x")!==-1,e=n.indexOf("y")!==-1;return function(i,s){const o=t?Math.abs(i.x-s.x):0,a=e?Math.abs(i.y-s.y):0;return Math.sqrt(Math.pow(o,2)+Math.pow(a,2))}}function Jn(n,t,e,i,s){const o=[];return!s&&!n.isPointInArea(t)||On(n,e,t,function(r,l,c){!s&&!Bt(r,n.chartArea,0)||r.inRange(t.x,t.y,i)&&o.push({element:r,datasetIndex:l,index:c})},!0),o}function Kc(n,t,e,i){let s=[];function o(a,r,l){const{startAngle:c,endAngle:d}=a.getProps(["startAngle","endAngle"],i),{angle:u}=Sa(a,{x:t.x,y:t.y});Ne(u,c,d)&&s.push({element:a,datasetIndex:r,index:l})}return On(n,e,t,o),s}function Xc(n,t,e,i,s,o){let a=[];const r=Yc(e);let l=Number.POSITIVE_INFINITY;function c(d,u,h){const f=d.inRange(t.x,t.y,s);if(i&&!f)return;const m=d.getCenterPoint(s);if(!(!!o||n.isPointInArea(m))&&!f)return;const g=r(t,m);g<l?(a=[{element:d,datasetIndex:u,index:h}],l=g):g===l&&a.push({element:d,datasetIndex:u,index:h})}return On(n,e,t,c),a}function Qn(n,t,e,i,s,o){return!o&&!n.isPointInArea(t)?[]:e==="r"&&!i?Kc(n,t,e,s):Xc(n,t,e,i,s,o)}function Ks(n,t,e,i,s){const o=[],a=e==="x"?"inXRange":"inYRange";let r=!1;return On(n,e,t,(l,c,d)=>{l[a]&&l[a](t[e],s)&&(o.push({element:l,datasetIndex:c,index:d}),r=r||l.inRange(t.x,t.y,s))}),i&&!r?[]:o}var Jc={modes:{index(n,t,e,i){const s=Xt(t,n),o=e.axis||"x",a=e.includeInvisible||!1,r=e.intersect?Jn(n,s,o,i,a):Qn(n,s,o,!1,i,a),l=[];return r.length?(n.getSortedVisibleDatasetMetas().forEach(c=>{const d=r[0].index,u=c.data[d];u&&!u.skip&&l.push({element:u,datasetIndex:c.index,index:d})}),l):[]},dataset(n,t,e,i){const s=Xt(t,n),o=e.axis||"xy",a=e.includeInvisible||!1;let r=e.intersect?Jn(n,s,o,i,a):Qn(n,s,o,!1,i,a);if(r.length>0){const l=r[0].datasetIndex,c=n.getDatasetMeta(l).data;r=[];for(let d=0;d<c.length;++d)r.push({element:c[d],datasetIndex:l,index:d})}return r},point(n,t,e,i){const s=Xt(t,n),o=e.axis||"xy",a=e.includeInvisible||!1;return Jn(n,s,o,i,a)},nearest(n,t,e,i){const s=Xt(t,n),o=e.axis||"xy",a=e.includeInvisible||!1;return Qn(n,s,o,e.intersect,i,a)},x(n,t,e,i){const s=Xt(t,n);return Ks(n,s,"x",e.intersect,i)},y(n,t,e,i){const s=Xt(t,n);return Ks(n,s,"y",e.intersect,i)}}};const Xa=["left","top","right","bottom"];function be(n,t){return n.filter(e=>e.pos===t)}function Xs(n,t){return n.filter(e=>Xa.indexOf(e.pos)===-1&&e.box.axis===t)}function ye(n,t){return n.sort((e,i)=>{const s=t?i:e,o=t?e:i;return s.weight===o.weight?s.index-o.index:s.weight-o.weight})}function Qc(n){const t=[];let e,i,s,o,a,r;for(e=0,i=(n||[]).length;e<i;++e)s=n[e],{position:o,options:{stack:a,stackWeight:r=1}}=s,t.push({index:e,box:s,pos:o,horizontal:s.isHorizontal(),weight:s.weight,stack:a&&o+a,stackWeight:r});return t}function Zc(n){const t={};for(const e of n){const{stack:i,pos:s,stackWeight:o}=e;if(!i||!Xa.includes(s))continue;const a=t[i]||(t[i]={count:0,placed:0,weight:0,size:0});a.count++,a.weight+=o}return t}function td(n,t){const e=Zc(n),{vBoxMaxWidth:i,hBoxMaxHeight:s}=t;let o,a,r;for(o=0,a=n.length;o<a;++o){r=n[o];const{fullSize:l}=r.box,c=e[r.stack],d=c&&r.stackWeight/c.weight;r.horizontal?(r.width=d?d*i:l&&t.availableWidth,r.height=s):(r.width=i,r.height=d?d*s:l&&t.availableHeight)}return e}function ed(n){const t=Qc(n),e=ye(t.filter(c=>c.box.fullSize),!0),i=ye(be(t,"left"),!0),s=ye(be(t,"right")),o=ye(be(t,"top"),!0),a=ye(be(t,"bottom")),r=Xs(t,"x"),l=Xs(t,"y");return{fullSize:e,leftAndTop:i.concat(o),rightAndBottom:s.concat(l).concat(a).concat(r),chartArea:be(t,"chartArea"),vertical:i.concat(s).concat(l),horizontal:o.concat(a).concat(r)}}function Js(n,t,e,i){return Math.max(n[e],t[e])+Math.max(n[i],t[i])}function Ja(n,t){n.top=Math.max(n.top,t.top),n.left=Math.max(n.left,t.left),n.bottom=Math.max(n.bottom,t.bottom),n.right=Math.max(n.right,t.right)}function nd(n,t,e,i){const{pos:s,box:o}=e,a=n.maxPadding;if(!N(s)){e.size&&(n[s]-=e.size);const u=i[e.stack]||{size:0,count:1};u.size=Math.max(u.size,e.horizontal?o.height:o.width),e.size=u.size/u.count,n[s]+=e.size}o.getPadding&&Ja(a,o.getPadding());const r=Math.max(0,t.outerWidth-Js(a,n,"left","right")),l=Math.max(0,t.outerHeight-Js(a,n,"top","bottom")),c=r!==n.w,d=l!==n.h;return n.w=r,n.h=l,e.horizontal?{same:c,other:d}:{same:d,other:c}}function id(n){const t=n.maxPadding;function e(i){const s=Math.max(t[i]-n[i],0);return n[i]+=s,s}n.y+=e("top"),n.x+=e("left"),e("right"),e("bottom")}function sd(n,t){const e=t.maxPadding;function i(s){const o={left:0,top:0,right:0,bottom:0};return s.forEach(a=>{o[a]=Math.max(t[a],e[a])}),o}return i(n?["left","right"]:["top","bottom"])}function Se(n,t,e,i){const s=[];let o,a,r,l,c,d;for(o=0,a=n.length,c=0;o<a;++o){r=n[o],l=r.box,l.update(r.width||t.w,r.height||t.h,sd(r.horizontal,t));const{same:u,other:h}=nd(t,e,r,i);c|=u&&s.length,d=d||h,l.fullSize||s.push(r)}return c&&Se(s,t,e,i)||d}function en(n,t,e,i,s){n.top=e,n.left=t,n.right=t+i,n.bottom=e+s,n.width=i,n.height=s}function Qs(n,t,e,i){const s=e.padding;let{x:o,y:a}=t;for(const r of n){const l=r.box,c=i[r.stack]||{placed:0,weight:1},d=r.stackWeight/c.weight||1;if(r.horizontal){const u=t.w*d,h=c.size||l.height;ze(c.start)&&(a=c.start),l.fullSize?en(l,s.left,a,e.outerWidth-s.right-s.left,h):en(l,t.left+c.placed,a,u,h),c.start=a,c.placed+=u,a=l.bottom}else{const u=t.h*d,h=c.size||l.width;ze(c.start)&&(o=c.start),l.fullSize?en(l,o,s.top,h,e.outerHeight-s.bottom-s.top):en(l,o,t.top+c.placed,h,u),c.start=o,c.placed+=u,o=l.right}}t.x=o,t.y=a}var et={addBox(n,t){n.boxes||(n.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(e){t.draw(e)}}]},n.boxes.push(t)},removeBox(n,t){const e=n.boxes?n.boxes.indexOf(t):-1;e!==-1&&n.boxes.splice(e,1)},configure(n,t,e){t.fullSize=e.fullSize,t.position=e.position,t.weight=e.weight},update(n,t,e,i){if(!n)return;const s=nt(n.options.layout.padding),o=Math.max(t-s.width,0),a=Math.max(e-s.height,0),r=ed(n.boxes),l=r.vertical,c=r.horizontal;H(n.boxes,p=>{typeof p.beforeLayout=="function"&&p.beforeLayout()});const d=l.reduce((p,g)=>g.box.options&&g.box.options.display===!1?p:p+1,0)||1,u=Object.freeze({outerWidth:t,outerHeight:e,padding:s,availableWidth:o,availableHeight:a,vBoxMaxWidth:o/2/d,hBoxMaxHeight:a/2}),h=Object.assign({},s);Ja(h,nt(i));const f=Object.assign({maxPadding:h,w:o,h:a,x:s.left,y:s.top},s),m=td(l.concat(c),u);Se(r.fullSize,f,u,m),Se(l,f,u,m),Se(c,f,u,m)&&Se(l,f,u,m),id(f),Qs(r.leftAndTop,f,u,m),f.x+=f.w,f.y+=f.h,Qs(r.rightAndBottom,f,u,m),n.chartArea={left:f.left,top:f.top,right:f.left+f.w,bottom:f.top+f.h,height:f.h,width:f.w},H(r.chartArea,p=>{const g=p.box;Object.assign(g,n.chartArea),g.update(f.w,f.h,{left:0,top:0,right:0,bottom:0})})}};class Qa{acquireContext(t,e){}releaseContext(t){return!1}addEventListener(t,e,i){}removeEventListener(t,e,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,e,i,s){return e=Math.max(0,e||t.width),i=i||t.height,{width:e,height:Math.max(0,s?Math.floor(e/s):i)}}isAttached(t){return!0}updateConfig(t){}}class od extends Qa{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const pn="$chartjs",ad={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},Zs=n=>n===null||n==="";function rd(n,t){const e=n.style,i=n.getAttribute("height"),s=n.getAttribute("width");if(n[pn]={initial:{height:i,width:s,style:{display:e.display,height:e.height,width:e.width}}},e.display=e.display||"block",e.boxSizing=e.boxSizing||"border-box",Zs(s)){const o=Os(n,"width");o!==void 0&&(n.width=o)}if(Zs(i))if(n.style.height==="")n.height=n.width/(t||2);else{const o=Os(n,"height");o!==void 0&&(n.height=o)}return n}const Za=lc?{passive:!0}:!1;function ld(n,t,e){n&&n.addEventListener(t,e,Za)}function cd(n,t,e){n&&n.canvas&&n.canvas.removeEventListener(t,e,Za)}function dd(n,t){const e=ad[n.type]||n.type,{x:i,y:s}=Xt(n,t);return{type:e,chart:t,native:n,x:i!==void 0?i:null,y:s!==void 0?s:null}}function Cn(n,t){for(const e of n)if(e===t||e.contains(t))return!0}function ud(n,t,e){const i=n.canvas,s=new MutationObserver(o=>{let a=!1;for(const r of o)a=a||Cn(r.addedNodes,i),a=a&&!Cn(r.removedNodes,i);a&&e()});return s.observe(document,{childList:!0,subtree:!0}),s}function hd(n,t,e){const i=n.canvas,s=new MutationObserver(o=>{let a=!1;for(const r of o)a=a||Cn(r.removedNodes,i),a=a&&!Cn(r.addedNodes,i);a&&e()});return s.observe(document,{childList:!0,subtree:!0}),s}const je=new Map;let to=0;function tr(){const n=window.devicePixelRatio;n!==to&&(to=n,je.forEach((t,e)=>{e.currentDevicePixelRatio!==n&&t()}))}function fd(n,t){je.size||window.addEventListener("resize",tr),je.set(n,t)}function md(n){je.delete(n),je.size||window.removeEventListener("resize",tr)}function pd(n,t,e){const i=n.canvas,s=i&&cs(i);if(!s)return;const o=Ia((r,l)=>{const c=s.clientWidth;e(r,l),c<s.clientWidth&&e()},window),a=new ResizeObserver(r=>{const l=r[0],c=l.contentRect.width,d=l.contentRect.height;c===0&&d===0||o(c,d)});return a.observe(s),fd(n,o),a}function Zn(n,t,e){e&&e.disconnect(),t==="resize"&&md(n)}function gd(n,t,e){const i=n.canvas,s=Ia(o=>{n.ctx!==null&&e(dd(o,n))},n);return ld(i,t,s),s}class bd extends Qa{acquireContext(t,e){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(rd(t,e),i):null}releaseContext(t){const e=t.canvas;if(!e[pn])return!1;const i=e[pn].initial;["height","width"].forEach(o=>{const a=i[o];z(a)?e.removeAttribute(o):e.setAttribute(o,a)});const s=i.style||{};return Object.keys(s).forEach(o=>{e.style[o]=s[o]}),e.width=e.width,delete e[pn],!0}addEventListener(t,e,i){this.removeEventListener(t,e);const s=t.$proxies||(t.$proxies={}),a={attach:ud,detach:hd,resize:pd}[e]||gd;s[e]=a(t,e,i)}removeEventListener(t,e){const i=t.$proxies||(t.$proxies={}),s=i[e];if(!s)return;({attach:Zn,detach:Zn,resize:Zn}[e]||cd)(t,e,s),i[e]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,e,i,s){return rc(t,e,i,s)}isAttached(t){const e=t&&cs(t);return!!(e&&e.isConnected)}}function yd(n){return!ls()||typeof OffscreenCanvas<"u"&&n instanceof OffscreenCanvas?od:bd}class ht{constructor(){L(this,"x");L(this,"y");L(this,"active",!1);L(this,"options");L(this,"$animations")}tooltipPosition(t){const{x:e,y:i}=this.getProps(["x","y"],t);return{x:e,y:i}}hasValue(){return he(this.x)&&he(this.y)}getProps(t,e){const i=this.$animations;if(!e||!i)return this;const s={};return t.forEach(o=>{s[o]=i[o]&&i[o].active()?i[o]._to:this[o]}),s}}L(ht,"defaults",{}),L(ht,"defaultRoutes");function vd(n,t){const e=n.options.ticks,i=xd(n),s=Math.min(e.maxTicksLimit||i,i),o=e.major.enabled?wd(t):[],a=o.length,r=o[0],l=o[a-1],c=[];if(a>s)return kd(t,c,o,a/s),c;const d=_d(o,t,s);if(a>0){let u,h;const f=a>1?Math.round((l-r)/(a-1)):null;for(nn(t,c,d,z(f)?0:r-f,r),u=0,h=a-1;u<h;u++)nn(t,c,d,o[u],o[u+1]);return nn(t,c,d,l,z(f)?t.length:l+f),c}return nn(t,c,d),c}function xd(n){const t=n.options.offset,e=n._tickSize(),i=n._length/e+(t?0:1),s=n._maxLength/e;return Math.floor(Math.min(i,s))}function _d(n,t,e){const i=Ed(n),s=t.length/e;if(!i)return Math.max(s,1);const o=dl(i);for(let a=0,r=o.length-1;a<r;a++){const l=o[a];if(l>s)return l}return Math.max(s,1)}function wd(n){const t=[];let e,i;for(e=0,i=n.length;e<i;e++)n[e].major&&t.push(e);return t}function kd(n,t,e,i){let s=0,o=e[0],a;for(i=Math.ceil(i),a=0;a<n.length;a++)a===o&&(t.push(n[a]),s++,o=e[s*i])}function nn(n,t,e,i,s){const o=O(i,0),a=Math.min(O(s,n.length),n.length);let r=0,l,c,d;for(e=Math.ceil(e),s&&(l=s-i,e=l/Math.floor(l/e)),d=o;d<0;)r++,d=Math.round(o+r*e);for(c=Math.max(o,0);c<a;c++)c===d&&(t.push(n[c]),r++,d=Math.round(o+r*e))}function Ed(n){const t=n.length;let e,i;if(t<2)return!1;for(i=n[0],e=1;e<t;++e)if(n[e]-n[e-1]!==i)return!1;return i}const Sd=n=>n==="left"?"right":n==="right"?"left":n,eo=(n,t,e)=>t==="top"||t==="left"?n[t]+e:n[t]-e,no=(n,t)=>Math.min(t||n,n);function io(n,t){const e=[],i=n.length/t,s=n.length;let o=0;for(;o<s;o+=i)e.push(n[Math.floor(o)]);return e}function Cd(n,t,e){const i=n.ticks.length,s=Math.min(t,i-1),o=n._startPixel,a=n._endPixel,r=1e-6;let l=n.getPixelForTick(s),c;if(!(e&&(i===1?c=Math.max(l-o,a-l):t===0?c=(n.getPixelForTick(1)-l)/2:c=(l-n.getPixelForTick(s-1))/2,l+=s<t?c:-c,l<o-r||l>a+r)))return l}function Md(n,t){H(n,e=>{const i=e.gc,s=i.length/2;let o;if(s>t){for(o=0;o<s;++o)delete e.data[i[o]];i.splice(0,s)}})}function ve(n){return n.drawTicks?n.tickLength:0}function so(n,t){if(!n.display)return 0;const e=X(n.font,t),i=nt(n.padding);return(W(n.text)?n.text.length:1)*e.lineHeight+i.height}function Ad(n,t){return Wt(n,{scale:t,type:"scale"})}function Id(n,t,e){return Wt(n,{tick:e,index:t,type:"tick"})}function Pd(n,t,e){let i=ns(n);return(e&&t!=="right"||!e&&t==="right")&&(i=Sd(i)),i}function Ld(n,t,e,i){const{top:s,left:o,bottom:a,right:r,chart:l}=n,{chartArea:c,scales:d}=l;let u=0,h,f,m;const p=a-s,g=r-o;if(n.isHorizontal()){if(f=Z(i,o,r),N(e)){const b=Object.keys(e)[0],y=e[b];m=d[b].getPixelForValue(y)+p-t}else e==="center"?m=(c.bottom+c.top)/2+p-t:m=eo(n,e,t);h=r-o}else{if(N(e)){const b=Object.keys(e)[0],y=e[b];f=d[b].getPixelForValue(y)-g+t}else e==="center"?f=(c.left+c.right)/2-g+t:f=eo(n,e,t);m=Z(i,a,s),u=e==="left"?-K:K}return{titleX:f,titleY:m,maxWidth:h,rotation:u}}class se extends ht{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,e){return t}getUserBounds(){let{_userMin:t,_userMax:e,_suggestedMin:i,_suggestedMax:s}=this;return t=at(t,Number.POSITIVE_INFINITY),e=at(e,Number.NEGATIVE_INFINITY),i=at(i,Number.POSITIVE_INFINITY),s=at(s,Number.NEGATIVE_INFINITY),{min:at(t,i),max:at(e,s),minDefined:Y(t),maxDefined:Y(e)}}getMinMax(t){let{min:e,max:i,minDefined:s,maxDefined:o}=this.getUserBounds(),a;if(s&&o)return{min:e,max:i};const r=this.getMatchingVisibleMetas();for(let l=0,c=r.length;l<c;++l)a=r[l].controller.getMinMax(this,t),s||(e=Math.min(e,a.min)),o||(i=Math.max(i,a.max));return e=o&&e>i?i:e,i=s&&e>i?e:i,{min:at(e,at(i,e)),max:at(i,at(e,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){V(this.options.beforeUpdate,[this])}update(t,e,i){const{beginAtZero:s,grace:o,ticks:a}=this.options,r=a.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=Nl(this,o,s),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const l=r<this.ticks.length;this._convertTicksToLabels(l?io(this.ticks,r):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),a.display&&(a.autoSkip||a.source==="auto")&&(this.ticks=vd(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,e,i;this.isHorizontal()?(e=this.left,i=this.right):(e=this.top,i=this.bottom,t=!t),this._startPixel=e,this._endPixel=i,this._reversePixels=t,this._length=i-e,this._alignToPixels=this.options.alignToPixels}afterUpdate(){V(this.options.afterUpdate,[this])}beforeSetDimensions(){V(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){V(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),V(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){V(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const e=this.options.ticks;let i,s,o;for(i=0,s=t.length;i<s;i++)o=t[i],o.label=V(e.callback,[o.value,i,t],this)}afterTickToLabelConversion(){V(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){V(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,e=t.ticks,i=no(this.ticks.length,t.ticks.maxTicksLimit),s=e.minRotation||0,o=e.maxRotation;let a=s,r,l,c;if(!this._isVisible()||!e.display||s>=o||i<=1||!this.isHorizontal()){this.labelRotation=s;return}const d=this._getLabelSizes(),u=d.widest.width,h=d.highest.height,f=Q(this.chart.width-u,0,this.maxWidth);r=t.offset?this.maxWidth/i:f/(i-1),u+6>r&&(r=f/(i-(t.offset?.5:1)),l=this.maxHeight-ve(t.grid)-e.padding-so(t.title,this.chart.options.font),c=Math.sqrt(u*u+h*h),a=ts(Math.min(Math.asin(Q((d.highest.height+6)/r,-1,1)),Math.asin(Q(l/c,-1,1))-Math.asin(Q(h/c,-1,1)))),a=Math.max(s,Math.min(o,a))),this.labelRotation=a}afterCalculateLabelRotation(){V(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){V(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:e,options:{ticks:i,title:s,grid:o}}=this,a=this._isVisible(),r=this.isHorizontal();if(a){const l=so(s,e.options.font);if(r?(t.width=this.maxWidth,t.height=ve(o)+l):(t.height=this.maxHeight,t.width=ve(o)+l),i.display&&this.ticks.length){const{first:c,last:d,widest:u,highest:h}=this._getLabelSizes(),f=i.padding*2,m=dt(this.labelRotation),p=Math.cos(m),g=Math.sin(m);if(r){const b=i.mirror?0:g*u.width+p*h.height;t.height=Math.min(this.maxHeight,t.height+b+f)}else{const b=i.mirror?0:p*u.width+g*h.height;t.width=Math.min(this.maxWidth,t.width+b+f)}this._calculatePadding(c,d,g,p)}}this._handleMargins(),r?(this.width=this._length=e.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=e.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,e,i,s){const{ticks:{align:o,padding:a},position:r}=this.options,l=this.labelRotation!==0,c=r!=="top"&&this.axis==="x";if(this.isHorizontal()){const d=this.getPixelForTick(0)-this.left,u=this.right-this.getPixelForTick(this.ticks.length-1);let h=0,f=0;l?c?(h=s*t.width,f=i*e.height):(h=i*t.height,f=s*e.width):o==="start"?f=e.width:o==="end"?h=t.width:o!=="inner"&&(h=t.width/2,f=e.width/2),this.paddingLeft=Math.max((h-d+a)*this.width/(this.width-d),0),this.paddingRight=Math.max((f-u+a)*this.width/(this.width-u),0)}else{let d=e.height/2,u=t.height/2;o==="start"?(d=0,u=t.height):o==="end"&&(d=e.height,u=0),this.paddingTop=d+a,this.paddingBottom=u+a}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){V(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:e}=this.options;return e==="top"||e==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let e,i;for(e=0,i=t.length;e<i;e++)z(t[e].label)&&(t.splice(e,1),i--,e--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const e=this.options.ticks.sampleSize;let i=this.ticks;e<i.length&&(i=io(i,e)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,e,i){const{ctx:s,_longestTextCache:o}=this,a=[],r=[],l=Math.floor(e/no(e,i));let c=0,d=0,u,h,f,m,p,g,b,y,v,x,k;for(u=0;u<e;u+=l){if(m=t[u].label,p=this._resolveTickFontOptions(u),s.font=g=p.string,b=o[g]=o[g]||{data:{},gc:[]},y=p.lineHeight,v=x=0,!z(m)&&!W(m))v=En(s,b.data,b.gc,v,m),x=y;else if(W(m))for(h=0,f=m.length;h<f;++h)k=m[h],!z(k)&&!W(k)&&(v=En(s,b.data,b.gc,v,k),x+=y);a.push(v),r.push(x),c=Math.max(v,c),d=Math.max(x,d)}Md(o,e);const w=a.indexOf(c),E=r.indexOf(d),S=C=>({width:a[C]||0,height:r[C]||0});return{first:S(0),last:S(e-1),widest:S(w),highest:S(E),widths:a,heights:r}}getLabelForValue(t){return t}getPixelForValue(t,e){return NaN}getValueForPixel(t){}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const e=this._startPixel+t*this._length;return ml(this._alignToPixels?Gt(this.chart,e,0):e)}getDecimalForPixel(t){const e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:e}=this;return t<0&&e<0?e:t>0&&e>0?t:0}getContext(t){const e=this.ticks||[];if(t>=0&&t<e.length){const i=e[t];return i.$context||(i.$context=Id(this.getContext(),t,i))}return this.$context||(this.$context=Ad(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,e=dt(this.labelRotation),i=Math.abs(Math.cos(e)),s=Math.abs(Math.sin(e)),o=this._getLabelSizes(),a=t.autoSkipPadding||0,r=o?o.widest.width+a:0,l=o?o.highest.height+a:0;return this.isHorizontal()?l*i>r*s?r/i:l/s:l*s<r*i?l/i:r/s}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const e=this.axis,i=this.chart,s=this.options,{grid:o,position:a,border:r}=s,l=o.offset,c=this.isHorizontal(),u=this.ticks.length+(l?1:0),h=ve(o),f=[],m=r.setContext(this.getContext()),p=m.display?m.width:0,g=p/2,b=function(j){return Gt(i,j,p)};let y,v,x,k,w,E,S,C,I,A,P,B;if(a==="top")y=b(this.bottom),E=this.bottom-h,C=y-g,A=b(t.top)+g,B=t.bottom;else if(a==="bottom")y=b(this.top),A=t.top,B=b(t.bottom)-g,E=y+g,C=this.top+h;else if(a==="left")y=b(this.right),w=this.right-h,S=y-g,I=b(t.left)+g,P=t.right;else if(a==="right")y=b(this.left),I=t.left,P=b(t.right)-g,w=y+g,S=this.left+h;else if(e==="x"){if(a==="center")y=b((t.top+t.bottom)/2+.5);else if(N(a)){const j=Object.keys(a)[0],G=a[j];y=b(this.chart.scales[j].getPixelForValue(G))}A=t.top,B=t.bottom,E=y+g,C=E+h}else if(e==="y"){if(a==="center")y=b((t.left+t.right)/2);else if(N(a)){const j=Object.keys(a)[0],G=a[j];y=b(this.chart.scales[j].getPixelForValue(G))}w=y-g,S=w-h,I=t.left,P=t.right}const D=O(s.ticks.maxTicksLimit,u),$=Math.max(1,Math.ceil(u/D));for(v=0;v<u;v+=$){const j=this.getContext(v),G=o.setContext(j),it=r.setContext(j),J=G.lineWidth,ft=G.color,vt=it.dash||[],xt=it.dashOffset,_t=G.tickWidth,wt=G.tickColor,kt=G.tickBorderDash||[],mt=G.tickBorderDashOffset;x=Cd(this,v,l),x!==void 0&&(k=Gt(i,x,J),c?w=S=I=P=k:E=C=A=B=k,f.push({tx1:w,ty1:E,tx2:S,ty2:C,x1:I,y1:A,x2:P,y2:B,width:J,color:ft,borderDash:vt,borderDashOffset:xt,tickWidth:_t,tickColor:wt,tickBorderDash:kt,tickBorderDashOffset:mt}))}return this._ticksLength=u,this._borderValue=y,f}_computeLabelItems(t){const e=this.axis,i=this.options,{position:s,ticks:o}=i,a=this.isHorizontal(),r=this.ticks,{align:l,crossAlign:c,padding:d,mirror:u}=o,h=ve(i.grid),f=h+d,m=u?-d:f,p=-dt(this.labelRotation),g=[];let b,y,v,x,k,w,E,S,C,I,A,P,B="middle";if(s==="top")w=this.bottom-m,E=this._getXAxisLabelAlignment();else if(s==="bottom")w=this.top+m,E=this._getXAxisLabelAlignment();else if(s==="left"){const $=this._getYAxisLabelAlignment(h);E=$.textAlign,k=$.x}else if(s==="right"){const $=this._getYAxisLabelAlignment(h);E=$.textAlign,k=$.x}else if(e==="x"){if(s==="center")w=(t.top+t.bottom)/2+f;else if(N(s)){const $=Object.keys(s)[0],j=s[$];w=this.chart.scales[$].getPixelForValue(j)+f}E=this._getXAxisLabelAlignment()}else if(e==="y"){if(s==="center")k=(t.left+t.right)/2-f;else if(N(s)){const $=Object.keys(s)[0],j=s[$];k=this.chart.scales[$].getPixelForValue(j)}E=this._getYAxisLabelAlignment(h).textAlign}e==="y"&&(l==="start"?B="top":l==="end"&&(B="bottom"));const D=this._getLabelSizes();for(b=0,y=r.length;b<y;++b){v=r[b],x=v.label;const $=o.setContext(this.getContext(b));S=this.getPixelForTick(b)+o.labelOffset,C=this._resolveTickFontOptions(b),I=C.lineHeight,A=W(x)?x.length:1;const j=A/2,G=$.color,it=$.textStrokeColor,J=$.textStrokeWidth;let ft=E;a?(k=S,E==="inner"&&(b===y-1?ft=this.options.reverse?"left":"right":b===0?ft=this.options.reverse?"right":"left":ft="center"),s==="top"?c==="near"||p!==0?P=-A*I+I/2:c==="center"?P=-D.highest.height/2-j*I+I:P=-D.highest.height+I/2:c==="near"||p!==0?P=I/2:c==="center"?P=D.highest.height/2-j*I:P=D.highest.height-A*I,u&&(P*=-1),p!==0&&!$.showLabelBackdrop&&(k+=I/2*Math.sin(p))):(w=S,P=(1-A)*I/2);let vt;if($.showLabelBackdrop){const xt=nt($.backdropPadding),_t=D.heights[b],wt=D.widths[b];let kt=P-xt.top,mt=0-xt.left;switch(B){case"middle":kt-=_t/2;break;case"bottom":kt-=_t;break}switch(E){case"center":mt-=wt/2;break;case"right":mt-=wt;break;case"inner":b===y-1?mt-=wt:b>0&&(mt-=wt/2);break}vt={left:mt,top:kt,width:wt+xt.width,height:_t+xt.height,color:$.backdropColor}}g.push({label:x,font:C,textOffset:P,options:{rotation:p,color:G,strokeColor:it,strokeWidth:J,textAlign:ft,textBaseline:B,translation:[k,w],backdrop:vt}})}return g}_getXAxisLabelAlignment(){const{position:t,ticks:e}=this.options;if(-dt(this.labelRotation))return t==="top"?"left":"right";let s="center";return e.align==="start"?s="left":e.align==="end"?s="right":e.align==="inner"&&(s="inner"),s}_getYAxisLabelAlignment(t){const{position:e,ticks:{crossAlign:i,mirror:s,padding:o}}=this.options,a=this._getLabelSizes(),r=t+o,l=a.widest.width;let c,d;return e==="left"?s?(d=this.right+o,i==="near"?c="left":i==="center"?(c="center",d+=l/2):(c="right",d+=l)):(d=this.right-r,i==="near"?c="right":i==="center"?(c="center",d-=l/2):(c="left",d=this.left)):e==="right"?s?(d=this.left+o,i==="near"?c="right":i==="center"?(c="center",d-=l/2):(c="left",d-=l)):(d=this.left+r,i==="near"?c="left":i==="center"?(c="center",d+=l/2):(c="right",d=this.right)):c="right",{textAlign:c,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,e=this.options.position;if(e==="left"||e==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(e==="top"||e==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:e},left:i,top:s,width:o,height:a}=this;e&&(t.save(),t.fillStyle=e,t.fillRect(i,s,o,a),t.restore())}getLineWidthForValue(t){const e=this.options.grid;if(!this._isVisible()||!e.display)return 0;const s=this.ticks.findIndex(o=>o.value===t);return s>=0?e.setContext(this.getContext(s)).lineWidth:0}drawGrid(t){const e=this.options.grid,i=this.ctx,s=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let o,a;const r=(l,c,d)=>{!d.width||!d.color||(i.save(),i.lineWidth=d.width,i.strokeStyle=d.color,i.setLineDash(d.borderDash||[]),i.lineDashOffset=d.borderDashOffset,i.beginPath(),i.moveTo(l.x,l.y),i.lineTo(c.x,c.y),i.stroke(),i.restore())};if(e.display)for(o=0,a=s.length;o<a;++o){const l=s[o];e.drawOnChartArea&&r({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),e.drawTicks&&r({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:e,options:{border:i,grid:s}}=this,o=i.setContext(this.getContext()),a=i.display?o.width:0;if(!a)return;const r=s.setContext(this.getContext(0)).lineWidth,l=this._borderValue;let c,d,u,h;this.isHorizontal()?(c=Gt(t,this.left,a)-a/2,d=Gt(t,this.right,r)+r/2,u=h=l):(u=Gt(t,this.top,a)-a/2,h=Gt(t,this.bottom,r)+r/2,c=d=l),e.save(),e.lineWidth=o.width,e.strokeStyle=o.color,e.beginPath(),e.moveTo(c,u),e.lineTo(d,h),e.stroke(),e.restore()}drawLabels(t){if(!this.options.ticks.display)return;const i=this.ctx,s=this._computeLabelArea();s&&Bn(i,s);const o=this.getLabelItems(t);for(const a of o){const r=a.options,l=a.font,c=a.label,d=a.textOffset;ne(i,c,0,d,l,r)}s&&Rn(i)}drawTitle(){const{ctx:t,options:{position:e,title:i,reverse:s}}=this;if(!i.display)return;const o=X(i.font),a=nt(i.padding),r=i.align;let l=o.lineHeight/2;e==="bottom"||e==="center"||N(e)?(l+=a.bottom,W(i.text)&&(l+=o.lineHeight*(i.text.length-1))):l+=a.top;const{titleX:c,titleY:d,maxWidth:u,rotation:h}=Ld(this,l,e,r);ne(t,i.text,0,0,o,{color:i.color,maxWidth:u,rotation:h,textAlign:Pd(r,e,s),textBaseline:"middle",translation:[c,d]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,e=t.ticks&&t.ticks.z||0,i=O(t.grid&&t.grid.z,-1),s=O(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==se.prototype.draw?[{z:e,draw:o=>{this.draw(o)}}]:[{z:i,draw:o=>{this.drawBackground(),this.drawGrid(o),this.drawTitle()}},{z:s,draw:()=>{this.drawBorder()}},{z:e,draw:o=>{this.drawLabels(o)}}]}getMatchingVisibleMetas(t){const e=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",s=[];let o,a;for(o=0,a=e.length;o<a;++o){const r=e[o];r[i]===this.id&&(!t||r.type===t)&&s.push(r)}return s}_resolveTickFontOptions(t){const e=this.options.ticks.setContext(this.getContext(t));return X(e.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class sn{constructor(t,e,i){this.type=t,this.scope=e,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const e=Object.getPrototypeOf(t);let i;Rd(e)&&(i=this.register(e));const s=this.items,o=t.id,a=this.scope+"."+o;if(!o)throw new Error("class does not have id: "+t);return o in s||(s[o]=t,Td(t,a,i),this.override&&U.override(t.id,t.overrides)),a}get(t){return this.items[t]}unregister(t){const e=this.items,i=t.id,s=this.scope;i in e&&delete e[i],s&&i in U[s]&&(delete U[s][i],this.override&&delete ee[i])}}function Td(n,t,e){const i=$e(Object.create(null),[e?U.get(e):{},U.get(t),n.defaults]);U.set(t,i),n.defaultRoutes&&Bd(t,n.defaultRoutes),n.descriptors&&U.describe(t,n.descriptors)}function Bd(n,t){Object.keys(t).forEach(e=>{const i=e.split("."),s=i.pop(),o=[n].concat(i).join("."),a=t[e].split("."),r=a.pop(),l=a.join(".");U.route(o,s,l,r)})}function Rd(n){return"id"in n&&"defaults"in n}class Dd{constructor(){this.controllers=new sn(ut,"datasets",!0),this.elements=new sn(ht,"elements"),this.plugins=new sn(Object,"plugins"),this.scales=new sn(se,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,e,i){[...e].forEach(s=>{const o=i||this._getRegistryForType(s);i||o.isForType(s)||o===this.plugins&&s.id?this._exec(t,o,s):H(s,a=>{const r=i||this._getRegistryForType(a);this._exec(t,r,a)})})}_exec(t,e,i){const s=Zi(t);V(i["before"+s],[],i),e[t](i),V(i["after"+s],[],i)}_getRegistryForType(t){for(let e=0;e<this._typedRegistries.length;e++){const i=this._typedRegistries[e];if(i.isForType(t))return i}return this.plugins}_get(t,e,i){const s=e.get(t);if(s===void 0)throw new Error('"'+t+'" is not a registered '+i+".");return s}}var bt=new Dd;class Od{constructor(){this._init=void 0}notify(t,e,i,s){if(e==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const o=s?this._descriptors(t).filter(s):this._descriptors(t),a=this._notify(o,t,e,i);return e==="afterDestroy"&&(this._notify(o,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),a}_notify(t,e,i,s){s=s||{};for(const o of t){const a=o.plugin,r=a[i],l=[e,s,o.options];if(V(r,l,a)===!1&&s.cancelable)return!1}return!0}invalidate(){z(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const e=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),e}_createDescriptors(t,e){const i=t&&t.config,s=O(i.options&&i.options.plugins,{}),o=$d(i);return s===!1&&!e?[]:Nd(t,o,s,e)}_notifyStateChanges(t){const e=this._oldCache||[],i=this._cache,s=(o,a)=>o.filter(r=>!a.some(l=>r.plugin.id===l.plugin.id));this._notify(s(e,i),t,"stop"),this._notify(s(i,e),t,"start")}}function $d(n){const t={},e=[],i=Object.keys(bt.plugins.items);for(let o=0;o<i.length;o++)e.push(bt.getPlugin(i[o]));const s=n.plugins||[];for(let o=0;o<s.length;o++){const a=s[o];e.indexOf(a)===-1&&(e.push(a),t[a.id]=!0)}return{plugins:e,localIds:t}}function zd(n,t){return!t&&n===!1?null:n===!0?{}:n}function Nd(n,{plugins:t,localIds:e},i,s){const o=[],a=n.getContext();for(const r of t){const l=r.id,c=zd(i[l],s);c!==null&&o.push({plugin:r,options:Fd(n.config,{plugin:r,local:e[l]},c,a)})}return o}function Fd(n,{plugin:t,local:e},i,s){const o=n.pluginScopeKeys(t),a=n.getOptionScopes(i,o);return e&&t.defaults&&a.push(t.defaults),n.createResolver(a,s,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function Ri(n,t){const e=U.datasets[n]||{};return((t.datasets||{})[n]||{}).indexAxis||t.indexAxis||e.indexAxis||"x"}function jd(n,t){let e=n;return n==="_index_"?e=t:n==="_value_"&&(e=t==="x"?"y":"x"),e}function Hd(n,t){return n===t?"_index_":"_value_"}function oo(n){if(n==="x"||n==="y"||n==="r")return n}function Vd(n){if(n==="top"||n==="bottom")return"x";if(n==="left"||n==="right")return"y"}function Di(n,...t){if(oo(n))return n;for(const e of t){const i=e.axis||Vd(e.position)||n.length>1&&oo(n[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${n}' axis. Please provide 'axis' or 'position' option.`)}function ao(n,t,e){if(e[t+"AxisID"]===n)return{axis:t}}function qd(n,t){if(t.data&&t.data.datasets){const e=t.data.datasets.filter(i=>i.xAxisID===n||i.yAxisID===n);if(e.length)return ao(n,"x",e[0])||ao(n,"y",e[0])}return{}}function Wd(n,t){const e=ee[n.type]||{scales:{}},i=t.scales||{},s=Ri(n.type,t),o=Object.create(null);return Object.keys(i).forEach(a=>{const r=i[a];if(!N(r))return console.error(`Invalid scale configuration for scale: ${a}`);if(r._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${a}`);const l=Di(a,r,qd(a,n),U.scales[r.type]),c=Hd(l,s),d=e.scales||{};o[a]=Pe(Object.create(null),[{axis:l},r,d[l],d[c]])}),n.data.datasets.forEach(a=>{const r=a.type||n.type,l=a.indexAxis||Ri(r,t),d=(ee[r]||{}).scales||{};Object.keys(d).forEach(u=>{const h=jd(u,l),f=a[h+"AxisID"]||h;o[f]=o[f]||Object.create(null),Pe(o[f],[{axis:h},i[f],d[u]])})}),Object.keys(o).forEach(a=>{const r=o[a];Pe(r,[U.scales[r.type],U.scale])}),o}function er(n){const t=n.options||(n.options={});t.plugins=O(t.plugins,{}),t.scales=Wd(n,t)}function nr(n){return n=n||{},n.datasets=n.datasets||[],n.labels=n.labels||[],n}function Ud(n){return n=n||{},n.data=nr(n.data),er(n),n}const ro=new Map,ir=new Set;function on(n,t){let e=ro.get(n);return e||(e=t(),ro.set(n,e),ir.add(e)),e}const xe=(n,t,e)=>{const i=Ht(t,e);i!==void 0&&n.add(i)};class Gd{constructor(t){this._config=Ud(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=nr(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),er(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return on(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,e){return on(`${t}.transition.${e}`,()=>[[`datasets.${t}.transitions.${e}`,`transitions.${e}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,e){return on(`${t}-${e}`,()=>[[`datasets.${t}.elements.${e}`,`datasets.${t}`,`elements.${e}`,""]])}pluginScopeKeys(t){const e=t.id,i=this.type;return on(`${i}-plugin-${e}`,()=>[[`plugins.${e}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,e){const i=this._scopeCache;let s=i.get(t);return(!s||e)&&(s=new Map,i.set(t,s)),s}getOptionScopes(t,e,i){const{options:s,type:o}=this,a=this._cachedScopes(t,i),r=a.get(e);if(r)return r;const l=new Set;e.forEach(d=>{t&&(l.add(t),d.forEach(u=>xe(l,t,u))),d.forEach(u=>xe(l,s,u)),d.forEach(u=>xe(l,ee[o]||{},u)),d.forEach(u=>xe(l,U,u)),d.forEach(u=>xe(l,Li,u))});const c=Array.from(l);return c.length===0&&c.push(Object.create(null)),ir.has(e)&&a.set(e,c),c}chartOptionScopes(){const{options:t,type:e}=this;return[t,ee[e]||{},U.datasets[e]||{},{type:e},U,Li]}resolveNamedOptions(t,e,i,s=[""]){const o={$shared:!0},{resolver:a,subPrefixes:r}=lo(this._resolverCache,t,s);let l=a;if(Kd(a,e)){o.$shared=!1,i=Vt(i)?i():i;const c=this.createResolver(t,i,r);l=fe(a,i,c)}for(const c of e)o[c]=l[c];return o}createResolver(t,e,i=[""],s){const{resolver:o}=lo(this._resolverCache,t,i);return N(e)?fe(o,e,void 0,s):o}}function lo(n,t,e){let i=n.get(t);i||(i=new Map,n.set(t,i));const s=e.join();let o=i.get(s);return o||(o={resolver:os(t,e),subPrefixes:e.filter(r=>!r.toLowerCase().includes("hover"))},i.set(s,o)),o}const Yd=n=>N(n)&&Object.getOwnPropertyNames(n).some(t=>Vt(n[t]));function Kd(n,t){const{isScriptable:e,isIndexable:i}=Da(n);for(const s of t){const o=e(s),a=i(s),r=(a||o)&&n[s];if(o&&(Vt(r)||Yd(r))||a&&W(r))return!0}return!1}var Xd="4.5.1";const Jd=["top","bottom","left","right","chartArea"];function co(n,t){return n==="top"||n==="bottom"||Jd.indexOf(n)===-1&&t==="x"}function uo(n,t){return function(e,i){return e[n]===i[n]?e[t]-i[t]:e[n]-i[n]}}function ho(n){const t=n.chart,e=t.options.animation;t.notifyPlugins("afterRender"),V(e&&e.onComplete,[n],t)}function Qd(n){const t=n.chart,e=t.options.animation;V(e&&e.onProgress,[n],t)}function sr(n){return ls()&&typeof n=="string"?n=document.getElementById(n):n&&n.length&&(n=n[0]),n&&n.canvas&&(n=n.canvas),n}const gn={},fo=n=>{const t=sr(n);return Object.values(gn).filter(e=>e.canvas===t).pop()};function Zd(n,t,e){const i=Object.keys(n);for(const s of i){const o=+s;if(o>=t){const a=n[s];delete n[s],(e>0||o>t)&&(n[o+e]=a)}}}function tu(n,t,e,i){return!e||n.type==="mouseout"?null:i?t:n}class Pt{static register(...t){bt.add(...t),mo()}static unregister(...t){bt.remove(...t),mo()}constructor(t,e){const i=this.config=new Gd(e),s=sr(t),o=fo(s);if(o)throw new Error("Canvas is already in use. Chart with ID '"+o.id+"' must be destroyed before the canvas with ID '"+o.canvas.id+"' can be reused.");const a=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||yd(s)),this.platform.updateConfig(i);const r=this.platform.acquireContext(s,a.aspectRatio),l=r&&r.canvas,c=l&&l.height,d=l&&l.width;if(this.id=el(),this.ctx=r,this.canvas=l,this.width=d,this.height=c,this._options=a,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new Od,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=yl(u=>this.update(u),a.resizeDelay||0),this._dataChanges=[],gn[this.id]=this,!r||!l){console.error("Failed to create chart: can't acquire context from the given item");return}Mt.listen(this,"complete",ho),Mt.listen(this,"progress",Qd),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:e},width:i,height:s,_aspectRatio:o}=this;return z(t)?e&&o?o:s?i/s:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return bt}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():Ds(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Ts(this.canvas,this.ctx),this}stop(){return Mt.stop(this),this}resize(t,e){Mt.running(this)?this._resizeBeforeDraw={width:t,height:e}:this._resize(t,e)}_resize(t,e){const i=this.options,s=this.canvas,o=i.maintainAspectRatio&&this.aspectRatio,a=this.platform.getMaximumSize(s,t,e,o),r=i.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=a.width,this.height=a.height,this._aspectRatio=this.aspectRatio,Ds(this,r,!0)&&(this.notifyPlugins("resize",{size:a}),V(i.onResize,[this,a],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){const e=this.options.scales||{};H(e,(i,s)=>{i.id=s})}buildOrUpdateScales(){const t=this.options,e=t.scales,i=this.scales,s=Object.keys(i).reduce((a,r)=>(a[r]=!1,a),{});let o=[];e&&(o=o.concat(Object.keys(e).map(a=>{const r=e[a],l=Di(a,r),c=l==="r",d=l==="x";return{options:r,dposition:c?"chartArea":d?"bottom":"left",dtype:c?"radialLinear":d?"category":"linear"}}))),H(o,a=>{const r=a.options,l=r.id,c=Di(l,r),d=O(r.type,a.dtype);(r.position===void 0||co(r.position,c)!==co(a.dposition))&&(r.position=a.dposition),s[l]=!0;let u=null;if(l in i&&i[l].type===d)u=i[l];else{const h=bt.getScale(d);u=new h({id:l,type:d,ctx:this.ctx,chart:this}),i[u.id]=u}u.init(r,t)}),H(s,(a,r)=>{a||delete i[r]}),H(i,a=>{et.configure(this,a,a.options),et.addBox(this,a)})}_updateMetasets(){const t=this._metasets,e=this.data.datasets.length,i=t.length;if(t.sort((s,o)=>s.index-o.index),i>e){for(let s=e;s<i;++s)this._destroyDatasetMeta(s);t.splice(e,i-e)}this._sortedMetasets=t.slice(0).sort(uo("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:e}}=this;t.length>e.length&&delete this._stacks,t.forEach((i,s)=>{e.filter(o=>o===i._dataset).length===0&&this._destroyDatasetMeta(s)})}buildOrUpdateControllers(){const t=[],e=this.data.datasets;let i,s;for(this._removeUnreferencedMetasets(),i=0,s=e.length;i<s;i++){const o=e[i];let a=this.getDatasetMeta(i);const r=o.type||this.config.type;if(a.type&&a.type!==r&&(this._destroyDatasetMeta(i),a=this.getDatasetMeta(i)),a.type=r,a.indexAxis=o.indexAxis||Ri(r,this.options),a.order=o.order||0,a.index=i,a.label=""+o.label,a.visible=this.isDatasetVisible(i),a.controller)a.controller.updateIndex(i),a.controller.linkScales();else{const l=bt.getController(r),{datasetElementType:c,dataElementType:d}=U.datasets[r];Object.assign(l,{dataElementType:bt.getElement(d),datasetElementType:c&&bt.getElement(c)}),a.controller=new l(this,i),t.push(a.controller)}}return this._updateMetasets(),t}_resetElements(){H(this.data.datasets,(t,e)=>{this.getDatasetMeta(e).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const e=this.config;e.update();const i=this._options=e.createResolver(e.chartOptionScopes(),this.getContext()),s=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const o=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let a=0;for(let c=0,d=this.data.datasets.length;c<d;c++){const{controller:u}=this.getDatasetMeta(c),h=!s&&o.indexOf(u)===-1;u.buildOrUpdateElements(h),a=Math.max(+u.getMaxOverflow(),a)}a=this._minPadding=i.layout.autoPadding?a:0,this._updateLayout(a),s||H(o,c=>{c.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(uo("z","_idx"));const{_active:r,_lastEvent:l}=this;l?this._eventHandler(l,!0):r.length&&this._updateHoverStyles(r,r,!0),this.render()}_updateScales(){H(this.scales,t=>{et.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,e=new Set(Object.keys(this._listeners)),i=new Set(t.events);(!ks(e,i)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,e=this._getUniformDataChanges()||[];for(const{method:i,start:s,count:o}of e){const a=i==="_removeElements"?-o:o;Zd(t,s,a)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const e=this.data.datasets.length,i=o=>new Set(t.filter(a=>a[0]===o).map((a,r)=>r+","+a.splice(1).join(","))),s=i(0);for(let o=1;o<e;o++)if(!ks(s,i(o)))return;return Array.from(s).map(o=>o.split(",")).map(o=>({method:o[1],start:+o[2],count:+o[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;et.update(this,this.width,this.height,t);const e=this.chartArea,i=e.width<=0||e.height<=0;this._layers=[],H(this.boxes,s=>{i&&s.position==="chartArea"||(s.configure&&s.configure(),this._layers.push(...s._layers()))},this),this._layers.forEach((s,o)=>{s._idx=o}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let e=0,i=this.data.datasets.length;e<i;++e)this.getDatasetMeta(e).controller.configure();for(let e=0,i=this.data.datasets.length;e<i;++e)this._updateDataset(e,Vt(t)?t({datasetIndex:e}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,e){const i=this.getDatasetMeta(t),s={meta:i,index:t,mode:e,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",s)!==!1&&(i.controller._update(e),s.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",s))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(Mt.has(this)?this.attached&&!Mt.running(this)&&Mt.start(this):(this.draw(),ho({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:i,height:s}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,s)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const e=this._layers;for(t=0;t<e.length&&e[t].z<=0;++t)e[t].draw(this.chartArea);for(this._drawDatasets();t<e.length;++t)e[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const e=this._sortedMetasets,i=[];let s,o;for(s=0,o=e.length;s<o;++s){const a=e[s];(!t||a.visible)&&i.push(a)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let e=t.length-1;e>=0;--e)this._drawDataset(t[e]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const e=this.ctx,i={meta:t,index:t.index,cancelable:!0},s=Ua(this,t);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(s&&Bn(e,s),t.controller.draw(),s&&Rn(e),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(t){return Bt(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,e,i,s){const o=Jc.modes[e];return typeof o=="function"?o(this,t,i,s):[]}getDatasetMeta(t){const e=this.data.datasets[t],i=this._metasets;let s=i.filter(o=>o&&o._dataset===e).pop();return s||(s={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e&&e.order||0,index:t,_dataset:e,_parsed:[],_sorted:!1},i.push(s)),s}getContext(){return this.$context||(this.$context=Wt(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const e=this.data.datasets[t];if(!e)return!1;const i=this.getDatasetMeta(t);return typeof i.hidden=="boolean"?!i.hidden:!e.hidden}setDatasetVisibility(t,e){const i=this.getDatasetMeta(t);i.hidden=!e}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,e,i){const s=i?"show":"hide",o=this.getDatasetMeta(t),a=o.controller._resolveAnimations(void 0,s);ze(e)?(o.data[e].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),a.update(o,{visible:i}),this.update(r=>r.datasetIndex===t?s:void 0))}hide(t,e){this._updateVisibility(t,e,!1)}show(t,e){this._updateVisibility(t,e,!0)}_destroyDatasetMeta(t){const e=this._metasets[t];e&&e.controller&&e.controller._destroy(),delete this._metasets[t]}_stop(){let t,e;for(this.stop(),Mt.remove(this),t=0,e=this.data.datasets.length;t<e;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:e}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),Ts(t,e),this.platform.releaseContext(e),this.canvas=null,this.ctx=null),delete gn[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,e=this.platform,i=(o,a)=>{e.addEventListener(this,o,a),t[o]=a},s=(o,a,r)=>{o.offsetX=a,o.offsetY=r,this._eventHandler(o)};H(this.options.events,o=>i(o,s))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,e=this.platform,i=(l,c)=>{e.addEventListener(this,l,c),t[l]=c},s=(l,c)=>{t[l]&&(e.removeEventListener(this,l,c),delete t[l])},o=(l,c)=>{this.canvas&&this.resize(l,c)};let a;const r=()=>{s("attach",r),this.attached=!0,this.resize(),i("resize",o),i("detach",a)};a=()=>{this.attached=!1,s("resize",o),this._stop(),this._resize(0,0),i("attach",r)},e.isAttached(this.canvas)?r():a()}unbindEvents(){H(this._listeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._listeners={},H(this._responsiveListeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,e,i){const s=i?"set":"remove";let o,a,r,l;for(e==="dataset"&&(o=this.getDatasetMeta(t[0].datasetIndex),o.controller["_"+s+"DatasetHoverStyle"]()),r=0,l=t.length;r<l;++r){a=t[r];const c=a&&this.getDatasetMeta(a.datasetIndex).controller;c&&c[s+"HoverStyle"](a.element,a.datasetIndex,a.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const e=this._active||[],i=t.map(({datasetIndex:o,index:a})=>{const r=this.getDatasetMeta(o);if(!r)throw new Error("No dataset found at index "+o);return{datasetIndex:o,element:r.data[a],index:a}});!_n(i,e)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,e))}notifyPlugins(t,e,i){return this._plugins.notify(this,t,e,i)}isPluginEnabled(t){return this._plugins._cache.filter(e=>e.plugin.id===t).length===1}_updateHoverStyles(t,e,i){const s=this.options.hover,o=(l,c)=>l.filter(d=>!c.some(u=>d.datasetIndex===u.datasetIndex&&d.index===u.index)),a=o(e,t),r=i?t:o(t,e);a.length&&this.updateHoverStyle(a,s.mode,!1),r.length&&s.mode&&this.updateHoverStyle(r,s.mode,!0)}_eventHandler(t,e){const i={event:t,replay:e,cancelable:!0,inChartArea:this.isPointInArea(t)},s=a=>(a.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",i,s)===!1)return;const o=this._handleEvent(t,e,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,s),(o||i.changed)&&this.render(),this}_handleEvent(t,e,i){const{_active:s=[],options:o}=this,a=e,r=this._getActiveElements(t,s,i,a),l=rl(t),c=tu(t,this._lastEvent,i,l);i&&(this._lastEvent=null,V(o.onHover,[t,r,this],this),l&&V(o.onClick,[t,r,this],this));const d=!_n(r,s);return(d||e)&&(this._active=r,this._updateHoverStyles(r,s,e)),this._lastEvent=c,d}_getActiveElements(t,e,i,s){if(t.type==="mouseout")return[];if(!i)return e;const o=this.options.hover;return this.getElementsAtEventForMode(t,o.mode,o,s)}}L(Pt,"defaults",U),L(Pt,"instances",gn),L(Pt,"overrides",ee),L(Pt,"registry",bt),L(Pt,"version",Xd),L(Pt,"getChart",fo);function mo(){return H(Pt.instances,n=>n._plugins.invalidate())}function eu(n,t,e){const{startAngle:i,x:s,y:o,outerRadius:a,innerRadius:r,options:l}=t,{borderWidth:c,borderJoinStyle:d}=l,u=Math.min(c/a,tt(i-e));if(n.beginPath(),n.arc(s,o,a-c/2,i+u/2,e-u/2),r>0){const h=Math.min(c/r,tt(i-e));n.arc(s,o,r+c/2,e-h/2,i+h/2,!0)}else{const h=Math.min(c/2,a*tt(i-e));if(d==="round")n.arc(s,o,h,e-F/2,i+F/2,!0);else if(d==="bevel"){const f=2*h*h,m=-f*Math.cos(e+F/2)+s,p=-f*Math.sin(e+F/2)+o,g=f*Math.cos(i+F/2)+s,b=f*Math.sin(i+F/2)+o;n.lineTo(m,p),n.lineTo(g,b)}}n.closePath(),n.moveTo(0,0),n.rect(0,0,n.canvas.width,n.canvas.height),n.clip("evenodd")}function nu(n,t,e){const{startAngle:i,pixelMargin:s,x:o,y:a,outerRadius:r,innerRadius:l}=t;let c=s/r;n.beginPath(),n.arc(o,a,r,i-c,e+c),l>s?(c=s/l,n.arc(o,a,l,e+c,i-c,!0)):n.arc(o,a,s,e+K,i-K),n.closePath(),n.clip()}function iu(n){return ss(n,["outerStart","outerEnd","innerStart","innerEnd"])}function su(n,t,e,i){const s=iu(n.options.borderRadius),o=(e-t)/2,a=Math.min(o,i*t/2),r=l=>{const c=(e-Math.min(o,l))*i/2;return Q(l,0,Math.min(o,c))};return{outerStart:r(s.outerStart),outerEnd:r(s.outerEnd),innerStart:Q(s.innerStart,0,a),innerEnd:Q(s.innerEnd,0,a)}}function ce(n,t,e,i){return{x:e+n*Math.cos(t),y:i+n*Math.sin(t)}}function Mn(n,t,e,i,s,o){const{x:a,y:r,startAngle:l,pixelMargin:c,innerRadius:d}=t,u=Math.max(t.outerRadius+i+e-c,0),h=d>0?d+i+e+c:0;let f=0;const m=s-l;if(i){const $=d>0?d-i:0,j=u>0?u-i:0,G=($+j)/2,it=G!==0?m*G/(G+i):m;f=(m-it)/2}const p=Math.max(.001,m*u-e/F)/u,g=(m-p)/2,b=l+g+f,y=s-g-f,{outerStart:v,outerEnd:x,innerStart:k,innerEnd:w}=su(t,h,u,y-b),E=u-v,S=u-x,C=b+v/E,I=y-x/S,A=h+k,P=h+w,B=b+k/A,D=y-w/P;if(n.beginPath(),o){const $=(C+I)/2;if(n.arc(a,r,u,C,$),n.arc(a,r,u,$,I),x>0){const J=ce(S,I,a,r);n.arc(J.x,J.y,x,I,y+K)}const j=ce(P,y,a,r);if(n.lineTo(j.x,j.y),w>0){const J=ce(P,D,a,r);n.arc(J.x,J.y,w,y+K,D+Math.PI)}const G=(y-w/h+(b+k/h))/2;if(n.arc(a,r,h,y-w/h,G,!0),n.arc(a,r,h,G,b+k/h,!0),k>0){const J=ce(A,B,a,r);n.arc(J.x,J.y,k,B+Math.PI,b-K)}const it=ce(E,b,a,r);if(n.lineTo(it.x,it.y),v>0){const J=ce(E,C,a,r);n.arc(J.x,J.y,v,b-K,C)}}else{n.moveTo(a,r);const $=Math.cos(C)*u+a,j=Math.sin(C)*u+r;n.lineTo($,j);const G=Math.cos(I)*u+a,it=Math.sin(I)*u+r;n.lineTo(G,it)}n.closePath()}function ou(n,t,e,i,s){const{fullCircles:o,startAngle:a,circumference:r}=t;let l=t.endAngle;if(o){Mn(n,t,e,i,l,s);for(let c=0;c<o;++c)n.fill();isNaN(r)||(l=a+(r%q||q))}return Mn(n,t,e,i,l,s),n.fill(),l}function au(n,t,e,i,s){const{fullCircles:o,startAngle:a,circumference:r,options:l}=t,{borderWidth:c,borderJoinStyle:d,borderDash:u,borderDashOffset:h,borderRadius:f}=l,m=l.borderAlign==="inner";if(!c)return;n.setLineDash(u||[]),n.lineDashOffset=h,m?(n.lineWidth=c*2,n.lineJoin=d||"round"):(n.lineWidth=c,n.lineJoin=d||"bevel");let p=t.endAngle;if(o){Mn(n,t,e,i,p,s);for(let g=0;g<o;++g)n.stroke();isNaN(r)||(p=a+(r%q||q))}m&&nu(n,t,p),l.selfJoin&&p-a>=F&&f===0&&d!=="miter"&&eu(n,t,p),o||(Mn(n,t,e,i,p,s),n.stroke())}class Ce extends ht{constructor(e){super();L(this,"circumference");L(this,"endAngle");L(this,"fullCircles");L(this,"innerRadius");L(this,"outerRadius");L(this,"pixelMargin");L(this,"startAngle");this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,e&&Object.assign(this,e)}inRange(e,i,s){const o=this.getProps(["x","y"],s),{angle:a,distance:r}=Sa(o,{x:e,y:i}),{startAngle:l,endAngle:c,innerRadius:d,outerRadius:u,circumference:h}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],s),f=(this.options.spacing+this.options.borderWidth)/2,m=O(h,c-l),p=Ne(a,l,c)&&l!==c,g=m>=q||p,b=Lt(r,d+f,u+f);return g&&b}getCenterPoint(e){const{x:i,y:s,startAngle:o,endAngle:a,innerRadius:r,outerRadius:l}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],e),{offset:c,spacing:d}=this.options,u=(o+a)/2,h=(r+l+d+c)/2;return{x:i+Math.cos(u)*h,y:s+Math.sin(u)*h}}tooltipPosition(e){return this.getCenterPoint(e)}draw(e){const{options:i,circumference:s}=this,o=(i.offset||0)/4,a=(i.spacing||0)/2,r=i.circular;if(this.pixelMargin=i.borderAlign==="inner"?.33:0,this.fullCircles=s>q?Math.floor(s/q):0,s===0||this.innerRadius<0||this.outerRadius<0)return;e.save();const l=(this.startAngle+this.endAngle)/2;e.translate(Math.cos(l)*o,Math.sin(l)*o);const c=1-Math.sin(Math.min(F,s||0)),d=o*c;e.fillStyle=i.backgroundColor,e.strokeStyle=i.borderColor,ou(e,this,d,a,r),au(e,this,d,a,r),e.restore()}}L(Ce,"id","arc"),L(Ce,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1}),L(Ce,"defaultRoutes",{backgroundColor:"backgroundColor"}),L(Ce,"descriptors",{_scriptable:!0,_indexable:e=>e!=="borderDash"});function or(n,t,e=t){n.lineCap=O(e.borderCapStyle,t.borderCapStyle),n.setLineDash(O(e.borderDash,t.borderDash)),n.lineDashOffset=O(e.borderDashOffset,t.borderDashOffset),n.lineJoin=O(e.borderJoinStyle,t.borderJoinStyle),n.lineWidth=O(e.borderWidth,t.borderWidth),n.strokeStyle=O(e.borderColor,t.borderColor)}function ru(n,t,e){n.lineTo(e.x,e.y)}function lu(n){return n.stepped?Pl:n.tension||n.cubicInterpolationMode==="monotone"?Ll:ru}function ar(n,t,e={}){const i=n.length,{start:s=0,end:o=i-1}=e,{start:a,end:r}=t,l=Math.max(s,a),c=Math.min(o,r),d=s<a&&o<a||s>r&&o>r;return{count:i,start:l,loop:t.loop,ilen:c<l&&!d?i+c-l:c-l}}function cu(n,t,e,i){const{points:s,options:o}=t,{count:a,start:r,loop:l,ilen:c}=ar(s,e,i),d=lu(o);let{move:u=!0,reverse:h}=i||{},f,m,p;for(f=0;f<=c;++f)m=s[(r+(h?c-f:f))%a],!m.skip&&(u?(n.moveTo(m.x,m.y),u=!1):d(n,p,m,h,o.stepped),p=m);return l&&(m=s[(r+(h?c:0))%a],d(n,p,m,h,o.stepped)),!!l}function du(n,t,e,i){const s=t.points,{count:o,start:a,ilen:r}=ar(s,e,i),{move:l=!0,reverse:c}=i||{};let d=0,u=0,h,f,m,p,g,b;const y=x=>(a+(c?r-x:x))%o,v=()=>{p!==g&&(n.lineTo(d,g),n.lineTo(d,p),n.lineTo(d,b))};for(l&&(f=s[y(0)],n.moveTo(f.x,f.y)),h=0;h<=r;++h){if(f=s[y(h)],f.skip)continue;const x=f.x,k=f.y,w=x|0;w===m?(k<p?p=k:k>g&&(g=k),d=(u*d+x)/++u):(v(),n.lineTo(x,k),m=w,u=0,p=g=k),b=k}v()}function Oi(n){const t=n.options,e=t.borderDash&&t.borderDash.length;return!n._decimated&&!n._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!e?du:cu}function uu(n){return n.stepped?cc:n.tension||n.cubicInterpolationMode==="monotone"?dc:Jt}function hu(n,t,e,i){let s=t._path;s||(s=t._path=new Path2D,t.path(s,e,i)&&s.closePath()),or(n,t.options),n.stroke(s)}function fu(n,t,e,i){const{segments:s,options:o}=t,a=Oi(t);for(const r of s)or(n,o,r.style),n.beginPath(),a(n,t,r,{start:e,end:e+i-1})&&n.closePath(),n.stroke()}const mu=typeof Path2D=="function";function pu(n,t,e,i){mu&&!t.options.segment?hu(n,t,e,i):fu(n,t,e,i)}class Nt extends ht{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,e){const i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){const s=i.spanGaps?this._loop:this._fullLoop;ec(this._points,i,t,s,e),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=gc(this,this.options.segment))}first(){const t=this.segments,e=this.points;return t.length&&e[t[0].start]}last(){const t=this.segments,e=this.points,i=t.length;return i&&e[t[i-1].end]}interpolate(t,e){const i=this.options,s=t[e],o=this.points,a=Wa(this,{property:e,start:s,end:s});if(!a.length)return;const r=[],l=uu(i);let c,d;for(c=0,d=a.length;c<d;++c){const{start:u,end:h}=a[c],f=o[u],m=o[h];if(f===m){r.push(f);continue}const p=Math.abs((s-f[e])/(m[e]-f[e])),g=l(f,m,p,i.stepped);g[e]=t[e],r.push(g)}return r.length===1?r[0]:r}pathSegment(t,e,i){return Oi(this)(t,this,e,i)}path(t,e,i){const s=this.segments,o=Oi(this);let a=this._loop;e=e||0,i=i||this.points.length-e;for(const r of s)a&=o(t,this,r,{start:e,end:e+i-1});return!!a}draw(t,e,i,s){const o=this.options||{};(this.points||[]).length&&o.borderWidth&&(t.save(),pu(t,this,i,s),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}L(Nt,"id","line"),L(Nt,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),L(Nt,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),L(Nt,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function po(n,t,e,i){const s=n.options,{[e]:o}=n.getProps([e],i);return Math.abs(t-o)<s.radius+s.hitRadius}class bn extends ht{constructor(e){super();L(this,"parsed");L(this,"skip");L(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,e&&Object.assign(this,e)}inRange(e,i,s){const o=this.options,{x:a,y:r}=this.getProps(["x","y"],s);return Math.pow(e-a,2)+Math.pow(i-r,2)<Math.pow(o.hitRadius+o.radius,2)}inXRange(e,i){return po(this,e,"x",i)}inYRange(e,i){return po(this,e,"y",i)}getCenterPoint(e){const{x:i,y:s}=this.getProps(["x","y"],e);return{x:i,y:s}}size(e){e=e||this.options||{};let i=e.radius||0;i=Math.max(i,i&&e.hoverRadius||0);const s=i&&e.borderWidth||0;return(i+s)*2}draw(e,i){const s=this.options;this.skip||s.radius<.1||!Bt(this,i,this.size(s)/2)||(e.strokeStyle=s.borderColor,e.lineWidth=s.borderWidth,e.fillStyle=s.backgroundColor,Ti(e,s,this.x,this.y))}getRange(){const e=this.options||{};return e.radius+e.hitRadius}}L(bn,"id","point"),L(bn,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),L(bn,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function rr(n,t){const{x:e,y:i,base:s,width:o,height:a}=n.getProps(["x","y","base","width","height"],t);let r,l,c,d,u;return n.horizontal?(u=a/2,r=Math.min(e,s),l=Math.max(e,s),c=i-u,d=i+u):(u=o/2,r=e-u,l=e+u,c=Math.min(i,s),d=Math.max(i,s)),{left:r,top:c,right:l,bottom:d}}function Ft(n,t,e,i){return n?0:Q(t,e,i)}function gu(n,t,e){const i=n.options.borderWidth,s=n.borderSkipped,o=Ra(i);return{t:Ft(s.top,o.top,0,e),r:Ft(s.right,o.right,0,t),b:Ft(s.bottom,o.bottom,0,e),l:Ft(s.left,o.left,0,t)}}function bu(n,t,e){const{enableBorderRadius:i}=n.getProps(["enableBorderRadius"]),s=n.options.borderRadius,o=Zt(s),a=Math.min(t,e),r=n.borderSkipped,l=i||N(s);return{topLeft:Ft(!l||r.top||r.left,o.topLeft,0,a),topRight:Ft(!l||r.top||r.right,o.topRight,0,a),bottomLeft:Ft(!l||r.bottom||r.left,o.bottomLeft,0,a),bottomRight:Ft(!l||r.bottom||r.right,o.bottomRight,0,a)}}function yu(n){const t=rr(n),e=t.right-t.left,i=t.bottom-t.top,s=gu(n,e/2,i/2),o=bu(n,e/2,i/2);return{outer:{x:t.left,y:t.top,w:e,h:i,radius:o},inner:{x:t.left+s.l,y:t.top+s.t,w:e-s.l-s.r,h:i-s.t-s.b,radius:{topLeft:Math.max(0,o.topLeft-Math.max(s.t,s.l)),topRight:Math.max(0,o.topRight-Math.max(s.t,s.r)),bottomLeft:Math.max(0,o.bottomLeft-Math.max(s.b,s.l)),bottomRight:Math.max(0,o.bottomRight-Math.max(s.b,s.r))}}}}function ti(n,t,e,i){const s=t===null,o=e===null,r=n&&!(s&&o)&&rr(n,i);return r&&(s||Lt(t,r.left,r.right))&&(o||Lt(e,r.top,r.bottom))}function vu(n){return n.topLeft||n.topRight||n.bottomLeft||n.bottomRight}function xu(n,t){n.rect(t.x,t.y,t.w,t.h)}function ei(n,t,e={}){const i=n.x!==e.x?-t:0,s=n.y!==e.y?-t:0,o=(n.x+n.w!==e.x+e.w?t:0)-i,a=(n.y+n.h!==e.y+e.h?t:0)-s;return{x:n.x+i,y:n.y+s,w:n.w+o,h:n.h+a,radius:n.radius}}class yn extends ht{constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:e,options:{borderColor:i,backgroundColor:s}}=this,{inner:o,outer:a}=yu(this),r=vu(a.radius)?Fe:xu;t.save(),(a.w!==o.w||a.h!==o.h)&&(t.beginPath(),r(t,ei(a,e,o)),t.clip(),r(t,ei(o,-e,a)),t.fillStyle=i,t.fill("evenodd")),t.beginPath(),r(t,ei(o,e)),t.fillStyle=s,t.fill(),t.restore()}inRange(t,e,i){return ti(this,t,e,i)}inXRange(t,e){return ti(this,t,null,e)}inYRange(t,e){return ti(this,null,t,e)}getCenterPoint(t){const{x:e,y:i,base:s,horizontal:o}=this.getProps(["x","y","base","horizontal"],t);return{x:o?(e+s)/2:e,y:o?i:(i+s)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}L(yn,"id","bar"),L(yn,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),L(yn,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});var _u=Object.freeze({__proto__:null,ArcElement:Ce,BarElement:yn,LineElement:Nt,PointElement:bn});const $i=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],go=$i.map(n=>n.replace("rgb(","rgba(").replace(")",", 0.5)"));function lr(n){return $i[n%$i.length]}function cr(n){return go[n%go.length]}function wu(n,t){return n.borderColor=lr(t),n.backgroundColor=cr(t),++t}function ku(n,t){return n.backgroundColor=n.data.map(()=>lr(t++)),t}function Eu(n,t){return n.backgroundColor=n.data.map(()=>cr(t++)),t}function Su(n){let t=0;return(e,i)=>{const s=n.getDatasetMeta(i).controller;s instanceof Qt?t=ku(e,t):s instanceof Re?t=Eu(e,t):s&&(t=wu(e,t))}}function bo(n){let t;for(t in n)if(n[t].borderColor||n[t].backgroundColor)return!0;return!1}function Cu(n){return n&&(n.borderColor||n.backgroundColor)}function Mu(){return U.borderColor!=="rgba(0,0,0,0.1)"||U.backgroundColor!=="rgba(0,0,0,0.1)"}var Au={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(n,t,e){if(!e.enabled)return;const{data:{datasets:i},options:s}=n.config,{elements:o}=s,a=bo(i)||Cu(s)||o&&bo(o)||Mu();if(!e.forceOverride&&a)return;const r=Su(n);i.forEach(r)}};function Iu(n,t,e,i,s){const o=s.samples||i;if(o>=e)return n.slice(t,t+e);const a=[],r=(e-2)/(o-2);let l=0;const c=t+e-1;let d=t,u,h,f,m,p;for(a[l++]=n[d],u=0;u<o-2;u++){let g=0,b=0,y;const v=Math.floor((u+1)*r)+1+t,x=Math.min(Math.floor((u+2)*r)+1,e)+t,k=x-v;for(y=v;y<x;y++)g+=n[y].x,b+=n[y].y;g/=k,b/=k;const w=Math.floor(u*r)+1+t,E=Math.min(Math.floor((u+1)*r)+1,e)+t,{x:S,y:C}=n[d];for(f=m=-1,y=w;y<E;y++)m=.5*Math.abs((S-g)*(n[y].y-C)-(S-n[y].x)*(b-C)),m>f&&(f=m,h=n[y],p=y);a[l++]=h,d=p}return a[l++]=n[c],a}function Pu(n,t,e,i){let s=0,o=0,a,r,l,c,d,u,h,f,m,p;const g=[],b=t+e-1,y=n[t].x,x=n[b].x-y;for(a=t;a<t+e;++a){r=n[a],l=(r.x-y)/x*i,c=r.y;const k=l|0;if(k===d)c<m?(m=c,u=a):c>p&&(p=c,h=a),s=(o*s+r.x)/++o;else{const w=a-1;if(!z(u)&&!z(h)){const E=Math.min(u,h),S=Math.max(u,h);E!==f&&E!==w&&g.push({...n[E],x:s}),S!==f&&S!==w&&g.push({...n[S],x:s})}a>0&&w!==f&&g.push(n[w]),g.push(r),d=k,o=0,m=p=c,u=h=f=a}}return g}function dr(n){if(n._decimated){const t=n._data;delete n._decimated,delete n._data,Object.defineProperty(n,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function yo(n){n.data.datasets.forEach(t=>{dr(t)})}function Lu(n,t){const e=t.length;let i=0,s;const{iScale:o}=n,{min:a,max:r,minDefined:l,maxDefined:c}=o.getUserBounds();return l&&(i=Q(Tt(t,o.axis,a).lo,0,e-1)),c?s=Q(Tt(t,o.axis,r).hi+1,i,e)-i:s=e-i,{start:i,count:s}}var Tu={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(n,t,e)=>{if(!e.enabled){yo(n);return}const i=n.width;n.data.datasets.forEach((s,o)=>{const{_data:a,indexAxis:r}=s,l=n.getDatasetMeta(o),c=a||s.data;if(Ee([r,n.options.indexAxis])==="y"||!l.controller.supportsDecimation)return;const d=n.scales[l.xAxisID];if(d.type!=="linear"&&d.type!=="time"||n.options.parsing)return;let{start:u,count:h}=Lu(l,c);const f=e.threshold||4*i;if(h<=f){dr(s);return}z(a)&&(s._data=c,delete s.data,Object.defineProperty(s,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(p){this._data=p}}));let m;switch(e.algorithm){case"lttb":m=Iu(c,u,h,i,e);break;case"min-max":m=Pu(c,u,h,i);break;default:throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`)}s._decimated=m})},destroy(n){yo(n)}};function Bu(n,t,e){const i=n.segments,s=n.points,o=t.points,a=[];for(const r of i){let{start:l,end:c}=r;c=$n(l,c,s);const d=zi(e,s[l],s[c],r.loop);if(!t.segments){a.push({source:r,target:d,start:s[l],end:s[c]});continue}const u=Wa(t,d);for(const h of u){const f=zi(e,o[h.start],o[h.end],h.loop),m=qa(r,s,f);for(const p of m)a.push({source:p,target:h,start:{[e]:vo(d,f,"start",Math.max)},end:{[e]:vo(d,f,"end",Math.min)}})}}return a}function zi(n,t,e,i){if(i)return;let s=t[n],o=e[n];return n==="angle"&&(s=tt(s),o=tt(o)),{property:n,start:s,end:o}}function Ru(n,t){const{x:e=null,y:i=null}=n||{},s=t.points,o=[];return t.segments.forEach(({start:a,end:r})=>{r=$n(a,r,s);const l=s[a],c=s[r];i!==null?(o.push({x:l.x,y:i}),o.push({x:c.x,y:i})):e!==null&&(o.push({x:e,y:l.y}),o.push({x:e,y:c.y}))}),o}function $n(n,t,e){for(;t>n;t--){const i=e[t];if(!isNaN(i.x)&&!isNaN(i.y))break}return t}function vo(n,t,e,i){return n&&t?i(n[e],t[e]):n?n[e]:t?t[e]:0}function ur(n,t){let e=[],i=!1;return W(n)?(i=!0,e=n):e=Ru(n,t),e.length?new Nt({points:e,options:{tension:0},_loop:i,_fullLoop:i}):null}function xo(n){return n&&n.fill!==!1}function Du(n,t,e){let s=n[t].fill;const o=[t];let a;if(!e)return s;for(;s!==!1&&o.indexOf(s)===-1;){if(!Y(s))return s;if(a=n[s],!a)return!1;if(a.visible)return s;o.push(s),s=a.fill}return!1}function Ou(n,t,e){const i=Fu(n);if(N(i))return isNaN(i.value)?!1:i;let s=parseFloat(i);return Y(s)&&Math.floor(s)===s?$u(i[0],t,s,e):["origin","start","end","stack","shape"].indexOf(i)>=0&&i}function $u(n,t,e,i){return(n==="-"||n==="+")&&(e=t+e),e===t||e<0||e>=i?!1:e}function zu(n,t){let e=null;return n==="start"?e=t.bottom:n==="end"?e=t.top:N(n)?e=t.getPixelForValue(n.value):t.getBasePixel&&(e=t.getBasePixel()),e}function Nu(n,t,e){let i;return n==="start"?i=e:n==="end"?i=t.options.reverse?t.min:t.max:N(n)?i=n.value:i=t.getBaseValue(),i}function Fu(n){const t=n.options,e=t.fill;let i=O(e&&e.target,e);return i===void 0&&(i=!!t.backgroundColor),i===!1||i===null?!1:i===!0?"origin":i}function ju(n){const{scale:t,index:e,line:i}=n,s=[],o=i.segments,a=i.points,r=Hu(t,e);r.push(ur({x:null,y:t.bottom},i));for(let l=0;l<o.length;l++){const c=o[l];for(let d=c.start;d<=c.end;d++)Vu(s,a[d],r)}return new Nt({points:s,options:{}})}function Hu(n,t){const e=[],i=n.getMatchingVisibleMetas("line");for(let s=0;s<i.length;s++){const o=i[s];if(o.index===t)break;o.hidden||e.unshift(o.dataset)}return e}function Vu(n,t,e){const i=[];for(let s=0;s<e.length;s++){const o=e[s],{first:a,last:r,point:l}=qu(o,t,"x");if(!(!l||a&&r)){if(a)i.unshift(l);else if(n.push(l),!r)break}}n.push(...i)}function qu(n,t,e){const i=n.interpolate(t,e);if(!i)return{};const s=i[e],o=n.segments,a=n.points;let r=!1,l=!1;for(let c=0;c<o.length;c++){const d=o[c],u=a[d.start][e],h=a[d.end][e];if(Lt(s,u,h)){r=s===u,l=s===h;break}}return{first:r,last:l,point:i}}class hr{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,e,i){const{x:s,y:o,radius:a}=this;return e=e||{start:0,end:q},t.arc(s,o,a,e.end,e.start,!0),!i.bounds}interpolate(t){const{x:e,y:i,radius:s}=this,o=t.angle;return{x:e+Math.cos(o)*s,y:i+Math.sin(o)*s,angle:o}}}function Wu(n){const{chart:t,fill:e,line:i}=n;if(Y(e))return Uu(t,e);if(e==="stack")return ju(n);if(e==="shape")return!0;const s=Gu(n);return s instanceof hr?s:ur(s,i)}function Uu(n,t){const e=n.getDatasetMeta(t);return e&&n.isDatasetVisible(t)?e.dataset:null}function Gu(n){return(n.scale||{}).getPointPositionForValue?Ku(n):Yu(n)}function Yu(n){const{scale:t={},fill:e}=n,i=zu(e,t);if(Y(i)){const s=t.isHorizontal();return{x:s?i:null,y:s?null:i}}return null}function Ku(n){const{scale:t,fill:e}=n,i=t.options,s=t.getLabels().length,o=i.reverse?t.max:t.min,a=Nu(e,t,o),r=[];if(i.grid.circular){const l=t.getPointPositionForValue(0,o);return new hr({x:l.x,y:l.y,radius:t.getDistanceFromCenterForValue(a)})}for(let l=0;l<s;++l)r.push(t.getPointPositionForValue(l,a));return r}function ni(n,t,e){const i=Wu(t),{chart:s,index:o,line:a,scale:r,axis:l}=t,c=a.options,d=c.fill,u=c.backgroundColor,{above:h=u,below:f=u}=d||{},m=s.getDatasetMeta(o),p=Ua(s,m);i&&a.points.length&&(Bn(n,e),Xu(n,{line:a,target:i,above:h,below:f,area:e,scale:r,axis:l,clip:p}),Rn(n))}function Xu(n,t){const{line:e,target:i,above:s,below:o,area:a,scale:r,clip:l}=t,c=e._loop?"angle":t.axis;n.save();let d=o;o!==s&&(c==="x"?(_o(n,i,a.top),ii(n,{line:e,target:i,color:s,scale:r,property:c,clip:l}),n.restore(),n.save(),_o(n,i,a.bottom)):c==="y"&&(wo(n,i,a.left),ii(n,{line:e,target:i,color:o,scale:r,property:c,clip:l}),n.restore(),n.save(),wo(n,i,a.right),d=s)),ii(n,{line:e,target:i,color:d,scale:r,property:c,clip:l}),n.restore()}function _o(n,t,e){const{segments:i,points:s}=t;let o=!0,a=!1;n.beginPath();for(const r of i){const{start:l,end:c}=r,d=s[l],u=s[$n(l,c,s)];o?(n.moveTo(d.x,d.y),o=!1):(n.lineTo(d.x,e),n.lineTo(d.x,d.y)),a=!!t.pathSegment(n,r,{move:a}),a?n.closePath():n.lineTo(u.x,e)}n.lineTo(t.first().x,e),n.closePath(),n.clip()}function wo(n,t,e){const{segments:i,points:s}=t;let o=!0,a=!1;n.beginPath();for(const r of i){const{start:l,end:c}=r,d=s[l],u=s[$n(l,c,s)];o?(n.moveTo(d.x,d.y),o=!1):(n.lineTo(e,d.y),n.lineTo(d.x,d.y)),a=!!t.pathSegment(n,r,{move:a}),a?n.closePath():n.lineTo(e,u.y)}n.lineTo(e,t.first().y),n.closePath(),n.clip()}function ii(n,t){const{line:e,target:i,property:s,color:o,scale:a,clip:r}=t,l=Bu(e,i,s);for(const{source:c,target:d,start:u,end:h}of l){const{style:{backgroundColor:f=o}={}}=c,m=i!==!0;n.save(),n.fillStyle=f,Ju(n,a,r,m&&zi(s,u,h)),n.beginPath();const p=!!e.pathSegment(n,c);let g;if(m){p?n.closePath():ko(n,i,h,s);const b=!!i.pathSegment(n,d,{move:p,reverse:!0});g=p&&b,g||ko(n,i,u,s)}n.closePath(),n.fill(g?"evenodd":"nonzero"),n.restore()}}function Ju(n,t,e,i){const s=t.chart.chartArea,{property:o,start:a,end:r}=i||{};if(o==="x"||o==="y"){let l,c,d,u;o==="x"?(l=a,c=s.top,d=r,u=s.bottom):(l=s.left,c=a,d=s.right,u=r),n.beginPath(),e&&(l=Math.max(l,e.left),d=Math.min(d,e.right),c=Math.max(c,e.top),u=Math.min(u,e.bottom)),n.rect(l,c,d-l,u-c),n.clip()}}function ko(n,t,e,i){const s=t.interpolate(e,i);s&&n.lineTo(s.x,s.y)}var Qu={id:"filler",afterDatasetsUpdate(n,t,e){const i=(n.data.datasets||[]).length,s=[];let o,a,r,l;for(a=0;a<i;++a)o=n.getDatasetMeta(a),r=o.dataset,l=null,r&&r.options&&r instanceof Nt&&(l={visible:n.isDatasetVisible(a),index:a,fill:Ou(r,a,i),chart:n,axis:o.controller.options.indexAxis,scale:o.vScale,line:r}),o.$filler=l,s.push(l);for(a=0;a<i;++a)l=s[a],!(!l||l.fill===!1)&&(l.fill=Du(s,a,e.propagate))},beforeDraw(n,t,e){const i=e.drawTime==="beforeDraw",s=n.getSortedVisibleDatasetMetas(),o=n.chartArea;for(let a=s.length-1;a>=0;--a){const r=s[a].$filler;r&&(r.line.updateControlPoints(o,r.axis),i&&r.fill&&ni(n.ctx,r,o))}},beforeDatasetsDraw(n,t,e){if(e.drawTime!=="beforeDatasetsDraw")return;const i=n.getSortedVisibleDatasetMetas();for(let s=i.length-1;s>=0;--s){const o=i[s].$filler;xo(o)&&ni(n.ctx,o,n.chartArea)}},beforeDatasetDraw(n,t,e){const i=t.meta.$filler;!xo(i)||e.drawTime!=="beforeDatasetDraw"||ni(n.ctx,i,n.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const Eo=(n,t)=>{let{boxHeight:e=t,boxWidth:i=t}=n;return n.usePointStyle&&(e=Math.min(e,t),i=n.pointStyleWidth||Math.min(i,t)),{boxWidth:i,boxHeight:e,itemHeight:Math.max(t,e)}},Zu=(n,t)=>n!==null&&t!==null&&n.datasetIndex===t.datasetIndex&&n.index===t.index;class So extends ht{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e,i){this.maxWidth=t,this.maxHeight=e,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let e=V(t.generateLabels,[this.chart],this)||[];t.filter&&(e=e.filter(i=>t.filter(i,this.chart.data))),t.sort&&(e=e.sort((i,s)=>t.sort(i,s,this.chart.data))),this.options.reverse&&e.reverse(),this.legendItems=e}fit(){const{options:t,ctx:e}=this;if(!t.display){this.width=this.height=0;return}const i=t.labels,s=X(i.font),o=s.size,a=this._computeTitleHeight(),{boxWidth:r,itemHeight:l}=Eo(i,o);let c,d;e.font=s.string,this.isHorizontal()?(c=this.maxWidth,d=this._fitRows(a,o,r,l)+10):(d=this.maxHeight,c=this._fitCols(a,s,r,l)+10),this.width=Math.min(c,t.maxWidth||this.maxWidth),this.height=Math.min(d,t.maxHeight||this.maxHeight)}_fitRows(t,e,i,s){const{ctx:o,maxWidth:a,options:{labels:{padding:r}}}=this,l=this.legendHitBoxes=[],c=this.lineWidths=[0],d=s+r;let u=t;o.textAlign="left",o.textBaseline="middle";let h=-1,f=-d;return this.legendItems.forEach((m,p)=>{const g=i+e/2+o.measureText(m.text).width;(p===0||c[c.length-1]+g+2*r>a)&&(u+=d,c[c.length-(p>0?0:1)]=0,f+=d,h++),l[p]={left:0,top:f,row:h,width:g,height:s},c[c.length-1]+=g+r}),u}_fitCols(t,e,i,s){const{ctx:o,maxHeight:a,options:{labels:{padding:r}}}=this,l=this.legendHitBoxes=[],c=this.columnSizes=[],d=a-t;let u=r,h=0,f=0,m=0,p=0;return this.legendItems.forEach((g,b)=>{const{itemWidth:y,itemHeight:v}=th(i,e,o,g,s);b>0&&f+v+2*r>d&&(u+=h+r,c.push({width:h,height:f}),m+=h+r,p++,h=f=0),l[b]={left:m,top:f,col:p,width:y,height:v},h=Math.max(h,y),f+=v+r}),u+=h,c.push({width:h,height:f}),u}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:e,options:{align:i,labels:{padding:s},rtl:o}}=this,a=ue(o,this.left,this.width);if(this.isHorizontal()){let r=0,l=Z(i,this.left+s,this.right-this.lineWidths[r]);for(const c of e)r!==c.row&&(r=c.row,l=Z(i,this.left+s,this.right-this.lineWidths[r])),c.top+=this.top+t+s,c.left=a.leftForLtr(a.x(l),c.width),l+=c.width+s}else{let r=0,l=Z(i,this.top+t+s,this.bottom-this.columnSizes[r].height);for(const c of e)c.col!==r&&(r=c.col,l=Z(i,this.top+t+s,this.bottom-this.columnSizes[r].height)),c.top=l,c.left+=this.left+s,c.left=a.leftForLtr(a.x(c.left),c.width),l+=c.height+s}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Bn(t,this),this._draw(),Rn(t)}}_draw(){const{options:t,columnSizes:e,lineWidths:i,ctx:s}=this,{align:o,labels:a}=t,r=U.color,l=ue(t.rtl,this.left,this.width),c=X(a.font),{padding:d}=a,u=c.size,h=u/2;let f;this.drawTitle(),s.textAlign=l.textAlign("left"),s.textBaseline="middle",s.lineWidth=.5,s.font=c.string;const{boxWidth:m,boxHeight:p,itemHeight:g}=Eo(a,u),b=function(w,E,S){if(isNaN(m)||m<=0||isNaN(p)||p<0)return;s.save();const C=O(S.lineWidth,1);if(s.fillStyle=O(S.fillStyle,r),s.lineCap=O(S.lineCap,"butt"),s.lineDashOffset=O(S.lineDashOffset,0),s.lineJoin=O(S.lineJoin,"miter"),s.lineWidth=C,s.strokeStyle=O(S.strokeStyle,r),s.setLineDash(O(S.lineDash,[])),a.usePointStyle){const I={radius:p*Math.SQRT2/2,pointStyle:S.pointStyle,rotation:S.rotation,borderWidth:C},A=l.xPlus(w,m/2),P=E+h;Ba(s,I,A,P,a.pointStyleWidth&&m)}else{const I=E+Math.max((u-p)/2,0),A=l.leftForLtr(w,m),P=Zt(S.borderRadius);s.beginPath(),Object.values(P).some(B=>B!==0)?Fe(s,{x:A,y:I,w:m,h:p,radius:P}):s.rect(A,I,m,p),s.fill(),C!==0&&s.stroke()}s.restore()},y=function(w,E,S){ne(s,S.text,w,E+g/2,c,{strikethrough:S.hidden,textAlign:l.textAlign(S.textAlign)})},v=this.isHorizontal(),x=this._computeTitleHeight();v?f={x:Z(o,this.left+d,this.right-i[0]),y:this.top+d+x,line:0}:f={x:this.left+d,y:Z(o,this.top+x+d,this.bottom-e[0].height),line:0},ja(this.ctx,t.textDirection);const k=g+d;this.legendItems.forEach((w,E)=>{s.strokeStyle=w.fontColor,s.fillStyle=w.fontColor;const S=s.measureText(w.text).width,C=l.textAlign(w.textAlign||(w.textAlign=a.textAlign)),I=m+h+S;let A=f.x,P=f.y;l.setWidth(this.width),v?E>0&&A+I+d>this.right&&(P=f.y+=k,f.line++,A=f.x=Z(o,this.left+d,this.right-i[f.line])):E>0&&P+k>this.bottom&&(A=f.x=A+e[f.line].width+d,f.line++,P=f.y=Z(o,this.top+x+d,this.bottom-e[f.line].height));const B=l.x(A);if(b(B,P,w),A=vl(C,A+m+h,v?A+I:this.right,t.rtl),y(l.x(A),P,w),v)f.x+=I+d;else if(typeof w.text!="string"){const D=c.lineHeight;f.y+=fr(w,D)+d}else f.y+=k}),Ha(this.ctx,t.textDirection)}drawTitle(){const t=this.options,e=t.title,i=X(e.font),s=nt(e.padding);if(!e.display)return;const o=ue(t.rtl,this.left,this.width),a=this.ctx,r=e.position,l=i.size/2,c=s.top+l;let d,u=this.left,h=this.width;if(this.isHorizontal())h=Math.max(...this.lineWidths),d=this.top+c,u=Z(t.align,u,this.right-h);else{const m=this.columnSizes.reduce((p,g)=>Math.max(p,g.height),0);d=c+Z(t.align,this.top,this.bottom-m-t.labels.padding-this._computeTitleHeight())}const f=Z(r,u,u+h);a.textAlign=o.textAlign(ns(r)),a.textBaseline="middle",a.strokeStyle=e.color,a.fillStyle=e.color,a.font=i.string,ne(a,e.text,f,d,i)}_computeTitleHeight(){const t=this.options.title,e=X(t.font),i=nt(t.padding);return t.display?e.lineHeight+i.height:0}_getLegendItemAt(t,e){let i,s,o;if(Lt(t,this.left,this.right)&&Lt(e,this.top,this.bottom)){for(o=this.legendHitBoxes,i=0;i<o.length;++i)if(s=o[i],Lt(t,s.left,s.left+s.width)&&Lt(e,s.top,s.top+s.height))return this.legendItems[i]}return null}handleEvent(t){const e=this.options;if(!ih(t.type,e))return;const i=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const s=this._hoveredItem,o=Zu(s,i);s&&!o&&V(e.onLeave,[t,s,this],this),this._hoveredItem=i,i&&!o&&V(e.onHover,[t,i,this],this)}else i&&V(e.onClick,[t,i,this],this)}}function th(n,t,e,i,s){const o=eh(i,n,t,e),a=nh(s,i,t.lineHeight);return{itemWidth:o,itemHeight:a}}function eh(n,t,e,i){let s=n.text;return s&&typeof s!="string"&&(s=s.reduce((o,a)=>o.length>a.length?o:a)),t+e.size/2+i.measureText(s).width}function nh(n,t,e){let i=n;return typeof t.text!="string"&&(i=fr(t,e)),i}function fr(n,t){const e=n.text?n.text.length:0;return t*e}function ih(n,t){return!!((n==="mousemove"||n==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(n==="click"||n==="mouseup"))}var sh={id:"legend",_element:So,start(n,t,e){const i=n.legend=new So({ctx:n.ctx,options:e,chart:n});et.configure(n,i,e),et.addBox(n,i)},stop(n){et.removeBox(n,n.legend),delete n.legend},beforeUpdate(n,t,e){const i=n.legend;et.configure(n,i,e),i.options=e},afterUpdate(n){const t=n.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(n,t){t.replay||n.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(n,t,e){const i=t.datasetIndex,s=e.chart;s.isDatasetVisible(i)?(s.hide(i),t.hidden=!0):(s.show(i),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:n=>n.chart.options.color,boxWidth:40,padding:10,generateLabels(n){const t=n.data.datasets,{labels:{usePointStyle:e,pointStyle:i,textAlign:s,color:o,useBorderRadius:a,borderRadius:r}}=n.legend.options;return n._getSortedDatasetMetas().map(l=>{const c=l.controller.getStyle(e?0:void 0),d=nt(c.borderWidth);return{text:t[l.index].label,fillStyle:c.backgroundColor,fontColor:o,hidden:!l.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(d.width+d.height)/4,strokeStyle:c.borderColor,pointStyle:i||c.pointStyle,rotation:c.rotation,textAlign:s||c.textAlign,borderRadius:a&&(r||c.borderRadius),datasetIndex:l.index}},this)}},title:{color:n=>n.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:n=>!n.startsWith("on"),labels:{_scriptable:n=>!["generateLabels","filter","sort"].includes(n)}}};class us extends ht{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e){const i=this.options;if(this.left=0,this.top=0,!i.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=e;const s=W(i.text)?i.text.length:1;this._padding=nt(i.padding);const o=s*X(i.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=o:this.width=o}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:e,left:i,bottom:s,right:o,options:a}=this,r=a.align;let l=0,c,d,u;return this.isHorizontal()?(d=Z(r,i,o),u=e+t,c=o-i):(a.position==="left"?(d=i+t,u=Z(r,s,e),l=F*-.5):(d=o-t,u=Z(r,e,s),l=F*.5),c=s-e),{titleX:d,titleY:u,maxWidth:c,rotation:l}}draw(){const t=this.ctx,e=this.options;if(!e.display)return;const i=X(e.font),o=i.lineHeight/2+this._padding.top,{titleX:a,titleY:r,maxWidth:l,rotation:c}=this._drawArgs(o);ne(t,e.text,0,0,i,{color:e.color,maxWidth:l,rotation:c,textAlign:ns(e.align),textBaseline:"middle",translation:[a,r]})}}function oh(n,t){const e=new us({ctx:n.ctx,options:t,chart:n});et.configure(n,e,t),et.addBox(n,e),n.titleBlock=e}var ah={id:"title",_element:us,start(n,t,e){oh(n,e)},stop(n){const t=n.titleBlock;et.removeBox(n,t),delete n.titleBlock},beforeUpdate(n,t,e){const i=n.titleBlock;et.configure(n,i,e),i.options=e},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const an=new WeakMap;var rh={id:"subtitle",start(n,t,e){const i=new us({ctx:n.ctx,options:e,chart:n});et.configure(n,i,e),et.addBox(n,i),an.set(n,i)},stop(n){et.removeBox(n,an.get(n)),an.delete(n)},beforeUpdate(n,t,e){const i=an.get(n);et.configure(n,i,e),i.options=e},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Me={average(n){if(!n.length)return!1;let t,e,i=new Set,s=0,o=0;for(t=0,e=n.length;t<e;++t){const r=n[t].element;if(r&&r.hasValue()){const l=r.tooltipPosition();i.add(l.x),s+=l.y,++o}}return o===0||i.size===0?!1:{x:[...i].reduce((r,l)=>r+l)/i.size,y:s/o}},nearest(n,t){if(!n.length)return!1;let e=t.x,i=t.y,s=Number.POSITIVE_INFINITY,o,a,r;for(o=0,a=n.length;o<a;++o){const l=n[o].element;if(l&&l.hasValue()){const c=l.getCenterPoint(),d=Pi(t,c);d<s&&(s=d,r=l)}}if(r){const l=r.tooltipPosition();e=l.x,i=l.y}return{x:e,y:i}}};function gt(n,t){return t&&(W(t)?Array.prototype.push.apply(n,t):n.push(t)),n}function At(n){return(typeof n=="string"||n instanceof String)&&n.indexOf(`
`)>-1?n.split(`
`):n}function lh(n,t){const{element:e,datasetIndex:i,index:s}=t,o=n.getDatasetMeta(i).controller,{label:a,value:r}=o.getLabelAndValue(s);return{chart:n,label:a,parsed:o.getParsed(s),raw:n.data.datasets[i].data[s],formattedValue:r,dataset:o.getDataset(),dataIndex:s,datasetIndex:i,element:e}}function Co(n,t){const e=n.chart.ctx,{body:i,footer:s,title:o}=n,{boxWidth:a,boxHeight:r}=t,l=X(t.bodyFont),c=X(t.titleFont),d=X(t.footerFont),u=o.length,h=s.length,f=i.length,m=nt(t.padding);let p=m.height,g=0,b=i.reduce((x,k)=>x+k.before.length+k.lines.length+k.after.length,0);if(b+=n.beforeBody.length+n.afterBody.length,u&&(p+=u*c.lineHeight+(u-1)*t.titleSpacing+t.titleMarginBottom),b){const x=t.displayColors?Math.max(r,l.lineHeight):l.lineHeight;p+=f*x+(b-f)*l.lineHeight+(b-1)*t.bodySpacing}h&&(p+=t.footerMarginTop+h*d.lineHeight+(h-1)*t.footerSpacing);let y=0;const v=function(x){g=Math.max(g,e.measureText(x).width+y)};return e.save(),e.font=c.string,H(n.title,v),e.font=l.string,H(n.beforeBody.concat(n.afterBody),v),y=t.displayColors?a+2+t.boxPadding:0,H(i,x=>{H(x.before,v),H(x.lines,v),H(x.after,v)}),y=0,e.font=d.string,H(n.footer,v),e.restore(),g+=m.width,{width:g,height:p}}function ch(n,t){const{y:e,height:i}=t;return e<i/2?"top":e>n.height-i/2?"bottom":"center"}function dh(n,t,e,i){const{x:s,width:o}=i,a=e.caretSize+e.caretPadding;if(n==="left"&&s+o+a>t.width||n==="right"&&s-o-a<0)return!0}function uh(n,t,e,i){const{x:s,width:o}=e,{width:a,chartArea:{left:r,right:l}}=n;let c="center";return i==="center"?c=s<=(r+l)/2?"left":"right":s<=o/2?c="left":s>=a-o/2&&(c="right"),dh(c,n,t,e)&&(c="center"),c}function Mo(n,t,e){const i=e.yAlign||t.yAlign||ch(n,e);return{xAlign:e.xAlign||t.xAlign||uh(n,t,e,i),yAlign:i}}function hh(n,t){let{x:e,width:i}=n;return t==="right"?e-=i:t==="center"&&(e-=i/2),e}function fh(n,t,e){let{y:i,height:s}=n;return t==="top"?i+=e:t==="bottom"?i-=s+e:i-=s/2,i}function Ao(n,t,e,i){const{caretSize:s,caretPadding:o,cornerRadius:a}=n,{xAlign:r,yAlign:l}=e,c=s+o,{topLeft:d,topRight:u,bottomLeft:h,bottomRight:f}=Zt(a);let m=hh(t,r);const p=fh(t,l,c);return l==="center"?r==="left"?m+=c:r==="right"&&(m-=c):r==="left"?m-=Math.max(d,h)+s:r==="right"&&(m+=Math.max(u,f)+s),{x:Q(m,0,i.width-t.width),y:Q(p,0,i.height-t.height)}}function rn(n,t,e){const i=nt(e.padding);return t==="center"?n.x+n.width/2:t==="right"?n.x+n.width-i.right:n.x+i.left}function Io(n){return gt([],At(n))}function mh(n,t,e){return Wt(n,{tooltip:t,tooltipItems:e,type:"tooltip"})}function Po(n,t){const e=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return e?n.override(e):n}const mr={beforeTitle:Ct,title(n){if(n.length>0){const t=n[0],e=t.chart.data.labels,i=e?e.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(i>0&&t.dataIndex<i)return e[t.dataIndex]}return""},afterTitle:Ct,beforeBody:Ct,beforeLabel:Ct,label(n){if(this&&this.options&&this.options.mode==="dataset")return n.label+": "+n.formattedValue||n.formattedValue;let t=n.dataset.label||"";t&&(t+=": ");const e=n.formattedValue;return z(e)||(t+=e),t},labelColor(n){const e=n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);return{borderColor:e.borderColor,backgroundColor:e.backgroundColor,borderWidth:e.borderWidth,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(n){const e=n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);return{pointStyle:e.pointStyle,rotation:e.rotation}},afterLabel:Ct,afterBody:Ct,beforeFooter:Ct,footer:Ct,afterFooter:Ct};function st(n,t,e,i){const s=n[t].call(e,i);return typeof s>"u"?mr[t].call(e,i):s}class Ni extends ht{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const e=this.chart,i=this.options.setContext(this.getContext()),s=i.enabled&&e.options.animation&&i.animations,o=new Ga(this.chart,s);return s._cacheable&&(this._cachedAnimations=Object.freeze(o)),o}getContext(){return this.$context||(this.$context=mh(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,e){const{callbacks:i}=e,s=st(i,"beforeTitle",this,t),o=st(i,"title",this,t),a=st(i,"afterTitle",this,t);let r=[];return r=gt(r,At(s)),r=gt(r,At(o)),r=gt(r,At(a)),r}getBeforeBody(t,e){return Io(st(e.callbacks,"beforeBody",this,t))}getBody(t,e){const{callbacks:i}=e,s=[];return H(t,o=>{const a={before:[],lines:[],after:[]},r=Po(i,o);gt(a.before,At(st(r,"beforeLabel",this,o))),gt(a.lines,st(r,"label",this,o)),gt(a.after,At(st(r,"afterLabel",this,o))),s.push(a)}),s}getAfterBody(t,e){return Io(st(e.callbacks,"afterBody",this,t))}getFooter(t,e){const{callbacks:i}=e,s=st(i,"beforeFooter",this,t),o=st(i,"footer",this,t),a=st(i,"afterFooter",this,t);let r=[];return r=gt(r,At(s)),r=gt(r,At(o)),r=gt(r,At(a)),r}_createItems(t){const e=this._active,i=this.chart.data,s=[],o=[],a=[];let r=[],l,c;for(l=0,c=e.length;l<c;++l)r.push(lh(this.chart,e[l]));return t.filter&&(r=r.filter((d,u,h)=>t.filter(d,u,h,i))),t.itemSort&&(r=r.sort((d,u)=>t.itemSort(d,u,i))),H(r,d=>{const u=Po(t.callbacks,d);s.push(st(u,"labelColor",this,d)),o.push(st(u,"labelPointStyle",this,d)),a.push(st(u,"labelTextColor",this,d))}),this.labelColors=s,this.labelPointStyles=o,this.labelTextColors=a,this.dataPoints=r,r}update(t,e){const i=this.options.setContext(this.getContext()),s=this._active;let o,a=[];if(!s.length)this.opacity!==0&&(o={opacity:0});else{const r=Me[i.position].call(this,s,this._eventPosition);a=this._createItems(i),this.title=this.getTitle(a,i),this.beforeBody=this.getBeforeBody(a,i),this.body=this.getBody(a,i),this.afterBody=this.getAfterBody(a,i),this.footer=this.getFooter(a,i);const l=this._size=Co(this,i),c=Object.assign({},r,l),d=Mo(this.chart,i,c),u=Ao(i,c,d,this.chart);this.xAlign=d.xAlign,this.yAlign=d.yAlign,o={opacity:1,x:u.x,y:u.y,width:l.width,height:l.height,caretX:r.x,caretY:r.y}}this._tooltipItems=a,this.$context=void 0,o&&this._resolveAnimations().update(this,o),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:e})}drawCaret(t,e,i,s){const o=this.getCaretPosition(t,i,s);e.lineTo(o.x1,o.y1),e.lineTo(o.x2,o.y2),e.lineTo(o.x3,o.y3)}getCaretPosition(t,e,i){const{xAlign:s,yAlign:o}=this,{caretSize:a,cornerRadius:r}=i,{topLeft:l,topRight:c,bottomLeft:d,bottomRight:u}=Zt(r),{x:h,y:f}=t,{width:m,height:p}=e;let g,b,y,v,x,k;return o==="center"?(x=f+p/2,s==="left"?(g=h,b=g-a,v=x+a,k=x-a):(g=h+m,b=g+a,v=x-a,k=x+a),y=g):(s==="left"?b=h+Math.max(l,d)+a:s==="right"?b=h+m-Math.max(c,u)-a:b=this.caretX,o==="top"?(v=f,x=v-a,g=b-a,y=b+a):(v=f+p,x=v+a,g=b+a,y=b-a),k=v),{x1:g,x2:b,x3:y,y1:v,y2:x,y3:k}}drawTitle(t,e,i){const s=this.title,o=s.length;let a,r,l;if(o){const c=ue(i.rtl,this.x,this.width);for(t.x=rn(this,i.titleAlign,i),e.textAlign=c.textAlign(i.titleAlign),e.textBaseline="middle",a=X(i.titleFont),r=i.titleSpacing,e.fillStyle=i.titleColor,e.font=a.string,l=0;l<o;++l)e.fillText(s[l],c.x(t.x),t.y+a.lineHeight/2),t.y+=a.lineHeight+r,l+1===o&&(t.y+=i.titleMarginBottom-r)}}_drawColorBox(t,e,i,s,o){const a=this.labelColors[i],r=this.labelPointStyles[i],{boxHeight:l,boxWidth:c}=o,d=X(o.bodyFont),u=rn(this,"left",o),h=s.x(u),f=l<d.lineHeight?(d.lineHeight-l)/2:0,m=e.y+f;if(o.usePointStyle){const p={radius:Math.min(c,l)/2,pointStyle:r.pointStyle,rotation:r.rotation,borderWidth:1},g=s.leftForLtr(h,c)+c/2,b=m+l/2;t.strokeStyle=o.multiKeyBackground,t.fillStyle=o.multiKeyBackground,Ti(t,p,g,b),t.strokeStyle=a.borderColor,t.fillStyle=a.backgroundColor,Ti(t,p,g,b)}else{t.lineWidth=N(a.borderWidth)?Math.max(...Object.values(a.borderWidth)):a.borderWidth||1,t.strokeStyle=a.borderColor,t.setLineDash(a.borderDash||[]),t.lineDashOffset=a.borderDashOffset||0;const p=s.leftForLtr(h,c),g=s.leftForLtr(s.xPlus(h,1),c-2),b=Zt(a.borderRadius);Object.values(b).some(y=>y!==0)?(t.beginPath(),t.fillStyle=o.multiKeyBackground,Fe(t,{x:p,y:m,w:c,h:l,radius:b}),t.fill(),t.stroke(),t.fillStyle=a.backgroundColor,t.beginPath(),Fe(t,{x:g,y:m+1,w:c-2,h:l-2,radius:b}),t.fill()):(t.fillStyle=o.multiKeyBackground,t.fillRect(p,m,c,l),t.strokeRect(p,m,c,l),t.fillStyle=a.backgroundColor,t.fillRect(g,m+1,c-2,l-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,e,i){const{body:s}=this,{bodySpacing:o,bodyAlign:a,displayColors:r,boxHeight:l,boxWidth:c,boxPadding:d}=i,u=X(i.bodyFont);let h=u.lineHeight,f=0;const m=ue(i.rtl,this.x,this.width),p=function(S){e.fillText(S,m.x(t.x+f),t.y+h/2),t.y+=h+o},g=m.textAlign(a);let b,y,v,x,k,w,E;for(e.textAlign=a,e.textBaseline="middle",e.font=u.string,t.x=rn(this,g,i),e.fillStyle=i.bodyColor,H(this.beforeBody,p),f=r&&g!=="right"?a==="center"?c/2+d:c+2+d:0,x=0,w=s.length;x<w;++x){for(b=s[x],y=this.labelTextColors[x],e.fillStyle=y,H(b.before,p),v=b.lines,r&&v.length&&(this._drawColorBox(e,t,x,m,i),h=Math.max(u.lineHeight,l)),k=0,E=v.length;k<E;++k)p(v[k]),h=u.lineHeight;H(b.after,p)}f=0,h=u.lineHeight,H(this.afterBody,p),t.y-=o}drawFooter(t,e,i){const s=this.footer,o=s.length;let a,r;if(o){const l=ue(i.rtl,this.x,this.width);for(t.x=rn(this,i.footerAlign,i),t.y+=i.footerMarginTop,e.textAlign=l.textAlign(i.footerAlign),e.textBaseline="middle",a=X(i.footerFont),e.fillStyle=i.footerColor,e.font=a.string,r=0;r<o;++r)e.fillText(s[r],l.x(t.x),t.y+a.lineHeight/2),t.y+=a.lineHeight+i.footerSpacing}}drawBackground(t,e,i,s){const{xAlign:o,yAlign:a}=this,{x:r,y:l}=t,{width:c,height:d}=i,{topLeft:u,topRight:h,bottomLeft:f,bottomRight:m}=Zt(s.cornerRadius);e.fillStyle=s.backgroundColor,e.strokeStyle=s.borderColor,e.lineWidth=s.borderWidth,e.beginPath(),e.moveTo(r+u,l),a==="top"&&this.drawCaret(t,e,i,s),e.lineTo(r+c-h,l),e.quadraticCurveTo(r+c,l,r+c,l+h),a==="center"&&o==="right"&&this.drawCaret(t,e,i,s),e.lineTo(r+c,l+d-m),e.quadraticCurveTo(r+c,l+d,r+c-m,l+d),a==="bottom"&&this.drawCaret(t,e,i,s),e.lineTo(r+f,l+d),e.quadraticCurveTo(r,l+d,r,l+d-f),a==="center"&&o==="left"&&this.drawCaret(t,e,i,s),e.lineTo(r,l+u),e.quadraticCurveTo(r,l,r+u,l),e.closePath(),e.fill(),s.borderWidth>0&&e.stroke()}_updateAnimationTarget(t){const e=this.chart,i=this.$animations,s=i&&i.x,o=i&&i.y;if(s||o){const a=Me[t.position].call(this,this._active,this._eventPosition);if(!a)return;const r=this._size=Co(this,t),l=Object.assign({},a,this._size),c=Mo(e,t,l),d=Ao(t,l,c,e);(s._to!==d.x||o._to!==d.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=r.width,this.height=r.height,this.caretX=a.x,this.caretY=a.y,this._resolveAnimations().update(this,d))}}_willRender(){return!!this.opacity}draw(t){const e=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(e);const s={width:this.width,height:this.height},o={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const a=nt(e.padding),r=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;e.enabled&&r&&(t.save(),t.globalAlpha=i,this.drawBackground(o,t,s,e),ja(t,e.textDirection),o.y+=a.top,this.drawTitle(o,t,e),this.drawBody(o,t,e),this.drawFooter(o,t,e),Ha(t,e.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,e){const i=this._active,s=t.map(({datasetIndex:r,index:l})=>{const c=this.chart.getDatasetMeta(r);if(!c)throw new Error("Cannot find a dataset at index "+r);return{datasetIndex:r,element:c.data[l],index:l}}),o=!_n(i,s),a=this._positionChanged(s,e);(o||a)&&(this._active=s,this._eventPosition=e,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,e,i=!0){if(e&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const s=this.options,o=this._active||[],a=this._getActiveElements(t,o,e,i),r=this._positionChanged(a,t),l=e||!_n(a,o)||r;return l&&(this._active=a,(s.enabled||s.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,e))),l}_getActiveElements(t,e,i,s){const o=this.options;if(t.type==="mouseout")return[];if(!s)return e.filter(r=>this.chart.data.datasets[r.datasetIndex]&&this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index)!==void 0);const a=this.chart.getElementsAtEventForMode(t,o.mode,o,i);return o.reverse&&a.reverse(),a}_positionChanged(t,e){const{caretX:i,caretY:s,options:o}=this,a=Me[o.position].call(this,t,e);return a!==!1&&(i!==a.x||s!==a.y)}}L(Ni,"positioners",Me);var ph={id:"tooltip",_element:Ni,positioners:Me,afterInit(n,t,e){e&&(n.tooltip=new Ni({chart:n,options:e}))},beforeUpdate(n,t,e){n.tooltip&&n.tooltip.initialize(e)},reset(n,t,e){n.tooltip&&n.tooltip.initialize(e)},afterDraw(n){const t=n.tooltip;if(t&&t._willRender()){const e={tooltip:t};if(n.notifyPlugins("beforeTooltipDraw",{...e,cancelable:!0})===!1)return;t.draw(n.ctx),n.notifyPlugins("afterTooltipDraw",e)}},afterEvent(n,t){if(n.tooltip){const e=t.replay;n.tooltip.handleEvent(t.event,e,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(n,t)=>t.bodyFont.size,boxWidth:(n,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:mr},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:n=>n!=="filter"&&n!=="itemSort"&&n!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},gh=Object.freeze({__proto__:null,Colors:Au,Decimation:Tu,Filler:Qu,Legend:sh,SubTitle:rh,Title:ah,Tooltip:ph});const bh=(n,t,e,i)=>(typeof t=="string"?(e=n.push(t)-1,i.unshift({index:e,label:t})):isNaN(t)&&(e=null),e);function yh(n,t,e,i){const s=n.indexOf(t);if(s===-1)return bh(n,t,e,i);const o=n.lastIndexOf(t);return s!==o?e:s}const vh=(n,t)=>n===null?null:Q(Math.round(n),0,t);function Lo(n){const t=this.getLabels();return n>=0&&n<t.length?t[n]:n}class Fi extends se{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const e=this._addedLabels;if(e.length){const i=this.getLabels();for(const{index:s,label:o}of e)i[s]===o&&i.splice(s,1);this._addedLabels=[]}super.init(t)}parse(t,e){if(z(t))return null;const i=this.getLabels();return e=isFinite(e)&&i[e]===t?e:yh(i,t,O(e,t),this._addedLabels),vh(e,i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let{min:i,max:s}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(i=0),e||(s=this.getLabels().length-1)),this.min=i,this.max=s}buildTicks(){const t=this.min,e=this.max,i=this.options.offset,s=[];let o=this.getLabels();o=t===0&&e===o.length-1?o:o.slice(t,e+1),this._valueRange=Math.max(o.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let a=t;a<=e;a++)s.push({value:a});return s}getLabelForValue(t){return Lo.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}L(Fi,"id","category"),L(Fi,"defaults",{ticks:{callback:Lo}});function xh(n,t){const e=[],{bounds:s,step:o,min:a,max:r,precision:l,count:c,maxTicks:d,maxDigits:u,includeBounds:h}=n,f=o||1,m=d-1,{min:p,max:g}=t,b=!z(a),y=!z(r),v=!z(c),x=(g-p)/(u+1);let k=Ss((g-p)/m/f)*f,w,E,S,C;if(k<1e-14&&!b&&!y)return[{value:p},{value:g}];C=Math.ceil(g/k)-Math.floor(p/k),C>m&&(k=Ss(C*k/m/f)*f),z(l)||(w=Math.pow(10,l),k=Math.ceil(k*w)/w),s==="ticks"?(E=Math.floor(p/k)*k,S=Math.ceil(g/k)*k):(E=p,S=g),b&&y&&o&&hl((r-a)/o,k/1e3)?(C=Math.round(Math.min((r-a)/k,d)),k=(r-a)/C,E=a,S=r):v?(E=b?a:E,S=y?r:S,C=c-1,k=(S-E)/C):(C=(S-E)/k,Le(C,Math.round(C),k/1e3)?C=Math.round(C):C=Math.ceil(C));const I=Math.max(Cs(k),Cs(E));w=Math.pow(10,z(l)?I:l),E=Math.round(E*w)/w,S=Math.round(S*w)/w;let A=0;for(b&&(h&&E!==a?(e.push({value:a}),E<a&&A++,Le(Math.round((E+A*k)*w)/w,a,To(a,x,n))&&A++):E<a&&A++);A<C;++A){const P=Math.round((E+A*k)*w)/w;if(y&&P>r)break;e.push({value:P})}return y&&h&&S!==r?e.length&&Le(e[e.length-1].value,r,To(r,x,n))?e[e.length-1].value=r:e.push({value:r}):(!y||S===r)&&e.push({value:S}),e}function To(n,t,{horizontal:e,minRotation:i}){const s=dt(i),o=(e?Math.sin(s):Math.cos(s))||.001,a=.75*t*(""+n).length;return Math.min(t/o,a)}class An extends se{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,e){return z(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:e,maxDefined:i}=this.getUserBounds();let{min:s,max:o}=this;const a=l=>s=e?s:l,r=l=>o=i?o:l;if(t){const l=yt(s),c=yt(o);l<0&&c<0?r(0):l>0&&c>0&&a(0)}if(s===o){let l=o===0?1:Math.abs(o*.05);r(o+l),t||a(s-l)}this.min=s,this.max=o}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:e,stepSize:i}=t,s;return i?(s=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,s>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${s} ticks. Limiting to 1000.`),s=1e3)):(s=this.computeTickLimit(),e=e||11),e&&(s=Math.min(e,s)),s}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,e=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const s={maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:e.precision,step:e.stepSize,count:e.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:e.minRotation||0,includeBounds:e.includeBounds!==!1},o=this._range||this,a=xh(s,o);return t.bounds==="ticks"&&Ea(a,this,"value"),t.reverse?(a.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),a}configure(){const t=this.ticks;let e=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const s=(i-e)/Math.max(t.length-1,1)/2;e-=s,i+=s}this._startValue=e,this._endValue=i,this._valueRange=i-e}getLabelForValue(t){return Ge(t,this.chart.options.locale,this.options.ticks.format)}}class ji extends An{determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=Y(t)?t:0,this.max=Y(e)?e:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),e=t?this.width:this.height,i=dt(this.options.ticks.minRotation),s=(t?Math.sin(i):Math.cos(i))||.001,o=this._resolveTickFontOptions(0);return Math.ceil(e/Math.min(40,o.lineHeight/s))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}L(ji,"id","linear"),L(ji,"defaults",{ticks:{callback:Tn.formatters.numeric}});const He=n=>Math.floor($t(n)),Kt=(n,t)=>Math.pow(10,He(n)+t);function Bo(n){return n/Math.pow(10,He(n))===1}function Ro(n,t,e){const i=Math.pow(10,e),s=Math.floor(n/i);return Math.ceil(t/i)-s}function _h(n,t){const e=t-n;let i=He(e);for(;Ro(n,t,i)>10;)i++;for(;Ro(n,t,i)<10;)i--;return Math.min(i,He(n))}function wh(n,{min:t,max:e}){t=at(n.min,t);const i=[],s=He(t);let o=_h(t,e),a=o<0?Math.pow(10,Math.abs(o)):1;const r=Math.pow(10,o),l=s>o?Math.pow(10,s):0,c=Math.round((t-l)*a)/a,d=Math.floor((t-l)/r/10)*r*10;let u=Math.floor((c-d)/Math.pow(10,o)),h=at(n.min,Math.round((l+d+u*Math.pow(10,o))*a)/a);for(;h<e;)i.push({value:h,major:Bo(h),significand:u}),u>=10?u=u<15?15:20:u++,u>=20&&(o++,u=2,a=o>=0?1:a),h=Math.round((l+d+u*Math.pow(10,o))*a)/a;const f=at(n.max,h);return i.push({value:f,major:Bo(f),significand:u}),i}class Hi extends se{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,e){const i=An.prototype.parse.apply(this,[t,e]);if(i===0){this._zero=!0;return}return Y(i)&&i>0?i:null}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=Y(t)?Math.max(0,t):null,this.max=Y(e)?Math.max(0,e):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!Y(this._userMin)&&(this.min=t===Kt(this.min,0)?Kt(this.min,-1):Kt(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let i=this.min,s=this.max;const o=r=>i=t?i:r,a=r=>s=e?s:r;i===s&&(i<=0?(o(1),a(10)):(o(Kt(i,-1)),a(Kt(s,1)))),i<=0&&o(Kt(s,-1)),s<=0&&a(Kt(i,1)),this.min=i,this.max=s}buildTicks(){const t=this.options,e={min:this._userMin,max:this._userMax},i=wh(e,this);return t.bounds==="ticks"&&Ea(i,this,"value"),t.reverse?(i.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),i}getLabelForValue(t){return t===void 0?"0":Ge(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=$t(t),this._valueRange=$t(this.max)-$t(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:($t(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const e=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+e*this._valueRange)}}L(Hi,"id","logarithmic"),L(Hi,"defaults",{ticks:{callback:Tn.formatters.logarithmic,major:{enabled:!0}}});function Vi(n){const t=n.ticks;if(t.display&&n.display){const e=nt(t.backdropPadding);return O(t.font&&t.font.size,U.font.size)+e.height}return 0}function kh(n,t,e){return e=W(e)?e:[e],{w:Il(n,t.string,e),h:e.length*t.lineHeight}}function Do(n,t,e,i,s){return n===i||n===s?{start:t-e/2,end:t+e/2}:n<i||n>s?{start:t-e,end:t}:{start:t,end:t+e}}function Eh(n){const t={l:n.left+n._padding.left,r:n.right-n._padding.right,t:n.top+n._padding.top,b:n.bottom-n._padding.bottom},e=Object.assign({},t),i=[],s=[],o=n._pointLabels.length,a=n.options.pointLabels,r=a.centerPointLabels?F/o:0;for(let l=0;l<o;l++){const c=a.setContext(n.getPointLabelContext(l));s[l]=c.padding;const d=n.getPointPosition(l,n.drawingArea+s[l],r),u=X(c.font),h=kh(n.ctx,u,n._pointLabels[l]);i[l]=h;const f=tt(n.getIndexAngle(l)+r),m=Math.round(ts(f)),p=Do(m,d.x,h.w,0,180),g=Do(m,d.y,h.h,90,270);Sh(e,t,f,p,g)}n.setCenterPoint(t.l-e.l,e.r-t.r,t.t-e.t,e.b-t.b),n._pointLabelItems=Ah(n,i,s)}function Sh(n,t,e,i,s){const o=Math.abs(Math.sin(e)),a=Math.abs(Math.cos(e));let r=0,l=0;i.start<t.l?(r=(t.l-i.start)/o,n.l=Math.min(n.l,t.l-r)):i.end>t.r&&(r=(i.end-t.r)/o,n.r=Math.max(n.r,t.r+r)),s.start<t.t?(l=(t.t-s.start)/a,n.t=Math.min(n.t,t.t-l)):s.end>t.b&&(l=(s.end-t.b)/a,n.b=Math.max(n.b,t.b+l))}function Ch(n,t,e){const i=n.drawingArea,{extra:s,additionalAngle:o,padding:a,size:r}=e,l=n.getPointPosition(t,i+s+a,o),c=Math.round(ts(tt(l.angle+K))),d=Lh(l.y,r.h,c),u=Ih(c),h=Ph(l.x,r.w,u);return{visible:!0,x:l.x,y:d,textAlign:u,left:h,top:d,right:h+r.w,bottom:d+r.h}}function Mh(n,t){if(!t)return!0;const{left:e,top:i,right:s,bottom:o}=n;return!(Bt({x:e,y:i},t)||Bt({x:e,y:o},t)||Bt({x:s,y:i},t)||Bt({x:s,y:o},t))}function Ah(n,t,e){const i=[],s=n._pointLabels.length,o=n.options,{centerPointLabels:a,display:r}=o.pointLabels,l={extra:Vi(o)/2,additionalAngle:a?F/s:0};let c;for(let d=0;d<s;d++){l.padding=e[d],l.size=t[d];const u=Ch(n,d,l);i.push(u),r==="auto"&&(u.visible=Mh(u,c),u.visible&&(c=u))}return i}function Ih(n){return n===0||n===180?"center":n<180?"left":"right"}function Ph(n,t,e){return e==="right"?n-=t:e==="center"&&(n-=t/2),n}function Lh(n,t,e){return e===90||e===270?n-=t/2:(e>270||e<90)&&(n-=t),n}function Th(n,t,e){const{left:i,top:s,right:o,bottom:a}=e,{backdropColor:r}=t;if(!z(r)){const l=Zt(t.borderRadius),c=nt(t.backdropPadding);n.fillStyle=r;const d=i-c.left,u=s-c.top,h=o-i+c.width,f=a-s+c.height;Object.values(l).some(m=>m!==0)?(n.beginPath(),Fe(n,{x:d,y:u,w:h,h:f,radius:l}),n.fill()):n.fillRect(d,u,h,f)}}function Bh(n,t){const{ctx:e,options:{pointLabels:i}}=n;for(let s=t-1;s>=0;s--){const o=n._pointLabelItems[s];if(!o.visible)continue;const a=i.setContext(n.getPointLabelContext(s));Th(e,a,o);const r=X(a.font),{x:l,y:c,textAlign:d}=o;ne(e,n._pointLabels[s],l,c+r.lineHeight/2,r,{color:a.color,textAlign:d,textBaseline:"middle"})}}function pr(n,t,e,i){const{ctx:s}=n;if(e)s.arc(n.xCenter,n.yCenter,t,0,q);else{let o=n.getPointPosition(0,t);s.moveTo(o.x,o.y);for(let a=1;a<i;a++)o=n.getPointPosition(a,t),s.lineTo(o.x,o.y)}}function Rh(n,t,e,i,s){const o=n.ctx,a=t.circular,{color:r,lineWidth:l}=t;!a&&!i||!r||!l||e<0||(o.save(),o.strokeStyle=r,o.lineWidth=l,o.setLineDash(s.dash||[]),o.lineDashOffset=s.dashOffset,o.beginPath(),pr(n,e,a,i),o.closePath(),o.stroke(),o.restore())}function Dh(n,t,e){return Wt(n,{label:e,index:t,type:"pointLabel"})}class Ae extends An{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=nt(Vi(this.options)/2),e=this.width=this.maxWidth-t.width,i=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+e/2+t.left),this.yCenter=Math.floor(this.top+i/2+t.top),this.drawingArea=Math.floor(Math.min(e,i)/2)}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!1);this.min=Y(t)&&!isNaN(t)?t:0,this.max=Y(e)&&!isNaN(e)?e:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/Vi(this.options))}generateTickLabels(t){An.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((e,i)=>{const s=V(this.options.pointLabels.callback,[e,i],this);return s||s===0?s:""}).filter((e,i)=>this.chart.getDataVisibility(i))}fit(){const t=this.options;t.display&&t.pointLabels.display?Eh(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,e,i,s){this.xCenter+=Math.floor((t-e)/2),this.yCenter+=Math.floor((i-s)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,e,i,s))}getIndexAngle(t){const e=q/(this._pointLabels.length||1),i=this.options.startAngle||0;return tt(t*e+dt(i))}getDistanceFromCenterForValue(t){if(z(t))return NaN;const e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e}getValueForDistanceFromCenter(t){if(z(t))return NaN;const e=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-e:this.min+e}getPointLabelContext(t){const e=this._pointLabels||[];if(t>=0&&t<e.length){const i=e[t];return Dh(this.getContext(),t,i)}}getPointPosition(t,e,i=0){const s=this.getIndexAngle(t)-K+i;return{x:Math.cos(s)*e+this.xCenter,y:Math.sin(s)*e+this.yCenter,angle:s}}getPointPositionForValue(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:e,top:i,right:s,bottom:o}=this._pointLabelItems[t];return{left:e,top:i,right:s,bottom:o}}drawBackground(){const{backgroundColor:t,grid:{circular:e}}=this.options;if(t){const i=this.ctx;i.save(),i.beginPath(),pr(this,this.getDistanceFromCenterForValue(this._endValue),e,this._pointLabels.length),i.closePath(),i.fillStyle=t,i.fill(),i.restore()}}drawGrid(){const t=this.ctx,e=this.options,{angleLines:i,grid:s,border:o}=e,a=this._pointLabels.length;let r,l,c;if(e.pointLabels.display&&Bh(this,a),s.display&&this.ticks.forEach((d,u)=>{if(u!==0||u===0&&this.min<0){l=this.getDistanceFromCenterForValue(d.value);const h=this.getContext(u),f=s.setContext(h),m=o.setContext(h);Rh(this,f,l,a,m)}}),i.display){for(t.save(),r=a-1;r>=0;r--){const d=i.setContext(this.getPointLabelContext(r)),{color:u,lineWidth:h}=d;!h||!u||(t.lineWidth=h,t.strokeStyle=u,t.setLineDash(d.borderDash),t.lineDashOffset=d.borderDashOffset,l=this.getDistanceFromCenterForValue(e.reverse?this.min:this.max),c=this.getPointPosition(r,l),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(c.x,c.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,e=this.options,i=e.ticks;if(!i.display)return;const s=this.getIndexAngle(0);let o,a;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(s),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((r,l)=>{if(l===0&&this.min>=0&&!e.reverse)return;const c=i.setContext(this.getContext(l)),d=X(c.font);if(o=this.getDistanceFromCenterForValue(this.ticks[l].value),c.showLabelBackdrop){t.font=d.string,a=t.measureText(r.label).width,t.fillStyle=c.backdropColor;const u=nt(c.backdropPadding);t.fillRect(-a/2-u.left,-o-d.size/2-u.top,a+u.width,d.size+u.height)}ne(t,r.label,0,-o,d,{color:c.color,strokeColor:c.textStrokeColor,strokeWidth:c.textStrokeWidth})}),t.restore()}drawTitle(){}}L(Ae,"id","radialLinear"),L(Ae,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:Tn.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}}),L(Ae,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),L(Ae,"descriptors",{angleLines:{_fallback:"grid"}});const zn={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},ot=Object.keys(zn);function Oo(n,t){return n-t}function $o(n,t){if(z(t))return null;const e=n._adapter,{parser:i,round:s,isoWeekday:o}=n._parseOpts;let a=t;return typeof i=="function"&&(a=i(a)),Y(a)||(a=typeof i=="string"?e.parse(a,i):e.parse(a)),a===null?null:(s&&(a=s==="week"&&(he(o)||o===!0)?e.startOf(a,"isoWeek",o):e.startOf(a,s)),+a)}function zo(n,t,e,i){const s=ot.length;for(let o=ot.indexOf(n);o<s-1;++o){const a=zn[ot[o]],r=a.steps?a.steps:Number.MAX_SAFE_INTEGER;if(a.common&&Math.ceil((e-t)/(r*a.size))<=i)return ot[o]}return ot[s-1]}function Oh(n,t,e,i,s){for(let o=ot.length-1;o>=ot.indexOf(e);o--){const a=ot[o];if(zn[a].common&&n._adapter.diff(s,i,a)>=t-1)return a}return ot[e?ot.indexOf(e):0]}function $h(n){for(let t=ot.indexOf(n)+1,e=ot.length;t<e;++t)if(zn[ot[t]].common)return ot[t]}function No(n,t,e){if(!e)n[t]=!0;else if(e.length){const{lo:i,hi:s}=es(e,t),o=e[i]>=t?e[i]:e[s];n[o]=!0}}function zh(n,t,e,i){const s=n._adapter,o=+s.startOf(t[0].value,i),a=t[t.length-1].value;let r,l;for(r=o;r<=a;r=+s.add(r,1,i))l=e[r],l>=0&&(t[l].major=!0);return t}function Fo(n,t,e){const i=[],s={},o=t.length;let a,r;for(a=0;a<o;++a)r=t[a],s[r]=a,i.push({value:r,major:!1});return o===0||!e?i:zh(n,i,s,e)}class Ve extends se{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,e={}){const i=t.time||(t.time={}),s=this._adapter=new Uc._date(t.adapters.date);s.init(e),Pe(i.displayFormats,s.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=e.normalized}parse(t,e){return t===void 0?null:$o(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,e=this._adapter,i=t.time.unit||"day";let{min:s,max:o,minDefined:a,maxDefined:r}=this.getUserBounds();function l(c){!a&&!isNaN(c.min)&&(s=Math.min(s,c.min)),!r&&!isNaN(c.max)&&(o=Math.max(o,c.max))}(!a||!r)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),s=Y(s)&&!isNaN(s)?s:+e.startOf(Date.now(),i),o=Y(o)&&!isNaN(o)?o:+e.endOf(Date.now(),i)+1,this.min=Math.min(s,o-1),this.max=Math.max(s+1,o)}_getLabelBounds(){const t=this.getLabelTimestamps();let e=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(e=t[0],i=t[t.length-1]),{min:e,max:i}}buildTicks(){const t=this.options,e=t.time,i=t.ticks,s=i.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&s.length&&(this.min=this._userMin||s[0],this.max=this._userMax||s[s.length-1]);const o=this.min,a=this.max,r=gl(s,o,a);return this._unit=e.unit||(i.autoSkip?zo(e.minUnit,this.min,this.max,this._getLabelCapacity(o)):Oh(this,r.length,e.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:$h(this._unit),this.initOffsets(s),t.reverse&&r.reverse(),Fo(this,r,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let e=0,i=0,s,o;this.options.offset&&t.length&&(s=this.getDecimalForValue(t[0]),t.length===1?e=1-s:e=(this.getDecimalForValue(t[1])-s)/2,o=this.getDecimalForValue(t[t.length-1]),t.length===1?i=o:i=(o-this.getDecimalForValue(t[t.length-2]))/2);const a=t.length<3?.5:.25;e=Q(e,0,a),i=Q(i,0,a),this._offsets={start:e,end:i,factor:1/(e+1+i)}}_generate(){const t=this._adapter,e=this.min,i=this.max,s=this.options,o=s.time,a=o.unit||zo(o.minUnit,e,i,this._getLabelCapacity(e)),r=O(s.ticks.stepSize,1),l=a==="week"?o.isoWeekday:!1,c=he(l)||l===!0,d={};let u=e,h,f;if(c&&(u=+t.startOf(u,"isoWeek",l)),u=+t.startOf(u,c?"day":a),t.diff(i,e,a)>1e5*r)throw new Error(e+" and "+i+" are too far apart with stepSize of "+r+" "+a);const m=s.ticks.source==="data"&&this.getDataTimestamps();for(h=u,f=0;h<i;h=+t.add(h,r,a),f++)No(d,h,m);return(h===i||s.bounds==="ticks"||f===1)&&No(d,h,m),Object.keys(d).sort(Oo).map(p=>+p)}getLabelForValue(t){const e=this._adapter,i=this.options.time;return i.tooltipFormat?e.format(t,i.tooltipFormat):e.format(t,i.displayFormats.datetime)}format(t,e){const s=this.options.time.displayFormats,o=this._unit,a=e||s[o];return this._adapter.format(t,a)}_tickFormatFunction(t,e,i,s){const o=this.options,a=o.ticks.callback;if(a)return V(a,[t,e,i],this);const r=o.time.displayFormats,l=this._unit,c=this._majorUnit,d=l&&r[l],u=c&&r[c],h=i[e],f=c&&u&&h&&h.major;return this._adapter.format(t,s||(f?u:d))}generateTickLabels(t){let e,i,s;for(e=0,i=t.length;e<i;++e)s=t[e],s.label=this._tickFormatFunction(s.value,e,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const e=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((e.start+i)*e.factor)}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const e=this.options.ticks,i=this.ctx.measureText(t).width,s=dt(this.isHorizontal()?e.maxRotation:e.minRotation),o=Math.cos(s),a=Math.sin(s),r=this._resolveTickFontOptions(0).size;return{w:i*o+r*a,h:i*a+r*o}}_getLabelCapacity(t){const e=this.options.time,i=e.displayFormats,s=i[e.unit]||i.millisecond,o=this._tickFormatFunction(t,0,Fo(this,[t],this._majorUnit),s),a=this._getLabelSize(o),r=Math.floor(this.isHorizontal()?this.width/a.w:this.height/a.h)-1;return r>0?r:1}getDataTimestamps(){let t=this._cache.data||[],e,i;if(t.length)return t;const s=this.getMatchingVisibleMetas();if(this._normalized&&s.length)return this._cache.data=s[0].controller.getAllParsedValues(this);for(e=0,i=s.length;e<i;++e)t=t.concat(s[e].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let e,i;if(t.length)return t;const s=this.getLabels();for(e=0,i=s.length;e<i;++e)t.push($o(this,s[e]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return Ma(t.sort(Oo))}}L(Ve,"id","time"),L(Ve,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function ln(n,t,e){let i=0,s=n.length-1,o,a,r,l;e?(t>=n[i].pos&&t<=n[s].pos&&({lo:i,hi:s}=Tt(n,"pos",t)),{pos:o,time:r}=n[i],{pos:a,time:l}=n[s]):(t>=n[i].time&&t<=n[s].time&&({lo:i,hi:s}=Tt(n,"time",t)),{time:o,pos:r}=n[i],{time:a,pos:l}=n[s]);const c=a-o;return c?r+(l-r)*(t-o)/c:r}class qi extends Ve{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),e=this._table=this.buildLookupTable(t);this._minPos=ln(e,this.min),this._tableRange=ln(e,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:e,max:i}=this,s=[],o=[];let a,r,l,c,d;for(a=0,r=t.length;a<r;++a)c=t[a],c>=e&&c<=i&&s.push(c);if(s.length<2)return[{time:e,pos:0},{time:i,pos:1}];for(a=0,r=s.length;a<r;++a)d=s[a+1],l=s[a-1],c=s[a],Math.round((d+l)/2)!==c&&o.push({time:c,pos:a/(r-1)});return o}_generate(){const t=this.min,e=this.max;let i=super.getDataTimestamps();return(!i.includes(t)||!i.length)&&i.splice(0,0,t),(!i.includes(e)||i.length===1)&&i.push(e),i.sort((s,o)=>s-o)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const e=this.getDataTimestamps(),i=this.getLabelTimestamps();return e.length&&i.length?t=this.normalize(e.concat(i)):t=e.length?e:i,t=this._cache.all=t,t}getDecimalForValue(t){return(ln(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return ln(this._table,i*this._tableRange+this._minPos,!0)}}L(qi,"id","timeseries"),L(qi,"defaults",Ve.defaults);var Nh=Object.freeze({__proto__:null,CategoryScale:Fi,LinearScale:ji,LogarithmicScale:Hi,RadialLinearScale:Ae,TimeScale:Ve,TimeSeriesScale:qi});const Fh=[Wc,_u,gh,Nh];Pt.register(...Fh);const _={currentUser:JSON.parse(localStorage.getItem("onenet_user")||"null"),activeCompany:JSON.parse(localStorage.getItem("onenet_active_company")||"null")||{id:1,name:"OneNet Solutions",legal_name:"OneNet Solutions Enterprise Suite (Head Office)",address:"Muslim Town, Lahore, Pakistan",phone:"+92 42 30000001",tax_id:"NTN-7492019-2",strn:"STRN-11-22-3344-555",currency:"PKR"},companies:[],permissionsMatrix:{},activeModule:"dashboard",products:[],categories:[],warehouses:[],customers:[],activeShift:null,posCart:{items:[],customerId:1,discountAmount:0,paymentMethod:"CASH",paidAmount:0},mobileCart:{items:[],customerId:2,geoLat:null,geoLng:null}};function jh(n,t="view"){if(!_.currentUser)return!1;const e=_.currentUser.role_name||"Cashier";if(e==="Super Admin")return!0;const i=_.permissionsMatrix[e];return i?(i[n]||[]).includes(t):!0}function T(n){return"Rs. "+(Number(n)||0).toLocaleString("en-PK",{minimumFractionDigits:2,maximumFractionDigits:2})}function M(n,t="info"){const e=document.getElementById("toast-container");if(!e)return;const i=document.createElement("div");i.className=`toast ${t}`,i.innerHTML=`
    <span class="toast-dot"></span>
    <span>${n}</span>
  `,e.appendChild(i),setTimeout(()=>{i.style.opacity="0",i.style.transform="translateY(10px)",setTimeout(()=>i.remove(),300)},3500)}const Hh="/api";class R{static getToken(){return localStorage.getItem("onenet_token")||localStorage.getItem("apexerppos_token")||""}static setToken(t){localStorage.setItem("onenet_token",t),localStorage.setItem("apexerppos_token",t)}static clearToken(){localStorage.removeItem("onenet_token"),localStorage.removeItem("apexerppos_token")}static async request(t,e={}){const i=`${Hh}${t}`,s={"Content-Type":"application/json",...e.headers},o=this.getToken();o&&(s.Authorization=`Bearer ${o}`);try{const a=await fetch(i,{...e,headers:s}),r=await a.json();if(!a.ok)throw new Error(r.message||`Request failed with status ${a.status}`);return r}catch(a){throw console.error(`API Error [${t}]:`,a),a}}static get(t){return this.request(t,{method:"GET"})}static post(t,e){return this.request(t,{method:"POST",body:JSON.stringify(e)})}static put(t,e){return this.request(t,{method:"PUT",body:JSON.stringify(e)})}static patch(t,e){return this.request(t,{method:"PATCH",body:JSON.stringify(e)})}static delete(t,e){return this.request(t,{method:"DELETE",body:e?JSON.stringify(e):void 0})}}class In{static connect(){const e=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws`;try{this.ws=new WebSocket(e),this.ws.onopen=()=>{var i;console.log("[Realtime] WebSocket connected to ApexERP stream"),(i=document.getElementById("ws-status-indicator"))==null||i.classList.add("online")},this.ws.onmessage=i=>{try{const s=JSON.parse(i.data);this.notifyListeners(s)}catch(s){console.error("[Realtime] Parse error:",s)}},this.ws.onclose=()=>{var i;(i=document.getElementById("ws-status-indicator"))==null||i.classList.remove("online"),setTimeout(()=>this.connect(),3e3)}}catch(i){console.warn("[Realtime] Could not connect WebSocket:",i.message)}}static subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}static notifyListeners(t){for(const e of this.listeners)e(t)}}L(In,"ws",null),L(In,"listeners",new Set);function Ye(n,t,e=""){const i=document.getElementById("onet-print-iframe");i&&i.remove();const s=document.createElement("iframe");s.id="onet-print-iframe",s.style.position="fixed",s.style.right="0",s.style.bottom="0",s.style.width="0",s.style.height="0",s.style.border="0",s.style.zIndex="-9999",s.style.visibility="hidden",document.body.appendChild(s);const o=s.contentWindow.document;o.open(),o.write(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>${n}</title>
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        body {
          background: #ffffff !important;
          color: #000000 !important;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        @media print {
          body {
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
          }
        }
        ${e}
      </style>
    </head>
    <body>
      ${t}
    </body>
    </html>
  `),o.close(),setTimeout(()=>{try{s.contentWindow.focus(),s.contentWindow.print()}catch(a){console.error("Print iframe error:",a)}finally{setTimeout(()=>{s&&s.parentNode&&s.parentNode.removeChild(s)},1500)}},200)}function Vh(n){const t=_.activeCompany||{name:"OneNet Solutions",legal_name:"OneNet Solutions Enterprise Suite",address:"Muslim Town, Lahore, Pakistan",phone:"+92 300 1234567",tax_id:"NTN: 7492019-2"},e=n.created_at?new Date(n.created_at).toLocaleString("en-PK",{dateStyle:"medium",timeStyle:"short"}):new Date().toLocaleString("en-PK",{dateStyle:"medium",timeStyle:"short"}),i=n.items||[],s=Number(n.subtotal)||0,o=Number(n.discount_amount)||0,a=Number(n.tax_amount)||0,r=Number(n.total_amount)||0,l=Number(n.paid_amount)||r,c=Number(n.change_amount)||0,d=n.receipt_number||"REC-POS",u=n.customer_name||"Walk-in Retail Customer",h=n.payment_method||"CASH",f=`
    @page {
      size: 80mm auto;
      margin: 2mm;
    }
    body {
      font-family: 'JetBrains Mono', 'Courier New', Courier, monospace;
      font-size: 11px;
      line-height: 1.35;
      padding: 3mm 2mm;
      max-width: 78mm;
      margin: 0 auto;
    }
    .text-center { text-align: center; }
    .text-right { text-align: right; }
    .font-bold { font-weight: bold; }
    .header-title { font-size: 15px; font-weight: 800; text-transform: uppercase; margin-bottom: 2px; }
    .header-sub { font-size: 10px; margin-bottom: 1px; color: #333; }
    .header-badge { font-size: 11px; font-weight: 700; margin: 4px 0 2px 0; letter-spacing: 0.5px; }
    .divider { border-bottom: 1px dashed #000; margin: 5px 0; }
    .divider-dotted { border-bottom: 1px dotted #666; margin: 3px 0; }
    .row { display: flex; justify-content: space-between; align-items: flex-start; margin: 2px 0; font-size: 11px; }
    .col-item { flex: 2.3; text-align: left; overflow: hidden; padding-right: 4px; }
    .col-qty { flex: 0.7; text-align: center; }
    .col-rate { flex: 1.1; text-align: right; }
    .col-total { flex: 1.3; text-align: right; font-weight: bold; }
    .net-total-row {
      font-size: 13px;
      font-weight: 800;
      border-top: 1px solid #000;
      border-bottom: 1px solid #000;
      padding: 4px 0;
      margin: 4px 0;
    }
    .footer { text-align: center; margin-top: 8px; font-size: 10px; }
  `,m=`
    <div>
      <div class="text-center">
        <div class="header-title">${t.name||"OneNet Solutions"}</div>
        <div class="header-sub">${t.legal_name||"Enterprise Suite"}</div>
        <div class="header-sub">${t.address||"Muslim Town, Lahore, Pakistan"}</div>
        <div class="header-sub">Tel: ${t.phone||"+92 300 1234567"} | ${t.tax_id||"NTN: 7492019-2"}</div>
        <div class="header-badge">*** POS RETAIL SALES SLIP ***</div>
      </div>

      <div class="divider"></div>

      <div class="row"><span>Receipt No:</span><strong class="font-bold">${d}</strong></div>
      <div class="row"><span>Date & Time:</span><span>${e}</span></div>
      <div class="row"><span>Counter / Terminal:</span><span>Pos-01 / Cashier</span></div>
      <div class="row"><span>Customer:</span><span>${u}</span></div>

      <div class="divider"></div>

      <div class="row font-bold" style="font-size: 10px;">
        <span class="col-item">ITEM DESCRIPTION</span>
        <span class="col-qty">QTY</span>
        <span class="col-rate">PRICE</span>
        <span class="col-total">TOTAL</span>
      </div>
      <div class="divider-dotted"></div>

      ${i.map(p=>`
        <div class="row">
          <span class="col-item">${p.name||p.product_name||"Item"}</span>
          <span class="col-qty">${p.quantity}</span>
          <span class="col-rate">${Number(p.unit_price).toFixed(2)}</span>
          <span class="col-total">${(Number(p.unit_price)*Number(p.quantity)).toFixed(2)}</span>
        </div>
      `).join("")}

      <div class="divider"></div>

      <div class="row"><span>Subtotal:</span><span>Rs. ${s.toFixed(2)}</span></div>
      ${o>0?`<div class="row"><span>Discount:</span><span>-Rs. ${o.toFixed(2)}</span></div>`:""}
      ${a>0?`<div class="row"><span>Sales Tax / VAT (18%):</span><span>Rs. ${a.toFixed(2)}</span></div>`:""}
      
      <div class="row net-total-row">
        <span>NET PAYABLE:</span>
        <span>Rs. ${r.toFixed(2)}</span>
      </div>

      <div class="row"><span>Tender Method:</span><span>${h}</span></div>
      <div class="row"><span>Amount Received:</span><span>Rs. ${l.toFixed(2)}</span></div>
      <div class="row"><span>Change Returned:</span><strong class="font-bold">Rs. ${c.toFixed(2)}</strong></div>

      <div class="divider"></div>

      <div class="footer">
        <div class="font-bold">* FBR / Sales Tax Compliant *</div>
        <div>Thank you for shopping with OneNet Solutions!</div>
        <div style="font-size:9px; color:#555; margin-top:3px;">Powered by OneNet Solutions Enterprise Suite</div>
      </div>
    </div>
  `;Ye(`Receipt_${d}`,m,f)}function qh(n){const t=_.activeCompany||{name:"OneNet Solutions",legal_name:"OneNet Solutions Enterprise Suite",address:"Muslim Town, Lahore, Pakistan",phone:"+92 300 1234567",tax_id:"NTN: 7492019-2",strn:"STRN: 11-22-3344-555"},e=n.invoice_number||"INV-2026-0001",i=n.invoice_date||new Date().toISOString().slice(0,10),s=n.items||[],o=Number(n.subtotal)||0,a=Number(n.tax_amount)||0,r=Number(n.discount_amount)||0,l=Number(n.total_amount)||o+a-r,c=`
    @page {
      size: A4 portrait;
      margin: 10mm 12mm;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #0f172a;
      line-height: 1.5;
      padding: 15px;
    }
    .header-box {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2.5px solid #0284c7;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
    .brand-name {
      font-size: 24px;
      font-weight: 800;
      color: #0284c7;
      letter-spacing: -0.5px;
    }
    .brand-subtitle {
      font-size: 13px;
      font-weight: 600;
      color: #334155;
    }
    .brand-meta {
      font-size: 11px;
      color: #64748b;
      margin-top: 3px;
    }
    .invoice-title-block {
      text-align: right;
    }
    .invoice-main-title {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
    }
    .invoice-num {
      font-size: 14px;
      font-weight: 700;
      color: #0284c7;
      margin-top: 2px;
    }
    .meta-box {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      padding: 12px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
    }
    .billed-to-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      color: #64748b;
    }
    .billed-to-name {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      margin: 2px 0;
    }
    .qr-container {
      text-align: center;
    }
    .qr-container img {
      width: 85px;
      height: 85px;
      border: 1px solid #cbd5e1;
      padding: 3px;
      background: #fff;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
      font-size: 12px;
    }
    th {
      background: #0f172a;
      color: #ffffff;
      font-weight: 700;
      padding: 8px 10px;
      text-align: left;
    }
    th.text-center, td.text-center { text-align: center; }
    th.text-right, td.text-right { text-align: right; }
    td {
      padding: 8px 10px;
      border-bottom: 1px solid #e2e8f0;
      color: #1e293b;
    }
    tr:nth-child(even) td {
      background: #f8fafc;
    }
    .totals-area {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 24px;
    }
    .totals-card {
      width: 280px;
      font-size: 13px;
    }
    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
    }
    .totals-grand {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-top: 2px solid #0f172a;
      font-size: 16px;
      font-weight: 800;
      color: #0284c7;
    }
    .signature-area {
      display: flex;
      justify-content: space-between;
      margin-top: 40px;
      padding-top: 15px;
      border-top: 1px solid #cbd5e1;
      font-size: 11px;
      color: #64748b;
    }
    .sign-line {
      width: 180px;
      text-align: center;
    }
    .sign-border {
      border-bottom: 1px solid #94a3b8;
      height: 25px;
      margin-bottom: 4px;
    }
  `,d=`
    <div>
      <div class="header-box">
        <div>
          <div class="brand-name">${t.name||"OneNet Solutions"}</div>
          <div class="brand-subtitle">${t.legal_name||"Enterprise Suite"}</div>
          <div class="brand-meta">${t.address||"Muslim Town, Lahore, Pakistan"}</div>
          <div class="brand-meta">Tel: ${t.phone||"+92 300 1234567"} | ${t.tax_id||"NTN: 7492019-2"} ${t.strn?"| "+t.strn:""}</div>
        </div>
        <div class="invoice-title-block">
          <div class="invoice-main-title">OFFICIAL TAX INVOICE</div>
          <div class="invoice-num">${e}</div>
          <div style="font-size: 12px; color:#475569; margin-top:2px;">Date: ${i}</div>
          <div style="font-size: 11px; font-weight: bold; color: #16a34a; margin-top:2px;">STATUS: ${n.status||"PAID"}</div>
        </div>
      </div>

      <div class="meta-box">
        <div>
          <div class="billed-to-title">Billed To Customer:</div>
          <div class="billed-to-name">${n.customer_name||"Al-Madina Super Store"}</div>
          <div style="font-size: 12px; color: #475569;">Payment Terms: ${n.payment_method||"Net 30 / Cash on Delivery"}</div>
          <div style="font-size: 11px; color: #64748b;">Customer Tax / STRN: ${n.customer_tax_number||"STRN-9847281"}</div>
        </div>
        <div class="qr-container">
          <img src="${n.einvoice_qr_code||'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><rect width="80" height="80" fill="white"/><text x="10" y="45" font-size="10" fill="black">QR Verified</text></svg>'}" alt="QR" />
          <div style="font-size: 9px; color:#64748b; margin-top:2px;">FBR / ZATCA Verified</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Item & Description</th>
            <th class="text-center" style="width: 70px;">Qty</th>
            <th class="text-right" style="width: 110px;">Unit Price (Rs)</th>
            <th class="text-right" style="width: 120px;">Total (Rs)</th>
          </tr>
        </thead>
        <tbody>
          ${s.map(u=>`
            <tr>
              <td><strong>${u.name||u.product_name}</strong></td>
              <td class="text-center">${u.quantity}</td>
              <td class="text-right">${Number(u.unit_price).toFixed(2)}</td>
              <td class="text-right"><strong>${(Number(u.unit_price)*Number(u.quantity)).toFixed(2)}</strong></td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div class="totals-area">
        <div class="totals-card">
          <div class="totals-row"><span>Subtotal:</span><span>Rs. ${o.toFixed(2)}</span></div>
          <div class="totals-row"><span>Sales Tax (18%):</span><span>Rs. ${a.toFixed(2)}</span></div>
          ${r>0?`<div class="totals-row"><span>Special Discount:</span><span>-Rs. ${r.toFixed(2)}</span></div>`:""}
          <div class="totals-grand">
            <span>Total Payable:</span>
            <span>Rs. ${l.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div class="signature-area">
        <div>
          <div>* Computer generated digital tax invoice from OneNet Solutions Enterprise Suite.</div>
          <div style="margin-top:2px;">Thank you for your business!</div>
        </div>
        <div class="sign-line">
          <div class="sign-border"></div>
          <div>Authorized Signature & Stamp</div>
        </div>
      </div>
    </div>
  `;Ye(`TaxInvoice_${e}`,d,c)}function Wh(n,t=12){const e=_.activeCompany||{name:"OneNet Solutions"},i=`
    @page { size: A4; margin: 8mm; }
    body { font-family: monospace; }
    .sticker-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6mm;
    }
    .sticker {
      border: 1px dashed #333;
      padding: 8px 6px;
      text-align: center;
      page-break-inside: avoid;
    }
    .st-title { font-weight: bold; font-size: 11px; }
    .st-name { font-size: 10px; margin: 2px 0; overflow: hidden; white-space: nowrap; }
    .st-bars { font-size: 20px; letter-spacing: 3px; font-weight: bold; margin: 3px 0; }
    .st-code { font-size: 9px; }
    .st-price { font-weight: bold; font-size: 12px; margin-top: 2px; }
  `,s=`
    <div class="sticker-grid">
      ${Array.from({length:t}).map(()=>`
        <div class="sticker">
          <div class="st-title">${e.name||"OneNet Solutions"}</div>
          <div class="st-name">${n.name.slice(0,24)}</div>
          <div class="st-bars">||| | |||| | ||</div>
          <div class="st-code">${n.barcode||"896400010101"}</div>
          <div class="st-price">${T(n.selling_price)}</div>
        </div>
      `).join("")}
    </div>
  `;Ye(`Barcode_Sheet_${n.sku||"ITEM"}`,s,i)}function gr(n){const t=_.activeCompany||{name:"OneNet Solutions",address:"Muslim Town, Lahore, Pakistan"},e=`
    @page { size: A5 landscape; margin: 8mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #1e293b; padding: 10px; }
    .header { display: flex; justify-content: space-between; border-bottom: 2px solid #0284c7; padding-bottom: 8px; margin-bottom: 12px; }
    .title { font-size: 18px; font-weight: 800; color: #0284c7; }
    .sub { font-size: 11px; color: #64748b; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px; margin-bottom: 14px; }
    table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 14px; }
    th, td { padding: 6px 8px; border: 1px solid #cbd5e1; }
    th { background: #f1f5f9; font-weight: 700; text-align: left; }
    .text-right { text-align: right; }
    .net-box { display: flex; justify-content: space-between; font-size: 14px; font-weight: 800; color: #0284c7; padding: 8px; background: #e0f2fe; border: 1px solid #7dd3fc; border-radius: 4px; }
  `,i=`
    <div>
      <div class="header">
        <div>
          <div class="title">${t.name||"OneNet Solutions"}</div>
          <div class="sub">${t.address||"Muslim Town, Lahore"} | HR & Payroll Department</div>
        </div>
        <div style="text-align: right;">
          <strong style="font-size: 14px;">SALARY PAYSLIP</strong>
          <div class="sub">Period: ${n.month_year||"September 2026"}</div>
        </div>
      </div>

      <div class="info-grid">
        <div><strong>Employee Code:</strong> ${n.employee_code||"EMP-101"}</div>
        <div><strong>Employee Name:</strong> ${n.employee_name||"Ali Raza"}</div>
        <div><strong>Department:</strong> ${n.department||"Retail POS Operations"}</div>
        <div><strong>Designation:</strong> ${n.designation||"Senior Cashier"}</div>
        <div><strong>CNIC / ID:</strong> ${n.cnic||"35201-1234567-1"}</div>
        <div><strong>Payment Date:</strong> ${new Date().toLocaleDateString("en-PK")}</div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Earnings Description</th>
            <th class="text-right">Amount (Rs)</th>
            <th>Deductions</th>
            <th class="text-right">Amount (Rs)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Basic Salary</td>
            <td class="text-right">${T(n.base_salary||45e3)}</td>
            <td>Income Tax Deducted</td>
            <td class="text-right">${T(n.tax_deduction||1200)}</td>
          </tr>
          <tr>
            <td>Overtime / Incentives</td>
            <td class="text-right">${T(n.allowances||3500)}</td>
            <td>Unpaid Leaves / Late Cut</td>
            <td class="text-right">${T(n.unpaid_deduction||0)}</td>
          </tr>
        </tbody>
      </table>

      <div class="net-box">
        <span>NET TAKE-HOME SALARY:</span>
        <span>${T(n.net_salary||47300)}</span>
      </div>

      <div style="display:flex; justify-content:space-between; margin-top:30px; font-size:11px; color:#64748b;">
        <div>Prepared by HR Department</div>
        <div style="text-align:center; border-top:1px solid #94a3b8; width:150px; padding-top:4px;">Employee Signature</div>
      </div>
    </div>
  `;Ye(`Payslip_${n.employee_code||"EMP"}`,i,e)}function Uh(n){n.innerHTML=`
    <div class="pos-container">
      <!-- LEFT: Product Grid & Search -->
      <div class="pos-product-catalog">
        <div class="pos-top-bar">
          <div class="pos-search-input-box">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" id="pos-search-barcode" placeholder="Scan Barcode or Search Product [SKU, Name] (Press Enter to add)..." autofocus autocomplete="off" />
          </div>
          <button class="btn btn-outline btn-sm" id="btn-shift-mgmt">
            <span id="shift-status-pill" class="tag tag-success">Shift Active</span>
          </button>
        </div>

        <div class="category-filter-chips" id="pos-category-chips">
          <button class="chip-btn active" data-cat="all">All Items</button>
          ${_.categories.map(t=>`
            <button class="chip-btn" data-cat="${t.id}">${t.name}</button>
          `).join("")}
        </div>

        <div class="pos-product-grid" id="pos-grid-items">
          <!-- Populated dynamically -->
        </div>
      </div>

      <!-- RIGHT: Active POS Cart -->
      <div class="pos-cart-panel">
        <div class="cart-header">
          <div>
            <h3 style="font-size:1.05rem; font-weight:700;">Active Register Cart</h3>
            <span style="font-size:0.75rem; color:var(--text-muted);" id="active-cart-reg-name">Counter 01 - Express Lane</span>
          </div>
          <button class="btn btn-outline btn-sm" id="btn-clear-cart" title="Clear Cart">Clear</button>
        </div>

        <div class="cart-customer-select">
          <label style="font-size:0.75rem; color:var(--text-muted); display:block; margin-bottom:4px;">Customer Account:</label>
          <select id="pos-customer-dropdown" class="form-control">
            ${_.customers.map(t=>`
              <option value="${t.id}">${t.business_name||t.name} (${t.phone})</option>
            `).join("")}
          </select>
        </div>

        <div class="cart-items-list" id="pos-cart-items-list">
          <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom:8px; opacity:0.5;"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <p style="font-size:0.9rem;">Cart is empty. Scan barcode or tap products on the left.</p>
          </div>
        </div>

        <!-- CART SUMMARY & CHECKOUT -->
        <div class="cart-summary-footer">
          <div class="summary-line">
            <span>Subtotal:</span>
            <span id="pos-subtotal">Rs. 0.00</span>
          </div>
          <div class="summary-line">
            <span>Sales Tax / VAT (18%):</span>
            <span id="pos-tax">Rs. 0.00</span>
          </div>
          <div class="summary-line">
            <span>Discount (Rs):</span>
            <input type="number" id="pos-discount-input" value="0" min="0" class="form-control" style="width:85px; text-align:right; padding:4px 8px; font-weight:600;" />
          </div>
          <div class="summary-line total">
            <span>Total Payable:</span>
            <span id="pos-total-payable" style="color:#38bdf8;">Rs. 0.00</span>
          </div>

          <div class="cart-actions-row">
            <button class="btn btn-outline" id="btn-hold-cart" title="Hold Order (F4)">
              Hold (F4)
            </button>
            <button class="btn btn-primary" id="btn-pay-now" style="font-size:1rem; padding:0.85rem;" title="Checkout (F2)">
              Pay & Print (F2)
            </button>
          </div>
        </div>
      </div>
    </div>
  `,vn("all"),Gh()}function vn(n="all",t=""){const e=document.getElementById("pos-grid-items");if(!e)return;let i=_.products;if(n!=="all"&&(i=i.filter(s=>String(s.category_id)===String(n))),t){const s=t.toLowerCase();i=i.filter(o=>o.name.toLowerCase().includes(s)||o.sku.toLowerCase().includes(s)||o.barcode&&o.barcode.includes(s))}if(i.length===0){e.innerHTML=`
      <div style="grid-column: 1/-1; text-align:center; padding:3rem; color:var(--text-muted);">
        <p>No products match current filter</p>
      </div>
    `;return}e.innerHTML=i.map(s=>`
    <div class="product-touch-card" data-product-id="${s.id}">
      <span class="card-barcode-sku">${s.barcode||s.sku}</span>
      <h4 class="card-product-name">${s.name}</h4>
      <div class="card-meta-row">
        <span class="card-price">${T(s.selling_price)}</span>
        <span class="card-stock-pill ${s.stock<=s.reorder_level?"tag-danger":""}">${s.stock} ${s.uom||"Pcs"}</span>
      </div>
    </div>
  `).join(""),e.querySelectorAll(".product-touch-card").forEach(s=>{s.addEventListener("click",()=>{const o=Number(s.dataset.productId),a=_.products.find(r=>r.id===o);a&&br(a)})})}function Gh(){const n=document.getElementById("pos-search-barcode"),t=document.querySelectorAll(".chip-btn"),e=document.getElementById("btn-clear-cart"),i=document.getElementById("btn-pay-now"),s=document.getElementById("pos-discount-input"),o=document.getElementById("btn-shift-mgmt");n==null||n.addEventListener("input",a=>{var l;const r=((l=document.querySelector(".chip-btn.active"))==null?void 0:l.dataset.cat)||"all";vn(r,a.target.value)}),n==null||n.addEventListener("keydown",a=>{if(a.key==="Enter"){a.preventDefault();const r=n.value.trim();if(!r)return;const l=_.products.find(c=>c.barcode===r||c.sku.toLowerCase()===r.toLowerCase());l?(br(l),n.value="",vn("all")):M(`No product with barcode: ${r}`,"error")}}),t.forEach(a=>{a.addEventListener("click",()=>{t.forEach(r=>r.classList.remove("active")),a.classList.add("active"),vn(a.dataset.cat,(n==null?void 0:n.value)||"")})}),s==null||s.addEventListener("input",a=>{_.posCart.discountAmount=Number(a.target.value)||0,Pn()}),e==null||e.addEventListener("click",()=>{_.posCart.items=[],_.posCart.discountAmount=0,s&&(s.value="0"),Nn()}),i==null||i.addEventListener("click",()=>{if(_.posCart.items.length===0){M("Please add items to cart first!","error");return}Kh()}),o==null||o.addEventListener("click",()=>{Xh()}),window.addEventListener("keydown",Yh)}function Yh(n){var t;_.activeModule==="pos"&&(n.key==="F2"?(n.preventDefault(),(t=document.getElementById("btn-pay-now"))==null||t.click()):n.key==="F4"&&(n.preventDefault(),M("Order held in memory tab","info")))}function br(n){const t=_.posCart.items.find(e=>e.product_id===n.id);t?t.quantity+=1:_.posCart.items.push({product_id:n.id,name:n.name,sku:n.sku,unit_price:Number(n.selling_price),tax_rate:Number(n.tax_rate||18),quantity:1}),M(`Added: ${n.name}`,"success"),Nn()}function Nn(){const n=document.getElementById("pos-cart-items-list");if(n){if(_.posCart.items.length===0){n.innerHTML=`
      <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
        <p style="font-size:0.9rem;">Cart is empty. Scan barcode or tap products.</p>
      </div>
    `,Pn();return}n.innerHTML=_.posCart.items.map((t,e)=>`
    <div class="cart-item-row">
      <div class="cart-item-info">
        <div class="cart-item-title">${t.name}</div>
        <div class="cart-item-unit-price">${T(t.unit_price)} × ${t.quantity}</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" data-cart-idx="${e}" data-action="decrease">-</button>
        <span class="qty-value">${t.quantity}</span>
        <button class="qty-btn" data-cart-idx="${e}" data-action="increase">+</button>
      </div>
      <div class="cart-item-total">
        ${T(t.unit_price*t.quantity)}
      </div>
      <button style="background:none; border:none; color:var(--danger); cursor:pointer; padding:4px;" data-cart-idx="${e}" data-action="delete" title="Remove">✕</button>
    </div>
  `).join(""),n.querySelectorAll("[data-action]").forEach(t=>{t.addEventListener("click",e=>{const i=Number(t.dataset.cartIdx),s=t.dataset.action;s==="increase"?_.posCart.items[i].quantity+=1:s==="decrease"?(_.posCart.items[i].quantity-=1,_.posCart.items[i].quantity<=0&&_.posCart.items.splice(i,1)):s==="delete"&&_.posCart.items.splice(i,1),Nn()})}),Pn()}}function Pn(){let n=0,t=0;for(const r of _.posCart.items){const l=r.unit_price*r.quantity,c=l*r.tax_rate/100;n+=l,t+=c}const e=_.posCart.discountAmount||0,i=Math.max(0,n-e+t),s=document.getElementById("pos-subtotal"),o=document.getElementById("pos-tax"),a=document.getElementById("pos-total-payable");return s&&(s.textContent=T(n)),o&&(o.textContent=T(t)),a&&(a.textContent=T(i)),{subtotal:n,tax:t,discount:e,total:i}}function Kh(){var c,d,u;const{discount:n,total:t}=Pn(),e=`
    <div class="modal-overlay" id="payment-modal">
      <div class="modal-content" style="max-width: 480px;">
        <div class="modal-header">
          <h3 class="modal-title">Complete POS Tender</h3>
          <button class="btn-icon btn-sm" id="btn-close-pay-modal">✕</button>
        </div>
        <div class="modal-body">
          <div style="background:rgba(14,165,233,0.1); border:1px solid var(--border-bright); padding:1rem; border-radius:var(--radius-md); text-align:center;">
            <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Total Payable</div>
            <div style="font-family:var(--font-heading); font-size:2.2rem; font-weight:800; color:#38bdf8;">${T(t)}</div>
          </div>

          <div class="form-group">
            <label class="form-label">Tender Method:</label>
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:0.5rem;">
              <button class="btn btn-outline tender-method-btn active" data-method="CASH">💵 Cash</button>
              <button class="btn btn-outline tender-method-btn" data-method="CARD">💳 Card</button>
              <button class="btn btn-outline tender-method-btn" data-method="STORE_CREDIT">📑 Credit</button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Amount Tendered / Received:</label>
            <input type="number" id="tender-amount-input" value="${t}" min="${t}" class="form-control" style="font-size:1.3rem; font-weight:700; text-align:right;" />
          </div>

          <!-- Quick Cash Amount Shortcuts -->
          <div style="display:flex; gap:0.5rem;">
            <button class="btn btn-outline btn-sm quick-cash-btn" data-val="${t}">Exact</button>
            <button class="btn btn-outline btn-sm quick-cash-btn" data-val="${Math.ceil(t/500)*500}">Round 500</button>
            <button class="btn btn-outline btn-sm quick-cash-btn" data-val="${Math.ceil(t/1e3)*1e3}">Round 1000</button>
            <button class="btn btn-outline btn-sm quick-cash-btn" data-val="5000">5,000</button>
          </div>

          <div style="display:flex; justify-content:space-between; padding:0.75rem 1rem; background:rgba(0,0,0,0.2); border-radius:var(--radius-md);">
            <span style="font-size:0.9rem; color:var(--text-muted);">Change Due:</span>
            <span id="tender-change-due" style="font-family:var(--font-mono); font-weight:700; font-size:1.1rem; color:#34d399;">Rs. 0.00</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-pay">Cancel</button>
          <button class="btn btn-success" id="btn-confirm-checkout" style="padding:0.75rem 1.5rem;">Confirm & Print Receipt</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",e);const i=document.getElementById("payment-modal"),s=document.getElementById("tender-amount-input"),o=document.getElementById("tender-change-due");let a="CASH";function r(){const h=Number(s==null?void 0:s.value)||0,f=Math.max(0,h-t);o&&(o.textContent=T(f))}s==null||s.addEventListener("input",r),i==null||i.querySelectorAll(".tender-method-btn").forEach(h=>{h.addEventListener("click",()=>{i.querySelectorAll(".tender-method-btn").forEach(f=>f.classList.remove("active")),h.classList.add("active"),a=h.dataset.method})}),i==null||i.querySelectorAll(".quick-cash-btn").forEach(h=>{h.addEventListener("click",()=>{s.value=h.dataset.val,r()})});const l=()=>i==null?void 0:i.remove();(c=document.getElementById("btn-close-pay-modal"))==null||c.addEventListener("click",l),(d=document.getElementById("btn-cancel-pay"))==null||d.addEventListener("click",l),(u=document.getElementById("btn-confirm-checkout"))==null||u.addEventListener("click",async()=>{var f;const h=Number(s.value)||t;if(h<t&&a==="CASH"){M("Received cash cannot be less than total payable","error");return}try{const m=((f=document.getElementById("pos-customer-dropdown"))==null?void 0:f.value)||1,p=await R.post("/pos/checkout",{customer_id:m,warehouse_id:2,items:_.posCart.items,discount_amount:n,payment_method:a,paid_amount:h});if(p.success){M(`Transaction ${p.transaction.receipt_number} completed!`,"success"),l(),Vh(p.transaction),_.posCart.items=[],_.posCart.discountAmount=0,Nn();const g=await R.get("/inventory/products");g.success&&(_.products=g.products)}}catch(m){M(m.message,"error")}})}function Xh(){var e,i,s;document.body.insertAdjacentHTML("beforeend",`
    <div class="modal-overlay" id="shift-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Cash Register Shift Management</h3>
          <button class="btn-icon btn-sm" id="btn-close-shift-modal">✕</button>
        </div>
        <div class="modal-body">
          <div style="background:rgba(255,255,255,0.03); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <div class="summary-line"><span>Active Register:</span><strong>Counter 01 - Express Lane</strong></div>
            <div class="summary-line"><span>Cashier In-Charge:</span><strong>Ali Raza</strong></div>
            <div class="summary-line"><span>Opening Float:</span><strong>Rs. 5,000.00</strong></div>
            <div class="summary-line"><span>Expected Cash in Drawer:</span><strong style="color:#38bdf8;">Rs. 23,500.00</strong></div>
          </div>

          <div class="form-group">
            <label class="form-label">Physical Cash Count at Closing:</label>
            <input type="number" id="shift-counted-cash" value="23500" class="form-control" />
          </div>

          <div class="form-group">
            <label class="form-label">Shift Handover Notes:</label>
            <textarea id="shift-notes" class="form-control" rows="2" placeholder="Float balanced, credit slips filed..."></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-dismiss-shift">Cancel</button>
          <button class="btn btn-danger" id="btn-close-shift-confirm">Reconcile & Close Shift</button>
        </div>
      </div>
    </div>
  `);const t=document.getElementById("shift-modal");(e=document.getElementById("btn-close-shift-modal"))==null||e.addEventListener("click",()=>t.remove()),(i=document.getElementById("btn-dismiss-shift"))==null||i.addEventListener("click",()=>t.remove()),(s=document.getElementById("btn-close-shift-confirm"))==null||s.addEventListener("click",async()=>{const o=document.getElementById("shift-counted-cash").value,a=document.getElementById("shift-notes").value;try{(await R.post("/pos/shift/close",{actual_cash:o,notes:a})).success&&(M("Shift reconciled and closed successfully","success"),t.remove())}catch(r){M(r.message,"error")}})}let _e="ALL",rt="stock-list";function Jh(n){n.innerHTML=`
    <div class="page-header">
      <div>
        <h1 class="page-title">Inventory & Multi-Warehouse Suite</h1>
        <p class="page-subtitle">Master product lifecycle, warehouse hub network, category hierarchy, inter-warehouse transfers & perpetual stock ledger</p>
      </div>
      <div style="display:flex; gap:0.75rem; flex-wrap:wrap;">
        <button class="btn btn-outline" id="btn-open-labels-modal">
          🏷️ Barcode Labels
        </button>
        <button class="btn btn-outline" id="btn-open-transfer-modal">
          🔄 Inter-Warehouse Transfer
        </button>
        <button class="btn btn-outline" id="btn-open-adjust-modal">
          ⚖️ Adjust Stock
        </button>
        <button class="btn btn-primary" id="btn-open-add-product-modal">
          + Add Product
        </button>
      </div>
    </div>

    <!-- INVENTORY TABS -->
    <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:0.5rem; overflow-x:auto;">
      <button class="btn btn-outline btn-sm ${rt==="stock-list"?"active":""} inv-tab-btn" data-tab="stock-list">📦 Master Catalog & Stock</button>
      <button class="btn btn-outline btn-sm ${rt==="warehouses"?"active":""} inv-tab-btn" data-tab="warehouses">🏢 Warehouse Hubs & Depots</button>
      <button class="btn btn-outline btn-sm ${rt==="categories"?"active":""} inv-tab-btn" data-tab="categories">🏷️ Category Manager</button>
      <button class="btn btn-outline btn-sm ${rt==="batches"?"active":""} inv-tab-btn" data-tab="batches">⏳ Batch & Expiry Radar</button>
      <button class="btn btn-outline btn-sm ${rt==="ledger"?"active":""} inv-tab-btn" data-tab="ledger">📜 Perpetual Stock Ledger</button>
    </div>

    <div id="inv-tab-content">
      <!-- Dynamic Tab View -->
    </div>
  `,Qh(),yr()}function Qh(){var t,e,i,s;const n=document.querySelectorAll(".inv-tab-btn");n.forEach(o=>{o.addEventListener("click",()=>{n.forEach(a=>a.classList.remove("active")),o.classList.add("active"),rt=o.dataset.tab,yr()})}),(t=document.getElementById("btn-open-add-product-modal"))==null||t.addEventListener("click",()=>Wi(null)),(e=document.getElementById("btn-open-transfer-modal"))==null||e.addEventListener("click",vr),(i=document.getElementById("btn-open-adjust-modal"))==null||i.addEventListener("click",sf),(s=document.getElementById("btn-open-labels-modal"))==null||s.addEventListener("click",of)}function yr(){rt==="stock-list"?ie():rt==="warehouses"?qe():rt==="categories"?Ln():rt==="batches"?Zh():rt==="ledger"&&hs()}function ie(){var i,s;const n=document.getElementById("inv-tab-content");if(!n)return;const t=_.categories||[],e=_e==="ALL"?_.products:_.products.filter(o=>String(o.category_id)===String(_e));n.innerHTML=`
    <!-- Category Filter Chips -->
    <div style="display:flex; gap:0.5rem; margin-bottom:1rem; overflow-x:auto; padding-bottom:0.25rem;">
      <button class="chip-btn ${_e==="ALL"?"active":""} cat-filter-chip" data-cat="ALL">
        All Categories (${_.products.length})
      </button>
      ${t.map(o=>`
        <button class="chip-btn ${String(_e)===String(o.id)?"active":""} cat-filter-chip" data-cat="${o.id}">
          ${o.name}
        </button>
      `).join("")}
    </div>

    <div class="glass-panel">
      <div class="panel-header" style="flex-wrap:wrap; gap:0.75rem;">
        <div>
          <h3 class="panel-title">Master Product Inventory Catalog</h3>
          <span style="font-size:0.8rem; color:var(--text-muted);">${e.length} Items Listed</span>
        </div>
        <div style="display:flex; gap:0.75rem; align-items:center;">
          <input type="text" id="inv-search" placeholder="Search SKU, Barcode, Name..." class="form-control" style="width:280px;" />
          <button class="btn btn-primary btn-sm" id="btn-tab-add-prod">+ Add Product</button>
        </div>
      </div>
      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>SKU / Barcode</th>
              <th>Product Details</th>
              <th>Category</th>
              <th>Cost Price</th>
              <th>Selling Price</th>
              <th>Margin</th>
              <th>Current Stock</th>
              <th>Tracking</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody id="inv-table-body">
            ${e.length===0?`
              <tr>
                <td colspan="9" style="text-align:center; padding:2rem; color:var(--text-muted);">
                  No products found. Click <strong>+ Add Product</strong> to create one.
                </td>
              </tr>
            `:e.map(o=>{const a=o.selling_price>0?((o.selling_price-o.cost_price)/o.selling_price*100).toFixed(1):0,r=Number(o.stock)<=Number(o.reorder_level||10);return`
                <tr id="prod-row-${o.id}">
                  <td>
                    <div style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${o.sku}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">${o.barcode||"No Barcode"}</div>
                  </td>
                  <td>
                    <div style="font-weight:700; color:#ffffff; font-size:0.92rem;">${o.name}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">UOM: ${o.uom||"Pcs"} ${o.tax_rate?`• Tax: ${o.tax_rate}%`:""}</div>
                  </td>
                  <td><span class="tag tag-info">${o.category_name||"General"}</span></td>
                  <td>${T(o.cost_price)}</td>
                  <td style="font-weight:700; color:#38bdf8;">${T(o.selling_price)}</td>
                  <td>
                    <span style="font-size:0.8rem; font-weight:600; color:${a>=20?"#34d399":a>0?"#fbbf24":"#f87171"};">
                      ${a}%
                    </span>
                  </td>
                  <td>
                    <span class="tag ${r?"tag-danger":"tag-success"}" title="Reorder alert trigger: ${o.reorder_level||10}">
                      ${o.stock||0} ${o.uom||"Pcs"} ${r?"⚠️ Low":"✓ Good"}
                    </span>
                  </td>
                  <td>
                    ${o.is_batch_tracked?'<span class="tag tag-warning">Batch & Exp</span>':'<span style="color:var(--text-muted); font-size:0.8rem;">Standard</span>'}
                  </td>
                  <td style="text-align:right;">
                    <div style="display:inline-flex; gap:0.35rem;">
                      <button class="btn btn-outline btn-xs edit-prod-btn" data-id="${o.id}" title="Edit Product Specs & Pricing">✏️ Edit</button>
                      <button class="btn btn-outline btn-xs quick-add-cart-btn" data-prod-id="${o.id}" title="Send 1 Unit to POS Cart">+ POS</button>
                      <button class="btn btn-outline btn-xs text-danger delete-prod-btn" data-id="${o.id}" title="Deactivate Product">🗑️</button>
                    </div>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,(i=document.getElementById("inv-search"))==null||i.addEventListener("input",o=>{const a=o.target.value.toLowerCase();document.querySelectorAll("#inv-table-body tr").forEach(l=>{const c=l.textContent.toLowerCase();l.style.display=c.includes(a)?"":"none"})}),document.querySelectorAll(".cat-filter-chip").forEach(o=>{o.addEventListener("click",()=>{_e=o.dataset.cat,ie()})}),(s=document.getElementById("btn-tab-add-prod"))==null||s.addEventListener("click",()=>Wi(null)),document.querySelectorAll(".edit-prod-btn").forEach(o=>{o.addEventListener("click",()=>{const a=_.products.find(r=>r.id===Number(o.dataset.id));a&&Wi(a)})}),document.querySelectorAll(".delete-prod-btn").forEach(o=>{o.addEventListener("click",()=>{const a=_.products.find(r=>r.id===Number(o.dataset.id));a&&tf(a)})}),document.querySelectorAll(".quick-add-cart-btn").forEach(o=>{o.addEventListener("click",()=>{const a=_.products.find(r=>r.id===Number(o.dataset.prodId));a&&(_.posCart.items.push({product_id:a.id,name:a.name,sku:a.sku,unit_price:Number(a.selling_price),tax_rate:Number(a.tax_rate||18),quantity:1}),M(`Sent ${a.name} to POS register cart!`,"success"))})})}async function qe(){var t;const n=document.getElementById("inv-tab-content");if(n){try{const e=await R.get("/inventory/warehouses");e.success&&(_.warehouses=e.warehouses)}catch(e){console.error("Failed to reload warehouses:",e)}n.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
      <div>
        <h3 style="font-size:1.15rem; font-weight:700;">Multi-Warehouse Network</h3>
        <p style="font-size:0.85rem; color:var(--text-muted);">Manage physical storage depots, distribution centers and stock allocations</p>
      </div>
      <button class="btn btn-primary" id="btn-add-warehouse">+ Add Storage Hub / Warehouse</button>
    </div>

    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.25rem;">
      ${_.warehouses.map(e=>`
        <div class="glass-panel" style="position:relative; display:flex; flex-direction:column;">
          ${e.is_default?'<span class="tag tag-info" style="position:absolute; top:1.25rem; right:1.25rem;">Default Hub</span>':""}
          <div style="display:flex; align-items:center; gap:0.6rem; margin-bottom:0.5rem;">
            <span style="font-size:1.5rem;">🏢</span>
            <div>
              <h3 style="font-size:1.15rem; font-weight:700; margin:0;">${e.name}</h3>
              <div style="font-family:var(--font-mono); font-size:0.78rem; color:#38bdf8;">Code: ${e.code}</div>
            </div>
          </div>
          <p style="font-size:0.85rem; color:var(--text-secondary); margin:0.4rem 0;">📍 ${e.address||"Address Not Specified"}</p>
          <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom:1rem;">📞 ${e.phone||"No Phone"}</p>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.5rem; background:rgba(0,0,0,0.2); padding:0.75rem; border-radius:8px; margin-bottom:1.25rem;">
            <div>
              <div style="font-size:0.72rem; color:var(--text-muted); text-transform:uppercase;">Stocked Units</div>
              <div style="font-size:1.1rem; font-weight:700; color:#34d399;">${e.total_stock_units||0}</div>
            </div>
            <div>
              <div style="font-size:0.72rem; color:var(--text-muted); text-transform:uppercase;">Unique SKUs</div>
              <div style="font-size:1.1rem; font-weight:700; color:#38bdf8;">${e.unique_products_count||0}</div>
            </div>
          </div>

          <div style="margin-top:auto; display:flex; gap:0.5rem;">
            <button class="btn btn-outline btn-sm edit-wh-btn" data-id="${e.id}" style="flex:1;">✏️ Edit</button>
            <button class="btn btn-outline btn-sm transfer-from-wh-btn" data-id="${e.id}" style="flex:1;">🔄 Dispatch</button>
            ${e.is_default?"":`<button class="btn btn-outline btn-sm text-danger delete-wh-btn" data-id="${e.id}">🗑️</button>`}
          </div>
        </div>
      `).join("")}
    </div>
  `,(t=document.getElementById("btn-add-warehouse"))==null||t.addEventListener("click",()=>jo(null)),document.querySelectorAll(".edit-wh-btn").forEach(e=>{e.addEventListener("click",()=>{const i=_.warehouses.find(s=>s.id===Number(e.dataset.id));i&&jo(i)})}),document.querySelectorAll(".transfer-from-wh-btn").forEach(e=>{e.addEventListener("click",()=>{vr(Number(e.dataset.id))})}),document.querySelectorAll(".delete-wh-btn").forEach(e=>{e.addEventListener("click",()=>{const i=_.warehouses.find(s=>s.id===Number(e.dataset.id));i&&ef(i)})})}}async function Ln(){var t;const n=document.getElementById("inv-tab-content");if(n){try{const e=await R.get("/inventory/categories");e.success&&(_.categories=e.categories)}catch(e){console.error("Failed to reload categories:",e)}n.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
      <div>
        <h3 style="font-size:1.15rem; font-weight:700;">Product Categories Hierarchy</h3>
        <p style="font-size:0.85rem; color:var(--text-muted);">Organize master product line, tax classification, and POS category chips</p>
      </div>
      <button class="btn btn-primary" id="btn-add-category">+ Add New Category</button>
    </div>

    <div class="glass-panel">
      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Code</th>
              <th>Category Name</th>
              <th>Description</th>
              <th>Assigned Active Products</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${_.categories.map(e=>`
              <tr>
                <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${e.code||"CAT-"+e.id}</td>
                <td style="font-weight:700; color:#ffffff; font-size:0.95rem;">${e.name}</td>
                <td style="color:var(--text-secondary);">${e.description||"No description provided"}</td>
                <td>
                  <span class="tag tag-info">${e.product_count||0} Products</span>
                </td>
                <td style="text-align:right;">
                  <div style="display:inline-flex; gap:0.35rem;">
                    <button class="btn btn-outline btn-xs edit-cat-btn" data-id="${e.id}">✏️ Edit</button>
                    <button class="btn btn-outline btn-xs text-danger delete-cat-btn" data-id="${e.id}">🗑️ Delete</button>
                  </div>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,(t=document.getElementById("btn-add-category"))==null||t.addEventListener("click",()=>Ho(null)),document.querySelectorAll(".edit-cat-btn").forEach(e=>{e.addEventListener("click",()=>{const i=_.categories.find(s=>s.id===Number(e.dataset.id));i&&Ho(i)})}),document.querySelectorAll(".delete-cat-btn").forEach(e=>{e.addEventListener("click",()=>{const i=_.categories.find(s=>s.id===Number(e.dataset.id));i&&nf(i)})})}}async function Zh(){const n=document.getElementById("inv-tab-content");if(n)try{const e=(await R.get("/inventory/batches/expiry")).batches||[];n.innerHTML=`
      <div class="glass-panel">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">Batch Numbers & Shelf Expiration Countdown</h3>
            <span style="font-size:0.8rem; color:var(--text-muted);">FIFO / FEFO Regulatory Compliance (Food, Pharma & Beverages)</span>
          </div>
        </div>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Batch Number</th>
                <th>Product SKU & Name</th>
                <th>Expiry Date</th>
                <th>Days Remaining</th>
                <th>Stock Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${e.map(i=>`
                <tr>
                  <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${i.batch_number}</td>
                  <td>
                    <div style="font-weight:600; color:#ffffff;">${i.product_name}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">${i.product_sku}</div>
                  </td>
                  <td>${i.expiry_date}</td>
                  <td style="font-weight:700;">${i.days_until_expiry} days</td>
                  <td style="font-weight:700;">${i.stock} units</td>
                  <td>
                    <span class="tag ${i.status==="EXPIRED"?"tag-danger":i.status==="EXPIRING_SOON"?"tag-warning":"tag-success"}">
                      ${i.status}
                    </span>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}catch(t){M(t.message,"error")}}async function hs(){var t;const n=document.getElementById("inv-tab-content");if(n)try{const i=(await R.get("/inventory/ledger")).ledger||[];n.innerHTML=`
      <div class="glass-panel">
        <div class="panel-header">
          <div>
            <h3 class="panel-title">Perpetual Stock Movement Audit Trail</h3>
            <span style="font-size:0.8rem; color:var(--text-muted);">Complete immutable ledger of all Goods In, Goods Out, Transfers & Reconciliations</span>
          </div>
          <button class="btn btn-outline btn-sm" id="btn-refresh-ledger">🔄 Refresh</button>
        </div>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Transaction Type</th>
                <th>Product SKU / Name</th>
                <th>Warehouse Depot</th>
                <th>Quantity</th>
                <th>Unit Value</th>
                <th>Reference / Notes</th>
              </tr>
            </thead>
            <tbody>
              ${i.length===0?`
                <tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">No stock movements logged yet.</td></tr>
              `:i.map(s=>{const o=Number(s.quantity)>0;let a="tag-info";return s.transaction_type.includes("TRANSFER")?a="tag-warning":s.transaction_type==="SALE"||s.transaction_type==="POS"?a="tag-danger":s.transaction_type==="PURCHASE"&&(a="tag-success"),`
                  <tr>
                    <td style="font-family:var(--font-mono); font-size:0.78rem;">
                      ${s.created_at?new Date(s.created_at).toLocaleString("en-PK"):"Just now"}
                    </td>
                    <td><span class="tag ${a}">${s.transaction_type}</span></td>
                    <td>
                      <div style="font-weight:600; color:#fff;">${s.product_name||"Item #"+s.product_id}</div>
                      <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">${s.product_sku||""}</div>
                    </td>
                    <td>${s.warehouse_name||"Warehouse #"+s.warehouse_id}</td>
                    <td style="font-weight:700; font-family:var(--font-mono); color:${o?"#34d399":"#f87171"};">
                      ${o?"+":""}${s.quantity}
                    </td>
                    <td>${T(s.unit_cost||0)}</td>
                    <td style="font-size:0.82rem; color:var(--text-secondary);">${s.notes||s.reference_type||"Ledger Auto-Post"}</td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `,(t=document.getElementById("btn-refresh-ledger"))==null||t.addEventListener("click",hs)}catch(e){M(e.message,"error")}}function Wi(n=null){var a,r,l,c;const t=!!n,e=_.categories||[],i=_.warehouses||[],s=`
    <div class="modal-overlay" id="product-crud-modal">
      <div class="modal-content" style="max-width: 620px;">
        <div class="modal-header">
          <h3 class="modal-title">${t?"Edit Product: "+n.name:"Create New Product"}</h3>
          <button class="btn-icon btn-sm" id="btn-close-prod-modal">✕</button>
        </div>
        <form id="product-form">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Product Name *:</label>
              <input type="text" id="prod-form-name" class="form-control" value="${t?n.name:""}" placeholder="e.g. Gourmet Dark Chocolate 100g" required />
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.85rem;">
              <div class="form-group">
                <label class="form-label">SKU (Stock Keeping Unit) *:</label>
                <input type="text" id="prod-form-sku" class="form-control" value="${t?n.sku:""}" placeholder="e.g. SNK-DKCH-100" required />
              </div>
              <div class="form-group">
                <label class="form-label">Barcode (EAN-13 / UPC / Custom):</label>
                <div style="display:flex; gap:0.4rem;">
                  <input type="text" id="prod-form-barcode" class="form-control" value="${t&&n.barcode||""}" placeholder="Scan or Auto-generate" />
                  <button type="button" class="btn btn-outline btn-xs" id="btn-gen-barcode" title="Generate Random Barcode">Gen</button>
                </div>
              </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.85rem;">
              <div class="form-group">
                <label class="form-label">Category *:</label>
                <select id="prod-form-category" class="form-control" required>
                  ${e.map(d=>`
                    <option value="${d.id}" ${t&&Number(n.category_id)===d.id?"selected":""}>${d.name}</option>
                  `).join("")}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Unit of Measure (UOM):</label>
                <select id="prod-form-uom" class="form-control">
                  <option value="Pcs" ${t&&n.uom==="Pcs"?"selected":""}>Pieces (Pcs)</option>
                  <option value="Box" ${t&&n.uom==="Box"?"selected":""}>Box / Carton</option>
                  <option value="Pack" ${t&&n.uom==="Pack"?"selected":""}>Pack</option>
                  <option value="Kg" ${t&&n.uom==="Kg"?"selected":""}>Kilograms (Kg)</option>
                  <option value="Liter" ${t&&n.uom==="Liter"?"selected":""}>Liters (Ltr)</option>
                </select>
              </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr 1fr; gap:0.85rem;">
              <div class="form-group">
                <label class="form-label">Cost Price (Rs) *:</label>
                <input type="number" id="prod-form-cost" step="0.01" class="form-control" value="${t?n.cost_price:"100"}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Selling Price (Rs) *:</label>
                <input type="number" id="prod-form-selling" step="0.01" class="form-control" value="${t?n.selling_price:"150"}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Sales Tax / VAT (%):</label>
                <input type="number" id="prod-form-tax" step="0.1" class="form-control" value="${t?n.tax_rate||0:"18"}" />
              </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.85rem;">
              <div class="form-group">
                <label class="form-label">Low Stock Reorder Alert Level:</label>
                <input type="number" id="prod-form-reorder" class="form-control" value="${t?n.reorder_level||10:"10"}" />
              </div>
              <div class="form-group" style="justify-content:center;">
                <label style="display:flex; align-items:center; gap:8px; cursor:pointer; margin-top:1.25rem; font-size:0.9rem;">
                  <input type="checkbox" id="prod-form-batch-tracked" ${t&&n.is_batch_tracked?"checked":""} />
                  <span>Enforce Batch & Shelf-Life Expiry</span>
                </label>
              </div>
            </div>

            ${t?"":`
              <!-- Opening Stock for New Products -->
              <div style="background:rgba(255,255,255,0.03); padding:1rem; border-radius:8px; border:1px solid var(--border-color); margin-top:0.5rem;">
                <h4 style="font-size:0.85rem; text-transform:uppercase; color:#38bdf8; margin-bottom:0.6rem;">Initial Opening Inventory (Optional)</h4>
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.85rem;">
                  <div class="form-group">
                    <label class="form-label">Opening Quantity:</label>
                    <input type="number" id="prod-form-initial-stock" class="form-control" value="0" min="0" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Target Warehouse Location:</label>
                    <select id="prod-form-target-wh" class="form-control">
                      ${i.map(d=>`<option value="${d.id}">${d.name}</option>`).join("")}
                    </select>
                  </div>
                </div>
              </div>
            `}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="btn-cancel-prod">Cancel</button>
            <button type="submit" class="btn btn-primary" id="btn-save-prod">
              ${t?"Save Changes":"Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",s);const o=document.getElementById("product-crud-modal");(a=document.getElementById("btn-close-prod-modal"))==null||a.addEventListener("click",()=>o.remove()),(r=document.getElementById("btn-cancel-prod"))==null||r.addEventListener("click",()=>o.remove()),(l=document.getElementById("btn-gen-barcode"))==null||l.addEventListener("click",()=>{document.getElementById("prod-form-barcode").value="896"+Math.floor(1e8+Math.random()*9e8)}),(c=document.getElementById("product-form"))==null||c.addEventListener("submit",async d=>{var h,f;d.preventDefault();const u={name:document.getElementById("prod-form-name").value.trim(),sku:document.getElementById("prod-form-sku").value.trim().toUpperCase(),barcode:document.getElementById("prod-form-barcode").value.trim(),category_id:document.getElementById("prod-form-category").value,uom:document.getElementById("prod-form-uom").value,cost_price:document.getElementById("prod-form-cost").value,selling_price:document.getElementById("prod-form-selling").value,tax_rate:document.getElementById("prod-form-tax").value,reorder_level:document.getElementById("prod-form-reorder").value,is_batch_tracked:document.getElementById("prod-form-batch-tracked").checked};t||(u.initial_stock=((h=document.getElementById("prod-form-initial-stock"))==null?void 0:h.value)||0,u.warehouse_id=((f=document.getElementById("prod-form-target-wh"))==null?void 0:f.value)||1);try{if(t){const m=await R.request(`/inventory/products/${n.id}`,{method:"PUT",body:JSON.stringify(u)});m.success&&(M(`Product ${m.product.name} updated successfully!`,"success"),o.remove(),await qt(),ie())}else{const m=await R.post("/inventory/products",u);m.success&&(M(`Product ${m.product.name} created successfully!`,"success"),o.remove(),await qt(),ie())}}catch(m){M(m.message,"error")}})}function tf(n){confirm(`Are you sure you want to deactivate product: "${n.name}" (${n.sku})?`)&&R.request(`/inventory/products/${n.id}`,{method:"DELETE"}).then(async t=>{t.success&&(M(t.message||"Product deactivated","info"),await qt(),ie())}).catch(t=>M(t.message,"error"))}function jo(n=null){var s,o,a;const t=!!n,e=`
    <div class="modal-overlay" id="warehouse-crud-modal">
      <div class="modal-content" style="max-width: 520px;">
        <div class="modal-header">
          <h3 class="modal-title">${t?"Edit Warehouse: "+n.name:"Create New Warehouse / Branch Depot"}</h3>
          <button class="btn-icon btn-sm" id="btn-close-wh-modal">✕</button>
        </div>
        <form id="wh-form">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Warehouse Name *:</label>
              <input type="text" id="wh-name" class="form-control" value="${t?n.name:""}" placeholder="e.g. Islamabad Regional Fulfillment Hub" required />
            </div>
            <div class="form-group">
              <label class="form-label">Warehouse Code *:</label>
              <input type="text" id="wh-code" class="form-control" value="${t?n.code:"WH-ISB-01"}" placeholder="e.g. WH-ISB-01" required />
            </div>
            <div class="form-group">
              <label class="form-label">Address / Location:</label>
              <input type="text" id="wh-address" class="form-control" value="${t&&n.address||""}" placeholder="e.g. Plot 42, I-9 Industrial Area, Islamabad" />
            </div>
            <div class="form-group">
              <label class="form-label">Contact Phone:</label>
              <input type="text" id="wh-phone" class="form-control" value="${t&&n.phone||""}" placeholder="+92 51 8899001" />
            </div>
            <div class="form-group" style="margin-top:0.5rem;">
              <label style="display:flex; align-items:center; gap:8px; cursor:pointer;">
                <input type="checkbox" id="wh-is-default" ${t&&n.is_default?"checked":""} />
                <span>Set as Default Central Warehouse for Automatic POS Allocation</span>
              </label>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="btn-cancel-wh">Cancel</button>
            <button type="submit" class="btn btn-primary">${t?"Save Warehouse":"Create Warehouse"}</button>
          </div>
        </form>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",e);const i=document.getElementById("warehouse-crud-modal");(s=document.getElementById("btn-close-wh-modal"))==null||s.addEventListener("click",()=>i.remove()),(o=document.getElementById("btn-cancel-wh"))==null||o.addEventListener("click",()=>i.remove()),(a=document.getElementById("wh-form"))==null||a.addEventListener("submit",async r=>{r.preventDefault();const l={name:document.getElementById("wh-name").value.trim(),code:document.getElementById("wh-code").value.trim().toUpperCase(),address:document.getElementById("wh-address").value.trim(),phone:document.getElementById("wh-phone").value.trim(),is_default:document.getElementById("wh-is-default").checked};try{if(t){const c=await R.request(`/inventory/warehouses/${n.id}`,{method:"PUT",body:JSON.stringify(l)});c.success&&(M(`Warehouse ${c.warehouse.name} updated!`,"success"),i.remove(),qe())}else{const c=await R.post("/inventory/warehouses",l);c.success&&(M(`Warehouse ${c.warehouse.name} created!`,"success"),i.remove(),qe())}}catch(c){M(c.message,"error")}})}function ef(n){confirm(`Are you sure you want to deactivate warehouse "${n.name}"?`)&&R.request(`/inventory/warehouses/${n.id}`,{method:"DELETE"}).then(t=>{t.success&&(M(t.message,"info"),qe())}).catch(t=>M(t.message,"error"))}function Ho(n=null){var s,o,a;const t=!!n,e=`
    <div class="modal-overlay" id="category-crud-modal">
      <div class="modal-content" style="max-width: 480px;">
        <div class="modal-header">
          <h3 class="modal-title">${t?"Edit Category: "+n.name:"Create New Category"}</h3>
          <button class="btn-icon btn-sm" id="btn-close-cat-modal">✕</button>
        </div>
        <form id="cat-form">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Category Name *:</label>
              <input type="text" id="cat-name" class="form-control" value="${t?n.name:""}" placeholder="e.g. Frozen Foods & Dairy" required />
            </div>
            <div class="form-group">
              <label class="form-label">Category Code:</label>
              <input type="text" id="cat-code" class="form-control" value="${t&&n.code||""}" placeholder="e.g. CAT-FRZ" />
            </div>
            <div class="form-group">
              <label class="form-label">Description:</label>
              <textarea id="cat-desc" class="form-control" rows="2" placeholder="Brief description of items in this category...">${t&&n.description||""}</textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="btn-cancel-cat">Cancel</button>
            <button type="submit" class="btn btn-primary">${t?"Save Category":"Create Category"}</button>
          </div>
        </form>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",e);const i=document.getElementById("category-crud-modal");(s=document.getElementById("btn-close-cat-modal"))==null||s.addEventListener("click",()=>i.remove()),(o=document.getElementById("btn-cancel-cat"))==null||o.addEventListener("click",()=>i.remove()),(a=document.getElementById("cat-form"))==null||a.addEventListener("submit",async r=>{r.preventDefault();const l={name:document.getElementById("cat-name").value.trim(),code:document.getElementById("cat-code").value.trim().toUpperCase(),description:document.getElementById("cat-desc").value.trim()};try{if(t){const c=await R.request(`/inventory/categories/${n.id}`,{method:"PUT",body:JSON.stringify(l)});c.success&&(M(`Category ${c.category.name} updated!`,"success"),i.remove(),await qt(),Ln())}else{const c=await R.post("/inventory/categories",l);c.success&&(M(`Category ${c.category.name} created!`,"success"),i.remove(),await qt(),Ln())}}catch(c){M(c.message,"error")}})}function nf(n){confirm(`Are you sure you want to delete category "${n.name}"? Products in this category will become Uncategorized.`)&&R.request(`/inventory/categories/${n.id}`,{method:"DELETE"}).then(async t=>{t.success&&(M(t.message,"info"),await qt(),Ln())}).catch(t=>M(t.message,"error"))}function vr(n=null){var o,a,r;const t=_.warehouses||[],e=_.products||[];if(t.length<2){M("You must have at least 2 active warehouses to perform inter-warehouse transfers.","error");return}const i=`
    <div class="modal-overlay" id="transfer-modal">
      <div class="modal-content" style="max-width: 540px;">
        <div class="modal-header">
          <h3 class="modal-title">Inter-Warehouse Stock Transfer</h3>
          <button class="btn-icon btn-sm" id="btn-close-transfer-modal">✕</button>
        </div>
        <form id="transfer-form">
          <div class="modal-body">
            <div class="form-group">
              <label class="form-label">Select Product to Transfer *:</label>
              <select id="transfer-prod" class="form-control" required>
                ${e.map(l=>`
                  <option value="${l.id}">${l.name} (Total Stock: ${l.stock||0} ${l.uom||"Pcs"})</option>
                `).join("")}
              </select>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.85rem;">
              <div class="form-group">
                <label class="form-label">Source Warehouse (From) *:</label>
                <select id="transfer-from-wh" class="form-control" required>
                  ${t.map(l=>`
                    <option value="${l.id}" ${n===l.id?"selected":""}>${l.name}</option>
                  `).join("")}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Destination Warehouse (To) *:</label>
                <select id="transfer-to-wh" class="form-control" required>
                  ${t.map((l,c)=>`
                    <option value="${l.id}" ${!n&&c===1||n&&n!==l.id?"selected":""}>${l.name}</option>
                  `).join("")}
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Transfer Quantity *:</label>
              <input type="number" id="transfer-qty" class="form-control" value="10" min="1" required />
            </div>

            <div class="form-group">
              <label class="form-label">Transfer Reference / Dispatch Vehicle / Driver Notes:</label>
              <input type="text" id="transfer-notes" class="form-control" placeholder="e.g. Transfer via Van LHR-4821 (Driver Tariq)" value="Branch Replenishment Batch #091" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline" id="btn-cancel-transfer">Cancel</button>
            <button type="submit" class="btn btn-primary" id="btn-submit-transfer">Dispatch & Transfer Stock</button>
          </div>
        </form>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",i);const s=document.getElementById("transfer-modal");(o=document.getElementById("btn-close-transfer-modal"))==null||o.addEventListener("click",()=>s.remove()),(a=document.getElementById("btn-cancel-transfer"))==null||a.addEventListener("click",()=>s.remove()),(r=document.getElementById("transfer-form"))==null||r.addEventListener("submit",async l=>{l.preventDefault();const c=document.getElementById("transfer-prod").value,d=document.getElementById("transfer-from-wh").value,u=document.getElementById("transfer-to-wh").value,h=document.getElementById("transfer-qty").value,f=document.getElementById("transfer-notes").value;if(d===u){M("Source and destination warehouses must be different!","error");return}try{const m=await R.post("/inventory/transfer-stock",{product_id:c,from_warehouse_id:d,to_warehouse_id:u,quantity:h,notes:f});m.success&&(M(m.message,"success"),s.remove(),await qt(),rt==="warehouses"?qe():rt==="ledger"?hs():ie())}catch(m){M(m.message,"error")}})}function sf(){var e,i,s;const n=`
    <div class="modal-overlay" id="adjust-modal">
      <div class="modal-content" style="max-width: 520px;">
        <div class="modal-header">
          <h3 class="modal-title">Inventory Stock Adjustment</h3>
          <button class="btn-icon btn-sm" id="btn-close-adjust-modal">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Select Product:</label>
            <select id="adj-product" class="form-control">
              ${_.products.map(o=>`<option value="${o.id}">${o.name} (Current: ${o.stock||0})</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Warehouse Location:</label>
            <select id="adj-warehouse" class="form-control">
              ${_.warehouses.map(o=>`<option value="${o.id}">${o.name}</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Adjustment Quantity (+ to Add, - to Deduct):</label>
            <input type="number" id="adj-qty" value="10" class="form-control" />
          </div>
          <div class="form-group">
            <label class="form-label">Reason / Reference:</label>
            <input type="text" id="adj-reason" value="Cycle Count Physical Audit Reconciliation" class="form-control" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-dismiss-adjust">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-adjust">Apply Adjustment</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("adjust-modal");(e=document.getElementById("btn-close-adjust-modal"))==null||e.addEventListener("click",()=>t.remove()),(i=document.getElementById("btn-dismiss-adjust"))==null||i.addEventListener("click",()=>t.remove()),(s=document.getElementById("btn-confirm-adjust"))==null||s.addEventListener("click",async()=>{const o=document.getElementById("adj-product").value,a=document.getElementById("adj-warehouse").value,r=document.getElementById("adj-qty").value,l=document.getElementById("adj-reason").value;try{const c=await R.post("/inventory/adjust-stock",{product_id:o,warehouse_id:a,quantity:r,reason:l});c.success&&(M(c.message,"success"),t.remove(),await qt(),ie())}catch(c){M(c.message,"error")}})}function of(){var i,s,o,a;const n=_.products[0]||{name:"Sample Item",barcode:"896400010101",selling_price:150},t=`
    <div class="modal-overlay" id="barcode-labels-modal">
      <div class="modal-content" style="max-width: 650px;">
        <div class="modal-header">
          <h3 class="modal-title">Barcode Label Designer & Sheet Printing</h3>
          <button class="btn-icon btn-sm" id="btn-close-label-modal">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group" style="margin-bottom:1rem;">
            <label class="form-label">Select Product for Label Sheet:</label>
            <select id="label-product-picker" class="form-control">
              ${_.products.map(r=>`
                <option value="${r.id}">${r.name} (${r.barcode||r.sku})</option>
              `).join("")}
            </select>
          </div>

          <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:0.75rem;">
            Preview for thermal adhesive rolls or standard 3x8 A4 label sheets:
          </p>

          <div id="label-sheet-preview" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(170px, 1fr)); gap:10px; padding:15px; background:#ffffff; color:#000000; border-radius:6px; margin:10px 0;">
            ${[1,2,3,4,5,6].map(()=>`
              <div style="border:1px dashed #333; padding:8px; text-align:center; font-family:monospace;">
                <div style="font-weight:bold; font-size:11px;">ONENET SOLUTIONS</div>
                <div style="font-size:10px; margin:2px 0;">${n.name.slice(0,22)}</div>
                <div style="font-weight:bold; font-size:18px; letter-spacing:3px; margin:4px 0;">||| | |||| | ||</div>
                <div style="font-size:9px;">${n.barcode||n.sku}</div>
                <div style="font-weight:bold; font-size:12px; margin-top:2px;">${T(n.selling_price)}</div>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-dismiss-label">Close</button>
          <button class="btn btn-primary" id="btn-print-labels">🖨️ Print Label Sheet</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",t);const e=document.getElementById("barcode-labels-modal");(i=document.getElementById("btn-close-label-modal"))==null||i.addEventListener("click",()=>e.remove()),(s=document.getElementById("btn-dismiss-label"))==null||s.addEventListener("click",()=>e.remove()),(o=document.getElementById("label-product-picker"))==null||o.addEventListener("change",r=>{const l=_.products.find(d=>d.id===Number(r.target.value))||n,c=document.getElementById("label-sheet-preview");c&&(c.innerHTML=[1,2,3,4,5,6].map(()=>`
        <div style="border:1px dashed #333; padding:8px; text-align:center; font-family:monospace;">
          <div style="font-weight:bold; font-size:11px;">ONENET SOLUTIONS</div>
          <div style="font-size:10px; margin:2px 0;">${l.name.slice(0,22)}</div>
          <div style="font-weight:bold; font-size:18px; letter-spacing:3px; margin:4px 0;">||| | |||| | ||</div>
          <div style="font-size:9px;">${l.barcode||l.sku}</div>
          <div style="font-weight:bold; font-size:12px; margin-top:2px;">${T(l.selling_price)}</div>
        </div>
      `).join(""))}),(a=document.getElementById("btn-print-labels"))==null||a.addEventListener("click",()=>{var c;const r=(c=document.getElementById("label-product-picker"))==null?void 0:c.value,l=_.products.find(d=>d.id===Number(r))||n;Wh(l,12)})}async function qt(){try{const[n,t,e]=await Promise.all([R.get("/inventory/products"),R.get("/inventory/categories"),R.get("/inventory/warehouses")]);n.success&&(_.products=n.products),t.success&&(_.categories=t.categories),e.success&&(_.warehouses=e.warehouses)}catch(n){console.error("Failed refreshing inventory data:",n)}}async function af(n){n.innerHTML=`
    <div class="page-header">
      <div>
        <h1 class="page-title">Sales & E-Invoicing Management</h1>
        <p class="page-subtitle">End-to-end sales lifecycle: Quotations, Sales Orders, Challans, Invoices & FBR/ZATCA QR Codes</p>
      </div>
      <div style="display:flex; gap:0.75rem;">
        <button class="btn btn-primary" id="btn-create-invoice-modal">
          + New Sales Invoice
        </button>
      </div>
    </div>

    <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:0.5rem;">
      <button class="btn btn-outline btn-sm active sales-tab-btn" data-tab="invoices">Tax Invoices (E-Invoicing)</button>
      <button class="btn btn-outline btn-sm sales-tab-btn" data-tab="orders">Sales Orders (Field & Web)</button>
      <button class="btn btn-outline btn-sm sales-tab-btn" data-tab="customers">Customer Accounts & Receivables</button>
    </div>

    <div id="sales-tab-content">
      <!-- Dynamic sales tab content -->
    </div>
  `,await fs(),cf()}async function fs(){const n=document.getElementById("sales-tab-content");if(n)try{const e=(await R.get("/sales/invoices")).invoices||[];n.innerHTML=`
      <div class="glass-panel">
        <div class="panel-header">
          <h3 class="panel-title">E-Invoices Registry</h3>
          <span class="tag tag-info">FBR / ZATCA QR Compliant</span>
        </div>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Total Amount</th>
                <th>Paid Amount</th>
                <th>Balance Due</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${e.map(i=>`
                <tr>
                  <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${i.invoice_number}</td>
                  <td>${i.invoice_date}</td>
                  <td style="font-weight:600; color:#ffffff;">${i.customer_name}</td>
                  <td style="font-weight:700;">${T(i.total_amount)}</td>
                  <td>${T(i.paid_amount)}</td>
                  <td style="color:${i.balance_amount>0?"#f87171":"#34d399"}; font-weight:700;">${T(i.balance_amount)}</td>
                  <td>
                    <span class="tag ${i.status==="PAID"?"tag-success":"tag-warning"}">${i.status}</span>
                  </td>
                  <td>
                    <button class="btn btn-outline btn-sm view-einvoice-btn" data-inv-id="${i.id}">View / Print QR</button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `,document.querySelectorAll(".view-einvoice-btn").forEach(i=>{i.addEventListener("click",()=>{const s=e.find(o=>o.id===Number(i.dataset.invId));s&&xr(s)})})}catch(t){M(t.message,"error")}}async function rf(){const n=document.getElementById("sales-tab-content");if(n)try{const e=(await R.get("/sales/orders")).orders||[];n.innerHTML=`
      <div class="glass-panel">
        <div class="panel-header">
          <h3 class="panel-title">Sales Orders (Field Booker & Web)</h3>
        </div>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Order Date</th>
                <th>Customer</th>
                <th>Booked By</th>
                <th>Total Amount</th>
                <th>Geo Location</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${e.map(i=>`
                <tr>
                  <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${i.order_number}</td>
                  <td>${i.order_date}</td>
                  <td style="font-weight:600; color:#ffffff;">${i.customer_name}</td>
                  <td>${i.salesperson_name}</td>
                  <td style="font-weight:700;">${T(i.total_amount)}</td>
                  <td>
                    ${i.geo_latitude?`<span class="tag tag-info">📍 ${Number(i.geo_latitude).toFixed(4)}, ${Number(i.geo_longitude).toFixed(4)}</span>`:'<span style="color:var(--text-muted);">Web Order</span>'}
                  </td>
                  <td><span class="tag tag-success">${i.status}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}catch(t){M(t.message,"error")}}function lf(){const n=document.getElementById("sales-tab-content");n&&(n.innerHTML=`
    <div class="glass-panel">
      <div class="panel-header">
        <h3 class="panel-title">Customer Directory & Credit Aging</h3>
      </div>
      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Business / Customer Name</th>
              <th>Phone</th>
              <th>Address & City</th>
              <th>Tax ID / NTN</th>
              <th>Credit Limit</th>
              <th>Current Balance Due</th>
            </tr>
          </thead>
          <tbody>
            ${_.customers.map(t=>`
              <tr>
                <td>
                  <div style="font-weight:700; color:#ffffff;">${t.business_name||t.name}</div>
                  <div style="font-size:0.75rem; color:var(--text-muted);">${t.name}</div>
                </td>
                <td>${t.phone}</td>
                <td>${t.address}, ${t.city}</td>
                <td style="font-family:var(--font-mono);">${t.tax_number||"Unregistered"}</td>
                <td>${T(t.credit_limit)}</td>
                <td style="font-weight:700; color:${t.current_balance>0?"#f87171":"#34d399"};">
                  ${T(t.current_balance)}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `)}function cf(){var t;const n=document.querySelectorAll(".sales-tab-btn");n.forEach(e=>{e.addEventListener("click",()=>{n.forEach(s=>s.classList.remove("active")),e.classList.add("active");const i=e.dataset.tab;i==="invoices"?fs():i==="orders"?rf():i==="customers"&&lf()})}),(t=document.getElementById("btn-create-invoice-modal"))==null||t.addEventListener("click",df)}function xr(n){var i,s,o;const t=`
    <div class="modal-overlay" id="einvoice-modal">
      <div class="modal-content" style="max-width: 650px;">
        <div class="modal-header">
          <h3 class="modal-title">E-Invoice #${n.invoice_number}</h3>
          <button class="btn-icon btn-sm" id="btn-close-inv-modal">✕</button>
        </div>
        <div class="modal-body" style="background:#ffffff; color:#0f172a; padding:2rem; border-radius:8px;">
          <!-- Professional Tax Invoice Layout -->
          <div style="display:flex; justify-content:space-between; border-bottom:2px solid #0f172a; padding-bottom:1rem; margin-bottom:1rem;">
            <div>
              <h2 style="font-family:var(--font-heading); color:#0284c7; margin:0;">OneNet Solutions</h2>
              <p style="margin:2px 0; font-size:12px; color:#475569;">OneNet Solutions Enterprise Suite</p>
              <p style="margin:2px 0; font-size:12px; color:#475569;">Muslim Town, Lahore, Pakistan</p>
              <p style="margin:2px 0; font-size:12px; color:#475569;">NTN: 7492019-2 | STRN: 11-22-3344-555</p>
            </div>
            <div style="text-align:right;">
              <h3 style="margin:0; color:#0f172a;">TAX INVOICE</h3>
              <p style="margin:2px 0; font-weight:bold; font-size:14px;">${n.invoice_number}</p>
              <p style="margin:2px 0; font-size:12px;">Date: ${n.invoice_date||new Date().toISOString().slice(0,10)}</p>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; margin-bottom:1.5rem; font-size:13px;">
            <div>
              <strong>Billed To:</strong>
              <div>${n.customer_name}</div>
              <div style="color:#475569;">Payment Status: <strong>${n.status}</strong></div>
            </div>
            <!-- FBR/ZATCA E-Invoice QR Code -->
            <div style="text-align:center;">
              <img src="${n.einvoice_qr_code}" alt="E-Invoice QR" style="width:100px; height:100px; border:1px solid #cbd5e1; padding:4px;" />
              <div style="font-size:9px; color:#64748b; margin-top:2px;">FBR/ZATCA Verified</div>
            </div>
          </div>

          <table style="width:100%; border-collapse:collapse; font-size:13px; margin-bottom:1.5rem;">
            <thead>
              <tr style="background:#f1f5f9; border-bottom:1px solid #cbd5e1; text-align:left;">
                <th style="padding:8px;">Description</th>
                <th style="padding:8px; text-align:center;">Qty</th>
                <th style="padding:8px; text-align:right;">Price</th>
                <th style="padding:8px; text-align:right;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${n.items.map(a=>`
                <tr style="border-bottom:1px solid #e2e8f0;">
                  <td style="padding:8px;">${a.name}</td>
                  <td style="padding:8px; text-align:center;">${a.quantity}</td>
                  <td style="padding:8px; text-align:right;">${a.unit_price.toFixed(2)}</td>
                  <td style="padding:8px; text-align:right; font-weight:bold;">${a.total_price.toFixed(2)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <div style="display:flex; justify-content:flex-end;">
            <div style="width:260px; font-size:13px;">
              <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Subtotal:</span><span>${T(n.subtotal)}</span></div>
              <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Sales Tax (18%):</span><span>${T(n.tax_amount)}</span></div>
              <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Discount:</span><span>-${T(n.discount_amount)}</span></div>
              <div style="display:flex; justify-content:space-between; padding:6px 0; border-top:2px solid #0f172a; font-weight:bold; font-size:15px; color:#0284c7;">
                <span>Total Amount:</span><span>${T(n.total_amount)}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-close-inv">Close</button>
          <button class="btn btn-primary" id="btn-print-sales-invoice">🖨️ Print Invoice</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",t);const e=document.getElementById("einvoice-modal");(i=document.getElementById("btn-close-inv-modal"))==null||i.addEventListener("click",()=>e.remove()),(s=document.getElementById("btn-close-inv"))==null||s.addEventListener("click",()=>e.remove()),(o=document.getElementById("btn-print-sales-invoice"))==null||o.addEventListener("click",()=>qh(n))}async function df(){var r,l,c,d,u,h;const n=document.getElementById("create-inv-modal");if(n&&n.remove(),!_.products||_.products.length===0)try{const f=await R.get("/inventory/products");f.success&&(_.products=f.products)}catch(f){console.warn("Could not load products:",f)}if(!_.customers||_.customers.length===0)try{const f=await R.get("/sales/customers");f.success&&(_.customers=f.customers)}catch(f){console.warn("Could not load customers:",f)}const t=_.products[0]||{id:1,selling_price:100,tax_rate:18};let e=[{product_id:t.id,quantity:1,unit_price:Number(t.selling_price)||100,tax_rate:Number(t.tax_rate)||18}];const i=`
    <div class="modal-overlay" id="create-inv-modal" style="backdrop-filter: blur(8px); z-index:9999;">
      <div class="modal-content" style="max-width: 960px; width: 95%; max-height: 90vh; display:flex; flex-direction:column; padding: 1.75rem; border-radius: 16px; background: var(--bg-card); border: 1px solid var(--border-bright); box-shadow: 0 25px 60px -15px rgba(0,0,0,0.8);">
        <div class="modal-header" style="padding-bottom:1rem; border-bottom:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <div style="display:inline-flex; align-items:center; gap:6px; background:rgba(56,189,248,0.12); color:#38bdf8; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:700; margin-bottom:4px;">
              🧾 MULTI-PRODUCT E-INVOICE BUILDER
            </div>
            <h3 class="modal-title" style="font-size:1.35rem; font-weight:800; margin:0;">Generate New Tax E-Invoice</h3>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:3px 0 0 0;">Add multiple items, calculate tax rates, and post automated double-entry ledger entries.</p>
          </div>
          <button class="btn-icon btn-sm" id="btn-close-create-inv" style="border:none; cursor:pointer;">✕</button>
        </div>

        <div class="modal-body" style="overflow-y:auto; padding:1.25rem 0; flex:1;">
          <!-- Top Row: Customer, Warehouse, Date -->
          <div style="display:grid; grid-template-columns: 2fr 1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-weight:700; font-size:0.82rem;">Select Customer / Client:</label>
              <select id="new-inv-cust" class="form-control" style="font-size:0.9rem;">
                ${_.customers.map(f=>`
                  <option value="${f.id}">${f.business_name||f.name} (Balance: ${T(f.current_balance||0)})</option>
                `).join("")}
              </select>
            </div>
            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-weight:700; font-size:0.82rem;">Dispatch Warehouse:</label>
              <select id="new-inv-wh" class="form-control" style="font-size:0.9rem;">
                ${(_.warehouses||[{id:1,name:"Central Logistics Hub"}]).map(f=>`
                  <option value="${f.id}">${f.name}</option>
                `).join("")}
              </select>
            </div>
            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-weight:700; font-size:0.82rem;">Invoice Date:</label>
              <input type="date" id="new-inv-date" class="form-control" value="${new Date().toISOString().slice(0,10)}" style="font-size:0.9rem;" />
            </div>
          </div>

          <!-- Product Line Items Section -->
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
            <h4 style="font-size:0.95rem; font-weight:700; margin:0; color:var(--text-main);">
              Invoice Products & Line Items (<span id="inv-item-count">1</span>)
            </h4>
            <button type="button" class="btn btn-outline btn-sm" id="btn-add-line-item" style="color:#38bdf8; border-color:rgba(56,189,248,0.4); font-weight:700;">
              + Add Product Item
            </button>
          </div>

          <!-- Products Table -->
          <div style="border:1px solid var(--border-color); border-radius:10px; overflow:hidden; background:var(--bg-input); margin-bottom:1.5rem;">
            <table style="width:100%; border-collapse:collapse; font-size:0.85rem;">
              <thead>
                <tr style="background:rgba(255,255,255,0.04); border-bottom:1px solid var(--border-color); text-align:left; color:var(--text-muted); font-size:0.75rem; text-transform:uppercase;">
                  <th style="padding:10px 8px; text-align:center; width:35px;">#</th>
                  <th style="padding:10px 8px;">Product Item</th>
                  <th style="padding:10px 8px; text-align:right; width:125px;">Unit Price (Rs)</th>
                  <th style="padding:10px 8px; text-align:center; width:95px;">Qty</th>
                  <th style="padding:10px 8px; text-align:center; width:90px;">Tax %</th>
                  <th style="padding:10px 8px; text-align:right; width:130px;">Line Total</th>
                  <th style="padding:10px 8px; text-align:center; width:45px;"></th>
                </tr>
              </thead>
              <tbody id="invoice-items-tbody">
                <!-- Dynamically rendered -->
              </tbody>
            </table>
          </div>

          <!-- Invoice Summary & Payment Terms -->
          <div style="display:grid; grid-template-columns: 1.2fr 1fr; gap:1.5rem;">
            <div>
              <div class="form-group" style="margin-bottom:0.85rem;">
                <label class="form-label" style="font-size:0.8rem; font-weight:600;">Invoice Notes / Delivery Terms:</label>
                <textarea id="new-inv-notes" class="form-control" rows="2" placeholder="e.g. Standard 30-day payment term. Goods received in sound condition." style="font-size:0.85rem;"></textarea>
              </div>
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.75rem;">
                <div class="form-group" style="margin:0;">
                  <label class="form-label" style="font-size:0.8rem; font-weight:600;">Overall Discount (Rs):</label>
                  <input type="number" id="new-inv-discount" class="form-control" value="0" min="0" style="font-size:0.9rem;" />
                </div>
                <div class="form-group" style="margin:0;">
                  <label class="form-label" style="font-size:0.8rem; font-weight:600;">Amount Received / Paid (Rs):</label>
                  <input type="number" id="new-inv-paid" class="form-control" value="0" min="0" style="font-size:0.9rem; font-weight:700; color:#34d399;" />
                </div>
              </div>
            </div>

            <!-- Calculation Box -->
            <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:12px; padding:1.1rem; font-size:0.88rem;">
              <div style="display:flex; justify-content:space-between; margin-bottom:6px; color:var(--text-muted);">
                <span>Items Subtotal:</span>
                <span id="inv-calc-subtotal" style="font-weight:600; color:var(--text-main);">Rs 0.00</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:6px; color:var(--text-muted);">
                <span>Sales Tax / VAT:</span>
                <span id="inv-calc-tax" style="font-weight:600; color:var(--text-main);">Rs 0.00</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-bottom:8px; color:var(--text-muted);">
                <span>Trade Discount:</span>
                <span id="inv-calc-discount" style="font-weight:600; color:#f87171;">-Rs 0.00</span>
              </div>
              <div style="display:flex; justify-content:space-between; padding-top:8px; border-top:1px solid var(--border-color); font-size:1.05rem; font-weight:800; color:#38bdf8;">
                <span>Net Grand Total:</span>
                <span id="inv-calc-total">Rs 0.00</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-top:6px; padding-top:6px; font-size:0.85rem; color:var(--text-muted);">
                <span>Amount Paid Now:</span>
                <span id="inv-calc-paid" style="font-weight:700; color:#34d399;">Rs 0.00</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-top:4px; font-size:0.92rem; font-weight:800; color:#f87171;">
                <span>Balance Due:</span>
                <span id="inv-calc-balance">Rs 0.00</span>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer" style="padding-top:1rem; border-top:1px solid var(--border-color); display:flex; justify-content:flex-end; gap:0.75rem;">
          <button class="btn btn-outline" id="btn-dismiss-create-inv">Cancel</button>
          <button class="btn btn-primary" id="btn-submit-new-inv" style="font-weight:700; padding:0.75rem 1.5rem; display:flex; align-items:center; gap:8px;">
            <span>Generate & Post Tax Invoice</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",i);const s=document.getElementById("create-inv-modal");function o(){var I,A;let f=0,m=0;e.forEach(P=>{const B=Number(P.unit_price||0)*Number(P.quantity||0),D=B*Number(P.tax_rate||0)/100;f+=B,m+=D});const p=Number(((I=document.getElementById("new-inv-discount"))==null?void 0:I.value)||0),g=Math.max(0,f+m-p),b=Number(((A=document.getElementById("new-inv-paid"))==null?void 0:A.value)||0),y=Math.max(0,g-b),v=document.getElementById("inv-calc-subtotal"),x=document.getElementById("inv-calc-tax"),k=document.getElementById("inv-calc-discount"),w=document.getElementById("inv-calc-total"),E=document.getElementById("inv-calc-paid"),S=document.getElementById("inv-calc-balance"),C=document.getElementById("inv-item-count");v&&(v.textContent=T(f)),x&&(x.textContent=T(m)),k&&(k.textContent=`-${T(p)}`),w&&(w.textContent=T(g)),E&&(E.textContent=T(b)),S&&(S.textContent=T(y)),C&&(C.textContent=e.length)}function a(){const f=document.getElementById("invoice-items-tbody");f&&(f.innerHTML=e.map((m,p)=>{const g=Number(m.unit_price||0)*Number(m.quantity||0),b=g*Number(m.tax_rate||0)/100,y=g+b;return`
        <tr data-idx="${p}" style="border-bottom: 1px solid var(--border-color);">
          <td style="padding: 8px 6px; font-weight:700; color:var(--text-muted); text-align:center;">${p+1}</td>
          <td style="padding: 8px 6px;">
            <select class="form-control item-prod-select" data-idx="${p}" style="font-size:0.85rem; padding:0.4rem 0.6rem;">
              ${_.products.map(v=>`
                <option value="${v.id}" ${v.id===Number(m.product_id)?"selected":""}>
                  ${v.name} (Stock: ${v.stock})
                </option>
              `).join("")}
            </select>
          </td>
          <td style="padding: 8px 6px; width: 125px;">
            <input type="number" step="0.01" class="form-control item-price-input" data-idx="${p}" value="${m.unit_price}" style="font-size:0.85rem; padding:0.4rem 0.6rem; text-align:right;" />
          </td>
          <td style="padding: 8px 6px; width: 95px;">
            <input type="number" min="1" class="form-control item-qty-input" data-idx="${p}" value="${m.quantity}" style="font-size:0.85rem; padding:0.4rem 0.6rem; text-align:center;" />
          </td>
          <td style="padding: 8px 6px; width: 90px;">
            <input type="number" step="0.1" class="form-control item-tax-input" data-idx="${p}" value="${m.tax_rate}" style="font-size:0.85rem; padding:0.4rem 0.6rem; text-align:center;" />
          </td>
          <td style="padding: 8px 6px; width: 130px; text-align:right; font-weight:700; color:var(--text-main);">
            ${T(y)}
          </td>
          <td style="padding: 8px 6px; width: 45px; text-align:center;">
            ${e.length>1?`
              <button type="button" class="btn-icon btn-sm text-danger btn-remove-item" data-idx="${p}" title="Remove Item" style="padding:2px 6px; font-size:13px; border:none; background:none; cursor:pointer;">✕</button>
            `:""}
          </td>
        </tr>
      `}).join(""),f.querySelectorAll(".item-prod-select").forEach(m=>{m.addEventListener("change",p=>{const g=Number(p.target.dataset.idx),b=_.products.find(y=>y.id===Number(p.target.value));b&&(e[g].product_id=b.id,e[g].unit_price=Number(b.selling_price||0),e[g].tax_rate=Number(b.tax_rate||18),a(),o())})}),f.querySelectorAll(".item-price-input").forEach(m=>{m.addEventListener("input",p=>{const g=Number(p.target.dataset.idx);e[g].unit_price=Number(p.target.value)||0,o()})}),f.querySelectorAll(".item-qty-input").forEach(m=>{m.addEventListener("input",p=>{const g=Number(p.target.dataset.idx);e[g].quantity=Number(p.target.value)||1,o()})}),f.querySelectorAll(".item-tax-input").forEach(m=>{m.addEventListener("input",p=>{const g=Number(p.target.dataset.idx);e[g].tax_rate=Number(p.target.value)||0,o()})}),f.querySelectorAll(".btn-remove-item").forEach(m=>{m.addEventListener("click",p=>{const g=Number(p.currentTarget.dataset.idx);e.splice(g,1),a(),o()})}))}a(),o(),(r=document.getElementById("btn-add-line-item"))==null||r.addEventListener("click",()=>{const f=_.products[e.length%_.products.length]||t;e.push({product_id:f.id,quantity:1,unit_price:Number(f.selling_price)||100,tax_rate:Number(f.tax_rate)||18}),a(),o()}),(l=document.getElementById("new-inv-discount"))==null||l.addEventListener("input",o),(c=document.getElementById("new-inv-paid"))==null||c.addEventListener("input",o),(d=document.getElementById("btn-close-create-inv"))==null||d.addEventListener("click",()=>s.remove()),(u=document.getElementById("btn-dismiss-create-inv"))==null||u.addEventListener("click",()=>s.remove()),s.addEventListener("click",f=>{f.target===s&&s.remove()}),(h=document.getElementById("btn-submit-new-inv"))==null||h.addEventListener("click",async()=>{var y;const f=document.getElementById("new-inv-cust").value,m=document.getElementById("new-inv-discount").value,p=document.getElementById("new-inv-paid").value,g=((y=document.getElementById("new-inv-notes"))==null?void 0:y.value)||"",b=document.getElementById("btn-submit-new-inv");if(!e||e.length===0){M("Please add at least one product line item to the invoice","warning");return}b&&(b.disabled=!0,b.textContent="Generating & Posting Invoice...");try{const v=await R.post("/sales/invoices",{customer_id:f,items:e.map(x=>({product_id:Number(x.product_id),quantity:Number(x.quantity)||1,unit_price:Number(x.unit_price)||0,tax_rate:Number(x.tax_rate)||0})),discount_amount:Number(m)||0,paid_amount:Number(p)||0,notes:g});v.success&&(M(`Invoice ${v.invoice.invoice_number} created with QR Code!`,"success"),s.remove(),await fs(),xr(v.invoice))}catch(v){M(v.message,"error"),b&&(b.disabled=!1,b.textContent="Generate & Post Tax Invoice")}})}async function uf(n){n.innerHTML=`
    <div class="page-header">
      <div>
        <h1 class="page-title">Double-Entry Financial Suite & General Ledger</h1>
        <p class="page-subtitle">Automated ledger postings, chart of accounts, trial balance, P&L and balance sheet</p>
      </div>
      <div style="display:flex; gap:0.75rem;">
        <button class="btn btn-primary" id="btn-new-jv-modal">
          + Manual Journal Voucher
        </button>
      </div>
    </div>

    <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:0.5rem;">
      <button class="btn btn-outline btn-sm active acc-tab-btn" data-tab="journals">General Journal Entries (JV)</button>
      <button class="btn btn-outline btn-sm acc-tab-btn" data-tab="coa">Chart of Accounts</button>
      <button class="btn btn-outline btn-sm acc-tab-btn" data-tab="reports">Financial Statements (P&L, Balance Sheet)</button>
    </div>

    <div id="acc-tab-content">
      <!-- Dynamic accounting content -->
    </div>
  `,await ms(),mf()}async function ms(){const n=document.getElementById("acc-tab-content");if(n)try{const e=(await R.get("/accounting/journals")).entries||[];n.innerHTML=`
      <div class="glass-panel">
        <div class="panel-header">
          <h3 class="panel-title">Automated General Ledger Postings</h3>
          <span class="tag tag-success">Double-Entry Balanced</span>
        </div>
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Entry #</th>
                <th>Date</th>
                <th>Source / Ref</th>
                <th>Narration</th>
                <th>Debit / Credit Breakdown</th>
              </tr>
            </thead>
            <tbody>
              ${e.map(i=>`
                <tr>
                  <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${i.entry_number}</td>
                  <td>${i.date}</td>
                  <td>
                    <span class="tag tag-info">${i.source_document||"MANUAL"}</span>
                    <div style="font-size:0.75rem; color:var(--text-muted);">${i.reference||""}</div>
                  </td>
                  <td style="color:var(--text-secondary); max-width:280px;">${i.narration}</td>
                  <td>
                    <div style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px; font-family:var(--font-mono); font-size:0.8rem;">
                      ${i.lines.map(s=>`
                        <div style="display:flex; justify-content:space-between; margin:2px 0;">
                          <span style="color:${s.debit>0?"#38bdf8":"#cbd5e1"};">
                            ${s.debit>0?"Dr.":"   Cr."} ${s.account_name}
                          </span>
                          <span style="font-weight:700;">
                            ${s.debit>0?T(s.debit):T(s.credit)}
                          </span>
                        </div>
                      `).join("")}
                    </div>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}catch(t){M(t.message,"error")}}async function hf(){const n=document.getElementById("acc-tab-content");if(n)try{const e=(await R.get("/accounting/accounts")).accounts||[],i={Asset:e.filter(s=>s.type==="Asset"),Liability:e.filter(s=>s.type==="Liability"),Equity:e.filter(s=>s.type==="Equity"),Revenue:e.filter(s=>s.type==="Revenue"),Expense:e.filter(s=>s.type==="Expense")};n.innerHTML=`
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.25rem;">
        ${Object.entries(i).map(([s,o])=>`
          <div class="glass-panel">
            <div class="panel-header">
              <h3 class="panel-title">${s} Accounts</h3>
              <span class="tag tag-info">${o.length} Accounts</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:0.6rem;">
              ${o.map(a=>`
                <div style="display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0.8rem; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:var(--radius-sm);">
                  <div>
                    <span style="font-family:var(--font-mono); font-size:0.78rem; color:#38bdf8; font-weight:700; margin-right:6px;">${a.code}</span>
                    <span style="font-size:0.86rem; font-weight:500;">${a.name}</span>
                  </div>
                  <span style="font-family:var(--font-heading); font-weight:700; font-size:0.95rem; color:#ffffff;">
                    ${T(a.current_balance)}
                  </span>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `}catch(t){M(t.message,"error")}}async function ff(){const n=document.getElementById("acc-tab-content");if(n)try{const t=await R.get("/accounting/reports"),{trial_balance:e,profit_and_loss:i,balance_sheet:s}=t;n.innerHTML=`
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
        <!-- Profit & Loss -->
        <div class="glass-panel">
          <div class="panel-header">
            <h3 class="panel-title">Income Statement (Profit & Loss)</h3>
            <span class="tag tag-success">Live YTD</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem; font-size:0.9rem;">
            <div style="font-weight:700; color:#34d399; margin-bottom:4px;">REVENUE</div>
            ${i.revenues.map(o=>`
              <div style="display:flex; justify-content:space-between;">
                <span>${o.name}</span>
                <span>${T(o.current_balance)}</span>
              </div>
            `).join("")}
            <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); padding-top:4px;">
              <span>Total Gross Revenue:</span>
              <span style="color:#34d399;">${T(i.total_revenue)}</span>
            </div>

            <div style="font-weight:700; color:#f87171; margin-top:10px; margin-bottom:4px;">EXPENSES & COGS</div>
            ${i.expenses.map(o=>`
              <div style="display:flex; justify-content:space-between;">
                <span>${o.name}</span>
                <span>${T(o.current_balance)}</span>
              </div>
            `).join("")}
            <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); padding-top:4px;">
              <span>Total Expenses:</span>
              <span style="color:#f87171;">${T(i.total_expense)}</span>
            </div>

            <div style="display:flex; justify-content:space-between; font-weight:800; font-size:1.15rem; border-top:2px solid var(--border-bright); padding-top:8px; margin-top:8px; color:#38bdf8;">
              <span>NET OPERATING PROFIT:</span>
              <span>${T(i.net_profit)}</span>
            </div>
          </div>
        </div>

        <!-- Balance Sheet -->
        <div class="glass-panel">
          <div class="panel-header">
            <h3 class="panel-title">Balance Sheet</h3>
            <span class="tag tag-info">A = L + E</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem; font-size:0.9rem;">
            <div style="font-weight:700; color:#38bdf8;">TOTAL ASSETS</div>
            ${s.assets.map(o=>`
              <div style="display:flex; justify-content:space-between;">
                <span>${o.name}</span>
                <span>${T(o.current_balance)}</span>
              </div>
            `).join("")}
            <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); padding-top:4px;">
              <span>Total Assets:</span>
              <span style="color:#38bdf8;">${T(s.total_assets)}</span>
            </div>

            <div style="font-weight:700; color:#fbbf24; margin-top:10px;">LIABILITIES & EQUITY</div>
            ${s.liabilities.map(o=>`
              <div style="display:flex; justify-content:space-between;">
                <span>${o.name}</span>
                <span>${T(o.current_balance)}</span>
              </div>
            `).join("")}
            <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); padding-top:4px;">
              <span>Total Liabilities & Equity:</span>
              <span style="color:#fbbf24;">${T(s.total_liabilities_and_equity||s.total_equity_and_liabilities)}</span>
            </div>
          </div>
        </div>
      </div>
    `}catch(t){M(t.message,"error")}}function mf(){var t;const n=document.querySelectorAll(".acc-tab-btn");n.forEach(e=>{e.addEventListener("click",()=>{n.forEach(s=>s.classList.remove("active")),e.classList.add("active");const i=e.dataset.tab;i==="journals"?ms():i==="coa"?hf():i==="reports"&&ff()})}),(t=document.getElementById("btn-new-jv-modal"))==null||t.addEventListener("click",pf)}function pf(){var e,i,s;document.body.insertAdjacentHTML("beforeend",`
    <div class="modal-overlay" id="manual-jv-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Post Manual Journal Voucher</h3>
          <button class="btn-icon btn-sm" id="btn-close-jv">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Reference / Slip #:</label>
            <input type="text" id="jv-ref" value="BANK-DEP-092" class="form-control" />
          </div>
          <div class="form-group">
            <label class="form-label">Narration:</label>
            <input type="text" id="jv-narration" value="Cash deposit from store counter to Bank Al Habib current account" class="form-control" />
          </div>

          <div style="background:rgba(255,255,255,0.03); padding:1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
            <div style="font-weight:600; font-size:0.85rem; margin-bottom:8px;">Balanced Double-Entry Line 1 (Debit):</div>
            <div style="display:grid; grid-template-columns:2fr 1fr; gap:8px;">
              <select id="jv-debit-acc" class="form-control">
                <option value="1020">Bank Al Habib - Current A/C (1020)</option>
                <option value="1010">Main Cash Drawer (1010)</option>
                <option value="5020">Store Rent & Maintenance (5020)</option>
              </select>
              <input type="number" id="jv-debit-amt" value="15000" class="form-control" placeholder="Debit Amount" />
            </div>

            <div style="font-weight:600; font-size:0.85rem; margin-top:12px; margin-bottom:8px;">Balanced Double-Entry Line 2 (Credit):</div>
            <div style="display:grid; grid-template-columns:2fr 1fr; gap:8px;">
              <select id="jv-credit-acc" class="form-control">
                <option value="1010">Main Cash Drawer (1010)</option>
                <option value="1020">Bank Al Habib - Current A/C (1020)</option>
                <option value="2010">Accounts Payable (2010)</option>
              </select>
              <input type="number" id="jv-credit-amt" value="15000" class="form-control" placeholder="Credit Amount" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-jv">Cancel</button>
          <button class="btn btn-primary" id="btn-submit-jv">Post Journal Voucher</button>
        </div>
      </div>
    </div>
  `);const t=document.getElementById("manual-jv-modal");(e=document.getElementById("btn-close-jv"))==null||e.addEventListener("click",()=>t.remove()),(i=document.getElementById("btn-cancel-jv"))==null||i.addEventListener("click",()=>t.remove()),(s=document.getElementById("btn-submit-jv"))==null||s.addEventListener("click",async()=>{const o=document.getElementById("jv-ref").value,a=document.getElementById("jv-narration").value,r=Number(document.getElementById("jv-debit-acc").value),l=Number(document.getElementById("jv-debit-amt").value),c=Number(document.getElementById("jv-credit-acc").value),d=Number(document.getElementById("jv-credit-amt").value);if(l!==d){M("Debits and Credits must balance exactly!","error");return}try{(await R.post("/accounting/journals",{reference:o,narration:a,lines:[{accountId:r,debit:l,credit:0},{accountId:c,debit:0,credit:d}]})).success&&(M("Journal Voucher posted to General Ledger!","success"),t.remove(),ms())}catch(u){M(u.message,"error")}})}async function gf(n){n.innerHTML=`
    <div class="page-header">
      <div>
        <h1 class="page-title">Manufacturing & BOM Assembly Orders</h1>
        <p class="page-subtitle">Bill of materials (BOM), multi-component assembly, raw material auto-consumption & cost accounting</p>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
      <!-- Recipes List -->
      <div class="glass-panel">
        <div class="panel-header">
          <h3 class="panel-title">Bill of Materials (BOM) Recipes</h3>
          <span class="tag tag-info">Active Formulas</span>
        </div>
        <div id="mfg-recipes-list">
          <!-- Populated dynamically -->
        </div>
      </div>

      <!-- Executed Assembly Orders -->
      <div class="glass-panel">
        <div class="panel-header">
          <h3 class="panel-title">Completed Assembly Job Orders</h3>
          <span class="tag tag-success">Stock Converted</span>
        </div>
        <div id="mfg-orders-list">
          <!-- Populated dynamically -->
        </div>
      </div>
    </div>
  `,await _r()}async function _r(){const n=document.getElementById("mfg-recipes-list"),t=document.getElementById("mfg-orders-list");try{const[e,i]=await Promise.all([R.get("/manufacturing/recipes"),R.get("/manufacturing/orders")]),s=e.recipes||[],o=i.orders||[];n&&(n.innerHTML=s.map(a=>`
        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.25rem; margin-bottom:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
            <div>
              <h4 style="font-size:1.05rem; font-weight:700; color:#38bdf8;">${a.recipe_name}</h4>
              <p style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">Produces: <strong>${a.output_quantity} unit</strong> of ${a.finished_product_name}</p>
            </div>
            <button class="btn btn-primary btn-sm run-assembly-btn" data-recipe-id="${a.id}" data-recipe-name="${a.recipe_name}">
              ⚙️ Execute Assembly
            </button>
          </div>

          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.75rem;">
            <em>${a.instructions}</em>
          </p>

          <div style="background:rgba(0,0,0,0.25); border-radius:var(--radius-sm); padding:0.75rem;">
            <div style="font-size:0.78rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:6px;">Required Raw Materials:</div>
            ${a.items.map(r=>`
              <div style="display:flex; justify-content:space-between; font-size:0.85rem; padding:2px 0;">
                <span>• ${r.name}</span>
                <span style="font-family:var(--font-mono); font-weight:600;">${r.required_quantity} units (${T(r.unit_cost)}/ea)</span>
              </div>
            `).join("")}
          </div>
        </div>
      `).join(""),n.querySelectorAll(".run-assembly-btn").forEach(a=>{a.addEventListener("click",()=>{const r=Number(a.dataset.recipeId),l=a.dataset.recipeName;bf(r,l)})})),t&&(t.innerHTML=`
        <div class="data-table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Finished Product</th>
                <th>Units</th>
                <th>Production Cost</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${o.map(a=>`
                <tr>
                  <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${a.order_number}</td>
                  <td>${a.finished_product_name}</td>
                  <td style="font-weight:700;">${a.produced_quantity} units</td>
                  <td>${T(a.total_production_cost)}</td>
                  <td><span class="tag tag-success">${a.status}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `)}catch(e){M(e.message,"error")}}function bf(n,t){var s,o,a;const e=`
    <div class="modal-overlay" id="run-asm-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Execute BOM Production Order</h3>
          <button class="btn-icon btn-sm" id="btn-close-asm-modal">✕</button>
        </div>
        <div class="modal-body">
          <p style="font-size:0.9rem; color:var(--text-secondary);">
            Running assembly for recipe: <strong style="color:#38bdf8;">${t}</strong>
          </p>

          <div class="form-group">
            <label class="form-label">Units to Produce:</label>
            <input type="number" id="asm-qty" value="10" min="1" class="form-control" />
          </div>

          <div style="background:rgba(16,185,129,0.1); border:1px solid rgba(16,185,129,0.3); padding:0.85rem; border-radius:var(--radius-md); font-size:0.85rem; color:#34d399;">
            ✓ Raw materials will be deducted from inventory automatically.<br/>
            ✓ Finished products will be added to stock.<br/>
            ✓ Double-entry ledger entry will be posted to General Ledger.
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-asm">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-asm">Execute & Update Inventory</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",e);const i=document.getElementById("run-asm-modal");(s=document.getElementById("btn-close-asm-modal"))==null||s.addEventListener("click",()=>i.remove()),(o=document.getElementById("btn-cancel-asm"))==null||o.addEventListener("click",()=>i.remove()),(a=document.getElementById("btn-confirm-asm"))==null||a.addEventListener("click",async()=>{const r=document.getElementById("asm-qty").value;try{const l=await R.post("/manufacturing/assemble",{bom_recipe_id:n,warehouse_id:1,quantity:r});l.success&&(M(l.message,"success"),i.remove(),_r())}catch(l){M(l.message,"error")}})}function yf(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var de={},si,Vo;function vf(){return Vo||(Vo=1,si=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),si}var oi={},Dt={},qo;function oe(){if(qo)return Dt;qo=1;let n;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return Dt.getSymbolSize=function(i){if(!i)throw new Error('"version" cannot be null or undefined');if(i<1||i>40)throw new Error('"version" should be in range from 1 to 40');return i*4+17},Dt.getSymbolTotalCodewords=function(i){return t[i]},Dt.getBCHDigit=function(e){let i=0;for(;e!==0;)i++,e>>>=1;return i},Dt.setToSJISFunction=function(i){if(typeof i!="function")throw new Error('"toSJISFunc" is not a valid function.');n=i},Dt.isKanjiModeEnabled=function(){return typeof n<"u"},Dt.toSJIS=function(i){return n(i)},Dt}var ai={},Wo;function ps(){return Wo||(Wo=1,(function(n){n.L={bit:1},n.M={bit:0},n.Q={bit:3},n.H={bit:2};function t(e){if(typeof e!="string")throw new Error("Param is not a string");switch(e.toLowerCase()){case"l":case"low":return n.L;case"m":case"medium":return n.M;case"q":case"quartile":return n.Q;case"h":case"high":return n.H;default:throw new Error("Unknown EC Level: "+e)}}n.isValid=function(i){return i&&typeof i.bit<"u"&&i.bit>=0&&i.bit<4},n.from=function(i,s){if(n.isValid(i))return i;try{return t(i)}catch{return s}}})(ai)),ai}var ri,Uo;function xf(){if(Uo)return ri;Uo=1;function n(){this.buffer=[],this.length=0}return n.prototype={get:function(t){const e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let i=0;i<e;i++)this.putBit((t>>>e-i-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},ri=n,ri}var li,Go;function _f(){if(Go)return li;Go=1;function n(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return n.prototype.set=function(t,e,i,s){const o=t*this.size+e;this.data[o]=i,s&&(this.reservedBit[o]=!0)},n.prototype.get=function(t,e){return this.data[t*this.size+e]},n.prototype.xor=function(t,e,i){this.data[t*this.size+e]^=i},n.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]},li=n,li}var ci={},Yo;function wf(){return Yo||(Yo=1,(function(n){const t=oe().getSymbolSize;n.getRowColCoords=function(i){if(i===1)return[];const s=Math.floor(i/7)+2,o=t(i),a=o===145?26:Math.ceil((o-13)/(2*s-2))*2,r=[o-7];for(let l=1;l<s-1;l++)r[l]=r[l-1]-a;return r.push(6),r.reverse()},n.getPositions=function(i){const s=[],o=n.getRowColCoords(i),a=o.length;for(let r=0;r<a;r++)for(let l=0;l<a;l++)r===0&&l===0||r===0&&l===a-1||r===a-1&&l===0||s.push([o[r],o[l]]);return s}})(ci)),ci}var di={},Ko;function kf(){if(Ko)return di;Ko=1;const n=oe().getSymbolSize,t=7;return di.getPositions=function(i){const s=n(i);return[[0,0],[s-t,0],[0,s-t]]},di}var ui={},Xo;function Ef(){return Xo||(Xo=1,(function(n){n.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};n.isValid=function(s){return s!=null&&s!==""&&!isNaN(s)&&s>=0&&s<=7},n.from=function(s){return n.isValid(s)?parseInt(s,10):void 0},n.getPenaltyN1=function(s){const o=s.size;let a=0,r=0,l=0,c=null,d=null;for(let u=0;u<o;u++){r=l=0,c=d=null;for(let h=0;h<o;h++){let f=s.get(u,h);f===c?r++:(r>=5&&(a+=t.N1+(r-5)),c=f,r=1),f=s.get(h,u),f===d?l++:(l>=5&&(a+=t.N1+(l-5)),d=f,l=1)}r>=5&&(a+=t.N1+(r-5)),l>=5&&(a+=t.N1+(l-5))}return a},n.getPenaltyN2=function(s){const o=s.size;let a=0;for(let r=0;r<o-1;r++)for(let l=0;l<o-1;l++){const c=s.get(r,l)+s.get(r,l+1)+s.get(r+1,l)+s.get(r+1,l+1);(c===4||c===0)&&a++}return a*t.N2},n.getPenaltyN3=function(s){const o=s.size;let a=0,r=0,l=0;for(let c=0;c<o;c++){r=l=0;for(let d=0;d<o;d++)r=r<<1&2047|s.get(c,d),d>=10&&(r===1488||r===93)&&a++,l=l<<1&2047|s.get(d,c),d>=10&&(l===1488||l===93)&&a++}return a*t.N3},n.getPenaltyN4=function(s){let o=0;const a=s.data.length;for(let l=0;l<a;l++)o+=s.data[l];return Math.abs(Math.ceil(o*100/a/5)-10)*t.N4};function e(i,s,o){switch(i){case n.Patterns.PATTERN000:return(s+o)%2===0;case n.Patterns.PATTERN001:return s%2===0;case n.Patterns.PATTERN010:return o%3===0;case n.Patterns.PATTERN011:return(s+o)%3===0;case n.Patterns.PATTERN100:return(Math.floor(s/2)+Math.floor(o/3))%2===0;case n.Patterns.PATTERN101:return s*o%2+s*o%3===0;case n.Patterns.PATTERN110:return(s*o%2+s*o%3)%2===0;case n.Patterns.PATTERN111:return(s*o%3+(s+o)%2)%2===0;default:throw new Error("bad maskPattern:"+i)}}n.applyMask=function(s,o){const a=o.size;for(let r=0;r<a;r++)for(let l=0;l<a;l++)o.isReserved(l,r)||o.xor(l,r,e(s,l,r))},n.getBestMask=function(s,o){const a=Object.keys(n.Patterns).length;let r=0,l=1/0;for(let c=0;c<a;c++){o(c),n.applyMask(c,s);const d=n.getPenaltyN1(s)+n.getPenaltyN2(s)+n.getPenaltyN3(s)+n.getPenaltyN4(s);n.applyMask(c,s),d<l&&(l=d,r=c)}return r}})(ui)),ui}var cn={},Jo;function wr(){if(Jo)return cn;Jo=1;const n=ps(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],e=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return cn.getBlocksCount=function(s,o){switch(o){case n.L:return t[(s-1)*4+0];case n.M:return t[(s-1)*4+1];case n.Q:return t[(s-1)*4+2];case n.H:return t[(s-1)*4+3];default:return}},cn.getTotalCodewordsCount=function(s,o){switch(o){case n.L:return e[(s-1)*4+0];case n.M:return e[(s-1)*4+1];case n.Q:return e[(s-1)*4+2];case n.H:return e[(s-1)*4+3];default:return}},cn}var hi={},we={},Qo;function Sf(){if(Qo)return we;Qo=1;const n=new Uint8Array(512),t=new Uint8Array(256);return(function(){let i=1;for(let s=0;s<255;s++)n[s]=i,t[i]=s,i<<=1,i&256&&(i^=285);for(let s=255;s<512;s++)n[s]=n[s-255]})(),we.log=function(i){if(i<1)throw new Error("log("+i+")");return t[i]},we.exp=function(i){return n[i]},we.mul=function(i,s){return i===0||s===0?0:n[t[i]+t[s]]},we}var Zo;function Cf(){return Zo||(Zo=1,(function(n){const t=Sf();n.mul=function(i,s){const o=new Uint8Array(i.length+s.length-1);for(let a=0;a<i.length;a++)for(let r=0;r<s.length;r++)o[a+r]^=t.mul(i[a],s[r]);return o},n.mod=function(i,s){let o=new Uint8Array(i);for(;o.length-s.length>=0;){const a=o[0];for(let l=0;l<s.length;l++)o[l]^=t.mul(s[l],a);let r=0;for(;r<o.length&&o[r]===0;)r++;o=o.slice(r)}return o},n.generateECPolynomial=function(i){let s=new Uint8Array([1]);for(let o=0;o<i;o++)s=n.mul(s,new Uint8Array([1,t.exp(o)]));return s}})(hi)),hi}var fi,ta;function Mf(){if(ta)return fi;ta=1;const n=Cf();function t(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(i){this.degree=i,this.genPoly=n.generateECPolynomial(this.degree)},t.prototype.encode=function(i){if(!this.genPoly)throw new Error("Encoder not initialized");const s=new Uint8Array(i.length+this.degree);s.set(i);const o=n.mod(s,this.genPoly),a=this.degree-o.length;if(a>0){const r=new Uint8Array(this.degree);return r.set(o,a),r}return o},fi=t,fi}var mi={},pi={},gi={},ea;function kr(){return ea||(ea=1,gi.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),gi}var pt={},na;function Er(){if(na)return pt;na=1;const n="[0-9]+",t="[A-Z $%*+\\-./:]+";let e="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";e=e.replace(/u/g,"\\u");const i="(?:(?![A-Z0-9 $%*+\\-./:]|"+e+`)(?:.|[\r
]))+`;pt.KANJI=new RegExp(e,"g"),pt.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),pt.BYTE=new RegExp(i,"g"),pt.NUMERIC=new RegExp(n,"g"),pt.ALPHANUMERIC=new RegExp(t,"g");const s=new RegExp("^"+e+"$"),o=new RegExp("^"+n+"$"),a=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return pt.testKanji=function(l){return s.test(l)},pt.testNumeric=function(l){return o.test(l)},pt.testAlphanumeric=function(l){return a.test(l)},pt}var ia;function ae(){return ia||(ia=1,(function(n){const t=kr(),e=Er();n.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},n.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},n.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},n.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},n.MIXED={bit:-1},n.getCharCountIndicator=function(o,a){if(!o.ccBits)throw new Error("Invalid mode: "+o);if(!t.isValid(a))throw new Error("Invalid version: "+a);return a>=1&&a<10?o.ccBits[0]:a<27?o.ccBits[1]:o.ccBits[2]},n.getBestModeForData=function(o){return e.testNumeric(o)?n.NUMERIC:e.testAlphanumeric(o)?n.ALPHANUMERIC:e.testKanji(o)?n.KANJI:n.BYTE},n.toString=function(o){if(o&&o.id)return o.id;throw new Error("Invalid mode")},n.isValid=function(o){return o&&o.bit&&o.ccBits};function i(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"numeric":return n.NUMERIC;case"alphanumeric":return n.ALPHANUMERIC;case"kanji":return n.KANJI;case"byte":return n.BYTE;default:throw new Error("Unknown mode: "+s)}}n.from=function(o,a){if(n.isValid(o))return o;try{return i(o)}catch{return a}}})(pi)),pi}var sa;function Af(){return sa||(sa=1,(function(n){const t=oe(),e=wr(),i=ps(),s=ae(),o=kr(),a=7973,r=t.getBCHDigit(a);function l(h,f,m){for(let p=1;p<=40;p++)if(f<=n.getCapacity(p,m,h))return p}function c(h,f){return s.getCharCountIndicator(h,f)+4}function d(h,f){let m=0;return h.forEach(function(p){const g=c(p.mode,f);m+=g+p.getBitsLength()}),m}function u(h,f){for(let m=1;m<=40;m++)if(d(h,m)<=n.getCapacity(m,f,s.MIXED))return m}n.from=function(f,m){return o.isValid(f)?parseInt(f,10):m},n.getCapacity=function(f,m,p){if(!o.isValid(f))throw new Error("Invalid QR Code version");typeof p>"u"&&(p=s.BYTE);const g=t.getSymbolTotalCodewords(f),b=e.getTotalCodewordsCount(f,m),y=(g-b)*8;if(p===s.MIXED)return y;const v=y-c(p,f);switch(p){case s.NUMERIC:return Math.floor(v/10*3);case s.ALPHANUMERIC:return Math.floor(v/11*2);case s.KANJI:return Math.floor(v/13);case s.BYTE:default:return Math.floor(v/8)}},n.getBestVersionForData=function(f,m){let p;const g=i.from(m,i.M);if(Array.isArray(f)){if(f.length>1)return u(f,g);if(f.length===0)return 1;p=f[0]}else p=f;return l(p.mode,p.getLength(),g)},n.getEncodedBits=function(f){if(!o.isValid(f)||f<7)throw new Error("Invalid QR Code version");let m=f<<12;for(;t.getBCHDigit(m)-r>=0;)m^=a<<t.getBCHDigit(m)-r;return f<<12|m}})(mi)),mi}var bi={},oa;function If(){if(oa)return bi;oa=1;const n=oe(),t=1335,e=21522,i=n.getBCHDigit(t);return bi.getEncodedBits=function(o,a){const r=o.bit<<3|a;let l=r<<10;for(;n.getBCHDigit(l)-i>=0;)l^=t<<n.getBCHDigit(l)-i;return(r<<10|l)^e},bi}var yi={},vi,aa;function Pf(){if(aa)return vi;aa=1;const n=ae();function t(e){this.mode=n.NUMERIC,this.data=e.toString()}return t.getBitsLength=function(i){return 10*Math.floor(i/3)+(i%3?i%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(i){let s,o,a;for(s=0;s+3<=this.data.length;s+=3)o=this.data.substr(s,3),a=parseInt(o,10),i.put(a,10);const r=this.data.length-s;r>0&&(o=this.data.substr(s),a=parseInt(o,10),i.put(a,r*3+1))},vi=t,vi}var xi,ra;function Lf(){if(ra)return xi;ra=1;const n=ae(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function e(i){this.mode=n.ALPHANUMERIC,this.data=i}return e.getBitsLength=function(s){return 11*Math.floor(s/2)+6*(s%2)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(s){let o;for(o=0;o+2<=this.data.length;o+=2){let a=t.indexOf(this.data[o])*45;a+=t.indexOf(this.data[o+1]),s.put(a,11)}this.data.length%2&&s.put(t.indexOf(this.data[o]),6)},xi=e,xi}var _i,la;function Tf(){if(la)return _i;la=1;const n=ae();function t(e){this.mode=n.BYTE,typeof e=="string"?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}return t.getBitsLength=function(i){return i*8},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(e){for(let i=0,s=this.data.length;i<s;i++)e.put(this.data[i],8)},_i=t,_i}var wi,ca;function Bf(){if(ca)return wi;ca=1;const n=ae(),t=oe();function e(i){this.mode=n.KANJI,this.data=i}return e.getBitsLength=function(s){return s*13},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(i){let s;for(s=0;s<this.data.length;s++){let o=t.toSJIS(this.data[s]);if(o>=33088&&o<=40956)o-=33088;else if(o>=57408&&o<=60351)o-=49472;else throw new Error("Invalid SJIS character: "+this.data[s]+`
Make sure your charset is UTF-8`);o=(o>>>8&255)*192+(o&255),i.put(o,13)}},wi=e,wi}var ki={exports:{}},da;function Rf(){return da||(da=1,(function(n){var t={single_source_shortest_paths:function(e,i,s){var o={},a={};a[i]=0;var r=t.PriorityQueue.make();r.push(i,0);for(var l,c,d,u,h,f,m,p,g;!r.empty();){l=r.pop(),c=l.value,u=l.cost,h=e[c]||{};for(d in h)h.hasOwnProperty(d)&&(f=h[d],m=u+f,p=a[d],g=typeof a[d]>"u",(g||p>m)&&(a[d]=m,r.push(d,m),o[d]=c))}if(typeof s<"u"&&typeof a[s]>"u"){var b=["Could not find a path from ",i," to ",s,"."].join("");throw new Error(b)}return o},extract_shortest_path_from_predecessor_list:function(e,i){for(var s=[],o=i;o;)s.push(o),e[o],o=e[o];return s.reverse(),s},find_path:function(e,i,s){var o=t.single_source_shortest_paths(e,i,s);return t.extract_shortest_path_from_predecessor_list(o,s)},PriorityQueue:{make:function(e){var i=t.PriorityQueue,s={},o;e=e||{};for(o in i)i.hasOwnProperty(o)&&(s[o]=i[o]);return s.queue=[],s.sorter=e.sorter||i.default_sorter,s},default_sorter:function(e,i){return e.cost-i.cost},push:function(e,i){var s={value:e,cost:i};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};n.exports=t})(ki)),ki.exports}var ua;function Df(){return ua||(ua=1,(function(n){const t=ae(),e=Pf(),i=Lf(),s=Tf(),o=Bf(),a=Er(),r=oe(),l=Rf();function c(b){return unescape(encodeURIComponent(b)).length}function d(b,y,v){const x=[];let k;for(;(k=b.exec(v))!==null;)x.push({data:k[0],index:k.index,mode:y,length:k[0].length});return x}function u(b){const y=d(a.NUMERIC,t.NUMERIC,b),v=d(a.ALPHANUMERIC,t.ALPHANUMERIC,b);let x,k;return r.isKanjiModeEnabled()?(x=d(a.BYTE,t.BYTE,b),k=d(a.KANJI,t.KANJI,b)):(x=d(a.BYTE_KANJI,t.BYTE,b),k=[]),y.concat(v,x,k).sort(function(E,S){return E.index-S.index}).map(function(E){return{data:E.data,mode:E.mode,length:E.length}})}function h(b,y){switch(y){case t.NUMERIC:return e.getBitsLength(b);case t.ALPHANUMERIC:return i.getBitsLength(b);case t.KANJI:return o.getBitsLength(b);case t.BYTE:return s.getBitsLength(b)}}function f(b){return b.reduce(function(y,v){const x=y.length-1>=0?y[y.length-1]:null;return x&&x.mode===v.mode?(y[y.length-1].data+=v.data,y):(y.push(v),y)},[])}function m(b){const y=[];for(let v=0;v<b.length;v++){const x=b[v];switch(x.mode){case t.NUMERIC:y.push([x,{data:x.data,mode:t.ALPHANUMERIC,length:x.length},{data:x.data,mode:t.BYTE,length:x.length}]);break;case t.ALPHANUMERIC:y.push([x,{data:x.data,mode:t.BYTE,length:x.length}]);break;case t.KANJI:y.push([x,{data:x.data,mode:t.BYTE,length:c(x.data)}]);break;case t.BYTE:y.push([{data:x.data,mode:t.BYTE,length:c(x.data)}])}}return y}function p(b,y){const v={},x={start:{}};let k=["start"];for(let w=0;w<b.length;w++){const E=b[w],S=[];for(let C=0;C<E.length;C++){const I=E[C],A=""+w+C;S.push(A),v[A]={node:I,lastCount:0},x[A]={};for(let P=0;P<k.length;P++){const B=k[P];v[B]&&v[B].node.mode===I.mode?(x[B][A]=h(v[B].lastCount+I.length,I.mode)-h(v[B].lastCount,I.mode),v[B].lastCount+=I.length):(v[B]&&(v[B].lastCount=I.length),x[B][A]=h(I.length,I.mode)+4+t.getCharCountIndicator(I.mode,y))}}k=S}for(let w=0;w<k.length;w++)x[k[w]].end=0;return{map:x,table:v}}function g(b,y){let v;const x=t.getBestModeForData(b);if(v=t.from(y,x),v!==t.BYTE&&v.bit<x.bit)throw new Error('"'+b+'" cannot be encoded with mode '+t.toString(v)+`.
 Suggested mode is: `+t.toString(x));switch(v===t.KANJI&&!r.isKanjiModeEnabled()&&(v=t.BYTE),v){case t.NUMERIC:return new e(b);case t.ALPHANUMERIC:return new i(b);case t.KANJI:return new o(b);case t.BYTE:return new s(b)}}n.fromArray=function(y){return y.reduce(function(v,x){return typeof x=="string"?v.push(g(x,null)):x.data&&v.push(g(x.data,x.mode)),v},[])},n.fromString=function(y,v){const x=u(y,r.isKanjiModeEnabled()),k=m(x),w=p(k,v),E=l.find_path(w.map,"start","end"),S=[];for(let C=1;C<E.length-1;C++)S.push(w.table[E[C]].node);return n.fromArray(f(S))},n.rawSplit=function(y){return n.fromArray(u(y,r.isKanjiModeEnabled()))}})(yi)),yi}var ha;function Of(){if(ha)return oi;ha=1;const n=oe(),t=ps(),e=xf(),i=_f(),s=wf(),o=kf(),a=Ef(),r=wr(),l=Mf(),c=Af(),d=If(),u=ae(),h=Df();function f(w,E){const S=w.size,C=o.getPositions(E);for(let I=0;I<C.length;I++){const A=C[I][0],P=C[I][1];for(let B=-1;B<=7;B++)if(!(A+B<=-1||S<=A+B))for(let D=-1;D<=7;D++)P+D<=-1||S<=P+D||(B>=0&&B<=6&&(D===0||D===6)||D>=0&&D<=6&&(B===0||B===6)||B>=2&&B<=4&&D>=2&&D<=4?w.set(A+B,P+D,!0,!0):w.set(A+B,P+D,!1,!0))}}function m(w){const E=w.size;for(let S=8;S<E-8;S++){const C=S%2===0;w.set(S,6,C,!0),w.set(6,S,C,!0)}}function p(w,E){const S=s.getPositions(E);for(let C=0;C<S.length;C++){const I=S[C][0],A=S[C][1];for(let P=-2;P<=2;P++)for(let B=-2;B<=2;B++)P===-2||P===2||B===-2||B===2||P===0&&B===0?w.set(I+P,A+B,!0,!0):w.set(I+P,A+B,!1,!0)}}function g(w,E){const S=w.size,C=c.getEncodedBits(E);let I,A,P;for(let B=0;B<18;B++)I=Math.floor(B/3),A=B%3+S-8-3,P=(C>>B&1)===1,w.set(I,A,P,!0),w.set(A,I,P,!0)}function b(w,E,S){const C=w.size,I=d.getEncodedBits(E,S);let A,P;for(A=0;A<15;A++)P=(I>>A&1)===1,A<6?w.set(A,8,P,!0):A<8?w.set(A+1,8,P,!0):w.set(C-15+A,8,P,!0),A<8?w.set(8,C-A-1,P,!0):A<9?w.set(8,15-A-1+1,P,!0):w.set(8,15-A-1,P,!0);w.set(C-8,8,1,!0)}function y(w,E){const S=w.size;let C=-1,I=S-1,A=7,P=0;for(let B=S-1;B>0;B-=2)for(B===6&&B--;;){for(let D=0;D<2;D++)if(!w.isReserved(I,B-D)){let $=!1;P<E.length&&($=(E[P]>>>A&1)===1),w.set(I,B-D,$),A--,A===-1&&(P++,A=7)}if(I+=C,I<0||S<=I){I-=C,C=-C;break}}}function v(w,E,S){const C=new e;S.forEach(function(D){C.put(D.mode.bit,4),C.put(D.getLength(),u.getCharCountIndicator(D.mode,w)),D.write(C)});const I=n.getSymbolTotalCodewords(w),A=r.getTotalCodewordsCount(w,E),P=(I-A)*8;for(C.getLengthInBits()+4<=P&&C.put(0,4);C.getLengthInBits()%8!==0;)C.putBit(0);const B=(P-C.getLengthInBits())/8;for(let D=0;D<B;D++)C.put(D%2?17:236,8);return x(C,w,E)}function x(w,E,S){const C=n.getSymbolTotalCodewords(E),I=r.getTotalCodewordsCount(E,S),A=C-I,P=r.getBlocksCount(E,S),B=C%P,D=P-B,$=Math.floor(C/P),j=Math.floor(A/P),G=j+1,it=$-j,J=new l(it);let ft=0;const vt=new Array(P),xt=new Array(P);let _t=0;const wt=new Uint8Array(w.buffer);for(let re=0;re<P;re++){const Vn=re<D?j:G;vt[re]=wt.slice(ft,ft+Vn),xt[re]=J.encode(vt[re]),ft+=Vn,_t=Math.max(_t,Vn)}const kt=new Uint8Array(C);let mt=0,Et,St;for(Et=0;Et<_t;Et++)for(St=0;St<P;St++)Et<vt[St].length&&(kt[mt++]=vt[St][Et]);for(Et=0;Et<it;Et++)for(St=0;St<P;St++)kt[mt++]=xt[St][Et];return kt}function k(w,E,S,C){let I;if(Array.isArray(w))I=h.fromArray(w);else if(typeof w=="string"){let $=E;if(!$){const j=h.rawSplit(w);$=c.getBestVersionForData(j,S)}I=h.fromString(w,$||40)}else throw new Error("Invalid data");const A=c.getBestVersionForData(I,S);if(!A)throw new Error("The amount of data is too big to be stored in a QR Code");if(!E)E=A;else if(E<A)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+A+`.
`);const P=v(E,S,I),B=n.getSymbolSize(E),D=new i(B);return f(D,E),m(D),p(D,E),b(D,S,0),E>=7&&g(D,E),y(D,P),isNaN(C)&&(C=a.getBestMask(D,b.bind(null,D,S))),a.applyMask(C,D),b(D,S,C),{modules:D,version:E,errorCorrectionLevel:S,maskPattern:C,segments:I}}return oi.create=function(E,S){if(typeof E>"u"||E==="")throw new Error("No input text");let C=t.M,I,A;return typeof S<"u"&&(C=t.from(S.errorCorrectionLevel,t.M),I=c.from(S.version),A=a.from(S.maskPattern),S.toSJISFunc&&n.setToSJISFunction(S.toSJISFunc)),k(E,I,C,A)},oi}var Ei={},Si={},fa;function Sr(){return fa||(fa=1,(function(n){function t(e){if(typeof e=="number"&&(e=e.toString()),typeof e!="string")throw new Error("Color should be defined as hex string");let i=e.slice().replace("#","").split("");if(i.length<3||i.length===5||i.length>8)throw new Error("Invalid hex color: "+e);(i.length===3||i.length===4)&&(i=Array.prototype.concat.apply([],i.map(function(o){return[o,o]}))),i.length===6&&i.push("F","F");const s=parseInt(i.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+i.slice(0,6).join("")}}n.getOptions=function(i){i||(i={}),i.color||(i.color={});const s=typeof i.margin>"u"||i.margin===null||i.margin<0?4:i.margin,o=i.width&&i.width>=21?i.width:void 0,a=i.scale||4;return{width:o,scale:o?4:a,margin:s,color:{dark:t(i.color.dark||"#000000ff"),light:t(i.color.light||"#ffffffff")},type:i.type,rendererOpts:i.rendererOpts||{}}},n.getScale=function(i,s){return s.width&&s.width>=i+s.margin*2?s.width/(i+s.margin*2):s.scale},n.getImageWidth=function(i,s){const o=n.getScale(i,s);return Math.floor((i+s.margin*2)*o)},n.qrToImageData=function(i,s,o){const a=s.modules.size,r=s.modules.data,l=n.getScale(a,o),c=Math.floor((a+o.margin*2)*l),d=o.margin*l,u=[o.color.light,o.color.dark];for(let h=0;h<c;h++)for(let f=0;f<c;f++){let m=(h*c+f)*4,p=o.color.light;if(h>=d&&f>=d&&h<c-d&&f<c-d){const g=Math.floor((h-d)/l),b=Math.floor((f-d)/l);p=u[r[g*a+b]?1:0]}i[m++]=p.r,i[m++]=p.g,i[m++]=p.b,i[m]=p.a}}})(Si)),Si}var ma;function $f(){return ma||(ma=1,(function(n){const t=Sr();function e(s,o,a){s.clearRect(0,0,o.width,o.height),o.style||(o.style={}),o.height=a,o.width=a,o.style.height=a+"px",o.style.width=a+"px"}function i(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}n.render=function(o,a,r){let l=r,c=a;typeof l>"u"&&(!a||!a.getContext)&&(l=a,a=void 0),a||(c=i()),l=t.getOptions(l);const d=t.getImageWidth(o.modules.size,l),u=c.getContext("2d"),h=u.createImageData(d,d);return t.qrToImageData(h.data,o,l),e(u,c,d),u.putImageData(h,0,0),c},n.renderToDataURL=function(o,a,r){let l=r;typeof l>"u"&&(!a||!a.getContext)&&(l=a,a=void 0),l||(l={});const c=n.render(o,a,l),d=l.type||"image/png",u=l.rendererOpts||{};return c.toDataURL(d,u.quality)}})(Ei)),Ei}var Ci={},pa;function zf(){if(pa)return Ci;pa=1;const n=Sr();function t(s,o){const a=s.a/255,r=o+'="'+s.hex+'"';return a<1?r+" "+o+'-opacity="'+a.toFixed(2).slice(1)+'"':r}function e(s,o,a){let r=s+o;return typeof a<"u"&&(r+=" "+a),r}function i(s,o,a){let r="",l=0,c=!1,d=0;for(let u=0;u<s.length;u++){const h=Math.floor(u%o),f=Math.floor(u/o);!h&&!c&&(c=!0),s[u]?(d++,u>0&&h>0&&s[u-1]||(r+=c?e("M",h+a,.5+f+a):e("m",l,0),l=0,c=!1),h+1<o&&s[u+1]||(r+=e("h",d),d=0)):l++}return r}return Ci.render=function(o,a,r){const l=n.getOptions(a),c=o.modules.size,d=o.modules.data,u=c+l.margin*2,h=l.color.light.a?"<path "+t(l.color.light,"fill")+' d="M0 0h'+u+"v"+u+'H0z"/>':"",f="<path "+t(l.color.dark,"stroke")+' d="'+i(d,c,l.margin)+'"/>',m='viewBox="0 0 '+u+" "+u+'"',g='<svg xmlns="http://www.w3.org/2000/svg" '+(l.width?'width="'+l.width+'" height="'+l.width+'" ':"")+m+' shape-rendering="crispEdges">'+h+f+`</svg>
`;return typeof r=="function"&&r(null,g),g},Ci}var ga;function Nf(){if(ga)return de;ga=1;const n=vf(),t=Of(),e=$f(),i=zf();function s(o,a,r,l,c){const d=[].slice.call(arguments,1),u=d.length,h=typeof d[u-1]=="function";if(!h&&!n())throw new Error("Callback required as last argument");if(h){if(u<2)throw new Error("Too few arguments provided");u===2?(c=r,r=a,a=l=void 0):u===3&&(a.getContext&&typeof c>"u"?(c=l,l=void 0):(c=l,l=r,r=a,a=void 0))}else{if(u<1)throw new Error("Too few arguments provided");return u===1?(r=a,a=l=void 0):u===2&&!a.getContext&&(l=r,r=a,a=void 0),new Promise(function(f,m){try{const p=t.create(r,l);f(o(p,a,l))}catch(p){m(p)}})}try{const f=t.create(r,l);c(null,o(f,a,l))}catch(f){c(f)}}return de.create=t.create,de.toCanvas=s.bind(null,e.render),de.toDataURL=s.bind(null,e.renderToDataURL),de.toString=s.bind(null,function(o,a,r){return i.render(o,r)}),de}var Ff=Nf();const jf=yf(Ff);async function Cr(){var o,a,r;const n=document.getElementById("mobile-app-install-modal");n&&n.remove();const t=`${window.location.origin}/#mobile_booker`;let e="";try{e=await jf.toDataURL(t,{width:240,margin:2,color:{dark:"#0f172a",light:"#ffffff"}})}catch(l){console.error("Error generating QR code:",l)}const i=`
    <div class="modal-overlay" id="mobile-app-install-modal" style="backdrop-filter: blur(8px); z-index:99999;">
      <div class="modal-content" style="max-width: 580px; padding: 2rem; border: 1px solid var(--border-bright); background: var(--bg-card); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7); border-radius: 16px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.25rem;">
          <div>
            <div style="display:inline-flex; align-items:center; gap:6px; background:rgba(56,189,248,0.12); color:#38bdf8; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:700; margin-bottom:6px;">
              📱 TRUE MOBILE PWA CLIENT
            </div>
            <h2 style="font-family:var(--font-heading); font-size:1.35rem; font-weight:800; margin:0; color:var(--text-main);">
              OneNet Mobile Sales & Order Booker
            </h2>
            <p style="font-size:0.85rem; color:var(--text-muted); margin:4px 0 0 0;">
              Zero-install progressive web application for Android, iPhone, iPad and handheld POS.
            </p>
          </div>
          <button class="btn-icon" id="btn-close-mobile-app-modal" style="border:none; font-size:1.2rem; cursor:pointer;">✕</button>
        </div>

        <div style="display:flex; flex-direction:column; align-items:center; text-align:center; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:12px; padding:1.25rem; margin-bottom:1.5rem;">
          <div style="background:#ffffff; padding:10px; border-radius:12px; box-shadow:0 8px 24px rgba(0,0,0,0.3); margin-bottom:0.75rem;">
            ${e?`<img src="${e}" alt="Scan Mobile App QR Code" style="width:190px; height:190px; display:block;" />`:'<div style="width:190px; height:190px; display:flex; align-items:center; justify-content:center;">Generating QR...</div>'}
          </div>
          <span style="font-size:0.85rem; font-weight:700; color:var(--text-main);">
            Scan with your Phone's Camera to open instantly
          </span>
          <span style="font-size:0.75rem; color:var(--text-muted); margin-top:2px; word-break:break-all;">
            ${t}
          </span>
        </div>

        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; margin-bottom:1.5rem;">
          <div style="background:var(--bg-input); border:1px solid var(--border-color); border-radius:10px; padding:1rem;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.5rem;">
              <span style="font-size:1.2rem;">🤖</span>
              <strong style="font-size:0.88rem; color:var(--text-main);">Android (Chrome)</strong>
            </div>
            <ol style="margin:0; padding-left:1.1rem; font-size:0.78rem; color:var(--text-muted); line-height:1.5;">
              <li>Open URL in <b>Google Chrome</b></li>
              <li>Tap the <b>3 dots (⋮)</b> top right</li>
              <li>Tap <b>"Install App"</b> or <b>"Add to Home screen"</b></li>
              <li>Launches full-screen with offline support</li>
            </ol>
          </div>

          <div style="background:var(--bg-input); border:1px solid var(--border-color); border-radius:10px; padding:1rem;">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:0.5rem;">
              <span style="font-size:1.2rem;">🍏</span>
              <strong style="font-size:0.88rem; color:var(--text-main);">Apple iOS (Safari)</strong>
            </div>
            <ol style="margin:0; padding-left:1.1rem; font-size:0.78rem; color:var(--text-muted); line-height:1.5;">
              <li>Open URL in <b>Safari</b></li>
              <li>Tap the <b>Share button (⎋)</b> bottom center</li>
              <li>Scroll down and tap <b>"Add to Home Screen"</b></li>
              <li>Enjoy standalone app experience</li>
            </ol>
          </div>
        </div>

        <div style="background:rgba(56,189,248,0.06); border:1px solid rgba(56,189,248,0.2); border-radius:10px; padding:0.85rem; margin-bottom:1.5rem;">
          <div style="font-size:0.8rem; font-weight:700; color:#38bdf8; margin-bottom:4px;">✨ Built-in Mobile Capabilities:</div>
          <div style="display:flex; flex-wrap:wrap; gap:8px; font-size:0.75rem; color:var(--text-muted);">
            <span>✓ Offline IndexedDB Storage</span>
            <span>•</span>
            <span>✓ Camera Barcode / QR Scanner</span>
            <span>•</span>
            <span>✓ GPS Location Verification</span>
            <span>•</span>
            <span>✓ Thermal Receipt Slip Share</span>
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:0.75rem;">
          <button class="btn btn-outline" id="btn-copy-mobile-url" style="font-size:0.85rem;">
            📋 Copy Mobile URL
          </button>
          <button class="btn btn-primary" id="btn-launch-mobile-booker-now" style="font-size:0.85rem; font-weight:700;">
            🚀 Open Booker in Browser
          </button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",i);const s=document.getElementById("mobile-app-install-modal");(o=document.getElementById("btn-close-mobile-app-modal"))==null||o.addEventListener("click",()=>s.remove()),s.addEventListener("click",l=>{l.target===s&&s.remove()}),(a=document.getElementById("btn-copy-mobile-url"))==null||a.addEventListener("click",()=>{navigator.clipboard.writeText(t).then(()=>{M("Mobile URL copied to clipboard!","success")})}),(r=document.getElementById("btn-launch-mobile-booker-now"))==null||r.addEventListener("click",()=>{s.remove(),window.location.hash="#mobile_booker"})}let ba=JSON.parse(localStorage.getItem("apexerppos_offline_orders")||"[]");function Hf(n){var t;n.innerHTML=`
    <div style="max-width: 600px; margin: 0 auto; padding-bottom: 70px;">
      <!-- Mobile App Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
        <div>
          <span class="tag tag-info" style="font-size:0.75rem;">Field Booker PWA</span>
          <h2 style="font-family:var(--font-heading); font-size:1.4rem; font-weight:700; margin-top:4px;">Mobile Order Booker</h2>
        </div>
        <div style="display:flex; gap:8px;">
          <button class="btn btn-outline btn-sm" id="btn-show-qr-install" style="color:#38bdf8; border-color:rgba(56,189,248,0.4);">
            📲 Install on Phone
          </button>
          <button class="btn btn-outline btn-sm" id="btn-camera-scanner">
            📷 Scan Barcode
          </button>
        </div>
      </div>

      <!-- GPS Geo-Location Card -->
      <div class="glass-panel" style="margin-bottom:1rem; padding:1rem; border-color:rgba(56,189,248,0.3);">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size:0.75rem; color:var(--text-muted); text-transform:uppercase;">Sales Rep GPS Tagging</div>
            <div id="gps-status-text" style="font-weight:600; font-size:0.9rem; color:#38bdf8;">📍 Acquiring GPS Coordinates...</div>
          </div>
          <button class="btn btn-primary btn-sm" id="btn-refresh-gps">Check-in</button>
        </div>
      </div>

      <!-- Customer Selector -->
      <div class="glass-panel" style="margin-bottom:1rem; padding:1rem;">
        <label class="form-label">Select Shop / Customer:</label>
        <select id="mobile-cust-select" class="form-control" style="font-size:0.95rem;">
          ${_.customers.map(e=>`
            <option value="${e.id}">${e.business_name||e.name} - ${e.city}</option>
          `).join("")}
        </select>
        <div id="cust-balance-preview" style="font-size:0.8rem; color:var(--text-muted); margin-top:6px;">
          Outstanding Balance: <strong style="color:#f87171;">${T(((t=_.customers[1])==null?void 0:t.current_balance)||0)}</strong>
        </div>
      </div>

      <!-- Product Catalog Cards -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
        <h3 style="font-size:1.05rem; font-weight:700;">Catalog</h3>
        <span style="font-size:0.8rem; color:var(--text-muted);"><span id="mobile-cart-count">0</span> items selected</span>
      </div>

      <div style="display:flex; flex-direction:column; gap:0.75rem; margin-bottom:1.5rem;" id="mobile-prods-list">
        ${_.products.map(e=>`
          <div style="display:flex; justify-content:space-between; align-items:center; padding:0.9rem 1rem; background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md);">
            <div>
              <div style="font-weight:600; font-size:0.92rem; color:#ffffff;">${e.name}</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">${e.sku} | In Stock: ${e.stock}</div>
              <div style="font-weight:700; color:#38bdf8; font-size:1rem; margin-top:2px;">${T(e.selling_price)}</div>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <button class="btn btn-outline btn-sm mobile-add-btn" data-prod-id="${e.id}" style="padding:0.4rem 0.85rem; font-weight:700;">
                + Add
              </button>
            </div>
          </div>
        `).join("")}
      </div>

      <!-- Mobile Checkout Footer -->
      <div style="position:fixed; bottom:0; left:0; right:0; background:var(--bg-surface); border-top:1px solid var(--border-color); padding:1rem; backdrop-filter:blur(16px); z-index:900;">
        <div style="max-width:600px; margin:0 auto; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="font-size:0.75rem; color:var(--text-muted);">Total Order:</div>
            <div id="mobile-order-total" style="font-family:var(--font-heading); font-size:1.3rem; font-weight:800; color:#38bdf8;">Rs. 0.00</div>
          </div>
          <button class="btn btn-success" id="btn-submit-mobile-order" style="padding:0.75rem 1.5rem; font-size:0.95rem;">
            Confirm & Dispatch Order
          </button>
        </div>
      </div>
    </div>
  `,Mr(),Vf()}function Mr(){const n=document.getElementById("gps-status-text");"geolocation"in navigator?navigator.geolocation.getCurrentPosition(t=>{_.mobileCart.geoLat=t.coords.latitude,_.mobileCart.geoLng=t.coords.longitude,n&&(n.innerHTML=`📍 GPS Verified: ${t.coords.latitude.toFixed(4)}, ${t.coords.longitude.toFixed(4)}`)},()=>{_.mobileCart.geoLat=24.8607,_.mobileCart.geoLng=67.0011,n&&(n.innerHTML="📍 GPS Tagged: 24.8607° N, 67.0011° E (Store)")}):(_.mobileCart.geoLat=24.8607,_.mobileCart.geoLng=67.0011,n&&(n.innerHTML="📍 GPS Tagged: 24.8607° N, 67.0011° E"))}function Vf(){var n,t,e,i;(n=document.getElementById("btn-show-qr-install"))==null||n.addEventListener("click",()=>{Cr()}),(t=document.getElementById("btn-refresh-gps"))==null||t.addEventListener("click",()=>{Mr(),M("Shop visit GPS coordinates updated","success")}),document.querySelectorAll(".mobile-add-btn").forEach(s=>{s.addEventListener("click",()=>{const o=Number(s.dataset.prodId),a=_.products.find(r=>r.id===o);if(a){const r=_.mobileCart.items.find(l=>l.product_id===a.id);r?r.quantity+=1:_.mobileCart.items.push({product_id:a.id,name:a.name,unit_price:Number(a.selling_price),tax_rate:Number(a.tax_rate||18),quantity:1}),xn(),M(`Added: ${a.name}`,"info")}})}),(e=document.getElementById("btn-camera-scanner"))==null||e.addEventListener("click",qf),(i=document.getElementById("btn-submit-mobile-order"))==null||i.addEventListener("click",async()=>{var a;if(_.mobileCart.items.length===0){M("Please add products to the mobile order first","error");return}const o={customer_id:((a=document.getElementById("mobile-cust-select"))==null?void 0:a.value)||2,items:_.mobileCart.items,geo_latitude:_.mobileCart.geoLat,geo_longitude:_.mobileCart.geoLng,notes:"Booked via Mobile Order Booker PWA"};try{const r=await R.post("/sales/orders",o);r.success&&(M(`Order ${r.order.order_number} successfully booked!`,"success"),_.mobileCart.items=[],xn())}catch{ba.push(o),localStorage.setItem("apexerppos_offline_orders",JSON.stringify(ba)),M("Offline Mode: Order queued locally and will sync when online!","warning"),_.mobileCart.items=[],xn()}})}function xn(){const n=document.getElementById("mobile-cart-count"),t=document.getElementById("mobile-order-total");let e=0,i=0;for(const s of _.mobileCart.items){i+=s.quantity;const o=s.unit_price*s.quantity,a=o*s.tax_rate/100;e+=o+a}n&&(n.textContent=i),t&&(t.textContent=T(e))}function qf(){var s,o;const n=`
    <div class="modal-overlay" id="camera-scanner-modal">
      <div class="modal-content" style="max-width:440px; text-align:center;">
        <div class="modal-header">
          <h3 class="modal-title">Smartphone Camera Scanner</h3>
          <button class="btn-icon btn-sm" id="btn-close-camera">✕</button>
        </div>
        <div class="modal-body">
          <div style="position:relative; width:100%; height:240px; background:#000000; border-radius:12px; overflow:hidden; display:flex; align-items:center; justify-content:center;">
            <video id="camera-stream-video" autoplay playsinline style="width:100%; height:100%; object-fit:cover;"></video>
            <!-- Target Reticle -->
            <div style="position:absolute; width:180px; height:120px; border:2px solid #38bdf8; border-radius:8px; box-shadow:0 0 20px rgba(56,189,248,0.5);"></div>
            <div style="position:absolute; bottom:10px; font-size:11px; color:#ffffff; background:rgba(0,0,0,0.6); padding:3px 10px; border-radius:12px;">Align Barcode inside reticle</div>
          </div>

          <p style="font-size:0.85rem; color:var(--text-muted); margin-top:8px;">
            Point your smartphone camera at a product barcode or select a demo barcode below:
          </p>

          <div style="display:flex; flex-wrap:wrap; gap:6px; justify-content:center;">
            ${_.products.slice(0,4).map(a=>`
              <button class="btn btn-outline btn-sm sim-scan-btn" data-barcode="${a.barcode}">
                ${a.name.slice(0,15)} (${a.barcode})
              </button>
            `).join("")}
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-dismiss-camera">Close Camera</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("camera-scanner-modal"),e=document.getElementById("camera-stream-video");navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}).then(a=>{e&&(e.srcObject=a)}).catch(a=>{console.log("[Camera] Simulated preview (camera permission or desktop):",a.message)});const i=()=>{e&&e.srcObject&&e.srcObject.getTracks().forEach(a=>a.stop()),t.remove()};(s=document.getElementById("btn-close-camera"))==null||s.addEventListener("click",i),(o=document.getElementById("btn-dismiss-camera"))==null||o.addEventListener("click",i),t.querySelectorAll(".sim-scan-btn").forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.barcode,l=_.products.find(c=>c.barcode===r);l&&(_.mobileCart.items.push({product_id:l.id,name:l.name,unit_price:Number(l.selling_price),tax_rate:Number(l.tax_rate||18),quantity:1}),xn(),M(`Camera Scanned: ${l.name}`,"success"),i())})})}async function Wf(){var n;try{const t=await R.get("/companies");if(t.success&&t.companies.length>0){_.companies=t.companies;const e=((n=_.currentUser)==null?void 0:n.assigned_companies)||[1],i=t.companies.find(s=>{var o;return s.id===((o=_.activeCompany)==null?void 0:o.id)&&e.includes(s.id)});i?_.activeCompany=i:_.activeCompany=t.companies.find(s=>e.includes(s.id))||t.companies[0],localStorage.setItem("onenet_active_company",JSON.stringify(_.activeCompany))}}catch(t){console.warn("Could not fetch companies:",t)}Fn()}function Fn(){var a,r,l,c;const n=document.getElementById("company-switcher-container");if(!n)return;const t=_.activeCompany||{id:1,name:"OneNet Solutions"},e=((a=_.currentUser)==null?void 0:a.assigned_companies)||[1,2,3],i=_.companies.filter(d=>e.includes(d.id));n.innerHTML=`
    <div class="company-dropdown-wrapper">
      <div class="company-badge-btn" id="btn-toggle-company-menu" title="Switch Company Context">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18"></path><path d="M5 21V7l8-4v18"></path><path d="M19 21V11l-6-4"></path><path d="M9 9h1"></path><path d="M9 13h1"></path><path d="M9 17h1"></path></svg>
        <span class="active-comp-name">${t.name}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
      <div class="company-dropdown-menu" id="company-dropdown-menu" style="display:none;">
        <div class="company-menu-header">
          <span>Active Company Context</span>
          <button class="btn-xs btn-outline" id="btn-edit-active-company" title="Edit Company Settings">✏️ Settings</button>
        </div>
        <div class="company-list-items">
          ${i.map(d=>`
            <div class="company-menu-item ${d.id===t.id?"active":""}" data-id="${d.id}">
              <div class="company-item-title">${d.name}</div>
              <div class="company-item-city">${d.city} | ${d.tax_id||"NTN Active"}</div>
            </div>
          `).join("")}
        </div>
        ${((r=_.currentUser)==null?void 0:r.role_name)==="Super Admin"?`
          <div class="company-menu-footer">
            <button class="btn btn-xs btn-primary" id="btn-create-company-modal" style="width:100%;">+ Add New Company Branch</button>
          </div>
        `:""}
      </div>
    </div>
  `;const s=document.getElementById("btn-toggle-company-menu"),o=document.getElementById("company-dropdown-menu");s==null||s.addEventListener("click",d=>{d.stopPropagation(),o.style.display=o.style.display==="block"?"none":"block"}),document.addEventListener("click",d=>{n.contains(d.target)||o&&(o.style.display="none")}),o==null||o.querySelectorAll(".company-menu-item").forEach(d=>{d.addEventListener("click",()=>{const u=parseInt(d.dataset.id),h=_.companies.find(f=>f.id===u);h&&(_.activeCompany=h,localStorage.setItem("onenet_active_company",JSON.stringify(h)),M(`Switched active company to: ${h.name}`,"success"),Fn())})}),(l=document.getElementById("btn-edit-active-company"))==null||l.addEventListener("click",d=>{d.stopPropagation(),o&&(o.style.display="none"),Uf(_.activeCompany)}),(c=document.getElementById("btn-create-company-modal"))==null||c.addEventListener("click",d=>{d.stopPropagation(),o&&(o.style.display="none"),Gf()})}function Uf(n){var s,o,a;const t=`
    <div class="modal-overlay" id="company-edit-modal">
      <div class="modal-content" style="max-width: 580px;">
        <div class="modal-header">
          <h3 class="modal-title">Company Profile & Invoicing Branding</h3>
          <button class="btn-icon btn-sm" id="btn-close-comp-modal">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Company Brand Display Name:</label>
            <input type="text" id="comp-name" class="form-control" value="${n.name||""}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Full Legal Entity Name:</label>
            <input type="text" id="comp-legal-name" class="form-control" value="${n.legal_name||""}" />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">NTN / Tax Registration ID:</label>
              <input type="text" id="comp-tax-id" class="form-control" value="${n.tax_id||""}" />
            </div>
            <div class="form-group">
              <label class="form-label">Sales Tax STRN:</label>
              <input type="text" id="comp-strn" class="form-control" value="${n.strn||""}" />
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">Official Phone:</label>
              <input type="text" id="comp-phone" class="form-control" value="${n.phone||""}" />
            </div>
            <div class="form-group">
              <label class="form-label">Official Email:</label>
              <input type="email" id="comp-email" class="form-control" value="${n.email||""}" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Business Address (Printed on Invoices & Thermal Slips):</label>
            <input type="text" id="comp-address" class="form-control" value="${n.address||""}" />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">City:</label>
              <input type="text" id="comp-city" class="form-control" value="${n.city||"Lahore"}" />
            </div>
            <div class="form-group">
              <label class="form-label">Base Currency:</label>
              <input type="text" id="comp-curr" class="form-control" value="${n.currency||"PKR"}" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-comp">Cancel</button>
          <button class="btn btn-primary" id="btn-save-comp">Save Changes</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",t);const e=document.getElementById("company-edit-modal"),i=()=>e==null?void 0:e.remove();(s=document.getElementById("btn-close-comp-modal"))==null||s.addEventListener("click",i),(o=document.getElementById("btn-cancel-comp"))==null||o.addEventListener("click",i),(a=document.getElementById("btn-save-comp"))==null||a.addEventListener("click",async()=>{const r={name:document.getElementById("comp-name").value.trim(),legal_name:document.getElementById("comp-legal-name").value.trim(),tax_id:document.getElementById("comp-tax-id").value.trim(),strn:document.getElementById("comp-strn").value.trim(),phone:document.getElementById("comp-phone").value.trim(),email:document.getElementById("comp-email").value.trim(),address:document.getElementById("comp-address").value.trim(),city:document.getElementById("comp-city").value.trim(),currency:document.getElementById("comp-curr").value.trim()};try{(await R.put(`/companies/${n.id}`,r)).success&&(M("Company profile updated successfully!","success"),Object.assign(n,r),localStorage.setItem("onenet_active_company",JSON.stringify(n)),Fn(),i())}catch(l){M(l.message,"error")}})}function Gf(){var i,s,o;document.body.insertAdjacentHTML("beforeend",`
    <div class="modal-overlay" id="company-create-modal">
      <div class="modal-content" style="max-width: 520px;">
        <div class="modal-header">
          <h3 class="modal-title">Register New Company / Branch</h3>
          <button class="btn-icon btn-sm" id="btn-close-create-comp">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Company / Branch Name:</label>
            <input type="text" id="new-comp-name" class="form-control" placeholder="e.g. OneNet Solutions Multan" required />
          </div>
          <div class="form-group">
            <label class="form-label">Legal Name:</label>
            <input type="text" id="new-comp-legal" class="form-control" placeholder="e.g. OneNet Multan Regional Branch Ltd" />
          </div>
          <div class="form-group">
            <label class="form-label">City:</label>
            <input type="text" id="new-comp-city" class="form-control" placeholder="e.g. Multan" />
          </div>
          <div class="form-group">
            <label class="form-label">Address:</label>
            <input type="text" id="new-comp-address" class="form-control" placeholder="e.g. Mall Plaza, Cantt" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-create-comp">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-create-comp">Create Branch</button>
        </div>
      </div>
    </div>
  `);const t=document.getElementById("company-create-modal"),e=()=>t==null?void 0:t.remove();(i=document.getElementById("btn-close-create-comp"))==null||i.addEventListener("click",e),(s=document.getElementById("btn-cancel-create-comp"))==null||s.addEventListener("click",e),(o=document.getElementById("btn-confirm-create-comp"))==null||o.addEventListener("click",async()=>{const a=document.getElementById("new-comp-name").value.trim();if(!a){M("Company name is required","error");return}try{const r=await R.post("/companies",{name:a,legal_name:document.getElementById("new-comp-legal").value.trim(),city:document.getElementById("new-comp-city").value.trim(),address:document.getElementById("new-comp-address").value.trim()});r.success&&(M(`Created branch: ${r.company.name}`,"success"),_.companies.push(r.company),_.currentUser&&_.currentUser.assigned_companies.push(r.company.id),Fn(),e())}catch(r){M(r.message,"error")}})}let Ui=null,Gi=null;async function Yf(){try{const n=await R.get("/auth/config");n.success&&n.google_client_id&&(Gi=n.google_client_id)}catch(n){console.warn("[Auth] Could not load auth config:",n.message)}}function Kf(n){var o,a,r;const t=document.getElementById("user-profile-widget-container");if(!t)return;const e=_.currentUser;if(!e){t.innerHTML=`
      <button class="btn btn-primary btn-sm" id="btn-open-login-modal">
        🔑 Sign In
      </button>
    `,(o=document.getElementById("btn-open-login-modal"))==null||o.addEventListener("click",()=>{ya(()=>{typeof n=="function"&&n()})});return}t.innerHTML=`
    <div class="user-nav-dropdown">
      <div class="user-pill-btn" id="btn-toggle-user-menu">
        <div class="user-avatar-circle">${e.full_name?e.full_name.charAt(0).toUpperCase():"U"}</div>
        <div class="user-info-text">
          <span class="user-name">${e.full_name?e.full_name.split(" ")[0]:e.username}</span>
          <span class="user-role-badge">${e.role_name||"Staff"}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
      </div>
      <div class="user-menu-dropdown" id="user-menu-dropdown" style="display:none;">
        <div class="user-menu-info">
          <strong>${e.full_name||e.username}</strong>
          <div style="font-size:11px; color:var(--text-muted);">${e.email||e.username}</div>
          <div style="font-size:10px; margin-top:2px; color:#38bdf8;">Role: ${e.role_name||"Staff"}</div>
        </div>
        <div class="user-menu-actions">
          <a href="#users" class="user-menu-action-item" id="menu-goto-rbac">
            🛡️ Enterprise RBAC & Users
          </a>
          <button class="user-menu-action-item" id="btn-switch-account">
            🔄 Switch Account
          </button>
          <button class="user-menu-action-item text-danger" id="btn-logout-session">
            🚪 Sign Out
          </button>
        </div>
      </div>
    </div>
  `;const i=document.getElementById("btn-toggle-user-menu"),s=document.getElementById("user-menu-dropdown");i==null||i.addEventListener("click",l=>{l.stopPropagation(),s.style.display=s.style.display==="block"?"none":"block"}),document.addEventListener("click",l=>{t.contains(l.target)||s&&(s.style.display="none")}),(a=document.getElementById("btn-switch-account"))==null||a.addEventListener("click",()=>{s&&(s.style.display="none"),ya(n)}),(r=document.getElementById("btn-logout-session"))==null||r.addEventListener("click",()=>{s&&(s.style.display="none"),Xf(n)})}function Xf(n){localStorage.removeItem("onenet_token"),localStorage.removeItem("onenet_user"),localStorage.removeItem("apexerppos_token"),_.currentUser=null,M("You have been signed out.","info"),gs(n)}async function gs(n){var o,a;n&&(Ui=n);const t=document.getElementById("auth-root"),e=document.getElementById("app-root");if(e&&(e.style.display="none"),!t)return;await Yf(),t.style.display="flex",t.innerHTML=`
    <div class="auth-card" style="max-width:440px; width:100%; border:1px solid var(--border-bright); box-shadow:0 25px 60px -15px rgba(0,0,0,0.8); border-radius:18px; padding:2.25rem 2rem; background:linear-gradient(180deg, #131d33 0%, #0c1322 100%);">
      <!-- Enterprise Branding -->
      <div style="text-align:center; margin-bottom:1.75rem;">
        <div class="brand-logo-icon" style="margin: 0 auto 0.9rem auto; width: 56px; height: 56px; box-shadow: 0 10px 30px rgba(14, 165, 233, 0.45); border-radius:14px; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg, #0ea5e9 0%, #4f46e5 100%);">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5"><polygon points="12 2 2 22 22 22 12 2"></polygon></svg>
        </div>
        <h1 style="font-family:var(--font-heading); font-size:1.65rem; font-weight:800; letter-spacing:-0.02em; background:linear-gradient(90deg,#38bdf8,#818cf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin:0;">
          OneNet Solutions
        </h1>
        <div style="display:inline-block; margin-top:6px; padding:2px 10px; background:rgba(56,189,248,0.1); border:1px solid rgba(56,189,248,0.25); border-radius:20px; font-size:0.75rem; font-weight:700; color:#38bdf8; letter-spacing:0.5px;">
          ENTERPRISE SUITE
        </div>
        <p style="font-size:0.82rem; color:var(--text-muted); margin-top:8px; line-height:1.4;">
          Cloud Accounting, Multi-Company ERP, POS & HR Payroll
        </p>
      </div>

      <!-- Real Google Identity Services (GSI) Container -->
      <div id="google-auth-wrapper" style="margin-bottom:1.25rem;">
        <div id="g_id_onload"></div>
        <div id="google-btn-rendered" style="display:flex; justify-content:center; width:100%;"></div>

        <button class="btn btn-outline" id="portal-btn-google-sso" style="width:100%; display:flex; justify-content:center; align-items:center; gap:0.75rem; padding:0.75rem; background:rgba(255,255,255,0.04); border:1px solid var(--border-color); border-radius:10px; transition:all 0.2s ease;">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
          <span style="font-weight:600; font-size:0.9rem; color:var(--text-main);">Sign in with Google</span>
        </button>
      </div>

      <div style="display:flex; align-items:center; margin:1.25rem 0; color:#64748b; font-size:0.72rem; text-transform:uppercase; letter-spacing:1px;">
        <div style="flex:1; height:1px; background:rgba(255,255,255,0.08);"></div>
        <span style="padding:0 0.75rem; font-weight:700; color:var(--text-muted);">Or Enterprise Login</span>
        <div style="flex:1; height:1px; background:rgba(255,255,255,0.08);"></div>
      </div>

      <!-- Professional Login Form -->
      <form id="portal-login-form">
        <div class="form-group" style="margin-bottom:1rem;">
          <label class="form-label" for="portal-username" style="display:flex; justify-content:space-between; font-size:0.8rem; font-weight:600; color:var(--text-main);">
            <span>Username or Corporate Email</span>
          </label>
          <div style="position:relative;">
            <input type="text" id="portal-username" class="form-control" placeholder="admin or user@company.com" required autocomplete="username" style="padding-left:2.5rem; border-radius:10px;" />
            <div style="position:absolute; left:0.85rem; top:50%; transform:translateY(-50%); color:var(--text-muted); pointer-events:none;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
          </div>
        </div>

        <div class="form-group" style="margin-bottom:1.2rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
            <label class="form-label" for="portal-password" style="font-size:0.8rem; font-weight:600; margin:0; color:var(--text-main);">Password</label>
            <button type="button" id="btn-forgot-password-modal" style="background:none; border:none; color:#38bdf8; font-size:0.75rem; cursor:pointer; padding:0; text-decoration:underline;">
              Forgot access?
            </button>
          </div>
          <div style="position:relative;">
            <input type="password" id="portal-password" class="form-control" placeholder="••••••••" required autocomplete="current-password" style="padding-left:2.5rem; padding-right:2.8rem; border-radius:10px;" />
            <div style="position:absolute; left:0.85rem; top:50%; transform:translateY(-50%); color:var(--text-muted); pointer-events:none;">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <button type="button" id="portal-toggle-password" style="position:absolute; right:0.75rem; top:50%; transform:translateY(-50%); background:none; border:none; color:var(--text-muted); cursor:pointer; padding:4px;" title="Show/Hide Password">
              👁️
            </button>
          </div>
        </div>

        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1.35rem; font-size:0.8rem;">
          <label style="display:inline-flex; align-items:center; gap:8px; cursor:pointer; color:var(--text-muted); user-select:none;">
            <input type="checkbox" id="portal-remember-me" checked style="accent-color:#0ea5e9; width:15px; height:15px;" />
            <span>Remember session on this device</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary" id="portal-submit-btn" style="width:100%; padding:0.85rem; font-weight:700; font-size:0.95rem; border-radius:10px; box-shadow:0 4px 18px rgba(14,165,233,0.35); display:flex; justify-content:center; align-items:center; gap:8px;">
          <span>Sign In to Workspace</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </form>

      <!-- Enterprise Compliance & Security Footer -->
      <div style="margin-top:1.5rem; padding-top:1.1rem; border-top:1px solid rgba(255,255,255,0.06); text-align:center;">
        <div style="display:flex; justify-content:center; align-items:center; gap:12px; font-size:0.72rem; color:#64748b;">
          <span>🔒 TLS 256-Bit Encrypted</span>
          <span>•</span>
          <span>PostgreSQL Active</span>
          <span>•</span>
          <span>Multi-Tenant RBAC</span>
        </div>
      </div>
    </div>
  `;const i=document.getElementById("portal-password"),s=document.getElementById("portal-toggle-password");s==null||s.addEventListener("click",()=>{i.type==="password"?(i.type="text",s.textContent="🔒"):(i.type="password",s.textContent="👁️")}),(o=document.getElementById("btn-forgot-password-modal"))==null||o.addEventListener("click",()=>{tm()}),Jf(),(a=document.getElementById("portal-login-form"))==null||a.addEventListener("submit",async r=>{r.preventDefault();const l=document.getElementById("portal-username").value.trim(),c=document.getElementById("portal-password").value,d=document.getElementById("portal-submit-btn");d&&(d.disabled=!0,d.innerHTML=`
        <span class="status-dot-pulse" style="background:#fff;"></span>
        <span>Authenticating...</span>
      `);try{const u=await R.post("/auth/login",{username:l,password:c});u.success&&jn(u)}catch(u){M(u.message||"Login failed","error"),d&&(d.disabled=!1,d.innerHTML=`
          <span>Sign In to Workspace</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        `)}})}function Jf(){var e,i;const n=document.getElementById("portal-btn-google-sso"),t=document.getElementById("google-btn-rendered");if(Gi&&((i=(e=window.google)==null?void 0:e.accounts)!=null&&i.id)&&t)try{window.google.accounts.id.initialize({client_id:Gi,callback:Qf,auto_select:!1,cancel_on_tap_outside:!0}),window.google.accounts.id.renderButton(t,{theme:"filled_blue",size:"large",shape:"rectangular",width:380,text:"continue_with",logo_alignment:"left"}),n&&(n.style.display="none");return}catch(s){console.warn("[Google Auth] Failed to initialize Google Identity Services:",s)}n&&(n.style.display="flex",n.addEventListener("click",()=>{Zf()}))}async function Qf(n){try{M("Verifying Google authorization token with Google servers...","info");const t=await R.post("/auth/google",{credential:n.credential});t.success&&(M("Google identity verified successfully!","success"),jn(t))}catch(t){M(t.message||"Google authentication failed","error")}}function Zf(){var i,s;const n=document.getElementById("google-config-modal");n&&n.remove();const t=`
    <div class="modal-overlay" id="google-config-modal" style="backdrop-filter: blur(8px); z-index:99999;">
      <div class="modal-content" style="max-width: 520px; padding: 2rem; border: 1px solid var(--border-bright); background: var(--bg-card); border-radius:16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.25rem;">
          <div>
            <div style="display:inline-flex; align-items:center; gap:6px; background:rgba(66,133,244,0.12); color:#4285F4; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:700; margin-bottom:6px;">
              GOOGLE CLOUD AUTHENTICATION
            </div>
            <h2 style="font-family:var(--font-heading); font-size:1.25rem; font-weight:800; margin:0; color:var(--text-main);">
              Real Google Sign-In Setup
            </h2>
          </div>
          <button class="btn-icon" id="btn-close-google-modal" style="border:none; cursor:pointer;">✕</button>
        </div>

        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:1rem;">
          To connect live Google Single Sign-On (SSO) on your domain, configure your Google Cloud OAuth Client ID in your backend environment:
        </p>

        <div style="background:var(--bg-input); border:1px solid var(--border-color); border-radius:10px; padding:1rem; margin-bottom:1.25rem; font-size:0.8rem;">
          <div style="font-weight:700; margin-bottom:6px; color:#38bdf8;">Setup Steps:</div>
          <ol style="margin:0; padding-left:1.2rem; color:var(--text-main); line-height:1.6;">
            <li>Go to <a href="https://console.cloud.google.com/apis/credentials" target="_blank" style="color:#38bdf8; text-decoration:underline;">Google Cloud Console Credentials</a></li>
            <li>Create an <b>OAuth 2.0 Client ID</b> (Web application)</li>
            <li>Add <code>${window.location.origin}</code> to <b>Authorized JavaScript origins</b></li>
            <li>In <code>backend/.env</code>, add:<br><code style="background:rgba(0,0,0,0.3); padding:2px 6px; border-radius:4px; display:inline-block; margin-top:3px; color:#4ade80;">GOOGLE_CLIENT_ID="YOUR_CLIENT_ID.apps.googleusercontent.com"</code></li>
          </ol>
        </div>

        <!-- Quick Live Test / Manual Google Authentication -->
        <div style="border-top:1px solid var(--border-color); padding-top:1rem; margin-top:1rem;">
          <div style="font-size:0.8rem; font-weight:700; color:var(--text-main); margin-bottom:0.5rem;">
            Test Real Backend Token / Account Provisioning:
          </div>
          <form id="form-quick-google-auth" style="display:flex; flex-direction:column; gap:0.6rem;">
            <input type="email" id="quick-google-email" class="form-control" placeholder="yourname@gmail.com or corporate@company.com" required style="font-size:0.85rem;" />
            <input type="text" id="quick-google-name" class="form-control" placeholder="Full Name (e.g. Alex Henderson)" style="font-size:0.85rem;" />
            <button type="submit" class="btn btn-primary" style="font-weight:700; font-size:0.85rem; padding:0.7rem; background:#4285F4; border-color:#4285F4;">
              ⚡ Authenticate Verified Google Account
            </button>
          </form>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",t);const e=document.getElementById("google-config-modal");(i=document.getElementById("btn-close-google-modal"))==null||i.addEventListener("click",()=>e.remove()),e.addEventListener("click",o=>{o.target===e&&e.remove()}),(s=document.getElementById("form-quick-google-auth"))==null||s.addEventListener("submit",async o=>{o.preventDefault();const a=document.getElementById("quick-google-email").value.trim(),r=document.getElementById("quick-google-name").value.trim();try{const l=await R.post("/auth/google",{email:a,name:r||a.split("@")[0],google_id:"google_oauth_"+Date.now()});l.success&&(e.remove(),M(`Google Authentication successful for ${a}!`,"success"),jn(l))}catch(l){M(l.message,"error")}})}function tm(){var i,s;const n=document.getElementById("access-recovery-modal");n&&n.remove(),document.body.insertAdjacentHTML("beforeend",`
    <div class="modal-overlay" id="access-recovery-modal" style="backdrop-filter: blur(8px); z-index:99999;">
      <div class="modal-content" style="max-width: 460px; padding: 2rem; border: 1px solid var(--border-bright); background: var(--bg-card); border-radius:16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:1.25rem;">
          <div>
            <h2 style="font-family:var(--font-heading); font-size:1.25rem; font-weight:800; margin:0; color:var(--text-main);">
              Corporate Access Assistance
            </h2>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:4px 0 0 0;">
              OneNet Solutions Enterprise Security Gateway
            </p>
          </div>
          <button class="btn-icon" id="btn-close-recovery-modal" style="border:none; cursor:pointer;">✕</button>
        </div>

        <div style="background:var(--bg-input); border:1px solid var(--border-color); border-radius:10px; padding:1.25rem; margin-bottom:1.25rem; font-size:0.85rem; line-height:1.6; color:var(--text-main);">
          <p style="margin-top:0;">
            For security reasons, password resets in OneNet Enterprise Suite are managed through your organization's designated System Administrator or via server-level tools.
          </p>
          <div style="font-weight:700; color:#38bdf8; margin-top:0.75rem;">Default System Credentials:</div>
          <ul style="margin:0; padding-left:1.2rem; font-size:0.82rem; color:var(--text-muted);">
            <li>Master Admin: <code>admin</code> / <code>Admin@123456</code></li>
            <li>Store Manager: <code>manager</code> / <code>Admin@123456</code></li>
            <li>POS Cashier: <code>cashier1</code> / <code>Admin@123456</code></li>
          </ul>
          <p style="margin-bottom:0; margin-top:0.75rem; font-size:0.78rem; color:#94a3b8;">
            To modify user passwords or roles, sign in as Master Admin and navigate to <b>Security & RBAC</b>.
          </p>
        </div>

        <div style="display:flex; justify-content:flex-end;">
          <button class="btn btn-primary" id="btn-dismiss-recovery">Got it</button>
        </div>
      </div>
    </div>
  `);const e=document.getElementById("access-recovery-modal");(i=document.getElementById("btn-close-recovery-modal"))==null||i.addEventListener("click",()=>e.remove()),(s=document.getElementById("btn-dismiss-recovery"))==null||s.addEventListener("click",()=>e.remove()),e.addEventListener("click",o=>{o.target===e&&e.remove()})}function jn(n){R.setToken(n.token),localStorage.setItem("onenet_user",JSON.stringify(n.user)),_.currentUser=n.user,M(`Welcome, ${n.user.full_name}! (${n.user.role_name})`,"success");const t=document.getElementById("auth-root");t&&(t.style.display="none");const e=document.getElementById("app-root");e&&(e.style.display="flex"),typeof Ui=="function"&&Ui()}function ya(n){var s,o;const t=document.getElementById("login-modal");t&&t.remove(),document.body.insertAdjacentHTML("beforeend",`
    <div class="modal-overlay" id="login-modal" style="backdrop-filter: blur(8px); z-index:9999;">
      <div class="modal-content" style="max-width: 440px; padding: 2rem; border: 1px solid var(--border-bright); background: #0f172a; border-radius:16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
          <div>
            <h2 style="font-family:var(--font-heading); font-size:1.25rem; font-weight:800; margin:0;">Switch User Account</h2>
            <p style="font-size:0.8rem; color:var(--text-muted); margin:3px 0 0 0;">Enter your enterprise credentials</p>
          </div>
          <button class="btn-icon" id="btn-close-login-modal" style="border:none; cursor:pointer;">✕</button>
        </div>

        <form id="modal-login-form">
          <div class="form-group" style="margin-bottom:0.9rem;">
            <label class="form-label">Username or Corporate Email:</label>
            <input type="text" id="modal-login-username" class="form-control" placeholder="e.g. admin or user@domain.com" required autocomplete="username" />
          </div>
          <div class="form-group" style="margin-bottom:1.2rem;">
            <label class="form-label">Password:</label>
            <input type="password" id="modal-login-password" class="form-control" placeholder="••••••••" required autocomplete="current-password" />
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%; padding:0.8rem; font-weight:700; border-radius:10px;">
            Sign In to New Session
          </button>
        </form>
      </div>
    </div>
  `);const i=document.getElementById("login-modal");(s=document.getElementById("btn-close-login-modal"))==null||s.addEventListener("click",()=>i.remove()),i.addEventListener("click",a=>{a.target===i&&i.remove()}),(o=document.getElementById("modal-login-form"))==null||o.addEventListener("submit",async a=>{a.preventDefault();const r=document.getElementById("modal-login-username").value.trim(),l=document.getElementById("modal-login-password").value;try{const c=await R.post("/auth/login",{username:r,password:l});c.success&&(i.remove(),jn(c),typeof n=="function"&&n())}catch(c){M(c.message,"error")}})}let De=[],ct={};const em=[{key:"pos",name:"⚡ Point of Sale (POS)"},{key:"inventory",name:"📦 Inventory & Warehouses"},{key:"sales",name:"🧾 Sales & E-Invoicing"},{key:"accounting",name:"📚 Accounting & Ledgers"},{key:"manufacturing",name:"⚙️ Manufacturing & BOM"},{key:"mobile_booker",name:"📱 Mobile Order Booker"},{key:"payroll",name:"👥 HR, Attendance & Payroll"},{key:"reports",name:"📊 Enterprise Reports"},{key:"backup",name:"💾 Database Backup & Restore"},{key:"users",name:"🛡️ User Accounts & Security"}],nm=["view","create","edit","delete","approve","export"];async function im(n){var e,i;n.innerHTML=`
    <div class="page-header">
      <div>
        <h1 class="page-title">Enterprise Security & RBAC</h1>
        <p class="page-subtitle">User Accounts, Company Grants & Customizable Module Permissions Matrix</p>
      </div>
      <div style="display:flex; gap:0.75rem;">
        <button class="btn btn-outline" id="btn-save-matrix">
          💾 Save Permissions Matrix
        </button>
        <button class="btn btn-primary" id="btn-create-user-modal">
          + Add New User Account
        </button>
      </div>
    </div>

    <!-- TABS -->
    <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:0.5rem;">
      <button class="btn btn-outline btn-sm active users-tab-btn" data-tab="accounts">User Accounts & Roles</button>
      <button class="btn btn-outline btn-sm users-tab-btn" data-tab="matrix">Module Permissions Matrix</button>
    </div>

    <div id="users-tab-content">
      <!-- Loaded dynamically -->
    </div>
  `;try{const[s,o]=await Promise.all([R.get("/users"),R.get("/users/permissions/matrix")]);s.success&&(De=s.users),o.success&&(ct=o.matrix,_.permissionsMatrix=o.matrix)}catch(s){M(s.message,"error")}const t=s=>{n.querySelectorAll(".users-tab-btn").forEach(a=>{a.classList.toggle("active",a.dataset.tab===s)});const o=document.getElementById("users-tab-content");s==="accounts"?bs(o):sm(o)};n.querySelectorAll(".users-tab-btn").forEach(s=>{s.addEventListener("click",()=>t(s.dataset.tab))}),(e=document.getElementById("btn-create-user-modal"))==null||e.addEventListener("click",am),(i=document.getElementById("btn-save-matrix"))==null||i.addEventListener("click",om),t("accounts")}function bs(n){n.innerHTML=`
    <div class="panel">
      <div class="panel-header">
        <h3 class="panel-title">System User Accounts</h3>
        <span style="font-size:0.85rem; color:var(--text-muted);">${De.length} Active Accounts</span>
      </div>

      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Username</th>
              <th>Email</th>
              <th>Assigned Role</th>
              <th>Company Access Grants</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${De.map(t=>{const e=(t.company_ids||[1]).map(i=>{const s=_.companies.find(o=>o.id===i);return s?s.name:`Company #${i}`}).join(", ");return`
                <tr>
                  <td><strong>#${t.id}</strong></td>
                  <td><strong>${t.full_name}</strong></td>
                  <td><code>${t.username}</code></td>
                  <td>${t.email}</td>
                  <td><span class="tag tag-info">${t.role_name||"Cashier"}</span></td>
                  <td><span style="font-size:11px; color:#38bdf8;">${e}</span></td>
                  <td>
                    <span class="tag ${t.is_active?"tag-success":"tag-danger"}">
                      ${t.is_active?"Active":"Disabled"}
                    </span>
                  </td>
                  <td>
                    <button class="btn btn-outline btn-xs btn-edit-user" data-id="${t.id}">Edit / Access</button>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,n.querySelectorAll(".btn-edit-user").forEach(t=>{t.addEventListener("click",()=>{const e=De.find(i=>i.id===parseInt(t.dataset.id));e&&rm(e)})})}function sm(n){const t=Object.keys(ct);n.innerHTML=`
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Customizable Module Permissions Matrix</h3>
          <p style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">
            Click on any permission tag to grant or revoke specific module privileges per user role.
          </p>
        </div>
      </div>

      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th style="min-width: 200px;">Module & Feature</th>
              ${t.map(e=>`<th style="text-align:center;">${e}</th>`).join("")}
            </tr>
          </thead>
          <tbody>
            ${em.map(e=>`
              <tr>
                <td><strong>${e.name}</strong></td>
                ${t.map(i=>{var a;const s=((a=ct[i])==null?void 0:a[e.key])||[],o=i==="Super Admin";return`
                    <td style="text-align:center;">
                      <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:3px;">
                        ${nm.map(r=>{const l=s.includes(r)||o;return`
                            <span 
                              class="matrix-tag ${l?"active":"inactive"} ${o?"locked":""}" 
                              data-role="${i}" 
                              data-mod="${e.key}" 
                              data-act="${r}"
                              title="${l?"Granted: click to revoke":"Revoked: click to grant"}"
                            >
                              ${r.slice(0,3).toUpperCase()}
                            </span>
                          `}).join("")}
                      </div>
                    </td>
                  `}).join("")}
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,n.querySelectorAll(".matrix-tag:not(.locked)").forEach(e=>{e.addEventListener("click",()=>{const i=e.dataset.role,s=e.dataset.mod,o=e.dataset.act;ct[i]||(ct[i]={}),ct[i][s]||(ct[i][s]=[]);const a=ct[i][s].indexOf(o);a>-1?(ct[i][s].splice(a,1),e.classList.remove("active"),e.classList.add("inactive")):(ct[i][s].push(o),e.classList.remove("inactive"),e.classList.add("active"))})})}async function om(){try{(await R.put("/users/permissions/matrix",{matrix:ct})).success&&(_.permissionsMatrix=ct,M("Module Permissions Matrix saved successfully!","success"))}catch(n){M(n.message,"error")}}function am(){var i,s,o;const n=`
    <div class="modal-overlay" id="user-create-modal">
      <div class="modal-content" style="max-width: 520px;">
        <div class="modal-header">
          <h3 class="modal-title">Register New User Account</h3>
          <button class="btn-icon btn-sm" id="btn-close-create-user">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Full Name:</label>
            <input type="text" id="new-user-fullname" class="form-control" placeholder="e.g. Asim Raza" required />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">Username:</label>
              <input type="text" id="new-user-name" class="form-control" placeholder="e.g. asim.raza" required />
            </div>
            <div class="form-group">
              <label class="form-label">Role Assignment:</label>
              <select id="new-user-role" class="form-control">
                <option value="Cashier">Cashier</option>
                <option value="Store Manager">Store Manager</option>
                <option value="Senior Accountant">Senior Accountant</option>
                <option value="Field Sales Booker">Field Sales Booker</option>
                <option value="Super Admin">Super Admin</option>
              </select>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">Email Address:</label>
              <input type="email" id="new-user-email" class="form-control" placeholder="asim@onenetsolutions.com" required />
            </div>
            <div class="form-group">
              <label class="form-label">Login Password:</label>
              <input type="password" id="new-user-pass" class="form-control" placeholder="••••••••" required />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Granted Companies / Branches:</label>
            <div style="display:flex; flex-direction:column; gap:6px; padding:8px; background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:6px;">
              ${_.companies.map(a=>`
                <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
                  <input type="checkbox" class="chk-new-comp-access" value="${a.id}" checked />
                  <span>${a.name} (${a.city})</span>
                </label>
              `).join("")}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-create-user">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-create-user">Create Account</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("user-create-modal"),e=()=>t==null?void 0:t.remove();(i=document.getElementById("btn-close-create-user"))==null||i.addEventListener("click",e),(s=document.getElementById("btn-cancel-create-user"))==null||s.addEventListener("click",e),(o=document.getElementById("btn-confirm-create-user"))==null||o.addEventListener("click",async()=>{const a=document.getElementById("new-user-fullname").value.trim(),r=document.getElementById("new-user-name").value.trim(),l=document.getElementById("new-user-email").value.trim(),c=document.getElementById("new-user-pass").value,d=document.getElementById("new-user-role").value,u=[];if(t.querySelectorAll(".chk-new-comp-access:checked").forEach(h=>{u.push(parseInt(h.value))}),!a||!r||!l||!c){M("All fields are required","error");return}try{const h=await R.post("/users",{full_name:a,username:r,email:l,password:c,role_name:d,company_ids:u});h.success&&(M("User created successfully!","success"),De.push(h.user),bs(document.getElementById("users-tab-content")),e())}catch(h){M(h.message,"error")}})}function rm(n){var s,o,a;const t=`
    <div class="modal-overlay" id="user-edit-modal">
      <div class="modal-content" style="max-width: 500px;">
        <div class="modal-header">
          <h3 class="modal-title">Edit User Account: ${n.full_name}</h3>
          <button class="btn-icon btn-sm" id="btn-close-edit-user">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Full Name:</label>
            <input type="text" id="edit-user-fullname" class="form-control" value="${n.full_name||""}" />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">Role:</label>
              <select id="edit-user-role" class="form-control">
                <option value="Cashier" ${n.role_name==="Cashier"?"selected":""}>Cashier</option>
                <option value="Store Manager" ${n.role_name==="Store Manager"?"selected":""}>Store Manager</option>
                <option value="Senior Accountant" ${n.role_name==="Senior Accountant"?"selected":""}>Senior Accountant</option>
                <option value="Field Sales Booker" ${n.role_name==="Field Sales Booker"?"selected":""}>Field Sales Booker</option>
                <option value="Super Admin" ${n.role_name==="Super Admin"?"selected":""}>Super Admin</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Account Status:</label>
              <select id="edit-user-status" class="form-control">
                <option value="true" ${n.is_active?"selected":""}>Active</option>
                <option value="false" ${n.is_active?"":"selected"}>Disabled</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Reset Password (leave blank to keep current):</label>
            <input type="password" id="edit-user-pass" class="form-control" placeholder="New Password..." />
          </div>
          <div class="form-group">
            <label class="form-label">Granted Companies / Branches:</label>
            <div style="display:flex; flex-direction:column; gap:6px; padding:8px; background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:6px;">
              ${_.companies.map(r=>{const l=(n.company_ids||[1]).includes(r.id)?"checked":"";return`
                  <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
                    <input type="checkbox" class="chk-edit-comp-access" value="${r.id}" ${l} />
                    <span>${r.name} (${r.city})</span>
                  </label>
                `}).join("")}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-edit-user">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-edit-user">Save Changes</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",t);const e=document.getElementById("user-edit-modal"),i=()=>e==null?void 0:e.remove();(s=document.getElementById("btn-close-edit-user"))==null||s.addEventListener("click",i),(o=document.getElementById("btn-cancel-edit-user"))==null||o.addEventListener("click",i),(a=document.getElementById("btn-confirm-edit-user"))==null||a.addEventListener("click",async()=>{const r=document.getElementById("edit-user-fullname").value.trim(),l=document.getElementById("edit-user-role").value,c=document.getElementById("edit-user-status").value==="true",d=document.getElementById("edit-user-pass").value,u=[];e.querySelectorAll(".chk-edit-comp-access:checked").forEach(h=>{u.push(parseInt(h.value))});try{(await R.put(`/users/${n.id}`,{full_name:r,role_name:l,is_active:c,password:d||void 0,company_ids:u})).success&&(M("User account updated successfully!","success"),n.full_name=r,n.role_name=l,n.is_active=c,n.company_ids=u,bs(document.getElementById("users-tab-content")),i())}catch(h){M(h.message,"error")}})}let Rt=[],Ar=[],Ie=[];async function lm(n){var e,i,s;n.innerHTML=`
    <div class="page-header">
      <div>
        <h1 class="page-title">HR, Biometric Attendance & Payroll</h1>
        <p class="page-subtitle">Employee directory, Biometric / QR camera attendance, and automated ledger payroll runs</p>
      </div>
      <div style="display:flex; gap:0.75rem;">
        <button class="btn btn-outline" id="btn-sync-biometric">
          🔄 Sync Biometric Terminal
        </button>
        <button class="btn btn-outline" id="btn-open-qr-scanner">
          📷 QR Badge Scanner
        </button>
        <button class="btn btn-primary" id="btn-process-payroll-modal">
          💵 Process Monthly Payroll
        </button>
      </div>
    </div>

    <!-- TABS -->
    <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:0.5rem;">
      <button class="btn btn-outline btn-sm active payroll-tab-btn" data-tab="employees">Employee Directory</button>
      <button class="btn btn-outline btn-sm payroll-tab-btn" data-tab="attendance">Daily Attendance Log</button>
      <button class="btn btn-outline btn-sm payroll-tab-btn" data-tab="history">Payroll Runs & Payslips</button>
    </div>

    <div id="payroll-tab-content">
      <!-- Loaded dynamically -->
    </div>
  `,await pe();const t=o=>{n.querySelectorAll(".payroll-tab-btn").forEach(r=>{r.classList.toggle("active",r.dataset.tab===o)});const a=document.getElementById("payroll-tab-content");o==="employees"?Ir(a):o==="attendance"?Hn(a):Pr(a)};n.querySelectorAll(".payroll-tab-btn").forEach(o=>{o.addEventListener("click",()=>t(o.dataset.tab))}),(e=document.getElementById("btn-sync-biometric"))==null||e.addEventListener("click",cm),(i=document.getElementById("btn-open-qr-scanner"))==null||i.addEventListener("click",dm),(s=document.getElementById("btn-process-payroll-modal"))==null||s.addEventListener("click",hm),t("employees")}async function pe(){var n;try{const t=((n=_.activeCompany)==null?void 0:n.id)||1,[e,i,s]=await Promise.all([R.get(`/payroll/employees?company_id=${t}`),R.get("/payroll/attendance"),R.get("/payroll/history")]);e.success&&(Rt=e.employees),i.success&&(Ar=i.logs),s.success&&(Ie=s.history)}catch(t){M(t.message,"error")}}function Ir(n){var t;n.innerHTML=`
    <div class="panel">
      <div class="panel-header">
        <h3 class="panel-title">Active Employees</h3>
        <button class="btn btn-sm btn-primary" id="btn-add-emp-modal">+ Register Employee</button>
      </div>

      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Emp Code</th>
              <th>Full Name</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Basic Salary</th>
              <th>Allowances</th>
              <th>Tax Deduction</th>
              <th>Net Est.</th>
              <th>QR Badge</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${Rt.map(e=>`
              <tr>
                <td><strong>${e.employee_code}</strong></td>
                <td><strong>${e.full_name}</strong></td>
                <td>${e.department}</td>
                <td>${e.designation}</td>
                <td>${T(e.base_salary)}</td>
                <td style="color:#34d399;">+${T(e.allowances)}</td>
                <td style="color:#f87171;">-${T(e.tax_deduction)}</td>
                <td><strong>${T(e.base_salary+e.allowances-e.tax_deduction)}</strong></td>
                <td><span class="tag tag-info" style="font-family:monospace;">${e.qr_badge_code}</span></td>
                <td>
                  <button class="btn btn-outline btn-xs btn-print-quick-payslip" data-id="${e.id}">Payslip</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,(t=document.getElementById("btn-add-emp-modal"))==null||t.addEventListener("click",fm),n.querySelectorAll(".btn-print-quick-payslip").forEach(e=>{e.addEventListener("click",()=>{const i=Rt.find(s=>s.id===parseInt(e.dataset.id));i&&gr({employee_code:i.employee_code,employee_name:i.full_name,department:i.department,designation:i.designation,cnic:i.cnic,base_salary:i.base_salary,allowances:i.allowances,tax_deduction:i.tax_deduction,net_salary:i.base_salary+i.allowances-i.tax_deduction,month_year:new Date().toLocaleString("en-US",{month:"long",year:"numeric"})})})})}function Hn(n){var t;n.innerHTML=`
    <div class="panel">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Today's Attendance Register</h3>
          <span style="font-size:0.82rem; color:var(--text-muted);">${new Date().toLocaleDateString("en-PK",{dateStyle:"full"})}</span>
        </div>
        <div style="display:flex; gap:0.5rem;">
          <button class="btn btn-sm btn-outline" id="btn-manual-punch-modal">⏱️ Manual / GPS Punch</button>
        </div>
      </div>

      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Date</th>
              <th>Clock In</th>
              <th>Clock Out</th>
              <th>Punch Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${Ar.map(e=>`
              <tr>
                <td><strong>${e.employee_name}</strong></td>
                <td>${e.log_date}</td>
                <td><code>${e.clock_in||"--:--"}</code></td>
                <td><code>${e.clock_out||"--:--"}</code></td>
                <td>
                  <span class="tag ${e.method==="BIOMETRIC"?"tag-info":e.method==="QR_SCANNER"?"tag-warning":"tag-success"}">
                    ${e.method==="BIOMETRIC"?"📟 Biometric":e.method==="QR_SCANNER"?"📷 QR Badge":"📍 Mobile GPS"}
                  </span>
                </td>
                <td>
                  <span class="tag ${e.status==="PRESENT"?"tag-success":"tag-warning"}">
                    ${e.status}
                  </span>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,(t=document.getElementById("btn-manual-punch-modal"))==null||t.addEventListener("click",um)}function Pr(n){n.innerHTML=`
    <div class="panel">
      <div class="panel-header">
        <h3 class="panel-title">Payroll Processing History & Ledger Postings</h3>
        <span style="font-size:0.85rem; color:var(--text-muted);">${Ie.length} Runs Completed</span>
      </div>

      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Staff Count</th>
              <th>Gross Salaries</th>
              <th>Tax Deductions</th>
              <th>Net Disbursed</th>
              <th>General Ledger JV</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${Ie.length===0?`
              <tr>
                <td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">
                  No payroll processed yet for this company. Click "Process Monthly Payroll" above to generate.
                </td>
              </tr>
            `:Ie.map(t=>`
              <tr>
                <td><strong>${t.month_year}</strong></td>
                <td>${t.employee_count} Employees</td>
                <td>${T(t.total_gross)}</td>
                <td style="color:#f87171;">-${T(t.total_deductions)}</td>
                <td><strong style="color:#34d399;">${T(t.total_net)}</strong></td>
                <td><span class="tag tag-info">${t.journal_number||"JV-PAYROLL"}</span></td>
                <td><span class="tag tag-success">${t.status}</span></td>
                <td>
                  <button class="btn btn-outline btn-xs btn-print-all-slips" data-id="${t.id}">Print All Payslips</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,n.querySelectorAll(".btn-print-all-slips").forEach(t=>{t.addEventListener("click",()=>{const e=Ie.find(i=>i.id===parseInt(t.dataset.id));e&&e.payslips&&e.payslips.length>0&&(e.payslips.forEach(i=>gr(i)),M(`Printed ${e.payslips.length} employee payslips!`,"success"))})})}async function cm(){try{M("Connecting to TCP/IP Biometric Terminal at 192.168.1.201...","info");const n=await R.post("/payroll/biometric/sync",{device_ip:"192.168.1.201",terminal_name:"ZK-Teco Biometric Scanner Counter 01"});if(n.success){M(n.message,"success"),await pe();const t=document.getElementById("payroll-tab-content");t&&Hn(t)}}catch(n){M(n.message,"error")}}function dm(){var i,s,o;const n=`
    <div class="modal-overlay" id="qr-scanner-modal">
      <div class="modal-content" style="max-width: 480px; text-align:center;">
        <div class="modal-header">
          <h3 class="modal-title">Employee QR Badge Scanner</h3>
          <button class="btn-icon btn-sm" id="btn-close-qr-modal">✕</button>
        </div>
        <div class="modal-body">
          <div style="border: 2px dashed #38bdf8; border-radius:12px; padding:2rem; background:rgba(14,165,233,0.05); margin-bottom:1.25rem;">
            <div style="font-size:3rem; margin-bottom:0.5rem;">📷</div>
            <div style="font-weight:700; font-size:1.1rem; color:#fff;">Live Camera Ready</div>
            <p style="font-size:0.85rem; color:var(--text-muted); margin-top:4px;">
              Hold employee badge QR code in front of camera or select badge below:
            </p>
          </div>

          <div class="form-group" style="text-align:left;">
            <label class="form-label">Simulate Badge Scan (or Enter QR Code):</label>
            <select id="select-quick-qr" class="form-control">
              <option value="">-- Choose Employee Badge --</option>
              ${Rt.map(a=>`<option value="${a.qr_badge_code}">${a.full_name} (${a.qr_badge_code})</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-qr">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-qr-scan">Scan & Clock In/Out</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("qr-scanner-modal"),e=()=>t==null?void 0:t.remove();(i=document.getElementById("btn-close-qr-modal"))==null||i.addEventListener("click",e),(s=document.getElementById("btn-cancel-qr"))==null||s.addEventListener("click",e),(o=document.getElementById("btn-confirm-qr-scan"))==null||o.addEventListener("click",async()=>{const a=document.getElementById("select-quick-qr").value;if(!a){M("Please select or scan an employee badge","error");return}try{const r=await R.post("/payroll/attendance/log",{qr_badge_code:a,method:"QR_SCANNER"});if(r.success){M(r.message,"success"),await pe();const l=document.getElementById("payroll-tab-content");l&&Hn(l),e()}}catch(r){M(r.message,"error")}})}function um(){var i,s,o;const n=`
    <div class="modal-overlay" id="manual-punch-modal">
      <div class="modal-content" style="max-width: 440px;">
        <div class="modal-header">
          <h3 class="modal-title">Mobile GPS / Manual Attendance Clock</h3>
          <button class="btn-icon btn-sm" id="btn-close-punch-modal">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Select Employee:</label>
            <select id="punch-emp-id" class="form-control">
              ${Rt.map(a=>`<option value="${a.id}">${a.full_name} (${a.department})</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Punch Method:</label>
            <select id="punch-method" class="form-control">
              <option value="MOBILE_GPS">📍 Mobile GPS Location Punch</option>
              <option value="MANUAL">✍️ Manual Time Record</option>
              <option value="BIOMETRIC">📟 Terminal Biometric Sync</option>
            </select>
          </div>
          <div style="background:rgba(255,255,255,0.03); padding:0.75rem; border-radius:6px; border:1px solid var(--border-color); font-size:12px; color:var(--text-muted);">
            <div>📍 Detected Coordinates: <strong>31.5204° N, 74.3587° E</strong> (Lahore)</div>
            <div>Time: <strong>${new Date().toLocaleTimeString("en-PK")}</strong></div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-punch">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-punch">Record Attendance</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("manual-punch-modal"),e=()=>t==null?void 0:t.remove();(i=document.getElementById("btn-close-punch-modal"))==null||i.addEventListener("click",e),(s=document.getElementById("btn-cancel-punch"))==null||s.addEventListener("click",e),(o=document.getElementById("btn-confirm-punch"))==null||o.addEventListener("click",async()=>{const a=document.getElementById("punch-emp-id").value,r=document.getElementById("punch-method").value;try{const l=await R.post("/payroll/attendance/log",{employee_id:a,method:r,latitude:31.5204,longitude:74.3587});if(l.success){M(l.message,"success"),await pe();const c=document.getElementById("payroll-tab-content");c&&Hn(c),e()}}catch(l){M(l.message,"error")}})}function hm(){var r,l,c,d;const n=new Date().toLocaleString("en-US",{month:"long",year:"numeric"}),t=Rt.reduce((u,h)=>u+h.base_salary+h.allowances,0),e=Rt.reduce((u,h)=>u+h.tax_deduction,0),i=t-e,s=`
    <div class="modal-overlay" id="process-payroll-modal">
      <div class="modal-content" style="max-width: 520px;">
        <div class="modal-header">
          <h3 class="modal-title">Process Monthly Payroll & Post Ledger</h3>
          <button class="btn-icon btn-sm" id="btn-close-payroll-modal">✕</button>
        </div>
        <div class="modal-body">
          <div style="background:rgba(14,165,233,0.1); border:1px solid var(--border-bright); padding:1rem; border-radius:8px; text-align:center; margin-bottom:1rem;">
            <div style="font-size:0.8rem; text-transform:uppercase; color:var(--text-muted);">Payroll Period</div>
            <div style="font-size:1.6rem; font-weight:800; color:#38bdf8;">${n}</div>
            <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:2px;">Company: ${((r=_.activeCompany)==null?void 0:r.name)||"OneNet Solutions"}</div>
          </div>

          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:6px; padding:0.75rem; margin-bottom:1rem; font-size:13px;">
            <div style="display:flex; justify-content:space-between; padding:4px 0;"><span>Eligible Employees:</span><strong>${Rt.length} Active Staff</strong></div>
            <div style="display:flex; justify-content:space-between; padding:4px 0;"><span>Gross Pay & Allowances:</span><span>${T(t)}</span></div>
            <div style="display:flex; justify-content:space-between; padding:4px 0;"><span>Withholding Tax Deductions:</span><span style="color:#f87171;">-${T(e)}</span></div>
            <div style="display:flex; justify-content:space-between; padding:8px 0; border-top:1px solid var(--border-color); font-size:15px; font-weight:800; color:#34d399;">
              <span>Net Disbursement (Bank Transfer):</span>
              <span>${T(i)}</span>
            </div>
          </div>

          <div style="font-size:12px; color:var(--text-muted); line-height:1.4;">
            ⚡ <strong>Automated Double-Entry Ledger Posting:</strong> Clicking confirm will instantly credit <em>Bank Account (1020)</em> and debit <em>Salaries Expense (5030)</em> with full audit tracking.
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-payroll">Cancel</button>
          <button class="btn btn-success" id="btn-confirm-payroll" style="padding:0.75rem 1.5rem;">Confirm & Post to Ledger</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",s);const o=document.getElementById("process-payroll-modal"),a=()=>o==null?void 0:o.remove();(l=document.getElementById("btn-close-payroll-modal"))==null||l.addEventListener("click",a),(c=document.getElementById("btn-cancel-payroll"))==null||c.addEventListener("click",a),(d=document.getElementById("btn-confirm-payroll"))==null||d.addEventListener("click",async()=>{var u;try{const h=await R.post("/payroll/process",{company_id:((u=_.activeCompany)==null?void 0:u.id)||1,month_year:n});if(h.success){M(h.message,"success"),await pe();const f=document.getElementById("payroll-tab-content");f&&Pr(f),a()}}catch(h){M(h.message,"error")}})}function fm(){var i,s,o;const n=`
    <div class="modal-overlay" id="add-emp-modal">
      <div class="modal-content" style="max-width: 520px;">
        <div class="modal-header">
          <h3 class="modal-title">Register Employee</h3>
          <button class="btn-icon btn-sm" id="btn-close-add-emp">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Full Name:</label>
            <input type="text" id="new-emp-name" class="form-control" placeholder="e.g. Tariq Mehmood" required />
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">Employee Code:</label>
              <input type="text" id="new-emp-code" class="form-control" value="EMP-${100+Rt.length+1}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Department:</label>
              <select id="new-emp-dept" class="form-control">
                <option value="Retail POS Operations">Retail POS Operations</option>
                <option value="Store Management">Store Management</option>
                <option value="Finance & Accounts">Finance & Accounts</option>
                <option value="Field Sales Logistics">Field Sales Logistics</option>
                <option value="Manufacturing & BOM">Manufacturing & BOM</option>
              </select>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">Designation:</label>
              <input type="text" id="new-emp-desig" class="form-control" placeholder="e.g. Branch Supervisor" required />
            </div>
            <div class="form-group">
              <label class="form-label">Base Monthly Salary (Rs):</label>
              <input type="number" id="new-emp-salary" class="form-control" value="45000" required />
            </div>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem;">
            <div class="form-group">
              <label class="form-label">Allowances (Rs):</label>
              <input type="number" id="new-emp-allowance" class="form-control" value="3000" />
            </div>
            <div class="form-group">
              <label class="form-label">Tax Deduction (Rs):</label>
              <input type="number" id="new-emp-tax" class="form-control" value="1000" />
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-add-emp">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-add-emp">Save Employee</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("add-emp-modal"),e=()=>t==null?void 0:t.remove();(i=document.getElementById("btn-close-add-emp"))==null||i.addEventListener("click",e),(s=document.getElementById("btn-cancel-add-emp"))==null||s.addEventListener("click",e),(o=document.getElementById("btn-confirm-add-emp"))==null||o.addEventListener("click",async()=>{var f;const a=document.getElementById("new-emp-name").value.trim(),r=document.getElementById("new-emp-code").value.trim(),l=document.getElementById("new-emp-dept").value,c=document.getElementById("new-emp-desig").value.trim(),d=Number(document.getElementById("new-emp-salary").value)||4e4,u=Number(document.getElementById("new-emp-allowance").value)||0,h=Number(document.getElementById("new-emp-tax").value)||0;if(!a||!r){M("Name and code are required","error");return}try{if((await R.post("/payroll/employees",{company_id:((f=_.activeCompany)==null?void 0:f.id)||1,full_name:a,employee_code:r,department:l,designation:c,base_salary:d,allowances:u,tax_deduction:h})).success){M("Employee registered successfully!","success"),await pe();const p=document.getElementById("payroll-tab-content");p&&Ir(p),e()}}catch(m){M(m.message,"error")}})}async function mm(n){var i,s;n.innerHTML=`
    <div class="page-header">
      <div>
        <h1 class="page-title">Enterprise Analytics & Reports Center</h1>
        <p class="page-subtitle">POS Z-Reports, Inventory Valuation, GAAP Financial Statements & Payroll Registers</p>
      </div>
      <div style="display:flex; gap:0.75rem;">
        <button class="btn btn-outline" id="btn-export-report-csv">
          📥 Export CSV
        </button>
        <button class="btn btn-primary" id="btn-print-report">
          🖨️ Print Formal Report
        </button>
      </div>
    </div>

    <!-- TABS -->
    <div style="display:flex; gap:0.5rem; margin-bottom:1.5rem; border-bottom:1px solid var(--border-color); padding-bottom:0.5rem;">
      <button class="btn btn-outline btn-sm active report-tab-btn" data-tab="pos-z">POS Daily Z-Report</button>
      <button class="btn btn-outline btn-sm report-tab-btn" data-tab="inventory-val">Inventory Valuation</button>
      <button class="btn btn-outline btn-sm report-tab-btn" data-tab="financials">Financial Statements (P&L / Balance Sheet)</button>
    </div>

    <div id="reports-tab-content">
      <!-- Loaded dynamically -->
    </div>
  `;let t="pos-z";const e=o=>{t=o,n.querySelectorAll(".report-tab-btn").forEach(r=>{r.classList.toggle("active",r.dataset.tab===o)});const a=document.getElementById("reports-tab-content");o==="pos-z"?pm(a):o==="inventory-val"?gm(a):bm(a)};n.querySelectorAll(".report-tab-btn").forEach(o=>{o.addEventListener("click",()=>e(o.dataset.tab))}),(i=document.getElementById("btn-export-report-csv"))==null||i.addEventListener("click",()=>ym(t)),(s=document.getElementById("btn-print-report"))==null||s.addEventListener("click",()=>vm(t)),e("pos-z")}function pm(n){const t=_.activeCompany||{name:"OneNet Solutions"},e=new Date().toLocaleDateString("en-PK",{dateStyle:"full"});n.innerHTML=`
    <div class="panel" id="printable-report-body">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">End-of-Day POS Z-Report (Daily Register Audit)</h3>
          <span style="font-size:0.85rem; color:var(--text-muted);">${t.name} • ${e}</span>
        </div>
        <span class="tag tag-success">AUDIT BALANCED</span>
      </div>

      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:1rem; margin-bottom:1.5rem;">
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Total POS Revenue</div>
          <div style="font-size:1.5rem; font-weight:800; color:#38bdf8;">Rs. 45,850.00</div>
        </div>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Cash in Drawer</div>
          <div style="font-size:1.5rem; font-weight:800; color:#34d399;">Rs. 23,500.00</div>
        </div>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Card / Bank Tenders</div>
          <div style="font-size:1.5rem; font-weight:800; color:#fbbf24;">Rs. 22,350.00</div>
        </div>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Sales Tax Collected</div>
          <div style="font-size:1.5rem; font-weight:800; color:#c084fc;">Rs. 6,994.00</div>
        </div>
      </div>

      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Shift & Terminal</th>
              <th>Cashier</th>
              <th>Opening Float</th>
              <th>Cash Sales</th>
              <th>Card / Credit</th>
              <th>Total Tendered</th>
              <th>Discrepancy</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Counter 01 (Express Lane)</strong></td>
              <td>Muhammad Ali Raza</td>
              <td>Rs. 5,000.00</td>
              <td>Rs. 18,500.00</td>
              <td>Rs. 12,000.00</td>
              <td><strong>Rs. 35,500.00</strong></td>
              <td><span style="color:#34d399;">Rs. 0.00 (Exact)</span></td>
            </tr>
            <tr>
              <td><strong>Counter 02 (Main Register)</strong></td>
              <td>Zainab Fatima</td>
              <td>Rs. 5,000.00</td>
              <td>Rs. 5,000.00</td>
              <td>Rs. 10,350.00</td>
              <td><strong>Rs. 20,350.00</strong></td>
              <td><span style="color:#34d399;">Rs. 0.00 (Exact)</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `}function gm(n){let t=0,e=0;_.products.forEach(s=>{t+=s.cost_price*s.stock,e+=s.selling_price*s.stock});const i=e-t;n.innerHTML=`
    <div class="panel" id="printable-report-body">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Stock Valuation & Potential Margin Report</h3>
          <span style="font-size:0.85rem; color:var(--text-muted);">${_.products.length} Tracked Catalog Products</span>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1rem; margin-bottom:1.5rem;">
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Total Inventory Asset Cost</div>
          <div style="font-size:1.5rem; font-weight:800; color:#38bdf8;">${T(t)}</div>
        </div>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Total Retail Selling Value</div>
          <div style="font-size:1.5rem; font-weight:800; color:#34d399;">${T(e)}</div>
        </div>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Unrealized Gross Margin</div>
          <div style="font-size:1.5rem; font-weight:800; color:#fbbf24;">${T(i)}</div>
        </div>
      </div>

      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Product SKU</th>
              <th>Item Name</th>
              <th>Category</th>
              <th>In Stock</th>
              <th>Unit Cost</th>
              <th>Total Cost Asset</th>
              <th>Selling Price</th>
              <th>Retail Valuation</th>
            </tr>
          </thead>
          <tbody>
            ${_.products.map(s=>`
              <tr>
                <td><code>${s.sku}</code></td>
                <td><strong>${s.name}</strong></td>
                <td>${s.category_name||"General"}</td>
                <td><strong>${s.stock} ${s.uom||"Pcs"}</strong></td>
                <td>${T(s.cost_price)}</td>
                <td>${T(s.cost_price*s.stock)}</td>
                <td>${T(s.selling_price)}</td>
                <td><strong>${T(s.selling_price*s.stock)}</strong></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}function bm(n){n.innerHTML=`
    <div class="panel" id="printable-report-body">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Statement of Profit and Loss (Income Statement)</h3>
          <span style="font-size:0.85rem; color:var(--text-muted);">For the Period Ended ${new Date().toLocaleDateString("en-PK",{dateStyle:"long"})}</span>
        </div>
        <span class="tag tag-info">IFRS Compliant</span>
      </div>

      <div style="max-width:650px; margin:0 auto; font-size:13px; line-height:1.6;">
        <div style="font-weight:700; font-size:15px; color:#0284c7; border-bottom:1px solid var(--border-color); padding-bottom:4px; margin-bottom:8px;">
          REVENUE / OPERATING TURNOVER
        </div>
        <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>POS Retail Sales Revenue (4010):</span><span>Rs. 185,400.00</span></div>
        <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>B2B Wholesale Invoice Sales (4020):</span><span>Rs. 92,000.00</span></div>
        <div style="display:flex; justify-content:space-between; padding:6px 0; font-weight:700; border-top:1px dashed var(--border-color);">
          <span>Total Gross Revenue:</span><span>Rs. 277,400.00</span>
        </div>

        <div style="font-weight:700; font-size:15px; color:#f87171; border-bottom:1px solid var(--border-color); padding-bottom:4px; margin:16px 0 8px 0;">
          COST OF GOODS SOLD (COGS)
        </div>
        <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Opening Inventory:</span><span>Rs. 110,000.00</span></div>
        <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Purchases & Assembly Receipts:</span><span>Rs. 85,000.00</span></div>
        <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Less: Ending Inventory:</span><span>-Rs. 68,000.00</span></div>
        <div style="display:flex; justify-content:space-between; padding:6px 0; font-weight:700; border-top:1px dashed var(--border-color);">
          <span>Cost of Goods Sold (5010):</span><span>-Rs. 127,000.00</span>
        </div>

        <div style="display:flex; justify-content:space-between; padding:8px 0; margin:10px 0; background:rgba(255,255,255,0.03); border-radius:4px; font-weight:800; font-size:14px; color:#38bdf8;">
          <span>GROSS PROFIT:</span><span>Rs. 150,400.00</span>
        </div>

        <div style="font-weight:700; font-size:15px; color:#fbbf24; border-bottom:1px solid var(--border-color); padding-bottom:4px; margin:16px 0 8px 0;">
          OPERATING & ADMINISTRATIVE EXPENSES
        </div>
        <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Salaries & Payroll Expense (5030):</span><span>-Rs. 48,000.00</span></div>
        <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Electricity & Utilities (5050):</span><span>-Rs. 12,500.00</span></div>
        <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Branch Rent (5040):</span><span>-Rs. 25,000.00</span></div>

        <div style="display:flex; justify-content:space-between; padding:10px 0; margin-top:16px; border-top:2px solid var(--primary); font-size:16px; font-weight:800; color:#34d399;">
          <span>NET OPERATING PROFIT (EBIT):</span>
          <span>Rs. 64,900.00</span>
        </div>
      </div>
    </div>
  `}function ym(n){let t="data:text/csv;charset=utf-8,";n==="pos-z"?(t+=`Shift,Cashier,Opening_Float,Cash_Sales,Card_Credit,Total,Discrepancy
`,t+=`Counter 01,Muhammad Ali Raza,5000,18500,12000,35500,0
`,t+=`Counter 02,Zainab Fatima,5000,5000,10350,20350,0
`):(t+=`SKU,Name,Category,Stock,Cost_Price,Selling_Price
`,_.products.forEach(s=>{t+=`"${s.sku}","${s.name}","${s.category_name}",${s.stock},${s.cost_price},${s.selling_price}
`}));const e=encodeURI(t),i=document.createElement("a");i.setAttribute("href",e),i.setAttribute("download",`OneNet_${n}_Report.csv`),document.body.appendChild(i),i.click(),i.remove(),M("Report exported as CSV file!","success")}function vm(n){const t=document.getElementById("printable-report-body");if(!t)return;const e=`OneNet_Report_${n.toUpperCase()}`;Ye(e,t.innerHTML,`
    @page { size: A4 portrait; margin: 12mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #000; padding: 10px; }
    .panel-title { font-size: 18px; font-weight: 800; margin-bottom: 4px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; }
    th { background: #f1f5f9; font-weight: 700; text-align: left; }
    .tag { display: none; }
  `)}function xm(n){var r,l;n.innerHTML=`
    <div class="page-header">
      <div>
        <h1 class="page-title">Database Backup & Disaster Recovery</h1>
        <p class="page-subtitle">Export full enterprise database snapshots, restore states, and manage automated backup policies</p>
      </div>
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem; margin-bottom:1.5rem;">
      <!-- BACKUP CARD -->
      <div class="panel">
        <div class="panel-header">
          <h3 class="panel-title">💾 Create & Download Backup</h3>
          <span class="tag tag-success">PostgreSQL Online</span>
        </div>
        <p style="font-size:0.88rem; color:var(--text-secondary); line-height:1.5; margin-bottom:1.25rem;">
          Generate a full, encrypted JSON & SQL schema snapshot of all companies, Chart of Accounts, General Ledger journals, POS transactions, inventory ledgers, and employee payroll archives.
        </p>

        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem; margin-bottom:1.25rem; font-size:12px;">
          <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Target Engine:</span><strong>PostgreSQL 16 / aaPanel Local</strong></div>
          <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Database:</span><code>${((r=_.activeCompany)==null?void 0:r.name)||"bierppos"}</code></div>
          <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Compression:</span><strong>JSON Stream / Direct SQL</strong></div>
          <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Last Automatic Backup:</span><span>Today, 02:00 AM</span></div>
        </div>

        <button class="btn btn-primary" id="btn-download-backup" style="width:100%; padding:0.85rem; font-weight:700;">
          📥 Generate & Download Snapshot (.json)
        </button>
      </div>

      <!-- RESTORE CARD -->
      <div class="panel">
        <div class="panel-header">
          <h3 class="panel-title">🔄 Restore Database from File</h3>
          <span class="tag tag-warning">Admin Verification Required</span>
        </div>
        <p style="font-size:0.88rem; color:var(--text-secondary); line-height:1.5; margin-bottom:1.25rem;">
          Upload a previously exported OneNet Solutions backup file to restore accounts, customer lists, inventory balances, and system settings.
        </p>

        <div style="border: 2px dashed var(--border-color); border-radius:8px; padding:1.5rem; text-align:center; margin-bottom:1.25rem; cursor:pointer;" id="drop-restore-zone">
          <div style="font-size:2rem; margin-bottom:0.5rem;">📂</div>
          <div style="font-weight:600; font-size:0.9rem;">Click or Drag & Drop Backup File Here</div>
          <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">Supports: .json, .sql backup files</div>
          <input type="file" id="file-restore-input" accept=".json,.sql" style="display:none;" />
        </div>

        <div id="restore-file-info" style="display:none; font-size:13px; margin-bottom:1rem; padding:0.5rem; background:rgba(14,165,233,0.1); border-radius:6px;">
          Selected file: <strong id="selected-restore-filename">backup.json</strong>
        </div>

        <button class="btn btn-danger" id="btn-execute-restore" style="width:100%; padding:0.85rem; font-weight:700;" disabled>
          ⚠️ Restore Database Records
        </button>
      </div>
    </div>

    <!-- RECENT SNAPSHOTS LOG -->
    <div class="panel">
      <div class="panel-header">
        <h3 class="panel-title">Automated Backup History & Integrity Audits</h3>
      </div>
      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Snapshot File</th>
              <th>Type</th>
              <th>Record Count</th>
              <th>Integrity Check</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Today, 02:00:00 AM</td>
              <td><code>OneNet-Automated-Daily-2026-09-13.json</code></td>
              <td>Scheduled Full Dump</td>
              <td>1,248 Records</td>
              <td><span style="color:#34d399;">✓ SHA-256 Verified</span></td>
              <td><span class="tag tag-success">COMPLETED</span></td>
            </tr>
            <tr>
              <td>Yesterday, 02:00:00 AM</td>
              <td><code>OneNet-Automated-Daily-2026-09-12.json</code></td>
              <td>Scheduled Full Dump</td>
              <td>1,192 Records</td>
              <td><span style="color:#34d399;">✓ SHA-256 Verified</span></td>
              <td><span class="tag tag-success">COMPLETED</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,(l=document.getElementById("btn-download-backup"))==null||l.addEventListener("click",()=>{M("Preparing system snapshot...","info"),window.location.href="/api/backup/export",setTimeout(()=>{M("Database backup snapshot downloaded successfully!","success")},1500)});const t=document.getElementById("drop-restore-zone"),e=document.getElementById("file-restore-input"),i=document.getElementById("restore-file-info"),s=document.getElementById("selected-restore-filename"),o=document.getElementById("btn-execute-restore");let a=null;t==null||t.addEventListener("click",()=>e.click()),e==null||e.addEventListener("change",c=>{const d=c.target.files[0];if(!d)return;s.textContent=`${d.name} (${(d.size/1024).toFixed(1)} KB)`,i.style.display="block",o.disabled=!1;const u=new FileReader;u.onload=h=>{try{a=JSON.parse(h.target.result)}catch{M("File is not a valid JSON backup","error"),o.disabled=!0}},u.readAsText(d)}),o==null||o.addEventListener("click",async()=>{if(!(!a||!confirm("WARNING: Restoring will overwrite existing records with the backup file data. Are you sure you wish to proceed?")))try{M("Restoring database from snapshot...","info");const d=await R.post("/backup/restore",{backupData:a});d.success&&(M(d.message,"success"),setTimeout(()=>window.location.reload(),1500))}catch(d){M(d.message,"error")}})}let Mi=null,Ai=!1;async function _m(){if(console.log("[OneNet Solutions] Bootstrapping Enterprise Suite..."),!_.currentUser){const n=document.getElementById("app-root");n&&(n.style.display="none"),gs(async()=>{await Yi()});return}await Yi()}async function Yi(){const n=document.getElementById("app-root");n&&(n.style.display="flex");const t=document.getElementById("auth-root");t&&(t.style.display="none"),await Wf(),Kf(async()=>{Ai=!1,n&&(n.style.display="none"),gs(async()=>{await Yi()})});try{const[i,s,o,a]=await Promise.all([R.get("/inventory/products"),R.get("/inventory/categories"),R.get("/inventory/warehouses"),R.get("/sales/customers")]);i.success&&(_.products=i.products),s.success&&(_.categories=s.categories),o.success&&(_.warehouses=o.warehouses),a.success&&(_.customers=a.customers)}catch(i){console.error("Initial data load error:",i)}Ai||(In.connect(),In.subscribe(i=>{console.log("[Realtime Event]",i),i.type==="POS_SALE"?(M(`⚡ Realtime: Receipt #${i.payload.receipt_number} tendered for ${T(i.payload.total_amount)}`,"info"),_.activeModule==="dashboard"&&Ki(document.getElementById("content-viewport"))):i.type==="MANUFACTURING_COMPLETED"&&M(`⚙️ Assembly Completed: ${i.payload.quantity} units of ${i.payload.product}`,"success")}),"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").then(()=>console.log("[PWA] Service Worker registered")).catch(i=>console.warn("[PWA] Service Worker registration failed:",i)),wm(),window.addEventListener("hashchange",()=>{const i=window.location.hash.slice(1);i&&_.currentUser&&We(i)}),Ai=!0);const e=window.location.hash.slice(1)||"dashboard";We(e)}function wm(){var s,o,a,r,l;document.querySelectorAll(".nav-item").forEach(c=>{c.addEventListener("click",d=>{d.preventDefault();const u=c.dataset.module;We(u)})}),document.querySelectorAll(".mobile-nav-item").forEach(c=>{c.addEventListener("click",d=>{d.preventDefault();const u=c.dataset.module;u&&We(u)})}),(s=document.getElementById("btn-theme-toggle"))==null||s.addEventListener("click",()=>{const d=document.body.getAttribute("data-theme")==="light"?"dark":"light";document.body.setAttribute("data-theme",d),M(`Switched to ${d} theme`,"info")}),(o=document.getElementById("btn-fullscreen-toggle"))==null||o.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}),(a=document.getElementById("btn-open-mobile-app-modal"))==null||a.addEventListener("click",()=>{Cr()});const n=document.getElementById("main-sidebar"),t=document.getElementById("sidebar-backdrop"),e=()=>{n==null||n.classList.toggle("drawer-open"),t==null||t.classList.toggle("active")},i=()=>{n==null||n.classList.remove("drawer-open"),t==null||t.classList.remove("active")};(r=document.getElementById("btn-mobile-drawer-toggle"))==null||r.addEventListener("click",e),(l=document.getElementById("btn-mobile-more-nav"))==null||l.addEventListener("click",e),t==null||t.addEventListener("click",i)}function We(n){var e,i,s;(e=document.getElementById("main-sidebar"))==null||e.classList.remove("drawer-open"),(i=document.getElementById("sidebar-backdrop"))==null||i.classList.remove("active"),n!=="dashboard"&&!jh(n,"view")&&(M(`Access Denied: Your assigned role (${(s=_.currentUser)==null?void 0:s.role_name}) does not have permission to view ${n}`,"error"),n="dashboard"),_.activeModule=n,document.querySelectorAll(".nav-item").forEach(o=>{o.classList.toggle("active",o.dataset.module===n)}),document.querySelectorAll(".mobile-nav-item").forEach(o=>{o.classList.toggle("active",o.dataset.module===n)});const t=document.getElementById("content-viewport");if(t)switch(t.innerHTML="",n){case"dashboard":Ki(t);break;case"pos":Uh(t);break;case"inventory":Jh(t);break;case"sales":af(t);break;case"accounting":uf(t);break;case"manufacturing":gf(t);break;case"mobile_booker":Hf(t);break;case"payroll":lm(t);break;case"reports":mm(t);break;case"users":im(t);break;case"backup":xm(t);break;default:Ki(t)}}async function Ki(n){var t;try{const e=await R.get("/reports/dashboard"),{kpis:i,low_stock_items:s,expiring_batches:o,sales_trend:a}=e;n.innerHTML=`
      <div class="page-header">
        <div>
          <h1 class="page-title">Executive Command Center</h1>
          <p class="page-subtitle">Unified metrics, revenue velocity, cash positions & inventory intelligence</p>
        </div>
        <div style="display:flex; gap:0.75rem;">
          <button class="btn btn-primary" id="btn-quick-pos-launch">
            ⚡ Open POS Register
          </button>
        </div>
      </div>

      <!-- KPI METRIC CARDS -->
      <div class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Today's POS Sales</span>
            <div class="kpi-icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </div>
          </div>
          <div class="kpi-value">${T(i.today_pos_sales)}</div>
          <div class="kpi-footer positive">↑ 18.4% vs yesterday's register closing</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Cash in Hand & Drawer</span>
            <div class="kpi-icon-wrapper" style="background:rgba(16,185,129,0.12); color:#34d399;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle></svg>
            </div>
          </div>
          <div class="kpi-value">${T(i.cash_in_hand)}</div>
          <div class="kpi-footer">Reconciled in Main Vault</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Total Trade Receivables</span>
            <div class="kpi-icon-wrapper" style="background:rgba(245,158,11,0.12); color:#fbbf24;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
            </div>
          </div>
          <div class="kpi-value">${T(i.total_receivables)}</div>
          <div class="kpi-footer warning">Across 4 active B2B customer accounts</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Stock & Batch Alerts</span>
            <div class="kpi-icon-wrapper" style="background:rgba(239,68,68,0.12); color:#f87171;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
          </div>
          <div class="kpi-value" style="color:#f87171;">${i.low_stock_count} Low / ${i.expiring_batches_count} Exp</div>
          <div class="kpi-footer danger">Requires replenishment & rotation</div>
        </div>
      </div>

      <!-- CHART & SUMMARY GRID -->
      <div class="dashboard-grid-2col">
        <!-- Sales Velocity Trend Chart -->
        <div class="glass-panel">
          <div class="panel-header">
            <h3 class="panel-title">Revenue Velocity Trend (POS vs B2B Wholesale)</h3>
            <span class="tag tag-info">Last 7 Days</span>
          </div>
          <div style="height: 280px; position: relative;">
            <canvas id="salesTrendChart"></canvas>
          </div>
        </div>

        <!-- Quick Financial Health Snapshot -->
        <div class="glass-panel">
          <div class="panel-header">
            <h3 class="panel-title">Treasury & Working Capital</h3>
          </div>
          <div style="display:flex; flex-direction:column; gap:1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem; background:rgba(255,255,255,0.03); border-radius:var(--radius-md);">
              <div>
                <div style="font-size:0.8rem; color:var(--text-muted);">Bank Balances (Total):</div>
                <div style="font-size:1.15rem; font-weight:700; color:#38bdf8;">${T(i.bank_balance)}</div>
              </div>
              <span class="tag tag-success">2 Active A/Cs</span>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem; background:rgba(255,255,255,0.03); border-radius:var(--radius-md);">
              <div>
                <div style="font-size:0.8rem; color:var(--text-muted);">Accounts Payable (Vendors):</div>
                <div style="font-size:1.15rem; font-weight:700; color:#fbbf24;">${T(i.total_payables)}</div>
              </div>
              <span class="tag tag-warning">Trade Creditors</span>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem; background:rgba(255,255,255,0.03); border-radius:var(--radius-md);">
              <div>
                <div style="font-size:0.8rem; color:var(--text-muted);">Total Inventory Asset Valuation:</div>
                <div style="font-size:1.15rem; font-weight:700; color:#34d399;">${T(i.total_stock_value)}</div>
              </div>
              <span class="tag tag-info">Weighted Avg</span>
            </div>
          </div>
        </div>
      </div>

      <!-- LOW STOCK & EXPIRING BATCHES TABLES -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
        <div class="glass-panel">
          <div class="panel-header">
            <h3 class="panel-title">Low Stock Reorder Alert</h3>
            <span class="tag tag-danger">${s.length} Items</span>
          </div>
          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Current Stock</th>
                  <th>Reorder Point</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${s.map(r=>`
                  <tr>
                    <td><strong>${r.name}</strong><br/><span style="font-size:0.75rem; color:var(--text-muted);">${r.sku}</span></td>
                    <td style="color:#f87171; font-weight:700;">${r.stock} ${r.uom||"Pcs"}</td>
                    <td>${r.reorder_level} units</td>
                    <td><button class="btn btn-outline btn-sm" onclick="alert('Purchase Requisition PO created!')">+ PO</button></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <div class="glass-panel">
          <div class="panel-header">
            <h3 class="panel-title">Batch Expiry Radar (Next 60 Days)</h3>
            <span class="tag tag-warning">${o.length} Batches</span>
          </div>
          <div class="data-table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Batch Code</th>
                  <th>Expiry Date</th>
                  <th>Units</th>
                </tr>
              </thead>
              <tbody>
                ${o.map(r=>`
                  <tr>
                    <td style="font-family:var(--font-mono); font-weight:700; color:#fbbf24;">${r.batch_number}</td>
                    <td>${r.expiry_date}</td>
                    <td style="font-weight:700;">${r.stock} units</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,(t=document.getElementById("btn-quick-pos-launch"))==null||t.addEventListener("click",()=>{We("pos")}),km(a)}catch(e){M(e.message,"error")}}function km(n){const t=document.getElementById("salesTrendChart");if(!t)return;Mi&&Mi.destroy();const e=t.getContext("2d");Mi=new Pt(e,{type:"bar",data:{labels:n.map(i=>i.day),datasets:[{label:"POS Retail Sales (Rs)",data:n.map(i=>i.pos),backgroundColor:"rgba(14, 165, 233, 0.75)",borderRadius:6},{label:"B2B Wholesale Invoices (Rs)",data:n.map(i=>i.wholesale),backgroundColor:"rgba(99, 102, 241, 0.75)",borderRadius:6}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{labels:{color:"#cbd5e1",font:{family:"Inter",size:12}}}},scales:{x:{grid:{color:"rgba(255, 255, 255, 0.05)"},ticks:{color:"#94a3b8"}},y:{grid:{color:"rgba(255, 255, 255, 0.05)"},ticks:{color:"#94a3b8",callback:i=>"Rs "+i/1e3+"k"}}}}})}window.addEventListener("DOMContentLoaded",_m);window.addEventListener("afterprint",()=>{const n=document.getElementById("printable-receipt-area");n&&(n.innerHTML="",n.className="")});
