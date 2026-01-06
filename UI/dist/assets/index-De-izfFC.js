(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const e of s.addedNodes)e.tagName==="LINK"&&e.rel==="modulepreload"&&i(e)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();function m(){const t=document.createElement("div");t.className="listings-page",t.innerHTML=`
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
  `;const n=t.querySelector("#categories"),r=t.querySelector("#productTable"),i=t.querySelector("#filterSubmit");let o;const s={class:"Class",categories:"Catgegories",customer_review_average:"Rating",customer_review_count:"Reviews",id:"Id",name:"Name",regular_price:"Price",sale_price:"Sale Price",sku:"Sku",subclass:"Subclass",url:"Url"};return fetch("/categories").then(e=>{if(!e.ok)throw new Error("Network response was not OK");return e.json()}).then(e=>{for(const l of e.content){const a=document.createElement("option");a.value=l.name,a.textContent=l.name,n.appendChild(a)}}),n.addEventListener("change",()=>{i.disabled=!1}),i.addEventListener("click",()=>{r.innerHTML="",o=n.value,fetch("/products/categories/"+o).then(e=>{if(!e.ok)throw new Error("Network response was not OK");return e.json()}).then(e=>{document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(c=>{new window.bootstrap.Tooltip(c)});const a=e.content[0];if(!a)return;const d=Object.keys(a),f=r.createTHead().insertRow();for(const c of d){const u=document.createElement("th");u.textContent=s[c],f.appendChild(u)}const y=r.createTBody();for(const c of e.content){const u=y.insertRow();for(const h of d){const p=u.insertCell();p.textContent=String(c[h]),p.setAttribute("data-bs-toggle","tooltip"),p.setAttribute("data-bs-placement","top"),p.setAttribute("title",String(c[h]))}}})}),t}function w(){const t=document.createElement("div");t.className="pipeline-page",t.innerHTML=`
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
  `;const n=t.querySelector("#refreshData"),r=t.querySelector("#loading"),i=t.querySelector("#message"),o=t.querySelector("#pipelineLogTable");async function s(){o.querySelectorAll("tbody").forEach(e=>e.remove()),fetch("/pipeline/log").then(e=>e.json()).then(e=>{const l=o.createTBody();for(const a of e.content){const d=l.insertRow(),b=d.insertCell();b.textContent=a.date.toString();const f=d.insertCell();f.textContent=a.status}})}return s(),n.addEventListener("click",async()=>{n.disabled=!0,r.style.display="inline",i.textContent="";try{const e=await fetch("/pipeline/refresh",{method:"POST"});if(!e.ok)throw new Error(`Request failed: ${e.status}`);const l=await e.json();i.textContent=l.message,i.style.color="green"}catch(e){console.log(e),i.textContent="Data pipeline failed",i.style.color="red"}finally{r.style.display="none",n.disabled=!1,s()}}),t}const v={"/":m,"/pipeline":w};function g(){const t=document.getElementById("app"),n=window.location.pathname,r=v[n]??m;console.log("Routing to:",n,r.name),t.innerHTML="",t.appendChild(r())}document.addEventListener("click",t=>{const n=t.target;n.matches("[data-link]")&&(t.preventDefault(),history.pushState(null,"",n.href),g())});window.addEventListener("popstate",g);g();
