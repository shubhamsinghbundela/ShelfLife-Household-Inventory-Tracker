import { useMemo, useState } from "react";

import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import { Box, Chip, IconButton, Tooltip, TextField } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const getStatus = (expiryDate) => {
  const today = new Date();

  const expiry = new Date(expiryDate);

  const diffDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) {
    return "expired";
  }

  if (diffDays <= 3) {
    return "expiring-soon";
  }

  return "fresh";
};

const InventoryTable = ({ items, setItems }) => {
  const [validationErrors, setValidationErrors] = useState({});

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.name,
          helperText: validationErrors?.name,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              name: undefined,
            }),
        },
      },
      {
        accessorKey: "category",
        header: "Category",
        muiEditTextFieldProps: {
          required: true,
          error: !!validationErrors?.category,
          helperText: validationErrors?.category,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              category: undefined,
            }),
        },
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
        muiEditTextFieldProps: {
          type: "number",
          required: true,
          error: !!validationErrors?.quantity,
          helperText: validationErrors?.quantity,
          onFocus: () =>
            setValidationErrors({
              ...validationErrors,
              quantity: undefined,
            }),
        },
      },
      {
        accessorKey: "expiryDate",
        header: "Expiry Date",
        Edit: ({ cell, column, row, table }) => (
          <TextField
            type="date"
            value={cell.getValue()?.split("T")[0] || ""}
            onChange={(e) => (row._valuesCache[column.id] = e.target.value)}
            fullWidth
          />
        ),
        Cell: ({ cell }) => {
          const value = cell.getValue();

          if (!value) return "";

          return new Date(value).toLocaleDateString();
        },
      },
      {
        header: "Status",
        Cell: ({ row }) => {
          const status = getStatus(row.original.expiryDate);

          return (
            <Chip
              label={status}
              color={
                status === "fresh"
                  ? "success"
                  : status === "expiring-soon"
                    ? "warning"
                    : "error"
              }
            />
          );
        },
      },
    ],
    [validationErrors],
  );

  const handleSaveRow = async ({ values, table }) => {
    const errors = validateItem(values);

    if (Object.values(errors).some(Boolean)) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});

    setItems((prev) =>
      prev.map((item) => (item._id === values._id ? values : item)),
    );

    table.setEditingRow(null);
  };

  const handleDelete = (row) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setItems((prev) => prev.filter((item) => item._id !== row.original._id));
    }
  };

  const table = useMaterialReactTable({
    columns,
    data: items,

    enableEditing: true,

    editDisplayMode: "row",

    getRowId: (row) => row._id,

    onEditingRowSave: handleSaveRow,

    onEditingRowCancel: () => setValidationErrors({}),

    renderRowActions: ({ row, table }) => (
      <Box sx={{ display: "flex", gap: "8px" }}>
        <Tooltip title="Edit">
          <IconButton onClick={() => table.setEditingRow(row)}>
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton color="error" onClick={() => handleDelete(row)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    ),

    enableSorting: true,
    enablePagination: true,
    enableColumnFilters: true,
    enableGlobalFilter: true,

    positionGlobalFilter: "left",
  });

  return <MaterialReactTable table={table} />;
};

export default InventoryTable;

const validateRequired = (value) => !!value?.toString().trim();

function validateItem(item) {
  return {
    name: !validateRequired(item.name) ? "Name is required" : "",

    category: !validateRequired(item.category) ? "Category is required" : "",

    quantity: !validateRequired(item.quantity) ? "Quantity is required" : "",
  };
}
