//Third-Party Module
const express = require('express');
//Local Module
const  userController  = require('../controllers/user-controller');
//Init Router
const router = express.Router();

router.get('/user', userController.usersList);
router.get('/user/:id', userController.userById);
router.post('/user', userController.saveUser);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

//Export Router to use in server.js
module.exports = router;