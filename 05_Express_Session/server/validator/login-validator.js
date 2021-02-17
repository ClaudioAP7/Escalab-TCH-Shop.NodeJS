const { body, validationResult } = require('express-validator');
const UserModel = require('../models/user-model');
const { Promise } = require('mongoose');

const pSignup = [
    body('email')
    .isEmail()
    .withMessage('Ingrese email valido.')
    .custom((value) => {
       return UserModel.findOne({email: value}).then(document => {
            if(document){
                return Promise.reject('Este correo ya existe : validator');
            }
        });
    }),
    body('nombre')
    .trim()
    .notEmpty()
    .withMessage('Ingrese nombre.'),
    body('password')
    .trim()
    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$.!%*#?&])/)
    .withMessage("debe tener numeros y caracteres minusculas y mayusculas y un caracter @$.!%*#?&")
    .isLength( { min : 5} )
    .withMessage('Mínimo 5 caracteres.')
]

const vSignup = (request, response, next) => {
    const errors = validationResult(request);       
    if(!errors.isEmpty()){
        const error = new Error('Error de validación');
        error.statusCode = 200;
        error.data = errors.array();
        return next(error);
    }
    next();
};

const validateSignup = [ pSignup, vSignup ];

module.exports = validateSignup;