import express from "express"
import { connectDB } from "./config/db_config.js";
import  "dotenv/config"
import authRoutes from "./routes/auth_route.js"
import userRoutes from "./routes/user_routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
const app=express();
const port=process.env.PORT;
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())

connectDB();
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);


app.listen(port,()=>{
    console.log(`Server Started at port ${port}`)
})