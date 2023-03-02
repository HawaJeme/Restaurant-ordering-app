import { menuArray } from "./data.js";

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        document.getElementById('order-field').style.display = 'flex';
        handleItemOrder(e.target.dataset.add)
        totalPrice()
    }
    if(e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    }
    document.getElementById('purchase-btn').addEventListener("click", ()=>{
        console.log('clicked')
    })
})

let purchaseList = []

function handleItemOrder(orderId){
    const targetItemObj = menuArray.filter(function(item){
        return item.id == orderId
    })[0]
    const targetItemName = targetItemObj.name
    const targetItemPrice = targetItemObj.price

    purchaseList.push({
        Name : targetItemName,
        Price : targetItemPrice
    })
    renderOrdersHTML()
}


function payment(){
    
}

function removeItem(itemId) {
    purchaseList.splice(itemId, 1)
    if(purchaseList.length == 0){
    document.getElementById('order-field').style.display = 'none'
    }
    renderOrdersHTML()
}

function addItem(){

    let newItem = ``

    purchaseList.forEach((item) => {
    let findIndex = purchaseList.indexOf(item)

        newItem += `
        <div class="order-items">
            <p>${item.Name}</p>
            <p class="remove-btn" data-remove=${findIndex}>remove</p>
            <p class="order-price">$${item.Price}</p>
        </div>
    `
    })
    return newItem
}

function totalPrice(){

    let totalPriceNum = 0

    for( let i=0; i< purchaseList.length; i++){
    totalPriceNum += (purchaseList[i].Price)
    }
    return totalPriceNum
}

function renderOrders(){

    let ordersHTML= ``
    ordersHTML =`
    <div class="orders-container" id="orders-container">
        <p class="your-order-title"> Your order </p>
        ${addItem()}
        <div class="total-price">
            <p>Total price: </p>
            <p class="order-price">$${totalPrice()}</p>
        </div>
        <button class="purchase-btn" id="purchase-btn">Complete order</button>
    </div>
    `
    return ordersHTML
}

function renderMenu(){
    let MainHTML = ``
    menuArray.forEach(item => {

        MainHTML+=`
    <div class="item-container">
        <div class="food-img">
        ${item.emoji}
        </div>
        <div class="item-container-inner">
            <div class="food-name">
                ${item.name}
            </div>
            <div class="food-ingredients">
                ${item.ingredients}
            </div>
            <div class="food-price">
                $${item.price}
            </div>
        </div>
            <i class="fa-thin fa-plus" data-add=${item.id}></i>
    </div>
    <div class="customers-order">
    </div>
    `
    })
    return MainHTML
}


function render(){
    document.getElementById('section').innerHTML = renderMenu()
}
render()
function renderOrdersHTML(){
    document.getElementById('order-field').innerHTML = renderOrders()
}