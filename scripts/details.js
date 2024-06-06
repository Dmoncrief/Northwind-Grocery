"use strict"

let urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('productId')) {
    
    window.location.href = "index.html";
}