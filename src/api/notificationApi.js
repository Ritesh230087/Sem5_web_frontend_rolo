import axios from "axios";

const API = "http://localhost:5050/api/notifications";

export const getNotificationsApi = (token, userId) => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const markNotificationAsReadApi = (id) => {
  return axios.post(`${API}/${id}/read`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const markAllNotificationsAsReadApi = () => {
  return axios.post(`${API}/mark-all-read`, null, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
