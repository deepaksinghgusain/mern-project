const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    cart: {
        type: mongoose.Types.ObjectId,
        ref: "Cart"
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    quantity: {
        type: Number,
        default: 1
    }
})

const cartItemModel = mongoose.models.CartItem || mongoose.model("CartItem", cartItemSchema);

module.exports = cartItemModel;