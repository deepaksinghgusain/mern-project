// import modules
const express = require('express');
const { getCart, addCart, updateCart, removeCart } = require('../../controllers/front/cart.controller');
const { authorization } = require('../../middleware/authorization');

// router
const router = express.Router();

router.use(authorization)

// get cart
router.post('/', getCart)

// add to cart
router.post('/add', addCart)

// update cart
router.patch('/update', updateCart)

// update cart
router.delete('/destroy/:productId', removeCart)

module.exports = router;
