import express from "express"
import { getMessages, sendBotResponse, sendMessage } from "../controllers/message.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

export const messageRoutes = express.Router()

messageRoutes.get("/:id", protectRoute, getMessages)
messageRoutes.post("/send/:id", protectRoute, sendMessage)
messageRoutes.post("/send-response/:id", protectRoute, sendBotResponse)
