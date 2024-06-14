"use strict"




const searchDropDown = document.getElementById("searchOption");
const categoryDropDown = document.getElementById("categoryDropdown")
const categorySelectEl = document.getElementById("category"); 
 let allProdDiv = document.getElementById("products");
var baseUrl = "http://localhost:8081/api/"

window.onload = function() { //the logic that goes inside of the window.onload only loads once
    console.log("app is running");
   
    populateCategoryDropdown();

    //this event listener is on the Selection Menu
    searchDropDown.addEventListener("change", (event) => {

        if(searchDropDown.value == "selectOne"){

            selectOneDisplay(event);
        } else if(searchDropDown.value == "products"){
            viewAllDisplay();
        } else if(searchDropDown.value == "categories"){
            categoryDropdownDisplay();
        }

    })

    //the below event listen is for the Category drop down menu
    categorySelectEl.addEventListener("change", (event) => {
        displayProductsByCategory(event);
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
console.log("in the view all proucts method")
fetch(newUrl)
.then(response => response.json())
.then(allProducts => {

    displayProductsHelper(allProducts);

   
})

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

    console.log(newUrl);
    console.log("in the populate category drop down method")

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



function displayProductsByCategory(event){
    //send a get request to http://localhost:8081/api/products
    //the response will be the array of products
    //we then want to create a smaller array of products that all have the same category property value.
    //we will them pass the new array of products into the helper method we created earlier to display products

   
 event.preventDefault();

 clearProductDetails();

 allProdDiv.style.display = "block";

    let url =  "http://localhost:8081/api/products" 
    console.log(url)

    console.log("in the display products by category method")
  let category = categorySelectEl.value;

    console.log(category)

    fetch(url)
    .then(response => response.json())
    .then(allProducts => {



        let filteredProducts = [];

      allProducts.forEach( product => {
        if(product.categoryId === category){
            filteredProducts.push(product);
        }
      })

        console.log(filteredProducts)

        displayProductsHelper(filteredProducts);


    })


}

//helper method specifically for displaying products
//it makes sense to create this method because we would need
//to use this logic more than once. And we want to follow
//the DRY principal or Don't Repeat Yourself.

function displayProductsHelper(arr){


 arr.forEach(product => {
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
}






function clearProductDetails() {
    const container = document.getElementById('products');
    container.innerHTML = '';
}



















// todo: 
// create function for details page
// create function for category dropdown



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
}

