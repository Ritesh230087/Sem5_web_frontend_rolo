import axios from "../api/axios"; // or directly from axios if not using axios.js wrapper

export const login = (data) => axios.post("/auth/login", data);
export const register = (data) => axios.post("/auth/register", data);
