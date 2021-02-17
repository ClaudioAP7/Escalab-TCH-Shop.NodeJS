const mongoose = require('mongoose');
var Schema = mongoose.Schema;

/* const validator = async(value) => {
    return await CategoriaModel.exists({ nombre: value});
} */

let userModel = new mongoose.Schema(
    {
        nombre: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: "USER_ROLE"
        },
        disponible: {
            type: Boolean,
            default: true
        },
        cart: {
            item: [{
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'ProductCollection'
                },
                cantidad: {
                    type: Number,
                    required: true
                },
                subTotal: {
                    type: Number,
                    // required: true
                }
            }]
        }
    },{
        timeStamp: true
    }
);

userModel.methods.addCart = function (producto) {
    let index = this.cart.item.findIndex(item =>{
        return item.productId.toString() === producto._id.toString();
    });
    let _cantidad = 1;
    let newCartItems = [ ...this.cart.item];
    if(index >= 0){
        _cantidad = this.cart.item[index].cantidad + 1;
        newCartItems[index].cantidad = _cantidad;
        newCartItems[index].subTotal = _cantidad * producto.precio;
    }else{
        newCartItems.push({
            productId: producto._id,
            cantidad: _cantidad,
            subTotal: _cantidad * producto.precio
        });
    }
    let newCart = { item: newCartItems };
    this.cart = newCart;
    return this.save();
}

userModel.methods.clearCart = function () {
    this.cart = { item: [] };
    return this.save();
}

const model = mongoose.model('UserCollection',userModel);

module.exports = model;