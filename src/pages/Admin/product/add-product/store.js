import { create } from "zustand";
import { axios_file_with_auth } from "../../../../global/config";

export const useAddProductStore = create((set) => ({
  addProduct: async (data) => {
    console.log("🚀 ~ file: store.js:6 ~ addProduct: ~ data:", data);
    try {
      const res = await axios_file_with_auth.post("products", data);
      console.log("🚀 ~ file: store.js:8 ~ addProduct: ~ res:", res);
      return res.data.status === "success" ? true : false;
    } catch (error) {
      console.log("🚀 ~ file: store.js:11 ~ addProduct: ~ error:", error);
      return false;
    }
  },
}));
