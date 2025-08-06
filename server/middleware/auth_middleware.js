import jwt from "jsonwebtoken"
import {User} from "../models/usermodel.js"
import "dotenv/config"
export const protectedRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.jwt;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Unauthorized-token not found"
        })
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
    if(!decoded){
        return res.status(401).json({
            success:false,
            message:"Unauthorized-Invalid Token"
        })
    }
    const user=await User.findById(decoded.userId).select("-password");
    if(!user){
        return res.status(401).json({
            success:false,
            message:"User Not Found!"
        })
    }
    req.user=user;
    next();
    } catch (error) {
        res.status(500).json({
            success:false,
            message:`Unable to verify Identity!-${error}`
        })
    }

}