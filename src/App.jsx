import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
// import PackagesHome from './components/package/PackagesHome';
// import WorldDestinationsExplorer from './pages/Worlddestinationsexplorer';
// import DestinationDetail from './pages/Destinationdetail';
import About from './pages/aboutPage/About';
import Services from './pages/servicesPage/Services';
import Packages from './pages/packagesPage/Packages';
import Contact from './pages/contactPage/Contact';
import Blog from './pages/blogPage/Blog';


import Home from './home/Home';
import Destination from './destination/Destination';
import DestinationDetails from './destination/DestinationDetails';

// import TravelDashboard from './dashbaord/TravelDashboard';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destination />} />
        {/* <Route path="/destinations/:slug"    element={<DestinationDetail />} /> */}
        {/* <Route path="/packages" element={<PackagesHome />} /> */}
        <Route path="/destination/:slug" element={<DestinationDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        {/* <Route path="/dashbaord" element={< TravelDashboard/>} /> */}
      </Routes>
       
      <Footer />
    </BrowserRouter>
  );
}

export default App;