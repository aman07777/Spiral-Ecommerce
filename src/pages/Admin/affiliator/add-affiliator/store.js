import { create } from "zustand";
import { axios_auth } from "../../../../global/config";

export const useAffiliatorStore = create((set) => ({
  addAffiliator: async (data) => {
    try {
      const res = await axios_auth.post("/affiliator", data);
      console.log("🚀 ~ file: store.js:8 ~ addAffiliator: ~ res:", res);
      return true;
    } catch (error) {
      return false;
    }
  },
}));
