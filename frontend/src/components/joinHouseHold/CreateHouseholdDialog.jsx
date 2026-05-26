import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createHousehold } from "./api";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/store/userSlice";

const CreateHouseholdDialog = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      householdName: "",
      inviteCode: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await createHousehold(data);
      dispatch(
        addUser({
          ...user,
          householdId: res.data.householdId,
        }),
      );
      navigate("/items");
      reset();
      toast.success("Houshold created successfully");
      handleClose();
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
    console.log(data);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      disableScrollLock
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Create Household
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Household Name"
            margin="normal"
            error={!!errors.householdName}
            helperText={errors.householdName?.message}
            {...register("householdName", {
              required: "Household name is required",
            })}
          />

          <TextField
            fullWidth
            label="Invite Code"
            margin="normal"
            error={!!errors.inviteCode}
            helperText={errors.inviteCode?.message}
            inputProps={{
              maxLength: 6,
            }}
            {...register("inviteCode", {
              required: "Invite code is required",

              pattern: {
                value: /^[0-9]{6}$/,
                message: "Invite code must be 6 digits",
              },

              onChange: (e) => {
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
              },
            })}
          />

          <DialogActions>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateHouseholdDialog;
