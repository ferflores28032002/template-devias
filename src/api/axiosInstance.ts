import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://www.tallercenteno.somee.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
