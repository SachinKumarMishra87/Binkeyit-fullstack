import { Router } from "express"
import auth from "../middleware/auth.js";
import { addAddressController, deleteAddresscontroller, getAddressController, updateAddressController } from "../controllers/address.controller.js";

const AddressRouter = Router()

AddressRouter.post("/create", auth, addAddressController)
AddressRouter.get("/get", auth, getAddressController)
AddressRouter.put("/update", auth, updateAddressController)
AddressRouter.delete("/delete", auth, deleteAddresscontroller)

export default AddressRouter