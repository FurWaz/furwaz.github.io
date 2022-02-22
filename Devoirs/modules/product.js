class Product {
    /**
     * Default product constructor
     * @param {string} ref reference of the product
     * @param {string} prix price of the product
     * @param {string} description description of the product
     */
    constructor(ref, prix, description) {
        this.ref = ref;
        this.prix = prix;
        this.description = description;
    }
}

/**@type {Product[]} */
export let products = [
    new Product("ref1", "10", "description1"),
    new Product("ref2", "20", "description2"),
    new Product("ref3", "30", "description3")
];

export function search(keywords) {
    return products.filter(prod => prod.ref.includes(keywords) || prod.description.includes(keywords));
}