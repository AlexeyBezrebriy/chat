import axios from "axios"

export const filterChatsApi = async (fullName: string) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/users/filter`,
      {
        fullName: fullName,
      },
      {
        withCredentials: true,
      }
    )
    if (data.error) {
      throw new Error(data.error)
    }

    return data
  } catch (error) {
    console.log((error as Error).message)
  }
}
