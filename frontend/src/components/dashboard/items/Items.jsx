import { useState } from "react";

import { Box, Button, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import InventoryTable from "./InventoryTable";
// import AddItemDialog from "./AddItemDialog";

const Items = () => {
  const [open, setOpen] = useState(false);

  const [editingItem, setEditingItem] = useState(null);

  const [items, setItems] = useState([
    {
      _id: "1",
      name: "Milk",
      category: "dairy",
      quantity: 2,
      expiryDate: "2026-05-30",
    },
    {
      _id: "2",
      name: "Chicken",
      category: "meat",
      quantity: 1,
      expiryDate: "2026-05-27",
    },
  ]);

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

      <InventoryTable
        items={items}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />

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
