import{c as lt,a as v,t as b}from"./disclose-version.DHz0PKsI.js";import{p as st,N as U,u as q,f as ot,a as it,o as O,g as t,s as n,c as s,r,t as A}from"./runtime.B6coxiGD.js";import{s as B}from"./render.PYmPAuDm.js";import{i as S}from"./if.PCbA7Ql5.js";import{e as E,i as F}from"./each.Czia2JB_.js";import{r as nt}from"./attributes.aUdXhcos.js";import{d as dt}from"./events.aoiNrylR.js";import{b as ct}from"./input.DJnXoNif.js";import{D as vt,b as pt}from"./DeleteOutline.D--ZWbtp.js";import{p as G}from"./props.Bsy5QBFU.js";import{p as D}from"./proxy.BT_Zq6Rg.js";import{m as y}from"./models.svelte.CU4x2gqc.js";function ft(p,l,e,L,P){var o=p.__attributes??(p.__attributes={}),i=p.style,k="style-"+l;o[k]===e&&!P||(o[k]=e,e==null?i.removeProperty(l):i.setProperty(l,e,""))}var ut=b("<option> </option>"),mt=(p,l,e)=>l(t(e)),bt=b('<tr><td class="flex flex-row gap-2 items-center"><div class="w-4 h-4 rounded"></div> </td><td><input type="number" class="input input-bordered input-sm w-20" min="0"></td></tr>'),_t=b('<button class="btn btn-primary self-end w-[100px]">Save</button>'),gt=b('<div class="border-t border-gray-200 pt-3 mt-2 flex flex-col"><p class="text-sm italic text-gray-600 mb-2">Label mapper</p> <table class="table table-sm"><thead><tr><th>Label</th><th>Model Output Index</th></tr></thead><tbody></tbody></table> <!></div>'),xt=b('<li class="flex flex-col items-left gap-2 p-4 border border-gray-200 rounded-lg"><div class="flex items-center gap-2"><button class="btn btn-ghost btn-xs"><!></button> <span class="font-medium"> </span></div> <!></li>'),ht=b('<ul class="mt-2 flex flex-col gap-2"></ul>'),yt=b('<div class="form-control"><label class="label font-medium mb-1">Select Models (optional)</label> <select class="select select-bordered w-full"><option disabled selected>Choose a model</option><!></select> <!></div>');function Nt(p,l){st(l,!0);let e=G(l,"labelMappings",31,()=>D({})),L=G(l,"onclick",3,()=>{}),P=G(l,"ondelete",3,()=>{}),o=U(""),i=U(D([]));q(()=>{y.retrieve()}),q(()=>{var a;Object.keys(e()).length>0&&O(i,D(((a=y.data)==null?void 0:a.filter(d=>e()[d.id]))||[]))}),q(()=>{if(t(o)){if(console.log(t(o)),t(i).find(a=>a.id===t(o)))return;t(i).push(y.data.find(a=>a.id===t(o))),e(e()[t(o)]=l.labels.reduce((a,d)=>(a[d.name]=0,a),{}),!0),O(o,""),e({...e()})}});const k=a=>{O(i,D(t(i).filter(d=>d.id!==a.id))),delete e()[a.id],e({...e()}),P()()};var H=lt(),V=ot(H);S(V,()=>{var a;return((a=y.data)==null?void 0:a.length)>0},a=>{var d=yt(),M=n(s(d),2),j=s(M);j.value=((j.__value="")==null,"");var W=n(j);E(W,17,()=>y.data,F,(g,c)=>{var f=ut(),u={},x=s(f);r(f),A(()=>{u!==(u=t(c).id)&&(f.value=(f.__value=t(c).id)==null?"":t(c).id),B(x,`${t(c).name??""} (task: ${t(c).task??""})`)}),v(g,f)}),r(M);var X=n(M,2);S(X,()=>t(i).length>0,g=>{var c=ht();E(c,21,()=>t(i),F,(f,u)=>{var x=xt(),z=s(x),w=s(z);w.__click=[mt,k,u];var Y=s(w);vt(Y,{size:"15"}),r(w);var J=n(w,2),Z=s(J);r(J),r(z);var $=n(z,2);S($,()=>l.labels,tt=>{var C=gt(),I=n(s(C),2),K=n(s(I));E(K,21,()=>l.labels,F,(N,m)=>{var h=bt(),_=s(h),Q=s(_),at=n(Q);r(_);var R=n(_),T=s(R);nt(T),r(R),r(h),A(()=>{ft(Q,"background-color",t(m).color),B(at,` ${t(m).name??""}`)}),ct(T,()=>e()[t(u).id][t(m).name],rt=>e(e()[t(u).id][t(m).name]=rt,!0)),v(N,h)}),r(K),r(I);var et=n(I,2);S(et,L,N=>{var m=_t();m.__click=function(...h){var _;(_=L())==null||_.apply(this,h)},v(N,m)}),r(C),v(tt,C)}),r(x),A(()=>B(Z,t(u).name)),v(f,x)}),r(c),v(g,c)}),r(d),pt(M,()=>t(o),g=>O(o,g)),v(a,d)}),v(p,H),it()}dt(["click"]);export{Nt as M,ft as s};
