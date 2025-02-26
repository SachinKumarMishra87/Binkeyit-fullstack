import express, { request, response } from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser";
import helmet from "helmet"
import morgan from "morgan"
import connectDB from "./config/conn.js";
import userRouter from "./routes/user.route.js";
import CategoryRouter from "./routes/category.route.js";
import UploadRouter from "./routes/upload.route.js";
import CartRouter from "./routes/cart.route.js";
import AddressRouter from "./routes/address.route.js";
import OrderRouter from "./routes/order.route.js";
import ProductRouter from "./routes/product.route.js";
import SubCategoryRouter from "./routes/subCategory.route.js"


const app = express();
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy: false
}))

const PORT =  process.env.PORT || 8000

app.get("/", (request, response) => {
    response.json({
        message: "Server is running at " + PORT
    })
})

app.use('/api/user', userRouter)
app.use('/api/category', CategoryRouter)
app.use('/api/file', UploadRouter)
app.use("/api/subcategory",SubCategoryRouter)
app.use("/api/product", ProductRouter)
app.use("/api/cart", CartRouter)
app.use("/api/address", AddressRouter)
app.use("/api/order", OrderRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running at", PORT)
    })
})