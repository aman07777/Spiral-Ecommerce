import { create } from "zustand";
import { axios_auth } from "../../../global/config";

export const useAdminProductStore = create((set) => ({
  products: [],
  getProducts: async () => {
    try {
      const res = await axios_auth.get("products");
      console.log("🚀 ~ file: store.js:8 ~ getProducts: ~ res", res);
      if (
        res.data.status === "success" &&
        Array.isArray(res.data.products) &&
        res.data.products.length > 0
      ) {
        set({ products: res.data.products });
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },
}));
