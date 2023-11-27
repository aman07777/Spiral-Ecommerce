import { create } from "zustand";
import { axios_auth } from "../../../global/config";

export const useAdminOrderStore = create((set) => ({
  orders: [],
  getOrders: async () => {
    try {
      const res = await axios_auth.get("orders/all");
      if (res.data.status === "success") {
        set({ orders: res.data.orders });
        return res.data.orders;
      }
    } catch (error) {
      return error;
    }
  },
  setOrders: (orders) => set({ orders }),
  getOrderById: async (id) => {
    try {
      const res = await axios_auth.get(`orders/${id}`);
      if (res.data.status === "success") {
        return res.data.order;
      }
    } catch (error) {
      return error;
    }
  },
  getPromoCodes: async () => {
    try {
      const res = await axios_auth.get("promo-code");
      if (res.data.status === "success") {
        return res.data.promoCodes;
      }
    } catch (error) {
      return error;
    }
  },
  recentOrders: [],
  getRecentOrders: async () => {
    try {
      const res = await axios_auth.get("orders/recent");
      if (res.data.status === "success") {
        set({ recentOrders: res.data.orders });
        return res.data.orders;
      }
      return [];
    } catch (error) {
      return error;
    }
  },
  getRecentMonthOrders: async () => {
    try {
      const res = await axios_auth.get("orders/recent-30");
      if (res.data.status === "success") {
        return res.data.orders;
      }
      return 0;
    } catch (error) {
      return 0;
    }
  },
  getRevenue: async () => {
    try {
      const res = await axios_auth.get("orders/revenue");
      if (res.data.status === "success") {
        return res.data.total;
      }
      return 0;
    } catch (error) {
      return 0;
    }
  },
  getSales: async () => {
    try {
      const res = await axios_auth.get("orders/sales");
      if (res.data.status === "success") {
        return res.data.sales;
      }
      return [];
    } catch (_) {
      return [];
    }
  },
  deleteOrder: async (id) => {
    try {
      const res = await axios_auth.delete(`orders/${id}`);
      console.log("🚀 ~ file: store.js:88 ~ deleteOrder: ~ res:", res);
      if (res.data.status === "success") {
        return true;
      }
      return false;
    } catch (error) {
      console.log("🚀 ~ file: store.js:93 ~ deleteOrder: ~ error:", error);
      return false;
    }
  },
}));
