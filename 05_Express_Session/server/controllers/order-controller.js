const ModelOrder = require('./../models/order-model');
const ModelProduct = require('./../models/product-model');
const loginController = require('./login-controller');
const { getImageOfProductById } = require('./product-controller');

const generateOrder = async (request, response) => {
    let data = {
        usuario: {
            nombre: request.docUser.nombre,
            email: request.docUser.email,
            userId: request.docUser._id
        }
    };
    let auxResponse = await new ModelOrder(data).generateOrder(request.docUser);
    
    response.json({
        result: true,
        orden: auxResponse
    });
};


module.exports = {
    generateOrder
};