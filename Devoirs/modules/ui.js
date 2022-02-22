import * as Cart from "./cart.js";

function displayProduct(prod) {
    const container = document.getElementById("product-list");
    const divProduct = document.createElement("div");
    divProduct.classList.add("product");
    const divPhoto = document.createElement("div");
    divPhoto.classList.add("photo");
    const spanMdi = document.createElement("span");
    spanMdi.classList.add("mdi", "mdi-camera");
    divPhoto.appendChild(spanMdi);
    const aProduct = document.createElement("a");
    aProduct.classList.add("product-add2cart");
    aProduct.onclick = () => {Cart.addToCart(prod); Cart.save(); displayCart();};
    const spanMdi2 = document.createElement("span");
    spanMdi2.classList.add("mdi", "mdi-cart");
    aProduct.appendChild(spanMdi2);
    divPhoto.appendChild(spanMdi);
    divPhoto.appendChild(aProduct);
    const divDetails = document.createElement("div");
    divDetails.classList.add("details");
    const divDetailsTop = document.createElement("div");
    divDetailsTop.classList.add("details-top");
    const strongRef = document.createElement("strong");
    const strongPrice = document.createElement("strong");
    strongRef.classList.add("bigger");
    strongPrice.classList.add("bigger");
    strongRef.dataType = "ref";
    strongPrice.dataType = "price";
    strongRef.innerText = prod.ref;
    strongPrice.innerText = prod.prix;
    divDetailsTop.appendChild(strongRef);
    divDetailsTop.appendChild(strongPrice);
    const divDetailsBottom = document.createElement("div");
    divDetailsBottom.classList.add("details-description");
    divDetailsBottom.innerText = prod.description;
    divDetails.appendChild(divDetailsTop);
    divDetails.appendChild(divDetailsBottom);
    divProduct.appendChild(divPhoto);
    divProduct.appendChild(divDetails);
    container.appendChild(divProduct);
}

export function displayCart() {
    let nbProducts = Cart.genericCalc(prod => prod.quantite);
    document.getElementById("total-products").innerHTML = nbProducts;

    let listProducts = Cart.genericCalc(prod => {
        return `<tr>
        <td data-type="ref">${prod.produit.ref}</td>
        <td data-type="qte">x${prod.quantite}</td>
        <td data-type="amount">${prod.produit.prix}€</td>
    </tr>`
    });
    document.getElementById("cart-content").innerHTML = listProducts;
}

export function buildProductsList(products) {
    let string = "";
    products.forEach(prod => {
        string += displayProduct(prod);
    });
    return string;
}