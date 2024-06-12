const orderModel = require("../../models/order.model");
const orderItemModel = require("../../models/orderItem.model");

const getOrders = async (req, res) => {
    try {
        let orders = await orderModel.find();

        return res.json({
            error: false,
            errorMessage: "",
            success: true,
            message: "Order Get Successfully",
            orders: orders
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

const viewOrder = async (req, res) => {
    try {
        let order = await orderModel.findOne({
            _id: req.params.id
        });

        if(order) {

            let items = await orderItemModel.find({order: order._id}).populate("product")

            return res.json({
                error: false,
                errorMessage: "",
                success: true,
                message: "Order Item Get Successfully",
                order: {
                    ...order._doc,
                    items: items
                }
            })
        }

        return res.json({
            error: true,
            errorMessage: "order not found",
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
    getOrders,
    viewOrder
}