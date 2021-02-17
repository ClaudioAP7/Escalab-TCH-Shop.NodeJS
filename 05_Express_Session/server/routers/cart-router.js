const express = require('express');
const { addSessionCart, listSessionCart } = require('./../controllers/cart-controller')

const router = express.Router();

//ROUTERS
router.get('/cart/session/listCart', listSessionCart);
router.post('/cart/session/addCart', addSessionCart);

module.exports = router;