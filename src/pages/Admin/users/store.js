import { create } from "zustand";
import { axios_auth } from "../../../global/config";

export const useCustomerStore = create((set) => ({
  customers: [],
  getCustomers: async () => {
    try {
      const res = await axios_auth.get("users/");
      if (res.data.status === "success") {
        set({ customers: res.data.data });
        return res.data.data;
      }
      return [];
    } catch (error) {
      return error;
    }
  },
  deleteUser: async (id) => {
    try {
      const res = await axios_auth.delete(`users/${id}`);
      return res.data.status === "success" ? true : false;
    } catch (error) {
      return error;
    }
  },
  verifyUser: async (id) => {
    try {
      const res = await axios_auth.patch(`users/verify/${id}`);
      return res.data.status === "success" ? true : false;
    } catch (error) {
      return error;
    }
  },
}));
