import{p as i}from"./proxy.B3-__M_J.js";import{e as c,g as l,b as n}from"./runtime.B40kIuYm.js";import{f as g,P as d}from"./fetcher.BMDzGJ_8.js";async function p(){const r=`${d}/_plugins`;return g(r)}const f=async r=>{const t=`${d}/_plugins`;return g(t,"POST",{name:r})},m=async r=>{const t=`${d}/_plugins/${r}`;return g(t,"DELETE")};function y(){let r=c(i([])),t=c(!0),u=c(null);return{get data(){return l(r)},get loading(){return l(t)},get error(){return l(u)},retrieve:async()=>{n(t,!0);const{data:e,error:a}=await p();a&&n(u,i(a.message)),n(r,i(e)),n(t,!1)},enable:async e=>{const{data:a,error:s}=await f(e);if(s)throw s;n(r,i(l(r).map(o=>o.name===e?a:o)))},disable:async e=>{const{data:a,error:s}=await m(e);s&&console.error(s),n(r,i(l(r).map(o=>o.name===e?a:o)))}}}const w=y();export{w as p};
