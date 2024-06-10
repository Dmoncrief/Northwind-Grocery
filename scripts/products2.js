"use strict"
const searchOption = document.getElementById("SearchOption");
const categoryDropdown = document.getElementById("categoryDropdown");
const category = document.getElementById("category");
const products = document.getElementById("products");


windown.onload = () => {
    searchOption.addEventListener("change", populateOption);
};

// Function to display all the products
function displayAllProducts() {
    document.getElementById("products").innerHTML = "";
    products.forEach(product => {
        displayProduct(product);
    });
}

// Function to display products by category
function displayProductsByCategory(category) {
    document.getElementById("products").innerHTML = "";
    const filteredProducts = products.filter(product => product.category === category);
    filteredProducts.forEach(product => {
        displayProduct(product);
    });
}

// Function to display product details
function displayProduct(product) {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>ID: ${product.id}</p>
        <p>Price: $${product.price}</p>
        <p>Description: ${product.description}</p>
        <a href="details.html?productId=${product.id}">See Details</a>
    `;
    document.getElementById("products").appendChild(productDiv);
}

// Event listener for search option change
document.getElementById("searchOption").addEventListener("change", function () {
    const selectedOption = this.value;
    if (selectedOption === "viewAll") {
        displayAllProducts();
        document.getElementById("categoryDropdown").style.display = "none";
    } else if (selectedOption === "searchByCategory") {
        document.getElementById("categoryDropdown").style.display = "block";
        document.getElementById("category").addEventListener("change", function () {
            const selectedCategory = this.value;
            displayProductsByCategory(selectedCategory);
        });
    }
});