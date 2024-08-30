import { FC } from "react"
import "./ChatMessage.css"

interface ChatMessageProps {
  content: string
  time: string
  type: "sent" | "received"
}

export const ChatMessage: FC<ChatMessageProps> = ({ content, time, type }) => {
  return (
    <li className={`chat__message_content chat__message_content--${type}`}>
      <span className="chat__message_text">{content}</span>
      <span className="chat__message_time">{time}</span>
    </li>
  )
}
