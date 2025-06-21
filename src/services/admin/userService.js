import axios from "axios";

const API = "/api/auth";

export const getUsers = async () =>
  (await axios.get(API, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })).data;

export const createUser = async (userData) =>
  (await axios.post(API, userData)).data;

export const updateUser = async (id, userData) =>
  (await axios.put(`${API}/${id}`, userData)).data;

export const deleteUser = async (id) =>
  (await axios.delete(`${API}/${id}`)).data;
