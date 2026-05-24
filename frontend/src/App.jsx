import { Suspense } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import appStore from "@/store/appStore";
import { routes } from "@/routes";
import Body from "@/components/main/Body";
import "@/api/axiosInterceptor";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Suspense fallback={<h1>Loading...</h1>}>
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
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
