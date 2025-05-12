
import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import PersonalizedService from "@/components/PersonalizedService";
import PopularDestinations from "@/components/PopularDestinations";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Hero />
      <Services />
      <PersonalizedService />
      <Gallery />
      <PopularDestinations />
      <Contact />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
