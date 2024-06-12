const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    cart: {
        type: mongoose.Types.ObjectId,
        ref: "Cart"
    },
    billingAddress: {
        type: {
            name: {
                type: String
            },
            email: {
                type: String
            },
            contact: {
                type: String
            },
            address: {
                type: String
            },
            city: {
                type: String
            },
            state: {
                type: String
            },
            country: {
                type: String
            },
            zipCode: {
                type: String
            }
        }
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
    }
})

const orderModel = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = orderModel;