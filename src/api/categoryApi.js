const API_BASE = "http://localhost:5050/api/admin/category";

export const getAllCategoriesApi = () => fetch(API_BASE);
export const getCategoryByIdApi = (id) => fetch(`${API_BASE}/${id}`);
export const createCategoryApi = (formData) =>
  fetch(`${API_BASE}/create`, {
    method: "POST",
    body: formData,
  });
export const updateCategoryApi = (id, formData) =>
  fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    body: formData,
  });
export const deleteCategoryApi = (id) =>
  fetch(`${API_BASE}/${id}`, { method: "DELETE" });
