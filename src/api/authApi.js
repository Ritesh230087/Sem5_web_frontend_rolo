import axios from "./api"; // or directly from axios if not using axios.js wrapper

export const loginUserApi = (data) => axios.post("/auth/login", data);
export const registerUserApi = (data) => axios.post("/auth/register", data);
