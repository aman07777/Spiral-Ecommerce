import { create } from "zustand";
import { axios_auth } from "./config";

export const useGlobalStore = create((set) => ({
  user: null,
  checkAuth: async () => {
    try {
      const res = await axios_auth.get("auth/check-auth");
      if (res.data?.status === "success") {
        set(() => ({ user: res.data?.user }));
        return true;
      }
      return false;
    } catch (error) {}
  },
  setUser: (user) => set(() => ({ user })),
}));
