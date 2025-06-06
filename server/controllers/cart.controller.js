import CartProductModel from "../models/cartproduct.model.js";
import UserModel from "../models/user.model.js";

export const addToCartItemController = async (request, response) => {
    try {
        const userId = request.userId
        const { productId } = request.body

        if (!productId) {
            return response.json({
                message: "Provide Product Id",
                error: true,
                success: false
            })
        }

        const checkItemCart = await CartProductModel.findOne({
            userId: userId,
            productId: productId
        })

        if (checkItemCart) {
            return response.status(401).json({
                message: "Item already in cart",
                error: true,
                success: false
            })
        }

        const cartItems = new CartProductModel({
            quantity: 1,
            userId: userId,
            productId: productId
        })

        const save = await cartItems.save();

        const updateCartUser = await UserModel.updateOne({ _id: userId }, {
            $push: {
                shopping_cart: productId
            }
        })

        return response.json({
            message: "Item added successfully",
            error: false,
            success: true,
            data: save
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getCartItemController = async (request, response) => {
    try {
        const userId = request.userId

        const cartItem = await CartProductModel.find({
            userId: userId,
        }).populate("productId")

        return response.json({
            error: false,
            success: true,
            data: cartItem
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const updateCartItemQtyController = async (request, response) => {
    try {
        const userId = request.userId
        const { _id, qty } = request.body

        if (!userId) {
            return response.status(400).json({
                message: "You have not login",
                error: true,
                success: false
            })
        }
        if (!_id || !qty) {
            return response.status(400).json({
                message: "Provide Id and quantity",
                error: true,
                success: false
            })
        }

        const updateCartItem = await CartProductModel.updateOne({
            _id: _id,
            userId: userId
        }, {
            quantity: qty
        })

        return response.json({
            message: "Item updated",
            error: false,
            success: true,
            data: updateCartItem
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const deleteCartItemQtyController = async (request, response) => {
    try {
        const userId = request.userId
        const { _id } = request.body

        if (!userId) {
            return response.status(400).json({
                message: "You have not login",
                error: true,
                success: false
            })
        }
        if (!_id) {
            return response.status(400).json({
                message: "Provide Id",
                error: true,
                success: false
            })
        }

        const deleteCartItem = await CartProductModel.deleteOne({ _id: _id, userId: userId })

        return response.json({
            message: "Item remove from cart",
            error: false,
            success: true,
            data: deleteCartItem
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}