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
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicOnlyRoute from "./routes/PublicOnlyRoute";

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

                  // PROTECTED ROUTES
                  if (route.isProtected) {
                    return (
                      <Route key={route.path} element={<ProtectedRoute />}>
                        <Route path={route.path} element={<Component />} />
                      </Route>
                    );
                  }

                  // PUBLIC ROUTES
                  return (
                    <Route key={route.path} element={<PublicOnlyRoute />}>
                      <Route
                        key={route.path}
                        path={route.path}
                        element={<Component />}
                      />
                    </Route>
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
