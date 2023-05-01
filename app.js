import {products} from "./products.js"
import {categories} from "./categories.js"

const productsSection = document.getElementById('products')
const categoriesSection = document.getElementById('categories')
const logoDiv = document.querySelector(".logo")
const mainHtml= document.getElementById('main')

// THIS RENDERS THE CATEGORIES 
function renderCategories (cath){
    for(const category of categories){
        categoriesSection.innerHTML += `
        <div class="category" id="${category.name}">
        <img src="${category.icon}" alt="">
        <p>${category.name}</p>
        </div>
        `
    }
    renderProducts(products) // CALLS RENDER PRODUCTS 
}
// RENDERS ALL THE PRODUCTS ON THE PAGE 
function renderProducts(prod){
    for (const product of prod){
        productsSection.innerHTML += `
        <div class="product" id="${product.title}">
        <img src="pictures/${product.thumbnail}" alt="" class = "product-thumbnail">
        <div class="product-footer">
        <div class="name-location">
        <h3>${product.title}</h3>
        <p>${product.location}</p>
        </div>
        <div class="delivery-price">
        <p class = "deliveryNote"></p>
        <p class ="price">${product.price} £</p>
        </div>
        </div>
        </div>`
    }
    renderDelivery(products) // CALLS RENDER DELIVERY 
}
// THIS RENDERS THE OPTION DELIVERY OR COLLECTION TO EACH ITEM 
function renderDelivery (prod) {
    const deliveryNote = document.getElementsByClassName('deliveryNote')
    for (let i = 0; i < prod.length; i++) {   //this iterate over the HTML Collection from the deliveryNote
       if (prod[i].delivery_available){
        deliveryNote[i].textContent = ('Delivery') // the [i] just says go over each note
       }
       else{
        deliveryNote[i].textContent = ('Colection')
       }
}
}

renderCategories(categories)
// THIS FILTERES PRODUCTS BY THEYR CATEGORY 
let filteredProducts = []

categoriesSection.addEventListener('click', function(e){
    filteredProducts.splice(0, filteredProducts.length) // THIS CLEARS THE ARRAY FOR EVERY CATEGORY 
    let category = (e.target.parentElement.id);
    console.log(category);
for (let prod of products){
    if (prod.category === category) {
        filteredProducts.push(prod)
    }
}
productsSection.innerHTML =``
for (let product of filteredProducts){
    productsSection.innerHTML += `
    <div class="product" id="${product.title}">
    <img src="pictures/${product.thumbnail}" alt="" class = "product-thumbnail">
    <div class="product-footer">
        <div class="name-location">
            <h3>${product.title}</h3>
            <p>${product.location}</p>
        </div>
        <div class="delivery-price">
            <p class = "deliveryNote"></p>
            <p class ="price">${product.price} £</p>
        </div>
    </div>
    </div>`
    }
    renderDelivery(filteredProducts) // RENDER DELIVERY AGAIN '_' ? 
console.log(filteredProducts);

})

productsSection.addEventListener('click', function(e){
    let singleProduct = (e.target.parentElement.id)
    console.log(singleProduct);
// mainHtml.innerHTML = '
// '
})