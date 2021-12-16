"use strict";(this.webpackChunkpotioncraft_mapmixer_web=this.webpackChunkpotioncraft_mapmixer_web||[]).push([[742],{1758:(e,t,n)=>{n.d(t,{f:()=>u});var r=function(){return r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},r.apply(this,arguments)},o=n(67294),a=n(71642),c=n(90386),i=n(7916),l=function(){},u=o.forwardRef((function(e,t){var n=o.useRef(null),a=o.useState({onScrollCapture:l,onWheelCapture:l,onTouchMoveCapture:l}),u=a[0],s=a[1],f=e.forwardProps,d=e.children,v=e.className,h=e.removeScrollBar,p=e.enabled,m=e.shards,w=e.sideCar,b=e.noIsolation,y=e.inert,g=e.allowPinchZoom,C=e.as,E=void 0===C?"div":C,k=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n}(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noIsolation","inert","allowPinchZoom","as"]),S=w,L=(0,i.q)([n,t]),R=r({},k,u);return o.createElement(o.Fragment,null,p&&o.createElement(S,{sideCar:c._,removeScrollBar:h,shards:m,noIsolation:b,inert:y,setCallbacks:s,allowPinchZoom:!!g,lockRef:n}),f?o.cloneElement(o.Children.only(d),r({},R,{ref:L})):o.createElement(E,r({},R,{className:v,ref:L}),d))}));u.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1},u.classNames={fullWidth:a.zi,zeroRight:a.pF}},90386:(e,t,n)=>{n.d(t,{_:()=>r});var r=(0,n(87122)._)()},6738:(e,t,n)=>{var r=n(66781),o=n(67294),a=n(32506),c=n(78232),i=function(e,t){var n=t;do{if("undefined"!=typeof ShadowRoot&&n instanceof ShadowRoot&&(n=n.host),l(e,n)){var r=u(e,n);if(r[1]>r[2])return!0}n=n.parentNode}while(n&&n!==document.body);return!1},l=function(e,t){return"v"===e?function(e){var t=window.getComputedStyle(e);return"hidden"!==t.overflowY&&!(t.overflowY===t.overflowX&&"visible"===t.overflowY)}(t):function(e){var t=window.getComputedStyle(e);return"range"===e.type||"hidden"!==t.overflowX&&!(t.overflowY===t.overflowX&&"visible"===t.overflowX)}(t)},u=function(e,t){return"v"===e?[(n=t).scrollTop,n.scrollHeight,n.clientHeight]:function(e){return[e.scrollLeft,e.scrollWidth,e.clientWidth]}(t);var n},s=!1;if("undefined"!=typeof window)try{var f=Object.defineProperty({},"passive",{get:function(){return s=!0,!0}});window.addEventListener("test",f,f),window.removeEventListener("test",f,f)}catch(e){s=!1}var d=!!s&&{passive:!1},v=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},h=function(e){return[e.deltaX,e.deltaY]},p=function(e){return e&&"current"in e?e.current:e},m=function(e){return"\n  .block-interactivity-"+e+" {pointer-events: none;}\n  .allow-interactivity-"+e+" {pointer-events: all;}\n"},w=0,b=[],y=n(90386);(0,r.L)(y._,(function(e){var t=o.useRef([]),n=o.useRef([0,0]),r=o.useRef(),s=o.useState(w++)[0],f=o.useState((function(){return(0,c.Ws)()}))[0],y=o.useRef(e);o.useEffect((function(){y.current=e}),[e]),o.useEffect((function(){if(e.inert){document.body.classList.add("block-interactivity-"+s);var t=[e.lockRef.current].concat((e.shards||[]).map(p)).filter(Boolean);return t.forEach((function(e){return e.classList.add("allow-interactivity-"+s)})),function(){document.body.classList.remove("block-interactivity-"+s),t.forEach((function(e){return e.classList.remove("allow-interactivity-"+s)}))}}}),[e.inert,e.lockRef.current,e.shards]);var g=o.useCallback((function(e,t){if("touches"in e&&2===e.touches.length)return!y.current.allowPinchZoom;var o,a=v(e),c=n.current,s="deltaX"in e?e.deltaX:c[0]-a[0],f="deltaY"in e?e.deltaY:c[1]-a[1],d=e.target,h=Math.abs(s)>Math.abs(f)?"h":"v",p=i(h,d);if(!p)return!0;if(p?o=h:(o="v"===h?"h":"v",p=i(h,d)),!p)return!1;if(!r.current&&"changedTouches"in e&&(s||f)&&(r.current=o),!o)return!0;var m=r.current||o;return function(e,t,n,r,o){var a=r,c=n.target,i=t.contains(c),s=!1,f=a>0,d=0,v=0;do{var h=u(e,c),p=h[0],m=h[1]-h[2]-p;(p||m)&&l(e,c)&&(d+=m,v+=p),c=c.parentNode}while(!i&&c!==document.body||i&&(t.contains(c)||t===c));return(f&&(0===d||!1)||!f&&(0===v||!1))&&(s=!0),s}(m,t,e,"h"===m?s:f)}),[]),C=o.useCallback((function(e){var n=e;if(b.length&&b[b.length-1]===f){var r="deltaY"in n?h(n):v(n),o=t.current.filter((function(e){return e.name===n.type&&e.target===n.target&&(t=e.delta,o=r,t[0]===o[0]&&t[1]===o[1]);var t,o}))[0];if(o&&o.should)n.preventDefault();else if(!o){var a=(y.current.shards||[]).map(p).filter(Boolean).filter((function(e){return e.contains(n.target)}));(a.length>0?g(n,a[0]):!y.current.noIsolation)&&n.preventDefault()}}}),[]),E=o.useCallback((function(e,n,r,o){var a={name:e,delta:n,target:r,should:o};t.current.push(a),setTimeout((function(){t.current=t.current.filter((function(e){return e!==a}))}),1)}),[]),k=o.useCallback((function(e){n.current=v(e),r.current=void 0}),[]),S=o.useCallback((function(t){E(t.type,h(t),t.target,g(t,e.lockRef.current))}),[]),L=o.useCallback((function(t){E(t.type,v(t),t.target,g(t,e.lockRef.current))}),[]);o.useEffect((function(){return b.push(f),e.setCallbacks({onScrollCapture:S,onWheelCapture:S,onTouchMoveCapture:L}),document.addEventListener("wheel",C,d),document.addEventListener("touchmove",C,d),document.addEventListener("touchstart",k,d),function(){b=b.filter((function(e){return e!==f})),document.removeEventListener("wheel",C,d),document.removeEventListener("touchmove",C,d),document.removeEventListener("touchstart",k,d)}}),[]);var R=e.removeScrollBar,O=e.inert;return o.createElement(o.Fragment,null,O?o.createElement(f,{styles:m(s)}):null,R?o.createElement(a.jp,{gapMode:"margin"}):null)}))}}]);
//# sourceMappingURL=npm.react-remove-scroll.67f34ecf2c2935d929e7.bundle.js.map