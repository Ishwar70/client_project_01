import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= REQUEST INTERCEPTOR ================= */
api.interceptors.request.use(
  (config) => {
    // attach token if exists
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ================= RESPONSE INTERCEPTOR ================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // global error handling
    if (error.response) {
      const status = error.response.status;

      if (status === 401) {
        console.warn("Unauthorized - maybe token expired");
        // optional: logout user
        // localStorage.removeItem("token");
        // window.location.href = "/login";
      }

      if (status === 500) {
        console.error("Server error");
      }
    }

    return Promise.reject(error);
  }
);

export default api;