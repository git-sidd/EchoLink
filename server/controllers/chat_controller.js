import { generateStreamToken } from "../config/streamchat.js";

export const getStreamToken=async(req,res)=>{
    try {
        const token=generateStreamToken(req.user.id);
        res.status(201).json({
        success:true,
        token:token
    })
    } catch (error) {
        return res.status(501).json({
            success:false,
            message:"Error in Stream Token Generation!"
        })
    }
}