import { create } from "zustand"
import { IChat, IMessage } from "../types/chat"

interface IChatStore {
  showToast: boolean
  setShowToast: (showToast: boolean) => void
  chatLoading: boolean
  setChatLoading: (chatsLoading: boolean) => void
  chats: IChat[] | null
  setChats: (chats: IChat[] | ((prevChats: IChat[]) => IChat[])) => void
  selectedChat: IChat | null
  setSelectedChat: (selectedChat: IChat | null) => void
  messages: IMessage[]
  setMessages: (messages: IMessage[] | ((prevMessages: IMessage[]) => IMessage[])) => void
}

export const useChatStore = create<IChatStore>((set) => ({
  showToast: false,
  setShowToast: (showToast) => set({ showToast }),
  chatLoading: false,
  setChatLoading: (chatLoading) => set({ chatLoading }),
  chats: null,
  setChats: (chatsOrUpdater) =>
    set((state) => ({
      chats:
        typeof chatsOrUpdater === "function"
          ? chatsOrUpdater(state.chats ? state.chats : [])
          : chatsOrUpdater,
    })),
  selectedChat: null,
  setSelectedChat: (selectedChat) => set({ selectedChat }),
  messages: [],
  setMessages: (messagesOrUpdater) =>
    set((state) => ({
      messages:
        typeof messagesOrUpdater === "function"
          ? messagesOrUpdater(state.messages)
          : messagesOrUpdater,
    })),
}))
