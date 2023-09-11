import axios from "axios";

// export const baseUrl = "http://localhost:8080/; // for local host
export const url = "http://localhost:8080/";
export const baseUrl = `${url}api/v1/`; // for one server
export const imageUrl = url; // for one server

export const axios_auth = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const axios_no_auth = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
export const axios_file_with_auth = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
