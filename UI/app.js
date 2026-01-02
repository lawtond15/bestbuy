const categories = document.getElementById("categories");
const products = document.getElementById("productTable");
const submit = document.getElementById("filterSubmit");
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
};
var categoriesFetch = fetch('/categories').then(response => {
    if (!response.ok) {
        throw new Error('Network response was not OK');
    }
    return response.json();
})
    .then(data => {
    for (const row of data.content) {
        const filterValue = document.createElement('option');
        filterValue.value = row.name;
        filterValue.textContent = row.name;
        categories.appendChild(filterValue);
    }
});
categories.addEventListener("change", () => {
    submit.disabled = false;
});
submit.addEventListener("click", () => {
    products.innerHTML = "";
    filterChoice = categories.value;
    var productsFetch = fetch('/products/categories/' + filterChoice).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not OK');
        }
        return response.json();
    })
        .then(data => {
        const firstProduct = data.content[0];
        if (!firstProduct)
            return;
        const keys = Object.keys(firstProduct);
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
                cell.textContent = String(product[key]);
            }
        }
    });
});
export {};
//# sourceMappingURL=app.js.map