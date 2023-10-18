import { create } from "zustand";
import { axios_auth } from "../../../../global/config";

export const useAddCustomerStore = create((set) => ({
  addCustomer: async (data) => {
    try {
      const res = axios_auth.post("users/", data);
      return res.data;
    } catch (error) {
      return error;
    }
  },
}));
