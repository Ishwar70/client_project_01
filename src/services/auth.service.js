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

/* ================= LOGOUT ================= */
export const logoutUser = async () => {
  try {
    await api.post(API.AUTH.LOGOUT);

  } catch (error) {
    console.warn(error, "Logout API failed, clearing local data anyway");
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAuth");
  }
};

/* ================= GET CURRENT USER ================= */
export const getMe = async () => {
  try {
    const res = await api.get(API.AUTH.GET_ME);
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Failed to fetch user" };
  }
};