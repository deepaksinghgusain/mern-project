// import modules
const express = require('express');
const { authorization } = require('../../middleware/authorization');
const { placeOrder } = require('../../controllers/front/checkout.controller');

// router
const router = express.Router();

router.use(authorization)

// place order
router.post('/', placeOrder)

module.exports = router;
