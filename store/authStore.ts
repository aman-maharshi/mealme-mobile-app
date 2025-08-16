import { User } from "@/type"
import { create } from "zustand"

interface AuthState {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  setUser: (user: User) => void
  setLoading: (isLoading: boolean) => void
  signIn: () => void
  signOut: () => void
  fetchAuthUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  setUser: (user: User) => set({ user }),
  setLoading: (isLoading: boolean) => set({ isLoading }),
  signIn: () => set({ isAuthenticated: true }),
  signOut: () => set({ isAuthenticated: false }),
  fetchAuthUser: async () => {
    set({ isLoading: true })
    try {
    } catch (error) {
      console.log(error)
      set({ isAuthenticated: false, user: null })
    } finally {
      set({ isLoading: false })
    }
  }
}))
