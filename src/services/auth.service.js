import api from "../api/api";
import API from "../api/apiEndpoints";

/* ================= COMMON ERROR HANDLER ================= */
const handleError = (error, fallbackMsg) => {
  throw error.response?.data || { msg: fallbackMsg };
};

/* ================= REGISTER ================= */
export const registerUser = async (data) => {
  try {
    const res = await api.post(API.AUTH.REGISTER, data);
    return res.data;
  } catch (error) {
    handleError(error, "Register failed");
  }
};

/* ================= VERIFY OTP ================= */
export const verifyOtp = async (data) => {
  try {
    const res = await api.post(API.AUTH.VERIFY_OTP, data);
    return res.data;
  } catch (error) {
    handleError(error, "OTP verification failed");
  }
};

/* ================= LOGIN ================= */
export const loginUser = async (data) => {
  try {
    const res = await api.post(API.AUTH.LOGIN, data);
    return res.data;
  } catch (error) {
    handleError(error, "Login failed");
  }
};

/* ================= FORGOT PASSWORD ================= */
export const forgotPassword = async (data) => {
  try {
    const res = await api.post(API.AUTH.FORGOT_PASSWORD, data);
    return res.data;
  } catch (error) {
    handleError(error, "Failed to send reset OTP");
  }
};

/* ================= RESET PASSWORD ================= */
export const resetPassword = async (data) => {
  try {
    const res = await api.post(API.AUTH.RESET_PASSWORD, data);
    return res.data;
  } catch (error) {
    handleError(error, "Password reset failed");
  }
};