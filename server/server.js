import cookieParser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import { connectToMongoDB } from "./src/db/connectToMongoDB.js"
import { authRoutes } from "./src/routes/auth.routes.js"
import { messageRoutes } from "./src/routes/message.routes.js"
import { usersRoutes } from "./src/routes/user.routes.js"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())

app.use(cookieParser())

app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true }))

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", usersRoutes)

app.listen(PORT, () => {
  connectToMongoDB()
})
