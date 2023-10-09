import { create } from "zustand";
import { axios_auth } from "../../../../global/config";

export const useUpdateProductStore = create((set) => ({
  getProductDetails: async (id) => {
    try {
      const res = await axios_auth.get(`products/${id}`);
      console.log("🚀 ~ file: store.js:9 ~ getProductDetails: ~ res:", res);
    } catch (error) {
      return error;
    }
  },
}));
