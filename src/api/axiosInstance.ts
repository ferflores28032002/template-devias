import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://www.tallercentenos.somee.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
