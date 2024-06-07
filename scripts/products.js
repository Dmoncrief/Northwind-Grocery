"use strict";

function displayProductsByCategory(category) {
    document.getElementById("products").innerHTML = "";

    // Filter products by category
    const filteredProducts = products.filter(product => product.category === category);

    // Display filtered products
    filteredProducts.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");
        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            <p>ID: ${product.id}</p>
            <p>Price: $${product.description}</p>
            <a href="details.html?productId=${product.id}">See Details</a>
        `;
        document.getElementById("products").appendChild(productDiv);

        // Add product selection dropdown for each product
        const selectProduct = document.createElement("select");
        selectProduct.className = "form form-control";
        selectProduct.addEventListener("change", () =>
            productSelection(selectProduct.value)
        );

        for (let product of products) {
            const productOption = document.createElement("option");
            productOption.textContent = product.name;
            productOption.value = product.name;
            selectProduct.appendChild(productOption);
        }

        // Append selectProduct dropdown to productDiv
        productDiv.appendChild(selectProduct);
    });
}

// Event listener for category selection change
document.getElementById("category").addEventListener("change", function() {
    const selectedCategory = this.value;
    displayProductsByCategory(selectedCategory);
});

function productSelection(selectedProductName) {
    console.log(selectedProductName);
    const selectedProduct = products.find(product => product.name === selectedProductName);
    if (selectedProduct) {
        displayProductDetails(selectedProduct.id);
    } else {
        console.error('Selected product not found.');
    }
}

// Define a function to display product details
function displayProductDetails(productId) {
    const apiUrl = `http://localhost:8081/api/products/${productId}`;

    // Fetch product details from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(product => {
            // Display the product details
            displayProduct(product);
        })
        .catch(error => {
            console.error('Error fetching product details:', error);
        });
}

function displayProduct(product) {
    
    clearProductDetails();

    
    const productDetailsDiv = document.createElement('div');
    productDetailsDiv.className = 'product-details';

    // Populate product details
    productDetailsDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>ID: ${product.id}</p>
        <p>Price: $${product.price}</p>
        <p>Description: ${product.description}</p>
    `;

   
    document.getElementById('productDetailsContainer').appendChild(productDetailsDiv);
}

function clearProductDetails() {
    const container = document.getElementById('productDetailsContainer');
    container.innerHTML = '';
}

// make table for product view
let newApi = data.properties.products;
fetch(newApi)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const table = document.createElement("table");
    table.className = "table border mt-5";
    const tableHeader = document.createElement("thead");
    tableHeader.className = "table-dark";
    const tableBody = document.createElement("tbody");
    const headerRow = document.createElement("tr");
    ["Name", "Category Id", "Description",].forEach((text) => {
      const header = document.createElement("th");
      header.textContent = text;
      headerRow.appendChild(header);
    });
    tableHeader.appendChild(headerRow);
    table.appendChild(tableHeader);
    for (let values of data.properties.periods) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.textContent = values.name;
      const cell2 = document.createElement("td");
      cell2.textContent = `Name: ${values.name} ${values.productName}`;
      const cell3 = document.createElement("td");
      cell3.textContent = `Category Id: ${values.Category} ${values.CategoryId}`;
      const cell4 = document.createElement("td");
      cell4.textContent = `Description: ${values.productDescription}`;

      row.appendChild(cell);
      row.appendChild(cell2);
      row.appendChild(cell3);
      row.appendChild(cell4);
      tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    tableDiv.appendChild(table);
  });

