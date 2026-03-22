import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
// import PackagesHome from './components/package/PackagesHome';
import WorldDestinationsExplorer from './pages/Worlddestinationsexplorer';
import DestinationDetail from './pages/Destinationdetail';
import About from './pages/aboutPage/About';
import Services from './pages/servicesPage/Services';
import Packages from './pages/packagesPage/Packages';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/destinations" element={<WorldDestinationsExplorer />} />
        <Route path="/destinations/:slug"    element={<DestinationDetail />} />
        {/* <Route path="/packages" element={<PackagesHome />} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/packages" element={<Packages />} />
      </Routes>
       
      <Footer />
    </BrowserRouter>
  );
}

export default App;