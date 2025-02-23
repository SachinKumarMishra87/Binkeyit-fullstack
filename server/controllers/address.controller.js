import AddressModel from "../models/address.model.js";
import UserModel from "../models/user.model.js";

export const addAddressController = async (request, response) => {
    try {
        const { address_line, city, state, pincode, country, mobail } = request.body
        const userId = request.userId

        if (!userId) {
            return response.status(400).json({
                message: "You have not login",
                error: true,
                success: false
            })
        }

        const createAddress = new AddressModel({
            address_line,
            city,
            state,
            pincode,
            country,
            mobail,
            userId: userId
        })

        const saveAddress = await createAddress.save();

        const addUserAddressId = await UserModel.findByIdAndUpdate(userId, {
            $push: {
                address_details: saveAddress._id
            }
        })

        return response.json({
            message: "Address Created Successfully",
            error: false,
            success: true,
            data: saveAddress
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const getAddressController = async (request, response) => {
    try {
        const userId = request.userId

        if (!userId) {
            return response.status(400).json({
                message: "You have not login",
                error: true,
                success: false
            })
        }

        const data = await AddressModel.find({ userId: userId }).sort({ createAt: -1 })

        return response.json({
            message: "List of address",
            error: false,
            success: true,
            data: data
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const updateAddressController = async (request, response) => {
    try {
        const userId = request.userId
        const { _id, address_line, city, state, pincode, country, mobail } = request.body

        if (!userId) {
            return response.status(400).json({
                message: "Please login",
                error: true,
                success: false
            })
        }

        const updateAddress = await AddressModel.updateOne({ _id: _id, userId: userId }, {
            address_line,
            city,
            state,
            pincode,
            country,
            mobail,
        })

        return response.json({
            message: "updated successfully",
            error: false,
            success: true,
            data: updateAddress
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

export const deleteAddresscontroller = async (request, response) => {
    try {
        const userId = request.userId
        const { _id } = request.body

        const disableAddress = await AddressModel.updateOne({ _id: _id, userId }, {
            status: false
        })

        return response.json({
            message: "Address remove",
            error: false,
            success: true,
            data: disableAddress
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}