import axios from "axios";

export const refreshToken = async () => {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
    },
  );
};
