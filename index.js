import { menuArray } from "./data.js";

function itemsRender(){
    let feedHTML = ``
    menuArray.forEach(item => {

        feedHTML+=`
    <div class="item-container">
        <div class="food-img">
        ${item.emoji}
        </div>
        <div class="item-container-inner">
            ${item.name}
            ${item.ingredients}
            ${item.price}
        </div>
    </div>
    `
    })
    return feedHTML
}

function render(){
    document.getElementById('section').innerHTML += itemsRender()
}

render()