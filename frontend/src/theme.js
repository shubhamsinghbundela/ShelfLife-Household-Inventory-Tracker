import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32", // deep green (main brand color)
    },
    secondary: {
      main: "#66bb6a", // light green accent
    },
    success: {
      main: "#43a047",
    },
    warning: {
      main: "#f9a825",
    },
    error: {
      main: "#d32f2f",
    },
    background: {
      default: "#f6f8f6",
      paper: "#ffffff",
    },
  },
});

export default theme;
