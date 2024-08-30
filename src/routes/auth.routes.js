import express from "express"
import { botSignup, guestSignup, login, logout, signup } from "../controllers/auth.controller.js"

export const authRoutes = express.Router()

authRoutes.post("/signup", signup)

authRoutes.post("/signup-bot", botSignup)

authRoutes.post("/signup-guest", guestSignup)

authRoutes.post("/login", login)

authRoutes.post("/logout", logout)
