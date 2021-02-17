const CategoryModel = require('../models/category-model');


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

//FIND CATEGORY BY ID => PARAM
const findCategoryById = () => {
    //CategoryModel.find().exec
}

//LIST CATEGORY
const listCategory = (request, response, next) => {
    CategoryModel.find().exec((error, document) => {
        if(error || !document) return errorHandler(error, next, document);
        
        response.json({
            ok: true,
            category: document
        });
    });    

};

//GET CATEGORY BY ID
const categoryById = (request, response, next) => {
    let id = request.params.id;
    CategoryModel.findById(id, (error, document) => {
        if(error || !document) return errorHandler(error, next, document);

        response.json({
            ok: true,
            category: document
        });
    });
};

//SAVE CATEGORY
const saveCategory = (request, response, next) => {
    let data = {
        nombre: request.body.nombre
    };

    let modelCategory = new CategoryModel(data);

    modelCategory.save((error, document) => {
        if(error || !document) return errorHandler(error, next, document);

        response.json({
            ok: true,
            category: document
        });
    });
};

//UPDATE CATEGORY
const updateCategory = (request, response, next) => {
    let id = request.params.id;
    CategoryModel.findByIdAndUpdate(id, {nombre: request.body.nombre}, (error, document) => {
        if(error || !document) return errorHandler(error, next, document);

        response.json({
            ok: true,
            categoryUpdated: document
        });
    });
};

//DELETE CATEGORY
const deleteCategory = (request, response, next) => {
    let id = request.params.id;
    CategoryModel.findByIdAndDelete(id, (error, document) => {
        if(error || !document) return errorHandler(error, next, document);
        
        response.json({
            ok: true,
            categoryDeleted: document
        });
    });
};

module.exports = {
    findCategoryById,
    listCategory,
    categoryById,
    saveCategory,
    updateCategory,
    deleteCategory
};