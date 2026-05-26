import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { joinHousehold } from "./api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "@/store/userSlice";

const JoinWithInviteDialog = ({ open, handleClose, openCreateDialog }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      inviteCode: "",
    },
  });

  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const payload = {
        inviteCode: data.inviteCode,
        householdId: user?.householdId,
      };

      const res = await joinHousehold(payload);
      dispatch(
        addUser({
          ...user,
          householdId: res.data.householdId,
        }),
      );
      navigate("/items");
      reset();
      toast.success("Household join successfully");
      handleClose();
    } catch (err) {
      toast.error("Invalid Invite code");
      console.error(err);
    }
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
        Join Household
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
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

          <Typography
            sx={{
              mt: 3,
              textAlign: "center",
            }}
          >
            Want to create your own household?
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Button variant="outlined" onClick={openCreateDialog}>
              Create New Household
            </Button>
          </Box>

          <DialogActions>
            <Button type="submit" variant="contained">
              Join
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default JoinWithInviteDialog;
