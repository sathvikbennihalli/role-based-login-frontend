import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Your backend URL
  withCredentials: true,
});

instance.interceptors.request.use(
    config => {
        const authToken = Cookies.get("token");

        config.headers['Cookie'] = `token=${authToken}`;

        return config;
    }, error => {
        return Promise.reject(error);
    }
);



export default instance;
