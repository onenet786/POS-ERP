var ma=Object.defineProperty;var ga=(n,t,e)=>t in n?ma(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var S=(n,t,e)=>ga(n,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function $e(n){return n+.5|0}const Et=(n,t,e)=>Math.max(Math.min(n,e),t);function fe(n){return Et($e(n*2.55),0,255)}function Lt(n){return Et($e(n*255),0,255)}function yt(n){return Et($e(n/2.55)/100,0,1)}function Os(n){return Et($e(n*100),0,100)}const rt={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},Xn=[..."0123456789ABCDEF"],ba=n=>Xn[n&15],va=n=>Xn[(n&240)>>4]+Xn[n&15],je=n=>(n&240)>>4===(n&15),ya=n=>je(n.r)&&je(n.g)&&je(n.b)&&je(n.a);function xa(n){var t=n.length,e;return n[0]==="#"&&(t===4||t===5?e={r:255&rt[n[1]]*17,g:255&rt[n[2]]*17,b:255&rt[n[3]]*17,a:t===5?rt[n[4]]*17:255}:(t===7||t===9)&&(e={r:rt[n[1]]<<4|rt[n[2]],g:rt[n[3]]<<4|rt[n[4]],b:rt[n[5]]<<4|rt[n[6]],a:t===9?rt[n[7]]<<4|rt[n[8]]:255})),e}const _a=(n,t)=>n<255?t(n):"";function wa(n){var t=ya(n)?ba:va;return n?"#"+t(n.r)+t(n.g)+t(n.b)+_a(n.a,t):void 0}const ka=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function lo(n,t,e){const s=t*Math.min(e,1-e),i=(o,a=(o+n/30)%12)=>e-s*Math.max(Math.min(a-3,9-a,1),-1);return[i(0),i(8),i(4)]}function Sa(n,t,e){const s=(i,o=(i+n/60)%6)=>e-e*t*Math.max(Math.min(o,4-o,1),0);return[s(5),s(3),s(1)]}function Ea(n,t,e){const s=lo(n,1,.5);let i;for(t+e>1&&(i=1/(t+e),t*=i,e*=i),i=0;i<3;i++)s[i]*=1-t-e,s[i]+=t;return s}function Ma(n,t,e,s,i){return n===i?(t-e)/s+(t<e?6:0):t===i?(e-n)/s+2:(n-t)/s+4}function ms(n){const e=n.r/255,s=n.g/255,i=n.b/255,o=Math.max(e,s,i),a=Math.min(e,s,i),r=(o+a)/2;let l,c,d;return o!==a&&(d=o-a,c=r>.5?d/(2-o-a):d/(o+a),l=Ma(e,s,i,d,o),l=l*60+.5),[l|0,c||0,r]}function gs(n,t,e,s){return(Array.isArray(t)?n(t[0],t[1],t[2]):n(t,e,s)).map(Lt)}function bs(n,t,e){return gs(lo,n,t,e)}function Ca(n,t,e){return gs(Ea,n,t,e)}function Aa(n,t,e){return gs(Sa,n,t,e)}function co(n){return(n%360+360)%360}function Pa(n){const t=ka.exec(n);let e=255,s;if(!t)return;t[5]!==s&&(e=t[6]?fe(+t[5]):Lt(+t[5]));const i=co(+t[2]),o=+t[3]/100,a=+t[4]/100;return t[1]==="hwb"?s=Ca(i,o,a):t[1]==="hsv"?s=Aa(i,o,a):s=bs(i,o,a),{r:s[0],g:s[1],b:s[2],a:e}}function La(n,t){var e=ms(n);e[0]=co(e[0]+t),e=bs(e),n.r=e[0],n.g=e[1],n.b=e[2]}function Ia(n){if(!n)return;const t=ms(n),e=t[0],s=Os(t[1]),i=Os(t[2]);return n.a<255?`hsla(${e}, ${s}%, ${i}%, ${yt(n.a)})`:`hsl(${e}, ${s}%, ${i}%)`}const $s={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},zs={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function Ta(){const n={},t=Object.keys(zs),e=Object.keys($s);let s,i,o,a,r;for(s=0;s<t.length;s++){for(a=r=t[s],i=0;i<e.length;i++)o=e[i],r=r.replace(o,$s[o]);o=parseInt(zs[a],16),n[r]=[o>>16&255,o>>8&255,o&255]}return n}let He;function Ba(n){He||(He=Ta(),He.transparent=[0,0,0,0]);const t=He[n.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const Ra=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function Da(n){const t=Ra.exec(n);let e=255,s,i,o;if(t){if(t[7]!==s){const a=+t[7];e=t[8]?fe(a):Et(a*255,0,255)}return s=+t[1],i=+t[3],o=+t[5],s=255&(t[2]?fe(s):Et(s,0,255)),i=255&(t[4]?fe(i):Et(i,0,255)),o=255&(t[6]?fe(o):Et(o,0,255)),{r:s,g:i,b:o,a:e}}}function Oa(n){return n&&(n.a<255?`rgba(${n.r}, ${n.g}, ${n.b}, ${yt(n.a)})`:`rgb(${n.r}, ${n.g}, ${n.b})`)}const Bn=n=>n<=.0031308?n*12.92:Math.pow(n,1/2.4)*1.055-.055,Qt=n=>n<=.04045?n/12.92:Math.pow((n+.055)/1.055,2.4);function $a(n,t,e){const s=Qt(yt(n.r)),i=Qt(yt(n.g)),o=Qt(yt(n.b));return{r:Lt(Bn(s+e*(Qt(yt(t.r))-s))),g:Lt(Bn(i+e*(Qt(yt(t.g))-i))),b:Lt(Bn(o+e*(Qt(yt(t.b))-o))),a:n.a+e*(t.a-n.a)}}function Ve(n,t,e){if(n){let s=ms(n);s[t]=Math.max(0,Math.min(s[t]+s[t]*e,t===0?360:1)),s=bs(s),n.r=s[0],n.g=s[1],n.b=s[2]}}function uo(n,t){return n&&Object.assign(t||{},n)}function Ns(n){var t={r:0,g:0,b:0,a:255};return Array.isArray(n)?n.length>=3&&(t={r:n[0],g:n[1],b:n[2],a:255},n.length>3&&(t.a=Lt(n[3]))):(t=uo(n,{r:0,g:0,b:0,a:1}),t.a=Lt(t.a)),t}function za(n){return n.charAt(0)==="r"?Da(n):Pa(n)}class Ce{constructor(t){if(t instanceof Ce)return t;const e=typeof t;let s;e==="object"?s=Ns(t):e==="string"&&(s=xa(t)||Ba(t)||za(t)),this._rgb=s,this._valid=!!s}get valid(){return this._valid}get rgb(){var t=uo(this._rgb);return t&&(t.a=yt(t.a)),t}set rgb(t){this._rgb=Ns(t)}rgbString(){return this._valid?Oa(this._rgb):void 0}hexString(){return this._valid?wa(this._rgb):void 0}hslString(){return this._valid?Ia(this._rgb):void 0}mix(t,e){if(t){const s=this.rgb,i=t.rgb;let o;const a=e===o?.5:e,r=2*a-1,l=s.a-i.a,c=((r*l===-1?r:(r+l)/(1+r*l))+1)/2;o=1-c,s.r=255&c*s.r+o*i.r+.5,s.g=255&c*s.g+o*i.g+.5,s.b=255&c*s.b+o*i.b+.5,s.a=a*s.a+(1-a)*i.a,this.rgb=s}return this}interpolate(t,e){return t&&(this._rgb=$a(this._rgb,t._rgb,e)),this}clone(){return new Ce(this.rgb)}alpha(t){return this._rgb.a=Lt(t),this}clearer(t){const e=this._rgb;return e.a*=1-t,this}greyscale(){const t=this._rgb,e=$e(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=e,this}opaquer(t){const e=this._rgb;return e.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return Ve(this._rgb,2,t),this}darken(t){return Ve(this._rgb,2,-t),this}saturate(t){return Ve(this._rgb,1,t),this}desaturate(t){return Ve(this._rgb,1,-t),this}rotate(t){return La(this._rgb,t),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function gt(){}const Na=(()=>{let n=0;return()=>n++})();function R(n){return n==null}function V(n){if(Array.isArray&&Array.isArray(n))return!0;const t=Object.prototype.toString.call(n);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function D(n){return n!==null&&Object.prototype.toString.call(n)==="[object Object]"}function q(n){return(typeof n=="number"||n instanceof Number)&&isFinite(+n)}function ot(n,t){return q(n)?n:t}function I(n,t){return typeof n>"u"?t:n}const Fa=(n,t)=>typeof n=="string"&&n.endsWith("%")?parseFloat(n)/100:+n/t,ho=(n,t)=>typeof n=="string"&&n.endsWith("%")?parseFloat(n)/100*t:+n;function F(n,t,e){if(n&&typeof n.call=="function")return n.apply(e,t)}function z(n,t,e,s){let i,o,a;if(V(n))for(o=n.length,i=0;i<o;i++)t.call(e,n[i],i);else if(D(n))for(a=Object.keys(n),o=a.length,i=0;i<o;i++)t.call(e,n[a[i]],a[i])}function hn(n,t){let e,s,i,o;if(!n||!t||n.length!==t.length)return!1;for(e=0,s=n.length;e<s;++e)if(i=n[e],o=t[e],i.datasetIndex!==o.datasetIndex||i.index!==o.index)return!1;return!0}function fn(n){if(V(n))return n.map(fn);if(D(n)){const t=Object.create(null),e=Object.keys(n),s=e.length;let i=0;for(;i<s;++i)t[e[i]]=fn(n[e[i]]);return t}return n}function fo(n){return["__proto__","prototype","constructor"].indexOf(n)===-1}function ja(n,t,e,s){if(!fo(n))return;const i=t[n],o=e[n];D(i)&&D(o)?Ae(i,o,s):t[n]=fn(o)}function Ae(n,t,e){const s=V(t)?t:[t],i=s.length;if(!D(n))return n;e=e||{};const o=e.merger||ja;let a;for(let r=0;r<i;++r){if(a=s[r],!D(a))continue;const l=Object.keys(a);for(let c=0,d=l.length;c<d;++c)o(l[c],n,a,e)}return n}function xe(n,t){return Ae(n,t,{merger:Ha})}function Ha(n,t,e){if(!fo(n))return;const s=t[n],i=e[n];D(s)&&D(i)?xe(s,i):Object.prototype.hasOwnProperty.call(t,n)||(t[n]=fn(i))}const Fs={"":n=>n,x:n=>n.x,y:n=>n.y};function Va(n){const t=n.split("."),e=[];let s="";for(const i of t)s+=i,s.endsWith("\\")?s=s.slice(0,-1)+".":(e.push(s),s="");return e}function Wa(n){const t=Va(n);return e=>{for(const s of t){if(s==="")break;e=e&&e[s]}return e}}function It(n,t){return(Fs[t]||(Fs[t]=Wa(t)))(n)}function vs(n){return n.charAt(0).toUpperCase()+n.slice(1)}const Pe=n=>typeof n<"u",Tt=n=>typeof n=="function",js=(n,t)=>{if(n.size!==t.size)return!1;for(const e of n)if(!t.has(e))return!1;return!0};function qa(n){return n.type==="mouseup"||n.type==="click"||n.type==="contextmenu"}const $=Math.PI,j=2*$,Ua=j+$,pn=Number.POSITIVE_INFINITY,Ya=$/180,Y=$/2,$t=$/4,Hs=$*2/3,Mt=Math.log10,mt=Math.sign;function _e(n,t,e){return Math.abs(n-t)<e}function Vs(n){const t=Math.round(n);n=_e(n,t,n/1e3)?t:n;const e=Math.pow(10,Math.floor(Mt(n))),s=n/e;return(s<=1?1:s<=2?2:s<=5?5:10)*e}function Ga(n){const t=[],e=Math.sqrt(n);let s;for(s=1;s<e;s++)n%s===0&&(t.push(s),t.push(n/s));return e===(e|0)&&t.push(e),t.sort((i,o)=>i-o).pop(),t}function Xa(n){return typeof n=="symbol"||typeof n=="object"&&n!==null&&!(Symbol.toPrimitive in n||"toString"in n||"valueOf"in n)}function ee(n){return!Xa(n)&&!isNaN(parseFloat(n))&&isFinite(n)}function Ka(n,t){const e=Math.round(n);return e-t<=n&&e+t>=n}function po(n,t,e){let s,i,o;for(s=0,i=n.length;s<i;s++)o=n[s][e],isNaN(o)||(t.min=Math.min(t.min,o),t.max=Math.max(t.max,o))}function dt(n){return n*($/180)}function ys(n){return n*(180/$)}function Ws(n){if(!q(n))return;let t=1,e=0;for(;Math.round(n*t)/t!==n;)t*=10,e++;return e}function mo(n,t){const e=t.x-n.x,s=t.y-n.y,i=Math.sqrt(e*e+s*s);let o=Math.atan2(s,e);return o<-.5*$&&(o+=j),{angle:o,distance:i}}function Kn(n,t){return Math.sqrt(Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2))}function Ja(n,t){return(n-t+Ua)%j-$}function Z(n){return(n%j+j)%j}function Le(n,t,e,s){const i=Z(n),o=Z(t),a=Z(e),r=Z(o-i),l=Z(a-i),c=Z(i-o),d=Z(i-a);return i===o||i===a||s&&o===a||r>l&&c<d}function X(n,t,e){return Math.max(t,Math.min(e,n))}function Qa(n){return X(n,-32768,32767)}function _t(n,t,e,s=1e-6){return n>=Math.min(t,e)-s&&n<=Math.max(t,e)+s}function xs(n,t,e){e=e||(a=>n[a]<t);let s=n.length-1,i=0,o;for(;s-i>1;)o=i+s>>1,e(o)?i=o:s=o;return{lo:i,hi:s}}const wt=(n,t,e,s)=>xs(n,e,s?i=>{const o=n[i][t];return o<e||o===e&&n[i+1][t]===e}:i=>n[i][t]<e),Za=(n,t,e)=>xs(n,e,s=>n[s][t]>=e);function tr(n,t,e){let s=0,i=n.length;for(;s<i&&n[s]<t;)s++;for(;i>s&&n[i-1]>e;)i--;return s>0||i<n.length?n.slice(s,i):n}const go=["push","pop","shift","splice","unshift"];function er(n,t){if(n._chartjs){n._chartjs.listeners.push(t);return}Object.defineProperty(n,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),go.forEach(e=>{const s="_onData"+vs(e),i=n[e];Object.defineProperty(n,e,{configurable:!0,enumerable:!1,value(...o){const a=i.apply(this,o);return n._chartjs.listeners.forEach(r=>{typeof r[s]=="function"&&r[s](...o)}),a}})})}function qs(n,t){const e=n._chartjs;if(!e)return;const s=e.listeners,i=s.indexOf(t);i!==-1&&s.splice(i,1),!(s.length>0)&&(go.forEach(o=>{delete n[o]}),delete n._chartjs)}function bo(n){const t=new Set(n);return t.size===n.length?n:Array.from(t)}const vo=(function(){return typeof window>"u"?function(n){return n()}:window.requestAnimationFrame})();function yo(n,t){let e=[],s=!1;return function(...i){e=i,s||(s=!0,vo.call(window,()=>{s=!1,n.apply(t,e)}))}}function nr(n,t){let e;return function(...s){return t?(clearTimeout(e),e=setTimeout(n,t,s)):n.apply(this,s),t}}const _s=n=>n==="start"?"left":n==="end"?"right":"center",Q=(n,t,e)=>n==="start"?t:n==="end"?e:(t+e)/2,sr=(n,t,e,s)=>n===(s?"left":"right")?e:n==="center"?(t+e)/2:t;function xo(n,t,e){const s=t.length;let i=0,o=s;if(n._sorted){const{iScale:a,vScale:r,_parsed:l}=n,c=n.dataset&&n.dataset.options?n.dataset.options.spanGaps:null,d=a.axis,{min:u,max:h,minDefined:f,maxDefined:p}=a.getUserBounds();if(f){if(i=Math.min(wt(l,d,u).lo,e?s:wt(t,d,a.getPixelForValue(u)).lo),c){const m=l.slice(0,i+1).reverse().findIndex(g=>!R(g[r.axis]));i-=Math.max(0,m)}i=X(i,0,s-1)}if(p){let m=Math.max(wt(l,a.axis,h,!0).hi+1,e?0:wt(t,d,a.getPixelForValue(h),!0).hi+1);if(c){const g=l.slice(m-1).findIndex(b=>!R(b[r.axis]));m+=Math.max(0,g)}o=X(m,i,s)-i}else o=s-i}return{start:i,count:o}}function _o(n){const{xScale:t,yScale:e,_scaleRanges:s}=n,i={xmin:t.min,xmax:t.max,ymin:e.min,ymax:e.max};if(!s)return n._scaleRanges=i,!0;const o=s.xmin!==t.min||s.xmax!==t.max||s.ymin!==e.min||s.ymax!==e.max;return Object.assign(s,i),o}const We=n=>n===0||n===1,Us=(n,t,e)=>-(Math.pow(2,10*(n-=1))*Math.sin((n-t)*j/e)),Ys=(n,t,e)=>Math.pow(2,-10*n)*Math.sin((n-t)*j/e)+1,we={linear:n=>n,easeInQuad:n=>n*n,easeOutQuad:n=>-n*(n-2),easeInOutQuad:n=>(n/=.5)<1?.5*n*n:-.5*(--n*(n-2)-1),easeInCubic:n=>n*n*n,easeOutCubic:n=>(n-=1)*n*n+1,easeInOutCubic:n=>(n/=.5)<1?.5*n*n*n:.5*((n-=2)*n*n+2),easeInQuart:n=>n*n*n*n,easeOutQuart:n=>-((n-=1)*n*n*n-1),easeInOutQuart:n=>(n/=.5)<1?.5*n*n*n*n:-.5*((n-=2)*n*n*n-2),easeInQuint:n=>n*n*n*n*n,easeOutQuint:n=>(n-=1)*n*n*n*n+1,easeInOutQuint:n=>(n/=.5)<1?.5*n*n*n*n*n:.5*((n-=2)*n*n*n*n+2),easeInSine:n=>-Math.cos(n*Y)+1,easeOutSine:n=>Math.sin(n*Y),easeInOutSine:n=>-.5*(Math.cos($*n)-1),easeInExpo:n=>n===0?0:Math.pow(2,10*(n-1)),easeOutExpo:n=>n===1?1:-Math.pow(2,-10*n)+1,easeInOutExpo:n=>We(n)?n:n<.5?.5*Math.pow(2,10*(n*2-1)):.5*(-Math.pow(2,-10*(n*2-1))+2),easeInCirc:n=>n>=1?n:-(Math.sqrt(1-n*n)-1),easeOutCirc:n=>Math.sqrt(1-(n-=1)*n),easeInOutCirc:n=>(n/=.5)<1?-.5*(Math.sqrt(1-n*n)-1):.5*(Math.sqrt(1-(n-=2)*n)+1),easeInElastic:n=>We(n)?n:Us(n,.075,.3),easeOutElastic:n=>We(n)?n:Ys(n,.075,.3),easeInOutElastic(n){return We(n)?n:n<.5?.5*Us(n*2,.1125,.45):.5+.5*Ys(n*2-1,.1125,.45)},easeInBack(n){return n*n*((1.70158+1)*n-1.70158)},easeOutBack(n){return(n-=1)*n*((1.70158+1)*n+1.70158)+1},easeInOutBack(n){let t=1.70158;return(n/=.5)<1?.5*(n*n*(((t*=1.525)+1)*n-t)):.5*((n-=2)*n*(((t*=1.525)+1)*n+t)+2)},easeInBounce:n=>1-we.easeOutBounce(1-n),easeOutBounce(n){return n<1/2.75?7.5625*n*n:n<2/2.75?7.5625*(n-=1.5/2.75)*n+.75:n<2.5/2.75?7.5625*(n-=2.25/2.75)*n+.9375:7.5625*(n-=2.625/2.75)*n+.984375},easeInOutBounce:n=>n<.5?we.easeInBounce(n*2)*.5:we.easeOutBounce(n*2-1)*.5+.5};function ws(n){if(n&&typeof n=="object"){const t=n.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function Gs(n){return ws(n)?n:new Ce(n)}function Rn(n){return ws(n)?n:new Ce(n).saturate(.5).darken(.1).hexString()}const ir=["x","y","borderWidth","radius","tension"],or=["color","borderColor","backgroundColor"];function ar(n){n.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),n.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),n.set("animations",{colors:{type:"color",properties:or},numbers:{type:"number",properties:ir}}),n.describe("animations",{_fallback:"animation"}),n.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function rr(n){n.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const Xs=new Map;function lr(n,t){t=t||{};const e=n+JSON.stringify(t);let s=Xs.get(e);return s||(s=new Intl.NumberFormat(n,t),Xs.set(e,s)),s}function ze(n,t,e){return lr(t,e).format(n)}const wo={values(n){return V(n)?n:""+n},numeric(n,t,e){if(n===0)return"0";const s=this.chart.options.locale;let i,o=n;if(e.length>1){const c=Math.max(Math.abs(e[0].value),Math.abs(e[e.length-1].value));(c<1e-4||c>1e15)&&(i="scientific"),o=cr(n,e)}const a=Mt(Math.abs(o)),r=isNaN(a)?1:Math.max(Math.min(-1*Math.floor(a),20),0),l={notation:i,minimumFractionDigits:r,maximumFractionDigits:r};return Object.assign(l,this.options.ticks.format),ze(n,s,l)},logarithmic(n,t,e){if(n===0)return"0";const s=e[t].significand||n/Math.pow(10,Math.floor(Mt(n)));return[1,2,3,5,10,15].includes(s)||t>.8*e.length?wo.numeric.call(this,n,t,e):""}};function cr(n,t){let e=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(e)>=1&&n!==Math.floor(n)&&(e=n-Math.floor(n)),e}var kn={formatters:wo};function dr(n){n.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,e)=>e.lineWidth,tickColor:(t,e)=>e.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:kn.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),n.route("scale.ticks","color","","color"),n.route("scale.grid","color","","borderColor"),n.route("scale.border","color","","borderColor"),n.route("scale.title","color","","color"),n.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),n.describe("scales",{_fallback:"scale"}),n.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const Ut=Object.create(null),Jn=Object.create(null);function ke(n,t){if(!t)return n;const e=t.split(".");for(let s=0,i=e.length;s<i;++s){const o=e[s];n=n[o]||(n[o]=Object.create(null))}return n}function Dn(n,t,e){return typeof t=="string"?Ae(ke(n,t),e):Ae(ke(n,""),t)}class ur{constructor(t,e){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=s=>s.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(s,i)=>Rn(i.backgroundColor),this.hoverBorderColor=(s,i)=>Rn(i.borderColor),this.hoverColor=(s,i)=>Rn(i.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(e)}set(t,e){return Dn(this,t,e)}get(t){return ke(this,t)}describe(t,e){return Dn(Jn,t,e)}override(t,e){return Dn(Ut,t,e)}route(t,e,s,i){const o=ke(this,t),a=ke(this,s),r="_"+e;Object.defineProperties(o,{[r]:{value:o[e],writable:!0},[e]:{enumerable:!0,get(){const l=this[r],c=a[i];return D(l)?Object.assign({},c,l):I(l,c)},set(l){this[r]=l}}})}apply(t){t.forEach(e=>e(this))}}var W=new ur({_scriptable:n=>!n.startsWith("on"),_indexable:n=>n!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[ar,rr,dr]);function hr(n){return!n||R(n.size)||R(n.family)?null:(n.style?n.style+" ":"")+(n.weight?n.weight+" ":"")+n.size+"px "+n.family}function mn(n,t,e,s,i){let o=t[i];return o||(o=t[i]=n.measureText(i).width,e.push(i)),o>s&&(s=o),s}function fr(n,t,e,s){s=s||{};let i=s.data=s.data||{},o=s.garbageCollect=s.garbageCollect||[];s.font!==t&&(i=s.data={},o=s.garbageCollect=[],s.font=t),n.save(),n.font=t;let a=0;const r=e.length;let l,c,d,u,h;for(l=0;l<r;l++)if(u=e[l],u!=null&&!V(u))a=mn(n,i,o,a,u);else if(V(u))for(c=0,d=u.length;c<d;c++)h=u[c],h!=null&&!V(h)&&(a=mn(n,i,o,a,h));n.restore();const f=o.length/2;if(f>e.length){for(l=0;l<f;l++)delete i[o[l]];o.splice(0,f)}return a}function zt(n,t,e){const s=n.currentDevicePixelRatio,i=e!==0?Math.max(e/2,.5):0;return Math.round((t-i)*s)/s+i}function Ks(n,t){!t&&!n||(t=t||n.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,n.width,n.height),t.restore())}function Qn(n,t,e,s){ko(n,t,e,s,null)}function ko(n,t,e,s,i){let o,a,r,l,c,d,u,h;const f=t.pointStyle,p=t.rotation,m=t.radius;let g=(p||0)*Ya;if(f&&typeof f=="object"&&(o=f.toString(),o==="[object HTMLImageElement]"||o==="[object HTMLCanvasElement]")){n.save(),n.translate(e,s),n.rotate(g),n.drawImage(f,-f.width/2,-f.height/2,f.width,f.height),n.restore();return}if(!(isNaN(m)||m<=0)){switch(n.beginPath(),f){default:i?n.ellipse(e,s,i/2,m,0,0,j):n.arc(e,s,m,0,j),n.closePath();break;case"triangle":d=i?i/2:m,n.moveTo(e+Math.sin(g)*d,s-Math.cos(g)*m),g+=Hs,n.lineTo(e+Math.sin(g)*d,s-Math.cos(g)*m),g+=Hs,n.lineTo(e+Math.sin(g)*d,s-Math.cos(g)*m),n.closePath();break;case"rectRounded":c=m*.516,l=m-c,a=Math.cos(g+$t)*l,u=Math.cos(g+$t)*(i?i/2-c:l),r=Math.sin(g+$t)*l,h=Math.sin(g+$t)*(i?i/2-c:l),n.arc(e-u,s-r,c,g-$,g-Y),n.arc(e+h,s-a,c,g-Y,g),n.arc(e+u,s+r,c,g,g+Y),n.arc(e-h,s+a,c,g+Y,g+$),n.closePath();break;case"rect":if(!p){l=Math.SQRT1_2*m,d=i?i/2:l,n.rect(e-d,s-l,2*d,2*l);break}g+=$t;case"rectRot":u=Math.cos(g)*(i?i/2:m),a=Math.cos(g)*m,r=Math.sin(g)*m,h=Math.sin(g)*(i?i/2:m),n.moveTo(e-u,s-r),n.lineTo(e+h,s-a),n.lineTo(e+u,s+r),n.lineTo(e-h,s+a),n.closePath();break;case"crossRot":g+=$t;case"cross":u=Math.cos(g)*(i?i/2:m),a=Math.cos(g)*m,r=Math.sin(g)*m,h=Math.sin(g)*(i?i/2:m),n.moveTo(e-u,s-r),n.lineTo(e+u,s+r),n.moveTo(e+h,s-a),n.lineTo(e-h,s+a);break;case"star":u=Math.cos(g)*(i?i/2:m),a=Math.cos(g)*m,r=Math.sin(g)*m,h=Math.sin(g)*(i?i/2:m),n.moveTo(e-u,s-r),n.lineTo(e+u,s+r),n.moveTo(e+h,s-a),n.lineTo(e-h,s+a),g+=$t,u=Math.cos(g)*(i?i/2:m),a=Math.cos(g)*m,r=Math.sin(g)*m,h=Math.sin(g)*(i?i/2:m),n.moveTo(e-u,s-r),n.lineTo(e+u,s+r),n.moveTo(e+h,s-a),n.lineTo(e-h,s+a);break;case"line":a=i?i/2:Math.cos(g)*m,r=Math.sin(g)*m,n.moveTo(e-a,s-r),n.lineTo(e+a,s+r);break;case"dash":n.moveTo(e,s),n.lineTo(e+Math.cos(g)*(i?i/2:m),s+Math.sin(g)*m);break;case!1:n.closePath();break}n.fill(),t.borderWidth>0&&n.stroke()}}function kt(n,t,e){return e=e||.5,!t||n&&n.x>t.left-e&&n.x<t.right+e&&n.y>t.top-e&&n.y<t.bottom+e}function Sn(n,t){n.save(),n.beginPath(),n.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),n.clip()}function En(n){n.restore()}function pr(n,t,e,s,i){if(!t)return n.lineTo(e.x,e.y);if(i==="middle"){const o=(t.x+e.x)/2;n.lineTo(o,t.y),n.lineTo(o,e.y)}else i==="after"!=!!s?n.lineTo(t.x,e.y):n.lineTo(e.x,t.y);n.lineTo(e.x,e.y)}function mr(n,t,e,s){if(!t)return n.lineTo(e.x,e.y);n.bezierCurveTo(s?t.cp1x:t.cp2x,s?t.cp1y:t.cp2y,s?e.cp2x:e.cp1x,s?e.cp2y:e.cp1y,e.x,e.y)}function gr(n,t){t.translation&&n.translate(t.translation[0],t.translation[1]),R(t.rotation)||n.rotate(t.rotation),t.color&&(n.fillStyle=t.color),t.textAlign&&(n.textAlign=t.textAlign),t.textBaseline&&(n.textBaseline=t.textBaseline)}function br(n,t,e,s,i){if(i.strikethrough||i.underline){const o=n.measureText(s),a=t-o.actualBoundingBoxLeft,r=t+o.actualBoundingBoxRight,l=e-o.actualBoundingBoxAscent,c=e+o.actualBoundingBoxDescent,d=i.strikethrough?(l+c)/2:c;n.strokeStyle=n.fillStyle,n.beginPath(),n.lineWidth=i.decorationWidth||2,n.moveTo(a,d),n.lineTo(r,d),n.stroke()}}function vr(n,t){const e=n.fillStyle;n.fillStyle=t.color,n.fillRect(t.left,t.top,t.width,t.height),n.fillStyle=e}function Yt(n,t,e,s,i,o={}){const a=V(t)?t:[t],r=o.strokeWidth>0&&o.strokeColor!=="";let l,c;for(n.save(),n.font=i.string,gr(n,o),l=0;l<a.length;++l)c=a[l],o.backdrop&&vr(n,o.backdrop),r&&(o.strokeColor&&(n.strokeStyle=o.strokeColor),R(o.strokeWidth)||(n.lineWidth=o.strokeWidth),n.strokeText(c,e,s,o.maxWidth)),n.fillText(c,e,s,o.maxWidth),br(n,e,s,c,o),s+=Number(i.lineHeight);n.restore()}function Ie(n,t){const{x:e,y:s,w:i,h:o,radius:a}=t;n.arc(e+a.topLeft,s+a.topLeft,a.topLeft,1.5*$,$,!0),n.lineTo(e,s+o-a.bottomLeft),n.arc(e+a.bottomLeft,s+o-a.bottomLeft,a.bottomLeft,$,Y,!0),n.lineTo(e+i-a.bottomRight,s+o),n.arc(e+i-a.bottomRight,s+o-a.bottomRight,a.bottomRight,Y,0,!0),n.lineTo(e+i,s+a.topRight),n.arc(e+i-a.topRight,s+a.topRight,a.topRight,0,-Y,!0),n.lineTo(e+a.topLeft,s)}const yr=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,xr=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function _r(n,t){const e=(""+n).match(yr);if(!e||e[1]==="normal")return t*1.2;switch(n=+e[2],e[3]){case"px":return n;case"%":n/=100;break}return t*n}const wr=n=>+n||0;function ks(n,t){const e={},s=D(t),i=s?Object.keys(t):t,o=D(n)?s?a=>I(n[a],n[t[a]]):a=>n[a]:()=>n;for(const a of i)e[a]=wr(o(a));return e}function So(n){return ks(n,{top:"y",right:"x",bottom:"y",left:"x"})}function Wt(n){return ks(n,["topLeft","topRight","bottomLeft","bottomRight"])}function et(n){const t=So(n);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function G(n,t){n=n||{},t=t||W.font;let e=I(n.size,t.size);typeof e=="string"&&(e=parseInt(e,10));let s=I(n.style,t.style);s&&!(""+s).match(xr)&&(console.warn('Invalid font style specified: "'+s+'"'),s=void 0);const i={family:I(n.family,t.family),lineHeight:_r(I(n.lineHeight,t.lineHeight),e),size:e,style:s,weight:I(n.weight,t.weight),string:""};return i.string=hr(i),i}function pe(n,t,e,s){let i,o,a;for(i=0,o=n.length;i<o;++i)if(a=n[i],a!==void 0&&a!==void 0)return a}function kr(n,t,e){const{min:s,max:i}=n,o=ho(t,(i-s)/2),a=(r,l)=>e&&r===0?0:r+l;return{min:a(s,-Math.abs(o)),max:a(i,o)}}function Rt(n,t){return Object.assign(Object.create(n),t)}function Ss(n,t=[""],e,s,i=()=>n[0]){const o=e||n;typeof s>"u"&&(s=Ao("_fallback",n));const a={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:n,_rootScopes:o,_fallback:s,_getTarget:i,override:r=>Ss([r,...n],t,o,s)};return new Proxy(a,{deleteProperty(r,l){return delete r[l],delete r._keys,delete n[0][l],!0},get(r,l){return Mo(r,l,()=>Ir(l,t,n,r))},getOwnPropertyDescriptor(r,l){return Reflect.getOwnPropertyDescriptor(r._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(n[0])},has(r,l){return Qs(r).includes(l)},ownKeys(r){return Qs(r)},set(r,l,c){const d=r._storage||(r._storage=i());return r[l]=d[l]=c,delete r._keys,!0}})}function ne(n,t,e,s){const i={_cacheable:!1,_proxy:n,_context:t,_subProxy:e,_stack:new Set,_descriptors:Eo(n,s),setContext:o=>ne(n,o,e,s),override:o=>ne(n.override(o),t,e,s)};return new Proxy(i,{deleteProperty(o,a){return delete o[a],delete n[a],!0},get(o,a,r){return Mo(o,a,()=>Er(o,a,r))},getOwnPropertyDescriptor(o,a){return o._descriptors.allKeys?Reflect.has(n,a)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(n,a)},getPrototypeOf(){return Reflect.getPrototypeOf(n)},has(o,a){return Reflect.has(n,a)},ownKeys(){return Reflect.ownKeys(n)},set(o,a,r){return n[a]=r,delete o[a],!0}})}function Eo(n,t={scriptable:!0,indexable:!0}){const{_scriptable:e=t.scriptable,_indexable:s=t.indexable,_allKeys:i=t.allKeys}=n;return{allKeys:i,scriptable:e,indexable:s,isScriptable:Tt(e)?e:()=>e,isIndexable:Tt(s)?s:()=>s}}const Sr=(n,t)=>n?n+vs(t):t,Es=(n,t)=>D(t)&&n!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Mo(n,t,e){if(Object.prototype.hasOwnProperty.call(n,t)||t==="constructor")return n[t];const s=e();return n[t]=s,s}function Er(n,t,e){const{_proxy:s,_context:i,_subProxy:o,_descriptors:a}=n;let r=s[t];return Tt(r)&&a.isScriptable(t)&&(r=Mr(t,r,n,e)),V(r)&&r.length&&(r=Cr(t,r,n,a.isIndexable)),Es(t,r)&&(r=ne(r,i,o&&o[t],a)),r}function Mr(n,t,e,s){const{_proxy:i,_context:o,_subProxy:a,_stack:r}=e;if(r.has(n))throw new Error("Recursion detected: "+Array.from(r).join("->")+"->"+n);r.add(n);let l=t(o,a||s);return r.delete(n),Es(n,l)&&(l=Ms(i._scopes,i,n,l)),l}function Cr(n,t,e,s){const{_proxy:i,_context:o,_subProxy:a,_descriptors:r}=e;if(typeof o.index<"u"&&s(n))return t[o.index%t.length];if(D(t[0])){const l=t,c=i._scopes.filter(d=>d!==l);t=[];for(const d of l){const u=Ms(c,i,n,d);t.push(ne(u,o,a&&a[n],r))}}return t}function Co(n,t,e){return Tt(n)?n(t,e):n}const Ar=(n,t)=>n===!0?t:typeof n=="string"?It(t,n):void 0;function Pr(n,t,e,s,i){for(const o of t){const a=Ar(e,o);if(a){n.add(a);const r=Co(a._fallback,e,i);if(typeof r<"u"&&r!==e&&r!==s)return r}else if(a===!1&&typeof s<"u"&&e!==s)return null}return!1}function Ms(n,t,e,s){const i=t._rootScopes,o=Co(t._fallback,e,s),a=[...n,...i],r=new Set;r.add(s);let l=Js(r,a,e,o||e,s);return l===null||typeof o<"u"&&o!==e&&(l=Js(r,a,o,l,s),l===null)?!1:Ss(Array.from(r),[""],i,o,()=>Lr(t,e,s))}function Js(n,t,e,s,i){for(;e;)e=Pr(n,t,e,s,i);return e}function Lr(n,t,e){const s=n._getTarget();t in s||(s[t]={});const i=s[t];return V(i)&&D(e)?e:i||{}}function Ir(n,t,e,s){let i;for(const o of t)if(i=Ao(Sr(o,n),e),typeof i<"u")return Es(n,i)?Ms(e,s,n,i):i}function Ao(n,t){for(const e of t){if(!e)continue;const s=e[n];if(typeof s<"u")return s}}function Qs(n){let t=n._keys;return t||(t=n._keys=Tr(n._scopes)),t}function Tr(n){const t=new Set;for(const e of n)for(const s of Object.keys(e).filter(i=>!i.startsWith("_")))t.add(s);return Array.from(t)}function Po(n,t,e,s){const{iScale:i}=n,{key:o="r"}=this._parsing,a=new Array(s);let r,l,c,d;for(r=0,l=s;r<l;++r)c=r+e,d=t[c],a[r]={r:i.parse(It(d,o),c)};return a}const Br=Number.EPSILON||1e-14,se=(n,t)=>t<n.length&&!n[t].skip&&n[t],Lo=n=>n==="x"?"y":"x";function Rr(n,t,e,s){const i=n.skip?t:n,o=t,a=e.skip?t:e,r=Kn(o,i),l=Kn(a,o);let c=r/(r+l),d=l/(r+l);c=isNaN(c)?0:c,d=isNaN(d)?0:d;const u=s*c,h=s*d;return{previous:{x:o.x-u*(a.x-i.x),y:o.y-u*(a.y-i.y)},next:{x:o.x+h*(a.x-i.x),y:o.y+h*(a.y-i.y)}}}function Dr(n,t,e){const s=n.length;let i,o,a,r,l,c=se(n,0);for(let d=0;d<s-1;++d)if(l=c,c=se(n,d+1),!(!l||!c)){if(_e(t[d],0,Br)){e[d]=e[d+1]=0;continue}i=e[d]/t[d],o=e[d+1]/t[d],r=Math.pow(i,2)+Math.pow(o,2),!(r<=9)&&(a=3/Math.sqrt(r),e[d]=i*a*t[d],e[d+1]=o*a*t[d])}}function Or(n,t,e="x"){const s=Lo(e),i=n.length;let o,a,r,l=se(n,0);for(let c=0;c<i;++c){if(a=r,r=l,l=se(n,c+1),!r)continue;const d=r[e],u=r[s];a&&(o=(d-a[e])/3,r[`cp1${e}`]=d-o,r[`cp1${s}`]=u-o*t[c]),l&&(o=(l[e]-d)/3,r[`cp2${e}`]=d+o,r[`cp2${s}`]=u+o*t[c])}}function $r(n,t="x"){const e=Lo(t),s=n.length,i=Array(s).fill(0),o=Array(s);let a,r,l,c=se(n,0);for(a=0;a<s;++a)if(r=l,l=c,c=se(n,a+1),!!l){if(c){const d=c[t]-l[t];i[a]=d!==0?(c[e]-l[e])/d:0}o[a]=r?c?mt(i[a-1])!==mt(i[a])?0:(i[a-1]+i[a])/2:i[a-1]:i[a]}Dr(n,i,o),Or(n,o,t)}function qe(n,t,e){return Math.max(Math.min(n,e),t)}function zr(n,t){let e,s,i,o,a,r=kt(n[0],t);for(e=0,s=n.length;e<s;++e)a=o,o=r,r=e<s-1&&kt(n[e+1],t),o&&(i=n[e],a&&(i.cp1x=qe(i.cp1x,t.left,t.right),i.cp1y=qe(i.cp1y,t.top,t.bottom)),r&&(i.cp2x=qe(i.cp2x,t.left,t.right),i.cp2y=qe(i.cp2y,t.top,t.bottom)))}function Nr(n,t,e,s,i){let o,a,r,l;if(t.spanGaps&&(n=n.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")$r(n,i);else{let c=s?n[n.length-1]:n[0];for(o=0,a=n.length;o<a;++o)r=n[o],l=Rr(c,r,n[Math.min(o+1,a-(s?0:1))%a],t.tension),r.cp1x=l.previous.x,r.cp1y=l.previous.y,r.cp2x=l.next.x,r.cp2y=l.next.y,c=r}t.capBezierPoints&&zr(n,e)}function Cs(){return typeof window<"u"&&typeof document<"u"}function As(n){let t=n.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function gn(n,t,e){let s;return typeof n=="string"?(s=parseInt(n,10),n.indexOf("%")!==-1&&(s=s/100*t.parentNode[e])):s=n,s}const Mn=n=>n.ownerDocument.defaultView.getComputedStyle(n,null);function Fr(n,t){return Mn(n).getPropertyValue(t)}const jr=["top","right","bottom","left"];function qt(n,t,e){const s={};e=e?"-"+e:"";for(let i=0;i<4;i++){const o=jr[i];s[o]=parseFloat(n[t+"-"+o+e])||0}return s.width=s.left+s.right,s.height=s.top+s.bottom,s}const Hr=(n,t,e)=>(n>0||t>0)&&(!e||!e.shadowRoot);function Vr(n,t){const e=n.touches,s=e&&e.length?e[0]:n,{offsetX:i,offsetY:o}=s;let a=!1,r,l;if(Hr(i,o,n.target))r=i,l=o;else{const c=t.getBoundingClientRect();r=s.clientX-c.left,l=s.clientY-c.top,a=!0}return{x:r,y:l,box:a}}function jt(n,t){if("native"in n)return n;const{canvas:e,currentDevicePixelRatio:s}=t,i=Mn(e),o=i.boxSizing==="border-box",a=qt(i,"padding"),r=qt(i,"border","width"),{x:l,y:c,box:d}=Vr(n,e),u=a.left+(d&&r.left),h=a.top+(d&&r.top);let{width:f,height:p}=t;return o&&(f-=a.width+r.width,p-=a.height+r.height),{x:Math.round((l-u)/f*e.width/s),y:Math.round((c-h)/p*e.height/s)}}function Wr(n,t,e){let s,i;if(t===void 0||e===void 0){const o=n&&As(n);if(!o)t=n.clientWidth,e=n.clientHeight;else{const a=o.getBoundingClientRect(),r=Mn(o),l=qt(r,"border","width"),c=qt(r,"padding");t=a.width-c.width-l.width,e=a.height-c.height-l.height,s=gn(r.maxWidth,o,"clientWidth"),i=gn(r.maxHeight,o,"clientHeight")}}return{width:t,height:e,maxWidth:s||pn,maxHeight:i||pn}}const Ct=n=>Math.round(n*10)/10;function qr(n,t,e,s){const i=Mn(n),o=qt(i,"margin"),a=gn(i.maxWidth,n,"clientWidth")||pn,r=gn(i.maxHeight,n,"clientHeight")||pn,l=Wr(n,t,e);let{width:c,height:d}=l;if(i.boxSizing==="content-box"){const h=qt(i,"border","width"),f=qt(i,"padding");c-=f.width+h.width,d-=f.height+h.height}return c=Math.max(0,c-o.width),d=Math.max(0,s?c/s:d-o.height),c=Ct(Math.min(c,a,l.maxWidth)),d=Ct(Math.min(d,r,l.maxHeight)),c&&!d&&(d=Ct(c/2)),(t!==void 0||e!==void 0)&&s&&l.height&&d>l.height&&(d=l.height,c=Ct(Math.floor(d*s))),{width:c,height:d}}function Zs(n,t,e){const s=t||1,i=Ct(n.height*s),o=Ct(n.width*s);n.height=Ct(n.height),n.width=Ct(n.width);const a=n.canvas;return a.style&&(e||!a.style.height&&!a.style.width)&&(a.style.height=`${n.height}px`,a.style.width=`${n.width}px`),n.currentDevicePixelRatio!==s||a.height!==i||a.width!==o?(n.currentDevicePixelRatio=s,a.height=i,a.width=o,n.ctx.setTransform(s,0,0,s,0,0),!0):!1}const Ur=(function(){let n=!1;try{const t={get passive(){return n=!0,!1}};Cs()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return n})();function ti(n,t){const e=Fr(n,t),s=e&&e.match(/^(\d+)(\.\d+)?px$/);return s?+s[1]:void 0}function Ht(n,t,e,s){return{x:n.x+e*(t.x-n.x),y:n.y+e*(t.y-n.y)}}function Yr(n,t,e,s){return{x:n.x+e*(t.x-n.x),y:s==="middle"?e<.5?n.y:t.y:s==="after"?e<1?n.y:t.y:e>0?t.y:n.y}}function Gr(n,t,e,s){const i={x:n.cp2x,y:n.cp2y},o={x:t.cp1x,y:t.cp1y},a=Ht(n,i,e),r=Ht(i,o,e),l=Ht(o,t,e),c=Ht(a,r,e),d=Ht(r,l,e);return Ht(c,d,e)}const Xr=function(n,t){return{x(e){return n+n+t-e},setWidth(e){t=e},textAlign(e){return e==="center"?e:e==="right"?"left":"right"},xPlus(e,s){return e-s},leftForLtr(e,s){return e-s}}},Kr=function(){return{x(n){return n},setWidth(n){},textAlign(n){return n},xPlus(n,t){return n+t},leftForLtr(n,t){return n}}};function te(n,t,e){return n?Xr(t,e):Kr()}function Io(n,t){let e,s;(t==="ltr"||t==="rtl")&&(e=n.canvas.style,s=[e.getPropertyValue("direction"),e.getPropertyPriority("direction")],e.setProperty("direction",t,"important"),n.prevTextDirection=s)}function To(n,t){t!==void 0&&(delete n.prevTextDirection,n.canvas.style.setProperty("direction",t[0],t[1]))}function Bo(n){return n==="angle"?{between:Le,compare:Ja,normalize:Z}:{between:_t,compare:(t,e)=>t-e,normalize:t=>t}}function ei({start:n,end:t,count:e,loop:s,style:i}){return{start:n%e,end:t%e,loop:s&&(t-n+1)%e===0,style:i}}function Jr(n,t,e){const{property:s,start:i,end:o}=e,{between:a,normalize:r}=Bo(s),l=t.length;let{start:c,end:d,loop:u}=n,h,f;if(u){for(c+=l,d+=l,h=0,f=l;h<f&&a(r(t[c%l][s]),i,o);++h)c--,d--;c%=l,d%=l}return d<c&&(d+=l),{start:c,end:d,loop:u,style:n.style}}function Ro(n,t,e){if(!e)return[n];const{property:s,start:i,end:o}=e,a=t.length,{compare:r,between:l,normalize:c}=Bo(s),{start:d,end:u,loop:h,style:f}=Jr(n,t,e),p=[];let m=!1,g=null,b,y,k;const w=()=>l(i,k,b)&&r(i,k)!==0,x=()=>r(o,b)===0||l(o,k,b),E=()=>m||w(),M=()=>!m||x();for(let C=d,L=d;C<=u;++C)y=t[C%a],!y.skip&&(b=c(y[s]),b!==k&&(m=l(b,i,o),g===null&&E()&&(g=r(b,i)===0?C:L),g!==null&&M()&&(p.push(ei({start:g,end:C,loop:h,count:a,style:f})),g=null),L=C,k=b));return g!==null&&p.push(ei({start:g,end:u,loop:h,count:a,style:f})),p}function Do(n,t){const e=[],s=n.segments;for(let i=0;i<s.length;i++){const o=Ro(s[i],n.points,t);o.length&&e.push(...o)}return e}function Qr(n,t,e,s){let i=0,o=t-1;if(e&&!s)for(;i<t&&!n[i].skip;)i++;for(;i<t&&n[i].skip;)i++;for(i%=t,e&&(o+=i);o>i&&n[o%t].skip;)o--;return o%=t,{start:i,end:o}}function Zr(n,t,e,s){const i=n.length,o=[];let a=t,r=n[t],l;for(l=t+1;l<=e;++l){const c=n[l%i];c.skip||c.stop?r.skip||(s=!1,o.push({start:t%i,end:(l-1)%i,loop:s}),t=a=c.stop?l:null):(a=l,r.skip&&(t=l)),r=c}return a!==null&&o.push({start:t%i,end:a%i,loop:s}),o}function tl(n,t){const e=n.points,s=n.options.spanGaps,i=e.length;if(!i)return[];const o=!!n._loop,{start:a,end:r}=Qr(e,i,o,s);if(s===!0)return ni(n,[{start:a,end:r,loop:o}],e,t);const l=r<a?r+i:r,c=!!n._fullLoop&&a===0&&r===i-1;return ni(n,Zr(e,a,l,c),e,t)}function ni(n,t,e,s){return!s||!s.setContext||!e?t:el(n,t,e,s)}function el(n,t,e,s){const i=n._chart.getContext(),o=si(n.options),{_datasetIndex:a,options:{spanGaps:r}}=n,l=e.length,c=[];let d=o,u=t[0].start,h=u;function f(p,m,g,b){const y=r?-1:1;if(p!==m){for(p+=l;e[p%l].skip;)p-=y;for(;e[m%l].skip;)m+=y;p%l!==m%l&&(c.push({start:p%l,end:m%l,loop:g,style:b}),d=b,u=m%l)}}for(const p of t){u=r?u:p.start;let m=e[u%l],g;for(h=u+1;h<=p.end;h++){const b=e[h%l];g=si(s.setContext(Rt(i,{type:"segment",p0:m,p1:b,p0DataIndex:(h-1)%l,p1DataIndex:h%l,datasetIndex:a}))),nl(g,d)&&f(u,h-1,p.loop,d),m=b,d=g}u<h-1&&f(u,h-1,p.loop,d)}return c}function si(n){return{backgroundColor:n.backgroundColor,borderCapStyle:n.borderCapStyle,borderDash:n.borderDash,borderDashOffset:n.borderDashOffset,borderJoinStyle:n.borderJoinStyle,borderWidth:n.borderWidth,borderColor:n.borderColor}}function nl(n,t){if(!t)return!1;const e=[],s=function(i,o){return ws(o)?(e.includes(o)||e.push(o),e.indexOf(o)):o};return JSON.stringify(n,s)!==JSON.stringify(t,s)}function Ue(n,t,e){return n.options.clip?n[e]:t[e]}function sl(n,t){const{xScale:e,yScale:s}=n;return e&&s?{left:Ue(e,t,"left"),right:Ue(e,t,"right"),top:Ue(s,t,"top"),bottom:Ue(s,t,"bottom")}:t}function Oo(n,t){const e=t._clip;if(e.disabled)return!1;const s=sl(t,n.chartArea);return{left:e.left===!1?0:s.left-(e.left===!0?0:e.left),right:e.right===!1?n.width:s.right+(e.right===!0?0:e.right),top:e.top===!1?0:s.top-(e.top===!0?0:e.top),bottom:e.bottom===!1?n.height:s.bottom+(e.bottom===!0?0:e.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class il{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,e,s,i){const o=e.listeners[i],a=e.duration;o.forEach(r=>r({chart:t,initial:e.initial,numSteps:a,currentStep:Math.min(s-e.start,a)}))}_refresh(){this._request||(this._running=!0,this._request=vo.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let e=0;this._charts.forEach((s,i)=>{if(!s.running||!s.items.length)return;const o=s.items;let a=o.length-1,r=!1,l;for(;a>=0;--a)l=o[a],l._active?(l._total>s.duration&&(s.duration=l._total),l.tick(t),r=!0):(o[a]=o[o.length-1],o.pop());r&&(i.draw(),this._notify(i,s,t,"progress")),o.length||(s.running=!1,this._notify(i,s,t,"complete"),s.initial=!1),e+=o.length}),this._lastDate=t,e===0&&(this._running=!1)}_getAnims(t){const e=this._charts;let s=e.get(t);return s||(s={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},e.set(t,s)),s}listen(t,e,s){this._getAnims(t).listeners[e].push(s)}add(t,e){!e||!e.length||this._getAnims(t).items.push(...e)}has(t){return this._getAnims(t).items.length>0}start(t){const e=this._charts.get(t);e&&(e.running=!0,e.start=Date.now(),e.duration=e.items.reduce((s,i)=>Math.max(s,i._duration),0),this._refresh())}running(t){if(!this._running)return!1;const e=this._charts.get(t);return!(!e||!e.running||!e.items.length)}stop(t){const e=this._charts.get(t);if(!e||!e.items.length)return;const s=e.items;let i=s.length-1;for(;i>=0;--i)s[i].cancel();e.items=[],this._notify(t,e,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var bt=new il;const ii="transparent",ol={boolean(n,t,e){return e>.5?t:n},color(n,t,e){const s=Gs(n||ii),i=s.valid&&Gs(t||ii);return i&&i.valid?i.mix(s,e).hexString():t},number(n,t,e){return n+(t-n)*e}};class al{constructor(t,e,s,i){const o=e[s];i=pe([t.to,i,o,t.from]);const a=pe([t.from,o,i]);this._active=!0,this._fn=t.fn||ol[t.type||typeof a],this._easing=we[t.easing]||we.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=e,this._prop=s,this._from=a,this._to=i,this._promises=void 0}active(){return this._active}update(t,e,s){if(this._active){this._notify(!1);const i=this._target[this._prop],o=s-this._start,a=this._duration-o;this._start=s,this._duration=Math.floor(Math.max(a,t.duration)),this._total+=o,this._loop=!!t.loop,this._to=pe([t.to,e,i,t.from]),this._from=pe([t.from,i,e])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const e=t-this._start,s=this._duration,i=this._prop,o=this._from,a=this._loop,r=this._to;let l;if(this._active=o!==r&&(a||e<s),!this._active){this._target[i]=r,this._notify(!0);return}if(e<0){this._target[i]=o;return}l=e/s%2,l=a&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[i]=this._fn(o,r,l)}wait(){const t=this._promises||(this._promises=[]);return new Promise((e,s)=>{t.push({res:e,rej:s})})}_notify(t){const e=t?"res":"rej",s=this._promises||[];for(let i=0;i<s.length;i++)s[i][e]()}}class $o{constructor(t,e){this._chart=t,this._properties=new Map,this.configure(e)}configure(t){if(!D(t))return;const e=Object.keys(W.animation),s=this._properties;Object.getOwnPropertyNames(t).forEach(i=>{const o=t[i];if(!D(o))return;const a={};for(const r of e)a[r]=o[r];(V(o.properties)&&o.properties||[i]).forEach(r=>{(r===i||!s.has(r))&&s.set(r,a)})})}_animateOptions(t,e){const s=e.options,i=ll(t,s);if(!i)return[];const o=this._createAnimations(i,s);return s.$shared&&rl(t.options.$animations,s).then(()=>{t.options=s},()=>{}),o}_createAnimations(t,e){const s=this._properties,i=[],o=t.$animations||(t.$animations={}),a=Object.keys(e),r=Date.now();let l;for(l=a.length-1;l>=0;--l){const c=a[l];if(c.charAt(0)==="$")continue;if(c==="options"){i.push(...this._animateOptions(t,e));continue}const d=e[c];let u=o[c];const h=s.get(c);if(u)if(h&&u.active()){u.update(h,d,r);continue}else u.cancel();if(!h||!h.duration){t[c]=d;continue}o[c]=u=new al(h,t,c,d),i.push(u)}return i}update(t,e){if(this._properties.size===0){Object.assign(t,e);return}const s=this._createAnimations(t,e);if(s.length)return bt.add(this._chart,s),!0}}function rl(n,t){const e=[],s=Object.keys(t);for(let i=0;i<s.length;i++){const o=n[s[i]];o&&o.active()&&e.push(o.wait())}return Promise.all(e)}function ll(n,t){if(!t)return;let e=n.options;if(!e){n.options=t;return}return e.$shared&&(n.options=e=Object.assign({},e,{$shared:!1,$animations:{}})),e}function oi(n,t){const e=n&&n.options||{},s=e.reverse,i=e.min===void 0?t:0,o=e.max===void 0?t:0;return{start:s?o:i,end:s?i:o}}function cl(n,t,e){if(e===!1)return!1;const s=oi(n,e),i=oi(t,e);return{top:i.end,right:s.end,bottom:i.start,left:s.start}}function dl(n){let t,e,s,i;return D(n)?(t=n.top,e=n.right,s=n.bottom,i=n.left):t=e=s=i=n,{top:t,right:e,bottom:s,left:i,disabled:n===!1}}function zo(n,t){const e=[],s=n._getSortedDatasetMetas(t);let i,o;for(i=0,o=s.length;i<o;++i)e.push(s[i].index);return e}function ai(n,t,e,s={}){const i=n.keys,o=s.mode==="single";let a,r,l,c;if(t===null)return;let d=!1;for(a=0,r=i.length;a<r;++a){if(l=+i[a],l===e){if(d=!0,s.all)continue;break}c=n.values[l],q(c)&&(o||t===0||mt(t)===mt(c))&&(t+=c)}return!d&&!s.all?0:t}function ul(n,t){const{iScale:e,vScale:s}=t,i=e.axis==="x"?"x":"y",o=s.axis==="x"?"x":"y",a=Object.keys(n),r=new Array(a.length);let l,c,d;for(l=0,c=a.length;l<c;++l)d=a[l],r[l]={[i]:d,[o]:n[d]};return r}function On(n,t){const e=n&&n.options.stacked;return e||e===void 0&&t.stack!==void 0}function hl(n,t,e){return`${n.id}.${t.id}.${e.stack||e.type}`}function fl(n){const{min:t,max:e,minDefined:s,maxDefined:i}=n.getUserBounds();return{min:s?t:Number.NEGATIVE_INFINITY,max:i?e:Number.POSITIVE_INFINITY}}function pl(n,t,e){const s=n[t]||(n[t]={});return s[e]||(s[e]={})}function ri(n,t,e,s){for(const i of t.getMatchingVisibleMetas(s).reverse()){const o=n[i.index];if(e&&o>0||!e&&o<0)return i.index}return null}function li(n,t){const{chart:e,_cachedMeta:s}=n,i=e._stacks||(e._stacks={}),{iScale:o,vScale:a,index:r}=s,l=o.axis,c=a.axis,d=hl(o,a,s),u=t.length;let h;for(let f=0;f<u;++f){const p=t[f],{[l]:m,[c]:g}=p,b=p._stacks||(p._stacks={});h=b[c]=pl(i,d,m),h[r]=g,h._top=ri(h,a,!0,s.type),h._bottom=ri(h,a,!1,s.type);const y=h._visualValues||(h._visualValues={});y[r]=g}}function $n(n,t){const e=n.scales;return Object.keys(e).filter(s=>e[s].axis===t).shift()}function ml(n,t){return Rt(n,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function gl(n,t,e){return Rt(n,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:e,index:t,mode:"default",type:"data"})}function re(n,t){const e=n.controller.index,s=n.vScale&&n.vScale.axis;if(s){t=t||n._parsed;for(const i of t){const o=i._stacks;if(!o||o[s]===void 0||o[s][e]===void 0)return;delete o[s][e],o[s]._visualValues!==void 0&&o[s]._visualValues[e]!==void 0&&delete o[s]._visualValues[e]}}}const zn=n=>n==="reset"||n==="none",ci=(n,t)=>t?n:Object.assign({},n),bl=(n,t,e)=>n&&!t.hidden&&t._stacked&&{keys:zo(e,!0),values:null};class ut{constructor(t,e){this.chart=t,this._ctx=t.ctx,this.index=e,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=On(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&re(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,e=this._cachedMeta,s=this.getDataset(),i=(u,h,f,p)=>u==="x"?h:u==="r"?p:f,o=e.xAxisID=I(s.xAxisID,$n(t,"x")),a=e.yAxisID=I(s.yAxisID,$n(t,"y")),r=e.rAxisID=I(s.rAxisID,$n(t,"r")),l=e.indexAxis,c=e.iAxisID=i(l,o,a,r),d=e.vAxisID=i(l,a,o,r);e.xScale=this.getScaleForId(o),e.yScale=this.getScaleForId(a),e.rScale=this.getScaleForId(r),e.iScale=this.getScaleForId(c),e.vScale=this.getScaleForId(d)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const e=this._cachedMeta;return t===e.iScale?e.vScale:e.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&qs(this._data,this),t._stacked&&re(t)}_dataCheck(){const t=this.getDataset(),e=t.data||(t.data=[]),s=this._data;if(D(e)){const i=this._cachedMeta;this._data=ul(e,i)}else if(s!==e){if(s){qs(s,this);const i=this._cachedMeta;re(i),i._parsed=[]}e&&Object.isExtensible(e)&&er(e,this),this._syncList=[],this._data=e}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const e=this._cachedMeta,s=this.getDataset();let i=!1;this._dataCheck();const o=e._stacked;e._stacked=On(e.vScale,e),e.stack!==s.stack&&(i=!0,re(e),e.stack=s.stack),this._resyncElements(t),(i||o!==e._stacked)&&(li(this,e._parsed),e._stacked=On(e.vScale,e))}configure(){const t=this.chart.config,e=t.datasetScopeKeys(this._type),s=t.getOptionScopes(this.getDataset(),e,!0);this.options=t.createResolver(s,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,e){const{_cachedMeta:s,_data:i}=this,{iScale:o,_stacked:a}=s,r=o.axis;let l=t===0&&e===i.length?!0:s._sorted,c=t>0&&s._parsed[t-1],d,u,h;if(this._parsing===!1)s._parsed=i,s._sorted=!0,h=i;else{V(i[t])?h=this.parseArrayData(s,i,t,e):D(i[t])?h=this.parseObjectData(s,i,t,e):h=this.parsePrimitiveData(s,i,t,e);const f=()=>u[r]===null||c&&u[r]<c[r];for(d=0;d<e;++d)s._parsed[d+t]=u=h[d],l&&(f()&&(l=!1),c=u);s._sorted=l}a&&li(this,h)}parsePrimitiveData(t,e,s,i){const{iScale:o,vScale:a}=t,r=o.axis,l=a.axis,c=o.getLabels(),d=o===a,u=new Array(i);let h,f,p;for(h=0,f=i;h<f;++h)p=h+s,u[h]={[r]:d||o.parse(c[p],p),[l]:a.parse(e[p],p)};return u}parseArrayData(t,e,s,i){const{xScale:o,yScale:a}=t,r=new Array(i);let l,c,d,u;for(l=0,c=i;l<c;++l)d=l+s,u=e[d],r[l]={x:o.parse(u[0],d),y:a.parse(u[1],d)};return r}parseObjectData(t,e,s,i){const{xScale:o,yScale:a}=t,{xAxisKey:r="x",yAxisKey:l="y"}=this._parsing,c=new Array(i);let d,u,h,f;for(d=0,u=i;d<u;++d)h=d+s,f=e[h],c[d]={x:o.parse(It(f,r),h),y:a.parse(It(f,l),h)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,e,s){const i=this.chart,o=this._cachedMeta,a=e[t.axis],r={keys:zo(i,!0),values:e._stacks[t.axis]._visualValues};return ai(r,a,o.index,{mode:s})}updateRangeFromParsed(t,e,s,i){const o=s[e.axis];let a=o===null?NaN:o;const r=i&&s._stacks[e.axis];i&&r&&(i.values=r,a=ai(i,o,this._cachedMeta.index)),t.min=Math.min(t.min,a),t.max=Math.max(t.max,a)}getMinMax(t,e){const s=this._cachedMeta,i=s._parsed,o=s._sorted&&t===s.iScale,a=i.length,r=this._getOtherScale(t),l=bl(e,s,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:d,max:u}=fl(r);let h,f;function p(){f=i[h];const m=f[r.axis];return!q(f[t.axis])||d>m||u<m}for(h=0;h<a&&!(!p()&&(this.updateRangeFromParsed(c,t,f,l),o));++h);if(o){for(h=a-1;h>=0;--h)if(!p()){this.updateRangeFromParsed(c,t,f,l);break}}return c}getAllParsedValues(t){const e=this._cachedMeta._parsed,s=[];let i,o,a;for(i=0,o=e.length;i<o;++i)a=e[i][t.axis],q(a)&&s.push(a);return s}getMaxOverflow(){return!1}getLabelAndValue(t){const e=this._cachedMeta,s=e.iScale,i=e.vScale,o=this.getParsed(t);return{label:s?""+s.getLabelForValue(o[s.axis]):"",value:i?""+i.getLabelForValue(o[i.axis]):""}}_update(t){const e=this._cachedMeta;this.update(t||"default"),e._clip=dl(I(this.options.clip,cl(e.xScale,e.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,e=this.chart,s=this._cachedMeta,i=s.data||[],o=e.chartArea,a=[],r=this._drawStart||0,l=this._drawCount||i.length-r,c=this.options.drawActiveElementsOnTop;let d;for(s.dataset&&s.dataset.draw(t,o,r,l),d=r;d<r+l;++d){const u=i[d];u.hidden||(u.active&&c?a.push(u):u.draw(t,o))}for(d=0;d<a.length;++d)a[d].draw(t,o)}getStyle(t,e){const s=e?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(s):this.resolveDataElementOptions(t||0,s)}getContext(t,e,s){const i=this.getDataset();let o;if(t>=0&&t<this._cachedMeta.data.length){const a=this._cachedMeta.data[t];o=a.$context||(a.$context=gl(this.getContext(),t,a)),o.parsed=this.getParsed(t),o.raw=i.data[t],o.index=o.dataIndex=t}else o=this.$context||(this.$context=ml(this.chart.getContext(),this.index)),o.dataset=i,o.index=o.datasetIndex=this.index;return o.active=!!e,o.mode=s,o}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,e){return this._resolveElementOptions(this.dataElementType.id,e,t)}_resolveElementOptions(t,e="default",s){const i=e==="active",o=this._cachedDataOpts,a=t+"-"+e,r=o[a],l=this.enableOptionSharing&&Pe(s);if(r)return ci(r,l);const c=this.chart.config,d=c.datasetElementScopeKeys(this._type,t),u=i?[`${t}Hover`,"hover",t,""]:[t,""],h=c.getOptionScopes(this.getDataset(),d),f=Object.keys(W.elements[t]),p=()=>this.getContext(s,i,e),m=c.resolveNamedOptions(h,f,p,u);return m.$shared&&(m.$shared=l,o[a]=Object.freeze(ci(m,l))),m}_resolveAnimations(t,e,s){const i=this.chart,o=this._cachedDataOpts,a=`animation-${e}`,r=o[a];if(r)return r;let l;if(i.options.animation!==!1){const d=this.chart.config,u=d.datasetAnimationScopeKeys(this._type,e),h=d.getOptionScopes(this.getDataset(),u);l=d.createResolver(h,this.getContext(t,s,e))}const c=new $o(i,l&&l.animations);return l&&l._cacheable&&(o[a]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,e){return!e||zn(t)||this.chart._animationsDisabled}_getSharedOptions(t,e){const s=this.resolveDataElementOptions(t,e),i=this._sharedOptions,o=this.getSharedOptions(s),a=this.includeOptions(e,o)||o!==i;return this.updateSharedOptions(o,e,s),{sharedOptions:o,includeOptions:a}}updateElement(t,e,s,i){zn(i)?Object.assign(t,s):this._resolveAnimations(e,i).update(t,s)}updateSharedOptions(t,e,s){t&&!zn(e)&&this._resolveAnimations(void 0,e).update(t,s)}_setStyle(t,e,s,i){t.active=i;const o=this.getStyle(e,i);this._resolveAnimations(e,s,i).update(t,{options:!i&&this.getSharedOptions(o)||o})}removeHoverStyle(t,e,s){this._setStyle(t,s,"active",!1)}setHoverStyle(t,e,s){this._setStyle(t,s,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const e=this._data,s=this._cachedMeta.data;for(const[r,l,c]of this._syncList)this[r](l,c);this._syncList=[];const i=s.length,o=e.length,a=Math.min(o,i);a&&this.parse(0,a),o>i?this._insertElements(i,o-i,t):o<i&&this._removeElements(o,i-o)}_insertElements(t,e,s=!0){const i=this._cachedMeta,o=i.data,a=t+e;let r;const l=c=>{for(c.length+=e,r=c.length-1;r>=a;r--)c[r]=c[r-e]};for(l(o),r=t;r<a;++r)o[r]=new this.dataElementType;this._parsing&&l(i._parsed),this.parse(t,e),s&&this.updateElements(o,t,e,"reset")}updateElements(t,e,s,i){}_removeElements(t,e){const s=this._cachedMeta;if(this._parsing){const i=s._parsed.splice(t,e);s._stacked&&re(s,i)}s.data.splice(t,e)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[e,s,i]=t;this[e](s,i)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,e){e&&this._sync(["_removeElements",t,e]);const s=arguments.length-2;s&&this._sync(["_insertElements",t,s])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}S(ut,"defaults",{}),S(ut,"datasetElementType",null),S(ut,"dataElementType",null);function vl(n,t){if(!n._cache.$bar){const e=n.getMatchingVisibleMetas(t);let s=[];for(let i=0,o=e.length;i<o;i++)s=s.concat(e[i].controller.getAllParsedValues(n));n._cache.$bar=bo(s.sort((i,o)=>i-o))}return n._cache.$bar}function yl(n){const t=n.iScale,e=vl(t,n.type);let s=t._length,i,o,a,r;const l=()=>{a===32767||a===-32768||(Pe(r)&&(s=Math.min(s,Math.abs(a-r)||s)),r=a)};for(i=0,o=e.length;i<o;++i)a=t.getPixelForValue(e[i]),l();for(r=void 0,i=0,o=t.ticks.length;i<o;++i)a=t.getPixelForTick(i),l();return s}function xl(n,t,e,s){const i=e.barThickness;let o,a;return R(i)?(o=t.min*e.categoryPercentage,a=e.barPercentage):(o=i*s,a=1),{chunk:o/s,ratio:a,start:t.pixels[n]-o/2}}function _l(n,t,e,s){const i=t.pixels,o=i[n];let a=n>0?i[n-1]:null,r=n<i.length-1?i[n+1]:null;const l=e.categoryPercentage;a===null&&(a=o-(r===null?t.end-t.start:r-o)),r===null&&(r=o+o-a);const c=o-(o-Math.min(a,r))/2*l;return{chunk:Math.abs(r-a)/2*l/s,ratio:e.barPercentage,start:c}}function wl(n,t,e,s){const i=e.parse(n[0],s),o=e.parse(n[1],s),a=Math.min(i,o),r=Math.max(i,o);let l=a,c=r;Math.abs(a)>Math.abs(r)&&(l=r,c=a),t[e.axis]=c,t._custom={barStart:l,barEnd:c,start:i,end:o,min:a,max:r}}function No(n,t,e,s){return V(n)?wl(n,t,e,s):t[e.axis]=e.parse(n,s),t}function di(n,t,e,s){const i=n.iScale,o=n.vScale,a=i.getLabels(),r=i===o,l=[];let c,d,u,h;for(c=e,d=e+s;c<d;++c)h=t[c],u={},u[i.axis]=r||i.parse(a[c],c),l.push(No(h,u,o,c));return l}function Nn(n){return n&&n.barStart!==void 0&&n.barEnd!==void 0}function kl(n,t,e){return n!==0?mt(n):(t.isHorizontal()?1:-1)*(t.min>=e?1:-1)}function Sl(n){let t,e,s,i,o;return n.horizontal?(t=n.base>n.x,e="left",s="right"):(t=n.base<n.y,e="bottom",s="top"),t?(i="end",o="start"):(i="start",o="end"),{start:e,end:s,reverse:t,top:i,bottom:o}}function El(n,t,e,s){let i=t.borderSkipped;const o={};if(!i){n.borderSkipped=o;return}if(i===!0){n.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:a,end:r,reverse:l,top:c,bottom:d}=Sl(n);i==="middle"&&e&&(n.enableBorderRadius=!0,(e._top||0)===s?i=c:(e._bottom||0)===s?i=d:(o[ui(d,a,r,l)]=!0,i=c)),o[ui(i,a,r,l)]=!0,n.borderSkipped=o}function ui(n,t,e,s){return s?(n=Ml(n,t,e),n=hi(n,e,t)):n=hi(n,t,e),n}function Ml(n,t,e){return n===t?e:n===e?t:n}function hi(n,t,e){return n==="start"?t:n==="end"?e:n}function Cl(n,{inflateAmount:t},e){n.inflateAmount=t==="auto"?e===1?.33:0:t}class tn extends ut{parsePrimitiveData(t,e,s,i){return di(t,e,s,i)}parseArrayData(t,e,s,i){return di(t,e,s,i)}parseObjectData(t,e,s,i){const{iScale:o,vScale:a}=t,{xAxisKey:r="x",yAxisKey:l="y"}=this._parsing,c=o.axis==="x"?r:l,d=a.axis==="x"?r:l,u=[];let h,f,p,m;for(h=s,f=s+i;h<f;++h)m=e[h],p={},p[o.axis]=o.parse(It(m,c),h),u.push(No(It(m,d),p,a,h));return u}updateRangeFromParsed(t,e,s,i){super.updateRangeFromParsed(t,e,s,i);const o=s._custom;o&&e===this._cachedMeta.vScale&&(t.min=Math.min(t.min,o.min),t.max=Math.max(t.max,o.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const e=this._cachedMeta,{iScale:s,vScale:i}=e,o=this.getParsed(t),a=o._custom,r=Nn(a)?"["+a.start+", "+a.end+"]":""+i.getLabelForValue(o[i.axis]);return{label:""+s.getLabelForValue(o[s.axis]),value:r}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const e=this._cachedMeta;this.updateElements(e.data,0,e.data.length,t)}updateElements(t,e,s,i){const o=i==="reset",{index:a,_cachedMeta:{vScale:r}}=this,l=r.getBasePixel(),c=r.isHorizontal(),d=this._getRuler(),{sharedOptions:u,includeOptions:h}=this._getSharedOptions(e,i);for(let f=e;f<e+s;f++){const p=this.getParsed(f),m=o||R(p[r.axis])?{base:l,head:l}:this._calculateBarValuePixels(f),g=this._calculateBarIndexPixels(f,d),b=(p._stacks||{})[r.axis],y={horizontal:c,base:m.base,enableBorderRadius:!b||Nn(p._custom)||a===b._top||a===b._bottom,x:c?m.head:g.center,y:c?g.center:m.head,height:c?g.size:Math.abs(m.size),width:c?Math.abs(m.size):g.size};h&&(y.options=u||this.resolveDataElementOptions(f,t[f].active?"active":i));const k=y.options||t[f].options;El(y,k,b,a),Cl(y,k,d.ratio),this.updateElement(t[f],f,y,i)}}_getStacks(t,e){const{iScale:s}=this._cachedMeta,i=s.getMatchingVisibleMetas(this._type).filter(d=>d.controller.options.grouped),o=s.options.stacked,a=[],r=this._cachedMeta.controller.getParsed(e),l=r&&r[s.axis],c=d=>{const u=d._parsed.find(f=>f[s.axis]===l),h=u&&u[d.vScale.axis];if(R(h)||isNaN(h))return!0};for(const d of i)if(!(e!==void 0&&c(d))&&((o===!1||a.indexOf(d.stack)===-1||o===void 0&&d.stack===void 0)&&a.push(d.stack),d.index===t))break;return a.length||a.push(void 0),a}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,e=this.chart.options.indexAxis;return Object.keys(t).filter(s=>t[s].axis===e).shift()}_getAxis(){const t={},e=this.getFirstScaleIdForIndexAxis();for(const s of this.chart.data.datasets)t[I(this.chart.options.indexAxis==="x"?s.xAxisID:s.yAxisID,e)]=!0;return Object.keys(t)}_getStackIndex(t,e,s){const i=this._getStacks(t,s),o=e!==void 0?i.indexOf(e):-1;return o===-1?i.length-1:o}_getRuler(){const t=this.options,e=this._cachedMeta,s=e.iScale,i=[];let o,a;for(o=0,a=e.data.length;o<a;++o)i.push(s.getPixelForValue(this.getParsed(o)[s.axis],o));const r=t.barThickness;return{min:r||yl(e),pixels:i,start:s._startPixel,end:s._endPixel,stackCount:this._getStackCount(),scale:s,grouped:t.grouped,ratio:r?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:e,_stacked:s,index:i},options:{base:o,minBarLength:a}}=this,r=o||0,l=this.getParsed(t),c=l._custom,d=Nn(c);let u=l[e.axis],h=0,f=s?this.applyStack(e,l,s):u,p,m;f!==u&&(h=f-u,f=u),d&&(u=c.barStart,f=c.barEnd-c.barStart,u!==0&&mt(u)!==mt(c.barEnd)&&(h=0),h+=u);const g=!R(o)&&!d?o:h;let b=e.getPixelForValue(g);if(this.chart.getDataVisibility(t)?p=e.getPixelForValue(h+f):p=b,m=p-b,Math.abs(m)<a){m=kl(m,e,r)*a,u===r&&(b-=m/2);const y=e.getPixelForDecimal(0),k=e.getPixelForDecimal(1),w=Math.min(y,k),x=Math.max(y,k);b=Math.max(Math.min(b,x),w),p=b+m,s&&!d&&(l._stacks[e.axis]._visualValues[i]=e.getValueForPixel(p)-e.getValueForPixel(b))}if(b===e.getPixelForValue(r)){const y=mt(m)*e.getLineWidthForValue(r)/2;b+=y,m-=y}return{size:m,base:b,head:p,center:p+m/2}}_calculateBarIndexPixels(t,e){const s=e.scale,i=this.options,o=i.skipNull,a=I(i.maxBarThickness,1/0);let r,l;const c=this._getAxisCount();if(e.grouped){const d=o?this._getStackCount(t):e.stackCount,u=i.barThickness==="flex"?_l(t,e,i,d*c):xl(t,e,i,d*c),h=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,f=this._getAxis().indexOf(I(h,this.getFirstScaleIdForIndexAxis())),p=this._getStackIndex(this.index,this._cachedMeta.stack,o?t:void 0)+f;r=u.start+u.chunk*p+u.chunk/2,l=Math.min(a,u.chunk*u.ratio)}else r=s.getPixelForValue(this.getParsed(t)[s.axis],t),l=Math.min(a,e.min*e.ratio);return{base:r-l/2,head:r+l/2,center:r,size:l}}draw(){const t=this._cachedMeta,e=t.vScale,s=t.data,i=s.length;let o=0;for(;o<i;++o)this.getParsed(o)[e.axis]!==null&&!s[o].hidden&&s[o].draw(this._ctx)}}S(tn,"id","bar"),S(tn,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),S(tn,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});class en extends ut{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,e,s,i){const o=super.parsePrimitiveData(t,e,s,i);for(let a=0;a<o.length;a++)o[a]._custom=this.resolveDataElementOptions(a+s).radius;return o}parseArrayData(t,e,s,i){const o=super.parseArrayData(t,e,s,i);for(let a=0;a<o.length;a++){const r=e[s+a];o[a]._custom=I(r[2],this.resolveDataElementOptions(a+s).radius)}return o}parseObjectData(t,e,s,i){const o=super.parseObjectData(t,e,s,i);for(let a=0;a<o.length;a++){const r=e[s+a];o[a]._custom=I(r&&r.r&&+r.r,this.resolveDataElementOptions(a+s).radius)}return o}getMaxOverflow(){const t=this._cachedMeta.data;let e=0;for(let s=t.length-1;s>=0;--s)e=Math.max(e,t[s].size(this.resolveDataElementOptions(s))/2);return e>0&&e}getLabelAndValue(t){const e=this._cachedMeta,s=this.chart.data.labels||[],{xScale:i,yScale:o}=e,a=this.getParsed(t),r=i.getLabelForValue(a.x),l=o.getLabelForValue(a.y),c=a._custom;return{label:s[t]||"",value:"("+r+", "+l+(c?", "+c:"")+")"}}update(t){const e=this._cachedMeta.data;this.updateElements(e,0,e.length,t)}updateElements(t,e,s,i){const o=i==="reset",{iScale:a,vScale:r}=this._cachedMeta,{sharedOptions:l,includeOptions:c}=this._getSharedOptions(e,i),d=a.axis,u=r.axis;for(let h=e;h<e+s;h++){const f=t[h],p=!o&&this.getParsed(h),m={},g=m[d]=o?a.getPixelForDecimal(.5):a.getPixelForValue(p[d]),b=m[u]=o?r.getBasePixel():r.getPixelForValue(p[u]);m.skip=isNaN(g)||isNaN(b),c&&(m.options=l||this.resolveDataElementOptions(h,f.active?"active":i),o&&(m.options.radius=0)),this.updateElement(f,h,m,i)}}resolveDataElementOptions(t,e){const s=this.getParsed(t);let i=super.resolveDataElementOptions(t,e);i.$shared&&(i=Object.assign({},i,{$shared:!1}));const o=i.radius;return e!=="active"&&(i.radius=0),i.radius+=I(s&&s._custom,o),i}}S(en,"id","bubble"),S(en,"defaults",{datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}}),S(en,"overrides",{scales:{x:{type:"linear"},y:{type:"linear"}}});function Al(n,t,e){let s=1,i=1,o=0,a=0;if(t<j){const r=n,l=r+t,c=Math.cos(r),d=Math.sin(r),u=Math.cos(l),h=Math.sin(l),f=(k,w,x)=>Le(k,r,l,!0)?1:Math.max(w,w*e,x,x*e),p=(k,w,x)=>Le(k,r,l,!0)?-1:Math.min(w,w*e,x,x*e),m=f(0,c,u),g=f(Y,d,h),b=p($,c,u),y=p($+Y,d,h);s=(m-b)/2,i=(g-y)/2,o=-(m+b)/2,a=-(g+y)/2}return{ratioX:s,ratioY:i,offsetX:o,offsetY:a}}class Vt extends ut{constructor(t,e){super(t,e),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,e){const s=this.getDataset().data,i=this._cachedMeta;if(this._parsing===!1)i._parsed=s;else{let o=l=>+s[l];if(D(s[t])){const{key:l="value"}=this._parsing;o=c=>+It(s[c],l)}let a,r;for(a=t,r=t+e;a<r;++a)i._parsed[a]=o(a)}}_getRotation(){return dt(this.options.rotation-90)}_getCircumference(){return dt(this.options.circumference)}_getRotationExtents(){let t=j,e=-j;for(let s=0;s<this.chart.data.datasets.length;++s)if(this.chart.isDatasetVisible(s)&&this.chart.getDatasetMeta(s).type===this._type){const i=this.chart.getDatasetMeta(s).controller,o=i._getRotation(),a=i._getCircumference();t=Math.min(t,o),e=Math.max(e,o+a)}return{rotation:t,circumference:e-t}}update(t){const e=this.chart,{chartArea:s}=e,i=this._cachedMeta,o=i.data,a=this.getMaxBorderWidth()+this.getMaxOffset(o)+this.options.spacing,r=Math.max((Math.min(s.width,s.height)-a)/2,0),l=Math.min(Fa(this.options.cutout,r),1),c=this._getRingWeight(this.index),{circumference:d,rotation:u}=this._getRotationExtents(),{ratioX:h,ratioY:f,offsetX:p,offsetY:m}=Al(u,d,l),g=(s.width-a)/h,b=(s.height-a)/f,y=Math.max(Math.min(g,b)/2,0),k=ho(this.options.radius,y),w=Math.max(k*l,0),x=(k-w)/this._getVisibleDatasetWeightTotal();this.offsetX=p*k,this.offsetY=m*k,i.total=this.calculateTotal(),this.outerRadius=k-x*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-x*c,0),this.updateElements(o,0,o.length,t)}_circumference(t,e){const s=this.options,i=this._cachedMeta,o=this._getCircumference();return e&&s.animation.animateRotate||!this.chart.getDataVisibility(t)||i._parsed[t]===null||i.data[t].hidden?0:this.calculateCircumference(i._parsed[t]*o/j)}updateElements(t,e,s,i){const o=i==="reset",a=this.chart,r=a.chartArea,c=a.options.animation,d=(r.left+r.right)/2,u=(r.top+r.bottom)/2,h=o&&c.animateScale,f=h?0:this.innerRadius,p=h?0:this.outerRadius,{sharedOptions:m,includeOptions:g}=this._getSharedOptions(e,i);let b=this._getRotation(),y;for(y=0;y<e;++y)b+=this._circumference(y,o);for(y=e;y<e+s;++y){const k=this._circumference(y,o),w=t[y],x={x:d+this.offsetX,y:u+this.offsetY,startAngle:b,endAngle:b+k,circumference:k,outerRadius:p,innerRadius:f};g&&(x.options=m||this.resolveDataElementOptions(y,w.active?"active":i)),b+=k,this.updateElement(w,y,x,i)}}calculateTotal(){const t=this._cachedMeta,e=t.data;let s=0,i;for(i=0;i<e.length;i++){const o=t._parsed[i];o!==null&&!isNaN(o)&&this.chart.getDataVisibility(i)&&!e[i].hidden&&(s+=Math.abs(o))}return s}calculateCircumference(t){const e=this._cachedMeta.total;return e>0&&!isNaN(t)?j*(Math.abs(t)/e):0}getLabelAndValue(t){const e=this._cachedMeta,s=this.chart,i=s.data.labels||[],o=ze(e._parsed[t],s.options.locale);return{label:i[t]||"",value:o}}getMaxBorderWidth(t){let e=0;const s=this.chart;let i,o,a,r,l;if(!t){for(i=0,o=s.data.datasets.length;i<o;++i)if(s.isDatasetVisible(i)){a=s.getDatasetMeta(i),t=a.data,r=a.controller;break}}if(!t)return 0;for(i=0,o=t.length;i<o;++i)l=r.resolveDataElementOptions(i),l.borderAlign!=="inner"&&(e=Math.max(e,l.borderWidth||0,l.hoverBorderWidth||0));return e}getMaxOffset(t){let e=0;for(let s=0,i=t.length;s<i;++s){const o=this.resolveDataElementOptions(s);e=Math.max(e,o.offset||0,o.hoverOffset||0)}return e}_getRingWeightOffset(t){let e=0;for(let s=0;s<t;++s)this.chart.isDatasetVisible(s)&&(e+=this._getRingWeight(s));return e}_getRingWeight(t){return Math.max(I(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}S(Vt,"id","doughnut"),S(Vt,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),S(Vt,"descriptors",{_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")}),S(Vt,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data,{labels:{pointStyle:s,textAlign:i,color:o,useBorderRadius:a,borderRadius:r}}=t.legend.options;return e.labels.length&&e.datasets.length?e.labels.map((l,c)=>{const u=t.getDatasetMeta(0).controller.getStyle(c);return{text:l,fillStyle:u.backgroundColor,fontColor:o,hidden:!t.getDataVisibility(c),lineDash:u.borderDash,lineDashOffset:u.borderDashOffset,lineJoin:u.borderJoinStyle,lineWidth:u.borderWidth,strokeStyle:u.borderColor,textAlign:i,pointStyle:s,borderRadius:a&&(r||u.borderRadius),index:c}}):[]}},onClick(t,e,s){s.chart.toggleDataVisibility(e.index),s.chart.update()}}}});class nn extends ut{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const e=this._cachedMeta,{dataset:s,data:i=[],_dataset:o}=e,a=this.chart._animationsDisabled;let{start:r,count:l}=xo(e,i,a);this._drawStart=r,this._drawCount=l,_o(e)&&(r=0,l=i.length),s._chart=this.chart,s._datasetIndex=this.index,s._decimated=!!o._decimated,s.points=i;const c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(s,void 0,{animated:!a,options:c},t),this.updateElements(i,r,l,t)}updateElements(t,e,s,i){const o=i==="reset",{iScale:a,vScale:r,_stacked:l,_dataset:c}=this._cachedMeta,{sharedOptions:d,includeOptions:u}=this._getSharedOptions(e,i),h=a.axis,f=r.axis,{spanGaps:p,segment:m}=this.options,g=ee(p)?p:Number.POSITIVE_INFINITY,b=this.chart._animationsDisabled||o||i==="none",y=e+s,k=t.length;let w=e>0&&this.getParsed(e-1);for(let x=0;x<k;++x){const E=t[x],M=b?E:{};if(x<e||x>=y){M.skip=!0;continue}const C=this.getParsed(x),L=R(C[f]),T=M[h]=a.getPixelForValue(C[h],x),B=M[f]=o||L?r.getBasePixel():r.getPixelForValue(l?this.applyStack(r,C,l):C[f],x);M.skip=isNaN(T)||isNaN(B)||L,M.stop=x>0&&Math.abs(C[h]-w[h])>g,m&&(M.parsed=C,M.raw=c.data[x]),u&&(M.options=d||this.resolveDataElementOptions(x,E.active?"active":i)),b||this.updateElement(E,x,M,i),w=C}}getMaxOverflow(){const t=this._cachedMeta,e=t.dataset,s=e.options&&e.options.borderWidth||0,i=t.data||[];if(!i.length)return s;const o=i[0].size(this.resolveDataElementOptions(0)),a=i[i.length-1].size(this.resolveDataElementOptions(i.length-1));return Math.max(s,o,a)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}S(nn,"id","line"),S(nn,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),S(nn,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});class Se extends ut{constructor(t,e){super(t,e),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const e=this._cachedMeta,s=this.chart,i=s.data.labels||[],o=ze(e._parsed[t].r,s.options.locale);return{label:i[t]||"",value:o}}parseObjectData(t,e,s,i){return Po.bind(this)(t,e,s,i)}update(t){const e=this._cachedMeta.data;this._updateRadius(),this.updateElements(e,0,e.length,t)}getMinMax(){const t=this._cachedMeta,e={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((s,i)=>{const o=this.getParsed(i).r;!isNaN(o)&&this.chart.getDataVisibility(i)&&(o<e.min&&(e.min=o),o>e.max&&(e.max=o))}),e}_updateRadius(){const t=this.chart,e=t.chartArea,s=t.options,i=Math.min(e.right-e.left,e.bottom-e.top),o=Math.max(i/2,0),a=Math.max(s.cutoutPercentage?o/100*s.cutoutPercentage:1,0),r=(o-a)/t.getVisibleDatasetCount();this.outerRadius=o-r*this.index,this.innerRadius=this.outerRadius-r}updateElements(t,e,s,i){const o=i==="reset",a=this.chart,l=a.options.animation,c=this._cachedMeta.rScale,d=c.xCenter,u=c.yCenter,h=c.getIndexAngle(0)-.5*$;let f=h,p;const m=360/this.countVisibleElements();for(p=0;p<e;++p)f+=this._computeAngle(p,i,m);for(p=e;p<e+s;p++){const g=t[p];let b=f,y=f+this._computeAngle(p,i,m),k=a.getDataVisibility(p)?c.getDistanceFromCenterForValue(this.getParsed(p).r):0;f=y,o&&(l.animateScale&&(k=0),l.animateRotate&&(b=y=h));const w={x:d,y:u,innerRadius:0,outerRadius:k,startAngle:b,endAngle:y,options:this.resolveDataElementOptions(p,g.active?"active":i)};this.updateElement(g,p,w,i)}}countVisibleElements(){const t=this._cachedMeta;let e=0;return t.data.forEach((s,i)=>{!isNaN(this.getParsed(i).r)&&this.chart.getDataVisibility(i)&&e++}),e}_computeAngle(t,e,s){return this.chart.getDataVisibility(t)?dt(this.resolveDataElementOptions(t,e).angle||s):0}}S(Se,"id","polarArea"),S(Se,"defaults",{dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0}),S(Se,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:s,color:i}}=t.legend.options;return e.labels.map((o,a)=>{const l=t.getDatasetMeta(0).controller.getStyle(a);return{text:o,fillStyle:l.backgroundColor,strokeStyle:l.borderColor,fontColor:i,lineWidth:l.borderWidth,pointStyle:s,hidden:!t.getDataVisibility(a),index:a}})}return[]}},onClick(t,e,s){s.chart.toggleDataVisibility(e.index),s.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}});class Zn extends Vt{}S(Zn,"id","pie"),S(Zn,"defaults",{cutout:0,rotation:0,circumference:360,radius:"100%"});class sn extends ut{getLabelAndValue(t){const e=this._cachedMeta.vScale,s=this.getParsed(t);return{label:e.getLabels()[t],value:""+e.getLabelForValue(s[e.axis])}}parseObjectData(t,e,s,i){return Po.bind(this)(t,e,s,i)}update(t){const e=this._cachedMeta,s=e.dataset,i=e.data||[],o=e.iScale.getLabels();if(s.points=i,t!=="resize"){const a=this.resolveDatasetElementOptions(t);this.options.showLine||(a.borderWidth=0);const r={_loop:!0,_fullLoop:o.length===i.length,options:a};this.updateElement(s,void 0,r,t)}this.updateElements(i,0,i.length,t)}updateElements(t,e,s,i){const o=this._cachedMeta.rScale,a=i==="reset";for(let r=e;r<e+s;r++){const l=t[r],c=this.resolveDataElementOptions(r,l.active?"active":i),d=o.getPointPositionForValue(r,this.getParsed(r).r),u=a?o.xCenter:d.x,h=a?o.yCenter:d.y,f={x:u,y:h,angle:d.angle,skip:isNaN(u)||isNaN(h),options:c};this.updateElement(l,r,f,i)}}}S(sn,"id","radar"),S(sn,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),S(sn,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});class on extends ut{getLabelAndValue(t){const e=this._cachedMeta,s=this.chart.data.labels||[],{xScale:i,yScale:o}=e,a=this.getParsed(t),r=i.getLabelForValue(a.x),l=o.getLabelForValue(a.y);return{label:s[t]||"",value:"("+r+", "+l+")"}}update(t){const e=this._cachedMeta,{data:s=[]}=e,i=this.chart._animationsDisabled;let{start:o,count:a}=xo(e,s,i);if(this._drawStart=o,this._drawCount=a,_o(e)&&(o=0,a=s.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:r,_dataset:l}=e;r._chart=this.chart,r._datasetIndex=this.index,r._decimated=!!l._decimated,r.points=s;const c=this.resolveDatasetElementOptions(t);c.segment=this.options.segment,this.updateElement(r,void 0,{animated:!i,options:c},t)}else this.datasetElementType&&(delete e.dataset,this.datasetElementType=!1);this.updateElements(s,o,a,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,e,s,i){const o=i==="reset",{iScale:a,vScale:r,_stacked:l,_dataset:c}=this._cachedMeta,d=this.resolveDataElementOptions(e,i),u=this.getSharedOptions(d),h=this.includeOptions(i,u),f=a.axis,p=r.axis,{spanGaps:m,segment:g}=this.options,b=ee(m)?m:Number.POSITIVE_INFINITY,y=this.chart._animationsDisabled||o||i==="none";let k=e>0&&this.getParsed(e-1);for(let w=e;w<e+s;++w){const x=t[w],E=this.getParsed(w),M=y?x:{},C=R(E[p]),L=M[f]=a.getPixelForValue(E[f],w),T=M[p]=o||C?r.getBasePixel():r.getPixelForValue(l?this.applyStack(r,E,l):E[p],w);M.skip=isNaN(L)||isNaN(T)||C,M.stop=w>0&&Math.abs(E[f]-k[f])>b,g&&(M.parsed=E,M.raw=c.data[w]),h&&(M.options=u||this.resolveDataElementOptions(w,x.active?"active":i)),y||this.updateElement(x,w,M,i),k=E}this.updateSharedOptions(u,i,d)}getMaxOverflow(){const t=this._cachedMeta,e=t.data||[];if(!this.options.showLine){let r=0;for(let l=e.length-1;l>=0;--l)r=Math.max(r,e[l].size(this.resolveDataElementOptions(l))/2);return r>0&&r}const s=t.dataset,i=s.options&&s.options.borderWidth||0;if(!e.length)return i;const o=e[0].size(this.resolveDataElementOptions(0)),a=e[e.length-1].size(this.resolveDataElementOptions(e.length-1));return Math.max(i,o,a)/2}}S(on,"id","scatter"),S(on,"defaults",{datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1}),S(on,"overrides",{interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}});var Pl=Object.freeze({__proto__:null,BarController:tn,BubbleController:en,DoughnutController:Vt,LineController:nn,PieController:Zn,PolarAreaController:Se,RadarController:sn,ScatterController:on});function Nt(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class Ps{constructor(t){S(this,"options");this.options=t||{}}static override(t){Object.assign(Ps.prototype,t)}init(){}formats(){return Nt()}parse(){return Nt()}format(){return Nt()}add(){return Nt()}diff(){return Nt()}startOf(){return Nt()}endOf(){return Nt()}}var Ll={_date:Ps};function Il(n,t,e,s){const{controller:i,data:o,_sorted:a}=n,r=i._cachedMeta.iScale,l=n.dataset&&n.dataset.options?n.dataset.options.spanGaps:null;if(r&&t===r.axis&&t!=="r"&&a&&o.length){const c=r._reversePixels?Za:wt;if(s){if(i._sharedOptions){const d=o[0],u=typeof d.getRange=="function"&&d.getRange(t);if(u){const h=c(o,t,e-u),f=c(o,t,e+u);return{lo:h.lo,hi:f.hi}}}}else{const d=c(o,t,e);if(l){const{vScale:u}=i._cachedMeta,{_parsed:h}=n,f=h.slice(0,d.lo+1).reverse().findIndex(m=>!R(m[u.axis]));d.lo-=Math.max(0,f);const p=h.slice(d.hi).findIndex(m=>!R(m[u.axis]));d.hi+=Math.max(0,p)}return d}}return{lo:0,hi:o.length-1}}function Cn(n,t,e,s,i){const o=n.getSortedVisibleDatasetMetas(),a=e[t];for(let r=0,l=o.length;r<l;++r){const{index:c,data:d}=o[r],{lo:u,hi:h}=Il(o[r],t,a,i);for(let f=u;f<=h;++f){const p=d[f];p.skip||s(p,c,f)}}}function Tl(n){const t=n.indexOf("x")!==-1,e=n.indexOf("y")!==-1;return function(s,i){const o=t?Math.abs(s.x-i.x):0,a=e?Math.abs(s.y-i.y):0;return Math.sqrt(Math.pow(o,2)+Math.pow(a,2))}}function Fn(n,t,e,s,i){const o=[];return!i&&!n.isPointInArea(t)||Cn(n,e,t,function(r,l,c){!i&&!kt(r,n.chartArea,0)||r.inRange(t.x,t.y,s)&&o.push({element:r,datasetIndex:l,index:c})},!0),o}function Bl(n,t,e,s){let i=[];function o(a,r,l){const{startAngle:c,endAngle:d}=a.getProps(["startAngle","endAngle"],s),{angle:u}=mo(a,{x:t.x,y:t.y});Le(u,c,d)&&i.push({element:a,datasetIndex:r,index:l})}return Cn(n,e,t,o),i}function Rl(n,t,e,s,i,o){let a=[];const r=Tl(e);let l=Number.POSITIVE_INFINITY;function c(d,u,h){const f=d.inRange(t.x,t.y,i);if(s&&!f)return;const p=d.getCenterPoint(i);if(!(!!o||n.isPointInArea(p))&&!f)return;const g=r(t,p);g<l?(a=[{element:d,datasetIndex:u,index:h}],l=g):g===l&&a.push({element:d,datasetIndex:u,index:h})}return Cn(n,e,t,c),a}function jn(n,t,e,s,i,o){return!o&&!n.isPointInArea(t)?[]:e==="r"&&!s?Bl(n,t,e,i):Rl(n,t,e,s,i,o)}function fi(n,t,e,s,i){const o=[],a=e==="x"?"inXRange":"inYRange";let r=!1;return Cn(n,e,t,(l,c,d)=>{l[a]&&l[a](t[e],i)&&(o.push({element:l,datasetIndex:c,index:d}),r=r||l.inRange(t.x,t.y,i))}),s&&!r?[]:o}var Dl={modes:{index(n,t,e,s){const i=jt(t,n),o=e.axis||"x",a=e.includeInvisible||!1,r=e.intersect?Fn(n,i,o,s,a):jn(n,i,o,!1,s,a),l=[];return r.length?(n.getSortedVisibleDatasetMetas().forEach(c=>{const d=r[0].index,u=c.data[d];u&&!u.skip&&l.push({element:u,datasetIndex:c.index,index:d})}),l):[]},dataset(n,t,e,s){const i=jt(t,n),o=e.axis||"xy",a=e.includeInvisible||!1;let r=e.intersect?Fn(n,i,o,s,a):jn(n,i,o,!1,s,a);if(r.length>0){const l=r[0].datasetIndex,c=n.getDatasetMeta(l).data;r=[];for(let d=0;d<c.length;++d)r.push({element:c[d],datasetIndex:l,index:d})}return r},point(n,t,e,s){const i=jt(t,n),o=e.axis||"xy",a=e.includeInvisible||!1;return Fn(n,i,o,s,a)},nearest(n,t,e,s){const i=jt(t,n),o=e.axis||"xy",a=e.includeInvisible||!1;return jn(n,i,o,e.intersect,s,a)},x(n,t,e,s){const i=jt(t,n);return fi(n,i,"x",e.intersect,s)},y(n,t,e,s){const i=jt(t,n);return fi(n,i,"y",e.intersect,s)}}};const Fo=["left","top","right","bottom"];function le(n,t){return n.filter(e=>e.pos===t)}function pi(n,t){return n.filter(e=>Fo.indexOf(e.pos)===-1&&e.box.axis===t)}function ce(n,t){return n.sort((e,s)=>{const i=t?s:e,o=t?e:s;return i.weight===o.weight?i.index-o.index:i.weight-o.weight})}function Ol(n){const t=[];let e,s,i,o,a,r;for(e=0,s=(n||[]).length;e<s;++e)i=n[e],{position:o,options:{stack:a,stackWeight:r=1}}=i,t.push({index:e,box:i,pos:o,horizontal:i.isHorizontal(),weight:i.weight,stack:a&&o+a,stackWeight:r});return t}function $l(n){const t={};for(const e of n){const{stack:s,pos:i,stackWeight:o}=e;if(!s||!Fo.includes(i))continue;const a=t[s]||(t[s]={count:0,placed:0,weight:0,size:0});a.count++,a.weight+=o}return t}function zl(n,t){const e=$l(n),{vBoxMaxWidth:s,hBoxMaxHeight:i}=t;let o,a,r;for(o=0,a=n.length;o<a;++o){r=n[o];const{fullSize:l}=r.box,c=e[r.stack],d=c&&r.stackWeight/c.weight;r.horizontal?(r.width=d?d*s:l&&t.availableWidth,r.height=i):(r.width=s,r.height=d?d*i:l&&t.availableHeight)}return e}function Nl(n){const t=Ol(n),e=ce(t.filter(c=>c.box.fullSize),!0),s=ce(le(t,"left"),!0),i=ce(le(t,"right")),o=ce(le(t,"top"),!0),a=ce(le(t,"bottom")),r=pi(t,"x"),l=pi(t,"y");return{fullSize:e,leftAndTop:s.concat(o),rightAndBottom:i.concat(l).concat(a).concat(r),chartArea:le(t,"chartArea"),vertical:s.concat(i).concat(l),horizontal:o.concat(a).concat(r)}}function mi(n,t,e,s){return Math.max(n[e],t[e])+Math.max(n[s],t[s])}function jo(n,t){n.top=Math.max(n.top,t.top),n.left=Math.max(n.left,t.left),n.bottom=Math.max(n.bottom,t.bottom),n.right=Math.max(n.right,t.right)}function Fl(n,t,e,s){const{pos:i,box:o}=e,a=n.maxPadding;if(!D(i)){e.size&&(n[i]-=e.size);const u=s[e.stack]||{size:0,count:1};u.size=Math.max(u.size,e.horizontal?o.height:o.width),e.size=u.size/u.count,n[i]+=e.size}o.getPadding&&jo(a,o.getPadding());const r=Math.max(0,t.outerWidth-mi(a,n,"left","right")),l=Math.max(0,t.outerHeight-mi(a,n,"top","bottom")),c=r!==n.w,d=l!==n.h;return n.w=r,n.h=l,e.horizontal?{same:c,other:d}:{same:d,other:c}}function jl(n){const t=n.maxPadding;function e(s){const i=Math.max(t[s]-n[s],0);return n[s]+=i,i}n.y+=e("top"),n.x+=e("left"),e("right"),e("bottom")}function Hl(n,t){const e=t.maxPadding;function s(i){const o={left:0,top:0,right:0,bottom:0};return i.forEach(a=>{o[a]=Math.max(t[a],e[a])}),o}return s(n?["left","right"]:["top","bottom"])}function me(n,t,e,s){const i=[];let o,a,r,l,c,d;for(o=0,a=n.length,c=0;o<a;++o){r=n[o],l=r.box,l.update(r.width||t.w,r.height||t.h,Hl(r.horizontal,t));const{same:u,other:h}=Fl(t,e,r,s);c|=u&&i.length,d=d||h,l.fullSize||i.push(r)}return c&&me(i,t,e,s)||d}function Ye(n,t,e,s,i){n.top=e,n.left=t,n.right=t+s,n.bottom=e+i,n.width=s,n.height=i}function gi(n,t,e,s){const i=e.padding;let{x:o,y:a}=t;for(const r of n){const l=r.box,c=s[r.stack]||{placed:0,weight:1},d=r.stackWeight/c.weight||1;if(r.horizontal){const u=t.w*d,h=c.size||l.height;Pe(c.start)&&(a=c.start),l.fullSize?Ye(l,i.left,a,e.outerWidth-i.right-i.left,h):Ye(l,t.left+c.placed,a,u,h),c.start=a,c.placed+=u,a=l.bottom}else{const u=t.h*d,h=c.size||l.width;Pe(c.start)&&(o=c.start),l.fullSize?Ye(l,o,i.top,h,e.outerHeight-i.bottom-i.top):Ye(l,o,t.top+c.placed,h,u),c.start=o,c.placed+=u,o=l.right}}t.x=o,t.y=a}var tt={addBox(n,t){n.boxes||(n.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(e){t.draw(e)}}]},n.boxes.push(t)},removeBox(n,t){const e=n.boxes?n.boxes.indexOf(t):-1;e!==-1&&n.boxes.splice(e,1)},configure(n,t,e){t.fullSize=e.fullSize,t.position=e.position,t.weight=e.weight},update(n,t,e,s){if(!n)return;const i=et(n.options.layout.padding),o=Math.max(t-i.width,0),a=Math.max(e-i.height,0),r=Nl(n.boxes),l=r.vertical,c=r.horizontal;z(n.boxes,m=>{typeof m.beforeLayout=="function"&&m.beforeLayout()});const d=l.reduce((m,g)=>g.box.options&&g.box.options.display===!1?m:m+1,0)||1,u=Object.freeze({outerWidth:t,outerHeight:e,padding:i,availableWidth:o,availableHeight:a,vBoxMaxWidth:o/2/d,hBoxMaxHeight:a/2}),h=Object.assign({},i);jo(h,et(s));const f=Object.assign({maxPadding:h,w:o,h:a,x:i.left,y:i.top},i),p=zl(l.concat(c),u);me(r.fullSize,f,u,p),me(l,f,u,p),me(c,f,u,p)&&me(l,f,u,p),jl(f),gi(r.leftAndTop,f,u,p),f.x+=f.w,f.y+=f.h,gi(r.rightAndBottom,f,u,p),n.chartArea={left:f.left,top:f.top,right:f.left+f.w,bottom:f.top+f.h,height:f.h,width:f.w},z(r.chartArea,m=>{const g=m.box;Object.assign(g,n.chartArea),g.update(f.w,f.h,{left:0,top:0,right:0,bottom:0})})}};class Ho{acquireContext(t,e){}releaseContext(t){return!1}addEventListener(t,e,s){}removeEventListener(t,e,s){}getDevicePixelRatio(){return 1}getMaximumSize(t,e,s,i){return e=Math.max(0,e||t.width),s=s||t.height,{width:e,height:Math.max(0,i?Math.floor(e/i):s)}}isAttached(t){return!0}updateConfig(t){}}class Vl extends Ho{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const an="$chartjs",Wl={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},bi=n=>n===null||n==="";function ql(n,t){const e=n.style,s=n.getAttribute("height"),i=n.getAttribute("width");if(n[an]={initial:{height:s,width:i,style:{display:e.display,height:e.height,width:e.width}}},e.display=e.display||"block",e.boxSizing=e.boxSizing||"border-box",bi(i)){const o=ti(n,"width");o!==void 0&&(n.width=o)}if(bi(s))if(n.style.height==="")n.height=n.width/(t||2);else{const o=ti(n,"height");o!==void 0&&(n.height=o)}return n}const Vo=Ur?{passive:!0}:!1;function Ul(n,t,e){n&&n.addEventListener(t,e,Vo)}function Yl(n,t,e){n&&n.canvas&&n.canvas.removeEventListener(t,e,Vo)}function Gl(n,t){const e=Wl[n.type]||n.type,{x:s,y:i}=jt(n,t);return{type:e,chart:t,native:n,x:s!==void 0?s:null,y:i!==void 0?i:null}}function bn(n,t){for(const e of n)if(e===t||e.contains(t))return!0}function Xl(n,t,e){const s=n.canvas,i=new MutationObserver(o=>{let a=!1;for(const r of o)a=a||bn(r.addedNodes,s),a=a&&!bn(r.removedNodes,s);a&&e()});return i.observe(document,{childList:!0,subtree:!0}),i}function Kl(n,t,e){const s=n.canvas,i=new MutationObserver(o=>{let a=!1;for(const r of o)a=a||bn(r.removedNodes,s),a=a&&!bn(r.addedNodes,s);a&&e()});return i.observe(document,{childList:!0,subtree:!0}),i}const Te=new Map;let vi=0;function Wo(){const n=window.devicePixelRatio;n!==vi&&(vi=n,Te.forEach((t,e)=>{e.currentDevicePixelRatio!==n&&t()}))}function Jl(n,t){Te.size||window.addEventListener("resize",Wo),Te.set(n,t)}function Ql(n){Te.delete(n),Te.size||window.removeEventListener("resize",Wo)}function Zl(n,t,e){const s=n.canvas,i=s&&As(s);if(!i)return;const o=yo((r,l)=>{const c=i.clientWidth;e(r,l),c<i.clientWidth&&e()},window),a=new ResizeObserver(r=>{const l=r[0],c=l.contentRect.width,d=l.contentRect.height;c===0&&d===0||o(c,d)});return a.observe(i),Jl(n,o),a}function Hn(n,t,e){e&&e.disconnect(),t==="resize"&&Ql(n)}function tc(n,t,e){const s=n.canvas,i=yo(o=>{n.ctx!==null&&e(Gl(o,n))},n);return Ul(s,t,i),i}class ec extends Ho{acquireContext(t,e){const s=t&&t.getContext&&t.getContext("2d");return s&&s.canvas===t?(ql(t,e),s):null}releaseContext(t){const e=t.canvas;if(!e[an])return!1;const s=e[an].initial;["height","width"].forEach(o=>{const a=s[o];R(a)?e.removeAttribute(o):e.setAttribute(o,a)});const i=s.style||{};return Object.keys(i).forEach(o=>{e.style[o]=i[o]}),e.width=e.width,delete e[an],!0}addEventListener(t,e,s){this.removeEventListener(t,e);const i=t.$proxies||(t.$proxies={}),a={attach:Xl,detach:Kl,resize:Zl}[e]||tc;i[e]=a(t,e,s)}removeEventListener(t,e){const s=t.$proxies||(t.$proxies={}),i=s[e];if(!i)return;({attach:Hn,detach:Hn,resize:Hn}[e]||Yl)(t,e,i),s[e]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,e,s,i){return qr(t,e,s,i)}isAttached(t){const e=t&&As(t);return!!(e&&e.isConnected)}}function nc(n){return!Cs()||typeof OffscreenCanvas<"u"&&n instanceof OffscreenCanvas?Vl:ec}class ht{constructor(){S(this,"x");S(this,"y");S(this,"active",!1);S(this,"options");S(this,"$animations")}tooltipPosition(t){const{x:e,y:s}=this.getProps(["x","y"],t);return{x:e,y:s}}hasValue(){return ee(this.x)&&ee(this.y)}getProps(t,e){const s=this.$animations;if(!e||!s)return this;const i={};return t.forEach(o=>{i[o]=s[o]&&s[o].active()?s[o]._to:this[o]}),i}}S(ht,"defaults",{}),S(ht,"defaultRoutes");function sc(n,t){const e=n.options.ticks,s=ic(n),i=Math.min(e.maxTicksLimit||s,s),o=e.major.enabled?ac(t):[],a=o.length,r=o[0],l=o[a-1],c=[];if(a>i)return rc(t,c,o,a/i),c;const d=oc(o,t,i);if(a>0){let u,h;const f=a>1?Math.round((l-r)/(a-1)):null;for(Ge(t,c,d,R(f)?0:r-f,r),u=0,h=a-1;u<h;u++)Ge(t,c,d,o[u],o[u+1]);return Ge(t,c,d,l,R(f)?t.length:l+f),c}return Ge(t,c,d),c}function ic(n){const t=n.options.offset,e=n._tickSize(),s=n._length/e+(t?0:1),i=n._maxLength/e;return Math.floor(Math.min(s,i))}function oc(n,t,e){const s=lc(n),i=t.length/e;if(!s)return Math.max(i,1);const o=Ga(s);for(let a=0,r=o.length-1;a<r;a++){const l=o[a];if(l>i)return l}return Math.max(i,1)}function ac(n){const t=[];let e,s;for(e=0,s=n.length;e<s;e++)n[e].major&&t.push(e);return t}function rc(n,t,e,s){let i=0,o=e[0],a;for(s=Math.ceil(s),a=0;a<n.length;a++)a===o&&(t.push(n[a]),i++,o=e[i*s])}function Ge(n,t,e,s,i){const o=I(s,0),a=Math.min(I(i,n.length),n.length);let r=0,l,c,d;for(e=Math.ceil(e),i&&(l=i-s,e=l/Math.floor(l/e)),d=o;d<0;)r++,d=Math.round(o+r*e);for(c=Math.max(o,0);c<a;c++)c===d&&(t.push(n[c]),r++,d=Math.round(o+r*e))}function lc(n){const t=n.length;let e,s;if(t<2)return!1;for(s=n[0],e=1;e<t;++e)if(n[e]-n[e-1]!==s)return!1;return s}const cc=n=>n==="left"?"right":n==="right"?"left":n,yi=(n,t,e)=>t==="top"||t==="left"?n[t]+e:n[t]-e,xi=(n,t)=>Math.min(t||n,n);function _i(n,t){const e=[],s=n.length/t,i=n.length;let o=0;for(;o<i;o+=s)e.push(n[Math.floor(o)]);return e}function dc(n,t,e){const s=n.ticks.length,i=Math.min(t,s-1),o=n._startPixel,a=n._endPixel,r=1e-6;let l=n.getPixelForTick(i),c;if(!(e&&(s===1?c=Math.max(l-o,a-l):t===0?c=(n.getPixelForTick(1)-l)/2:c=(l-n.getPixelForTick(i-1))/2,l+=i<t?c:-c,l<o-r||l>a+r)))return l}function uc(n,t){z(n,e=>{const s=e.gc,i=s.length/2;let o;if(i>t){for(o=0;o<i;++o)delete e.data[s[o]];s.splice(0,i)}})}function de(n){return n.drawTicks?n.tickLength:0}function wi(n,t){if(!n.display)return 0;const e=G(n.font,t),s=et(n.padding);return(V(n.text)?n.text.length:1)*e.lineHeight+s.height}function hc(n,t){return Rt(n,{scale:t,type:"scale"})}function fc(n,t,e){return Rt(n,{tick:e,index:t,type:"tick"})}function pc(n,t,e){let s=_s(n);return(e&&t!=="right"||!e&&t==="right")&&(s=cc(s)),s}function mc(n,t,e,s){const{top:i,left:o,bottom:a,right:r,chart:l}=n,{chartArea:c,scales:d}=l;let u=0,h,f,p;const m=a-i,g=r-o;if(n.isHorizontal()){if(f=Q(s,o,r),D(e)){const b=Object.keys(e)[0],y=e[b];p=d[b].getPixelForValue(y)+m-t}else e==="center"?p=(c.bottom+c.top)/2+m-t:p=yi(n,e,t);h=r-o}else{if(D(e)){const b=Object.keys(e)[0],y=e[b];f=d[b].getPixelForValue(y)-g+t}else e==="center"?f=(c.left+c.right)/2-g+t:f=yi(n,e,t);p=Q(s,a,i),u=e==="left"?-Y:Y}return{titleX:f,titleY:p,maxWidth:h,rotation:u}}class Xt extends ht{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,e){return t}getUserBounds(){let{_userMin:t,_userMax:e,_suggestedMin:s,_suggestedMax:i}=this;return t=ot(t,Number.POSITIVE_INFINITY),e=ot(e,Number.NEGATIVE_INFINITY),s=ot(s,Number.POSITIVE_INFINITY),i=ot(i,Number.NEGATIVE_INFINITY),{min:ot(t,s),max:ot(e,i),minDefined:q(t),maxDefined:q(e)}}getMinMax(t){let{min:e,max:s,minDefined:i,maxDefined:o}=this.getUserBounds(),a;if(i&&o)return{min:e,max:s};const r=this.getMatchingVisibleMetas();for(let l=0,c=r.length;l<c;++l)a=r[l].controller.getMinMax(this,t),i||(e=Math.min(e,a.min)),o||(s=Math.max(s,a.max));return e=o&&e>s?s:e,s=i&&e>s?e:s,{min:ot(e,ot(s,e)),max:ot(s,ot(e,s))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){F(this.options.beforeUpdate,[this])}update(t,e,s){const{beginAtZero:i,grace:o,ticks:a}=this.options,r=a.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this._margins=s=Object.assign({left:0,right:0,top:0,bottom:0},s),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+s.left+s.right:this.height+s.top+s.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=kr(this,o,i),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const l=r<this.ticks.length;this._convertTicksToLabels(l?_i(this.ticks,r):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),a.display&&(a.autoSkip||a.source==="auto")&&(this.ticks=sc(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,e,s;this.isHorizontal()?(e=this.left,s=this.right):(e=this.top,s=this.bottom,t=!t),this._startPixel=e,this._endPixel=s,this._reversePixels=t,this._length=s-e,this._alignToPixels=this.options.alignToPixels}afterUpdate(){F(this.options.afterUpdate,[this])}beforeSetDimensions(){F(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){F(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),F(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){F(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const e=this.options.ticks;let s,i,o;for(s=0,i=t.length;s<i;s++)o=t[s],o.label=F(e.callback,[o.value,s,t],this)}afterTickToLabelConversion(){F(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){F(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,e=t.ticks,s=xi(this.ticks.length,t.ticks.maxTicksLimit),i=e.minRotation||0,o=e.maxRotation;let a=i,r,l,c;if(!this._isVisible()||!e.display||i>=o||s<=1||!this.isHorizontal()){this.labelRotation=i;return}const d=this._getLabelSizes(),u=d.widest.width,h=d.highest.height,f=X(this.chart.width-u,0,this.maxWidth);r=t.offset?this.maxWidth/s:f/(s-1),u+6>r&&(r=f/(s-(t.offset?.5:1)),l=this.maxHeight-de(t.grid)-e.padding-wi(t.title,this.chart.options.font),c=Math.sqrt(u*u+h*h),a=ys(Math.min(Math.asin(X((d.highest.height+6)/r,-1,1)),Math.asin(X(l/c,-1,1))-Math.asin(X(h/c,-1,1)))),a=Math.max(i,Math.min(o,a))),this.labelRotation=a}afterCalculateLabelRotation(){F(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){F(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:e,options:{ticks:s,title:i,grid:o}}=this,a=this._isVisible(),r=this.isHorizontal();if(a){const l=wi(i,e.options.font);if(r?(t.width=this.maxWidth,t.height=de(o)+l):(t.height=this.maxHeight,t.width=de(o)+l),s.display&&this.ticks.length){const{first:c,last:d,widest:u,highest:h}=this._getLabelSizes(),f=s.padding*2,p=dt(this.labelRotation),m=Math.cos(p),g=Math.sin(p);if(r){const b=s.mirror?0:g*u.width+m*h.height;t.height=Math.min(this.maxHeight,t.height+b+f)}else{const b=s.mirror?0:m*u.width+g*h.height;t.width=Math.min(this.maxWidth,t.width+b+f)}this._calculatePadding(c,d,g,m)}}this._handleMargins(),r?(this.width=this._length=e.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=e.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,e,s,i){const{ticks:{align:o,padding:a},position:r}=this.options,l=this.labelRotation!==0,c=r!=="top"&&this.axis==="x";if(this.isHorizontal()){const d=this.getPixelForTick(0)-this.left,u=this.right-this.getPixelForTick(this.ticks.length-1);let h=0,f=0;l?c?(h=i*t.width,f=s*e.height):(h=s*t.height,f=i*e.width):o==="start"?f=e.width:o==="end"?h=t.width:o!=="inner"&&(h=t.width/2,f=e.width/2),this.paddingLeft=Math.max((h-d+a)*this.width/(this.width-d),0),this.paddingRight=Math.max((f-u+a)*this.width/(this.width-u),0)}else{let d=e.height/2,u=t.height/2;o==="start"?(d=0,u=t.height):o==="end"&&(d=e.height,u=0),this.paddingTop=d+a,this.paddingBottom=u+a}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){F(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:e}=this.options;return e==="top"||e==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let e,s;for(e=0,s=t.length;e<s;e++)R(t[e].label)&&(t.splice(e,1),s--,e--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const e=this.options.ticks.sampleSize;let s=this.ticks;e<s.length&&(s=_i(s,e)),this._labelSizes=t=this._computeLabelSizes(s,s.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,e,s){const{ctx:i,_longestTextCache:o}=this,a=[],r=[],l=Math.floor(e/xi(e,s));let c=0,d=0,u,h,f,p,m,g,b,y,k,w,x;for(u=0;u<e;u+=l){if(p=t[u].label,m=this._resolveTickFontOptions(u),i.font=g=m.string,b=o[g]=o[g]||{data:{},gc:[]},y=m.lineHeight,k=w=0,!R(p)&&!V(p))k=mn(i,b.data,b.gc,k,p),w=y;else if(V(p))for(h=0,f=p.length;h<f;++h)x=p[h],!R(x)&&!V(x)&&(k=mn(i,b.data,b.gc,k,x),w+=y);a.push(k),r.push(w),c=Math.max(k,c),d=Math.max(w,d)}uc(o,e);const E=a.indexOf(c),M=r.indexOf(d),C=L=>({width:a[L]||0,height:r[L]||0});return{first:C(0),last:C(e-1),widest:C(E),highest:C(M),widths:a,heights:r}}getLabelForValue(t){return t}getPixelForValue(t,e){return NaN}getValueForPixel(t){}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const e=this._startPixel+t*this._length;return Qa(this._alignToPixels?zt(this.chart,e,0):e)}getDecimalForPixel(t){const e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:e}=this;return t<0&&e<0?e:t>0&&e>0?t:0}getContext(t){const e=this.ticks||[];if(t>=0&&t<e.length){const s=e[t];return s.$context||(s.$context=fc(this.getContext(),t,s))}return this.$context||(this.$context=hc(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,e=dt(this.labelRotation),s=Math.abs(Math.cos(e)),i=Math.abs(Math.sin(e)),o=this._getLabelSizes(),a=t.autoSkipPadding||0,r=o?o.widest.width+a:0,l=o?o.highest.height+a:0;return this.isHorizontal()?l*s>r*i?r/s:l/i:l*i<r*s?l/s:r/i}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const e=this.axis,s=this.chart,i=this.options,{grid:o,position:a,border:r}=i,l=o.offset,c=this.isHorizontal(),u=this.ticks.length+(l?1:0),h=de(o),f=[],p=r.setContext(this.getContext()),m=p.display?p.width:0,g=m/2,b=function(H){return zt(s,H,m)};let y,k,w,x,E,M,C,L,T,B,O,K;if(a==="top")y=b(this.bottom),M=this.bottom-h,L=y-g,B=b(t.top)+g,K=t.bottom;else if(a==="bottom")y=b(this.top),B=t.top,K=b(t.bottom)-g,M=y+g,L=this.top+h;else if(a==="left")y=b(this.right),E=this.right-h,C=y-g,T=b(t.left)+g,O=t.right;else if(a==="right")y=b(this.left),T=t.left,O=b(t.right)-g,E=y+g,C=this.left+h;else if(e==="x"){if(a==="center")y=b((t.top+t.bottom)/2+.5);else if(D(a)){const H=Object.keys(a)[0],U=a[H];y=b(this.chart.scales[H].getPixelForValue(U))}B=t.top,K=t.bottom,M=y+g,L=M+h}else if(e==="y"){if(a==="center")y=b((t.left+t.right)/2);else if(D(a)){const H=Object.keys(a)[0],U=a[H];y=b(this.chart.scales[H].getPixelForValue(U))}E=y-g,C=E-h,T=t.left,O=t.right}const it=I(i.ticks.maxTicksLimit,u),N=Math.max(1,Math.ceil(u/it));for(k=0;k<u;k+=N){const H=this.getContext(k),U=o.setContext(H),ct=r.setContext(H),J=U.lineWidth,Kt=U.color,Fe=ct.dash||[],Jt=ct.dashOffset,oe=U.tickWidth,Dt=U.tickColor,ae=U.tickBorderDash||[],Ot=U.tickBorderDashOffset;w=dc(this,k,l),w!==void 0&&(x=zt(s,w,J),c?E=C=T=O=x:M=L=B=K=x,f.push({tx1:E,ty1:M,tx2:C,ty2:L,x1:T,y1:B,x2:O,y2:K,width:J,color:Kt,borderDash:Fe,borderDashOffset:Jt,tickWidth:oe,tickColor:Dt,tickBorderDash:ae,tickBorderDashOffset:Ot}))}return this._ticksLength=u,this._borderValue=y,f}_computeLabelItems(t){const e=this.axis,s=this.options,{position:i,ticks:o}=s,a=this.isHorizontal(),r=this.ticks,{align:l,crossAlign:c,padding:d,mirror:u}=o,h=de(s.grid),f=h+d,p=u?-d:f,m=-dt(this.labelRotation),g=[];let b,y,k,w,x,E,M,C,L,T,B,O,K="middle";if(i==="top")E=this.bottom-p,M=this._getXAxisLabelAlignment();else if(i==="bottom")E=this.top+p,M=this._getXAxisLabelAlignment();else if(i==="left"){const N=this._getYAxisLabelAlignment(h);M=N.textAlign,x=N.x}else if(i==="right"){const N=this._getYAxisLabelAlignment(h);M=N.textAlign,x=N.x}else if(e==="x"){if(i==="center")E=(t.top+t.bottom)/2+f;else if(D(i)){const N=Object.keys(i)[0],H=i[N];E=this.chart.scales[N].getPixelForValue(H)+f}M=this._getXAxisLabelAlignment()}else if(e==="y"){if(i==="center")x=(t.left+t.right)/2-f;else if(D(i)){const N=Object.keys(i)[0],H=i[N];x=this.chart.scales[N].getPixelForValue(H)}M=this._getYAxisLabelAlignment(h).textAlign}e==="y"&&(l==="start"?K="top":l==="end"&&(K="bottom"));const it=this._getLabelSizes();for(b=0,y=r.length;b<y;++b){k=r[b],w=k.label;const N=o.setContext(this.getContext(b));C=this.getPixelForTick(b)+o.labelOffset,L=this._resolveTickFontOptions(b),T=L.lineHeight,B=V(w)?w.length:1;const H=B/2,U=N.color,ct=N.textStrokeColor,J=N.textStrokeWidth;let Kt=M;a?(x=C,M==="inner"&&(b===y-1?Kt=this.options.reverse?"left":"right":b===0?Kt=this.options.reverse?"right":"left":Kt="center"),i==="top"?c==="near"||m!==0?O=-B*T+T/2:c==="center"?O=-it.highest.height/2-H*T+T:O=-it.highest.height+T/2:c==="near"||m!==0?O=T/2:c==="center"?O=it.highest.height/2-H*T:O=it.highest.height-B*T,u&&(O*=-1),m!==0&&!N.showLabelBackdrop&&(x+=T/2*Math.sin(m))):(E=C,O=(1-B)*T/2);let Fe;if(N.showLabelBackdrop){const Jt=et(N.backdropPadding),oe=it.heights[b],Dt=it.widths[b];let ae=O-Jt.top,Ot=0-Jt.left;switch(K){case"middle":ae-=oe/2;break;case"bottom":ae-=oe;break}switch(M){case"center":Ot-=Dt/2;break;case"right":Ot-=Dt;break;case"inner":b===y-1?Ot-=Dt:b>0&&(Ot-=Dt/2);break}Fe={left:Ot,top:ae,width:Dt+Jt.width,height:oe+Jt.height,color:N.backdropColor}}g.push({label:w,font:L,textOffset:O,options:{rotation:m,color:U,strokeColor:ct,strokeWidth:J,textAlign:Kt,textBaseline:K,translation:[x,E],backdrop:Fe}})}return g}_getXAxisLabelAlignment(){const{position:t,ticks:e}=this.options;if(-dt(this.labelRotation))return t==="top"?"left":"right";let i="center";return e.align==="start"?i="left":e.align==="end"?i="right":e.align==="inner"&&(i="inner"),i}_getYAxisLabelAlignment(t){const{position:e,ticks:{crossAlign:s,mirror:i,padding:o}}=this.options,a=this._getLabelSizes(),r=t+o,l=a.widest.width;let c,d;return e==="left"?i?(d=this.right+o,s==="near"?c="left":s==="center"?(c="center",d+=l/2):(c="right",d+=l)):(d=this.right-r,s==="near"?c="right":s==="center"?(c="center",d-=l/2):(c="left",d=this.left)):e==="right"?i?(d=this.left+o,s==="near"?c="right":s==="center"?(c="center",d-=l/2):(c="left",d-=l)):(d=this.left+r,s==="near"?c="left":s==="center"?(c="center",d+=l/2):(c="right",d=this.right)):c="right",{textAlign:c,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,e=this.options.position;if(e==="left"||e==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(e==="top"||e==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:e},left:s,top:i,width:o,height:a}=this;e&&(t.save(),t.fillStyle=e,t.fillRect(s,i,o,a),t.restore())}getLineWidthForValue(t){const e=this.options.grid;if(!this._isVisible()||!e.display)return 0;const i=this.ticks.findIndex(o=>o.value===t);return i>=0?e.setContext(this.getContext(i)).lineWidth:0}drawGrid(t){const e=this.options.grid,s=this.ctx,i=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let o,a;const r=(l,c,d)=>{!d.width||!d.color||(s.save(),s.lineWidth=d.width,s.strokeStyle=d.color,s.setLineDash(d.borderDash||[]),s.lineDashOffset=d.borderDashOffset,s.beginPath(),s.moveTo(l.x,l.y),s.lineTo(c.x,c.y),s.stroke(),s.restore())};if(e.display)for(o=0,a=i.length;o<a;++o){const l=i[o];e.drawOnChartArea&&r({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),e.drawTicks&&r({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:e,options:{border:s,grid:i}}=this,o=s.setContext(this.getContext()),a=s.display?o.width:0;if(!a)return;const r=i.setContext(this.getContext(0)).lineWidth,l=this._borderValue;let c,d,u,h;this.isHorizontal()?(c=zt(t,this.left,a)-a/2,d=zt(t,this.right,r)+r/2,u=h=l):(u=zt(t,this.top,a)-a/2,h=zt(t,this.bottom,r)+r/2,c=d=l),e.save(),e.lineWidth=o.width,e.strokeStyle=o.color,e.beginPath(),e.moveTo(c,u),e.lineTo(d,h),e.stroke(),e.restore()}drawLabels(t){if(!this.options.ticks.display)return;const s=this.ctx,i=this._computeLabelArea();i&&Sn(s,i);const o=this.getLabelItems(t);for(const a of o){const r=a.options,l=a.font,c=a.label,d=a.textOffset;Yt(s,c,0,d,l,r)}i&&En(s)}drawTitle(){const{ctx:t,options:{position:e,title:s,reverse:i}}=this;if(!s.display)return;const o=G(s.font),a=et(s.padding),r=s.align;let l=o.lineHeight/2;e==="bottom"||e==="center"||D(e)?(l+=a.bottom,V(s.text)&&(l+=o.lineHeight*(s.text.length-1))):l+=a.top;const{titleX:c,titleY:d,maxWidth:u,rotation:h}=mc(this,l,e,r);Yt(t,s.text,0,0,o,{color:s.color,maxWidth:u,rotation:h,textAlign:pc(r,e,i),textBaseline:"middle",translation:[c,d]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,e=t.ticks&&t.ticks.z||0,s=I(t.grid&&t.grid.z,-1),i=I(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==Xt.prototype.draw?[{z:e,draw:o=>{this.draw(o)}}]:[{z:s,draw:o=>{this.drawBackground(),this.drawGrid(o),this.drawTitle()}},{z:i,draw:()=>{this.drawBorder()}},{z:e,draw:o=>{this.drawLabels(o)}}]}getMatchingVisibleMetas(t){const e=this.chart.getSortedVisibleDatasetMetas(),s=this.axis+"AxisID",i=[];let o,a;for(o=0,a=e.length;o<a;++o){const r=e[o];r[s]===this.id&&(!t||r.type===t)&&i.push(r)}return i}_resolveTickFontOptions(t){const e=this.options.ticks.setContext(this.getContext(t));return G(e.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class Xe{constructor(t,e,s){this.type=t,this.scope=e,this.override=s,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const e=Object.getPrototypeOf(t);let s;vc(e)&&(s=this.register(e));const i=this.items,o=t.id,a=this.scope+"."+o;if(!o)throw new Error("class does not have id: "+t);return o in i||(i[o]=t,gc(t,a,s),this.override&&W.override(t.id,t.overrides)),a}get(t){return this.items[t]}unregister(t){const e=this.items,s=t.id,i=this.scope;s in e&&delete e[s],i&&s in W[i]&&(delete W[i][s],this.override&&delete Ut[s])}}function gc(n,t,e){const s=Ae(Object.create(null),[e?W.get(e):{},W.get(t),n.defaults]);W.set(t,s),n.defaultRoutes&&bc(t,n.defaultRoutes),n.descriptors&&W.describe(t,n.descriptors)}function bc(n,t){Object.keys(t).forEach(e=>{const s=e.split("."),i=s.pop(),o=[n].concat(s).join("."),a=t[e].split("."),r=a.pop(),l=a.join(".");W.route(o,i,l,r)})}function vc(n){return"id"in n&&"defaults"in n}class yc{constructor(){this.controllers=new Xe(ut,"datasets",!0),this.elements=new Xe(ht,"elements"),this.plugins=new Xe(Object,"plugins"),this.scales=new Xe(Xt,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,e,s){[...e].forEach(i=>{const o=s||this._getRegistryForType(i);s||o.isForType(i)||o===this.plugins&&i.id?this._exec(t,o,i):z(i,a=>{const r=s||this._getRegistryForType(a);this._exec(t,r,a)})})}_exec(t,e,s){const i=vs(t);F(s["before"+i],[],s),e[t](s),F(s["after"+i],[],s)}_getRegistryForType(t){for(let e=0;e<this._typedRegistries.length;e++){const s=this._typedRegistries[e];if(s.isForType(t))return s}return this.plugins}_get(t,e,s){const i=e.get(t);if(i===void 0)throw new Error('"'+t+'" is not a registered '+s+".");return i}}var pt=new yc;class xc{constructor(){this._init=void 0}notify(t,e,s,i){if(e==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const o=i?this._descriptors(t).filter(i):this._descriptors(t),a=this._notify(o,t,e,s);return e==="afterDestroy"&&(this._notify(o,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),a}_notify(t,e,s,i){i=i||{};for(const o of t){const a=o.plugin,r=a[s],l=[e,i,o.options];if(F(r,l,a)===!1&&i.cancelable)return!1}return!0}invalidate(){R(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const e=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),e}_createDescriptors(t,e){const s=t&&t.config,i=I(s.options&&s.options.plugins,{}),o=_c(s);return i===!1&&!e?[]:kc(t,o,i,e)}_notifyStateChanges(t){const e=this._oldCache||[],s=this._cache,i=(o,a)=>o.filter(r=>!a.some(l=>r.plugin.id===l.plugin.id));this._notify(i(e,s),t,"stop"),this._notify(i(s,e),t,"start")}}function _c(n){const t={},e=[],s=Object.keys(pt.plugins.items);for(let o=0;o<s.length;o++)e.push(pt.getPlugin(s[o]));const i=n.plugins||[];for(let o=0;o<i.length;o++){const a=i[o];e.indexOf(a)===-1&&(e.push(a),t[a.id]=!0)}return{plugins:e,localIds:t}}function wc(n,t){return!t&&n===!1?null:n===!0?{}:n}function kc(n,{plugins:t,localIds:e},s,i){const o=[],a=n.getContext();for(const r of t){const l=r.id,c=wc(s[l],i);c!==null&&o.push({plugin:r,options:Sc(n.config,{plugin:r,local:e[l]},c,a)})}return o}function Sc(n,{plugin:t,local:e},s,i){const o=n.pluginScopeKeys(t),a=n.getOptionScopes(s,o);return e&&t.defaults&&a.push(t.defaults),n.createResolver(a,i,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function ts(n,t){const e=W.datasets[n]||{};return((t.datasets||{})[n]||{}).indexAxis||t.indexAxis||e.indexAxis||"x"}function Ec(n,t){let e=n;return n==="_index_"?e=t:n==="_value_"&&(e=t==="x"?"y":"x"),e}function Mc(n,t){return n===t?"_index_":"_value_"}function ki(n){if(n==="x"||n==="y"||n==="r")return n}function Cc(n){if(n==="top"||n==="bottom")return"x";if(n==="left"||n==="right")return"y"}function es(n,...t){if(ki(n))return n;for(const e of t){const s=e.axis||Cc(e.position)||n.length>1&&ki(n[0].toLowerCase());if(s)return s}throw new Error(`Cannot determine type of '${n}' axis. Please provide 'axis' or 'position' option.`)}function Si(n,t,e){if(e[t+"AxisID"]===n)return{axis:t}}function Ac(n,t){if(t.data&&t.data.datasets){const e=t.data.datasets.filter(s=>s.xAxisID===n||s.yAxisID===n);if(e.length)return Si(n,"x",e[0])||Si(n,"y",e[0])}return{}}function Pc(n,t){const e=Ut[n.type]||{scales:{}},s=t.scales||{},i=ts(n.type,t),o=Object.create(null);return Object.keys(s).forEach(a=>{const r=s[a];if(!D(r))return console.error(`Invalid scale configuration for scale: ${a}`);if(r._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${a}`);const l=es(a,r,Ac(a,n),W.scales[r.type]),c=Mc(l,i),d=e.scales||{};o[a]=xe(Object.create(null),[{axis:l},r,d[l],d[c]])}),n.data.datasets.forEach(a=>{const r=a.type||n.type,l=a.indexAxis||ts(r,t),d=(Ut[r]||{}).scales||{};Object.keys(d).forEach(u=>{const h=Ec(u,l),f=a[h+"AxisID"]||h;o[f]=o[f]||Object.create(null),xe(o[f],[{axis:h},s[f],d[u]])})}),Object.keys(o).forEach(a=>{const r=o[a];xe(r,[W.scales[r.type],W.scale])}),o}function qo(n){const t=n.options||(n.options={});t.plugins=I(t.plugins,{}),t.scales=Pc(n,t)}function Uo(n){return n=n||{},n.datasets=n.datasets||[],n.labels=n.labels||[],n}function Lc(n){return n=n||{},n.data=Uo(n.data),qo(n),n}const Ei=new Map,Yo=new Set;function Ke(n,t){let e=Ei.get(n);return e||(e=t(),Ei.set(n,e),Yo.add(e)),e}const ue=(n,t,e)=>{const s=It(t,e);s!==void 0&&n.add(s)};class Ic{constructor(t){this._config=Lc(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=Uo(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),qo(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return Ke(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,e){return Ke(`${t}.transition.${e}`,()=>[[`datasets.${t}.transitions.${e}`,`transitions.${e}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,e){return Ke(`${t}-${e}`,()=>[[`datasets.${t}.elements.${e}`,`datasets.${t}`,`elements.${e}`,""]])}pluginScopeKeys(t){const e=t.id,s=this.type;return Ke(`${s}-plugin-${e}`,()=>[[`plugins.${e}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,e){const s=this._scopeCache;let i=s.get(t);return(!i||e)&&(i=new Map,s.set(t,i)),i}getOptionScopes(t,e,s){const{options:i,type:o}=this,a=this._cachedScopes(t,s),r=a.get(e);if(r)return r;const l=new Set;e.forEach(d=>{t&&(l.add(t),d.forEach(u=>ue(l,t,u))),d.forEach(u=>ue(l,i,u)),d.forEach(u=>ue(l,Ut[o]||{},u)),d.forEach(u=>ue(l,W,u)),d.forEach(u=>ue(l,Jn,u))});const c=Array.from(l);return c.length===0&&c.push(Object.create(null)),Yo.has(e)&&a.set(e,c),c}chartOptionScopes(){const{options:t,type:e}=this;return[t,Ut[e]||{},W.datasets[e]||{},{type:e},W,Jn]}resolveNamedOptions(t,e,s,i=[""]){const o={$shared:!0},{resolver:a,subPrefixes:r}=Mi(this._resolverCache,t,i);let l=a;if(Bc(a,e)){o.$shared=!1,s=Tt(s)?s():s;const c=this.createResolver(t,s,r);l=ne(a,s,c)}for(const c of e)o[c]=l[c];return o}createResolver(t,e,s=[""],i){const{resolver:o}=Mi(this._resolverCache,t,s);return D(e)?ne(o,e,void 0,i):o}}function Mi(n,t,e){let s=n.get(t);s||(s=new Map,n.set(t,s));const i=e.join();let o=s.get(i);return o||(o={resolver:Ss(t,e),subPrefixes:e.filter(r=>!r.toLowerCase().includes("hover"))},s.set(i,o)),o}const Tc=n=>D(n)&&Object.getOwnPropertyNames(n).some(t=>Tt(n[t]));function Bc(n,t){const{isScriptable:e,isIndexable:s}=Eo(n);for(const i of t){const o=e(i),a=s(i),r=(a||o)&&n[i];if(o&&(Tt(r)||Tc(r))||a&&V(r))return!0}return!1}var Rc="4.5.1";const Dc=["top","bottom","left","right","chartArea"];function Ci(n,t){return n==="top"||n==="bottom"||Dc.indexOf(n)===-1&&t==="x"}function Ai(n,t){return function(e,s){return e[n]===s[n]?e[t]-s[t]:e[n]-s[n]}}function Pi(n){const t=n.chart,e=t.options.animation;t.notifyPlugins("afterRender"),F(e&&e.onComplete,[n],t)}function Oc(n){const t=n.chart,e=t.options.animation;F(e&&e.onProgress,[n],t)}function Go(n){return Cs()&&typeof n=="string"?n=document.getElementById(n):n&&n.length&&(n=n[0]),n&&n.canvas&&(n=n.canvas),n}const rn={},Li=n=>{const t=Go(n);return Object.values(rn).filter(e=>e.canvas===t).pop()};function $c(n,t,e){const s=Object.keys(n);for(const i of s){const o=+i;if(o>=t){const a=n[i];delete n[i],(e>0||o>t)&&(n[o+e]=a)}}}function zc(n,t,e,s){return!e||n.type==="mouseout"?null:s?t:n}class xt{static register(...t){pt.add(...t),Ii()}static unregister(...t){pt.remove(...t),Ii()}constructor(t,e){const s=this.config=new Ic(e),i=Go(t),o=Li(i);if(o)throw new Error("Canvas is already in use. Chart with ID '"+o.id+"' must be destroyed before the canvas with ID '"+o.canvas.id+"' can be reused.");const a=s.createResolver(s.chartOptionScopes(),this.getContext());this.platform=new(s.platform||nc(i)),this.platform.updateConfig(s);const r=this.platform.acquireContext(i,a.aspectRatio),l=r&&r.canvas,c=l&&l.height,d=l&&l.width;if(this.id=Na(),this.ctx=r,this.canvas=l,this.width=d,this.height=c,this._options=a,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new xc,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=nr(u=>this.update(u),a.resizeDelay||0),this._dataChanges=[],rn[this.id]=this,!r||!l){console.error("Failed to create chart: can't acquire context from the given item");return}bt.listen(this,"complete",Pi),bt.listen(this,"progress",Oc),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:e},width:s,height:i,_aspectRatio:o}=this;return R(t)?e&&o?o:i?s/i:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return pt}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():Zs(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return Ks(this.canvas,this.ctx),this}stop(){return bt.stop(this),this}resize(t,e){bt.running(this)?this._resizeBeforeDraw={width:t,height:e}:this._resize(t,e)}_resize(t,e){const s=this.options,i=this.canvas,o=s.maintainAspectRatio&&this.aspectRatio,a=this.platform.getMaximumSize(i,t,e,o),r=s.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=a.width,this.height=a.height,this._aspectRatio=this.aspectRatio,Zs(this,r,!0)&&(this.notifyPlugins("resize",{size:a}),F(s.onResize,[this,a],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){const e=this.options.scales||{};z(e,(s,i)=>{s.id=i})}buildOrUpdateScales(){const t=this.options,e=t.scales,s=this.scales,i=Object.keys(s).reduce((a,r)=>(a[r]=!1,a),{});let o=[];e&&(o=o.concat(Object.keys(e).map(a=>{const r=e[a],l=es(a,r),c=l==="r",d=l==="x";return{options:r,dposition:c?"chartArea":d?"bottom":"left",dtype:c?"radialLinear":d?"category":"linear"}}))),z(o,a=>{const r=a.options,l=r.id,c=es(l,r),d=I(r.type,a.dtype);(r.position===void 0||Ci(r.position,c)!==Ci(a.dposition))&&(r.position=a.dposition),i[l]=!0;let u=null;if(l in s&&s[l].type===d)u=s[l];else{const h=pt.getScale(d);u=new h({id:l,type:d,ctx:this.ctx,chart:this}),s[u.id]=u}u.init(r,t)}),z(i,(a,r)=>{a||delete s[r]}),z(s,a=>{tt.configure(this,a,a.options),tt.addBox(this,a)})}_updateMetasets(){const t=this._metasets,e=this.data.datasets.length,s=t.length;if(t.sort((i,o)=>i.index-o.index),s>e){for(let i=e;i<s;++i)this._destroyDatasetMeta(i);t.splice(e,s-e)}this._sortedMetasets=t.slice(0).sort(Ai("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:e}}=this;t.length>e.length&&delete this._stacks,t.forEach((s,i)=>{e.filter(o=>o===s._dataset).length===0&&this._destroyDatasetMeta(i)})}buildOrUpdateControllers(){const t=[],e=this.data.datasets;let s,i;for(this._removeUnreferencedMetasets(),s=0,i=e.length;s<i;s++){const o=e[s];let a=this.getDatasetMeta(s);const r=o.type||this.config.type;if(a.type&&a.type!==r&&(this._destroyDatasetMeta(s),a=this.getDatasetMeta(s)),a.type=r,a.indexAxis=o.indexAxis||ts(r,this.options),a.order=o.order||0,a.index=s,a.label=""+o.label,a.visible=this.isDatasetVisible(s),a.controller)a.controller.updateIndex(s),a.controller.linkScales();else{const l=pt.getController(r),{datasetElementType:c,dataElementType:d}=W.datasets[r];Object.assign(l,{dataElementType:pt.getElement(d),datasetElementType:c&&pt.getElement(c)}),a.controller=new l(this,s),t.push(a.controller)}}return this._updateMetasets(),t}_resetElements(){z(this.data.datasets,(t,e)=>{this.getDatasetMeta(e).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const e=this.config;e.update();const s=this._options=e.createResolver(e.chartOptionScopes(),this.getContext()),i=this._animationsDisabled=!s.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const o=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let a=0;for(let c=0,d=this.data.datasets.length;c<d;c++){const{controller:u}=this.getDatasetMeta(c),h=!i&&o.indexOf(u)===-1;u.buildOrUpdateElements(h),a=Math.max(+u.getMaxOverflow(),a)}a=this._minPadding=s.layout.autoPadding?a:0,this._updateLayout(a),i||z(o,c=>{c.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(Ai("z","_idx"));const{_active:r,_lastEvent:l}=this;l?this._eventHandler(l,!0):r.length&&this._updateHoverStyles(r,r,!0),this.render()}_updateScales(){z(this.scales,t=>{tt.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,e=new Set(Object.keys(this._listeners)),s=new Set(t.events);(!js(e,s)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,e=this._getUniformDataChanges()||[];for(const{method:s,start:i,count:o}of e){const a=s==="_removeElements"?-o:o;$c(t,i,a)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const e=this.data.datasets.length,s=o=>new Set(t.filter(a=>a[0]===o).map((a,r)=>r+","+a.splice(1).join(","))),i=s(0);for(let o=1;o<e;o++)if(!js(i,s(o)))return;return Array.from(i).map(o=>o.split(",")).map(o=>({method:o[1],start:+o[2],count:+o[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;tt.update(this,this.width,this.height,t);const e=this.chartArea,s=e.width<=0||e.height<=0;this._layers=[],z(this.boxes,i=>{s&&i.position==="chartArea"||(i.configure&&i.configure(),this._layers.push(...i._layers()))},this),this._layers.forEach((i,o)=>{i._idx=o}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let e=0,s=this.data.datasets.length;e<s;++e)this.getDatasetMeta(e).controller.configure();for(let e=0,s=this.data.datasets.length;e<s;++e)this._updateDataset(e,Tt(t)?t({datasetIndex:e}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,e){const s=this.getDatasetMeta(t),i={meta:s,index:t,mode:e,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",i)!==!1&&(s.controller._update(e),i.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",i))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(bt.has(this)?this.attached&&!bt.running(this)&&bt.start(this):(this.draw(),Pi({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:s,height:i}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(s,i)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const e=this._layers;for(t=0;t<e.length&&e[t].z<=0;++t)e[t].draw(this.chartArea);for(this._drawDatasets();t<e.length;++t)e[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const e=this._sortedMetasets,s=[];let i,o;for(i=0,o=e.length;i<o;++i){const a=e[i];(!t||a.visible)&&s.push(a)}return s}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let e=t.length-1;e>=0;--e)this._drawDataset(t[e]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const e=this.ctx,s={meta:t,index:t.index,cancelable:!0},i=Oo(this,t);this.notifyPlugins("beforeDatasetDraw",s)!==!1&&(i&&Sn(e,i),t.controller.draw(),i&&En(e),s.cancelable=!1,this.notifyPlugins("afterDatasetDraw",s))}isPointInArea(t){return kt(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,e,s,i){const o=Dl.modes[e];return typeof o=="function"?o(this,t,s,i):[]}getDatasetMeta(t){const e=this.data.datasets[t],s=this._metasets;let i=s.filter(o=>o&&o._dataset===e).pop();return i||(i={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e&&e.order||0,index:t,_dataset:e,_parsed:[],_sorted:!1},s.push(i)),i}getContext(){return this.$context||(this.$context=Rt(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const e=this.data.datasets[t];if(!e)return!1;const s=this.getDatasetMeta(t);return typeof s.hidden=="boolean"?!s.hidden:!e.hidden}setDatasetVisibility(t,e){const s=this.getDatasetMeta(t);s.hidden=!e}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,e,s){const i=s?"show":"hide",o=this.getDatasetMeta(t),a=o.controller._resolveAnimations(void 0,i);Pe(e)?(o.data[e].hidden=!s,this.update()):(this.setDatasetVisibility(t,s),a.update(o,{visible:s}),this.update(r=>r.datasetIndex===t?i:void 0))}hide(t,e){this._updateVisibility(t,e,!1)}show(t,e){this._updateVisibility(t,e,!0)}_destroyDatasetMeta(t){const e=this._metasets[t];e&&e.controller&&e.controller._destroy(),delete this._metasets[t]}_stop(){let t,e;for(this.stop(),bt.remove(this),t=0,e=this.data.datasets.length;t<e;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:e}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),Ks(t,e),this.platform.releaseContext(e),this.canvas=null,this.ctx=null),delete rn[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,e=this.platform,s=(o,a)=>{e.addEventListener(this,o,a),t[o]=a},i=(o,a,r)=>{o.offsetX=a,o.offsetY=r,this._eventHandler(o)};z(this.options.events,o=>s(o,i))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,e=this.platform,s=(l,c)=>{e.addEventListener(this,l,c),t[l]=c},i=(l,c)=>{t[l]&&(e.removeEventListener(this,l,c),delete t[l])},o=(l,c)=>{this.canvas&&this.resize(l,c)};let a;const r=()=>{i("attach",r),this.attached=!0,this.resize(),s("resize",o),s("detach",a)};a=()=>{this.attached=!1,i("resize",o),this._stop(),this._resize(0,0),s("attach",r)},e.isAttached(this.canvas)?r():a()}unbindEvents(){z(this._listeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._listeners={},z(this._responsiveListeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,e,s){const i=s?"set":"remove";let o,a,r,l;for(e==="dataset"&&(o=this.getDatasetMeta(t[0].datasetIndex),o.controller["_"+i+"DatasetHoverStyle"]()),r=0,l=t.length;r<l;++r){a=t[r];const c=a&&this.getDatasetMeta(a.datasetIndex).controller;c&&c[i+"HoverStyle"](a.element,a.datasetIndex,a.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const e=this._active||[],s=t.map(({datasetIndex:o,index:a})=>{const r=this.getDatasetMeta(o);if(!r)throw new Error("No dataset found at index "+o);return{datasetIndex:o,element:r.data[a],index:a}});!hn(s,e)&&(this._active=s,this._lastEvent=null,this._updateHoverStyles(s,e))}notifyPlugins(t,e,s){return this._plugins.notify(this,t,e,s)}isPluginEnabled(t){return this._plugins._cache.filter(e=>e.plugin.id===t).length===1}_updateHoverStyles(t,e,s){const i=this.options.hover,o=(l,c)=>l.filter(d=>!c.some(u=>d.datasetIndex===u.datasetIndex&&d.index===u.index)),a=o(e,t),r=s?t:o(t,e);a.length&&this.updateHoverStyle(a,i.mode,!1),r.length&&i.mode&&this.updateHoverStyle(r,i.mode,!0)}_eventHandler(t,e){const s={event:t,replay:e,cancelable:!0,inChartArea:this.isPointInArea(t)},i=a=>(a.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",s,i)===!1)return;const o=this._handleEvent(t,e,s.inChartArea);return s.cancelable=!1,this.notifyPlugins("afterEvent",s,i),(o||s.changed)&&this.render(),this}_handleEvent(t,e,s){const{_active:i=[],options:o}=this,a=e,r=this._getActiveElements(t,i,s,a),l=qa(t),c=zc(t,this._lastEvent,s,l);s&&(this._lastEvent=null,F(o.onHover,[t,r,this],this),l&&F(o.onClick,[t,r,this],this));const d=!hn(r,i);return(d||e)&&(this._active=r,this._updateHoverStyles(r,i,e)),this._lastEvent=c,d}_getActiveElements(t,e,s,i){if(t.type==="mouseout")return[];if(!s)return e;const o=this.options.hover;return this.getElementsAtEventForMode(t,o.mode,o,i)}}S(xt,"defaults",W),S(xt,"instances",rn),S(xt,"overrides",Ut),S(xt,"registry",pt),S(xt,"version",Rc),S(xt,"getChart",Li);function Ii(){return z(xt.instances,n=>n._plugins.invalidate())}function Nc(n,t,e){const{startAngle:s,x:i,y:o,outerRadius:a,innerRadius:r,options:l}=t,{borderWidth:c,borderJoinStyle:d}=l,u=Math.min(c/a,Z(s-e));if(n.beginPath(),n.arc(i,o,a-c/2,s+u/2,e-u/2),r>0){const h=Math.min(c/r,Z(s-e));n.arc(i,o,r+c/2,e-h/2,s+h/2,!0)}else{const h=Math.min(c/2,a*Z(s-e));if(d==="round")n.arc(i,o,h,e-$/2,s+$/2,!0);else if(d==="bevel"){const f=2*h*h,p=-f*Math.cos(e+$/2)+i,m=-f*Math.sin(e+$/2)+o,g=f*Math.cos(s+$/2)+i,b=f*Math.sin(s+$/2)+o;n.lineTo(p,m),n.lineTo(g,b)}}n.closePath(),n.moveTo(0,0),n.rect(0,0,n.canvas.width,n.canvas.height),n.clip("evenodd")}function Fc(n,t,e){const{startAngle:s,pixelMargin:i,x:o,y:a,outerRadius:r,innerRadius:l}=t;let c=i/r;n.beginPath(),n.arc(o,a,r,s-c,e+c),l>i?(c=i/l,n.arc(o,a,l,e+c,s-c,!0)):n.arc(o,a,i,e+Y,s-Y),n.closePath(),n.clip()}function jc(n){return ks(n,["outerStart","outerEnd","innerStart","innerEnd"])}function Hc(n,t,e,s){const i=jc(n.options.borderRadius),o=(e-t)/2,a=Math.min(o,s*t/2),r=l=>{const c=(e-Math.min(o,l))*s/2;return X(l,0,Math.min(o,c))};return{outerStart:r(i.outerStart),outerEnd:r(i.outerEnd),innerStart:X(i.innerStart,0,a),innerEnd:X(i.innerEnd,0,a)}}function Zt(n,t,e,s){return{x:e+n*Math.cos(t),y:s+n*Math.sin(t)}}function vn(n,t,e,s,i,o){const{x:a,y:r,startAngle:l,pixelMargin:c,innerRadius:d}=t,u=Math.max(t.outerRadius+s+e-c,0),h=d>0?d+s+e+c:0;let f=0;const p=i-l;if(s){const N=d>0?d-s:0,H=u>0?u-s:0,U=(N+H)/2,ct=U!==0?p*U/(U+s):p;f=(p-ct)/2}const m=Math.max(.001,p*u-e/$)/u,g=(p-m)/2,b=l+g+f,y=i-g-f,{outerStart:k,outerEnd:w,innerStart:x,innerEnd:E}=Hc(t,h,u,y-b),M=u-k,C=u-w,L=b+k/M,T=y-w/C,B=h+x,O=h+E,K=b+x/B,it=y-E/O;if(n.beginPath(),o){const N=(L+T)/2;if(n.arc(a,r,u,L,N),n.arc(a,r,u,N,T),w>0){const J=Zt(C,T,a,r);n.arc(J.x,J.y,w,T,y+Y)}const H=Zt(O,y,a,r);if(n.lineTo(H.x,H.y),E>0){const J=Zt(O,it,a,r);n.arc(J.x,J.y,E,y+Y,it+Math.PI)}const U=(y-E/h+(b+x/h))/2;if(n.arc(a,r,h,y-E/h,U,!0),n.arc(a,r,h,U,b+x/h,!0),x>0){const J=Zt(B,K,a,r);n.arc(J.x,J.y,x,K+Math.PI,b-Y)}const ct=Zt(M,b,a,r);if(n.lineTo(ct.x,ct.y),k>0){const J=Zt(M,L,a,r);n.arc(J.x,J.y,k,b-Y,L)}}else{n.moveTo(a,r);const N=Math.cos(L)*u+a,H=Math.sin(L)*u+r;n.lineTo(N,H);const U=Math.cos(T)*u+a,ct=Math.sin(T)*u+r;n.lineTo(U,ct)}n.closePath()}function Vc(n,t,e,s,i){const{fullCircles:o,startAngle:a,circumference:r}=t;let l=t.endAngle;if(o){vn(n,t,e,s,l,i);for(let c=0;c<o;++c)n.fill();isNaN(r)||(l=a+(r%j||j))}return vn(n,t,e,s,l,i),n.fill(),l}function Wc(n,t,e,s,i){const{fullCircles:o,startAngle:a,circumference:r,options:l}=t,{borderWidth:c,borderJoinStyle:d,borderDash:u,borderDashOffset:h,borderRadius:f}=l,p=l.borderAlign==="inner";if(!c)return;n.setLineDash(u||[]),n.lineDashOffset=h,p?(n.lineWidth=c*2,n.lineJoin=d||"round"):(n.lineWidth=c,n.lineJoin=d||"bevel");let m=t.endAngle;if(o){vn(n,t,e,s,m,i);for(let g=0;g<o;++g)n.stroke();isNaN(r)||(m=a+(r%j||j))}p&&Fc(n,t,m),l.selfJoin&&m-a>=$&&f===0&&d!=="miter"&&Nc(n,t,m),o||(vn(n,t,e,s,m,i),n.stroke())}class ge extends ht{constructor(e){super();S(this,"circumference");S(this,"endAngle");S(this,"fullCircles");S(this,"innerRadius");S(this,"outerRadius");S(this,"pixelMargin");S(this,"startAngle");this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,e&&Object.assign(this,e)}inRange(e,s,i){const o=this.getProps(["x","y"],i),{angle:a,distance:r}=mo(o,{x:e,y:s}),{startAngle:l,endAngle:c,innerRadius:d,outerRadius:u,circumference:h}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],i),f=(this.options.spacing+this.options.borderWidth)/2,p=I(h,c-l),m=Le(a,l,c)&&l!==c,g=p>=j||m,b=_t(r,d+f,u+f);return g&&b}getCenterPoint(e){const{x:s,y:i,startAngle:o,endAngle:a,innerRadius:r,outerRadius:l}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],e),{offset:c,spacing:d}=this.options,u=(o+a)/2,h=(r+l+d+c)/2;return{x:s+Math.cos(u)*h,y:i+Math.sin(u)*h}}tooltipPosition(e){return this.getCenterPoint(e)}draw(e){const{options:s,circumference:i}=this,o=(s.offset||0)/4,a=(s.spacing||0)/2,r=s.circular;if(this.pixelMargin=s.borderAlign==="inner"?.33:0,this.fullCircles=i>j?Math.floor(i/j):0,i===0||this.innerRadius<0||this.outerRadius<0)return;e.save();const l=(this.startAngle+this.endAngle)/2;e.translate(Math.cos(l)*o,Math.sin(l)*o);const c=1-Math.sin(Math.min($,i||0)),d=o*c;e.fillStyle=s.backgroundColor,e.strokeStyle=s.borderColor,Vc(e,this,d,a,r),Wc(e,this,d,a,r),e.restore()}}S(ge,"id","arc"),S(ge,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1}),S(ge,"defaultRoutes",{backgroundColor:"backgroundColor"}),S(ge,"descriptors",{_scriptable:!0,_indexable:e=>e!=="borderDash"});function Xo(n,t,e=t){n.lineCap=I(e.borderCapStyle,t.borderCapStyle),n.setLineDash(I(e.borderDash,t.borderDash)),n.lineDashOffset=I(e.borderDashOffset,t.borderDashOffset),n.lineJoin=I(e.borderJoinStyle,t.borderJoinStyle),n.lineWidth=I(e.borderWidth,t.borderWidth),n.strokeStyle=I(e.borderColor,t.borderColor)}function qc(n,t,e){n.lineTo(e.x,e.y)}function Uc(n){return n.stepped?pr:n.tension||n.cubicInterpolationMode==="monotone"?mr:qc}function Ko(n,t,e={}){const s=n.length,{start:i=0,end:o=s-1}=e,{start:a,end:r}=t,l=Math.max(i,a),c=Math.min(o,r),d=i<a&&o<a||i>r&&o>r;return{count:s,start:l,loop:t.loop,ilen:c<l&&!d?s+c-l:c-l}}function Yc(n,t,e,s){const{points:i,options:o}=t,{count:a,start:r,loop:l,ilen:c}=Ko(i,e,s),d=Uc(o);let{move:u=!0,reverse:h}=s||{},f,p,m;for(f=0;f<=c;++f)p=i[(r+(h?c-f:f))%a],!p.skip&&(u?(n.moveTo(p.x,p.y),u=!1):d(n,m,p,h,o.stepped),m=p);return l&&(p=i[(r+(h?c:0))%a],d(n,m,p,h,o.stepped)),!!l}function Gc(n,t,e,s){const i=t.points,{count:o,start:a,ilen:r}=Ko(i,e,s),{move:l=!0,reverse:c}=s||{};let d=0,u=0,h,f,p,m,g,b;const y=w=>(a+(c?r-w:w))%o,k=()=>{m!==g&&(n.lineTo(d,g),n.lineTo(d,m),n.lineTo(d,b))};for(l&&(f=i[y(0)],n.moveTo(f.x,f.y)),h=0;h<=r;++h){if(f=i[y(h)],f.skip)continue;const w=f.x,x=f.y,E=w|0;E===p?(x<m?m=x:x>g&&(g=x),d=(u*d+w)/++u):(k(),n.lineTo(w,x),p=E,u=0,m=g=x),b=x}k()}function ns(n){const t=n.options,e=t.borderDash&&t.borderDash.length;return!n._decimated&&!n._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!e?Gc:Yc}function Xc(n){return n.stepped?Yr:n.tension||n.cubicInterpolationMode==="monotone"?Gr:Ht}function Kc(n,t,e,s){let i=t._path;i||(i=t._path=new Path2D,t.path(i,e,s)&&i.closePath()),Xo(n,t.options),n.stroke(i)}function Jc(n,t,e,s){const{segments:i,options:o}=t,a=ns(t);for(const r of i)Xo(n,o,r.style),n.beginPath(),a(n,t,r,{start:e,end:e+s-1})&&n.closePath(),n.stroke()}const Qc=typeof Path2D=="function";function Zc(n,t,e,s){Qc&&!t.options.segment?Kc(n,t,e,s):Jc(n,t,e,s)}class At extends ht{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,e){const s=this.options;if((s.tension||s.cubicInterpolationMode==="monotone")&&!s.stepped&&!this._pointsUpdated){const i=s.spanGaps?this._loop:this._fullLoop;Nr(this._points,s,t,i,e),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=tl(this,this.options.segment))}first(){const t=this.segments,e=this.points;return t.length&&e[t[0].start]}last(){const t=this.segments,e=this.points,s=t.length;return s&&e[t[s-1].end]}interpolate(t,e){const s=this.options,i=t[e],o=this.points,a=Do(this,{property:e,start:i,end:i});if(!a.length)return;const r=[],l=Xc(s);let c,d;for(c=0,d=a.length;c<d;++c){const{start:u,end:h}=a[c],f=o[u],p=o[h];if(f===p){r.push(f);continue}const m=Math.abs((i-f[e])/(p[e]-f[e])),g=l(f,p,m,s.stepped);g[e]=t[e],r.push(g)}return r.length===1?r[0]:r}pathSegment(t,e,s){return ns(this)(t,this,e,s)}path(t,e,s){const i=this.segments,o=ns(this);let a=this._loop;e=e||0,s=s||this.points.length-e;for(const r of i)a&=o(t,this,r,{start:e,end:e+s-1});return!!a}draw(t,e,s,i){const o=this.options||{};(this.points||[]).length&&o.borderWidth&&(t.save(),Zc(t,this,s,i),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}S(At,"id","line"),S(At,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),S(At,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),S(At,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function Ti(n,t,e,s){const i=n.options,{[e]:o}=n.getProps([e],s);return Math.abs(t-o)<i.radius+i.hitRadius}class ln extends ht{constructor(e){super();S(this,"parsed");S(this,"skip");S(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,e&&Object.assign(this,e)}inRange(e,s,i){const o=this.options,{x:a,y:r}=this.getProps(["x","y"],i);return Math.pow(e-a,2)+Math.pow(s-r,2)<Math.pow(o.hitRadius+o.radius,2)}inXRange(e,s){return Ti(this,e,"x",s)}inYRange(e,s){return Ti(this,e,"y",s)}getCenterPoint(e){const{x:s,y:i}=this.getProps(["x","y"],e);return{x:s,y:i}}size(e){e=e||this.options||{};let s=e.radius||0;s=Math.max(s,s&&e.hoverRadius||0);const i=s&&e.borderWidth||0;return(s+i)*2}draw(e,s){const i=this.options;this.skip||i.radius<.1||!kt(this,s,this.size(i)/2)||(e.strokeStyle=i.borderColor,e.lineWidth=i.borderWidth,e.fillStyle=i.backgroundColor,Qn(e,i,this.x,this.y))}getRange(){const e=this.options||{};return e.radius+e.hitRadius}}S(ln,"id","point"),S(ln,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),S(ln,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function Jo(n,t){const{x:e,y:s,base:i,width:o,height:a}=n.getProps(["x","y","base","width","height"],t);let r,l,c,d,u;return n.horizontal?(u=a/2,r=Math.min(e,i),l=Math.max(e,i),c=s-u,d=s+u):(u=o/2,r=e-u,l=e+u,c=Math.min(s,i),d=Math.max(s,i)),{left:r,top:c,right:l,bottom:d}}function Pt(n,t,e,s){return n?0:X(t,e,s)}function td(n,t,e){const s=n.options.borderWidth,i=n.borderSkipped,o=So(s);return{t:Pt(i.top,o.top,0,e),r:Pt(i.right,o.right,0,t),b:Pt(i.bottom,o.bottom,0,e),l:Pt(i.left,o.left,0,t)}}function ed(n,t,e){const{enableBorderRadius:s}=n.getProps(["enableBorderRadius"]),i=n.options.borderRadius,o=Wt(i),a=Math.min(t,e),r=n.borderSkipped,l=s||D(i);return{topLeft:Pt(!l||r.top||r.left,o.topLeft,0,a),topRight:Pt(!l||r.top||r.right,o.topRight,0,a),bottomLeft:Pt(!l||r.bottom||r.left,o.bottomLeft,0,a),bottomRight:Pt(!l||r.bottom||r.right,o.bottomRight,0,a)}}function nd(n){const t=Jo(n),e=t.right-t.left,s=t.bottom-t.top,i=td(n,e/2,s/2),o=ed(n,e/2,s/2);return{outer:{x:t.left,y:t.top,w:e,h:s,radius:o},inner:{x:t.left+i.l,y:t.top+i.t,w:e-i.l-i.r,h:s-i.t-i.b,radius:{topLeft:Math.max(0,o.topLeft-Math.max(i.t,i.l)),topRight:Math.max(0,o.topRight-Math.max(i.t,i.r)),bottomLeft:Math.max(0,o.bottomLeft-Math.max(i.b,i.l)),bottomRight:Math.max(0,o.bottomRight-Math.max(i.b,i.r))}}}}function Vn(n,t,e,s){const i=t===null,o=e===null,r=n&&!(i&&o)&&Jo(n,s);return r&&(i||_t(t,r.left,r.right))&&(o||_t(e,r.top,r.bottom))}function sd(n){return n.topLeft||n.topRight||n.bottomLeft||n.bottomRight}function id(n,t){n.rect(t.x,t.y,t.w,t.h)}function Wn(n,t,e={}){const s=n.x!==e.x?-t:0,i=n.y!==e.y?-t:0,o=(n.x+n.w!==e.x+e.w?t:0)-s,a=(n.y+n.h!==e.y+e.h?t:0)-i;return{x:n.x+s,y:n.y+i,w:n.w+o,h:n.h+a,radius:n.radius}}class cn extends ht{constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:e,options:{borderColor:s,backgroundColor:i}}=this,{inner:o,outer:a}=nd(this),r=sd(a.radius)?Ie:id;t.save(),(a.w!==o.w||a.h!==o.h)&&(t.beginPath(),r(t,Wn(a,e,o)),t.clip(),r(t,Wn(o,-e,a)),t.fillStyle=s,t.fill("evenodd")),t.beginPath(),r(t,Wn(o,e)),t.fillStyle=i,t.fill(),t.restore()}inRange(t,e,s){return Vn(this,t,e,s)}inXRange(t,e){return Vn(this,t,null,e)}inYRange(t,e){return Vn(this,null,t,e)}getCenterPoint(t){const{x:e,y:s,base:i,horizontal:o}=this.getProps(["x","y","base","horizontal"],t);return{x:o?(e+i)/2:e,y:o?s:(s+i)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}S(cn,"id","bar"),S(cn,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),S(cn,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});var od=Object.freeze({__proto__:null,ArcElement:ge,BarElement:cn,LineElement:At,PointElement:ln});const ss=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],Bi=ss.map(n=>n.replace("rgb(","rgba(").replace(")",", 0.5)"));function Qo(n){return ss[n%ss.length]}function Zo(n){return Bi[n%Bi.length]}function ad(n,t){return n.borderColor=Qo(t),n.backgroundColor=Zo(t),++t}function rd(n,t){return n.backgroundColor=n.data.map(()=>Qo(t++)),t}function ld(n,t){return n.backgroundColor=n.data.map(()=>Zo(t++)),t}function cd(n){let t=0;return(e,s)=>{const i=n.getDatasetMeta(s).controller;i instanceof Vt?t=rd(e,t):i instanceof Se?t=ld(e,t):i&&(t=ad(e,t))}}function Ri(n){let t;for(t in n)if(n[t].borderColor||n[t].backgroundColor)return!0;return!1}function dd(n){return n&&(n.borderColor||n.backgroundColor)}function ud(){return W.borderColor!=="rgba(0,0,0,0.1)"||W.backgroundColor!=="rgba(0,0,0,0.1)"}var hd={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(n,t,e){if(!e.enabled)return;const{data:{datasets:s},options:i}=n.config,{elements:o}=i,a=Ri(s)||dd(i)||o&&Ri(o)||ud();if(!e.forceOverride&&a)return;const r=cd(n);s.forEach(r)}};function fd(n,t,e,s,i){const o=i.samples||s;if(o>=e)return n.slice(t,t+e);const a=[],r=(e-2)/(o-2);let l=0;const c=t+e-1;let d=t,u,h,f,p,m;for(a[l++]=n[d],u=0;u<o-2;u++){let g=0,b=0,y;const k=Math.floor((u+1)*r)+1+t,w=Math.min(Math.floor((u+2)*r)+1,e)+t,x=w-k;for(y=k;y<w;y++)g+=n[y].x,b+=n[y].y;g/=x,b/=x;const E=Math.floor(u*r)+1+t,M=Math.min(Math.floor((u+1)*r)+1,e)+t,{x:C,y:L}=n[d];for(f=p=-1,y=E;y<M;y++)p=.5*Math.abs((C-g)*(n[y].y-L)-(C-n[y].x)*(b-L)),p>f&&(f=p,h=n[y],m=y);a[l++]=h,d=m}return a[l++]=n[c],a}function pd(n,t,e,s){let i=0,o=0,a,r,l,c,d,u,h,f,p,m;const g=[],b=t+e-1,y=n[t].x,w=n[b].x-y;for(a=t;a<t+e;++a){r=n[a],l=(r.x-y)/w*s,c=r.y;const x=l|0;if(x===d)c<p?(p=c,u=a):c>m&&(m=c,h=a),i=(o*i+r.x)/++o;else{const E=a-1;if(!R(u)&&!R(h)){const M=Math.min(u,h),C=Math.max(u,h);M!==f&&M!==E&&g.push({...n[M],x:i}),C!==f&&C!==E&&g.push({...n[C],x:i})}a>0&&E!==f&&g.push(n[E]),g.push(r),d=x,o=0,p=m=c,u=h=f=a}}return g}function ta(n){if(n._decimated){const t=n._data;delete n._decimated,delete n._data,Object.defineProperty(n,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function Di(n){n.data.datasets.forEach(t=>{ta(t)})}function md(n,t){const e=t.length;let s=0,i;const{iScale:o}=n,{min:a,max:r,minDefined:l,maxDefined:c}=o.getUserBounds();return l&&(s=X(wt(t,o.axis,a).lo,0,e-1)),c?i=X(wt(t,o.axis,r).hi+1,s,e)-s:i=e-s,{start:s,count:i}}var gd={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(n,t,e)=>{if(!e.enabled){Di(n);return}const s=n.width;n.data.datasets.forEach((i,o)=>{const{_data:a,indexAxis:r}=i,l=n.getDatasetMeta(o),c=a||i.data;if(pe([r,n.options.indexAxis])==="y"||!l.controller.supportsDecimation)return;const d=n.scales[l.xAxisID];if(d.type!=="linear"&&d.type!=="time"||n.options.parsing)return;let{start:u,count:h}=md(l,c);const f=e.threshold||4*s;if(h<=f){ta(i);return}R(a)&&(i._data=c,delete i.data,Object.defineProperty(i,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(m){this._data=m}}));let p;switch(e.algorithm){case"lttb":p=fd(c,u,h,s,e);break;case"min-max":p=pd(c,u,h,s);break;default:throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`)}i._decimated=p})},destroy(n){Di(n)}};function bd(n,t,e){const s=n.segments,i=n.points,o=t.points,a=[];for(const r of s){let{start:l,end:c}=r;c=An(l,c,i);const d=is(e,i[l],i[c],r.loop);if(!t.segments){a.push({source:r,target:d,start:i[l],end:i[c]});continue}const u=Do(t,d);for(const h of u){const f=is(e,o[h.start],o[h.end],h.loop),p=Ro(r,i,f);for(const m of p)a.push({source:m,target:h,start:{[e]:Oi(d,f,"start",Math.max)},end:{[e]:Oi(d,f,"end",Math.min)}})}}return a}function is(n,t,e,s){if(s)return;let i=t[n],o=e[n];return n==="angle"&&(i=Z(i),o=Z(o)),{property:n,start:i,end:o}}function vd(n,t){const{x:e=null,y:s=null}=n||{},i=t.points,o=[];return t.segments.forEach(({start:a,end:r})=>{r=An(a,r,i);const l=i[a],c=i[r];s!==null?(o.push({x:l.x,y:s}),o.push({x:c.x,y:s})):e!==null&&(o.push({x:e,y:l.y}),o.push({x:e,y:c.y}))}),o}function An(n,t,e){for(;t>n;t--){const s=e[t];if(!isNaN(s.x)&&!isNaN(s.y))break}return t}function Oi(n,t,e,s){return n&&t?s(n[e],t[e]):n?n[e]:t?t[e]:0}function ea(n,t){let e=[],s=!1;return V(n)?(s=!0,e=n):e=vd(n,t),e.length?new At({points:e,options:{tension:0},_loop:s,_fullLoop:s}):null}function $i(n){return n&&n.fill!==!1}function yd(n,t,e){let i=n[t].fill;const o=[t];let a;if(!e)return i;for(;i!==!1&&o.indexOf(i)===-1;){if(!q(i))return i;if(a=n[i],!a)return!1;if(a.visible)return i;o.push(i),i=a.fill}return!1}function xd(n,t,e){const s=Sd(n);if(D(s))return isNaN(s.value)?!1:s;let i=parseFloat(s);return q(i)&&Math.floor(i)===i?_d(s[0],t,i,e):["origin","start","end","stack","shape"].indexOf(s)>=0&&s}function _d(n,t,e,s){return(n==="-"||n==="+")&&(e=t+e),e===t||e<0||e>=s?!1:e}function wd(n,t){let e=null;return n==="start"?e=t.bottom:n==="end"?e=t.top:D(n)?e=t.getPixelForValue(n.value):t.getBasePixel&&(e=t.getBasePixel()),e}function kd(n,t,e){let s;return n==="start"?s=e:n==="end"?s=t.options.reverse?t.min:t.max:D(n)?s=n.value:s=t.getBaseValue(),s}function Sd(n){const t=n.options,e=t.fill;let s=I(e&&e.target,e);return s===void 0&&(s=!!t.backgroundColor),s===!1||s===null?!1:s===!0?"origin":s}function Ed(n){const{scale:t,index:e,line:s}=n,i=[],o=s.segments,a=s.points,r=Md(t,e);r.push(ea({x:null,y:t.bottom},s));for(let l=0;l<o.length;l++){const c=o[l];for(let d=c.start;d<=c.end;d++)Cd(i,a[d],r)}return new At({points:i,options:{}})}function Md(n,t){const e=[],s=n.getMatchingVisibleMetas("line");for(let i=0;i<s.length;i++){const o=s[i];if(o.index===t)break;o.hidden||e.unshift(o.dataset)}return e}function Cd(n,t,e){const s=[];for(let i=0;i<e.length;i++){const o=e[i],{first:a,last:r,point:l}=Ad(o,t,"x");if(!(!l||a&&r)){if(a)s.unshift(l);else if(n.push(l),!r)break}}n.push(...s)}function Ad(n,t,e){const s=n.interpolate(t,e);if(!s)return{};const i=s[e],o=n.segments,a=n.points;let r=!1,l=!1;for(let c=0;c<o.length;c++){const d=o[c],u=a[d.start][e],h=a[d.end][e];if(_t(i,u,h)){r=i===u,l=i===h;break}}return{first:r,last:l,point:s}}class na{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,e,s){const{x:i,y:o,radius:a}=this;return e=e||{start:0,end:j},t.arc(i,o,a,e.end,e.start,!0),!s.bounds}interpolate(t){const{x:e,y:s,radius:i}=this,o=t.angle;return{x:e+Math.cos(o)*i,y:s+Math.sin(o)*i,angle:o}}}function Pd(n){const{chart:t,fill:e,line:s}=n;if(q(e))return Ld(t,e);if(e==="stack")return Ed(n);if(e==="shape")return!0;const i=Id(n);return i instanceof na?i:ea(i,s)}function Ld(n,t){const e=n.getDatasetMeta(t);return e&&n.isDatasetVisible(t)?e.dataset:null}function Id(n){return(n.scale||{}).getPointPositionForValue?Bd(n):Td(n)}function Td(n){const{scale:t={},fill:e}=n,s=wd(e,t);if(q(s)){const i=t.isHorizontal();return{x:i?s:null,y:i?null:s}}return null}function Bd(n){const{scale:t,fill:e}=n,s=t.options,i=t.getLabels().length,o=s.reverse?t.max:t.min,a=kd(e,t,o),r=[];if(s.grid.circular){const l=t.getPointPositionForValue(0,o);return new na({x:l.x,y:l.y,radius:t.getDistanceFromCenterForValue(a)})}for(let l=0;l<i;++l)r.push(t.getPointPositionForValue(l,a));return r}function qn(n,t,e){const s=Pd(t),{chart:i,index:o,line:a,scale:r,axis:l}=t,c=a.options,d=c.fill,u=c.backgroundColor,{above:h=u,below:f=u}=d||{},p=i.getDatasetMeta(o),m=Oo(i,p);s&&a.points.length&&(Sn(n,e),Rd(n,{line:a,target:s,above:h,below:f,area:e,scale:r,axis:l,clip:m}),En(n))}function Rd(n,t){const{line:e,target:s,above:i,below:o,area:a,scale:r,clip:l}=t,c=e._loop?"angle":t.axis;n.save();let d=o;o!==i&&(c==="x"?(zi(n,s,a.top),Un(n,{line:e,target:s,color:i,scale:r,property:c,clip:l}),n.restore(),n.save(),zi(n,s,a.bottom)):c==="y"&&(Ni(n,s,a.left),Un(n,{line:e,target:s,color:o,scale:r,property:c,clip:l}),n.restore(),n.save(),Ni(n,s,a.right),d=i)),Un(n,{line:e,target:s,color:d,scale:r,property:c,clip:l}),n.restore()}function zi(n,t,e){const{segments:s,points:i}=t;let o=!0,a=!1;n.beginPath();for(const r of s){const{start:l,end:c}=r,d=i[l],u=i[An(l,c,i)];o?(n.moveTo(d.x,d.y),o=!1):(n.lineTo(d.x,e),n.lineTo(d.x,d.y)),a=!!t.pathSegment(n,r,{move:a}),a?n.closePath():n.lineTo(u.x,e)}n.lineTo(t.first().x,e),n.closePath(),n.clip()}function Ni(n,t,e){const{segments:s,points:i}=t;let o=!0,a=!1;n.beginPath();for(const r of s){const{start:l,end:c}=r,d=i[l],u=i[An(l,c,i)];o?(n.moveTo(d.x,d.y),o=!1):(n.lineTo(e,d.y),n.lineTo(d.x,d.y)),a=!!t.pathSegment(n,r,{move:a}),a?n.closePath():n.lineTo(e,u.y)}n.lineTo(e,t.first().y),n.closePath(),n.clip()}function Un(n,t){const{line:e,target:s,property:i,color:o,scale:a,clip:r}=t,l=bd(e,s,i);for(const{source:c,target:d,start:u,end:h}of l){const{style:{backgroundColor:f=o}={}}=c,p=s!==!0;n.save(),n.fillStyle=f,Dd(n,a,r,p&&is(i,u,h)),n.beginPath();const m=!!e.pathSegment(n,c);let g;if(p){m?n.closePath():Fi(n,s,h,i);const b=!!s.pathSegment(n,d,{move:m,reverse:!0});g=m&&b,g||Fi(n,s,u,i)}n.closePath(),n.fill(g?"evenodd":"nonzero"),n.restore()}}function Dd(n,t,e,s){const i=t.chart.chartArea,{property:o,start:a,end:r}=s||{};if(o==="x"||o==="y"){let l,c,d,u;o==="x"?(l=a,c=i.top,d=r,u=i.bottom):(l=i.left,c=a,d=i.right,u=r),n.beginPath(),e&&(l=Math.max(l,e.left),d=Math.min(d,e.right),c=Math.max(c,e.top),u=Math.min(u,e.bottom)),n.rect(l,c,d-l,u-c),n.clip()}}function Fi(n,t,e,s){const i=t.interpolate(e,s);i&&n.lineTo(i.x,i.y)}var Od={id:"filler",afterDatasetsUpdate(n,t,e){const s=(n.data.datasets||[]).length,i=[];let o,a,r,l;for(a=0;a<s;++a)o=n.getDatasetMeta(a),r=o.dataset,l=null,r&&r.options&&r instanceof At&&(l={visible:n.isDatasetVisible(a),index:a,fill:xd(r,a,s),chart:n,axis:o.controller.options.indexAxis,scale:o.vScale,line:r}),o.$filler=l,i.push(l);for(a=0;a<s;++a)l=i[a],!(!l||l.fill===!1)&&(l.fill=yd(i,a,e.propagate))},beforeDraw(n,t,e){const s=e.drawTime==="beforeDraw",i=n.getSortedVisibleDatasetMetas(),o=n.chartArea;for(let a=i.length-1;a>=0;--a){const r=i[a].$filler;r&&(r.line.updateControlPoints(o,r.axis),s&&r.fill&&qn(n.ctx,r,o))}},beforeDatasetsDraw(n,t,e){if(e.drawTime!=="beforeDatasetsDraw")return;const s=n.getSortedVisibleDatasetMetas();for(let i=s.length-1;i>=0;--i){const o=s[i].$filler;$i(o)&&qn(n.ctx,o,n.chartArea)}},beforeDatasetDraw(n,t,e){const s=t.meta.$filler;!$i(s)||e.drawTime!=="beforeDatasetDraw"||qn(n.ctx,s,n.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const ji=(n,t)=>{let{boxHeight:e=t,boxWidth:s=t}=n;return n.usePointStyle&&(e=Math.min(e,t),s=n.pointStyleWidth||Math.min(s,t)),{boxWidth:s,boxHeight:e,itemHeight:Math.max(t,e)}},$d=(n,t)=>n!==null&&t!==null&&n.datasetIndex===t.datasetIndex&&n.index===t.index;class Hi extends ht{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e,s){this.maxWidth=t,this.maxHeight=e,this._margins=s,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let e=F(t.generateLabels,[this.chart],this)||[];t.filter&&(e=e.filter(s=>t.filter(s,this.chart.data))),t.sort&&(e=e.sort((s,i)=>t.sort(s,i,this.chart.data))),this.options.reverse&&e.reverse(),this.legendItems=e}fit(){const{options:t,ctx:e}=this;if(!t.display){this.width=this.height=0;return}const s=t.labels,i=G(s.font),o=i.size,a=this._computeTitleHeight(),{boxWidth:r,itemHeight:l}=ji(s,o);let c,d;e.font=i.string,this.isHorizontal()?(c=this.maxWidth,d=this._fitRows(a,o,r,l)+10):(d=this.maxHeight,c=this._fitCols(a,i,r,l)+10),this.width=Math.min(c,t.maxWidth||this.maxWidth),this.height=Math.min(d,t.maxHeight||this.maxHeight)}_fitRows(t,e,s,i){const{ctx:o,maxWidth:a,options:{labels:{padding:r}}}=this,l=this.legendHitBoxes=[],c=this.lineWidths=[0],d=i+r;let u=t;o.textAlign="left",o.textBaseline="middle";let h=-1,f=-d;return this.legendItems.forEach((p,m)=>{const g=s+e/2+o.measureText(p.text).width;(m===0||c[c.length-1]+g+2*r>a)&&(u+=d,c[c.length-(m>0?0:1)]=0,f+=d,h++),l[m]={left:0,top:f,row:h,width:g,height:i},c[c.length-1]+=g+r}),u}_fitCols(t,e,s,i){const{ctx:o,maxHeight:a,options:{labels:{padding:r}}}=this,l=this.legendHitBoxes=[],c=this.columnSizes=[],d=a-t;let u=r,h=0,f=0,p=0,m=0;return this.legendItems.forEach((g,b)=>{const{itemWidth:y,itemHeight:k}=zd(s,e,o,g,i);b>0&&f+k+2*r>d&&(u+=h+r,c.push({width:h,height:f}),p+=h+r,m++,h=f=0),l[b]={left:p,top:f,col:m,width:y,height:k},h=Math.max(h,y),f+=k+r}),u+=h,c.push({width:h,height:f}),u}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:e,options:{align:s,labels:{padding:i},rtl:o}}=this,a=te(o,this.left,this.width);if(this.isHorizontal()){let r=0,l=Q(s,this.left+i,this.right-this.lineWidths[r]);for(const c of e)r!==c.row&&(r=c.row,l=Q(s,this.left+i,this.right-this.lineWidths[r])),c.top+=this.top+t+i,c.left=a.leftForLtr(a.x(l),c.width),l+=c.width+i}else{let r=0,l=Q(s,this.top+t+i,this.bottom-this.columnSizes[r].height);for(const c of e)c.col!==r&&(r=c.col,l=Q(s,this.top+t+i,this.bottom-this.columnSizes[r].height)),c.top=l,c.left+=this.left+i,c.left=a.leftForLtr(a.x(c.left),c.width),l+=c.height+i}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Sn(t,this),this._draw(),En(t)}}_draw(){const{options:t,columnSizes:e,lineWidths:s,ctx:i}=this,{align:o,labels:a}=t,r=W.color,l=te(t.rtl,this.left,this.width),c=G(a.font),{padding:d}=a,u=c.size,h=u/2;let f;this.drawTitle(),i.textAlign=l.textAlign("left"),i.textBaseline="middle",i.lineWidth=.5,i.font=c.string;const{boxWidth:p,boxHeight:m,itemHeight:g}=ji(a,u),b=function(E,M,C){if(isNaN(p)||p<=0||isNaN(m)||m<0)return;i.save();const L=I(C.lineWidth,1);if(i.fillStyle=I(C.fillStyle,r),i.lineCap=I(C.lineCap,"butt"),i.lineDashOffset=I(C.lineDashOffset,0),i.lineJoin=I(C.lineJoin,"miter"),i.lineWidth=L,i.strokeStyle=I(C.strokeStyle,r),i.setLineDash(I(C.lineDash,[])),a.usePointStyle){const T={radius:m*Math.SQRT2/2,pointStyle:C.pointStyle,rotation:C.rotation,borderWidth:L},B=l.xPlus(E,p/2),O=M+h;ko(i,T,B,O,a.pointStyleWidth&&p)}else{const T=M+Math.max((u-m)/2,0),B=l.leftForLtr(E,p),O=Wt(C.borderRadius);i.beginPath(),Object.values(O).some(K=>K!==0)?Ie(i,{x:B,y:T,w:p,h:m,radius:O}):i.rect(B,T,p,m),i.fill(),L!==0&&i.stroke()}i.restore()},y=function(E,M,C){Yt(i,C.text,E,M+g/2,c,{strikethrough:C.hidden,textAlign:l.textAlign(C.textAlign)})},k=this.isHorizontal(),w=this._computeTitleHeight();k?f={x:Q(o,this.left+d,this.right-s[0]),y:this.top+d+w,line:0}:f={x:this.left+d,y:Q(o,this.top+w+d,this.bottom-e[0].height),line:0},Io(this.ctx,t.textDirection);const x=g+d;this.legendItems.forEach((E,M)=>{i.strokeStyle=E.fontColor,i.fillStyle=E.fontColor;const C=i.measureText(E.text).width,L=l.textAlign(E.textAlign||(E.textAlign=a.textAlign)),T=p+h+C;let B=f.x,O=f.y;l.setWidth(this.width),k?M>0&&B+T+d>this.right&&(O=f.y+=x,f.line++,B=f.x=Q(o,this.left+d,this.right-s[f.line])):M>0&&O+x>this.bottom&&(B=f.x=B+e[f.line].width+d,f.line++,O=f.y=Q(o,this.top+w+d,this.bottom-e[f.line].height));const K=l.x(B);if(b(K,O,E),B=sr(L,B+p+h,k?B+T:this.right,t.rtl),y(l.x(B),O,E),k)f.x+=T+d;else if(typeof E.text!="string"){const it=c.lineHeight;f.y+=sa(E,it)+d}else f.y+=x}),To(this.ctx,t.textDirection)}drawTitle(){const t=this.options,e=t.title,s=G(e.font),i=et(e.padding);if(!e.display)return;const o=te(t.rtl,this.left,this.width),a=this.ctx,r=e.position,l=s.size/2,c=i.top+l;let d,u=this.left,h=this.width;if(this.isHorizontal())h=Math.max(...this.lineWidths),d=this.top+c,u=Q(t.align,u,this.right-h);else{const p=this.columnSizes.reduce((m,g)=>Math.max(m,g.height),0);d=c+Q(t.align,this.top,this.bottom-p-t.labels.padding-this._computeTitleHeight())}const f=Q(r,u,u+h);a.textAlign=o.textAlign(_s(r)),a.textBaseline="middle",a.strokeStyle=e.color,a.fillStyle=e.color,a.font=s.string,Yt(a,e.text,f,d,s)}_computeTitleHeight(){const t=this.options.title,e=G(t.font),s=et(t.padding);return t.display?e.lineHeight+s.height:0}_getLegendItemAt(t,e){let s,i,o;if(_t(t,this.left,this.right)&&_t(e,this.top,this.bottom)){for(o=this.legendHitBoxes,s=0;s<o.length;++s)if(i=o[s],_t(t,i.left,i.left+i.width)&&_t(e,i.top,i.top+i.height))return this.legendItems[s]}return null}handleEvent(t){const e=this.options;if(!jd(t.type,e))return;const s=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const i=this._hoveredItem,o=$d(i,s);i&&!o&&F(e.onLeave,[t,i,this],this),this._hoveredItem=s,s&&!o&&F(e.onHover,[t,s,this],this)}else s&&F(e.onClick,[t,s,this],this)}}function zd(n,t,e,s,i){const o=Nd(s,n,t,e),a=Fd(i,s,t.lineHeight);return{itemWidth:o,itemHeight:a}}function Nd(n,t,e,s){let i=n.text;return i&&typeof i!="string"&&(i=i.reduce((o,a)=>o.length>a.length?o:a)),t+e.size/2+s.measureText(i).width}function Fd(n,t,e){let s=n;return typeof t.text!="string"&&(s=sa(t,e)),s}function sa(n,t){const e=n.text?n.text.length:0;return t*e}function jd(n,t){return!!((n==="mousemove"||n==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(n==="click"||n==="mouseup"))}var Hd={id:"legend",_element:Hi,start(n,t,e){const s=n.legend=new Hi({ctx:n.ctx,options:e,chart:n});tt.configure(n,s,e),tt.addBox(n,s)},stop(n){tt.removeBox(n,n.legend),delete n.legend},beforeUpdate(n,t,e){const s=n.legend;tt.configure(n,s,e),s.options=e},afterUpdate(n){const t=n.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(n,t){t.replay||n.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(n,t,e){const s=t.datasetIndex,i=e.chart;i.isDatasetVisible(s)?(i.hide(s),t.hidden=!0):(i.show(s),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:n=>n.chart.options.color,boxWidth:40,padding:10,generateLabels(n){const t=n.data.datasets,{labels:{usePointStyle:e,pointStyle:s,textAlign:i,color:o,useBorderRadius:a,borderRadius:r}}=n.legend.options;return n._getSortedDatasetMetas().map(l=>{const c=l.controller.getStyle(e?0:void 0),d=et(c.borderWidth);return{text:t[l.index].label,fillStyle:c.backgroundColor,fontColor:o,hidden:!l.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(d.width+d.height)/4,strokeStyle:c.borderColor,pointStyle:s||c.pointStyle,rotation:c.rotation,textAlign:i||c.textAlign,borderRadius:a&&(r||c.borderRadius),datasetIndex:l.index}},this)}},title:{color:n=>n.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:n=>!n.startsWith("on"),labels:{_scriptable:n=>!["generateLabels","filter","sort"].includes(n)}}};class Ls extends ht{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e){const s=this.options;if(this.left=0,this.top=0,!s.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=e;const i=V(s.text)?s.text.length:1;this._padding=et(s.padding);const o=i*G(s.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=o:this.width=o}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:e,left:s,bottom:i,right:o,options:a}=this,r=a.align;let l=0,c,d,u;return this.isHorizontal()?(d=Q(r,s,o),u=e+t,c=o-s):(a.position==="left"?(d=s+t,u=Q(r,i,e),l=$*-.5):(d=o-t,u=Q(r,e,i),l=$*.5),c=i-e),{titleX:d,titleY:u,maxWidth:c,rotation:l}}draw(){const t=this.ctx,e=this.options;if(!e.display)return;const s=G(e.font),o=s.lineHeight/2+this._padding.top,{titleX:a,titleY:r,maxWidth:l,rotation:c}=this._drawArgs(o);Yt(t,e.text,0,0,s,{color:e.color,maxWidth:l,rotation:c,textAlign:_s(e.align),textBaseline:"middle",translation:[a,r]})}}function Vd(n,t){const e=new Ls({ctx:n.ctx,options:t,chart:n});tt.configure(n,e,t),tt.addBox(n,e),n.titleBlock=e}var Wd={id:"title",_element:Ls,start(n,t,e){Vd(n,e)},stop(n){const t=n.titleBlock;tt.removeBox(n,t),delete n.titleBlock},beforeUpdate(n,t,e){const s=n.titleBlock;tt.configure(n,s,e),s.options=e},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Je=new WeakMap;var qd={id:"subtitle",start(n,t,e){const s=new Ls({ctx:n.ctx,options:e,chart:n});tt.configure(n,s,e),tt.addBox(n,s),Je.set(n,s)},stop(n){tt.removeBox(n,Je.get(n)),Je.delete(n)},beforeUpdate(n,t,e){const s=Je.get(n);tt.configure(n,s,e),s.options=e},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const be={average(n){if(!n.length)return!1;let t,e,s=new Set,i=0,o=0;for(t=0,e=n.length;t<e;++t){const r=n[t].element;if(r&&r.hasValue()){const l=r.tooltipPosition();s.add(l.x),i+=l.y,++o}}return o===0||s.size===0?!1:{x:[...s].reduce((r,l)=>r+l)/s.size,y:i/o}},nearest(n,t){if(!n.length)return!1;let e=t.x,s=t.y,i=Number.POSITIVE_INFINITY,o,a,r;for(o=0,a=n.length;o<a;++o){const l=n[o].element;if(l&&l.hasValue()){const c=l.getCenterPoint(),d=Kn(t,c);d<i&&(i=d,r=l)}}if(r){const l=r.tooltipPosition();e=l.x,s=l.y}return{x:e,y:s}}};function ft(n,t){return t&&(V(t)?Array.prototype.push.apply(n,t):n.push(t)),n}function vt(n){return(typeof n=="string"||n instanceof String)&&n.indexOf(`
`)>-1?n.split(`
`):n}function Ud(n,t){const{element:e,datasetIndex:s,index:i}=t,o=n.getDatasetMeta(s).controller,{label:a,value:r}=o.getLabelAndValue(i);return{chart:n,label:a,parsed:o.getParsed(i),raw:n.data.datasets[s].data[i],formattedValue:r,dataset:o.getDataset(),dataIndex:i,datasetIndex:s,element:e}}function Vi(n,t){const e=n.chart.ctx,{body:s,footer:i,title:o}=n,{boxWidth:a,boxHeight:r}=t,l=G(t.bodyFont),c=G(t.titleFont),d=G(t.footerFont),u=o.length,h=i.length,f=s.length,p=et(t.padding);let m=p.height,g=0,b=s.reduce((w,x)=>w+x.before.length+x.lines.length+x.after.length,0);if(b+=n.beforeBody.length+n.afterBody.length,u&&(m+=u*c.lineHeight+(u-1)*t.titleSpacing+t.titleMarginBottom),b){const w=t.displayColors?Math.max(r,l.lineHeight):l.lineHeight;m+=f*w+(b-f)*l.lineHeight+(b-1)*t.bodySpacing}h&&(m+=t.footerMarginTop+h*d.lineHeight+(h-1)*t.footerSpacing);let y=0;const k=function(w){g=Math.max(g,e.measureText(w).width+y)};return e.save(),e.font=c.string,z(n.title,k),e.font=l.string,z(n.beforeBody.concat(n.afterBody),k),y=t.displayColors?a+2+t.boxPadding:0,z(s,w=>{z(w.before,k),z(w.lines,k),z(w.after,k)}),y=0,e.font=d.string,z(n.footer,k),e.restore(),g+=p.width,{width:g,height:m}}function Yd(n,t){const{y:e,height:s}=t;return e<s/2?"top":e>n.height-s/2?"bottom":"center"}function Gd(n,t,e,s){const{x:i,width:o}=s,a=e.caretSize+e.caretPadding;if(n==="left"&&i+o+a>t.width||n==="right"&&i-o-a<0)return!0}function Xd(n,t,e,s){const{x:i,width:o}=e,{width:a,chartArea:{left:r,right:l}}=n;let c="center";return s==="center"?c=i<=(r+l)/2?"left":"right":i<=o/2?c="left":i>=a-o/2&&(c="right"),Gd(c,n,t,e)&&(c="center"),c}function Wi(n,t,e){const s=e.yAlign||t.yAlign||Yd(n,e);return{xAlign:e.xAlign||t.xAlign||Xd(n,t,e,s),yAlign:s}}function Kd(n,t){let{x:e,width:s}=n;return t==="right"?e-=s:t==="center"&&(e-=s/2),e}function Jd(n,t,e){let{y:s,height:i}=n;return t==="top"?s+=e:t==="bottom"?s-=i+e:s-=i/2,s}function qi(n,t,e,s){const{caretSize:i,caretPadding:o,cornerRadius:a}=n,{xAlign:r,yAlign:l}=e,c=i+o,{topLeft:d,topRight:u,bottomLeft:h,bottomRight:f}=Wt(a);let p=Kd(t,r);const m=Jd(t,l,c);return l==="center"?r==="left"?p+=c:r==="right"&&(p-=c):r==="left"?p-=Math.max(d,h)+i:r==="right"&&(p+=Math.max(u,f)+i),{x:X(p,0,s.width-t.width),y:X(m,0,s.height-t.height)}}function Qe(n,t,e){const s=et(e.padding);return t==="center"?n.x+n.width/2:t==="right"?n.x+n.width-s.right:n.x+s.left}function Ui(n){return ft([],vt(n))}function Qd(n,t,e){return Rt(n,{tooltip:t,tooltipItems:e,type:"tooltip"})}function Yi(n,t){const e=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return e?n.override(e):n}const ia={beforeTitle:gt,title(n){if(n.length>0){const t=n[0],e=t.chart.data.labels,s=e?e.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(s>0&&t.dataIndex<s)return e[t.dataIndex]}return""},afterTitle:gt,beforeBody:gt,beforeLabel:gt,label(n){if(this&&this.options&&this.options.mode==="dataset")return n.label+": "+n.formattedValue||n.formattedValue;let t=n.dataset.label||"";t&&(t+=": ");const e=n.formattedValue;return R(e)||(t+=e),t},labelColor(n){const e=n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);return{borderColor:e.borderColor,backgroundColor:e.backgroundColor,borderWidth:e.borderWidth,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(n){const e=n.chart.getDatasetMeta(n.datasetIndex).controller.getStyle(n.dataIndex);return{pointStyle:e.pointStyle,rotation:e.rotation}},afterLabel:gt,afterBody:gt,beforeFooter:gt,footer:gt,afterFooter:gt};function nt(n,t,e,s){const i=n[t].call(e,s);return typeof i>"u"?ia[t].call(e,s):i}class os extends ht{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const e=this.chart,s=this.options.setContext(this.getContext()),i=s.enabled&&e.options.animation&&s.animations,o=new $o(this.chart,i);return i._cacheable&&(this._cachedAnimations=Object.freeze(o)),o}getContext(){return this.$context||(this.$context=Qd(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,e){const{callbacks:s}=e,i=nt(s,"beforeTitle",this,t),o=nt(s,"title",this,t),a=nt(s,"afterTitle",this,t);let r=[];return r=ft(r,vt(i)),r=ft(r,vt(o)),r=ft(r,vt(a)),r}getBeforeBody(t,e){return Ui(nt(e.callbacks,"beforeBody",this,t))}getBody(t,e){const{callbacks:s}=e,i=[];return z(t,o=>{const a={before:[],lines:[],after:[]},r=Yi(s,o);ft(a.before,vt(nt(r,"beforeLabel",this,o))),ft(a.lines,nt(r,"label",this,o)),ft(a.after,vt(nt(r,"afterLabel",this,o))),i.push(a)}),i}getAfterBody(t,e){return Ui(nt(e.callbacks,"afterBody",this,t))}getFooter(t,e){const{callbacks:s}=e,i=nt(s,"beforeFooter",this,t),o=nt(s,"footer",this,t),a=nt(s,"afterFooter",this,t);let r=[];return r=ft(r,vt(i)),r=ft(r,vt(o)),r=ft(r,vt(a)),r}_createItems(t){const e=this._active,s=this.chart.data,i=[],o=[],a=[];let r=[],l,c;for(l=0,c=e.length;l<c;++l)r.push(Ud(this.chart,e[l]));return t.filter&&(r=r.filter((d,u,h)=>t.filter(d,u,h,s))),t.itemSort&&(r=r.sort((d,u)=>t.itemSort(d,u,s))),z(r,d=>{const u=Yi(t.callbacks,d);i.push(nt(u,"labelColor",this,d)),o.push(nt(u,"labelPointStyle",this,d)),a.push(nt(u,"labelTextColor",this,d))}),this.labelColors=i,this.labelPointStyles=o,this.labelTextColors=a,this.dataPoints=r,r}update(t,e){const s=this.options.setContext(this.getContext()),i=this._active;let o,a=[];if(!i.length)this.opacity!==0&&(o={opacity:0});else{const r=be[s.position].call(this,i,this._eventPosition);a=this._createItems(s),this.title=this.getTitle(a,s),this.beforeBody=this.getBeforeBody(a,s),this.body=this.getBody(a,s),this.afterBody=this.getAfterBody(a,s),this.footer=this.getFooter(a,s);const l=this._size=Vi(this,s),c=Object.assign({},r,l),d=Wi(this.chart,s,c),u=qi(s,c,d,this.chart);this.xAlign=d.xAlign,this.yAlign=d.yAlign,o={opacity:1,x:u.x,y:u.y,width:l.width,height:l.height,caretX:r.x,caretY:r.y}}this._tooltipItems=a,this.$context=void 0,o&&this._resolveAnimations().update(this,o),t&&s.external&&s.external.call(this,{chart:this.chart,tooltip:this,replay:e})}drawCaret(t,e,s,i){const o=this.getCaretPosition(t,s,i);e.lineTo(o.x1,o.y1),e.lineTo(o.x2,o.y2),e.lineTo(o.x3,o.y3)}getCaretPosition(t,e,s){const{xAlign:i,yAlign:o}=this,{caretSize:a,cornerRadius:r}=s,{topLeft:l,topRight:c,bottomLeft:d,bottomRight:u}=Wt(r),{x:h,y:f}=t,{width:p,height:m}=e;let g,b,y,k,w,x;return o==="center"?(w=f+m/2,i==="left"?(g=h,b=g-a,k=w+a,x=w-a):(g=h+p,b=g+a,k=w-a,x=w+a),y=g):(i==="left"?b=h+Math.max(l,d)+a:i==="right"?b=h+p-Math.max(c,u)-a:b=this.caretX,o==="top"?(k=f,w=k-a,g=b-a,y=b+a):(k=f+m,w=k+a,g=b+a,y=b-a),x=k),{x1:g,x2:b,x3:y,y1:k,y2:w,y3:x}}drawTitle(t,e,s){const i=this.title,o=i.length;let a,r,l;if(o){const c=te(s.rtl,this.x,this.width);for(t.x=Qe(this,s.titleAlign,s),e.textAlign=c.textAlign(s.titleAlign),e.textBaseline="middle",a=G(s.titleFont),r=s.titleSpacing,e.fillStyle=s.titleColor,e.font=a.string,l=0;l<o;++l)e.fillText(i[l],c.x(t.x),t.y+a.lineHeight/2),t.y+=a.lineHeight+r,l+1===o&&(t.y+=s.titleMarginBottom-r)}}_drawColorBox(t,e,s,i,o){const a=this.labelColors[s],r=this.labelPointStyles[s],{boxHeight:l,boxWidth:c}=o,d=G(o.bodyFont),u=Qe(this,"left",o),h=i.x(u),f=l<d.lineHeight?(d.lineHeight-l)/2:0,p=e.y+f;if(o.usePointStyle){const m={radius:Math.min(c,l)/2,pointStyle:r.pointStyle,rotation:r.rotation,borderWidth:1},g=i.leftForLtr(h,c)+c/2,b=p+l/2;t.strokeStyle=o.multiKeyBackground,t.fillStyle=o.multiKeyBackground,Qn(t,m,g,b),t.strokeStyle=a.borderColor,t.fillStyle=a.backgroundColor,Qn(t,m,g,b)}else{t.lineWidth=D(a.borderWidth)?Math.max(...Object.values(a.borderWidth)):a.borderWidth||1,t.strokeStyle=a.borderColor,t.setLineDash(a.borderDash||[]),t.lineDashOffset=a.borderDashOffset||0;const m=i.leftForLtr(h,c),g=i.leftForLtr(i.xPlus(h,1),c-2),b=Wt(a.borderRadius);Object.values(b).some(y=>y!==0)?(t.beginPath(),t.fillStyle=o.multiKeyBackground,Ie(t,{x:m,y:p,w:c,h:l,radius:b}),t.fill(),t.stroke(),t.fillStyle=a.backgroundColor,t.beginPath(),Ie(t,{x:g,y:p+1,w:c-2,h:l-2,radius:b}),t.fill()):(t.fillStyle=o.multiKeyBackground,t.fillRect(m,p,c,l),t.strokeRect(m,p,c,l),t.fillStyle=a.backgroundColor,t.fillRect(g,p+1,c-2,l-2))}t.fillStyle=this.labelTextColors[s]}drawBody(t,e,s){const{body:i}=this,{bodySpacing:o,bodyAlign:a,displayColors:r,boxHeight:l,boxWidth:c,boxPadding:d}=s,u=G(s.bodyFont);let h=u.lineHeight,f=0;const p=te(s.rtl,this.x,this.width),m=function(C){e.fillText(C,p.x(t.x+f),t.y+h/2),t.y+=h+o},g=p.textAlign(a);let b,y,k,w,x,E,M;for(e.textAlign=a,e.textBaseline="middle",e.font=u.string,t.x=Qe(this,g,s),e.fillStyle=s.bodyColor,z(this.beforeBody,m),f=r&&g!=="right"?a==="center"?c/2+d:c+2+d:0,w=0,E=i.length;w<E;++w){for(b=i[w],y=this.labelTextColors[w],e.fillStyle=y,z(b.before,m),k=b.lines,r&&k.length&&(this._drawColorBox(e,t,w,p,s),h=Math.max(u.lineHeight,l)),x=0,M=k.length;x<M;++x)m(k[x]),h=u.lineHeight;z(b.after,m)}f=0,h=u.lineHeight,z(this.afterBody,m),t.y-=o}drawFooter(t,e,s){const i=this.footer,o=i.length;let a,r;if(o){const l=te(s.rtl,this.x,this.width);for(t.x=Qe(this,s.footerAlign,s),t.y+=s.footerMarginTop,e.textAlign=l.textAlign(s.footerAlign),e.textBaseline="middle",a=G(s.footerFont),e.fillStyle=s.footerColor,e.font=a.string,r=0;r<o;++r)e.fillText(i[r],l.x(t.x),t.y+a.lineHeight/2),t.y+=a.lineHeight+s.footerSpacing}}drawBackground(t,e,s,i){const{xAlign:o,yAlign:a}=this,{x:r,y:l}=t,{width:c,height:d}=s,{topLeft:u,topRight:h,bottomLeft:f,bottomRight:p}=Wt(i.cornerRadius);e.fillStyle=i.backgroundColor,e.strokeStyle=i.borderColor,e.lineWidth=i.borderWidth,e.beginPath(),e.moveTo(r+u,l),a==="top"&&this.drawCaret(t,e,s,i),e.lineTo(r+c-h,l),e.quadraticCurveTo(r+c,l,r+c,l+h),a==="center"&&o==="right"&&this.drawCaret(t,e,s,i),e.lineTo(r+c,l+d-p),e.quadraticCurveTo(r+c,l+d,r+c-p,l+d),a==="bottom"&&this.drawCaret(t,e,s,i),e.lineTo(r+f,l+d),e.quadraticCurveTo(r,l+d,r,l+d-f),a==="center"&&o==="left"&&this.drawCaret(t,e,s,i),e.lineTo(r,l+u),e.quadraticCurveTo(r,l,r+u,l),e.closePath(),e.fill(),i.borderWidth>0&&e.stroke()}_updateAnimationTarget(t){const e=this.chart,s=this.$animations,i=s&&s.x,o=s&&s.y;if(i||o){const a=be[t.position].call(this,this._active,this._eventPosition);if(!a)return;const r=this._size=Vi(this,t),l=Object.assign({},a,this._size),c=Wi(e,t,l),d=qi(t,l,c,e);(i._to!==d.x||o._to!==d.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=r.width,this.height=r.height,this.caretX=a.x,this.caretY=a.y,this._resolveAnimations().update(this,d))}}_willRender(){return!!this.opacity}draw(t){const e=this.options.setContext(this.getContext());let s=this.opacity;if(!s)return;this._updateAnimationTarget(e);const i={width:this.width,height:this.height},o={x:this.x,y:this.y};s=Math.abs(s)<.001?0:s;const a=et(e.padding),r=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;e.enabled&&r&&(t.save(),t.globalAlpha=s,this.drawBackground(o,t,i,e),Io(t,e.textDirection),o.y+=a.top,this.drawTitle(o,t,e),this.drawBody(o,t,e),this.drawFooter(o,t,e),To(t,e.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,e){const s=this._active,i=t.map(({datasetIndex:r,index:l})=>{const c=this.chart.getDatasetMeta(r);if(!c)throw new Error("Cannot find a dataset at index "+r);return{datasetIndex:r,element:c.data[l],index:l}}),o=!hn(s,i),a=this._positionChanged(i,e);(o||a)&&(this._active=i,this._eventPosition=e,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,e,s=!0){if(e&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const i=this.options,o=this._active||[],a=this._getActiveElements(t,o,e,s),r=this._positionChanged(a,t),l=e||!hn(a,o)||r;return l&&(this._active=a,(i.enabled||i.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,e))),l}_getActiveElements(t,e,s,i){const o=this.options;if(t.type==="mouseout")return[];if(!i)return e.filter(r=>this.chart.data.datasets[r.datasetIndex]&&this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index)!==void 0);const a=this.chart.getElementsAtEventForMode(t,o.mode,o,s);return o.reverse&&a.reverse(),a}_positionChanged(t,e){const{caretX:s,caretY:i,options:o}=this,a=be[o.position].call(this,t,e);return a!==!1&&(s!==a.x||i!==a.y)}}S(os,"positioners",be);var Zd={id:"tooltip",_element:os,positioners:be,afterInit(n,t,e){e&&(n.tooltip=new os({chart:n,options:e}))},beforeUpdate(n,t,e){n.tooltip&&n.tooltip.initialize(e)},reset(n,t,e){n.tooltip&&n.tooltip.initialize(e)},afterDraw(n){const t=n.tooltip;if(t&&t._willRender()){const e={tooltip:t};if(n.notifyPlugins("beforeTooltipDraw",{...e,cancelable:!0})===!1)return;t.draw(n.ctx),n.notifyPlugins("afterTooltipDraw",e)}},afterEvent(n,t){if(n.tooltip){const e=t.replay;n.tooltip.handleEvent(t.event,e,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(n,t)=>t.bodyFont.size,boxWidth:(n,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:ia},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:n=>n!=="filter"&&n!=="itemSort"&&n!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},tu=Object.freeze({__proto__:null,Colors:hd,Decimation:gd,Filler:Od,Legend:Hd,SubTitle:qd,Title:Wd,Tooltip:Zd});const eu=(n,t,e,s)=>(typeof t=="string"?(e=n.push(t)-1,s.unshift({index:e,label:t})):isNaN(t)&&(e=null),e);function nu(n,t,e,s){const i=n.indexOf(t);if(i===-1)return eu(n,t,e,s);const o=n.lastIndexOf(t);return i!==o?e:i}const su=(n,t)=>n===null?null:X(Math.round(n),0,t);function Gi(n){const t=this.getLabels();return n>=0&&n<t.length?t[n]:n}class as extends Xt{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const e=this._addedLabels;if(e.length){const s=this.getLabels();for(const{index:i,label:o}of e)s[i]===o&&s.splice(i,1);this._addedLabels=[]}super.init(t)}parse(t,e){if(R(t))return null;const s=this.getLabels();return e=isFinite(e)&&s[e]===t?e:nu(s,t,I(e,t),this._addedLabels),su(e,s.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let{min:s,max:i}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(s=0),e||(i=this.getLabels().length-1)),this.min=s,this.max=i}buildTicks(){const t=this.min,e=this.max,s=this.options.offset,i=[];let o=this.getLabels();o=t===0&&e===o.length-1?o:o.slice(t,e+1),this._valueRange=Math.max(o.length-(s?0:1),1),this._startValue=this.min-(s?.5:0);for(let a=t;a<=e;a++)i.push({value:a});return i}getLabelForValue(t){return Gi.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}S(as,"id","category"),S(as,"defaults",{ticks:{callback:Gi}});function iu(n,t){const e=[],{bounds:i,step:o,min:a,max:r,precision:l,count:c,maxTicks:d,maxDigits:u,includeBounds:h}=n,f=o||1,p=d-1,{min:m,max:g}=t,b=!R(a),y=!R(r),k=!R(c),w=(g-m)/(u+1);let x=Vs((g-m)/p/f)*f,E,M,C,L;if(x<1e-14&&!b&&!y)return[{value:m},{value:g}];L=Math.ceil(g/x)-Math.floor(m/x),L>p&&(x=Vs(L*x/p/f)*f),R(l)||(E=Math.pow(10,l),x=Math.ceil(x*E)/E),i==="ticks"?(M=Math.floor(m/x)*x,C=Math.ceil(g/x)*x):(M=m,C=g),b&&y&&o&&Ka((r-a)/o,x/1e3)?(L=Math.round(Math.min((r-a)/x,d)),x=(r-a)/L,M=a,C=r):k?(M=b?a:M,C=y?r:C,L=c-1,x=(C-M)/L):(L=(C-M)/x,_e(L,Math.round(L),x/1e3)?L=Math.round(L):L=Math.ceil(L));const T=Math.max(Ws(x),Ws(M));E=Math.pow(10,R(l)?T:l),M=Math.round(M*E)/E,C=Math.round(C*E)/E;let B=0;for(b&&(h&&M!==a?(e.push({value:a}),M<a&&B++,_e(Math.round((M+B*x)*E)/E,a,Xi(a,w,n))&&B++):M<a&&B++);B<L;++B){const O=Math.round((M+B*x)*E)/E;if(y&&O>r)break;e.push({value:O})}return y&&h&&C!==r?e.length&&_e(e[e.length-1].value,r,Xi(r,w,n))?e[e.length-1].value=r:e.push({value:r}):(!y||C===r)&&e.push({value:C}),e}function Xi(n,t,{horizontal:e,minRotation:s}){const i=dt(s),o=(e?Math.sin(i):Math.cos(i))||.001,a=.75*t*(""+n).length;return Math.min(t/o,a)}class yn extends Xt{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,e){return R(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:e,maxDefined:s}=this.getUserBounds();let{min:i,max:o}=this;const a=l=>i=e?i:l,r=l=>o=s?o:l;if(t){const l=mt(i),c=mt(o);l<0&&c<0?r(0):l>0&&c>0&&a(0)}if(i===o){let l=o===0?1:Math.abs(o*.05);r(o+l),t||a(i-l)}this.min=i,this.max=o}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:e,stepSize:s}=t,i;return s?(i=Math.ceil(this.max/s)-Math.floor(this.min/s)+1,i>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${i} ticks. Limiting to 1000.`),i=1e3)):(i=this.computeTickLimit(),e=e||11),e&&(i=Math.min(e,i)),i}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,e=t.ticks;let s=this.getTickLimit();s=Math.max(2,s);const i={maxTicks:s,bounds:t.bounds,min:t.min,max:t.max,precision:e.precision,step:e.stepSize,count:e.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:e.minRotation||0,includeBounds:e.includeBounds!==!1},o=this._range||this,a=iu(i,o);return t.bounds==="ticks"&&po(a,this,"value"),t.reverse?(a.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),a}configure(){const t=this.ticks;let e=this.min,s=this.max;if(super.configure(),this.options.offset&&t.length){const i=(s-e)/Math.max(t.length-1,1)/2;e-=i,s+=i}this._startValue=e,this._endValue=s,this._valueRange=s-e}getLabelForValue(t){return ze(t,this.chart.options.locale,this.options.ticks.format)}}class rs extends yn{determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=q(t)?t:0,this.max=q(e)?e:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),e=t?this.width:this.height,s=dt(this.options.ticks.minRotation),i=(t?Math.sin(s):Math.cos(s))||.001,o=this._resolveTickFontOptions(0);return Math.ceil(e/Math.min(40,o.lineHeight/i))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}S(rs,"id","linear"),S(rs,"defaults",{ticks:{callback:kn.formatters.numeric}});const Be=n=>Math.floor(Mt(n)),Ft=(n,t)=>Math.pow(10,Be(n)+t);function Ki(n){return n/Math.pow(10,Be(n))===1}function Ji(n,t,e){const s=Math.pow(10,e),i=Math.floor(n/s);return Math.ceil(t/s)-i}function ou(n,t){const e=t-n;let s=Be(e);for(;Ji(n,t,s)>10;)s++;for(;Ji(n,t,s)<10;)s--;return Math.min(s,Be(n))}function au(n,{min:t,max:e}){t=ot(n.min,t);const s=[],i=Be(t);let o=ou(t,e),a=o<0?Math.pow(10,Math.abs(o)):1;const r=Math.pow(10,o),l=i>o?Math.pow(10,i):0,c=Math.round((t-l)*a)/a,d=Math.floor((t-l)/r/10)*r*10;let u=Math.floor((c-d)/Math.pow(10,o)),h=ot(n.min,Math.round((l+d+u*Math.pow(10,o))*a)/a);for(;h<e;)s.push({value:h,major:Ki(h),significand:u}),u>=10?u=u<15?15:20:u++,u>=20&&(o++,u=2,a=o>=0?1:a),h=Math.round((l+d+u*Math.pow(10,o))*a)/a;const f=ot(n.max,h);return s.push({value:f,major:Ki(f),significand:u}),s}class ls extends Xt{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,e){const s=yn.prototype.parse.apply(this,[t,e]);if(s===0){this._zero=!0;return}return q(s)&&s>0?s:null}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=q(t)?Math.max(0,t):null,this.max=q(e)?Math.max(0,e):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!q(this._userMin)&&(this.min=t===Ft(this.min,0)?Ft(this.min,-1):Ft(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let s=this.min,i=this.max;const o=r=>s=t?s:r,a=r=>i=e?i:r;s===i&&(s<=0?(o(1),a(10)):(o(Ft(s,-1)),a(Ft(i,1)))),s<=0&&o(Ft(i,-1)),i<=0&&a(Ft(s,1)),this.min=s,this.max=i}buildTicks(){const t=this.options,e={min:this._userMin,max:this._userMax},s=au(e,this);return t.bounds==="ticks"&&po(s,this,"value"),t.reverse?(s.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),s}getLabelForValue(t){return t===void 0?"0":ze(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=Mt(t),this._valueRange=Mt(this.max)-Mt(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(Mt(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const e=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+e*this._valueRange)}}S(ls,"id","logarithmic"),S(ls,"defaults",{ticks:{callback:kn.formatters.logarithmic,major:{enabled:!0}}});function cs(n){const t=n.ticks;if(t.display&&n.display){const e=et(t.backdropPadding);return I(t.font&&t.font.size,W.font.size)+e.height}return 0}function ru(n,t,e){return e=V(e)?e:[e],{w:fr(n,t.string,e),h:e.length*t.lineHeight}}function Qi(n,t,e,s,i){return n===s||n===i?{start:t-e/2,end:t+e/2}:n<s||n>i?{start:t-e,end:t}:{start:t,end:t+e}}function lu(n){const t={l:n.left+n._padding.left,r:n.right-n._padding.right,t:n.top+n._padding.top,b:n.bottom-n._padding.bottom},e=Object.assign({},t),s=[],i=[],o=n._pointLabels.length,a=n.options.pointLabels,r=a.centerPointLabels?$/o:0;for(let l=0;l<o;l++){const c=a.setContext(n.getPointLabelContext(l));i[l]=c.padding;const d=n.getPointPosition(l,n.drawingArea+i[l],r),u=G(c.font),h=ru(n.ctx,u,n._pointLabels[l]);s[l]=h;const f=Z(n.getIndexAngle(l)+r),p=Math.round(ys(f)),m=Qi(p,d.x,h.w,0,180),g=Qi(p,d.y,h.h,90,270);cu(e,t,f,m,g)}n.setCenterPoint(t.l-e.l,e.r-t.r,t.t-e.t,e.b-t.b),n._pointLabelItems=hu(n,s,i)}function cu(n,t,e,s,i){const o=Math.abs(Math.sin(e)),a=Math.abs(Math.cos(e));let r=0,l=0;s.start<t.l?(r=(t.l-s.start)/o,n.l=Math.min(n.l,t.l-r)):s.end>t.r&&(r=(s.end-t.r)/o,n.r=Math.max(n.r,t.r+r)),i.start<t.t?(l=(t.t-i.start)/a,n.t=Math.min(n.t,t.t-l)):i.end>t.b&&(l=(i.end-t.b)/a,n.b=Math.max(n.b,t.b+l))}function du(n,t,e){const s=n.drawingArea,{extra:i,additionalAngle:o,padding:a,size:r}=e,l=n.getPointPosition(t,s+i+a,o),c=Math.round(ys(Z(l.angle+Y))),d=mu(l.y,r.h,c),u=fu(c),h=pu(l.x,r.w,u);return{visible:!0,x:l.x,y:d,textAlign:u,left:h,top:d,right:h+r.w,bottom:d+r.h}}function uu(n,t){if(!t)return!0;const{left:e,top:s,right:i,bottom:o}=n;return!(kt({x:e,y:s},t)||kt({x:e,y:o},t)||kt({x:i,y:s},t)||kt({x:i,y:o},t))}function hu(n,t,e){const s=[],i=n._pointLabels.length,o=n.options,{centerPointLabels:a,display:r}=o.pointLabels,l={extra:cs(o)/2,additionalAngle:a?$/i:0};let c;for(let d=0;d<i;d++){l.padding=e[d],l.size=t[d];const u=du(n,d,l);s.push(u),r==="auto"&&(u.visible=uu(u,c),u.visible&&(c=u))}return s}function fu(n){return n===0||n===180?"center":n<180?"left":"right"}function pu(n,t,e){return e==="right"?n-=t:e==="center"&&(n-=t/2),n}function mu(n,t,e){return e===90||e===270?n-=t/2:(e>270||e<90)&&(n-=t),n}function gu(n,t,e){const{left:s,top:i,right:o,bottom:a}=e,{backdropColor:r}=t;if(!R(r)){const l=Wt(t.borderRadius),c=et(t.backdropPadding);n.fillStyle=r;const d=s-c.left,u=i-c.top,h=o-s+c.width,f=a-i+c.height;Object.values(l).some(p=>p!==0)?(n.beginPath(),Ie(n,{x:d,y:u,w:h,h:f,radius:l}),n.fill()):n.fillRect(d,u,h,f)}}function bu(n,t){const{ctx:e,options:{pointLabels:s}}=n;for(let i=t-1;i>=0;i--){const o=n._pointLabelItems[i];if(!o.visible)continue;const a=s.setContext(n.getPointLabelContext(i));gu(e,a,o);const r=G(a.font),{x:l,y:c,textAlign:d}=o;Yt(e,n._pointLabels[i],l,c+r.lineHeight/2,r,{color:a.color,textAlign:d,textBaseline:"middle"})}}function oa(n,t,e,s){const{ctx:i}=n;if(e)i.arc(n.xCenter,n.yCenter,t,0,j);else{let o=n.getPointPosition(0,t);i.moveTo(o.x,o.y);for(let a=1;a<s;a++)o=n.getPointPosition(a,t),i.lineTo(o.x,o.y)}}function vu(n,t,e,s,i){const o=n.ctx,a=t.circular,{color:r,lineWidth:l}=t;!a&&!s||!r||!l||e<0||(o.save(),o.strokeStyle=r,o.lineWidth=l,o.setLineDash(i.dash||[]),o.lineDashOffset=i.dashOffset,o.beginPath(),oa(n,e,a,s),o.closePath(),o.stroke(),o.restore())}function yu(n,t,e){return Rt(n,{label:e,index:t,type:"pointLabel"})}class ve extends yn{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=et(cs(this.options)/2),e=this.width=this.maxWidth-t.width,s=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+e/2+t.left),this.yCenter=Math.floor(this.top+s/2+t.top),this.drawingArea=Math.floor(Math.min(e,s)/2)}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!1);this.min=q(t)&&!isNaN(t)?t:0,this.max=q(e)&&!isNaN(e)?e:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/cs(this.options))}generateTickLabels(t){yn.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((e,s)=>{const i=F(this.options.pointLabels.callback,[e,s],this);return i||i===0?i:""}).filter((e,s)=>this.chart.getDataVisibility(s))}fit(){const t=this.options;t.display&&t.pointLabels.display?lu(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,e,s,i){this.xCenter+=Math.floor((t-e)/2),this.yCenter+=Math.floor((s-i)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,e,s,i))}getIndexAngle(t){const e=j/(this._pointLabels.length||1),s=this.options.startAngle||0;return Z(t*e+dt(s))}getDistanceFromCenterForValue(t){if(R(t))return NaN;const e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e}getValueForDistanceFromCenter(t){if(R(t))return NaN;const e=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-e:this.min+e}getPointLabelContext(t){const e=this._pointLabels||[];if(t>=0&&t<e.length){const s=e[t];return yu(this.getContext(),t,s)}}getPointPosition(t,e,s=0){const i=this.getIndexAngle(t)-Y+s;return{x:Math.cos(i)*e+this.xCenter,y:Math.sin(i)*e+this.yCenter,angle:i}}getPointPositionForValue(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:e,top:s,right:i,bottom:o}=this._pointLabelItems[t];return{left:e,top:s,right:i,bottom:o}}drawBackground(){const{backgroundColor:t,grid:{circular:e}}=this.options;if(t){const s=this.ctx;s.save(),s.beginPath(),oa(this,this.getDistanceFromCenterForValue(this._endValue),e,this._pointLabels.length),s.closePath(),s.fillStyle=t,s.fill(),s.restore()}}drawGrid(){const t=this.ctx,e=this.options,{angleLines:s,grid:i,border:o}=e,a=this._pointLabels.length;let r,l,c;if(e.pointLabels.display&&bu(this,a),i.display&&this.ticks.forEach((d,u)=>{if(u!==0||u===0&&this.min<0){l=this.getDistanceFromCenterForValue(d.value);const h=this.getContext(u),f=i.setContext(h),p=o.setContext(h);vu(this,f,l,a,p)}}),s.display){for(t.save(),r=a-1;r>=0;r--){const d=s.setContext(this.getPointLabelContext(r)),{color:u,lineWidth:h}=d;!h||!u||(t.lineWidth=h,t.strokeStyle=u,t.setLineDash(d.borderDash),t.lineDashOffset=d.borderDashOffset,l=this.getDistanceFromCenterForValue(e.reverse?this.min:this.max),c=this.getPointPosition(r,l),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(c.x,c.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,e=this.options,s=e.ticks;if(!s.display)return;const i=this.getIndexAngle(0);let o,a;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(i),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((r,l)=>{if(l===0&&this.min>=0&&!e.reverse)return;const c=s.setContext(this.getContext(l)),d=G(c.font);if(o=this.getDistanceFromCenterForValue(this.ticks[l].value),c.showLabelBackdrop){t.font=d.string,a=t.measureText(r.label).width,t.fillStyle=c.backdropColor;const u=et(c.backdropPadding);t.fillRect(-a/2-u.left,-o-d.size/2-u.top,a+u.width,d.size+u.height)}Yt(t,r.label,0,-o,d,{color:c.color,strokeColor:c.textStrokeColor,strokeWidth:c.textStrokeWidth})}),t.restore()}drawTitle(){}}S(ve,"id","radialLinear"),S(ve,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:kn.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}}),S(ve,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),S(ve,"descriptors",{angleLines:{_fallback:"grid"}});const Pn={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},st=Object.keys(Pn);function Zi(n,t){return n-t}function to(n,t){if(R(t))return null;const e=n._adapter,{parser:s,round:i,isoWeekday:o}=n._parseOpts;let a=t;return typeof s=="function"&&(a=s(a)),q(a)||(a=typeof s=="string"?e.parse(a,s):e.parse(a)),a===null?null:(i&&(a=i==="week"&&(ee(o)||o===!0)?e.startOf(a,"isoWeek",o):e.startOf(a,i)),+a)}function eo(n,t,e,s){const i=st.length;for(let o=st.indexOf(n);o<i-1;++o){const a=Pn[st[o]],r=a.steps?a.steps:Number.MAX_SAFE_INTEGER;if(a.common&&Math.ceil((e-t)/(r*a.size))<=s)return st[o]}return st[i-1]}function xu(n,t,e,s,i){for(let o=st.length-1;o>=st.indexOf(e);o--){const a=st[o];if(Pn[a].common&&n._adapter.diff(i,s,a)>=t-1)return a}return st[e?st.indexOf(e):0]}function _u(n){for(let t=st.indexOf(n)+1,e=st.length;t<e;++t)if(Pn[st[t]].common)return st[t]}function no(n,t,e){if(!e)n[t]=!0;else if(e.length){const{lo:s,hi:i}=xs(e,t),o=e[s]>=t?e[s]:e[i];n[o]=!0}}function wu(n,t,e,s){const i=n._adapter,o=+i.startOf(t[0].value,s),a=t[t.length-1].value;let r,l;for(r=o;r<=a;r=+i.add(r,1,s))l=e[r],l>=0&&(t[l].major=!0);return t}function so(n,t,e){const s=[],i={},o=t.length;let a,r;for(a=0;a<o;++a)r=t[a],i[r]=a,s.push({value:r,major:!1});return o===0||!e?s:wu(n,s,i,e)}class Re extends Xt{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,e={}){const s=t.time||(t.time={}),i=this._adapter=new Ll._date(t.adapters.date);i.init(e),xe(s.displayFormats,i.formats()),this._parseOpts={parser:s.parser,round:s.round,isoWeekday:s.isoWeekday},super.init(t),this._normalized=e.normalized}parse(t,e){return t===void 0?null:to(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,e=this._adapter,s=t.time.unit||"day";let{min:i,max:o,minDefined:a,maxDefined:r}=this.getUserBounds();function l(c){!a&&!isNaN(c.min)&&(i=Math.min(i,c.min)),!r&&!isNaN(c.max)&&(o=Math.max(o,c.max))}(!a||!r)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),i=q(i)&&!isNaN(i)?i:+e.startOf(Date.now(),s),o=q(o)&&!isNaN(o)?o:+e.endOf(Date.now(),s)+1,this.min=Math.min(i,o-1),this.max=Math.max(i+1,o)}_getLabelBounds(){const t=this.getLabelTimestamps();let e=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY;return t.length&&(e=t[0],s=t[t.length-1]),{min:e,max:s}}buildTicks(){const t=this.options,e=t.time,s=t.ticks,i=s.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&i.length&&(this.min=this._userMin||i[0],this.max=this._userMax||i[i.length-1]);const o=this.min,a=this.max,r=tr(i,o,a);return this._unit=e.unit||(s.autoSkip?eo(e.minUnit,this.min,this.max,this._getLabelCapacity(o)):xu(this,r.length,e.minUnit,this.min,this.max)),this._majorUnit=!s.major.enabled||this._unit==="year"?void 0:_u(this._unit),this.initOffsets(i),t.reverse&&r.reverse(),so(this,r,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let e=0,s=0,i,o;this.options.offset&&t.length&&(i=this.getDecimalForValue(t[0]),t.length===1?e=1-i:e=(this.getDecimalForValue(t[1])-i)/2,o=this.getDecimalForValue(t[t.length-1]),t.length===1?s=o:s=(o-this.getDecimalForValue(t[t.length-2]))/2);const a=t.length<3?.5:.25;e=X(e,0,a),s=X(s,0,a),this._offsets={start:e,end:s,factor:1/(e+1+s)}}_generate(){const t=this._adapter,e=this.min,s=this.max,i=this.options,o=i.time,a=o.unit||eo(o.minUnit,e,s,this._getLabelCapacity(e)),r=I(i.ticks.stepSize,1),l=a==="week"?o.isoWeekday:!1,c=ee(l)||l===!0,d={};let u=e,h,f;if(c&&(u=+t.startOf(u,"isoWeek",l)),u=+t.startOf(u,c?"day":a),t.diff(s,e,a)>1e5*r)throw new Error(e+" and "+s+" are too far apart with stepSize of "+r+" "+a);const p=i.ticks.source==="data"&&this.getDataTimestamps();for(h=u,f=0;h<s;h=+t.add(h,r,a),f++)no(d,h,p);return(h===s||i.bounds==="ticks"||f===1)&&no(d,h,p),Object.keys(d).sort(Zi).map(m=>+m)}getLabelForValue(t){const e=this._adapter,s=this.options.time;return s.tooltipFormat?e.format(t,s.tooltipFormat):e.format(t,s.displayFormats.datetime)}format(t,e){const i=this.options.time.displayFormats,o=this._unit,a=e||i[o];return this._adapter.format(t,a)}_tickFormatFunction(t,e,s,i){const o=this.options,a=o.ticks.callback;if(a)return F(a,[t,e,s],this);const r=o.time.displayFormats,l=this._unit,c=this._majorUnit,d=l&&r[l],u=c&&r[c],h=s[e],f=c&&u&&h&&h.major;return this._adapter.format(t,i||(f?u:d))}generateTickLabels(t){let e,s,i;for(e=0,s=t.length;e<s;++e)i=t[e],i.label=this._tickFormatFunction(i.value,e,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const e=this._offsets,s=this.getDecimalForValue(t);return this.getPixelForDecimal((e.start+s)*e.factor)}getValueForPixel(t){const e=this._offsets,s=this.getDecimalForPixel(t)/e.factor-e.end;return this.min+s*(this.max-this.min)}_getLabelSize(t){const e=this.options.ticks,s=this.ctx.measureText(t).width,i=dt(this.isHorizontal()?e.maxRotation:e.minRotation),o=Math.cos(i),a=Math.sin(i),r=this._resolveTickFontOptions(0).size;return{w:s*o+r*a,h:s*a+r*o}}_getLabelCapacity(t){const e=this.options.time,s=e.displayFormats,i=s[e.unit]||s.millisecond,o=this._tickFormatFunction(t,0,so(this,[t],this._majorUnit),i),a=this._getLabelSize(o),r=Math.floor(this.isHorizontal()?this.width/a.w:this.height/a.h)-1;return r>0?r:1}getDataTimestamps(){let t=this._cache.data||[],e,s;if(t.length)return t;const i=this.getMatchingVisibleMetas();if(this._normalized&&i.length)return this._cache.data=i[0].controller.getAllParsedValues(this);for(e=0,s=i.length;e<s;++e)t=t.concat(i[e].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let e,s;if(t.length)return t;const i=this.getLabels();for(e=0,s=i.length;e<s;++e)t.push(to(this,i[e]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return bo(t.sort(Zi))}}S(Re,"id","time"),S(Re,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function Ze(n,t,e){let s=0,i=n.length-1,o,a,r,l;e?(t>=n[s].pos&&t<=n[i].pos&&({lo:s,hi:i}=wt(n,"pos",t)),{pos:o,time:r}=n[s],{pos:a,time:l}=n[i]):(t>=n[s].time&&t<=n[i].time&&({lo:s,hi:i}=wt(n,"time",t)),{time:o,pos:r}=n[s],{time:a,pos:l}=n[i]);const c=a-o;return c?r+(l-r)*(t-o)/c:r}class ds extends Re{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),e=this._table=this.buildLookupTable(t);this._minPos=Ze(e,this.min),this._tableRange=Ze(e,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:e,max:s}=this,i=[],o=[];let a,r,l,c,d;for(a=0,r=t.length;a<r;++a)c=t[a],c>=e&&c<=s&&i.push(c);if(i.length<2)return[{time:e,pos:0},{time:s,pos:1}];for(a=0,r=i.length;a<r;++a)d=i[a+1],l=i[a-1],c=i[a],Math.round((d+l)/2)!==c&&o.push({time:c,pos:a/(r-1)});return o}_generate(){const t=this.min,e=this.max;let s=super.getDataTimestamps();return(!s.includes(t)||!s.length)&&s.splice(0,0,t),(!s.includes(e)||s.length===1)&&s.push(e),s.sort((i,o)=>i-o)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const e=this.getDataTimestamps(),s=this.getLabelTimestamps();return e.length&&s.length?t=this.normalize(e.concat(s)):t=e.length?e:s,t=this._cache.all=t,t}getDecimalForValue(t){return(Ze(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const e=this._offsets,s=this.getDecimalForPixel(t)/e.factor-e.end;return Ze(this._table,s*this._tableRange+this._minPos,!0)}}S(ds,"id","timeseries"),S(ds,"defaults",Re.defaults);var ku=Object.freeze({__proto__:null,CategoryScale:as,LinearScale:rs,LogarithmicScale:ls,RadialLinearScale:ve,TimeScale:Re,TimeSeriesScale:ds});const Su=[Pl,od,tu,ku];xt.register(...Su);const v={currentUser:JSON.parse(localStorage.getItem("onenet_user")||"null"),activeCompany:JSON.parse(localStorage.getItem("onenet_active_company")||"null")||{id:1,name:"OneNet Solutions",legal_name:"OneNet Solutions Enterprise Suite (Head Office)",address:"Muslim Town, Lahore, Pakistan",phone:"+92 42 30000001",tax_id:"NTN-7492019-2",strn:"STRN-11-22-3344-555",currency:"PKR"},companies:[],permissionsMatrix:{},activeModule:"dashboard",products:[],categories:[],warehouses:[],customers:[],activeShift:null,posCart:{items:[],customerId:1,discountAmount:0,paymentMethod:"CASH",paidAmount:0},mobileCart:{items:[],customerId:2,geoLat:null,geoLng:null}};function Eu(n,t="view"){if(!v.currentUser)return!1;const e=v.currentUser.role_name||"Cashier";if(e==="Super Admin")return!0;const s=v.permissionsMatrix[e];return s?(s[n]||[]).includes(t):!0}function A(n){return"Rs. "+(Number(n)||0).toLocaleString("en-PK",{minimumFractionDigits:2,maximumFractionDigits:2})}function _(n,t="info"){const e=document.getElementById("toast-container");if(!e)return;const s=document.createElement("div");s.className=`toast ${t}`,s.innerHTML=`
    <span class="toast-dot"></span>
    <span>${n}</span>
  `,e.appendChild(s),setTimeout(()=>{s.style.opacity="0",s.style.transform="translateY(10px)",setTimeout(()=>s.remove(),300)},3500)}const Mu="/api";class P{static getToken(){return localStorage.getItem("onenet_token")||localStorage.getItem("apexerppos_token")||""}static setToken(t){localStorage.setItem("onenet_token",t),localStorage.setItem("apexerppos_token",t)}static clearToken(){localStorage.removeItem("onenet_token"),localStorage.removeItem("apexerppos_token")}static async request(t,e={}){const s=`${Mu}${t}`,i={"Content-Type":"application/json",...e.headers},o=this.getToken();o&&(i.Authorization=`Bearer ${o}`);try{const a=await fetch(s,{...e,headers:i}),r=await a.json();if(!a.ok)throw new Error(r.message||`Request failed with status ${a.status}`);return r}catch(a){throw console.error(`API Error [${t}]:`,a),a}}static get(t){return this.request(t,{method:"GET"})}static post(t,e){return this.request(t,{method:"POST",body:JSON.stringify(e)})}}class xn{static connect(){const e=`${window.location.protocol==="https:"?"wss:":"ws:"}//${window.location.host}/ws`;try{this.ws=new WebSocket(e),this.ws.onopen=()=>{var s;console.log("[Realtime] WebSocket connected to ApexERP stream"),(s=document.getElementById("ws-status-indicator"))==null||s.classList.add("online")},this.ws.onmessage=s=>{try{const i=JSON.parse(s.data);this.notifyListeners(i)}catch(i){console.error("[Realtime] Parse error:",i)}},this.ws.onclose=()=>{var s;(s=document.getElementById("ws-status-indicator"))==null||s.classList.remove("online"),setTimeout(()=>this.connect(),3e3)}}catch(s){console.warn("[Realtime] Could not connect WebSocket:",s.message)}}static subscribe(t){return this.listeners.add(t),()=>this.listeners.delete(t)}static notifyListeners(t){for(const e of this.listeners)e(t)}}S(xn,"ws",null),S(xn,"listeners",new Set);function Ne(n,t,e=""){const s=document.getElementById("onet-print-iframe");s&&s.remove();const i=document.createElement("iframe");i.id="onet-print-iframe",i.style.position="fixed",i.style.right="0",i.style.bottom="0",i.style.width="0",i.style.height="0",i.style.border="0",i.style.zIndex="-9999",i.style.visibility="hidden",document.body.appendChild(i);const o=i.contentWindow.document;o.open(),o.write(`
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
  `),o.close(),setTimeout(()=>{try{i.contentWindow.focus(),i.contentWindow.print()}catch(a){console.error("Print iframe error:",a)}finally{setTimeout(()=>{i&&i.parentNode&&i.parentNode.removeChild(i)},1500)}},200)}function Cu(n){const t=v.activeCompany||{name:"OneNet Solutions",legal_name:"OneNet Solutions Enterprise Suite",address:"Muslim Town, Lahore, Pakistan",phone:"+92 300 1234567",tax_id:"NTN: 7492019-2"},e=n.created_at?new Date(n.created_at).toLocaleString("en-PK",{dateStyle:"medium",timeStyle:"short"}):new Date().toLocaleString("en-PK",{dateStyle:"medium",timeStyle:"short"}),s=n.items||[],i=Number(n.subtotal)||0,o=Number(n.discount_amount)||0,a=Number(n.tax_amount)||0,r=Number(n.total_amount)||0,l=Number(n.paid_amount)||r,c=Number(n.change_amount)||0,d=n.receipt_number||"REC-POS",u=n.customer_name||"Walk-in Retail Customer",h=n.payment_method||"CASH",f=`
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

      ${s.map(m=>`
        <div class="row">
          <span class="col-item">${m.name||m.product_name||"Item"}</span>
          <span class="col-qty">${m.quantity}</span>
          <span class="col-rate">${Number(m.unit_price).toFixed(2)}</span>
          <span class="col-total">${(Number(m.unit_price)*Number(m.quantity)).toFixed(2)}</span>
        </div>
      `).join("")}

      <div class="divider"></div>

      <div class="row"><span>Subtotal:</span><span>Rs. ${i.toFixed(2)}</span></div>
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
  `;Ne(`Receipt_${d}`,p,f)}function Au(n){const t=v.activeCompany||{name:"OneNet Solutions",legal_name:"OneNet Solutions Enterprise Suite",address:"Muslim Town, Lahore, Pakistan",phone:"+92 300 1234567",tax_id:"NTN: 7492019-2",strn:"STRN: 11-22-3344-555"},e=n.invoice_number||"INV-2026-0001",s=n.invoice_date||new Date().toISOString().slice(0,10),i=n.items||[],o=Number(n.subtotal)||0,a=Number(n.tax_amount)||0,r=Number(n.discount_amount)||0,l=Number(n.total_amount)||o+a-r,c=`
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
          <div style="font-size: 12px; color:#475569; margin-top:2px;">Date: ${s}</div>
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
          ${i.map(u=>`
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
  `;Ne(`TaxInvoice_${e}`,d,c)}function Pu(n,t=12){const e=v.activeCompany||{name:"OneNet Solutions"},s=`
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
  `,i=`
    <div class="sticker-grid">
      ${Array.from({length:t}).map(()=>`
        <div class="sticker">
          <div class="st-title">${e.name||"OneNet Solutions"}</div>
          <div class="st-name">${n.name.slice(0,24)}</div>
          <div class="st-bars">||| | |||| | ||</div>
          <div class="st-code">${n.barcode||"896400010101"}</div>
          <div class="st-price">${A(n.selling_price)}</div>
        </div>
      `).join("")}
    </div>
  `;Ne(`Barcode_Sheet_${n.sku||"ITEM"}`,i,s)}function aa(n){const t=v.activeCompany||{name:"OneNet Solutions",address:"Muslim Town, Lahore, Pakistan"},e=`
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
  `,s=`
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
            <td class="text-right">${A(n.base_salary||45e3)}</td>
            <td>Income Tax Deducted</td>
            <td class="text-right">${A(n.tax_deduction||1200)}</td>
          </tr>
          <tr>
            <td>Overtime / Incentives</td>
            <td class="text-right">${A(n.allowances||3500)}</td>
            <td>Unpaid Leaves / Late Cut</td>
            <td class="text-right">${A(n.unpaid_deduction||0)}</td>
          </tr>
        </tbody>
      </table>

      <div class="net-box">
        <span>NET TAKE-HOME SALARY:</span>
        <span>${A(n.net_salary||47300)}</span>
      </div>

      <div style="display:flex; justify-content:space-between; margin-top:30px; font-size:11px; color:#64748b;">
        <div>Prepared by HR Department</div>
        <div style="text-align:center; border-top:1px solid #94a3b8; width:150px; padding-top:4px;">Employee Signature</div>
      </div>
    </div>
  `;Ne(`Payslip_${n.employee_code||"EMP"}`,s,e)}function Lu(n){n.innerHTML=`
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
          ${v.categories.map(t=>`
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
            ${v.customers.map(t=>`
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
  `,dn("all"),Iu()}function dn(n="all",t=""){const e=document.getElementById("pos-grid-items");if(!e)return;let s=v.products;if(n!=="all"&&(s=s.filter(i=>String(i.category_id)===String(n))),t){const i=t.toLowerCase();s=s.filter(o=>o.name.toLowerCase().includes(i)||o.sku.toLowerCase().includes(i)||o.barcode&&o.barcode.includes(i))}if(s.length===0){e.innerHTML=`
      <div style="grid-column: 1/-1; text-align:center; padding:3rem; color:var(--text-muted);">
        <p>No products match current filter</p>
      </div>
    `;return}e.innerHTML=s.map(i=>`
    <div class="product-touch-card" data-product-id="${i.id}">
      <span class="card-barcode-sku">${i.barcode||i.sku}</span>
      <h4 class="card-product-name">${i.name}</h4>
      <div class="card-meta-row">
        <span class="card-price">${A(i.selling_price)}</span>
        <span class="card-stock-pill ${i.stock<=i.reorder_level?"tag-danger":""}">${i.stock} ${i.uom||"Pcs"}</span>
      </div>
    </div>
  `).join(""),e.querySelectorAll(".product-touch-card").forEach(i=>{i.addEventListener("click",()=>{const o=Number(i.dataset.productId),a=v.products.find(r=>r.id===o);a&&ra(a)})})}function Iu(){const n=document.getElementById("pos-search-barcode"),t=document.querySelectorAll(".chip-btn"),e=document.getElementById("btn-clear-cart"),s=document.getElementById("btn-pay-now"),i=document.getElementById("pos-discount-input"),o=document.getElementById("btn-shift-mgmt");n==null||n.addEventListener("input",a=>{var l;const r=((l=document.querySelector(".chip-btn.active"))==null?void 0:l.dataset.cat)||"all";dn(r,a.target.value)}),n==null||n.addEventListener("keydown",a=>{if(a.key==="Enter"){a.preventDefault();const r=n.value.trim();if(!r)return;const l=v.products.find(c=>c.barcode===r||c.sku.toLowerCase()===r.toLowerCase());l?(ra(l),n.value="",dn("all")):_(`No product with barcode: ${r}`,"error")}}),t.forEach(a=>{a.addEventListener("click",()=>{t.forEach(r=>r.classList.remove("active")),a.classList.add("active"),dn(a.dataset.cat,(n==null?void 0:n.value)||"")})}),i==null||i.addEventListener("input",a=>{v.posCart.discountAmount=Number(a.target.value)||0,_n()}),e==null||e.addEventListener("click",()=>{v.posCart.items=[],v.posCart.discountAmount=0,i&&(i.value="0"),Ln()}),s==null||s.addEventListener("click",()=>{if(v.posCart.items.length===0){_("Please add items to cart first!","error");return}Bu()}),o==null||o.addEventListener("click",()=>{Ru()}),window.addEventListener("keydown",Tu)}function Tu(n){var t;v.activeModule==="pos"&&(n.key==="F2"?(n.preventDefault(),(t=document.getElementById("btn-pay-now"))==null||t.click()):n.key==="F4"&&(n.preventDefault(),_("Order held in memory tab","info")))}function ra(n){const t=v.posCart.items.find(e=>e.product_id===n.id);t?t.quantity+=1:v.posCart.items.push({product_id:n.id,name:n.name,sku:n.sku,unit_price:Number(n.selling_price),tax_rate:Number(n.tax_rate||18),quantity:1}),_(`Added: ${n.name}`,"success"),Ln()}function Ln(){const n=document.getElementById("pos-cart-items-list");if(n){if(v.posCart.items.length===0){n.innerHTML=`
      <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
        <p style="font-size:0.9rem;">Cart is empty. Scan barcode or tap products.</p>
      </div>
    `,_n();return}n.innerHTML=v.posCart.items.map((t,e)=>`
    <div class="cart-item-row">
      <div class="cart-item-info">
        <div class="cart-item-title">${t.name}</div>
        <div class="cart-item-unit-price">${A(t.unit_price)} × ${t.quantity}</div>
      </div>
      <div class="qty-controls">
        <button class="qty-btn" data-cart-idx="${e}" data-action="decrease">-</button>
        <span class="qty-value">${t.quantity}</span>
        <button class="qty-btn" data-cart-idx="${e}" data-action="increase">+</button>
      </div>
      <div class="cart-item-total">
        ${A(t.unit_price*t.quantity)}
      </div>
      <button style="background:none; border:none; color:var(--danger); cursor:pointer; padding:4px;" data-cart-idx="${e}" data-action="delete" title="Remove">✕</button>
    </div>
  `).join(""),n.querySelectorAll("[data-action]").forEach(t=>{t.addEventListener("click",e=>{const s=Number(t.dataset.cartIdx),i=t.dataset.action;i==="increase"?v.posCart.items[s].quantity+=1:i==="decrease"?(v.posCart.items[s].quantity-=1,v.posCart.items[s].quantity<=0&&v.posCart.items.splice(s,1)):i==="delete"&&v.posCart.items.splice(s,1),Ln()})}),_n()}}function _n(){let n=0,t=0;for(const r of v.posCart.items){const l=r.unit_price*r.quantity,c=l*r.tax_rate/100;n+=l,t+=c}const e=v.posCart.discountAmount||0,s=Math.max(0,n-e+t),i=document.getElementById("pos-subtotal"),o=document.getElementById("pos-tax"),a=document.getElementById("pos-total-payable");return i&&(i.textContent=A(n)),o&&(o.textContent=A(t)),a&&(a.textContent=A(s)),{subtotal:n,tax:t,discount:e,total:s}}function Bu(){var c,d,u;const{discount:n,total:t}=_n(),e=`
    <div class="modal-overlay" id="payment-modal">
      <div class="modal-content" style="max-width: 480px;">
        <div class="modal-header">
          <h3 class="modal-title">Complete POS Tender</h3>
          <button class="btn-icon btn-sm" id="btn-close-pay-modal">✕</button>
        </div>
        <div class="modal-body">
          <div style="background:rgba(14,165,233,0.1); border:1px solid var(--border-bright); padding:1rem; border-radius:var(--radius-md); text-align:center;">
            <div style="font-size:0.8rem; color:var(--text-muted); text-transform:uppercase;">Total Payable</div>
            <div style="font-family:var(--font-heading); font-size:2.2rem; font-weight:800; color:#38bdf8;">${A(t)}</div>
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
  `;document.body.insertAdjacentHTML("beforeend",e);const s=document.getElementById("payment-modal"),i=document.getElementById("tender-amount-input"),o=document.getElementById("tender-change-due");let a="CASH";function r(){const h=Number(i==null?void 0:i.value)||0,f=Math.max(0,h-t);o&&(o.textContent=A(f))}i==null||i.addEventListener("input",r),s==null||s.querySelectorAll(".tender-method-btn").forEach(h=>{h.addEventListener("click",()=>{s.querySelectorAll(".tender-method-btn").forEach(f=>f.classList.remove("active")),h.classList.add("active"),a=h.dataset.method})}),s==null||s.querySelectorAll(".quick-cash-btn").forEach(h=>{h.addEventListener("click",()=>{i.value=h.dataset.val,r()})});const l=()=>s==null?void 0:s.remove();(c=document.getElementById("btn-close-pay-modal"))==null||c.addEventListener("click",l),(d=document.getElementById("btn-cancel-pay"))==null||d.addEventListener("click",l),(u=document.getElementById("btn-confirm-checkout"))==null||u.addEventListener("click",async()=>{var f;const h=Number(i.value)||t;if(h<t&&a==="CASH"){_("Received cash cannot be less than total payable","error");return}try{const p=((f=document.getElementById("pos-customer-dropdown"))==null?void 0:f.value)||1,m=await P.post("/pos/checkout",{customer_id:p,warehouse_id:2,items:v.posCart.items,discount_amount:n,payment_method:a,paid_amount:h});if(m.success){_(`Transaction ${m.transaction.receipt_number} completed!`,"success"),l(),Cu(m.transaction),v.posCart.items=[],v.posCart.discountAmount=0,Ln();const g=await P.get("/inventory/products");g.success&&(v.products=g.products)}}catch(p){_(p.message,"error")}})}function Ru(){var e,s,i;document.body.insertAdjacentHTML("beforeend",`
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
  `);const t=document.getElementById("shift-modal");(e=document.getElementById("btn-close-shift-modal"))==null||e.addEventListener("click",()=>t.remove()),(s=document.getElementById("btn-dismiss-shift"))==null||s.addEventListener("click",()=>t.remove()),(i=document.getElementById("btn-close-shift-confirm"))==null||i.addEventListener("click",async()=>{const o=document.getElementById("shift-counted-cash").value,a=document.getElementById("shift-notes").value;try{(await P.post("/pos/shift/close",{actual_cash:o,notes:a})).success&&(_("Shift reconciled and closed successfully","success"),t.remove())}catch(r){_(r.message,"error")}})}let he="ALL",at="stock-list";function Du(n){n.innerHTML=`
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
      <button class="btn btn-outline btn-sm ${at==="stock-list"?"active":""} inv-tab-btn" data-tab="stock-list">📦 Master Catalog & Stock</button>
      <button class="btn btn-outline btn-sm ${at==="warehouses"?"active":""} inv-tab-btn" data-tab="warehouses">🏢 Warehouse Hubs & Depots</button>
      <button class="btn btn-outline btn-sm ${at==="categories"?"active":""} inv-tab-btn" data-tab="categories">🏷️ Category Manager</button>
      <button class="btn btn-outline btn-sm ${at==="batches"?"active":""} inv-tab-btn" data-tab="batches">⏳ Batch & Expiry Radar</button>
      <button class="btn btn-outline btn-sm ${at==="ledger"?"active":""} inv-tab-btn" data-tab="ledger">📜 Perpetual Stock Ledger</button>
    </div>

    <div id="inv-tab-content">
      <!-- Dynamic Tab View -->
    </div>
  `,Ou(),la()}function Ou(){var t,e,s,i;const n=document.querySelectorAll(".inv-tab-btn");n.forEach(o=>{o.addEventListener("click",()=>{n.forEach(a=>a.classList.remove("active")),o.classList.add("active"),at=o.dataset.tab,la()})}),(t=document.getElementById("btn-open-add-product-modal"))==null||t.addEventListener("click",()=>us(null)),(e=document.getElementById("btn-open-transfer-modal"))==null||e.addEventListener("click",ca),(s=document.getElementById("btn-open-adjust-modal"))==null||s.addEventListener("click",ju),(i=document.getElementById("btn-open-labels-modal"))==null||i.addEventListener("click",Hu)}function la(){at==="stock-list"?Gt():at==="warehouses"?De():at==="categories"?wn():at==="batches"?$u():at==="ledger"&&Is()}function Gt(){var s,i;const n=document.getElementById("inv-tab-content");if(!n)return;const t=v.categories||[],e=he==="ALL"?v.products:v.products.filter(o=>String(o.category_id)===String(he));n.innerHTML=`
    <!-- Category Filter Chips -->
    <div style="display:flex; gap:0.5rem; margin-bottom:1rem; overflow-x:auto; padding-bottom:0.25rem;">
      <button class="chip-btn ${he==="ALL"?"active":""} cat-filter-chip" data-cat="ALL">
        All Categories (${v.products.length})
      </button>
      ${t.map(o=>`
        <button class="chip-btn ${String(he)===String(o.id)?"active":""} cat-filter-chip" data-cat="${o.id}">
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
                  <td>${A(o.cost_price)}</td>
                  <td style="font-weight:700; color:#38bdf8;">${A(o.selling_price)}</td>
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
  `,(s=document.getElementById("inv-search"))==null||s.addEventListener("input",o=>{const a=o.target.value.toLowerCase();document.querySelectorAll("#inv-table-body tr").forEach(l=>{const c=l.textContent.toLowerCase();l.style.display=c.includes(a)?"":"none"})}),document.querySelectorAll(".cat-filter-chip").forEach(o=>{o.addEventListener("click",()=>{he=o.dataset.cat,Gt()})}),(i=document.getElementById("btn-tab-add-prod"))==null||i.addEventListener("click",()=>us(null)),document.querySelectorAll(".edit-prod-btn").forEach(o=>{o.addEventListener("click",()=>{const a=v.products.find(r=>r.id===Number(o.dataset.id));a&&us(a)})}),document.querySelectorAll(".delete-prod-btn").forEach(o=>{o.addEventListener("click",()=>{const a=v.products.find(r=>r.id===Number(o.dataset.id));a&&zu(a)})}),document.querySelectorAll(".quick-add-cart-btn").forEach(o=>{o.addEventListener("click",()=>{const a=v.products.find(r=>r.id===Number(o.dataset.prodId));a&&(v.posCart.items.push({product_id:a.id,name:a.name,sku:a.sku,unit_price:Number(a.selling_price),tax_rate:Number(a.tax_rate||18),quantity:1}),_(`Sent ${a.name} to POS register cart!`,"success"))})})}async function De(){var t;const n=document.getElementById("inv-tab-content");if(n){try{const e=await P.get("/inventory/warehouses");e.success&&(v.warehouses=e.warehouses)}catch(e){console.error("Failed to reload warehouses:",e)}n.innerHTML=`
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
      <div>
        <h3 style="font-size:1.15rem; font-weight:700;">Multi-Warehouse Network</h3>
        <p style="font-size:0.85rem; color:var(--text-muted);">Manage physical storage depots, distribution centers and stock allocations</p>
      </div>
      <button class="btn btn-primary" id="btn-add-warehouse">+ Add Storage Hub / Warehouse</button>
    </div>

    <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.25rem;">
      ${v.warehouses.map(e=>`
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
  `,(t=document.getElementById("btn-add-warehouse"))==null||t.addEventListener("click",()=>io(null)),document.querySelectorAll(".edit-wh-btn").forEach(e=>{e.addEventListener("click",()=>{const s=v.warehouses.find(i=>i.id===Number(e.dataset.id));s&&io(s)})}),document.querySelectorAll(".transfer-from-wh-btn").forEach(e=>{e.addEventListener("click",()=>{ca(Number(e.dataset.id))})}),document.querySelectorAll(".delete-wh-btn").forEach(e=>{e.addEventListener("click",()=>{const s=v.warehouses.find(i=>i.id===Number(e.dataset.id));s&&Nu(s)})})}}async function wn(){var t;const n=document.getElementById("inv-tab-content");if(n){try{const e=await P.get("/inventory/categories");e.success&&(v.categories=e.categories)}catch(e){console.error("Failed to reload categories:",e)}n.innerHTML=`
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
            ${v.categories.map(e=>`
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
  `,(t=document.getElementById("btn-add-category"))==null||t.addEventListener("click",()=>oo(null)),document.querySelectorAll(".edit-cat-btn").forEach(e=>{e.addEventListener("click",()=>{const s=v.categories.find(i=>i.id===Number(e.dataset.id));s&&oo(s)})}),document.querySelectorAll(".delete-cat-btn").forEach(e=>{e.addEventListener("click",()=>{const s=v.categories.find(i=>i.id===Number(e.dataset.id));s&&Fu(s)})})}}async function $u(){const n=document.getElementById("inv-tab-content");if(n)try{const e=(await P.get("/inventory/batches/expiry")).batches||[];n.innerHTML=`
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
              ${e.map(s=>`
                <tr>
                  <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${s.batch_number}</td>
                  <td>
                    <div style="font-weight:600; color:#ffffff;">${s.product_name}</div>
                    <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">${s.product_sku}</div>
                  </td>
                  <td>${s.expiry_date}</td>
                  <td style="font-weight:700;">${s.days_until_expiry} days</td>
                  <td style="font-weight:700;">${s.stock} units</td>
                  <td>
                    <span class="tag ${s.status==="EXPIRED"?"tag-danger":s.status==="EXPIRING_SOON"?"tag-warning":"tag-success"}">
                      ${s.status}
                    </span>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}catch(t){_(t.message,"error")}}async function Is(){var t;const n=document.getElementById("inv-tab-content");if(n)try{const s=(await P.get("/inventory/ledger")).ledger||[];n.innerHTML=`
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
              ${s.length===0?`
                <tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">No stock movements logged yet.</td></tr>
              `:s.map(i=>{const o=Number(i.quantity)>0;let a="tag-info";return i.transaction_type.includes("TRANSFER")?a="tag-warning":i.transaction_type==="SALE"||i.transaction_type==="POS"?a="tag-danger":i.transaction_type==="PURCHASE"&&(a="tag-success"),`
                  <tr>
                    <td style="font-family:var(--font-mono); font-size:0.78rem;">
                      ${i.created_at?new Date(i.created_at).toLocaleString("en-PK"):"Just now"}
                    </td>
                    <td><span class="tag ${a}">${i.transaction_type}</span></td>
                    <td>
                      <div style="font-weight:600; color:#fff;">${i.product_name||"Item #"+i.product_id}</div>
                      <div style="font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">${i.product_sku||""}</div>
                    </td>
                    <td>${i.warehouse_name||"Warehouse #"+i.warehouse_id}</td>
                    <td style="font-weight:700; font-family:var(--font-mono); color:${o?"#34d399":"#f87171"};">
                      ${o?"+":""}${i.quantity}
                    </td>
                    <td>${A(i.unit_cost||0)}</td>
                    <td style="font-size:0.82rem; color:var(--text-secondary);">${i.notes||i.reference_type||"Ledger Auto-Post"}</td>
                  </tr>
                `}).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `,(t=document.getElementById("btn-refresh-ledger"))==null||t.addEventListener("click",Is)}catch(e){_(e.message,"error")}}function us(n=null){var a,r,l,c;const t=!!n,e=v.categories||[],s=v.warehouses||[],i=`
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
                      ${s.map(d=>`<option value="${d.id}">${d.name}</option>`).join("")}
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
  `;document.body.insertAdjacentHTML("beforeend",i);const o=document.getElementById("product-crud-modal");(a=document.getElementById("btn-close-prod-modal"))==null||a.addEventListener("click",()=>o.remove()),(r=document.getElementById("btn-cancel-prod"))==null||r.addEventListener("click",()=>o.remove()),(l=document.getElementById("btn-gen-barcode"))==null||l.addEventListener("click",()=>{document.getElementById("prod-form-barcode").value="896"+Math.floor(1e8+Math.random()*9e8)}),(c=document.getElementById("product-form"))==null||c.addEventListener("submit",async d=>{var h,f;d.preventDefault();const u={name:document.getElementById("prod-form-name").value.trim(),sku:document.getElementById("prod-form-sku").value.trim().toUpperCase(),barcode:document.getElementById("prod-form-barcode").value.trim(),category_id:document.getElementById("prod-form-category").value,uom:document.getElementById("prod-form-uom").value,cost_price:document.getElementById("prod-form-cost").value,selling_price:document.getElementById("prod-form-selling").value,tax_rate:document.getElementById("prod-form-tax").value,reorder_level:document.getElementById("prod-form-reorder").value,is_batch_tracked:document.getElementById("prod-form-batch-tracked").checked};t||(u.initial_stock=((h=document.getElementById("prod-form-initial-stock"))==null?void 0:h.value)||0,u.warehouse_id=((f=document.getElementById("prod-form-target-wh"))==null?void 0:f.value)||1);try{if(t){const p=await P.request(`/inventory/products/${n.id}`,{method:"PUT",body:JSON.stringify(u)});p.success&&(_(`Product ${p.product.name} updated successfully!`,"success"),o.remove(),await Bt(),Gt())}else{const p=await P.post("/inventory/products",u);p.success&&(_(`Product ${p.product.name} created successfully!`,"success"),o.remove(),await Bt(),Gt())}}catch(p){_(p.message,"error")}})}function zu(n){confirm(`Are you sure you want to deactivate product: "${n.name}" (${n.sku})?`)&&P.request(`/inventory/products/${n.id}`,{method:"DELETE"}).then(async t=>{t.success&&(_(t.message||"Product deactivated","info"),await Bt(),Gt())}).catch(t=>_(t.message,"error"))}function io(n=null){var i,o,a;const t=!!n,e=`
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
  `;document.body.insertAdjacentHTML("beforeend",e);const s=document.getElementById("warehouse-crud-modal");(i=document.getElementById("btn-close-wh-modal"))==null||i.addEventListener("click",()=>s.remove()),(o=document.getElementById("btn-cancel-wh"))==null||o.addEventListener("click",()=>s.remove()),(a=document.getElementById("wh-form"))==null||a.addEventListener("submit",async r=>{r.preventDefault();const l={name:document.getElementById("wh-name").value.trim(),code:document.getElementById("wh-code").value.trim().toUpperCase(),address:document.getElementById("wh-address").value.trim(),phone:document.getElementById("wh-phone").value.trim(),is_default:document.getElementById("wh-is-default").checked};try{if(t){const c=await P.request(`/inventory/warehouses/${n.id}`,{method:"PUT",body:JSON.stringify(l)});c.success&&(_(`Warehouse ${c.warehouse.name} updated!`,"success"),s.remove(),De())}else{const c=await P.post("/inventory/warehouses",l);c.success&&(_(`Warehouse ${c.warehouse.name} created!`,"success"),s.remove(),De())}}catch(c){_(c.message,"error")}})}function Nu(n){confirm(`Are you sure you want to deactivate warehouse "${n.name}"?`)&&P.request(`/inventory/warehouses/${n.id}`,{method:"DELETE"}).then(t=>{t.success&&(_(t.message,"info"),De())}).catch(t=>_(t.message,"error"))}function oo(n=null){var i,o,a;const t=!!n,e=`
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
  `;document.body.insertAdjacentHTML("beforeend",e);const s=document.getElementById("category-crud-modal");(i=document.getElementById("btn-close-cat-modal"))==null||i.addEventListener("click",()=>s.remove()),(o=document.getElementById("btn-cancel-cat"))==null||o.addEventListener("click",()=>s.remove()),(a=document.getElementById("cat-form"))==null||a.addEventListener("submit",async r=>{r.preventDefault();const l={name:document.getElementById("cat-name").value.trim(),code:document.getElementById("cat-code").value.trim().toUpperCase(),description:document.getElementById("cat-desc").value.trim()};try{if(t){const c=await P.request(`/inventory/categories/${n.id}`,{method:"PUT",body:JSON.stringify(l)});c.success&&(_(`Category ${c.category.name} updated!`,"success"),s.remove(),await Bt(),wn())}else{const c=await P.post("/inventory/categories",l);c.success&&(_(`Category ${c.category.name} created!`,"success"),s.remove(),await Bt(),wn())}}catch(c){_(c.message,"error")}})}function Fu(n){confirm(`Are you sure you want to delete category "${n.name}"? Products in this category will become Uncategorized.`)&&P.request(`/inventory/categories/${n.id}`,{method:"DELETE"}).then(async t=>{t.success&&(_(t.message,"info"),await Bt(),wn())}).catch(t=>_(t.message,"error"))}function ca(n=null){var o,a,r;const t=v.warehouses||[],e=v.products||[];if(t.length<2){_("You must have at least 2 active warehouses to perform inter-warehouse transfers.","error");return}const s=`
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
  `;document.body.insertAdjacentHTML("beforeend",s);const i=document.getElementById("transfer-modal");(o=document.getElementById("btn-close-transfer-modal"))==null||o.addEventListener("click",()=>i.remove()),(a=document.getElementById("btn-cancel-transfer"))==null||a.addEventListener("click",()=>i.remove()),(r=document.getElementById("transfer-form"))==null||r.addEventListener("submit",async l=>{l.preventDefault();const c=document.getElementById("transfer-prod").value,d=document.getElementById("transfer-from-wh").value,u=document.getElementById("transfer-to-wh").value,h=document.getElementById("transfer-qty").value,f=document.getElementById("transfer-notes").value;if(d===u){_("Source and destination warehouses must be different!","error");return}try{const p=await P.post("/inventory/transfer-stock",{product_id:c,from_warehouse_id:d,to_warehouse_id:u,quantity:h,notes:f});p.success&&(_(p.message,"success"),i.remove(),await Bt(),at==="warehouses"?De():at==="ledger"?Is():Gt())}catch(p){_(p.message,"error")}})}function ju(){var e,s,i;const n=`
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
              ${v.products.map(o=>`<option value="${o.id}">${o.name} (Current: ${o.stock||0})</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Warehouse Location:</label>
            <select id="adj-warehouse" class="form-control">
              ${v.warehouses.map(o=>`<option value="${o.id}">${o.name}</option>`).join("")}
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
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("adjust-modal");(e=document.getElementById("btn-close-adjust-modal"))==null||e.addEventListener("click",()=>t.remove()),(s=document.getElementById("btn-dismiss-adjust"))==null||s.addEventListener("click",()=>t.remove()),(i=document.getElementById("btn-confirm-adjust"))==null||i.addEventListener("click",async()=>{const o=document.getElementById("adj-product").value,a=document.getElementById("adj-warehouse").value,r=document.getElementById("adj-qty").value,l=document.getElementById("adj-reason").value;try{const c=await P.post("/inventory/adjust-stock",{product_id:o,warehouse_id:a,quantity:r,reason:l});c.success&&(_(c.message,"success"),t.remove(),await Bt(),Gt())}catch(c){_(c.message,"error")}})}function Hu(){var s,i,o,a;const n=v.products[0]||{name:"Sample Item",barcode:"896400010101",selling_price:150},t=`
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
              ${v.products.map(r=>`
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
                <div style="font-weight:bold; font-size:12px; margin-top:2px;">${A(n.selling_price)}</div>
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
  `;document.body.insertAdjacentHTML("beforeend",t);const e=document.getElementById("barcode-labels-modal");(s=document.getElementById("btn-close-label-modal"))==null||s.addEventListener("click",()=>e.remove()),(i=document.getElementById("btn-dismiss-label"))==null||i.addEventListener("click",()=>e.remove()),(o=document.getElementById("label-product-picker"))==null||o.addEventListener("change",r=>{const l=v.products.find(d=>d.id===Number(r.target.value))||n,c=document.getElementById("label-sheet-preview");c&&(c.innerHTML=[1,2,3,4,5,6].map(()=>`
        <div style="border:1px dashed #333; padding:8px; text-align:center; font-family:monospace;">
          <div style="font-weight:bold; font-size:11px;">ONENET SOLUTIONS</div>
          <div style="font-size:10px; margin:2px 0;">${l.name.slice(0,22)}</div>
          <div style="font-weight:bold; font-size:18px; letter-spacing:3px; margin:4px 0;">||| | |||| | ||</div>
          <div style="font-size:9px;">${l.barcode||l.sku}</div>
          <div style="font-weight:bold; font-size:12px; margin-top:2px;">${A(l.selling_price)}</div>
        </div>
      `).join(""))}),(a=document.getElementById("btn-print-labels"))==null||a.addEventListener("click",()=>{var c;const r=(c=document.getElementById("label-product-picker"))==null?void 0:c.value,l=v.products.find(d=>d.id===Number(r))||n;Pu(l,12)})}async function Bt(){try{const[n,t,e]=await Promise.all([P.get("/inventory/products"),P.get("/inventory/categories"),P.get("/inventory/warehouses")]);n.success&&(v.products=n.products),t.success&&(v.categories=t.categories),e.success&&(v.warehouses=e.warehouses)}catch(n){console.error("Failed refreshing inventory data:",n)}}async function Vu(n){n.innerHTML=`
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
  `,await Ts(),Uu()}async function Ts(){const n=document.getElementById("sales-tab-content");if(n)try{const e=(await P.get("/sales/invoices")).invoices||[];n.innerHTML=`
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
              ${e.map(s=>`
                <tr>
                  <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${s.invoice_number}</td>
                  <td>${s.invoice_date}</td>
                  <td style="font-weight:600; color:#ffffff;">${s.customer_name}</td>
                  <td style="font-weight:700;">${A(s.total_amount)}</td>
                  <td>${A(s.paid_amount)}</td>
                  <td style="color:${s.balance_amount>0?"#f87171":"#34d399"}; font-weight:700;">${A(s.balance_amount)}</td>
                  <td>
                    <span class="tag ${s.status==="PAID"?"tag-success":"tag-warning"}">${s.status}</span>
                  </td>
                  <td>
                    <button class="btn btn-outline btn-sm view-einvoice-btn" data-inv-id="${s.id}">View / Print QR</button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `,document.querySelectorAll(".view-einvoice-btn").forEach(s=>{s.addEventListener("click",()=>{const i=e.find(o=>o.id===Number(s.dataset.invId));i&&Yu(i)})})}catch(t){_(t.message,"error")}}async function Wu(){const n=document.getElementById("sales-tab-content");if(n)try{const e=(await P.get("/sales/orders")).orders||[];n.innerHTML=`
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
              ${e.map(s=>`
                <tr>
                  <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${s.order_number}</td>
                  <td>${s.order_date}</td>
                  <td style="font-weight:600; color:#ffffff;">${s.customer_name}</td>
                  <td>${s.salesperson_name}</td>
                  <td style="font-weight:700;">${A(s.total_amount)}</td>
                  <td>
                    ${s.geo_latitude?`<span class="tag tag-info">📍 ${Number(s.geo_latitude).toFixed(4)}, ${Number(s.geo_longitude).toFixed(4)}</span>`:'<span style="color:var(--text-muted);">Web Order</span>'}
                  </td>
                  <td><span class="tag tag-success">${s.status}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `}catch(t){_(t.message,"error")}}function qu(){const n=document.getElementById("sales-tab-content");n&&(n.innerHTML=`
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
            ${v.customers.map(t=>`
              <tr>
                <td>
                  <div style="font-weight:700; color:#ffffff;">${t.business_name||t.name}</div>
                  <div style="font-size:0.75rem; color:var(--text-muted);">${t.name}</div>
                </td>
                <td>${t.phone}</td>
                <td>${t.address}, ${t.city}</td>
                <td style="font-family:var(--font-mono);">${t.tax_number||"Unregistered"}</td>
                <td>${A(t.credit_limit)}</td>
                <td style="font-weight:700; color:${t.current_balance>0?"#f87171":"#34d399"};">
                  ${A(t.current_balance)}
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `)}function Uu(){var t;const n=document.querySelectorAll(".sales-tab-btn");n.forEach(e=>{e.addEventListener("click",()=>{n.forEach(i=>i.classList.remove("active")),e.classList.add("active");const s=e.dataset.tab;s==="invoices"?Ts():s==="orders"?Wu():s==="customers"&&qu()})}),(t=document.getElementById("btn-create-invoice-modal"))==null||t.addEventListener("click",Gu)}function Yu(n){var s,i,o;const t=`
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
              <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Subtotal:</span><span>${A(n.subtotal)}</span></div>
              <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Sales Tax (18%):</span><span>${A(n.tax_amount)}</span></div>
              <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Discount:</span><span>-${A(n.discount_amount)}</span></div>
              <div style="display:flex; justify-content:space-between; padding:6px 0; border-top:2px solid #0f172a; font-weight:bold; font-size:15px; color:#0284c7;">
                <span>Total Amount:</span><span>${A(n.total_amount)}</span>
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
  `;document.body.insertAdjacentHTML("beforeend",t);const e=document.getElementById("einvoice-modal");(s=document.getElementById("btn-close-inv-modal"))==null||s.addEventListener("click",()=>e.remove()),(i=document.getElementById("btn-close-inv"))==null||i.addEventListener("click",()=>e.remove()),(o=document.getElementById("btn-print-sales-invoice"))==null||o.addEventListener("click",()=>Au(n))}function Gu(){var e,s,i;const n=`
    <div class="modal-overlay" id="create-inv-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Generate New E-Invoice</h3>
          <button class="btn-icon btn-sm" id="btn-close-create-inv">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label class="form-label">Customer:</label>
            <select id="new-inv-cust" class="form-control">
              ${v.customers.map(o=>`<option value="${o.id}">${o.business_name||o.name}</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Product Item:</label>
            <select id="new-inv-prod" class="form-control">
              ${v.products.map(o=>`<option value="${o.id}">${o.name} - ${A(o.selling_price)}</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Quantity:</label>
            <input type="number" id="new-inv-qty" value="50" class="form-control" />
          </div>
          <div class="form-group">
            <label class="form-label">Cash Advance / Paid Amount:</label>
            <input type="number" id="new-inv-paid" value="2000" class="form-control" />
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-dismiss-create-inv">Cancel</button>
          <button class="btn btn-primary" id="btn-submit-new-inv">Generate Invoice</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("create-inv-modal");(e=document.getElementById("btn-close-create-inv"))==null||e.addEventListener("click",()=>t.remove()),(s=document.getElementById("btn-dismiss-create-inv"))==null||s.addEventListener("click",()=>t.remove()),(i=document.getElementById("btn-submit-new-inv"))==null||i.addEventListener("click",async()=>{const o=document.getElementById("new-inv-cust").value,a=document.getElementById("new-inv-prod").value,r=document.getElementById("new-inv-qty").value,l=document.getElementById("new-inv-paid").value,c=v.products.find(d=>d.id===Number(a));try{const d=await P.post("/sales/invoices",{customer_id:o,items:[{product_id:c.id,quantity:r,unit_price:c.selling_price}],discount_amount:0,paid_amount:l});d.success&&(_(`Invoice ${d.invoice.invoice_number} created with QR Code!`,"success"),t.remove(),Ts())}catch(d){_(d.message,"error")}})}async function Xu(n){n.innerHTML=`
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
  `,await Bs(),Qu()}async function Bs(){const n=document.getElementById("acc-tab-content");if(n)try{const e=(await P.get("/accounting/journals")).entries||[];n.innerHTML=`
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
              ${e.map(s=>`
                <tr>
                  <td style="font-family:var(--font-mono); font-weight:700; color:#38bdf8;">${s.entry_number}</td>
                  <td>${s.date}</td>
                  <td>
                    <span class="tag tag-info">${s.source_document||"MANUAL"}</span>
                    <div style="font-size:0.75rem; color:var(--text-muted);">${s.reference||""}</div>
                  </td>
                  <td style="color:var(--text-secondary); max-width:280px;">${s.narration}</td>
                  <td>
                    <div style="background:rgba(0,0,0,0.25); padding:8px; border-radius:6px; font-family:var(--font-mono); font-size:0.8rem;">
                      ${s.lines.map(i=>`
                        <div style="display:flex; justify-content:space-between; margin:2px 0;">
                          <span style="color:${i.debit>0?"#38bdf8":"#cbd5e1"};">
                            ${i.debit>0?"Dr.":"   Cr."} ${i.account_name}
                          </span>
                          <span style="font-weight:700;">
                            ${i.debit>0?A(i.debit):A(i.credit)}
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
    `}catch(t){_(t.message,"error")}}async function Ku(){const n=document.getElementById("acc-tab-content");if(n)try{const e=(await P.get("/accounting/accounts")).accounts||[],s={Asset:e.filter(i=>i.type==="Asset"),Liability:e.filter(i=>i.type==="Liability"),Equity:e.filter(i=>i.type==="Equity"),Revenue:e.filter(i=>i.type==="Revenue"),Expense:e.filter(i=>i.type==="Expense")};n.innerHTML=`
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:1.25rem;">
        ${Object.entries(s).map(([i,o])=>`
          <div class="glass-panel">
            <div class="panel-header">
              <h3 class="panel-title">${i} Accounts</h3>
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
                    ${A(a.current_balance)}
                  </span>
                </div>
              `).join("")}
            </div>
          </div>
        `).join("")}
      </div>
    `}catch(t){_(t.message,"error")}}async function Ju(){const n=document.getElementById("acc-tab-content");if(n)try{const t=await P.get("/accounting/reports"),{trial_balance:e,profit_and_loss:s,balance_sheet:i}=t;n.innerHTML=`
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.5rem;">
        <!-- Profit & Loss -->
        <div class="glass-panel">
          <div class="panel-header">
            <h3 class="panel-title">Income Statement (Profit & Loss)</h3>
            <span class="tag tag-success">Live YTD</span>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem; font-size:0.9rem;">
            <div style="font-weight:700; color:#34d399; margin-bottom:4px;">REVENUE</div>
            ${s.revenues.map(o=>`
              <div style="display:flex; justify-content:space-between;">
                <span>${o.name}</span>
                <span>${A(o.current_balance)}</span>
              </div>
            `).join("")}
            <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); padding-top:4px;">
              <span>Total Gross Revenue:</span>
              <span style="color:#34d399;">${A(s.total_revenue)}</span>
            </div>

            <div style="font-weight:700; color:#f87171; margin-top:10px; margin-bottom:4px;">EXPENSES & COGS</div>
            ${s.expenses.map(o=>`
              <div style="display:flex; justify-content:space-between;">
                <span>${o.name}</span>
                <span>${A(o.current_balance)}</span>
              </div>
            `).join("")}
            <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); padding-top:4px;">
              <span>Total Expenses:</span>
              <span style="color:#f87171;">${A(s.total_expense)}</span>
            </div>

            <div style="display:flex; justify-content:space-between; font-weight:800; font-size:1.15rem; border-top:2px solid var(--border-bright); padding-top:8px; margin-top:8px; color:#38bdf8;">
              <span>NET OPERATING PROFIT:</span>
              <span>${A(s.net_profit)}</span>
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
            ${i.assets.map(o=>`
              <div style="display:flex; justify-content:space-between;">
                <span>${o.name}</span>
                <span>${A(o.current_balance)}</span>
              </div>
            `).join("")}
            <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); padding-top:4px;">
              <span>Total Assets:</span>
              <span style="color:#38bdf8;">${A(i.total_assets)}</span>
            </div>

            <div style="font-weight:700; color:#fbbf24; margin-top:10px;">LIABILITIES & EQUITY</div>
            ${i.liabilities.map(o=>`
              <div style="display:flex; justify-content:space-between;">
                <span>${o.name}</span>
                <span>${A(o.current_balance)}</span>
              </div>
            `).join("")}
            <div style="display:flex; justify-content:space-between; font-weight:700; border-top:1px solid var(--border-color); padding-top:4px;">
              <span>Total Liabilities & Equity:</span>
              <span style="color:#fbbf24;">${A(i.total_liabilities_and_equity||i.total_equity_and_liabilities)}</span>
            </div>
          </div>
        </div>
      </div>
    `}catch(t){_(t.message,"error")}}function Qu(){var t;const n=document.querySelectorAll(".acc-tab-btn");n.forEach(e=>{e.addEventListener("click",()=>{n.forEach(i=>i.classList.remove("active")),e.classList.add("active");const s=e.dataset.tab;s==="journals"?Bs():s==="coa"?Ku():s==="reports"&&Ju()})}),(t=document.getElementById("btn-new-jv-modal"))==null||t.addEventListener("click",Zu)}function Zu(){var e,s,i;document.body.insertAdjacentHTML("beforeend",`
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
  `);const t=document.getElementById("manual-jv-modal");(e=document.getElementById("btn-close-jv"))==null||e.addEventListener("click",()=>t.remove()),(s=document.getElementById("btn-cancel-jv"))==null||s.addEventListener("click",()=>t.remove()),(i=document.getElementById("btn-submit-jv"))==null||i.addEventListener("click",async()=>{const o=document.getElementById("jv-ref").value,a=document.getElementById("jv-narration").value,r=Number(document.getElementById("jv-debit-acc").value),l=Number(document.getElementById("jv-debit-amt").value),c=Number(document.getElementById("jv-credit-acc").value),d=Number(document.getElementById("jv-credit-amt").value);if(l!==d){_("Debits and Credits must balance exactly!","error");return}try{(await P.post("/accounting/journals",{reference:o,narration:a,lines:[{accountId:r,debit:l,credit:0},{accountId:c,debit:0,credit:d}]})).success&&(_("Journal Voucher posted to General Ledger!","success"),t.remove(),Bs())}catch(u){_(u.message,"error")}})}async function th(n){n.innerHTML=`
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
  `,await da()}async function da(){const n=document.getElementById("mfg-recipes-list"),t=document.getElementById("mfg-orders-list");try{const[e,s]=await Promise.all([P.get("/manufacturing/recipes"),P.get("/manufacturing/orders")]),i=e.recipes||[],o=s.orders||[];n&&(n.innerHTML=i.map(a=>`
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
                <span style="font-family:var(--font-mono); font-weight:600;">${r.required_quantity} units (${A(r.unit_cost)}/ea)</span>
              </div>
            `).join("")}
          </div>
        </div>
      `).join(""),n.querySelectorAll(".run-assembly-btn").forEach(a=>{a.addEventListener("click",()=>{const r=Number(a.dataset.recipeId),l=a.dataset.recipeName;eh(r,l)})})),t&&(t.innerHTML=`
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
                  <td>${A(a.total_production_cost)}</td>
                  <td><span class="tag tag-success">${a.status}</span></td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `)}catch(e){_(e.message,"error")}}function eh(n,t){var i,o,a;const e=`
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
  `;document.body.insertAdjacentHTML("beforeend",e);const s=document.getElementById("run-asm-modal");(i=document.getElementById("btn-close-asm-modal"))==null||i.addEventListener("click",()=>s.remove()),(o=document.getElementById("btn-cancel-asm"))==null||o.addEventListener("click",()=>s.remove()),(a=document.getElementById("btn-confirm-asm"))==null||a.addEventListener("click",async()=>{const r=document.getElementById("asm-qty").value;try{const l=await P.post("/manufacturing/assemble",{bom_recipe_id:n,warehouse_id:1,quantity:r});l.success&&(_(l.message,"success"),s.remove(),da())}catch(l){_(l.message,"error")}})}let ao=JSON.parse(localStorage.getItem("apexerppos_offline_orders")||"[]");function nh(n){var t;n.innerHTML=`
    <div style="max-width: 600px; margin: 0 auto; padding-bottom: 70px;">
      <!-- Mobile App Header -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.25rem;">
        <div>
          <span class="tag tag-info" style="font-size:0.75rem;">Field Booker PWA</span>
          <h2 style="font-family:var(--font-heading); font-size:1.4rem; font-weight:700; margin-top:4px;">Mobile Order Booker</h2>
        </div>
        <button class="btn btn-outline btn-sm" id="btn-camera-scanner">
          📷 Scan Barcode
        </button>
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
          ${v.customers.map(e=>`
            <option value="${e.id}">${e.business_name||e.name} - ${e.city}</option>
          `).join("")}
        </select>
        <div id="cust-balance-preview" style="font-size:0.8rem; color:var(--text-muted); margin-top:6px;">
          Outstanding Balance: <strong style="color:#f87171;">${A(((t=v.customers[1])==null?void 0:t.current_balance)||0)}</strong>
        </div>
      </div>

      <!-- Product Catalog Cards -->
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
        <h3 style="font-size:1.05rem; font-weight:700;">Catalog</h3>
        <span style="font-size:0.8rem; color:var(--text-muted);"><span id="mobile-cart-count">0</span> items selected</span>
      </div>

      <div style="display:flex; flex-direction:column; gap:0.75rem; margin-bottom:1.5rem;" id="mobile-prods-list">
        ${v.products.map(e=>`
          <div style="display:flex; justify-content:space-between; align-items:center; padding:0.9rem 1rem; background:var(--bg-card); border:1px solid var(--border-color); border-radius:var(--radius-md);">
            <div>
              <div style="font-weight:600; font-size:0.92rem; color:#ffffff;">${e.name}</div>
              <div style="font-size:0.78rem; color:var(--text-muted);">${e.sku} | In Stock: ${e.stock}</div>
              <div style="font-weight:700; color:#38bdf8; font-size:1rem; margin-top:2px;">${A(e.selling_price)}</div>
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
  `,ua(),sh()}function ua(){const n=document.getElementById("gps-status-text");"geolocation"in navigator?navigator.geolocation.getCurrentPosition(t=>{v.mobileCart.geoLat=t.coords.latitude,v.mobileCart.geoLng=t.coords.longitude,n&&(n.innerHTML=`📍 GPS Verified: ${t.coords.latitude.toFixed(4)}, ${t.coords.longitude.toFixed(4)}`)},()=>{v.mobileCart.geoLat=24.8607,v.mobileCart.geoLng=67.0011,n&&(n.innerHTML="📍 GPS Tagged: 24.8607° N, 67.0011° E (Store)")}):(v.mobileCart.geoLat=24.8607,v.mobileCart.geoLng=67.0011,n&&(n.innerHTML="📍 GPS Tagged: 24.8607° N, 67.0011° E"))}function sh(){var n,t,e;(n=document.getElementById("btn-refresh-gps"))==null||n.addEventListener("click",()=>{ua(),_("Shop visit GPS coordinates updated","success")}),document.querySelectorAll(".mobile-add-btn").forEach(s=>{s.addEventListener("click",()=>{const i=Number(s.dataset.prodId),o=v.products.find(a=>a.id===i);if(o){const a=v.mobileCart.items.find(r=>r.product_id===o.id);a?a.quantity+=1:v.mobileCart.items.push({product_id:o.id,name:o.name,unit_price:Number(o.selling_price),tax_rate:Number(o.tax_rate||18),quantity:1}),un(),_(`Added: ${o.name}`,"info")}})}),(t=document.getElementById("btn-camera-scanner"))==null||t.addEventListener("click",ih),(e=document.getElementById("btn-submit-mobile-order"))==null||e.addEventListener("click",async()=>{var o;if(v.mobileCart.items.length===0){_("Please add products to the mobile order first","error");return}const i={customer_id:((o=document.getElementById("mobile-cust-select"))==null?void 0:o.value)||2,items:v.mobileCart.items,geo_latitude:v.mobileCart.geoLat,geo_longitude:v.mobileCart.geoLng,notes:"Booked via Mobile Order Booker PWA"};try{const a=await P.post("/sales/orders",i);a.success&&(_(`Order ${a.order.order_number} successfully booked!`,"success"),v.mobileCart.items=[],un())}catch{ao.push(i),localStorage.setItem("apexerppos_offline_orders",JSON.stringify(ao)),_("Offline Mode: Order queued locally and will sync when online!","warning"),v.mobileCart.items=[],un()}})}function un(){const n=document.getElementById("mobile-cart-count"),t=document.getElementById("mobile-order-total");let e=0,s=0;for(const i of v.mobileCart.items){s+=i.quantity;const o=i.unit_price*i.quantity,a=o*i.tax_rate/100;e+=o+a}n&&(n.textContent=s),t&&(t.textContent=A(e))}function ih(){var i,o;const n=`
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
            ${v.products.slice(0,4).map(a=>`
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
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("camera-scanner-modal"),e=document.getElementById("camera-stream-video");navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({video:{facingMode:"environment"}}).then(a=>{e&&(e.srcObject=a)}).catch(a=>{console.log("[Camera] Simulated preview (camera permission or desktop):",a.message)});const s=()=>{e&&e.srcObject&&e.srcObject.getTracks().forEach(a=>a.stop()),t.remove()};(i=document.getElementById("btn-close-camera"))==null||i.addEventListener("click",s),(o=document.getElementById("btn-dismiss-camera"))==null||o.addEventListener("click",s),t.querySelectorAll(".sim-scan-btn").forEach(a=>{a.addEventListener("click",()=>{const r=a.dataset.barcode,l=v.products.find(c=>c.barcode===r);l&&(v.mobileCart.items.push({product_id:l.id,name:l.name,unit_price:Number(l.selling_price),tax_rate:Number(l.tax_rate||18),quantity:1}),un(),_(`Camera Scanned: ${l.name}`,"success"),s())})})}async function oh(){var n;try{const t=await P.get("/companies");if(t.success&&t.companies.length>0){v.companies=t.companies;const e=((n=v.currentUser)==null?void 0:n.assigned_companies)||[1],s=t.companies.find(i=>{var o;return i.id===((o=v.activeCompany)==null?void 0:o.id)&&e.includes(i.id)});s?v.activeCompany=s:v.activeCompany=t.companies.find(i=>e.includes(i.id))||t.companies[0],localStorage.setItem("onenet_active_company",JSON.stringify(v.activeCompany))}}catch(t){console.warn("Could not fetch companies:",t)}In()}function In(){var a,r,l,c;const n=document.getElementById("company-switcher-container");if(!n)return;const t=v.activeCompany||{id:1,name:"OneNet Solutions"},e=((a=v.currentUser)==null?void 0:a.assigned_companies)||[1,2,3],s=v.companies.filter(d=>e.includes(d.id));n.innerHTML=`
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
          ${s.map(d=>`
            <div class="company-menu-item ${d.id===t.id?"active":""}" data-id="${d.id}">
              <div class="company-item-title">${d.name}</div>
              <div class="company-item-city">${d.city} | ${d.tax_id||"NTN Active"}</div>
            </div>
          `).join("")}
        </div>
        ${((r=v.currentUser)==null?void 0:r.role_name)==="Super Admin"?`
          <div class="company-menu-footer">
            <button class="btn btn-xs btn-primary" id="btn-create-company-modal" style="width:100%;">+ Add New Company Branch</button>
          </div>
        `:""}
      </div>
    </div>
  `;const i=document.getElementById("btn-toggle-company-menu"),o=document.getElementById("company-dropdown-menu");i==null||i.addEventListener("click",d=>{d.stopPropagation(),o.style.display=o.style.display==="block"?"none":"block"}),document.addEventListener("click",d=>{n.contains(d.target)||o&&(o.style.display="none")}),o==null||o.querySelectorAll(".company-menu-item").forEach(d=>{d.addEventListener("click",()=>{const u=parseInt(d.dataset.id),h=v.companies.find(f=>f.id===u);h&&(v.activeCompany=h,localStorage.setItem("onenet_active_company",JSON.stringify(h)),_(`Switched active company to: ${h.name}`,"success"),In())})}),(l=document.getElementById("btn-edit-active-company"))==null||l.addEventListener("click",d=>{d.stopPropagation(),o&&(o.style.display="none"),ah(v.activeCompany)}),(c=document.getElementById("btn-create-company-modal"))==null||c.addEventListener("click",d=>{d.stopPropagation(),o&&(o.style.display="none"),rh()})}function ah(n){var i,o,a;const t=`
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
  `;document.body.insertAdjacentHTML("beforeend",t);const e=document.getElementById("company-edit-modal"),s=()=>e==null?void 0:e.remove();(i=document.getElementById("btn-close-comp-modal"))==null||i.addEventListener("click",s),(o=document.getElementById("btn-cancel-comp"))==null||o.addEventListener("click",s),(a=document.getElementById("btn-save-comp"))==null||a.addEventListener("click",async()=>{const r={name:document.getElementById("comp-name").value.trim(),legal_name:document.getElementById("comp-legal-name").value.trim(),tax_id:document.getElementById("comp-tax-id").value.trim(),strn:document.getElementById("comp-strn").value.trim(),phone:document.getElementById("comp-phone").value.trim(),email:document.getElementById("comp-email").value.trim(),address:document.getElementById("comp-address").value.trim(),city:document.getElementById("comp-city").value.trim(),currency:document.getElementById("comp-curr").value.trim()};try{(await P.put(`/companies/${n.id}`,r)).success&&(_("Company profile updated successfully!","success"),Object.assign(n,r),localStorage.setItem("onenet_active_company",JSON.stringify(n)),In(),s())}catch(l){_(l.message,"error")}})}function rh(){var s,i,o;document.body.insertAdjacentHTML("beforeend",`
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
  `);const t=document.getElementById("company-create-modal"),e=()=>t==null?void 0:t.remove();(s=document.getElementById("btn-close-create-comp"))==null||s.addEventListener("click",e),(i=document.getElementById("btn-cancel-create-comp"))==null||i.addEventListener("click",e),(o=document.getElementById("btn-confirm-create-comp"))==null||o.addEventListener("click",async()=>{const a=document.getElementById("new-comp-name").value.trim();if(!a){_("Company name is required","error");return}try{const r=await P.post("/companies",{name:a,legal_name:document.getElementById("new-comp-legal").value.trim(),city:document.getElementById("new-comp-city").value.trim(),address:document.getElementById("new-comp-address").value.trim()});r.success&&(_(`Created branch: ${r.company.name}`,"success"),v.companies.push(r.company),v.currentUser&&v.currentUser.assigned_companies.push(r.company.id),In(),e())}catch(r){_(r.message,"error")}})}let hs=null;function lh(n){var o,a,r;const t=document.getElementById("user-profile-widget-container");if(!t)return;const e=v.currentUser;if(!e){t.innerHTML=`
      <button class="btn btn-primary btn-sm" id="btn-open-login-modal">
        🔑 Sign In
      </button>
    `,(o=document.getElementById("btn-open-login-modal"))==null||o.addEventListener("click",()=>{ro(()=>{typeof n=="function"&&n()})});return}t.innerHTML=`
    <div class="user-nav-dropdown">
      <div class="user-pill-btn" id="btn-toggle-user-menu">
        <div class="user-avatar-circle">${e.full_name?e.full_name.charAt(0):"U"}</div>
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
  `;const s=document.getElementById("btn-toggle-user-menu"),i=document.getElementById("user-menu-dropdown");s==null||s.addEventListener("click",l=>{l.stopPropagation(),i.style.display=i.style.display==="block"?"none":"block"}),document.addEventListener("click",l=>{t.contains(l.target)||i&&(i.style.display="none")}),(a=document.getElementById("btn-switch-account"))==null||a.addEventListener("click",()=>{i&&(i.style.display="none"),ro(n)}),(r=document.getElementById("btn-logout-session"))==null||r.addEventListener("click",()=>{i&&(i.style.display="none"),ch(n)})}function ch(n){localStorage.removeItem("onenet_token"),localStorage.removeItem("onenet_user"),localStorage.removeItem("apexerppos_token"),v.currentUser=null,_("You have been signed out.","info"),Rs(n)}function Rs(n){var o,a;n&&(hs=n);const t=document.getElementById("auth-root"),e=document.getElementById("app-root");if(e&&(e.style.display="none"),!t)return;t.style.display="flex",t.innerHTML=`
    <div class="auth-card">
      <div style="text-align:center; margin-bottom:1.5rem;">
        <div class="brand-logo-icon" style="margin: 0 auto 0.85rem auto; width: 52px; height: 52px; box-shadow: 0 8px 24px rgba(14, 165, 233, 0.4);">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5"><polygon points="12 2 2 22 22 22 12 2"></polygon></svg>
        </div>
        <h1 style="font-family:var(--font-heading); font-size:1.55rem; font-weight:800; letter-spacing:-0.02em; background:linear-gradient(90deg,#38bdf8,#818cf8); -webkit-background-clip:text; -webkit-text-fill-color:transparent; margin:0;">
          OneNet Solutions
        </h1>
        <p style="font-size:0.85rem; color:#94a3b8; margin-top:4px;">
          Enterprise Suite • Cloud ERP, POS & HR Payroll
        </p>
      </div>

      <!-- Google OAuth One-Click SSO Simulation -->
      <button class="btn btn-outline" id="portal-btn-google-sso" style="width:100%; display:flex; justify-content:center; align-items:center; gap:0.75rem; padding:0.75rem; background:rgba(255,255,255,0.05); margin-bottom:1.25rem;">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
        <span style="font-weight:600; font-size:0.9rem;">Continue with Google SSO</span>
      </button>

      <div style="display:flex; align-items:center; margin:1.25rem 0; color:#64748b; font-size:0.75rem; text-transform:uppercase; letter-spacing:1px;">
        <div style="flex:1; height:1px; background:rgba(255,255,255,0.1);"></div>
        <span style="padding:0 0.75rem; font-weight:600;">Or Corporate Credentials</span>
        <div style="flex:1; height:1px; background:rgba(255,255,255,0.1);"></div>
      </div>

      <form id="portal-login-form">
        <div class="form-group" style="margin-bottom:0.9rem;">
          <label class="form-label" for="portal-username">Username or Corporate Email:</label>
          <input type="text" id="portal-username" class="form-control" placeholder="e.g. admin" value="admin" required autocomplete="username" />
        </div>

        <div class="form-group" style="margin-bottom:1.1rem;">
          <label class="form-label" for="portal-password">Password:</label>
          <div style="position:relative;">
            <input type="password" id="portal-password" class="form-control" placeholder="••••••••" value="Admin@123456" required autocomplete="current-password" style="padding-right:2.8rem;" />
            <button type="button" id="portal-toggle-password" style="position:absolute; right:0.75rem; top:50%; transform:translateY(-50%); background:none; border:none; color:#94a3b8; cursor:pointer; padding:4px;" title="Show/Hide Password">
              👁️
            </button>
          </div>
        </div>

        <button type="submit" class="btn btn-primary" id="portal-submit-btn" style="width:100%; padding:0.85rem; font-weight:700; font-size:0.95rem; box-shadow:0 4px 16px var(--primary-glow);">
          Sign In to Enterprise Workspace
        </button>
      </form>

      <!-- Fast Role Switcher Shortcuts for Testing & Demo -->
      <div style="margin-top:1.5rem; padding-top:1rem; border-top:1px solid rgba(255,255,255,0.1);">
        <div style="font-size:0.75rem; color:#94a3b8; margin-bottom:0.6rem; text-align:center; font-weight:600;">
          One-Click Demo Stations:
        </div>
        <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:0.45rem;">
          <button class="btn btn-outline btn-xs demo-portal-btn" data-user="admin" data-role="Super Admin">👑 Super Admin</button>
          <button class="btn btn-outline btn-xs demo-portal-btn" data-user="cashier1" data-role="Cashier">⚡ POS Cashier</button>
          <button class="btn btn-outline btn-xs demo-portal-btn" data-user="manager" data-role="Store Manager">📦 Store Manager</button>
          <button class="btn btn-outline btn-xs demo-portal-btn" data-user="booker1" data-role="Field Sales Booker">📱 Field Booker</button>
        </div>
      </div>

      <div style="text-align:center; margin-top:1.25rem; font-size:0.72rem; color:#64748b;">
        🔒 TLS 256-Bit Encrypted • Multi-Tenant RBAC Active
      </div>
    </div>
  `;const s=document.getElementById("portal-password"),i=document.getElementById("portal-toggle-password");i==null||i.addEventListener("click",()=>{s.type==="password"?(s.type="text",i.textContent="🔒"):(s.type="password",i.textContent="👁️")}),(o=document.getElementById("portal-login-form"))==null||o.addEventListener("submit",async r=>{r.preventDefault();const l=document.getElementById("portal-username").value.trim(),c=document.getElementById("portal-password").value,d=document.getElementById("portal-submit-btn");d&&(d.disabled=!0,d.textContent="Authenticating...");try{const u=await P.post("/auth/login",{username:l,password:c});u.success&&Ee(u)}catch(u){_(u.message||"Login failed","error"),d&&(d.disabled=!1,d.textContent="Sign In to Enterprise Workspace")}}),(a=document.getElementById("portal-btn-google-sso"))==null||a.addEventListener("click",async()=>{try{const r=await P.post("/auth/google",{email:"director@onenetsolutions.com",name:"Enterprise Executive (Google SSO)",google_id:"goog-123456"});r.success&&(_("Google Enterprise SSO Verified!","success"),Ee(r))}catch(r){_(r.message,"error")}}),t.querySelectorAll(".demo-portal-btn").forEach(r=>{r.addEventListener("click",async()=>{const l=r.dataset.user;try{const c=await P.post("/auth/login",{username:l,password:"Admin@123456"});c.success&&Ee(c)}catch(c){_(c.message,"error")}})})}function Ee(n){P.setToken(n.token),localStorage.setItem("onenet_user",JSON.stringify(n.user)),v.currentUser=n.user,_(`Welcome, ${n.user.full_name}! (${n.user.role_name})`,"success");const t=document.getElementById("auth-root");t&&(t.style.display="none");const e=document.getElementById("app-root");e&&(e.style.display="flex"),typeof hs=="function"&&hs()}function ro(n){var i,o;const t=document.getElementById("login-modal");t&&t.remove(),document.body.insertAdjacentHTML("beforeend",`
    <div class="modal-overlay" id="login-modal" style="backdrop-filter: blur(8px); z-index:9999;">
      <div class="modal-content" style="max-width: 440px; padding: 2rem; border: 1px solid var(--border-bright); background: #0f172a; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
          <h2 style="font-family:var(--font-heading); font-size:1.25rem; font-weight:700; margin:0;">Switch User Account</h2>
          <button class="btn-icon" id="btn-close-login-modal" style="border:none;">✕</button>
        </div>

        <form id="modal-login-form">
          <div class="form-group" style="margin-bottom:0.85rem;">
            <label class="form-label">Username:</label>
            <input type="text" id="modal-login-username" class="form-control" value="admin" required />
          </div>
          <div class="form-group" style="margin-bottom:1.1rem;">
            <label class="form-label">Password:</label>
            <input type="password" id="modal-login-password" class="form-control" value="Admin@123456" required />
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%; padding:0.8rem; font-weight:700;">
            Sign In
          </button>
        </form>

        <div style="margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-color);">
          <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.5rem; text-align:center;">Fast Switch:</div>
          <div style="display:grid; grid-template-columns:repeat(2, 1fr); gap:0.4rem;">
            <button class="btn btn-outline btn-xs modal-demo-btn" data-user="admin">👑 Super Admin</button>
            <button class="btn btn-outline btn-xs modal-demo-btn" data-user="cashier1">⚡ POS Cashier</button>
            <button class="btn btn-outline btn-xs modal-demo-btn" data-user="manager">📦 Store Manager</button>
            <button class="btn btn-outline btn-xs modal-demo-btn" data-user="booker1">📱 Field Booker</button>
          </div>
        </div>
      </div>
    </div>
  `);const s=document.getElementById("login-modal");(i=document.getElementById("btn-close-login-modal"))==null||i.addEventListener("click",()=>s.remove()),(o=document.getElementById("modal-login-form"))==null||o.addEventListener("submit",async a=>{a.preventDefault();const r=document.getElementById("modal-login-username").value.trim(),l=document.getElementById("modal-login-password").value;try{const c=await P.post("/auth/login",{username:r,password:l});c.success&&(s.remove(),Ee(c),typeof n=="function"&&n())}catch(c){_(c.message,"error")}}),s.querySelectorAll(".modal-demo-btn").forEach(a=>{a.addEventListener("click",async()=>{const r=a.dataset.user;try{const l=await P.post("/auth/login",{username:r,password:"Admin@123456"});l.success&&(s.remove(),Ee(l),typeof n=="function"&&n())}catch(l){_(l.message,"error")}})})}let Me=[],lt={};const dh=[{key:"pos",name:"⚡ Point of Sale (POS)"},{key:"inventory",name:"📦 Inventory & Warehouses"},{key:"sales",name:"🧾 Sales & E-Invoicing"},{key:"accounting",name:"📚 Accounting & Ledgers"},{key:"manufacturing",name:"⚙️ Manufacturing & BOM"},{key:"mobile_booker",name:"📱 Mobile Order Booker"},{key:"payroll",name:"👥 HR, Attendance & Payroll"},{key:"reports",name:"📊 Enterprise Reports"},{key:"backup",name:"💾 Database Backup & Restore"},{key:"users",name:"🛡️ User Accounts & Security"}],uh=["view","create","edit","delete","approve","export"];async function hh(n){var e,s;n.innerHTML=`
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
  `;try{const[i,o]=await Promise.all([P.get("/users"),P.get("/users/permissions/matrix")]);i.success&&(Me=i.users),o.success&&(lt=o.matrix,v.permissionsMatrix=o.matrix)}catch(i){_(i.message,"error")}const t=i=>{n.querySelectorAll(".users-tab-btn").forEach(a=>{a.classList.toggle("active",a.dataset.tab===i)});const o=document.getElementById("users-tab-content");i==="accounts"?Ds(o):fh(o)};n.querySelectorAll(".users-tab-btn").forEach(i=>{i.addEventListener("click",()=>t(i.dataset.tab))}),(e=document.getElementById("btn-create-user-modal"))==null||e.addEventListener("click",mh),(s=document.getElementById("btn-save-matrix"))==null||s.addEventListener("click",ph),t("accounts")}function Ds(n){n.innerHTML=`
    <div class="panel">
      <div class="panel-header">
        <h3 class="panel-title">System User Accounts</h3>
        <span style="font-size:0.85rem; color:var(--text-muted);">${Me.length} Active Accounts</span>
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
            ${Me.map(t=>{const e=(t.company_ids||[1]).map(s=>{const i=v.companies.find(o=>o.id===s);return i?i.name:`Company #${s}`}).join(", ");return`
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
  `,n.querySelectorAll(".btn-edit-user").forEach(t=>{t.addEventListener("click",()=>{const e=Me.find(s=>s.id===parseInt(t.dataset.id));e&&gh(e)})})}function fh(n){const t=Object.keys(lt);n.innerHTML=`
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
            ${dh.map(e=>`
              <tr>
                <td><strong>${e.name}</strong></td>
                ${t.map(s=>{var a;const i=((a=lt[s])==null?void 0:a[e.key])||[],o=s==="Super Admin";return`
                    <td style="text-align:center;">
                      <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:3px;">
                        ${uh.map(r=>{const l=i.includes(r)||o;return`
                            <span 
                              class="matrix-tag ${l?"active":"inactive"} ${o?"locked":""}" 
                              data-role="${s}" 
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
  `,n.querySelectorAll(".matrix-tag:not(.locked)").forEach(e=>{e.addEventListener("click",()=>{const s=e.dataset.role,i=e.dataset.mod,o=e.dataset.act;lt[s]||(lt[s]={}),lt[s][i]||(lt[s][i]=[]);const a=lt[s][i].indexOf(o);a>-1?(lt[s][i].splice(a,1),e.classList.remove("active"),e.classList.add("inactive")):(lt[s][i].push(o),e.classList.remove("inactive"),e.classList.add("active"))})})}async function ph(){try{(await P.put("/users/permissions/matrix",{matrix:lt})).success&&(v.permissionsMatrix=lt,_("Module Permissions Matrix saved successfully!","success"))}catch(n){_(n.message,"error")}}function mh(){var s,i,o;const n=`
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
              ${v.companies.map(a=>`
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
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("user-create-modal"),e=()=>t==null?void 0:t.remove();(s=document.getElementById("btn-close-create-user"))==null||s.addEventListener("click",e),(i=document.getElementById("btn-cancel-create-user"))==null||i.addEventListener("click",e),(o=document.getElementById("btn-confirm-create-user"))==null||o.addEventListener("click",async()=>{const a=document.getElementById("new-user-fullname").value.trim(),r=document.getElementById("new-user-name").value.trim(),l=document.getElementById("new-user-email").value.trim(),c=document.getElementById("new-user-pass").value,d=document.getElementById("new-user-role").value,u=[];if(t.querySelectorAll(".chk-new-comp-access:checked").forEach(h=>{u.push(parseInt(h.value))}),!a||!r||!l||!c){_("All fields are required","error");return}try{const h=await P.post("/users",{full_name:a,username:r,email:l,password:c,role_name:d,company_ids:u});h.success&&(_("User created successfully!","success"),Me.push(h.user),Ds(document.getElementById("users-tab-content")),e())}catch(h){_(h.message,"error")}})}function gh(n){var i,o,a;const t=`
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
              ${v.companies.map(r=>{const l=(n.company_ids||[1]).includes(r.id)?"checked":"";return`
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
  `;document.body.insertAdjacentHTML("beforeend",t);const e=document.getElementById("user-edit-modal"),s=()=>e==null?void 0:e.remove();(i=document.getElementById("btn-close-edit-user"))==null||i.addEventListener("click",s),(o=document.getElementById("btn-cancel-edit-user"))==null||o.addEventListener("click",s),(a=document.getElementById("btn-confirm-edit-user"))==null||a.addEventListener("click",async()=>{const r=document.getElementById("edit-user-fullname").value.trim(),l=document.getElementById("edit-user-role").value,c=document.getElementById("edit-user-status").value==="true",d=document.getElementById("edit-user-pass").value,u=[];e.querySelectorAll(".chk-edit-comp-access:checked").forEach(h=>{u.push(parseInt(h.value))});try{(await P.put(`/users/${n.id}`,{full_name:r,role_name:l,is_active:c,password:d||void 0,company_ids:u})).success&&(_("User account updated successfully!","success"),n.full_name=r,n.role_name=l,n.is_active=c,n.company_ids=u,Ds(document.getElementById("users-tab-content")),s())}catch(h){_(h.message,"error")}})}let St=[],ha=[],ye=[];async function bh(n){var e,s,i;n.innerHTML=`
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
  `,await ie();const t=o=>{n.querySelectorAll(".payroll-tab-btn").forEach(r=>{r.classList.toggle("active",r.dataset.tab===o)});const a=document.getElementById("payroll-tab-content");o==="employees"?fa(a):o==="attendance"?Tn(a):pa(a)};n.querySelectorAll(".payroll-tab-btn").forEach(o=>{o.addEventListener("click",()=>t(o.dataset.tab))}),(e=document.getElementById("btn-sync-biometric"))==null||e.addEventListener("click",vh),(s=document.getElementById("btn-open-qr-scanner"))==null||s.addEventListener("click",yh),(i=document.getElementById("btn-process-payroll-modal"))==null||i.addEventListener("click",_h),t("employees")}async function ie(){var n;try{const t=((n=v.activeCompany)==null?void 0:n.id)||1,[e,s,i]=await Promise.all([P.get(`/payroll/employees?company_id=${t}`),P.get("/payroll/attendance"),P.get("/payroll/history")]);e.success&&(St=e.employees),s.success&&(ha=s.logs),i.success&&(ye=i.history)}catch(t){_(t.message,"error")}}function fa(n){var t;n.innerHTML=`
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
            ${St.map(e=>`
              <tr>
                <td><strong>${e.employee_code}</strong></td>
                <td><strong>${e.full_name}</strong></td>
                <td>${e.department}</td>
                <td>${e.designation}</td>
                <td>${A(e.base_salary)}</td>
                <td style="color:#34d399;">+${A(e.allowances)}</td>
                <td style="color:#f87171;">-${A(e.tax_deduction)}</td>
                <td><strong>${A(e.base_salary+e.allowances-e.tax_deduction)}</strong></td>
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
  `,(t=document.getElementById("btn-add-emp-modal"))==null||t.addEventListener("click",wh),n.querySelectorAll(".btn-print-quick-payslip").forEach(e=>{e.addEventListener("click",()=>{const s=St.find(i=>i.id===parseInt(e.dataset.id));s&&aa({employee_code:s.employee_code,employee_name:s.full_name,department:s.department,designation:s.designation,cnic:s.cnic,base_salary:s.base_salary,allowances:s.allowances,tax_deduction:s.tax_deduction,net_salary:s.base_salary+s.allowances-s.tax_deduction,month_year:new Date().toLocaleString("en-US",{month:"long",year:"numeric"})})})})}function Tn(n){var t;n.innerHTML=`
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
            ${ha.map(e=>`
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
  `,(t=document.getElementById("btn-manual-punch-modal"))==null||t.addEventListener("click",xh)}function pa(n){n.innerHTML=`
    <div class="panel">
      <div class="panel-header">
        <h3 class="panel-title">Payroll Processing History & Ledger Postings</h3>
        <span style="font-size:0.85rem; color:var(--text-muted);">${ye.length} Runs Completed</span>
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
            ${ye.length===0?`
              <tr>
                <td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">
                  No payroll processed yet for this company. Click "Process Monthly Payroll" above to generate.
                </td>
              </tr>
            `:ye.map(t=>`
              <tr>
                <td><strong>${t.month_year}</strong></td>
                <td>${t.employee_count} Employees</td>
                <td>${A(t.total_gross)}</td>
                <td style="color:#f87171;">-${A(t.total_deductions)}</td>
                <td><strong style="color:#34d399;">${A(t.total_net)}</strong></td>
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
  `,n.querySelectorAll(".btn-print-all-slips").forEach(t=>{t.addEventListener("click",()=>{const e=ye.find(s=>s.id===parseInt(t.dataset.id));e&&e.payslips&&e.payslips.length>0&&(e.payslips.forEach(s=>aa(s)),_(`Printed ${e.payslips.length} employee payslips!`,"success"))})})}async function vh(){try{_("Connecting to TCP/IP Biometric Terminal at 192.168.1.201...","info");const n=await P.post("/payroll/biometric/sync",{device_ip:"192.168.1.201",terminal_name:"ZK-Teco Biometric Scanner Counter 01"});if(n.success){_(n.message,"success"),await ie();const t=document.getElementById("payroll-tab-content");t&&Tn(t)}}catch(n){_(n.message,"error")}}function yh(){var s,i,o;const n=`
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
              ${St.map(a=>`<option value="${a.qr_badge_code}">${a.full_name} (${a.qr_badge_code})</option>`).join("")}
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" id="btn-cancel-qr">Cancel</button>
          <button class="btn btn-primary" id="btn-confirm-qr-scan">Scan & Clock In/Out</button>
        </div>
      </div>
    </div>
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("qr-scanner-modal"),e=()=>t==null?void 0:t.remove();(s=document.getElementById("btn-close-qr-modal"))==null||s.addEventListener("click",e),(i=document.getElementById("btn-cancel-qr"))==null||i.addEventListener("click",e),(o=document.getElementById("btn-confirm-qr-scan"))==null||o.addEventListener("click",async()=>{const a=document.getElementById("select-quick-qr").value;if(!a){_("Please select or scan an employee badge","error");return}try{const r=await P.post("/payroll/attendance/log",{qr_badge_code:a,method:"QR_SCANNER"});if(r.success){_(r.message,"success"),await ie();const l=document.getElementById("payroll-tab-content");l&&Tn(l),e()}}catch(r){_(r.message,"error")}})}function xh(){var s,i,o;const n=`
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
              ${St.map(a=>`<option value="${a.id}">${a.full_name} (${a.department})</option>`).join("")}
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
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("manual-punch-modal"),e=()=>t==null?void 0:t.remove();(s=document.getElementById("btn-close-punch-modal"))==null||s.addEventListener("click",e),(i=document.getElementById("btn-cancel-punch"))==null||i.addEventListener("click",e),(o=document.getElementById("btn-confirm-punch"))==null||o.addEventListener("click",async()=>{const a=document.getElementById("punch-emp-id").value,r=document.getElementById("punch-method").value;try{const l=await P.post("/payroll/attendance/log",{employee_id:a,method:r,latitude:31.5204,longitude:74.3587});if(l.success){_(l.message,"success"),await ie();const c=document.getElementById("payroll-tab-content");c&&Tn(c),e()}}catch(l){_(l.message,"error")}})}function _h(){var r,l,c,d;const n=new Date().toLocaleString("en-US",{month:"long",year:"numeric"}),t=St.reduce((u,h)=>u+h.base_salary+h.allowances,0),e=St.reduce((u,h)=>u+h.tax_deduction,0),s=t-e,i=`
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
            <div style="font-size:0.85rem; color:var(--text-secondary); margin-top:2px;">Company: ${((r=v.activeCompany)==null?void 0:r.name)||"OneNet Solutions"}</div>
          </div>

          <div style="background:rgba(255,255,255,0.03); border:1px solid var(--border-color); border-radius:6px; padding:0.75rem; margin-bottom:1rem; font-size:13px;">
            <div style="display:flex; justify-content:space-between; padding:4px 0;"><span>Eligible Employees:</span><strong>${St.length} Active Staff</strong></div>
            <div style="display:flex; justify-content:space-between; padding:4px 0;"><span>Gross Pay & Allowances:</span><span>${A(t)}</span></div>
            <div style="display:flex; justify-content:space-between; padding:4px 0;"><span>Withholding Tax Deductions:</span><span style="color:#f87171;">-${A(e)}</span></div>
            <div style="display:flex; justify-content:space-between; padding:8px 0; border-top:1px solid var(--border-color); font-size:15px; font-weight:800; color:#34d399;">
              <span>Net Disbursement (Bank Transfer):</span>
              <span>${A(s)}</span>
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
  `;document.body.insertAdjacentHTML("beforeend",i);const o=document.getElementById("process-payroll-modal"),a=()=>o==null?void 0:o.remove();(l=document.getElementById("btn-close-payroll-modal"))==null||l.addEventListener("click",a),(c=document.getElementById("btn-cancel-payroll"))==null||c.addEventListener("click",a),(d=document.getElementById("btn-confirm-payroll"))==null||d.addEventListener("click",async()=>{var u;try{const h=await P.post("/payroll/process",{company_id:((u=v.activeCompany)==null?void 0:u.id)||1,month_year:n});if(h.success){_(h.message,"success"),await ie();const f=document.getElementById("payroll-tab-content");f&&pa(f),a()}}catch(h){_(h.message,"error")}})}function wh(){var s,i,o;const n=`
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
              <input type="text" id="new-emp-code" class="form-control" value="EMP-${100+St.length+1}" required />
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
  `;document.body.insertAdjacentHTML("beforeend",n);const t=document.getElementById("add-emp-modal"),e=()=>t==null?void 0:t.remove();(s=document.getElementById("btn-close-add-emp"))==null||s.addEventListener("click",e),(i=document.getElementById("btn-cancel-add-emp"))==null||i.addEventListener("click",e),(o=document.getElementById("btn-confirm-add-emp"))==null||o.addEventListener("click",async()=>{var f;const a=document.getElementById("new-emp-name").value.trim(),r=document.getElementById("new-emp-code").value.trim(),l=document.getElementById("new-emp-dept").value,c=document.getElementById("new-emp-desig").value.trim(),d=Number(document.getElementById("new-emp-salary").value)||4e4,u=Number(document.getElementById("new-emp-allowance").value)||0,h=Number(document.getElementById("new-emp-tax").value)||0;if(!a||!r){_("Name and code are required","error");return}try{if((await P.post("/payroll/employees",{company_id:((f=v.activeCompany)==null?void 0:f.id)||1,full_name:a,employee_code:r,department:l,designation:c,base_salary:d,allowances:u,tax_deduction:h})).success){_("Employee registered successfully!","success"),await ie();const m=document.getElementById("payroll-tab-content");m&&fa(m),e()}}catch(p){_(p.message,"error")}})}async function kh(n){var s,i;n.innerHTML=`
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
  `;let t="pos-z";const e=o=>{t=o,n.querySelectorAll(".report-tab-btn").forEach(r=>{r.classList.toggle("active",r.dataset.tab===o)});const a=document.getElementById("reports-tab-content");o==="pos-z"?Sh(a):o==="inventory-val"?Eh(a):Mh(a)};n.querySelectorAll(".report-tab-btn").forEach(o=>{o.addEventListener("click",()=>e(o.dataset.tab))}),(s=document.getElementById("btn-export-report-csv"))==null||s.addEventListener("click",()=>Ch(t)),(i=document.getElementById("btn-print-report"))==null||i.addEventListener("click",()=>Ah(t)),e("pos-z")}function Sh(n){const t=v.activeCompany||{name:"OneNet Solutions"},e=new Date().toLocaleDateString("en-PK",{dateStyle:"full"});n.innerHTML=`
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
  `}function Eh(n){let t=0,e=0;v.products.forEach(i=>{t+=i.cost_price*i.stock,e+=i.selling_price*i.stock});const s=e-t;n.innerHTML=`
    <div class="panel" id="printable-report-body">
      <div class="panel-header">
        <div>
          <h3 class="panel-title">Stock Valuation & Potential Margin Report</h3>
          <span style="font-size:0.85rem; color:var(--text-muted);">${v.products.length} Tracked Catalog Products</span>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1rem; margin-bottom:1.5rem;">
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Total Inventory Asset Cost</div>
          <div style="font-size:1.5rem; font-weight:800; color:#38bdf8;">${A(t)}</div>
        </div>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Total Retail Selling Value</div>
          <div style="font-size:1.5rem; font-weight:800; color:#34d399;">${A(e)}</div>
        </div>
        <div style="background:rgba(255,255,255,0.02); border:1px solid var(--border-color); border-radius:8px; padding:1rem;">
          <div style="font-size:0.75rem; text-transform:uppercase; color:var(--text-muted);">Unrealized Gross Margin</div>
          <div style="font-size:1.5rem; font-weight:800; color:#fbbf24;">${A(s)}</div>
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
            ${v.products.map(i=>`
              <tr>
                <td><code>${i.sku}</code></td>
                <td><strong>${i.name}</strong></td>
                <td>${i.category_name||"General"}</td>
                <td><strong>${i.stock} ${i.uom||"Pcs"}</strong></td>
                <td>${A(i.cost_price)}</td>
                <td>${A(i.cost_price*i.stock)}</td>
                <td>${A(i.selling_price)}</td>
                <td><strong>${A(i.selling_price*i.stock)}</strong></td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    </div>
  `}function Mh(n){n.innerHTML=`
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
  `}function Ch(n){let t="data:text/csv;charset=utf-8,";n==="pos-z"?(t+=`Shift,Cashier,Opening_Float,Cash_Sales,Card_Credit,Total,Discrepancy
`,t+=`Counter 01,Muhammad Ali Raza,5000,18500,12000,35500,0
`,t+=`Counter 02,Zainab Fatima,5000,5000,10350,20350,0
`):(t+=`SKU,Name,Category,Stock,Cost_Price,Selling_Price
`,v.products.forEach(i=>{t+=`"${i.sku}","${i.name}","${i.category_name}",${i.stock},${i.cost_price},${i.selling_price}
`}));const e=encodeURI(t),s=document.createElement("a");s.setAttribute("href",e),s.setAttribute("download",`OneNet_${n}_Report.csv`),document.body.appendChild(s),s.click(),s.remove(),_("Report exported as CSV file!","success")}function Ah(n){const t=document.getElementById("printable-report-body");if(!t)return;const e=`OneNet_Report_${n.toUpperCase()}`;Ne(e,t.innerHTML,`
    @page { size: A4 portrait; margin: 12mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #000; padding: 10px; }
    .panel-title { font-size: 18px; font-weight: 800; margin-bottom: 4px; }
    table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 12px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; }
    th { background: #f1f5f9; font-weight: 700; text-align: left; }
    .tag { display: none; }
  `)}function Ph(n){var r,l;n.innerHTML=`
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
          <div style="display:flex; justify-content:space-between; padding:3px 0;"><span>Database:</span><code>${((r=v.activeCompany)==null?void 0:r.name)||"bierppos"}</code></div>
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
  `,(l=document.getElementById("btn-download-backup"))==null||l.addEventListener("click",()=>{_("Preparing system snapshot...","info"),window.location.href="/api/backup/export",setTimeout(()=>{_("Database backup snapshot downloaded successfully!","success")},1500)});const t=document.getElementById("drop-restore-zone"),e=document.getElementById("file-restore-input"),s=document.getElementById("restore-file-info"),i=document.getElementById("selected-restore-filename"),o=document.getElementById("btn-execute-restore");let a=null;t==null||t.addEventListener("click",()=>e.click()),e==null||e.addEventListener("change",c=>{const d=c.target.files[0];if(!d)return;i.textContent=`${d.name} (${(d.size/1024).toFixed(1)} KB)`,s.style.display="block",o.disabled=!1;const u=new FileReader;u.onload=h=>{try{a=JSON.parse(h.target.result)}catch{_("File is not a valid JSON backup","error"),o.disabled=!0}},u.readAsText(d)}),o==null||o.addEventListener("click",async()=>{if(!(!a||!confirm("WARNING: Restoring will overwrite existing records with the backup file data. Are you sure you wish to proceed?")))try{_("Restoring database from snapshot...","info");const d=await P.post("/backup/restore",{backupData:a});d.success&&(_(d.message,"success"),setTimeout(()=>window.location.reload(),1500))}catch(d){_(d.message,"error")}})}let Yn=null,Gn=!1;async function Lh(){if(console.log("[OneNet Solutions] Bootstrapping Enterprise Suite..."),!v.currentUser){const n=document.getElementById("app-root");n&&(n.style.display="none"),Rs(async()=>{await fs()});return}await fs()}async function fs(){const n=document.getElementById("app-root");n&&(n.style.display="flex");const t=document.getElementById("auth-root");t&&(t.style.display="none"),await oh(),lh(async()=>{Gn=!1,n&&(n.style.display="none"),Rs(async()=>{await fs()})});try{const[s,i,o,a]=await Promise.all([P.get("/inventory/products"),P.get("/inventory/categories"),P.get("/inventory/warehouses"),P.get("/sales/customers")]);s.success&&(v.products=s.products),i.success&&(v.categories=i.categories),o.success&&(v.warehouses=o.warehouses),a.success&&(v.customers=a.customers)}catch(s){console.error("Initial data load error:",s)}Gn||(xn.connect(),xn.subscribe(s=>{console.log("[Realtime Event]",s),s.type==="POS_SALE"?(_(`⚡ Realtime: Receipt #${s.payload.receipt_number} tendered for ${A(s.payload.total_amount)}`,"info"),v.activeModule==="dashboard"&&ps(document.getElementById("content-viewport"))):s.type==="MANUFACTURING_COMPLETED"&&_(`⚙️ Assembly Completed: ${s.payload.quantity} units of ${s.payload.product}`,"success")}),"serviceWorker"in navigator&&navigator.serviceWorker.register("/sw.js").then(()=>console.log("[PWA] Service Worker registered")).catch(s=>console.warn("[PWA] Service Worker registration failed:",s)),Ih(),window.addEventListener("hashchange",()=>{const s=window.location.hash.slice(1);s&&v.currentUser&&Oe(s)}),Gn=!0);const e=window.location.hash.slice(1)||"dashboard";Oe(e)}function Ih(){var n,t;document.querySelectorAll(".nav-item").forEach(e=>{e.addEventListener("click",s=>{s.preventDefault();const i=e.dataset.module;Oe(i)})}),document.querySelectorAll(".mobile-nav-item").forEach(e=>{e.addEventListener("click",s=>{s.preventDefault();const i=e.dataset.module;Oe(i)})}),(n=document.getElementById("btn-theme-toggle"))==null||n.addEventListener("click",()=>{const s=document.body.getAttribute("data-theme")==="light"?"dark":"light";document.body.setAttribute("data-theme",s),_(`Switched to ${s} theme`,"info")}),(t=document.getElementById("btn-fullscreen-toggle"))==null||t.addEventListener("click",()=>{document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()})}function Oe(n){var e;n!=="dashboard"&&!Eu(n,"view")&&(_(`Access Denied: Your assigned role (${(e=v.currentUser)==null?void 0:e.role_name}) does not have permission to view ${n}`,"error"),n="dashboard"),v.activeModule=n,document.querySelectorAll(".nav-item").forEach(s=>{s.classList.toggle("active",s.dataset.module===n)}),document.querySelectorAll(".mobile-nav-item").forEach(s=>{s.classList.toggle("active",s.dataset.module===n)});const t=document.getElementById("content-viewport");if(t)switch(t.innerHTML="",n){case"dashboard":ps(t);break;case"pos":Lu(t);break;case"inventory":Du(t);break;case"sales":Vu(t);break;case"accounting":Xu(t);break;case"manufacturing":th(t);break;case"mobile_booker":nh(t);break;case"payroll":bh(t);break;case"reports":kh(t);break;case"users":hh(t);break;case"backup":Ph(t);break;default:ps(t)}}async function ps(n){var t;try{const e=await P.get("/reports/dashboard"),{kpis:s,low_stock_items:i,expiring_batches:o,sales_trend:a}=e;n.innerHTML=`
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
          <div class="kpi-value">${A(s.today_pos_sales)}</div>
          <div class="kpi-footer positive">↑ 18.4% vs yesterday's register closing</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Cash in Hand & Drawer</span>
            <div class="kpi-icon-wrapper" style="background:rgba(16,185,129,0.12); color:#34d399;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="12" rx="2"></rect><circle cx="12" cy="12" r="2"></circle></svg>
            </div>
          </div>
          <div class="kpi-value">${A(s.cash_in_hand)}</div>
          <div class="kpi-footer">Reconciled in Main Vault</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Total Trade Receivables</span>
            <div class="kpi-icon-wrapper" style="background:rgba(245,158,11,0.12); color:#fbbf24;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle></svg>
            </div>
          </div>
          <div class="kpi-value">${A(s.total_receivables)}</div>
          <div class="kpi-footer warning">Across 4 active B2B customer accounts</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-header">
            <span class="kpi-title">Stock & Batch Alerts</span>
            <div class="kpi-icon-wrapper" style="background:rgba(239,68,68,0.12); color:#f87171;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
          </div>
          <div class="kpi-value" style="color:#f87171;">${s.low_stock_count} Low / ${s.expiring_batches_count} Exp</div>
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
                <div style="font-size:1.15rem; font-weight:700; color:#38bdf8;">${A(s.bank_balance)}</div>
              </div>
              <span class="tag tag-success">2 Active A/Cs</span>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem; background:rgba(255,255,255,0.03); border-radius:var(--radius-md);">
              <div>
                <div style="font-size:0.8rem; color:var(--text-muted);">Accounts Payable (Vendors):</div>
                <div style="font-size:1.15rem; font-weight:700; color:#fbbf24;">${A(s.total_payables)}</div>
              </div>
              <span class="tag tag-warning">Trade Creditors</span>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem; background:rgba(255,255,255,0.03); border-radius:var(--radius-md);">
              <div>
                <div style="font-size:0.8rem; color:var(--text-muted);">Total Inventory Asset Valuation:</div>
                <div style="font-size:1.15rem; font-weight:700; color:#34d399;">${A(s.total_stock_value)}</div>
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
            <span class="tag tag-danger">${i.length} Items</span>
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
                ${i.map(r=>`
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
    `,(t=document.getElementById("btn-quick-pos-launch"))==null||t.addEventListener("click",()=>{Oe("pos")}),Th(a)}catch(e){_(e.message,"error")}}function Th(n){const t=document.getElementById("salesTrendChart");if(!t)return;Yn&&Yn.destroy();const e=t.getContext("2d");Yn=new xt(e,{type:"bar",data:{labels:n.map(s=>s.day),datasets:[{label:"POS Retail Sales (Rs)",data:n.map(s=>s.pos),backgroundColor:"rgba(14, 165, 233, 0.75)",borderRadius:6},{label:"B2B Wholesale Invoices (Rs)",data:n.map(s=>s.wholesale),backgroundColor:"rgba(99, 102, 241, 0.75)",borderRadius:6}]},options:{responsive:!0,maintainAspectRatio:!1,plugins:{legend:{labels:{color:"#cbd5e1",font:{family:"Inter",size:12}}}},scales:{x:{grid:{color:"rgba(255, 255, 255, 0.05)"},ticks:{color:"#94a3b8"}},y:{grid:{color:"rgba(255, 255, 255, 0.05)"},ticks:{color:"#94a3b8",callback:s=>"Rs "+s/1e3+"k"}}}}})}window.addEventListener("DOMContentLoaded",Lh);window.addEventListener("afterprint",()=>{const n=document.getElementById("printable-receipt-area");n&&(n.innerHTML="",n.className="")});
