import{w as c}from"./singletons.d641fdd2.js";import{M as n}from"./index.a81f82fa.js";const l={labelsEndpoint:"labels",geojsonEndpoint:"geojson",imagesEndpoint:"images",samEndpoint:"sam"},u={defaultUrl:"",...l};function d(e){const t=c(e),{subscribe:o,set:r}=t;return{subscribe:o,retrieve:()=>n(t),store:s=>r(s)}}const g=d(u.defaultUrl),m={bands:{red:4,green:3,blue:2},stretch:{minimum:0,maximum:3e3}},y=.3,v="",S="#ff8000",k=22,w="Somethig went wrong...",E="topright",D={loading:"Processing...",success:"Saved!"},O={loading:"Loading...",success:"Loaded!"},I=.4,C={type:"FeatureCollection",features:[]},T="viridis",A={pane:"default"},P={polyline:!1,circlemarker:!1,circle:!1,marker:!1,polygon:!1,rectangle:{repeatMode:!0,showArea:!0,showLength:!0,shapeOptions:{weight:1}}},U=0,q=100,z=(e,t)=>{localStorage.setItem(e,JSON.stringify(t))},M=e=>{const t=localStorage.getItem(e);return t?JSON.parse(t):null},N=e=>{const t=L.latLng(e[1],e[0]),o=L.latLng(e[3],e[2]);return L.latLngBounds(t,o)},j=e=>[e.getSouthWest(),e.getSouthEast(),e.getNorthEast(),e.getNorthWest()],B=e=>{const o=e.geometry.coordinates.flat();let r,s;return o.length?[r,s]=o[0]:[r,s]=o,[r,s]},i=e=>{e.preventDefault()},F=()=>{const e=document.querySelector(".blocker");e&&(e.classList.add("z-[999]"),document.addEventListener("keydown",i))},K=()=>{const e=document.querySelector(".blocker");e&&(e.style.opacity="0",setTimeout(()=>{e.classList.remove("z-[999]"),document.removeEventListener("keydown",i)},150))},W=()=>{const e=document.querySelector(".blocker");e&&(e.style.transition="opacity 0.5s ease-in-out",e.style.opacity="0.4")},x=()=>window.confirm("Do you want to save your progress?"),J=e=>e.charAt(0).toUpperCase()+e.slice(1),_=()=>{const e=document.querySelector('[title="Cancel editing, discards all changes"]');e&&e.click()},R=(e,t)=>{Object.keys(t).forEach(r=>{e.addLayer(t[r])})},V=(e,t)=>{Object.keys(t).forEach(r=>{e==null||e.removeLayer(t[r])})},G=async(e,t)=>await fetch(g.retrieve()+t,{method:"POST",headers:{"Content-Type":"application/json"},body:e}),f={...m,opacity:y};function p(){const e=c(f),{subscribe:t,update:o,set:r}=e;return{subscribe:t,bands:{red:{store:s=>o(a=>({...a,bands:{...a.bands,red:s}})),retrieve:()=>n(e).bands.red},green:{store:s=>o(a=>({...a,bands:{...a.bands,green:s}})),retrieve:()=>n(e).bands.green},blue:{store:s=>o(a=>({...a,bands:{...a.bands,blue:s}})),retrieve:()=>n(e).bands.blue}},stretch:{minimum:{store:s=>o(a=>({...a,stretch:{...a.stretch,minimum:s}})),retrieve:()=>n(e).stretch.minimum},maximum:{store:s=>o(a=>({...a,stretch:{...a.stretch,maximum:s}})),retrieve:()=>n(e).stretch.maximum}},opacity:{store:s=>o(a=>({...a,opacity:s})),retrieve:()=>n(e).opacity},retrieve:()=>n(e),setOptions:s=>r(s)}}const H=p();export{k as A,W as B,O as C,v as D,S as E,R as a,V as b,j as c,l as d,U as e,C as f,N as g,J as h,E as i,T as j,A as k,B as l,I as m,F as n,H as o,P as p,G as q,M as r,z as s,w as t,g as u,K as v,D as w,x,q as y,_ as z};
