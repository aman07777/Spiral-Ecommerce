import { create } from "zustand";
import { axios_auth } from "../../../global/config";

export const useCustomerStore = create((set) => ({
  customers: [],
  getCustomers: async () => {
    try {
      const res = await axios_auth.get("users/");
      if (
        res.data.status === "success" &&
        Array.isArray(res.data.data) &&
        res.data.data.length > 0
      ) {
        // set({ customers: res.data.data });
        return res.data.data;
      }
      return false;
    } catch (error) {
      return false;
    }
  },
  setCustomers: (data) => {
    set({ customers: data });
  },
}));
