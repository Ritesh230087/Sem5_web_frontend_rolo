import apiClient from './apiCllient'; 

export const getOrdersAdminApi = () => apiClient.get('/admin/order');
export const getOrderAdminApi = (id) => apiClient.get(`/admin/order/${id}`);
export const editOrderAdminApi = (id, orderData) => apiClient.put(`/admin/order/${id}`, orderData);
export const deleteOrderAdminApi = (id) => apiClient.delete(`/admin/order/${id}`);
export const updateOrderStatusAdminApi = (id, updates) => apiClient.put(`/admin/order/${id}`, updates);
export const createOrderWithSlipApi = (formData) => {
  return apiClient.post('/orders/create-with-slip', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
export const createOrderApi = (orderData) => apiClient.post('/orders/create', orderData);
export const getLastShippingApi = (userId) => apiClient.get(`/orders/last-shipping/${userId}`);