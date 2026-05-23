import { useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Body = () => {
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar setOpenAuthDialog={setOpenAuthDialog} />

      <div style={{ flex: 1 }}>
        <Outlet
          context={{
            openAuthDialog,
            setOpenAuthDialog,
          }}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Body;
