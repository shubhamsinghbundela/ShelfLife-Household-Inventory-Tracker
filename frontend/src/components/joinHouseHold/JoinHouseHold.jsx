import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";

import { Box, Button, Container, Typography, Paper } from "@mui/material";

import Login from "../auth/Login";
import Signup from "../auth/Signup";

import JoinWithInviteDialog from "./JoinWithInviteDialog";
import CreateHouseholdDialog from "./CreateHouseholdDialog";

const JoinHouseHold = () => {
  const user = useSelector((store) => store.user);

  const { openAuthDialog, setOpenAuthDialog } = useOutletContext();

  const [openSignup, setOpenSignup] = useState(false);

  const [openJoinDialog, setOpenJoinDialog] = useState(false);

  const [openCreateDialog, setOpenCreateDialog] = useState(false);

  const handleJoinHousehold = () => {
    const token = localStorage.getItem("accessToken");

    if (!token || !user) {
      setOpenAuthDialog(true);
      return;
    }

    setOpenJoinDialog(true);
  };

  return (
    <>
      <Container maxWidth="md">
        <Box
          sx={{
            minHeight: "80vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 5,
              borderRadius: 4,
              textAlign: "center",
              width: "100%",
              maxWidth: "700px",
            }}
          >
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Building a ShelfLife Household Inventory Tracker
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mt: 2,
                mb: 4,
              }}
            >
              Manage household items, track inventory, and collaborate with your
              family members easily.
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={handleJoinHousehold}
            >
              Join Household
            </Button>
          </Paper>
        </Box>
      </Container>

      {!openSignup ? (
        <Login
          open={openAuthDialog}
          handleClose={() => setOpenAuthDialog(false)}
          openSignup={() => {
            setOpenAuthDialog(false);
            setOpenSignup(true);
          }}
        />
      ) : (
        <Signup
          open={openSignup}
          handleClose={() => setOpenSignup(false)}
          openLogin={() => {
            setOpenSignup(false);
            setOpenAuthDialog(true);
          }}
        />
      )}

      <JoinWithInviteDialog
        open={openJoinDialog}
        handleClose={() => setOpenJoinDialog(false)}
        openCreateDialog={() => {
          setOpenJoinDialog(false);
          setOpenCreateDialog(true);
        }}
      />

      <CreateHouseholdDialog
        open={openCreateDialog}
        handleClose={() => setOpenCreateDialog(false)}
      />
    </>
  );
};

export default JoinHouseHold;
