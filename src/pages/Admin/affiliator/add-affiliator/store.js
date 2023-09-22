import { create } from "zustand";
import { axios_auth } from "../../../../global/config";

export const useAffiliatorStore = create((set) => ({
  addAffiliator: async (data) => {
    try {
      const res = await axios_auth.post("/affiliator", data);
      return true;
    } catch (error) {
      return false;
    }
  },
}));
