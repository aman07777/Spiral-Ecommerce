import { create } from "zustand";

export const useBuyStore = create((set, get) => ({
  orderItems: [],
  setOrderItems: (data) => {
    set((state) => ({
      orderItems: [...state.orderItems, data],
    }));
  },
  replaceOrderItems: (data) => {
    set(() => ({
      orderItems: data,
    }));
  },
  shippingInfo: {
    fullName: "",
    email: "",
    address: "",
    mobileNumber: "",
    landMark: "",
    province: "",
    label: "",
  },
  setShippingInfo: (data) => {
    set((state) => ({
      shippingInfo: { ...state.shippingInfo, ...data },
    }));
  },
  paymentDetails: {
    method: "",
    image: "",
    accountNumber: "",
    accountName: "Aijo",
    description: "",
  },
  setPaymentDetails: (data) => {
    set((state) => ({
      paymentDetails: { ...state.paymentDetails, ...data },
    }));
  },
}));
