import axios from "./api"; 

export const loginUserApi = (data) => axios.post("/auth/login", data);
export const registerUserApi = (data) => axios.post("/auth/register", data);
