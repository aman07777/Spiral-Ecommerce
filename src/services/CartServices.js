import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/carts/";

export const postCart = async (currentUser, productId, quantity) => {
  return axios.post(
    `${API_URL}/`,
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
  return axios.get(`${API_URL}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentUser}`,
    },
  });
};

export const removeCartItem = async (currentUser, cartId) => {
  return axios.delete(`${API_URL}/products/${cartId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentUser}`,
    },
  });
};
