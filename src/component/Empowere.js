import React from 'react';
import em from '../assets/em1.jpg'

const Empowering = () => {
  return (
    <div id="Empower" className="flex flex-col lg:flex-row items-center justify-between h-screen mt-16 mb-20 lg:mt-13 lg:mb-13 lg:p-32 ">
      {/* Image section */}
      <div className="mt-8 lg:mt-0 ml-[-140px]">
        <img
          src={em}
          alt="skillGate hero section"
          className="w-full h-auto object-cover"
        />
      </div>

      <div className="text-center lg:text-left max-w-lg space-y-6">
        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 leading-tight" style={{ fontFamily: '"Climate Crisis", cursive' }}>
        Empowering

        </h1>

       
        <p className="text-gray-600 text-lg lg:text-xl">
        Unlock the secrets to a healthier, happier you with our cutting-edge
chatbot. Receive personalized nutrition recommendations tailored

to your unique needs and preferences
        </p>
        <button className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-md hover:bg-gray-500 transition duration-300">
        Start Your Journey
        </button>
      </div>

      
    </div>
  );
};

export default Empowering;