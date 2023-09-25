import { create } from "zustand";
import { axios_auth } from "../../../global/config";

export const useAdminOrderStore = create((set) => ({
  orders: [],
  getOrders: async () => {
    try {
      const res = await axios_auth.get("orders/all-orders");
      return res.data.orders;
    } catch (error) {
      return error;
    }
  },
  setOrders: (orders) => set({ orders }),
}));
