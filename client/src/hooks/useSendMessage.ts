import axios from "axios"
import { useState } from "react"
import { useChatStore } from "../store/chatStore"

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedChat, setChatLoading } = useChatStore()

  const sendMessage = async (message: string) => {
    setLoading(true)
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/messages/send/${selectedChat?._id}`,
        {
          message: message,
        },
        { withCredentials: true }
      )
      if (data.error) throw new Error(data.error)

      setMessages((prevMessages) => [...prevMessages, data])
      console.log("messages-send", messages)
    } catch (error) {
      console.error((error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return { sendMessage, loading }
}
