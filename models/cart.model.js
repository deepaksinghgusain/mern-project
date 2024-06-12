const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    subTotal: {
        type: Number,
        default: 0.0
    },
    tax: {
        type: Number,
        default: 0.0
    },
    grandTotal: {
        type: Number,
        default: 0.0
    },
    orderPlaced: {
        type: Boolean,
        default: false
    }
})

const cartModel = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

module.exports = cartModel;