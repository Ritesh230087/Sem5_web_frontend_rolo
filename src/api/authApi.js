import apiClient from '../api/apiCllient';

export const loginUserApi = (data) => apiClient.post("/auth/login", data);
export const registerUserApi = (data) => apiClient.post("/auth/register", data);
export const sentResetLinkApi =(data)=> apiClient.post("/auth/send-reset-link", data);
export const resetPasswordApi = (token, data) => apiClient.post(`/auth/reset-password/${token}`, data);

