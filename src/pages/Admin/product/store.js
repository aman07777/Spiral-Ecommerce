import { create } from "zustand";
import { axios_auth } from "../../../global/config";

export const useAdminProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  getProducts: async () => {
    try {
      const res = await axios_auth.get("products/all");
      if (res.data.status === "success") return res.data.products;
      else return [];
    } catch (error) {
      return error;
    }
  },
  deleteProduct: async (id) => {
    console.log("🚀 ~ file: store.js:17 ~ deleteProduct: ~ id:", id);
    try {
      const res = await axios_auth.delete(`products/${id}`);
      console.log("🚀 ~ file: store.js:20 ~ deleteProducts: ~ res:", res);
      return res.data.status === "success" ? true : false;
    } catch (error) {
      return error;
    }
  },
}));
