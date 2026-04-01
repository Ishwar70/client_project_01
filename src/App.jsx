import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./home/Home";
import Destination from "./destination/Destination";
import DestinationDetails from "./destination/DestinationDetails";

import About from "./pages/aboutPage/About";
import Services from "./pages/servicesPage/Services";
import Packages from "./pages/packagesPage/Packages";
import Contact from "./pages/contactPage/Contact";
import Blog from "./pages/blogPage/Blog";

import Login from "./auth/Login";
import Register from "./auth/Register";
import Forgot from "./auth/Forgot";
import Reset from "./auth/Reset";

import DashboardLayout from "./admin/DashboardLayout";
import DashboardContent from "./admin/DashboardContent";
import Profile from "./admin/profile/Profile";
import ServiceDetails from "./pages/servicesPage/ServiceDetails";
import ServicesPage from "./admin/services/ServicesPage";
import PackagesPage from "./admin/packages/PackagesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 PUBLIC */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destination />} />
          <Route path="/destination/:slug" element={<DestinationDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking/:id" element={<ServiceDetails />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
        </Route>

        {/* 🔐 AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset" element={<Reset />} />

        {/* 🛡 PROTECTED ADMIN */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<DashboardLayout />}>
            <Route index element={<DashboardContent />} />
            <Route path="profile" element={<Profile />} />
            <Route path="services">
              <Route index element={<ServicesPage />} />
              <Route path=":id" element={<ServiceDetails />} />
            </Route>
            <Route path="packages">
              <Route index element={<PackagesPage />} />
              {/* <Route path=":id" element={<ServiceDetails />} /> */}
            </Route>
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;