import { create } from "zustand";
import { axios_auth } from "../../../global/config";

export const useAffiliatorStore = create((set) => ({
  affiliator: [],
  setAffiliator: (affiliator) => set({ affiliator }),
  getAffiliators: async () => {
    try {
      const res = await axios_auth.get("affiliates");
      if (res.data.status === "success") {
        set({ affiliator: res.data.data });
        return res.data.data;
      }
      return [];
    } catch (error) {
      return error;
    }
  },
  activatePromoCode: async (id) => {
    try {
      const res = await axios_auth.get(`promo-code/active/${id}`);
      if (res.data.status === "success") {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },
}));
