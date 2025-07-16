import apiClient from '../api/apiCllient'; 

export const fetchUsersApi = () => apiClient.get('/admin/user');
export const fetchUserByIdApi = (id) => apiClient.get(`/admin/user/${id}`);
export const updateUserApi = (id, user) => apiClient.put(`/admin/user/${id}`, user);
export const deleteUserApi = (id) => apiClient.delete(`/admin/user/${id}`);