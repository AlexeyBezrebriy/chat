import axios from "axios"
import { useChatStore } from "../store/chatStore"
import { IMessage } from "../types/chat"

export const useSendMessageResponse = () => {
  const { selectedChat } = useChatStore()

  const sendMessageResponse = async (): Promise<IMessage | undefined> => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/messages/send-response/${selectedChat?._id}`,
        {},
        { withCredentials: true }
      )
      if (data.error) throw new Error(data.error)

      return data as IMessage
    } catch (error) {
      console.error((error as Error).message)
    }
  }

  return { sendMessageResponse }
}
