import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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

import CloseIcon from "@mui/icons-material/Close";
import { loginUser } from "./api";
import { addUser } from "@/store/userSlice";
import { setAccessToken } from "@/utils/token";

const Login = ({ open, handleClose, openSignup }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      dispatch(addUser(res.data.user));
      setAccessToken(res.data.accessToken);
      toast.success("Login Successful");
      handleClose();
    } catch (err) {
      toast.error("Invalid Credentials");
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
        Login
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="dense"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            {...register("email", {
              required: "Email is required",
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
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
            onClick={openSignup}
          >
            Create new account
          </Typography>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
