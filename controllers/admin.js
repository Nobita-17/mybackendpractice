//here we will deal with all the admin related functinality  

const Product = require('../models/product');    //exporting product model from model folder 


//this is the functionality that will allow us to add the product 
exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {    //this will render edit-product page 
    pageTitle: 'Add Product',
    path: '/add-product',   //using it as a property for conditional rendering 
    isEdit: '',
  });
};


//here we are using the assigning the query parameter each http request has a query paramter after ? & separated by &
//http://example.com/path?edit=true here edit is query parmeter 
//using req.query.edit we are extarcting the value 

//used for handling edit functionality 

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {     //cheching if it is true then redirect
    return res.redirect('/');
  }
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product',
    path: '/edit-product',
    isEdit: editMode,
  });
};


//here we are displaying the list of all product which the admin has. fetchAll repsoinile for fetching data by intercating with database 
//here we using a caaalback function once the fecthAll function is executed to pass the data to products parmater 

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'All Admin Product List',
      path: '/admin-product',
    });
  });
};


//handling a POST request for adding a product.It retrieves the product information from the request body,
// creates a Product object with that information, saves the product, and then redirects the user

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;    //extracting the value of the title property from the body of an HTTP request
  const description = req.body.description;
  const price = req.body.price;
  const imageUrl = req.body.imageUrl;


  //new Product will create a instance of Product class. The Product class constructor takes several parameters that are alredy defined in model folder
  //now product variable holds an object representing of Product class with the specified characteristics
  //calling product.save() is essentially triggering the logic defined in the save method of the Product class 

  const product = new Product(null, title, description, price, imageUrl);
  product.save(); //we create an instance of Product class , now this says Product class has a method named save
  console.log('New Product is added');
  res.redirect('/');
};

//defining the how would edit works 
exports.getEditMyProduct = (req, res, next) => {
  const isEditMode = req.query.isEditing;  //query parasing 
  const productId = req.params.productId;   // params 
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


exports.postEditProduct = (req, res, next) => {

  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedUrl = req.body.imageUrl;
  const updatedDec = req.body.description;

  const updatedProduct = new Product(productId, updatedTitle, updatedPrice, updatedUrl, updatedDec);

  updatedProduct.save();
  res.redirect('/admin/products');

}



//construct a new product and replace the existing one with new product 
// exports.saveModifiedProduct = (req, res, next) => {
//   console.log(req.body);
// };