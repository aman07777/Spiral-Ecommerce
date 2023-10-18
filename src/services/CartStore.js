import { create } from "zustand";
import { axios_auth } from "../global/config";

export const cartStore = create((set) => ({
  cartDetails: [],
  cartLength: 0,

  getAllCarts: async () => {
    try {
      const response = await axios_auth.get("carts");
      if (response.data.status === "success") {
        set({ cartDetails: response.data.cart });
        const cartLength = response.data.cart.length;
        set({ cartLength});
        return response.data.cart;
      }
      return [];
    } catch (error) {
      console.log(error)
      return error;
    }
  },

  removeCart: async (cartId) => {
    try {
      const response = await axios_auth.delete(`carts/products/${cartId}`);
      if (response.data.status === "success") {
        const cartLength = response.data.cart.products.length;
        set({ cartLength });
        return response.data.cart.products;
      }
      return [];
    } catch (error) {
      return error;
    }
  },

  addToCart: async (data) => {
    try {
      const response = await axios_auth.post(`carts`, data);
      if (response.data.status === "success") {
        const cartLength = response.data.cart.products.length;
        set({ cartLength });
        return response.data;
      }
      return [];
    } catch (error) {
      return error;
    }
  },
  deleteAllCart: async () => {
    try {
      const response = await axios_auth.get(`/carts/delete-my`);
      if (response.data.status === "success") {
        set({ cartLength: 0 });
        return response.data;
      }
      return [];
    } catch (error) {
      return error;
    }
  },
}));
