import api from "../api/api";
import API from "../api/apiEndpoints";

/* ================= COMMON ERROR HANDLER ================= */
const handleError = (error, fallbackMsg) => {
  throw error.response?.data || { msg: fallbackMsg };
};

/* ================= GET ALL PACKAGES ================= */
export const getAllPackages = async (query = "") => {
  try {
    const res = await api.get(API.PACKAGES.GET_ALL(query));
    return res.data;
  } catch (error) {
    handleError(error, "Failed to fetch packages");
  }
};

/* ================= GET PACKAGE BY ID ================= */
export const getPackageById = async (id) => {
  try {
    const res = await api.get(API.PACKAGES.GET_BY_ID(id));
    return res.data;
  } catch (error) {
    handleError(error, "Failed to fetch package");
  }
};

/* ================= CREATE PACKAGE ================= */
export const createPackage = async (data) => {
  try {
    const formData = new FormData();

    // append fields
    Object.keys(data).forEach((key) => {
      if (key === "includes" && Array.isArray(data.includes)) {
        data.includes.forEach((item) => {
          formData.append("includes", item);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    const res = await api.post(API.PACKAGES.CREATE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    handleError(error, "Failed to create package");
  }
};

/* ================= UPDATE PACKAGE ================= */
export const updatePackage = async (id, data) => {
  try {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "includes" && Array.isArray(data.includes)) {
        // Correct way to append arrays in FormData
        data.includes.forEach((item) => {
          formData.append("includes", item);
        });
      } else if (key === "image") {
        if (data[key] instanceof File) {
          // Scenario: New file selected
          formData.append("image", data[key]);
        } else if (data[key] === null) {
          // Scenario: Image explicitly removed (send "null" string)
          formData.append("image", "null");
        }
        // Scenario: If it's a URL string, we don't append anything (No change)
      } else {
        formData.append(key, data[key]);
      }
    });

    const res = await api.put(API.PACKAGES.UPDATE(id), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (error) {
    handleError(error, "Failed to update package");
  }
};

/* ================= DELETE PACKAGE ================= */
export const deletePackage = async (id) => {
  try {
    const res = await api.delete(API.PACKAGES.DELETE(id));
    return res.data;
  } catch (error) {
    handleError(error, "Failed to delete package");
  }
};