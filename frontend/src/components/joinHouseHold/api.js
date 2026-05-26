import api from "@/api/axios.js";

export const createHousehold = async (data) => {
  const res = await api.post("/households", data);
  return res.data;
};

export const joinHousehold = async (data) => {
  console.log(data);
  const res = await api.post("/households/join", data);
  return res.data;
};
