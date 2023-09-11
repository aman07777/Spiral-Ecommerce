import axios from "axios";
import { baseUrl } from "../global/config";

export const signup = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) => {
  return axios.post(`${baseUrl}/signup`, {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  });
};

export const verifyEmail = async (token) => {
  return axios.post(`${baseUrl}/verify-email`, {
    verificationCode: token,
  });
};

export const login = async (email, passowrd) => {
  return axios.post(`${baseUrl}/login`, {
    email: email,
    password: passowrd,
  });
};

export const forgotPassword = async (email) => {
  return axios.post(`${baseUrl}/forgot-password`, {
    email,
  });
};

export const resetPassword = async (token, password, confirmPassword) => {
  return axios.post(`${baseUrl}/reset-password`, {
    token,
    password,
    confirmPassword,
  });
};
