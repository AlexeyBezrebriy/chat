import axios from "axios"
import { useEffect } from "react"
import { useUserStore } from "../store/userStore"

export const useSignUpGuest = () => {
  const { setUser } = useUserStore()

  useEffect(() => {
    const user = localStorage.getItem("chat-user")
    if (!user) {
      signUpGuest()
    } else {
      setUser(JSON.parse(user))
    }
  }, [])

  const signUpGuest = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/auth/signup-guest`,
        {},
        { withCredentials: true }
      )

      if (data.error) {
        throw new Error(data.error)
      }

      setUser(data)

      localStorage.setItem("chat-user", JSON.stringify(data))
    } catch (error) {
      console.log((error as Error).message)
    }
  }
}
