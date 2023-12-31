const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// GET - /add-product
router.get('/add-product', adminController.getAddProduct);

// GET - /products
router.get('/admin-product', adminController.getAdminProducts);

// POST - /add-product
router.post('/add-product', adminController.postAddProduct);

// router.post('/edit-product', adminController.postEditProduct);


// GET  - /edit-product/34
router.get('/edit-product/:productId', adminController.getEditMyProduct);

router.post('/edit-product', adminController.postEditProduct);

module.exports = router;