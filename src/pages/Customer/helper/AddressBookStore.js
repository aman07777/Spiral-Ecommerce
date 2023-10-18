import { create } from "zustand";
import { axios_auth } from "../../../global/config";

export const addressBookStore = create((set) => ({
  addressBooks: [],
  getAllAddress: async () => {
    try {
      const response = await axios_auth.get("address-book");
      if (response.data.status === "success") {
        return response.data.address;
      }
      return [];
    } catch (error) {
      return error;
    }
  },
  createAddressBook: async (data) => {
    try {
      const response = await axios_auth.post("address-book", data);

      if (response.data.status === "success") {
        return response.data;
      }
      return [];
    } catch (error) {
      return error;
    }
  },
  deleteAddressBook: async (id) => {
    try {
      const response = await axios_auth.delete(`address-book/${id}`);

      if (response.data.status === "success") {
        return response.data;
      }
      return [];
    } catch (error) {
      return error;
    }
  },
  getSingleAddressBook: async (id) => {
    try {
      const response = await axios_auth.get(`address-book/${id}`);
      if (response.data.status === "success") {
        return response.data.address;
      }
      return [];
    } catch (error) {
      return error;
    }
  },
  updateAddressBook: async (id, data) => {
    try {
      const response = await axios_auth.put(`address-book/${id}`, data);
      if (response.data.status === "success") {
        return response.data.message;
      }
      return [];
    } catch (error) {
      return error;
    }
  },
}));
