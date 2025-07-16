import apiClient from '../api/apiCllient'; 

export const getAllProductsApi = () => apiClient.get('/admin/product');

export const getProductByIdApi = (id) => apiClient.get(`/admin/product/${id}`);

export const getFeaturedProductsApi = () => apiClient.get('/admin/product/featured');

export const createProductApi = (formData) =>
  apiClient.post('/admin/product/create', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const updateProductApi = (id, formData) =>
  apiClient.put(`/admin/product/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

export const deleteProductApi = (id) => apiClient.delete(`/admin/product/${id}`);
