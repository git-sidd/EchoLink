import { StreamChat } from "stream-chat";
import "dotenv/config"

const streamkey=process.env.STREAM_API_KEY
const streamsecret=process.env.STREAM_API_SECRET

if(!streamkey || !streamsecret){
    console.error("StreamAPI key or secret missing!")
}

const streamClient=StreamChat.getInstance(streamkey,streamsecret);

export const upsertStreamUser=async(userData)=>{
    try {
        await streamClient.upsertUser(userData);
        return userData;
    } catch (error) {
        console.error("Error creating Stream User!")
    }
}

export const generateStreamToken=(userId)=>{
    try {
        const userIdStr=userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.error("Error in generating Stream Token");
    }
}