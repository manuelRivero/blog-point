import axios from "axios";

export const axiosIntance = axios.create({
    baseURL:"http://localhost:4000/api",
    withCredentials: true
})