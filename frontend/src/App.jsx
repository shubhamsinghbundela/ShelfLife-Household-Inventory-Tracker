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
import DashboardLayout from "./components/layout/DashboardLayout";

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
                {/* PUBLIC ROUTES */}
                {routes
                  .filter((route) => !route.isProtected)
                  .map((route) => {
                    const Component = route.component;

                    return (
                      <Route key={route.path} element={<PublicOnlyRoute />}>
                        <Route path={route.path} element={<Component />} />
                      </Route>
                    );
                  })}

                {/* DASHBOARD ROUTES */}
                <Route
                  element={
                    <ProtectedRoute>
                      <DashboardLayout />
                    </ProtectedRoute>
                  }
                >
                  {routes
                    .filter((route) => route.isProtected)
                    .map((route) => {
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
