const BASE_URL = import.meta.env.VITE_SERVER_API_URL;

const API_ENDPOINTS = {
  FORM: {
    SUBMIT: `${BASE_URL}/form/submit`,
  },

  AUTH: {
    REGISTER: `${BASE_URL}/auth/register`,
    VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,
    LOGIN: `${BASE_URL}/auth/login`,

    // ✅ New additions
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
  },
};

export default API_ENDPOINTS;