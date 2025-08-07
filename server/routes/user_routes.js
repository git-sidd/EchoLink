import express from "express"
import { protectedRoute } from "../middleware/auth_middleware.js"
import { sendFriendRequest, getRecommendedUser, acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendRequest } from "../controllers/user_controller.js"

const router=express.Router()

router.use(protectedRoute)
router.get("/",getRecommendedUser)
router.get("/myfriends",getMyFriends)
router.post("/friend-request/:id",sendFriendRequest)
router.put("/friend-request/:id/accept",acceptFriendRequest)
router.get("/get-friend-request",getFriendRequests)
router.get("/get-outgoing-friend-request",getOutgoingFriendRequest)

export default router;