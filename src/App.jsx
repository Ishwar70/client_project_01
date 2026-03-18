import React from 'react'
import Navbar from './components/navbar/Navbar'
import Footer from './components/footer/Footer'
import HeroSection from './components/hero/HeroSection'
import WhyTravelMagica from './components/WhyUs/WhyUs'
import Testimonials from './components/testonamials/Testimonials'

export default function App() {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <WhyTravelMagica  />
    <Testimonials/>
    <Footer/>
    </>
  )
}
