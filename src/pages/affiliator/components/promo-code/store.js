import { create } from "zustand";
import { axios_auth } from "../../../../global/config";

export const usePromoCodeStore = create((set) => ({
  promoCodes: [],
  getPromoCode: async () => {
    try {
      const res = await axios_auth.get("promo-code");
      if (res.data.status === "success") {
        set({ promoCodes: res.data.promoCodes });
        return res.data.promoCodes;
      }
      return [];
    } catch (error) {
      return error;
    }
  },
  addPromoCode: async (data) => {
    try {
      const res = await axios_auth.post("promo-code", data);
      return res;
    } catch (error) {
      return error;
    }
  },
}));
