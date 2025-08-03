import express from "express"
import { connectDB } from "./config/db_config.js";
import  "dotenv/config"
import authRoutes from "./routes/auth_route.js"
import cookieParser from "cookie-parser";

const app=express();
const port=process.env.PORT;

app.use(express.json())
app.use(cookieParser())

connectDB();
app.use("/api/auth",authRoutes);
app.listen(port,()=>{
    console.log(`Server Started at port ${port}`)
})