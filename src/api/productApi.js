const API_BASE = "http://localhost:5050/api/admin/product";

export const getAllProductsApi = () => fetch(API_BASE);

export const getProductByIdApi = (id) =>
  fetch(`${API_BASE}/${id}`);

export const getFeaturedProductsApi = () =>
  fetch(`${API_BASE}/featured`);

export const createProductApi = (formData) =>
  fetch(`${API_BASE}/create`, {
    method: "POST",
    body: formData,
  });

export const updateProductApi = (id, formData) =>
  fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    body: formData,
  });

export const deleteProductApi = (id) =>
  fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
