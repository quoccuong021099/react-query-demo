import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://js-post-api.herokuapp.com/api/",
});

axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (err) => Promise.reject(err)
);

export default axiosClient;
