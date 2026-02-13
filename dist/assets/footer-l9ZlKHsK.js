(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();function i(o){const t=document.createElement("header");t.className="border-b border-gray-200 bg-white",t.innerHTML=`
    <div class="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
      <a href="/" class="text-xl font-bold text-blue-600 no-underline">ibea.ai</a>
      <nav class="flex gap-4 text-sm text-gray-600">
        <a href="/" class="hover:text-gray-900 no-underline">Tools</a>
        <a href="/llms.txt" class="hover:text-gray-900 no-underline">llms.txt</a>
      </nav>
    </div>
  `,o.prepend(t)}function l(o){const t=document.createElement("footer");t.className="border-t border-gray-200 bg-white mt-auto",t.innerHTML=`
    <div class="mx-auto max-w-5xl px-4 py-6 text-center text-sm text-gray-500">
      <p>&copy; ${new Date().getFullYear()} ibea.ai &mdash; Free AI-powered math and data tools</p>
    </div>
  `,o.appendChild(t)}export{l as a,i as r};
