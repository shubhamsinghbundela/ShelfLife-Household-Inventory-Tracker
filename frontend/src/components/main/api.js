import api from "@/api/axios.js";

// GETME
export const getMe = async () => {
  const res = await api.get("/auth/getme");
  return res.data;
};

export const logout = async () => {
  const res = await api.get("/auth/logout");
  return res.data;
};
