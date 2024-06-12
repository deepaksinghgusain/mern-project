const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    status: {
        type: Boolean,
        default: false
    }
})

const categoryModel = mongoose.models.Category || mongoose.model("Category", categorySchema);

module.exports = categoryModel;