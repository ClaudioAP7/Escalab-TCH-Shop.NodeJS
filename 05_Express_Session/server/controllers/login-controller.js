const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

function errorHandler(err, next, document){
    if(err){
        return next(err);
    }
    if(!document){
        const error = new Error("Usuario o contraseña incorrecto.");
        error.statusCode = 500;
        return next(error);
    }
}

//LOGIN 
const login = (request, response, next) => {
    let email = request.body.email;
    let password = request.body.password;

    UserModel.findOne( {email:email}, (error, document) =>{
        if(error || !document ) return errorHandler(error, next, document);

        if(!bcrypt.compareSync(password, document.password)){
            return response.status(401).json({
                result: true,
                message: 'Usuario o contraseña incorrecto.'
            });
        }   

        let payload = {
            userId: document._id,
            role: document.role
        };

        let token = jwt.sign(
            payload,
            process.env.SEED,
            {
                expiresIn: process.env.CADUCIDAD_TOKEN
            }
        );

        response.json({
            result: true,
            data: {
                userId: document._id,
                role: document.role,
                token: token
            }
        });
    });

};

//SIGN UP
const signup = (request, response) => {
    console.log('-> SALTH: ', process.env.SALTH);
    let data = {
        nombre: request.body.nombre,
        email: request.body.email,
        password: bcrypt.hashSync(request.body.password, 10),
        role: request.body.role
    }
    let userModel = new UserModel(data);

    userModel.save((error, document, next) =>{
        if(error || !document) return errorHandler(error, next, document);
        
        response.json({
            ok: true,
            user: document
        });
    });
}

//Export to use in login-router.js
module.exports = {
    login,
    signup
};