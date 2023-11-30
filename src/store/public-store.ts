import { UserWithProfileType } from "@/types/user";
import { create } from "zustand";

type PublicState = {
  userWithProfile: UserWithProfileType | null;
  setUserWithProfile: (userWithProfile: UserWithProfileType) => void;
  removeUserWithProfile: () => void;
};

const usePublicStore = create<PublicState>()((set) => ({
  userWithProfile: null,
  setUserWithProfile: (userWithProfile) =>
    set((state) => ({ ...state, userWithProfile })),
  removeUserWithProfile: () =>
    set((state) => ({ ...state, userWithProfile: null })),
}));

export default usePublicStore;
