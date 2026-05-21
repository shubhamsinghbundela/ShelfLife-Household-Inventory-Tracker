import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Stack,
  Link,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signupUser } from "./api";

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // submit handler
  const onSubmit = async (data) => {
    const res = await signupUser(data);

    if (res.success) {
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f6f8f6 0%, #e8f5e9 100%)",
      }}
    >
      <Card sx={{ width: 380, p: 2, boxShadow: 5 }}>
        <CardContent>
          {/* Title */}
          <Typography variant="h5" textAlign="center" fontWeight={600}>
            Create Account
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Inputs */}
            <Stack spacing={2} mt={3}>
              <TextField
                label="Username"
                type="text"
                fullWidth
                {...register("username", {
                  required: "Username is required",
                })}
                error={!!errors.username}
                helperText={errors.username?.message}
              />

              <TextField
                label="Email"
                type="email"
                fullWidth
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email format",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
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

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Create Account
              </Button>
            </Stack>
          </form>

          {/* Login redirect */}
          <Typography variant="body2" textAlign="center" mt={3}>
            Already have an account?{" "}
            <Link
              component="button"
              onClick={() => navigate("/")}
              underline="hover"
              sx={{ color: "#2e7d32", fontWeight: 500 }}
            >
              Login
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
