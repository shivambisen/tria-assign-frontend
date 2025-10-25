import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";


import './App.css'
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

  const App = () => (
    <>
      <Toaster position="top-right" />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </>

  );
  
  export default App;
