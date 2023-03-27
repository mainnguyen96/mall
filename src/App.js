import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { fetchAuth } from "./features/authSlice";
import { publicRoutes, privateRoutes } from "./pages/routes";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAuth());
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
          {privateRoutes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
          <Route path="/*" element={<Navigate to={"/"} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
