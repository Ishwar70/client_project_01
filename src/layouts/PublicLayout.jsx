import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import BookingModal from "../components/queryForm/Bookingmodal ";

const PublicLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(true); 

  return (
    <>
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicLayout;