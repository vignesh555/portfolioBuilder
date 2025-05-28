import { create } from 'zustand'
import { IUser } from '../interfaces';

const userGlobalStore = create((set) => ({
  user: null,
  setUser: (user: IUser) => set({ user }),
}))

export default userGlobalStore;

export interface IuserGlobalStore {
    user: IUser | null,
    setUser: (user: IUser) => void
}