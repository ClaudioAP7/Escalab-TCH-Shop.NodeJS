const { findSourceMap } = require('module');
const mongoose = require('mongoose');
const ProductModel = require('./../models/product-model');
const UserModel = require('./../models/user-model');
const { Cart } = require('./../session/cart-model');


function errorHandler(err, next, document){
    if(err){
        return next(err);
    }
    if(!document){
        const error = new Error("No existe");
        error.statusCode = 500;
        return next(error);
    }
}


//ADD PRODUCTS TO CART USING SESSION
const addSessionCart = async (request, response, next) =>{
    let productId = request.body.productId;
    let userId = request.body.userId;

    docProduct = await ProductModel.findById(productId).exec();
    /* docUser = await ProductModel.findById(userId).exec(); */

    if(!docProduct){
        const error = new Error('No existe producto');
        error.statusCode = 404;
        throw(error);
    }

    let cart = new Cart(request.session.cart ? request.session.cart : []);
    
    let object = {
        productId: docProduct._id.toString(),
        cantidad: 1,
        total: docProduct.precio
    };
    
    cart.add(object);
    request.session.cart = cart;
    /* docUser.cart.item = cart.item;
    await docUser.save(); */

    response.json({
        result: true,
        cart: cart.items
      });
    
};

const union = (firstArray, secondArray) => 
    firstArray.map(element1 => ({
        ...secondArray.find((element2) => {
            return (element2._id.toString() === element1.productId.toString())
        }),
        ...element1
    }));

const listSessionCart = async (request, response, next) => {
    try{
        let cart = new Cart(request.session.cart ? request.session.cart : []);
        let idProducts = cart.items.map((element) => element.productId.toString());
        let docProduct = await ProductModel.find({ '_id': { $in: idProducts } })
        .select('-imagen')
        .lean()
        .exec();

        response.json({
            result: true,
            data: union(cart.items, docProduct)
        });

    } catch(error){
        next(error);
    }
};

module.exports = {
    addSessionCart,
    listSessionCart
};