import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Divider,
  Stack,
  Link,
} from "@mui/material";

import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginUser } from "./api";

export default function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const res = await loginUser(data);

    console.log("Login Response:", res);
    localStorage.setItem("accessToken", res.data.accessToken);

    navigate("/dashboard");
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
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Inputs */}
            <Stack spacing={2} mt={3}>
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
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />

              {/* Password */}
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
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </Stack>
          </form>

          {/* Divider */}
          {/* <Divider sx={{ my: 3 }}>OR</Divider> */}

          {/* Google Login */}
          {/* <Button variant="outlined" fullWidth startIcon={<GoogleIcon />}>
            Sign in with Google
          </Button> */}

          {/* Create account */}
          <Typography variant="body2" textAlign="center" mt={3}>
            New user?{" "}
            <Link
              component="button"
              onClick={() => navigate("/signup")}
              underline="hover"
              sx={{ color: "#2e7d32", fontWeight: 500 }}
            >
              Create new account
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
