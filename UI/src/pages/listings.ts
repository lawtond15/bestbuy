import "./listings.css";
import type {APIResponse, CategoryRow, ProductRow} from "../types/api"

export function ListingsPage() {
  const container = document.createElement("div");
  container.className = "listings-page"

  container.innerHTML = `
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
  `;

  const categories = container.querySelector("#categories") as HTMLSelectElement;
  const products = container.querySelector("#productTable") as HTMLTableElement;
  const submit = container.querySelector("#filterSubmit") as HTMLButtonElement;
  let filterChoice;

  const columnFriendlyNames = {
      class: 'Class',
      categories: 'Catgegories',
      customer_review_average: 'Rating',
      customer_review_count: 'Reviews',
      id: 'Id',
      name: 'Name',
      regular_price: 'Price',
      sale_price: 'Sale Price',
      sku: 'Sku',
      subclass: 'Subclass',
      url: 'Url'
  }

  var categoriesFetch = fetch('/categories').then(response => {
    if (!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json() as Promise<APIResponse<CategoryRow>>;
  })
    .then(data => {
      for (const row of data.content) {
          const filterValue = document.createElement('option');
          filterValue.value = row.name;
          filterValue.textContent = row.name;
          categories.appendChild(filterValue)
      }
    });

  categories.addEventListener("change", () => {
    submit.disabled = false
  });

  submit.addEventListener("click", () => {
    products.innerHTML = "";
    filterChoice = categories.value
      var productsFetch = fetch('/products/categories/'+filterChoice).then(response => {
      if(!response.ok) {
        throw new Error('Network response was not OK');
      }
      return response.json() as Promise<APIResponse<ProductRow>>;
    })
      .then(data => {
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        tooltipTriggerList.forEach(el => {
          new (window as any).bootstrap.Tooltip(el);
        });

          const firstProduct = data.content[0];
          if (!firstProduct) return;

          const keys = Object.keys(firstProduct) as (keyof ProductRow)[];
          const thead = products.createTHead();
          const headerRow = thead.insertRow();

          for (const key of keys) {
              const th = document.createElement('th');
              th.textContent = columnFriendlyNames[key];
              headerRow.appendChild(th);
          }

          const tbody = products.createTBody();

          for (const product of data.content) {
              const tr = tbody.insertRow();
              for (const key of keys) {
                  const cell = tr.insertCell();
                  cell.textContent = String(product[key])
                  cell.setAttribute("data-bs-toggle", "tooltip");
                  cell.setAttribute("data-bs-placement", "top");
                  cell.setAttribute("title", String(product[key]));
              }
          }
      })
  })

  return container 
}

  