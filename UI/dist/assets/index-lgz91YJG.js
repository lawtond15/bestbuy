(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}})();function g(){const t=document.createElement("div");t.innerHTML=`
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
  `;const r=t.querySelector("#categories"),s=t.querySelector("#productTable"),a=t.querySelector("#filterSubmit");let e;const n={class:"Class",categories:"Catgegories",customer_review_average:"Rating",customer_review_count:"Reviews",id:"Id",name:"Name",regular_price:"Price",sale_price:"Sale Price",sku:"Sku",subclass:"Subclass",url:"Url"};return fetch("/categories").then(o=>{if(!o.ok)throw new Error("Network response was not OK");return o.json()}).then(o=>{for(const u of o.content){const i=document.createElement("option");i.value=u.name,i.textContent=u.name,r.appendChild(i)}}),r.addEventListener("change",()=>{a.disabled=!1}),a.addEventListener("click",()=>{s.innerHTML="",e=r.value,fetch("/products/categories/"+e).then(o=>{if(!o.ok)throw new Error("Network response was not OK");return o.json()}).then(o=>{document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(c=>{new window.bootstrap.Tooltip(c)});const i=o.content[0];if(!i)return;const f=Object.keys(i),h=s.createTHead().insertRow();for(const c of f){const l=document.createElement("th");l.textContent=n[c],h.appendChild(l)}const b=s.createTBody();for(const c of o.content){const l=b.insertRow();for(const m of f){const d=l.insertCell();d.textContent=String(c[m]),d.setAttribute("data-bs-toggle","tooltip"),d.setAttribute("data-bs-placement","top"),d.setAttribute("title",String(c[m]))}}})}),t}function y(){const t=document.createElement("div");return t.innerHTML=`
    <h1 class="header">Watchlist</h1>
    <p>Coming soon...</p>
  `,t}const w={"/":g,"/pipeline":y};function p(){const t=document.getElementById("app"),r=window.location.pathname,s=w[r]??g;console.log("Routing to:",r,s.name),t.innerHTML="",t.appendChild(s())}document.addEventListener("click",t=>{const r=t.target;r.matches("[data-link]")&&(t.preventDefault(),history.pushState(null,"",r.href),p())});window.addEventListener("popstate",p);p();
