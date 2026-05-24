import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { getMe } from "./api";
import { useDispatch } from "react-redux";
import { addUser } from "@/store/userSlice";
import { toast } from "react-toastify";

const Body = () => {
  const dispatch = useDispatch();
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const fetchUser = async () => {
    try {
      const res = await getMe();
      dispatch(addUser(res.data.user));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      fetchUser();
    }
  }, []);
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
