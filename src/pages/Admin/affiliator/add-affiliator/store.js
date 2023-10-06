import { create } from "zustand";
import { axios_auth } from "../../../../global/config";

export const useAffiliatorStore = create((set) => ({
  addAffiliator: async (data) => {
    console.log("🚀 ~ file: store.js:6 ~ addAffiliator: ~ data:", data);
    try {
      const res = await axios_auth.post("/affiliates", data);
      console.log("🚀 ~ file: store.js:8 ~ addAffiliator: ~ res:", res);
      return res;
    } catch (error) {
      return error;
    }
  },
}));
