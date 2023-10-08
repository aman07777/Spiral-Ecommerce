import { create } from "zustand";
import { axios_auth } from "../../../../global/config";

export const useAffiliatorStore = create((set) => ({
  addAffiliator: async (data) => {
    try {
      const res = await axios_auth.post("/affiliates", data);
      return res;
    } catch (error) {
      return error;
    }
  },
}));
