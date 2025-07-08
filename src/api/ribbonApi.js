const API_BASE = "http://localhost:5050/api/admin/ribbon";

export const getAllRibbonsApi = () => fetch(API_BASE);

export const getRibbonByIdApi = (id) =>
  fetch(`${API_BASE}/${id}`);

export const createRibbonApi = (body) =>
  fetch(`${API_BASE}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const updateRibbonApi = (id, body) =>
  fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const deleteRibbonApi = (id) =>
  fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
