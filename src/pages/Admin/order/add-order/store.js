import { create } from "zustand";
import { axios_no_auth } from "../../../../global/config";

export const useAddOrderStore = create((set) => ({
  addOrder: async (data) => {
    try {
      const res = await axios_no_auth.post("", data);
      console.log("🚀 ~ file: store.js:8 ~ addOrder: ~ res:", res);
      return res.data.status === "success" ? true : false;
    } catch (error) {
      console.log("🚀 ~ file: store.js:11 ~ addOrder: ~ error:", error);
      return false;
    }
  },
}));
