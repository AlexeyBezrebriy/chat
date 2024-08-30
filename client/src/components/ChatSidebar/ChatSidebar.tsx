import { ChatList } from "../ChatList/ChatList"
import { SearchBar } from "../SearchBar/SearchBar"
import "./ChatSidebar.css"

export const ChatSidebar = () => {
  return (
    <div className="chat__sidebar">
      <div className="chat__sidebar_header">
        <img className="chat__avatar" src="./img/user.png" alt="User Avatar" />
        <button className="chat__login-button">Log in</button>
      </div>
      <div className="chat__search">
        <SearchBar />
      </div>
      <label className="chat__sidebar-label">Chats</label>
      <ChatList />
    </div>
  )
}
