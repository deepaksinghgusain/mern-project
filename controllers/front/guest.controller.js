const categoryModel = require("../../models/category.model");
const productModel = require("../../models/product.model");

const getProducts = async (req, res) => {
    try {
        let products = await productModel.find().populate("category");

        return res.json({
            error: false,
            errorMessage: "",
            success: true,
            message: "Product Get Successfully",
            products: products
        })
    } catch (error) {
        return res.json({
            error: true,
            errorMessage: error.message,
            success: false,
            message: "",
        })
    }
}

const getCategories = async (req, res) => {
    try {
        let categories = await categoryModel.find();

        return res.json({
            error: false,
            errorMessage: "",
            success: true,
            message: "Category Get Successfully",
            categories: categories
        })
    } catch (error) {
        return res.json({
            error: true,
            errorMessage: error.message,
            success: false,
            message: "",
        })
    }
}

module.exports = {
    getProducts,
    getCategories,
}