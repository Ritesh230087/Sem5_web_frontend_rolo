import apiClient from '../api/apiCllient'; // <-- Use the new definitive client

export const getAllCategoriesApi = () => apiClient.get('/admin/category');
export const getCategoryByIdApi = (id) => apiClient.get(`/admin/category/${id}`);

export const createCategoryApi = (formData) => 
  apiClient.post('/admin/category/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }, // This header is necessary for file uploads
  });

export const updateCategoryApi = (id, formData) =>
  apiClient.put(`/admin/category/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteCategoryApi = (id) => apiClient.delete(`/admin/category/${id}`);