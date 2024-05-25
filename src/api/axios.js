import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

export default axios.create({
  baseURL: `${apiURL}`,
});
