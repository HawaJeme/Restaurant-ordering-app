import { menuArray } from "./data.js";

document.addEventListener('click', function(e){
    if(e.target.dataset.id){
        handleItemOrder(e.target.dataset.id)
        document.getElementById('order-field').innerHTML += renderOrders()
    }
})

function handleItemOrder(orderId){
    const targetItemObj = menuArray.filter(function(item){
        return item.id == orderId
    })[0]
    const targetItemName = targetItemObj.name
    renderOrders(targetItemName)
}
function renderOrders(name){
    let orders= ``
    orders+=`
    <div class="orders-container">
        <h2> Your order </h2>
        <div>
        <h5>Order</h5>
        ${name}
        </div>
    </div>
    `
    return orders
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
            <i class="fa-thin fa-plus" data-id=${item.id}></i>
    </div>
    <div class="customers-order">
    </div>
    `
    })
    return MainHTML
}

function render(){
    document.getElementById('section').innerHTML += renderMenu()
}

render()