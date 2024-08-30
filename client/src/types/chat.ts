export interface IChat {
  _id: string
  fullName: string
  firstName: string
  lastName: string
  mail: string
  profileLogo: string
  bot: boolean
  guest: boolean
  updatedAt: string
  lastMessage?: {
    text: string
    createdAt: string
  }
}
export interface IMessage {
  _id: string
  senderId: string
  receiverId: string
  message: string
  updatedAt: string
}
