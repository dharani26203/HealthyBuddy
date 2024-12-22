// Home.js
import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import NutritionAnalyzer from './ai';
import SectionUnlock from './SectionUnlock';
import Empowering from './Empowere';
import Footer from './Fotter';
import Modal from './Modal'; // Ensure this is imported
import LoginModal from './LoginModal'



const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login and register

  const handleLoginClick = () => {
    setIsRegistering(false); // Set to false for login
    setModalOpen(true);
  };
 

  const handleRegisterClick = () => {
    setIsRegistering(true); // Set to true for register
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Navbar onLoginClick={handleLoginClick} />
      <Hero />
      <NutritionAnalyzer
        onLoginRequest={handleLoginClick}
        />
      <SectionUnlock />
      <Empowering />
      <Footer />
      <LoginModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSwitchToRegister={handleRegisterClick}
        isRegistering={isRegistering}
      />
    </>
  );
};

export default Home;

