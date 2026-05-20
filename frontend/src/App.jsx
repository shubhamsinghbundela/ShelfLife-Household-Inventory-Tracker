import { Suspense } from "react";
import "@/App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { routes } from "@/routes";

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
