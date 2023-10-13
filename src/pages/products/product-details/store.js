import { create } from "zustand";
import { axios_auth } from "../../../global/config";

export const useOrderStore = create((set, get) => ({
  makeOrder: async (data) => {
    try {
      const res = await axios_auth.post("orders", data);
      return res.data.status === "success" ? true : false;
    } catch (error) {
      return error;
    }
  },
  getPromoCodes: async () => {
    try {
      const res = await axios_auth.get("promo-code");
      if (res.data.status === "success") {
        return res.data.promoCodes;
      }
    } catch (error) {
      return error;
    }
  },
}));
