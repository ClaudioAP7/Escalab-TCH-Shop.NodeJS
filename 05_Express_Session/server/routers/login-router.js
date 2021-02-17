//Third-Party Module
const express = require('express');
//Local Module
const loginController = require('../controllers/login-controller');
const validateSignup = require('../validator/login-validator');
//Init router
const router = express.Router();

router.post('/login', loginController.login);
router.post('/signup', validateSignup, loginController.signup);


//Export Router to use in server.js
module.exports = router;