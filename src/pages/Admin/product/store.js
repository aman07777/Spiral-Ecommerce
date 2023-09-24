import { create } from "zustand";
import { axios_auth } from "../../../global/config";

export const useAdminProductStore = create((set) => ({
  products: [],
  getProducts: async () => {
    try {
      const res = await axios_auth.get("products");
      if (res.data.status === "success") return res.data.products;
      else return [];
    } catch (error) {
      return error;
    }
  },
  setProducts: (products) => set({ products }),
}));
