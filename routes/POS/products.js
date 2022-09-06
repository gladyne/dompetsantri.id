const express = require('express');
const productController = require('../../controllers/POS/products');

const productRoutes = express.Router();

productRoutes.get('/pos/products', productController.getProducts);
productRoutes.get('/pos/products/add-product', productController.addProduct);
productRoutes.get('/pos/products/:id', productController.editProduct);
productRoutes.post('/pos/products/add-product', productController.postAddProduct);
productRoutes.post('/pos/products/:id', productController.removeProduct);
productRoutes.post('/pos/products/edit-product/:id', productController.postEditProduct);

module.exports = productRoutes;