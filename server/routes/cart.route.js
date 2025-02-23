import { Router } from "express"
import auth from "../middleware/auth.js";
import { addToCartItemController, deleteCartItemQtyController, getCartItemController, updateCartItemQtyController } from "../controllers/cart.controller.js";
const CartRouter = Router();

CartRouter.post("/create", auth, addToCartItemController)
CartRouter.get("/get", auth, getCartItemController)
CartRouter.put("/update-qty", auth, updateCartItemQtyController)
CartRouter.delete("/delete-cart-item", auth, deleteCartItemQtyController)

export default CartRouter