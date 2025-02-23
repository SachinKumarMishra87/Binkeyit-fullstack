import { Router } from "express";
import auth from "../middleware/auth.js";
import { AddSubCategoryController, DeleteSubCategoryController, GetSubCategoryController, UpdateSubCategoryController } from "../controllers/subCategory.controller.js";

const SubCategoryRouter = Router();

SubCategoryRouter.post("/create", auth, AddSubCategoryController);
SubCategoryRouter.post("/get", GetSubCategoryController);
SubCategoryRouter.put("/update", auth, UpdateSubCategoryController)
SubCategoryRouter.delete("/delete", auth, DeleteSubCategoryController)

export default SubCategoryRouter;