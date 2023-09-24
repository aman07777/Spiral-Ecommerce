import { create } from "zustand";
import { axios_auth } from "../../../global/config";

export const useCustomerStore = create((set) => ({
  customers: [],
  getCustomers: async () => {
    try {
      const res = await axios_auth.get("users/");
      if (res.data.status === "success") {
        return res.data.data;
      }
      return [];
    } catch (error) {
      return error;
    }
  },
  setCustomers: (data) => {
    set({ customers: data });
  },
}));
