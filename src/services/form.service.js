import api from "../api/api";
import API from "../api/apiEndpoints";

// 📝 Submit Form
export const submitForm = async (data) => {
  try {
    const res = await api.post(API.FORM.SUBMIT, data);
    return res.data;
  } catch (error) {
    throw error.response?.data || { msg: "Form submission failed" };
  }
};