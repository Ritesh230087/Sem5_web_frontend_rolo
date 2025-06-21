import axios from "axios";

const API = "/api/admin/category";

export const getCategories = async () => (await axios.get(API)).data;

export const createCategory = async (formData) =>
  (await axios.post(`${API}/create`, formData)).data;

export const updateCategory = async (id, formData) =>
  (await axios.put(`${API}/${id}`, formData)).data;

export const deleteCategory = async (id) =>
  (await axios.delete(`${API}/${id}`)).data;
