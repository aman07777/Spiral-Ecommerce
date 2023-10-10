import { create } from "zustand";
import { axios_auth, axios_file_with_auth } from "../../../../global/config";

export const useUpdateProductStore = create((set) => ({
  productDetails: {},
  getProductDetails: async (id) => {
    try {
      const res = await axios_auth.get(`products/${id}`);
      if (res.data.status === "success") {
        set({ productDetails: res.data.product });
        return res.data.product;
      }
      return {};
    } catch (error) {
      return error;
    }
  },
  updateProduct: async (data) => {
    try {
      const res = await axios_file_with_auth.put(
        `products/${data.id}`,
        data.data
      );
      if (res.data.status === "success") {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  },
}));
