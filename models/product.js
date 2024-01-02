const fs = require('fs');
const path = require('path');

const pathBuilt = path.join(
  path.dirname(require.main.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (callbackFn) => {
  fs.readFile(pathBuilt, (err, fileContent) => {
    if (err) {
      return callbackFn([]);
    }
    callbackFn(JSON.parse(fileContent));
  });
};

module.exports = class Product {
  constructor(productid, _title, _description, _price, _imageUrl) {
    this.productId = productid;
    this.title = _title;
    this.description = _description;
    this.price = _price;
    this.imageUrl = _imageUrl;
  }

  save() {
    getProductsFromFile((products) => {
      if (this.productId) {
        const existingIndex = products.findIndex(prod => prod.productId == this.productId);
        console.log('Edit Product Index Found');
        const updatedProduct = [...products];
        updatedProduct[existingIndex] = this;
        fs.writeFile(pathBuilt, JSON.stringify(updatedProduct), (err) => {
          console.log('err', err);
        });
      } else {
        this.productId = Math.round(Math.random() * 1000).toString();
        products.push(this);
        fs.writeFile(pathBuilt, JSON.stringify(products), (err) => {
          console.log('err', err);
        });
      }
    });
  }

  saveModify() {

  }

  static fetchAll(callbackFn) {
    getProductsFromFile(callbackFn);
  }

  static findProductById(pid, callbackFn) {
    getProductsFromFile((products) => {
      const product = products.find((product) => product.productId === pid);
      callbackFn(product);
    });
  }
};