import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;


export default axios.create({
  withCredentials: true,
  baseURL: `${apiURL}`,
});
