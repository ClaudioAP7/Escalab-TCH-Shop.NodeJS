const UserModel = require("./../models/user-model");


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

//USER LIST    
const usersList = (request, response, next) => {
    UserModel.find((error, document) => {
        if(error || !document) return errorHandler(error, next, document);

        response.json({
            ok: true,
            users: document
        });
    });
}

const userById = (request, response, next) => {
    let id = request.params.id;
    UserModel.findById(id, (error, document) => {
        if(error || !document) return errorHandler(error, next, document);

        response.json({
            ok: true,
            user: document
        });
    });

    //FUNCION PARA EL PARAMS ROUTER
    /* let id = request.params.id;
    UserModel.findById(id)
    .where({ disponible : true }).exec((error, document) =>{
        if (error || !document) return errorHandler(error,next,document);

        request.docUser = item;
        next();
    }); */
    
}

const userByIdMethod = (request, response, next, id) => {
    //FUNCION PARA EL PARAMS ROUTER
    UserModel.findById(id)
    .where({ disponible : true }).exec((error, document) =>{
        if (error || !document) return errorHandler(error,next,document);
        request.docUser = document;
        next();
    });
}

//SAVE USER    
const saveUser = (request, response, next) => {
    let userModel = new UserModel(request.body);

    userModel.save((error, document) =>{
        if(error || !document) return errorHandler(error, next, document);

        response.json({
            ok: true,
            user: document
        });
    });
}

//UPDATE USER    
const updateUser = (request, response) => {
    let id = request.params.id;

    UserModel.findOneAndUpdate(id, request.body, { new: true }, (error, document) => {
        if(error || !document) return errorHandler(error, next, document);

        response.json({
            ok: true,
            user: document
        });
    });
    
}

//DELETE USER    
const deleteUser = (request, response) => {
    response.json({
        ok: true,
        user: dataResponse[0]
    });
}

//Export to use in user-router.js
module.exports = {
    usersList,
    userById,
    userByIdMethod,
    saveUser,
    updateUser,
    deleteUser
};