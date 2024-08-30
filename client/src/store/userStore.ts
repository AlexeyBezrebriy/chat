import { create } from "zustand"
import { IUser } from "../types/user"

interface IUserState {
  user: IUser
  isLoading: boolean
  setUser: (user: IUser) => void
}

export const useUserStore = create<IUserState>((set) => ({
  user: {} as IUser,
  isLoading: true,
  setUser: (user) => set({ user, isLoading: false }),
}))
