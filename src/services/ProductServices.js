import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/products/";

const buildApiUrl = (currentPage, params) => {
  const queryParams = new URLSearchParams(params).toString();
  return `${API_URL}/?page=${currentPage}${
    queryParams ? `&${queryParams}` : ""
  }`;
};

export const getProducts = async (
  currentPage,
  keyWord,
  minPrice,
  maxPrice,
  sort
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

  const apiUrl = buildApiUrl(currentPage, params);

  try {
    const { data } = await axios.get(apiUrl);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getProduct = async (productId) => {
  const { data } = await axios.get(`${API_URL}/${productId}`);
  return data;
};

export const getFeaturedProducts = async () => {
  const { data } = await axios.get(`${API_URL}/featured`);
  return data;
};
