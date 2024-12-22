import React from 'react';
import HeroImage from '../assets/Hero1.jpg'

const Hero = () => {
  return (
    <div id="hero-section" className="flex flex-col lg:flex-row items-center justify-between h-screen mt-16 mb-20 lg:mt-13 lg:mb-13 lg:p-32 ">
      <div className="text-center lg:text-left max-w-lg space-y-6">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight" style={{ fontFamily: '"Climate Crisis", cursive' }}>
        Discover the Nutritional

        </h1>

        <h1 className="text-4xl lg:text-6xl font-climate font-bold text-black-600 leading-tight" style={{ fontFamily: '"Climate Crisis", cursive' }}>
        Power of Our Chatbot
        </h1>
        <p className="text-gray-600 text-lg lg:text-xl">
        Explore the ultimate chatbot experience that provides personalized nutrition recommendations based on your dietary preferences and health
        </p>
        <button className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-md hover:bg-gray-500 transition duration-300">
            Try Now
        </button>
      </div>

      {/* Image section */}
      <div className="mt-8 lg:mt-0">
        <img
          src={HeroImage}
          alt="skillGate hero section"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
};

export default Hero;
