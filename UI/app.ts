const categories = document.getElementById("categories") as HTMLSelectElement;
const products = document.getElementById("productTable") as HTMLTableElement;
const submit = document.getElementById("filterSubmit") as HTMLButtonElement;
let filterChoice;

interface APIResponse<T> {
    message: string;
    content: T[]
}

interface CategoryRow {
    id: string,
    key_id: number,
    name: string
}

interface ProductRow{
    class: string,
    categories: string,
    customer_review_average: number,
    customer_review_count: number,
    id: number,
    name: string,
    regular_price: number,
    sale_price: number,
    sku: string,
    subclass: string,
    url: string
}

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

var categoriesFetch = fetch('http://127.0.0.1:5000/categories').then(response => {
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
  // submit.disabled = (categories.value === "")
  submit.disabled = false
});

submit.addEventListener("click", () => {
  filterChoice = categories.value
    var productsFetch = fetch('http://127.0.0.1:5000/products/categories/'+filterChoice).then(response => {
    if(!response.ok) {
      throw new Error('Network response was not OK');
    }
    return response.json() as Promise<APIResponse<ProductRow>>;
  })
    .then(data => {
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
            const row = tbody.insertRow();
            const tr = tbody.insertRow();
            for (const key of keys) {
                const cell = tr.insertCell();
                cell.textContent = String(product[key])
            }
        }
      
    })
})



  