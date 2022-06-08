console.log('Exporting module');

export const cart = [];

export const addToCart = function(product, quantity) {
    cart.push({product, quantity});
    console.log(`Added ${quantity} ${product} to the cart`);
}