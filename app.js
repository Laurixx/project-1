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
        <p class ="price">${(product.price).toFixed(2)} £</p>
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
let standardQuantity = 1 
let standardDeliveryFee = 3.99 // maybe in the future when i learn some more
                                // i may make this into a distance check and add idk few cents a mile or something like that plus the delivery fee 


productsSection.addEventListener('click', function(e){
    if(e.target.parentElement.classList.contains('product')){
    const productID = (e.target.parentElement.id)
    const selectedProduct = products.find(function(product){ // NEW METHOD 'Google' .find (this finds a product in the array where
                                                            // the title is the same as the id of the div clicked COOOL)
        return product.title === productID})
        
if(selectedProduct){
 mainHtml.innerHTML =`
    <section>
    <div class="content">
        <div class="left-side">
            <img src="pictures/${selectedProduct.thumbnail}" alt="">
            <div class="infom">
                <div class="title">
                    <h1>${selectedProduct.title}</h1>
                    <p>${selectedProduct.location}</p>
                </div>
                <div>
                    <h3 class="pRice">${(selectedProduct.price).toFixed(2)} £</h3>
                </div>
            </div>

        </div>
        <div class="right-side">
            <div class="card">
                <div class="first-div">
                    <a href="#" class="reviews-number">${selectedProduct.reviews.length}Reviews</a>
                </div>
                <div class="quantity_stock">
                    <div class="box" id="quantity-stock">
                    
                            <select  id="quantity" class="quantity">
                                <option value="1" selected="selected">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                    </div>
                    <p>of</p>
                    <div class="box" >
                        <p id="stock" class="in-stock" >${selectedProduct.stock_count} in Stock</p>
                    </div>
                </div>
                <div class="buttons">
                    <input type="radio" name="logistics" id="delivery">
                    <label for="delivery">Delivery</label>

                    <input type="radio" name="logistics" id="colection">
                    <label for="colection">Colection</label>

                </div>
                <div class="invoice">
                    <div class="invoice-items">
                        <div class="invoice-item">
                            <p id="quantity-price">${(selectedProduct.price).toFixed(2)}X${standardQuantity}</p>
                            <p class="price" id="price/quantity">${(selectedProduct.price * standardQuantity).toFixed(2)} £</p>
                        </div>
                        <div class="invoice-item">
                            <p>Delivery Fee</p>
                            <p class="price">${(standardDeliveryFee).toFixed(2)} £</p>
                        </div>
                        <div class="invoice-item">
                            <p>Service Fee</p>
                            <p class="price">${((selectedProduct.price * standardQuantity)/100).toFixed(2)} £</p>
                        </div>
                    </div>
                    <div class="invoice-item">
                        <p>Total</p>
                        <p class="price">${((selectedProduct.price * standardQuantity) + standardDeliveryFee + (selectedProduct.price * standardQuantity)/100).toFixed(2)} £</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>`
        }
    }

    const selectedQuantity = document.getElementById("quantity")
    selectedQuantity.addEventListener('change', function(){
    const quantitiPriceText = document.getElementById('quantity-price')
    const priceQuantitySum = document.getElementById('price/quantity')
    quantitiPriceText.textContent= `${selectedProduct.price}X${selectedQuantity.value}`
    priceQuantitySum.textContent = `${selectedProduct.price * selectedQuantity.valueS}`

    })

})
