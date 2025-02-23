import { Router } from "express"
import auth from "../middleware/auth.js";
import { CashOnDeliveryOrderController, getOrderDetailsController, PaymentController, webhookStripe } from "../controllers/order.controller.js";

const OrderRouter = Router();

OrderRouter.post("/cash-on-delivery", auth, CashOnDeliveryOrderController)
OrderRouter.post("/checkout", auth, PaymentController)
OrderRouter.post("/webhook", webhookStripe)
OrderRouter.get("/get-order-list", auth, getOrderDetailsController)

export default OrderRouter