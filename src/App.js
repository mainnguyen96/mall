import { BrowserRouter, Routes, Route} from "react-router-dom";


import { publicRoutes, privateRoutes } from "./pages/routes";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          {publicRoutes.map(route => (
            <Route key={route.path}  path={route.path} element={<route.component/>}/>
          ))}
          {privateRoutes.map(route => (
            <Route key={route.path}  path={route.path} element={<route.component/>}/>
          ))}
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
