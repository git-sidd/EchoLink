import bcrypt from "bcrypt";
import { User } from "../models/usermodel.js"
import jwt from "jsonwebtoken"
import "dotenv/config"
import { upsertStreamUser } from "../config/streamchat.js";

export const signup=async(req,res)=>{
   try {
        const {fullname,email,password}=req.body;
        if (!fullname ||!email ||!password){
                return res.status(401).json({
                    success:false,
                    message:"All Fields are Mandatory!!"
                })
        }
        // Example usage in your signup controller
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format!"
            });
        }
        const existedUser=await User.findOne({email})
        if(existedUser){
            return res.status(402).json({
                success:false,
                message:"User Already Existed!!"
            })
        }
        let hashPassword;
        try {
            hashPassword=await bcrypt.hash(password,10);
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:"Error While Storing Password!"
            })
        }
        const idx=Math.floor(Math.random()*100)+1  //generate a no. between 1-100
        const avatarimage=`https://avatar.iran.liara.run/public/${idx}`;
        const user=await User.create({
            fullname,email,password:hashPassword,profilepic:avatarimage
        })

        try {
            await upsertStreamUser({
                id:user._id,
                name:user.fullname,
                image:user.profilepic||" "
            })
            console.log("Stream User Created!")
        } catch (error) {
            console.error("Error in creating Stream User")
        }
        //TODO:JWT token creation
        const token=jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn:"7d"}
        )

        res.cookie("jwt",token,{
            maxAge:7*24*3600*1000,
            httpOnly:true ,//prevent xss attack
            sameSite:"strict",//prevent csrf attack
            secure:process.env.NODE_ENV ==="production"

        })

        return res.status(201).json({
            success:true,
            message:"User Registered Successfully!!",
            user:user
        })

   } catch (error) {
        console.log("Internal Error in Signup Controller!",error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error in Sign UP Controller,Try again later!!"
        })
   }

}

export const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!email || !password){
            return res.status(404).json({
                success:false,
                message:"Both field are required!!"
            })
        }
        const user=User.findOne({email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:"Incorrect email or password!!"
            })
        }
        const token=jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET_KEY,
            {expiresIn:"7d"}
        )

        res.cookie("jwt",token,{
            maxAge:7*24*3600*1000,
            httpOnly:true ,//prevent xss attack
            sameSite:"strict",//prevent csrf attack
            secure:process.env.NODE_ENV ==="production"

        })
        res.status(201).json({
            success:true,
            message:"User Logged in Successfully",
            token:token,
        })

    } catch (error) {
        res.status(502).json({
            success:false,
            message:"Internal Server Error, try again later!!"
        })
    }
}

export const logout=async(req,res)=>{
    res.clearCookie("jwt");
    res.status(201).json({
        success:true,
        message:"User Logged Out Successfully!"
    })
}