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
            <div class="food-name">
                ${item.name}
            </div>
            <div class="food-ingredians">
                ${item.ingredients}
            </div>
            <div>
                $${item.price}
            </div>
        </div>
            <i class="fa-thin fa-plus"></i>
    </div>
    `
    })
    return feedHTML
}

function render(){
    document.getElementById('section').innerHTML += itemsRender()
}

render()