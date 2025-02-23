import SubCategoryModel from "../models/subCategory.model.js";

// Add Sub Category
export const AddSubCategoryController = async (request, response) => {
    try {
        const { name, image, category } = request.body

        if (!name && !image && !category) {
            return response.json({
                message: "Enter require fields",
                error: true,
                success: false
            })
        }

        const payload = {
            name,
            image,
            category
        }

        const craeteSubCategory = new SubCategoryModel(payload);
        const saveSubCategory = await craeteSubCategory.save()

        if (!saveSubCategory) {
            return response.status(500).json({
                message: "Not created",
                error: true,
                success: false
            })
        }

        return response.json({
            message: "Added Sub Category",
            error: false,
            success: true,
            data: saveSubCategory
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Get all sub category
export const GetSubCategoryController = async (request, response) => {
    try {
        const getAllSubCategory = await SubCategoryModel.find().sort({ createdAt: -1 }).populate('category');

        if (!getAllSubCategory) {
            return response.status(500).json({
                message: "Not found",
                error: true,
                success: false
            })
        }

        return response.json({
            message: "All Sub Category",
            error: false,
            success: true,
            data: getAllSubCategory
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Edit Sub Category
export const UpdateSubCategoryController = async (request, response) => {
    try {
        const { _id, name, image, category } = request.body

        const checkSub = await SubCategoryModel.findById(_id)

        if (!checkSub) {
            return response.status(500).json({
                message: "Check Your Id",
                error: true,
                success: false,
            })
        }

        const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, {
            name,
            image,
            category
        })

        return response.json({
            message: "Updated Successfully",
            error: false,
            success: true,
            data: updateSubCategory
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Delete Sub Category
export const DeleteSubCategoryController = async (request, response) => {
    try {
        const { _id } = request.body
        const deleteSub = await SubCategoryModel.findByIdAndDelete(_id)

        return response.json({
            message: "Deleted Successfully",
            error: false,
            success: true,
            data: deleteSub
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}