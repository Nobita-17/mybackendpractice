const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/add-product',
    isEdit: '',
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/edit-product',
    isEdit: editMode,
  });
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'All Admin Product List',
      path: '/admin-product',
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;

  const product = new Product(null,title, description, price, imageUrl);
  product.save();
  res.redirect('/');
};

exports.getEditMyProduct = (req, res, next) => {
  const isEditMode = req.query.isEditing;
  const productId = req.params.productId;
  console.log('isEditMode', isEditMode); //"true"

  Product.findProductById(productId, (product) => {
    // check if product is not undefined or return user
    res.render('admin/edit-product', {
      pageTitle: 'Editing Product',
      path: '',
      product: product,
      isEdit: isEditMode,
    });
  });
};


//construct a new product and replace the existing one with new product 
exports.saveModifiedProduct=(req,res,next)=>{
console.log(req.body);
};