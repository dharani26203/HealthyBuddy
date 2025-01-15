import React, { useState } from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import NutritionAnalyzer from './ai';
import SectionUnlock from './SectionUnlock';
import Empowering from './Empowere';
import Footer from './Fotter';
import Modal from './Modal';
import LoginModal from './LoginModal';
import WaterReminder from './Waterreminder';
import HealthHistory from './healthhstory';
import GoogleFit from './googlefit';
import PhysicalActivityTracker from './PhysicalActivitytracker';

const Home = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [drinkCount, setDrinkCount] = useState(0); // State to track water count

  const handleLoginClick = () => {
    setIsRegistering(false);
    setModalOpen(true);
  };

  const handleRegisterClick = () => {
    setIsRegistering(true);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Navbar onLoginClick={handleLoginClick} />
      <div id="hero-section">
        <Hero />
      </div>
      <div id="ai">
        <NutritionAnalyzer onLoginRequest={handleLoginClick} drinkCount={drinkCount} />
      </div>
      <div id="tracker">
        <PhysicalActivityTracker/>
      </div>
      <SectionUnlock />
      <Empowering />
      <Footer />
      <LoginModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSwitchToRegister={handleRegisterClick}
        isRegistering={isRegistering}
      />
       <WaterReminder onDrinkCountChange={setDrinkCount} />
       <GoogleFit/>
    </>
  );
};

export default Home;