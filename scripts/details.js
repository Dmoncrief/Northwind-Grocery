"use strict"


// we use URLSearchParams in order to search and finc the query params that were assigned to the url <a>
let urlParams = new URLSearchParams(window.location.search);
let detailsDiv = document.getElementById("productDetailsContainer");


// after we get access to the params (it will basically be an array of string) 
//we want to check to see if the param we are looking  exists in that array
if (urlParams.has('productId')) {
    
 

   // if it does exist we want to get access to the value at that param
  //in this came the value will be the product id because that is what we passed over
  let productId = urlParams.get('productId')

  //make a call to the api that specifally return 1 product base on the id
  // "http://localhost:8081/api/products/:id" - this is what the api url will look like only ':id' will be replaced with the actual product id
  let url =  "http://localhost:8081/api/products/" 
  let newUrl = url + productId;
  console.log(newUrl);

  fetch(newUrl)
  .then(response => response.json())
  .then(product => {
    //call a method that will display the product and all the product details

    displayProductDetails(product);
  })
} else {
       window.location.href = "index.html";
}

function displayProductDetails(prod){
    // you decide how you want the page to be styled
    //but for now...

    let name = document.createElement("h1");
    name.innerHTML = prod.productName;

    let img = document.createElement("img");
    img.src = "images/shopping_10.jpg"

    detailsDiv.appendChild(name);
    detailsDiv.append(img);

}