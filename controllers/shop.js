const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Shop Product List',
      path: '/product-list',
    });
  });
};

exports.getShopIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'My Shop',
      path: '/',
    });
  });
};

exports.getMyCart = (req, res, next) => {
  res.render('shop/cart', {
    pageTitle: 'My Cart',
    path: '/cart',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    pageTitle: 'My Checkout',
    path: '/checkout',
  });
};

exports.getMyOrders = (req, res, next) => {
  res.render('shop/orders', {
    pageTitle: 'My Orders',
    path: '/orders',
  });
};

exports.getProductDetails = (req, res, next) => {
  const productId = req.params.productId;
  // filter the data using the product id and send that product to view
  Product.findProductById(productId, (product) => {
    console.log(product);
    console.log(product.productId);
    res.render('shop/product-details', {
      pageTitle: 'My Product Details',
      path: '/product-details',
      product: product,
    });
  });
};
//contollers

exports.postMyCart = (req, res, next) => {
  const productId = req.body.productId;

  // Find the product by its ID and provide a callback function to handle the product once found
  Product.findProductById(productId, (product) => {
      // Here, we pass the productId, product price, and product title to the Cart's addProduct method
      Cart.addProduct(productId, product.price, product.title);

      console.log("Added to cart");
  });

  // Redirect to the home page after adding the product to the cart
  res.redirect('/');
};
