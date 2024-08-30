import axios from "axios"
import { useEffect, useState } from "react"
import { useChatStore } from "../store/chatStore"

export const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedChat } = useChatStore()

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true)
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/messages/${selectedChat?._id}`,
          { withCredentials: true }
        )
        if (data.error) throw new Error(data.error)
        setMessages(data)
      } catch (error) {
        console.error((error as Error).message)
      } finally {
        setLoading(false)
      }
    }

    if (selectedChat?._id) getMessages()
  }, [selectedChat?._id, setMessages])

  return { messages, loading }
}
