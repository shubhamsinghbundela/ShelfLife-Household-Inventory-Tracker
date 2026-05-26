import { useForm } from "react-hook-form";

import CloseIcon from "@mui/icons-material/Close";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { toast } from "react-toastify";

import { signupUser } from "./api";

const Signup = ({ open, handleClose, openLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await signupUser(data);
      if (res.success) {
        toast.success("Signup Successful");
        handleClose();
        openLogin();
      }
    } catch (err) {
      toast.error("Signup Failed");
      console.error(err);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      disableScrollLock
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Create Account
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="dense"
            label="First Name"
            fullWidth
            {...register("firstName", {
              required: "First name is required",
            })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />

          <TextField
            margin="dense"
            label="Last Name"
            fullWidth
            {...register("lastName", {
              required: "Last name is required",
            })}
            error={!!errors.lastName}
            helperText={errors.lastName?.message}
          />

          <TextField
            margin="dense"
            label="Username"
            fullWidth
            {...register("username", {
              required: "Username is required",
            })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />

          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            {...register("email", {
              required: "Email is required",
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            margin="dense"
            label="Phone Number"
            type="tel"
            fullWidth
            {...register("phoneNumber", {
              required: "Phone number is required",
            })}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />

          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Typography
            variant="body2"
            sx={{
              mt: 2,
              cursor: "pointer",
              color: "primary.main",
              textAlign: "center",
            }}
            onClick={openLogin}
          >
            Already have an account? Login
          </Typography>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button type="submit" variant="contained">
              Signup
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Signup;
