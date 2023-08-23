import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth/";

export const signup = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) => {
  return axios.post(`${API_URL}/signup`, {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });
};

export const verifyEmail = async (token) => {
  return axios.post(`${API_URL}/verify-email`, {
    verificationCode: token,
  });
};

export const login = async (email, passowrd) => {
  return axios.post(`${API_URL}/login`, {
    email: email,
    password: passowrd,
  });
};

export const forgotPassword = async (email) => {
  return axios.post(`${API_URL}/forgot-password`, {
    email,
  });
};

export const resetPassword = async (token, password, confirmPassword) => {
  return axios.post(`${API_URL}/reset-password`, {
    token,
    password,
    confirmPassword,
  });
};
