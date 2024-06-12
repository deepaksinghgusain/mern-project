const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: false
    },
    role: {
        type: String, 
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    status: {
        type: Boolean,
        default: true
    }
})

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = userModel;