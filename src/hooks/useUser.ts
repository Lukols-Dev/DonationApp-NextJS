import { create } from "zustand";

interface User {
  //   photo?: string;
  //   name?: string;
  //   surname?: string;
  pid?: string;
}

interface UserStore {
  userData: User;
  setUserData: (userData: User) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userData: {},
  setUserData: (userData) => set({ userData }),
}));
