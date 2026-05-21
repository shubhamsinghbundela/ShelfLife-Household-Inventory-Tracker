import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // change to your backend
  withCredentials: true, // important if using cookies for refresh token
  timeout: 10000, //Maximum time (in milliseconds) Axios will wait for a response from the server before aborting the request.
});

export default api;
