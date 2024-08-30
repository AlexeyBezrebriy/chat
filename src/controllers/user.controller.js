import { Chat } from "../models/chat.model.js"
import { Message } from "../models/message.model.js"
import { User } from "../models/user.model.js"

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id

    const users = await User.find({
      _id: { $ne: loggedInUserId },
      guest: { $ne: true },
    })

    const usersWithLastMessage = await Promise.all(
      users.map(async (user) => {
        const chat = await Chat.findOne({
          participants: { $all: [loggedInUserId, user._id] },
        }).populate({
          path: "messages",
          options: { sort: { createdAt: -1 }, limit: 1 },
          select: "message createdAt",
        })

        const lastMessage = chat?.messages[0] || null

        return {
          ...user.toObject(),
          lastMessage: lastMessage
            ? {
                text: lastMessage.message,
                createdAt: lastMessage.createdAt,
              }
            : null,
        }
      })
    )

    res.status(200).json(usersWithLastMessage)
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const getAndFilterUsersForSidebar = async (req, res) => {
  try {
    const { fullName } = req.body
    const senderId = req.user._id

    const filteredUsers = await User.find({
      _id: { $ne: senderId },
      guest: { $ne: true },
      fullName: { $regex: new RegExp(fullName, "i") }, // Case-insensitive search
    })

    res.status(200).json(filteredUsers)
  } catch (error) {
    console.error("Error in getAndFilterUsersForSidebar: ", error.message)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const patchUser = async (req, res) => {
  try {
    const { firstName, lastName } = req.body
    const { id } = req.params

    const updatedUser = await User.findOneAndUpdate(
      { _id: id },
      { fullName: `${firstName} ${lastName}`, firstName, lastName },
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" })
    }

    res.status(200).json(updatedUser)
  } catch (error) {
    console.error("Error in patchUser:", error.message)
    res.status(500).json({ error: "Internal server error" })
  }
}

export const deleteUserAndAssociations = async (req, res) => {
  try {
    const { id } = req.params

    const chats = await Chat.find({
      participants: { $in: [id] },
    })

    const chatIds = chats.map((chat) => chat._id)

    await Message.deleteMany({
      $or: [{ senderId: id }, { receiverId: id }],
    })

    await Chat.deleteMany({
      _id: { $in: chatIds },
    })

    const deletedUser = await User.findByIdAndDelete(id)

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" })
    }

    res.status(200).json({ message: "User and all associated data deleted successfully" })
  } catch (error) {
    console.error("Error in deleteUserAndAssociations:", error.message)
    res.status(500).json({ error: "Internal server error" })
  }
}
