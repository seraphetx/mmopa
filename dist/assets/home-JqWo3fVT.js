import{r as s,a as m}from"./footer-l9ZlKHsK.js";import{m as i}from"./mathjs-evaluate-A1E61qy_.js";import{m as n}from"./mathjs-unit-convert-Cumk6wdQ.js";import{m as l}from"./mathjs-simplify-BhwdqrhW.js";import{f as c}from"./formula-parser-BXXlBw8n.js";import{b as d}from"./basic-math-C4jI28Zc.js";import{c as p}from"./chart-generator-B1sYwQex.js";import{s as x}from"./stat-distribution-8pzETwqZ.js";import"./impureFunctionsAny.generated-Cgr3gmWE.js";import"./pureFunctionsAny.generated-mi3JYX7W.js";import"./_commonjsHelpers-DaWZu8wl.js";const g=[i,n,l,c,d,p,x],e=document.getElementById("app");s(e);const a=document.createElement("main");a.className="mx-auto max-w-5xl px-4 py-10";a.innerHTML=`
  <div class="text-center mb-10">
    <h1 class="text-3xl font-bold mb-3">Free AI Math & Data Tools</h1>
    <p class="text-gray-600 max-w-xl mx-auto">High-precision math, unit conversion, statistics, and chart generation. WebMCP-enabled for seamless AI agent integration.</p>
  </div>
`;const r=document.createElement("div");r.className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5";for(const t of g){const o=document.createElement("a");o.href=`/t/${t.id}/`,o.className="tool-card block no-underline text-inherit",o.innerHTML=`
    <div class="text-xs text-gray-400 mb-1">${t.category}</div>
    <h2 class="text-lg font-semibold mb-1">${t.name}</h2>
    <p class="text-sm text-gray-600 mb-2">${t.description}</p>
    <span class="text-xs bg-gray-100 text-gray-500 rounded px-2 py-0.5">${t.library}</span>
  `,r.appendChild(o)}a.appendChild(r);e.appendChild(a);m(e);
