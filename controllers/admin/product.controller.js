const path = require("path");
const fs = require("fs");
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

const storeProduct = async (req, res) => {
    try {
        let product = await productModel.findOne({name: req.body.name});

        if(product) {
            return res.json({
                error: true,
                errorMessage: "Product already exists",
                success: false,
                message: "",
            })
        }

        await productModel.create({
            name: req.body.name,
            image: req.file?.path.replace('public', ''),
            shortDescription: req.body.shortDescription,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            category: req.body.category,
            status: req.body.status
        })

        return res.json({
            error: false,
            errorMessage: "",
            success: true,
            message: "Product created successfully",
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

const updateProduct = async (req, res) => {
    try {
        let product = await productModel.findOne({_id: req.params.id});

        if(! product) {
            return res.json({
                error: true,
                errorMessage: "Product does not exists",
                success: false,
                message: "",
            })
        }

        if(req.file) {
            if(product.image && fs.existsSync(path.join(__dirname, "../../public", product.image))) {
                fs.unlinkSync(path.join(__dirname, "../../public", product.image));
            }

            await productModel.updateOne({_id: req.params.id},{
                name: req.body.name,
                image: req.file?.path.replace('public', ''),
                shortDescription: req.body.shortDescription,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                category: req.body.category,
                status: req.body.status
            })
        } else {
            await product.updateOne({_id: req.params.id},{
                name: req.body.name,
                shortDescription: req.body.shortDescription,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity,
                category: req.body.category,
                status: req.body.status
            })
        }

        return res.json({
            error: false,
            errorMessage: "",
            success: true,
            message: "Product updated successfully",
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

const deleteProduct = async (req, res) => {
    try {
        let product = await productModel.findOne({_id: req.params.id});

        if(! product) {
            return res.json({
                error: true,
                errorMessage: "Product does not exists",
                success: false,
                message: "",
            })
        }

        await productModel.deleteOne({_id: req.params.id})

        return res.json({
            error: false,
            errorMessage: "",
            success: true,
            message: "Product deleted successfully",
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
    storeProduct,
    updateProduct,
    deleteProduct
}