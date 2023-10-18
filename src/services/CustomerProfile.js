import axios from "axios"
import { baseUrl } from "../global/config"

export const getCart = async (currentUser) => {
    return axios.get(`${baseUrl}carts/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`,
      },
    });
  };