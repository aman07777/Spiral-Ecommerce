import { create } from "zustand";

export const useProductPageStore = create((set) => ({
  category: "",
  setCategory: (category) => set({ category }),
}));
