import { create } from "zustand";
import { axios_auth } from "../../../../global/config";

export const useAddProductStore = create((set) => ({
  addProduct: async (data) => {
    try {
      const res = await axios_auth.post("products", data);
      console.log("🚀 ~ file: store.js:8 ~ addProduct: ~ res:", res);
      return res.data.status === "success" ? true : false;
    } catch (error) {
      console.log("🚀 ~ file: store.js:11 ~ addProduct: ~ error:", error);
      return false;
    }
  },
}));
