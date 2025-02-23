import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_CONN = process.env.MONGO_URL
if (!MONGO_CONN) {
    throw new Error("Please provide MONGODB_URL in the .env file");
}

async function connectDB() {
    try {
        await mongoose.connect(MONGO_CONN);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}

export default connectDB;
