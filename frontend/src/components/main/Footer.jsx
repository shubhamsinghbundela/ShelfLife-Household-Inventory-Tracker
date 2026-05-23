import { Box, Container, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 2,
        textAlign: "center",
        bgcolor: "primary.main",
        color: "white",
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="body2">
          © 2026 ShelfLife. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
