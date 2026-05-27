import { useEffect, useState } from "react";

import { Box, Button, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import InventoryTable from "./InventoryTable.jsx";
import { toast } from "react-toastify";
import { getItems } from "./api.js";
// import AddItemDialog from "./AddItemDialog";

const Items = () => {
  const [open, setOpen] = useState(false);

  const [editingItem, setEditingItem] = useState(null);

  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await getItems();

      setItems(res.data.items);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAddItem = (data) => {
    if (editingItem) {
      setItems((prev) =>
        prev.map((item) =>
          item._id === editingItem._id ? { ...editingItem, ...data } : item,
        ),
      );

      setEditingItem(null);
    } else {
      const newItem = {
        _id: Date.now().toString(),
        ...data,
      };

      setItems((prev) => [...prev, newItem]);
    }

    setOpen(false);
  };

  const handleDelete = (id) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  const handleEdit = (item) => {
    setEditingItem(item);

    setOpen(true);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight={700}>
          Inventory Items
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingItem(null);

            setOpen(true);
          }}
        >
          Add Item
        </Button>
      </Box>

      <InventoryTable items={items} fetchItems={fetchItems} />

      {/* <AddItemDialog
        open={open}
        handleClose={() => setOpen(false)}
        onSubmit={handleAddItem}
        editingItem={editingItem}
      /> */}
    </Box>
  );
};

export default Items;
