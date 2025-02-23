import { Router } from "express";
import auth from "../middleware/auth.js"
import { createProductController, deleteProductDetails, getProductByCatgoryAndSubCategoryController, getProductByCatgoryController, getProductController, getProductDetails, searchProduct, updateProductDetails } from "../controllers/product.controller.js"
import { admin } from "../middleware/Admin.js";

const ProductRouter = Router();

ProductRouter.post("/create", auth, createProductController)
ProductRouter.post("/get", getProductController)
ProductRouter.post("/get-product-by-category", getProductByCatgoryController)
ProductRouter.post("/get-product-by-category-and-subcategory", getProductByCatgoryAndSubCategoryController)
ProductRouter.post("/get-product-details", getProductDetails)
ProductRouter.put("/update-product-details", auth, admin, updateProductDetails)
ProductRouter.delete("/delete-product-details", auth, admin, deleteProductDetails)
ProductRouter.post("/search-product", searchProduct)

export default ProductRouter;