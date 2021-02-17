const ProductModel = require('../models/product-model');

function errorHandler(err, next, document){
    if(err){
        return next(err);
    }
    if(!document){
        const error = new Error("No existe Categoria");
        error.statusCode = 500;
        return next(error);
    }
}

//PRODUCT BY ID - PARAMS
const productByIdMethod = (request, response, next, id) => {
    ProductModel.findById(id, (error, document) => {
        if(error || !document) return errorHandler(error, next, document);

        request.docProducto = document;
        next();
    });
};


//PRODUCT LIST
const productList = (request, response, next) => {
    ProductModel.find().where({ disponible : true }).exec((error, document) => {
        if(error || !document) return errorHandler(error, next, document);
        //document = document.toObject();
        //delete document.imagen;
        response.json({
            ok: true,
            product: document
        });
    });
};

//PRODUCT BY ID
const productById = (request, response, next) => {
    request.docProducto = request.docProducto.toObject();
    delete request.docProducto.imagen;
    response.json({
        ok: true,
        product: request.docProducto
    });
};

//GET IMAGE OF PRODUCT
const getImageOfProductById = (request, response) => {
    response.set("Content-Type", request.docProducto.imagen.contentType);
    
    return response.send(request.docProducto.imagen.data);
};

//SAVE PRODUCT
const saveProduct = (request, response, next) => {
    let data = {
        producto_nombre: request.body.producto_nombre,
        descripcion: request.body.descripcion,
        precio: request.body.precio,
        stock: request.body.stock,
        vendidos: request.body.vendidos,
        disponible: request.body.disponible,
        categoria_nombre: request.body.categoria_nombre
    };
    

    let productModel = new ProductModel(data);
    productModel.imagen.data = request.files.imagen.data;
    productModel.imagen.contentType = request.files.imagen.mimetype;
    
    productModel.save((error, document) => {
        if(error || !document) return errorHandler(error, next, document);

        document = document.toObject();
        delete document.imagen;
        response.json({
            ok: true,
            product: document
        });    
    });
};


//FALTA AVANZAR CON EL UPDATE Y DELETE DE PRODUCTOS. DESPUES TERMINAR DE VER EL VIDEO DEL JUEVES PASADO PARA AGREGAR OBJETOS AL CARRITO EN USER CONTROLLER

//UPDATE PRODUCT 
const updateProduct = (request, response, next) => {
    let id = request.params.id;
    ProductModel.findByIdAndUpdate(id, request.body, { new: true }, (error, document) =>{
        if(error || !document) return errorHandler(error, next, document);

        response.json({
            ok: true,
            product: document
        });  
    });
};

//DELETE PRODUCT
const deleteProduct = (request, response) => {
    let id = request.params.id;
    
    //lo haremos mas adelante con el router params

    response.json({
        ok: true,
        product: dataResponse[0]
    });
};

//Export to use in product-router.js
module.exports = {
    productList,
    productByIdMethod,
    productById,
    saveProduct,
    updateProduct,
    deleteProduct,
    getImageOfProductById
};