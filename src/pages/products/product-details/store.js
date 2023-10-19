import { create } from "zustand";
import { axios_auth, axios_file_with_auth } from "../../../global/config";

export const useOrderStore = create((_) => ({
  makeOrder: async (data) => {
    try {
      const res = await axios_file_with_auth.post("orders", data);
      return res.data.status === "success" ? true : false;
    } catch (error) {
      return false;
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
