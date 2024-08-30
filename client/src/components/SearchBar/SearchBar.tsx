import axios from "axios"
import { FormEvent, useRef, useState } from "react"
import { filterChatsApi } from "../../api/filterChats"
import { useChatStore } from "../../store/chatStore"
import { Modal } from "../Modal/Modal"
import "./SearchBar.css"

export const SearchBar = () => {
  const { setChats, setChatLoading } = useChatStore()
  const [active, setActive] = useState(false)
  const [search, setSearch] = useState("")

  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)

  const handleChange = async (value: string) => {
    setSearch(value)
    const data = await filterChatsApi(value)

    setChats(data)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const firstName = firstNameRef.current?.value
    const lastName = lastNameRef.current?.value

    if (firstName && lastName) {
      try {
        setChatLoading(true)
        const { data } = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/auth/signup-bot`,
          {
            firstName,
            lastName,
          },
          {
            withCredentials: true,
          }
        )

        if (data.error) throw new Error(data.error)

        setChats((prevChats) => [...prevChats, data])

        setActive(false)
      } catch (error) {
        console.error("Error updating name:", error)
        alert("An error occurred while creating the chat")
      } finally {
        setChatLoading(false)
      }
    } else {
      alert("Invalid name or surname")
    }
  }

  return (
    <div className="search-bar-container">
      <div className="input-wrapper">
        <img src="./img/search.png" alt="search icon" />
        <input
          type="text"
          placeholder="Search or start new chat"
          value={search}
          onChange={(e) => handleChange(e.target.value)}
        />
        <button onClick={() => setActive(true)}>
          <img src="./img/plus.png" alt="" />
        </button>
      </div>
      <Modal active={active} setActive={setActive}>
        <label>Change chat name</label>
        <form onSubmit={handleSubmit}>
          <input ref={firstNameRef} type="text" placeholder="first name" />
          <input ref={lastNameRef} type="text" placeholder="last name" />
          <button type="submit">Save</button>
        </form>
      </Modal>
    </div>
  )
}
