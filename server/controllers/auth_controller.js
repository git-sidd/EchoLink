import bcrypt from "bcrypt";
import { User } from "../models/usermodel.js"

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
        return res.status(201).json({
            success:true,
            message:"User Registered Successfully!!"
        })

   } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error,Try again later!!"
        })
   }

}

export const login=async(req,res)=>{
 res.send("Sign up")
}

export const logout=async(req,res)=>{
 res.send("Sign up")
}