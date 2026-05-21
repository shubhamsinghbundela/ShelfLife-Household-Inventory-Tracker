import { refreshToken } from "./auth.api";
import api from "./axios";
import { getAccessToken, setAccessToken, clearTokens } from "@/utils/token";

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  const token = getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // if access token expired (401)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // 👇 cookie automatically sent
        const data = await refreshToken();
        const newAccessToken = data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);

        api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (error) {
        localStorage.removeItem("accessToken");

        window.location.href = "/";

        return Promise.reject(error);
      }
    }
  },
);
