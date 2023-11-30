import { ProfileType, UserType } from "@/lib/validations/auth";
import { create } from "zustand";

interface UserState {
  user: UserType | null;
  setUser: (user: UserType) => void;
  removeUser: () => void;
  profile: ProfileType | null;
  setProfile: (profile: ProfileType) => void;
}

const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => set((state) => ({ ...state, user })),
  removeUser: () => set((state) => ({ ...state, user: null })),
  profile: null,
  setProfile: (profile) => set((state) => ({ ...state, profile })),
}));

export default useUserStore;

// WITH LOCALSTORAGE PERSITANCE

// import { UserType } from "@/lib/validations/auth";
// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// interface UserState {
//   user: UserType | null;
//   setUser: (user: UserType) => void;
//   removeUser: () => void;
// }

// // Create your Zustand store with the persist middleware
// const useUserStore = create(
//   persist<UserState>(
//     (set) => ({
//       user: null,
//       setUser: (user) => set((state) => ({ ...state, user })),
//       removeUser: () => set((state) => ({ ...state, user: null })),
//     }),
//     {
//       name: "user-store",
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// );

// export default useUserStore;
