import api from "@/api/axios.js";

// SIGNUP
export const signupUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

// LOGIN
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};
