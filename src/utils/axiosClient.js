import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosClient;
