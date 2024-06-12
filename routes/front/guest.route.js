// import modules
const express = require('express');
const { getProducts, getCategories } = require('../../controllers/front/guest.controller');

// router
const router = express.Router();

// get products
router.post('/products', getProducts)

// get categories
router.post('/categories', getCategories)

module.exports = router;
