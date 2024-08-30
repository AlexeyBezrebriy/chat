import { FC, FormEvent, useState } from "react"
import { useSendMessage } from "../../hooks/useSendMessage"
import { useSendMessageResponse } from "../../hooks/useSendMessageResponse"
import { useChatStore } from "../../store/chatStore"
import { IChat, IMessage } from "../../types/chat"
import { Toast } from "../Toast/Toast"
import "./ChatInput.css"

export const ChatInput: FC = () => {
  const [message, setMessage] = useState("")
  const { loading, sendMessage } = useSendMessage()
  const { setShowToast, showToast, setMessages, setChats, chats, selectedChat } = useChatStore()
  const { sendMessageResponse } = useSendMessageResponse()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message) return

    await sendMessage(message)

    setMessage("")

    const botResponse = await sendMessageResponse()
    setMessages((prevMessages) => [...prevMessages, botResponse as IMessage])

    const currentChat = {
      ...selectedChat,
      lastMessage: {
        text: botResponse?.message || "",
        createdAt: botResponse?.updatedAt || "",
      },
    } as IChat

    setChats((prevChats) =>
      prevChats.map((chat) => (chat._id === currentChat._id ? currentChat : chat))
    )

    setShowToast(true)
  }

  return (
    <>
      <form className="chat__input" onSubmit={handleSubmit}>
        <div className="chat__input-container">
          <div className="chat__input-wrapper">
            <input
              className="chat__input_field"
              type="text"
              placeholder="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button type="submit" disabled={loading} className="chat__input_send">
              <img src={`${loading ? "./img/loading.gif" : "./img/message.png"}`} alt="" />
            </button>
          </div>
        </div>
      </form>
      <Toast message="New message received!" show={showToast} onClose={() => setShowToast(false)} />
    </>
  )
}
