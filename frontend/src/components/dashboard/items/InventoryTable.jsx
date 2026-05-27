import { useMemo } from "react";

import { MaterialReactTable } from "material-react-table";

import { Chip, IconButton, Stack, Tooltip } from "@mui/material";

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

const InventoryTable = ({ items, onDelete, onEdit }) => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "category",
        header: "Category",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "expiryDate",
        header: "Expiry Date",
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
      {
        header: "Actions",
        Cell: ({ row }) => (
          <Stack direction="row">
            <Tooltip title="Edit">
              <IconButton onClick={() => onEdit(row.original)}>
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton
                color="error"
                onClick={() => onDelete(row.original._id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
      },
    ],
    [onDelete, onEdit],
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={items}
      enableSorting
      enablePagination
      enableColumnFilters
      enableGlobalFilter
      positionGlobalFilter="left"
    />
  );
};

export default InventoryTable;
