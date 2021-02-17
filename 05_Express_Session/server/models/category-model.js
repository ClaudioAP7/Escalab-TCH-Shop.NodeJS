const mongoose = require('mongoose');


let categoryModel = new mongoose.Schema(
    {
        nombre: {
            type: String,
            unique: true
        }
    },{
        timeStamp: true
    }
);

const model = mongoose.model('CategoryCollection',categoryModel);

module.exports = model;