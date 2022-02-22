import * as product from "./product.js";
import * as ui from "./ui.js";
import { emptyCart, load, save } from "./cart.js";

export function init() {
    load();
    ui.displayCart();
    setProductsList(product.products);

    let input = document.getElementById("product-search");
    input.addEventListener("keyup", ev => {
        if (ev.key != "Enter") return;

        let keywords = input.value;
        let results = product.search(keywords);
        setProductsList(results);
    });

    document.getElementById("empty-cart").onclick = () => {emptyCart(); save(); ui.displayCart();};
}

function setProductsList(products) {
    /* OLD
    let string = ui.buildProductsList(products);
    document.getElementById("product-list").innerHTML = string;
    */

    ui.buildProductsList(products);
}