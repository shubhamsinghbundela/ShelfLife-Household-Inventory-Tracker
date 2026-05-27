import api from "@/api/axios.js";

// SIGNUP
export const getItems = async (data) => {
  const res = await api.get("/items/", data);
  return res.data;
};
