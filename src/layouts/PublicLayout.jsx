import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import BookingModal from "../components/queryForm/Bookingmodal ";

const PublicLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("hasSeenBookingModal");

    if (!hasSeenModal) {
      setIsModalOpen(true);
      sessionStorage.setItem("hasSeenBookingModal", "true");
    }
  }, []);

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