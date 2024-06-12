const cartModel = require("../../models/cart.model");
const cartItemModel = require("../../models/cartItem.model");

const getCart = async (req, res) => {
    try {
        let {
            user
        } = req.data

        if (user) {
            let cart = await cartModel.findOne({
                customer: user._id,
                orderPlaced: false
            });

            if (cart) {
                let items = await cartItemModel.find({cart: cart._id}).populate("product");

                return res.json({
                    error: false,
                    errorMessage: "",
                    success: true,
                    message: "Cart Found",
                    data: {
                        cart : {
                            ...cart._doc,
                            items
                        }
                    }
                })

            } else {
                return res.json({
                    error: true,
                    errorMessage: "No Cart found",
                    success: false,
                    message: "",
                    data: {}
                })
            }
        }
    } catch (error) {
        return res.json({
            error: true,
            errorMessage: error.message,
            success: false,
            message: "",
        })
    }
}

const addCart = async (req, res) => {
    try {
        let {
            user
        } = req.data

        if (user) {
            let cart = await cartModel.findOne({
                customer: user._id,
                orderPlaced: false
            });

            if (cart) {
                let productAddedToCartOrNot = await cartItemModel.findOne({
                    cart: cart._id,
                    product: req.body.productId
                })

                if (productAddedToCartOrNot) {
                    await cartItemModel.updateOne({
                        _id: productAddedToCartOrNot._id
                    }, {
                        quantity: productAddedToCartOrNot.quantity + 1
                    })
                } else {
                    await cartItemModel.create({
                        cart: cart._id,
                        product: req.body.productId,
                        quantity: 1
                    })
                }

            } else {
                let newCart = await cartModel.create({
                    customer: user._id,
                })

                await cartItemModel.create({
                    cart: newCart._id,
                    product: req.body.productId,
                    quantity: 1
                })
            }

            await collectTotal(cart._id);

            return res.json({
                error: false,
                errorMessage: "",
                success: true,
                message: "Product added to cart successfully",
            })
        }

    } catch (error) {
        return res.json({
            error: true,
            errorMessage: error.message,
            success: false,
            message: "",
        })
    }
}

const updateCart = async (req, res) => {
    try {
        let {
            user
        } = req.data

        if (user) {
            let cart = await cartModel.findOne({
                customer: user._id,
                orderPlaced: false
            });

            if (cart) {
                let productAddedToCartOrNot = await cartItemModel.findOne({
                    cart: cart._id,
                    product: req.body.productId
                })

                if (productAddedToCartOrNot) {
                    await cartItemModel.updateOne({
                        _id: productAddedToCartOrNot._id
                    }, {
                        quantity: req.body.quantity
                    })
                } 
            } 

            await collectTotal(cart._id);

            return res.json({
                error: false,
                errorMessage: "",
                success: true,
                message: "Product update to cart successfully",
            })
        }

    } catch (error) {
        return res.json({
            error: true,
            errorMessage: error.message,
            success: false,
            message: "",
        })
    }
}

const removeCart = async (req, res) => {
    try {
        let {
            user
        } = req.data

        if (user) {
            let cart = await cartModel.findOne({
                customer: user._id,
                orderPlaced: false
            });

            if (cart) {
                let productAddedToCartOrNot = await cartItemModel.findOne({
                    cart: cart._id,
                    product: req.params.productId
                })

                if (productAddedToCartOrNot) {
                    await cartItemModel.deleteOne({
                        _id: productAddedToCartOrNot._id
                    })
                } 
            } 

            await collectTotal(cart._id);

            return res.json({
                error: false,
                errorMessage: "",
                success: true,
                message: "Product delete to cart successfully",
            })
        }

    } catch (error) {
        return res.json({
            error: true,
            errorMessage: error.message,
            success: false,
            message: "",
        })
    }
}

const collectTotal = async (cartId) => {
    let items = await cartItemModel.find({
        cart: cartId,
    }).populate("product")

    let subTotal = 0;
    let grandTotal = 0;
    let tax = 0;

    for (const item of items) {
        subTotal = subTotal + item.product.price * item.quantity
    }

    grandTotal = subTotal + tax;

    await cartModel.updateOne({_id: cartId}, {
        subTotal: subTotal,
        grandTotal: grandTotal,
        tax: tax
    })
}

module.exports = {
    getCart,
    addCart,
    updateCart,
    removeCart,
}