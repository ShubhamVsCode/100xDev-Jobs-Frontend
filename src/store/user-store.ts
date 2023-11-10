import { UserType } from "@/lib/validations/auth";
import { create } from "zustand";

interface UserState {
  user: UserType | null;
  setUser: (user: UserType) => void;
  removeUser: () => void;
}

const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ ...state, user })),
  removeUser: () => set((state) => ({ ...state, user: null })),
}));

export default useUserStore;
