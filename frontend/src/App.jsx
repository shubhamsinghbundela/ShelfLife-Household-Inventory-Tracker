import { Suspense } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "@/store/appStore";
import { routes } from "@/routes";
import Body from "@/components/main/Body";
import "@/api/axiosInterceptor";
import { Box, CircularProgress } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Suspense
            fallback={
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100vh",
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <Routes>
              <Route path="/" element={<Body />}>
                {routes.map((route) => {
                  const Component = route.component;

                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<Component />}
                    />
                  );
                })}
              </Route>
            </Routes>
          </Suspense>

          <ToastContainer />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
