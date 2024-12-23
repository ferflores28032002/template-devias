import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://www.tallercentenos.somee.com/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
