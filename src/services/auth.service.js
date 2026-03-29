import api from "../api/api";
import API from "../api/apiEndpoints";

// 🧾 Register User (send OTP)
export const registerUser = async (data) => {
  try {
    const res = await api.post(API.AUTH.REGISTER, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Register failed" };
  }
};

// 🔐 Verify OTP
export const verifyOtp = async (data) => {
  try {
    const res = await api.post(API.AUTH.VERIFY_OTP, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "OTP verification failed" };
  }
};

// 🔑 Login User
export const loginUser = async (data) => {
  try {
    const res = await api.post(API.AUTH.LOGIN, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Login failed" };
  }
};