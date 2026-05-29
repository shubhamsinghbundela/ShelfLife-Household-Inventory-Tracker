import { useState } from "react";

import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { Controller, useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { createItem } from "./api.js";

const categoryOptions = ["produce", "dairy", "meat", "pantry", "frozen"];

const mapCategory = (categories) => {
  const lower = categories.toLowerCase();

  if (lower.includes("milk")) {
    return "dairy";
  }

  if (lower.includes("cheese")) {
    return "dairy";
  }

  if (lower.includes("meat")) {
    return "meat";
  }

  if (lower.includes("fruit") || lower.includes("vegetable")) {
    return "produce";
  }

  if (lower.includes("frozen")) {
    return "frozen";
  }

  return "pantry";
};

const AddItemDialog = ({ open, handleClose, fetchItems }) => {
  const [loadingBarcode, setLoadingBarcode] = useState(false);

  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { control, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      barcode: "",
      name: "",
      category: "",
      quantity: "",
      expiryDate: "",
    },
  });

  const barcode = watch("barcode");

  const handleBarcodeSearch = async () => {
    if (!barcode) {
      return toast.error("Please enter barcode");
    }

    try {
      setLoadingBarcode(true);

      const response = await fetch(
        `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`,
      );

      const data = await response.json();

      if (!data.product) {
        return toast.error("Product not found");
      }

      setValue("name", data.product.product_name || "");

      setValue("category", mapCategory(data.product.categories || ""));

      toast.success("Product fetched successfully");
    } catch (error) {
      toast.error("Failed to fetch product");
    } finally {
      setLoadingBarcode(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoadingSubmit(true);

      await createItem(data);

      toast.success("Item created successfully");

      fetchItems();

      handleClose();

      reset();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create item");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Add Item
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            mt: 1,
            mb: 3,
          }}
        >
          <Controller
            name="barcode"
            control={control}
            render={({ field }) => (
              <TextField {...field} fullWidth label="Barcode" />
            )}
          />

          <Button
            variant="contained"
            onClick={handleBarcodeSearch}
            disabled={loadingBarcode}
          >
            {loadingBarcode ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Fetch"
            )}
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Product name is required",
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Product Name"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            rules={{
              required: "Category is required",
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                select
                label="Category"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              >
                {categoryOptions.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="quantity"
            control={control}
            rules={{
              required: "Quantity is required",
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Quantity"
                type="number"
                fullWidth
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="expiryDate"
            control={control}
            rules={{
              required: "Expiry date is required",
            }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                label="Expiry Date"
                type="date"
                fullWidth
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
                error={!!fieldState.error}
                helperText={fieldState.error?.message}
              />
            )}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSubmit(onSubmit)}
          disabled={loadingSubmit}
        >
          {loadingSubmit ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Save Item"
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemDialog;
