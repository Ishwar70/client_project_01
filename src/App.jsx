import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Packages from './components/package/Packages';
import WorldDestinationsExplorer from './pages/Worlddestinationsexplorer';
// import Destinationdetailpage from "./Destinationdetailpage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<WorldDestinationsExplorer />} />
        <Route path="/packages" element={<Packages />} />
      </Routes>
       
      <Footer />
    </BrowserRouter>
  );
}

export default App;