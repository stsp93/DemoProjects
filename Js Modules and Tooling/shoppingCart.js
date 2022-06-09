console.log('Exporting module');

export const cart = [];

export default function(product, quantity) {
    cart.push({product, quantity});
    console.log(`Added ${quantity} ${product} to the cart`);
}