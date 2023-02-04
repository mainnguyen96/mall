import { BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "~/pages/Home";
import Categories from "./pages/Categories";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/category/:path" element={<Categories/>}/>
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
