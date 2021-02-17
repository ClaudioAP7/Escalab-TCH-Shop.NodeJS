const express = require('express');
const { userByIdMethod } = require('./../controllers/user-controller');
const orderController = require('./../controllers/order-controller');

const router = express.Router();

//PARAMS
router.param('userId', userByIdMethod);

//ROUTERS
router.post('/generateOrder/:userId', orderController.generateOrder);

module.exports = router;