(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(e){if(e.ep)return;e.ep=!0;const s=n(e);fetch(e.href,s)}})();function g(){const t=document.createElement("div");t.className="listings-page",t.innerHTML=`
    <h1 class="header">BestBuy Product Listings</h1>

    <label for="categories" class="form-label">
      Choose a product type to see its listings:
    </label>

    <select id="categories" class="form-select">
      <option value="" disabled selected>Choose a product...</option>
    </select>

    <button id="filterSubmit" type="button" disabled>Submit</button>

    <div class="table-responsive scrollable-table">
      <table id="productTable"
        class="table table-bordered table-sm table-striped results mx-auto">
      </table>
    </div>
  `;const o=t.querySelector("#categories"),n=t.querySelector("#productTable"),i=t.querySelector("#filterSubmit");let e;const s={class:"Class",categories:"Catgegories",customer_review_average:"Rating",customer_review_count:"Reviews",id:"Id",name:"Name",regular_price:"Price",sale_price:"Sale Price",sku:"Sku",subclass:"Subclass",url:"Url"};return fetch("/categories").then(r=>{if(!r.ok)throw new Error("Network response was not OK");return r.json()}).then(r=>{for(const u of r.content){const a=document.createElement("option");a.value=u.name,a.textContent=u.name,o.appendChild(a)}}),o.addEventListener("change",()=>{i.disabled=!1}),i.addEventListener("click",()=>{n.innerHTML="",e=o.value,fetch("/products/categories/"+e).then(r=>{if(!r.ok)throw new Error("Network response was not OK");return r.json()}).then(r=>{document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(l=>{new window.bootstrap.Tooltip(l)});const a=r.content[0];if(!a)return;const f=Object.keys(a),m=n.createTHead().insertRow();for(const l of f){const c=document.createElement("th");c.textContent=s[l],m.appendChild(c)}const h=n.createTBody();for(const l of r.content){const c=h.insertRow();for(const b of f){const d=c.insertCell();d.textContent=String(l[b]),d.setAttribute("data-bs-toggle","tooltip"),d.setAttribute("data-bs-placement","top"),d.setAttribute("title",String(l[b]))}}})}),t}function y(){const t=document.createElement("div");t.className="pipeline-page",t.innerHTML=`
    <h1 class="header">Pipeline</h1>
    <p class="description">Refresh bestbuy data product listings and types:</p>
    <button id="refreshData" type="button">Refresh Data</button>
    <span id="loading" style="display: none">
      Refreshing data (this may take a minute)...
    </span>

    <div id="message"></div>

    <div class="table-responsive scrollable-table">
      <table id="pipelineLogTable"
        class="table table-bordered table-sm table-striped results mx-auto">
      </table>
    </div>
  `;const o=t.querySelector("#refreshData"),n=t.querySelector("#loading"),i=t.querySelector("#message");return o.addEventListener("click",async()=>{o.disabled=!0,n.style.display="inline",i.textContent="";try{const e=await fetch("/pipeline/refresh",{method:"POST"});if(!e.ok)throw new Error(`Request failed: ${e.status}`);const s=await e.json();i.textContent=s.message,i.style.color="green"}catch(e){console.log(e),i.textContent="Data pipeline failed",i.style.color="red"}finally{n.style.display="none",o.disabled=!1}}),t}const w={"/":g,"/pipeline":y};function p(){const t=document.getElementById("app"),o=window.location.pathname,n=w[o]??g;console.log("Routing to:",o,n.name),t.innerHTML="",t.appendChild(n())}document.addEventListener("click",t=>{const o=t.target;o.matches("[data-link]")&&(t.preventDefault(),history.pushState(null,"",o.href),p())});window.addEventListener("popstate",p);p();
