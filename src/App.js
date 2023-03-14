import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { getAuth, onAuthStateChanged } from "~/firebaseServices";
import { getLocationForUser } from "./ultil";
import { authSet, shippingLocationSet } from "./features/authSlice";
import { publicRoutes, privateRoutes } from "./pages/routes";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userName =
          auth.currentUser.displayName || auth.currentUser.email.split("@")[0];
        dispatch(
          authSet({
            auth: auth.currentUser.accessToken,
            userId: auth.currentUser.uid,
            userName,
          })
        );
        getLocationForUser(auth.currentUser.uid).then((locationData) => {
          dispatch(shippingLocationSet(locationData));
        });
      }
    });
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
