import { create } from "zustand";
import { axios_auth } from "../../../../global/config";

export const useAddCustomerStore = create((set) => ({
  addCustomer: async (data) => {
    try {
      const res = axios_auth.post("users/", data);
      console.log("🚀 ~ file: store.js:9 ~ addCustomer: ~ res.data:", res.data);
      return res.data;
    } catch (error) {
      return error;
    }
  },
}));
