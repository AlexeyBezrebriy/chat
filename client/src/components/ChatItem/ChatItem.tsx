import { FC } from "react"
import { useChatStore } from "../../store/chatStore"
import { IChat } from "../../types/chat"
import "./ChatItem.css"

interface ChatItemProps {
  avatar: string
  chat: IChat
  fullName: string
  date: string
  message: string
  isActive?: boolean
}

export const ChatItem: FC<ChatItemProps> = ({
  chat,
  avatar,
  fullName,
  date,
  message,
  isActive = false,
}) => {
  const { selectedChat, setSelectedChat } = useChatStore()
  const isSelected = selectedChat?._id === chat._id
  return (
    <li className={`person ${isSelected ? "active" : ""}`} onClick={() => setSelectedChat(chat)}>
      <img className="img" src={avatar} alt={`${fullName}'s Avatar`} />
      <span className="name">{fullName}</span>
      <span className="time">{date}</span>
      <span className="preview">{message}</span>
    </li>
  )
}
