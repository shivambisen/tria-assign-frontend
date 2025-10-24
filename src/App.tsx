import { BrowserRouter, Routes, Route } from "react-router-dom";


import './App.css'
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";

  const App = () => (
    // <QueryClientProvider client={queryClient}>
    //   <TooltipProvider>
    //     <Toaster />
    //     <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    //   </TooltipProvider>
    // </QueryClientProvider>
  );
  
  export default App;
