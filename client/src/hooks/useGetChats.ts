import axios from "axios"
import { useEffect } from "react"
import { useChatStore } from "../store/chatStore"

export const useGetChats = () => {
  const { chats, setChats, chatLoading, setChatLoading } = useChatStore()

  useEffect(() => {
    getChats()
  }, [])

  const getChats = async () => {
    setChatLoading(true)
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`, {
        withCredentials: true,
      })
      if (data.error) {
        throw new Error(data.error)
      }
      setChats(data)
    } catch (error) {
      console.log((error as Error).message)
    } finally {
      setChatLoading(false)
    }
  }

  return { chatLoading, chats }
}
