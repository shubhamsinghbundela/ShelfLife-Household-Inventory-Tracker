import api from "@/api/axios.js";

export const createItem = async (data) => {
  const res = await api.post("/items", data);

  return res.data;
};

// GET ITEMS
export const getItems = async (page, limit, search) => {
  const res = await api.get(
    `/items?page=${page}&limit=${limit}&search=${search}`,
  );
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
