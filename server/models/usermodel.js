import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    bio:{
        type:String,
        default:""
    },
    nativelanguage:{
        type:String,
        default:""
    },
    learninglanguage:{
        type:String,
        default:""
    },
    location:{
        type:String,
        default:""
    },
    profilepic:{
        type:String,
    },
    isOnboarded:{
        type:Boolean,
        default:false
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},{timestamps:true})

export const User=mongoose.model("User",userSchema);