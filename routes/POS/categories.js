const express = require('express');
const categorieController = require('../../controllers/POS/categories');

const categoriesRoutes = express.Router();

categoriesRoutes.get('/pos/categories/add-category', categorieController.getAddCategory);
categoriesRoutes.get('/pos/categories', categorieController.getCategories);
categoriesRoutes.get('/pos/categories/update-category/:id', categorieController.getUpdateCategory);
categoriesRoutes.post('/pos/categories/add-category', categorieController.postAddCategory);
categoriesRoutes.post('/pos/categories/:id', categorieController.removeCategory);
categoriesRoutes.post('/pos/categories/udpate-category/:id', categorieController.postUpdateCategory);


module.exports = categoriesRoutes;