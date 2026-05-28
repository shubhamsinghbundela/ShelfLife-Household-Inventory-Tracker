import api from "@/api/axios.js";

// GET ITEMS
export const getItems = async () => {
  const res = await api.get("/items/");
  return res.data;
};

// UPDATE ITEM
export const updateItem = async (itemId, data) => {
  const res = await api.put(`/items/${itemId}`, data);

  return res.data;
};

export const deleteItem = async (itemId) => {
  const res = await api.delete(`/items/${itemId}`);

  return res.data;
};
