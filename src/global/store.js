import { create } from "zustand";
import { axios_auth } from "./config";

export const useGlobalStore = create((set) => ({
  user: null,
  checkAuth: async () => {
    try {
      const res = await axios_auth.get("user/check-auth");
      return res.data.isAuth ? true : false;
    } catch (error) {
      return false;
    }
  },
  setUser: (user) => set(() => ({ user })),
}));
