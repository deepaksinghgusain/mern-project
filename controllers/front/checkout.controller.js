const cartModel = require("../../models/cart.model")
const cartItemModel = require("../../models/cartItem.model")
const orderModel = require("../../models/order.model")
const orderItemModel = require("../../models/orderItem.model")

const placeOrder = async (req, res) => {
    try {

        let cart = await cartModel.findOne({
            _id: req.body.cartId
        })

        if (cart) {

            let cartItems = await cartItemModel.find({
                cart: cart._id
            })

            let order = await orderModel.create({
                customer: cart.customer,
                subTotal: cart.subTotal,
                tax: cart.tax,
                grandTotal: cart.grandTotal,
                cart: cart._id,
                billingAddress: {
                    name: req.body.billingAddress.name,
                    email: req.body.billingAddress.email,
                    contact: req.body.billingAddress.contact,
                    address: req.body.billingAddress.address,
                    city: req.body.billingAddress.city,
                    state: req.body.billingAddress.state,
                    country: req.body.billingAddress.country,
                    zipCode: req.body.billingAddress.zipCode
                }
            })

            for (const item of cartItems) {
                await orderItemModel.create({
                    order: order._id,
                    product: item.product,
                    quantity: item.quantity
                })
            }

            await cartModel.updateOne({_id: cart._id}, {
                orderPlaced: true
            })

            return res.json({
                error: false,
                errorMessage: "",
                success: true,
                message: "Order Placed successfully",
            })
        }

        return res.json({
            error: true,
            errorMessage: "cart not found",
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
    placeOrder
}