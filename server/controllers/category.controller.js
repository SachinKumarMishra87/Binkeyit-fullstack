import CategoryModel from "../models/category.model.js";
import SubCategoryModel from "../models/subCategory.model.js";
import ProductModel from "../models/product.model.js";

// Add Category Controller
export const AddCategoryController = async (request, response) => {
    try {
        const { name, image } = request.body

        if (!name || !image) {
            return response.json({
                message: "Enter require fields",
                error: true,
                success: false
            })
        }

        const addCategory = new CategoryModel({
            name,
            image
        })

        const saveCategory = await addCategory.save();

        if (!saveCategory) {
            return response.status(500).json({
                message: "Not created",
                error: true,
                success: false
            })
        }

        return response.json({
            message: "Added Category",
            error: false,
            success: true,
            data: saveCategory
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Get All Category Controller
export const GetAllCategoryController = async (request, response) => {
    try {
        const allCategory = await CategoryModel.find().sort({ createAt: -1 });

        if (!allCategory) {
            return response.json({
                message: "No Category Found",
                error: true,
                success: false
            })
        }

        return response.json({
            error: false,
            success: true,
            data: allCategory
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Update Category Controller
export const UpdateCategoryController = async (request, response) => {
    try {
        const { _id, name, image } = request.body;

        const updateCategory = await CategoryModel.updateOne({ _id: _id }, {
            name, image
        })
        return response.json({
            message: "Category Updated",
            error: false,
            success: true,
            data: updateCategory
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

// Delete Category Controller
export const DeleteCategoryController = async (request, response) => {
    try {
        const { _id } = request.body;

        const checkSubCategory = await SubCategoryModel.find({
            category: {
                "$in": [_id]
            }
        }).countDocuments();

        const checkProduct = await ProductModel.find({
            category: {
                "$in": [_id]
            }
        }).countDocuments();

        if (checkSubCategory > 0 || checkProduct > 0) {
            return response.status(400).json({
                message: "Can't delete this category, it has sub category or product",
                error: true,
                success: false
            })
        }

        const deleteCategory = await CategoryModel.deleteOne({ _id: _id });

        return response.json({
            message: "Category Deleted Successfully",
            error: false,
            success: true,
            data: deleteCategory
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
