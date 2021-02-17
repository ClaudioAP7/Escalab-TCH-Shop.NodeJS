const mongoose = require('mongoose');
const CategoriaModel = require('./category-model');

const validator = async(value) => {
    return await CategoriaModel.exists({ nombre: value});
}

let productModel = new mongoose.Schema(
    {
        producto_nombre: {
            type: String,
            require: true
        },
        descripcion: {
            type: String,
            require: true
        },
        imagen: {
            data: Buffer,
            contentType: String
        },
        precio: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        vendidos: {
            type: Number,
            default: 0
        },
        disponible: {
            type: Boolean,
            default: true
        },
        categoria_nombre: {
            type: String,
            required: true,
            validate: validator
        }
    },{
        timeStamp: true
    }
);

const model = mongoose.model('ProductCollection',productModel);

module.exports = model;