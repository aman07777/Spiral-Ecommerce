import { create } from "zustand";
import { axios_auth } from "../../../global/config";

export const customerProfileStore = create((set) => ({
  customerDetails: {},
  getCustomerDetails: async () => {
    try {
      const response = await axios_auth.get("users/me");
      if (response.data.status === "success") {
        console.log(response)
        set({ customerDetails: response.data.user });
        return response.data.user;
      }
      return [];
    } catch (error) {
      return error;
    }
  },
  editCustomerDetails: async (data, id) => {
    try {
      const response = await axios_auth.put(`users/${id}`, data);
      if (response.data.status === "success") {
        return response.data.data;
      }
      return [];
    } catch (error) {
      return error;
    }
  },
}));
