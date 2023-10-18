import { create } from "zustand";
import { axios_auth } from "../../../global/config";

export const orderStore = create((set) => ({
  getMyOrders: async () => {
    try {
      const response = await axios_auth.get("/orders/my-orders");
      if (response.data.status === "success") {
        return response.data.order;
      }
      return [];
    } catch (error) {
      return error;
    }
  },
}));