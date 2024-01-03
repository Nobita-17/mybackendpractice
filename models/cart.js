const fs = require('fs');
const path = require('path');

//taking roort path 
//rootr 

const pathBuilt = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(productId, productPrice, title) {
        // Fetch previous cart
        fs.readFile(pathBuilt, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };   //creatig empty cart 
            if (!err) {
                cart = JSON.parse(fileContent);   //if their is no error then parsing the JSON content 
            }

            // Analyze the cart -> search for existing product
                    
            //cart.products is an array that holds a list of products 
            //findindex is a javascript function that returs the index of fisrt product when conditiin is true
            //if the product is found we assign the index

            const existProductIndex = cart.products.findIndex(prod => prod.productId === productId);
            const existProduct = cart.products[existProductIndex];  //assign index 
            let updatedProduct;

            // Add new products


            // responsible for 
            //updating the shopping cart based on whether a product with the specified productId already exists
            if (existProduct) {  //if product exist 
                updatedProduct = { ...existProduct };   //we upadte the product with the index of existproduct
                updatedProduct.qty = updatedProduct.qty + 1;     //updatibg the quatity 
                cart.products = [...cart.products];   
                cart.products[existProductIndex] = updatedProduct;  //adding upadted product"Replace the product in the cart.products array at the position given by existProductIndex with the updated product information in updatedProduct
            } else {
                updatedProduct = { productId: productId, qty: 1, title: title };   //setting qty 
                cart.products.push(updatedProduct);      
            }

            cart.totalPrice = cart.totalPrice + +productPrice;
            cart.products = [...cart.products];

            fs.writeFile(pathBuilt, JSON.stringify(cart), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }
};
