let contenu = [];

export function addToCart(product) {
    let exists = false;
    contenu.forEach(item => {
        if (item.produit.ref === product.ref) {
            item.quantite++;
            exists = true;
        }
    });
    if (!exists) contenu.push({produit: product, quantite: 1});
}

export function genericCalc(callback) {
    let liste =  contenu.map(callback);
    return (liste.length > 0) ? liste.reduce((old, cur) => old+cur) : "";
}

export function save() {
    localStorage.setItem("cart", JSON.stringify(contenu));
}

export function load() {
    const data = localStorage.getItem("cart");
    contenu = JSON.parse((data == null)? "[]" : data);
}

export function emptyCart() {
    contenu = [];
}