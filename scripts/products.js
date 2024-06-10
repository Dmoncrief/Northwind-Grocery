"use strict"



const searchDropDown = document.getElementById("searchOption");
const categoryDropDown = document.getElementById("categoryDropdown")
const categorySelectEl = document.getElementById("category"); 
 let allProdDiv = document.getElementById("products");
var baseUrl = "http://localhost:8081/api/"

window.onload = function() { //the logic that goes inside of the window.onload only loads once
    console.log("app is running");
   
    populateCategoryDropdown();

    searchDropDown.addEventListener("change", (event) => {

        if(searchDropDown.value == "selectOne"){

            selectOneDisplay(event);
        } else if(searchDropDown.value == "products"){
            viewAllDisplay();
        } else if(searchDropDown.value == "categories"){
            categoryDropdownDisplay();
        }
      
     

    })
}


// here we are making the function that will be called when users select the 'Select one..' option
//from the search Drop down
function selectOneDisplay(event){
    event.preventDefault();

    categoryDropDown.style.display = "none";
    allProdDiv.style.display = "none";

}


// this logic will display all products when a user selects the 'View All' option from the search drop down
function viewAllDisplay(){

    clearProductDetails();


    categoryDropDown.style.display = "none";
    allProdDiv.style.display = "block";

    //make a fetch call to http://localhost:8081/api/products
    //why? because in the server.js file this endpoint was defined 
    //and the response that we get when we send a request to this api is
    //and array of products

let newUrl = baseUrl + searchDropDown.value;
console.log(newUrl)
fetch(newUrl)
.then(response => response.json())
.then(allProducts => {


    allProducts.forEach( product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    productDiv.innerHTML = `
        <h3>${product.productName}</h3>
        <p>ID: ${product.productId}</p>
        <p>Price: $${product.unitPrice}</p>
        <a href="details.html?productId=${product.productId}">See Details</a>
    `;
  
    allProdDiv.appendChild(productDiv);
})

});

}

function categoryDropdownDisplay(){
    categoryDropDown.style.display = "block";
    allProdDiv.style.display = "none";
}


function populateCategoryDropdown(){
let newUrl= baseUrl + "categories"
    //send a get request to http://localhost:8081/api/categories
    //the response will be the array of categories
    //forEach category in the array
    //we will create a new option elemnt and add to the category drop down select element



    fetch (newUrl) 
    .then(response => response.json())
    .then( allCategories => 
    

    allCategories.forEach(category => {
        let option = document.createElement("option")
        option.innerHTML = category.name;
        option.value = category.categoryId;

       categorySelectEl.appendChild(option);
    

    }
)
);

}
function clearProductDetails() {
    const container = document.getElementById('products');
    container.innerHTML = '';
}