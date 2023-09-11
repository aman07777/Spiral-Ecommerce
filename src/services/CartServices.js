import axios from "axios";
import { baseUrl } from "../global/config";

export const postCart = async (currentUser, productId, quantity) => {
  return axios.post(
    `${baseUrl}/`,
    {
      productId,
      quantity,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`,
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
