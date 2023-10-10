import { create } from "zustand";
import { axios_auth } from "../../../global/config";

export const customerProfileStore = create((set) => ({
  customerDetails: {},
  getCustomerDetails: async () => {
    try {
      const response = await axios_auth.get("users/my-details");
      if (response.data.status === "success") {
        set({ customerDetails: response.data.data });
        return response.data.data;
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
