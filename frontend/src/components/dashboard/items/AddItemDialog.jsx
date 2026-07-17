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
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import CloseIcon from "@mui/icons-material/Close";

import { Controller, useForm } from "react-hook-form";
import BarcodeScanner from "react-qr-barcode-scanner";

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

  const [openScanner, setOpenScanner] = useState(false);
  const [stopStream, setStopStream] = useState(true);

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

  const startScanner = async () => {
    setStopStream(false);
    setOpenScanner(true);
  };

  const stopScanner = () => {
    setStopStream(true);

    setTimeout(() => {
      setOpenScanner(false);
    }, 100);
  };

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
      console.error(error);
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
    <>
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
              alignItems: "center",
            }}
          >
            <Controller
              name="barcode"
              control={control}
              render={({ field }) => (
                <TextField {...field} fullWidth label="Barcode" />
              )}
            />

            {/* Upload Barcode Image */}
            <Button
              variant="outlined"
              onClick={startScanner}
              sx={{
                minWidth: "50px",
                height: "56px",
              }}
            >
              <CameraAltIcon />
            </Button>

            {/* Fetch Product */}
            <Button
              variant="contained"
              onClick={handleBarcodeSearch}
              disabled={loadingBarcode}
              sx={{
                height: "56px",
              }}
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
      <Dialog open={openScanner} onClose={stopScanner} fullWidth maxWidth="sm">
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Scan Barcode
          <IconButton onClick={stopScanner}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <BarcodeScanner
            width="100%"
            height={300}
            facingMode="user"
            stopStream={stopStream}
            delay={500}
            onError={(error) => {
              console.error(error);
              toast.error("Failed to access camera");
            }}
            onUpdate={(err, result) => {
              if (result) {
                setValue("barcode", result.text);

                // Stop camera first
                setStopStream(true);

                // Close dialog after stream stops
                setTimeout(() => {
                  setOpenScanner(false);
                  toast.success("Barcode scanned successfully");
                }, 100);
              }
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddItemDialog;
