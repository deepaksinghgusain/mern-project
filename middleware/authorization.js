const jwt = require('jsonwebtoken');

const authorization = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1];

        if (token) {
            let verifyToken = jwt.verify(token, 'secret');
            if (verifyToken) {
                req.data = verifyToken
                next()
            } else {
                return res.json({
                    error: true,
                    errorMessage: "token is invalid",
                    success: false,
                    message: ""
                })
            }
        }else {
            return res.json({
                error: true,
                errorMessage: "Please login first",
                success: false,
                message: ""
            })
        }
    } catch (err) {
        return res.json({
            error: true,
            errorMessage: "Please login first",
            success: false,
            message: ""
        })
    }
}

module.exports = {
    authorization
}