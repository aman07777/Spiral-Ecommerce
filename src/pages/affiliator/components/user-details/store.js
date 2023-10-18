import { create } from "zustand";
import { axios_auth } from "../../../../global/config";

export const useAffiliatorProfileStore = create((set) => ({
  getMyDetails: async () => {
    try {
      const res = await axios_auth.get("/users/me");
      if (res.data.status === "success") return res.data.user;
      return null;
    } catch (error) {
      return error;
    }
  },
  updateDetails: async (data) => {
    try {
      const res = await axios_auth.put(`/affiliates/${data._id}`, data);
      return res.data.status === "success" ? true : false;
    } catch (error) {
      return false;
    }
  },
}));
