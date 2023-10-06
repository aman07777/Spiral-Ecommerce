import axios from "axios";
import { baseUrl } from "../global/config";

export const signup = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) => {
  return axios.post(`${baseUrl}auth/signup`, {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });
};

export const verifyEmail = async (token) => {
  return axios.post(`${baseUrl}auth/verify-email`, {
    verificationCode: token,
  });
};

export const login = async (email, password) => {
  return axios.post(`${baseUrl}auth/login`, {
    email: email,
    password: password,
  });
};

export const forgotPassword = async (email) => {
  return axios.post(`${baseUrl}auth/forgot-password`, {
    email,
  });
};

export const resetPassword = async (token, password, confirmPassword) => {
  return axios.post(`${baseUrl}auth/reset-password`, {
    token,
    password,
    confirmPassword,
  });
};
