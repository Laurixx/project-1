import {products} from "./products.js"
import {categories} from "./categories.js"
const productsSection = document.getElementById('products')
const categoriesSection = document.getElementById('categories')
function renderCategories (cath){
    for(const category of categories){
        categoriesSection.innerHTML += `
        <div class="category" id="${category.name}">
            <img src="${category.icon}" alt="">
            <p>${category.name}</p>
        </div>
    `
    }
renderProducts(products)
}
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
    renderDelivery(products)
}

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

let filteredProducts = []

categoriesSection.addEventListener('click', function(e){
    let category = (e.target.parentElement.id);
    console.log(category);
for (let prod of products){
    if (prod.category === category) {
        filteredProducts.push(prod)
    }
}
productsSection.innerHTML =``
for (let product of filteredProducts){
    productsSection.innerHTML=productsSection.innerHTML += `
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
    renderDelivery(products)
console.log(filteredProducts);

})
