import{a as o,t as c,c as E}from"../chunks/disclose-version.DHz0PKsI.js";import{p as L,u as j,a as A,f as _,s,c as n,r as m,g as a,d as P}from"../chunks/runtime.B6coxiGD.js";import{i as x}from"../chunks/if.PCbA7Ql5.js";import{e as q,i as z}from"../chunks/each.Czia2JB_.js";import{m as e}from"../chunks/models.svelte.CU4x2gqc.js";import{E as F,C as G,L as H,a as I,M as J}from"../chunks/Card.DuwvGctI.js";import{D as K}from"../chunks/DeleteBtn.DejIb-TN.js";var N=c('<div class="card-actions flex flex-row gap-2 mt-6 justify-end"><span class="flex flex-row gap-2"></span> <!> <!></div>'),O=c('<h1 class="text-3xl font-bold mb-8">Models</h1> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!> <!></div>',1),Q=c('<div class="p-6 max-w-7xl mx-auto w-full"><!></div>');function Z(h,C){L(C,!0),j(()=>{e.retrieve()});const M=r=>{confirm("Are you sure you want to delete this model?")&&e.delete(r)};var i=Q(),b=n(i);x(b,()=>e.loading,r=>{H(r)},r=>{var p=E(),k=_(p);x(k,()=>e.error,d=>{F(d,{get error(){return e.error}})},d=>{var v=O(),f=s(_(v),2),g=n(f);G(g,{title:"Create Model",description:"Create a model to automatically label data",link:"/models/create"});var w=s(g,2);q(w,17,()=>e.data,z,($,t)=>{I($,{get name(){return a(t).name},get description(){return a(t).description},children:(y,R)=>{var l=N(),u=s(n(l),2);K(u,{onclick:()=>M(a(t).id)});var B=s(u,2),D=P(()=>`/models/model?id=${a(t).id}`);J(B,{get link(){return a(D)}}),m(l),o(y,l)},$$slots:{default:!0}})}),m(f),o(d,v)},!0),o(r,p)}),m(i),o(h,i),A()}export{Z as component};
