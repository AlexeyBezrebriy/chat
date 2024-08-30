import axios from "axios"
import { Chat } from "../models/chat.model.js"
import { Message } from "../models/message.model.js"
import { User } from "../models/user.model.js"

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body
    const { id: receiverId } = req.params
    const senderId = req.user._id

    let chat = await Chat.findOne({
      participants: {
        $all: [senderId, receiverId],
      },
    })

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receiverId],
      })
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    })

    if (newMessage) {
      chat.messages.push(newMessage._id)
    }

    await Promise.all([chat.save(), newMessage.save()])

    res.status(201).json(newMessage)
  } catch (error) {
    res.status(500).json({ message: "Internal server Error" })
  }
}

export const sendBotResponse = async (req, res) => {
  try {
    const { id: senderId } = req.params
    const receiverId = req.user._id

    const user = await User.findById(senderId)

    if (user && user.bot) {
      const { data } = await axios.get(process.env.QUOTE_API_URL)

      const newBotMessageResponse = new Message({
        senderId,
        receiverId,
        message: data.quote,
      })

      let chat = await Chat.findOne({
        participants: {
          $all: [senderId, receiverId],
        },
      })

      if (!chat) {
        chat = await Chat.create({
          participants: [senderId, receiverId],
        })
      }

      if (newBotMessageResponse) {
        chat.messages.push(newBotMessageResponse._id)
      }

      await Promise.all([chat.save(), newBotMessageResponse.save()])

      res.status(201).json(newBotMessageResponse)
    }
  } catch (error) {
    console.error("Error in sendBotResponse:", error.message)
    res.status(500).json({ message: "Internal server error" })
  }
}

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params
    const senderId = req.user._id

    const chat = await Chat.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages")

    if (!chat) return res.status(200).json([])

    const messages = chat.messages

    res.status(200).json(messages)
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message)
    res.status(500).json({ error: "Internal server error" })
  }
}
