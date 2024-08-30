import axios from "axios"

export const deleteChatApi = async (id: string) => {
  try {
    const { data } = await axios.delete(`${process.env.REACT_APP_SERVER_URL}/users/${id}`, {
      withCredentials: true,
    })
    if (data.error) {
      throw new Error(data.error)
    }

    return data
  } catch (error) {
    console.log((error as Error).message)
  }
}
