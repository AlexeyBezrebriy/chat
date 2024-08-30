import { FC, useEffect, useRef } from "react"
import { useGetMessages } from "../../hooks/useGetMessages"
import { useChatStore } from "../../store/chatStore"
import { useUserStore } from "../../store/userStore"
import { messageConvertTime } from "../../utils/convertTime"
import { ChatHeader } from "../ChatHeader/ChatHeader"
import { ChatInput } from "../ChatInput/ChatInput"
import { ChatMessage } from "../ChatMessage/ChatMessage"
import "./ChatMain.css"

export const ChatMain: FC = () => {
  const endRef = useRef<HTMLDivElement | null>(null)

  const { loading, messages } = useGetMessages()
  const { selectedChat } = useChatStore()

  const { user } = useUserStore()

  useEffect(() => {
    setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" })
    }, 100)
  }, [messages])

  return (
    <>
      {!selectedChat ? (
        <div className="no-chat-selected">No chat selected</div>
      ) : (
        <div className="chat__main">
          <ChatHeader chat={selectedChat} />
          <ul className="chat__message">
            {!loading &&
              messages.length > 0 &&
              messages.map((message) => (
                <ChatMessage
                  key={message._id}
                  content={message.message}
                  time={messageConvertTime(message.updatedAt)}
                  type={`${message.senderId === user._id ? "sent" : "received"}`}
                />
              ))}
            <div ref={endRef} />
          </ul>
          <ChatInput />
        </div>
      )}
    </>
  )
}
