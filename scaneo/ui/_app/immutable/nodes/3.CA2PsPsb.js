import{a as n,t as g,c as z}from"../chunks/disclose-version.hHXjza9X.js";import{p as F,u as G,a as H,f as h,s,c as i,r as o,g as a,d as c}from"../chunks/runtime.B40kIuYm.js";import{i as w}from"../chunks/if.BU02RLSO.js";import{e as I,i as J}from"../chunks/each.DvJ5DvNT.js";import{c as e}from"../chunks/campaigns.svelte.ywvMa4Y-.js";import{E as K,C as N,L as O,a as Q,M as R}from"../chunks/Card.CbjE5Od_.js";import{L as T,E as U}from"../chunks/ExportBtn.BY8iao7l.js";import{D as V}from"../chunks/DeleteBtn.BX9MUm6E.js";var W=g('<div class="card-actions flex flex-row gap-2 mt-6 justify-between"><span class="flex flex-row gap-2"><!> <!></span> <span class="flex flex-row gap-2"><!> <!></span></div>'),X=g('<h1 class="text-3xl font-bold mb-8">Campaigns</h1> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!> <!></div>',1),Y=g('<div class="p-6 max-w-7xl mx-auto w-full"><!></div>');function da(C,$){F($,!0),G(()=>{e.retrieve()});const B=t=>{confirm("Are you sure you want to delete this campaign?")&&e.delete(t)};var d=Y(),E=i(d);w(E,()=>e.loading,t=>{O(t)},t=>{var v=z(),L=h(v);w(L,()=>e.error,l=>{K(l,{get error(){return e.error}})},l=>{var f=X(),u=s(h(f),2),_=i(u);N(_,{title:"Create Campaign",description:"Start a new campaign and begin labelling data",link:"/campaigns/create"});var y=s(_,2);I(y,17,()=>e.data,J,(M,r)=>{Q(M,{get name(){return a(r).name},get description(){return a(r).description},children:(D,Z)=>{var p=W(),m=i(p),x=i(m),j=c(()=>`/campaigns/label?id=${a(r).id}`);T(x,{get link(){return a(j)}});var A=s(x,2),P=c(()=>`/campaigns/export?id=${a(r).id}`);U(A,{get link(){return a(P)}}),o(m);var b=s(m,2),k=i(b);V(k,{onclick:()=>B(a(r).id)});var S=s(k,2),q=c(()=>`/campaigns/campaign?id=${a(r).id}`);R(S,{get link(){return a(q)}}),o(b),o(p),n(D,p)},$$slots:{default:!0}})}),o(u),n(l,f)},!0),n(t,v)}),o(d),n(C,d),H()}export{da as component};