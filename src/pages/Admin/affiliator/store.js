import { create } from "zustand";
import { axios_no_auth } from "../../../global/config";

export const useAffiliatorStore = create((set) => ({
  affiliator: [],
  setAffiliator: (affiliator) => set({ affiliator }),
  getAffiliators: async () => {
    try {
      const res = await axios_no_auth.get("users");
      return res.data.status === "success" ? res.data.data : [];
    } catch (error) {
      return error;
    }
  },
}));
