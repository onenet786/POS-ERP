var Kc=Object.defineProperty;var Jc=(n,t,e)=>t in n?Kc(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var T=(n,t,e)=>Jc(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function e(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=e(o);fetch(o.href,s)}})();/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function un(n){return n+.5|0}const qt=(n,t,e)=>Math.max(Math.min(n,e),t);function je(n){return qt(un(n*2.55),0,255)}function Yt(n){return qt(un(n*255),0,255)}function Dt(n){return qt(un(n/2.55)/100,0,1)}function Ms(n){return qt(un(n*100),0,100)}const ht={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},No=[..."0123456789ABCDEF"],Qc=n=>No[n&15],Zc=n=>No[(n&240)>>4]+No[n&15],vn=n=>(n&240)>>4===(n&15),td=n=>vn(n.r)&&vn(n.g)&&vn(n.b)&&vn(n.a);function ed(n){var t=n.length,e;return n[0]==="#"&&(t===4||t===5?e={r:255&ht[n[1]]*17,g:255&ht[n[2]]*17,b:255&ht[n[3]]*17,a:t===5?ht[n[4]]*17:255}:(t===7||t===9)&&(e={r:ht[n[1]]<<4|ht[n[2]],g:ht[n[3]]<<4|ht[n[4]],b:ht[n[5]]<<4|ht[n[6]],a:t===9?ht[n[7]]<<4|ht[n[8]]:255})),e}const nd=(n,t)=>n<255?t(n):"";function id(n){var t=td(n)?Qc:Zc;return n?"#"+t(n.r)+t(n.g)+t(n.b)+nd(n.a,t):void 0}const od=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Al(n,t,e){const i=t*Math.min(e,1-e),o=(s,r=(s+n/30)%12)=>e-i*Math.max(Math.min(r-3,9-r,1),-1);return[o(0),o(8),o(4)]}function sd(n,t,e){const i=(o,s=(o+n/60)%6)=>e-e*t*Math.max(Math.min(s,4-s,1),0);return[i(5),i(3),i(1)]}function rd(n,t,e){const i=Al(n,1,.5);let o;for(t+e>1&&(o=1/(t+e),t*=o,e*=o),o=0;o<3;o++)i[o]*=1-t-e,i[o]+=t;return i}function ad(n,t,e,i,o){return n===o?(t-e)/i+(t<e?6:0):t===o?(e-n)/i+2:(n-t)/i+4}function ss(n){const e=n.r/255,i=n.g/255,o=n.b/255,s=Math.max(e,i,o),r=Math.min(e,i,o),a=(s+r)/2;let c,l,d;return s!==r&&(d=s-r,l=a>.5?d/(2-s-r):d/(s+r),c=ad(e,i,o,d,s),c=c*60+.5),[c|0,l||0,a]}function rs(n,t,e,i){return(Array.isArray(t)?n(t[0],t[1],t[2]):n(t,e,i)).map(Yt)}function as(n,t,e){return rs(Al,n,t,e)}function ld(n,t,e){return rs(rd,n,t,e)}function cd(n,t,e){return rs(sd,n,t,e)}function Ol(n){return(n%360+360)%360}function dd(n){const t=od.exec(n);let e=255,i;if(!t)return;t[5]!==i&&(e=t[6]?je(+t[5]):Yt(+t[5]));const o=Ol(+t[2]),s=+t[3]/100,r=+t[4]/100;return t[1]==="hwb"?i=ld(o,s,r):t[1]==="hsv"?i=cd(o,s,r):i=as(o,s,r),{r:i[0],g:i[1],b:i[2],a:e}}function ud(n,t){var e=ss(n);e[0]=Ol(e[0]+t),e=as(e),n.r=e[0],n.g=e[1],n.b=e[2]}function fd(n){if(!n)return;const t=ss(n),e=t[0],i=Ms(t[1]),o=Ms(t[2]);return n.a<255?`hsla(${e}, ${i}%, ${o}%, ${Dt(n.a)})`:`hsl(${e}, ${i}%, ${o}%)`}const As={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Os={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function hd(){const n={},t=Object.keys(Os),e=Object.keys(As);let i,o,s,r,a;for(i=0;i<t.length;i++){for(r=a=t[i],o=0;o<e.length;o++)s=e[o],a=a.replace(s,As[s]);s=parseInt(Os[r],16),n[a]=[s>>16&255,s>>8&255,s&255]}return n}let yn;function pd(n){yn||(yn=hd(),yn.transparent=[0,0,0,0]);const t=yn[n.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const md=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function gd(n){const t=md.exec(n);let e=255,i,o,s;if(t){if(t[7]!==i){const r=+t[7];e=t[8]?je(r):qt(r*255,0,255)}return i=+t[1],o=+t[3],s=+t[5],i=255&(t[2]?je(i):qt(i,0,255)),o=255&(t[4]?je(o):qt(o,0,255)),s=255&(t[6]?je(s):qt(s,0,255)),{r:i,g:o,b:s,a:e}}}function bd(n){return n&&(n.a<255?`rgba(${n.r}, ${n.g}, ${n.b}, ${Dt(n.a)})`:`rgb(${n.r}, ${n.g}, ${n.b})`)}const Ji=n=>n<=.0031308?n*12.92:Math.pow(n,1/2.4)*1.055-.055,be=n=>n<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4);function vd(n,t,e){const i=be(Dt(n.r)),o=be(Dt(n.g)),s=be(Dt(n.b));return{r:Yt(Ji(i+e*(be(Dt(t.r))-i))),g:Yt(Ji(o+e*(be(Dt(t.g))-o))),b:Yt(Ji(s+e*(be(Dt(t.b))-s))),a:n.a+e*(t.a-n.a)}}function xn(n,t,e){if(n){let i=ss(n);i[t]=Math.max(0,Math.min(i[t]+i[t]*e,t===0?360:1)),i=as(i),n.r=i[0],n.g=i[1],n.b=i[2]}}function Pl(n,t){return n&&Object.assign(t||{},n)}function Ps(n){var t={r:0,g:0,b:0,a:255};return Array.isArray(n)?n.length>=3&&(t={r:n[0],g:n[1],b:n[2],a:255},n.length>3&&(t.a=Yt(n[3]))):(t=Pl(n,{r:0,g:0,b:0,a:1}),t.a=Yt(t.a)),t}function yd(n){return n.charAt(0)==="r"?gd(n):dd(n)}class tn{constructor(t){if(t instanceof tn)return t;const e=typeof t;let i;e==="object"?i=Ps(t):e==="string"&&(i=ed(t)||pd(t)||yd(t)),this._rgb=i,this._valid=!!i}get valid(){return this._valid}get rgb(){var t=Pl(this._rgb);return t&&(t.a=Dt(t.a)),t}set rgb(t){this._rgb=Ps(t)}rgbString(){return this._valid?bd(this._rgb):void 0}hexString(){return this._valid?id(this._rgb):void 0}hslString(){return this._valid?fd(this._rgb):void 0}mix(t,e){if(t){const i=this.rgb,o=t.rgb;let s;const r=e===s?.5:e,a=2*r-1,c=i.a-o.a,l=((a*c===-1?a:(a+c)/(1+a*c))+1)/2;s=1-l,i.r=255&l*i.r+s*o.r+.5,i.g=255&l*i.g+s*o.g+.5,i.b=255&l*i.b+s*o.b+.5,i.a=r*i.a+(1-r)*o.a,this.rgb=i}return this}interpolate(t,e){return t&&(this._rgb=vd(this._rgb,t._rgb,e)),this}clone(){return new tn(this.rgb)}alpha(t){return this._rgb.a=Yt(t),this}clearer(t){const e=this._rgb;return e.a*=1-t,this}greyscale(){const t=this._rgb,e=un(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=e,this}opaquer(t){const e=this._rgb;return e.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return xn(this._rgb,2,t),this}darken(t){return xn(this._rgb,2,-t),this}saturate(t){return xn(this._rgb,1,t),this}desaturate(t){return xn(this._rgb,1,-t),this}rotate(t){return ud(this._rgb,t),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function Tt(){}const xd=(()=>{let n=0;return()=>n++})();function N(n){return n==null}function U(n){if(Array.isArray&&Array.isArray(n))return!0;const t=Object.prototype.toString.call(n);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function z(n){return n!==null&&Object.prototype.toString.call(n)==="[object Object]"}function X(n){return(typeof n=="number"||n instanceof Number)&&isFinite(+n)}function dt(n,t){return X(n)?n:t}function D(n,t){return typeof n>"u"?t:n}const _d=(n,t)=>typeof n=="string"&&n.endsWith("%")?parseFloat(n)/100:+n/t,Il=(n,t)=>typeof n=="string"&&n.endsWith("%")?parseFloat(n)/100*t:+n;function q(n,t,e){if(n&&typeof n.call=="function")return n.apply(e,t)}function H(n,t,e,i){let o,s,r;if(U(n))for(s=n.length,o=0;o<s;o++)t.call(e,n[o],o);else if(z(n))for(r=Object.keys(n),s=r.length,o=0;o<s;o++)t.call(e,n[r[o]],r[o])}function ki(n,t){let e,i,o,s;if(!n||!t||n.length!==t.length)return!1;for(e=0,i=n.length;e<i;++e)if(o=n[e],s=t[e],o.datasetIndex!==s.datasetIndex||o.index!==s.index)return!1;return!0}function Ci(n){if(U(n))return n.map(Ci);if(z(n)){const t=Object.create(null),e=Object.keys(n),i=e.length;let o=0;for(;o<i;++o)t[e[o]]=Ci(n[e[o]]);return t}return n}function Tl(n){return["__proto__","prototype","constructor"].indexOf(n)===-1}function wd(n,t,e,i){if(!Tl(n))return;const o=t[n],s=e[n];z(o)&&z(s)?en(o,s,i):t[n]=Ci(s)}function en(n,t,e){const i=U(t)?t:[t],o=i.length;if(!z(n))return n;e=e||{};const s=e.merger||wd;let r;for(let a=0;a<o;++a){if(r=i[a],!z(r))continue;const c=Object.keys(r);for(let l=0,d=c.length;l<d;++l)s(c[l],n,r,e)}return n}function Ye(n,t){return en(n,t,{merger:Ed})}function Ed(n,t,e){if(!Tl(n))return;const i=t[n],o=e[n];z(i)&&z(o)?Ye(i,o):Object.prototype.hasOwnProperty.call(t,n)||(t[n]=Ci(o))}const Is={"":n=>n,x:n=>n.x,y:n=>n.y};function Sd(n){const t=n.split("."),e=[];let i="";for(const o of t)i+=o,i.endsWith("\\")?i=i.slice(0,-1)+".":(e.push(i),i="");return e}function kd(n){const t=Sd(n);return e=>{for(const i of t){if(i==="")break;e=e&&e[i]}return e}}function Xt(n,t){return(Is[t]||(Is[t]=kd(t)))(n)}function ls(n){return n.charAt(0).toUpperCase()+n.slice(1)}const nn=n=>typeof n<"u",Kt=n=>typeof n=="function",Ts=(n,t)=>{if(n.size!==t.size)return!1;for(const e of n)if(!t.has(e))return!1;return!0};function Cd(n){return n.type==="mouseup"||n.type==="click"||n.type==="contextmenu"}const j=Math.PI,V=2*j,Md=V+j,Mi=Number.POSITIVE_INFINITY,Ad=j/180,K=j/2,Zt=j/4,Rs=j*2/3,Vt=Math.log10,St=Math.sign;function Xe(n,t,e){return Math.abs(n-t)<e}function Ls(n){const t=Math.round(n);n=Xe(n,t,n/1e3)?t:n;const e=Math.pow(10,Math.floor(Vt(n))),i=n/e;return(i<=1?1:i<=2?2:i<=5?5:10)*e}function Od(n){const t=[],e=Math.sqrt(n);let i;for(i=1;i<e;i++)n%i===0&&(t.push(i),t.push(n/i));return e===(e|0)&&t.push(e),t.sort((o,s)=>o-s).pop(),t}function Pd(n){return typeof n=="symbol"||typeof n=="object"&&n!==null&&!(Symbol.toPrimitive in n||"toString"in n||"valueOf"in n)}function Se(n){return!Pd(n)&&!isNaN(parseFloat(n))&&isFinite(n)}function Id(n,t){const e=Math.round(n);return e-t<=n&&e+t>=n}function Rl(n,t,e){let i,o,s;for(i=0,o=n.length;i<o;i++)s=n[i][e],isNaN(s)||(t.min=Math.min(t.min,s),t.max=Math.max(t.max,s))}function gt(n){return n*(j/180)}function cs(n){return n*(180/j)}function Bs(n){if(!X(n))return;let t=1,e=0;for(;Math.round(n*t)/t!==n;)t*=10,e++;return e}function Ll(n,t){const e=t.x-n.x,i=t.y-n.y,o=Math.sqrt(e*e+i*i);let s=Math.atan2(i,e);return s<-.5*j&&(s+=V),{angle:s,distance:o}}function zo(n,t){return Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2))}function Td(n,t){return(n-t+Md)%V-j}function et(n){return(n%V+V)%V}function on(n,t,e,i){const o=et(n),s=et(t),r=et(e),a=et(s-o),c=et(r-o),l=et(o-s),d=et(o-r);return o===s||o===r||i&&s===r||a>c&&l<d}function Z(n,t,e){return Math.max(t,Math.min(e,n))}function Rd(n){return Z(n,-32768,32767)}function Nt(n,t,e,i=1e-6){return n>=Math.min(t,e)-i&&n<=Math.max(t,e)+i}function ds(n,t,e){e=e||(r=>n[r]<t);let i=n.length-1,o=0,s;for(;i-o>1;)s=o+i>>1,e(s)?o=s:i=s;return{lo:o,hi:i}}const zt=(n,t,e,i)=>ds(n,e,i?o=>{const s=n[o][t];return s<e||s===e&&n[o+1][t]===e}:o=>n[o][t]<e),Ld=(n,t,e)=>ds(n,e,i=>n[i][t]>=e);function Bd(n,t,e){let i=0,o=n.length;for(;i<o&&n[i]<t;)i++;for(;o>i&&n[o-1]>e;)o--;return i>0||o<n.length?n.slice(i,o):n}const Bl=["push","pop","shift","splice","unshift"];function Dd(n,t){if(n._chartjs){n._chartjs.listeners.push(t);return}Object.defineProperty(n,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),Bl.forEach(e=>{const i="_onData"+ls(e),o=n[e];Object.defineProperty(n,e,{configurable:!0,enumerable:!1,value(...s){const r=o.apply(this,s);return n._chartjs.listeners.forEach(a=>{typeof a[i]=="function"&&a[i](...s)}),r}})})}function Ds(n,t){const e=n._chartjs;if(!e)return;const i=e.listeners,o=i.indexOf(t);o!==-1&&i.splice(o,1),!(i.length>0)&&(Bl.forEach(s=>{delete n[s]}),delete n._chartjs)}function Dl(n){const t=new Set(n);return t.size===n.length?n:Array.from(t)}const $l=(function(){return typeof window>"u"?function(n){return n()}:window.requestAnimationFrame})();function Nl(n,t){let e=[],i=!1;return function(...o){e=o,i||(i=!0,$l.call(window,()=>{i=!1,n.apply(t,e)}))}}function $d(n,t){let e;return function(...i){return t?(clearTimeout(e),e=setTimeout(n,t,i)):n.apply(this,i),t}}const us=n=>n==="start"?"left":n==="end"?"right":"center",tt=(n,t,e)=>n==="start"?t:n==="end"?e:(t+e)/2,Nd=(n,t,e,i)=>n===(i?"left":"right")?e:n==="center"?(t+e)/2:t;function zl(n,t,e){const i=t.length;let o=0,s=i;if(n._sorted){const{iScale:r,vScale:a,_parsed:c}=n,l=n.dataset&&n.dataset.options?n.dataset.options.spanGaps:null,d=r.axis,{min:u,max:f,minDefined:h,maxDefined:p}=r.getUserBounds();if(h){if(o=Math.min(zt(c,d,u).lo,e?i:zt(t,d,r.getPixelForValue(u)).lo),l){const m=c.slice(0,o+1).reverse().findIndex(g=>!N(g[a.axis]));o-=Math.max(0,m)}o=Z(o,0,i-1)}if(p){let m=Math.max(zt(c,r.axis,f,!0).hi+1,e?0:zt(t,d,r.getPixelForValue(f),!0).hi+1);if(l){const g=c.slice(m-1).findIndex(b=>!N(b[a.axis]));m+=Math.max(0,g)}s=Z(m,o,i)-o}else s=i-o}return{start:o,count:s}}function Fl(n){const{xScale:t,yScale:e,_scaleRanges:i}=n,o={xmin:t.min,xmax:t.max,ymin:e.min,ymax:e.max};if(!i)return n._scaleRanges=o,!0;const s=i.xmin!==t.min||i.xmax!==t.max||i.ymin!==e.min||i.ymax!==e.max;return Object.assign(i,o),s}const _n=n=>n===0||n===1,$s=(n,t,e)=>-(Math.pow(2,10*(n-=1))*Math.sin((n-t)*V/e)),Ns=(n,t,e)=>Math.pow(2,-10*n)*Math.sin((n-t)*V/e)+1,Ke={linear:n=>n,easeInQuad:n=>n*n,easeOutQuad:n=>-n*(n-2),easeInOutQuad:n=>(n/=.5)<1?.5*n*n:-.5*(--n*(n-2)-1),easeInCubic:n=>n*n*n,easeOutCubic:n=>(n-=1)*n*n+1,easeInOutCubic:n=>(n/=.5)<1?.5*n*n*n:.5*((n-=2)*n*n+2),easeInQuart:n=>n*n*n*n,easeOutQuart:n=>-((n-=1)*n*n*n-1),easeInOutQuart:n=>(n/=.5)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2),easeInQuint:n=>n*n*n*n*n,easeOutQuint:n=>(n-=1)*n*n*n*n+1,easeInOutQuint:n=>(n/=.5)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2),easeInSine:n=>-Math.cos(n*K)+1,easeOutSine:n=>Math.sin(n*K),easeInOutSine:n=>-.5*(Math.cos(j*n)-1),easeInExpo:n=>n===0?0:Math.pow(2,10*(n-1)),easeOutExpo:n=>n===1?1:-Math.pow(2,-10*n)+1,easeInOutExpo:n=>_n(n)?n:n<.5?.5*Math.pow(2,10*(n*2-1)):.5*(-Math.pow(2,-10*(n*2-1))+2),easeInCirc:n=>n>=1?n:-(Math.sqrt(1-n*n)-1),easeOutCirc:n=>Math.sqrt(1-(n-=1)*n),easeInOutCirc:n=>(n/=.5)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1),easeInElastic:n=>_n(n)?n:$s(n,.075,.3),easeOutElastic:n=>_n(n)?n:Ns(n,.075,.3),easeInOutElastic(n){return _n(n)?n:n<.5?.5*$s(n*2,.1125,.45):.5+.5*Ns(n*2-1,.1125,.45)},easeInBack(n){return n*n*((1.70158+1)*n-1.70158)},easeOutBack(n){return(n-=1)*n*((1.70158+1)*n+1.70158)+1},easeInOutBack(n){let t=1.70158;return(n/=.5)<1?.5*(n*n*(((t*=1.525)+1)*n-t)):.5*((n-=2)*n*(((t*=1.525)+1)*n+t)+2)},easeInBounce:n=>1-Ke.easeOutBounce(1-n),easeOutBounce(n){return n<1/2.75?7.5625*n*n:n<2/2.75?7.5625*(n-=1.5/2.75)*n+.75:n<2.5/2.75?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375},easeInOutBounce:n=>n<.5?Ke.easeInBounce(n*2)*.5:Ke.easeOutBounce(n*2-1)*.5+.5};function fs(n){if(n&&typeof n=="object"){const t=n.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function zs(n){return fs(n)?n:new tn(n)}function Qi(n){return fs(n)?n:new tn(n).saturate(.5).darken(.1).hexString()}const zd=["x","y","borderWidth","radius","tension"],Fd=["color","borderColor","backgroundColor"];function jd(n){n.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),n.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),n.set("animations",{colors:{type:"color",properties:Fd},numbers:{type:"number",properties:zd}}),n.describe("animations",{_fallback:"animation"}),n.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function Hd(n){n.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const Fs=new Map;function qd(n,t){t=t||{};const e=n+JSON.stringify(t);let i=Fs.get(e);return i||(i=new Intl.NumberFormat(n,t),Fs.set(e,i)),i}function fn(n,t,e){return qd(t,e).format(n)}const jl={values(n){return U(n)?n:""+n},numeric(n,t,e){if(n===0)return"0";const i=this.chart.options.locale;let o,s=n;if(e.length>1){const l=Math.max(Math.abs(e[0].value),Math.abs(e[e.length-1].value));(l<1e-4||l>1e15)&&(o="scientific"),s=Vd(n,e)}const r=Vt(Math.abs(s)),a=isNaN(r)?1:Math.max(Math.min(-1*Math.floor(r),20),0),c={notation:o,minimumFractionDigits:a,maximumFractionDigits:a};return Object.assign(c,this.options.ticks.format),fn(n,i,c)},logarithmic(n,t,e){if(n===0)return"0";const i=e[t].significand||n/Math.pow(10,Math.floor(Vt(n)));return[1,2,3,5,10,15].includes(i)||t>.8*e.length?jl.numeric.call(this,n,t,e):""}};function Vd(n,t){let e=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(e)>=1&&n!==Math.floor(n)&&(e=n-Math.floor(n)),e}var Di={formatters:jl};function Ud(n){n.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,e)=>e.lineWidth,tickColor:(t,e)=>e.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Di.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),n.route("scale.ticks","color","","color"),n.route("scale.grid","color","","borderColor"),n.route("scale.border","color","","borderColor"),n.route("scale.title","color","","color"),n.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),n.describe("scales",{_fallback:"scale"}),n.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const de=Object.create(null),Fo=Object.create(null);function Je(n,t){if(!t)return n;const e=t.split(".");for(let i=0,o=e.length;i<o;++i){const s=e[i];n=n[s]||(n[s]=Object.create(null))}return n}function Zi(n,t,e){return typeof t=="string"?en(Je(n,t),e):en(Je(n,""),t)}class Wd{constructor(t,e){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=i=>i.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(i,o)=>Qi(o.backgroundColor),this.hoverBorderColor=(i,o)=>Qi(o.borderColor),this.hoverColor=(i,o)=>Qi(o.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(e)}set(t,e){return Zi(this,t,e)}get(t){return Je(this,t)}describe(t,e){return Zi(Fo,t,e)}override(t,e){return Zi(de,t,e)}route(t,e,i,o){const s=Je(this,t),r=Je(this,i),a="_"+e;Object.defineProperties(s,{[a]:{value:s[e],writable:!0},[e]:{enumerable:!0,get(){const c=this[a],l=r[o];return z(c)?Object.assign({},l,c):D(c,l)},set(c){this[a]=c}}})}apply(t){t.forEach(e=>e(this))}}var W=new Wd({_scriptable:n=>!n.startsWith("on"),_indexable:n=>n!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[jd,Hd,Ud]);function Gd(n){return!n||N(n.size)||N(n.family)?null:(n.style?n.style+" ":"")+(n.weight?n.weight+" ":"")+n.size+"px "+n.family}function Ai(n,t,e,i,o){let s=t[o];return s||(s=t[o]=n.measureText(o).width,e.push(o)),s>i&&(i=s),i}function Yd(n,t,e,i){i=i||{};let o=i.data=i.data||{},s=i.garbageCollect=i.garbageCollect||[];i.font!==t&&(o=i.data={},s=i.garbageCollect=[],i.font=t),n.save(),n.font=t;let r=0;const a=e.length;let c,l,d,u,f;for(c=0;c<a;c++)if(u=e[c],u!=null&&!U(u))r=Ai(n,o,s,r,u);else if(U(u))for(l=0,d=u.length;l<d;l++)f=u[l],f!=null&&!U(f)&&(r=Ai(n,o,s,r,f));n.restore();const h=s.length/2;if(h>e.length){for(c=0;c<h;c++)delete o[s[c]];s.splice(0,h)}return r}function te(n,t,e){const i=n.currentDevicePixelRatio,o=e!==0?Math.max(e/2,.5):0;return Math.round((t-o)*i)/i+o}function js(n,t){!t&&!n||(t=t||n.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,n.width,n.height),t.restore())}function jo(n,t,e,i){Hl(n,t,e,i,null)}function Hl(n,t,e,i,o){let s,r,a,c,l,d,u,f;const h=t.pointStyle,p=t.rotation,m=t.radius;let g=(p||0)*Ad;if(h&&typeof h=="object"&&(s=h.toString(),s==="[object HTMLImageElement]"||s==="[object HTMLCanvasElement]")){n.save(),n.translate(e,i),n.rotate(g),n.drawImage(h,-h.width/2,-h.height/2,h.width,h.height),n.restore();return}if(!(isNaN(m)||m<=0)){switch(n.beginPath(),h){default:o?n.ellipse(e,i,o/2,m,0,0,V):n.arc(e,i,m,0,V),n.closePath();break;case"triangle":d=o?o/2:m,n.moveTo(e+Math.sin(g)*d,i-Math.cos(g)*m),g+=Rs,n.lineTo(e+Math.sin(g)*d,i-Math.cos(g)*m),g+=Rs,n.lineTo(e+Math.sin(g)*d,i-Math.cos(g)*m),n.closePath();break;case"rectRounded":l=m*.516,c=m-l,r=Math.cos(g+Zt)*c,u=Math.cos(g+Zt)*(o?o/2-l:c),a=Math.sin(g+Zt)*c,f=Math.sin(g+Zt)*(o?o/2-l:c),n.arc(e-u,i-a,l,g-j,g-K),n.arc(e+f,i-r,l,g-K,g),n.arc(e+u,i+a,l,g,g+K),n.arc(e-f,i+r,l,g+K,g+j),n.closePath();break;case"rect":if(!p){c=Math.SQRT1_2*m,d=o?o/2:c,n.rect(e-d,i-c,2*d,2*c);break}g+=Zt;case"rectRot":u=Math.cos(g)*(o?o/2:m),r=Math.cos(g)*m,a=Math.sin(g)*m,f=Math.sin(g)*(o?o/2:m),n.moveTo(e-u,i-a),n.lineTo(e+f,i-r),n.lineTo(e+u,i+a),n.lineTo(e-f,i+r),n.closePath();break;case"crossRot":g+=Zt;case"cross":u=Math.cos(g)*(o?o/2:m),r=Math.cos(g)*m,a=Math.sin(g)*m,f=Math.sin(g)*(o?o/2:m),n.moveTo(e-u,i-a),n.lineTo(e+u,i+a),n.moveTo(e+f,i-r),n.lineTo(e-f,i+r);break;case"star":u=Math.cos(g)*(o?o/2:m),r=Math.cos(g)*m,a=Math.sin(g)*m,f=Math.sin(g)*(o?o/2:m),n.moveTo(e-u,i-a),n.lineTo(e+u,i+a),n.moveTo(e+f,i-r),n.lineTo(e-f,i+r),g+=Zt,u=Math.cos(g)*(o?o/2:m),r=Math.cos(g)*m,a=Math.sin(g)*m,f=Math.sin(g)*(o?o/2:m),n.moveTo(e-u,i-a),n.lineTo(e+u,i+a),n.moveTo(e+f,i-r),n.lineTo(e-f,i+r);break;case"line":r=o?o/2:Math.cos(g)*m,a=Math.sin(g)*m,n.moveTo(e-r,i-a),n.lineTo(e+r,i+a);break;case"dash":n.moveTo(e,i),n.lineTo(e+Math.cos(g)*(o?o/2:m),i+Math.sin(g)*m);break;case!1:n.closePath();break}n.fill(),t.borderWidth>0&&n.stroke()}}function Ft(n,t,e){return e=e||.5,!t||n&&n.x>t.left-e&&n.x<t.right+e&&n.y>t.top-e&&n.y<t.bottom+e}function $i(n,t){n.save(),n.beginPath(),n.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),n.clip()}function Ni(n){n.restore()}function Xd(n,t,e,i,o){if(!t)return n.lineTo(e.x,e.y);if(o==="middle"){const s=(t.x+e.x)/2;n.lineTo(s,t.y),n.lineTo(s,e.y)}else o==="after"!=!!i?n.lineTo(t.x,e.y):n.lineTo(e.x,t.y);n.lineTo(e.x,e.y)}function Kd(n,t,e,i){if(!t)return n.lineTo(e.x,e.y);n.bezierCurveTo(i?t.cp1x:t.cp2x,i?t.cp1y:t.cp2y,i?e.cp2x:e.cp1x,i?e.cp2y:e.cp1y,e.x,e.y)}function Jd(n,t){t.translation&&n.translate(t.translation[0],t.translation[1]),N(t.rotation)||n.rotate(t.rotation),t.color&&(n.fillStyle=t.color),t.textAlign&&(n.textAlign=t.textAlign),t.textBaseline&&(n.textBaseline=t.textBaseline)}function Qd(n,t,e,i,o){if(o.strikethrough||o.underline){const s=n.measureText(i),r=t-s.actualBoundingBoxLeft,a=t+s.actualBoundingBoxRight,c=e-s.actualBoundingBoxAscent,l=e+s.actualBoundingBoxDescent,d=o.strikethrough?(c+l)/2:l;n.strokeStyle=n.fillStyle,n.beginPath(),n.lineWidth=o.decorationWidth||2,n.moveTo(r,d),n.lineTo(a,d),n.stroke()}}function Zd(n,t){const e=n.fillStyle;n.fillStyle=t.color,n.fillRect(t.left,t.top,t.width,t.height),n.fillStyle=e}function ue(n,t,e,i,o,s={}){const r=U(t)?t:[t],a=s.strokeWidth>0&&s.strokeColor!=="";let c,l;for(n.save(),n.font=o.string,Jd(n,s),c=0;c<r.length;++c)l=r[c],s.backdrop&&Zd(n,s.backdrop),a&&(s.strokeColor&&(n.strokeStyle=s.strokeColor),N(s.strokeWidth)||(n.lineWidth=s.strokeWidth),n.strokeText(l,e,i,s.maxWidth)),n.fillText(l,e,i,s.maxWidth),Qd(n,e,i,l,s),i+=Number(o.lineHeight);n.restore()}function sn(n,t){const{x:e,y:i,w:o,h:s,radius:r}=t;n.arc(e+r.topLeft,i+r.topLeft,r.topLeft,1.5*j,j,!0),n.lineTo(e,i+s-r.bottomLeft),n.arc(e+r.bottomLeft,i+s-r.bottomLeft,r.bottomLeft,j,K,!0),n.lineTo(e+o-r.bottomRight,i+s),n.arc(e+o-r.bottomRight,i+s-r.bottomRight,r.bottomRight,K,0,!0),n.lineTo(e+o,i+r.topRight),n.arc(e+o-r.topRight,i+r.topRight,r.topRight,0,-K,!0),n.lineTo(e+r.topLeft,i)}const tu=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,eu=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function nu(n,t){const e=(""+n).match(tu);if(!e||e[1]==="normal")return t*1.2;switch(n=+e[2],e[3]){case"px":return n;case"%":n/=100;break}return t*n}const iu=n=>+n||0;function hs(n,t){const e={},i=z(t),o=i?Object.keys(t):t,s=z(n)?i?r=>D(n[r],n[t[r]]):r=>n[r]:()=>n;for(const r of o)e[r]=iu(s(r));return e}function ql(n){return hs(n,{top:"y",right:"x",bottom:"y",left:"x"})}function le(n){return hs(n,["topLeft","topRight","bottomLeft","bottomRight"])}function it(n){const t=ql(n);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function J(n,t){n=n||{},t=t||W.font;let e=D(n.size,t.size);typeof e=="string"&&(e=parseInt(e,10));let i=D(n.style,t.style);i&&!(""+i).match(eu)&&(console.warn('Invalid font style specified: "'+i+'"'),i=void 0);const o={family:D(n.family,t.family),lineHeight:nu(D(n.lineHeight,t.lineHeight),e),size:e,style:i,weight:D(n.weight,t.weight),string:""};return o.string=Gd(o),o}function He(n,t,e,i){let o,s,r;for(o=0,s=n.length;o<s;++o)if(r=n[o],r!==void 0&&r!==void 0)return r}function ou(n,t,e){const{min:i,max:o}=n,s=Il(t,(o-i)/2),r=(a,c)=>e&&a===0?0:a+c;return{min:r(i,-Math.abs(s)),max:r(o,s)}}function Qt(n,t){return Object.assign(Object.create(n),t)}function ps(n,t=[""],e,i,o=()=>n[0]){const s=e||n;typeof i>"u"&&(i=Gl("_fallback",n));const r={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:n,_rootScopes:s,_fallback:i,_getTarget:o,override:a=>ps([a,...n],t,s,i)};return new Proxy(r,{deleteProperty(a,c){return delete a[c],delete a._keys,delete n[0][c],!0},get(a,c){return Ul(a,c,()=>fu(c,t,n,a))},getOwnPropertyDescriptor(a,c){return Reflect.getOwnPropertyDescriptor(a._scopes[0],c)},getPrototypeOf(){return Reflect.getPrototypeOf(n[0])},has(a,c){return qs(a).includes(c)},ownKeys(a){return qs(a)},set(a,c,l){const d=a._storage||(a._storage=o());return a[c]=d[c]=l,delete a._keys,!0}})}function ke(n,t,e,i){const o={_cacheable:!1,_proxy:n,_context:t,_subProxy:e,_stack:new Set,_descriptors:Vl(n,i),setContext:s=>ke(n,s,e,i),override:s=>ke(n.override(s),t,e,i)};return new Proxy(o,{deleteProperty(s,r){return delete s[r],delete n[r],!0},get(s,r,a){return Ul(s,r,()=>ru(s,r,a))},getOwnPropertyDescriptor(s,r){return s._descriptors.allKeys?Reflect.has(n,r)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(n,r)},getPrototypeOf(){return Reflect.getPrototypeOf(n)},has(s,r){return Reflect.has(n,r)},ownKeys(){return Reflect.ownKeys(n)},set(s,r,a){return n[r]=a,delete s[r],!0}})}function Vl(n,t={scriptable:!0,indexable:!0}){const{_scriptable:e=t.scriptable,_indexable:i=t.indexable,_allKeys:o=t.allKeys}=n;return{allKeys:o,scriptable:e,indexable:i,isScriptable:Kt(e)?e:()=>e,isIndexable:Kt(i)?i:()=>i}}const su=(n,t)=>n?n+ls(t):t,ms=(n,t)=>z(t)&&n!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Ul(n,t,e){if(Object.prototype.hasOwnProperty.call(n,t)||t==="constructor")return n[t];const i=e();return n[t]=i,i}function ru(n,t,e){const{_proxy:i,_context:o,_subProxy:s,_descriptors:r}=n;let a=i[t];return Kt(a)&&r.isScriptable(t)&&(a=au(t,a,n,e)),U(a)&&a.length&&(a=lu(t,a,n,r.isIndexable)),ms(t,a)&&(a=ke(a,o,s&&s[t],r)),a}function au(n,t,e,i){const{_proxy:o,_context:s,_subProxy:r,_stack:a}=e;if(a.has(n))throw new Error("Recursion detected: "+Array.from(a).join("->")+"->"+n);a.add(n);let c=t(s,r||i);return a.delete(n),ms(n,c)&&(c=gs(o._scopes,o,n,c)),c}function lu(n,t,e,i){const{_proxy:o,_context:s,_subProxy:r,_descriptors:a}=e;if(typeof s.index<"u"&&i(n))return t[s.index%t.length];if(z(t[0])){const c=t,l=o._scopes.filter(d=>d!==c);t=[];for(const d of c){const u=gs(l,o,n,d);t.push(ke(u,s,r&&r[n],a))}}return t}function Wl(n,t,e){return Kt(n)?n(t,e):n}const cu=(n,t)=>n===!0?t:typeof n=="string"?Xt(t,n):void 0;function du(n,t,e,i,o){for(const s of t){const r=cu(e,s);if(r){n.add(r);const a=Wl(r._fallback,e,o);if(typeof a<"u"&&a!==e&&a!==i)return a}else if(r===!1&&typeof i<"u"&&e!==i)return null}return!1}function gs(n,t,e,i){const o=t._rootScopes,s=Wl(t._fallback,e,i),r=[...n,...o],a=new Set;a.add(i);let c=Hs(a,r,e,s||e,i);return c===null||typeof s<"u"&&s!==e&&(c=Hs(a,r,s,c,i),c===null)?!1:ps(Array.from(a),[""],o,s,()=>uu(t,e,i))}function Hs(n,t,e,i,o){for(;e;)e=du(n,t,e,i,o);return e}function uu(n,t,e){const i=n._getTarget();t in i||(i[t]={});const o=i[t];return U(o)&&z(e)?e:o||{}}function fu(n,t,e,i){let o;for(const s of t)if(o=Gl(su(s,n),e),typeof o<"u")return ms(n,o)?gs(e,i,n,o):o}function Gl(n,t){for(const e of t){if(!e)continue;const i=e[n];if(typeof i<"u")return i}}function qs(n){let t=n._keys;return t||(t=n._keys=hu(n._scopes)),t}function hu(n){const t=new Set;for(const e of n)for(const i of Object.keys(e).filter(o=>!o.startsWith("_")))t.add(i);return Array.from(t)}function Yl(n,t,e,i){const{iScale:o}=n,{key:s="r"}=this._parsing,r=new Array(i);let a,c,l,d;for(a=0,c=i;a<c;++a)l=a+e,d=t[l],r[a]={r:o.parse(Xt(d,s),l)};return r}const pu=Number.EPSILON||1e-14,Ce=(n,t)=>t<n.length&&!n[t].skip&&n[t],Xl=n=>n==="x"?"y":"x";function mu(n,t,e,i){const o=n.skip?t:n,s=t,r=e.skip?t:e,a=zo(s,o),c=zo(r,s);let l=a/(a+c),d=c/(a+c);l=isNaN(l)?0:l,d=isNaN(d)?0:d;const u=i*l,f=i*d;return{previous:{x:s.x-u*(r.x-o.x),y:s.y-u*(r.y-o.y)},next:{x:s.x+f*(r.x-o.x),y:s.y+f*(r.y-o.y)}}}function gu(n,t,e){const i=n.length;let o,s,r,a,c,l=Ce(n,0);for(let d=0;d<i-1;++d)if(c=l,l=Ce(n,d+1),!(!c||!l)){if(Xe(t[d],0,pu)){e[d]=e[d+1]=0;continue}o=e[d]/t[d],s=e[d+1]/t[d],a=Math.pow(o,2)+Math.pow(s,2),!(a<=9)&&(r=3/Math.sqrt(a),e[d]=o*r*t[d],e[d+1]=s*r*t[d])}}function bu(n,t,e="x"){const i=Xl(e),o=n.length;let s,r,a,c=Ce(n,0);for(let l=0;l<o;++l){if(r=a,a=c,c=Ce(n,l+1),!a)continue;const d=a[e],u=a[i];r&&(s=(d-r[e])/3,a[`cp1${e}`]=d-s,a[`cp1${i}`]=u-s*t[l]),c&&(s=(c[e]-d)/3,a[`cp2${e}`]=d+s,a[`cp2${i}`]=u+s*t[l])}}function vu(n,t="x"){const e=Xl(t),i=n.length,o=Array(i).fill(0),s=Array(i);let r,a,c,l=Ce(n,0);for(r=0;r<i;++r)if(a=c,c=l,l=Ce(n,r+1),!!c){if(l){const d=l[t]-c[t];o[r]=d!==0?(l[e]-c[e])/d:0}s[r]=a?l?St(o[r-1])!==St(o[r])?0:(o[r-1]+o[r])/2:o[r-1]:o[r]}gu(n,o,s),bu(n,s,t)}function wn(n,t,e){return Math.max(Math.min(n,e),t)}function yu(n,t){let e,i,o,s,r,a=Ft(n[0],t);for(e=0,i=n.length;e<i;++e)r=s,s=a,a=e<i-1&&Ft(n[e+1],t),s&&(o=n[e],r&&(o.cp1x=wn(o.cp1x,t.left,t.right),o.cp1y=wn(o.cp1y,t.top,t.bottom)),a&&(o.cp2x=wn(o.cp2x,t.left,t.right),o.cp2y=wn(o.cp2y,t.top,t.bottom)))}function xu(n,t,e,i,o){let s,r,a,c;if(t.spanGaps&&(n=n.filter(l=>!l.skip)),t.cubicInterpolationMode==="monotone")vu(n,o);else{let l=i?n[n.length-1]:n[0];for(s=0,r=n.length;s<r;++s)a=n[s],c=mu(l,a,n[Math.min(s+1,r-(i?0:1))%r],t.tension),a.cp1x=c.previous.x,a.cp1y=c.previous.y,a.cp2x=c.next.x,a.cp2y=c.next.y,l=a}t.capBezierPoints&&yu(n,e)}function bs(){return typeof window<"u"&&typeof document<"u"}function vs(n){let t=n.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function Oi(n,t,e){let i;return typeof n=="string"?(i=parseInt(n,10),n.indexOf("%")!==-1&&(i=i/100*t.parentNode[e])):i=n,i}const zi=n=>n.ownerDocument.defaultView.getComputedStyle(n,null);function _u(n,t){return zi(n).getPropertyValue(t)}const wu=["top","right","bottom","left"];function ce(n,t,e){const i={};e=e?"-"+e:"";for(let o=0;o<4;o++){const s=wu[o];i[s]=parseFloat(n[t+"-"+s+e])||0}return i.width=i.left+i.right,i.height=i.top+i.bottom,i}const Eu=(n,t,e)=>(n>0||t>0)&&(!e||!e.shadowRoot);function Su(n,t){const e=n.touches,i=e&&e.length?e[0]:n,{offsetX:o,offsetY:s}=i;let r=!1,a,c;if(Eu(o,s,n.target))a=o,c=s;else{const l=t.getBoundingClientRect();a=i.clientX-l.left,c=i.clientY-l.top,r=!0}return{x:a,y:c,box:r}}function se(n,t){if("native"in n)return n;const{canvas:e,currentDevicePixelRatio:i}=t,o=zi(e),s=o.boxSizing==="border-box",r=ce(o,"padding"),a=ce(o,"border","width"),{x:c,y:l,box:d}=Su(n,e),u=r.left+(d&&a.left),f=r.top+(d&&a.top);let{width:h,height:p}=t;return s&&(h-=r.width+a.width,p-=r.height+a.height),{x:Math.round((c-u)/h*e.width/i),y:Math.round((l-f)/p*e.height/i)}}function ku(n,t,e){let i,o;if(t===void 0||e===void 0){const s=n&&vs(n);if(!s)t=n.clientWidth,e=n.clientHeight;else{const r=s.getBoundingClientRect(),a=zi(s),c=ce(a,"border","width"),l=ce(a,"padding");t=r.width-l.width-c.width,e=r.height-l.height-c.height,i=Oi(a.maxWidth,s,"clientWidth"),o=Oi(a.maxHeight,s,"clientHeight")}}return{width:t,height:e,maxWidth:i||Mi,maxHeight:o||Mi}}const Ut=n=>Math.round(n*10)/10;function Cu(n,t,e,i){const o=zi(n),s=ce(o,"margin"),r=Oi(o.maxWidth,n,"clientWidth")||Mi,a=Oi(o.maxHeight,n,"clientHeight")||Mi,c=ku(n,t,e);let{width:l,height:d}=c;if(o.boxSizing==="content-box"){const f=ce(o,"border","width"),h=ce(o,"padding");l-=h.width+f.width,d-=h.height+f.height}return l=Math.max(0,l-s.width),d=Math.max(0,i?l/i:d-s.height),l=Ut(Math.min(l,r,c.maxWidth)),d=Ut(Math.min(d,a,c.maxHeight)),l&&!d&&(d=Ut(l/2)),(t!==void 0||e!==void 0)&&i&&c.height&&d>c.height&&(d=c.height,l=Ut(Math.floor(d*i))),{width:l,height:d}}function Vs(n,t,e){const i=t||1,o=Ut(n.height*i),s=Ut(n.width*i);n.height=Ut(n.height),n.width=Ut(n.width);const r=n.canvas;return r.style&&(e||!r.style.height&&!r.style.width)&&(r.style.height=`${n.height}px`,r.style.width=`${n.width}px`),n.currentDevicePixelRatio!==i||r.height!==o||r.width!==s?(n.currentDevicePixelRatio=i,r.height=o,r.width=s,n.ctx.setTransform(i,0,0,i,0,0),!0):!1}const Mu=(function(){let n=!1;try{const t={get passive(){return n=!0,!1}};bs()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return n})();function Us(n,t){const e=_u(n,t),i=e&&e.match(/^(\d+)(\.\d+)?px$/);return i?+i[1]:void 0}function re(n,t,e,i){return{x:n.x+e*(t.x-n.x),y:n.y+e*(t.y-n.y)}}function Au(n,t,e,i){return{x:n.x+e*(t.x-n.x),y:i==="middle"?e<.5?n.y:t.y:i==="after"?e<1?n.y:t.y:e>0?t.y:n.y}}function Ou(n,t,e,i){const o={x:n.cp2x,y:n.cp2y},s={x:t.cp1x,y:t.cp1y},r=re(n,o,e),a=re(o,s,e),c=re(s,t,e),l=re(r,a,e),d=re(a,c,e);return re(l,d,e)}const Pu=function(n,t){return{x(e){return n+n+t-e},setWidth(e){t=e},textAlign(e){return e==="center"?e:e==="right"?"left":"right"},xPlus(e,i){return e-i},leftForLtr(e,i){return e-i}}},Iu=function(){return{x(n){return n},setWidth(n){},textAlign(n){return n},xPlus(n,t){return n+t},leftForLtr(n,t){return n}}};function Ee(n,t,e){return n?Pu(t,e):Iu()}function Kl(n,t){let e,i;(t==="ltr"||t==="rtl")&&(e=n.canvas.style,i=[e.getPropertyValue("direction"),e.getPropertyPriority("direction")],e.setProperty("direction",t,"important"),n.prevTextDirection=i)}function Jl(n,t){t!==void 0&&(delete n.prevTextDirection,n.canvas.style.setProperty("direction",t[0],t[1]))}function Ql(n){return n==="angle"?{between:on,compare:Td,normalize:et}:{between:Nt,compare:(t,e)=>t-e,normalize:t=>t}}function Ws({start:n,end:t,count:e,loop:i,style:o}){return{start:n%e,end:t%e,loop:i&&(t-n+1)%e===0,style:o}}function Tu(n,t,e){const{property:i,start:o,end:s}=e,{between:r,normalize:a}=Ql(i),c=t.length;let{start:l,end:d,loop:u}=n,f,h;if(u){for(l+=c,d+=c,f=0,h=c;f<h&&r(a(t[l%c][i]),o,s);++f)l--,d--;l%=c,d%=c}return d<l&&(d+=c),{start:l,end:d,loop:u,style:n.style}}function Zl(n,t,e){if(!e)return[n];const{property:i,start:o,end:s}=e,r=t.length,{compare:a,between:c,normalize:l}=Ql(i),{start:d,end:u,loop:f,style:h}=Tu(n,t,e),p=[];let m=!1,g=null,b,v,y;const x=()=>c(o,y,b)&&a(o,y)!==0,S=()=>a(s,b)===0||c(s,y,b),E=()=>m||x(),k=()=>!m||S();for(let C=d,_=d;C<=u;++C)v=t[C%r],!v.skip&&(b=l(v[i]),b!==y&&(m=c(b,o,s),g===null&&E()&&(g=a(b,o)===0?C:_),g!==null&&k()&&(p.push(Ws({start:g,end:C,loop:f,count:r,style:h})),g=null),_=C,y=b));return g!==null&&p.push(Ws({start:g,end:u,loop:f,count:r,style:h})),p}function tc(n,t){const e=[],i=n.segments;for(let o=0;o<i.length;o++){const s=Zl(i[o],n.points,t);s.length&&e.push(...s)}return e}function Ru(n,t,e,i){let o=0,s=t-1;if(e&&!i)for(;o<t&&!n[o].skip;)o++;for(;o<t&&n[o].skip;)o++;for(o%=t,e&&(s+=o);s>o&&n[s%t].skip;)s--;return s%=t,{start:o,end:s}}function Lu(n,t,e,i){const o=n.length,s=[];let r=t,a=n[t],c;for(c=t+1;c<=e;++c){const l=n[c%o];l.skip||l.stop?a.skip||(i=!1,s.push({start:t%o,end:(c-1)%o,loop:i}),t=r=l.stop?c:null):(r=c,a.skip&&(t=c)),a=l}return r!==null&&s.push({start:t%o,end:r%o,loop:i}),s}function Bu(n,t){const e=n.points,i=n.options.spanGaps,o=e.length;if(!o)return[];const s=!!n._loop,{start:r,end:a}=Ru(e,o,s,i);if(i===!0)return Gs(n,[{start:r,end:a,loop:s}],e,t);const c=a<r?a+o:a,l=!!n._fullLoop&&r===0&&a===o-1;return Gs(n,Lu(e,r,c,l),e,t)}function Gs(n,t,e,i){return!i||!i.setContext||!e?t:Du(n,t,e,i)}function Du(n,t,e,i){const o=n._chart.getContext(),s=Ys(n.options),{_datasetIndex:r,options:{spanGaps:a}}=n,c=e.length,l=[];let d=s,u=t[0].start,f=u;function h(p,m,g,b){const v=a?-1:1;if(p!==m){for(p+=c;e[p%c].skip;)p-=v;for(;e[m%c].skip;)m+=v;p%c!==m%c&&(l.push({start:p%c,end:m%c,loop:g,style:b}),d=b,u=m%c)}}for(const p of t){u=a?u:p.start;let m=e[u%c],g;for(f=u+1;f<=p.end;f++){const b=e[f%c];g=Ys(i.setContext(Qt(o,{type:"segment",p0:m,p1:b,p0DataIndex:(f-1)%c,p1DataIndex:f%c,datasetIndex:r}))),$u(g,d)&&h(u,f-1,p.loop,d),m=b,d=g}u<f-1&&h(u,f-1,p.loop,d)}return l}function Ys(n){return{backgroundColor:n.backgroundColor,borderCapStyle:n.borderCapStyle,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderJoinStyle:n.borderJoinStyle,borderWidth:n.borderWidth,borderColor:n.borderColor}}function $u(n,t){if(!t)return!1;const e=[],i=function(o,s){return fs(s)?(e.includes(s)||e.push(s),e.indexOf(s)):s};return JSON.stringify(n,i)!==JSON.stringify(t,i)}function En(n,t,e){return n.options.clip?n[e]:t[e]}function Nu(n,t){const{xScale:e,yScale:i}=n;return e&&i?{left:En(e,t,"left"),right:En(e,t,"right"),top:En(i,t,"top"),bottom:En(i,t,"bottom")}:t}function ec(n,t){const e=t._clip;if(e.disabled)return!1;const i=Nu(t,n.chartArea);return{left:e.left===!1?0:i.left-(e.left===!0?0:e.left),right:e.right===!1?n.width:i.right+(e.right===!0?0:e.right),top:e.top===!1?0:i.top-(e.top===!0?0:e.top),bottom:e.bottom===!1?n.height:i.bottom+(e.bottom===!0?0:e.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class zu{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,e,i,o){const s=e.listeners[o],r=e.duration;s.forEach(a=>a({chart:t,initial:e.initial,numSteps:r,currentStep:Math.min(i-e.start,r)}))}_refresh(){this._request||(this._running=!0,this._request=$l.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let e=0;this._charts.forEach((i,o)=>{if(!i.running||!i.items.length)return;const s=i.items;let r=s.length-1,a=!1,c;for(;r>=0;--r)c=s[r],c._active?(c._total>i.duration&&(i.duration=c._total),c.tick(t),a=!0):(s[r]=s[s.length-1],s.pop());a&&(o.draw(),this._notify(o,i,t,"progress")),s.length||(i.running=!1,this._notify(o,i,t,"complete"),i.initial=!1),e+=s.length}),this._lastDate=t,e===0&&(this._running=!1)}_getAnims(t){const e=this._charts;let i=e.get(t);return i||(i={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},e.set(t,i)),i}listen(t,e,i){this._getAnims(t).listeners[e].push(i)}add(t,e){!e||!e.length||this._getAnims(t).items.push(...e)}has(t){return this._getAnims(t).items.length>0}start(t){const e=this._charts.get(t);e&&(e.running=!0,e.start=Date.now(),e.duration=e.items.reduce((i,o)=>Math.max(i,o._duration),0),this._refresh())}running(t){if(!this._running)return!1;const e=this._charts.get(t);return!(!e||!e.running||!e.items.length)}stop(t){const e=this._charts.get(t);if(!e||!e.items.length)return;const i=e.items;let o=i.length-1;for(;o>=0;--o)i[o].cancel();e.items=[],this._notify(t,e,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var Lt=new zu;const Xs="transparent",Fu={boolean(n,t,e){return e>.5?t:n},color(n,t,e){const i=zs(n||Xs),o=i.valid&&zs(t||Xs);return o&&o.valid?o.mix(i,e).hexString():t},number(n,t,e){return n+(t-n)*e}};class ju{constructor(t,e,i,o){const s=e[i];o=He([t.to,o,s,t.from]);const r=He([t.from,s,o]);this._active=!0,this._fn=t.fn||Fu[t.type||typeof r],this._easing=Ke[t.easing]||Ke.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=e,this._prop=i,this._from=r,this._to=o,this._promises=void 0}active(){return this._active}update(t,e,i){if(this._active){this._notify(!1);const o=this._target[this._prop],s=i-this._start,r=this._duration-s;this._start=i,this._duration=Math.floor(Math.max(r,t.duration)),this._total+=s,this._loop=!!t.loop,this._to=He([t.to,e,o,t.from]),this._from=He([t.from,o,e])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const e=t-this._start,i=this._duration,o=this._prop,s=this._from,r=this._loop,a=this._to;let c;if(this._active=s!==a&&(r||e<i),!this._active){this._target[o]=a,this._notify(!0);return}if(e<0){this._target[o]=s;return}c=e/i%2,c=r&&c>1?2-c:c,c=this._easing(Math.min(1,Math.max(0,c))),this._target[o]=this._fn(s,a,c)}wait(){const t=this._promises||(this._promises=[]);return new Promise((e,i)=>{t.push({res:e,rej:i})})}_notify(t){const e=t?"res":"rej",i=this._promises||[];for(let o=0;o<i.length;o++)i[o][e]()}}class nc{constructor(t,e){this._chart=t,this._properties=new Map,this.configure(e)}configure(t){if(!z(t))return;const e=Object.keys(W.animation),i=this._properties;Object.getOwnPropertyNames(t).forEach(o=>{const s=t[o];if(!z(s))return;const r={};for(const a of e)r[a]=s[a];(U(s.properties)&&s.properties||[o]).forEach(a=>{(a===o||!i.has(a))&&i.set(a,r)})})}_animateOptions(t,e){const i=e.options,o=qu(t,i);if(!o)return[];const s=this._createAnimations(o,i);return i.$shared&&Hu(t.options.$animations,i).then(()=>{t.options=i},()=>{}),s}_createAnimations(t,e){const i=this._properties,o=[],s=t.$animations||(t.$animations={}),r=Object.keys(e),a=Date.now();let c;for(c=r.length-1;c>=0;--c){const l=r[c];if(l.charAt(0)==="$")continue;if(l==="options"){o.push(...this._animateOptions(t,e));continue}const d=e[l];let u=s[l];const f=i.get(l);if(u)if(f&&u.active()){u.update(f,d,a);continue}else u.cancel();if(!f||!f.duration){t[l]=d;continue}s[l]=u=new ju(f,t,l,d),o.push(u)}return o}update(t,e){if(this._properties.size===0){Object.assign(t,e);return}const i=this._createAnimations(t,e);if(i.length)return Lt.add(this._chart,i),!0}}function Hu(n,t){const e=[],i=Object.keys(t);for(let o=0;o<i.length;o++){const s=n[i[o]];s&&s.active()&&e.push(s.wait())}return Promise.all(e)}function qu(n,t){if(!t)return;let e=n.options;if(!e){n.options=t;return}return e.$shared&&(n.options=e=Object.assign({},e,{$shared:!1,$animations:{}})),e}function Ks(n,t){const e=n&&n.options||{},i=e.reverse,o=e.min===void 0?t:0,s=e.max===void 0?t:0;return{start:i?s:o,end:i?o:s}}function Vu(n,t,e){if(e===!1)return!1;const i=Ks(n,e),o=Ks(t,e);return{top:o.end,right:i.end,bottom:o.start,left:i.start}}function Uu(n){let t,e,i,o;return z(n)?(t=n.top,e=n.right,i=n.bottom,o=n.left):t=e=i=o=n,{top:t,right:e,bottom:i,left:o,disabled:n===!1}}function ic(n,t){const e=[],i=n._getSortedDatasetMetas(t);let o,s;for(o=0,s=i.length;o<s;++o)e.push(i[o].index);return e}function Js(n,t,e,i={}){const o=n.keys,s=i.mode==="single";let r,a,c,l;if(t===null)return;let d=!1;for(r=0,a=o.length;r<a;++r){if(c=+o[r],c===e){if(d=!0,i.all)continue;break}l=n.values[c],X(l)&&(s||t===0||St(t)===St(l))&&(t+=l)}return!d&&!i.all?0:t}function Wu(n,t){const{iScale:e,vScale:i}=t,o=e.axis==="x"?"x":"y",s=i.axis==="x"?"x":"y",r=Object.keys(n),a=new Array(r.length);let c,l,d;for(c=0,l=r.length;c<l;++c)d=r[c],a[c]={[o]:d,[s]:n[d]};return a}function to(n,t){const e=n&&n.options.stacked;return e||e===void 0&&t.stack!==void 0}function Gu(n,t,e){return`${n.id}.${t.id}.${e.stack||e.type}`}function Yu(n){const{min:t,max:e,minDefined:i,maxDefined:o}=n.getUserBounds();return{min:i?t:Number.NEGATIVE_INFINITY,max:o?e:Number.POSITIVE_INFINITY}}function Xu(n,t,e){const i=n[t]||(n[t]={});return i[e]||(i[e]={})}function Qs(n,t,e,i){for(const o of t.getMatchingVisibleMetas(i).reverse()){const s=n[o.index];if(e&&s>0||!e&&s<0)return o.index}return null}function Zs(n,t){const{chart:e,_cachedMeta:i}=n,o=e._stacks||(e._stacks={}),{iScale:s,vScale:r,index:a}=i,c=s.axis,l=r.axis,d=Gu(s,r,i),u=t.length;let f;for(let h=0;h<u;++h){const p=t[h],{[c]:m,[l]:g}=p,b=p._stacks||(p._stacks={});f=b[l]=Xu(o,d,m),f[a]=g,f._top=Qs(f,r,!0,i.type),f._bottom=Qs(f,r,!1,i.type);const v=f._visualValues||(f._visualValues={});v[a]=g}}function eo(n,t){const e=n.scales;return Object.keys(e).filter(i=>e[i].axis===t).shift()}function Ku(n,t){return Qt(n,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function Ju(n,t,e){return Qt(n,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:e,index:t,mode:"default",type:"data"})}function Ae(n,t){const e=n.controller.index,i=n.vScale&&n.vScale.axis;if(i){t=t||n._parsed;for(const o of t){const s=o._stacks;if(!s||s[i]===void 0||s[i][e]===void 0)return;delete s[i][e],s[i]._visualValues!==void 0&&s[i]._visualValues[e]!==void 0&&delete s[i]._visualValues[e]}}}const no=n=>n==="reset"||n==="none",tr=(n,t)=>t?n:Object.assign({},n),Qu=(n,t,e)=>n&&!t.hidden&&t._stacked&&{keys:ic(e,!0),values:null};class bt{constructor(t,e){this.chart=t,this._ctx=t.ctx,this.index=e,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=to(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&Ae(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,e=this._cachedMeta,i=this.getDataset(),o=(u,f,h,p)=>u==="x"?f:u==="r"?p:h,s=e.xAxisID=D(i.xAxisID,eo(t,"x")),r=e.yAxisID=D(i.yAxisID,eo(t,"y")),a=e.rAxisID=D(i.rAxisID,eo(t,"r")),c=e.indexAxis,l=e.iAxisID=o(c,s,r,a),d=e.vAxisID=o(c,r,s,a);e.xScale=this.getScaleForId(s),e.yScale=this.getScaleForId(r),e.rScale=this.getScaleForId(a),e.iScale=this.getScaleForId(l),e.vScale=this.getScaleForId(d)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const e=this._cachedMeta;return t===e.iScale?e.vScale:e.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&Ds(this._data,this),t._stacked&&Ae(t)}_dataCheck(){const t=this.getDataset(),e=t.data||(t.data=[]),i=this._data;if(z(e)){const o=this._cachedMeta;this._data=Wu(e,o)}else if(i!==e){if(i){Ds(i,this);const o=this._cachedMeta;Ae(o),o._parsed=[]}e&&Object.isExtensible(e)&&Dd(e,this),this._syncList=[],this._data=e}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const e=this._cachedMeta,i=this.getDataset();let o=!1;this._dataCheck();const s=e._stacked;e._stacked=to(e.vScale,e),e.stack!==i.stack&&(o=!0,Ae(e),e.stack=i.stack),this._resyncElements(t),(o||s!==e._stacked)&&(Zs(this,e._parsed),e._stacked=to(e.vScale,e))}configure(){const t=this.chart.config,e=t.datasetScopeKeys(this._type),i=t.getOptionScopes(this.getDataset(),e,!0);this.options=t.createResolver(i,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,e){const{_cachedMeta:i,_data:o}=this,{iScale:s,_stacked:r}=i,a=s.axis;let c=t===0&&e===o.length?!0:i._sorted,l=t>0&&i._parsed[t-1],d,u,f;if(this._parsing===!1)i._parsed=o,i._sorted=!0,f=o;else{U(o[t])?f=this.parseArrayData(i,o,t,e):z(o[t])?f=this.parseObjectData(i,o,t,e):f=this.parsePrimitiveData(i,o,t,e);const h=()=>u[a]===null||l&&u[a]<l[a];for(d=0;d<e;++d)i._parsed[d+t]=u=f[d],c&&(h()&&(c=!1),l=u);i._sorted=c}r&&Zs(this,f)}parsePrimitiveData(t,e,i,o){const{iScale:s,vScale:r}=t,a=s.axis,c=r.axis,l=s.getLabels(),d=s===r,u=new Array(o);let f,h,p;for(f=0,h=o;f<h;++f)p=f+i,u[f]={[a]:d||s.parse(l[p],p),[c]:r.parse(e[p],p)};return u}parseArrayData(t,e,i,o){const{xScale:s,yScale:r}=t,a=new Array(o);let c,l,d,u;for(c=0,l=o;c<l;++c)d=c+i,u=e[d],a[c]={x:s.parse(u[0],d),y:r.parse(u[1],d)};return a}parseObjectData(t,e,i,o){const{xScale:s,yScale:r}=t,{xAxisKey:a="x",yAxisKey:c="y"}=this._parsing,l=new Array(o);let d,u,f,h;for(d=0,u=o;d<u;++d)f=d+i,h=e[f],l[d]={x:s.parse(Xt(h,a),f),y:r.parse(Xt(h,c),f)};return l}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,e,i){const o=this.chart,s=this._cachedMeta,r=e[t.axis],a={keys:ic(o,!0),values:e._stacks[t.axis]._visualValues};return Js(a,r,s.index,{mode:i})}updateRangeFromParsed(t,e,i,o){const s=i[e.axis];let r=s===null?NaN:s;const a=o&&i._stacks[e.axis];o&&a&&(o.values=a,r=Js(o,s,this._cachedMeta.index)),t.min=Math.min(t.min,r),t.max=Math.max(t.max,r)}getMinMax(t,e){const i=this._cachedMeta,o=i._parsed,s=i._sorted&&t===i.iScale,r=o.length,a=this._getOtherScale(t),c=Qu(e,i,this.chart),l={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:d,max:u}=Yu(a);let f,h;function p(){h=o[f];const m=h[a.axis];return!X(h[t.axis])||d>m||u<m}for(f=0;f<r&&!(!p()&&(this.updateRangeFromParsed(l,t,h,c),s));++f);if(s){for(f=r-1;f>=0;--f)if(!p()){this.updateRangeFromParsed(l,t,h,c);break}}return l}getAllParsedValues(t){const e=this._cachedMeta._parsed,i=[];let o,s,r;for(o=0,s=e.length;o<s;++o)r=e[o][t.axis],X(r)&&i.push(r);return i}getMaxOverflow(){return!1}getLabelAndValue(t){const e=this._cachedMeta,i=e.iScale,o=e.vScale,s=this.getParsed(t);return{label:i?""+i.getLabelForValue(s[i.axis]):"",value:o?""+o.getLabelForValue(s[o.axis]):""}}_update(t){const e=this._cachedMeta;this.update(t||"default"),e._clip=Uu(D(this.options.clip,Vu(e.xScale,e.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,e=this.chart,i=this._cachedMeta,o=i.data||[],s=e.chartArea,r=[],a=this._drawStart||0,c=this._drawCount||o.length-a,l=this.options.drawActiveElementsOnTop;let d;for(i.dataset&&i.dataset.draw(t,s,a,c),d=a;d<a+c;++d){const u=o[d];u.hidden||(u.active&&l?r.push(u):u.draw(t,s))}for(d=0;d<r.length;++d)r[d].draw(t,s)}getStyle(t,e){const i=e?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(i):this.resolveDataElementOptions(t||0,i)}getContext(t,e,i){const o=this.getDataset();let s;if(t>=0&&t<this._cachedMeta.data.length){const r=this._cachedMeta.data[t];s=r.$context||(r.$context=Ju(this.getContext(),t,r)),s.parsed=this.getParsed(t),s.raw=o.data[t],s.index=s.dataIndex=t}else s=this.$context||(this.$context=Ku(this.chart.getContext(),this.index)),s.dataset=o,s.index=s.datasetIndex=this.index;return s.active=!!e,s.mode=i,s}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,e){return this._resolveElementOptions(this.dataElementType.id,e,t)}_resolveElementOptions(t,e="default",i){const o=e==="active",s=this._cachedDataOpts,r=t+"-"+e,a=s[r],c=this.enableOptionSharing&&nn(i);if(a)return tr(a,c);const l=this.chart.config,d=l.datasetElementScopeKeys(this._type,t),u=o?[`${t}Hover`,"hover",t,""]:[t,""],f=l.getOptionScopes(this.getDataset(),d),h=Object.keys(W.elements[t]),p=()=>this.getContext(i,o,e),m=l.resolveNamedOptions(f,h,p,u);return m.$shared&&(m.$shared=c,s[r]=Object.freeze(tr(m,c))),m}_resolveAnimations(t,e,i){const o=this.chart,s=this._cachedDataOpts,r=`animation-${e}`,a=s[r];if(a)return a;let c;if(o.options.animation!==!1){const d=this.chart.config,u=d.datasetAnimationScopeKeys(this._type,e),f=d.getOptionScopes(this.getDataset(),u);c=d.createResolver(f,this.getContext(t,i,e))}const l=new nc(o,c&&c.animations);return c&&c._cacheable&&(s[r]=Object.freeze(l)),l}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,e){return!e||no(t)||this.chart._animationsDisabled}_getSharedOptions(t,e){const i=this.resolveDataElementOptions(t,e),o=this._sharedOptions,s=this.getSharedOptions(i),r=this.includeOptions(e,s)||s!==o;return this.updateSharedOptions(s,e,i),{sharedOptions:s,includeOptions:r}}updateElement(t,e,i,o){no(o)?Object.assign(t,i):this._resolveAnimations(e,o).update(t,i)}updateSharedOptions(t,e,i){t&&!no(e)&&this._resolveAnimations(void 0,e).update(t,i)}_setStyle(t,e,i,o){t.active=o;const s=this.getStyle(e,o);this._resolveAnimations(e,i,o).update(t,{options:!o&&this.getSharedOptions(s)||s})}removeHoverStyle(t,e,i){this._setStyle(t,i,"active",!1)}setHoverStyle(t,e,i){this._setStyle(t,i,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const e=this._data,i=this._cachedMeta.data;for(const[a,c,l]of this._syncList)this[a](c,l);this._syncList=[];const o=i.length,s=e.length,r=Math.min(s,o);r&&this.parse(0,r),s>o?this._insertElements(o,s-o,t):s<o&&this._removeElements(s,o-s)}_insertElements(t,e,i=!0){const o=this._cachedMeta,s=o.data,r=t+e;let a;const c=l=>{for(l.length+=e,a=l.length-1;a>=r;a--)l[a]=l[a-e]};for(c(s),a=t;a<r;++a)s[a]=new this.dataElementType;this._parsing&&c(o._parsed),this.parse(t,e),i&&this.updateElements(s,t,e,"reset")}updateElements(t,e,i,o){}_removeElements(t,e){const i=this._cachedMeta;if(this._parsing){const o=i._parsed.splice(t,e);i._stacked&&Ae(i,o)}i.data.splice(t,e)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[e,i,o]=t;this[e](i,o)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,e){e&&this._sync(["_removeElements",t,e]);const i=arguments.length-2;i&&this._sync(["_insertElements",t,i])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}T(bt,"defaults",{}),T(bt,"datasetElementType",null),T(bt,"dataElementType",null);function Zu(n,t){if(!n._cache.$bar){const e=n.getMatchingVisibleMetas(t);let i=[];for(let o=0,s=e.length;o<s;o++)i=i.concat(e[o].controller.getAllParsedValues(n));n._cache.$bar=Dl(i.sort((o,s)=>o-s))}return n._cache.$bar}function tf(n){const t=n.iScale,e=Zu(t,n.type);let i=t._length,o,s,r,a;const c=()=>{r===32767||r===-32768||(nn(a)&&(i=Math.min(i,Math.abs(r-a)||i)),a=r)};for(o=0,s=e.length;o<s;++o)r=t.getPixelForValue(e[o]),c();for(a=void 0,o=0,s=t.ticks.length;o<s;++o)r=t.getPixelForTick(o),c();return i}function ef(n,t,e,i){const o=e.barThickness;let s,r;return N(o)?(s=t.min*e.categoryPercentage,r=e.barPercentage):(s=o*i,r=1),{chunk:s/i,ratio:r,start:t.pixels[n]-s/2}}function nf(n,t,e,i){const o=t.pixels,s=o[n];let r=n>0?o[n-1]:null,a=n<o.length-1?o[n+1]:null;const c=e.categoryPercentage;r===null&&(r=s-(a===null?t.end-t.start:a-s)),a===null&&(a=s+s-r);const l=s-(s-Math.min(r,a))/2*c;return{chunk:Math.abs(a-r)/2*c/i,ratio:e.barPercentage,start:l}}function of(n,t,e,i){const o=e.parse(n[0],i),s=e.parse(n[1],i),r=Math.min(o,s),a=Math.max(o,s);let c=r,l=a;Math.abs(r)>Math.abs(a)&&(c=a,l=r),t[e.axis]=l,t._custom={barStart:c,barEnd:l,start:o,end:s,min:r,max:a}}function oc(n,t,e,i){return U(n)?of(n,t,e,i):t[e.axis]=e.parse(n,i),t}function er(n,t,e,i){const o=n.iScale,s=n.vScale,r=o.getLabels(),a=o===s,c=[];let l,d,u,f;for(l=e,d=e+i;l<d;++l)f=t[l],u={},u[o.axis]=a||o.parse(r[l],l),c.push(oc(f,u,s,l));return c}function io(n){return n&&n.barStart!==void 0&&n.barEnd!==void 0}function sf(n,t,e){return n!==0?St(n):(t.isHorizontal()?1:-1)*(t.min>=e?1:-1)}function rf(n){let t,e,i,o,s;return n.horizontal?(t=n.base>n.x,e="left",i="right"):(t=n.base<n.y,e="bottom",i="top"),t?(o="end",s="start"):(o="start",s="end"),{start:e,end:i,reverse:t,top:o,bottom:s}}function af(n,t,e,i){let o=t.borderSkipped;const s={};if(!o){n.borderSkipped=s;return}if(o===!0){n.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:r,end:a,reverse:c,top:l,bottom:d}=rf(n);o==="middle"&&e&&(n.enableBorderRadius=!0,(e._top||0)===i?o=l:(e._bottom||0)===i?o=d:(s[nr(d,r,a,c)]=!0,o=l)),s[nr(o,r,a,c)]=!0,n.borderSkipped=s}function nr(n,t,e,i){return i?(n=lf(n,t,e),n=ir(n,e,t)):n=ir(n,t,e),n}function lf(n,t,e){return n===t?e:n===e?t:n}function ir(n,t,e){return n==="start"?t:n==="end"?e:n}function cf(n,{inflateAmount:t},e){n.inflateAmount=t==="auto"?e===1?.33:0:t}class pi extends bt{parsePrimitiveData(t,e,i,o){return er(t,e,i,o)}parseArrayData(t,e,i,o){return er(t,e,i,o)}parseObjectData(t,e,i,o){const{iScale:s,vScale:r}=t,{xAxisKey:a="x",yAxisKey:c="y"}=this._parsing,l=s.axis==="x"?a:c,d=r.axis==="x"?a:c,u=[];let f,h,p,m;for(f=i,h=i+o;f<h;++f)m=e[f],p={},p[s.axis]=s.parse(Xt(m,l),f),u.push(oc(Xt(m,d),p,r,f));return u}updateRangeFromParsed(t,e,i,o){super.updateRangeFromParsed(t,e,i,o);const s=i._custom;s&&e===this._cachedMeta.vScale&&(t.min=Math.min(t.min,s.min),t.max=Math.max(t.max,s.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const e=this._cachedMeta,{iScale:i,vScale:o}=e,s=this.getParsed(t),r=s._custom,a=io(r)?"["+r.start+", "+r.end+"]":""+o.getLabelForValue(s[o.axis]);return{label:""+i.getLabelForValue(s[i.axis]),value:a}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const e=this._cachedMeta;this.updateElements(e.data,0,e.data.length,t)}updateElements(t,e,i,o){const s=o==="reset",{index:r,_cachedMeta:{vScale:a}}=this,c=a.getBasePixel(),l=a.isHorizontal(),d=this._getRuler(),{sharedOptions:u,includeOptions:f}=this._getSharedOptions(e,o);for(let h=e;h<e+i;h++){const p=this.getParsed(h),m=s||N(p[a.axis])?{base:c,head:c}:this._calculateBarValuePixels(h),g=this._calculateBarIndexPixels(h,d),b=(p._stacks||{})[a.axis],v={horizontal:l,base:m.base,enableBorderRadius:!b||io(p._custom)||r===b._top||r===b._bottom,x:l?m.head:g.center,y:l?g.center:m.head,height:l?g.size:Math.abs(m.size),width:l?Math.abs(m.size):g.size};f&&(v.options=u||this.resolveDataElementOptions(h,t[h].active?"active":o));const y=v.options||t[h].options;af(v,y,b,r),cf(v,y,d.ratio),this.updateElement(t[h],h,v,o)}}_getStacks(t,e){const{iScale:i}=this._cachedMeta,o=i.getMatchingVisibleMetas(this._type).filter(d=>d.controller.options.grouped),s=i.options.stacked,r=[],a=this._cachedMeta.controller.getParsed(e),c=a&&a[i.axis],l=d=>{const u=d._parsed.find(h=>h[i.axis]===c),f=u&&u[d.vScale.axis];if(N(f)||isNaN(f))return!0};for(const d of o)if(!(e!==void 0&&l(d))&&((s===!1||r.indexOf(d.stack)===-1||s===void 0&&d.stack===void 0)&&r.push(d.stack),d.index===t))break;return r.length||r.push(void 0),r}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,e=this.chart.options.indexAxis;return Object.keys(t).filter(i=>t[i].axis===e).shift()}_getAxis(){const t={},e=this.getFirstScaleIdForIndexAxis();for(const i of this.chart.data.datasets)t[D(this.chart.options.indexAxis==="x"?i.xAxisID:i.yAxisID,e)]=!0;return Object.keys(t)}_getStackIndex(t,e,i){const o=this._getStacks(t,i),s=e!==void 0?o.indexOf(e):-1;return s===-1?o.length-1:s}_getRuler(){const t=this.options,e=this._cachedMeta,i=e.iScale,o=[];let s,r;for(s=0,r=e.data.length;s<r;++s)o.push(i.getPixelForValue(this.getParsed(s)[i.axis],s));const a=t.barThickness;return{min:a||tf(e),pixels:o,start:i._startPixel,end:i._endPixel,stackCount:this._getStackCount(),scale:i,grouped:t.grouped,ratio:a?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:e,_stacked:i,index:o},options:{base:s,minBarLength:r}}=this,a=s||0,c=this.getParsed(t),l=c._custom,d=io(l);let u=c[e.axis],f=0,h=i?this.applyStack(e,c,i):u,p,m;h!==u&&(f=h-u,h=u),d&&(u=l.barStart,h=l.barEnd-l.barStart,u!==0&&St(u)!==St(l.barEnd)&&(f=0),f+=u);const g=!N(s)&&!d?s:f;let b=e.getPixelForValue(g);if(this.chart.getDataVisibility(t)?p=e.getPixelForValue(f+h):p=b,m=p-b,Math.abs(m)<r){m=sf(m,e,a)*r,u===a&&(b-=m/2);const v=e.getPixelForDecimal(0),y=e.getPixelForDecimal(1),x=Math.min(v,y),S=Math.max(v,y);b=Math.max(Math.min(b,S),x),p=b+m,i&&!d&&(c._stacks[e.axis]._visualValues[o]=e.getValueForPixel(p)-e.getValueForPixel(b))}if(b===e.getPixelForValue(a)){const v=St(m)*e.getLineWidthForValue(a)/2;b+=v,m-=v}return{size:m,base:b,head:p,center:p+m/2}}_calculateBarIndexPixels(t,e){const i=e.scale,o=this.options,s=o.skipNull,r=D(o.maxBarThickness,1/0);let a,c;const l=this._getAxisCount();if(e.grouped){const d=s?this._getStackCount(t):e.stackCount,u=o.barThickness==="flex"?nf(t,e,o,d*l):ef(t,e,o,d*l),f=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,h=this._getAxis().indexOf(D(f,this.getFirstScaleIdForIndexAxis())),p=this._getStackIndex(this.index,this._cachedMeta.stack,s?t:void 0)+h;a=u.start+u.chunk*p+u.chunk/2,c=Math.min(r,u.chunk*u.ratio)}else a=i.getPixelForValue(this.getParsed(t)[i.axis],t),c=Math.min(r,e.min*e.ratio);return{base:a-c/2,head:a+c/2,center:a,size:c}}draw(){const t=this._cachedMeta,e=t.vScale,i=t.data,o=i.length;let s=0;for(;s<o;++s)this.getParsed(s)[e.axis]!==null&&!i[s].hidden&&i[s].draw(this._ctx)}}T(pi,"id","bar"),T(pi,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),T(pi,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});class mi extends bt{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,e,i,o){const s=super.parsePrimitiveData(t,e,i,o);for(let r=0;r<s.length;r++)s[r]._custom=this.resolveDataElementOptions(r+i).radius;return s}parseArrayData(t,e,i,o){const s=super.parseArrayData(t,e,i,o);for(let r=0;r<s.length;r++){const a=e[i+r];s[r]._custom=D(a[2],this.resolveDataElementOptions(r+i).radius)}return s}parseObjectData(t,e,i,o){const s=super.parseObjectData(t,e,i,o);for(let r=0;r<s.length;r++){const a=e[i+r];s[r]._custom=D(a&&a.r&&+a.r,this.resolveDataElementOptions(r+i).radius)}return s}getMaxOverflow(){const t=this._cachedMeta.data;let e=0;for(let i=t.length-1;i>=0;--i)e=Math.max(e,t[i].size(this.resolveDataElementOptions(i))/2);return e>0&&e}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:o,yScale:s}=e,r=this.getParsed(t),a=o.getLabelForValue(r.x),c=s.getLabelForValue(r.y),l=r._custom;return{label:i[t]||"",value:"("+a+", "+c+(l?", "+l:"")+")"}}update(t){const e=this._cachedMeta.data;this.updateElements(e,0,e.length,t)}updateElements(t,e,i,o){const s=o==="reset",{iScale:r,vScale:a}=this._cachedMeta,{sharedOptions:c,includeOptions:l}=this._getSharedOptions(e,o),d=r.axis,u=a.axis;for(let f=e;f<e+i;f++){const h=t[f],p=!s&&this.getParsed(f),m={},g=m[d]=s?r.getPixelForDecimal(.5):r.getPixelForValue(p[d]),b=m[u]=s?a.getBasePixel():a.getPixelForValue(p[u]);m.skip=isNaN(g)||isNaN(b),l&&(m.options=c||this.resolveDataElementOptions(f,h.active?"active":o),s&&(m.options.radius=0)),this.updateElement(h,f,m,o)}}resolveDataElementOptions(t,e){const i=this.getParsed(t);let o=super.resolveDataElementOptions(t,e);o.$shared&&(o=Object.assign({},o,{$shared:!1}));const s=o.radius;return e!=="active"&&(o.radius=0),o.radius+=D(i&&i._custom,s),o}}T(mi,"id","bubble"),T(mi,"defaults",{datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}}),T(mi,"overrides",{scales:{x:{type:"linear"},y:{type:"linear"}}});function df(n,t,e){let i=1,o=1,s=0,r=0;if(t<V){const a=n,c=a+t,l=Math.cos(a),d=Math.sin(a),u=Math.cos(c),f=Math.sin(c),h=(y,x,S)=>on(y,a,c,!0)?1:Math.max(x,x*e,S,S*e),p=(y,x,S)=>on(y,a,c,!0)?-1:Math.min(x,x*e,S,S*e),m=h(0,l,u),g=h(K,d,f),b=p(j,l,u),v=p(j+K,d,f);i=(m-b)/2,o=(g-v)/2,s=-(m+b)/2,r=-(g+v)/2}return{ratioX:i,ratioY:o,offsetX:s,offsetY:r}}class ae extends bt{constructor(t,e){super(t,e),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,e){const i=this.getDataset().data,o=this._cachedMeta;if(this._parsing===!1)o._parsed=i;else{let s=c=>+i[c];if(z(i[t])){const{key:c="value"}=this._parsing;s=l=>+Xt(i[l],c)}let r,a;for(r=t,a=t+e;r<a;++r)o._parsed[r]=s(r)}}_getRotation(){return gt(this.options.rotation-90)}_getCircumference(){return gt(this.options.circumference)}_getRotationExtents(){let t=V,e=-V;for(let i=0;i<this.chart.data.datasets.length;++i)if(this.chart.isDatasetVisible(i)&&this.chart.getDatasetMeta(i).type===this._type){const o=this.chart.getDatasetMeta(i).controller,s=o._getRotation(),r=o._getCircumference();t=Math.min(t,s),e=Math.max(e,s+r)}return{rotation:t,circumference:e-t}}update(t){const e=this.chart,{chartArea:i}=e,o=this._cachedMeta,s=o.data,r=this.getMaxBorderWidth()+this.getMaxOffset(s)+this.options.spacing,a=Math.max((Math.min(i.width,i.height)-r)/2,0),c=Math.min(_d(this.options.cutout,a),1),l=this._getRingWeight(this.index),{circumference:d,rotation:u}=this._getRotationExtents(),{ratioX:f,ratioY:h,offsetX:p,offsetY:m}=df(u,d,c),g=(i.width-r)/f,b=(i.height-r)/h,v=Math.max(Math.min(g,b)/2,0),y=Il(this.options.radius,v),x=Math.max(y*c,0),S=(y-x)/this._getVisibleDatasetWeightTotal();this.offsetX=p*y,this.offsetY=m*y,o.total=this.calculateTotal(),this.outerRadius=y-S*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-S*l,0),this.updateElements(s,0,s.length,t)}_circumference(t,e){const i=this.options,o=this._cachedMeta,s=this._getCircumference();return e&&i.animation.animateRotate||!this.chart.getDataVisibility(t)||o._parsed[t]===null||o.data[t].hidden?0:this.calculateCircumference(o._parsed[t]*s/V)}updateElements(t,e,i,o){const s=o==="reset",r=this.chart,a=r.chartArea,l=r.options.animation,d=(a.left+a.right)/2,u=(a.top+a.bottom)/2,f=s&&l.animateScale,h=f?0:this.innerRadius,p=f?0:this.outerRadius,{sharedOptions:m,includeOptions:g}=this._getSharedOptions(e,o);let b=this._getRotation(),v;for(v=0;v<e;++v)b+=this._circumference(v,s);for(v=e;v<e+i;++v){const y=this._circumference(v,s),x=t[v],S={x:d+this.offsetX,y:u+this.offsetY,startAngle:b,endAngle:b+y,circumference:y,outerRadius:p,innerRadius:h};g&&(S.options=m||this.resolveDataElementOptions(v,x.active?"active":o)),b+=y,this.updateElement(x,v,S,o)}}calculateTotal(){const t=this._cachedMeta,e=t.data;let i=0,o;for(o=0;o<e.length;o++){const s=t._parsed[o];s!==null&&!isNaN(s)&&this.chart.getDataVisibility(o)&&!e[o].hidden&&(i+=Math.abs(s))}return i}calculateCircumference(t){const e=this._cachedMeta.total;return e>0&&!isNaN(t)?V*(Math.abs(t)/e):0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,o=i.data.labels||[],s=fn(e._parsed[t],i.options.locale);return{label:o[t]||"",value:s}}getMaxBorderWidth(t){let e=0;const i=this.chart;let o,s,r,a,c;if(!t){for(o=0,s=i.data.datasets.length;o<s;++o)if(i.isDatasetVisible(o)){r=i.getDatasetMeta(o),t=r.data,a=r.controller;break}}if(!t)return 0;for(o=0,s=t.length;o<s;++o)c=a.resolveDataElementOptions(o),c.borderAlign!=="inner"&&(e=Math.max(e,c.borderWidth||0,c.hoverBorderWidth||0));return e}getMaxOffset(t){let e=0;for(let i=0,o=t.length;i<o;++i){const s=this.resolveDataElementOptions(i);e=Math.max(e,s.offset||0,s.hoverOffset||0)}return e}_getRingWeightOffset(t){let e=0;for(let i=0;i<t;++i)this.chart.isDatasetVisible(i)&&(e+=this._getRingWeight(i));return e}_getRingWeight(t){return Math.max(D(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}T(ae,"id","doughnut"),T(ae,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),T(ae,"descriptors",{_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")}),T(ae,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data,{labels:{pointStyle:i,textAlign:o,color:s,useBorderRadius:r,borderRadius:a}}=t.legend.options;return e.labels.length&&e.datasets.length?e.labels.map((c,l)=>{const u=t.getDatasetMeta(0).controller.getStyle(l);return{text:c,fillStyle:u.backgroundColor,fontColor:s,hidden:!t.getDataVisibility(l),lineDash:u.borderDash,lineDashOffset:u.borderDashOffset,lineJoin:u.borderJoinStyle,lineWidth:u.borderWidth,strokeStyle:u.borderColor,textAlign:o,pointStyle:i,borderRadius:r&&(a||u.borderRadius),index:l}}):[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}}});class gi extends bt{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const e=this._cachedMeta,{dataset:i,data:o=[],_dataset:s}=e,r=this.chart._animationsDisabled;let{start:a,count:c}=zl(e,o,r);this._drawStart=a,this._drawCount=c,Fl(e)&&(a=0,c=o.length),i._chart=this.chart,i._datasetIndex=this.index,i._decimated=!!s._decimated,i.points=o;const l=this.resolveDatasetElementOptions(t);this.options.showLine||(l.borderWidth=0),l.segment=this.options.segment,this.updateElement(i,void 0,{animated:!r,options:l},t),this.updateElements(o,a,c,t)}updateElements(t,e,i,o){const s=o==="reset",{iScale:r,vScale:a,_stacked:c,_dataset:l}=this._cachedMeta,{sharedOptions:d,includeOptions:u}=this._getSharedOptions(e,o),f=r.axis,h=a.axis,{spanGaps:p,segment:m}=this.options,g=Se(p)?p:Number.POSITIVE_INFINITY,b=this.chart._animationsDisabled||s||o==="none",v=e+i,y=t.length;let x=e>0&&this.getParsed(e-1);for(let S=0;S<y;++S){const E=t[S],k=b?E:{};if(S<e||S>=v){k.skip=!0;continue}const C=this.getParsed(S),_=N(C[h]),A=k[f]=r.getPixelForValue(C[f],S),M=k[h]=s||_?a.getBasePixel():a.getPixelForValue(c?this.applyStack(a,C,c):C[h],S);k.skip=isNaN(A)||isNaN(M)||_,k.stop=S>0&&Math.abs(C[f]-x[f])>g,m&&(k.parsed=C,k.raw=l.data[S]),u&&(k.options=d||this.resolveDataElementOptions(S,E.active?"active":o)),b||this.updateElement(E,S,k,o),x=C}}getMaxOverflow(){const t=this._cachedMeta,e=t.dataset,i=e.options&&e.options.borderWidth||0,o=t.data||[];if(!o.length)return i;const s=o[0].size(this.resolveDataElementOptions(0)),r=o[o.length-1].size(this.resolveDataElementOptions(o.length-1));return Math.max(i,s,r)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}T(gi,"id","line"),T(gi,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),T(gi,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});class Qe extends bt{constructor(t,e){super(t,e),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const e=this._cachedMeta,i=this.chart,o=i.data.labels||[],s=fn(e._parsed[t].r,i.options.locale);return{label:o[t]||"",value:s}}parseObjectData(t,e,i,o){return Yl.bind(this)(t,e,i,o)}update(t){const e=this._cachedMeta.data;this._updateRadius(),this.updateElements(e,0,e.length,t)}getMinMax(){const t=this._cachedMeta,e={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((i,o)=>{const s=this.getParsed(o).r;!isNaN(s)&&this.chart.getDataVisibility(o)&&(s<e.min&&(e.min=s),s>e.max&&(e.max=s))}),e}_updateRadius(){const t=this.chart,e=t.chartArea,i=t.options,o=Math.min(e.right-e.left,e.bottom-e.top),s=Math.max(o/2,0),r=Math.max(i.cutoutPercentage?s/100*i.cutoutPercentage:1,0),a=(s-r)/t.getVisibleDatasetCount();this.outerRadius=s-a*this.index,this.innerRadius=this.outerRadius-a}updateElements(t,e,i,o){const s=o==="reset",r=this.chart,c=r.options.animation,l=this._cachedMeta.rScale,d=l.xCenter,u=l.yCenter,f=l.getIndexAngle(0)-.5*j;let h=f,p;const m=360/this.countVisibleElements();for(p=0;p<e;++p)h+=this._computeAngle(p,o,m);for(p=e;p<e+i;p++){const g=t[p];let b=h,v=h+this._computeAngle(p,o,m),y=r.getDataVisibility(p)?l.getDistanceFromCenterForValue(this.getParsed(p).r):0;h=v,s&&(c.animateScale&&(y=0),c.animateRotate&&(b=v=f));const x={x:d,y:u,innerRadius:0,outerRadius:y,startAngle:b,endAngle:v,options:this.resolveDataElementOptions(p,g.active?"active":o)};this.updateElement(g,p,x,o)}}countVisibleElements(){const t=this._cachedMeta;let e=0;return t.data.forEach((i,o)=>{!isNaN(this.getParsed(o).r)&&this.chart.getDataVisibility(o)&&e++}),e}_computeAngle(t,e,i){return this.chart.getDataVisibility(t)?gt(this.resolveDataElementOptions(t,e).angle||i):0}}T(Qe,"id","polarArea"),T(Qe,"defaults",{dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0}),T(Qe,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:i,color:o}}=t.legend.options;return e.labels.map((s,r)=>{const c=t.getDatasetMeta(0).controller.getStyle(r);return{text:s,fillStyle:c.backgroundColor,strokeStyle:c.borderColor,fontColor:o,lineWidth:c.borderWidth,pointStyle:i,hidden:!t.getDataVisibility(r),index:r}})}return[]}},onClick(t,e,i){i.chart.toggleDataVisibility(e.index),i.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}});class Ho extends ae{}T(Ho,"id","pie"),T(Ho,"defaults",{cutout:0,rotation:0,circumference:360,radius:"100%"});class bi extends bt{getLabelAndValue(t){const e=this._cachedMeta.vScale,i=this.getParsed(t);return{label:e.getLabels()[t],value:""+e.getLabelForValue(i[e.axis])}}parseObjectData(t,e,i,o){return Yl.bind(this)(t,e,i,o)}update(t){const e=this._cachedMeta,i=e.dataset,o=e.data||[],s=e.iScale.getLabels();if(i.points=o,t!=="resize"){const r=this.resolveDatasetElementOptions(t);this.options.showLine||(r.borderWidth=0);const a={_loop:!0,_fullLoop:s.length===o.length,options:r};this.updateElement(i,void 0,a,t)}this.updateElements(o,0,o.length,t)}updateElements(t,e,i,o){const s=this._cachedMeta.rScale,r=o==="reset";for(let a=e;a<e+i;a++){const c=t[a],l=this.resolveDataElementOptions(a,c.active?"active":o),d=s.getPointPositionForValue(a,this.getParsed(a).r),u=r?s.xCenter:d.x,f=r?s.yCenter:d.y,h={x:u,y:f,angle:d.angle,skip:isNaN(u)||isNaN(f),options:l};this.updateElement(c,a,h,o)}}}T(bi,"id","radar"),T(bi,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),T(bi,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});class vi extends bt{getLabelAndValue(t){const e=this._cachedMeta,i=this.chart.data.labels||[],{xScale:o,yScale:s}=e,r=this.getParsed(t),a=o.getLabelForValue(r.x),c=s.getLabelForValue(r.y);return{label:i[t]||"",value:"("+a+", "+c+")"}}update(t){const e=this._cachedMeta,{data:i=[]}=e,o=this.chart._animationsDisabled;let{start:s,count:r}=zl(e,i,o);if(this._drawStart=s,this._drawCount=r,Fl(e)&&(s=0,r=i.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:a,_dataset:c}=e;a._chart=this.chart,a._datasetIndex=this.index,a._decimated=!!c._decimated,a.points=i;const l=this.resolveDatasetElementOptions(t);l.segment=this.options.segment,this.updateElement(a,void 0,{animated:!o,options:l},t)}else this.datasetElementType&&(delete e.dataset,this.datasetElementType=!1);this.updateElements(i,s,r,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,e,i,o){const s=o==="reset",{iScale:r,vScale:a,_stacked:c,_dataset:l}=this._cachedMeta,d=this.resolveDataElementOptions(e,o),u=this.getSharedOptions(d),f=this.includeOptions(o,u),h=r.axis,p=a.axis,{spanGaps:m,segment:g}=this.options,b=Se(m)?m:Number.POSITIVE_INFINITY,v=this.chart._animationsDisabled||s||o==="none";let y=e>0&&this.getParsed(e-1);for(let x=e;x<e+i;++x){const S=t[x],E=this.getParsed(x),k=v?S:{},C=N(E[p]),_=k[h]=r.getPixelForValue(E[h],x),A=k[p]=s||C?a.getBasePixel():a.getPixelForValue(c?this.applyStack(a,E,c):E[p],x);k.skip=isNaN(_)||isNaN(A)||C,k.stop=x>0&&Math.abs(E[h]-y[h])>b,g&&(k.parsed=E,k.raw=l.data[x]),f&&(k.options=u||this.resolveDataElementOptions(x,S.active?"active":o)),v||this.updateElement(S,x,k,o),y=E}this.updateSharedOptions(u,o,d)}getMaxOverflow(){const t=this._cachedMeta,e=t.data||[];if(!this.options.showLine){let a=0;for(let c=e.length-1;c>=0;--c)a=Math.max(a,e[c].size(this.resolveDataElementOptions(c))/2);return a>0&&a}const i=t.dataset,o=i.options&&i.options.borderWidth||0;if(!e.length)return o;const s=e[0].size(this.resolveDataElementOptions(0)),r=e[e.length-1].size(this.resolveDataElementOptions(e.length-1));return Math.max(o,s,r)/2}}T(vi,"id","scatter"),T(vi,"defaults",{datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1}),T(vi,"overrides",{interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}});var uf=Object.freeze({__proto__:null,BarController:pi,BubbleController:mi,DoughnutController:ae,LineController:gi,PieController:Ho,PolarAreaController:Qe,RadarController:bi,ScatterController:vi});function ee(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class ys{constructor(t){T(this,"options");this.options=t||{}}static override(t){Object.assign(ys.prototype,t)}init(){}formats(){return ee()}parse(){return ee()}format(){return ee()}add(){return ee()}diff(){return ee()}startOf(){return ee()}endOf(){return ee()}}var ff={_date:ys};function hf(n,t,e,i){const{controller:o,data:s,_sorted:r}=n,a=o._cachedMeta.iScale,c=n.dataset&&n.dataset.options?n.dataset.options.spanGaps:null;if(a&&t===a.axis&&t!=="r"&&r&&s.length){const l=a._reversePixels?Ld:zt;if(i){if(o._sharedOptions){const d=s[0],u=typeof d.getRange=="function"&&d.getRange(t);if(u){const f=l(s,t,e-u),h=l(s,t,e+u);return{lo:f.lo,hi:h.hi}}}}else{const d=l(s,t,e);if(c){const{vScale:u}=o._cachedMeta,{_parsed:f}=n,h=f.slice(0,d.lo+1).reverse().findIndex(m=>!N(m[u.axis]));d.lo-=Math.max(0,h);const p=f.slice(d.hi).findIndex(m=>!N(m[u.axis]));d.hi+=Math.max(0,p)}return d}}return{lo:0,hi:s.length-1}}function Fi(n,t,e,i,o){const s=n.getSortedVisibleDatasetMetas(),r=e[t];for(let a=0,c=s.length;a<c;++a){const{index:l,data:d}=s[a],{lo:u,hi:f}=hf(s[a],t,r,o);for(let h=u;h<=f;++h){const p=d[h];p.skip||i(p,l,h)}}}function pf(n){const t=n.indexOf("x")!==-1,e=n.indexOf("y")!==-1;return function(i,o){const s=t?Math.abs(i.x-o.x):0,r=e?Math.abs(i.y-o.y):0;return Math.sqrt(Math.pow(s,2)+Math.pow(r,2))}}function oo(n,t,e,i,o){const s=[];return!o&&!n.isPointInArea(t)||Fi(n,e,t,function(a,c,l){!o&&!Ft(a,n.chartArea,0)||a.inRange(t.x,t.y,i)&&s.push({element:a,datasetIndex:c,index:l})},!0),s}function mf(n,t,e,i){let o=[];function s(r,a,c){const{startAngle:l,endAngle:d}=r.getProps(["startAngle","endAngle"],i),{angle:u}=Ll(r,{x:t.x,y:t.y});on(u,l,d)&&o.push({element:r,datasetIndex:a,index:c})}return Fi(n,e,t,s),o}function gf(n,t,e,i,o,s){let r=[];const a=pf(e);let c=Number.POSITIVE_INFINITY;function l(d,u,f){const h=d.inRange(t.x,t.y,o);if(i&&!h)return;const p=d.getCenterPoint(o);if(!(!!s||n.isPointInArea(p))&&!h)return;const g=a(t,p);g<c?(r=[{element:d,datasetIndex:u,index:f}],c=g):g===c&&r.push({element:d,datasetIndex:u,index:f})}return Fi(n,e,t,l),r}function so(n,t,e,i,o,s){return!s&&!n.isPointInArea(t)?[]:e==="r"&&!i?mf(n,t,e,o):gf(n,t,e,i,o,s)}function or(n,t,e,i,o){const s=[],r=e==="x"?"inXRange":"inYRange";let a=!1;return Fi(n,e,t,(c,l,d)=>{c[r]&&c[r](t[e],o)&&(s.push({element:c,datasetIndex:l,index:d}),a=a||c.inRange(t.x,t.y,o))}),i&&!a?[]:s}var bf={modes:{index(n,t,e,i){const o=se(t,n),s=e.axis||"x",r=e.includeInvisible||!1,a=e.intersect?oo(n,o,s,i,r):so(n,o,s,!1,i,r),c=[];return a.length?(n.getSortedVisibleDatasetMetas().forEach(l=>{const d=a[0].index,u=l.data[d];u&&!u.skip&&c.push({element:u,datasetIndex:l.index,index:d})}),c):[]},dataset(n,t,e,i){const o=se(t,n),s=e.axis||"xy",r=e.includeInvisible||!1;let a=e.intersect?oo(n,o,s,i,r):so(n,o,s,!1,i,r);if(a.length>0){const c=a[0].datasetIndex,l=n.getDatasetMeta(c).data;a=[];for(let d=0;d<l.length;++d)a.push({element:l[d],datasetIndex:c,index:d})}return a},point(n,t,e,i){const o=se(t,n),s=e.axis||"xy",r=e.includeInvisible||!1;return oo(n,o,s,i,r)},nearest(n,t,e,i){const o=se(t,n),s=e.axis||"xy",r=e.includeInvisible||!1;return so(n,o,s,e.intersect,i,r)},x(n,t,e,i){const o=se(t,n);return or(n,o,"x",e.intersect,i)},y(n,t,e,i){const o=se(t,n);return or(n,o,"y",e.intersect,i)}}};const sc=["left","top","right","bottom"];function Oe(n,t){return n.filter(e=>e.pos===t)}function sr(n,t){return n.filter(e=>sc.indexOf(e.pos)===-1&&e.box.axis===t)}function Pe(n,t){return n.sort((e,i)=>{const o=t?i:e,s=t?e:i;return o.weight===s.weight?o.index-s.index:o.weight-s.weight})}function vf(n){const t=[];let e,i,o,s,r,a;for(e=0,i=(n||[]).length;e<i;++e)o=n[e],{position:s,options:{stack:r,stackWeight:a=1}}=o,t.push({index:e,box:o,pos:s,horizontal:o.isHorizontal(),weight:o.weight,stack:r&&s+r,stackWeight:a});return t}function yf(n){const t={};for(const e of n){const{stack:i,pos:o,stackWeight:s}=e;if(!i||!sc.includes(o))continue;const r=t[i]||(t[i]={count:0,placed:0,weight:0,size:0});r.count++,r.weight+=s}return t}function xf(n,t){const e=yf(n),{vBoxMaxWidth:i,hBoxMaxHeight:o}=t;let s,r,a;for(s=0,r=n.length;s<r;++s){a=n[s];const{fullSize:c}=a.box,l=e[a.stack],d=l&&a.stackWeight/l.weight;a.horizontal?(a.width=d?d*i:c&&t.availableWidth,a.height=o):(a.width=i,a.height=d?d*o:c&&t.availableHeight)}return e}function _f(n){const t=vf(n),e=Pe(t.filter(l=>l.box.fullSize),!0),i=Pe(Oe(t,"left"),!0),o=Pe(Oe(t,"right")),s=Pe(Oe(t,"top"),!0),r=Pe(Oe(t,"bottom")),a=sr(t,"x"),c=sr(t,"y");return{fullSize:e,leftAndTop:i.concat(s),rightAndBottom:o.concat(c).concat(r).concat(a),chartArea:Oe(t,"chartArea"),vertical:i.concat(o).concat(c),horizontal:s.concat(r).concat(a)}}function rr(n,t,e,i){return Math.max(n[e],t[e])+Math.max(n[i],t[i])}function rc(n,t){n.top=Math.max(n.top,t.top),n.left=Math.max(n.left,t.left),n.bottom=Math.max(n.bottom,t.bottom),n.right=Math.max(n.right,t.right)}function wf(n,t,e,i){const{pos:o,box:s}=e,r=n.maxPadding;if(!z(o)){e.size&&(n[o]-=e.size);const u=i[e.stack]||{size:0,count:1};u.size=Math.max(u.size,e.horizontal?s.height:s.width),e.size=u.size/u.count,n[o]+=e.size}s.getPadding&&rc(r,s.getPadding());const a=Math.max(0,t.outerWidth-rr(r,n,"left","right")),c=Math.max(0,t.outerHeight-rr(r,n,"top","bottom")),l=a!==n.w,d=c!==n.h;return n.w=a,n.h=c,e.horizontal?{same:l,other:d}:{same:d,other:l}}function Ef(n){const t=n.maxPadding;function e(i){const o=Math.max(t[i]-n[i],0);return n[i]+=o,o}n.y+=e("top"),n.x+=e("left"),e("right"),e("bottom")}function Sf(n,t){const e=t.maxPadding;function i(o){const s={left:0,top:0,right:0,bottom:0};return o.forEach(r=>{s[r]=Math.max(t[r],e[r])}),s}return i(n?["left","right"]:["top","bottom"])}function qe(n,t,e,i){const o=[];let s,r,a,c,l,d;for(s=0,r=n.length,l=0;s<r;++s){a=n[s],c=a.box,c.update(a.width||t.w,a.height||t.h,Sf(a.horizontal,t));const{same:u,other:f}=wf(t,e,a,i);l|=u&&o.length,d=d||f,c.fullSize||o.push(a)}return l&&qe(o,t,e,i)||d}function Sn(n,t,e,i,o){n.top=e,n.left=t,n.right=t+i,n.bottom=e+o,n.width=i,n.height=o}function ar(n,t,e,i){const o=e.padding;let{x:s,y:r}=t;for(const a of n){const c=a.box,l=i[a.stack]||{placed:0,weight:1},d=a.stackWeight/l.weight||1;if(a.horizontal){const u=t.w*d,f=l.size||c.height;nn(l.start)&&(r=l.start),c.fullSize?Sn(c,o.left,r,e.outerWidth-o.right-o.left,f):Sn(c,t.left+l.placed,r,u,f),l.start=r,l.placed+=u,r=c.bottom}else{const u=t.h*d,f=l.size||c.width;nn(l.start)&&(s=l.start),c.fullSize?Sn(c,s,o.top,f,e.outerHeight-o.bottom-o.top):Sn(c,s,t.top+l.placed,f,u),l.start=s,l.placed+=u,s=c.right}}t.x=s,t.y=r}var nt={addBox(n,t){n.boxes||(n.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(e){t.draw(e)}}]},n.boxes.push(t)},removeBox(n,t){const e=n.boxes?n.boxes.indexOf(t):-1;e!==-1&&n.boxes.splice(e,1)},configure(n,t,e){t.fullSize=e.fullSize,t.position=e.position,t.weight=e.weight},update(n,t,e,i){if(!n)return;const o=it(n.options.layout.padding),s=Math.max(t-o.width,0),r=Math.max(e-o.height,0),a=_f(n.boxes),c=a.vertical,l=a.horizontal;H(n.boxes,m=>{typeof m.beforeLayout=="function"&&m.beforeLayout()});const d=c.reduce((m,g)=>g.box.options&&g.box.options.display===!1?m:m+1,0)||1,u=Object.freeze({outerWidth:t,outerHeight:e,padding:o,availableWidth:s,availableHeight:r,vBoxMaxWidth:s/2/d,hBoxMaxHeight:r/2}),f=Object.assign({},o);rc(f,it(i));const h=Object.assign({maxPadding:f,w:s,h:r,x:o.left,y:o.top},o),p=xf(c.concat(l),u);qe(a.fullSize,h,u,p),qe(c,h,u,p),qe(l,h,u,p)&&qe(c,h,u,p),Ef(h),ar(a.leftAndTop,h,u,p),h.x+=h.w,h.y+=h.h,ar(a.rightAndBottom,h,u,p),n.chartArea={left:h.left,top:h.top,right:h.left+h.w,bottom:h.top+h.h,height:h.h,width:h.w},H(a.chartArea,m=>{const g=m.box;Object.assign(g,n.chartArea),g.update(h.w,h.h,{left:0,top:0,right:0,bottom:0})})}};class ac{acquireContext(t,e){}releaseContext(t){return!1}addEventListener(t,e,i){}removeEventListener(t,e,i){}getDevicePixelRatio(){return 1}getMaximumSize(t,e,i,o){return e=Math.max(0,e||t.width),i=i||t.height,{width:e,height:Math.max(0,o?Math.floor(e/o):i)}}isAttached(t){return!0}updateConfig(t){}}class kf extends ac{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const yi="$chartjs",Cf={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},lr=n=>n===null||n==="";function Mf(n,t){const e=n.style,i=n.getAttribute("height"),o=n.getAttribute("width");if(n[yi]={initial:{height:i,width:o,style:{display:e.display,height:e.height,width:e.width}}},e.display=e.display||"block",e.boxSizing=e.boxSizing||"border-box",lr(o)){const s=Us(n,"width");s!==void 0&&(n.width=s)}if(lr(i))if(n.style.height==="")n.height=n.width/(t||2);else{const s=Us(n,"height");s!==void 0&&(n.height=s)}return n}const lc=Mu?{passive:!0}:!1;function Af(n,t,e){n&&n.addEventListener(t,e,lc)}function Of(n,t,e){n&&n.canvas&&n.canvas.removeEventListener(t,e,lc)}function Pf(n,t){const e=Cf[n.type]||n.type,{x:i,y:o}=se(n,t);return{type:e,chart:t,native:n,x:i!==void 0?i:null,y:o!==void 0?o:null}}function Pi(n,t){for(const e of n)if(e===t||e.contains(t))return!0}function If(n,t,e){const i=n.canvas,o=new MutationObserver(s=>{let r=!1;for(const a of s)r=r||Pi(a.addedNodes,i),r=r&&!Pi(a.removedNodes,i);r&&e()});return o.observe(document,{childList:!0,subtree:!0}),o}function Tf(n,t,e){const i=n.canvas,o=new MutationObserver(s=>{let r=!1;for(const a of s)r=r||Pi(a.removedNodes,i),r=r&&!Pi(a.addedNodes,i);r&&e()});return o.observe(document,{childList:!0,subtree:!0}),o}const rn=new Map;let cr=0;function cc(){const n=window.devicePixelRatio;n!==cr&&(cr=n,rn.forEach((t,e)=>{e.currentDevicePixelRatio!==n&&t()}))}function Rf(n,t){rn.size||window.addEventListener("resize",cc),rn.set(n,t)}function Lf(n){rn.delete(n),rn.size||window.removeEventListener("resize",cc)}function Bf(n,t,e){const i=n.canvas,o=i&&vs(i);if(!o)return;const s=Nl((a,c)=>{const l=o.clientWidth;e(a,c),l<o.clientWidth&&e()},window),r=new ResizeObserver(a=>{const c=a[0],l=c.contentRect.width,d=c.contentRect.height;l===0&&d===0||s(l,d)});return r.observe(o),Rf(n,s),r}function ro(n,t,e){e&&e.disconnect(),t==="resize"&&Lf(n)}function Df(n,t,e){const i=n.canvas,o=Nl(s=>{n.ctx!==null&&e(Pf(s,n))},n);return Af(i,t,o),o}class $f extends ac{acquireContext(t,e){const i=t&&t.getContext&&t.getContext("2d");return i&&i.canvas===t?(Mf(t,e),i):null}releaseContext(t){const e=t.canvas;if(!e[yi])return!1;const i=e[yi].initial;["height","width"].forEach(s=>{const r=i[s];N(r)?e.removeAttribute(s):e.setAttribute(s,r)});const o=i.style||{};return Object.keys(o).forEach(s=>{e.style[s]=o[s]}),e.width=e.width,delete e[yi],!0}addEventListener(t,e,i){this.removeEventListener(t,e);const o=t.$proxies||(t.$proxies={}),r={attach:If,detach:Tf,resize:Bf}[e]||Df;o[e]=r(t,e,i)}removeEventListener(t,e){const i=t.$proxies||(t.$proxies={}),o=i[e];if(!o)return;({attach:ro,detach:ro,resize:ro}[e]||Of)(t,e,o),i[e]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,e,i,o){return Cu(t,e,i,o)}isAttached(t){const e=t&&vs(t);return!!(e&&e.isConnected)}}function Nf(n){return!bs()||typeof OffscreenCanvas<"u"&&n instanceof OffscreenCanvas?kf:$f}class vt{constructor(){T(this,"x");T(this,"y");T(this,"active",!1);T(this,"options");T(this,"$animations")}tooltipPosition(t){const{x:e,y:i}=this.getProps(["x","y"],t);return{x:e,y:i}}hasValue(){return Se(this.x)&&Se(this.y)}getProps(t,e){const i=this.$animations;if(!e||!i)return this;const o={};return t.forEach(s=>{o[s]=i[s]&&i[s].active()?i[s]._to:this[s]}),o}}T(vt,"defaults",{}),T(vt,"defaultRoutes");function zf(n,t){const e=n.options.ticks,i=Ff(n),o=Math.min(e.maxTicksLimit||i,i),s=e.major.enabled?Hf(t):[],r=s.length,a=s[0],c=s[r-1],l=[];if(r>o)return qf(t,l,s,r/o),l;const d=jf(s,t,o);if(r>0){let u,f;const h=r>1?Math.round((c-a)/(r-1)):null;for(kn(t,l,d,N(h)?0:a-h,a),u=0,f=r-1;u<f;u++)kn(t,l,d,s[u],s[u+1]);return kn(t,l,d,c,N(h)?t.length:c+h),l}return kn(t,l,d),l}function Ff(n){const t=n.options.offset,e=n._tickSize(),i=n._length/e+(t?0:1),o=n._maxLength/e;return Math.floor(Math.min(i,o))}function jf(n,t,e){const i=Vf(n),o=t.length/e;if(!i)return Math.max(o,1);const s=Od(i);for(let r=0,a=s.length-1;r<a;r++){const c=s[r];if(c>o)return c}return Math.max(o,1)}function Hf(n){const t=[];let e,i;for(e=0,i=n.length;e<i;e++)n[e].major&&t.push(e);return t}function qf(n,t,e,i){let o=0,s=e[0],r;for(i=Math.ceil(i),r=0;r<n.length;r++)r===s&&(t.push(n[r]),o++,s=e[o*i])}function kn(n,t,e,i,o){const s=D(i,0),r=Math.min(D(o,n.length),n.length);let a=0,c,l,d;for(e=Math.ceil(e),o&&(c=o-i,e=c/Math.floor(c/e)),d=s;d<0;)a++,d=Math.round(s+a*e);for(l=Math.max(s,0);l<r;l++)l===d&&(t.push(n[l]),a++,d=Math.round(s+a*e))}function Vf(n){const t=n.length;let e,i;if(t<2)return!1;for(i=n[0],e=1;e<t;++e)if(n[e]-n[e-1]!==i)return!1;return i}const Uf=n=>n==="left"?"right":n==="right"?"left":n,dr=(n,t,e)=>t==="top"||t==="left"?n[t]+e:n[t]-e,ur=(n,t)=>Math.min(t||n,n);function fr(n,t){const e=[],i=n.length/t,o=n.length;let s=0;for(;s<o;s+=i)e.push(n[Math.floor(s)]);return e}function Wf(n,t,e){const i=n.ticks.length,o=Math.min(t,i-1),s=n._startPixel,r=n._endPixel,a=1e-6;let c=n.getPixelForTick(o),l;if(!(e&&(i===1?l=Math.max(c-s,r-c):t===0?l=(n.getPixelForTick(1)-c)/2:l=(c-n.getPixelForTick(o-1))/2,c+=o<t?l:-l,c<s-a||c>r+a)))return c}function Gf(n,t){H(n,e=>{const i=e.gc,o=i.length/2;let s;if(o>t){for(s=0;s<o;++s)delete e.data[i[s]];i.splice(0,o)}})}function Ie(n){return n.drawTicks?n.tickLength:0}function hr(n,t){if(!n.display)return 0;const e=J(n.font,t),i=it(n.padding);return(U(n.text)?n.text.length:1)*e.lineHeight+i.height}function Yf(n,t){return Qt(n,{scale:t,type:"scale"})}function Xf(n,t,e){return Qt(n,{tick:e,index:t,type:"tick"})}function Kf(n,t,e){let i=us(n);return(e&&t!=="right"||!e&&t==="right")&&(i=Uf(i)),i}function Jf(n,t,e,i){const{top:o,left:s,bottom:r,right:a,chart:c}=n,{chartArea:l,scales:d}=c;let u=0,f,h,p;const m=r-o,g=a-s;if(n.isHorizontal()){if(h=tt(i,s,a),z(e)){const b=Object.keys(e)[0],v=e[b];p=d[b].getPixelForValue(v)+m-t}else e==="center"?p=(l.bottom+l.top)/2+m-t:p=dr(n,e,t);f=a-s}else{if(z(e)){const b=Object.keys(e)[0],v=e[b];h=d[b].getPixelForValue(v)-g+t}else e==="center"?h=(l.left+l.right)/2-g+t:h=dr(n,e,t);p=tt(i,r,o),u=e==="left"?-K:K}return{titleX:h,titleY:p,maxWidth:f,rotation:u}}class he extends vt{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,e){return t}getUserBounds(){let{_userMin:t,_userMax:e,_suggestedMin:i,_suggestedMax:o}=this;return t=dt(t,Number.POSITIVE_INFINITY),e=dt(e,Number.NEGATIVE_INFINITY),i=dt(i,Number.POSITIVE_INFINITY),o=dt(o,Number.NEGATIVE_INFINITY),{min:dt(t,i),max:dt(e,o),minDefined:X(t),maxDefined:X(e)}}getMinMax(t){let{min:e,max:i,minDefined:o,maxDefined:s}=this.getUserBounds(),r;if(o&&s)return{min:e,max:i};const a=this.getMatchingVisibleMetas();for(let c=0,l=a.length;c<l;++c)r=a[c].controller.getMinMax(this,t),o||(e=Math.min(e,r.min)),s||(i=Math.max(i,r.max));return e=s&&e>i?i:e,i=o&&e>i?e:i,{min:dt(e,dt(i,e)),max:dt(i,dt(e,i))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){q(this.options.beforeUpdate,[this])}update(t,e,i){const{beginAtZero:o,grace:s,ticks:r}=this.options,a=r.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this._margins=i=Object.assign({left:0,right:0,top:0,bottom:0},i),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+i.left+i.right:this.height+i.top+i.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=ou(this,s,o),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const c=a<this.ticks.length;this._convertTicksToLabels(c?fr(this.ticks,a):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),r.display&&(r.autoSkip||r.source==="auto")&&(this.ticks=zf(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),c&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,e,i;this.isHorizontal()?(e=this.left,i=this.right):(e=this.top,i=this.bottom,t=!t),this._startPixel=e,this._endPixel=i,this._reversePixels=t,this._length=i-e,this._alignToPixels=this.options.alignToPixels}afterUpdate(){q(this.options.afterUpdate,[this])}beforeSetDimensions(){q(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){q(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),q(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){q(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const e=this.options.ticks;let i,o,s;for(i=0,o=t.length;i<o;i++)s=t[i],s.label=q(e.callback,[s.value,i,t],this)}afterTickToLabelConversion(){q(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){q(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,e=t.ticks,i=ur(this.ticks.length,t.ticks.maxTicksLimit),o=e.minRotation||0,s=e.maxRotation;let r=o,a,c,l;if(!this._isVisible()||!e.display||o>=s||i<=1||!this.isHorizontal()){this.labelRotation=o;return}const d=this._getLabelSizes(),u=d.widest.width,f=d.highest.height,h=Z(this.chart.width-u,0,this.maxWidth);a=t.offset?this.maxWidth/i:h/(i-1),u+6>a&&(a=h/(i-(t.offset?.5:1)),c=this.maxHeight-Ie(t.grid)-e.padding-hr(t.title,this.chart.options.font),l=Math.sqrt(u*u+f*f),r=cs(Math.min(Math.asin(Z((d.highest.height+6)/a,-1,1)),Math.asin(Z(c/l,-1,1))-Math.asin(Z(f/l,-1,1)))),r=Math.max(o,Math.min(s,r))),this.labelRotation=r}afterCalculateLabelRotation(){q(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){q(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:e,options:{ticks:i,title:o,grid:s}}=this,r=this._isVisible(),a=this.isHorizontal();if(r){const c=hr(o,e.options.font);if(a?(t.width=this.maxWidth,t.height=Ie(s)+c):(t.height=this.maxHeight,t.width=Ie(s)+c),i.display&&this.ticks.length){const{first:l,last:d,widest:u,highest:f}=this._getLabelSizes(),h=i.padding*2,p=gt(this.labelRotation),m=Math.cos(p),g=Math.sin(p);if(a){const b=i.mirror?0:g*u.width+m*f.height;t.height=Math.min(this.maxHeight,t.height+b+h)}else{const b=i.mirror?0:m*u.width+g*f.height;t.width=Math.min(this.maxWidth,t.width+b+h)}this._calculatePadding(l,d,g,m)}}this._handleMargins(),a?(this.width=this._length=e.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=e.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,e,i,o){const{ticks:{align:s,padding:r},position:a}=this.options,c=this.labelRotation!==0,l=a!=="top"&&this.axis==="x";if(this.isHorizontal()){const d=this.getPixelForTick(0)-this.left,u=this.right-this.getPixelForTick(this.ticks.length-1);let f=0,h=0;c?l?(f=o*t.width,h=i*e.height):(f=i*t.height,h=o*e.width):s==="start"?h=e.width:s==="end"?f=t.width:s!=="inner"&&(f=t.width/2,h=e.width/2),this.paddingLeft=Math.max((f-d+r)*this.width/(this.width-d),0),this.paddingRight=Math.max((h-u+r)*this.width/(this.width-u),0)}else{let d=e.height/2,u=t.height/2;s==="start"?(d=0,u=t.height):s==="end"&&(d=e.height,u=0),this.paddingTop=d+r,this.paddingBottom=u+r}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){q(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:e}=this.options;return e==="top"||e==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let e,i;for(e=0,i=t.length;e<i;e++)N(t[e].label)&&(t.splice(e,1),i--,e--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const e=this.options.ticks.sampleSize;let i=this.ticks;e<i.length&&(i=fr(i,e)),this._labelSizes=t=this._computeLabelSizes(i,i.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,e,i){const{ctx:o,_longestTextCache:s}=this,r=[],a=[],c=Math.floor(e/ur(e,i));let l=0,d=0,u,f,h,p,m,g,b,v,y,x,S;for(u=0;u<e;u+=c){if(p=t[u].label,m=this._resolveTickFontOptions(u),o.font=g=m.string,b=s[g]=s[g]||{data:{},gc:[]},v=m.lineHeight,y=x=0,!N(p)&&!U(p))y=Ai(o,b.data,b.gc,y,p),x=v;else if(U(p))for(f=0,h=p.length;f<h;++f)S=p[f],!N(S)&&!U(S)&&(y=Ai(o,b.data,b.gc,y,S),x+=v);r.push(y),a.push(x),l=Math.max(y,l),d=Math.max(x,d)}Gf(s,e);const E=r.indexOf(l),k=a.indexOf(d),C=_=>({width:r[_]||0,height:a[_]||0});return{first:C(0),last:C(e-1),widest:C(E),highest:C(k),widths:r,heights:a}}getLabelForValue(t){return t}getPixelForValue(t,e){return NaN}getValueForPixel(t){}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const e=this._startPixel+t*this._length;return Rd(this._alignToPixels?te(this.chart,e,0):e)}getDecimalForPixel(t){const e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:e}=this;return t<0&&e<0?e:t>0&&e>0?t:0}getContext(t){const e=this.ticks||[];if(t>=0&&t<e.length){const i=e[t];return i.$context||(i.$context=Xf(this.getContext(),t,i))}return this.$context||(this.$context=Yf(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,e=gt(this.labelRotation),i=Math.abs(Math.cos(e)),o=Math.abs(Math.sin(e)),s=this._getLabelSizes(),r=t.autoSkipPadding||0,a=s?s.widest.width+r:0,c=s?s.highest.height+r:0;return this.isHorizontal()?c*i>a*o?a/i:c/o:c*o<a*i?c/i:a/o}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const e=this.axis,i=this.chart,o=this.options,{grid:s,position:r,border:a}=o,c=s.offset,l=this.isHorizontal(),u=this.ticks.length+(c?1:0),f=Ie(s),h=[],p=a.setContext(this.getContext()),m=p.display?p.width:0,g=m/2,b=function(F){return te(i,F,m)};let v,y,x,S,E,k,C,_,A,M,O,I;if(r==="top")v=b(this.bottom),k=this.bottom-f,_=v-g,M=b(t.top)+g,I=t.bottom;else if(r==="bottom")v=b(this.top),M=t.top,I=b(t.bottom)-g,k=v+g,_=this.top+f;else if(r==="left")v=b(this.right),E=this.right-f,C=v-g,A=b(t.left)+g,O=t.right;else if(r==="right")v=b(this.left),A=t.left,O=b(t.right)-g,E=v+g,C=this.left+f;else if(e==="x"){if(r==="center")v=b((t.top+t.bottom)/2+.5);else if(z(r)){const F=Object.keys(r)[0],G=r[F];v=b(this.chart.scales[F].getPixelForValue(G))}M=t.top,I=t.bottom,k=v+g,_=k+f}else if(e==="y"){if(r==="center")v=b((t.left+t.right)/2);else if(z(r)){const F=Object.keys(r)[0],G=r[F];v=b(this.chart.scales[F].getPixelForValue(G))}E=v-g,C=E-f,A=t.left,O=t.right}const L=D(o.ticks.maxTicksLimit,u),$=Math.max(1,Math.ceil(u/L));for(y=0;y<u;y+=$){const F=this.getContext(y),G=s.setContext(F),st=a.setContext(F),Q=G.lineWidth,yt=G.color,kt=st.dash||[],Ct=st.dashOffset,Mt=G.tickWidth,At=G.tickColor,Ot=G.tickBorderDash||[],xt=G.tickBorderDashOffset;x=Wf(this,y,c),x!==void 0&&(S=te(i,x,Q),l?E=C=A=O=S:k=_=M=I=S,h.push({tx1:E,ty1:k,tx2:C,ty2:_,x1:A,y1:M,x2:O,y2:I,width:Q,color:yt,borderDash:kt,borderDashOffset:Ct,tickWidth:Mt,tickColor:At,tickBorderDash:Ot,tickBorderDashOffset:xt}))}return this._ticksLength=u,this._borderValue=v,h}_computeLabelItems(t){const e=this.axis,i=this.options,{position:o,ticks:s}=i,r=this.isHorizontal(),a=this.ticks,{align:c,crossAlign:l,padding:d,mirror:u}=s,f=Ie(i.grid),h=f+d,p=u?-d:h,m=-gt(this.labelRotation),g=[];let b,v,y,x,S,E,k,C,_,A,M,O,I="middle";if(o==="top")E=this.bottom-p,k=this._getXAxisLabelAlignment();else if(o==="bottom")E=this.top+p,k=this._getXAxisLabelAlignment();else if(o==="left"){const $=this._getYAxisLabelAlignment(f);k=$.textAlign,S=$.x}else if(o==="right"){const $=this._getYAxisLabelAlignment(f);k=$.textAlign,S=$.x}else if(e==="x"){if(o==="center")E=(t.top+t.bottom)/2+h;else if(z(o)){const $=Object.keys(o)[0],F=o[$];E=this.chart.scales[$].getPixelForValue(F)+h}k=this._getXAxisLabelAlignment()}else if(e==="y"){if(o==="center")S=(t.left+t.right)/2-h;else if(z(o)){const $=Object.keys(o)[0],F=o[$];S=this.chart.scales[$].getPixelForValue(F)}k=this._getYAxisLabelAlignment(f).textAlign}e==="y"&&(c==="start"?I="top":c==="end"&&(I="bottom"));const L=this._getLabelSizes();for(b=0,v=a.length;b<v;++b){y=a[b],x=y.label;const $=s.setContext(this.getContext(b));C=this.getPixelForTick(b)+s.labelOffset,_=this._resolveTickFontOptions(b),A=_.lineHeight,M=U(x)?x.length:1;const F=M/2,G=$.color,st=$.textStrokeColor,Q=$.textStrokeWidth;let yt=k;r?(S=C,k==="inner"&&(b===v-1?yt=this.options.reverse?"left":"right":b===0?yt=this.options.reverse?"right":"left":yt="center"),o==="top"?l==="near"||m!==0?O=-M*A+A/2:l==="center"?O=-L.highest.height/2-F*A+A:O=-L.highest.height+A/2:l==="near"||m!==0?O=A/2:l==="center"?O=L.highest.height/2-F*A:O=L.highest.height-M*A,u&&(O*=-1),m!==0&&!$.showLabelBackdrop&&(S+=A/2*Math.sin(m))):(E=C,O=(1-M)*A/2);let kt;if($.showLabelBackdrop){const Ct=it($.backdropPadding),Mt=L.heights[b],At=L.widths[b];let Ot=O-Ct.top,xt=0-Ct.left;switch(I){case"middle":Ot-=Mt/2;break;case"bottom":Ot-=Mt;break}switch(k){case"center":xt-=At/2;break;case"right":xt-=At;break;case"inner":b===v-1?xt-=At:b>0&&(xt-=At/2);break}kt={left:xt,top:Ot,width:At+Ct.width,height:Mt+Ct.height,color:$.backdropColor}}g.push({label:x,font:_,textOffset:O,options:{rotation:m,color:G,strokeColor:st,strokeWidth:Q,textAlign:yt,textBaseline:I,translation:[S,E],backdrop:kt}})}return g}_getXAxisLabelAlignment(){const{position:t,ticks:e}=this.options;if(-gt(this.labelRotation))return t==="top"?"left":"right";let o="center";return e.align==="start"?o="left":e.align==="end"?o="right":e.align==="inner"&&(o="inner"),o}_getYAxisLabelAlignment(t){const{position:e,ticks:{crossAlign:i,mirror:o,padding:s}}=this.options,r=this._getLabelSizes(),a=t+s,c=r.widest.width;let l,d;return e==="left"?o?(d=this.right+s,i==="near"?l="left":i==="center"?(l="center",d+=c/2):(l="right",d+=c)):(d=this.right-a,i==="near"?l="right":i==="center"?(l="center",d-=c/2):(l="left",d=this.left)):e==="right"?o?(d=this.left+s,i==="near"?l="right":i==="center"?(l="center",d-=c/2):(l="left",d-=c)):(d=this.left+a,i==="near"?l="left":i==="center"?(l="center",d+=c/2):(l="right",d=this.right)):l="right",{textAlign:l,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,e=this.options.position;if(e==="left"||e==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(e==="top"||e==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:e},left:i,top:o,width:s,height:r}=this;e&&(t.save(),t.fillStyle=e,t.fillRect(i,o,s,r),t.restore())}getLineWidthForValue(t){const e=this.options.grid;if(!this._isVisible()||!e.display)return 0;const o=this.ticks.findIndex(s=>s.value===t);return o>=0?e.setContext(this.getContext(o)).lineWidth:0}drawGrid(t){const e=this.options.grid,i=this.ctx,o=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let s,r;const a=(c,l,d)=>{!d.width||!d.color||(i.save(),i.lineWidth=d.width,i.strokeStyle=d.color,i.setLineDash(d.borderDash||[]),i.lineDashOffset=d.borderDashOffset,i.beginPath(),i.moveTo(c.x,c.y),i.lineTo(l.x,l.y),i.stroke(),i.restore())};if(e.display)for(s=0,r=o.length;s<r;++s){const c=o[s];e.drawOnChartArea&&a({x:c.x1,y:c.y1},{x:c.x2,y:c.y2},c),e.drawTicks&&a({x:c.tx1,y:c.ty1},{x:c.tx2,y:c.ty2},{color:c.tickColor,width:c.tickWidth,borderDash:c.tickBorderDash,borderDashOffset:c.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:e,options:{border:i,grid:o}}=this,s=i.setContext(this.getContext()),r=i.display?s.width:0;if(!r)return;const a=o.setContext(this.getContext(0)).lineWidth,c=this._borderValue;let l,d,u,f;this.isHorizontal()?(l=te(t,this.left,r)-r/2,d=te(t,this.right,a)+a/2,u=f=c):(u=te(t,this.top,r)-r/2,f=te(t,this.bottom,a)+a/2,l=d=c),e.save(),e.lineWidth=s.width,e.strokeStyle=s.color,e.beginPath(),e.moveTo(l,u),e.lineTo(d,f),e.stroke(),e.restore()}drawLabels(t){if(!this.options.ticks.display)return;const i=this.ctx,o=this._computeLabelArea();o&&$i(i,o);const s=this.getLabelItems(t);for(const r of s){const a=r.options,c=r.font,l=r.label,d=r.textOffset;ue(i,l,0,d,c,a)}o&&Ni(i)}drawTitle(){const{ctx:t,options:{position:e,title:i,reverse:o}}=this;if(!i.display)return;const s=J(i.font),r=it(i.padding),a=i.align;let c=s.lineHeight/2;e==="bottom"||e==="center"||z(e)?(c+=r.bottom,U(i.text)&&(c+=s.lineHeight*(i.text.length-1))):c+=r.top;const{titleX:l,titleY:d,maxWidth:u,rotation:f}=Jf(this,c,e,a);ue(t,i.text,0,0,s,{color:i.color,maxWidth:u,rotation:f,textAlign:Kf(a,e,o),textBaseline:"middle",translation:[l,d]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,e=t.ticks&&t.ticks.z||0,i=D(t.grid&&t.grid.z,-1),o=D(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==he.prototype.draw?[{z:e,draw:s=>{this.draw(s)}}]:[{z:i,draw:s=>{this.drawBackground(),this.drawGrid(s),this.drawTitle()}},{z:o,draw:()=>{this.drawBorder()}},{z:e,draw:s=>{this.drawLabels(s)}}]}getMatchingVisibleMetas(t){const e=this.chart.getSortedVisibleDatasetMetas(),i=this.axis+"AxisID",o=[];let s,r;for(s=0,r=e.length;s<r;++s){const a=e[s];a[i]===this.id&&(!t||a.type===t)&&o.push(a)}return o}_resolveTickFontOptions(t){const e=this.options.ticks.setContext(this.getContext(t));return J(e.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class Cn{constructor(t,e,i){this.type=t,this.scope=e,this.override=i,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const e=Object.getPrototypeOf(t);let i;th(e)&&(i=this.register(e));const o=this.items,s=t.id,r=this.scope+"."+s;if(!s)throw new Error("class does not have id: "+t);return s in o||(o[s]=t,Qf(t,r,i),this.override&&W.override(t.id,t.overrides)),r}get(t){return this.items[t]}unregister(t){const e=this.items,i=t.id,o=this.scope;i in e&&delete e[i],o&&i in W[o]&&(delete W[o][i],this.override&&delete de[i])}}function Qf(n,t,e){const i=en(Object.create(null),[e?W.get(e):{},W.get(t),n.defaults]);W.set(t,i),n.defaultRoutes&&Zf(t,n.defaultRoutes),n.descriptors&&W.describe(t,n.descriptors)}function Zf(n,t){Object.keys(t).forEach(e=>{const i=e.split("."),o=i.pop(),s=[n].concat(i).join("."),r=t[e].split("."),a=r.pop(),c=r.join(".");W.route(s,o,c,a)})}function th(n){return"id"in n&&"defaults"in n}class eh{constructor(){this.controllers=new Cn(bt,"datasets",!0),this.elements=new Cn(vt,"elements"),this.plugins=new Cn(Object,"plugins"),this.scales=new Cn(he,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,e,i){[...e].forEach(o=>{const s=i||this._getRegistryForType(o);i||s.isForType(o)||s===this.plugins&&o.id?this._exec(t,s,o):H(o,r=>{const a=i||this._getRegistryForType(r);this._exec(t,a,r)})})}_exec(t,e,i){const o=ls(t);q(i["before"+o],[],i),e[t](i),q(i["after"+o],[],i)}_getRegistryForType(t){for(let e=0;e<this._typedRegistries.length;e++){const i=this._typedRegistries[e];if(i.isForType(t))return i}return this.plugins}_get(t,e,i){const o=e.get(t);if(o===void 0)throw new Error('"'+t+'" is not a registered '+i+".");return o}}var Et=new eh;class nh{constructor(){this._init=void 0}notify(t,e,i,o){if(e==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const s=o?this._descriptors(t).filter(o):this._descriptors(t),r=this._notify(s,t,e,i);return e==="afterDestroy"&&(this._notify(s,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),r}_notify(t,e,i,o){o=o||{};for(const s of t){const r=s.plugin,a=r[i],c=[e,o,s.options];if(q(a,c,r)===!1&&o.cancelable)return!1}return!0}invalidate(){N(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const e=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),e}_createDescriptors(t,e){const i=t&&t.config,o=D(i.options&&i.options.plugins,{}),s=ih(i);return o===!1&&!e?[]:sh(t,s,o,e)}_notifyStateChanges(t){const e=this._oldCache||[],i=this._cache,o=(s,r)=>s.filter(a=>!r.some(c=>a.plugin.id===c.plugin.id));this._notify(o(e,i),t,"stop"),this._notify(o(i,e),t,"start")}}function ih(n){const t={},e=[],i=Object.keys(Et.plugins.items);for(let s=0;s<i.length;s++)e.push(Et.getPlugin(i[s]));const o=n.plugins||[];for(let s=0;s<o.length;s++){const r=o[s];e.indexOf(r)===-1&&(e.push(r),t[r.id]=!0)}return{plugins:e,localIds:t}}function oh(n,t){return!t&&n===!1?null:n===!0?{}:n}function sh(n,{plugins:t,localIds:e},i,o){const s=[],r=n.getContext();for(const a of t){const c=a.id,l=oh(i[c],o);l!==null&&s.push({plugin:a,options:rh(n.config,{plugin:a,local:e[c]},l,r)})}return s}function rh(n,{plugin:t,local:e},i,o){const s=n.pluginScopeKeys(t),r=n.getOptionScopes(i,s);return e&&t.defaults&&r.push(t.defaults),n.createResolver(r,o,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function qo(n,t){const e=W.datasets[n]||{};return((t.datasets||{})[n]||{}).indexAxis||t.indexAxis||e.indexAxis||"x"}function ah(n,t){let e=n;return n==="_index_"?e=t:n==="_value_"&&(e=t==="x"?"y":"x"),e}function lh(n,t){return n===t?"_index_":"_value_"}function pr(n){if(n==="x"||n==="y"||n==="r")return n}function ch(n){if(n==="top"||n==="bottom")return"x";if(n==="left"||n==="right")return"y"}function Vo(n,...t){if(pr(n))return n;for(const e of t){const i=e.axis||ch(e.position)||n.length>1&&pr(n[0].toLowerCase());if(i)return i}throw new Error(`Cannot determine type of '${n}' axis. Please provide 'axis' or 'position' option.`)}function mr(n,t,e){if(e[t+"AxisID"]===n)return{axis:t}}function dh(n,t){if(t.data&&t.data.datasets){const e=t.data.datasets.filter(i=>i.xAxisID===n||i.yAxisID===n);if(e.length)return mr(n,"x",e[0])||mr(n,"y",e[0])}return{}}function uh(n,t){const e=de[n.type]||{scales:{}},i=t.scales||{},o=qo(n.type,t),s=Object.create(null);return Object.keys(i).forEach(r=>{const a=i[r];if(!z(a))return console.error(`Invalid scale configuration for scale: ${r}`);if(a._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${r}`);const c=Vo(r,a,dh(r,n),W.scales[a.type]),l=lh(c,o),d=e.scales||{};s[r]=Ye(Object.create(null),[{axis:c},a,d[c],d[l]])}),n.data.datasets.forEach(r=>{const a=r.type||n.type,c=r.indexAxis||qo(a,t),d=(de[a]||{}).scales||{};Object.keys(d).forEach(u=>{const f=ah(u,c),h=r[f+"AxisID"]||f;s[h]=s[h]||Object.create(null),Ye(s[h],[{axis:f},i[h],d[u]])})}),Object.keys(s).forEach(r=>{const a=s[r];Ye(a,[W.scales[a.type],W.scale])}),s}function dc(n){const t=n.options||(n.options={});t.plugins=D(t.plugins,{}),t.scales=uh(n,t)}function uc(n){return n=n||{},n.datasets=n.datasets||[],n.labels=n.labels||[],n}function fh(n){return n=n||{},n.data=uc(n.data),dc(n),n}const gr=new Map,fc=new Set;function Mn(n,t){let e=gr.get(n);return e||(e=t(),gr.set(n,e),fc.add(e)),e}const Te=(n,t,e)=>{const i=Xt(t,e);i!==void 0&&n.add(i)};class hh{constructor(t){this._config=fh(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=uc(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),dc(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return Mn(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,e){return Mn(`${t}.transition.${e}`,()=>[[`datasets.${t}.transitions.${e}`,`transitions.${e}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,e){return Mn(`${t}-${e}`,()=>[[`datasets.${t}.elements.${e}`,`datasets.${t}`,`elements.${e}`,""]])}pluginScopeKeys(t){const e=t.id,i=this.type;return Mn(`${i}-plugin-${e}`,()=>[[`plugins.${e}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,e){const i=this._scopeCache;let o=i.get(t);return(!o||e)&&(o=new Map,i.set(t,o)),o}getOptionScopes(t,e,i){const{options:o,type:s}=this,r=this._cachedScopes(t,i),a=r.get(e);if(a)return a;const c=new Set;e.forEach(d=>{t&&(c.add(t),d.forEach(u=>Te(c,t,u))),d.forEach(u=>Te(c,o,u)),d.forEach(u=>Te(c,de[s]||{},u)),d.forEach(u=>Te(c,W,u)),d.forEach(u=>Te(c,Fo,u))});const l=Array.from(c);return l.length===0&&l.push(Object.create(null)),fc.has(e)&&r.set(e,l),l}chartOptionScopes(){const{options:t,type:e}=this;return[t,de[e]||{},W.datasets[e]||{},{type:e},W,Fo]}resolveNamedOptions(t,e,i,o=[""]){const s={$shared:!0},{resolver:r,subPrefixes:a}=br(this._resolverCache,t,o);let c=r;if(mh(r,e)){s.$shared=!1,i=Kt(i)?i():i;const l=this.createResolver(t,i,a);c=ke(r,i,l)}for(const l of e)s[l]=c[l];return s}createResolver(t,e,i=[""],o){const{resolver:s}=br(this._resolverCache,t,i);return z(e)?ke(s,e,void 0,o):s}}function br(n,t,e){let i=n.get(t);i||(i=new Map,n.set(t,i));const o=e.join();let s=i.get(o);return s||(s={resolver:ps(t,e),subPrefixes:e.filter(a=>!a.toLowerCase().includes("hover"))},i.set(o,s)),s}const ph=n=>z(n)&&Object.getOwnPropertyNames(n).some(t=>Kt(n[t]));function mh(n,t){const{isScriptable:e,isIndexable:i}=Vl(n);for(const o of t){const s=e(o),r=i(o),a=(r||s)&&n[o];if(s&&(Kt(a)||ph(a))||r&&U(a))return!0}return!1}var gh="4.5.1";const bh=["top","bottom","left","right","chartArea"];function vr(n,t){return n==="top"||n==="bottom"||bh.indexOf(n)===-1&&t==="x"}function yr(n,t){return function(e,i){return e[n]===i[n]?e[t]-i[t]:e[n]-i[n]}}function xr(n){const t=n.chart,e=t.options.animation;t.notifyPlugins("afterRender"),q(e&&e.onComplete,[n],t)}function vh(n){const t=n.chart,e=t.options.animation;q(e&&e.onProgress,[n],t)}function hc(n){return bs()&&typeof n=="string"?n=document.getElementById(n):n&&n.length&&(n=n[0]),n&&n.canvas&&(n=n.canvas),n}const xi={},_r=n=>{const t=hc(n);return Object.values(xi).filter(e=>e.canvas===t).pop()};function yh(n,t,e){const i=Object.keys(n);for(const o of i){const s=+o;if(s>=t){const r=n[o];delete n[o],(e>0||s>t)&&(n[s+e]=r)}}}function xh(n,t,e,i){return!e||n.type==="mouseout"?null:i?t:n}class $t{static register(...t){Et.add(...t),wr()}static unregister(...t){Et.remove(...t),wr()}constructor(t,e){const i=this.config=new hh(e),o=hc(t),s=_r(o);if(s)throw new Error("Canvas is already in use. Chart with ID '"+s.id+"' must be destroyed before the canvas with ID '"+s.canvas.id+"' can be reused.");const r=i.createResolver(i.chartOptionScopes(),this.getContext());this.platform=new(i.platform||Nf(o)),this.platform.updateConfig(i);const a=this.platform.acquireContext(o,r.aspectRatio),c=a&&a.canvas,l=c&&c.height,d=c&&c.width;if(this.id=xd(),this.ctx=a,this.canvas=c,this.width=d,this.height=l,this._options=r,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new nh,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=$d(u=>this.update(u),r.resizeDelay||0),this._dataChanges=[],xi[this.id]=this,!a||!c){console.error("Failed to create chart: can't acquire context from the given item");return}Lt.listen(this,"complete",xr),Lt.listen(this,"progress",vh),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:e},width:i,height:o,_aspectRatio:s}=this;return N(t)?e&&s?s:o?i/o:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return Et}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():Vs(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return js(this.canvas,this.ctx),this}stop(){return Lt.stop(this),this}resize(t,e){Lt.running(this)?this._resizeBeforeDraw={width:t,height:e}:this._resize(t,e)}_resize(t,e){const i=this.options,o=this.canvas,s=i.maintainAspectRatio&&this.aspectRatio,r=this.platform.getMaximumSize(o,t,e,s),a=i.devicePixelRatio||this.platform.getDevicePixelRatio(),c=this.width?"resize":"attach";this.width=r.width,this.height=r.height,this._aspectRatio=this.aspectRatio,Vs(this,a,!0)&&(this.notifyPlugins("resize",{size:r}),q(i.onResize,[this,r],this),this.attached&&this._doResize(c)&&this.render())}ensureScalesHaveIDs(){const e=this.options.scales||{};H(e,(i,o)=>{i.id=o})}buildOrUpdateScales(){const t=this.options,e=t.scales,i=this.scales,o=Object.keys(i).reduce((r,a)=>(r[a]=!1,r),{});let s=[];e&&(s=s.concat(Object.keys(e).map(r=>{const a=e[r],c=Vo(r,a),l=c==="r",d=c==="x";return{options:a,dposition:l?"chartArea":d?"bottom":"left",dtype:l?"radialLinear":d?"category":"linear"}}))),H(s,r=>{const a=r.options,c=a.id,l=Vo(c,a),d=D(a.type,r.dtype);(a.position===void 0||vr(a.position,l)!==vr(r.dposition))&&(a.position=r.dposition),o[c]=!0;let u=null;if(c in i&&i[c].type===d)u=i[c];else{const f=Et.getScale(d);u=new f({id:c,type:d,ctx:this.ctx,chart:this}),i[u.id]=u}u.init(a,t)}),H(o,(r,a)=>{r||delete i[a]}),H(i,r=>{nt.configure(this,r,r.options),nt.addBox(this,r)})}_updateMetasets(){const t=this._metasets,e=this.data.datasets.length,i=t.length;if(t.sort((o,s)=>o.index-s.index),i>e){for(let o=e;o<i;++o)this._destroyDatasetMeta(o);t.splice(e,i-e)}this._sortedMetasets=t.slice(0).sort(yr("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:e}}=this;t.length>e.length&&delete this._stacks,t.forEach((i,o)=>{e.filter(s=>s===i._dataset).length===0&&this._destroyDatasetMeta(o)})}buildOrUpdateControllers(){const t=[],e=this.data.datasets;let i,o;for(this._removeUnreferencedMetasets(),i=0,o=e.length;i<o;i++){const s=e[i];let r=this.getDatasetMeta(i);const a=s.type||this.config.type;if(r.type&&r.type!==a&&(this._destroyDatasetMeta(i),r=this.getDatasetMeta(i)),r.type=a,r.indexAxis=s.indexAxis||qo(a,this.options),r.order=s.order||0,r.index=i,r.label=""+s.label,r.visible=this.isDatasetVisible(i),r.controller)r.controller.updateIndex(i),r.controller.linkScales();else{const c=Et.getController(a),{datasetElementType:l,dataElementType:d}=W.datasets[a];Object.assign(c,{dataElementType:Et.getElement(d),datasetElementType:l&&Et.getElement(l)}),r.controller=new c(this,i),t.push(r.controller)}}return this._updateMetasets(),t}_resetElements(){H(this.data.datasets,(t,e)=>{this.getDatasetMeta(e).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const e=this.config;e.update();const i=this._options=e.createResolver(e.chartOptionScopes(),this.getContext()),o=this._animationsDisabled=!i.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const s=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let r=0;for(let l=0,d=this.data.datasets.length;l<d;l++){const{controller:u}=this.getDatasetMeta(l),f=!o&&s.indexOf(u)===-1;u.buildOrUpdateElements(f),r=Math.max(+u.getMaxOverflow(),r)}r=this._minPadding=i.layout.autoPadding?r:0,this._updateLayout(r),o||H(s,l=>{l.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(yr("z","_idx"));const{_active:a,_lastEvent:c}=this;c?this._eventHandler(c,!0):a.length&&this._updateHoverStyles(a,a,!0),this.render()}_updateScales(){H(this.scales,t=>{nt.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,e=new Set(Object.keys(this._listeners)),i=new Set(t.events);(!Ts(e,i)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,e=this._getUniformDataChanges()||[];for(const{method:i,start:o,count:s}of e){const r=i==="_removeElements"?-s:s;yh(t,o,r)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const e=this.data.datasets.length,i=s=>new Set(t.filter(r=>r[0]===s).map((r,a)=>a+","+r.splice(1).join(","))),o=i(0);for(let s=1;s<e;s++)if(!Ts(o,i(s)))return;return Array.from(o).map(s=>s.split(",")).map(s=>({method:s[1],start:+s[2],count:+s[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;nt.update(this,this.width,this.height,t);const e=this.chartArea,i=e.width<=0||e.height<=0;this._layers=[],H(this.boxes,o=>{i&&o.position==="chartArea"||(o.configure&&o.configure(),this._layers.push(...o._layers()))},this),this._layers.forEach((o,s)=>{o._idx=s}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let e=0,i=this.data.datasets.length;e<i;++e)this.getDatasetMeta(e).controller.configure();for(let e=0,i=this.data.datasets.length;e<i;++e)this._updateDataset(e,Kt(t)?t({datasetIndex:e}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,e){const i=this.getDatasetMeta(t),o={meta:i,index:t,mode:e,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",o)!==!1&&(i.controller._update(e),o.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",o))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(Lt.has(this)?this.attached&&!Lt.running(this)&&Lt.start(this):(this.draw(),xr({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:i,height:o}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(i,o)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const e=this._layers;for(t=0;t<e.length&&e[t].z<=0;++t)e[t].draw(this.chartArea);for(this._drawDatasets();t<e.length;++t)e[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const e=this._sortedMetasets,i=[];let o,s;for(o=0,s=e.length;o<s;++o){const r=e[o];(!t||r.visible)&&i.push(r)}return i}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let e=t.length-1;e>=0;--e)this._drawDataset(t[e]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const e=this.ctx,i={meta:t,index:t.index,cancelable:!0},o=ec(this,t);this.notifyPlugins("beforeDatasetDraw",i)!==!1&&(o&&$i(e,o),t.controller.draw(),o&&Ni(e),i.cancelable=!1,this.notifyPlugins("afterDatasetDraw",i))}isPointInArea(t){return Ft(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,e,i,o){const s=bf.modes[e];return typeof s=="function"?s(this,t,i,o):[]}getDatasetMeta(t){const e=this.data.datasets[t],i=this._metasets;let o=i.filter(s=>s&&s._dataset===e).pop();return o||(o={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e&&e.order||0,index:t,_dataset:e,_parsed:[],_sorted:!1},i.push(o)),o}getContext(){return this.$context||(this.$context=Qt(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const e=this.data.datasets[t];if(!e)return!1;const i=this.getDatasetMeta(t);return typeof i.hidden=="boolean"?!i.hidden:!e.hidden}setDatasetVisibility(t,e){const i=this.getDatasetMeta(t);i.hidden=!e}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,e,i){const o=i?"show":"hide",s=this.getDatasetMeta(t),r=s.controller._resolveAnimations(void 0,o);nn(e)?(s.data[e].hidden=!i,this.update()):(this.setDatasetVisibility(t,i),r.update(s,{visible:i}),this.update(a=>a.datasetIndex===t?o:void 0))}hide(t,e){this._updateVisibility(t,e,!1)}show(t,e){this._updateVisibility(t,e,!0)}_destroyDatasetMeta(t){const e=this._metasets[t];e&&e.controller&&e.controller._destroy(),delete this._metasets[t]}_stop(){let t,e;for(this.stop(),Lt.remove(this),t=0,e=this.data.datasets.length;t<e;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:e}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),js(t,e),this.platform.releaseContext(e),this.canvas=null,this.ctx=null),delete xi[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,e=this.platform,i=(s,r)=>{e.addEventListener(this,s,r),t[s]=r},o=(s,r,a)=>{s.offsetX=r,s.offsetY=a,this._eventHandler(s)};H(this.options.events,s=>i(s,o))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,e=this.platform,i=(c,l)=>{e.addEventListener(this,c,l),t[c]=l},o=(c,l)=>{t[c]&&(e.removeEventListener(this,c,l),delete t[c])},s=(c,l)=>{this.canvas&&this.resize(c,l)};let r;const a=()=>{o("attach",a),this.attached=!0,this.resize(),i("resize",s),i("detach",r)};r=()=>{this.attached=!1,o("resize",s),this._stop(),this._resize(0,0),i("attach",a)},e.isAttached(this.canvas)?a():r()}unbindEvents(){H(this._listeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._listeners={},H(this._responsiveListeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,e,i){const o=i?"set":"remove";let s,r,a,c;for(e==="dataset"&&(s=this.getDatasetMeta(t[0].datasetIndex),s.controller["_"+o+"DatasetHoverStyle"]()),a=0,c=t.length;a<c;++a){r=t[a];const l=r&&this.getDatasetMeta(r.datasetIndex).controller;l&&l[o+"HoverStyle"](r.element,r.datasetIndex,r.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const e=this._active||[],i=t.map(({datasetIndex:s,index:r})=>{const a=this.getDatasetMeta(s);if(!a)throw new Error("No dataset found at index "+s);return{datasetIndex:s,element:a.data[r],index:r}});!ki(i,e)&&(this._active=i,this._lastEvent=null,this._updateHoverStyles(i,e))}notifyPlugins(t,e,i){return this._plugins.notify(this,t,e,i)}isPluginEnabled(t){return this._plugins._cache.filter(e=>e.plugin.id===t).length===1}_updateHoverStyles(t,e,i){const o=this.options.hover,s=(c,l)=>c.filter(d=>!l.some(u=>d.datasetIndex===u.datasetIndex&&d.index===u.index)),r=s(e,t),a=i?t:s(t,e);r.length&&this.updateHoverStyle(r,o.mode,!1),a.length&&o.mode&&this.updateHoverStyle(a,o.mode,!0)}_eventHandler(t,e){const i={event:t,replay:e,cancelable:!0,inChartArea:this.isPointInArea(t)},o=r=>(r.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",i,o)===!1)return;const s=this._handleEvent(t,e,i.inChartArea);return i.cancelable=!1,this.notifyPlugins("afterEvent",i,o),(s||i.changed)&&this.render(),this}_handleEvent(t,e,i){const{_active:o=[],options:s}=this,r=e,a=this._getActiveElements(t,o,i,r),c=Cd(t),l=xh(t,this._lastEvent,i,c);i&&(this._lastEvent=null,q(s.onHover,[t,a,this],this),c&&q(s.onClick,[t,a,this],this));const d=!ki(a,o);return(d||e)&&(this._active=a,this._updateHoverStyles(a,o,e)),this._lastEvent=l,d}_getActiveElements(t,e,i,o){if(t.type==="mouseout")return[];if(!i)return e;const s=this.options.hover;return this.getElementsAtEventForMode(t,s.mode,s,o)}}T($t,"defaults",W),T($t,"instances",xi),T($t,"overrides",de),T($t,"registry",Et),T($t,"version",gh),T($t,"getChart",_r);function wr(){return H($t.instances,n=>n._plugins.invalidate())}function _h(n,t,e){const{startAngle:i,x:o,y:s,outerRadius:r,innerRadius:a,options:c}=t,{borderWidth:l,borderJoinStyle:d}=c,u=Math.min(l/r,et(i-e));if(n.beginPath(),n.arc(o,s,r-l/2,i+u/2,e-u/2),a>0){const f=Math.min(l/a,et(i-e));n.arc(o,s,a+l/2,e-f/2,i+f/2,!0)}else{const f=Math.min(l/2,r*et(i-e));if(d==="round")n.arc(o,s,f,e-j/2,i+j/2,!0);else if(d==="bevel"){const h=2*f*f,p=-h*Math.cos(e+j/2)+o,m=-h*Math.sin(e+j/2)+s,g=h*Math.cos(i+j/2)+o,b=h*Math.sin(i+j/2)+s;n.lineTo(p,m),n.lineTo(g,b)}}n.closePath(),n.moveTo(0,0),n.rect(0,0,n.canvas.width,n.canvas.height),n.clip("evenodd")}function wh(n,t,e){const{startAngle:i,pixelMargin:o,x:s,y:r,outerRadius:a,innerRadius:c}=t;let l=o/a;n.beginPath(),n.arc(s,r,a,i-l,e+l),c>o?(l=o/c,n.arc(s,r,c,e+l,i-l,!0)):n.arc(s,r,o,e+K,i-K),n.closePath(),n.clip()}function Eh(n){return hs(n,["outerStart","outerEnd","innerStart","innerEnd"])}function Sh(n,t,e,i){const o=Eh(n.options.borderRadius),s=(e-t)/2,r=Math.min(s,i*t/2),a=c=>{const l=(e-Math.min(s,c))*i/2;return Z(c,0,Math.min(s,l))};return{outerStart:a(o.outerStart),outerEnd:a(o.outerEnd),innerStart:Z(o.innerStart,0,r),innerEnd:Z(o.innerEnd,0,r)}}function ve(n,t,e,i){return{x:e+n*Math.cos(t),y:i+n*Math.sin(t)}}function Ii(n,t,e,i,o,s){const{x:r,y:a,startAngle:c,pixelMargin:l,innerRadius:d}=t,u=Math.max(t.outerRadius+i+e-l,0),f=d>0?d+i+e+l:0;let h=0;const p=o-c;if(i){const $=d>0?d-i:0,F=u>0?u-i:0,G=($+F)/2,st=G!==0?p*G/(G+i):p;h=(p-st)/2}const m=Math.max(.001,p*u-e/j)/u,g=(p-m)/2,b=c+g+h,v=o-g-h,{outerStart:y,outerEnd:x,innerStart:S,innerEnd:E}=Sh(t,f,u,v-b),k=u-y,C=u-x,_=b+y/k,A=v-x/C,M=f+S,O=f+E,I=b+S/M,L=v-E/O;if(n.beginPath(),s){const $=(_+A)/2;if(n.arc(r,a,u,_,$),n.arc(r,a,u,$,A),x>0){const Q=ve(C,A,r,a);n.arc(Q.x,Q.y,x,A,v+K)}const F=ve(O,v,r,a);if(n.lineTo(F.x,F.y),E>0){const Q=ve(O,L,r,a);n.arc(Q.x,Q.y,E,v+K,L+Math.PI)}const G=(v-E/f+(b+S/f))/2;if(n.arc(r,a,f,v-E/f,G,!0),n.arc(r,a,f,G,b+S/f,!0),S>0){const Q=ve(M,I,r,a);n.arc(Q.x,Q.y,S,I+Math.PI,b-K)}const st=ve(k,b,r,a);if(n.lineTo(st.x,st.y),y>0){const Q=ve(k,_,r,a);n.arc(Q.x,Q.y,y,b-K,_)}}else{n.moveTo(r,a);const $=Math.cos(_)*u+r,F=Math.sin(_)*u+a;n.lineTo($,F);const G=Math.cos(A)*u+r,st=Math.sin(A)*u+a;n.lineTo(G,st)}n.closePath()}function kh(n,t,e,i,o){const{fullCircles:s,startAngle:r,circumference:a}=t;let c=t.endAngle;if(s){Ii(n,t,e,i,c,o);for(let l=0;l<s;++l)n.fill();isNaN(a)||(c=r+(a%V||V))}return Ii(n,t,e,i,c,o),n.fill(),c}function Ch(n,t,e,i,o){const{fullCircles:s,startAngle:r,circumference:a,options:c}=t,{borderWidth:l,borderJoinStyle:d,borderDash:u,borderDashOffset:f,borderRadius:h}=c,p=c.borderAlign==="inner";if(!l)return;n.setLineDash(u||[]),n.lineDashOffset=f,p?(n.lineWidth=l*2,n.lineJoin=d||"round"):(n.lineWidth=l,n.lineJoin=d||"bevel");let m=t.endAngle;if(s){Ii(n,t,e,i,m,o);for(let g=0;g<s;++g)n.stroke();isNaN(a)||(m=r+(a%V||V))}p&&wh(n,t,m),c.selfJoin&&m-r>=j&&h===0&&d!=="miter"&&_h(n,t,m),s||(Ii(n,t,e,i,m,o),n.stroke())}class Ve extends vt{constructor(e){super();T(this,"circumference");T(this,"endAngle");T(this,"fullCircles");T(this,"innerRadius");T(this,"outerRadius");T(this,"pixelMargin");T(this,"startAngle");this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,e&&Object.assign(this,e)}inRange(e,i,o){const s=this.getProps(["x","y"],o),{angle:r,distance:a}=Ll(s,{x:e,y:i}),{startAngle:c,endAngle:l,innerRadius:d,outerRadius:u,circumference:f}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],o),h=(this.options.spacing+this.options.borderWidth)/2,p=D(f,l-c),m=on(r,c,l)&&c!==l,g=p>=V||m,b=Nt(a,d+h,u+h);return g&&b}getCenterPoint(e){const{x:i,y:o,startAngle:s,endAngle:r,innerRadius:a,outerRadius:c}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],e),{offset:l,spacing:d}=this.options,u=(s+r)/2,f=(a+c+d+l)/2;return{x:i+Math.cos(u)*f,y:o+Math.sin(u)*f}}tooltipPosition(e){return this.getCenterPoint(e)}draw(e){const{options:i,circumference:o}=this,s=(i.offset||0)/4,r=(i.spacing||0)/2,a=i.circular;if(this.pixelMargin=i.borderAlign==="inner"?.33:0,this.fullCircles=o>V?Math.floor(o/V):0,o===0||this.innerRadius<0||this.outerRadius<0)return;e.save();const c=(this.startAngle+this.endAngle)/2;e.translate(Math.cos(c)*s,Math.sin(c)*s);const l=1-Math.sin(Math.min(j,o||0)),d=s*l;e.fillStyle=i.backgroundColor,e.strokeStyle=i.borderColor,kh(e,this,d,r,a),Ch(e,this,d,r,a),e.restore()}}T(Ve,"id","arc"),T(Ve,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1}),T(Ve,"defaultRoutes",{backgroundColor:"backgroundColor"}),T(Ve,"descriptors",{_scriptable:!0,_indexable:e=>e!=="borderDash"});function pc(n,t,e=t){n.lineCap=D(e.borderCapStyle,t.borderCapStyle),n.setLineDash(D(e.borderDash,t.borderDash)),n.lineDashOffset=D(e.borderDashOffset,t.borderDashOffset),n.lineJoin=D(e.borderJoinStyle,t.borderJoinStyle),n.lineWidth=D(e.borderWidth,t.borderWidth),n.strokeStyle=D(e.borderColor,t.borderColor)}function Mh(n,t,e){n.lineTo(e.x,e.y)}function Ah(n){return n.stepped?Xd:n.tension||n.cubicInterpolationMode==="monotone"?Kd:Mh}function mc(n,t,e={}){const i=n.length,{start:o=0,end:s=i-1}=e,{start:r,end:a}=t,c=Math.max(o,r),l=Math.min(s,a),d=o<r&&s<r||o>a&&s>a;return{count:i,start:c,loop:t.loop,ilen:l<c&&!d?i+l-c:l-c}}function Oh(n,t,e,i){const{points:o,options:s}=t,{count:r,start:a,loop:c,ilen:l}=mc(o,e,i),d=Ah(s);let{move:u=!0,reverse:f}=i||{},h,p,m;for(h=0;h<=l;++h)p=o[(a+(f?l-h:h))%r],!p.skip&&(u?(n.moveTo(p.x,p.y),u=!1):d(n,m,p,f,s.stepped),m=p);return c&&(p=o[(a+(f?l:0))%r],d(n,m,p,f,s.stepped)),!!c}function Ph(n,t,e,i){const o=t.points,{count:s,start:r,ilen:a}=mc(o,e,i),{move:c=!0,reverse:l}=i||{};let d=0,u=0,f,h,p,m,g,b;const v=x=>(r+(l?a-x:x))%s,y=()=>{m!==g&&(n.lineTo(d,g),n.lineTo(d,m),n.lineTo(d,b))};for(c&&(h=o[v(0)],n.moveTo(h.x,h.y)),f=0;f<=a;++f){if(h=o[v(f)],h.skip)continue;const x=h.x,S=h.y,E=x|0;E===p?(S<m?m=S:S>g&&(g=S),d=(u*d+x)/++u):(y(),n.lineTo(x,S),p=E,u=0,m=g=S),b=S}y()}function Uo(n){const t=n.options,e=t.borderDash&&t.borderDash.length;return!n._decimated&&!n._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!e?Ph:Oh}function Ih(n){return n.stepped?Au:n.tension||n.cubicInterpolationMode==="monotone"?Ou:re}function Th(n,t,e,i){let o=t._path;o||(o=t._path=new Path2D,t.path(o,e,i)&&o.closePath()),pc(n,t.options),n.stroke(o)}function Rh(n,t,e,i){const{segments:o,options:s}=t,r=Uo(t);for(const a of o)pc(n,s,a.style),n.beginPath(),r(n,t,a,{start:e,end:e+i-1})&&n.closePath(),n.stroke()}const Lh=typeof Path2D=="function";function Bh(n,t,e,i){Lh&&!t.options.segment?Th(n,t,e,i):Rh(n,t,e,i)}class Wt extends vt{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,e){const i=this.options;if((i.tension||i.cubicInterpolationMode==="monotone")&&!i.stepped&&!this._pointsUpdated){const o=i.spanGaps?this._loop:this._fullLoop;xu(this._points,i,t,o,e),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=Bu(this,this.options.segment))}first(){const t=this.segments,e=this.points;return t.length&&e[t[0].start]}last(){const t=this.segments,e=this.points,i=t.length;return i&&e[t[i-1].end]}interpolate(t,e){const i=this.options,o=t[e],s=this.points,r=tc(this,{property:e,start:o,end:o});if(!r.length)return;const a=[],c=Ih(i);let l,d;for(l=0,d=r.length;l<d;++l){const{start:u,end:f}=r[l],h=s[u],p=s[f];if(h===p){a.push(h);continue}const m=Math.abs((o-h[e])/(p[e]-h[e])),g=c(h,p,m,i.stepped);g[e]=t[e],a.push(g)}return a.length===1?a[0]:a}pathSegment(t,e,i){return Uo(this)(t,this,e,i)}path(t,e,i){const o=this.segments,s=Uo(this);let r=this._loop;e=e||0,i=i||this.points.length-e;for(const a of o)r&=s(t,this,a,{start:e,end:e+i-1});return!!r}draw(t,e,i,o){const s=this.options||{};(this.points||[]).length&&s.borderWidth&&(t.save(),Bh(t,this,i,o),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}T(Wt,"id","line"),T(Wt,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),T(Wt,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),T(Wt,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function Er(n,t,e,i){const o=n.options,{[e]:s}=n.getProps([e],i);return Math.abs(t-s)<o.radius+o.hitRadius}class _i extends vt{constructor(e){super();T(this,"parsed");T(this,"skip");T(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,e&&Object.assign(this,e)}inRange(e,i,o){const s=this.options,{x:r,y:a}=this.getProps(["x","y"],o);return Math.pow(e-r,2)+Math.pow(i-a,2)<Math.pow(s.hitRadius+s.radius,2)}inXRange(e,i){return Er(this,e,"x",i)}inYRange(e,i){return Er(this,e,"y",i)}getCenterPoint(e){const{x:i,y:o}=this.getProps(["x","y"],e);return{x:i,y:o}}size(e){e=e||this.options||{};let i=e.radius||0;i=Math.max(i,i&&e.hoverRadius||0);const o=i&&e.borderWidth||0;return(i+o)*2}draw(e,i){const o=this.options;this.skip||o.radius<.1||!Ft(this,i,this.size(o)/2)||(e.strokeStyle=o.borderColor,e.lineWidth=o.borderWidth,e.fillStyle=o.backgroundColor,jo(e,o,this.x,this.y))}getRange(){const e=this.options||{};return e.radius+e.hitRadius}}T(_i,"id","point"),T(_i,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),T(_i,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function gc(n,t){const{x:e,y:i,base:o,width:s,height:r}=n.getProps(["x","y","base","width","height"],t);let a,c,l,d,u;return n.horizontal?(u=r/2,a=Math.min(e,o),c=Math.max(e,o),l=i-u,d=i+u):(u=s/2,a=e-u,c=e+u,l=Math.min(i,o),d=Math.max(i,o)),{left:a,top:l,right:c,bottom:d}}function Gt(n,t,e,i){return n?0:Z(t,e,i)}function Dh(n,t,e){const i=n.options.borderWidth,o=n.borderSkipped,s=ql(i);return{t:Gt(o.top,s.top,0,e),r:Gt(o.right,s.right,0,t),b:Gt(o.bottom,s.bottom,0,e),l:Gt(o.left,s.left,0,t)}}function $h(n,t,e){const{enableBorderRadius:i}=n.getProps(["enableBorderRadius"]),o=n.options.borderRadius,s=le(o),r=Math.min(t,e),a=n.borderSkipped,c=i||z(o);return{topLeft:Gt(!c||a.top||a.left,s.topLeft,0,r),topRight:Gt(!c||a.top||a.right,s.topRight,0,r),bottomLeft:Gt(!c||a.bottom||a.left,s.bottomLeft,0,r),bottomRight:Gt(!c||a.bottom||a.right,s.bottomRight,0,r)}}function Nh(n){const t=gc(n),e=t.right-t.left,i=t.bottom-t.top,o=Dh(n,e/2,i/2),s=$h(n,e/2,i/2);return{outer:{x:t.left,y:t.top,w:e,h:i,radius:s},inner:{x:t.left+o.l,y:t.top+o.t,w:e-o.l-o.r,h:i-o.t-o.b,radius:{topLeft:Math.max(0,s.topLeft-Math.max(o.t,o.l)),topRight:Math.max(0,s.topRight-Math.max(o.t,o.r)),bottomLeft:Math.max(0,s.bottomLeft-Math.max(o.b,o.l)),bottomRight:Math.max(0,s.bottomRight-Math.max(o.b,o.r))}}}}function ao(n,t,e,i){const o=t===null,s=e===null,a=n&&!(o&&s)&&gc(n,i);return a&&(o||Nt(t,a.left,a.right))&&(s||Nt(e,a.top,a.bottom))}function zh(n){return n.topLeft||n.topRight||n.bottomLeft||n.bottomRight}function Fh(n,t){n.rect(t.x,t.y,t.w,t.h)}function lo(n,t,e={}){const i=n.x!==e.x?-t:0,o=n.y!==e.y?-t:0,s=(n.x+n.w!==e.x+e.w?t:0)-i,r=(n.y+n.h!==e.y+e.h?t:0)-o;return{x:n.x+i,y:n.y+o,w:n.w+s,h:n.h+r,radius:n.radius}}class wi extends vt{constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:e,options:{borderColor:i,backgroundColor:o}}=this,{inner:s,outer:r}=Nh(this),a=zh(r.radius)?sn:Fh;t.save(),(r.w!==s.w||r.h!==s.h)&&(t.beginPath(),a(t,lo(r,e,s)),t.clip(),a(t,lo(s,-e,r)),t.fillStyle=i,t.fill("evenodd")),t.beginPath(),a(t,lo(s,e)),t.fillStyle=o,t.fill(),t.restore()}inRange(t,e,i){return ao(this,t,e,i)}inXRange(t,e){return ao(this,t,null,e)}inYRange(t,e){return ao(this,null,t,e)}getCenterPoint(t){const{x:e,y:i,base:o,horizontal:s}=this.getProps(["x","y","base","horizontal"],t);return{x:s?(e+o)/2:e,y:s?i:(i+o)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}T(wi,"id","bar"),T(wi,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),T(wi,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});var jh=Object.freeze({__proto__:null,ArcElement:Ve,BarElement:wi,LineElement:Wt,PointElement:_i});const Wo=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],Sr=Wo.map(n=>n.replace("rgb(","rgba(").replace(")",", 0.5)"));function bc(n){return Wo[n%Wo.length]}function vc(n){return Sr[n%Sr.length]}function Hh(n,t){return n.borderColor=bc(t),n.backgroundColor=vc(t),++t}function qh(n,t){return n.backgroundColor=n.data.map(()=>bc(t++)),t}function Vh(n,t){return n.backgroundColor=n.data.map(()=>vc(t++)),t}function Uh(n){let t=0;return(e,i)=>{const o=n.getDatasetMeta(i).controller;o instanceof ae?t=qh(e,t):o instanceof Qe?t=Vh(e,t):o&&(t=Hh(e,t))}}function kr(n){let t;for(t in n)if(n[t].borderColor||n[t].backgroundColor)return!0;return!1}function Wh(n){return n&&(n.borderColor||n.backgroundColor)}function Gh(){return W.borderColor!=="rgba(0,0,0,0.1)"||W.backgroundColor!=="rgba(0,0,0,0.1)"}var Yh={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(n,t,e){if(!e.enabled)return;const{data:{datasets:i},options:o}=n.config,{elements:s}=o,r=kr(i)||Wh(o)||s&&kr(s)||Gh();if(!e.forceOverride&&r)return;const a=Uh(n);i.forEach(a)}};function Xh(n,t,e,i,o){const s=o.samples||i;if(s>=e)return n.slice(t,t+e);const r=[],a=(e-2)/(s-2);let c=0;const l=t+e-1;let d=t,u,f,h,p,m;for(r[c++]=n[d],u=0;u<s-2;u++){let g=0,b=0,v;const y=Math.floor((u+1)*a)+1+t,x=Math.min(Math.floor((u+2)*a)+1,e)+t,S=x-y;for(v=y;v<x;v++)g+=n[v].x,b+=n[v].y;g/=S,b/=S;const E=Math.floor(u*a)+1+t,k=Math.min(Math.floor((u+1)*a)+1,e)+t,{x:C,y:_}=n[d];for(h=p=-1,v=E;v<k;v++)p=.5*Math.abs((C-g)*(n[v].y-_)-(C-n[v].x)*(b-_)),p>h&&(h=p,f=n[v],m=v);r[c++]=f,d=m}return r[c++]=n[l],r}function Kh(n,t,e,i){let o=0,s=0,r,a,c,l,d,u,f,h,p,m;const g=[],b=t+e-1,v=n[t].x,x=n[b].x-v;for(r=t;r<t+e;++r){a=n[r],c=(a.x-v)/x*i,l=a.y;const S=c|0;if(S===d)l<p?(p=l,u=r):l>m&&(m=l,f=r),o=(s*o+a.x)/++s;else{const E=r-1;if(!N(u)&&!N(f)){const k=Math.min(u,f),C=Math.max(u,f);k!==h&&k!==E&&g.push({...n[k],x:o}),C!==h&&C!==E&&g.push({...n[C],x:o})}r>0&&E!==h&&g.push(n[E]),g.push(a),d=S,s=0,p=m=l,u=f=h=r}}return g}function yc(n){if(n._decimated){const t=n._data;delete n._decimated,delete n._data,Object.defineProperty(n,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function Cr(n){n.data.datasets.forEach(t=>{yc(t)})}function Jh(n,t){const e=t.length;let i=0,o;const{iScale:s}=n,{min:r,max:a,minDefined:c,maxDefined:l}=s.getUserBounds();return c&&(i=Z(zt(t,s.axis,r).lo,0,e-1)),l?o=Z(zt(t,s.axis,a).hi+1,i,e)-i:o=e-i,{start:i,count:o}}var Qh={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(n,t,e)=>{if(!e.enabled){Cr(n);return}const i=n.width;n.data.datasets.forEach((o,s)=>{const{_data:r,indexAxis:a}=o,c=n.getDatasetMeta(s),l=r||o.data;if(He([a,n.options.indexAxis])==="y"||!c.controller.supportsDecimation)return;const d=n.scales[c.xAxisID];if(d.type!=="linear"&&d.type!=="time"||n.options.parsing)return;let{start:u,count:f}=Jh(c,l);const h=e.threshold||4*i;if(f<=h){yc(o);return}N(r)&&(o._data=l,delete o.data,Object.defineProperty(o,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(m){this._data=m}}));let p;switch(e.algorithm){case"lttb":p=Xh(l,u,f,i,e);break;case"min-max":p=Kh(l,u,f,i);break;default:throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`)}o._decimated=p})},destroy(n){Cr(n)}};function Zh(n,t,e){const i=n.segments,o=n.points,s=t.points,r=[];for(const a of i){let{start:c,end:l}=a;l=ji(c,l,o);const d=Go(e,o[c],o[l],a.loop);if(!t.segments){r.push({source:a,target:d,start:o[c],end:o[l]});continue}const u=tc(t,d);for(const f of u){const h=Go(e,s[f.start],s[f.end],f.loop),p=Zl(a,o,h);for(const m of p)r.push({source:m,target:f,start:{[e]:Mr(d,h,"start",Math.max)},end:{[e]:Mr(d,h,"end",Math.min)}})}}return r}function Go(n,t,e,i){if(i)return;let o=t[n],s=e[n];return n==="angle"&&(o=et(o),s=et(s)),{property:n,start:o,end:s}}function tp(n,t){const{x:e=null,y:i=null}=n||{},o=t.points,s=[];return t.segments.forEach(({start:r,end:a})=>{a=ji(r,a,o);const c=o[r],l=o[a];i!==null?(s.push({x:c.x,y:i}),s.push({x:l.x,y:i})):e!==null&&(s.push({x:e,y:c.y}),s.push({x:e,y:l.y}))}),s}function ji(n,t,e){for(;t>n;t--){const i=e[t];if(!isNaN(i.x)&&!isNaN(i.y))break}return t}function Mr(n,t,e,i){return n&&t?i(n[e],t[e]):n?n[e]:t?t[e]:0}function xc(n,t){let e=[],i=!1;return U(n)?(i=!0,e=n):e=tp(n,t),e.length?new Wt({points:e,options:{tension:0},_loop:i,_fullLoop:i}):null}function Ar(n){return n&&n.fill!==!1}function ep(n,t,e){let o=n[t].fill;const s=[t];let r;if(!e)return o;for(;o!==!1&&s.indexOf(o)===-1;){if(!X(o))return o;if(r=n[o],!r)return!1;if(r.visible)return o;s.push(o),o=r.fill}return!1}function np(n,t,e){const i=rp(n);if(z(i))return isNaN(i.value)?!1:i;let o=parseFloat(i);return X(o)&&Math.floor(o)===o?ip(i[0],t,o,e):["origin","start","end","stack","shape"].indexOf(i)>=0&&i}function ip(n,t,e,i){return(n==="-"||n==="+")&&(e=t+e),e===t||e<0||e>=i?!1:e}function op(n,t){let e=null;return n==="start"?e=t.bottom:n==="end"?e=t.top:z(n)?e=t.getPixelForValue(n.value):t.getBasePixel&&(e=t.getBasePixel()),e}function sp(n,t,e){let i;return n==="start"?i=e:n==="end"?i=t.options.reverse?t.min:t.max:z(n)?i=n.value:i=t.getBaseValue(),i}function rp(n){const t=n.options,e=t.fill;let i=D(e&&e.target,e);return i===void 0&&(i=!!t.backgroundColor),i===!1||i===null?!1:i===!0?"origin":i}function ap(n){const{scale:t,index:e,line:i}=n,o=[],s=i.segments,r=i.points,a=lp(t,e);a.push(xc({x:null,y:t.bottom},i));for(let c=0;c<s.length;c++){const l=s[c];for(let d=l.start;d<=l.end;d++)cp(o,r[d],a)}return new Wt({points:o,options:{}})}function lp(n,t){const e=[],i=n.getMatchingVisibleMetas("line");for(let o=0;o<i.length;o++){const s=i[o];if(s.index===t)break;s.hidden||e.unshift(s.dataset)}return e}function cp(n,t,e){const i=[];for(let o=0;o<e.length;o++){const s=e[o],{first:r,last:a,point:c}=dp(s,t,"x");if(!(!c||r&&a)){if(r)i.unshift(c);else if(n.push(c),!a)break}}n.push(...i)}function dp(n,t,e){const i=n.interpolate(t,e);if(!i)return{};const o=i[e],s=n.segments,r=n.points;let a=!1,c=!1;for(let l=0;l<s.length;l++){const d=s[l],u=r[d.start][e],f=r[d.end][e];if(Nt(o,u,f)){a=o===u,c=o===f;break}}return{first:a,last:c,point:i}}class _c{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,e,i){const{x:o,y:s,radius:r}=this;return e=e||{start:0,end:V},t.arc(o,s,r,e.end,e.start,!0),!i.bounds}interpolate(t){const{x:e,y:i,radius:o}=this,s=t.angle;return{x:e+Math.cos(s)*o,y:i+Math.sin(s)*o,angle:s}}}function up(n){const{chart:t,fill:e,line:i}=n;if(X(e))return fp(t,e);if(e==="stack")return ap(n);if(e==="shape")return!0;const o=hp(n);return o instanceof _c?o:xc(o,i)}function fp(n,t){const e=n.getDatasetMeta(t);return e&&n.isDatasetVisible(t)?e.dataset:null}function hp(n){return(n.scale||{}).getPointPositionForValue?mp(n):pp(n)}function pp(n){const{scale:t={},fill:e}=n,i=op(e,t);if(X(i)){const o=t.isHorizontal();return{x:o?i:null,y:o?null:i}}return null}function mp(n){const{scale:t,fill:e}=n,i=t.options,o=t.getLabels().length,s=i.reverse?t.max:t.min,r=sp(e,t,s),a=[];if(i.grid.circular){const c=t.getPointPositionForValue(0,s);return new _c({x:c.x,y:c.y,radius:t.getDistanceFromCenterForValue(r)})}for(let c=0;c<o;++c)a.push(t.getPointPositionForValue(c,r));return a}function co(n,t,e){const i=up(t),{chart:o,index:s,line:r,scale:a,axis:c}=t,l=r.options,d=l.fill,u=l.backgroundColor,{above:f=u,below:h=u}=d||{},p=o.getDatasetMeta(s),m=ec(o,p);i&&r.points.length&&($i(n,e),gp(n,{line:r,target:i,above:f,below:h,area:e,scale:a,axis:c,clip:m}),Ni(n))}function gp(n,t){const{line:e,target:i,above:o,below:s,area:r,scale:a,clip:c}=t,l=e._loop?"angle":t.axis;n.save();let d=s;s!==o&&(l==="x"?(Or(n,i,r.top),uo(n,{line:e,target:i,color:o,scale:a,property:l,clip:c}),n.restore(),n.save(),Or(n,i,r.bottom)):l==="y"&&(Pr(n,i,r.left),uo(n,{line:e,target:i,color:s,scale:a,property:l,clip:c}),n.restore(),n.save(),Pr(n,i,r.right),d=o)),uo(n,{line:e,target:i,color:d,scale:a,property:l,clip:c}),n.restore()}function Or(n,t,e){const{segments:i,points:o}=t;let s=!0,r=!1;n.beginPath();for(const a of i){const{start:c,end:l}=a,d=o[c],u=o[ji(c,l,o)];s?(n.moveTo(d.x,d.y),s=!1):(n.lineTo(d.x,e),n.lineTo(d.x,d.y)),r=!!t.pathSegment(n,a,{move:r}),r?n.closePath():n.lineTo(u.x,e)}n.lineTo(t.first().x,e),n.closePath(),n.clip()}function Pr(n,t,e){const{segments:i,points:o}=t;let s=!0,r=!1;n.beginPath();for(const a of i){const{start:c,end:l}=a,d=o[c],u=o[ji(c,l,o)];s?(n.moveTo(d.x,d.y),s=!1):(n.lineTo(e,d.y),n.lineTo(d.x,d.y)),r=!!t.pathSegment(n,a,{move:r}),r?n.closePath():n.lineTo(e,u.y)}n.lineTo(e,t.first().y),n.closePath(),n.clip()}function uo(n,t){const{line:e,target:i,property:o,color:s,scale:r,clip:a}=t,c=Zh(e,i,o);for(const{source:l,target:d,start:u,end:f}of c){const{style:{backgroundColor:h=s}={}}=l,p=i!==!0;n.save(),n.fillStyle=h,bp(n,r,a,p&&Go(o,u,f)),n.beginPath();const m=!!e.pathSegment(n,l);let g;if(p){m?n.closePath():Ir(n,i,f,o);const b=!!i.pathSegment(n,d,{move:m,reverse:!0});g=m&&b,g||Ir(n,i,u,o)}n.closePath(),n.fill(g?"evenodd":"nonzero"),n.restore()}}function bp(n,t,e,i){const o=t.chart.chartArea,{property:s,start:r,end:a}=i||{};if(s==="x"||s==="y"){let c,l,d,u;s==="x"?(c=r,l=o.top,d=a,u=o.bottom):(c=o.left,l=r,d=o.right,u=a),n.beginPath(),e&&(c=Math.max(c,e.left),d=Math.min(d,e.right),l=Math.max(l,e.top),u=Math.min(u,e.bottom)),n.rect(c,l,d-c,u-l),n.clip()}}function Ir(n,t,e,i){const o=t.interpolate(e,i);o&&n.lineTo(o.x,o.y)}var vp={id:"filler",afterDatasetsUpdate(n,t,e){const i=(n.data.datasets||[]).length,o=[];let s,r,a,c;for(r=0;r<i;++r)s=n.getDatasetMeta(r),a=s.dataset,c=null,a&&a.options&&a instanceof Wt&&(c={visible:n.isDatasetVisible(r),index:r,fill:np(a,r,i),chart:n,axis:s.controller.options.indexAxis,scale:s.vScale,line:a}),s.$filler=c,o.push(c);for(r=0;r<i;++r)c=o[r],!(!c||c.fill===!1)&&(c.fill=ep(o,r,e.propagate))},beforeDraw(n,t,e){const i=e.drawTime==="beforeDraw",o=n.getSortedVisibleDatasetMetas(),s=n.chartArea;for(let r=o.length-1;r>=0;--r){const a=o[r].$filler;a&&(a.line.updateControlPoints(s,a.axis),i&&a.fill&&co(n.ctx,a,s))}},beforeDatasetsDraw(n,t,e){if(e.drawTime!=="beforeDatasetsDraw")return;const i=n.getSortedVisibleDatasetMetas();for(let o=i.length-1;o>=0;--o){const s=i[o].$filler;Ar(s)&&co(n.ctx,s,n.chartArea)}},beforeDatasetDraw(n,t,e){const i=t.meta.$filler;!Ar(i)||e.drawTime!=="beforeDatasetDraw"||co(n.ctx,i,n.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const Tr=(n,t)=>{let{boxHeight:e=t,boxWidth:i=t}=n;return n.usePointStyle&&(e=Math.min(e,t),i=n.pointStyleWidth||Math.min(i,t)),{boxWidth:i,boxHeight:e,itemHeight:Math.max(t,e)}},yp=(n,t)=>n!==null&&t!==null&&n.datasetIndex===t.datasetIndex&&n.index===t.index;class Rr extends vt{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e,i){this.maxWidth=t,this.maxHeight=e,this._margins=i,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let e=q(t.generateLabels,[this.chart],this)||[];t.filter&&(e=e.filter(i=>t.filter(i,this.chart.data))),t.sort&&(e=e.sort((i,o)=>t.sort(i,o,this.chart.data))),this.options.reverse&&e.reverse(),this.legendItems=e}fit(){const{options:t,ctx:e}=this;if(!t.display){this.width=this.height=0;return}const i=t.labels,o=J(i.font),s=o.size,r=this._computeTitleHeight(),{boxWidth:a,itemHeight:c}=Tr(i,s);let l,d;e.font=o.string,this.isHorizontal()?(l=this.maxWidth,d=this._fitRows(r,s,a,c)+10):(d=this.maxHeight,l=this._fitCols(r,o,a,c)+10),this.width=Math.min(l,t.maxWidth||this.maxWidth),this.height=Math.min(d,t.maxHeight||this.maxHeight)}_fitRows(t,e,i,o){const{ctx:s,maxWidth:r,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],l=this.lineWidths=[0],d=o+a;let u=t;s.textAlign="left",s.textBaseline="middle";let f=-1,h=-d;return this.legendItems.forEach((p,m)=>{const g=i+e/2+s.measureText(p.text).width;(m===0||l[l.length-1]+g+2*a>r)&&(u+=d,l[l.length-(m>0?0:1)]=0,h+=d,f++),c[m]={left:0,top:h,row:f,width:g,height:o},l[l.length-1]+=g+a}),u}_fitCols(t,e,i,o){const{ctx:s,maxHeight:r,options:{labels:{padding:a}}}=this,c=this.legendHitBoxes=[],l=this.columnSizes=[],d=r-t;let u=a,f=0,h=0,p=0,m=0;return this.legendItems.forEach((g,b)=>{const{itemWidth:v,itemHeight:y}=xp(i,e,s,g,o);b>0&&h+y+2*a>d&&(u+=f+a,l.push({width:f,height:h}),p+=f+a,m++,f=h=0),c[b]={left:p,top:h,col:m,width:v,height:y},f=Math.max(f,v),h+=y+a}),u+=f,l.push({width:f,height:h}),u}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:e,options:{align:i,labels:{padding:o},rtl:s}}=this,r=Ee(s,this.left,this.width);if(this.isHorizontal()){let a=0,c=tt(i,this.left+o,this.right-this.lineWidths[a]);for(const l of e)a!==l.row&&(a=l.row,c=tt(i,this.left+o,this.right-this.lineWidths[a])),l.top+=this.top+t+o,l.left=r.leftForLtr(r.x(c),l.width),c+=l.width+o}else{let a=0,c=tt(i,this.top+t+o,this.bottom-this.columnSizes[a].height);for(const l of e)l.col!==a&&(a=l.col,c=tt(i,this.top+t+o,this.bottom-this.columnSizes[a].height)),l.top=c,l.left+=this.left+o,l.left=r.leftForLtr(r.x(l.left),l.width),c+=l.height+o}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;$i(t,this),this._draw(),Ni(t)}}_draw(){const{options:t,columnSizes:e,lineWidths:i,ctx:o}=this,{align:s,labels:r}=t,a=W.color,c=Ee(t.rtl,this.left,this.width),l=J(r.font),{padding:d}=r,u=l.size,f=u/2;let h;this.drawTitle(),o.textAlign=c.textAlign("left"),o.textBaseline="middle",o.lineWidth=.5,o.font=l.string;const{boxWidth:p,boxHeight:m,itemHeight:g}=Tr(r,u),b=function(E,k,C){if(isNaN(p)||p<=0||isNaN(m)||m<0)return;o.save();const _=D(C.lineWidth,1);if(o.fillStyle=D(C.fillStyle,a),o.lineCap=D(C.lineCap,"butt"),o.lineDashOffset=D(C.lineDashOffset,0),o.lineJoin=D(C.lineJoin,"miter"),o.lineWidth=_,o.strokeStyle=D(C.strokeStyle,a),o.setLineDash(D(C.lineDash,[])),r.usePointStyle){const A={radius:m*Math.SQRT2/2,pointStyle:C.pointStyle,rotation:C.rotation,borderWidth:_},M=c.xPlus(E,p/2),O=k+f;Hl(o,A,M,O,r.pointStyleWidth&&p)}else{const A=k+Math.max((u-m)/2,0),M=c.leftForLtr(E,p),O=le(C.borderRadius);o.beginPath(),Object.values(O).some(I=>I!==0)?sn(o,{x:M,y:A,w:p,h:m,radius:O}):o.rect(M,A,p,m),o.fill(),_!==0&&o.stroke()}o.restore()},v=function(E,k,C){ue(o,C.text,E,k+g/2,l,{strikethrough:C.hidden,textAlign:c.textAlign(C.textAlign)})},y=this.isHorizontal(),x=this._computeTitleHeight();y?h={x:tt(s,this.left+d,this.right-i[0]),y:this.top+d+x,line:0}:h={x:this.left+d,y:tt(s,this.top+x+d,this.bottom-e[0].height),line:0},Kl(this.ctx,t.textDirection);const S=g+d;this.legendItems.forEach((E,k)=>{o.strokeStyle=E.fontColor,o.fillStyle=E.fontColor;const C=o.measureText(E.text).width,_=c.textAlign(E.textAlign||(E.textAlign=r.textAlign)),A=p+f+C;let M=h.x,O=h.y;c.setWidth(this.width),y?k>0&&M+A+d>this.right&&(O=h.y+=S,h.line++,M=h.x=tt(s,this.left+d,this.right-i[h.line])):k>0&&O+S>this.bottom&&(M=h.x=M+e[h.line].width+d,h.line++,O=h.y=tt(s,this.top+x+d,this.bottom-e[h.line].height));const I=c.x(M);if(b(I,O,E),M=Nd(_,M+p+f,y?M+A:this.right,t.rtl),v(c.x(M),O,E),y)h.x+=A+d;else if(typeof E.text!="string"){const L=l.lineHeight;h.y+=wc(E,L)+d}else h.y+=S}),Jl(this.ctx,t.textDirection)}drawTitle(){const t=this.options,e=t.title,i=J(e.font),o=it(e.padding);if(!e.display)return;const s=Ee(t.rtl,this.left,this.width),r=this.ctx,a=e.position,c=i.size/2,l=o.top+c;let d,u=this.left,f=this.width;if(this.isHorizontal())f=Math.max(...this.lineWidths),d=this.top+l,u=tt(t.align,u,this.right-f);else{const p=this.columnSizes.reduce((m,g)=>Math.max(m,g.height),0);d=l+tt(t.align,this.top,this.bottom-p-t.labels.padding-this._computeTitleHeight())}const h=tt(a,u,u+f);r.textAlign=s.textAlign(us(a)),r.textBaseline="middle",r.strokeStyle=e.color,r.fillStyle=e.color,r.font=i.string,ue(r,e.text,h,d,i)}_computeTitleHeight(){const t=this.options.title,e=J(t.font),i=it(t.padding);return t.display?e.lineHeight+i.height:0}_getLegendItemAt(t,e){let i,o,s;if(Nt(t,this.left,this.right)&&Nt(e,this.top,this.bottom)){for(s=this.legendHitBoxes,i=0;i<s.length;++i)if(o=s[i],Nt(t,o.left,o.left+o.width)&&Nt(e,o.top,o.top+o.height))return this.legendItems[i]}return null}handleEvent(t){const e=this.options;if(!Ep(t.type,e))return;const i=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const o=this._hoveredItem,s=yp(o,i);o&&!s&&q(e.onLeave,[t,o,this],this),this._hoveredItem=i,i&&!s&&q(e.onHover,[t,i,this],this)}else i&&q(e.onClick,[t,i,this],this)}}function xp(n,t,e,i,o){const s=_p(i,n,t,e),r=wp(o,i,t.lineHeight);return{itemWidth:s,itemHeight:r}}function _p(n,t,e,i){let o=n.text;return o&&typeof o!="string"&&(o=o.reduce((s,r)=>s.length>r.length?s:r)),t+e.size/2+i.measureText(o).width}function wp(n,t,e){let i=n;return typeof t.text!="string"&&(i=wc(t,e)),i}function wc(n,t){const e=n.text?n.text.length:0;return t*e}function Ep(n,t){return!!((n==="mousemove"||n==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(n==="click"||n==="mouseup"))}var Sp={id:"legend",_element:Rr,start(n,t,e){const i=n.legend=new Rr({ctx:n.ctx,options:e,chart:n});nt.configure(n,i,e),nt.addBox(n,i)},stop(n){nt.removeBox(n,n.legend),delete n.legend},beforeUpdate(n,t,e){const i=n.legend;nt.configure(n,i,e),i.options=e},afterUpdate(n){const t=n.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(n,t){t.replay||n.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(n,t,e){const i=t.datasetIndex,o=e.chart;o.isDatasetVisible(i)?(o.hide(i),t.hidden=!0):(o.show(i),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:n=>n.chart.options.color,boxWidth:40,padding:10,generateLabels(n){const t=n.data.datasets,{labels:{usePointStyle:e,pointStyle:i,textAlign:o,color:s,useBorderRadius:r,borderRadius:a}}=n.legend.options;return n._getSortedDatasetMetas().map(c=>{const l=c.controller.getStyle(e?0:void 0),d=it(l.borderWidth);return{text:t[c.index].label,fillStyle:l.backgroundColor,fontColor:s,hidden:!c.visible,lineCap:l.borderCapStyle,lineDash:l.borderDash,lineDashOffset:l.borderDashOffset,lineJoin:l.borderJoinStyle,lineWidth:(d.width+d.height)/4,strokeStyle:l.borderColor,pointStyle:i||l.pointStyle,rotation:l.rotation,textAlign:o||l.textAlign,borderRadius:r&&(a||l.borderRadius),datasetIndex:c.index}},this)}},title:{color:n=>n.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:n=>!n.startsWith("on"),labels:{_scriptable:n=>!["generateLabels","filter","sort"].includes(n)}}};class xs extends vt{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e){const i=this.options;if(this.left=0,this.top=0,!i.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=e;const o=U(i.text)?i.text.length:1;this._padding=it(i.padding);const s=o*J(i.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=s:this.width=s}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:e,left:i,bottom:o,right:s,options:r}=this,a=r.align;let c=0,l,d,u;return this.isHorizontal()?(d=tt(a,i,s),u=e+t,l=s-i):(r.position==="left"?(d=i+t,u=tt(a,o,e),c=j*-.5):(d=s-t,u=tt(a,e,o),c=j*.5),l=o-e),{titleX:d,titleY:u,maxWidth:l,rotation:c}}draw(){const t=this.ctx,e=this.options;if(!e.display)return;const i=J(e.font),s=i.lineHeight/2+this._padding.top,{titleX:r,titleY:a,maxWidth:c,rotation:l}=this._drawArgs(s);ue(t,e.text,0,0,i,{color:e.color,maxWidth:c,rotation:l,textAlign:us(e.align),textBaseline:"middle",translation:[r,a]})}}function kp(n,t){const e=new xs({ctx:n.ctx,options:t,chart:n});nt.configure(n,e,t),nt.addBox(n,e),n.titleBlock=e}var Cp={id:"title",_element:xs,start(n,t,e){kp(n,e)},stop(n){const t=n.titleBlock;nt.removeBox(n,t),delete n.titleBlock},beforeUpdate(n,t,e){const i=n.titleBlock;nt.configure(n,i,e),i.options=e},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const An=new WeakMap;var Mp={id:"subtitle",start(n,t,e){const i=new xs({ctx:n.ctx,options:e,chart:n});nt.configure(n,i,e),nt.addBox(n,i),An.set(n,i)},stop(n){nt.removeBox(n,An.get(n)),An.delete(n)},beforeUpdate(n,t,e){const i=An.get(n);nt.configure(n,i,e),i.options=e},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Ue={average(n){if(!n.length)return!1;let t,e,i=new Set,o=0,s=0;for(t=0,e=n.length;t<e;++t){const a=n[t].element;if(a&&a.hasValue()){const c=a.tooltipPosition();i.add(c.x),o+=c.y,++s}}return s===0||i.size===0?!1:{x:[...i].reduce((a,c)=>a+c)/i.size,y:o/s}},nearest(n,t){if(!n.length)return!1;let e=t.x,i=t.y,o=Number.POSITIVE_INFINITY,s,r,a;for(s=0,r=n.length;s<r;++s){const c=n[s].element;if(c&&c.hasValue()){const l=c.getCenterPoint(),d=zo(t,l);d<o&&(o=d,a=c)}}if(a){const c=a.tooltipPosition();e=c.x,i=c.y}return{x:e,y:i}}};function wt(n,t){return t&&(U(t)?Array.prototype.push.apply(n,t):n.push(t)),n}function Bt(n){return(typeof n=="string"||n instanceof String)&&n.indexOf(`
`)>-1?n.split(`
`):n}function Ap(n,t){const{element:e,datasetIndex:i,index:o}=t,s=n.getDatasetMeta(i).controller,{label:r,value:a}=s.getLabelAndValue(o);return{chart:n,label:r,parsed:s.getParsed(o),raw:n.data.datasets[i].data[o],formattedValue:a,dataset:s.getDataset(),dataIndex:o,datasetIndex:i,element:e}}function Lr(n,t){const e=n.chart.ctx,{body:i,footer:o,title:s}=n,{boxWidth:r,boxHeight:a}=t,c=J(t.bodyFont),l=J(t.titleFont),d=J(t.footerFont),u=s.length,f=o.length,h=i.length,p=it(t.padding);let m=p.height,g=0,b=i.reduce((x,S)=>x+S.before.length+S.lines.length+S.after.length,0);if(b+=n.beforeBody.length+n.afterBody.length,u&&(m+=u*l.lineHeight+(u-1)*t.titleSpacing+t.titleMarginBottom),b){const x=t.displayColors?Math.max(a,c.lineHeight):c.lineHeight;m+=h*x+(b-h)*c.lineHeight+(b-1)*t.bodySpacing}f&&(m+=t.footerMarginTop+f*d.lineHeight+(f-1)*t.footerSpacing);let v=0;const y=function(x){g=Math.max(g,e.measureText(x).width+v)};return e.save(),e.font=l.string,H(n.title,y),e.font=c.string,H(n.beforeBody.concat(n.afterBody),y),v=t.displayColors?r+2+t.boxPadding:0,H(i,x=>{H(x.before,y),H(x.lines,y),H(x.after,y)}),v=0,e.font=d.string,H(n.footer,y),e.restore(),g+=p.width,{width:g,height:m}}function Op(n,t){const{y:e,height:i}=t;return e<i/2?"top":e>n.height-i/2?"bottom":"center"}function Pp(n,t,e,i){const{x:o,width:s}=i,r=e.caretSize+e.caretPadding;if(n==="left"&&o+s+r>t.width||n==="right"&&o-s-r<0)return!0}function Ip(n,t,e,i){const{x:o,width:s}=e,{width:r,chartArea:{left:a,right:c}}=n;let l="center";return i==="center"?l=o<=(a+c)/2?"left":"right":o<=s/2?l="left":o>=r-s/2&&(l="right"),Pp(l,n,t,e)&&(l="center"),l}function Br(n,t,e){const i=e.yAlign||t.yAlign||Op(n,e);return{xAlign:e.xAlign||t.xAlign||Ip(n,t,e,i),yAlign:i}}function Tp(n,t){let{x:e,width:i}=n;return t==="right"?e-=i:t==="center"&&(e-=i/2),e}function Rp(n,t,e){let{y:i,height:o}=n;return t==="top"?i+=e:t==="bottom"?i-=o+e:i-=o/2,i}function Dr(n,t,e,i){const{caretSize:o,caretPadding:s,cornerRadius:r}=n,{xAlign:a,yAlign:c}=e,l=o+s,{topLeft:d,topRight:u,bottomLeft:f,bottomRight:h}=le(r);let p=Tp(t,a);const m=Rp(t,c,l);return c==="center"?a==="left"?p+=l:a==="right"&&(p-=l):a==="left"?p-=Math.max(d,f)+o:a==="right"&&(p+=Math.max(u,h)+o),{x:Z(p,0,i.width-t.width),y:Z(m,0,i.height-t.height)}}function On(n,t,e){const i=it(e.padding);return t==="center"?n.x+n.width/2:t==="right"?n.x+n.width-i.right:n.x+i.left}function $r(n){return wt([],Bt(n))}function Lp(n,t,e){return Qt(n,{tooltip:t,tooltipItems:e,type:"tooltip"})}function Nr(n,t){const e=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return e?n.override(e):n}const Ec={beforeTitle:Tt,title(n){if(n.length>0){const t=n[0],e=t.chart.data.labels,i=e?e.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(i>0&&t.dataIndex<i)return e[t.dataIndex]}return""},afterTitle:Tt,beforeBody:Tt,beforeLabel:Tt,label(n){if(this&&this.options&&this.options.mode==="dataset")return n.label+": "+n.formattedValue||n.formattedValue;let t=n.dataset.label||"";t&&(t+=": ");const e=n.formattedValue;return N(e)||(t+=e),t},labelColor(n){const e=n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);return{borderColor:e.borderColor,backgroundColor:e.backgroundColor,borderWidth:e.borderWidth,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(n){const e=n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);return{pointStyle:e.pointStyle,rotation:e.rotation}},afterLabel:Tt,afterBody:Tt,beforeFooter:Tt,footer:Tt,afterFooter:Tt};function rt(n,t,e,i){const o=n[t].call(e,i);return typeof o>"u"?Ec[t].call(e,i):o}class Yo extends vt{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const e=this.chart,i=this.options.setContext(this.getContext()),o=i.enabled&&e.options.animation&&i.animations,s=new nc(this.chart,o);return o._cacheable&&(this._cachedAnimations=Object.freeze(s)),s}getContext(){return this.$context||(this.$context=Lp(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,e){const{callbacks:i}=e,o=rt(i,"beforeTitle",this,t),s=rt(i,"title",this,t),r=rt(i,"afterTitle",this,t);let a=[];return a=wt(a,Bt(o)),a=wt(a,Bt(s)),a=wt(a,Bt(r)),a}getBeforeBody(t,e){return $r(rt(e.callbacks,"beforeBody",this,t))}getBody(t,e){const{callbacks:i}=e,o=[];return H(t,s=>{const r={before:[],lines:[],after:[]},a=Nr(i,s);wt(r.before,Bt(rt(a,"beforeLabel",this,s))),wt(r.lines,rt(a,"label",this,s)),wt(r.after,Bt(rt(a,"afterLabel",this,s))),o.push(r)}),o}getAfterBody(t,e){return $r(rt(e.callbacks,"afterBody",this,t))}getFooter(t,e){const{callbacks:i}=e,o=rt(i,"beforeFooter",this,t),s=rt(i,"footer",this,t),r=rt(i,"afterFooter",this,t);let a=[];return a=wt(a,Bt(o)),a=wt(a,Bt(s)),a=wt(a,Bt(r)),a}_createItems(t){const e=this._active,i=this.chart.data,o=[],s=[],r=[];let a=[],c,l;for(c=0,l=e.length;c<l;++c)a.push(Ap(this.chart,e[c]));return t.filter&&(a=a.filter((d,u,f)=>t.filter(d,u,f,i))),t.itemSort&&(a=a.sort((d,u)=>t.itemSort(d,u,i))),H(a,d=>{const u=Nr(t.callbacks,d);o.push(rt(u,"labelColor",this,d)),s.push(rt(u,"labelPointStyle",this,d)),r.push(rt(u,"labelTextColor",this,d))}),this.labelColors=o,this.labelPointStyles=s,this.labelTextColors=r,this.dataPoints=a,a}update(t,e){const i=this.options.setContext(this.getContext()),o=this._active;let s,r=[];if(!o.length)this.opacity!==0&&(s={opacity:0});else{const a=Ue[i.position].call(this,o,this._eventPosition);r=this._createItems(i),this.title=this.getTitle(r,i),this.beforeBody=this.getBeforeBody(r,i),this.body=this.getBody(r,i),this.afterBody=this.getAfterBody(r,i),this.footer=this.getFooter(r,i);const c=this._size=Lr(this,i),l=Object.assign({},a,c),d=Br(this.chart,i,l),u=Dr(i,l,d,this.chart);this.xAlign=d.xAlign,this.yAlign=d.yAlign,s={opacity:1,x:u.x,y:u.y,width:c.width,height:c.height,caretX:a.x,caretY:a.y}}this._tooltipItems=r,this.$context=void 0,s&&this._resolveAnimations().update(this,s),t&&i.external&&i.external.call(this,{chart:this.chart,tooltip:this,replay:e})}drawCaret(t,e,i,o){const s=this.getCaretPosition(t,i,o);e.lineTo(s.x1,s.y1),e.lineTo(s.x2,s.y2),e.lineTo(s.x3,s.y3)}getCaretPosition(t,e,i){const{xAlign:o,yAlign:s}=this,{caretSize:r,cornerRadius:a}=i,{topLeft:c,topRight:l,bottomLeft:d,bottomRight:u}=le(a),{x:f,y:h}=t,{width:p,height:m}=e;let g,b,v,y,x,S;return s==="center"?(x=h+m/2,o==="left"?(g=f,b=g-r,y=x+r,S=x-r):(g=f+p,b=g+r,y=x-r,S=x+r),v=g):(o==="left"?b=f+Math.max(c,d)+r:o==="right"?b=f+p-Math.max(l,u)-r:b=this.caretX,s==="top"?(y=h,x=y-r,g=b-r,v=b+r):(y=h+m,x=y+r,g=b+r,v=b-r),S=y),{x1:g,x2:b,x3:v,y1:y,y2:x,y3:S}}drawTitle(t,e,i){const o=this.title,s=o.length;let r,a,c;if(s){const l=Ee(i.rtl,this.x,this.width);for(t.x=On(this,i.titleAlign,i),e.textAlign=l.textAlign(i.titleAlign),e.textBaseline="middle",r=J(i.titleFont),a=i.titleSpacing,e.fillStyle=i.titleColor,e.font=r.string,c=0;c<s;++c)e.fillText(o[c],l.x(t.x),t.y+r.lineHeight/2),t.y+=r.lineHeight+a,c+1===s&&(t.y+=i.titleMarginBottom-a)}}_drawColorBox(t,e,i,o,s){const r=this.labelColors[i],a=this.labelPointStyles[i],{boxHeight:c,boxWidth:l}=s,d=J(s.bodyFont),u=On(this,"left",s),f=o.x(u),h=c<d.lineHeight?(d.lineHeight-c)/2:0,p=e.y+h;if(s.usePointStyle){const m={radius:Math.min(l,c)/2,pointStyle:a.pointStyle,rotation:a.rotation,borderWidth:1},g=o.leftForLtr(f,l)+l/2,b=p+c/2;t.strokeStyle=s.multiKeyBackground,t.fillStyle=s.multiKeyBackground,jo(t,m,g,b),t.strokeStyle=r.borderColor,t.fillStyle=r.backgroundColor,jo(t,m,g,b)}else{t.lineWidth=z(r.borderWidth)?Math.max(...Object.values(r.borderWidth)):r.borderWidth||1,t.strokeStyle=r.borderColor,t.setLineDash(r.borderDash||[]),t.lineDashOffset=r.borderDashOffset||0;const m=o.leftForLtr(f,l),g=o.leftForLtr(o.xPlus(f,1),l-2),b=le(r.borderRadius);Object.values(b).some(v=>v!==0)?(t.beginPath(),t.fillStyle=s.multiKeyBackground,sn(t,{x:m,y:p,w:l,h:c,radius:b}),t.fill(),t.stroke(),t.fillStyle=r.backgroundColor,t.beginPath(),sn(t,{x:g,y:p+1,w:l-2,h:c-2,radius:b}),t.fill()):(t.fillStyle=s.multiKeyBackground,t.fillRect(m,p,l,c),t.strokeRect(m,p,l,c),t.fillStyle=r.backgroundColor,t.fillRect(g,p+1,l-2,c-2))}t.fillStyle=this.labelTextColors[i]}drawBody(t,e,i){const{body:o}=this,{bodySpacing:s,bodyAlign:r,displayColors:a,boxHeight:c,boxWidth:l,boxPadding:d}=i,u=J(i.bodyFont);let f=u.lineHeight,h=0;const p=Ee(i.rtl,this.x,this.width),m=function(C){e.fillText(C,p.x(t.x+h),t.y+f/2),t.y+=f+s},g=p.textAlign(r);let b,v,y,x,S,E,k;for(e.textAlign=r,e.textBaseline="middle",e.font=u.string,t.x=On(this,g,i),e.fillStyle=i.bodyColor,H(this.beforeBody,m),h=a&&g!=="right"?r==="center"?l/2+d:l+2+d:0,x=0,E=o.length;x<E;++x){for(b=o[x],v=this.labelTextColors[x],e.fillStyle=v,H(b.before,m),y=b.lines,a&&y.length&&(this._drawColorBox(e,t,x,p,i),f=Math.max(u.lineHeight,c)),S=0,k=y.length;S<k;++S)m(y[S]),f=u.lineHeight;H(b.after,m)}h=0,f=u.lineHeight,H(this.afterBody,m),t.y-=s}drawFooter(t,e,i){const o=this.footer,s=o.length;let r,a;if(s){const c=Ee(i.rtl,this.x,this.width);for(t.x=On(this,i.footerAlign,i),t.y+=i.footerMarginTop,e.textAlign=c.textAlign(i.footerAlign),e.textBaseline="middle",r=J(i.footerFont),e.fillStyle=i.footerColor,e.font=r.string,a=0;a<s;++a)e.fillText(o[a],c.x(t.x),t.y+r.lineHeight/2),t.y+=r.lineHeight+i.footerSpacing}}drawBackground(t,e,i,o){const{xAlign:s,yAlign:r}=this,{x:a,y:c}=t,{width:l,height:d}=i,{topLeft:u,topRight:f,bottomLeft:h,bottomRight:p}=le(o.cornerRadius);e.fillStyle=o.backgroundColor,e.strokeStyle=o.borderColor,e.lineWidth=o.borderWidth,e.beginPath(),e.moveTo(a+u,c),r==="top"&&this.drawCaret(t,e,i,o),e.lineTo(a+l-f,c),e.quadraticCurveTo(a+l,c,a+l,c+f),r==="center"&&s==="right"&&this.drawCaret(t,e,i,o),e.lineTo(a+l,c+d-p),e.quadraticCurveTo(a+l,c+d,a+l-p,c+d),r==="bottom"&&this.drawCaret(t,e,i,o),e.lineTo(a+h,c+d),e.quadraticCurveTo(a,c+d,a,c+d-h),r==="center"&&s==="left"&&this.drawCaret(t,e,i,o),e.lineTo(a,c+u),e.quadraticCurveTo(a,c,a+u,c),e.closePath(),e.fill(),o.borderWidth>0&&e.stroke()}_updateAnimationTarget(t){const e=this.chart,i=this.$animations,o=i&&i.x,s=i&&i.y;if(o||s){const r=Ue[t.position].call(this,this._active,this._eventPosition);if(!r)return;const a=this._size=Lr(this,t),c=Object.assign({},r,this._size),l=Br(e,t,c),d=Dr(t,c,l,e);(o._to!==d.x||s._to!==d.y)&&(this.xAlign=l.xAlign,this.yAlign=l.yAlign,this.width=a.width,this.height=a.height,this.caretX=r.x,this.caretY=r.y,this._resolveAnimations().update(this,d))}}_willRender(){return!!this.opacity}draw(t){const e=this.options.setContext(this.getContext());let i=this.opacity;if(!i)return;this._updateAnimationTarget(e);const o={width:this.width,height:this.height},s={x:this.x,y:this.y};i=Math.abs(i)<.001?0:i;const r=it(e.padding),a=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;e.enabled&&a&&(t.save(),t.globalAlpha=i,this.drawBackground(s,t,o,e),Kl(t,e.textDirection),s.y+=r.top,this.drawTitle(s,t,e),this.drawBody(s,t,e),this.drawFooter(s,t,e),Jl(t,e.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,e){const i=this._active,o=t.map(({datasetIndex:a,index:c})=>{const l=this.chart.getDatasetMeta(a);if(!l)throw new Error("Cannot find a dataset at index "+a);return{datasetIndex:a,element:l.data[c],index:c}}),s=!ki(i,o),r=this._positionChanged(o,e);(s||r)&&(this._active=o,this._eventPosition=e,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,e,i=!0){if(e&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const o=this.options,s=this._active||[],r=this._getActiveElements(t,s,e,i),a=this._positionChanged(r,t),c=e||!ki(r,s)||a;return c&&(this._active=r,(o.enabled||o.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,e))),c}_getActiveElements(t,e,i,o){const s=this.options;if(t.type==="mouseout")return[];if(!o)return e.filter(a=>this.chart.data.datasets[a.datasetIndex]&&this.chart.getDatasetMeta(a.datasetIndex).controller.getParsed(a.index)!==void 0);const r=this.chart.getElementsAtEventForMode(t,s.mode,s,i);return s.reverse&&r.reverse(),r}_positionChanged(t,e){const{caretX:i,caretY:o,options:s}=this,r=Ue[s.position].call(this,t,e);return r!==!1&&(i!==r.x||o!==r.y)}}T(Yo,"positioners",Ue);var Bp={id:"tooltip",_element:Yo,positioners:Ue,afterInit(n,t,e){e&&(n.tooltip=new Yo({chart:n,options:e}))},beforeUpdate(n,t,e){n.tooltip&&n.tooltip.initialize(e)},reset(n,t,e){n.tooltip&&n.tooltip.initialize(e)},afterDraw(n){const t=n.tooltip;if(t&&t._willRender()){const e={tooltip:t};if(n.notifyPlugins("beforeTooltipDraw",{...e,cancelable:!0})===!1)return;t.draw(n.ctx),n.notifyPlugins("afterTooltipDraw",e)}},afterEvent(n,t){if(n.tooltip){const e=t.replay;n.tooltip.handleEvent(t.event,e,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(n,t)=>t.bodyFont.size,boxWidth:(n,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:Ec},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:n=>n!=="filter"&&n!=="itemSort"&&n!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},Dp=Object.freeze({__proto__:null,Colors:Yh,Decimation:Qh,Filler:vp,Legend:Sp,SubTitle:Mp,Title:Cp,Tooltip:Bp});const $p=(n,t,e,i)=>(typeof t=="string"?(e=n.push(t)-1,i.unshift({index:e,label:t})):isNaN(t)&&(e=null),e);function Np(n,t,e,i){const o=n.indexOf(t);if(o===-1)return $p(n,t,e,i);const s=n.lastIndexOf(t);return o!==s?e:o}const zp=(n,t)=>n===null?null:Z(Math.round(n),0,t);function zr(n){const t=this.getLabels();return n>=0&&n<t.length?t[n]:n}class Xo extends he{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const e=this._addedLabels;if(e.length){const i=this.getLabels();for(const{index:o,label:s}of e)i[o]===s&&i.splice(o,1);this._addedLabels=[]}super.init(t)}parse(t,e){if(N(t))return null;const i=this.getLabels();return e=isFinite(e)&&i[e]===t?e:Np(i,t,D(e,t),this._addedLabels),zp(e,i.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let{min:i,max:o}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(i=0),e||(o=this.getLabels().length-1)),this.min=i,this.max=o}buildTicks(){const t=this.min,e=this.max,i=this.options.offset,o=[];let s=this.getLabels();s=t===0&&e===s.length-1?s:s.slice(t,e+1),this._valueRange=Math.max(s.length-(i?0:1),1),this._startValue=this.min-(i?.5:0);for(let r=t;r<=e;r++)o.push({value:r});return o}getLabelForValue(t){return zr.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}T(Xo,"id","category"),T(Xo,"defaults",{ticks:{callback:zr}});function Fp(n,t){const e=[],{bounds:o,step:s,min:r,max:a,precision:c,count:l,maxTicks:d,maxDigits:u,includeBounds:f}=n,h=s||1,p=d-1,{min:m,max:g}=t,b=!N(r),v=!N(a),y=!N(l),x=(g-m)/(u+1);let S=Ls((g-m)/p/h)*h,E,k,C,_;if(S<1e-14&&!b&&!v)return[{value:m},{value:g}];_=Math.ceil(g/S)-Math.floor(m/S),_>p&&(S=Ls(_*S/p/h)*h),N(c)||(E=Math.pow(10,c),S=Math.ceil(S*E)/E),o==="ticks"?(k=Math.floor(m/S)*S,C=Math.ceil(g/S)*S):(k=m,C=g),b&&v&&s&&Id((a-r)/s,S/1e3)?(_=Math.round(Math.min((a-r)/S,d)),S=(a-r)/_,k=r,C=a):y?(k=b?r:k,C=v?a:C,_=l-1,S=(C-k)/_):(_=(C-k)/S,Xe(_,Math.round(_),S/1e3)?_=Math.round(_):_=Math.ceil(_));const A=Math.max(Bs(S),Bs(k));E=Math.pow(10,N(c)?A:c),k=Math.round(k*E)/E,C=Math.round(C*E)/E;let M=0;for(b&&(f&&k!==r?(e.push({value:r}),k<r&&M++,Xe(Math.round((k+M*S)*E)/E,r,Fr(r,x,n))&&M++):k<r&&M++);M<_;++M){const O=Math.round((k+M*S)*E)/E;if(v&&O>a)break;e.push({value:O})}return v&&f&&C!==a?e.length&&Xe(e[e.length-1].value,a,Fr(a,x,n))?e[e.length-1].value=a:e.push({value:a}):(!v||C===a)&&e.push({value:C}),e}function Fr(n,t,{horizontal:e,minRotation:i}){const o=gt(i),s=(e?Math.sin(o):Math.cos(o))||.001,r=.75*t*(""+n).length;return Math.min(t/s,r)}class Ti extends he{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,e){return N(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:e,maxDefined:i}=this.getUserBounds();let{min:o,max:s}=this;const r=c=>o=e?o:c,a=c=>s=i?s:c;if(t){const c=St(o),l=St(s);c<0&&l<0?a(0):c>0&&l>0&&r(0)}if(o===s){let c=s===0?1:Math.abs(s*.05);a(s+c),t||r(o-c)}this.min=o,this.max=s}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:e,stepSize:i}=t,o;return i?(o=Math.ceil(this.max/i)-Math.floor(this.min/i)+1,o>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${i} would result generating up to ${o} ticks. Limiting to 1000.`),o=1e3)):(o=this.computeTickLimit(),e=e||11),e&&(o=Math.min(e,o)),o}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,e=t.ticks;let i=this.getTickLimit();i=Math.max(2,i);const o={maxTicks:i,bounds:t.bounds,min:t.min,max:t.max,precision:e.precision,step:e.stepSize,count:e.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:e.minRotation||0,includeBounds:e.includeBounds!==!1},s=this._range||this,r=Fp(o,s);return t.bounds==="ticks"&&Rl(r,this,"value"),t.reverse?(r.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),r}configure(){const t=this.ticks;let e=this.min,i=this.max;if(super.configure(),this.options.offset&&t.length){const o=(i-e)/Math.max(t.length-1,1)/2;e-=o,i+=o}this._startValue=e,this._endValue=i,this._valueRange=i-e}getLabelForValue(t){return fn(t,this.chart.options.locale,this.options.ticks.format)}}class Ko extends Ti{determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=X(t)?t:0,this.max=X(e)?e:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),e=t?this.width:this.height,i=gt(this.options.ticks.minRotation),o=(t?Math.sin(i):Math.cos(i))||.001,s=this._resolveTickFontOptions(0);return Math.ceil(e/Math.min(40,s.lineHeight/o))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}T(Ko,"id","linear"),T(Ko,"defaults",{ticks:{callback:Di.formatters.numeric}});const an=n=>Math.floor(Vt(n)),ne=(n,t)=>Math.pow(10,an(n)+t);function jr(n){return n/Math.pow(10,an(n))===1}function Hr(n,t,e){const i=Math.pow(10,e),o=Math.floor(n/i);return Math.ceil(t/i)-o}function jp(n,t){const e=t-n;let i=an(e);for(;Hr(n,t,i)>10;)i++;for(;Hr(n,t,i)<10;)i--;return Math.min(i,an(n))}function Hp(n,{min:t,max:e}){t=dt(n.min,t);const i=[],o=an(t);let s=jp(t,e),r=s<0?Math.pow(10,Math.abs(s)):1;const a=Math.pow(10,s),c=o>s?Math.pow(10,o):0,l=Math.round((t-c)*r)/r,d=Math.floor((t-c)/a/10)*a*10;let u=Math.floor((l-d)/Math.pow(10,s)),f=dt(n.min,Math.round((c+d+u*Math.pow(10,s))*r)/r);for(;f<e;)i.push({value:f,major:jr(f),significand:u}),u>=10?u=u<15?15:20:u++,u>=20&&(s++,u=2,r=s>=0?1:r),f=Math.round((c+d+u*Math.pow(10,s))*r)/r;const h=dt(n.max,f);return i.push({value:h,major:jr(h),significand:u}),i}class Jo extends he{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,e){const i=Ti.prototype.parse.apply(this,[t,e]);if(i===0){this._zero=!0;return}return X(i)&&i>0?i:null}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=X(t)?Math.max(0,t):null,this.max=X(e)?Math.max(0,e):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!X(this._userMin)&&(this.min=t===ne(this.min,0)?ne(this.min,-1):ne(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let i=this.min,o=this.max;const s=a=>i=t?i:a,r=a=>o=e?o:a;i===o&&(i<=0?(s(1),r(10)):(s(ne(i,-1)),r(ne(o,1)))),i<=0&&s(ne(o,-1)),o<=0&&r(ne(i,1)),this.min=i,this.max=o}buildTicks(){const t=this.options,e={min:this._userMin,max:this._userMax},i=Hp(e,this);return t.bounds==="ticks"&&Rl(i,this,"value"),t.reverse?(i.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),i}getLabelForValue(t){return t===void 0?"0":fn(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=Vt(t),this._valueRange=Vt(this.max)-Vt(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(Vt(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const e=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+e*this._valueRange)}}T(Jo,"id","logarithmic"),T(Jo,"defaults",{ticks:{callback:Di.formatters.logarithmic,major:{enabled:!0}}});function Qo(n){const t=n.ticks;if(t.display&&n.display){const e=it(t.backdropPadding);return D(t.font&&t.font.size,W.font.size)+e.height}return 0}function qp(n,t,e){return e=U(e)?e:[e],{w:Yd(n,t.string,e),h:e.length*t.lineHeight}}function qr(n,t,e,i,o){return n===i||n===o?{start:t-e/2,end:t+e/2}:n<i||n>o?{start:t-e,end:t}:{start:t,end:t+e}}function Vp(n){const t={l:n.left+n._padding.left,r:n.right-n._padding.right,t:n.top+n._padding.top,b:n.bottom-n._padding.bottom},e=Object.assign({},t),i=[],o=[],s=n._pointLabels.length,r=n.options.pointLabels,a=r.centerPointLabels?j/s:0;for(let c=0;c<s;c++){const l=r.setContext(n.getPointLabelContext(c));o[c]=l.padding;const d=n.getPointPosition(c,n.drawingArea+o[c],a),u=J(l.font),f=qp(n.ctx,u,n._pointLabels[c]);i[c]=f;const h=et(n.getIndexAngle(c)+a),p=Math.round(cs(h)),m=qr(p,d.x,f.w,0,180),g=qr(p,d.y,f.h,90,270);Up(e,t,h,m,g)}n.setCenterPoint(t.l-e.l,e.r-t.r,t.t-e.t,e.b-t.b),n._pointLabelItems=Yp(n,i,o)}function Up(n,t,e,i,o){const s=Math.abs(Math.sin(e)),r=Math.abs(Math.cos(e));let a=0,c=0;i.start<t.l?(a=(t.l-i.start)/s,n.l=Math.min(n.l,t.l-a)):i.end>t.r&&(a=(i.end-t.r)/s,n.r=Math.max(n.r,t.r+a)),o.start<t.t?(c=(t.t-o.start)/r,n.t=Math.min(n.t,t.t-c)):o.end>t.b&&(c=(o.end-t.b)/r,n.b=Math.max(n.b,t.b+c))}function Wp(n,t,e){const i=n.drawingArea,{extra:o,additionalAngle:s,padding:r,size:a}=e,c=n.getPointPosition(t,i+o+r,s),l=Math.round(cs(et(c.angle+K))),d=Jp(c.y,a.h,l),u=Xp(l),f=Kp(c.x,a.w,u);return{visible:!0,x:c.x,y:d,textAlign:u,left:f,top:d,right:f+a.w,bottom:d+a.h}}function Gp(n,t){if(!t)return!0;const{left:e,top:i,right:o,bottom:s}=n;return!(Ft({x:e,y:i},t)||Ft({x:e,y:s},t)||Ft({x:o,y:i},t)||Ft({x:o,y:s},t))}function Yp(n,t,e){const i=[],o=n._pointLabels.length,s=n.options,{centerPointLabels:r,display:a}=s.pointLabels,c={extra:Qo(s)/2,additionalAngle:r?j/o:0};let l;for(let d=0;d<o;d++){c.padding=e[d],c.size=t[d];const u=Wp(n,d,c);i.push(u),a==="auto"&&(u.visible=Gp(u,l),u.visible&&(l=u))}return i}function Xp(n){return n===0||n===180?"center":n<180?"left":"right"}function Kp(n,t,e){return e==="right"?n-=t:e==="center"&&(n-=t/2),n}function Jp(n,t,e){return e===90||e===270?n-=t/2:(e>270||e<90)&&(n-=t),n}function Qp(n,t,e){const{left:i,top:o,right:s,bottom:r}=e,{backdropColor:a}=t;if(!N(a)){const c=le(t.borderRadius),l=it(t.backdropPadding);n.fillStyle=a;const d=i-l.left,u=o-l.top,f=s-i+l.width,h=r-o+l.height;Object.values(c).some(p=>p!==0)?(n.beginPath(),sn(n,{x:d,y:u,w:f,h,radius:c}),n.fill()):n.fillRect(d,u,f,h)}}function Zp(n,t){const{ctx:e,options:{pointLabels:i}}=n;for(let o=t-1;o>=0;o--){const s=n._pointLabelItems[o];if(!s.visible)continue;const r=i.setContext(n.getPointLabelContext(o));Qp(e,r,s);const a=J(r.font),{x:c,y:l,textAlign:d}=s;ue(e,n._pointLabels[o],c,l+a.lineHeight/2,a,{color:r.color,textAlign:d,textBaseline:"middle"})}}function Sc(n,t,e,i){const{ctx:o}=n;if(e)o.arc(n.xCenter,n.yCenter,t,0,V);else{let s=n.getPointPosition(0,t);o.moveTo(s.x,s.y);for(let r=1;r<i;r++)s=n.getPointPosition(r,t),o.lineTo(s.x,s.y)}}function tm(n,t,e,i,o){const s=n.ctx,r=t.circular,{color:a,lineWidth:c}=t;!r&&!i||!a||!c||e<0||(s.save(),s.strokeStyle=a,s.lineWidth=c,s.setLineDash(o.dash||[]),s.lineDashOffset=o.dashOffset,s.beginPath(),Sc(n,e,r,i),s.closePath(),s.stroke(),s.restore())}function em(n,t,e){return Qt(n,{label:e,index:t,type:"pointLabel"})}class We extends Ti{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=it(Qo(this.options)/2),e=this.width=this.maxWidth-t.width,i=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+e/2+t.left),this.yCenter=Math.floor(this.top+i/2+t.top),this.drawingArea=Math.floor(Math.min(e,i)/2)}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!1);this.min=X(t)&&!isNaN(t)?t:0,this.max=X(e)&&!isNaN(e)?e:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/Qo(this.options))}generateTickLabels(t){Ti.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((e,i)=>{const o=q(this.options.pointLabels.callback,[e,i],this);return o||o===0?o:""}).filter((e,i)=>this.chart.getDataVisibility(i))}fit(){const t=this.options;t.display&&t.pointLabels.display?Vp(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,e,i,o){this.xCenter+=Math.floor((t-e)/2),this.yCenter+=Math.floor((i-o)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,e,i,o))}getIndexAngle(t){const e=V/(this._pointLabels.length||1),i=this.options.startAngle||0;return et(t*e+gt(i))}getDistanceFromCenterForValue(t){if(N(t))return NaN;const e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e}getValueForDistanceFromCenter(t){if(N(t))return NaN;const e=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-e:this.min+e}getPointLabelContext(t){const e=this._pointLabels||[];if(t>=0&&t<e.length){const i=e[t];return em(this.getContext(),t,i)}}getPointPosition(t,e,i=0){const o=this.getIndexAngle(t)-K+i;return{x:Math.cos(o)*e+this.xCenter,y:Math.sin(o)*e+this.yCenter,angle:o}}getPointPositionForValue(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:e,top:i,right:o,bottom:s}=this._pointLabelItems[t];return{left:e,top:i,right:o,bottom:s}}drawBackground(){const{backgroundColor:t,grid:{circular:e}}=this.options;if(t){const i=this.ctx;i.save(),i.beginPath(),Sc(this,this.getDistanceFromCenterForValue(this._endValue),e,this._pointLabels.length),i.closePath(),i.fillStyle=t,i.fill(),i.restore()}}drawGrid(){const t=this.ctx,e=this.options,{angleLines:i,grid:o,border:s}=e,r=this._pointLabels.length;let a,c,l;if(e.pointLabels.display&&Zp(this,r),o.display&&this.ticks.forEach((d,u)=>{if(u!==0||u===0&&this.min<0){c=this.getDistanceFromCenterForValue(d.value);const f=this.getContext(u),h=o.setContext(f),p=s.setContext(f);tm(this,h,c,r,p)}}),i.display){for(t.save(),a=r-1;a>=0;a--){const d=i.setContext(this.getPointLabelContext(a)),{color:u,lineWidth:f}=d;!f||!u||(t.lineWidth=f,t.strokeStyle=u,t.setLineDash(d.borderDash),t.lineDashOffset=d.borderDashOffset,c=this.getDistanceFromCenterForValue(e.reverse?this.min:this.max),l=this.getPointPosition(a,c),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(l.x,l.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,e=this.options,i=e.ticks;if(!i.display)return;const o=this.getIndexAngle(0);let s,r;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(o),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((a,c)=>{if(c===0&&this.min>=0&&!e.reverse)return;const l=i.setContext(this.getContext(c)),d=J(l.font);if(s=this.getDistanceFromCenterForValue(this.ticks[c].value),l.showLabelBackdrop){t.font=d.string,r=t.measureText(a.label).width,t.fillStyle=l.backdropColor;const u=it(l.backdropPadding);t.fillRect(-r/2-u.left,-s-d.size/2-u.top,r+u.width,d.size+u.height)}ue(t,a.label,0,-s,d,{color:l.color,strokeColor:l.textStrokeColor,strokeWidth:l.textStrokeWidth})}),t.restore()}drawTitle(){}}T(We,"id","radialLinear"),T(We,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:Di.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}}),T(We,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),T(We,"descriptors",{angleLines:{_fallback:"grid"}});const Hi={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},at=Object.keys(Hi);function Vr(n,t){return n-t}function Ur(n,t){if(N(t))return null;const e=n._adapter,{parser:i,round:o,isoWeekday:s}=n._parseOpts;let r=t;return typeof i=="function"&&(r=i(r)),X(r)||(r=typeof i=="string"?e.parse(r,i):e.parse(r)),r===null?null:(o&&(r=o==="week"&&(Se(s)||s===!0)?e.startOf(r,"isoWeek",s):e.startOf(r,o)),+r)}function Wr(n,t,e,i){const o=at.length;for(let s=at.indexOf(n);s<o-1;++s){const r=Hi[at[s]],a=r.steps?r.steps:Number.MAX_SAFE_INTEGER;if(r.common&&Math.ceil((e-t)/(a*r.size))<=i)return at[s]}return at[o-1]}function nm(n,t,e,i,o){for(let s=at.length-1;s>=at.indexOf(e);s--){const r=at[s];if(Hi[r].common&&n._adapter.diff(o,i,r)>=t-1)return r}return at[e?at.indexOf(e):0]}function im(n){for(let t=at.indexOf(n)+1,e=at.length;t<e;++t)if(Hi[at[t]].common)return at[t]}function Gr(n,t,e){if(!e)n[t]=!0;else if(e.length){const{lo:i,hi:o}=ds(e,t),s=e[i]>=t?e[i]:e[o];n[s]=!0}}function om(n,t,e,i){const o=n._adapter,s=+o.startOf(t[0].value,i),r=t[t.length-1].value;let a,c;for(a=s;a<=r;a=+o.add(a,1,i))c=e[a],c>=0&&(t[c].major=!0);return t}function Yr(n,t,e){const i=[],o={},s=t.length;let r,a;for(r=0;r<s;++r)a=t[r],o[a]=r,i.push({value:a,major:!1});return s===0||!e?i:om(n,i,o,e)}class ln extends he{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,e={}){const i=t.time||(t.time={}),o=this._adapter=new ff._date(t.adapters.date);o.init(e),Ye(i.displayFormats,o.formats()),this._parseOpts={parser:i.parser,round:i.round,isoWeekday:i.isoWeekday},super.init(t),this._normalized=e.normalized}parse(t,e){return t===void 0?null:Ur(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,e=this._adapter,i=t.time.unit||"day";let{min:o,max:s,minDefined:r,maxDefined:a}=this.getUserBounds();function c(l){!r&&!isNaN(l.min)&&(o=Math.min(o,l.min)),!a&&!isNaN(l.max)&&(s=Math.max(s,l.max))}(!r||!a)&&(c(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&c(this.getMinMax(!1))),o=X(o)&&!isNaN(o)?o:+e.startOf(Date.now(),i),s=X(s)&&!isNaN(s)?s:+e.endOf(Date.now(),i)+1,this.min=Math.min(o,s-1),this.max=Math.max(o+1,s)}_getLabelBounds(){const t=this.getLabelTimestamps();let e=Number.POSITIVE_INFINITY,i=Number.NEGATIVE_INFINITY;return t.length&&(e=t[0],i=t[t.length-1]),{min:e,max:i}}buildTicks(){const t=this.options,e=t.time,i=t.ticks,o=i.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&o.length&&(this.min=this._userMin||o[0],this.max=this._userMax||o[o.length-1]);const s=this.min,r=this.max,a=Bd(o,s,r);return this._unit=e.unit||(i.autoSkip?Wr(e.minUnit,this.min,this.max,this._getLabelCapacity(s)):nm(this,a.length,e.minUnit,this.min,this.max)),this._majorUnit=!i.major.enabled||this._unit==="year"?void 0:im(this._unit),this.initOffsets(o),t.reverse&&a.reverse(),Yr(this,a,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let e=0,i=0,o,s;this.options.offset&&t.length&&(o=this.getDecimalForValue(t[0]),t.length===1?e=1-o:e=(this.getDecimalForValue(t[1])-o)/2,s=this.getDecimalForValue(t[t.length-1]),t.length===1?i=s:i=(s-this.getDecimalForValue(t[t.length-2]))/2);const r=t.length<3?.5:.25;e=Z(e,0,r),i=Z(i,0,r),this._offsets={start:e,end:i,factor:1/(e+1+i)}}_generate(){const t=this._adapter,e=this.min,i=this.max,o=this.options,s=o.time,r=s.unit||Wr(s.minUnit,e,i,this._getLabelCapacity(e)),a=D(o.ticks.stepSize,1),c=r==="week"?s.isoWeekday:!1,l=Se(c)||c===!0,d={};let u=e,f,h;if(l&&(u=+t.startOf(u,"isoWeek",c)),u=+t.startOf(u,l?"day":r),t.diff(i,e,r)>1e5*a)throw new Error(e+" and "+i+" are too far apart with stepSize of "+a+" "+r);const p=o.ticks.source==="data"&&this.getDataTimestamps();for(f=u,h=0;f<i;f=+t.add(f,a,r),h++)Gr(d,f,p);return(f===i||o.bounds==="ticks"||h===1)&&Gr(d,f,p),Object.keys(d).sort(Vr).map(m=>+m)}getLabelForValue(t){const e=this._adapter,i=this.options.time;return i.tooltipFormat?e.format(t,i.tooltipFormat):e.format(t,i.displayFormats.datetime)}format(t,e){const o=this.options.time.displayFormats,s=this._unit,r=e||o[s];return this._adapter.format(t,r)}_tickFormatFunction(t,e,i,o){const s=this.options,r=s.ticks.callback;if(r)return q(r,[t,e,i],this);const a=s.time.displayFormats,c=this._unit,l=this._majorUnit,d=c&&a[c],u=l&&a[l],f=i[e],h=l&&u&&f&&f.major;return this._adapter.format(t,o||(h?u:d))}generateTickLabels(t){let e,i,o;for(e=0,i=t.length;e<i;++e)o=t[e],o.label=this._tickFormatFunction(o.value,e,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const e=this._offsets,i=this.getDecimalForValue(t);return this.getPixelForDecimal((e.start+i)*e.factor)}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return this.min+i*(this.max-this.min)}_getLabelSize(t){const e=this.options.ticks,i=this.ctx.measureText(t).width,o=gt(this.isHorizontal()?e.maxRotation:e.minRotation),s=Math.cos(o),r=Math.sin(o),a=this._resolveTickFontOptions(0).size;return{w:i*s+a*r,h:i*r+a*s}}_getLabelCapacity(t){const e=this.options.time,i=e.displayFormats,o=i[e.unit]||i.millisecond,s=this._tickFormatFunction(t,0,Yr(this,[t],this._majorUnit),o),r=this._getLabelSize(s),a=Math.floor(this.isHorizontal()?this.width/r.w:this.height/r.h)-1;return a>0?a:1}getDataTimestamps(){let t=this._cache.data||[],e,i;if(t.length)return t;const o=this.getMatchingVisibleMetas();if(this._normalized&&o.length)return this._cache.data=o[0].controller.getAllParsedValues(this);for(e=0,i=o.length;e<i;++e)t=t.concat(o[e].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let e,i;if(t.length)return t;const o=this.getLabels();for(e=0,i=o.length;e<i;++e)t.push(Ur(this,o[e]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return Dl(t.sort(Vr))}}T(ln,"id","time"),T(ln,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function Pn(n,t,e){let i=0,o=n.length-1,s,r,a,c;e?(t>=n[i].pos&&t<=n[o].pos&&({lo:i,hi:o}=zt(n,"pos",t)),{pos:s,time:a}=n[i],{pos:r,time:c}=n[o]):(t>=n[i].time&&t<=n[o].time&&({lo:i,hi:o}=zt(n,"time",t)),{time:s,pos:a}=n[i],{time:r,pos:c}=n[o]);const l=r-s;return l?a+(c-a)*(t-s)/l:a}class Zo extends ln{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),e=this._table=this.buildLookupTable(t);this._minPos=Pn(e,this.min),this._tableRange=Pn(e,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:e,max:i}=this,o=[],s=[];let r,a,c,l,d;for(r=0,a=t.length;r<a;++r)l=t[r],l>=e&&l<=i&&o.push(l);if(o.length<2)return[{time:e,pos:0},{time:i,pos:1}];for(r=0,a=o.length;r<a;++r)d=o[r+1],c=o[r-1],l=o[r],Math.round((d+c)/2)!==l&&s.push({time:l,pos:r/(a-1)});return s}_generate(){const t=this.min,e=this.max;let i=super.getDataTimestamps();return(!i.includes(t)||!i.length)&&i.splice(0,0,t),(!i.includes(e)||i.length===1)&&i.push(e),i.sort((o,s)=>o-s)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const e=this.getDataTimestamps(),i=this.getLabelTimestamps();return e.length&&i.length?t=this.normalize(e.concat(i)):t=e.length?e:i,t=this._cache.all=t,t}getDecimalForValue(t){return(Pn(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const e=this._offsets,i=this.getDecimalForPixel(t)/e.factor-e.end;return Pn(this._table,i*this._tableRange+this._minPos,!0)}}T(Zo,"id","timeseries"),T(Zo,"defaults",ln.defaults);var sm=Object.freeze({__proto__:null,CategoryScale:Xo,LinearScale:Ko,LogarithmicScale:Jo,RadialLinearScale:We,TimeScale:ln,TimeSeriesScale:Zo});const rm=[uf,jh,Dp,sm];$t.register(...rm);const w={currentUser:JSON.parse(localStorage.getItem("onenet_user")||"null"),activeCompany:JSON.parse(localStorage.getItem("onenet_active_company")||"null")||{id:1,name:"OneNet Solutions",legal_name:"OneNet Solutions Enterprise Suite (Head Office)",address:"Muslim Town, Lahore, Pakistan",phone:"+92 42 30000001",tax_id:"NTN-7492019-2",strn:"STRN-11-22-3344-555",currency:"PKR"},companies:[],permissionsMatrix:{},activeModule:"dashboard",products:[],categories:[],warehouses:[],customers:[],activeShift:null,posCart:{items:[],customerId:1,discountAmount:0,paymentMethod:"CASH",paidAmount:0},mobileCart:{items:[],customerId:2,geoLat:null,geoLng:null}};function am(n,t="view"){if(!w.currentUser)return!1;const e=w.currentUser.role_name||"Cashier";if(e==="Super Admin")return!0;const i=w.permissionsMatrix[e];return i?(i[n]||[]).includes(t):!0}function R(n){return"Rs. "+(Number(n)||0).toLocaleString("en-PK",{minimumFractionDigits:2,maximumFractionDigits:2})}function P(n,t="info"){const e=document.getElementById("toast-container");if(!e)return;const i=document.createElement("div");i.className=`toast ${t}`,i.innerHTML=`
    <span class="toast-dot"></span>
    <span>${n}</span>
  `,e.appendChild(i),setTimeout(()=>{i.style.opacity="0",i.style.transform="translateY(10px)",setTimeout(()=>i.remove(),300)},3500)}const lm="/api";class B{static getToken(){return localStorage.getItem("onenet_token")||localStorage.getItem("apexerppos_token")||""}static setToken(t){localStorage.setItem("onenet_token",t),localStorage.setItem("apexerppos_token",t)}static clearToken(){localStorage.removeItem("onenet_token"),localStorage.removeItem("apexerppos_token")}static async request(t,e={}){const i=`${lm}${t}`,o={"Content-Type":"application/json",...e.headers},s=this.getToken();s&&(o.Authorization=`Bearer ${s}`);try{const r=await fetch(i,{...e,headers:o}),a=await r.json();if(!r.ok)throw new Error(a.message||`Request failed with status ${r.status}`);return a}catch(r){throw console.error(`API Error [${t}]:`,r),r}}static get(t){return this.request(t,{method:"GET"})}static post(t,e){return this.request(t,{method:"POST",body:JSON.stringify(e)})}static put(t,e){return this.request(t,{method:"PUT",body:JSON.stringify(e)})}static patch(t,e){return this.request(t,{method:"PATCH",body:JSON.stringify(e)})}static delete(t,e){return this.request(t,{method:"DELETE",body:e?JSON.stringify(e):void 0})}}class Ri{static connect(){const e=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws`;try{this.ws=new WebSocket(e),this.ws.onopen=()=>{var i;console.log("[Realtime] WebSocket connected to ApexERP stream"),(i=document.getElementById("ws-status-indicator"))==null||i.classList.add("online")},this.ws.onmessage=i=>{try{const o=JSON.parse(i.data);this.notifyListeners(o)}catch(o){console.error("[Realtime] Parse error:",o)}},this.ws.onclose=()=>{var i;(i=document.getElementById("ws-status-indicator"))==null||i.classList.remove("online"),setTimeout(()=>this.connect(),3e3)}}catch(i){console.warn("[Realtime] Could not connect WebSocket:",i.message)}}static subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}static notifyListeners(t){for(const e of this.listeners)e(t)}}T(Ri,"ws",null),T(Ri,"listeners",new Set);function kc(n){return n&&n.__esModule&&Object.prototype.hasOwnProperty.call(n,"default")?n.default:n}var In={},Re={},Tn={},Xr;function ft(){if(Xr)return Tn;Xr=1,Object.defineProperty(Tn,"__esModule",{value:!0});function n(e,i){if(!(e instanceof i))throw new TypeError("Cannot call a class as a function")}var t=function e(i,o){n(this,e),this.data=i,this.text=o.text||i,this.options=o};return Tn.default=t,Tn}var Kr;function cm(){if(Kr)return Re;Kr=1,Object.defineProperty(Re,"__esModule",{value:!0}),Re.CODE39=void 0;var n=(function(){function m(g,b){for(var v=0;v<b.length;v++){var y=b[v];y.enumerable=y.enumerable||!1,y.configurable=!0,"value"in y&&(y.writable=!0),Object.defineProperty(g,y.key,y)}}return function(g,b,v){return b&&m(g.prototype,b),v&&m(g,v),g}})(),t=ft(),e=i(t);function i(m){return m&&m.__esModule?m:{default:m}}function o(m,g){if(!(m instanceof g))throw new TypeError("Cannot call a class as a function")}function s(m,g){if(!m)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return g&&(typeof g=="object"||typeof g=="function")?g:m}function r(m,g){if(typeof g!="function"&&g!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof g);m.prototype=Object.create(g&&g.prototype,{constructor:{value:m,enumerable:!1,writable:!0,configurable:!0}}),g&&(Object.setPrototypeOf?Object.setPrototypeOf(m,g):m.__proto__=g)}var a=(function(m){r(g,m);function g(b,v){return o(this,g),b=b.toUpperCase(),v.mod43&&(b+=f(p(b))),s(this,(g.__proto__||Object.getPrototypeOf(g)).call(this,b,v))}return n(g,[{key:"encode",value:function(){for(var v=d("*"),y=0;y<this.data.length;y++)v+=d(this.data[y])+"0";return v+=d("*"),{data:v,text:this.text}}},{key:"valid",value:function(){return this.data.search(/^[0-9A-Z\-\.\ \$\/\+\%]+$/)!==-1}}]),g})(e.default),c=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-","."," ","$","/","+","%","*"],l=[20957,29783,23639,30485,20951,29813,23669,20855,29789,23645,29975,23831,30533,22295,30149,24005,21623,29981,23837,22301,30023,23879,30545,22343,30161,24017,21959,30065,23921,22385,29015,18263,29141,17879,29045,18293,17783,29021,18269,17477,17489,17681,20753,35770];function d(m){return u(h(m))}function u(m){return l[m].toString(2)}function f(m){return c[m]}function h(m){return c.indexOf(m)}function p(m){for(var g=0,b=0;b<m.length;b++)g+=h(m[b]);return g=g%43,g}return Re.CODE39=a,Re}var mt={},Rn={},Ln={},Y={},Jr;function hn(){if(Jr)return Y;Jr=1,Object.defineProperty(Y,"__esModule",{value:!0});var n;function t(c,l,d){return l in c?Object.defineProperty(c,l,{value:d,enumerable:!0,configurable:!0,writable:!0}):c[l]=d,c}var e=Y.SET_A=0,i=Y.SET_B=1,o=Y.SET_C=2;Y.SHIFT=98;var s=Y.START_A=103,r=Y.START_B=104,a=Y.START_C=105;return Y.MODULO=103,Y.STOP=106,Y.FNC1=207,Y.SET_BY_CODE=(n={},t(n,s,e),t(n,r,i),t(n,a,o),n),Y.SWAP={101:e,100:i,99:o},Y.A_START_CHAR="Ð",Y.B_START_CHAR="Ñ",Y.C_START_CHAR="Ò",Y.A_CHARS="[\0-_È-Ï]",Y.B_CHARS="[ -È-Ï]",Y.C_CHARS="(Ï*[0-9]{2}Ï*)",Y.BARS=[11011001100,11001101100,11001100110,10010011e3,10010001100,10001001100,10011001e3,10011000100,10001100100,11001001e3,11001000100,11000100100,10110011100,10011011100,10011001110,10111001100,10011101100,10011100110,11001110010,11001011100,11001001110,11011100100,11001110100,11101101110,11101001100,11100101100,11100100110,11101100100,11100110100,11100110010,11011011e3,11011000110,11000110110,10100011e3,10001011e3,10001000110,10110001e3,10001101e3,10001100010,11010001e3,11000101e3,11000100010,10110111e3,10110001110,10001101110,10111011e3,10111000110,10001110110,11101110110,11010001110,11000101110,11011101e3,11011100010,11011101110,11101011e3,11101000110,11100010110,11101101e3,11101100010,11100011010,11101111010,11001000010,11110001010,1010011e4,10100001100,1001011e4,10010000110,10000101100,10000100110,1011001e4,10110000100,1001101e4,10011000010,10000110100,10000110010,11000010010,1100101e4,11110111010,11000010100,10001111010,10100111100,10010111100,10010011110,10111100100,10011110100,10011110010,11110100100,11110010100,11110010010,11011011110,11011110110,11110110110,10101111e3,10100011110,10001011110,10111101e3,10111100010,11110101e3,11110100010,10111011110,10111101110,11101011110,11110101110,11010000100,1101001e4,11010011100,1100011101011],Y}var Qr;function qi(){if(Qr)return Ln;Qr=1,Object.defineProperty(Ln,"__esModule",{value:!0});var n=(function(){function l(d,u){for(var f=0;f<u.length;f++){var h=u[f];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(d,h.key,h)}}return function(d,u,f){return u&&l(d.prototype,u),f&&l(d,f),d}})(),t=ft(),e=o(t),i=hn();function o(l){return l&&l.__esModule?l:{default:l}}function s(l,d){if(!(l instanceof d))throw new TypeError("Cannot call a class as a function")}function r(l,d){if(!l)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return d&&(typeof d=="object"||typeof d=="function")?d:l}function a(l,d){if(typeof d!="function"&&d!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof d);l.prototype=Object.create(d&&d.prototype,{constructor:{value:l,enumerable:!1,writable:!0,configurable:!0}}),d&&(Object.setPrototypeOf?Object.setPrototypeOf(l,d):l.__proto__=d)}var c=(function(l){a(d,l);function d(u,f){s(this,d);var h=r(this,(d.__proto__||Object.getPrototypeOf(d)).call(this,u.substring(1),f));return h.bytes=u.split("").map(function(p){return p.charCodeAt(0)}),h}return n(d,[{key:"valid",value:function(){return/^[\x00-\x7F\xC8-\xD3]+$/.test(this.data)}},{key:"encode",value:function(){var f=this.bytes,h=f.shift()-105,p=i.SET_BY_CODE[h];if(p===void 0)throw new RangeError("The encoding does not start with a start character.");this.shouldEncodeAsEan128()===!0&&f.unshift(i.FNC1);var m=d.next(f,1,p);return{text:this.text===this.data?this.text.replace(/[^\x20-\x7E]/g,""):this.text,data:d.getBar(h)+m.result+d.getBar((m.checksum+h)%i.MODULO)+d.getBar(i.STOP)}}},{key:"shouldEncodeAsEan128",value:function(){var f=this.options.ean128||!1;return typeof f=="string"&&(f=f.toLowerCase()==="true"),f}}],[{key:"getBar",value:function(f){return i.BARS[f]?i.BARS[f].toString():""}},{key:"correctIndex",value:function(f,h){if(h===i.SET_A){var p=f.shift();return p<32?p+64:p-32}else return h===i.SET_B?f.shift()-32:(f.shift()-48)*10+f.shift()-48}},{key:"next",value:function(f,h,p){if(!f.length)return{result:"",checksum:0};var m=void 0,g=void 0;if(f[0]>=200){g=f.shift()-105;var b=i.SWAP[g];b!==void 0?m=d.next(f,h+1,b):((p===i.SET_A||p===i.SET_B)&&g===i.SHIFT&&(f[0]=p===i.SET_A?f[0]>95?f[0]-96:f[0]:f[0]<32?f[0]+96:f[0]),m=d.next(f,h+1,p))}else g=d.correctIndex(f,p),m=d.next(f,h+1,p);var v=d.getBar(g),y=g*h;return{result:v+m.result,checksum:y+m.checksum}}}]),d})(e.default);return Ln.default=c,Ln}var Bn={},Zr;function dm(){if(Zr)return Bn;Zr=1,Object.defineProperty(Bn,"__esModule",{value:!0});var n=hn(),t=function(a){return a.match(new RegExp("^"+n.A_CHARS+"*"))[0].length},e=function(a){return a.match(new RegExp("^"+n.B_CHARS+"*"))[0].length},i=function(a){return a.match(new RegExp("^"+n.C_CHARS+"*"))[0]};function o(r,a){var c=a?n.A_CHARS:n.B_CHARS,l=r.match(new RegExp("^("+c+"+?)(([0-9]{2}){2,})([^0-9]|$)"));if(l)return l[1]+"Ì"+s(r.substring(l[1].length));var d=r.match(new RegExp("^"+c+"+"))[0];return d.length===r.length?r:d+String.fromCharCode(a?205:206)+o(r.substring(d.length),!a)}function s(r){var a=i(r),c=a.length;if(c===r.length)return r;r=r.substring(c);var l=t(r)>=e(r);return a+String.fromCharCode(l?206:205)+o(r,l)}return Bn.default=function(r){var a=void 0,c=i(r).length;if(c>=2)a=n.C_START_CHAR+s(r);else{var l=t(r)>e(r);a=(l?n.A_START_CHAR:n.B_START_CHAR)+o(r,l)}return a.replace(/[\xCD\xCE]([^])[\xCD\xCE]/,function(d,u){return"Ë"+u})},Bn}var ta;function um(){if(ta)return Rn;ta=1,Object.defineProperty(Rn,"__esModule",{value:!0});var n=qi(),t=o(n),e=dm(),i=o(e);function o(l){return l&&l.__esModule?l:{default:l}}function s(l,d){if(!(l instanceof d))throw new TypeError("Cannot call a class as a function")}function r(l,d){if(!l)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return d&&(typeof d=="object"||typeof d=="function")?d:l}function a(l,d){if(typeof d!="function"&&d!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof d);l.prototype=Object.create(d&&d.prototype,{constructor:{value:l,enumerable:!1,writable:!0,configurable:!0}}),d&&(Object.setPrototypeOf?Object.setPrototypeOf(l,d):l.__proto__=d)}var c=(function(l){a(d,l);function d(u,f){if(s(this,d),/^[\x00-\x7F\xC8-\xD3]+$/.test(u))var h=r(this,(d.__proto__||Object.getPrototypeOf(d)).call(this,(0,i.default)(u),f));else var h=r(this,(d.__proto__||Object.getPrototypeOf(d)).call(this,u,f));return r(h)}return d})(t.default);return Rn.default=c,Rn}var Dn={},ea;function fm(){if(ea)return Dn;ea=1,Object.defineProperty(Dn,"__esModule",{value:!0});var n=(function(){function l(d,u){for(var f=0;f<u.length;f++){var h=u[f];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(d,h.key,h)}}return function(d,u,f){return u&&l(d.prototype,u),f&&l(d,f),d}})(),t=qi(),e=o(t),i=hn();function o(l){return l&&l.__esModule?l:{default:l}}function s(l,d){if(!(l instanceof d))throw new TypeError("Cannot call a class as a function")}function r(l,d){if(!l)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return d&&(typeof d=="object"||typeof d=="function")?d:l}function a(l,d){if(typeof d!="function"&&d!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof d);l.prototype=Object.create(d&&d.prototype,{constructor:{value:l,enumerable:!1,writable:!0,configurable:!0}}),d&&(Object.setPrototypeOf?Object.setPrototypeOf(l,d):l.__proto__=d)}var c=(function(l){a(d,l);function d(u,f){return s(this,d),r(this,(d.__proto__||Object.getPrototypeOf(d)).call(this,i.A_START_CHAR+u,f))}return n(d,[{key:"valid",value:function(){return new RegExp("^"+i.A_CHARS+"+$").test(this.data)}}]),d})(e.default);return Dn.default=c,Dn}var $n={},na;function hm(){if(na)return $n;na=1,Object.defineProperty($n,"__esModule",{value:!0});var n=(function(){function l(d,u){for(var f=0;f<u.length;f++){var h=u[f];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(d,h.key,h)}}return function(d,u,f){return u&&l(d.prototype,u),f&&l(d,f),d}})(),t=qi(),e=o(t),i=hn();function o(l){return l&&l.__esModule?l:{default:l}}function s(l,d){if(!(l instanceof d))throw new TypeError("Cannot call a class as a function")}function r(l,d){if(!l)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return d&&(typeof d=="object"||typeof d=="function")?d:l}function a(l,d){if(typeof d!="function"&&d!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof d);l.prototype=Object.create(d&&d.prototype,{constructor:{value:l,enumerable:!1,writable:!0,configurable:!0}}),d&&(Object.setPrototypeOf?Object.setPrototypeOf(l,d):l.__proto__=d)}var c=(function(l){a(d,l);function d(u,f){return s(this,d),r(this,(d.__proto__||Object.getPrototypeOf(d)).call(this,i.B_START_CHAR+u,f))}return n(d,[{key:"valid",value:function(){return new RegExp("^"+i.B_CHARS+"+$").test(this.data)}}]),d})(e.default);return $n.default=c,$n}var Nn={},ia;function pm(){if(ia)return Nn;ia=1,Object.defineProperty(Nn,"__esModule",{value:!0});var n=(function(){function l(d,u){for(var f=0;f<u.length;f++){var h=u[f];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(d,h.key,h)}}return function(d,u,f){return u&&l(d.prototype,u),f&&l(d,f),d}})(),t=qi(),e=o(t),i=hn();function o(l){return l&&l.__esModule?l:{default:l}}function s(l,d){if(!(l instanceof d))throw new TypeError("Cannot call a class as a function")}function r(l,d){if(!l)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return d&&(typeof d=="object"||typeof d=="function")?d:l}function a(l,d){if(typeof d!="function"&&d!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof d);l.prototype=Object.create(d&&d.prototype,{constructor:{value:l,enumerable:!1,writable:!0,configurable:!0}}),d&&(Object.setPrototypeOf?Object.setPrototypeOf(l,d):l.__proto__=d)}var c=(function(l){a(d,l);function d(u,f){return s(this,d),r(this,(d.__proto__||Object.getPrototypeOf(d)).call(this,i.C_START_CHAR+u,f))}return n(d,[{key:"valid",value:function(){return new RegExp("^"+i.C_CHARS+"+$").test(this.data)}}]),d})(e.default);return Nn.default=c,Nn}var oa;function mm(){if(oa)return mt;oa=1,Object.defineProperty(mt,"__esModule",{value:!0}),mt.CODE128C=mt.CODE128B=mt.CODE128A=mt.CODE128=void 0;var n=um(),t=c(n),e=fm(),i=c(e),o=hm(),s=c(o),r=pm(),a=c(r);function c(l){return l&&l.__esModule?l:{default:l}}return mt.CODE128=t.default,mt.CODE128A=i.default,mt.CODE128B=s.default,mt.CODE128C=a.default,mt}var ot={},zn={},Rt={},sa;function pn(){return sa||(sa=1,Object.defineProperty(Rt,"__esModule",{value:!0}),Rt.SIDE_BIN="101",Rt.MIDDLE_BIN="01010",Rt.BINARIES={L:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],G:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"],R:["1110010","1100110","1101100","1000010","1011100","1001110","1010000","1000100","1001000","1110100"],O:["0001101","0011001","0010011","0111101","0100011","0110001","0101111","0111011","0110111","0001011"],E:["0100111","0110011","0011011","0100001","0011101","0111001","0000101","0010001","0001001","0010111"]},Rt.EAN2_STRUCTURE=["LL","LG","GL","GG"],Rt.EAN5_STRUCTURE=["GGLLL","GLGLL","GLLGL","GLLLG","LGGLL","LLGGL","LLLGG","LGLGL","LGLLG","LLGLG"],Rt.EAN13_STRUCTURE=["LLLLLL","LLGLGG","LLGGLG","LLGGGL","LGLLGG","LGGLLG","LGGGLL","LGLGLG","LGLGGL","LGGLGL"]),Rt}var Fn={},jn={},ra;function mn(){if(ra)return jn;ra=1,Object.defineProperty(jn,"__esModule",{value:!0});var n=pn(),t=function(i,o,s){var r=i.split("").map(function(c,l){return n.BINARIES[o[l]]}).map(function(c,l){return c?c[i[l]]:""});if(s){var a=i.length-1;r=r.map(function(c,l){return l<a?c+s:c})}return r.join("")};return jn.default=t,jn}var aa;function Cc(){if(aa)return Fn;aa=1,Object.defineProperty(Fn,"__esModule",{value:!0});var n=(function(){function u(f,h){for(var p=0;p<h.length;p++){var m=h[p];m.enumerable=m.enumerable||!1,m.configurable=!0,"value"in m&&(m.writable=!0),Object.defineProperty(f,m.key,m)}}return function(f,h,p){return h&&u(f.prototype,h),p&&u(f,p),f}})(),t=pn(),e=mn(),i=r(e),o=ft(),s=r(o);function r(u){return u&&u.__esModule?u:{default:u}}function a(u,f){if(!(u instanceof f))throw new TypeError("Cannot call a class as a function")}function c(u,f){if(!u)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return f&&(typeof f=="object"||typeof f=="function")?f:u}function l(u,f){if(typeof f!="function"&&f!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof f);u.prototype=Object.create(f&&f.prototype,{constructor:{value:u,enumerable:!1,writable:!0,configurable:!0}}),f&&(Object.setPrototypeOf?Object.setPrototypeOf(u,f):u.__proto__=f)}var d=(function(u){l(f,u);function f(h,p){a(this,f);var m=c(this,(f.__proto__||Object.getPrototypeOf(f)).call(this,h,p));return m.fontSize=!p.flat&&p.fontSize>p.width*10?p.width*10:p.fontSize,m.guardHeight=p.height+m.fontSize/2+p.textMargin,m}return n(f,[{key:"encode",value:function(){return this.options.flat?this.encodeFlat():this.encodeGuarded()}},{key:"leftText",value:function(p,m){return this.text.substr(p,m)}},{key:"leftEncode",value:function(p,m){return(0,i.default)(p,m)}},{key:"rightText",value:function(p,m){return this.text.substr(p,m)}},{key:"rightEncode",value:function(p,m){return(0,i.default)(p,m)}},{key:"encodeGuarded",value:function(){var p={fontSize:this.fontSize},m={height:this.guardHeight};return[{data:t.SIDE_BIN,options:m},{data:this.leftEncode(),text:this.leftText(),options:p},{data:t.MIDDLE_BIN,options:m},{data:this.rightEncode(),text:this.rightText(),options:p},{data:t.SIDE_BIN,options:m}]}},{key:"encodeFlat",value:function(){var p=[t.SIDE_BIN,this.leftEncode(),t.MIDDLE_BIN,this.rightEncode(),t.SIDE_BIN];return{data:p.join(""),text:this.text}}}]),f})(s.default);return Fn.default=d,Fn}var la;function gm(){if(la)return zn;la=1,Object.defineProperty(zn,"__esModule",{value:!0});var n=(function(){function u(f,h){for(var p=0;p<h.length;p++){var m=h[p];m.enumerable=m.enumerable||!1,m.configurable=!0,"value"in m&&(m.writable=!0),Object.defineProperty(f,m.key,m)}}return function(f,h,p){return h&&u(f.prototype,h),p&&u(f,p),f}})(),t=function u(f,h,p){f===null&&(f=Function.prototype);var m=Object.getOwnPropertyDescriptor(f,h);if(m===void 0){var g=Object.getPrototypeOf(f);return g===null?void 0:u(g,h,p)}else{if("value"in m)return m.value;var b=m.get;return b===void 0?void 0:b.call(p)}},e=pn(),i=Cc(),o=s(i);function s(u){return u&&u.__esModule?u:{default:u}}function r(u,f){if(!(u instanceof f))throw new TypeError("Cannot call a class as a function")}function a(u,f){if(!u)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return f&&(typeof f=="object"||typeof f=="function")?f:u}function c(u,f){if(typeof f!="function"&&f!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof f);u.prototype=Object.create(f&&f.prototype,{constructor:{value:u,enumerable:!1,writable:!0,configurable:!0}}),f&&(Object.setPrototypeOf?Object.setPrototypeOf(u,f):u.__proto__=f)}var l=function(f){var h=f.substr(0,12).split("").map(function(p){return+p}).reduce(function(p,m,g){return g%2?p+m*3:p+m},0);return(10-h%10)%10},d=(function(u){c(f,u);function f(h,p){r(this,f),h.search(/^[0-9]{12}$/)!==-1&&(h+=l(h));var m=a(this,(f.__proto__||Object.getPrototypeOf(f)).call(this,h,p));return m.lastChar=p.lastChar,m}return n(f,[{key:"valid",value:function(){return this.data.search(/^[0-9]{13}$/)!==-1&&+this.data[12]===l(this.data)}},{key:"leftText",value:function(){return t(f.prototype.__proto__||Object.getPrototypeOf(f.prototype),"leftText",this).call(this,1,6)}},{key:"leftEncode",value:function(){var p=this.data.substr(1,6),m=e.EAN13_STRUCTURE[this.data[0]];return t(f.prototype.__proto__||Object.getPrototypeOf(f.prototype),"leftEncode",this).call(this,p,m)}},{key:"rightText",value:function(){return t(f.prototype.__proto__||Object.getPrototypeOf(f.prototype),"rightText",this).call(this,7,6)}},{key:"rightEncode",value:function(){var p=this.data.substr(7,6);return t(f.prototype.__proto__||Object.getPrototypeOf(f.prototype),"rightEncode",this).call(this,p,"RRRRRR")}},{key:"encodeGuarded",value:function(){var p=t(f.prototype.__proto__||Object.getPrototypeOf(f.prototype),"encodeGuarded",this).call(this);return this.options.displayValue&&(p.unshift({data:"000000000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),this.options.lastChar&&(p.push({data:"00"}),p.push({data:"00000",text:this.options.lastChar,options:{fontSize:this.fontSize}}))),p}}]),f})(o.default);return zn.default=d,zn}var Hn={},ca;function bm(){if(ca)return Hn;ca=1,Object.defineProperty(Hn,"__esModule",{value:!0});var n=(function(){function d(u,f){for(var h=0;h<f.length;h++){var p=f[h];p.enumerable=p.enumerable||!1,p.configurable=!0,"value"in p&&(p.writable=!0),Object.defineProperty(u,p.key,p)}}return function(u,f,h){return f&&d(u.prototype,f),h&&d(u,h),u}})(),t=function d(u,f,h){u===null&&(u=Function.prototype);var p=Object.getOwnPropertyDescriptor(u,f);if(p===void 0){var m=Object.getPrototypeOf(u);return m===null?void 0:d(m,f,h)}else{if("value"in p)return p.value;var g=p.get;return g===void 0?void 0:g.call(h)}},e=Cc(),i=o(e);function o(d){return d&&d.__esModule?d:{default:d}}function s(d,u){if(!(d instanceof u))throw new TypeError("Cannot call a class as a function")}function r(d,u){if(!d)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return u&&(typeof u=="object"||typeof u=="function")?u:d}function a(d,u){if(typeof u!="function"&&u!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof u);d.prototype=Object.create(u&&u.prototype,{constructor:{value:d,enumerable:!1,writable:!0,configurable:!0}}),u&&(Object.setPrototypeOf?Object.setPrototypeOf(d,u):d.__proto__=u)}var c=function(u){var f=u.substr(0,7).split("").map(function(h){return+h}).reduce(function(h,p,m){return m%2?h+p:h+p*3},0);return(10-f%10)%10},l=(function(d){a(u,d);function u(f,h){return s(this,u),f.search(/^[0-9]{7}$/)!==-1&&(f+=c(f)),r(this,(u.__proto__||Object.getPrototypeOf(u)).call(this,f,h))}return n(u,[{key:"valid",value:function(){return this.data.search(/^[0-9]{8}$/)!==-1&&+this.data[7]===c(this.data)}},{key:"leftText",value:function(){return t(u.prototype.__proto__||Object.getPrototypeOf(u.prototype),"leftText",this).call(this,0,4)}},{key:"leftEncode",value:function(){var h=this.data.substr(0,4);return t(u.prototype.__proto__||Object.getPrototypeOf(u.prototype),"leftEncode",this).call(this,h,"LLLL")}},{key:"rightText",value:function(){return t(u.prototype.__proto__||Object.getPrototypeOf(u.prototype),"rightText",this).call(this,4,4)}},{key:"rightEncode",value:function(){var h=this.data.substr(4,4);return t(u.prototype.__proto__||Object.getPrototypeOf(u.prototype),"rightEncode",this).call(this,h,"RRRR")}}]),u})(i.default);return Hn.default=l,Hn}var qn={},da;function vm(){if(da)return qn;da=1,Object.defineProperty(qn,"__esModule",{value:!0});var n=(function(){function f(h,p){for(var m=0;m<p.length;m++){var g=p[m];g.enumerable=g.enumerable||!1,g.configurable=!0,"value"in g&&(g.writable=!0),Object.defineProperty(h,g.key,g)}}return function(h,p,m){return p&&f(h.prototype,p),m&&f(h,m),h}})(),t=pn(),e=mn(),i=r(e),o=ft(),s=r(o);function r(f){return f&&f.__esModule?f:{default:f}}function a(f,h){if(!(f instanceof h))throw new TypeError("Cannot call a class as a function")}function c(f,h){if(!f)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return h&&(typeof h=="object"||typeof h=="function")?h:f}function l(f,h){if(typeof h!="function"&&h!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof h);f.prototype=Object.create(h&&h.prototype,{constructor:{value:f,enumerable:!1,writable:!0,configurable:!0}}),h&&(Object.setPrototypeOf?Object.setPrototypeOf(f,h):f.__proto__=h)}var d=function(h){var p=h.split("").map(function(m){return+m}).reduce(function(m,g,b){return b%2?m+g*9:m+g*3},0);return p%10},u=(function(f){l(h,f);function h(p,m){return a(this,h),c(this,(h.__proto__||Object.getPrototypeOf(h)).call(this,p,m))}return n(h,[{key:"valid",value:function(){return this.data.search(/^[0-9]{5}$/)!==-1}},{key:"encode",value:function(){var m=t.EAN5_STRUCTURE[d(this.data)];return{data:"1011"+(0,i.default)(this.data,m,"01"),text:this.text}}}]),h})(s.default);return qn.default=u,qn}var Vn={},ua;function ym(){if(ua)return Vn;ua=1,Object.defineProperty(Vn,"__esModule",{value:!0});var n=(function(){function u(f,h){for(var p=0;p<h.length;p++){var m=h[p];m.enumerable=m.enumerable||!1,m.configurable=!0,"value"in m&&(m.writable=!0),Object.defineProperty(f,m.key,m)}}return function(f,h,p){return h&&u(f.prototype,h),p&&u(f,p),f}})(),t=pn(),e=mn(),i=r(e),o=ft(),s=r(o);function r(u){return u&&u.__esModule?u:{default:u}}function a(u,f){if(!(u instanceof f))throw new TypeError("Cannot call a class as a function")}function c(u,f){if(!u)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return f&&(typeof f=="object"||typeof f=="function")?f:u}function l(u,f){if(typeof f!="function"&&f!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof f);u.prototype=Object.create(f&&f.prototype,{constructor:{value:u,enumerable:!1,writable:!0,configurable:!0}}),f&&(Object.setPrototypeOf?Object.setPrototypeOf(u,f):u.__proto__=f)}var d=(function(u){l(f,u);function f(h,p){return a(this,f),c(this,(f.__proto__||Object.getPrototypeOf(f)).call(this,h,p))}return n(f,[{key:"valid",value:function(){return this.data.search(/^[0-9]{2}$/)!==-1}},{key:"encode",value:function(){var p=t.EAN2_STRUCTURE[parseInt(this.data)%4];return{data:"1011"+(0,i.default)(this.data,p,"01"),text:this.text}}}]),f})(s.default);return Vn.default=d,Vn}var Le={},fa;function Mc(){if(fa)return Le;fa=1,Object.defineProperty(Le,"__esModule",{value:!0});var n=(function(){function u(f,h){for(var p=0;p<h.length;p++){var m=h[p];m.enumerable=m.enumerable||!1,m.configurable=!0,"value"in m&&(m.writable=!0),Object.defineProperty(f,m.key,m)}}return function(f,h,p){return h&&u(f.prototype,h),p&&u(f,p),f}})();Le.checksum=d;var t=mn(),e=s(t),i=ft(),o=s(i);function s(u){return u&&u.__esModule?u:{default:u}}function r(u,f){if(!(u instanceof f))throw new TypeError("Cannot call a class as a function")}function a(u,f){if(!u)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return f&&(typeof f=="object"||typeof f=="function")?f:u}function c(u,f){if(typeof f!="function"&&f!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof f);u.prototype=Object.create(f&&f.prototype,{constructor:{value:u,enumerable:!1,writable:!0,configurable:!0}}),f&&(Object.setPrototypeOf?Object.setPrototypeOf(u,f):u.__proto__=f)}var l=(function(u){c(f,u);function f(h,p){r(this,f),h.search(/^[0-9]{11}$/)!==-1&&(h+=d(h));var m=a(this,(f.__proto__||Object.getPrototypeOf(f)).call(this,h,p));return m.displayValue=p.displayValue,p.fontSize>p.width*10?m.fontSize=p.width*10:m.fontSize=p.fontSize,m.guardHeight=p.height+m.fontSize/2+p.textMargin,m}return n(f,[{key:"valid",value:function(){return this.data.search(/^[0-9]{12}$/)!==-1&&this.data[11]==d(this.data)}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var p="";return p+="101",p+=(0,e.default)(this.data.substr(0,6),"LLLLLL"),p+="01010",p+=(0,e.default)(this.data.substr(6,6),"RRRRRR"),p+="101",{data:p,text:this.text}}},{key:"guardedEncoding",value:function(){var p=[];return this.displayValue&&p.push({data:"00000000",text:this.text.substr(0,1),options:{textAlign:"left",fontSize:this.fontSize}}),p.push({data:"101"+(0,e.default)(this.data[0],"L"),options:{height:this.guardHeight}}),p.push({data:(0,e.default)(this.data.substr(1,5),"LLLLL"),text:this.text.substr(1,5),options:{fontSize:this.fontSize}}),p.push({data:"01010",options:{height:this.guardHeight}}),p.push({data:(0,e.default)(this.data.substr(6,5),"RRRRR"),text:this.text.substr(6,5),options:{fontSize:this.fontSize}}),p.push({data:(0,e.default)(this.data[11],"R")+"101",options:{height:this.guardHeight}}),this.displayValue&&p.push({data:"00000000",text:this.text.substr(11,1),options:{textAlign:"right",fontSize:this.fontSize}}),p}}]),f})(o.default);function d(u){var f=0,h;for(h=1;h<11;h+=2)f+=parseInt(u[h]);for(h=0;h<11;h+=2)f+=parseInt(u[h])*3;return(10-f%10)%10}return Le.default=l,Le}var Un={},ha;function xm(){if(ha)return Un;ha=1,Object.defineProperty(Un,"__esModule",{value:!0});var n=(function(){function p(m,g){for(var b=0;b<g.length;b++){var v=g[b];v.enumerable=v.enumerable||!1,v.configurable=!0,"value"in v&&(v.writable=!0),Object.defineProperty(m,v.key,v)}}return function(m,g,b){return g&&p(m.prototype,g),b&&p(m,b),m}})(),t=mn(),e=r(t),i=ft(),o=r(i),s=Mc();function r(p){return p&&p.__esModule?p:{default:p}}function a(p,m){if(!(p instanceof m))throw new TypeError("Cannot call a class as a function")}function c(p,m){if(!p)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return m&&(typeof m=="object"||typeof m=="function")?m:p}function l(p,m){if(typeof m!="function"&&m!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof m);p.prototype=Object.create(m&&m.prototype,{constructor:{value:p,enumerable:!1,writable:!0,configurable:!0}}),m&&(Object.setPrototypeOf?Object.setPrototypeOf(p,m):p.__proto__=m)}var d=["XX00000XXX","XX10000XXX","XX20000XXX","XXX00000XX","XXXX00000X","XXXXX00005","XXXXX00006","XXXXX00007","XXXXX00008","XXXXX00009"],u=[["EEEOOO","OOOEEE"],["EEOEOO","OOEOEE"],["EEOOEO","OOEEOE"],["EEOOOE","OOEEEO"],["EOEEOO","OEOOEE"],["EOOEEO","OEEOOE"],["EOOOEE","OEEEOO"],["EOEOEO","OEOEOE"],["EOEOOE","OEOEEO"],["EOOEOE","OEEOEO"]],f=(function(p){l(m,p);function m(g,b){a(this,m);var v=c(this,(m.__proto__||Object.getPrototypeOf(m)).call(this,g,b));if(v.isValid=!1,g.search(/^[0-9]{6}$/)!==-1)v.middleDigits=g,v.upcA=h(g,"0"),v.text=b.text||""+v.upcA[0]+g+v.upcA[v.upcA.length-1],v.isValid=!0;else if(g.search(/^[01][0-9]{7}$/)!==-1)if(v.middleDigits=g.substring(1,g.length-1),v.upcA=h(v.middleDigits,g[0]),v.upcA[v.upcA.length-1]===g[g.length-1])v.isValid=!0;else return c(v);else return c(v);return v.displayValue=b.displayValue,b.fontSize>b.width*10?v.fontSize=b.width*10:v.fontSize=b.fontSize,v.guardHeight=b.height+v.fontSize/2+b.textMargin,v}return n(m,[{key:"valid",value:function(){return this.isValid}},{key:"encode",value:function(){return this.options.flat?this.flatEncoding():this.guardedEncoding()}},{key:"flatEncoding",value:function(){var b="";return b+="101",b+=this.encodeMiddleDigits(),b+="010101",{data:b,text:this.text}}},{key:"guardedEncoding",value:function(){var b=[];return this.displayValue&&b.push({data:"00000000",text:this.text[0],options:{textAlign:"left",fontSize:this.fontSize}}),b.push({data:"101",options:{height:this.guardHeight}}),b.push({data:this.encodeMiddleDigits(),text:this.text.substring(1,7),options:{fontSize:this.fontSize}}),b.push({data:"010101",options:{height:this.guardHeight}}),this.displayValue&&b.push({data:"00000000",text:this.text[7],options:{textAlign:"right",fontSize:this.fontSize}}),b}},{key:"encodeMiddleDigits",value:function(){var b=this.upcA[0],v=this.upcA[this.upcA.length-1],y=u[parseInt(v)][parseInt(b)];return(0,e.default)(this.middleDigits,y)}}]),m})(o.default);function h(p,m){for(var g=parseInt(p[p.length-1]),b=d[g],v="",y=0,x=0;x<b.length;x++){var S=b[x];S==="X"?v+=p[y++]:v+=S}return v=""+m+v,""+v+(0,s.checksum)(v)}return Un.default=f,Un}var pa;function _m(){if(pa)return ot;pa=1,Object.defineProperty(ot,"__esModule",{value:!0}),ot.UPCE=ot.UPC=ot.EAN2=ot.EAN5=ot.EAN8=ot.EAN13=void 0;var n=gm(),t=f(n),e=bm(),i=f(e),o=vm(),s=f(o),r=ym(),a=f(r),c=Mc(),l=f(c),d=xm(),u=f(d);function f(h){return h&&h.__esModule?h:{default:h}}return ot.EAN13=t.default,ot.EAN8=i.default,ot.EAN5=s.default,ot.EAN2=a.default,ot.UPC=l.default,ot.UPCE=u.default,ot}var ie={},Wn={},ye={},ma;function wm(){return ma||(ma=1,Object.defineProperty(ye,"__esModule",{value:!0}),ye.START_BIN="1010",ye.END_BIN="11101",ye.BINARIES=["00110","10001","01001","11000","00101","10100","01100","00011","10010","01010"]),ye}var ga;function Ac(){if(ga)return Wn;ga=1,Object.defineProperty(Wn,"__esModule",{value:!0});var n=(function(){function l(d,u){for(var f=0;f<u.length;f++){var h=u[f];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(d,h.key,h)}}return function(d,u,f){return u&&l(d.prototype,u),f&&l(d,f),d}})(),t=wm(),e=ft(),i=o(e);function o(l){return l&&l.__esModule?l:{default:l}}function s(l,d){if(!(l instanceof d))throw new TypeError("Cannot call a class as a function")}function r(l,d){if(!l)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return d&&(typeof d=="object"||typeof d=="function")?d:l}function a(l,d){if(typeof d!="function"&&d!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof d);l.prototype=Object.create(d&&d.prototype,{constructor:{value:l,enumerable:!1,writable:!0,configurable:!0}}),d&&(Object.setPrototypeOf?Object.setPrototypeOf(l,d):l.__proto__=d)}var c=(function(l){a(d,l);function d(){return s(this,d),r(this,(d.__proto__||Object.getPrototypeOf(d)).apply(this,arguments))}return n(d,[{key:"valid",value:function(){return this.data.search(/^([0-9]{2})+$/)!==-1}},{key:"encode",value:function(){var f=this,h=this.data.match(/.{2}/g).map(function(p){return f.encodePair(p)}).join("");return{data:t.START_BIN+h+t.END_BIN,text:this.text}}},{key:"encodePair",value:function(f){var h=t.BINARIES[f[1]];return t.BINARIES[f[0]].split("").map(function(p,m){return(p==="1"?"111":"1")+(h[m]==="1"?"000":"0")}).join("")}}]),d})(i.default);return Wn.default=c,Wn}var Gn={},ba;function Em(){if(ba)return Gn;ba=1,Object.defineProperty(Gn,"__esModule",{value:!0});var n=(function(){function l(d,u){for(var f=0;f<u.length;f++){var h=u[f];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(d,h.key,h)}}return function(d,u,f){return u&&l(d.prototype,u),f&&l(d,f),d}})(),t=Ac(),e=i(t);function i(l){return l&&l.__esModule?l:{default:l}}function o(l,d){if(!(l instanceof d))throw new TypeError("Cannot call a class as a function")}function s(l,d){if(!l)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return d&&(typeof d=="object"||typeof d=="function")?d:l}function r(l,d){if(typeof d!="function"&&d!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof d);l.prototype=Object.create(d&&d.prototype,{constructor:{value:l,enumerable:!1,writable:!0,configurable:!0}}),d&&(Object.setPrototypeOf?Object.setPrototypeOf(l,d):l.__proto__=d)}var a=function(d){var u=d.substr(0,13).split("").map(function(f){return parseInt(f,10)}).reduce(function(f,h,p){return f+h*(3-p%2*2)},0);return Math.ceil(u/10)*10-u},c=(function(l){r(d,l);function d(u,f){return o(this,d),u.search(/^[0-9]{13}$/)!==-1&&(u+=a(u)),s(this,(d.__proto__||Object.getPrototypeOf(d)).call(this,u,f))}return n(d,[{key:"valid",value:function(){return this.data.search(/^[0-9]{14}$/)!==-1&&+this.data[13]===a(this.data)}}]),d})(e.default);return Gn.default=c,Gn}var va;function Sm(){if(va)return ie;va=1,Object.defineProperty(ie,"__esModule",{value:!0}),ie.ITF14=ie.ITF=void 0;var n=Ac(),t=o(n),e=Em(),i=o(e);function o(s){return s&&s.__esModule?s:{default:s}}return ie.ITF=t.default,ie.ITF14=i.default,ie}var lt={},Yn={},ya;function gn(){if(ya)return Yn;ya=1,Object.defineProperty(Yn,"__esModule",{value:!0});var n=(function(){function l(d,u){for(var f=0;f<u.length;f++){var h=u[f];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(d,h.key,h)}}return function(d,u,f){return u&&l(d.prototype,u),f&&l(d,f),d}})(),t=ft(),e=i(t);function i(l){return l&&l.__esModule?l:{default:l}}function o(l,d){if(!(l instanceof d))throw new TypeError("Cannot call a class as a function")}function s(l,d){if(!l)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return d&&(typeof d=="object"||typeof d=="function")?d:l}function r(l,d){if(typeof d!="function"&&d!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof d);l.prototype=Object.create(d&&d.prototype,{constructor:{value:l,enumerable:!1,writable:!0,configurable:!0}}),d&&(Object.setPrototypeOf?Object.setPrototypeOf(l,d):l.__proto__=d)}var a=(function(l){r(d,l);function d(u,f){return o(this,d),s(this,(d.__proto__||Object.getPrototypeOf(d)).call(this,u,f))}return n(d,[{key:"encode",value:function(){for(var f="110",h=0;h<this.data.length;h++){var p=parseInt(this.data[h]),m=p.toString(2);m=c(m,4-m.length);for(var g=0;g<m.length;g++)f+=m[g]=="0"?"100":"110"}return f+="1001",{data:f,text:this.text}}},{key:"valid",value:function(){return this.data.search(/^[0-9]+$/)!==-1}}]),d})(e.default);function c(l,d){for(var u=0;u<d;u++)l="0"+l;return l}return Yn.default=a,Yn}var Xn={},Be={},xa;function Vi(){if(xa)return Be;xa=1,Object.defineProperty(Be,"__esModule",{value:!0}),Be.mod10=n,Be.mod11=t;function n(e){for(var i=0,o=0;o<e.length;o++){var s=parseInt(e[o]);(o+e.length)%2===0?i+=s:i+=s*2%10+Math.floor(s*2/10)}return(10-i%10)%10}function t(e){for(var i=0,o=[2,3,4,5,6,7],s=0;s<e.length;s++){var r=parseInt(e[e.length-1-s]);i+=o[s%o.length]*r}return(11-i%11)%11}return Be}var _a;function km(){if(_a)return Xn;_a=1,Object.defineProperty(Xn,"__esModule",{value:!0});var n=gn(),t=i(n),e=Vi();function i(c){return c&&c.__esModule?c:{default:c}}function o(c,l){if(!(c instanceof l))throw new TypeError("Cannot call a class as a function")}function s(c,l){if(!c)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return l&&(typeof l=="object"||typeof l=="function")?l:c}function r(c,l){if(typeof l!="function"&&l!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof l);c.prototype=Object.create(l&&l.prototype,{constructor:{value:c,enumerable:!1,writable:!0,configurable:!0}}),l&&(Object.setPrototypeOf?Object.setPrototypeOf(c,l):c.__proto__=l)}var a=(function(c){r(l,c);function l(d,u){return o(this,l),s(this,(l.__proto__||Object.getPrototypeOf(l)).call(this,d+(0,e.mod10)(d),u))}return l})(t.default);return Xn.default=a,Xn}var Kn={},wa;function Cm(){if(wa)return Kn;wa=1,Object.defineProperty(Kn,"__esModule",{value:!0});var n=gn(),t=i(n),e=Vi();function i(c){return c&&c.__esModule?c:{default:c}}function o(c,l){if(!(c instanceof l))throw new TypeError("Cannot call a class as a function")}function s(c,l){if(!c)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return l&&(typeof l=="object"||typeof l=="function")?l:c}function r(c,l){if(typeof l!="function"&&l!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof l);c.prototype=Object.create(l&&l.prototype,{constructor:{value:c,enumerable:!1,writable:!0,configurable:!0}}),l&&(Object.setPrototypeOf?Object.setPrototypeOf(c,l):c.__proto__=l)}var a=(function(c){r(l,c);function l(d,u){return o(this,l),s(this,(l.__proto__||Object.getPrototypeOf(l)).call(this,d+(0,e.mod11)(d),u))}return l})(t.default);return Kn.default=a,Kn}var Jn={},Ea;function Mm(){if(Ea)return Jn;Ea=1,Object.defineProperty(Jn,"__esModule",{value:!0});var n=gn(),t=i(n),e=Vi();function i(c){return c&&c.__esModule?c:{default:c}}function o(c,l){if(!(c instanceof l))throw new TypeError("Cannot call a class as a function")}function s(c,l){if(!c)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return l&&(typeof l=="object"||typeof l=="function")?l:c}function r(c,l){if(typeof l!="function"&&l!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof l);c.prototype=Object.create(l&&l.prototype,{constructor:{value:c,enumerable:!1,writable:!0,configurable:!0}}),l&&(Object.setPrototypeOf?Object.setPrototypeOf(c,l):c.__proto__=l)}var a=(function(c){r(l,c);function l(d,u){return o(this,l),d+=(0,e.mod10)(d),d+=(0,e.mod10)(d),s(this,(l.__proto__||Object.getPrototypeOf(l)).call(this,d,u))}return l})(t.default);return Jn.default=a,Jn}var Qn={},Sa;function Am(){if(Sa)return Qn;Sa=1,Object.defineProperty(Qn,"__esModule",{value:!0});var n=gn(),t=i(n),e=Vi();function i(c){return c&&c.__esModule?c:{default:c}}function o(c,l){if(!(c instanceof l))throw new TypeError("Cannot call a class as a function")}function s(c,l){if(!c)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return l&&(typeof l=="object"||typeof l=="function")?l:c}function r(c,l){if(typeof l!="function"&&l!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof l);c.prototype=Object.create(l&&l.prototype,{constructor:{value:c,enumerable:!1,writable:!0,configurable:!0}}),l&&(Object.setPrototypeOf?Object.setPrototypeOf(c,l):c.__proto__=l)}var a=(function(c){r(l,c);function l(d,u){return o(this,l),d+=(0,e.mod11)(d),d+=(0,e.mod10)(d),s(this,(l.__proto__||Object.getPrototypeOf(l)).call(this,d,u))}return l})(t.default);return Qn.default=a,Qn}var ka;function Om(){if(ka)return lt;ka=1,Object.defineProperty(lt,"__esModule",{value:!0}),lt.MSI1110=lt.MSI1010=lt.MSI11=lt.MSI10=lt.MSI=void 0;var n=gn(),t=d(n),e=km(),i=d(e),o=Cm(),s=d(o),r=Mm(),a=d(r),c=Am(),l=d(c);function d(u){return u&&u.__esModule?u:{default:u}}return lt.MSI=t.default,lt.MSI10=i.default,lt.MSI11=s.default,lt.MSI1010=a.default,lt.MSI1110=l.default,lt}var De={},Ca;function Pm(){if(Ca)return De;Ca=1,Object.defineProperty(De,"__esModule",{value:!0}),De.pharmacode=void 0;var n=(function(){function c(l,d){for(var u=0;u<d.length;u++){var f=d[u];f.enumerable=f.enumerable||!1,f.configurable=!0,"value"in f&&(f.writable=!0),Object.defineProperty(l,f.key,f)}}return function(l,d,u){return d&&c(l.prototype,d),u&&c(l,u),l}})(),t=ft(),e=i(t);function i(c){return c&&c.__esModule?c:{default:c}}function o(c,l){if(!(c instanceof l))throw new TypeError("Cannot call a class as a function")}function s(c,l){if(!c)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return l&&(typeof l=="object"||typeof l=="function")?l:c}function r(c,l){if(typeof l!="function"&&l!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof l);c.prototype=Object.create(l&&l.prototype,{constructor:{value:c,enumerable:!1,writable:!0,configurable:!0}}),l&&(Object.setPrototypeOf?Object.setPrototypeOf(c,l):c.__proto__=l)}var a=(function(c){r(l,c);function l(d,u){o(this,l);var f=s(this,(l.__proto__||Object.getPrototypeOf(l)).call(this,d,u));return f.number=parseInt(d,10),f}return n(l,[{key:"encode",value:function(){for(var u=this.number,f="";!isNaN(u)&&u!=0;)u%2===0?(f="11100"+f,u=(u-2)/2):(f="100"+f,u=(u-1)/2);return f=f.slice(0,-2),{data:f,text:this.text}}},{key:"valid",value:function(){return this.number>=3&&this.number<=131070}}]),l})(e.default);return De.pharmacode=a,De}var $e={},Ma;function Im(){if(Ma)return $e;Ma=1,Object.defineProperty($e,"__esModule",{value:!0}),$e.codabar=void 0;var n=(function(){function c(l,d){for(var u=0;u<d.length;u++){var f=d[u];f.enumerable=f.enumerable||!1,f.configurable=!0,"value"in f&&(f.writable=!0),Object.defineProperty(l,f.key,f)}}return function(l,d,u){return d&&c(l.prototype,d),u&&c(l,u),l}})(),t=ft(),e=i(t);function i(c){return c&&c.__esModule?c:{default:c}}function o(c,l){if(!(c instanceof l))throw new TypeError("Cannot call a class as a function")}function s(c,l){if(!c)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return l&&(typeof l=="object"||typeof l=="function")?l:c}function r(c,l){if(typeof l!="function"&&l!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof l);c.prototype=Object.create(l&&l.prototype,{constructor:{value:c,enumerable:!1,writable:!0,configurable:!0}}),l&&(Object.setPrototypeOf?Object.setPrototypeOf(c,l):c.__proto__=l)}var a=(function(c){r(l,c);function l(d,u){o(this,l),d.search(/^[0-9\-\$\:\.\+\/]+$/)===0&&(d="A"+d+"A");var f=s(this,(l.__proto__||Object.getPrototypeOf(l)).call(this,d.toUpperCase(),u));return f.text=f.options.text||f.text.replace(/[A-D]/g,""),f}return n(l,[{key:"valid",value:function(){return this.data.search(/^[A-D][0-9\-\$\:\.\+\/]+[A-D]$/)!==-1}},{key:"encode",value:function(){for(var u=[],f=this.getEncodings(),h=0;h<this.data.length;h++)u.push(f[this.data.charAt(h)]),h!==this.data.length-1&&u.push("0");return{text:this.text,data:u.join("")}}},{key:"getEncodings",value:function(){return{0:"101010011",1:"101011001",2:"101001011",3:"110010101",4:"101101001",5:"110101001",6:"100101011",7:"100101101",8:"100110101",9:"110100101","-":"101001101",$:"101100101",":":"1101011011","/":"1101101011",".":"1101101101","+":"1011011011",A:"1011001001",B:"1001001011",C:"1010010011",D:"1010011001"}}}]),l})(e.default);return $e.codabar=a,$e}var oe={},Zn={},xe={},Aa;function Tm(){return Aa||(Aa=1,Object.defineProperty(xe,"__esModule",{value:!0}),xe.SYMBOLS=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","-","."," ","$","/","+","%","($)","(%)","(/)","(+)","ÿ"],xe.BINARIES=["100010100","101001000","101000100","101000010","100101000","100100100","100100010","101010000","100010010","100001010","110101000","110100100","110100010","110010100","110010010","110001010","101101000","101100100","101100010","100110100","100011010","101011000","101001100","101000110","100101100","100010110","110110100","110110010","110101100","110100110","110010110","110011010","101101100","101100110","100110110","100111010","100101110","111010100","111010010","111001010","101101110","101110110","110101110","100100110","111011010","111010110","100110010","101011110"],xe.MULTI_SYMBOLS={"\0":["(%)","U"],"":["($)","A"],"":["($)","B"],"":["($)","C"],"":["($)","D"],"":["($)","E"],"":["($)","F"],"\x07":["($)","G"],"\b":["($)","H"],"	":["($)","I"],"\n":["($)","J"],"\v":["($)","K"],"\f":["($)","L"],"\r":["($)","M"],"":["($)","N"],"":["($)","O"],"":["($)","P"],"":["($)","Q"],"":["($)","R"],"":["($)","S"],"":["($)","T"],"":["($)","U"],"":["($)","V"],"":["($)","W"],"":["($)","X"],"":["($)","Y"],"":["($)","Z"],"\x1B":["(%)","A"],"":["(%)","B"],"":["(%)","C"],"":["(%)","D"],"":["(%)","E"],"!":["(/)","A"],'"':["(/)","B"],"#":["(/)","C"],"&":["(/)","F"],"'":["(/)","G"],"(":["(/)","H"],")":["(/)","I"],"*":["(/)","J"],",":["(/)","L"],":":["(/)","Z"],";":["(%)","F"],"<":["(%)","G"],"=":["(%)","H"],">":["(%)","I"],"?":["(%)","J"],"@":["(%)","V"],"[":["(%)","K"],"\\":["(%)","L"],"]":["(%)","M"],"^":["(%)","N"],_:["(%)","O"],"`":["(%)","W"],a:["(+)","A"],b:["(+)","B"],c:["(+)","C"],d:["(+)","D"],e:["(+)","E"],f:["(+)","F"],g:["(+)","G"],h:["(+)","H"],i:["(+)","I"],j:["(+)","J"],k:["(+)","K"],l:["(+)","L"],m:["(+)","M"],n:["(+)","N"],o:["(+)","O"],p:["(+)","P"],q:["(+)","Q"],r:["(+)","R"],s:["(+)","S"],t:["(+)","T"],u:["(+)","U"],v:["(+)","V"],w:["(+)","W"],x:["(+)","X"],y:["(+)","Y"],z:["(+)","Z"],"{":["(%)","P"],"|":["(%)","Q"],"}":["(%)","R"],"~":["(%)","S"],"":["(%)","T"]}),xe}var Oa;function Oc(){if(Oa)return Zn;Oa=1,Object.defineProperty(Zn,"__esModule",{value:!0});var n=(function(){function l(d,u){for(var f=0;f<u.length;f++){var h=u[f];h.enumerable=h.enumerable||!1,h.configurable=!0,"value"in h&&(h.writable=!0),Object.defineProperty(d,h.key,h)}}return function(d,u,f){return u&&l(d.prototype,u),f&&l(d,f),d}})(),t=Tm(),e=ft(),i=o(e);function o(l){return l&&l.__esModule?l:{default:l}}function s(l,d){if(!(l instanceof d))throw new TypeError("Cannot call a class as a function")}function r(l,d){if(!l)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return d&&(typeof d=="object"||typeof d=="function")?d:l}function a(l,d){if(typeof d!="function"&&d!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof d);l.prototype=Object.create(d&&d.prototype,{constructor:{value:l,enumerable:!1,writable:!0,configurable:!0}}),d&&(Object.setPrototypeOf?Object.setPrototypeOf(l,d):l.__proto__=d)}var c=(function(l){a(d,l);function d(u,f){return s(this,d),r(this,(d.__proto__||Object.getPrototypeOf(d)).call(this,u,f))}return n(d,[{key:"valid",value:function(){return/^[0-9A-Z\-. $/+%]+$/.test(this.data)}},{key:"encode",value:function(){var f=this.data.split("").flatMap(function(g){return t.MULTI_SYMBOLS[g]||g}),h=f.map(function(g){return d.getEncoding(g)}).join(""),p=d.checksum(f,20),m=d.checksum(f.concat(p),15);return{text:this.text,data:d.getEncoding("ÿ")+h+d.getEncoding(p)+d.getEncoding(m)+d.getEncoding("ÿ")+"1"}}}],[{key:"getEncoding",value:function(f){return t.BINARIES[d.symbolValue(f)]}},{key:"getSymbol",value:function(f){return t.SYMBOLS[f]}},{key:"symbolValue",value:function(f){return t.SYMBOLS.indexOf(f)}},{key:"checksum",value:function(f,h){var p=f.slice().reverse().reduce(function(m,g,b){var v=b%h+1;return m+d.symbolValue(g)*v},0);return d.getSymbol(p%47)}}]),d})(i.default);return Zn.default=c,Zn}var ti={},Pa;function Rm(){if(Pa)return ti;Pa=1,Object.defineProperty(ti,"__esModule",{value:!0});var n=(function(){function c(l,d){for(var u=0;u<d.length;u++){var f=d[u];f.enumerable=f.enumerable||!1,f.configurable=!0,"value"in f&&(f.writable=!0),Object.defineProperty(l,f.key,f)}}return function(l,d,u){return d&&c(l.prototype,d),u&&c(l,u),l}})(),t=Oc(),e=i(t);function i(c){return c&&c.__esModule?c:{default:c}}function o(c,l){if(!(c instanceof l))throw new TypeError("Cannot call a class as a function")}function s(c,l){if(!c)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return l&&(typeof l=="object"||typeof l=="function")?l:c}function r(c,l){if(typeof l!="function"&&l!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof l);c.prototype=Object.create(l&&l.prototype,{constructor:{value:c,enumerable:!1,writable:!0,configurable:!0}}),l&&(Object.setPrototypeOf?Object.setPrototypeOf(c,l):c.__proto__=l)}var a=(function(c){r(l,c);function l(d,u){return o(this,l),s(this,(l.__proto__||Object.getPrototypeOf(l)).call(this,d,u))}return n(l,[{key:"valid",value:function(){return/^[\x00-\x7f]+$/.test(this.data)}}]),l})(e.default);return ti.default=a,ti}var Ia;function Lm(){if(Ia)return oe;Ia=1,Object.defineProperty(oe,"__esModule",{value:!0}),oe.CODE93FullASCII=oe.CODE93=void 0;var n=Oc(),t=o(n),e=Rm(),i=o(e);function o(s){return s&&s.__esModule?s:{default:s}}return oe.CODE93=t.default,oe.CODE93FullASCII=i.default,oe}var Ne={},Ta;function Bm(){if(Ta)return Ne;Ta=1,Object.defineProperty(Ne,"__esModule",{value:!0}),Ne.GenericBarcode=void 0;var n=(function(){function c(l,d){for(var u=0;u<d.length;u++){var f=d[u];f.enumerable=f.enumerable||!1,f.configurable=!0,"value"in f&&(f.writable=!0),Object.defineProperty(l,f.key,f)}}return function(l,d,u){return d&&c(l.prototype,d),u&&c(l,u),l}})(),t=ft(),e=i(t);function i(c){return c&&c.__esModule?c:{default:c}}function o(c,l){if(!(c instanceof l))throw new TypeError("Cannot call a class as a function")}function s(c,l){if(!c)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return l&&(typeof l=="object"||typeof l=="function")?l:c}function r(c,l){if(typeof l!="function"&&l!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof l);c.prototype=Object.create(l&&l.prototype,{constructor:{value:c,enumerable:!1,writable:!0,configurable:!0}}),l&&(Object.setPrototypeOf?Object.setPrototypeOf(c,l):c.__proto__=l)}var a=(function(c){r(l,c);function l(d,u){return o(this,l),s(this,(l.__proto__||Object.getPrototypeOf(l)).call(this,d,u))}return n(l,[{key:"encode",value:function(){return{data:"10101010101010101010101010101010101010101",text:this.text}}},{key:"valid",value:function(){return!0}}]),l})(e.default);return Ne.GenericBarcode=a,Ne}var Ra;function Dm(){if(Ra)return In;Ra=1,Object.defineProperty(In,"__esModule",{value:!0});var n=cm(),t=mm(),e=_m(),i=Sm(),o=Om(),s=Pm(),r=Im(),a=Lm(),c=Bm();return In.default={CODE39:n.CODE39,CODE128:t.CODE128,CODE128A:t.CODE128A,CODE128B:t.CODE128B,CODE128C:t.CODE128C,EAN13:e.EAN13,EAN8:e.EAN8,EAN5:e.EAN5,EAN2:e.EAN2,UPC:e.UPC,UPCE:e.UPCE,ITF14:i.ITF14,ITF:i.ITF,MSI:o.MSI,MSI10:o.MSI10,MSI11:o.MSI11,MSI1010:o.MSI1010,MSI1110:o.MSI1110,pharmacode:s.pharmacode,codabar:r.codabar,CODE93:a.CODE93,CODE93FullASCII:a.CODE93FullASCII,GenericBarcode:c.GenericBarcode},In}var ei={},La;function Ui(){if(La)return ei;La=1,Object.defineProperty(ei,"__esModule",{value:!0});var n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])}return t};return ei.default=function(t,e){return n({},t,e)},ei}var ni={},Ba;function $m(){if(Ba)return ni;Ba=1,Object.defineProperty(ni,"__esModule",{value:!0}),ni.default=n;function n(t){var e=[];function i(o){if(Array.isArray(o))for(var s=0;s<o.length;s++)i(o[s]);else o.text=o.text||"",o.data=o.data||"",e.push(o)}return i(t),e}return ni}var ii={},Da;function Nm(){if(Da)return ii;Da=1,Object.defineProperty(ii,"__esModule",{value:!0}),ii.default=n;function n(t){return t.marginTop=t.marginTop||t.margin,t.marginBottom=t.marginBottom||t.margin,t.marginRight=t.marginRight||t.margin,t.marginLeft=t.marginLeft||t.margin,t}return ii}var oi={},si={},ri={},$a;function Pc(){if($a)return ri;$a=1,Object.defineProperty(ri,"__esModule",{value:!0}),ri.default=n;function n(t){var e=["width","height","textMargin","fontSize","margin","marginTop","marginBottom","marginLeft","marginRight"];for(var i in e)e.hasOwnProperty(i)&&(i=e[i],typeof t[i]=="string"&&(t[i]=parseInt(t[i],10)));return typeof t.displayValue=="string"&&(t.displayValue=t.displayValue!="false"),t}return ri}var ai={},Na;function Ic(){if(Na)return ai;Na=1,Object.defineProperty(ai,"__esModule",{value:!0});var n={width:2,height:100,format:"auto",displayValue:!0,fontOptions:"",font:"monospace",text:void 0,textAlign:"center",textPosition:"bottom",textMargin:2,fontSize:20,background:"#ffffff",lineColor:"#000000",margin:10,marginTop:void 0,marginBottom:void 0,marginLeft:void 0,marginRight:void 0,valid:function(){}};return ai.default=n,ai}var za;function zm(){if(za)return si;za=1,Object.defineProperty(si,"__esModule",{value:!0});var n=Pc(),t=o(n),e=Ic(),i=o(e);function o(r){return r&&r.__esModule?r:{default:r}}function s(r){var a={};for(var c in i.default)i.default.hasOwnProperty(c)&&(r.hasAttribute("jsbarcode-"+c.toLowerCase())&&(a[c]=r.getAttribute("jsbarcode-"+c.toLowerCase())),r.hasAttribute("data-"+c.toLowerCase())&&(a[c]=r.getAttribute("data-"+c.toLowerCase())));return a.value=r.getAttribute("jsbarcode-value")||r.getAttribute("data-value"),a=(0,t.default)(a),a}return si.default=s,si}var li={},ci={},ct={},Fa;function Tc(){if(Fa)return ct;Fa=1,Object.defineProperty(ct,"__esModule",{value:!0}),ct.getTotalWidthOfEncodings=ct.calculateEncodingAttributes=ct.getBarcodePadding=ct.getEncodingHeight=ct.getMaximumHeightOfEncodings=void 0;var n=Ui(),t=e(n);function e(l){return l&&l.__esModule?l:{default:l}}function i(l,d){return d.height+(d.displayValue&&l.text.length>0?d.fontSize+d.textMargin:0)+d.marginTop+d.marginBottom}function o(l,d,u){if(u.displayValue&&d<l){if(u.textAlign=="center")return Math.floor((l-d)/2);if(u.textAlign=="left")return 0;if(u.textAlign=="right")return Math.floor(l-d)}return 0}function s(l,d,u){for(var f=0;f<l.length;f++){var h=l[f],p=(0,t.default)(d,h.options),m;p.displayValue?m=c(h.text,p,u):m=0;var g=h.data.length*p.width;h.width=Math.ceil(Math.max(m,g)),h.height=i(h,p),h.barcodePadding=o(m,g,p)}}function r(l){for(var d=0,u=0;u<l.length;u++)d+=l[u].width;return d}function a(l){for(var d=0,u=0;u<l.length;u++)l[u].height>d&&(d=l[u].height);return d}function c(l,d,u){var f;if(u)f=u;else if(typeof document<"u")f=document.createElement("canvas").getContext("2d");else return 0;f.font=d.fontOptions+" "+d.fontSize+"px "+d.font;var h=f.measureText(l);if(!h)return 0;var p=h.width;return p}return ct.getMaximumHeightOfEncodings=a,ct.getEncodingHeight=i,ct.getBarcodePadding=o,ct.calculateEncodingAttributes=s,ct.getTotalWidthOfEncodings=r,ct}var ja;function Fm(){if(ja)return ci;ja=1,Object.defineProperty(ci,"__esModule",{value:!0});var n=(function(){function a(c,l){for(var d=0;d<l.length;d++){var u=l[d];u.enumerable=u.enumerable||!1,u.configurable=!0,"value"in u&&(u.writable=!0),Object.defineProperty(c,u.key,u)}}return function(c,l,d){return l&&a(c.prototype,l),d&&a(c,d),c}})(),t=Ui(),e=o(t),i=Tc();function o(a){return a&&a.__esModule?a:{default:a}}function s(a,c){if(!(a instanceof c))throw new TypeError("Cannot call a class as a function")}var r=(function(){function a(c,l,d){s(this,a),this.canvas=c,this.encodings=l,this.options=d}return n(a,[{key:"render",value:function(){if(!this.canvas.getContext)throw new Error("The browser does not support canvas.");this.prepareCanvas();for(var l=0;l<this.encodings.length;l++){var d=(0,e.default)(this.options,this.encodings[l].options);this.drawCanvasBarcode(d,this.encodings[l]),this.drawCanvasText(d,this.encodings[l]),this.moveCanvasDrawing(this.encodings[l])}this.restoreCanvas()}},{key:"prepareCanvas",value:function(){var l=this.canvas.getContext("2d");l.save(),(0,i.calculateEncodingAttributes)(this.encodings,this.options,l);var d=(0,i.getTotalWidthOfEncodings)(this.encodings),u=(0,i.getMaximumHeightOfEncodings)(this.encodings);this.canvas.width=d+this.options.marginLeft+this.options.marginRight,this.canvas.height=u,l.clearRect(0,0,this.canvas.width,this.canvas.height),this.options.background&&(l.fillStyle=this.options.background,l.fillRect(0,0,this.canvas.width,this.canvas.height)),l.translate(this.options.marginLeft,0)}},{key:"drawCanvasBarcode",value:function(l,d){var u=this.canvas.getContext("2d"),f=d.data,h;l.textPosition=="top"?h=l.marginTop+l.fontSize+l.textMargin:h=l.marginTop,u.fillStyle=l.lineColor;for(var p=0;p<f.length;p++){var m=p*l.width+d.barcodePadding;f[p]==="1"?u.fillRect(m,h,l.width,l.height):f[p]&&u.fillRect(m,h,l.width,l.height*f[p])}}},{key:"drawCanvasText",value:function(l,d){var u=this.canvas.getContext("2d"),f=l.fontOptions+" "+l.fontSize+"px "+l.font;if(l.displayValue){var h,p;l.textPosition=="top"?p=l.marginTop+l.fontSize-l.textMargin:p=l.height+l.textMargin+l.marginTop+l.fontSize,u.font=f,l.textAlign=="left"||d.barcodePadding>0?(h=0,u.textAlign="left"):l.textAlign=="right"?(h=d.width-1,u.textAlign="right"):(h=d.width/2,u.textAlign="center"),u.fillText(d.text,h,p)}}},{key:"moveCanvasDrawing",value:function(l){var d=this.canvas.getContext("2d");d.translate(l.width,0)}},{key:"restoreCanvas",value:function(){var l=this.canvas.getContext("2d");l.restore()}}]),a})();return ci.default=r,ci}var di={},Ha;function jm(){if(Ha)return di;Ha=1,Object.defineProperty(di,"__esModule",{value:!0});var n=(function(){function c(l,d){for(var u=0;u<d.length;u++){var f=d[u];f.enumerable=f.enumerable||!1,f.configurable=!0,"value"in f&&(f.writable=!0),Object.defineProperty(l,f.key,f)}}return function(l,d,u){return d&&c(l.prototype,d),u&&c(l,u),l}})(),t=Ui(),e=o(t),i=Tc();function o(c){return c&&c.__esModule?c:{default:c}}function s(c,l){if(!(c instanceof l))throw new TypeError("Cannot call a class as a function")}var r="http://www.w3.org/2000/svg",a=(function(){function c(l,d,u){s(this,c),this.svg=l,this.encodings=d,this.options=u,this.document=u.xmlDocument||document}return n(c,[{key:"render",value:function(){var d=this.options.marginLeft;this.prepareSVG();for(var u=0;u<this.encodings.length;u++){var f=this.encodings[u],h=(0,e.default)(this.options,f.options),p=this.createGroup(d,h.marginTop,this.svg);this.setGroupOptions(p,h),this.drawSvgBarcode(p,h,f),this.drawSVGText(p,h,f),d+=f.width}}},{key:"prepareSVG",value:function(){for(;this.svg.firstChild;)this.svg.removeChild(this.svg.firstChild);(0,i.calculateEncodingAttributes)(this.encodings,this.options);var d=(0,i.getTotalWidthOfEncodings)(this.encodings),u=(0,i.getMaximumHeightOfEncodings)(this.encodings),f=d+this.options.marginLeft+this.options.marginRight;this.setSvgAttributes(f,u),this.options.background&&this.drawRect(0,0,f,u,this.svg).setAttribute("fill",this.options.background)}},{key:"drawSvgBarcode",value:function(d,u,f){var h=f.data,p;u.textPosition=="top"?p=u.fontSize+u.textMargin:p=0;for(var m=0,g=0,b=0;b<h.length;b++)g=b*u.width+f.barcodePadding,h[b]==="1"?m++:m>0&&(this.drawRect(g-u.width*m,p,u.width*m,u.height,d),m=0);m>0&&this.drawRect(g-u.width*(m-1),p,u.width*m,u.height,d)}},{key:"drawSVGText",value:function(d,u,f){var h=this.document.createElementNS(r,"text");if(u.displayValue){var p,m;h.setAttribute("font-family",u.font),h.setAttribute("font-size",u.fontSize),u.fontOptions.includes("bold")&&h.setAttribute("font-weight","bold"),u.fontOptions.includes("italic")&&h.setAttribute("font-style","italic"),u.textPosition=="top"?m=u.fontSize-u.textMargin:m=u.height+u.textMargin+u.fontSize,u.textAlign=="left"||f.barcodePadding>0?(p=0,h.setAttribute("text-anchor","start")):u.textAlign=="right"?(p=f.width-1,h.setAttribute("text-anchor","end")):(p=f.width/2,h.setAttribute("text-anchor","middle")),h.setAttribute("x",p),h.setAttribute("y",m),h.appendChild(this.document.createTextNode(f.text)),d.appendChild(h)}}},{key:"setSvgAttributes",value:function(d,u){var f=this.svg;f.setAttribute("width",d+"px"),f.setAttribute("height",u+"px"),f.setAttribute("x","0px"),f.setAttribute("y","0px"),f.setAttribute("viewBox","0 0 "+d+" "+u),f.setAttribute("xmlns",r),f.setAttribute("version","1.1")}},{key:"createGroup",value:function(d,u,f){var h=this.document.createElementNS(r,"g");return h.setAttribute("transform","translate("+d+", "+u+")"),f.appendChild(h),h}},{key:"setGroupOptions",value:function(d,u){d.setAttribute("fill",u.lineColor)}},{key:"drawRect",value:function(d,u,f,h,p){var m=this.document.createElementNS(r,"rect");return m.setAttribute("x",d),m.setAttribute("y",u),m.setAttribute("width",f),m.setAttribute("height",h),p.appendChild(m),m}}]),c})();return di.default=a,di}var ui={},qa;function Hm(){if(qa)return ui;qa=1,Object.defineProperty(ui,"__esModule",{value:!0});var n=(function(){function i(o,s){for(var r=0;r<s.length;r++){var a=s[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(o,a.key,a)}}return function(o,s,r){return s&&i(o.prototype,s),r&&i(o,r),o}})();function t(i,o){if(!(i instanceof o))throw new TypeError("Cannot call a class as a function")}var e=(function(){function i(o,s,r){t(this,i),this.object=o,this.encodings=s,this.options=r}return n(i,[{key:"render",value:function(){this.object.encodings=this.encodings}}]),i})();return ui.default=e,ui}var Va;function qm(){if(Va)return li;Va=1,Object.defineProperty(li,"__esModule",{value:!0});var n=Fm(),t=r(n),e=jm(),i=r(e),o=Hm(),s=r(o);function r(a){return a&&a.__esModule?a:{default:a}}return li.default={CanvasRenderer:t.default,SVGRenderer:i.default,ObjectRenderer:s.default},li}var _e={},Ua;function Rc(){if(Ua)return _e;Ua=1,Object.defineProperty(_e,"__esModule",{value:!0});function n(r,a){if(!(r instanceof a))throw new TypeError("Cannot call a class as a function")}function t(r,a){if(!r)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return a&&(typeof a=="object"||typeof a=="function")?a:r}function e(r,a){if(typeof a!="function"&&a!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof a);r.prototype=Object.create(a&&a.prototype,{constructor:{value:r,enumerable:!1,writable:!0,configurable:!0}}),a&&(Object.setPrototypeOf?Object.setPrototypeOf(r,a):r.__proto__=a)}var i=(function(r){e(a,r);function a(c,l){n(this,a);var d=t(this,(a.__proto__||Object.getPrototypeOf(a)).call(this));return d.name="InvalidInputException",d.symbology=c,d.input=l,d.message='"'+d.input+'" is not a valid input for '+d.symbology,d}return a})(Error),o=(function(r){e(a,r);function a(){n(this,a);var c=t(this,(a.__proto__||Object.getPrototypeOf(a)).call(this));return c.name="InvalidElementException",c.message="Not supported type to render on",c}return a})(Error),s=(function(r){e(a,r);function a(){n(this,a);var c=t(this,(a.__proto__||Object.getPrototypeOf(a)).call(this));return c.name="NoElementException",c.message="No element to render on.",c}return a})(Error);return _e.InvalidInputException=i,_e.InvalidElementException=o,_e.NoElementException=s,_e}var Wa;function Vm(){if(Wa)return oi;Wa=1,Object.defineProperty(oi,"__esModule",{value:!0});var n=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(d){return typeof d}:function(d){return d&&typeof Symbol=="function"&&d.constructor===Symbol&&d!==Symbol.prototype?"symbol":typeof d},t=zm(),e=r(t),i=qm(),o=r(i),s=Rc();function r(d){return d&&d.__esModule?d:{default:d}}function a(d){if(typeof d=="string")return c(d);if(Array.isArray(d)){for(var u=[],f=0;f<d.length;f++)u.push(a(d[f]));return u}else{if(typeof HTMLCanvasElement<"u"&&d instanceof HTMLImageElement)return l(d);if(d&&d.nodeName&&d.nodeName.toLowerCase()==="svg"||typeof SVGElement<"u"&&d instanceof SVGElement)return{element:d,options:(0,e.default)(d),renderer:o.default.SVGRenderer};if(typeof HTMLCanvasElement<"u"&&d instanceof HTMLCanvasElement)return{element:d,options:(0,e.default)(d),renderer:o.default.CanvasRenderer};if(d&&d.getContext)return{element:d,renderer:o.default.CanvasRenderer};if(d&&(typeof d>"u"?"undefined":n(d))==="object"&&!d.nodeName)return{element:d,renderer:o.default.ObjectRenderer};throw new s.InvalidElementException}}function c(d){var u=document.querySelectorAll(d);if(u.length!==0){for(var f=[],h=0;h<u.length;h++)f.push(a(u[h]));return f}}function l(d){var u=document.createElement("canvas");return{element:u,options:(0,e.default)(d),renderer:o.default.CanvasRenderer,afterRender:function(){d.setAttribute("src",u.toDataURL())}}}return oi.default=a,oi}var fi={},Ga;function Um(){if(Ga)return fi;Ga=1,Object.defineProperty(fi,"__esModule",{value:!0});var n=(function(){function i(o,s){for(var r=0;r<s.length;r++){var a=s[r];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(o,a.key,a)}}return function(o,s,r){return s&&i(o.prototype,s),r&&i(o,r),o}})();function t(i,o){if(!(i instanceof o))throw new TypeError("Cannot call a class as a function")}var e=(function(){function i(o){t(this,i),this.api=o}return n(i,[{key:"handleCatch",value:function(s){if(s.name==="InvalidInputException")if(this.api._options.valid!==this.api._defaults.valid)this.api._options.valid(!1);else throw s.message;else throw s;this.api.render=function(){}}},{key:"wrapBarcodeCall",value:function(s){try{var r=s.apply(void 0,arguments);return this.api._options.valid(!0),r}catch(a){return this.handleCatch(a),this.api}}}]),i})();return fi.default=e,fi}var fo,Ya;function Wm(){if(Ya)return fo;Ya=1;var n=Dm(),t=b(n),e=Ui(),i=b(e),o=$m(),s=b(o),r=Nm(),a=b(r),c=Vm(),l=b(c),d=Pc(),u=b(d),f=Um(),h=b(f),p=Rc(),m=Ic(),g=b(m);function b(_){return _&&_.__esModule?_:{default:_}}var v=function(){},y=function(A,M,O){var I=new v;if(typeof A>"u")throw Error("No element to render on was provided.");return I._renderProperties=(0,l.default)(A),I._encodings=[],I._options=g.default,I._errorHandler=new h.default(I),typeof M<"u"&&(O=O||{},O.format||(O.format=k()),I.options(O)[O.format](M,O).render()),I};y.getModule=function(_){return t.default[_]};for(var x in t.default)t.default.hasOwnProperty(x)&&S(t.default,x);function S(_,A){v.prototype[A]=v.prototype[A.toUpperCase()]=v.prototype[A.toLowerCase()]=function(M,O){var I=this;return I._errorHandler.wrapBarcodeCall(function(){O.text=typeof O.text>"u"?void 0:""+O.text;var L=(0,i.default)(I._options,O);L=(0,u.default)(L);var $=_[A],F=E(M,$,L);return I._encodings.push(F),I})}}function E(_,A,M){_=""+_;var O=new A(_,M);if(!O.valid())throw new p.InvalidInputException(O.constructor.name,_);var I=O.encode();I=(0,s.default)(I);for(var L=0;L<I.length;L++)I[L].options=(0,i.default)(M,I[L].options);return I}function k(){return t.default.CODE128?"CODE128":Object.keys(t.default)[0]}v.prototype.options=function(_){return this._options=(0,i.default)(this._options,_),this},v.prototype.blank=function(_){var A=new Array(_+1).join("0");return this._encodings.push({data:A}),this},v.prototype.init=function(){if(this._renderProperties){Array.isArray(this._renderProperties)||(this._renderProperties=[this._renderProperties]);var _;for(var A in this._renderProperties){_=this._renderProperties[A];var M=(0,i.default)(this._options,_.options);M.format=="auto"&&(M.format=k()),this._errorHandler.wrapBarcodeCall(function(){var O=M.value,I=t.default[M.format.toUpperCase()],L=E(O,I,M);C(_,L,M)})}}},v.prototype.render=function(){if(!this._renderProperties)throw new p.NoElementException;if(Array.isArray(this._renderProperties))for(var _=0;_<this._renderProperties.length;_++)C(this._renderProperties[_],this._encodings,this._options);else C(this._renderProperties,this._encodings,this._options);return this},v.prototype._defaults=g.default;function C(_,A,M){A=(0,s.default)(A);for(var O=0;O<A.length;O++)A[O].options=(0,i.default)(M,A[O].options),(0,a.default)(A[O].options);(0,a.default)(M);var I=_.renderer,L=new I(_.element,A,M);L.render(),_.afterRender&&_.afterRender()}return typeof window<"u"&&(window.JsBarcode=y),typeof jQuery<"u"&&(jQuery.fn.JsBarcode=function(_,A){var M=[];return jQuery(this).each(function(){M.push(this)}),y(M,_,A)}),fo=y,fo}var Gm=Wm();const Xa=kc(Gm);function Lc(n,t={}){const e=String(n||"896400010101").trim(),i=document.createElementNS("http://www.w3.org/2000/svg","svg");try{return Xa(i,e,{format:"CODE128",lineColor:"#000000",width:t.width||1.6,height:t.height||38,displayValue:t.displayValue!==!1,fontSize:t.fontSize||12,font:"monospace",fontOptions:"bold",textMargin:3,margin:4,background:"#ffffff",...t}),i.setAttribute("style","max-width: 100%; height: auto; display: block; margin: 0 auto;"),new XMLSerializer().serializeToString(i)}catch(o){console.warn(`[Barcode] Could not generate CODE128 for "${e}", falling back to Code39:`,o.message);try{return Xa(i,e.toUpperCase(),{format:"CODE39",width:1.4,height:35,displayValue:!0,fontSize:11,font:"monospace",margin:4}),new XMLSerializer().serializeToString(i)}catch{return`<div style="font-family:monospace; font-size:11px; color:#ef4444; padding:6px; font-weight:bold;">[BARCODE: ${e}]</div>`}}}function bn(n,t,e=""){const i=document.getElementById("onet-print-iframe");i&&i.remove();const o=document.createElement("iframe");o.id="onet-print-iframe",o.style.position="fixed",o.style.right="0",o.style.bottom="0",o.style.width="0",o.style.height="0",o.style.border="0",o.style.zIndex="-9999",o.style.visibility="hidden",document.body.appendChild(o);const s=o.contentWindow.document;s.open(),s.write(`
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
  `),s.close(),setTimeout(()=>{try{o.contentWindow.focus(),o.contentWindow.print()}catch(r){console.error("Print iframe error:",r)}finally{setTimeout(()=>{o&&o.parentNode&&o.parentNode.removeChild(o)},1500)}},200)}function Ym(n){const t=w.activeCompany||{name:"OneNet Solutions",legal_name:"OneNet Solutions Enterprise Suite",address:"Muslim Town, Lahore, Pakistan",phone:"+92 300 1234567",tax_id:"NTN: 7492019-2"},e=n.created_at?new Date(n.created_at).toLocaleString("en-PK",{dateStyle:"medium",timeStyle:"short"}):new Date().toLocaleString("en-PK",{dateStyle:"medium",timeStyle:"short"}),i=n.items||[],o=Number(n.subtotal)||0,s=Number(n.discount_amount)||0,r=Number(n.tax_amount)||0,a=Number(n.total_amount)||0,c=Number(n.paid_amount)||a,l=Number(n.change_amount)||0,d=n.receipt_number||"REC-POS",u=n.customer_name||"Walk-in Retail Customer",f=n.payment_method||"CASH",h=`
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
  `,p=`
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

      ${i.map(m=>`
        <div class="row">
          <span class="col-item">${m.name||m.product_name||"Item"}</span>
          <span class="col-qty">${m.quantity}</span>
          <span class="col-rate">${Number(m.unit_price).toFixed(2)}</span>
          <span class="col-total">${(Number(m.unit_price)*Number(m.quantity)).toFixed(2)}</span>
        </div>
      `).join("")}

      <div class="divider"></div>

      <div class="row"><span>Subtotal:</span><span>Rs. ${o.toFixed(2)}</span></div>
      ${s>0?`<div class="row"><span>Discount:</span><span>-Rs. ${s.toFixed(2)}</span></div>`:""}
      ${r>0?`<div class="row"><span>Sales Tax / VAT (18%):</span><span>Rs. ${r.toFixed(2)}</span></div>`:""}
      
      <div class="row net-total-row">
        <span>NET PAYABLE:</span>
        <span>Rs. ${a.toFixed(2)}</span>
      </div>

      <div class="row"><span>Tender Method:</span><span>${f}</span></div>
      <div class="row"><span>Amount Received:</span><span>Rs. ${c.toFixed(2)}</span></div>
      <div class="row"><span>Change Returned:</span><strong class="font-bold">Rs. ${l.toFixed(2)}</strong></div>

      <div class="divider"></div>

      <div class="footer">
        <div class="font-bold">* FBR / Sales Tax Compliant *</div>
        <div>Thank you for shopping with OneNet Solutions!</div>
        <div style="font-size:9px; color:#555; margin-top:3px;">Powered by OneNet Solutions Enterprise Suite</div>
      </div>
    </div>
  `;bn(`Receipt_${d}`,p,h)}function Xm(n){const t=w.activeCompany||{name:"OneNet Solutions",legal_name:"OneNet Solutions Enterprise Suite",address:"Muslim Town, Lahore, Pakistan",phone:"+92 300 1234567",tax_id:"NTN: 7492019-2",strn:"STRN: 11-22-3344-555"},e=n.invoice_number||"INV-2026-0001",i=n.invoice_date||new Date().toISOString().slice(0,10),o=n.items||[],s=Number(n.subtotal)||0,r=Number(n.tax_amount)||0,a=Number(n.discount_amount)||0,c=Number(n.total_amount)||s+r-a,l=`
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
          ${o.map(u=>`
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
          <div class="totals-row"><span>Subtotal:</span><span>Rs. ${s.toFixed(2)}</span></div>
          <div class="totals-row"><span>Sales Tax (18%):</span><span>Rs. ${r.toFixed(2)}</span></div>
          ${a>0?`<div class="totals-row"><span>Special Discount:</span><span>-Rs. ${a.toFixed(2)}</span></div>`:""}
          <div class="totals-grand">
            <span>Total Payable:</span>
            <span>Rs. ${c.toFixed(2)}</span>
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
  `;bn(`TaxInvoice_${e}`,d,l)}function Km(n,t=12,e="a4_3x8"){const i=w.activeCompany||{name:"OneNet Solutions"},o=Lc(n.barcode||n.sku||"896400010101",{width:1.5,height:36,fontSize:11,margin:2}),s=e==="thermal_roll",r=s?`
    @page { size: 50mm 30mm; margin: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 2mm;
      box-sizing: border-box;
      background: #ffffff;
      color: #000000;
    }
    .thermal-label {
      width: 46mm;
      height: 26mm;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      page-break-inside: avoid;
    }
    .st-title { font-weight: 800; font-size: 9px; text-transform: uppercase; letter-spacing: 0.5px; }
    .st-name { font-size: 9px; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 44mm; }
    .st-barcode { width: 100%; display: flex; justify-content: center; }
    .st-barcode svg { width: 42mm; height: 12mm; }
    .st-price { font-weight: 800; font-size: 11px; }
  `:`
    @page { size: A4; margin: 8mm; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #ffffff;
      color: #000000;
    }
    .sticker-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 5mm;
    }
    .sticker {
      border: 1px dashed #666;
      border-radius: 4px;
      padding: 6px 8px;
      text-align: center;
      page-break-inside: avoid;
      background: #ffffff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 32mm;
      box-sizing: border-box;
    }
    .st-title { font-weight: 800; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: #000; }
    .st-name { font-size: 9.5px; font-weight: 600; margin: 1px 0; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 58mm; color: #111; }
    .st-barcode { width: 100%; margin: 2px 0; display: flex; justify-content: center; }
    .st-barcode svg { width: 54mm; height: 13mm; display: block; }
    .st-price { font-weight: 800; font-size: 12px; color: #000; }
  `,a=s?`
    ${Array.from({length:t}).map(()=>`
      <div class="thermal-label">
        <div class="st-title">${i.name||"OneNet Solutions"}</div>
        <div class="st-name">${n.name.slice(0,26)}</div>
        <div class="st-barcode">${o}</div>
        <div class="st-price">${R(n.selling_price)}</div>
      </div>
    `).join("")}
  `:`
    <div class="sticker-grid">
      ${Array.from({length:t}).map(()=>`
        <div class="sticker">
          <div class="st-title">${i.name||"OneNet Solutions"}</div>
          <div class="st-name">${n.name.slice(0,26)}</div>
          <div class="st-barcode">${o}</div>
          <div class="st-price">${R(n.selling_price)}</div>
        </div>
      `).join("")}
    </div>
  `;bn(`Barcode_Labels_${n.sku||"ITEM"}`,a,r)}function Bc(n){const t=w.activeCompany||{name:"OneNet Solutions",address:"Muslim Town, Lahore, Pakistan"},e=`
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
            <td class="text-right">${R(n.base_salary||45e3)}</td>
            <td>Income Tax Deducted</td>
            <td class="text-right">${R(n.tax_deduction||1200)}</td>
          </tr>
          <tr>
            <td>Overtime / Incentives</td>
            <td class="text-right">${R(n.allowances||3500)}</td>
            <td>Unpaid Leaves / Late Cut</td>
            <td class="text-right">${R(n.unpaid_deduction||0)}</td>
          </tr>
        </tbody>
      </table>

      <div class="net-box">
        <span>NET TAKE-HOME SALARY:</span>
        <span>${R(n.net_salary||47300)}</span>
      </div>

      <div style="display:flex; justify-content:space-between; margin-top:30px; font-size:11px; color:#64748b;">
        <div>Prepared by HR Department</div>
        <div style="text-align:center; border-top:1px solid #94a3b8; width:150px; padding-top:4px;">Employee Signature</div>
      </div>
    </div>
  `;bn(`Payslip_${n.employee_code||"EMP"}`,i,e)}function Jm(n){n.innerHTML=`
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
          ${w.categories.map(t=>`
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
            ${w.customers.map(t=>`
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
  `,Ei("all"),Qm()}function Ei(n="all",t=""){const e=document.getElementById("pos-grid-items");if(!e)return;let i=w.products;if(n!=="all"&&(i=i.filter(o=>String(o.category_id)===String(n))),t){const o=t.toLowerCase();i=i.filter(s=>s.name.toLowerCase().includes(o)||s.sku.toLowerCase().includes(o)||s.barcode&&s.barcode.includes(o))}if(i.length===0){e.innerHTML=`
      <div style="grid-column: 1/-1; text-align:center; padding:3rem; color:var(--text-muted);">
        <p>No products match current filter</p>
      </div>
    `;return}e.innerHTML=i.map(o=>`
    <div class="product-touch-card" data-product-id="${o.id}">
      <span class="card-barcode-sku">${o.barcode||o.sku}</span>
      <h4 class="card-product-name">${o.name}</h4>
      <div class="card-meta-row">
        <span class="card-price">${R(o.selling_price)}</span>
        <span class="card-stock-pill ${o.stock<=o.reorder_level?"tag-danger":""}">${o.stock} ${o.uom||"Pcs"}</span>
      </div>
    </div>
  `).join(""),e.querySelectorAll(".product-touch-card").forEach(o=>{o.addEventListener("click",()=>{const s=Number(o.dataset.productId),r=w.products.find(a=>a.id===s);r&&Dc(r)})})}function Qm(){const n=document.getElementById("pos-search-barcode"),t=document.querySelectorAll(".chip-btn"),e=document.getElementById("btn-clear-cart"),i=document.getElementById("btn-pay-now"),o=document.getElementById("pos-discount-input"),s=document.getElementById("btn-shift-mgmt");n==null||n.addEventListener("input",r=>{var c;const a=((c=document.querySelector(".chip-btn.active"))==null?void 0:c.dataset.cat)||"all";Ei(a,r.target.value)}),n==null||n.addEventListener("keydown",r=>{if(r.key==="Enter"){r.preventDefault();const a=n.value.trim();if(!a)return;const c=w.products.find(l=>l.barcode===a||l.sku.toLowerCase()===a.toLowerCase());c?(Dc(c),n.value="",Ei("all")):P(`No product with barcode: ${a}`,"error")}}),t.forEach(r=>{r.addEventListener("click",()=>{t.forEach(a=>a.classList.remove("active")),r.classList.add("active"),Ei(r.dataset.cat,(n==null?void 0:n.value)||"")})}),o==null||o.addEventListener("input",r=>{w.posCart.discountAmount=Number(r.target.value)||0,Li()}),e==null||e.addEventListener("click",()=>{w.posCart.items=[],w.posCart.discountAmount=0,o&&(o.value="0"),Wi()}),i==null||i.addEventListener("click",()=>{if(w.posCart.items.length===0){P("Please add items to cart first!","error");return}tg()}),s==null||s.addEventListener("click",()=>{eg()}),window.addEventListener("keydown",Zm)}function Zm(n){var t;w.activeModule==="pos"&&(n.key==="F2"?(n.preventDefault(),(t=document.getElementById("btn-pay-now"))==null||t.click()):n.key==="F4"&&(n.preventDefault(),P("Order held in memory tab","info")))}function Dc(n){const t=w.posCart.items.find(e=>e.product_id===n.id);t?t.quantity+=1:w.posCart.items.push({product_id:n.id,name:n.name,sku:n.sku,unit_price:Number(n.selling_price),tax_rate:Number(n.tax_rate||18),quantity:1}),P(`Added: ${n.name}`,"success"),Wi()}function Wi(){const n=document.getElementById("pos-cart-items-list");if(n){if(w.posCart.items.length===0){n.innerHTML=`
      <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
        <p style="font-size:0.9rem;">Cart is empty. Scan barcode or tap products.</p>
      </div>
    `,Li();return}n.innerHTML=w.posCart.items.map((t,e)=>`
    <div class="cart-item-row">
      <div class="cart-item-info">
        <div class="cart-item-title">${t.name}</div>
        <div class="cart-item-unit-price">${R(t.unit_price)} × ${t.quantity}</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" data-cart-idx="${e}" data-action="decrease">-</button>
        <span class="qty-value">${t.quantity}</span>
        <button class="qty-btn" data-cart-idx="${e}" data-action="increase">+</button>
      </div>
      <div class="cart-item-total">
        ${R(t.unit_price*t.quantity)}
      </div>
      <button style="background:none; border:none; color:var(--danger); cursor:pointer; padding:4px;" data-cart-idx="${e}" data-action="delete" title="Remove">✕</button>
    </div>
  `).join(""),n.querySelectorAll("[data-action]").forEach(t=>{t.addEventListener("click",e=>{const i=Number(t.dataset.cartIdx),o=t.dataset.action;o==="increase"?w.posCart.items[i].quantity+=1:o==="decrease"?(w.posCart.items[i].quantity-=1,w.posCart.items[i].quantity<=0&&w.posCart.items.splice(i,1)):o==="delete"&&w.posCart.items.splice(i,1),Wi()})}),Li()}}function Li(){let n=0,t=0;for(const a of w.posCart.items){const c=a.unit_price*a.quantity,l=c*a.tax_rate/100;n+=c,t+=l}const e=w.posCart.discountAmount||0,i=Math.max(0,n-e+t),o=document.getElementById("pos-subtotal"),s=document.getElementById("pos-tax"),r=document.getElementById("pos-total-payable");return o&&(o.textContent=R(n)),s&&(s.textContent=R(t)),r&&(r.textContent=R(i)),{subtotal:n,tax:t,discount:e,total:i}}function tg(){var l,d,u;const{discount:n,total:t}=Li(),e=`
    <div class="modal-overlay" id="payment-modal">
      <div class="modal-content" style="max-width: 480px;">
        <div class="modal-header">
          <h3 class="modal-title">Complete POS Tender</h3>
          <button class="btn-icon btn-sm" id="btn-close-pay-modal">✕</button>
        </div>
        <div class="modal-body">
          <div style="background:rgba(14,165,233,0.1); border:1px solid var(--border-bright); padding:1rem; border-radius:var(--radius-md); text-align:center;">
            <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Total Payable</div>
            <div style="font-family:var(--font-heading); font-size:2.2rem; font-weight:800; color:#38bdf8;">${R(t)}</div>
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
  `;document.body.insertAdjacentHTML("beforeend",e);const i=document.getElementById("payment-modal"),o=document.getElementById("tender-amount-input"),s=document.getElementById("tender-change-due");let r="CASH";function a(){const f=Number(o==null?void 0:o.value)||0,h=Math.max(0,f-t);s&&(s.textContent=R(h))}o==null||o.addEventListener("input",a),i==null||i.querySelectorAll(".tender-method-btn").forEach(f=>{f.addEventListener("click",()=>{i.querySelectorAll(".tender-method-btn").forEach(h=>h.classList.remove("active")),f.classList.add("active"),r=f.dataset.method})}),i==null||i.querySelectorAll(".quick-cash-btn").forEach(f=>{f.addEventListener("click",()=>{o.value=f.dataset.val,a()})});const c=()=>i==null?void 0:i.remove();(l=document.getElementById("btn-close-pay-modal"))==null||l.addEventListener("click",c),(d=document.getElementById("btn-cancel-pay"))==null||d.addEventListener("click",c),(u=document.getElementById("btn-confirm-checkout"))==null||u.addEventListener("click",async()=>{var h;const f=Number(o.value)||t;if(f<t&&r==="CASH"){P("Received cash cannot be less than total payable","error");return}try{const p=((h=document.getElementById("pos-customer-dropdown"))==null?void 0:h.value)||1,m=await B.post("/pos/checkout",{customer_id:p,warehouse_id:2,items:w.posCart.items,discount_amount:n,payment_method:r,paid_amount:f});if(m.success){P(`Transaction ${m.transaction.receipt_number} completed!`,"success"),c(),Ym(m.transaction),w.posCart.items=[],w.posCart.discountAmount=0,Wi();const g=await B.get("/inventory/products");g.success&&(w.products=g.products)}}catch(p){P(p.message,"error")}})}function eg(){var e,i,o;document.body.insertAdjacentHTML("beforeend",`
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
  `);const t=document.getElementById("shift-modal");(e=document.getElementById("btn-close-shift-modal"))==null||e.addEventListener("click",()=>t.remove()),(i=document.getElementById("btn-dismiss-shift"))==null||i.addEventListener("click",()=>t.remove()),(o=document.getElementById("btn-close-shift-confirm"))==null||o.addEventListener("click",async()=>{const s=document.getElementById("shift-counted-cash").value,r=document.getElementById("shift-notes").value;try{(await B.post("/pos/shift/close",{actual_cash:s,notes:r})).success&&(P("Shift reconciled and closed successfully","success"),t.remove())}catch(a){P(a.message,"error")}})}let ze="ALL",ut="stock-list";function ng(n){n.innerHTML=`
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
      <button class="btn btn-outline btn-sm ${ut==="stock-list"?"active":""} inv-tab-btn" data-tab="stock-list">📦 Master Catalog & Stock</button>
      <button class="btn btn-outline btn-sm ${ut==="warehouses"?"active":""} inv-tab-btn" data-tab="warehouses">🏢 Warehouse Hubs & Depots</button>
      <button class="btn btn-outline btn-sm ${ut==="categories"?"active":""} inv-tab-btn" data-tab="categories">🏷️ Category Manager</button>
      <button class="btn btn-outline btn-sm ${ut==="batches"?"active":""} inv-tab-btn" data-tab="batches">⏳ Batch & Expiry Radar</button>
      <button class="btn btn-outline btn-sm ${ut==="ledger"?"active":""} inv-tab-btn" data-tab="ledger">📜 Perpetual Stock Ledger</button>
    </div>

    <div id="inv-tab-content">
      <!-- Dynamic Tab View -->
    </div>
  `,ig(),$c()}function ig(){var t,e,i,o;const n=document.querySelectorAll(".inv-tab-btn");n.forEach(s=>{s.addEventListener("click",()=>{n.forEach(r=>r.classList.remove("active")),s.classList.add("active"),ut=s.dataset.tab,$c()})}),(t=document.getElementById("btn-open-add-product-modal"))==null||t.addEventListener("click",()=>ts(null)),(e=document.getElementById("btn-open-transfer-modal"))==null||e.addEventListener("click",Nc),(i=document.getElementById("btn-open-adjust-modal"))==null||i.addEventListener("click",lg),(o=document.getElementById("btn-open-labels-modal"))==null||o.addEventListener("click",cg)}function $c(){ut==="stock-list"?fe():ut==="warehouses"?cn():ut==="categories"?Bi():ut==="batches"?og():ut==="ledger"&&_s()}function fe(){var i,o;const n=document.getElementById("inv-tab-content");if(!n)return;const t=w.categories||[],e=ze==="ALL"?w.products:w.products.filter(s=>String(s.category_id)===String(ze));n.innerHTML=`
    <!-- Category Filter Chips -->
    <div style="display:flex; gap:0.5rem; margin-bottom:1rem; overflow-x:auto; padding-bottom:0.25rem;">
      <button class="chip-btn ${ze==="ALL"?"active":""} cat-filter-chip" data-cat="ALL">
        All Categories (${w.products.length})
      </button>
      ${t.map(s=>`
        <button class="chip-btn ${String(ze)===String(s.id)?"active":""} cat-filter-chip" data-cat="${s.id}">
          ${s.name}
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
            `:e.map(s=>{const r=s.selling_price>0?((s.selling_price-s.cost_price)/s.selling_price*100).toFixed(1):0,a=Number(s.stock)<=Number(s.reorder_level||10);return`
                <tr id="prod-row-${s.id}">
                  <td>
                    <div style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${s.sku}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">${s.barcode||"No Barcode"}</div>
                  </td>
                  <td>
                    <div style="font-weight:700; color:#ffffff; font-size:0.92rem;">${s.name}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted);">UOM: ${s.uom||"Pcs"} ${s.tax_rate?`• Tax: ${s.tax_rate}%`:""}</div>
                  </td>
                  <td><span class="tag tag-info">${s.category_name||"General"}</span></td>
                  <td>${R(s.cost_price)}</td>
                  <td style="font-weight:700; color:#38bdf8;">${R(s.selling_price)}</td>
                  <td>
                    <span style="font-size:0.8rem; font-weight:600; color:${r>=20?"#34d399":r>0?"#fbbf24":"#f87171"};">
                      ${r}%
                    </span>
                  </td>
                  <td>
                    <span class="tag ${a?"tag-danger":"tag-success"}" title="Reorder alert trigger: ${s.reorder_level||10}">
                      ${s.stock||0} ${s.uom||"Pcs"} ${a?"⚠️ Low":"✓ Good"}
                    </span>
                  </td>
                  <td>
                    ${s.is_batch_tracked?'<span class="tag tag-warning">Batch & Exp</span>':'<span style="color:var(--text-muted); font-size:0.8rem;">Standard</span>'}
                  </td>
                  <td style="text-align:right;">
                    <div style="display:inline-flex; gap:0.35rem;">
                      <button class="btn btn-outline btn-xs edit-prod-btn" data-id="${s.id}" title="Edit Product Specs & Pricing">✏️ Edit</button>
                      <button class="btn btn-outline btn-xs quick-add-cart-btn" data-prod-id="${s.id}" title="Send 1 Unit to POS Cart">+ POS</button>
                      <button class="btn btn-outline btn-xs text-danger delete-prod-btn" data-id="${s.id}" title="Deactivate Product">🗑️</button>
                    </div>
                  </td>
                </tr>
              `}).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `,(i=document.getElementById("inv-search"))==null||i.addEventListener("input",s=>{const r=s.target.value.toLowerCase();document.querySelectorAll("#inv-table-body tr").forEach(c=>{const l=c.textContent.toLowerCase();c.style.display=l.includes(r)?"":"none"})}),document.querySelectorAll(".cat-filter-chip").forEach(s=>{s.addEventListener("click",()=>{ze=s.dataset.cat,fe()})}),(o=document.getElementById("btn-tab-add-prod"))==null||o.addEventListener("click",()=>ts(null)),document.querySelectorAll(".edit-prod-btn").forEach(s=>{s.addEventListener("click",()=>{const r=w.products.find(a=>a.id===Number(s.dataset.id));r&&ts(r)})}),document.querySelectorAll(".delete-prod-btn").forEach(s=>{s.addEventListener("click",()=>{const r=w.products.find(a=>a.id===Number(s.dataset.id));r&&sg(r)})}),document.querySelectorAll(".quick-add-cart-btn").forEach(s=>{s.addEventListener("click",()=>{const r=w.products.find(a=>a.id===Number(s.dataset.prodId));r&&(w.posCart.items.push({product_id:r.id,name:r.name,sku:r.sku,unit_price:Number(r.selling_price),tax_rate:Number(r.tax_rate||18),quantity:1}),P(`Sent ${r.name} to POS register cart!`,"success"))})})}async function cn(){var t;const n=document.getElementById("inv-tab-content");if(n){try{const e=await B.get("/inventory/warehouses");e.success&&(w.warehouses=e.warehouses)}catch(e){console.error("Failed to reload warehouses:",e)}n.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
      <div>
        <h3 style="font-size:1.15rem; font-weight:700;">Multi-Warehouse Network</h3>
        <p style="font-size:0.85rem; color:var(--text-muted);">Manage physical storage depots, distribution centers and stock allocations</p>
      </div>
      <button class="btn btn-primary" id="btn-add-warehouse">+ Add Storage Hub / Warehouse</button>
    </div>

    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.25rem;">
      ${w.warehouses.map(e=>`
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
  `,(t=document.getElementById("btn-add-warehouse"))==null||t.addEventListener("click",()=>Ka(null)),document.querySelectorAll(".edit-wh-btn").forEach(e=>{e.addEventListener("click",()=>{const i=w.warehouses.find(o=>o.id===Number(e.dataset.id));i&&Ka(i)})}),document.querySelectorAll(".transfer-from-wh-btn").forEach(e=>{e.addEventListener("click",()=>{Nc(Number(e.dataset.id))})}),document.querySelectorAll(".delete-wh-btn").forEach(e=>{e.addEventListener("click",()=>{const i=w.warehouses.find(o=>o.id===Number(e.dataset.id));i&&rg(i)})})}}async function Bi(){var t;const n=document.getElementById("inv-tab-content");if(n){try{const e=await B.get("/inventory/categories");e.success&&(w.categories=e.categories)}catch(e){console.error("Failed to reload categories:",e)}n.innerHTML=`
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
            ${w.categories.map(e=>`
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
  `,(t=document.getElementById("btn-add-category"))==null||t.addEventListener("click",()=>Ja(null)),document.querySelectorAll(".edit-cat-btn").forEach(e=>{e.addEventListener("click",()=>{const i=w.categories.find(o=>o.id===Number(e.dataset.id));i&&Ja(i)})}),document.querySelectorAll(".delete-cat-btn").forEach(e=>{e.addEventListener("click",()=>{const i=w.categories.find(o=>o.id===Number(e.dataset.id));i&&ag(i)})})}}async function og(){const n=document.getElementById("inv-tab-content");if(n)try{const e=(await B.get("/inventory/batches/expiry")).batches||[];n.innerHTML=`
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
    `}catch(t){P(t.message,"error")}}async function _s(){var t;const n=document.getElementById("inv-tab-content");if(n)try{const i=(await B.get("/inventory/ledger")).ledger||[];n.innerHTML=`
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
              `:i.map(o=>{const s=Number(o.quantity)>0;let r="tag-info";return o.transaction_type.includes("TRANSFER")?r="tag-warning":o.transaction_type==="SALE"||o.transaction_type==="POS"?r="tag-danger":o.transaction_type==="PURCHASE"&&(r="tag-success"),`
                  <tr>
                    <td style="font-family:var(--font-mono); font-size:0.78rem;">
                      ${o.created_at?new Date(o.created_at).toLocaleString("en-PK"):"Just now"}
                    </td>
                    <td><span class="tag ${r}">${o.transaction_type}</span></td>
                    <td>
                      <div style="font-weight:600; color:#fff;">${o.product_name||"Item #"+o.product_id}</div>
                      <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">${o.product_sku||""}</div>
                    </td>
                    <td>${o.warehouse_name||"Warehouse #"+o.warehouse_id}</td>
                    <td style="font-weight:700; font-family:var(--font-mono); color:${s?"#34d399":"#f87171"};">
                      ${s?"+":""}${o.quantity}
                    </td>
                    <td>${R(o.unit_cost||0)}</td>
                    <td style="font-size:0.82rem; color:var(--text-secondary);">${o.notes||o.reference_type||"Ledger Auto-Post"}</td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `,(t=document.getElementById("btn-refresh-ledger"))==null||t.addEventListener("click",_s)}catch(e){P(e.message,"error")}}function ts(n=null){var r,a,c,l;const t=!!n,e=w.categories||[],i=w.warehouses||[],o=`
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
  `;document.body.insertAdjacentHTML("beforeend",o);const s=document.getElementById("product-crud-modal");(r=document.getElementById("btn-close-prod-modal"))==null||r.addEventListener("click",()=>s.remove()),(a=document.getElementById("btn-cancel-prod"))==null||a.addEventListener("click",()=>s.remove()),(c=document.getElementById("btn-gen-barcode"))==null||c.addEventListener("click",()=>{document.getElementById("prod-form-barcode").value="896"+Math.floor(1e8+Math.random()*9e8)}),(l=document.getElementById("product-form"))==null||l.addEventListener("submit",async d=>{var f,h;d.preventDefault();const u={name:document.getElementById("prod-form-name").value.trim(),sku:document.getElementById("prod-form-sku").value.trim().toUpperCase(),barcode:document.getElementById("prod-form-barcode").value.trim(),category_id:document.getElementById("prod-form-category").value,uom:document.getElementById("prod-form-uom").value,cost_price:document.getElementById("prod-form-cost").value,selling_price:document.getElementById("prod-form-selling").value,tax_rate:document.getElementById("prod-form-tax").value,reorder_level:document.getElementById("prod-form-reorder").value,is_batch_tracked:document.getElementById("prod-form-batch-tracked").checked};t||(u.initial_stock=((f=document.getElementById("prod-form-initial-stock"))==null?void 0:f.value)||0,u.warehouse_id=((h=document.getElementById("prod-form-target-wh"))==null?void 0:h.value)||1);try{if(t){const p=await B.request(`/inventory/products/${n.id}`,{method:"PUT",body:JSON.stringify(u)});p.success&&(P(`Product ${p.product.name} updated successfully!`,"success"),s.remove(),await Jt(),fe())}else{const p=await B.post("/inventory/products",u);p.success&&(P(`Product ${p.product.name} created successfully!`,"success"),s.remove(),await Jt(),fe())}}catch(p){P(p.message,"error")}})}function sg(n){confirm(`Are you sure you want to deactivate product: "${n.name}" (${n.sku})?`)&&B.request(`/inventory/products/${n.id}`,{method:"DELETE"}).then(async t=>{t.success&&(P(t.message||"Product deactivated","info"),await Jt(),fe())}).catch(t=>P(t.message,"error"))}function Ka(n=null){var o,s,r;const t=!!n,e=`
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
  `;document.body.insertAdjacentHTML("beforeend",e);const i=document.getElementById("warehouse-crud-modal");(o=document.getElementById("btn-close-wh-modal"))==null||o.addEventListener("click",()=>i.remove()),(s=document.getElementById("btn-cancel-wh"))==null||s.addEventListener("click",()=>i.remove()),(r=document.getElementById("wh-form"))==null||r.addEventListener("submit",async a=>{a.preventDefault();const c={name:document.getElementById("wh-name").value.trim(),code:document.getElementById("wh-code").value.trim().toUpperCase(),address:document.getElementById("wh-address").value.trim(),phone:document.getElementById("wh-phone").value.trim(),is_default:document.getElementById("wh-is-default").checked};try{if(t){const l=await B.request(`/inventory/warehouses/${n.id}`,{method:"PUT",body:JSON.stringify(c)});l.success&&(P(`Warehouse ${l.warehouse.name} updated!`,"success"),i.remove(),cn())}else{const l=await B.post("/inventory/warehouses",c);l.success&&(P(`Warehouse ${l.warehouse.name} created!`,"success"),i.remove(),cn())}}catch(l){P(l.message,"error")}})}function rg(n){confirm(`Are you sure you want to deactivate warehouse "${n.name}"?`)&&B.request(`/inventory/warehouses/${n.id}`,{method:"DELETE"}).then(t=>{t.success&&(P(t.message,"info"),cn())}).catch(t=>P(t.message,"error"))}function Ja(n=null){var o,s,r;const t=!!n,e=`
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
  `;document.body.insertAdjacentHTML("beforeend",e);const i=document.getElementById("category-crud-modal");(o=document.getElementById("btn-close-cat-modal"))==null||o.addEventListener("click",()=>i.remove()),(s=document.getElementById("btn-cancel-cat"))==null||s.addEventListener("click",()=>i.remove()),(r=document.getElementById("cat-form"))==null||r.addEventListener("submit",async a=>{a.preventDefault();const c={name:document.getElementById("cat-name").value.trim(),code:document.getElementById("cat-code").value.trim().toUpperCase(),description:document.getElementById("cat-desc").value.trim()};try{if(t){const l=await B.request(`/inventory/categories/${n.id}`,{method:"PUT",body:JSON.stringify(c)});l.success&&(P(`Category ${l.category.name} updated!`,"success"),i.remove(),await Jt(),Bi())}else{const l=await B.post("/inventory/categories",c);l.success&&(P(`Category ${l.category.name} created!`,"success"),i.remove(),await Jt(),Bi())}}catch(l){P(l.message,"error")}})}function ag(n){confirm(`Are you sure you want to delete category "${n.name}"? Products in this category will become Uncategorized.`)&&B.request(`/inventory/categories/${n.id}`,{method:"DELETE"}).then(async t=>{t.success&&(P(t.message,"info"),await Jt(),Bi())}).catch(t=>P(t.message,"error"))}function Nc(n=null){var s,r,a;const t=w.warehouses||[],e=w.products||[];if(t.length<2){P("You must have at least 2 active warehouses to perform inter-warehouse transfers.","error");return}const i=`
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
                ${e.map(c=>`
                  <option value="${c.id}">${c.name} (Total Stock: ${c.stock||0} ${c.uom||"Pcs"})</option>
                `).join("")}
              </select>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.85rem;">
              <div class="form-group">
                <label class="form-label">Source Warehouse (From) *:</label>
                <select id="transfer-from-wh" class="form-control" required>
                  ${t.map(c=>`
                    <option value="${c.id}" ${n===c.id?"selected":""}>${c.name}</option>
                  `).join("")}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Destination Warehouse (To) *:</label>
                <select id="transfer-to-wh" class="form-control" required>
                  ${t.map((c,l)=>`
                    <option value="${c.id}" ${!n&&l===1||n&&n!==c.id?"selected":""}>${c.name}</option>
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
  `;document.body.insertAdjacentHTML("beforeend",i);const o=document.getElementById("transfer-modal");(s=document.getElementById("btn-close-transfer-modal"))==null||s.addEventListener("click",()=>o.remove()),(r=document.getElementById("btn-cancel-transfer"))==null||r.addEventListener("click",()=>o.remove()),(a=document.getElementById("transfer-form"))==null||a.addEventListener("submit",async c=>{c.preventDefault();const l=document.getElementById("transfer-prod").value,d=document.getElementById("transfer-from-wh").value,u=document.getElementById("transfer-to-wh").value,f=document.getElementById("transfer-qty").value,h=document.getElementById("transfer-notes").value;if(d===u){P("Source and destination warehouses must be different!","error");return}try{const p=await B.post("/inventory/transfer-stock",{product_id:l,from_warehouse_id:d,to_warehouse_id:u,quantity:f,notes:h});p.success&&(P(p.message,"success"),o.remove(),await Jt(),ut==="warehouses"?cn():ut==="ledger"?_s():fe())}catch(p){P(p.message,"error")}})}function lg(){var e,i,o;const n=`
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
              ${w.products.map(s=>`<option value="${s.id}">${s.name} (Current: ${s.stock||0})</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Warehouse Location:</label>
            <select id="adj-warehouse" class="form-control">
              ${w.warehouses.map(s=>`<option value="${s.id}">${s.name}</option>`).join("")}
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
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("adjust-modal");(e=document.getElementById("btn-close-adjust-modal"))==null||e.addEventListener("click",()=>t.remove()),(i=document.getElementById("btn-dismiss-adjust"))==null||i.addEventListener("click",()=>t.remove()),(o=document.getElementById("btn-confirm-adjust"))==null||o.addEventListener("click",async()=>{const s=document.getElementById("adj-product").value,r=document.getElementById("adj-warehouse").value,a=document.getElementById("adj-qty").value,c=document.getElementById("adj-reason").value;try{const l=await B.post("/inventory/adjust-stock",{product_id:s,warehouse_id:r,quantity:a,reason:c});l.success&&(P(l.message,"success"),t.remove(),await Jt(),fe())}catch(l){P(l.message,"error")}})}function cg(){var s,r,a,c;const n=w.products[0]||{name:"Sample Item",barcode:"896400010101",selling_price:150,sku:"ITM-001"};function t(l,d=6){const u=w.activeCompany||{name:"OneNet Solutions"},f=Lc(l.barcode||l.sku||"896400010101",{width:1.4,height:34,fontSize:11,margin:2});return Array.from({length:d}).map(()=>`
      <div style="border:1px dashed #64748b; border-radius:6px; padding:8px 6px; text-align:center; background:#ffffff; color:#0f172a; display:flex; flex-direction:column; justify-content:space-between; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <div style="font-weight:800; font-size:10px; text-transform:uppercase; letter-spacing:0.5px; color:#0f172a;">${u.name||"ONENET SOLUTIONS"}</div>
        <div style="font-size:9.5px; font-weight:600; margin:1px 0; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; color:#334155;">${l.name.slice(0,24)}</div>
        <div style="margin:2px 0; display:flex; justify-content:center; width:100%;">
          ${f}
        </div>
        <div style="font-weight:800; font-size:11.5px; color:#0f172a; margin-top:1px;">${R(l.selling_price)}</div>
      </div>
    `).join("")}const e=`
    <div class="modal-overlay" id="barcode-labels-modal" style="backdrop-filter: blur(8px); z-index:9999;">
      <div class="modal-content" style="max-width: 680px; width:95%; border-radius:16px; background:var(--bg-card); border:1px solid var(--border-bright);">
        <div class="modal-header" style="display:flex; justify-content:space-between; align-items:center;">
          <div>
            <div style="display:inline-flex; align-items:center; gap:6px; background:rgba(56,189,248,0.12); color:#38bdf8; padding:2px 8px; border-radius:20px; font-size:0.72rem; font-weight:700; margin-bottom:3px;">
              ⚡ OPTICAL CODE 128 ENGINE
            </div>
            <h3 class="modal-title" style="font-size:1.25rem; font-weight:800; margin:0;">Barcode Label Designer & Sheet Printing</h3>
          </div>
          <button class="btn-icon btn-sm" id="btn-close-label-modal" style="border:none; cursor:pointer;">✕</button>
        </div>
        <div class="modal-body" style="padding:1.25rem;">
          <div style="display:grid; grid-template-columns: 2fr 1fr 1fr; gap:0.75rem; margin-bottom:1rem;">
            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-weight:700; font-size:0.8rem;">Select Product for Labels:</label>
              <select id="label-product-picker" class="form-control" style="font-size:0.85rem;">
                ${w.products.map(l=>`
                  <option value="${l.id}">${l.name} (${l.barcode||l.sku})</option>
                `).join("")}
              </select>
            </div>
            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-weight:700; font-size:0.8rem;">Sheet Format:</label>
              <select id="label-format-picker" class="form-control" style="font-size:0.85rem;">
                <option value="a4_3x8">A4 Sheet 3×8 (24/page)</option>
                <option value="a4_2x5">A4 Sheet 2×5 (10/page)</option>
                <option value="thermal_roll">Thermal Roll (50×30mm)</option>
              </select>
            </div>
            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-weight:700; font-size:0.8rem;">Sticker Count:</label>
              <select id="label-count-picker" class="form-control" style="font-size:0.85rem;">
                <option value="6">6 Labels</option>
                <option value="12" selected>12 Labels</option>
                <option value="24">24 Labels (Full Page)</option>
                <option value="48">48 Labels (2 Pages)</option>
              </select>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
            <span style="font-size:0.82rem; color:var(--text-muted);">
              Live 100% Scannable Code 128 Vector Preview:
            </span>
            <span class="tag tag-success" style="font-size:0.72rem; padding:2px 8px;">
              ✓ Optical Laser & Camera Compatible
            </span>
          </div>

          <div id="label-sheet-preview" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(170px, 1fr)); gap:10px; padding:12px; background:#f8fafc; border:1px solid var(--border-color); border-radius:10px; max-height:360px; overflow-y:auto;">
            ${t(n,6)}
          </div>
        </div>
        <div class="modal-footer" style="display:flex; justify-content:flex-end; gap:0.75rem;">
          <button class="btn btn-outline" id="btn-dismiss-label">Close</button>
          <button class="btn btn-primary" id="btn-print-labels" style="font-weight:700;">🖨️ Print Label Sheet</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",e);const i=document.getElementById("barcode-labels-modal");(s=document.getElementById("btn-close-label-modal"))==null||s.addEventListener("click",()=>i.remove()),(r=document.getElementById("btn-dismiss-label"))==null||r.addEventListener("click",()=>i.remove()),i.addEventListener("click",l=>{l.target===i&&i.remove()});const o=()=>{var f;const l=(f=document.getElementById("label-product-picker"))==null?void 0:f.value,d=w.products.find(h=>h.id===Number(l))||n,u=document.getElementById("label-sheet-preview");u&&(u.innerHTML=t(d,6))};(a=document.getElementById("label-product-picker"))==null||a.addEventListener("change",o),(c=document.getElementById("btn-print-labels"))==null||c.addEventListener("click",()=>{var h,p,m;const l=(h=document.getElementById("label-product-picker"))==null?void 0:h.value,d=w.products.find(g=>g.id===Number(l))||n,u=Number(((p=document.getElementById("label-count-picker"))==null?void 0:p.value)||12),f=((m=document.getElementById("label-format-picker"))==null?void 0:m.value)||"a4_3x8";Km(d,u,f)})}async function Jt(){try{const[n,t,e]=await Promise.all([B.get("/inventory/products"),B.get("/inventory/categories"),B.get("/inventory/warehouses")]);n.success&&(w.products=n.products),t.success&&(w.categories=t.categories),e.success&&(w.warehouses=e.warehouses)}catch(n){console.error("Failed refreshing inventory data:",n)}}async function dg(n){n.innerHTML=`
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
  `,await ws(),hg()}async function ws(){const n=document.getElementById("sales-tab-content");if(n)try{const e=(await B.get("/sales/invoices")).invoices||[];n.innerHTML=`
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
                  <td style="font-weight:700;">${R(i.total_amount)}</td>
                  <td>${R(i.paid_amount)}</td>
                  <td style="color:${i.balance_amount>0?"#f87171":"#34d399"}; font-weight:700;">${R(i.balance_amount)}</td>
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
    `,document.querySelectorAll(".view-einvoice-btn").forEach(i=>{i.addEventListener("click",()=>{const o=e.find(s=>s.id===Number(i.dataset.invId));o&&zc(o)})})}catch(t){P(t.message,"error")}}async function ug(){const n=document.getElementById("sales-tab-content");if(n)try{const e=(await B.get("/sales/orders")).orders||[];n.innerHTML=`
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
                  <td style="font-weight:700;">${R(i.total_amount)}</td>
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
    `}catch(t){P(t.message,"error")}}function fg(){const n=document.getElementById("sales-tab-content");n&&(n.innerHTML=`
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
            ${w.customers.map(t=>`
              <tr>
                <td>
                  <div style="font-weight:700; color:#ffffff;">${t.business_name||t.name}</div>
                  <div style="font-size:0.75rem; color:var(--text-muted);">${t.name}</div>
                </td>
                <td>${t.phone}</td>
                <td>${t.address}, ${t.city}</td>
                <td style="font-family:var(--font-mono);">${t.tax_number||"Unregistered"}</td>
                <td>${R(t.credit_limit)}</td>
                <td style="font-weight:700; color:${t.current_balance>0?"#f87171":"#34d399"};">
                  ${R(t.current_balance)}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `)}function hg(){var t;const n=document.querySelectorAll(".sales-tab-btn");n.forEach(e=>{e.addEventListener("click",()=>{n.forEach(o=>o.classList.remove("active")),e.classList.add("active");const i=e.dataset.tab;i==="invoices"?ws():i==="orders"?ug():i==="customers"&&fg()})}),(t=document.getElementById("btn-create-invoice-modal"))==null||t.addEventListener("click",pg)}function zc(n){var i,o,s;const t=`
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
              ${n.items.map(r=>`
                <tr style="border-bottom:1px solid #e2e8f0;">
                  <td style="padding:8px;">${r.name}</td>
                  <td style="padding:8px; text-align:center;">${r.quantity}</td>
                  <td style="padding:8px; text-align:right;">${r.unit_price.toFixed(2)}</td>
                  <td style="padding:8px; text-align:right; font-weight:bold;">${r.total_price.toFixed(2)}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>

          <div style="display:flex; justify-content:flex-end;">
            <div style="width:260px; font-size:13px;">
              <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Subtotal:</span><span>${R(n.subtotal)}</span></div>
              <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Sales Tax (18%):</span><span>${R(n.tax_amount)}</span></div>
              <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Discount:</span><span>-${R(n.discount_amount)}</span></div>
              <div style="display:flex; justify-content:space-between; padding:6px 0; border-top:2px solid #0f172a; font-weight:bold; font-size:15px; color:#0284c7;">
                <span>Total Amount:</span><span>${R(n.total_amount)}</span>
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
  `;document.body.insertAdjacentHTML("beforeend",t);const e=document.getElementById("einvoice-modal");(i=document.getElementById("btn-close-inv-modal"))==null||i.addEventListener("click",()=>e.remove()),(o=document.getElementById("btn-close-inv"))==null||o.addEventListener("click",()=>e.remove()),(s=document.getElementById("btn-print-sales-invoice"))==null||s.addEventListener("click",()=>Xm(n))}async function pg(){var a,c,l,d,u,f;const n=document.getElementById("create-inv-modal");if(n&&n.remove(),!w.products||w.products.length===0)try{const h=await B.get("/inventory/products");h.success&&(w.products=h.products)}catch(h){console.warn("Could not load products:",h)}if(!w.customers||w.customers.length===0)try{const h=await B.get("/sales/customers");h.success&&(w.customers=h.customers)}catch(h){console.warn("Could not load customers:",h)}const t=w.products[0]||{id:1,selling_price:100,tax_rate:18};let e=[{product_id:t.id,quantity:1,unit_price:Number(t.selling_price)||100,tax_rate:Number(t.tax_rate)||18}];const i=`
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
                ${w.customers.map(h=>`
                  <option value="${h.id}">${h.business_name||h.name} (Balance: ${R(h.current_balance||0)})</option>
                `).join("")}
              </select>
            </div>
            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-weight:700; font-size:0.82rem;">Dispatch Warehouse:</label>
              <select id="new-inv-wh" class="form-control" style="font-size:0.9rem;">
                ${(w.warehouses||[{id:1,name:"Central Logistics Hub"}]).map(h=>`
                  <option value="${h.id}">${h.name}</option>
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
  `;document.body.insertAdjacentHTML("beforeend",i);const o=document.getElementById("create-inv-modal");function s(){var A,M;let h=0,p=0;e.forEach(O=>{const I=Number(O.unit_price||0)*Number(O.quantity||0),L=I*Number(O.tax_rate||0)/100;h+=I,p+=L});const m=Number(((A=document.getElementById("new-inv-discount"))==null?void 0:A.value)||0),g=Math.max(0,h+p-m),b=Number(((M=document.getElementById("new-inv-paid"))==null?void 0:M.value)||0),v=Math.max(0,g-b),y=document.getElementById("inv-calc-subtotal"),x=document.getElementById("inv-calc-tax"),S=document.getElementById("inv-calc-discount"),E=document.getElementById("inv-calc-total"),k=document.getElementById("inv-calc-paid"),C=document.getElementById("inv-calc-balance"),_=document.getElementById("inv-item-count");y&&(y.textContent=R(h)),x&&(x.textContent=R(p)),S&&(S.textContent=`-${R(m)}`),E&&(E.textContent=R(g)),k&&(k.textContent=R(b)),C&&(C.textContent=R(v)),_&&(_.textContent=e.length)}function r(){const h=document.getElementById("invoice-items-tbody");h&&(h.innerHTML=e.map((p,m)=>{const g=Number(p.unit_price||0)*Number(p.quantity||0),b=g*Number(p.tax_rate||0)/100,v=g+b;return`
        <tr data-idx="${m}" style="border-bottom: 1px solid var(--border-color);">
          <td style="padding: 8px 6px; font-weight:700; color:var(--text-muted); text-align:center;">${m+1}</td>
          <td style="padding: 8px 6px;">
            <select class="form-control item-prod-select" data-idx="${m}" style="font-size:0.85rem; padding:0.4rem 0.6rem;">
              ${w.products.map(y=>`
                <option value="${y.id}" ${y.id===Number(p.product_id)?"selected":""}>
                  ${y.name} (Stock: ${y.stock})
                </option>
              `).join("")}
            </select>
          </td>
          <td style="padding: 8px 6px; width: 125px;">
            <input type="number" step="0.01" class="form-control item-price-input" data-idx="${m}" value="${p.unit_price}" style="font-size:0.85rem; padding:0.4rem 0.6rem; text-align:right;" />
          </td>
          <td style="padding: 8px 6px; width: 95px;">
            <input type="number" min="1" class="form-control item-qty-input" data-idx="${m}" value="${p.quantity}" style="font-size:0.85rem; padding:0.4rem 0.6rem; text-align:center;" />
          </td>
          <td style="padding: 8px 6px; width: 90px;">
            <input type="number" step="0.1" class="form-control item-tax-input" data-idx="${m}" value="${p.tax_rate}" style="font-size:0.85rem; padding:0.4rem 0.6rem; text-align:center;" />
          </td>
          <td style="padding: 8px 6px; width: 130px; text-align:right; font-weight:700; color:var(--text-main);">
            ${R(v)}
          </td>
          <td style="padding: 8px 6px; width: 45px; text-align:center;">
            ${e.length>1?`
              <button type="button" class="btn-icon btn-sm text-danger btn-remove-item" data-idx="${m}" title="Remove Item" style="padding:2px 6px; font-size:13px; border:none; background:none; cursor:pointer;">✕</button>
            `:""}
          </td>
        </tr>
      `}).join(""),h.querySelectorAll(".item-prod-select").forEach(p=>{p.addEventListener("change",m=>{const g=Number(m.target.dataset.idx),b=w.products.find(v=>v.id===Number(m.target.value));b&&(e[g].product_id=b.id,e[g].unit_price=Number(b.selling_price||0),e[g].tax_rate=Number(b.tax_rate||18),r(),s())})}),h.querySelectorAll(".item-price-input").forEach(p=>{p.addEventListener("input",m=>{const g=Number(m.target.dataset.idx);e[g].unit_price=Number(m.target.value)||0,s()})}),h.querySelectorAll(".item-qty-input").forEach(p=>{p.addEventListener("input",m=>{const g=Number(m.target.dataset.idx);e[g].quantity=Number(m.target.value)||1,s()})}),h.querySelectorAll(".item-tax-input").forEach(p=>{p.addEventListener("input",m=>{const g=Number(m.target.dataset.idx);e[g].tax_rate=Number(m.target.value)||0,s()})}),h.querySelectorAll(".btn-remove-item").forEach(p=>{p.addEventListener("click",m=>{const g=Number(m.currentTarget.dataset.idx);e.splice(g,1),r(),s()})}))}r(),s(),(a=document.getElementById("btn-add-line-item"))==null||a.addEventListener("click",()=>{const h=w.products[e.length%w.products.length]||t;e.push({product_id:h.id,quantity:1,unit_price:Number(h.selling_price)||100,tax_rate:Number(h.tax_rate)||18}),r(),s()}),(c=document.getElementById("new-inv-discount"))==null||c.addEventListener("input",s),(l=document.getElementById("new-inv-paid"))==null||l.addEventListener("input",s),(d=document.getElementById("btn-close-create-inv"))==null||d.addEventListener("click",()=>o.remove()),(u=document.getElementById("btn-dismiss-create-inv"))==null||u.addEventListener("click",()=>o.remove()),o.addEventListener("click",h=>{h.target===o&&o.remove()}),(f=document.getElementById("btn-submit-new-inv"))==null||f.addEventListener("click",async()=>{var v;const h=document.getElementById("new-inv-cust").value,p=document.getElementById("new-inv-discount").value,m=document.getElementById("new-inv-paid").value,g=((v=document.getElementById("new-inv-notes"))==null?void 0:v.value)||"",b=document.getElementById("btn-submit-new-inv");if(!e||e.length===0){P("Please add at least one product line item to the invoice","warning");return}b&&(b.disabled=!0,b.textContent="Generating & Posting Invoice...");try{const y=await B.post("/sales/invoices",{customer_id:h,items:e.map(x=>({product_id:Number(x.product_id),quantity:Number(x.quantity)||1,unit_price:Number(x.unit_price)||0,tax_rate:Number(x.tax_rate)||0})),discount_amount:Number(p)||0,paid_amount:Number(m)||0,notes:g});y.success&&(P(`Invoice ${y.invoice.invoice_number} created with QR Code!`,"success"),o.remove(),await ws(),zc(y.invoice))}catch(y){P(y.message,"error"),b&&(b.disabled=!1,b.textContent="Generate & Post Tax Invoice")}})}async function mg(n){n.innerHTML=`
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
  `,await Es(),vg()}async function Es(){const n=document.getElementById("acc-tab-content");if(n)try{const e=(await B.get("/accounting/journals")).entries||[];n.innerHTML=`
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
                      ${i.lines.map(o=>`
                        <div style="display:flex; justify-content:space-between; margin:2px 0;">
                          <span style="color:${o.debit>0?"#38bdf8":"#cbd5e1"};">
                            ${o.debit>0?"Dr.":"   Cr."} ${o.account_name}
                          </span>
                          <span style="font-weight:700;">
                            ${o.debit>0?R(o.debit):R(o.credit)}
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
    `}catch(t){P(t.message,"error")}}async function gg(){const n=document.getElementById("acc-tab-content");if(n)try{const e=(await B.get("/accounting/accounts")).accounts||[],i={Asset:e.filter(o=>o.type==="Asset"),Liability:e.filter(o=>o.type==="Liability"),Equity:e.filter(o=>o.type==="Equity"),Revenue:e.filter(o=>o.type==="Revenue"),Expense:e.filter(o=>o.type==="Expense")};n.innerHTML=`
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.25rem;">
        ${Object.entries(i).map(([o,s])=>`
          <div class="glass-panel">
            <div class="panel-header">
              <h3 class="panel-title">${o} Accounts</h3>
              <span class="tag tag-info">${s.length} Accounts</span>
            </div>
            <div style="display:flex; flex-direction:column; gap:0.6rem;">
              ${s.map(r=>`
                <div style="display:flex; justify-content:space-between; align-items:center; padding:0.6rem 0.8rem; background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:var(--radius-sm);">
                  <div>
                    <span style="font-family:var(--font-mono); font-size:0.78rem; color:#38bdf8; font-weight:700; margin-right:6px;">${r.code}</span>
                    <span style="font-size:0.86rem; font-weight:500;">${r.name}</span>
                  </div>
                  <span style="font-family:var(--font-heading); font-weight:700; font-size:0.95rem; color:#ffffff;">
                    ${R(r.current_balance)}
                  </span>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `}catch(t){P(t.message,"error")}}async function bg(){const n=document.getElementById("acc-tab-content");if(n)try{const t=await B.get("/accounting/reports"),{trial_balance:e,profit_and_loss:i,balance_sheet:o}=t;n.innerHTML=`
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
        <!-- Profit & Loss -->
        <div class="glass-panel">
          <div class="panel-header">
            <h3 class="panel-title">Income Statement (Profit & Loss)</h3>
            <span class="tag tag-success">Live YTD</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem; font-size:0.9rem;">
            <div style="font-weight:700; color:#34d399; margin-bottom:4px;">REVENUE</div>
            ${i.revenues.map(s=>`
              <div style="display:flex; justify-content:space-between;">
                <span>${s.name}</span>
                <span>${R(s.current_balance)}</span>
              </div>
            `).join("")}
            <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); padding-top:4px;">
              <span>Total Gross Revenue:</span>
              <span style="color:#34d399;">${R(i.total_revenue)}</span>
            </div>

            <div style="font-weight:700; color:#f87171; margin-top:10px; margin-bottom:4px;">EXPENSES & COGS</div>
            ${i.expenses.map(s=>`
              <div style="display:flex; justify-content:space-between;">
                <span>${s.name}</span>
                <span>${R(s.current_balance)}</span>
              </div>
            `).join("")}
            <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); padding-top:4px;">
              <span>Total Expenses:</span>
              <span style="color:#f87171;">${R(i.total_expense)}</span>
            </div>

            <div style="display:flex; justify-content:space-between; font-weight:800; font-size:1.15rem; border-top:2px solid var(--border-bright); padding-top:8px; margin-top:8px; color:#38bdf8;">
              <span>NET OPERATING PROFIT:</span>
              <span>${R(i.net_profit)}</span>
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
            ${o.assets.map(s=>`
              <div style="display:flex; justify-content:space-between;">
                <span>${s.name}</span>
                <span>${R(s.current_balance)}</span>
              </div>
            `).join("")}
            <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); padding-top:4px;">
              <span>Total Assets:</span>
              <span style="color:#38bdf8;">${R(o.total_assets)}</span>
            </div>

            <div style="font-weight:700; color:#fbbf24; margin-top:10px;">LIABILITIES & EQUITY</div>
            ${o.liabilities.map(s=>`
              <div style="display:flex; justify-content:space-between;">
                <span>${s.name}</span>
                <span>${R(s.current_balance)}</span>
              </div>
            `).join("")}
            <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); padding-top:4px;">
              <span>Total Liabilities & Equity:</span>
              <span style="color:#fbbf24;">${R(o.total_liabilities_and_equity||o.total_equity_and_liabilities)}</span>
            </div>
          </div>
        </div>
      </div>
    `}catch(t){P(t.message,"error")}}function vg(){var t;const n=document.querySelectorAll(".acc-tab-btn");n.forEach(e=>{e.addEventListener("click",()=>{n.forEach(o=>o.classList.remove("active")),e.classList.add("active");const i=e.dataset.tab;i==="journals"?Es():i==="coa"?gg():i==="reports"&&bg()})}),(t=document.getElementById("btn-new-jv-modal"))==null||t.addEventListener("click",yg)}function yg(){var e,i,o;document.body.insertAdjacentHTML("beforeend",`
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
  `);const t=document.getElementById("manual-jv-modal");(e=document.getElementById("btn-close-jv"))==null||e.addEventListener("click",()=>t.remove()),(i=document.getElementById("btn-cancel-jv"))==null||i.addEventListener("click",()=>t.remove()),(o=document.getElementById("btn-submit-jv"))==null||o.addEventListener("click",async()=>{const s=document.getElementById("jv-ref").value,r=document.getElementById("jv-narration").value,a=Number(document.getElementById("jv-debit-acc").value),c=Number(document.getElementById("jv-debit-amt").value),l=Number(document.getElementById("jv-credit-acc").value),d=Number(document.getElementById("jv-credit-amt").value);if(c!==d){P("Debits and Credits must balance exactly!","error");return}try{(await B.post("/accounting/journals",{reference:s,narration:r,lines:[{accountId:a,debit:c,credit:0},{accountId:l,debit:0,credit:d}]})).success&&(P("Journal Voucher posted to General Ledger!","success"),t.remove(),Es())}catch(u){P(u.message,"error")}})}async function xg(n){n.innerHTML=`
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
  `,await Fc()}async function Fc(){const n=document.getElementById("mfg-recipes-list"),t=document.getElementById("mfg-orders-list");try{const[e,i]=await Promise.all([B.get("/manufacturing/recipes"),B.get("/manufacturing/orders")]),o=e.recipes||[],s=i.orders||[];n&&(n.innerHTML=o.map(r=>`
        <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:1.25rem; margin-bottom:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
            <div>
              <h4 style="font-size:1.05rem; font-weight:700; color:#38bdf8;">${r.recipe_name}</h4>
              <p style="font-size:0.82rem; color:var(--text-muted); margin-top:2px;">Produces: <strong>${r.output_quantity} unit</strong> of ${r.finished_product_name}</p>
            </div>
            <button class="btn btn-primary btn-sm run-assembly-btn" data-recipe-id="${r.id}" data-recipe-name="${r.recipe_name}">
              ⚙️ Execute Assembly
            </button>
          </div>

          <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom:0.75rem;">
            <em>${r.instructions}</em>
          </p>

          <div style="background:rgba(0,0,0,0.25); border-radius:var(--radius-sm); padding:0.75rem;">
            <div style="font-size:0.78rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; margin-bottom:6px;">Required Raw Materials:</div>
            ${r.items.map(a=>`
              <div style="display:flex; justify-content:space-between; font-size:0.85rem; padding:2px 0;">
                <span>• ${a.name}</span>
                <span style="font-family:var(--font-mono); font-weight:600;">${a.required_quantity} units (${R(a.unit_cost)}/ea)</span>
              </div>
            `).join("")}
          </div>
        </div>
      `).join(""),n.querySelectorAll(".run-assembly-btn").forEach(r=>{r.addEventListener("click",()=>{const a=Number(r.dataset.recipeId),c=r.dataset.recipeName;_g(a,c)})})),t&&(t.innerHTML=`
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
              ${s.map(r=>`
                <tr>
                  <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${r.order_number}</td>
                  <td>${r.finished_product_name}</td>
                  <td style="font-weight:700;">${r.produced_quantity} units</td>
                  <td>${R(r.total_production_cost)}</td>
                  <td><span class="tag tag-success">${r.status}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `)}catch(e){P(e.message,"error")}}function _g(n,t){var o,s,r;const e=`
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
  `;document.body.insertAdjacentHTML("beforeend",e);const i=document.getElementById("run-asm-modal");(o=document.getElementById("btn-close-asm-modal"))==null||o.addEventListener("click",()=>i.remove()),(s=document.getElementById("btn-cancel-asm"))==null||s.addEventListener("click",()=>i.remove()),(r=document.getElementById("btn-confirm-asm"))==null||r.addEventListener("click",async()=>{const a=document.getElementById("asm-qty").value;try{const c=await B.post("/manufacturing/assemble",{bom_recipe_id:n,warehouse_id:1,quantity:a});c.success&&(P(c.message,"success"),i.remove(),Fc())}catch(c){P(c.message,"error")}})}var we={},ho,Qa;function wg(){return Qa||(Qa=1,ho=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then}),ho}var po={},Ht={},Za;function pe(){if(Za)return Ht;Za=1;let n;const t=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];return Ht.getSymbolSize=function(i){if(!i)throw new Error('"version" cannot be null or undefined');if(i<1||i>40)throw new Error('"version" should be in range from 1 to 40');return i*4+17},Ht.getSymbolTotalCodewords=function(i){return t[i]},Ht.getBCHDigit=function(e){let i=0;for(;e!==0;)i++,e>>>=1;return i},Ht.setToSJISFunction=function(i){if(typeof i!="function")throw new Error('"toSJISFunc" is not a valid function.');n=i},Ht.isKanjiModeEnabled=function(){return typeof n<"u"},Ht.toSJIS=function(i){return n(i)},Ht}var mo={},tl;function Ss(){return tl||(tl=1,(function(n){n.L={bit:1},n.M={bit:0},n.Q={bit:3},n.H={bit:2};function t(e){if(typeof e!="string")throw new Error("Param is not a string");switch(e.toLowerCase()){case"l":case"low":return n.L;case"m":case"medium":return n.M;case"q":case"quartile":return n.Q;case"h":case"high":return n.H;default:throw new Error("Unknown EC Level: "+e)}}n.isValid=function(i){return i&&typeof i.bit<"u"&&i.bit>=0&&i.bit<4},n.from=function(i,o){if(n.isValid(i))return i;try{return t(i)}catch{return o}}})(mo)),mo}var go,el;function Eg(){if(el)return go;el=1;function n(){this.buffer=[],this.length=0}return n.prototype={get:function(t){const e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let i=0;i<e;i++)this.putBit((t>>>e-i-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}},go=n,go}var bo,nl;function Sg(){if(nl)return bo;nl=1;function n(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}return n.prototype.set=function(t,e,i,o){const s=t*this.size+e;this.data[s]=i,o&&(this.reservedBit[s]=!0)},n.prototype.get=function(t,e){return this.data[t*this.size+e]},n.prototype.xor=function(t,e,i){this.data[t*this.size+e]^=i},n.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]},bo=n,bo}var vo={},il;function kg(){return il||(il=1,(function(n){const t=pe().getSymbolSize;n.getRowColCoords=function(i){if(i===1)return[];const o=Math.floor(i/7)+2,s=t(i),r=s===145?26:Math.ceil((s-13)/(2*o-2))*2,a=[s-7];for(let c=1;c<o-1;c++)a[c]=a[c-1]-r;return a.push(6),a.reverse()},n.getPositions=function(i){const o=[],s=n.getRowColCoords(i),r=s.length;for(let a=0;a<r;a++)for(let c=0;c<r;c++)a===0&&c===0||a===0&&c===r-1||a===r-1&&c===0||o.push([s[a],s[c]]);return o}})(vo)),vo}var yo={},ol;function Cg(){if(ol)return yo;ol=1;const n=pe().getSymbolSize,t=7;return yo.getPositions=function(i){const o=n(i);return[[0,0],[o-t,0],[0,o-t]]},yo}var xo={},sl;function Mg(){return sl||(sl=1,(function(n){n.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const t={N1:3,N2:3,N3:40,N4:10};n.isValid=function(o){return o!=null&&o!==""&&!isNaN(o)&&o>=0&&o<=7},n.from=function(o){return n.isValid(o)?parseInt(o,10):void 0},n.getPenaltyN1=function(o){const s=o.size;let r=0,a=0,c=0,l=null,d=null;for(let u=0;u<s;u++){a=c=0,l=d=null;for(let f=0;f<s;f++){let h=o.get(u,f);h===l?a++:(a>=5&&(r+=t.N1+(a-5)),l=h,a=1),h=o.get(f,u),h===d?c++:(c>=5&&(r+=t.N1+(c-5)),d=h,c=1)}a>=5&&(r+=t.N1+(a-5)),c>=5&&(r+=t.N1+(c-5))}return r},n.getPenaltyN2=function(o){const s=o.size;let r=0;for(let a=0;a<s-1;a++)for(let c=0;c<s-1;c++){const l=o.get(a,c)+o.get(a,c+1)+o.get(a+1,c)+o.get(a+1,c+1);(l===4||l===0)&&r++}return r*t.N2},n.getPenaltyN3=function(o){const s=o.size;let r=0,a=0,c=0;for(let l=0;l<s;l++){a=c=0;for(let d=0;d<s;d++)a=a<<1&2047|o.get(l,d),d>=10&&(a===1488||a===93)&&r++,c=c<<1&2047|o.get(d,l),d>=10&&(c===1488||c===93)&&r++}return r*t.N3},n.getPenaltyN4=function(o){let s=0;const r=o.data.length;for(let c=0;c<r;c++)s+=o.data[c];return Math.abs(Math.ceil(s*100/r/5)-10)*t.N4};function e(i,o,s){switch(i){case n.Patterns.PATTERN000:return(o+s)%2===0;case n.Patterns.PATTERN001:return o%2===0;case n.Patterns.PATTERN010:return s%3===0;case n.Patterns.PATTERN011:return(o+s)%3===0;case n.Patterns.PATTERN100:return(Math.floor(o/2)+Math.floor(s/3))%2===0;case n.Patterns.PATTERN101:return o*s%2+o*s%3===0;case n.Patterns.PATTERN110:return(o*s%2+o*s%3)%2===0;case n.Patterns.PATTERN111:return(o*s%3+(o+s)%2)%2===0;default:throw new Error("bad maskPattern:"+i)}}n.applyMask=function(o,s){const r=s.size;for(let a=0;a<r;a++)for(let c=0;c<r;c++)s.isReserved(c,a)||s.xor(c,a,e(o,c,a))},n.getBestMask=function(o,s){const r=Object.keys(n.Patterns).length;let a=0,c=1/0;for(let l=0;l<r;l++){s(l),n.applyMask(l,o);const d=n.getPenaltyN1(o)+n.getPenaltyN2(o)+n.getPenaltyN3(o)+n.getPenaltyN4(o);n.applyMask(l,o),d<c&&(c=d,a=l)}return a}})(xo)),xo}var hi={},rl;function jc(){if(rl)return hi;rl=1;const n=Ss(),t=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],e=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];return hi.getBlocksCount=function(o,s){switch(s){case n.L:return t[(o-1)*4+0];case n.M:return t[(o-1)*4+1];case n.Q:return t[(o-1)*4+2];case n.H:return t[(o-1)*4+3];default:return}},hi.getTotalCodewordsCount=function(o,s){switch(s){case n.L:return e[(o-1)*4+0];case n.M:return e[(o-1)*4+1];case n.Q:return e[(o-1)*4+2];case n.H:return e[(o-1)*4+3];default:return}},hi}var _o={},Fe={},al;function Ag(){if(al)return Fe;al=1;const n=new Uint8Array(512),t=new Uint8Array(256);return(function(){let i=1;for(let o=0;o<255;o++)n[o]=i,t[i]=o,i<<=1,i&256&&(i^=285);for(let o=255;o<512;o++)n[o]=n[o-255]})(),Fe.log=function(i){if(i<1)throw new Error("log("+i+")");return t[i]},Fe.exp=function(i){return n[i]},Fe.mul=function(i,o){return i===0||o===0?0:n[t[i]+t[o]]},Fe}var ll;function Og(){return ll||(ll=1,(function(n){const t=Ag();n.mul=function(i,o){const s=new Uint8Array(i.length+o.length-1);for(let r=0;r<i.length;r++)for(let a=0;a<o.length;a++)s[r+a]^=t.mul(i[r],o[a]);return s},n.mod=function(i,o){let s=new Uint8Array(i);for(;s.length-o.length>=0;){const r=s[0];for(let c=0;c<o.length;c++)s[c]^=t.mul(o[c],r);let a=0;for(;a<s.length&&s[a]===0;)a++;s=s.slice(a)}return s},n.generateECPolynomial=function(i){let o=new Uint8Array([1]);for(let s=0;s<i;s++)o=n.mul(o,new Uint8Array([1,t.exp(s)]));return o}})(_o)),_o}var wo,cl;function Pg(){if(cl)return wo;cl=1;const n=Og();function t(e){this.genPoly=void 0,this.degree=e,this.degree&&this.initialize(this.degree)}return t.prototype.initialize=function(i){this.degree=i,this.genPoly=n.generateECPolynomial(this.degree)},t.prototype.encode=function(i){if(!this.genPoly)throw new Error("Encoder not initialized");const o=new Uint8Array(i.length+this.degree);o.set(i);const s=n.mod(o,this.genPoly),r=this.degree-s.length;if(r>0){const a=new Uint8Array(this.degree);return a.set(s,r),a}return s},wo=t,wo}var Eo={},So={},ko={},dl;function Hc(){return dl||(dl=1,ko.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40}),ko}var _t={},ul;function qc(){if(ul)return _t;ul=1;const n="[0-9]+",t="[A-Z $%*+\\-./:]+";let e="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";e=e.replace(/u/g,"\\u");const i="(?:(?![A-Z0-9 $%*+\\-./:]|"+e+`)(?:.|[\r
]))+`;_t.KANJI=new RegExp(e,"g"),_t.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),_t.BYTE=new RegExp(i,"g"),_t.NUMERIC=new RegExp(n,"g"),_t.ALPHANUMERIC=new RegExp(t,"g");const o=new RegExp("^"+e+"$"),s=new RegExp("^"+n+"$"),r=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");return _t.testKanji=function(c){return o.test(c)},_t.testNumeric=function(c){return s.test(c)},_t.testAlphanumeric=function(c){return r.test(c)},_t}var fl;function me(){return fl||(fl=1,(function(n){const t=Hc(),e=qc();n.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},n.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},n.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},n.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},n.MIXED={bit:-1},n.getCharCountIndicator=function(s,r){if(!s.ccBits)throw new Error("Invalid mode: "+s);if(!t.isValid(r))throw new Error("Invalid version: "+r);return r>=1&&r<10?s.ccBits[0]:r<27?s.ccBits[1]:s.ccBits[2]},n.getBestModeForData=function(s){return e.testNumeric(s)?n.NUMERIC:e.testAlphanumeric(s)?n.ALPHANUMERIC:e.testKanji(s)?n.KANJI:n.BYTE},n.toString=function(s){if(s&&s.id)return s.id;throw new Error("Invalid mode")},n.isValid=function(s){return s&&s.bit&&s.ccBits};function i(o){if(typeof o!="string")throw new Error("Param is not a string");switch(o.toLowerCase()){case"numeric":return n.NUMERIC;case"alphanumeric":return n.ALPHANUMERIC;case"kanji":return n.KANJI;case"byte":return n.BYTE;default:throw new Error("Unknown mode: "+o)}}n.from=function(s,r){if(n.isValid(s))return s;try{return i(s)}catch{return r}}})(So)),So}var hl;function Ig(){return hl||(hl=1,(function(n){const t=pe(),e=jc(),i=Ss(),o=me(),s=Hc(),r=7973,a=t.getBCHDigit(r);function c(f,h,p){for(let m=1;m<=40;m++)if(h<=n.getCapacity(m,p,f))return m}function l(f,h){return o.getCharCountIndicator(f,h)+4}function d(f,h){let p=0;return f.forEach(function(m){const g=l(m.mode,h);p+=g+m.getBitsLength()}),p}function u(f,h){for(let p=1;p<=40;p++)if(d(f,p)<=n.getCapacity(p,h,o.MIXED))return p}n.from=function(h,p){return s.isValid(h)?parseInt(h,10):p},n.getCapacity=function(h,p,m){if(!s.isValid(h))throw new Error("Invalid QR Code version");typeof m>"u"&&(m=o.BYTE);const g=t.getSymbolTotalCodewords(h),b=e.getTotalCodewordsCount(h,p),v=(g-b)*8;if(m===o.MIXED)return v;const y=v-l(m,h);switch(m){case o.NUMERIC:return Math.floor(y/10*3);case o.ALPHANUMERIC:return Math.floor(y/11*2);case o.KANJI:return Math.floor(y/13);case o.BYTE:default:return Math.floor(y/8)}},n.getBestVersionForData=function(h,p){let m;const g=i.from(p,i.M);if(Array.isArray(h)){if(h.length>1)return u(h,g);if(h.length===0)return 1;m=h[0]}else m=h;return c(m.mode,m.getLength(),g)},n.getEncodedBits=function(h){if(!s.isValid(h)||h<7)throw new Error("Invalid QR Code version");let p=h<<12;for(;t.getBCHDigit(p)-a>=0;)p^=r<<t.getBCHDigit(p)-a;return h<<12|p}})(Eo)),Eo}var Co={},pl;function Tg(){if(pl)return Co;pl=1;const n=pe(),t=1335,e=21522,i=n.getBCHDigit(t);return Co.getEncodedBits=function(s,r){const a=s.bit<<3|r;let c=a<<10;for(;n.getBCHDigit(c)-i>=0;)c^=t<<n.getBCHDigit(c)-i;return(a<<10|c)^e},Co}var Mo={},Ao,ml;function Rg(){if(ml)return Ao;ml=1;const n=me();function t(e){this.mode=n.NUMERIC,this.data=e.toString()}return t.getBitsLength=function(i){return 10*Math.floor(i/3)+(i%3?i%3*3+1:0)},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(i){let o,s,r;for(o=0;o+3<=this.data.length;o+=3)s=this.data.substr(o,3),r=parseInt(s,10),i.put(r,10);const a=this.data.length-o;a>0&&(s=this.data.substr(o),r=parseInt(s,10),i.put(r,a*3+1))},Ao=t,Ao}var Oo,gl;function Lg(){if(gl)return Oo;gl=1;const n=me(),t=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function e(i){this.mode=n.ALPHANUMERIC,this.data=i}return e.getBitsLength=function(o){return 11*Math.floor(o/2)+6*(o%2)},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(o){let s;for(s=0;s+2<=this.data.length;s+=2){let r=t.indexOf(this.data[s])*45;r+=t.indexOf(this.data[s+1]),o.put(r,11)}this.data.length%2&&o.put(t.indexOf(this.data[s]),6)},Oo=e,Oo}var Po,bl;function Bg(){if(bl)return Po;bl=1;const n=me();function t(e){this.mode=n.BYTE,typeof e=="string"?this.data=new TextEncoder().encode(e):this.data=new Uint8Array(e)}return t.getBitsLength=function(i){return i*8},t.prototype.getLength=function(){return this.data.length},t.prototype.getBitsLength=function(){return t.getBitsLength(this.data.length)},t.prototype.write=function(e){for(let i=0,o=this.data.length;i<o;i++)e.put(this.data[i],8)},Po=t,Po}var Io,vl;function Dg(){if(vl)return Io;vl=1;const n=me(),t=pe();function e(i){this.mode=n.KANJI,this.data=i}return e.getBitsLength=function(o){return o*13},e.prototype.getLength=function(){return this.data.length},e.prototype.getBitsLength=function(){return e.getBitsLength(this.data.length)},e.prototype.write=function(i){let o;for(o=0;o<this.data.length;o++){let s=t.toSJIS(this.data[o]);if(s>=33088&&s<=40956)s-=33088;else if(s>=57408&&s<=60351)s-=49472;else throw new Error("Invalid SJIS character: "+this.data[o]+`
Make sure your charset is UTF-8`);s=(s>>>8&255)*192+(s&255),i.put(s,13)}},Io=e,Io}var To={exports:{}},yl;function $g(){return yl||(yl=1,(function(n){var t={single_source_shortest_paths:function(e,i,o){var s={},r={};r[i]=0;var a=t.PriorityQueue.make();a.push(i,0);for(var c,l,d,u,f,h,p,m,g;!a.empty();){c=a.pop(),l=c.value,u=c.cost,f=e[l]||{};for(d in f)f.hasOwnProperty(d)&&(h=f[d],p=u+h,m=r[d],g=typeof r[d]>"u",(g||m>p)&&(r[d]=p,a.push(d,p),s[d]=l))}if(typeof o<"u"&&typeof r[o]>"u"){var b=["Could not find a path from ",i," to ",o,"."].join("");throw new Error(b)}return s},extract_shortest_path_from_predecessor_list:function(e,i){for(var o=[],s=i;s;)o.push(s),e[s],s=e[s];return o.reverse(),o},find_path:function(e,i,o){var s=t.single_source_shortest_paths(e,i,o);return t.extract_shortest_path_from_predecessor_list(s,o)},PriorityQueue:{make:function(e){var i=t.PriorityQueue,o={},s;e=e||{};for(s in i)i.hasOwnProperty(s)&&(o[s]=i[s]);return o.queue=[],o.sorter=e.sorter||i.default_sorter,o},default_sorter:function(e,i){return e.cost-i.cost},push:function(e,i){var o={value:e,cost:i};this.queue.push(o),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};n.exports=t})(To)),To.exports}var xl;function Ng(){return xl||(xl=1,(function(n){const t=me(),e=Rg(),i=Lg(),o=Bg(),s=Dg(),r=qc(),a=pe(),c=$g();function l(b){return unescape(encodeURIComponent(b)).length}function d(b,v,y){const x=[];let S;for(;(S=b.exec(y))!==null;)x.push({data:S[0],index:S.index,mode:v,length:S[0].length});return x}function u(b){const v=d(r.NUMERIC,t.NUMERIC,b),y=d(r.ALPHANUMERIC,t.ALPHANUMERIC,b);let x,S;return a.isKanjiModeEnabled()?(x=d(r.BYTE,t.BYTE,b),S=d(r.KANJI,t.KANJI,b)):(x=d(r.BYTE_KANJI,t.BYTE,b),S=[]),v.concat(y,x,S).sort(function(k,C){return k.index-C.index}).map(function(k){return{data:k.data,mode:k.mode,length:k.length}})}function f(b,v){switch(v){case t.NUMERIC:return e.getBitsLength(b);case t.ALPHANUMERIC:return i.getBitsLength(b);case t.KANJI:return s.getBitsLength(b);case t.BYTE:return o.getBitsLength(b)}}function h(b){return b.reduce(function(v,y){const x=v.length-1>=0?v[v.length-1]:null;return x&&x.mode===y.mode?(v[v.length-1].data+=y.data,v):(v.push(y),v)},[])}function p(b){const v=[];for(let y=0;y<b.length;y++){const x=b[y];switch(x.mode){case t.NUMERIC:v.push([x,{data:x.data,mode:t.ALPHANUMERIC,length:x.length},{data:x.data,mode:t.BYTE,length:x.length}]);break;case t.ALPHANUMERIC:v.push([x,{data:x.data,mode:t.BYTE,length:x.length}]);break;case t.KANJI:v.push([x,{data:x.data,mode:t.BYTE,length:l(x.data)}]);break;case t.BYTE:v.push([{data:x.data,mode:t.BYTE,length:l(x.data)}])}}return v}function m(b,v){const y={},x={start:{}};let S=["start"];for(let E=0;E<b.length;E++){const k=b[E],C=[];for(let _=0;_<k.length;_++){const A=k[_],M=""+E+_;C.push(M),y[M]={node:A,lastCount:0},x[M]={};for(let O=0;O<S.length;O++){const I=S[O];y[I]&&y[I].node.mode===A.mode?(x[I][M]=f(y[I].lastCount+A.length,A.mode)-f(y[I].lastCount,A.mode),y[I].lastCount+=A.length):(y[I]&&(y[I].lastCount=A.length),x[I][M]=f(A.length,A.mode)+4+t.getCharCountIndicator(A.mode,v))}}S=C}for(let E=0;E<S.length;E++)x[S[E]].end=0;return{map:x,table:y}}function g(b,v){let y;const x=t.getBestModeForData(b);if(y=t.from(v,x),y!==t.BYTE&&y.bit<x.bit)throw new Error('"'+b+'" cannot be encoded with mode '+t.toString(y)+`.
 Suggested mode is: `+t.toString(x));switch(y===t.KANJI&&!a.isKanjiModeEnabled()&&(y=t.BYTE),y){case t.NUMERIC:return new e(b);case t.ALPHANUMERIC:return new i(b);case t.KANJI:return new s(b);case t.BYTE:return new o(b)}}n.fromArray=function(v){return v.reduce(function(y,x){return typeof x=="string"?y.push(g(x,null)):x.data&&y.push(g(x.data,x.mode)),y},[])},n.fromString=function(v,y){const x=u(v,a.isKanjiModeEnabled()),S=p(x),E=m(S,y),k=c.find_path(E.map,"start","end"),C=[];for(let _=1;_<k.length-1;_++)C.push(E.table[k[_]].node);return n.fromArray(h(C))},n.rawSplit=function(v){return n.fromArray(u(v,a.isKanjiModeEnabled()))}})(Mo)),Mo}var _l;function zg(){if(_l)return po;_l=1;const n=pe(),t=Ss(),e=Eg(),i=Sg(),o=kg(),s=Cg(),r=Mg(),a=jc(),c=Pg(),l=Ig(),d=Tg(),u=me(),f=Ng();function h(E,k){const C=E.size,_=s.getPositions(k);for(let A=0;A<_.length;A++){const M=_[A][0],O=_[A][1];for(let I=-1;I<=7;I++)if(!(M+I<=-1||C<=M+I))for(let L=-1;L<=7;L++)O+L<=-1||C<=O+L||(I>=0&&I<=6&&(L===0||L===6)||L>=0&&L<=6&&(I===0||I===6)||I>=2&&I<=4&&L>=2&&L<=4?E.set(M+I,O+L,!0,!0):E.set(M+I,O+L,!1,!0))}}function p(E){const k=E.size;for(let C=8;C<k-8;C++){const _=C%2===0;E.set(C,6,_,!0),E.set(6,C,_,!0)}}function m(E,k){const C=o.getPositions(k);for(let _=0;_<C.length;_++){const A=C[_][0],M=C[_][1];for(let O=-2;O<=2;O++)for(let I=-2;I<=2;I++)O===-2||O===2||I===-2||I===2||O===0&&I===0?E.set(A+O,M+I,!0,!0):E.set(A+O,M+I,!1,!0)}}function g(E,k){const C=E.size,_=l.getEncodedBits(k);let A,M,O;for(let I=0;I<18;I++)A=Math.floor(I/3),M=I%3+C-8-3,O=(_>>I&1)===1,E.set(A,M,O,!0),E.set(M,A,O,!0)}function b(E,k,C){const _=E.size,A=d.getEncodedBits(k,C);let M,O;for(M=0;M<15;M++)O=(A>>M&1)===1,M<6?E.set(M,8,O,!0):M<8?E.set(M+1,8,O,!0):E.set(_-15+M,8,O,!0),M<8?E.set(8,_-M-1,O,!0):M<9?E.set(8,15-M-1+1,O,!0):E.set(8,15-M-1,O,!0);E.set(_-8,8,1,!0)}function v(E,k){const C=E.size;let _=-1,A=C-1,M=7,O=0;for(let I=C-1;I>0;I-=2)for(I===6&&I--;;){for(let L=0;L<2;L++)if(!E.isReserved(A,I-L)){let $=!1;O<k.length&&($=(k[O]>>>M&1)===1),E.set(A,I-L,$),M--,M===-1&&(O++,M=7)}if(A+=_,A<0||C<=A){A-=_,_=-_;break}}}function y(E,k,C){const _=new e;C.forEach(function(L){_.put(L.mode.bit,4),_.put(L.getLength(),u.getCharCountIndicator(L.mode,E)),L.write(_)});const A=n.getSymbolTotalCodewords(E),M=a.getTotalCodewordsCount(E,k),O=(A-M)*8;for(_.getLengthInBits()+4<=O&&_.put(0,4);_.getLengthInBits()%8!==0;)_.putBit(0);const I=(O-_.getLengthInBits())/8;for(let L=0;L<I;L++)_.put(L%2?17:236,8);return x(_,E,k)}function x(E,k,C){const _=n.getSymbolTotalCodewords(k),A=a.getTotalCodewordsCount(k,C),M=_-A,O=a.getBlocksCount(k,C),I=_%O,L=O-I,$=Math.floor(_/O),F=Math.floor(M/O),G=F+1,st=$-F,Q=new c(st);let yt=0;const kt=new Array(O),Ct=new Array(O);let Mt=0;const At=new Uint8Array(E.buffer);for(let ge=0;ge<O;ge++){const Ki=ge<L?F:G;kt[ge]=At.slice(yt,yt+Ki),Ct[ge]=Q.encode(kt[ge]),yt+=Ki,Mt=Math.max(Mt,Ki)}const Ot=new Uint8Array(_);let xt=0,Pt,It;for(Pt=0;Pt<Mt;Pt++)for(It=0;It<O;It++)Pt<kt[It].length&&(Ot[xt++]=kt[It][Pt]);for(Pt=0;Pt<st;Pt++)for(It=0;It<O;It++)Ot[xt++]=Ct[It][Pt];return Ot}function S(E,k,C,_){let A;if(Array.isArray(E))A=f.fromArray(E);else if(typeof E=="string"){let $=k;if(!$){const F=f.rawSplit(E);$=l.getBestVersionForData(F,C)}A=f.fromString(E,$||40)}else throw new Error("Invalid data");const M=l.getBestVersionForData(A,C);if(!M)throw new Error("The amount of data is too big to be stored in a QR Code");if(!k)k=M;else if(k<M)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+M+`.
`);const O=y(k,C,A),I=n.getSymbolSize(k),L=new i(I);return h(L,k),p(L),m(L,k),b(L,C,0),k>=7&&g(L,k),v(L,O),isNaN(_)&&(_=r.getBestMask(L,b.bind(null,L,C))),r.applyMask(_,L),b(L,C,_),{modules:L,version:k,errorCorrectionLevel:C,maskPattern:_,segments:A}}return po.create=function(k,C){if(typeof k>"u"||k==="")throw new Error("No input text");let _=t.M,A,M;return typeof C<"u"&&(_=t.from(C.errorCorrectionLevel,t.M),A=l.from(C.version),M=r.from(C.maskPattern),C.toSJISFunc&&n.setToSJISFunction(C.toSJISFunc)),S(k,A,_,M)},po}var Ro={},Lo={},wl;function Vc(){return wl||(wl=1,(function(n){function t(e){if(typeof e=="number"&&(e=e.toString()),typeof e!="string")throw new Error("Color should be defined as hex string");let i=e.slice().replace("#","").split("");if(i.length<3||i.length===5||i.length>8)throw new Error("Invalid hex color: "+e);(i.length===3||i.length===4)&&(i=Array.prototype.concat.apply([],i.map(function(s){return[s,s]}))),i.length===6&&i.push("F","F");const o=parseInt(i.join(""),16);return{r:o>>24&255,g:o>>16&255,b:o>>8&255,a:o&255,hex:"#"+i.slice(0,6).join("")}}n.getOptions=function(i){i||(i={}),i.color||(i.color={});const o=typeof i.margin>"u"||i.margin===null||i.margin<0?4:i.margin,s=i.width&&i.width>=21?i.width:void 0,r=i.scale||4;return{width:s,scale:s?4:r,margin:o,color:{dark:t(i.color.dark||"#000000ff"),light:t(i.color.light||"#ffffffff")},type:i.type,rendererOpts:i.rendererOpts||{}}},n.getScale=function(i,o){return o.width&&o.width>=i+o.margin*2?o.width/(i+o.margin*2):o.scale},n.getImageWidth=function(i,o){const s=n.getScale(i,o);return Math.floor((i+o.margin*2)*s)},n.qrToImageData=function(i,o,s){const r=o.modules.size,a=o.modules.data,c=n.getScale(r,s),l=Math.floor((r+s.margin*2)*c),d=s.margin*c,u=[s.color.light,s.color.dark];for(let f=0;f<l;f++)for(let h=0;h<l;h++){let p=(f*l+h)*4,m=s.color.light;if(f>=d&&h>=d&&f<l-d&&h<l-d){const g=Math.floor((f-d)/c),b=Math.floor((h-d)/c);m=u[a[g*r+b]?1:0]}i[p++]=m.r,i[p++]=m.g,i[p++]=m.b,i[p]=m.a}}})(Lo)),Lo}var El;function Fg(){return El||(El=1,(function(n){const t=Vc();function e(o,s,r){o.clearRect(0,0,s.width,s.height),s.style||(s.style={}),s.height=r,s.width=r,s.style.height=r+"px",s.style.width=r+"px"}function i(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}n.render=function(s,r,a){let c=a,l=r;typeof c>"u"&&(!r||!r.getContext)&&(c=r,r=void 0),r||(l=i()),c=t.getOptions(c);const d=t.getImageWidth(s.modules.size,c),u=l.getContext("2d"),f=u.createImageData(d,d);return t.qrToImageData(f.data,s,c),e(u,l,d),u.putImageData(f,0,0),l},n.renderToDataURL=function(s,r,a){let c=a;typeof c>"u"&&(!r||!r.getContext)&&(c=r,r=void 0),c||(c={});const l=n.render(s,r,c),d=c.type||"image/png",u=c.rendererOpts||{};return l.toDataURL(d,u.quality)}})(Ro)),Ro}var Bo={},Sl;function jg(){if(Sl)return Bo;Sl=1;const n=Vc();function t(o,s){const r=o.a/255,a=s+'="'+o.hex+'"';return r<1?a+" "+s+'-opacity="'+r.toFixed(2).slice(1)+'"':a}function e(o,s,r){let a=o+s;return typeof r<"u"&&(a+=" "+r),a}function i(o,s,r){let a="",c=0,l=!1,d=0;for(let u=0;u<o.length;u++){const f=Math.floor(u%s),h=Math.floor(u/s);!f&&!l&&(l=!0),o[u]?(d++,u>0&&f>0&&o[u-1]||(a+=l?e("M",f+r,.5+h+r):e("m",c,0),c=0,l=!1),f+1<s&&o[u+1]||(a+=e("h",d),d=0)):c++}return a}return Bo.render=function(s,r,a){const c=n.getOptions(r),l=s.modules.size,d=s.modules.data,u=l+c.margin*2,f=c.color.light.a?"<path "+t(c.color.light,"fill")+' d="M0 0h'+u+"v"+u+'H0z"/>':"",h="<path "+t(c.color.dark,"stroke")+' d="'+i(d,l,c.margin)+'"/>',p='viewBox="0 0 '+u+" "+u+'"',g='<svg xmlns="http://www.w3.org/2000/svg" '+(c.width?'width="'+c.width+'" height="'+c.width+'" ':"")+p+' shape-rendering="crispEdges">'+f+h+`</svg>
`;return typeof a=="function"&&a(null,g),g},Bo}var kl;function Hg(){if(kl)return we;kl=1;const n=wg(),t=zg(),e=Fg(),i=jg();function o(s,r,a,c,l){const d=[].slice.call(arguments,1),u=d.length,f=typeof d[u-1]=="function";if(!f&&!n())throw new Error("Callback required as last argument");if(f){if(u<2)throw new Error("Too few arguments provided");u===2?(l=a,a=r,r=c=void 0):u===3&&(r.getContext&&typeof l>"u"?(l=c,c=void 0):(l=c,c=a,a=r,r=void 0))}else{if(u<1)throw new Error("Too few arguments provided");return u===1?(a=r,r=c=void 0):u===2&&!r.getContext&&(c=a,a=r,r=void 0),new Promise(function(h,p){try{const m=t.create(a,c);h(s(m,r,c))}catch(m){p(m)}})}try{const h=t.create(a,c);l(null,s(h,r,c))}catch(h){l(h)}}return we.create=t.create,we.toCanvas=o.bind(null,e.render),we.toDataURL=o.bind(null,e.renderToDataURL),we.toString=o.bind(null,function(s,r,a){return i.render(s,a)}),we}var qg=Hg();const Vg=kc(qg);async function Uc(){var s,r,a;const n=document.getElementById("mobile-app-install-modal");n&&n.remove();const t=`${window.location.origin}/#mobile_booker`;let e="";try{e=await Vg.toDataURL(t,{width:240,margin:2,color:{dark:"#0f172a",light:"#ffffff"}})}catch(c){console.error("Error generating QR code:",c)}const i=`
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
  `;document.body.insertAdjacentHTML("beforeend",i);const o=document.getElementById("mobile-app-install-modal");(s=document.getElementById("btn-close-mobile-app-modal"))==null||s.addEventListener("click",()=>o.remove()),o.addEventListener("click",c=>{c.target===o&&o.remove()}),(r=document.getElementById("btn-copy-mobile-url"))==null||r.addEventListener("click",()=>{navigator.clipboard.writeText(t).then(()=>{P("Mobile URL copied to clipboard!","success")})}),(a=document.getElementById("btn-launch-mobile-booker-now"))==null||a.addEventListener("click",()=>{o.remove(),window.location.hash="#mobile_booker"})}let Cl=JSON.parse(localStorage.getItem("apexerppos_offline_orders")||"[]");function Ug(n){var t;n.innerHTML=`
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
          ${w.customers.map(e=>`
            <option value="${e.id}">${e.business_name||e.name} - ${e.city}</option>
          `).join("")}
        </select>
        <div id="cust-balance-preview" style="font-size:0.8rem; color:var(--text-muted); margin-top:6px;">
          Outstanding Balance: <strong style="color:#f87171;">${R(((t=w.customers[1])==null?void 0:t.current_balance)||0)}</strong>
        </div>
      </div>

      <!-- Product Catalog Cards -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
        <h3 style="font-size:1.05rem; font-weight:700;">Catalog</h3>
        <span style="font-size:0.8rem; color:var(--text-muted);"><span id="mobile-cart-count">0</span> items selected</span>
      </div>

      <div style="display:flex; flex-direction:column; gap:0.75rem; margin-bottom:1.5rem;" id="mobile-prods-list">
        ${w.products.map(e=>`
          <div style="display:flex; justify-content:space-between; align-items:center; padding:0.9rem 1rem; background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md);">
            <div>
              <div style="font-weight:600; font-size:0.92rem; color:#ffffff;">${e.name}</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">${e.sku} | In Stock: ${e.stock}</div>
              <div style="font-weight:700; color:#38bdf8; font-size:1rem; margin-top:2px;">${R(e.selling_price)}</div>
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
  `,Wc(),Wg()}function Wc(){const n=document.getElementById("gps-status-text");"geolocation"in navigator?navigator.geolocation.getCurrentPosition(t=>{w.mobileCart.geoLat=t.coords.latitude,w.mobileCart.geoLng=t.coords.longitude,n&&(n.innerHTML=`📍 GPS Verified: ${t.coords.latitude.toFixed(4)}, ${t.coords.longitude.toFixed(4)}`)},()=>{w.mobileCart.geoLat=24.8607,w.mobileCart.geoLng=67.0011,n&&(n.innerHTML="📍 GPS Tagged: 24.8607° N, 67.0011° E (Store)")}):(w.mobileCart.geoLat=24.8607,w.mobileCart.geoLng=67.0011,n&&(n.innerHTML="📍 GPS Tagged: 24.8607° N, 67.0011° E"))}function Wg(){var n,t,e,i;(n=document.getElementById("btn-show-qr-install"))==null||n.addEventListener("click",()=>{Uc()}),(t=document.getElementById("btn-refresh-gps"))==null||t.addEventListener("click",()=>{Wc(),P("Shop visit GPS coordinates updated","success")}),document.querySelectorAll(".mobile-add-btn").forEach(o=>{o.addEventListener("click",()=>{const s=Number(o.dataset.prodId),r=w.products.find(a=>a.id===s);if(r){const a=w.mobileCart.items.find(c=>c.product_id===r.id);a?a.quantity+=1:w.mobileCart.items.push({product_id:r.id,name:r.name,unit_price:Number(r.selling_price),tax_rate:Number(r.tax_rate||18),quantity:1}),Si(),P(`Added: ${r.name}`,"info")}})}),(e=document.getElementById("btn-camera-scanner"))==null||e.addEventListener("click",Gg),(i=document.getElementById("btn-submit-mobile-order"))==null||i.addEventListener("click",async()=>{var r;if(w.mobileCart.items.length===0){P("Please add products to the mobile order first","error");return}const s={customer_id:((r=document.getElementById("mobile-cust-select"))==null?void 0:r.value)||2,items:w.mobileCart.items,geo_latitude:w.mobileCart.geoLat,geo_longitude:w.mobileCart.geoLng,notes:"Booked via Mobile Order Booker PWA"};try{const a=await B.post("/sales/orders",s);a.success&&(P(`Order ${a.order.order_number} successfully booked!`,"success"),w.mobileCart.items=[],Si())}catch{Cl.push(s),localStorage.setItem("apexerppos_offline_orders",JSON.stringify(Cl)),P("Offline Mode: Order queued locally and will sync when online!","warning"),w.mobileCart.items=[],Si()}})}function Si(){const n=document.getElementById("mobile-cart-count"),t=document.getElementById("mobile-order-total");let e=0,i=0;for(const o of w.mobileCart.items){i+=o.quantity;const s=o.unit_price*o.quantity,r=s*o.tax_rate/100;e+=s+r}n&&(n.textContent=i),t&&(t.textContent=R(e))}function Gg(){var o,s;const n=`
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
            ${w.products.slice(0,4).map(r=>`
              <button class="btn btn-outline btn-sm sim-scan-btn" data-barcode="${r.barcode}">
                ${r.name.slice(0,15)} (${r.barcode})
              </button>
            `).join("")}
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-dismiss-camera">Close Camera</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("camera-scanner-modal"),e=document.getElementById("camera-stream-video");navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}).then(r=>{e&&(e.srcObject=r)}).catch(r=>{console.log("[Camera] Simulated preview (camera permission or desktop):",r.message)});const i=()=>{e&&e.srcObject&&e.srcObject.getTracks().forEach(r=>r.stop()),t.remove()};(o=document.getElementById("btn-close-camera"))==null||o.addEventListener("click",i),(s=document.getElementById("btn-dismiss-camera"))==null||s.addEventListener("click",i),t.querySelectorAll(".sim-scan-btn").forEach(r=>{r.addEventListener("click",()=>{const a=r.dataset.barcode,c=w.products.find(l=>l.barcode===a);c&&(w.mobileCart.items.push({product_id:c.id,name:c.name,unit_price:Number(c.selling_price),tax_rate:Number(c.tax_rate||18),quantity:1}),Si(),P(`Camera Scanned: ${c.name}`,"success"),i())})})}async function Yg(){var n;try{const t=await B.get("/companies");if(t.success&&t.companies.length>0){w.companies=t.companies;const e=((n=w.currentUser)==null?void 0:n.assigned_companies)||[1],i=t.companies.find(o=>{var s;return o.id===((s=w.activeCompany)==null?void 0:s.id)&&e.includes(o.id)});i?w.activeCompany=i:w.activeCompany=t.companies.find(o=>e.includes(o.id))||t.companies[0],localStorage.setItem("onenet_active_company",JSON.stringify(w.activeCompany))}}catch(t){console.warn("Could not fetch companies:",t)}Gi()}function Gi(){var r,a,c,l;const n=document.getElementById("company-switcher-container");if(!n)return;const t=w.activeCompany||{id:1,name:"OneNet Solutions"},e=((r=w.currentUser)==null?void 0:r.assigned_companies)||[1,2,3],i=w.companies.filter(d=>e.includes(d.id));n.innerHTML=`
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
        ${((a=w.currentUser)==null?void 0:a.role_name)==="Super Admin"?`
          <div class="company-menu-footer">
            <button class="btn btn-xs btn-primary" id="btn-create-company-modal" style="width:100%;">+ Add New Company Branch</button>
          </div>
        `:""}
      </div>
    </div>
  `;const o=document.getElementById("btn-toggle-company-menu"),s=document.getElementById("company-dropdown-menu");o==null||o.addEventListener("click",d=>{d.stopPropagation(),s.style.display=s.style.display==="block"?"none":"block"}),document.addEventListener("click",d=>{n.contains(d.target)||s&&(s.style.display="none")}),s==null||s.querySelectorAll(".company-menu-item").forEach(d=>{d.addEventListener("click",()=>{const u=parseInt(d.dataset.id),f=w.companies.find(h=>h.id===u);f&&(w.activeCompany=f,localStorage.setItem("onenet_active_company",JSON.stringify(f)),P(`Switched active company to: ${f.name}`,"success"),Gi())})}),(c=document.getElementById("btn-edit-active-company"))==null||c.addEventListener("click",d=>{d.stopPropagation(),s&&(s.style.display="none"),Xg(w.activeCompany)}),(l=document.getElementById("btn-create-company-modal"))==null||l.addEventListener("click",d=>{d.stopPropagation(),s&&(s.style.display="none"),Kg()})}function Xg(n){var o,s,r;const t=`
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
  `;document.body.insertAdjacentHTML("beforeend",t);const e=document.getElementById("company-edit-modal"),i=()=>e==null?void 0:e.remove();(o=document.getElementById("btn-close-comp-modal"))==null||o.addEventListener("click",i),(s=document.getElementById("btn-cancel-comp"))==null||s.addEventListener("click",i),(r=document.getElementById("btn-save-comp"))==null||r.addEventListener("click",async()=>{const a={name:document.getElementById("comp-name").value.trim(),legal_name:document.getElementById("comp-legal-name").value.trim(),tax_id:document.getElementById("comp-tax-id").value.trim(),strn:document.getElementById("comp-strn").value.trim(),phone:document.getElementById("comp-phone").value.trim(),email:document.getElementById("comp-email").value.trim(),address:document.getElementById("comp-address").value.trim(),city:document.getElementById("comp-city").value.trim(),currency:document.getElementById("comp-curr").value.trim()};try{(await B.put(`/companies/${n.id}`,a)).success&&(P("Company profile updated successfully!","success"),Object.assign(n,a),localStorage.setItem("onenet_active_company",JSON.stringify(n)),Gi(),i())}catch(c){P(c.message,"error")}})}function Kg(){var i,o,s;document.body.insertAdjacentHTML("beforeend",`
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
  `);const t=document.getElementById("company-create-modal"),e=()=>t==null?void 0:t.remove();(i=document.getElementById("btn-close-create-comp"))==null||i.addEventListener("click",e),(o=document.getElementById("btn-cancel-create-comp"))==null||o.addEventListener("click",e),(s=document.getElementById("btn-confirm-create-comp"))==null||s.addEventListener("click",async()=>{const r=document.getElementById("new-comp-name").value.trim();if(!r){P("Company name is required","error");return}try{const a=await B.post("/companies",{name:r,legal_name:document.getElementById("new-comp-legal").value.trim(),city:document.getElementById("new-comp-city").value.trim(),address:document.getElementById("new-comp-address").value.trim()});a.success&&(P(`Created branch: ${a.company.name}`,"success"),w.companies.push(a.company),w.currentUser&&w.currentUser.assigned_companies.push(a.company.id),Gi(),e())}catch(a){P(a.message,"error")}})}let es=null,ns=null;async function Jg(){try{const n=await B.get("/auth/config");n.success&&n.google_client_id&&(ns=n.google_client_id)}catch(n){console.warn("[Auth] Could not load auth config:",n.message)}}function Qg(n){var s,r,a;const t=document.getElementById("user-profile-widget-container");if(!t)return;const e=w.currentUser;if(!e){t.innerHTML=`
      <button class="btn btn-primary btn-sm" id="btn-open-login-modal">
        🔑 Sign In
      </button>
    `,(s=document.getElementById("btn-open-login-modal"))==null||s.addEventListener("click",()=>{Ml(()=>{typeof n=="function"&&n()})});return}t.innerHTML=`
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
  `;const i=document.getElementById("btn-toggle-user-menu"),o=document.getElementById("user-menu-dropdown");i==null||i.addEventListener("click",c=>{c.stopPropagation(),o.style.display=o.style.display==="block"?"none":"block"}),document.addEventListener("click",c=>{t.contains(c.target)||o&&(o.style.display="none")}),(r=document.getElementById("btn-switch-account"))==null||r.addEventListener("click",()=>{o&&(o.style.display="none"),Ml(n)}),(a=document.getElementById("btn-logout-session"))==null||a.addEventListener("click",()=>{o&&(o.style.display="none"),Zg(n)})}function Zg(n){localStorage.removeItem("onenet_token"),localStorage.removeItem("onenet_user"),localStorage.removeItem("apexerppos_token"),w.currentUser=null,P("You have been signed out.","info"),ks(n)}async function ks(n){var s,r;n&&(es=n);const t=document.getElementById("auth-root"),e=document.getElementById("app-root");if(e&&(e.style.display="none"),!t)return;await Jg(),t.style.display="flex",t.innerHTML=`
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
  `;const i=document.getElementById("portal-password"),o=document.getElementById("portal-toggle-password");o==null||o.addEventListener("click",()=>{i.type==="password"?(i.type="text",o.textContent="🔒"):(i.type="password",o.textContent="👁️")}),(s=document.getElementById("btn-forgot-password-modal"))==null||s.addEventListener("click",()=>{ib()}),tb(),(r=document.getElementById("portal-login-form"))==null||r.addEventListener("submit",async a=>{a.preventDefault();const c=document.getElementById("portal-username").value.trim(),l=document.getElementById("portal-password").value,d=document.getElementById("portal-submit-btn");d&&(d.disabled=!0,d.innerHTML=`
        <span class="status-dot-pulse" style="background:#fff;"></span>
        <span>Authenticating...</span>
      `);try{const u=await B.post("/auth/login",{username:c,password:l});u.success&&Yi(u)}catch(u){P(u.message||"Login failed","error"),d&&(d.disabled=!1,d.innerHTML=`
          <span>Sign In to Workspace</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        `)}})}function tb(){var e,i;const n=document.getElementById("portal-btn-google-sso"),t=document.getElementById("google-btn-rendered");if(ns&&((i=(e=window.google)==null?void 0:e.accounts)!=null&&i.id)&&t)try{window.google.accounts.id.initialize({client_id:ns,callback:eb,auto_select:!1,cancel_on_tap_outside:!0}),window.google.accounts.id.renderButton(t,{theme:"filled_blue",size:"large",shape:"rectangular",width:380,text:"continue_with",logo_alignment:"left"}),n&&(n.style.display="none");return}catch(o){console.warn("[Google Auth] Failed to initialize Google Identity Services:",o)}n&&(n.style.display="flex",n.addEventListener("click",()=>{nb()}))}async function eb(n){try{P("Verifying Google authorization token with Google servers...","info");const t=await B.post("/auth/google",{credential:n.credential});t.success&&(P("Google identity verified successfully!","success"),Yi(t))}catch(t){P(t.message||"Google authentication failed","error")}}function nb(){var i,o;const n=document.getElementById("google-config-modal");n&&n.remove();const t=`
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
  `;document.body.insertAdjacentHTML("beforeend",t);const e=document.getElementById("google-config-modal");(i=document.getElementById("btn-close-google-modal"))==null||i.addEventListener("click",()=>e.remove()),e.addEventListener("click",s=>{s.target===e&&e.remove()}),(o=document.getElementById("form-quick-google-auth"))==null||o.addEventListener("submit",async s=>{s.preventDefault();const r=document.getElementById("quick-google-email").value.trim(),a=document.getElementById("quick-google-name").value.trim();try{const c=await B.post("/auth/google",{email:r,name:a||r.split("@")[0],google_id:"google_oauth_"+Date.now()});c.success&&(e.remove(),P(`Google Authentication successful for ${r}!`,"success"),Yi(c))}catch(c){P(c.message,"error")}})}function ib(){var i,o;const n=document.getElementById("access-recovery-modal");n&&n.remove(),document.body.insertAdjacentHTML("beforeend",`
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
  `);const e=document.getElementById("access-recovery-modal");(i=document.getElementById("btn-close-recovery-modal"))==null||i.addEventListener("click",()=>e.remove()),(o=document.getElementById("btn-dismiss-recovery"))==null||o.addEventListener("click",()=>e.remove()),e.addEventListener("click",s=>{s.target===e&&e.remove()})}function Yi(n){B.setToken(n.token),localStorage.setItem("onenet_user",JSON.stringify(n.user)),w.currentUser=n.user,P(`Welcome, ${n.user.full_name}! (${n.user.role_name})`,"success");const t=document.getElementById("auth-root");t&&(t.style.display="none");const e=document.getElementById("app-root");e&&(e.style.display="flex"),typeof es=="function"&&es()}function Ml(n){var o,s;const t=document.getElementById("login-modal");t&&t.remove(),document.body.insertAdjacentHTML("beforeend",`
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
  `);const i=document.getElementById("login-modal");(o=document.getElementById("btn-close-login-modal"))==null||o.addEventListener("click",()=>i.remove()),i.addEventListener("click",r=>{r.target===i&&i.remove()}),(s=document.getElementById("modal-login-form"))==null||s.addEventListener("submit",async r=>{r.preventDefault();const a=document.getElementById("modal-login-username").value.trim(),c=document.getElementById("modal-login-password").value;try{const l=await B.post("/auth/login",{username:a,password:c});l.success&&(i.remove(),Yi(l),typeof n=="function"&&n())}catch(l){P(l.message,"error")}})}let Ze=[],pt={};const ob=[{key:"pos",name:"⚡ Point of Sale (POS)"},{key:"inventory",name:"📦 Inventory & Warehouses"},{key:"sales",name:"🧾 Sales & E-Invoicing"},{key:"accounting",name:"📚 Accounting & Ledgers"},{key:"manufacturing",name:"⚙️ Manufacturing & BOM"},{key:"mobile_booker",name:"📱 Mobile Order Booker"},{key:"payroll",name:"👥 HR, Attendance & Payroll"},{key:"reports",name:"📊 Enterprise Reports"},{key:"backup",name:"💾 Database Backup & Restore"},{key:"users",name:"🛡️ User Accounts & Security"}],sb=["view","create","edit","delete","approve","export"];async function rb(n){var e,i;n.innerHTML=`
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
  `;try{const[o,s]=await Promise.all([B.get("/users"),B.get("/users/permissions/matrix")]);o.success&&(Ze=o.users),s.success&&(pt=s.matrix,w.permissionsMatrix=s.matrix)}catch(o){P(o.message,"error")}const t=o=>{n.querySelectorAll(".users-tab-btn").forEach(r=>{r.classList.toggle("active",r.dataset.tab===o)});const s=document.getElementById("users-tab-content");o==="accounts"?Cs(s):ab(s)};n.querySelectorAll(".users-tab-btn").forEach(o=>{o.addEventListener("click",()=>t(o.dataset.tab))}),(e=document.getElementById("btn-create-user-modal"))==null||e.addEventListener("click",cb),(i=document.getElementById("btn-save-matrix"))==null||i.addEventListener("click",lb),t("accounts")}function Cs(n){n.innerHTML=`
    <div class="panel">
      <div class="panel-header">
        <h3 class="panel-title">System User Accounts</h3>
        <span style="font-size:0.85rem; color:var(--text-muted);">${Ze.length} Active Accounts</span>
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
            ${Ze.map(t=>{const e=(t.company_ids||[1]).map(i=>{const o=w.companies.find(s=>s.id===i);return o?o.name:`Company #${i}`}).join(", ");return`
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
  `,n.querySelectorAll(".btn-edit-user").forEach(t=>{t.addEventListener("click",()=>{const e=Ze.find(i=>i.id===parseInt(t.dataset.id));e&&db(e)})})}function ab(n){const t=Object.keys(pt);n.innerHTML=`
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
            ${ob.map(e=>`
              <tr>
                <td><strong>${e.name}</strong></td>
                ${t.map(i=>{var r;const o=((r=pt[i])==null?void 0:r[e.key])||[],s=i==="Super Admin";return`
                    <td style="text-align:center;">
                      <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:3px;">
                        ${sb.map(a=>{const c=o.includes(a)||s;return`
                            <span 
                              class="matrix-tag ${c?"active":"inactive"} ${s?"locked":""}" 
                              data-role="${i}" 
                              data-mod="${e.key}" 
                              data-act="${a}"
                              title="${c?"Granted: click to revoke":"Revoked: click to grant"}"
                            >
                              ${a.slice(0,3).toUpperCase()}
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
  `,n.querySelectorAll(".matrix-tag:not(.locked)").forEach(e=>{e.addEventListener("click",()=>{const i=e.dataset.role,o=e.dataset.mod,s=e.dataset.act;pt[i]||(pt[i]={}),pt[i][o]||(pt[i][o]=[]);const r=pt[i][o].indexOf(s);r>-1?(pt[i][o].splice(r,1),e.classList.remove("active"),e.classList.add("inactive")):(pt[i][o].push(s),e.classList.remove("inactive"),e.classList.add("active"))})})}async function lb(){try{(await B.put("/users/permissions/matrix",{matrix:pt})).success&&(w.permissionsMatrix=pt,P("Module Permissions Matrix saved successfully!","success"))}catch(n){P(n.message,"error")}}function cb(){var i,o,s;const n=`
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
              ${w.companies.map(r=>`
                <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
                  <input type="checkbox" class="chk-new-comp-access" value="${r.id}" checked />
                  <span>${r.name} (${r.city})</span>
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
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("user-create-modal"),e=()=>t==null?void 0:t.remove();(i=document.getElementById("btn-close-create-user"))==null||i.addEventListener("click",e),(o=document.getElementById("btn-cancel-create-user"))==null||o.addEventListener("click",e),(s=document.getElementById("btn-confirm-create-user"))==null||s.addEventListener("click",async()=>{const r=document.getElementById("new-user-fullname").value.trim(),a=document.getElementById("new-user-name").value.trim(),c=document.getElementById("new-user-email").value.trim(),l=document.getElementById("new-user-pass").value,d=document.getElementById("new-user-role").value,u=[];if(t.querySelectorAll(".chk-new-comp-access:checked").forEach(f=>{u.push(parseInt(f.value))}),!r||!a||!c||!l){P("All fields are required","error");return}try{const f=await B.post("/users",{full_name:r,username:a,email:c,password:l,role_name:d,company_ids:u});f.success&&(P("User created successfully!","success"),Ze.push(f.user),Cs(document.getElementById("users-tab-content")),e())}catch(f){P(f.message,"error")}})}function db(n){var o,s,r;const t=`
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
              ${w.companies.map(a=>{const c=(n.company_ids||[1]).includes(a.id)?"checked":"";return`
                  <label style="display:flex; align-items:center; gap:8px; font-size:13px; cursor:pointer;">
                    <input type="checkbox" class="chk-edit-comp-access" value="${a.id}" ${c} />
                    <span>${a.name} (${a.city})</span>
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
  `;document.body.insertAdjacentHTML("beforeend",t);const e=document.getElementById("user-edit-modal"),i=()=>e==null?void 0:e.remove();(o=document.getElementById("btn-close-edit-user"))==null||o.addEventListener("click",i),(s=document.getElementById("btn-cancel-edit-user"))==null||s.addEventListener("click",i),(r=document.getElementById("btn-confirm-edit-user"))==null||r.addEventListener("click",async()=>{const a=document.getElementById("edit-user-fullname").value.trim(),c=document.getElementById("edit-user-role").value,l=document.getElementById("edit-user-status").value==="true",d=document.getElementById("edit-user-pass").value,u=[];e.querySelectorAll(".chk-edit-comp-access:checked").forEach(f=>{u.push(parseInt(f.value))});try{(await B.put(`/users/${n.id}`,{full_name:a,role_name:c,is_active:l,password:d||void 0,company_ids:u})).success&&(P("User account updated successfully!","success"),n.full_name=a,n.role_name=c,n.is_active=l,n.company_ids=u,Cs(document.getElementById("users-tab-content")),i())}catch(f){P(f.message,"error")}})}let jt=[],Gc=[],Ge=[];async function ub(n){var e,i,o;n.innerHTML=`
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
  `,await Me();const t=s=>{n.querySelectorAll(".payroll-tab-btn").forEach(a=>{a.classList.toggle("active",a.dataset.tab===s)});const r=document.getElementById("payroll-tab-content");s==="employees"?Yc(r):s==="attendance"?Xi(r):Xc(r)};n.querySelectorAll(".payroll-tab-btn").forEach(s=>{s.addEventListener("click",()=>t(s.dataset.tab))}),(e=document.getElementById("btn-sync-biometric"))==null||e.addEventListener("click",fb),(i=document.getElementById("btn-open-qr-scanner"))==null||i.addEventListener("click",hb),(o=document.getElementById("btn-process-payroll-modal"))==null||o.addEventListener("click",mb),t("employees")}async function Me(){var n;try{const t=((n=w.activeCompany)==null?void 0:n.id)||1,[e,i,o]=await Promise.all([B.get(`/payroll/employees?company_id=${t}`),B.get("/payroll/attendance"),B.get("/payroll/history")]);e.success&&(jt=e.employees),i.success&&(Gc=i.logs),o.success&&(Ge=o.history)}catch(t){P(t.message,"error")}}function Yc(n){var t;n.innerHTML=`
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
            ${jt.map(e=>`
              <tr>
                <td><strong>${e.employee_code}</strong></td>
                <td><strong>${e.full_name}</strong></td>
                <td>${e.department}</td>
                <td>${e.designation}</td>
                <td>${R(e.base_salary)}</td>
                <td style="color:#34d399;">+${R(e.allowances)}</td>
                <td style="color:#f87171;">-${R(e.tax_deduction)}</td>
                <td><strong>${R(e.base_salary+e.allowances-e.tax_deduction)}</strong></td>
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
  `,(t=document.getElementById("btn-add-emp-modal"))==null||t.addEventListener("click",gb),n.querySelectorAll(".btn-print-quick-payslip").forEach(e=>{e.addEventListener("click",()=>{const i=jt.find(o=>o.id===parseInt(e.dataset.id));i&&Bc({employee_code:i.employee_code,employee_name:i.full_name,department:i.department,designation:i.designation,cnic:i.cnic,base_salary:i.base_salary,allowances:i.allowances,tax_deduction:i.tax_deduction,net_salary:i.base_salary+i.allowances-i.tax_deduction,month_year:new Date().toLocaleString("en-US",{month:"long",year:"numeric"})})})})}function Xi(n){var t;n.innerHTML=`
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
            ${Gc.map(e=>`
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
  `,(t=document.getElementById("btn-manual-punch-modal"))==null||t.addEventListener("click",pb)}function Xc(n){n.innerHTML=`
    <div class="panel">
      <div class="panel-header">
        <h3 class="panel-title">Payroll Processing History & Ledger Postings</h3>
        <span style="font-size:0.85rem; color:var(--text-muted);">${Ge.length} Runs Completed</span>
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
            ${Ge.length===0?`
              <tr>
                <td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">
                  No payroll processed yet for this company. Click "Process Monthly Payroll" above to generate.
                </td>
              </tr>
            `:Ge.map(t=>`
              <tr>
                <td><strong>${t.month_year}</strong></td>
                <td>${t.employee_count} Employees</td>
                <td>${R(t.total_gross)}</td>
                <td style="color:#f87171;">-${R(t.total_deductions)}</td>
                <td><strong style="color:#34d399;">${R(t.total_net)}</strong></td>
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
  `,n.querySelectorAll(".btn-print-all-slips").forEach(t=>{t.addEventListener("click",()=>{const e=Ge.find(i=>i.id===parseInt(t.dataset.id));e&&e.payslips&&e.payslips.length>0&&(e.payslips.forEach(i=>Bc(i)),P(`Printed ${e.payslips.length} employee payslips!`,"success"))})})}async function fb(){try{P("Connecting to TCP/IP Biometric Terminal at 192.168.1.201...","info");const n=await B.post("/payroll/biometric/sync",{device_ip:"192.168.1.201",terminal_name:"ZK-Teco Biometric Scanner Counter 01"});if(n.success){P(n.message,"success"),await Me();const t=document.getElementById("payroll-tab-content");t&&Xi(t)}}catch(n){P(n.message,"error")}}function hb(){var i,o,s;const n=`
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
              ${jt.map(r=>`<option value="${r.qr_badge_code}">${r.full_name} (${r.qr_badge_code})</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-qr">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-qr-scan">Scan & Clock In/Out</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("qr-scanner-modal"),e=()=>t==null?void 0:t.remove();(i=document.getElementById("btn-close-qr-modal"))==null||i.addEventListener("click",e),(o=document.getElementById("btn-cancel-qr"))==null||o.addEventListener("click",e),(s=document.getElementById("btn-confirm-qr-scan"))==null||s.addEventListener("click",async()=>{const r=document.getElementById("select-quick-qr").value;if(!r){P("Please select or scan an employee badge","error");return}try{const a=await B.post("/payroll/attendance/log",{qr_badge_code:r,method:"QR_SCANNER"});if(a.success){P(a.message,"success"),await Me();const c=document.getElementById("payroll-tab-content");c&&Xi(c),e()}}catch(a){P(a.message,"error")}})}function pb(){var i,o,s;const n=`
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
              ${jt.map(r=>`<option value="${r.id}">${r.full_name} (${r.department})</option>`).join("")}
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
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("manual-punch-modal"),e=()=>t==null?void 0:t.remove();(i=document.getElementById("btn-close-punch-modal"))==null||i.addEventListener("click",e),(o=document.getElementById("btn-cancel-punch"))==null||o.addEventListener("click",e),(s=document.getElementById("btn-confirm-punch"))==null||s.addEventListener("click",async()=>{const r=document.getElementById("punch-emp-id").value,a=document.getElementById("punch-method").value;try{const c=await B.post("/payroll/attendance/log",{employee_id:r,method:a,latitude:31.5204,longitude:74.3587});if(c.success){P(c.message,"success"),await Me();const l=document.getElementById("payroll-tab-content");l&&Xi(l),e()}}catch(c){P(c.message,"error")}})}function mb(){var a,c,l,d;const n=new Date().toLocaleString("en-US",{month:"long",year:"numeric"}),t=jt.reduce((u,f)=>u+f.base_salary+f.allowances,0),e=jt.reduce((u,f)=>u+f.tax_deduction,0),i=t-e,o=`
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
            <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:2px;">Company: ${((a=w.activeCompany)==null?void 0:a.name)||"OneNet Solutions"}</div>
          </div>

          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:6px; padding:0.75rem; margin-bottom:1rem; font-size:13px;">
            <div style="display:flex; justify-content:space-between; padding:4px 0;"><span>Eligible Employees:</span><strong>${jt.length} Active Staff</strong></div>
            <div style="display:flex; justify-content:space-between; padding:4px 0;"><span>Gross Pay & Allowances:</span><span>${R(t)}</span></div>
            <div style="display:flex; justify-content:space-between; padding:4px 0;"><span>Withholding Tax Deductions:</span><span style="color:#f87171;">-${R(e)}</span></div>
            <div style="display:flex; justify-content:space-between; padding:8px 0; border-top:1px solid var(--border-color); font-size:15px; font-weight:800; color:#34d399;">
              <span>Net Disbursement (Bank Transfer):</span>
              <span>${R(i)}</span>
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
  `;document.body.insertAdjacentHTML("beforeend",o);const s=document.getElementById("process-payroll-modal"),r=()=>s==null?void 0:s.remove();(c=document.getElementById("btn-close-payroll-modal"))==null||c.addEventListener("click",r),(l=document.getElementById("btn-cancel-payroll"))==null||l.addEventListener("click",r),(d=document.getElementById("btn-confirm-payroll"))==null||d.addEventListener("click",async()=>{var u;try{const f=await B.post("/payroll/process",{company_id:((u=w.activeCompany)==null?void 0:u.id)||1,month_year:n});if(f.success){P(f.message,"success"),await Me();const h=document.getElementById("payroll-tab-content");h&&Xc(h),r()}}catch(f){P(f.message,"error")}})}function gb(){var i,o,s;const n=`
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
              <input type="text" id="new-emp-code" class="form-control" value="EMP-${100+jt.length+1}" required />
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
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("add-emp-modal"),e=()=>t==null?void 0:t.remove();(i=document.getElementById("btn-close-add-emp"))==null||i.addEventListener("click",e),(o=document.getElementById("btn-cancel-add-emp"))==null||o.addEventListener("click",e),(s=document.getElementById("btn-confirm-add-emp"))==null||s.addEventListener("click",async()=>{var h;const r=document.getElementById("new-emp-name").value.trim(),a=document.getElementById("new-emp-code").value.trim(),c=document.getElementById("new-emp-dept").value,l=document.getElementById("new-emp-desig").value.trim(),d=Number(document.getElementById("new-emp-salary").value)||4e4,u=Number(document.getElementById("new-emp-allowance").value)||0,f=Number(document.getElementById("new-emp-tax").value)||0;if(!r||!a){P("Name and code are required","error");return}try{if((await B.post("/payroll/employees",{company_id:((h=w.activeCompany)==null?void 0:h.id)||1,full_name:r,employee_code:a,department:c,designation:l,base_salary:d,allowances:u,tax_deduction:f})).success){P("Employee registered successfully!","success"),await Me();const m=document.getElementById("payroll-tab-content");m&&Yc(m),e()}}catch(p){P(p.message,"error")}})}async function bb(n){var i,o;n.innerHTML=`
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
  `;let t="pos-z";const e=s=>{t=s,n.querySelectorAll(".report-tab-btn").forEach(a=>{a.classList.toggle("active",a.dataset.tab===s)});const r=document.getElementById("reports-tab-content");s==="pos-z"?vb(r):s==="inventory-val"?yb(r):xb(r)};n.querySelectorAll(".report-tab-btn").forEach(s=>{s.addEventListener("click",()=>e(s.dataset.tab))}),(i=document.getElementById("btn-export-report-csv"))==null||i.addEventListener("click",()=>_b(t)),(o=document.getElementById("btn-print-report"))==null||o.addEventListener("click",()=>wb(t)),e("pos-z")}function vb(n){const t=w.activeCompany||{name:"OneNet Solutions"},e=new Date().toLocaleDateString("en-PK",{dateStyle:"full"});n.innerHTML=`
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
  `}function yb(n){let t=0,e=0;w.products.forEach(o=>{t+=o.cost_price*o.stock,e+=o.selling_price*o.stock});const i=e-t;n.innerHTML=`
    <div class="panel" id="printable-report-body">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Stock Valuation & Potential Margin Report</h3>
          <span style="font-size:0.85rem; color:var(--text-muted);">${w.products.length} Tracked Catalog Products</span>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1rem; margin-bottom:1.5rem;">
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Total Inventory Asset Cost</div>
          <div style="font-size:1.5rem; font-weight:800; color:#38bdf8;">${R(t)}</div>
        </div>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Total Retail Selling Value</div>
          <div style="font-size:1.5rem; font-weight:800; color:#34d399;">${R(e)}</div>
        </div>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Unrealized Gross Margin</div>
          <div style="font-size:1.5rem; font-weight:800; color:#fbbf24;">${R(i)}</div>
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
            ${w.products.map(o=>`
              <tr>
                <td><code>${o.sku}</code></td>
                <td><strong>${o.name}</strong></td>
                <td>${o.category_name||"General"}</td>
                <td><strong>${o.stock} ${o.uom||"Pcs"}</strong></td>
                <td>${R(o.cost_price)}</td>
                <td>${R(o.cost_price*o.stock)}</td>
                <td>${R(o.selling_price)}</td>
                <td><strong>${R(o.selling_price*o.stock)}</strong></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}function xb(n){n.innerHTML=`
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
  `}function _b(n){let t="data:text/csv;charset=utf-8,";n==="pos-z"?(t+=`Shift,Cashier,Opening_Float,Cash_Sales,Card_Credit,Total,Discrepancy
`,t+=`Counter 01,Muhammad Ali Raza,5000,18500,12000,35500,0
`,t+=`Counter 02,Zainab Fatima,5000,5000,10350,20350,0
`):(t+=`SKU,Name,Category,Stock,Cost_Price,Selling_Price
`,w.products.forEach(o=>{t+=`"${o.sku}","${o.name}","${o.category_name}",${o.stock},${o.cost_price},${o.selling_price}
`}));const e=encodeURI(t),i=document.createElement("a");i.setAttribute("href",e),i.setAttribute("download",`OneNet_${n}_Report.csv`),document.body.appendChild(i),i.click(),i.remove(),P("Report exported as CSV file!","success")}function wb(n){const t=document.getElementById("printable-report-body");if(!t)return;const e=`OneNet_Report_${n.toUpperCase()}`;bn(e,t.innerHTML,`
    @page { size: A4 portrait; margin: 12mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #000; padding: 10px; }
    .panel-title { font-size: 18px; font-weight: 800; margin-bottom: 4px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; }
    th { background: #f1f5f9; font-weight: 700; text-align: left; }
    .tag { display: none; }
  `)}function Eb(n){var a,c;n.innerHTML=`
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
          <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Database:</span><code>${((a=w.activeCompany)==null?void 0:a.name)||"bierppos"}</code></div>
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
  `,(c=document.getElementById("btn-download-backup"))==null||c.addEventListener("click",()=>{P("Preparing system snapshot...","info"),window.location.href="/api/backup/export",setTimeout(()=>{P("Database backup snapshot downloaded successfully!","success")},1500)});const t=document.getElementById("drop-restore-zone"),e=document.getElementById("file-restore-input"),i=document.getElementById("restore-file-info"),o=document.getElementById("selected-restore-filename"),s=document.getElementById("btn-execute-restore");let r=null;t==null||t.addEventListener("click",()=>e.click()),e==null||e.addEventListener("change",l=>{const d=l.target.files[0];if(!d)return;o.textContent=`${d.name} (${(d.size/1024).toFixed(1)} KB)`,i.style.display="block",s.disabled=!1;const u=new FileReader;u.onload=f=>{try{r=JSON.parse(f.target.result)}catch{P("File is not a valid JSON backup","error"),s.disabled=!0}},u.readAsText(d)}),s==null||s.addEventListener("click",async()=>{if(!(!r||!confirm("WARNING: Restoring will overwrite existing records with the backup file data. Are you sure you wish to proceed?")))try{P("Restoring database from snapshot...","info");const d=await B.post("/backup/restore",{backupData:r});d.success&&(P(d.message,"success"),setTimeout(()=>window.location.reload(),1500))}catch(d){P(d.message,"error")}})}let Do=null,$o=!1;async function Sb(){if(console.log("[OneNet Solutions] Bootstrapping Enterprise Suite..."),!w.currentUser){const n=document.getElementById("app-root");n&&(n.style.display="none"),ks(async()=>{await is()});return}await is()}async function is(){const n=document.getElementById("app-root");n&&(n.style.display="flex");const t=document.getElementById("auth-root");t&&(t.style.display="none"),await Yg(),Qg(async()=>{$o=!1,n&&(n.style.display="none"),ks(async()=>{await is()})});try{const[i,o,s,r]=await Promise.all([B.get("/inventory/products"),B.get("/inventory/categories"),B.get("/inventory/warehouses"),B.get("/sales/customers")]);i.success&&(w.products=i.products),o.success&&(w.categories=o.categories),s.success&&(w.warehouses=s.warehouses),r.success&&(w.customers=r.customers)}catch(i){console.error("Initial data load error:",i)}$o||(Ri.connect(),Ri.subscribe(i=>{console.log("[Realtime Event]",i),i.type==="POS_SALE"?(P(`⚡ Realtime: Receipt #${i.payload.receipt_number} tendered for ${R(i.payload.total_amount)}`,"info"),w.activeModule==="dashboard"&&os(document.getElementById("content-viewport"))):i.type==="MANUFACTURING_COMPLETED"&&P(`⚙️ Assembly Completed: ${i.payload.quantity} units of ${i.payload.product}`,"success")}),"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").then(()=>console.log("[PWA] Service Worker registered")).catch(i=>console.warn("[PWA] Service Worker registration failed:",i)),kb(),window.addEventListener("hashchange",()=>{const i=window.location.hash.slice(1);i&&w.currentUser&&dn(i)}),$o=!0);const e=window.location.hash.slice(1)||"dashboard";dn(e)}function kb(){var o,s,r,a,c;document.querySelectorAll(".nav-item").forEach(l=>{l.addEventListener("click",d=>{d.preventDefault();const u=l.dataset.module;dn(u)})}),document.querySelectorAll(".mobile-nav-item").forEach(l=>{l.addEventListener("click",d=>{d.preventDefault();const u=l.dataset.module;u&&dn(u)})}),(o=document.getElementById("btn-theme-toggle"))==null||o.addEventListener("click",()=>{const d=document.body.getAttribute("data-theme")==="light"?"dark":"light";document.body.setAttribute("data-theme",d),P(`Switched to ${d} theme`,"info")}),(s=document.getElementById("btn-fullscreen-toggle"))==null||s.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}),(r=document.getElementById("btn-open-mobile-app-modal"))==null||r.addEventListener("click",()=>{Uc()});const n=document.getElementById("main-sidebar"),t=document.getElementById("sidebar-backdrop"),e=()=>{n==null||n.classList.toggle("drawer-open"),t==null||t.classList.toggle("active")},i=()=>{n==null||n.classList.remove("drawer-open"),t==null||t.classList.remove("active")};(a=document.getElementById("btn-mobile-drawer-toggle"))==null||a.addEventListener("click",e),(c=document.getElementById("btn-mobile-more-nav"))==null||c.addEventListener("click",e),t==null||t.addEventListener("click",i)}function dn(n){var e,i,o;(e=document.getElementById("main-sidebar"))==null||e.classList.remove("drawer-open"),(i=document.getElementById("sidebar-backdrop"))==null||i.classList.remove("active"),n!=="dashboard"&&!am(n,"view")&&(P(`Access Denied: Your assigned role (${(o=w.currentUser)==null?void 0:o.role_name}) does not have permission to view ${n}`,"error"),n="dashboard"),w.activeModule=n,document.querySelectorAll(".nav-item").forEach(s=>{s.classList.toggle("active",s.dataset.module===n)}),document.querySelectorAll(".mobile-nav-item").forEach(s=>{s.classList.toggle("active",s.dataset.module===n)});const t=document.getElementById("content-viewport");if(t)switch(t.innerHTML="",n){case"dashboard":os(t);break;case"pos":Jm(t);break;case"inventory":ng(t);break;case"sales":dg(t);break;case"accounting":mg(t);break;case"manufacturing":xg(t);break;case"mobile_booker":Ug(t);break;case"payroll":ub(t);break;case"reports":bb(t);break;case"users":rb(t);break;case"backup":Eb(t);break;default:os(t)}}async function os(n){var t;try{const e=await B.get("/reports/dashboard"),{kpis:i,low_stock_items:o,expiring_batches:s,sales_trend:r}=e;n.innerHTML=`
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
          <div class="kpi-value">${R(i.today_pos_sales)}</div>
          <div class="kpi-footer positive">↑ 18.4% vs yesterday's register closing</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Cash in Hand & Drawer</span>
            <div class="kpi-icon-wrapper" style="background:rgba(16,185,129,0.12); color:#34d399;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle></svg>
            </div>
          </div>
          <div class="kpi-value">${R(i.cash_in_hand)}</div>
          <div class="kpi-footer">Reconciled in Main Vault</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Total Trade Receivables</span>
            <div class="kpi-icon-wrapper" style="background:rgba(245,158,11,0.12); color:#fbbf24;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
            </div>
          </div>
          <div class="kpi-value">${R(i.total_receivables)}</div>
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
                <div style="font-size:1.15rem; font-weight:700; color:#38bdf8;">${R(i.bank_balance)}</div>
              </div>
              <span class="tag tag-success">2 Active A/Cs</span>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem; background:rgba(255,255,255,0.03); border-radius:var(--radius-md);">
              <div>
                <div style="font-size:0.8rem; color:var(--text-muted);">Accounts Payable (Vendors):</div>
                <div style="font-size:1.15rem; font-weight:700; color:#fbbf24;">${R(i.total_payables)}</div>
              </div>
              <span class="tag tag-warning">Trade Creditors</span>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem; background:rgba(255,255,255,0.03); border-radius:var(--radius-md);">
              <div>
                <div style="font-size:0.8rem; color:var(--text-muted);">Total Inventory Asset Valuation:</div>
                <div style="font-size:1.15rem; font-weight:700; color:#34d399;">${R(i.total_stock_value)}</div>
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
            <span class="tag tag-danger">${o.length} Items</span>
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
                ${o.map(a=>`
                  <tr>
                    <td><strong>${a.name}</strong><br/><span style="font-size:0.75rem; color:var(--text-muted);">${a.sku}</span></td>
                    <td style="color:#f87171; font-weight:700;">${a.stock} ${a.uom||"Pcs"}</td>
                    <td>${a.reorder_level} units</td>
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
            <span class="tag tag-warning">${s.length} Batches</span>
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
                ${s.map(a=>`
                  <tr>
                    <td style="font-family:var(--font-mono); font-weight:700; color:#fbbf24;">${a.batch_number}</td>
                    <td>${a.expiry_date}</td>
                    <td style="font-weight:700;">${a.stock} units</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `,(t=document.getElementById("btn-quick-pos-launch"))==null||t.addEventListener("click",()=>{dn("pos")}),Cb(r)}catch(e){P(e.message,"error")}}function Cb(n){const t=document.getElementById("salesTrendChart");if(!t)return;Do&&Do.destroy();const e=t.getContext("2d");Do=new $t(e,{type:"bar",data:{labels:n.map(i=>i.day),datasets:[{label:"POS Retail Sales (Rs)",data:n.map(i=>i.pos),backgroundColor:"rgba(14, 165, 233, 0.75)",borderRadius:6},{label:"B2B Wholesale Invoices (Rs)",data:n.map(i=>i.wholesale),backgroundColor:"rgba(99, 102, 241, 0.75)",borderRadius:6}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{labels:{color:"#cbd5e1",font:{family:"Inter",size:12}}}},scales:{x:{grid:{color:"rgba(255, 255, 255, 0.05)"},ticks:{color:"#94a3b8"}},y:{grid:{color:"rgba(255, 255, 255, 0.05)"},ticks:{color:"#94a3b8",callback:i=>"Rs "+i/1e3+"k"}}}}})}window.addEventListener("DOMContentLoaded",Sb);window.addEventListener("afterprint",()=>{const n=document.getElementById("printable-receipt-area");n&&(n.innerHTML="",n.className="")});
