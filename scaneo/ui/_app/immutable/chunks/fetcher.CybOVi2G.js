import{p as o}from"./proxy.B3-__M_J.js";import{b as i,g as c,e as f}from"./runtime.B40kIuYm.js";function l(){let e=f(null);return{set url(t){i(e,o(t))},get url(){return c(e)}}}const g=l();async function d(e,t,n){const r={method:t||"GET",headers:new Headers({"Content-Type":"application/json"}),credentials:"same-origin"};t&&t!=="GET"&&(r.body=JSON.stringify(n));const s=await fetch(e,r),a=await s.json();return s.status!==200?{error:a.detail}:{data:a}}export{g as b,d as f};
