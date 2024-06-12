const path = require("path");
const fs = require("fs");
const bcrypt = require('bcrypt');

const userModel = require("../../models/user.model");

const getUsers = async (req, res) => {
    try {
        let users = await userModel.find();

        return res.json({
            error: false,
            errorMessage: "",
            success: true,
            message: "User Get Successfully",
            users: users
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

const storeUser = async (req, res) => {
    try {
        let user = await userModel.findOne({email: req.body.email});

        if(user) {
            return res.json({
                error: true,
                errorMessage: "Email Id already exists",
                success: false,
                message: "",
            })
        }

        let hashPassword = bcrypt.hashSync(req.body.password, 10);

        await userModel.create({
            name: req.body.name,
            image: req.file?.path.replace('public', ''),
            email: req.body.email,
            password: hashPassword,
            contact: req.body.contact,
            status: req.body.status
        })

        return res.json({
            error: false,
            errorMessage: "",
            success: true,
            message: "User created successfully",
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

const updateUser = async (req, res) => {
    try {
        let user = await userModel.findOne({_id: req.params.id});
    
        if(! user) {
            return res.json({
                error: true,
                errorMessage: "User does not exists",
                success: false,
                message: "",
            })
        }

    
        if(req.file) {
            if(user.image && fs.existsSync(path.join(__dirname, "../../public", user.image))) {
                fs.unlinkSync(path.join(__dirname, "../../public", user.image));
            }

            console.log(req.file);

            await userModel.updateOne({_id: req.params.id},{
                name: req.body.name,
                image: req.file?.path.replace('public', ''),
                email: req.body.email,
                contact: req.body.contact,
                status: req.body.status
            })
        } else {
            await userModel.updateOne({_id: req.params.id},{
                name: req.body.name,
                email: req.body.email,
                contact: req.body.contact,
                status: req.body.status
            })
        }

        return res.json({
            error: false,
            errorMessage: "",
            success: true,
            message: "User updated successfully",
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

const deleteUser = async (req, res) => {
    try {
        let user = await userModel.findOne({_id: req.params.id});

        if(! user) {
            return res.json({
                error: true,
                errorMessage: "User does not exists",
                success: false,
                message: "",
            })
        }

        await userModel.deleteOne({_id: req.params.id})

        return res.json({
            error: false,
            errorMessage: "",
            success: true,
            message: "User deleted successfully",
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
    getUsers,
    storeUser,
    updateUser,
    deleteUser
}