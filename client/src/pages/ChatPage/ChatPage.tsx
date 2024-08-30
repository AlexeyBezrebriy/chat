import { ChatMain } from "../../components/ChatMain/ChatMain"
import { ChatSidebar } from "../../components/ChatSidebar/ChatSidebar"
import { useSignUpGuest } from "../../hooks/useSignUpGuest"
import "./ChatPage.css"

export const ChatPage = () => {
  useSignUpGuest()
  return (
    <div className="chat">
      <ChatSidebar />
      <ChatMain />
    </div>
  )
}
