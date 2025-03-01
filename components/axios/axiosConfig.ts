import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://capstone24.sit.kmutt.ac.th/sy1/apis", 
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient; 
