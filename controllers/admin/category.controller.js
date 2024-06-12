const categoryModel = require("../../models/category.model")
const path = require("path");
const fs = require("fs");

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

const storeCategory = async (req, res) => {
    try {
        let category = await categoryModel.findOne({name: req.body.name});

        if(category) {
            return res.json({
                error: true,
                errorMessage: "Category already exists",
                success: false,
                message: "",
            })
        }

        await categoryModel.create({
            name: req.body.name,
            image: req.file?.path.replace('public', ''),
            status: req.body.status
        })

        return res.json({
            error: false,
            errorMessage: "",
            success: true,
            message: "Category created successfully",
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

const updateCategory = async (req, res) => {
    try {
        let category = await categoryModel.findOne({_id: req.params.id});

        if(! category) {
            return res.json({
                error: true,
                errorMessage: "Category does not exists",
                success: false,
                message: "",
            })
        }
       
        
        if(req.file) {
            if(category.image && fs.existsSync(path.join(__dirname, "../../public", category.image))) {
                fs.unlinkSync(path.join(__dirname, "../../public", category.image));
            }

            await categoryModel.updateOne({_id: req.params.id},{
                name: req.body.name,
                image: req.file?.path.replace('public', ''),
                status: req.body.status
            })
        } else {
            await categoryModel.updateOne({_id: req.params.id},{
                name: req.body.name,
                status: req.body.status
            })
        }

        return res.json({
            error: false,
            errorMessage: "",
            success: true,
            message: "Category updated successfully",
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

const deleteCategory = async (req, res) => {
    try {
        let category = await categoryModel.findOne({_id: req.params.id});

        if(! category) {
            return res.json({
                error: true,
                errorMessage: "Category does not exists",
                success: false,
                message: "",
            })
        }

        await categoryModel.deleteOne({_id: req.params.id})

        return res.json({
            error: false,
            errorMessage: "",
            success: true,
            message: "Category deleted successfully",
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
    getCategories,
    storeCategory,
    updateCategory,
    deleteCategory
}