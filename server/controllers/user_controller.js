import { FriendRequest } from "../models/friend_request_model.js";
import { User } from "../models/usermodel.js";


export const getRecommendedUser=async(req,res)=>{
    try {
        const currentuserid=req.user.id;
        const currentuser=req.user;
        const recommendedUser=await User.find({
            $and:[
                {_id:{$ne:currentuserid}},//except current user
                {_id:{$nin:currentuser.friends}},//except current user friend
                {isOnboarded:true},
            ]
        })
        res.status(201).json({
            recommendedUser
        })

    } catch (error) {
        console.error("Recommended User Error:",error)
        res.status(501).json({
            success:false,
            message:"Internal Server Error",   
        })
    }
}

export const getMyFriends=async(req,res)=>{
    try {
        const user=await User.findById(req.user.id)
        .select("friends")
        .populate("friends","fullname nativelanguage learninglanguage profilepic");

        res.status(201).json({
            success:true,
            message:"Feteched All Friends",
            friends:user.friends
        })

    } catch (error) {
        console.error("Get Friends Error-",error)
        res.status(501).json({
            success:true,
            message:"Error in Fetching Friends",
        })
    }
}
export const sendFriendRequest=async(req,res)=>{
    try {
        const myId=req.user.id;
        const {id:receiverId}=req.params;
        //check if you are sending request to yourself
        if(myId==receiverId){
            return res.status(401).json({
                success:false,
                message:"You can Request to yourself!"
            })
        }
        //check whether the reciever actually exists
        const receiver=await User.findById(receiverId);
        if(!receiver){
            return res.status(401).json({
                success:false,
                message:"Reciever doesnt exist!"
            })
        }
        //check if the reciever is already a friend
        if(receiver.friends.includes(myId)){
            return res.status(401).json({
                success:false,
                message:"Already a friend of this person!"
            })
        }
        //check if already request is send or not:
        const existingRequest=await FriendRequest.findOne({
            $or:[
                {sender:myId,receiver:receiverId},
                {sender:receiverId,receiver:myId}
            ]
        })
        if(existingRequest){
            return res.status(401).json({
                success:false,
                message:"A friend Request Already Exist between you and this user!"
            })
        }
        const friendRequest=await FriendRequest.create({
            sender:myId,
            receiver:receiverId
        })
        return res.status(201).json({
            success:true,
            message:"Request Sent Successfully!"
        })


    } catch (error) {
        console.error("Error in Sending Request",error)
        return res.status(502).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

export const acceptFriendRequest=async(req,res)=>{
    try {
        const {id:requestId}=req.params;
        const friendRequest=await FriendRequest.findById(requestId);
        if(!friendRequest){
            return res.status(401).json({
                success:false,
                message:"Friend Request Not Found"
            })
        }
        if(friendRequest.receiver.toString()!==req.user.id){
            return res.status(401).json({
                success:false,
                message:"You are not authorized to accept this request!!"
            })
        }
        friendRequest.status="accepted";
        await friendRequest.save();

        //add each user to others friend arrays

        await User.findByIdAndUpdate(friendRequest.sender,{
            $addToSet:{friends:friendRequest.receiver}
        })
        await User.findByIdAndUpdate(friendRequest.receiver,{
            $addToSet:{friends:friendRequest.sender}
        })
        res.status(201).json({
            success:true,
            message:"Friend Request accepted"
        })
    } catch (error) {
        res.status(501).json({
            success:false,
            message:"Error in Accepting Friend Request"
        })
    }
}
export const getFriendRequests=async(req,res)=>{
    try {
        const incomingReqs=await FriendRequest.find({
            status:"pending",
            receiver:req.user.id
        }).populate("sender","fullname,nativelanguage,learninglanguage profilepic")

        const acceptedReqs=await FriendRequest.find({
            status:"accepted",
            sender:req.user.id
        })
        res.status(201).json({
            incomingReqs,
            acceptedReqs
        })
         
    } catch (error) {
        res.status(501).json({
            success:false,
            message:"Error in fetching Friend Request!!"
        })
    }
}
export const getOutgoingFriendRequest=async(req,res)=>{
    try {
        const outgoingReqs=await FriendRequest.find({
            status:"pending",
            sender:req.user.id
        }).populate("receiver","fullname nativelanguage profilepic learninglanguage")
        res.status(201).json({
            outgoingReqs
        })

    } catch (error) {
        console.error("Error in Get Outgoing Friend Request",error)
        return res.status(501).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}