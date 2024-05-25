import axios from "axios";
import Cookies from "js-cookie";

const apiURL = process.env.REACT_APP_API_URL;

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  (config) => {
    const authToken = Cookies.get("token");

    config.headers["Cookie"] = `token=${authToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axios.create({
  baseURL: `${apiURL}`,
  withCredentials: true,
});
