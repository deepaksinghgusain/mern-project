// import modules
const express = require('express');
const { getOrders, viewOrder } = require('../../controllers/admin/order.controller');

// router
const router = express.Router();

// get orders
router.post('/', getOrders)

// order view
router.post('/:id', viewOrder)

module.exports = router;
