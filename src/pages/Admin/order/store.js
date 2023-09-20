import { create } from "zustand";
import { axios_auth } from "../../../global/config";

export const useAdminOrderStore = create((set) => ({
  orders: [],
  getOrders: async () => {
    try {
      const res = await axios_auth.get("orders//all-orders");
      console.log("🚀 ~ file: store.js:8 ~ getOrders: ~ res", res);
      if (
        res.data.status === "success" &&
        Array.isArray(res.data.orders) &&
        res.data.orders.length > 0
      ) {
        set({ orders: res.data.orders });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },
}));
