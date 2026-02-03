(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const e of s.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&i(e)}).observe(document,{childList:!0,subtree:!0});function r(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=r(n);fetch(n.href,s)}})();function m(){const t=document.createElement("div");t.className="listings-page",t.innerHTML=`
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
  `;const o=t.querySelector("#categories"),r=t.querySelector("#productTable"),i=t.querySelector("#filterSubmit");let n;const s={class:"Class",categories:"Catgegories",customer_review_average:"Rating",customer_review_count:"Reviews",id:"Id",name:"Name",regular_price:"Price",sale_price:"Sale Price",sku:"Sku",subclass:"Subclass",url:"Url"};return fetch("/categories").then(e=>{if(!e.ok)throw new Error("Network response was not OK");return e.json()}).then(e=>{for(const a of e.content){const l=document.createElement("option");l.value=a.name,l.textContent=a.name,o.appendChild(l)}}),o.addEventListener("change",()=>{i.disabled=!1}),i.addEventListener("click",()=>{r.innerHTML="",n=o.value,fetch("/products/categories/"+n).then(e=>{if(!e.ok)throw new Error("Network response was not OK");return e.json()}).then(e=>{document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(c=>{new window.bootstrap.Tooltip(c)});const l=e.content[0];if(!l)return;const d=Object.keys(l),f=r.createTHead().insertRow();for(const c of d){const u=document.createElement("th");u.textContent=s[c],f.appendChild(u)}const y=r.createTBody();for(const c of e.content){const u=y.insertRow();for(const b of d){const p=u.insertCell();p.textContent=String(c[b]),p.setAttribute("data-bs-toggle","tooltip"),p.setAttribute("data-bs-placement","top"),p.setAttribute("title",String(c[b]))}}})}),t}function w(){const t=document.createElement("div");t.className="pipeline-page",t.innerHTML=`
    <h1 class="header">Pipeline</h1>
    <p class="description">Refresh bestbuy data product listings and types:</p>
    <button id="refreshData" type="button">Refresh Data</button>
    <span id="loading" style="display: none">
      Refreshing data (this may take a minute)...
    </span>

    <div id="message"></div>

    <div class="table-responsive scrollable-table">
      <table id="pipelineLogTable" class="table table-bordered table-sm table-striped results">
        <thead>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </table>
    </div>
  `;const o=t.querySelector("#refreshData"),r=t.querySelector("#loading"),i=t.querySelector("#message"),n=t.querySelector("#pipelineLogTable");async function s(){n.querySelectorAll("tbody").forEach(e=>e.remove()),fetch("/pipeline/log").then(e=>e.json()).then(e=>{const a=n.createTBody();for(const l of e.content){const d=a.insertRow(),h=d.insertCell();h.textContent=l.date.toString();const f=d.insertCell();f.textContent=l.status}})}return s(),o.addEventListener("click",async()=>{o.disabled=!0,r.style.display="inline",i.textContent="";try{const e=await fetch("/pipeline/refresh",{method:"POST"});if(!e.ok)throw new Error(`Request failed: ${e.status}`);const a=await e.json();i.textContent=a.message,i.style.color="green"}catch(e){console.log(e),i.textContent="Data pipeline failed",i.style.color="red"}finally{r.style.display="none",o.disabled=!1,s()}}),t}const v={"/":m,"/pipeline":w};function g(){const t=document.getElementById("app");let o=window.location.pathname;o.length>1&&o.endsWith("/")&&(o=o.slice(0,-1));const r=v[o]??m;console.log("Routing to:",o,r.name),t.innerHTML="",t.appendChild(r())}document.addEventListener("click",t=>{const o=t.target;o.matches("[data-link]")&&(t.preventDefault(),history.pushState(null,"",o.href),g())});window.addEventListener("popstate",g);g();
