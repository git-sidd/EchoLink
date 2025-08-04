import express from "express"
import { login, logout, signup,onboard } from "../controllers/auth_controller.js";
import { protectedRoute } from "../middleware/auth_middleware.js";



const router=express.Router();

router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)


router.post("/onboard",protectedRoute,onboard)
router.post("/me",protectedRoute,(req,res)=>{
    res.status(201).json({
        success:true,
        message:"You are LoggedIn",
        user:req.user
    })
})


export default router;