import axios from "axios"
import { FormEvent, useRef, useState } from "react"
import { deleteChatApi } from "../../api/deleteChat"
import { useChatStore } from "../../store/chatStore"
import { IChat } from "../../types/chat"
import { Modal } from "../Modal/Modal"
import "./ChatHeader.css"

export const ChatHeader = ({ chat }: { chat: IChat }) => {
  const [active, setActive] = useState(false)
  const { selectedChat, setChats, chats, setSelectedChat } = useChatStore()

  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const firstName = firstNameRef.current?.value
    const lastName = lastNameRef.current?.value

    if (firstName && lastName) {
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_SERVER_URL}/users/user-update/${selectedChat?._id}`,
          {
            firstName,
            lastName,
          },
          {
            withCredentials: true,
          }
        )

        if (response.status === 200) {
          alert("Name updated successfully")

          let updatedChat = {
            ...chat,
            fullName: `${firstName} ${lastName}`,
            firstName,
            lastName,
          }
          chat.fullName = `${firstName} ${lastName}`
          chat.firstName = firstName
          chat.lastName = lastName

          if (chats)
            setChats(chats.map((chat) => (chat._id === selectedChat?._id ? updatedChat : chat)))

          setActive(false)
        } else {
          alert("Failed to update name")
        }
      } catch (error) {
        console.error("Error updating name:", error)
        alert("An error occurred while updating the name")
      }
    } else {
      alert("Invalid name or surname")
    }
  }

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this chat?")) {
      if (selectedChat?._id) await deleteChatApi(selectedChat._id)

      setSelectedChat(null)
      setChats((prevChats) => prevChats.filter((chat) => chat._id !== selectedChat?._id))
    }
  }

  return (
    <header className="chat__header">
      <div className="chat__header-user">
        <img
          className="chat__header_img"
          src={chat.profileLogo ? chat.profileLogo : "./img/user.png"}
          alt="header-avatar"
        />
        <span>{chat.fullName}</span>
      </div>
      <div className="chat__header-buttons">
        <button onClick={() => setActive(true)}>
          <img src="./img/pencil.png" alt="Edit" />
        </button>
        <button onClick={handleDelete}>
          <img className="trash" src="./img/trash.png" alt="Delete" />
        </button>
      </div>
      <Modal active={active} setActive={setActive}>
        <label>Change chat name</label>
        <form onSubmit={handleSubmit}>
          <input ref={firstNameRef} type="text" placeholder="new first name" />
          <input ref={lastNameRef} type="text" placeholder="new last name" />
          <button type="submit">Save</button>
        </form>
      </Modal>
    </header>
  )
}
