import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("Token added to request headers:", token); // Debugging
  } else {
    console.log("no token avaliable");
  }
  return config;
});

export default api;
