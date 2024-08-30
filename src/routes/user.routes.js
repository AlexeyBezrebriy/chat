import express from "express"
import {
  deleteUserAndAssociations,
  getAndFilterUsersForSidebar,
  getUsersForSidebar,
  patchUser,
} from "../controllers/user.controller.js"
import { protectRoute } from "../middleware/protectRoute.js"

export const usersRoutes = express.Router()

usersRoutes.get("/", protectRoute, getUsersForSidebar)
usersRoutes.post("/filter", protectRoute, getAndFilterUsersForSidebar)
usersRoutes.patch("/user-update/:id", protectRoute, patchUser)
usersRoutes.delete("/:id", protectRoute, deleteUserAndAssociations)
