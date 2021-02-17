const { json } = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ProductModel = require('../models/product-model');

var modelOrder = new Schema({
  usuario: {
    nombre: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'ModelUsuario'
    }
  },
  productos: [{
    producto: {
      type: Object,
      required: true
    },
    cantidad: {
      type: Number,
      required: true
    }
  }],
  total: {
    type: Number,
    required: true
  },
  fecha_orden: {
    type: Date,
    required: true,
    default : Date.now
  }
});

modelOrder.methods.generateOrder = async function (docUser){
    let docUserPopulate = await docUser.populate('cart.item.productId').execPopulate();
    console.log('Populate',docUserPopulate);
    let total = 0;

    let product = docUserPopulate.cart.item.map((element) => {
        total += element.cantidad * element.productId._doc.precio;

        element.productId.vendidos += element.cantidad;
        element.productId.stock -= element.cantidad;
        element.productId.save();

        let copyElement = {...element.productId.toObject()};
        delete copyElement.stock;
        delete copyElement.vendidos;
        delete copyElement.disponible;
        delete copyElement.imagen;
        
        return {
          producto: copyElement,
          cantidad : element.cantidad
        }
    });

    this.productos = product;
    this.total = total;
  
    //await docUser.clearCart();
    return this.save();
};

const model = mongoose.model('OrderCollection', modelOrder);

module.exports = model;