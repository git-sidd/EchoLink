import mongoose from "mongoose";
import "dotenv/config"

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected Succesfully`);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
}