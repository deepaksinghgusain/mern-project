const userModel = require("../../models/user.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    console.log(req.body);
    try {
        let user = await userModel.findOne({
            email: req.body.email
        });

        if (user) {
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
            email: req.body.email,
            password: hashPassword,
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

const loginUser = async (req, res) => {
    try {
        let user = await userModel.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.json({
                error: true,
                errorMessage: "Email Id and password does not matched",
                success: false,
                message: "",
            })
        }

        let comparePassword = bcrypt.compareSync(req.body.password, user.password);
        
        if (comparePassword) {
            let token = jwt.sign({user}, 'secret');
            return res.json({
                error: false,
                errorMessage: "",
                success: true,
                message: "User created successfully",
                token,
                user
            })
        }

        return res.json({
            error: true,
            errorMessage: "Email Id and password does not matched",
            success: false,
            message: "",
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
    registerUser,
    loginUser
}