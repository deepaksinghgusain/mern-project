// import modules
const express = require('express');
const categoryRoute = require('./category.route');
const productRoute = require('./product.route');
const userRoute = require('./user.route');
const orderRoute = require('./order.route');
const { authorization } = require('../../middleware/authorization');

// router
const router = express.Router();

// middleware
// router.use(authorization)

// category routes
router.use('/category', categoryRoute)

// products routes
router.use('/product', productRoute)

// users routes
router.use('/user', userRoute)

// orders routes
router.use('/order', orderRoute)


module.exports = router;
