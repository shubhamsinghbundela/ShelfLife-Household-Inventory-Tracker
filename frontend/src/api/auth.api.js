// src/api/auth.api.js
import api from "./axios";

export const refreshToken = async () => {
  const res = await api.post("/auth/refresh"); // 👈 no payload
  return res.data;
};
