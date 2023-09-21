import axios from "axios";
import { baseUrl } from "../global/config";

export const postCart = async (productId, quantity, color, size) => {
  return axios.post(
    `${baseUrl}carts/`,
    {
      productId,
      quantity,
      color,
      size,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("currentUser")}`,
      },
    }
  );
};

export const getCart = async (currentUser) => {
  return axios.get(`${baseUrl}carts/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentUser}`,
    },
  });
};

export const removeCartItem = async (currentUser, cartId) => {
  return axios.delete(`${baseUrl}carts/products/${cartId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentUser}`,
    },
  });
};
