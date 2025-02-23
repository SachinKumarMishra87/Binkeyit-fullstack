import { Router } from "express"
import auth from "../middleware/auth.js";
const CategoryRouter = Router();

import { AddCategoryController, DeleteCategoryController, GetAllCategoryController, UpdateCategoryController } from "../controllers/category.controller.js";


CategoryRouter.post("/add-category", auth, AddCategoryController)
CategoryRouter.get("/get", GetAllCategoryController)
CategoryRouter.put("/update", auth, UpdateCategoryController)
CategoryRouter.delete("/delete", auth, DeleteCategoryController)

export default CategoryRouter;