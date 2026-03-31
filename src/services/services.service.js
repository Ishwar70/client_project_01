import api from "../api/api";
import API from "../api/apiEndpoints";

/* ================= COMMON ERROR HANDLER ================= */
const handleError = (error, fallbackMsg) => {
  throw error.response?.data || { msg: fallbackMsg };
};

/* ================= GET ALL SERVICES ================= */
export const getAllServices = async () => {
  try {
    const res = await api.get(API.SERVICES.GET_ALL);
    return res.data;
  } catch (error) {
    handleError(error, "Failed to fetch services");
  }
};

/* ================= GET SERVICE BY ID ================= */
export const getServiceById = async (id) => {
  try {
    const res = await api.get(API.SERVICES.GET_BY_ID(id));
    return res.data;
  } catch (error) {
    handleError(error, "Failed to fetch service");
  }
};

/* ================= CREATE SERVICE ================= */
export const createService = async (data) => {
  try {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("price", data.price);

    if (data.image) {
      formData.append("image", data.image);
    }

    const res = await api.post(API.SERVICES.CREATE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    handleError(error, "Failed to create service");
  }
};

/* ================= UPDATE SERVICE ================= */
export const updateService = async (id, data) => {
  try {
    const formData = new FormData();

    if (data.title) formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    if (data.price) formData.append("price", data.price);

    if (data.image) {
      formData.append("image", data.image);
    }

    const res = await api.put(API.SERVICES.UPDATE(id), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    handleError(error, "Failed to update service");
  }
};

/* ================= DELETE SERVICE ================= */
export const deleteService = async (id) => {
  try {
    const res = await api.delete(API.SERVICES.DELETE(id));
    return res.data;
  } catch (error) {
    handleError(error, "Failed to delete service");
  }
};