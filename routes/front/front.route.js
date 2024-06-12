// import modules
const express = require('express');
const guestRoute = require('./guest.route');
const authenticationRoute = require('./authentication.route');
const cartRoute = require('./cart.route');
const checkoutRoute = require('./checkout.route');

// router
const router = express.Router();

router.use('/', guestRoute)
router.use('/cart', cartRoute)
router.use('/', authenticationRoute)
router.use('/checkout', checkoutRoute)


module.exports = router;
