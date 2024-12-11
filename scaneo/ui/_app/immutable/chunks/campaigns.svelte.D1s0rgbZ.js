import{p as l}from"./proxy.B3-__M_J.js";import{e as p,g as r,b as e}from"./runtime.B40kIuYm.js";import{f as C,P as y}from"./fetcher.BMDzGJ_8.js";async function E(){const n=`${y}/_campaigns`;return C(n)}async function O(n){const u=`${y}/_campaigns/${n}`;return C(u)}const N=async n=>{const u=`${y}/_campaigns/${n}`;return C(u,"DELETE")};function W(){let n=p(l([])),u=p(!0),_=p(null),$=p(null),c=p(0),g=p(""),i=p(null),m=p(!1),d=p(!1),f=p(!1);const x=(a,s)=>{e(i,l(new WebSocket(`${y.replace("https://","ws://")}/_campaigns/${s}`))),r(i).onmessage=t=>{const o=JSON.parse(t.data);o.status==="processing"?(e(c,l(parseFloat(o.progress))),e(g,l(o.message)),e(m,!0)):o.status==="complete"?(console.log("complete"),e(n,l([o.data,...r(n)])),e(c,1),e(g,"Campaign created"),e(m,!1),e(f,!0)):o.status==="error"&&(console.log("error"),console.log(o.error),e(c,1),e(g,"Error creating campaign"),e(m,!1),e(f,!1),alert(o.error))},r(i).onopen=()=>{e(c,0),e(g,"Creating campaign..."),e(m,!0),e(f,!1),r(i).send(JSON.stringify(a))}},w=a=>{e(i,l(new WebSocket(`${y.replace("https://","ws://")}/_campaigns/${a}/export`))),r(i).onmessage=s=>{const t=JSON.parse(s.data);t.status==="exporting"?(e(c,l(parseFloat(t.progress))),e(g,l(t.message)),e(d,!0)):t.status==="complete"?(console.log("complete"),e(c,1),e(g,"Campaign exported"),e(d,!1),e(f,!0)):t.status==="error"&&(console.log("error"),console.log(t.error),e(c,1),e(g,"Error exporting campaign"),e(d,!1),e(f,!1),alert(t.error))},r(i).onopen=()=>{e(c,0),e(g,"Exporting campaign..."),e(d,!0),e(f,!1),r(i).send(JSON.stringify({}))}};return{get data(){return r(n)},get loading(){return r(u)},get error(){return r(_)},get current(){return r($)},get progress(){return r(c)},get message(){return r(g)},get creating(){return r(m)},get exporting(){return r(d)},get completed(){return r(f)},reset:()=>{e(c,0),e(g,""),e(m,!1),e(d,!1),e(f,!1)},retrieve:async()=>{e(u,!0);const{data:a,error:s}=await E();s&&e(_,l(s.message)),e(n,l(a)),e(u,!1)},create:async(a,s,t,o,S)=>{x({name:a,description:s,path:t,labels:o,labelMappings:S},"create")},createEOTDL:async(a,s,t,o,S)=>{x({name:a,description:s,eotdlDatasetId:t,labels:o,labelMappings:S},"create-eotdl")},import:async(a,s,t)=>{x({name:a,description:s,path:t},"import")},cancel:()=>{r(i)&&r(i).readyState===WebSocket.OPEN&&(r(i).close(),e(g,"Cancelled"),e(c,0),e(m,!1),e(d,!1),e(f,!1))},delete:async a=>{const{data:s,error:t}=await N(a);t&&console.error(t),e(n,l(r(n).filter(o=>o.id!==a)))},retrieveOne:async a=>{const{data:s,error:t}=await O(a);t&&console.error(r(_)),e($,l(s))},export:async a=>{w(a)}}}const L=W();export{L as c};
