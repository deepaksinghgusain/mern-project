// import modules
const express = require('express');
const { registerUser, loginUser } = require('../../controllers/front/authentication.controller');

// router
const router = express.Router();

// register user
router.post('/register', registerUser)

// login user
router.post('/login', loginUser)

module.exports = router;
