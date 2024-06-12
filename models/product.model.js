const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    shortDescription: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    price: {
        type: Number,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    status: {
        type: Boolean,
        default: false
    }
})

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = productModel;