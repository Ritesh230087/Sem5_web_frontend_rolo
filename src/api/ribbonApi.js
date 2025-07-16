import apiClient from '../api/apiCllient';

export const getAllRibbonsApi = () => apiClient.get("/admin/ribbon");
export const getRibbonByIdApi = (id) => apiClient.get(`/admin/ribbon/${id}`);

export const createRibbonApi = (body) => apiClient.post("/admin/ribbon/create", body);
export const updateRibbonApi = (id, body) => apiClient.put(`/admin/ribbon/${id}`, body);
export const deleteRibbonApi = (id) => apiClient.delete(`/admin/ribbon/${id}`);