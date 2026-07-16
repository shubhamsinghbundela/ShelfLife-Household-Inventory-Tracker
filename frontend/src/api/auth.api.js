import axios from "axios";

export const refreshToken = async () => {
  console.log(import.meta.env.VITE_ENV);
  const baseURL =
    import.meta.env.VITE_ENV === "development"
      ? "http://localhost:3001/api"
      : "/api";

  return axios.post(
    `${baseURL}/auth/refresh`,
    {},
    {
      withCredentials: true,
    },
  );
};
