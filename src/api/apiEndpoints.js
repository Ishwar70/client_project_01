const BASE_URL = import.meta.env.VITE_SERVER_API_URL;

const API_ENDPOINTS = {
  FORM: {
    SUBMIT: `${BASE_URL}/form/submit`,
  },

  AUTH: {
    REGISTER: `${BASE_URL}/auth/register`,
    VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    FORGOT_PASSWORD: `${BASE_URL}/auth/forgot-password`,
    RESET_PASSWORD: `${BASE_URL}/auth/reset-password`,
    GET_ME: `${BASE_URL}/auth/me`,
  },

  SERVICES: {
    GET_ALL: (query = "") => `${BASE_URL}/services${query}`,
    GET_BY_ID: (id) => `${BASE_URL}/services/${id}`,
    CREATE: `${BASE_URL}/services`,
    UPDATE: (id) => `${BASE_URL}/services/${id}`,
    DELETE: (id) => `${BASE_URL}/services/${id}`,
  },
};

export default API_ENDPOINTS;