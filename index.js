import { menuArray } from "./data.js";

const checkoutForm = document.getElementById("checkout-form")
const modal = document.getElementById('payment-checkout-modal')
const orderField = document.getElementById('order-field')

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        orderField.style.display = 'flex';
        handleItemOrder(e.target.dataset.add)
        totalPrice()
    } else if(e.target.dataset.remove){
        removeItem(e.target.dataset.remove)
    } else if (e.target.dataset.purchasebtn){
        cardPopup()
    }
})
render()

let purchaseList = []
let finishedOrder = false

function handleItemOrder(orderId){
    const targetItemObj = menuArray.filter(function(item){
        return item.id == orderId
    })[0]
    const targetItemName = targetItemObj.name
    const targetItemPrice = targetItemObj.price
    if(!finishedOrder){
    purchaseList.push({
        Name : targetItemName,
        Price : targetItemPrice
    })
    renderOrdersHTML()
}
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
        <button class="purchase-btn" id="purchase-btn"
        data-purchaseBtn="btn">Complete order</button>
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

function removeItem(itemId) {
    purchaseList.splice(itemId, 1)
    if(purchaseList.length == 0){
        orderField.style.display = 'none'
    }
    renderOrdersHTML()
}

function totalPrice(){

    let totalPriceNum = 0

    for( let i=0; i< purchaseList.length; i++){
        totalPriceNum += (purchaseList[i].Price)
    }
    return totalPriceNum
}

function cardPopup(){
    finishedOrder = true
    const purchaseBtn = document.getElementById('purchase-btn')
    modal.style.display = "block"
    modal.classList = "fixed"
    purchaseBtn.style.cursor = "not-allowed"
    const allAddBtns = document.getElementsByClassName('fa-plus')
    for(let i in allAddBtns){
        allAddBtns[i].style.cursor = "not-allowed"
    }
}

checkoutForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const userName = document.getElementById('name').value
    thanksMsg(userName)
})

function thanksMsg(name){
    modal.style.display = 'none'

    let thanksMsg = ``
    thanksMsg = `
    <div class="thanks-modal">
    <h3>Thanks, ${name}! Your order is on its way!</h3>
    </div>`

    orderField.innerHTML = thanksMsg
}

function render(){
    document.getElementById('menu').innerHTML = renderMenu()
}

function renderOrdersHTML(){
    orderField.innerHTML = renderOrders()
}