import axios from "axios";
import { baseUrl } from "../global/config";

const buildApiUrl = (currentPage, params) => {
  const queryParams = new URLSearchParams(params).toString();
  return `${baseUrl}products/?page=${currentPage}${
    queryParams ? `&${queryParams}` : ""
  }`;
};

export const getProducts = async (
  currentPage,
  keyWord,
  minPrice,
  maxPrice,
  sort,
  brands,
  categories
) => {
  const params = {};

  if (keyWord) {
    params.keyWord = keyWord;
  }

  if (sort) {
    params.sort = sort;
  }

  if (minPrice) {
    params.minPrice = minPrice;
  }

  if (maxPrice) {
    params.maxPrice = maxPrice;
  }
  Array.isArray(brands) &&
    brands.length > 0 &&
    (params.brands = brands.map((brand) => brand.title).join(","));
  Array.isArray(categories) &&
    categories.length > 0 &&
    (params.categories = categories
      .map((category) => category.title)
      .join(","));

  const apiUrl = buildApiUrl(currentPage, params);

  try {
    const { data } = await axios.get(apiUrl);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (productId) => {
  const { data } = await axios.get(`${baseUrl}products/${productId}`);
  return data;
};

export const getFeaturedProducts = async () => {
  const { data } = await axios.get(`${baseUrl}products/featured`);
  return data.status === "success" ? data.products : [];
};

export const getNewArrival = async () => {
  const { data } = await axios.get(`${baseUrl}products/new-arrival`);
  return data.status === "success" ? data.products : [];
};

export const removeProduct = async (currentUser, productId) => {
  return axios.delete(`${baseUrl}/${productId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${currentUser}`,
    },
  });
};

export const createProduct = async (currentUser, product) => {
  return axios.post(
    baseUrl,
    {
      product,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`,
      },
    }
  );
};

export const updateProduct = async (currentUser, product) => {
  return axios.put(
    `${baseUrl}/${product.id}`,
    {
      product,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser}`,
      },
    }
  );
};
