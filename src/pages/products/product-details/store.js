import { create } from "zustand";
import { axios_auth } from "../../../global/config";

export const useOrderStore = create((set, get) => ({
  makeOrder: async (data) => {
    console.log("🚀 ~ file: store.js:6 ~ makeOrder: ~ data:", data);
    return true;
    try {
      // const res = await axios_auth.post("orders", data);
      // console.log("🚀 ~ file: store.js:8 ~ makeOrder: ~ res:", res);
      // return res.data.status === "success" ? true : false;
    } catch (error) {
      console.log("🚀 ~ file: store.js:11 ~ makeOrder: ~ error:", error);
      // return false;
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
}));
