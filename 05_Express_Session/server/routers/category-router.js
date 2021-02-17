//Third-Party Module
const express = require('express');
//Local Module
const categoryController = require('../controllers/category-controller');
const authValidation = require('../middleware/auth');
//Init router
const router = express.Router();

//All
/* router.all('/category/*', authValidation.isAuth); */

//Param
router.param('categoryId',categoryController.findCategoryById);

//Router
router.get('/category', categoryController.listCategory);
router.get('/category/:id', categoryController.categoryById);
router.post('/category', categoryController.saveCategory);
router.put('/category/:id', categoryController.updateCategory);
router.delete('/category/:id', categoryController.deleteCategory);

//Export Router to use in server.js
module.exports = router;