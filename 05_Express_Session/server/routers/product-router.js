//Third-Party Module
const express = require('express');
//Local Module
const productController = require('../controllers/product-controller');
//Init router
const router = express.Router();

//PARAMS
router.param('productId', productController.productByIdMethod);

//ROUTERS
router.get('/products', productController.productList);
router.get('/products/:productId', productController.productById);
router.get('/products/imagen/:productId', productController.getImageOfProductById);
router.post('/products', productController.saveProduct);
router.put('/products/:productId', productController.updateProduct);
router.delete('/products/:productId', productController.deleteProduct);

//Export Router to use in server.js
module.exports = router;