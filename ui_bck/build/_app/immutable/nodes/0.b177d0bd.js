import{S as u,i as p,s as c,C as f,D as _,E as m,F as g,g as d,d as S,G as b}from"../chunks/index.a81f82fa.js";import{p as h}from"../chunks/stores.4848db18.js";import{r as y,o as $,u as v}from"../chunks/optionsStore.11207384.js";const O=!0,F="always",B=Object.freeze(Object.defineProperty({__proto__:null,prerender:O,trailingSlash:F},Symbol.toStringTag,{value:"Module"})),L=()=>{const o=y("options");o&&$.setOptions(o)},i=o=>{v.store(o)};function j(o){let s;const n=o[1].default,t=f(n,o,o[0],null);return{c(){t&&t.c()},l(e){t&&t.l(e)},m(e,r){t&&t.m(e,r),s=!0},p(e,[r]){t&&t.p&&(!s||r&1)&&_(t,n,e,e[0],s?g(n,e[0],r,null):m(e[0]),null)},i(e){s||(d(t,e),s=!0)},o(e){S(t,e),s=!1},d(e){t&&t.d(e)}}}function C(o,s,n){let t;b(o,h,l=>n(2,t=l));let{$$slots:e={},$$scope:r}=s,a=t.url.origin+t.url.pathname;return o.$$set=l=>{"$$scope"in l&&n(0,r=l.$$scope)},a&&(a.endsWith("/")?i(a):i(a+"/")),L(),[r,e]}class D extends u{constructor(s){super(),p(this,s,C,j,c,{})}}export{D as component,B as universal};
