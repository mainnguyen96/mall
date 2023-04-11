import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { fetchAuth } from "./features/authSlice";
import { publicRoutes, privateRoutes } from "./pages/routes";
import { routes } from "./config/routes";
import { useMobileDetect } from "./customHooks";
import MobileView from "./components/MobileView/MobileView";

function App() {
  const dispatch = useDispatch();
  const isMobile = useMobileDetect();

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      dispatch(fetchAuth());
    });
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        {!isMobile ? (
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
            <Route path="/*" element={<Navigate to={routes.home} />} />
          </Routes>
        ) : (
          <MobileView />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
