import AddToCart, {cart} from './shoppingCart.js';
console.log('Module Imported');
AddToCart('bread', 3);
console.log(cart);


// import * as ShoppingCart from './shoppingCart.js';
// console.log('Module Imported');
// ShoppingCart.addToCart('bread', 3);
// console.log(ShoppingCart);

// Module pattern

// const ShoppingCart2 = (function() {
//     const cart = [];
//     const totalPrice = 500;
//     const totalQuantity = 41;
//     const shippingCost = 5;

//     const addToCart = function(product, quantity) {
//         cart.push({product, quantity});
//         console.log(`Added ${quantity} ${product} to the cart`);
//     };

//     const orderProd = function(product, quantity) {
//         console.log(`Ordered ${quantity} ${product} with shipping cost of ${shippingCost}`);
//     };

//     return {
//         cart,
//         totalPrice,
//         totalQuantity,
//         addToCart,
//         orderProd
//     }
// })();

// ShoppingCart2.addToCart('milk', 2);
// ShoppingCart2.addToCart('butter', 8);
// ShoppingCart2.orderProd('tea', 10);
// console.log(ShoppingCart2.shippingCost); 
// console.log(ShoppingCart2.cart);
// console.log(ShoppingCart2);


// Practicing npm

// import  cloneDeep  from "./node_modules/lodash-es/cloneDeep.js";
import cloneDeep from 'lodash';

const state = {
    cart: [
        {product: 'pizza', quantity: 10,},
        {product: 'lasagne', quantity: 8,}
    ],
    user: {loggedIn: true},
}

// const stateClone = Object.assign({}, state)
//     state.user.loggedIn = false;
// console.log(stateClone);

const stateDeepClone = cloneDeep(state);
state.user.loggedIn = false;
console.log(stateDeepClone);
console.log(state);
if(module.hot) {
    module.hot.accept();
}