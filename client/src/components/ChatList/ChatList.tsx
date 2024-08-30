import { useGetChats } from "../../hooks/useGetChats"
import { useUserStore } from "../../store/userStore"
import { chatConvertTime } from "../../utils/convertTime"
import { ChatItem } from "../ChatItem/ChatItem"
import "./ChatList.css"

export const ChatList = () => {
  const { isLoading } = useUserStore()

  const { chatLoading, chats } = useGetChats()

  const validateChats = () => {
    if (isLoading || chatLoading) {
      return (
        <span className="no-chats">
          <img src="./img/loading.gif" alt="Loading..." />
        </span>
      )
    }

    if (chats?.length === 0) {
      return <span className="no-chats">No chats</span>
    }
  }

  return (
    <>
      {validateChats()}
      <ul className="chat__list">
        {chats?.map((chat) => {
          const createdAt = chat.lastMessage?.createdAt
          const formattedDate = createdAt ? chatConvertTime(createdAt) : " "

          return (
            <ChatItem
              key={chat._id}
              chat={chat}
              avatar={chat.profileLogo ? chat.profileLogo : "./img/user.png"}
              fullName={chat.fullName}
              date={formattedDate}
              message={`${chat.lastMessage?.text ? chat.lastMessage.text : " "}`}
              isActive={false}
            />
          )
        })}
      </ul>
    </>
  )
}
