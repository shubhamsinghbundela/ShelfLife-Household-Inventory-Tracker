import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import Login from "../auth/Login";
import Signup from "../auth/Signup";

const JoinHouseHold = () => {
  const { openAuthDialog, setOpenAuthDialog } = useOutletContext();

  const [openSignup, setOpenSignup] = useState(false);

  return (
    <>
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
    </>
  );
};

export default JoinHouseHold;
